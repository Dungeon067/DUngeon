import { GS } from "../../core/state";
import { sfx } from "../../core/audio";
import { KITS, kitOf } from "../../data/kits";
import { cur } from "../../entities/party";
import { Server } from "../../server/server";
import { FEEL, feelState } from "../feel";
import { aim } from "../damage";
import { gust } from "../elements";
import { tickStatuses } from "../status";
import { runBlocks } from "./blocks";
import { HOOKS, hooksOf } from "./hooks";
import "./suongmai";
import "./mailinh";
import "./bachvu";
import "./havy";
import "./loidinh";

/* Điều khiển bộ chiêu riêng (S30): kỹ năng bấm / giữ, trọng kích tụ lực, nộ có cảnh camera bỏ qua được. */

/** Giữ nút ≥ HOLD giây thì thành biến thể giữ. */
export const HOLD = 0.35;
const ready = (m: any) => m && m.alive && !GS.G.over && !GS.G.cine;
const ctx = (m: any) => {
  const p = GS.G.p;
  return { m, x: p.x, y: p.y, ang: p.ang, cast: { gave: false, amount: 12 } };
};

export function castKitSkill(v: "bam" | "giu"): boolean {
  const m = cur(),
    K = kitOf(m);
  if (!K || !ready(m)) return false;
  if (m.skillCd > 0 && !Server.P.gm.nocd) return v === "bam" && !!hooksOf(m).recast?.(m);
  const S = K.kyNang[v];
  m.skillCd = m.skillCdMax = v === "giu" ? (K.kyNang.cdGiu ?? K.kyNang.cd) : K.kyNang.cd;
  aim();
  GS.G.p.act = { k: "skill", clip: S.clip, t0: GS.G.time };
  sfx("skill");
  // Chiêu hệ Phong thổi tóc và vải quanh đó (hệ gió runtime S27).
  if (m.c.el === "wind") gust("skill", GS.G.p.x, GS.G.p.y);
  runBlocks(S.khoi, ctx(m));
  return true;
}
/** Nút kỹ năng: nhân vật có bộ chiêu riêng thì phân biệt bấm và giữ; còn lại bấm như cũ. */
export function skillDown(fallback: () => void) {
  if (!kitOf(cur())) return fallback();
  GS.skHold = { t: 0 };
}
export function skillUp() {
  if (!GS.skHold) return;
  GS.skHold = null;
  castKitSkill("bam");
}

export function castKitBurst(): boolean {
  const m = cur(),
    K = kitOf(m),
    p = GS.G.p;
  if (!K || !ready(m)) return false;
  if (m.energy < K.no.cost && !Server.P.gm.nocd) return false;
  feelState.burstT = FEEL.camera.burstHold;
  m.energy = 0;
  GS.G.pending.burst++;
  aim();
  p.iframes = K.no.cine + 0.4;
  p.act = { k: "burst", clip: K.no.clip, t0: GS.G.time };
  sfx("burst");
  if (m.c.el === "wind") gust("burst", p.x, p.y);
  const c = ctx(m);
  c.cast = { gave: true, amount: 0 };
  GS.G.cine = { t: K.no.cine, max: K.no.cine, m, kit: true, fire: () => runBlocks(K.no.khoi, c) };
  return true;
}
/** Bấm bất kỳ nút chiến đấu trong cảnh nộ thì bỏ qua cảnh (chiêu vẫn ra). */
export function skipCine(): boolean {
  const C = GS.G?.cine;
  if (!C || C.max - C.t < 0.2) return false;
  C.t = 0;
  return true;
}

/** Trọng kích: giữ nút đánh. Cận chiến ra đòn khi đủ giây; cung ngắm, thả để bắn theo mức đã tụ. */
function updateHeavy(m: any, held: boolean, dt: number) {
  const p = GS.G.p,
    K = kitOf(m)!,
    T = K.trongKich;
  if (!held || p.air || p.dashT > 0 || !ready(m)) {
    if (p.charge && p.charge.lv >= 0 && !p.charge.done && held === false) fireHeavy(m, p.charge.lv);
    p.charge = null;
    return;
  }
  p.charge ??= { t: 0, lv: -1, done: false };
  if (p.charge.done) return;
  p.charge.t += dt;
  let lv = -1;
  T.muc.forEach((u, i) => p.charge.t >= u.giay && (lv = i));
  if (lv > p.charge.lv && p.stamina >= T.theLuc) p.charge.lv = lv;
  p.aiming = T.muc.length > 1 ? p.charge.lv + 1 : 0;
  if (T.muc.length === 1 && p.charge.lv === 0) fireHeavy(m, 0);
}
function fireHeavy(m: any, lv: number) {
  const p = GS.G.p,
    T = kitOf(m)!.trongKich,
    u = T.muc[lv]!;
  if (p.charge) p.charge.done = true;
  p.aiming = 0;
  p.stamina -= T.theLuc;
  aim();
  p.atkCd = 0.45;
  p.combo = 0;
  p.act = { k: "atk3", clip: u.clip, t0: GS.G.time };
  sfx(m.c.w === "bow" ? "shoot" : "swing_great");
  runBlocks(u.khoi, ctx(m));
}
export const heavyActive = () => !!GS.G?.p.charge && GS.G.p.charge.t >= HOLD * 0.5;

/** Đòn lao xuống riêng (nếu có), gọi khi chạm đất. */
export function kitPlunge(m: any) {
  const K = kitOf(m);
  if (K?.khong) runBlocks(K.khong.khoi, ctx(m));
}

export function updateKits(dt: number, atkHeld: boolean) {
  const m = cur(),
    p = GS.G.p;
  for (const pm of GS.G.party) {
    tickStatuses(pm, dt);
    if (KITS[pm.c.id]) HOOKS[pm.c.id]?.tick?.(pm, dt);
  }
  if (p.guard) {
    p.guard.t -= dt;
    if (p.guard.t <= 0) p.guard = null;
  }
  if (GS.skHold) {
    GS.skHold.t += dt;
    if (GS.skHold.t >= HOLD) {
      GS.skHold = null;
      castKitSkill("giu");
    }
  }
  if (kitOf(m)) updateHeavy(m, atkHeld, dt);
  else p.charge = null;
}
/** Hệ số tốc đánh cho bộ chiêu (Giông Đi Trước). */
export const kitAtkSpeed = (m: any) => hooksOf(m).atkSpeed?.(m) ?? 1;
