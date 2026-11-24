/** S27: dáng (archetype) tư thế dùng chung (content/poses.yaml). */
import { z } from "zod";

export const DANG_IDS = [
  "nu-nho",
  "nu-teen",
  "nu-truong-thanh",
  "nu-dam-dang",
  "nam-nho",
  "nam-teen",
  "nam-truong-thanh",
  "nam-vam-vo",
] as const;
export type DangId = (typeof DANG_IDS)[number];

const n = (lo: number, hi: number) => z.number().min(lo).max(hi);
const nhip = z.object({ nhip: n(0.05, 1), bien: n(0, 2) }).strict();
// Giới hạn biên độ là ràng buộc nội dung: dáng đứng trang nhã, không nghiêng hông/vai quá mức.
const Dang = z
  .object({
    ten: z.string().min(1),
    gioi: z.enum(["nu", "nam"]),
    tre: z.boolean().default(false),
    dung: z
      .object({
        chan: n(-0.05, 0.1),
        /** Dồn trọng tâm về một chân (0..1), chân trụ đổi bên chậm; nghiêng hông theo chân trụ. */
        tru: n(0, 1),
        /** Chân không trụ đặt lên trước (H) và mở mũi chân (độ). */
        chanTruoc: n(0, 0.08),
        xoay: n(0, 25),
        hong: n(0, 3),
        vai: n(0, 2.5),
        /** Mở vai ra sau (độ): dáng vạm vỡ mở ngực, dáng trẻ em/thiếu nữ để 0. */
        moVai: n(0, 8),
        lung: n(-3, 4),
        dau: n(0, 8),
        /** Ngẩng (−) / cúi (+) đầu, độ. */
        dauCui: n(-6, 8),
        tay: z.object({ mo: n(0, 25), gap: n(0, 35), truoc: n(0, 1), sau: n(0, 1).default(0), dua: n(0, 12) }).strict(),
        tho: nhip,
        doiTrong: nhip,
      })
      .strict(),
    cho: z.object({ chan: n(0, 0.15), ha: n(0, 0.1), cui: n(0, 10), nhun: n(0, 0.03), nhipNhun: n(0.5, 3) }).strict(),
    chay: z
      .object({
        bien: n(0.6, 1.4),
        nhip: n(0.7, 1.35),
        nay: n(0.4, 1.8),
        mo: n(0, 20),
        /** Đổ người tới trước khi chạy (độ) và nghiêng vào khúc cua tối đa (độ). */
        nghieng: n(0, 20),
        lac: n(0, 20),
      })
      .strict(),
    /** Hoạt ảnh chờ ngẫu nhiên: sau `sau` giây đứng yên tay không thì chạy một clip trong danh sách. */
    nghi: z.object({ sau: n(2, 30), clip: z.array(z.string()).min(1) }).strict(),
    don: z.object({ nang: n(0, 1) }).strict(),
    tiLe: z.object({ cao: n(0.6, 1.4), rong: n(0.8, 1.4) }).strict(),
  })
  .strict()
  .superRefine((d, ctx) => {
    if (d.dung.tay.truoc > 0 && d.dung.tay.sau > 0)
      ctx.addIssue({ code: "custom", message: "tay.truoc và tay.sau không dùng cùng lúc" });
    if (d.tre && (d.dung.hong > 0 || d.dung.vai > 0 || d.dung.tay.truoc > 0 || d.dung.moVai > 0))
      ctx.addIssue({
        code: "custom",
        message: "dáng trẻ em chỉ dùng tư thế hồn nhiên: không nghiêng hông/vai, không khép tay trước người",
      });
  });
export type DangParams = z.infer<typeof Dang>;

