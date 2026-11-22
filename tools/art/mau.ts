/**
 * Mốc duyệt 1: render bộ ảnh mẫu phong cách cho một nhân vật dựng nhanh.
 *   pnpm art:mau [id]   (mặc định lachong)
 * Kết quả: docs/art/mau/*.png (ảnh nhỏ, commit) và media/characters/build/<id>/mau/ (ảnh thô, không commit).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { blenderPath, loadCharacter, ROOT } from "./common";
import { writeFaceTextures } from "./mat";

const id = process.argv[2] ?? "lachong";
const ch = loadCharacter(id);
const build = join(ROOT, "media/characters/build", id, "mau");
mkdirSync(build, { recursive: true });
const tex = { mat: join(build, "mat.png"), mieng: join(build, "mieng.png") };
await writeFaceTextures(
  { eye: ch.look.eye, hair: ch.look.hair, skin: ch.look.skin, gioiTinh: ch.dung.than?.gioi_tinh ?? "nam" },
  tex.mat,
  tex.mieng,
);

type Style = Record<string, unknown>;
const base = { id, look: ch.look, el_color: ch.elColor, weapon: ch.weapon, dung: ch.dung, face_tex: tex };
const spec = (heads: number, style: Style, pose = "tranh") => ({ ...base, heads, style, pose });
const out = (n: string) => join(build, n + ".png");
const S3 = { tang_bong: 3, vien: "vo", rim: true };

const jobs = [
  {
    spec: spec(5.5, S3),
    renders: [
      { out: out("ti_le_a"), cam: "full", w: 900, h: 1200 },
      { out: out("bong3_vienvo"), cam: "half", w: 800, h: 800 },
      { out: out("sprite_a_0"), cam: "sprite", w: 256, h: 256, huong: 0 },
      { out: out("sprite_a_1"), cam: "sprite", w: 256, h: 256, huong: 90 },
      { out: out("sprite_a_2"), cam: "sprite", w: 256, h: 256, huong: 180 },
      { out: out("sprite_a_3"), cam: "sprite", w: 256, h: 256, huong: -90 },
    ],
  },
  { spec: spec(6, S3), renders: [{ out: out("ti_le_b"), cam: "full", w: 900, h: 1200 }] },
  {
    spec: spec(4, S3),
    renders: [
      { out: out("ti_le_b_chibi"), cam: "full", w: 900, h: 1200 },
      { out: out("sprite_b_0"), cam: "sprite", w: 256, h: 256, huong: 0 },
      { out: out("sprite_b_1"), cam: "sprite", w: 256, h: 256, huong: 90 },
      { out: out("sprite_b_2"), cam: "sprite", w: 256, h: 256, huong: 180 },
      { out: out("sprite_b_3"), cam: "sprite", w: 256, h: 256, huong: -90 },
    ],
  },
  { spec: spec(5.5, { ...S3, tang_bong: 2 }), renders: [{ out: out("bong2_vienvo"), cam: "half", w: 800, h: 800 }] },
  {
    spec: spec(5.5, { ...S3, vien: "freestyle" }),
    renders: [{ out: out("bong3_freestyle"), cam: "half", w: 800, h: 800 }],
  },
  { spec: spec(5.5, { ...S3, rim: false }), renders: [{ out: out("khong_rim"), cam: "half", w: 800, h: 800 }] },
];
const jobFile = join(build, "jobs.json");
writeFileSync(jobFile, JSON.stringify(jobs, null, 1));
const script = resolve(ROOT, "media/characters/base/mau.py");
console.log(
  "Render",
  jobs.reduce((n, j) => n + j.renders.length, 0),
  "ảnh bằng",
  blenderPath(),
);
execFileSync(blenderPath(), ["-b", "--factory-startup", "--python-exit-code", "1", "-P", script, "--", jobFile], {
  stdio: "inherit",
});
console.log("Xong:", build);
