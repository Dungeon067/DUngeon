import { GS } from "../core/state";
import { kitPlunge } from "./kits/run";
import { kitOf } from "../data/kits";
import { sfx } from "../core/audio";
import { dist } from "../core/util";
import { EL } from "../data/content";
import { fxBurst, fxRing, fxText } from "../entities/fx";
import { cur } from "../entities/party";
import { groundAt, moveC, standable, STEP } from "../world/collision";
import { FEEL, hitstop, shake } from "./feel";
import { hitEnemy, hurtPlayer } from "./damage";
import { buzz } from "../core/haptics";
import { MOVE, fsmOf } from "./movement";

/* =========================================================
   NHẢY VÀ ĐỘ CAO (S09). Độ cao đo bằng "bậc" (một bệ đá).
   p.zh: độ cao chân tuyệt đối; p.air: đang trên không; p.vz: vận tốc đứng (bậc/giây).
   Số liệu ở content/combat-feel.yaml mục jump.
   ========================================================= */

export const WALK = 155;

/** Vận tốc bật và gia tốc rơi để nhảy tại chỗ đạt `height` bậc trong `dur` giây. */
export function jumpPhysics(dur = FEEL.jump.dur, height = FEEL.jump.height) {
  return { v0: (4 * height) / dur, g: (8 * height) / (dur * dur) };
}
/** Hệ số sát thương đòn lao xuống theo số bậc rơi. */
export function plungeMult(levels: number) {
  const P = FEEL.jump.plunge;
  return P.base + P.perLevel * Math.max(0, levels);
}
/** Máu mất khi rơi `levels` bậc (không tính lao xuống); không bao giờ làm gục. */
export function fallDamage(levels: number, maxHp: number, hp = Infinity) {
  const F = FEEL.jump.fall;
  const over = Math.floor(levels + 0.05) - F.safeLevels;
  if (over <= 0) return 0;
  return Math.max(0, Math.min(Math.round(maxHp * F.dmgPerLevel * over), hp - 1));
}
/** Độ cao trên mặt đất tại chỗ đứng. */
export const heightAbove = (p: any) => Math.max(0, (p.zh ?? 0) - groundAt(p.x, p.y));
/** Đang đủ cao để né đòn sát đất (sóng xung kích, đập đất). */
export const dodgesGround = (p: any) => !!p.air && heightAbove(p) > FEEL.jump.dodgeHeight;

export function tryJump(): boolean {
  const G = GS.G;
  if (!G) return false;
  const p = G.p,
    m = cur();
  if (!m || !m.alive || G.over || G.cine || p.air) return false;
  const J = FEEL.jump;
  if (p.stamina < J.stamina) return false;
  p.stamina -= J.stamina;
  const v0 = jumpPhysics().v0 * Math.sqrt(kitOf(m)?.khamPha?.nhay ?? 1);
  const long = p.dashT > 0;
  let vx = 0,
    vy = 0;
  if (long) {
    const L = Math.hypot(p.dvx, p.dvy) || 1;
    const spd = WALK * J.longJump;
    vx = (p.dvx / L) * spd;
    vy = (p.dvy / L) * spd;
    p.dashT = 0;
    p.dashHit = null;
  } else if (p.moving) {
    vx = p.dirX * WALK;
    vy = p.dirY * WALK;
  }
  Object.assign(p, { air: true, vz: v0, jvx: vx, jvy: vy, peak: p.zh, airDash: false, plunge: false, long });
  fxBurst(p.x, p.y, "#ffffff", 6, 60, 2);
  sfx("dash");
  return true;
}

/** Lướt trên không: một lần mỗi lần nhảy. Trả về false nếu không được lướt. */
export function canAirDash(p: any) {
  return p.air && !p.airDash && !p.plunge && p.stamina >= FEEL.jump.airDashStamina;
}

/** Bắt đầu đòn lao xuống nếu đang trên cao hoặc đang rơi. */
export function tryPlunge(): boolean {
  const p = GS.G.p;
  if (!p.air || p.plunge) return false;
  if (p.vz > 0 && heightAbove(p) < 1) return false;
  p.plunge = true;
  p.plungeFrom = p.peak;
  p.vz = -FEEL.jump.plunge.speed;
  p.jvx *= 0.2;
  p.jvy *= 0.2;
  p.dashT = 0;
  return true;
}

