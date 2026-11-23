import type { Authored, Pose } from "../author";

/*
 * Clip riêng 5 nhân vật S30. Góc theo author.ts: tay phải Z+ hạ xuống, Z− giơ lên, Y+ đưa ra trước; tay trái ngược dấu Z, Y− ra trước.
 * Lưng giữ thẳng (spine/chest ≤ 15°). Mai Linh (dáng nữ nhỏ): động tác hồn nhiên, nhún nhảy, không uốn người.
 */
const R = (y: number, z: number, x = 0): [number, number, number] => [x, y, z];
const L = (y: number, z: number, x = 0): [number, number, number] => [x, -y, -z];
/** Hai tay khép trước ngực (niệm, giữ đèn, nâng diều). */
const nangHaiTay = (h: number): Pose => ({
  rightUpperArm: R(70, 40 - h),
  rightLowerArm: R(70, 0),
  leftUpperArm: L(70, 40 - h),
  leftLowerArm: L(70, 0),
});
const giuongTay = (h: number): Pose => ({
  rightUpperArm: R(30, -h),
  rightLowerArm: R(10, 0),
  leftUpperArm: L(30, -h),
  leftLowerArm: L(10, 0),
});
const vungKiem = (yaw0: number, yaw1: number, dur: number, extra: Partial<Authored> = {}): Authored => ({
  base: "swordIdle",
  dur,
  keys: [
    { t: 0, rest: true },
    {
      t: 0.3,
      hipsYaw: yaw0,
      b: {
        spine: [0, Math.max(-15, Math.min(15, yaw0 / 4)), 0],
        rightUpperArm: R(-40, -10, 20),
        rightLowerArm: R(50, 0),
        leftUpperArm: L(40, 60),
      },
    },
    {
      t: 0.55,
      ease: "out",
      hipsYaw: yaw1,
      b: {
        spine: [0, Math.max(-15, Math.min(15, yaw1 / 4)), 0],
        rightUpperArm: R(80, 10, -10),
        rightLowerArm: R(5, 0),
        rightHand: [0, 0, 10],
        leftUpperArm: L(-20, 70),
      },
    },
    { t: 1, rest: true },
  ],
  ...extra,
});

