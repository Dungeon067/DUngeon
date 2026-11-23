import { effectAt } from "../world/regions";
import { tickStack } from "../combat/damage";
import { GS } from "../core/state";
import { camRelative, dir8 } from "./facing";
import { tryAttack, updateBuffer } from "../combat/actions";
import { FEEL, charFx, gameDt } from "../combat/feel";
import { cameraTarget, updateZoom } from "../core/camera";
import { updateMusic } from "../core/music";
import { hitEnemy, hurtPlayer, nearestEnemy } from "../combat/damage";
import { sfx } from "../core/audio";
import { held, moveAxis } from "../core/input";
import { pollGamepad } from "../core/gamepad";
import { updateAir, updateGround, updateWaves } from "../combat/jump";
import { render } from "../core/render";
import { renderer3d } from "../render3d/select";
import { clamp, dist, lerpAng, rand } from "../core/util";
import { EL } from "../data/content";
import { updateBoss } from "../entities/boss";
import { updateEnemy } from "../entities/enemy";
import { fxText } from "../entities/fx";
import { cur } from "../entities/party";
import { towerLogic } from "../modes/tower";
import { worldLogic } from "../modes/world";
import { domainLogic } from "../modes/domain";
import { pulseElement, puzzleTick } from "../world/puzzles";
import { affinityTick } from "../ui/menu/progress";
import { Server } from "../server/server";
import { updateHud } from "../ui/hud";
import { lootFeed } from "../ui/hud/feed";
import { moveC, solidTile } from "../world/collision";
import { MH, MW, TL, TS } from "../world/map";

/* =========================================================
   MAIN UPDATE
   ========================================================= */

