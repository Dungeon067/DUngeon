import { effectAt } from "../world/regions";
import { GS } from "../core/state";
import { aim, hitEnemy, nearestEnemy } from "../combat/damage";
import { sfx } from "../core/audio";
import { TAU, dist, pick, rand } from "../core/util";
import { groundAt } from "../world/collision";
import { WEAP } from "../data/content";
import { fxBolt, fxBurst, fxParticles, fxRing, fxSlash, fxText, later } from "../entities/fx";
import { cur } from "../entities/party";
import { FEEL, charFx, feelState, hitstop, inputBuffer, shake } from "../combat/feel";
import { Server } from "../server/server";
import { canAirDash, tryJump, tryPlunge } from "./jump";
import { pulseElement } from "../world/puzzles";
import { kitOf } from "../data/kits";
import { infusionOf } from "./status";
import { hooksOf } from "./kits/hooks";
import { runBlocks } from "./kits/blocks";
import { castKitBurst, castKitSkill, kitAtkSpeed } from "./kits/run";

/* ---------- đệm lệnh: bấm sớm trong FEEL.input.buffer giây vẫn được nhận ---------- */
export type BufferedAct = "atk" | "skill" | "burst" | "dash" | "jump";
const ACTS: Record<BufferedAct, () => boolean> = {
  atk: () => tryAttack(),
  skill: () => castSkill(),
  burst: () => castBurst(),
  dash: () => doDash(),
  jump: () => tryJump(),
};
export function press(a: BufferedAct) {
  if (ACTS[a]()) inputBuffer[a] = 0;
  else inputBuffer[a] = FEEL.input.buffer;
}
export function updateBuffer(dt: number) {
  for (const a of Object.keys(inputBuffer) as BufferedAct[]) {
    if (inputBuffer[a] <= 0) continue;
    if (ACTS[a]()) inputBuffer[a] = 0;
    else inputBuffer[a] -= dt;
  }
}

