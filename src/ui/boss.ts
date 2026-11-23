import { TAU } from "../core/util";
import { EL } from "../data/content";

/* Chân dung Hắc Giao vẽ bằng code, dùng cho màn Boss của menu (S10). */
export function drawBossWith(c: any, b: any, t: any) {
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
