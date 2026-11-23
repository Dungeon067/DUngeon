/**
 * Lớp "nữ tính hóa" cho bản nữ (clip tên + "F"): mocap Mixamo/CMU là người nam nên thế đứng rộng, khuỵu thấp.
 * - Chân: khép về giữa (khoảng cách ≤ độ rộng vai), trọng tâm cao (bớt khuỵu), mũi chân hơi khép, gối hướng trước.
 * - Vai thả xuống, khuỷu gần thân hơn (giữ nguyên đích bàn tay).
 */
import * as THREE from "three";
import type { OverlayDef, Rig } from "../pose";
import { solveLimb } from "../../../src/render3d/toon/ik";
import { polish, rot } from "./polish";

export interface FemOpt {
  /** Nửa khoảng cách tối đa giữa hai bàn chân (m, ngang + trước sau). */
  half?: number;
  /** Hệ số co khoảng cách chân. */
  k?: number;
  /** Bớt độ hạ hông (0..1). */
  up?: number;
  /** Góc khép mũi chân (độ). */
  toe?: number;
  /** Kéo khuỷu về sát thân (0..1). */
  elbow?: number;
  /** Hông lệch (contrapposto, độ), vai bù ngược. */
  hip?: number;
}
const Y = new THREE.Vector3(0, 1, 0);
export function femLegs(r: Rig, o: FemOpt = {}) {
  const half = o.half ?? 0.11,
    k = o.k ?? 0.7,
    up = o.up ?? 0.65,
    toe = o.toe ?? 5;
  const fl = r.pos("leftFoot"),
    fr = r.pos("rightFoot");
  const ql = r.quat("leftFoot"),
    qr = r.quat("rightFoot");
  const H = r.bones.hips;
  if (H.position.y < 0) H.position.y *= 1 - up;
  if (o.hip) {
    rot(r, "hips", [0, 0, o.hip]);
    rot(r, "spine", [0, 0, -o.hip * 0.7]);
    rot(r, "chest", [0, 0, -o.hip * 0.3]);
  }
  r.root.updateMatrixWorld(true);
  const mid = fl.clone().add(fr).multiplyScalar(0.5);
  const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(r.quat("hips"));
  fwd.y = 0;
  fwd.normalize();
  for (const [s, f, q, sg] of [
    ["l", fl, ql, -1],
    ["r", fr, qr, 1],
  ] as const) {
    const d = f.clone().sub(mid);
    const y = d.y;
    d.y = 0;
    d.multiplyScalar(k);
    if (d.length() > half) d.setLength(half);
    const t = mid.clone().add(d);
    t.y = mid.y + y;
    const pole = fwd
      .clone()
      .addScaledVector(new THREE.Vector3(-sg, 0, 0), 0.22)
      .normalize();
    const fq = new THREE.Quaternion().setFromAxisAngle(Y, (sg * toe * Math.PI) / 180).multiply(q);
    solveLimb(r.legs[s], t, pole, fq);
  }
  r.root.updateMatrixWorld(true);
}
/** Giữ đích bàn tay, đổi hướng khuỷu (kéo về sát thân / nâng ngang tai). */
export function reElbow(r: Rig, s: "l" | "r", dir: THREE.Vector3, w = 1) {
  if (w <= 0) return;
  const L = r.arms[s];
  const p = L.c.getWorldPosition(new THREE.Vector3()),
    q = L.c.getWorldQuaternion(new THREE.Quaternion());
  const e = L.b.getWorldPosition(new THREE.Vector3()).sub(L.a.getWorldPosition(new THREE.Vector3()));
  e.lerp(dir.clone().normalize().multiplyScalar(e.length()), w).normalize();
  solveLimb(L, p, e, q);
  r.root.updateMatrixWorld(true);
}
export function femArms(r: Rig, w: number) {
  if (w <= 0) return;
  for (const s of ["l", "r"] as const) {
    const sg = s === "l" ? 1 : -1;
    reElbow(r, s, new THREE.Vector3(sg * 0.35, -1, -0.2), w);
  }
}
/** Bản nữ của clip `from`, kèm lớp chỉnh thêm `extra` (chạy sau lớp chân). */
export function fem(from: string, o: FemOpt = {}, extra?: OverlayDef["mod"]): OverlayDef {
  return polish(from, (r, f, i) => {
    femLegs(r, o);
    femArms(r, o.elbow ?? 0);
    extra?.(r, f, i);
  });
}

/** Bộ bản nữ (hậu tố `suf`) cho danh sách clip. */
export function femSet(names: string[], o: FemOpt, suf = "F", extra: Record<string, OverlayDef["mod"]> = {}) {
  return Object.fromEntries(names.map((n) => [n + suf, fem(n, o, extra[n])])) as Record<string, OverlayDef>;
}
