import { expect, test, type Page } from "@playwright/test";

/* S31: Bảo Ấn (5 Mảnh Sao) — Tủ Đồ, nâng cấp, phân rã, màn Nhân vật ghép sao, Bí Cảnh Bảo Ấn. */

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
const give = (page: Page, spec: Record<string, unknown>) =>
  page.evaluate((s) => (window as any).__tinhtu.Server.req("giveBaoAn", s).data.uid as string, spec);
const SLOTS = ["hoa", "long", "den", "chen", "mien"];

test("Tủ Đồ: tab Bảo Ấn, khóa, nâng cấp qua mốc +4, phân rã nhiều món", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  const uid = await give(page, { bo: "dem-hoi-van-dang", o: "chen", r: 5 });
  const scrap = [
    await give(page, { bo: "lan-tuyet-ranmori", o: "hoa", r: 3 }),
    await give(page, { bo: "lan-tuyet-ranmori", o: "long", r: 3 }),
  ];
  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("bag", { tab: "bao-an" }));
  await expect(page.locator(`#baGrid [data-uid="${uid}"] img`)).toBeVisible();
  await expect
    .poll(() => page.locator(`#baGrid [data-uid="${uid}"] img`).evaluate((i: HTMLImageElement) => i.naturalWidth))
    .toBeGreaterThan(0);
  await page.locator(`#baGrid [data-uid="${uid}"]`).click();
  await expect(page.locator("#baDetail")).toHaveAttribute("data-uid", uid);
  await page.locator("#baLock").click();
  await expect.poll(() => P(page, `baoAn["${uid}"].lock`)).toBe(true);

  await page.locator("#baUpgradeOpen").click();
  await expect.poll(() => screen(page)).toBe("baupgrade");
  const lines = (await P(page, `baoAn["${uid}"].phu.length`)) as number;
  await page.evaluate(() => ((window as any).__tinhtu.Server.P.bag["sap-an"] = 20));
  for (let i = 0; i < 10 && !(await page.locator("#baMilestone").textContent())?.startsWith("Qua"); i++)
    await page.locator('[data-sap="sap-an"]').click();
  await expect(page.locator("#baMilestone")).toContainText("Qua 1 mốc +4");
  await page.locator("#baUpgradeGo").click();
  await expect.poll(() => P(page, `baoAn["${uid}"].lv`)).toBeGreaterThanOrEqual(4);
  const after = (await P(page, `baoAn["${uid}"].phu`)) as { n: number }[];
  expect(after.length === 4 ? after.reduce((s, x) => s + x.n, 0) : after.length).toBeGreaterThan(
    lines === 4 ? 4 : lines,
  );
  await expect(page.locator(".tt-bastats dd.is-jump").first()).toBeVisible();

  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("bag", { tab: "bao-an" }));
  await page.locator("#baScrapMode").click();
  await expect(page.locator(`#baGrid [data-uid="${uid}"]`)).toBeDisabled();
  await page.getByRole("button", { name: "Chọn 3★" }).click();
  const bui = ((await P(page, 'bag["bui-an"]')) as number) ?? 0;
  await page.locator("#baScrapGo").click();
  await expect.poll(() => P(page, `baoAn["${scrap[0]}"]`)).toBeUndefined();
  expect(await P(page, `baoAn["${scrap[1]}"]`)).toBeUndefined();
  expect(await P(page, `baoAn["${uid}"].uid`)).toBe(uid);
  expect((await P(page, 'bag["bui-an"]')) as number).toBeGreaterThan(bui);
  expect(errors).toEqual([]);
});

test("màn Nhân vật: thay Mảnh Sao có so sánh, đủ 5 mảnh thì sao sáng trọn", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  const cid = (await P(page, "party[0]")) as string;
  const uids: string[] = [];
  for (const o of SLOTS) uids.push(await give(page, { bo: "dem-hoi-van-dang", o, r: 5, lv: 8 }));
  await page.evaluate((cid) => (window as any).__tinhtu.menu.openMenu("chars", { id: cid, tab: "baoan" }), cid);
  await expect(page.locator("#baStar")).toBeVisible();
  for (const [i, o] of SLOTS.entries()) {
    await page.locator(`#baStar .tt-baslot[data-o="${o}"]`).click();
    await expect.poll(() => screen(page)).toBe("baswap");
    await page.locator(`#baSwapList .tt-barow[data-uid="${uids[i]}"]`).click();
    if (i === 0) await expect(page.locator(".tt-compare .d.up").first()).toBeVisible();
    await page.locator("#baEquip").click();
    await expect.poll(() => P(page, `owned.${cid}.ba.${o}`)).toBe(uids[i]);
    await expect.poll(() => screen(page)).toBe("chars");
  }
  await expect(page.locator("#baStar")).toHaveAttribute("data-state", "tron");
  await expect(page.locator(".tt-bastar-name")).toContainText("sáng trọn");
  await expect(page.locator("#baSets .is-on")).toHaveCount(2);
  expect(errors).toEqual([]);
});

test("Bí Cảnh Bảo Ấn: vào từ menu, thắng thì mở rương ra Mảnh Sao", async ({ page }) => {
  const errors = watchErrors(page);
  await boot(page);
  await page.evaluate(() => {
    const S = (window as any).__tinhtu.Server;
    for (const o of Object.values(S.P.owned) as any[]) o.lv = 20;
    S.P.ll = { v: 200, t: Date.now() };
  });
  const before = Object.keys((await P(page, "baoAn")) as object).length;
  await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("main"));
  await page.locator('.tt-main-item[data-item="baoan"]').click();
  await page.locator("#baDomains button").first().click();
  await expect.poll(() => page.evaluate("window.__tinhtu.S.G.mode")).toBe("baoan");
  await page.evaluate(() => {
    const G = (window as any).__tinhtu.S.G;
    G.tower.wave = G.tower.waves.length;
    for (const e of G.enemies) e.dead = true;
    G.tower.gap = 0;
  });
  await expect(page.locator("#chestReveal")).toBeVisible({ timeout: 15_000 });
  await expect.poll(async () => Object.keys((await P(page, "baoAn")) as object).length).toBeGreaterThan(before);
  expect(Math.floor((await P(page, "ll.v")) as number)).toBeLessThan(200);
  expect(errors).toEqual([]);
});
