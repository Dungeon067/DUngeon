/**
 * Nhân vật VRM (@pixiv/three-vrm, MToon, spring bone) với hoạt ảnh humanoid dùng chung.
 * Thả public/media/models/<id>/model.vrm là game tự nhận; thiếu thì dùng mẫu tạm trong content/models.yaml.
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";
import modelsRaw from "../../../content/models.yaml";
import { validateModels, type WeaponType } from "../../data/models-schema";
import { outlineMat, toonMat } from "./mat";

export const MODELS = validateModels(modelsRaw);
const base = (import.meta as any).env?.BASE_URL ?? "/";
const loader = new GLTFLoader();
loader.register((p) => new VRMLoaderPlugin(p));
const glbLoader = new GLTFLoader();

type ClipData = { n: number; bones: Record<string, { q: number[][] }>; hips: number[][] };
let animLib: Promise<{ fps: number; clips: Record<string, ClipData> } | null> | null = null;
function loadAnims() {
  // Clip riêng theo nhân vật (S30, `<id>.<chiêu>`) nằm ở kits.json; thiếu file vẫn chạy bằng clip chung.
  const kits = fetch(`${base}media/anim/kits.json`)
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}));
  return (animLib ??= fetch(`${base}media/anim/humanoid.json`)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .then(async (h) => h && { ...h, clips: { ...h.clips, ...(((await kits) as any)?.clips ?? {}) } }));
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

const _q = new THREE.Quaternion();

/** Khớp spring bone (vải, tóc): góc lệch tối đa (rad) và trọng số gió theo `vai` trong content/models.yaml. */
export interface ClothJoint {
  bone: THREE.Object3D;
  rest: THREE.Quaternion;
  loai: string;
  max: number;
  gio: number;
}

export class VrmActor {
  obj = new THREE.Group();
  mixer: THREE.AnimationMixer;
  private actions = new Map<string, THREE.AnimationAction>();
  private cur: THREE.AnimationAction | null = null;
  curName = "";
  weapon: THREE.Object3D | null = null;
  /** Đọc `gio` ở đây để cộng lực gió (S27); `max` luôn được giữ sau mỗi bước mô phỏng. */
  clothJoints: ClothJoint[] = [];
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

  setupCloth(id: string) {
    const V = MODELS.vai,
      rules = [...Object.entries(MODELS.nhanVat[id]?.vai ?? MODELS.npc[id]?.vai ?? {}), ...V.xuong].map(
        ([re, l]) => [new RegExp(re, "i"), l] as const,
      );
    for (const j of this.vrm.springBoneManager?.joints ?? []) {
      const loai = rules.find(([re]) => re.test(j.bone.name))?.[1] ?? V.macDinh,
        t = V.loai[loai]!;
      this.clothJoints.push({
        bone: j.bone,
        rest: j.bone.quaternion.clone(),
        loai,
        max: (t.gocMax * Math.PI) / 180,
        gio: t.gio,
      });
    }
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
    // Hướng nghỉ của xương tay thô khác nhau giữa các bản xuất (VRoid, Blender): quy `camVuKhi` về
    // trục của mô hình để cùng một cấu hình cầm vũ khí đúng cho mọi file.
    const cfg = MODELS.nhanVat[id],
      grip = { ...MODELS.camVuKhi[wtype], ...(!weaponId && cfg?.vuKhi ? cfg.camVuKhi : null) };
    const bone = vrm.humanoid.getRawBoneNode(grip.bone as any);
    vrm.scene.updateMatrixWorld(true);
    const restInv = bone
      ? vrm.scene
          .getWorldQuaternion(new THREE.Quaternion())
          .invert()
          .multiply(bone.getWorldQuaternion(new THREE.Quaternion()))
          .invert()
      : new THREE.Quaternion();
    const a = new VrmActor(vrm, wtype, A.clips, A.fps, url);
    a.setupCloth(id);
    a.obj.scale.setScalar(s);
    a.obj.updateMatrixWorld(true);
    a.obj.userData.yOff = look.yOffset - box.min.y * s;
    const wid = weaponId ?? cfg?.vuKhi ?? MODELS.vuKhiMacDinh[wtype];
    if (wid) {
      const w = await loadWeapon(wid);
      if (w && bone) {
        const holder = new THREE.Group();
        const bs = bone.getWorldScale(new THREE.Vector3()).x || 1;
        holder.position.fromArray(grip.pos).applyQuaternion(restInv).divideScalar(bs);
        holder.quaternion
          .setFromEuler(new THREE.Euler(...(grip.rot.map((d) => (d * Math.PI) / 180) as [number, number, number])))
          .premultiply(restInv);
        holder.scale.setScalar(grip.scale / bs);
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

  update(dt: number) {
    this.mixer.update(dt);
    // Khung hình giật (dt lớn) làm spring bone văng: giới hạn bước mô phỏng.
    this.vrm.update(Math.min(dt, 1 / 30));
    // Váy, vạt áo không lật quá giới hạn của loại vải so với tư thế nghỉ, dù gió mạnh tới đâu.
    for (const c of this.clothJoints)
      if (c.rest.angleTo(c.bone.quaternion) > c.max) {
        c.bone.quaternion.copy(_q.copy(c.rest).rotateTowards(c.bone.quaternion, c.max));
        // Spring bone tắt matrixAutoUpdate: tự cập nhật ma trận để giới hạn có hiệu lực khi render.
        c.bone.updateMatrix();
      }
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
