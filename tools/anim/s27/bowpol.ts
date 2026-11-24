/** Cung: thế chờ một tay thả thấp bên hông, cung nghiêng chéo; rút / cất theo mocap Mixamo (Longbow pack). */
import type { MocapRecipe } from "../mocap";
import type { Hand, OverlayDef, Rig, V3 } from "../pose";
import { solveLimb } from "../../../src/render3d/toon/ik";
import * as THREE from "three";
import { fem } from "./fem";
import { fing, ik, kn, polish, rot, SOFT, wgrip } from "./polish";

const BW = "mx/bow_standing_";
export const BW_MC: Record<string, MocapRecipe> = {
  "mc.bwIdle": { file: BW + "idle_01", from: 0, to: 5.0, loop: true, inPlace: true, straight: 0.85, yaw: -100 },
  "mc.bwDraw": { file: BW + "equip_bow", from: 0, to: 0.89, inPlace: true, straight: 0.85 },
  "mc.bwStow": { file: BW + "disarm_bow", from: 0, to: 1.09, inPlace: true, straight: 0.85 },
};
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
function ikHip(r: Parameters<OverlayDef["mod"]>[0], k: "l" | "r", h: Hand, w = 1) {
  ik(r, k, { ...h, p: add(r.pos("hips").toArray() as V3, h.p) }, w);
}
/** Tay trái thả thấp bên hông, thân cung nghiêng chéo (đầu trên ra trước, ra ngoài). */
export const BW_LOW = wgrip([0.33, -0.02, 0.1], [0.3, 0.8, 0.5], [0, 0, 1], [0.6, -0.1, -0.7]);
const R_REL: Hand = { p: [-0.3, 0.0, 0.06], fing: [-0.25, -1, 0.15], thumb: [0, 0, 1], elbow: [-0.5, 0, -0.8] };
/** Độ kéo dây theo khung của từng clip (build.ts điền trước khi chồng lớp). */
export const STRS: Record<string, number[]> = {};
/** Trọng số thế kéo: theo độ kéo dây, sau khi thả giảm dần trong vài khung. */
function drawW(from: string) {
  const s = STRS[from] ?? [];
  const w: number[] = [];
  s.forEach((v, i) => w.push(Math.max(THREE.MathUtils.smoothstep(v, 0.15, 0.85), (w[i - 1] ?? 0) - 0.2)));
  return w;
}
const yawDeg = (v: THREE.Vector3) => (Math.atan2(v.x, v.z) * 180) / Math.PI;
/** Thế kéo cung chuẩn, tên bay theo +Z: vai trước, vai sau và mũi tên trên một đường; đầu quay theo hướng bắn;
 *  nock (ngón giữa) neo dưới gò má, dây chạm cằm; khuỷu kéo ngang vai thẳng sau trục tên; tay cầm cung duỗi, vai hạ. */
