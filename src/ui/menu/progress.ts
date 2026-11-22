import { GS } from "../../core/state";
import { CODEX, MENU, MC } from "../../data/menu-content";
import { FOG, FOG_N, Server } from "../../server/server";
import { lootFeed } from "../hud/feed";
import { anchorXY, fogIdx } from "./anchor";
import { fogCells } from "./logic";
import { ITEM_BY_ID } from "../../data/menu-content";

/* Tiến trình khám phá khi chơi (S10): sương bản đồ, mở mục Bách khoa, điểm Thân thiết, vật phẩm rơi. */
let lastCell = -1;
export function exploreAround(tx: number, ty: number) {
  const here = fogIdx(tx, ty);
  if (here === lastCell) return;
  lastCell = here;
  const fog = Server.P.fog;
  const cells = fogCells(tx, ty, FOG, FOG_N, 1).filter((i) => fog[i] !== "1");
  if (!cells.length) return;
  Server.req("explore", { cells });
  const M = GS.G?.map;
  const ids = CODEX.places
    .filter((p) => {
      const a = anchorXY(p.at, M);
      return a && Server.P.fog[fogIdx(a[0], a[1])] === "1";
    })
    .map((p) => "dia:" + p.id)
    .filter((k) => !Server.P.codex.includes(k));
  if (ids.length) Server.req("discover", { ids });
}

/** Gọi khi một quái bị hạ: mở mục sinh vật, cộng Thân thiết cho người đang ra trận, thử rơi vật phẩm. */
export function onKill(e: any) {
  const P = Server.P,
    key = "quai:" + (e.isBoss ? "hacgiao" : e.type);
  if (CODEX.creatures.some((c) => "quai:" + c.id === key) && !P.codex.includes(key)) Server.req("discover", { ids: [key] });
  const act = GS.G?.party?.[GS.G.act]?.c?.id;
  if (act && MENU.affinity.perKill) Server.req("affinity", { id: act, n: MENU.affinity.perKill });
  rollDrop(e.isBoss ? "boss" : "enemy");
}

export function rollDrop(source: string) {
  for (const d of MC.items.drops[source] ?? []) {
    if (Math.random() >= d.chance) continue;
    const id = d.pool[Math.floor(Math.random() * d.pool.length)]!;
    if (Server.req("addItems", { items: { [id]: 1 } }).ok) lootFeed("item:" + id, ITEM_BY_ID[id]?.name ?? id, 1, "tui-do", "#c9a6ff");
  }
}

let affT = 0;
/** Mỗi giây ra trận trên đảo cộng điểm Thân thiết cho nhân vật đang điều khiển (gộp 10 giây một lần). */
export function affinityTick(dt: number) {
  if (!GS.G || GS.G.mode !== "world" || GS.paused || !MENU.affinity.perSecond) return;
  affT += dt;
  if (affT < 10) return;
  const id = GS.G.party?.[GS.G.act]?.c?.id;
  if (id) Server.req("affinity", { id, n: Math.round(affT * MENU.affinity.perSecond) });
  affT = 0;
}
