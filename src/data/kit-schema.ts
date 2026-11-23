import { z } from "zod";
import { ELEMENT_IDS } from "./schema";

/* Bộ chiêu riêng của nhân vật (S30): content/kits/<id>.yaml và danh mục buff/debuff content/statuses.yaml. */

const n = z.number().min(0);
const pos = z.number().positive();
const El = z.enum(ELEMENT_IDS);

export const CHI_SO = [
  "tanCong",
  "satThuong",
  "satThuongNguyenTo",
  "tiLeChiMang",
  "satThuongChiMang",
  "tinhThong",
  "hoiNang",
  "giamSatThuongNhan",
  "khangGianDoan",
  "giamKhang",
  "giamPhongThu",
  "lamCham",
  "danhDau",
  "dongBang",
  "gom",
  "dem",
] as const;
export type ChiSo = (typeof CHI_SO)[number];
export const VAI_TRO = ["chinh", "phu", "hoTro", "khongChe", "baoVe"] as const;
export const VAI_TRO_TEN: Record<(typeof VAI_TRO)[number], string> = {
  chinh: "Sát thương chính",
  phu: "Sát thương phụ",
  hoTro: "Hỗ trợ buff",
  khongChe: "Khống chế",
  baoVe: "Bảo vệ",
};

export const StatusDefSchema = z
  .object({
    id: z.string().regex(/^[a-zA-Z0-9]+$/),
    ten: z.string().min(1),
    icon: z.string().min(1),
    loai: z.enum(["buff", "debuff"]),
    chiSo: z.enum(CHI_SO),
    /** Trạng thái chung nhóm không cộng với nhau: chỉ tính cái mạnh nhất. Mặc định là id. */
    nhom: z.string().optional(),
    /** lamMoi: làm mới thời gian, lấy giá trị lớn hơn. tang: cộng tầng đến toiDa. */
    cong: z.enum(["lamMoi", "tang"]),
    toiDa: z.number().int().min(1).max(10).default(1),
    /** Gán nguyên tố cho đòn đánh thường khi còn hiệu lực. */
    gan: El.optional(),
    mo: z.string().min(1),
  })
  .strict();
export type StatusDef = z.infer<typeof StatusDefSchema>;

export const StatusCatalogSchema = z
  .object({
    /** Trần tổng mỗi chỉ số sau khi cộng các nhóm (chống cộng chồng vô hạn). */
    tran: z.record(z.enum(CHI_SO), pos),
    trangThai: z.array(StatusDefSchema).min(1),
  })
  .strict();
export type StatusCatalog = z.infer<typeof StatusCatalogSchema>;

/** Trạng thái do chiêu gắn lên. v: giá trị; theo: v nhân chỉ số người gắn (tấn công, máu, tinh thông). */
export const StsRefSchema = z
  .object({
    id: z.string(),
    v: n.default(0),
    t: pos,
    theo: z.enum(["atk", "hp", "tinhThong"]).optional(),
    /** Nguyên tố của trạng thái; "hut" là nguyên tố vừa bị Khuếch Tán hút. */
    el: z.union([El, z.literal("hut"), z.literal("vatLy")]).optional(),
    doi: z.enum(["banThan", "doi", "dongDoi", "dangDanh"]).optional(),
  })
  .strict();
export type StsRef = z.infer<typeof StsRefSchema>;

