/**
 * S29: quái và boss dựng từ GLB (Blender, `tools/blender/monsters`), thay mô hình ghép bằng code.
 * Renderer gọi `buildMonster(e)` một lần mỗi quái, `animateMonster(...)` mỗi khung, `disposeMonster(v)` khi gỡ.
 * Geometry, texture và clip dùng chung theo loài; mỗi quái chỉ có uniform riêng (nguyên tố, chớp trúng đòn, tan bụi).
 * Trạng thái AI → clip: idle, patrol, chase, tele, attack, hurt, stun, dead (+ draw, cast; boss: fan, rain, charge, roar, summon).
 * Giữ nguyên logic AI: chỉ đọc `e.state`, `e.tele`, `e.stun`, `e.flash`, `e.walk`, `b.segs`/`b.ang`/`b.phase`.
 */
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { EL } from "../../data/content";
import { outlineMat } from "./mat";
import { monsterMat, monsterUniforms, type MonsterUniforms } from "./monsterKit";
import { driveSpine, resamplePath, spineBones } from "./monsterRig";

export const MONSTER_IDS = ["slime", "goblin", "archer", "shaman", "golem", "hacgiao"] as const;
export const MONSTER_CLIPS = ["idle", "patrol", "chase", "tele", "attack", "hurt", "stun", "dead"] as const;
export const EXTRA_CLIPS: Record<string, string[]> = {
  archer: ["draw"],
  shaman: ["cast"],
  hacgiao: ["fan", "rain", "charge", "roar", "summon"],
};
const ONCE = new Set(["tele", "attack", "hurt", "dead", "fan", "rain", "roar", "summon", "draw", "cast"]);
/** Tỉ lệ mô hình (mét Blender) so với bán kính logic `e.r / 16`. */
const SIZE: Record<string, number> = { slime: 1, goblin: 1.15, archer: 1.15, shaman: 1.1, golem: 0.95, hacgiao: 0.9 };
/** Đốt sống đầu tiên bám đường đi của logic; các đốt đuôi còn lại theo clip (quạt đuôi). */
const PATH_BONES = 14;
const LOD_FAR = 26,
  FULL_NEAR = 10;
const DEAD_DUR = 1.7,
  BOSS_DEAD_DUR = 2.6;

const base = (import.meta as any).env?.BASE_URL ?? "/";
const loader = new GLTFLoader();
interface Tpl {
  gltf: GLTF;
  clips: Map<string, THREE.AnimationClip>;
}
const tpls = new Map<string, Promise<Tpl | null>>();
const ready = new Map<string, Tpl | null>();

export const monsterUrl = (id: string) => `${base}media/models/monsters/${id}.glb`;
export const speciesOf = (e: any): string => (e.isBoss ? "hacgiao" : e.type);

export function loadMonster(id: string): Promise<Tpl | null> {
  let p = tpls.get(id);
  if (p) return p;
  const url = monsterUrl(id);
  p = loader
    .loadAsync(url)
    .then((gltf) => {
      const clips = new Map(gltf.animations.map((c) => [c.name, c]));
      const miss = [...MONSTER_CLIPS, ...(EXTRA_CLIPS[id] ?? [])].filter((c) => !clips.has(c));
      if (miss.length) console.error(`[quái 3D] ${url} thiếu clip: ${miss.join(", ")}`);
      return { gltf, clips };
    })
    .catch((err) => {
      console.error(`[quái 3D] Thiếu hoặc hỏng mô hình ${url} (loài "${id}"), quái này sẽ không hiện.`, err);
      return null;
    });
  p.then((t) => ready.set(id, t));
  tpls.set(id, p);
  return p;
}
export function preloadMonsters() {
  for (const id of MONSTER_IDS) void loadMonster(id);
}

export interface MonsterView {
  obj: THREE.Group;
  id: string;
  boss: boolean;
  /** GS.G lúc tạo: chỉ giữ hoạt ảnh chết khi vẫn ở cùng màn. */
  of: unknown;
  u: MonsterUniforms;
  mats: THREE.Material[];
  inner?: THREE.Object3D;
  mixer?: THREE.AnimationMixer;
  acts: Map<string, THREE.AnimationAction>;
  cur?: string;
  act?: THREE.AnimationAction;
  lock?: { name: string; t: number };
  lod0: THREE.Object3D[];
  lod1: THREE.Object3D[];
  far: boolean;
  acc: number;
  el?: string;
  phase: number;
  lastFlash: number;
  lastWalk: number;
  hadTele: boolean;
  deadT?: number;
  dust?: THREE.Points;
  spine?: THREE.Bone[];
  sp0?: THREE.Vector3;
  seg: number;
  path?: THREE.Vector3[];
}

