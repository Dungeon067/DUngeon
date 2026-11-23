import { GS } from "../core/state";
import { sfx } from "../core/audio";
import { dist, fmt } from "../core/util";
import type { Domain } from "../data/puzzles-schema";
import { makeEnemy } from "../entities/enemy";
import { fxBurst, fxRing, fxText } from "../entities/fx";
import { newSession } from "../entities/party";
import { enterPlay, showBanner } from "./session";
import { Server } from "../server/server";
import { lootFeed } from "../ui/hud/feed";
import { exitToMenu } from "../ui/screens";
import { toast } from "../ui/toast";
import { DX, genDomain, openDoor } from "../world/domain-map";
import { TS } from "../world/map";
import { buildPuzzles, puzzleInteract } from "../world/puzzles";

/* Bí cảnh (S23): vào từ cửa trên đảo, đi qua các phòng câu đố, một trận đánh, mở rương rồi ra.
   Tiến độ lưu theo phòng (Profile.puz.domains); gục ngã thì hồi sinh ở sảnh vào. */

type DMap = ReturnType<typeof genDomain>;

export function startDomain(d: Domain) {
  const W = genDomain(d);
  GS.G = newSession("domain");
  GS.G.map = W;
  buildPuzzles(W, W.puz);
  const sanh = W.rooms[0]!;
  GS.G.p.x = (DX + 0.5) * TS;
  GS.G.p.y = (sanh.cy + 2.5) * TS;
  GS.G.respawn = { x: GS.G.p.x, y: GS.G.p.y };
  GS.G.dom = { d, spawned: false };
  GS.G.onPuzzleSolved = () => syncDoors();
  syncDoors();
  enterPlay();
  showBanner(`Bí cảnh · ${d.ten}`);
  sfx("rise");
}

const save = (d: Domain) => Server.P.puz.domains[d.id] ?? { room: 0, done: false };

/** Mở các cửa đã qua: sảnh luôn mở, phòng câu đố mở khi giải xong, phòng đánh mở khi thắng. */
function syncDoors() {
  const W: DMap = GS.G.map,
    d: Domain = GS.G.dom.d,
    S = save(d);
  W.rooms.forEach((r, i) => {
    const pass =
      r.kind === "sanh" ||
      (r.kind === "cau-do" && Server.P.puz.solved.includes(r.puzzle!)) ||
      (r.kind === "tran" && (S.room > i || S.done));
    if (!pass) return;
    if (openDoor(W, i) && GS.scene === "play") {
      const x = (DX + 0.5) * TS,
        y = (r.y0 - 0.5) * TS;
      fxBurst(x, y, "#9fe8ff", 18, 180, 3);
      if (r.kind !== "sanh") toast("Cửa phòng kế tiếp đã mở");
    }
    if (S.room < i + 1 && r.kind === "cau-do") Server.req("domainRoom", { id: d.id, room: i + 1 });
  });
}

export function domainLogic(_dt: number) {
  const G = GS.G,
    p = G.p,
    W: DMap = G.map,
    d: Domain = G.dom.d;
  let best: any = null,
    bd = 60;
  const check = (x: number, y: number, kind: string, i: number, label: string) => {
    const k = dist(p.x, p.y, x, y);
    if (k < bd) {
      bd = k;
      best = { kind, i, label, x, y };
    }
  };
  const ti = W.rooms.findIndex((r) => r.kind === "tran"),
    tr = W.rooms[ti]!,
    rr = W.rooms[W.rooms.length - 1]!;
  check((DX + 0.5) * TS, (W.rooms[0]!.cy - 1.2) * TS, "dexit", 0, "Rời bí cảnh");
  const S = save(d);
  const inTran = p.y / TS >= tr.y0 && p.y / TS <= tr.y1 + 1;
  if (!G.dom.spawned && inTran && S.room <= ti && !S.done) {
    G.dom.spawned = true;
    const n = d.tran.cap;
    d.tran.quai.forEach((q, k) => {
      for (let j = 0; j < 2 + (k === 0 ? 1 : 0); j++) {
        const a = (j / 3 + k * 0.5) * Math.PI * 2;
        G.enemies.push(makeEnemy(q, (tr.cx + 0.5 + Math.cos(a) * 3.5) * TS, (tr.cy + 0.5 + Math.sin(a) * 2.5) * TS, n));
      }
    });
    showBanner("Giữ vững trận!");
    sfx("slam");
  }
  if (G.dom.spawned && S.room <= ti && G.enemies.every((e: any) => e.dead)) {
    Server.req("domainRoom", { id: d.id, room: ti + 1 });
    toast("Đã thắng trận, cửa phòng rương đã mở");
    syncDoors();
  }
  const cx = (rr.cx + 0.5) * TS,
    cy = (rr.cy + 0.6) * TS;
  if (!S.done) {
    if (S.room > ti) check(cx, cy, "dchest", 0, "Mở rương bí cảnh");
  } else check(cx, (rr.cy - 2) * TS, "dexit", 1, "Rời bí cảnh");
  puzzleInteract(check);
  G.interact = best;
}

export function domainInteract(it: any) {
  const G = GS.G,
    d: Domain = G.dom.d;
  if (it.kind === "dexit") return exitDomain();
  if (it.kind !== "dchest") return;
  const r = Server.req("domainClear", { id: d.id });
  if (!r.ok) return;
  sfx("chest");
  sfx("star3");
  fxBurst(it.x, it.y - 14, "#f0c060", 40, 280, 4);
  fxRing(it.x, it.y - 10, 80, "#f0c060", 0.6, 6);
  fxText(it.x, it.y - 60, `${d.ten}: đã hoàn thành`, "#ffe27a", 18);
  fxText(it.x, it.y - 40, `+${r.data.gems} Đá Sao · +${fmt(r.data.coin)} Xu`, "#7fc8ff", 14);
  lootFeed("gems", "Đá Sao", r.data.gems, "da-sao", "#7fc8ff");
  lootFeed("coin", "Xu", r.data.coin, "xu", "#f0c060");
  lootFeed("book", "Sách kinh nghiệm", r.data.books, "nang-cap", "#c9a6ff");
}

export function exitDomain() {
  GS.G._ended = true;
  exitToMenu();
  showBanner("Đảo Lạc");
}
