import { portrait } from "../art/chibi";
import { sfx } from "../core/audio";
import { $, TAU, clamp, esc, fmt, rgba, rr } from "../core/util";
import { EL, WEAP, byId } from "../data/content";
import { Server } from "../server/server";
import { menuStars } from "../ui/menuBg";
import { updateWallets } from "../ui/screens";

/* ---------- wish ---------- */
export function renderWish() {
  const P = Server.P,
    cfg = P.cfg,
    f = byId[cfg.featured];
  $("featName").textContent = f.name;
  $("featTitle").textContent = `${f.title} · ${EL[f.el].vi} · ${WEAP[f.w].vi}`;
  $("featDesc").textContent = f.desc;
  $("p5").textContent = P.pity5;
  $("hp").textContent = cfg.hard;
  $("p4").textContent = P.pity4;
  $("guar").innerHTML = P.guaranteed
    ? `<b style="color:var(--gold)">Lần 5★ tiếp theo chắc chắn là ${esc(f.name)}</b>`
    : `<span>Khi ra 5★: 50% là ${esc(f.name)}, lệch thì lần sau chắc chắn.</span>`;
  $("c1").textContent = fmt(cfg.cost);
  $("c10").textContent = fmt(cfg.cost * 10);
  $("pull1").disabled = P.gems < cfg.cost;
  $("pull10").disabled = P.gems < cfg.cost * 10;
  const ctx2 = $("featArt").getContext("2d");
  ctx2.drawImage(portrait(f.id, 600, 600, "splash"), 0, 0);
  $("rateTxt").innerHTML =
    `5★: ${cfg.rate5}% (tăng dần từ lần ${cfg.soft}, chắc chắn ở lần ${cfg.hard})<br>4★: ${cfg.rate4}% (chắc chắn mỗi 10 lần)<br>3★: phần còn lại, mỗi vật phẩm 3★ đổi thành 500 Xu.<br>Trùng nhân vật: +1 cung mệnh (tối đa C6, mỗi cung +10% máu và tấn công).`;
  $("hist").innerHTML = P.history.length
    ? P.history
        .slice(0, 40)
        .map(
          (h) =>
            `<div><span class="r${h.r}t">${"★".repeat(h.r)} ${esc(h.n)}</span><span class="muted">${new Date(h.t).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" })}</span></div>`,
        )
        .join("")
    : `<span class="muted">Chưa có lần ước nào.</span>`;
}
export function doPull(n) {
  const r = Server.req("pull", { count: n });
  if (!r.ok) return;
  updateWallets();
  playWish(r.data);
}
/* ---------- wish animation ---------- */
export const WF = { on: false, list: [], phase: "", t: 0, idx: 0 };
export const wcv = $("wishCv"),
  wctx = wcv.getContext("2d");
