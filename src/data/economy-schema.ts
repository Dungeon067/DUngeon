import { z } from "zod";

const n = z.number().nonnegative();
const int = z.number().int().nonnegative();
const pct = z.number().min(0).max(1);
const byRarity = <T extends z.ZodTypeAny>(t: T) => z.object({ "4": t, "5": t }).strict();

const GameSchema = z
  .object({
    capNhanVat: z
      .object({ toiDa: int, sachGoc: int, sachMoi: int.min(1), xuGoc: int, xuMoiCap: int, tangMoiCap: n })
      .strict(),
    netSao: z.object({ tangMoiNet: n, xuKhiDayN6: byRarity(int) }).strict(),
    chiMang: byRarity(z.object({ tiLe: pct, satThuong: n }).strict()),
    xuVatPham3: int,
    uocNguyen: z.object({ tangMoiLuotSauMem: pct, bao4Sao: int.min(1), tiLeDacBiet: pct }).strict(),
    thuong: z
      .object({
        ruong: z
          .object({
            daSao: z.object({ goc: int, buoc: int, soBuoc: int.min(1) }).strict(),
            xu: z.object({ goc: int, ngauNhien: int }).strict(),
            sach: z.object({ goc: int, ngauNhien: int }).strict(),
          })
          .strict(),
        thap: z
          .object({ daSaoMoiSao: int, xuGoc: int, xuMoiTang: int, sachGoc: int, sachChiaTang: int.min(1) })
          .strict(),
        hacGiao: z
          .object({
            daSaoLanDauGoc: int,
            daSaoLanDauMoiCap: int,
            daSaoLapLai: int,
            xuGoc: int,
            xuMoiCap: int,
            sachGoc: int,
            sachMoiCap: int,
          })
          .strict(),
        uyThac: z
          .object({
            moiViec: z.object({ daSao: int, xu: int }).strict(),
            duBon: z.object({ daSao: int, sach: int }).strict(),
          })
          .strict(),
      })
      .strict(),
    chienLuc: z.object({ trongSoTanCong: n, trongSoMau: n }).strict(),
  })
  .strict();

const DesignSchema = z
  .object({
    capHoTinh: z
      .object({
        toiDa: int.min(1),
        kinhNghiem: z.object({ goc: int, moiCap: int }).strict(),
        kinhNghiemMoiNgay: int,
        bac: z.array(z.object({ ten: z.string().min(1), tuCap: int.min(1) }).strict()).length(5),
      })
      .strict(),
    thienTuong: z.object({ moTaiCapHoTinh: z.array(int).length(9), capQuaiCong: int, thuongNhan: n }).strict(),
    khaiTinh: z
      .object({
        gioiHanCap: z.array(int).length(7),
        canCapHoTinh: z.array(int).length(7),
        tangMoiBac: n,
        xu: z.array(int).length(6),
        loiSao: z.array(int).length(6),
      })
      .strict(),
    kyNang: z.object({ toiDa: int.min(1), toiDaTheoKhaiTinh: z.array(int).length(7), tangMoiCap: n }).strict(),
    vuKhi: z
      .object({ "3": z.object({ tanCong: n, tinhLuyen: n }).strict() })
      .merge(byRarity(z.object({ tanCong: n, tinhLuyen: n }).strict()))
      .strict(),
    baoAn: z
      .object({ tanCongToiDa: n, mauToiDa: n, boAn: n, chatLuongTheoThienTuong: z.array(pct).length(9) })
      .strict(),
    linhLuc: z
      .object({
        toiDa: int,
        hoiMoiNgay: int,
        moiLuotLongSao: int.min(1),
        thuongMoiLuot: z.object({ sach: n, xu: n, loiSao: n }).strict(),
      })
      .strict(),
    thuNhap: z
      .object({
        tuan: z.object({ daSao: int, xu: int }).strict(),
        thang: z.object({ thapKy: int, suKien: int, baoTri: int }).strict(),
        motLan: z.object({ daSao: int, trongSoNgay: int.min(1) }).strict(),
        vuKhi4MienPhiR5Ngay: int,
      })
      .strict(),
    moHinhTran: z
      .object({
        heSoSatThuong: n,
        chiaSeNgoaiSan: n,
        thoiGianDanh: pct,
        giayThap3Sao: n,
        mauQuaiTB: n,
        mauDaQuy: n,
      })
      .strict(),
    cotTruyen: z.array(z.object({ chuong: int, ngay: int, capHoTinh: int, chienLuc: int }).strict()).min(1),
    congBang: z.object({ tranChenhLech: z.number().min(1), doiMienPhi: z.array(z.string()).length(4) }).strict(),
  })
  .strict();

