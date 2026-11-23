import { expect, test, type Page } from "@playwright/test";

/* S24: thay vũ khí, nâng cấp, tinh luyện, ước banner Binh Khí Tinh Tú 10 lần. */

function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}
const P = (page: Page, f: string) => page.evaluate(`window.__tinhtu.Server.P.${f}`);
const screen = (page: Page) => page.evaluate(() => (window as any).__tinhtu.menu.currentScreen());

async function boot(page: Page) {
  await page.goto("./?e2e");
  await page.evaluate(() => localStorage.setItem("tinhtu-hints-v1", "1"));
  await expect.poll(() => page.evaluate("window.__tinhtu.S.scene")).toBe("play");
}
/** Thêm vũ khí qua lệnh Admin, trả uid. */
const give = (page: Page, id: string) =>
  page.evaluate((id) => (window as any).__tinhtu.Server.req("giveWeapon", { id }).data.uid as string, id);

test("thay vũ khí ở màn Nhân vật, Chiến Lực tăng", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  await page.evaluate(() => (window as any).__tinhtu.Server.grant("lachong"));
  const uid = await give(page, "hong-vu-truong-ca");
  const before = await page.evaluate(() => (window as any).__tinhtu.Server.P.owned.lachong.vk);
  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("chars", { id: "lachong", tab: "weapon" }));
  await expect(page.getByRole("tab", { name: "Vũ Khí" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".tt-tabpanel .tt-wcard")).toBeVisible();
  await page.locator("#charWeaponSwap").click();
  await expect.poll(() => screen(page)).toBe("wswap");
  await page.locator(`#swapList [data-uid="${uid}"]`).click();
  await expect(page.locator(".tt-compare .d.up").first()).toBeVisible();
  await page.locator("#weaponEquip").click();
  await expect.poll(() => P(page, "owned.lachong.vk")).toBe(uid);
  expect(await P(page, `weapons.${before}.id`)).toBe("kiem-sat-lu-khach");
  await expect.poll(() => screen(page)).toBe("chars");
  await expect(page.locator(".tt-tabpanel .tt-wcard")).toHaveAttribute("data-uid", uid);
  expect(errors).toEqual([]);
});

test("đổi vũ khí đang ở nhân vật khác cần xác nhận", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  await page.evaluate(() => {
    const S = (window as any).__tinhtu.Server;
    S.grant("lachong");
    S.grant("tuyetlan");
  });
  const tl = (await P(page, "owned.tuyetlan.vk")) as string;
  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("wswap", { char: "lachong" }));
  await page.locator(`#swapList [data-uid="${tl}"]`).click();
  await page.locator("#weaponEquip").click();
  const dlg = page.getByRole("dialog", { name: "Đổi vũ khí giữa hai nhân vật?" });
  await expect(dlg).toBeVisible();
  await dlg.getByRole("button", { name: "Đổi" }).click();
  await expect.poll(() => P(page, "owned.lachong.vk")).toBe(tl);
  expect(await P(page, "owned.tuyetlan.vk")).not.toBe(tl);
  expect(errors).toEqual([]);
});

test("nâng cấp bằng quặng, khóa, kho vũ khí lọc và sắp xếp", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  const uid = await give(page, "suong-som-ben-song");
  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("weapons"));
  await page.getByRole("button", { name: "Lọc", exact: true }).click();
  const dlg = page.getByRole("dialog");
  await dlg.getByRole("button", { name: "Kiếm đơn" }).click();
  await dlg.getByRole("button", { name: "4★" }).click();
  await dlg.getByRole("button", { name: "Áp dụng" }).click();
  await expect(page.locator(`#weaponGrid [data-uid="${uid}"]`)).toBeVisible();
  await expect(page.locator("#weaponGrid .tt-wcell")).toHaveCount(1);
  await page.locator(`#weaponGrid [data-uid="${uid}"]`).click();
  await page.locator("#weaponLock").click();
  await expect.poll(() => P(page, `weapons.${uid}.lock`)).toBe(true);
  await page.locator("#weaponDetail").getByRole("button", { name: "Nâng Cấp" }).click();
  await expect.poll(() => screen(page)).toBe("wupgrade");
  const plus = page.locator('[data-ore="quang-tinh-luyen"]');
  await plus.click();
  await plus.click();
  await expect(page.locator("#weaponPreview")).toContainText("Cấp 1 →");
  const coin = (await P(page, "coin")) as number;
  await page.locator("#weaponUpgradeGo").click();
  await expect.poll(() => P(page, `weapons.${uid}.lv`)).toBeGreaterThan(1);
  expect(await P(page, "coin")).toBeLessThan(coin);
  expect(errors).toEqual([]);
});

