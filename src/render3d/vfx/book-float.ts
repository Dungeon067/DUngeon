/**
 * Sách phép bay độc lập: bám theo điểm neo (theo thân người, không theo xương tay) bằng lò xo giảm chấn.
 * Có trễ và quá đà nhẹ, bồng bềnh lên xuống, nghiêng theo quán tính, xoay mặt về hướng bắn, giật lùi khi bắn.
 * Không phụ thuộc VRM: dùng chung cho VFX pháp khí (S30) và mô hình sách của WeaponFx (S27).
 */
import * as THREE from "three";

const TAU = Math.PI * 2;
const wrap = (a: number) => a - TAU * Math.round(a / TAU);

export class BookFloat {
  readonly pos = new THREE.Vector3();
  readonly vel = new THREE.Vector3();
  readonly quat = new THREE.Quaternion();
  /** Tần số góc lò xo vị trí (rad/s) và hệ số giảm chấn (<1: quá đà nhẹ). */
  omega = 8.5;
  zeta = 0.55;
  /** Lò xo xoay mặt sách về hướng bắn. */
  yawOmega = 9;
  yawZeta = 0.7;
  /** Sách trễ xa hơn mức này (dịch chuyển tức thời) thì đặt lại tại neo. */
  maxLag = 3;
  bobAmp = 0.04;
  /** Nghiêng sách theo vận tốc (rad trên m/s) và mức nghiêng tối đa. */
  lean = 0.06;
  maxLean = 0.45;
  /** Góc cơ sở trong hệ sách: cúi mặt trang và lệch ngang so với hướng nhìn. */
  basePitch = -0.55;
  baseYaw = Math.PI + 0.35;
  yaw = 0;
  private yawV = 0;
  private recoil = 0;
  private recoilV = 0;
  private t = 0;
  private live = false;
  private readonly tgt = new THREE.Vector3();
  private readonly acc = new THREE.Vector3();
  private readonly eul = new THREE.Euler(0, 0, 0, "YXZ");

  /** Đặt sách ngay tại p (rút sách, đổi người, dịch chuyển). */
  reset(p: THREE.Vector3, yaw = this.yaw) {
    this.pos.copy(p);
    this.vel.set(0, 0, 0);
    this.yaw = yaw;
    this.yawV = 0;
    this.recoil = this.recoilV = 0;
    this.live = true;
  }

  /** Giật lùi khi bắn: dir là hướng bắn (thế giới), s là lực (1 = đạn thường). */
  kick(dir: THREE.Vector3, s = 1) {
    const l = Math.hypot(dir.x, dir.y, dir.z) || 1;
    this.vel.x -= (dir.x / l) * 1.8 * s;
    this.vel.y += 0.35 * s;
    this.vel.z -= (dir.z / l) * 1.8 * s;
    this.recoilV -= 9 * s;
  }

  /** Mỗi khung: anchor là điểm neo (thế giới), aimYaw là hướng bắn/nhìn. Trả về this (đọc pos, quat). */
  update(dt: number, anchor: THREE.Vector3, aimYaw: number) {
    if (!this.live || this.pos.distanceTo(anchor) > this.maxLag) this.reset(anchor, aimYaw);
    if (dt <= 0) return this.pose();
    const w = this.omega,
      c = 2 * this.zeta * w,
      yw = this.yawOmega,
      yc = 2 * this.yawZeta * yw;
    // Chia bước nhỏ cho ổn định khi khung dài (máy yếu, lướt nhanh).
    const n = Math.max(1, Math.ceil(dt / (1 / 120))),
      h = dt / n;
    for (let i = 0; i < n; i++) {
      this.t += h;
      this.tgt.copy(anchor);
      this.tgt.y += this.bobAmp * Math.sin(this.t * 2.2) + this.bobAmp * 0.35 * Math.sin(this.t * 3.7 + 1);
      this.acc
        .subVectors(this.tgt, this.pos)
        .multiplyScalar(w * w)
        .addScaledVector(this.vel, -c);
      this.vel.addScaledVector(this.acc, h);
      this.pos.addScaledVector(this.vel, h);
      const ya = wrap(aimYaw - this.yaw) * yw * yw - this.yawV * yc;
      this.yawV += ya * h;
      this.yaw += this.yawV * h;
      const ra = -this.recoil * 260 - this.recoilV * 22;
      this.recoilV += ra * h;
      this.recoil += this.recoilV * h;
    }
    return this.pose();
  }

  private pose() {
    // Nghiêng theo quán tính: vận tốc dọc hướng nhìn làm sách chúi/ngửa, vận tốc ngang làm sách lắc nghiêng.
    const fx = Math.sin(this.yaw),
      fz = Math.cos(this.yaw);
    const vf = this.vel.x * fx + this.vel.z * fz,
      vs = this.vel.x * fz - this.vel.z * fx;
    const cl = (a: number) => Math.max(-this.maxLean, Math.min(this.maxLean, a));
    const t = this.t;
    this.eul.set(
      this.basePitch + cl(vf * this.lean) + this.recoil * 0.06 + 0.07 * Math.sin(t * 1.3),
      this.yaw + this.baseYaw + 0.12 * Math.sin(t * 0.7),
      cl(-vs * this.lean) + 0.06 * Math.sin(t * 1.7),
    );
    this.quat.setFromEuler(this.eul);
    return this;
  }
}
