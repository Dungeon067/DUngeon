/*
 * Hình khối VFX (S30): tinh thể, gai băng, hoa tuyết 3D, ruy-băng xoắn, lưỡi gió cong, cánh hoa, lưỡi lửa,
 * sóng xung kích, vòm, decal, chùm sợi. Mọi hình có UV: U chạy dọc hình (để lộ dần, cuộn), V ngang hình.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const TAU = Math.PI * 2;
const cache = new Map<string, THREE.BufferGeometry>();
const memo = (k: string, f: () => THREE.BufferGeometry) => {
  let g = cache.get(k);
  if (!g) cache.set(k, (g = f()));
  return g;
};

/** Tinh thể lục giác hai đầu nhọn, cao 1, gốc ở y=0. Mặt phẳng (flat) để bắt sáng. */
export const crystal = () =>
  memo("crystal", () => {
    const g = new THREE.LatheGeometry(
      [new THREE.Vector2(0, 0), new THREE.Vector2(0.17, 0.14), new THREE.Vector2(0.15, 0.78), new THREE.Vector2(0, 1)],
      6,
    ).toNonIndexed();
    g.computeVertexNormals();
    return g;
  });
/** Gai băng 5 cạnh, gốc ở y=0. */
export const spike = () =>
  memo("spike", () => {
    const g = new THREE.ConeGeometry(0.16, 1, 5, 1).translate(0, 0.5, 0).toNonIndexed();
    g.computeVertexNormals();
    return g;
  });
/** Hoa tuyết 3D nằm trên mặt XZ, bán kính 1: 6 nhánh tinh thể kèm nhánh phụ. */
export const flake3d = () =>
  memo("flake", () => {
    const parts: THREE.BufferGeometry[] = [];
    const arm = (len: number, w: number, a: number, ox: number, oz: number) => {
      const g = new THREE.OctahedronGeometry(1, 0).scale(w, w * 0.45, len / 2);
      g.translate(0, 0, len / 2);
      g.rotateY(a);
      g.translate(ox, 0, oz);
      parts.push(g.toNonIndexed());
    };
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      arm(1, 0.07, a, 0, 0);
      for (const [d, l] of [
        [0.4, 0.32],
        [0.66, 0.22],
      ]) {
        const ox = Math.sin(a) * d,
          oz = Math.cos(a) * d;
        arm(l, 0.04, a + 0.9, ox, oz);
        arm(l, 0.04, a - 0.9, ox, oz);
      }
    }
    parts.push(new THREE.CylinderGeometry(0.16, 0.16, 0.05, 6).toNonIndexed());
    const g = mergeGeometries(parts.map((p) => (p.deleteAttribute("uv"), p)));
    const uv = new Float32Array((g.attributes.position.count as number) * 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const r = Math.hypot(pos.getX(i), pos.getZ(i));
      uv[i * 2] = r;
      uv[i * 2 + 1] = Math.atan2(pos.getZ(i), pos.getX(i)) / TAU + 0.5;
    }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  });

