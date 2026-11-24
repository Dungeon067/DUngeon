/** S31: Bảo Ấn (5 Mảnh Sao). Hàm thuần: tung chỉ số, nâng cấp theo mốc, phân rã, hiệu ứng bộ, quy ra Chiến Lực. */
import { SLOT_IDS, type BaoAnContent, type BoAn, type SlotId, type StatId } from "../data/bao-an-schema";

export type Rng = () => number;
export type BaRarity = 3 | 4 | 5;
export interface SubLine {
  k: StatId;
  /** Tổng giá trị đã tung (mỗi lần một bậc). */
  v: number;
  /** Số lần tung (1 lúc có dòng, +1 mỗi lần được tăng ở mốc). */
  n: number;
}
/** Một Bảo Ấn người chơi đang có. */
export interface BaoAnInst {
  uid: string;
  bo: string;
  o: SlotId;
  r: BaRarity;
  lv: number;
  exp: number;
  chinh: StatId;
  phu: SubLine[];
  lock: boolean;
}
/** Kết quả một mốc +4 khi nâng cấp. */
export interface MilestoneRoll {
  lv: number;
  k: StatId;
  add: number;
  moi: boolean;
}
/** Phần cộng thêm vào chỉ số nhân vật (đã quy về các trường của src/economy/core.ts). */
export interface BaoAnBonus {
  hp: number;
  atk: number;
  hpPct: number;
  atkPct: number;
  crit: number;
  cdmg: number;
  dmg: number;
}
export const NO_BONUS: BaoAnBonus = { hp: 0, atk: 0, hpPct: 0, atkPct: 0, crit: 0, cdmg: 0, dmg: 0 };

/** Nguyên tố nhân vật (content/config.yaml) → chỉ số sát thương nguyên tố của Mảnh Chén. */
export const EL_STAT: Record<string, StatId> = {
  fire: "stHoa",
  water: "stThuy",
  wind: "stPhong",
  bolt: "stLoi",
  earth: "stTho",
  ice: "stBang",
};

const rk = (r: BaRarity) => String(r) as "3" | "4" | "5";
const round = (v: number) => Math.round(v * 1e5) / 1e5;

function weighted<T extends string>(w: Partial<Record<T, number>>, rng: Rng): T {
  const e = Object.entries(w) as [T, number][];
  const tot = e.reduce((s, [, x]) => s + x, 0);
  let t = rng() * tot;
  for (const [k, x] of e) if ((t -= x) < 0) return k;
  return e[e.length - 1]![0];
}

export const slotOf = (C: BaoAnContent, o: SlotId) => C.o.find((x) => x.id === o)!;
export const setOf = (C: BaoAnContent, bo: string): BoAn => {
  const s = C.bo.find((x) => x.id === bo);
  if (!s) throw new Error(`Không có bộ ${bo}`);
  return s;
};
export const capOf = (C: BaoAnContent, r: BaRarity) => C.doHiem[rk(r)].capToiDa;

/** Giá trị chỉ số chính ở cấp lv: tăng đều từ heSoCap0 tới 1 ở cấp tối đa của độ hiếm. */
export function mainValue(C: BaoAnContent, a: Pick<BaoAnInst, "chinh" | "r" | "lv">) {
  const cap = capOf(C, a.r),
    k = C.chinh.heSoCap0 + ((1 - C.chinh.heSoCap0) * Math.min(a.lv, cap)) / cap;
  return round(C.chinh.giaTri[a.chinh]! * C.chinh.heSoDoHiem[rk(a.r)] * k);
}

/** Một lần tung giá trị dòng phụ: giá trị tối đa × hệ số độ hiếm × một trong các bậc. */
export function subRoll(C: BaoAnContent, k: StatId, r: BaRarity, rng: Rng) {
  const b = C.phu.bac[Math.min(C.phu.bac.length - 1, Math.floor(rng() * C.phu.bac.length))]!;
  return round(C.phu.giaTriToiDa[k]! * C.phu.heSoDoHiem[rk(r)] * b);
}

/** Các dòng phụ còn chọn được (bỏ chỉ số chính và dòng đã có). */
export function subPool(C: BaoAnContent, chinh: StatId, has: StatId[]) {
  const w: Partial<Record<StatId, number>> = {};
  for (const [k, x] of Object.entries(C.phu.trongSo) as [StatId, number][])
    if (k !== chinh && !has.includes(k)) w[k] = x;
  return w;
}

