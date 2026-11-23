/**
 * Kiếm, đại kiếm, thương, pháp khí: thế chờ, 3 đòn, kỹ năng, nộ, chồng tay cầm lên clip di chuyển.
 * Sát thương trong game có ngay lúc bấm và renderer co giãn clip theo cửa sổ đòn (ACT_WIN), nên mỗi đòn:
 * lấy đà ngắn (≤ 12–18% clip), chạm ở ≈ 20–30%, phần còn lại là vung theo và thu đòn về thế chờ.
 * Hướng tay: thumb = trục lưỡi / cán vũ khí, fing = hướng lưỡi chém (mu đốt ngón).
 */
import * as THREE from "three";
import type { ClipDef, OverlayDef, Spec, Hand, V3 } from "../pose";
import { P, STAND, FIST, LOOSE, OPEN, foot } from "./base";
import { readyLoop, carry } from "./common";

const n3 = (v: V3) => new THREE.Vector3(...v).normalize();
/** Tay cầm: lưỡi theo blade, lưỡi chém hướng edge (được trực giao hóa). */
function grip(p: V3, blade: V3, edge: V3, elbow: V3, sp?: "root" | "chest"): Hand {
  const b = n3(blade),
    e = n3(edge);
  e.addScaledVector(b, -e.dot(b)).normalize();
  return { p, thumb: b.toArray() as V3, fing: e.toArray() as V3, elbow, sp };
}
/** Tay thứ hai trên cán, cách tay chính d (H) dọc trục vũ khí (d < 0: về phía chuôi). */
function second(h: Hand, d: number, elbow: V3): Hand {
  const b = new THREE.Vector3(...h.thumb);
  return { ...h, p: new THREE.Vector3(...h.p).addScaledVector(b, d).toArray() as V3, elbow };
}
const lean = (s: Spec, o: Partial<{ hp: V3; hr: V3; sp: V3; ch: V3; hd: V3 }>) =>
  P(s, {
    hp: o.hp ?? s.hp,
    hr: o.hr ?? s.hr,
    b: { ...s.b, ...(o.sp && { spine: o.sp }), ...(o.ch && { chest: o.ch }), ...(o.hd && { head: o.hd }) },
  });
const LGUARD: Hand = {
  p: [0.16, 0.12, 0.16],
  fing: [-0.2, 0.7, 0.6],
  thumb: [-0.3, 0.3, -0.6],
  elbow: [0.7, -0.6, -0.3],
};
const LBACK: Hand = { p: [0.24, 0.02, -0.08], fing: [0.3, -0.6, -0.5], thumb: [-0.4, 0, 0.6], elbow: [0.6, 0, -0.6] };

