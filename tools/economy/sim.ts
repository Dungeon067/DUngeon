/**
 * Mô phỏng kinh tế (S19): người chơi ảo cho từng hồ sơ trong content/economy.yaml.
 * Hai banner (nhân vật giới hạn, vũ khí "Binh Khí Tinh Tú") dùng đúng công thức với game (src/economy/core.ts).
 * KHÔNG có thanh toán: tiền nạp chỉ là con số đổi ra Đá Sao theo bảng gói đề xuất.
 */
import type { Economy } from "../../src/data/economy-schema";
import {
  caps,
  charStats,
  chienLuc,
  dpsNeeded,
  effAtk,
  freeGemsOnDay,
  hoTinhLevel,
  lvCost,
  rollRarity,
  rollWeapon,
  teamChienLuc,
  teamDps,
  type BaseChar,
  type Invest,
  type PityState,
  type WeaponPity,
} from "../../src/economy/core";

export type Profile = Economy["hoSo"][number];
export interface SimChar extends BaseChar {
  id: string;
  name?: string;
  /** Loại vũ khí: sword, great, cat, bow, spear. */
  w: string;
}
export interface Gacha {
  rate5: number;
  rate4: number;
  soft: number;
  hard: number;
  cost: number;
}
export interface SimOpts {
  players: number;
  days: number;
  seed: number;
}

/** RNG có seed (mulberry32): cùng seed cho cùng kết quả. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Đầu tư của đội theo ngày (không phụ thuộc may rủi): cấp, Khai Tinh, kỹ năng, Bảo Ấn; nuôi đội 4 người khi đủ Sách, Xu, Lõi Sao. */
export function investOnDay(day: number, p: Profile | null, E: Economy, wx = weaponXu(day, E)) {
  const T = E.thietKe,
    ht = hoTinhLevel(day, E),
    cp = caps(ht, E);
  const B = T.vuKhi.nguon.biCanh,
    // Bí Cảnh ăn bớt Linh Lực của Lòng Sao; lượt ngày đầu trả bằng Linh Lực đầy sẵn lúc tạo hồ sơ (mô hình cũ không tính phần này).
    runs = Math.max(
      0,
      Math.floor(
        (day * T.linhLuc.hoiMoiNgay - Math.max(0, day - 1) * B.linhLuc * B.luotMoiNgay) / T.linhLuc.moiLuotLongSao,
      ),
    );
  const U = E.game.thuong.uyThac,
    seasons = p?.hoChieu ? Math.ceil(day / E.goiNap.hoChieuSao.ngay) : 0;
  let books = runs * T.linhLuc.thuongMoiLuot.sach + day * U.duBon.sach + seasons * E.goiNap.hoChieuSao.sach;
  let coin =
    T.thuNhap.motLan.xu +
    runs * T.linhLuc.thuongMoiLuot.xu +
    Math.floor(day * B.luotMoiNgay) * B.xu +
    day * 4 * U.moiViec.xu +
    Math.floor(day / 7) * T.thuNhap.tuan.xu +
    seasons * E.goiNap.hoChieuSao.xu -
    wx;
  let loi = runs * T.linhLuc.thuongMoiLuot.loiSao;
  let lv = 1,
    khai = 0;
  for (;;) {
    if (lv < Math.min(cp.lv, T.khaiTinh.gioiHanCap[khai]!)) {
      const c = lvCost(lv, E);
      if (c.books * 4 > books || c.coin * 4 > coin) break;
      books -= c.books * 4;
      coin -= c.coin * 4;
      lv++;
    } else if (khai < cp.khai) {
      const x = T.khaiTinh.xu[khai]! * 4,
        l = T.khaiTinh.loiSao[khai]! * 4;
      if (x > coin || l > loi) break;
      coin -= x;
      loi -= l;
      khai++;
    } else break;
  }
  return {
    hoTinh: ht,
    thienTuong: cp.thienTuong,
    inv: {
      lv,
      khai,
      kyNang: Math.min(cp.kyNang, T.kyNang.toiDaTheoKhaiTinh[khai]!),
      baoAn: T.baoAn.chatLuongTheoThienTuong[cp.thienTuong]! * Math.min(1, day / 30),
    } satisfies Omit<Invest, "cons" | "vuKhi">,
    coinLeft: coin,
  };
}

