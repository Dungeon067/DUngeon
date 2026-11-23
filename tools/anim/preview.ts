/**
 * Trang xem trước hoạt ảnh (chỉ dùng khi làm hoạt ảnh, không vào bản build).
 * Mở qua vite dev: /tools/anim/preview.html?id=havy&w=sword&clip=sword2&yaw=-60
 * window.at(t): đặt thời điểm (giây) của clip rồi vẽ lại; window.dur: độ dài clip.
 */
import * as THREE from "three";
import { VrmActor, POSES, MODELS } from "../../src/render3d/toon/actor";
import { HeroFx } from "../../src/render3d/toon/motion-fx";

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
// Video duyệt: rút ngắn thời gian chờ trước hoạt ảnh chờ ngẫu nhiên.
if (q.get("nghi") && a.dang) a.dang = { ...a.dang, nghi: { ...a.dang.nghi, sau: +q.get("nghi")! } };
a.poseIn = { mode, freeL: w !== "bow", freeR: w === "bow" };
// Tay không (vũ khí đã cất): ẩn vũ khí, hai tay rảnh.
if (clip === "relax" || clip.startsWith("stow") || q.get("nov")) {
  if (a.weapon && (clip === "relax" || q.get("nov"))) a.weapon.visible = false;
  if (a.wfx && q.get("nov")) a.wfx.st = "gone";
  a.poseIn = { mode, freeL: true, freeR: true };
}
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
  a.bow?.update(a.strNow());
  gl.render(scene, cam);
  return true;
};
if (q.get("seq")) sequence(q.get("seq")!);
(window as any).ready = true;

/**
 * Chuỗi cảnh như trong game (cho video duyệt): seq=ready:0.8,atk1,atk2,atk3,skill,burst,idle:4,run:1,atk1 ...
 * window.step(): tiến 1/30 giây; window.nframes: tổng số khung. Vũ khí rút / cất theo cùng luật với renderer.
 */
