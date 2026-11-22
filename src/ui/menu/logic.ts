/** Logic thuần của menu S10 (không đụng DOM) để kiểm thử đơn vị. */

/** Cặp nguyên tố tạo phản ứng, cùng tên và quy tắc với src/combat/elements.ts. */
const PAIRS: [string, string, string][] = [
  ["fire", "water", "Bốc Hơi"],
  ["fire", "ice", "Tan Chảy"],
  ["fire", "bolt", "Quá Tải"],
  ["water", "bolt", "Điện Cảm"],
  ["water", "ice", "Đóng Băng"],
  ["bolt", "ice", "Siêu Dẫn"],
];
const SWIRL = ["fire", "water", "bolt", "ice"];

/** Các phản ứng một đội tạo được, theo thứ tự cố định. */
export function teamReactions(els: string[]): string[] {
  const has = new Set(els);
  const out = PAIRS.filter(([a, b]) => has.has(a) && has.has(b)).map((p) => p[2]);
  if (has.has("wind") && SWIRL.some((e) => has.has(e))) out.push("Khuếch Tán");
  if (has.has("earth") && SWIRL.some((e) => has.has(e))) out.push("Kết Tinh");
  return out;
}
export function reactionText(els: string[]) {
  const r = teamReactions(els);
  return r.length ? `Đội này tạo được ${r.join(", ")}` : "Đội này chưa tạo được phản ứng nào. Thử ghép hai nguyên tố khác nhau.";
}

/** Có quái đang giao chiến trong bán kính r quanh người chơi không (chặn đổi đội). */
export function inCombat(G: any, r: number): boolean {
  if (!G) return false;
  if (G.mode !== "world") return true;
  const p = G.p;
  const near = (e: any) => Math.hypot(e.x - p.x, e.y - p.y) < r;
  if (G.enemies?.some((e: any) => !e.dead && (e.state === "chase" || e.tele || e.hitT > 0) && near(e))) return true;
  return !!(G.boss && G.boss.hp > 0 && G.boss.state && G.boss.state !== "idle" && near(G.boss));
}

export type BagSort = "rarity" | "name" | "qty";
export interface BagRow {
  id: string;
  name: string;
  type: string;
  r: number;
  qty: number;
}
/** Lọc theo loại (hoặc "all") và sắp xếp túi đồ. Độ hiếm giảm dần, cùng độ hiếm thì theo tên. */
export function filterSort<T extends BagRow>(rows: T[], type: string, sort: BagSort): T[] {
  const byName = (a: T, b: T) => a.name.localeCompare(b.name, "vi");
  const f = rows.filter((r) => type === "all" || r.type === type);
  const cmp: Record<BagSort, (a: T, b: T) => number> = {
    rarity: (a, b) => b.r - a.r || byName(a, b),
    name: byName,
    qty: (a, b) => b.qty - a.qty || byName(a, b),
  };
  return f.sort(cmp[sort]);
}

/** Lịch sử ước nguyện lọc theo độ hiếm (0 = tất cả). */
export function filterHistory<T extends { r: number }>(h: T[], r: number) {
  return r ? h.filter((x) => x.r === r) : h;
}

/** Chỉ số ô sương (khối FOG ô) quanh một điểm tính bằng ô bản đồ. */
export function fogCells(tx: number, ty: number, fog: number, n: number, radius = 1): number[] {
  const cx = Math.floor(tx / fog),
    cy = Math.floor(ty / fog),
    out: number[] = [];
  for (let y = cy - radius; y <= cy + radius; y++)
    for (let x = cx - radius; x <= cx + radius; x++) if (x >= 0 && y >= 0 && x < n && y < n) out.push(y * n + x);
  return out;
}
