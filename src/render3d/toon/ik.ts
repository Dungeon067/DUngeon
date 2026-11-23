/**
 * IK hai đốt (đùi–cẳng, cánh tay–cẳng tay) trên xương humanoid VRM chuẩn hóa.
 * Dùng chung cho công cụ dựng clip (tools/anim/pose.ts) và lớp tư thế lúc chạy (pose-layer.ts).
 * Ở tư thế chữ T xương chuẩn hóa có trục cục bộ trùng hệ gốc, nên "hướng nghỉ" của mỗi đốt chính là vị trí cục bộ của xương con.
 */
import * as THREE from "three";

const m0 = new THREE.Matrix4(),
  m1 = new THREE.Matrix4(),
  v0 = new THREE.Vector3(),
  v1 = new THREE.Vector3(),
  v2 = new THREE.Vector3(),
  v3 = new THREE.Vector3(),
  qa = new THREE.Quaternion();

function frame(dir: THREE.Vector3, side: THREE.Vector3, out: THREE.Matrix4) {
  const x = v0.copy(dir).normalize();
  const y = v1
    .copy(side)
    .addScaledVector(x, -side.dot(x))
    .normalize();
  const z = v2.crossVectors(x, y);
  return out.makeBasis(x, y, z);
}

/** Phép quay đưa cặp hướng (a0, b0) về (a1, b1); b chỉ dùng để khử xoắn. */
export function alignQuat(
  a0: THREE.Vector3,
  b0: THREE.Vector3,
  a1: THREE.Vector3,
  b1: THREE.Vector3,
  out = new THREE.Quaternion(),
) {
  frame(a0, b0, m0);
  frame(a1, b1, m1);
  return out.setFromRotationMatrix(m1.multiply(m0.transpose()));
}

/** Đặt hướng thế giới cho xương (đổi sang quaternion cục bộ theo cha). */
export function setWorldQuat(bone: THREE.Object3D, qw: THREE.Quaternion) {
  if (bone.parent) bone.parent.getWorldQuaternion(qa).invert();
  else qa.identity();
  bone.quaternion.copy(qa.multiply(qw));
  bone.updateMatrixWorld(true);
}

export interface Limb {
  a: THREE.Object3D;
  b: THREE.Object3D;
  c: THREE.Object3D;
  /** Hướng khớp giữa (đầu gối / khuỷu) ở tư thế nghỉ, trong hệ cục bộ gốc. */
  poleRest: THREE.Vector3;
}

const A = new THREE.Vector3(),
  B = new THREE.Vector3(),
  C = new THREE.Vector3(),
  E = new THREE.Vector3(),
  dir = new THREE.Vector3(),
  pp = new THREE.Vector3(),
  side = new THREE.Vector3(),
  side0 = new THREE.Vector3(),
  qEnd = new THREE.Quaternion();

/**
 * Giải IK: đưa đầu mút c tới target (thế giới), khớp giữa hướng về pole (hướng thế giới).
 * endQuat: hướng thế giới mong muốn của đầu mút; bỏ trống thì giữ hướng thế giới hiện tại.
 * Trả về khoảng hụt (0 nếu với tới).
 */
export function solveLimb(L: Limb, target: THREE.Vector3, pole: THREE.Vector3, endQuat?: THREE.Quaternion) {
  const { a, b, c } = L;
  a.updateMatrixWorld(true);
  if (!endQuat) c.getWorldQuaternion(qEnd);
  else qEnd.copy(endQuat);
  a.getWorldPosition(A);
  b.getWorldPosition(B);
  c.getWorldPosition(C);
  const l1 = A.distanceTo(B),
    l2 = B.distanceTo(C);
  dir.subVectors(target, A);
  const want = dir.length();
  const D = THREE.MathUtils.clamp(want, Math.abs(l1 - l2) + 1e-4, (l1 + l2) * 0.9995);
  dir.divideScalar(want || 1);
  pp.copy(pole).addScaledVector(dir, -pole.dot(dir));
  if (pp.lengthSq() < 1e-8) pp.set(0, 0, 1).addScaledVector(dir, -dir.z);
  pp.normalize();
  const cosA = THREE.MathUtils.clamp((l1 * l1 + D * D - l2 * l2) / (2 * l1 * D), -1, 1);
  E.copy(A)
    .addScaledVector(dir, l1 * cosA)
    .addScaledVector(pp, l1 * Math.sqrt(1 - cosA * cosA));
  const T = v3.copy(A).addScaledVector(dir, D);
  side.crossVectors(dir, pp);
  // Hướng nghỉ cục bộ: đốt trên = b.position, đốt dưới = c.position, mặt phẳng gập theo poleRest.
  const d0a = new THREE.Vector3().copy(b.position).normalize();
  const d0b = new THREE.Vector3().copy(c.position).normalize();
  side0.crossVectors(d0a, L.poleRest).normalize();
  // Hướng thế giới mới: Qw = align(rest local → world). Rest local của a là hệ gốc tại tư thế chữ T.
  const qwA = alignQuat(d0a, side0, E.clone().sub(A), side);
  setWorldQuat(a, qwA);
  const qwB = alignQuat(d0b, side0, T.clone().sub(E), side);
  setWorldQuat(b, qwB);
  setWorldQuat(c, qEnd);
  return Math.max(0, want - D);
}
