/** Cung: thế chờ một tay thả thấp bên hông, cung nghiêng chéo; rút / cất theo mocap Mixamo (Longbow pack). */
import type { MocapRecipe } from "../mocap";
import type { Hand, OverlayDef, V3 } from "../pose";
import { fing, ik, kn, polish, SOFT, wgrip } from "./polish";

const BW = "mx/bow_standing_";
export const BW_MC: Record<string, MocapRecipe> = {
  "mc.bwIdle": { file: BW + "idle_01", from: 0, to: 5.0, loop: true, inPlace: true, straight: 0.85, yaw: -100 },
  "mc.bwDraw": { file: BW + "equip_bow", from: 0, to: 0.89, inPlace: true, straight: 0.85 },
  "mc.bwStow": { file: BW + "disarm_bow", from: 0, to: 1.09, inPlace: true, straight: 0.85 },
};
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
function ikHip(r: Parameters<OverlayDef["mod"]>[0], k: "l" | "r", h: Hand, w = 1) {
  ik(r, k, { ...h, p: add(r.pos("hips").toArray() as V3, h.p) }, w);
}
/** Tay trái thả thấp bên hông, thân cung nghiêng chéo (đầu trên ra trước, ra ngoài). */
export const BW_LOW = wgrip([0.33, -0.02, 0.1], [0.3, 0.8, 0.5], [0, 0, 1], [0.6, -0.1, -0.7]);
const R_REL: Hand = { p: [-0.3, 0.0, 0.06], fing: [-0.25, -1, 0.15], thumb: [0, 0, 1], elbow: [-0.5, 0, -0.8] };
export const BW_POL: Record<string, OverlayDef> = {
  bowReady: polish("mc.bwIdle", (r) => {
    ikHip(r, "l", BW_LOW);
    ikHip(r, "r", R_REL);
    fing(r, "l", { c: 0.85, t: 0.8, ci: 0.75, s: 2 });
    fing(r, "r", SOFT);
  }),
  bwDraw: polish("mc.bwDraw", (r, f) => {
    ikHip(
      r,
      "l",
      BW_LOW,
      kn(
        [
          [0.7, 0],
          [1, 1],
        ],
        f,
      ),
    );
    fing(r, "r", SOFT);
  }),
  bwStow: polish("mc.bwStow", (r, f) => {
    ikHip(
      r,
      "l",
      BW_LOW,
      kn(
        [
          [0, 1],
          [0.25, 0],
        ],
        f,
      ),
    );
    fing(r, "r", SOFT);
  }),
};
