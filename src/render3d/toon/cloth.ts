/**
 * S27: vải và tóc (spring bone) ở runtime.
 * - dt cho spring bone kẹp tối đa 1/30 giây;
 * - spring bone "thấy" một bản hông đã làm mượt (lọc thông thấp), nên cú giật hông khi đổi clip không quăng vạt vải;
 *   hình thân người vẫn dùng hông thật;
 * - gió (`wind`, hệ thế giới, từ wind.ts) cộng vào trọng lực của từng khớp theo trọng số loại vải: tóc, dải vải
 *   bay mạnh, váy và vạt áo nhẹ, ngực không nhận gió. Không cộng lực theo tốc độ chạy;
 * - giới hạn góc theo loại vải, luôn áp dụng: váy và vạt trước / sau lệch tối đa `gioiHan.vay.tong` độ
 *   (cả chuỗi từ gốc tới mép) so với tư thế nghỉ, nên không lật quá hông dù gió mạnh nhất.
 * Collider đùi / hông, trọng số và giới hạn riêng từng xương, quần trong là việc của mô hình (S26).
 */
import * as THREE from "three";
import type { VRM } from "@pixiv/three-vrm";
import type { GioCfg, Vai } from "../../data/poses-schema";
import { POSES } from "../../data/poses";

export const CLOTH = {
  /** dt tối đa cho spring bone (giây). */
  dtMax: 1 / 30,
  /** Độ bám của hông mà spring bone thấy (1/giây): nhỏ thì vải ít bị quăng. */
  hipsK: 20,
  /** Khi vừa đổi clip đột ngột: độ bám thấp hơn, hồi dần về hipsK trong `kickT` giây. */
  kickK: 8,
  kickT: 0.35,
};

const LOAI: [Vai, RegExp][] = [
  ["nguc", /bust|breast/i],
  ["vay", /skirt|dress|bottoms|hem/i],
  ["dai", /string|ribbon|tassel|tie|band|tail|feather|lace/i],
  ["choang", /cape|cloak|mantle|hood|scarf/i],
  ["tay", /sleeve/i],
  ["toc", /hair/i],
];
/** Loại vải của xương spring bone theo tên (quy ước tên VRoid J_Sec_*). */
export function loaiVai(name: string): Vai {
  return LOAI.find(([, re]) => re.test(name))?.[0] ?? "khac";
}
const qa = new THREE.Quaternion(),
  va = new THREE.Vector3();

interface Joint {
  b: THREE.Object3D;
  loai: Vai;
  w: number;
  s: { gravityDir: THREE.Vector3; gravityPower: number } | null;
  g0: THREE.Vector3;
  p0: number;
  q0: THREE.Quaternion;
  up: Joint | null;
  lim: { goc: number; con: number; tong: number } | null;
  used: number;
}

export class ClothGuard {
  private hips: THREE.Object3D | null;
  private sq = new THREE.Quaternion();
  private sp = new THREE.Vector3();
  private rq = new THREE.Quaternion();
  private rp = new THREE.Vector3();
  private init = false;
  private kick = 0;
  private js: Joint[] = [];
  /** Gió (hệ thế giới) cho khung tới; chủ actor đặt mỗi khung. */
  wind = new THREE.Vector3();
  /** Góc lệch lớn nhất (độ, cả chuỗi) ở khung vừa rồi theo loại vải, để kiểm tra. */
  dev: Partial<Record<Vai, number>> = {};
  /** Góc lệch lớn nhất của váy và vạt áo (độ). */
  maxDev = 0;
  /** Tắt (so sánh với cách cũ: vrm.update thẳng, chỉ đo). */
  off = false;

