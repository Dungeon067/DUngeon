import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateContent } from "../../src/data/schema";
import { validateEconomy } from "../../src/data/economy-schema";
import { loadRawContent, loadRawEconomy } from "../../scripts/load-content";
import {
  caps,
  charStats,
  chienLuc,
  hoTinhLevel,
  lvCost,
  packValue,
  passiveAt,
  rollRarity,
  rollWeapon,
  weaponOf,
} from "../../src/economy/core";
import { simulateProfile, tiering } from "../../tools/economy/sim";

const content = validateContent(loadRawContent());
const E = validateEconomy(loadRawEconomy(), content.characters);
const chars = content.characters.map((c) => ({ id: c.id, r: c.r, hp: c.hp, atk: c.atk, w: c.w }));
const G = content.config.gacha;

describe("economy.yaml", () => {
  it("giữ đúng các số cũ của server", () => {
    expect(lvCost(1, E)).toEqual({ books: 1, coin: 420 });
    expect(lvCost(59, E)).toEqual({ books: 10, coin: 7380 });
    expect(E.game.netSao.tangMoiNet).toBe(0.1);
    expect(E.game.xuVatPham3).toBe(500);
    expect(E.game.uocNguyen).toEqual({ tangMoiLuotSauMem: 0.06, bao4Sao: 10, tiLeDacBiet: 0.5 });
    expect(G).toMatchObject({ rate5: 0.6, soft: 74, hard: 90 });
  });
  it("báo lỗi khi số sai", () => {
    const bad = structuredClone(loadRawEconomy()) as any;
    bad.thietKe.khaiTinh.gioiHanCap = [20, 30, 25, 45, 50, 55, 60];
    expect(() => validateEconomy(bad)).toThrow(/tăng dần/);
    bad.thietKe.khaiTinh.gioiHanCap = [20, 30, 40, 45, 50, 55, 60];
    bad.thietKe.phanTang.doiMienPhi = ["lachong", "mailinh", "bachvu", "minhkhai"];
    expect(() => validateEconomy(bad, content.characters)).toThrow(/phải là 4★/);
    bad.game.capNhanVat.tangMoiCap = -1;
    expect(() => validateEconomy(bad)).toThrow(/tangMoiCap/);
  });
  it("hai pool 5★ tách rời, mỗi nhân vật giới hạn có vũ khí đặc trưng", () => {
    const { thuongTru, gioiHan } = E.game.nhanVat5Sao;
    expect(thuongTru.filter((id) => gioiHan.includes(id))).toEqual([]);
    for (const id of gioiHan) expect(E.thietKe.vuKhi.danhSach.some((w) => w.cua === id)).toBe(true);
    const bad = structuredClone(loadRawEconomy()) as any;
    bad.game.nhanVat5Sao.thuongTru.push("lachong");
    expect(() => validateEconomy(bad, content.characters)).toThrow(/cả hai pool/);
  });
  it("có vũ khí 3★, 4★, 5★ và vũ khí 4★ Lò Rèn cho mọi loại", () => {
    const L = E.thietKe.vuKhi.danhSach;
    for (const r of [3, 4, 5]) expect(L.some((w) => w.r === r)).toBe(true);
    for (const t of ["sword", "great", "cat", "bow", "spear"])
      expect(L.some((w) => w.nguon === "loRen" && w.loai === t)).toBe(true);
  });
});

