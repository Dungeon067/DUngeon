import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ECON } from "../../src/data/economy";
import { passiveAt, stackDelta, weaponOf } from "../../src/economy/core";
import { passiveText, validateWeapons } from "../../src/data/weapons-schema";
import { tickStack } from "../../src/combat/damage";
import { freshProfile, Server } from "../../src/server/server";

const VK = ECON.thietKe.vuKhi;

describe("Vũ khí 4★ S24 phần 2", () => {
  it("mỗi loại vũ khí có ít nhất 3 lựa chọn 4★", () => {
    for (const loai of ["sword", "great", "cat", "bow", "spear"])
      expect(VK.danhSach.filter((w) => w.r === 4 && w.loai === loai).length).toBeGreaterThanOrEqual(3);
  });

  it("bị động tích tầng: Chiến Lực tính nửa số tầng, trong trận lệch theo số tầng đang có", () => {
    const w = weaponOf("mat-bao-ngu-yen", ECON);
    const c = w.biDong.coChe!;
    expect(passiveAt(w, 1, ECON)).toBeCloseTo(w.biDong.satThuong + (c.moiTang * c.toiDa) / 2);
    expect(passiveAt(w, 1, ECON) + stackDelta(w, 1, 0, ECON)).toBeCloseTo(w.biDong.satThuong);
    expect(passiveAt(w, 1, ECON) + stackDelta(w, 1, c.toiDa, ECON)).toBeCloseTo(
      w.biDong.satThuong + c.moiTang * c.toiDa,
    );
    expect(passiveAt(w, 5, ECON)).toBeGreaterThan(passiveAt(w, 1, ECON));
    expect(stackDelta(weaponOf("loi-the-bai-sao", ECON), 1, 3, ECON)).toBe(0);
    expect(passiveText("{v}", w, 1, VK.buocTinhLuyen)).toContain("Lặng Gió");
  });

  it("tầng tăng theo thời gian không bị đánh, kẹp ở tối đa", () => {
    const c = weaponOf("mat-bao-ngu-yen", ECON).biDong.coChe!;
    const m = { stack: { id: "mat-bao-ngu-yen", tl: 1, tang: 0, t: 0 } };
    tickStack(m, c.giay * 0.9);
    expect(m.stack.tang).toBe(0);
    tickStack(m, c.giay * 0.2);
    expect(m.stack.tang).toBe(1);
    for (let i = 0; i < 20; i++) tickStack(m, c.giay);
    expect(m.stack.tang).toBe(c.toiDa);
  });

  it("schema: vũ khí cửa hàng tuần hoặc sự kiện phải 4★", () => {
    const base = structuredClone(VK.danhSach.find((w) => w.id === "nhanh-mai-truoc-gio")!);
    expect(() => validateWeapons({ moTaBiDong: "{v}", danhSach: [{ ...base, r: 3 }] })).toThrow(/cửa hàng tuần/);
    expect(() => validateWeapons({ moTaBiDong: "{v}", danhSach: [base] })).not.toThrow();
  });

  describe("cửa hàng tuần bán vũ khí 4★", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 10, 23, 9));
      Server.P = freshProfile();
    });
    afterEach(() => vi.useRealTimers());

    it("mỗi tuần đổi được đúng số lượt, trừ Xu, thêm vũ khí vào kho", () => {
      const it0 = VK.nguon.cuaHangVuKhi[0]!;
      Server.P.coin = it0.xu * (it0.moiTuan + 1);
      const n0 = Object.keys(Server.P.weapons).length;
      for (let i = 0; i < it0.moiTuan; i++) expect(Server.req("buyWeaponShop", { id: it0.id }).ok).toBe(true);
      expect(Server.req("buyWeaponShop", { id: it0.id }).ok).toBe(false);
      expect(Object.keys(Server.P.weapons).length).toBe(n0 + it0.moiTuan);
      expect(Server.P.coin).toBe(it0.xu);
      vi.advanceTimersByTime(7 * 86_400_000);
      expect(Server.req("buyWeaponShop", { id: it0.id }).ok).toBe(true);
      expect(Server.P.coin).toBe(0);
      expect(Server.req("buyWeaponShop", { id: "loi-the-bai-sao" }).ok).toBe(false);
    });
  });
});