  constructor(
    private vrm: VRM,
    cfg: GioCfg = POSES.gio,
  ) {
    this.hips = vrm.humanoid.getRawBoneNode("hips");
    const raw = [...(vrm.springBoneManager?.joints ?? [])] as any[];
    const byBone = new Map<THREE.Object3D, Joint>();
    const rad = THREE.MathUtils.degToRad;
    for (const j of raw) {
      const loai = loaiVai(j.bone.name),
        L = (cfg.gioiHan as Record<string, { goc: number; con: number; tong: number } | undefined>)[loai];
      const J: Joint = {
        b: j.bone,
        loai,
        w: cfg.trongSo[loai],
        s: j.settings?.gravityDir ? j.settings : null,
        g0: j.settings?.gravityDir?.clone() ?? new THREE.Vector3(0, -1, 0),
        p0: j.settings?.gravityPower ?? 0,
        q0: j.bone.quaternion.clone(),
        up: null,
        lim: L ? { goc: rad(L.goc), con: rad(L.con), tong: rad(L.tong) } : null,
        used: 0,
      };
      byBone.set(j.bone, J);
      this.js.push(J);
    }
    for (const J of this.js) J.up = byBone.get(J.b.parent as THREE.Object3D) ?? null;
    const depth = (J: Joint): number => (J.up ? 1 + depth(J.up) : 0);
    this.js.sort((x, y) => depth(x) - depth(y));
  }

  /** Báo vừa đổi clip đột ngột (pha trộn ngắn). */
  jolt() {
    this.kick = CLOTH.kickT;
  }

  /** Thay cho vrm.update(dt): cập nhật humanoid, nhìn, biểu cảm, ràng buộc, spring bone (có kẹp), vật liệu. */
  update(dt: number) {
    const vrm = this.vrm,
      d = Math.min(Math.max(dt, 0), CLOTH.dtMax);
    if (this.off) {
      vrm.update(dt);
      this.clamp(false);
      return;
    }
    vrm.humanoid.update();
    vrm.lookAt?.update(d);
    vrm.expressionManager?.update();
    vrm.nodeConstraintManager?.update();
    const sbm = vrm.springBoneManager,
      h = this.hips;
    if (sbm && h) {
      this.rq.copy(h.quaternion);
      this.rp.copy(h.position);
      if (!this.init) {
        this.sq.copy(this.rq);
        this.sp.copy(this.rp);
        this.init = true;
      } else {
        const u = this.kick > 0 ? 1 - this.kick / CLOTH.kickT : 1;
        const k = CLOTH.kickK + (CLOTH.hipsK - CLOTH.kickK) * u * u;
        const a = 1 - Math.exp(-k * d);
        this.sq.slerp(this.rq, a);
        this.sp.lerp(this.rp, a);
      }
      this.kick = Math.max(0, this.kick - d);
      h.quaternion.copy(this.sq);
      h.position.copy(this.sp);
      h.updateMatrixWorld(true);
      this.blow();
      sbm.update(d);
      h.quaternion.copy(this.rq);
      h.position.copy(this.rp);
      this.clamp();
      h.updateMatrixWorld(true);
    } else {
      this.blow();
      sbm?.update(d);
      this.clamp();
    }
    vrm.materials?.forEach((m: any) => m.update?.(d));
  }

  /** Trọng lực mỗi khớp = trọng lực gốc của mô hình + gió × trọng số loại vải. */
  private blow() {
    for (const J of this.js) {
      if (!J.s) continue;
      va.copy(J.g0).multiplyScalar(J.p0).addScaledVector(this.wind, J.w);
      const L = va.length();
      J.s.gravityPower = L;
      if (L > 1e-6) J.s.gravityDir.copy(va).divideScalar(L);
    }
  }

  /** Chặn góc lệch so với tư thế nghỉ, theo chuỗi từ gốc ra mép (khớp cha trước). */
  private clamp(on = true) {
    const dev: Partial<Record<Vai, number>> = {};
    for (const J of this.js) {
      qa.copy(J.q0).invert().multiply(J.b.quaternion);
      let ang = 2 * Math.acos(Math.min(1, Math.abs(qa.w)));
      const up = J.up && J.up.loai === J.loai ? J.up.used : 0;
      if (on && J.lim) {
        const max = J.up && J.up.loai === J.loai ? Math.max(0, Math.min(J.lim.con, J.lim.tong - up)) : J.lim.goc;
        if (ang > max) {
          J.b.quaternion.copy(J.q0).slerp(J.b.quaternion, max / ang);
          // Spring bone tắt matrixAutoUpdate: cập nhật ma trận để giới hạn có hiệu lực khi render.
          J.b.updateMatrix();
          ang = max;
        }
      }
      J.used = up + ang;
      dev[J.loai] = Math.max(dev[J.loai] ?? 0, THREE.MathUtils.radToDeg(J.used));
    }
    this.dev = dev;
    this.maxDev = dev.vay ?? 0;
  }
}
