import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CHARS } from "../../src/data/content";
import { ECON } from "../../src/data/economy";
import { Server } from "../../src/server/server";
import { mockRandom } from "./helpers";

beforeEach(() => {
  localStorage.clear();
  Server.P = null as never;
  Server.load();
  Server.P.gems = 1e9;
});
afterEach(() => vi.restoreAllMocks());

const pull = (n: number) => {
  const out = [];
  for (let i = 0; i < n; i++) out.push(Server.rollOne());
  return out;
};

describe("Ước nguyện", () => {
  it("chắc chắn ra 5★ ở lần thứ 90 dù may mắn tệ nhất", () => {
    mockRandom([0.999999]);
    const res = pull(90);
    expect(res.slice(0, 89).every((r) => r.r < 5)).toBe(true);
    expect(res[89]!.r).toBe(5);
    expect(Server.P.pity5).toBe(0);
  });

  it("mỗi 10 lần có ít nhất một 4★ trở lên", () => {
    mockRandom([0.999999]);
    const res = pull(30);
    for (let i = 0; i < 30; i += 10) expect(res.slice(i, i + 10).some((r) => r.r >= 4)).toBe(true);
    expect(res[9]!.r).toBe(4);
  });

  it("tỷ lệ tăng dần từ lần 74 (soft pity)", () => {
    Server.P.pity5 = 73;
    mockRandom([0.0065]); // > 0.6% gốc nhưng < 0.6% + 6%
    expect(Server.rollOne().r).toBe(5);
  });

  it("thua 50/50 thì lần 5★ kế tiếp chắc chắn là nhân vật nổi bật", () => {
    const featured = Server.P.cfg.featured;
    mockRandom([0, 0.9, 0]); // ra 5★, thua 50/50, chọn nhân vật đầu tiên
    const lost: any = Server.rollOne();
    expect(lost.r).toBe(5);
    expect(lost.id).not.toBe(featured);
    expect(ECON.game.nhanVat5Sao.thuongTru).toContain(lost.id);
    expect(lost.feat).toBe(false);
    expect(Server.P.guaranteed).toBe(true);
    mockRandom([0, 0.9]);
    const won: any = Server.rollOne();
    expect(won.id).toBe(featured);
    expect(won.feat).toBe(true);
    expect(Server.P.guaranteed).toBe(false);
  });

  it("thắng 50/50 ra nhân vật nổi bật, không tạo đảm bảo", () => {
    mockRandom([0, 0.1]);
    const r: any = Server.rollOne();
    expect(r.id).toBe(Server.P.cfg.featured);
    expect(Server.P.guaranteed).toBe(false);
  });

  it("3★ cộng 500 Xu và một vũ khí 3★ vào kho", () => {
    mockRandom([0.5]);
    const coin = Server.P.coin;
    const out = Server.rollOne() as { kind: string; r: number; uid: string };
    expect(out).toMatchObject({ kind: "weapon", r: 3 });
    expect(Server.P.coin).toBe(coin + 500);
    expect(Server.P.weapons[out.uid]).toBeTruthy();
  });

  it("ước 10 lần trừ 1600 Đá Sao và ghi 10 dòng lịch sử", () => {
    Server.P.gems = 1600;
    const res = Server.req("pull", { count: 10 });
    expect(res.ok).toBe(true);
    expect(res.data).toHaveLength(10);
    expect(Server.P.gems).toBe(0);
    expect(Server.P.history).toHaveLength(10);
    expect(CHARS.length).toBe(24);
  });
});
