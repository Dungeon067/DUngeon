import { describe, expect, it } from "vitest";
import story from "../../content/story.json";
import { ENEMY, byId } from "../../src/data/content";

/* Cốt truyện chính (content/story.json, sinh từ docs/story bằng `pnpm story:build`). */
const S = story as unknown as { ten: Record<string, string>; sections: { id: string; steps: any[] }[] };
const MAP = ["bong_can", "goblin_lon", "mat_na_trang", "mat_na_go", "hacgiao"];

function walk(steps: any[], f: (s: any) => void) {
  for (const s of steps) {
    f(s);
    if (s.then) walk(s.then, f);
    if (s.else) walk(s.else, f);
  }
}

describe("cốt truyện Mở đầu và Chương 1", () => {
  it("đủ 6 phân đoạn Mở đầu và 7 nhiệm vụ Chương 1, theo thứ tự", () => {
    expect(S.sections.map((s) => s.id)).toEqual([
      ...["01", "02", "03", "04", "05", "06"].map((n) => `md_${n}`),
      ...["01", "02", "03", "04", "05", "06", "07"].map((n) => `c1_${n}`),
    ]);
  });
  it("mọi goto và on_win trỏ tới nhãn có thật trong phân đoạn", () => {
    for (const sec of S.sections) {
      const labels = new Set<string>();
      walk(sec.steps, (s) => s.label && labels.add(s.label));
      walk(sec.steps, (s) => {
        if (s.goto) expect(labels.has(s.goto), `${sec.id} goto ${s.goto}`).toBe(true);
        if (s.start_battle?.on_win)
          expect(labels.has(s.start_battle.on_win), `${sec.id} ${s.start_battle.on_win}`).toBe(true);
        for (const c of s.choice ?? []) if (c.goto) expect(labels.has(c.goto), `${sec.id} ${c.goto}`).toBe(true);
      });
    }
  });
  it("quái trong trận đánh có trong game hoặc có quái thay thế", () => {
    for (const sec of S.sections)
      walk(sec.steps, (s) => {
        for (const e of s.start_battle?.enemies ?? [])
          expect(!!ENEMY[e] || MAP.includes(e), `${sec.id} ${e}`).toBe(true);
      });
  });
  it("người nói có tên hiển thị", () => {
    for (const sec of S.sections)
      walk(sec.steps, (s) => {
        if (s.speaker) expect(s.speaker in S.ten || !!byId[s.speaker], `${sec.id} ${s.speaker}`).toBe(true);
      });
  });
});
