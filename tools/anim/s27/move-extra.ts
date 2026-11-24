/**
 * Clip di chuyển bổ sung cho máy trạng thái hợp nhất A (content/movement.yaml → clip.*.can):
 * walkStop (dừng sau đi bộ), sprintStop (phanh gấp sau chạy nhanh), landRoll (đáp lăn khi đang chạy),
 * landHard (đáp nặng từ trên cao). Tự dựng bằng khung hình chính; đơn vị H = chiều cao hông, gốc ở hông khi đứng,
 * mặt đất ≈ −0,95; +z phía trước, +x bên trái.
 */
import type { ClipDef, Hand, Spec, V3 } from "../pose";
import { P, STAND, OPEN, LOOSE, handDown, foot, ANKLE_Y } from "./base";

const B = STAND.b;
/** Thân trên thẳng khi hông đổ `lean` độ: cổ / đầu bù để mắt nhìn ngang. */
const upright = (lean: number, extra: Partial<Record<string, V3>> = {}) => ({
  ...B,
  spine: [0, 0, 0] as V3,
  chest: [-1, 0, 0] as V3,
  upperChest: [-2, 0, 0] as V3,
  neck: [-lean * 0.35, 0, 0] as V3,
  head: [-lean * 0.45, 0, 0] as V3,
  ...extra,
});
/** Tay đưa ra giữ thăng bằng. k: 1 trái, −1 phải. */
const armOut = (k: 1 | -1, out: number, y: number, z: number): Hand => ({
  p: [k * out, y, z],
  fing: [k * 0.3, -0.5, 0.6],
  thumb: [0, 0.4, 1],
  elbow: [k * 0.5, -0.2, -1],
});

