import type { HudButton, LayoutItem } from "../../data/schema";
import { hudSize } from "../tokens";

/* Hình học bố cục nút HUD, tách khỏi DOM để kiểm thử. Toạ độ theo px của khung nhìn. */

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface Safe {
  l: number;
  r: number;
  t: number;
  b: number;
}
export const BTN_SIZE: Record<HudButton, "xl" | "lg" | "md" | "joy"> = {
  atk: "xl",
  skill: "lg",
  burst: "lg",
  jump: "lg",
  dash: "md",
  interact: "md",
  joy: "joy",
};
/** Cỡ cơ bản (trước scale) của một nút. */
export function baseSize(b: HudButton, vh: number, joyRadius: number) {
  const k = BTN_SIZE[b];
  return k === "joy" ? joyRadius * 2 + 20 : hudSize(vh)[k];
}
/** Khung của nút theo mục bố cục: dx, dy là khoảng từ góc (trừ vùng an toàn) tới tâm nút, đơn vị u = cỡ nút Đánh. */
export function itemRect(b: HudButton, it: LayoutItem, vw: number, vh: number, safe: Safe, joyRadius: number): Rect {
  const u = hudSize(vh).xl,
    s = baseSize(b, vh, joyRadius) * it.scale;
  const cx = it.anchor === "br" ? vw - safe.r - it.dx * u : safe.l + it.dx * u;
  const cy = vh - safe.b - it.dy * u;
  return { x: cx - s / 2, y: cy - s / 2, w: s, h: s };
}
/** Đổi tâm nút (px) về dx, dy theo góc neo. */
export function toItem(it: LayoutItem, cx: number, cy: number, vw: number, vh: number, safe: Safe): LayoutItem {
  const u = hudSize(vh).xl;
  const dx = it.anchor === "br" ? (vw - safe.r - cx) / u : (cx - safe.l) / u;
  const dy = (vh - safe.b - cy) / u;
  const r2 = (v: number) => Math.round(v * 100) / 100;
  return { ...it, dx: r2(Math.max(0, Math.min(12, dx))), dy: r2(Math.max(0, Math.min(8, dy))) };
}
/** Vùng giữa màn quanh nhân vật, không được đặt nút. */
export function centerZone(vw: number, vh: number, cs: { w: number; h: number }): Rect {
  const w = vw * cs.w,
    h = vh * cs.h;
  return { x: (vw - w) / 2, y: (vh - h) / 2, w, h };
}
export const overlaps = (a: Rect, b: Rect, pad = 0) =>
  a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad;
export const inside = (a: Rect, vw: number, vh: number, safe: Safe) =>
  a.x >= safe.l - 0.5 && a.y >= safe.t - 0.5 && a.x + a.w <= vw - safe.r + 0.5 && a.y + a.h <= vh - safe.b + 0.5;

/** Kiểm tra một bố cục: lỗi nếu nút ra ngoài màn, vào vùng giữa, chồng nút khác hoặc chồng phần HUD cố định (fixed). */
export function layoutProblems(
  rects: Partial<Record<HudButton, Rect>>,
  vw: number,
  vh: number,
  safe: Safe,
  cs: { w: number; h: number },
  fixed: Record<string, Rect> = {},
): string[] {
  const out: string[] = [];
  const cz = centerZone(vw, vh, cs);
  const ents = Object.entries(rects) as [HudButton, Rect][];
  for (const [b, r] of ents) {
    if (!inside(r, vw, vh, safe)) out.push(`${b}: ra ngoài màn`);
    if (overlaps(r, cz)) out.push(`${b}: vào vùng giữa màn`);
    for (const [f, fr] of Object.entries(fixed)) if (fr.w && overlaps(r, fr)) out.push(`${b} chồng ${f}`);
  }
  for (let i = 0; i < ents.length; i++)
    for (let j = i + 1; j < ents.length; j++)
      if (overlaps(ents[i]![1], ents[j]![1])) out.push(`${ents[i]![0]} chồng ${ents[j]![0]}`);
  return out;
}
