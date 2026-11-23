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

const FILE = "public/media/anim/humanoid.json";
const lib = JSON.parse(readFileSync(FILE, "utf8"));
const names = Object.keys(lib.clips.idle.bones);
const ALL: Record<string, ClipDef> = { ...UNARMED, ...BOW, ...MELEE };
const OVER: Record<string, OverlayDef> = { ...BOW_MOVE, ...MELEE_MOVE };
const rig = new Rig();
for (const n of MOVE_BASE) {
  lib.clips[n] = upright(n, names, rig);
  console.log(n, lib.clips[n].n, "khung (thẳng lưng)");
}
for (const [n, c] of Object.entries(ALL)) {
  lib.clips[n] = bake(c, lib.fps, names, rig);
  console.log(n, lib.clips[n].n, "khung");
}
for (const [n, o] of Object.entries(OVER)) {
  lib.clips[n] = overlay(o, lib.clips, names, rig);
  console.log(n, lib.clips[n].n, "khung (chồng lớp)");
}
for (const k of ["tRelax", "tDraw", "tStand"]) delete lib.clips[k];
writeFileSync(FILE, JSON.stringify(lib));
