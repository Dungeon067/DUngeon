import { expect, test, type Page } from "@playwright/test";

/* S23: câu đố nguyên tố trên Đảo Lạc và bí cảnh. Đánh thật bằng nhân vật đội khởi đầu (Thủy, Hỏa, Phong); Thổ dùng xung nguyên tố. */

const T = "window.__tinhtu";
const ev = <R>(page: Page, f: string): Promise<R> => page.evaluate(f) as Promise<R>;

async function boot(page: Page, errors: string[]) {
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("./?e2e");
  await page.evaluate(() => localStorage.setItem("tinhtu-hints-v1", "1"));
  await expect.poll(() => ev(page, `${T}?.S.scene === "play" && !!${T}.pz`)).toBe(true);
}
/** Đứng cạnh vật thể đầu tiên chưa xong của câu đố, quái quanh đó đứng yên. */
const goTo = (page: Page, id: string) =>
  ev(
    page,
    `(() => { const G = ${T}.S.G; for (const e of G.enemies) { e.state = "idle"; e.dead = true; }
      const st = G.map.puzzles.find((s) => s.id === "${id}"); const o = st.objs.find((o) => !o.done) ?? st.objs[0];
      G.p.x = o.x - 34; G.p.y = o.y + 4; G.p.dirX = 1; G.p.dirY = 0; G.p.ang = 0; G.p.fx = 1; return true; })()`,
  );
const solved = (page: Page, id: string) => ev<boolean>(page, `${T}.Server.P.puz.solved.includes("${id}")`);

/** Đánh thường bằng nhân vật thứ `slot` (1 Sương Mai Thủy, 2 Mai Linh Hỏa, 3 Bạch Vũ Phong) cho tới khi câu đố giải xong. */
async function solveByAttack(page: Page, id: string, slot: number) {
  await page.keyboard.press(`Digit${slot}`);
  await page.waitForTimeout(300);
  for (let i = 0; i < 40 && !(await solved(page, id)); i++) {
    await goTo(page, id);
    await page.keyboard.press("KeyJ");
    await page.waitForTimeout(260);
  }
  expect(await solved(page, id)).toBe(true);
}

test.describe("câu đố nguyên tố", () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop", "Bàn phím"));

  test("Hỏa: Mai Linh thắp bốn đèn canh; Thủy: Sương Mai tưới mầm; Phong: Bạch Vũ quay cối gió", async ({ page }) => {
    const errors: string[] = [];
    await boot(page, errors);
    const gems0 = await ev<number>(page, `${T}.Server.P.gems`);
    await solveByAttack(page, "den-canh-ven-bien", 2);
    await solveByAttack(page, "ruong-kho", 1);
    await solveByAttack(page, "coi-gio-bom-nuoc", 3);
    expect(await ev<number>(page, `${T}.Server.P.gems`)).toBeGreaterThan(gems0);
    // Lưu sau khi tải lại.
    await page.reload();
    await expect.poll(() => ev(page, `${T}?.S.scene === "play" && !!${T}.pz`)).toBe(true);
    expect(await ev(page, `${T}.S.G.map.puzzles.find((s) => s.id === "ruong-kho").solved`)).toBe(true);
    expect(errors).toEqual([]);
  });

  test("Thổ: tường nứt chặn đường cho tới khi có đòn Thổ", async ({ page }) => {
    const errors: string[] = [];
    await boot(page, errors);
    const id = "cua-ham-ngoc";
    const block = `(() => { const G = ${T}.S.G, o = G.map.puzzles.find((s) => s.id === "${id}").objs[0]; return [o.done, o.def.chan]; })()`;
    expect(await ev(page, block)).toEqual([false, true]);
    await ev(
      page,
      `(() => { const o = ${T}.S.G.map.puzzles.find((s) => s.id === "${id}").objs[0]; ${T}.pz.pulse(o.x, o.y, 20, "fire"); })()`,
    );
    expect(await solved(page, id)).toBe(false);
    await ev(
      page,
      `(() => { const o = ${T}.S.G.map.puzzles.find((s) => s.id === "${id}").objs[0]; ${T}.pz.pulse(o.x, o.y, 20, "earth"); })()`,
    );
    await expect.poll(() => solved(page, id)).toBe(true);
    expect(errors).toEqual([]);
  });

  test("bí cảnh: mở cửa bằng lửa, vào, qua phòng, ra lại Đảo Lạc", async ({ page }) => {
    const errors: string[] = [];
    await boot(page, errors);
    await solveByAttack(page, "cua-lo-den", 2);
    await ev(
      page,
      `(() => { const G = ${T}.S.G, g = G.map.portals.find((p) => p.gate === "cua-lo-den"); G.p.x = g.x; G.p.y = g.y + 24; })()`,
    );
    await expect.poll(() => ev(page, `${T}.S.G.interact?.kind`)).toBe("portal");
    const back = await ev<[number, number]>(page, `[${T}.S.G.p.x, ${T}.S.G.p.y]`);
    await page.keyboard.press("KeyF");
    await expect.poll(() => ev(page, `${T}.S.G.mode`)).toBe("domain");
    expect(await ev(page, `${T}.S.G.map.rooms.length`)).toBeGreaterThanOrEqual(5);
    // Giải phòng câu đố đầu, tiến độ được lưu.
    await ev(
      page,
      `(() => { const st = ${T}.S.G.map.puzzles[0]; for (const o of st.objs) ${T}.pz.pulse(o.x, o.y, 10, "fire"); })()`,
    );
    await expect.poll(() => ev(page, `${T}.Server.P.puz.domains["lo-den-pho-cu"]?.room ?? 0`)).toBeGreaterThan(0);
    // Ra ở sảnh.
    await ev(page, `(() => { const G = ${T}.S.G; G.p.x = G.respawn.x; G.p.y = G.respawn.y - 110; })()`);
    await expect.poll(() => ev(page, `${T}.S.G.interact?.kind`)).toBe("dexit");
    await page.keyboard.press("KeyF");
    await expect.poll(() => ev(page, `${T}.S.G.mode`)).toBe("world");
    const pos = await ev<[number, number]>(page, `[${T}.S.G.p.x, ${T}.S.G.p.y]`);
    expect(Math.hypot(pos[0] - back[0], pos[1] - back[1])).toBeLessThan(200);
    expect(errors).toEqual([]);
  });
});
