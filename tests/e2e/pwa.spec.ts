import { expect, test, type Page } from "@playwright/test";

/* S22: bản cài đặt PWA (manifest, service worker chơi offline, gợi ý cài trên Safari iOS, mục Ứng dụng trong Cài đặt). */

const G = (page: Page, f: string) => page.evaluate(`window.__tinhtu.S.${f}`);
const IPAD_SAFARI =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";

test("manifest đủ trường và icon tải được", async ({ page, request }) => {
  await page.goto("./?e2e");
  const href = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(href).toBe("./manifest.webmanifest");
  const m = await (await request.get("./manifest.webmanifest")).json();
  expect(m).toMatchObject({
    name: "Tinh Tú Ước Nguyện",
    short_name: "Tinh Tú",
    display: "fullscreen",
    display_override: ["fullscreen", "standalone"],
    orientation: "landscape",
  });
  const sizes = m.icons.map((i: { sizes: string; purpose: string }) => `${i.sizes}/${i.purpose}`);
  expect(sizes).toEqual(expect.arrayContaining(["192x192/any", "512x512/any", "512x512/maskable"]));
  for (const i of m.icons) expect((await request.get(i.src)).status()).toBe(200);
  expect((await request.get("./icons/apple-touch-icon-180.png")).status()).toBe(200);
  await expect(page.locator('meta[name="apple-mobile-web-app-status-bar-style"]')).toHaveAttribute(
    "content",
    "black-translucent",
  );
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute("content", /viewport-fit=cover/);
});

test("Admin không gắn manifest của game", async ({ page }) => {
  await page.goto("./admin/");
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(0);
});

test("cài được (Chrome) và chơi được khi mất mạng", async ({ page, context, browserName }, info) => {
  test.skip(browserName !== "chromium" || info.project.name !== "desktop", "kiểm tra cài đặt bằng CDP của Chrome");
  await page.goto("./?e2e&sw");
  await expect.poll(() => page.evaluate("navigator.serviceWorker.ready.then(() => true)")).toBe(true);
  await page.reload();
  await expect.poll(() => page.evaluate("!!navigator.serviceWorker.controller")).toBe(true);
  const cdp = await context.newCDPSession(page);
  const { installabilityErrors } = await cdp.send("Page.getInstallabilityErrors");
  expect(installabilityErrors).toEqual([]);
  await context.setOffline(true);
  await page.reload();
  await expect.poll(() => G(page, "scene"), { timeout: 20_000 }).toBe("play");
  await context.setOffline(false);
});

test.describe("Safari iPad chưa cài", () => {
  test.use({ userAgent: IPAD_SAFARI, hasTouch: true });
  test("banner gợi ý hiện một lần, tắt được", async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(navigator, "maxTouchPoints", { get: () => 5 }));
    await page.goto("./?e2e");
    const hint = page.locator("#pwaHint");
    await expect(hint).toBeVisible();
    await expect(hint).toContainText("Chia sẻ");
    await expect(hint).toContainText("Thêm vào MH chính");
    await page.getByRole("button", { name: "Tắt gợi ý cài đặt" }).click();
    await expect(hint).toBeHidden();
    await page.reload();
    await page.waitForTimeout(2000);
    await expect(hint).toBeHidden();
  });
});

test("Cài đặt → Ứng dụng có link tải bản cài đặt", async ({ page }) => {
  await page.goto("./?e2e");
  await page.evaluate(() => localStorage.setItem("tinhtu-hints-v1", "1"));
  await expect.poll(() => G(page, "scene")).toBe("play");
  await page.locator("#qmSettings").click();
  await page.getByRole("tab", { name: "Ứng dụng" }).click();
  const a = page.locator("#stReleases");
  await expect(a).toHaveText("Tải bản cài đặt");
  await expect(a).toHaveAttribute("href", "https://github.com/Dungeon067/DUngeon/releases");
  await expect(page.locator("#stFullscreen")).toBeVisible();
});
