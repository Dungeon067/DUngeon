/**
 * Dựng clip bằng khung hóa (keyframe) trên xương humanoid VRM chuẩn hóa, ghi thêm vào public/media/anim/humanoid.json.
 * Dùng: pnpm exec tsx tools/anim/author.ts
 * Quy ước (VRM 1.0 chuẩn hóa, tư thế chữ T là gốc): nhân vật nhìn +Z, +X là bên TRÁI nhân vật, +Y lên.
 * Góc tính bằng độ, Euler thứ tự YXZ, là góc TUYỆT ĐỐI của xương so với tư thế chữ T (trong hệ của xương cha).
 *  - Tay phải: Z dương = hạ tay xuống, Z âm = giơ lên; Y dương = đưa ra trước.
 *  - Tay trái: ngược dấu Z (Z âm = hạ xuống); Y âm = đưa ra trước.
 * Xương không khai báo trong khóa lấy theo clip nền (base) tại khung baseFrame.
 * Thân: hipsYaw (độ, dương = xoay sang trái), hipsPos (dịch hông, theo chiều cao hông).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { Euler, Quaternion } from "three";
import { AUTHORED } from "./authored";

const FILE = "public/media/anim/humanoid.json";
const lib = JSON.parse(readFileSync(FILE, "utf8"));
const FPS: number = lib.fps;

export type Pose = Record<string, [number, number, number]>;
export interface Key {
  t: number; // 0..1 theo độ dài clip
  b?: Pose;
  hipsYaw?: number;
  hipsPos?: [number, number, number];
  ease?: "inout" | "out" | "in" | "lin";
  /** Mọi xương về tư thế clip nền (dùng cho khóa kết thúc). */
  rest?: boolean;
}
export interface Authored {
  base: string;
  baseFrame?: number;
  dur: number; // giây
  keys: Key[];
}

const D = Math.PI / 180;
const qe = (e: [number, number, number]) =>
  new Quaternion().setFromEuler(new Euler(e[0] * D, e[1] * D, e[2] * D, "YXZ"));
const ease = (f: number, k: Key["ease"] = "inout") =>
  k === "lin"
    ? f
    : k === "out"
      ? 1 - (1 - f) ** 3
      : k === "in"
        ? f ** 3
        : f < 0.5
          ? 4 * f ** 3
          : 1 - (-2 * f + 2) ** 3 / 2;

for (const [name, A] of Object.entries(AUTHORED)) {
  const base = lib.clips[A.base];
  if (!base) throw new Error(`thiếu clip nền ${A.base}`);
  const bf = Math.min(base.n - 1, A.baseFrame ?? 0);
  const n = Math.max(2, Math.round(A.dur * FPS) + 1);
  const boneNames = Object.keys(base.bones);
  const keys = [...A.keys].sort((a, b) => a.t - b.t);
  // Điền khóa thiếu: mỗi xương lấy góc ở khóa gần nhất có khai báo, không có thì theo nền.
  const baseQ = (b: string) => new Quaternion().fromArray(base.bones[b].q[bf]);
  const keyQ = (k: Key, b: string) => (k.b?.[b] ? qe(k.b[b]) : k.rest ? baseQ(b) : null);
  const out: any = { n, bones: {}, hips: [] };
  for (const b of boneNames) out.bones[b] = { q: [] };
  const baseHips = base.hips[bf] as number[];
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1);
    let k1 = 0;
    while (k1 < keys.length - 1 && keys[k1 + 1].t <= f) k1++;
    const k2 = Math.min(keys.length - 1, k1 + 1);
    const a = keys[k1],
      c = keys[k2];
    const u = c.t > a.t ? ease(Math.min(1, Math.max(0, (f - a.t) / (c.t - a.t))), c.ease) : 0;
    for (const b of boneNames) {
      // Tìm khóa trước và sau có khai báo xương này.
      let pa: Key | null = null,
        pc: Key | null = null;
      for (let j = k1; j >= 0; j--)
        if (keys[j].b?.[b] || keys[j].rest) {
          pa = keys[j];
          break;
        }
      for (let j = k2; j < keys.length; j++)
        if ((keys[j].b?.[b] || keys[j].rest) && keys[j].t >= f) {
          pc = keys[j];
          break;
        }
      let q: Quaternion;
      if (!pa && !pc) q = baseQ(b);
      else if (pa && pc && pc !== pa) {
        const uu = ease(Math.min(1, Math.max(0, (f - pa.t) / (pc.t - pa.t))), pc.ease);
        q = keyQ(pa, b)!.slerp(keyQ(pc, b)!, uu);
      } else q = keyQ((pa ?? pc)!, b)!;
      if (b === "hips") {
        const ya = (a.hipsYaw ?? 0) + ((c.hipsYaw ?? 0) - (a.hipsYaw ?? 0)) * u;
        q = new Quaternion().setFromEuler(new Euler(0, ya * D, 0)).multiply(q);
      }
      out.bones[b].q.push(q.toArray().map((v) => +v.toFixed(4)));
    }
    const pA = a.hipsPos ?? [0, 0, 0],
      pC = c.hipsPos ?? [0, 0, 0];
    out.hips.push(baseHips.map((v, j) => +(v + pA[j] + (pC[j] - pA[j]) * u).toFixed(4)));
  }
  lib.clips[name] = out;
  console.log(name, n, "khung");
}
writeFileSync(FILE, JSON.stringify(lib));
