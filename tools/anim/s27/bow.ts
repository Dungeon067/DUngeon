/**
 * Cung: tay trái cầm giữa cung, cung dựng đứng hơi nghiêng; tay phải kéo dây về cạnh cằm, khuỷu phải ngang vai,
 * đầu nhìn theo mũi tên, vai trái hướng mục tiêu (+Z). Ngoài trận cung hạ xuống cạnh người.
 * Thời lượng clip chỉ là tỉ lệ: renderer co giãn theo cửa sổ đòn (ACT_WIN), mũi tên bay ngay lúc bấm nên
 * thả dây đặt sớm (≈ 15% clip).
 */
import type { ClipDef, OverlayDef, Spec, Hand } from "../pose";
import { P, STAND, FIST, OPEN, foot } from "./base";
import { idleLoop, readyLoop, carry, add } from "./common";

const HOOK = { c: 0.45, t: 0.5, ci: 0.75, cm: 0.75 };
const LET = { c: 0.15, t: 0.25, ci: 0.1, cm: 0.1, s: 6 };

const LH_DOWN: Hand = { p: [0.2, -0.04, 0.06], fing: [0.2, -0.5, 0.9], thumb: [0, 1, 0.3], elbow: [0.3, 0, -1] };
/** Ngoài trận: cung hạ cạnh người, tay phải buông tự nhiên. */
export const BOW_RELAX: Spec = P(STAND, { lh: LH_DOWN, gl: FIST });

/** Trong trận: nghiêng người, cung chéo trước bụng, tay phải đặt hờ ở dây. */
export const BOW_READY: Spec = P(STAND, {
  hp: [0, -0.04, 0],
  hr: [0, -32, 0],
  b: { spine: [2, -6, 0], chest: [3, -6, 0], upperChest: [1, 0, 0], neck: [0, 18, 0], head: [4, 24, 0] },
  fl: foot(0.07, 0.12, -22),
  fr: foot(-0.1, -0.1, -48),
  lh: { p: [0.14, 0.1, 0.36], fing: [-0.35, -0.25, 1], thumb: [0.75, 0.65, 0.1], elbow: [1, -0.6, 0] },
  rh: { p: [0.0, 0.08, 0.2], fing: [0.5, 0, 1], thumb: [0, 1, 0.2], elbow: [-0.6, -0.7, -0.4] },
  gl: FIST,
  gr: HOOK,
});

/** Đầy dây: vai trái về mục tiêu, tay phải neo cạnh cằm, khuỷu phải ngang vai. */
export const BOW_DRAW: Spec = P(STAND, {
  hp: [0, -0.03, 0],
  hr: [0, -62, 0],
  b: { spine: [0, -8, 0], chest: [0, -10, -2], upperChest: [0, -4, -2], neck: [0, 36, 0], head: [6, 44, 6] },
  fl: foot(0.02, 0.17, -62),
  fr: foot(-0.03, -0.17, -78),
  lh: { p: [0.04, 0.42, 0.58], fing: [-0.15, 0, 1], thumb: [0.15, 1, 0], elbow: [1, -0.4, 0] },
  rh: { p: [-0.03, 0.45, 0.0], fing: [0.35, 0, 1], thumb: [0, 1, 0], elbow: [-0.2, 0.15, -1] },
  gl: FIST,
  gr: HOOK,
});
const HALF = P(BOW_DRAW, { rh: { p: [0.0, 0.42, 0.25] }, hr: [0, -55, 0] });
/** Vừa thả: tay phải bật ra sau dọc má, ngón mở; tay cung giữ hướng. */
const LOOSE_S = P(BOW_DRAW, { rh: { p: [-0.1, 0.46, -0.12], fing: [0.2, 0.2, 1] }, gr: LET, lh: { p: [0.04, 0.41, 0.6] } });