export interface WeaponFlow {
  /** Bậc tinh luyện vũ khí 4★ Lò Rèn theo ngày (số bản rèn được, tối đa 5); 0 = chưa rèn, dùng vũ khí 3★ mặc định. */
  r: number[];
  /** Ngày một vũ khí 4★ lên cấp tối đa (đủ kinh nghiệm và đủ 6 lần đột phá), null nếu không kịp. */
  lvDay: number | null;
  r5Day: number | null;
  /** Xu đã tiêu cho vũ khí tới ngày d (cộng dồn): cửa hàng quặng, kinh nghiệm, đột phá, Lò Rèn. */
  xu: number[];
}
const flowCache = new WeakMap<object, WeaponFlow>();
/**
 * Dòng nguyên liệu vũ khí của người không nạp: Bí Cảnh, Ủy thác, cửa hàng tuần, thành tựu và sự kiện (vuKhi.nguon).
 * Xu dùng chung với nuôi nhân vật: nhân vật ưu tiên, vũ khí chỉ tiêu phần Xu dư mà mọi ngày sau vẫn còn dư,
 * nên trừ khoản này vào investOnDay không làm đội chậm đi. Thứ tự tiêu: cửa hàng quặng, đột phá, kinh nghiệm, Lò Rèn.
 */