/* ---------------------------------------------------------------- Kiếm: nhanh gọn, một tay. */
const SW_READY = P(STAND, {
  hp: [0, -0.035, 0],
  hr: [0, -18, 0],
  b: { spine: [3, -4, 0], chest: [3, -4, 0], neck: [0, 10, 0], head: [2, 10, 0] },
  fl: foot(0.1, 0.13, 8),
  fr: foot(-0.09, -0.12, -40),
  rh: grip([-0.12, 0.08, 0.3], [0.1, 0.65, 0.75], [0, -0.7, 0.7], [-0.7, -0.6, -0.3]),
  lh: LGUARD,
  gr: FIST,
  gl: LOOSE,
});
const swHi = lean(
  P(SW_READY, {
    rh: grip([-0.26, 0.48, 0.0], [-0.35, 0.5, -0.8], [0.5, 0.5, 0.4], [-0.8, 0.3, -0.3]),
    lh: { ...LGUARD, p: [0.2, 0.16, 0.22] },
  }),
  { hr: [0, -34, 0], ch: [0, -10, 0], hp: [0, -0.03, -0.02] },
);
const swCut = lean(
  P(SW_READY, {
    rh: grip([0.14, -0.04, 0.4], [0.55, -0.35, 0.75], [0.6, -0.7, -0.2], [-0.4, -0.8, 0.2]),
    fl: foot(0.1, 0.22, 10),
    lh: LBACK,
  }),
  { hr: [0, 20, 0], ch: [6, 12, 0], hp: [0, -0.06, 0.05] },
);
const swCutF = lean(
  P(swCut, { rh: grip([0.26, -0.1, 0.22], [0.85, -0.4, 0.1], [0.3, -0.8, -0.5], [-0.3, -0.8, 0.4]) }),
  { hr: [0, 28, 0], ch: [6, 16, 0], hp: [0, -0.06, 0.05] },
);
const swL = lean(
  P(SW_READY, {
    rh: grip([0.26, 0.22, 0.12], [0.8, 0.15, -0.55], [-0.4, 0, 0.6], [-0.3, -0.9, 0.2]),
    fl: foot(0.1, 0.2, 10),
    lh: LBACK,
  }),
  { hr: [0, 30, 0], ch: [2, 12, 0], hp: [0, -0.05, 0.04] },
);
const swR = lean(
  P(SW_READY, {
    rh: grip([-0.18, 0.2, 0.42], [-0.6, 0.12, 0.8], [-0.8, 0, -0.4], [-0.8, -0.5, 0]),
    fr: foot(-0.1, 0.05, -30),
    lh: LGUARD,
  }),
  { hr: [0, -18, 0], ch: [4, -12, 0], hp: [0, -0.06, 0.06] },
);
const swRF = lean(P(swR, { rh: grip([-0.34, 0.18, 0.18], [-0.9, 0.1, -0.2], [-0.2, 0, -1], [-0.7, -0.6, -0.3]) }), {
  hr: [0, -32, 0],
  ch: [4, -16, 0],
  hp: [0, -0.06, 0.05],
});
const swOver = lean(
  P(SW_READY, {
    rh: grip([-0.06, 0.72, -0.04], [0, 0.25, -0.97], [0, 1, 0.2], [-0.7, 0.4, 0]),
    lh: { ...LGUARD, p: [0.12, 0.3, 0.2] },
    fl: foot(0.1, 0.1, 8),
  }),
  { hr: [0, -10, 0], sp: [-6, 0, 0], ch: [-8, -4, 0], hp: [0, 0.0, -0.03] },
);
const swSlam = lean(
  P(SW_READY, {
    rh: grip([-0.02, 0.0, 0.56], [0, -0.45, 0.89], [0, -0.8, -0.5], [-0.5, -0.8, 0]),
    lh: LBACK,
    fl: foot(0.1, 0.34, 10),
    fr: foot(-0.09, -0.16, -35),
  }),
  { hr: [0, 0, 0], sp: [12, 0, 0], ch: [10, 0, 0], hd: [-6, 0, 0], hp: [0, -0.14, 0.12] },
);

/* Đòn: lấy đà a, chạm c, vung theo f, thu về R. tA/tC/tF tỉ lệ thời gian. */
function strike(
  R: Spec,
  a: Spec,
  c: Spec,
  f: Spec,
  o: { dur: number; tA?: number; tC?: number; tF?: number; hold?: number },
): ClipDef {
  const tA = o.tA ?? 0.12,
    tC = o.tC ?? 0.24,
    tF = o.tF ?? 0.4,
    h = o.hold ?? 0.55;
  return {
    dur: o.dur,
    keys: [
      { t: 0, s: R },
      { t: tA, s: a, ease: "out" },
      { t: tC, s: c, ease: "in" },
      { t: tF, s: f, ease: "out" },
      { t: h, s: f, ease: "inout" },
      { t: 1, s: R, ease: "inout" },
    ],
  };
}

