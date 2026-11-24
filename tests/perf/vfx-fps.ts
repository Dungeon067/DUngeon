// Đo FPS thời gian thực khi tung chiêu nặng VFX, khung hình kiểu điện thoại ngang 844x390, đồ họa vừa.
// Kịch bản: nộ Mai Linh (pháo hoa), nộ Bạch Vũ (Bão Trắng), Golnar đánh thường pháp khí Băng; mỗi cảnh 4 giây.
// Chạy: pnpm build && pnpm exec vite preview --port 4190 & tsx tests/perf/vfx-fps.ts http://localhost:4190/
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:4190/";
const SCENES: [string, string][] = [
  ["mailinh", "T.cap.castKitBurst()"],
  ["bachvu", "T.cap.castKitBurst()"],
  ["golnar", "setInterval(() => T.cap.press('atk'), 280)"],
];
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 844, height: 390 } });
const rows = [];
for (const [who, cast] of SCENES.filter(([w]) => !process.env.ONLY || process.env.ONLY.split(",").includes(w))) {
  await page.goto(url + "?e2e&renderer=3d");
  await page.evaluate(`(() => { localStorage.setItem("tinhtu-hints-v1", "1");
    localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: "medium" })); })()`);
  await page.reload();
  await page.waitForFunction(`window.__tinhtu?.S?.scene === "play"`, null, { timeout: 120_000 });
  await page.evaluate(`(() => { const T = window.__tinhtu, P = T.Server.P; P.gm.god = true;
    P.owned[${JSON.stringify(who)}] = P.owned[${JSON.stringify(who)}] || { lv: 60, cons: 0 }; P.party = [${JSON.stringify(who)}];
    T.menu.openMenu("main"); })()`);
  await page.locator('.tt-main-item[data-item="tower"]').click();
  await page.locator("#towerFloors button").first().click();
  await page.waitForFunction(`window.__tinhtu.r3?.()?.debug?.()?.arena?.kind === "tower"`, null, { timeout: 60_000 });
  await page.waitForTimeout(2000);
  const r: any = await page.evaluate(`new Promise((resolve) => { const T = window.__tinhtu, S = T.S, G = S.G;
    G.enemies.length = 0; const p = G.p;
    for (const [dx, dy] of [[0, -130], [-70, -175], [70, -175]]) {
      const e = T.cap.makeEnemy("slime", p.x + dx, p.y + dy, 20, null);
      e.hp = e.maxHp = 1e8; e.spd = 0; e.speed = 0; e.atkCd = 1e9; G.enemies.push(e); }
    const m = G.party[G.act]; m.energy = m.c.burst.cost;
    const iv = ${cast};
    const ts = [], t0 = performance.now();
    const tick = (t) => { ts.push(t);
      if (t - t0 < 4000) return requestAnimationFrame(tick);
      if (typeof iv === "number") clearInterval(iv);
      const d = ts.slice(1).map((x, i) => x - ts[i]), s = [...d].sort((a, b) => a - b);
      resolve({ avg: d.reduce((a, b) => a + b, 0) / d.length, p95: s[Math.floor(s.length * 0.95)] }); };
    requestAnimationFrame(tick); })`);
  rows.push({ cảnh: who, fps: +(1000 / r.avg).toFixed(1), p95ms: +r.p95.toFixed(1) });
}
console.table(rows);
await browser.close();
