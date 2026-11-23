import { MENU } from "./menu-content";
import { parseDoc } from "./markdown";
import type { MdDoc } from "./markdown";

/** Hồ sơ nhân vật lấy thẳng từ docs/characters/<id>/*.md (S03, S04, S05, S05B). Tải lười theo nhân vật. */
const files = import.meta.glob<string>("../../docs/characters/*/*.md", { query: "?raw", import: "default" });

const key = (id: string, file: string) => `../../docs/characters/${id}/${file}.md`;
const cache = new Map<string, Promise<Record<string, MdDoc>>>();

export function hasProfile(id: string) {
  return MENU.profile.some((p) => key(id, p.file) in files);
}

export function loadProfile(id: string): Promise<Record<string, MdDoc>> {
  let p = cache.get(id);
  if (!p) {
    p = Promise.all(
      MENU.profile.map(async (sec) => {
        const f = files[key(id, sec.file)];
        return [sec.file, f ? parseDoc(await f()) : null] as const;
      }),
      // Nét Sao cũng nằm trong docs/characters/<id>/cung-menh.md
    ).then(async (list) => {
      const out: Record<string, MdDoc> = {};
      for (const [k, v] of list) if (v) out[k] = v;
      const cm = files[key(id, "cung-menh")];
      if (cm) out["cung-menh"] = parseDoc(await cm());
      return out;
    });
    p.catch(() => cache.delete(id));
    cache.set(id, p);
  }
  return p;
}

/** Mức thân thiết 1..10 từ điểm thô. */
export function affinityLevel(points: number) {
  let lv = 1;
  for (const need of MENU.affinity.levels) if (points >= need) lv++;
  return lv;
}
/** Điểm còn thiếu tới mức sau (null nếu đã tối đa). */
export function affinityNext(points: number) {
  const need = MENU.affinity.levels.find((n) => points < n);
  return need === undefined ? null : need - points;
}
/** Mức cần để mở phần thứ i (0-based) của một mục hồ sơ. */
export function sectionLevel(file: string, i: number) {
  const sec = MENU.profile.find((p) => p.file === file);
  return sec ? sec.level + sec.perSection * i : 1;
}
