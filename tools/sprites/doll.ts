/**
 * "Búp bê pixel" hình người chibi 3/4. Một hàm vẽ cho mọi nhân vật; chỉ khác bảng màu,
 * kiểu tóc, chi tiết áo và vũ khí. Mỗi khung là một tư thế (Pose), mỗi hướng tự suy ra
 * vị trí mặt, tay, vũ khí. Vẽ 5 hướng (s, se, e, ne, n); 3 hướng còn lại lật ngang lúc chạy game.
 */
import { Grid, type Material, mat } from "./pixel";

export const FW = 48,
  FH = 64,
  AX = 24,
  AY = 62;
export const DIRS = ["s", "se", "e", "ne", "n"] as const;
export type Dir = (typeof DIRS)[number];

export interface Look {
  hair: string;
  style: string;
  outfit: string;
  accent: string;
  skin: string;
  eye: string;
  coat: boolean;
  pants?: string;
  shoe?: string;
  mark?: string;
  clip?: string;
  buttons?: "x" | "round" | "none";
  gem?: string;
  cord?: string;
  weapon: "bow" | "sword" | "spear" | "cat" | "claymore";
  weaponColor?: string;
}

export interface Pose {
  /** Dịch thân trên xuống (px). */
  by?: number;
  /** Dịch đầu thêm. */
  hy?: number;
  /** Nghiêng thân theo hướng mặt (px, dương là về phía trước). */
  lean?: number;
  /** Pha bước chân -1..1 và độ nhấc từng chân 0..1. */
  stride?: number;
  liftA?: number;
  liftB?: number;
  /** Vung tay -1..1. */
  swing?: number;
  /** Cung: cầm thả, giương bắn, giương lên trời, không có. */
  bow?: "hang" | "aim" | "up" | "none";
  draw?: number;
  arrow?: boolean;
  /** Lệch góc ngắm so với hướng mặt (độ, âm là lên trời). */
  aimAng?: number;
  /** Vạt áo xòe thêm (px) và tóc bay về phía sau (px). */
  flare?: number;
  sway?: number;
  eyes?: "open" | "closed" | "hurt" | "focus";
  /** Xoay cả hình (độ) quanh chân, dùng cho ngã. */
  rot?: number;
  /** Co chân (ngồi xuống, px). */
  crouch?: number;
  /** Hai tay giơ cao (kỹ năng). */
  armsUp?: number;
}

const M = {
  skin: 1,
  hair: 2,
  eye: 3,
  lash: 4,
  coat: 5,
  lining: 6,
  accent: 7,
  mark: 8,
  pants: 9,
  shoe: 10,
  wood: 11,
  string: 12,
  ice: 13,
  gem: 14,
  cord: 15,
  white: 16,
  blush: 17,
  grip: 18,
} as const;

export function materials(L: Look): Material[] {
  const m: Material[] = [];
  m[0] = mat("#000000");
  m[M.skin] = mat(L.skin, { k: 0.5 });
  m[M.hair] = mat(L.hair, { k: 1.1 });
  m[M.eye] = mat(L.eye, { flat: true });
  m[M.lash] = mat(L.eye, { flat: true, k: 2.6 });
  m[M.lash].ramp[1] = m[M.lash].ramp[0];
  m[M.coat] = mat(L.outfit, { k: 0.8 });
  m[M.lining] = mat(L.pants ?? "#262a3d", { k: 0.6 });
  m[M.accent] = mat(L.accent);
  m[M.mark] = mat(L.mark ?? "#e0383a", { flat: true });
  m[M.pants] = mat(L.pants ?? "#262a3d", { k: 0.7 });
  m[M.shoe] = mat(L.shoe ?? "#2b2230", { k: 0.7 });
  m[M.wood] = mat(L.weaponColor ?? "#c7e3f2", { k: 1 });
  m[M.string] = mat("#f4fbff", { flat: true, noLine: true });
  m[M.ice] = mat("#9fe6ff", { k: 1 });
  m[M.gem] = mat(L.gem ?? "#7fe0ff", { flat: true });
  m[M.cord] = mat(L.cord ?? "#e8503a", { flat: true });
  m[M.white] = mat("#ffffff", { flat: true, noLine: true });
  m[M.blush] = mat("#f3a6a6", { flat: true, noLine: true });
  m[M.grip] = mat("#3a3f66", { k: 0.6 });
  return m;
}

