/** Quái và boss tạm thời: mô hình toon low-poly cách điệu, dựng bằng code. Giữ nguyên logic AI. */
import * as THREE from "three";
import { EL } from "../../data/content";
import { outlineMat, toonMat } from "./mat";

export interface MonsterView {
  obj: THREE.Group;
  body: THREE.Object3D;
  mats: THREE.MeshToonMaterial[];
  boss: boolean;
  segs?: THREE.Object3D[];
}

function part(g: THREE.BufferGeometry, color: number | string, mats: THREE.MeshToonMaterial[], ol = 0.03, emissive?: string) {
  const m = toonMat({ color, emissive: emissive ?? 0x000000, emissiveIntensity: emissive ? 1.2 : 0 });
  mats.push(m);
  const mesh = new THREE.Mesh(g, m);
  mesh.castShadow = true;
  if (ol) mesh.add(new THREE.Mesh(g, outlineMat(ol)));
  return mesh;
}

function eyes(parent: THREE.Object3D, y: number, z: number, sep: number, r: number, mats: THREE.MeshToonMaterial[], col = 0xffffff) {
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
  if (e.isBoss) {
    // Hắc Giao: thân rắn nhiều đốt, sừng, mắt phát sáng theo nguyên tố.
    const segs: THREE.Object3D[] = [];
    for (let i = 0; i < 9; i++) {
      const r = 0.7 - i * 0.055;
      const sg = part(new THREE.IcosahedronGeometry(r, 2), i % 2 ? 0x2b2f4a : 0x343a5c, mats, 0.05);
      sg.position.set(0, r, -i * 0.65);
      body.add(sg);
      segs.push(sg);
    }
    const head = segs[0];
    for (const sd of [-1, 1]) {
      const horn = part(new THREE.ConeGeometry(0.12, 0.7, 6), 0xe8dcc0, mats, 0.02);
      horn.position.set(sd * 0.35, 0.55, -0.15);
      horn.rotation.set(-0.6, 0, sd * -0.35);
      head.add(horn);
    }
    eyes(head, 0.18, 0.55, 0.28, 0.12, mats, new THREE.Color(el.c).getHex());
    const fin = part(new THREE.ConeGeometry(0.25, 0.8, 4), new THREE.Color(el.c).getHex(), mats, 0.02, el.c);
    fin.position.set(0, 0.75, -0.3);
    head.add(fin);
    obj.scale.setScalar(1.2);
    return { obj, body, mats, boss: true, segs };
  }
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
  if (v.boss && v.segs) {
    v.segs.forEach((sg, i) => {
      sg.position.x = Math.sin(t * 2.4 - i * 0.7) * 0.25 * Math.min(1, i / 2);
      sg.position.y = 0.7 - i * 0.055 + Math.sin(t * 1.8 - i * 0.5) * 0.08 + (i === 0 ? tele * 0.6 : 0);
    });
  } else {
    const hop = Math.abs(Math.sin(t * 9 + (e.x ?? 0))) * (e.moving || e.vx || e.vy ? 0.12 : 0.03);
    v.body.position.y = hop;
    v.body.rotation.x = -tele * 0.35 + swing * 0.5;
    v.body.scale.set(1 + swing * 0.12, 1 - swing * 0.12 + hop * 0.5, 1 + swing * 0.12);
  }
  const fl = Math.min(1, (e.flash ?? 0) * 6);
  for (const m of v.mats) {
    if (!m.userData.e0) m.userData.e0 = { c: m.emissive.clone(), i: m.emissiveIntensity };
    const e0 = m.userData.e0;
    m.emissive.copy(e0.c).lerp(white, fl);
    m.emissiveIntensity = e0.i + fl * 0.9;
  }
}
