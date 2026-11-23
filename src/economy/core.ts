/**
 * Công thức kinh tế và Chiến Lực dùng chung cho game, trang Admin và công cụ mô phỏng (tools/economy).
 * Không đọc trạng thái toàn cục: mọi con số lấy từ `E` (content/economy.yaml).
 */
import type { Economy, Weapon } from "../data/economy-schema";

export type Rng = () => number;

export interface BaseChar {
  r: number;
  hp: number;
  atk: number;
}
/** Mức đầu tư của một nhân vật. Các trường thiết kế (khai, kyNang, vuKhi, baoAn) để trống khi tính trong game. */
export interface Invest {
  lv: number;
  cons: number;
  khai?: number;
  kyNang?: number;
  /** Vũ khí theo id trong thietKe.vuKhi.danhSach, tinh luyện 1–5. */
  vuKhi?: { id: string; tinhLuyen: number; lv?: number } | null;
  /** Chất lượng Bảo Ấn 0..1 (đủ bộ 4 ô khi > 0). */
  baoAn?: number;
}
export interface Stats {
  lv: number;
  cons: number;
  hp: number;
  atk: number;
  crit: number;
  cdmg: number;
  /** Tăng sát thương cộng dồn (bị động vũ khí, Bộ Ấn). */
  dmg: number;
  /** Thưởng kỹ năng nhân vào Chiến Lực. */
  skill: number;
}

const rk = (r: number) => (r >= 5 ? "5" : "4") as "4" | "5";

export function lvCost(lv: number, E: Economy) {
  const c = E.game.capNhanVat;
  return { books: c.sachGoc + Math.floor(lv / c.sachMoi), coin: c.xuGoc + lv * c.xuMoiCap };
}

/** Tổng Sách và Xu để đưa nhân vật từ cấp `from` lên `to`. */
export function lvCostRange(from: number, to: number, E: Economy) {
  let books = 0,
    coin = 0;
  for (let l = from; l < to; l++) {
    const c = lvCost(l, E);
    books += c.books;
    coin += c.coin;
  }
  return { books, coin };
}

const weaponCache = new WeakMap<object, Map<string, Weapon>>();
export function weaponOf(id: string, E: Economy): Weapon {
  let m = weaponCache.get(E.thietKe.vuKhi.danhSach);
  if (!m) weaponCache.set(E.thietKe.vuKhi.danhSach, (m = new Map(E.thietKe.vuKhi.danhSach.map((w) => [w.id, w]))));
  const w = m.get(id);
  if (!w) throw new Error(`Không có vũ khí "${id}"`);
  return w;
}
/** Bị động vũ khí ở bậc tinh luyện R (1–5): R1 × (1 + buocTinhLuyen × (R − 1)). */
export const passiveAt = (w: Weapon, tinhLuyen: number, E: Economy) =>
  w.biDong.satThuong * (1 + E.thietKe.vuKhi.buocTinhLuyen * (Math.min(5, Math.max(1, tinhLuyen)) - 1));

/** Hệ số chỉ số vũ khí theo cấp: heSoCap1 ở cấp 1, tăng đều tới 1 ở cấp tối đa. Không có cấp = cấp tối đa. */
export function weaponLvScale(lv: number | undefined, E: Economy) {
  const c = E.thietKe.vuKhi.cap;
  if (lv === undefined) return 1;
  const l = Math.min(c.toiDa, Math.max(1, lv));
  return c.heSoCap1 + ((1 - c.heSoCap1) * (l - 1)) / (c.toiDa - 1);
}

export function charStats(b: BaseChar, s: Invest, E: Economy): Stats {
  const G = E.game,
    T = E.thietKe;
  const g = 1 + (s.lv - 1) * G.capNhanVat.tangMoiCap,
    cb = 1 + s.cons * G.netSao.tangMoiNet,
    kt = 1 + (s.khai ?? 0) * T.khaiTinh.tangMoiBac;
  const w = s.vuKhi ? weaponOf(s.vuKhi.id, E) : null;
  const ba = s.baoAn ?? 0;
  const ws = w ? weaponLvScale(s.vuKhi!.lv, E) : 0;
  const ph = (k: Weapon["phu"]["loai"]) => (w && w.phu.loai === k ? w.phu.giaTri * ws : 0);
  const atkPct = 1 + (w ? w.tanCong * ws : 0) + ph("tanCong") + ba * T.baoAn.tanCongToiDa,
    hpPct = 1 + ba * T.baoAn.mauToiDa;
  const cm = G.chiMang[rk(b.r)];
  return {
    lv: s.lv,
    cons: s.cons,
    hp: Math.round(b.hp * g * cb * kt * hpPct),
    atk: Math.round(b.atk * g * cb * kt * atkPct),
    crit: Math.min(1, cm.tiLe + ph("chiMang")),
    cdmg: cm.satThuong + ph("satThuongChiMang"),
    dmg: (w ? passiveAt(w, s.vuKhi!.tinhLuyen, E) : 0) + (ba > 0 ? T.baoAn.boAn : 0),
    skill: Math.max(0, (s.kyNang ?? 1) - 1) * T.kyNang.tangMoiCap,
  };
}

