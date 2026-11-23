/**
 * Vật thể câu đố, NPC quest mini (S23) dựng bằng mô hình toon low-poly cách điệu, thay cho bản vẽ 2D chiếu vào cảnh.
 * Chỉ đọc dữ liệu vẽ (`objView`, danh sách NPC); không đụng logic câu đố. Ký hiệu gợi ý và cửa bí cảnh vẫn vẽ 2D.
 */
import * as THREE from "three";
import { objView, type PObj, type PState } from "../../world/puzzle-core";
import { hash2, outlineMat, toonMat } from "./mat";

type View = ReturnType<typeof objView>;
interface Built {
  obj: THREE.Group;
  upd?(v: View, t: number): void;
}

const geo = {
  box: (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d),
  cyl: (rt: number, rb: number, h: number, s = 10) => new THREE.CylinderGeometry(rt, rb, h, s),
  sph: (r: number, s = 12) => new THREE.SphereGeometry(r, s, Math.max(6, (s * 2) / 3)),
  ico: (r: number, d = 1) => new THREE.IcosahedronGeometry(r, d),
  cone: (r: number, h: number, s = 8) => new THREE.ConeGeometry(r, h, s),
};

function part(g: THREE.BufferGeometry, color: number | string, ol = 0.02, emissive?: number | string, ei = 1.2) {
  const m = toonMat({ color, emissive: emissive ?? 0x000000, emissiveIntensity: emissive !== undefined ? ei : 0 });
  const mesh = new THREE.Mesh(g, m);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (ol) mesh.add(new THREE.Mesh(g, outlineMat(ol)));
  return mesh;
}
const at = <T extends THREE.Object3D>(o: T, x: number, y: number, z: number) => (o.position.set(x, y, z), o);
const mat = (o: THREE.Object3D) => (o as THREE.Mesh).material as THREE.MeshToonMaterial;

/** Ngọn lửa: hai hình nón chồng, nhấp nháy theo thời gian. */
function flame(scale = 1) {
  const g = new THREE.Group();
  const outer = part(geo.cone(0.12 * scale, 0.36 * scale, 7), 0xff8a3a, 0, 0xff6a20, 1.8);
  const inner = part(geo.cone(0.06 * scale, 0.22 * scale, 6), 0xffe080, 0, 0xffd060, 2.2);
  inner.position.y = -0.03 * scale;
  g.add(outer, inner);
  return g;
}
const flick = (f: THREE.Object3D, t: number, k = 0) => {
  const s = 1 + Math.sin(t * 17 + k) * 0.08 + Math.sin(t * 29 + k * 2) * 0.05;
  f.scale.set(1 / s, s, 1 / s);
};

function stoneBase(w = 0.55, h = 0.12, col = 0x8a8678) {
  return at(part(geo.cyl(w * 0.55, w * 0.62, h, 8), col, 0.02), 0, h / 2, 0);
}

