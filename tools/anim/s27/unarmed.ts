/** Tay không ngoài trận (vũ khí đã cất và tan biến) và động tác cất vũ khí. */
import type { ClipDef, Spec } from "../pose";
import { P, STAND, FIST, LOOSE, OPEN, handDown, foot, ANKLE_Y } from "./base";
import { idleLoop } from "./common";

/** Đứng thả lỏng tay không: lớp dáng (pose-layer) chỉnh độ rộng chân, tay, đầu, thở theo từng dáng. */
export const RELAX: Spec = STAND;

/** Cất ra sau lưng: tay đưa vũ khí qua vai cùng bên rồi buông xuống. k: 1 tay trái, −1 tay phải. */
function stowBack(k: 1 | -1): ClipDef {
  const hand = k === 1 ? "lh" : "rh",
    grip = k === 1 ? "gl" : "gr";
  const lift = P(STAND, {
    b: { ...STAND.b, chest: [1, -6 * k, 0], head: [2, -8 * k, 0] },
    [hand]: { p: [k * 0.2, 0.38, 0.12], fing: [0, 0.4, 1], thumb: [0, 1, -0.4], elbow: [k * 1, -0.2, 0] },
    [grip]: FIST,
  } as any);
  const over = P(STAND, {
    b: { ...STAND.b, chest: [2, -10 * k, 0], head: [3, -12 * k, 0] },
    [hand]: {
      p: [k * 0.13, 0.58, -0.08],
      fing: [0, 0.2, -1],
      thumb: [-k * 0.4, -0.8, -0.3],
      elbow: [k * 0.7, 0.7, 0.2],
    },
    [grip]: FIST,
  } as any);
  const back = P(STAND, { [hand]: handDown(k, 0.19, -0.02, 0), [grip]: LOOSE } as any);
  return {
    dur: 0.7,
    keys: [
      { t: 0, s: P(STAND, { [grip]: FIST } as any) },
      { t: 0.28, s: lift, ease: "out" },
      { t: 0.5, s: over, ease: "inout" },
      { t: 0.56, s: P(over, { [grip]: LOOSE } as any) },
      { t: 0.85, s: back, ease: "inout" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
}

/** Kiếm ngắn: tay phải tra kiếm vào hông trái. */
const stowHip: ClipDef = {
  dur: 0.6,
  keys: [
    { t: 0, s: P(STAND, { gr: FIST }) },
    {
      t: 0.35,
      s: P(STAND, {
        b: { ...STAND.b, spine: [2, 8, 0], chest: [3, 10, 0], head: [8, 6, 0] },
        rh: { p: [0.1, 0.05, 0.16], fing: [0.4, -0.3, 0.8], thumb: [0.2, -0.5, -0.8], elbow: [-1, -0.3, 0] },
        gr: FIST,
      }),
      ease: "out",
    },
    {
      t: 0.55,
      s: P(STAND, {
        b: { ...STAND.b, spine: [2, 8, 0], chest: [3, 10, 0], head: [8, 6, 0] },
        rh: { p: [0.12, -0.02, 0.1], fing: [0.4, -0.3, 0.8], thumb: [0.1, -0.4, -0.9], elbow: [-1, -0.3, 0] },
        gr: LOOSE,
      }),
    },
    { t: 1, s: STAND, ease: "inout" },
  ],
};

const B = STAND.b;

/** Vươn vai: đan tay đưa lên cao, nghiêng nhẹ hai bên rồi buông tay xuống. */
const idleStretch: ClipDef = (() => {
  const up = (dx: number, lean: number): Spec =>
    P(STAND, {
      hp: [dx * 0.3, -0.005, 0],
      b: {
        ...B,
        spine: [-2, 0, lean * 0.4],
        chest: [-3, 0, lean * 0.6],
        upperChest: [-2, 0, lean * 0.3],
        neck: [-4, 0, 0],
        head: [-8, 0, 0],
      },
      lh: { p: [0.035 + dx, 0.98, 0.1], fing: [-1, 0.25, 0], thumb: [0, 0, 1], elbow: [1, 0.2, 0] },
      rh: { p: [-0.035 + dx, 0.98, 0.1], fing: [1, 0.25, 0], thumb: [0, 0, 1], elbow: [-1, 0.2, 0] },
      gl: OPEN,
      gr: OPEN,
      fl: foot(0.085, -0.03, 7, ANKLE_Y, -6),
      fr: foot(-0.085, -0.03, -7, ANKLE_Y, -6),
    });
  const open = P(STAND, {
    lh: { p: [0.5, 0.42, 0.06], fing: [1, 0.1, 0.1], thumb: [0, 0.3, 1], elbow: [0.3, -1, 0] },
    rh: { p: [-0.5, 0.42, 0.06], fing: [-1, 0.1, 0.1], thumb: [0, 0.3, 1], elbow: [-0.3, -1, 0] },
    gl: OPEN,
    gr: OPEN,
  });
  return {
    dur: 3.4,
    keys: [
      { t: 0, s: STAND },
      { t: 0.22, s: up(0, 0), ease: "inout" },
      { t: 0.38, s: up(0.1, -7), ease: "inout" },
      { t: 0.54, s: up(-0.1, 7), ease: "inout" },
      { t: 0.64, s: up(0, 0), ease: "inout" },
      { t: 0.8, s: open, ease: "inout" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Nhìn quanh: quay đầu và ngực sang trái, giữ, rồi sang phải. */
const idleLook: ClipDef = (() => {
  const look = (k: number, dx: number): Spec =>
    P(STAND, {
      hp: [dx, -0.014, 0],
      hr: [0, 4 * k, 0],
      b: { ...B, chest: [2, 8 * k, 0], upperChest: [1, 6 * k, 0], neck: [-4, 18 * k, 0], head: [-1, 24 * k, -3 * k] },
      rh: handDown(-1, 0.17, -0.05, 0.02),
    });
  return {
    dur: 4.2,
    keys: [
      { t: 0, s: STAND },
      { t: 0.18, s: look(1, 0.012), ease: "inout" },
      { t: 0.42, s: look(1.08, 0.014), ease: "inout" },
      { t: 0.6, s: look(-1, -0.012), ease: "inout" },
      { t: 0.82, s: look(-1.08, -0.014), ease: "inout" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Chỉnh tóc: tay phải vén tóc ra sau tai, đầu nghiêng nhẹ theo tay. */
const idleHair: ClipDef = (() => {
  const head = (k: number) => ({
    ...B,
    chest: [2, -3 * k, 0] as [number, number, number],
    neck: [-2, -4 * k, 3 * k] as [number, number, number],
    head: [1, -8 * k, 6 * k] as [number, number, number],
  });
  const reach = P(STAND, {
    b: head(1),
    rh: { p: [-0.15, 0.56, 0.07], fing: [0.25, 0.75, -0.3], thumb: [0.6, 0, 0.6], elbow: [-1, -0.4, 0.5] },
    gr: OPEN,
  });
  const tuck = P(STAND, {
    b: head(1),
    rh: { p: [-0.16, 0.58, -0.04], fing: [0.2, 0.3, -0.9], thumb: [0.5, 0.6, 0.2], elbow: [-1, -0.5, 0.6] },
    gr: LOOSE,
  });
  return {
    dur: 2.8,
    keys: [
      { t: 0, s: STAND },
      { t: 0.3, s: reach, ease: "inout" },
      { t: 0.5, s: tuck, ease: "inout" },
      { t: 0.62, s: P(tuck, { b: head(0.6) }) },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Trẻ em: nhún nhảy hồn nhiên tại chỗ, hai cú nảy nhỏ, tay vung lên vui vẻ. */
const idleHop: ClipDef = (() => {
  const crouch = (yaw = 0): Spec =>
    P(STAND, {
      hp: [0, -0.07, 0.01],
      hr: [6, yaw, 0],
      b: { ...B, spine: [4, 0, 0], head: [-2, 0, 0] },
      lh: { p: [0.2, -0.06, -0.12], fing: [0.1, -1, -0.2], thumb: [0, 0, 1], elbow: [0.3, 0, -1] },
      rh: { p: [-0.2, -0.06, -0.12], fing: [-0.1, -1, -0.2], thumb: [0, 0, 1], elbow: [-0.3, 0, -1] },
    });
  const air = (yaw = 0): Spec =>
    P(STAND, {
      hp: [0, 0.075, 0],
      hr: [-3, yaw, 0],
      b: { ...B, chest: [-3, 0, 0], head: [-6, 0, 0] },
      fl: foot(0.08, -0.02, 7 + yaw, ANKLE_Y + 0.07, 22),
      fr: foot(-0.08, -0.02, -7 + yaw, ANKLE_Y + 0.07, 22),
      lh: { p: [0.34, 0.58, 0.12], fing: [0.4, 1, 0.2], thumb: [0, 0.2, 1], elbow: [1, -0.5, 0] },
      rh: { p: [-0.34, 0.58, 0.12], fing: [-0.4, 1, 0.2], thumb: [0, 0.2, 1], elbow: [-1, -0.5, 0] },
      gl: OPEN,
      gr: OPEN,
    });
  return {
    dur: 2.2,
    keys: [
      { t: 0, s: STAND },
      { t: 0.12, s: crouch(), ease: "inout" },
      { t: 0.24, s: air(), ease: "out" },
      { t: 0.36, s: crouch(), ease: "in" },
      { t: 0.48, s: crouch(10), ease: "inout" },
      { t: 0.6, s: air(16), ease: "out" },
      { t: 0.72, s: crouch(10), ease: "in" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Dừng chạy: một nhịp hãm, chân trái chống trước, ngả người ra sau, tay đưa ra giữ thăng bằng. */
const runStop: ClipDef = (() => {
  const go = P(STAND, {
    hp: [0, -0.03, 0.03],
    hr: [9, 0, 0],
    b: { ...B, spine: [3, 0, 0] },
    fl: foot(0.08, 0.14, 4),
    fr: foot(-0.08, -0.16, -6, ANKLE_Y + 0.03, 25),
    lh: { p: [0.17, 0.02, -0.12], fing: [0.1, -1, -0.3], thumb: [0, 0, 1], elbow: [0.3, 0, -1] },
    rh: { p: [-0.15, 0.08, 0.18], fing: [-0.1, -0.6, 0.6], thumb: [0, 0, 1], elbow: [-0.3, 0, -1] },
  });
  const brake = P(STAND, {
    hp: [0, -0.085, -0.03],
    hr: [-5, 0, 0],
    b: { ...B, spine: [4, 0, 0], chest: [4, 0, 0], head: [-2, 0, 0] },
    fl: { p: [0.085, ANKLE_Y, 0.2], r: [-14, 6, 0] },
    fr: foot(-0.085, -0.1, -10),
    lh: { p: [0.26, 0.1, 0.16], fing: [0.2, -0.6, 0.6], thumb: [0, 0.4, 1], elbow: [0.5, -0.2, -1] },
    rh: { p: [-0.24, 0.06, 0.14], fing: [-0.2, -0.6, 0.6], thumb: [0, 0.4, 1], elbow: [-0.5, -0.2, -1] },
    gl: OPEN,
    gr: OPEN,
  });
  return {
    dur: 0.55,
    keys: [
      { t: 0, s: go },
      { t: 0.28, s: brake, ease: "out" },
      { t: 0.5, s: P(brake, { hp: [0, -0.07, -0.02] }), ease: "inout" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

export const UNARMED: Record<string, ClipDef> = {
  idleStretch,
  idleLook,
  idleHair,
  idleHop,
  runStop,
  relax: idleLoop(RELAX),
  stowBackR: stowBack(-1),
  stowBackL: stowBack(1),
  stowHip,
};
