/**
 * Dựng thế giới logic (lưới 110×110, độ cao h) thành mesh 3D. Chỉ đọc dữ liệu bản đồ, không ghi.
 * 1 ô = 1 đơn vị 3D; 1 bậc h = LV đơn vị (22/40, khớp FEEL.jump.levelPx).
 */
import * as THREE from "three";
import { MH, MW, TL, TS } from "../world/map";

export const LV = 22 / TS;
export const WATER_Y = -0.14;
const BED_Y = -0.6;
const CHUNK = 22;
const T = 16;

const hash = (x: number, y: number, s = 0) => {
  let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

/** Ô texture trong atlas (8 cột × 2 hàng, mỗi ô 16×16 px). */
export const TEX = { grass: 0, path: 1, sand: 2, flower: 3, stone: 4, cliff: 5, plank: 6, ledge: 7, bed: 8, cliffSand: 9, dark: 10, roof: 11 };

function paint(c: CanvasRenderingContext2D, k: number, base: string, dots: [string, number][], seed: number, fn?: (x: number, y: number) => string | null) {
  const ox = (k % 8) * T,
    oy = Math.floor(k / 8) * T;
  c.fillStyle = base;
  c.fillRect(ox, oy, T, T);
  for (let y = 0; y < T; y++)
    for (let x = 0; x < T; x++) {
      const f = fn?.(x, y);
      if (f) {
        c.fillStyle = f;
        c.fillRect(ox + x, oy + y, 1, 1);
        continue;
      }
      const r = hash(x, y, seed);
      let acc = 0;
      for (const [col, p] of dots) {
        acc += p;
        if (r < acc) {
          c.fillStyle = col;
          c.fillRect(ox + x, oy + y, 1, 1);
          break;
        }
      }
    }
}

export function makeAtlas(): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = T * 8;
  cv.height = T * 2;
  const c = cv.getContext("2d")!;
  paint(c, TEX.grass, "#5fae4e", [["#4e9842", 0.18], ["#77c25a", 0.12], ["#8fd468", 0.03]], 1, (x, y) =>
    hash(x, y, 9) < 0.05 && y > 0 ? "#3f8a3a" : null,
  );
  paint(c, TEX.path, "#c9a46a", [["#b48e58", 0.2], ["#dcbb82", 0.12], ["#9c7a4a", 0.04]], 2);
  paint(c, TEX.sand, "#e8d39a", [["#d6be84", 0.2], ["#f4e4b4", 0.12]], 3);
  paint(c, TEX.flower, "#5fae4e", [["#4e9842", 0.16], ["#f7f0f2", 0.04], ["#f28cb0", 0.04], ["#ffd65a", 0.03]], 4);
  paint(c, TEX.stone, "#8e95a3", [["#7a8190", 0.22], ["#a7aebb", 0.14], ["#666c7a", 0.05]], 5);
  paint(c, TEX.cliff, "#8a6a4c", [["#76583e", 0.24], ["#9c7b5a", 0.12]], 6, (x, y) =>
    y < 2 ? (y === 0 ? "#77c25a" : "#4e9842") : y % 5 === 4 && hash(x, y, 7) < 0.7 ? "#654a34" : null,
  );
  paint(c, TEX.plank, "#a8743f", [["#94632f", 0.18], ["#bb8650", 0.1]], 7, (x, y) =>
    y % 4 === 3 ? "#6e4823" : x === (y < 8 ? 5 : 11) && y % 4 !== 3 ? "#7c5229" : null,
  );
  paint(c, TEX.ledge, "#7fa05a", [["#6c8e4c", 0.2], ["#98b86c", 0.12], ["#8e95a3", 0.05]], 8);
  paint(c, TEX.bed, "#3e7d8a", [["#356d78", 0.25], ["#4a8e98", 0.12]], 9);
  paint(c, TEX.cliffSand, "#c8b07a", [["#b39b68", 0.25], ["#d8c48e", 0.1]], 10);
  paint(c, TEX.dark, "#3b3440", [["#2e2833", 0.3]], 11);
  paint(c, TEX.roof, "#b0503e", [["#983f30", 0.2]], 12, (x, y) => (y % 4 === 3 ? "#7a3024" : null));
  const t = new THREE.CanvasTexture(cv);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Độ cao mặt trên (đơn vị 3D) của ô để vẽ; cây và đá đứng trên nền cỏ. */
export function topY(W: any, x: number, y: number): number {
  if (x < 0 || y < 0 || x >= MW || y >= MH) return BED_Y;
  const i = y * MW + x,
    t = W.m[i];
  if (t === TL.WATER || t === TL.DEEP) return BED_Y;
  if (t === TL.TREE || t === TL.ROCK) return t === TL.ROCK && W.h[i] > 1 ? W.h[i] * LV : 0;
  if (t === TL.BRIDGE) return 0;
  return (W.h?.[i] ?? 0) * LV;
}

function topTex(t: number): number {
  return t === TL.PATH
    ? TEX.path
    : t === TL.SAND
      ? TEX.sand
      : t === TL.FLOWER
        ? TEX.flower
        : t === TL.LEDGE
          ? TEX.ledge
          : t === TL.BRIDGE
            ? TEX.plank
            : t === TL.WATER || t === TL.DEEP
              ? TEX.bed
              : t === TL.ROCK
                ? TEX.stone
                : TEX.grass;
}

class Geo {
  p: number[] = [];
  n: number[] = [];
  uv: number[] = [];
  quad(a: number[], b: number[], c: number[], d: number[], nrm: number[], tex: number, vh = 1) {
    const u0 = ((tex % 8) * T + 0.02) / (T * 8),
      u1 = ((tex % 8) * T + T - 0.02) / (T * 8);
    const v1 = 1 - (Math.floor(tex / 8) * T + 0.02) / (T * 2),
      v0 = 1 - (Math.floor(tex / 8) * T + T * Math.min(1, vh) - 0.02) / (T * 2);
    for (const q of [a, b, c, a, c, d]) this.p.push(...q);
    for (let i = 0; i < 6; i++) this.n.push(...nrm);
    this.uv.push(u0, v1, u1, v1, u1, v0, u0, v1, u1, v0, u0, v0);
  }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.uv, 2));
    g.computeBoundingSphere();
    return g;
  }
}

