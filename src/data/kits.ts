import statuses from "../../content/statuses.yaml";
import { CHARS } from "./content";
import { validateKits } from "./kit-schema";
import type { Kit, StatusDef } from "./kit-schema";

const raw = import.meta.glob<unknown>("../../content/kits/*.yaml", { eager: true, import: "default" });
const V = validateKits(
  raw,
  statuses,
  CHARS.map((c) => c.id),
);

export const KITS: Record<string, Kit> = V.kits;
export const STATUS: Record<string, StatusDef> = Object.fromEntries(V.statuses.trangThai.map((s) => [s.id, s]));
export const STATUS_TRAN: Partial<Record<StatusDef["chiSo"], number>> = V.statuses.tran;
/** Bộ chiêu riêng của thành viên đội, hoặc undefined nếu nhân vật còn dùng kiểu chiêu chung. */
export const kitOf = (m: any): Kit | undefined => (m ? KITS[m.c?.id ?? m.id] : undefined);