/** Kỹ năng kiếm: xoáy người chém ngang hai nhịp. */
const swSkill: ClipDef = {
  dur: 0.75,
  keys: [
    { t: 0, s: SW_READY },
    { t: 0.1, s: swL, ease: "out" },
    { t: 0.24, s: swR, ease: "in" },
    { t: 0.36, s: swRF, ease: "out" },
    { t: 0.5, s: swHi, ease: "inout" },
    { t: 0.62, s: swCut, ease: "in" },
    { t: 0.74, s: swCutF, ease: "out" },
    { t: 1, s: SW_READY, ease: "inout" },
  ],
};
/** Nộ kiếm: giơ kiếm tụ lực, hai tay, rồi bổ dọc lao tới. */
const swCharge = P(swOver, {
  lh: second(grip([-0.06, 0.72, -0.04], [0, 0.25, -0.97], [0, 1, 0.2], [0.7, 0.4, 0]), -0.09, [0.7, 0.4, 0]),
  hp: [0, 0.01, -0.04],
});
const swBurst: ClipDef = {
  dur: 1.3,
  keys: [
    { t: 0, s: SW_READY },
    { t: 0.12, s: lean(swHi, { hp: [0, -0.08, -0.04] }), ease: "out" },
    { t: 0.34, s: swCharge, ease: "inout" },
    { t: 0.46, s: P(swCharge, { hp: [0, 0.02, -0.05] }), ease: "inout" },
    { t: 0.56, s: P(swSlam, { lh: second(swSlam.rh!, -0.09, [0.5, -0.8, 0]) }), ease: "in" },
    { t: 0.78, s: P(swSlam, { lh: second(swSlam.rh!, -0.09, [0.5, -0.8, 0]) }) },
    { t: 1, s: SW_READY, ease: "inout" },
  ],
};

/* ---------------------------------------------------------------- Đại kiếm: nặng, hai tay, hông xoay lớn. */
const gr2 = (s: Spec, rh: Hand, le: V3 = [0.6, -0.7, 0]) => P(s, { rh, lh: second(rh, -0.1, le), gl: FIST });
const GR_READY = gr2(
  P(STAND, {
    hp: [0, -0.06, 0],
    hr: [0, -24, 0],
    b: { spine: [4, -4, 0], chest: [4, -6, 0], neck: [0, 12, 0], head: [2, 14, 0] },
    fl: foot(0.12, 0.14, 10),
    fr: foot(-0.11, -0.14, -45),
    gr: FIST,
  }),
  grip([-0.05, -0.02, 0.26], [0.15, 0.6, 0.8], [0, -0.8, 0.6], [-0.6, -0.8, 0]),
);
const grShoulder = lean(
  gr2(GR_READY, grip([-0.2, 0.38, -0.04], [-0.4, 0.3, -0.85], [0.3, 0.9, 0.2], [-0.8, 0, -0.3]), [0.5, -0.8, 0.2]),
  { hr: [0, -48, 0], ch: [0, -12, 0], hp: [0, -0.04, -0.04] },
);
const grSweep = lean(
  gr2(
    P(GR_READY, { fl: foot(0.14, 0.26, 20) }),
    grip([0.12, 0.05, 0.42], [0.6, -0.1, 0.8], [0.7, 0, -0.6], [-0.4, -0.9, 0]),
  ),
  { hr: [0, 16, 0], ch: [6, 18, 0], hp: [0, -0.1, 0.06] },
);
const grSweepF = lean(
  gr2(P(grSweep, {}), grip([0.3, 0.0, 0.16], [0.9, -0.25, -0.2], [0.2, 0, -1], [-0.2, -1, 0.2]), [0.4, -0.8, 0.4]),
  { hr: [0, 40, 0], ch: [6, 24, 0], hp: [0, -0.1, 0.05] },
);
const grLow = lean(gr2(GR_READY, grip([0.2, -0.16, 0.18], [0.6, -0.6, -0.4], [0.4, 0.6, 0.6], [-0.3, -1, 0.2])), {
  hr: [0, 24, 0],
  ch: [8, 14, 0],
  hp: [0, -0.1, 0.02],
});
const grRise = lean(
  gr2(
    P(GR_READY, { fr: foot(-0.11, 0.06, -30) }),
    grip([-0.16, 0.42, 0.3], [-0.4, 0.75, 0.5], [-0.5, 0.6, -0.6], [-0.7, -0.3, -0.4]),
  ),
  { hr: [0, -30, 0], sp: [-4, 0, 0], ch: [-6, -16, 0], hp: [0, -0.04, 0.06] },
);
const grRiseF = lean(gr2(grRise, grip([-0.22, 0.58, 0.06], [-0.4, 0.6, -0.7], [-0.3, 0.7, 0.6], [-0.8, 0, -0.3])), {
  hr: [0, -36, 0],
  sp: [-6, 0, 0],
  ch: [-8, -18, 0],
  hp: [0, -0.03, 0.05],
});
const grUp = lean(
  gr2(GR_READY, grip([-0.04, 0.74, -0.06], [0.0, 0.2, -0.98], [0, 1, 0.2], [-0.7, 0.4, 0]), [0.7, 0.4, 0]),
  { hr: [0, -12, 0], sp: [-8, 0, 0], ch: [-10, -4, 0], hp: [0, 0.01, -0.05] },
);
const grSlam = lean(
  gr2(
    P(GR_READY, { fl: foot(0.13, 0.36, 12), fr: foot(-0.12, -0.18, -40) }),
    grip([-0.01, -0.06, 0.58], [0, -0.5, 0.86], [0, -0.66, -0.75], [-0.5, -0.8, 0]),
    [0.5, -0.8, 0],
  ),
  { hr: [0, -2, 0], sp: [14, 0, 0], ch: [12, 0, 0], hd: [-8, 0, 0], hp: [0, -0.2, 0.12] },
);
const grSpinA = lean(grSweepF, { hr: [0, 80, 0], hp: [0, -0.08, 0.02] });
const grSkill: ClipDef = {
  dur: 0.75,
  keys: [
    { t: 0, s: GR_READY },
    { t: 0.14, s: grShoulder, ease: "out" },
    { t: 0.3, s: grSweep, ease: "in" },
    { t: 0.46, s: grSpinA, ease: "lin" },
    { t: 0.62, s: grSweepF, ease: "out" },
    { t: 1, s: GR_READY, ease: "inout" },
  ],
};
const grBurst: ClipDef = {
  dur: 1.3,
  keys: [
    { t: 0, s: GR_READY },
    { t: 0.14, s: lean(GR_READY, { hp: [0, -0.14, -0.02] }), ease: "out" },
    { t: 0.36, s: grUp, ease: "inout" },
    { t: 0.48, s: lean(grUp, { hp: [0, 0.03, -0.06] }), ease: "inout" },
    { t: 0.58, s: grSlam, ease: "in" },
    { t: 0.8, s: lean(grSlam, { hp: [0, -0.22, 0.12] }) },
    { t: 1, s: GR_READY, ease: "inout" },
  ],
};

