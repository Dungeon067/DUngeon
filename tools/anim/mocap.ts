/**
 * Mocap người thật (CMU Graphics Lab Motion Capture Database, bản BVH của Bruce Hahne / cgspeed; tự do dùng,
 * kể cả thương mại) → khung humanoid chuẩn hóa VRM. Mỗi xương: hướng thế giới mocap · bù lệch tư thế nghỉ
 * (mocap nghỉ chữ T nhưng chân, cổ lệch) → xoay cục bộ VRM. Hông: chia theo chiều cao hông, bỏ tịnh tiến khi
 * clip tại chỗ, quay cho nhân vật nhìn +Z.
 * Dò: pnpm exec tsx tools/anim/mocap.ts probe <file.bvh>
 */
import { readFileSync } from "node:fs";
import * as THREE from "three";
import { BVHLoader } from "three/examples/jsm/loaders/BVHLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Rig, type ClipData } from "./pose";

const DIR = "art-src/mocap/cmu";
/** Mixamo (Adobe, miễn phí cả thương mại trong game): FBX "Without Skin", tên tệp có tiền tố `mx/`. */
const MX_DIR = "art-src/mocap/mixamo";
/** Xương VRM ← [xương CMU, gốc hướng CMU, ngọn hướng CMU, ngọn hướng VRM]. */
type BoneMap = Record<string, [string, string?, string?, string?]>;
const MAP: BoneMap = {
  hips: ["Hips"],
  spine: ["LowerBack", "LowerBack", "Spine1", "upperChest"],
  chest: ["Spine", "Spine", "Neck", "neck"],
  upperChest: ["Spine1"],
  neck: ["Neck", "Neck", "Head", "head"],
  head: ["Head"],
};
for (const [s, S] of [
  ["Left", "left"],
  ["Right", "right"],
] as const) {
  Object.assign(MAP, {
    [`${S}Shoulder`]: [`${s}Shoulder`, `${s}Shoulder`, `${s}Arm`, `${S}UpperArm`],
    [`${S}UpperArm`]: [`${s}Arm`, `${s}Arm`, `${s}ForeArm`, `${S}LowerArm`],
    [`${S}LowerArm`]: [`${s}ForeArm`, `${s}ForeArm`, `${s}Hand`, `${S}Hand`],
    [`${S}Hand`]: [`${s}Hand`, `${s}Hand`, `${s}FingerBase`, `${S}MiddleProximal`],
    [`${S}UpperLeg`]: [`${s}UpLeg`, `${s}UpLeg`, `${s}Leg`, `${S}LowerLeg`],
    [`${S}LowerLeg`]: [`${s}Leg`, `${s}Leg`, `${s}Foot`, `${S}Foot`],
    [`${S}Foot`]: [`${s}Foot`, `${s}Foot`, `${s}ToeBase`, `${S}Toes`],
    [`${S}Toes`]: [`${s}ToeBase`],
  });
}

/** Mixamo: cột sống 3 đốt Spine/Spine1/Spine2, hướng bàn tay theo ngón giữa. */
const MX_MAP: BoneMap = {
  ...MAP,
  spine: ["Spine", "Spine", "Spine1", "chest"],
  chest: ["Spine1", "Spine1", "Spine2", "upperChest"],
  upperChest: ["Spine2", "Spine2", "Neck", "neck"],
  leftHand: ["LeftHand", "LeftHand", "LeftHandMiddle1", "leftMiddleProximal"],
  rightHand: ["RightHand", "RightHand", "RightHandMiddle1", "rightMiddleProximal"],
};