const common = {
  /** Trễ trước khi khối chạy, giây. */
  tre: n.optional(),
  m: n.default(0),
  el: z.union([El, z.literal("vatLy")]).optional(),
  /** Trạng thái gắn lên quái trúng đòn (debuff) hoặc người nhận (buff). */
  sts: z.array(StsRefSchema).default([]),
  fx: z.string().optional(),
  kb: n.optional(),
  /** Thứ tự lặp, ví dụ ba loạt sét. */
  lap: z.number().int().min(1).max(8).default(1),
  cach: n.default(0),
};
export const BlockSchema = z.discriminatedUnion("k", [
  z
    .object({
      k: z.literal("chem"),
      r: pos,
      goc: z.number().min(10).max(360).default(120),
      xa: n.default(0),
      ...common,
    })
    .strict(),
  z
    .object({
      k: z.literal("ban"),
      n: z.number().int().min(1).max(12).default(1),
      toa: n.default(0),
      toc: pos.default(600),
      r: pos.default(6),
      song: pos.default(0.8),
      xuyen: z.boolean().default(false),
      nay: z.number().int().min(0).max(4).default(0),
      duoi: z.boolean().default(false),
      kind: z.enum(["arrow", "orb", "spear", "lantern", "flower"]).default("orb"),
      /** Bắn lên trời rồi rơi xuống điểm đích sau `song` giây (đèn trời, tên nộ). */
      cao: z.boolean().default(false),
      /** Khi trúng: chạy các khối con tại điểm trúng. */
      no: z.array(z.lazy((): z.ZodTypeAny => BlockSchema)).optional(),
      ...common,
    })
    .strict(),
  z
    .object({
      k: z.literal("lao"),
      quang: pos,
      t: pos.default(0.2),
      lui: z.boolean().default(false),
      r: pos.default(50),
      ...common,
    })
    .strict(),
  z
    .object({
      k: z.literal("vung"),
      r: pos,
      t: pos,
      ti: pos.default(0.5),
      keo: n.default(0),
      theo: z.boolean().default(false),
      xa: n.default(0),
      troi: n.default(0),
      /** Hút nguyên tố của quái trong vùng (Khuếch Tán) rồi gây thêm sát thương nguyên tố đó. */
      hut: z.boolean().default(false),
      ...common,
    })
    .strict(),
  z
    .object({
      k: z.literal("trieu"),
      tag: z.string().min(1),
      toiDa: z.number().int().min(1).max(6),
      t: pos,
      cd: pos,
      tam: pos.default(340),
      soLuong: z.number().int().min(1).max(5).default(1),
      xa: n.default(30),
      /** Trạng thái cấp cho nhân vật đang đánh khi đứng gần vật triệu hồi. */
      hao: z
        .object({ r: pos, sts: z.array(StsRefSchema).min(1) })
        .strict()
        .optional(),
      ...common,
    })
    .strict(),
  z.object({ k: z.literal("buff"), ...common }).strict(),
  z
    .object({
      k: z.literal("khien"),
      hp: pos.max(1),
      t: pos,
      kgd: z.boolean().default(false),
      doi: z.enum(["banThan", "dangDanh"]).default("dangDanh"),
      ...common,
    })
    .strict(),
  z.object({ k: z.literal("hoiNang"), n: pos, doi: z.enum(["doi", "dongDoi"]).default("dongDoi"), ...common }).strict(),
  z.object({ k: z.literal("keo"), r: pos, luc: pos, xa: n.default(0), ...common }).strict(),
  z.object({ k: z.literal("phanDon"), t: pos, r: pos, ...common }).strict(),
  z.object({ k: z.literal("nhay"), vz: pos, ...common }).strict(),
  /** Phần riêng của nhân vật, cài trong src/combat/kits/<id>.ts. */
  z.object({ k: z.literal("dac"), ham: z.string().min(1), r: n.default(0), ...common }).strict(),
]);
export type Block = z.infer<typeof BlockSchema>;

const ChieuSchema = z
  .object({
    ten: z.string().min(1),
    mo: z.string().min(1),
    clip: z.string().regex(/^[a-z0-9]+\.[a-zA-Z0-9]+$|^[a-zA-Z0-9]+$/),
    khoi: z.array(BlockSchema).min(1),
  })
  .strict();
export type Chieu = z.infer<typeof ChieuSchema>;