/** Tấn công hiệu quả: Tấn công × kỳ vọng chí mạng × tăng sát thương. */
export const effAtk = (st: Stats) => st.atk * (1 + st.crit * st.cdmg) * (1 + st.dmg);

export function chienLuc(st: Stats, E: Economy) {
  const w = E.game.chienLuc;
  return Math.round((effAtk(st) * w.trongSoTanCong + st.hp * w.trongSoMau) * (1 + st.skill));
}

/** Chiến Lực đội = tổng 4 người mạnh nhất. */
export const teamChienLuc = (cls: number[]) =>
  [...cls]
    .sort((a, b) => b - a)
    .slice(0, 4)
    .reduce((s, x) => s + x, 0);

/** Ước tính sát thương mỗi giây của đội (mô hình thô, xem docs/economy/phan-cap-suc-manh.md). */
export function teamDps(team: Stats[], E: Economy) {
  const m = E.thietKe.moHinhTran;
  const a = team.map((s) => effAtk(s) * (1 + s.skill)).sort((x, y) => y - x);
  const rest = a.slice(1).reduce((s, x) => s + x, 0);
  return m.heSoSatThuong * ((a[0] ?? 0) + m.chiaSeNgoaiSan * rest) * m.thoiGianDanh;
}

/** Tổng máu quái một tầng Tháp Tinh Tú, cùng cách sinh đợt quái với src/modes/tower.ts (lấy máu trung bình). */
export function towerFloorHp(f: number, E: Economy, extraLv = 0) {
  const m = E.thietKe.moHinhTran,
    lv = 1 + Math.round(f * 0.75) + extraLv;
  let hp = 0;
  for (let w = 0; w < 2; w++) {
    const hpM = 1 + 0.5 * (lv + w - 1),
      count = 3 + Math.floor(f / 2) + w;
    hp += count * m.mauQuaiTB * hpM;
    const golems = (f >= 4 && w === 1 ? 1 : 0) + (f >= 10 ? 1 : 0);
    hp += golems * m.mauDaQuy * hpM;
  }
  return hp;
}
/** Chiến Lực đội cần để đạt 3★ một tầng: quy từ sát thương mỗi giây cần thiết theo tỉ lệ DPS/Chiến Lực của đội. */
export const dpsNeeded = (f: number, E: Economy, extraLv = 0) =>
  towerFloorHp(f, E, extraLv) / E.thietKe.moHinhTran.giayThap3Sao;

/** Một lượt Ước nguyện thuần (không đụng hồ sơ). Giữ đúng thứ tự gọi rng như server: rng độ hiếm, rồi rng 50/50. */
export interface PityState {
  pity5: number;
  pity4: number;
  guaranteed: boolean;
}
export interface GachaCfg {
  rate5: number;
  rate4: number;
  soft: number;
  hard: number;
}
export function rollRarity(st: PityState, cfg: GachaCfg, E: Economy, rng: Rng): { r: 3 | 4 | 5; feat: boolean } {
  const U = E.game.uocNguyen;
  st.pity5++;
  st.pity4++;
  let p5 = cfg.rate5 / 100;
  if (st.pity5 >= cfg.soft) p5 += (st.pity5 - cfg.soft + 1) * U.tangMoiLuotSauMem;
  if (st.pity5 >= cfg.hard) p5 = 1;
  const r = rng();
  if (r < p5) {
    st.pity5 = 0;
    st.pity4 = 0;
    const feat = st.guaranteed || rng() < U.tiLeDacBiet;
    st.guaranteed = !feat;
    return { r: 5, feat };
  }
  if (st.pity4 >= U.bao4Sao || r < p5 + cfg.rate4 / 100) {
    st.pity4 = 0;
    return { r: 4, feat: false };
  }
  return { r: 3, feat: false };
}

