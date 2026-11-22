import { GS } from "../core/state";
import { GAP, MH, MW, SOLID, TL, TS } from "../world/map";

/* =========================================================
   VA CHẠM. Mỗi ô có độ cao (bậc, lớp W.h). Vật đứng ở độ cao
   foot chỉ đi vào ô cao không quá foot + STEP. Ô nước chặn khi
   đứng dưới đất nhưng bay qua được khi đang nhảy.
   ========================================================= */
export const STEP = 0.2;

export function tileAt(x: number, y: number, W: any) {
  const tx = Math.floor(x / TS),
    ty = Math.floor(y / TS);
  if (tx < 0 || ty < 0 || tx >= MW || ty >= MH) return -1;
  return ty * MW + tx;
}
/** Độ cao mặt đất (bậc) tại điểm; trong đấu trường không có bản đồ thì luôn 0. */
export function groundAt(x: number, y: number, W: any = GS.G?.map): number {
  if (!W || !W.h) return 0;
  const i = tileAt(x, y, W);
  return i < 0 ? 0 : W.h[i];
}
/** Có đứng được ở điểm này không (không phải nước, không phải cây). */
export function standable(x: number, y: number, W: any = GS.G?.map): boolean {
  if (!W) return true;
  const i = tileAt(x, y, W);
  return i >= 0 && !GAP[W.m[i]] && W.m[i] !== TL.TREE;
}
function blocksAt(x: number, y: number, W: any, foot: number, air: boolean) {
  const i = tileAt(x, y, W);
  if (i < 0) return true;
  const t = W.m[i];
  if (!W.h) return SOLID[t];
  if (t === TL.TREE) return true;
  if (GAP[t]) return !air;
  return W.h[i] > foot + STEP;
}
export function solidTile(x: number, y: number, W: any) {
  return blocksAt(x, y, W, 0, false);
}
export function blockedAt(x: number, y: number, r: number, W: any, foot = 0, air = false) {
  return (
    blocksAt(x - r, y, W, foot, air) ||
    blocksAt(x + r, y, W, foot, air) ||
    blocksAt(x, y - r * 0.6, W, foot, air) ||
    blocksAt(x, y + r * 0.4, W, foot, air) ||
    blocksAt(x - r * 0.7, y - r * 0.4, W, foot, air) ||
    blocksAt(x + r * 0.7, y - r * 0.4, W, foot, air)
  );
}
export function blocked(x: number, y: number, r: number, foot = 0, air = false) {
  if (GS.G.map) return blockedAt(x, y, r, GS.G.map, foot, air);
  const B = GS.G.bounds;
  return x - r < B.x + 20 || x + r > B.x + B.w - 20 || y - r < B.y + 60 || y > B.y + B.h - 20;
}
/**
 * Di chuyển có va chạm. Vật có trường zh (độ cao chân, bậc) như người chơi thì dùng
 * zh và trạng thái trên không; vật khác (quái) đứng ở mặt đất dưới chân, nên không
 * leo được lên bệ và không tự rơi khỏi bệ.
 */
export function moveC(o: any, dx: number, dy: number, r: number) {
  const has = typeof o.zh === "number";
  const foot = has ? o.zh : groundAt(o.x, o.y);
  const air = has ? !!o.air : false;
  const down = has ? Infinity : foot;
  const ok = (x: number, y: number) => !blocked(x, y, r, foot, air) && (has || groundAt(x, y) >= down - STEP);
  if (ok(o.x + dx, o.y)) o.x += dx;
  if (ok(o.x, o.y + dy)) o.y += dy;
}
