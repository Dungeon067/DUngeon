/**
 * Kiếm một tay: nền mocap Mixamo (Sword And Shield pack) + keyframe thủ công.
 * Thế chờ: người nghiêng, kiếm cầm thấp chéo xuống sau, tay trái thả cân bằng, ngón tạo dáng.
 */
import type { MocapRecipe } from "../mocap";
import type { OverlayDef, V3 } from "../pose";
import { fing, HILT, ik, kh, kn, polish, rot, SOFT, wgrip, type K } from "./polish";
import type { Hand } from "../pose";

const SS = "mx/ss_sword_and_shield_";
export const SW_MC: Record<string, MocapRecipe> = {
  "mc.swIdle": { file: SS + "idle (3)", from: 0, to: 2.5, loop: true, inPlace: true, straight: 0.8 },
  "mc.sw1": {
    file: SS + "slash",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.35,
    straight: 0.7,
    segs: [
      [0.2, 0.55, 1.4],
      [0.55, 0.72, 1],
      [0.72, 0.95, 0.8],
    ],
  },
  "mc.sw2": {
    file: SS + "attack (1)",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.35,
    straight: 0.7,
    segs: [
      [0.05, 0.4, 1.5],
      [0.4, 0.75, 1.3],
      [0.75, 0.98, 0.9],
    ],
  },
  "mc.sw3": {
    file: SS + "slash (3)",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.3,
    straight: 0.7,
    segs: [
      [0.45, 0.8, 1.6],
      [0.8, 1.25, 1.3],
      [1.25, 1.45, 1],
      [1.45, 1.75, 0.8],
    ],
  },
  "mc.swDraw": { file: "mx/ss_draw_sword_2", from: 0, to: 0.76, inPlace: true, straight: 0.8 },
  "mc.swStow": { file: "mx/ss_sheath_sword_1", from: 0, to: 1.26, inPlace: true, straight: 0.8 },
};

const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
/** Đích tay tính theo hông (để tay đi theo nhịp thở của mocap). */
function ikHip(r: Parameters<OverlayDef["mod"]>[0], k: "l" | "r", h: Hand, w = 1) {
  const hp = r.pos("hips").toArray() as V3;
  ik(r, k, { ...h, p: add(hp, h.p) }, w);
}
export const SW_LOW = wgrip([-0.36, 0.03, 0.15], [-0.35, -0.5, -0.8], [0, -0.8, 0.6], [-0.7, 0.1, -0.6]);
export const L_BAL: Hand = { p: [0.34, 0.02, 0.1], fing: [0.3, -1, 0.2], thumb: [0, 0, 1], elbow: [0.5, 0, -0.8] };

export const SW_POL: Record<string, OverlayDef> = {
  swReady: polish("mc.swIdle", (r) => {
    ikHip(r, "r", SW_LOW);
    ikHip(r, "l", L_BAL);
    rot(r, "rightHand", [0, 0, -8]);
    rot(r, "leftHand", [0, 0, 10]);
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
  }),
  sw1: polish("mc.sw1", (r) => {
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
  }),
  sw2: polish("mc.sw2", (r) => {
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
  }),
  sw3: polish("mc.sw3", (r) => {
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
  }),
  swDraw: polish("mc.swDraw", (r, f) => {
    fing(
      r,
      "r",
      HILT,
      kn(
        [
          [0, 0.3],
          [0.25, 1],
        ],
        f,
      ),
    );
    fing(r, "l", SOFT);
    ikHip(
      r,
      "r",
      SW_LOW,
      kn(
        [
          [0.75, 0],
          [1, 1],
        ],
        f,
      ),
    );
  }),
  swStow: polish("mc.swStow", (r, f) => {
    ikHip(
      r,
      "r",
      SW_LOW,
      kn(
        [
          [0, 1],
          [0.2, 0],
        ],
        f,
      ),
    );
    fing(
      r,
      "r",
      HILT,
      kn(
        [
          [0.6, 1],
          [0.85, 0.4],
        ],
        f,
      ),
    );
    fing(r, "l", SOFT);
  }),
};
void kh;
export type { K };
