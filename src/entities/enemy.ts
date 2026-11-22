import { GS } from "../core/state";
import { dealRaw, hurtPlayer } from "../combat/damage";
import { TAU, dist, pick, rand } from "../core/util";
import { EL, ELS, ENEMY } from "../data/content";
import { fxBolt, fxBurst, fxRing, fxSlash } from "../entities/fx";
import { cur } from "../entities/party";
import { blocked, moveC } from "../world/collision";

export function makeEnemy(type: string, x: number, y: number, lv: number, el?: string | null) {
  const T = ENEMY[type],
    hpM = 1 + 0.5 * (lv - 1),
    atkM = 1 + 0.28 * (lv - 1);
  return {
    type,
    x,
    y,
    hx: x,
    hy: y,
    lv,
    el: el || pick(ELS.filter((e) => e !== "earth" && e !== "wind").concat(["water", "fire"])),
    hp: T.hp * hpM,
    maxHp: T.hp * hpM,
    atk: T.atk * atkM,
    r: T.r,
    spd: T.spd,
    aura: null,
    auraT: 0,
    frozen: 0,
    ec: null,
    vuln: 0,
    state: "idle",
    cd: rand(0.5, 1.5),
    tele: null,
    flash: 0,
    swing: 0,
    hop: 0,
    kx: 0,
    ky: 0,
    fx: 1,
    walk: 0,
    wx: x,
    wy: y,
    wt: 0,
    seed: Math.random() * 10,
    dead: false,
    hurtT: 0,
  };
}
/* =========================================================
   ENEMY AI
   ========================================================= */
