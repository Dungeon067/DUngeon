import { GS } from "../core/state";
import { ctx } from "../core/canvas";
import { TAU, hash2 } from "../core/util";

// menu background: starry sky + party lineup
export const menuStars = Array.from({ length: 180 }, (_, i) => ({
  x: hash2(i, 1, 3),
  y: hash2(i, 2, 3),
  s: hash2(i, 3, 3) * 1.6 + 0.3,
  p: hash2(i, 4, 3) * 6,
}));
export function drawMenuBg(tm: number) {
  const g = ctx.createLinearGradient(0, 0, 0, GS.VH);
  g.addColorStop(0, "#0b0f28");
  g.addColorStop(0.6, "#1a1f4a");
  g.addColorStop(1, "#2b2450");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, GS.VW, GS.VH);
  for (const s of menuStars) {
    ctx.globalAlpha = 0.35 + 0.5 * Math.abs(Math.sin(tm * 0.8 + s.p));
    ctx.fillStyle = "#e8ecff";
    ctx.beginPath();
    ctx.arc(s.x * GS.VW, s.y * GS.VH * 0.8, s.s, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  // moon
  const mg = ctx.createRadialGradient(GS.VW * 0.82, GS.VH * 0.16, 0, GS.VW * 0.82, GS.VH * 0.16, 90);
  mg.addColorStop(0, "rgba(255,240,200,.95)");
  mg.addColorStop(0.35, "rgba(255,230,180,.55)");
  mg.addColorStop(1, "rgba(255,230,180,0)");
  ctx.fillStyle = mg;
  ctx.beginPath();
  ctx.arc(GS.VW * 0.82, GS.VH * 0.16, 90, 0, TAU);
  ctx.fill();
  // shooting star
  const st = (tm * 0.25) % 1;
  if (st < 0.25) {
    const k = st / 0.25;
    ctx.strokeStyle = `rgba(255,240,200,${1 - k})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(GS.VW * (0.2 + k * 0.4), GS.VH * (0.05 + k * 0.2));
    ctx.lineTo(GS.VW * (0.2 + k * 0.4) - 80, GS.VH * (0.05 + k * 0.2) - 30);
    ctx.stroke();
  }
  // hills
  ctx.fillStyle = "#141a3a";
  ctx.beginPath();
  ctx.moveTo(0, GS.VH);
  for (let x = 0; x <= GS.VW; x += 20)
    ctx.lineTo(x, GS.VH * 0.82 + Math.sin(x * 0.006) * 30 + Math.sin(x * 0.017) * 12);
  ctx.lineTo(GS.VW, GS.VH);
  ctx.fill();
  ctx.fillStyle = "#0e1230";
  ctx.beginPath();
  ctx.moveTo(0, GS.VH);
  for (let x = 0; x <= GS.VW; x += 20) ctx.lineTo(x, GS.VH * 0.9 + Math.sin(x * 0.01 + 2) * 18);
  ctx.lineTo(GS.VW, GS.VH);
  ctx.fill();
  // fireflies
  for (let i = 0; i < 24; i++) {
    const x = hash2(i, 7) * GS.VW + Math.sin(tm * 0.5 + i) * 40,
      y = GS.VH * 0.7 + hash2(i, 8) * GS.VH * 0.25 + Math.cos(tm * 0.7 + i) * 20;
    ctx.fillStyle = `rgba(255,230,140,${0.3 + 0.4 * Math.abs(Math.sin(tm * 2 + i))})`;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, TAU);
    ctx.fill();
  }
}
