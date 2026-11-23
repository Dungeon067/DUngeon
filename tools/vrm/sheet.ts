/**
 * Bảng duyệt mô hình VRM (chỉ dùng khi dựng nhân vật, không vào bản build).
 * /tools/vrm/sheet.html?id=havy&yaw=0[&face=1][&clip=idle&t=0]
 * Chụp hàng loạt: node tools/vrm/shots.mjs <id> <thư mục>.
 * Xếp hàng so tỉ lệ (chính diện, camera trực giao, cùng tỉ lệ): sheet.html?ids=havy:bow,mailinh:cat
 * (ảnh: node tools/vrm/lineup.mjs <ảnh.png> havy:bow mailinh:cat ...).
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
// light=game: ánh sáng giữa trưa của renderer3d (nắng/trời như trong game, đặt theo hướng camera mặc định).
const gameLight = q.get("light") === "game";
const hemi = gameLight
  ? new THREE.HemisphereLight(new THREE.Color(0x3d8fe6).lerp(new THREE.Color(0xffffff), 0.55), 0x6a5a9a, 0.78 * 1.4)
  : new THREE.HemisphereLight(0xffffff, 0xb8b8c8, 2.2);
scene.add(hemi);
const sun = new THREE.DirectionalLight(gameLight ? 0xfff0d6 : 0xffffff, gameLight ? 2.4 : 2);
if (gameLight) sun.position.set(-8.5, 15.9, -7).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
else sun.position.set(1.5, 4, 3);
scene.add(sun);
const floor = new THREE.Mesh(new THREE.CircleGeometry(0.8, 48), new THREE.MeshBasicMaterial({ color: 0xdcd6ca }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
const ids = q.get("ids");
if (ids) await lineup(ids.split(","));
else await single();

async function lineup(list: string[]) {
  floor.visible = false;
  const gap = 0.75,
    acts: VrmActor[] = [];
  let top = 0;
  for (const [i, s] of list.entries()) {
    // id:vũKhí[:chiềuCao] — chiều cao (m) ghi đè, dùng khi so bản chưa có trong content (vd. npc/lamchi:bow:1.55)
    const [cid, wt = "sword", hs] = s.split(":");
    const a = await VrmActor.load(cid, wt as any, null);
    if (!a) throw new Error(`không tải được VRM ${cid}`);
    if (hs) {
      const bb = new THREE.Box3().setFromObject(a.obj);
      a.obj.scale.multiplyScalar(+hs / Math.max(0.1, bb.max.y - bb.min.y));
    }
    a.obj.position.set((i - (list.length - 1) / 2) * gap, a.obj.userData.yOff ?? 0, 0);
    scene.add(a.obj);
    a.play(clip, { once: true, fade: 0 });
    a.mixer.update(0);
    acts.push(a);
  }
  for (let i = 0; i < 60; i++) acts.forEach((a) => a.vrm.update(1 / 60));
  for (const a of acts) top = Math.max(top, new THREE.Box3().setFromObject(a.vrm.scene).max.y);
  // Vạch ngang mỗi 0,1 đơn vị chiều cao để so.
  const lines = new THREE.Group();
  for (let y = 0; y <= top + 0.05; y += 0.1) {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, y, -0.5), new THREE.Vector3(3, y, -0.5)]);
    lines.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: Math.round(y * 10) % 5 ? 0xe2ddd2 : 0xc9c1b2 })));
  }
  scene.add(lines);
  const halfW = (list.length * gap) / 2 + 0.05,
    halfH = Math.max(top * 0.56, (halfW * innerHeight) / innerWidth);
  const oc = new THREE.OrthographicCamera(
    (-halfH * innerWidth) / innerHeight,
    (halfH * innerWidth) / innerHeight,
    halfH,
    -halfH,
    0.05,
    50,
  );
  oc.position.set(0, top / 2, 10);
  oc.lookAt(0, top / 2, 0);
  gl.render(scene, oc);
  (window as any).ready = true;
  (window as any).info = { top };
}

async function single() {
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
}