interface Src {
  map: BoneMap;
  restQ: Map<string, THREE.Quaternion>;
  bones: THREE.Bone[];
  by: Map<string, THREE.Bone>;
  rest: Map<string, THREE.Vector3>;
  interp: Map<string, { q?: THREE.Interpolant; p?: THREE.Interpolant }>;
  dur: number;
}
const cache = new Map<string, Src>();
function load(file: string): Src {
  let s = cache.get(file);
  if (s) return s;
  const mx = file.startsWith("mx/");
  let bones: THREE.Bone[], clip: THREE.AnimationClip;
  if (mx) {
    const buf = readFileSync(`${MX_DIR}/${file.slice(3)}.fbx`);
    const g = new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), "");
    bones = [];
    g.traverse((o) => {
      if ((o as THREE.Bone).isBone) bones.push(o as THREE.Bone);
    });
    for (const b of bones) b.name = b.name.replace(/^mixamorig\d*:?/, "");
    // Gốc ngoài cùng (Group) có thể xoay hoặc co giãn: gắn hông thẳng vào gốc mới để hệ trục giống BVH.
    const top = new THREE.Object3D();
    top.add(bones[0]);
    bones[0].updateMatrixWorld(true);
    clip = g.animations[0];
  } else {
    const r = new BVHLoader().parse(readFileSync(`${DIR}/${file}.bvh`, "utf8"));
    bones = r.skeleton.bones;
    clip = r.clip;
  }
  const by = new Map(bones.map((b) => [b.name, b]));
  bones[0].updateMatrixWorld(true);
  const rest = new Map(bones.map((b) => [b.name, b.getWorldPosition(new THREE.Vector3())]));
  const restQ = new Map(bones.map((b) => [b.name, b.getWorldQuaternion(new THREE.Quaternion())]));
  const interp = new Map<string, { q?: THREE.Interpolant; p?: THREE.Interpolant }>();
  for (const t of clip.tracks) {
    const [n0, k] = t.name.split(".");
    const n = n0.replace(/^mixamorig\d*:?/, "");
    const e = interp.get(n) ?? {};
    if (k === "quaternion") e.q = (t as THREE.QuaternionKeyframeTrack).createInterpolant();
    else e.p = t.createInterpolant();
    interp.set(n, e);
  }
  s = { map: mx ? MX_MAP : MAP, restQ, bones, by, rest, interp, dur: clip.duration };
  cache.set(file, s);
  return s;
}
/** Đặt tư thế BVH tại t (giây), trả hướng thế giới từng xương. */
function poseAt(s: Src, t: number) {
  for (const b of s.bones) {
    const e = s.interp.get(b.name);
    if (e?.q) b.quaternion.fromArray(e.q.evaluate(t) as unknown as number[]);
    if (e?.p) b.position.fromArray(e.p.evaluate(t) as unknown as number[]);
  }
  s.bones[0].updateMatrixWorld(true);
}
const wq = (b: THREE.Object3D) => b.getWorldQuaternion(new THREE.Quaternion());
const wp = (b: THREE.Object3D) => b.getWorldPosition(new THREE.Vector3());

export interface MocapRecipe {
  file: string;
  from: number;
  to: number;
  loop?: boolean;
  /** Bỏ tịnh tiến ngang (chạy tại chỗ); hướng mặt lấy theo hướng di chuyển. */
  inPlace?: boolean;
  /** Tốc độ phát (>1 nhanh hơn). */
  speed?: number;
  /** Quay thêm quanh trục đứng (độ) sau khi căn hướng. */
  yaw?: number;
  mirror?: boolean;
  /** Cung: xoay cho mũi tên (tay phải → tay trái) lúc t chỉ về +Z; thêm rãnh kéo dây str theo khoảng cách hai tay. */
  aim?: number;
  /** Thẳng lưng: nhân độ gập spine/chest/upperChest với hệ số này, bù ở cổ và đầu cho mắt nhìn ngang. */
  straight?: number;
  /** Nối nhiều đoạn [từ, đến, tốc độ] (bỏ qua from/to/speed). */
  segs?: [number, number, number][];
}

const rig = new Rig();
rig.root.updateMatrixWorld(true);
const vDir = (a: string, b: string) => wp(rig.bones[b]).sub(wp(rig.bones[a])).normalize();

/** Tìm điểm kết vòng gần `to` (±0,1 giây) có tư thế giống khung đầu nhất. */
function loopEnd(s: Src, from: number, to: number) {
  const key = ["LeftUpLeg", "RightUpLeg", "LeftLeg", "RightLeg", "LeftArm", "RightArm", "LowerBack"];
  const snap = (t: number) => {
    poseAt(s, t);
    return key.map((k) => s.by.get(k)!.quaternion.clone());
  };
  const a = snap(from);
  let best = to,
    bd = Infinity;
  for (let t = to - 0.1; t <= Math.min(s.dur, to + 0.1); t += 1 / 120) {
    const d = snap(t).reduce((sum, q, i) => sum + q.angleTo(a[i]), 0);
    if (d < bd) [bd, best] = [d, t];
  }
  return best;
}

