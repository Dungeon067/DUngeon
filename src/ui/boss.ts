import { $, TAU, fmt, hash2 } from "../core/util";
import { EL } from "../data/content";
import { startBoss } from "../modes/boss";
import { Server } from "../server/server";

export function renderBossScr() {
  const box = $("bossLv");
  box.innerHTML = "";
  for (let lv = 1; lv <= 5; lv++) {
    const done = Server.P.boss[lv],
      unlocked = lv === 1 || Server.P.boss[lv - 1];
    const b = document.createElement("button");
    b.className = "floor";
    b.disabled = !unlocked;
    b.innerHTML = `<b>Cấp độ ${lv}</b><span class="muted">Máu ${fmt(14000 * (1 + 0.9 * (lv - 1)))}</span><span class="muted">${done ? "Đã hạ" : "Lần đầu: +" + (100 + lv * 40) + " Đá Sao"}</span>`;
    b.onclick = () => startBoss(lv);
    box.appendChild(b);
  }
  // art
  const c = $("bossArt").getContext("2d"),
    W = 520,
    H = 360;
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#0b1a33");
  g.addColorStop(1, "#163a5c");
  c.fillStyle = g;
  c.fillRect(0, 0, W, H);
  c.fillStyle = "rgba(120,190,255,.1)";
  for (let i = 0; i < 8; i++) {
    c.beginPath();
    c.ellipse(hash2(i, 1) * W, 200 + hash2(i, 2) * 150, 80, 16, 0, 0, TAU);
    c.fill();
  }
  const fake = { segs: [], ang: -0.4, phase: 1, flash: 0 };
  for (let i = 0; i < 14; i++) {
    const a = i * 0.45;
    fake.segs.push({ x: 300 - i * 22, y: 230 + Math.sin(a) * 40 });
  }
  c.save();
  c.translate(-30, 0);
  drawBossWith(c, fake, 1.2);
  c.restore();
}
export function drawBossWith(c, b, t) {
  const col = "#1f3f6a",
    acc = EL.water.c;
  for (let i = b.segs.length - 1; i >= 0; i--) {
    const s = b.segs[i],
      r = 30 - i * 1.6;
    if (r < 8) continue;
    c.fillStyle = col;
    c.beginPath();
    c.arc(s.x, s.y - r * 0.6, r, 0, TAU);
    c.fill();
    c.fillStyle = acc;
    c.globalAlpha = 0.75;
    c.beginPath();
    c.moveTo(s.x - r * 0.3, s.y - r * 1.5);
    c.lineTo(s.x, s.y - r * 2.1);
    c.lineTo(s.x + r * 0.3, s.y - r * 1.5);
    c.closePath();
    c.fill();
    c.globalAlpha = 1;
  }
  const h = b.segs[0];
  c.save();
  c.translate(h.x, h.y - 24);
  c.rotate(b.ang);
  c.fillStyle = col;
  c.beginPath();
  c.ellipse(10, 0, 40, 28, 0, 0, TAU);
  c.fill();
  c.beginPath();
  c.moveTo(30, -14);
  c.lineTo(62, -4);
  c.lineTo(62, 6);
  c.lineTo(30, 16);
  c.closePath();
  c.fill();
  c.fillStyle = "#e8e2c8";
  c.beginPath();
  c.moveTo(-6, -22);
  c.lineTo(-34, -46);
  c.lineTo(4, -26);
  c.closePath();
  c.fill();
  c.beginPath();
  c.moveTo(-6, 22);
  c.lineTo(-34, 46);
  c.lineTo(4, 26);
  c.closePath();
  c.fill();
  c.fillStyle = acc;
  c.shadowColor = acc;
  c.shadowBlur = 14;
  c.beginPath();
  c.arc(28, -11, 4.5, 0, TAU);
  c.arc(28, 11, 4.5, 0, TAU);
  c.fill();
  c.shadowBlur = 0;
  c.restore();
}
