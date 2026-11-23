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
