// Quay video 60 giây cùng một kịch bản chiến đấu để so sánh cảm giác đánh trước và sau S14.
// Chạy: pnpm build && pnpm record [url] [file.webm]
// Mặc định url là bản build hiện tại (vite preview). NOVIDEO=1 chỉ đo FPS, không quay. Mã chạy trong trình duyệt được truyền dạng chuỗi để tsx không chèn hàm trợ giúp.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, renameSync } from "node:fs";
import { dirname } from "node:path";

const PORT = 4181;
const url = process.argv[2] ?? `http://localhost:${PORT}/`;
const out = process.argv[3] ?? "test-results/record/combat.webm";
const server = process.argv[2]
  ? null
  : spawn("pnpm", ["exec", "vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
if (server) await new Promise((r) => setTimeout(r, 2000));

const W = 1280,
  H = 720;
// FPS_UNCAPPED=1 bỏ giới hạn 60 khung hình/giây để thấy chênh lệch thời gian xử lý.
const browser = await chromium.launch({
  args: process.env.FPS_UNCAPPED ? ["--disable-frame-rate-limit", "--disable-gpu-vsync"] : [],
});
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  ...(process.env.NOVIDEO ? {} : { recordVideo: { dir: dirname(out), size: { width: W, height: H } } }),
});
const page = await ctx.newPage();
try {
  await page.goto(url + (url.includes("?") ? "&" : "?") + "e2e");
  await page.waitForTimeout(800);
  // Bất tử và đội 4 người để kịch bản giống nhau ở cả hai bản.
  await page.evaluate(`(() => { const P = window.__tinhtu.Server.P; P.gm.god = true;
    for (const id of ["lachong","thuynguyet","loidinh","thachson"]) P.owned[id] = P.owned[id] || { lv: 40, cons: 0 };
    P.party = ["lachong","thuynguyet","loidinh","thachson"]; })()`);
  await page.locator('[data-go="world"]').click();
  await page.waitForTimeout(1200);
  // Bật âm thanh để đo cả chi phí âm thanh, rồi đếm khung hình suốt 60 giây.
  await page.evaluate(`(() => { window.__tinhtu.S.soundOn = true; const ts = window.__fps = [];
    const tick = (t) => { ts.push(t); requestAnimationFrame(tick); }; requestAnimationFrame(tick); })()`);
  const toCamp = `(() => { const G = window.__tinhtu.S.G; const es = G.enemies.filter(e => !e.dead && !e.isBoss);
    es.sort((a,b) => Math.hypot(a.x-G.p.x,a.y-G.p.y) - Math.hypot(b.x-G.p.x,b.y-G.p.y));
    const e = es[0]; if (e) { G.p.x = e.x; G.p.y = e.y + 70; } })()`;
  const t0 = Date.now();
  const left = () => 60_000 - (Date.now() - t0);
  const key = async (k: string, hold = 60) => {
    await page.keyboard.down(k);
    await page.waitForTimeout(hold);
    await page.keyboard.up(k);
  };
  // 34 giây ở Đảo Lạc: combo, kỹ năng, lướt né, nộ, đổi nhân vật.
  let round = 0;
  while (Date.now() - t0 < 34_000) {
    await page.evaluate(toCamp);
    await page.keyboard.press(String((round % 4) + 1));
    await page.mouse.move(W / 2, H / 2 - 40);
    await page.mouse.down();
    await page.waitForTimeout(1300);
    await page.mouse.up();
    await key("e");
    await page.waitForTimeout(400);
    await page.keyboard.down("a");
    await key("Shift");
    await page.waitForTimeout(250);
    await page.keyboard.up("a");
    await page.mouse.down();
    await page.waitForTimeout(900);
    await page.mouse.up();
    if (round % 2 === 1) {
      await page.evaluate(
        `(() => { const m = window.__tinhtu.S.G.party[window.__tinhtu.S.G.act]; m.energy = m.c.burst.cost; })()`,
      );
      await key("q");
      await page.waitForTimeout(1800);
    }
    round++;
  }
  // 26 giây đánh Hắc Giao, cuối cùng hạ boss.
  await page.keyboard.press("Escape");
  await page.locator('#modal [data-act="menu"]').click();
  await page.locator('[data-go="boss"]').click();
  await page.locator("#bossLv button").first().click();
  await page.waitForTimeout(1500);
  const nearBoss = `(() => { const G = window.__tinhtu.S.G; const b = G.boss; G.p.x = b.x; G.p.y = Math.min(G.bounds.h - 60, b.y + 110); })()`;
  while (left() > 6_000) {
    await page.evaluate(nearBoss);
    await page.mouse.move(W / 2, H / 2 - 80);
    await page.mouse.down();
    await page.waitForTimeout(1500);
    await page.mouse.up();
    await key("e");
    await page.keyboard.down("d");
    await key("Shift");
    await page.waitForTimeout(300);
    await page.keyboard.up("d");
    await page.evaluate(
      `(() => { const m = window.__tinhtu.S.G.party[window.__tinhtu.S.G.act]; m.energy = m.c.burst.cost; })()`,
    );
    await key("q");
    await page.waitForTimeout(1500);
  }
  await page.evaluate(`(() => { const b = window.__tinhtu.S.G.boss; b.hp = Math.min(b.hp, 1); })()`);
  await page.evaluate(nearBoss);
  await page.mouse.down();
  await page.waitForTimeout(Math.max(1000, left()));
  await page.mouse.up();
  const r: { fps: number; p95: number; slow: number } = await page.evaluate(`(() => { const ts = window.__fps;
    const d = ts.slice(1).map((x, i) => x - ts[i]).filter((x) => x < 500); const s = [...d].sort((a, b) => a - b);
    return { fps: +(1000 / (d.reduce((a, b) => a + b, 0) / d.length)).toFixed(1), p95: +s[Math.floor(s.length * 0.95)].toFixed(1), slow: d.filter((x) => x > 20).length }; })()`);
  console.log("FPS:", JSON.stringify(r));
} finally {
  const v = page.video();
  await ctx.close();
  if (v) {
    mkdirSync(dirname(out), { recursive: true });
    renameSync(await v.path(), out);
    console.log("Đã lưu video:", out);
  }
  await browser.close();
  server?.kill();
}
