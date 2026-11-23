import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ECON } from "../../src/data/economy";
import { RES_CAP, TEST_MAX, freshProfile, linhLucNow, migrate, Server, weekKey } from "../../src/server/server";
import { investOnDay, weaponFlow } from "../../tools/economy/sim";

/* Nguồn nguyên liệu vũ khí: Bí Cảnh Binh Khí, ủy thác, cửa hàng tuần, thành tựu Phôi Lồng Sao; cấp tài nguyên Admin. */
const N = ECON.thietKe.vuKhi.nguon;
const L = ECON.thietKe.linhLuc;
const bag = (id: string) => Server.P.bag[id] ?? 0;

describe("Nguồn nguyên liệu vũ khí", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 23, 9));
    Server.P = freshProfile();
  });
  afterEach(() => vi.useRealTimers());

  it("Bí Cảnh tốn Linh Lực, rơi quặng; hết Linh Lực thì chặn, hồi theo thời gian tới trần", () => {
    const tho = bag("quang-tinh-luyen-tho");
    const runs = Math.floor(L.toiDa / N.biCanh.linhLuc);
    for (let i = 0; i < runs; i++) expect(Server.req("biCanh").ok).toBe(true);
    expect(bag("quang-tinh-luyen-tho")).toBe(tho + runs * N.biCanh.roi["quang-tinh-luyen-tho"]!);
    expect(Server.req("biCanh").ok).toBe(false);
    vi.advanceTimersByTime((86_400_000 * N.biCanh.linhLuc) / L.hoiMoiNgay + 1000);
    expect(Server.req("biCanh").ok).toBe(true);
    vi.advanceTimersByTime(30 * 86_400_000);
    expect(linhLucNow(Server.P)).toBe(L.toiDa);
    expect(Server.P.wStat.biCanh).toBe(runs + 1);
  });

  it("Linh Lực vượt trần (trần bị hạ) chỉ dùng được tới trần", () => {
    Server.P.ll = { v: L.toiDa * 3, t: Date.now() };
    expect(linhLucNow(Server.P)).toBe(L.toiDa);
  });

  it("ủy thác hằng ngày thưởng thêm quặng khi nhận đủ", () => {
    Server.ensureDaily();
    for (const t of Server.P.daily!.tasks) {
      t.prog = t.goal;
      t.claimed = true;
    }
    const before = bag("quang-tinh-luyen-tho");
    expect(Server.req("claimBonus").ok).toBe(true);
    expect(bag("quang-tinh-luyen-tho")).toBe(before + N.uyThac["quang-tinh-luyen-tho"]!);
  });

  it("cửa hàng đổi Xu lấy quặng, giới hạn mỗi tuần, sang thứ Hai làm mới", () => {
    const it0 = N.cuaHang[0]!;
    Server.P.coin = it0.xu * it0.moiTuan * 3;
    for (let i = 0; i < it0.moiTuan; i++) expect(Server.req("buyOre", { id: it0.id }).ok).toBe(true);
    expect(Server.req("buyOre", { id: it0.id }).ok).toBe(false);
    expect(Server.P.coin).toBe(it0.xu * it0.moiTuan * 2);
    expect(weekKey(new Date(2026, 10, 29))).toBe(weekKey(new Date(2026, 10, 23)));
    vi.setSystemTime(new Date(2026, 10, 30, 9));
    expect(Server.req("buyOre", { id: it0.id }).ok).toBe(true);
    expect(Server.req("buyOre", { id: "phoi-long-sao" }).ok).toBe(false);
  });

  it("kho quặng đầy thì cửa hàng không trừ Xu, không tính lượt", () => {
    const id = N.cuaHang[0]!.id;
    Server.P.bag[id] = RES_CAP;
    Server.P.coin = 1_000_000;
    expect(Server.req("buyOre", { id }).ok).toBe(false);
    expect(Server.P.coin).toBe(1_000_000);
    expect(Server.P.wShop.bought[id] ?? 0).toBe(0);
  });

  it("thành tựu Binh Khí cho Phôi Lồng Sao một lần", () => {
    const a = N.phoi.thanhTuu.find((x) => x.loai === "biCanh")!;
    expect(Server.req("claimWAch", { id: a.id }).ok).toBe(false);
    Server.P.wStat.biCanh = a.can;
    const before = bag("phoi-long-sao");
    expect(Server.req("claimWAch", { id: a.id }).ok).toBe(true);
    expect(bag("phoi-long-sao")).toBe(before + a.phoi);
    expect(Server.req("claimWAch", { id: a.id }).ok).toBe(false);
  });

  it("save S24 cũ chưa có trạng thái nguồn: migration bổ sung, chạy lại không đổi", () => {
    const old: any = JSON.parse(JSON.stringify(freshProfile()));
    delete old.ll;
    delete old.wStat;
    delete old.wAch;
    delete old.wShop;
    const m = migrate(old)!;
    expect(m.ll.v).toBe(L.toiDa);
    expect(m.wShop).toEqual({ week: "", bought: {} });
    expect(migrate(JSON.parse(JSON.stringify(m)))).toEqual(m);
  });

  it("mô phỏng: 4★ lên cấp tối đa trong 30–45 ngày, Lò Rèn R5 quanh loRenR5Ngay", () => {
    const f = weaponFlow(ECON);
    expect(f.lvDay).toBeGreaterThanOrEqual(30);
    expect(f.lvDay).toBeLessThanOrEqual(45);
    expect(Math.abs(f.r5Day! - ECON.thietKe.vuKhi.loRenR5Ngay)).toBeLessThanOrEqual(5);
  });

  it("mô phỏng: Xu vũ khí trừ vào nhân vật mà đội F2P không chậm đi", () => {
    const f = weaponFlow(ECON);
    expect(f.xu[ECON.thietKe.vuKhi.loRenR5Ngay]!).toBeGreaterThan(0);
    for (let d = 1; d <= 120; d++) {
      const a = investOnDay(d, null, ECON),
        b = investOnDay(d, null, ECON, ECON.thietKe.vuKhi.loRen.xu);
      expect(a.inv).toEqual(b.inv);
      expect(a.coinLeft).toBeGreaterThanOrEqual(0);
      expect(f.xu[d]!).toBeGreaterThanOrEqual(f.xu[d - 1]!);
    }
  });

  it("mô phỏng: xong cấp tối đa và R5 thì không mua quặng hay tiêu Xu vũ khí nữa", () => {
    const f = weaponFlow(ECON),
      done = Math.max(f.lvDay!, f.r5Day!);
    expect(f.r[0]).toBe(1);
    expect(f.xu[done + 60]).toBe(f.xu[done]);
  });

  it("mô phỏng: Lò Rèn đắt hơn Xu khởi đầu thì không rèn sẵn và Xu không âm", () => {
    const E = structuredClone(ECON);
    E.thietKe.vuKhi.loRen.xu = E.thietKe.thuNhap.motLan.xu + 1;
    expect(weaponFlow(E).r[0]).toBe(0);
    expect(investOnDay(1, null, E).coinLeft).toBeGreaterThanOrEqual(0);
  });

  it("mô phỏng: Xu khởi đầu bằng hồ sơ mới trong game", () => {
    expect(ECON.thietKe.thuNhap.motLan.xu).toBe(freshProfile().coin);
  });
});

