/**
 * Mô phỏng kinh tế S19: nhiều người chơi ảo cho 3 hồ sơ (không nạp, thẻ tháng, nạp nhiều).
 * Chỉ tính toán số liệu. Không có bất kỳ đoạn code thanh toán nào.
 */
import type { Economy } from "../../src/data/economy-schema";
import {
  caps,
  charStats,
  chienLuc,
  dpsNeeded,
  freeGemsOnDay,
  hoTinhLevel,
  lvCost,
  rollRarity,
  teamChienLuc,
  teamDps,
  type BaseChar,
  type Invest,
  type PityState,
} from "../../src/economy/core";

export interface SimChar extends BaseChar {
  id: string;
  name?: string;
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
type Profile = Economy["hoSo"][number];

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

/** Đầu tư của đội theo ngày (không phụ thuộc may rủi): cấp, Khai Tinh, kỹ năng, Bảo Ấn, vũ khí. */
export function investOnDay(day: number, p: Profile | null, E: Economy, weapon?: { r: 3 | 4 | 5; r5Ngay: number }) {
  const T = E.thietKe,
    ht = hoTinhLevel(day, E),
    cp = caps(ht, E);
  const runs = Math.floor((day * T.linhLuc.hoiMoiNgay) / T.linhLuc.moiLuotLongSao);
  const U = E.game.thuong.uyThac,
    seasons = p?.hanhTrinh ? Math.ceil(day / E.goiNap.hanhTrinhMua.ngay) : 0;
  let books = runs * T.linhLuc.thuongMoiLuot.sach + day * U.duBon.sach + seasons * E.goiNap.hanhTrinhMua.sach;
  let coin =
    runs * T.linhLuc.thuongMoiLuot.xu +
    day * 4 * U.moiViec.xu +
    Math.floor(day / 7) * T.thuNhap.tuan.xu +
    seasons * E.goiNap.hanhTrinhMua.xu;
  let loi = runs * T.linhLuc.thuongMoiLuot.loiSao;
  // Nuôi đội 4 người: lên cấp hoặc Khai Tinh khi đủ Sách, Xu, Lõi Sao.
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
  const baoAnRamp = Math.min(1, day / 30);
  const w = weapon ?? p?.vuKhi ?? { r: 4 as const, r5Ngay: T.thuNhap.vuKhi4MienPhiR5Ngay };
  const tinhLuyen = Math.min(5, 1 + Math.floor((4 * day) / w.r5Ngay));
  return {
    hoTinh: ht,
    thienTuong: cp.thienTuong,
    inv: {
      lv,
      khai,
      kyNang: Math.min(cp.kyNang, T.kyNang.toiDaTheoKhaiTinh[khai]!),
      baoAn: T.baoAn.chatLuongTheoThienTuong[cp.thienTuong]! * baoAnRamp,
      vuKhi: { r: w.r, tinhLuyen },
    } satisfies Omit<Invest, "cons">,
  };
}

/** Đá Sao từ tiền nạp trong tháng `month` (0-based): mua gói giá trị cao nhất trước, gói lần đầu nhân đôi một lần. */
export function paidGemsForMonth(month: number, p: Profile, E: Economy, usedFirst: Set<string>) {
  const S = E.goiNap;
  let budget = p.vndThang,
    gems = 0;
  if (p.theThang) budget -= S.theThang.gia;
  if (p.hanhTrinh)
    for (let d = month * 30; d < month * 30 + 30; d++) if (d % S.hanhTrinhMua.ngay === 0) budget -= S.hanhTrinhMua.gia;
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

export interface ProfileResult {
  id: string;
  ten: string;
  checkpoints: number[];
  /** [checkpoint][player] Chiến Lực đội. */
  cl: Float32Array[];
  pulls: Float64Array; // trung bình lượt ước tích lũy theo ngày
  five: Float64Array;
  featured: Float64Array;
  fiveDist: number[]; // số người theo số 5★ ở ngày cuối
  firstFeaturedDay: number; // trung bình (người chưa có tính là soNgay+1)
  noFeatured: number; // tỉ lệ chưa có 5★ giới hạn nào ở ngày cuối
  sample: { owned: Record<string, number>; cl: number; pulls: number }; // người chơi trung vị ở ngày cuối
  sampleAt: Record<number, { owned: Record<string, number>; cl: number; pulls: number }>;
  gemsPerMonth: number;
}

export function simulateProfile(p: Profile, chars: SimChar[], G: Gacha, E: Economy, o: SimOpts): ProfileResult {
  const five = chars.filter((c) => c.r === 5),
    four = chars.filter((c) => c.r === 4),
    free = E.thietKe.congBang.doiMienPhi;
  const idx = new Map(chars.map((c, i) => [c.id, i]));
  const step = 5,
    checkpoints = [
      ...new Set([
        ...Array.from({ length: Math.floor(o.days / step) }, (_, i) => (i + 1) * step),
        ...E.moPhong.mocNgay.filter((d) => d <= o.days),
        o.days,
      ]),
    ].sort((a, b) => a - b);
  // Bảng Chiến Lực [checkpoint][nhân vật][Nét Sao] (đầu tư cố định theo ngày).
  const tables = checkpoints.map((d) => {
    const { inv } = investOnDay(d, p, E);
    return chars.map((c) => Array.from({ length: 7 }, (_, cons) => chienLuc(charStats(c, { ...inv, cons }, E), E)));
  });
  const cl = checkpoints.map(() => new Float32Array(o.players));
  const pulls = new Float64Array(o.days + 1),
    fiveA = new Float64Array(o.days + 1),
    featA = new Float64Array(o.days + 1);
  const fiveDist: number[] = [];
  let firstSum = 0,
    noFeat = 0;
  const finals: { owned: Int8Array; cl: number; pulls: number }[] = [];
  const keepAt = new Set(E.moPhong.mocNgay);
  const snap: Record<number, { owned: Int8Array; cl: number; pulls: number }[]> = {};
  const rotate = 21;
  let gemsTotal = 0;
  for (let pl = 0; pl < o.players; pl++) {
    const rng = mulberry32((o.seed ^ Math.imul(pl + 1, 2654435761)) >>> 0);
    const owned = new Int8Array(chars.length).fill(-1);
    for (const id of free) owned[idx.get(id)!] = 0;
    const st: PityState = { pity5: 0, pity4: 0, guaranteed: false };
    const usedFirst = new Set<string>();
    let gems = 0,
      np = 0,
      n5 = 0,
      nf = 0,
      first = 0,
      ci = 0;
    for (let d = 1; d <= o.days; d++) {
      let g = freeGemsOnDay(d, E);
      if (p.theThang)
        g +=
          E.goiNap.theThang.daSaoMoiNgay + ((d - 1) % E.goiNap.theThang.ngay === 0 ? E.goiNap.theThang.daSaoNgay : 0);
      if (p.hanhTrinh && (d - 1) % E.goiNap.hanhTrinhMua.ngay === 0) g += E.goiNap.hanhTrinhMua.daSao;
      if (p.vndThang && (d - 1) % 30 === 0) g += paidGemsForMonth(Math.floor((d - 1) / 30), p, E, usedFirst);
      gems += g;
      if (pl === 0) gemsTotal += g;
      const feat = five[Math.floor((d - 1) / rotate) % five.length]!;
      if (gems >= (p.vndThang ? 1 : Math.max(1, E.moPhong.tichLuyTruocKhiUoc)) * G.cost)
        while (gems >= G.cost) {
          gems -= G.cost;
          np++;
          const roll = rollRarity(st, G, E, rng);
          let c: SimChar | null = null;
          if (roll.r === 5) {
            n5++;
            if (roll.feat) {
              c = feat;
              nf++;
              if (!first) first = d;
            } else {
              const pool = five.filter((x) => x.id !== feat.id);
              c = pool[Math.floor(rng() * pool.length)]!;
            }
          } else if (roll.r === 4) c = four[Math.floor(rng() * four.length)]!;
          if (c) {
            const k = idx.get(c.id)!;
            owned[k] = Math.min(6, owned[k]! + 1);
          }
        }
      pulls[d] += np;
      fiveA[d] += n5;
      featA[d] += nf;
      if (d === checkpoints[ci]) {
        const t = tables[ci]!,
          vals: number[] = [];
        for (let k = 0; k < chars.length; k++) if (owned[k]! >= 0) vals.push(t[k]![owned[k]!]!);
        const v = teamChienLuc(vals);
        cl[ci]![pl] = v;
        if (keepAt.has(d)) (snap[d] ??= []).push({ owned: owned.slice(), cl: v, pulls: np });
        ci++;
      }
    }
    fiveDist[n5] = (fiveDist[n5] ?? 0) + 1;
    firstSum += first || o.days + 1;
    if (!nf) noFeat++;
    finals.push({ owned, cl: cl[checkpoints.length - 1]![pl]!, pulls: np });
  }
  for (let d = 0; d <= o.days; d++) {
    pulls[d] /= o.players;
    fiveA[d] /= o.players;
    featA[d] /= o.players;
  }
  const median = (arr: { owned: Int8Array; cl: number; pulls: number }[]) => {
    const s = [...arr].sort((a, b) => a.cl - b.cl)[Math.floor(arr.length / 2)]!;
    const ownedRec: Record<string, number> = {};
    s.owned.forEach((c, k) => c >= 0 && (ownedRec[chars[k]!.id] = c));
    return { owned: ownedRec, cl: s.cl, pulls: s.pulls };
  };
  const sampleAt: ProfileResult["sampleAt"] = {};
  for (const d of Object.keys(snap)) sampleAt[+d] = median(snap[+d]!);
  return {
    id: p.id,
    ten: p.ten,
    checkpoints,
    cl,
    pulls,
    five: fiveA,
    featured: featA,
    fiveDist: Array.from(fiveDist, (x) => x ?? 0),
    firstFeaturedDay: firstSum / o.players,
    noFeatured: noFeat / o.players,
    sample: median(finals),
    sampleAt,
    gemsPerMonth: (gemsTotal / o.days) * 30,
  };
}

export const quantile = (a: Float32Array, q: number) => {
  const s = Float32Array.from(a).sort();
  return s[Math.min(s.length - 1, Math.floor(q * s.length))]!;
};

/** Chiến Lực trần lý thuyết ở ngày d: 4 nhân vật 5★ mạnh nhất, N6, vũ khí 5★ R5. Chỉ để tham khảo: cần nạp vượt xa hạn mức tháng. */
export function theoreticalMax(day: number, chars: SimChar[], E: Economy) {
  const { inv } = investOnDay(day, null, E, { r: 5, r5Ngay: 1 });
  return teamChienLuc(chars.filter((c) => c.r === 5).map((c) => chienLuc(charStats(c, { ...inv, cons: 6 }, E), E)));
}

/** Đội 4★ miễn phí (N0, vũ khí 4★ rèn): Chiến Lực và DPS ước tính theo ngày. */
export function freeTeam(day: number, chars: SimChar[], E: Economy) {
  const { inv, hoTinh } = investOnDay(day, null, E);
  const team = E.thietKe.congBang.doiMienPhi.map((id) =>
    charStats(
      chars.find((c) => c.id === id)!,
      { ...inv, cons: 0 },
      E,
    ),
  );
  return { hoTinh, lv: inv.lv, cl: teamChienLuc(team.map((s) => chienLuc(s, E))), dps: teamDps(team, E) };
}

export interface Fairness {
  story: { chuong: number; ngay: number; can: number; co: number; ok: boolean }[];
  tower: { tang: number; dpsCan: number; ngayDat: number | null; ok: boolean }[];
  ratio: {
    ngay: number;
    khongNap: number;
    napIt: number;
    napNhieu: number;
    napNhieuP99: number;
    napNhieuMax: number;
    tran: number;
    tiLe: number;
    tiLeP99: number;
    tiLeMax: number;
    tiLeTran: number;
    ok: boolean;
  }[];
  ok: boolean;
}

export function fairness(res: ProfileResult[], chars: SimChar[], E: Economy, days: number): Fairness {
  const story = E.thietKe.cotTruyen.map((c) => {
    const co = freeTeam(c.ngay, chars, E).cl;
    return { chuong: c.chuong, ngay: c.ngay, can: c.chienLuc, co, ok: co >= c.chienLuc };
  });
  const tower = Array.from({ length: 12 }, (_, i) => {
    const f = i + 1,
      need = dpsNeeded(f, E);
    let ngayDat: number | null = null;
    for (let d = 1; d <= days && ngayDat === null; d++) if (freeTeam(d, chars, E).dps >= need) ngayDat = d;
    return { tang: f, dpsCan: Math.round(need), ngayDat, ok: ngayDat !== null };
  });
  const [f2p, low, high] = res as [ProfileResult, ProfileResult, ProfileResult];
  const tranCfg = E.thietKe.congBang.tranChenhLech;
  const ratio = E.moPhong.mocNgay
    .filter((d) => d <= days)
    .map((d) => {
      const i = f2p.checkpoints.indexOf(d);
      const a = quantile(f2p.cl[i]!, 0.5),
        b = quantile(low.cl[i]!, 0.5),
        c = quantile(high.cl[i]!, 0.5),
        c99 = quantile(high.cl[i]!, 0.99),
        cMax = high.cl[i]!.reduce((m, x) => Math.max(m, x), 0),
        t = theoreticalMax(d, chars, E);
      return {
        ngay: d,
        khongNap: a,
        napIt: b,
        napNhieu: c,
        napNhieuP99: c99,
        napNhieuMax: cMax,
        tran: t,
        tiLe: c / a,
        tiLeP99: c99 / a,
        tiLeMax: cMax / a,
        tiLeTran: t / a,
        ok: cMax / a <= tranCfg,
      };
    });
  return { story, tower, ratio, ok: story.every((s) => s.ok) && tower.every((t) => t.ok) && ratio.every((r) => r.ok) };
}
