import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FEEL } from "../../src/combat/feel";
import {
  WALK,
  canAirDash,
  fallDamage,
  jumpPhysics,
  plungeMult,
  spawnWave,
  tryJump,
  tryPlunge,
  updateAir,
  updateWaves,
} from "../../src/combat/jump";
import { doDash } from "../../src/combat/actions";
import { GS } from "../../src/core/state";
import { cur, newSession } from "../../src/entities/party";
import { makeEnemy } from "../../src/entities/enemy";
import { Server } from "../../src/server/server";
import { MW, TL, TS, computeLedges, genWorld } from "../../src/world/map";
import { blockedAt, groundAt } from "../../src/world/collision";
import { TERRAIN } from "../../src/data/content";
import { mockRandom } from "./helpers";

function fresh() {
  GS.G = newSession("tower");
  GS.G.enemies = [];
  GS.G.bounds = { x: 0, y: 0, w: 2000, h: 2000 };
  Object.assign(GS.G.p, { x: 1000, y: 1000 });
}

function sim(sec: number, mx = 0, my = 0) {
  const p = GS.G.p;
  for (let t = 0; t < sec && p.air; t += 1 / 120) updateAir(p, 1 / 120, mx, my);
}

afterEach(() => vi.restoreAllMocks());
beforeEach(() => {
  localStorage.clear();
  Server.P = null as never;
  Server.load();
  fresh();
});

describe("số liệu nhảy (content/combat-feel.yaml)", () => {
  it("dùng đúng số đã duyệt", () => {
    expect(FEEL.jump.dur).toBe(0.55);
    expect(FEEL.jump.stamina).toBe(0);
    expect(FEEL.jump.longJump).toBe(1.8);
    expect(FEEL.jump.airDashStamina).toBe(20);
    expect(FEEL.jump.plunge.base).toBe(1.2);
    expect(FEEL.jump.plunge.perLevel).toBe(0.4);
    expect(FEEL.jump.fall.dmgPerLevel).toBe(0.08);
  });
  it("quỹ đạo parabol: lên đỉnh đúng độ cao và tiếp đất sau đúng thời gian nhảy", () => {
    const { v0, g } = jumpPhysics(0.55, 1.25);
    expect(v0 / g).toBeCloseTo(0.275, 5);
    expect((v0 * v0) / (2 * g)).toBeCloseTo(1.25, 5);
    const p = GS.G.p;
    expect(tryJump()).toBe(true);
    let t = 0;
    while (p.air && t < 2) {
      updateAir(p, 1 / 240, 0, 0);
      t += 1 / 240;
    }
    expect(t).toBeCloseTo(0.55, 1);
    expect(p.peak).toBeCloseTo(1.25, 1);
    expect(p.zh).toBe(0);
  });
  it("không tốn thể lực, không nhảy hai lần khi đang trên không", () => {
    const p = GS.G.p;
    const st = p.stamina;
    expect(tryJump()).toBe(true);
    expect(p.stamina).toBe(st);
    expect(tryJump()).toBe(false);
  });
  it("đang lướt mà nhảy thì nhảy xa khoảng 1,8 lần", () => {
    const p = GS.G.p;
    const x0 = p.x;
    p.moving = true;
    p.dirX = 1;
    p.dirY = 0;
    tryJump();
    sim(1, 1, 0);
    const normal = p.x - x0;
    p.x = x0;
    Object.assign(p, { dashT: 0.2, dvx: 600, dvy: 0 });
    tryJump();
    sim(1, 0, 0);
    const long = p.x - x0;
    expect(normal).toBeGreaterThan(WALK * 0.4);
    expect(long / normal).toBeGreaterThan(1.6);
    expect(long / normal).toBeLessThan(2);
  });
  it("lướt trên không chỉ một lần mỗi lần nhảy và giữ bất tử", () => {
    const p = GS.G.p;
    p.stamina = 100;
    tryJump();
    updateAir(p, 0.05, 0, 0);
    expect(canAirDash(p)).toBe(true);
    expect(doDash()).toBe(true);
    expect(p.airDash).toBe(true);
    expect(p.iframes).toBeGreaterThan(0);
    expect(p.stamina).toBe(100 - FEEL.jump.airDashStamina);
    expect(canAirDash(p)).toBe(false);
  });
});

