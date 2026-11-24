/**
 * Clip riêng theo nhân vật (S30), tên `<id>.<chiêu>`, ghi ra public/media/anim/kits.json.
 * Cùng định dạng và quy ước góc với tools/anim/author.ts của S27 (VRM chuẩn hóa, 30 FPS, +X trái nhân vật, +Y lên,
 * +Z trước, Euler YXZ, góc tuyệt đối so với tư thế chữ T). Clip nền lấy từ humanoid.json, không sửa file đó.
 * Dùng: pnpm exec tsx tools/anim/kits/build.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { Euler, Quaternion } from "three";
import type { Key } from "../author";
import { KIT_CLIPS } from "./clips";

const lib = JSON.parse(readFileSync("public/media/anim/humanoid.json", "utf8"));
const FPS: number = lib.fps;
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

const clips: Record<string, unknown> = {};
for (const [name, A] of Object.entries(KIT_CLIPS)) {
  const base = lib.clips[A.base];
  if (!base) throw new Error(`${name}: thiếu clip nền ${A.base}`);
  const bf = Math.min(base.n - 1, A.baseFrame ?? 0);
  const n = Math.max(2, Math.round(A.dur * FPS) + 1);
  const keys = [...A.keys].sort((a, b) => a.t - b.t);
  const baseQ = (b: string) => new Quaternion().fromArray(base.bones[b].q[bf]);
  const keyQ = (k: Key, b: string) => (k.b?.[b] ? qe(k.b[b]) : k.rest ? baseQ(b) : null);
  const out: any = { n, bones: {}, hips: [] };
  const boneNames = Object.keys(base.bones);
  for (const b of boneNames) out.bones[b] = { q: [] };
  const baseHips = base.hips[bf] as number[];
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1);
    let k1 = 0;
    while (k1 < keys.length - 1 && keys[k1 + 1]!.t <= f) k1++;
    const k2 = Math.min(keys.length - 1, k1 + 1);
    const a = keys[k1]!,
      c = keys[k2]!;
    const u = c.t > a.t ? ease(Math.min(1, Math.max(0, (f - a.t) / (c.t - a.t))), c.ease) : 0;
    for (const b of boneNames) {
      let pa: Key | null = null,
        pc: Key | null = null;
      for (let j = k1; j >= 0; j--)
        if (keys[j]!.b?.[b] || keys[j]!.rest) {
          pa = keys[j]!;
          break;
        }
      for (let j = k2; j < keys.length; j++)
        if ((keys[j]!.b?.[b] || keys[j]!.rest) && keys[j]!.t >= f) {
          pc = keys[j]!;
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
    out.hips.push(baseHips.map((v, j) => +(v + pA[j]! + (pC[j]! - pA[j]!) * u).toFixed(4)));
  }
  clips[name] = out;
}
writeFileSync("public/media/anim/kits.json", JSON.stringify({ fps: FPS, clips }));
console.log(`kits.json: ${Object.keys(clips).length} clip`);
