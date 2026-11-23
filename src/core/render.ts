import { GS } from "../core/state";
import { beginLifted, drawShadow, drawWaves } from "./render-z";
import { drawChibi } from "../art/chibi";
import { drawBoss, drawEnemy } from "../art/enemy";
import { drawAlert, drawBossTele, drawBossWorldUi, drawEnemyUi, drawTele, drawTurret } from "../art/props";
import { drawParticle, drawSlash } from "../art/fx";
import { ctx } from "../core/canvas";
import { TAU, hash2, rand, rgba } from "../core/util";
import { EL } from "../data/content";
import { cur } from "../entities/party";
import { Server } from "../server/server";
import { drawCine } from "../ui/cine";
import { renderer3d, wants3D, type WorldRenderer } from "../render3d/select";
import { drawMenuBg } from "../ui/menuBg";
import { drawArena, drawChest, drawPortal, drawRock, drawStatue, drawTile, drawTree } from "../world/draw";
import { MH, MW, TL, TS } from "../world/map";
import { queuePuzzles } from "../world/draw-puzzles";
import { groundAt } from "../world/collision";

/** Người chơi luôn chơi 3D; lớp vẽ 2D chỉ còn cho kiểm thử tự động (?e2e, ?renderer=2d). */
const PLAYER_3D = wants3D();

