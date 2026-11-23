/**
 * Renderer 3D toon (Three.js 0.170, MIT): địa hình mượt, cel-shading có viền, nhân vật VRM, camera xoay quanh nhân vật.
 * Chỉ đọc GS, không ghi logic. Kiến trúc và ngân sách hiệu năng: docs/art/renderer-3d.md.
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
import { EL } from "../data/content";
import type { WeaponType } from "../data/models-schema";
import { drawChibi } from "../art/chibi";
import { cur } from "../entities/party";
import { Server } from "../server/server";
import { TS } from "../world/map";
import { CanvasSprite } from "./actors3d";
import { getRenderable, renderObjects } from "./renderables";
import type { WorldRenderer } from "./select";
import { MODELS, VrmActor } from "./toon/actor";
import { FADE, fadeOccluder, toonMat } from "./toon/mat";
import { animateMonster, buildMonster, type MonsterView } from "./toon/monsters";
import { buildSky } from "./toon/sky";
import { createS23Layer } from "./toon/s23";
import { LV, buildGrass, buildHeight, buildProps, buildTerrain, buildWater, type HeightField } from "./toon/terrain";

/** Thiết lập theo mức đồ họa. */
export const QUALITY3D = {
  low: {
    scale: 0.7,
    shadows: false,
    shadowMap: 0,
    soft: false,
    bloom: false,
    dof: false,
    lights: 2,
    grass: 0,
    R: 2,
    msaa: 0,
  },
  medium: {
    scale: 0.85,
    shadows: true,
    shadowMap: 1024,
    soft: false,
    bloom: true,
    dof: false,
    lights: 4,
    grass: 2,
    R: 2,
    msaa: 0,
  },
  high: {
    scale: 1,
    shadows: true,
    shadowMap: 2048,
    soft: true,
    bloom: true,
    dof: true,
    lights: 8,
    grass: 4,
    R: 3,
    msaa: 4,
  },
} as const;

const FOV = 40;

