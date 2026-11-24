/**
 * Nướng riêng một số clip tự dựng vào public/media/anim/humanoid.json mà không cần nguồn mocap (art-src).
 * Dùng: pnpm exec tsx tools/anim/bake-only.ts walkStop sprintStop landRoll landHard
 */
import { readFileSync, writeFileSync } from "node:fs";
import { bake, Rig, type ClipDef } from "./pose";
import { MOVE_EXTRA } from "./s27/move-extra";

const FILE = "public/media/anim/humanoid.json";
const lib = JSON.parse(readFileSync(FILE, "utf8"));
const names = Object.keys(lib.clips.idle.bones);
const ALL: Record<string, ClipDef> = { ...MOVE_EXTRA };
const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ALL);
const rig = new Rig();
for (const n of want) {
  if (!ALL[n]) throw new Error(`Không có clip ${n}`);
  lib.clips[n] = bake(ALL[n], lib.fps, names, rig);
  console.log(n, lib.clips[n].n, "khung");
}
writeFileSync(FILE, JSON.stringify(lib));
