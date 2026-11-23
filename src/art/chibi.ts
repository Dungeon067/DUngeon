import { TAU, hash2, rgba, rr, shade } from "../core/util";
import { EL, byId } from "../data/content";

/* =========================================================
   ART: procedural chibi characters, enemies, portraits
   ========================================================= */
export function drawBackHair(ctx: CanvasRenderingContext2D, L: any) {
  ctx.fillStyle = shade(L.hair, -0.12);
  if (L.style === "long" || L.style === "longlocks") {
    rr(ctx, -11.5, -36, 23, 27, 8);
    ctx.fill();
  } else if (L.style === "pony") {
    ctx.beginPath();
    ctx.moveTo(-6, -34);
    ctx.quadraticCurveTo(-20, -30, -15, -14);
    ctx.quadraticCurveTo(-12, -20, -4, -26);
    ctx.closePath();
    ctx.fill();
  } else if (L.style === "bob") {
    rr(ctx, -12, -36, 24, 17, 8);
    ctx.fill();
  }
}
export function drawWeapon(ctx: CanvasRenderingContext2D, c: any, L: any, t: any) {
  const w = c.w,
    acc = L.accent,
    el = EL[c.el].c;
  if (w === "sword") {
    ctx.fillStyle = "#e6edf5";
    rr(ctx, -1.3, -20, 2.6, 18, 1);
    ctx.fill();
    ctx.fillStyle = el;
    ctx.fillRect(-0.5, -18, 1, 14);
    ctx.fillStyle = acc;
    ctx.fillRect(-4, -2.5, 8, 2.2);
    ctx.fillStyle = "#4a3524";
    ctx.fillRect(-1, -0.5, 2, 4);
  } else if (w === "great") {
    ctx.fillStyle = "#cfd6de";
    ctx.beginPath();
    ctx.moveTo(-3, -1);
    ctx.lineTo(-3.4, -24);
    ctx.lineTo(0, -29);
    ctx.lineTo(3.4, -24);
    ctx.lineTo(3, -1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = el;
    ctx.fillRect(-0.9, -24, 1.8, 20);
    ctx.fillStyle = acc;
    ctx.fillRect(-6, -2, 12, 3);
    ctx.fillStyle = "#4a3524";
    ctx.fillRect(-1.2, 1, 2.4, 5);
  } else if (w === "spear") {
    ctx.fillStyle = "#6b4a2e";
    ctx.fillRect(-0.9, -30, 1.8, 40);
    ctx.fillStyle = acc;
    ctx.beginPath();
    ctx.moveTo(0, -38);
    ctx.lineTo(-3.2, -29);
    ctx.lineTo(3.2, -29);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = el;
    ctx.fillRect(-2, -29, 4, 2);
  } else if (w === "bow") {
    ctx.strokeStyle = shade(acc, -0.2);
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(3, -4, 11, -1.25, 1.25);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.7)";
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(3 + 11 * Math.cos(-1.25), -4 + 11 * Math.sin(-1.25));
    ctx.lineTo(3 + 11 * Math.cos(1.25), -4 + 11 * Math.sin(1.25));
    ctx.stroke();
  }
}
export function drawCatalyst(ctx: CanvasRenderingContext2D, c: any, t: any) {
  const el = EL[c.el];
  const y = -34 + Math.sin(t * 3) * 2;
  const g = ctx.createRadialGradient(13, y, 0, 13, y, 9);
  g.addColorStop(0, rgba(el.c2, 0.95));
  g.addColorStop(1, rgba(el.c, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(13, y, 9, 0, TAU);
  ctx.fill();
  ctx.fillStyle = el.c2;
  ctx.save();
  ctx.translate(13, y);
  ctx.rotate(t * 1.5);
  ctx.fillRect(-3, -3, 6, 6);
  ctx.restore();
}
/* Chibi: ~44 units tall, feet at (0,0). o: {fx,back,walk,moving,atk,t,flash,noShadow} */
export function drawChibi(ctx: CanvasRenderingContext2D, c: any, x: number, y: number, s: any, o: any = {}) {
  const L = c.look,
    fx = o.fx || 1,
    back = !!o.back,
    t = o.t || 0,
    moving = !!o.moving,
    wk = o.walk || 0,
    atk = o.atk || 0;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  if (!o.noShadow) {
    ctx.fillStyle = "rgba(0,0,0,.28)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 11, 3.6, 0, 0, TAU);
    ctx.fill();
  }
  ctx.scale(fx, 1);
  const bob = moving ? Math.abs(Math.sin(wk)) * 1.6 : Math.sin(t * 2.4) * 0.6;
  ctx.translate(0, -bob);
  const sw = moving ? Math.sin(wk) * 3 : 0;
  const pants = L.pants || shade(L.outfit, -0.45);
  if (!back) drawBackHair(ctx, L);
  // cape / coat tail behind
  if (L.coat) {
    ctx.fillStyle = shade(L.outfit, -0.2);
    ctx.beginPath();
    ctx.moveTo(-7, -17);
    ctx.lineTo(7, -17);
    ctx.lineTo(9 + (moving ? -sw * 0.4 : 0) - (back ? 0 : 2), -3);
    ctx.lineTo(-10 + (moving ? -sw * 0.5 : 0), -2);
    ctx.closePath();
    ctx.fill();
  }
  // back arm
  ctx.save();
  ctx.translate(-6, -17);
  ctx.rotate(moving ? -sw * 0.12 : 0.08);
  ctx.fillStyle = shade(L.outfit, -0.15);
  rr(ctx, -1.8, 0, 3.6, 9, 1.8);
  ctx.fill();
  ctx.fillStyle = L.skin;
  ctx.beginPath();
  ctx.arc(0, 9, 1.8, 0, TAU);
  ctx.fill();
  ctx.restore();
  // legs
  ctx.fillStyle = pants;
  rr(ctx, -5 + sw * 0.45, -8, 4, 7.5, 1.6);
  ctx.fill();
  rr(ctx, 1 - sw * 0.45, -8, 4, 7.5, 1.6);
  ctx.fill();
  ctx.fillStyle = "#3a2a22";
  rr(ctx, -5.5 + sw * 0.45, -2.2, 5, 2.6, 1.2);
  ctx.fill();
  rr(ctx, 0.5 - sw * 0.45, -2.2, 5, 2.6, 1.2);
  ctx.fill();
  // body
  ctx.fillStyle = L.outfit;
  rr(ctx, -7, -19.5, 14, 13, 4.5);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-7.5, -11);
  ctx.lineTo(7.5, -11);
  ctx.lineTo(9, -5.5);
  ctx.lineTo(-9, -5.5);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = L.accent;
  ctx.fillRect(-7.2, -11.2, 14.4, 1.8);
  if (!back) {
    ctx.beginPath();
    ctx.moveTo(-3.5, -19.5);
    ctx.lineTo(0, -15);
    ctx.lineTo(3.5, -19.5);
    ctx.closePath();
    ctx.fill();
    // vision gem
    ctx.fillStyle = EL[c.el].c;
    ctx.save();
    ctx.translate(4.2, -10.3);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-1.6, -1.6, 3.2, 3.2);
    ctx.restore();
  }
  // head
  ctx.fillStyle = L.skin;
  ctx.beginPath();
  ctx.arc(0, -29, 10.5, 0, TAU);
  ctx.fill();
  // hair
  ctx.fillStyle = L.hair;
  if (back) {
    ctx.beginPath();
    ctx.arc(0, -29.5, 11.2, 0, TAU);
    ctx.fill();
    if (L.style === "long" || L.style === "longlocks") {
      rr(ctx, -11.5, -34, 23, 24, 8);
      ctx.fill();
    }
    if (L.style === "pony") {
      ctx.beginPath();
      ctx.ellipse(0, -17, 3.5, 8, 0, 0, TAU);
      ctx.fill();
    }
    if (L.style === "bob") {
      rr(ctx, -12, -34, 24, 15, 8);
      ctx.fill();
    }
  } else {
    ctx.beginPath();
    ctx.arc(0, -30, 11.2, Math.PI * 1.02, Math.PI * 1.98);
    ctx.lineTo(10.6, -27);
    ctx.lineTo(8, -29.5);
    ctx.lineTo(6, -25.5);
    ctx.lineTo(3.5, -29);
    ctx.lineTo(0.5, -25);
    ctx.lineTo(-2.5, -29);
    ctx.lineTo(-5.5, -25.5);
    ctx.lineTo(-8.5, -29);
    ctx.lineTo(-10.8, -24);
    ctx.closePath();
    ctx.fill();
    // side locks
    ctx.beginPath();
    ctx.moveTo(-11, -30);
    ctx.quadraticCurveTo(-12.5, -23, -9.5, -19);
    ctx.lineTo(-8.5, -26);
    ctx.closePath();
    ctx.fill();
    if (L.style === "long" || L.style === "longlocks" || L.style === "bob") {
      ctx.beginPath();
      ctx.moveTo(11, -30);
      ctx.quadraticCurveTo(12.5, -23, 9.5, -18);
      ctx.lineTo(8.5, -26);
      ctx.closePath();
      ctx.fill();
    }
    // face
    ctx.fillStyle = "#2a1e2e";
    ctx.beginPath();
    ctx.ellipse(1.6, -25.8, 1.5, 2.2, 0, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(6.6, -25.8, 1.4, 2.1, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = L.eye;
    ctx.beginPath();
    ctx.ellipse(1.6, -25.2, 1.1, 1.3, 0, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(6.6, -25.2, 1, 1.2, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(1.6, -27, 0.9, 0.9);
    ctx.fillRect(6.6, -27, 0.8, 0.8);
    ctx.fillStyle = "rgba(255,120,120,.35)";
    ctx.beginPath();
    ctx.ellipse(-1.5, -22.6, 1.8, 1, 0, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8.6, -22.6, 1.4, 0.9, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#7a3b3b";
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.arc(4.4, -22.4, 1.1, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }
  ctx.fillStyle = L.hair;
  if (L.style === "spiky") {
    for (let i = 0; i < 5; i++) {
      const a = Math.PI * 1.1 + i * 0.2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 8, -30 + Math.sin(a) * 8);
      ctx.lineTo(Math.cos(a + 0.1) * 16, -30 + Math.sin(a + 0.1) * 16);
      ctx.lineTo(Math.cos(a + 0.25) * 8, -30 + Math.sin(a + 0.25) * 8);
      ctx.closePath();
      ctx.fill();
    }
  }
  if (L.style === "buns") {
    ctx.beginPath();
    ctx.arc(-7.5, -39, 4.2, 0, TAU);
    ctx.arc(7.5, -39, 4.2, 0, TAU);
    ctx.fill();
    ctx.fillStyle = L.accent;
    ctx.fillRect(-9.5, -36.5, 4, 1.4);
    ctx.fillRect(5.5, -36.5, 4, 1.4);
  }
  if (L.style === "pony" && !back) {
    ctx.fillStyle = L.accent;
    ctx.beginPath();
    ctx.arc(-9, -33, 1.8, 0, TAU);
    ctx.fill();
  }
  // hair shine
  ctx.fillStyle = "rgba(255,255,255,.18)";
  ctx.beginPath();
  ctx.ellipse(-3, -37, 4, 1.6, -0.3, 0, TAU);
  ctx.fill();
  // front arm + weapon
  if (c.w === "cat") {
    drawCatalyst(ctx, c, t);
  }
  const aRot = atk > 0 ? -1.9 + (1 - atk) * 2.8 : moving ? sw * 0.12 : -0.1;
  ctx.save();
  ctx.translate(6, -17);
  ctx.rotate(c.w === "bow" ? -1.3 + (atk > 0 ? 0.2 : 0) : aRot);
  ctx.fillStyle = shade(L.outfit, 0.05);
  rr(ctx, -1.8, 0, 3.6, 9, 1.8);
  ctx.fill();
  ctx.fillStyle = L.skin;
  ctx.beginPath();
  ctx.arc(0, 9, 1.9, 0, TAU);
  ctx.fill();
  if (c.w !== "cat") {
    ctx.translate(0, 9.5);
    ctx.rotate(c.w === "bow" ? 1.3 : 1.55);
    drawWeapon(ctx, c, L, t);
  }
  ctx.restore();
  ctx.restore();
}
export const portraitCache: any = {};
export function portrait(id: string, w: number, h: number, kind = "card") {
  const key = id + w + "x" + h + kind;
  if (portraitCache[key]) return portraitCache[key];
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  paintPortrait(cv.getContext("2d")!, byId[id], w, h, kind);
  portraitCache[key] = cv;
  return cv;
}
export function paintPortrait(ctx: CanvasRenderingContext2D, c: any, w: number, h: number, kind: string) {
  const el = EL[c.el];
  if (kind !== "head") {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, shade(el.c, -0.55));
    g.addColorStop(1, shade(el.c, -0.82));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // radiating motif
    ctx.save();
    ctx.translate(w * 0.5, h * 0.45);
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = el.c2;
    for (let i = 0; i < 16; i++) {
      ctx.rotate(TAU / 16);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, -w * 0.07);
      ctx.lineTo(w, w * 0.07);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    // drum ring motif
    ctx.strokeStyle = rgba(el.c2, 0.25);
    ctx.lineWidth = Math.max(1, w * 0.006);
    for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.45, w * 0.1 * i, 0, TAU);
      ctx.stroke();
    }
    // particles
    for (let i = 0; i < 26; i++) {
      const px = hash2(i, 3, c.id.length) * w,
        py = hash2(i, 9, c.r) * h,
        ps = ((hash2(i, 5) * 2 + 0.6) * w) / 220;
      ctx.fillStyle = rgba(i % 3 ? el.c2 : "#ffffff", 0.5);
      ctx.beginPath();
      ctx.arc(px, py, ps, 0, TAU);
      ctx.fill();
    }
    const s = Math.min(w / 36, h / 56) * (kind === "splash" ? 1.05 : 1);
    drawChibi(ctx, c, w * 0.5, h * 0.5 + s * 24, s, { t: 0.6, noShadow: true });
    const vg = ctx.createLinearGradient(0, h * 0.65, 0, h);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,.45)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
  } else {
    ctx.fillStyle = shade(el.c, -0.7);
    ctx.fillRect(0, 0, w, h);
    const s = w / 26;
    drawChibi(ctx, c, w * 0.5, h * 0.5 + s * 30, s, { t: 0.6, noShadow: true });
  }
}
