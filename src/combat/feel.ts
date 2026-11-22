import { GS } from "../core/state";
import { FEEL_DEFAULT } from "../data/content";
import type { CharFx, Feel } from "../data/schema";

/** Thông số đang dùng. Bảng chỉnh nhanh sửa trực tiếp đối tượng này. */
export const FEEL: Feel = JSON.parse(JSON.stringify(FEEL_DEFAULT));

const SETTINGS_KEY = "tinhtu.feel.v1";
/** Cài đặt người chơi, lưu trong localStorage. */
export const feelSettings = { shake: true };
try {
  const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  if (typeof s.shake === "boolean") feelSettings.shake = s.shake;
} catch {
  /* bỏ qua dữ liệu hỏng */
}
export function setShakeEnabled(on: boolean) {
  feelSettings.shake = on;
  if (!on && GS.G) GS.G.shake = 0;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(feelSettings));
  } catch {
    /* trình duyệt chặn lưu trữ */
  }
}

/** Trạng thái thời gian và camera của trận hiện tại. */
export const feelState = { stop: 0, slow: 0, slowDur: 0, slowScale: 1, burstT: 0, leadX: 0, leadY: 0 };
/** Lệnh đang chờ trong bộ đệm: số giây còn hiệu lực. */
export const inputBuffer = { atk: 0, skill: 0, burst: 0, dash: 0 };
export function resetFeel() {
  for (const k in inputBuffer) inputBuffer[k as keyof typeof inputBuffer] = 0;
  Object.assign(feelState, { stop: 0, slow: 0, slowDur: 0, slowScale: 1, burstT: 0, leadX: 0, leadY: 0 });
  GS.camZoom = 1;
  GS.ZOOM = GS.BASE_ZOOM;
}

export type HitstopKind = Exclude<keyof Feel["hitstop"], "max">;
/** Dừng hình ngắn. Nhiều đòn cùng lúc không cộng dồn, chỉ lấy lần dài nhất. */
export function hitstop(kind: HitstopKind) {
  const t = Math.min(FEEL.hitstop[kind], FEEL.hitstop.max);
  feelState.stop = Math.max(feelState.stop, t);
}
export function slowmo(scale: number, dur: number) {
  feelState.slowScale = scale;
  feelState.slow = feelState.slowDur = dur;
}
/** Rung màn hình theo loại đòn, nhân hệ số chung; tắt hẳn khi người chơi tắt rung. */
export function shake(kind: string, mul = 1) {
  if (!feelSettings.shake || !GS.G) return;
  const v = (FEEL.shake[kind] ?? 0) * (FEEL.shake.scale ?? 1) * mul;
  GS.G.shake = Math.max(GS.G.shake, v);
}

/** Nhận dt thật, trả dt của game sau khi áp dừng hình và chậm hình. Rung vẫn giảm theo thời gian thật. */
export function gameDt(dt: number): number {
  if (GS.G) GS.G.shake = Math.max(0, GS.G.shake - dt * (FEEL.shake.decay ?? 30));
  if (feelState.stop > 0) {
    feelState.stop -= dt;
    return 0;
  }
  if (feelState.slow > 0) {
    feelState.slow -= dt;
    // 0,3 giây cuối trả dần về tốc độ thường.
    const k = Math.min(1, Math.max(0, feelState.slow) / Math.min(0.3, feelState.slowDur));
    return dt * (1 - (1 - feelState.slowScale) * k);
  }
  return dt;
}

const NEUTRAL_FX: CharFx = { c: "#ffffff", c2: "#ffffff", particle: "spark", trail: "arc" };
export function charFx(id: string): CharFx {
  return FEEL.characters[id] ?? NEUTRAL_FX;
}
export function enemyFeel(e: any) {
  return FEEL.enemies[e.isBoss ? "hacgiao" : e.type] ?? { mass: 1, poise: 60 };
}