describe("đòn lao xuống", () => {
  it("120% cộng 40% mỗi bậc", () => {
    expect(plungeMult(0)).toBeCloseTo(1.2);
    expect(plungeMult(1)).toBeCloseTo(1.6);
    expect(plungeMult(2.5)).toBeCloseTo(2.2);
    expect(plungeMult(-1)).toBeCloseTo(1.2);
  });
  it("chỉ dùng được khi đã cao hoặc đang rơi; gây sát thương vùng khi chạm đất", () => {
    const p = GS.G.p;
    const e = makeEnemy("slime", p.x + 30, p.y, 1);
    e.hp = e.maxHp = 1e6;
    GS.G.enemies = [e];
    tryJump();
    updateAir(p, 0.02, 0, 0);
    expect(tryPlunge()).toBe(false); // vừa bật lên, còn thấp
    while (p.vz > 0) updateAir(p, 1 / 120, 0, 0);
    expect(tryPlunge()).toBe(true);
    sim(1);
    expect(p.air).toBe(false);
    expect(e.hp).toBeLessThan(1e6);
  });
  it("cao hơn thì sát thương lớn hơn", () => {
    mockRandom([0.99]); // không chí mạng
    const dmgFrom = (zh: number) => {
      fresh();
      const p = GS.G.p;
      const e = makeEnemy("slime", p.x + 20, p.y, 1);
      e.hp = e.maxHp = 1e6;
      GS.G.enemies = [e];
      Object.assign(p, { air: true, zh, vz: 0, peak: zh, jvx: 0, jvy: 0 });
      tryPlunge();
      sim(2);
      return 1e6 - e.hp;
    };
    const lo = dmgFrom(1),
      hi = dmgFrom(3);
    expect(hi).toBeGreaterThan(lo * 1.3);
  });
});

describe("rơi", () => {
  it("1 bậc an toàn; từ 2 bậc mất 8% máu tối đa mỗi bậc vượt", () => {
    expect(fallDamage(1, 1000)).toBe(0);
    expect(fallDamage(1.9, 1000)).toBe(0);
    expect(fallDamage(2, 1000)).toBe(80);
    expect(fallDamage(4, 1000)).toBe(240);
  });
  it("không bao giờ làm gục", () => {
    expect(fallDamage(20, 1000, 50)).toBe(49);
    expect(fallDamage(20, 1000, 1)).toBe(0);
    const p = GS.G.p,
      m = cur();
    m.hp = 10;
    Object.assign(p, { air: true, zh: 12, vz: 0, peak: 12, jvx: 0, jvy: 0 });
    sim(5);
    expect(m.hp).toBe(1);
    expect(m.alive).toBe(true);
    expect(p.land).toBeGreaterThan(0);
  });
});

describe("sóng xung kích sát đất", () => {
  it("trúng khi đứng đất, né được khi đang nhảy", () => {
    const p = GS.G.p,
      m = cur();
    const hp0 = m.hp;
    spawnWave(p.x - 60, p.y, 0, 200, 50, "earth");
    for (let i = 0; i < 60; i++) updateWaves(1 / 60);
    expect(m.hp).toBeLessThan(hp0);

    fresh();
    const p2 = GS.G.p,
      m2 = cur();
    const hp2 = m2.hp;
    Object.assign(p2, { air: true, zh: 1, vz: 0, peak: 1, jvx: 0, jvy: 0 });
    spawnWave(p2.x - 60, p2.y, 0, 200, 50, "earth");
    for (let i = 0; i < 60; i++) updateWaves(1 / 60);
    expect(m2.hp).toBe(hp2);
  });
});

describe("dữ liệu bản đồ: độ cao, gờ, loại địa hình", () => {
  const W = genWorld();
  it("mỗi ô có độ cao, loại địa hình và vùng", () => {
    expect(W.h.length).toBe(W.m.length);
    expect(W.terrain.length).toBe(W.m.length);
    expect(W.region.length).toBe(W.m.length);
    expect(TERRAIN.regions[W.region[0]!]!.id).toBe("dao-lac");
    const ids = TERRAIN.terrains.map((t) => t.id);
    for (const t of ["co", "da", "cat", "tuyet", "nuoc-nong", "bun", "bang"]) expect(ids).toContain(t);
    expect(TERRAIN.terrains[W.terrain[W.m.indexOf(TL.SAND)]!]!.id).toBe("cat");
  });
  it("có bệ đá cao 1–2 bậc gần điểm xuất phát và gờ khớp với độ cao", () => {
    const sx = W.cx,
      sy = W.cy;
    let raised = 0;
    for (let y = sy - 8; y <= sy + 8; y++)
      for (let x = sx - 8; x <= sx + 8; x++) if (W.h[y * MW + x]! >= 1 && W.m[y * MW + x] === TL.LEDGE) raised++;
    expect(raised).toBeGreaterThan(8);
    expect(W.ledges).toEqual(computeLedges(W.h, W.m));
    for (const l of W.ledges.slice(0, 50)) expect(l.drop).toBeGreaterThan(0);
  });
  it("bệ một bậc chặn khi đi bộ nhưng đứng lên được khi nhảy tới; khe nước hẹp qua được khi ở trên không", () => {
    const cx = (x: number, y: number) => [(x + 0.5) * TS, (y + 0.5) * TS] as const;
    const i = W.m.findIndex((t, k) => t === TL.LEDGE && W.h[k] === 1);
    const [x, y] = cx(i % MW, Math.floor(i / MW));
    expect(blockedAt(x, y, 9, W, 0, false)).toBe(true);
    expect(blockedAt(x, y, 9, W, 1, true)).toBe(false);
    expect(groundAt(x, y, W)).toBe(1);
    const wi = W.m.findIndex((t) => t === TL.WATER);
    const [wx, wy] = cx(wi % MW, Math.floor(wi / MW));
    expect(blockedAt(wx, wy, 1, W, 0, false)).toBe(true);
    expect(blockedAt(wx, wy, 1, W, 0, true)).toBe(false);
  });
});
