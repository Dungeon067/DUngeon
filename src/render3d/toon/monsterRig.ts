/**
 * S29: uốn chuỗi xương sống của quái thân dài (Hắc Giao) theo một đường đi trong không gian thế giới.
 * Clip hoạt ảnh vẫn lo đầu, hàm, râu, vây; hàm này chỉ đặt hướng các xương `sp*` sau khi mixer cập nhật.
 */
import * as THREE from "three";

const _a = new THREE.Vector3(),
  _b = new THREE.Vector3(),
  _d = new THREE.Vector3(),
  _t = new THREE.Vector3(),
  _q = new THREE.Quaternion(),
  _w = new THREE.Quaternion(),
  _p = new THREE.Quaternion();

/** Lấy danh sách xương sống theo thứ tự sp0..spN. */
export function spineBones(root: THREE.Object3D): THREE.Bone[] {
  const out: THREE.Bone[] = [];
  root.traverse((o: any) => {
    const m = /^sp(\d+)$/.exec(o.name);
    if (o.isBone && m) out[+m[1]] = o;
  });
  return out.filter(Boolean);
}

/** Quay từng xương sp_i để đầu xương kế tiếp nằm trên đường `pts` (pts[i] ứng với đầu xương sp_i, đã chia theo độ dài xương). */
export function driveSpine(bones: THREE.Bone[], pts: THREE.Vector3[], k = 1) {
  for (let i = 0; i < bones.length && i + 1 < pts.length; i++) {
    const b = bones[i];
    b.updateWorldMatrix(true, false);
    b.getWorldPosition(_a);
    const next = bones[i + 1];
    if (next) {
      next.updateWorldMatrix(false, false);
      next.getWorldPosition(_b);
    } else {
      _b.set(0, 1, 0).applyQuaternion(b.getWorldQuaternion(_w)).add(_a);
    }
    _d.subVectors(_b, _a).normalize();
    _t.subVectors(pts[i + 1], _a).normalize();
    if (_d.lengthSq() < 1e-8 || _t.lengthSq() < 1e-8) continue;
    _q.setFromUnitVectors(_d, _t);
    if (k < 1) _q.slerp(_w.identity(), 1 - k);
    b.getWorldQuaternion(_w).premultiply(_q);
    b.parent!.getWorldQuaternion(_p).invert();
    b.quaternion.copy(_p.multiply(_w));
    b.updateWorldMatrix(false, true);
  }
}

/** Chia lại một đường gấp khúc theo khoảng `seg` (đơn vị thế giới), trả `n` điểm. */
export function resamplePath(
  path: THREE.Vector3[],
  seg: number,
  n: number,
  out: THREE.Vector3[] = [],
): THREE.Vector3[] {
  out.length = 0;
  if (!path.length) return out;
  out.push(path[0].clone());
  let need = seg,
    j = 1,
    prev = path[0].clone();
  while (out.length < n && j < path.length) {
    const d = prev.distanceTo(path[j]);
    if (d >= need) {
      prev = prev.clone().lerp(path[j], need / d);
      out.push(prev.clone());
      need = seg;
    } else {
      need -= d;
      prev = path[j].clone();
      j++;
    }
  }
  while (out.length < n) out.push(out[out.length - 1].clone().add(_d.set(0, 0, 0)));
  return out;
}
