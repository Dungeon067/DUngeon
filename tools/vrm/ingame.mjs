// Chụp nhân vật trong game ở 3D (1920×1080): đứng, chạy, 3 đòn đánh, nộ. Cần vite dev.
// Chạy: node tools/vrm/ingame.mjs <id> <thư mục>
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const [id = "havy", out = "/tmp/ingame"] = process.argv.slice(2);
const URL0 = process.env.URL ?? "http://127.0.0.1:5173/";
mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on("pageerror", (e) => console.log("[err]", e.message));
await pg.goto(`${URL0}?e2e&renderer=3d`);
await pg.evaluate(() => {
  localStorage.setItem("tinhtu-hints-v1", "1");
  localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: "high" }));
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
await pg.evaluate(() => {
  const S = window.__tinhtu.S,
    G = S.G;
  G.enemies = G.enemies.filter((e) => Math.hypot(e.x - G.p.x, e.y - G.p.y) > 640);
  G.p.x = 60 * 40;
  G.p.y = 56 * 40;
  S.tod = 0.42;
  Object.assign(S, { camYaw: 0, camPitch: 0.4, camDist: 6.5 });
});
await sleep(1500);
const face = async () => {
  await pg.keyboard.down("KeyS");
  await sleep(160);
  await pg.keyboard.up("KeyS");
  await sleep(1400);
};
const shot = (n) => pg.screenshot({ path: `${out}/${id}-${n}.png` });
await face();
await shot("1-dung");
await pg.keyboard.down("KeyD");
await sleep(900);
await shot("2-chay");
await pg.keyboard.up("KeyD");
await face();
for (let i = 1; i <= 3; i++) {
  await pg.keyboard.press("KeyJ");
  await sleep(220);
  await shot(`3-don-${i}`);
  await sleep(230);
}
await sleep(600);
await pg.evaluate(() => {
  for (const x of window.__tinhtu.S.G.party) x.energy = 999;
});
await pg.keyboard.press("KeyQ");
// Bỏ qua màn chân dung (cine, che giữa màn hình) rồi mới chụp động tác nộ.
await pg.waitForFunction(() => window.__tinhtu.S.G.cine, null, { timeout: 15000 });
await pg.evaluate(() => {
  window.__tinhtu.S.G.cine.t = 0.01;
});
await pg.waitForFunction(() => !window.__tinhtu.S.G.cine, null, { timeout: 30000 });
await sleep(350);
await shot("4-no");
await b.close();
console.log("ok", out);
