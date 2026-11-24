/**
 * Dựng clip bằng tư thế mục tiêu (IK) trên khung xương tham chiếu tools/anim/rig.json (Hạ Vy, chuẩn hóa VRM).
 * Đơn vị: chiều cao hông (H). Gốc tọa độ: hông ở tư thế nghỉ, +Z trước mặt, +X bên TRÁI nhân vật, +Y lên.
 * Mỗi khóa là một tư thế đầy đủ: dịch/xoay hông, góc FK cho thân–đầu, vị trí bàn chân, vị trí + hướng bàn tay (IK), độ nắm tay.
 * Giữa các khóa: vị trí nội suy Catmull-Rom (đường cong mượt), góc nội suy slerp, cả hai theo hàm làm mượt của khóa sau.
 */
import { readFileSync } from "node:fs";
import * as THREE from "three";
import { solveLimb, alignQuat, setWorldQuat, type Limb } from "../../src/render3d/toon/ik";

export type V3 = [number, number, number];
export type Ease = "inout" | "out" | "in" | "lin";
export interface Foot {
  p: V3;
  /** Độ: yaw xoay mũi chân (dương = sang trái), pitch (dương = nhón gót / mũi chân chúc xuống), roll. */
  r?: V3;
  /** Hướng đầu gối (mặc định trước mặt theo yaw bàn chân). */
  knee?: V3;
  /** Gập ngón chân (độ, dương = gập lên khi nhón). */
  toe?: number;
}
export interface Hand {
  p: V3;
  /** Hệ tọa độ của p và các hướng: gốc (thân dưới) hay ngực (upperChest). */
  sp?: "root" | "chest";
  /** Hướng các ngón tay chỉ (cổ tay → đốt ngón). */
  fing: V3;
  /** Hướng ngón cái / trục lỗ nắm tay: vũ khí cầm tay chạy dọc trục này. */
  thumb: V3;
  /** Hướng khuỷu tay. */
  elbow: V3;
}
export interface Grip {
  /** Gập 4 ngón (0 duỗi, 1 nắm chặt), ngón cái (0..1), xòe ngón (độ). */
  c: number;
  t: number;
  s?: number;
  /** Gập riêng ngón trỏ/giữa (kéo dây cung: móc hai ngón). */
  ci?: number;
  cm?: number;
}
export interface Spec {
  hp: V3;
  hr: V3;
  b: Record<string, V3>;
  fl: Foot;
  fr: Foot;
  lh: Hand | null;
  rh: Hand | null;
  gl: Grip;
  gr: Grip;
}
export interface PKey {
  t: number;
  s: Spec;
  ease?: Ease;
}
export interface ClipDef {
  dur: number;
  loop?: boolean;
  keys: PKey[];
  /** Dây cung theo tay phải (0 nghỉ, 1 kéo theo tay), đường gấp khúc [tỉ lệ, giá trị]; có thì hiện mũi tên trên cung. */
  str?: [number, number][];
  /** Chỉnh thêm theo thời gian (giây, tỉ lệ 0..1) sau nội suy, trước IK. */
  fx?: (s: Spec, f: number, sec: number) => void;
}

const D = Math.PI / 180;
export const easeF = (f: number, k: Ease = "inout") =>
  k === "lin"
    ? f
    : k === "out"
      ? 1 - (1 - f) ** 3
      : k === "in"
        ? f ** 3
        : f < 0.5
          ? 4 * f ** 3
          : 1 - (-2 * f + 2) ** 3 / 2;
const qe = (e: V3) => new THREE.Quaternion().setFromEuler(new THREE.Euler(e[0] * D, e[1] * D, e[2] * D, "YXZ"));
const ev = (q: THREE.Quaternion): V3 => {
  const e = new THREE.Euler().setFromQuaternion(q, "YXZ");
  return [e.x / D, e.y / D, e.z / D];
};

/** Gộp sâu tư thế: over ghi đè base (mảng ghi đè nguyên). */
export function P(base: Spec, over: DeepPartial<Spec> = {}): Spec {
  const o: any = structuredClone(base);
  const merge = (t: any, s: any) => {
    for (const [k, v] of Object.entries(s)) {
      if (v && typeof v === "object" && !Array.isArray(v) && t[k] && typeof t[k] === "object") merge(t[k], v);
      else t[k] = structuredClone(v);
    }
  };
  merge(o, over);
  return o;
}
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K]
    : T[K] extends object | null
      ? DeepPartial<NonNullable<T[K]>> | null
      : T[K];
};