describe("Chiến Lực", () => {
  const c = chars.find((x) => x.id === "suongmai")!;
  const cl = (o: Parameters<typeof charStats>[1]) => chienLuc(charStats(c, o, E), E);
  it("tăng theo mọi nguồn sức mạnh", () => {
    const base = cl({ lv: 1, cons: 0 });
    expect(base).toBeGreaterThan(0);
    expect(cl({ lv: 60, cons: 0 })).toBeGreaterThan(base);
    expect(cl({ lv: 1, cons: 6 })).toBeGreaterThan(base);
    expect(cl({ lv: 1, cons: 0, khai: 3 })).toBeGreaterThan(base);
    expect(cl({ lv: 1, cons: 0, kyNang: 10 })).toBeGreaterThan(base);
    const w4 = { id: "kiem-thep-lang-ren", tinhLuyen: 5 },
      w5 = { id: "hong-vu-truong-ca", tinhLuyen: 1 };
    expect(cl({ lv: 1, cons: 0, vuKhi: w4 })).toBeGreaterThan(cl({ lv: 1, cons: 0, vuKhi: { ...w4, tinhLuyen: 1 } }));
    expect(cl({ lv: 1, cons: 0, vuKhi: w5 })).toBeGreaterThan(cl({ lv: 1, cons: 0, vuKhi: { ...w4, tinhLuyen: 1 } }));
    expect(cl({ lv: 1, cons: 0, baoAn: 1 })).toBeGreaterThan(base);
  });
  it("chỉ số trong game giữ nguyên công thức cũ", () => {
    const st = charStats(c, { lv: 11, cons: 2 }, E);
    expect(st.atk).toBe(Math.round(c.atk * (1 + 10 * 0.07) * 1.2));
    expect(st.hp).toBe(Math.round(c.hp * (1 + 10 * 0.07) * 1.2));
    expect([st.crit, st.cdmg, st.dmg, st.skill]).toEqual([0.15, 0.6, 0, 0]);
  });
  it("cấp Hộ Tinh chỉ tăng theo ngày và mở giới hạn", () => {
    expect(hoTinhLevel(0, E)).toBe(1);
    expect(hoTinhLevel(180, E)).toBeLessThanOrEqual(60);
    expect(caps(1, E).lv).toBe(20);
    expect(caps(60, E)).toMatchObject({ lv: 60, khai: 6, kyNang: 10, thienTuong: 8 });
  });
});

describe("mô phỏng", () => {
  it("Bảo Hộ Vận Sao chắc chắn 5★ ở lượt 90 và 50/50 thua thì lần sau chắc chắn", () => {
    const st = { pity5: 0, pity4: 0, guaranteed: false };
    let r;
    for (let i = 0; i < 90; i++) r = rollRarity(st, G, E, () => 0.99);
    expect(r).toEqual({ r: 5, feat: false });
    expect(st.guaranteed).toBe(true);
  });
  it("tinh luyện R5 gấp đôi bị động R1", () => {
    const w = weaponOf("hong-vu-truong-ca", E);
    expect(passiveAt(w, 5, E)).toBeCloseTo(2 * passiveAt(w, 1, E));
  });
  it("banner vũ khí: chắc chắn 5★ ở mốc cứng, La Bàn Sao đủ điểm thì ra đúng vũ khí đã chọn", () => {
    const st = { pity5: 0, pity4: 0, guaranteed: false, laBan: 0 };
    let r;
    for (let i = 0; i < E.thietKe.vuKhi.banner.cung; i++) r = rollWeapon(st, E, () => 0.99);
    expect(r).toEqual({ r: 5, kind: "thuong" });
    expect(st.laBan).toBe(1);
    st.pity5 = E.thietKe.vuKhi.banner.cung - 1;
    expect(rollWeapon(st, E, () => 0.99)).toEqual({ r: 5, kind: "chon" });
    expect(st.laBan).toBe(0);
  });
  it("cùng seed cho cùng kết quả; mô hình phân tầng ĐẠT", () => {
    const o = { players: 400, days: 365, seed: 7 };
    const run = () => E.hoSo.map((p) => simulateProfile(p, chars, G, E, o));
    const a = run(),
      b = run();
    expect(a[0]!.cl.at(-1)).toEqual(b[0]!.cl.at(-1));
    expect(a[3]!.pulls[90]).toBeGreaterThan(a[2]!.pulls[90]!);
    expect(a[2]!.pulls[90]).toBeGreaterThan(a[1]!.pulls[90]!);
    const f = tiering(a, chars, E, o.days);
    for (const c of f.checks) expect(c, c.ten).toMatchObject({ ok: true });
  });
  it("thẻ tháng có giá trị mỗi đồng cao nhất", () => {
    const rows = packValue(E);
    const best = rows.reduce((m, r) => (r.moi1000 > m.moi1000 ? r : m));
    expect(best.id).toBe(E.goiNap.theThang.id);
  });
});

describe("không có code thanh toán", () => {
  const files: string[] = [];
  const walk = (d: string) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|js|html)$/.test(f)) files.push(p);
    }
  };
  ["src", "admin", "tools", "index.html"].forEach((p) => (statSync(p).isDirectory() ? walk(p) : files.push(p)));
  it("không có cổng thanh toán, SDK hay API mua hàng", () => {
    const bad =
      /stripe|paypal|momo|zalopay|vnpay|napas|onepay|braintree|PaymentRequest|google\.payments|apple-pay|ApplePaySession|checkout\.session|in-app-purchase|billing/i;
    const hits = files.filter((f) => bad.test(readFileSync(f, "utf8")));
    expect(hits).toEqual([]);
  });
});
