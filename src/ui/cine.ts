import { GS } from "../core/state";
import { portrait } from "../art/chibi";
import { ctx } from "../core/canvas";
import { rgba, shade } from "../core/util";
import { EL } from "../data/content";

export function drawCine(tm: number) {
  const c = GS.G.cine,
    m = c.m,
    k = 1 - c.t / c.max,
    el = EL[m.c.el];
  ctx.fillStyle = `rgba(0,0,0,${0.55 * Math.min(1, k * 4)})`;
  ctx.fillRect(0, 0, GS.VW, GS.VH);
  const bandH = Math.min(GS.VH * 0.5, 340),
    y0 = GS.VH / 2 - bandH / 2;
  const slide = Math.min(1, k * 3.5);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, y0 + 30);
  ctx.lineTo(GS.VW, y0);
  ctx.lineTo(GS.VW, y0 + bandH - 30);
  ctx.lineTo(0, y0 + bandH);
  ctx.closePath();
  ctx.clip();
  const g = ctx.createLinearGradient(0, 0, GS.VW, 0);
  g.addColorStop(0, shade(el.c, -0.6));
  g.addColorStop(0.5, el.c);
  g.addColorStop(1, shade(el.c, -0.6));
  ctx.fillStyle = g;
  ctx.fillRect(0, y0, GS.VW, bandH);
  ctx.strokeStyle = rgba(el.c2, 0.35);
  ctx.lineWidth = 3;
  for (let i = 0; i < 14; i++) {
    const x = ((i * 140 + tm * 900) % (GS.VW + 300)) - 150;
    ctx.beginPath();
    ctx.moveTo(x, y0);
    ctx.lineTo(x - 80, y0 + bandH);
    ctx.stroke();
  }
  const ph = bandH * 1.25,
    pw = ph * 0.75;
  const pc = portrait(m.id, 300, 400, "splash");
  ctx.drawImage(pc, GS.VW * 0.62 - pw / 2 + (1 - slide) * GS.VW * 0.5, GS.VH / 2 - ph * 0.52, pw, ph);
  ctx.restore();
  ctx.globalAlpha = slide;
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 12;
  ctx.font = `700 ${Math.min(54, GS.VW / 11)}px 'Cormorant Garamond',serif`;
  ctx.fillText(m.c.burst.name, Math.max(20, GS.VW * 0.08) - (1 - slide) * 200, GS.VH / 2 + 10);
  ctx.font = `600 ${Math.min(18, GS.VW / 26)}px 'Be Vietnam Pro',sans-serif`;
  ctx.fillStyle = el.c2;
  ctx.fillText(`${m.c.name} · Kỹ năng nộ`, Math.max(20, GS.VW * 0.08) - (1 - slide) * 200, GS.VH / 2 - 38);
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  if (c.t < 0.12) {
    ctx.fillStyle = `rgba(255,255,255,${(1 - c.t / 0.12) * 0.7})`;
    ctx.fillRect(0, 0, GS.VW, GS.VH);
  }
}