export function weaponFlow(E: Economy, days = 400): WeaponFlow {
  const V = E.thietKe.vuKhi;
  const hit = flowCache.get(V);
  if (hit && hit.r.length > days) return hit;
  const N = V.nguon,
    sao = V.quang.reduce((a, q) => (q.r > a.r ? q : a)).id,
    expOf = new Map(V.quang.map((q) => [q.id, q.kinhNghiem])),
    ex = (o: Record<string, number>, k = 1) =>
      Object.entries(o).reduce((s, [id, n]) => s + (id === sao ? 0 : (expOf.get(id) ?? 0) * n * k), 0),
    so = (o: Record<string, number>, k = 1) => (o[sao] ?? 0) * k,
    expNeed = (lv: number) => {
      let n = 0;
      for (let L = 1; L < lv; L++) n += V.cap.kinhNghiem.goc + V.cap.kinhNghiem.moiCap * (L - 1);
      return n;
    },
    lvNeed = expNeed(V.cap.toiDa),
    phoi0 = V.khoiDau[V.loRen.nguyenLieu] ?? 0;
  // Ngân sách: Xu dư thấp nhất từ ngày d trở đi của đội F2P chưa tiêu cho vũ khí.
  // Bản rèn đầu tiên (Phôi khởi đầu) làm ngay khi tạo hồ sơ, trước cả nuôi nhân vật: đội cần vũ khí 4★ từ ngày 1.
  const pre = phoi0 >= V.loRen.so ? V.loRen.xu : 0;
  const left = Array.from({ length: days + 1 }, (_, d) => investOnDay(d, null, E, pre).coinLeft + pre);
  for (let d = days - 1; d >= 0; d--) left[d] = Math.min(left[d]!, left[d + 1]!);
  let exp = ex(V.khoiDau),
    saoHave = so(V.khoiDau),
    saoUsed = 0,
    expUsed = 0,
    asc = 0,
    forges = pre ? 1 : 0,
    runs = 0,
    spent = pre,
    lvDay: number | null = null,
    r5Day: number | null = null;
  const r: number[] = [],
    xu: number[] = [],
    weekLeft = new Map<string, number>();
  for (let d = 0; d <= days; d++) {
    if (d > 0) {
      runs += N.biCanh.luotMoiNgay;
      exp += ex(N.biCanh.roi, N.biCanh.luotMoiNgay) + ex(N.uyThac);
      saoHave += so(N.biCanh.roi, N.biCanh.luotMoiNgay) + so(N.uyThac);
      if ((d - 1) % 7 === 0) for (const x of N.cuaHang) weekLeft.set(x.id, x.moiTuan);
    }
    const budget = () => Math.max(0, Math.floor(left[d]!) - spent);
    for (const x of N.cuaHang) {
      const saoNeed = V.cap.dotPha.quang.slice(asc).reduce((t, q) => t + q, 0) - (saoHave - saoUsed),
        need = x.id === sao ? saoNeed : Math.ceil((lvNeed - exp) / (expOf.get(x.id) ?? 1));
      const k = Math.min(weekLeft.get(x.id) ?? 0, Math.floor(budget() / x.xu), Math.max(0, need));
      if (k <= 0) continue;
      weekLeft.set(x.id, weekLeft.get(x.id)! - k);
      spent += k * x.xu;
      if (x.id === sao) saoHave += k;
      else exp += (expOf.get(x.id) ?? 0) * k;
    }
    while (asc < 6 && saoHave - saoUsed >= V.cap.dotPha.quang[asc]! && budget() >= V.cap.dotPha.xu[asc]!) {
      saoUsed += V.cap.dotPha.quang[asc]!;
      spent += V.cap.dotPha.xu[asc]!;
      asc++;
    }
    const e = Math.min(exp, expNeed(V.cap.gioiHan[asc]!)) - expUsed,
      k = Math.max(0, Math.min(e, Math.floor(budget() / V.cap.xuMoiKinhNghiem)));
    expUsed += k;
    spent += k * V.cap.xuMoiKinhNghiem;
    if (lvDay === null && asc === 6 && expUsed >= lvNeed) lvDay = d;
    const event = Math.floor((d * N.phoi.suKienMoiThang) / 30);
    for (;;) {
      const stat: Record<string, number> = {
        biCanh: runs,
        dotPha: asc,
        tinhLuyen: Math.max(0, forges - 1),
        ren: forges,
      };
      const ach = N.phoi.thanhTuu.reduce((s, a) => s + ((stat[a.loai] ?? 0) >= a.can ? a.phoi : 0), 0);
      if (forges >= 5 || Math.floor((phoi0 + event + ach) / V.loRen.so) <= forges || budget() < V.loRen.xu) break;
      forges++;
      spent += V.loRen.xu;
    }
    r.push(forges);
    xu.push(Math.ceil(spent));
    if (r5Day === null && forges >= 5) r5Day = d;
  }
  const f = { r, lvDay, r5Day, xu };
  flowCache.set(V, f);
  return f;
}
/** Xu đã tiêu cho vũ khí tới ngày `day`; mô hình nuôi nhân vật trừ khoản này trước. */
export const weaponXu = (day: number, E: Economy) => {
  const f = weaponFlow(E, Math.max(400, day));
  return f.xu[Math.min(day, f.xu.length - 1)]!;
};
/** Bậc tinh luyện vũ khí 4★ Lò Rèn ở ngày `day`. */
export const craftRefine = (day: number, E: Economy) => {
  const f = weaponFlow(E, Math.max(400, day));
  return f.r[Math.min(day, f.r.length - 1)]!;
};
const craftId = (w: string, E: Economy) =>
  (E.thietKe.vuKhi.danhSach.find((x) => x.nguon === "loRen" && x.loai === w) ??
    E.thietKe.vuKhi.danhSach.find((x) => x.nguon === "loRen")!)!.id;
/** Vũ khí của đội khi chưa có vũ khí đặc trưng: 4★ Lò Rèn nếu đã rèn, không thì 3★ mặc định R1. */
const craftedOn = (w: SimChar["w"], cr: number, E: Economy) =>
  cr > 0
    ? { id: craftId(w, E), tinhLuyen: cr }
    : { id: E.thietKe.vuKhi.macDinh[w as keyof typeof E.thietKe.vuKhi.macDinh]!, tinhLuyen: 1 };
export const signatureOf = (id: string, E: Economy) =>
  E.thietKe.vuKhi.danhSach.find((w) => w.nguon === "gioiHan" && w.cua === id)?.id ?? null;

