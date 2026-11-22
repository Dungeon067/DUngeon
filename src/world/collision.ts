import { GS } from "../core/state";
import { MH, MW, SOLID, TS } from "../world/map";

/* =========================================================
   COLLISION
   ========================================================= */
export function solidTile(x: number, y: number, W: any) {
  const tx = Math.floor(x / TS),
    ty = Math.floor(y / TS);
  if (tx < 0 || ty < 0 || tx >= MW || ty >= MH) return true;
  return SOLID[W.m[ty * MW + tx]];
}
export function blockedAt(x: number, y: number, r: number, W: number) {
  return (
    solidTile(x - r, y, W) ||
    solidTile(x + r, y, W) ||
    solidTile(x, y - r * 0.6, W) ||
    solidTile(x, y + r * 0.4, W) ||
    solidTile(x - r * 0.7, y - r * 0.4, W) ||
    solidTile(x + r * 0.7, y - r * 0.4, W)
  );
}
export function blocked(x: number, y: number, r: number) {
  if (GS.G.map) return blockedAt(x, y, r, GS.G.map);
  const B = GS.G.bounds;
  return x - r < B.x + 20 || x + r > B.x + B.w - 20 || y - r < B.y + 60 || y > B.y + B.h - 20;
}
export function moveC(o: any, dx: number, dy: number, r: number) {
  if (!blocked(o.x + dx, o.y, r)) o.x += dx;
  if (!blocked(o.x, o.y + dy, r)) o.y += dy;
}
