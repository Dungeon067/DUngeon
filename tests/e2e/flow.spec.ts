import { expect, test, type Page } from "@playwright/test";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    __tinhtu: { S: any; Server: any };
  }
}

function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

const scene = (page: Page) => page.evaluate(() => window.__tinhtu.S.scene as string);
const mode = (page: Page) => page.evaluate(() => window.__tinhtu.S.G?.mode as string | undefined);

async function backToHub(page: Page) {
  await page.keyboard.press("Escape");
  await page.locator('#modal [data-act="menu"]').click();
  await expect(page.locator("#sHub")).toBeVisible();
  expect(await scene(page)).toBe("menu");
}

test("mở game, đánh quái, ước 10 lần, vào Tháp, vào Boss, không lỗi console", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Luồng đầy đủ dùng chuột và bàn phím");
  const errors = watchErrors(page);
  await page.goto("./?e2e");
  await expect(page.locator("#sHub")).toBeVisible();
  await expect(page).toHaveTitle("Tinh Tú Ước Nguyện");

  // Vào Đảo Lạc
  await page.locator('[data-go="world"]').click();
  await expect.poll(() => scene(page)).toBe("play");
  expect(await mode(page)).toBe("world");
  await expect(page.locator("#hud")).toBeVisible();

  // Đánh quái: đưa người chơi tới cạnh con quái gần nhất rồi giữ chuột để chém
  const hp0 = await page.evaluate(() => {
    const G = window.__tinhtu.S.G;
    const e = G.enemies.filter((x: any) => !x.dead).sort((a: any, b: any) => Math.hypot(a.x - G.p.x, a.y - G.p.y) - Math.hypot(b.x - G.p.x, b.y - G.p.y))[0];
    G.p.x = e.x;
    G.p.y = e.y + e.r + 18;
    G.__target = e;
    return e.hp as number;
  });
  await page.mouse.move(640, 300);
  await page.mouse.down();
  await expect
    .poll(() => page.evaluate(() => window.__tinhtu.S.G.__target.hp as number), { timeout: 15_000 })
    .toBeLessThan(hp0);
  await page.mouse.up();
  await backToHub(page);

  // Ước nguyện 10 lần
  await page.locator('[data-go="wish"]').click();
  await expect(page.locator("#sWish")).toBeVisible();
  const before = await page.evaluate(() => window.__tinhtu.Server.P.history.length as number);
  await page.locator("#pull10").click();
  await expect(page.locator("#wishFx")).toBeVisible();
  for (let i = 0; i < 20 && (await page.locator("#wishFx").isVisible()); i++) {
    await page.locator("#wishSkip").click();
    await page.waitForTimeout(150);
  }
  await expect(page.locator("#wishFx")).toBeHidden();
  expect(await page.evaluate(() => window.__tinhtu.Server.P.history.length as number)).toBe(before + 10);
  await page.locator("#sWish .back").click();
  await expect(page.locator("#sHub")).toBeVisible();

  // Tháp Tinh Tú
  await page.locator('[data-go="tower"]').click();
  await page.locator("#floors button").first().click();
  await expect.poll(() => scene(page)).toBe("play");
  expect(await mode(page)).toBe("tower");
  await page.waitForTimeout(1500);
  await backToHub(page);

  // Hang Hắc Giao
  await page.locator('[data-go="boss"]').click();
  await page.locator("#bossLv button").first().click();
  await expect.poll(() => scene(page)).toBe("play");
  expect(await mode(page)).toBe("boss");
  await expect(page.locator("#bossBar")).toBeVisible();
  await page.waitForTimeout(1500);
  await backToHub(page);

  expect(errors).toEqual([]);
});

test("điện thoại: mở game, vào Đảo Lạc, bấm nút đánh", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "Chỉ chạy trên cấu hình điện thoại");
  const errors = watchErrors(page);
  await page.goto("./?e2e");
  await expect(page.locator("#sHub")).toBeVisible();
  await page.locator('[data-go="world"]').click();
  await expect.poll(() => scene(page)).toBe("play");
  await expect(page.locator("#bAtk")).toBeVisible();
  await page.locator("#bAtk").tap();
  await page.waitForTimeout(800);
  await page.screenshot({ path: info.outputPath("mobile-world.png") });
  expect(errors).toEqual([]);
});