export interface RollSpec {
  bo: string;
  o: SlotId;
  r: BaRarity;
  chinh?: StatId;
  /** Admin: ép các dòng phụ (bỏ qua chỉ số không hợp lệ). */
  phu?: StatId[];
}
/** Tung một Bảo Ấn mới cấp 0. */
export function rollBaoAn(C: BaoAnContent, uid: string, s: RollSpec, rng: Rng): BaoAnInst {
  setOf(C, s.bo);
  const slot = slotOf(C, s.o);
  if (!slot) throw new Error(`Không có ô ${s.o}`);
  if (s.chinh && slot.chinh[s.chinh] === undefined) throw new Error("Chỉ số chính không có ở ô này");
  const chinh = s.chinh ?? weighted(slot.chinh, rng);
  const d = C.doHiem[rk(s.r)];
  const n = rng() < d.tiLeNhieu ? d.dongBanDau[1] : d.dongBanDau[0];
  const phu: SubLine[] = [];
  for (const k of s.phu ?? []) {
    if (phu.length >= 4 || k === chinh || C.phu.trongSo[k] === undefined || phu.some((x) => x.k === k)) continue;
    phu.push({ k, v: subRoll(C, k, s.r, rng), n: 1 });
  }
  while (phu.length < n) {
    const k = weighted(
      subPool(
        C,
        chinh,
        phu.map((x) => x.k),
      ),
      rng,
    );
    phu.push({ k, v: subRoll(C, k, s.r, rng), n: 1 });
  }
  return { uid, bo: s.bo, o: s.o, r: s.r, lv: 0, exp: 0, chinh, phu, lock: false };
}

/** Mốc +4: thêm 1 dòng nếu còn dưới 4 dòng, đủ 4 thì tăng ngẫu nhiên 1 dòng đã có. */
export function milestone(C: BaoAnContent, a: BaoAnInst, rng: Rng): MilestoneRoll {
  if (a.phu.length < 4) {
    const k = weighted(
      subPool(
        C,
        a.chinh,
        a.phu.map((x) => x.k),
      ),
      rng,
    );
    const add = subRoll(C, k, a.r, rng);
    a.phu.push({ k, v: add, n: 1 });
    return { lv: a.lv, k, add, moi: true };
  }
  const line = a.phu[Math.min(a.phu.length - 1, Math.floor(rng() * a.phu.length))]!;
  const add = subRoll(C, line.k, a.r, rng);
  line.v = round(line.v + add);
  line.n++;
  return { lv: a.lv, k: line.k, add, moi: false };
}

/** Kinh nghiệm để lên từ cấp lv lên lv + 1. */
export const expToNext = (C: BaoAnContent, r: BaRarity, lv: number) => {
  const k = C.kinhNghiem.theoDoHiem[rk(r)];
  return k.goc + k.moiCap * lv;
};
export function totalExp(C: BaoAnContent, a: BaoAnInst) {
  let s = a.exp;
  for (let l = 0; l < a.lv; l++) s += expToNext(C, a.r, l);
  return s;
}
/** Kinh nghiệm nhận được khi đem Bảo Ấn `a` làm nguyên liệu. */
export const fodderExp = (C: BaoAnContent, a: BaoAnInst) =>
  C.kinhNghiem.nguyenLieuGoc[rk(a.r)] + Math.floor(totalExp(C, a) * C.kinhNghiem.hoanLai);

/** Thêm kinh nghiệm (dừng ở cấp tối đa, phần thừa bỏ đi) và tung các mốc +4 vừa qua. */
export function addExp(C: BaoAnContent, a: BaoAnInst, n: number, rng: Rng) {
  const cap = capOf(C, a.r);
  let left = Math.max(0, Math.floor(n)),
    used = 0;
  const rolls: MilestoneRoll[] = [];
  while (left > 0 && a.lv < cap) {
    const need = expToNext(C, a.r, a.lv) - a.exp;
    if (left < need) {
      a.exp += left;
      used += left;
      break;
    }
    left -= need;
    used += need;
    a.lv++;
    a.exp = 0;
    if (a.lv % C.mocCap === 0) rolls.push(milestone(C, a, rng));
  }
  return { used, rolls };
}

