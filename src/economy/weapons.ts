/** S24: vũ khí trong túi người chơi. Hàm thuần, không đụng tới hồ sơ hay giao diện. */
import type { Economy, Weapon } from "../data/economy-schema";
import { weaponLvScale, weaponOf } from "./core";

export type WeaponType = Weapon["loai"];

/** Một bản vũ khí người chơi đang có. `khai` là số lần đột phá (0..6), `tl` là tinh luyện R1–R5. */
export interface WeaponInst {
  uid: string;
  id: string;
  lv: number;
  exp: number;
  khai: number;
  tl: number;
  lock: boolean;
}

export const newWeapon = (uid: string, id: string): WeaponInst => ({
  uid,
  id,
  lv: 1,
  exp: 0,
  khai: 0,
  tl: 1,
  lock: false,
});

/** Giới hạn cấp hiện tại theo số lần đột phá. */
export const lvCapOf = (w: Pick<WeaponInst, "khai">, E: Economy) =>
  E.thietKe.vuKhi.cap.gioiHan[Math.min(6, Math.max(0, w.khai))]!;

/** Kinh nghiệm cần để lên từ cấp lv lên lv + 1. */
export const expToNext = (lv: number, E: Economy) => {
  const k = E.thietKe.vuKhi.cap.kinhNghiem;
  return k.goc + k.moiCap * (lv - 1);
};

/** Tổng kinh nghiệm đã dồn vào vũ khí (dùng khi đem nó làm nguyên liệu). */
export function totalExp(w: WeaponInst, E: Economy) {
  let s = w.exp;
  for (let l = 1; l < w.lv; l++) s += expToNext(l, E);
  return s;
}

/** Kinh nghiệm nhận được khi dùng vũ khí `w` làm nguyên liệu. */
export function fodderExp(w: WeaponInst, E: Economy) {
  const def = weaponOf(w.id, E);
  return E.thietKe.vuKhi.cap.kinhNghiemVuKhi[def.r - 3]! + Math.floor(totalExp(w, E) * 0.8);
}

/** Thêm kinh nghiệm, dừng ở giới hạn cấp hiện tại (kinh nghiệm thừa bỏ đi). Trả về số kinh nghiệm thực nhận. */
export function addExp(w: WeaponInst, n: number, E: Economy) {
  const cap = lvCapOf(w, E);
  let used = 0;
  let left = Math.max(0, Math.floor(n));
  while (left > 0 && w.lv < cap) {
    const need = expToNext(w.lv, E) - w.exp;
    if (left >= need) {
      left -= need;
      used += need;
      w.lv++;
      w.exp = 0;
    } else {
      w.exp += left;
      used += left;
      left = 0;
    }
  }
  return used;
}

/** Xem trước cấp sẽ đạt nếu thêm n kinh nghiệm (không đổi `w`). */
export function previewExp(w: WeaponInst, n: number, E: Economy) {
  const c = { ...w };
  const used = addExp(c, n, E);
  return { lv: c.lv, exp: c.exp, used, cap: lvCapOf(c, E) };
}

/** Chi phí đột phá kế tiếp, null nếu đã đột phá đủ. Chỉ đột phá được khi đã chạm giới hạn cấp. */
export function ascendCost(w: WeaponInst, E: Economy) {
  if (w.khai >= 6) return null;
  const d = E.thietKe.vuKhi.cap.dotPha;
  return { quang: d.quang[w.khai]!, xu: d.xu[w.khai]!, quangId: E.thietKe.vuKhi.quang[2]!.id };
}

/** Chỉ số vũ khí ở cấp hiện tại: tấn công % và chỉ số phụ đã nhân hệ số cấp, bị động theo bậc tinh luyện. */
export function weaponStats(w: Pick<WeaponInst, "id" | "lv" | "tl">, E: Economy) {
  const def = weaponOf(w.id, E);
  const s = weaponLvScale(w.lv, E);
  return {
    tanCong: def.tanCong * s,
    phu: { loai: def.phu.loai, giaTri: def.phu.giaTri * s },
    biDong: passiveLevels(def, E).map((v, i) => ({ r: i + 1, satThuong: v, on: i + 1 === w.tl })),
  };
}

/** Giá trị bị động ở cả 5 bậc tinh luyện. */
export const passiveLevels = (def: Weapon, E: Economy) =>
  [1, 2, 3, 4, 5].map((r) => def.biDong.satThuong * (1 + E.thietKe.vuKhi.buocTinhLuyen * (r - 1)));

export const defaultWeaponFor = (loai: WeaponType, E: Economy) => E.thietKe.vuKhi.macDinh[loai]!;