export function buildMonster(e: any, of?: unknown): MonsterView {
  const id = speciesOf(e);
  const v: MonsterView = {
    obj: new THREE.Group(),
    id,
    boss: !!e.isBoss,
    of,
    u: monsterUniforms(),
    mats: [],
    acts: new Map(),
    lod0: [],
    lod1: [],
    far: false,
    acc: 0,
    phase: e.phase ?? 1,
    lastFlash: 0,
    lastWalk: e.walk ?? 0,
    hadTele: false,
    seg: 0.3,
  };
  v.obj.name = `monster:${id}`;
  void loadMonster(id);
  return v;
}

function attach(v: MonsterView, tpl: Tpl, e: any) {
  const o = SkeletonUtils.clone(tpl.gltf.scene);
  const cache = new Map<THREE.Material, THREE.Material>();
  const meshes: THREE.Mesh[] = [];
  o.traverse((m: any) => m.isMesh && meshes.push(m));
  const k = v.boss ? SIZE.hacgiao : (SIZE[v.id] ?? 1) * Math.max(0.5, (e.r ?? 16) / 16);
  for (const m of meshes) {
    const lod = /_lod\d/.test(m.name) || /_lod\d/.test(m.parent?.name ?? "");
    const src = m.material as THREE.MeshStandardMaterial;
    let mm = cache.get(src);
    if (!mm) {
      cache.set(src, (mm = monsterMat(src, v.u)));
      v.mats.push(mm);
    }
    m.material = mm;
    m.frustumCulled = false;
    m.castShadow = !lod;
    (lod ? v.lod1 : v.lod0).push(m);
    const part = mm.userData.part;
    if (!lod && part !== "jelly" && part !== "fin" && part !== "glow" && (m as any).isSkinnedMesh) {
      const sm = m as THREE.SkinnedMesh;
      const ol = new THREE.SkinnedMesh(sm.geometry, outlineMat(v.boss ? 0.012 : 0.008));
      ol.bind(sm.skeleton, sm.bindMatrix);
      ol.frustumCulled = false;
      ol.position.copy(sm.position);
      ol.quaternion.copy(sm.quaternion);
      ol.scale.copy(sm.scale);
      sm.parent!.add(ol);
      v.lod0.push(ol);
    }
  }
  for (const m of v.lod1) m.visible = false;
  o.scale.setScalar(k);
  v.mixer = new THREE.AnimationMixer(o);
  for (const [n, c] of tpl.clips) {
    const a = v.mixer.clipAction(c);
    if (ONCE.has(n)) {
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
    }
    v.acts.set(n, a);
  }
  if (v.boss) {
    v.u.uTintK.value = 0;
    v.spine = spineBones(o);
    o.updateMatrixWorld(true);
    if (v.spine.length > 1) {
      v.sp0 = v.spine[0].getWorldPosition(new THREE.Vector3());
      v.seg = v.sp0.distanceTo(v.spine[1].getWorldPosition(new THREE.Vector3()));
    }
  }
  v.inner = o;
  v.obj.add(o);
}

function play(v: MonsterView, name: string, ts = 1, fade = 0.14) {
  const a = v.acts.get(name) ?? v.acts.get(name === "draw" || name === "cast" ? "tele" : "idle");
  if (!a) return;
  if (v.cur === name && v.act === a) {
    a.setEffectiveTimeScale(ts);
    return;
  }
  a.reset().setEffectiveTimeScale(ts).setEffectiveWeight(1).fadeIn(fade).play();
  if (v.act && v.act !== a) v.act.fadeOut(fade);
  v.cur = name;
  v.act = a;
}
const dur = (v: MonsterView, n: string) => v.acts.get(n)?.getClip().duration ?? 0.5;

