/**
 * Quay video, chụp ảnh và đo fps cho mốc duyệt renderer 3D toon + VRM (S25).
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
    P.owned.suongmai ??= { lv: 20, cons: 0 };
    P.party = ["suongmai", "havy", ...P.party.filter((x) => x !== "havy" && x !== "suongmai").slice(0, 2)];
    T.Server.save();
  });
  await pg.reload();
  await pg.waitForFunction(() => window.__tinhtu?.S?.scene === "play" && !!window.__tinhtu.S.G.map);
  await calm(pg);
  // Chờ hết màn mở đầu (chữ tên vùng, lớp mờ) và mô hình VRM tải xong.
  await pg.waitForFunction(() => window.__tinhtu.S.G.time > 4, null, { timeout: 300000 });
  await calm(pg);
  await sleep(500);
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


/** Kéo chuột phải để xoay camera (như người chơi). */
async function orbit(pg, dx, dy = 0, steps = 30) {
  const { w, h } = await pg.evaluate(() => ({ w: innerWidth, h: innerHeight }));
  await pg.mouse.move(w * 0.5, h * 0.4);
  await pg.mouse.down({ button: "right" });
  for (let i = 1; i <= steps; i++) {
    await pg.mouse.move(w * 0.5 + (dx * i) / steps, h * 0.4 + (dy * i) / steps);
    await sleep(30);
  }
  await pg.mouse.up({ button: "right" });
}
const cam = (pg, o) => pg.evaluate((v) => Object.assign(window.__tinhtu.S, v), o);

async function demo(pg) {
  await tod(pg, 0.42);
  await cam(pg, { camYaw: 0, camPitch: 0.55, camDist: 11 });
  await put(pg, 60, 56);
  await sleep(800);
  // Kiếm (Sương Mai): chạy, chạy nhanh, nhảy, lướt, 3 đòn kiếm.
  await hold(pg, ["KeyW"], 1200);
  await hold(pg, ["KeyD"], 900);
  await pg.keyboard.down("KeyS");
  await pg.keyboard.down("ShiftLeft");
  await sleep(1300);
  await pg.keyboard.up("ShiftLeft");
  await pg.keyboard.up("KeyS");
  await hold(pg, ["KeyA"], 500);
  // Nhảy lên bệ (bệ 1 bậc ở x 49..52, y 51..53).
  await put(pg, 50.5, 55.2);
  await sleep(300);
  await pg.keyboard.down("KeyW");
  await sleep(250);
  await pg.keyboard.press("Space");
  await sleep(800);
  await pg.keyboard.up("KeyW");
  await sleep(400);
  await pg.keyboard.down("KeyD");
  await pg.keyboard.press("ShiftLeft");
  await sleep(500);
  await pg.keyboard.up("KeyD");
  await put(pg, 60, 56);
  await sleep(300);
  await tap(pg, "KeyJ", 3, 450);
  await sleep(500);
  await tap(pg, "KeyE", 1, 1000);
  await fillBurst(pg);
  await tap(pg, "KeyQ", 1, 2600);
  // Camera xoay: kéo chuột phải, rồi zoom.
  await orbit(pg, 360, 40);
  await hold(pg, ["KeyW"], 900);
  await orbit(pg, -520, -30);
  // Cung (Hạ Vy): 3 đòn cung, kỹ năng, nộ.
  await tap(pg, "Digit2", 1, 900);
  await hold(pg, ["KeyW", "KeyD"], 600);
  await tap(pg, "KeyJ", 3, 450);
  await hold(pg, ["KeyS", "KeyA"], 300);
  await tap(pg, "KeyJ", 3, 450);
  await tap(pg, "KeyE", 1, 1000);
  await fillBurst(pg);
  await tap(pg, "KeyQ", 1, 2800);
  // Ngày sang đêm.
  for (let t = 0.6; t <= 0.95; t += 0.012) {
    await tod(pg, t);
    await sleep(60);
  }
  await hold(pg, ["KeyW", "KeyA"], 900);
  await tap(pg, "KeyJ", 3, 450);
  await fillBurst(pg);
  await tap(pg, "KeyQ", 1, 2600);
  await orbit(pg, 300, 0);
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
    // Ngày: Sương Mai chém kiếm.
    await tod(pg, 0.42);
    await cam(pg, { camYaw: -0.5, camPitch: 0.5, camDist: 9 });
    await put(pg, 57.5, 53.5);
    await sleep(1200);
    await hold(pg, ["KeyW", "KeyD"], 300);
    await pg.keyboard.press("KeyJ");
    await sleep(200);
    await pg.screenshot({ path: `${out}/ngay-${w}x${h}.png` });
    // Đêm: Hạ Vy dùng nộ.
    await tap(pg, "Digit2", 1, 1200);
    await tod(pg, 0.92);
    await cam(pg, { camYaw: 0.6, camPitch: 0.42, camDist: 7 });
    await fillBurst(pg);
    await pg.keyboard.press("KeyQ");
    await pg.waitForFunction(() => !window.__tinhtu.S.G.cine, null, { timeout: 60000 });
    await sleep(350);
    await pg.screenshot({ path: `${out}/dem-${w}x${h}.png` });
    // Cận cảnh nhân vật và nước.
    await tod(pg, 0.36);
    await cam(pg, { camYaw: 2.6, camPitch: 0.25, camDist: 4.5 });
    await sleep(1500);
    await pg.screenshot({ path: `${out}/can-canh-${w}x${h}.png` });
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
