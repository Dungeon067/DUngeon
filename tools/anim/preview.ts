/**
 * Trang xem trước hoạt ảnh (chỉ dùng khi làm hoạt ảnh, không vào bản build).
 * Mở qua vite dev: /tools/anim/preview.html?id=havy&w=sword&clip=sword2&yaw=-60
 * window.at(t): đặt thời điểm (giây) của clip rồi vẽ lại; window.dur: độ dài clip.
 */
import * as THREE from "three";
import { VrmActor } from "../../src/render3d/toon/actor";

const q = new URLSearchParams(location.search);
const id = q.get("id") ?? "havy",
  w = (q.get("w") ?? "sword") as any,
  clip = q.get("clip") ?? "idle",
  yaw = (+(q.get("yaw") ?? -50) * Math.PI) / 180;
const gl = new THREE.WebGLRenderer({ antialias: true });
gl.setSize(innerWidth, innerHeight);
document.body.appendChild(gl.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfd8e6);
const cam = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 50);
cam.position.set(Math.sin(yaw) * 5.2, 1.5, Math.cos(yaw) * 5.2);
cam.lookAt(0, 0.85, 0);
scene.add(new THREE.HemisphereLight(0xffffff, 0x8888aa, 2.2));
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(2, 5, 3);
scene.add(sun);
const floor = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32), new THREE.MeshBasicMaterial({ color: 0xa9b6c9 }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
const a = await VrmActor.load(id, w, null);
if (!a) throw new Error("không tải được VRM");
scene.add(a.obj);
a.obj.position.y = a.obj.userData.yOff ?? 0;
a.play(clip, { once: true, fade: 0 });
const act = (a as any).actions.get(clip) as THREE.AnimationAction;
(window as any).dur = act.getClip().duration;
(window as any).at = (t: number) => {
  act.time = t;
  a.mixer.update(0);
  a.vrm.update(0);
  gl.render(scene, cam);
  return true;
};
(window as any).ready = true;
