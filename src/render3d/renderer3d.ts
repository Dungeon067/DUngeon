/**
 * Renderer 3D (Three.js 0.170, MIT): cảnh 3D với sprite pixel. Chỉ đọc GS, không ghi logic.
 * Kiến trúc và ngân sách hiệu năng: docs/art/renderer-3d.md.
 */
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { GS } from "../core/state";
import { settings, type Quality } from "../core/settings";
import { lift } from "../core/render-z";
import { drawChibi } from "../art/chibi";
import { drawBoss, drawEnemy } from "../art/enemy";
import { EL } from "../data/content";
import { cur } from "../entities/party";
import { Server } from "../server/server";
import { groundAt } from "../world/collision";
import { TS } from "../world/map";
import { CanvasSprite, SheetSprite, loadSheet, setStretch, STRETCH, type Sheet } from "./actors3d";
import { getRenderable, renderObjects } from "./renderables";
import type { WorldRenderer } from "./select";
import { LV, buildProps, buildTerrain, buildWater, makeAtlas } from "./world3d";

/** Thiết lập theo mức đồ họa. */
export const QUALITY3D = {
  low: { scale: 0.5, shadows: false, shadowMap: 0, soft: false, bloom: false, dof: false, lights: 2 },
  medium: { scale: 0.75, shadows: true, shadowMap: 1024, soft: false, bloom: true, dof: false, lights: 4 },
  high: { scale: 1, shadows: true, shadowMap: 2048, soft: true, bloom: true, dof: true, lights: 8 },
} as const;

const PITCH = (42 * Math.PI) / 180,
  FOV = 30;

/** Khung giờ: 0 nửa đêm, 0,25 bình minh, 0,5 trưa, 0,75 hoàng hôn. */
const TOD_KEYS: [number, number, number, number, number][] = [
  // t, màu trời, cường độ mặt trời, màu nắng, độ sáng môi trường (x100)
  [0, 0x0b1230, 0.25, 0x8fa8ff, 28],
  [0.22, 0x2a2850, 0.35, 0x9fb0ff, 34],
  [0.28, 0xf0a070, 1.0, 0xffb27a, 50],
  [0.5, 0x8ccfff, 1.7, 0xfff2d8, 70],
  [0.72, 0xf09060, 1.1, 0xffa060, 50],
  [0.8, 0x2a2850, 0.4, 0x9fb0ff, 34],
  [1, 0x0b1230, 0.25, 0x8fa8ff, 28],
];

function lerpTod(t: number) {
  let i = 0;
  while (i < TOD_KEYS.length - 2 && t > TOD_KEYS[i + 1][0]) i++;
  const a = TOD_KEYS[i],
    b = TOD_KEYS[i + 1],
    k = (t - a[0]) / (b[0] - a[0] || 1);
  const ca = new THREE.Color(a[1]).lerp(new THREE.Color(b[1]), k),
    sa = new THREE.Color(a[3]).lerp(new THREE.Color(b[3]), k);
  return {
    sky: ca,
    sun: a[2] + (b[2] - a[2]) * k,
    sunCol: sa,
    amb: (a[4] + (b[4] - a[4]) * k) / 100,
    night: t < 0.25 || t > 0.78,
  };
}

/** Giờ trong ngày: ?tod=0.5 hoặc GS.tod ép giờ; không thì một ngày = 8 phút chơi, bắt đầu buổi sáng. */
export function timeOfDay(): number {
  const g: any = GS;
  if (typeof g.tod === "number") return g.tod;
  const q = new URLSearchParams(location.search).get("tod");
  if (q !== null && !isNaN(+q)) return +q;
  return (0.35 + (GS.G?.time ?? 0) / 480) % 1;
}

const TiltShift = {
  uniforms: { tDiffuse: { value: null }, amount: { value: 1.6 }, res: { value: new THREE.Vector2(1, 1) } },
  vertexShader:
    "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
  fragmentShader: `uniform sampler2D tDiffuse; uniform float amount; uniform vec2 res; varying vec2 vUv;
    void main(){ float d = smoothstep(0.22, 0.5, abs(vUv.y-0.52)); vec4 c = vec4(0.0); float r = d*amount;
      for(int i=-2;i<=2;i++){ for(int j=-2;j<=2;j++){ c += texture2D(tDiffuse, vUv + vec2(float(i),float(j))*r/res); } }
      gl_FragColor = c/25.0; }`,
};

