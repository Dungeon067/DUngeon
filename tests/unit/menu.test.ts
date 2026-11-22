import { describe, expect, it } from "vitest";
import { CHARS } from "../../src/data/content";
import { MENU } from "../../src/data/menu-content";
import { hasProfile, loadProfile, affinityLevel, affinityNext } from "../../src/data/profiles";
import { filterHistory, filterSort, fogCells, inCombat, reactionText, teamReactions } from "../../src/ui/menu/logic";
import { anchorXY, fogIdx, seen } from "../../src/ui/menu/anchor";
import { place } from "../../src/ui/menu/screens/team";
import { FOG, FOG_N } from "../../src/server/server";

const SEED = ["lachong", "thuynguyet", "phongvan", "loidinh", "thachson", "tuyetlan", "mailinh", "suongmai", "bachvu", "minhkhai", "ngocthach", "havy"];

describe("Hồ sơ nhân vật (docs/characters)", () => {
  it("đủ hồ sơ cho 12 nhân vật Đảo Lạc, mỗi mục trong menu.yaml đều có file", async () => {
    for (const id of SEED) {
      expect(hasProfile(id), id).toBe(true);
      const doc = await loadProfile(id);
      for (const sec of MENU.profile) expect(doc[sec.file], `${id}/${sec.file}`).toBeTruthy();
      expect(doc["cung-menh"], `${id}/cung-menh`).toBeTruthy();
    }
  });
  it("màn Nhân vật đọc danh sách từ content/ (gồm cả nhân vật mới ngoài 12 người gốc)", () => {
    const ids = CHARS.map((c) => c.id);
    for (const id of SEED) expect(ids).toContain(id);
    expect(ids.length).toBeGreaterThanOrEqual(SEED.length);
  });
  it("mức thân thiết tăng theo ngưỡng và dừng ở mức tối đa", () => {
    expect(affinityLevel(0)).toBe(1);
    const lv = MENU.affinity.levels;
    expect(affinityLevel(lv[0]!)).toBe(2);
    expect(affinityLevel(lv[lv.length - 1]!)).toBe(lv.length + 1);
    expect(affinityNext(0)).toBe(lv[0]);
    expect(affinityNext(lv[lv.length - 1]!)).toBeNull();
  });
});

describe("Gợi ý phản ứng của đội", () => {
  it("liệt kê đúng tên phản ứng", () => {
    expect(teamReactions(["fire", "water", "wind"])).toEqual(["Bốc Hơi", "Khuếch Tán"]);
    expect(teamReactions(["earth", "ice", "bolt"])).toEqual(["Siêu Dẫn", "Kết Tinh"]);
    expect(teamReactions(["wind", "earth"])).toEqual([]);
    expect(reactionText(["fire", "water", "wind"])).toBe("Đội này tạo được Bốc Hơi, Khuếch Tán");
    expect(reactionText(["fire"])).toMatch(/chưa tạo được/);
  });
});

describe("Đội hình", () => {
  it("đặt nhân vật vào ô, đổi chỗ khi đã có trong đội, tối đa 4", () => {
    expect(place(["a", "b", "c"], 3, "d")).toEqual(["a", "b", "c", "d"]);
    expect(place(["a", "b", "c"], 0, "c")).toEqual(["c", "b", "a"]);
    expect(place(["a", "b", "c", "d"], 1, "e")).toEqual(["a", "e", "c", "d"]);
    expect(place(["a"], 3, "b")).toEqual(["a", "b"]);
  });
  it("chặn đổi đội khi có quái đang đánh ở gần", () => {
    const G: any = { mode: "world", p: { x: 0, y: 0 }, enemies: [{ x: 50, y: 0, state: "idle" }] };
    expect(inCombat(G, 300)).toBe(false);
    G.enemies[0].state = "chase";
    expect(inCombat(G, 300)).toBe(true);
    expect(inCombat(G, 30)).toBe(false);
    G.enemies[0] = { x: 50, y: 0, state: "idle", tele: { t: 0.3 } };
    expect(inCombat(G, 300)).toBe(true);
    G.enemies[0].dead = true;
    expect(inCombat(G, 300)).toBe(false);
    expect(inCombat({ mode: "tower" }, 300)).toBe(true);
    expect(inCombat(null, 300)).toBe(false);
  });
});

describe("Lọc và sắp xếp", () => {
  const rows = [
    { id: "a", name: "Bùa", type: "x", r: 3, qty: 5 },
    { id: "b", name: "Áo", type: "y", r: 5, qty: 1 },
    { id: "c", name: "Cung", type: "x", r: 3, qty: 9 },
  ];
  it("túi đồ", () => {
    expect(filterSort([...rows], "all", "rarity").map((r) => r.id)).toEqual(["b", "a", "c"]);
    expect(filterSort([...rows], "all", "name").map((r) => r.id)).toEqual(["b", "a", "c"]);
    expect(filterSort([...rows], "x", "qty").map((r) => r.id)).toEqual(["c", "a"]);
  });
  it("lịch sử ước nguyện", () => {
    expect(filterHistory(rows, 0)).toHaveLength(3);
    expect(filterHistory(rows, 5).map((r) => r.id)).toEqual(["b"]);
  });
});

describe("Bản đồ lớn", () => {
  it("ô sương và neo vị trí", () => {
    expect(fogIdx(0, 0)).toBe(0);
    expect(fogIdx(FOG, FOG)).toBe(FOG_N + 1);
    expect(fogIdx(-1, 0)).toBe(-1);
    const fog = "0".repeat(FOG_N * FOG_N).split("");
    fog[FOG_N + 1] = "1";
    expect(seen(fog.join(""), FOG + 1, FOG + 2)).toBe(true);
    expect(seen(fog.join(""), 0, 0)).toBe(false);
    expect(fogCells(FOG, FOG, FOG, FOG_N)).toHaveLength(9);
    expect(fogCells(0, 0, FOG, FOG_N)).toHaveLength(4);
    const M = { cx: 55, cy: 55, statues: [{ x: 10, y: 20 }], tower: { x: 1, y: 2 }, gate: { x: 3, y: 4 } };
    expect(anchorXY("start", M)).toEqual([10.5, 20.5]);
    expect(anchorXY("center", M)).toEqual([55, 55]);
    expect(anchorXY("statue:3", M)).toBeNull();
    const [x, y] = anchorXY("dir:0:10", M)!;
    expect([Math.round(x), Math.round(y)]).toEqual([65, 55]);
  });
});
