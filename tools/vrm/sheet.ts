/**
 * Bảng duyệt mô hình VRM (chỉ dùng khi dựng nhân vật, không vào bản build).
 * /tools/vrm/sheet.html?id=havy&yaw=0[&face=1][&clip=idle&t=0]
 * Chụp hàng loạt: node tools/vrm/shots.mjs <id> <thư mục>.
 */
import * as THREE from "three";
import { VrmActor } from "../../src/render3d/toon/actor";

const q = new URLSearchParams(location.search);
const id = q.get("id") ?? "havy",
  w = (q.get("w") ?? "sword") as any,
  clip = q.get("clip") ?? "idle",
  face = q.has("face"),
  yaw = (+(q.get("yaw") ?? 0) * Math.PI) / 180;
const gl = new THREE.WebGLRenderer({ antialias: true });
gl.setPixelRatio(1);
gl.setSize(innerWidth, innerHeight);
document.body.appendChild(gl.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f1ea);
const cam = new THREE.PerspectiveCamera(face ? 20 : 26, innerWidth / innerHeight, 0.05, 50);
scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b8c8, 2.2));
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(1.5, 4, 3);
scene.add(sun);
const floor = new THREE.Mesh(new THREE.CircleGeometry(0.8, 48), new THREE.MeshBasicMaterial({ color: 0xdcd6ca }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
const a = await VrmActor.load(id, w, null);
if (!a) throw new Error("không tải được VRM");
scene.add(a.obj);
a.obj.position.y = a.obj.userData.yOff ?? 0;
a.play(clip, { once: true, fade: 0 });
const act = (a as any).actions.get(clip) as THREE.AnimationAction;
act.time = +(q.get("t") ?? 0);
a.mixer.update(0);
a.vrm.update(0);
a.obj.updateMatrixWorld(true);
const box = new THREE.Box3().setFromObject(a.vrm.scene);
const h = box.max.y - box.min.y;
const head = a.vrm.humanoid.getNormalizedBoneNode("head")!.getWorldPosition(new THREE.Vector3());
const tgt = face ? head.clone().add(new THREE.Vector3(0, h * 0.04, 0)) : new THREE.Vector3(0, box.min.y + h * 0.5, 0);
const dist = face ? h * 1.15 : h * 2.55;
cam.position.set(tgt.x + Math.sin(yaw) * dist, tgt.y + (face ? 0.02 : h * 0.08), tgt.z + Math.cos(yaw) * dist);
cam.lookAt(tgt);
// cho spring bone đứng yên
for (let i = 0; i < 60; i++) a.vrm.update(1 / 60);
gl.render(scene, cam);
(window as any).ready = true;
(window as any).info = { h };