/* ---------------------------------------------------------------- Thương: đâm thẳng và quét, hai tay. */
const sp2 = (s: Spec, rh: Hand, le: V3 = [0.6, -0.8, 0]) => P(s, { rh, lh: second(rh, 0.36, le), gl: FIST });
const SP_DIR: V3 = [0.05, 0.12, 1];
const SP_READY = sp2(
  P(STAND, {
    hp: [0, -0.05, 0],
    hr: [0, -38, 0],
    b: { spine: [3, -6, 0], chest: [3, -8, 0], neck: [0, 22, 0], head: [2, 24, 0] },
    fl: foot(0.08, 0.16, -10),
    fr: foot(-0.12, -0.14, -60),
    gr: FIST,
  }),
  grip([-0.12, -0.02, -0.02], SP_DIR, [0, -1, 0.1], [-0.7, -0.7, 0]),
);
const spBack = lean(sp2(SP_READY, grip([-0.16, 0.0, -0.16], SP_DIR, [0, -1, 0.1], [-0.8, -0.5, -0.2])), {
  hr: [0, -46, 0],
  hp: [0, -0.06, -0.04],
});
const spThrust = lean(
  sp2(P(SP_READY, { fl: foot(0.08, 0.3, -10) }), grip([-0.02, 0.04, 0.3], [0.0, 0.05, 1], [0, -1, 0], [-0.6, -0.8, 0])),
  { hr: [0, -24, 0], sp: [6, -4, 0], ch: [6, -6, 0], hp: [0, -0.09, 0.1] },
);
const spSwR = lean(sp2(SP_READY, grip([-0.08, 0.12, 0.1], [-0.6, 0.2, 0.75], [-0.7, 0, -0.6], [-0.7, -0.7, 0])), {
  hr: [0, -50, 0],
  ch: [2, -14, 0],
  hp: [0, -0.05, 0],
});
const spSwL = lean(
  sp2(
    P(SP_READY, { fl: foot(0.1, 0.22, 0) }),
    grip([0.02, 0.1, 0.16], [0.75, 0.1, 0.6], [0.6, 0, -0.7], [-0.5, -0.9, 0]),
  ),
  { hr: [0, 10, 0], ch: [4, 18, 0], hp: [0, -0.09, 0.05] },
);
const spSwLF = lean(sp2(spSwL, grip([0.08, 0.1, 0.06], [0.95, 0.1, 0.05], [0.1, 0, -1], [-0.4, -0.9, 0.2])), {
  hr: [0, 24, 0],
  ch: [4, 22, 0],
  hp: [0, -0.09, 0.04],
});
const spLunge = lean(
  sp2(
    P(SP_READY, { fl: foot(0.09, 0.42, -6), fr: foot(-0.12, -0.2, -60) }),
    grip([0.02, 0.1, 0.4], [0.0, 0.1, 1], [0, -1, 0], [-0.6, -0.8, 0]),
  ),
  { hr: [0, -18, 0], sp: [10, -4, 0], ch: [8, -6, 0], hp: [0, -0.16, 0.16] },
);
const spRaise = lean(sp2(SP_READY, grip([-0.14, 0.4, -0.08], [0.05, 0.4, 0.9], [0, -0.9, 0.4], [-0.7, -0.2, -0.4])), {
  hr: [0, -44, 0],
  sp: [-4, 0, 0],
  hp: [0, -0.02, -0.04],
});
const spSkill: ClipDef = {
  dur: 0.75,
  keys: [
    { t: 0, s: SP_READY },
    { t: 0.1, s: spBack, ease: "out" },
    { t: 0.2, s: spThrust, ease: "in" },
    { t: 0.3, s: spBack, ease: "inout" },
    { t: 0.4, s: spThrust, ease: "in" },
    { t: 0.52, s: spSwR, ease: "inout" },
    { t: 0.66, s: spSwLF, ease: "in" },
    { t: 1, s: SP_READY, ease: "inout" },
  ],
};
const spBurst: ClipDef = {
  dur: 1.3,
  keys: [
    { t: 0, s: SP_READY },
    { t: 0.14, s: lean(spBack, { hp: [0, -0.14, -0.06] }), ease: "out" },
    { t: 0.36, s: spRaise, ease: "inout" },
    { t: 0.48, s: lean(spRaise, { hp: [0, 0.0, -0.06] }), ease: "inout" },
    { t: 0.58, s: spLunge, ease: "in" },
    { t: 0.8, s: spLunge },
    { t: 1, s: SP_READY, ease: "inout" },
  ],
};

