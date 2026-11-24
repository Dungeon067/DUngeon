/**
 * Clip dùng chung mọi vũ khí, tự dựng (thay clip UAL Roll / Jump / Hit / Death bị nhào, gập người):
 * lướt (mặt đất, trên không), nhảy (lên, trên không, đáp), trúng đòn, ngã. Thân trên luôn thẳng,
 * đổ người chỉ từ hông, cổ và đầu bù để mắt nhìn ngang.
 */
import type { ClipDef, Hand, Spec } from "../pose";
import { P, STAND, LOOSE, OPEN, handDown, foot, ANKLE_Y } from "./base";

const B = STAND.b;
/** Thân trên thẳng khi hông đổ `lean` độ: lưng không gập, cổ / đầu bù ngược. */
const upright = (lean: number) => ({
  ...B,
  spine: [0, 0, 0] as [number, number, number],
  chest: [-1, 0, 0] as [number, number, number],
  upperChest: [-2, 0, 0] as [number, number, number],
  neck: [-lean * 0.35, 0, 0] as [number, number, number],
  head: [-lean * 0.45, 0, 0] as [number, number, number],
});
/** Tay vung ra sau thân, thả lỏng (lao tới trước). k: 1 trái, −1 phải; back: độ đưa ra sau. */
const handBack = (k: 1 | -1, back = 0.26, up = 0.06): Hand => ({
  p: [k * 0.2, up, -back],
  fing: [k * 0.1, -0.7, -0.7],
  thumb: [0, 0, 1],
  elbow: [k * 0.3, 0.3, -1],
});

/** Lướt mặt đất ≈ 0,3 giây: lấy đà 1–2 khung rồi lao, chân sải như chạy nhanh, kết ở sải chạy để nối thẳng vào chạy. */
const dash: ClipDef = (() => {
  const load = P(STAND, {
    hp: [0, -0.06, -0.02],
    hr: [6, 0, 0],
    b: upright(6),
    fl: foot(0.085, 0.04, 5),
    fr: foot(-0.085, -0.12, -6, ANKLE_Y + 0.02, 18),
    lh: handBack(1, 0.08, 0.0),
    rh: handBack(-1, 0.08, 0.0),
  });
  const lunge = P(STAND, {
    hp: [0, -0.05, 0.06],
    hr: [13, 0, 0],
    b: upright(13),
    fl: { p: [0.08, -0.79, 0.34], r: [-8, 4, 0], knee: [0, -0.2, 1] },
    fr: { p: [-0.08, -0.7, -0.44], r: [55, -5, 0], knee: [0, -0.6, 0.6], toe: 25 },
    lh: handBack(1),
    rh: handBack(-1, 0.3, 0.08),
    gl: LOOSE,
    gr: LOOSE,
  });
  const glide = P(lunge, {
    hp: [0, -0.04, 0.06],
    fl: { p: [0.08, -0.8, 0.3], r: [-4, 4, 0] },
    fr: { p: [-0.08, -0.72, -0.4], r: [50, -5, 0], toe: 20 },
  });
  const stride = P(STAND, {
    hp: [0, -0.045, 0.03],
    hr: [12, 0, 0],
    b: upright(12),
    fl: { p: [0.08, -0.84, 0.2], r: [-6, 4, 0] },
    fr: { p: [-0.08, -0.74, -0.32], r: [40, -5, 0], toe: 15 },
    lh: handBack(1, 0.16, 0.04),
    rh: { p: [-0.18, 0.12, 0.12], fing: [-0.1, -0.6, 0.6], thumb: [0, 0, 1], elbow: [-0.3, 0, -1] },
  });
  return {
    dur: 0.3,
    keys: [
      { t: 0, s: load },
      { t: 0.2, s: lunge, ease: "out" },
      { t: 0.7, s: glide, ease: "inout" },
      { t: 1, s: stride, ease: "inout" },
    ],
  };
})();

/** Lướt trên không: thân thẳng, tay chân thu gọn, tay ra sau. */
const dashAir: ClipDef = (() => {
  const tuck = P(STAND, {
    hp: [0, 0, 0],
    hr: [9, 0, 0],
    b: upright(9),
    fl: { p: [0.08, -0.64, 0.12], r: [20, 4, 0], knee: [0, 0, 1] },
    fr: { p: [-0.08, -0.6, -0.2], r: [45, -4, 0], knee: [0, -0.3, 1], toe: 15 },
    lh: handBack(1, 0.22, 0.1),
    rh: handBack(-1, 0.22, 0.1),
  });
  return {
    dur: 0.3,
    keys: [
      { t: 0, s: P(tuck, { hr: [4, 0, 0], lh: handBack(1, 0.06, 0.04), rh: handBack(-1, 0.06, 0.04) }) },
      { t: 0.25, s: tuck, ease: "out" },
      { t: 1, s: P(tuck, { hr: [6, 0, 0] }), ease: "inout" },
    ],
  };
})();

/** Bay trên không: chân hơi co (một gối cao hơn), tay mở nhẹ giữ thăng bằng. */
const AIR = P(STAND, {
  hp: [0, 0, 0],
  hr: [3, 0, 0],
  b: upright(3),
  fl: { p: [0.09, -0.72, 0.1], r: [22, 5, 0], knee: [0, 0, 1] },
  fr: { p: [-0.08, -0.8, -0.06], r: [35, -5, 0], toe: 10 },
  lh: handDown(1, 0.27, 0.04, 0.04),
  rh: handDown(-1, 0.27, 0.04, 0.04),
  gl: OPEN,
  gr: OPEN,
});