/** Đá Sao từ tiền mua gói trong tháng: mua gói giá trị cao nhất trước, gói lần đầu nhân đôi một lần. */
export function paidGemsForMonth(p: Profile, E: Economy, usedFirst: Set<string>) {
  const S = E.goiNap;
  let budget = p.vndThang,
    gems = 0;
  const packs = [...S.daSao].sort((a, b) => b.gia - a.gia);
  if (S.napLanDauNhanDoi)
    for (const pk of [...packs].reverse())
      if (!usedFirst.has(pk.id) && budget >= pk.gia) {
        usedFirst.add(pk.id);
        budget -= pk.gia;
        gems += pk.daSao * 2;
      }
  for (const pk of packs)
    while (budget >= pk.gia) {
      budget -= pk.gia;
      gems += pk.daSao + pk.thuong;
    }
  return gems;
}
/** Chi tiêu trung bình mỗi tháng (VND) của hồ sơ. */
export const spendPerMonth = (p: Profile, E: Economy) =>
  p.vndThang +
  (p.theThang ? E.goiNap.theThang.gia : 0) +
  (p.hoChieu ? (E.goiNap.hoChieuSao.gia * 30) / E.goiNap.hoChieuSao.ngay : 0);

export type Quant = { p10: number; p50: number; p90: number };
export interface Snapshot {
  owned: Record<string, number>;
  cl: number;
  dps: number;
  pulls: number;
  wpulls: number;
  carryN: number;
  carryR: number;
}
export interface ProfileResult {
  id: string;
  ten: string;
  checkpoints: number[];
  cl: Quant[];
  dps: Quant[];
  /** Trung bình tích lũy theo ngày: lượt ước nhân vật, lượt ước vũ khí, số 5★ nhân vật, 5★ giới hạn. */
  pulls: Float64Array;
  wpulls: Float64Array;
  five: Float64Array;
  featured: Float64Array;
  /** Số người theo số nhân vật 5★ ở ngày cuối. */
  fiveDist: number[];
  firstFeaturedDay: number;
  /** Theo mốc ngày: phân phối Nét Sao chủ lực (-1..6) và tinh luyện vũ khí chủ lực (0..5). */
  carryN: Record<number, number[]>;
  carryR: Record<number, number[]>;
  /** Theo mốc ngày: tỉ lệ người chơi chạm Đỉnh và đạt điểm tối đa. */
  chamDinh: Record<number, number>;
  diemToiDa: Record<number, number>;
  /** Ngày trung vị chạm Đỉnh, điểm tối đa (null: quá nửa số người chưa đạt trong thời gian mô phỏng). */
  chamDinhDay: number | null;
  diemToiDaDay: number | null;
  sampleAt: Record<number, Snapshot>;
  gemsPerMonth: number;
  vndPerMonth: number;
}

const quant = (a: Float32Array): Quant => {
  const s = Float32Array.from(a).sort(),
    q = (x: number) => s[Math.min(s.length - 1, Math.floor(x * s.length))]!;
  return { p10: q(0.1), p50: q(0.5), p90: q(0.9) };
};

/** Sát thương mỗi giây cần để chạm Đỉnh (sao tối đa tầng 12 bản Đỉnh) và để đạt điểm tối đa. */
export function peakNeed(E: Economy) {
  const d = E.thietKe.phanTang.dinh,
    cham = dpsNeeded(12, E, d.capQuaiThem) * d.heSoMau;
  return { cham, max: cham * d.heSoDiemToiDa };
}

