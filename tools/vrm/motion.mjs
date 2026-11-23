// Quay video kiểm tra vải (váy, vạt áo) trong game 3D: chạy, chạy nhanh, nhảy, lướt, xoay người, đánh xoay vòng,
// ở 3 góc máy (ngang, 3/4, thấp). Đồng hồ ảo: mỗi khung hình game chạy đúng 1/FPS giây rồi mới chụp, nên video
// mượt dù máy render chậm (swiftshader). Cần vite dev. Ra <thư mục>/<id>.mp4.
// node tools/vrm/motion.mjs <id> <thư mục>   (FPS=24 W=1280 H=720)
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
const [id = "havy", out = "/tmp/motion"] = process.argv.slice(2);
const URL0 = process.env.URL ?? "http://127.0.0.1:5173/";
const FPS = +(process.env.FPS ?? 24),
  W = +(process.env.W ?? 1280),
  H = +(process.env.H ?? 720);
const fdir = `${out}/${id}-frames`;
rmSync(fdir, { recursive: true, force: true });
mkdirSync(fdir, { recursive: true });
const b = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx = await b.newContext({ viewport: { width: W, height: H } });
await ctx.addInitScript(() => {
  let now = 0,
    seq = 0;
  const q = new Map();
  performance.now = () => now;
  window.requestAnimationFrame = (cb) => (q.set(++seq, cb), seq);
  window.cancelAnimationFrame = (i) => q.delete(i);
  window.__step = (ms) => {
    now += ms;
    const cbs = [...q.values()];
    q.clear();
    for (const cb of cbs) cb(now);
  };
  window.__auto = setInterval(() => window.__step(16), 16);
});
const pg = await ctx.newPage();
pg.on("pageerror", (e) => console.log("[err]", e.message));
await pg.goto(`${URL0}?e2e&renderer=3d`);
await pg.evaluate(() => {
  localStorage.setItem("tinhtu-hints-v1", "1");
  localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: "low" }));
});
await pg.waitForFunction(() => window.__tinhtu?.S?.scene === "play", null, { timeout: 120000 });
await pg.evaluate((hero) => {
  const T = window.__tinhtu,
    P = T.Server.P;
  P.owned[hero] ??= { lv: 20, cons: 0 };
  P.party = [hero, ...P.party.filter((x) => x !== hero).slice(0, 3)];
  T.Server.save();
}, id);
await pg.reload();
await pg.waitForFunction(() => window.__tinhtu?.S?.scene === "play" && !!window.__tinhtu.S.G.map, null, {
  timeout: 120000,
});
await pg.waitForFunction(() => window.__tinhtu.S.G.time > 4, null, { timeout: 300000 });
await pg.evaluate(() => clearInterval(window.__auto));

// Khung chụp quanh nhân vật (camera bám theo nên nhân vật ở gần giữa màn hình).
const clip = {
  x: Math.round(W * 0.2),
  y: Math.round(H * 0.08),
  width: Math.round(W * 0.6),
  height: Math.round(H * 0.84),
};
let n = 0;
const frames = async (k, shoot = true) => {
  for (let i = 0; i < k; i++) {
    await pg.evaluate((ms) => window.__step(ms), 1000 / FPS);
    if (shoot)
      await pg.screenshot({ path: `${fdir}/${String(n++).padStart(5, "0")}.jpg`, type: "jpeg", quality: 88, clip });
  }
};
const label = (t) =>
  pg.evaluate(
    ([t, x, y]) => {
      let d = document.getElementById("__lbl");
      if (!d) {
        d = document.createElement("div");
        d.id = "__lbl";
        d.style.cssText = `position:fixed;left:${x + 14}px;top:${y + 10}px;z-index:99999;font:bold 26px sans-serif;color:#fff;text-shadow:0 0 4px #000,0 0 2px #000`;
        document.body.appendChild(d);
      }
      d.textContent = t;
    },
    [t, clip.x, clip.y],
  );
const cam = (yaw, pitch, dist) =>
  pg.evaluate(
    ([yaw, pitch, dist]) => {
      const S = window.__tinhtu.S,
        G = S.G;
      G.enemies = G.enemies.filter((e) => Math.hypot(e.x - G.p.x, e.y - G.p.y) > 900);
      G.p.x = 60 * 40;
      G.p.y = 56 * 40;
      S.tod = 0.42;
      Object.assign(S, { camYaw: yaw, camPitch: pitch, camDist: dist });
      for (const x of G.party) x.energy = 999;
    },
    [yaw, pitch, dist],
  );
const K = pg.keyboard;
const hold = async (keys, k) => {
  for (const x of keys) await K.down(x);
  await frames(k);
  for (const x of keys.toReversed()) await K.up(x);
};
const tap = async (key, k) => {
  await K.down(key);
  await frames(2);
  await K.up(key);
  await frames(k - 2);
};
const shots = [
  ["Góc ngang", 0, 0.35, 5.5],
  ["Góc 3/4", 0.75, 0.45, 6],
  ["Góc thấp", 0.35, 0.15, 5],
];
for (const [name, yaw, pitch, dist] of shots) {
  await cam(yaw, pitch, dist);
  await frames(40, false);
  await label(`${id} · ${name} · chạy`);
  await hold(["KeyD"], 40);
  await label(`${id} · ${name} · chạy nhanh`);
  await hold(["KeyA", "ShiftLeft"], 50);
  await label(`${id} · ${name} · nhảy`);
  await K.down("KeyD");
  await tap("Space", 20);
  await tap("Space", 20);
  await K.up("KeyD");
  await label(`${id} · ${name} · lướt`);
  for (const k of ["KeyA", "KeyD"]) {
    await K.down(k);
    await tap("ShiftLeft", 14);
    await K.up(k);
  }
  await label(`${id} · ${name} · xoay người`);
  for (const k of ["KeyA", "KeyD", "KeyW", "KeyS", "KeyA", "KeyD"]) await hold([k], 7);
  await label(`${id} · ${name} · đánh xoay vòng`);
  for (const k of ["KeyD", "KeyS", "KeyA", "KeyW", "KeyD", "KeyS"]) {
    await K.down(k);
    await tap("KeyJ", 7);
    await K.up(k);
  }
  await tap("KeyE", 26);
}
await b.close();
execFileSync("ffmpeg", [
  "-y",
  "-loglevel",
  "error",
  "-framerate",
  String(FPS),
  "-i",
  `${fdir}/%05d.jpg`,
  "-vf",
  "scale=-2:720",
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "23",
  `${out}/${id}.mp4`,
]);
console.log("ok", `${out}/${id}.mp4`, n, "khung");