/* ---------------------------------------------------------------- Pháp khí: lơ lửng quanh tay phải, niệm bằng tay. */
const palm = (p: V3, out: V3, up: V3, elbow: V3): Hand => {
  // Lòng bàn tay hướng out; ngón chỉ lên theo up.
  const o = n3(out),
    u = n3(up);
  u.addScaledVector(o, -u.dot(o)).normalize();
  return { p, fing: u.toArray() as V3, thumb: new THREE.Vector3().crossVectors(o, u).toArray() as V3, elbow };
};
const palmR = (p: V3, out: V3, up: V3 = [0, 1, 0], e: V3 = [-0.8, -0.5, 0]) => {
  const h = palm(p, out, up, e);
  return { ...h, thumb: h.thumb.map((x) => -x) as V3 };
};
const CT_READY = P(STAND, {
  hp: [0, -0.03, 0],
  hr: [0, -12, 0],
  b: { spine: [2, -2, 0], chest: [2, -4, 0], neck: [0, 6, 0], head: [2, 8, 0] },
  fl: foot(0.1, 0.1, 12),
  fr: foot(-0.09, -0.08, -28),
  rh: palmR([-0.18, 0.1, 0.22], [0, 0.6, 0.4], [0.2, 0.2, 1], [-0.8, -0.6, 0]),
  lh: palm([0.16, 0.06, 0.18], [-0.5, 0.4, 0.3], [0, 0.3, 1], [0.8, -0.6, 0]),
  gr: OPEN,
  gl: LOOSE,
});
const ctPullR = lean(P(CT_READY, { rh: palmR([-0.22, 0.3, 0.02], [0, 0, 1], [0, 1, 0], [-0.9, -0.2, -0.3]) }), {
  hr: [0, -26, 0],
  hp: [0, -0.04, -0.03],
});
const ctPushR = lean(
  P(CT_READY, { rh: palmR([-0.06, 0.32, 0.48], [0, 0, 1], [0, 1, 0.1], [-0.6, -0.6, 0]), fl: foot(0.1, 0.2, 12) }),
  { hr: [0, 10, 0], ch: [6, 8, 0], hp: [0, -0.06, 0.06] },
);
const ctPullL = lean(P(CT_READY, { lh: palm([0.26, 0.28, 0.02], [0, 0, 1], [0, 1, 0], [0.9, -0.2, -0.3]) }), {
  hr: [0, 18, 0],
  hp: [0, -0.04, -0.02],
});
const ctSwL = lean(
  P(CT_READY, { lh: palm([-0.02, 0.24, 0.46], [-0.6, 0, 0.8], [0, 1, 0], [0.6, -0.6, 0]), fr: foot(-0.09, 0.04, -20) }),
  { hr: [0, -18, 0], ch: [6, -10, 0], hp: [0, -0.06, 0.05] },
);
const ctBoth = lean(
  P(CT_READY, {
    rh: palmR([-0.12, 0.55, 0.12], [0.3, 0.6, 0.7], [0, 1, 0], [-0.8, 0, -0.3]),
    lh: palm([0.12, 0.55, 0.12], [-0.3, 0.6, 0.7], [0, 1, 0], [0.8, 0, -0.3]),
    gl: OPEN,
  }),
  { hr: [0, 0, 0], sp: [-4, 0, 0], ch: [-6, 0, 0], hd: [-8, 0, 0], hp: [0, -0.01, -0.03] },
);
const ctBothPush = lean(
  P(CT_READY, {
    rh: palmR([-0.08, 0.3, 0.5], [0, 0, 1], [0, 1, 0], [-0.6, -0.7, 0]),
    lh: palm([0.08, 0.3, 0.5], [0, 0, 1], [0, 1, 0], [0.6, -0.7, 0]),
    gl: OPEN,
    fl: foot(0.1, 0.24, 10),
  }),
  { hr: [0, 0, 0], sp: [6, 0, 0], ch: [8, 0, 0], hp: [0, -0.1, 0.08] },
);
/** Kỹ năng: vẽ vòng tròn phép trước mặt bằng tay phải rồi đẩy ra. */
const ctCircle = (a: number) =>
  P(CT_READY, {
    rh: palmR([-0.06 + 0.16 * Math.cos(a), 0.3 + 0.16 * Math.sin(a), 0.4], [0, 0, 1], [0, 1, 0], [-0.7, -0.6, 0]),
    lh: palm([0.18, 0.12, 0.26], [-0.4, 0.4, 0.5], [0, 0.4, 1], [0.8, -0.5, 0]),
    hr: [0, -4, 0],
    hp: [0, -0.04, 0.02],
  });
