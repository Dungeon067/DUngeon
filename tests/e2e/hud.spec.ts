import { expect, test, type Page } from "@playwright/test";

/* S09: HUD, chế độ chỉnh bố cục, màn xoay ngang. Chạy với cỡ màn tự đặt nên chỉ cần dự án "desktop". */

const PHONE = { viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 };
const G = (page: Page, f: string) => page.evaluate(`window.__tinhtu.S.${f}`);
const box = async (page: Page, sel: string) => (await page.locator(sel).boundingBox())!;
const stored = (page: Page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem("tinhtu-settings-v1") || "{}") as Record<string, any>);

function onlyDesktop(why: string) {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop", why));
}
function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}
async function enterWorld(page: Page) {
  await page.goto("./?e2e");
  await page.evaluate(() => localStorage.setItem("tinhtu-hints-v1", "1"));
  await expect.poll(() => G(page, "scene")).toBe("play");
  await expect(page.locator("#bAtk")).toBeVisible();
}
async function openEditor(page: Page) {
  await page.locator("#qmSettings").click();
  await page.getByRole("tab", { name: "Điều khiển" }).click();
  await page.getByRole("button", { name: "Chỉnh bố cục nút" }).click();
  await expect(page.locator("#layoutBar")).toBeVisible();
  await expect(page.locator("body")).toHaveClass(/hud-editing/);
}
async function drag(page: Page, sel: string, dx: number, dy: number) {
  const b = await box(page, sel);
  const x = b.x + b.width / 2,
    y = b.y + b.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let i = 1; i <= 6; i++) await page.mouse.move(x + (dx * i) / 6, y + (dy * i) / 6);
  await page.mouse.up();
}
const rects = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("#hud button, #hud .hud-slot")]
      .filter((e) => e.offsetParent !== null && getComputedStyle(e).visibility !== "hidden")
      .map((e) => {
        const r = e.getBoundingClientRect();
        return { id: e.id || e.className, x: r.x, y: r.y, w: r.width, h: r.height };
      }),
  );

test.describe("chế độ chỉnh bố cục (điện thoại 844×390)", () => {
  test.use(PHONE);
  onlyDesktop("Dùng cỡ màn tự đặt");

  test("kéo thả, đổi cỡ, đổi độ trong suốt, tải lại vẫn giữ, về mặc định", async ({ page }) => {
    const errors = watchErrors(page);
    await enterWorld(page);
    const def = await box(page, "#joy");
    await openEditor(page);
    expect(await G(page, "paused")).toBe(true);

    // kéo cần điều khiển lên trên 60 px
    await drag(page, "#joy", 0, -60);
    const moved = await box(page, "#joy");
    expect(moved.y).toBeLessThan(def.y - 45);

    // đổi cỡ và độ trong suốt phần đang chọn
    await page.locator("#lbScale").fill("1.2");
    await page.locator("#lbOpacity").fill("0.5");
    await expect.poll(async () => (await box(page, "#joy")).width).toBeGreaterThan(def.width * 1.15);
    await expect(page.locator("#joy")).toHaveCSS("opacity", "0.5");

    // kéo vào giữa màn thì bị trả về chỗ cũ
    const before = await box(page, "#joy");
    await drag(page, "#joy", 422 - (before.x + before.width / 2), 195 - (before.y + before.height / 2));
    await expect(page.locator("#hudHint")).toHaveClass(/is-on/);
    const back = await box(page, "#joy");
    expect(Math.abs(back.y - before.y)).toBeLessThan(2);

    await page.locator("#lbDone").click();
    await expect(page.locator("body")).not.toHaveClass(/hud-editing/);
    const s = await stored(page);
    expect(s.layout.joy.scale).toBe(1.2);
    expect(s.layout.joy.opacity).toBe(0.5);

    // tải lại trang: giữ bố cục
    await page.reload();
    await enterWorld(page);
    const again = await box(page, "#joy");
    expect(Math.abs(again.y - back.y)).toBeLessThan(2);
    expect(again.width).toBeCloseTo(back.width, 0);
    await expect(page.locator("#joy")).toHaveCSS("opacity", "0.5");

    // về mặc định
    await openEditor(page);
    await page.locator("#lbReset").click();
    await page.locator("#lbDone").click();
    const reset = await box(page, "#joy");
    expect(Math.abs(reset.y - def.y)).toBeLessThan(2);
    expect((await stored(page)).layout.joy.scale).toBe(1);
    expect(errors).toEqual([]);
  });
});

