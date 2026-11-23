import { expect, test, type Page } from "@playwright/test";

/* Lối vào Admin trong game (PWA màn hình chính không có thanh địa chỉ): Cài đặt › Ứng dụng › chạm 7 lần số phiên bản. */
function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}
const P = (page: Page, f: string) => page.evaluate(`window.__tinhtu.Server.P.${f}`);

test("vào Admin từ trong game, cấp tối đa, quay lại và ước được", async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto("./?e2e");
  await page.evaluate(() => localStorage.setItem("tinhtu-hints-v1", "1"));
  await expect.poll(() => page.evaluate("window.__tinhtu.S.scene")).toBe("play");
  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("main"));
  await page.locator('.tt-main-item[data-item="settings"]').click();
  await expect(page.getByRole("dialog", { name: "Cài đặt" })).toBeVisible();
  await page.getByRole("tab", { name: "Ứng dụng" }).click();
  await expect(page.locator("#stAdmin")).toBeHidden();
  for (let i = 0; i < 7; i++) await page.locator("#stVersion").click();
  await expect(page.locator("#stAdmin")).toBeVisible();
  await page.locator("#stAdmin").click();

  await expect(page).toHaveURL(/\/admin\//);
  await page.getByLabel("Mật khẩu").fill("tinhtu-admin");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Cấp tài nguyên" })).toBeVisible();
  await page.locator("#admMax").click();
  const card = page.locator(".tt-admin-card").first();
  await expect(card.locator(".tt-admin-stat b").first()).toHaveText("9.000.000.000");
  // số lớn nằm gọn trong ô
  const fits = await card
    .locator(".tt-admin-stat")
    .first()
    .evaluate((el) => el.scrollWidth <= el.clientWidth + 1);
  expect(fits).toBe(true);
  await page.screenshot({ path: "test-results/admin-cap-toi-da.png" });

  await page.getByRole("button", { name: "Quay lại game" }).first().click();
  await expect.poll(() => page.evaluate("window.__tinhtu?.S?.scene")).toBe("play");
  expect(await P(page, "gems")).toBe(9_000_000_000);
  expect(await P(page, "bag['phoi-long-sao']")).toBe(9_000_000_000);
  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("wish"));
  await expect(page.locator(".tt-currency .v").first()).toHaveText("9.000.000.000");
  await page.getByRole("button", { name: /Ước 10 lần/ }).click();
  await expect(page.locator("#wishFx")).toBeVisible();
  for (let i = 0; i < 30 && (await page.locator("#wishFx").isVisible()); i++) {
    if (await page.locator("#wishSkip").isVisible()) await page.locator("#wishSkip").click();
    else await page.locator("#wishFx").click({ position: { x: 20, y: 20 } });
  }
  await expect(page.locator("#wishFx")).toBeHidden();
  expect(await P(page, "gems")).toBe(9_000_000_000 - 10 * ((await P(page, "cfg.cost")) as number));
  expect(errors).toEqual([]);
});
