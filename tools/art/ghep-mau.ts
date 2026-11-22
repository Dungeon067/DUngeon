/**
 * Ghép ảnh render thô (media/characters/build/<id>/mau) thành bảng so sánh có nhãn ở docs/art/mau/.
 *   pnpm art:mau:ghep [id]
 * Cần ảnh nền game: test-results/art/game.png (tạo bằng tools/art/chup-game.ts).
 */
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp, { type OverlayOptions } from "sharp";
import { ROOT } from "./common";

const id = process.argv[2] ?? "lachong";
const src = join(ROOT, "media/characters/build", id, "mau");
const dst = join(ROOT, "docs/art/mau");
mkdirSync(dst, { recursive: true });
const BG = { r: 22, g: 27, b: 48, alpha: 1 };
const LABEL_H = 64;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
function label(text: string, sub: string, w: number): Buffer {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${LABEL_H}">
      <text x="${w / 2}" y="28" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="22" fill="#f3e6c4">${esc(text)}</text>
      <text x="${w / 2}" y="52" text-anchor="middle" font-family="DejaVu Sans" font-size="15" fill="#c8b98f">${esc(sub)}</text>
    </svg>`,
  );
}

interface Cell {
  file: string;
  title: string;
  sub: string;
}

/** Xếp các ô cùng cỡ thành một hàng, nhãn ở trên, nền trời đêm. */
async function row(out: string, cells: Cell[], w: number, h: number, gap = 24) {
  const W = cells.length * w + (cells.length + 1) * gap;
  const H = h + LABEL_H + gap * 2;
  const layers: OverlayOptions[] = [];
  for (const [i, c] of cells.entries()) {
    const x = gap + i * (w + gap);
    const img = await sharp(join(src, c.file + ".png"))
      .resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    layers.push({ input: label(c.title, c.sub, w), left: x, top: gap / 2 });
    layers.push({ input: img, left: x, top: gap + LABEL_H });
  }
  await sharp({ create: { width: W, height: H, channels: 4, background: BG } })
    .composite(layers)
    .png({ compressionLevel: 9, palette: false })
    .toFile(join(dst, out));
  console.log(out);
}

/** Thu khung 256 về 128 (cách game sẽ dùng). */
const frame128 = (f: string) =>
  sharp(join(src, f + ".png"))
    .resize(128, 128, { kernel: "lanczos3" })
    .png()
    .toBuffer();

/** Hộp bao phần không trong suốt của ảnh RGBA. */
async function bbox(buf: Buffer) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width,
    y0 = info.height,
    x1 = 0,
    y1 = 0;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * 4 + 3] > 16) {
        x0 = Math.min(x0, x);
        x1 = Math.max(x1, x);
        y0 = Math.min(y0, y);
        y1 = Math.max(y1, y);
      }
  return { x0, y0, x1, y1, h: y1 - y0 + 1, w: x1 - x0 + 1 };
}

async function directions(out: string, prefix: string, title: string) {
  const names = ["Xuống", "Phải", "Lên", "Trái"];
  const S = 256,
    gap = 24;
  const W = 4 * S + 5 * gap + 4 * (128 + gap);
  const H = LABEL_H + S + gap * 2;
  const layers: OverlayOptions[] = [];
  for (let i = 0; i < 4; i++) {
    const f = await frame128(`${prefix}_${i}`);
    const x = gap + i * (S + 128 + 2 * gap);
    layers.push({ input: label(names[i], "128px gốc  |  phóng 2×", S + 128 + gap), left: x, top: gap / 2 });
    layers.push({ input: f, left: x, top: gap + LABEL_H + S - 128 });
    const big = await sharp(f).resize(S, S, { kernel: "nearest" }).toBuffer();
    layers.push({ input: big, left: x + 128 + gap, top: gap + LABEL_H });
  }
  const head = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="30"><text x="${gap}" y="22" font-family="DejaVu Sans" font-size="16" fill="#8fa0c8">${esc(title)}</text></svg>`,
  );
  await sharp({ create: { width: W, height: H + 30, channels: 4, background: BG } })
    .composite([{ input: head, left: 0, top: H }, ...layers])
    .png({ compressionLevel: 9 })
    .toFile(join(dst, out));
  console.log(out);
}

