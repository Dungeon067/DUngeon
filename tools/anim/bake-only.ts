/**
 * Nướng riêng một số clip tự dựng vào public/media/anim/humanoid.json mà không cần nguồn mocap (art-src).
 * Dùng: pnpm exec tsx tools/anim/bake-only.ts walkStop sprintStop landRoll landHard
 */
import { readFileSync, writeFileSync } from "node:fs";
import { bake, overlay, Rig, type ClipDef, type OverlayDef } from "./pose";
import { MOVE_EXTRA } from "./s27/move-extra";
import { FEM_LOCO } from "./s27/fem-loco";

const FILE = "public/media/anim/humanoid.json";
const lib = JSON.parse(readFileSync(FILE, "utf8"));
const names = Object.keys(lib.clips.idle.bones);
const ALL: Record<string, ClipDef> = { ...MOVE_EXTRA };
const OVER: Record<string, OverlayDef> = { ...FEM_LOCO };
const want = process.argv.slice(2).length ? process.argv.slice(2) : [...Object.keys(ALL), ...Object.keys(OVER)];
const rig = new Rig();
for (const n of want) {
  if (ALL[n]) lib.clips[n] = bake(ALL[n], lib.fps, names, rig);
  else if (OVER[n]) lib.clips[n] = overlay(OVER[n], lib.clips, names, rig);
  else throw new Error(`Không có clip ${n}`);
  if (OVER[n] && lib.clips[OVER[n].from]?.loop) lib.clips[n].loop = true;
  console.log(n, lib.clips[n].n, "khung");
}
writeFileSync(FILE, JSON.stringify(lib));
