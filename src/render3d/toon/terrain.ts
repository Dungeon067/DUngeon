/**
 * Địa hình mượt dựng từ lưới logic 110×110 và độ cao h. Va chạm vẫn theo lưới; đây chỉ là lớp vẽ.
 * Mỗi ô chia R×R đỉnh: độ cao lấy theo ô (đỉnh trên mép lấy ô cao nhất), làm mượt vài lượt cho mép bo tròn,
 * vách dốc được rung nhiễu cho giống đá. Màu đỉnh trộn mềm theo loại ô, đường đất uốn theo nhiễu.
 */
import * as THREE from "three";
import { MH, MW, TL } from "../../world/map";
import { hash2, noise2, outlineMat, toonMat, withOutline } from "./mat";

export const LV = 22 / 40;
export const WATER_Y = -0.14;
const BED_Y = -0.7;
export const CHUNK = 22;

export interface HeightField {
  R: number;
  n: number;
  h: Float32Array;
  at(x: number, y: number): number;
}

function tileH(W: any, x: number, y: number): number {
  if (x < 0 || y < 0 || x >= MW || y >= MH) return BED_Y;
  const i = y * MW + x,
    t = W.m[i];
  if (t === TL.WATER || t === TL.DEEP || t === TL.BRIDGE) return t === TL.DEEP ? BED_Y - 0.3 : BED_Y;
  if (t === TL.TREE || t === TL.ROCK) return t === TL.ROCK && W.h[i] > 1 ? W.h[i] * LV : 0;
  return (W.h?.[i] ?? 0) * LV;
}

export function buildHeight(W: any, R: number): HeightField {
  const n = MW * R + 1,
    h = new Float32Array(n * n);
  for (let gy = 0; gy < n; gy++)
    for (let gx = 0; gx < n; gx++) {
      const fx = gx / R,
        fy = gy / R,
        ex = gx % R === 0,
        ey = gy % R === 0;
      let m = -9;
      for (const dx of ex ? [-1, 0] : [0])
        for (const dy of ey ? [-1, 0] : [0]) m = Math.max(m, tileH(W, Math.floor(fx) + dx, Math.floor(fy) + dy));
      h[gy * n + gx] = m;
    }
  // Làm mượt: bo mép bệ và chân vách; nước thì làm mượt mạnh hơn cho bờ thoai thoải.
  const tmp = new Float32Array(n * n);
  for (let it = 0; it < 2; it++) {
    for (let gy = 0; gy < n; gy++)
      for (let gx = 0; gx < n; gx++) {
        let s = 0,
          c = 0;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            const x = gx + dx,
              y = gy + dy;
            if (x < 0 || y < 0 || x >= n || y >= n) continue;
            s += h[y * n + x];
            c++;
          }
        const v = h[gy * n + gx];
        tmp[gy * n + gx] = v + (s / c - v) * (v < WATER_Y ? 0.9 : 0.55);
      }
    h.set(tmp);
  }
  // Nhấp nhô nhẹ trên mặt đất và dưới đáy nước.
  for (let gy = 0; gy < n; gy++)
    for (let gx = 0; gx < n; gx++) h[gy * n + gx] += (noise2(gx / (R * 2.5), gy / (R * 2.5), 3) - 0.5) * 0.06;
  return {
    R,
    n,
    h,
    at(x: number, y: number) {
      const gx = Math.min(n - 1.001, Math.max(0, x * R)),
        gy = Math.min(n - 1.001, Math.max(0, y * R));
      const xi = Math.floor(gx),
        yi = Math.floor(gy),
        u = gx - xi,
        v = gy - yi;
      const a = h[yi * n + xi],
        b = h[yi * n + xi + 1],
        c = h[(yi + 1) * n + xi],
        d = h[(yi + 1) * n + xi + 1];
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    },
  };
}