/** Khung giờ: 0 nửa đêm, 0,25 bình minh, 0,5 trưa, 0,75 hoàng hôn. */
const TOD_KEYS: [number, number, number, number, number, number][] = [
  // t, trời đỉnh, chân trời, cường độ nắng, màu nắng, môi trường (x100)
  [0, 0x0a1033, 0x23305e, 0.35, 0x9fb4ff, 42],
  [0.22, 0x1e2456, 0x6a5a8e, 0.4, 0xa8b0ff, 46],
  [0.28, 0x5a7fd0, 0xffc29a, 1.3, 0xffc890, 60],
  [0.5, 0x3d8fe6, 0xd2ecff, 2.4, 0xfff0d6, 78],
  [0.72, 0x5a6fc0, 0xffa878, 1.5, 0xffb070, 62],
  [0.8, 0x1e2456, 0x6a5a8e, 0.45, 0xa8b0ff, 46],
  [1, 0x0a1033, 0x23305e, 0.35, 0x9fb4ff, 42],
];
function lerpTod(t: number) {
  let i = 0;
  while (i < TOD_KEYS.length - 2 && t > TOD_KEYS[i + 1][0]) i++;
  const a = TOD_KEYS[i],
    b = TOD_KEYS[i + 1],
    k = (t - a[0]) / (b[0] - a[0] || 1);
  const C = (x: number, y: number) => new THREE.Color(x).lerp(new THREE.Color(y), k);
  const night = t < 0.24 || t > 0.79 ? 1 : t < 0.28 ? (0.28 - t) / 0.04 : t > 0.75 ? (t - 0.75) / 0.04 : 0;
  return {
    top: C(a[1], b[1]),
    hor: C(a[2], b[2]),
    sun: a[3] + (b[3] - a[3]) * k,
    sunCol: C(a[4], b[4]),
    amb: (a[5] + (b[5] - a[5]) * k) / 100,
    night,
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
  uniforms: { tDiffuse: { value: null }, amount: { value: 1.2 }, res: { value: new THREE.Vector2(1, 1) } },
  vertexShader:
    "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
  fragmentShader: `uniform sampler2D tDiffuse; uniform float amount; uniform vec2 res; varying vec2 vUv;
    void main(){ float d = smoothstep(0.3, 0.55, abs(vUv.y-0.5)); vec4 c = vec4(0.0); float r = d*amount;
      for(int i=-2;i<=2;i++){ for(int j=-2;j<=2;j++){ c += texture2D(tDiffuse, vUv + vec2(float(i),float(j))*r/res); } }
      gl_FragColor = c/25.0; }`,
};

/** Clip theo trạng thái nhân vật (giữ nhịp đòn của logic: clip được co giãn vào khung thời gian của đòn). */
const ACT_WIN: Record<string, number> = { atk1: 0.5, atk2: 0.5, atk3: 0.62, skill: 0.75, burst: 1.3 };

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
    pointerEvents: "none",
    zIndex: "0",
  });
  host.parentElement!.insertBefore(cv, host);
  const gl = new THREE.WebGLRenderer({
    canvas: cv,
    antialias: true,
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
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.3, 220);
  // Bóng ngả tím lam: phần không có nắng chỉ nhận ánh trời/đất tím lam.
  const hemi = new THREE.HemisphereLight(0xcfe4ff, 0x6a5a9a, 0.9);
  const sun = new THREE.DirectionalLight(0xfff0d6, 2.4);
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.03;
  scene.add(hemi, sun, sun.target);
  scene.fog = new THREE.Fog(0xcfeaff, 30, 90);
  const sky = buildSky();
  scene.add(sky.mesh);
  const lights: THREE.PointLight[] = [];
  for (let i = 0; i < 8; i++) {
    const l = new THREE.PointLight(0xffffff, 0, 6, 2);
    lights.push(l);
    scene.add(l);
  }

  let composer: EffectComposer | null = null,
    tilt: ShaderPass | null = null;
  let world: THREE.Group | null = null,
    worldOf: any = null,
    miniOf: any = null,
    F: HeightField | null = null,
    water: ReturnType<typeof buildWater> | null = null,
    grass: ReturnType<typeof buildGrass> | null = null,
    chests: THREE.Object3D[] = [],
    lods: { x: number; z: number; ol: THREE.Object3D[] }[] = [],
    lamps: { x: number; y: number; z: number; c: number }[] = [];

  // Nhân vật đang điều khiển (VRM).
  let heroKey = "",
    hero: VrmActor | null = null,
    heroFallback: CanvasSprite | null = null,
    heroYaw = Math.PI;
  const blob = new THREE.Mesh(
    new THREE.CircleGeometry(0.34, 16),
    new THREE.MeshBasicMaterial({ color: 0x2a1f48, transparent: true, opacity: 0.35, depthWrite: false }),
  );
  blob.rotation.x = -Math.PI / 2;
  scene.add(blob);
  const fxGroup = new THREE.Group();
  scene.add(fxGroup);

  // Vệt kiếm: dải nối các vị trí mũi vũ khí gần nhất.
  const TRAIL = 14;
  const trailPos = new Float32Array(TRAIL * 2 * 3);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
  const trailA = new Float32Array(TRAIL * 2);
  trailGeo.setAttribute("a", new THREE.BufferAttribute(trailA, 1));
  const ti: number[] = [];
  for (let i = 0; i < TRAIL - 1; i++) ti.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  trailGeo.setIndex(ti);
  const trailMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uC: { value: new THREE.Color(0xffffff) } },
    vertexShader:
      "attribute float a; varying float vA; void main(){ vA=a; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
    fragmentShader: "uniform vec3 uC; varying float vA; void main(){ gl_FragColor=vec4(uC*vA, vA); }",
  });
  const trail = new THREE.Mesh(trailGeo, trailMat);
  trail.frustumCulled = false;
  scene.add(trail);
  const tipHist: THREE.Vector3[] = [],
    baseHist: THREE.Vector3[] = [];

  // Quái: mô hình toon tạm. Vật thể câu đố: renderable (bản 2D dựng thành tấm phẳng nếu chưa có bản 3D).
  const monsters = new Map<any, MonsterView>();
  const renderables = new Map<any, { o: any; auto?: CanvasSprite }>();
  const s23 = createS23Layer(scene);

  // Hạt nguyên tố.
  const MAXP = 700;
  const parts = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(0.06, 0),
    new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false, transparent: true, opacity: 0.7, depthWrite: false }),
    MAXP,
  );
  parts.frustumCulled = false;
  fadeOccluder(parts.material as THREE.Material);
  scene.add(parts);
  // Vật rơi (xu, sách, mảnh nguyên tố, cầu năng lượng).
  const PICK_G: Record<string, THREE.BufferGeometry> = {
    coin: new THREE.CylinderGeometry(0.13, 0.13, 0.04, 14).rotateX(Math.PI / 2),
    book: new THREE.BoxGeometry(0.3, 0.08, 0.22),
    shard: new THREE.OctahedronGeometry(0.15, 0),
    orb: new THREE.SphereGeometry(0.1, 10, 8),
  };
  const pickPool: THREE.Mesh[] = [];
  const ringPool: THREE.Mesh[] = [],
    arrowPool: THREE.Object3D[] = [],
    orbPool: THREE.Mesh[] = [];

  function setupPost() {
    composer?.dispose();
    composer = null;
    tilt = null;
    if (!Q.bloom && !Q.dof) return;
    // Đích vẽ 8 bit: giá trị HDR quá lớn (đèn sát mặt, NaN) không làm bloom loang trắng cả màn hình.
    const rt = new THREE.WebGLRenderTarget(4, 4, { samples: Q.msaa });
    composer = new EffectComposer(gl, rt);
    composer.addPass(new RenderPass(scene, camera));
    if (Q.bloom) composer.addPass(new UnrealBloomPass(new THREE.Vector2(256, 256), 0.22, 0.35, 0.93));
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
      c.left = c.bottom = -15;
      c.right = c.top = 15;
      c.near = 1;
      c.far = 70;
      c.updateProjectionMatrix();
    }
    blob.visible = !Q.shadows;
    dropWorld();
    hero?.dispose();
    hero = null;
    heroFallback?.obj.removeFromParent();
    heroFallback?.dispose();
    heroFallback = null;
    heroKey = "";
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

  function dropWorld() {
    for (const o of [world, water?.mesh, grass?.mesh]) {
      o?.removeFromParent();
      o?.traverse((x: any) => {
        x.geometry?.dispose();
        for (const m of [x.material].flat()) m?.dispose?.();
      });
    }
    world = null;
    worldOf = null;
    water = null;
    grass = null;
  }

  function syncWorld() {
    const W = GS.G.map;
    // openDoor (bí cảnh) sửa lưới tại chỗ và tạo lại W.mini: dựng lại cảnh khi thấy đổi.
    if (worldOf === W && miniOf === W.mini) return;
    dropWorld();
    F = buildHeight(W, Q.R);
    world = new THREE.Group();
    world.add(buildTerrain(W, F, Q.shadows, Q.soft));
    const P = buildProps(W, F, Q.shadows, (i) => Server.P.chests.includes(i));
    world.add(P.grp);
    P.grp.traverse((o: any) => o.isMesh && [o.material].flat().forEach(fadeOccluder));
    chests = P.chests;
    lamps = P.lamps;
    lods = P.lods;
    scene.add(world);
    water = buildWater(F);
    scene.add(water.mesh);
    if (Q.grass) {
      grass = buildGrass(W, F, Q.grass);
      scene.add(grass.mesh);
    }
    worldOf = W;
    miniOf = W.mini;
  }

  /** Độ cao mặt đất hiển thị (mượt) tại điểm logic, không thấp hơn mặt đất logic (bệ, cầu cao). */
  const groundY = (x: number, y: number, gPx: number) => Math.max(F ? F.at(x / TS, y / TS) : 0, gPx / TS);
  const v3 = new THREE.Vector3();
  const toV = (x: number, y: number, zPx = 0) => v3.set(x / TS, zPx / TS, y / TS);

  function heroClip(p: any, m: any): { k: string; once?: boolean; speed?: number; fade?: number } {
    const T = GS.G.time,
      w = (m.c.w as WeaponType) ?? "sword",
      A = MODELS.hoatAnh[w] ?? MODELS.hoatAnh.sword;
    if (!m.alive) return { k: "die", once: true, fade: 0.2 };
    const a = p.act;
    if (a && ACT_WIN[a.k]) {
      const win = ACT_WIN[a.k] / (a.k.startsWith("atk") ? A.speed : 1);
      if (T - a.t0 < win) {
        const k = a.k.startsWith("atk") ? A.atk[+a.k.slice(3) - 1] : a.k === "skill" ? A.skill : A.burst;
        const d = hero!.duration(k);
        return { k: `${k}#${a.t0}`, once: true, speed: d / win, fade: 0.08 };
      }
    }
    if (p.hurt > 0) return { k: "hurt", once: true, fade: 0.06 };
    if (p.dashT > 0) return { k: "dash", once: true, speed: 1.3, fade: 0.06 };
    if (p.air) {
      p._landT = T;
      return p.vz > 0 ? { k: "jumpUp", once: true, fade: 0.08 } : { k: "jumpAir", fade: 0.2 };
    }
    if (p._landT !== undefined && T - p._landT < 0.22) return { k: "jumpLand", once: true, speed: 1.4, fade: 0.06 };
    if (p.moving) {
      const sprint = GS.holdDash && p.dashHeld > 0.25 && p.stamina > 0;
      return sprint ? { k: "sprint", fade: 0.2 } : { k: "run", fade: 0.18, speed: p.atkAnim > 0 ? 0.6 : 1 };
    }
    return { k: A.stand, fade: 0.25 };
  }

  let lastT = 0;
  const camTarget = new THREE.Vector3();
  let camInit = false;
  const fv = new THREE.Vector3(),
    fsz = new THREE.Vector2();
  /** Cập nhật vị trí làm mờ vật cản theo nhân vật đang điều khiển. */
  function updateFade() {
    const p = GS.G?.p;
    if (!p || !GS.G.map) return void (FADE.uFadeR.value = 0);
    gl.getDrawingBufferSize(fsz);
    const el = lift(p),
      gy = groundY(p.x, p.y, el.g) + el.air / TS;
    fv.set(p.x / TS, gy + 0.8, p.y / TS).project(camera);
    const sx = (fv.x * 0.5 + 0.5) * fsz.x,
      sy = (fv.y * 0.5 + 0.5) * fsz.y,
      z = fv.z * 0.5 + 0.5;
    fv.set(p.x / TS, gy + 1.7, p.y / TS).project(camera);
    const hy = (fv.y * 0.5 + 0.5) * fsz.y;
    FADE.uFadeS.value.set(sx, sy);
    FADE.uFadeZ.value = z;
    FADE.uFadeR.value = Math.max(40, Math.abs(hy - sy) * 2.2);
  }

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
    const L = lift(p);
    const pg = groundY(p.x, p.y, L.g);
    const pos = new THREE.Vector3(p.x / TS, pg + L.air / TS, p.y / TS);

    // Camera: phía sau và trên nhân vật, theo sát; kéo để xoay, chụm/lăn để zoom; tránh xuyên vách.
    const want = new THREE.Vector3(pos.x, pg + 1.0, pos.z);
    if (!camInit) camTarget.copy(want);
    camInit = true;
    camTarget.lerp(want, 1 - Math.exp(-dt * 10));
    const yaw = GS.camYaw ?? 0,
      pitch = Math.min(1.2, Math.max(0.2, GS.camPitch ?? 0.62));
    let dist = Math.min(24, Math.max(5, GS.camDist ?? 13));
    const dir = new THREE.Vector3(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
    if (F)
      for (let s = 1; s <= 24; s++) {
        const d = (dist * s) / 24,
          q = camTarget.clone().addScaledVector(dir, d);
        if (F.at(q.x, q.z) + 0.35 > q.y) {
          dist = Math.max(2.5, d - 0.6);
          break;
        }
      }
    const shake = G.shake ? (Math.random() - 0.5) * G.shake * 0.02 : 0;
    camera.position.copy(camTarget).addScaledVector(dir, dist);
    camera.position.x += shake;
    camera.lookAt(camTarget);
    sky.mesh.position.copy(camera.position);

    // Ngày đêm.
    const tod = lerpTod(timeOfDay());
    sky.mat.uniforms.uTop.value.copy(tod.top);
    sky.mat.uniforms.uHor.value.copy(tod.hor);
    sky.mat.uniforms.uNight.value = tod.night;
    sky.mat.uniforms.uT.value = t;
    sky.mat.uniforms.uCloud.value.setRGB(1, 1, 1).lerp(tod.sunCol, 0.35);
    sky.mat.uniforms.uShade.value.copy(tod.hor).lerp(new THREE.Color(0x8a8ac8), 0.5);
    const fog = scene.fog as THREE.Fog;
    fog.color.copy(tod.hor);
    // Sương xa: tính theo khoảng cách camera, có mức tối thiểu để khi zoom gần không bị mù trắng.
    fog.near = 14 + dist * 0.8;
    fog.far = 40 + dist * 1.8;
    if (camera.far !== fog.far + 12) {
      camera.far = fog.far + 12;
      camera.updateProjectionMatrix();
    }
    const sa = (timeOfDay() - 0.25) * Math.PI;
    sun.color.copy(tod.sunCol);
    sun.intensity = tod.sun;
    const night = tod.night > 0.5;
    // Ban đêm "nắng" là ánh trăng từ phía đối diện.
    const sx = night ? 8 : -Math.cos(sa) * 12,
      sy = night ? 14 : 6 + Math.sin(Math.max(0.15, Math.min(Math.PI - 0.15, sa))) * 14;
    sun.position.set(pos.x + sx, pos.y + sy, pos.z - 7);
    sun.target.position.copy(pos);
    hemi.intensity = tod.amb * 1.4;
    hemi.color.copy(tod.top).lerp(new THREE.Color(0xffffff), 0.55);
    hemi.groundColor.set(0x6a5a9a).multiplyScalar(0.6 + 0.4 * (1 - tod.night));
    gl.toneMappingExposure = 1;

    chests.forEach((c, i) => (c.visible = !Server.P.chests.includes(i)));
    const olR = (dist + 8) ** 2;
    for (const l of lods) {
      const v = (l.x - camTarget.x) ** 2 + (l.z - camTarget.z) ** 2 < olR;
      for (const o of l.ol) o.visible = v;
    }
    water?.tick(t, tod.hor);
    if (water) (water.mesh.material as THREE.ShaderMaterial).uniforms.uNight.value = tod.night;
    if (grass) {
      grass.update(pos.x, pos.z, t);
      grass.mat.uniforms.uLight.value
        .copy(tod.sunCol)
        .multiplyScalar(0.35 + tod.sun * 0.28)
        .lerp(new THREE.Color(0x7080c0), tod.night * 0.5);
    }

    // Nhân vật VRM.
    if (m) {
      const vk = Server.P.owned?.[m.c.id]?.vk,
        wid = vk ? (Server.P.weapons?.[vk]?.id ?? null) : null,
        key = `${m.c.id}:${m.c.w}:${wid}`;
      if (key !== heroKey) {
        heroKey = key;
        hero?.dispose();
        hero = null;
        heroFallback?.obj.removeFromParent();
        heroFallback?.dispose();
        heroFallback = null;
        tipHist.length = baseHist.length = 0;
        VrmActor.load(m.c.id, (m.c.w as WeaponType) ?? "sword", wid, (m.c as any).look).then((a) => {
          if (key !== heroKey) return a?.dispose();
          hero = a;
          if (a) scene.add(a.obj);
          else {
            // Không tải được VRM (mất mạng, file hỏng): vẽ chibi 2D lên tấm phẳng để nhân vật không biến mất.
            heroFallback = new CanvasSprite(80, 96, Q.shadows);
            scene.add(heroFallback.obj);
          }
        });
      }
    }
    if (hero && m) {
      const c = heroClip(p, m),
        name = c.k.split("#")[0];
      if (c.k !== hero.curName && (hero.curName.split("#")[0] !== name || c.k.includes("#"))) {
        hero.play(name, { once: c.once, fade: c.fade, speed: c.speed, restart: c.k.includes("#") });
        hero.curName = c.k;
      } else if (c.speed && !c.once) hero.play(name, { speed: c.speed });
      // Hướng xoay tự do 360°: theo hướng đánh khi ra đòn, theo hướng chạy khi di chuyển.
      const attacking = p.act && G.time - p.act.t0 < 0.6;
      let ty = heroYaw;
      if (attacking) ty = Math.atan2(Math.cos(p.ang), Math.sin(p.ang));
      else if (p.moving || p.dashT > 0) ty = Math.atan2(p.dirX, p.dirY);
      let d = ty - heroYaw;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      heroYaw += d * Math.min(1, dt * (attacking ? 30 : 14));
      hero.obj.rotation.y = heroYaw;
      hero.obj.position.set(pos.x, pos.y + (hero.obj.userData.yOff ?? 0), pos.z);
      hero.obj.visible = !(p.iframes > 0 && p.hurt > 0 && Math.floor(t * 20) % 2);
      hero.update(dt);
      // Vệt vũ khí cận chiến khi ra đòn.
      const melee = m.c.w !== "bow" && m.c.w !== "cat";
      if (hero.weapon && melee && attacking) {
        const tip = new THREE.Vector3(0, 0.95, 0),
          base = new THREE.Vector3(0, 0.35, 0);
        hero.weapon.localToWorld(tip);
        hero.weapon.localToWorld(base);
        tipHist.unshift(tip);
        baseHist.unshift(base);
        if (tipHist.length > TRAIL) {
          tipHist.pop();
          baseHist.pop();
        }
        trailMat.uniforms.uC.value.set(EL[m.c.el]?.c2 ?? "#ffffff");
      } else if (tipHist.length) {
        tipHist.pop();
        baseHist.pop();
      }
      for (let i = 0; i < TRAIL; i++) {
        const a = tipHist[Math.min(i, tipHist.length - 1)],
          b = baseHist[Math.min(i, baseHist.length - 1)];
        if (a && b) {
          trailPos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
          const al = tipHist.length > 1 ? (1 - i / TRAIL) * 0.8 : 0;
          trailA[i * 2] = al;
          trailA[i * 2 + 1] = al * 0.2;
        } else trailA[i * 2] = trailA[i * 2 + 1] = 0;
      }
      trailGeo.attributes.position.needsUpdate = true;
      trailGeo.attributes.a.needsUpdate = true;
    }
    if (!hero && heroFallback && m) {
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
      heroFallback.obj.rotation.y = Math.atan2(camera.position.x - pos.x, camera.position.z - pos.z);
    }
    blob.position.set(pos.x, pg + 0.02, pos.z);
    blob.scale.setScalar(L.shadow);

    // Quái.
    const seen = new Set<any>();
    for (const e of G.enemies) {
      if (e.dead) continue;
      if (Math.abs(e.x - p.x) > 1100 || Math.abs(e.y - p.y) > 1100) continue;
      seen.add(e);
      let v = monsters.get(e);
      if (!v) {
        v = buildMonster(e);
        monsters.set(e, v);
        scene.add(v.obj);
      }
      const el = lift(e);
      v.obj.position.set(e.x / TS, groundY(e.x, e.y, el.g) + el.air / TS, e.y / TS);
      animateMonster(v, e, t, Math.atan2(p.x - e.x, p.y - e.y));
    }
    for (const [e, v] of monsters)
      if (!seen.has(e)) {
        v.obj.removeFromParent();
        v.obj.traverse((o: any) => o.geometry?.dispose());
        for (const mm of v.mats) mm.dispose();
        monsters.delete(e);
      }

    let ki = 0;
    for (const k of G.pickups) {
      const g = PICK_G[k.k];
      if (!g) continue;
      let o = pickPool[ki];
      if (!o) {
        o = new THREE.Mesh(g, toonMat());
        o.castShadow = true;
        pickPool.push(o);
        fxGroup.add(o);
      }
      ki++;
      o.geometry = g;
      o.visible = true;
      const mt = o.material as THREE.MeshToonMaterial,
        col = k.k === "coin" ? "#f0c060" : k.k === "book" ? "#9b6ff0" : k.k === "shard" ? EL[k.el].c : EL[k.el].c2;
      mt.color.set(col);
      mt.emissive.set(k.k === "shard" || k.k === "orb" ? col : "#000000");
      o.position.set(k.x / TS, groundY(k.x, k.y, 0) + 0.3 + Math.sin(t * 5 + k.x) * 0.05, k.y / TS);
      o.rotation.y = t * 2.5;
    }
    for (let i = ki; i < pickPool.length; i++) pickPool[i].visible = false;

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
      // Tấm phẳng tự sinh luôn quay về camera khi camera xoay.
      if (e.auto) e.o.rotation.y = Math.atan2(camera.position.x - e.o.position.x, camera.position.z - e.o.position.z);
    }
    for (const [o, e] of renderables)
      if (!live.has(o)) {
        e.o.removeFromParent();
        e.auto?.dispose();
        renderables.delete(o);
      }

    // Câu đố, NPC quest mini (S23): mô hình toon. Ký hiệu gợi ý và cửa bí cảnh vẫn chiếu 2D (core/render.ts).
    s23.sync(
      G.map,
      p,
      Server.P.puz,
      TS,
      (x, y) => groundY(x, y, 0),
      t,
      (x, y) => Math.abs(x - p.x) < 1100 && Math.abs(y - p.y) < 1100,
    );

    // Mũi tên, đạn phép, vòng, hạt; đèn điểm theo nguyên tố.
    const glow: { x: number; y: number; z: number; c: THREE.Color; i: number }[] = [];
    let ai = 0,
      oi = 0,
      ri = 0,
      pi = 0;
    const mm = new THREE.Matrix4(),
      cc = new THREE.Color();
    for (const pr of G.projs) {
      const y = groundY(pr.x, pr.y, 0) + 0.9 + Math.max(0, lift(pr).air) / TS;
      if (pr.kind === "arrow" || pr.kind === "earrow") {
        let a = arrowPool[ai];
        if (!a) {
          a = new THREE.Group();
          const shaft = new THREE.Mesh(
            new THREE.CylinderGeometry(0.015, 0.015, 0.6, 5).rotateZ(Math.PI / 2),
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
          );
          const head = new THREE.Mesh(
            new THREE.ConeGeometry(0.05, 0.16, 6).rotateZ(-Math.PI / 2).translate(0.36, 0, 0),
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
          );
          a.add(shaft, head);
          arrowPool.push(a);
          fxGroup.add(a);
        }
        ai++;
        a.visible = true;
        const col = pr.kind === "earrow" ? "#ffb0a0" : pr.el ? EL[pr.el].c2 : "#f3ead2";
        a.children.forEach((ch: any) => ch.material.color.set(col));
        a.position.set(pr.x / TS, y, pr.y / TS);
        a.rotation.set(0, -Math.atan2(pr.vy, pr.vx), 0);
        if (pr.el) {
          glow.push({ x: pr.x / TS, y, z: pr.y / TS, c: new THREE.Color(EL[pr.el].c), i: 1.2 });
          for (let j = 0; j < 3 && pi < MAXP; j++) {
            mm.makeScale(0.6, 0.6, 0.6).setPosition(
              (pr.x - pr.vx * 0.012 * j) / TS,
              y + Math.sin(t * 30 + j) * 0.03,
              (pr.y - pr.vy * 0.012 * j) / TS,
            );
            parts.setMatrixAt(pi, mm);
            parts.setColorAt(pi++, cc.set(EL[pr.el].c2));
          }
        }
      } else {
        let o = orbPool[oi];
        if (!o) {
          o = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13, 1), new THREE.MeshBasicMaterial({ color: 0xffffff }));
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
      const k = f.life / f.max,
        gy = groundY(f.x, f.y, 0);
      if (f.k === "dot")
        addP(
          f.x / TS,
          gy + 0.2 + (f.z ?? 0) / TS + (1 - k) * 0.4,
          f.y / TS,
          f.col,
          Math.min(1, Math.max(0.35, f.size * k * 0.3)),
        );
      else if (f.k === "pt") addP(f.x / TS, gy + 0.5 + (1 - k) * 0.5, f.y / TS, f.col ?? "#fff", 0.5 * k + 0.25);
      else if (f.k === "ring") {
        let r = ringPool[ri];
        if (!r) {
          r = new THREE.Mesh(
            new THREE.RingGeometry(0.88, 1, 40),
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
        r.position.set(f.x / TS, gy + 0.06, f.y / TS);
        const mat = r.material as THREE.MeshBasicMaterial;
        mat.color.set(f.col);
        mat.opacity = k;
        if (k > 0.5) glow.push({ x: f.x / TS, y: gy + 0.6, z: f.y / TS, c: new THREE.Color(f.col), i: 2 * k });
      } else if (f.k === "slash" || f.k === "arrowRain" || f.k === "meteor") {
        for (let j = 0; j < 8; j++)
          addP(
            f.x / TS + Math.sin(j * 2.1 + f.x) * 0.6 * (1 - k),
            gy + 0.5 + j * 0.1,
            f.y / TS + Math.cos(j * 1.7) * 0.4,
            f.col ?? "#fff",
            0.8,
          );
        glow.push({ x: f.x / TS, y: gy + 0.8, z: f.y / TS, c: new THREE.Color(f.col ?? "#fff"), i: 1.2 * k });
      } else if (f.k === "bolt") {
        for (let j = 0; j < 16; j++)
          addP(
            f.x / TS + Math.sin(j * 7.3 + (f.seed ?? 0)) * 0.2,
            gy + j * 0.4,
            f.y / TS,
            j % 3 ? f.col : "#ffffff",
            1.2,
          );
        glow.push({ x: f.x / TS, y: gy + 1.5, z: f.y / TS, c: new THREE.Color(f.col), i: 4 * k });
      }
    }
    // Tuyết xoáy quanh chân khi dùng nộ hoặc kỹ năng Băng.
    const inBurst = p.act?.k === "burst" && G.time - p.act.t0 < 1.3;
    if (m && (inBurst || (p.act?.k === "skill" && G.time - p.act.t0 < 0.7))) {
      const elc = EL[m.c.el];
      for (let j = 0; j < (inBurst ? 32 : 14); j++) {
        const a = j * 2.4 + t * (inBurst ? 4 : 2),
          r = 0.9 + ((j * 37) % 10) / 6,
          hy = ((j * 13 + t * 60) % 30) / 14;
        addP(
          pos.x + Math.cos(a) * r,
          pos.y + hy,
          pos.z + Math.sin(a) * r,
          j % 4 ? elc.c2 : "#ffffff",
          0.45 + (j % 3) * 0.12,
        );
      }
      glow.push({ x: pos.x, y: pos.y + 2.6, z: pos.z, c: new THREE.Color(elc.c), i: inBurst ? 1.4 : 0.8 });
    }
    for (const fl of G.fields)
      glow.push({
        x: fl.x / TS,
        y: groundY(fl.x, fl.y, 0) + 0.4,
        z: fl.y / TS,
        c: new THREE.Color(EL[fl.el].c),
        i: 1.5,
      });
    parts.count = pi;
    parts.instanceMatrix.needsUpdate = true;
    if (parts.instanceColor) parts.instanceColor.needsUpdate = true;
    for (let i = ri; i < ringPool.length; i++) ringPool[i].visible = false;
    if (night) {
      for (const l of lamps) glow.push({ x: l.x, y: l.y, z: l.z, c: new THREE.Color(l.c), i: 1.4 });
      if (m) glow.push({ x: pos.x, y: pos.y + 1.8, z: pos.z + 0.6, c: new THREE.Color(EL[m.c.el].c), i: 0.35 });
    }
    glow.sort((a, b) => (a.x - pos.x) ** 2 + (a.z - pos.z) ** 2 - ((b.x - pos.x) ** 2 + (b.z - pos.z) ** 2));
    lights.forEach((l, i) => {
      const g = i < Q.lights ? glow[i] : undefined;
      l.intensity = g ? g.i * 1.2 : 0;
      if (g) {
        // Giữ đèn cách mặt đất: đèn sát bề mặt làm độ sáng vọt lên vô hạn và bloom loang trắng.
        l.position.set(g.x, Math.max(g.y, (F ? F.at(g.x, g.z) : 0) + 1.1), g.z);
        l.color.copy(g.c);
      }
    });

    updateFade();
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
      const g = F ? F.at(x / TS, y / TS) : 0;
      // zPx: độ cao tính từ mặt đất hiển thị (px thế giới).
      const v = new THREE.Vector3(x / TS, g + zPx / TS, y / TS).project(camera);
      return { x: (v.x * 0.5 + 0.5) * GS.VW, y: (-v.y * 0.5 + 0.5) * GS.VH, vis: v.z < 1 };
    },
    unproject(sx, sy) {
      ray.setFromCamera(new THREE.Vector2((sx / GS.VW) * 2 - 1, -(sy / GS.VH) * 2 + 1), camera);
      const p = GS.G.p;
      // Chuột chỉ vào thân quái thì nhắm quái đó (giống tự ngắm), không phải mặt đất phía sau.
      let best: any = null,
        bd = 1e9;
      for (const e of GS.G.enemies) {
        if (e.dead) continue;
        const el = lift(e),
          c = new THREE.Vector3(e.x / TS, groundY(e.x, e.y, el.g) + el.air / TS + (e.isBoss ? 1 : 0.45), e.y / TS),
          r = (e.r ?? 14) / TS + 0.25;
        if (ray.ray.distanceSqToPoint(c) > r * r) continue;
        const d = c.distanceTo(ray.ray.origin);
        if (d < bd) {
          bd = d;
          best = e;
        }
      }
      if (best) return { x: best.x, y: best.y - (best.isBoss ? 20 : 10) };
      plane.constant = -groundY(p.x, p.y, lift(p).g);
      return ray.ray.intersectPlane(plane, hit) ? { x: hit.x * TS, y: hit.z * TS } : { x: p.x, y: p.y };
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
    /** Gỡ lỗi và đo: số tam giác theo nhóm, vật thể nhân vật. */
    debug() {
      const by: Record<string, number> = {};
      scene.traverseVisible((o: any) => {
        if (!o.isMesh || !o.geometry) return;
        const g = o.geometry,
          n = (g.index ? g.index.count : g.attributes.position.count) / 3,
          k = o.isInstancedMesh ? o.count : 1,
          key =
            o.parent === scene
              ? o.type
              : (o.parent?.parent === scene ? "grp" : o.parent?.parent?.type) + ":" + (o.material?.type ?? "");
        by[key] = (by[key] ?? 0) + n * k;
      });
      return { by, hero, scene };
    },
  } as WorldRenderer;
}
