import { z } from "zod";

/** Kiểm tra content/bao-an.yaml (S31). Thiết kế: docs/economy/bao-an.md. */

const n = z.number().nonnegative();
const int = z.number().int().nonnegative();
const pct = z.number().min(0).max(1);
const id = z.string().regex(/^[a-z0-9-]+$/);
const RARITIES = ["3", "4", "5"] as const;
const byRarity = <T extends z.ZodTypeAny>(t: T) => z.object({ "3": t, "4": t, "5": t }).strict();

export const SLOT_IDS = ["hoa", "long", "den", "chen", "mien"] as const;
export type SlotId = (typeof SLOT_IDS)[number];
export const STAT_IDS = [
  "hp",
  "atk",
  "def",
  "hpPct",
  "atkPct",
  "defPct",
  "tinhThong",
  "hoiNl",
  "chiMang",
  "stcm",
  "triLieu",
  "stHoa",
  "stThuy",
  "stPhong",
  "stLoi",
  "stTho",
  "stBang",
  "stMoc",
  "stVatLy",
] as const;
export type StatId = (typeof STAT_IDS)[number];
const statId = z.enum(STAT_IDS);
const statMap = <T extends z.ZodTypeAny>(t: T) => z.record(statId, t);
/** Khóa giá trị quy đổi Chiến Lực của hiệu ứng bộ. */
const setValue = z.record(z.union([statId, z.enum(["dmg", "doiAtkPct"])]), n);

const SetEffect = z.object({ hieuUng: z.string().min(1), chienLuc: setValue }).strict();
const Piece = z.object({ ten: z.string().min(1), truyen: z.string().min(1) }).strict();