export function playWish(list) {
  WF.list = list;
  WF.phase = "fall";
  WF.t = 0;
  WF.idx = 0;
  WF.on = true;
  WF.best = Math.max(...list.map((x) => x.r));
  $("wishFx").hidden = false;
  sizeWish();
  sfx("star" + WF.best);
  requestAnimationFrame(wishFrame);
}
export function sizeWish() {
  const d = Math.min(2, devicePixelRatio || 1);
  wcv.width = innerWidth * d;
  wcv.height = innerHeight * d;
  WF.d = d;
}
export const RCOL = { 3: "#7fb0e0", 4: "#b48cff", 5: "#ffd06a" };
export function wishFrame(now) {
  if (!WF.on) return;
  const dt = 1 / 60;
  WF.t += dt;
  const W = innerWidth,
    H = innerHeight,
    c = wctx;
  c.setTransform(WF.d, 0, 0, WF.d, 0, 0);
  c.fillStyle = "#05070f";
  c.fillRect(0, 0, W, H);
  for (const s of menuStars) {
    c.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(WF.t + s.p));
    c.fillStyle = "#e8ecff";
    c.beginPath();
    c.arc(s.x * W, s.y * H, s.s, 0, TAU);
    c.fill();
  }
  c.globalAlpha = 1;
  if (WF.phase === "fall") {
    const k = Math.min(1, WF.t / 1.6),
      col = RCOL[WF.best];
    const n = WF.list.length > 1 ? 5 : 1;
    for (let i = 0; i < n; i++) {
      const kk = clamp(k * 1.25 - i * 0.06, 0, 1);
      const sx = W * (0.95 - i * 0.04),
        sy = H * (-0.05 + i * 0.03),
        ex = W * 0.5,
        ey = H * 0.55;
      const x = sx + (ex - sx) * kk,
        y = sy + (ey - sy) * kk;
      const tg = c.createLinearGradient(x, y, x + (sx - ex) * 0.25, y + (sy - ey) * 0.25);
      tg.addColorStop(0, i === 0 ? col : RCOL[3]);
      tg.addColorStop(1, "rgba(255,255,255,0)");
      c.strokeStyle = tg;
      c.lineWidth = i === 0 ? 7 : 3;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + (sx - ex) * 0.25, y + (sy - ey) * 0.25);
      c.stroke();
      const g = c.createRadialGradient(x, y, 0, x, y, i === 0 ? 40 : 16);
      g.addColorStop(0, "#fff");
      g.addColorStop(0.3, i === 0 ? col : RCOL[3]);
      g.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, i === 0 ? 40 : 16, 0, TAU);
      c.fill();
    }
    if (k >= 1) {
      const fl = Math.min(1, (WF.t - 1.6) / 0.35);
      c.fillStyle = `rgba(255,255,255,${fl})`;
      c.fillRect(0, 0, W, H);
      if (WF.t > 1.95) {
        WF.phase = "card";
        WF.t = 0;
        sfx("star" + WF.list[0].r);
      }
    }
  } else if (WF.phase === "card") {
    const it = WF.list[WF.idx],
      col = RCOL[it.r],
      k = Math.min(1, WF.t / 0.5);
    const bg = c.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, Math.max(W, H) * 0.7);
    bg.addColorStop(0, rgba(col, 0.35));
    bg.addColorStop(1, "rgba(5,7,15,1)");
    c.fillStyle = bg;
    c.fillRect(0, 0, W, H);
    // rays
    c.save();
    c.translate(W / 2, H * 0.45);
    c.rotate(WF.t * 0.2);
    c.globalAlpha = 0.12;
    c.fillStyle = col;
    for (let i = 0; i < 18; i++) {
      c.rotate(TAU / 18);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(Math.max(W, H), -40);
      c.lineTo(Math.max(W, H), 40);
      c.closePath();
      c.fill();
    }
    c.restore();
    c.globalAlpha = 1;
    if (it.kind === "char") {
      const ch = byId[it.id];
      const ph = Math.min(H * 0.72, W * 1.1),
        pw = ph * 0.75;
      const pc = portrait(it.id, 450, 600, "splash");
      c.save();
      c.globalAlpha = k;
      c.drawImage(pc, W / 2 - pw / 2 + (1 - k) * 80, H * 0.44 - ph / 2, pw, ph);
      c.restore();
      c.textAlign = "center";
      c.fillStyle = "#fff";
      c.shadowColor = "#000";
      c.shadowBlur = 10;
      c.font = `700 ${Math.min(56, W / 9)}px 'Cormorant Garamond',serif`;
      c.globalAlpha = k;
      c.fillText(ch.name, W / 2, H * 0.86);
      c.font = `600 ${Math.min(15, W / 28)}px 'Be Vietnam Pro',sans-serif`;
      c.fillStyle = EL[ch.el].c2;
      c.fillText(`${ch.title} · ${EL[ch.el].vi}`, W / 2, H * 0.86 + 24);
      c.fillStyle = col;
      c.font = `700 ${Math.min(15, W / 28)}px 'Be Vietnam Pro',sans-serif`;
      c.fillText(
        it.dup ? (it.max ? "Đã C6: đổi thành Xu" : `Trùng: cung mệnh C${it.cons}`) : "Nhân vật mới!",
        W / 2,
        H * 0.86 + 46,
      );
    } else {
      const s = Math.min(W, H) * 0.22;
      c.save();
      c.translate(W / 2, H * 0.45);
      c.rotate(0.5);
      c.globalAlpha = k;
      c.fillStyle = "#9ab";
      c.fillRect(-4, -s, 8, s * 1.6);
      c.fillStyle = col;
      c.fillRect(-s * 0.3, s * 0.4, s * 0.6, 8);
      c.restore();
      c.textAlign = "center";
      c.fillStyle = "#fff";
      c.font = `700 ${Math.min(44, W / 10)}px 'Cormorant Garamond',serif`;
      c.globalAlpha = k;
      c.fillText(it.name, W / 2, H * 0.82);
      c.font = `600 14px 'Be Vietnam Pro',sans-serif`;
      c.fillStyle = col;
      c.fillText("+500 Xu", W / 2, H * 0.82 + 26);
    }
    c.shadowBlur = 0;
    const sk = it.r;
    for (let i = 0; i < sk; i++) {
      const a = clamp((WF.t - 0.3 - i * 0.12) / 0.2, 0, 1);
      c.globalAlpha = a;
      c.fillStyle = col;
      c.font = `${28}px sans-serif`;
      c.textAlign = "center";
      c.fillText("★", W / 2 + (i - (sk - 1) / 2) * 30, H * 0.76 - (1 - a) * 20);
    }
    c.globalAlpha = 1;
    c.fillStyle = "rgba(255,255,255,.6)";
    c.font = "500 13px 'Be Vietnam Pro',sans-serif";
    c.textAlign = "center";
    c.fillText(
      `${WF.idx + 1}/${WF.list.length} · Chạm để tiếp tục`,
      W / 2,
      H - 24 - (parseFloat(getComputedStyle(document.documentElement).paddingBottom) || 0),
    );
  } else if (WF.phase === "sum") {
    c.fillStyle = "#0b0f24";
    c.fillRect(0, 0, W, H);
    const n = WF.list.length,
      cols = n > 5 ? 5 : n,
      rows = Math.ceil(n / cols);
    const cw = Math.min(150, (W - 40) / cols - 8),
      ch = cw * 1.45;
    const ox = (W - (cw + 8) * cols + 8) / 2,
      oy = Math.max(70, (H - (ch + 10) * rows) / 2);
    WF.list.forEach((it, i) => {
      const x = ox + (i % cols) * (cw + 8),
        y = oy + Math.floor(i / cols) * (ch + 10);
      const a = clamp((WF.t - i * 0.05) / 0.25, 0, 1);
      c.globalAlpha = a;
      c.fillStyle = it.r === 5 ? "#4a3a1e" : it.r === 4 ? "#3a2d5e" : "#24304e";
      rr(c, x, y + (1 - a) * 20, cw, ch, 10);
      c.fill();
      c.strokeStyle = RCOL[it.r];
      c.lineWidth = 2;
      c.stroke();
      if (it.kind === "char")
        c.drawImage(portrait(it.id, 300, 400, "card"), x + 4, y + 4 + (1 - a) * 20, cw - 8, (cw - 8) * 1.333 * 0.85);
      c.fillStyle = "#fff";
      c.font = `700 ${Math.max(11, cw / 10)}px 'Be Vietnam Pro',sans-serif`;
      c.textAlign = "center";
      c.fillText(it.name, x + cw / 2, y + ch - 24 + (1 - a) * 20);
      c.fillStyle = RCOL[it.r];
      c.fillText("★".repeat(it.r), x + cw / 2, y + ch - 8 + (1 - a) * 20);
    });
    c.globalAlpha = 1;
    c.fillStyle = "rgba(255,255,255,.7)";
    c.font = "500 14px 'Be Vietnam Pro',sans-serif";
    c.textAlign = "center";
    c.fillText("Chạm để đóng", W / 2, H - 30);
  }
  requestAnimationFrame(wishFrame);
}
export function closeWish() {
  WF.on = false;
  $("wishFx").hidden = true;
  renderWish();
  updateWallets();
}

export function init(): void {
  $("pull1").addEventListener("click", () => doPull(1));
  $("pull10").addEventListener("click", () => doPull(10));
  $("wishFx").addEventListener("pointerdown", (e) => {
    if (e.target.id === "wishSkip") return;
    if (WF.phase === "fall") {
      if (WF.t > 0.4) {
        WF.phase = "card";
        WF.t = 0;
      }
    } else if (WF.phase === "card") {
      if (WF.t < 0.35) {
        WF.t = 0.6;
        return;
      }
      WF.idx++;
      WF.t = 0;
      if (WF.idx >= WF.list.length) {
        if (WF.list.length > 1) {
          WF.phase = "sum";
        } else closeWish();
      } else sfx("star" + WF.list[WF.idx].r);
    } else if (WF.phase === "sum") closeWish();
  });
  $("wishSkip").addEventListener("click", () => {
    if (WF.list.length > 1 && WF.phase !== "sum") {
      WF.phase = "sum";
      WF.t = 0;
    } else closeWish();
  });
  addEventListener("resize", () => {
    if (WF.on) sizeWish();
  });
}
