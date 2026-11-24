/*
 * VFX Hạ Vy (S30): Băng tinh thể và vải buồm. Lớp chính là tinh thể lục giác, gai băng, hoa tuyết 3D,
 * decal phù văn hoa tuyết, sóng xung kích; vải buồm cam (Áo Buồm) là ruy-băng quấn quanh người.
 * Hạt (hoa tuyết, mảnh băng, sao, sương) chỉ là lớp phụ.
 */
import * as THREE from "three";
import type { Vfx } from "../system";
import type { Painters } from "../index";
import * as SH from "../shapes";
import { setCols } from "../mats";

const ICE: [string, string, string] = ["#ffffff", "#9fe6ff", "#3c7fe0"];
const DEEP: [string, string, string] = ["#e8fbff", "#7fd2ff", "#2b5fc4"];
const SAIL: [string, string, string] = ["#fff1d6", "#ffb057", "#c2562a"];
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const hash = (i: number) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/** Hoa tuyết 3D: lõi tinh thể (đặc) + vỏ sáng cộng. */
function flake(
  X: Vfx,
  x: number,
  y: number,
  z: number,
  s: number,
  spin: number,
  tilt: number,
  al: number,
  dis: number,
) {
  const a = X.use("hv-flake", SH.flake3d, { facet: true, add: false, side: THREE.FrontSide });
  const b = X.use("hv-flakeGlow", SH.flake3d, { fres: 1.6 });
  for (const e of [a, b]) {
    if (!e) continue;
    e.m.position.set(x, y, z);
    e.m.rotation.set(tilt, spin, 0, "XYZ");
    e.m.scale.set(s, s, s);
    setCols(e.u, ...ICE);
    e.u.uDis.value = dis;
    e.u.uNA.value = 0.1;
    e.u.uNs.value.set(4, 8);
  }
  if (a) a.u.uA.value = al;
  if (b) {
    b.u.uA.value = al * 0.7;
    b.m.scale.multiplyScalar(1.08);
  }
}
/** Vòng tinh thể nhô lên quanh tâm, nghiêng ra ngoài. */
function crown(
  X: Vfx,
  x: number,
  gy: number,
  z: number,
  R: number,
  n: number,
  grow: number,
  dis: number,
  seed: number,
  h = 1,
) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed,
      r = R * (0.82 + hash(i + seed) * 0.2),
      hh = h * (0.7 + hash(i * 3 + seed) * 0.6),
      g = grow * (1.2 - hash(i * 7) * 0.4);
    const cx = x + Math.cos(a) * r,
      cz = z + Math.sin(a) * r,
      yaw = Math.atan2(Math.cos(a), Math.sin(a));
    X.crystal(i % 3 ? "crystal" : "spike", cx, gy - 0.1, cz, hh, 0.9, -yaw, 0.45, g, dis, DEEP);
    if (i % 2 === 0) X.crystalGlow(cx, gy - 0.1, cz, hh * ease(g), 0.9, -yaw, 0.45, 0.5 * (1 - dis), ICE[1]);
  }
}
const snowBurst = (X: Vfx, x: number, y: number, z: number, n: number, sp: number) => {
  X.emit(n, (i) => {
    const a = (i / n) * Math.PI * 2 + Math.random(),
      v = sp * (0.5 + Math.random() * 0.7);
    return {
      cell: i % 3 ? "manhBang" : "hoaTuyet",
      x,
      y,
      z,
      vx: Math.cos(a) * v,
      vy: 1.5 + Math.random() * 3,
      vz: Math.sin(a) * v,
      grav: 7,
      drag: 1.6,
      life: 0.6 + Math.random() * 0.5,
      size: 0.22 + Math.random() * 0.2,
      size1: 0.08,
      col: ICE[0],
      col1: ICE[2],
      spin: (Math.random() - 0.5) * 12,
    };
  });
  X.emit(4, () => ({
    cell: "sao4",
    x: x + (Math.random() - 0.5) * 1.4,
    y: y + Math.random(),
    z: z + (Math.random() - 0.5) * 1.4,
    life: 0.35,
    size: 0.9,
    size1: 0.1,
    col: "#ffffff",
    col1: ICE[1],
    spin: 3,
  }));
};
// Sương lạnh: cụm khói mềm Băng (SDF 9 vòng), nhỏ và ít để không che chiêu.
const mist = (X: Vfx, x: number, y: number, z: number, R: number, n: number, life = 1.4) => {
  for (let i = 0; i < Math.max(1, Math.round(n / 4)); i++) {
    const a = Math.random() * Math.PI * 2,
      r = Math.sqrt(Math.random()) * R;
    X.puffs.spawn(
      x + Math.cos(a) * r,
      y + 0.2,
      z + Math.sin(a) * r,
      "ice",
      0.3,
      Math.round(life * 36),
      Math.cos(a) * 0.4,
      Math.sin(a) * 0.4,
      0.3,
    );
  }
};

