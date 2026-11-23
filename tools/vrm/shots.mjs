// Chụp bảng duyệt 4 góc + cận mặt cho một mô hình VRM. Cần vite dev (URL mặc định http://127.0.0.1:5173/).
import { chromium } from "@playwright/test";
const [id = "havy", out = "/tmp/vrm"] = process.argv.slice(2);
const URL0 = process.env.URL ?? "http://127.0.0.1:5173/";
const b = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const views = [
  ["1-truoc", "yaw=0", 1000, 1400],
  ["2-ba-phan-tu", "yaw=40", 1000, 1400],
  ["3-nghieng", "yaw=90", 1000, 1400],
  ["4-sau", "yaw=180", 1000, 1400],
  ["5-can-mat", "yaw=0&face=1", 1000, 1000],
  ["6-can-mat-34", "yaw=35&face=1", 1000, 1000],
  ["7-can-mat-nghieng", "yaw=90&face=1", 1000, 1000],
];
const { mkdirSync, readFileSync } = await import("node:fs");
const w0 =
  /^w:\s*(\w+)/m.exec(
    (() => {
      try {
        return readFileSync(`content/characters/${process.env.CHAR ?? id}.yaml`, "utf8");
      } catch {
        return "";
      }
    })(),
  )?.[1] ?? "sword";
mkdirSync(out, { recursive: true });
for (const [name, qs, w, h] of views.filter(
  ([n]) => !process.env.VIEWS || process.env.VIEWS.split(",").some((v) => n.startsWith(v)),
)) {
  const pg = await b.newPage({ viewport: { width: w, height: h } });
  pg.on("pageerror", (e) => console.log("[err]", e.message));
  await pg.goto(`${URL0}tools/vrm/sheet.html?id=${id}&w=${w0}&${qs}${process.env.QS ?? ""}`);
  await pg.waitForFunction(() => window.ready, null, { timeout: 120000 });
  await pg.screenshot({ path: `${out}/${id}-${name}.png` });
  await pg.close();
}
await b.close();
console.log("ok", out);