// ---------- Khung xương ----------
type RigJson = { hipsHeight: number; bones: Record<string, { parent: string | null; pos: V3 }> };
const RIG: RigJson = JSON.parse(readFileSync(new URL("./rig.json", import.meta.url), "utf8")).havy;
export const REST = Object.fromEntries(Object.entries(RIG.bones).map(([k, v]) => [k, new THREE.Vector3(...v.pos)]));

export class Rig {
  root = new THREE.Object3D();
  bones: Record<string, THREE.Object3D> = {};
  legs: Record<"l" | "r", Limb>;
  arms: Record<"l" | "r", Limb>;
  constructor() {
    for (const [name, b] of Object.entries(RIG.bones)) {
      const o = new THREE.Object3D();
      o.name = name;
      this.bones[name] = o;
      void b;
    }
    for (const [name, b] of Object.entries(RIG.bones)) {
      const o = this.bones[name];
      const par = b.parent ? this.bones[b.parent] : this.root;
      par.add(o);
      const pp = b.parent ? RIG.bones[b.parent].pos : [0, 0, 0];
      o.position.set(b.pos[0] - pp[0], b.pos[1] - pp[1], b.pos[2] - pp[2]);
    }
    const B = this.bones;
    const leg = (s: string): Limb => ({
      a: B[`${s}UpperLeg`],
      b: B[`${s}LowerLeg`],
      c: B[`${s}Foot`],
      poleRest: new THREE.Vector3(0, 0, 1),
    });
    const arm = (s: string): Limb => ({
      a: B[`${s}UpperArm`],
      b: B[`${s}LowerArm`],
      c: B[`${s}Hand`],
      poleRest: new THREE.Vector3(0, 0, -1),
    });
    this.legs = { l: leg("left"), r: leg("right") };
    this.arms = { l: arm("left"), r: arm("right") };
  }
  reset() {
    for (const o of Object.values(this.bones)) o.quaternion.identity();
    this.bones.hips.position.set(0, 0, 0);
    this.root.updateMatrixWorld(true);
  }

  /** Đặt tư thế theo Spec (FK thân → IK chân, tay → nắm tay). */
  apply(s: Spec) {
    this.reset();
    const B = this.bones;
    B.hips.position.set(...s.hp);
    B.hips.quaternion.copy(qe(s.hr));
    for (const [n, e] of Object.entries(s.b)) if (B[n]) B[n].quaternion.copy(qe(e));
    this.root.updateMatrixWorld(true);
    for (const k of ["l", "r"] as const) {
      const f = k === "l" ? s.fl : s.fr;
      const r = f.r ?? [0, 0, 0];
      const fq = qe([r[0], r[1], r[2]]);
      // Đích là cổ chân; mặc định đầu gối theo hướng mũi chân, hơi mở ra ngoài.
      const knee = f.knee
        ? new THREE.Vector3(...f.knee)
        : new THREE.Vector3(k === "l" ? 0.12 : -0.12, 0, 1).applyQuaternion(qe([0, r[1], 0]));
      solveLimb(this.legs[k], new THREE.Vector3(...f.p), knee.normalize(), fq);
      if (f.toe) B[`${k === "l" ? "left" : "right"}Toes`].quaternion.copy(qe([-f.toe, 0, 0]));
    }
    for (const k of ["l", "r"] as const) {
      const h = k === "l" ? s.lh : s.rh;
      if (h) this.hand(k, h);
    }
    for (const k of ["l", "r"] as const) this.grip(k, k === "l" ? s.gl : s.gr);
    this.root.updateMatrixWorld(true);
  }

  /** IK một tay tới đích Hand (giữ nguyên phần còn lại của tư thế). */
  hand(k: "l" | "r", h: Hand) {
    const chest = this.bones.upperChest;
    chest.updateMatrixWorld(true);
    const cq = chest.getWorldQuaternion(new THREE.Quaternion());
    const tf = (v: V3, pt: boolean) => {
      const x = new THREE.Vector3(...v);
      if (h.sp === "chest") return pt ? chest.localToWorld(x) : x.applyQuaternion(cq);
      return x;
    };
    const fing = tf(h.fing, false).normalize(),
      thumb = tf(h.thumb, false).normalize();
    // Hệ cục bộ bàn tay ở tư thế chữ T: trái ngón chỉ +X, phải ngón chỉ −X; ngón cái +Z.
    const f0 = new THREE.Vector3(k === "l" ? 1 : -1, 0, 0),
      t0 = new THREE.Vector3(0, 0, 1);
    const hq = alignQuat(f0, t0, fing, thumb);
    solveLimb(this.arms[k], tf(h.p, true), tf(h.elbow, false).normalize(), hq);
  }