/** Ghép sprite lên ảnh chụp game: cùng chiều cao với chibi cũ, đứng cạnh nhân vật đang điều khiển. */
async function inGame(out: string) {
  const shot = join(ROOT, "test-results/art/game.png");
  if (!existsSync(shot)) throw new Error("Thiếu " + shot + ", chạy tools/art/chup-game.ts trước");
  const CHIBI_H = 58; // chiều cao chibi cũ trên màn 1280×720 (đo từ ảnh chụp)
  const layers: OverlayOptions[] = [];
  const place = async (f: string, cx: number, footY: number, hPx: number) => {
    const b128 = await frame128(f);
    const bb = await bbox(b128);
    const k = hPx / bb.h;
    const size = Math.round(128 * k);
    const img = await sharp(b128).resize(size, size, { kernel: "lanczos3" }).toBuffer();
    layers.push({
      input: img,
      left: Math.round(cx - ((bb.x0 + bb.x1) / 2) * k),
      top: Math.round(footY - (bb.y1 + 1) * k),
    });
  };
  // Nhân vật chibi đứng ở khoảng (640, 386) trong ảnh chụp.
  await place("sprite_a_0", 560, 386, CHIBI_H * 1.15);
  await place("sprite_b_0", 720, 386, CHIBI_H * 1.15);
  await place("sprite_a_1", 520, 470, CHIBI_H * 1.15);
  await place("sprite_b_3", 760, 470, CHIBI_H * 1.15);
  const composed = await sharp(shot).composite(layers).png().toBuffer();
  const crop = await sharp(composed)
    .extract({ left: 400, top: 250, width: 480, height: 270 })
    .resize(960, 540, { kernel: "nearest" })
    .toBuffer();
  const tag = (t: string, x: number, y: number) => ({
    input: Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="26"><rect width="200" height="26" rx="6" fill="#0f1b3d" fill-opacity="0.78"/><text x="100" y="18" text-anchor="middle" font-family="DejaVu Sans" font-size="14" fill="#f3e6c4">${esc(t)}</text></svg>`,
    ),
    left: x,
    top: y,
  });
  await sharp(crop)
    .composite([
      tag("Phương án A (1:5,5)", 220, 290),
      tag("Chibi cũ (vẽ bằng code)", 380, 120),
      tag("Phương án B (sprite 1:4)", 540, 290),
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(dst, out));
  console.log(out);
}

await row(
  "01-ti-le.png",
  [
    { file: "ti_le_a", title: "A: tỉ lệ 1:5,5", sub: "một mô hình cho tranh lớn và sprite" },
    { file: "ti_le_b", title: "B: tỉ lệ 1:6", sub: "tranh lớn, chân dung" },
    { file: "ti_le_b_chibi", title: "B: bản sprite 1:4", sub: "đầu to để đọc rõ ở 128px" },
  ],
  480,
  640,
);
await row(
  "02-tang-bong.png",
  [
    { file: "bong2_vienvo", title: "Bóng 2 tầng", sub: "sáng, tối" },
    { file: "bong3_vienvo", title: "Bóng 3 tầng", sub: "sáng, tối, tối sâu" },
  ],
  640,
  640,
);
await row(
  "03-vien.png",
  [
    { file: "bong3_vienvo", title: "Viền vỏ đảo ngược", sub: "dày theo khoảng cách, nhanh" },
    { file: "bong3_freestyle", title: "Viền Freestyle", sub: "nét đều, có nét gấp bên trong" },
  ],
  640,
  640,
);
await row(
  "04-den-vien.png",
  [
    { file: "bong3_vienvo", title: "Có đèn viền Hỏa", sub: "#ff6a3d theo content/config.yaml" },
    { file: "khong_rim", title: "Không đèn viền", sub: "chỉ đèn chính trên trái" },
  ],
  640,
  640,
);
await row(
  "05-tranh-lon-a.png",
  [{ file: "ti_le_a", title: "Lạc Hồng, tranh toàn thân", sub: "tỉ lệ A, bóng 3 tầng, viền vỏ, đèn viền Hỏa" }],
  900,
  1200,
);
await directions("06-huong-a.png", "sprite_a", "Phương án A: 4 hướng, máy quay nghiêng 40°");
await directions("07-huong-b.png", "sprite_b", "Phương án B: 4 hướng, bản sprite đầu to 1:4");
await inGame("08-trong-game.png");
