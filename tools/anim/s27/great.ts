/**
 * Đại kiếm: nền mocap Mixamo (Great Sword pack) + keyframe thủ công.
 * Thế chờ: vác lên vai phải, tay trái thả. Đòn: lấy đà dài, xoay hông, khựng khi chạm.
 */
import type { MocapRecipe } from "../mocap";
import type { Hand, OverlayDef, V3 } from "../pose";
import { fing, HILT, ik, kn, polish, rot, SOFT, wgrip } from "./polish";

const GS = "mx/gs_great_sword_";
export const GR_MC: Record<string, MocapRecipe> = {
  "mc.grIdle": { file: GS + "idle (1)", from: 0, to: 3.6, loop: true, inPlace: true, straight: 0.8 },
  "mc.gr1": {
    file: GS + "slash",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.3,
    straight: 0.7,
    segs: [
      [0.25, 0.62, 1.2],
      [0.62, 0.78, 1],
      [0.78, 0.98, 0.7],
    ],
  },
  "mc.gr2": {
    file: GS + "attack",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.3,
    straight: 0.7,
    segs: [
      [0.05, 0.35, 1.1],
      [0.35, 0.65, 1.2],
      [0.65, 0.85, 0.7],
    ],
  },
  "mc.gr3": {
    file: GS + "high_spin_attack",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.3,
    straight: 0.7,
    segs: [
      [0.1, 0.55, 1.4],
      [0.55, 1.1, 1.2],
      [1.1, 1.3, 1],
      [1.3, 1.6, 0.7],
    ],
  },
  "mc.grDraw": { file: "mx/gs_draw_a_great_sword_2", from: 0, to: 0.79, inPlace: true, straight: 0.8 },
  "mc.grStow": { file: "mx/gs_draw_a_great_sword_1", from: 0.05, to: 0.49, inPlace: true, straight: 0.8 },
};
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
function ikHip(r: Parameters<OverlayDef["mod"]>[0], k: "l" | "r", h: Hand, w = 1) {
  ik(r, k, { ...h, p: add(r.pos("hips").toArray() as V3, h.p) }, w);
}
/** Vác vai: tay phải trước vai, lưỡi gác qua vai chéo ra sau, chếch lên. */
export const GR_SHOULDER = wgrip([-0.2, 0.42, 0.16], [-0.15, 0.45, -0.88], [0, 0.85, 0.5], [-0.75, -0.55, 0.1]);
const L_REL: Hand = { p: [0.3, 0.0, 0.06], fing: [0.25, -1, 0.15], thumb: [0, 0, 1], elbow: [0.5, 0, -0.8] };

export const GR_POL: Record<string, OverlayDef> = {
  grReady: polish("mc.grIdle", (r) => {
    ikHip(r, "r", GR_SHOULDER);
    ikHip(r, "l", L_REL);
    rot(r, "rightHand", [0, 0, -5]);
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
  }),
  gr1: polish("mc.gr1", (r) => fing(r, "r", HILT)),
  gr2: polish("mc.gr2", (r) => fing(r, "r", HILT)),
  gr3: polish("mc.gr3", (r) => fing(r, "r", HILT)),
  grDraw: polish("mc.grDraw", (r, f) => {
    fing(r, "r", HILT);
    fing(
      r,
      "l",
      SOFT,
      kn(
        [
          [0.6, 0],
          [1, 1],
        ],
        f,
      ),
    );
    ikHip(
      r,
      "r",
      GR_SHOULDER,
      kn(
        [
          [0.7, 0],
          [1, 1],
        ],
        f,
      ),
    );
    ikHip(
      r,
      "l",
      L_REL,
      kn(
        [
          [0.7, 0],
          [1, 1],
        ],
        f,
      ),
    );
  }),
  grStow: polish("mc.grStow", (r, f) => {
    ikHip(
      r,
      "r",
      GR_SHOULDER,
      kn(
        [
          [0, 1],
          [0.3, 0],
        ],
        f,
      ),
    );
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
  }),
};
