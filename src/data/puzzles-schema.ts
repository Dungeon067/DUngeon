import { z } from "zod";

/* Câu đố nguyên tố, bí cảnh, quest mini (S23). Dữ liệu ở content/puzzles.yaml. */

export const BASIC = ["fire", "water", "earth", "wind"] as const;
export const ELEMS = [...BASIC, "ice", "bolt"] as const;
const el = z.enum(ELEMS);
const id = z.string().regex(/^[a-z0-9_-]+$/);

const LoaiSchema = z
  .object({
    ten: z.string().min(1),
    /** Mỗi bước nhận một trong các nguyên tố; xong bước cuối là vật thể "đã kích hoạt". */
    buoc: z.array(z.array(el).min(1)).min(1),
    /** Nguyên tố làm vật thể về trạng thái đầu (ví dụ nước dập đèn). */
    tat: z.array(el).default([]),
    /** Gió chạm vật đã kích hoạt thì lan sang vật cùng loại trong bán kính này (px). */
    lan: z.number().positive().optional(),
    /** Chắn đường cho đến khi kích hoạt. */
    chan: z.boolean().default(false),
    /** Đẩy người chơi lên cao khi đã kích hoạt (luồng gió). */
    nang: z.boolean().default(false),
    bieuTuong: el,
    trangThai: z.tuple([z.string(), z.string()]),
  })
  .strict();

const VatTheSchema = z
  .object({
    loai: z.string(),
    dx: z.number(),
    dy: z.number(),
    /** Tự về trạng thái đầu sau N giây (đèn tự tắt, cối ngừng quay). */
    giay: z.number().positive().optional(),
    /** Hướng vật thể quay mặt (bắc, nam, đông, tây). Mặc định nam, nhìn về phía người chơi. */
    huong: z.enum(["n", "s", "e", "w"]).optional(),
  })
  .strict();

const PuzzleSchema = z
  .object({
    id,
    ten: z.string().min(1),
    vung: z.string().min(1),
    kieu: z.enum(["don", "ket-hop", "cua-bi-canh", "phong"]),
    batBuoc: z.boolean(),
    /** Vị trí trên đảo theo góc (độ, 0 là đông, 90 là nam) và bán kính (ô) tính từ tâm; câu đố trong bí cảnh thì không có. */
    dat: z.object({ goc: z.number(), banKinh: z.number().positive() }).strict().optional(),
    vatThe: z.array(VatTheSchema).min(1),
    ruong: z.enum(["thuong", "quy", "tinhXao"]).optional(),
    goiY: z.string().min(1),
    /** Cách giải thay thế bằng nguyên tố cơ bản, ghi cho câu đố Băng/Lôi tùy chọn. */
    thayThe: z.string().optional(),
  })
  .strict();

const DomainSchema = z
  .object({
    id,
    ten: z.string().min(1),
    vung: z.string().min(1),
    nguyenTo: z.enum(BASIC),
    moTa: z.string().min(1),
    cua: id,
    phong: z.array(id).min(2).max(3),
    tran: z.object({ quai: z.array(z.string()).min(1), cap: z.number().int().positive() }).strict(),
    ruong: z.enum(["thuong", "quy", "tinhXao"]),
  })
  .strict();

const MiniSchema = z
  .object({
    id,
    ten: z.string().min(1),
    npc: z.string().min(1),
    vung: z.string().min(1),
    moTa: z.string().min(1),
    thoai: z
      .array(z.object({ ai: z.string().min(1), loi: z.string().min(1) }).strict())
      .min(3)
      .max(8),
    cauDo: z.array(id).min(1),
    thuong: z.object({ daSao: z.number().int().nonnegative(), xu: z.number().int().nonnegative() }).strict(),
    /** Nhân vật miễn phí nhận khi xong quest (Ngọc Thạch qua np_08). */
    tang: z.string().optional(),
  })
  .strict();

export const PuzzlesFileSchema = z
  .object({
    goiYSau: z.number().positive(),
    banKinhKyHieu: z.number().positive(),
    loai: z.record(LoaiSchema),
    cauDo: z.array(PuzzleSchema).min(1),
    biCanh: z.array(DomainSchema).min(4),
    mini: z.array(MiniSchema).min(12),
  })
  .strict();

export type PuzzlesFile = z.infer<typeof PuzzlesFileSchema>;
export type Puzzle = PuzzlesFile["cauDo"][number];
export type ObjType = PuzzlesFile["loai"][string];
export type Domain = PuzzlesFile["biCanh"][number];
export type Mini = PuzzlesFile["mini"][number];

/** Các nguyên tố cần để giải câu đố (mỗi vật thể: mọi bước). */
export function puzzleNeeds(p: Puzzle, L: PuzzlesFile["loai"]): string[][][] {
  return p.vatThe.map((v) => L[v.loai]!.buoc);
}

