/**
 * Pháp khí: nền mocap Mixamo (Magic pack) + keyframe thủ công.
 * Không cầm sách: sách lơ lửng ngang hông; hai tay múa phép, cổ tay mềm, ngón tạo dáng (MUDRA).
 */
import type { MocapRecipe } from "../mocap";
import type { OverlayDef } from "../pose";
import { fing, MUDRA, polish, rot, SOFT } from "./polish";

const MG = "mx/mg_Standing_";
export const CT_MC: Record<string, MocapRecipe> = {
  "mc.ctIdle": { file: MG + "Idle_03", from: 0, to: 11.3, loop: true, inPlace: true, straight: 0.8 },
  "mc.ct1": {
    file: MG + "1H_Magic_Attack_01",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.3,
    straight: 0.75,
    segs: [
      [0.45, 0.85, 1.6],
      [0.85, 1.1, 1.1],
      [1.1, 1.35, 0.8],
    ],
  },
  "mc.ct2": {
    file: MG + "1H_Magic_Attack_03",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.3,
    straight: 0.75,
    segs: [
      [0.4, 0.95, 1.6],
      [0.95, 1.3, 1.1],
      [1.3, 1.6, 0.8],
    ],
  },
  "mc.ct3": {
    file: MG + "2H_Magic_Attack_01",
    from: 0,
    to: 0,
    inPlace: true,
    rootK: 0.3,
    straight: 0.75,
    segs: [
      [0.5, 1.1, 1.6],
      [1.1, 1.45, 1.1],
      [1.45, 1.8, 0.8],
    ],
  },
  "mc.ctDraw": {
    file: "mx/mg_standing_1H_cast_spell_01",
    from: 0.3,
    to: 1.7,
    speed: 1.4,
    inPlace: true,
    straight: 0.8,
  },
};
/** Cổ tay mềm: lắc nhẹ trễ pha giữa hai tay (overlap). */
const soft = (r: Parameters<OverlayDef["mod"]>[0], f: number, n: number, a = 7) => {
  const s = Math.sin(f * Math.PI * 2 * n);
  rot(r, "rightHand", [0, a * 0.5 * s, a * s]);
  rot(r, "leftHand", [0, -a * 0.5 * Math.sin(f * Math.PI * 2 * n - 0.9), -a * Math.sin(f * Math.PI * 2 * n - 0.9)]);
};
const cast = (from: string, n = 1) =>
  polish(from, (r, f) => {
    soft(r, f, n);
    fing(r, "r", MUDRA);
    fing(r, "l", { ...MUDRA, ci: 0.15, cm: 0.4 });
  });
export const CT_POL: Record<string, OverlayDef> = {
  ctReady: polish("mc.ctIdle", (r, f) => {
    soft(r, f, 4, 5);
    fing(r, "r", SOFT);
    fing(r, "l", MUDRA);
  }),
  ct1: cast("mc.ct1"),
  ct2: cast("mc.ct2"),
  ct3: cast("mc.ct3"),
  ctDraw: cast("mc.ctDraw", 2),
};
