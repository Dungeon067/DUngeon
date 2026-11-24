import * as THREE from "three";

/** Xương ngón tay (VRM chuẩn J_Bip_*_Index1… hoặc tên humanoid leftIndex…). */
const FINGER = /(Thumb|Index|Middle|Ring|Little)/i;

/**
 * Sửa đỉnh lưới bị gắn nhầm vào xương ngón tay trên các lưới không phải bàn tay (lỗi khi xuất mô hình):
 * khi tay cử động, đỉnh đó bị kéo theo ngón và kéo lưới căng thành một que mảnh (ví dụ từ ngực Hạ Vy tới tay trái).
 * Nhận diện: đỉnh có trọng số ngón tay lớn nhưng ở tư thế gốc lại nằm xa xương ngón đó (> `maxDist` mét) → gán lại
 * trọng số theo đỉnh gần nhất (tư thế gốc) hợp lệ. Lưới găng / bàn tay ở sát xương ngón nên không bị đụng.
 * Trả về số đỉnh đã sửa.
 */
export function fixStrayFingerWeights(root: THREE.Object3D, maxDist = 0.2): number {
  let fixed = 0;
  root.traverse((o) => {
    const m = o as THREE.SkinnedMesh;
    if (!m.isSkinnedMesh || !m.skeleton) return;
    const g = m.geometry;
    const si = g.attributes.skinIndex as THREE.BufferAttribute | undefined,
      sw = g.attributes.skinWeight as THREE.BufferAttribute | undefined,
      pos = g.attributes.position as THREE.BufferAttribute | undefined;
    if (!si || !sw || !pos) return;
    const bones = m.skeleton.bones;
    const finger = bones.map((b) => FINGER.test(b.name));
    if (!finger.some(Boolean)) return;
    // Vị trí xương ở tư thế gốc, cùng hệ với thuộc tính position (bindMatrix · bind pose).
    const bindPos = m.skeleton.boneInverses.map((inv) =>
      new THREE.Vector3()
        .setFromMatrixPosition(new THREE.Matrix4().copy(inv).invert())
        .applyMatrix4(m.bindMatrixInverse),
    );
    const bad: number[] = [];
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      let w = 0,
        top = -1,
        tw = 0;
      for (let k = 0; k < 4; k++) {
        const j = si.getComponent(i, k),
          x = sw.getComponent(i, k);
        if (!finger[j]) continue;
        w += x;
        if (x > tw) {
          tw = x;
          top = j;
        }
      }
      if (w > 0.3 && top >= 0 && v.fromBufferAttribute(pos, i).distanceTo(bindPos[top]) > maxDist) bad.push(i);
    }
    if (!bad.length) return;
    const isBad = new Set(bad);
    const a = new THREE.Vector3(),
      b = new THREE.Vector3();
    for (const i of bad) {
      a.fromBufferAttribute(pos, i);
      let best = -1,
        bd = Infinity;
      for (let j = 0; j < pos.count; j++) {
        if (isBad.has(j)) continue;
        const d = b.fromBufferAttribute(pos, j).distanceToSquared(a);
        if (d < bd) {
          bd = d;
          best = j;
        }
      }
      if (best < 0) continue;
      for (let k = 0; k < 4; k++) {
        si.setComponent(i, k, si.getComponent(best, k));
        sw.setComponent(i, k, sw.getComponent(best, k));
      }
      fixed++;
    }
    si.needsUpdate = sw.needsUpdate = true;
  });
  return fixed;
}
