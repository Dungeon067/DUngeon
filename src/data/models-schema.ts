/** S25: cấu hình mô hình 3D (content/models.yaml). */
import { z } from "zod";

export const WT = z.enum(["sword", "great", "spear", "bow", "cat"]);
const v3 = z.tuple([z.number(), z.number(), z.number()]);
const perType = <T extends z.ZodTypeAny>(t: T) => z.object({ sword: t, great: t, spear: t, bow: t, cat: t });
const look = z.object({ height: z.number().positive(), yOffset: z.number().default(0) });
export const ModelsSchema = z.object({
  mau: z.string().min(1),
  macDinh: look,
  vuKhiMacDinh: perType(z.string()),
  /** Gắn vũ khí vào xương CHUẨN HÓA (trục trùng hệ gốc ở tư thế chữ T): pos/rot trong hệ bàn tay (m, độ), at = điểm cầm dọc trục Y của vũ khí. */
  camVuKhi: perType(
    z.object({
      bone: z.string(),
      pos: v3,
      rot: v3,
      scale: z.number().positive(),
      at: z.number().default(0),
      /** Tay trái đỡ vũ khí hai tay: điểm cầm dọc thân vũ khí (at) và hướng bàn tay trái so với bàn tay phải (độ). */
      tay2: z.object({ at: z.number(), rot: v3 }).optional(),
    }),
  ),
  hoatAnh: perType(
    z.object({
      stand: z.string(),
      /** S27: thế chờ trong trận và di chuyển khi đang cầm vũ khí (ngoài trận dùng relax / walk / run / sprint tay không). */
      ready: z.string().optional(),
      move: z.object({ walk: z.string(), run: z.string(), sprint: z.string(), stop: z.string().optional() }).optional(),
      atk: z.array(z.string()).length(3),
      charge: z.string(),
      skill: z.string(),
      burst: z.string(),
      speed: z.number().positive(),
    }),
  ),
  nhanVat: z.record(z.string(), look.partial()).default({}),
});
export type ModelsConfig = z.infer<typeof ModelsSchema>;
export type WeaponType = z.infer<typeof WT>;
export function validateModels(raw: unknown): ModelsConfig {
  return ModelsSchema.parse(raw);
}
