/**
 * Trang xem trước hoạt ảnh (chỉ dùng khi làm hoạt ảnh, không vào bản build).
 * Mở qua vite dev: /tools/anim/preview.html?id=havy&w=sword&clip=sword2&yaw=-60
 * window.at(t): đặt thời điểm (giây) của clip rồi vẽ lại; window.dur: độ dài clip.
 */
import * as THREE from "three";
import { VrmActor, POSES, MODELS } from "../../src/render3d/toon/actor";
import { HeroFx } from "../../src/render3d/toon/motion-fx";
import { WindField, type WindEnv, type WindSrc } from "../../src/render3d/toon/wind";
import { MOVE, MoveFSM, locoSpeeds, moveClip, type MoveInput } from "../../src/combat/movement";

const q = new URLSearchParams(location.search);
if (q.get("anim")) (globalThis as { __animUrl?: string }).__animUrl = q.get("anim")!;
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
const floor = new THREE.Mesh(
  new THREE.CircleGeometry(+(q.get("san") ?? 1.6), 48),
  new THREE.MeshBasicMaterial({ color: 0xa9b6c9 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
// move=1: nhân vật di chuyển thật (chạy, lướt), camera đi theo, sàn lưới để thấy tốc độ.
const moving = !!q.get("move");
if (moving) {
  floor.visible = false;
  // Sàn kẻ ô 1 m, vạch đậm mỗi 5 m (texture lặp, rõ cả khi camera xa).
  const cv = document.createElement("canvas");
  cv.width = cv.height = 500;
  const g2 = cv.getContext("2d")!;
  g2.fillStyle = "#b4c0d1";
  g2.fillRect(0, 0, 500, 500);
  g2.fillStyle = "#8391a6";
  for (let k = 0; k < 5; k++) {
    g2.fillRect(k * 100, 0, 3, 500);
    g2.fillRect(0, k * 100, 500, 3);
  }
  g2.fillStyle = "#56647a";
  g2.fillRect(0, 0, 6, 500);
  g2.fillRect(0, 0, 500, 6);
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(80, 80);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  const base = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ map: tex }));
  base.rotation.x = -Math.PI / 2;
  scene.add(base);
}
const camOff = cam.position.clone();
// Thử cách cầm (grip={"rot":[..],"pos":[..]}) mà không sửa content.
if (q.get("grip")) Object.assign(MODELS.camVuKhi[w as keyof typeof MODELS.camVuKhi], JSON.parse(q.get("grip")!));
const a = await VrmActor.load(id, w, null);
if (q.get("cloth") === "0" && a) a.cloth.off = true;
(window as any).__a = a;
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
const act = (a as any).actions.get(a.variant(clip)) as THREE.AnimationAction;
(window as any).dur = act.getClip().duration;
(window as any).at = (t: number) => {
  act.time = t;
  a.layer?.restore();
  a.mixer.update(0);
  a.offW = a.poseIn.mode === "act" ? 1 : 0;
  a.gripBlend();
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
  a.grip2();
  for (let i = 0; i < 30; i++) a.wfx?.update(0.05);
  a.vrm.update(0);
  a.bow?.update(a.strNow(), a.strRel());
  gl.render(scene, cam);
  return true;
};
if (q.get("seq")) sequence(q.get("seq")!);
if (q.get("mv")) moveDemo(q.get("mv")!);
// Gió (video duyệt S27): vùng gió (vung, huong), bạn đồng hành dùng lốc xoáy (ban, bw, bdang, bpos), miệng gió.
const wind = new WindField(POSES.gio);
const env: WindEnv = { vung: q.get("vung") ?? "mo-ngoc", huong: q.get("huong") ? +q.get("huong")! : undefined };
const bw = (q.get("bw") ?? "sword") as keyof typeof MODELS.hoatAnh,
  bp = (q.get("bpos") ?? "-1.5,0.4").split(",").map(Number);
