import { FOG, FOG_N } from "../../server/server";

/** Đổi neo bản đồ trong YAML (start, center, statue:i, tower, gate, dir:góc:ô) sang tọa độ ô. */
export function anchorXY(at: string, M: any): [number, number] | null {
  if (!M) return null;
  if (at === "start") return M.statues[0] ? [M.statues[0].x + 0.5, M.statues[0].y + 0.5] : null;
  if (at === "center") return [M.cx, M.cy];
  if (at === "tower") return [M.tower.x + 0.5, M.tower.y + 0.5];
  if (at === "gate") return [M.gate.x + 0.5, M.gate.y + 0.5];
  const st = /^statue:(\d)$/.exec(at);
  if (st) {
    const s = M.statues[Number(st[1])];
    return s ? [s.x + 0.5, s.y + 0.5] : null;
  }
  const d = /^dir:(-?\d+):(\d+)$/.exec(at);
  if (d) {
    const a = (Number(d[1]) * Math.PI) / 180;
    return [M.cx + Math.cos(a) * Number(d[2]), M.cy + Math.sin(a) * Number(d[2])];
  }
  return null;
}

/** Ô sương chứa tọa độ ô (x, y). */
export const fogIdx = (x: number, y: number) => {
  const fx = Math.floor(x / FOG),
    fy = Math.floor(y / FOG);
  return fx < 0 || fy < 0 || fx >= FOG_N || fy >= FOG_N ? -1 : fy * FOG_N + fx;
};
export const seen = (fog: string, x: number, y: number) => fog[fogIdx(x, y)] === "1";