export function bakeMocap(r: MocapRecipe, names: string[], fill: ClipData, fps = 30): ClipData {
  const s = load(r.file);
  const R = s.rest;
  const hipsH = R.get("Hips")!.y - R.get("LeftFoot")!.y;
  // Bù lệch tư thế nghỉ: hướng nghỉ VRM → hướng nghỉ mocap.
  const A = new Map<string, THREE.Quaternion>();
  for (const [v, [, a, b, vc]] of Object.entries(s.map)) {
    if (!a || !b || !vc || !rig.bones[vc]) continue;
    const dm = R.get(b)!.clone().sub(R.get(a)!).normalize();
    A.set(v, new THREE.Quaternion().setFromUnitVectors(vDir(v, vc), dm));
  }
  if (r.loop) r = { ...r, to: loopEnd(s, r.from, r.to) };
  const segs = r.segs ?? [[r.from, r.to, r.speed ?? 1]];
  const lens = segs.map(([a, b, v]) => (b - a) / v),
    total = lens.reduce((x, y) => x + y, 0),
    n = Math.max(2, Math.round(total * fps) + 1);
  const T = (i: number) => {
    let u = (i / (n - 1)) * total;
    for (let k = 0; k < segs.length; k++) {
      if (u <= lens[k] || k === segs.length - 1) return Math.min(segs[k][1], segs[k][0] + u * segs[k][2]);
      u -= lens[k];
    }
    return segs[0][0];
  };
  // Hướng mặt và sàn.
  const hp: THREE.Vector3[] = [];
  let ankMin = Infinity;
  const fwdSum = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    poseAt(s, T(i));
    const h = s.by.get("Hips")!;
    hp.push(wp(h));
    ankMin = Math.min(ankMin, wp(s.by.get("LeftFoot")!).y, wp(s.by.get("RightFoot")!).y);
    fwdSum.add(new THREE.Vector3(0, 0, 1).applyQuaternion(wq(h)).setY(0));
  }
  const ground = ankMin + (R.get("LeftFoot")!.y - Math.min(R.get("LeftToeBase")!.y, R.get("LeftFoot")!.y)) * 0;
  const move = hp[n - 1].clone().sub(hp[0]).setY(0);
  let face = r.inPlace && move.length() > hipsH * 0.3 ? move : fwdSum;
  if (r.aim !== undefined) {
    poseAt(s, r.aim);
    face = wp(s.by.get("LeftHand")!).sub(wp(s.by.get("RightHand")!)).setY(0);
  }
  const str: number[] = [];
  const yaw = Math.atan2(face.x, face.z) - THREE.MathUtils.degToRad(r.yaw ?? 0);
  const Y = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -yaw);
  const out: ClipData = { n, bones: {}, hips: [] };
  for (const b of names) out.bones[b] = { q: [] };
  for (let i = 0; i < n; i++) {
    poseAt(s, T(i));
    const W = new Map<string, THREE.Quaternion>();
    for (const [v, [m]] of Object.entries(s.map)) {
      const q = wq(s.by.get(m)!).multiply(s.restQ.get(m)!.clone().invert()).premultiply(Y);
      const a = A.get(v);
      W.set(v, a ? q.multiply(a) : q);
    }
    for (const b of names) {
      let q: THREE.Quaternion;
      if (W.has(b)) {
        const par = (rig.bones[b].parent as THREE.Object3D).name;
        q = W.has(par) ? W.get(par)!.clone().invert().multiply(W.get(b)!) : W.get(b)!.clone();
      } else q = new THREE.Quaternion().fromArray(fill.bones[b].q[0]);
      out.bones[b].q.push(q.toArray());
    }
    const k = i / (n - 1);
    const p = hp[i].clone();
    if (r.inPlace) p.sub(hp[0].clone().lerp(hp[n - 1], k).setY(0));
    else p.sub(hp[0].clone().setY(0));
    p.y -= ground + hipsH;
    p.applyQuaternion(Y).divideScalar(hipsH);
    out.hips.push(p.toArray());
    if (r.aim !== undefined) {
      const d = wp(s.by.get("LeftHand")!).distanceTo(wp(s.by.get("RightHand")!)) / hipsH;
      str.push(THREE.MathUtils.clamp((d - 0.3) / 0.7, 0, 1));
    }
  }
  if (str.length) {
    // Thả dây: khi tay phải rời dây (độ kéo tụt nhanh) thì dây bật về 0 ngay.
    let rel = -1;
    for (let i = 1; i < n && rel < 0; i++) if (str[i - 1] > 0.8 && str[i] < str[i - 1] - 0.04) rel = i;
    if (rel > 0) for (let i = rel; i < n; i++) str[i] = 0;
    out.str = str.map((v) => +v.toFixed(3));
  }
  if (r.straight !== undefined) straighten(out, r.straight);
  if (r.mirror) {
    const nb: ClipData["bones"] = {};
    for (const [b, tr] of Object.entries(out.bones)) {
      const m = b.startsWith("left") ? "right" + b.slice(4) : b.startsWith("right") ? "left" + b.slice(5) : b;
      nb[m] = { q: tr.q.map(([x, y, z, w]) => [x, -y, -z, w]) };
    }
    out.bones = nb;
    out.hips = out.hips.map(([x, y, z]) => [-x, y, z]);
  }
  if (r.loop) {
    // Khép vòng: 6 khung cuối trộn dần về khung đầu.
    const L = Math.min(6, n - 2);
    for (let j = 0; j < L; j++) {
      const i = n - L + j,
        w = (j + 1) / L;
      for (const tr of Object.values(out.bones))
        tr.q[i] = new THREE.Quaternion().fromArray(tr.q[i]).slerp(new THREE.Quaternion().fromArray(tr.q[0]), w).toArray();
      out.hips[i] = out.hips[i].map((v, c) => v + (out.hips[0][c] - v) * w);
    }
  }
  for (const tr of Object.values(out.bones)) tr.q = tr.q.map((q) => q.map((x) => +x.toFixed(4)));
  out.hips = out.hips.map((h) => h.map((x) => +x.toFixed(4)));
  return out;
}