export const HAVY: Painters = {
  fx: {
    /** Tên mức 2 nở hoa tuyết. */
    hoaTuyet(f, X) {
      const V = X.V,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        R = Math.max(1.2, f.r / V.TS),
        a = 1 - f.life / f.max;
      if (X.first(f)) {
        snowBurst(X, x, gy + 1, z, 22, 5);
        mist(X, x, gy, z, R, 8);
      }
      flake(
        X,
        x,
        gy + 1 + ease(a * 2) * 0.5,
        z,
        R * (0.25 + 0.5 * ease(a * 2.5)),
        V.t * 1.4,
        -1.1,
        1,
        Math.max(0, a - 0.55) * 2.2,
      );
      crown(X, x, gy, z, R * 0.5, 6, a * 3.5, Math.max(0, a - 0.5) * 2, f.x, 1.1);
      X.rune("ice", x, gy, z, R * 1.05, a, ICE, 0.9, 0.6);
      X.shock(x, gy, z, R * 1.3, Math.min(1, a * 1.6), ICE, 1);
      if (a < 0.3) X.flash(x, gy + 1.1, z, ICE[1], (1 - a / 0.3) * 4, 2);
    },
    /** Vòng Hoa Băng (bấm). */
    vongHoaBang(f, X) {
      const V = X.V,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        R = Math.max(1.5, f.r / V.TS),
        a = 1 - f.life / f.max;
      if (X.first(f)) {
        snowBurst(X, x, gy + 0.6, z, 26, 7);
        mist(X, x, gy, z, R, 14, 1.8);
      }
      crown(X, x, gy, z, R * 0.85, 12, a * 4, Math.max(0, a - 0.6) * 2.5, 0.3, 1.3);
      crown(X, x, gy, z, R * 0.35, 5, a * 5 - 0.3, Math.max(0, a - 0.55) * 2.2, 1.1, 0.8);
      X.rune("ice", x, gy, z, R * 1.1, a, ICE, 1, 0.4);
      X.shock(x, gy, z, R * 1.35, Math.min(1, a * 1.8), ICE, 1.2);
      X.shock(x, gy + 0.02, z, R * 0.9, Math.min(1, Math.max(0, a - 0.12) * 2), DEEP, 0.8, 0.85);
      if (a < 0.35) X.flash(x, gy + 0.8, z, ICE[1], (1 - a / 0.35) * 5, 2.4);
    },
    /** Chỉ băng khâu nhiều quái. */
    chiBang(f, X) {
      const V = X.V,
        gy = V.ground(f.x, f.y),
        a = 1 - f.life / f.max,
        ox = f.x / V.TS,
        oz = f.y / V.TS;
      for (const [px, py] of (f.pts ?? []) as [number, number][]) {
        const tx = px / V.TS,
          tz = py / V.TS,
          dx = tx - ox,
          dz = tz - oz,
          L = Math.hypot(dx, dz);
        const e = X.use("hv-thread", () => SH.beam(1), { soft: [0, 0, 0.3, 0.3] });
        if (e) {
          e.m.position.set(ox, gy + 1, oz);
          e.m.rotation.set(0, Math.atan2(dx, dz), 0);
          e.m.scale.set(1, 0.09, L);
          setCols(e.u, "#ffffff", ICE[1], SAIL[1]);
          e.u.uAge.value = a;
          e.u.uWin.value.set(-0.2, ease(a * 4) * 1.1);
          e.u.uNs.value.set(12, 2);
          e.u.uScroll.value.set(-3, 0);
          e.u.uDis.value = Math.max(0, a - 0.6) * 2.2;
          e.u.uGlow.value = 1.6;
        }
        X.crystal(
          "spike",
          tx,
          gy + 2.2 - ease(a * 3) * 1.2,
          tz,
          0.9,
          0.7,
          0,
          Math.PI,
          1,
          Math.max(0, a - 0.6) * 2.2,
          DEEP,
        );
        X.rune("ice", tx, gy, tz, 0.7, a, ICE, 0.8, 1.2);
        if (X.first(f.pts)) snowBurst(X, tx, gy + 1, tz, 6, 2);
      }
    },
    /** Áo Buồm: buồm cam quấn người, vỏ sáng. */
    aoBuom(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max;
      sail(X, V.hero, a, 1 - Math.max(0, a - 0.6) * 2.5, 1);
      if (X.first(f))
        X.emit(14, (i) => ({
          cell: i % 2 ? "sao6" : "canhMai",
          x: V.hero.x + Math.cos(i) * 0.8,
          y: V.hero.y + 0.4 + (i % 5) * 0.3,
          z: V.hero.z + Math.sin(i) * 0.8,
          vy: 1.2,
          vx: Math.cos(i) * 0.6,
          vz: Math.sin(i) * 0.6,
          drag: 2,
          life: 0.8,
          size: 0.25,
          size1: 0.05,
          col: SAIL[0],
          col1: SAIL[1],
          spin: 4,
        }));
    },
    /** Vật bay vòng cung (tên mức 2 không dùng; nộ bắn tên lên trời). */
    roiCao(f, X) {
      const V = X.V,
        sx = (f.sx ?? f.x) / V.TS,
        sz = (f.sy ?? f.y) / V.TS,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        u = 1 - f.life / f.max;
      const H = 6;
      const p = (w: number) =>
        new THREE.Vector3(sx + (x - sx) * w, gy + 1 + Math.sin(w * Math.PI) * H, sz + (z - sz) * w);
      const c = p(u),
        d = p(Math.min(1, u + 0.02)).sub(c);
      arrowHead(X, c, Math.atan2(d.x, d.z), -Math.atan2(d.y, Math.hypot(d.x, d.z)), 1.3);
      X.emit(3, () => ({
        cell: Math.random() < 0.5 ? "sao4" : "hoaTuyet",
        x: c.x,
        y: c.y,
        z: c.z,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.5,
        vz: (Math.random() - 0.5) * 0.6,
        life: 0.6,
        size: 0.35,
        size1: 0.05,
        col: "#ffffff",
        col1: ICE[1],
        spin: 5,
      }));
      V.glow(c.x, c.y, c.z, ICE[1], 1.6);
    },
  },
  field: {
    /** Hầm Băng (giữ): nền sương giá, vương miện tinh thể, nhịp xung theo mỗi lần gây sát thương. */
    hamBang(fl, X) {
      const V = X.V,
        x = fl.x / V.TS,
        z = fl.y / V.TS,
        gy = V.ground(fl.x, fl.y),
        R = fl.r / V.TS,
        el = fl.max - fl.life,
        end = Math.max(0, 1 - fl.life / 0.5);
      X.rune("ice", x, gy, z, R, Math.min(0.69, el * 0.5), ICE, 0.75 * (1 - end), 0.15);
      X.shock(x, gy, z, R * 0.98, 1 - ((el % fl.ti) / fl.ti) * 0.999, DEEP, 0.5 * (1 - end), 0.05);
      crown(X, x, gy, z, R * 0.9, 10, el * 2.5, end, 0.7, 1.4);
      crown(X, x, gy, z, R * 0.3, 3, el * 2 - 0.4, end, 2.1, 0.9);
      const pulse = (el % fl.ti) / fl.ti;
      X.shock(x, gy + 0.03, z, R, pulse, ICE, 0.7 * (1 - end));
      if (X.every(fl, 0.12)) {
        mist(X, x, gy, z, R * 0.9, 2, 1.6);
        X.emit(2, () => {
          const a = Math.random() * 6.28,
            r = Math.random() * R;
          return {
            cell: "hoaTuyet",
            x: x + Math.cos(a) * r,
            y: gy + 0.1,
            z: z + Math.sin(a) * r,
            vy: 0.8,
            life: 1.2,
            size: 0.18,
            size1: 0.05,
            col: "#ffffff",
            col1: ICE[1],
            spin: 2,
          };
        });
      }
      V.glow(x, gy + 0.8, z, ICE[1], 1.2 * (1 - end));
    },
    /** Nộ: mưa hoa tuyết. Hoa tuyết khổng lồ trên trời, gió xoáy kéo vào, cột băng rơi theo nhịp. */
    muaHoaTuyet(fl, X) {
      const V = X.V,
        x = fl.x / V.TS,
        z = fl.y / V.TS,
        gy = V.ground(fl.x, fl.y),
        R = fl.r / V.TS,
        el = fl.max - fl.life,
        end = Math.max(0, 1 - fl.life / 0.6),
        open = ease(el * 1.5);
      flake(X, x, gy + 5.2, z, R * 0.55 * open, V.t * 0.5, 0, 1 - end, end);
      X.rune("ice", x, gy, z, R * 1.08, Math.min(0.69, el * 0.4), ICE, 0.9 * (1 - end), 0.25);
      X.rune("ice", x, gy + 0.01, z, R * 0.55, Math.min(0.69, el * 0.4), DEEP, 0.7 * (1 - end), -0.5);
      for (let i = 0; i < 3; i++) {
        const e = X.use("hv-swirl", () => SH.helix(1.4, 1, 0.25, 2.6, 0.5), { soft: [0, 0, 0.4, 0.4] });
        if (!e) continue;
        e.m.position.set(x, gy + 0.1, z);
        e.m.rotation.set(0, -V.t * 2.2 + (i * Math.PI * 2) / 3, 0);
        e.m.scale.set(R, 1, R);
        setCols(e.u, "#ffffff", ICE[1], ICE[2]);
        e.u.uAge.value = 0.3;
        e.u.uA.value = 0.55 * open * (1 - end);
        e.u.uNs.value.set(10, 2);
        e.u.uScroll.value.set(-1.5, 0);
      }
      // Cột băng rơi theo mỗi nhịp sát thương: rơi trong 40% đầu nhịp, vỡ khi chạm đất.
      const k = Math.floor(el / fl.ti),
        ph = (el % fl.ti) / fl.ti;
      for (let j = 0; j < 3; j++) {
        const a = hash(k * 3 + j) * 6.28,
          r = Math.sqrt(hash(k * 7 + j)) * R * 0.8,
          cx = x + Math.cos(a) * r,
          cz = z + Math.sin(a) * r,
          fall = Math.min(1, ph / 0.4);
        if (fall < 1) X.crystal("spike", cx, gy + 6 - fall * fall * 6, cz, 1.6, 1, 0, Math.PI, 1, 0, DEEP);
        else X.crystal("spike", cx, gy - 0.2, cz, 1.1, 1, hash(k + j) * 6, 0.15, 1, (ph - 0.4) * 1.8, DEEP);
      }
      if (X.every(fl, fl.ti))
        for (let j = 0; j < 3; j++) {
          const a = hash(k * 3 + j) * 6.28,
            r = Math.sqrt(hash(k * 7 + j)) * R * 0.8;
          snowBurst(X, x + Math.cos(a) * r, gy + 0.3, z + Math.sin(a) * r, 5, 3);
        }
      X.shock(x, gy, z, R * 0.6, Math.min(1, ph * 2.2), ICE, 0.6 * (1 - end));
      X.emit(3 * (1 - end), () => {
        const a = Math.random() * 6.28,
          r = Math.sqrt(Math.random()) * R;
        return {
          cell: Math.random() < 0.6 ? "hoaTuyet" : "manhBang",
          x: x + Math.cos(a) * r,
          y: gy + 5,
          z: z + Math.sin(a) * r,
          vx: -Math.sin(a) * 1.5 - Math.cos(a) * 0.8,
          vy: -2.6,
          vz: Math.cos(a) * 1.5 - Math.sin(a) * 0.8,
          life: 1.9,
          size: 0.28,
          size1: 0.12,
          col: "#ffffff",
          col1: ICE[1],
          spin: 2.5,
        };
      });
      V.glow(x, gy + 3, z, ICE[1], 2.4 * (1 - end));
    },
  },
  proj(pr, X) {
    const V = X.V,
      x = pr.x / V.TS,
      z = pr.y / V.TS,
      y = V.ground(pr.x, pr.y) + 0.95;
    const big = pr.skin === "flower";
    const c = new THREE.Vector3(x, y, z);
    arrowHead(X, c, Math.atan2(pr.vx, pr.vy), 0, big ? 1.4 : 0.9);
    if (big) flake(X, x, y, z, 0.45, V.t * 9, Math.atan2(pr.vx, pr.vy), 1, 0);
    const e = X.use("hv-trail", () => SH.beam(1), { soft: [0.6, 0.05, 0.35, 0.35] });
    if (e) {
      const L = big ? 2.4 : 1.6;
      e.m.position.copy(c);
      e.m.rotation.set(0, Math.atan2(pr.vx, pr.vy) + Math.PI, 0);
      e.m.scale.set(1, big ? 0.3 : 0.16, L);
      setCols(e.u, "#ffffff", ICE[1], ICE[2]);
      e.u.uAge.value = 0.4;
      e.u.uNs.value.set(8, 2);
      e.u.uScroll.value.set(6, 0);
      e.u.uGlow.value = 1.4;
    }
    X.emit(big ? 3 : 1, () => ({
      cell: big ? "hoaTuyet" : "manhBang",
      x,
      y,
      z,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.3) * 0.8,
      vz: (Math.random() - 0.5) * 0.8,
      life: 0.45,
      size: big ? 0.3 : 0.16,
      size1: 0.04,
      col: "#ffffff",
      col1: ICE[1],
      spin: 6,
    }));
    V.glow(x, y, z, ICE[1], big ? 1.6 : 0.8);
  },
  /** Cảnh nộ: tích tụ sương giá quanh người, decal nở dưới chân, lóe sáng khi bắn. */
  cine(k, X) {
    const V = X.V,
      h = V.hero;
    for (let i = 0; i < 2; i++) {
      const e = X.use("hv-rise", () => SH.helix(2, 1.1, 0.35, 3, 0.4), { soft: [0, 0, 0.4, 0.4] });
      if (!e) continue;
      e.m.position.set(h.x, h.y, h.z);
      e.m.rotation.set(0, V.t * 4 + i * Math.PI, 0);
      e.m.scale.set(1, 0.4 + ease(k * 1.4) * 0.6, 1);
      setCols(e.u, "#ffffff", ICE[1], ICE[2]);
      e.u.uAge.value = k * 0.6;
      e.u.uWin.value.set(-0.2, ease(k * 1.6) * 1.2);
      e.u.uScroll.value.set(-2, 0);
      e.u.uNs.value.set(10, 2);
    }
    X.rune("ice", h.x, h.y, h.z, 1.2 + ease(k * 2) * 1.6, Math.min(0.6, k), ICE, 1, 1.2);
    X.shock(h.x, h.y, h.z, 3.2, (k * 3) % 1, DEEP, 0.6);
    X.emit(4, () => {
      const a = Math.random() * 6.28,
        r = 2.5 + Math.random();
      return {
        cell: Math.random() < 0.5 ? "hoaTuyet" : "sao4",
        x: h.x + Math.cos(a) * r,
        y: h.y + 0.3 + Math.random() * 2.2,
        z: h.z + Math.sin(a) * r,
        vx: -Math.cos(a) * r * 1.6,
        vz: -Math.sin(a) * r * 1.6,
        drag: 0.5,
        life: 0.5,
        size: 0.3,
        size1: 0.06,
        col: "#ffffff",
        col1: ICE[1],
        spin: 4,
      };
    });
    X.flash(h.x, h.y + 1.2, h.z, ICE[1], 1 + k * 3 + (k > 0.85 ? (k - 0.85) * 40 : 0), 1.4);
  },
  /** Ngắm trọng kích: vòng hội tụ trước cung, decal dưới chân lớn theo mức, đầu tên nở hoa tuyết. */
  charge(ch, X) {
    const V = X.V,
      h = V.hero,
      yaw = V.heroYaw,
      k = Math.min(1, ch.t / 1.3),
      lv = ch.lv,
      fx = Math.sin(yaw),
      fz = Math.cos(yaw);
    const tip = new THREE.Vector3(h.x + fx * 0.75, h.y + 1.3, h.z + fz * 0.75);
    X.rune("ice", h.x, h.y, h.z, 0.7 + k * 0.9, 0.3, ICE, 0.4 + k * 0.5, 0.5 + k * 2);
    for (let i = 0; i < 2; i++) {
      const e = X.use("hv-focus", () => SH.shock(0.82), { soft: [0, 0, 0.3, 0.3] });
      if (!e) break;
      const ph = (V.t * (1.2 + lv) + i * 0.5) % 1;
      e.m.position.copy(tip);
      e.m.rotation.set(Math.PI / 2, yaw, 0, "YXZ");
      const r = 0.9 * (1 - ph) + 0.12;
      e.m.scale.set(r, 1, r);
      setCols(e.u, ...ICE);
      e.u.uAge.value = 0.3;
      e.u.uA.value = ph * (0.6 + k * 0.6);
      e.u.uNs.value.set(16, 2);
      e.u.uScroll.value.set(1, 0);
    }
    if (lv >= 0) flake(X, tip.x, tip.y, tip.z, 0.12 + lv * 0.1, V.t * 6, Math.PI / 2, 1, 0);
    if (ch._lv !== lv) {
      ch._lv = lv;
      if (lv >= 0) {
        X.flash(tip.x, tip.y, tip.z, ICE[1], 4 + lv * 2, 1.2);
        snowBurst(X, tip.x, tip.y, tip.z, 6 + lv * 6, 2.5);
        X.shock(h.x, h.y, h.z, 1.8 + lv, 0.1, ICE, 1);
      }
    }
    X.emit(2 + lv * 2, () => {
      const a = Math.random() * 6.28,
        r = 0.9 + Math.random() * 0.5;
      return {
        cell: Math.random() < 0.5 ? "sao4" : "manhBang",
        x: tip.x + Math.cos(a) * r * Math.cos(yaw),
        y: tip.y + Math.sin(a) * r,
        z: tip.z - Math.cos(a) * r * Math.sin(yaw),
        vx: -Math.cos(a) * r * 3 * Math.cos(yaw),
        vy: -Math.sin(a) * r * 3,
        vz: Math.cos(a) * r * 3 * Math.sin(yaw),
        life: 0.3,
        size: 0.14,
        size1: 0.03,
        col: "#ffffff",
        col1: ICE[1],
        spin: 5,
      };
    });
    V.glow(tip.x, tip.y, tip.z, ICE[1], 1 + k * 2);
  },
  /** Khi Áo Buồm còn hiệu lực: vỏ khiên mờ và buồm quấn nhẹ. */
  aura(m, X) {
    const s = m.sts?.find((x: any) => x.id === "aoBuom");
    if (s) sail(X, X.V.hero, 0.5, Math.min(1, s.t) * 0.35, 0.5);
  },
};

