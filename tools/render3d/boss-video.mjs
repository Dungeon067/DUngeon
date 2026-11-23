/**
 * S29: quay trận Hắc Giao trong đấu trường S28 (GLB mới): bơi, quạt đuôi, mưa nước, lao, gọi quái,
 * gầm chuyển giai đoạn 2, rồi bị hạ và tan thành bụi sao. Cần dev server: pnpm dev --port 5173.
 * Quay xác định: tự cấp khung (requestAnimationFrame + performance.now ảo), mỗi khung tiến đúng 1/60 giây,
 * chụp từng khung rồi ghép ffmpeg 60 FPS, nên tốc độ trong video là tốc độ thật của game.
 * Chạy: node tools/render3d/boss-video.mjs [outDir] [giây]
 */
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2] ?? "s29-video",
  secs = +(process.argv[3] ?? 75);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const FPS = 60;
mkdirSync(out, { recursive: true });
const tmp = join(out, "_boss");
mkdirSync(tmp, { recursive: true });
rmSync(tmp, { recursive: true, force: true });
const b = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx2 = await b.newContext({ viewport: { width: 1280, height: 720 } });
await ctx2.addInitScript(() => {
  const realRaf = window.requestAnimationFrame.bind(window),
    realNow = performance.now.bind(performance);
  let on = false,
    vt = 0,
    q = [];
  window.requestAnimationFrame = (cb) => (on ? (q.push(cb), q.length) : realRaf(cb));
  performance.now = () => (on ? vt : realNow());
  window.__det = {
    start() {
      vt = realNow() + 100;
      on = true;
    },
    step(ms) {
      vt += ms;
      const cbs = q;
      q = [];
      for (const cb of cbs) cb(vt);
      return cbs.length;
    },
  };
});
const p2 = await ctx2.newPage();
p2.on("pageerror", (e) => console.log("[pageerror]", e.message));
await p2.goto("http://127.0.0.1:5173/?e2e&renderer=3d");
await p2.evaluate(() => {
  localStorage.setItem("tinhtu-hints-v1", "1");
  localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: "high" }));
});
await p2.reload();
await p2.waitForFunction(() => window.__tinhtu?.S?.scene === "play" && window.__tinhtu.S.G.time > 3, null, {
  timeout: 300000,
});
await p2.evaluate(() => {
  const T = window.__tinhtu,
    P = T.Server.P;
  for (const k of Object.keys(P.owned)) P.owned[k].lv = 40;
  T.Server.save();
  T.menu.openMenu("main");
});
await p2.locator('.tt-main-item[data-item="boss"]').click();
await p2.locator("#bossLevels button").first().click();
await p2.waitForFunction(() => window.__tinhtu.S.G.mode === "boss" && !!window.__tinhtu.S.G.boss, null, {
  timeout: 60000,
});
await p2.evaluate(() => window.__det.start());
await sleep(200);
let phase2 = false,
  killed = false,
  hold = [],
  n = 0;
const keys = { up: "KeyW", down: "KeyS", left: "KeyA", right: "KeyD" };
const total = Math.round(secs * FPS);
// Bot đơn giản: 21 khung (0,35 giây game) đổi một lần hướng đi và đòn đánh.
for (let f = 0; f < total; f++) {
  const el = f / FPS;
  if (f % 21 === 0 && !killed) {
    const st = await p2.evaluate(() => {
      const G = window.__tinhtu.S.G,
        bo = G.boss;
      if (!bo) return null;
      G.p.hp = Math.max(G.p.hp ?? 0, (G.p.maxHp ?? 900) * 0.6);
      return { dx: bo.x - G.p.x, dy: bo.y - G.p.y };
    });
    if (!st) break;
    for (const k of hold) await p2.keyboard.up(k);
    const d = Math.hypot(st.dx, st.dy);
    hold = [];
    if (d > 140) {
      if (Math.abs(st.dx) > 40) hold.push(st.dx > 0 ? keys.right : keys.left);
      if (Math.abs(st.dy) > 40) hold.push(st.dy > 0 ? keys.down : keys.up);
    } else hold.push(f % 42 ? keys.left : keys.right);
    for (const k of hold) await p2.keyboard.down(k);
    await p2.keyboard.press(d < 220 || f % 63 ? "KeyJ" : "KeyE");
    if (f % 252 === 126) await p2.keyboard.press("ShiftLeft");
  }
  if (!phase2 && el > secs * 0.35) {
    phase2 = true;
    await p2.evaluate(() => {
      const bo = window.__tinhtu.S.G.boss;
      bo.hp = bo.maxHp * 0.45;
    });
  }
  if (!killed && el > secs * 0.8) {
    killed = true;
    for (const k of hold) await p2.keyboard.up(k);
    hold = [];
    await p2.evaluate(async () => {
      const bo = window.__tinhtu.S.G.boss;
      bo.hp = 0;
      (await import("/src/entities/boss.ts")).bossDefeated();
    });
  }
  await p2.evaluate((ms) => window.__det.step(ms), 1000 / FPS);
  await p2.screenshot({ path: join(tmp, `f${String(n++).padStart(5, "0")}.jpg`), type: "jpeg", quality: 88 });
  if (f % 600 === 0) console.log(`[s29] khung ${f}/${total}`);
}
await ctx2.close();
const mp4 = join(out, "hacgiao-arena.mp4");
console.log("[s29] số khung", readdirSync(tmp).length);
execFileSync("ffmpeg", [
  "-y",
  "-loglevel",
  "error",
  "-framerate",
  String(FPS),
  "-i",
  join(tmp, "f%05d.jpg"),
  "-r",
  String(FPS),
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "24",
  mp4,
]);
rmSync(tmp, { recursive: true, force: true });
console.log("[s29] video", mp4);
await b.close();