const CHAIN = ["hips", "spine", "chest", "upperChest", "neck", "head"];
/** Độ cúi (độ, dương là cúi tới) của trục lên xương `upto` trong khung i. */
function pitchOf(c: ClipData, i: number, upto: string) {
  const q = new THREE.Quaternion();
  for (const b of CHAIN.slice(0, CHAIN.indexOf(upto) + 1)) q.multiply(new THREE.Quaternion().fromArray(c.bones[b].q[i]));
  const u = new THREE.Vector3(0, 1, 0).applyQuaternion(q);
  return THREE.MathUtils.radToDeg(Math.atan2(u.z, u.y));
}
function straighten(c: ClipData, k: number) {
  const e = new THREE.Euler(0, 0, 0, "YXZ");
  const X = new THREE.Vector3(1, 0, 0);
  for (let i = 0; i < c.n; i++) {
    for (const b of ["spine", "chest", "upperChest"]) {
      e.setFromQuaternion(new THREE.Quaternion().fromArray(c.bones[b].q[i]));
      e.x *= k;
      c.bones[b].q[i] = new THREE.Quaternion().setFromEuler(e).toArray();
    }
    // Mắt nhìn ngang: đưa độ cúi của đầu về khoảng ±4°, chia đều cho cổ và đầu.
    const ph = pitchOf(c, i, "head"),
      fix = THREE.MathUtils.degToRad(-(ph - THREE.MathUtils.clamp(ph, -4, 4)) / 2);
    for (const b of ["neck", "head"])
      c.bones[b].q[i] = new THREE.Quaternion().setFromAxisAngle(X, fix).multiply(new THREE.Quaternion().fromArray(c.bones[b].q[i])).toArray();
  }
}

if (process.argv[2] === "probe") {
  const s = load(process.argv[3]);
  const H = s.rest.get("Hips")!.y - s.rest.get("LeftFoot")!.y;
  console.log("dài", s.dur.toFixed(2), "s; cao hông", H.toFixed(2));
  const step = +(process.argv[4] ?? 0.25);
  let prev: THREE.Vector3 | null = null;
  for (let t = 0; t < s.dur; t += step) {
    poseAt(s, t);
    const h = wp(s.by.get("Hips")!),
      L = wp(s.by.get("LeftFoot")!).y,
      Rr = wp(s.by.get("RightFoot")!).y,
      rh = wp(s.by.get("RightHand")!),
      lh = wp(s.by.get("LeftHand")!);
    const v = prev ? h.clone().sub(prev).setY(0).length() / step / H : 0;
    prev = h;
    console.log(
      t.toFixed(2),
      `hông ${(h.y / H).toFixed(2)} v ${v.toFixed(2)} cổL ${(L / H).toFixed(2)} cổR ${(Rr / H).toFixed(2)} tayP ${((rh.y - h.y) / H).toFixed(2)} tayT ${((lh.y - h.y) / H).toFixed(2)} d ${(rh.distanceTo(lh) / H).toFixed(2)}`,
    );
  }
}

if (process.argv[2] === "bake") {
  // Thử nhanh: pnpm exec tsx tools/anim/mocap.ts bake <file> <tên clip> [từ] [đến]
  const { writeFileSync } = await import("node:fs");
  const F = "public/media/anim/humanoid.json";
  const lib = JSON.parse(readFileSync(F, "utf8"));
  const [, , , file, name, a, b] = process.argv;
  const dur = load(file).dur;
  lib.clips[name] = bakeMocap({ file, from: +(a ?? 0), to: +(b ?? dur) }, Object.keys(lib.clips.idle.bones), lib.clips.relax, lib.fps);
  writeFileSync(F, JSON.stringify(lib));
  console.log(name, lib.clips[name].n, "khung");
}
