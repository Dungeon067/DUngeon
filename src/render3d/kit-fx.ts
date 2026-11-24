/*
 * Hiệu ứng 3D riêng của bộ chiêu (S30). Mỗi nhân vật một motif hạt (nước, hoa mai, lông vũ, hoa tuyết, tia sét),
 * mỗi chiêu một dạng (vòng nở, cung rơi, dây, vệt lao, vòm thủ thế). Tọa độ logic px, đổi sang mét bằng TS.
 */
const TAU = Math.PI * 2;
export interface FxCtx {
  addP: (x: number, y: number, z: number, col: string, s: number) => void;
  glow: (x: number, y: number, z: number, col: string, i: number) => void;
  ground: (x: number, y: number) => number;
  TS: number;
  t: number;
}
/** Điểm thứ j trong n của motif nhân vật, bán kính 1: [x, cao, z]. */
function motif(who: string, j: number, n: number, t: number): [number, number, number] {
  const u = j / n;
  switch (who) {
    case "mailinh": {
      // hoa mai 5 cánh
      const a = u * TAU + t * 0.6,
        r = 0.35 + 0.65 * Math.abs(Math.cos(2.5 * a));
      return [Math.cos(a) * r, 0.15 + (j % 3) * 0.08, Math.sin(a) * r];
    }
    case "bachvu": {
      // lông vũ xoắn ốc bay lên
      const a = u * TAU * 2.5 + t * 5;
      return [Math.cos(a) * (0.3 + u * 0.7), u * 1.4, Math.sin(a) * (0.3 + u * 0.7)];
    }
    case "havy": {
      // hoa tuyết 6 nhánh
      const arm = j % 6,
        d = ((Math.floor(j / 6) + 1) / Math.ceil(n / 6)) * 1,
        a = (arm / 6) * TAU + t * 0.4;
      return [Math.cos(a) * d, 0.12, Math.sin(a) * d];
    }
    case "loidinh": {
      // tia sét gấp khúc
      const a = Math.floor(u * 5) * 1.3 + 0.4,
        h = (u * 5) % 1;
      return [Math.cos(a) * (0.4 + h * 0.6) + Math.sin(j * 7.1) * 0.08, h * 1.8, Math.sin(a) * (0.4 + h * 0.6)];
    }
    default: {
      // Sương Mai: giọt nước theo sóng
      const a = u * TAU;
      return [Math.cos(a), 0.1 + Math.max(0, Math.sin(a * 3 + t * 8)) * 0.35, Math.sin(a)];
    }
  }
}
const pick = (f: any, j: number) => (j % 3 ? f.col : j % 2 ? f.c2 : "#ffffff");

