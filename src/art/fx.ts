import { ctx } from "../core/canvas";
import { TAU } from "../core/util";

/** Vệt chém theo kiểu của từng nhân vật. k đi từ 1 về 0 theo thời gian sống. */
export function drawSlash(f: any, k: number) {
  const t = 1 - k,
    a0 = f.ang - f.arc * (1 - k * 0.3) * f.flip,
    a1 = f.ang + f.arc * (1 - k * 0.3) * f.flip,
    R = f.r * 0.8;
  ctx.globalAlpha = Math.min(1, k * 1.4);
  ctx.lineCap = "round";
  ctx.strokeStyle = f.col;
  ctx.shadowColor = f.col;
  ctx.shadowBlur = 10;
  switch (f.trail) {
    case "thrust": {
      const L = f.r * (0.6 + t * 0.4),
        c = Math.cos(f.ang),
        s = Math.sin(f.ang);
      ctx.lineWidth = f.w * k + 2;
      ctx.beginPath();
      ctx.moveTo(f.x + c * 10, f.y + s * 10);
      ctx.lineTo(f.x + c * L, f.y + s * L);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(f.x + c * L, f.y + s * L);
      ctx.lineTo(f.x + c * (L - 16) - s * 7, f.y + s * (L - 16) + c * 7);
      ctx.moveTo(f.x + c * L, f.y + s * L);
      ctx.lineTo(f.x + c * (L - 16) + s * 7, f.y + s * (L - 16) - c * 7);
      ctx.stroke();
      break;
    }
    case "wing": {
      // Vệt hình cánh chim: một cung dày và ba lông mảnh tỏa ra.
      arcStroke(f, R, a0, a1, f.w * k + 2);
      ctx.lineWidth = 2;
      for (let i = 1; i <= 3; i++) {
        const a = a0 + ((a1 - a0) * i) / 4;
        ctx.beginPath();
        ctx.moveTo(f.x + Math.cos(a) * R, f.y + Math.sin(a) * R);
        ctx.lineTo(f.x + Math.cos(a) * (R + 14 * k), f.y + Math.sin(a) * (R + 14 * k));
        ctx.stroke();
      }
      break;
    }
    case "crescent": {
      ctx.fillStyle = f.col;
      ctx.beginPath();
      ctx.arc(f.x, f.y, R + 4, a0, a1, f.flip < 0);
      ctx.arc(f.x + Math.cos(f.ang) * 10, f.y + Math.sin(f.ang) * 10, R - 6, a1, a0, f.flip > 0);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "twin":
      arcStroke(f, R, a0, a1, f.w * k * 0.7 + 1);
      arcStroke(f, R * 0.72, a0 + 0.15 * f.flip, a1 - 0.15 * f.flip, f.w * k * 0.5 + 1);
      break;
    case "zigzag": {
      ctx.lineWidth = f.w * k * 0.6 + 1.5;
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const a = a0 + ((a1 - a0) * i) / 6,
          r = R + (i % 2 ? 9 : -6);
        if (i) ctx.lineTo(f.x + Math.cos(a) * r, f.y + Math.sin(a) * r);
        else ctx.moveTo(f.x + Math.cos(a) * r, f.y + Math.sin(a) * r);
      }
      ctx.stroke();
      break;
    }
    case "heavy":
      arcStroke(f, R, a0, a1, f.w * k * 1.4 + 3);
      ctx.globalAlpha *= 0.4;
      arcStroke(f, R * 1.15, a0, a1, 3);
      break;
    default:
      arcStroke(f, R, a0, a1, f.w * k + 1);
  }
  // Lõi sáng mảnh phía trong để vệt nổi trên mọi nền.
  if (f.trail !== "thrust" && f.trail !== "crescent") {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = f.core;
    ctx.globalAlpha = k * 0.85;
    ctx.lineWidth = Math.max(1, f.w * k * 0.3);
    ctx.beginPath();
    ctx.arc(f.x, f.y, R, a0, a1, f.flip < 0);
    ctx.stroke();
  }
}
function arcStroke(f: any, r: number, a0: number, a1: number, w: number) {
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.arc(f.x, f.y, r, a0, a1, f.flip < 0);
  ctx.stroke();
}

/** Hạt nguyên tố: vẽ bằng hình cơ bản, không đổ bóng để giữ FPS. */
export function drawParticle(f: any, k: number) {
  const s = f.size;
  ctx.globalAlpha = Math.min(1, k * 1.5);
  ctx.fillStyle = f.col;
  ctx.strokeStyle = f.col;
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rot);
  switch (f.pk) {
    case "drop":
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.8, 0, Math.PI);
      ctx.lineTo(0, -s * 1.6);
      ctx.closePath();
      ctx.fill();
      break;
    case "leaf":
    case "petal":
    case "feather":
      ctx.beginPath();
      ctx.ellipse(0, 0, s * (f.pk === "feather" ? 1.8 : 1.4), s * 0.55, 0, 0, TAU);
      ctx.fill();
      if (f.pk === "feather") {
        ctx.globalAlpha *= 0.6;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-s * 2.2, 0);
        ctx.lineTo(s * 1.8, 0);
        ctx.stroke();
      }
      break;
    case "spark":
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-s * 1.6, 0);
      ctx.lineTo(-s * 0.3, s * 0.5);
      ctx.lineTo(s * 0.3, -s * 0.5);
      ctx.lineTo(s * 1.6, 0);
      ctx.stroke();
      break;
    case "shard":
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.3);
      ctx.lineTo(s * 0.8, 0);
      ctx.lineTo(0, s * 1.1);
      ctx.lineTo(-s * 0.7, 0);
      ctx.closePath();
      ctx.fill();
      break;
    case "snow":
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI) / 3;
        ctx.moveTo(-Math.cos(a) * s * 1.3, -Math.sin(a) * s * 1.3);
        ctx.lineTo(Math.cos(a) * s * 1.3, Math.sin(a) * s * 1.3);
      }
      ctx.stroke();
      break;
    case "lantern":
      ctx.fillRect(-s * 0.7, -s * 0.9, s * 1.4, s * 1.8);
      ctx.globalAlpha *= 0.35;
      ctx.beginPath();
      ctx.arc(0, 0, s * 2, 0, TAU);
      ctx.fill();
      break;
    case "mist":
      ctx.globalAlpha *= 0.35;
      ctx.beginPath();
      ctx.arc(0, 0, s * (1.6 - k * 0.6), 0, TAU);
      ctx.fill();
      break;
    default: // ember
      ctx.beginPath();
      ctx.arc(0, 0, s * k + 0.6, 0, TAU);
      ctx.fill();
  }
}
