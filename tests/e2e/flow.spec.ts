import { expect, test, type Page } from "@playwright/test";

/* S10: vào thẳng Đảo Lạc, menu là lớp phủ. Các luồng chính: đội hình, ước nguyện, nhân vật, bản đồ, Tháp, Boss, Admin. */

declare global {
  interface Window {
    __tinhtu: {
      S: any;
      Server: any;
      menu: { openMenu(id?: string, p?: any): void; closeMenu(): void; currentScreen(): string | null };
    };
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

const S = (page: Page, f: string) => page.evaluate(`window.__tinhtu.S.${f}`);
const P = (page: Page, f: string) => page.evaluate(`window.__tinhtu.Server.P.${f}`);
const screen = (page: Page) => page.evaluate(() => window.__tinhtu.menu.currentScreen());
const menu = (page: Page) => page.locator("#ttMenu");

async function boot(page: Page) {
  await page.goto("./?e2e");
  await page.evaluate(() => localStorage.setItem("tinhtu-hints-v1", "1"));
  await expect.poll(() => S(page, "scene")).toBe("play");
  expect(await S(page, "G.mode")).toBe("world");
  await expect(page.locator("#hud")).toBeVisible();
}
async function msOk(page: Page) {
  await expect(menu(page)).toHaveAttribute("data-ms", /\d+/);
  expect(Number(await menu(page).getAttribute("data-ms"))).toBeLessThan(250);
}
/** Dọn quái quanh người chơi để không bị chặn vì đang chiến đấu. */
const calm = (page: Page) =>
  page.evaluate(() => {
    for (const e of window.__tinhtu.S.G.enemies) {
      e.state = "idle";
      e.hitT = 0;
    }
  });

test.describe("máy tính", () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop", "Bàn phím và chuột"));

  test("vào thẳng Đảo Lạc, menu lớp phủ giữ vị trí, điều hướng bằng bàn phím", async ({ page }) => {
    const errors = watchErrors(page);
    await boot(page);
    await expect(page.locator("#sHub")).toHaveCount(0);
    await expect(page.getByText("Admin", { exact: false })).toHaveCount(0);
    // Click lấy tiêu điểm là một đòn đánh thường (có thể nhích bước), nên chốt vị trí khi menu đã mở.
    await page.locator("#game").click({ position: { x: 300, y: 200 } });
    await page.keyboard.press("Escape");
    await expect(menu(page)).toBeVisible();
    const pos = await page.evaluate(() => [window.__tinhtu.S.G.p.x, window.__tinhtu.S.G.p.y]);
    await msOk(page);
    expect(await screen(page)).toBe("main");
    expect(await S(page, "paused")).toBe(true);
    expect(await S(page, "overlay")).toBe("menu");

    // Tab tới mục Nhân vật rồi Enter
    await page.locator('.tt-main-item[data-item="chars"]').focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => screen(page)).toBe("chars");
    await msOk(page);
    await page.keyboard.press("Escape");
    await expect.poll(() => screen(page)).toBe("main");
    await page.keyboard.press("Escape");
    await expect(menu(page)).toBeHidden();
    expect(await S(page, "paused")).toBe(false);
    expect(await page.evaluate(() => [window.__tinhtu.S.G.p.x, window.__tinhtu.S.G.p.y])).toEqual(pos);
    expect(await S(page, "G.mode")).toBe("world");
    expect(errors).toEqual([]);
  });

  test("đổi đội trên đảo từ menu nhanh, kéo thả, gợi ý phản ứng, chặn khi đang chiến đấu", async ({ page }) => {
    const errors = watchErrors(page);
    await boot(page);
    await calm(page);
    await page.locator("#qm-team").click();
    await expect.poll(() => screen(page)).toBe("team");
    await expect(page.locator("#teamReact")).toContainText(/Đội này|phản ứng/);

    // Đội 2: chọn ô 1 bằng phím rồi kéo một nhân vật vào ô 2
    await page.keyboard.press("e");
    await expect(page.getByRole("tab", { name: /Đội 2/ })).toHaveAttribute("aria-selected", "true");
    const owned = (await P(page, "party")) as string[];
    await page.keyboard.press("1");
    await page.locator(`.tt-roster [data-id="${owned[0]}"]`).click();
    await page.locator(`.tt-roster [data-id="${owned[1]}"]`).dragTo(page.locator(".tt-tslot").nth(1));
    await expect(page.locator(".tt-tslot").nth(1)).toContainText(/\S/);
    await page.locator("#teamUse").click();
    await expect.poll(() => P(page, "team")).toBe(1);
    expect(((await P(page, "party")) as string[]).slice(0, 2)).toEqual([owned[0], owned[1]]);

    // Có quái đang đuổi ở gần: không cho đổi
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    await expect(menu(page)).toBeHidden();
    await page.evaluate(() => {
      const G = window.__tinhtu.S.G;
      const e = G.enemies.find((x: any) => !x.dead);
      e.x = e.hx = G.p.x + 60;
      e.y = e.hy = G.p.y;
      e.state = "chase";
      window.__tinhtu.menu.openMenu("team");
    });
    await expect(page.locator("#teamLock")).toHaveText("Không thể đổi đội khi đang chiến đấu");
    await expect(page.locator("#teamUse")).toBeDisabled();
    expect(errors).toEqual([]);
  });

  test("ước 1 lần và 10 lần, bỏ qua hoạt ảnh, lịch sử và Bảo Hộ Vận Sao cập nhật", async ({ page }) => {
    const errors = watchErrors(page);
    await boot(page);
    await page.evaluate(() => window.__tinhtu.Server.req("give", { kind: "gem", amount: 3200 }));
    await page.locator("#qm-wish").click();
    await expect.poll(() => screen(page)).toBe("wish");
    const before = (await P(page, "history.length")) as number;
    for (const btn of [/Ước 1 lần/, /Ước 10 lần/]) {
      await page.getByRole("button", { name: btn }).click();
      await expect(page.locator("#wishFx")).toBeVisible();
      for (let i = 0; i < 25 && (await page.locator("#wishFx").isVisible()); i++) {
        if (await page.locator("#wishSkip").isVisible()) await page.locator("#wishSkip").click();
        else await page.locator("#wishFx").click({ position: { x: 20, y: 20 } });
        await page.waitForTimeout(150);
      }
      await expect(page.locator("#wishFx")).toBeHidden();
    }
    expect(await P(page, "history.length")).toBe(before + 11);
    await page.getByRole("tab", { name: "Lịch sử" }).click();
    await expect(page.locator("#wishHist li").first()).toBeVisible();
    await page.getByRole("tab", { name: "Banner" }).click();
    await expect(page.locator("#wishPity")).toContainText("Bảo Hộ Vận Sao");
    expect(errors).toEqual([]);
  });

  test("nhân vật: đổi tab bằng Q/E, đổi người bằng mũi tên và vuốt, hồ sơ đầy đủ", async ({ page }) => {
    const errors = watchErrors(page);
    await boot(page);
    await page.evaluate(() => window.__tinhtu.menu.openMenu("chars"));
    const cur = () => page.locator(".tt-char-detail").getAttribute("data-id");
    const a = await cur();
    await page.locator(".tt-char-head .name").click();
    await page.keyboard.press("ArrowRight");
    await expect.poll(cur).not.toBe(a);
    const b = await cur();
    const head = (await page.locator(".tt-char-head").boundingBox())!;
    await page.mouse.move(head.x + head.width - 20, head.y + 60);
    await page.mouse.down();
    await page.mouse.move(head.x + 20, head.y + 64, { steps: 6 });
    await page.mouse.up();
    await expect.poll(cur).not.toBe(b);

    for (const name of ["Vũ Khí", "Bảo Ấn", "Nét Sao", "Kỹ Năng", "Hồ Sơ"]) {
      await page.keyboard.press("e");
      await expect(page.getByRole("tab", { name })).toHaveAttribute("aria-selected", "true");
    }
    await expect(page.locator(".tt-tabpanel")).not.toContainText("Đang biên soạn");
    expect(errors).toEqual([]);
  });

  test("bản đồ lớn: chọn Bia Đá, dịch chuyển nhanh", async ({ page }) => {
    const errors = watchErrors(page);
    await boot(page);
    const target = await page.evaluate(() => {
      const G = window.__tinhtu.S.G,
        s = G.map.statues[0];
      G.p.x = (s.x + 6) * 40;
      G.p.y = (s.y + 6) * 40;
      for (const e of G.enemies) {
        e.state = "idle";
        e.hitT = 0;
      }
      window.__tinhtu.menu.openMenu("map", { focus: "statue" });
      return [(s.x + 0.5) * 40, (s.y + 2.5) * 40];
    });
    await page.locator("#mapCv").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#mapSel")).toHaveText("Bia Đá 1");
    await page.locator("#mapTravel").click();
    await expect(menu(page)).toBeHidden();
    expect(await page.evaluate(() => [window.__tinhtu.S.G.p.x, window.__tinhtu.S.G.p.y])).toEqual(target);
    expect(errors).toEqual([]);
  });

  test("vào Tháp và Boss từ menu, rời trận thì về lại Đảo Lạc", async ({ page }) => {
    const errors = watchErrors(page);
    await boot(page);
    for (const [item, btn, mode] of [
      ["tower", "#towerFloors button", "tower"],
      ["boss", "#bossLevels button", "boss"],
    ] as const) {
      await page.evaluate(() => window.__tinhtu.menu.openMenu("main"));
      await page.locator(`.tt-main-item[data-item="${item}"]`).click();
      await page.locator(btn).first().click();
      await expect.poll(() => S(page, "G.mode")).toBe(mode);
      if (mode === "boss") await expect(page.locator("#bossBar")).toBeVisible();
      await page.waitForTimeout(1200);
      await page.keyboard.press("Escape");
      await page.locator('#modal [data-act="menu"]').click();
      await expect.poll(() => S(page, "G.mode")).toBe("world");
    }
    expect(await P(page, "quits.length")).toBeGreaterThanOrEqual(2);
    expect(errors).toEqual([]);
  });

  test("trang Admin: đăng nhập, cấp Đá Sao, game thấy ngay", async ({ page, context }) => {
    const errors = watchErrors(page);
    await boot(page);
    const gems = (await P(page, "gems")) as number;
    const adm = await context.newPage();
    const admErrors = watchErrors(adm);
    await adm.goto("./admin/");
    await adm.getByLabel("Mật khẩu").fill("sai-mat-khau");
    await adm.keyboard.press("Enter");
    await expect(adm.locator(".tt-field.is-error")).toBeVisible();
    await adm.getByLabel("Mật khẩu").fill("tinhtu-admin");
    await adm.keyboard.press("Enter");
    await expect(adm.getByRole("heading", { name: "Tổng quan" })).toBeVisible();
    await adm.getByRole("link", { name: "Cấp tài nguyên" }).click();
    await adm.getByLabel("Số lượng").fill("500");
    await adm.getByRole("button", { name: "Đá Sao", exact: true }).click();
    await expect.poll(() => P(page, "gems")).toBe(gems + 500);
    await adm.getByRole("link", { name: "Nhật ký request" }).click();
    await expect(adm.locator("table")).toContainText("give");
    expect(errors).toEqual([]);
    expect(admErrors).toEqual([]);
  });
});

test("điện thoại: vào thẳng Đảo Lạc, bấm nút đánh, mở menu chính", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "Chỉ chạy trên cấu hình điện thoại");
  const errors = watchErrors(page);
  await page.goto("./?e2e");
  await expect.poll(() => S(page, "scene")).toBe("play");
  await expect(page.locator("#bAtk")).toBeVisible();
  await page.locator("#bAtk").tap();
  await page.waitForTimeout(500);
  await page.locator("#qm-main").tap();
  await expect(menu(page)).toBeVisible();
  await page.screenshot({ path: info.outputPath("mobile-menu.png") });
  expect(errors).toEqual([]);
});
