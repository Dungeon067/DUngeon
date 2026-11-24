/*
 * VFX Mai Linh (S30): Hỏa, đèn lồng giấy và hoa mai ngày hội. Lớp chính là đèn lồng (thân giấy, vành vàng,
 * lõi lửa, tua), cánh hoa mai năm cánh, lưỡi lửa cuộn, pháo hoa nở trên không, decal phù văn lửa.
 * Hạt (tàn lửa, cánh mai, sao) chỉ là lớp phụ.
 */
import * as THREE from "three";
import type { Vfx } from "../system";
import type { Painters } from "../index";
import * as SH from "../shapes";
import { setCols } from "../mats";

const FIRE: [string, string, string] = ["#fff3c4", "#ff9a2e", "#d8321e"];
const PLUM: [string, string, string] = ["#fff6d0", "#ffd34a", "#ff6a2a"];
const PAPER: [string, string, string] = ["#ffb08a", "#e8402a", "#9a1c18"];
const GOLD: [string, string, string] = ["#fff4c0", "#ffc94a", "#b07a1a"];
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const TAU = Math.PI * 2;

/** Đèn lồng giấy đỏ: thân đặc, vỏ sáng, vành vàng trên dưới, lõi lửa, tua dưới đáy. */
function lantern(X: Vfx, x: number, y: number, z: number, s: number, lit: number, spin: number, al = 1) {
  const body = X.use("ml-body", SH.ball, { add: false, side: THREE.FrontSide });
  if (body) {
    body.m.position.set(x, y, z);
    body.m.scale.set(0.3 * s, 0.36 * s, 0.3 * s);
    body.m.rotation.y = spin;
    setCols(body.u, ...PAPER);
    body.u.uA.value = al;
    body.u.uNs.value.set(12, 1);
    body.u.uNA.value = 0.2;
    body.u.uAge.value = 0.55;
    body.u.uGlow.value = 0.35 + lit * 0.35;
  }
  const shell = X.use("ml-shell", SH.ball, { fres: 1.4 });
  if (shell) {
    shell.m.position.set(x, y, z);
    shell.m.scale.set(0.33 * s, 0.39 * s, 0.33 * s);
    setCols(shell.u, ...FIRE);
    shell.u.uAge.value = 0.6;
    shell.u.uA.value = al * (0.04 + lit * 0.06);
    shell.u.uNs.value.set(6, 6);
    shell.u.uScroll.value.set(0, 0.6);
  }
  for (const dy of [0.34, -0.34]) {
    const r = X.use("ml-rim", () => SH.shock(0.55), { add: false, side: THREE.DoubleSide });
    if (!r) continue;
    r.m.position.set(x, y + dy * s, z);
    r.m.scale.setScalar(0.17 * s);
    setCols(r.u, ...GOLD);
    r.u.uAge.value = 0.5;
    r.u.uA.value = al;
    r.u.uNA.value = 0;
  }
  // Nan giấy: bốn vòng đứng quanh thân đèn.
  for (let i = 0; i < 4; i++) {
    const rb = X.use("ml-rib", () => SH.shock(0.93), { add: false, side: THREE.DoubleSide });
    if (!rb) break;
    rb.m.position.set(x, y, z);
    rb.m.rotation.set(Math.PI / 2, spin + (i * Math.PI) / 4, 0, "YXZ");
    rb.m.scale.set(0.305 * s, 1, 0.365 * s);
    setCols(rb.u, "#d8642a", "#8a1c14", "#4a0c08");
    rb.u.uAge.value = 0.5;
    rb.u.uA.value = al;
    rb.u.uNA.value = 0;
  }
  const f = X.use("ml-core", SH.flame, {});
  if (f) {
    f.m.position.set(x, y - 0.12 * s, z);
    f.m.scale.set(0.35 * s, (0.32 + Math.sin(X.V.t * 17) * 0.04) * s, 0.35 * s);
    setCols(f.u, ...FIRE);
    f.u.uAge.value = 0.35;
    f.u.uA.value = al * (0.45 + lit * 0.3);
    f.u.uScroll.value.set(0, 3);
    f.u.uNs.value.set(6, 6);
  }
  const ts = X.use("ml-tassel", () => SH.beam(0.06), { add: false, side: THREE.DoubleSide });
  if (ts) {
    ts.m.position.set(x, y - 0.36 * s, z);
    ts.m.rotation.set(Math.PI / 2, spin, Math.sin(X.V.t * 3 + x) * 0.15, "YXZ");
    ts.m.scale.set(s, 1, 0.3 * s);
    setCols(ts.u, ...GOLD);
    ts.u.uAge.value = 0.5;
    ts.u.uA.value = al;
  }
  X.V.glow(x, y, z, FIRE[1], (0.5 + lit * 0.7) * al);
}
/** Hoa mai năm cánh phẳng, nở theo `k`. */
function plum(
  X: Vfx,
  x: number,
  y: number,
  z: number,
  R: number,
  k: number,
  spin: number,
  al: number,
  tilt = 0,
  dis = 0,
) {
  for (let i = 0; i < 5; i++) {
    const e = X.use("ml-petal", SH.petal, { fres: 0.6, side: THREE.DoubleSide });
    if (!e) break;
    const a = spin + (i * TAU) / 5;
    e.m.position.set(x, y, z);
    e.m.rotation.set(tilt - (1 - ease(k)) * 0.9, a, 0, "YXZ");
    e.m.scale.setScalar(R * (0.3 + ease(k) * 0.7));
    setCols(e.u, ...PLUM);
    e.u.uAge.value = 0.3 + dis * 0.5;
    e.u.uA.value = al * 0.8;
    e.u.uDis.value = dis;
    e.u.uNs.value.set(4, 8);
  }
}
function flames(X: Vfx, x: number, gy: number, z: number, R: number, n: number, k: number, h: number, al: number) {
  for (let i = 0; i < n; i++) {
    const e = X.use("ml-tongue", SH.flame, {});
    if (!e) break;
    const a = (i * TAU) / n + X.V.t * 0.5;
    e.m.position.set(x + Math.cos(a) * R, gy, z + Math.sin(a) * R);
    e.m.rotation.set(Math.sin(a) * 0.4, 0, -Math.cos(a) * 0.4);
    e.m.scale.set(0.8, h * ease(k * 2) * (0.8 + 0.3 * Math.sin(i * 7.1 + X.V.t * 9)), 0.8);
    setCols(e.u, ...FIRE);
    e.u.uAge.value = 0.5 + k * 0.45;
    e.u.uA.value = al * 0.3;
    e.u.uDis.value = k * 0.8;
    e.u.uScroll.value.set(0, 3);
    e.u.uNs.value.set(5, 5);
  }
}
function embers(X: Vfx, x: number, y: number, z: number, n: number, v: number, up = 2) {
  X.emit(n, (i) => {
    const a = Math.random() * TAU,
      s = v * (0.4 + Math.random());
    return {
      cell: i % 3 ? "tanLua" : "canhMai",
      x,
      y,
      z,
      vx: Math.cos(a) * s,
      vy: up * (0.5 + Math.random()),
      vz: Math.sin(a) * s,
      grav: 1.5,
      drag: 1.4,
      life: 0.8,
      size: 0.2,
      size1: 0.04,
      col: PLUM[0],
      col1: FIRE[2],
      spin: 4,
    };
  });
}

