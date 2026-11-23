/*
 * VFX Bạch Vũ (S30): Phong, lữ khách lông hạc và con diều. Lớp chính là ruy-băng gió xoắn nhiều tầng,
 * lưỡi gió cong quay quanh tâm lốc, lông vũ 3D, dây diều căng và cánh diều, decal phù văn gió.
 * Lốc hút được nguyên tố nào thì nhuộm màu nguyên tố đó. Hạt (lông, sợi gió, sao) chỉ là lớp phụ.
 */
import * as THREE from "three";
import type { Vfx } from "../system";
import type { Painters } from "../index";
import * as SH from "../shapes";
import { setCols } from "../mats";

const WIND: [string, string, string] = ["#ffffff", "#bff7e2", "#34c99a"];
const FEATHER: [string, string, string] = ["#ffffff", "#eefcf6", "#9fdcc6"];
const TINT: Record<string, string> = { fire: "#ff8a3c", water: "#4fb0ff", ice: "#a6ecff", bolt: "#c08bff" };
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const TAU = Math.PI * 2;
const cols = (el?: string | null): [string, string, string] => (el && TINT[el] ? [WIND[0], WIND[1], TINT[el]] : WIND);

/** Lông vũ 3D: phiến cong dài, quay theo hướng bay. */
function feather(X: Vfx, x: number, y: number, z: number, s: number, yaw: number, roll: number, al: number) {
  const e = X.use("bv-feather", SH.petal, { add: false, side: THREE.DoubleSide, fres: 0.8 });
  if (!e) return;
  e.m.position.set(x, y, z);
  e.m.rotation.set(roll, yaw, 0.3, "YXZ");
  e.m.scale.set(0.35 * s, s, s);
  setCols(e.u, ...FEATHER);
  e.u.uAge.value = 0.3;
  e.u.uA.value = al;
  e.u.uNs.value.set(2, 20);
  e.u.uNA.value = 0.25;
}
/** Phễu lốc: các ruy-băng xoắn chồng nhau, quay nhanh, mở dần lên trên. */
function funnel(
  X: Vfx,
  x: number,
  gy: number,
  z: number,
  R: number,
  H: number,
  n: number,
  k: number,
  al: number,
  c: [string, string, string],
) {
  for (let i = 0; i < n; i++) {
    const e = X.use("bv-helix", () => SH.helix(1.8, 0.35, 1, 1, 0.22), { soft: [0.1, 0.1, 0.25, 0.25] });
    if (!e) break;
    e.m.position.set(x, gy + 0.05, z);
    e.m.rotation.set(0, X.V.t * (5 + i * 0.7) + (i * TAU) / n, 0);
    const r = R * (0.75 + 0.25 * ((i % 3) / 2));
    e.m.scale.set(r, H * (0.8 + 0.2 * (i % 2)), r);
    setCols(e.u, ...c);
    e.u.uAge.value = 0.45 + (i % 3) * 0.15;
    e.u.uA.value = al * (0.28 + 0.14 * (i % 2));
    e.u.uWin.value.set(-0.2, ease(k) * 1.25);
    e.u.uScroll.value.set(-2.5, 0);
    e.u.uNs.value.set(6, 3);
  }
}
/** Lưỡi gió cong nằm ngang quay quanh tâm ở các độ cao khác nhau. */
function blades(
  X: Vfx,
  x: number,
  gy: number,
  z: number,
  R: number,
  n: number,
  al: number,
  c: [string, string, string],
  h = 0.4,
) {
  for (let i = 0; i < n; i++) {
    const e = X.use("bv-blade", () => SH.blade(1.5, 0.22), { soft: [0.05, 0.05, 0.3, 0.3] });
    if (!e) break;
    e.m.position.set(x, gy + h + i * 0.5, z);
    e.m.rotation.set(0.15 * Math.sin(i * 2.3), -X.V.t * (6 - i * 0.8) + i * 2.1, 0, "YXZ");
    e.m.scale.set(R * (1 - i * 0.08), 1, R * (1 - i * 0.08));
    setCols(e.u, ...c);
    e.u.uAge.value = 0.5;
    e.u.uA.value = al * 0.7;
    e.u.uScroll.value.set(-3, 0);
    e.u.uNs.value.set(10, 2);
  }
}
/** Lông và sợi gió bị hút vào tâm theo xoáy. */
function suck(X: Vfx, x: number, gy: number, z: number, R: number, n: number, c: [string, string, string]) {
  X.emit(n, (i) => {
    const a = Math.random() * TAU,
      r = R * (0.9 + Math.random() * 0.4);
    return {
      cell: i % 2 ? "longVu" : "soiGio",
      x: x + Math.cos(a) * r,
      y: gy + 0.2 + Math.random() * 1.6,
      z: z + Math.sin(a) * r,
      vx: -Math.cos(a) * r * 1.2 - Math.sin(a) * r * 2,
      vy: 1.2,
      vz: -Math.sin(a) * r * 1.2 + Math.cos(a) * r * 2,
      drag: 1,
      life: 0.6,
      size: i % 2 ? 0.3 : 0.4,
      size1: 0.08,
      col: "#ffffff",
      col1: c[2],
      spin: 6,
      stretch: i % 2 ? 1 : 2.4,
    };
  });
}

