import { beforeEach, describe, expect, it } from "vitest";
import { applyElement } from "../../src/combat/elements";
import { GS } from "../../src/core/state";
import { makeEnemy } from "../../src/entities/enemy";
import { newSession } from "../../src/entities/party";
import { Server } from "../../src/server/server";

let m: any;
const enemyWith = (aura: string | null) => {
  const e: any = makeEnemy("slime", 100, 100, 1, "water");
  e.aura = aura;
  e.auraT = aura ? 7 : 0;
  GS.G.enemies.push(e);
  return e;
};

beforeEach(() => {
  localStorage.clear();
  Server.P = null as never;
  Server.load();
  GS.G = newSession("tower");
  GS.G.enemies = [];
  m = GS.G.party[0];
});

describe("applyElement: 8 phản ứng", () => {
  const cases: [string, string, string, number][] = [
    ["Bốc Hơi (Thủy lên Hỏa)", "fire", "water", 2],
    ["Bốc Hơi (Hỏa lên Thủy)", "water", "fire", 1.5],
    ["Tan Chảy (Hỏa lên Băng)", "ice", "fire", 2],
    ["Tan Chảy (Băng lên Hỏa)", "fire", "ice", 1.5],
  ];
  it.each(cases)("%s nhân %f lần sát thương", (_n, aura, el, mult) => {
    const e = enemyWith(aura);
    expect(applyElement(e, el, m).mult).toBe(mult);
    expect(e.aura).toBeNull();
    expect(GS.G.pending.react).toBe(1);
  });

  it("Quá Tải: gây nổ sau một nhịp", () => {
    const e = enemyWith("fire");
    const queued = GS.G.later.length;
    expect(applyElement(e, "bolt", m).mult).toBe(1);
    expect(GS.G.later.length).toBe(queued + 1);
    expect(GS.G.pending.react).toBe(1);
  });

  it("Điện Cảm: gây sát thương theo nhịp", () => {
    const e = enemyWith("water");
    applyElement(e, "bolt", m);
    expect(e.ec).toMatchObject({ t: 0.5, n: 4, dmg: m.st.atk * 0.55 });
  });

  it("Đóng Băng: quái thường 3 giây, boss 1.2 giây", () => {
    const e = enemyWith("ice");
    applyElement(e, "water", m);
    expect(e.frozen).toBe(3);
    const b = enemyWith("water");
    b.isBoss = true;
    applyElement(b, "ice", m);
    expect(b.frozen).toBe(1.2);
  });

  it("Siêu Dẫn: giảm kháng 8 giây", () => {
    const e = enemyWith("bolt");
    applyElement(e, "ice", m);
    expect(e.vuln).toBe(8);
  });

  it("Khuếch Tán: Phong xóa ấn và lan nguyên tố", () => {
    const e = enemyWith("fire");
    const queued = GS.G.later.length;
    expect(applyElement(e, "wind", m).mult).toBe(1);
    expect(e.aura).toBeNull();
    expect(GS.G.later.length).toBe(queued + 1);
    expect(GS.G.pending.react).toBe(1);
  });

  it("Kết Tinh: Thổ xóa ấn và rơi mảnh tinh thể", () => {
    const e = enemyWith("ice");
    applyElement(e, "earth", m);
    expect(e.aura).toBeNull();
    expect(GS.G.pickups.at(-1)).toMatchObject({ k: "shard", el: "ice" });
    expect(GS.G.pending.react).toBe(1);
  });

  it("không có ấn: gắn ấn 7 giây, không phản ứng", () => {
    const e = enemyWith(null);
    expect(applyElement(e, "fire", m).mult).toBe(1);
    expect(e.aura).toBe("fire");
    expect(e.auraT).toBe(7);
    expect(GS.G.pending.react).toBe(0);
  });

  it("Phong và Thổ không phản ứng với nhau và không để lại ấn", () => {
    const e = enemyWith("wind");
    applyElement(e, "earth", m);
    expect(e.aura).toBe("wind");
    const f = enemyWith(null);
    applyElement(f, "wind", m);
    expect(f.aura).toBeNull();
    expect(GS.G.pending.react).toBe(0);
  });
});