test("tinh luyện bằng bản trùng 4★ có hộp xác nhận", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  const uid = await give(page, "suong-som-ben-song");
  const dup = await give(page, "suong-som-ben-song");
  await page.evaluate((uid) => (window as any).__tinhtu.menu.openMenu("wupgrade", { uid, mode: "tl" }), uid);
  await expect(page.locator(`#dupGrid [data-uid="${dup}"]`)).toBeVisible();
  await page.locator("#weaponRefineGo").click();
  const dlg = page.locator(".tt-scrim .tt-dialog");
  await expect(dlg).toContainText("Sương Sớm Bến Sông");
  await dlg.getByRole("button", { name: "Tinh luyện" }).click();
  await expect.poll(() => P(page, `weapons.${uid}.tl`)).toBe(2);
  expect(await P(page, `weapons.${dup}`)).toBeUndefined();
  await expect(page.locator(".tt-wpass li.is-on")).toContainText("R2");
  expect(errors).toEqual([]);
});

test("ước banner Binh Khí Tinh Tú 10 lần, La Bàn Sao, lịch sử riêng", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  await page.evaluate(() => {
    const S = (window as any).__tinhtu.Server;
    S.P.gems = S.P.wcfg.cost * 10;
    S.save();
    (window as any).__tinhtu.menu.openMenu("wish", { kind: "weapon" });
  });
  await expect(page.locator('[data-banner="weapon"]')).toHaveAttribute("aria-pressed", "true");
  const first = page.locator(".tt-wbanner-w").first();
  await first.click();
  await expect(first).toHaveAttribute("aria-pressed", "true");
  expect(await P(page, "wPick")).toBe(await first.getAttribute("data-id"));
  await expect(page.getByRole("button", { name: /chưa mở/ })).toBeDisabled();
  const charHist = (await P(page, "history.length")) as number;
  const n = Object.keys((await P(page, "weapons")) as object).length;
  await page.getByRole("button", { name: /Ước 10 lần/ }).click();
  await expect(page.locator("#wishFx")).toBeVisible();
  for (let i = 0; i < 30 && (await page.locator("#wishFx").isVisible()); i++) {
    if (await page.locator("#wishSkip").isVisible()) await page.locator("#wishSkip").click();
    else await page.locator("#wishFx").click({ position: { x: 20, y: 20 } });
    await page.waitForTimeout(150);
  }
  await expect(page.locator("#wishFx")).toBeHidden();
  expect(await P(page, "wHistory.length")).toBe(10);
  expect(await P(page, "history.length")).toBe(charHist);
  expect(Object.keys((await P(page, "weapons")) as object).length).toBe(n + 10);
  expect(await P(page, "gems")).toBe(0);
  await page.getByRole("tab", { name: "Lịch sử" }).click();
  await expect(page.locator("#wishHist li")).toHaveCount(10);
  expect(errors).toEqual([]);
});

test("Tủ Đồ: hiệu ứng thẻ và bảng chi tiết, tắt khi Giảm chuyển động", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  const uid = await give(page, "hong-vu-truong-ca");
  await give(page, "mat-bao-ngu-yen");
  await page.evaluate((uid) => (window as any).__tinhtu.menu.openMenu("bag", { uid }), uid);
  const card = page.locator(`[data-uid="${uid}"]`);
  await expect(card.locator(".tt-loot__shine")).toHaveCount(1);
  await expect(page.locator(".tt-tudo-ring")).toBeVisible();
  await expect(page.locator(".tt-tudo-sky")).toHaveCount(1);
  expect(await page.locator(".tt-mote").count()).toBeGreaterThan(0);
  const anim = () => page.evaluate(() => getComputedStyle(document.querySelector(".tt-tudo-ring")!).animationName);
  expect(await anim()).toBe("tt-spin");
  await page.locator(".tt-wcell").nth(1).click();
  await expect(page.locator(".tt-wcell.is-pop")).toHaveCount(1);
  await page.evaluate(() => {
    const T = (window as any).__tinhtu;
    T.settings.reduceMotion = true;
    T.saveSettings();
    T.menu.openMenu("bag", {});
  });
  await expect(page.locator("html")).toHaveClass(/tt-calm/);
  expect(await anim()).toBe("none");
  await expect(page.locator(".tt-mote").first()).toBeHidden();
  expect(errors).toEqual([]);
});