describe("Admin cấp tài nguyên số lớn", () => {
  beforeEach(() => (Server.P = freshProfile()));

  it("Cấp tối đa để thử: 9 tỷ Đá Sao, Xu, nguyên liệu; ước vẫn trừ đúng", () => {
    expect(Server.req("giveMax").ok).toBe(true);
    expect(Server.P.gems).toBe(TEST_MAX);
    expect(Server.P.coin).toBe(TEST_MAX);
    expect(bag("phoi-long-sao")).toBe(TEST_MAX);
    expect(Server.req("pull", { count: 10 }).ok).toBe(true);
    expect(Server.P.gems).toBe(TEST_MAX - 10 * Server.P.cfg.cost);
    expect(Number.isSafeInteger(Server.P.gems)).toBe(true);
  });

  it("cộng dồn bị kẹp ở RES_CAP, không vượt MAX_SAFE_INTEGER", () => {
    for (let i = 0; i < 5; i++) Server.req("give", { kind: "gem", amount: 9e15 });
    expect(Server.P.gems).toBe(RES_CAP);
    Server.req("giveItem", { id: "quang-tinh-luyen", amount: 1e300 });
    expect(bag("quang-tinh-luyen")).toBe(RES_CAP);
    expect(Server.req("giveItem", { id: "sach-kinh-nghiem", amount: 5 }).ok).toBe(false);
    const m = migrate({ ...JSON.parse(JSON.stringify(Server.P)), coin: 1e20 })!;
    expect(m.coin).toBe(RES_CAP);
  });
});