const ctSkill: ClipDef = {
  dur: 0.75,
  keys: [
    { t: 0, s: CT_READY },
    ...[0, 1, 2, 3, 4].map((i) => ({
      t: 0.08 + i * 0.07,
      s: ctCircle(Math.PI * (0.5 + i * 0.5)),
      ease: "lin" as const,
    })),
    { t: 0.52, s: ctPushR, ease: "in" },
    { t: 0.7, s: ctPushR },
    { t: 1, s: CT_READY, ease: "inout" },
  ],
};
const ctBurst: ClipDef = {
  dur: 1.3,
  keys: [
    { t: 0, s: CT_READY },
    { t: 0.14, s: lean(ctBoth, { hp: [0, -0.1, -0.02] }), ease: "out" },
    { t: 0.4, s: lean(ctBoth, { hp: [0, 0.02, -0.04] }), ease: "inout" },
    { t: 0.5, s: ctBoth, ease: "inout" },
    { t: 0.6, s: ctBothPush, ease: "in" },
    { t: 0.82, s: ctBothPush },
    { t: 1, s: CT_READY, ease: "inout" },
  ],
};

export const MELEE: Record<string, ClipDef> = {
  swReady: readyLoop(SW_READY),
  sw1: strike(SW_READY, swHi, swCut, swCutF, { dur: 0.55 }),
  sw2: strike(SW_READY, swL, swR, swRF, { dur: 0.55 }),
  sw3: strike(SW_READY, swOver, swSlam, lean(swSlam, { hp: [0, -0.15, 0.12] }), {
    dur: 0.75,
    tA: 0.16,
    tC: 0.28,
    tF: 0.4,
    hold: 0.62,
  }),
  swSkill,
  swBurst,
  grReady: readyLoop(GR_READY, 2.8),
  gr1: strike(GR_READY, grShoulder, grSweep, grSweepF, { dur: 0.75, tA: 0.16, tC: 0.28, tF: 0.48, hold: 0.62 }),
  gr2: strike(GR_READY, grLow, grRise, grRiseF, { dur: 0.75, tA: 0.16, tC: 0.28, tF: 0.48, hold: 0.62 }),
  gr3: strike(GR_READY, grUp, grSlam, lean(grSlam, { hp: [0, -0.22, 0.12] }), {
    dur: 0.95,
    tA: 0.18,
    tC: 0.3,
    tF: 0.42,
    hold: 0.7,
  }),
  grSkill,
  grBurst,
  spReady: readyLoop(SP_READY),
  sp1: strike(SP_READY, spBack, spThrust, lean(spThrust, { hp: [0, -0.1, 0.11] }), {
    dur: 0.5,
    tA: 0.1,
    tC: 0.22,
    tF: 0.32,
  }),
  sp2: strike(SP_READY, spSwR, spSwL, spSwLF, { dur: 0.55 }),
  sp3: strike(SP_READY, lean(spBack, { hp: [0, -0.1, -0.08] }), spLunge, lean(spLunge, { hp: [0, -0.17, 0.17] }), {
    dur: 0.75,
    tA: 0.16,
    tC: 0.26,
    tF: 0.36,
    hold: 0.62,
  }),
  spSkill,
  spBurst,
  ctReady: readyLoop(CT_READY),
  ct1: strike(CT_READY, ctPullR, ctPushR, ctPushR, { dur: 0.6 }),
  ct2: strike(CT_READY, ctPullL, ctSwL, ctSwL, { dur: 0.6 }),
  ct3: strike(CT_READY, ctBoth, ctBothPush, lean(ctBothPush, { hp: [0, -0.11, 0.09] }), {
    dur: 0.75,
    tA: 0.16,
    tC: 0.28,
    tF: 0.38,
    hold: 0.62,
  }),
  ctCharge: {
    dur: 1.6,
    loop: true,
    keys: [0, 0.25, 0.5, 0.75, 1].map((t, i) => ({ t, s: ctCircle(Math.PI * 2 * t + (i ? 0 : 0)) })),
  },
  ctSkill,
  ctBurst,
};

