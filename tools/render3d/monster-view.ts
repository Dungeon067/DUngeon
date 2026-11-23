/** Trang xem quái S29 (chỉ dùng khi dev): ?id=slime&mode=turn|grid&el=water&clip=idle */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { driveSpine, resamplePath, spineBones } from "../../src/render3d/toon/monsterRig";
import { monsterMat, monsterUniforms, type MonsterUniforms } from "../../src/render3d/toon/monsterKit";
import { outlineMat } from "../../src/render3d/toon/mat";
import { EL } from "../../src/data/content";

const q = new URLSearchParams(location.search);
const id = q.get("id") ?? "slime";
const mode = q.get("mode") ?? "turn";
const W = +(q.get("w") ?? 1600),
  H = +(q.get("h") ?? 900);
const r = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
r.setSize(W, H);
r.setPixelRatio(1);
r.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(r.domElement);

function stage() {
  const s = new THREE.Scene();
  s.add(new THREE.HemisphereLight(0xcfe0ff, 0x5a4a6a, 1.15));
  const d = new THREE.DirectionalLight(0xfff1dc, 2.1);
  d.position.set(-2, 4, 3);
  s.add(d);
  const f = new THREE.Mesh(
    new THREE.CircleGeometry(3, 48),
    new THREE.MeshBasicMaterial({ color: 0x2a2538, transparent: true, opacity: 0.55 }),
  );
  f.rotation.x = -Math.PI / 2;
  f.visible = !q.get("bg");
  s.add(f);
  return s;
}

const g = await new GLTFLoader().loadAsync(`/media/models/monsters/${id}.glb`);
const serpent = spineBones(g.scene).length > 0;
/** Đường bơi chữ S, đầu ngẩng, dùng để dựng tư thế xem thử cho quái thân dài. */
function coilPath(o: THREE.Object3D, time: number) {
  const bones = spineBones(o);
  o.updateMatrixWorld(true);
  const p0 = bones[0].getWorldPosition(new THREE.Vector3());
  const seg = p0.distanceTo(bones[1].getWorldPosition(new THREE.Vector3()));
  const raw: THREE.Vector3[] = [];
  for (let i = 0; i <= 400; i++) {
    const s = i * 0.03;
    const rise = 1.6 * (1 - THREE.MathUtils.smoothstep(s, 0, 2.6));
    raw.push(
      new THREE.Vector3(
        Math.sin(s * 0.9 + time * 1.2) * 1.4 * Math.min(1, s * 0.45),
        p0.y + rise - 1.6,
        p0.z - s * 0.92,
      ),
    );
  }
  driveSpine(bones, resamplePath(raw, seg, bones.length + 1));
}
if (serpent) {
  g.scene.position.y = 1.2;
  coilPath(g.scene, 0);
}
const box = new THREE.Box3().setFromObject(g.scene, true);
const size = box.getSize(new THREE.Vector3());
const ctr = box.getCenter(new THREE.Vector3());

