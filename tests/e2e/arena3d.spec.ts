import { expect, test } from "@playwright/test";

/* S28: Tháp Tinh Tú và Hắc Giao vẽ bằng 3D (đấu trường dựng khi vào trận, dọn khi về đảo). */

const r3 = (page: any) =>
  page.evaluate(() => {
    const r = (window as any).__tinhtu.r3?.();
    const d = r?.debug?.();
    return { arena: d?.arena?.kind ?? null, shown: document.getElementById("game3d")?.style.display ?? "" };
  });

test("đấu trường 3D cho Tháp và Hắc Giao, về đảo thì dọn sạch", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Một máy đủ: kiểm tra lớp vẽ, không phụ thuộc màn hình");
  test.setTimeout(150_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("./?e2e&renderer=3d");
  await page.evaluate(() => {
    localStorage.setItem("tinhtu-hints-v1", "1");
    localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: "low" }));
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => (window as any).__tinhtu?.S?.scene), { timeout: 60_000 }).toBe("play");
  await expect(page.locator("html")).toHaveAttribute("data-renderer", "3d", { timeout: 60_000 });
  for (const [item, btn, mode] of [
    ["tower", "#towerFloors button", "tower"],
    ["boss", "#bossLevels button", "boss"],
  ] as const) {
    await page.evaluate(() => (window as any).__tinhtu.menu.openMenu("main"));
    await page.locator(`.tt-main-item[data-item="${item}"]`).click();
    await page.locator(btn).first().click();
    await expect.poll(() => r3(page), { timeout: 60_000 }).toEqual({ arena: mode, shown: "block" });
    await page.keyboard.press("Escape");
    await page.locator('#modal [data-act="menu"]').click();
    await expect.poll(() => page.evaluate(() => (window as any).__tinhtu.S.G.mode)).toBe("world");
    await expect.poll(() => r3(page), { timeout: 60_000 }).toEqual({ arena: null, shown: "block" });
  }
  expect(errors).toEqual([]);
});