const low = (k: 1 | -1, blade: V3): Hand => grip([k * 0.2, -0.04, 0.12], blade, [0, -0.3, 1], [k * 0.4, 0, -1]);
export const MELEE_MOVE: Record<string, OverlayDef> = {
  swWalk: carry("walk", { r: { hold: low(-1, [0, 0.35, 0.95]), k: 0.55, grip: FIST } }),
  swRun: carry("run", { r: { hold: low(-1, [0, 0.2, 1]), k: 0.45, grip: FIST } }),
  swSprint: carry("sprint", { r: { hold: low(-1, [0, -0.1, -1]), k: 0.4, grip: FIST } }),
  grWalk: carry("walk", { r: { hold: low(-1, [-0.2, 0.3, -0.9]), k: 0.65, grip: FIST } }),
  grRun: carry("run", { r: { hold: low(-1, [-0.2, 0.2, -1]), k: 0.55, grip: FIST } }),
  grSprint: carry("sprint", { r: { hold: low(-1, [-0.2, 0.1, -1]), k: 0.5, grip: FIST } }),
  spWalk: carry("walk", { r: { hold: low(-1, [0, 0.5, 0.85]), k: 0.65, grip: FIST } }),
  spRun: carry("run", { r: { hold: low(-1, [0, 0.35, 0.95]), k: 0.55, grip: FIST } }),
  spSprint: carry("sprint", { r: { hold: low(-1, [0, 0.2, -1]), k: 0.5, grip: FIST } }),
};