/** Bảo Hộ Vận Sao của banner vũ khí và điểm La Bàn Sao. */
export interface WeaponPity {
  pity5: number;
  pity4: number;
  /** Lần 5★ trước không phải một trong hai vũ khí nổi bật: lần sau chắc chắn là vũ khí nổi bật. */
  guaranteed: boolean;
  laBan: number;
}
/** Một lượt banner vũ khí. "chon": đúng vũ khí đã chọn bằng La Bàn Sao; "khac": vũ khí nổi bật còn lại; "thuong": 5★ thường trú. */
export function rollWeapon(
  st: WeaponPity,
  E: Economy,
  rng: Rng,
): { r: 3 | 4 | 5; kind: "chon" | "khac" | "thuong" | null } {
  const B = E.thietKe.vuKhi.banner;
  st.pity5++;
  st.pity4++;
  let p5 = B.tiLe5 / 100;
  if (st.pity5 >= B.mem) p5 += (st.pity5 - B.mem + 1) * B.tangMoiLuotSauMem;
  if (st.pity5 >= B.cung) p5 = 1;
  const r = rng();
  if (r < p5) {
    st.pity5 = 0;
    st.pity4 = 0;
    let kind: "chon" | "khac" | "thuong";
    if (B.laBanSao > 0 && st.laBan >= B.laBanSao) kind = "chon";
    else if (st.guaranteed || rng() < B.tiLeNoiBat) kind = rng() < 0.5 ? "chon" : "khac";
    else kind = "thuong";
    st.guaranteed = kind === "thuong";
    st.laBan = kind === "chon" ? 0 : st.laBan + 1;
    return { r: 5, kind };
  }
  if (st.pity4 >= B.bao4Sao || r < p5 + B.tiLe4 / 100) {
    st.pity4 = 0;
    return { r: 4, kind: null };
  }
  return { r: 3, kind: null };
}

/** Cấp Hộ Tinh sau `days` ngày chơi (chỉ tăng theo thời gian, không bán). */
export function hoTinhLevel(days: number, E: Economy) {
  const h = E.thietKe.capHoTinh;
  let exp = days * h.kinhNghiemMoiNgay,
    lv = 1;
  while (lv < h.toiDa) {
    const need = h.kinhNghiem.goc + lv * h.kinhNghiem.moiCap;
    if (exp < need) break;
    exp -= need;
    lv++;
  }
  return lv;
}
export const reputationTier = (lv: number, E: Economy) =>
  [...E.thietKe.capHoTinh.bac].reverse().find((b) => lv >= b.tuCap)!.ten;

const lastIdx = (a: number[], ok: (v: number) => boolean) => {
  let k = 0;
  a.forEach((v, i) => ok(v) && (k = i));
  return k;
};
/** Giới hạn theo cấp Hộ Tinh: bậc Khai Tinh, cấp nhân vật, cấp kỹ năng, Thiên Tượng. */
export function caps(hoTinh: number, E: Economy) {
  const T = E.thietKe,
    khai = lastIdx(T.khaiTinh.canCapHoTinh, (v) => hoTinh >= v);
  return {
    khai,
    lv: T.khaiTinh.gioiHanCap[khai]!,
    kyNang: T.kyNang.toiDaTheoKhaiTinh[khai]!,
    thienTuong: lastIdx(T.thienTuong.moTaiCapHoTinh, (v) => hoTinh >= v),
  };
}

/** Đá Sao nhận mỗi ngày của người không nạp (lặp lại), ở ngày thứ `day` (1-based). */
export function freeGemsOnDay(day: number, E: Economy) {
  const u = E.game.thuong.uyThac,
    t = E.thietKe.thuNhap;
  let g = u.moiViec.daSao * 4 + u.duBon.daSao;
  if (day % 7 === 0) g += t.tuan.daSao;
  if (day % 30 === 0) g += t.thang.thapKy + t.thang.suKien + t.thang.baoTri;
  if (day <= t.motLan.trongSoNgay) g += t.motLan.daSao / t.motLan.trongSoNgay;
  return g;
}

/** Giá trị Đá Sao mỗi 1.000 đ của từng gói. */
export function packValue(E: Economy) {
  const s = E.goiNap,
    rows = s.daSao.map((p) => ({
      id: p.id,
      gia: p.gia,
      daSao: p.daSao + p.thuong,
      moi1000: ((p.daSao + p.thuong) / p.gia) * 1000,
      lanDau: s.napLanDauNhanDoi ? ((p.daSao * 2) / p.gia) * 1000 : null,
    }));
  const tt = s.theThang,
    ttGems = tt.daSaoNgay + tt.daSaoMoiNgay * tt.ngay;
  rows.push({ id: tt.id, gia: tt.gia, daSao: ttGems, moi1000: (ttGems / tt.gia) * 1000, lanDau: null });
  const ht = s.hoChieuSao;
  rows.push({ id: ht.id, gia: ht.gia, daSao: ht.daSao, moi1000: (ht.daSao / ht.gia) * 1000, lanDau: null });
  return rows;
}
