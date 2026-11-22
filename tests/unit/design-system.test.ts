import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CONTENT } from "../../src/data/content";
import { ELEMENT_ICON, ICONS, ICON_NAMES, iconSvg } from "../../src/ui/icons/icons";
import { COLOR, ELEMENTS, ELEMENT_IDS, PAIRS, PAIR_MIN, RARITY, contrast, hudSize } from "../../src/ui/tokens";

const css = readFileSync("src/ui/tokens.css", "utf8");
const cssVar = (name: string) => css.match(new RegExp(`--tt-${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1]?.toLowerCase();

describe("tokens", () => {
  it("bản TS trùng bản CSS", () => {
    for (const [k, v] of Object.entries(COLOR)) expect(cssVar(k), k).toBe(v.toLowerCase());
    for (const id of ELEMENT_IDS) expect(cssVar(`el-${id}`), id).toBe(ELEMENTS[id].c);
    for (const r of [3, 4, 5] as const) expect(cssVar(`r${r}`)).toBe(RARITY[r].c);
  });

  it("màu nguyên tố khớp content/config.yaml", () => {
    for (const [id, e] of Object.entries(CONTENT.config.elements)) {
      expect(ELEMENTS[id as keyof typeof ELEMENTS].c).toBe(e.c);
      expect(ELEMENTS[id as keyof typeof ELEMENTS].vi).toBe(e.vi);
    }
  });

  it("công thức tương phản WCAG đúng với giá trị chuẩn", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrast("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
  });

  it.each(PAIRS.map((p) => [p.where, p] as const))("đạt AA: %s", (_w, p) => {
    expect(contrast(p.fg, p.bg)).toBeGreaterThanOrEqual(PAIR_MIN[p.kind]);
  });

  it("cỡ nút HUD không bao giờ dưới 44 px", () => {
    for (const vh of [320, 390, 430, 720, 820, 1080, 1440]) {
      const s = hudSize(vh);
      expect(Math.min(s.xl, s.lg, s.md)).toBeGreaterThanOrEqual(44);
    }
    expect(hudSize(390).xl).toBeCloseTo(70.2, 1);
  });
});

describe("biểu tượng", () => {
  it("có ít nhất 40 biểu tượng, đủ 5 nhóm", () => {
    expect(ICON_NAMES.length).toBeGreaterThanOrEqual(40);
    const groups = new Set(Object.values(ICONS).map((i) => i.group));
    expect(groups.size).toBe(5);
  });

  it("đủ 7 nguyên tố, mỗi nguyên tố một hình khác nhau", () => {
    expect(Object.keys(ELEMENT_ICON).sort()).toEqual([...ELEMENT_IDS].sort());
    const bodies = ELEMENT_IDS.map((id) => ICONS[ELEMENT_ICON[id] as keyof typeof ICONS].body);
    expect(new Set(bodies).size).toBe(7);
  });

  it("có biểu tượng cho 5 nút hành động, gồm Nhảy", () => {
    for (const n of ["danh", "ky-nang", "no", "luot", "nhay"]) expect(ICON_NAMES).toContain(n);
  });

  it("SVG dùng lưới 24×24 và currentColor, không có màu cứng", () => {
    for (const n of ICON_NAMES) {
      const s = iconSvg(n);
      expect(s).toContain('viewBox="0 0 24 24"');
      expect(s).not.toMatch(/#[0-9a-f]{3,6}/i);
    }
    expect(iconSvg("hoa", { title: "Hỏa" })).toContain("<title>Hỏa</title>");
    expect(iconSvg("hoa")).toContain('aria-hidden="true"');
  });
});