function inst(el: string) {
  const u = monsterUniforms();
  const c = new THREE.Color(EL[el]?.c ?? "#ffffff");
  u.uTint.value.copy(c);
  u.uGlow.value.copy(new THREE.Color(EL[el]?.c2 ?? "#ffffff")).lerp(c, 0.5);
  const o = SkeletonUtils.clone(g.scene) as THREE.Object3D;
  const cache = new Map<THREE.Material, THREE.Material>();
  const meshes: THREE.Mesh[] = [];
  o.traverse((m: any) => m.isMesh && meshes.push(m));
  for (const m of meshes) {
    if (/lod\d/.test(m.name) || /lod\d/.test(m.parent?.name ?? "")) {
      m.visible = false;
      continue;
    }
    const src = m.material as THREE.MeshStandardMaterial;
    let mm = cache.get(src);
    if (!mm) cache.set(src, (mm = monsterMat(src, u)));
    m.material = mm;
    if (
      q.get("ol") !== "0" &&
      (mm as any).userData.part !== "jelly" &&
      (mm as any).userData.part !== "fin" &&
      (mm as any).userData.part !== "glow"
    ) {
      const ol = (m as any).isSkinnedMesh
        ? new THREE.SkinnedMesh(m.geometry, outlineMat(0.006 * Math.max(size.x, size.y, size.z) ** 0.5))
        : new THREE.Mesh(m.geometry, outlineMat(0.006));
      if ((ol as any).isSkinnedMesh)
        (ol as unknown as THREE.SkinnedMesh).bind(
          (m as unknown as THREE.SkinnedMesh).skeleton,
          (m as THREE.SkinnedMesh).bindMatrix,
        );
      m.parent!.add(ol);
      ol.position.copy(m.position);
      ol.quaternion.copy(m.quaternion);
      ol.scale.copy(m.scale);
    }
  }
  const mixer = new THREE.AnimationMixer(o);
  if (serpent) u.uTintK.value = 0;
  if (q.get("phase") === "2") u.uPhase.value = 1;
  const clip = THREE.AnimationClip.findByName(g.animations, q.get("clip") ?? "idle");
  let act: THREE.AnimationAction | null = null;
  if (clip) {
    const a = (act = mixer.clipAction(clip));
    if (/^(tele|attack|hurt|dead|fan|rain|roar|summon)$/.test(clip.name)) {
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
    }
    a.play();
  }
  return { o, u, mixer, act };
}