export const KIT_CLIPS: Record<string, Authored> = {
  /* ---------- Sương Mai: kiếm Thủy, nhẹ như sương ---------- */
  "suongmai.charge": {
    base: "swordIdle",
    dur: 0.9,
    keys: [
      { t: 0, rest: true },
      // thu kiếm về hông trái như tra vỏ
      {
        t: 0.35,
        hipsYaw: 35,
        hipsPos: [0, -0.04, 0],
        b: {
          spine: [5, 10, 0],
          rightUpperArm: R(60, 55, -20),
          rightLowerArm: R(80, 0),
          leftUpperArm: L(50, 65),
          leftLowerArm: L(60, 0),
        },
      },
      // rút kiếm chém ngang thành vòng cung rộng
      {
        t: 0.6,
        ease: "out",
        hipsYaw: -45,
        hipsPos: [0, -0.02, 0.06],
        b: { spine: [0, -12, 0], rightUpperArm: R(110, 0, 0), rightLowerArm: R(0, 0), leftUpperArm: L(-30, 50) },
      },
      { t: 1, rest: true },
    ],
  },
  "suongmai.skillTap": {
    base: "swordIdle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      {
        t: 0.2,
        hipsPos: [0, -0.06, 0],
        b: { spine: [10, 0, 0], rightUpperArm: R(20, 20, 30), rightLowerArm: R(60, 0), leftUpperArm: L(-30, 55) },
      },
      {
        t: 0.5,
        ease: "out",
        hipsPos: [0, -0.03, 0.12],
        b: {
          spine: [5, 0, 0],
          rightUpperArm: R(95, -5),
          rightLowerArm: R(0, 0),
          leftUpperArm: L(-50, 45),
          rightUpperLeg: [-35, 0, 0],
          leftUpperLeg: [20, 0, 0],
        },
      },
      { t: 1, rest: true },
    ],
  },
  "suongmai.guard": {
    base: "swordIdle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      // kiếm dựng chéo trước ngực, tay trái đỡ sống kiếm
      {
        t: 0.3,
        ease: "out",
        hipsYaw: 15,
        hipsPos: [0, -0.05, 0],
        b: {
          rightUpperArm: R(70, 25),
          rightLowerArm: R(90, 0),
          rightHand: [0, 0, -40],
          leftUpperArm: L(60, 35),
          leftLowerArm: L(80, 0),
        },
      },
      {
        t: 1,
        hipsYaw: 15,
        hipsPos: [0, -0.05, 0],
        b: {
          rightUpperArm: R(70, 25),
          rightLowerArm: R(90, 0),
          rightHand: [0, 0, -40],
          leftUpperArm: L(60, 35),
          leftLowerArm: L(80, 0),
        },
      },
    ],
  },
  "suongmai.counter": vungKiem(50, -70, 0.7),
  "suongmai.burst": {
    base: "swordIdle",
    dur: 1.3,
    keys: [
      { t: 0, rest: true },
      // giơ kiếm lên trời gọi sóng
      {
        t: 0.35,
        b: {
          rightUpperArm: R(20, -75),
          rightLowerArm: R(10, 0),
          leftUpperArm: L(20, 40),
          leftLowerArm: L(40, 0),
          head: [-10, 0, 0],
        },
      },
      { t: 0.55, b: { rightUpperArm: R(20, -80), rightLowerArm: R(5, 0), leftUpperArm: L(40, 10), head: [-15, 0, 0] } },
      // chém xuống, sóng bạc tràn ra
      {
        t: 0.75,
        ease: "in",
        hipsPos: [0, -0.08, 0.05],
        b: { spine: [12, 0, 0], rightUpperArm: R(100, 30), rightLowerArm: R(0, 0), leftUpperArm: L(-40, 60) },
      },
      { t: 1, rest: true },
    ],
  },

  /* ---------- Mai Linh: pháp khí, đèn lồng hoa mai ---------- */
  "mailinh.charge": {
    base: "idle",
    dur: 0.9,
    keys: [
      { t: 0, rest: true },
      { t: 0.3, hipsPos: [0, -0.06, 0], b: nangHaiTay(10) },
      // nhún lên thả đèn trời
      { t: 0.6, ease: "out", hipsPos: [0, 0.03, 0], b: { ...giuongTay(70), head: [-15, 0, 0] } },
      { t: 1, rest: true },
    ],
  },
  "mailinh.skillTap": {
    base: "idle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      { t: 0.3, hipsYaw: 20, b: { rightUpperArm: R(40, 20), rightLowerArm: R(80, 0), leftUpperArm: L(30, 60) } },
      // treo đèn: tay phải đưa ra trước, nghiêng đầu cười
      {
        t: 0.6,
        ease: "out",
        hipsYaw: -10,
        b: { rightUpperArm: R(85, -10), rightLowerArm: R(10, 0), rightHand: [0, 0, -20], head: [0, 0, 12] },
      },
      { t: 1, rest: true },
    ],
  },
  "mailinh.skillHold": {
    base: "idle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      { t: 0.25, hipsPos: [0, -0.05, 0], b: nangHaiTay(20) },
      // xoay một vòng nhỏ, hai tay dang ra treo dây đèn
      { t: 0.55, hipsYaw: 90, hipsPos: [0, 0.02, 0], b: giuongTay(10) },
      { t: 0.8, hipsYaw: 0, b: giuongTay(0) },
      { t: 1, rest: true },
    ],
  },
  "mailinh.burst": {
    base: "idle",
    dur: 1.3,
    keys: [
      { t: 0, rest: true },
      { t: 0.25, hipsPos: [0, -0.07, 0], b: { ...nangHaiTay(0), head: [10, 0, 0] } },
      // bật nhảy hai tay giơ cao: pháo hoa
      { t: 0.5, ease: "out", hipsPos: [0, 0.08, 0], b: { ...giuongTay(75), head: [-20, 0, 0] } },
      { t: 0.75, hipsPos: [0, 0, 0], b: { ...giuongTay(60), head: [-15, 0, 8] } },
      { t: 1, rest: true },
    ],
  },

  /* ---------- Bạch Vũ: kiếm Phong, dây diều ---------- */
  "bachvu.charge": {
    base: "swordIdle",
    dur: 0.9,
    keys: [
      { t: 0, rest: true },
      // vung tay trái quăng dây diều
      { t: 0.35, hipsYaw: 30, b: { leftUpperArm: L(-40, -10, 20), leftLowerArm: L(30, 0), rightUpperArm: R(20, 60) } },
      { t: 0.55, ease: "out", hipsYaw: -20, b: { leftUpperArm: L(95, -15), leftLowerArm: L(0, 0) } },
      // giật dây về
      {
        t: 0.8,
        hipsYaw: 10,
        hipsPos: [0, -0.04, -0.05],
        b: { leftUpperArm: L(40, 30), leftLowerArm: L(80, 0), spine: [-5, 0, 0] },
      },
      { t: 1, rest: true },
    ],
  },
  "bachvu.skillTap": vungKiem(-60, 300, 0.75, {}),
  "bachvu.skillHold": {
    base: "swordIdle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      // tụ gió: kiếm chĩa xuống xoay trong tay
      {
        t: 0.45,
        hipsPos: [0, -0.06, 0],
        b: {
          rightUpperArm: R(50, 40),
          rightLowerArm: R(60, 0),
          rightHand: [0, 0, 40],
          leftUpperArm: L(50, 30),
          leftLowerArm: L(70, 0),
        },
      },
      // đẩy lốc đi
      {
        t: 0.7,
        ease: "out",
        hipsPos: [0, 0, 0.08],
        b: { rightUpperArm: R(90, -5), rightLowerArm: R(0, 0), leftUpperArm: L(90, -5), leftLowerArm: L(0, 0) },
      },
      { t: 1, rest: true },
    ],
  },
  "bachvu.burst": {
    base: "swordIdle",
    dur: 1.3,
    keys: [
      { t: 0, rest: true },
      { t: 0.3, hipsYaw: 120, hipsPos: [0, 0.04, 0], b: giuongTay(20) },
      { t: 0.55, hipsYaw: 300, hipsPos: [0, 0.1, 0], b: giuongTay(45) },
      // dừng lại, kiếm chỉ trời, tay trái xòe gom gió
      {
        t: 0.75,
        ease: "out",
        hipsYaw: 360,
        b: { rightUpperArm: R(15, -80), rightLowerArm: R(0, 0), leftUpperArm: L(70, 10), leftLowerArm: L(20, 0) },
      },
      { t: 1, rest: true },
    ],
  },
  "bachvu.glide": {
    base: "jumpAir",
    dur: 1,
    keys: [
      {
        t: 0,
        b: { rightUpperArm: R(10, -70), rightLowerArm: R(10, 0), leftUpperArm: L(10, -70), leftLowerArm: L(10, 0) },
      },
      {
        t: 1,
        b: { rightUpperArm: R(10, -72), rightLowerArm: R(10, 0), leftUpperArm: L(10, -72), leftLowerArm: L(10, 0) },
      },
    ],
  },

  /* ---------- Hạ Vy: cung Băng ---------- */
  "havy.aim1": {
    base: "bowAim",
    dur: 0.6,
    keys: [
      { t: 0, rest: true },
      { t: 1, rest: true },
    ],
  },
  "havy.aim2": {
    base: "bowAim",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      // kéo dây hết cỡ về cạnh cằm, khuỷu phải ngang vai
      {
        t: 0.4,
        ease: "out",
        b: {
          rightUpperArm: R(10, 0),
          rightLowerArm: R(150, 0),
          rightHand: [0, 0, 0],
          leftUpperArm: L(90, -2),
          leftLowerArm: L(0, 0),
          head: [0, -10, 0],
        },
      },
      {
        t: 0.75,
        b: {
          rightUpperArm: R(-5, 0),
          rightLowerArm: R(130, 0),
          leftUpperArm: L(90, -2),
          leftLowerArm: L(0, 0),
          head: [0, -10, 0],
        },
      },
      { t: 1, rest: true },
    ],
  },
  "havy.skillTap": {
    base: "idle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      // cắm tên hoa xuống đất rồi bật lùi
      {
        t: 0.3,
        hipsPos: [0, -0.12, 0],
        b: { spine: [12, 0, 0], rightUpperArm: R(60, 50), rightLowerArm: R(30, 0), leftUpperArm: L(30, 60) },
      },
      {
        t: 0.6,
        ease: "out",
        hipsPos: [0, 0.05, -0.1],
        b: { rightUpperArm: R(-10, 50), leftUpperArm: L(60, 20), leftLowerArm: L(20, 0), leftUpperLeg: [-25, 0, 0] },
      },
      { t: 1, rest: true },
    ],
  },
  "havy.skillHold": {
    base: "bowAim",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      // ngửa cung bắn lên trời
      {
        t: 0.45,
        b: {
          leftUpperArm: L(60, -55),
          leftLowerArm: L(0, 0),
          rightUpperArm: R(40, -40),
          rightLowerArm: R(110, 0),
          head: [-20, 0, 0],
        },
      },
      {
        t: 0.65,
        ease: "out",
        b: { leftUpperArm: L(60, -60), rightUpperArm: R(20, -10), rightLowerArm: R(20, 0), head: [-20, 0, 0] },
      },
      { t: 1, rest: true },
    ],
  },
  "havy.burst": {
    base: "bowAim",
    dur: 1.3,
    keys: [
      { t: 0, rest: true },
      {
        t: 0.3,
        hipsPos: [0, -0.06, 0],
        b: { leftUpperArm: L(60, -30), rightUpperArm: R(10, -20), rightLowerArm: R(140, 0), head: [-12, 0, 0] },
      },
      // xoay người bắn vòng hoa tuyết lên trời
      {
        t: 0.6,
        hipsYaw: 180,
        b: { leftUpperArm: L(60, -60), rightUpperArm: R(10, -30), rightLowerArm: R(140, 0), head: [-20, 0, 0] },
      },
      {
        t: 0.8,
        ease: "out",
        hipsYaw: 360,
        b: { leftUpperArm: L(60, -65), rightUpperArm: R(10, 30), rightLowerArm: R(20, 0) },
      },
      { t: 1, rest: true },
    ],
  },

  /* ---------- Lôi Đình: thương Lôi ---------- */
  "loidinh.charge": {
    base: "idle",
    dur: 0.9,
    keys: [
      { t: 0, rest: true },
      {
        t: 0.35,
        hipsYaw: 40,
        hipsPos: [0, -0.07, -0.05],
        b: { rightUpperArm: R(20, 40, 30), rightLowerArm: R(70, 0), leftUpperArm: L(60, 30), leftLowerArm: L(50, 0) },
      },
      // phi thương: lao cả người theo mũi thương
      {
        t: 0.55,
        ease: "out",
        hipsYaw: -15,
        hipsPos: [0, -0.04, 0.18],
        b: {
          spine: [10, 0, 0],
          rightUpperArm: R(95, -5),
          rightLowerArm: R(0, 0),
          leftUpperArm: L(90, 0),
          leftLowerArm: L(0, 0),
          rightUpperLeg: [20, 0, 0],
          leftUpperLeg: [-40, 0, 0],
        },
      },
      { t: 1, rest: true },
    ],
  },
  "loidinh.plunge": {
    base: "jumpLand",
    dur: 0.6,
    keys: [
      { t: 0, b: { rightUpperArm: R(40, -60), rightLowerArm: R(40, 0), leftUpperArm: L(40, -40) } },
      {
        t: 0.4,
        ease: "in",
        hipsPos: [0, -0.1, 0],
        b: { rightUpperArm: R(90, 40), rightLowerArm: R(0, 0), leftUpperArm: L(80, 40) },
      },
      { t: 1, rest: true },
    ],
  },
  "loidinh.skillTap": {
    base: "idle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      {
        t: 0.2,
        hipsPos: [0, -0.08, -0.04],
        b: { rightUpperArm: R(30, 30, 20), rightLowerArm: R(60, 0), leftUpperArm: L(70, 25), leftLowerArm: L(40, 0) },
      },
      {
        t: 0.45,
        ease: "out",
        hipsPos: [0, -0.05, 0.2],
        b: {
          spine: [8, 0, 0],
          rightUpperArm: R(90, 5),
          rightLowerArm: R(0, 0),
          leftUpperArm: L(85, 5),
          leftLowerArm: L(10, 0),
          leftUpperLeg: [-45, 0, 0],
          rightUpperLeg: [25, 0, 0],
        },
      },
      { t: 1, rest: true },
    ],
  },
  "loidinh.throw": {
    base: "idle",
    dur: 0.75,
    keys: [
      { t: 0, rest: true },
      // cầm thương trên vai, ngả ra sau
      {
        t: 0.35,
        hipsYaw: 35,
        b: { spine: [-8, 10, 0], rightUpperArm: R(-30, -40), rightLowerArm: R(90, 0), leftUpperArm: L(80, 10) },
      },
      // ném
      {
        t: 0.55,
        ease: "out",
        hipsYaw: -25,
        b: { spine: [10, -10, 0], rightUpperArm: R(100, -20), rightLowerArm: R(0, 0), leftUpperArm: L(-20, 60) },
      },
      { t: 1, rest: true },
    ],
  },
  "loidinh.unarmed1": {
    base: "idle",
    dur: 0.5,
    keys: [
      { t: 0, rest: true },
      {
        t: 0.45,
        ease: "out",
        hipsYaw: -25,
        b: { rightUpperArm: R(90, 0), rightLowerArm: R(0, 0), leftUpperArm: L(60, 40), leftLowerArm: L(110, 0) },
      },
      { t: 1, rest: true },
    ],
  },
  "loidinh.unarmed2": {
    base: "idle",
    dur: 0.5,
    keys: [
      { t: 0, rest: true },
      {
        t: 0.45,
        ease: "out",
        hipsYaw: 25,
        b: { leftUpperArm: L(90, 0), leftLowerArm: L(0, 0), rightUpperArm: R(60, 40), rightLowerArm: R(110, 0) },
      },
      { t: 1, rest: true },
    ],
  },
  "loidinh.unarmed3": {
    base: "idle",
    dur: 0.62,
    keys: [
      { t: 0, rest: true },
      // đá vòng gót sấm
      { t: 0.3, hipsYaw: 60, hipsPos: [0, 0.02, 0], b: { leftUpperArm: L(50, 50), rightUpperArm: R(50, 50) } },
      {
        t: 0.55,
        ease: "out",
        hipsYaw: -40,
        b: {
          rightUpperLeg: [-75, 0, 20],
          rightLowerLeg: [10, 0, 0],
          leftUpperArm: L(20, 30),
          rightUpperArm: R(-20, 50),
        },
      },
      { t: 1, rest: true },
    ],
  },
  "loidinh.burst": {
    base: "idle",
    dur: 1.5,
    keys: [
      { t: 0, rest: true },
      // dựng thương gọi sấm
      {
        t: 0.3,
        b: {
          rightUpperArm: R(20, -80),
          rightLowerArm: R(0, 0),
          leftUpperArm: L(50, 30),
          leftLowerArm: L(60, 0),
          head: [-15, 0, 0],
        },
      },
      {
        t: 0.5,
        hipsPos: [0, 0.06, 0],
        b: { rightUpperArm: R(20, -82), rightLowerArm: R(0, 0), leftUpperArm: L(40, 10), head: [-20, 0, 0] },
      },
      // cắm thương xuống đất ba lần sấm
      {
        t: 0.7,
        ease: "in",
        hipsPos: [0, -0.1, 0.05],
        b: {
          spine: [12, 0, 0],
          rightUpperArm: R(80, 45),
          rightLowerArm: R(20, 0),
          leftUpperArm: L(70, 45),
          leftLowerArm: L(20, 0),
        },
      },
      { t: 1, rest: true },
    ],
  },
};
