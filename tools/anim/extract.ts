/**
 * Đổi hoạt ảnh Universal Animation Library (Quaternius, CC0) sang khung xương humanoid chuẩn hóa của VRM.
 * Dùng: pnpm exec tsx tools/anim/extract.ts <UAL1_Standard.glb> [public/media/anim/humanoid.json]
 * Ra một JSON nhỏ: mỗi clip lấy mẫu 30 khung/giây, quaternion theo tên xương VRM, vị trí hông chia theo chiều cao hông.
 * Danh sách nguồn và giấy phép: docs/art/nguon-hoat-anh.md.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { NodeIO, type Node as GNode } from "@gltf-transform/core";
import { Matrix4, Quaternion, Vector3 } from "three";
import { CLIPS, type ClipRecipe } from "./recipes";

const FPS = 30;
/** Xương UAL (kiểu Unreal) → xương humanoid VRM. */
export const BONE_MAP: Record<string, string> = {
  pelvis: "hips",
  spine_01: "spine",
  spine_02: "chest",
  spine_03: "upperChest",
  neck_01: "neck",
  Head: "head",
};
for (const [s, S] of [
  ["l", "left"],
  ["r", "right"],
] as const) {
  Object.assign(BONE_MAP, {
    [`clavicle_${s}`]: `${S}Shoulder`,
    [`upperarm_${s}`]: `${S}UpperArm`,
    [`lowerarm_${s}`]: `${S}LowerArm`,
    [`hand_${s}`]: `${S}Hand`,
    [`thigh_${s}`]: `${S}UpperLeg`,
    [`calf_${s}`]: `${S}LowerLeg`,
    [`foot_${s}`]: `${S}Foot`,
    [`ball_${s}`]: `${S}Toes`,
    [`thumb_01_${s}`]: `${S}ThumbMetacarpal`,
    [`thumb_02_${s}`]: `${S}ThumbProximal`,
    [`thumb_03_${s}`]: `${S}ThumbDistal`,
  });
  for (const f of ["index", "middle", "ring", "little"]) {
    const u = f === "little" ? "pinky" : f,
      F = f[0].toUpperCase() + f.slice(1);
    Object.assign(BONE_MAP, {
      [`${u}_01_${s}`]: `${S}${F}Proximal`,
      [`${u}_02_${s}`]: `${S}${F}Intermediate`,
      [`${u}_03_${s}`]: `${S}${F}Distal`,
    });
  }
}

type Track = { q: number[][] };
type Clip = { n: number; bones: Record<string, Track>; hips: number[][] };

const [src, out = "public/media/anim/humanoid.json"] = process.argv.slice(2);
if (!src) throw new Error("Thiếu đường dẫn UAL1_Standard.glb");
const doc = await new NodeIO().read(src);
const root = doc.getRoot();
const nodes = root.listNodes();
const parentOf = new Map<GNode, GNode | null>();
for (const n of nodes) for (const c of n.listChildren()) parentOf.set(c, n);
const byName = new Map(nodes.map((n) => [n.getName(), n]));

/** Đọc một kênh hoạt ảnh tại thời điểm t (nội suy tuyến tính / slerp). */
function sampler(ch: any) {
  const s = ch.getSampler(),
    inp = s.getInput().getArray() as Float32Array,
    outA = s.getOutput().getArray() as Float32Array,
    k = outA.length / inp.length;
  return (t: number): number[] => {
    let i = 0;
    while (i < inp.length - 2 && t > inp[i + 1]) i++;
    const a = inp[i],
      b = inp[Math.min(i + 1, inp.length - 1)],
      f = b > a ? Math.min(1, Math.max(0, (t - a) / (b - a))) : 0;
    const A = Array.from(outA.slice(i * k, i * k + k)),
      B = Array.from(outA.slice(Math.min(i + 1, inp.length - 1) * k, Math.min(i + 1, inp.length - 1) * k + k));
    if (k === 4) {
      const q = new Quaternion().fromArray(A).slerp(new Quaternion().fromArray(B), f);
      return q.toArray() as number[];
    }
    return A.map((v, j) => v + (B[j] - v) * f);
  };
}

