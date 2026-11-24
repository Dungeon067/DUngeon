import { effectAt } from "../world/regions";
import { dir8 } from "../core/facing";
import { GS } from "../core/state";
import { onKill } from "../ui/menu/progress";
import { buzz } from "../core/haptics";
import { settings } from "../core/settings";
import { screenToWorld } from "../core/input";
import { applyElement } from "../combat/elements";
import { sfx } from "../core/audio";
import { dist, fmt, rand } from "../core/util";
import { EL } from "../data/content";
import { bossDefeated } from "../entities/boss";
import { fxBurst, fxParticles, fxRing, fxText } from "../entities/fx";
import { cur } from "../entities/party";
import { FEEL, charFx, enemyFeel, feelState, hitstop, shake } from "../combat/feel";
import { partyWipe, showBanner } from "../modes/session";
import { Server } from "../server/server";
import { ECON } from "../data/economy";
import { stackDelta, weaponOf } from "../economy/core";
import { buildHudParty } from "../ui/hud";
import { hasStatus, hnOf, statSum, takenMult, ttOf, emAmp } from "./status";
import { hooksOf } from "./kits/hooks";
import { counter } from "./kits/blocks";

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
  if (settings.mouseAim && GS.mouse?.inside && !GS.isTouch) {
    const w = screenToWorld(GS.mouse.sx, GS.mouse.sy);
    p.ang = Math.atan2(w.y - (p.y - 14), w.x - p.x);
  } else if (e) {
    p.ang = Math.atan2(e.y - (e.isBoss ? 20 : 10) - (p.y - 14), e.x - p.x);
  } else p.ang = Math.atan2(p.dirY, p.dirX);
  if (Math.abs(Math.cos(p.ang)) > 0.2) p.fx = Math.cos(p.ang) > 0 ? 1 : -1;
  p.back = Math.sin(p.ang) < -0.75;
  p.face8 = dir8(p.ang);
}
export function dealRaw(e: any, dmg: number, col: string) {
  if (e.dead) return;
  if (Server.P.gm.one) dmg = e.hp + 1;
  dmg *= takenMult(e, null) * (e.stun > 0 ? FEEL.poise.stunVuln : 1);
  e.hp -= dmg;
  e.flash = Math.max(e.flash, FEEL.hit.flash * 0.7);
  fxText(e.x, e.y - (e.isBoss ? 70 : 34), fmt(dmg), col, 14);
  if (e.hp <= 0) killEnemy(e);
}
export function hitEnemy(e: any, m: any, mult: number, el: string | null, o: any = {}) {
  if (e.dead) return 0;
  // Buff của người đánh (S30): tấn công cộng thẳng, chí mạng, tăng sát thương theo nguyên tố.
  const crit = Math.random() < Math.min(1, m.st.crit + statSum(m, "tiLeChiMang", el));
  const cdmg = m.st.cdmg + statSum(m, "satThuongChiMang", el);
  const sd = m.stack ? stackDelta(weaponOf(m.stack.id, ECON), m.stack.tl, m.stack.tang, ECON) : 0;
  const bonus =
    (m.st.dmg ?? 0) +
    sd +
    statSum(m, "satThuong") +
    (el ? statSum(m, "satThuongNguyenTo", el) : 0) +
    (hooksOf(m).dmgBonus?.(e, m, o, el) ?? 0);
  const atk = m.st.atk + statSum(m, "tanCong");
  let dmg = atk * mult * (crit ? 1 + cdmg : 1) * (1 + bonus) * rand(0.95, 1.05);
  const r = applyElement(e, el, m);
  // Phản ứng khuếch đại được tinh thông nhân thêm; debuff của quái (kháng, phòng thủ, đánh dấu).
  const amp = r.mult > 1 ? r.mult * (1 + emAmp(ttOf(m))) : r.mult;
  dmg *= amp * takenMult(e, el) * (e.stun > 0 ? FEEL.poise.stunVuln : 1);
  // Vùng tăng hoặc giảm nhẹ sát thương theo nguyên tố (S12), tính theo chỗ người chơi đứng.
  if (el && GS.G?.map) dmg *= effectAt(GS.G.map, GS.G.p.x, GS.G.p.y, `${el}Dmg`);
  if (Server.P.gm.one) dmg = Math.max(dmg, e.hp + 1);
  e.hp -= dmg;
  e.flash = FEEL.hit.flash;
  e.hitT = FEEL.hit.squash;
  damagePoise(e, (FEEL.poise.weapon[m.c.w as keyof typeof FEEL.poise.weapon] ?? 8) * mult);
  // Va chạm (S30): tia lửa theo nguyên tố ở lớp 3D, khựng hình và rung nhẹ theo lực đòn.
  GS.G.fx.push({ k: "hit", x: e.x, y: e.y, el, pw: mult, crit, w: m.c.w, normal: !!o.normal, life: 0.28, max: 0.28 });
  if (mult >= 0.7) hitstop("heavy");
  else if (settings.impactFx) feelState.stop = Math.max(feelState.stop, 2 / 60);
  shake("light", Math.min(2, mult));
  if (crit) hitstop("crit");
  if (r.mult > 1) {
    hitstop("react");
    shake("react", 0.6);
  }
  const col = el ? EL[el].c2 : "#ffffff";
  fxText(
    e.x,
    e.y - (e.isBoss ? 70 : 34),
    fmt(dmg) + (crit ? "!" : ""),
    r.mult > 1 ? "#ffd27a" : col,
    r.mult > 1 ? 20 : 16,
    crit,
  );
  const F = charFx(m.c.id);
  fxBurst(e.x, e.y - 14, "#ffffff", 3, 120, 2);
  fxParticles(e.x, e.y - 14, F, el ? 6 : 3);
  const mass = enemyFeel(e).mass;
  if (!o.noKb && mass > 0) {
    // Giật lùi chia cho cân nặng: slime văng xa, golem chỉ nhích.
    const an = o.ang !== undefined ? o.ang : Math.atan2(e.y - GS.G.p.y, e.x - GS.G.p.x);
    const k = (o.kb || 80) / mass;
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
      m.energy = Math.min(m.c.burst.cost, m.energy + 1.2 * hnOf(m));
    }
  }
  sfx("hit_" + m.c.w);
  if (crit || o.heavy) sfx("crit");
  if (o.normal) hooksOf(m).onNormalHit?.(m, e);
  if (e.hp <= 0) killEnemy(e);
  if (e.state === "idle" && !e.isBoss) e.state = "chase";
  return dmg;
}
/** Trừ thanh chịu đòn; vỡ thanh thì quái choáng, ngắt đòn đang chuẩn bị. */
export function damagePoise(e: any, n: number) {
  const ef = enemyFeel(e);
  if (e.maxPoise === undefined) e.poise = e.maxPoise = ef.poise;
  e.poiseT = 0;
  if (e.stun > 0 || e.dead) return;
  e.poise -= n;
  if (e.poise > 0) return;
  e.poise = 0;
  e.stun = ef.stun ?? FEEL.poise.stun;
  e.tele = null;
  if (e.isBoss) {
    e.state = "idle";
    e.t = Math.max(e.t, 0.6);
  }
  fxText(e.x, e.y - (e.isBoss ? 96 : 56), "Choáng", "#ffe27a", 16, true);
  fxRing(e.x, e.y - 12, e.isBoss ? 120 : 50, "#ffe27a", 0.4, 6);
  hitstop("break");
  shake("break");
  sfx("break");
}
export function gainEnergy(n: number, x: number, y: number, m: any) {
  for (const pm of GS.G.party) {
    if (!pm.alive) continue;
    const add = (pm === cur() ? n : n * 0.35) * hnOf(pm);
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
  sfx("kill");
  onKill(e);
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
  if (p.guard) return counter(p);
  dmg *= 1 - statSum(m, "giamSatThuongNhan");
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
  if (m.stack) {
    m.stack.tang = Math.max(0, m.stack.tang - 1);
    m.stack.t = 0;
  }
  // Khiên kháng gián đoạn (Áo Buồm): không bị ngắt chiêu, tụ lực vẫn giữ.
  if (!hasStatus(m, "aoBuom")) {
    p.hurt = 0.25;
    p.charge = null;
  }
  p.iframes = 0.45;
  shake("hurt");
  buzz("hurt");
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

/** Bị động tích tầng: cứ `giay` giây không bị đánh thì thêm 1 tầng, tối đa `toiDa`. */
export function tickStack(m: any, dt: number) {
  const c = weaponOf(m.stack.id, ECON).biDong.coChe;
  if (!c) return;
  if (m.stack.tang >= c.toiDa) {
    m.stack.tang = c.toiDa;
    return;
  }
  m.stack.t += dt;
  if (m.stack.t >= c.giay) {
    m.stack.t = 0;
    m.stack.tang++;
  }
}
