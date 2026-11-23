/**
 * Vùng cảnh báo đòn 3D trên mặt sàn đấu trường (S28): cùng hình, cùng tiến độ với bản 2D (art/props.ts):
 * nền mờ cả vùng, phần tô đầy dần theo tiến độ, viền sáng dần, nháy trắng từ FEEL.telegraph.flashAt.
 * Sóng xung kích (nhảy để né) là vòng sáng có vách thấp. Chỉ dùng ở đấu trường (sàn phẳng y = 0).
 */
import * as THREE from "three";
import { FEEL } from "../../combat/feel";
import { EL } from "../../data/content";
import { TS } from "../../world/map";

const SH = { circle: 0, fan: 1, rect: 2, ring: 3, dash: 4 } as const;
type Shape = keyof typeof SH;

const VERT = `uniform float uR; varying vec2 vP; void main(){ vP = position.xz * uR * 1.02;
  gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const FRAG = `uniform float uShape, uR, uP, uHalf, uK, uFlash, uT, uEdge; uniform vec3 uC; varying vec2 vP;
  void main(){
    vec2 p = vP; float r = length(p); float ed; float pr;
    if (uShape < 0.5) { ed = uR - r; pr = step(r, uR * uP); }
    else if (uShape < 1.5) { float a = abs(atan(p.y, p.x)); ed = min(uR - r, (uHalf - a) * max(r, 0.3)); pr = step(r, uR * uP); }
    else if (uShape < 2.5) { ed = min(min(p.x, uR - p.x), uHalf - abs(p.y)); pr = step(p.x, uR * uP); }
    else if (uShape < 3.5) { ed = uHalf - abs(r - uR); pr = 1.0; }
    else { ed = min(min(p.x, uR - p.x), uHalf - abs(p.y)); pr = step(0.45, fract((p.x - uT * 1.5) / 0.45)); }
    if (ed < 0.0) discard;
    bool fl = uFlash > 0.5;
    vec3 col = uC; float a = 0.10 + uK * 0.08;
    if (uShape > 2.5) { a = 0.0; }
    if (pr > 0.5 && uShape < 2.5) { a = fl ? 0.42 : 0.22 + uK * 0.2; col = fl ? vec3(1.0, 0.92, 0.92) : uC; }
    float e = 1.0 - smoothstep(0.0, uEdge, ed);
    if (uShape > 2.5) e = uShape > 3.5 ? pr * (0.6 + 0.4 * (1.0 - smoothstep(0.0, uHalf, ed))) : 1.0 - smoothstep(0.0, uHalf, ed) * 0.6;
    vec3 ec = fl ? vec3(1.6) : mix(uC * 1.4, vec3(1.5, 1.2, 0.95), uK * 0.6);
    col = mix(col, ec, e);
    a = max(a, e * (0.45 + uK * 0.55));
    gl_FragColor = vec4(col, a);
  }`;

interface Decal {
  m: THREE.Mesh;
  u: Record<string, THREE.IUniform>;
}
const RED = new THREE.Color(1, 0.24, 0.22);

export function createTeleLayer(scene: THREE.Scene) {
  const grp = new THREE.Group();
  grp.name = "tele3d";
  scene.add(grp);
  const geo = new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2);
  const pool: Decal[] = [];
  let n = 0;
  function take(): Decal {
    let d = pool[n];
    if (!d) {
      const u = {
        uShape: { value: 0 },
        uR: { value: 1 },
        uP: { value: 1 },
        uHalf: { value: 0.5 },
        uK: { value: 0 },
        uFlash: { value: 0 },
        uT: { value: 0 },
        uEdge: { value: 0.09 },
        uC: { value: new THREE.Color() },
      };
      const mat = new THREE.ShaderMaterial({
        uniforms: u,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      });
      const m = new THREE.Mesh(geo, mat);
      m.renderOrder = 2;
      m.frustumCulled = false;
      grp.add(m);
      d = { m, u };
      pool.push(d);
    }
    n++;
    d.m.visible = true;
    return d;
  }
  /** Đặt một vùng: (x, y) logic px là gốc, ang hướng, r bán kính hoặc chiều dài (px). */
  function put(shape: Shape, x: number, y: number, ang: number, r: number, k: number, o: any = {}) {
    const d = take(),
      R = r / TS;
    d.m.position.set(x / TS, 0.035 + n * 0.002, y / TS);
    d.m.rotation.y = -ang;
    d.m.scale.set(R, 1, R);
    d.u.uShape.value = SH[shape];
    d.u.uR.value = R;
    d.u.uP.value = o.p ?? k;
    d.u.uHalf.value = o.half ?? 0.5;
    d.u.uK.value = k;
    d.u.uFlash.value = o.flash ?? (k >= FEEL.telegraph.flashAt && Math.sin(o.time * 42) > -0.2 ? 1 : 0);
    d.u.uT.value = o.time ?? 0;
    d.u.uEdge.value = o.edge ?? 0.09;
    (d.u.uC.value as THREE.Color).copy(o.col ?? RED);
    return d;
  }

  // Sóng xung kích: vòng sáng trên sàn và vách thấp phát sáng (cần nhảy qua).
  const wallGeo = new THREE.CylinderGeometry(1, 1, 0.45, 64, 1, true).translate(0, 0.22, 0);
  const walls: { m: THREE.Mesh; mat: THREE.ShaderMaterial }[] = [];
  let wn = 0;
  function wave(w: any, time: number) {
    const c = new THREE.Color(EL[w.el]?.c ?? "#ffb070"),
      a = Math.max(0, 1 - w.r / w.max);
    put("ring", w.x, w.y, 0, w.r, 1, { half: 0.12, col: c, flash: 0, time });
    let s = walls[wn];
    if (!s) {
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uC: { value: new THREE.Color() }, uA: { value: 1 } },
        vertexShader: `varying float vY; void main(){ vY = position.y / 0.45; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uC; uniform float uA; varying float vY; void main(){ gl_FragColor = vec4(mix(vec3(1.4), uC*1.5, vY), (1.0 - vY) * uA); }`,
      });
      const m = new THREE.Mesh(wallGeo, mat);
      m.frustumCulled = false;
      grp.add(m);
      s = { m, mat };
      walls.push(s);
    }
    wn++;
    s.m.visible = true;
    s.m.position.set(w.x / TS, 0, w.y / TS);
    const R = w.r / TS;
    s.m.scale.set(R, 1, R);
    s.mat.uniforms.uC.value.copy(c);
    s.mat.uniforms.uA.value = 0.35 + a * 0.6;
  }

  function sync(G: any) {
    n = wn = 0;
    const time = G.time,
      p = G.p;
    for (const e of G.enemies) {
      if (e.dead) continue;
      const tl = e.tele;
      if (!tl) continue;
      if (e.isBoss) {
        if (e.state !== "wind") continue;
        const k = Math.min(1, e.t / tl.dur);
        if (tl.kind === "line") put("rect", e.x, e.y, tl.ang, tl.len, k, { half: 46 / TS, time });
        else if (tl.kind === "fan")
          put("fan", e.x, e.y - 24, tl.ang, 480, k, { p: (60 + 420 * k) / 480, half: 0.6, time });
        else if (tl.kind === "rain") for (const r of e.rain ?? []) put("circle", r.x, r.y, 0, 66, k, { time });
        else if (tl.kind === "summon") {
          const fl = k >= FEEL.telegraph.flashAt && Math.sin(time * 42) > -0.2;
          put("ring", e.x, e.y, 0, 60 + k * 60, k, {
            half: 0.1,
            col: fl ? new THREE.Color(1, 1, 1) : new THREE.Color(EL.bolt.c),
            flash: 0,
            time,
          });
        }
        continue;
      }
      const k = Math.min(1, tl.t / tl.dur);
      if (tl.kind === "circle") put("circle", tl.x, tl.y, 0, tl.r, k, { time });
      else if (tl.kind === "hop") put("circle", tl.tx, tl.ty, 0, tl.r, k, { time });
      else if (tl.kind === "arc") put("fan", tl.x, tl.y, tl.ang, tl.r, k, { half: tl.arc, time });
      else if (tl.kind === "proj") {
        const dx = p.x - e.x,
          dy = p.y - e.y;
        put("dash", e.x, e.y, Math.atan2(dy, dx), Math.hypot(dx, dy), k, { half: 0.07, time, edge: 0.07 });
      }
    }
    for (const w of G.waves ?? []) wave(w, time);
    // Vùng phép (lốc xoáy, bão tuyết...): nền mờ và viền theo màu nguyên tố, vòng trong xoay, để thấy tầm gây sát thương.
    for (const f of G.fields ?? []) {
      const col = new THREE.Color(EL[f.el]?.c ?? "#ffffff");
      put("circle", f.x, f.y, 0, f.r, 0.4, { p: 0, col, flash: 0, time });
      put("ring", f.x, f.y, 0, f.r * (0.55 + 0.1 * Math.sin(time * 3)), 1, { half: 0.06, col, flash: 0, time });
    }
    for (let i = n; i < pool.length; i++) pool[i].m.visible = false;
    for (let i = wn; i < walls.length; i++) walls[i].m.visible = false;
  }
  function dispose() {
    grp.removeFromParent();
    geo.dispose();
    wallGeo.dispose();
    for (const d of pool) (d.m.material as THREE.Material).dispose();
    for (const w of walls) w.mat.dispose();
  }
  function clear() {
    for (const d of pool) d.m.visible = false;
    for (const w of walls) w.m.visible = false;
  }
  return { sync, clear, dispose, count: () => n };
}
