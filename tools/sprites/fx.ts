/** Hiệu ứng pixel theo nguyên tố: mũi tên, hạt, vệt lướt, vòng nở, xoáy nộ. */
import { Grid, type Material, mat } from "./pixel";

export interface FxDef {
  w: number;
  h: number;
  frames: Grid[];
  ms: number;
  loop: boolean;
}

export function fxMaterials(base: string, glow: string): Material[] {
  const m: Material[] = [];
  m[0] = mat("#000000");
  m[1] = mat(base, { noLine: true });
  m[2] = mat(glow, { noLine: true, flat: true });
  m[3] = mat("#ffffff", { noLine: true, flat: true });
  m[4] = mat(base, { noLine: true, flat: true, alpha: 150 });
  m[5] = mat(base, { k: 1.2 });
  return m;
}

function arrow(): Grid {
  const g = new Grid(20, 7);
  g.line(2, 3, 14, 3, 5, 1);
  g.line(1, 3, 13, 3, 5, 1, 2);
  g.poly(
    [
      [14, 0],
      [19, 3],
      [14, 6],
      [15, 3],
    ],
    5,
  );
  g.set(17, 3, 3);
  g.stamp(0, 1, ["#.#", ".#.", "#.#"], { "#": [2] });
  return g;
}

function flake(i: number): Grid {
  const g = new Grid(7, 7);
  const rows = [
    ["...#...", ".#.#.#.", "..###..", "###.###", "..###..", ".#.#.#.", "...#..."],
    ["...#...", "...#...", ".#.#.#.", "#######", ".#.#.#.", "...#...", "...#..."],
    [".......", "..#.#..", "...#...", ".##.##.", "...#...", "..#.#..", "......."],
  ][i];
  g.stamp(0, 0, rows, { "#": [2] });
  g.set(3, 3, 3);
  return g;
}

function streak(i: number): Grid {
  const g = new Grid(28, 12);
  const len = [26, 22, 14, 7][i],
    a = 1 + i;
  for (let k = 0; k < 3; k++) {
    const y = 3 + k * 3;
    g.line(27 - len + k * 2, y, 27 - k, y, k === 1 ? 2 : 4);
  }
  if (i < 2) for (let k = 0; k < 4; k++) g.set(4 + k * 6 + a, 1 + ((k * 5) % 10), 3);
  return g;
}

function ring(i: number, n: number): Grid {
  const g = new Grid(40, 40);
  const r = 4 + (i / (n - 1)) * 15;
  for (let a = 0; a < 48; a++) {
    const t = (a / 48) * Math.PI * 2;
    const x = 20 + Math.cos(t) * r,
      y = 20 + Math.sin(t) * r * 0.55;
    g.set(x, y, i < n - 2 ? 2 : 4);
    if (a % 6 === 0 && i < n - 1) {
      g.line(x, y, 20 + Math.cos(t) * (r + 3), 20 + Math.sin(t) * (r + 3) * 0.55, 5);
      g.set(20 + Math.cos(t) * (r + 3), 20 + Math.sin(t) * (r + 3) * 0.55, 3);
    }
  }
  return g;
}

function swirl(i: number, n: number): Grid {
  const g = new Grid(56, 40);
  for (let k = 0; k < 3; k++)
    for (let a = 0; a < 26; a++) {
      const t = (a / 26) * Math.PI * 1.4 + (i / n) * Math.PI * 2 + (k * Math.PI * 2) / 3;
      const r = 10 + k * 5 + a * 0.3;
      g.set(28 + Math.cos(t) * r, 28 + Math.sin(t) * r * 0.4 - a * 0.25, a > 20 ? 3 : k === 1 ? 2 : 4);
    }
  for (let k = 0; k < 6; k++) {
    const t = (k / 6) * Math.PI * 2 + i * 0.7;
    g.stamp(Math.round(28 + Math.cos(t) * 20) - 1, Math.round(22 + Math.sin(t) * 8) - 1, [".#.", "###", ".#."], { "#": [2] });
  }
  return g;
}

export function iceFx(): Record<string, FxDef> {
  return {
    arrow: { w: 20, h: 7, frames: [arrow()], ms: 100, loop: true },
    snow: { w: 7, h: 7, frames: [0, 1, 2].map(flake), ms: 120, loop: true },
    dash: { w: 28, h: 12, frames: [0, 1, 2, 3].map(streak), ms: 50, loop: false },
    bloom: { w: 40, h: 40, frames: [0, 1, 2, 3, 4, 5].map((i) => ring(i, 6)), ms: 60, loop: false },
    swirl: { w: 56, h: 40, frames: [0, 1, 2, 3, 4, 5].map((i) => swirl(i, 6)), ms: 80, loop: true },
  };
}
