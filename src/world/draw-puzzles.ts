import { GS } from "../core/state";
import { ctx } from "../core/canvas";
import { TAU, rgba, rr } from "../core/util";
import { EL } from "../data/content";
import { ELEMENT_ICON, iconSvg } from "../ui/icons/icons";
import { PUZZLES } from "../data/puzzles";
import { Server } from "../server/server";
import { objView, type PObj, type PState } from "./puzzle-core";
import type { Npc, Portal } from "./puzzles";
import { drawChest, drawPortal } from "./draw";
import { DX } from "./domain-map";
import { TS } from "./map";

/* Vẽ vật thể câu đố, ký hiệu nguyên tố mờ khi đến gần, NPC quest mini, cửa và rương bí cảnh (S23). */

type Q = { y: number; f: () => void }[];

const shadow = (X: number, Y: number, w: number) => {
  ctx.fillStyle = "rgba(0,0,0,.25)";
  ctx.beginPath();
  ctx.ellipse(X, Y, w, w * 0.32, 0, 0, TAU);
  ctx.fill();
};

/** Biểu tượng nguyên tố của bộ icon trong game (SVG trắng), vẽ lên canvas. */
const ICON_IMG: Record<string, HTMLImageElement> = {};
function elIcon(el: string): HTMLImageElement | null {
  const name = ELEMENT_ICON[el];
  if (!name || typeof Image === "undefined") return null;
  let im = ICON_IMG[el];
  if (!im) {
    im = ICON_IMG[el] = new Image();
    im.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(
        iconSvg(name, { size: 48 })
          .replace("<svg ", `<svg xmlns="http://www.w3.org/2000/svg" `)
          .replace(/currentColor/g, "#fff"),
      );
  }
  return im.complete && im.naturalWidth ? im : null;
}
function drawIcon(el: string, X: number, Y: number, sz: number) {
  const im = elIcon(el);
  if (im) ctx.drawImage(im, X - sz / 2, Y - sz / 2, sz, sz);
}
/** Ký hiệu nguyên tố phát sáng mờ trên vật thể chưa giải khi người chơi đứng gần. */
function glyph(o: PObj, tm: number, a: number) {
  const el = o.def.bieuTuong,
    c = EL[el]?.c ?? "#fff";
  const X = o.x,
    Y = o.y - 52 + Math.sin(tm * 2 + o.i) * 2;
  ctx.fillStyle = rgba(c, 0.18 * a + 0.12 * a * Math.sin(tm * 3 + o.i));
  ctx.beginPath();
  ctx.arc(X, Y, 13, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = rgba(c, 0.6 * a);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  const ga = ctx.globalAlpha;
  ctx.globalAlpha = ga * 0.85 * a;
  drawIcon(el, X, Y, 16);
  ctx.globalAlpha = ga;
}

function flame(X: number, Y: number, tm: number, s = 1, c = "#ff8a3d") {
  const f = 1 + Math.sin(tm * 14 + X) * 0.12;
  ctx.fillStyle = rgba(c, 0.35);
  ctx.beginPath();
  ctx.arc(X, Y - 6 * s, 14 * s, 0, TAU);
  ctx.fill();
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.ellipse(X, Y - 6 * s, 5 * s, 10 * s * f, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#ffe27a";
  ctx.beginPath();
  ctx.ellipse(X, Y - 4 * s, 2.5 * s, 5 * s * f, 0, 0, TAU);
  ctx.fill();
}

export function drawObj(o: PObj, tm: number) {
  const v = objView(o, TS),
    X = v.x,
    Y = v.y,
    on = v.xong,
    mid = v.trangThai > 0 && !v.xong;
  ctx.save();
  if (o.flash > 0) {
    ctx.fillStyle = `rgba(255,255,255,${o.flash * 0.35})`;
    ctx.beginPath();
    ctx.arc(X, Y - 14, 30, 0, TAU);
    ctx.fill();
  }
  switch (o.loai) {
    case "den":
    case "denLan": {
      shadow(X, Y, 12);
      ctx.fillStyle = "#7d7a72";
      rr(ctx, X - 7, Y - 26, 14, 26, 3);
      ctx.fill();
      ctx.fillStyle = "#5c5a54";
      rr(ctx, X - 11, Y - 32, 22, 8, 3);
      ctx.fill();
      if (o.loai === "denLan") {
        ctx.fillStyle = "#c04a3a";
        rr(ctx, X - 6, Y - 44, 12, 12, 4);
        ctx.fill();
      }
      if (on || mid) flame(X, Y - (o.loai === "denLan" ? 40 : 32), tm, on ? 1 : 0.6, mid ? "#ffb070" : "#ff8a3d");
      if (on && o.giay) {
        ctx.strokeStyle = "rgba(255,230,150,.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(X, Y - 14, 18, -Math.PI / 2, -Math.PI / 2 + (TAU * Math.max(0, o.t)) / o.giay);
        ctx.stroke();
      }
      break;
    }
    case "gai":
    case "suong":
    case "lua":
    case "tuong":
    case "bangChan": {
      if (on) {
        if (o.loai === "tuong") {
          ctx.fillStyle = "#8a857a";
          for (let k = 0; k < 4; k++) {
            ctx.beginPath();
            ctx.arc(X - 14 + k * 9, Y - 3 + (k % 2) * 3, 4, 0, TAU);
            ctx.fill();
          }
        } else if (o.loai === "gai") {
          ctx.fillStyle = "#2a2018";
          ctx.beginPath();
          ctx.ellipse(X, Y - 2, 16, 5, 0, 0, TAU);
          ctx.fill();
        } else if (o.loai === "bangChan") {
          ctx.fillStyle = "rgba(160,220,255,.35)";
          ctx.beginPath();
          ctx.ellipse(X, Y - 2, 18, 6, 0, 0, TAU);
          ctx.fill();
        }
        break;
      }
      shadow(X, Y, 20);
      if (o.loai === "gai") {
        ctx.fillStyle = "#3e5a2a";
        for (let k = 0; k < 5; k++) {
          ctx.beginPath();
          ctx.arc(X - 14 + k * 7, Y - 12 - (k % 2) * 6, 9, 0, TAU);
          ctx.fill();
        }
        ctx.strokeStyle = "#8a6a3a";
        ctx.lineWidth = 1.5;
        for (let k = 0; k < 6; k++) {
          ctx.beginPath();
          ctx.moveTo(X - 16 + k * 6, Y - 4);
          ctx.lineTo(X - 12 + k * 6, Y - 24);
          ctx.stroke();
        }
      } else if (o.loai === "suong") {
        for (let k = 0; k < 4; k++) {
          ctx.fillStyle = `rgba(150,${200 + k * 10},120,${0.32 + 0.08 * Math.sin(tm * 2 + k)})`;
          ctx.beginPath();
          ctx.arc(X - 12 + k * 8 + Math.sin(tm + k) * 3, Y - 16 - (k % 2) * 8, 14, 0, TAU);
          ctx.fill();
        }
      } else if (o.loai === "lua") {
        for (let k = -1; k <= 1; k++) flame(X + k * 11, Y - 2, tm + k, 1.1);
      } else if (o.loai === "tuong") {
        ctx.fillStyle = "#8a857a";
        rr(ctx, X - 20, Y - 34, 40, 34, 3);
        ctx.fill();
        ctx.strokeStyle = "#4a4740";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(X - 4, Y - 34);
        ctx.lineTo(X + 3, Y - 20);
        ctx.lineTo(X - 6, Y - 10);
        ctx.lineTo(X + 2, Y);
        ctx.stroke();
      } else {
        ctx.fillStyle = "rgba(170,225,255,.85)";
        ctx.beginPath();
        ctx.moveTo(X - 18, Y);
        ctx.lineTo(X - 12, Y - 30);
        ctx.lineTo(X, Y - 38);
        ctx.lineTo(X + 14, Y - 26);
        ctx.lineTo(X + 18, Y);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.7)";
        ctx.stroke();
      }
      break;
    }
    case "bon":
    case "bonHoi": {
      shadow(X, Y, 18);
      ctx.fillStyle = "#86827a";
      ctx.beginPath();
      ctx.ellipse(X, Y - 8, 18, 9, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = on || mid ? "#3aa6f5" : "#5a564e";
      ctx.beginPath();
      ctx.ellipse(X, Y - 10, 13, 6, 0, 0, TAU);
      ctx.fill();
      if (on && o.loai === "bonHoi") {
        for (let k = 0; k < 3; k++) {
          const a = (tm * 0.8 + k / 3) % 1;
          ctx.fillStyle = `rgba(230,240,255,${0.5 * (1 - a)})`;
          ctx.beginPath();
          ctx.arc(X - 6 + k * 6, Y - 16 - a * 30, 6 + a * 6, 0, TAU);
          ctx.fill();
        }
        ctx.fillStyle = "#a59f90";
        rr(ctx, X - 14, Y - 54, 28, 8, 3);
        ctx.fill();
      }
      break;
    }
    case "mam": {
      shadow(X, Y, 12);
      ctx.fillStyle = "#6a4a2a";
      ctx.beginPath();
      ctx.ellipse(X, Y - 3, 12, 5, 0, 0, TAU);
      ctx.fill();
      if (on) {
        ctx.fillStyle = "#5fbf5a";
        for (let k = 0; k < 4; k++) {
          ctx.beginPath();
          ctx.ellipse(X + (k - 1.5) * 9, Y - 8 - k * 2, 9, 4, (k - 1.5) * 0.4, 0, TAU);
          ctx.fill();
        }
      } else {
        ctx.strokeStyle = "#9a8a5a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(X, Y - 4);
        ctx.quadraticCurveTo(X + 4, Y - 12, X - 2, Y - 16);
        ctx.stroke();
      }
      break;
    }
    case "cot": {
      shadow(X, Y, 14);
      ctx.fillStyle = "#6a665e";
      rr(ctx, X - 14, Y - 6, 28, 8, 2);
      ctx.fill();
      if (on) {
        ctx.fillStyle = "#a8a090";
        rr(ctx, X - 10, Y - 40, 20, 36, 3);
        ctx.fill();
        ctx.fillStyle = "#c8c0ae";
        ctx.fillRect(X - 10, Y - 40, 20, 4);
      }
      break;
    }
    case "cau": {
      ctx.fillStyle = "#8a5a32";
      const n = on ? 5 : 2;
      for (let k = 0; k < 5; k++) if (k < n || k > 3) ctx.fillRect(X - 20 + k * 8, Y - 10, 7, 16);
      if (on) {
        ctx.fillStyle = "#a59f90";
        ctx.fillRect(X - 4, Y - 10, 15, 16);
      }
      break;
    }
    case "coi": {
      shadow(X, Y, 10);
      ctx.fillStyle = "#7a5a3a";
      ctx.fillRect(X - 3, Y - 40, 6, 40);
      ctx.save();
      ctx.translate(X, Y - 40);
      ctx.rotate(on ? tm * 6 : 0.3);
      ctx.fillStyle = "#e8e0c8";
      for (let k = 0; k < 4; k++) {
        ctx.rotate(TAU / 4);
        ctx.fillRect(0, -3, 20, 6);
      }
      ctx.restore();
      break;
    }
    case "luongGio": {
      ctx.fillStyle = "#5a564e";
      ctx.beginPath();
      ctx.ellipse(X, Y - 2, 16, 6, 0, 0, TAU);
      ctx.fill();
      if (on)
        for (let k = 0; k < 4; k++) {
          const a = (tm * 1.4 + k / 4) % 1;
          ctx.strokeStyle = `rgba(190,255,220,${0.7 * (1 - a)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(X, Y - 6 - a * 60, 10 + a * 6, 3, 0, 0, TAU);
          ctx.stroke();
        }
      break;
    }
    case "bangMat": {
      ctx.fillStyle = on ? "rgba(200,235,255,.9)" : "rgba(30,90,150,.85)";
      rr(ctx, X - 20, Y - 10, 40, 20, 4);
      ctx.fill();
      break;
    }
    case "loiTru": {
      shadow(X, Y, 10);
      ctx.fillStyle = "#7a6a58";
      rr(ctx, X - 5, Y - 44, 10, 44, 2);
      ctx.fill();
      ctx.fillStyle = on ? "#ffe27a" : "#b07a4a";
      ctx.beginPath();
      ctx.arc(X, Y - 46, 7, 0, TAU);
      ctx.fill();
      break;
    }
    default:
      shadow(X, Y, 12);
      ctx.fillStyle = on ? "#ffe27a" : "#888";
      ctx.fillRect(X - 8, Y - 16, 16, 16);
  }
  ctx.restore();
}

function drawNpc(n: Npc, tm: number) {
  const X = n.x,
    Y = n.y,
    P = Server.P.puz,
    done = P.mini.includes(n.mini.id);
  shadow(X, Y, 11);
  ctx.fillStyle = "#6a4a8a";
  rr(ctx, X - 8, Y - 26, 16, 22, 5);
  ctx.fill();
  ctx.fillStyle = "#f2d2b0";
  ctx.beginPath();
  ctx.arc(X, Y - 32, 8, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#3a2a20";
  ctx.beginPath();
  ctx.arc(X, Y - 35, 8, Math.PI, TAU);
  ctx.fill();
  if (!done) {
    const b = Math.sin(tm * 4) * 2;
    ctx.font = "800 18px 'Be Vietnam Pro',sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = P.talked.includes(n.mini.id) ? "#9fe8ff" : "#ffe27a";
    ctx.strokeStyle = "rgba(0,0,0,.7)";
    ctx.lineWidth = 3;
    const s = P.talked.includes(n.mini.id) ? "…" : "!";
    ctx.strokeText(s, X, Y - 48 + b);
    ctx.fillText(s, X, Y - 48 + b);
  }
}

function drawGate(g: Portal, tm: number) {
  const open = Server.P.puz.solved.includes(g.gate),
    c = EL[g.d.nguyenTo]?.c ?? "#fff";
  if (open) drawPortal(g.x, g.y, tm, c, g.d.ten);
  else {
    ctx.save();
    ctx.translate(g.x, g.y - 34);
    ctx.fillStyle = "#4a4658";
    rr(ctx, -34, -38, 10, 72, 3);
    ctx.fill();
    rr(ctx, 24, -38, 10, 72, 3);
    ctx.fill();
    rr(ctx, -40, -48, 80, 12, 3);
    ctx.fill();
    ctx.fillStyle = "rgba(20,20,30,.75)";
    rr(ctx, -24, -36, 48, 70, 4);
    ctx.fill();
    ctx.globalAlpha = 0.5 + 0.2 * Math.sin(tm * 2);
    ctx.fillStyle = rgba(c, 0.35);
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, TAU);
    ctx.fill();
    drawIcon(g.d.nguyenTo, 0, 0, 24);
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

/** Đẩy mọi vật thể S23 vào hàng đợi vẽ theo chiều sâu. */
export function queuePuzzles(dr: Q, vis: (x: number, y: number) => boolean, tm: number) {
  const W = GS.G.map,
    p = GS.G.p,
    R = PUZZLES.banKinhKyHieu;
  for (const st of (W.puzzles ?? []) as PState[])
    for (const o of st.objs) {
      if (!vis(o.x, o.y)) continue;
      const d = Math.hypot(o.x - p.x, o.y - p.y);
      dr.push({
        y: o.y + (o.def.chan || o.loai === "cau" || o.loai === "bangMat" || o.loai === "luongGio" ? -30 : 0),
        f: () => {
          drawObj(o, tm);
          if (!o.done && d < R) glyph(o, tm, 1 - d / R);
        },
      });
    }
  for (const n of (W.npcs ?? []) as Npc[]) if (vis(n.x, n.y)) dr.push({ y: n.y, f: () => drawNpc(n, tm) });
  for (const g of (W.portals ?? []) as Portal[]) if (vis(g.x, g.y)) dr.push({ y: g.y, f: () => drawGate(g, tm) });
  if (W.domain) {
    const s = W.rooms[0],
      X = (DX + 0.5) * TS,
      Y = (s.cy - 1.2) * TS;
    dr.push({ y: Y, f: () => drawPortal(X, Y, tm, "#9fe8ff", "Lối ra") });
    const r = W.rooms[W.rooms.length - 1],
      done = Server.P.puz.domains[W.domain.id]?.done,
      cx = (r.cx + 0.5) * TS,
      cy = (r.cy + 0.6) * TS;
    dr.push({ y: cy, f: () => drawChest(cx, cy, !!done) });
    if (done) dr.push({ y: (r.cy - 2) * TS, f: () => drawPortal(cx, (r.cy - 2) * TS, tm, "#9fe8ff", "Lối ra") });
  }
}
