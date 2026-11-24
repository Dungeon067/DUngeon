/**
 * S27: dựng lại dáng đi / chạy / chạy nhanh từ clip gốc UAL (Quaternius, CC0).
 * Clip gốc cúi gập ngực (upperChest ≈ 43° khi chạy, ≈ 52° khi chạy nhanh) nên lưng bị gù.
 * Ở đây giữ nhịp chân và tay của clip gốc, chỉ sửa thân trên:
 *  - lưng thẳng: spine / chest / upperChest gần như không gập, ngực hơi mở, vai kéo nhẹ ra sau;
 *  - đổ người lấy từ hông (đi ≈ 3°, chạy ≈ 10°, chạy nhanh ≈ 15°), đùi giữ hướng cũ để bước không đổi;
 *  - neck / head bù ngược để mắt nhìn ngang;
 *  - nhún hông nhẹ lại (clip gốc hạ hông rất sâu), chân trụ giải IK để bàn chân vẫn bám đất;
 *  - chân lúc đưa lên nhấc gối rõ hơn.
 * Đọc từ bản gốc `ual-move.json` (không đọc lại humanoid.json) nên nướng nhiều lần vẫn cho cùng kết quả.
 */
import { readFileSync } from "node:fs";
import * as THREE from "three";
import { Rig, type ClipData } from "../pose";
import { solveLimb } from "../../../src/render3d/toon/ik";

const SRC = JSON.parse(readFileSync(new URL("./ual-move.json", import.meta.url), "utf8")).clips as Record<
  string,
  ClipData
>;
const D = Math.PI / 180;

interface Upright {
  /** Đổ người từ hông (độ). */
  lean: number;
  /** Nhấc gối thêm khi chân đang đưa (tỉ lệ). */
  knee: number;
  /** Mở vai ra sau (độ). */
  vai: number;
  /** Giữ lại bao nhiêu phần nhún hông của clip gốc (clip gốc nhún sâu, gối gập ≈ 80°). */
  nhun: number;
}
const CFG: Record<string, Upright> = {
  walk: { lean: 3, knee: 0.1, vai: 4, nhun: 1 },
  run: { lean: 10, knee: 0.3, vai: 6, nhun: 0.45 },
  sprint: { lean: 15, knee: 0.3, vai: 6, nhun: 0.55 },
};
/** Độ gập cục bộ (pitch) đặt cho từng đốt sống, âm là ưỡn ngực. */
const SPINE: Record<string, number> = { spine: 0, chest: -1, upperChest: -3 };

const e = new THREE.Euler(),
  q = new THREE.Quaternion(),
  v = new THREE.Vector3();
function setPitch(b: THREE.Object3D, pitch: number, keep = 1) {
  e.setFromQuaternion(b.quaternion, "YXZ");
  b.quaternion.setFromEuler(e.set(pitch * D, e.y * keep, e.z * keep, "YXZ"));
}
/** Góc nghiêng tới trước của trục +Y của xương trong hệ thế giới (độ). */
function worldPitch(b: THREE.Object3D) {
  b.updateWorldMatrix(true, false);
  v.set(0, 1, 0).applyQuaternion(b.getWorldQuaternion(q));
  return Math.atan2(v.z, v.y) / D;
}