const B: Record<string, () => Built> = {
  den() {
    const obj = new THREE.Group();
    obj.add(stoneBase(0.5));
    obj.add(at(part(geo.cyl(0.11, 0.14, 0.55, 6), 0x7d7a72), 0, 0.39, 0));
    const cap = at(part(geo.cyl(0.24, 0.2, 0.12, 6), 0x5c5a54), 0, 0.72, 0);
    obj.add(cap);
    const bowl = at(part(geo.cyl(0.16, 0.1, 0.08, 8), 0x4a4842), 0, 0.82, 0);
    obj.add(bowl);
    const fl = at(flame(1.1), 0, 1.0, 0);
    const light = new THREE.PointLight(0xffa050, 0, 3.2, 1.6);
    light.position.y = 1.05;
    obj.add(fl, light);
    return {
      obj,
      upd(v, t) {
        fl.visible = v.xong;
        flick(fl, t, v.x);
        // Đèn tự tắt: lửa nhỏ dần theo thời gian còn lại.
        const s = v.henGio === null ? 1 : 0.45 + 0.55 * v.henGio;
        fl.scale.multiplyScalar(s);
        light.intensity = v.xong ? 2.2 * s : 0;
      },
    };
  },
  denLan() {
    const b = B.den();
    const lan = at(part(geo.box(0.26, 0.26, 0.26), 0xc04a3a, 0.02), 0, 1.05, 0);
    lan.rotation.y = Math.PI / 4;
    b.obj.add(lan);
    const up0 = b.upd!;
    return {
      obj: b.obj,
      upd(v, t) {
        up0(v, t);
        // Bước 1 (lửa) làm đèn lồng ấm lên, bước 2 (gió) làm bùng sáng.
        const m = mat(lan);
        m.emissive.set(v.xong ? 0xff9050 : v.trangThai > 0 ? 0x803020 : 0x000000);
        m.emissiveIntensity = v.xong ? 1.6 + Math.sin(t * 6) * 0.2 : 1;
        lan.rotation.y = Math.PI / 4 + (v.xong ? t * 0.8 : 0);
      },
    };
  },
  gai() {
    const obj = new THREE.Group();
    const parts: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2,
        r = 0.2 + hash2(i, 3) * 0.2;
      const s = part(geo.cone(0.09, 0.55 + hash2(i, 7) * 0.3, 5), 0x4a5a2a, 0.015);
      s.position.set(Math.cos(a) * r, 0.25, Math.sin(a) * r);
      s.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
      parts.push(s);
      obj.add(s);
    }
    obj.add(at(part(geo.ico(0.32, 1), 0x3d4a22, 0.02), 0, 0.2, 0));
    const ash = at(part(geo.cyl(0.45, 0.5, 0.05, 10), 0x3a3634, 0), 0, 0.03, 0);
    obj.add(ash);
    return {
      obj,
      upd(v) {
        for (const p of parts) p.visible = !v.xong;
        obj.children[9].visible = !v.xong;
        ash.visible = v.xong;
      },
    };
  },
  bangChan() {
    const obj = new THREE.Group();
    const ice = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const c = part(geo.ico(0.35 - i * 0.04, 0), 0xa8e4ff, 0.02, 0x4ab0e0, 0.25);
      c.position.set((i - 1.5) * 0.22, 0.32 + (i % 2) * 0.12, (i % 2) * 0.1);
      c.rotation.set(i, i * 2, 0);
      ice.add(c);
    }
    const puddle = at(part(geo.cyl(0.5, 0.5, 0.02, 12), 0x7ac0e8, 0), 0, 0.02, 0);
    obj.add(ice, puddle);
    return {
      obj,
      upd(v) {
        ice.visible = !v.xong;
        puddle.visible = v.xong;
      },
    };
  },
  bon() {
    const obj = new THREE.Group();
    obj.add(at(part(geo.cyl(0.42, 0.36, 0.34, 10), 0x8a8678), 0, 0.17, 0));
    const inner = at(part(geo.cyl(0.33, 0.33, 0.02, 10), 0x5a564e, 0), 0, 0.33, 0);
    const water = at(part(geo.cyl(0.33, 0.33, 0.04, 14), 0x4aa8e8, 0, 0x2a78c0, 0.35), 0, 0.32, 0);
    obj.add(inner, water);
    return {
      obj,
      upd(v, t) {
        water.visible = v.xong || v.trangThai > 0;
        water.position.y = 0.3 + Math.sin(t * 2 + v.x) * 0.006;
      },
    };
  },
  bonHoi() {
    const b = B.bon();
    const plat = at(part(geo.cyl(0.36, 0.36, 0.08, 10), 0xb0a890, 0.02), 0, 0.38, 0);
    const steam: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const s = part(geo.sph(0.12, 8), 0xffffff, 0);
      (s.material as THREE.MeshToonMaterial).transparent = true;
      steam.push(s);
      b.obj.add(s);
    }
    b.obj.add(plat);
    const up0 = b.upd!;
    return {
      obj: b.obj,
      upd(v, t) {
        up0(v, t);
        // Đã xong: bệ nâng lên trên cột hơi nước.
        plat.position.y = v.xong ? 0.38 + 0.9 : 0.38;
        steam.forEach((s, i) => {
          s.visible = v.xong;
          const k = (t * 0.6 + i / 4) % 1;
          s.position.set(Math.sin(i * 2.3) * 0.15, 0.4 + k * 0.9, Math.cos(i * 1.7) * 0.15);
          s.scale.setScalar(0.6 + k * 0.8);
          (s.material as THREE.MeshToonMaterial).opacity = 0.7 * (1 - k);
        });
      },
    };
  },
  lua() {
    const obj = new THREE.Group();
    const fires: THREE.Group[] = [];
    for (let i = 0; i < 5; i++) {
      const f = flame(1.4 + hash2(i, 1) * 0.6);
      f.position.set((i - 2) * 0.18, 0.18, Math.sin(i * 2.1) * 0.12);
      fires.push(f);
      obj.add(f);
    }
    const coal = at(part(geo.cyl(0.5, 0.55, 0.06, 10), 0x2a2220, 0), 0, 0.03, 0);
    const light = new THREE.PointLight(0xff8040, 2, 3.5, 1.5);
    light.position.y = 0.6;
    obj.add(coal, light);
    return {
      obj,
      upd(v, t) {
        fires.forEach((f, i) => ((f.visible = !v.xong), flick(f, t, i * 1.7)));
        light.intensity = v.xong ? 0 : 2 + Math.sin(t * 13) * 0.4;
      },
    };
  },
  mam() {
    const obj = new THREE.Group();
    obj.add(at(part(geo.cyl(0.3, 0.36, 0.12, 8), 0x7a5a3a), 0, 0.06, 0));
    const dry = at(part(geo.cone(0.06, 0.35, 5), 0x8a7a4a, 0.015), 0, 0.28, 0);
    dry.rotation.z = 0.5;
    const bridge = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const leaf = part(geo.box(0.7, 0.05, 0.45), i % 2 ? 0x5ab048 : 0x6ac458, 0.015);
      leaf.position.set(0, 0.12, -0.4 - i * 0.42);
      leaf.rotation.y = (i % 2 ? 1 : -1) * 0.15;
      bridge.add(leaf);
    }
    const vine = at(part(geo.cyl(0.06, 0.08, 0.6, 6), 0x3a8a3a, 0.015), 0, 0.3, 0);
    obj.add(dry, bridge, vine);
    return {
      obj,
      upd(v) {
        dry.visible = !v.xong;
        bridge.visible = vine.visible = v.xong;
        bridge.rotation.y = { n: 0, s: Math.PI, e: -Math.PI / 2, w: Math.PI / 2 }[v.huong];
      },
    };
  },
  cot() {
    const obj = new THREE.Group();
    const plate = at(part(geo.box(0.7, 0.06, 0.7), 0x6a665c, 0.015), 0, 0.03, 0);
    const rune = at(part(geo.box(0.36, 0.02, 0.36), 0xe9b23a, 0, 0xe9b23a, 0.4), 0, 0.07, 0);
    const pillar = at(part(geo.cyl(0.26, 0.3, 1.0, 6), 0xb89a5a, 0.025), 0, 0.55, 0);
    obj.add(plate, rune, pillar);
    return {
      obj,
      upd(v, t) {
        pillar.visible = v.xong;
        mat(rune).emissiveIntensity = v.xong ? 1.6 : 0.3 + Math.sin(t * 3) * 0.15;
      },
    };
  },
  cau() {
    const obj = new THREE.Group();
    const planks: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const p = part(geo.box(0.9, 0.08, 0.3), 0x8a6a42, 0.015);
      p.position.set(0, 0.05, (i - 2.5) * 0.34);
      planks.push(p);
      obj.add(p);
    }
    for (const s of [-1, 1]) obj.add(at(part(geo.box(0.06, 0.06, 2.1), 0x6a4a2a, 0.012), s * 0.45, 0.14, 0));
    return {
      obj,
      upd(v) {
        // Gãy: thiếu hai tấm giữa, các tấm lệch; vá xong thì đủ và phẳng.
        planks.forEach((p, i) => {
          const gap = !v.xong && (i === 2 || i === 3);
          p.visible = !gap;
          p.rotation.z = !v.xong ? (i % 2 ? 0.08 : -0.06) : 0;
        });
        obj.rotation.y = v.huong === "e" || v.huong === "w" ? Math.PI / 2 : 0;
      },
    };
  },
  tuong() {
    const obj = new THREE.Group();
    const wall = new THREE.Group();
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++) {
        const s = part(geo.box(0.34, 0.32, 0.4), r === 1 && c === 1 ? 0x7a7466 : 0x8a8476, 0.015);
        s.position.set((c - 1) * 0.35 + (r % 2) * 0.06, 0.17 + r * 0.33, 0);
        wall.add(s);
      }
    const crack = at(part(geo.box(0.04, 0.6, 0.42), 0x2a2620, 0), 0.02, 0.5, 0);
    crack.rotation.z = 0.4;
    const rubble = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const s = part(geo.ico(0.1 + hash2(i, 9) * 0.06, 0), 0x8a8476, 0.012);
      s.position.set((hash2(i, 2) - 0.5) * 0.9, 0.07, (hash2(i, 5) - 0.5) * 0.6);
      rubble.add(s);
    }
    obj.add(wall, crack, rubble);
    return {
      obj,
      upd(v) {
        wall.visible = crack.visible = !v.xong;
        rubble.visible = v.xong;
        obj.rotation.y = v.huong === "e" || v.huong === "w" ? Math.PI / 2 : 0;
      },
    };
  },
  coi() {
    const obj = new THREE.Group();
    obj.add(at(part(geo.cyl(0.22, 0.3, 1.1, 8), 0xd8c8a0, 0.02), 0, 0.55, 0));
    obj.add(at(part(geo.cone(0.32, 0.3, 8), 0x8a4a3a, 0.02), 0, 1.25, 0));
    const hub = at(new THREE.Group(), 0, 0.95, 0.3);
    for (let i = 0; i < 4; i++) {
      const bl = part(geo.box(0.12, 0.6, 0.03), 0xf0e8d0, 0.012);
      bl.position.y = 0.32;
      const arm = new THREE.Group();
      arm.rotation.z = (i * Math.PI) / 2;
      arm.add(bl);
      hub.add(arm);
    }
    obj.add(hub);
    return {
      obj,
      upd(v, t) {
        hub.rotation.z = v.xong ? -t * 4 : 0.2;
      },
    };
  },
  suong() {
    const obj = new THREE.Group();
    const puffs: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const s = part(geo.sph(0.3 + hash2(i, 4) * 0.15, 10), 0x9a6ac8, 0, 0x6a3aa0, 0.4);
      const m = s.material as THREE.MeshToonMaterial;
      m.transparent = true;
      m.opacity = 0.55;
      m.depthWrite = false;
      s.castShadow = false;
      puffs.push(s);
      obj.add(s);
    }
    return {
      obj,
      upd(v, t) {
        puffs.forEach((s, i) => {
          s.visible = !v.xong;
          s.position.set(
            Math.sin(t * 0.5 + i * 1.3) * 0.4,
            0.35 + Math.sin(t * 0.8 + i) * 0.1 + (i % 3) * 0.15,
            Math.cos(t * 0.4 + i * 2.1) * 0.35,
          );
        });
      },
    };
  },
  luongGio() {
    const obj = new THREE.Group();
    obj.add(at(part(geo.cyl(0.4, 0.46, 0.1, 10), 0x6a8a7a, 0.015), 0, 0.05, 0));
    const vent = at(part(geo.cyl(0.28, 0.28, 0.02, 12), 0x2a3a34, 0), 0, 0.11, 0);
    obj.add(vent);
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.025, 6, 20),
        new THREE.MeshBasicMaterial({ color: 0xbdf6e4, transparent: true, depthWrite: false }),
      );
      r.rotation.x = Math.PI / 2;
      rings.push(r);
      obj.add(r);
    }
    return {
      obj,
      upd(v, t) {
        rings.forEach((r, i) => {
          r.visible = v.xong;
          const k = (t * 0.9 + i / 3) % 1;
          r.position.y = 0.15 + k * 1.8;
          r.scale.setScalar(1 + k * 0.6);
          (r.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - k);
        });
      },
    };
  },
  bangMat() {
    const obj = new THREE.Group();
    const deep = at(part(geo.box(0.95, 0.02, 0.95), 0x2a5a9a, 0, 0x1a3a70, 0.3), 0, 0.01, 0);
    const path = at(part(geo.box(0.9, 0.08, 0.9), 0xbfe8ff, 0.012, 0x7ac8f0, 0.25), 0, 0.04, 0);
    obj.add(deep, path);
    return {
      obj,
      upd(v) {
        path.visible = v.xong;
      },
    };
  },
  loiTru() {
    const obj = new THREE.Group();
    obj.add(stoneBase(0.55));
    obj.add(at(part(geo.cyl(0.08, 0.1, 1.2, 6), 0x5a5a6a, 0.02), 0, 0.7, 0));
    const core = at(part(geo.ico(0.16, 1), 0xb87333, 0.015, 0xb47bff, 0), 0, 1.0, 0);
    const tip = at(part(geo.cone(0.06, 0.25, 6), 0xc0c0d0, 0.012), 0, 1.42, 0);
    const light = new THREE.PointLight(0xb47bff, 0, 3, 1.6);
    light.position.y = 1.1;
    obj.add(core, tip, light);
    return {
      obj,
      upd(v, t) {
        const m = mat(core);
        m.emissiveIntensity = v.xong ? 1.8 + Math.sin(t * 20) * 0.4 : v.trangThai > 0 ? 0.6 : 0;
        core.rotation.y = t * (v.xong ? 3 : 0.3);
        light.intensity = v.xong ? 2 : 0;
      },
    };
  },
};

