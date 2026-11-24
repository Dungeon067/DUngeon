/*
 * Texture tự vẽ cho VFX (S30): atlas hạt 4x4 (sao, hoa tuyết, mảnh băng, cánh mai, lông vũ, tàn lửa...)
 * và decal phù văn mặt đất theo nguyên tố. Vẽ một lần bằng canvas, màu trắng để shader nhuộm theo chiêu.
 */
import * as THREE from "three";

const TAU = Math.PI * 2;
export const CELL = {
  sao4: 0,
  sao6: 1,
  hoaTuyet: 2,
  manhBang: 3,
  canhMai: 4,
  hoaMai: 5,
  longVu: 6,
  tanLua: 7,
  giotNuoc: 8,
  soiGio: 9,
  tiaLua: 10,
  khoi: 11,
  tiaSet: 12,
  quang: 13,
  bui: 14,
  manhVo: 15,
} as const;
export type Cell = keyof typeof CELL;

type Ctx = CanvasRenderingContext2D;
const glowFill = (c: Ctx, r: number, a = 1) => {
  const g = c.createRadialGradient(0, 0, 0, 0, 0, r);
  g.addColorStop(0, `rgba(255,255,255,${a})`);
  g.addColorStop(1, "rgba(255,255,255,0)");
  c.fillStyle = g;
};
function star(c: Ctx, n: number, R: number, r: number) {
  c.beginPath();
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * TAU - Math.PI / 2,
      d = i % 2 ? r : R;
    c.lineTo(Math.cos(a) * d, Math.sin(a) * d);
  }
  c.closePath();
}
/** Hoa tuyết 6 nhánh có nhánh phụ, nét trắng. */
export function snowflake(c: Ctx, R: number, w: number) {
  c.lineCap = "round";
  c.lineWidth = w;
  for (let i = 0; i < 6; i++) {
    c.save();
    c.rotate((i / 6) * TAU);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, -R);
    for (const [d, l] of [
      [0.35, 0.3],
      [0.6, 0.24],
      [0.82, 0.14],
    ]) {
      c.moveTo(0, -R * d);
      c.lineTo(-R * l, -R * (d + l * 0.8));
      c.moveTo(0, -R * d);
      c.lineTo(R * l, -R * (d + l * 0.8));
    }
    c.stroke();
    c.restore();
  }
}
const PAINT: ((c: Ctx, S: number) => void)[] = [
  // sao4: chớp sáng 4 tia
  (c, S) => {
    glowFill(c, S * 0.2, 0.9);
    c.fillRect(-S, -S, 2 * S, 2 * S);
    c.fillStyle = "#fff";
    star(c, 4, S * 0.48, S * 0.05);
    c.fill();
  },
  // sao6
  (c, S) => {
    glowFill(c, S * 0.25, 0.6);
    c.fillRect(-S, -S, 2 * S, 2 * S);
    c.fillStyle = "#fff";
    star(c, 6, S * 0.42, S * 0.09);
    c.fill();
  },
  // hoa tuyết
  (c, S) => {
    c.strokeStyle = "#fff";
    c.shadowColor = "#fff";
    c.shadowBlur = S * 0.08;
    snowflake(c, S * 0.44, S * 0.05);
  },
  // mảnh băng: lăng trụ nhọn có mặt sáng tối
  (c, S) => {
    c.beginPath();
    c.moveTo(0, -S * 0.48);
    c.lineTo(S * 0.15, -S * 0.05);
    c.lineTo(S * 0.07, S * 0.46);
    c.lineTo(-S * 0.12, S * 0.2);
    c.closePath();
    c.fillStyle = "rgba(255,255,255,.75)";
    c.fill();
    c.beginPath();
    c.moveTo(0, -S * 0.48);
    c.lineTo(S * 0.15, -S * 0.05);
    c.lineTo(S * 0.02, S * 0.05);
    c.closePath();
    c.fillStyle = "#fff";
    c.fill();
  },
  // cánh mai đơn
  (c, S) => {
    const g = c.createRadialGradient(0, S * 0.25, 0, 0, 0, S * 0.45);
    g.addColorStop(0, "rgba(255,255,255,.55)");
    g.addColorStop(1, "#fff");
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(0, S * 0.4);
    c.bezierCurveTo(S * 0.42, S * 0.1, S * 0.3, -S * 0.42, 0, -S * 0.3);
    c.bezierCurveTo(-S * 0.3, -S * 0.42, -S * 0.42, S * 0.1, 0, S * 0.4);
    c.fill();
  },
  // hoa mai 5 cánh có nhụy
  (c, S) => {
    c.fillStyle = "rgba(255,255,255,.92)";
    for (let i = 0; i < 5; i++) {
      c.save();
      c.rotate((i / 5) * TAU);
      c.beginPath();
      c.ellipse(0, -S * 0.22, S * 0.15, S * 0.21, 0, 0, TAU);
      c.fill();
      c.restore();
    }
    c.fillStyle = "rgba(255,255,255,.45)";
    c.beginPath();
    c.arc(0, 0, S * 0.09, 0, TAU);
    c.fill();
    c.strokeStyle = "#fff";
    c.lineWidth = S * 0.015;
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * TAU;
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(Math.cos(a) * S * 0.16, Math.sin(a) * S * 0.16);
      c.stroke();
    }
  },
  // lông vũ: thân cong, phiến tơ
  (c, S) => {
    c.strokeStyle = "#fff";
    c.lineWidth = S * 0.02;
    c.beginPath();
    c.moveTo(0, S * 0.46);
    c.quadraticCurveTo(S * 0.06, 0, 0, -S * 0.46);
    c.stroke();
    c.lineWidth = S * 0.012;
    for (let i = 0; i < 26; i++) {
      const u = i / 25,
        y = S * (0.36 - u * 0.8),
        l = S * 0.2 * Math.sin(u * Math.PI) + S * 0.02;
      c.globalAlpha = 0.5 + 0.5 * Math.sin(u * Math.PI);
      c.beginPath();
      c.moveTo(S * 0.03, y);
      c.lineTo(l, y - S * 0.07);
      c.moveTo(S * 0.03, y);
      c.lineTo(-l, y - S * 0.07);
      c.stroke();
    }
    c.globalAlpha = 1;
  },
  // tàn lửa: giọt lửa nhọn đuôi
  (c, S) => {
    const g = c.createRadialGradient(0, S * 0.12, 0, 0, S * 0.12, S * 0.3);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.5, "rgba(255,255,255,.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(0, -S * 0.45);
    c.bezierCurveTo(S * 0.28, -S * 0.05, S * 0.26, S * 0.4, 0, S * 0.4);
    c.bezierCurveTo(-S * 0.26, S * 0.4, -S * 0.28, -S * 0.05, 0, -S * 0.45);
    c.fill();
  },
  // giọt nước có điểm sáng
  (c, S) => {
    const g = c.createRadialGradient(-S * 0.06, S * 0.08, 0, 0, S * 0.1, S * 0.28);
    g.addColorStop(0, "rgba(255,255,255,.35)");
    g.addColorStop(0.8, "rgba(255,255,255,.8)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(0, -S * 0.4);
    c.bezierCurveTo(S * 0.3, 0, S * 0.24, S * 0.34, 0, S * 0.34);
    c.bezierCurveTo(-S * 0.24, S * 0.34, -S * 0.3, 0, 0, -S * 0.4);
    c.fill();
    c.fillStyle = "#fff";
    c.beginPath();
    c.ellipse(-S * 0.08, S * 0.08, S * 0.04, S * 0.08, 0.4, 0, TAU);
    c.fill();
  },
  // sợi gió: nét cong thuôn hai đầu
  (c, S) => {
    c.strokeStyle = "#fff";
    c.lineCap = "round";
    for (let i = 0; i < 3; i++) {
      c.globalAlpha = 1 - i * 0.3;
      c.lineWidth = S * (0.05 - i * 0.012);
      c.beginPath();
      c.arc(0, S * 0.35, S * (0.55 - i * 0.12), -Math.PI * 0.82, -Math.PI * 0.18);
      c.stroke();
    }
    c.globalAlpha = 1;
  },
  // tia lửa dài (kéo theo vận tốc)
  (c, S) => {
    const g = c.createLinearGradient(0, -S * 0.48, 0, S * 0.48);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.75, "#fff");
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.beginPath();
    c.ellipse(0, 0, S * 0.045, S * 0.48, 0, 0, TAU);
    c.fill();
  },
  // khói mềm có gợn
  (c, S) => {
    for (let i = 0; i < 7; i++) {
      const a = i * 2.4,
        d = S * 0.13 * (i % 3);
      c.save();
      c.translate(Math.cos(a) * d, Math.sin(a) * d);
      const r = S * (0.3 - (i % 3) * 0.05);
      glowFill(c, r, 0.35);
      c.beginPath();
      c.arc(0, 0, r, 0, TAU);
      c.fill();
      c.restore();
    }
  },
  // tia sét gấp khúc
  (c, S) => {
    c.strokeStyle = "#fff";
    c.lineJoin = "miter";
    c.shadowColor = "#fff";
    c.shadowBlur = S * 0.06;
    c.lineWidth = S * 0.035;
    c.beginPath();
    c.moveTo(-S * 0.05, -S * 0.46);
    c.lineTo(S * 0.12, -S * 0.12);
    c.lineTo(-S * 0.06, -S * 0.02);
    c.lineTo(S * 0.1, S * 0.22);
    c.lineTo(-S * 0.02, S * 0.46);
    c.stroke();
  },
  // quầng sáng mềm (chỉ làm lõi đèn, không dùng như hạt)
  (c, S) => {
    glowFill(c, S * 0.48, 0.9);
    c.fillRect(-S, -S, 2 * S, 2 * S);
  },
  // bụi: đốm méo, mép mờ
  (c, S) => {
    for (let i = 0; i < 4; i++) {
      c.save();
      c.translate(Math.sin(i * 2.1) * S * 0.12, Math.cos(i * 1.7) * S * 0.1);
      c.scale(1, 0.7);
      glowFill(c, S * 0.2, 0.55);
      c.fillRect(-S, -S, 2 * S, 2 * S);
      c.restore();
    }
  },
  // mảnh vỡ tam giác có cạnh sáng
  (c, S) => {
    c.beginPath();
    c.moveTo(-S * 0.3, S * 0.25);
    c.lineTo(S * 0.05, -S * 0.38);
    c.lineTo(S * 0.32, S * 0.18);
    c.closePath();
    c.fillStyle = "rgba(255,255,255,.7)";
    c.fill();
    c.strokeStyle = "#fff";
    c.lineWidth = S * 0.03;
    c.stroke();
  },
];