const v3 = z.tuple([z.number(), z.number(), z.number()]);
const Noi = z
  .object({
    bone: z.string(),
    pos: v3,
    rot: v3,
    clip: z.string().optional(),
    luc: z.number().min(0).max(1),
    giu: z.number().positive().optional(),
    /** Clip rút (đứng yên, chưa ra đòn) và xoay vũ khí trong tay lúc rút: [từ, tới] (tỉ lệ clip), số vòng, trục. */
    rut: z.string().optional(),
    xoay: z.tuple([n(0, 1), n(0, 1), n(-4, 4)]).optional(),
    truc: z.enum(["x", "y", "z"]).optional(),
    /** Xoay thêm (độ) trong tay khi chạy trong trận: vũ khí hạ thấp, chéo ra sau người. */
    chay: v3.optional(),
  })
  .strict();
export const WEAPONS = ["sword", "great", "spear", "bow", "cat"] as const;
const VuKhi = z
  .object({
    cho: n(1, 6),
    gan: n(0, 2000),
    giu: n(0, 2),
    tan: n(0.1, 2),
    hien: n(0.02, 0.4),
    hat: z.object({ so: z.number().int().min(4).max(200), coDo: n(0.005, 0.2), bay: n(0, 2) }).strict(),
    noi: z
      .object(Object.fromEntries(WEAPONS.map((w) => [w, Noi])) as Record<(typeof WEAPONS)[number], typeof Noi>)
      .strict(),
  })
  .strict();
export type VuKhiCfg = z.infer<typeof VuKhi>;

/** S27: gió ở runtime cho spring bone (tóc, vải). Mô hình (S26) lo collider và quần trong; ở đây chỉ là lực và giới hạn góc. */
export const VAI = ["toc", "dai", "choang", "tay", "vay", "nguc", "khac"] as const;
export type Vai = (typeof VAI)[number];
const Xung = z.object({ luc: n(0, 4), banKinh: n(0.5, 20), song: n(0.1, 10), len: n(0, 1), xoay: n(0, 1) }).strict();
const GioiHan = z.object({ goc: n(5, 90), con: n(5, 60), tong: n(10, 150) }).strict();
const Gio = z
  .object({
    vung: z.record(z.object({ luc: n(0, 2), huong: n(-360, 360) }).strict()),
    thoiTiet: z.record(n(0, 3)),
    doCao: z.object({ tu: n(0, 200), moiM: n(0, 1), toiDa: n(0, 2) }).strict(),
    nhieu: z.object({ bien: n(0, 1), goc: n(0, 60), nhip: n(0.05, 5) }).strict(),
    mieng: z.object({ luc: n(0, 4), banKinh: n(0.2, 5) }).strict(),
    /** Gió ngược hướng lướt (tóc, dải vải bay ra sau); `tat`: giây tắt dần sau lướt. */
    luot: z.object({ luc: n(0, 4), tat: n(0.05, 2) }).strict(),
    xung: z.record(Xung),
    trongSo: z
      .object({ ...(Object.fromEntries(VAI.map((k) => [k, n(0, 2)])) as Record<Vai, z.ZodNumber>), nguc: n(0, 0) })
      .strict(),
    // Váy, vạt trước / sau: lệch tối đa 45–55° kể cả khi gió mạnh nhất (tong = cả chuỗi từ gốc tới mép).
    gioiHan: z
      .object({
        vay: GioiHan.extend({ goc: n(5, 55), tong: n(10, 55) }),
        tay: GioiHan.optional(),
        choang: GioiHan.optional(),
        dai: GioiHan.optional(),
        toc: GioiHan.optional(),
        khac: GioiHan.optional(),
      })
      .strict(),
    lucToiDa: n(0.1, 4),
  })
  .strict()
  .refine((g) => !!g.vung["mac-dinh"], { message: "gio.vung cần mục mac-dinh" });
export type GioCfg = z.infer<typeof Gio>;

export const PosesSchema = z
  .object({
    vuKhi: VuKhi,
    gio: Gio,
    dang: z.object(Object.fromEntries(DANG_IDS.map((k) => [k, Dang])) as Record<DangId, typeof Dang>).strict(),
  })
  .strict();
export type PosesConfig = z.infer<typeof PosesSchema>;
export function validatePoses(raw: unknown): PosesConfig {
  return PosesSchema.parse(raw);
}
