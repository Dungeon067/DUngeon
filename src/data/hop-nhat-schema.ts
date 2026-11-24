/** Hợp nhất repo mở (docs/tham-khao/hop-nhat-repo-mo.md): schema cho movement, camera, abilities, scene-groups. */
import { z } from "zod";

const num = z.number();
const pos = z.number().positive();
const clip = z.object({ tam: z.string(), toc: pos.optional(), can: z.string().optional() });
const STATES = [
  "walk",
  "run",
  "sprint",
  "dash",
  "stopLight",
  "stopMedium",
  "stopHard",
  "fall",
  "landLight",
  "landRoll",
  "landHard",
] as const;
export const MoveSchema = z.object({
  toc: z.object({
    coSo: pos,
    di: pos,
    chay: pos,
    chayNhanh: pos,
    luot: pos,
    diNguong: z.number().min(0).max(1),
    nhaChayNhanh: num.min(0),
  }),
  luot: z.object({ thoiGian: pos, lienTiep: z.number().int().min(1), cuaSo: pos, hoi: num.min(0) }),
  dung: z.object({
    nhe: z.object({ ham: pos, toiDa: pos }),
    vua: z.object({ ham: pos, toiDa: pos }),
    manh: z.object({ ham: pos, toiDa: pos }),
  }),
  roi: z.object({ gioiHan: pos, nangTu: pos, bacM: pos }),
  dat: z.object({ nhe: pos, lan: pos, nang: pos }),
  xoay: pos,
  clip: z.object(Object.fromEntries(STATES.map((s) => [s, clip])) as Record<(typeof STATES)[number], typeof clip>),
  ikChan: z.object({ bat: z.boolean(), toiDa: pos, muot: pos, nghieng: num.min(0) }),
});
export type MoveCfg = z.infer<typeof MoveSchema>;

const camState = z.object({ uuTien: num, xa: pos, goc: num, fov: pos, tron: pos });
export const CameraSchema = z.object({
  bat: z.boolean(),
  vaCham: z.object({ dem: num.min(0), gan: pos, keoVao: pos, noiRa: pos }),
  trangThai: z.record(z.string(), camState),
});
export type CameraCfg = z.infer<typeof CameraSchema>;
export type CamState = z.infer<typeof camState>;

const vung = z.object({ r: num.min(0) });
export const MixinSchema = z.discriminatedUnion("loai", [
  z.object({ loai: z.literal("khiBatDau"), vung, satThuong: num, nguyenTo: z.string(), day: num.optional() }),
  z.object({ loai: z.literal("khiTrungDon"), gan: z.string() }),
  z.object({ loai: z.literal("moiGiay"), chuKy: pos, vung, satThuong: num, nguyenTo: z.string() }),
]);
export type Mixin = z.infer<typeof MixinSchema>;
const modifier = z.object({ thoiGian: pos, mixin: z.array(MixinSchema) });
export const AbilitiesSchema = z
  .object({ modifier: z.record(z.string(), modifier) })
  .catchall(z.object({ cd: pos, mixin: z.array(MixinSchema).min(1) }))
  .superRefine((d, ctx) => {
    for (const [k, v] of Object.entries(d)) {
      if (k === "modifier") continue;
      for (const m of (v as { mixin: Mixin[] }).mixin)
        if (m.loai === "khiTrungDon" && !d.modifier[m.gan])
          ctx.addIssue({ code: "custom", message: `${k}: thiếu modifier ${m.gan}` });
    }
  });
export type AbilityDef = { cd: number; mixin: Mixin[] };
export type ModifierDef = z.infer<typeof modifier>;

const action = z.union([z.object({ giaiDoan: z.string() }), z.object({ thongBao: z.string() })]);
export const SceneGroupSchema = z.record(
  z.string(),
  z.object({
    vung: z.object({ x: num, y: num, r: pos }),
    giaiDoan: z.array(z.object({ id: z.string(), dienVien: z.array(z.object({ id: z.string(), loai: z.string() })) })),
    kichBan: z.array(
      z.object({
        khi: z.union([z.literal("vaoVung"), z.literal("raVung"), z.object({ tatCa: z.array(z.string()).min(1) })]),
        lam: z.array(action).min(1),
      }),
    ),
  }),
);
export type SceneGroupDef = z.infer<typeof SceneGroupSchema>[string];