const COL: Record<string, THREE.Color> = {
  grass: new THREE.Color(0x7cc35a),
  grass2: new THREE.Color(0x5fae4c),
  path: new THREE.Color(0xd2a46a),
  sand: new THREE.Color(0xf0dca0),
  bed: new THREE.Color(0xc9b98a),
  rock: new THREE.Color(0x9a8f86),
  rock2: new THREE.Color(0x7a6f73),
  ledge: new THREE.Color(0x8fcf62),
};
function tileCol(W: any, x: number, y: number, out: THREE.Color, wx: number, wy: number) {
  if (x < 0 || y < 0 || x >= MW || y >= MH) return out.copy(COL.bed);
  const t = W.m[y * MW + x];
  if (t === TL.PATH) return out.copy(COL.path);
  if (t === TL.SAND) return out.copy(COL.sand);
  if (t === TL.WATER || t === TL.DEEP || t === TL.BRIDGE) return out.copy(COL.bed);
  if (t === TL.ROCK && W.h[y * MW + x] > 1) return out.copy(COL.rock);
  if (t === TL.LEDGE) return out.copy(COL.ledge);
  return out.copy(COL.grass).lerp(COL.grass2, noise2(wx * 0.35, wy * 0.35, 9));
}

/** Lưới địa hình chia khối CHUNK ô để frustum culling bỏ khối ngoài màn hình. */
export function buildTerrain(W: any, F: HeightField, shadows: boolean, castTerrain = false): THREE.Group {
  const grp = new THREE.Group();
  const { R, n, h } = F;
  // Vị trí đỉnh có rung ngang ở chỗ dốc.
  const px = new Float32Array(n * n),
    pz = new Float32Array(n * n),
    col = new Float32Array(n * n * 3);
  const c = new THREE.Color(),
    acc = new THREE.Color();
  for (let gy = 0; gy < n; gy++)
    for (let gx = 0; gx < n; gx++) {
      const i = gy * n + gx,
        x = gx / R,
        y = gy / R;
      const sx = (h[Math.min(n - 1, gx + 1) + gy * n] - h[Math.max(0, gx - 1) + gy * n]) * R * 0.5,
        sy = (h[gx + Math.min(n - 1, gy + 1) * n] - h[gx + Math.max(0, gy - 1) * n]) * R * 0.5;
      const slope = Math.hypot(sx, sy);
      const j = Math.min(1, slope * 0.8) * 0.16;
      px[i] = x + (noise2(x * 2.1, y * 2.1, 1) - 0.5) * j * 2;
      pz[i] = y + (noise2(x * 2.1, y * 2.1, 2) - 0.5) * j * 2;
      // Màu: lấy mẫu loại ô ở vị trí lệch theo nhiễu (mép đường uốn lượn), trộn 4 mẫu cho viền mềm.
      acc.setRGB(0, 0, 0);
      for (let k = 0; k < 4; k++) {
        const ox = (k & 1 ? 0.22 : -0.22) + (noise2(x * 0.9, y * 0.9, 5) - 0.5) * 0.7,
          oy = (k & 2 ? 0.22 : -0.22) + (noise2(x * 0.9, y * 0.9, 6) - 0.5) * 0.7;
        tileCol(W, Math.floor(x + ox), Math.floor(y + oy), c, x, y);
        acc.r += c.r / 4;
        acc.g += c.g / 4;
        acc.b += c.b / 4;
      }
      const hv = h[i];
      if (slope > 0.9) {
        const band = Math.floor(hv / 0.18) % 2 ? COL.rock2 : COL.rock;
        acc.lerp(band, Math.min(1, (slope - 0.9) * 1.5));
      }
      if (hv < WATER_Y + 0.06 && hv > WATER_Y - 0.25) acc.lerp(COL.sand, 0.6);
      const v = 0.94 + hash2(gx, gy, 4) * 0.06;
      col[i * 3] = acc.r * v;
      col[i * 3 + 1] = acc.g * v;
      col[i * 3 + 2] = acc.b * v;
    }
  const mat = toonMat({ vertexColors: true });
  const cs = CHUNK * R;
  for (let cy = 0; cy < n - 1; cy += cs)
    for (let cx = 0; cx < n - 1; cx += cs) {
      const w = Math.min(cs, n - 1 - cx),
        d = Math.min(cs, n - 1 - cy);
      const pos = new Float32Array((w + 1) * (d + 1) * 3),
        cl = new Float32Array((w + 1) * (d + 1) * 3);
      for (let y = 0; y <= d; y++)
        for (let x = 0; x <= w; x++) {
          const i = (cy + y) * n + cx + x,
            o = (y * (w + 1) + x) * 3;
          pos[o] = px[i];
          pos[o + 1] = h[i];
          pos[o + 2] = pz[i];
          cl.set(col.subarray(i * 3, i * 3 + 3), o);
        }
      const idx: number[] = [];
      for (let y = 0; y < d; y++)
        for (let x = 0; x < w; x++) {
          const a = y * (w + 1) + x,
            b = a + 1,
            c2 = a + w + 1,
            e = c2 + 1;
          idx.push(a, c2, b, b, c2, e);
        }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("color", new THREE.BufferAttribute(cl, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      g.computeBoundingSphere();
      const m = new THREE.Mesh(g, mat);
      m.receiveShadow = shadows;
      m.castShadow = castTerrain;
      grp.add(m);
    }
  return grp;
}

/** Nước toon: màu theo độ sâu, viền bọt trắng ở bờ (khoảng cách tới đất tính sẵn), vân sáng trôi. */
export function buildWater(F: HeightField): { mesh: THREE.Mesh; tick(t: number, sky: THREE.Color): void } {
  const S = 4,
    N = MW * S;
  const land = new Uint8Array(N * N),
    dist = new Float32Array(N * N).fill(1e9);
  const q: number[] = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (F.at((x + 0.5) / S, (y + 0.5) / S) > WATER_Y) {
        land[y * N + x] = 1;
        dist[y * N + x] = 0;
        q.push(y * N + x);
      }
    }
  // Khoảng cách tới đất (BFS 8 hướng, đơn vị ô con).
  for (let qi = 0; qi < q.length; qi++) {
    const i = q[qi],
      x = i % N,
      y = (i / N) | 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx,
          ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        const j = ny * N + nx,
          nd = dist[i] + (dx && dy ? 1.41 : 1);
        if (nd < dist[j]) {
          dist[j] = nd;
          q.push(j);
        }
      }
  }
  const data = new Uint8Array(N * N * 4);
  for (let i = 0; i < N * N; i++) {
    data[i * 4] = Math.min(255, (dist[i] / (S * 4)) * 255);
    const y = (i / N) | 0,
      x = i % N;
    data[i * 4 + 1] = Math.min(255, Math.max(0, ((WATER_Y - F.at((x + 0.5) / S, (y + 0.5) / S)) / 1.2) * 255));
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, N, N, THREE.RGBAFormat);
  tex.magFilter = tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uT: { value: 0 },
        uShore: { value: null },
        uSize: { value: MW },
        uSky: { value: new THREE.Color() },
        uNight: { value: 0 },
      },
    ]),
    vertexShader: `varying vec2 vMap; varying vec3 vW;
      #include <fog_pars_vertex>
      void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW=w.xyz; vMap=w.xz;
        vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: `uniform float uT; uniform sampler2D uShore; uniform float uSize; uniform vec3 uSky; uniform float uNight;
      varying vec2 vMap; varying vec3 vW;
      #include <fog_pars_fragment>
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec2 uv = vMap/uSize; vec4 s = texture2D(uShore, uv);
        bool inside = uv.x>0.0 && uv.y>0.0 && uv.x<1.0 && uv.y<1.0;
        float d = inside ? s.r : 1.0; float depth = inside ? s.g : 1.0;
        vec3 shallow = vec3(0.18,0.68,0.78), deep = vec3(0.06,0.3,0.6);
        vec3 c = mix(shallow, deep, smoothstep(0.05, 0.6, depth));
        c = mix(c, uSky, 0.1);
        float wob = n(vMap*1.3 + vec2(uT*0.25, uT*0.18))*0.06;
        float foam = 1.0 - smoothstep(0.0, 0.025, abs(d - 0.06 - 0.03*sin(uT*1.6 + n(vMap*2.0)*6.0) - wob));
        foam = max(foam, 1.0 - smoothstep(0.02, 0.05, d));
        float line = step(0.78, n(vMap*vec2(2.2,5.0) + vec2(uT*0.4, uT*0.1))) * step(0.5, n(vMap*0.7 - uT*0.05)) * 0.35;
        c = mix(c, vec3(1.0), clamp(foam + line, 0.0, 1.0));
        c *= mix(1.0, 0.45, uNight);
        gl_FragColor = vec4(c, mix(0.88, 0.97, smoothstep(0.0, 0.3, depth)));
        #include <fog_fragment>
      }`,
  });
  mat.uniforms.uShore.value = tex;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(MW * 3, MH * 3).rotateX(-Math.PI / 2), mat);
  mesh.position.set(MW / 2, WATER_Y, MH / 2);
  mesh.renderOrder = 1;
  return {
    mesh,
    tick(t, sky) {
      mat.uniforms.uT.value = t;
      mat.uniforms.uSky.value.copy(sky);
    },
  };
}

/** Cỏ cách điệu: nhiều ngọn, lay theo gió, tô từ gốc sẫm lên ngọn sáng. Rải lại quanh camera khi đi xa. */
export function buildGrass(W: any, F: HeightField, perTile: number) {
  const blades = 5;
  const g = new THREE.BufferGeometry();
  const pos: number[] = [],
    k: number[] = [];
  for (let b = 0; b < blades; b++) {
    const a = (b / blades) * Math.PI + hash2(b, 1) * 0.6,
      r = 0.12 + hash2(b, 2) * 0.12,
      ox = Math.cos(a * 2.3) * r,
      oz = Math.sin(a * 2.3) * r;
    const w = 0.045,
      hh = 0.26 + hash2(b, 3) * 0.14;
    const dx = Math.cos(a) * w,
      dz = Math.sin(a) * w;
    pos.push(ox - dx, 0, oz - dz, ox + dx, 0, oz + dz, ox + dx * 0.2, hh, oz + dz * 0.2);
    k.push(0, 0, 1);
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("k", new THREE.Float32BufferAttribute(k, 1));
  const max = perTile * 900;
  const mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      { uT: { value: 0 }, uLight: { value: new THREE.Color(1, 1, 1) } },
    ]),
    vertexShader: `attribute float k; attribute vec3 tint; varying float vK; varying vec3 vTint; uniform float uT;
      #include <fog_pars_vertex>
      void main(){ vK=k; vTint=tint; vec4 w = modelMatrix*instanceMatrix*vec4(position,1.0);
        float sway = sin(uT*2.2 + w.x*0.9 + w.z*0.7)*0.06 + sin(uT*3.7 + w.x*2.1)*0.025;
        w.x += sway*k; w.z += sway*0.6*k;
        vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: `varying float vK; varying vec3 vTint; uniform vec3 uLight;
      #include <fog_pars_fragment>
      void main(){ vec3 root = vec3(0.24,0.52,0.25), tip = vTint;
        gl_FragColor = vec4(mix(root, tip, smoothstep(0.0,1.0,vK))*uLight, 1.0);
        #include <fog_fragment>
      }`,
  });
  const im = new THREE.InstancedMesh(g, mat, Math.max(1, max));
  const tint = new Float32Array(Math.max(1, max) * 3);
  g.setAttribute("tint", new THREE.InstancedBufferAttribute(tint, 3));
  im.frustumCulled = false;
  im.count = 0;
  let cx = -999,
    cy = -999;
  const m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    sc = new THREE.Vector3(),
    p = new THREE.Vector3(),
    up = new THREE.Vector3(0, 1, 0);
  const FLOWERS = [0xffd0e0, 0xfff2a0, 0xd8c8ff, 0xffffff];
  return {
    mesh: im,
    mat,
    update(tx: number, ty: number, t: number) {
      mat.uniforms.uT.value = t;
      if (Math.abs(tx - cx) < 3 && Math.abs(ty - cy) < 3) return;
      cx = Math.round(tx);
      cy = Math.round(ty);
      let i = 0;
      const c = new THREE.Color();
      for (let y = cy - 14; y <= cy + 14 && i < max; y++)
        for (let x = cx - 15; x <= cx + 15 && i < max; x++) {
          if (x < 0 || y < 0 || x >= MW || y >= MH) continue;
          const tl = W.m[y * MW + x];
          if (tl !== TL.GRASS && tl !== TL.FLOWER && tl !== TL.LEDGE) continue;
          for (let s = 0; s < perTile && i < max; s++) {
            const fx = x + hash2(x, y, s * 2 + 11),
              fy = y + hash2(x, y, s * 2 + 12);
            const hy = F.at(fx, fy);
            if (hy < WATER_Y + 0.05) continue;
            q.setFromAxisAngle(up, hash2(x, y, s + 40) * 6.28);
            const k2 = 0.8 + hash2(x, y, s + 50) * 0.6;
            m4.compose(p.set(fx, hy - 0.02, fy), q, sc.set(k2, k2, k2));
            im.setMatrixAt(i, m4);
            if (tl === TL.FLOWER && s % 2 === 0) c.set(FLOWERS[(x * 7 + y * 3 + s) % FLOWERS.length]);
            else c.setHSL(0.24 + noise2(fx * 0.3, fy * 0.3, 8) * 0.06, 0.6, 0.55 + hash2(x, y, s + 60) * 0.08);
            tint[i * 3] = c.r;
            tint[i * 3 + 1] = c.g;
            tint[i * 3 + 2] = c.b;
            i++;
          }
        }
      im.count = i;
      im.instanceMatrix.needsUpdate = true;
      (g.getAttribute("tint") as THREE.InstancedBufferAttribute).needsUpdate = true;
    },
  };
}

