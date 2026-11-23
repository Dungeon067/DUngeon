/**
 * Nhân vật VRM (@pixiv/three-vrm, MToon, spring bone) với hoạt ảnh humanoid dùng chung.
 * Thả public/media/models/<id>/model.vrm là game tự nhận; thiếu thì dùng mẫu tạm trong content/models.yaml.
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";
import modelsRaw from "../../../content/models.yaml";
import posesRaw from "../../../content/poses.yaml";
import { validatePoses, type DangParams } from "../../data/poses-schema";
import { PoseLayer, type PoseInput } from "./pose-layer";
import { validateModels, type WeaponType } from "../../data/models-schema";
import { outlineMat, toonMat } from "./mat";

export const MODELS = validateModels(modelsRaw);
export const POSES = validatePoses(posesRaw);
const base = (import.meta as any).env?.BASE_URL ?? "/";
const loader = new GLTFLoader();
loader.register((p) => new VRMLoaderPlugin(p));
const glbLoader = new GLTFLoader();

type ClipData = { n: number; bones: Record<string, { q: number[][] }>; hips: number[][] };
let animLib: Promise<{ fps: number; clips: Record<string, ClipData> } | null> | null = null;
function loadAnims() {
  return (animLib ??= fetch(`${base}media/anim/humanoid.json`)
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
  /** S27: lớp chỉnh tư thế theo dáng; poseIn do renderer đặt mỗi khung. */
  layer: PoseLayer | null = null;
  poseIn: PoseInput = { mode: "relax", freeL: true, freeR: true };
  restHips: THREE.Vector3;
  hipsH: number;
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
    }
    this.obj.add(vrm.scene);
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
    if (this.cur && this.cur !== a) this.cur.crossFadeTo(a, o.fade ?? 0.15, false);
    this.cur = a;
    this.curName = name;
  }

  duration(name: string) {
    return this.actions.get(name)?.getClip().duration ?? 0.5;
  }

  /** Gắn dáng tư thế (content/poses.yaml). */
  setDang(p: DangParams) {
    this.layer = new PoseLayer(this.vrm, p, this.restHips, this.hipsH, this.obj);
  }

  update(dt: number) {
    this.layer?.restore();
    this.mixer.update(dt);
    this.layer?.apply(dt, this.poseIn);
    this.vrm.update(dt);
  }

  dispose() {
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