/** Chọn clip theo trạng thái AI; trả về [tên clip, tốc độ]. */
function choose(v: MonsterView, e: any, dt: number): [string, number] {
  if (e.dead) return ["dead", 1];
  const flash = e.flash ?? 0;
  const hit = flash > v.lastFlash + 0.02;
  v.lastFlash = flash;
  if (v.lock) {
    v.lock.t -= dt;
    if (v.lock.t <= 0) v.lock = undefined;
  }
  if (v.boss) {
    if (e.phase !== v.phase) {
      v.phase = e.phase;
      if (e.phase === 2) v.lock = { name: "roar", t: dur(v, "roar") };
    }
    if (v.lock?.name === "roar") return ["roar", 1];
    if (e.stun > 0 || e.frozen > 0) return ["stun", e.frozen > 0 ? 0.15 : 1];
    if (e.state === "wind" && e.tele) {
      const n = { fan: "fan", line: "tele", rain: "rain", summon: "summon" }[e.tele.kind as string] ?? "tele";
      return [n, dur(v, n) / Math.max(0.2, e.tele.dur)];
    }
    if (e.state === "charge") return ["charge", 1];
    if (hit && !v.lock) v.lock = { name: "hurt", t: dur(v, "hurt") };
    if (v.lock) return [v.lock.name, 1];
    return [e.phase === 2 ? "chase" : "patrol", 1];
  }
  if (e.frozen > 0) return [v.cur ?? "idle", 0];
  if (e.stun > 0) {
    v.hadTele = false;
    return ["stun", 1];
  }
  if (e.tele) {
    v.hadTele = true;
    v.lock = undefined;
    const n = e.type === "archer" ? "draw" : e.type === "shaman" ? "cast" : "tele";
    return [n, dur(v, v.acts.has(n) ? n : "tele") / Math.max(0.2, e.tele.dur)];
  }
  if (v.hadTele) {
    v.hadTele = false;
    v.lock = { name: "attack", t: dur(v, "attack") };
  } else if (hit && !v.lock) v.lock = { name: "hurt", t: dur(v, "hurt") };
  if (v.lock) return [v.lock.name, 1];
  const walk = e.walk ?? 0,
    moving = Math.abs(walk - v.lastWalk) > 1e-4;
  v.lastWalk = walk;
  if (!moving) return ["idle", 1];
  return e.state === "chase" || e.state === "return" ? ["chase", 1] : ["patrol", 1];
}

const _h = new THREE.Vector3(),
  _d = new THREE.Vector3(),
  _raw: THREE.Vector3[] = [],
  _pts: THREE.Vector3[] = [];
/** Thân Hắc Giao bám vệt đường đi thật của đầu (không co lại khi đứng yên), cổ quay theo `b.ang`. */
function bossBody(v: MonsterView, b: any, t: number, TS: number) {
  const o = v.inner!,
    sp = v.spine!,
    seg = v.seg;
  _h.set(b.x / TS, 0, b.y / TS);
  _d.set(Math.cos(b.ang ?? Math.PI / 2), 0, Math.sin(b.ang ?? Math.PI / 2));
  if (!v.path) {
    v.path = [];
    for (let i = 0; i < 80; i++) v.path.push(_h.clone().addScaledVector(_d, -i * seg * 0.5));
  }
  const P = v.path;
  if (P[0].distanceTo(_h) > seg * 0.25) P.unshift(_h.clone());
  else P[0].copy(_h);
  if (P.length > 120) P.length = 120;
  _raw.length = 0;
  _raw.push(_h.clone(), _h.clone().addScaledVector(_d, -seg * 1.3));
  for (const q of P) if (q.distanceTo(_h) > seg * 1.6) _raw.push(q);
  resamplePath(_raw, seg, PATH_BONES + 1, _pts);
  const wind = b.state === "wind" && b.tele ? Math.min(1, b.t / b.tele.dur) : 0,
    charge = b.state === "charge" ? 1 : 0,
    sink = v.deadT ? v.deadT * 2.4 : 0;
  for (let i = 0; i < _pts.length; i++) {
    const k = i / PATH_BONES;
    const head = 1.35 + wind * 0.7 - charge * 0.75 + Math.sin(t * 1.6) * 0.1;
    const body = 0.55 + Math.sin(t * 2.2 - i * 0.65) * 0.22 * (1 - charge * 0.5);
    _pts[i].y = THREE.MathUtils.lerp(head, body, THREE.MathUtils.smoothstep(k, 0, 0.45)) - sink;
  }
  o.position.copy(_pts[0]).sub(v.sp0!);
  o.updateMatrixWorld(true);
  driveSpine(sp.slice(0, PATH_BONES), _pts);
}

