import { GS } from "../../core/state";
import { $, TAU, dist } from "../../core/util";
import { Server } from "../../server/server";
import { MH, MW, TS } from "../../world/map";
import { isMiniTarget, miniTargetXY, puzzleMarks } from "../../world/puzzle-marks";

/* Bản đồ nhỏ (góc trên trái). Bản đồ lớn là màn "map" của menu S10 (src/ui/menu/screens/map.ts). */

const MARK = {
  statue: { c: "#9fe8ff", label: "Bia Đá: hồi phục, lưu điểm hồi sinh" },
  chest: { c: "#f0c060", label: "Rương chưa mở" },
  tower: { c: "#ffd27a", label: "Cổng Tháp Tinh Tú" },
  gate: { c: "#5aa0ff", label: "Hang Hắc Giao" },
  enemy: { c: "#ff6060", label: "Quái gần bạn" },
  you: { c: "#ffffff", label: "Vị trí của bạn" },
  target: { c: "#7dffb2", label: "Mục tiêu hiện tại" },
  ledge: { c: "#b9a27a", label: "Bệ đá, gờ cao (nhảy lên được)" },
  puzzle: { c: "#c9a6ff", label: "Câu đố nguyên tố (xám: đã giải)" },
  domain: { c: "#ff9a5a", label: "Cửa bí cảnh (màu nguyên tố, xám: đã xong)" },
  quest: { c: "#ffe27a", label: "Quest mini" },
} as const;

function targetPoints(): [number, number][] {
  const M = GS.G.map,
    t = GS.G.objTarget;
  if (!M || !t) return [];
  if (isMiniTarget(t)) {
    const xy = miniTargetXY(t, M);
    return xy ? [xy] : [];
  }
  if (t === "statue") return M.statues.map((s: any) => [s.x + 0.5, s.y + 0.5]);
  if (t === "tower") return M.tower ? [[M.tower.x + 0.5, M.tower.y + 0.5]] : [];
  if (t === "gate") return M.gate ? [[M.gate.x + 0.5, M.gate.y + 0.5]] : [];
  if (t === "chest") {
    const p = GS.G.p;
    let best: any = null,
      bd = Infinity;
    M.chests.forEach((ch: any, i: number) => {
      if (Server.P.chests.includes(i)) return;
      const d = dist(ch.x, ch.y, p.x / TS, p.y / TS);
      if (d < bd) {
        bd = d;
        best = ch;
      }
    });
    return best ? [[best.x + 0.5, best.y + 0.5]] : [];
  }
  return [];
}

type Dot = (x: number, y: number, col: string, r?: number) => void;
function drawMarks(c: CanvasRenderingContext2D, P: Dot, mark: (x: number, y: number) => void, big: boolean) {
  const M = GS.G.map,
    p = GS.G.p;
  M.statues.forEach((s: any) => P(s.x + 0.5, s.y + 0.5, MARK.statue.c, big ? 6 : 5));
  M.chests.forEach((ch: any, i: any) => {
    if (!Server.P.chests.includes(i)) P(ch.x + 0.5, ch.y + 0.5, MARK.chest.c, big ? 3.5 : 3);
  });
  if (M.tower) P(M.tower.x + 0.5, M.tower.y + 0.5, MARK.tower.c, big ? 7 : 6);
  if (M.gate) P(M.gate.x + 0.5, M.gate.y + 0.5, MARK.gate.c, big ? 7 : 6);
  for (const k of puzzleMarks(M)) {
    if (k.kind === "quest" && k.done) continue;
    const r = k.kind === "domain" ? 5 : k.kind === "quest" ? 4 : 3;
    P(k.x, k.y, "#000", r + 1.5);
    P(k.x, k.y, k.col, r);
  }
  for (const e of GS.G.enemies) if (!e.dead && dist(e.x, e.y, p.x, p.y) < 900) P(e.x / TS, e.y / TS, MARK.enemy.c, 2.2);
  c.lineWidth = 2;
  for (const [x, y] of targetPoints()) {
    c.strokeStyle = MARK.target.c;
    c.beginPath();
    mark(x, y);
  }
}

let miniCtx: CanvasRenderingContext2D | null = null;
export function drawMini() {
  miniCtx ??= $<HTMLCanvasElement>("mini").getContext("2d")!;
  const c = miniCtx,
    S = 200,
    p = GS.G.p;
  c.clearRect(0, 0, S, S);
  c.save();
  c.beginPath();
  c.arc(S / 2, S / 2, S / 2, 0, TAU);
  c.clip();
  c.fillStyle = "#0a0f22";
  c.fillRect(0, 0, S, S);
  if (GS.G.map) {
    const sc = 4,
      ptx = p.x / TS,
      pty = p.y / TS;
    c.imageSmoothingEnabled = false;
    c.drawImage(GS.G.map.mini, S / 2 - ptx * sc, S / 2 - pty * sc, MW * sc, MH * sc);
    const at = (x: number, y: number) => [S / 2 + (x - ptx) * sc, S / 2 + (y - pty) * sc] as const;
    const P = (x: number, y: number, col: string, r = 4) => {
      const [X, Y] = at(x, y);
      c.fillStyle = col;
      c.beginPath();
      c.arc(X, Y, r, 0, TAU);
      c.fill();
    };
    const mark = (x: number, y: number) => {
      let [X, Y] = at(x, y);
      const dx = X - S / 2,
        dy = Y - S / 2,
        L = Math.hypot(dx, dy);
      if (L > S / 2 - 12) {
        X = S / 2 + (dx / L) * (S / 2 - 12);
        Y = S / 2 + (dy / L) * (S / 2 - 12);
      }
      c.arc(X, Y, 8 + Math.sin(performance.now() / 200) * 1.5, 0, TAU);
      c.stroke();
    };
    drawMarks(c, P, mark, false);
  } else {
    const B = GS.G.bounds,
      sc = S / Math.max(B.w, B.h);
    c.fillStyle = "#2a2f58";
    c.fillRect(0, 0, B.w * sc, B.h * sc);
    for (const e of GS.G.enemies)
      if (!e.dead) {
        c.fillStyle = "#ff6060";
        c.beginPath();
        c.arc(e.x * sc, e.y * sc, e.isBoss ? 7 : 3, 0, TAU);
        c.fill();
      }
    c.fillStyle = "#fff";
    c.beginPath();
    c.arc(p.x * sc, p.y * sc, 4, 0, TAU);
    c.fill();
    c.restore();
    return;
  }
  c.fillStyle = "#fff";
  c.save();
  c.translate(S / 2, S / 2);
  c.rotate(Math.atan2(p.dirY, p.dirX) + Math.PI / 2);
  c.beginPath();
  c.moveTo(0, -8);
  c.lineTo(6, 6);
  c.lineTo(-6, 6);
  c.closePath();
  c.fill();
  c.restore();
  c.restore();
}
