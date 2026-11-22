import { GS } from "../core/state";
import { TAU, rand } from "../core/util";
import type { CharFx, ParticleKind, TrailKind } from "../data/schema";

/* =========================================================
   FX
   ========================================================= */
export function fxText(x: number, y: number, txt: string, col: string, size = 16, crit = false) {
  GS.G.texts.push({ x: x + rand(-8, 8), y, txt, col, size: crit ? size * 1.35 : size, life: 0.9, max: 0.9, vy: -55 });
}
export function fxRing(x: number, y: number, r: number, col: string, life = 0.35, w = 4) {
  GS.G.fx.push({ k: "ring", x, y, r, col, life, max: life, w });
}
export function fxBurst(x: number, y: number, col: string, n = 10, sp = 140, size = 3) {
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
export function fxSlash(
  x: number,
  y: number,
  ang: number,
  range: number,
  col: string,
  w: any,
  trail: TrailKind = "arc",
  core = "#ffffff",
) {
  const long = trail === "thrust" || w === "spear";
  GS.G.fx.push({
    k: "slash",
    x,
    y,
    ang,
    r: range,
    col,
    core,
    trail: long ? "thrust" : trail,
    life: trail === "heavy" ? 0.22 : 0.18,
    max: trail === "heavy" ? 0.22 : 0.18,
    w: w === "great" ? 11 : long ? 6 : 7,
    arc: long ? 0.35 : trail === "crescent" ? 1.3 : 1.1,
    flip: Math.random() < 0.5 ? -1 : 1,
  });
}
/** Hạt nguyên tố riêng của từng nhân vật (lông vũ lửa, giọt nước, lá, tia sét...). */
export function fxParticles(x: number, y: number, F: CharFx, n = 6, sp = 160) {
  if (GS.G.fx.length > 240) n = Math.min(n, 2);
  const P = PARTICLE[F.particle];
  for (let i = 0; i < n; i++) {
    const a = rand(0, TAU),
      v = rand(sp * 0.3, sp) * P.sp;
    GS.G.fx.push({
      k: "pt",
      pk: F.particle,
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - P.lift,
      g: P.g,
      rot: rand(0, TAU),
      vr: rand(-P.spin, P.spin),
      col: Math.random() < 0.35 ? F.c2 : F.c,
      life: rand(0.35, 0.75) * P.life,
      max: 0.75 * P.life,
      size: rand(2.5, 4.5) * P.size,
    });
  }
}
const PARTICLE: Record<
  ParticleKind,
  { sp: number; lift: number; g: number; spin: number; life: number; size: number }
> = {
  ember: { sp: 0.8, lift: 70, g: -60, spin: 2, life: 1, size: 0.9 },
  drop: { sp: 0.9, lift: 90, g: 420, spin: 0, life: 0.9, size: 0.9 },
  leaf: { sp: 1.1, lift: 30, g: 40, spin: 9, life: 1.2, size: 1.1 },
  spark: { sp: 1.5, lift: 0, g: 0, spin: 0, life: 0.5, size: 1 },
  shard: { sp: 1, lift: 120, g: 520, spin: 8, life: 0.9, size: 1.1 },
  petal: { sp: 0.8, lift: 40, g: 30, spin: 6, life: 1.3, size: 1 },
  lantern: { sp: 0.6, lift: 50, g: -80, spin: 1, life: 1.2, size: 1.2 },
  feather: { sp: 0.9, lift: 40, g: 25, spin: 5, life: 1.3, size: 1.2 },
  snow: { sp: 0.7, lift: 20, g: 50, spin: 3, life: 1.3, size: 0.9 },
  mist: { sp: 0.5, lift: 20, g: -20, spin: 0, life: 1.1, size: 2 },
};
export function fxBolt(x: number, y: number, col: string) {
  GS.G.fx.push({ k: "bolt", x, y, col, life: 0.25, max: 0.25, seed: Math.random() * 100 });
}
export function later(t: any, fn: any) {
  GS.G.later.push({ t, fn });
}
