/**
 * Nhân vật VRM (@pixiv/three-vrm, MToon, spring bone) với hoạt ảnh humanoid dùng chung.
 * Thả public/media/models/<id>/model.vrm là game tự nhận; thiếu thì dùng mẫu tạm trong content/models.yaml.
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";
import modelsRaw from "../../../content/models.yaml";
import { POSES } from "../../data/poses";
import type { DangParams } from "../../data/poses-schema";
import { WeaponFx } from "./weapon-fx";
import { PoseLayer, type PoseInput } from "./pose-layer";
import { BowRig } from "./bow-rig";
import { ClothGuard } from "./cloth";
import { solveLimb, type Limb } from "./ik";
import { validateModels, type WeaponType } from "../../data/models-schema";
import { outlineMat, toonMat } from "./mat";

const _v = new THREE.Vector3(),
  _s = new THREE.Vector3(),
  _p = new THREE.Vector3(),
  _q = new THREE.Quaternion(),
  _q2 = new THREE.Quaternion();

export const MODELS = validateModels(modelsRaw);
export { POSES };
const base = (import.meta as any).env?.BASE_URL ?? "/";
const loader = new GLTFLoader();
loader.register((p) => new VRMLoaderPlugin(p));
const glbLoader = new GLTFLoader();

type ClipData = { n: number; bones: Record<string, { q: number[][] }>; hips: number[][]; str?: number[] };
let animLib: Promise<{ fps: number; clips: Record<string, ClipData> } | null> | null = null;
function loadAnims() {
  return (animLib ??= fetch((globalThis as { __animUrl?: string }).__animUrl ?? `${base}media/anim/humanoid.json`)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null));
}

const exists = new Map<string, Promise<boolean>>();
function hasFile(url: string) {
  let p = exists.get(url);
  if (!p) {
    p = fetch(url, { method: "HEAD" })
      .then((r) => r.ok && !(r.headers.get("content-type") ?? "").includes("text/html"))
      // Ngoại tuyến: HEAD lỗi mạng, nhưng file có thể đã nằm trong bộ nhớ đệm media của PWA (lưu theo GET).
      .catch(() =>
        typeof caches === "undefined"
          ? false
          : caches.match(url).then(
              (r) => !!r,
              () => false,
            ),
      );
    exists.set(url, p);
  }
  return p;
}

const weaponCache = new Map<string, Promise<THREE.Object3D | null>>();
/** GLB vũ khí (xuất từ Blender S24) đổi sang vật liệu toon, có viền. */
export function loadWeapon(id: string): Promise<THREE.Object3D | null> {
  let p = weaponCache.get(id);
  if (!p) {
    p = glbLoader
      .loadAsync(`${base}media/models/weapons/${id}.glb`)
      .then((g) => {
        const meshes: any[] = [];
        g.scene.traverse((o: any) => o.isMesh && meshes.push(o));
        meshes.forEach((o: any) => {
          const src = o.material as THREE.MeshStandardMaterial,
            glow = src.name.startsWith("glow_");
          o.material = toonMat({
            color: src.color,
            emissive: glow ? src.color : new THREE.Color(0),
            emissiveIntensity: glow ? 1.6 : 0,
          });
          o.castShadow = true;
          const ol = new THREE.Mesh(o.geometry, outlineMat(0.006));
          o.add(ol);
        });
        return g.scene;
      })
      .catch((e) => {
        console.warn("[3d] không tải được vũ khí", id, e);
        return null;
      });
    weaponCache.set(id, p);
  }
  return p.then((o) => (o ? o.clone() : null));
}