export const MAILINH: Painters = {
  /** Đèn hoa mai đang treo: đèn lồng nhún nhẹ, decal Đèn Canh, nạp dầu thì lửa dày và tàn bay. */
  turret(tu, X) {
    if (tu.tag !== "den") return false;
    const V = X.V,
      x = tu.x / V.TS,
      z = tu.y / V.TS,
      gy = V.ground(tu.x, tu.y),
      born = Math.min(1, (tu.t ?? 1) * 3),
      end = tu.life < 1.5 ? 0.4 + 0.6 * Math.abs(Math.sin(V.t * 8)) : 1,
      oil = tu.oil > 0 ? 1 : 0,
      y = gy + 1.25 + Math.sin(V.t * 2.2 + x) * 0.06 + (1 - ease(born)) * 0.8;
    lantern(X, x, y, z, 1.15 + oil * 0.2, 0.5 + oil * 0.5, V.t * 0.6 + x, born * end);
    plum(X, x, y + 0.48, z, 0.18, born, V.t, 0.9 * born * end, -1.2);
    if (tu.hao) X.rune("fire", x, gy, z, (tu.hao.r / V.TS) * ease(born * 1.5), 0.4, PLUM, 0.25 * end, 0.25);
    if (oil) flames(X, x, y - 0.2, z, 0.16, 3, 0.2, 0.35, 0.6);
    if ((tu._cd ?? 0) < tu.cd - 0.2) {
      X.flash(x, y, z, FIRE[1], 1.4, 0.8);
      embers(X, x, y, z, 6, 1.2, 1);
    }
    tu._cd = tu.cd;
    if (X.every(tu, 0.18)) embers(X, x, y + 0.3, z, 1, 0.3, 0.8);
    return true;
  },
  /** Đạn đèn và các đòn khác của Mai Linh: lưỡi lửa bay kèm cánh mai; đòn thường để cho sách pháp khí. */
  proj(pr, X) {
    if (pr.skin !== "den") return false;
    const V = X.V,
      x = pr.x / V.TS,
      z = pr.y / V.TS,
      y = V.ground(pr.x, pr.y) + 1.15,
      yaw = Math.atan2(pr.vx, pr.vy),
      big = pr.r > 8 ? 1.4 : 1;
    const e = X.use("ml-bolt", SH.flame, {});
    if (e) {
      e.m.position.set(x, y, z);
      e.m.rotation.set(-Math.PI / 2, yaw, 0, "YXZ");
      e.m.scale.set(0.9 * big, 1.1 * big, 0.9 * big);
      setCols(e.u, ...FIRE);
      e.u.uAge.value = 0.4;
      e.u.uA.value = 0.7;
      e.u.uScroll.value.set(0, 4);
      e.u.uNs.value.set(6, 6);
    }
    plum(X, x, y, z, 0.16 * big, 1, V.t * 8, 1, 0);
    X.emit(2, () => ({
      cell: Math.random() < 0.5 ? "canhMai" : "tanLua",
      x,
      y,
      z,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.6,
      vz: (Math.random() - 0.5) * 0.8,
      life: 0.45,
      size: 0.18 * big,
      size1: 0.04,
      col: PLUM[0],
      col1: FIRE[2],
      spin: 6,
    }));
    V.glow(x, y, z, FIRE[1], 1.2 * big);
    return true;
  },
  fx: {
    /** Đèn trời bay vòng cung tới điểm rơi, để lại tàn lửa. */
    roiCao(f, X) {
      const V = X.V,
        sx = (f.sx ?? f.x) / V.TS,
        sz = (f.sy ?? f.y) / V.TS,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        u = 1 - f.life / f.max,
        H = 4.5,
        w = ease(u);
      const px = sx + (x - sx) * w,
        py = gy + 1.2 + Math.sin(w * Math.PI) * H,
        pz = sz + (z - sz) * w;
      lantern(X, px, py, pz, 0.9, 1, V.t * 3, 1);
      X.rune("fire", x, gy, z, 1.2 * ease(u * 1.5), 0.2, FIRE, 0.5 * u, 1.5);
      embers(X, px, py - 0.3, pz, 2, 0.3, -0.5);
    },
    /** Đèn trời chạm đất: hoa mai lửa nở trên nền, lưỡi lửa cuộn lên, sóng xung kích. */
    denTroi(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        R = (f.r ?? 80) / V.TS;
      plum(X, x, gy + 0.08, z, R * 1.1, a * 3, 0.3, (1 - a) * 0.6, -0.2, Math.max(0, a - 0.4) * 1.5);
      flames(X, x, gy, z, R * 0.7, 5, a, 0.9 * (1 - a * 0.5), 1 - a);
      X.rune("fire", x, gy, z, R * 1.2, a, FIRE, 1 - a, 0.8);
      X.shock(x, gy, z, R * 1.4, a, FIRE, 0.6);
      if (X.first(f)) {
        X.flash(x, gy + 0.6, z, FIRE[1], 2, 1);
        embers(X, x, gy + 0.4, z, 22, 3.5, 3);
      }
    },
    /** Pháo hoa: chùm sao nở trên không, hoa mai sáng giữa trời, tàn rơi; phù văn lửa dưới đất. */
    phaoHoa(f, X) {
      const V = X.V,
        a = 1 - f.life / f.max,
        x = f.x / V.TS,
        z = f.y / V.TS,
        gy = V.ground(f.x, f.y),
        R = (f.r ?? 90) / V.TS;
      X.rune("fire", x, gy, z, R, a, PLUM, (1 - a) * 0.8, 0.6);
      X.shock(x, gy, z, R * 1.2, a, FIRE, 0.5);
      // 5 quả bắn so le, quả giữa nổ hình bông mai; tâm nổ thấp (2,3–2,9 m) để nằm trong khung máy quay game.
      if (X.first(f))
        for (let i = 0; i < 5; i++) {
          // Đồ họa vừa/thấp: 3 quả thay vì 5.
          if (V.q < 1 && (i === 1 || i === 3)) continue;
          const t = (i / 5) * TAU + 0.4,
            r = i === 2 ? 0 : R * 0.55,
            ox = Math.cos(t) * r,
            oz = Math.sin(t) * r;
          X.fw.launch(
            new THREE.Vector3(x + ox * 0.4, gy + 0.3, z + oz * 0.4),
            new THREE.Vector3(x + ox, gy + (i === 2 ? 2.9 : 2.3 + (i % 2) * 0.35), z + oz),
            i === 2,
            [0, 8, 14, 20, 26][i],
            i === 2 ? 0.75 : 0.5,
            i === 0,
          );
        }
    },
  },
  /** Cảnh nộ: năm đèn lồng bay vòng lên quanh người, hoa mai nở dưới chân, cánh mai cuốn. */
  cine(k, X) {
    const V = X.V,
      h = V.hero;
    X.rune("fire", h.x, h.y, h.z, 1 + ease(k * 2) * 1.6, Math.min(0.6, k), PLUM, 0.9, 0.8);
    plum(X, h.x, h.y + 0.06, h.z, 1.3 * ease(k * 2), k * 2, V.t * 0.4, 0.6, -Math.PI / 2 + 0.1);
    for (let i = 0; i < 5; i++) {
      const a = (i * TAU) / 5 + V.t * 1.2,
        r = 1.3 - k * 0.3;
      lantern(
        X,
        h.x + Math.cos(a) * r,
        h.y + 0.6 + k * 1.6 + Math.sin(a * 2) * 0.1,
        h.z + Math.sin(a) * r,
        0.75,
        k,
        a,
        Math.min(1, k * 4),
      );
    }
    embers(X, h.x, h.y + 0.3, h.z, 2, 1.2, 1.5);
  },
};
