/**
 * Đấu trường 3D (S28): Tháp Tinh Tú và hang Hắc Giao. Dựng một lần khi vào trận, `dispose()` khi ra.
 * Chỉ vẽ, không đổi logic: sàn phẳng ở y = 0, khung đi lại vẫn là GS.G.bounds.
 */
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { EL } from "../../data/content";
import { TS } from "../../world/map";
import { disposeTree, fadeOccluder, hash2, noise2, outlineMat, toonMat, withOutline } from "./mat";

export type ArenaKind = "tower" | "boss";
export interface ArenaQ {
  shadows: boolean;
  bloom: boolean;
  /** Mức Cao: mặt nước phản chiếu thật (Reflector). */
  reflect: boolean;
  /** Hệ số mật độ chi tiết (đá trôi, bào tử): 0,5 Thấp, 1 Vừa, 1,5 Cao. */
  dense: number;
}
export interface ArenaEnv {
  fog: THREE.Color;
  fogNear: number;
  fogFar: number;
  hemiSky: THREE.Color;
  hemiGround: THREE.Color;
  hemiI: number;
  sunCol: THREE.Color;
  sunI: number;
  sunOff: THREE.Vector3;
}
export interface ArenaLamp {
  x: number;
  y: number;
  z: number;
  c: THREE.Color;
  i: number;
}
export interface ArenaTick {
  t: number;
  dt: number;
  G: any;
  camera: THREE.Camera;
  addP: (x: number, y: number, z: number, col: string, s: number) => void;
}
export interface Arena {
  kind: ArenaKind;
  group: THREE.Group;
  env: ArenaEnv;
  lamps: ArenaLamp[];
  tick(c: ArenaTick): void;
  /** Hiệu ứng quái xuất hiện (cột sáng, vòng, hạt) tại tọa độ logic. */
  spawnFx(x: number, y: number, col: string): void;
  stats(): { objects: number };
  dispose(): void;
}

/** Bảng màu theo tầng: 1–3 vàng sao, 4–6 lam ngọc, 7–9 tử vi, 10–12 huyết tinh; trong nhóm lệch sắc nhẹ. */
export function floorPalette(floor: number) {
  const T = [
    { main: 0xf0c060, sky: 0x0b1440, neb: 0x3a4fa8, stone: 0x4d5280, trim: 0xc9a25a },
    { main: 0x5ad8ff, sky: 0x041a2c, neb: 0x1d6a8a, stone: 0x3d5c70, trim: 0x8fd8e8 },
    { main: 0xc08aff, sky: 0x10052a, neb: 0x5a2a8a, stone: 0x4f416e, trim: 0xd0b0ff },
    { main: 0xff7a5a, sky: 0x1e050c, neb: 0x7a2030, stone: 0x5a3a44, trim: 0xffc08a },
  ];
  const f = Math.max(1, Math.min(12, Math.round(floor) || 1)),
    g = T[Math.floor((f - 1) / 3)],
    k = ((f - 1) % 3) * 0.025;
  const C = (h: number) => new THREE.Color(h).offsetHSL(k, 0, 0);
  return { main: C(g.main), sky: C(g.sky), neb: C(g.neb), stone: C(g.stone), trim: C(g.trim) };
}

const rnd = (i: number, s: number) => hash2(i, s, 77);

/**
 * Ẩn dần các instance đứng sát camera (theo khoảng cách ngang tới tâm `at[i]`), để vật trang trí ven vách
 * không che kín màn hình khi camera lùi ra xa. Trả hàm gọi mỗi khung.
 */
function nearHide(im: THREE.InstancedMesh, at: THREE.Vector3[], r0: number, r1: number) {
  const base: THREE.Matrix4[] = [],
    k0 = new Float32Array(im.count).fill(1),
    m = new THREE.Matrix4(),
    sc = new THREE.Matrix4();
  for (let i = 0; i < im.count; i++) {
    const b = new THREE.Matrix4();
    im.getMatrixAt(i, b);
    base.push(b);
  }
  return (cam: THREE.Vector3) => {
    let dirty = false;
    for (let i = 0; i < im.count; i++) {
      const d = Math.hypot(cam.x - at[i].x, cam.z - at[i].z),
        k = Math.max(0, Math.min(1, (d - r0) / (r1 - r0)));
      if (Math.abs(k - k0[i]) < 0.01) continue;
      k0[i] = k;
      dirty = true;
      // Thu nhỏ quanh tâm của instance.
      const e = base[i].elements;
      m.copy(base[i]).multiply(sc.makeScale(k, k, k));
      m.elements[12] = e[12];
      m.elements[13] = e[13];
      m.elements[14] = e[14];
      im.setMatrixAt(i, m);
    }
    if (dirty) im.instanceMatrix.needsUpdate = true;
  };
}

/** Bầu trời sao (vòm theo camera): tinh vân hai màu, dải ngân hà, sao lấp lánh. */
function starDome(top: THREE.Color, neb: THREE.Color, accent: THREE.Color) {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { uT: { value: 0 }, uTop: { value: top }, uNeb: { value: neb }, uAcc: { value: accent } },
    vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); vec4 p = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position = p.xyww; }`,
    fragmentShader: `uniform float uT; uniform vec3 uTop, uNeb, uAcc; varying vec3 vD;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
      float n(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y),
                   mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float fbm(vec3 p){ float s=0.0, a=0.5; for(int i=0;i<4;i++){ s+=a*n(p); p*=2.1; a*=0.5; } return s; }
      void main(){
        vec3 d = normalize(vD);
        vec3 c = mix(uTop*1.25, uTop*0.45, smoothstep(-0.4, 0.8, d.y));
        float band = exp(-pow(dot(d, normalize(vec3(0.35, 0.5, -0.8))) * 3.2, 2.0));
        float nb = fbm(d * 3.0 + vec3(uT * 0.004));
        c += uNeb * smoothstep(0.35, 0.85, nb) * (0.35 + band * 0.9);
        c += uAcc * smoothstep(0.62, 0.95, fbm(d * 5.0 - 3.0)) * band * 0.35;
        vec3 g = floor(d * 220.0);
        float s = h(g);
        float tw = 0.6 + 0.4 * sin(uT * (1.5 + s * 4.0) + s * 40.0);
        c += vec3(step(0.994, s) * tw * (0.6 + band));
        c += vec3(step(0.9993, h(floor(d * 90.0)))) * 1.4;
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16), mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;
  return { mesh, mat };
}

