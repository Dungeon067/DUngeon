import { z } from "zod";
import { VuKhiSchema } from "./weapons-schema";

export type { Weapon } from "./weapons-schema";

const n = z.number().nonnegative();
const int = z.number().int().nonnegative();
const chestTier = z.object({ daSao: int, xu: int, sach: int }).strict();
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
    nhanVat5Sao: z.object({ thuongTru: z.array(z.string()).min(1), gioiHan: z.array(z.string()).min(1) }).strict(),
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
        ruongCauDo: z.object({ thuong: chestTier, quy: chestTier, tinhXao: chestTier }).strict(),
        uyThac: z
          .object({
            moiViec: z.object({ daSao: int, xu: int }).strict(),
            duBon: z.object({ daSao: int, sach: int }).strict(),
          })
          .strict(),
      })
      .strict(),
    chienLuc: z
      .object({ trongSoTanCong: n, trongSoMau: n, trongSoTinhThong: n.optional(), trongSoHoiNang: n.optional() })
      .strict(),
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
      .object({
        buocTinhLuyen: n,
        loRenR5Ngay: int.min(1),
        banner: z
          .object({
            tiLe5: n,
            tiLe4: n,
            mem: int.min(1),
            cung: int.min(1),
            tangMoiLuotSauMem: pct,
            bao4Sao: int.min(1),
            tiLeNoiBat: pct,
            laBanSao: int,
            gia: int.min(1),
            noiBat: z.tuple([z.string().min(1), z.string().min(1)]),
          })
          .strict(),
        cap: z
          .object({
            toiDa: int.min(2),
            gioiHan: z.array(int.min(1)).length(7),
            heSoCap1: pct,
            kinhNghiem: z.object({ goc: int.min(1), moiCap: int }).strict(),
            xuMoiKinhNghiem: n,
            kinhNghiemVuKhi: z.array(int).length(3),
            dotPha: z.object({ quang: z.array(int).length(6), xu: z.array(int).length(6) }).strict(),
          })
          .strict(),
        quang: z
          .array(
            z
              .object({
                id: z.string().min(1),
                r: z.union([z.literal(3), z.literal(4), z.literal(5)]),
                kinhNghiem: int.min(1),
              })
              .strict(),
          )
          .length(3),
        loRen: z.object({ nguyenLieu: z.string().min(1), so: int.min(1), xu: int }).strict(),
        macDinh: z.record(z.enum(["sword", "great", "cat", "bow", "spear"]), z.string().min(1)),
        khoiDau: z.record(z.string(), int),
        nguon: z
          .object({
            biCanh: z.object({ linhLuc: int.min(1), xu: int, roi: z.record(z.string(), int), luotMoiNgay: n }).strict(),
            uyThac: z.record(z.string(), int),
            cuaHang: z.array(z.object({ id: z.string().min(1), xu: int, moiTuan: int.min(1) }).strict()),
            cuaHangVuKhi: z
              .array(z.object({ id: z.string().min(1), xu: int, moiTuan: int.min(1) }).strict())
              .default([]),
            phoi: z
              .object({
                suKienMoiThang: n,
                thanhTuu: z.array(
                  z
                    .object({
                      id: z.string().min(1),
                      ten: z.string().min(1),
                      loai: z.enum(["biCanh", "dotPha", "tinhLuyen", "ren"]),
                      can: int.min(1),
                      phoi: int.min(1),
                    })
                    .strict(),
                ),
              })
              .strict(),
          })
          .strict(),
        danhSach: z.array(VuKhiSchema).min(1),
      })
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
        motLan: z.object({ daSao: int, trongSoNgay: int.min(1), xu: int }).strict(),
        cauDo: z.object({ daSao: int, trongSoNgay: int.min(1) }).strict(),
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
    phanTang: z
      .object({
        doiMienPhi: z.array(z.string()).length(4),
        thuong: z.array(z.object({ ten: z.string().min(1), ngay: int.min(1), chienLuc: int }).strict()).min(1),
        thapThuong: int.min(1).max(12),
        hanThuong: int.min(1),
        doDe: z.object({ vuaDu: z.number().min(1), de: z.number().min(1), ratNhe: z.number().min(1) }).strict(),
        dinh: z
          .object({
            capQuaiThem: int,
            heSoMau: z.number().positive(),
            heSoDiemToiDa: z.number().min(1),
            f2pChamDinh: z.tuple([int, int]),
          })
          .strict(),
      })
      .strict(),
  })
  .strict();

const PackSchema = z.object({ id: z.string(), gia: int.min(1000), daSao: int, thuong: int }).strict();
const ShopSchema = z
  .object({
    daSao: z.array(PackSchema).min(1),
    napLanDauNhanDoi: z.boolean(),
    theThang: z.object({ id: z.string(), gia: int, ngay: int.min(1), daSaoNgay: int, daSaoMoiNgay: int }).strict(),
    hoChieuSao: z
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
    hanMucDuoi18: int,
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
    hoChieu: z.boolean(),
    mucTieu: z.array(z.string().regex(/^(nv[0-6]|vk[1-5])$/, "dạng nv0–nv6 hoặc vk1–vk5")).min(1),
    uocKhac: z.number().int().min(-1).max(6),
  })
  .strict();