  /** Đặt tư thế theo khung i của clip có sẵn trong humanoid.json. */
  setFrame(c: ClipData, i: number) {
    this.reset();
    const j = Math.min(c.n - 1, i);
    for (const [n, tr] of Object.entries(c.bones))
      this.bones[n]?.quaternion.fromArray(tr.q[Math.min(tr.q.length - 1, j)]);
    this.bones.hips.position.fromArray(c.hips[Math.min(c.hips.length - 1, j)]);
    this.root.updateMatrixWorld(true);
  }

  grip(k: "l" | "r", g: Grip) {
    const side = k === "l" ? "left" : "right",
      sg = k === "l" ? -1 : 1;
    const fingers: [string, number, number][] = [
      ["Index", g.ci ?? g.c, -1],
      ["Middle", g.cm ?? g.c, -0.3],
      ["Ring", g.c, 0.3],
      ["Little", g.c, 1],
    ];
    for (const [n, c, spr] of fingers) {
      const sp = (g.s ?? 0) * spr * sg;
      this.bones[`${side}${n}Proximal`]?.quaternion.copy(qe([0, sp, sg * c * 80]));
      this.bones[`${side}${n}Intermediate`]?.quaternion.copy(qe([0, 0, sg * c * 90]));
      this.bones[`${side}${n}Distal`]?.quaternion.copy(qe([0, 0, sg * c * 60]));
    }
    // Ngón cái theo dữ liệu nắm tay của UAL, đổi phía bằng phép đối xứng gương.
    const th: [string, V3][] = [
      ["ThumbMetacarpal", [-8.3, 7.4, 3.9]],
      ["ThumbProximal", [-21.6, 13.8, -4.3]],
      ["ThumbDistal", [-86.3, 29.3, -27.4]],
    ];
    for (const [n, e] of th) {
      const q = new THREE.Quaternion().slerp(qe(e), g.t);
      if (k === "l") q.set(q.x, -q.y, -q.z, q.w);
      this.bones[`${side}${n}`]?.quaternion.copy(q);
    }
  }

  /** Vị trí (hệ gốc, đơn vị H) của một xương. */
  pos(n: string) {
    return this.bones[n].getWorldPosition(new THREE.Vector3());
  }
  quat(n: string) {
    return this.bones[n].getWorldQuaternion(new THREE.Quaternion());
  }
}

// ---------- Nội suy khóa ----------
const cr = (p0: number, p1: number, p2: number, p3: number, u: number) =>
  0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
const crV = (a: V3, b: V3, c: V3, d: V3, u: number): V3 => [0, 1, 2].map((i) => cr(a[i], b[i], c[i], d[i], u)) as V3;
const lerpV = (a: V3, b: V3, u: number): V3 => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * u) as V3;
const slerpE = (a: V3, b: V3, u: number): V3 => ev(qe(a).slerp(qe(b), u));

/** Nội suy giữa 4 tư thế liên tiếp (s0..s3) ở đoạn s1 → s2. */
export function mix(s0: Spec, s1: Spec, s2: Spec, s3: Spec, u: number): Spec {
  const out = P(s1);
  const pv = (get: (s: Spec) => V3 | undefined, set: (v: V3) => void) => {
    const a = get(s0),
      b = get(s1),
      c = get(s2),
      d = get(s3);
    if (b && c) set(crV(a ?? b, b, c, d ?? c, u));
  };
  pv(
    (s) => s.hp,
    (v) => (out.hp = v),
  );
  out.hr = slerpE(s1.hr, s2.hr, u);
  const names = new Set([...Object.keys(s1.b), ...Object.keys(s2.b)]);
  for (const n of names) out.b[n] = slerpE(s1.b[n] ?? [0, 0, 0], s2.b[n] ?? [0, 0, 0], u);
  for (const k of ["fl", "fr"] as const) {
    pv(
      (s) => s[k].p,
      (v) => (out[k].p = v),
    );
    out[k].r = slerpE(s1[k].r ?? [0, 0, 0], s2[k].r ?? [0, 0, 0], u);
    out[k].toe = (s1[k].toe ?? 0) + ((s2[k].toe ?? 0) - (s1[k].toe ?? 0)) * u;
    if (s1[k].knee || s2[k].knee) out[k].knee = lerpV(s1[k].knee ?? [0, 0, 1], s2[k].knee ?? [0, 0, 1], u);
  }
  for (const k of ["lh", "rh"] as const) {
    const a = s1[k],
      b = s2[k];
    if (!a || !b) {
      out[k] = u < 0.5 ? a : b;
      continue;
    }
    const h = (s: Spec | undefined) => (s?.[k] && s[k]!.sp === a.sp ? s[k]!.p : undefined);
    const p: V3 = b.sp === a.sp ? crV(h(s0) ?? a.p, a.p, b.p, h(s3) ?? b.p, u) : lerpV(a.p, b.p, u);
    out[k] = {
      sp: a.sp,
      p,
      fing: lerpV(a.fing, b.fing, u),
      thumb: lerpV(a.thumb, b.thumb, u),
      elbow: lerpV(a.elbow, b.elbow, u),
    };
  }
  for (const k of ["gl", "gr"] as const) {
    const a = s1[k],
      b = s2[k];
    const l = (x?: number, y?: number, d = 0) => (x ?? d) + ((y ?? d) - (x ?? d)) * u;
    out[k] = {
      c: l(a.c, b.c),
      t: l(a.t, b.t),
      s: l(a.s, b.s),
      ci: l(a.ci ?? a.c, b.ci ?? b.c),
      cm: l(a.cm ?? a.c, b.cm ?? b.c),
    };
  }
  return out;
}

