import { TAU, rgba, rr } from "../core/util";
import { EL, ENEMY } from "../data/content";

// ---- enemies ----
export function drawEnemy(ctx: CanvasRenderingContext2D, e: any, t: any) {
  const fl = e.flash > 0;
  ctx.save();
  ctx.translate(e.x, e.y);
  if (e.hitT > 0) {
    const q = Math.sin((e.hitT / 0.14) * Math.PI) * 0.12;
    ctx.scale(1 + q, 1 - q);
  }
  if (e.frozen > 0) {
    ctx.globalAlpha = 0.95;
  }
  ctx.fillStyle = "rgba(0,0,0,.28)";
  ctx.beginPath();
  ctx.ellipse(0, 0, e.r * 0.9, e.r * 0.32, 0, 0, TAU);
  ctx.fill();
  const T = ENEMY[e.type];
  if (e.type === "slime") {
    const sq = e.hop > 0 ? 1 + Math.sin(e.hop * Math.PI) * 0.3 : 1 + Math.sin(t * 5 + e.seed) * 0.06;
    const c = fl ? "#ffffff" : EL[e.el].c;
    const lift = e.hop > 0 ? Math.sin(e.hop * Math.PI) * 16 : 0;
    ctx.translate(0, -lift);
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.ellipse(0, (-e.r * 0.75) / sq, (e.r / sq) * 1.05, e.r * 0.8 * sq, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.35)";
    ctx.beginPath();
    ctx.ellipse(-e.r * 0.35, -e.r * 1.1, e.r * 0.3, e.r * 0.18, -0.5, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#1a1a2a";
    ctx.beginPath();
    ctx.arc(-4 * e.fx + 2, -e.r * 0.7, 2.2, 0, TAU);
    ctx.arc(4 * e.fx + 2, -e.r * 0.7, 2.2, 0, TAU);
    ctx.fill();
  } else if (e.type === "goblin" || e.type === "archer" || e.type === "shaman") {
    const bob = Math.abs(Math.sin(e.walk)) * 1.5;
    ctx.translate(0, -bob);
    ctx.scale(e.fx, 1);
    const skin = fl ? "#fff" : "#7a5a3a",
      mask = fl ? "#fff" : e.type === "archer" ? "#e8dcc0" : e.type === "shaman" ? "#d9e0f0" : "#f1e6cf";
    const cloth = e.type === "shaman" ? "#3b3570" : e.type === "archer" ? "#4b6b3a" : "#6b3a2a";
    ctx.fillStyle = skin;
    rr(ctx, -4, -8, 3, 8, 1.2);
    ctx.fill();
    rr(ctx, 1, -8, 3, 8, 1.2);
    ctx.fill();
    ctx.fillStyle = fl ? "#fff" : cloth;
    rr(ctx, -7, -19, 14, 13, 4);
    ctx.fill();
    if (e.type === "shaman") {
      ctx.beginPath();
      ctx.moveTo(-9, -6);
      ctx.lineTo(9, -6);
      ctx.lineTo(7, -18);
      ctx.lineTo(-7, -18);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(0, -25, 8, 0, TAU);
    ctx.fill();
    ctx.fillStyle = mask;
    ctx.beginPath();
    ctx.ellipse(2, -25, 7, 7.5, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#b23a3a";
    ctx.fillRect(-1, -31, 2, 12);
    ctx.fillRect(4, -31, 1.5, 12);
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(-0.5, -26, 1.4, 0, TAU);
    ctx.arc(5, -26, 1.4, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#d8c9a8";
    ctx.beginPath();
    ctx.moveTo(-5, -30);
    ctx.lineTo(-9, -38);
    ctx.lineTo(-2, -32);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(5, -30);
    ctx.lineTo(9, -38);
    ctx.lineTo(2, -32);
    ctx.closePath();
    ctx.fill();
    ctx.save();
    ctx.translate(7, -14);
    const sw = e.tele && e.tele.kind !== "proj" ? -1.2 * (e.tele.t / e.tele.dur) : e.swing > 0 ? 1.2 * e.swing : 0;
    ctx.rotate(sw);
    if (e.type === "goblin") {
      ctx.fillStyle = "#5a3a1e";
      rr(ctx, -1.5, -16, 3, 18, 1.5);
      ctx.fill();
      ctx.fillStyle = "#3a2a18";
      ctx.beginPath();
      ctx.arc(0, -16, 4, 0, TAU);
      ctx.fill();
    } else if (e.type === "archer") {
      ctx.strokeStyle = "#6a4a2a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -4, 9, -1.3, 1.3);
      ctx.stroke();
    } else {
      ctx.fillStyle = "#4a3a2a";
      ctx.fillRect(-1, -22, 2, 26);
      const g = ctx.createRadialGradient(0, -24, 0, 0, -24, 7);
      g.addColorStop(0, EL[e.el].c2);
      g.addColorStop(1, rgba(EL[e.el].c, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, -24, 7, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  } else if (e.type === "golem") {
    const bob = Math.abs(Math.sin(e.walk * 0.6)) * 2;
    ctx.translate(0, -bob);
    const rk = fl ? "#fff" : "#7d7a73",
      dk = fl ? "#fff" : "#5b5852";
    ctx.fillStyle = dk;
    rr(ctx, -14, -16, 10, 16, 3);
    ctx.fill();
    rr(ctx, 4, -16, 10, 16, 3);
    ctx.fill();
    ctx.fillStyle = rk;
    rr(ctx, -20, -48, 40, 34, 8);
    ctx.fill();
    const sl = e.tele ? e.tele.t / e.tele.dur : 0;
    ctx.fillStyle = dk;
    rr(ctx, -30, -46 - sl * 16, 11, 28, 4);
    ctx.fill();
    rr(ctx, 19, -46 - sl * 16, 11, 28, 4);
    ctx.fill();
    ctx.fillStyle = rk;
    rr(ctx, -11, -64, 22, 18, 6);
    ctx.fill();
    const core = EL.earth.c;
    ctx.fillStyle = core;
    ctx.shadowColor = core;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, -32, 5, 0, TAU);
    ctx.fill();
    ctx.fillRect(-5, -58, 4, 3);
    ctx.fillRect(2, -58, 4, 3);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(0,0,0,.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-12, -40);
    ctx.lineTo(-4, -36);
    ctx.lineTo(-8, -26);
    ctx.moveTo(8, -44);
    ctx.lineTo(14, -34);
    ctx.stroke();
  }
  ctx.restore();
}
export function drawBoss(ctx: CanvasRenderingContext2D, b: any, t: any) {
  const col = b.flash > 0 ? "#ffffff" : b.phase === 2 ? "#4a2f7a" : "#1f3f6a",
    acc = b.phase === 2 ? EL.bolt.c : EL.water.c;
  for (let i = b.segs.length - 1; i >= 0; i--) {
    const s = b.segs[i],
      r = 30 - i * 1.6;
    if (r < 8) continue;
    ctx.fillStyle = "rgba(0,0,0,.25)";
    ctx.beginPath();
    ctx.ellipse(s.x, s.y + 6, r, r * 0.35, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(s.x, s.y - r * 0.6, r, 0, TAU);
    ctx.fill();
    ctx.fillStyle = acc;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.moveTo(s.x - r * 0.3, s.y - r * 1.5);
    ctx.lineTo(s.x, s.y - r * 2.1);
    ctx.lineTo(s.x + r * 0.3, s.y - r * 1.5);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(255,255,255,.1)";
    ctx.beginPath();
    ctx.arc(s.x - r * 0.3, s.y - r, r * 0.4, 0, TAU);
    ctx.fill();
  }
  const h = b.segs[0],
    a = b.ang;
  ctx.save();
  ctx.translate(h.x, h.y - 24);
  ctx.rotate(a);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.ellipse(10, 0, 40, 28, 0, 0, TAU);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(30, -14);
  ctx.lineTo(62, -4);
  ctx.lineTo(62, 6);
  ctx.lineTo(30, 16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#e8e2c8";
  ctx.beginPath();
  ctx.moveTo(-6, -22);
  ctx.lineTo(-34, -46);
  ctx.lineTo(4, -26);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-6, 22);
  ctx.lineTo(-34, 46);
  ctx.lineTo(4, 26);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = acc;
  ctx.shadowColor = acc;
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(28, -11, 4.5, 0, TAU);
  ctx.arc(28, 11, 4.5, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = acc;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(56, -4);
  ctx.quadraticCurveTo(80, -20 + Math.sin(t * 4) * 6, 90, -8);
  ctx.moveTo(56, 6);
  ctx.quadraticCurveTo(80, 20 + Math.sin(t * 4 + 1) * 6, 90, 10);
  ctx.stroke();
  ctx.restore();
}
