/**
 * S27: lớp chỉnh tư thế theo dáng (content/poses.yaml), cộng lên clip gốc sau khi mixer chạy, trước vrm.update.
 * Một bộ clip theo vũ khí + lớp này = đủ tổ hợp dáng × vũ khí, không cần clip rời cho từng dáng.
 *  - Đứng (ngoài trận / chờ trận): độ rộng chân (IK), nghiêng hông–vai, ngả lưng, nghiêng đầu, dáng tay, thở, dồn trọng tâm.
 *  - Chờ trận: nới chân, hạ hông, đổ người, nhún.  - Chạy: biên độ sải, độ nảy.  - Ra đòn: độ nặng.
 *  - IK chân: bàn chân bám dốc/bậc khi đứng (ground trả độ cao mặt đất theo tọa độ thế giới).
 */
import * as THREE from "three";
import type { VRM } from "@pixiv/three-vrm";
import type { DangParams } from "../../data/poses-schema";
import { solveLimb, alignQuat, type Limb } from "./ik";

export type PoseMode = "relax" | "ready" | "move" | "act" | "air";
export interface PoseInput {
  mode: PoseMode;
  /** Tay trái/phải đang rảnh (không cầm vũ khí) thì mới chỉnh dáng tay. */
  freeL: boolean;
  freeR: boolean;
}

const D = Math.PI / 180;
const _q = new THREE.Quaternion(),
  _e = new THREE.Euler(),
  _v = new THREE.Vector3(),
  _w = new THREE.Vector3();

export class PoseLayer {
  t = 0;
  private wRelax = 1;
  private wReady = 0;
  private wMove = 0;
  private wAct = 0;
  private wStand = 1;
  private B: Record<string, THREE.Object3D> = {};
  private legs: Record<"l" | "r", Limb>;
  private arms: Record<"l" | "r", Limb>;
  private v0: boolean;
  ground: ((x: number, z: number) => number) | null = null;

  constructor(
    public vrm: VRM,
    public p: DangParams,
    private restHips: THREE.Vector3,
    private hipsH: number,
    private root: THREE.Object3D,
  ) {
    const hum = vrm.humanoid;
    for (const n of Object.keys(hum.humanBones)) {
      const o = hum.getNormalizedBoneNode(n as any);
      if (o) this.B[n] = o;
    }
    this.v0 = vrm.meta?.metaVersion === "0";
    const s = this.v0 ? -1 : 1;
    const limb = (a: string, b: string, c: string, pole: THREE.Vector3): Limb => ({
      a: this.B[a],
      b: this.B[b],
      c: this.B[c],
      poleRest: pole.multiplyScalar(s),
    });
    this.legs = {
      l: limb("leftUpperLeg", "leftLowerLeg", "leftFoot", new THREE.Vector3(0, 0, 1)),
      r: limb("rightUpperLeg", "rightLowerLeg", "rightFoot", new THREE.Vector3(0, 0, 1)),
    };
    this.arms = {
      l: limb("leftUpperArm", "leftLowerArm", "leftHand", new THREE.Vector3(0, 0, -1)),
      r: limb("rightUpperArm", "rightLowerArm", "rightHand", new THREE.Vector3(0, 0, -1)),
    };
  }

  /** Nhân tốc độ clip chạy theo nhịp bước của dáng. */
  get runRate() {
    return this.p.chay.nhip;
  }

  /** Góc chỉnh cục bộ (độ, YXZ) đổi theo quy ước VRM0 nếu cần. */
  private dq(x: number, y: number, z: number) {
    _q.setFromEuler(_e.set(x * D, y * D, z * D, "YXZ"));
    if (this.v0) _q.set(-_q.x, _q.y, -_q.z, _q.w);
    return _q;
  }
  /** Xoay thêm trong hệ cục bộ của xương (nhân phải). */
  private post(n: string, x: number, y: number, z: number) {
    const b = this.B[n];
    if (b) b.quaternion.multiply(this.dq(x, y, z));
  }
  /** Xoay thêm trong hệ cha (nhân trái). */
  private pre(n: string, x: number, y: number, z: number) {
    const b = this.B[n];
    if (b) b.quaternion.premultiply(this.dq(x, y, z));
  }

  private saved: THREE.Quaternion[] = [];
  private savedHips = new THREE.Vector3();
  private dirty = false;
  /**
   * Trả xương về giá trị mixer đã ghi. Mixer của three chỉ ghi lại khi giá trị đổi so với lần trước,
   * nên phải gọi trước mixer.update để phần chỉnh không bị cộng dồn qua các khung.
   */
  restore() {
    if (!this.dirty) return;
    Object.values(this.B).forEach((b, i) => b.quaternion.copy(this.saved[i]));
    this.B.hips.position.copy(this.savedHips);
    this.dirty = false;
  }

