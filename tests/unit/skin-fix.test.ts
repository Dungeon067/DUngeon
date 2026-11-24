import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { dropHandTorsoSlivers, fixStrayFingerWeights } from "../../src/render3d/toon/skin-fix";

/** Lưới 3 đỉnh: 2 đỉnh ngực theo xương ngực, 1 đỉnh ngực gắn nhầm ngón tay; thêm 1 đỉnh găng tay sát ngón (hợp lệ). */
function mesh() {
  const chest = new THREE.Bone();
  chest.name = "J_Bip_C_UpperChest";
  chest.position.set(0, 1.3, 0);
  const finger = new THREE.Bone();
  finger.name = "J_Bip_L_Index1";
  finger.position.set(0.7, 1.3, 0);
  const root = new THREE.Bone();
  root.add(chest, finger);
  root.updateMatrixWorld(true);
  const g = new THREE.BufferGeometry();
  g.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([0, 1.3, 0.1, 0.05, 1.3, 0.1, 0.02, 1.32, 0.1, 0.72, 1.3, 0], 3),
  );
  g.setAttribute("skinIndex", new THREE.Uint16BufferAttribute([1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], 4));
  g.setAttribute("skinWeight", new THREE.Float32BufferAttribute([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], 4));
  const m = new THREE.SkinnedMesh(g, new THREE.MeshBasicMaterial());
  m.add(root);
  m.bind(new THREE.Skeleton([root, chest, finger]));
  return m;
}

describe("Sửa đỉnh gắn nhầm xương ngón tay", () => {
  it("gán lại đỉnh xa ngón tay theo đỉnh gần nhất, giữ nguyên đỉnh găng tay", () => {
    const m = mesh();
    expect(fixStrayFingerWeights(m)).toBe(1);
    const si = m.geometry.attributes.skinIndex;
    expect(si.getX(2)).toBe(1); // đỉnh ngực giờ theo xương ngực
    expect(si.getX(3)).toBe(2); // đỉnh găng tay vẫn theo ngón
  });
});

describe("Xóa tam giác lỗi nối tay với thân", () => {
  it("bỏ tam giác dài nối đỉnh ngón tay với đỉnh ngực, giữ tam giác bình thường", () => {
    const m = mesh();
    // Tam giác 0: ba đỉnh ngực (hợp lệ). Tam giác 1: hai đỉnh ngực + đỉnh găng tay cách ≈ 0,7 m (lỗi).
    m.geometry.setIndex([0, 1, 2, 0, 1, 3]);
    m.geometry.attributes.skinIndex.setX(2, 1);
    expect(dropHandTorsoSlivers(m)).toBe(1);
    expect(Array.from(m.geometry.index!.array)).toEqual([0, 1, 2]);
  });
});