export function kitFx(f: any, C: FxCtx) {
  const k = f.life / f.max,
    S = C.TS,
    x = f.x / S,
    z = f.y / S,
    gy = C.ground(f.x, f.y),
    R = Math.max(0.4, (f.r ?? 60) / S),
    who = f.who ?? "";
  switch (f.id) {
    case "roiCao": {
      // vật bay vòng cung từ người ném tới điểm rơi (đèn trời, tên hoa tuyết)
      const sx = (f.sx ?? f.x) / S,
        sz = (f.sy ?? f.y) / S,
        u = 1 - k;
      for (let j = 0; j < 6; j++) {
        const w = Math.max(0, u - j * 0.03);
        C.addP(sx + (x - sx) * w, gy + 0.9 + Math.sin(w * Math.PI) * 3, sz + (z - sz) * w, pick(f, j), 0.9 - j * 0.1);
      }
      C.glow(sx + (x - sx) * u, gy + 1 + Math.sin(u * Math.PI) * 3, sz + (z - sz) * u, f.col, 1.4);
      if (k < 0.25)
        for (let j = 0; j < 24; j++) {
          const [a, b, c] = motif(who, j, 24, C.t);
          C.addP(x + a * R * 0.5, gy + b + 0.2, z + c * R * 0.5, pick(f, j), 0.6);
        }
      return;
    }
    case "dayDieu":
    case "chiBang": {
      // dây diều / chỉ băng nối các điểm
      const pts: [number, number][] = f.pts ?? [
        [f.sx ?? f.x, f.sy ?? f.y],
        [f.x, f.y],
      ];
      const ox = f.id === "chiBang" ? f.x : (f.sx ?? f.x),
        oy = f.id === "chiBang" ? f.y : (f.sy ?? f.y);
      for (const [px, py] of pts)
        for (let j = 0; j <= 10; j++) {
          const w = j / 10;
          C.addP(
            (ox + (px - ox) * w) / S,
            gy + 0.8 + Math.sin(w * Math.PI) * 0.3,
            (oy + (py - oy) * w) / S,
            pick(f, j),
            0.35 * k + 0.2,
          );
        }
      C.glow(x, gy + 1, z, f.col, 1.2 * k);
      return;
    }
    case "laoVet":
    case "laoSam": {
      // vệt lao dài theo hướng
      const L = (f.r ?? 120) / S;
      for (let j = 0; j < 14; j++) {
        const w = j / 13;
        C.addP(
          x + Math.cos(f.ang) * L * w,
          gy + 0.7 + Math.sin(j * 3.1) * 0.12,
          z + Math.sin(f.ang) * L * w,
          pick(f, j),
          0.6 * k + 0.2,
        );
      }
      return;
    }
    case "theGac": {
      // vòm nước xoay quanh người khi thủ thế
      for (let j = 0; j < 16; j++) {
        const a = (j / 16) * TAU + C.t * 3;
        C.addP(
          x + Math.cos(a) * 0.8,
          gy + 0.6 + Math.sin(a * 2 + C.t * 4) * 0.4,
          z + Math.sin(a) * 0.8,
          pick(f, j),
          0.45,
        );
      }
      C.glow(x, gy + 1, z, f.col, 0.9);
      return;
    }
    case "thienLoi":
    case "voSam":
    case "cocSam": {
      // cột sét từ trời
      for (let b = 0; b < 3; b++) {
        const ax = x + Math.sin(b * 2.3 + f.x) * R * 0.5,
          az = z + Math.cos(b * 1.7 + f.y) * R * 0.5;
        for (let j = 0; j < 12; j++)
          C.addP(ax + Math.sin(j * 5.7 + b) * 0.15, gy + j * 0.45, az, j % 3 ? f.col : f.c2, 1.1 * k + 0.3);
      }
      C.glow(x, gy + 2, z, f.col, 4 * k);
      return;
    }
    default: {
      // vòng nở theo motif: Sóng Bạc, pháo hoa, vòng hoa băng, Bão Trắng...
      const n = f.id === "songBac" || f.id === "phaoHoa" || f.id === "baoTrang" || f.id === "muaHoaTuyet" ? 48 : 28,
        rad = R * (1.1 - k * 0.8),
        up = f.id === "phaoHoa" ? (1 - k) * 3 : 0;
      for (let j = 0; j < n; j++) {
        const [a, b, c] = motif(who, j, n, C.t);
        C.addP(x + a * rad, gy + b + up * (j % 2), z + c * rad, pick(f, j), 0.8 * k + 0.35);
      }
      C.glow(x, gy + 0.9 + up, z, f.col, 2.4 * k);
    }
  }
}

/** Vùng của bộ chiêu (Vệt Sương, Hầm Băng, lốc...): motif quay chậm trên mặt đất. */
export function kitField(f: any, C: FxCtx, who: string) {
  const S = C.TS,
    x = f.x / S,
    z = f.y / S,
    gy = C.ground(f.x, f.y),
    R = f.r / S,
    n = Math.min(40, 12 + Math.round(R * 6));
  const g = { col: f.col, c2: f.c2 ?? "#ffffff" };
  for (let j = 0; j < n; j++) {
    const [a, b, c] = motif(who, j, n, C.t * (f.pull ? 2.5 : 1));
    C.addP(x + a * R * 0.9, gy + b * (f.pull ? 1.5 : 0.6), z + c * R * 0.9, pick(g, j), 0.45);
  }
}
/** Đuôi hạt cho đạn có skin riêng (tên hoa tuyết, đốm lửa, thương ném). */
export function kitTrail(pr: any, C: FxCtx, y: number, col: string, c2: string) {
  for (let j = 0; j < 4; j++)
    C.addP(
      (pr.x - pr.vx * 0.01 * j) / C.TS,
      y + Math.sin(C.t * 25 + j) * 0.05,
      (pr.y - pr.vy * 0.01 * j) / C.TS,
      j % 2 ? col : c2,
      0.7 - j * 0.12,
    );
}
