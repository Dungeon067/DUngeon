import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

/* S20: video ước nguyện. Video thật nằm trong Git LFS (CI không kéo), nên test dùng video mẫu 3 giây
   để kiểm tra luồng: tải khi cần, nút bỏ qua, tua nhanh từ lần thứ 2, và tự chuyển sang bản code khi thiếu video. */

const clip = readFileSync(new URL("./fixtures/wish-test.webm", import.meta.url));
const timeline = {
  cues: { reveal: 3 },
  constellation: { drawFrom: 0.5, fullAt: 1, fadeOutFrom: 1.5, hiddenAt: 2, scale: 0.34, anchor: [[0, 0.5, 0.5]] },
  fastForward: { allowedFromWish: 2, rate: 3, until: 2.5 },
  variants: Object.fromEntries(
    ["3", "4", "5a", "5b", "10x4", "10x5"].map((id) => [
      id,
      { rarity: 4, multi: id.startsWith("10"), video: { "720": [`video/${id}-720.webm`] }, audio: [] },
    ]),
  ),
};

function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

async function openWish(page: Page) {
  await page.goto("./?e2e");
  await page.evaluate(() => localStorage.setItem("tinhtu-hints-v1", "1"));
  await expect.poll(() => page.evaluate("window.__tinhtu.S.scene")).toBe("play");
  await page.evaluate("window.__tinhtu.Server.req('give', { kind: 'gem', amount: 3200 })");
  await page.locator("#qm-wish").click();
  await expect.poll(() => page.evaluate("window.__tinhtu.menu.currentScreen()")).toBe("wish");
}

async function closeWish(page: Page) {
  for (let i = 0; i < 30 && (await page.locator("#wishFx").isVisible()); i++) {
    if (await page.locator("#wishSkip").isVisible()) await page.locator("#wishSkip").click();
    else await page.locator("#wishFx").click({ position: { x: 20, y: 20 } });
    await page.waitForTimeout(150);
  }
  await expect(page.locator("#wishFx")).toBeHidden();
}

test.describe("video ước nguyện", () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop", "Chromium máy tính"));

  test("chỉ tải video khi ước, bỏ qua vào thẳng cảnh 5, lần 2 có tua nhanh", async ({ page }) => {
    const errors = watchErrors(page);
    const videoHits: string[] = [];
    await page.route("**/media/cinematic/out/timeline.json", (r) => r.fulfill({ json: timeline }));
    await page.route("**/media/cinematic/out/video/**", (r) => {
      videoHits.push(r.request().url());
      return r.fulfill({ body: clip, contentType: "video/webm" });
    });
    await openWish(page);
    expect(videoHits).toEqual([]);

    await page.getByRole("button", { name: /Ước 1 lần/ }).click();
    await expect(page.locator("#wishVid")).toBeVisible();
    await expect(page.locator("#wishSkip")).toBeVisible();
    await expect(page.locator("#wishFf")).toBeHidden();
    expect(videoHits.length).toBe(1);
    await page.locator("#wishSkip").click();
    await expect(page.locator("#wishVid")).toBeHidden();
    await expect(page.locator("#wishFx")).toBeVisible();
    await closeWish(page);

    await page.getByRole("button", { name: /Ước 10 lần/ }).click();
    await expect(page.locator("#wishVid")).toBeVisible();
    await expect(page.locator("#wishFf")).toBeVisible();
    await page.locator("#wishFf").click();
    await expect(page.locator("#wishFf")).toHaveAttribute("aria-pressed", "true");
    await expect.poll(() => page.locator("#wishVid").evaluate((v: HTMLVideoElement) => v.playbackRate)).toBe(3);
    await expect(page.locator("#wishVid")).toBeHidden({ timeout: 5000 });
    await closeWish(page);
    expect(errors).toEqual([]);
  });

  test("thiếu video thì thử lại rồi vào thẳng phần nhận kết quả, không dùng bản code", async ({ page }) => {
    const errors = watchErrors(page);
    await page.route("**/media/cinematic/out/timeline.json", (r) => r.fulfill({ json: timeline }));
    await page.route("**/media/cinematic/out/video/**", (r) =>
      r.fulfill({ status: 200, body: "version https://git-lfs" }),
    );
    await openWish(page);
    await page.getByRole("button", { name: /Ước 1 lần/ }).click();
    await expect(page.locator("#wishFx")).toBeVisible();
    await expect(page.locator("#wishSkip")).toBeVisible();
    await expect(page.locator("#wishVid")).toBeHidden();
    await closeWish(page);
    expect(errors).toEqual([]);
  });
});