/** Kết cấu sàn tháp: lát đá, vòng chú văn (kênh phát sáng tách riêng). */
function towerFloorTex(stone: THREE.Color, trim: THREE.Color) {
  const S = 1024,
    a = document.createElement("canvas"),
    e = document.createElement("canvas");
  a.width = a.height = e.width = e.height = S;
  const c = a.getContext("2d")!,
    g = e.getContext("2d")!;
  const base = stone.clone();
  c.fillStyle = "#" + base.clone().multiplyScalar(0.7).getHexString();
  c.fillRect(0, 0, S, S);
  const n = 16,
    w = S / n;
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const k = 0.82 + hash2(x, y, 3) * 0.3;
      c.fillStyle = "#" + base.clone().multiplyScalar(k).getHexString();
      c.fillRect(x * w + 3, y * w + 3, w - 6, w - 6);
    }
  g.fillStyle = "#000";
  g.fillRect(0, 0, S, S);
  const cx = S / 2,
    rs = [0.16, 0.27, 0.38, 0.47];
  for (const ctx of [c, g]) {
    ctx.save();
    ctx.translate(cx, cx);
    ctx.strokeStyle = ctx === g ? "#" + trim.getHexString() : "#" + trim.clone().multiplyScalar(0.55).getHexString();
    ctx.lineWidth = ctx === g ? 5 : 9;
    for (const r of rs) {
      ctx.beginPath();
      ctx.arc(0, 0, r * S, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 12; i++) {
      const an = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(an) * rs[0] * S, Math.sin(an) * rs[0] * S);
      ctx.lineTo(Math.cos(an) * rs[2] * S, Math.sin(an) * rs[2] * S);
      ctx.stroke();
      // Ký hiệu chòm sao nhỏ giữa vòng 3 và 4.
      const r = ((rs[2] + rs[3]) / 2) * S,
        x = Math.cos(an + 0.26) * r,
        y = Math.sin(an + 0.26) * r;
      ctx.beginPath();
      ctx.moveTo(x - 14, y + 8);
      ctx.lineTo(x, y - 12);
      ctx.lineTo(x + 14, y + 6);
      ctx.stroke();
    }
    ctx.restore();
  }
  const T = (cv: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(cv);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  };
  return { map: T(a, true), emissive: T(e, true) };
}

/** Một vòng chòm sao: điểm sao trên vòng tròn và các nét nối. */
function constellationRing(R: number, n: number, col: THREE.Color, seed: number) {
  const pts: number[] = [],
    lines: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd(i, seed) * 0.2,
      r = R * (0.95 + rnd(i, seed + 1) * 0.1),
      y = (rnd(i, seed + 2) - 0.5) * 1.4;
    pts.push(Math.cos(a) * r, y, Math.sin(a) * r);
  }
  for (let i = 0; i < n; i++) {
    if (rnd(i, seed + 3) < 0.25) continue;
    const j = (i + 1) % n;
    lines.push(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2], pts[j * 3], pts[j * 3 + 1], pts[j * 3 + 2]);
  }
  const g = new THREE.Group();
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  const pm = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
    uniforms: { uC: { value: col.clone().multiplyScalar(1.6) }, uT: { value: 0 } },
    vertexShader: `uniform float uT; varying float vT; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0);
      vT = 0.65 + 0.35*sin(uT*2.0 + position.x*3.1 + position.z*1.7);
      gl_PointSize = clamp(260.0 / -mv.z, 3.0, 16.0); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uC; varying float vT; void main(){ vec2 q = gl_PointCoord - 0.5; float d = length(q);
      float a = smoothstep(0.5, 0.0, d); a += smoothstep(0.06, 0.0, abs(q.x)) * smoothstep(0.5, 0.1, abs(q.y)) * 0.6;
      a += smoothstep(0.06, 0.0, abs(q.y)) * smoothstep(0.5, 0.1, abs(q.x)) * 0.6;
      gl_FragColor = vec4(mix(uC, vec3(1.4), smoothstep(0.2, 0.0, d)) * vT, clamp(a, 0.0, 1.0)); }`,
  });
  g.add(new THREE.Points(pg, pm));
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
  g.add(
    new THREE.LineSegments(
      lg,
      new THREE.LineBasicMaterial({
        color: col.clone().multiplyScalar(0.9),
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      }),
    ),
  );
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(R, 0.035, 4, 160),
    new THREE.MeshBasicMaterial({
      color: col.clone().multiplyScalar(1.2),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  return { g, pm };
}

/** Vật liệu phát sáng cộng màu, dùng cho cột sáng, cổng, quầng. */
function glowMat(col: THREE.Color, op = 1) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    fog: false,
    uniforms: { uC: { value: col.clone() }, uA: { value: op }, uT: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uC; uniform float uA; uniform float uT; varying vec2 vUv;
      void main(){ float v = 1.0 - vUv.y; float a = pow(v, 1.6) * (0.75 + 0.25*sin(vUv.x*40.0 + uT*6.0)) * uA;
        gl_FragColor = vec4(uC * 1.4, a * smoothstep(0.0, 0.08, vUv.y)); }`,
  });
}

/**
 * Kết giới mờ đánh dấu khung đi lại của logic (`blocked` trong world/collision.ts: x 20..w−20, y 60..h−20),
 * để người chơi thấy chỗ dừng thay vì vấp tường vô hình giữa sàn. Vách thấp phát sáng, gợn chạy theo thời gian.
 */
function boundsBarrier(B: { w: number; h: number }, col: THREE.Color) {
  const x0 = 20 / TS,
    x1 = (B.w - 20) / TS,
    z0 = 60 / TS,
    z1 = (B.h - 20) / TS,
    H = 1.1;
  const pts = [
    [x0, z0],
    [x1, z0],
    [x1, z1],
    [x0, z1],
    [x0, z0],
  ];
  const pos: number[] = [],
    uv: number[] = [],
    idx: number[] = [];
  let u = 0;
  for (let i = 0; i < 4; i++) {
    const [ax, az] = pts[i],
      [bx, bz] = pts[i + 1],
      len = Math.hypot(bx - ax, bz - az),
      n = pos.length / 3;
    pos.push(ax, 0, az, bx, 0, bz, bx, H, bz, ax, H, az);
    uv.push(u, 0, u + len, 0, u + len, 1, u, 1);
    idx.push(n, n + 1, n + 2, n, n + 2, n + 3);
    u += len;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    fog: false,
    uniforms: { uC: { value: col.clone() }, uT: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uC; uniform float uT; varying vec2 vUv;
      void main(){ float v = vUv.y; float a = (1.0 - v) * (0.16 + 0.1 * sin(vUv.x * 2.2 - uT * 2.0));
        a += smoothstep(0.06, 0.0, v) * 0.55;
        gl_FragColor = vec4(uC * 1.3, a); }`,
  });
  const mesh = new THREE.Mesh(g, mat);
  mesh.renderOrder = 3;
  return { mesh, mat };
}