export const KitSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+$/),
    vaiTro: z.array(z.enum(VAI_TRO)).min(1).max(3),
    /** Buff hoặc debuff đặc trưng, lý do để chọn vào đội. */
    dacTrung: z.array(z.string()).min(1),
    mau: z.object({ c: z.string(), c2: z.string() }).strict(),
    thuong: z
      .array(
        z
          .object({
            m: pos,
            clip: z.string().optional(),
            el: z.boolean().default(false),
            kb: n.optional(),
            vien: z.number().int().min(1).max(5).default(1),
            nay: z.number().int().min(0).max(3).default(0),
            khoi: z.array(BlockSchema).optional(),
          })
          .strict(),
      )
      .min(3)
      .max(5),
    trongKich: z
      .object({
        ten: z.string().min(1),
        mo: z.string().min(1),
        theLuc: n.default(20),
        /** Mức tụ lực: cung có hai mức, cận chiến một mức. */
        muc: z
          .array(z.object({ giay: pos, clip: z.string(), khoi: z.array(BlockSchema).min(1) }).strict())
          .min(1)
          .max(2),
      })
      .strict(),
    khong: z
      .object({ ten: z.string().min(1), mo: z.string().min(1), khoi: z.array(BlockSchema).min(1) })
      .strict()
      .optional(),
    kyNang: z
      .object({ ten: z.string().min(1), cd: pos, cdGiu: pos.optional(), bam: ChieuSchema, giu: ChieuSchema })
      .strict(),
    no: ChieuSchema.extend({ cost: pos, cine: z.number().min(1).max(1.5) }).strict(),
    biDong: z.array(z.object({ ten: z.string().min(1), mo: z.string().min(1) }).strict()).length(2),
    khamPha: z
      .object({
        ten: z.string().min(1),
        mo: z.string().min(1),
        nhay: z.number().min(1).max(1.5).default(1),
        chay: z.number().min(1).max(1.3).default(1),
      })
      .strict()
      .optional(),
  })
  .strict();
export type Kit = z.infer<typeof KitSchema>;

/** Kiểm tra chéo: mọi trạng thái được tham chiếu đều có trong danh mục, mọi bộ chiêu ứng với một nhân vật. */
export function validateKits(rawKits: Record<string, unknown>, rawStatuses: unknown, charIds: string[]) {
  const errors: string[] = [];
  const cat = StatusCatalogSchema.safeParse(rawStatuses);
  if (!cat.success) {
    cat.error.issues.forEach((i) => errors.push(`statuses.yaml: ${i.path.join(".")}: ${i.message}`));
    throw new Error(errors.join("\n"));
  }
  const ids = new Set<string>();
  for (const s of cat.data.trangThai) {
    if (ids.has(s.id)) errors.push(`statuses.yaml: trùng id ${s.id}`);
    ids.add(s.id);
  }
  const kits: Record<string, Kit> = {};
  for (const [file, data] of Object.entries(rawKits)) {
    const r = KitSchema.safeParse(data);
    if (!r.success) {
      r.error.issues.forEach((i) => errors.push(`${file}: ${i.path.join(".")}: ${i.message}`));
      continue;
    }
    const k = r.data;
    if (!file.endsWith(`/${k.id}.yaml`)) errors.push(`${file}: tên file phải là ${k.id}.yaml`);
    if (!charIds.includes(k.id)) errors.push(`${file}: không có nhân vật ${k.id}`);
    for (const id of stsOfKit(k))
      if (!ids.has(id)) errors.push(`${file}: không có trạng thái ${id} trong statuses.yaml`);
    for (const id of k.dacTrung) if (!ids.has(id)) errors.push(`${file}: dacTrung ${id} không có trong statuses.yaml`);
    kits[k.id] = k;
  }
  if (errors.length) throw new Error(errors.join("\n"));
  return { kits, statuses: cat.data };
}

/** Mọi khối của bộ chiêu (kể cả khối con khi đạn trúng). */
export function blocksOfKit(k: Kit): Block[] {
  const out: Block[] = [];
  const walk = (bs: Block[] | undefined) => {
    for (const b of bs ?? []) {
      out.push(b);
      if (b.k === "ban") walk(b.no as Block[] | undefined);
    }
  };
  k.thuong.forEach((t) => walk(t.khoi));
  k.trongKich.muc.forEach((m) => walk(m.khoi));
  walk(k.khong?.khoi);
  walk(k.kyNang.bam.khoi);
  walk(k.kyNang.giu.khoi);
  walk(k.no.khoi);
  return out;
}
export function stsOfKit(k: Kit): string[] {
  const s = new Set<string>();
  for (const b of blocksOfKit(k)) {
    b.sts.forEach((x) => s.add(x.id));
    if (b.k === "trieu") b.hao?.sts.forEach((x) => s.add(x.id));
  }
  return [...s];
}
/** Mọi clip riêng của bộ chiêu (dạng <id>.<chiêu>). */
export function clipsOfKit(k: Kit): string[] {
  const c = [
    ...k.thuong.map((t) => t.clip),
    ...k.trongKich.muc.map((m) => m.clip),
    k.kyNang.bam.clip,
    k.kyNang.giu.clip,
    k.no.clip,
  ].filter((x): x is string => !!x);
  return [...new Set(c)];
}
