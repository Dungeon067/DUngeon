/**
 * S27: dây cung kéo theo tay phải và mũi tên đặt trên cung. Mô hình cung chỉ có lưới "string" (không có xương dây)
 * nên dây được giả bằng cách dịch đỉnh: hai đầu dây giữ ở đầu cánh cung, điểm giữa đi theo ngón tay kéo dây.
 * Độ kéo (0 nghỉ, 1 theo tay) lấy từ rãnh `str` trong humanoid.json của clip đang chạy.
 */
import * as THREE from "three";
import { toonMat } from "./mat";

export class BowRig {
  private rest: Float32Array;
  private lo: THREE.Vector3;
  private hi: THREE.Vector3;
  arrow: THREE.Group;
  private _n = new THREE.Vector3();
  private _g = new THREE.Vector3();

  constructor(
    private str: THREE.Mesh,
    private grip: THREE.Object3D,
    private hand: THREE.Object3D,
    parent: THREE.Object3D,
  ) {
    str.geometry = str.geometry.clone();
    for (const c of str.children) if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).geometry = str.geometry;
    const pos = str.geometry.attributes.position as THREE.BufferAttribute;
    this.rest = Float32Array.from(pos.array as ArrayLike<number>);
    let lo = 0,
      hi = 0;
    for (let i = 0; i < pos.count; i++) {
      if (pos.getY(i) < pos.getY(lo)) lo = i;
      if (pos.getY(i) > pos.getY(hi)) hi = i;
    }
    this.lo = new THREE.Vector3().fromBufferAttribute(pos, lo);
    this.hi = new THREE.Vector3().fromBufferAttribute(pos, hi);
    this.arrow = makeArrow();
    this.arrow.visible = false;
    parent.add(this.arrow);
  }

  /** Gọi sau khi xương đã cập nhật xong khung này. */
  update(k: number) {
    const pos = this.str.geometry.attributes.position as THREE.BufferAttribute;
    const R = this.rest,
      { lo, hi } = this;
    // Điểm móc dây: đốt giữa ngón giữa tay phải.
    this.hand.updateWorldMatrix(true, false);
    const n = this.hand.getWorldPosition(this._n);
    this.str.updateWorldMatrix(true, false);
    this.str.worldToLocal(n);
    const len = hi.y - lo.y;
    const sn = THREE.MathUtils.clamp((n.y - lo.y) / len, 0.25, 0.75);
    const kk = THREE.MathUtils.clamp(k, 0, 1);
    for (let i = 0; i < pos.count; i++) {
      const x = R[i * 3],
        y = R[i * 3 + 1],
        z = R[i * 3 + 2];
      const s = THREE.MathUtils.clamp((y - lo.y) / len, 0, 1);
      // Đường dây nghỉ và đường dây kéo (gấp khúc qua điểm móc), giữ độ dày của lưới.
      const rx = lo.x + (hi.x - lo.x) * s,
        rz = lo.z + (hi.z - lo.z) * s,
        ry = lo.y + len * s;
      let lx: number, ly: number, lz: number;
      if (s <= sn) {
        const u = s / sn;
        lx = lo.x + (n.x - lo.x) * u;
        ly = lo.y + (n.y - lo.y) * u;
        lz = lo.z + (n.z - lo.z) * u;
      } else {
        const u = (s - sn) / (1 - sn);
        lx = n.x + (hi.x - n.x) * u;
        ly = n.y + (hi.y - n.y) * u;
        lz = n.z + (hi.z - n.z) * u;
      }
      pos.setXYZ(i, x + (lx - rx) * kk, y + (ly - ry) * kk, z + (lz - rz) * kk);
    }
    pos.needsUpdate = true;
    this.str.geometry.computeBoundingSphere();
    // Mũi tên: đuôi ở điểm móc dây, thân tựa lên tay cầm cung, mũi chĩa ra trước.
    this.arrow.visible = k > 0.05;
    if (this.arrow.visible) {
      const tail = this.str.localToWorld(
        new THREE.Vector3(
          lo.x + (n.x - lo.x) * kk,
          lo.y + len * sn + (n.y - lo.y - len * sn) * kk,
          lo.z + (n.z - lo.z) * kk,
        ),
      );
      const g = this.grip.getWorldPosition(this._g);
      const par = this.arrow.parent!;
      par.updateWorldMatrix(true, false);
      this.arrow.position.copy(par.worldToLocal(tail.clone()));
      const tipW = tail.clone().add(g.sub(tail).normalize());
      this.arrow.lookAt(tipW);
      const sc = par.getWorldScale(new THREE.Vector3()).x || 1;
      this.arrow.scale.setScalar(1 / sc);
    }
  }
}

/** Mũi tên đơn giản: thân gỗ, mũi kim loại, ba lông đuôi. Trục +Z, đuôi ở gốc tọa độ. */
function makeArrow() {
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.005, 0.72, 5),
    toonMat({ color: new THREE.Color("#b08a5a") }),
  );
  shaft.rotation.x = Math.PI / 2;
  shaft.position.z = 0.36;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.05, 6), toonMat({ color: new THREE.Color("#cfd6de") }));
  head.rotation.x = Math.PI / 2;
  head.position.z = 0.745;
  g.add(shaft, head);
  for (let i = 0; i < 3; i++) {
    const f = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.08), toonMat({ color: new THREE.Color("#f2efe6") }));
    (f.material as THREE.Material).side = THREE.DoubleSide;
    f.rotation.set(Math.PI / 2, (i * Math.PI * 2) / 3, 0, "ZXY");
    f.position.set(Math.cos((i * Math.PI * 2) / 3) * 0.011, Math.sin((i * Math.PI * 2) / 3) * 0.011, 0.06);
    g.add(f);
  }
  return g;
}
