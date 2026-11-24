/**
 * Nướng các clip S27 (tools/anim/s27) vào public/media/anim/humanoid.json.
 * Dùng: pnpm exec tsx tools/anim/build.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { bake, overlay, Rig, type ClipDef, type OverlayDef } from "./pose";
import { BOW, BOW_MOVE } from "./s27/bow";
import { UNARMED } from "./s27/unarmed";
import { MELEE, MELEE_MOVE } from "./s27/melee";
import { MOVE_BASE, upright } from "./s27/move";
import { SHARED_CLIPS } from "./s27/shared";
import { bakeMocap, type MocapRecipe } from "./mocap";
import { SW_MC, SW_POL } from "./s27/sword";
import { GR_MC, GR_POL } from "./s27/great";
import { CT_MC, CT_POL } from "./s27/cat";
import { SP_MC, SP_POL } from "./s27/spear";
import { BW_FEM, BW_MC, BW_POL } from "./s27/bowpol";
import { MELEE_FEM } from "./s27/femsets";

const FILE = "public/media/anim/humanoid.json";
const lib = JSON.parse(readFileSync(FILE, "utf8"));
const names = Object.keys(lib.clips.idle.bones);
const ALL: Record<string, ClipDef> = { ...SHARED_CLIPS, ...UNARMED, ...BOW, ...MELEE };
const OVER: Record<string, OverlayDef> = {
  ...SW_POL,
  ...GR_POL,
  ...CT_POL,
  ...SP_POL,
  ...BW_POL,
  ...BOW_MOVE,
  ...MELEE_MOVE,
  ...BW_FEM,
  ...MELEE_FEM,
};
const rig = new Rig();
for (const n of MOVE_BASE) {
  lib.clips[n] = upright(n, names, rig);
  console.log(n, lib.clips[n].n, "khung (thẳng lưng)");
}
for (const [n, c] of Object.entries(ALL)) {
  lib.clips[n] = bake(c, lib.fps, names, rig);
  console.log(n, lib.clips[n].n, "khung");
}
const MC: Record<string, MocapRecipe> = {
  relax: { file: "mx/idle_catwalk", from: 0, to: 10, loop: true },
  relaxNam: { file: "mx/idle_neutral", from: 0, to: 8.7, loop: true },
  idleLook: { file: "mx/idle_look2", from: 0, to: 5.2 },
  idleStretch: { file: "mx/idle_stretch", from: 0, to: 8.87 },
  idleHair: { file: "mx/idle_twistR", from: 0, to: 5.17 },
  idleHop: { file: "mx/idle_happy", from: 0, to: 2 },
  walk: { file: "mx/walk_f", from: 0, to: 1.17, loop: true, inPlace: true, straight: 0.85, lean: 6 },
  run: { file: "mx/run", from: 0, to: 0.63, loop: true, inPlace: true, straight: 0.6, lean: 13 },
  sprint: { file: "mx/sprint", from: 0, to: 0.53, loop: true, inPlace: true, straight: 0.6, lean: 17 },
  runStop: { file: "mx/run_stop", from: 0, to: 0.9, inPlace: true },
  jumpUp: { file: "mx/jump_up", from: 0.5, to: 0.83 },
  dash: { file: "mx/sprint", from: 0, to: 0.3, inPlace: true },
  hurt: { file: "mx/bow_standing_react_small_from_front", from: 0, to: 1.27 },
  die: { file: "mx/bow_standing_death_backward_01", from: 0, to: 3.1 },
  jumpAir: { file: "mx/fall_idle", from: 0, to: 0.7, loop: true },
  jumpLand: { file: "mx/fall_land", from: 0.3, to: 1.07 },
  getUp: { file: "mx/getup", from: 0, to: 8.33 },
  bowReady: { file: "79_86", from: 0.2, to: 0.95, loop: true, aim: 3.3 },
  bowAim: { file: "79_86", from: 3.0, to: 3.7, loop: true, aim: 3.3 },
  bow1: {
    file: "79_86",
    segs: [
      [2.45, 3.05, 3],
      [3.05, 3.15, 1],
      [4.28, 4.75, 1.5],
    ],
    from: 0,
    to: 0,
    aim: 3.3,
  },
  "mc.bowFull": { file: "79_86", from: 1.0, to: 4.9, aim: 3.3 },
  ...SW_MC,
  ...GR_MC,
  ...CT_MC,
  ...SP_MC,
  ...BW_MC,
};
for (const [n, r] of Object.entries(MC)) {
  lib.clips[n] = bakeMocap(r, names, lib.clips.relax ?? lib.clips.idle, lib.fps);
  console.log(n, lib.clips[n].n, "khung (mocap CMU)");
}
lib.clips.bow2 = lib.clips.bow3 = lib.clips.bow1;

for (const [n, o] of Object.entries(OVER)) {
  lib.clips[n] = overlay(o, lib.clips, names, rig);
  console.log(n, lib.clips[n].n, "khung (chồng lớp)");
}
for (const k of ["tRelax", "tDraw", "tStand"]) delete lib.clips[k];
for (const k of Object.keys(lib.clips))
  if (
    k.startsWith("t.") ||
    k.startsWith("mc.sw") ||
    k.startsWith("mc.gr") ||
    k.startsWith("mc.ct") ||
    k.startsWith("mc.sp") ||
    k.startsWith("mc.bw")
  )
    delete lib.clips[k];
writeFileSync(FILE, JSON.stringify(lib));