/** Xử lý người chơi đang trên không: điều hướng nhẹ, trọng lực, tiếp đất. */
export function updateAir(p: any, dt: number, mx: number, my: number) {
  const J = FEEL.jump;
  const { g } = jumpPhysics();
  if (p.dashT > 0) {
    // lướt trên không: giữ độ cao trong lúc lướt
    p.dashT -= dt;
    moveC(p, p.dvx * dt, p.dvy * dt, 9);
    p.vz = 0;
  } else {
    if (!p.plunge) {
      const k = Math.min(1, J.airControl * 4 * dt);
      p.jvx += (mx * WALK - p.jvx) * k * (p.long && !mx ? 0 : 1);
      p.jvy += (my * WALK - p.jvy) * k * (p.long && !my ? 0 : 1);
    }
    moveC(p, p.jvx * dt, p.jvy * dt, 9);
    if (p.plunge) p.vz = -J.plunge.speed;
    // Rơi tối đa 10 m/s (đổi sang bậc/giây).
    else p.vz = Math.max(p.vz - g * dt, -MOVE.roi.gioiHan / MOVE.roi.bacM);
  }
  if (Math.abs(mx) > 0.2) p.fx = mx > 0 ? 1 : -1;
  p.zh += p.vz * dt;
  p.peak = Math.max(p.peak, p.zh);
  const ground = groundAt(p.x, p.y);
  if (p.zh <= ground) land(p, ground);
}

/** Khi đứng dưới đất: bước khỏi mép bệ thì bắt đầu rơi. */
export function updateGround(p: any) {
  const ground = groundAt(p.x, p.y);
  if (p.zh > ground + STEP) {
    Object.assign(p, { air: true, vz: 0, jvx: p.dirX * (p.moving ? WALK : 0), jvy: 0, peak: p.zh });
    p.jvy = p.dirY * (p.moving ? WALK : 0);
    p.airDash = false;
    p.plunge = false;
    p.long = false;
  } else {
    p.zh = ground;
    if (standable(p.x, p.y)) p.safe = { x: p.x, y: p.y, zh: ground };
  }
}

function land(p: any, ground: number) {
  const levels = p.peak - ground;
  // Tiếp đất nhẹ / lăn / nặng theo độ cao rơi (mét).
  p.mst = fsmOf(p).land(Math.max(0, levels) * MOVE.roi.bacM, !!p.moving);
  const plunged = p.plunge;
  p.air = false;
  p.vz = 0;
  p.zh = ground;
  p.plunge = false;
  p.airDash = false;
  p.long = false;
  if (!standable(p.x, p.y)) {
    // rơi xuống nước: đưa về chỗ đứng cuối cùng
    fxBurst(p.x, p.y, "#9fd4ff", 10, 120, 2);
    if (p.safe) {
      p.x = p.safe.x;
      p.y = p.safe.y;
      p.zh = p.safe.zh;
    }
    return;
  }
  if (plunged) {
    const m = cur(),
      P = FEEL.jump.plunge;
    const mult = plungeMult((p.plungeFrom ?? p.peak) - ground);
    let hit = false;
    for (const e of GS.G.enemies) {
      if (e.dead || dist(p.x, p.y, e.x, e.y) > P.radius + e.r) continue;
      hitEnemy(e, m, mult, m.c.el, { kb: 160 });
      hit = true;
    }
    kitPlunge(m);
    fxRing(p.x, p.y, P.radius, EL[m.c.el].c, 0.35, 6);
    fxBurst(p.x, p.y, EL[m.c.el].c, 14, 170);
    shake("heavy", 1 + levels * 0.3);
    if (hit) hitstop("heavy");
    p.land = FEEL.jump.fall.landAnim;
    return;
  }
  if (levels >= 0.8) {
    p.land = FEEL.jump.fall.landAnim;
    fxBurst(p.x, p.y, "#d8cfc0", 6, 70, 2);
  }
  const m = cur();
  if (!m || GS.G.over) return;
  const dmg = fallDamage(levels, m.maxHp, m.hp);
  if (dmg > 0) {
    m.hp -= dmg;
    p.hurt = 0.25;
    fxText(p.x, p.y - 48, "-" + dmg, "#ff9a7a", 15);
    shake("hurt", 0.6);
    buzz("hurt");
  }
}

/* ---------- sóng xung kích sát đất: nhảy để né ---------- */
export function spawnWave(x: number, y: number, r0: number, max: number, dmg: number, el: string, spd = 260) {
  (GS.G.waves ??= []).push({ x, y, r: r0, max, spd, dmg, el, hit: false });
}
export function updateWaves(dt: number) {
  const W = GS.G.waves;
  if (!W) return;
  const p = GS.G.p;
  for (let i = W.length - 1; i >= 0; i--) {
    const w = W[i];
    w.r += w.spd * dt;
    const d = dist(p.x, p.y, w.x, w.y);
    if (!w.hit && Math.abs(d - w.r) < 16) {
      w.hit = true;
      if (dodgesGround(p)) fxText(p.x, p.y - 52, "Né", "#e8f0ff", 13);
      else hurtPlayer(w.dmg, EL[w.el]?.c ?? "#ff7070");
    }
    if (w.r >= w.max) W.splice(i, 1);
  }
}
