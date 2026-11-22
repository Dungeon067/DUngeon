import { GS } from "./state";
import { TAU } from "./util";
import { EL } from "../data/content";
import { FEEL } from "../combat/feel";
import { groundAt } from "../world/collision";

/* Phần vẽ cho trục độ cao (S09), tách khỏi render.ts để S15 sửa sprite không đụng. */

/** Độ nhô của nhân vật trên màn (px thế giới) và tỉ lệ bóng (1 khi đứng đất, nhỏ dần khi lên cao). */
export function lift(o: any) {
  const L = FEEL.jump.levelPx;
  const z = (o.zh ?? 0) * L,
    g = groundAt(o.x, o.y) * L;
  const air = Math.max(0, z - g);
  return { z, g, air, shadow: Math.max(0.45, 1 - air / (L * 3)) };
}
/** Bóng đổ dưới chân ở mặt đất (hoặc bệ đá) ngay dưới nhân vật. */
export function drawShadow(ctx: CanvasRenderingContext2D, o: any, rx = 16) {
  const l = lift(o);
  ctx.fillStyle = `rgba(0,0,0,${0.32 * l.shadow})`;
  ctx.beginPath();
  ctx.ellipse(o.x, o.y - l.g, rx * l.shadow, rx * 0.36 * l.shadow, 0, 0, TAU);
  ctx.fill();
}
/** Bắt đầu vẽ nhân vật ở độ cao z, có ép dẹt nhẹ khi vừa tiếp đất. Gọi ctx.restore() sau khi vẽ. */
export function beginLifted(ctx: CanvasRenderingContext2D, o: any) {
  const l = lift(o);
  ctx.save();
  ctx.translate(0, -l.z);
  if (o.land > 0) {
    const k = o.land / FEEL.jump.fall.landAnim;
    ctx.translate(o.x, o.y);
    ctx.scale(1 + 0.12 * k, 1 - 0.14 * k);
    ctx.translate(-o.x, -o.y);
  }
}
/** Sóng xung kích sát đất: vòng lan ra, nhảy qua để né. */
export function drawWaves(ctx: CanvasRenderingContext2D) {
  for (const w of GS.G.waves ?? []) {
    const c = EL[w.el]?.c ?? "#ffb070";
    const a = Math.max(0, 1 - w.r / w.max);
    ctx.strokeStyle = c;
    ctx.globalAlpha = 0.35 + a * 0.5;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.ellipse(w.x, w.y, w.r, w.r * 0.6, 0, 0, TAU);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(w.x, w.y, w.r - 5, (w.r - 5) * 0.6, 0, 0, TAU);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