/* ---------- player actions ---------- */
export function tryAttack(): boolean {
  const p = GS.G.p,
    m = cur();
  if (!m || !m.alive || GS.G.over || GS.G.cine) return false;
  if (p.air) return tryPlunge();
  if (p.atkCd > 0 || p.dashT > 0) return false;
  const W = WEAP[m.c.w];
  // Bộ chiêu riêng (S30): chuỗi 3–5 đòn theo content/kits/<id>.yaml; còn lại 3 đòn theo vũ khí.
  const K = kitOf(m),
    chain = K ? (hooksOf(m).chain?.(m) ?? K.thuong) : null,
    L = chain ? chain.length : 3;
  if (p.comboT <= 0 || p.combo >= L) p.combo = 0;
  const step = p.combo;
  p.combo = (p.combo + 1) % L;
  p.comboT = 1.1;
  p.atkCd = W.int * (K ? kitAtkSpeed(m) : 1);
  p.atkAnim = 1;
  const T: any = chain?.[step];
  const k = !T ? `atk${step + 1}` : step < 2 ? `atk${step + 1}` : step === L - 1 ? "atk3" : "atk2";
  p.act = { k, clip: T?.clip, t0: GS.G.time };
  aim();
  const ang = p.ang,
    el = T
      ? (infusionOf(m) ?? (T.el || m.c.w === "cat" ? m.c.el : null))
      : m.c.w === "cat" || step === 2
        ? m.c.el
        : null,
    mult = T ? T.m : W.mult[step],
    F = charFx(m.c.id);
  const fin = T ? step === L - 1 : step === 2;
  if (T?.khoi) runBlocks(T.khoi, { m, x: p.x, y: p.y, ang, cast: null, normal: true });
  if (W.kind === "melee") {
    fxSlash(p.x, p.y - 16, ang, W.range!, el ? F.c : F.c2, m.c.w, F.trail, el ? F.c2 : "#ffffff");
    if (el) fxParticles(p.x + Math.cos(ang) * W.range! * 0.7, p.y - 16 + Math.sin(ang) * W.range! * 0.7, F, 5);
    let landed = false;
    pulseElement(p.x + Math.cos(ang) * W.range! * 0.6, p.y + Math.sin(ang) * W.range! * 0.6, W.range! * 0.7, el);
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
      hitEnemy(e, m, mult, el, {
        ang,
        kb: T?.kb ?? (m.c.w === "great" ? 160 : 70),
        heavy: fin || m.c.w === "great",
        normal: true,
      });
      landed = true;
    }
    if (landed && (fin || m.c.w === "great")) {
      hitstop("heavy");
      shake("heavy");
    }
    sfx(m.c.w === "great" ? "swing_great" : "swing");
  } else {
    const sp = W.kind === "arrow" ? 640 : 400;
    const n = T?.vien ?? 1;
    for (let i = 0; i < n; i++) {
      const a = ang + (n > 1 ? (i / (n - 1) - 0.5) * 0.16 : 0);
      GS.G.projs.push({
        own: "p",
        h0: groundAt(p.x, p.y),
        x: p.x + Math.cos(a) * 14,
        y: p.y - 16 + Math.sin(a) * 14,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: W.kind === "arrow" ? 5 : 8,
        life: 0.8,
        m,
        mult,
        el,
        kind: W.kind,
        home: W.kind === "orb",
        heavy: fin,
        nay: T?.nay ?? 0,
        normal: true,
      });
    }
    sfx(W.kind === "arrow" ? "shoot" : "cast");
  }
  return true;
}
export function doDash(): boolean {
  const p = GS.G.p;
  if (p.dashT > 0 || GS.G.over || GS.G.cine) return false;
  if (p.air) {
    if (!canAirDash(p)) return false;
    p.airDash = true;
    p.stamina -= FEEL.jump.airDashStamina;
  } else {
    if (p.stamina < 20) return false;
    p.stamina -= 20 * effectAt(GS.G.map, p.x, p.y, "dashStamina");
  }
  if (FEEL.input.dashCancel) {
    // Lướt né hủy hoạt ảnh và thời gian chờ của đòn đánh; combo vẫn giữ để nối tiếp.
    p.atkAnim = 0;
    p.atkCd = 0;
  }
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
  sfx("dash");
  return true;
}
export function castSkill(): boolean {
  const p = GS.G.p,
    m = cur();
  if (!m || !m.alive || GS.G.over || GS.G.cine) return false;
  if (kitOf(m)) return castKitSkill("bam");
  if (m.skillCd > 0 && !Server.P.gm.nocd) return false;
  const S = m.c.skill,
    el = m.c.el,
    F = charFx(m.c.id),
    col = F.c;
  m.skillCd = S.cd;
  aim();
  p.act = { k: "skill", t0: GS.G.time };
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
    fxSlash(p.x, p.y - 16, ang, 90, col, "great", F.trail, F.c2);
  } else if (S.type === "nova" || S.type === "shield" || S.type === "heal") {
    const R = S.type === "heal" ? 120 : 130;
    fxRing(p.x, p.y - 12, R, col, 0.45, 10);
    fxBurst(p.x, p.y - 12, col, 24, 260, 3.5);
    fxParticles(p.x, p.y - 12, F, 14, 220);
    shake("skill");
    pulseElement(p.x, p.y, R, el);
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
  return true;
}
export function castBurst(): boolean {
  const p = GS.G.p,
    m = cur();
  if (!m || !m.alive || GS.G.over || GS.G.cine) return false;
  if (kitOf(m)) return castKitBurst();
  if (m.energy < m.c.burst.cost && !Server.P.gm.nocd) return false;
  feelState.burstT = FEEL.camera.burstHold;
  m.energy = 0;
  GS.G.pending.burst++;
  p.iframes = 1.4;
  p.act = { k: "burst", t0: GS.G.time };
  sfx("burst");
  GS.G.cine = { t: 0.95, max: 0.95, m, fire: () => doBurst(m) };
  return true;
}
export function doBurst(m: any) {
  const p = GS.G.p,
    B = m.c.burst,
    el = m.c.el,
    F = charFx(m.c.id),
    col = F.c,
    cast = { gave: false, amount: 0 };
  shake("burst");
  hitstop("burst");
  fxParticles(p.x, p.y - 12, F, 24, 320);
  if (B.type === "inferno") {
    fxRing(p.x, p.y - 12, 230, col, 0.6, 16);
    fxRing(p.x, p.y - 12, 150, F.c2, 0.5, 8);
    fxBurst(p.x, p.y - 12, col, 50, 420, 5);
    pulseElement(p.x, p.y, 230, el);
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
        pulseElement(x, y, 55, el);
        for (const e of GS.G.enemies) {
          if (!e.dead && dist(x, y, e.x, e.y) < 55 + e.r) hitEnemy(e, m, B.m, el, { noEnergy: true, noKb: true });
        }
      });
  } else if (B.type === "tide") {
    fxRing(p.x, p.y - 12, 240, col, 0.7, 18);
    fxRing(p.x, p.y - 12, 180, F.c2, 0.6, 10);
    fxBurst(p.x, p.y - 12, F.c2, 40, 360, 4);
    pulseElement(p.x, p.y, 240, el);
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
      shake("meteor");
      sfx("slam");
      fxRing(x, y, 170, col, 0.6, 16);
      fxBurst(x, y, col, 50, 420, 5);
      pulseElement(x, y, 170, el);
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