function arrowHead(X: Vfx, c: THREE.Vector3, yaw: number, pitch: number, s: number) {
  X.crystal("crystal", c.x, c.y, c.z, 0.42 * s, 0.22 * s, yaw, Math.PI / 2 + pitch, 1, 0, ICE);
  X.crystalGlow(c.x, c.y, c.z, 0.42 * s, 0.22 * s, yaw, Math.PI / 2 + pitch, 0.8, ICE[1]);
}
function sail(X: Vfx, h: THREE.Vector3, a: number, al: number, w: number) {
  const d = X.use("hv-shell", SH.ball, { fres: 2.4, fresAlpha: true });
  if (d) {
    d.m.position.set(h.x, h.y + 0.95, h.z);
    d.m.scale.set(0.95, 1.2, 0.95).multiplyScalar(0.8 + ease(a * 4) * 0.2);
    setCols(d.u, SAIL[0], SAIL[1], ICE[1]);
    d.u.uAge.value = 0.5;
    d.u.uA.value = al * 0.5;
    d.u.uNs.value.set(14, 14);
    d.u.uScroll.value.set(0.3, 0.6);
  }
  for (let i = 0; i < 2; i++) {
    const e = X.use("hv-sail", () => SH.helix(1.25, 0.85, 0.7, 1.8, 0.55), { soft: [0.15, 0.15, 0.2, 0.2] });
    if (!e) continue;
    e.m.position.set(h.x, h.y + 0.1, h.z);
    e.m.rotation.set(0, X.V.t * 2.5 * (i ? -1 : 1) + i * 2, 0);
    setCols(e.u, ...SAIL);
    e.u.uAge.value = 0.35;
    e.u.uA.value = al * w;
    e.u.uWin.value.set(-0.2, ease(a * 3) * 1.2);
    e.u.uNs.value.set(6, 3);
    e.u.uScroll.value.set(-0.8, 0);
  }
}