const ban = q.get("ban") ? await VrmActor.load(q.get("ban")!, bw as any, null) : null;
if (ban) {
  scene.add(ban.obj);
  ban.obj.position.set(bp[0], ban.obj.userData.yOff ?? 0, bp[1]);
  ban.obj.rotation.y = Math.atan2(-bp[0], -bp[1]) + 0.6;
  if (q.get("bdang")) ban.setDang((POSES.dang as any)[q.get("bdang")!]);
  ban.poseIn = { mode: "ready", freeL: true, freeR: false };
  ban.play(MODELS.hoatAnh[bw].ready ?? MODELS.hoatAnh[bw].stand, { fade: 0 });
}
/** Vệt gió: đoạn thẳng trôi theo gió tại chỗ (thấy hướng gió nền, xung lốc xoáy, gió đẩy lên). */
const NS = 110,
  sp = new Float32Array(NS * 6),
  sv = Array.from({ length: NS }, () => ({ p: new THREE.Vector3(), age: 9, life: 1 }));
const sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
const streaks = new THREE.LineSegments(
  sg,
  new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, depthWrite: false }),
);
streaks.frustumCulled = false;
scene.add(streaks);
const sw = new THREE.Vector3();
const blowStreaks = (dt: number, e: WindEnv, t: number) => {
  sv.forEach((o, i) => {
    o.age += dt;
    if (o.age > o.life || Math.abs(o.p.x) > 3 || Math.abs(o.p.z) > 3 || o.p.y > 2.6) {
      o.p.set((Math.random() - 0.5) * 5, 0.1 + Math.random() * 2, (Math.random() - 0.5) * 5);
      o.age = 0;
      o.life = 0.6 + Math.random() * 0.8;
    }
    wind.sample(sw, o.p, t, e);
    const L = sw.length();
    o.p.addScaledVector(sw, dt * 3.2);
    const k = L < 0.06 ? 0 : Math.min(1, L * 0.9) * Math.sin((Math.PI * o.age) / o.life);
    sp.set([o.p.x, o.p.y, o.p.z, o.p.x - sw.x * 0.35 * k, o.p.y - sw.y * 0.35 * k, o.p.z - sw.z * 0.35 * k], i * 6);
  });
  sg.attributes.position.needsUpdate = true;
};
/** Lốc xoáy và miệng gió (hình đơn giản). */
const mint = (o: number) =>
  new THREE.MeshBasicMaterial({
    color: 0xbdf6e4,
    transparent: true,
    opacity: o,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
const vortex = new THREE.Group();
for (let i = 0; i < 4; i++) {
  const r = new THREE.Mesh(new THREE.TorusGeometry(0.35 + i * 0.12, 0.02, 6, 28, Math.PI * 1.4), mint(0.7));
  r.rotation.x = Math.PI / 2;
  r.position.y = 0.2 + i * 0.45;
  vortex.add(r);
}
vortex.visible = false;
scene.add(vortex);
const vent = new THREE.Group();
vent.add(
  new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.5, 0.06, 20), new THREE.MeshBasicMaterial({ color: 0x6a8a7a })),
);
const ventIn = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), new THREE.MeshBasicMaterial({ color: 0x2a3a34 }));
ventIn.rotation.x = -Math.PI / 2;
ventIn.position.y = 0.035;
vent.add(ventIn);
const ventR = [0, 1, 2].map(() => {
  const r = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.02, 6, 24), mint(0.8));
  r.rotation.x = Math.PI / 2;
  vent.add(r);
  return r;
});
vent.visible = false;
scene.add(vent);
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
    jumpdash: "Nhảy + lướt trên không",
    ready: "Thế chờ",
    draw: "Rút vũ khí",
    stow: "Cất vũ khí",
    vortex: "Bạch Vũ dùng Lốc Xoáy Lông Vũ cạnh Hạ Vy",
    vent: "Đứng trên miệng gió",
    nguoc: "Chạy ngược gió",
  };
  const A = MODELS.hoatAnh[w as keyof typeof MODELS.hoatAnh];
  const segs = src.split(",").map((x) => {
    const [k, d] = x.split(":");
    return { k, d: d ? +d : WIN[k] / (k.startsWith("atk") ? A.speed : 1) };
  });
  let vAge = 9,
    luotW = 0;
  let T = 0,
    lastAct = q.get("nov") ? -99 : 0,
    si = -1,
    segT = 0,
    cur = "";
  const lab = document.createElement("div");
  lab.style.cssText = "position:fixed;left:12px;top:10px;font:600 20px sans-serif;color:#223;";
  if (q.get("hud") === "0") lab.style.display = "none";
  document.body.appendChild(lab);
  if (a!.wfx) a!.wfx.color.set(q.get("col") ?? "#7fd0ff");
  const fx = new HeroFx();
  fx.color(q.get("col") ?? "#7fd0ff", q.get("col2") ?? q.get("col") ?? "#bfe8ff");
  scene.add(fx.group);
  (window as any).__fx = fx;
  const MOVE = new Set(["run", "sprint", "turn", "nguoc"]);
  const play = (c: string, o: { once?: boolean; speed?: number; fade?: number; restart?: boolean } = {}) => {
    if (c === cur && !o.restart) return;
    cur = c;
    a!.play(c, { fade: 0.12, ...o });
  };
  // fps: số khung mỗi giây video; slow: hệ số tốc độ (0.5 = quay chậm một nửa).
  const FPS = +(q.get("fps") ?? 30),
    SLOW = +(q.get("slow") ?? 1);
  (window as any).nframes = Math.round((segs.reduce((s, x) => s + x.d, 0) * FPS) / SLOW);
  (window as any).step = () => {
    const dt = SLOW / FPS;
    if (si < 0 || segT >= segs[si].d) {
      si++;
      segT = 0;
      const s = segs[Math.min(si, segs.length - 1)];
      if (WIN[s.k]) {
        lastAct = T;
        a!.wfx?.want(true, true, scene);
        const c = s.k.startsWith("atk") ? A.atk[+s.k.slice(3) - 1] : s.k === "skill" ? A.skill : A.burst;
        play(c, { once: true, speed: a!.duration(c) / s.d, fade: 0.08, restart: true });
        a!.wfx?.cast(s.k === "burst" ? 2 : s.k === "atk3" || s.k === "skill" ? 1.5 : 1);
      }
      if (s.k === "vortex" && ban) {
        vAge = 0;
        ban.play(MODELS.hoatAnh[bw].skill, { once: true, fade: 0.08, restart: true });
        ban.poseIn = { mode: "act", freeL: true, freeR: false };
        wind.pulse("skill", bp[0], bp[1]);
      }
    }
    const s = segs[Math.min(si, segs.length - 1)];
    if (s.k === "draw") lastAct = Math.max(lastAct, T - 0.01);
    const out = s.k !== "stow" && (T - lastAct < POSES.vuKhi.cho || s.k === "charge");
    const JUMP = s.k === "jump" || s.k === "jumpdash";
    const standing = !MOVE.has(s.k) && s.k !== "dash" && !JUMP;
    a!.wfx?.want(out, standing, scene, s.k === "draw");
    const armed = !a!.wfx || a!.wfx.st === "hand" || a!.wfx.st === "stowing";
    const relaxing = s.k === "idle" && (!a!.wfx || a!.wfx.st === "gone");
    const iv = a!.idleVariant(dt, relaxing);
    // Lướt / nhảy: mô phỏng tại chỗ (nhảy có quỹ đạo đứng để thấy co chân ở đỉnh).
    const JD = s.d,
      ju = JUMP ? segT / JD : 0;
    // Nhảy + lướt trên không: lên (0–0,35), lướt giữ độ cao (0,35–0,6), rơi (0,6–0,9), đáp.
    const jd = s.k === "jumpdash",
      adash = jd && ju >= 0.35 && ju < 0.6,
      jh = (u: number) => 0.55 * 4 * u * (1 - u);
    a!.obj.position.y =
      (a!.obj.userData.yOff ?? 0) +
      (jd
        ? ju < 0.35
          ? jh(ju / 0.7)
          : ju < 0.6
            ? 0.55
            : ju < 0.9
              ? jh(0.5 + (ju - 0.6) / 0.6)
              : 0
        : s.k === "jump" && ju < 0.8
          ? jh(ju / 0.8)
          : 0);
    const dashing = s.k === "dash" || adash;
    if (moving) {
      const v = dashing ? 11 : s.k === "sprint" ? 6.5 : MOVE.has(s.k) ? 4.6 : JUMP ? 3 : 0;
      const f = new THREE.Vector3(Math.sin(a!.obj.rotation.y), 0, Math.cos(a!.obj.rotation.y));
      a!.obj.position.addScaledVector(f, v * dt);
      cam.position.set(a!.obj.position.x + camOff.x, camOff.y, a!.obj.position.z + camOff.z);
      cam.lookAt(a!.obj.position.x, ty, a!.obj.position.z);
    }
    if (s.k === "turn") a!.obj.rotation.y += dt * 2.4;
    else a!.obj.rotation.y *= 1 - Math.min(1, dt * 3);
    if (!WIN[s.k]) {
      if (s.k === "charge") play(A.charge);
      else if (s.k === "run" || s.k === "turn" || s.k === "nguoc") play(armed ? (A.move?.run ?? "run") : "run");
      else if (s.k === "sprint") play(armed ? (A.move?.sprint ?? "sprint") : "sprint");
      else if (s.k === "stop") play(armed ? (A.move?.stop ?? "runStop") : "runStop", { once: true, fade: 0.1 });
      else if (s.k === "dash") play("dash", { once: true, speed: 0.3 / s.d, fade: 0.04 });
      else if (jd)
        play(ju < 0.35 ? "jumpUp" : adash ? "dashAir" : ju < 0.9 ? "jumpAir" : "jumpLand", {
          once: ju < 0.35 || adash || ju >= 0.9,
          speed: adash ? 0.3 / (0.25 * JD) : 1,
          fade: adash ? 0.04 : 0.08,
        });
      else if (s.k === "jump")
        play(ju < 0.4 ? "jumpUp" : ju < 0.8 ? "jumpAir" : "jumpLand", { once: ju < 0.4 || ju >= 0.8, fade: 0.08 });
      else if (a!.wfx?.clip) play(a!.wfx.clip, { once: true });
      else if (iv) {
        play(iv.split("#")[0], { once: true, fade: 0.35, restart: iv !== cur });
        cur = iv;
      } else
        play(armed ? (A.ready ?? A.stand) : a!.dang?.gioi === "nam" ? "relaxNam" : "relax", {
          fade: armed ? 0.2 : 0.35,
        });
    }
    const jv = jd
      ? ju < 0.35
        ? 1 - ju / 0.35
        : adash
          ? 1
          : ju < 0.9
            ? (ju - 0.6) / 0.3
            : 1
      : s.k === "jump" && ju < 0.8
        ? 1 - 2 * (ju / 0.8)
        : 1;
    const free = !armed;
    a!.poseIn = {
      mode:
        WIN[s.k] || s.k === "charge"
          ? "act"
          : dashing || (s.k === "jump" && ju < 0.8) || (jd && ju < 0.9)
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
      apex: JUMP && !adash ? Math.max(0, 1 - Math.abs(jv) / 0.45) : 0,
      dash: dashing,
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
    // Gió: nền theo vùng; chạy ngược gió = gió thổi ngược hướng mặt (-Z); lốc xoáy giữa hai người; miệng gió dưới chân.
    vAge += dt;
    luotW = dashing ? 1 : Math.max(0, luotW - dt / POSES.gio.luot.tat);
    const vc = { x: bp[0] * 0.45, z: bp[1] * 0.45 };
    const nguon: WindSrc[] = vAge < 2.5 ? [{ k: "vortex", x: vc.x, z: vc.z, age: vAge, life: 2.5 }] : [];
    const e: WindEnv = {
      ...env,
      huong: s.k === "nguoc" ? -90 : env.huong,
      nguon,
      mieng: s.k === "vent" ? [{ x: 0, z: 0 }] : [],
      luot:
        luotW > 0 ? { x: -Math.sin(a!.obj.rotation.y) * luotW, z: -Math.cos(a!.obj.rotation.y) * luotW } : undefined,
    };
    wind.tick(dt);
    wind.sample(a!.cloth.wind, a!.obj.position, T, e);
    blowStreaks(dt, e, T);
    vortex.visible = vAge < 2.5;
    vortex.position.set(vc.x, 0, vc.z);
    vortex.rotation.y += dt * 7;
    vortex.scale.setScalar(Math.min(1, vAge / 0.2) * Math.min(1, (2.5 - vAge) / 0.4));
    vent.visible = s.k === "vent";
    ventR.forEach((r, i) => {
      const k = (T * 0.9 + i / 3) % 1;
      r.position.y = 0.1 + k * 1.8;
      r.scale.setScalar(1 + k * 0.6);
      (r.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - k);
    });
    if (ban) {
      wind.sample(ban.cloth.wind, ban.obj.position, T, e);
      if (ban.poseIn.mode === "act" && vAge > 1.1) {
        ban.play(MODELS.hoatAnh[bw].ready ?? MODELS.hoatAnh[bw].stand, { fade: 0.3 });
        ban.poseIn = { mode: "ready", freeL: true, freeR: false };
      }
      ban.update(dt);
    }
    const wl = a!.cloth.wind.length();
    lab.textContent += ` · gió ${wl.toFixed(2)} · váy lệch tối đa ${Math.round(a!.cloth.maxDev)}°`;
    a!.update(dt);
    (window as any).clothMax = Math.max((window as any).clothMax ?? 0, a!.cloth.maxDev);
    (window as any).clothDev = a!.cloth.maxDev;
    (window as any).segK = s.k;
    const fin = s.k === "atk3" || s.k === "skill" || s.k === "burst";
    fx.update(a!, { acting: !!WIN[s.k], fin, dash: dashing }, dt);
    gl.render(scene, cam);
    T += dt;
    segT += dt;
    return true;
  };
}