export function sample(c: ClipDef, f: number): Spec {
  const K = [...c.keys].sort((a, b) => a.t - b.t);
  let i = 0;
  while (i < K.length - 2 && K[i + 1].t <= f) i++;
  const a = K[i],
    b = K[Math.min(K.length - 1, i + 1)];
  const n = K.length;
  const at = (j: number) => (c.loop ? K[(j + n - 1) % (n - 1)] : K[Math.max(0, Math.min(n - 1, j))]);
  const u = b.t > a.t ? easeF(THREE.MathUtils.clamp((f - a.t) / (b.t - a.t), 0, 1), b.ease) : 0;
  return mix(at(i - 1).s, a.s, b.s, at(i + 2).s, u);
}

export interface ClipData {
  n: number;
  bones: Record<string, { q: number[][] }>;
  hips: number[][];
  str?: number[];
}
/** Nội suy đường gấp khúc [x, y] tại f. */
export function pw(pts: [number, number][], f: number) {
  if (f <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++)
    if (f <= pts[i][0]) {
      const [x0, y0] = pts[i - 1],
        [x1, y1] = pts[i];
      return y0 + ((y1 - y0) * (f - x0)) / Math.max(1e-6, x1 - x0);
    }
  return pts[pts.length - 1][1];
}

/** Nướng clip ở fps cho trước thành dữ liệu humanoid.json. */
/** Clip chồng lớp: lấy từng khung của clip nền rồi chỉnh (ví dụ tay cầm cung khi chạy). */
export interface OverlayDef {
  from: string;
  /** Chỉnh khung: f tỉ lệ 0..1, i chỉ số khung. */
  mod: (r: Rig, f: number, i: number) => void;
}
export function overlay(o: OverlayDef, lib: Record<string, ClipData>, names: string[], rig = new Rig()): ClipData {
  const base = lib[o.from];
  if (!base) throw new Error(`thiếu clip nền ${o.from}`);
  const out: ClipData = { n: base.n, bones: {}, hips: [] };
  if (base.str) out.str = [...base.str];
  for (const b of names) out.bones[b] = { q: [] };
  for (let i = 0; i < base.n; i++) {
    rig.setFrame(base, i);
    o.mod(rig, i / Math.max(1, base.n - 1), i);
    rig.root.updateMatrixWorld(true);
    for (const b of names) out.bones[b].q.push(rig.bones[b].quaternion.toArray().map((v) => +v.toFixed(4)));
    out.hips.push(rig.bones.hips.position.toArray().map((v) => +v.toFixed(4)));
  }
  return out;
}

export function bake(c: ClipDef, fps: number, names: string[], rig = new Rig()): ClipData {
  const n = Math.max(2, Math.round(c.dur * fps) + 1);
  const out: ClipData = { n, bones: {}, hips: [] };
  for (const b of names) out.bones[b] = { q: [] };
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1);
    const s = sample(c, f);
    c.fx?.(s, f, f * c.dur);
    rig.apply(s);
    for (const b of names) out.bones[b].q.push(rig.bones[b].quaternion.toArray().map((v) => +v.toFixed(4)));
    out.hips.push(rig.bones.hips.position.toArray().map((v) => +v.toFixed(4)));
    if (c.str) (out.str ??= []).push(+pw(c.str, f).toFixed(3));
  }
  return out;
}
export { setWorldQuat, qe, ev };
