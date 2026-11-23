/*
 * VFX Sương Mai (S30): Thủy, kiếm và sương sớm trên mặt sông. Lớp chính là lưỡi nước hình trăng lưỡi liềm,
 * vách sóng bạc nhiều tầng, vòm nước khi thủ thế, decal phù văn sóng và sương đọng trên nền.
 * Hạt (giọt nước, sao, sương) chỉ là lớp phụ.
 */
import type { Vfx } from "../system";
import type { Painters } from "../index";
import * as SH from "../shapes";
import { setCols } from "../mats";

const WATER: [string, string, string] = ["#ffffff", "#9fdcff", "#2f7fe8"];
const SILVER: [string, string, string] = ["#ffffff", "#e6f3ff", "#7fa9d6"];
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
/** Góc 2D của trận (x→X, y→Z) sang góc quay Y của three. */
const yawOf = (ang: number) => Math.atan2(Math.cos(ang), Math.sin(ang));

/** Lưỡi nước lưỡi liềm nằm ngang: lõi trắng + vỏ nhiễu xanh, quét theo cửa sổ u. */
function crescent(
  X: Vfx,
  key: string,
  x: number,
  y: number,
  z: number,
  R: number,
  yaw: number,
  tilt: number,
  arc: number,
  w: number,
  sweep: number,
  al: number,
  dis: number,
) {
  const layers: [string, [string, string, string], number, number][] = [
    [`${key}-o`, WATER, 1, 1],
    [`${key}-i`, SILVER, 0.4, 0.75],
  ];
  for (const [k, cols, ws, aa] of layers) {
    const e = X.use(k, () => SH.blade(arc, w * ws), { soft: [0.05, 0.05, 0.25, 0.25] });
    if (!e) continue;
    e.m.position.set(x, y, z);
    e.m.rotation.set(tilt, yaw, 0, "YXZ");
    e.m.scale.set(R, 1, R);
    setCols(e.u, ...cols);
    e.u.uAge.value = Math.min(0.9, dis + 0.2);
    e.u.uA.value = al * aa;
    e.u.uDis.value = dis;
    e.u.uWin.value.set(sweep - 0.6, sweep + 0.05);
    e.u.uNs.value.set(10, 2);
    e.u.uScroll.value.set(-3, 0);
    e.u.uNA.value = 0.7;
  }
}
function droplets(X: Vfx, x: number, y: number, z: number, n: number, v: number, spread = 6.28, ang = 0) {
  X.emit(n, (i) => {
    const t = ang + (Math.random() - 0.5) * spread,
      s = v * (0.5 + Math.random());
    return {
      cell: i % 3 ? "giotNuoc" : "sao4",
      x,
      y,
      z,
      vx: Math.sin(t) * s,
      vy: 1.5 + Math.random() * 2.5,
      vz: Math.cos(t) * s,
      grav: 7,
      drag: 1.2,
      life: 0.6,
      size: 0.16,
      size1: 0.05,
      col: "#ffffff",
      col1: WATER[1],
      spin: 3,
      stretch: 1.6,
    };
  });
}
function mist(X: Vfx, x: number, y: number, z: number, n: number, R: number) {
  X.emit(
    n,
    () => {
      const t = Math.random() * 6.28,
        r = Math.random() * R;
      return {
        cell: "khoi",
        x: x + Math.cos(t) * r,
        y: y + 0.1,
        z: z + Math.sin(t) * r,
        vx: Math.cos(t) * 0.3,
        vy: 0.2,
        vz: Math.sin(t) * 0.3,
        life: 1.1,
        size: 0.8,
        size1: 1.6,
        col: "#eaf6ff",
        col1: "#9fcfff",
        a: 0.16,
        rot: Math.random() * 6,
      };
    },
    true,
  );
}