export const BACHVU: Painters = {
  fx: {
    /** Dây Diều Kéo Gió: dây diều căng từ tay tới điểm kéo, cánh diều lượn ở đầu dây, lưỡi gió quét. */
    dayDieu(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max,
        sx = (f.sx ?? f.x) / V.TS,
        sz = (f.sy ?? f.y) / V.TS,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        out = ease(a * 4),
        back = a > 0.5 ? ease((a - 0.5) * 2) : 0;
      const kx = x + (sx - x) * back * 0.7,
        kz = z + (sz - z) * back * 0.7,
        ky = gy + 1.6 + Math.sin(V.t * 6) * 0.1;
      const ex = sx + (kx - sx) * out,
        ez = sz + (kz - sz) * out,
        ey = gy + 1.1 + (ky - gy - 1.1) * out;
      const d = new THREE.Vector3(ex - sx, ey - gy - 1.1, ez - sz),
        L = d.length();
      const s = X.use("bv-string", () => SH.beam(0.03), { soft: [0, 0, 0.3, 0.3] });
      if (s && L > 0.01) {
        s.m.position.set(sx, gy + 1.1, sz);
        s.m.rotation.set(-Math.atan2(d.y, Math.hypot(d.x, d.z)), Math.atan2(d.x, d.z), 0, "YXZ");
        s.m.scale.set(1, 1, L);
        setCols(s.u, ...WIND);
        s.u.uAge.value = 0.2;
        s.u.uA.value = 1 - a * 0.5;
      }
      const k = X.use("bv-kite", SH.crystal, { add: false, side: THREE.DoubleSide, fres: 0.6 });
      if (k) {
        k.m.position.set(ex, ey - 0.3, ez);
        k.m.rotation.set(0.4, Math.atan2(d.x, d.z) + Math.sin(V.t * 5) * 0.2, 0, "YXZ");
        k.m.scale.set(0.5, 0.6, 0.08);
        setCols(k.u, "#ffffff", "#e9fff6", "#5fd8b0");
        k.u.uAge.value = 0.4;
        k.u.uA.value = 1 - Math.max(0, a - 0.8) * 5;
      }
      feather(X, ex, ey - 0.75, ez, 0.35, V.t * 2, 1.2 + Math.sin(V.t * 7) * 0.3, 1 - a);
      blades(X, x, gy, z, ((f.r ?? 120) / V.TS) * (0.4 + out * 0.6), 2, (1 - a) * 0.9, WIND, 0.5);
      X.rune("wind", x, gy, z, ((f.r ?? 120) / V.TS) * out, a, WIND, (1 - a) * 0.7, -2);
      if (X.every(f, 0.05)) suck(X, x, gy, z, (f.r ?? 120) / V.TS, 2, WIND);
    },
  },
  field: {
    /** Lốc Lông Vũ: phễu ruy-băng xoắn, lưỡi gió quay, lông bị hút vào, phù văn gió; nhuộm theo nguyên tố hút. */
    locLongVu(fl, X) {
      const V = X.V,
        a = 1 - fl.life / fl.max,
        x = fl.x / V.TS,
        z = fl.y / V.TS,
        gy = V.ground(fl.x, fl.y),
        R = (fl.r ?? 110) / V.TS,
        c = cols(fl.hutEl),
        born = ease(a * fl.max * 3),
        out = Math.min(1, (fl.life ?? 1) * 4);
      funnel(X, x, gy, z, R * 0.7 * born, 2.2 * born, 4, born, out, c);
      blades(X, x, gy, z, R * 0.85, 2, 0.8 * out, c);
      X.rune("wind", x, gy, z, R, Math.min(0.5, a * 3), c, 0.7 * out, -1.5);
      X.shock(x, gy, z, R * 1.1, (V.t * 2.5) % 1, c, 0.45 * out);
      if (X.every(fl, 0.05)) suck(X, x, gy, z, R, 2, c);
      if (X.every(fl, 0.2)) feather(X, x, gy + 1.5, z, 0.3, V.t * 4, 0.6, out);
      V.glow(x, gy + 1, z, c[1], 0.8 * out);
    },
    /** Bão Trắng: phễu lớn hai lớp, ba tầng lưỡi gió, mưa lông hạc, phù văn lớn; dư âm lông rơi trên sân. */
    baoTrang(fl, X) {
      const V = X.V,
        a = 1 - fl.life / fl.max,
        x = fl.x / V.TS,
        z = fl.y / V.TS,
        gy = V.ground(fl.x, fl.y),
        R = (fl.r ?? 170) / V.TS,
        c = cols(fl.hutEl),
        born = ease(a * fl.max * 1.5),
        out = Math.min(1, (fl.life ?? 1) * 2);
      funnel(X, x, gy, z, R * 0.8 * born, 3.6 * born, 4, born, out * 0.55, c);
      blades(X, x, gy, z, R * 0.9, 3, 0.55 * out, c, 0.3);
      X.rune("wind", x, gy, z, R * 1.05, Math.min(0.5, a * 4), c, 0.8 * out, -0.8);
      X.shock(x, gy, z, R * 1.2, (V.t * 1.5) % 1, c, 0.5 * out);
      if (X.every(fl, 0.03)) suck(X, x, gy, z, R * 1.1, 3, c);
      for (let i = 0; i < 6; i++) {
        const t = V.t * 2.2 + (i * TAU) / 6,
          r = R * (0.45 + 0.2 * Math.sin(V.t + i));
        feather(
          X,
          x + Math.cos(t) * r,
          gy + 0.8 + ((V.t * 0.6 + i / 6) % 1) * 2.6,
          z + Math.sin(t) * r,
          0.4,
          -t,
          0.8,
          out * 0.9,
        );
      }
      if (X.first(fl)) X.flash(x, gy + 1.2, z, c[1], 2, 1.4);
      V.glow(x, gy + 1.4, z, c[1], 1.4 * out);
    },
  },
  /** Cảnh nộ: gió tụ quanh người thành phễu, lông hạc cuốn lên, phù văn gió nở. */
  cine(k, X) {
    const V = X.V,
      h = V.hero;
    X.rune("wind", h.x, h.y, h.z, 1 + ease(k * 2) * 1.8, Math.min(0.6, k), WIND, 0.9, -1.5);
    funnel(X, h.x, h.y, h.z, 1.2, 2.6 * ease(k * 1.5), 4, k * 1.5, 0.8, WIND);
    for (let i = 0; i < 5; i++) {
      const t = V.t * 3 + (i * TAU) / 5;
      feather(
        X,
        h.x + Math.cos(t) * 1.1,
        h.y + 0.5 + k * 1.5 + i * 0.12,
        h.z + Math.sin(t) * 1.1,
        0.4,
        -t,
        0.8,
        Math.min(1, k * 3),
      );
    }
    if (k > 0.85) X.shock(h.x, h.y, h.z, 3.5, (k - 0.85) * 6, WIND, 0.6);
    suck(X, h.x, h.y, h.z, 2.2, 2, WIND);
  },
  /** Lông Hạc còn hiệu lực: hai lông vũ lượn quanh vai và sợi gió mảnh. */
  aura(m, X) {
    const s = m.sts?.find((x: any) => x.id === "longHac");
    if (!s) return;
    const h = X.V.hero,
      al = Math.min(1, s.t) * 0.8;
    for (let i = 0; i < 2; i++) {
      const t = X.V.t * 2 + i * Math.PI;
      feather(X, h.x + Math.cos(t) * 0.6, h.y + 1.3 + Math.sin(t * 2) * 0.1, h.z + Math.sin(t) * 0.6, 0.25, -t, 1, al);
    }
  },
};