function sequence(src: string) {
  const WIN: Record<string, number> = { atk1: 0.5, atk2: 0.5, atk3: 0.62, skill: 0.75, burst: 1.3 };
  const VI: Record<string, string> = {
    atk1: "Đòn 1",
    atk2: "Đòn 2",
    atk3: "Đòn 3 (đòn kết)",
    skill: "Kỹ năng",
    burst: "Nộ",
    charge: "Ngắm / tụ lực",
    idle: "Đứng yên",
    run: "Chạy",
    sprint: "Chạy nhanh",
    turn: "Chạy rẽ",
    stop: "Dừng (nhịp hãm)",
    dash: "Lướt",
    jump: "Nhảy",
    ready: "Thế chờ",
  };
  const A = MODELS.hoatAnh[w as keyof typeof MODELS.hoatAnh];
  const segs = src.split(",").map((x) => {
    const [k, d] = x.split(":");
    return { k, d: d ? +d : WIN[k] / (k.startsWith("atk") ? A.speed : 1) };
  });
  let T = 0,
    lastAct = q.get("nov") ? -99 : 0,
    si = -1,
    segT = 0,
    cur = "";
  const lab = document.createElement("div");
  lab.style.cssText = "position:fixed;left:12px;top:10px;font:600 20px sans-serif;color:#223;";
  document.body.appendChild(lab);
  if (a!.wfx) a!.wfx.color.set(q.get("col") ?? "#7fd0ff");
  const fx = new HeroFx();
  fx.color(q.get("col") ?? "#7fd0ff", q.get("col2") ?? q.get("col") ?? "#bfe8ff");
  scene.add(fx.group);
  const MOVE = new Set(["run", "sprint", "turn"]);
  const play = (c: string, o: { once?: boolean; speed?: number; fade?: number; restart?: boolean } = {}) => {
    if (c === cur && !o.restart) return;
    cur = c;
    a!.play(c, { fade: 0.12, ...o });
  };
  (window as any).nframes = Math.round(segs.reduce((s, x) => s + x.d, 0) * 30);
  (window as any).step = () => {
    const dt = 1 / 30;
    if (si < 0 || segT >= segs[si].d) {
      si++;
      segT = 0;
      const s = segs[Math.min(si, segs.length - 1)];
      if (WIN[s.k]) {
        lastAct = T;
        a!.wfx?.want(true, true, scene);
        const c = s.k.startsWith("atk") ? A.atk[+s.k.slice(3) - 1] : s.k === "skill" ? A.skill : A.burst;
        play(c, { once: true, speed: a!.duration(c) / s.d, fade: 0.08, restart: true });
      }
    }
    const s = segs[Math.min(si, segs.length - 1)];
    const out = T - lastAct < POSES.vuKhi.cho || s.k === "charge";
    const standing = !MOVE.has(s.k) && s.k !== "dash" && s.k !== "jump";
    a!.wfx?.want(out, standing, scene);
    const armed = !a!.wfx || a!.wfx.st === "hand" || a!.wfx.st === "stowing";
    const relaxing = s.k === "idle" && (!a!.wfx || a!.wfx.st === "gone");
    const iv = a!.idleVariant(dt, relaxing);
    // Lướt / nhảy: mô phỏng tại chỗ (nhảy có quỹ đạo đứng để thấy co chân ở đỉnh).
    const JD = s.d,
      ju = s.k === "jump" ? segT / JD : 0;
    a!.obj.position.y =
      (a!.obj.userData.yOff ?? 0) + (s.k === "jump" && ju < 0.8 ? 0.55 * 4 * (ju / 0.8) * (1 - ju / 0.8) : 0);
    if (s.k === "turn") a!.obj.rotation.y += dt * 2.4;
    else a!.obj.rotation.y *= 1 - Math.min(1, dt * 3);
    if (!WIN[s.k]) {
      if (s.k === "charge") play(A.charge);
      else if (s.k === "run" || s.k === "turn") play(armed ? (A.move?.run ?? "run") : "run");
      else if (s.k === "sprint") play(armed ? (A.move?.sprint ?? "sprint") : "sprint");
      else if (s.k === "stop") play(armed ? (A.move?.stop ?? "runStop") : "runStop", { once: true, fade: 0.1 });
      else if (s.k === "dash") play("dash", { once: true, speed: 1.3, fade: 0.06 });
      else if (s.k === "jump")
        play(ju < 0.4 ? "jumpUp" : ju < 0.8 ? "jumpAir" : "jumpLand", { once: ju < 0.4 || ju >= 0.8, fade: 0.08 });
      else if (a!.wfx?.clip) play(a!.wfx.clip, { once: true });
      else if (iv) {
        play(iv.split("#")[0], { once: true, fade: 0.35, restart: iv !== cur });
        cur = iv;
      } else play(armed ? (A.ready ?? A.stand) : "relax", { fade: armed ? 0.2 : 0.35 });
    }
    const jv = s.k === "jump" && ju < 0.8 ? 1 - 2 * (ju / 0.8) : 1;
    const free = !armed;
    a!.poseIn = {
      mode:
        WIN[s.k] || s.k === "charge"
          ? "act"
          : s.k === "dash" || (s.k === "jump" && ju < 0.8)
            ? "air"
            : MOVE.has(s.k)
              ? "move"
              : armed
                ? "ready"
                : "relax",
      freeL: free || w !== "bow",
      freeR: free || w === "bow",
      anim: !!iv,
      spd: s.k === "sprint" ? 1.5 : MOVE.has(s.k) ? 1 : 0,
      apex: s.k === "jump" ? Math.max(0, 1 - Math.abs(jv) / 0.45) : 0,
      dash: s.k === "dash",
    };
    if (a!.wfx) a!.wfx.orbit = !!WIN[s.k] && w === "cat";
    lab.textContent =
      (iv ? `Hoạt ảnh chờ: ${iv.split("#")[0]}` : (VI[s.k] ?? s.k)) +
      (a!.wfx && !WIN[s.k]
        ? a!.wfx.st === "stowing" || a!.wfx.st === "worn"
          ? " · cất vũ khí"
          : a!.wfx.st === "fading"
            ? " · vũ khí tan thành hạt sáng"
            : a!.wfx.st === "gone"
              ? " · tay không"
              : ""
        : WIN[s.k] && segT < 0.2 && T - lastAct < 0.2
          ? ""
          : "");
    a!.update(dt);
    const fin = s.k === "atk3" || s.k === "skill" || s.k === "burst";
    fx.update(a!, { acting: !!WIN[s.k], fin, dash: s.k === "dash" }, dt);
    gl.render(scene, cam);
    T += dt;
    segT += dt;
    return true;
  };
}
