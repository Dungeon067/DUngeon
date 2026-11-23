/**
 * Quái và boss tạm thời: mô hình toon low-poly cách điệu, dựng bằng code. Giữ nguyên logic AI.
 * Điểm thay mô hình (S29, GLB): renderer chỉ gọi `buildMonster(e)` một lần mỗi quái, `animateMonster(v, e, t, yaw)`
 * mỗi khung, và gỡ/dọn `v.obj` + `v.mats` khi quái biến mất. Quái thường: renderer đặt `v.obj` ở chân quái.
 * Boss (`v.boss`): `animateMonster` tự đặt các phần theo tọa độ thế giới từ `b.segs`; `v.deadT` (0→1) là tiến độ chìm khi bị hạ.
 */
import * as THREE from "three";
import { EL } from "../../data/content";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { outlineMat, toonMat } from "./mat";

export interface MonsterView {
  obj: THREE.Group;
  body: THREE.Object3D;
  mats: THREE.MeshToonMaterial[];
  boss: boolean;
  segs?: THREE.Object3D[];
  /** Boss: đầu, hàm dưới, râu, đuôi, vật liệu phát sáng theo nguyên tố. */
  head?: THREE.Group;
  jaw?: THREE.Object3D;
  whisk?: THREE.Object3D[];
  glow?: THREE.MeshToonMaterial[];
  el?: string;
  deadT?: number;
}

function part(
  g: THREE.BufferGeometry,
  color: number | string,
  mats: THREE.MeshToonMaterial[],
  ol = 0.03,
  emissive?: string,
) {
  const m = toonMat({ color, emissive: emissive ?? 0x000000, emissiveIntensity: emissive ? 1.2 : 0 });
  mats.push(m);
  const mesh = new THREE.Mesh(g, m);
  mesh.castShadow = true;
  if (ol) mesh.add(new THREE.Mesh(g, outlineMat(ol)));
  return mesh;
}

function eyes(
  parent: THREE.Object3D,
  y: number,
  z: number,
  sep: number,
  r: number,
  mats: THREE.MeshToonMaterial[],
  col = 0xffffff,
) {
  for (const s of [-1, 1]) {
    const e = part(new THREE.SphereGeometry(r, 10, 8), col, mats, 0);
    e.position.set(s * sep, y, z);
    const pu = part(new THREE.SphereGeometry(r * 0.55, 8, 6), 0x1a1426, mats, 0);
    pu.position.set(0, 0, r * 0.6);
    e.add(pu);
    parent.add(e);
  }
}