export function render() {
  // Chế độ quay xác định (?capture): đồng hồ hiển thị theo bước cố định, không theo giờ thật.
  const tm = GS.capT ?? performance.now() / 1000;
  ctx.setTransform(GS.DPR, 0, 0, GS.DPR, 0, 0);
  if (GS.scene !== "play") {
    renderer3d()?.hide?.();
    drawMenuBg(tm);
    return;
  }
  const r3 = renderer3d();
  if (r3 && r3.frame(tm)) {
    render3dOverlay(r3, tm);
    return;
  }
  r3?.hide?.();
  if (PLAYER_3D) {
    // 3D đang tải hoặc đang dựng lại sau khi mất context: màn tối, không vẽ 2D.
    ctx.fillStyle = "#070b1c";
    ctx.fillRect(0, 0, GS.VW, GS.VH);
    drawScreenOverlays(tm);
    return;
  }
  const sx = GS.G.shake ? rand(-GS.G.shake, GS.G.shake) : 0,
    sy = GS.G.shake ? rand(-GS.G.shake, GS.G.shake) : 0;
  ctx.fillStyle = "#1f5a8e";
  ctx.fillRect(0, 0, GS.VW, GS.VH);
  ctx.save();
  ctx.translate(GS.VW / 2 + sx, GS.VH / 2 + sy);
  ctx.scale(GS.ZOOM, GS.ZOOM);
  ctx.translate(-GS.G.cam.x, -GS.G.cam.y);
  const hw = GS.VW / GS.ZOOM / 2 + TS,
    hh = GS.VH / GS.ZOOM / 2 + TS * 2;
  const x0 = Math.max(0, Math.floor((GS.G.cam.x - hw) / TS)),
    x1 = Math.min(MW - 1, Math.ceil((GS.G.cam.x + hw) / TS)),
    y0 = Math.max(0, Math.floor((GS.G.cam.y - hh) / TS)),
    y1 = Math.min(MH - 1, Math.ceil((GS.G.cam.y + hh + TS) / TS));
  const dr = [];
  if (GS.G.map) {
    const W = GS.G.map;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) drawTile(x, y, W.m[y * MW + x], tm);
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        const t = W.m[y * MW + x];
        if (t === TL.TREE) dr.push({ y: (y + 0.85) * TS, f: () => drawTree(x, y, tm) });
        else if (t === TL.ROCK) dr.push({ y: (y + 0.8) * TS, f: () => drawRock(x, y) });
      }
    const vis = (X: number, Y: number) => Math.abs(X - GS.G.cam.x) < hw + 60 && Math.abs(Y - GS.G.cam.y) < hh + 80;
    W.statues.forEach((s: any) => {
      const X = (s.x + 0.5) * TS,
        Y = (s.y + 0.9) * TS;
      if (vis(X, Y)) dr.push({ y: Y, f: () => drawStatue(X, Y, tm) });
    });
    W.chests.forEach((c: any, i: any) => {
      if (Server.P.chests.includes(i)) return;
      const X = (c.x + 0.5) * TS,
        Y = (c.y + 0.6) * TS;
      if (vis(X, Y)) dr.push({ y: Y, f: () => drawChest(X, Y, false) });
    });
    if (W.tower) {
      const X = (W.tower.x + 0.5) * TS,
        Y = (W.tower.y + 0.8) * TS;
      if (vis(X, Y)) dr.push({ y: Y, f: () => drawPortal(X, Y, tm, "#f0c060", "Tháp Tinh Tú") });
    }
    if (W.gate) {
      const X = (W.gate.x + 0.5) * TS,
        Y = (W.gate.y + 0.8) * TS;
      if (vis(X, Y)) dr.push({ y: Y, f: () => drawPortal(X, Y, tm, "#5aa0ff", "Hang Hắc Giao") });
    }
    queuePuzzles(dr, vis, tm);
  } else drawArena(tm);
  // fields under
  for (const f of GS.G.fields) {
    ctx.save();
    const col = EL[f.el].c;
    const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
    g.addColorStop(0, rgba(col, 0.05));
    g.addColorStop(0.8, rgba(col, 0.22));
    g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(f.x, f.y, f.r, f.r * 0.6, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = rgba(EL[f.el].c2, 0.5);
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(
        f.x,
        f.y - 10,
        f.r * (0.3 + i * 0.2),
        f.r * (0.18 + i * 0.12),
        0,
        tm * (3 + i) + i,
        tm * (3 + i) + i + 3.5,
      );
      ctx.stroke();
    }
    ctx.restore();
  }
  drawWaves(ctx);
  // telegraphs
  for (const e of GS.G.enemies) {
    if (e.dead) continue;
    if (e.isBoss) drawBossTele(e);
    else drawTele(e);
  }
  // pickups
  for (const k of GS.G.pickups) {
    dr.push({
      y: k.y,
      f: () => {
        if (k.k === "coin") {
          ctx.fillStyle = "#f0c060";
          ctx.beginPath();
          ctx.arc(k.x, k.y - 6 + Math.sin(tm * 5 + k.x) * 2, 5, 0, TAU);
          ctx.fill();
          ctx.fillStyle = "#fff3c4";
          ctx.fillRect(k.x - 1, k.y - 9, 2, 5);
        } else if (k.k === "book") {
          ctx.fillStyle = "#9b6ff0";
          ctx.fillRect(k.x - 6, k.y - 14, 12, 9);
          ctx.fillStyle = "#e7dbff";
          ctx.fillRect(k.x - 5, k.y - 13, 1.5, 7);
        } else if (k.k === "shard") {
          const c = EL[k.el].c;
          ctx.save();
          ctx.translate(k.x, k.y - 10 + Math.sin(tm * 4) * 2);
          ctx.rotate(tm);
          ctx.fillStyle = c;
          ctx.shadowColor = c;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(0, -8);
          ctx.lineTo(6, 0);
          ctx.lineTo(0, 8);
          ctx.lineTo(-6, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else if (k.k === "orb") {
          const c = EL[k.el].c2;
          ctx.fillStyle = c;
          ctx.shadowColor = c;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(k.x, k.y, 4, 0, TAU);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      },
    });
  }
  // turrets
  for (const t of GS.G.turrets) dr.push({ y: t.y, f: () => drawTurret(t, tm) });
  // enemies
  for (const e of GS.G.enemies) {
    if (e.dead) continue;
    if (e.isBoss) {
      dr.push({ y: e.y, f: () => (drawBoss(ctx, e, tm), drawBossWorldUi(e)) });
      continue;
    }
    if (GS.G.map && (Math.abs(e.x - GS.G.cam.x) > hw + 60 || Math.abs(e.y - GS.G.cam.y) > hh + 80)) continue;
    dr.push({
      y: e.y,
      f: () => {
        drawEnemy(ctx, e, tm);
        drawEnemyUi(e);
      },
    });
  }
  // player
  const p = GS.G.p,
    m = cur();
  if (m)
    dr.push({
      y: p.y,
      f: () => {
        drawShadow(ctx, p);
        beginLifted(ctx, p);
        if (p.iframes > 0 && p.hurt > 0 && Math.floor(tm * 20) % 2) ctx.globalAlpha = 0.5;
        drawChibi(ctx, m.c, p.x, p.y, 1.12, {
          fx: p.fx,
          back: p.back,
          walk: p.walk,
          moving: p.moving,
          atk: p.atkAnim,
          t: tm,
          noShadow: true,
        });
        ctx.globalAlpha = 1;
        if (p.shield > 0) {
          ctx.strokeStyle = rgba(EL.earth.c, 0.7);
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y - 22, 22, 28, 0, 0, TAU);
          ctx.stroke();
          ctx.fillStyle = rgba(EL.earth.c, 0.1);
          ctx.fill();
        }
        // ground ring
        ctx.strokeStyle = rgba(EL[m.c.el].c, 0.6);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, 15, 5, 0, 0, TAU);
        ctx.stroke();
        ctx.restore();
      },
    });
  dr.sort((a, b) => a.y - b.y);
  for (const d of dr) d.f();
  // projectiles
  for (const pr of GS.G.projs) {
    ctx.save();
    if (pr.kind === "arrow" || pr.kind === "earrow") {
      ctx.translate(pr.x, pr.y);
      ctx.rotate(Math.atan2(pr.vy, pr.vx));
      ctx.fillStyle = pr.kind === "earrow" ? "#ffb0a0" : pr.el ? EL[pr.el].c2 : "#f3ead2";
      ctx.fillRect(-12, -1, 18, 2);
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(4, -4);
      ctx.lineTo(4, 4);
      ctx.closePath();
      ctx.fill();
      if (pr.el) {
        ctx.shadowColor = EL[pr.el].c;
        ctx.shadowBlur = 8;
        ctx.fillRect(-12, -1, 18, 2);
      }
    } else {
      const col = EL[pr.el || "water"].c,
        c2 = EL[pr.el || "water"].c2;
      const g = ctx.createRadialGradient(pr.x, pr.y, 0, pr.x, pr.y, pr.r * 1.8);
      g.addColorStop(0, "#fff");
      g.addColorStop(0.35, c2);
      g.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, pr.r * 1.8, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
  // fx
  for (const f of GS.G.fx) {
    const k = f.life / f.max;
    ctx.save();
    if (f.k === "dot") {
      ctx.globalAlpha = k;
      ctx.fillStyle = f.col;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size * k + 0.5, 0, TAU);
      ctx.fill();
    } else if (f.k === "ring") {
      ctx.globalAlpha = k;
      ctx.strokeStyle = f.col;
      ctx.lineWidth = f.w * k + 1;
      ctx.beginPath();
      ctx.ellipse(f.x, f.y, f.r * (1 - k * 0.7), f.r * (1 - k * 0.7) * 0.62, 0, 0, TAU);
      ctx.stroke();
    } else if (f.k === "slash") {
      drawSlash(f, k);
    } else if (f.k === "pt") {
      drawParticle(f, k);
    } else if (f.k === "bolt") {
      ctx.globalAlpha = k;
      ctx.strokeStyle = f.col;
      ctx.lineWidth = 3;
      ctx.shadowColor = f.col;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      let x = f.x,
        y = f.y - 260;
      ctx.moveTo(x, y);
      for (let i = 0; i < 8; i++) {
        x = f.x + (hash2(i, f.seed | 0) - 0.5) * 30;
        y += 32;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(f.x, f.y);
      ctx.stroke();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (f.k === "arrowRain") {
      ctx.globalAlpha = k;
      ctx.strokeStyle = f.col;
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const ox = (hash2(i, f.x | 0) - 0.5) * 50,
          oy = (hash2(i, f.y | 0) - 0.5) * 30;
        ctx.beginPath();
        ctx.moveTo(f.x + ox - 20, f.y + oy - 80 * k - 40);
        ctx.lineTo(f.x + ox, f.y + oy - 40 * k);
        ctx.stroke();
      }
    } else if (f.k === "meteor") {
      const t = 1 - k;
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = f.col;
      ctx.beginPath();
      ctx.ellipse(f.x, f.y, 170 * t + 20, (170 * t + 20) * 0.6, 0, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = 1;
      const my = f.y - 500 * (1 - t),
        mx = f.x + 300 * (1 - t);
      ctx.fillStyle = "#7a6a50";
      ctx.shadowColor = f.col;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(mx, my, 34, 0, TAU);
      ctx.fill();
      ctx.fillStyle = f.col;
      ctx.beginPath();
      ctx.arc(mx - 6, my - 6, 14, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
  // texts
  ctx.textAlign = "center";
  for (const t of GS.G.texts) {
    const k = t.life / t.max;
    ctx.globalAlpha = Math.min(1, k * 2);
    ctx.font = `800 ${t.size}px 'Be Vietnam Pro',sans-serif`;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,.65)";
    ctx.strokeText(t.txt, t.x, t.y);
    ctx.fillStyle = t.col;
    ctx.fillText(t.txt, t.x, t.y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
  drawScreenOverlays(tm);
}

/** Lớp 2D đè lên cảnh 3D: chữ sát thương theo vị trí chiếu, viền tối, băng chữ, cắt cảnh. */
function render3dOverlay(r3: WorldRenderer, tm: number) {
  ctx.clearRect(0, 0, GS.VW, GS.VH);
  if (GS.G.map) drawWorldTele3d(r3, tm);
  else drawArenaUi3d(r3);
  ctx.setTransform(GS.DPR, 0, 0, GS.DPR, 0, 0);
  ctx.textAlign = "center";
  for (const t of GS.G.texts) {
    const k = t.life / t.max,
      q = r3.project(t.x, t.y + 30, 30);
    if (!q.vis) continue;
    ctx.globalAlpha = Math.min(1, k * 2);
    ctx.font = `800 ${t.size * GS.ZOOM}px 'Be Vietnam Pro',sans-serif`;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,.65)";
    ctx.strokeText(t.txt, q.x, q.y);
    ctx.fillStyle = t.col;
    ctx.fillText(t.txt, q.x, q.y);
  }
  ctx.globalAlpha = 1;
  drawScreenOverlays(tm);
}

/** Đấu trường 3D: vùng cảnh báo đã vẽ 3D trên sàn; ở đây chỉ chiếu thanh máu, dấu "!", sao choáng lên đầu quái. */
function drawArenaUi3d(r3: WorldRenderer) {
  const D = GS.DPR,
    s = GS.ZOOM;
  /** Vẽ bản 2D gốc tại (ax, ay) sao cho điểm đó rơi đúng vị trí chiếu của (x, y, z) trong cảnh 3D. */
  const at = (x: number, y: number, z: number, ax: number, ay: number, f: () => void) => {
    const q = r3.project(x, y, z);
    if (!q.vis || q.x < -80 || q.x > GS.VW + 80 || q.y < -80 || q.y > GS.VH + 80) return;
    ctx.save();
    ctx.setTransform(D * s, 0, 0, D * s, D * (q.x - s * ax), D * (q.y - s * ay));
    f();
    ctx.restore();
  };
  for (const e of GS.G.enemies) {
    if (e.dead) continue;
    if (e.isBoss) {
      // Đầu Hắc Giao ngóc cao khoảng 2–3 ô trên mặt nước.
      at(e.x, e.y, 120, e.x, e.y - 92, () => drawBossWorldUi(e));
      if (e.tele && e.state === "wind" && e.tele.kind !== "summon")
        at(e.x, e.y, 150, e.x, e.y - 110, () => drawAlert(e.x, e.y - 110, Math.min(1, e.t / e.tele.dur)));
      continue;
    }
    const top = e.type === "golem" ? 78 : e.type === "slime" ? 34 : 46,
      z = top * (e.type === "golem" ? 1.05 : 1.15) + Math.max(0, e.z ?? 0);
    at(e.x, e.y, z, e.x, e.y - top, () => drawEnemyUi(e));
  }
}

/** Đảo và bí cảnh: câu đố, vùng cảnh báo và sóng xung kích vẫn chiếu bản 2D lên mặt đất (địa hình không phẳng). */
function drawWorldTele3d(r3: WorldRenderer, tm: number) {
  drawPuzzles3d(r3, tm);
  // Vùng cảnh báo đòn và sóng xung kích: bản vẽ 2D chiếu lên mặt đất quanh điểm của nó.
  ctx.save();
  if (groundXf(r3, GS.G.p.x, GS.G.p.y)) drawWaves(ctx);
  ctx.restore();
  for (const e of GS.G.enemies) {
    if (e.dead) continue;
    // Neo phép chiếu tại tâm vùng cảnh báo (đích nhảy, đích phép, giữa đường đạn) cho đỡ lệch phối cảnh.
    const tl = e.tele,
      ax = tl?.kind === "proj" ? (e.x + GS.G.p.x) / 2 : (tl?.tx ?? tl?.x ?? e.x),
      ay = tl?.kind === "proj" ? (e.y + GS.G.p.y) / 2 : (tl?.ty ?? tl?.y ?? e.y);
    ctx.save();
    if (groundXf(r3, ax, ay)) {
      if (e.isBoss) drawBossTele(e);
      else drawTele(e);
    }
    ctx.restore();
  }
}

/** Đặt phép biến đổi affine của mặt đất quanh (x, y): vẽ tọa độ thế giới 2D lên mặt đất 3D. */
function groundXf(r3: WorldRenderer, x: number, y: number): boolean {
  const q0 = r3.project(x, y),
    q1 = r3.project(x + TS, y),
    q2 = r3.project(x, y + TS);
  const ax = (q1.x - q0.x) / TS,
    ay = (q1.y - q0.y) / TS,
    bx = (q2.x - q0.x) / TS,
    by = (q2.y - q0.y) / TS,
    // Lề cắt đủ rộng cho vùng cảnh báo bán kính tới 4 ô, dù tâm đã ra ngoài màn hình.
    m = 300 + Math.max(Math.hypot(ax, ay), Math.hypot(bx, by)) * TS * 4;
  if (!q0.vis || q0.x < -m || q0.x > GS.VW + m || q0.y < -m || q0.y > GS.VH + m) return false;
  // Chỉ bỏ khi một ô to hơn cả chiều cao màn hình (vật sát camera), không bỏ khi zoom gần.
  if (Math.hypot(ax, ay) * TS > GS.VH) return false;
  const D = GS.DPR;
  ctx.setTransform(D * ax, D * ay, D * bx, D * by, D * (q0.x - ax * x - bx * y), D * (q0.y - ay * x - by * y));
  return true;
}

/** Câu đố, NPC quest mini, cửa bí cảnh (S23) chưa có bản 3D: chiếu bản vẽ 2D lên đúng điểm chân trong cảnh 3D. */
function drawPuzzles3d(r3: WorldRenderer, tm: number) {
  const dr: Parameters<typeof queuePuzzles>[0] = [],
    hw = GS.VW / GS.ZOOM,
    hh = GS.VH / GS.ZOOM;
  queuePuzzles(dr, (x, y) => Math.abs(x - GS.G.cam.x) < hw && Math.abs(y - GS.G.cam.y) < hh * 1.4, tm, true);
  dr.sort((a, b) => a.y - b.y);
  for (const d of dr) {
    if (!d.at) continue;
    const [x, y] = d.at,
      z = groundAt(x, y),
      q = r3.project(x, y, z),
      q1 = r3.project(x + TS, y, z);
    if (!q.vis || q.x < -150 || q.x > GS.VW + 150 || q.y < -150 || q.y > GS.VH + 250) continue;
    const s = Math.hypot(q1.x - q.x, q1.y - q.y) / TS;
    // Vật quá sát camera (một ô to hơn chiều cao màn hình) sẽ phủ kín màn hình: bỏ qua.
    if (s * TS > GS.VH) continue;
    ctx.save();
    ctx.setTransform(GS.DPR * s, 0, 0, GS.DPR * s, GS.DPR * (q.x - s * x), GS.DPR * (q.y - s * y));
    d.f();
    ctx.restore();
  }
}

function drawScreenOverlays(tm: number) {
  // night tint vignette
  const vg = ctx.createRadialGradient(
    GS.VW / 2,
    GS.VH / 2,
    Math.min(GS.VW, GS.VH) * 0.35,
    GS.VW / 2,
    GS.VH / 2,
    Math.max(GS.VW, GS.VH) * 0.75,
  );
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(5,8,30,.45)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, GS.VW, GS.VH);
  // banner
  if (GS.G.banner.t > 0) {
    const k = Math.min(1, GS.G.banner.t / 0.4, (2.2 - GS.G.banner.t) / 0.3);
    ctx.globalAlpha = Math.max(0, k);
    ctx.font = `700 ${Math.min(52, GS.VW / 12)}px 'Cormorant Garamond',serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "#f0c060";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 14;
    ctx.fillText(GS.G.banner.txt, GS.VW / 2, GS.VH * 0.28);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
  if (GS.G.cine) drawCine(tm);
}