/** Đội có các nguyên tố `have` giải được câu đố không: mọi bước của mọi vật thể có ít nhất một nguyên tố đội có. */
export function solvableWith(p: Puzzle, L: PuzzlesFile["loai"], have: readonly string[]): boolean {
  return puzzleNeeds(p, L).every((steps) => steps.every((s) => s.some((e) => have.includes(e))));
}

export function validatePuzzles(raw: unknown, chars: { id: string; r: number; el: string }[] = []): PuzzlesFile {
  const r = PuzzlesFileSchema.safeParse(raw);
  if (!r.success)
    throw new Error(
      "content/puzzles.yaml không hợp lệ:\n" +
        r.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n"),
    );
  const d = r.data,
    errs: string[] = [];
  const pz = new Map(d.cauDo.map((p) => [p.id, p]));
  const dup = (xs: string[], what: string) =>
    xs.forEach((x, i) => xs.indexOf(x) !== i && errs.push(`${what} trùng id: ${x}`));
  dup(
    d.cauDo.map((p) => p.id),
    "câu đố",
  );
  dup(
    d.biCanh.map((p) => p.id),
    "bí cảnh",
  );
  dup(
    d.mini.map((p) => p.id),
    "quest mini",
  );
  for (const p of d.cauDo) {
    for (const v of p.vatThe) if (!d.loai[v.loai]) errs.push(`${p.id}: không có loại vật thể "${v.loai}"`);
    if (p.kieu !== "phong" && !p.dat) errs.push(`${p.id}: câu đố trên đảo cần "dat"`);
    if (p.kieu === "phong" && p.dat) errs.push(`${p.id}: câu đố trong bí cảnh không có "dat"`);
    const els = new Set(p.vatThe.flatMap((v) => d.loai[v.loai]?.buoc.flat() ?? []));
    if (p.kieu === "ket-hop" && new Set([...els].filter((e) => (BASIC as readonly string[]).includes(e))).size < 2)
      errs.push(`${p.id}: câu đố kết hợp cần từ 2 nguyên tố cơ bản`);
    if (d.loai && p.vatThe.every((v) => d.loai[v.loai]) && !solvableWith(p, d.loai, BASIC))
      errs.push(`${p.id}: phải giải được bằng nguyên tố cơ bản`);
    if ((els.has("ice") || els.has("bolt")) && (p.batBuoc || !p.thayThe))
      errs.push(`${p.id}: câu đố có Băng hoặc Lôi phải tùy chọn và ghi cách thay thế`);
  }
  const inDomain = new Set<string>();
  for (const b of d.biCanh) {
    const cua = pz.get(b.cua);
    if (!cua || cua.kieu !== "cua-bi-canh") errs.push(`${b.id}: cửa "${b.cua}" phải là câu đố kiểu cua-bi-canh`);
    for (const r of b.phong) {
      const p = pz.get(r);
      if (!p || p.kieu !== "phong") errs.push(`${b.id}: phòng "${r}" phải là câu đố kiểu phong`);
      else inDomain.add(r);
    }
  }
  if (new Set(d.biCanh.map((b) => b.nguyenTo)).size < 4) errs.push("cần bí cảnh cho cả 4 nguyên tố cơ bản");
  for (const p of d.cauDo)
    if (p.kieu === "phong" && !inDomain.has(p.id)) errs.push(`${p.id}: phòng không thuộc bí cảnh nào`);
  if (d.cauDo.filter((p) => p.kieu === "ket-hop").length < 3) errs.push("cần ít nhất 3 câu đố kết hợp");
  const byChar = new Map(chars.map((c) => [c.id, c]));
  for (const m of d.mini) {
    for (const c of m.cauDo) if (!pz.has(c)) errs.push(`${m.id}: không có câu đố "${c}"`);
    if (m.tang) {
      const c = byChar.get(m.tang);
      if (chars.length && !c) errs.push(`${m.id}: không có nhân vật "${m.tang}"`);
      else if (c && c.r === 5) errs.push(`${m.id}: không tặng nhân vật 5★`);
    }
  }
  if (errs.length) throw new Error("content/puzzles.yaml:\n  " + errs.join("\n  "));
  return d;
}

type Tier = "thuong" | "quy" | "tinhXao";
/** Tổng Đá Sao một lần từ câu đố (rương), bí cảnh (rương cuối) và quest mini. */
export function puzzleGems(d: PuzzlesFile, R: Record<Tier, { daSao: number }>): number {
  let g = 0;
  for (const p of d.cauDo) if (p.ruong) g += R[p.ruong].daSao;
  for (const b of d.biCanh) g += R[b.ruong].daSao;
  for (const m of d.mini) g += m.thuong.daSao;
  return g;
}
