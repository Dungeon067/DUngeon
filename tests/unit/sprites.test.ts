import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { decodePng } from "../../tools/sprites/png";
import { DIR8, camRelative, dir8 } from "../../src/core/facing";

const dir = "public/media/sprites/havy/";
const J = JSON.parse(readFileSync(dir + "sheet.json", "utf8"));
const img = decodePng(readFileSync(dir + J.image));

describe("spritesheet Hạ Vy (S25)", () => {
  it("khung 48×64, neo ở chân, đủ 8 hướng", () => {
    expect(J.frame).toEqual({ w: 48, h: 64 });
    expect(J.anchor).toEqual({ x: 24, y: 62 });
    expect([...J.dirs].sort()).toEqual([...DIR8].sort());
  });

  it("mọi động tác đủ 8 hướng, số khung khớp thời lượng, khung nằm trong ảnh", () => {
    const need = [
      "idle",
      "run",
      "atk1",
      "atk2",
      "atk3",
      "aim",
      "shot",
      "skill",
      "burst",
      "dash",
      "jumpUp",
      "jumpAir",
      "jumpLand",
      "hurt",
      "die",
    ];
    for (const k of need) {
      const A = J.anims[k];
      expect(A, k).toBeTruthy();
      for (const d of DIR8) {
        const fr = A.frames[d];
        expect(fr.length, `${k}/${d}`).toBe(A.ms.length);
        for (const [x, y] of fr) {
          expect(x + J.frame.w).toBeLessThanOrEqual(img.w);
          expect(y + J.frame.h).toBeLessThanOrEqual(img.h);
        }
      }
    }
  });

  it("đòn đánh: khung ra đòn nằm trong 100 ms đầu (logic bắn ngay khi bấm)", () => {
    for (const k of ["atk1", "atk2", "atk3", "shot"]) {
      const A = J.anims[k];
      expect(A.hit, k).toBeTypeOf("number");
      const before = A.ms.slice(0, A.hit).reduce((a: number, b: number) => a + b, 0);
      expect(before, k).toBeLessThanOrEqual(100);
      expect(A.loop).toBe(false);
    }
  });

  it("hướng chéo có khung riêng, không trùng hướng ngang hay dọc", () => {
    for (const k of ["atk1", "run", "burst"]) {
      const f = J.anims[k].frames;
      expect(f.se[0]).not.toEqual(f.e[0]);
      expect(f.se[0]).not.toEqual(f.s[0]);
      expect(f.ne[0]).not.toEqual(f.n[0]);
    }
  });

  it("tối đa 24 màu", () => {
    const set = new Set<number>();
    for (let i = 0; i < img.rgba.length; i += 4)
      if (img.rgba[i + 3]! > 0) set.add((img.rgba[i]! << 16) | (img.rgba[i + 1]! << 8) | img.rgba[i + 2]!);
    expect(set.size).toBeLessThanOrEqual(24);
  });
});

describe("hướng 8 (S25)", () => {
  it("làm tròn góc về 8 hướng, có biên trễ", () => {
    expect(DIR8[dir8(0)]).toBe("e");
    expect(DIR8[dir8(Math.PI / 2)]).toBe("s");
    expect(DIR8[dir8(-Math.PI / 4)]).toBe("ne");
    expect(DIR8[dir8(Math.PI)]).toBe("w");
    // Lệch nhẹ qua ranh giới thì giữ hướng cũ.
    expect(dir8(Math.PI / 8 + 0.05, 0)).toBe(0);
    expect(dir8(Math.PI / 8 + 0.3, 0)).toBe(1);
  });
  it("xoay điều khiển theo camera", () => {
    expect(camRelative(1, 0, 0)).toEqual([1, 0]);
    const [x, y] = camRelative(1, 0, Math.PI / 2);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(1);
  });
});