/** Vách đứng chia theo từng bậc để texture vách không bị kéo giãn. */
function wall(G: Geo, ax: number, az: number, bx: number, bz: number, y0: number, y1: number, nrm: number[], tex: number) {
  let y = y1;
  while (y > y0 + 0.001) {
    const lo = Math.max(y0, y - LV * 2);
    G.quad([ax, y, az], [bx, y, bz], [bx, lo, bz], [ax, lo, az], nrm, tex, (y - lo) / (LV * 2));
    y = lo;
  }
}

export function buildTerrain(W: any, atlas: THREE.Texture, q: { shadows: boolean }): THREE.Group {
  const grp = new THREE.Group();
  const matl = new THREE.MeshLambertMaterial({ map: atlas });
  for (let cy = 0; cy < MH; cy += CHUNK)
    for (let cx = 0; cx < MW; cx += CHUNK) {
      const G = new Geo();
      for (let y = cy; y < Math.min(MH, cy + CHUNK); y++)
        for (let x = cx; x < Math.min(MW, cx + CHUNK); x++) {
          const t = W.m[y * MW + x],
            h = topY(W, x, y);
          G.quad([x, h, y], [x + 1, h, y], [x + 1, h, y + 1], [x, h, y + 1], [0, 1, 0], topTex(t));
          const side = h <= 0.01 ? (t === TL.SAND ? TEX.cliffSand : TEX.cliff) : TEX.cliff;
          const nb: [number, number, number[], number[]][] = [
            [x, y + 1, [x, y + 1, x + 1, y + 1], [0, 0, 1]],
            [x, y - 1, [x + 1, y, x, y], [0, 0, -1]],
            [x + 1, y, [x + 1, y + 1, x + 1, y], [1, 0, 0]],
            [x - 1, y, [x, y, x, y + 1], [-1, 0, 0]],
          ];
          for (const [nx, ny, e, nrm] of nb) {
            const nh = topY(W, nx, ny);
            if (nh < h - 0.001) wall(G, e[0], e[1], e[2], e[3], nh, h, nrm, side);
          }
        }
      const mesh = new THREE.Mesh(G.build(), matl);
      mesh.receiveShadow = q.shadows;
      mesh.castShadow = q.shadows;
      grp.add(mesh);
    }
  return grp;
}

