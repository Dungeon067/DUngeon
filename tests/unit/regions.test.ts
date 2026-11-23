import { describe, expect, it } from "vitest";
import { genWorld, TS } from "../../src/world/map";
import { REGIONS, cellAt, effectAt, regionEffectText } from "../../src/world/regions";

/* S12: vùng trên Đảo Lạc và hiệu ứng địa hình. */
describe("vùng và hiệu ứng", () => {
  const W: any = genWorld();
  it("mỗi vùng có tâm đều có ô trên đảo", () => {
    const count = new Map<number, number>();
    for (const r of W.region) count.set(r, (count.get(r) ?? 0) + 1);
    REGIONS.forEach((R, i) => {
      if (R.seed) expect(count.get(i) ?? 0, R.id).toBeGreaterThan(30);
    });
  });
  it("tâm đảo là Phố Vạn Đăng, hiệu ứng nhẹ (trong khoảng ±15%)", () => {
    const c = cellAt(W, (W.cx + 0.5) * TS, (W.cy + 0.5) * TS);
    expect(REGIONS[c.r]!.id).toBe("pho-van-dang");
    for (let y = 0; y < 110; y += 7)
      for (let x = 0; x < 110; x += 7)
        for (const k of ["moveSpeed", "staminaRegen", "dashStamina", "fireDmg", "waterDmg", "windDmg"]) {
          const v = effectAt(W, x * TS, y * TS, k);
          expect(v).toBeGreaterThanOrEqual(0.85);
          expect(v).toBeLessThanOrEqual(1.15);
        }
  });
  it("mô tả hiệu ứng đọc được", () => {
    expect(regionEffectText(REGIONS.findIndex((r) => r.id === "pho-van-dang"))).toContain("Sát thương Hỏa +10%");
  });
});
