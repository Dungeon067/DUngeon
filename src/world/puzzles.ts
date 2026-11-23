import { GS } from "../core/state";
import { sfx } from "../core/audio";
import { dist, fmt } from "../core/util";
import { EL, byId } from "../data/content";
import { DOMAINS, MINI, OBJ, PUZZLES, PZ } from "../data/puzzles";
import type { Domain, Mini } from "../data/puzzles-schema";
import { fxBurst, fxRing, fxText } from "../entities/fx";
import { Server } from "../server/server";
import { lootFeed } from "../ui/hud/feed";
import { toast } from "../ui/toast";
import { makeState, objView, pulse, tickPuzzle } from "./puzzle-core";
import type { PObj, PState } from "./puzzle-core";
import type { PuzzleSpot } from "./map";
import { MH, MW, TS } from "./map";

/* Câu đố nguyên tố trong game (S23): dựng trạng thái từ save, nhận đòn nguyên tố, gợi ý, thưởng. */

export interface Npc {
  mini: Mini;
  x: number;
  y: number;
}
export interface Portal {
  d: Domain;
  gate: string;
  x: number;
  y: number;
}

/** Dựng lại câu đố, NPC và cửa bí cảnh trên bản đồ (gọi mỗi lần vào đảo hoặc bí cảnh). */
export function buildPuzzles(W: any, spots: PuzzleSpot[] = W.puz ?? []) {
  const solved = Server.P.puz.solved;
  W.puzzles = spots.map((s) =>
    makeState(PZ[s.id]!, OBJ, (s.x + 0.5) * TS, (s.y + 0.5) * TS, TS, solved.includes(s.id), (x, y) =>
      W.h && x >= 0 && y >= 0 && x < MW && y < MH ? W.h[y * MW + x] : 0,
    ),
  );
  W.blockers = W.puzzles.flatMap((st: PState) => st.objs.filter((o) => o.def.chan));
  const at = (id: string) => spots.find((s) => s.id === id);
  W.npcs = MINI.flatMap((m) => {
    const s = at(m.cauDo[0]!);
    return s ? [{ mini: m, x: (s.x + 0.5) * TS, y: (s.y + s.top - 2 + 0.5) * TS }] : [];
  });
  W.portals = DOMAINS.flatMap((d) => {
    const s = at(d.cua);
    return s ? [{ d, gate: d.cua, x: (s.x + 0.5) * TS, y: (s.y + s.top - 1 + 0.9) * TS }] : [];
  });
}

/** Đội đã có nhân vật nguyên tố này (miễn phí hoặc đã nhận). */
export const hasElement = (el: string, P = Server.P) => Object.keys(P.owned).some((id) => byId[id]?.el === el);

const needs = (st: PState, el: string) =>
  st.objs.some(
    (o) =>
      o.def.buoc.every((b) => b.length === 1 && b[0] === el) || o.def.buoc.some((b) => b.length === 1 && b[0] === el),
  );

/** Xung nguyên tố từ đòn đánh, kỹ năng, nộ, đạn, vùng hiệu ứng. Trả về true nếu chạm vật thể. */
export function pulseElement(x: number, y: number, r: number, el: string | null | undefined): boolean {
  const W = GS.G?.map;
  if (!el || !W?.puzzles?.length) return false;
  const ev = pulse(W.puzzles, x, y, r, el);
  for (const e of ev) {
    const c = EL[e.el]?.c ?? "#fff";
    if (e.res === "reset") fxText(e.o.x, e.o.y - 40, e.o.def.trangThai[0], "#c8d2e0", 13);
    else {
      fxRing(e.o.x, e.o.y - 14, 26, c, 0.35, 4);
      if (e.res === "done") {
        fxBurst(e.o.x, e.o.y - 14, c, 12, 140, 3);
        fxText(e.o.x, e.o.y - 42, e.react ?? e.o.def.trangThai[1], e.react ? "#ffe27a" : c, e.react ? 16 : 13);
        sfx(e.react ? "rise" : "crack");
      }
    }
  }
  for (const st of new Set(ev.map((e) => e.st))) if (st.solved) onSolved(st);
  return ev.length > 0;
}

function onSolved(st: PState) {
  if (Server.P.puz.solved.includes(st.id)) return;
  const r = Server.req("solvePuzzle", { id: st.id });
  if (!r.ok) return;
  sfx("star3");
  fxRing(st.x, st.y - 10, 90, "#ffe27a", 0.6, 6);
  fxBurst(st.x, st.y - 20, "#ffe27a", 36, 260, 4);
  fxText(st.x, st.y - 70, `Đã giải: ${st.p.ten}`, "#ffe27a", 18);
  if (r.data.gems) {
    fxText(st.x, st.y - 50, `+${r.data.gems} Đá Sao · +${fmt(r.data.coin)} Xu`, "#7fc8ff", 14);
    lootFeed("gems", "Đá Sao", r.data.gems, "da-sao", "#7fc8ff");
    lootFeed("coin", "Xu", r.data.coin, "xu", "#f0c060");
    lootFeed("book", "Sách kinh nghiệm", r.data.books, "nang-cap", "#c9a6ff");
  }
  if (DOMAINS.some((d) => d.cua === st.id)) toast("Cửa bí cảnh đã mở");
  GS.G.onPuzzleSolved?.(st);
  for (const m of MINI) if (m.cauDo.includes(st.id)) tryFinishMini(m);
}

