import { GS } from "../core/state";
import { ctx } from "../core/canvas";
import { TAU, rgba, rr } from "../core/util";
import { EL, ENEMY } from "../data/content";
import { FEEL } from "../combat/feel";

export function drawTurret(t: any, tm: number) {
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
/* ---------- báo trước đòn ----------
   k = tiến độ 0..1. Phần tô đầy dần, viền sáng dần, từ FEEL.telegraph.flashAt viền nháy trắng.
   Độ dày viền tính theo điểm ảnh màn hình nên không mảnh đi khi camera thu nhỏ. */
function teleLine(mul = 1) {
  const T = FEEL.telegraph;
  return (T.line * mul * (GS.isTouch ? T.touchScale : 1)) / GS.ZOOM;
}
function teleFlash(k: number) {
  return k >= FEEL.telegraph.flashAt && Math.sin(GS.G.time * 42) > -0.2;
}
/** Tô và viền một hình đã dựng sẵn bằng path(). */
function teleShape(k: number, path: (p: number) => void) {
  const fl = teleFlash(k);
  ctx.fillStyle = `rgba(255,50,50,${0.1 + k * 0.08})`;
  path(1);
  ctx.fill();
  ctx.fillStyle = fl ? "rgba(255,235,235,.42)" : `rgba(255,60,60,${0.22 + k * 0.2})`;
  path(k);
  ctx.fill();
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(20,0,0,.55)";
  ctx.lineWidth = teleLine(1.8);
  path(1);
  ctx.stroke();
  ctx.strokeStyle = fl ? "#ffffff" : `rgba(255,${110 + k * 110},${90 + k * 60},${0.45 + k * 0.55})`;
  ctx.lineWidth = teleLine(fl ? 1.25 : 1);
  ctx.stroke();
}
export function drawTele(e: any) {
  const tl = e.tele;
  if (!tl) return;
  const k = Math.min(1, tl.t / tl.dur);
  ctx.save();
  if (tl.kind === "circle") {
    teleShape(k, (p) => {
      ctx.beginPath();
      ctx.arc(tl.x, tl.y, Math.max(0.1, tl.r * p), 0, TAU);
    });
  } else if (tl.kind === "arc") {
    teleShape(k, (p) => {
      ctx.beginPath();
      ctx.moveTo(tl.x, tl.y);
      ctx.arc(tl.x, tl.y, Math.max(0.1, tl.r * p), tl.ang - tl.arc, tl.ang + tl.arc);
      ctx.closePath();
    });
  } else if (tl.kind === "hop") {
    teleShape(k, (p) => {
      ctx.beginPath();
      ctx.arc(tl.tx, tl.ty, Math.max(0.1, tl.r * p), 0, TAU);
    });
  } else if (tl.kind === "proj") {
    const fl = teleFlash(k);
    ctx.strokeStyle = fl ? "#ffffff" : `rgba(255,90,80,${0.35 + k * 0.6})`;
    ctx.lineWidth = teleLine(fl ? 1.2 : 0.8);
    ctx.setLineDash([10 / GS.ZOOM, 7 / GS.ZOOM]);
    ctx.lineDashOffset = -GS.G.time * 60;
    ctx.beginPath();
    ctx.moveTo(e.x, e.y - 14);
    ctx.lineTo(GS.G.p.x, GS.G.p.y - 14);
    ctx.stroke();
  }
  ctx.restore();
}
export function drawBossTele(b: any) {
  const tl = b.tele;
  if (!tl || b.state !== "wind") return;
  const k = Math.min(1, b.t / tl.dur);
  ctx.save();
  if (tl.kind === "line") {
    ctx.translate(b.x, b.y);
    ctx.rotate(tl.ang);
    teleShape(k, (p) => {
      ctx.beginPath();
      ctx.rect(0, -46, tl.len * p, 92);
    });
  } else if (tl.kind === "fan") {
    ctx.translate(b.x, b.y - 24);
    teleShape(k, (p) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 60 + 420 * p, tl.ang - 0.6, tl.ang + 0.6);
      ctx.closePath();
    });
  } else if (tl.kind === "rain") {
    for (const r of b.rain)
      teleShape(k, (p) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0.1, 66 * p), 0, TAU);
      });
  } else if (tl.kind === "summon") {
    ctx.strokeStyle = teleFlash(k) ? "#ffffff" : EL.bolt.c;
    ctx.lineWidth = teleLine(1);
    ctx.beginPath();
    ctx.arc(b.x, b.y, 60 + k * 60, 0, TAU);
    ctx.stroke();
  }
  ctx.restore();
  if (tl.kind !== "summon") drawAlert(b.x, b.y - 110, k);
}
/** Dấu "!" trên đầu quái đang chuẩn bị đánh; to dần và nháy trắng lúc sắp ra đòn. */
function drawAlert(x: number, y: number, k: number) {
  const fl = teleFlash(k),
    s = (GS.isTouch ? FEEL.telegraph.touchScale : 1) / GS.ZOOM,
    r = (7 + k * 3) * s;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = fl ? "#ffffff" : "#ff4a3d";
  ctx.strokeStyle = "rgba(30,0,0,.8)";
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.25);
  ctx.lineTo(r, r * 0.6);
  ctx.lineTo(-r, r * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = fl ? "#ff3020" : "#fff";
  ctx.fillRect(-r * 0.13, -r * 0.6, r * 0.26, r * 0.7);
  ctx.fillRect(-r * 0.13, r * 0.22, r * 0.26, r * 0.22);
  ctx.restore();
}
/** Thanh chịu đòn mỏng dưới thanh máu; vàng khi đang choáng. */
function drawPoise(e: any, x: number, y: number, w: number) {
  if (e.maxPoise === undefined || (e.poise >= e.maxPoise && !(e.stun > 0))) return;
  ctx.fillStyle = "rgba(0,0,0,.6)";
  ctx.fillRect(x - w / 2 - 1, y - 1, w + 2, 4);
  if (e.stun > 0) {
    ctx.fillStyle = Math.sin(GS.G.time * 20) > 0 ? "#ffe27a" : "#fff6c8";
    ctx.fillRect(
      x - w / 2,
      y,
      w * Math.min(1, e.stun / (FEEL.enemies[e.isBoss ? "hacgiao" : e.type]?.stun ?? FEEL.poise.stun)),
      2,
    );
  } else {
    ctx.fillStyle = "#e8eef8";
    ctx.fillRect(x - w / 2, y, w * Math.max(0, e.poise / e.maxPoise), 2);
  }
}
/** Phần nổi trên đầu boss trong thế giới: thanh chịu đòn và chữ choáng (không thuộc HUD). */
export function drawBossWorldUi(b: any) {
  if (b.dead) return;
  drawPoise(b, b.x, b.y - 92, 90);
  if (b.stun > 0) drawStunStars(b.x, b.y - 100, 22);
}
function drawStunStars(x: number, y: number, r: number) {
  ctx.fillStyle = "#ffe27a";
  for (let i = 0; i < 3; i++) {
    const a = GS.G.time * 4 + (i * TAU) / 3;
    ctx.beginPath();
    ctx.arc(x + Math.cos(a) * r, y + Math.sin(a) * r * 0.35, 2.6, 0, TAU);
    ctx.fill();
  }
}
export function drawEnemyUi(e: any) {
  const top = e.type === "golem" ? 78 : e.type === "slime" ? 34 : 46;
  if (e.hp < e.maxHp) {
    const w = e.type === "golem" ? 56 : 36;
    ctx.fillStyle = "rgba(0,0,0,.6)";
    ctx.fillRect(e.x - w / 2 - 1, e.y - top - 1, w + 2, 6);
    ctx.fillStyle = "#ff6060";
    ctx.fillRect(e.x - w / 2, e.y - top, w * Math.max(0, e.hp / e.maxHp), 4);
  }
  drawPoise(e, e.x, e.y - top + 6, e.type === "golem" ? 56 : 36);
  if (e.stun > 0) drawStunStars(e.x, e.y - top + 14, e.r * 0.8);
  if (e.tele) drawAlert(e.x, e.y - top - 22, Math.min(1, e.tele.t / e.tele.dur));
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
