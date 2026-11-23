/*
 * Điểm vào VFX bộ chiêu (S30). renderer3d gọi paintVfx mỗi khung; hiệu ứng nào có painter thì vẽ bằng
 * hệ mới (mesh + shader + hạt có hình), còn lại rơi về kit-fx cũ (trả về false).
 */
import type { Vfx } from "./system";
import { HAVY } from "./chars/havy";
import type { Cell } from "./tex";
import { catBurst } from "./weapons";

export interface Painters {
  fx?: Record<string, (f: any, X: Vfx) => void>;
  field?: Record<string, (fl: any, X: Vfx) => void>;
  proj?: (pr: any, X: Vfx) => void;
  /** Cảnh nộ, k = 0..1. */
  cine?: (k: number, X: Vfx) => void;
  /** Đang tụ trọng kích (p.charge). */
  charge?: (ch: any, X: Vfx) => void;
  /** Trạng thái kéo dài trên người đang điều khiển. */
  aura?: (m: any, X: Vfx) => void;
}
export const PAINTERS: Record<string, Painters> = { havy: HAVY };

export const paintFx = (f: any, X: Vfx) => {
  const p = PAINTERS[f.who]?.fx?.[f.id];
  if (!p) return false;
  p(f, X);
  return true;
};
export const paintField = (fl: any, X: Vfx) => {
  const p = PAINTERS[fl.m?.c.id]?.field?.[fl.fxId];
  if (!p) return false;
  p(fl, X);
  return true;
};
export const paintProj = (pr: any, X: Vfx) => {
  const p = PAINTERS[pr.m?.c.id]?.proj;
  if (!p) return false;
  p(pr, X);
  return true;
};
export function paintHero(G: any, m: any, X: Vfx) {
  const P = m && PAINTERS[m.c.id];
  if (!P) return false;
  P.aura?.(m, X);
  if (G.p.charge && !G.p.charge.done && G.p.charge.t > 0.1) P.charge?.(G.p.charge, X);
  if (G.cine && G.cine.m === m && P.cine) {
    P.cine(1 - Math.max(0, G.cine.t) / G.cine.max, X);
    return true;
  }
  return false;
}

/** Tia va chạm theo nguyên tố: [hình mảnh, màu lõi, màu đuôi]. */
const HIT: Record<string, [Cell, Cell, string, string]> = {
  ice: ["manhBang", "hoaTuyet", "#ffffff", "#5fb8ff"],
  water: ["giotNuoc", "sao4", "#e8fbff", "#2f8cff"],
  fire: ["tanLua", "canhMai", "#fff2c0", "#ff5a2a"],
  wind: ["soiGio", "longVu", "#f0fff8", "#4fe0b0"],
  bolt: ["tiaSet", "sao4", "#fbf0ff", "#b36bff"],
  earth: ["manhVo", "bui", "#fff0c8", "#c8902a"],
  wood: ["canhMai", "sao6", "#f4ffe0", "#6fcf4a"],
  phys: ["manhVo", "sao4", "#ffffff", "#c8c8d8"],
};
/** Trúng đòn: tia lửa kéo dài, mảnh vỡ có trọng lực, chớp sao, vòng xung nhỏ. Mạnh yếu theo hệ số đòn. */
export function paintHit(f: any, X: Vfx) {
  const V = X.V,
    x = f.x / V.TS,
    z = f.y / V.TS,
    y = V.ground(f.x, f.y) + 0.8,
    a = 1 - f.life / f.max,
    pw = Math.min(2.5, Math.max(0.5, f.pw ?? 1)) * (f.crit ? 1.4 : 1),
    [c1, c2, h0, h1] = HIT[f.el ?? "phys"] ?? HIT.phys;
  if (X.first(f)) {
    X.emit(Math.round(6 * pw), () => {
      const t = Math.random() * 6.28,
        u = Math.random() * 0.8 + 0.2,
        v = 6 + Math.random() * 6 * pw;
      return {
        cell: "tiaLua",
        x,
        y,
        z,
        vx: Math.cos(t) * v * u,
        vy: (Math.random() - 0.2) * v * 0.7,
        vz: Math.sin(t) * v * u,
        grav: 9,
        drag: 4,
        life: 0.22 + Math.random() * 0.12,
        size: 0.35 * pw,
        size1: 0.1,
        col: h0,
        col1: h1,
        stretch: 3,
      };
    });
    X.emit(Math.round(5 * pw), (i) => {
      const t = Math.random() * 6.28,
        v = 2 + Math.random() * 3.5;
      return {
        cell: i % 2 ? c1 : c2,
        x,
        y,
        z,
        vx: Math.cos(t) * v,
        vy: 2 + Math.random() * 3,
        vz: Math.sin(t) * v,
        grav: 10,
        drag: 1.2,
        life: 0.45 + Math.random() * 0.3,
        size: 0.22 + Math.random() * 0.12 * pw,
        size1: 0.06,
        col: h0,
        col1: h1,
        spin: (Math.random() - 0.5) * 14,
      };
    });
    X.emit(1, () => ({
      cell: "sao4",
      x,
      y,
      z,
      life: 0.16,
      size: 1.1 * pw,
      size1: 0.3,
      col: "#ffffff",
      col1: h1,
      rot: Math.random(),
    }));
  }
  if (f.w === "cat" && f.normal) catBurst(f, X);
  X.shock(x, y - 0.75, z, 0.9 * pw, a, [h0, h1, h1], 0.8);
  if (a < 0.4) X.flash(x, y, z, h1, (1 - a / 0.4) * 1.5 * pw, 0.9);
}