/** Dừng sau đi bộ ≈ 0,4 s: nửa bước khép chân, hông hạ nhẹ rồi đứng yên, tay buông về. */
const walkStop: ClipDef = (() => {
  const step = P(STAND, {
    hp: [0, -0.02, 0.02],
    hr: [3, 0, 0],
    fl: foot(0.08, 0.1, 5),
    fr: foot(-0.08, -0.12, -6, ANKLE_Y + 0.02, 15),
    lh: handDown(1, 0.18, -0.03, -0.08),
    rh: handDown(-1, 0.18, -0.03, 0.1),
  });
  const settle = P(STAND, {
    hp: [0, -0.04, 0],
    hr: [-1.5, 0, 0],
    fl: foot(0.085, 0.0, 6),
    fr: foot(-0.085, -0.04, -7),
    lh: handDown(1, 0.18, -0.05, 0.04),
    rh: handDown(-1, 0.18, -0.05, -0.01),
  });
  return {
    dur: 0.42,
    keys: [
      { t: 0, s: step },
      { t: 0.4, s: settle, ease: "out" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Phanh gấp sau chạy nhanh ≈ 0,8 s: chân trái trượt chống xa phía trước, hông hạ sâu, ngả sau,
 *  hai tay vung ra trước giữ thăng bằng; rồi chân phải bước lên một nhịp và đứng dậy. */
const sprintStop: ClipDef = (() => {
  const go = P(STAND, {
    hp: [0, -0.05, 0.06],
    hr: [14, 0, 0],
    b: upright(14),
    fl: foot(0.07, 0.24, 3),
    fr: foot(-0.07, -0.26, -5, ANKLE_Y + 0.06, 35),
    lh: { p: [0.18, 0.05, -0.2], fing: [0.1, -0.8, -0.5], thumb: [0, 0, 1], elbow: [0.3, 0.3, -1] },
    rh: { p: [-0.16, 0.12, 0.22], fing: [-0.1, -0.5, 0.7], thumb: [0, 0, 1], elbow: [-0.3, 0, -1] },
  });
  const brake = P(STAND, {
    hp: [0, -0.2, -0.08],
    hr: [-9, 0, 2],
    b: upright(-9, { spine: [6, 0, 0], chest: [6, 0, 0] }),
    fl: { p: [0.1, ANKLE_Y + 0.02, 0.4], r: [-20, 8, 0] },
    fr: { p: [-0.09, ANKLE_Y, -0.2], r: [0, -12, 0], knee: [-0.2, 0, 1] },
    lh: armOut(1, 0.3, 0.12, 0.26),
    rh: armOut(-1, 0.28, 0.02, 0.18),
    gl: OPEN,
    gr: OPEN,
  });
  const absorb = P(brake, {
    hp: [0, -0.24, -0.02],
    hr: [-3, 0, 1],
    b: upright(-3, { spine: [8, 0, 0], chest: [6, 0, 0] }),
    lh: armOut(1, 0.27, 0.05, 0.22),
    rh: armOut(-1, 0.25, -0.02, 0.16),
  });
  const recover = P(STAND, {
    hp: [0, -0.07, 0.02],
    hr: [3, 0, 0],
    fl: foot(0.085, 0.18, 6),
    fr: foot(-0.085, 0.06, -6, ANKLE_Y + 0.03, 10),
    lh: handDown(1, 0.2, -0.02, 0.06),
    rh: handDown(-1, 0.2, -0.02, 0.0),
    gl: LOOSE,
    gr: LOOSE,
  });
  return {
    dur: 0.8,
    keys: [
      { t: 0, s: go },
      { t: 0.22, s: brake, ease: "out" },
      { t: 0.45, s: absorb, ease: "inout" },
      { t: 0.7, s: recover, ease: "inout" },
      { t: 1, s: P(STAND, { fl: foot(0.085, 0.15, 7), fr: foot(-0.085, 0.12, -7) }), ease: "inout" },
    ],
  };
})();

/** Đáp nặng từ trên cao ≈ 0,9 s: khuỵu sâu ba điểm (gối phải gần chạm đất, tay phải chống đất),
 *  đầu ngẩng nhìn trước, giữ một nhịp rồi đứng lên. */
const landHard: ClipDef = (() => {
  const touch = P(STAND, {
    hp: [0, -0.08, 0],
    hr: [6, 0, 0],
    b: upright(6),
    fl: foot(0.11, 0.06, 8),
    fr: foot(-0.11, -0.05, -8),
    lh: armOut(1, 0.26, 0.15, 0.08),
    rh: armOut(-1, 0.26, 0.15, 0.08),
    gl: OPEN,
    gr: OPEN,
  });
  const crouch = P(STAND, {
    hp: [0.02, -0.46, 0.0],
    hr: [24, 0, -4],
    b: upright(24, { spine: [6, 0, 0], chest: [4, 0, 0] }),
    fl: { p: [0.16, ANKLE_Y, 0.22], r: [0, 14, 0], knee: [0.3, 0.2, 1] },
    fr: { p: [-0.13, ANKLE_Y + 0.04, -0.3], r: [40, -10, 0], knee: [-0.1, -0.6, 1], toe: 35 },
    lh: { p: [0.3, -0.32, 0.12], fing: [0.4, -0.3, 0.6], thumb: [0, 0.5, 1], elbow: [0.8, 0, -0.6] },
    rh: { p: [-0.2, -0.86, 0.3], fing: [-0.1, -0.2, 1], thumb: [0.6, 0, 0.3], elbow: [-0.6, 0.2, -1] },
    gl: OPEN,
    gr: { c: 0.2, t: 0.2, s: 14 },
  });
  const hold = P(crouch, { hp: [0.02, -0.43, 0.0], hr: [20, 0, -3] });
  const rise = P(STAND, {
    hp: [0, -0.14, 0.02],
    hr: [8, 0, 0],
    b: upright(8),
    fl: foot(0.1, 0.12, 8),
    fr: foot(-0.1, -0.12, -8, ANKLE_Y + 0.02, 12),
    lh: handDown(1, 0.22, -0.02, 0.06),
    rh: handDown(-1, 0.22, -0.02, 0.04),
    gl: LOOSE,
    gr: LOOSE,
  });
  return {
    dur: 0.9,
    keys: [
      { t: 0, s: touch },
      { t: 0.12, s: crouch, ease: "out" },
      { t: 0.45, s: hold, ease: "inout" },
      { t: 0.75, s: rise, ease: "inout" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Đáp lăn khi đang chạy ≈ 0,75 s: chạm đất khuỵu, cuộn người lăn tròn một vòng về phía trước, bật dậy vào sải chạy.
 *  Hông quay quanh trục ngang; chân / tay bó gối được tính theo góc lăn để luôn bám thân. */
const landRoll: ClipDef = (() => {
  const C = -0.55; // tâm khối cuộn tròn (hông) khi lăn
  const rot = (v: V3, deg: number, cy: number, cz: number): V3 => {
    const a = (deg * Math.PI) / 180,
      c = Math.cos(a),
      s = Math.sin(a);
    return [v[0], cy + v[1] * c - v[2] * s, cz + v[1] * s + v[2] * c];
  };
  const curl = {
    spine: [28, 0, 0] as V3,
    chest: [22, 0, 0] as V3,
    upperChest: [12, 0, 0] as V3,
    neck: [18, 0, 0] as V3,
    head: [20, 0, 0] as V3,
  };
  const ball = (deg: number, z: number): Spec => {
    const r = (deg * Math.PI) / 180;
    return P(STAND, {
      hp: [0, C, z],
      hr: [deg, 0, 0],
      b: { ...B, ...curl },
      fl: { p: rot([0.1, -0.36, 0.14], deg, C, z), r: [deg + 40, 0, 0], knee: [0.1, Math.sin(r), Math.cos(r)] },
      fr: { p: rot([-0.1, -0.36, 0.14], deg, C, z), r: [deg + 40, 0, 0], knee: [-0.1, Math.sin(r), Math.cos(r)] },
      lh: { p: rot([0.17, -0.18, 0.3], deg, C, z), fing: [0.2, -0.6, 0.4], thumb: [0, 0.3, 1], elbow: [0.6, 0, -0.6] },
      rh: {
        p: rot([-0.17, -0.18, 0.3], deg, C, z),
        fing: [-0.2, -0.6, 0.4],
        thumb: [0, 0.3, 1],
        elbow: [-0.6, 0, -0.6],
      },
      gl: LOOSE,
      gr: LOOSE,
    });
  };
  const impact = P(STAND, {
    hp: [0, -0.3, 0.05],
    hr: [30, 0, 0],
    b: { ...B, spine: [12, 0, 0], chest: [8, 0, 0], head: [-6, 0, 0] },
    fl: foot(0.1, 0.12, 4),
    fr: foot(-0.1, -0.06, -4, ANKLE_Y + 0.02, 15),
    lh: armOut(1, 0.24, -0.25, 0.32),
    rh: armOut(-1, 0.24, -0.25, 0.32),
    gl: OPEN,
    gr: OPEN,
  });
  const out = P(STAND, {
    hp: [0, -0.08, 0.06],
    hr: [12, 0, 0],
    b: upright(12),
    fl: foot(0.07, 0.2, 3),
    fr: foot(-0.07, -0.2, -5, ANKLE_Y + 0.05, 30),
    lh: { p: [0.18, 0.05, -0.18], fing: [0.1, -0.8, -0.5], thumb: [0, 0, 1], elbow: [0.3, 0.3, -1] },
    rh: { p: [-0.16, 0.1, 0.2], fing: [-0.1, -0.5, 0.7], thumb: [0, 0, 1], elbow: [-0.3, 0, -1] },
    gl: LOOSE,
    gr: LOOSE,
  });
  return {
    dur: 0.75,
    keys: [
      { t: 0, s: P(impact, { hp: [0, -0.12, 0], hr: [12, 0, 0] }) },
      { t: 0.12, s: impact, ease: "out" },
      { t: 0.25, s: ball(80, 0.1), ease: "lin" },
      { t: 0.4, s: ball(170, 0.2), ease: "lin" },
      { t: 0.55, s: ball(260, 0.3), ease: "lin" },
      { t: 0.7, s: ball(345, 0.36), ease: "out" },
      { t: 0.85, s: P(out, { hp: [0, -0.22, 0.04], hr: [18, 0, 0] }), ease: "inout" },
      { t: 1, s: out, ease: "inout" },
    ],
  };
})();

export const MOVE_EXTRA: Record<string, ClipDef> = { walkStop, sprintStop, landRoll, landHard };
