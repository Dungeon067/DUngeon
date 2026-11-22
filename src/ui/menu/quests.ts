import { GS } from "../../core/state";
import { OBJECTIVES } from "../../data/content";
import { CODEX, QUESTS } from "../../data/menu-content";
import type { Quest } from "../../data/menu-schema";
import { Server } from "../../server/server";

/* Tiến độ nhiệm vụ (S10), tính từ hồ sơ và lượt chơi; dùng chung cho Nhật ký và HUD (nhiệm vụ đang theo dõi). */
type Step = Quest["steps"][number];

export function stepProgress(s: Step, P: any = Server.P, G: any = GS.G): { n: number; max: number } {
  const max = s.count ?? 1;
  switch (s.kind) {
    case "objective": {
      const o = OBJECTIVES.world.find((x) => x.id === s.id);
      if (!o) return { n: 0, max };
      const m = o.done.count === "all" ? (G?.map?.chests.length ?? 26) : o.done.count;
      const k = o.done.kind;
      const n =
        k === "chests"
          ? P.chests.length
          : k === "statue"
            ? G?.statueUsed || P.chests.length || Object.keys(P.tower ?? {}).length
              ? 1
              : 0
            : k === "tower"
              ? Object.keys(P.tower ?? {}).length
              : Object.values(P.boss ?? {}).some(Boolean)
                ? 1
                : 0;
      return { n: Math.min(n, m), max: m };
    }
    case "kills":
      return { n: Math.min(P.stats.kills, max), max };
    case "reacts":
      return { n: Math.min(P.stats.reacts, max), max };
    case "chests":
      return { n: Math.min(P.chests.length, max), max };
    case "tower":
      return { n: Math.min(Object.keys(P.tower ?? {}).length, max), max };
    case "boss":
      return { n: Object.values(P.boss ?? {}).filter(Boolean).length >= max ? max : 0, max };
    case "pulls":
      return { n: Math.min(P.history.length, max), max };
    case "owned":
      return { n: Math.min(Object.keys(P.owned).length, max), max };
    case "codex": {
      const pre = s.id ? s.id + ":" : "";
      return { n: Math.min(P.codex.filter((c: string) => c.startsWith(pre)).length, max), max };
    }
  }
}

export function questState(q: Quest, P: any = Server.P, G: any = GS.G) {
  const steps = q.steps.map((s) => ({ ...s, ...stepProgress(s, P, G) }));
  const cur = steps.findIndex((s) => s.n < s.max);
  return { steps, cur, done: cur < 0 || P.quests.done.includes(q.id) };
}

export const stepText = (s: Step & { n: number; max: number }) =>
  s.text.replace("{n}", String(s.n)).replace("{max}", String(s.max));

/** Nhiệm vụ đang theo dõi (cho HUD): chữ của bước hiện tại và điểm chỉ đường. */
export function trackedObjective(): { text: string; target: string | null } | null {
  const id = Server.P.quests?.tracked;
  const q = id && QUESTS.quests.find((x) => x.id === id);
  if (!q) return null;
  const st = questState(q);
  if (st.done) return null;
  const s = st.steps[st.cur]!;
  return { text: `${q.name}: ${stepText(s)}`, target: s.target ?? null };
}

/** Ghi nhận nhiệm vụ đã xong vào hồ sơ (gọi khi mở menu và sau mỗi lượt chơi). */
export function syncQuests() {
  const P = Server.P;
  for (const q of QUESTS.quests)
    if (!P.quests.done.includes(q.id) && questState(q).cur < 0) Server.req("completeQuest", { id: q.id });
}

export const CODEX_TOTAL = () => CODEX.creatures.length + CODEX.places.length;
