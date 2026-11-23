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
        hong: n(0, 3),
        vai: n(0, 2.5),
        /** Mở vai ra sau (độ): dáng vạm vỡ mở ngực, dáng trẻ em/thiếu nữ để 0. */
        moVai: n(0, 8),
        lung: n(-3, 4),
        dau: n(0, 8),
        /** Ngẩng (−) / cúi (+) đầu, độ. */
        dauCui: n(-6, 8),
        tay: z.object({ mo: n(0, 25), gap: n(0, 35), truoc: n(0, 1), dua: n(0, 12) }).strict(),
        tho: nhip,
        doiTrong: nhip,
      })
      .strict(),
    cho: z.object({ chan: n(0, 0.15), ha: n(0, 0.1), cui: n(0, 10), nhun: n(0, 0.03), nhipNhun: n(0.5, 3) }).strict(),
    chay: z.object({ bien: n(0.6, 1.4), nhip: n(0.7, 1.35), nay: n(0.4, 1.8), mo: n(0, 20) }).strict(),
    don: z.object({ nang: n(0, 1) }).strict(),
    tiLe: z.object({ cao: n(0.6, 1.4), rong: n(0.8, 1.4) }).strict(),
  })
  .strict()
  .superRefine((d, ctx) => {
    if (d.tre && (d.dung.hong > 0 || d.dung.vai > 0 || d.dung.tay.truoc > 0 || d.dung.moVai > 0))
      ctx.addIssue({
        code: "custom",
        message: "dáng trẻ em chỉ dùng tư thế hồn nhiên: không nghiêng hông/vai, không khép tay trước người",
      });
  });
export type DangParams = z.infer<typeof Dang>;

const v3 = z.tuple([z.number(), z.number(), z.number()]);
const Noi = z
  .object({ bone: z.string(), pos: v3, rot: v3, clip: z.string().optional(), luc: z.number().min(0).max(1) })
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

export const PosesSchema = z
  .object({
    vuKhi: VuKhi,
    dang: z.object(Object.fromEntries(DANG_IDS.map((k) => [k, Dang])) as Record<DangId, typeof Dang>).strict(),
  })
  .strict();
export type PosesConfig = z.infer<typeof PosesSchema>;
export function validatePoses(raw: unknown): PosesConfig {
  return PosesSchema.parse(raw);
}