export function simulateProfile(p: Profile, chars: SimChar[], G: Gacha, E: Economy, o: SimOpts): ProfileResult {
  const N = chars.length,
    idx = new Map(chars.map((c, i) => [c.id, i]));
  const pools = E.game.nhanVat5Sao,
    std = pools.thuongTru.map((id) => idx.get(id)!),
    lim = pools.gioiHan.map((id) => idx.get(id)!),
    four = chars.flatMap((c, i) => (c.r === 4 ? [i] : [])),
    free = E.thietKe.phanTang.doiMienPhi.map((id) => idx.get(id)!);
  const carry = lim[0]!,
    banner = 21;
  const goals = p.mucTieu.map((g) => ({ vk: g.startsWith("vk"), n: Number(g.slice(2)) }));
  const sig = chars.map((c) => signatureOf(c.id, E));
  const m = E.thietKe.moHinhTran,
    need = peakNeed(E);
  const step = 5,
    moc = E.moPhong.mocNgay.filter((d) => d <= o.days),
    checkpoints = [
      ...new Set([...Array.from({ length: Math.floor(o.days / step) }, (_, i) => (i + 1) * step), ...moc, o.days]),
    ].sort((a, b) => a - b);
  const cpAt = new Map(checkpoints.map((d, i) => [d, i]));
  // Bảng [checkpoint][nhân vật][Nét Sao][vũ khí]: vũ khí 0 = 4★ Lò Rèn, 1..5 = vũ khí đặc trưng R1..R5.
  const K = 6,
    at = (ci: number, cons: number, w: number) => (ci * 7 + cons) * K + w;
  const tabCl: Float32Array[] = [],
    tabU: Float32Array[] = [];
  for (const d of checkpoints) {
    const { inv } = investOnDay(d, p, E),
      cr = craftRefine(d, E);
    const tc = new Float32Array(N * 7 * K),
      tu = new Float32Array(N * 7 * K);
    chars.forEach((c, ci) => {
      for (let cons = 0; cons < 7; cons++)
        for (let w = 0; w < K; w++) {
          const vuKhi = w && sig[ci] ? { id: sig[ci]!, tinhLuyen: w } : craftedOn(chars[ci]!.w, cr, E);
          const st = charStats(c, { ...inv, cons, vuKhi }, E);
          tc[at(ci, cons, w)] = chienLuc(st, E);
          tu[at(ci, cons, w)] = effAtk(st) * (1 + st.skill);
        }
    });
    tabCl.push(tc);
    tabU.push(tu);
  }
  const clA = checkpoints.map(() => new Float32Array(o.players)),
    dpsA = checkpoints.map(() => new Float32Array(o.players));
  const pulls = new Float64Array(o.days + 1),
    wpulls = new Float64Array(o.days + 1),
    fiveA = new Float64Array(o.days + 1),
    featA = new Float64Array(o.days + 1);
  const fiveDist: number[] = [];
  const carryN: Record<number, number[]> = {},
    carryR: Record<number, number[]> = {},
    chamC: Record<number, number> = {},
    maxC: Record<number, number> = {};
  for (const d of moc) {
    carryN[d] = Array(8).fill(0);
    carryR[d] = Array(6).fill(0);
    chamC[d] = 0;
    maxC[d] = 0;
  }
  const chamDays = new Float32Array(o.players),
    maxDays = new Float32Array(o.players);
  const snaps: Record<number, { owned: Int8Array; wr: Int8Array; cl: number; dps: number; np: number; nw: number }[]> =
    {};
  for (const d of moc) snaps[d] = [];
  let firstSum = 0,
    gemsTotal = 0;
  const top = [0, 0, 0, 0],
    topU = [0, 0, 0, 0];

  for (let pl = 0; pl < o.players; pl++) {
    const rng = mulberry32((o.seed ^ Math.imul(pl + 1, 2654435761)) >>> 0);
    const owned = new Int8Array(N).fill(-1),
      wr = new Int8Array(N);
    for (const i of free) owned[i] = 0;
    const st: PityState = { pity5: 0, pity4: 0, guaranteed: false },
      wst: WeaponPity = { pity5: 0, pity4: 0, guaranteed: false, laBan: 0 };
    const usedFirst = new Set<string>();
    let gems = 0,
      np = 0,
      nw = 0,
      n5 = 0,
      nf = 0,
      first = 0,
      gi = 0,
      cham = 0,
      mx = 0;
    const pullChar = (F: number, d: number) => {
      gems -= G.cost;
      np++;
      const roll = rollRarity(st, G, E, rng);
      let c = -1;
      if (roll.r === 5) {
        n5++;
        if (roll.feat) {
          c = F;
          nf++;
          if (!first) first = d;
        } else c = std[Math.floor(rng() * std.length)]!;
      } else if (roll.r === 4) c = four[Math.floor(rng() * four.length)]!;
      if (c >= 0) owned[c] = Math.min(6, owned[c]! + 1);
    };
    const pullWeapon = (other: number) => {
      gems -= G.cost;
      nw++;
      const roll = rollWeapon(wst, E, rng);
      if (roll.kind === "chon") wr[carry] = Math.min(5, wr[carry]! + 1);
      else if (roll.kind === "khac") wr[other] = Math.min(5, wr[other]! + 1);
    };
    for (let d = 1; d <= o.days; d++) {
      let g = freeGemsOnDay(d, E);
      if (p.theThang)
        g +=
          E.goiNap.theThang.daSaoMoiNgay + ((d - 1) % E.goiNap.theThang.ngay === 0 ? E.goiNap.theThang.daSaoNgay : 0);
      if (p.hoChieu && (d - 1) % E.goiNap.hoChieuSao.ngay === 0) g += E.goiNap.hoChieuSao.daSao;
      if (p.vndThang && (d - 1) % 30 === 0) g += paidGemsForMonth(p, E, usedFirst);
      gems += g;
      if (pl === 0) gemsTotal += g;
      const k = Math.floor((d - 1) / banner),
        F = lim[k % lim.length]!,
        next = lim[(k + 1) % lim.length]!;
      while (gems >= G.cost) {
        while (gi < goals.length && (goals[gi]!.vk ? wr[carry]! >= goals[gi]!.n : owned[carry]! >= goals[gi]!.n)) gi++;
        const goal = goals[gi];
        if (goal && F === carry && !goal.vk) pullChar(F, d);
        else if (goal && goal.vk && (F === carry || next === carry) && owned[carry]! >= 0)
          pullWeapon(F === carry ? next : F);
        else if (F !== carry && owned[F]! < (goal ? p.uocKhac : Math.max(0, p.uocKhac))) pullChar(F, d);
        else break;
      }
      pulls[d] += np;
      wpulls[d] += nw;
      fiveA[d] += n5;
      featA[d] += nf;
      const ci = cpAt.get(d);
      if (ci !== undefined) {
        const tc = tabCl[ci]!,
          tu = tabU[ci]!;
        top.fill(0);
        topU.fill(0);
        for (let c = 0; c < N; c++) {
          const cons = owned[c]!;
          if (cons < 0) continue;
          const j = at(c, cons, wr[c]!),
            v = tc[j]!,
            u = tu[j]!;
          for (let t = 0; t < 4; t++)
            if (v > top[t]!) {
              for (let s = 3; s > t; s--) {
                top[s] = top[s - 1]!;
                topU[s] = topU[s - 1]!;
              }
              top[t] = v;
              topU[t] = u;
              break;
            }
        }
        const cl = top[0]! + top[1]! + top[2]! + top[3]!;
        const us = [...topU].sort((a, b) => b - a);
        const dps = m.heSoSatThuong * (us[0]! + m.chiaSeNgoaiSan * (us[1]! + us[2]! + us[3]!)) * m.thoiGianDanh;
        clA[ci]![pl] = cl;
        dpsA[ci]![pl] = dps;
        if (!cham && dps >= need.cham) cham = d;
        if (!mx && dps >= need.max) mx = d;
        if (carryN[d]) {
          carryN[d]![owned[carry]! + 1]!++;
          carryR[d]![wr[carry]!]!++;
          if (cham) chamC[d]!++;
          if (mx) maxC[d]!++;
          snaps[d]!.push({ owned: owned.slice(), wr: wr.slice(), cl, dps, np, nw });
        }
      }
    }
    fiveDist[n5] = (fiveDist[n5] ?? 0) + 1;
    firstSum += first || o.days + 1;
    chamDays[pl] = cham || Infinity;
    maxDays[pl] = mx || Infinity;
  }
  for (let d = 0; d <= o.days; d++) {
    pulls[d] /= o.players;
    wpulls[d] /= o.players;
    fiveA[d] /= o.players;
    featA[d] /= o.players;
  }
  const medDay = (a: Float32Array) => {
    const v = quant(a).p50;
    return Number.isFinite(v) ? v : null;
  };
  const sampleAt: Record<number, Snapshot> = {};
  for (const d of moc) {
    const arr = snaps[d]!.sort((a, b) => a.cl - b.cl),
      s = arr[Math.floor(arr.length / 2)]!;
    const rec: Record<string, number> = {};
    s.owned.forEach((c, k) => c >= 0 && (rec[chars[k]!.id] = c));
    sampleAt[d] = {
      owned: rec,
      cl: s.cl,
      dps: s.dps,
      pulls: s.np,
      wpulls: s.nw,
      carryN: s.owned[carry]!,
      carryR: s.wr[carry]!,
    };
    for (const k of Object.keys(carryN[d]!)) {
      carryN[d]![+k]! /= o.players;
    }
    carryR[d] = carryR[d]!.map((x) => x / o.players);
    chamC[d]! /= o.players;
    maxC[d]! /= o.players;
  }
  return {
    id: p.id,
    ten: p.ten,
    checkpoints,
    cl: clA.map(quant),
    dps: dpsA.map(quant),
    pulls,
    wpulls,
    five: fiveA,
    featured: featA,
    fiveDist: Array.from(fiveDist, (x) => x ?? 0),
    firstFeaturedDay: firstSum / o.players,
    carryN,
    carryR,
    chamDinh: chamC,
    diemToiDa: maxC,
    chamDinhDay: medDay(chamDays),
    diemToiDaDay: medDay(maxDays),
    sampleAt,
    gemsPerMonth: (gemsTotal / o.days) * 30,
    vndPerMonth: spendPerMonth(p, E),
  };
}

