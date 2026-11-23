/** Tay không ngoài trận (vũ khí đã cất và tan biến) và động tác cất vũ khí. */
import type { ClipDef, Spec } from "../pose";
import { P, STAND, FIST, LOOSE, handDown } from "./base";
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

export const UNARMED: Record<string, ClipDef> = {
  relax: idleLoop(RELAX),
  stowBackR: stowBack(-1),
  stowBackL: stowBack(1),
  stowHip,
};
