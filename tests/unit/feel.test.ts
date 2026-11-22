import { beforeEach, describe, expect, it } from "vitest";
import {
  inputBuffer,
  FEEL,
  feelSettings,
  feelState,
  gameDt,
  hitstop,
  setShakeEnabled,
  shake,
  slowmo,
} from "../../src/combat/feel";
import { press, updateBuffer } from "../../src/combat/actions";
import { damagePoise, hitEnemy } from "../../src/combat/damage";
import { GS } from "../../src/core/state";
import { makeEnemy, tickPoise } from "../../src/entities/enemy";
import { newSession } from "../../src/entities/party";
import { Server } from "../../src/server/server";
import { validateContent } from "../../src/data/schema";
import { loadRawContent } from "../../scripts/load-content";
import { mockRandom } from "./helpers";

beforeEach(() => {
  localStorage.clear();
  Server.P = null as never;
  Server.load();
  GS.G = newSession("tower");
  GS.G.enemies = [];
  setShakeEnabled(true);
});

describe("combat-feel.yaml", () => {
  it("bắt lỗi thiếu hiệu ứng nhân vật và thiếu cân nặng quái", () => {
    const raw = loadRawContent();
    const f = raw.feel as { characters: Record<string, unknown>; enemies: Record<string, unknown> };
    delete f.characters.havy;
    delete f.enemies.golem;
    expect(() => validateContent(raw)).toThrow(/characters thiếu hiệu ứng cho "havy"/);
    expect(() => validateContent(raw)).toThrow(/enemies thiếu cân nặng và chịu đòn cho "golem"/);
  });

  it("dừng hình đòn nặng nằm trong 40–80 ms", () => {
    for (const k of ["heavy", "crit", "react", "skill", "burst", "break"] as const) {
      expect(FEEL.hitstop[k]).toBeGreaterThanOrEqual(0.04);
      expect(FEEL.hitstop[k]).toBeLessThanOrEqual(0.08);
    }
  });
});

describe("dừng hình, chậm hình, rung", () => {
  it("dừng hình trả dt = 0 rồi chạy lại, không cộng dồn", () => {
    hitstop("heavy");
    hitstop("heavy");
    expect(feelState.stop).toBeCloseTo(FEEL.hitstop.heavy);
    expect(gameDt(0.016)).toBe(0);
    expect(gameDt(0.1)).toBe(0);
    expect(gameDt(0.016)).toBe(0.016);
  });

  it("chậm hình khi hạ boss giảm tốc độ game", () => {
    slowmo(0.25, 1.2);
    expect(gameDt(0.016)).toBeCloseTo(0.004, 3);
    for (let i = 0; i < 100; i++) gameDt(0.016);
    expect(gameDt(0.016)).toBe(0.016);
  });

  it("rung theo hệ số từng đòn và tắt được", () => {
    shake("burst");
    expect(GS.G.shake).toBe(FEEL.shake.burst! * FEEL.shake.scale!);
    setShakeEnabled(false);
    expect(GS.G.shake).toBe(0);
    shake("burst");
    expect(GS.G.shake).toBe(0);
    expect(JSON.parse(localStorage.getItem("tinhtu-settings-v1")!).shake).toBe(false);
    expect(feelSettings.shake).toBe(false);
  });
});

describe("đệm lệnh và hủy đòn", () => {
  it("bấm đánh sớm trong 150 ms vẫn ra đòn khi hết thời gian chờ", () => {
    const p = GS.G.p;
    p.atkCd = 0.1;
    press("atk");
    expect(inputBuffer.atk).toBeCloseTo(FEEL.input.buffer);
    p.atkCd = 0;
    updateBuffer(0.05);
    expect(inputBuffer.atk).toBe(0);
    expect(p.atkAnim).toBe(1);
  });

  it("bấm quá sớm thì lệnh hết hạn", () => {
    GS.G.p.atkCd = 1;
    press("atk");
    for (let i = 0; i < 10; i++) updateBuffer(0.02);
    expect(inputBuffer.atk).toBeLessThanOrEqual(0);
  });

  it("lướt né hủy hoạt ảnh và thời gian chờ của đòn đánh", () => {
    const p = GS.G.p;
    p.atkAnim = 0.8;
    p.atkCd = 0.3;
    p.stamina = 100;
    press("dash");
    expect(p.dashT).toBeGreaterThan(0);
    expect(p.atkAnim).toBe(0);
    expect(p.atkCd).toBe(0);
  });
});

describe("chịu đòn và giật lùi", () => {
  it("vỡ thanh chịu đòn thì choáng, ngắt đòn đang chuẩn bị, rồi hồi lại", () => {
    const e: any = makeEnemy("goblin", 100, 100, 1, "fire");
    GS.G.enemies.push(e);
    e.tele = { kind: "arc", t: 0, dur: 1 };
    damagePoise(e, 1000);
    expect(e.stun).toBe(FEEL.poise.stun);
    expect(e.tele).toBeNull();
    tickPoise(e, FEEL.poise.stun + 0.01);
    expect(e.stun).toBe(0);
    expect(e.poise).toBe(e.maxPoise);
  });

  it("quái nặng bị đẩy ít hơn quái nhẹ", () => {
    mockRandom([0.99]);
    const m = GS.G.party[0];
    const slime: any = makeEnemy("slime", 100, 100, 1, "fire");
    const golem: any = makeEnemy("golem", 100, 100, 1, "fire");
    slime.hp = golem.hp = 1e9;
    GS.G.enemies.push(slime, golem);
    hitEnemy(slime, m, 0.1, "", { ang: 0, kb: 100 });
    hitEnemy(golem, m, 0.1, "", { ang: 0, kb: 100 });
    expect(slime.kx).toBeGreaterThan(golem.kx * 3);
    expect(slime.flash).toBe(FEEL.hit.flash);
  });
});
