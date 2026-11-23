/**
 * Dựng spritesheet pixel từ YAML nhân vật: `pnpm sprites [id...]`.
 * Đầu ra: public/media/sprites/<id>/sheet.png + sheet.json (+ fx.png, fx.json).
 * Chạy lại luôn cho cùng kết quả (không ngẫu nhiên), nên file sinh ra có thể commit.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { AX, AY, FH, FW, drawDoll, materials, type Look } from "./doll";
import { iceFx } from "./fx";
import { limitPalette, shade, type Grid } from "./pixel";
import { encodePng } from "./png";
import { BOW_ANIMS } from "./poses";
import { fxMaterials } from "./fx";

export const SHEET_DIRS = ["s", "se", "e", "ne", "n", "nw", "w", "sw"] as const;
/** Hướng lật: vẽ lại hướng gốc với vũ khí đổi tay rồi lật ngang (không lật lúc chạy). */
const SRC: Record<string, [number, boolean]> = {
  s: [0, false],
  se: [1, false],
  e: [2, false],
  ne: [3, false],
  n: [4, false],
  nw: [3, true],
  w: [2, true],
  sw: [1, true],
};
const COLS = 20;
/** Chuẩn: 16–24 màu mỗi nhân vật (docs/art/pixel-chuan.md). */
export const MAX_COLORS = 24;
const ROOT = join(import.meta.dirname, "../..");

export interface SheetJson {
  version: 1;
  id: string;
  image: string;
  frame: { w: number; h: number };
  anchor: { x: number; y: number };
  /** Chiều cao hiển thị trong thế giới (đơn vị logic, 1 ô = 40). */
  worldH: number;
  dirs: string[];
  hurtbox: { x: number; y: number; w: number; h: number };
  anims: Record<string, { loop: boolean; ms: number[]; hit?: number; frames: Record<string, [number, number][]> }>;
}

function pack(grids: Grid[], mats: Parameters<typeof shade>[1], fw: number, fh: number, cols: number) {
  const rows = Math.ceil(grids.length / cols),
    W = Math.min(grids.length, cols) * fw,
    H = rows * fh,
    out = new Uint8Array(W * H * 4),
    pos: [number, number][] = [];
  grids.forEach((g, i) => {
    const x = (i % cols) * fw,
      y = Math.floor(i / cols) * fh;
    shade(g, mats, out, W, x, y);
    pos.push([x, y]);
  });
  return { W, H, out, pos };
}

export function buildCharacter(id: string) {
  const y = parse(readFileSync(join(ROOT, "content/characters", `${id}.yaml`), "utf8"));
  const L: Look = { ...y.look, weapon: y.w };
  if (y.w !== "bow") throw new Error(`${id}: bộ động tác cho vũ khí ${y.w} chưa có (mốc 1 chỉ làm cung)`);
  const grids: Grid[] = [],
    refs: { anim: string; dir: string; i: number }[] = [];
  for (const [name, A] of Object.entries(BOW_ANIMS))
    for (const dir of SHEET_DIRS) {
      const [d, swap] = SRC[dir];
      A.frames.forEach((fr, i) => {
        grids.push(drawDoll(L, d, fr.p, swap));
        refs.push({ anim: name, dir, i });
      });
    }
  const mats = materials(L);
  const { W, H, out, pos } = pack(grids, mats, FW, FH, COLS);
  limitPalette(out, MAX_COLORS);
  const json: SheetJson = {
    version: 1,
    id,
    image: "sheet.png",
    frame: { w: FW, h: FH },
    anchor: { x: AX, y: AY },
    worldH: 58,
    dirs: [...SHEET_DIRS],
    hurtbox: { x: -10, y: -46, w: 20, h: 44 },
    anims: {},
  };
  for (const [name, A] of Object.entries(BOW_ANIMS))
    json.anims[name] = {
      loop: A.loop,
      ms: A.frames.map((f) => f.ms),
      ...(A.hit !== undefined ? { hit: A.hit } : {}),
      frames: Object.fromEntries(SHEET_DIRS.map((d) => [d, [] as [number, number][]])),
    };
  refs.forEach((r, k) => json.anims[r.anim].frames[r.dir].push(pos[k]));
  const dir = join(ROOT, "public/media/sprites", id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "sheet.png"), encodePng(W, H, out));
  writeFileSync(join(dir, "sheet.json"), JSON.stringify(json) + "\n");

  // Hiệu ứng theo nguyên tố (mốc 1: Băng).
  const fx = iceFx(),
    fm = fxMaterials("#8fdcff", "#d8f6ff");
  let x = 0;
  const fxJson: Record<string, { w: number; h: number; ms: number; loop: boolean; frames: [number, number][] }> = {};
  const all: { g: Grid; x: number }[] = [];
  let fxH = 0;
  for (const [k, F] of Object.entries(fx)) {
    fxJson[k] = { w: F.w, h: F.h, ms: F.ms, loop: F.loop, frames: [] };
    for (const g of F.frames) {
      all.push({ g, x });
      fxJson[k].frames.push([x, 0]);
      x += F.w;
      fxH = Math.max(fxH, F.h);
    }
  }
  const fo = new Uint8Array(x * fxH * 4);
  for (const a of all) shade(a.g, fm, fo, x, a.x, 0);
  writeFileSync(join(dir, "fx.png"), encodePng(x, fxH, fo));
  writeFileSync(join(dir, "fx.json"), JSON.stringify({ version: 1, image: "fx.png", fx: fxJson }) + "\n");
  return { frames: grids.length, W, H, colors: countColors(out) };
}

function countColors(rgba: Uint8Array) {
  const s = new Set<number>();
  for (let i = 0; i < rgba.length; i += 4) if (rgba[i + 3]) s.add((rgba[i] << 16) | (rgba[i + 1] << 8) | rgba[i + 2]);
  return s.size;
}

if (process.argv[1]?.endsWith("build.ts")) {
  const ids = process.argv.slice(2);
  for (const id of ids.length ? ids : ["havy"]) {
    const r = buildCharacter(id);
    console.log(`${id}: ${r.frames} khung, sheet ${r.W}×${r.H}, ${r.colors} màu`);
  }
}
