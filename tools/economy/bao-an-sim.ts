/**
 * S31: mô phỏng Bảo Ấn của người không nạp (Bảo Ấn không bán bằng tiền nên mọi hồ sơ như nhau).
 * `soNguoi` người cày ảo đi Bí Cảnh Bảo Ấn theo Thiên Tượng, tung đồ đúng bảng content/bao-an.yaml,
 * phân rã đồ thừa, đổi theo giới hạn tuần, dồn Sáp vào bộ đang mặc. Trả về phần cộng trung vị theo ngày.
 */
import { BaoAnSchema, SLOT_IDS, type BaoAnContent, type SlotId, type StatId } from "../../src/data/bao-an-schema";
import type { Economy } from "../../src/data/economy-schema";
import { caps, hoTinhLevel } from "../../src/economy/core";
import {
  addExp,
  bonusOf,
  capOf,
  dismantleYield,
  NO_BONUS,
  rollBaoAn,
  type BaRarity,
  type BaoAnBonus,
  type BaoAnInst,
  type Rng,
} from "../../src/economy/bao-an";
import { loadRawBaoAn } from "../../scripts/load-content";

let cached: BaoAnContent | null = null;
/** Nội dung Bảo Ấn cho công cụ Node (kiểm tham chiếu đầy đủ nằm ở content:check). */
export const simBaoAn = () => (cached ??= BaoAnSchema.parse(loadRawBaoAn()) as BaoAnContent);

export interface BaoAnFlow {
  /** Ngày mở Bí Cảnh Bảo Ấn (đủ cấp Hộ Tinh). */
  openDay: number;
  /** Phần cộng trung vị của chủ lực theo ngày. */
  bonus: BaoAnBonus[];
  /** Hệ số Chiến Lực xấp xỉ của phần cộng trung vị (1 = không có Bảo Ấn). */
  gain: number[];
  /** Xu ròng cộng dồn từ Bí Cảnh Bảo Ấn (thưởng trừ phí nâng cấp). */
  xu: number[];
  /** Trung vị số món 5★ cấp tối đa đang mặc theo ngày. */
  max5: number[];
}

