import { fbm, hash2 } from "../core/util";

/* =========================================================
   WORLD GENERATION
   ========================================================= */
export const TS = 40,
  MW = 110,
  MH = 110;
export const TL = { GRASS: 0, WATER: 1, TREE: 2, ROCK: 3, PATH: 4, SAND: 5, FLOWER: 6, DEEP: 7, BRIDGE: 8 };
export const SOLID = [false, true, true, true, false, false, false, true, false];
export function genWorld() {
  const m = new Uint8Array(MW * MH),
    cx = MW / 2,
    cy = MH / 2;
  for (let y = 0; y < MH; y++)
    for (let x = 0; x < MW; x++) {
      const d = Math.hypot(x - cx, y - cy) / (MW / 2);
      const e = fbm(x * 0.055, y * 0.055, 11) + 0.42 - d * d * 0.75;
      let t = TL.GRASS;
      if (e < 0.22) t = TL.DEEP;
      else if (e < 0.32) t = TL.WATER;
      else if (e < 0.355) t = TL.SAND;
      else {
        const f = fbm(x * 0.09 + 40, y * 0.09 + 40, 23),
          r = fbm(x * 0.08 + 90, y * 0.08 + 10, 31);
        if (r > 0.66) t = TL.ROCK;
        else if (f > 0.6) t = TL.TREE;
        else if (hash2(x, y, 5) < 0.05) t = TL.FLOWER;
      }
      if (x < 2 || y < 2 || x >= MW - 2 || y >= MH - 2) t = TL.DEEP;
      m[y * MW + x] = t;
    }
  const set = (x: number, y: number, t: any) => {
    if (x > 1 && y > 1 && x < MW - 2 && y < MH - 2) m[y * MW + x] = t;
  };
  const get = (x: number, y: number) => m[y * MW + x];
  for (let y = -6; y <= 6; y++)
    for (let x = -6; x <= 6; x++)
      if (x * x + y * y <= 36) set(cx + x, cy + y, hash2(x, y, 2) < 0.07 ? TL.FLOWER : TL.GRASS);
  // POIs: try to put on land at angles
  const poi = [];
  function landNear(ang: number, rad: number) {
    for (let k = 0; k < 30; k++) {
      const a = ang + (k % 2 ? 1 : -1) * k * 0.05,
        rd = rad - k * 0.6;
      const x = Math.round(cx + Math.cos(a) * rd),
        y = Math.round(cy + Math.sin(a) * rd);
      const t = get(x, y);
      if (t !== TL.DEEP && t !== TL.WATER) return { x, y };
    }
    return { x: Math.round(cx + Math.cos(ang) * rad * 0.5), y: Math.round(cy + Math.sin(ang) * rad * 0.5) };
  }
  const statues = [{ x: cx + 2, y: cy - 3 }, landNear(0.6, 30), landNear(2.6, 32), landNear(4.4, 30)];
  const tower = landNear(1.6, 26),
    gate = landNear(5.4, 40);
  function carve(ax: number, ay: number, bx: number, by: number, wid: number) {
    let x = ax,
      y = ay;
    let guard = 0;
    while ((x !== bx || y !== by) && guard++ < 600) {
      if (Math.abs(bx - x) > Math.abs(by - y)) x += Math.sign(bx - x);
      else y += Math.sign(by - y);
      if (hash2(x, y, 77) < 0.25) {
        if (Math.abs(bx - x) > 0 && hash2(x, y, 78) < 0.5) x += Math.sign(bx - x);
      }
      for (let oy = -wid; oy <= wid; oy++)
        for (let ox = -wid; ox <= wid; ox++) {
          const tt = get(x + ox, y + oy);
          if (tt === TL.WATER || tt === TL.DEEP) set(x + ox, y + oy, TL.BRIDGE);
          else if (SOLID[tt] || tt === TL.GRASS || tt === TL.FLOWER || tt === TL.SAND) set(x + ox, y + oy, TL.PATH);
        }
    }
  }
  for (const p of [...statues.slice(1), tower, gate]) carve(cx, cy, p.x, p.y, 0);
  carve(statues[1].x, statues[1].y, tower.x, tower.y, 0);
  for (const p of [...statues, tower, gate])
    for (let y = -2; y <= 2; y++)
      for (let x = -2; x <= 2; x++) {
        const tt = get(p.x + x, p.y + y);
        if (tt !== TL.PATH && tt !== TL.BRIDGE) set(p.x + x, p.y + y, TL.GRASS);
      }
  // reachability
  const reach = new Uint8Array(MW * MH),
    q = [[cx, cy]];
  reach[cy * MW + cx] = 1;
  while (q.length) {
    const [x, y] = q.pop()!;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx,
        ny = y + dy,
        i = ny * MW + nx;
      if (nx < 0 || ny < 0 || nx >= MW || ny >= MH || reach[i] || SOLID[m[i]]) continue;
      reach[i] = 1;
      q.push([nx, ny]);
    }
  }
  // camps and chests
  const camps = [],
    chests = [];
  let s = 12345;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const far = (p: any, list: any, dmin: number) => list.every((o: any) => Math.hypot(o.x - p.x, o.y - p.y) >= dmin);
  const allPoi = [...statues, tower, gate];
  for (let tries = 0; tries < 4000 && camps.length < 22; tries++) {
    const x = 2 + Math.floor(rnd() * (MW - 4)),
      y = 2 + Math.floor(rnd() * (MH - 4));
    const d = Math.hypot(x - cx, y - cy);
    if (d < 11 || !reach[y * MW + x]) continue;
    const p = { x, y };
    if (!far(p, camps, 9) || !far(p, allPoi, 6)) continue;
    camps.push(p);
  }
  for (let tries = 0; tries < 4000 && chests.length < 26; tries++) {
    const x = 2 + Math.floor(rnd() * (MW - 4)),
      y = 2 + Math.floor(rnd() * (MH - 4));
    if (!reach[y * MW + x] || Math.hypot(x - cx, y - cy) < 6) continue;
    const p = { x, y };
    if (!far(p, chests, 7) || !far(p, allPoi, 3)) continue;
    chests.push(p);
  }
  // minimap
  const mini = document.createElement("canvas");
  mini.width = MW;
  mini.height = MH;
  const mc = mini.getContext("2d")!;
  const id = mc.createImageData(MW, MH);
  const MC: any = {
    0: [70, 130, 80],
    1: [50, 120, 180],
    2: [34, 88, 52],
    3: [120, 118, 110],
    4: [190, 160, 110],
    5: [215, 196, 140],
    6: [80, 140, 90],
    7: [30, 80, 140],
    8: [150, 110, 70],
  };
  for (let i = 0; i < MW * MH; i++) {
    const c = MC[m[i]];
    id.data[i * 4] = c[0];
    id.data[i * 4 + 1] = c[1];
    id.data[i * 4 + 2] = c[2];
    id.data[i * 4 + 3] = 255;
  }
  mc.putImageData(id, 0, 0);
  return { m, statues, tower, gate, camps, chests, mini, cx, cy };
}
