/**
 * Nhà Sao (S21): lõi dữ liệu nhà riêng, không phụ thuộc DOM (để unit test).
 * Đặt đồ trên lưới ô, xoay, gỡ; tính điểm Ấm Cúng (đồ đặt + bộ sưu tập đủ); mốc thưởng; Hộ Tinh tới thăm.
 */
import raw from "../../content/housing.yaml";

export interface Furniture {
  id: string;
  ten: string;
  kt: [number, number];
  gia: number;
  amCung: number;
  bo: string;
  hinh: string;
  mau: string;
  mau2: string;
}
export interface HomeData {
  ten: string;
  moTa: string;
  phong: { rong: number; sau: number };
  noiThat: Furniture[];
  bo: { id: string; ten: string; thuong: { daSao: number; xu: number }; them: number }[];
  moc: { can: number; thuong: { daSao: number; xu: number } }[];
  khach: { toiDa: number; thanThiet: number };
  loiKhach: string[];
}
export const HOME = raw as unknown as HomeData;
export const FURN: Record<string, Furniture> = Object.fromEntries(HOME.noiThat.map((f) => [f.id, f]));

export interface Placed {
  uid: number;
  id: string;
  x: number;
  y: number;
  rot: 0 | 1;
}
export interface HomeSave {
  kho: Record<string, number>;
  dat: Placed[];
  seq: number;
  moc: number[];
  bo: string[];
  khach: string[];
  noiNgay: Record<string, string>;
}

export function freshHome(): HomeSave {
  return {
    kho: { "ghe-dau": 1, "ban-go": 1, "den-long-do": 1 },
    dat: [],
    seq: 0,
    moc: [],
    bo: [],
    khach: [],
    noiNgay: {},
  };
}
/** Chuẩn hóa dữ liệu nhà trong save (save cũ chưa có, hoặc hỏng một phần). */
export function normHome(v: any): HomeSave {
  const o = v && typeof v === "object" ? v : freshHome();
  const kho: Record<string, number> = {};
  for (const [k, n] of Object.entries<any>(o.kho ?? {})) if (FURN[k] && n > 0) kho[k] = Math.floor(n);
  const dat: Placed[] = Array.isArray(o.dat)
    ? o.dat.filter((p: any) => FURN[p?.id] && Number.isFinite(p.x) && Number.isFinite(p.y))
    : [];
  return {
    kho,
    dat,
    seq: Math.max(Number(o.seq) || 0, ...dat.map((p) => p.uid)),
    moc: Array.isArray(o.moc) ? o.moc.filter((x: any) => typeof x === "number") : [],
    bo: Array.isArray(o.bo) ? o.bo.filter((x: any) => typeof x === "string") : [],
    khach: Array.isArray(o.khach) ? o.khach.filter((x: any) => typeof x === "string").slice(0, HOME.khach.toiDa) : [],
    noiNgay: o.noiNgay && typeof o.noiNgay === "object" ? o.noiNgay : {},
  };
}

export const size = (p: { id: string; rot: number }): [number, number] => {
  const k = FURN[p.id]!.kt;
  return p.rot ? [k[1], k[0]] : [k[0], k[1]];
};
/** Số món còn trong kho (đã mua trừ đã đặt). */
export const free = (H: HomeSave, id: string) => (H.kho[id] ?? 0) - H.dat.filter((p) => p.id === id).length;

/** Thảm đặt dưới được, đồ khác không chồng lên nhau. */
const isRug = (id: string) => FURN[id]?.hinh === "tham";
export function fits(H: HomeSave, p: Omit<Placed, "uid">, ignore?: number): boolean {
  const [w, d] = size(p),
    R = HOME.phong;
  if (p.x < 0 || p.y < 0 || p.x + w > R.rong || p.y + d > R.sau) return false;
  for (const q of H.dat) {
    if (q.uid === ignore) continue;
    if (isRug(q.id) !== isRug(p.id)) continue;
    const [qw, qd] = size(q);
    if (p.x < q.x + qw && q.x < p.x + w && p.y < q.y + qd && q.y < p.y + d) return false;
  }
  return true;
}

export function buy(H: HomeSave, id: string, coin: number): number {
  const f = FURN[id];
  if (!f) throw new Error("Không có món này");
  if (coin < f.gia) throw new Error("Không đủ Xu");
  H.kho[id] = (H.kho[id] ?? 0) + 1;
  return f.gia;
}
export function place(H: HomeSave, p: Omit<Placed, "uid">): Placed {
  if (free(H, p.id) <= 0) throw new Error("Hết món này trong kho");
  if (!fits(H, p)) throw new Error("Chỗ này không đặt được");
  const n: Placed = { ...p, uid: ++H.seq };
  H.dat.push(n);
  return n;
}
export function move(H: HomeSave, uid: number, x: number, y: number, rot: 0 | 1) {
  const q = H.dat.find((p) => p.uid === uid);
  if (!q) throw new Error("Không có món này");
  if (!fits(H, { id: q.id, x, y, rot }, uid)) throw new Error("Chỗ này không đặt được");
  Object.assign(q, { x, y, rot });
  return q;
}
export function remove(H: HomeSave, uid: number) {
  H.dat = H.dat.filter((p) => p.uid !== uid);
}

/** Bộ đã đủ (mọi món trong bộ có ít nhất một cái đang đặt). */
export function setsDone(H: HomeSave) {
  const placed = new Set(H.dat.map((p) => p.id));
  return HOME.bo.filter((b) => HOME.noiThat.filter((f) => f.bo === b.id).every((f) => placed.has(f.id)));
}
/** Điểm Ấm Cúng: mỗi loại đồ tính đủ điểm cho cái đầu, cái lặp lại tính một nửa; cộng điểm bộ đủ. */
export function comfort(H: HomeSave) {
  const seen = new Set<string>();
  let s = 0;
  for (const p of H.dat) {
    const f = FURN[p.id]!;
    s += seen.has(p.id) ? Math.floor(f.amCung / 2) : f.amCung;
    seen.add(p.id);
  }
  for (const b of setsDone(H)) s += b.them;
  return s;
}
