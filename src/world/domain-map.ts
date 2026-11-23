import type { Domain } from "../data/puzzles-schema";
import { PZ } from "../data/puzzles";
import { MH, MW, TILE_H, TILE_TERRAIN, TL, computeLedges, miniCanvas } from "./map";
import type { PuzzleSpot } from "./map";
import { TERRAIN } from "../data/content";

/* Bản đồ bí cảnh (S23): các phòng xếp dọc từ dưới lên, ngăn bằng hàng cây có cửa 3 ô.
   Phòng 0 là sảnh vào (cửa ra), rồi các phòng câu đố, phòng đánh, phòng rương. */

export const ROOM_W = 13,
  ROOM_H = 9,
  DX = Math.floor(MW / 2);
const FLOOR: Record<string, number> = { fire: TL.SAND, water: TL.PATH, earth: TL.PATH, wind: TL.GRASS };
const ACCENT: Record<string, number> = { fire: TL.PATH, water: TL.FLOWER, earth: TL.SAND, wind: TL.FLOWER };

export interface Room {
  kind: "sanh" | "cau-do" | "tran" | "ruong";
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  /** Tâm phòng, đơn vị ô. */
  cx: number;
  cy: number;
  puzzle?: string;
}

export function genDomain(d: Domain) {
  const m = new Uint8Array(MW * MH).fill(TL.TREE);
  const set = (x: number, y: number, t: number) => (m[y * MW + x] = t);
  const kinds: Room["kind"][] = ["sanh", ...d.phong.map(() => "cau-do" as const), "tran", "ruong"];
  const rooms: Room[] = kinds.map((kind, i) => {
    const y1 = MH - 6 - i * (ROOM_H + 1),
      y0 = y1 - ROOM_H + 1,
      x0 = DX - (ROOM_W >> 1),
      x1 = DX + (ROOM_W >> 1);
    return { kind, x0, y0, x1, y1, cx: DX, cy: (y0 + y1) >> 1, puzzle: kind === "cau-do" ? d.phong[i - 1] : undefined };
  });
  const fl = FLOOR[d.nguyenTo] ?? TL.PATH,
    ac = ACCENT[d.nguyenTo] ?? TL.PATH;
  for (const r of rooms)
    for (let y = r.y0; y <= r.y1; y++)
      for (let x = r.x0; x <= r.x1; x++) set(x, y, (x + y) % 7 === 0 && x !== r.cx ? ac : fl);
  // góc phòng có đá để bớt trống trải
  for (const r of rooms)
    for (const [x, y] of [
      [r.x0, r.y0],
      [r.x1, r.y0],
      [r.x0, r.y1],
      [r.x1, r.y1],
    ] as const)
      set(x, y, TL.ROCK);
  const spots: PuzzleSpot[] = rooms
    .filter((r) => r.puzzle)
    .map((r) => {
      const ys = PZ[r.puzzle!]!.vatThe.map((v) => v.dy);
      return { id: r.puzzle!, x: r.cx, y: r.cy + 1, top: Math.min(...ys) };
    });
  const h = new Uint8Array(MW * MH),
    terrain = new Uint8Array(MW * MH),
    region = new Uint8Array(MW * MH);
  const ti = (id: string) =>
    Math.max(
      0,
      TERRAIN.terrains.findIndex((t) => t.id === id),
    );
  for (let i = 0; i < MW * MH; i++) {
    h[i] = TILE_H[m[i]!]!;
    terrain[i] = ti(TILE_TERRAIN[m[i]!]!);
  }
  const W = {
    m,
    h,
    terrain,
    region,
    ledges: computeLedges(h, m),
    statues: [] as any[],
    chests: [] as any[],
    camps: [] as any[],
    tower: null,
    gate: null,
    mini: miniCanvas(m),
    cx: DX,
    cy: rooms[0]!.cy,
    puz: spots,
    domain: d,
    rooms,
  };
  return W;
}

/** Mở cửa phía trên phòng i (hàng cây ngăn giữa phòng i và i+1). */
export function openDoor(W: ReturnType<typeof genDomain>, i: number) {
  const r = W.rooms[i];
  if (!r || i >= W.rooms.length - 1) return false;
  const y = r.y0 - 1;
  let changed = false;
  for (let x = DX - 1; x <= DX + 1; x++) {
    const k = y * MW + x;
    if (W.m[k] !== TL.TREE) continue;
    W.m[k] = TL.PATH;
    W.h[k] = 0;
    changed = true;
  }
  if (changed) {
    W.ledges = computeLedges(W.h, W.m);
    W.mini = miniCanvas(W.m);
  }
  return changed;
}