export function archer(r: Rig, w: number) {
  if (w <= 0.001) return;
  const qL = r.bones.leftHand.getWorldQuaternion(new THREE.Quaternion()),
    qR = r.bones.rightHand.getWorldQuaternion(new THREE.Quaternion());
  const off = r.pos("rightMiddleIntermediate").sub(r.pos("rightHand"));
  for (const b of ["leftShoulder", "rightShoulder"]) r.bones[b]?.quaternion.slerp(new THREE.Quaternion(), 0.7 * w);
  r.root.updateMatrixWorld(true);
  const d = yawDeg(r.pos("leftUpperArm").sub(r.pos("rightUpperArm")));
  rot(r, "chest", [0, -d * 0.5 * w, 0]);
  rot(r, "upperChest", [0, -d * 0.5 * w, 0]);
  const f = new THREE.Vector3(0, 0, 1).applyQuaternion(r.bones.head.getWorldQuaternion(new THREE.Quaternion()));
  const hy = yawDeg(f),
    hp = (Math.asin(THREE.MathUtils.clamp(f.y, -1, 1)) * 180) / Math.PI;
  rot(r, "neck", [hp * 0.4 * w, -hy * 0.5 * w, 0]);
  rot(r, "head", [hp * 0.6 * w, -hy * 0.5 * w, 0]);
  const H = r.pos("head");
  // Nock: góc miệng / dưới gò má bên phải, hơi trước mặt.
  const N = H.clone().add(new THREE.Vector3(-0.035, -0.015, 0.07));
  const blend = (L: (typeof r.arms)["l"], t: THREE.Vector3, pole: THREE.Vector3, q: THREE.Quaternion) => {
    const old = [L.a, L.b, L.c].map((b) => b.quaternion.clone());
    solveLimb(L, t, pole, q);
    [L.a, L.b, L.c].forEach((b, i) => b.quaternion.copy(old[i].slerp(b.quaternion, w)));
    r.root.updateMatrixWorld(true);
  };
  blend(r.arms.r, N.clone().sub(off), new THREE.Vector3(0.35, -0.2, -1).normalize(), qR);
  const S = r.pos("leftUpperArm");
  const len = r.pos("leftLowerArm").distanceTo(S) + r.pos("leftHand").distanceTo(r.pos("leftLowerArm"));
  const Lt = new THREE.Vector3(N.x + 0.01, N.y - 0.05, 0);
  const dx = Lt.x - S.x,
    dy = Lt.y - S.y;
  Lt.z = S.z + Math.sqrt(Math.max(0.01, (0.97 * len) ** 2 - dx * dx - dy * dy));
  blend(r.arms.l, Lt, new THREE.Vector3(0.6, -0.8, 0).normalize(), qL);
}
const arch = (from: string, extra?: OverlayDef["mod"]): OverlayDef => {
  let w: number[] | null = null;
  return polish(from, (r, f, i) => {
    extra?.(r, f, i);
    archer(r, (w ??= drawW(from))[i] ?? 0);
  });
};
/** Bản nam: bắn thường và ngắm theo thế kéo chuẩn (chạy trước bản nữ). */
export const BW_ARCH: Record<string, OverlayDef> = {
  bow1: arch("bow1"),
  bow2: arch("bow2"),
  bow3: arch("bow3"),
  bowAim: arch("bowAim"),
};
export const BW_POL: Record<string, OverlayDef> = {
  // Nam: đứng tự nhiên (idle nam), không khuỵu dạng chân; cung thả thấp bên hông.
  bowReady: polish("relaxNam", (r) => {
    ikHip(r, "l", BW_LOW);
    ikHip(r, "r", R_REL);
    fing(r, "l", { c: 0.85, t: 0.8, ci: 0.75, s: 2 });
    fing(r, "r", SOFT);
  }),
  bwDraw: polish("mc.bwDraw", (r, f) => {
    ikHip(
      r,
      "l",
      BW_LOW,
      kn(
        [
          [0.7, 0],
          [1, 1],
        ],
        f,
      ),
    );
    fing(r, "r", SOFT);
  }),
  bwStow: polish("mc.bwStow", (r, f) => {
    ikHip(
      r,
      "l",
      BW_LOW,
      kn(
        [
          [0, 1],
          [0.25, 0],
        ],
        f,
      ),
    );
    fing(r, "r", SOFT);
  }),
};

/** Bản nữ: thế chờ trên nền idle nữ (đứng thẳng, hông lệch), cung thả thấp chéo trước đùi; bắn / ngắm khép chân, trọng tâm cao. */
const BW_THIGH = wgrip([0.19, -0.12, 0.17], [-0.5, 0.8, 0.3], [0, 0, 1], [0.7, -0.2, -0.5]);
const SHOT = { half: 0.13, k: 0.6, up: 0.75 };
/** Bản nữ: khép chân rồi đặt lại thế kéo chuẩn (lớp chân làm lệch vai). */
function femArch(from: string, up = 0.75): OverlayDef {
  let w: number[] | null = null;
  return fem(from, { ...SHOT, up }, (r, _f, i) => archer(r, (w ??= drawW(from))[i] ?? 0));
}
export const BW_FEM: Record<string, OverlayDef> = {
  bowReadyF: polish("relax", (r) => {
    ikHip(r, "l", BW_THIGH);
    fing(r, "l", { c: 0.85, t: 0.8, ci: 0.75, s: 2 });
    fing(r, "r", SOFT);
    rot(r, "head", [0, 0, -4]);
  }),
  bow1F: femArch("bow1"),
  bow2F: femArch("bow2"),
  bow3F: femArch("bow3"),
  bowAimF: femArch("bowAim", 0.85),
  bwDrawF: fem("bwDraw"),
  bwStowF: fem("bwStow"),
  bowSkillF: fem("bowSkill", { half: 0.14 }),
  bowBurstF: fem("bowBurst", { half: 0.14 }),
};