let atlas: THREE.CanvasTexture | null = null;
/** Atlas 4x4 ô 128 px. */
export function spriteAtlas(): THREE.Texture {
  if (atlas) return atlas;
  const N = 128,
    cv = document.createElement("canvas");
  cv.width = cv.height = N * 4;
  const c = cv.getContext("2d")!;
  PAINT.forEach((f, i) => {
    c.save();
    c.translate((i % 4) * N + N / 2, Math.floor(i / 4) * N + N / 2);
    c.beginPath();
    c.rect(-N / 2 + 2, -N / 2 + 2, N - 4, N - 4);
    c.clip();
    f(c, N);
    c.restore();
  });
  atlas = new THREE.CanvasTexture(cv);
  atlas.colorSpace = THREE.NoColorSpace;
  atlas.generateMipmaps = true;
  atlas.minFilter = THREE.LinearMipmapLinearFilter;
  return atlas;
}

export type Rune = "ice" | "water" | "fire" | "wind" | "bolt" | "earth" | "wood";
const runes = new Map<Rune, THREE.CanvasTexture>();
/** Decal phù văn mặt đất theo nguyên tố, trắng trên nền trong suốt. */
export function runeTex(k: Rune): THREE.Texture {
  const old = runes.get(k);
  if (old) return old;
  const S = 512,
    cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const c = cv.getContext("2d")!;
  c.translate(S / 2, S / 2);
  c.strokeStyle = c.fillStyle = "#fff";
  c.shadowColor = "#fff";
  c.shadowBlur = 6;
  const ring = (r: number, w: number, a = 1) => {
    c.globalAlpha = a;
    c.lineWidth = w;
    c.beginPath();
    c.arc(0, 0, r, 0, TAU);
    c.stroke();
    c.globalAlpha = 1;
  };
  ring(246, 5);
  ring(232, 2, 0.6);
  if (k === "ice") {
    for (let i = 0; i < 6; i++) {
      c.save();
      c.rotate((i / 6) * TAU);
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(0, -150);
      c.lineTo(130, -75);
      c.stroke();
      c.restore();
    }
    snowflake(c, 140, 6);
    c.lineWidth = 2;
    for (let i = 0; i < 36; i++) {
      c.save();
      c.rotate((i / 36) * TAU);
      c.beginPath();
      c.moveTo(0, -232);
      c.lineTo(i % 3 ? 6 : 10, -214);
      c.lineTo(0, -196);
      c.lineTo(i % 3 ? -6 : -10, -214);
      c.closePath();
      c.stroke();
      c.restore();
    }
    ring(190, 3, 0.8);
  } else if (k === "water") {
    for (let r = 60; r < 200; r += 34) {
      c.lineWidth = 3;
      c.beginPath();
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * TAU,
          rr = r + Math.sin(a * 9 + r) * 6;
        c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      c.stroke();
    }
    for (let i = 0; i < 12; i++) {
      c.save();
      c.rotate((i / 12) * TAU);
      c.beginPath();
      c.arc(0, -214, 9, 0, TAU);
      c.stroke();
      c.restore();
    }
  } else if (k === "fire") {
    for (let i = 0; i < 5; i++) {
      c.save();
      c.rotate((i / 5) * TAU);
      c.lineWidth = 4;
      c.beginPath();
      c.ellipse(0, -95, 55, 85, 0, 0, TAU);
      c.stroke();
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(0, -20);
      c.lineTo(0, -160);
      c.stroke();
      c.restore();
    }
    ring(34, 4);
    for (let i = 0; i < 20; i++) {
      c.save();
      c.rotate((i / 20) * TAU);
      c.beginPath();
      c.moveTo(-8, -205);
      c.quadraticCurveTo(0, -232, 8, -205);
      c.stroke();
      c.restore();
    }
  } else if (k === "wind") {
    c.lineCap = "round";
    for (let arm = 0; arm < 4; arm++) {
      c.lineWidth = 5;
      c.beginPath();
      for (let i = 0; i <= 60; i++) {
        const u = i / 60,
          a = arm * (TAU / 4) + u * 4.2,
          r = 24 + u * 190;
        c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      c.stroke();
    }
    ring(120, 2, 0.6);
  } else {
    c.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      c.save();
      c.rotate((i / 8) * TAU);
      c.beginPath();
      c.moveTo(0, -40);
      c.lineTo(14, -90);
      c.lineTo(-10, -120);
      c.lineTo(10, -170);
      c.lineTo(0, -210);
      c.stroke();
      c.restore();
    }
    ring(130, 3);
    ring(60, 4);
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.NoColorSpace;
  runes.set(k, t);
  return t;
}
