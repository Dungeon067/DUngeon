/**
 * Bản nữ của đi / chạy / chạy nhanh (walkF, runF, sprintF). Clip gốc có dáng "duyệt binh":
 * tay duỗi thẳng vung cao, chân đá thẳng gối, mũi chân hếch lên, hai bàn chân cách xa nhau.
 * Lớp này giữ nhịp bước của clip gốc và chỉnh lại:
 *  - tay: biên độ vung trước–sau nhỏ lại, khuỷu gập mềm và sát thân, cổ tay thả lỏng;
 *  - chân: sải ngắn hơn, bàn chân đặt gần đường giữa, mũi chân chúc nhẹ khi đưa chân (bớt hếch);
 *  - hông lắc nhẹ theo nhịp (xoay và nghiêng), vai bù ngược để thân trên vẫn thẳng.
 */
import * as THREE from "three";
import type { OverlayDef, Rig } from "../pose";
import { solveLimb } from "../../../src/render3d/toon/ik";
import { rot } from "./polish";

export interface LocoOpt {
  /** Hệ số biên độ vung tay trước–sau (1 = như gốc). */
  arm: number;
  /** Kéo tay về gần thân (0..1): khuỷu gập hơn. */
  tuck: number;
  /** Hệ số độ dài sải chân (trước–sau). */
  stride: number;
  /** Nửa khoảng cách ngang của hai bàn chân (m). */
  halfX: number;
  /** Độ chúc mũi chân khi chân đang đưa (độ). */
  toe: number;
  /** Hệ số độ nhấc chân khi đưa (bớt đá gót ra sau). */
  lift: number;
  /** Hông xoay (yaw) và nghiêng (roll) theo nhịp (độ). */
  sway: number;
  roll: number;
  /** Tay được chỉnh (tay cầm vũ khí giữ nguyên theo clip). */
  free?: "l" | "r" | "both";
  /** Tay không vung cao hơn mức này dưới vai (m, theo trục đứng của hông). */
  cap?: number;
}
const Y = new THREE.Vector3(0, 1, 0);
const v = new THREE.Vector3();

function arms(r: Rig, o: LocoOpt) {
  const hipsQ = r.quat("hips");
  const inv = hipsQ.clone().invert();
  const free = o.free ?? "both";
  for (const [s, sg] of [
    ["l", 1],
    ["r", -1],
  ] as const) {
    if (free !== "both" && free !== s) continue;
    const L = r.arms[s];
    const sh = L.a.getWorldPosition(new THREE.Vector3());
    const hand = L.c.getWorldPosition(new THREE.Vector3());
    const hq = L.c.getWorldQuaternion(new THREE.Quaternion());
    // Độ lệch tay so với vai trong hệ hông: thu biên độ trước–sau, kéo vào sát thân.
    const off = hand.clone().sub(sh).applyQuaternion(inv);
    off.z *= o.arm;
    off.x = THREE.MathUtils.lerp(off.x, sg * 0.06, 0.5);
    off.multiplyScalar(1 - 0.12 * o.tuck);
    // Không đánh tay lên ngang mặt như lính chạy: bàn tay luôn thấp hơn vai.
    off.y = Math.min(off.y, -(o.cap ?? 0.22));
    const t = sh.clone().add(off.applyQuaternion(hipsQ));
    const pole = new THREE.Vector3(sg * 0.35, -0.25, -1).applyQuaternion(hipsQ).normalize();
    solveLimb(L, t, pole, hq);
  }
  r.root.updateMatrixWorld(true);
}

function legs(r: Rig, o: LocoOpt) {
  const fl = r.pos("leftFoot"),
    fr = r.pos("rightFoot");
  const ql = r.quat("leftFoot"),
    qr = r.quat("rightFoot");
  const lo = Math.min(fl.y, fr.y);
  const mid = fl.clone().add(fr).multiplyScalar(0.5);
  const hq = r.quat("hips");
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(hq);
  right.y = 0;
  right.normalize();
  const fwd = new THREE.Vector3().crossVectors(right, Y).negate();
  for (const [s, f, q, sg] of [
    ["l", fl, ql, 1],
    ["r", fr, qr, -1],
  ] as const) {
    const d = f.clone().sub(mid);
    const along = d.dot(fwd) * o.stride;
    const t = mid
      .clone()
      .addScaledVector(fwd, along)
      .addScaledVector(right, sg * o.halfX);
    t.y = lo + (f.y - lo) * o.lift;
    // Chân đang đưa (cao hơn chân trụ): chúc mũi chân, bớt hếch.
    const lift = THREE.MathUtils.clamp((f.y - lo) / 0.08, 0, 1);
    const fq = new THREE.Quaternion().setFromAxisAngle(right, (-o.toe * lift * Math.PI) / 180).multiply(q);
    const pole = fwd
      .clone()
      .addScaledVector(right, sg * 0.12)
      .normalize();
    solveLimb(r.legs[s], t, pole, fq);
  }
  r.root.updateMatrixWorld(true);
  v.set(0, 0, 0);
}

export function femLoco(from: string, o: LocoOpt): OverlayDef {
  return {
    from,
    mod: (r, f) => {
      // Clip vòng = một chu kỳ trái–phải: hông xoay về phía chân đang bước, nghiêng nhẹ về chân trụ.
      const ph = f * Math.PI * 2;
      rot(r, "hips", [0, o.sway * Math.sin(ph), o.roll * Math.cos(ph)]);
      rot(r, "spine", [0, -o.sway * 0.6 * Math.sin(ph), -o.roll * 0.6 * Math.cos(ph)]);
      rot(r, "chest", [0, -o.sway * 0.4 * Math.sin(ph), -o.roll * 0.4 * Math.cos(ph)]);
      legs(r, o);
      arms(r, o);
    },
  };
}

const WALK: LocoOpt = {
  arm: 0.45,
  tuck: 0.6,
  stride: 0.82,
  halfX: 0.035,
  toe: 18,
  lift: 0.6,
  sway: 5,
  roll: 3,
  cap: 0.3,
};
const RUN: LocoOpt = {
  arm: 0.45,
  tuck: 0.5,
  stride: 0.9,
  halfX: 0.05,
  toe: 10,
  lift: 0.8,
  sway: 4,
  roll: 2,
  cap: 0.24,
};
const SPRINT: LocoOpt = {
  arm: 0.55,
  tuck: 0.4,
  stride: 0.95,
  halfX: 0.06,
  toe: 6,
  lift: 0.9,
  sway: 3,
  roll: 1.5,
  cap: 0.2,
};
/** Cầm vũ khí khi di chuyển: chỉ chỉnh tay rảnh (kiếm / đại kiếm / thương cầm tay phải, cung cầm tay trái). */
const armedSet = (p: string, free: "l" | "r") =>
  Object.fromEntries(
    (
      [
        ["Walk", WALK],
        ["Run", RUN],
        ["Sprint", SPRINT],
      ] as const
    ).map(([n, o]) => [`${p}${n}F`, femLoco(`${p}${n}`, { ...o, free })]),
  ) as Record<string, OverlayDef>;

export const FEM_LOCO: Record<string, OverlayDef> = {
  walkF: femLoco("walk", WALK),
  runF: femLoco("run", RUN),
  sprintF: femLoco("sprint", SPRINT),
  ...armedSet("sw", "l"),
  ...armedSet("gr", "l"),
  ...armedSet("sp", "l"),
  ...armedSet("bow", "r"),
};