export function buildMonster(e: any): MonsterView {
  const obj = new THREE.Group(),
    body = new THREE.Group(),
    mats: THREE.MeshToonMaterial[] = [];
  obj.add(body);
  const el = EL[e.el ?? "water"] ?? EL.water;
  const s = Math.max(0.5, (e.r ?? 14) / 16);
  if (e.isBoss) return buildBoss(e);
  if (e.type === "slime") {
    const b = part(new THREE.SphereGeometry(0.42, 18, 12), el.c, mats);
    b.scale.set(1, 0.78, 1);
    b.position.y = 0.33;
    body.add(b);
    eyes(b, 0.08, 0.34, 0.14, 0.07, mats);
  } else if (e.type === "golem") {
    const torso = part(new THREE.BoxGeometry(0.9, 0.8, 0.6), 0x8a8478, mats, 0.035);
    torso.position.y = 0.95;
    body.add(torso);
    const core = part(new THREE.OctahedronGeometry(0.16, 0), el.c, mats, 0, el.c);
    core.position.set(0, 0.05, 0.31);
    torso.add(core);
    const head = part(new THREE.BoxGeometry(0.42, 0.34, 0.4), 0x9a9488, mats, 0.03);
    head.position.y = 0.6;
    torso.add(head);
    eyes(head, 0.03, 0.2, 0.1, 0.05, mats, new THREE.Color(el.c).getHex());
    for (const sd of [-1, 1]) {
      const arm = part(new THREE.BoxGeometry(0.28, 0.75, 0.3), 0x7a7468, mats, 0.03);
      arm.position.set(sd * 0.62, -0.15, 0);
      torso.add(arm);
      const leg = part(new THREE.BoxGeometry(0.3, 0.55, 0.32), 0x6e685e, mats, 0.03);
      leg.position.set(sd * 0.24, 0.28, 0);
      body.add(leg);
    }
  } else {
    // Yêu tinh, cung thủ, pháp sư: thân áo, đầu đeo mặt nạ, vũ khí nhỏ.
    const cloth = e.type === "shaman" ? 0x3b3570 : e.type === "archer" ? 0x4b6b3a : 0x6b3a2a;
    const mask = e.type === "archer" ? 0xe8dcc0 : e.type === "shaman" ? 0xd9e0f0 : 0xf1e6cf;
    const torso = part(new THREE.CylinderGeometry(0.2, 0.32, 0.55, 10), cloth, mats);
    torso.position.y = 0.42;
    body.add(torso);
    const head = part(new THREE.SphereGeometry(0.26, 14, 10), mask, mats);
    head.position.y = 0.48;
    torso.add(head);
    eyes(head, 0.02, 0.22, 0.09, 0.05, mats, 0xffe070);
    for (const sd of [-1, 1]) {
      const ear = part(new THREE.ConeGeometry(0.07, 0.24, 5), mask, mats, 0.015);
      ear.position.set(sd * 0.25, 0.1, 0);
      ear.rotation.z = sd * -1.2;
      head.add(ear);
    }
    const hand = new THREE.Group();
    hand.position.set(0.3, 0.05, 0.1);
    torso.add(hand);
    if (e.type === "archer") {
      const bow = part(new THREE.TorusGeometry(0.28, 0.025, 4, 12, Math.PI), 0x6a4a2a, mats, 0.01);
      bow.rotation.z = Math.PI / 2;
      hand.add(bow);
    } else if (e.type === "shaman") {
      const staff = part(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 5), 0x5a3a2a, mats, 0.01);
      staff.position.y = 0.2;
      hand.add(staff);
      const orb = part(new THREE.SphereGeometry(0.09, 10, 8), el.c, mats, 0, el.c);
      orb.position.y = 0.68;
      hand.add(orb);
    } else {
      const club = part(new THREE.CylinderGeometry(0.06, 0.035, 0.5, 6), 0x7a5232, mats, 0.012);
      club.rotation.x = Math.PI / 2.4;
      club.position.z = 0.15;
      hand.add(club);
    }
    body.userData.hand = hand;
  }
  obj.scale.setScalar(s);
  return { obj, body, mats, boss: false };
}

const white = new THREE.Color(0xffffff);
/** Nhún khi đi, ngả ra sau khi lấy đà, chúi tới khi ra đòn, chớp trắng khi trúng đòn. */
export function animateMonster(v: MonsterView, e: any, t: number, yaw: number) {
  v.obj.rotation.y = yaw;
  const tele = e.tele ? e.tele.t / e.tele.dur : 0,
    swing = e.swing > 0 ? e.swing : 0;
  if (v.boss) animateBoss(v, e, t);
  else {
    const hop = Math.abs(Math.sin(t * 9 + (e.x ?? 0))) * (e.moving || e.vx || e.vy ? 0.12 : 0.03);
    v.body.position.y = hop;
    v.body.rotation.x = -tele * 0.35 + swing * 0.5;
    v.body.scale.set(1 + swing * 0.12, 1 - swing * 0.12 + hop * 0.5, 1 + swing * 0.12);
  }
  const fl = Math.max(0, Math.min(1, (e.flash ?? 0) * 6));
  for (const m of v.mats) {
    if (!m.userData.e0) m.userData.e0 = { c: m.emissive.clone(), i: m.emissiveIntensity };
    const e0 = m.userData.e0;
    m.emissive.copy(e0.c).lerp(white, fl);
    m.emissiveIntensity = e0.i + fl * 0.9;
  }
}

/* ---------- Hắc Giao 3D (S28) ---------- */
const BOSS_SEGS = 14;
const SCALE_DARK = 0x283456,
  SCALE_MID = 0x3a4878,
  BELLY = 0xa8b2c8;

/**
 * Gộp các khối con của một nhóm thành 1 lưới màu đỉnh (+ viền) và 1 lưới phát sáng, để Hắc Giao chỉ tốn
 * vài lệnh vẽ mỗi đốt (cảnh còn vẽ lại cho bóng và mặt nước phản chiếu). Bỏ qua các nhóm con trong `keep`.
 */
