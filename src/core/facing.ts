/**
 * Hướng nhìn 8 hướng cho sprite (S25). Chỉ là trạng thái vẽ, không ảnh hưởng va chạm hay sát thương.
 * Chỉ số 0..7 theo chiều kim đồng hồ từ đông: e, se, s, sw, w, nw, n, ne (trục y hướng xuống là nam).
 */
export const DIR8 = ["e", "se", "s", "sw", "w", "nw", "n", "ne"] as const;
export type Dir8 = (typeof DIR8)[number];
const STEP = Math.PI / 4;
/** Biên trễ (rad): phải lệch quá nửa ô cộng biên này mới đổi hướng, để không giật qua lại. */
export const HYST = 0.14;

export function dir8(ang: number, prev?: number): number {
  const i = (((Math.round(ang / STEP) % 8) + 8) % 8) | 0;
  if (prev === undefined || prev === i) return i;
  let d = ang - prev * STEP;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  return Math.abs(d) < STEP / 2 + HYST ? prev : i;
}

/** Xoay véc-tơ điều khiển theo góc camera (camera 3D quay quanh trục đứng). */
export function camRelative(x: number, y: number, yaw: number): [number, number] {
  if (!yaw) return [x, y];
  const c = Math.cos(yaw),
    s = Math.sin(yaw);
  return [x * c - y * s, x * s + y * c];
}
