import { chromium } from "@playwright/test";
const URL0 = process.env.URL ?? "http://127.0.0.1:5199/";
const [w = 1280, h = 720] = (process.env.SIZE ?? "1280x720").split("x").map(Number);
const out = process.argv[2] ?? "/tmp/probe.png";
const b = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx = await b.newContext({ viewport: { width: w, height: h } });
const pg = await ctx.newPage();
pg.on("pageerror", (e) => console.log("[err]", e.message));
pg.on("console", (m) =>
  m.type() === "error" || m.type() === "warning" ? console.log("[" + m.type() + "]", m.text().slice(0, 300)) : 0,
);
await pg.goto(`${URL0}?e2e&renderer=3d`);
await pg.evaluate((q) => {
  localStorage.setItem("tinhtu-hints-v1", "1");
  localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: q }));
}, process.env.Q ?? "medium");
await pg.waitForFunction(() => window.__tinhtu?.S?.scene === "play", null, { timeout: 60000 });
await pg.evaluate((hero) => {
  const T = window.__tinhtu,
    P = T.Server.P;
  P.owned[hero] = { lv: 20, cons: 0 };
  P.party = [hero, ...P.party.filter((x) => x !== hero).slice(0, 3)];
  T.Server.save();
}, process.env.HERO ?? "havy");
await pg.reload();
await pg.waitForFunction(() => window.__tinhtu?.S?.scene === "play" && !!window.__tinhtu.S.G.map, null, {
  timeout: 60000,
});
if (process.env.TOD) await pg.evaluate((v) => (window.__tinhtu.S.tod = +v), process.env.TOD);
if (process.env.EVAL) await pg.evaluate(process.env.EVAL);
await new Promise((r) => setTimeout(r, +(process.env.WAIT ?? 9000)));
console.log(JSON.stringify(await pg.evaluate(() => window.__tinhtu.r3?.()?.stats?.() ?? null)));
if (process.env.DBG) console.log(await pg.evaluate(process.env.DBG));
await pg.screenshot({ path: out });
await b.close();
