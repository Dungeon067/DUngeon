import { GS } from "../core/state";
import { sfx } from "../core/audio";
import { TAU, dist, fmt, pick } from "../core/util";
import { makeEnemy } from "../entities/enemy";
import { fxBurst, fxRing, fxText } from "../entities/fx";
import { newSession } from "../entities/party";
import { enterPlay, showBanner } from "../modes/session";
import { Server } from "../server/server";
import { buildHudParty } from "../ui/hud";
import { lootFeed } from "../ui/hud/feed";
import { exitToMenu, updateWallets } from "../ui/screens";
import { toast } from "../ui/toast";
import { blockedAt } from "../world/collision";
import { TS, genWorld } from "../world/map";

export function startWorld() {
  if (!GS.WORLD) GS.WORLD = genWorld();
  GS.G = newSession("world");
  GS.G.map = GS.WORLD;
  const s = GS.WORLD.statues[0];
  GS.G.p.x = (s.x + 0.5) * TS;
  GS.G.p.y = (s.y + 2.5) * TS;
  GS.G.respawn = { x: GS.G.p.x, y: GS.G.p.y };
  // camps
  GS.WORLD.camps.forEach((c: any, i: number) => {
    const d = Math.hypot(c.x - GS.WORLD.cx, c.y - GS.WORLD.cy),
      lv = Math.max(1, Math.min(8, 1 + Math.floor((d - 8) / 6)));
    const n = 3 + (i % 3);
    const elite = i % 6 === 5;
    for (let k = 0; k < n; k++) {
      const type = pick(
        lv < 2
          ? ["slime", "slime", "goblin"]
          : lv < 4
            ? ["slime", "goblin", "archer", "goblin"]
            : ["goblin", "archer", "shaman", "slime"],
      );
      const a = (k / n) * TAU,
        ex = (c.x + 0.5) * TS + Math.cos(a) * 50,
        ey = (c.y + 0.5) * TS + Math.sin(a) * 50;
      if (!blockedAt(ex, ey, 12, GS.WORLD)) GS.G.enemies.push(makeEnemy(type, ex, ey, lv));
    }
    if (elite) GS.G.enemies.push(makeEnemy("golem", (c.x + 0.5) * TS, (c.y + 0.5) * TS, lv + 1, "earth"));
  });
  enterPlay();
  showBanner("Đảo Lạc");
}
export function worldLogic(dt: number) {
  const p = GS.G.p,
    W = GS.G.map;
  let best = null,
    bd = 60;
  const check = (x: number, y: number, kind: string, i: number, label: string) => {
    const d = dist(p.x, p.y, x, y);
    if (d < bd) {
      bd = d;
      best = { kind, i, label, x, y };
    }
  };
  W.statues.forEach((s: any, i: number) =>
    check((s.x + 0.5) * TS, (s.y + 0.9) * TS, "statue", i, "Bia Đá: hồi phục đội"),
  );
  W.chests.forEach((c: any, i: any) => {
    if (!Server.P.chests.includes(i)) check((c.x + 0.5) * TS, (c.y + 0.6) * TS, "chest", i, "Mở rương báu");
  });
  check((W.tower.x + 0.5) * TS, (W.tower.y + 0.8) * TS, "tower", 0, "Vào Tháp Tinh Tú");
  check((W.gate.x + 0.5) * TS, (W.gate.y + 0.8) * TS, "gate", 0, "Vào hang Hắc Giao");
  GS.G.interact = best;
  // passive statue heal
  GS.G.healAura = false;
  for (const s of W.statues) {
    if (dist(p.x, p.y, (s.x + 0.5) * TS, (s.y + 0.9) * TS) < 90) {
      GS.G.healAura = true;
      for (const m of GS.G.party) if (m.alive) m.hp = Math.min(m.maxHp, m.hp + m.maxHp * 0.25 * dt);
    }
  }
}
export function doInteract() {
  if (!GS.G || !GS.G.interact || GS.G.over) return;
  const it = GS.G.interact;
  if (it.kind === "statue") {
    for (const m of GS.G.party) {
      m.alive = true;
      m.hp = m.maxHp;
    }
    GS.G.respawn = { x: GS.G.p.x, y: GS.G.p.y };
    fxRing(it.x, it.y - 20, 70, "#9fe8ff", 0.5, 6);
    fxBurst(it.x, it.y - 30, "#9fe8ff", 20, 160);
    toast("Đã hồi phục cả đội và lưu điểm hồi sinh");
    buildHudParty();
  } else if (it.kind === "chest") {
    const r = Server.req("openChest", { idx: it.i });
    if (r.ok) {
      sfx("chest");
      fxBurst(it.x, it.y - 14, "#f0c060", 30, 240, 4);
      fxRing(it.x, it.y - 10, 60, "#f0c060", 0.5, 6);
      fxText(it.x, it.y - 44, `+${r.data.gems} Đá Sao`, "#7fc8ff", 18);
      fxText(it.x, it.y - 26, `+${fmt(r.data.coin)} Xu · +${r.data.books} Sách`, "#f0c060", 13);
      lootFeed("gems", "Đá Sao", r.data.gems, "da-sao", "#7fc8ff");
      lootFeed("coin", "Xu", r.data.coin, "xu", "#f0c060");
      lootFeed("book", "Sách kinh nghiệm", r.data.books, "nang-cap", "#c9a6ff");
      updateWallets();
    }
  } else if (it.kind === "tower") {
    exitToMenu("tower");
  } else if (it.kind === "gate") {
    exitToMenu("boss");
  }
}
