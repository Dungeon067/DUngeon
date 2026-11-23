import { beforeEach, describe, expect, it, vi } from "vitest";

const KEY = "tinhtu-econ";
const load = async () => {
  vi.resetModules();
  return import("../../src/data/economy");
};

describe("Bản chỉnh kinh tế từ Admin", () => {
  beforeEach(() => localStorage.removeItem(KEY));

  it("bản chỉnh lưu trước S23 (pool cũ) vẫn giữ số đã chỉnh, pool theo economy.yaml", async () => {
    const { ECON_BASE } = await load();
    const old = structuredClone(ECON_BASE) as any;
    old.game.nhanVat5Sao = { thuongTru: ["tuyetlan", "loidinh"], gioiHan: ["lachong"] };
    old.thietKe.vuKhi.buocTinhLuyen = 0.3;
    localStorage.setItem(KEY, JSON.stringify(old));
    const { ECON, econEdited } = await load();
    expect(ECON.thietKe.vuKhi.buocTinhLuyen).toBe(0.3);
    expect(ECON.game.nhanVat5Sao).toEqual(ECON_BASE.game.nhanVat5Sao);
    expect(econEdited()).toBe(true);
  });

  it("bản chỉnh lưu trước S24 (thiếu mục vũ khí mới) vẫn giữ, mục mới lấy theo file", async () => {
    const { ECON_BASE } = await load();
    const old = structuredClone(ECON_BASE) as any;
    for (const k of ["cap", "quang", "loRen", "macDinh", "khoiDau"]) delete old.thietKe.vuKhi[k];
    delete old.thietKe.vuKhi.banner.gia;
    delete old.thietKe.vuKhi.banner.noiBat;
    old.thietKe.vuKhi.buocTinhLuyen = 0.3;
    localStorage.setItem(KEY, JSON.stringify(old));
    const { ECON, econEdited } = await load();
    expect(econEdited()).toBe(true);
    expect(ECON.thietKe.vuKhi.buocTinhLuyen).toBe(0.3);
    expect(ECON.thietKe.vuKhi.cap).toEqual(ECON_BASE.thietKe.vuKhi.cap);
    expect(ECON.thietKe.vuKhi.banner.noiBat).toEqual(ECON_BASE.thietKe.vuKhi.banner.noiBat);
  });

  it("bản chỉnh lưu trước S23 (thiếu rương câu đố) vẫn giữ, rương câu đố lấy theo file", async () => {
    const { ECON_BASE } = await load();
    const old = structuredClone(ECON_BASE) as any;
    delete old.game.thuong.ruongCauDo;
    delete old.thietKe.thuNhap.cauDo;
    delete old.thietKe.thuNhap.motLan.xu;
    old.thietKe.vuKhi.buocTinhLuyen = 0.3;
    localStorage.setItem(KEY, JSON.stringify(old));
    const { ECON, econEdited } = await load();
    expect(econEdited()).toBe(true);
    expect(ECON.thietKe.vuKhi.buocTinhLuyen).toBe(0.3);
    expect(ECON.game.thuong.ruongCauDo).toEqual(ECON_BASE.game.thuong.ruongCauDo);
    expect(ECON.thietKe.thuNhap.cauDo).toEqual(ECON_BASE.thietKe.thuNhap.cauDo);
    expect(ECON.thietKe.thuNhap.motLan.xu).toBe(ECON_BASE.thietKe.thuNhap.motLan.xu);
  });

  it("chỉnh chỉ số vũ khí thì giữ lại, tên và truyện vẫn theo weapons.yaml", async () => {
    const { ECON, setEcon, WEAPONS } = await load();
    const next = structuredClone(ECON) as any;
    const w = next.thietKe.vuKhi.danhSach.find((x: any) => x.id === "thien-loi-pha-tran");
    w.tanCong = 0.5;
    w.ten = "Tên Khác";
    setEcon(next);
    const after = ECON.thietKe.vuKhi.danhSach.find((x) => x.id === "thien-loi-pha-tran")!;
    expect(after.tanCong).toBe(0.5);
    expect(after.ten).toBe(WEAPONS.danhSach.find((x) => x.id === "thien-loi-pha-tran")!.ten);
    const { ECON: reloaded } = await load();
    expect(reloaded.thietKe.vuKhi.danhSach.find((x) => x.id === "thien-loi-pha-tran")!.tanCong).toBe(0.5);
  });

  it("vũ khí cũ trùng id nhưng khác độ hiếm hoặc nguồn thì lấy chỉ số mới", async () => {
    const { ECON_BASE, WEAPONS } = await load();
    const old = structuredClone(ECON_BASE) as any;
    const lim = old.thietKe.vuKhi.danhSach.find((x: any) => x.id === "thuong-go-lim");
    Object.assign(lim, { r: 4, nguon: "loRen", tanCong: 0.9 });
    const hong = old.thietKe.vuKhi.danhSach.find((x: any) => x.id === "hong-vu-truong-ca");
    Object.assign(hong, { nguon: "gioiHan", tanCong: 0.9 });
    localStorage.setItem(KEY, JSON.stringify(old));
    const { ECON } = await load();
    for (const id of ["thuong-go-lim", "hong-vu-truong-ca"])
      expect(ECON.thietKe.vuKhi.danhSach.find((x) => x.id === id)!.tanCong).toBe(
        WEAPONS.danhSach.find((x) => x.id === id)!.tanCong,
      );
  });

  it("trình duyệt chặn lưu trữ thì vẫn khởi động bằng file gốc", async () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    const rm = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    const { ECON, ECON_BASE } = await load();
    expect(ECON).toEqual(ECON_BASE);
    spy.mockRestore();
    rm.mockRestore();
  });

  it("bản chỉnh hỏng thì bỏ, Admin không còn báo đang chỉnh", async () => {
    localStorage.setItem(KEY, "{không phải json");
    const { econEdited } = await load();
    expect(econEdited()).toBe(false);
  });
});