test.describe("cầm dọc", () => {
  test.use({ ...PHONE, viewport: { width: 390, height: 844 } });
  onlyDesktop("Dùng cỡ màn tự đặt");

  test("hiện lớp phủ mời xoay ngang và tạm dừng, xoay ngang thì chơi tiếp", async ({ page }) => {
    await page.goto("./?e2e");
    await expect(page.locator("#rotateOverlay")).toBeVisible();
    await expect(page.getByRole("alertdialog", { name: "Xoay ngang để chơi" })).toBeVisible();
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.locator("#rotateOverlay")).toBeHidden();
    await expect.poll(() => G(page, "scene")).toBe("play");
    expect(await G(page, "paused")).toBe(false);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("#rotateOverlay")).toBeVisible();
    expect(await G(page, "paused")).toBe(true);
    const t0 = await G(page, "G.time");
    await page.waitForTimeout(400);
    expect(await G(page, "G.time")).toBe(t0);
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.locator("#rotateOverlay")).toBeHidden();
    expect(await G(page, "paused")).toBe(false);
  });
});

for (const [w, h] of [
  [844, 390],
  [932, 430],
  [1180, 820],
] as const)
  test.describe(`HUD ${w}×${h}`, () => {
    test.use({ ...PHONE, viewport: { width: w, height: h }, isMobile: w < 1000 });
    onlyDesktop("Dùng cỡ màn tự đặt");

    test("không nút nào chồng nhau hay che vùng giữa, mọi vùng chạm ≥44 px, có tên cho trình đọc màn hình", async ({
      page,
    }, info) => {
      const errors = watchErrors(page);
      await enterWorld(page);
      await page.waitForTimeout(600);
      const R = await rects(page);
      expect(R.length).toBeGreaterThan(8);
      const cz = { x: w * 0.3, y: h * 0.26, w: w * 0.4, h: h * 0.48 };
      const hit = (a: any, b: any) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
      for (const r of R) {
        expect.soft(Math.min(r.w, r.h), `${r.id} nhỏ hơn 44 px`).toBeGreaterThanOrEqual(43.5);
        expect.soft(hit(r, cz), `${r.id} che vùng giữa`).toBe(false);
        expect.soft(r.x >= 0 && r.y >= 0 && r.x + r.w <= w && r.y + r.h <= h, `${r.id} ra ngoài màn`).toBe(true);
      }
      for (let i = 0; i < R.length; i++)
        for (let j = i + 1; j < R.length; j++)
          expect.soft(hit(R[i], R[j]), `${R[i]!.id} chồng ${R[j]!.id}`).toBe(false);
      const unnamed = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("#hud button")]
          .filter((e) => e.offsetParent !== null)
          .filter((e) => !(e.getAttribute("aria-label") || e.textContent?.trim()))
          .map((e) => e.id),
      );
      expect(unnamed).toEqual([]);
      await page.screenshot({ path: info.outputPath(`hud-${w}x${h}.png`) });
      expect(errors).toEqual([]);
    });
  });

test.describe("máy tính", () => {
  onlyDesktop("Bàn phím và chuột");
  test("Space là Nhảy, bản đồ lớn mở từ bản đồ nhỏ, cài đặt mở từ menu chính", async ({ page }) => {
    const errors = watchErrors(page);
    await enterWorld(page);
    await page.mouse.move(640, 200);
    await page.keyboard.press("Space");
    await expect.poll(() => G(page, "G.p.air"), { timeout: 2000 }).toBe(true);
    await expect.poll(() => G(page, "G.p.air"), { timeout: 3000 }).toBe(false);
    await expect(page.locator("#bJump .key")).toHaveText("Space");

    // S10: bản đồ lớn là màn "map" của menu lớp phủ
    await page.locator("#miniBtn").click();
    await expect(page.locator('#ttMenu[data-screen="map"]')).toBeVisible();
    await expect(page.locator("#ttMenu .tt-legend li").first()).toBeVisible();
    expect(await G(page, "paused")).toBe(true);
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    await expect(page.locator("#ttMenu")).toBeHidden();

    await page.keyboard.press("Escape");
    await expect(page.locator("#ttMenu")).toBeVisible();
    await page.locator('.tt-main-item[data-item="settings"]').click();
    await expect(page.getByRole("dialog", { name: "Cài đặt" })).toBeVisible();
    await page.getByRole("tab", { name: "Phím" }).click();
    await page.locator('.st-key[data-action="jump"][data-slot="0"]').click();
    await page.keyboard.press("KeyH");
    await expect(page.locator('.st-key[data-action="jump"][data-slot="0"]')).toHaveText("H");
    expect((await stored(page)).keys.jump[0]).toBe("KeyH");
    expect(errors).toEqual([]);
  });
});