/** NPC quest mini: người toon cách điệu, màu theo id, quay về phía người chơi khi lại gần. */
function buildNpc(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const r = (k: number) => hash2(h & 0xffff, k);
  const robes = [0x6a4a8a, 0x3a6a8a, 0x8a5a3a, 0x4a7a5a, 0x8a3a4a, 0x5a5a7a],
    hairs = [0x3a2a20, 0x1a1a24, 0x8a6a3a, 0xc8c0b0, 0x6a3a2a, 0x2a3a5a],
    skins = [0xf2d2b0, 0xe8c09a, 0xd8a880, 0xf6dcc4];
  const robe = robes[Math.floor(r(1) * robes.length)],
    hair = hairs[Math.floor(r(2) * hairs.length)],
    skin = skins[Math.floor(r(3) * skins.length)];
  const s = 0.85 + r(4) * 0.25;
  const obj = new THREE.Group(),
    body = new THREE.Group();
  obj.add(body);
  body.scale.setScalar(s);
  body.add(at(part(geo.cyl(0.17, 0.3, 0.7, 10), robe, 0.02), 0, 0.35, 0));
  body.add(at(part(geo.cyl(0.18, 0.18, 0.08, 10), 0xe0c890, 0.012), 0, 0.5, 0));
  const head = at(part(geo.sph(0.22, 14), skin, 0.02), 0, 0.95, 0);
  body.add(head);
  const hairM = part(geo.sph(0.235, 14), hair, 0.02);
  hairM.scale.set(1, 0.75, 1);
  hairM.position.set(0, 0.06, -0.03);
  head.add(hairM);
  if (r(5) > 0.5) head.add(at(part(geo.sph(0.11, 8), hair, 0.015), 0, 0.1, -0.2));
  for (const sx of [-1, 1]) {
    const e = part(geo.sph(0.035, 8), 0x1a1426, 0);
    e.position.set(sx * 0.08, -0.01, 0.19);
    head.add(e);
    const arm = part(geo.cyl(0.05, 0.06, 0.45, 6), robe, 0.015);
    arm.position.set(sx * 0.22, 0.48, 0);
    arm.rotation.z = sx * 0.25;
    body.add(arm);
    arm.add(at(part(geo.sph(0.06, 8), skin, 0), 0, -0.25, 0));
  }
  // Dấu nhiệm vụ: "!" vàng (chưa nói chuyện) hoặc ba chấm xanh (đang làm).
  const bang = new THREE.Group();
  bang.add(at(part(geo.box(0.07, 0.24, 0.07), 0xffe27a, 0.015, 0xffc040, 1.4), 0, 0.12, 0));
  bang.add(at(part(geo.box(0.07, 0.07, 0.07), 0xffe27a, 0.015, 0xffc040, 1.4), 0, -0.06, 0));
  const dots = new THREE.Group();
  for (let i = 0; i < 3; i++)
    dots.add(at(part(geo.sph(0.045, 8), 0x9fe8ff, 0.01, 0x6ac8f0, 1.2), (i - 1) * 0.12, 0, 0));
  const mark = at(new THREE.Group(), 0, 1.45 * s, 0);
  mark.add(bang, dots);
  obj.add(mark);
  return { obj, body, head, mark, bang, dots, yaw: r(6) * Math.PI * 2 };
}

