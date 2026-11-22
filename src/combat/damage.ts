import { GS } from "../core/state";
import { applyElement } from "../combat/elements";
import { sfx } from "../core/audio";
import { dist, fmt, rand } from "../core/util";
import { EL } from "../data/content";
import { bossDefeated } from "../entities/boss";
import { fxBurst, fxRing, fxText } from "../entities/fx";
import { cur } from "../entities/party";
import { partyWipe, showBanner } from "../modes/session";
import { Server } from "../server/server";
import { buildHudParty } from "../ui/hud";

/* =========================================================
   COMBAT
   ========================================================= */
export function nearestEnemy(x: number, y: number, maxD: number) {
  let best = null,
    bd = maxD;
  for (const e of GS.G.enemies) {
    if (e.dead) continue;
    const d = dist(x, y, e.x, e.y);
    if (d < bd) {
      bd = d;
      best = e;
    }
  }
  return best;
}
export function aim() {
  const p = GS.G.p,
    e = nearestEnemy(p.x, p.y, 300);
  if (e) {
    p.ang = Math.atan2(e.y - (e.isBoss ? 20 : 10) - (p.y - 14), e.x - p.x);
  } else p.ang = Math.atan2(p.dirY, p.dirX);
  if (Math.abs(Math.cos(p.ang)) > 0.2) p.fx = Math.cos(p.ang) > 0 ? 1 : -1;
  p.back = Math.sin(p.ang) < -0.75;
}
export function dealRaw(e: any, dmg: number, col: string) {
  if (e.dead) return;
  if (Server.P.gm.one) dmg = e.hp + 1;
  dmg *= e.vuln > 0 ? 1.25 : 1;
  e.hp -= dmg;
  e.flash = 0.08;
  fxText(e.x, e.y - (e.isBoss ? 70 : 34), fmt(dmg), col, 14);
  if (e.hp <= 0) killEnemy(e);
}
export function hitEnemy(e: any, m: any, mult: number, el: string, o: any = {}) {
  if (e.dead) return 0;
  const crit = Math.random() < m.st.crit;
  let dmg = m.st.atk * mult * (crit ? 1 + m.st.cdmg : 1) * rand(0.95, 1.05);
  const r = applyElement(e, el, m);
  dmg *= r.mult * (e.vuln > 0 ? 1.25 : 1);
  if (Server.P.gm.one) dmg = Math.max(dmg, e.hp + 1);
  e.hp -= dmg;
  e.flash = 0.1;
  const col = el ? EL[el].c2 : "#ffffff";
  fxText(
    e.x,
    e.y - (e.isBoss ? 70 : 34),
    fmt(dmg) + (crit ? "!" : ""),
    r.mult > 1 ? "#ffd27a" : col,
    r.mult > 1 ? 20 : 16,
    crit,
  );
  fxBurst(e.x, e.y - 14, el ? EL[el].c : "#ffffff", 5, 120, 2.5);
  if (!o.noKb && !e.isBoss && e.type !== "golem") {
    const an = o.ang !== undefined ? o.ang : Math.atan2(e.y - GS.G.p.y, e.x - GS.G.p.x);
    const k = o.kb || 80;
    e.kx += Math.cos(an) * k;
    e.ky += Math.sin(an) * k;
  }
  if (!o.noEnergy) {
    if (o.cast) {
      if (!o.cast.gave) {
        o.cast.gave = true;
        gainEnergy(o.cast.amount || 12, e.x, e.y, m);
      }
    } else {
      m.energy = Math.min(m.c.burst.cost, m.energy + 1.2);
    }
  }
  sfx("hit");
  if (e.hp <= 0) killEnemy(e);
  if (e.state === "idle" && !e.isBoss) e.state = "chase";
  return dmg;
}
export function gainEnergy(n: number, x: number, y: number, m: any) {
  for (const pm of GS.G.party) {
    if (!pm.alive) continue;
    const add = pm === cur() ? n : n * 0.35;
    pm.energy = Math.min(pm.c.burst.cost, pm.energy + add);
  }
  for (let i = 0; i < 3; i++)
    GS.G.pickups.push({
      k: "orb",
      x: x + rand(-14, 14),
      y: y + rand(-14, 14),
      el: m.c.el,
      t: 3,
      vy: 0,
      auto: true,
      delay: rand(0.1, 0.35),
    });
}
export function killEnemy(e: any) {
  if (e.dead) return;
  e.dead = true;
  e.hp = 0;
  fxBurst(e.x, e.y - 14, e.el ? EL[e.el].c : "#ccc", 18, 200, 3.5);
  fxRing(e.x, e.y - 10, 40, "#ffffff", 0.3, 3);
  if (e.isBoss) {
    bossDefeated();
    return;
  }
  GS.G.pending.kill++;
  if (GS.G.mode === "world") {
    const n = 1 + Math.floor(e.lv / 2);
    for (let i = 0; i < n; i++)
      GS.G.pickups.push({ k: "coin", x: e.x + rand(-16, 16), y: e.y + rand(-16, 16), v: 40 * e.lv, t: 30, vy: 0 });
    if (Math.random() < 0.18 + (e.type === "golem" ? 0.8 : 0))
      GS.G.pickups.push({ k: "book", x: e.x, y: e.y, v: e.type === "golem" ? 3 : 1, t: 30, vy: 0 });
  }
}
export function hurtPlayer(dmg: number, col = "#ff7070") {
  const p = GS.G.p,
    m = cur();
  if (!m || !m.alive || p.iframes > 0 || GS.G.over) return;
  if (Server.P.gm.god) {
    fxText(p.x, p.y - 48, "Miễn", "#bbb", 13);
    p.iframes = 0.25;
    return;
  }
  if (p.shield > 0) {
    const ab = Math.min(p.shield, dmg);
    p.shield -= ab;
    dmg -= ab;
    fxRing(p.x, p.y - 18, 30, EL.earth.c, 0.25, 3);
  }
  if (dmg <= 0) {
    p.iframes = 0.2;
    return;
  }
  m.hp -= dmg;
  p.hurt = 0.25;
  p.iframes = 0.45;
  GS.G.shake = Math.max(GS.G.shake, 5);
  fxText(p.x, p.y - 48, "-" + fmt(dmg), col, 16);
  sfx("hurt");
  if (m.hp <= 0) {
    m.hp = 0;
    m.alive = false;
    fxBurst(p.x, p.y - 20, "#ffffff", 20, 180);
    const nx = GS.G.party.findIndex((x: any) => x.alive);
    if (nx >= 0) {
      GS.G.act = nx;
      GS.G.switchCd = 0.5;
      showBanner(`${m.c.name} đã gục`);
      buildHudParty();
    } else partyWipe();
  }
}
