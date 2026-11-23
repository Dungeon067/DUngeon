import { describe, expect, it } from "vitest";
import { WORLD_PUZZLES, DOMAINS } from "../../src/data/puzzles";
import { genWorld, MW, MH } from "../../src/world/map";
import { genDomain } from "../../src/world/domain-map";
import { blockedAt } from "../../src/world/collision";

describe("Đặt câu đố trên Đảo Lạc", () => {
  const W = genWorld();
  it("mọi câu đố trên đảo đều có chỗ, trong bản đồ, không chồng nhau, rải khắp đảo", () => {
    expect(W.puz.map((s) => s.id).sort()).toEqual(WORLD_PUZZLES.map((p) => p.id).sort());
    for (const s of W.puz) {
      expect(s.x).toBeGreaterThan(2);
      expect(s.x).toBeLessThan(MW - 3);
      expect(s.y).toBeGreaterThan(2);
      expect(s.y).toBeLessThan(MH - 3);
    }
    for (const a of W.puz)
      for (const b of W.puz)
        if (a !== b) expect(Math.hypot(a.x - b.x, a.y - b.y), `${a.id}-${b.id}`).toBeGreaterThan(6);
    const cx = W.puz.reduce((s, p) => s + p.x, 0) / W.puz.length,
      cy = W.puz.reduce((s, p) => s + p.y, 0) / W.puz.length;
    const quad = new Set(W.puz.map((p) => `${p.x < cx ? 0 : 1}${p.y < cy ? 0 : 1}`));
    expect(quad.size).toBe(4);
  });
  it("đặt theo seed cố định (cùng kết quả mỗi lần)", () => {
    expect(genWorld().puz).toEqual(W.puz);
  });
});

describe("Bản đồ bí cảnh", () => {
  for (const d of DOMAINS)
    it(`${d.ten}: sảnh, ${d.phong.length} phòng câu đố, 1 phòng đánh, phòng rương; cửa giữa phòng đóng tới khi qua`, () => {
      const M = genDomain(d);
      expect(M.rooms.map((r) => r.kind)).toEqual(["sanh", ...d.phong.map(() => "cau-do"), "tran", "ruong"]);
      expect(M.puz.map((s) => s.id)).toEqual(d.phong);
      const a = M.rooms[0]!,
        b = M.rooms[1]!;
      const doorY = ((a.y0 + b.y1) / 2) * 40;
      expect(blockedAt(a.cx * 40 + 20, doorY, 6, M)).toBe(true);
    });
});
