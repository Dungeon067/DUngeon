/**
 * Quay video, chụp ảnh và đo fps cho mốc duyệt 1 của renderer 3D (S25).
 * Cần dev server: pnpm dev --port 5173. Chạy: node tools/render3d/milestone.mjs <video|shots|fps> [outDir]
 * Trình duyệt headless dùng SwiftShader (GPU giả bằng CPU) nên fps đo ở đây thấp hơn máy thật có GPU.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const URL0 = process.env.URL ?? "http://127.0.0.1:5173/";
const mode = process.argv[2] ?? "shots",
  out = process.argv[3] ?? "milestone";
mkdirSync(out, { recursive: true });
const ARGS = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function boot(b, w, h, { renderer = "3d", quality = "high", video } = {}) {
  const ctx = await b.newContext({
    viewport: { width: w, height: h },
    ...(video ? { recordVideo: { dir: out, size: { width: w, height: h } } } : {}),
  });
  const pg = await ctx.newPage();
  pg.on("pageerror", (e) => console.log("[err]", e.message));
  await pg.goto(`${URL0}?e2e&renderer=${renderer}`);
  await pg.evaluate((q) => {
    localStorage.setItem("tinhtu-hints-v1", "1");
    localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: q }));
  }, quality);
  await pg.waitForFunction(() => window.__tinhtu?.S?.scene === "play");
  await pg.evaluate(() => {
    const T = window.__tinhtu,
      P = T.Server.P;
    P.owned.havy = { lv: 20, cons: 0 };
    P.party = ["havy", ...P.party.filter((x) => x !== "havy").slice(0, 3)];
    T.Server.save();
  });
  await pg.reload();
  await pg.waitForFunction(() => window.__tinhtu?.S?.scene === "play" && !!window.__tinhtu.S.G.map);
  await calm(pg);
  await sleep(1500);
  return { ctx, pg };
}
/** Bỏ quái trong bán kính 16 ô quanh điểm xuất phát để cảnh quay gọn. */
const calm = (pg) =>
  pg.evaluate(() => {
    const G = window.__tinhtu.S.G;
    G.enemies = G.enemies.filter((e) => Math.hypot(e.x - G.p.x, e.y - G.p.y) > 640);
  });
const put = (pg, tx, ty) =>
  pg.evaluate(
    ([x, y]) => {
      const G = window.__tinhtu.S.G;
      G.p.x = x * 40;
      G.p.y = y * 40;
      G.cam.x = G.p.x;
      G.cam.y = G.p.y;
    },
    [tx, ty],
  );
const tod = (pg, t) => pg.evaluate((v) => (window.__tinhtu.S.tod = v), t);
async function hold(pg, keys, ms) {
  for (const k of keys) await pg.keyboard.down(k);
  await sleep(ms);
  for (const k of keys) await pg.keyboard.up(k);
}
const tap = async (pg, k, n = 1, gap = 380) => {
  for (let i = 0; i < n; i++) {
    await pg.keyboard.press(k);
    await sleep(gap);
  }
};
const fillBurst = (pg) =>
  pg.evaluate(() => {
    const G = window.__tinhtu.S.G,
      m = G.party[G.ci ?? 0] ?? G.party[0];
    for (const x of G.party) x.energy = 999;
    void m;
  });

const DIRS8 = [
  ["KeyS"],
  ["KeyS", "KeyD"],
  ["KeyD"],
  ["KeyW", "KeyD"],
  ["KeyW"],
  ["KeyW", "KeyA"],
  ["KeyA"],
  ["KeyS", "KeyA"],
];

