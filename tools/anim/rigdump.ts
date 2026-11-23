/**
 * Xuất vị trí nghỉ (chữ T) của xương humanoid chuẩn hóa, đổi theo chiều cao hông, làm khung xương tham chiếu cho IK ở author.ts.
 * Mở qua vite dev: /tools/anim/rigdump.html?id=havy; kết quả ở window.rig (chạy tools/anim/rigdump.mjs để ghi tools/anim/rig.json).
 */
import * as THREE from "three";
import { VrmActor } from "../../src/render3d/toon/actor";

const id = new URLSearchParams(location.search).get("id") ?? "havy";
const a = await VrmActor.load(id, "sword", null);
if (!a) throw new Error("không tải được VRM");
const hum = a.vrm.humanoid;
hum.resetNormalizedPose();
a.vrm.scene.updateMatrixWorld(true);
const hips = hum.getNormalizedBoneNode("hips")!.getWorldPosition(new THREE.Vector3());
const foot = hum.getNormalizedBoneNode("leftFoot")!.getWorldPosition(new THREE.Vector3());
const H = hips.y - Math.min(foot.y, 0) || 1;
const bones: Record<string, { parent: string | null; pos: number[] }> = {};
for (const [name, b] of Object.entries(hum.humanBones)) {
  const n = hum.getNormalizedBoneNode(name as any);
  if (!n || !b) continue;
  let p = n.parent,
    parent: string | null = null;
  while (p && !parent) {
    parent = Object.keys(hum.humanBones).find((k) => hum.getNormalizedBoneNode(k as any) === p) ?? null;
    p = p.parent;
  }
  const w = n.getWorldPosition(new THREE.Vector3()).sub(hips).divideScalar(H);
  bones[name] = { parent, pos: w.toArray().map((v) => +v.toFixed(4)) };
}
(window as any).rig = { id, hipsHeight: +H.toFixed(4), bones };
(window as any).ready = true;