  apply(dt: number, inp: PoseInput) {
    Object.values(this.B).forEach((b, i) => (this.saved[i] ??= new THREE.Quaternion()).copy(b.quaternion));
    this.savedHips.copy(this.B.hips.position);
    this.dirty = true;
    this.t += dt;
    const k = Math.min(1, dt * 5);
    const tgt = (m: PoseMode) => (inp.mode === m ? 1 : 0);
    this.wRelax += (tgt("relax") - this.wRelax) * k;
    this.wReady += (tgt("ready") - this.wReady) * k;
    this.wMove += (tgt("move") - this.wMove) * Math.min(1, dt * 8);
    this.wAct += (tgt("act") - this.wAct) * Math.min(1, dt * 10);
    this.wStand = Math.max(0, 1 - this.wMove - this.wAct - (inp.mode === "air" ? 1 : 0));
    const { dung, cho, chay, don } = this.p,
      t = this.t,
      wR = this.wRelax * this.wStand,
      wC = this.wReady * this.wStand,
      hips = this.B.hips;
    const sg = this.v0 ? -1 : 1;

    // Chạy: phóng biên độ sải và độ nảy quanh tư thế gốc.
    if (this.wMove > 0.01) {
      const a = 1 + (chay.bien - 1) * this.wMove;
      for (const n of ["leftUpperLeg", "rightUpperLeg", "leftLowerLeg", "rightLowerLeg"]) {
        const b = this.B[n];
        if (b) b.quaternion.copy(_q.identity().slerp(b.quaternion, a));
      }
      const dy = hips.position.y - this.restHips.y;
      hips.position.y = this.restHips.y + dy * (1 + (chay.nay - 1) * this.wMove);
      if (inp.freeL) this.post("leftUpperArm", 0, 0, chay.mo * this.wMove);
      if (inp.freeR) this.post("rightUpperArm", 0, 0, -chay.mo * this.wMove);
    }
    // Ra đòn: dáng nặng hạ hông sâu hơn, xoay thân rộng hơn.
    if (this.wAct > 0.01) {
      const a = 1 + (don.nang - 0.5) * 0.3 * this.wAct;
      for (const n of ["spine", "chest", "upperChest"]) {
        const b = this.B[n];
        if (b) b.quaternion.copy(_q.identity().slerp(b.quaternion, a));
      }
      const dy = hips.position.y - this.restHips.y;
      if (dy < 0) hips.position.y = this.restHips.y + dy * (1 + (don.nang - 0.5) * 0.4 * this.wAct);
    }

    if (this.wStand > 0.01) {
      // Ghi lại cổ chân trước khi đổi hông để IK giữ bàn chân (không trượt chân).
      const ank = (["l", "r"] as const).map((s) => {
        const L = this.legs[s];
        hips.updateMatrixWorld(true);
        const p = L.c.getWorldPosition(new THREE.Vector3()),
          q = L.c.getWorldQuaternion(new THREE.Quaternion()),
          knee = L.b.getWorldPosition(new THREE.Vector3()).sub(L.a.getWorldPosition(_w)).normalize();
        return { p, q, knee };
      });
      const rq = this.root.getWorldQuaternion(new THREE.Quaternion());
      const scale = this.root.getWorldScale(_v).x || 1;
      const H = this.hipsH * scale;
      const side = new THREE.Vector3(1, 0, 0).applyQuaternion(rq);
      // Thở + dồn trọng tâm (ngoài trận), nhún (trong trận).
      const br = Math.sin(t * Math.PI * 2 * dung.tho.nhip),
        sh = Math.sin(t * Math.PI * 2 * dung.doiTrong.nhip),
        bo = Math.sin(t * Math.PI * 2 * cho.nhipNhun);
      const hy = -cho.ha * wC - cho.nhun * (0.5 + 0.5 * bo) * wC - 0.002 * Math.abs(sh) * wR;
      hips.position.y += (hy * H) / scale;
      hips.position.addScaledVector(new THREE.Vector3(sg, 0, 0), 0.008 * dung.doiTrong.bien * sh * wR * this.hipsH);
      this.pre("hips", 0, 0, (dung.hong + 1.2 * dung.doiTrong.bien * sh) * wR);
      this.post("spine", dung.lung * wR + cho.cui * 0.6 * wC, 0, -dung.hong * 0.6 * wR);
      this.post(
        "upperChest",
        -dung.tho.bien * (0.5 + 0.5 * br) * (wR + wC * 0.6) + cho.cui * 0.4 * wC,
        0,
        -dung.vai * wR,
      );
      this.post("head", dung.dauCui * wR - cho.cui * 0.5 * wC, 0, dung.dau * wR * (0.7 + 0.3 * Math.sin(t * 0.37)));
      const sb = 0.8 * dung.tho.bien * (0.5 + 0.5 * br) * (wR + wC * 0.6);
      this.post("leftShoulder", 0, dung.moVai * wR, sb);
      this.post("rightShoulder", 0, -dung.moVai * wR, -sb);
      // Tay đung đưa nhẹ (dáng trẻ em): cùng nhịp, như đang chờ chơi.
      const sw = dung.tay.dua * Math.sin(t * Math.PI * 2 * dung.doiTrong.nhip * 2) * wR;
      if (sw) {
        if (inp.freeL) this.pre("leftUpperArm", -sw, 0, 0);
        if (inp.freeR) this.pre("rightUpperArm", -sw * 0.8, 0, 0);
      }
      // Tay rảnh: dang tay, gập khuỷu; dáng khép tay trước người.
      if (inp.freeL) {
        this.post("leftUpperArm", 0, 0, dung.tay.mo * wR);
        this.post("leftLowerArm", 0, -dung.tay.gap * wR, 0);
      }
      if (inp.freeR) {
        this.post("rightUpperArm", 0, 0, -dung.tay.mo * wR);
        this.post("rightLowerArm", 0, dung.tay.gap * wR, 0);
      }
      hips.updateMatrixWorld(true);
      // Chân: nới/khép theo dáng, bám mặt đất.
      const g0 = this.ground ? this.ground(...this.xz(this.root)) : 0;
      const dys: number[] = [];
      for (const [i, s] of (["l", "r"] as const).entries()) {
        const a = ank[i];
        const w = (dung.chan * wR + cho.chan * wC) * (s === "l" ? 1 : -1) * H;
        a.p.addScaledVector(side, w);
        let dy = 0;
        if (this.ground) dy = THREE.MathUtils.clamp(this.ground(a.p.x, a.p.z) - g0, -0.3 * H, 0.3 * H) * this.wStand;
        dys.push(dy);
      }
      const drop = Math.min(0, ...dys);
      if (drop < 0) hips.position.y += drop / scale;
      hips.updateMatrixWorld(true);
      for (const [i, s] of (["l", "r"] as const).entries()) {
        const a = ank[i];
        a.p.y += dys[i];
        solveLimb(this.legs[s], a.p, a.knee.lengthSq() > 0 ? this.kneePole(a.knee, rq) : side, a.q);
      }
      if (dung.tay.truoc > 0 && wR > 0.01 && inp.freeL && inp.freeR) this.handsFront(dung.tay.truoc * wR, rq, H);
    }
  }