function bake(
  g: THREE.Object3D,
  glowMat: THREE.MeshToonMaterial,
  out: THREE.MeshToonMaterial[],
  keep: THREE.Object3D[] = [],
) {
  g.updateMatrixWorld(true);
  const inv = g.matrixWorld.clone().invert(),
    body: THREE.BufferGeometry[] = [],
    glow: THREE.BufferGeometry[] = [],
    old: THREE.Object3D[] = [];
  const walk = (o: THREE.Object3D) => {
    for (const c of [...o.children]) {
      if (keep.includes(c)) continue;
      walk(c);
      const m = c as THREE.Mesh;
      if (!m.isMesh) continue;
      old.push(m);
      const mat = m.material as THREE.MeshToonMaterial;
      if (!mat.isMeshToonMaterial) continue;
      const geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
      for (const k of Object.keys(geo.attributes)) if (k !== "position" && k !== "normal") geo.deleteAttribute(k);
      if (mat.emissiveIntensity > 0) glow.push(geo);
      else {
        const n = geo.attributes.position.count,
          col = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) mat.color.toArray(col, i * 3);
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        body.push(geo);
      }
    }
  };
  walk(g);
  for (const o of old) {
    o.removeFromParent();
    (o as THREE.Mesh).geometry.dispose();
  }
  if (body.length) {
    const geo = mergeGeometries(body)!,
      mat = toonMat({ vertexColors: true });
    out.push(mat);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.add(new THREE.Mesh(geo, outlineMat(0.045)));
    g.add(mesh);
  }
  if (glow.length) {
    const mesh = new THREE.Mesh(mergeGeometries(glow)!, glowMat);
    mesh.castShadow = true;
    g.add(mesh);
  }
  for (const b of [...body, ...glow]) b.dispose();
}

/**
 * Hắc Giao: rồng nước thân rắn. Đầu có hàm mở, sừng cong, râu, bờm vây; 14 đốt thân bám đúng `b.segs`
 * của logic (đuôi nối theo vệt di chuyển), vây lưng và đốm lân tinh đổi màu theo nguyên tố (Thủy → Lôi).
 */
