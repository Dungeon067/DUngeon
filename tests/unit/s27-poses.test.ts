import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import modelsRaw from "../../content/models.yaml";
import posesRaw from "../../content/poses.yaml";
import { validateModels } from "../../src/data/models-schema";
import { DANG_IDS, PosesSchema, WEAPONS, validatePoses } from "../../src/data/poses-schema";
import { weaponOut } from "../../src/combat/weapon-state";
import { CHARS } from "../../src/data/content";

const A = JSON.parse(readFileSync("public/media/anim/humanoid.json", "utf8"));
const M = validateModels(modelsRaw);
const P = validatePoses(posesRaw);
/** Clip dùng chung mọi vũ khí (lớp dáng cộng lên): tay không, lướt, nhảy, trúng đòn, ngã. */
const SHARED = ["relax", "walk", "run", "sprint", "dash", "jumpUp", "jumpAir", "jumpLand", "hurt", "die"];

describe("S27: dáng tư thế × vũ khí", () => {
  it("đủ 8 dáng, mỗi dáng có tham số đứng / chờ / chạy / đòn", () => {
    expect(Object.keys(P.dang).sort()).toEqual([...DANG_IDS].sort());
  });

  it("mọi tổ hợp dáng × vũ khí có đủ clip", () => {
    for (const d of DANG_IDS)
      for (const w of WEAPONS) {
        const h = M.hoatAnh[w];
        expect(h, w).toBeTruthy();
        const need = [
          h.stand,
          h.ready ?? h.stand,
          ...(h.move ? [h.move.walk, h.move.run, h.move.sprint] : []),
          ...h.atk,
          h.charge,
          h.skill,
          h.burst,
          ...SHARED,
        ];
        const stow = P.vuKhi.noi[w].clip;
        if (stow) need.push(stow);
        for (const k of need) expect(A.clips[k], `${d} × ${w}: ${k}`).toBeTruthy();
      }
  });

  it("dáng trẻ em bị chặn tư thế không hồn nhiên", () => {
    const raw = structuredClone(posesRaw) as any;
    raw.dang["nu-nho"].dung.hong = 2;
    expect(PosesSchema.safeParse(raw).success).toBe(false);
    const raw2 = structuredClone(posesRaw) as any;
    raw2.dang["nam-nho"].dung.tay.truoc = 0.5;
    expect(PosesSchema.safeParse(raw2).success).toBe(false);
  });

  it("mọi nhân vật có dáng hợp lệ", () => {
    for (const c of CHARS as any[]) expect(DANG_IDS, c.id).toContain(c.dang);
  });

  it("vũ khí: rút ngay khi đánh, cất sau `cho` giây không đánh và không có quái gần", () => {
    const cfg = P.vuKhi,
      p: any = { x: 0, y: 0, act: { k: "atk1", t0: 10 } };
    expect(weaponOut(p, [], 10, cfg)).toBe(true);
    expect(weaponOut(p, [], 10 + cfg.cho - 0.1, cfg)).toBe(true);
    expect(weaponOut(p, [], 10 + cfg.cho + 0.1, cfg)).toBe(false);
    const q: any = { x: 0, y: 0, act: { k: "atk1", t0: 0 } };
    const foe = [{ x: cfg.gan / 2, y: 0 }];
    for (let t = 0; t < 10; t += 0.5) expect(weaponOut(q, foe, t, cfg)).toBe(true);
    expect(weaponOut(q, [], 10 + cfg.cho + 0.1, cfg)).toBe(false);
  });
});