/** Xem trước cấp đạt được (không tung mốc, không đổi `a`). */
export function previewExp(C: BaoAnContent, a: BaoAnInst, n: number) {
  const c = { ...a, phu: a.phu.map((x) => ({ ...x })) };
  const { used } = addExp(C, c, n, () => 0);
  return { lv: c.lv, exp: c.exp, used, cap: capOf(C, a.r) };
}

/** Phân rã: Bụi Ấn theo độ hiếm và số mốc đã qua, Sáp Ấn gốc + phần kinh nghiệm hoàn lại (Sáp lớn trước). */
export function dismantleYield(C: BaoAnContent, a: BaoAnInst) {
  const r = rk(a.r),
    P = C.phanRa;
  const bui = P.buiAn[r] + P.buiMoiMoc[r] * Math.floor(a.lv / C.mocCap);
  const sap: Record<string, number> = { ...P.sapGoc[r] };
  let back = Math.floor(totalExp(C, a) * P.hoanKinhNghiem);
  for (const s of [...C.kinhNghiem.sap].sort((x, y) => y.kinhNghiem - x.kinhNghiem)) {
    const k = Math.floor(back / s.kinhNghiem);
    if (k > 0) sap[s.id] = (sap[s.id] ?? 0) + k;
    back -= k * s.kinhNghiem;
  }
  return { bui, sap };
}

/** Bộ đang kích hoạt: số mảnh mỗi bộ, mức 2 (Sao nhóm), 4 (Sao rạng), 5 (Sao sáng trọn, chỉ hình ảnh). */
export function activeSets(C: BaoAnContent, items: Pick<BaoAnInst, "bo">[]) {
  const n: Record<string, number> = {};
  for (const a of items) n[a.bo] = (n[a.bo] ?? 0) + 1;
  return Object.entries(n)
    .map(([bo, k]) => ({ bo, n: k, set: setOf(C, bo), hai: k >= 2, bon: k >= 4, tron: k >= 5 }))
    .sort((a, b) => b.n - a.n);
}
export const starState = (n: number) =>
  n >= 5 ? "Sao sáng trọn" : n >= 4 ? "Sao rạng" : n >= 2 ? "Sao nhóm" : "Chưa sáng";

/** Tổng chỉ số thô từ chỉ số chính, dòng phụ và giá trị quy đổi của hiệu ứng bộ. */
export function rawStats(C: BaoAnContent, items: BaoAnInst[]) {
  const s: Partial<Record<StatId | "dmg" | "doiAtkPct", number>> = {};
  const add = (k: string, v: number) => (s[k as StatId] = (s[k as StatId] ?? 0) + v);
  for (const a of items) {
    add(a.chinh, mainValue(C, a));
    for (const p of a.phu) add(p.k, p.v);
  }
  for (const x of activeSets(C, items)) {
    if (x.hai) for (const [k, v] of Object.entries(x.set.hai.chienLuc)) add(k, v);
    if (x.bon) for (const [k, v] of Object.entries(x.set.bon.chienLuc)) add(k, v);
  }
  return s;
}

/** Quy Bảo Ấn đang mặc về phần cộng của Chiến Lực. `baseHp` là Máu gốc nhân vật (để quy %Phòng thủ). */
export function bonusOf(C: BaoAnContent, items: BaoAnInst[], el?: string): BaoAnBonus {
  if (!items.length) return { ...NO_BONUS };
  const s = rawStats(C, items),
    g = (k: string) => s[k as StatId] ?? 0,
    L = C.chienLuc;
  const elDmg = el && EL_STAT[el] ? g(EL_STAT[el]!) : 0;
  return {
    hp: g("hp") + g("def") * L.heSoPhongThu,
    atk: g("atk"),
    hpPct: g("hpPct") + g("defPct") * L.tiLePhongThuGoc * L.heSoPhongThu,
    atkPct: g("atkPct") + g("doiAtkPct"),
    crit: g("chiMang"),
    cdmg: g("stcm"),
    dmg:
      g("dmg") +
      elDmg +
      g("tinhThong") * L.tinhThongRaSatThuong +
      g("hoiNl") * L.hoiNlRaSatThuong +
      g("triLieu") * L.triLieuRaSatThuong,
  };
}

/** Sắp xếp 5 ô theo thứ tự trong content. */
export const SLOTS = SLOT_IDS;
export const isPct = (C: BaoAnContent, k: StatId) => C.chiSo[k]?.kieu === "pct";
