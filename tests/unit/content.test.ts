import { describe, expect, it } from "vitest";
import { BOSS, CHARS, ENEMY } from "../../src/data/content";
import { validateContent } from "../../src/data/schema";
import { loadRawContent } from "../../scripts/load-content";

describe("content/", () => {
  it("đủ 12 nhân vật, 5 loại quái và boss", () => {
    expect(CHARS.map((c) => c.id)).toEqual([
      "lachong",
      "thuynguyet",
      "phongvan",
      "loidinh",
      "thachson",
      "tuyetlan",
      "mailinh",
      "suongmai",
      "bachvu",
      "minhkhai",
      "ngocthach",
      "havy",
    ]);
    expect(Object.keys(ENEMY)).toEqual(["slime", "goblin", "archer", "shaman", "golem"]);
    expect(BOSS.hp).toBe(14000);
  });

  it("bắt lỗi nhân vật nổi bật không phải 5★ và ID trùng", () => {
    const raw = loadRawContent();
    (raw.config as { gacha: { featured: string } }).gacha.featured = "mailinh";
    raw.characters["content/characters/copy.yaml"] = raw.characters["content/characters/havy.yaml"];
    expect(() => validateContent(raw)).toThrow(/gacha\.featured "mailinh" phải là nhân vật 5★/);
    expect(() => validateContent(raw)).toThrow(/ID nhân vật trùng "havy"/);
  });

  it("bắt lỗi kiểu kỹ năng không hợp lệ", () => {
    const raw = loadRawContent();
    (raw.characters["content/characters/havy.yaml"] as { skill: { type: string } }).skill.type = "laser";
    expect(() => validateContent(raw)).toThrow(/havy\.yaml: skill\.type/);
  });
});
