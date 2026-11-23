/**
 * Trang xem trước hoạt ảnh (chỉ dùng khi làm hoạt ảnh, không vào bản build).
 * Mở qua vite dev: /tools/anim/preview.html?id=havy&w=sword&clip=sword2&yaw=-60
 * window.at(t): đặt thời điểm (giây) của clip rồi vẽ lại; window.dur: độ dài clip.
 */
import * as THREE from "three";
import { VrmActor, POSES } from "../../src/render3d/toon/actor";

const q = new URLSearchParams(location.search);
const id = q.get("id") ?? "havy",
  w = (q.get("w") ?? "sword") as any,
  clip = q.get("clip") ?? "idle",
  yaw = (+(q.get("yaw") ?? -50) * Math.PI) / 180,
  dist = +(q.get("dist") ?? 5.2),
  ty = +(q.get("ty") ?? 0.85),
  dang = q.get("dang"),
  mode = (q.get("mode") ?? "relax") as any,
  lt = +(q.get("lt") ?? 0),
  sc = (q.get("sc") ?? "1,1").split(",").map(Number);
const gl = new THREE.WebGLRenderer({ antialias: true });
gl.setSize(innerWidth, innerHeight);
document.body.appendChild(gl.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfd8e6);
const cam = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 50);
cam.position.set(Math.sin(yaw) * dist, ty + (0.65 * dist) / 5.2, Math.cos(yaw) * dist);
cam.lookAt(0, ty, 0);
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
if (dang) a.setDang((POSES.dang as any)[dang]);
a.poseIn = { mode, freeL: w !== "bow", freeR: w === "bow" };
// Mô phỏng dáng khi chưa có mô hình riêng: co giãn cao/ngang.
a.obj.scale.multiply(new THREE.Vector3(sc[1], sc[0], sc[1]));
a.obj.position.y = a.obj.userData.yOff ?? 0;
a.play(clip, { once: true, fade: 0 });
const act = (a as any).actions.get(clip) as THREE.AnimationAction;
(window as any).dur = act.getClip().duration;
(window as any).at = (t: number) => {
  act.time = t;
  a.layer?.restore();
  a.mixer.update(0);
  if (a.layer) {
    for (let i = 0; i < 40; i++) {
      a.layer.restore();
      a.mixer.update(0);
      a.layer.apply(0.05, a.poseIn);
    }
    a.layer.t = lt + t;
    a.layer.restore();
    a.mixer.update(0);
    a.layer.apply(0, a.poseIn);
  }
  a.vrm.update(0);
  gl.render(scene, cam);
  return true;
};
(window as any).ready = true;
