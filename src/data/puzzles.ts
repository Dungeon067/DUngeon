import raw from "../../content/puzzles.yaml";
import { CHARS } from "./content";
import { validatePuzzles } from "./puzzles-schema";
import type { Domain, Mini, Puzzle } from "./puzzles-schema";

export const PUZZLES = validatePuzzles(raw, CHARS);
export const PZ: Record<string, Puzzle> = Object.fromEntries(PUZZLES.cauDo.map((p) => [p.id, p]));
export const DOMAINS: Domain[] = PUZZLES.biCanh;
export const MINI: Mini[] = PUZZLES.mini;
export const OBJ = PUZZLES.loai;
/** Câu đố đặt trên đảo (không thuộc phòng bí cảnh). */
export const WORLD_PUZZLES = PUZZLES.cauDo.filter((p) => p.dat);
export const domainOfGate = (pid: string) => DOMAINS.find((d) => d.cua === pid) ?? null;