type NpcV = ReturnType<typeof buildNpc>;

/** Đồng bộ mô hình 3D với câu đố và NPC của bản đồ hiện tại. Gọi mỗi khung. */
export function createS23Layer(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);
  const objs = new Map<PObj, Built>(),
    npcs = new Map<any, NpcV>();
  const dispose = (o: THREE.Object3D) => {
    o.removeFromParent();
    o.traverse((c: any) => {
      c.geometry?.dispose();
      if (c.material && !c.material.side) c.material.dispose?.();
    });
  };
  return {
    sync(
      W: any,
      P: { x: number; y: number },
      puz: { mini: string[]; talked: string[] },
      ts: number,
      ground: (x: number, y: number) => number,
      t: number,
      near: (x: number, y: number) => boolean,
    ) {
      const live = new Set<any>();
      for (const st of (W?.puzzles ?? []) as PState[])
        for (const o of st.objs) {
          if (!near(o.x, o.y)) continue;
          const make = B[o.loai];
          if (!make) continue;
          live.add(o);
          let b = objs.get(o);
          if (!b) {
            b = make();
            objs.set(o, b);
            group.add(b.obj);
          }
          const v = objView(o, ts);
          b.obj.position.set(o.x / ts, ground(o.x, o.y), o.y / ts);
          b.upd?.(v, t);
          // Vừa đổi trạng thái: lóe sáng theo nguyên tố bước vừa dùng.
          if (o.flash > 0) b.obj.scale.setScalar(1 + o.flash * 0.12);
          else b.obj.scale.setScalar(1);
        }
      for (const [o, b] of objs)
        if (!live.has(o)) {
          dispose(b.obj);
          objs.delete(o);
        }
      const liveN = new Set<any>();
      for (const n of (W?.npcs ?? []) as any[]) {
        if (!near(n.x, n.y)) continue;
        liveN.add(n);
        let v = npcs.get(n);
        if (!v) {
          v = buildNpc(n.mini?.id ?? `${n.x},${n.y}`);
          npcs.set(n, v);
          group.add(v.obj);
        }
        v.obj.position.set(n.x / ts, ground(n.x, n.y), n.y / ts);
        const d = Math.hypot(P.x - n.x, P.y - n.y);
        const want = d < ts * 4 ? Math.atan2(P.x - n.x, P.y - n.y) : v.yaw;
        let dy = want - v.obj.rotation.y;
        dy = Math.atan2(Math.sin(dy), Math.cos(dy));
        v.obj.rotation.y += dy * 0.08;
        v.body.position.y = Math.sin(t * 2 + v.yaw) * 0.015;
        v.head.rotation.z = Math.sin(t * 1.3 + v.yaw) * 0.05;
        const id = n.mini?.id,
          done = id && puz.mini.includes(id),
          talked = id && puz.talked.includes(id);
        v.mark.visible = !done;
        v.bang.visible = !talked;
        v.dots.visible = !!talked;
        v.mark.position.y = 1.45 * v.body.scale.y + Math.sin(t * 4) * 0.05;
        v.mark.rotation.y = t * 1.5 - v.obj.rotation.y;
      }
      for (const [n, v] of npcs)
        if (!liveN.has(n)) {
          dispose(v.obj);
          npcs.delete(n);
        }
    },
    has(loai: string) {
      return !!B[loai];
    },
    dispose() {
      for (const b of objs.values()) dispose(b.obj);
      for (const v of npcs.values()) dispose(v.obj);
      objs.clear();
      npcs.clear();
      group.removeFromParent();
    },
  };
}

export const S23_3D_KINDS = Object.keys(B);
