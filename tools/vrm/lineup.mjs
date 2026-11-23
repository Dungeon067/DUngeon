// Ảnh xếp hàng các nhân vật (chính diện, cùng tỉ lệ). Cần vite dev (URL mặc định http://127.0.0.1:5173/).
// node tools/vrm/lineup.mjs <ảnh.png> havy:bow suongmai:sword mailinh:cat bachvu:sword
import { chromium } from "@playwright/test";
const [out = "/tmp/lineup.png", ...ids] = process.argv.slice(2);
const URL0 = process.env.URL ?? "http://127.0.0.1:5173/";
const b = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const pg = await b.newPage({ viewport: { width: 2000, height: 1300 } });
pg.on("pageerror", (e) => console.log("[err]", e.message));
await pg.goto(`${URL0}tools/vrm/sheet.html?ids=${ids.join(",")}${process.env.QS ?? ""}`);
await pg.waitForFunction(() => window.ready, null, { timeout: 180000 });
await pg.screenshot({ path: out });
await b.close();
console.log("ok", out);