export function update(dt: number) {
  if (GS.G.cine) {
    GS.G.cine.t -= dt;
    if (GS.G.cine.t <= 0) {
      const f = GS.G.cine.fire;
      GS.G.cine = null;
      f();
    }
    return;
  }
  GS.G.time += dt;
  const p = GS.G.p,
    m = cur();
  // movement input
  // Cảnh 3D (đảo, bí cảnh, đấu trường): hướng đi theo camera. Bản 2D kiểm thử dùng góc nhìn cố định.
  let [mx, my] = camRelative(...moveAxis(), renderer3d() ? (GS.camYaw ?? 0) : 0);
  const ml = Math.hypot(mx, my);
  if (ml > 1) {
    mx /= ml;
    my /= ml;
  }
  p.moving = ml > 0.15 && !GS.G.over;
  if (p.moving) {
    p.dirX = mx;
    p.dirY = my;
    if (p.atkCd <= 0) p.face8 = dir8(Math.atan2(my, mx), p.face8);
  }
  if (p.air) {
    updateAir(p, dt, GS.G.over ? 0 : mx, GS.G.over ? 0 : my);
    dashHitStep(p);
    if (p.dashT <= 0) p.dashHit = null;
  } else if (p.dashT > 0) {
    p.dashT -= dt;
    moveC(p, p.dvx * dt, p.dvy * dt, 9);
    dashHitStep(p);
    if (p.dashT <= 0) p.dashHit = null;
  } else if (p.moving) {
    const sprint = GS.holdDash && p.dashHeld > 0.25 && p.stamina > 0;
    const sp = (sprint ? 225 : 155) * (p.atkAnim > 0 ? 0.45 : 1) * effectAt(GS.G.map, p.x, p.y, "moveSpeed");
    if (sprint) p.stamina = Math.max(0, p.stamina - 22 * dt);
    moveC(p, mx * sp * dt, my * sp * dt, 9);
    p.walk += dt * (sprint ? 14 : 10);
    p.dirX = mx;
    p.dirY = my;
    if (Math.abs(mx) > 0.2) p.fx = mx > 0 ? 1 : -1;
    p.back = my < -0.5 && Math.abs(mx) < 0.6;
  }
  if (!p.air) updateGround(p);
  p.land = Math.max(0, p.land - dt);
  if (GS.holdDash) p.dashHeld += dt;
  if (!(GS.holdDash && p.moving))
    p.stamina = Math.min(100, p.stamina + 28 * dt * effectAt(GS.G.map, p.x, p.y, "staminaRegen"));
  p.atkCd -= dt;
  p.comboT -= dt;
  p.atkAnim = Math.max(0, p.atkAnim - dt * 5);
  p.iframes -= dt;
  p.hurt -= dt;
  GS.G.switchCd -= dt;
  if (p.shieldT > 0) {
    p.shieldT -= dt;
    if (p.shieldT <= 0) p.shield = 0;
  }
  for (const pm of GS.G.party) {
    if (pm.skillCd > 0) pm.skillCd -= dt;
    if (pm.stack) tickStack(pm, dt);
    if (Server.P.gm.nocd) {
      pm.skillCd = 0;
      pm.energy = pm.c.burst.cost;
    }
  }
  updateBuffer(dt);
  updateWaves(dt);
  if (GS.holdAtk || held.attack) tryAttack();
  // later
  for (let i = GS.G.later.length - 1; i >= 0; i--) {
    const l = GS.G.later[i];
    l.t -= dt;
    if (l.t <= 0) {
      GS.G.later.splice(i, 1);
      l.fn();
    }
  }
  // enemies (sleep when far)
  for (const e of GS.G.enemies) {
    if (e.isBoss) {
      updateBoss(e, dt);
      continue;
    }
    if (GS.G.mode === "world" && dist(e.x, e.y, p.x, p.y) > 1000 && !e.ec) continue;
    updateEnemy(e, dt);
  }
  // separation
  for (let i = 0; i < GS.G.enemies.length; i++) {
    const a = GS.G.enemies[i];
    if (a.dead || a.isBoss) continue;
    for (let j = i + 1; j < GS.G.enemies.length; j++) {
      const b = GS.G.enemies[j];
      if (b.dead || b.isBoss) continue;
      const dx = b.x - a.x,
        dy = b.y - a.y,
        d = Math.hypot(dx, dy),
        mn = a.r + b.r;
      if (d > 0 && d < mn) {
        const push = (mn - d) / 2;
        const nx = dx / d,
          ny = dy / d;
        moveC(a, -nx * push, -ny * push, a.r * 0.6);
        moveC(b, nx * push, ny * push, b.r * 0.6);
      }
    }
  }
  GS.G.enemies = GS.G.enemies.filter((e: any) => !e.dead || e.isBoss);
  // projectiles
  for (const pr of GS.G.projs) {
    pr.life -= dt;
    if (pr.home && pr.own === "p") {
      const t = nearestEnemy(pr.x, pr.y, 180);
      if (t) {
        const a = Math.atan2(t.y - 14 - pr.y, t.x - pr.x),
          sp = Math.hypot(pr.vx, pr.vy);
        const ca = Math.atan2(pr.vy, pr.vx);
        const na = lerpAng(ca, a, dt * 6);
        pr.vx = Math.cos(na) * sp;
        pr.vy = Math.sin(na) * sp;
      }
    }
    pr.x += pr.vx * dt;
    pr.y += pr.vy * dt;
    if (pr.own === "p" && pr.m && GS.G.fx.length < 240 && Math.random() < dt * 30) {
      const F = charFx(pr.m.c.id);
      GS.G.fx.push({
        k: "dot",
        x: pr.x,
        y: pr.y,
        vx: -pr.vx * 0.05,
        vy: -pr.vy * 0.05,
        g: 0,
        col: pr.el ? F.c : F.c2,
        life: 0.25,
        max: 0.25,
        size: pr.r * 0.5,
      });
    }
    if (GS.G.map && solidTile(pr.x, pr.y + 14, GS.G.map) && pr.kind !== "bossorb") {
      const i = Math.floor((pr.y + 14) / TS) * MW + Math.floor(pr.x / TS);
      const t = GS.G.map.m[i];
      const above = GS.G.map.h && GS.G.map.h[i] <= (pr.h0 ?? 0);
      if ((t === TL.TREE || t === TL.ROCK) && !above) pr.life = 0;
    }
    if (GS.G.bounds && (pr.x < 0 || pr.y < 0 || pr.x > GS.G.bounds.w || pr.y > GS.G.bounds.h)) pr.life = 0;
    if (pr.own === "p" && pr.el && pulseElement(pr.x, pr.y, pr.r + 8, pr.el)) pr.life = 0;
    if (pr.own === "p" && pr.life > 0) {
      for (const e of GS.G.enemies) {
        if (e.dead) continue;
        if (dist(pr.x, pr.y, e.x, e.y - (e.isBoss ? 24 : 12)) < pr.r + e.r) {
          hitEnemy(e, pr.m, pr.mult, pr.el, { ang: Math.atan2(pr.vy, pr.vx), cast: pr.cast, noEnergy: pr.noEnergy });
          pr.life = 0;
          break;
        }
      }
    } else if (pr.own !== "p" && dist(pr.x, pr.y, p.x, p.y - 14) < pr.r + 10) {
      hurtPlayer(pr.dmg, pr.el ? EL[pr.el].c : "#ff7070");
      pr.life = 0;
    }
    if (pr.kind === "orb" || pr.kind === "bossorb" || pr.kind === "tbolt")
      if (Math.random() < 0.5)
        GS.G.fx.push({
          k: "dot",
          x: pr.x,
          y: pr.y,
          vx: 0,
          vy: 0,
          col: EL[pr.el || "water"].c,
          life: 0.25,
          max: 0.25,
          size: pr.r * 0.5,
        });
  }
  GS.G.projs = GS.G.projs.filter((x: any) => x.life > 0);
  // turrets
  for (const t of GS.G.turrets) {
    t.life -= dt;
    t.cd -= dt;
    t.t += dt;
    if (t.cd <= 0) {
      const e = nearestEnemy(t.x, t.y, 340);
      if (e) {
        t.cd = 1;
        const a = Math.atan2(e.y - 14 - (t.y - 30), e.x - t.x);
        GS.G.projs.push({
          own: "p",
          x: t.x,
          y: t.y - 30,
          vx: Math.cos(a) * 520,
          vy: Math.sin(a) * 520,
          r: 7,
          life: 0.9,
          m: t.m,
          mult: t.mult,
          el: t.el,
          kind: "tbolt",
          cast: t.cast,
        });
      } else t.cd = 0.3;
    }
  }
  GS.G.turrets = GS.G.turrets.filter((t: any) => t.life > 0);
  // fields
  for (const f of GS.G.fields) {
    f.life -= dt;
    if (f.follow) {
      f.x = p.x;
      f.y = p.y;
    }
    f.tick -= dt;
    if (f.pull) {
      for (const e of GS.G.enemies) {
        if (e.dead || e.isBoss || e.type === "golem") continue;
        const d = dist(f.x, f.y, e.x, e.y);
        if (d < f.r && d > 8) {
          const a = Math.atan2(f.y - e.y, f.x - e.x);
          moveC(e, Math.cos(a) * f.pull * dt, Math.sin(a) * f.pull * dt, e.r * 0.6);
        }
      }
    }
    if (f.tick <= 0) {
      f.tick = f.ti;
      if (f.el && f.own !== "e") pulseElement(f.x, f.y, f.r, f.el);
      for (const e of GS.G.enemies) {
        if (!e.dead && dist(f.x, f.y, e.x, e.y) < f.r + e.r)
          hitEnemy(e, f.m, f.mult, f.el, { cast: f.cast, noKb: true });
      }
    }
    if (Math.random() < 0.7)
      GS.G.fx.push({
        k: "dot",
        x: f.x + rand(-f.r, f.r) * 0.8,
        y: f.y + rand(-f.r, f.r) * 0.5,
        vx: rand(-30, 30),
        vy: -rand(20, 60),
        col: EL[f.el].c2,
        life: 0.6,
        max: 0.6,
        size: rand(2, 4),
      });
  }
  GS.G.fields = GS.G.fields.filter((f: any) => f.life > 0);
  // pickups
  for (const k of GS.G.pickups) {
    k.t -= dt;
    if (k.delay > 0) {
      k.delay -= dt;
      continue;
    }
    const d = dist(k.x, k.y, p.x, p.y - 10);
    if (k.auto || d < 110) {
      const a = Math.atan2(p.y - 10 - k.y, p.x - k.x),
        sp = k.auto ? 420 : 300;
      k.x += Math.cos(a) * sp * dt;
      k.y += Math.sin(a) * sp * dt;
    }
    if (d < 18) {
      k.t = 0;
      if (k.k === "coin") {
        GS.G.loot.coin += k.v;
        fxText(p.x, p.y - 50, "+" + k.v + " Xu", "#f0c060", 12);
        lootFeed("coin", "Xu", k.v, "xu", "#f0c060");
        sfx("coin");
      }
      if (k.k === "book") {
        GS.G.loot.books += k.v;
        fxText(p.x, p.y - 50, "+" + k.v + " Sách KN", "#c9a6ff", 13);
        lootFeed("book", "Sách kinh nghiệm", k.v, "nang-cap", "#c9a6ff");
      }
      if (k.k === "shard") {
        p.shield = Math.max(p.shield, cur().maxHp * 0.25);
        p.shieldMax = p.shield;
        p.shieldT = 12;
        fxText(p.x, p.y - 50, "Khiên tinh thể", EL[k.el].c, 13);
        lootFeed("shard", "Khiên tinh thể", 0, "khien", EL[k.el].c);
      }
    }
  }
  GS.G.pickups = GS.G.pickups.filter((k: any) => k.t > 0);
  // fx
  for (const f of GS.G.fx) {
    f.life -= dt;
    if (f.vx !== undefined) {
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.vy += (f.g ?? 200) * dt;
      if (f.vr) f.rot += f.vr * dt;
    }
  }
  GS.G.fx = GS.G.fx.filter((f: any) => f.life > 0);
  for (const t of GS.G.texts) {
    t.life -= dt;
    t.y += t.vy * dt;
    t.vy *= Math.pow(0.15, dt);
  }
  GS.G.texts = GS.G.texts.filter((t: any) => t.life > 0);
  if (GS.G.banner.t > 0) GS.G.banner.t -= dt;
  // mode logic
  if (GS.G.mode === "world") {
    worldLogic(dt);
    affinityTick(dt);
  }
  if (GS.G.mode === "domain") domainLogic(dt);
  if (GS.G.map?.puzzles) puzzleTick(dt);
  if (GS.G.mode === "tower" || GS.G.mode === "baoan") towerLogic(dt);
  // camera
  const ct = cameraTarget(dt),
    cf = Math.min(1, dt * FEEL.camera.follow);
  GS.G.cam.x += (ct.x - GS.G.cam.x) * cf;
  GS.G.cam.y += (ct.y - GS.G.cam.y) * cf;
  clampCam();
  // sync counters with server ~ every 2s
  GS.lastSync += dt;
  if (GS.lastSync > 2) flushPending();
}
export function flushPending() {
  GS.lastSync = 0;
  if (!GS.G) return;
  const pd = GS.G.pending;
  for (const k of ["kill", "react", "burst"]) {
    if (pd[k] > 0) {
      Server.req("progress", { id: k, n: pd[k] });
      pd[k] = 0;
    }
  }
  // Trên đảo không có lúc "kết thúc trận": Xu và Sách KN nhặt được ghi ngay vào hồ sơ.
  const L = GS.G.loot;
  if (GS.G.mode === "world" && L && (L.coin || L.books)) {
    Server.req("reward", { coin: L.coin, books: L.books });
    L.coin = L.books = 0;
  }
}
export function snapCam() {
  GS.G.cam.x = GS.G.p.x;
  GS.G.cam.y = GS.G.p.y - 20;
  clampCam();
}
export function clampCam() {
  const hw = GS.VW / GS.ZOOM / 2,
    hh = GS.VH / GS.ZOOM / 2;
  const W = GS.G.map ? MW * TS : GS.G.bounds.w,
    H = GS.G.map ? MH * TS : GS.G.bounds.h;
  GS.G.cam.x = W < hw * 2 ? W / 2 : clamp(GS.G.cam.x, hw, W - hw);
  GS.G.cam.y = H < hh * 2 ? H / 2 : clamp(GS.G.cam.y, hh, H - hh);
}
/* =========================================================
   LOOP
   ========================================================= */

