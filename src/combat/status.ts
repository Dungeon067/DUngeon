import { STATUS, STATUS_TRAN } from "../data/kits";
import type { ChiSo } from "../data/kit-schema";

/* Buff và debuff (S30). Luật cộng: docs/combat/he-trang-thai.md.
   Đối tượng nào cũng được (thành viên đội, quái): trạng thái nằm trong mảng `sts`. */

export interface Sts {
  id: string;
  /** Thời gian còn lại và tổng thời gian, giây. */
  t: number;
  max: number;
  /** Giá trị một tầng. */
  v: number;
  n: number;
  el: string | null;
}

export function addStatus(tg: any, id: string, o: { v?: number; t: number; el?: string | null }): Sts | null {
  const d = STATUS[id];
  if (!d || !tg) return null;
  const arr: Sts[] = (tg.sts ??= []);
  const el = o.el ?? null;
  const v = o.v ?? 0;
  const s = arr.find((x) => x.id === id && x.el === el);
  if (s) {
    if (d.cong === "tang") s.n = Math.min(d.toiDa, s.n + 1);
    s.v = Math.max(s.v, v);
    if (o.t >= s.t) s.t = s.max = o.t;
    return s;
  }
  const ns: Sts = { id, t: o.t, max: o.t, v, n: 1, el };
  arr.push(ns);
  return ns;
}
export function tickStatuses(tg: any, dt: number) {
  if (!tg?.sts?.length) return;
  for (const s of tg.sts as Sts[]) s.t -= dt;
  tg.sts = (tg.sts as Sts[]).filter((s) => s.t > 0);
}
export const stacksOf = (tg: any, id: string): number =>
  (tg?.sts as Sts[] | undefined)?.find((s) => s.id === id)?.n ?? 0;
export const hasStatus = (tg: any, id: string) => stacksOf(tg, id) > 0;
/** Gỡ trạng thái, trả về số tầng đã có. */
export function consumeStatus(tg: any, id: string): number {
  const n = stacksOf(tg, id);
  if (n) tg.sts = (tg.sts as Sts[]).filter((s) => s.id !== id);
  return n;
}
/**
 * Tổng một chỉ số từ mọi trạng thái. Trong cùng nhóm (và cùng nguyên tố) chỉ tính cái mạnh nhất,
 * các nhóm khác nhau cộng với nhau, rồi chặn ở trần của content/statuses.yaml.
 * `el`: nguyên tố của đòn ("vatLy" cho đòn vật lý); trạng thái gắn nguyên tố chỉ tính khi khớp.
 */
export function statSum(tg: any, chiSo: ChiSo, el?: string | null): number {
  const arr = tg?.sts as Sts[] | undefined;
  if (!arr?.length) return 0;
  const best = new Map<string, number>();
  for (const s of arr) {
    const d = STATUS[s.id]!;
    if (d.chiSo !== chiSo) continue;
    if (s.el && s.el !== el) continue;
    const g = `${d.nhom ?? d.id}:${s.el ?? ""}`;
    best.set(g, Math.max(best.get(g) ?? 0, s.v * s.n));
  }
  let sum = 0;
  for (const v of best.values()) sum += v;
  return Math.min(sum, STATUS_TRAN[chiSo] ?? Infinity);
}
/** Nguyên tố được gán cho đòn đánh thường (Sóng Bạc, Thiên Lôi), nếu có. */
export function infusionOf(tg: any): string | null {
  for (const s of (tg?.sts as Sts[] | undefined) ?? []) {
    const g = STATUS[s.id]?.gan;
    if (g) return g;
  }
  return null;
}

/* ---------- công thức chỉ số phụ ---------- */
/** Hệ số kháng: kháng âm giảm một nửa, kháng cao giảm dần (thể loại nhập vai gacha). */
export function resMult(r: number) {
  return r < 0 ? 1 - r / 2 : r < 0.75 ? 1 - r : 1 / (4 * r + 1);
}
/** Phòng thủ chuẩn hóa: quái chưa bị giảm phòng thủ nhận đúng 100% như trước S30. */
export const defMult = (cut: number, base = 0.5) => (1 - base * (1 - Math.min(cut, 0.9))) / (1 - base);
/** Thưởng tinh thông cho phản ứng khuếch đại (Bốc Hơi, Tan Chảy). */
export const emAmp = (tt: number) => (2.78 * tt) / (tt + 1400);
/** Thưởng tinh thông cho phản ứng biến đổi (Quá Tải, Điện Cảm, Siêu Dẫn, Khuếch Tán). */
export const emTrans = (tt: number) => (16 * tt) / (tt + 2000);

/** Tinh thông nguyên tố hiện tại của thành viên đội. */
export const ttOf = (m: any) => (m?.st?.tt ?? 0) + statSum(m, "tinhThong");
/** Hệ số hồi năng lượng hiện tại (1 = 100%). */
export const hnOf = (m: any) => (m?.st?.hn ?? 1) + statSum(m, "hoiNang");
/** Kháng gốc của quái và hệ số phòng thủ gốc (chuẩn hóa: quái chưa bị debuff nhận đúng sát thương cũ). */
export const KHANG_GOC = 0.1;
/** Hệ số sát thương quái nhận thêm do debuff: giảm kháng, giảm phòng thủ, đánh dấu, Siêu Dẫn. */
export function takenMult(e: any, el: string | null | undefined) {
  const k = el || "vatLy";
  return (
    (e.vuln > 0 ? 1.25 : 1) *
    (1 + statSum(e, "danhDau")) *
    (resMult(KHANG_GOC - statSum(e, "giamKhang", k)) / resMult(KHANG_GOC)) *
    defMult(statSum(e, "giamPhongThu"))
  );
}
