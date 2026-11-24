/**
 * Thương: thế chờ một tay nắm giữa cán, cán dọc theo người, mũi chếch lên (tay trái thả);
 * chỉ khi đánh mới chuyển hai tay (tay2 chi: act). Rút: quay thương trước người rồi dựng cán.
 */
import type { MocapRecipe } from "../mocap";
import type { Hand, OverlayDef, V3 } from "../pose";
import { fing, HILT, ik, kn, polish, rot, SOFT, wgrip } from "./polish";

export const SP_MC: Record<string, MocapRecipe> = {
  "mc.spIdle": { file: "mx/gs_great_sword_idle (1)", from: 0, to: 3.6, loop: true, inPlace: true, straight: 0.8 },
  "mc.spDraw": { file: "mx/ss_draw_sword_1", from: 0, to: 0.49, speed: 0.6, inPlace: true, straight: 0.8 },
  "mc.spStow": { file: "mx/gs_draw_a_great_sword_1", from: 0.05, to: 0.49, inPlace: true, straight: 0.8 },
};
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
function ikHip(r: Parameters<OverlayDef["mod"]>[0], k: "l" | "r", h: Hand, w = 1) {
  ik(r, k, { ...h, p: add(r.pos("hips").toArray() as V3, h.p) }, w);
}
export const SP_SIDE = wgrip([-0.3, 0.08, 0.06], [-0.15, 0.95, -0.25], [0, 0, 1], [-0.6, -0.2, -0.7]);
const L_REL: Hand = { p: [0.3, 0.0, 0.06], fing: [0.25, -1, 0.15], thumb: [0, 0, 1], elbow: [0.5, 0, -0.8] };
export const SP_POL: Record<string, OverlayDef> = {
  spReady: polish("mc.spIdle", (r) => {
    ikHip(r, "r", SP_SIDE);
    ikHip(r, "l", L_REL);
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
  }),
  spDraw: polish("mc.spDraw", (r, f) => {
    fing(r, "r", HILT);
    fing(r, "l", SOFT);
    ikHip(
      r,
      "r",
      SP_SIDE,
      kn(
        [
          [0.75, 0],
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
          [0.6, 0],
          [1, 1],
        ],
        f,
      ),
    );
  }),
  spStow: polish("mc.spStow", (r, f) => {
    ikHip(
      r,
      "r",
      SP_SIDE,
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
    rot(r, "head", [0, 0, 0]);
  }),
};