export function createRenderer3D(onLost: () => void): WorldRenderer {
  const host = document.getElementById("game")!;
  const cv = document.createElement("canvas");
  cv.id = "game3d";
  cv.setAttribute("aria-hidden", "true");
  Object.assign(cv.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    imageRendering: "pixelated",
    pointerEvents: "none",
    zIndex: "0",
  });
  host.parentElement!.insertBefore(cv, host);
  const gl = new THREE.WebGLRenderer({
    canvas: cv,
    antialias: false,
    powerPreference: "high-performance",
    stencil: false,
  });
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.info.autoReset = false;
  cv.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    onLost();
  });

  let Q: (typeof QUALITY3D)[Quality] = QUALITY3D[settings.quality];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.5, 120);
  setStretch(PITCH);
  const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x5a6a3a, 0.9);
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.02;
  scene.add(hemi, sun, sun.target);
  scene.fog = new THREE.Fog(0x8ccfff, 20, 60);
  const lights: THREE.PointLight[] = [];
  for (let i = 0; i < 8; i++) {
    const l = new THREE.PointLight(0xffffff, 0, 5, 1.6);
    lights.push(l);
    scene.add(l);
  }

  let composer: EffectComposer | null = null,
    tilt: ShaderPass | null = null,
    bloom: UnrealBloomPass | null = null;
  let world: THREE.Group | null = null,
    worldOf: any = null,
    chests: THREE.Mesh[] = [],
    lamps: { x: number; y: number; z: number; c: number }[] = [];
  const water = buildWater();
  scene.add(water.mesh);
  const atlas = makeAtlas();

  // Nhân vật đang điều khiển.
  let heroId = "",
    hero: SheetSprite | null = null,
    heroFallback: CanvasSprite | null = null;
  let heroSheet: Sheet | null = null;
  const blob = new THREE.Mesh(
    new THREE.CircleGeometry(0.32, 12),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false }),
  );
  blob.rotation.x = -Math.PI / 2;
  scene.add(blob);
  const fxGroup = new THREE.Group();
  scene.add(fxGroup);
  let swirl: THREE.Mesh | null = null;

  // Quái và vật thể câu đố: billboard vẽ lại từ hàm 2D (đường lui đến khi có sheet).
  const sprites = new Map<any, CanvasSprite>();
  const renderables = new Map<any, { o: any; auto?: CanvasSprite }>();

  // Hạt pixel 3D (dùng chung cho mọi hiệu ứng).
  const MAXP = 600;
  const parts = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.07, 0.07, 0.07),
    new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false }),
    MAXP,
  );
  parts.frustumCulled = false;
  scene.add(parts);
  const ringPool: THREE.Mesh[] = [];
  const arrowPool: THREE.Mesh[] = [];
  const orbPool: THREE.Mesh[] = [];

  function setupPost() {
    composer?.dispose();
    composer = null;
    tilt = null;
    bloom = null;
    if (!Q.bloom && !Q.dof) return;
    composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    if (Q.bloom) {
      bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.4, 0.35, 0.96);
      composer.addPass(bloom);
    }
    if (Q.dof) {
      tilt = new ShaderPass(TiltShift);
      composer.addPass(tilt);
    }
    composer.addPass(new OutputPass());
  }

  function applyQuality() {
    gl.shadowMap.enabled = Q.shadows;
    gl.shadowMap.type = Q.soft ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
    sun.castShadow = Q.shadows;
    if (Q.shadows) {
      sun.shadow.mapSize.set(Q.shadowMap, Q.shadowMap);
      sun.shadow.map?.dispose();
      (sun.shadow as any).map = null;
      const c = sun.shadow.camera;
      c.left = c.bottom = -16;
      c.right = c.top = 16;
      c.near = 1;
      c.far = 60;
      c.updateProjectionMatrix();
    }
    blob.visible = !Q.shadows;
    world?.removeFromParent();
    world = null;
    worldOf = null;
    hero?.dispose();
    hero = null;
    heroId = "";
    setupPost();
    resize();
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * Q.scale;
    gl.setPixelRatio(dpr);
    gl.setSize(GS.VW, GS.VH, false);
    camera.aspect = GS.VW / GS.VH;
    camera.updateProjectionMatrix();
    composer?.setPixelRatio(dpr);
    composer?.setSize(GS.VW, GS.VH);
    if (tilt) tilt.uniforms.res.value.set(GS.VW * dpr, GS.VH * dpr);
  }

  function syncWorld() {
    const W = GS.G.map;
    if (worldOf === W) return;
    world?.removeFromParent();
    world = new THREE.Group();
    world.add(buildTerrain(W, atlas, { shadows: Q.shadows }));
    const P = buildProps(W, { shadows: Q.shadows }, (i) => Server.P.chests.includes(i));
    world.add(P.grp);
    chests = P.chests;
    lamps = P.lamps;
    scene.add(world);
    worldOf = W;
  }

  const v3 = new THREE.Vector3();
  const toV = (x: number, y: number, zPx = 0) => v3.set(x / TS, zPx / TS, y / TS);

  function heroAnim(p: any, m: any, dt: number) {
    const T = GS.G.time;
    if (m && !m.alive) return ["die", T - (p._dieT ??= T)];
    p._dieT = undefined;
    const a = p.act,
      A = a && heroSheet?.json.anims[a.k];
    if (A) {
      const dur = A.ms.reduce((s: number, v: number) => s + v, 0) / 1000;
      if (T - a.t0 < dur) return [a.k, T - a.t0];
    }
    if (p.hurt > 0) return ["hurt", 0.25 - p.hurt];
    if (p.dashT > 0) return ["dash", 0.2 - p.dashT];
    if (p.air) {
      p._landT = T;
      return p.vz > 0 ? ["jumpUp", T - (p._airT ??= T)] : ["jumpAir", T];
    }
    p._airT = undefined;
    if (p._landT !== undefined && T - p._landT < 0.18) return ["jumpLand", T - p._landT];
    if (p.moving) return ["run", T];
    return ["idle", T];
  }

  let lastT = 0;
  function frame(t: number): boolean {
    if (gl.getContext().isContextLost()) return false;
    const dt = Math.min(0.05, t - lastT || 0.016);
    lastT = t;
    cv.style.display = "block";
    gl.info.reset();
    syncWorld();
    const G = GS.G,
      p = G.p,
      m = cur();
    // Camera theo cam logic (giữ độ rung màn hình).
    const shake = G.shake ? (Math.random() - 0.5) * G.shake * 0.02 : 0;
    const gy = groundAt(G.cam.x, G.cam.y + 20) * LV;
    const vis = GS.VH / GS.ZOOM / TS;
    const dist = (vis * 0.5) / Math.tan((FOV * Math.PI) / 360) / 1.05;
    const tx = G.cam.x / TS + shake,
      tz = (G.cam.y + 20) / TS;
    camera.position.set(
      tx + Math.sin(GS.camYaw) * Math.cos(PITCH) * dist,
      gy + Math.sin(PITCH) * dist,
      tz + Math.cos(GS.camYaw) * Math.cos(PITCH) * dist,
    );
    camera.lookAt(tx, gy, tz);
    (scene.fog as THREE.Fog).near = dist * 1.5;
    (scene.fog as THREE.Fog).far = dist * 3.4;
    if (tilt) tilt.uniforms.amount.value = 1.4;

    // Ngày đêm.
    const tod = lerpTod(timeOfDay());
    scene.background = tod.sky;
    (scene.fog as THREE.Fog).color.copy(tod.sky).lerp(new THREE.Color(0xffffff), tod.night ? 0 : 0.15);
    const sa = (timeOfDay() - 0.25) * Math.PI;
    sun.color.copy(tod.sunCol);
    sun.intensity = tod.sun;
    sun.position.set(tx - 8 + Math.cos(sa) * -6, gy + 14 + Math.sin(Math.max(0.2, sa)) * 6, tz - 6);
    sun.target.position.set(tx, gy, tz);
    hemi.intensity = tod.amb * 1.2;
    hemi.color.copy(tod.sky).lerp(new THREE.Color(0xffffff), 0.5);

    // Rương đã mở.
    chests.forEach((c, i) => (c.visible = !Server.P.chests.includes(i)));
    water.tick(t);

    // Nhân vật.
    if (m && m.c.id !== heroId) {
      heroId = m.c.id;
      hero?.obj.removeFromParent();
      hero = null;
      heroSheet = null;
      heroFallback?.obj.removeFromParent();
      heroFallback = null;
      const want = heroId;
      loadSheet(want).then((s) => {
        if (want !== heroId) return;
        if (s) {
          heroSheet = s;
          hero = new SheetSprite(s, Q.shadows);
          scene.add(hero.obj);
        } else {
          heroFallback = new CanvasSprite(80, 96, Q.shadows);
          scene.add(heroFallback.obj);
        }
      });
    }
    const L = lift(p);
    const pos = toV(p.x, p.y, L.z).clone();
    if (hero && m) {
      const [k, at] = heroAnim(p, m, dt) as [string, number];
      hero.show(k, p.face8 ?? 2, at);
      hero.obj.position.copy(pos);
      hero.obj.rotation.y = GS.camYaw;
      hero.mesh.visible = !(p.iframes > 0 && p.hurt > 0 && Math.floor(t * 20) % 2);
    } else if (heroFallback && m) {
      heroFallback.paint((c) =>
        drawChibi(c, m.c, 0, 0, 1.12, {
          fx: p.fx,
          back: p.back,
          walk: p.walk,
          moving: p.moving,
          atk: p.atkAnim,
          t,
          noShadow: true,
        }),
      );
      heroFallback.obj.position.copy(pos);
    }
    blob.position.set(pos.x, L.g / TS + 0.01, pos.z);
    blob.scale.setScalar(L.shadow);

    // Xoáy tuyết khi dùng nộ (sheet hiệu ứng của nhân vật).
    const inBurst = p.act?.k === "burst" && G.time - p.act.t0 < 0.9;
    if (heroSheet?.fx?.json.fx.swirl && inBurst) {
      if (!swirl) {
        const F = heroSheet.fx.json.fx.swirl,
          tex = heroSheet.fx.tex.clone();
        tex.needsUpdate = true;
        tex.repeat.set(F.w / tex.image.width, F.h / tex.image.height);
        swirl = new THREE.Mesh(
          new THREE.PlaneGeometry(F.w / 30, F.h / 30),
          new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }),
        );
        swirl.userData.F = F;
        scene.add(swirl);
      }
      const F = swirl.userData.F,
        fi = Math.floor(((G.time - p.act.t0) * 1000) / F.ms) % F.frames.length;
      const tex = (swirl.material as THREE.MeshBasicMaterial).map!;
      tex.offset.set(F.frames[fi][0] / tex.image.width, 1 - (F.frames[fi][1] + F.h) / tex.image.height);
      swirl.visible = true;
      swirl.position.set(pos.x, pos.y + 0.5, pos.z + 0.05);
      swirl.scale.y = STRETCH;
    } else if (swirl) swirl.visible = false;

    // Quái.
    const seen = new Set<any>();
    for (const e of G.enemies) {
      if (e.dead) continue;
      if (Math.abs(e.x - G.cam.x) > 900 || Math.abs(e.y - G.cam.y) > 700) continue;
      seen.add(e);
      let s = sprites.get(e);
      if (!s) {
        s = e.isBoss ? new CanvasSprite(260, 260, Q.shadows) : new CanvasSprite(96, 96, Q.shadows);
        sprites.set(e, s);
        scene.add(s.obj);
      }
      const el = lift(e);
      s.paint((c) => {
        c.translate(-e.x, -e.y);
        if (e.isBoss) drawBoss(c, e, t);
        else drawEnemy(c, e, t);
      });
      s.obj.position.copy(toV(e.x, e.y, el.z));
    }
    for (const [e, s] of sprites)
      if (!seen.has(e)) {
        s.obj.removeFromParent();
        s.dispose();
        sprites.delete(e);
      }

    // Vật thể câu đố (renderable).
    const live = new Set<any>();
    for (const r of renderObjects) {
      const def = getRenderable(r.kind);
      if (!def) continue;
      live.add(r.obj);
      let e = renderables.get(r.obj);
      if (!e) {
        if (def.build3d)
          e = { o: def.build3d({ THREE, toWorld: (x, y, zh = 0) => ({ x: x / TS, y: zh * LV, z: y / TS }) }, r.obj) };
        else {
          const sz = def.size ?? { w: 64, h: 64 },
            auto = new CanvasSprite(sz.w, sz.h, Q.shadows, false);
          e = { o: auto.obj, auto };
        }
        scene.add(e.o);
        renderables.set(r.obj, e);
      }
      if (e.auto) e.auto.paint((c) => def.draw2d(c, r.obj, t));
      else def.update3d?.(e.o, r.obj, t);
      e.o.position.copy(toV(r.obj.x, r.obj.y, (r.obj.zh ?? 0) * 22));
    }
    for (const [o, e] of renderables)
      if (!live.has(o)) {
        e.o.removeFromParent();
        e.auto?.dispose();
        renderables.delete(o);
      }

    // Đạn, mũi tên, vòng, hạt; đèn điểm theo nguyên tố.
    const glow: { x: number; y: number; z: number; c: THREE.Color; i: number }[] = [];
    let ai = 0,
      oi = 0,
      ri = 0,
      pi = 0;
    const mm = new THREE.Matrix4(),
      cc = new THREE.Color();
    const arrowTex = heroSheet?.fx?.tex;
    for (const pr of G.projs) {
      const y = 0.55 + lift(pr).z / TS;
      if (pr.kind === "arrow" || pr.kind === "earrow") {
        let a = arrowPool[ai];
        if (!a) {
          a = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.05), new THREE.MeshBasicMaterial({ color: 0xffffff }));
          arrowPool.push(a);
          fxGroup.add(a);
        }
        ai++;
        a.visible = true;
        const col = pr.kind === "earrow" ? "#ffb0a0" : pr.el ? EL[pr.el].c2 : "#f3ead2";
        (a.material as THREE.MeshBasicMaterial).color.set(col);
        a.position.set(pr.x / TS, y, pr.y / TS);
        a.rotation.set(0, -Math.atan2(pr.vy, pr.vx), 0);
        if (pr.el) glow.push({ x: pr.x / TS, y, z: pr.y / TS, c: new THREE.Color(EL[pr.el].c), i: 1.2 });
        void arrowTex;
      } else {
        let o = orbPool[oi];
        if (!o) {
          o = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12, 0), new THREE.MeshBasicMaterial({ color: 0xffffff }));
          orbPool.push(o);
          fxGroup.add(o);
        }
        oi++;
        o.visible = true;
        const el = EL[pr.el || "water"];
        (o.material as THREE.MeshBasicMaterial).color.set(el.c2);
        o.position.set(pr.x / TS, y, pr.y / TS);
        o.scale.setScalar(Math.max(0.6, pr.r / 8));
        glow.push({ x: pr.x / TS, y, z: pr.y / TS, c: new THREE.Color(el.c), i: 1.6 });
      }
    }
    for (let i = ai; i < arrowPool.length; i++) arrowPool[i].visible = false;
    for (let i = oi; i < orbPool.length; i++) orbPool[i].visible = false;
    const addP = (x: number, y: number, z: number, col: string, s: number) => {
      if (pi >= MAXP) return;
      mm.makeScale(s, s, s).setPosition(x, y, z);
      parts.setMatrixAt(pi, mm);
      parts.setColorAt(pi, cc.set(col));
      pi++;
    };
    for (const f of G.fx) {
      const k = f.life / f.max;
      if (f.k === "dot")
        addP(f.x / TS, 0.1 + (f.z ?? 0) / TS + (1 - k) * 0.3, f.y / TS, f.col, Math.max(0.4, f.size * k * 0.4));
      else if (f.k === "pt") addP(f.x / TS, 0.3 + (1 - k) * 0.4, f.y / TS, f.col ?? "#fff", 0.8 * k + 0.3);
      else if (f.k === "ring") {
        let r = ringPool[ri];
        if (!r) {
          r = new THREE.Mesh(
            new THREE.RingGeometry(0.9, 1, 24),
            new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              depthWrite: false,
              side: THREE.DoubleSide,
            }),
          );
          r.rotation.x = -Math.PI / 2;
          ringPool.push(r);
          fxGroup.add(r);
        }
        ri++;
        r.visible = true;
        const rad = (f.r * (1 - k * 0.7)) / TS;
        r.scale.set(rad, rad, 1);
        r.position.set(f.x / TS, groundAt(f.x, f.y) * LV + 0.05, f.y / TS);
        const mat = r.material as THREE.MeshBasicMaterial;
        mat.color.set(f.col);
        mat.opacity = k;
        if (k > 0.5) glow.push({ x: f.x / TS, y: 0.6, z: f.y / TS, c: new THREE.Color(f.col), i: 2 * k });
      } else if (f.k === "slash" || f.k === "arrowRain" || f.k === "meteor") {
        for (let j = 0; j < 6; j++)
          addP(
            f.x / TS + Math.sin(j * 2.1 + f.x) * 0.5 * (1 - k),
            0.4 + j * 0.08,
            f.y / TS + Math.cos(j * 1.7) * 0.3,
            f.col ?? "#fff",
            0.6,
          );
        glow.push({ x: f.x / TS, y: 0.6, z: f.y / TS, c: new THREE.Color(f.col ?? "#fff"), i: 1.2 * k });
      } else if (f.k === "bolt") {
        for (let j = 0; j < 14; j++)
          addP(f.x / TS + Math.sin(j * 7.3 + (f.seed ?? 0)) * 0.2, j * 0.35, f.y / TS, j % 3 ? f.col : "#ffffff", 1);
        glow.push({ x: f.x / TS, y: 1.2, z: f.y / TS, c: new THREE.Color(f.col), i: 4 * k });
      }
    }
    // Tuyết rơi quanh người chơi khi nộ hoặc kỹ năng Băng.
    if (inBurst || (p.act?.k === "skill" && G.time - p.act.t0 < 0.6 && m?.c.el === "ice"))
      for (let j = 0; j < 40; j++) {
        const a = j * 2.4 + t * 2,
          r = 0.4 + ((j * 37) % 10) / 8;
        addP(
          pos.x + Math.cos(a) * r,
          pos.y + ((j * 13 + t * 60) % 30) / 18,
          pos.z + Math.sin(a) * r * 0.7,
          j % 4 ? "#d8f6ff" : "#ffffff",
          0.7,
        );
      }
    for (const fl of G.fields)
      glow.push({ x: fl.x / TS, y: 0.4, z: fl.y / TS, c: new THREE.Color(EL[fl.el].c), i: 1.5 });
    parts.count = pi;
    parts.instanceMatrix.needsUpdate = true;
    if (parts.instanceColor) parts.instanceColor.needsUpdate = true;
    for (let i = ri; i < ringPool.length; i++) ringPool[i].visible = false;
    // Đèn: hiệu ứng gần nhất trước, ban đêm thêm đèn ở bia và cổng, và ánh nguyên tố quanh nhân vật.
    if (tod.night) {
      for (const l of lamps) glow.push({ x: l.x, y: l.y, z: l.z, c: new THREE.Color(l.c), i: 2.2 });
      if (m) glow.push({ x: pos.x, y: pos.y + 1.6, z: pos.z + 0.6, c: new THREE.Color(EL[m.c.el].c), i: 0.5 });
    }
    glow.sort((a, b) => (a.x - pos.x) ** 2 + (a.z - pos.z) ** 2 - ((b.x - pos.x) ** 2 + (b.z - pos.z) ** 2));
    lights.forEach((l, i) => {
      const g = i < Q.lights ? glow[i] : undefined;
      l.intensity = g ? g.i * 2.5 : 0;
      if (g) {
        l.position.set(g.x, g.y, g.z);
        l.color.copy(g.c);
      }
    });

    if (composer) composer.render();
    else gl.render(scene, camera);
    return true;
  }

  const ray = new THREE.Raycaster(),
    plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    hit = new THREE.Vector3();
  applyQuality();
  return {
    frame,
    project(x, y, zPx = 0) {
      const v = toV(x, y, zPx).project(camera);
      return { x: (v.x * 0.5 + 0.5) * GS.VW, y: (-v.y * 0.5 + 0.5) * GS.VH, vis: v.z < 1 };
    },
    unproject(sx, sy) {
      ray.setFromCamera(new THREE.Vector2((sx / GS.VW) * 2 - 1, -(sy / GS.VH) * 2 + 1), camera);
      plane.constant = -groundAt(GS.G.p.x, GS.G.p.y) * LV;
      return ray.ray.intersectPlane(plane, hit) ? { x: hit.x * TS, y: hit.z * TS } : { x: GS.G.p.x, y: GS.G.p.y };
    },
    setQuality(q) {
      Q = QUALITY3D[q];
      applyQuality();
    },
    resize,
    dispose() {
      composer?.dispose();
      gl.dispose();
      cv.remove();
    },
    stats() {
      return { calls: gl.info.render.calls, tris: gl.info.render.triangles, textures: gl.info.memory.textures };
    },
    hide() {
      cv.style.display = "none";
    },
  } as WorldRenderer;
}