/**
 * Video máy trạng thái di chuyển (hợp nhất A): mv=idle:0.6,walk:2,stop:1,run:2,stop:1,sprint:2,stop:1.4,run:0.6,dash,dash,dash,run:1,stop:1,fall:6:2.6
 * Mỗi bước đặt đầu vào cho MoveFSM; dash = bấm lướt (bị từ chối khi đang hồi); fall:H:d = chạy khỏi cột cao H mét rồi rơi.
 */
function moveDemo(src: string) {
  // Đoạn: idle / walk / run / sprint / s (rẽ chữ S) / turn (quay đầu 180° rồi chạy) / stop / dash / fall:cao:giây.
  const steps = src.split(",").map((x) => {
    const [k, d, e] = x.split(":");
    return { k, d: k === "dash" ? 0.45 : k === "fall" ? +(e ?? 2.6) : +(d ?? 1), h: k === "fall" ? +(d ?? 6) : 0 };
  });
  const F = new MoveFSM();
  const M = MOVE.muot;
  const FPS = +(q.get("fps") ?? 30),
    SLOW = +(q.get("slow") ?? 1);
  (window as any).nframes = Math.round((steps.reduce((s, x) => s + x.d, 0) * FPS) / SLOW);
  const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), new THREE.MeshLambertMaterial({ color: 0x8d99ab }));
  pillar.visible = false;
  scene.add(pillar);
  // Ngoài trận khi di chuyển: vũ khí cất trên lưng suốt đoạn quay (armed=1: cầm trong tay, chạy trong trận).
  const armed = !!q.get("armed");
  if (q.get("chay")) POSES.vuKhi.noi.sword.chay = q.get("chay")!.split("_").map(Number) as [number, number, number];
  POSES.vuKhi.giu = 1e9;
  for (const k of Object.keys(POSES.vuKhi.noi)) delete (POSES.vuKhi.noi as any)[k].giu;
  let si = -1,
    segT = 0,
    cur = "",
    y = 0,
    vy = 0,
    air = false,
    base = 0,
    ang = 0,
    yawC = 0,
    vN0 = 0,
    acc = 0;
  const edge0 = new THREE.Vector3();
  const y0 = a!.obj.userData.yOff ?? 0;
  const play = (c: string, o: { once?: boolean; speed?: number; fade?: number; restart?: boolean } = {}) => {
    if (c === cur && !o.restart) return;
    cur = c;
    a!.play(c, { fade: M.chuyen, ...o });
  };
  (window as any).step = () => {
    const dt = SLOW / FPS;
    if (si < 0 || segT >= steps[Math.min(si, steps.length - 1)].d) {
      const prev = steps[si];
      if (prev?.k === "turn") base += Math.PI;
      si++;
      segT = 0;
      const s = steps[Math.min(si, steps.length - 1)];
      if (s.k === "dash" && F.tryDash()) {
        cur = "dash";
        a!.play("dash", { once: true, fade: M.chuyenNhanh, restart: true, speed: 1.2 });
      }
      if (s.k === "fall" && si < steps.length) {
        base = Math.atan2(camOff.x, camOff.z) + 1.1;
        y = s.h;
        pillar.visible = true;
        pillar.scale.y = s.h;
        const f = new THREE.Vector3(Math.sin(base), 0, Math.cos(base));
        edge0.copy(a!.obj.position).addScaledVector(f, 0.3);
        pillar.position.set(edge0.x, s.h / 2, edge0.z);
      }
    }
    const s = steps[Math.min(si, steps.length - 1)];
    ang = s.k === "s" ? base + 0.95 * Math.sin((2 * Math.PI * segT) / s.d) : s.k === "turn" ? base + Math.PI : base;
    const inp: MoveInput =
      s.k === "walk"
        ? { len: 0.3 }
        : s.k === "run" || s.k === "dash" || s.k === "s" || s.k === "turn"
          ? { len: 1 }
          : s.k === "sprint"
            ? { len: 1, sprint: true }
            : s.k === "fall"
              ? { len: segT < 0.45 ? 1 : 0 }
              : { len: 0 };
    // Rơi: rời mép cột thì rơi tự do, giới hạn 10 m/s; chạm đất thì phân loại tiếp đất theo độ cao.
    if (s.k === "fall" && pillar.visible) {
      const off = a!.obj.position.clone().sub(pillar.position);
      off.y = 0;
      if (off.length() > 0.6 && y > 0) {
        if (!air) {
          air = true;
          vy = 0;
        }
        vy = F.limitFall(vy - 25 * dt, 1);
        y = Math.max(0, y + vy * dt);
        if (y === 0) {
          air = false;
          F.land(s.h, inp.len > 0.15);
        }
      }
    }
    const r = F.update(dt, { ...inp, air });
    // Hướng: chạy theo hướng cần ngay (như game), thân xoay mượt / pivot khi quay đầu gấp.
    let d = ang - yawC;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    if (inp.len > 0.15 || r.st === "dash") yawC += F.turn(d, dt);
    const look = Math.atan2(Math.sin(ang - yawC), Math.cos(ang - yawC));
    const mvA = r.st.startsWith("stop") ? yawC : ang;
    if (!air || r.v > 0)
      a!.obj.position.addScaledVector(new THREE.Vector3(Math.sin(mvA), 0, Math.cos(mvA)), (r.v / 40) * dt);
    a!.obj.rotation.y = yawC;
    a!.obj.position.y = y0 + y;
    cam.position.set(a!.obj.position.x + camOff.x, camOff.y + y * 0.6, a!.obj.position.z + camOff.z);
    cam.lookAt(a!.obj.position.x, ty + y * 0.8, a!.obj.position.z);
    const vN = r.v / MOVE.toc.coSo;
    acc += ((vN - vN0) / dt - acc) * Math.min(1, dt * 12);
    vN0 = vN;
    if (r.st === "fall") play("jumpAir", { fade: M.chuyen });
    else if (r.st === "walk" || r.st === "run" || r.st === "sprint") {
      cur = "loco";
      a!.locomote(
        (["walk", "run", "sprint"] as const).map((x) => moveClip(x)!.k),
        locoSpeeds(),
        r.v,
        M.chuyen,
        [M.blend.pha.walk, M.blend.pha.run, M.blend.pha.sprint],
      );
    } else if (r.st !== "dash") {
      const c = moveClip(r.st);
      if (!c) play(a!.dang?.gioi === "nam" ? "relaxNam" : "relax", { fade: 0.25 });
      else {
        const once = r.st.startsWith("stop") || r.st.startsWith("land");
        play(c.k + (once ? "" : ""), {
          once,
          speed: c.speed ?? 1,
          fade: r.st.startsWith("land") ? M.chuyenNhanh : M.chuyen,
          restart: once && cur !== c.k,
        });
      }
    }
    const ground = r.st !== "fall" && r.st !== "dash";
    if (a!.wfx) {
      a!.wfx.want(armed, false, scene);
      a!.wfx.runW = armed && ground && r.v > 1 ? Math.min(1, a!.wfx.runW + dt * 8) : Math.max(0, a!.wfx.runW - dt * 8);
    }
    a!.poseIn = {
      mode: !ground ? "air" : r.st === "walk" || r.st === "run" || r.st === "sprint" ? "move" : "relax",
      freeL: true,
      freeR: true,
      spd: r.st === "sprint" ? 1.5 : r.v > 1 ? 1 : 0,
      dash: r.st === "dash",
      vel: ground ? vN : 0,
      acc: ground ? acc : 0,
      look: inp.len > 0.15 ? look : 0,
      phase: a!.locoPh,
    };
    a!.update(dt);
    gl.render(scene, cam);
    segT += dt;
    return true;
  };
}