export function upright(name: keyof typeof CFG, names: string[], rig = new Rig()): ClipData {
  const src = SRC[name],
    c = CFG[name];
  const out: ClipData = { n: src.n, bones: {}, hips: [] };
  for (const b of names) out.bones[b] = { q: [] };
  const B = rig.bones;
  // Độ cao bàn chân theo khung, để biết chân nào đang đưa (trên không).
  const fy: Record<string, number[]> = { left: [], right: [] };
  for (let i = 0; i < src.n; i++) {
    rig.setFrame(src, i);
    for (const s of ["left", "right"]) fy[s].push(B[s + "Foot"].getWorldPosition(v).y);
  }
  const lo = { left: Math.min(...fy.left), right: Math.min(...fy.right) } as Record<string, number>;
  const legW = new THREE.Quaternion();
  const hy = src.hips.map((h) => h[1]),
    top = Math.max(...hy);
  for (let i = 0; i < src.n; i++) {
    rig.setFrame(src, i);
    const legs = ["leftUpperLeg", "rightUpperLeg"].map((n) => B[n].getWorldQuaternion(new THREE.Quaternion()));
    const o = ["left", "right"].map((s) => ({
      ank: B[s + "Foot"].getWorldPosition(new THREE.Vector3()),
      fq: B[s + "Foot"].getWorldQuaternion(new THREE.Quaternion()),
      pole: B[s + "LowerLeg"]
        .getWorldPosition(new THREE.Vector3())
        .sub(
          B[s + "UpperLeg"]
            .getWorldPosition(new THREE.Vector3())
            .add(B[s + "Foot"].getWorldPosition(v))
            .multiplyScalar(0.5),
        )
        .normalize(),
    }));
    const dy = (top - hy[i]) * (1 - c.nhun);
    B.hips.position.y += dy;
    setPitch(B.hips, c.lean);
    for (const [n, p] of Object.entries(SPINE)) setPitch(B[n], p, 0.8);
    // Vai kéo nhẹ ra sau, ngực mở.
    B.leftShoulder.quaternion.multiply(q.setFromAxisAngle(v.set(0, 1, 0), c.vai * D));
    B.rightShoulder.quaternion.multiply(q.setFromAxisAngle(v.set(0, 1, 0), -c.vai * D));
    rig.root.updateMatrixWorld(true);
    // Đùi giữ hướng thế giới như clip gốc.
    ["leftUpperLeg", "rightUpperLeg"].forEach((n, k) => {
      const par = B[n].parent!.getWorldQuaternion(legW);
      B[n].quaternion.copy(par.invert().multiply(legs[k]));
    });
    // Nhấc gối khi chân đang đưa.
    for (const s of ["left", "right"]) {
      const up = THREE.MathUtils.smoothstep(fy[s][i] - lo[s], 0.03, 0.12);
      e.setFromQuaternion(B[s + "UpperLeg"].quaternion, "YXZ");
      const fwd = Math.max(0, -e.x / D);
      if (up > 0 && fwd > 0) {
        const k = c.knee * up * Math.min(fwd, 40);
        B[s + "UpperLeg"].quaternion.premultiply(q.setFromAxisAngle(v.set(1, 0, 0), -k * D));
        B[s + "LowerLeg"].quaternion.multiply(q.setFromAxisAngle(v.set(1, 0, 0), 1.4 * k * D));
      }
    }
    // Chân trụ: giữ cổ chân ở chỗ cũ; chân đang đưa đi lên theo hông.
    rig.root.updateMatrixWorld(true);
    (["l", "r"] as const).forEach((k, j) => {
      const s = k === "l" ? "left" : "right";
      const ws = 1 - THREE.MathUtils.smoothstep(fy[s][i] - lo[s], 0.05, 0.13);
      if (ws < 0.01 || dy < 1e-4) return;
      const tgt = o[j].ank.clone().add(v.set(0, (1 - ws) * dy, 0));
      solveLimb(rig.legs[k], tgt, o[j].pole, o[j].fq);
    });
    // Bù ở cổ và đầu để mắt nhìn ngang.
    rig.root.updateMatrixWorld(true);
    const pc = worldPitch(B.upperChest);
    setPitch(B.neck, -pc * 0.45);
    rig.root.updateMatrixWorld(true);
    const pn = worldPitch(B.neck);
    setPitch(B.head, -pn + 2);
    rig.root.updateMatrixWorld(true);
    for (const b of names) out.bones[b].q.push(B[b].quaternion.toArray().map((x) => +x.toFixed(4)));
    out.hips.push(B.hips.position.toArray().map((x) => +x.toFixed(4)));
  }
  return out;
}
export const MOVE_BASE = Object.keys(CFG) as (keyof typeof CFG)[];