interface Beam {
  o: THREE.Group;
  mat: THREE.ShaderMaterial;
  ring: THREE.Mesh;
  t0: number;
  x: number;
  z: number;
  col: string;
}

function baseArena(kind: ArenaKind) {
  const group = new THREE.Group();
  group.name = `arena-${kind}`;
  const tick: ((c: ArenaTick) => void)[] = [];
  const beams: Beam[] = [];
  const beamGeo = new THREE.CylinderGeometry(0.55, 0.9, 9, 20, 1, true).translate(0, 4.5, 0);
  const ringGeo = new THREE.RingGeometry(0.8, 1, 40).rotateX(-Math.PI / 2);
  let now = 0;
  function spawnFx(x: number, y: number, col: string) {
    let b = beams.find((q) => now - q.t0 > 1.2);
    if (!b) {
      const mat = glowMat(new THREE.Color(col)),
        o = new THREE.Group(),
        ring = new THREE.Mesh(
          ringGeo,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        );
      o.add(new THREE.Mesh(beamGeo, mat), ring);
      group.add(o);
      b = { o, mat, ring, t0: 0, x: 0, z: 0, col };
      beams.push(b);
    }
    b.t0 = now;
    b.x = x / TS;
    b.z = y / TS;
    b.col = col;
    b.mat.uniforms.uC.value.set(col);
    (b.ring.material as THREE.MeshBasicMaterial).color.set(col).multiplyScalar(1.5);
    b.o.position.set(b.x, 0.02, b.z);
  }
  tick.push((c) => {
    now = c.t;
    for (const b of beams) {
      const k = (c.t - b.t0) / 1.1;
      b.o.visible = k >= 0 && k < 1;
      if (!b.o.visible) continue;
      const w = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
      b.mat.uniforms.uA.value = w;
      b.mat.uniforms.uT.value = c.t;
      b.o.children[0].scale.set(0.4 + w * 0.8, 1, 0.4 + w * 0.8);
      const r = 0.3 + k * 1.8;
      b.ring.scale.set(r, 1, r);
      (b.ring.material as THREE.MeshBasicMaterial).opacity = 1 - k;
      if (k < 0.6)
        for (let j = 0; j < 5; j++) {
          const a = j * 1.26 + c.t * 3 + b.x,
            rr = 0.5 + ((j * 7) % 5) * 0.12;
          c.addP(b.x + Math.cos(a) * rr, (k * 6 + j * 0.5) % 4, b.z + Math.sin(a) * rr, j % 2 ? b.col : "#ffffff", 0.9);
        }
    }
  });
  function dispose() {
    disposeTree(group);
    beamGeo.dispose();
    ringGeo.dispose();
  }
  function stats() {
    let objects = 0;
    group.traverse(() => objects++);
    return { objects };
  }
  return { group, tick, spawnFx, dispose, stats, beams };
}

/* ------------------------------ Tháp Tinh Tú ------------------------------ */