function startDust(v: MonsterView) {
  const box = new THREE.Box3().setFromObject(v.inner!);
  const n = v.boss ? 220 : 50,
    pos = new Float32Array(n * 3),
    sz = box.getSize(new THREE.Vector3());
  for (let i = 0; i < n; i++) {
    pos[i * 3] = box.min.x + Math.random() * sz.x;
    pos[i * 3 + 1] = box.min.y + Math.random() * sz.y;
    pos[i * 3 + 2] = box.min.z + Math.random() * sz.z;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const m = new THREE.PointsMaterial({
    color: v.u.uGlow.value.clone().lerp(new THREE.Color(1, 0.95, 0.8), 0.5),
    size: v.boss ? 0.16 : 0.08,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  v.dust = new THREE.Points(g, m);
  v.dust.frustumCulled = false;
  v.obj.parent?.add(v.dust);
}

/**
 * Mỗi khung: chọn clip, cập nhật mixer (thưa hơn khi xa hoặc ngoài `FULL_NEAR` quái gần nhất), LOD, nguyên tố, tan bụi.
 * `rank`: thứ tự gần camera (0 = gần nhất). Trả về false khi hoạt ảnh chết đã xong (renderer gỡ quái).
 */
export function animateMonster(
  v: MonsterView,
  e: any,
  t: number,
  yaw: number,
  dt: number,
  camDist: number,
  rank: number,
  TS = 40,
): boolean {
  const tpl = ready.get(v.id);
  if (!v.inner) {
    if (!tpl) return !e.dead;
    attach(v, tpl, e);
  }
  if (!v.boss) v.obj.rotation.y = yaw;
  const el = e.el ?? "water";
  if (v.el !== el) {
    v.el = el;
    const c = new THREE.Color(EL[el]?.c ?? "#ffffff");
    v.u.uTint.value.copy(c);
    v.u.uGlow.value.copy(new THREE.Color(EL[el]?.c2 ?? "#ffffff")).lerp(c, 0.5);
  }
  v.u.uTime.value += dt;
  v.u.uHit.value = Math.max(0, Math.min(1, (e.flash ?? 0) * 6));
  if (v.boss) v.u.uPhase.value += ((e.phase === 2 ? 1 : 0) - v.u.uPhase.value) * Math.min(1, dt * 2);
  const [name, ts] = choose(v, e, dt);
  play(v, name, ts, name === "dead" ? 0.1 : 0.14);
  if (e.dead) {
    v.deadT = Math.min(1, (v.deadT ?? 0) + dt / (v.boss ? BOSS_DEAD_DUR : DEAD_DUR));
    v.u.uDust.value = THREE.MathUtils.smoothstep(v.deadT, 0.3, 1) * 1.05;
    if (!v.dust && v.deadT > 0.3) startDust(v);
    if (v.dust) {
      const k = (v.deadT - 0.3) / 0.7;
      const a = v.dust.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < a.count; i++) a.setY(i, a.getY(i) + dt * (0.6 + (i % 7) * 0.12));
      a.needsUpdate = true;
      (v.dust.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - k) * (0.6 + 0.4 * Math.sin(t * 20));
    }
  }
  const far = !v.boss && camDist > LOD_FAR;
  if (far !== v.far) {
    v.far = far;
    for (const m of v.lod0) m.visible = !far;
    for (const m of v.lod1) m.visible = far;
  }
  v.acc += dt;
  const step = v.boss || (!far && rank < FULL_NEAR) ? 0 : far ? 1 / 8 : 1 / 15;
  if (v.acc >= step) {
    v.mixer!.update(v.acc);
    v.acc = 0;
  }
  if (v.boss && v.spine?.length) bossBody(v, e, t, TS);
  return !(e.dead && (v.deadT ?? 0) >= 1);
}

export function disposeMonster(v: MonsterView) {
  v.obj.removeFromParent();
  v.mixer?.stopAllAction();
  for (const m of v.mats) m.dispose();
  if (v.dust) {
    v.dust.removeFromParent();
    v.dust.geometry.dispose();
    (v.dust.material as THREE.Material).dispose();
  }
}
