import { EL } from "../data/content";
import { DOMAINS, MINI, PZ } from "../data/puzzles";
import type { Mini } from "../data/puzzles-schema";
import { Server } from "../server/server";
import type { PuzzleSpot } from "./map";

/* Điểm đánh dấu câu đố, bí cảnh, quest mini cho bản đồ nhỏ, bản đồ lớn và nhật ký nhiệm vụ (S23). */

export interface PMark {
  kind: "puzzle" | "domain" | "quest";
  id: string;
  x: number;
  y: number;
  name: string;
  info: string;
  done: boolean;
  col: string;
}

export const MARK_COL = { puzzle: "#c9a6ff", domain: "#ff9a5a", quest: "#ffe27a", done: "#7a7f8f" };

const spotOf = (M: any, id: string): PuzzleSpot | undefined =>
  (M?.puz as PuzzleSpot[] | undefined)?.find((s) => s.id === id);

export function puzzleMarks(M: any, P = Server.P): PMark[] {
  if (!M?.puz || M.domain) return [];
  const out: PMark[] = [];
  for (const s of M.puz as PuzzleSpot[]) {
    const p = PZ[s.id]!,
      solved = P.puz.solved.includes(s.id),
      d = DOMAINS.find((x) => x.cua === s.id);
    if (d) {
      const done = !!P.puz.domains[d.id]?.done;
      out.push({
        kind: "domain",
        id: d.id,
        x: s.x + 0.5,
        y: s.y + s.top - 1 + 0.5,
        name: `Bí cảnh: ${d.ten}`,
        info: done ? "Đã hoàn thành." : solved ? "Cửa đã mở. " + d.moTa : `Cửa đóng (${p.ten}). ${d.moTa}`,
        done,
        col: done ? MARK_COL.done : (EL[d.nguyenTo]?.c ?? MARK_COL.domain),
      });
    } else
      out.push({
        kind: "puzzle",
        id: s.id,
        x: s.x + 0.5,
        y: s.y + 0.5,
        name: p.ten,
        info: solved ? "Đã giải." : `${p.batBuoc ? "" : "Tùy chọn. "}${p.vung}`,
        done: solved,
        col: solved ? MARK_COL.done : MARK_COL.puzzle,
      });
  }
  for (const m of MINI) {
    const s = spotOf(M, m.cauDo[0]!);
    if (!s) continue;
    const done = P.puz.mini.includes(m.id);
    out.push({
      kind: "quest",
      id: m.id,
      x: s.x + 0.5,
      y: s.y + s.top - 2 + 0.5,
      name: `${m.npc}: ${m.ten}`,
      info: done ? "Quest đã xong." : m.moTa,
      done,
      col: done ? MARK_COL.done : MARK_COL.quest,
    });
  }
  return out;
}

/** Tiến độ quest mini cho nhật ký: bước nói chuyện rồi từng câu đố. */
export function miniState(m: Mini, P = Server.P) {
  const talked = P.puz.talked.includes(m.id);
  const steps = [
    { text: `Nói chuyện với ${m.npc}`, n: talked ? 1 : 0, max: 1, target: `npc:${m.id}` },
    ...m.cauDo.map((id) => ({
      text: `Giải: ${PZ[id]!.ten}`,
      n: P.puz.solved.includes(id) ? 1 : 0,
      max: 1,
      target: `pz:${id}`,
    })),
  ];
  const done = P.puz.mini.includes(m.id);
  const cur = done ? -1 : steps.findIndex((s) => s.n < s.max);
  return { done, steps, cur: cur < 0 && !done ? steps.length - 1 : cur };
}

/** Tọa độ ô của đích quest mini ("npc:mq-..." hoặc "pz:id") trên đảo. */
export function miniTargetXY(t: string, M: any): [number, number] | null {
  const [k, id] = t.split(":");
  if (!id || !M?.puz) return null;
  const pid = k === "npc" ? MINI.find((m) => m.id === id)?.cauDo[0] : id;
  const s = pid && spotOf(M, pid);
  if (!s) return null;
  return k === "npc" ? [s.x + 0.5, s.y + s.top - 2 + 0.5] : [s.x + 0.5, s.y + 0.5];
}
export const isMiniTarget = (t: string | null | undefined) => !!t && /^(npc|pz):/.test(t);
