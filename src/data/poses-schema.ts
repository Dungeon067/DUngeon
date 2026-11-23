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
        chan: n(-0.04, 0.08),
        hong: n(0, 2),
        vai: n(0, 1.5),
        lung: n(-2, 4),
        dau: n(0, 5),
        tay: z.object({ mo: n(0, 20), gap: n(0, 30), truoc: n(0, 1) }).strict(),
        tho: nhip,
        doiTrong: nhip,
      })
      .strict(),
    cho: z.object({ chan: n(0, 0.15), ha: n(0, 0.1), cui: n(0, 10), nhun: n(0, 0.03), nhipNhun: n(0.5, 3) }).strict(),
    chay: z.object({ bien: n(0.7, 1.3), nhip: n(0.7, 1.3), nay: n(0.5, 1.6) }).strict(),
    don: z.object({ nang: n(0, 1) }).strict(),
    tiLe: z.object({ cao: n(0.6, 1.4), rong: n(0.8, 1.4) }).strict(),
  })
  .strict()
  .superRefine((d, ctx) => {
    if (d.tre && (d.dung.hong > 0 || d.dung.vai > 0 || d.dung.tay.truoc > 0))
      ctx.addIssue({ code: "custom", message: "dáng trẻ em chỉ dùng tư thế hồn nhiên: không nghiêng hông/vai, không khép tay trước người" });
  });
export type DangParams = z.infer<typeof Dang>;

export const PosesSchema = z
  .object({ dang: z.object(Object.fromEntries(DANG_IDS.map((k) => [k, Dang])) as Record<DangId, typeof Dang>).strict() })
  .strict();
export type PosesConfig = z.infer<typeof PosesSchema>;
export function validatePoses(raw: unknown): PosesConfig {
  return PosesSchema.parse(raw);
}