async function demo(pg) {
  await tod(pg, 0.45);
  await put(pg, 60, 55);
  // 8 hướng chạy.
  for (const d of DIRS8) await hold(pg, d, 650);
  // Đứng yên thở.
  await sleep(700);
  // Nhảy lên bệ (bệ 1 bậc ở x 49..52, y 51..53).
  await put(pg, 50.5, 55.2);
  await sleep(300);
  await pg.keyboard.down("KeyW");
  await sleep(250);
  await pg.keyboard.press("Space");
  await sleep(700);
  await pg.keyboard.up("KeyW");
  await sleep(500);
  await hold(pg, ["KeyD"], 500);
  await sleep(300);
  // Đi dưới cầu cao rồi vào rừng (bị cây che, hiện bóng mờ).
  await put(pg, 55.5, 53.5);
  await hold(pg, ["KeyW"], 2600);
  await hold(pg, ["KeyW", "KeyD"], 700);
  await hold(pg, ["KeyS"], 2200);
  // Bắn cung chéo: 3 đòn theo hướng đông bắc rồi tây nam.
  await put(pg, 60, 56);
  await pg.keyboard.down("KeyW");
  await pg.keyboard.down("KeyD");
  await sleep(120);
  await tap(pg, "KeyJ", 3, 420);
  await pg.keyboard.up("KeyW");
  await pg.keyboard.up("KeyD");
  await hold(pg, ["KeyS", "KeyA"], 150);
  await tap(pg, "KeyJ", 3, 420);
  // Kỹ năng và nộ.
  await tap(pg, "KeyE", 1, 900);
  await fillBurst(pg);
  await tap(pg, "KeyQ", 1, 2600);
  // Ngày sang đêm.
  for (let t = 0.55; t <= 1.0; t += 0.015) {
    await tod(pg, t);
    await sleep(70);
  }
  await hold(pg, ["KeyW", "KeyA"], 900);
  await tap(pg, "KeyJ", 3, 420);
  await fillBurst(pg);
  await tap(pg, "KeyQ", 1, 2400);
  await hold(pg, ["KeyD"], 800);
}

async function measure(pg, ms = 5000) {
  return pg.evaluate(async (dur) => {
    const ts = [];
    await new Promise((res) => {
      const t0 = performance.now();
      const f = (t) => {
        ts.push(t);
        if (t - t0 < dur) requestAnimationFrame(f);
        else res();
      };
      requestAnimationFrame(f);
    });
    const d = ts
      .slice(1)
      .map((t, i) => t - ts[i])
      .sort((a, b) => a - b);
    const fps = (ts.length - 1) / ((ts.at(-1) - ts[0]) / 1000);
    const p95 = d[Math.floor(d.length * 0.95)];
    const r = window.__tinhtu.r3?.()?.stats?.();
    return { fps: +fps.toFixed(1), p95: +p95.toFixed(1), ...(r ?? {}) };
  }, ms);
}

const b = await chromium.launch({ args: ARGS });
if (mode === "video") {
  const { ctx, pg } = await boot(b, 844, 390, { video: true });
  await demo(pg);
  const v = pg.video();
  await ctx.close();
  console.log("video", await v.path());
} else if (mode === "shots") {
  for (const [w, h] of [
    [844, 390],
    [1920, 1080],
  ]) {
    const { ctx, pg } = await boot(b, w, h);
    await tod(pg, 0.42);
    await put(pg, 55.5, 51.2);
    await hold(pg, ["KeyW", "KeyD"], 200);
    await pg.keyboard.down("KeyW");
    await pg.keyboard.down("KeyD");
    await pg.keyboard.press("KeyJ");
    await sleep(140);
    await pg.screenshot({ path: `${out}/ngay-${w}x${h}.png` });
    await pg.keyboard.up("KeyW");
    await pg.keyboard.up("KeyD");
    await tod(pg, 0.93);
    await fillBurst(pg);
    await pg.keyboard.press("KeyQ");
    await sleep(2700);
    await pg.keyboard.down("KeyS");
    await pg.keyboard.down("KeyA");
    await pg.keyboard.press("KeyJ");
    await sleep(160);
    await pg.screenshot({ path: `${out}/dem-${w}x${h}.png` });
    await pg.keyboard.up("KeyS");
    await pg.keyboard.up("KeyA");
    await ctx.close();
  }
} else if (mode === "fps") {
  const rows = [];
  for (const [w, h] of [
    [844, 390],
    [1920, 1080],
  ])
    for (const [renderer, quality] of [
      ["2d", "high"],
      ["3d", "low"],
      ["3d", "medium"],
      ["3d", "high"],
    ])
      for (const cpu of [1, 4]) {
        const { ctx, pg } = await boot(b, w, h, { renderer, quality });
        const cdp = await ctx.newCDPSession(pg);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
        await tod(pg, 0.5);
        await pg.keyboard.down("KeyD");
        const runs = [];
        for (let i = 0; i < 3; i++) runs.push(await measure(pg, 3000));
        await pg.keyboard.up("KeyD");
        runs.sort((a, b) => a.fps - b.fps);
        const med = runs[1];
        rows.push({ size: `${w}x${h}`, renderer, quality, cpu: `${cpu}x`, ...med });
        console.log(JSON.stringify(rows.at(-1)));
        await ctx.close();
      }
  const fs = await import("node:fs");
  fs.writeFileSync(`${out}/fps.json`, JSON.stringify(rows, null, 2));
}
await b.close();