/** Dải ruy-băng theo đường cong f(u) -> điểm, bề rộng w(u) theo hướng pháp tuyến n(u). */
function strip(seg: number, f: (u: number) => THREE.Vector3, side: (u: number) => THREE.Vector3, w: (u: number) => number) {
  const pos: number[] = [],
    uv: number[] = [],
    idx: number[] = [];
  for (let i = 0; i <= seg; i++) {
    const u = i / seg,
      p = f(u),
      s = side(u).multiplyScalar(w(u) / 2);
    pos.push(p.x - s.x, p.y - s.y, p.z - s.z, p.x + s.x, p.y + s.y, p.z + s.z);
    uv.push(u, 0, u, 1);
    if (i < seg) idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
/** Ruy-băng xoắn ốc đi lên: `turns` vòng, bán kính r0 → r1, cao h. Dải đứng (bề rộng theo trục Y). */
export const helix = (turns = 1.5, r0 = 1, r1 = 0.6, h = 1.6, w = 0.35) =>
  memo(`helix${turns},${r0},${r1},${h},${w}`, () =>
    strip(
      64,
      (u) => {
        const a = u * turns * TAU,
          r = r0 + (r1 - r0) * u;
        return new THREE.Vector3(Math.cos(a) * r, u * h, Math.sin(a) * r);
      },
      () => new THREE.Vector3(0, 1, 0),
      (u) => w * Math.sin(Math.min(1, u * 1.15) * Math.PI) + 0.02,
    ),
  );
/** Lưỡi liềm nằm ngang (gió, chém): cung `arc` rad quanh gốc, bán kính 1, dày ở giữa, nhọn hai đầu. */
export const blade = (arc = 2, w = 0.35) =>
  memo(`blade${arc},${w}`, () =>
    strip(
      40,
      (u) => {
        const a = (u - 0.5) * arc;
        return new THREE.Vector3(Math.sin(a), 0, Math.cos(a));
      },
      (u) => {
        const a = (u - 0.5) * arc;
        return new THREE.Vector3(Math.sin(a), 0, Math.cos(a));
      },
      (u) => w * Math.pow(Math.sin(u * Math.PI), 0.8),
    ),
  );
/** Dải thẳng từ gốc theo +Z dài 1 (chỉ băng, tia), mặt đứng. */
export const beam = (w = 1) =>
  memo(`beam${w}`, () =>
    strip(
      24,
      (u) => new THREE.Vector3(0, 0, u),
      () => new THREE.Vector3(0, 1, 0),
      () => w,
    ),
  );
/** Cánh hoa cong (mai, sen): dài 1 theo +Z, hơi úp. */
export const petal = () =>
  memo("petal", () => {
    const g = strip(
      16,
      (u) => new THREE.Vector3(0, Math.sin(u * Math.PI) * 0.12, u),
      () => new THREE.Vector3(1, 0, 0),
      (u) => 0.55 * Math.sin(Math.pow(u, 0.8) * Math.PI),
    );
    return g;
  });
/** Lưỡi lửa: chóp xoắn có biên dạng gợn, cao 1. */
export const flame = () =>
  memo("flame", () => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const u = i / 12;
      pts.push(new THREE.Vector2(0.3 * Math.sin(Math.pow(1 - u, 0.6) * Math.PI * 0.5) * (1 + 0.15 * Math.sin(u * 14)), u));
    }
    return new THREE.LatheGeometry(pts, 10);
  });
/** Vòng xung kích phẳng XZ: U theo góc, V theo bán kính từ r0 tới 1. */
export const shock = (r0 = 0.6) =>
  memo(`shock${r0}`, () => {
    const g = new THREE.RingGeometry(r0, 1, 72, 1);
    const uv = g.attributes.uv,
      p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i),
        y = p.getY(i);
      uv.setXY(i, Math.atan2(y, x) / TAU + 0.5, (Math.hypot(x, y) - r0) / (1 - r0));
    }
    g.rotateX(-Math.PI / 2);
    return g;
  });
/** Vòm bán cầu bán kính 1. */
export const dome = () => memo("dome", () => new THREE.SphereGeometry(1, 36, 18, 0, TAU, 0, Math.PI / 2));
/** Cầu đủ bán kính 1. */
export const ball = () => memo("ball", () => new THREE.SphereGeometry(1, 24, 16));
/** Decal phẳng 2x2 trên mặt XZ. */
export const decal = () => memo("decal", () => new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2));
/** Trụ hở đứng cao 1 (cột sáng, lốc). U theo góc, V theo chiều cao. */
export const tube = (rTop = 1, seg = 24) =>
  memo(`tube${rTop}`, () => {
    const g = new THREE.CylinderGeometry(rTop, 1, 1, seg, 6, true).translate(0, 0.5, 0);
    return g;
  });