/** Cây tán tròn mềm, đá, bia, cổng, rương, cầu: chia theo khối để culling. */
export function buildProps(W: any, F: HeightField, shadows: boolean, opened: (i: number) => boolean) {
  const grp = new THREE.Group();
  const byChunk = new Map<number, { trees: [number, number][]; rocks: [number, number, number][] }>();
  for (let y = 0; y < MH; y++)
    for (let x = 0; x < MW; x++) {
      const t = W.m[y * MW + x],
        key = Math.floor(y / 11) * 20 + Math.floor(x / 11);
      if (t !== TL.TREE && !(t === TL.ROCK && W.h[y * MW + x] <= 1)) continue;
      let e = byChunk.get(key);
      if (!e) byChunk.set(key, (e = { trees: [], rocks: [] }));
      if (t === TL.TREE) e.trees.push([x, y]);
      else e.rocks.push([x, y, W.h[y * MW + x]]);
    }
  // Tán cây: 4 khối cầu gộp lại, pháp tuyến hướng từ tâm tán nên bóng tô tròn mềm như tranh vẽ.
  const blobs: THREE.BufferGeometry[] = [];
  for (const [x, y, z, r] of [
    [0, 1.3, 0, 0.6],
    [0.32, 1.05, 0.1, 0.38],
    [-0.3, 1.08, -0.08, 0.4],
  ]) {
    const b = new THREE.IcosahedronGeometry(r, 1).translate(x, y, z);
    blobs.push(b);
  }
  const canopy = mergeGeos(blobs);
  const cn = canopy.getAttribute("position") as THREE.BufferAttribute,
    nn = canopy.getAttribute("normal") as THREE.BufferAttribute,
    v = new THREE.Vector3();
  for (let i = 0; i < cn.count; i++) {
    v.set(cn.getX(i), cn.getY(i) - 1.2, cn.getZ(i)).normalize();
    nn.setXYZ(i, v.x, v.y, v.z);
  }
  const trunkG = new THREE.CylinderGeometry(0.08, 0.13, 1.0, 6).translate(0, 0.5, 0);
  const rockG = new THREE.DodecahedronGeometry(0.42, 1);
  {
    const rp = rockG.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < rp.count; i++) {
      v.fromBufferAttribute(rp, i);
      const k = 0.82 + noise2(v.x * 4 + 3, v.z * 4 + v.y * 2, 7) * 0.36;
      rp.setXYZ(i, v.x * k, v.y * k * 0.75, v.z * k);
    }
    rockG.computeVertexNormals();
  }
  const leafMat = toonMat({ color: 0xffffff }),
    trunkMat = toonMat({ color: 0x7a5232 }),
    rockMat = toonMat({ color: 0xa8a2a0 });
  const m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    sc = new THREE.Vector3(),
    p = new THREE.Vector3(),
    up = new THREE.Vector3(0, 1, 0),
    col = new THREE.Color();
  // Viền chỉ hiện cho khối gần camera (tiết kiệm một nửa số tam giác ở xa).
  const lods: { x: number; z: number; ol: THREE.Object3D[] }[] = [];
  for (const [key, { trees, rocks }] of byChunk) {
    const lod = { x: (key % 20) * 11 + 5.5, z: Math.floor(key / 20) * 11 + 5.5, ol: [] as THREE.Object3D[] };
    lods.push(lod);
    if (trees.length) {
      const trunk = new THREE.InstancedMesh(trunkG, trunkMat, trees.length),
        leaf = new THREE.InstancedMesh(canopy, leafMat, trees.length);
      trees.forEach(([x, y], i) => {
        const s = 0.9 + hash2(x, y, 3) * 0.35,
          ox = (hash2(x, y, 4) - 0.5) * 0.25,
          oz = (hash2(x, y, 5) - 0.5) * 0.25;
        const gy = F.at(x + 0.5, y + 0.5);
        q.setFromAxisAngle(up, hash2(x, y, 6) * 6.28);
        m4.compose(p.set(x + 0.5 + ox, gy - 0.05, y + 0.5 + oz), q, sc.set(s, s, s));
        trunk.setMatrixAt(i, m4);
        leaf.setMatrixAt(i, m4);
        col.setHSL(0.26 + hash2(x, y, 8) * 0.07, 0.55, 0.42 + hash2(x, y, 9) * 0.08);
        leaf.setColorAt(i, col);
      });
      for (const o of [trunk, leaf]) {
        o.castShadow = shadows;
        o.receiveShadow = shadows;
        o.computeBoundingSphere();
        grp.add(o);
      }
      lod.ol.push(withOutline(leaf, 0.035), withOutline(trunk, 0.02));
    }
    if (rocks.length) {
      const rock = new THREE.InstancedMesh(rockG, rockMat, rocks.length);
      rocks.forEach(([x, y, hh], i) => {
        const gy = F.at(x + 0.5, y + 0.5);
        q.setFromAxisAngle(up, hash2(x, y, 2) * 6.28);
        m4.compose(p.set(x + 0.5, gy + 0.08, y + 0.5), q, sc.set(1, 0.8 + hh * 0.4, 1));
        rock.setMatrixAt(i, m4);
      });
      rock.castShadow = rock.receiveShadow = shadows;
      rock.computeBoundingSphere();
      grp.add(rock);
      lod.ol.push(withOutline(rock, 0.025));
    }
  }
  // Cầu gỗ trên nước.
  const plankG = new THREE.BoxGeometry(1, 0.08, 0.95),
    plankMat = toonMat({ color: 0xb98550 });
  const bridges: [number, number][] = [];
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) if (W.m[y * MW + x] === TL.BRIDGE) bridges.push([x, y]);
  if (bridges.length) {
    const br = new THREE.InstancedMesh(plankG, plankMat, bridges.length);
    bridges.forEach(([x, y], i) => {
      m4.makeTranslation(x + 0.5, 0.0, y + 0.5);
      br.setMatrixAt(i, m4);
    });
    br.castShadow = br.receiveShadow = shadows;
    br.computeBoundingSphere();
    grp.add(br);
    withOutline(br, 0.015);
  }
  const lamps: { x: number; y: number; z: number; c: number }[] = [];
  const add = (m: THREE.Mesh, ol = 0.02) => {
    m.castShadow = m.receiveShadow = shadows;
    withOutline(m, ol);
    grp.add(m);
    return m;
  };
  for (const s of W.statues ?? []) {
    const gy = F.at(s.x + 0.5, s.y + 0.6);
    add(
      new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.36, 1.0, 8).translate(0, 0.5, 0), toonMat({ color: 0xb8b2c8 })),
    ).position.set(s.x + 0.5, gy, s.y + 0.6);
    const gem = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18, 0),
      toonMat({ color: 0x9fe6ff, emissive: 0x5fc6ff, emissiveIntensity: 1.2 }),
    );
    gem.position.set(s.x + 0.5, gy + 1.3, s.y + 0.6);
    grp.add(gem);
    lamps.push({ x: s.x + 0.5, y: gy + 1.3, z: s.y + 0.6, c: 0x9fe6ff });
  }
  const portal = (pp: any, c: number) => {
    if (!pp) return;
    const gy = F.at(pp.x + 0.5, pp.y + 0.8);
    add(new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.13, 8, 20), toonMat({ color: 0x9a93a8 }))).position.set(
      pp.x + 0.5,
      gy + 0.75,
      pp.y + 0.8,
    );
    const core = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 20),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
    );
    core.position.set(pp.x + 0.5, gy + 0.75, pp.y + 0.8);
    grp.add(core);
    lamps.push({ x: pp.x + 0.5, y: gy + 0.9, z: pp.y + 1.1, c });
  };
  portal(W.tower, 0xf0c060);
  portal(W.gate, 0x5aa0ff);
  const chests: THREE.Object3D[] = [];
  (W.chests ?? []).forEach((ch: any, i: number) => {
    const gy = F.at(ch.x + 0.5, ch.y + 0.6);
    const m = add(
      new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.36, 0.38).translate(0, 0.18, 0), toonMat({ color: 0xb06a30 })),
    );
    m.position.set(ch.x + 0.5, gy, ch.y + 0.6);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.57, 0.07, 0.4), toonMat({ color: 0xf0c060 }));
    band.position.y = 0.26;
    m.add(band);
    m.visible = !opened(i);
    chests.push(m);
  });
  // Cầu cao (deck): ván trên cột, đi được ở dưới gầm.
  for (const d of W.decks ?? []) {
    const along = d.axis === "x",
      w = along ? d.len : d.w,
      dz = along ? d.w : d.len,
      y = d.h * LV;
    add(new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, dz), toonMat({ color: 0xb07a45 }))).position.set(
      d.x + w / 2,
      y - 0.06,
      d.y + dz / 2,
    );
    for (const side of [0, 1])
      add(
        new THREE.Mesh(new THREE.BoxGeometry(along ? w : 0.07, 0.24, along ? 0.07 : dz), toonMat({ color: 0x7c5229 })),
        0.012,
      ).position.set(d.x + (along ? w / 2 : side ? w - 0.04 : 0.04), y + 0.12, d.y + (along ? (side ? dz - 0.04 : 0.04) : dz / 2));
    for (const [px2, pz2] of [
      [0.15, 0.15],
      [w - 0.15, 0.15],
      [0.15, dz - 0.15],
      [w - 0.15, dz - 0.15],
    ]) {
      const gy = F.at(d.x + px2, d.y + pz2);
      add(
        new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, y - gy, 6), toonMat({ color: 0x6e4823 })),
        0.012,
      ).position.set(d.x + px2, (y + gy) / 2, d.y + pz2);
    }
  }
  void outlineMat;
  return { grp, chests, lamps, lods };
}

function mergeGeos(gs: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const pos: number[] = [],
    nrm: number[] = [];
  for (const g of gs) {
    const ng = g.index ? g.toNonIndexed() : g;
    pos.push(...(ng.getAttribute("position").array as Float32Array));
    nrm.push(...(ng.getAttribute("normal").array as Float32Array));
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  return out;
}