export class VrmActor {
  obj = new THREE.Group();
  mixer: THREE.AnimationMixer;
  private actions = new Map<string, THREE.AnimationAction>();
  private cur: THREE.AnimationAction | null = null;
  curName = "";
  weapon: THREE.Object3D | null = null;
  /** Vũ khí hai tay: tay trái bám điểm cầm thứ hai trên thân vũ khí (IK cánh tay). */
  offHand: {
    limb: Limb;
    w: THREE.Object3D;
    at: number;
    q: THREE.Quaternion;
    off: THREE.Vector3;
    r: THREE.Object3D;
  } | null = null;
  /** S27: lớp chỉnh tư thế theo dáng; poseIn do renderer đặt mỗi khung. */
  layer: PoseLayer | null = null;
  poseIn: PoseInput = { mode: "relax", freeL: true, freeR: true };
  restHips: THREE.Vector3;
  hipsH: number;
  bow: BowRig | null = null;
  wfx: WeaponFx | null = null;
  private strs = new Map<string, number[]>();
  private fps: number;
  /** Spring bone có kẹp dt, hông làm mượt, chặn góc váy. */
  cloth: ClothGuard;
  constructor(
    public vrm: VRM,
    public wtype: WeaponType,
    clips: Record<string, ClipData>,
    fps: number,
    public src: string,
  ) {
    this.mixer = new THREE.AnimationMixer(vrm.scene);
    const hum = vrm.humanoid,
      hipsN = hum.getNormalizedBoneNode("hips")!;
    const restHips = hipsN.position.clone();
    vrm.scene.updateMatrixWorld(true);
    const hipsH = Math.max(0.3, hipsN.getWorldPosition(new THREE.Vector3()).y);
    this.restHips = restHips;
    this.hipsH = hipsH;
    this.fps = fps;
    const v0 = vrm.meta?.metaVersion === "0";
    for (const [name, c] of Object.entries(clips)) {
      const times = Array.from({ length: c.n }, (_, i) => i / fps);
      const tracks: THREE.KeyframeTrack[] = [];
      for (const [b, tr] of Object.entries(c.bones)) {
        const node = hum.getNormalizedBoneNode(b as any);
        if (!node) continue;
        const vals = tr.q.flatMap(([x, y, z, w]) => (v0 ? [-x, y, -z, w] : [x, y, z, w]));
        tracks.push(new THREE.QuaternionKeyframeTrack(`${node.name}.quaternion`, times, vals));
      }
      const pv = c.hips.flatMap(([x, y, z]) => [
        restHips.x + (v0 ? -x : x) * hipsH,
        restHips.y + y * hipsH,
        restHips.z + (v0 ? -z : z) * hipsH,
      ]);
      tracks.push(new THREE.VectorKeyframeTrack(`${hipsN.name}.position`, times, pv));
      this.actions.set(name, this.mixer.clipAction(new THREE.AnimationClip(name, -1, tracks)));
      if (c.str) this.strs.set(name, c.str);
    }
    this.obj.add(vrm.scene);
    this.cloth = new ClothGuard(vrm, POSES.gio);
  }