function buildBoss(e: any): MonsterView {
  const obj = new THREE.Group(),
    body = new THREE.Group(),
    tmp: THREE.MeshToonMaterial[] = [],
    mats: THREE.MeshToonMaterial[] = [];
  obj.add(body);
  const el = EL[e.el ?? "water"] ?? EL.water;
  const glowMat = toonMat({ color: el.c, emissive: el.c, emissiveIntensity: 1.6 }),
    glow = [glowMat];
  mats.push(glowMat);
  const gm = () => glowMat;
  const glowMesh = (g: THREE.BufferGeometry) => new THREE.Mesh(g, gm());

  // Đầu (hướng +z). Dựng bằng nhiều khối rồi gộp lại (bake) ở cuối.
  const head = new THREE.Group();
  const skull = part(new THREE.SphereGeometry(0.62, 16, 12), SCALE_MID, tmp, 0.05);
  skull.scale.set(1, 0.78, 1.15);
  head.add(skull);
  const snout = part(new THREE.BoxGeometry(0.62, 0.36, 0.95, 2, 2, 2), SCALE_DARK, tmp, 0.04);
  snout.position.set(0, -0.04, 0.78);
  const sp = (snout.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < sp.count; i++) {
    const z = sp.getZ(i);
    if (z > 0) sp.setX(i, sp.getX(i) * 0.7);
  }
  snout.geometry.computeVertexNormals();
  head.add(snout);
  const jaw = new THREE.Group();
  jaw.position.set(0, -0.2, 0.3);
  const jm = part(new THREE.BoxGeometry(0.5, 0.16, 0.95, 2, 1, 2), SCALE_MID, tmp, 0.035);
  const jp = (jm.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < jp.count; i++) if (jp.getZ(i) > 0) jp.setX(i, jp.getX(i) * 0.65);
  jm.geometry.computeVertexNormals();
  jm.position.set(0, -0.06, 0.45);
  const chin = part(new THREE.BoxGeometry(0.4, 0.06, 0.8), BELLY, tmp, 0);
  chin.position.set(0, -0.15, 0.45);
  jaw.add(chin);
  jaw.add(jm);
  head.add(jaw);
  // Răng.
  const toothG = new THREE.ConeGeometry(0.035, 0.14, 4);
  for (let i = 0; i < 6; i++) {
    for (const sd of [-1, 1]) {
      const tt = part(toothG, 0xf4eedc, tmp, 0);
      tt.rotation.x = Math.PI;
      tt.position.set(sd * 0.2, -0.24, 0.5 + i * 0.12);
      head.add(tt);
    }
  }
  // Mắt phát sáng, gờ mày.
  for (const sd of [-1, 1]) {
    const eye = glowMesh(new THREE.SphereGeometry(0.11, 10, 8));
    eye.scale.set(1.3, 0.7, 1);
    eye.position.set(sd * 0.34, 0.14, 0.52);
    head.add(eye);
    const brow = part(new THREE.BoxGeometry(0.26, 0.08, 0.32), SCALE_DARK, tmp, 0.02);
    brow.position.set(sd * 0.32, 0.25, 0.48);
    brow.rotation.z = sd * -0.35;
    head.add(brow);
    // Sừng cong ra sau.
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sd * 0.28, 0.35, 0.1),
      new THREE.Vector3(sd * 0.5, 0.75, -0.3),
      new THREE.Vector3(sd * 0.55, 0.95, -0.9),
      new THREE.Vector3(sd * 0.45, 1.0, -1.35),
    ]);
    const horn = part(new THREE.TubeGeometry(curve, 12, 0.07, 6), 0xe8dcc0, tmp, 0.02);
    const hp = (horn.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
    const hornTaper = horn.geometry as THREE.TubeGeometry;
    for (let i = 0; i < hp.count; i++) {
      const ring = Math.floor(i / 7) / 12,
        c = hornTaper.parameters.path.getPointAt(Math.min(1, ring)),
        k = 1.6 - ring * 1.4;
      hp.setXYZ(i, c.x + (hp.getX(i) - c.x) * k, c.y + (hp.getY(i) - c.y) * k, c.z + (hp.getZ(i) - c.z) * k);
    }
    horn.geometry.computeVertexNormals();
    head.add(horn);
  }
  // Râu dài hai bên mõm.
  const whisk: THREE.Object3D[] = [];
  for (const sd of [-1, 1]) {
    const w = new THREE.Group();
    w.position.set(sd * 0.25, -0.05, 1.1);
    const wc = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(sd * 0.35, -0.1, 0.1),
      new THREE.Vector3(sd * 0.7, -0.3, -0.3),
      new THREE.Vector3(sd * 0.9, -0.55, -0.9),
    ]);
    const wm = new THREE.Mesh(new THREE.TubeGeometry(wc, 10, 0.022, 4), gm());
    w.add(wm);
    head.add(w);
    whisk.push(w);
  }
  // Bờm vây trên gáy.
  for (let i = 0; i < 4; i++) {
    const fin = glowMesh(new THREE.ConeGeometry(0.1, 0.55 - i * 0.07, 4));
    fin.scale.set(0.35, 1, 1.4);
    fin.position.set(0, 0.5 - i * 0.04, -0.15 - i * 0.22);
    fin.rotation.x = -0.75;
    head.add(fin);
  }
  head.scale.setScalar(1.25);
  body.add(head);

  // Thân: các đốt nhỏ dần, bụng sáng màu, vây lưng và đốm lân tinh.
  const segs: THREE.Object3D[] = [];
  const finG = new THREE.ConeGeometry(0.12, 0.6, 4),
    dotG = new THREE.SphereGeometry(0.06, 6, 4);
  for (let i = 1; i < BOSS_SEGS; i++) {
    const k = i / (BOSS_SEGS - 1),
      r = 0.68 - k * 0.48,
      sg = new THREE.Group();
    const m = part(new THREE.IcosahedronGeometry(r, 2), i % 2 ? SCALE_DARK : SCALE_MID, tmp, 0.045);
    m.scale.set(1, 0.9, 1.35);
    sg.add(m);
    const belly = part(new THREE.SphereGeometry(r * 0.82, 10, 6), BELLY, tmp, 0);
    belly.scale.set(0.95, 0.55, 1.3);
    belly.position.y = -r * 0.42;
    sg.add(belly);
    if (i < BOSS_SEGS - 1) {
      const fin = new THREE.Mesh(finG, gm());
      fin.scale.set(0.4, 1.4 - k, 1.6);
      fin.position.set(0, r * 0.95, -r * 0.1);
      fin.rotation.x = -0.6;
      sg.add(fin);
      for (const sd of [-1, 1]) {
        const d = new THREE.Mesh(dotG, glow[0]);
        d.position.set(sd * r * 0.92, r * 0.1, 0);
        sg.add(d);
      }
    } else {
      // Vây đuôi.
      for (const sd of [-1, 1]) {
        const tf = glowMesh(new THREE.ConeGeometry(0.22, 1.2, 4));
        tf.scale.set(0.3, 1, 1);
        tf.rotation.set(-Math.PI / 2, 0, sd * 0.6);
        tf.position.set(sd * 0.25, 0.1, -0.6);
        sg.add(tf);
      }
    }
    // Chân trước nhỏ ở đốt 2 và đốt 7 (giao long có móng).
    if (i === 2 || i === 7)
      for (const sd of [-1, 1]) {
        const leg = part(new THREE.CylinderGeometry(0.06, 0.09, 0.55, 5), SCALE_DARK, tmp, 0.02);
        leg.position.set(sd * r * 1.05, -r * 0.4, 0.05);
        leg.rotation.z = sd * 0.9;
        sg.add(leg);
        const claw = part(new THREE.ConeGeometry(0.08, 0.2, 4), 0xe8dcc0, tmp, 0.01);
        claw.position.set(sd * r * 1.3, -r * 0.62, 0.12);
        claw.rotation.x = Math.PI / 2;
        sg.add(claw);
      }
    body.add(sg);
    segs.push(sg);
  }
  bake(head, glowMat, mats, [jaw, ...whisk]);
  bake(jaw, glowMat, mats);
  for (const w of whisk) bake(w, glowMat, mats);
  for (const sg of segs) bake(sg, glowMat, mats);
  for (const m of tmp) m.dispose();
  return { obj, body, mats, boss: true, segs, head, jaw, whisk, glow, el: e.el };
}