export function frame(now: number) {
  const dt = Math.min(0.05, (now - GS.lastT) / 1000);
  GS.lastT = now;
  try {
    pollGamepad();
    if (GS.scene === "play" && GS.G && !GS.paused) {
      update(gameDt(dt));
      updateZoom(dt);
    }
    updateMusic(dt);
    render();
    if (GS.scene === "play" && GS.G) updateHud();
  } catch (err) {
    console.error(err);
  }
  requestAnimationFrame(frame);
}

/** Lướt kèm sát thương (kỹ năng lướt), dùng cả trên mặt đất và trên không. */
function dashHitStep(p: any) {
  if (p.dashHit) {
    pulseElement(p.x, p.y, 50, p.dashHit.el);
    for (const e of GS.G.enemies) {
      if (e.dead || p.dashHit.set.has(e)) continue;
      if (dist(p.x, p.y, e.x, e.y) < 50 + e.r) {
        p.dashHit.set.add(e);
        hitEnemy(e, p.dashHit.m, p.dashHit.mult, p.dashHit.el, { cast: p.dashHit.cast, kb: 140 });
      }
    }
    GS.G.fx.push({
      k: "dot",
      x: p.x + rand(-6, 6),
      y: p.y - 14 + rand(-8, 8),
      vx: 0,
      vy: 0,
      col: EL[p.dashHit.el].c,
      life: 0.3,
      max: 0.3,
      size: 5,
    });
  }
}