/** Bắn nhanh: rút – neo – thả – giữ dáng – về thế chờ. v: biến thể thân. */
function shot(v: { lean: number; yaw: number; strong?: boolean }): ClipDef {
  const tw = (s: Spec): Spec =>
    P(s, {
      hr: add(s.hr, [0, v.yaw, 0]),
      b: { ...s.b, spine: add(s.b.spine, [v.lean, 0, 0]) },
      hp: add(s.hp, [0, v.strong ? -0.02 : 0, 0]),
    });
  const follow = v.strong
    ? P(tw(LOOSE_S), { hp: [0, -0.06, -0.05], rh: { p: [-0.16, 0.44, -0.2] }, b: { chest: [-4, -10, -2] } })
    : tw(LOOSE_S);
  return {
    dur: v.strong ? 0.9 : 0.7,
    keys: [
      { t: 0, s: BOW_READY },
      { t: 0.06, s: tw(HALF), ease: "out" },
      { t: 0.12, s: tw(BOW_DRAW), ease: "out" },
      { t: v.strong ? 0.2 : 0.15, s: tw(BOW_DRAW), ease: "lin" },
      { t: v.strong ? 0.25 : 0.19, s: follow, ease: "out" },
      { t: 0.5, s: follow, ease: "inout" },
      { t: 1, s: BOW_READY, ease: "inout" },
    ],
  };
}

/** Ngắm tụ lực: giữ đầy dây, run nhẹ vì căng. */
const aim: ClipDef = {
  dur: 1.6,
  loop: true,
  keys: [
    { t: 0, s: BOW_DRAW },
    { t: 0.5, s: P(BOW_DRAW, { rh: { p: [-0.035, 0.452, -0.01] }, hp: [0, -0.034, 0] }) },
    { t: 1, s: BOW_DRAW },
  ],
};

/** Nộ: bước lùi, ngửa người bắn mưa tên lên trời, thả lúc màn nộ kết thúc (≈ 0.95/1.3). */
const SKY = P(BOW_DRAW, {
  hp: [0, -0.06, -0.04],
  b: { spine: [-10, -8, 0], chest: [-14, -10, -2], upperChest: [-8, -4, -2], neck: [-12, 36, 0], head: [-20, 40, 6] },
  lh: { p: [0.04, 0.78, 0.42], fing: [-0.15, 0.8, 0.6], thumb: [0.15, 0.6, -0.8], elbow: [1, -0.4, 0] },
  rh: { p: [-0.03, 0.5, 0.02], fing: [0.35, 0.6, 0.8], thumb: [0, 0.8, -0.6], elbow: [-0.2, -0.3, -1] },
});
const burst: ClipDef = {
  dur: 1.3,
  keys: [
    { t: 0, s: BOW_READY },
    { t: 0.16, s: P(BOW_READY, { hp: [0, -0.12, -0.08], fr: foot(-0.1, -0.24, -48) }), ease: "out" },
    { t: 0.4, s: P(SKY, { fr: foot(-0.1, -0.24, -48), rh: { p: [0.0, 0.62, 0.3] } }), ease: "inout" },
    { t: 0.68, s: P(SKY, { fr: foot(-0.1, -0.24, -48) }), ease: "out" },
    { t: 0.73, s: P(SKY, { fr: foot(-0.1, -0.24, -48) }), ease: "lin" },
    { t: 0.78, s: P(SKY, { fr: foot(-0.1, -0.24, -48), rh: { p: [-0.12, 0.5, -0.12] }, gr: LET }), ease: "out" },
    { t: 0.88, s: P(SKY, { fr: foot(-0.1, -0.24, -48), rh: { p: [-0.12, 0.5, -0.12] }, gr: LET }) },
    { t: 1, s: BOW_READY, ease: "inout" },
  ],
};

export const BOW: Record<string, ClipDef> = {
  bowRelax: idleLoop(BOW_RELAX),
  bowReady: readyLoop(BOW_READY),
  bow1: shot({ lean: 0, yaw: 0 }),
  bow2: shot({ lean: 3, yaw: -6 }),
  bow3: shot({ lean: -2, yaw: 4, strong: true }),
  bowAim: aim,
  bowBurst: burst,
};

const carryBow = { hold: { ...LH_DOWN, p: [0.21, -0.02, 0.1] as [number, number, number] }, k: 0.6, grip: FIST };
export const BOW_MOVE: Record<string, OverlayDef> = {
  bowWalk: carry("walk", { l: carryBow }),
  bowRun: carry("run", { l: { ...carryBow, k: 0.45 } }),
  bowSprint: carry("sprint", { l: { ...carryBow, k: 0.35 } }),
};
void OPEN;