export const EconomySchema = z
  .object({
    game: GameSchema,
    thietKe: DesignSchema,
    goiNap: ShopSchema,
    hoSo: z.array(ProfileSchema).min(2),
    moPhong: z
      .object({
        soNguoi: int.min(1),
        soNgay: int.min(1),
        mocNgay: z.array(int.min(1)).min(1),
        seed: int,
      })
      .strict(),
  })
  .strict();

export type Economy = z.infer<typeof EconomySchema>;

const mono = (a: number[]) => a.every((v, i) => i === 0 || v >= a[i - 1]!);

/** Kiểm tra economy.yaml. `chars` để đối chiếu đội miễn phí 4★ và hai pool 5★ với nhân vật có thật. */
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
  if (!mono(t.phanTang.thuong.map((x) => x.ngay))) errors.push("phanTang.thuong phải xếp theo ngày tăng dần");
  const dd = t.phanTang.doDe;
  if (!(dd.vuaDu <= dd.de && dd.de <= dd.ratNhe)) errors.push("phanTang.doDe phải vuaDu ≤ de ≤ ratNhe");
  const [c0, c1] = t.phanTang.dinh.f2pChamDinh;
  if (c0 > c1) errors.push("phanTang.dinh.f2pChamDinh phải [từ, đến] tăng dần");
  const wb = t.vuKhi.banner;
  if (wb.mem > wb.cung) errors.push("vuKhi.banner.mem phải ≤ cung");
  const wids = t.vuKhi.danhSach.map((w) => w.id);
  if (new Set(wids).size !== wids.length) errors.push("vuKhi.danhSach: id trùng");
  const wById = new Map(t.vuKhi.danhSach.map((w) => [w.id, w]));
  for (const id of wb.noiBat) {
    const w = wById.get(id);
    if (!w || w.r !== 5 || w.nguon !== "gioiHan")
      errors.push(`vuKhi.banner.noiBat: "${id}" phải là vũ khí 5★ giới hạn`);
  }
  if (wb.noiBat[0] === wb.noiBat[1]) errors.push("vuKhi.banner.noiBat: hai vũ khí phải khác nhau");
  const wc = t.vuKhi.cap;
  if (!mono(wc.gioiHan) || wc.gioiHan.at(-1) !== wc.toiDa)
    errors.push("vuKhi.cap.gioiHan phải tăng dần và kết thúc bằng vuKhi.cap.toiDa");
  const oreIds = new Set(t.vuKhi.quang.map((q) => q.id));
  const N = t.vuKhi.nguon;
  for (const id of [...Object.keys(N.biCanh.roi), ...Object.keys(N.uyThac), ...N.cuaHang.map((x) => x.id)])
    if (!oreIds.has(id)) errors.push(`vuKhi.nguon: "${id}" không phải Quặng Tinh Luyện trong vuKhi.quang`);
  for (const it of N.cuaHangVuKhi)
    if (wById.size && wById.get(it.id)?.nguon !== "cuaHangTuan")
      errors.push(`vuKhi.nguon.cuaHangVuKhi: "${it.id}" phải là vũ khí nguồn cuaHangTuan`);
  for (const [loai, id] of Object.entries(t.vuKhi.macDinh)) {
    const w = wById.get(id);
    if (!w || w.r !== 3 || w.loai !== loai) errors.push(`vuKhi.macDinh.${loai}: "${id}" phải là vũ khí 3★ cùng loại`);
  }
  const pools = e.game.nhanVat5Sao;
  for (const id of pools.thuongTru)
    if (pools.gioiHan.includes(id)) errors.push(`nhanVat5Sao: "${id}" không được nằm ở cả hai pool`);
  for (const w of t.vuKhi.danhSach) {
    if (w.nguon === "gioiHan" && (w.r !== 5 || !w.cua))
      errors.push(`vuKhi ${w.id}: vũ khí giới hạn phải 5★ và có "cua"`);
    if (w.nguon === "loRen" && w.r !== 4) errors.push(`vuKhi ${w.id}: vũ khí Lò Rèn phải 4★`);
  }
  for (const id of pools.gioiHan)
    if (!t.vuKhi.danhSach.some((w) => w.nguon === "gioiHan" && w.cua === id))
      errors.push(`vuKhi: nhân vật giới hạn "${id}" chưa có vũ khí đặc trưng`);
  if (chars.length) {
    const check = (where: string, id: string, r: number) => {
      const c = chars.find((x) => x.id === id);
      if (!c) errors.push(`${where}: không có nhân vật "${id}"`);
      else if (c.r !== r) errors.push(`${where}: "${id}" phải là ${r}★`);
    };
    for (const id of t.phanTang.doiMienPhi) check("phanTang.doiMienPhi", id, 4);
    for (const id of [...pools.thuongTru, ...pools.gioiHan]) check("game.nhanVat5Sao", id, 5);
    for (const c of chars)
      if (c.r === 5 && !pools.thuongTru.includes(c.id) && !pools.gioiHan.includes(c.id))
        errors.push(`game.nhanVat5Sao: nhân vật 5★ "${c.id}" chưa thuộc pool nào`);
  }
  if (e.goiNap.hanMucDuoi18 > e.goiNap.hanMucTuDatMacDinh) errors.push("goiNap.hanMucDuoi18 phải ≤ hanMucTuDatMacDinh");
  if (new Set(e.hoSo.map((p) => p.id)).size !== e.hoSo.length) errors.push("hoSo: id trùng");
  if (errors.length) throw new Error(`Nội dung không hợp lệ:\n${errors.map((x) => "  economy.yaml: " + x).join("\n")}`);
  return e;
}
