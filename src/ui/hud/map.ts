import { GS } from "../../core/state";
import { $, TAU, dist } from "../../core/util";
import { Server } from "../../server/server";
import { MH, MW, TS } from "../../world/map";

/* Bản đồ nhỏ (góc trên trái) và bản đồ lớn có chú giải (chạm bản đồ nhỏ, nút Bản đồ hoặc phím M). */

const MARK = {
  statue: { c: "#9fe8ff", label: "Bia Đá: hồi phục, lưu điểm hồi sinh" },
  chest: { c: "#f0c060", label: "Rương chưa mở" },
  tower: { c: "#ffd27a", label: "Cổng Tháp Tinh Tú" },
  gate: { c: "#5aa0ff", label: "Hang Hắc Giao" },
  enemy: { c: "#ff6060", label: "Quái gần bạn" },
  you: { c: "#ffffff", label: "Vị trí của bạn" },
  target: { c: "#7dffb2", label: "Mục tiêu hiện tại" },
  ledge: { c: "#b9a27a", label: "Bệ đá, gờ cao (nhảy lên được)" },
} as const;

function targetPoints(): [number, number][] {
  const M = GS.G.map,
    t = GS.G.objTarget;
  if (!M || !t) return [];
  if (t === "statue") return M.statues.map((s: any) => [s.x + 0.5, s.y + 0.5]);
  if (t === "tower") return [[M.tower.x + 0.5, M.tower.y + 0.5]];
  if (t === "gate") return [[M.gate.x + 0.5, M.gate.y + 0.5]];
  if (t === "chest") {
    const p = GS.G.p;
    let best: any = null,
      bd = Infinity;
    M.chests.forEach((ch: any, i: number) => {
      if (Server.P.chests.includes(i as any) || Server.P.chests.includes(String(i))) return;
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
  P(M.tower.x + 0.5, M.tower.y + 0.5, MARK.tower.c, big ? 7 : 6);
  P(M.gate.x + 0.5, M.gate.y + 0.5, MARK.gate.c, big ? 7 : 6);
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

function drawBig() {
  const cv = $<HTMLCanvasElement>("bigMapCv"),
    c = cv.getContext("2d")!,
    S = cv.width,
    sc = S / MW,
    p = GS.G.p,
    M = GS.G.map;
  c.clearRect(0, 0, S, S);
  c.imageSmoothingEnabled = false;
  c.drawImage(M.mini, 0, 0, MW * sc, MH * sc);
  const at = (x: number, y: number) => [x * sc, y * sc] as const;
  const P = (x: number, y: number, col: string, r = 4) => {
    const [X, Y] = at(x, y);
    c.fillStyle = col;
    c.beginPath();
    c.arc(X, Y, r, 0, TAU);
    c.fill();
  };
  c.fillStyle = MARK.ledge.c;
  for (const l of M.ledges ?? []) c.fillRect(l.x * sc + sc * 0.3, l.y * sc + sc * 0.3, sc * 0.4, sc * 0.4);
  const mark = (x: number, y: number) => {
    const [X, Y] = at(x, y);
    c.arc(X, Y, 11, 0, TAU);
    c.stroke();
  };
  drawMarks(c, P, mark, true);
  P(p.x / TS, p.y / TS, "#000", 7);
  P(p.x / TS, p.y / TS, MARK.you.c, 5);
}

let lastFocus: HTMLElement | null = null;
export function toggleBigMap(force?: boolean) {
  const el = $("bigMap");
  const open = force ?? el.hidden;
  if (open) {
    if (!GS.G?.map || GS.paused) return;
    lastFocus = document.activeElement as HTMLElement | null;
    $("bigMapLegend").innerHTML = Object.values(MARK)
      .map((m) => `<li><i style="--c:${m.c}"></i>${m.label}</li>`)
      .join("");
    drawBig();
    el.hidden = false;
    GS.paused = true;
    GS.overlay = "map";
    $("bigMapClose").focus();
  } else if (GS.overlay === "map") {
    el.hidden = true;
    GS.paused = false;
    GS.overlay = null;
    lastFocus?.focus?.();
  }
}
export function initBigMap() {
  $("bigMapClose").addEventListener("click", () => toggleBigMap(false));
  $("bigMap").addEventListener("click", (e) => {
    if (e.target === $("bigMap")) toggleBigMap(false);
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && GS.overlay === "map") {
      e.stopPropagation();
      toggleBigMap(false);
    }
  });
}
