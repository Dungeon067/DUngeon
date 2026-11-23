// In collider capsule (tọa độ thế giới, tư thế nghỉ) và tham số spring vải của một VRM để kiểm tra.
// node tools/vrm/colliders.mjs <model.vrm>
import { readFileSync } from "node:fs";
import * as THREE from "three";
const b = readFileSync(process.argv[2]),
  n = b.readUInt32LE(12),
  j = JSON.parse(b.subarray(20, 20 + n).toString());
const par = {};
j.nodes.forEach((nd, i) => (nd.children ?? []).forEach((c) => (par[c] = i)));
const M = (i) => {
  const nd = j.nodes[i],
    m = new THREE.Matrix4().compose(
      new THREE.Vector3(...(nd.translation ?? [0, 0, 0])),
      new THREE.Quaternion(...(nd.rotation ?? [0, 0, 0, 1])),
      new THREE.Vector3(...(nd.scale ?? [1, 1, 1])),
    );
  return par[i] == null ? m : M(par[i]).multiply(m);
};
const f = (v) => [v.x, v.y, v.z].map((x) => x.toFixed(3)).join(",");
const at = (i, o) => new THREE.Vector3(...o).applyMatrix4(M(i));
const sb = j.extensions.VRMC_springBone;
for (const c of sb.colliders) {
  const s = c.shape.capsule ?? c.shape.sphere;
  if (!c.shape.capsule) continue;
  console.log(j.nodes[c.node].name, "r", s.radius.toFixed(3), f(at(c.node, s.offset)), "->", f(at(c.node, s.tail)));
}
for (const nm of ["J_Bip_C_Hips", "J_Bip_L_UpperLeg", "J_Bip_L_LowerLeg", "J_Bip_L_Foot"])
  console.log(
    nm,
    f(
      at(
        j.nodes.findIndex((x) => x.name === nm),
        [0, 0, 0],
      ),
    ),
  );
for (const s of sb.springs)
  if (!/Hair|Bust/.test(s.name))
    console.log(
      "spring",
      s.name,
      j.nodes[s.joints[0].node].name,
      "center",
      s.center != null ? j.nodes[s.center].name : "-",
      "st",
      s.joints[0].stiffness.toFixed(2),
      "g",
      s.joints[0].gravityPower.toFixed(2),
      "cg",
      s.colliderGroups?.length,
    );
console.log("mats", j.materials.map((m) => m.name + (m.doubleSided ? "*" : "")).join(" | "));
