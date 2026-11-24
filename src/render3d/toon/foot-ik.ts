/**
 * IK chân bám dốc và bậc thang cho VRM (hợp nhất D).
 * Chuyển thể từ norio/vrm-game-starter src/character/FootIK.ts (MIT, © 2026 norio):
 * hạ hông theo chân thấp hơn, IK hai đoạn đưa cổ chân về độ cao hoạt ảnh trên mặt đất thật, nghiêng bàn chân theo dốc.
 * Khác bản gốc: hỏi độ cao mặt đất qua hàm `ground(x, z)` (địa hình dạng lưới độ cao) thay cho raycast,
 * và chạy trên xương chuẩn hóa trước vrm.update (dùng solveLimb sẵn có).
 */
import * as THREE from "three";
import type { VRM } from "@pixiv/three-vrm";
import { solveLimb, type Limb } from "./ik";

export interface FootIKOpt {
  toiDa: number;
  muot: number;
  nghieng: number;
}
const UP = new THREE.Vector3(0, 1, 0);
const _f = new THREE.Vector3(),
  _t = new THREE.Vector3(),
  _n = new THREE.Vector3(),
  _q = new THREE.Quaternion(),
  _qt = new THREE.Quaternion(),
  _pole = new THREE.Vector3(),
  _h = new THREE.Vector3();

/** Độ lệch đất cần chỉnh cho một bàn chân, kẹp trong ±max (null = không bám, giữ hoạt ảnh). */
export function footOffset(groundY: number | null, planeY: number, max: number) {
  if (groundY === null || !Number.isFinite(groundY)) return 0;
  const d = groundY - planeY;
  return d < -max ? 0 : Math.min(max, d);
}
/** Pháp tuyến mặt đất từ sai phân độ cao quanh (x, z). */
export function groundNormal(ground: (x: number, z: number) => number | null, x: number, z: number, e = 0.15) {
  const c = ground(x, z) ?? 0;
  const dx = (ground(x + e, z) ?? c) - (ground(x - e, z) ?? c),
    dz = (ground(x, z + e) ?? c) - (ground(x, z - e) ?? c);
  return new THREE.Vector3(-dx / (2 * e), 1, -dz / (2 * e)).normalize();
}

export class FootIK {
  ground: ((x: number, z: number) => number | null) | null = null;
  /** Mặt phẳng đất của hoạt ảnh (y thế giới); renderer đặt mỗi khung. */
  planeY = 0;
  active = false;
  private w = 0;
  private legs: { L: Limb; off: number; n: THREE.Vector3 }[] = [];
  private hips: THREE.Object3D | null;
  constructor(
    vrm: VRM,
    private root: THREE.Object3D,
    private o: FootIKOpt,
  ) {
    const b = (n: string) => vrm.humanoid.getNormalizedBoneNode(n as any);
    this.hips = b("hips");
    for (const s of ["left", "right"]) {
      const a = b(`${s}UpperLeg`),
        k = b(`${s}LowerLeg`),
        f = b(`${s}Foot`);
      if (a && k && f)
        this.legs.push({ L: { a, b: k, c: f, poleRest: new THREE.Vector3(0, 0, 1) }, off: 0, n: UP.clone() });
    }
  }
  update(dt: number) {
    if (!this.ground || !this.hips || this.legs.length !== 2) return;
    this.w = THREE.MathUtils.damp(this.w, this.active ? 1 : 0, 8, dt);
    if (this.w < 1e-3 && this.legs.every((l) => Math.abs(l.off) < 1e-4)) return;
    this.root.updateMatrixWorld(true);
    for (const l of this.legs) {
      l.L.c.getWorldPosition(_f);
      const g = this.active ? this.ground(_f.x, _f.z) : null;
      l.off = THREE.MathUtils.damp(l.off, footOffset(g, this.planeY, this.o.toiDa), this.o.muot, dt);
      l.n.lerp(this.active ? groundNormal(this.ground, _f.x, _f.z) : UP, 1 - Math.exp(-12 * dt)).normalize();
    }
    // Hạ hông theo chân thấp hơn để chân dưới dốc với tới.
    const drop = Math.min(0, this.legs[0].off, this.legs[1].off) * this.w;
    if (drop < -1e-4) {
      const par = this.hips.parent!;
      this.hips.getWorldPosition(_h);
      _h.y += drop;
      par.worldToLocal(_h);
      this.hips.position.copy(_h);
      this.root.updateMatrixWorld(true);
    }
    _pole.set(0, 0, 1).applyQuaternion(this.root.getWorldQuaternion(_q));
    for (const l of this.legs) {
      l.L.c.getWorldPosition(_t);
      _t.y += (l.off - drop) * this.w;
      l.L.c.getWorldQuaternion(_q);
      // Nghiêng bàn chân theo dốc, giới hạn góc.
      const ang = Math.min(UP.angleTo(l.n), this.o.nghieng) * this.w;
      if (ang > 1e-3) {
        _n.crossVectors(UP, l.n).normalize();
        _q.premultiply(_qt.setFromAxisAngle(_n, ang));
      }
      solveLimb(l.L, _t, _pole, _q);
    }
  }
}
