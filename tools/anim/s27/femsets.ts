/**
 * Bản nữ (hậu tố F) cho kiếm, đại kiếm, thương, pháp khí; bản trẻ em (hậu tố C) cho pháp khí.
 * Mocap Mixamo là người nam: khép chân, nâng trọng tâm, hông lệch khi chờ, khuỷu gần thân; xoay bằng eo thay vì dạng chân.
 */
import type { OverlayDef } from "../pose";
import { femSet, type FemOpt } from "./fem";
import { fing, MUDRA, polish, rot } from "./polish";

type Mod = OverlayDef["mod"];
const READY: FemOpt = { half: 0.1, k: 0.55, up: 0.8, hip: 4, elbow: 0.3 };
const ACT: FemOpt = { half: 0.13, k: 0.6, up: 0.7 };
const HEAVY: FemOpt = { half: 0.15, k: 0.65, up: 0.6 };
const KID: FemOpt = { half: 0.08, k: 0.45, up: 0.95, hip: 2, toe: 2, elbow: 0.4 };
const tilt =
  (z: number): Mod =>
  (r) =>
    rot(r, "head", [0, 0, z]);
const atk = (p: string) => [1, 2, 3].map((i) => p + i).concat([p + "Skill", p + "Burst"]);

export const MELEE_FEM: Record<string, OverlayDef> = {
  ...femSet(["swReady", "spReady", "ctReady"], READY, "F", { swReady: tilt(-4), ctReady: tilt(-5) }),
  ...femSet(["grReady"], { ...READY, elbow: 0.1 }),
  ...femSet([...atk("sw"), "swDraw", "swStow", ...atk("sp"), "spDraw", "spStow"], ACT),
  ...femSet([...atk("gr"), "grDraw", "grStow"], HEAVY),
  ...femSet([...atk("ct"), "ctCharge", "ctDraw"], ACT),
  ...femSet([...atk("ct"), "ctCharge", "ctDraw"], KID, "C"),
  /** Trẻ em: thế chờ là nhún nhảy hồn nhiên (Happy Idle), đèn/sách tự lơ lửng, tay bắt ấn nhẹ. */
  ctReadyC: polish("idleHop", (r) => {
    fing(r, "r", MUDRA, 0.6);
    fing(r, "l", MUDRA, 0.6);
    rot(r, "head", [0, 0, -6]);
  }),
};