export const BoAnSchema = z
  .object({
    id,
    ten: z.string().min(1),
    vung: z.string().min(1),
    vaiTro: z.string().min(1),
    sao: Piece,
    mau: z.tuple([z.string().regex(/^#[0-9a-f]{6}$/i), z.string().regex(/^#[0-9a-f]{6}$/i)]),
    hai: SetEffect,
    bon: SetEffect,
    mon: z.object(Object.fromEntries(SLOT_IDS.map((s) => [s, Piece])) as Record<SlotId, typeof Piece>).strict(),
  })
  .strict();

export const BaoAnSchema = z
  .object({
    chiSo: z.object(
      Object.fromEntries(
        STAT_IDS.map((s) => [s, z.object({ ten: z.string().min(1), kieu: z.enum(["so", "pct"]) }).strict()]),
      ) as unknown as Record<StatId, z.ZodTypeAny>,
    ),
    o: z.array(z.object({ id: z.enum(SLOT_IDS), ten: z.string().min(1), chinh: statMap(n) }).strict()),
    doHiem: byRarity(z.object({ capToiDa: int.min(1), dongBanDau: z.tuple([int, int]), tiLeNhieu: pct }).strict()),
    mocCap: int.min(1),
    chinh: z.object({ giaTri: statMap(n), heSoDoHiem: byRarity(n), heSoCap0: pct }).strict(),
    phu: z
      .object({
        giaTriToiDa: statMap(n),
        bac: z.array(n).min(1),
        heSoDoHiem: byRarity(n),
        trongSo: statMap(n),
      })
      .strict(),
    kinhNghiem: z
      .object({
        theoDoHiem: byRarity(z.object({ goc: int, moiCap: int }).strict()),
        xuMoiKinhNghiem: n,
        nguyenLieuGoc: byRarity(int),
        hoanLai: pct,
        sap: z
          .array(
            z.object({ id, r: z.union([z.literal(3), z.literal(4), z.literal(5)]), kinhNghiem: int.min(1) }).strict(),
          )
          .min(1),
      })
      .strict(),
    phanRa: z
      .object({
        buiAn: byRarity(int),
        buiMoiMoc: byRarity(int),
        hoanKinhNghiem: pct,
        sapGoc: byRarity(z.record(id, int)),
      })
      .strict(),
    doi: z
      .array(
        z
          .object({
            id,
            ten: z.string().min(1),
            chon: z.array(z.enum(["bo", "o", "chinh"])).min(1),
            buiAn: int.min(1),
            moiTuan: int.min(1),
          })
          .strict(),
      )
      .min(1),
    khoiDau: z
      .object({
        sap: z.record(id, int),
        buiAn: int,
        bao: z.array(z.object({ bo: id, r: z.union([z.literal(3), z.literal(4), z.literal(5)]) }).strict()),
      })
      .strict(),
    biCanh: z
      .object({
        moCapHoTinh: int.min(1),
        linhLuc: int.min(1),
        xu: int,
        roi: z.array(z.object({ r3: n, r4: n, r5: n }).strict()).min(1),
        sap: z.record(id, n),
        sapMoiTT: n,
        danhSach: z
          .array(
            z
              .object({
                id,
                ten: z.string().min(1),
                vung: z.string().min(1),
                bo: z.tuple([id, id]),
                quai: z.array(id).min(1),
              })
              .strict(),
          )
          .min(1),
      })
      .strict(),
    chienLuc: z
      .object({
        heSoPhongThu: n,
        tinhThongRaSatThuong: n,
        hoiNlRaSatThuong: n,
        triLieuRaSatThuong: n,
        tiLePhongThuGoc: n,
      })
      .strict(),
    moPhong: z
      .object({
        soNguoi: int.min(1),
        luotMoiNgay: int,
        boChinh: id,
        boPhu: id,
        uaThich: z.record(z.enum(SLOT_IDS), z.array(statId).min(1)),
        phuUaThich: z.array(statId).min(1),
      })
      .strict(),
    bo: z.array(BoAnSchema).length(8),
  })
  .strict();

export type BaoAnContent = z.infer<typeof BaoAnSchema>;
export type BoAn = z.infer<typeof BoAnSchema>;

/** Số âm tiết (tách theo khoảng trắng). */
const syllables = (s: string) => s.trim().split(/\s+/).length;
const sentences = (s: string) => s.split(/[.!?…]+/).filter((x) => x.trim()).length;

export interface BaoAnRefs {
  itemIds: string[];
  enemyIds: string[];
  /** Số mức Thiên Tượng (economy.yaml thienTuong.muc). */
  thienTuong: number;
}

export function validateBaoAn(raw: unknown, refs: BaoAnRefs): { baoAn?: BaoAnContent; errors: string[] } {
  const r = BaoAnSchema.safeParse(raw);
  if (!r.success) return { errors: r.error.issues.map((i) => `bao-an.yaml: ${i.path.join(".")}: ${i.message}`) };
  const b = r.data;
  const errors: string[] = [];
  const e = (m: string) => errors.push(`bao-an.yaml: ${m}`);

  const slots = b.o.map((o) => o.id);
  if (slots.join() !== SLOT_IDS.join()) e(`o phải đúng thứ tự ${SLOT_IDS.join(", ")}`);
  const fixed: Partial<Record<SlotId, StatId>> = { hoa: "hp", long: "atk" };
  for (const o of b.o) {
    const keys = Object.keys(o.chinh) as StatId[];
    if (fixed[o.id] && keys.join() !== fixed[o.id]) e(`ô ${o.id} chỉ có chỉ số chính ${fixed[o.id]}`);
    if (!fixed[o.id] && keys.length < 2) e(`ô ${o.id} cần chỉ số chính ngẫu nhiên (≥ 2 lựa chọn)`);
    keys.forEach((k) => b.chinh.giaTri[k] === undefined && e(`chinh.giaTri thiếu ${k} (ô ${o.id})`));
    if (new Set(b.o.map((x) => x.ten)).size !== b.o.length) e("tên ô trùng");
  }
  const subs = Object.keys(b.phu.trongSo) as StatId[];
  subs.forEach((k) => b.phu.giaTriToiDa[k] === undefined && e(`phu.giaTriToiDa thiếu ${k}`));
  for (const o of b.o) {
    for (const m of Object.keys(o.chinh)) {
      if (subs.filter((s) => s !== m).length < 4) e(`ô ${o.id}: chính ${m} không đủ 4 dòng phụ khác`);
    }
  }
  if (b.phu.bac.some((x, i, a) => i > 0 && x <= a[i - 1]!)) e("phu.bac phải tăng dần");
  for (const k of RARITIES) {
    const d = b.doHiem[k];
    if (d.dongBanDau[0] > d.dongBanDau[1] || d.dongBanDau[1] > 4) e(`doHiem.${k}.dongBanDau sai`);
    if (d.capToiDa % b.mocCap !== 0) e(`doHiem.${k}.capToiDa phải chia hết cho mocCap`);
  }
  if (b.doHiem["5"].capToiDa !== 20) e("Bảo Ấn 5★ nâng tối đa +20");

  const items = new Set(refs.itemIds);
  const sapIds = new Set(b.kinhNghiem.sap.map((s) => s.id));
  b.kinhNghiem.sap.forEach((s) => items.has(s.id) || e(`kinhNghiem.sap: ${s.id} không có trong items.yaml`));
  if (!items.has("bui-an")) e("items.yaml thiếu bui-an (Bụi Ấn)");
  const sapRefs = [
    ...Object.keys(b.khoiDau.sap),
    ...Object.keys(b.biCanh.sap),
    ...RARITIES.flatMap((k) => Object.keys(b.phanRa.sapGoc[k])),
  ];
  sapRefs.forEach((s) => sapIds.has(s) || e(`Sáp Ấn ${s} không có trong kinhNghiem.sap`));

  const setIds = new Set<string>();
  const names = new Set<string>();
  for (const s of b.bo) {
    if (setIds.has(s.id)) e(`bộ trùng id ${s.id}`);
    setIds.add(s.id);
    for (const [slot, p] of Object.entries(s.mon)) {
      const where = `bộ ${s.id} ô ${slot}`;
      if (names.has(p.ten)) e(`${where}: tên trùng ${p.ten}`);
      names.add(p.ten);
      if (syllables(p.ten) > 6) e(`${where}: tên quá 6 âm tiết`);
      const c = sentences(p.truyen);
      if (c < 2 || c > 3) e(`${where}: truyện cần 2–3 câu (đang ${c})`);
      if (p.truyen.length > 230) e(`${where}: truyện dài ${p.truyen.length} ký tự (tối đa 230)`);
      if (/\d|%/.test(p.truyen)) e(`${where}: truyện không ghi chỉ số`);
    }
    if (syllables(s.ten) > 6) e(`bộ ${s.id}: tên quá 6 âm tiết`);
    const cs = sentences(s.sao.truyen);
    if (cs < 2 || cs > 3) e(`bộ ${s.id}: truyện vì sao cần 2–3 câu (đang ${cs})`);
    if (/\d|%/.test(s.sao.truyen)) e(`bộ ${s.id}: truyện vì sao không ghi chỉ số`);
    if (syllables(s.sao.ten) > 6) e(`bộ ${s.id}: tên vì sao quá 6 âm tiết`);
    if (names.has(s.ten)) e(`bộ ${s.id}: tên trùng`);
  }
  const seen = new Map<string, string>();
  for (const d of b.biCanh.danhSach) {
    if (d.bo[0] === d.bo[1]) e(`bí cảnh ${d.id}: hai bộ trùng nhau`);
    for (const s of d.bo) {
      if (!setIds.has(s)) e(`bí cảnh ${d.id}: không có bộ ${s}`);
      if (seen.has(s)) e(`bộ ${s} rơi ở cả ${seen.get(s)} và ${d.id}`);
      seen.set(s, d.id);
    }
    d.quai.forEach((q) => refs.enemyIds.includes(q) || e(`bí cảnh ${d.id}: không có quái ${q}`));
  }
  setIds.forEach((s) => seen.has(s) || e(`bộ ${s} không rơi ở bí cảnh nào`));
  if (b.biCanh.roi.length !== refs.thienTuong) e(`biCanh.roi cần ${refs.thienTuong} mức Thiên Tượng`);
  b.biCanh.roi.forEach((x, i, a) => {
    if (i > 0 && x.r5 < a[i - 1]!.r5) e(`biCanh.roi[${i}]: 5★ không được giảm khi Thiên Tượng tăng`);
  });
  b.khoiDau.bao.forEach((x) => setIds.has(x.bo) || e(`khoiDau: không có bộ ${x.bo}`));
  [b.moPhong.boChinh, b.moPhong.boPhu].forEach((s) => setIds.has(s) || e(`moPhong: không có bộ ${s}`));
  for (const [slot, stats] of Object.entries(b.moPhong.uaThich)) {
    const o = b.o.find((x) => x.id === slot);
    stats.forEach((st) => o?.chinh[st] !== undefined || e(`moPhong.uaThich.${slot}: ô không có chính ${st}`));
  }
  return { baoAn: b, errors };
}
