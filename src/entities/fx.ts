import { GS } from "../core/state";
import { TAU, rand } from "../core/util";

/* =========================================================
   FX
   ========================================================= */
export function fxText(x, y, txt, col, size = 16, crit = false) {
  GS.G.texts.push({ x: x + rand(-8, 8), y, txt, col, size: crit ? size * 1.35 : size, life: 0.9, max: 0.9, vy: -55 });
}
export function fxRing(x, y, r, col, life = 0.35, w = 4) {
  GS.G.fx.push({ k: "ring", x, y, r, col, life, max: life, w });
}
export function fxBurst(x, y, col, n = 10, sp = 140, size = 3) {
  for (let i = 0; i < n; i++) {
    const a = rand(0, TAU),
      v = rand(sp * 0.3, sp);
    GS.G.fx.push({
      k: "dot",
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - 40,
      col,
      life: rand(0.3, 0.7),
      max: 0.7,
      size: rand(size * 0.6, size * 1.3),
    });
  }
}
export function fxSlash(x, y, ang, range, col, w) {
  GS.G.fx.push({
    k: "slash",
    x,
    y,
    ang,
    r: range,
    col,
    life: 0.16,
    max: 0.16,
    w: w === "great" ? 10 : w === "spear" ? 5 : 7,
    arc: w === "spear" ? 0.35 : 1.1,
  });
}
export function fxBolt(x, y, col) {
  GS.G.fx.push({ k: "bolt", x, y, col, life: 0.25, max: 0.25, seed: Math.random() * 100 });
}
export function later(t, fn) {
  GS.G.later.push({ t, fn });
}
