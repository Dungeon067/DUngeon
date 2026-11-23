/**
 * S29: quay video hoạt ảnh từng loài từ trang xem thử (mode=reel). Cần dev server: pnpm dev --port 5173.
 * Chạy: node tools/render3d/monster-video.mjs [outDir] [id ...]
 */
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2] ?? "s29-video";
const ids = process.argv.slice(3).length
  ? process.argv.slice(3)
  : ["slime", "goblin", "archer", "shaman", "golem", "hacgiao"];
const EL = { slime: "water", goblin: "wind", archer: "wind", shaman: "fire", golem: "earth", hacgiao: "water" };
mkdirSync(out, { recursive: true });
const b = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
for (const id of ids) {
  const tmp = join(out, `_${id}`);
  rmSync(tmp, { recursive: true, force: true });
  const ctx = await b.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: tmp, size: { width: 1280, height: 720 } },
  });
  const pg = await ctx.newPage();
  const zoom = id === "hacgiao" ? "&zoom=1.6&ty=0.1" : "";
  await pg.goto(
    `http://127.0.0.1:5173/tools/render3d/monster-view.html?id=${id}&mode=reel&w=1280&h=720&el=${EL[id]}${zoom}`,
  );
  await pg.waitForFunction(() => window.__reelDone, null, { timeout: 300000 });
  await ctx.close();
  const webm = join(tmp, readdirSync(tmp)[0]);
  const mp4 = join(out, `${id}.mp4`);
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    webm,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "23",
    mp4,
  ]);
  rmSync(tmp, { recursive: true, force: true });
  console.log("[s29] video", mp4);
}
await b.close();