export const SUONGMAI: Painters = {
  fx: {
    /** Lướt Sương: ba lưỡi nước nối nhau dọc đường lướt, vệt nước trên nền. */
    laoVet(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max,
        yaw = yawOf(f.ang),
        L = (f.r ?? 170) / V.TS,
        x0 = f.x / V.TS,
        z0 = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        dx = Math.cos(f.ang),
        dz = Math.sin(f.ang);
      for (let i = 0; i < 3; i++) {
        const u = (i + 0.5) / 3,
          k = Math.max(0, Math.min(1, a * 2.2 - i * 0.25));
        if (k <= 0) continue;
        crescent(
          X,
          `sm-lao${i}`,
          x0 + dx * L * u,
          gy + 0.85,
          z0 + dz * L * u,
          0.9,
          yaw + (i % 2 ? 0.4 : -0.4),
          i % 2 ? 0.5 : -0.5,
          2.2,
          0.32,
          ease(k) * 1.2,
          1 - a,
          Math.max(0, a - 0.4) * 1.6,
        );
      }
      const b = X.use("sm-laoBeam", () => SH.beam(0.5), { soft: [0, 0.05, 0.3, 0.3] });
      if (b) {
        b.m.position.set(x0, gy + 0.04, z0);
        b.m.rotation.set(Math.PI / 2, yaw, 0, "YXZ");
        b.m.scale.set(1, 1, L * ease(a * 3));
        setCols(b.u, ...WATER);
        b.u.uA.value = 0.8 * (1 - a);
        b.u.uNs.value.set(3, 12);
        b.u.uScroll.value.set(0, -2);
        b.u.uDis.value = a * 0.7;
      }
      if (X.first(f)) {
        droplets(X, x0 + dx * L * 0.5, gy + 0.8, z0 + dz * L * 0.5, 14, 2.5);
        X.flash(x0 + dx * L, gy + 0.9, z0 + dz * L, WATER[1], 3, 1.2);
      }
    },
    /** Giọt Sương Kiếm: rút kiếm chém trăng lưỡi liềm rộng, hai tầng, sóng xung kích. */
    rutKiem(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max,
        yaw = yawOf(f.ang),
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        R = Math.max(1.2, (f.r ?? 100) / V.TS) * (0.6 + ease(a * 2.5) * 0.5);
      crescent(
        X,
        "sm-rut0",
        x,
        gy + 0.9,
        z,
        R,
        yaw,
        0.12,
        2.6,
        0.45,
        ease(a * 3) * 1.25,
        1 - a * 0.8,
        Math.max(0, a - 0.45) * 1.8,
      );
      crescent(
        X,
        "sm-rut1",
        x,
        gy + 0.6,
        z,
        R * 0.8,
        yaw + 0.25,
        -0.25,
        2.2,
        0.3,
        ease(a * 3 - 0.2) * 1.25,
        0.8 * (1 - a),
        Math.max(0, a - 0.35) * 1.8,
      );
      X.shock(x, gy, z, R * 1.2, a, WATER, 0.3);
      if (X.first(f)) {
        X.flash(x, gy + 0.9, z, WATER[1], 2.5, 1.2);
        droplets(X, x, gy + 0.9, z, 20, 4, 2.4, yaw);
      }
    },
    /** Thế Đứng Gác: vòm nước mỏng, hai dải sóng xoay quanh, phù văn sóng dưới chân. */
    theGac(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        k = ease(a * 6),
        out = Math.min(1, (1 - a) * 5);
      X.rune("water", x, gy, z, 1.1 * k, Math.min(0.5, a), WATER, out, 1.4);
      const d = X.use("sm-dome", SH.dome, { fres: 2.2, fresAlpha: true });
      if (d) {
        d.m.position.set(x, gy, z);
        d.m.scale.set(1.05, 1.5, 1.05).multiplyScalar(0.6 + k * 0.4);
        setCols(d.u, ...WATER);
        d.u.uAge.value = 0.4;
        d.u.uA.value = 0.22 * out;
        d.u.uNs.value.set(8, 8);
        d.u.uScroll.value.set(0.2, -0.8);
        d.u.uNA.value = 0.8;
      }
      for (let i = 0; i < 2; i++) {
        const e = X.use("sm-gacRib", () => SH.helix(1, 1, 0.85, 1.4, 0.3), { soft: [0.1, 0.1, 0.2, 0.2] });
        if (!e) continue;
        e.m.position.set(x, gy + 0.05, z);
        e.m.rotation.set(0, V.t * 4 * (i ? -1 : 1) + i * 3, 0);
        setCols(e.u, ...SILVER);
        e.u.uAge.value = 0.3;
        e.u.uA.value = 0.7 * out;
        e.u.uWin.value.set(-0.2, k * 1.2);
        e.u.uScroll.value.set(-1.2, 0);
      }
      if (X.every(f, 0.12)) droplets(X, x, gy + 1.2, z, 3, 1.5);
    },
    /** Sóng Bạc: vách sóng ba tầng quét 170°, bọt trên đỉnh sóng, dư âm sương trên sân. */
    songBac(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max,
        yaw = yawOf(f.ang),
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        R = (f.r ?? 220) / V.TS,
        sweep = ease(a * 2.2) * 1.3;
      for (let i = 0; i < 3; i++) {
        const r = R * 0.8 * (0.55 + ease(a * 2) * 0.45) * (1 - i * 0.12);
        crescent(
          X,
          `sm-song${i}`,
          x,
          gy + 0.25 + i * 0.55,
          z,
          r,
          yaw,
          -0.1 - i * 0.12,
          3,
          0.7 - i * 0.15,
          sweep - i * 0.08,
          Math.min(1, (1 - a) * 2) * (1 - i * 0.2),
          Math.max(0, a - 0.5) * 2,
        );
      }
      X.rune("water", x, gy, z, R * 0.9, a, WATER, 1 - a, 0.6);
      X.shock(x, gy, z, R * 1.1, a, SILVER, 0.9, 0.85);
      if (X.every(f, 0.03) && a < 0.6) {
        const t = yaw + (Math.random() - 0.5) * 2.9,
          r = R * 0.8 * (0.55 + ease(a * 2) * 0.45);
        droplets(X, x + Math.sin(t) * r, gy + 1.4, z + Math.cos(t) * r, 3, 1.2);
      }
      if (X.first(f)) {
        X.flash(x, gy + 1, z, WATER[1], 2, 1.4);
        mist(X, x, gy, z, 16, R * 0.8);
      }
    },
  },
  field: {
    /** Vệt Sương: phù văn sóng trên nền, sương lạnh lan, giọt nước bốc lên theo nhịp. */
    vetSuong(fl, X) {
      const V = X.V,
        a = 1 - fl.life / fl.max,
        x = fl.x / V.TS,
        z = fl.y / V.TS,
        gy = V.ground(fl.x, fl.y),
        R = (fl.r ?? 70) / V.TS,
        out = Math.min(1, (1 - a) * 6, a * 12);
      X.rune("water", x, gy, z, R, Math.min(0.5, a * 3), WATER, out * 0.8, 0.5);
      X.shock(x, gy, z, R * 1.15, (V.t * 1.3) % 1, WATER, 0.5 * out);
      if (X.every(fl, 0.25)) mist(X, x, gy, z, 2, R);
      if (X.every(fl, 0.1)) droplets(X, x + (Math.random() - 0.5) * R, gy + 0.1, z + (Math.random() - 0.5) * R, 2, 0.5);
    },
  },
  /** Cảnh nộ: nước dâng xoắn quanh người, phù văn sóng nở, sương tụ về. */
  cine(k, X) {
    const V = X.V,
      h = V.hero;
    X.rune("water", h.x, h.y, h.z, 1 + ease(k * 2) * 1.8, Math.min(0.6, k), WATER, 1, 1);
    for (let i = 0; i < 3; i++) {
      const e = X.use("sm-cine", () => SH.helix(1.6, 1.3, 0.5, 2.4, 0.45), { soft: [0.1, 0.1, 0.2, 0.2] });
      if (!e) continue;
      e.m.position.set(h.x, h.y, h.z);
      e.m.rotation.set(0, V.t * 3 + (i * Math.PI * 2) / 3, 0);
      setCols(e.u, ...(i ? WATER : SILVER));
      e.u.uAge.value = 0.3;
      e.u.uA.value = 0.8;
      e.u.uWin.value.set(-0.2, ease(k * 1.5) * 1.2);
      e.u.uScroll.value.set(-1.5, 0);
    }
    if (k > 0.8) X.shock(h.x, h.y, h.z, 3.5, (k - 0.8) * 5, WATER, 0.5);
    droplets(X, h.x, h.y + 0.3, h.z, 2, 1.5);
    X.flash(h.x, h.y + 1.1, h.z, WATER[1], 1 + k * 1.2, 1);
  },
  /** Khi Sóng Bạc còn hiệu lực: dải nước bạc quấn thấp quanh người. */
  aura(m, X) {
    const s = m.sts?.find((x: any) => x.id === "songBac");
    if (!s) return;
    const h = X.V.hero,
      al = Math.min(1, s.t) * 0.5;
    const e = X.use("sm-aura", () => SH.helix(1.2, 0.7, 0.55, 1.2, 0.18), { soft: [0.1, 0.1, 0.2, 0.2] });
    if (e) {
      e.m.position.set(h.x, h.y + 0.1, h.z);
      e.m.rotation.set(0, X.V.t * 3, 0);
      setCols(e.u, ...SILVER);
      e.u.uA.value = al;
      e.u.uAge.value = 0.3;
      e.u.uScroll.value.set(-1, 0);
    }
    if (X.every(m, 0.15)) droplets(X, h.x, h.y + 0.8, h.z, 1, 0.8);
  },
};