/** Tư thế từng nút ở thời điểm t của clip (nút không có kênh giữ tư thế nghỉ). */
function poseAt(anim: any, t: number) {
  const P = new Map<GNode, { t: number[]; r: number[]; s: number[] }>();
  for (const n of nodes) P.set(n, { t: n.getTranslation(), r: n.getRotation(), s: n.getScale() });
  for (const ch of anim.listChannels()) {
    const n = ch.getTargetNode(),
      path = ch.getTargetPath();
    if (!n) continue;
    const v = sampler(ch)(t),
      e = P.get(n)!;
    if (path === "rotation") e.r = v;
    else if (path === "translation") e.t = v;
    else if (path === "scale") e.s = v;
  }
  return P;
}
function worldOf(P: ReturnType<typeof poseAt>) {
  const W = new Map<GNode, Matrix4>();
  const get = (n: GNode): Matrix4 => {
    let m = W.get(n);
    if (m) return m;
    const e = P.get(n)!;
    m = new Matrix4().compose(
      new Vector3().fromArray(e.t),
      new Quaternion().fromArray(e.r),
      new Vector3().fromArray(e.s),
    );
    const par = parentOf.get(n);
    if (par) m.premultiply(get(par));
    W.set(n, m);
    return m;
  };
  for (const n of nodes) get(n);
  return W;
}
const rotOf = (m: Matrix4) => {
  const q = new Quaternion();
  m.decompose(new Vector3(), q, new Vector3());
  return q;
};
const posOf = (m: Matrix4) => new Vector3().setFromMatrixPosition(m);

const anims = new Map(root.listAnimations().map((a) => [a.getName(), a]));
// Tư thế chuẩn: khung đầu của A_TPose (chữ T), khớp với tư thế nghỉ của VRM chuẩn hóa.
const restP = poseAt(anims.get("A_TPose")!, 0),
  restW = worldOf(restP);
const hipsN = byName.get("pelvis")!,
  hipsRest = posOf(restW.get(hipsN)!);
// Hệ trục nguồn → hệ trục VRM (+Y lên, nhân vật nhìn +Z, tay trái ở +X).
const up = posOf(restW.get(byName.get("Head")!)!).sub(hipsRest).normalize();
const left = posOf(restW.get(byName.get("hand_l")!)!)
  .sub(posOf(restW.get(byName.get("hand_r")!)!))
  .normalize();
// Làm tròn về trục gần nhất để không nghiêng cả cảnh theo độ cúi đầu của tư thế chuẩn.
const snap = (v: Vector3) => {
  const a = [Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)],
    i = a.indexOf(Math.max(...a)),
    r = new Vector3();
  r.setComponent(i, Math.sign(v.getComponent(i)));
  return r;
};
up.copy(snap(up));
left.copy(snap(left));
const fwd = new Vector3().crossVectors(left, up).normalize();
const basis = new Matrix4().makeBasis(left, up, fwd); // cột: trục nguồn ứng với X, Y, Z của VRM
const C = rotOf(basis.clone().invert()),
  Ci = C.clone().invert();
const hipsH = hipsRest.dot(up) - Math.min(...["foot_l", "foot_r"].map((b) => posOf(restW.get(byName.get(b)!)!).dot(up)));
console.log("trục lên", up.toArray().map((v) => v.toFixed(2)), "trái", left.toArray().map((v) => v.toFixed(2)), "cao hông", hipsH.toFixed(3));