/** Mặt nước: một mặt phẳng lớn, vân pixel trôi, phản sáng mặt trời. */
export function buildWater(): { mesh: THREE.Mesh; tick(t: number): void } {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 32;
  const c = cv.getContext("2d")!;
  c.fillStyle = "#3d8fc4";
  c.fillRect(0, 0, 32, 32);
  for (let y = 0; y < 32; y++)
    for (let x = 0; x < 32; x++) {
      const r = hash(x, y, 21);
      if (r < 0.06) {
        c.fillStyle = "#7cc6ea";
        c.fillRect(x, y, 2, 1);
      } else if (r < 0.14) {
        c.fillStyle = "#3480b4";
        c.fillRect(x, y, 1, 1);
      }
    }
  const tex = new THREE.CanvasTexture(cv);
  tex.magFilter = tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const S = 400;
  tex.repeat.set(S / 2, S / 2);
  const mat = new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 0.86, shininess: 60, specular: 0x9fd8ff });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(S, S), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(MW / 2, WATER_Y, MH / 2);
  mesh.receiveShadow = true;
  return {
    mesh,
    tick(t) {
      tex.offset.set(Math.floor(t * 4) / 64, Math.floor(t * 2.5) / 64);
    },
  };
}

/** Cây, đá, bia, rương, cổng dạng low-poly dùng InstancedMesh. */
export function buildProps(W: any, q: { shadows: boolean }, opened: (i: number) => boolean) {
  const grp = new THREE.Group();
  const trees: [number, number][] = [],
    rocks: [number, number, number][] = [];
  for (let y = 0; y < MH; y++)
    for (let x = 0; x < MW; x++) {
      const t = W.m[y * MW + x];
      if (t === TL.TREE) trees.push([x, y]);
      else if (t === TL.ROCK) rocks.push([x, y, W.h[y * MW + x]]);
    }
  const flat = (c: number) => new THREE.MeshLambertMaterial({ color: c, flatShading: true });
  const trunkG = new THREE.CylinderGeometry(0.09, 0.14, 0.7, 5).translate(0, 0.35, 0);
  const leafG = new THREE.IcosahedronGeometry(0.46, 0);
  const leaf2G = new THREE.IcosahedronGeometry(0.34, 0);
  const trunk = new THREE.InstancedMesh(trunkG, flat(0x7a5232), trees.length);
  const leaf = new THREE.InstancedMesh(leafG, flat(0xffffff), trees.length);
  const leaf2 = new THREE.InstancedMesh(leaf2G, flat(0xffffff), trees.length);
  const m4 = new THREE.Matrix4(),
    col = new THREE.Color();
  trees.forEach(([x, y], i) => {
    const s = 0.9 + hash(x, y, 3) * 0.35,
      ox = (hash(x, y, 4) - 0.5) * 0.2,
      oz = (hash(x, y, 5) - 0.5) * 0.2;
    m4.makeScale(s, s, s).setPosition(x + 0.5 + ox, 0, y + 0.5 + oz);
    trunk.setMatrixAt(i, m4);
    m4.makeRotationY(hash(x, y, 6) * 6).multiply(new THREE.Matrix4().makeScale(s, s * 1.05, s)).setPosition(x + 0.5 + ox, 0.95 * s, y + 0.5 + oz);
    leaf.setMatrixAt(i, m4);
    m4.makeRotationY(hash(x, y, 7) * 6).multiply(new THREE.Matrix4().makeScale(s, s, s)).setPosition(x + 0.5 + ox, 1.38 * s, y + 0.5 + oz);
    leaf2.setMatrixAt(i, m4);
    col.setHSL(0.27 + hash(x, y, 8) * 0.06, 0.55, 0.34 + hash(x, y, 9) * 0.08);
    leaf.setColorAt(i, col);
    col.offsetHSL(0, 0, 0.07);
    leaf2.setColorAt(i, col);
  });
  const rockG = new THREE.DodecahedronGeometry(0.42, 0);
  const rock = new THREE.InstancedMesh(rockG, flat(0x9097a4), Math.max(1, rocks.length));
  rock.count = rocks.length;
  rocks.forEach(([x, y, h], i) => {
    const tall = h > 1;
    m4.makeRotationY(hash(x, y, 2) * 6)
      .multiply(new THREE.Matrix4().makeScale(tall ? 1.1 : 1, tall ? 0.5 : 0.55 + h * 0.3, tall ? 1.1 : 1))
      .setPosition(x + 0.5, tall ? h * LV : 0.18, y + 0.5);
    rock.setMatrixAt(i, m4);
  });
  for (const o of [trunk, leaf, leaf2, rock]) {
    o.castShadow = q.shadows;
    o.receiveShadow = q.shadows;
    grp.add(o);
  }
  // Bia đá, cổng tháp, cổng hang.
  const lamps: { x: number; y: number; z: number; c: number }[] = [];
  const statueG = new THREE.BoxGeometry(0.6, 0.9, 0.35).translate(0, 0.45, 0);
  for (const s of W.statues ?? []) {
    const m = new THREE.Mesh(statueG, flat(0xa9a3b8));
    m.position.set(s.x + 0.5, 0, s.y + 0.6);
    m.castShadow = q.shadows;
    grp.add(m);
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), new THREE.MeshBasicMaterial({ color: 0x9fe6ff }));
    gem.position.set(s.x + 0.5, 1.15, s.y + 0.6);
    grp.add(gem);
    lamps.push({ x: s.x + 0.5, y: 1.2, z: s.y + 0.6, c: 0x9fe6ff });
  }
  const portal = (p: any, c: number) => {
    if (!p) return;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.12, 4, 10), new THREE.MeshLambertMaterial({ color: 0x8d8698, flatShading: true }));
    ring.position.set(p.x + 0.5, 0.65, p.y + 0.8);
    ring.castShadow = q.shadows;
    grp.add(ring);
    const core = new THREE.Mesh(new THREE.CircleGeometry(0.45, 8), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.8 }));
    core.position.copy(ring.position);
    grp.add(core);
    lamps.push({ x: p.x + 0.5, y: 0.8, z: p.y + 1.1, c });
  };
  portal(W.tower, 0xf0c060);
  portal(W.gate, 0x5aa0ff);
  const chests: THREE.Mesh[] = [];
  const chestG = new THREE.BoxGeometry(0.5, 0.34, 0.34).translate(0, 0.17, 0);
  (W.chests ?? []).forEach((c: any, i: number) => {
    const m = new THREE.Mesh(chestG, flat(0xa0642c));
    m.position.set(c.x + 0.5, 0, c.y + 0.6);
    m.castShadow = q.shadows;
    m.visible = !opened(i);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.06, 0.36), flat(0xf0c060));
    band.position.y = 0.24;
    m.add(band);
    grp.add(m);
    chests.push(m);
  });
  // Cầu cao (deck): mặt ván trên cột, đi được ở dưới gầm.
  for (const d of W.decks ?? []) {
    const len = d.len,
      along = d.axis === "x";
    const w = along ? len : d.w,
      dz = along ? d.w : len;
    const y = d.h * LV;
    const deck = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, dz), flat(0xa8743f));
    deck.position.set(d.x + w / 2, y - 0.06, d.y + dz / 2);
    deck.castShadow = deck.receiveShadow = q.shadows;
    grp.add(deck);
    for (const side of [0, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(along ? w : 0.06, 0.22, along ? 0.06 : dz), flat(0x7c5229));
      rail.position.set(d.x + (along ? w / 2 : side ? w - 0.03 : 0.03), y + 0.11, d.y + (along ? (side ? dz - 0.03 : 0.03) : dz / 2));
      rail.castShadow = q.shadows;
      grp.add(rail);
    }
  }
  return { grp, chests, lamps };
}