const SIDE = [0, 0.62, 1, 0.62, 0];
const FACE_Y = [1, 0.62, 0, -0.62, -1];
const X4 = ["#..#", ".##.", ".##.", "#..#"];
const CLIP = ["#####", "#...#", "#...#", "#...#", "#####"];

/** Vẽ một khung. Trả lưới 48×64 với điểm neo ở (24, 62). */
export function drawDoll(L: Look, d: number, P: Pose, swap = false): Grid {
  const g = new Grid(FW, FH);
  const s = SIDE[d],
    fy = FACE_Y[d],
    back = d >= 3;
  const by = Math.round(P.by ?? 0),
    lean = Math.round((P.lean ?? 0) * (0.4 + 0.6 * s)),
    leanY = Math.round((P.lean ?? 0) * 0.5 * Math.abs(fy) * Math.sign(fy));
  const cx = AX + lean,
    crouch = P.crouch ?? 0;
  const top = 3 + by + (P.hy ?? 0) + crouch + leanY,
    neck = 31 + by + crouch + leanY,
    hem = 52 + by + crouch;
  const flare = P.flare ?? 0,
    sway = P.sway ?? 0,
    swing = P.swing ?? 0,
    stride = P.stride ?? 0;
  const fo = Math.round(s * 3);
  const bow = P.bow ?? "hang";

  // Hướng ngắm trên màn hình (dx, dy) theo hướng mặt cộng độ lệch.
  const baseAng = Math.atan2(fy, s) + ((P.aimAng ?? 0) * Math.PI) / 180;
  const ux = Math.cos(baseAng),
    uy = Math.sin(baseAng);

  const shoulderA = { x: cx - 8 + Math.round(s * 5), y: neck + 2 },
    shoulderB = { x: cx + 8 - Math.round(s * 4), y: neck + 2 };
  let handA = { x: shoulderA.x - 4 + Math.round(s * 3), y: shoulderA.y + 12 },
    handB = { x: shoulderB.x + 4 - Math.round(s * 3), y: shoulderB.y + 12 };
  // Vung tay khi chạy: hướng ngang thì đưa trước sau, hướng dọc thì lên xuống.
  handA.x += Math.round(swing * 5 * s);
  handB.x -= Math.round(swing * 5 * s);
  handA.y += Math.round(-swing * 2 * (1 - s)) - Math.round(Math.abs(swing) * s);
  handB.y += Math.round(swing * 2 * (1 - s)) - Math.round(Math.abs(swing) * s);

  const chest = { x: cx + Math.round(ux * 4), y: neck + 6 + Math.round(uy * 2) };
  let bowC = { x: 0, y: 0 },
    bowAx = 0,
    bowAy = 0,
    nock = { x: 0, y: 0 };
  const draw = P.draw ?? 0;
  if (bow === "aim") {
    bowC = { x: chest.x + Math.round(ux * 11), y: chest.y + Math.round(uy * 9) };
    bowAx = ux;
    bowAy = uy;
    nock = { x: Math.round(bowC.x - ux * (3 + draw * 9)), y: Math.round(bowC.y - uy * (3 + draw * 7)) };
    handB = bowC;
    handA = nock;
  } else if (bow === "up") {
    bowC = { x: cx + 7, y: top + 2 };
    bowAx = 0.18;
    bowAy = -1;
    nock = { x: Math.round(bowC.x - bowAx * (3 + draw * 8)), y: Math.round(bowC.y + 3 + draw * 8) };
    handB = { ...bowC };
    handA = nock;
  } else if (bow === "hang") {
    const h = back !== swap ? handA : handB;
    bowC = { x: h.x, y: h.y };
    bowAx = back !== swap ? -1 : 1;
    bowAy = 0.15;
  }
  if (P.armsUp && bow !== "up") {
    const k = P.armsUp;
    handA = { x: Math.round(handA.x + (cx - 9 - handA.x) * k), y: Math.round(handA.y + (top + 4 - handA.y) * k) };
    handB = { x: Math.round(handB.x + (cx + 9 - handB.x) * k), y: Math.round(handB.y + (top + 4 - handB.y) * k) };
    if (bow === "hang") {
      bowC = handB;
      bowAx = 0.3;
      bowAy = -1;
    }
  }

  const drawBow = () => {
    if (bow === "none" || L.weapon !== "bow") return;
    const n = Math.hypot(bowAx, bowAy) || 1,
      ax = bowAx / n,
      ay = bowAy / n,
      px = -ay,
      py = ax;
    const bend = bow === "hang" ? 3 : 4 + draw * 2;
    const pt = (t: number) => ({
      x: bowC.x + px * 12 * t - ax * bend * t * t,
      y: bowC.y + py * 12 * t - ay * bend * t * t,
    });
    let prev = pt(-1);
    for (let i = 1; i <= 12; i++) {
      const q = pt(-1 + i / 6);
      g.line(prev.x, prev.y, q.x, q.y, M.wood, 2);
      prev = q;
    }
    const t1 = pt(-1),
      t2 = pt(1);
    g.set(t1.x, t1.y, M.accent);
    g.set(t2.x, t2.y, M.accent);
    g.rect(bowC.x - 1, bowC.y - 1, 2, 2, M.grip);
    if (bow === "hang") g.line(t1.x, t1.y, t2.x, t2.y, M.string);
    else {
      g.line(t1.x, t1.y, nock.x, nock.y, M.string);
      g.line(nock.x, nock.y, t2.x, t2.y, M.string);
      if (P.arrow) {
        const tip = { x: Math.round(bowC.x + ax * 7), y: Math.round(bowC.y + ay * 7) };
        g.line(nock.x, nock.y, tip.x, tip.y, M.ice);
        g.set(tip.x, tip.y, M.ice, 3);
        g.set(tip.x + Math.round(px), tip.y + Math.round(py), M.ice, 2);
        g.set(tip.x - Math.round(px), tip.y - Math.round(py), M.ice, 2);
      }
    }
  };

  const arm = (sh: { x: number; y: number }, hd: { x: number; y: number }, cord: boolean) => {
    const dx = hd.x - sh.x,
      dy = hd.y - sh.y,
      len = Math.hypot(dx, dy) || 1,
      ux2 = dx / len,
      uy2 = dy / len;
    const cuff = { x: hd.x - ux2 * 2.5, y: hd.y - uy2 * 2.5 };
    const mid = { x: sh.x + dx * 0.55, y: sh.y + dy * 0.55 };
    g.line(sh.x, sh.y, mid.x, mid.y, M.coat, 4, 0);
    g.poly(
      [
        [mid.x - uy2 * 2, mid.y + ux2 * 2],
        [mid.x + uy2 * 2, mid.y - ux2 * 2],
        [cuff.x + uy2 * 3.5, cuff.y - ux2 * 3.5],
        [cuff.x - uy2 * 3.5, cuff.y + ux2 * 3.5],
      ],
      M.coat,
      0,
    );
    g.line(cuff.x - uy2 * 3, cuff.y + ux2 * 3, cuff.x + uy2 * 3, cuff.y - ux2 * 3, M.accent, 2);
    g.rect(hd.x - 1, hd.y - 1, 2, 2, M.skin);
    if (cord) g.set(Math.round(cuff.x + ux2 * 1.5 + uy2 * 1.5), Math.round(cuff.y + uy2 * 1.5 - ux2), M.cord);
  };

  const legs = () => {
    const hip = hem - 4;
    const foot = 61;
    const k = 1 - s,
      st = stride;
    const fA = {
      x: cx - 4 + Math.round(st * 4 * s) + Math.round(s * 2),
      y: foot - Math.round((P.liftA ?? 0) * 3) + Math.round(st * 1.5 * k),
    };
    const fB = {
      x: cx + 1 - Math.round(st * 4 * s) - Math.round(s * 1),
      y: foot - Math.round((P.liftB ?? 0) * 3) - Math.round(st * 1.5 * k),
    };
    const order = s > 0.5 ? [fB, fA] : [fA, fB];
    for (const f of order) {
      const lx = f.x;
      g.poly(
        [
          [lx + (cx - 2 - lx) * 0.3, hip],
          [lx + 4 + (cx + 2 - lx - 4) * 0.3, hip],
          [lx + 4, f.y - 2],
          [lx, f.y - 2],
        ],
        M.pants,
      );
      const sw = 5 + Math.round(s),
        sx = lx - (s > 0.3 ? 0 : 0.5);
      g.rect(Math.round(sx), f.y - 2, sw, 2, M.shoe);
      g.rect(Math.round(sx), f.y, sw, 1, M.accent);
    }
  };

  const backHair = () => {
    const sw = Math.round(sway);
    if (!back) {
      const lx = cx - 12 - Math.round(s * 3),
        rx = cx + 12 - Math.round(s * 8);
      g.poly(
        [
          [lx, top + 12],
          [rx, top + 12],
          [rx + 1 - sw, top + 42],
          [rx - 3 - sw, top + 45],
          [lx + 3 - sw - Math.round(s * 2), top + 45],
          [lx - sw - Math.round(s * 2), top + 42],
        ],
        M.hair,
      );
    }
  };

  const backHairOver = () => {
    const sw = Math.round(sway);
    const lx = cx - 10 + Math.round(s * 2),
      rx = cx + 10 + Math.round(s * 1);
    g.poly(
      [
        [lx, top + 14],
        [rx, top + 14],
        [rx + 1 - sw, top + 43],
        [rx - 3 - sw, top + 47],
        [cx + 1 - sw, top + 44],
        [lx + 3 - sw, top + 47],
        [lx - 1 - sw, top + 43],
      ],
      M.hair,
    );
    for (const x of [cx - 7, cx - 1, cx + 5])
      g.line(x - sw, top + 24, x - sw - Math.round(sw / 2), top + 42, M.hair, 1, 0);
  };

  const coat = () => {
    const fl = flare;
    const wTop = 7 - Math.round(s * 1.5),
      wMid = 10 - Math.round(s * 2),
      wHem = 15 - Math.round(s * 3);
    const off = Math.round(-s * 1);
    const trail = Math.round(s * (2 + fl));
    g.poly(
      [
        [cx - wTop + off, neck],
        [cx + wTop + off, neck],
        [cx + wMid + off, neck + 10],
        [cx + wHem + off + Math.round(fl * (1 - s)), hem],
        [cx - wHem + off - Math.round(fl * (1 - s)) - trail, hem],
        [cx - wMid + off, neck + 10],
      ],
      M.coat,
    );
    // Khối áo: hai bên tối, giữa sáng hơn.
    for (let y = neck; y < hem; y++)
      for (let x = cx - wHem - 4 - trail; x <= cx + wHem + 4; x++) {
        if (g.get(x, y) !== M.coat) continue;
        if (x >= cx + off + wMid - 3 + Math.round(((y - neck) / (hem - neck)) * 5)) g.tone(x, y, 0);
        else if (Math.abs(x - cx - off - Math.round(s * 3)) <= 3 && y > neck + 1) g.tone(x, y, 2);
      }
    // Gấu áo viền cam.
    for (let x = cx - wHem - 1 - Math.round(fl) - trail; x <= cx + wHem + 1 + Math.round(fl); x++)
      if (g.get(x, hem - 1) === M.coat) g.set(x, hem - 1, M.accent);
    // Vạt mở trước (lộ lớp lót tối) và đường may sau lưng.
    if (!back) {
      const ox = cx + Math.round(s * 4) + off;
      g.poly(
        [
          [ox, neck + 13],
          [ox + 3 + Math.round(fl / 2), hem],
          [ox - 3 - Math.round(fl / 2), hem],
        ],
        M.lining,
      );
      g.line(ox, neck + 4, ox, neck + 13, M.coat, 1, 0);
    } else g.line(cx + off, neck + 14, cx + off, hem - 2, M.coat, 1, 0);
    // Cổ áo đứng.
    g.rect(cx - 5 + off, neck - 2, 10, 3, M.coat);
    for (let x = cx - 5 + off; x < cx + 5 + off; x++) g.tone(x, neck - 2, 2, M.coat);
    if (!back && s < 0.9) {
      if ((L.buttons ?? "x") === "x") {
        const bx = cx - 2 + fo + off;
        g.stamp(bx, neck + 3, X4, { "#": [M.mark] });
        g.stamp(bx, neck + 9, X4, { "#": [M.mark] });
      }
      g.rect(cx - 1 + fo + off, neck - 1, 2, 2, M.gem);
      g.set(cx - 1 + fo + off, neck - 1, M.white);
    }
  };

  const head = () => {
    const sw = Math.round(sway / 2);
    g.rrect(cx - 15, top, 30, 24, 10, 5, M.hair);
    const eyeRow = top + 16;
    const eyesK = P.eyes ?? "open";
    const eye = (x: number, w: number) => {
      if (eyesK === "closed" || eyesK === "hurt") {
        g.rect(x, eyeRow + 2, w, 1, M.lash);
        if (eyesK === "hurt") {
          g.set(x, eyeRow + 1, M.lash);
          g.set(x + w - 1, eyeRow + 3, M.lash);
        }
        return;
      }
      const h = eyesK === "focus" ? 4 : 6;
      const y0 = eyeRow + (6 - h);
      g.rect(x, y0, w, 1, M.lash);
      g.rect(x, y0 + 1, w, h - 1, M.eye);
      for (let i = 0; i < w; i++) g.tone(x + i, y0 + 1, 0, M.eye);
      for (let i = 0; i < w; i++) g.tone(x + i, y0 + h - 1, 2, M.eye);
      if (h > 3) g.set(x, y0 + 1, M.white);
    };
    if (d <= 2) {
      const fw = d === 0 ? 22 : d === 1 ? 20 : 15;
      const fx = d === 0 ? cx - 11 : d === 1 ? cx - 9 + fo : cx - 2;
      g.rrect(fx, top + 11, fw, 15, 2, 5, M.skin);
      // Mái bằng: một đường thẳng, lác đác vài ngọn tóc.
      for (let x = fx; x < fx + fw; x++) {
        g.set(x, top + 11, M.hair);
        g.set(x, top + 12, M.hair);
        g.set(x, top + 13, M.hair);
        if ((x - fx) % 5 === 2) g.set(x, top + 14, M.hair, 0);
      }
      for (let x = fx; x < fx + fw; x++) g.tone(x, top + 13, 0, M.hair);
      if (d === 0) {
        eye(cx - 7, 3);
        eye(cx + 4, 3);
        g.set(cx, top + 23, M.skin, 0);
        g.rect(cx - 9, top + 21, 2, 1, M.blush);
        g.rect(cx + 7, top + 21, 2, 1, M.blush);
      } else if (d === 1) {
        eye(cx - 4 + fo, 2);
        eye(cx + 4 + fo, 3);
        g.set(cx + 2 + fo, top + 23, M.skin, 0);
        g.rect(cx + 7 + fo, top + 21, 2, 1, M.blush);
      } else {
        eye(cx + 7, 2);
        g.set(cx + 13, top + 19, M.skin);
        g.set(cx + 10, top + 23, M.skin, 0);
        g.rect(cx + 9, top + 21, 2, 1, M.blush);
      }
    } else if (d === 3) {
      g.rrect(cx + 7, top + 13, 6, 11, 1, 3, M.skin);
      for (let y = top + 13; y < top + 24; y++) g.set(cx + 7, y, M.hair);
    }
    // Ánh sáng trên tóc (vầng sáng phía trên trái).
    for (let x = cx - 9; x < cx - 1; x++) g.tone(x, top + 4 + Math.round(Math.abs(x - cx + 5) / 3), 3, M.hair);
    for (let x = cx - 1; x < cx + 6; x++) g.tone(x, top + 5 + Math.round(Math.abs(x - cx - 2) / 3), 2, M.hair);
    // Hai lọn dài và kẹp vuông.
    const lock = (x: number, len: number) => {
      g.poly(
        [
          [x, top + 11],
          [x + 4, top + 11],
          [x + 4 - sw, top + 11 + len - 3],
          [x + 2 - sw, top + 11 + len],
          [x - sw, top + 11 + len - 4],
        ],
        M.hair,
        2,
      );
      g.line(x + 2, top + 14, x + 2 - sw, top + 9 + len, M.hair, 1, 1);
    };
    const clip = (x: number) => g.stamp(x, top + 13, CLIP, { "#": [M.accent] });
    if (d === 0) {
      lock(cx - 15, 22);
      lock(cx + 11, 22);
      clip(cx - 16);
      clip(cx + 11);
    } else if (d === 1) {
      lock(cx - 15, 18);
      lock(cx + 11 + Math.round(fo / 2), 22);
      clip(cx + 11 + Math.round(fo / 2));
    } else if (d === 2) {
      lock(cx - 5, 21);
      clip(cx - 5);
    } else if (d === 3) {
      lock(cx + 11, 18);
      clip(cx + 10);
    } else {
      lock(cx - 15, 20);
      lock(cx + 11, 20);
      clip(cx - 15);
      clip(cx + 11);
    }
  };

  // Thứ tự lớp tùy hướng.
  const aimBehind = (bow === "aim" && uy < -0.3) || (bow === "hang" && !swap && (d === 2 || back));
  if (aimBehind) drawBow();
  backHair();
  if (d === 2 || d === 1) arm(shoulderA, handA, false);
  legs();
  coat();
  if (back) {
    arm(shoulderB, handB, false);
    arm(shoulderA, handA, true);
    backHairOver();
  } else {
    if (d === 0) arm(shoulderA, handA, false);
    arm(shoulderB, handB, true);
  }
  head();
  if (!aimBehind) drawBow();

  const out = P.rot ? g.rotate(P.rot, AX, AY - 2) : g;
  return swap ? out.flip() : out;
}
