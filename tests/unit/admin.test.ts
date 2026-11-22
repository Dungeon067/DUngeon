import { describe, expect, it } from "vitest";
import { checkPassword, derive, endSession, hasSession, startSession } from "../../src/admin/auth";
import { ADMIN_CFG } from "../../src/data/menu-content";

describe("Đăng nhập Admin (chặn tạm)", () => {
  it("chỉ giữ salt và hash PBKDF2, mật khẩu mặc định khớp hash trong content/admin.yaml", async () => {
    expect(ADMIN_CFG.login.hash).toMatch(/^[0-9a-f]{64}$/);
    expect(await checkPassword("tinhtu-admin", ADMIN_CFG)).toBe(true);
    expect(await checkPassword("sai-mat-khau", ADMIN_CFG)).toBe(false);
    expect(await checkPassword("", ADMIN_CFG)).toBe(false);
  });
  it("derive cho kết quả ổn định theo salt", async () => {
    const a = await derive("x", "salt-1234", 10000);
    expect(a).toBe(await derive("x", "salt-1234", 10000));
    expect(a).not.toBe(await derive("x", "salt-5678", 10000));
  });
  it("phiên đăng nhập hết hạn sau sessionMinutes", () => {
    endSession();
    expect(hasSession()).toBe(false);
    const now = 1_000_000;
    startSession(ADMIN_CFG, now);
    expect(hasSession(now + 1000)).toBe(true);
    expect(hasSession(now + ADMIN_CFG.sessionMinutes * 60_000 + 1)).toBe(false);
    endSession();
    expect(hasSession(now)).toBe(false);
  });
});