export function buildTowerArena(floor: number, B: { w: number; h: number }, Q: ArenaQ): Arena {
  const A = baseArena("tower"),
    { group } = A,
    P = floorPalette(floor);
  const cx = B.w / 2 / TS,
    cz = B.h / 2 / TS;
  // Bát giác bao trọn khung đi lại (đỉnh ở các góc 45°), lơ lửng giữa trời sao.
  const RX = (B.w / TS) * 0.76,
    RZ = (B.h / TS) * 0.76,
    oct = (a: number, s = 1) => new THREE.Vector2(Math.cos(a) * RX * s, Math.sin(a) * RZ * s);
  const dome = starDome(P.sky, P.neb, P.main);
  group.add(dome.mesh);

  // Mặt sàn: lát đá, chú văn phát sáng màu tầng.
  const tex = towerFloorTex(P.stone, P.main);
  const top = new THREE.CircleGeometry(1, 8);
  top.rotateX(-Math.PI / 2);
  top.scale(RX, 1, RZ);
  const uv = top.attributes.uv as THREE.BufferAttribute,
    pos = top.attributes.position as THREE.BufferAttribute,
    RR = Math.max(RX, RZ);
  for (let i = 0; i < uv.count; i++) uv.setXY(i, 0.5 + pos.getX(i) / (2 * RR), 0.5 - pos.getZ(i) / (2 * RR));
  const floorMat = toonMat({ map: tex.map, emissive: 0xffffff, emissiveMap: tex.emissive, emissiveIntensity: 0.6 });
  const floorM = new THREE.Mesh(top, floorMat);
  floorM.receiveShadow = Q.shadows;
  floorM.position.set(cx, 0, cz);
  group.add(floorM);

  // Thành bệ và đáy đá treo ngược.
  const side = new THREE.CylinderGeometry(1, 0.96, 1, 8, 1, true);
  side.rotateY(-Math.PI / 2 + Math.PI / 8 - Math.PI / 8);
  const sideM = new THREE.Mesh(side, toonMat({ color: P.trim.clone().multiplyScalar(0.7) }));
  sideM.scale.set(RX, 0.9, RZ);
  sideM.rotation.y = Math.PI / 2;
  sideM.position.set(cx, -0.45, cz);
  group.add(sideM);
  const under = new THREE.ConeGeometry(1, 1, 8, 6);
  const up = under.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < up.count; i++) {
    const x = up.getX(i),
      y = up.getY(i),
      z = up.getZ(i),
      k = 1 + (noise2(x * 3 + 5, z * 3 + y * 2, 4) - 0.5) * 0.35 * (0.5 - y);
    up.setXYZ(i, x * k, y, z * k);
  }
  under.computeVertexNormals();
  under.rotateX(Math.PI);
  under.rotateY(Math.PI / 2);
  const underM = new THREE.Mesh(under, toonMat({ color: P.stone.clone().multiplyScalar(0.75) }));
  underM.scale.set(RX * 0.97, 9, RZ * 0.97);
  underM.position.set(cx, -0.9 - 4.5, cz);
  group.add(underM);

  // Viền vàng quanh mép sàn.
  const rimPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 8; i++) {
    const v = oct((i / 8) * Math.PI * 2);
    rimPts.push(new THREE.Vector3(v.x, 0.05, v.y));
  }
  const rim = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rimPts, false, "catmullrom", 0), 64, 0.12, 5),
    toonMat({ color: P.trim, emissive: P.main, emissiveIntensity: 0.35 }),
  );
  rim.position.set(cx, 0, cz);
  group.add(rim);

  // Tám cột đá phát sáng ở các đỉnh bát giác, đá sao lơ lửng trên đỉnh cột.
  const N = 8,
    colG = new THREE.CylinderGeometry(0.42, 0.5, 4.2, 8).translate(0, 2.1, 0),
    capG = new THREE.BoxGeometry(1.3, 0.35, 1.3),
    gemG = new THREE.OctahedronGeometry(0.42, 0),
    stripG = new THREE.BoxGeometry(0.1, 3.2, 0.06).translate(0, 2.1, 0.47);
  const stoneMat = toonMat({ color: P.stone.clone().lerp(new THREE.Color(0xffffff), 0.12) });
  const cols = new THREE.InstancedMesh(colG, stoneMat, N),
    caps = new THREE.InstancedMesh(capG, toonMat({ color: P.trim.clone().multiplyScalar(0.8) }), N * 2),
    gemMat = toonMat({ color: P.main, emissive: P.main, emissiveIntensity: 1.6 }),
    gems = new THREE.InstancedMesh(gemG, gemMat, N),
    strips = new THREE.InstancedMesh(
      stripG,
      new THREE.MeshBasicMaterial({ color: P.main.clone().multiplyScalar(1.5) }),
      N,
    );
  const pillarAt: THREE.Vector3[] = [],
    pillarQ: THREE.Quaternion[] = [];
  const m4 = new THREE.Matrix4(),
    qy = new THREE.Quaternion(),
    up3 = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < N; i++) {
    const v = oct((i / N) * Math.PI * 2, 0.93),
      p = new THREE.Vector3(cx + v.x, 0, cz + v.y);
    pillarAt.push(p);
    qy.setFromAxisAngle(up3, -Math.atan2(cz - p.z, cx - p.x) + Math.PI / 2);
    pillarQ.push(qy.clone());
    m4.compose(p, qy, new THREE.Vector3(1, 1, 1));
    cols.setMatrixAt(i, m4);
    strips.setMatrixAt(i, m4);
    caps.setMatrixAt(i * 2, m4.compose(p.clone().setY(0.17), qy, new THREE.Vector3(1, 1, 1)));
    caps.setMatrixAt(i * 2 + 1, m4.compose(p.clone().setY(4.3), qy, new THREE.Vector3(1, 1, 1)));
  }
  for (const im of [cols, caps]) {
    im.castShadow = Q.shadows;
    im.receiveShadow = Q.shadows;
    withOutline(im, 0.04);
    group.add(im);
  }
  group.add(gems, strips);

  // Vòng chòm sao: một vòng nằm ngang quanh bệ, một vòng nghiêng trên cao; xoay chậm.
  const ringA = constellationRing(Math.max(RX, RZ) * 1.35, 28, P.main, 11);
  ringA.g.position.set(cx, 1.2, cz);
  const ringB = constellationRing(Math.max(RX, RZ) * 1.05, 20, P.trim, 23);
  ringB.g.position.set(cx, 9, cz - 4);
  ringB.g.rotation.set(0.5, 0, 0.18);
  group.add(ringA.g, ringB.g);

  // Đá vụn trôi quanh bệ.
  const nR = Math.round(18 * Q.dense),
    rocks = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(1, 0),
      toonMat({ color: P.stone.clone().multiplyScalar(0.8) }),
      nR,
    );
  const rockD: { x: number; y: number; z: number; s: number; ph: number }[] = [];
  for (let i = 0; i < nR; i++) {
    const a = rnd(i, 1) * Math.PI * 2,
      r = Math.max(RX, RZ) * (1.15 + rnd(i, 2) * 0.6);
    rockD.push({
      x: cx + Math.cos(a) * r,
      y: -3 + rnd(i, 3) * 6,
      z: cz + Math.sin(a) * r * 0.85,
      s: 0.3 + rnd(i, 4) * 1.1,
      ph: rnd(i, 5) * 6,
    });
  }
  group.add(rocks);

  // Cổng ra ở mép bắc (trước mặt người chơi): vòm đá, mặt cổng xoáy; sáng rực khi đã vượt tầng.
  const portal = new THREE.Group();
  portal.position.set(cx, 0, cz - RZ * 0.86);
  const arch = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.26, 8, 28, Math.PI),
    toonMat({ color: P.trim, emissive: P.main, emissiveIntensity: 0.25 }),
  );
  arch.position.y = 1.6;
  withOutline(arch, 0.04);
  const legG = new THREE.BoxGeometry(0.5, 1.6, 0.5).translate(0, 0.8, 0);
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(legG, stoneMat);
    leg.position.x = s * 1.7;
    leg.castShadow = Q.shadows;
    portal.add(leg);
  }
  const discMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: false,
    uniforms: { uT: { value: 0 }, uC: { value: P.main.clone() }, uOpen: { value: 0 } },
    vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform float uT; uniform vec3 uC; uniform float uOpen; varying vec2 vP;
      void main(){ vec2 p = vP - vec2(0.0, 1.6); float r = length(p) / 1.6; float a = atan(p.y, p.x);
        if (vP.y < 0.0 || r > 1.0) discard;
        float sw = 0.5 + 0.5*sin(a*5.0 - r*10.0 + uT*(2.0 + uOpen*4.0));
        vec3 c = mix(uC*0.4, uC*1.6, sw*r) + vec3(1.0)*smoothstep(0.35, 0.0, r)*uOpen;
        gl_FragColor = vec4(c, (0.35 + 0.55*uOpen) * (0.4 + 0.6*sw) * smoothstep(1.0, 0.85, r)); }`,
  });
  const disc = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32).translate(0, 1.6, 0), discMat);
  portal.add(arch, disc);
  group.add(portal);

  // Vòng triệu hồi đợt quái: hiện ở cung xuất quái trong lúc chờ đợt mới.
  const sumMat = new THREE.MeshBasicMaterial({
    color: P.main.clone().multiplyScalar(1.4),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sumG = new THREE.RingGeometry(0.55, 0.75, 6).rotateX(-Math.PI / 2);
  const sigils = new THREE.InstancedMesh(sumG, sumMat, 7);
  for (let i = 0; i < 7; i++) {
    const a = Math.PI + (i / 6) * Math.PI;
    m4.makeTranslation(cx + Math.cos(a) * (300 / TS), 0.04, 300 / TS + Math.sin(a) * (160 / TS));
    sigils.setMatrixAt(i, m4);
  }
  group.add(sigils);
  const barrier = boundsBarrier(B, P.main);
  group.add(barrier.mesh);

  group.traverse((o: any) => o.isMesh && o !== dome.mesh && [o.material].flat().forEach(fadeOccluder));

  const lamps: ArenaLamp[] = pillarAt.map((p) => ({ x: p.x, y: 4.8, z: p.z, c: P.main.clone(), i: 1.2 }));
  lamps.push({ x: portal.position.x, y: 1.8, z: portal.position.z + 0.6, c: P.main.clone(), i: 0.8 });
  const env: ArenaEnv = {
    fog: P.sky.clone().lerp(P.neb, 0.35),
    fogNear: 30,
    fogFar: 110,
    hemiSky: P.neb.clone().lerp(new THREE.Color(0xffffff), 0.55),
    hemiGround: P.sky.clone().lerp(P.main, 0.25),
    hemiI: 1.25,
    sunCol: new THREE.Color(0xfff2dc).lerp(P.main, 0.2),
    sunI: 1.9,
    sunOff: new THREE.Vector3(-7, 15, -6),
  };
  const pillarK = new Array(N).fill(1);
  const sc = new THREE.Vector3(),
    qq = new THREE.Quaternion(),
    eu = new THREE.Euler();
  A.tick.push((c) => {
    const { t, G } = c;
    dome.mesh.position.copy(c.camera.position);
    dome.mat.uniforms.uT.value = t;
    ringA.g.rotation.y = t * 0.03;
    ringB.g.rotation.y = -t * 0.05;
    ringA.pm.uniforms.uT.value = ringB.pm.uniforms.uT.value = t;
    barrier.mat.uniforms.uT.value = t;
    const T = G.tower,
      waiting = T && !G.over && T.wave < T.waves.length && !G.enemies.some((e: any) => !e.dead),
      charge = waiting ? Math.max(0, Math.min(1, 1 - T.gap / 1.5)) : 0,
      cleared = G.over && G._ended && T && T.wave >= T.waves.length && T.timeLeft > 0;
    // Cột đứng chắn ngay trước camera thì thu nhỏ dần cho khỏi che trận đấu.
    const cp = c.camera.position;
    for (let i = 0; i < N; i++) {
      const p = pillarAt[i],
        near = Math.hypot(cp.x - p.x, cp.z - p.z),
        k = Math.max(0, Math.min(1, (near - 5) / 4));
      if (pillarK[i] !== k) {
        pillarK[i] = k;
        const S = new THREE.Vector3(k, k, k);
        m4.compose(p, pillarQ[i], S);
        cols.setMatrixAt(i, m4);
        strips.setMatrixAt(i, m4);
        caps.setMatrixAt(i * 2, m4.compose(p.clone().setY(0.17), pillarQ[i], S));
        caps.setMatrixAt(i * 2 + 1, m4.compose(p.clone().setY(4.3 * k), pillarQ[i], S));
        cols.instanceMatrix.needsUpdate = strips.instanceMatrix.needsUpdate = caps.instanceMatrix.needsUpdate = true;
      }
      eu.set(0, t * 0.8 + i, 0);
      qq.setFromEuler(eu);
      const s = (1 + charge * 0.35 + Math.sin(t * 3 + i) * 0.05) * pillarK[i];
      m4.compose(sc.set(p.x, 5.1 + Math.sin(t * 1.6 + i) * 0.15, p.z), qq, new THREE.Vector3(s, s * 1.3, s));
      gems.setMatrixAt(i, m4);
      lamps[i].i = (1.1 + charge * 1.5 + Math.sin(t * 2 + i) * 0.1) * pillarK[i];
    }
    gems.instanceMatrix.needsUpdate = true;
    gemMat.emissiveIntensity = 1.4 + charge * 1.4;
    sumMat.opacity = charge * 0.9;
    if (charge > 0) {
      for (let i = 0; i < 7; i++) {
        const a = Math.PI + (i / 6) * Math.PI;
        m4.compose(
          sc.set(cx + Math.cos(a) * (300 / TS), 0.04, 300 / TS + Math.sin(a) * (160 / TS)),
          qq.setFromEuler(eu.set(0, t * 2 + i, 0)),
          new THREE.Vector3(0.6 + charge * 0.9, 1, 0.6 + charge * 0.9),
        );
        sigils.setMatrixAt(i, m4);
        if ((i + Math.floor(t * 20)) % 3 === 0)
          c.addP(
            cx + Math.cos(a) * (300 / TS) + Math.sin(t * 7 + i) * 0.5,
            charge * 2 + (i % 3) * 0.3,
            300 / TS + Math.sin(a) * (160 / TS) + Math.cos(t * 5 + i) * 0.5,
            "#" + P.main.getHexString(),
            0.8,
          );
      }
      sigils.instanceMatrix.needsUpdate = true;
    }
    const open = cleared ? 1 : 0;
    const u = discMat.uniforms.uOpen;
    u.value += (open - u.value) * Math.min(1, c.dt * 3);
    discMat.uniforms.uT.value = t;
    lamps[N].i = 0.6 + u.value * 2.4;
    for (let i = 0; i < nR; i++) {
      const r = rockD[i];
      m4.compose(
        sc.set(r.x, r.y + Math.sin(t * 0.6 + r.ph) * 0.4, r.z),
        qq.setFromEuler(eu.set(t * 0.1 + r.ph, t * 0.15 + r.ph, 0)),
        new THREE.Vector3(r.s, r.s * 0.8, r.s),
      );
      rocks.setMatrixAt(i, m4);
    }
    rocks.instanceMatrix.needsUpdate = true;
  });
  return {
    kind: "tower",
    group,
    env,
    lamps,
    tick: (c) => A.tick.forEach((f) => f(c)),
    spawnFx: A.spawnFx,
    stats: A.stats,
    dispose: A.dispose,
  };
}

/* ------------------------------ Hang Hắc Giao ------------------------------ */

/** Mặt nước đen: gợn sóng, ánh lân tinh phản chiếu; mức Cao trộn ảnh phản chiếu thật. */
function caveWater(W: number, H: number, cx: number, cz: number, Q: ArenaQ, lamps: ArenaLamp[]) {
  const NL = 8;
  const uniforms = {
    uT: { value: 0 },
    uDeep: { value: new THREE.Color(0x02060c) },
    uTint: { value: new THREE.Color(0x0c2a3a) },
    uLP: { value: Array.from({ length: NL }, () => new THREE.Vector3()) },
    uLC: { value: Array.from({ length: NL }, () => new THREE.Color()) },
    tDiffuse: { value: null as THREE.Texture | null },
    textureMatrix: { value: new THREE.Matrix4() },
    color: { value: new THREE.Color(0xffffff) },
    uRefl: { value: Q.reflect ? 1 : 0 },
  };
  lamps.slice(0, NL).forEach((l, i) => {
    uniforms.uLP.value[i].set(l.x, l.y, l.z);
    uniforms.uLC.value[i].copy(l.c);
  });
  const shader = {
    uniforms,
    vertexShader: `uniform mat4 textureMatrix; varying vec4 vUvR; varying vec3 vW;
      #include <common>
      #include <fog_pars_vertex>
      void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; vUvR = textureMatrix*vec4(position,1.0);
        vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: `uniform float uT; uniform vec3 uDeep, uTint; uniform vec3 uLP[${NL}]; uniform vec3 uLC[${NL}];
      uniform sampler2D tDiffuse; uniform float uRefl; varying vec4 vUvR; varying vec3 vW;
      #include <common>
      #include <fog_pars_fragment>
      float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec2 q = vW.xz;
        float e = 0.08;
        float hA = n2(q*1.3 + vec2(uT*0.35, uT*0.2)) + 0.5*n2(q*3.1 - vec2(uT*0.5, uT*0.1));
        float hX = n2((q+vec2(e,0.0))*1.3 + vec2(uT*0.35, uT*0.2)) + 0.5*n2((q+vec2(e,0.0))*3.1 - vec2(uT*0.5, uT*0.1));
        float hZ = n2((q+vec2(0.0,e))*1.3 + vec2(uT*0.35, uT*0.2)) + 0.5*n2((q+vec2(0.0,e))*3.1 - vec2(uT*0.5, uT*0.1));
        vec3 N = normalize(vec3((hA-hX)*0.9, 1.0, (hA-hZ)*0.9));
        vec3 V = normalize(cameraPosition - vW);
        float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
        vec3 c = mix(uDeep, uTint, 0.25 + fres*0.6);
        vec3 R = reflect(-V, N);
        for (int i = 0; i < ${NL}; i++) {
          vec3 L = normalize(uLP[i] - vW);
          float s = pow(max(dot(R, L), 0.0), 90.0);
          float d = length(uLP[i].xz - vW.xz);
          c += uLC[i] * (s * 2.2 + exp(-d*0.5) * 0.06);
        }
        if (uRefl > 0.5) {
          vec4 uvr = vUvR; uvr.xy += N.xz * 0.6;
          vec3 rc = texture2DProj(tDiffuse, uvr).rgb;
          c += rc * (0.45 + fres * 0.4);
        }
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
  };
  const geo = new THREE.PlaneGeometry(W, H);
  let mesh: THREE.Mesh;
  if (Q.reflect) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    mesh = new Reflector(geo, {
      shader: shader as any,
      textureWidth: Math.round(innerWidth * dpr * 0.5),
      textureHeight: Math.round(innerHeight * dpr * 0.5),
      clipBias: 0.003,
    });
    const mu = (mesh.material as THREE.ShaderMaterial).uniforms;
    for (const k of ["uT", "uDeep", "uTint", "uLP", "uLC", "uRefl"]) (mu as any)[k] = (uniforms as any)[k];
    (mesh.material as THREE.ShaderMaterial).fog = true;
    Object.assign(mu, THREE.UniformsUtils.clone(THREE.UniformsLib.fog));
  } else {
    mesh = new THREE.Mesh(
      geo,
      new THREE.ShaderMaterial({
        ...shader,
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {}]),
        fog: true,
      }),
    );
    Object.assign((mesh.material as THREE.ShaderMaterial).uniforms, uniforms);
  }
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(cx, 0, cz);
  mesh.receiveShadow = false;
  return { mesh, uniforms };
}

export function buildBossArena(B: { w: number; h: number }, Q: ArenaQ): Arena {
  const A = baseArena("boss"),
    { group } = A;
  const cx = B.w / 2 / TS,
    cz = B.h / 2 / TS,
    RX = B.w / TS / 2 + 13,
    RZ = B.h / TS / 2 + 13,
    HT = 16;

  // Vách hang và vòm trần: lưới quay (vẽ mặt trong), nhiễu theo góc và độ cao. Camera ra ngoài vách vẫn nhìn xuyên.
  const SEG = 72,
    ROW = 20,
    vp: number[] = [],
    vc: number[] = [],
    idx: number[] = [];
  const cA = new THREE.Color(0x26324c),
    cB = new THREE.Color(0x44567a),
    cC = new THREE.Color(0x121a2c),
    tmp = new THREE.Color();
  for (let r = 0; r <= ROW; r++) {
    const v = r / ROW,
      phi = v * Math.PI * 0.5 * 0.94;
    for (let s = 0; s <= SEG; s++) {
      const u = (s / SEG) * Math.PI * 2,
        nz = noise2(Math.cos(u) * 3 + 9, Math.sin(u) * 3 + v * 6, 2),
        bump = 1 + (nz - 0.5) * 0.28 + (noise2(s * 0.6, r * 0.8, 5) - 0.5) * 0.08,
        rad = Math.cos(phi) * bump,
        y = -1.5 + Math.sin(phi) * HT * (0.95 + (nz - 0.5) * 0.15);
      vp.push(cx + Math.cos(u) * RX * rad, y, cz + Math.sin(u) * RZ * rad);
      tmp
        .copy(cA)
        .lerp(cB, Math.max(0, Math.sin(r * 1.7 + nz * 4)) * 0.6)
        .lerp(cC, v * 0.6);
      vc.push(tmp.r, tmp.g, tmp.b);
    }
  }
  for (let r = 0; r < ROW; r++)
    for (let s = 0; s < SEG; s++) {
      const a = r * (SEG + 1) + s,
        b = a + 1,
        c = a + SEG + 1,
        d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  const wallG = new THREE.BufferGeometry();
  wallG.setAttribute("position", new THREE.Float32BufferAttribute(vp, 3));
  wallG.setAttribute("color", new THREE.Float32BufferAttribute(vc, 3));
  wallG.setIndex(idx);
  wallG.computeVertexNormals();
  const wall = new THREE.Mesh(wallG, toonMat({ vertexColors: true, side: THREE.BackSide }));
  wall.receiveShadow = Q.shadows;
  group.add(wall);

  // Nhũ đá trên trần và măng đá ven bờ.
  const nS = Math.round(46 * Q.dense),
    nM = Math.round(30 * Q.dense),
    rockMat = toonMat({ color: 0x232d44 });
  const stal = new THREE.InstancedMesh(new THREE.ConeGeometry(1, 1, 6).rotateX(Math.PI), rockMat, nS),
    stag = new THREE.InstancedMesh(new THREE.ConeGeometry(1, 1, 6).translate(0, 0.5, 0), rockMat, nM);
  const m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e3 = new THREE.Euler(),
    v = new THREE.Vector3(),
    s3 = new THREE.Vector3();
  for (let i = 0; i < nS; i++) {
    const a = rnd(i, 7) * Math.PI * 2,
      r = Math.sqrt(rnd(i, 8)) * 0.85,
      phi = Math.acos(Math.min(1, r)),
      len = 1.2 + rnd(i, 9) * 3.5;
    v.set(cx + Math.cos(a) * RX * r, -1.5 + Math.sin(phi) * HT * 0.92 - len / 2, cz + Math.sin(a) * RZ * r);
    m4.compose(v, q.identity(), s3.set(0.3 + rnd(i, 10) * 0.5, len, 0.3 + rnd(i, 10) * 0.5));
    stal.setMatrixAt(i, m4);
  }
  for (let i = 0; i < nM; i++) {
    const a = rnd(i, 11) * Math.PI * 2,
      r = 0.86 + rnd(i, 12) * 0.1,
      hgt = 0.8 + rnd(i, 13) * 2.6;
    v.set(cx + Math.cos(a) * RX * r, -0.4, cz + Math.sin(a) * RZ * r);
    m4.compose(
      v,
      q.setFromEuler(e3.set(rnd(i, 14) * 0.3, 0, rnd(i, 15) * 0.3)),
      s3.set(0.5 + rnd(i, 16) * 0.7, hgt, 0.5),
    );
    stag.setMatrixAt(i, m4);
  }
  stag.castShadow = Q.shadows;
  const stagAt: THREE.Vector3[] = [];
  for (let i = 0; i < nM; i++) {
    stag.getMatrixAt(i, m4);
    stagAt.push(new THREE.Vector3().setFromMatrixPosition(m4));
  }
  const hides = [nearHide(stag, stagAt, 4, 8)];
  group.add(stal, stag);

  // Cụm nấm và tinh thể lân tinh trên vách: phát sáng (bloom), đèn điểm gần người chơi.
  const LUM = [0x3af0d0, 0x5ab8ff, 0x9a7bff, 0x3af0d0, 0x7cffb0];
  const lamps: ArenaLamp[] = [],
    nC = 20,
    perC = Math.round(7 * Math.max(0.7, Q.dense));
  const capsG = new THREE.SphereGeometry(1, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2),
    stemG = new THREE.CylinderGeometry(0.25, 0.32, 1, 5).translate(0, -0.5, 0),
    crysG = new THREE.OctahedronGeometry(1, 0).scale(0.45, 1.4, 0.45);
  const capsM = new THREE.InstancedMesh(capsG, new THREE.MeshBasicMaterial({ color: 0xffffff }), nC * perC),
    stemM = new THREE.InstancedMesh(stemG, toonMat({ color: 0x9ab0c8 }), nC * perC),
    crysM = new THREE.InstancedMesh(crysG, new THREE.MeshBasicMaterial({ color: 0xffffff }), nC * 3);
  const col = new THREE.Color();
  let ki = 0,
    kc = 0;
  const capAt: THREE.Vector3[] = [],
    crysAt: THREE.Vector3[] = [];
  for (let c = 0; c < nC; c++) {
    const a = (c / nC) * Math.PI * 2 + rnd(c, 20) * 0.3,
      h = 0.1 + rnd(c, 21) * (c % 3 === 0 ? 5 : 1.6),
      rr = Math.cos(Math.asin(Math.min(0.95, (h + 1.5) / HT))) * 0.9,
      px = cx + Math.cos(a) * RX * rr,
      pz = cz + Math.sin(a) * RZ * rr,
      lc = new THREE.Color(LUM[c % LUM.length]);
    lamps.push({ x: px - Math.cos(a) * 0.8, y: h + 0.9, z: pz - Math.sin(a) * 0.8, c: lc, i: 1.5 });
    for (let k = 0; k < perC; k++) {
      const o = (k - perC / 2) * 0.35,
        sz = 0.3 + rnd(c * 10 + k, 22) * 0.55;
      v.set(px - Math.sin(a) * o + rnd(k, c) * 0.3, h + rnd(k, c + 1) * 0.8 + sz * 2, pz + Math.cos(a) * o);
      m4.compose(
        v,
        q.setFromEuler(e3.set(rnd(k, c + 2) * 0.5 - 0.25, 0, rnd(k, c + 3) * 0.5 - 0.25)),
        s3.set(sz, sz * 0.6, sz),
      );
      capsM.setMatrixAt(ki, m4);
      capsM.setColorAt(ki, col.copy(lc).offsetHSL(rnd(k, c + 4) * 0.08 - 0.04, 0, 0));
      m4.compose(v, q, s3.set(sz * 0.5, sz * 2, sz * 0.5));
      stemM.setMatrixAt(ki++, m4);
      capAt.push(new THREE.Vector3(px, h, pz));
    }
    for (let k = 0; k < 3; k++) {
      const sz = 0.3 + rnd(c, 30 + k) * 0.5;
      v.set(px + (k - 1) * 0.5, h + sz * 0.8 - 0.3, pz + rnd(c, 40 + k) * 0.4);
      m4.compose(v, q.setFromEuler(e3.set((k - 1) * 0.4, rnd(c, k) * 3, 0)), s3.set(sz, sz, sz));
      crysM.setMatrixAt(kc, m4);
      crysM.setColorAt(kc++, col.copy(lc).lerp(new THREE.Color(0xffffff), 0.2));
      crysAt.push(new THREE.Vector3(px, h, pz));
    }
  }
  group.add(capsM, stemM, crysM);
  // Quầng sáng mềm quanh mỗi cụm (điểm sprite cộng màu), phản chiếu xuống mặt nước.
  const hp: number[] = [],
    hc: number[] = [];
  lamps.forEach((l) => {
    hp.push(l.x, l.y - 0.3, l.z);
    hc.push(l.c.r, l.c.g, l.c.b);
  });
  const haloG = new THREE.BufferGeometry();
  haloG.setAttribute("position", new THREE.Float32BufferAttribute(hp, 3));
  haloG.setAttribute("color", new THREE.Float32BufferAttribute(hc, 3));
  const halo = new THREE.Points(
    haloG,
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: `varying vec3 vC; void main(){ vC = color; vec4 mv = modelViewMatrix*vec4(position,1.0);
        gl_PointSize = clamp(2400.0 / -mv.z, 8.0, 260.0); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying vec3 vC; void main(){ float d = length(gl_PointCoord-0.5); gl_FragColor = vec4(vC, pow(smoothstep(0.5, 0.0, d), 2.2) * 0.45); }`,
    }),
  );
  halo.frustumCulled = false;
  group.add(halo);
  hides.push(nearHide(capsM, capAt, 4, 8), nearHide(stemM, capAt, 4, 8), nearHide(crysM, crysAt, 4, 8));

  // Cột sáng mờ rọi từ khe trần xuống giữa hang.
  const shaftMat = glowMat(new THREE.Color(0x3a6a98), 0.16),
    shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 3.6, HT, 24, 1, true).translate(0, HT / 2, 0), shaftMat);
  shaft.rotation.x = Math.PI;
  shaft.position.set(cx, HT - 0.5, cz - 1);
  group.add(shaft);

  // Bào tử phát sáng trôi lơ lửng.
  const nP = Math.round(160 * Q.dense),
    sp = new Float32Array(nP * 3),
    sph = new Float32Array(nP);
  for (let i = 0; i < nP; i++) {
    sp[i * 3] = cx + (rnd(i, 50) - 0.5) * RX * 1.7;
    sp[i * 3 + 1] = 0.3 + rnd(i, 51) * 8;
    sp[i * 3 + 2] = cz + (rnd(i, 52) - 0.5) * RZ * 1.7;
    sph[i] = rnd(i, 53) * 6.28;
  }
  const spG = new THREE.BufferGeometry();
  spG.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  spG.setAttribute("ph", new THREE.BufferAttribute(sph, 1));
  const spM = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uT: { value: 0 }, uC: { value: new THREE.Color(0x6af5e0) } },
    vertexShader: `attribute float ph; uniform float uT; varying float vA; void main(){
      vec3 p = position + vec3(sin(uT*0.3+ph)*0.6, sin(uT*0.5+ph*2.0)*0.4, cos(uT*0.25+ph)*0.6);
      vec4 mv = modelViewMatrix*vec4(p,1.0); vA = 0.5 + 0.5*sin(uT*1.7 + ph*3.0);
      gl_PointSize = clamp(120.0 / -mv.z, 1.5, 7.0); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uC; varying float vA; void main(){ float d = length(gl_PointCoord-0.5);
      gl_FragColor = vec4(uC*1.5, smoothstep(0.5, 0.0, d) * vA); }`,
  });
  const spores = new THREE.Points(spG, spM);
  spores.frustumCulled = false;
  group.add(spores);

  const water = caveWater(RX * 2.4, RZ * 2.4, cx, cz, Q, lamps);
  group.add(water.mesh);
  const barrier = boundsBarrier(B, new THREE.Color(0x3af0d0));
  group.add(barrier.mesh);

  group.traverse((o: any) => o.isMesh && o !== water.mesh && [o.material].flat().forEach(fadeOccluder));
  void outlineMat;

  const env: ArenaEnv = {
    fog: new THREE.Color(0x050b16),
    fogNear: 22,
    fogFar: 62,
    hemiSky: new THREE.Color(0x8ab8e8),
    hemiGround: new THREE.Color(0x1a2a48),
    hemiI: 1.45,
    sunCol: new THREE.Color(0xbfe0ff),
    sunI: 1.8,
    sunOff: new THREE.Vector3(-3, 16, -5),
  };
  const baseLamp = lamps.map((l) => l.c.clone());
  const bolt = new THREE.Color(EL.bolt?.c ?? "#b47bff");
  let flashT = 0,
    phase = 1;
  A.tick.push((c) => {
    const { t, G, dt } = c;
    for (const h of hides) h(c.camera.position);
    water.uniforms.uT.value = t;
    barrier.mat.uniforms.uT.value = t;
    spM.uniforms.uT.value = t;
    shaftMat.uniforms.uT.value = t * 0.2;
    const b = G.boss,
      p2 = b && b.phase === 2 ? 1 : 0;
    if (p2 && phase === 1) flashT = 0.5;
    phase = p2 ? 2 : 1;
    // Giai đoạn 2: hang ngả tím Lôi, chớp sáng ngẫu nhiên.
    if (p2 && Math.random() < dt * 0.35) flashT = 0.25;
    flashT = Math.max(0, flashT - dt);
    lamps.forEach((l, i) => {
      l.c.copy(baseLamp[i]).lerp(bolt, p2 * 0.45);
      l.i = 1.4 + Math.sin(t * 1.3 + i * 1.7) * 0.25;
      water.uniforms.uLC.value[i]?.copy(l.c).multiplyScalar(l.i * 0.6);
    });
    env.hemiSky.set(0x8ab8e8).lerp(bolt, p2 * 0.3);
    env.hemiI = 1.45 + flashT * 3;
    env.sunI = 1.8 + flashT * 4;
    spM.uniforms.uC.value.set(0x6af5e0).lerp(bolt, p2 * 0.6);
  });
  return {
    kind: "boss",
    group,
    env,
    lamps,
    tick: (c) => A.tick.forEach((f) => f(c)),
    spawnFx: A.spawnFx,
    stats: A.stats,
    dispose: A.dispose,
  };
}
