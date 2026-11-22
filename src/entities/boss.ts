import { GS } from "../core/state";
import { dealRaw, hurtPlayer } from "../combat/damage";
import { clamp, dist, lerpAng, pick, rand } from "../core/util";
import { BOSS, EL } from "../data/content";
import { makeEnemy } from "../entities/enemy";
import { fxBolt, fxBurst, fxRing, later } from "../entities/fx";
import { endRun, showBanner } from "../modes/session";

/* ---------- boss ---------- */
export function updateBoss(b, dt) {
  const p = GS.G.p;
  b.flash -= dt;
  if (b.auraT > 0) {
    b.auraT -= dt;
    if (b.auraT <= 0) b.aura = null;
  }
  if (b.vuln > 0) b.vuln -= dt;
  if (b.ec) {
    b.ec.t -= dt;
    if (b.ec.t <= 0) {
      b.ec.t = 0.5;
      b.ec.n--;
      fxBolt(b.x, b.y - 20, EL.bolt.c);
      dealRaw(b, b.ec.dmg, EL.bolt.c2);
      if (b.ec && b.ec.n <= 0) b.ec = null;
    }
  }
  if (b.dead) return;
  if (b.phase === 1 && b.hp < b.maxHp * BOSS.phase2.at) {
    b.phase = 2;
    b.el = BOSS.phase2.el;
    b.spd = BOSS.phase2.spd;
    showBanner("Hắc Giao nổi giận!");
    GS.G.shake = 12;
    fxRing(b.x, b.y, 260, EL.bolt.c, 0.8, 14);
    b.state = "idle";
    b.t = 1.2;
    b.tele = null;
  }
  const fr = b.frozen > 0;
  if (fr) {
    b.frozen -= dt;
  }
  const sp = b.phase === 2 ? 1.3 : 1;
  const a2p = Math.atan2(p.y - b.y, p.x - b.x);
  if (!fr) {
    if (b.state === "idle") {
      b.t -= dt;
      // drift around player at distance
      const want = 260,
        d = dist(b.x, b.y, p.x, p.y);
      const tang = a2p + Math.PI / 2;
      let vx = Math.cos(tang) * b.spd * 0.6,
        vy = Math.sin(tang) * b.spd * 0.6;
      if (d > want) {
        vx += Math.cos(a2p) * b.spd;
        vy += Math.sin(a2p) * b.spd;
      } else {
        vx -= Math.cos(a2p) * b.spd * 0.6;
        vy -= Math.sin(a2p) * b.spd * 0.6;
      }
      b.x = clamp(b.x + vx * dt, 80, GS.G.bounds.w - 80);
      b.y = clamp(b.y + vy * dt, 140, GS.G.bounds.h - 80);
      b.ang = lerpAng(b.ang, Math.atan2(vy, vx), dt * 4);
      if (b.t <= 0) {
        const opts = b.phase === 2 ? ["fan", "charge", "rain", "summon", "fan", "charge"] : ["fan", "charge", "rain"];
        b.act = pick(opts);
        b.state = "wind";
        b.t = 0;
        if (b.act === "fan") b.tele = { kind: "fan", ang: a2p, dur: 0.8 / sp };
        if (b.act === "charge") {
          b.tele = { kind: "line", ang: a2p, len: 520, dur: 1.0 / sp };
        }
        if (b.act === "rain") {
          b.rain = [];
          for (let i = 0; i < (b.phase === 2 ? 8 : 6); i++)
            b.rain.push({
              x: clamp(p.x + rand(-200, 200), 40, GS.G.bounds.w - 40),
              y: clamp(p.y + rand(-160, 160), 80, GS.G.bounds.h - 40),
            });
          b.rain[0] = { x: p.x, y: p.y };
          b.tele = { kind: "rain", dur: 1.2 / sp };
        }
        if (b.act === "summon") b.tele = { kind: "summon", dur: 0.8 };
      }
    } else if (b.state === "wind") {
      b.t += dt;
      if (b.tele.kind === "line" || b.tele.kind === "fan") b.ang = lerpAng(b.ang, b.tele.ang, dt * 8);
      if (b.t >= b.tele.dur) {
        const k = b.tele.kind,
          el = b.el,
          col = EL[el].c;
        if (k === "fan") {
          const n = b.phase === 2 ? 9 : 7;
          for (let i = 0; i < n; i++) {
            const a = b.tele.ang + (i - (n - 1) / 2) * 0.16;
            GS.G.projs.push({
              own: "e",
              x: b.x + Math.cos(a) * 40,
              y: b.y - 24 + Math.sin(a) * 40,
              vx: Math.cos(a) * 330 * sp,
              vy: Math.sin(a) * 330 * sp,
              r: 10,
              life: 2.2,
              dmg: b.atk * 0.8,
              kind: "bossorb",
              el,
            });
          }
          b.state = "idle";
          b.t = rand(1.2, 2) / sp;
        } else if (k === "line") {
          b.state = "charge";
          b.t = 0;
          b.cv = { x: Math.cos(b.tele.ang) * 900 * sp, y: Math.sin(b.tele.ang) * 900 * sp, left: 520 };
          b.hitP = false;
        } else if (k === "rain") {
          for (const r of b.rain) {
            fxRing(r.x, r.y, 64, col, 0.4, 8);
            fxBurst(r.x, r.y, col, 10, 160);
            if (el === "bolt") fxBolt(r.x, r.y, col);
            if (dist(p.x, p.y, r.x, r.y) < 70) hurtPlayer(b.atk, col);
          }
          GS.G.shake = 6;
          b.state = "idle";
          b.t = rand(1.3, 2) / sp;
        } else if (k === "summon") {
          for (let i = 0; i < 2; i++) {
            const e = makeEnemy(
              "slime",
              clamp(b.x + rand(-120, 120), 60, GS.G.bounds.w - 60),
              clamp(b.y + rand(60, 160), 120, GS.G.bounds.h - 60),
              b.lv * 2,
              "bolt",
            );
            e.state = "chase";
            GS.G.enemies.push(e);
            fxRing(e.x, e.y, 40, EL.bolt.c, 0.4, 5);
          }
          b.state = "idle";
          b.t = 1.5;
        }
        b.tele = null;
      }
    } else if (b.state === "charge") {
      const step = Math.hypot(b.cv.x, b.cv.y) * dt;
      b.x += b.cv.x * dt;
      b.y += b.cv.y * dt;
      b.cv.left -= step;
      b.ang = Math.atan2(b.cv.y, b.cv.x);
      if (!b.hitP && dist(b.x, b.y, p.x, p.y) < 60) {
        b.hitP = true;
        hurtPlayer(b.atk * 1.4, EL[b.el].c);
      }
      if (b.cv.left <= 0 || b.x < 60 || b.x > GS.G.bounds.w - 60 || b.y < 120 || b.y > GS.G.bounds.h - 60) {
        b.x = clamp(b.x, 60, GS.G.bounds.w - 60);
        b.y = clamp(b.y, 120, GS.G.bounds.h - 60);
        b.state = "idle";
        b.t = rand(1, 1.6) / sp;
        GS.G.shake = 6;
      }
    }
  }
  // body segments follow trail
  b.trail.unshift({ x: b.x, y: b.y });
  if (b.trail.length > 240) b.trail.pop();
  for (let i = 0; i < b.segs.length; i++) {
    const ti = Math.min(b.trail.length - 1, i * 6 + 4);
    b.segs[i].x = b.trail[ti].x;
    b.segs[i].y = b.trail[ti].y;
  }
  b.segs[0].x = b.x;
  b.segs[0].y = b.y;
  // contact damage
  if (dist(b.x, b.y, p.x, p.y) < 46 && b.state !== "charge") hurtPlayer(b.atk * 0.5, EL[b.el].c);
}
export function bossDefeated() {
  const b = GS.G.boss;
  b.dead = true;
  GS.G.shake = 16;
  fxRing(b.x, b.y, 300, EL[b.el].c, 1, 18);
  for (let i = 0; i < 4; i++) fxBurst(b.x + rand(-60, 60), b.y + rand(-40, 40), EL[b.el].c, 30, 380, 5);
  showBanner("Hắc Giao đã bị đánh bại!");
  GS.G.over = true;
  later(1.8, () => endRun(true));
}