function bake(name: string): Clip {
  const A = anims.get(name);
  if (!A) throw new Error(`Không có clip ${name}`);
  let dur = 0;
  for (const ch of A.listChannels()) {
    const inp = ch.getSampler()!.getInput()!.getArray()!;
    dur = Math.max(dur, inp[inp.length - 1]);
  }
  const n = Math.max(2, Math.round(dur * FPS) + 1);
  const clip: Clip = { n, bones: {}, hips: [] };
  for (let f = 0; f < n; f++) {
    const P = poseAt(A, Math.min(dur, f / FPS)),
      W = worldOf(P);
    for (const [ub, vb] of Object.entries(BONE_MAP)) {
      const node = byName.get(ub);
      if (!node) continue;
      const par = parentOf.get(node)!;
      // Đổi xoay cục bộ thành độ lệch so với tư thế chuẩn trong hệ thế giới, rồi đổi sang hệ VRM.
      const parRest = rotOf(restW.get(par)!),
        restInv = rotOf(restW.get(node)!).invert();
      const local = rotOf(W.get(par)!).invert().multiply(rotOf(W.get(node)!));
      const q = parRest.clone().multiply(local).multiply(restInv);
      const v = C.clone().multiply(q).multiply(Ci);
      (clip.bones[vb] ??= { q: [] }).q.push(v.toArray().map((x) => +x.toFixed(4)));
    }
    const hp = posOf(W.get(hipsN)!).sub(hipsRest).applyQuaternion(C).divideScalar(hipsH);
    clip.hips.push(hp.toArray().map((x) => +x.toFixed(4)));
  }
  return clip;
}

const cache = new Map<string, Clip>();
const src1 = (n: string) => {
  let c = cache.get(n);
  if (!c) cache.set(n, (c = bake(n)));
  return structuredClone(c);
};

const LOWER = /^(hips|left(Upper|Lower)Leg|right(Upper|Lower)Leg|leftFoot|rightFoot|leftToes|rightToes)$/;
function make(r: ClipRecipe): Clip {
  const c = src1(r.from);
  if (r.lower) {
    const L = src1(r.lower),
      n = c.n;
    for (const [b, tr] of Object.entries(L.bones))
      if (LOWER.test(b)) c.bones[b] = { q: Array.from({ length: n }, (_, i) => tr.q[i % L.n]) };
    c.hips = Array.from({ length: n }, (_, i) => L.hips[i % L.n]);
  }
  if (r.mirror) {
    const nb: Record<string, Track> = {};
    for (const [b, tr] of Object.entries(c.bones)) {
      const m = b.startsWith("left") ? "right" + b.slice(4) : b.startsWith("right") ? "left" + b.slice(5) : b;
      nb[m] = { q: tr.q.map(([x, y, z, w]) => [x, -y, -z, w]) };
    }
    c.bones = nb;
    c.hips = c.hips.map(([x, y, z]) => [-x, y, z]);
  }
  if (r.spin || r.lift) {
    const [a, b] = r.window ?? [0, 1];
    for (let i = 0; i < c.n; i++) {
      const k = Math.min(1, Math.max(0, (i / (c.n - 1) - a) / (b - a))),
        e = k * k * (3 - 2 * k);
      if (r.spin) {
        const R = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), r.spin * e);
        c.bones.hips.q[i] = R.clone()
          .multiply(new Quaternion().fromArray(c.bones.hips.q[i]))
          .toArray()
          .map((x) => +x.toFixed(4));
      }
      if (r.lift) c.hips[i][1] = +(c.hips[i][1] + r.lift * Math.sin(Math.PI * e)).toFixed(4);
    }
  }
  if (r.speed && r.speed !== 1) {
    const n = Math.max(2, Math.round((c.n - 1) / r.speed) + 1),
      pick = (i: number) => Math.min(c.n - 1, Math.round(i * r.speed!));
    for (const tr of Object.values(c.bones)) tr.q = Array.from({ length: n }, (_, i) => tr.q[pick(i)]);
    c.hips = Array.from({ length: n }, (_, i) => c.hips[pick(i)]);
    c.n = n;
  }
  return c;
}

const outJ: any = { fps: FPS, source: "Universal Animation Library (Quaternius, CC0)", clips: {} };
for (const [k, r] of Object.entries(CLIPS)) outJ.clips[k] = make(r);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(outJ));
console.log(`ghi ${out}: ${Object.keys(outJ.clips).length} clip`);
