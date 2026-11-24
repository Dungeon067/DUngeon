/** Tư thế nền dùng chung cho bộ clip S27 (đơn vị H = chiều cao hông, xem tools/anim/pose.ts). */
import { P, type Spec, type V3, type Hand, type Grip } from "../pose";

export const FIST: Grip = { c: 1, t: 1 };
export const LOOSE: Grip = { c: 0.35, t: 0.3, s: 4 };
export const OPEN: Grip = { c: 0.12, t: 0.1, s: 10 };
export const ANKLE_Y = -0.869;

/** Bàn chân phẳng tại (x, z), mũi chân xoay yaw độ. */
export const foot = (x: number, z: number, yaw = 0, y = ANKLE_Y, pitch = 0): { p: V3; r: V3 } => ({
  p: [x, y, z],
  r: [pitch, yaw, 0],
});

/** Tay buông cạnh người (hệ gốc). k: 1 bên trái, −1 bên phải. */
export const handDown = (k: 1 | -1, out = 0.17, y = -0.05, z = 0.02): Hand => ({
  p: [k * out, y, z],
  fing: [k * 0.12, -1, 0.08],
  thumb: [0, 0, 1],
  elbow: [k * 0.25, 0, -1],
});

export const STAND: Spec = {
  hp: [0, -0.012, 0],
  hr: [0, 0, 0],
  b: { spine: [-1, 0, 0], chest: [2, 0, 0], upperChest: [1, 0, 0], neck: [-2, 0, 0], head: [3, 0, 0] },
  fl: foot(0.085, -0.03, 7),
  fr: foot(-0.085, -0.03, -7),
  lh: handDown(1),
  rh: handDown(-1),
  gl: LOOSE,
  gr: LOOSE,
};
export { P };
