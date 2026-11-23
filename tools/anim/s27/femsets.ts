/**
 * Bản nữ (hậu tố F) cho kiếm, đại kiếm, thương, pháp khí; bản trẻ em (hậu tố C) cho pháp khí.
 * Mocap Mixamo là người nam: khép chân, nâng trọng tâm, hông lệch khi chờ, khuỷu gần thân; xoay bằng eo thay vì dạng chân.
 */
import type { OverlayDef } from "../pose";
import { femSet, type FemOpt } from "./fem";
import { fing, ik, MUDRA, polish, rot } from "./polish";
import { SP_SIDE } from "./spear";

type Mod = OverlayDef["mod"];
const READY: FemOpt = { half: 0.1, k: 0.55, up: 0.8, hip: 4, elbow: 0.3 };
const ACT: FemOpt = { half: 0.13, k: 0.6, up: 0.7 };
const HEAVY: FemOpt = { half: 0.15, k: 0.65, up: 0.6 };
const KID: FemOpt = { half: 0.08, k: 0.45, up: 0.95, hip: 2, toe: 2, elbow: 0.4 };
const tilt =
  (z: number): Mod =>
  (r) =>
    rot(r, "head", [0, 0, z]);
/** Trẻ em: bớt đổ người tới khi ra đòn. */
const upright =
  (k: number): Mod =>
  (r) => {
    rot(r, "spine", [-9 * k, 0, 0]);
    rot(r, "chest", [-6 * k, 0, 0]);
    rot(r, "neck", [5 * k, 0, 0]);
  };
const atk = (p: string) => [1, 2, 3].map((i) => p + i).concat([p + "Skill", p + "Burst"]);

export const MELEE_FEM: Record<string, OverlayDef> = {
  ...femSet(["swReady", "spReady", "ctReady"], READY, "F", {
    swReady: tilt(-4),
    ctReady: tilt(-5),
    // Nắm cao hơn để đuôi cán không cắm xuống đất.
    spReady: (r) => {
      const h = r.pos("hips");
      ik(r, "r", { ...SP_SIDE, p: [h.x + SP_SIDE.p[0], h.y + SP_SIDE.p[1] + 0.12, h.z + SP_SIDE.p[2]] });
    },
  }),
  ...femSet(["grReady"], { ...READY, elbow: 0.1 }),
  ...femSet([...atk("sw"), "swDraw", "swStow", ...atk("sp"), "spDraw", "spStow"], ACT),
  ...femSet([...atk("gr"), "grDraw", "grStow"], HEAVY),
  ...femSet([...atk("ct"), "ctCharge", "ctDraw"], ACT),
  ...femSet(["ct2", "ctSkill", "ctBurst", "ctCharge", "ctDraw"], KID, "C"),
  ...femSet(["ct1", "ct3"], { ...KID, pitch: 12 }, "C", { ct1: upright(0.6), ct3: upright(1) }),
  /** Trẻ em: thế chờ là nhún nhảy hồn nhiên (Happy Idle), đèn/sách tự lơ lửng, tay bắt ấn nhẹ. */
  ctReadyC: polish("idleHop", (r) => {
    fing(r, "r", MUDRA, 0.6);
    fing(r, "l", MUDRA, 0.6);
    rot(r, "head", [0, 0, -6]);
  }),
};
