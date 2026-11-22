import { GS } from "../core/state";
import { ctx } from "../core/canvas";
import { TAU, rgba, rr } from "../core/util";
import { EL, ENEMY } from "../data/content";

export function drawTurret(t, tm) {
  const col = EL[t.el].c,
    c2 = EL[t.el].c2;
  ctx.fillStyle = "rgba(0,0,0,.25)";
  ctx.beginPath();
  ctx.ellipse(t.x, t.y, 12, 4, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#4a3a2a";
  ctx.fillRect(t.x - 2, t.y - 24, 4, 24);
  const y = t.y - 32 + Math.sin(tm * 4) * 2;
  const g = ctx.createRadialGradient(t.x, y, 0, t.x, y, 16);
  g.addColorStop(0, c2);
  g.addColorStop(1, rgba(col, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(t.x, y, 16, 0, TAU);
  ctx.fill();
  ctx.fillStyle = col;
  rr(ctx, t.x - 6, y - 8, 12, 16, 4);
  ctx.fill();
  ctx.fillStyle = c2;
  ctx.fillRect(t.x - 6, y - 2, 12, 2);
  if (t.life < 2 && Math.floor(tm * 8) % 2) ctx.globalAlpha = 0.5;
  ctx.globalAlpha = 1;
}
export function drawTele(e) {
  const tl = e.tele;
  if (!tl) return;
  const k = tl.t / tl.dur;
  ctx.save();
  if (tl.kind === "circle") {
    ctx.fillStyle = "rgba(255,60,60,.14)";
    ctx.beginPath();
    ctx.arc(tl.x, tl.y, tl.r, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "rgba(255,60,60,.3)";
    ctx.beginPath();
    ctx.arc(tl.x, tl.y, tl.r * k, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,120,120,.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tl.x, tl.y, tl.r, 0, TAU);
    ctx.stroke();
  } else if (tl.kind === "arc") {
    ctx.fillStyle = "rgba(255,60,60,.18)";
    ctx.beginPath();
    ctx.moveTo(tl.x, tl.y);
    ctx.arc(tl.x, tl.y, tl.r, tl.ang - tl.arc, tl.ang + tl.arc);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,60,60,.3)";
    ctx.beginPath();
    ctx.moveTo(tl.x, tl.y);
    ctx.arc(tl.x, tl.y, tl.r * k, tl.ang - tl.arc, tl.ang + tl.arc);
    ctx.closePath();
    ctx.fill();
  } else if (tl.kind === "hop") {
    ctx.fillStyle = "rgba(255,60,60,.2)";
    ctx.beginPath();
    ctx.arc(tl.tx, tl.ty, tl.r, 0, TAU);
    ctx.fill();
  } else if (tl.kind === "proj") {
    ctx.strokeStyle = `rgba(255,80,80,${0.2 + k * 0.5})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(e.x, e.y - 14);
    ctx.lineTo(GS.G.p.x, GS.G.p.y - 14);
    ctx.stroke();
  }
  ctx.restore();
}
export function drawBossTele(b) {
  const tl = b.tele;
  if (!tl) return;
  const k = b.t / tl.dur;
  ctx.save();
  if (tl.kind === "line") {
    ctx.translate(b.x, b.y);
    ctx.rotate(tl.ang);
    ctx.fillStyle = "rgba(255,60,60,.16)";
    ctx.fillRect(0, -46, tl.len, 92);
    ctx.fillStyle = "rgba(255,60,60,.32)";
    ctx.fillRect(0, -46, tl.len * k, 92);
  } else if (tl.kind === "fan") {
    ctx.translate(b.x, b.y - 24);
    ctx.fillStyle = "rgba(255,60,60,.15)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 420 * k + 60, tl.ang - 0.6, tl.ang + 0.6);
    ctx.closePath();
    ctx.fill();
  } else if (tl.kind === "rain") {
    for (const r of b.rain) {
      ctx.fillStyle = "rgba(255,60,60,.14)";
      ctx.beginPath();
      ctx.arc(r.x, r.y, 66, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "rgba(255,60,60,.3)";
      ctx.beginPath();
      ctx.arc(r.x, r.y, 66 * k, 0, TAU);
      ctx.fill();
    }
  } else if (tl.kind === "summon") {
    ctx.strokeStyle = EL.bolt.c;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 60 + k * 60, 0, TAU);
    ctx.stroke();
  }
  ctx.restore();
}
export function drawEnemyUi(e) {
  const top = e.type === "golem" ? 78 : e.type === "slime" ? 34 : 46;
  if (e.hp < e.maxHp) {
    const w = e.type === "golem" ? 56 : 36;
    ctx.fillStyle = "rgba(0,0,0,.6)";
    ctx.fillRect(e.x - w / 2 - 1, e.y - top - 1, w + 2, 6);
    ctx.fillStyle = "#ff6060";
    ctx.fillRect(e.x - w / 2, e.y - top, w * Math.max(0, e.hp / e.maxHp), 4);
  }
  ctx.font = "700 10px 'Be Vietnam Pro',sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "rgba(0,0,0,.7)";
  ctx.lineWidth = 2.5;
  const lb = `Lv${e.lv}${ENEMY[e.type].elite ? " ✦" : ""}`;
  ctx.strokeText(lb, e.x, e.y - top - 5);
  ctx.fillText(lb, e.x, e.y - top - 5);
  if (e.aura) {
    ctx.fillStyle = EL[e.aura].c;
    ctx.beginPath();
    ctx.arc(e.x + (e.type === "golem" ? 34 : 24), e.y - top + 2, 5, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  if (e.frozen > 0) {
    ctx.fillStyle = "rgba(170,230,255,.35)";
    ctx.beginPath();
    ctx.ellipse(e.x, e.y - e.r, e.r * 1.2, e.r * 1.4, 0, 0, TAU);
    ctx.fill();
  }
}