/** Đội 4★ miễn phí (N0, vũ khí 4★ Lò Rèn): Chiến Lực và sát thương mỗi giây theo ngày. */
export function freeTeam(day: number, chars: SimChar[], E: Economy) {
  const { inv, hoTinh } = investOnDay(day, null, E),
    cr = craftRefine(day, E);
  const team = E.thietKe.phanTang.doiMienPhi.map((id) => {
    const c = chars.find((x) => x.id === id)!;
    return charStats(c, { ...inv, cons: 0, vuKhi: craftedOn(c.w, cr, E) }, E);
  });
  return { hoTinh, lv: inv.lv, cl: teamChienLuc(team.map((s) => chienLuc(s, E))), dps: teamDps(team, E) };
}

export type DoDe = "chưa qua" | "qua được" | "vừa đủ" | "dễ" | "rất nhẹ nhàng";
export function doDe(margin: number, E: Economy): DoDe {
  const t = E.thietKe.phanTang.doDe;
  if (margin < 1) return "chưa qua";
  if (margin < t.vuaDu) return "qua được";
  if (margin < t.de) return "vừa đủ";
  if (margin < t.ratNhe) return "dễ";
  return "rất nhẹ nhàng";
}

export interface Tiering {
  /** Nội dung thường: Chiến Lực cần, đội 4★ miễn phí, độ dư từng hồ sơ ở ngày mở, ngày F2P (trung vị) qua. */
  thuong: { ten: string; ngay: number; can: number; mienPhi: number; du: number[]; f2pNgay: number | null }[];
  thap: { tang: number; dpsCan: number; mienPhiNgay: number | null; f2pNgay: number | null }[];
  f2pTatCa: number | null;
  /** Độ dư thấp nhất và trung vị trên các nội dung thường, theo hồ sơ. */
  doDe: { min: number; median: number; nhan: DoDe }[];
  dinh: { cham: number; max: number };
  checks: { ten: string; ok: boolean }[];
  ok: boolean;
}

