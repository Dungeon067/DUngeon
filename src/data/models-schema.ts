/** S25: cấu hình mô hình 3D (content/models.yaml). */
import { z } from "zod";

export const WT = z.enum(["sword", "great", "spear", "bow", "cat"]);
const v3 = z.tuple([z.number(), z.number(), z.number()]);
const perType = <T extends z.ZodTypeAny>(t: T) => z.object({ sword: t, great: t, spear: t, bow: t, cat: t });
const look = z.object({ height: z.number().positive(), yOffset: z.number().default(0) });
/** Dáng người (S27 sẽ định nghĩa danh sách đầy đủ), ví dụ nu-teen, nu-nho, nam-teen. */
const DANG = z.string().regex(/^(nu|nam)-[a-z0-9-]+$/);
export const ModelsSchema = z.object({
  mau: z.string().min(1),
  macDinh: look,
  vuKhiMacDinh: perType(z.string()),
  camVuKhi: perType(z.object({ bone: z.string(), pos: v3, rot: v3, scale: z.number().positive() })),
  hoatAnh: perType(
    z.object({
      stand: z.string(),
      atk: z.array(z.string()).length(3),
      charge: z.string(),
      skill: z.string(),
      burst: z.string(),
      speed: z.number().positive(),
    }),
  ),
  nhanVat: z.record(z.string(), look.partial().extend({ dang: DANG.optional() })).default({}),
});
export type ModelsConfig = z.infer<typeof ModelsSchema>;
export type WeaponType = z.infer<typeof WT>;
export function validateModels(raw: unknown): ModelsConfig {
  return ModelsSchema.parse(raw);
}
