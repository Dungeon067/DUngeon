/** S25: cấu hình mô hình 3D (content/models.yaml). */
import { z } from "zod";

export const WT = z.enum(["sword", "great", "spear", "bow", "cat"]);
const v3 = z.tuple([z.number(), z.number(), z.number()]);
const perType = <T extends z.ZodTypeAny>(t: T) => z.object({ sword: t, great: t, spear: t, bow: t, cat: t });
const look = z.object({ height: z.number().positive(), yOffset: z.number().default(0) });
/** Dáng người (S27 sẽ định nghĩa danh sách đầy đủ), ví dụ nu-teen, nu-nho, nam-teen. */
const DANG = z.string().regex(/^(nu|nam)-[a-z0-9-]+$/);
const grip = z.object({ bone: z.string(), pos: v3, rot: v3, scale: z.number().positive() });
/** Ghi đè loại vải theo mô hình: regex tên xương spring -> tên loại trong `vai.loai`. */
const vaiRieng = z.record(z.string(), z.string()).optional();
const clothType = z.object({ gocMax: z.number().min(0).max(180), gio: z.number().min(0).max(1) });
export const ModelsSchema = z
  .object({
    mau: z.string().min(1),
    macDinh: look,
    vuKhiMacDinh: perType(z.string()),
    camVuKhi: perType(grip),
    /** S26: giới hạn góc lật (độ, so với tư thế nghỉ) và trọng số gió theo loại vải/tóc của spring bone. */
    vai: z.object({
      loai: z.record(z.string(), clothType),
      xuong: z.array(z.tuple([z.string(), z.string()])).min(1),
      macDinh: z.string(),
    }),
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
    nhanVat: z
      .record(
        z.string(),
        look.partial().extend({
          dang: DANG.optional(),
          vuKhi: z.string().min(1).optional(),
          camVuKhi: grip.partial().optional(),
          vai: vaiRieng,
        }),
      )
      .default({}),
    /** Bộ NPC (public/media/models/npc/<id>/model.vrm): không vào slot nhân vật chơi được. */
    npc: z
      .record(
        z.string().regex(/^[a-z0-9-]+$/),
        look.partial().extend({ ten: z.string().min(1), dang: DANG, tu: z.string().optional(), vai: vaiRieng }),
      )
      .default({}),
  })
  .superRefine((m, ctx) => {
    const refs = [
      m.vai.macDinh,
      ...m.vai.xuong.map(([, l]) => l),
      ...[...Object.values(m.nhanVat), ...Object.values(m.npc)].flatMap((c) => Object.values(c.vai ?? {})),
    ];
    for (const l of refs)
      if (!m.vai.loai[l])
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["vai"], message: `loại vải chưa khai báo: ${l}` });
  });
export type ModelsConfig = z.infer<typeof ModelsSchema>;
export type WeaponType = z.infer<typeof WT>;
export function validateModels(raw: unknown): ModelsConfig {
  return ModelsSchema.parse(raw);
}
