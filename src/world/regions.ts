/**
 * Vùng và hiệu ứng địa hình (S12). Mỗi ô đất thuộc vùng có tâm gần nhất (content/terrain.yaml, `seed`).
 * hệ số(key) = địa hình.effects[key] × vùng.effects[key] × vùng.terrain[địa hình][key] (xem docs/world/dinh-dang-ban-do.md).
 */
import { TERRAIN } from "../data/content";
import { MH, MW, TS } from "./map";

export const REGIONS = TERRAIN.regions;

/** Gán vùng cho mọi ô không phải nước sâu. */
export function assignRegions(region: Uint8Array, terrain: Uint8Array, cx: number, cy: number) {
  const deep = TERRAIN.terrains.findIndex((t) => t.id === "nuoc-sau");
  const seeds = REGIONS.map((r, i) => (r.seed ? { i, x: cx + r.seed[0], y: cy + r.seed[1] } : null)).filter(
    (s): s is { i: number; x: number; y: number } => !!s,
  );
  if (!seeds.length) return;
  for (let y = 0; y < MH; y++)
    for (let x = 0; x < MW; x++) {
      const k = y * MW + x;
      if (terrain[k] === deep) continue;
      let best = 0,
        bd = Infinity;
      for (const s of seeds) {
        const d = (s.x - x) ** 2 + (s.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = s.i;
        }
      }
      region[k] = best;
    }
}

/** Chỉ số vùng và địa hình tại tọa độ thế giới (px). */
export function cellAt(W: any, x: number, y: number) {
  const tx = Math.floor(x / TS),
    ty = Math.floor(y / TS);
  if (!W?.region || tx < 0 || ty < 0 || tx >= MW || ty >= MH) return { r: 0, t: 0 };
  const k = ty * MW + tx;
  return { r: W.region[k] ?? 0, t: W.terrain?.[k] ?? 0 };
}

/** Hệ số hiệu ứng tại vị trí (1 = không đổi). */
export function effectAt(W: any, x: number, y: number, key: string): number {
  const { r, t } = cellAt(W, x, y);
  const T = TERRAIN.terrains[t],
    R = REGIONS[r];
  return (T?.effects?.[key] ?? 1) * (R?.effects?.[key] ?? 1) * ((T && R?.terrain?.[T.id]?.[key]) ?? 1);
}

const KEY_NAME: Record<string, string> = {
  moveSpeed: "Tốc chạy",
  staminaRegen: "Hồi thể lực",
  dashStamina: "Thể lực khi lướt",
  fireDmg: "Sát thương Hỏa",
  waterDmg: "Sát thương Thủy",
  windDmg: "Sát thương Phong",
  boltDmg: "Sát thương Lôi",
  earthDmg: "Sát thương Thổ",
  iceDmg: "Sát thương Băng",
};
/** Dòng mô tả hiệu ứng của vùng, ví dụ "Sát thương Hỏa +10%". */
export function regionEffectText(i: number): string[] {
  const R = REGIONS[i];
  if (!R) return [];
  return Object.entries(R.effects ?? {}).map(([k, v]) => {
    const pct = Math.round((v - 1) * 100);
    return `${KEY_NAME[k] ?? k} ${pct > 0 ? "+" : ""}${pct}%`;
  });
}