/** Xong quest mini nếu đủ điều kiện; thưởng và tặng nhân vật miễn phí. */
export function tryFinishMini(m: Mini) {
  const P = Server.P.puz;
  if (P.mini.includes(m.id) || !P.talked.includes(m.id) || !m.cauDo.every((c) => P.solved.includes(c))) return false;
  const r = Server.req("finishMini", { id: m.id });
  if (!r.ok) return false;
  toast(`Xong quest: ${m.ten} · +${r.data.gems} Đá Sao`);
  if (r.data.gift) toast(`${byId[r.data.gift]?.name} đã nhập đội!`);
  lootFeed("gems", "Đá Sao", r.data.gems, "da-sao", "#7fc8ff");
  return true;
}

/** Mỗi khung: hẹn giờ, gợi ý khi đứng gần lâu, khóa nhẹ câu đố Thổ, luồng gió nâng người. */
export function puzzleTick(dt: number) {
  const W = GS.G?.map,
    p = GS.G?.p;
  if (!W?.puzzles || !p) return;
  const R = PUZZLES.banKinhKyHieu;
  for (const st of W.puzzles as PState[]) {
    if (tickPuzzle(st, dt)) fxText(st.x, st.y - 50, "Hết giờ, vật thể trở lại như cũ", "#c8d2e0", 12);
    if (st.solved) continue;
    const near = st.objs.some((o) => dist(o.x, o.y, p.x, p.y) < R);
    if (!near) {
      st.near = 0;
      st.hinted = false;
      continue;
    }
    if (st.near === 0 && needs(st, "earth") && !hasElement("earth"))
      toast("Cần sức mạnh của đất. Ngọc Thạch ở Mỏ Ngọc Lòng Chảo có thể giúp.");
    st.near += dt;
    if (st.near >= PUZZLES.goiYSau && !st.hinted) {
      st.hinted = true;
      toast(`Gợi ý: ${st.p.goiY}`);
    }
  }
  for (const st of W.puzzles as PState[])
    for (const o of st.objs)
      if (o.def.nang && o.done && p.air && dist(o.x, o.y, p.x, p.y) < 36) p.vz = Math.max(p.vz, 5);
}

/** Điểm tương tác của NPC quest mini và cửa bí cảnh đã mở. */
export function puzzleInteract(check: (x: number, y: number, kind: string, i: number, label: string) => void) {
  const W = GS.G?.map;
  if (!W?.npcs) return;
  (W.npcs as Npc[]).forEach((n, i) => {
    const done = Server.P.puz.mini.includes(n.mini.id);
    check(n.x, n.y + 10, "npc", i, done ? `Nói chuyện: ${n.mini.npc}` : `${n.mini.npc}: ${n.mini.ten}`);
  });
  (W.portals as Portal[]).forEach((g, i) => {
    if (Server.P.puz.solved.includes(g.gate)) check(g.x, g.y, "portal", i, `Vào bí cảnh: ${g.d.ten}`);
  });
}

/** Vật thể chắn đường (bụi gai, lửa, tường nứt, sương độc...) chưa giải. */
export function blockedByPuzzle(x: number, y: number, r: number, W: any): boolean {
  const B: PObj[] | undefined = W?.blockers;
  if (!B) return false;
  for (const o of B) if (!o.done && Math.abs(o.x - x) < 18 + r && Math.abs(o.y - 8 - y) < 14 + r * 0.6) return true;
  return false;
}

/** Ảnh chụp dữ liệu vẽ của mọi câu đố, NPC quest mini và cửa bí cảnh trên bản đồ đang chơi, cho mọi renderer. */
export function puzzleViews(W: any = GS.G.map) {
  return {
    vatThe: ((W.puzzles ?? []) as PState[]).flatMap((st) => st.objs.map((o) => objView(o, TS))),
    npc: ((W.npcs ?? []) as Npc[]).map((n) => ({ quest: n.mini.id, ten: n.mini.npc, x: n.x, y: n.y })),
    cua: ((W.portals ?? []) as Portal[]).map((p) => ({
      biCanh: p.d.id,
      nguyenTo: p.d.nguyenTo,
      mo: !!W.puzzles?.find((s: PState) => s.id === p.gate)?.solved,
      x: p.x,
      y: p.y,
    })),
  };
}