function mulberry(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hệ số Chiến Lực xấp xỉ (tấn công hiệu dụng × máu) của một phần cộng, so với nhân vật chuẩn. */
export function gainOf(b: BaoAnBonus, E: Economy, base = { hp: 12000, atk: 900 }) {
  const cm = E.game.chiMang["5"],
    crit0 = cm.tiLe,
    cd0 = cm.satThuong;
  const atk = (base.atk * (1 + b.atkPct) + b.atk) / base.atk;
  const crit = (1 + Math.min(1, crit0 + b.crit) * (cd0 + b.cdmg)) / (1 + crit0 * cd0);
  const hp = (base.hp * (1 + b.hpPct) + b.hp) / base.hp;
  return atk * crit * (1 + b.dmg) * Math.sqrt(hp);
}

const flowCache = new WeakMap<object, BaoAnFlow>();
export function baoAnFlow(E: Economy, days = E.moPhong.soNgay, C = simBaoAn()): BaoAnFlow {
  const hit = flowCache.get(E);
  if (hit && hit.bonus.length > days) return hit;
  const M = C.moPhong,
    B = C.biCanh;
  const dom = B.danhSach.find((d) => d.bo.includes(M.boChinh))!;
  let openDay = 0;
  while (openDay <= days && hoTinhLevel(openDay, E) < B.moCapHoTinh) openDay++;
  const ttOf = Array.from({ length: days + 1 }, (_, d) => caps(hoTinhLevel(d, E), E).thienTuong);
  const sapExp = Object.fromEntries(C.kinhNghiem.sap.map((s) => [s.id, s.kinhNghiem]));
  const expOfSap = (s: Record<string, number>, k = 1) =>
    Object.entries(s).reduce((t, [id, n]) => t + (sapExp[id] ?? 0) * n * k, 0);
  const useful = new Set<StatId>(M.phuUaThich as StatId[]);
  const goodMain = (a: BaoAnInst) => {
    const u = (M.uaThich as Partial<Record<SlotId, StatId[]>>)[a.o];
    return !u || u.includes(a.chinh);
  };
  /** Điểm tiềm năng: đúng chỉ số chính, độ hiếm, các dòng phụ có ích. */
  const score = (a: BaoAnInst) => {
    let s = (goodMain(a) ? 10 : 0) + a.r * 3 + (a.bo === M.boChinh ? 2 : 0);
    for (const p of a.phu) if (useful.has(p.k)) s += (p.v / C.phu.giaTriToiDa[p.k]!) * 1.5;
    return s;
  };
  const N = M.soNguoi,
    perDay: BaoAnBonus[][] = Array.from({ length: days + 1 }, () => []),
    perMax: number[][] = Array.from({ length: days + 1 }, () => []);
  let xuNet = 0;
  const xuDay = new Array<number>(days + 1).fill(0);
  for (let pi = 0; pi < N; pi++) {
    const rng = mulberry(E.moPhong.seed * 7919 + pi);
    let seq = 0,
      bui = C.khoiDau.buiAn,
      exp = expOfSap(C.khoiDau.sap),
      xu = 0;
    /** Món tốt nhất của bộ chính theo ô, và món tốt nhất bất kỳ theo ô (ô tự do). */
    const main: Partial<Record<SlotId, BaoAnInst>> = {},
      any: Partial<Record<SlotId, BaoAnInst>> = {};
    const scrap = (a: BaoAnInst) => {
      const y = dismantleYield(C, a);
      bui += y.bui;
      exp += expOfSap(y.sap);
    };
    const keep = (a: BaoAnInst) => {
      const tab = a.bo === M.boChinh ? main : any;
      const cur = tab[a.o];
      if (!cur || score(a) > score(cur)) {
        tab[a.o] = a;
        if (cur) scrap(cur);
      } else scrap(a);
    };
    const loadout = () => {
      const four = SLOT_IDS.filter((o) => main[o]).sort((x, y) => score(main[y]!) - score(main[x]!));
      const pick = four.slice(0, 4);
      const rest = SLOT_IDS.filter((o) => !pick.includes(o));
      const items = pick.map((o) => main[o]!);
      for (const o of rest) {
        const cand = [main[o], any[o]].filter(Boolean) as BaoAnInst[];
        cand.sort((x, y) => score(y) - score(x));
        if (cand[0]) items.push(cand[0]);
      }
      return items;
    };
    for (const x of C.khoiDau.bao)
      for (const o of SLOT_IDS) keep(rollBaoAn(C, `s${seq++}`, { bo: x.bo, o, r: x.r as BaRarity }, rng));
    const levelUp = () => {
      for (const a of loadout()) {
        if (exp <= 0) break;
        if (a.lv >= capOf(C, a.r)) continue;
        const { used } = addExp(C, a, exp, rng);
        exp -= used;
        xu -= used * C.kinhNghiem.xuMoiKinhNghiem;
      }
    };
    levelUp();
    for (let d = 0; d <= days; d++) {
      if (d >= openDay && d > 0) {
        const tt = ttOf[d]!,
          roi = B.roi[tt]!;
        for (let run = 0; run < M.luotMoiNgay; run++) {
          xu += B.xu;
          exp += expOfSap(B.sap, 1 + B.sapMoiTT * tt);
          for (const [r, e] of [
            [3, roi.r3],
            [4, roi.r4],
            [5, roi.r5],
          ] as [BaRarity, number][]) {
            const n = Math.floor(e) + (rng() < e - Math.floor(e) ? 1 : 0);
            for (let i = 0; i < n; i++) {
              const bo = dom.bo[Math.floor(rng() * dom.bo.length)]!,
                o = SLOT_IDS[Math.floor(rng() * SLOT_IDS.length)]!;
              const a = rollBaoAn(C, `s${seq++}`, { bo, o, r }, rng);
              if (r < 5 && Object.values(main).every((m) => m!.r >= r)) scrap(a);
              else keep(a);
            }
          }
        }
        if (d % 7 === 0)
          for (const x of C.doi) {
            for (let k = 0; k < x.moiTuan && bui >= x.buiAn; k++) {
              const weak = SLOT_IDS.slice().sort(
                (p, q) => (main[p] ? score(main[p]!) : -1) - (main[q] ? score(main[q]!) : -1),
              )[0]!;
              const u = (M.uaThich as Partial<Record<SlotId, StatId[]>>)[weak];
              const chinh = x.chon.includes("chinh") && u ? u[0] : undefined;
              bui -= x.buiAn;
              keep(rollBaoAn(C, `s${seq++}`, { bo: M.boChinh, o: weak, r: 5, chinh }, rng));
            }
          }
        levelUp();
      }
      const items = loadout();
      perDay[d]!.push(items.length ? bonusOf(C, items, "bolt") : { ...NO_BONUS });
      perMax[d]!.push(items.filter((a) => a.r === 5 && a.lv >= capOf(C, 5)).length);
      if (pi === 0) xuDay[d] = xu;
    }
    xuNet += xu;
  }
  void xuNet;
  const med = <T>(xs: T[], key: (x: T) => number) => xs.slice().sort((a, b) => key(a) - key(b))[xs.length >> 1]!;
  const bonus = perDay.map((xs) => med(xs, (b) => gainOf(b, E)));
  const res: BaoAnFlow = {
    openDay,
    bonus,
    gain: bonus.map((b) => gainOf(b, E)),
    xu: xuDay,
    max5: perMax.map((xs) => med(xs, (x) => x)),
  };
  flowCache.set(E, res);
  return res;
}
