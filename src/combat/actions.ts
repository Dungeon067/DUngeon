import { GS } from "../core/state";
import { aim, hitEnemy, nearestEnemy } from "../combat/damage";
import { sfx } from "../core/audio";
import { TAU, dist, pick, rand } from "../core/util";
import { EL, WEAP } from "../data/content";
import { fxBolt, fxBurst, fxRing, fxSlash, fxText, later } from "../entities/fx";
import { cur } from "../entities/party";
import { Server } from "../server/server";

/* ---------- player actions ---------- */
export function tryAttack() {
  const p = GS.G.p,
    m = cur();
  if (!m || !m.alive || p.atkCd > 0 || p.dashT > 0 || GS.G.over) return;
  const W = WEAP[m.c.w];
  if (p.comboT <= 0) p.combo = 0;
  const step = p.combo;
  p.combo = (p.combo + 1) % 3;
  p.comboT = 1.1;
  p.atkCd = W.int;
  p.atkAnim = 1;
  aim();
  const ang = p.ang,
    el = m.c.w === "cat" || step === 2 ? m.c.el : null,
    mult = W.mult[step];
  if (W.kind === "melee") {
    fxSlash(p.x, p.y - 16, ang, W.range!, el ? EL[el].c : "#ffffff", m.c.w);
    p.x += Math.cos(ang) * 4;
    p.y += Math.sin(ang) * 4;
    for (const e of GS.G.enemies) {
      if (e.dead) continue;
      const ex = e.x,
        ey = e.y - (e.isBoss ? 20 : 10);
      const d = dist(p.x, p.y - 12, ex, ey);
      if (d > W.range + e.r) continue;
      let da = Math.atan2(ey - (p.y - 12), ex - p.x) - ang;
      while (da > Math.PI) da -= TAU;
      while (da < -Math.PI) da += TAU;
      if (Math.abs(da) > W.arc! && d > e.r + 10) continue;
      hitEnemy(e, m, mult, el, { ang, kb: m.c.w === "great" ? 160 : 70 });
    }
    sfx("swing");
  } else {
    const sp = W.kind === "arrow" ? 640 : 400;
    GS.G.projs.push({
      own: "p",
      x: p.x + Math.cos(ang) * 14,
      y: p.y - 16 + Math.sin(ang) * 14,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp,
      r: W.kind === "arrow" ? 5 : 8,
      life: 0.8,
      m,
      mult,
      el,
      kind: W.kind,
      home: W.kind === "orb",
    });
    sfx("swing");
  }
}
export function doDash() {
  const p = GS.G.p;
  if (p.dashT > 0 || p.stamina < 20 || GS.G.over) return;
  p.stamina -= 20;
  let dx = p.dirX,
    dy = p.dirY;
  const L = Math.hypot(dx, dy) || 1;
  dx /= L;
  dy /= L;
  p.dashT = 0.2;
  p.dvx = dx * 460;
  p.dvy = dy * 460;
  p.iframes = Math.max(p.iframes, 0.32);
  fxBurst(p.x, p.y - 6, "#ffffff", 8, 90, 2);
}
export function castSkill() {
  const p = GS.G.p,
    m = cur();
  if (!m || !m.alive || GS.G.over) return;
  if (m.skillCd > 0 && !Server.P.gm.nocd) return;
  const S = m.c.skill,
    el = m.c.el,
    col = EL[el].c;
  m.skillCd = S.cd;
  aim();
  const ang = p.ang;
  const cast = { gave: false, amount: 12 };
  sfx("skill");
  if (S.type === "dash") {
    p.dashT = 0.2;
    p.dvx = Math.cos(ang) * 820;
    p.dvy = Math.sin(ang) * 820;
    p.iframes = 0.35;
    p.atkAnim = 1;
    const hit = new Set();
    p.dashHit = { set: hit, m, mult: S.m, el, cast };
    fxSlash(p.x, p.y - 16, ang, 90, col, "great");
  } else if (S.type === "nova" || S.type === "shield" || S.type === "heal") {
    const R = S.type === "heal" ? 120 : 130;
    fxRing(p.x, p.y - 12, R, col, 0.45, 10);
    fxBurst(p.x, p.y - 12, col, 24, 260, 3.5);
    GS.G.shake = 4;
    for (const e of GS.G.enemies) {
      if (!e.dead && dist(p.x, p.y, e.x, e.y) < R + e.r) hitEnemy(e, m, S.m, el, { cast, kb: 180 });
    }
    if (S.type === "shield") {
      p.shield = m.maxHp * 0.3;
      p.shieldMax = p.shield;
      p.shieldT = 12;
    }
    if (S.type === "heal") {
      for (const pm of GS.G.party) {
        if (pm.alive) {
          pm.hp = Math.min(pm.maxHp, pm.hp + pm.maxHp * 0.12 + 200);
        }
      }
      fxText(p.x, p.y - 56, "Hồi máu", "#7dffa8", 15);
    }
  } else if (S.type === "turret") {
    GS.G.turrets.push({
      x: p.x + Math.cos(ang) * 30,
      y: p.y + Math.sin(ang) * 20,
      el,
      m,
      life: 10,
      cd: 0.3,
      mult: S.m,
      cast,
      t: 0,
    });
    fxRing(p.x, p.y, 50, col, 0.3, 5);
  } else if (S.type === "vortex") {
    const x = p.x + Math.cos(ang) * 110,
      y = p.y + Math.sin(ang) * 110;
    GS.G.fields.push({ k: "vortex", x, y, r: 150, el, m, life: 2.5, tick: 0, ti: 0.5, mult: S.m, cast, pull: 180 });
  }
}
export function castBurst() {
  const p = GS.G.p,
    m = cur();
  if (!m || !m.alive || GS.G.over || GS.G.cine) return;
  if (m.energy < m.c.burst.cost && !Server.P.gm.nocd) return;
  m.energy = 0;
  GS.G.pending.burst++;
  p.iframes = 1.4;
  sfx("burst");
  GS.G.cine = { t: 0.95, max: 0.95, m, fire: () => doBurst(m) };
}
export function doBurst(m: any) {
  const p = GS.G.p,
    B = m.c.burst,
    el = m.c.el,
    col = EL[el].c,
    cast = { gave: false, amount: 0 };
  GS.G.shake = 8;
  if (B.type === "inferno") {
    fxRing(p.x, p.y - 12, 230, col, 0.6, 16);
    fxRing(p.x, p.y - 12, 150, EL[el].c2, 0.5, 8);
    fxBurst(p.x, p.y - 12, col, 50, 420, 5);
    for (const e of GS.G.enemies) {
      if (!e.dead && dist(p.x, p.y, e.x, e.y) < 230 + e.r) hitEnemy(e, m, B.m, el, { noEnergy: true, kb: 260 });
    }
  } else if (B.type === "storm") {
    for (let i = 0; i < 10; i++)
      later(i * 0.2, () => {
        let tg = nearestEnemy(p.x, p.y, 340);
        const alive = GS.G.enemies.filter((e: any) => !e.dead && dist(p.x, p.y, e.x, e.y) < 340);
        if (alive.length) tg = pick(alive);
        const x = tg ? tg.x + rand(-10, 10) : p.x + rand(-200, 200),
          y = tg ? tg.y + rand(-6, 6) : p.y + rand(-150, 150);
        if (m.c.w === "bow") {
          GS.G.fx.push({ k: "arrowRain", x, y, col, life: 0.22, max: 0.22 });
        } else fxBolt(x, y, col);
        fxRing(x, y, 55, col, 0.25, 4);
        for (const e of GS.G.enemies) {
          if (!e.dead && dist(x, y, e.x, e.y) < 55 + e.r) hitEnemy(e, m, B.m, el, { noEnergy: true, noKb: true });
        }
      });
  } else if (B.type === "tide") {
    fxRing(p.x, p.y - 12, 240, col, 0.7, 18);
    fxRing(p.x, p.y - 12, 180, EL[el].c2, 0.6, 10);
    fxBurst(p.x, p.y - 12, EL[el].c2, 40, 360, 4);
    for (const e of GS.G.enemies) {
      if (!e.dead && dist(p.x, p.y, e.x, e.y) < 240 + e.r) hitEnemy(e, m, B.m, el, { noEnergy: true, kb: 300 });
    }
    for (const pm of GS.G.party) if (pm.alive) pm.hp = Math.min(pm.maxHp, pm.hp + pm.maxHp * 0.3);
    fxText(p.x, p.y - 60, "Hồi máu cả đội", "#7dffa8", 16);
  } else if (B.type === "meteor") {
    const tg = nearestEnemy(p.x, p.y, 360);
    const x = tg ? tg.x : p.x + Math.cos(p.ang) * 150,
      y = tg ? tg.y : p.y + Math.sin(p.ang) * 150;
    GS.G.fx.push({ k: "meteor", x, y, col, life: 0.8, max: 0.8 });
    later(0.8, () => {
      GS.G.shake = 14;
      fxRing(x, y, 170, col, 0.6, 16);
      fxBurst(x, y, col, 50, 420, 5);
      for (const e of GS.G.enemies) {
        if (!e.dead && dist(x, y, e.x, e.y) < 170 + e.r) hitEnemy(e, m, B.m, el, { noEnergy: true, kb: 200 });
      }
    });
    p.shield = Math.max(p.shield, m.maxHp * 0.35);
    p.shieldMax = p.shield;
    p.shieldT = 12;
  } else if (B.type === "blizzard") {
    GS.G.fields.push({
      k: "storm",
      follow: true,
      x: p.x,
      y: p.y,
      r: 160,
      el,
      m,
      life: 6,
      tick: 0,
      ti: 0.5,
      mult: B.m,
      cast: { gave: true },
    });
  }
}