/** Nhảy lên: nhún rất ngắn rồi bật, một gối nhấc, tay đưa lên trước. */
const jumpUp: ClipDef = (() => {
  const crouch = P(STAND, {
    hp: [0, -0.08, 0],
    hr: [8, 0, 0],
    b: upright(8),
    lh: handBack(1, 0.12, -0.02),
    rh: handBack(-1, 0.12, -0.02),
  });
  const push = P(STAND, {
    hp: [0, 0.01, 0.01],
    hr: [3, 0, 0],
    b: upright(3),
    fl: { p: [0.09, -0.64, 0.16], r: [15, 5, 0], knee: [0, 0, 1] },
    fr: { p: [-0.08, -0.88, -0.08], r: [40, -5, 0], toe: 10 },
    lh: { p: [0.2, 0.22, 0.16], fing: [0.1, -0.3, 0.9], thumb: [0, 1, 0.2], elbow: [0.4, -0.6, -0.6] },
    rh: { p: [-0.2, 0.2, 0.14], fing: [-0.1, -0.3, 0.9], thumb: [0, 1, 0.2], elbow: [-0.4, -0.6, -0.6] },
    gl: OPEN,
    gr: OPEN,
  });
  return {
    dur: 0.5,
    keys: [
      { t: 0, s: STAND },
      { t: 0.16, s: crouch, ease: "out" },
      { t: 0.5, s: push, ease: "out" },
      { t: 1, s: AIR, ease: "inout" },
    ],
  };
})();

const jumpAir: ClipDef = {
  dur: 1.2,
  loop: true,
  keys: [
    { t: 0, s: AIR },
    { t: 0.5, s: P(AIR, { lh: handDown(1, 0.29, 0.07, 0.05), rh: handDown(-1, 0.29, 0.07, 0.05) }) },
    { t: 1, s: AIR },
  ],
};

/** Đáp: gối khuỵu đỡ lực, thân thẳng, tay mở giữ thăng bằng, rồi đứng lên. */
const jumpLand: ClipDef = (() => {
  const hit = P(STAND, {
    hp: [0, -0.11, 0],
    hr: [10, 0, 0],
    b: upright(10),
    fl: foot(0.1, 0.04, 8),
    fr: foot(-0.1, -0.06, -8),
    lh: handDown(1, 0.28, 0.06, 0.1),
    rh: handDown(-1, 0.28, 0.06, 0.1),
    gl: OPEN,
    gr: OPEN,
  });
  return {
    dur: 0.45,
    keys: [
      { t: 0, s: P(hit, { hp: [0, -0.05, 0] }) },
      { t: 0.3, s: hit, ease: "out" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Trúng đòn: giật lùi nhẹ nửa bước, thân hơi ngả ra sau, tay co lên che. */
const hurt: ClipDef = (() => {
  const hit = P(STAND, {
    hp: [0, -0.04, -0.04],
    hr: [-5, 0, 3],
    b: { ...B, spine: [-3, 0, 0], chest: [-2, 0, 0], upperChest: [-1, 0, 0], neck: [2, 0, 0], head: [4, 0, -4] },
    fl: foot(0.085, -0.02, 7),
    fr: foot(-0.085, -0.16, -8),
    lh: { p: [0.2, 0.18, 0.14], fing: [0, 0.3, 1], thumb: [-0.3, 1, 0], elbow: [0.5, -1, 0] },
    rh: handDown(-1, 0.24, 0.02, 0.04),
    gl: OPEN,
  });
  return {
    dur: 0.4,
    keys: [
      { t: 0, s: STAND },
      { t: 0.25, s: hit, ease: "out" },
      { t: 1, s: STAND, ease: "inout" },
    ],
  };
})();

/** Ngã (hết máu): loạng choạng, khuỵu gối xuống quỳ rồi ngồi sụp, đầu cúi, tay buông. Không ngã ngửa, không lăn. */
const die: ClipDef = (() => {
  const stagger = P(STAND, {
    hp: [0, -0.04, -0.03],
    hr: [-4, 0, 3],
    b: { ...B, head: [6, 0, -3] },
    fr: foot(-0.085, -0.14, -8),
    lh: handDown(1, 0.22, 0.0, 0.06),
    rh: handDown(-1, 0.22, 0.0, 0.06),
  });
  const kneel = P(STAND, {
    hp: [0, -0.42, -0.06],
    hr: [6, 0, 0],
    b: { ...B, spine: [4, 0, 0], head: [12, 0, 0] },
    fl: { p: [0.1, ANKLE_Y + 0.05, -0.38], r: [75, 4, 0], knee: [0, -0.4, 1] },
    fr: { p: [-0.1, ANKLE_Y + 0.05, -0.38], r: [75, -4, 0], knee: [0, -0.4, 1] },
    lh: handDown(1, 0.2, -0.05, 0.12),
    rh: handDown(-1, 0.2, -0.05, 0.12),
  });
  const slump = P(kneel, {
    hp: [0.04, -0.56, -0.12],
    hr: [10, 0, 8],
    b: { ...B, spine: [6, 0, 4], chest: [4, 0, 3], neck: [6, 0, 0], head: [16, 0, 8] },
    lh: handDown(1, 0.26, -0.3, 0.12),
    rh: handDown(-1, 0.18, -0.3, 0.1),
    gl: LOOSE,
    gr: LOOSE,
  });
  return {
    dur: 2.4,
    keys: [
      { t: 0, s: STAND },
      { t: 0.1, s: stagger, ease: "out" },
      { t: 0.3, s: kneel, ease: "in" },
      { t: 0.5, s: slump, ease: "out" },
      { t: 1, s: slump },
    ],
  };
})();

export const SHARED_CLIPS: Record<string, ClipDef> = { dash, dashAir, jumpUp, jumpAir, jumpLand, hurt, die };
export type { Spec };
