/**
 * Lớp đánh bóng keyframe thủ công trên nền mocap Mixamo.
 * Mỗi khóa là [f, giá trị] với f tỉ lệ 0..1 của clip nền; nội suy ease in/out giữa các khóa.
 */
import * as THREE from "three";
import { qe, type Grip, type Hand, type OverlayDef, type Rig, type V3 } from "../pose";

export type K<T> = [number, T][];
const sm = (u: number) => u * u * (3 - 2 * u);
function seg<T>(k: K<T>, f: number): [T, T, number] {
  if (f <= k[0][0]) return [k[0][1], k[0][1], 0];
  for (let i = 1; i < k.length; i++)
    if (f <= k[i][0]) return [k[i - 1][1], k[i][1], sm((f - k[i - 1][0]) / Math.max(1e-6, k[i][0] - k[i - 1][0]))];
  const l = k[k.length - 1][1];
  return [l, l, 0];
}
export const kn = (k: K<number>, f: number) => {
  const [a, b, u] = seg(k, f);
  return a + (b - a) * u;
};
export const kv = (k: K<V3>, f: number): V3 => {
  const [a, b, u] = seg(k, f);
  return [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * u) as V3;
};
export function kh(k: K<Hand>, f: number): Hand {
  const [a, b, u] = seg(k, f);
  const l = (x: V3, y: V3) => [0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * u) as V3;
  return { p: l(a.p, b.p), fing: l(a.fing, b.fing), thumb: l(a.thumb, b.thumb), elbow: l(a.elbow, b.elbow), sp: a.sp };
}
export function kg(k: K<Grip>, f: number): Grip {
  const [a, b, u] = seg(k, f);
  const l = (x = 0, y = 0) => x + (y - x) * u;
  return {
    c: l(a.c, b.c),
    t: l(a.t, b.t),
    s: l(a.s, b.s),
    ci: l(a.ci ?? a.c, b.ci ?? b.c),
    cm: l(a.cm ?? a.c, b.cm ?? b.c),
  };
}

const ARM = (k: "l" | "r") => {
  const s = k === "l" ? "left" : "right";
  return [`${s}Shoulder`, `${s}UpperArm`, `${s}LowerArm`, `${s}Hand`];
};
const FING = (k: "l" | "r") => {
  const s = k === "l" ? "left" : "right";
  return ["Thumb", "Index", "Middle", "Ring", "Little"].flatMap((n) =>
    ["Metacarpal", "Proximal", "Intermediate", "Distal"].map((p) => `${s}${n}${p}`),
  );
};
function blend(r: Rig, bones: string[], w: number, fn: () => void) {
  if (w <= 0) return;
  const old = bones.map((b) => r.bones[b]?.quaternion.clone());
  fn();
  if (w < 1)
    bones.forEach((b, i) => {
      if (r.bones[b] && old[i]) r.bones[b].quaternion.copy(old[i]!.slerp(r.bones[b].quaternion, w));
    });
  r.root.updateMatrixWorld(true);
}
/** IK tay tới đích h, trộn với tay mocap theo w. */
export const ik = (r: Rig, k: "l" | "r", h: Hand, w = 1) => blend(r, ARM(k), w, () => r.hand(k, h));
/** Dáng ngón tay. */
export const fing = (r: Rig, k: "l" | "r", g: Grip, w = 1) => blend(r, FING(k), w, () => r.grip(k, g));
/** Cộng xoay cục bộ (độ, YXZ) vào xương. */
export function rot(r: Rig, b: string, e: V3, w = 1) {
  const o = r.bones[b];
  if (!o || w <= 0) return;
  o.quaternion.multiply(qe([e[0] * w, e[1] * w, e[2] * w]));
  r.root.updateMatrixWorld(true);
}
/** Xoay quanh trục đứng cả người tại hông (độ). */
export function yaw(r: Rig, deg: number) {
  r.bones.hips.quaternion.premultiply(
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), (deg * Math.PI) / 180),
  );
  r.root.updateMatrixWorld(true);
}
/** Dịch hông (H). */
export function shift(r: Rig, d: V3) {
  r.bones.hips.position.add(new THREE.Vector3(...d));
  r.root.updateMatrixWorld(true);
}
export const polish = (from: string, mod: OverlayDef["mod"]): OverlayDef => ({ from, mod });

/** Nắm vũ khí: ngón cái dọc lưỡi (blade), mép lưỡi theo edge. */
export function wgrip(p: V3, blade: V3, edge: V3, elbow: V3, sp?: "root" | "chest"): Hand {
  const b = new THREE.Vector3(...blade).normalize(),
    e = new THREE.Vector3(...edge).normalize();
  e.addScaledVector(b, -e.dot(b)).normalize();
  return { p, thumb: b.toArray() as V3, fing: e.toArray() as V3, elbow, sp };
}
/** Ngón: nắm chuôi (ngón trỏ duỗi hơn), thả lỏng, múa phép (trỏ duỗi, áp út cong dần). */
export const HILT: Grip = { c: 0.9, t: 0.85, ci: 0.72, cm: 0.85, s: 2 };
export const SOFT: Grip = { c: 0.42, t: 0.35, ci: 0.22, cm: 0.32, s: 6 };
export const MUDRA: Grip = { c: 0.55, t: 0.2, ci: 0.05, cm: 0.25, s: 9 };