  private xz(o: THREE.Object3D): [number, number] {
    o.getWorldPosition(_v);
    return [_v.x, _v.z];
  }
  private kneePole(dir: THREE.Vector3, rq: THREE.Quaternion) {
    // Đầu gối hướng trước mặt (theo thân), hơi theo hướng gối hiện tại.
    return new THREE.Vector3(0, 0, 1).applyQuaternion(rq).addScaledVector(dir, 0.1);
  }
  /** Hai tay khép nhẹ trước bụng (trái đặt lên phải), trang nhã. */
  private handsFront(w: number, rq: THREE.Quaternion, H: number) {
    const hips = this.B.hips.getWorldPosition(new THREE.Vector3());
    const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(rq),
      side = new THREE.Vector3(1, 0, 0).applyQuaternion(rq),
      up = new THREE.Vector3(0, 1, 0);
    for (const s of ["l", "r"] as const) {
      const L = this.arms[s],
        k = s === "l" ? 1 : -1;
      const cur = L.c.getWorldPosition(new THREE.Vector3());
      const tgt = hips
        .clone()
        .addScaledVector(fwd, 0.17 * H)
        .addScaledVector(up, -0.04 * H + (s === "l" ? 0.015 * H : 0))
        .addScaledVector(side, 0.025 * k * H);
      const fing = side.clone().multiplyScalar(-k).addScaledVector(up, -0.8).addScaledVector(fwd, 0.2),
        thumb = up.clone().addScaledVector(fwd, 0.4);
      const f0 = new THREE.Vector3(this.v0 ? -k : k, 0, 0),
        t0 = new THREE.Vector3(0, 0, this.v0 ? -1 : 1);
      const hq = alignQuat(f0, t0, fing, thumb);
      const q = L.c.getWorldQuaternion(new THREE.Quaternion()).slerp(hq, w);
      solveLimb(
        L,
        cur.lerp(tgt, w),
        side
          .clone()
          .multiplyScalar(k * 0.4)
          .addScaledVector(fwd, -1),
        q,
      );
    }
  }
}
