import { z } from "zod";

const n = z.number().nonnegative();

/** Một vũ khí trong content/weapons.yaml. Chỉ số ở cấp tối đa. */
export const VuKhiSchema = z
  .object({
    id: z.string().min(1),
    ten: z.string().min(1),
    loai: z.enum(["sword", "great", "cat", "bow", "spear"]),
    r: z.union([z.literal(3), z.literal(4), z.literal(5)]),
    nguon: z.enum(["gioiHan", "thuongTru", "loRen", "uocNguyen"]),
    cua: z.string().optional(),
    tanCong: n,
    phu: z.object({ loai: z.enum(["chiMang", "satThuongChiMang", "tanCong"]), giaTri: n }).strict(),
    biDong: z.object({ ten: z.string().min(1), satThuong: n }).strict(),
    truyen: z.string().min(1),
  })
  .strict();
export type Weapon = z.infer<typeof VuKhiSchema>;

const WeaponsFileSchema = z
  .object({
    moTaBiDong: z.string().includes("{v}"),
    danhSach: z.array(VuKhiSchema).min(1),
  })
  .strict();
export type WeaponsFile = z.infer<typeof WeaponsFileSchema>;

const syllables = (s: string) => s.trim().split(/\s+/).length;

/** Kiểm tra weapons.yaml. `chars` để đối chiếu `cua` với nhân vật có thật và đúng loại vũ khí. */
export function validateWeapons(raw: unknown, chars: { id: string; r: number; w: string }[] = []): WeaponsFile {
  const res = WeaponsFileSchema.safeParse(raw);
  if (!res.success) {
    const msg = res.error.issues.map((i) => `  weapons.yaml ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Nội dung không hợp lệ:\n${msg}`);
  }
  const f = res.data,
    errors: string[] = [];
  const ids = f.danhSach.map((w) => w.id);
  if (new Set(ids).size !== ids.length) errors.push("id trùng");
  const names = f.danhSach.flatMap((w) => [w.ten, w.biDong.ten]);
  if (new Set(names).size !== names.length) errors.push("tên vũ khí hoặc tên bị động bị trùng");
  for (const w of f.danhSach) {
    if (syllables(w.ten) > 6) errors.push(`${w.id}: tên dài quá 6 âm tiết`);
    if (w.r === 5 && w.nguon !== "gioiHan" && w.nguon !== "thuongTru")
      errors.push(`${w.id}: vũ khí 5★ phải là gioiHan hoặc thuongTru`);
    if (w.nguon === "gioiHan" && (w.r !== 5 || !w.cua)) errors.push(`${w.id}: vũ khí giới hạn phải 5★ và có "cua"`);
    if (w.nguon === "loRen" && w.r !== 4) errors.push(`${w.id}: vũ khí Lò Rèn phải 4★`);
    const sentences = w.truyen.split(/[.!?…]+/).filter((s) => s.trim()).length;
    if (sentences < 2 || sentences > 4) errors.push(`${w.id}: truyện phải 2–4 câu`);
    if (w.cua && chars.length) {
      const c = chars.find((x) => x.id === w.cua);
      if (!c) errors.push(`${w.id}: không có nhân vật "${w.cua}"`);
      else if (c.w !== w.loai) errors.push(`${w.id}: "${w.cua}" dùng ${c.w}, không dùng ${w.loai}`);
    }
  }
  if (errors.length) throw new Error(`Nội dung không hợp lệ:\n${errors.map((x) => "  weapons.yaml: " + x).join("\n")}`);
  return f;
}

/** Ghép danh sách vũ khí vào cấu hình kinh tế (thietKe.vuKhi.danhSach) để mô phỏng và game dùng chung. */
export function withWeapons<T>(econ: T, weapons: { danhSach: unknown[] }): T {
  const e = structuredClone(econ) as any;
  if (e?.thietKe?.vuKhi) e.thietKe.vuKhi.danhSach = structuredClone(weapons.danhSach);
  return e;
}

/** Mô tả bị động ở bậc tinh luyện `tinhLuyen` (1–5); `buoc` là thietKe.vuKhi.buocTinhLuyen. */
export function passiveText(tpl: string, w: Weapon, tinhLuyen: number, buoc: number): string {
  const r = Math.min(5, Math.max(1, Math.round(tinhLuyen)));
  const v = w.biDong.satThuong * (1 + buoc * (r - 1));
  return tpl.replace("{v}", `${(Math.round(v * 1000) / 10).toString().replace(".", ",")}%`);
}