const _a = new THREE.Vector3(),
  _b = new THREE.Vector3();
/**
 * Đốt thân đặt theo `b.segs` (tọa độ logic, px). Đầu ngóc cao, thân uốn sóng nửa chìm nửa nổi.
 * Lấy đà (wind): ngóc đầu, há hàm; lao (charge): cúi đầu sát mặt nước; chết: chìm dần.
 */
function animateBoss(v: MonsterView, b: any, t: number) {
  const TSZ = 40,
    segs = b.segs ?? [],
    wind = b.state === "wind" && b.tele ? Math.min(1, b.t / b.tele.dur) : 0,
    charge = b.state === "charge" ? 1 : 0,
    dead = v.deadT ?? 0,
    sink = dead * 3.2;
  v.obj.position.set(0, 0, 0);
  v.obj.rotation.set(0, 0, 0);
  v.obj.scale.setScalar(1);
  const hy = 1.7 + wind * 0.9 - charge * 1.0 + Math.sin(t * 1.6) * 0.12 - sink,
    hx = (segs[0]?.x ?? b.x) / TSZ,
    hz = (segs[0]?.y ?? b.y) / TSZ;
  const head = v.head!;
  head.position.set(hx, hy, hz);
  head.rotation.set(-0.25 * wind + 0.35 * charge + dead * 0.6, Math.atan2(Math.cos(b.ang), Math.sin(b.ang)), 0);
  if (v.jaw) v.jaw.rotation.x = 0.1 + wind * 0.55 + charge * 0.3 + Math.max(0, Math.sin(t * 0.9)) * 0.08;
  v.whisk?.forEach((w, i) => (w.rotation.y = Math.sin(t * 3 + i * 2) * 0.25));
  let px = hx,
    py = hy - 0.5,
    pz = hz;
  v.segs!.forEach((sg, j) => {
    const i = j + 1,
      s = segs[Math.min(i, segs.length - 1)] ?? { x: b.x, y: b.y },
      k = i / BOSS_SEGS;
    const x = s.x / TSZ,
      z = s.y / TSZ,
      y = Math.max(0.15 - sink, (1.1 - k * 0.9) * (1 - charge * 0.4) + Math.sin(t * 2.2 - i * 0.65) * 0.32 - sink);
    sg.position.set(x, y, z);
    _a.set(px, py, pz);
    _b.set(x, y, z);
    if (_a.distanceToSquared(_b) > 1e-4) sg.lookAt(_a);
    px = x;
    py = y;
    pz = z;
  });
  // Đổi nguyên tố khi sang giai đoạn 2.
  if (v.glow && v.el !== b.el) {
    v.el = b.el;
    const c = EL[b.el]?.c ?? "#3aa6f5";
    for (const m of v.glow) {
      m.color.set(c);
      m.emissive.set(c);
      m.userData.e0 = { c: m.emissive.clone(), i: m.emissiveIntensity };
    }
  }
  if (v.glow) {
    const pulse = 1.4 + Math.sin(t * 4) * 0.25 + wind * 1.2 + (b.phase === 2 ? 0.5 : 0);
    for (const m of v.glow) if (m.userData.e0) m.userData.e0.i = pulse;
  }
}