const NAMES: Record<string, string> = {
  idle: "Đứng yên",
  patrol: "Đi tuần",
  chase: "Chạy đuổi",
  tele: "Lấy đà",
  draw: "Kéo cung",
  cast: "Niệm phép",
  attack: "Ra đòn",
  hurt: "Trúng đòn",
  stun: "Choáng",
  fan: "Quạt đuôi",
  rain: "Mưa nước",
  charge: "Lao tới",
  summon: "Gọi quái",
  roar: "Gầm chuyển giai đoạn",
  dead: "Tan thành bụi sao",
};
let reel: ((dt: number) => void) | null = null;
const els = (q.get("els") ?? q.get("el") ?? "water").split(",");
const views: {
  s: THREE.Scene;
  cam: THREE.Camera;
  vp: number[];
  mixer: THREE.AnimationMixer;
  u: MonsterUniforms;
  o: THREE.Object3D;
}[] = [];
const ext = Math.max(size.x, size.y, size.z);
function cam(yaw: number, aspect: number, pitch = 0.18) {
  const c = new THREE.PerspectiveCamera(28, aspect, 0.01, 100);
  const fit = Math.max(
    size.y / (2 * Math.tan((14 * Math.PI) / 180)),
    Math.max(size.x, size.z) / (2 * Math.tan((14 * Math.PI) / 180) * aspect),
  );
  const dist = (fit * 1.25 + ext * 0.5) / +(q.get("zoom") ?? 1);
  const tgt = ctr.clone().add(new THREE.Vector3(0, size.y * +(q.get("ty") ?? 0), 0));
  c.position.set(
    tgt.x + Math.sin(yaw) * dist * Math.cos(pitch),
    tgt.y + dist * Math.sin(pitch),
    tgt.z + Math.cos(yaw) * dist * Math.cos(pitch),
  );
  c.lookAt(tgt);
  return c;
}
if (mode === "grid") {
  const n = els.length;
  els.forEach((el, i) => {
    const s = stage();
    const it = inst(el);
    s.add(it.o);
    views.push({ s, cam: cam(0.5, W / n / H), vp: [(i * W) / n, 0, W / n, H], mixer: it.mixer, u: it.u, o: it.o });
  });
} else if (mode === "hero") {
  const s = stage();
  const it = inst(els[0]);
  s.add(it.o);
  views.push({
    s,
    cam: cam(+(q.get("yaw") ?? 0.6), W / H, +(q.get("pitch") ?? 0.18)),
    vp: [0, 0, W, H],
    mixer: it.mixer,
    u: it.u,
    o: it.o,
  });
} else if (mode === "strip") {
  // Dải khung hình của một clip: ?mode=strip&clip=patrol&n=6 (khung cách đều, đứng yên).
  const n = +(q.get("n") ?? 6);
  for (let i = 0; i < n; i++) {
    const s = stage();
    const it = inst(els[0]);
    s.add(it.o);
    const a = it.act;
    if (a) {
      a.time = (a.getClip().duration * i) / Math.max(1, n - (q.get("once") ? 1 : 0));
      a.paused = true;
      it.mixer.update(0);
    }
    views.push({
      s,
      cam: cam(+(q.get("yaw") ?? 0.9), W / n / H, +(q.get("pitch") ?? 0.18)),
      vp: [(i * W) / n, 0, W / n, H],
      mixer: it.mixer,
      u: it.u,
      o: it.o,
    });
  }
} else if (mode === "reel") {
  // Video hoạt ảnh: chơi lần lượt mọi clip, có nhãn, máy quay xoay chậm. Xong thì đặt window.__reelDone.
  const s = stage();
  const it = inst(els[0]);
  s.add(it.o);
  it.mixer.stopAllAction();
  views.push({ s, cam: cam(0.6, W / H, 0.16), vp: [0, 0, W, H], mixer: it.mixer, u: it.u, o: it.o });
  const order = [
    "idle",
    "patrol",
    "chase",
    "tele",
    "draw",
    "cast",
    "attack",
    "hurt",
    "stun",
    "fan",
    "rain",
    "charge",
    "summon",
    "roar",
    "dead",
  ];
  const clips = order
    .map((n) => THREE.AnimationClip.findByName(g.animations, n))
    .filter(Boolean) as THREE.AnimationClip[];
  const label = document.createElement("div");
  label.style.cssText =
    "position:fixed;left:40px;bottom:36px;font:600 34px system-ui;color:#f4ecd8;text-shadow:0 2px 6px #000";
  document.body.appendChild(label);
  let i = -1,
    left = 0,
    prev: THREE.AnimationAction | null = null;
  reel = (dt: number) => {
    left -= dt;
    if (left <= 0) {
      if (++i >= clips.length) return void ((window as any).__reelDone = true);
      const c = clips[i];
      const a = it.mixer.clipAction(c);
      const once = /^(tele|draw|cast|attack|hurt|dead|fan|rain|roar|summon)$/.test(c.name);
      a.reset()
        .setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity)
        .play();
      a.clampWhenFinished = true;
      if (prev) prev.crossFadeTo(a, 0.15, false);
      prev = a;
      left = once ? c.duration + 0.9 : Math.max(2.4, c.duration * 2);
      label.textContent = `${NAMES[c.name] ?? c.name}  ·  ${c.name}`;
      if (c.name === "roar") it.u.uPhase.value = 1;
    }
    const c = clips[i];
    if (c.name === "hurt") it.u.uHit.value = Math.max(0, 1 - (c.duration + 0.9 - left) * 4);
    if (c.name === "dead") it.u.uDust.value = Math.min(1.05, Math.max(0, (c.duration + 0.9 - left - 0.4) / 1.2));
    const v = views[0];
    const y = 0.6 + clk.elapsedTime * 0.12;
    v.cam = cam(y, W / H, 0.16);
  };
} else {
  const yaws = [0, Math.PI / 4, Math.PI / 2, Math.PI];
  yaws.forEach((y, i) => {
    const s = stage();
    const it = inst(els[0]);
    s.add(it.o);
    views.push({ s, cam: cam(y, W / 4 / H), vp: [(i * W) / 4, 0, W / 4, H], mixer: it.mixer, u: it.u, o: it.o });
  });
}
r.setScissorTest(true);
const clk = new THREE.Clock();
function frame() {
  const dt = clk.getDelta();
  reel?.(dt);
  for (const v of views) {
    v.mixer.update(dt);
    if (serpent) coilPath(v.o, v.u.uTime.value);
    v.u.uTime.value += dt;
    r.setViewport(v.vp[0], v.vp[1], v.vp[2], v.vp[3]);
    r.setScissor(v.vp[0], v.vp[1], v.vp[2], v.vp[3]);
    r.setClearColor(q.get("bg") ? +("0x" + q.get("bg")!.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3")) : 0x1d1a29);
    r.render(v.s, v.cam);
  }
  requestAnimationFrame(frame);
}
frame();
(window as any).__ready = true;