export function updateEnemy(e: any, dt: number) {
  const p = GS.G.p,
    T = ENEMY[e.type];
  e.flash -= dt;
  e.swing = Math.max(0, e.swing - dt * 4);
  if (e.auraT > 0) {
    e.auraT -= dt;
    if (e.auraT <= 0) e.aura = null;
  }
  if (e.vuln > 0) e.vuln -= dt;
  if (e.ec) {
    e.ec.t -= dt;
    if (e.ec.t <= 0) {
      e.ec.t = 0.5;
      e.ec.n--;
      fxBolt(e.x, e.y - 10, EL.bolt.c);
      dealRaw(e, e.ec.dmg, EL.bolt.c2);
      if (e.ec && e.ec.n <= 0) e.ec = null;
    }
  }
  if (e.dead) return;
  // knockback
  if (e.kx || e.ky) {
    moveC(e, e.kx * dt, e.ky * dt, e.r * 0.6);
    e.kx *= Math.pow(0.002, dt);
    e.ky *= Math.pow(0.002, dt);
    if (Math.abs(e.kx) < 3) e.kx = 0;
    if (Math.abs(e.ky) < 3) e.ky = 0;
  }
  if (e.frozen > 0) {
    e.frozen -= dt;
    e.tele = null;
    return;
  }
  const d = dist(e.x, e.y, p.x, p.y),
    alive = cur() && cur().alive && !GS.G.over;
  e.cd -= dt;
  // telegraph resolve
  if (e.tele) {
    const tl = e.tele;
    tl.t += dt;
    if (e.type === "slime" && tl.kind === "hop") {
      e.hop = tl.t / tl.dur;
      const k = dt / tl.dur;
      e.x += tl.dx * k;
      e.y += tl.dy * k;
      if (blocked(e.x, e.y, e.r * 0.6)) {
        e.x -= tl.dx * k;
        e.y -= tl.dy * k;
      }
    }
    if (tl.t >= tl.dur) {
      resolveTele(e, tl);
      e.tele = null;
      e.hop = 0;
      e.cd = T.cd * rand(0.8, 1.2);
    }
    return;
  }
  if (GS.G.mode === "world" && dist(e.x, e.y, e.hx, e.hy) > 520) {
    e.state = "return";
  }
  if (e.state === "return") {
    const a = Math.atan2(e.hy - e.y, e.hx - e.x);
    moveC(e, Math.cos(a) * e.spd * 1.6 * dt, Math.sin(a) * e.spd * 1.6 * dt, e.r * 0.6);
    e.walk += dt * 8;
    e.fx = Math.cos(a) > 0 ? 1 : -1;
    e.hp = Math.min(e.maxHp, e.hp + e.maxHp * dt * 0.5);
    if (dist(e.x, e.y, e.hx, e.hy) < 20) e.state = "idle";
    return;
  }
  if (e.state === "idle") {
    e.wt -= dt;
    if (e.wt <= 0) {
      e.wt = rand(1.5, 3.5);
      e.wx = e.hx + rand(-60, 60);
      e.wy = e.hy + rand(-60, 60);
    }
    const dd = dist(e.x, e.y, e.wx, e.wy);
    if (dd > 6) {
      const a = Math.atan2(e.wy - e.y, e.wx - e.x);
      moveC(e, Math.cos(a) * e.spd * 0.4 * dt, Math.sin(a) * e.spd * 0.4 * dt, e.r * 0.6);
      e.walk += dt * 5;
      e.fx = Math.cos(a) > 0 ? 1 : -1;
    }
    if (alive && d < T.aggro) e.state = "chase";
    return;
  }
  if (!alive) return;
  e.fx = p.x > e.x ? 1 : -1;
  const a = Math.atan2(p.y - e.y, p.x - e.x);
  const want =
    e.type === "archer" ? 220 : e.type === "shaman" ? 200 : e.type === "golem" ? 70 : e.type === "slime" ? 110 : 40;
  if (e.type === "archer" || e.type === "shaman") {
    if (d > want + 50) {
      moveC(e, Math.cos(a) * e.spd * dt, Math.sin(a) * e.spd * dt, e.r * 0.6);
      e.walk += dt * 8;
    } else if (d < want - 60) {
      moveC(e, -Math.cos(a) * e.spd * 0.8 * dt, -Math.sin(a) * e.spd * 0.8 * dt, e.r * 0.6);
      e.walk += dt * 8;
    }
    if (e.cd <= 0 && d < want + 140) {
      if (e.type === "archer") e.tele = { kind: "proj", t: 0, dur: 0.55, ang: a };
      else e.tele = { kind: "circle", x: p.x, y: p.y, r: 62, t: 0, dur: 1.05, el: e.el };
    }
  } else {
    if (d > want) {
      moveC(e, Math.cos(a) * e.spd * dt, Math.sin(a) * e.spd * dt, e.r * 0.6);
      e.walk += dt * (e.type === "golem" ? 5 : 9);
    }
    if (e.cd <= 0 && d < want + 30) {
      if (e.type === "slime") {
        const L = Math.min(d, 130);
        e.tele = {
          kind: "hop",
          t: 0,
          dur: 0.6,
          dx: Math.cos(a) * L,
          dy: Math.sin(a) * L,
          tx: e.x + Math.cos(a) * L,
          ty: e.y + Math.sin(a) * L,
          r: 34,
        };
      } else if (e.type === "golem") e.tele = { kind: "circle", x: e.x, y: e.y, r: 120, t: 0, dur: 1.1, el: "earth" };
      else e.tele = { kind: "arc", x: e.x, y: e.y, r: 62, ang: a, arc: 1.1, t: 0, dur: 0.55 };
    }
  }
}
export function inArc(px: number, py: number, tl: any) {
  const d = dist(tl.x, tl.y, px, py);
  if (d > tl.r + 10) return false;
  let da = Math.atan2(py - tl.y, px - tl.x) - tl.ang;
  while (da > Math.PI) da -= TAU;
  while (da < -Math.PI) da += TAU;
  return Math.abs(da) < tl.arc;
}
export function resolveTele(e: any, tl: any) {
  const p = GS.G.p;
  if (tl.kind === "arc") {
    e.swing = 1;
    if (inArc(p.x, p.y, tl)) hurtPlayer(e.atk);
    fxSlash(e.x, e.y - 12, tl.ang, tl.r, "#ff9a9a", "sword");
  } else if (tl.kind === "circle") {
    if (dist(p.x, p.y, tl.x, tl.y) < tl.r + 6)
      hurtPlayer(e.atk * (e.type === "golem" ? 1.3 : 1), tl.el ? EL[tl.el].c : "#ff7070");
    fxRing(tl.x, tl.y, tl.r, tl.el ? EL[tl.el].c : "#ff8080", 0.35, 8);
    fxBurst(tl.x, tl.y, tl.el ? EL[tl.el].c : "#ff8080", 14, 160);
    if (e.type === "golem") GS.G.shake = Math.max(GS.G.shake, 7);
  } else if (tl.kind === "hop") {
    if (dist(p.x, p.y, e.x, e.y) < tl.r + 6) hurtPlayer(e.atk);
    fxRing(e.x, e.y, tl.r, EL[e.el].c, 0.3, 5);
  } else if (tl.kind === "proj") {
    const a = Math.atan2(p.y - 14 - (e.y - 14), p.x - e.x);
    GS.G.projs.push({
      own: "e",
      x: e.x,
      y: e.y - 14,
      vx: Math.cos(a) * 360,
      vy: Math.sin(a) * 360,
      r: 5,
      life: 1.4,
      dmg: e.atk,
      kind: "earrow",
    });
    e.swing = 1;
  }
}
