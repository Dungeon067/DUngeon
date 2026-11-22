import { GS } from "../core/state";
import { ctx } from "../core/canvas";
import { TAU, hash2, rgba, rr } from "../core/util";
import { TL, TS } from "../world/map";

/* =========================================================
   RENDER
   ========================================================= */
export const TILEC = {
  0: ["#3f7d48", "#44844d", "#3a7444"],
  5: ["#d8c38c", "#d2bc84"],
  4: ["#b99a68", "#b29262"],
  6: ["#3f7d48"],
  8: ["#8a6440"],
};
export function drawTile(x: number, y: number, t: any, tm: number) {
  const X = x * TS,
    Y = y * TS,
    h = hash2(x, y, 1);
  if (t === TL.WATER || t === TL.DEEP) {
    ctx.fillStyle = t === TL.DEEP ? "#1f5a8e" : "#2b7bb3";
    ctx.fillRect(X, Y, TS + 0.5, TS + 0.5);
    const s = Math.sin(tm * 1.6 + x * 0.7 + y * 0.4);
    if (s > 0.4) {
      ctx.fillStyle = "rgba(255,255,255,.14)";
      ctx.fillRect(X + 8 + h * 14, Y + 12 + h * 10, 12, 2);
    }
    return;
  }
  if (t === TL.BRIDGE) {
    ctx.fillStyle = "#2b7bb3";
    ctx.fillRect(X, Y, TS + 0.5, TS + 0.5);
    ctx.fillStyle = "#8a6440";
    ctx.fillRect(X + 3, Y, TS - 6, TS + 0.5);
    ctx.fillStyle = "#6e4e30";
    for (let i = 0; i < 4; i++) ctx.fillRect(X + 3, Y + i * 10 + 8, TS - 6, 1.5);
    return;
  }
  const base = t === TL.SAND ? TILEC[5] : t === TL.PATH ? TILEC[4] : TILEC[0];
  ctx.fillStyle = base[Math.floor(h * base.length)];
  ctx.fillRect(X, Y, TS + 0.5, TS + 0.5);
  if (t === TL.GRASS || t === TL.FLOWER || t === TL.TREE || t === TL.ROCK) {
    ctx.fillStyle = "rgba(120,190,110,.35)";
    for (let i = 0; i < 3; i++) {
      const gx = X + hash2(x, y, i + 10) * TS,
        gy = Y + hash2(x, y, i + 20) * TS;
      ctx.fillRect(gx, gy, 1.5, 4);
    }
  }
  if (t === TL.FLOWER) {
    const cs = ["#ffd1e8", "#fff3a6", "#c8b8ff", "#ffffff"];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = cs[(x + y + i) % 4];
      ctx.beginPath();
      ctx.arc(X + 6 + hash2(x, y, i + 30) * 28, Y + 6 + hash2(x, y, i + 40) * 28, 2.2, 0, TAU);
      ctx.fill();
    }
  }
  if (t === TL.PATH && h < 0.3) {
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.beginPath();
    ctx.arc(X + h * 40, Y + 20, 2.5, 0, TAU);
    ctx.fill();
  }
}
export function drawTree(x: number, y: number, tm: number) {
  const X = (x + 0.5) * TS,
    Y = (y + 0.85) * TS,
    h = hash2(x, y, 3),
    sw = Math.sin(tm * 1.2 + x) * 1.5;
  ctx.fillStyle = "rgba(0,0,0,.25)";
  ctx.beginPath();
  ctx.ellipse(X, Y, 18, 6, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#5a3e26";
  ctx.fillRect(X - 3.5, Y - 20, 7, 20);
  const g = h < 0.5 ? ["#1f5f3a", "#2b7a48", "#3f9a5c"] : ["#24603c", "#307e4a", "#57a868"];
  ctx.fillStyle = g[0];
  ctx.beginPath();
  ctx.arc(X + sw, Y - 34, 21, 0, TAU);
  ctx.fill();
  ctx.fillStyle = g[1];
  ctx.beginPath();
  ctx.arc(X - 7 + sw, Y - 38, 15, 0, TAU);
  ctx.arc(X + 8 + sw, Y - 32, 14, 0, TAU);
  ctx.fill();
  ctx.fillStyle = g[2];
  ctx.beginPath();
  ctx.arc(X - 5 + sw, Y - 44, 8, 0, TAU);
  ctx.fill();
  if (h > 0.85) {
    ctx.fillStyle = "#ff9ab8";
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(X - 12 + hash2(x, y, i + 50) * 24 + sw, Y - 48 + hash2(x, y, i + 60) * 24, 2, 0, TAU);
      ctx.fill();
    }
  }
}
export function drawRock(x: number, y: number) {
  const X = (x + 0.5) * TS,
    Y = (y + 0.8) * TS,
    h = hash2(x, y, 4);
  ctx.fillStyle = "rgba(0,0,0,.22)";
  ctx.beginPath();
  ctx.ellipse(X, Y, 18, 6, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#7d7d84";
  ctx.beginPath();
  ctx.moveTo(X - 18, Y);
  ctx.lineTo(X - 14, Y - 20 - h * 8);
  ctx.lineTo(X + 2, Y - 28 - h * 6);
  ctx.lineTo(X + 17, Y - 16);
  ctx.lineTo(X + 18, Y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#9a9aa2";
  ctx.beginPath();
  ctx.moveTo(X - 14, Y - 20 - h * 8);
  ctx.lineTo(X + 2, Y - 28 - h * 6);
  ctx.lineTo(X + 4, Y - 14);
  ctx.lineTo(X - 8, Y - 10);
  ctx.closePath();
  ctx.fill();
}
export function drawStatue(X: number, Y: number, tm: number) {
  ctx.fillStyle = "rgba(0,0,0,.28)";
  ctx.beginPath();
  ctx.ellipse(X, Y, 26, 8, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#8b8a80";
  rr(ctx, -22 + X, Y - 14, 44, 14, 3);
  ctx.fill();
  ctx.fillStyle = "#a7a597";
  rr(ctx, X - 14, Y - 62, 28, 50, 6);
  ctx.fill();
  ctx.fillStyle = "#6f6e66";
  for (let i = 0; i < 4; i++) ctx.fillRect(X - 9, Y - 52 + i * 9, 18, 2);
  const g = ctx.createRadialGradient(X, Y - 72, 0, X, Y - 72, 24);
  g.addColorStop(0, "rgba(160,230,255,.95)");
  g.addColorStop(1, "rgba(160,230,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(X, Y - 72 + Math.sin(tm * 2) * 3, 24, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#e6fbff";
  ctx.save();
  ctx.translate(X, Y - 72 + Math.sin(tm * 2) * 3);
  ctx.rotate(tm);
  ctx.fillRect(-5, -5, 10, 10);
  ctx.restore();
}
export function drawChest(X: number, Y: number, open: any) {
  ctx.fillStyle = "rgba(0,0,0,.25)";
  ctx.beginPath();
  ctx.ellipse(X, Y, 16, 5, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#8a5a2a";
  rr(ctx, X - 14, Y - 18, 28, 18, 3);
  ctx.fill();
  ctx.fillStyle = "#f0c060";
  ctx.fillRect(X - 14, Y - 11, 28, 3);
  ctx.fillRect(X - 2, Y - 14, 4, 7);
  ctx.fillStyle = "#a06a32";
  rr(ctx, X - 15, Y - 26, 30, 10, 4);
  ctx.fill();
  ctx.fillStyle = "#f0c060";
  ctx.fillRect(X - 15, Y - 22, 30, 2);
  if (!open) {
    const t = performance.now() / 1000;
    ctx.fillStyle = `rgba(255,230,150,${0.25 + 0.2 * Math.sin(t * 3)})`;
    ctx.beginPath();
    ctx.arc(X, Y - 14, 24, 0, TAU);
    ctx.fill();
  }
}
export function drawPortal(X: number, Y: number, tm: number, col: string, label: string) {
  ctx.save();
  ctx.translate(X, Y - 34);
  ctx.fillStyle = "rgba(0,0,0,.3)";
  ctx.beginPath();
  ctx.ellipse(0, 34, 34, 10, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#5a5468";
  rr(ctx, -34, -38, 10, 72, 3);
  ctx.fill();
  rr(ctx, 24, -38, 10, 72, 3);
  ctx.fill();
  rr(ctx, -40, -48, 80, 12, 3);
  ctx.fill();
  const g = ctx.createRadialGradient(0, 0, 2, 0, 0, 30);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.4, col);
  g.addColorStop(1, rgba(col, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(0, 0, 22, 32, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 14 + Math.sin(tm * 3) * 3, 24, 0, 0, TAU);
  ctx.stroke();
  ctx.font = "700 13px 'Be Vietnam Pro',sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "rgba(0,0,0,.7)";
  ctx.lineWidth = 3;
  ctx.strokeText(label, 0, -58);
  ctx.fillText(label, 0, -58);
  ctx.restore();
}
export function drawArena(tm: number) {
  const B = GS.G.bounds,
    boss = GS.G.mode === "boss";
  ctx.fillStyle = boss ? "#132038" : "#1b1f3e";
  ctx.fillRect(-2000, -2000, B.w + 4000, B.h + 4000);
  ctx.fillStyle = boss ? "#1d3350" : "#2a2f58";
  ctx.fillRect(0, 0, B.w, B.h);
  for (let y = 0; y < B.h; y += 80)
    for (let x = 0; x < B.w; x += 80) {
      const h = hash2(x, y, 9);
      ctx.fillStyle = boss ? (h < 0.5 ? "#1f3756" : "#1b3150") : h < 0.5 ? "#2e3460" : "#292e57";
      ctx.fillRect(x + 2, y + 2, 76, 76);
    }
  // runic circle
  ctx.save();
  ctx.translate(B.w / 2, B.h / 2);
  ctx.strokeStyle = boss ? "rgba(100,180,255,.18)" : "rgba(240,192,96,.18)";
  ctx.lineWidth = 3;
  for (const r of [140, 240, 330]) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, TAU);
    ctx.stroke();
  }
  ctx.rotate(tm * 0.05);
  for (let i = 0; i < 12; i++) {
    ctx.rotate(TAU / 12);
    ctx.beginPath();
    ctx.moveTo(140, 0);
    ctx.lineTo(330, 0);
    ctx.stroke();
  }
  ctx.restore();
  // walls
  ctx.fillStyle = boss ? "#0c1626" : "#14183a";
  ctx.fillRect(0, 0, B.w, 60);
  ctx.fillRect(0, 0, 20, B.h);
  ctx.fillRect(B.w - 20, 0, 20, B.h);
  ctx.fillRect(0, B.h - 20, B.w, 20);
  for (let x = 60; x < B.w; x += 180) {
    const fl = Math.sin(tm * 8 + x) * 2;
    ctx.fillStyle = "#3a3550";
    ctx.fillRect(x - 6, 20, 12, 40);
    const g = ctx.createRadialGradient(x, 16, 0, x, 16, 26);
    g.addColorStop(0, boss ? "#9fd8ff" : "#ffd27a");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, 16 + fl, 26, 0, TAU);
    ctx.fill();
  }
  if (boss) {
    for (let i = 0; i < 10; i++) {
      const x = hash2(i, 1) * B.w,
        y = 100 + hash2(i, 2) * (B.h - 150);
      ctx.fillStyle = "rgba(80,160,230,.12)";
      ctx.beginPath();
      ctx.ellipse(x, y, 60 + Math.sin(tm + i) * 6, 20, 0, 0, TAU);
      ctx.fill();
    }
  }
}