const PackSchema = z.object({ id: z.string(), gia: int.min(1000), daSao: int, thuong: int }).strict();
const ShopSchema = z
  .object({
    daSao: z.array(PackSchema).min(1),
    napLanDauNhanDoi: z.boolean(),
    theThang: z.object({ id: z.string(), gia: int, ngay: int.min(1), daSaoNgay: int, daSaoMoiNgay: int }).strict(),
    hanhTrinhMua: z
      .object({
        id: z.string(),
        gia: int,
        ngay: int.min(1),
        daSao: int,
        sach: int,
        xu: int,
        vuKhi4: int,
        trangPhuc: int,
      })
      .strict(),
    trangPhuc: z.object({ giaTu: int, giaDen: int }).strict(),
    hanMucThang: int.min(1),
    hanMucTuDatMacDinh: int,
    canhBaoNgay: int,
  })
  .strict();

const ProfileSchema = z
  .object({
    id: z.string(),
    ten: z.string(),
    vndThang: int,
    theThang: z.boolean(),
    hanhTrinh: z.boolean(),
    vuKhi: z.object({ r: z.union([z.literal(3), z.literal(4), z.literal(5)]), r5Ngay: int.min(1) }).strict(),
  })
  .strict();

export const EconomySchema = z
  .object({
    game: GameSchema,
    thietKe: DesignSchema,
    goiNap: ShopSchema,
    hoSo: z.array(ProfileSchema).length(3),
    moPhong: z
      .object({
        soNguoi: int.min(1),
        soNgay: int.min(1),
        mocNgay: z.array(int.min(1)).min(1),
        seed: int,
        tichLuyTruocKhiUoc: int,
      })
      .strict(),
  })
  .strict();

export type Economy = z.infer<typeof EconomySchema>;

const mono = (a: number[]) => a.every((v, i) => i === 0 || v >= a[i - 1]!);

/** Kiểm tra economy.yaml. `chars` để đối chiếu đội miễn phí là nhân vật 4★ có thật. */
export function validateEconomy(raw: unknown, chars: { id: string; r: number }[] = []): Economy {
  const res = EconomySchema.safeParse(raw);
  if (!res.success) {
    const msg = res.error.issues.map((i) => `  economy.yaml ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Nội dung không hợp lệ:\n${msg}`);
  }
  const e = res.data,
    t = e.thietKe,
    errors: string[] = [];
  if (!mono(t.khaiTinh.gioiHanCap)) errors.push("khaiTinh.gioiHanCap phải tăng dần");
  if (t.khaiTinh.gioiHanCap.at(-1) !== e.game.capNhanVat.toiDa)
    errors.push("khaiTinh.gioiHanCap bậc cuối phải bằng game.capNhanVat.toiDa");
  if (!mono(t.khaiTinh.canCapHoTinh)) errors.push("khaiTinh.canCapHoTinh phải tăng dần");
  if (!mono(t.thienTuong.moTaiCapHoTinh)) errors.push("thienTuong.moTaiCapHoTinh phải tăng dần");
  if (!mono(t.kyNang.toiDaTheoKhaiTinh) || t.kyNang.toiDaTheoKhaiTinh.at(-1) !== t.kyNang.toiDa)
    errors.push("kyNang.toiDaTheoKhaiTinh phải tăng dần và kết thúc bằng kyNang.toiDa");
  if (!mono(t.capHoTinh.bac.map((b) => b.tuCap)) || t.capHoTinh.bac[0]!.tuCap !== 1)
    errors.push("capHoTinh.bac phải bắt đầu từ cấp 1 và tăng dần");
  if (!mono(e.goiNap.daSao.map((p) => p.gia))) errors.push("goiNap.daSao phải xếp theo giá tăng dần");
  if (chars.length)
    for (const id of t.congBang.doiMienPhi) {
      const c = chars.find((x) => x.id === id);
      if (!c) errors.push(`congBang.doiMienPhi: không có nhân vật "${id}"`);
      else if (c.r !== 4) errors.push(`congBang.doiMienPhi: "${id}" phải là 4★`);
    }
  for (const p of e.hoSo)
    if (p.vndThang > e.goiNap.hanMucThang) errors.push(`hoSo ${p.id}: vndThang vượt goiNap.hanMucThang`);
  if (e.goiNap.hanMucTuDatMacDinh > e.goiNap.hanMucThang) errors.push("goiNap.hanMucTuDatMacDinh vượt hanMucThang");
  if (new Set(e.hoSo.map((p) => p.id)).size !== e.hoSo.length) errors.push("hoSo: id trùng");
  if (errors.length) throw new Error(`Nội dung không hợp lệ:\n${errors.map((x) => "  economy.yaml: " + x).join("\n")}`);
  return e;
}
