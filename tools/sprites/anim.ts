/**
 * Xuất WebP động cho từng động tác (8 hướng xếp ngang, phóng ×3) để duyệt.
 * Cần ffmpeg. Chạy: pnpm exec tsx tools/sprites/anim.ts havy <thư mục ra>
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { decodePng } from "./png";

const id = process.argv[2] ?? "havy",
  out = process.argv[3] ?? `out/sprites/${id}`;
const dir = `public/media/sprites/${id}/`;
const J = JSON.parse(readFileSync(dir + "sheet.json", "utf8"));
const img = decodePng(readFileSync(dir + J.image));
const S = 3,
  FW = J.frame.w,
  FH = J.frame.h,
  W = FW * S * J.dirs.length,
  H = FH * S,
  STEP = 20;
mkdirSync(out, { recursive: true });
for (const [k, A] of Object.entries<any>(J.anims)) {
  const total = A.ms.reduce((a: number, b: number) => a + b, 0) + (A.loop ? 0 : 300);
  const frames: Buffer[] = [];
  for (let t = 0; t < total; t += STEP) {
    let ms = t,
      i = 0;
    while (i < A.ms.length - 1 && ms >= A.ms[i]) ms -= A.ms[i++];
    const buf = Buffer.alloc(W * H * 4);
    for (let p = 0; p < W * H; p++) buf.writeUInt32BE(0x3d6b3aff, p * 4);
    J.dirs.forEach((d: string, n: number) => {
      const [sx, sy] = A.frames[d][i];
      for (let y = 0; y < H; y++)
        for (let x = 0; x < FW * S; x++) {
          const si = ((sy + Math.floor(y / S)) * img.w + sx + Math.floor(x / S)) * 4;
          if (img.rgba[si + 3]! < 128) continue;
          const di = (y * W + n * FW * S + x) * 4;
          buf[di] = img.rgba[si]!;
          buf[di + 1] = img.rgba[si + 1]!;
          buf[di + 2] = img.rgba[si + 2]!;
          buf[di + 3] = 255;
        }
    });
    frames.push(buf);
  }
  const r = spawnSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-y",
      "-f",
      "rawvideo",
      "-pix_fmt",
      "rgba",
      "-s",
      `${W}x${H}`,
      "-r",
      String(1000 / STEP),
      "-i",
      "-",
      "-loop",
      "0",
      "-lossless",
      "1",
      "-c:v",
      "libwebp_anim",
      `${out}/${k}.webp`,
    ],
    { input: Buffer.concat(frames) },
  );
  console.log(k, r.status === 0 ? "ok" : r.stderr.toString());
}