/** Chỉ số Chiến Lực (trung vị) ở ngày d: lấy checkpoint gần nhất không sau d (ngày trước checkpoint đầu dùng checkpoint đầu). */
const clAt = (r: ProfileResult, d: number) => {
  let i = 0;
  while (i + 1 < r.checkpoints.length && r.checkpoints[i + 1]! <= d) i++;
  return r.cl[i]!.p50;
};
const firstDay = (r: ProfileResult, from: number, ok: (i: number) => boolean) => {
  for (let i = 0; i < r.checkpoints.length; i++) if (r.checkpoints[i]! >= from && ok(i)) return r.checkpoints[i]!;
  return null;
};

export function tiering(res: ProfileResult[], chars: SimChar[], E: Economy, days: number): Tiering {
  const P = E.thietKe.phanTang,
    f2p = res[0]!;
  const thuong = P.thuong.map((x) => {
    const mienPhi = freeTeam(x.ngay, chars, E).cl;
    return {
      ten: x.ten,
      ngay: x.ngay,
      can: x.chienLuc,
      mienPhi,
      du: res.map((r) => clAt(r, x.ngay) / x.chienLuc),
      f2pNgay: firstDay(f2p, x.ngay, (i) => f2p.cl[i]!.p50 >= x.chienLuc),
    };
  });
  const thap = Array.from({ length: P.thapThuong }, (_, i) => {
    const f = i + 1,
      need = dpsNeeded(f, E);
    let mienPhiNgay: number | null = null;
    for (let d = 1; d <= days && mienPhiNgay === null; d++) if (freeTeam(d, chars, E).dps >= need) mienPhiNgay = d;
    return {
      tang: f,
      dpsCan: Math.round(need),
      mienPhiNgay,
      f2pNgay: firstDay(f2p, 1, (k) => f2p.dps[k]!.p50 >= need),
    };
  });
  const all = [...thuong.map((x) => x.f2pNgay), ...thap.map((x) => x.f2pNgay)];
  const f2pTatCa = all.some((x) => x === null) ? null : Math.max(...(all as number[]));
  const dd = res.map((_, k) => {
    const v = thuong.map((x) => x.du[k]!).sort((a, b) => a - b);
    const median = v[Math.floor(v.length / 2)]!;
    return { min: v[0]!, median, nhan: doDe(median, E) };
  });
  const need = peakNeed(E),
    last = Math.max(...E.moPhong.mocNgay.filter((d) => d <= days)),
    [c0, c1] = P.dinh.f2pChamDinh,
    whale = res.at(-1)!;
  const checks = [
    {
      ten: `Đội 4★ miễn phí đủ cấp qua mọi nội dung thường ở ngày mở và Tháp tầng 1–${P.thapThuong} 3★`,
      ok: thuong.every((x) => x.mienPhi >= x.can) && thap.every((x) => x.mienPhiNgay !== null),
    },
    {
      ten: `F2P chơi kỹ (trung vị) qua 100% nội dung thường trước ngày ${P.hanThuong}`,
      ok: f2pTatCa !== null && f2pTatCa <= P.hanThuong,
    },
    {
      ten: "Độ dễ nội dung thường tăng dần theo mức nạp, F2P vẫn qua được",
      ok: dd.every((x, k) => k === 0 || x.median >= dd[k - 1]!.median) && dd[0]!.min >= 1,
    },
    {
      ten: `F2P chơi kỹ (trung vị) chạm Đỉnh trong khoảng ngày ${c0}–${c1}`,
      ok: f2p.chamDinhDay !== null && f2p.chamDinhDay >= c0 && f2p.chamDinhDay <= c1,
    },
    {
      ten: `Điểm tối đa chủ yếu dành cho ${whale.ten}: ở ngày ${last}, dưới một nửa F2P và từ một nửa ${whale.ten} trở lên đạt`,
      ok: (f2p.diemToiDa[last] ?? 0) < 0.5 && (whale.diemToiDa[last] ?? 0) >= 0.5,
    },
  ];
  return {
    thuong,
    thap,
    f2pTatCa,
    doDe: dd,
    dinh: need,
    checks,
    ok: checks.every((c) => c.ok),
  };
}