  static async load(
    id: string,
    wtype: WeaponType,
    weaponId: string | null,
    colors?: { hair?: string; outfit?: string; eye?: string; accent?: string },
  ): Promise<VrmActor | null> {
    const own = `${base}media/models/${id}/model.vrm`;
    const url = (await hasFile(own)) ? own : `${base}media/models/${MODELS.mau}/model.vrm`;
    const [g, A] = await Promise.all([loader.loadAsync(url).catch(() => null), loadAnims()]);
    const vrm: VRM | undefined = g?.userData.vrm;
    if (!vrm || !A) return null;
    VRMUtils.removeUnnecessaryVertices(vrm.scene);
    VRMUtils.combineSkeletons(vrm.scene);
    VRMUtils.rotateVRM0(vrm);
    // Nhân vật chưa có mô hình riêng: nhuộm mẫu tạm theo màu YAML để còn phân biệt được.
    const tint = url !== own && colors ? tintFor(colors) : null;
    vrm.scene.traverse((o: any) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.frustumCulled = false;
      for (const m of [o.material].flat()) {
        if (!m?.isMToonMaterial) continue;
        const tc = tint?.(m.name ?? "");
        if (tc) {
          m.color?.copy(tc).multiplyScalar(1.25);
          m.shadeColorFactor?.copy(tc).multiplyScalar(0.6);
        }
        // Bóng ngả tím lam, viền sáng (rim) ấm theo phong cách hoạt hình.
        m.shadeColorFactor?.lerp(new THREE.Color(0x6a5a9a), 0.25);
        m.parametricRimColorFactor?.set(0x7a6a50);
        m.parametricRimFresnelPowerFactor = 5;
        m.parametricRimLiftFactor = 0;
        m.rimLightingMixFactor = 1;
      }
    });
    const look = { ...MODELS.macDinh, ...(MODELS.nhanVat[id] ?? {}) };
    const box = new THREE.Box3().setFromObject(vrm.scene);
    const s = look.height / Math.max(0.1, box.max.y - box.min.y);
    const a = new VrmActor(vrm, wtype, A.clips, A.fps, url);
    a.obj.scale.setScalar(s);
    a.obj.updateMatrixWorld(true);
    a.obj.userData.yOff = look.yOffset - box.min.y * s;
    const wid = weaponId ?? MODELS.vuKhiMacDinh[wtype];
    if (wid) {
      const w = await loadWeapon(wid);
      const grip = MODELS.camVuKhi[wtype];
      // Xương chuẩn hóa có trục trùng hệ gốc ở tư thế chữ T nên cùng một cấu hình cầm đúng cho mọi mô hình.
      const bone = vrm.humanoid.getNormalizedBoneNode(grip.bone as any);
      if (w && bone) {
        const holder = new THREE.Group();
        const bs = bone.getWorldScale(new THREE.Vector3()).x || 1;
        holder.position.fromArray(grip.pos).divideScalar(bs);
        holder.rotation.set(...(grip.rot.map((d) => (d * Math.PI) / 180) as [number, number, number]));
        if (vrm.meta?.metaVersion === "0") {
          holder.position.set(-holder.position.x, holder.position.y, -holder.position.z);
          holder.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI));
        }
        holder.scale.setScalar(grip.scale / bs);
        w.position.y = -grip.at;
        holder.add(w);
        bone.add(holder);
        a.weapon = holder;
        const str = w.getObjectByName("string") as THREE.Mesh | undefined,
          gr = w.getObjectByName("grip"),
          nock =
            vrm.humanoid.getNormalizedBoneNode("rightMiddleProximal") ??
            vrm.humanoid.getNormalizedBoneNode("rightHand");
        if (wtype === "bow" && str?.isMesh && gr && nock) a.bow = new BowRig(str, gr, nock, a.obj);
        const lh = ["leftUpperArm", "leftLowerArm", "leftHand"].map((n) =>
          vrm.humanoid.getNormalizedBoneNode(n as any),
        );
        const rh = vrm.humanoid.getNormalizedBoneNode("rightHand");
        if (grip.tay2 && rh && lh.every(Boolean)) {
          const v0 = vrm.meta?.metaVersion === "0";
          const q = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(...(grip.tay2.rot.map((d) => (d * Math.PI) / 180) as [number, number, number])),
          );
          if (v0) {
            const F = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
            q.premultiply(F).multiply(F);
          }
          a.offHand = {
            limb: { a: lh[0]!, b: lh[1]!, c: lh[2]!, poleRest: new THREE.Vector3(0, 0, v0 ? 1 : -1) },
            w,
            at: grip.tay2.at,
            q,
            // Cổ tay so với điểm cầm, hệ bàn tay trái (đối xứng tay phải).
            off: new THREE.Vector3(-grip.pos[0], -grip.pos[1], -grip.pos[2])
              .multiply(new THREE.Vector3(-1, 1, 1))
              .multiply(v0 ? new THREE.Vector3(-1, 1, -1) : new THREE.Vector3(1, 1, 1)),
            r: rh,
          };
        }
        a.wfx = new WeaponFx(vrm, holder, wtype, POSES.vuKhi, (n) => a.duration(n), grip.scale, a.obj);
      }
    }
    return a;
  }

  has(name: string) {
    return this.actions.has(name);
  }

  /** Chuyển clip (pha trộn mượt). once: chạy một lần rồi giữ khung cuối. */
  play(name: string, o: { once?: boolean; fade?: number; speed?: number; restart?: boolean } = {}) {
    const a = this.actions.get(name);
    if (!a) return;
    a.timeScale = o.speed ?? 1;
    if (this.cur === a && !o.restart) return;
    a.reset();
    a.setLoop(o.once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
    a.clampWhenFinished = !!o.once;
    a.enabled = true;
    a.setEffectiveWeight(1);
    a.play();
    if (this.cur && this.cur !== a) {
      this.cur.crossFadeTo(a, o.fade ?? 0.15, false);
      if ((o.fade ?? 0.15) < 0.12) this.cloth.jolt();
    }
    this.cur = a;
    this.curName = name;
  }

  /** Độ kéo dây cung của clip đang chạy (rãnh str), 0 nếu clip không có. */
  strNow() {
    const a = this.cur;
    if (!a) return 0;
    const s = this.strs.get(a.getClip().name);
    if (!s) return 0;
    return s[Math.min(s.length - 1, Math.max(0, Math.round(a.time * this.fps)))];
  }

  duration(name: string) {
    return this.actions.get(name)?.getClip().duration ?? 0.5;
  }

  /** Gắn dáng tư thế (content/poses.yaml). */
  setDang(p: DangParams) {
    this.dang = p;
    this.layer = new PoseLayer(this.vrm, p, this.restHips, this.hipsH, this.obj);
  }
  dang: DangParams | null = null;
  private idle = { t: 0, wait: 0, end: 0, n: 0, cur: "", last: "", seed: 7 };

  /**
   * Hoạt ảnh chờ ngẫu nhiên (theo dáng): gọi mỗi khung khi đứng yên tay không; trả tên clip kèm "#n"
   * khi đang chạy một hoạt ảnh chờ, null khi dùng tư thế đứng thả lỏng.
   */
  idleVariant(dt: number, relaxing: boolean): string | null {
    const I = this.idle,
      ng = this.dang?.nghi;
    if (!ng || !relaxing) {
      I.t = 0;
      I.cur = "";
      I.wait = 0;
      return null;
    }
    I.t += dt;
    if (I.cur) {
      if (I.t < I.end) return `${I.cur}#${I.n}`;
      I.last = I.cur;
      I.cur = "";
      I.t = 0;
      I.wait = 0;
    }
    const rnd = () => ((I.seed = (I.seed * 16807) % 2147483647) - 1) / 2147483646;
    if (!I.wait) I.wait = ng.sau * (0.85 + 0.5 * rnd());
    if (I.t < I.wait) return null;
    const pool = ng.clip.filter((c) => this.has(c) && (c !== I.last || ng.clip.length === 1));
    if (!pool.length) return null;
    I.cur = pool[Math.floor(rnd() * pool.length) % pool.length];
    I.n++;
    I.end = I.t + this.duration(I.cur) - 0.15;
    return `${I.cur}#${I.n}`;
  }

  update(dt: number) {
    this.layer?.restore();
    this.mixer.update(dt);
    this.layer?.apply(dt, this.poseIn);
    if (this.layer) this.obj.rotation.z = this.layer.bank;
    this.grip2();
    this.cloth.update(dt);
    this.wfx?.update(dt);
    if (this.bow) this.bow.update(this.wfx && this.wfx.st !== "hand" ? 0 : this.strNow());
  }

  /** Tay trái đỡ vũ khí hai tay (gọi sau lớp tư thế). */
  grip2() {
    const o = this.offHand;
    if (!o || !this.weapon?.visible || (this.wfx && this.wfx.st !== "hand")) return;
    o.w.updateWorldMatrix(true, false);
    const shaft = o.w.localToWorld(_v.set(0, o.at, 0));
    const q = o.r.getWorldQuaternion(_q).multiply(o.q);
    const hs = o.limb.c.getWorldScale(_s).x;
    const wrist = shaft.add(_s.copy(o.off).multiplyScalar(hs).applyQuaternion(q));
    const pole = _p.set(0.6, -1, -0.5).normalize().applyQuaternion(this.obj.getWorldQuaternion(_q2));
    solveLimb(o.limb, wrist, pole, q);
  }

  dispose() {
    this.wfx?.dispose();
    this.mixer.stopAllAction();
    this.obj.removeFromParent();
    VRMUtils.deepDispose(this.vrm.scene);
  }
}

/** Màu nhuộm theo tên vật liệu VRoid (_HAIR, Tops/Bottoms _CLOTH, Shoes, EyeIris). */
function tintFor(look: { hair?: string; outfit?: string; eye?: string; accent?: string }) {
  const c = (h?: string) => (h ? new THREE.Color(h) : null);
  const hair = c(look.hair),
    outfit = c(look.outfit),
    eye = c(look.eye),
    accent = c(look.accent);
  return (name: string): THREE.Color | null => {
    if (/HAIR/i.test(name)) return hair;
    if (/EyeIris/i.test(name)) return eye;
    if (/Shoes/i.test(name)) return accent;
    if (/Tops|Bottoms|CLOTH/i.test(name)) return outfit;
    return null;
  };
}
