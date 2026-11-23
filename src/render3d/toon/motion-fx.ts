/**
 * S27: hiệu ứng chuyển động của nhân vật chính, dùng chung cho renderer 3D và trang xem trước.
 *  - Vệt chém: dải nối mũi và gốc lưỡi các khung gần nhất; đòn kết (đòn 3, kỹ năng, nộ) vệt dài và rộng hơn.
 *    Pháp khí: nét ấn theo đầu ngón trỏ tay phải.
 *  - Lướt: hạt sáng theo màu nguyên tố bay ngược hướng lao.
 */
import * as THREE from "three";
import type { VrmActor } from "./actor";

const N = 26;

class SwingTrail {
  mesh: THREE.Mesh;
  private pos = new Float32Array(N * 6);
  private al = new Float32Array(N * 2);
  private geo = new THREE.BufferGeometry();
  private mat: THREE.ShaderMaterial;
  private tip: THREE.Vector3[] = [];
  private base: THREE.Vector3[] = [];
  private len = 12;
  private bright = 0.8;
  constructor() {
    this.geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute("a", new THREE.BufferAttribute(this.al, 1));
    const ti: number[] = [];
    for (let i = 0; i < N - 1; i++) ti.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
    this.geo.setIndex(ti);
    this.mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uC: { value: new THREE.Color(0xffffff) } },
      vertexShader:
        "attribute float a; varying float vA; void main(){ vA=a; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader:
        "uniform vec3 uC; varying float vA; void main(){ gl_FragColor=vec4(mix(uC,vec3(1.0),0.35*vA*vA)*vA, vA); }",
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.frustumCulled = false;
  }
  color(c: THREE.ColorRepresentation) {
    this.mat.uniforms.uC.value.set(c);
  }
  clear() {
    this.tip.length = this.base.length = 0;
  }
  /** a/b: mũi và gốc (thế giới) ở khung này, null khi không vung (vệt rút dần). */
  push(a: THREE.Vector3 | null, b: THREE.Vector3 | null, len: number, bright: number) {
    if (a && b) {
      this.len = len;
      this.bright = bright;
      // Chèn điểm giữa khi vung nhanh để vệt cong mượt.
      const pa = this.tip[0],
        pb = this.base[0];
      if (pa && pa.distanceTo(a) > 0.12) {
        this.tip.unshift(pa.clone().lerp(a, 0.5));
        this.base.unshift(pb.clone().lerp(b, 0.5));
      }
      this.tip.unshift(a);
      this.base.unshift(b);
      while (this.tip.length > Math.min(N, len)) {
        this.tip.pop();
        this.base.pop();
      }
    } else
      for (let k = 0; k < 2 && this.tip.length; k++) {
        this.tip.pop();
        this.base.pop();
      }
    const n = this.tip.length;
    for (let i = 0; i < N; i++) {
      const a2 = this.tip[Math.min(i, n - 1)],
        b2 = this.base[Math.min(i, n - 1)];
      if (a2 && b2 && n > 1 && i < n) {
        this.pos.set([a2.x, a2.y, a2.z, b2.x, b2.y, b2.z], i * 6);
        const f = Math.pow(1 - i / Math.max(n, this.len * 0.7), 1.3) * this.bright;
        this.al[i * 2] = Math.max(0, f);
        this.al[i * 2 + 1] = Math.max(0, f * 0.12);
      } else {
        if (a2 && b2) this.pos.set([a2.x, a2.y, a2.z, b2.x, b2.y, b2.z], i * 6);
        this.al[i * 2] = this.al[i * 2 + 1] = 0;
      }
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.a.needsUpdate = true;
  }
}

const M = 220;
class Sparks {
  pts: THREE.Points;
  private p = new Float32Array(M * 3);
  private v = new Float32Array(M * 3);
  private l = new Float32Array(M);
  private a = new Float32Array(M);
  private mat: THREE.ShaderMaterial;
  private i = 0;
  constructor() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.p, 3));
    g.setAttribute("a", new THREE.BufferAttribute(this.a, 1));
    this.mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uC: { value: new THREE.Color(0xffffff) }, uS: { value: 90 } },
      vertexShader:
        "attribute float a; varying float vA; uniform float uS; void main(){ vA=a; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=uS*(0.4+0.6*a)/-mv.z; gl_Position=projectionMatrix*mv; }",
      fragmentShader:
        "uniform vec3 uC; varying float vA; void main(){ vec2 d=gl_PointCoord-0.5; float r=1.0-smoothstep(0.05,0.5,length(d)); if(vA<=0.0||r<=0.0) discard; gl_FragColor=vec4(mix(uC,vec3(1.0),0.45*r*r)*1.2, r*vA); }",
    });
    this.pts = new THREE.Points(g, this.mat);
    this.pts.frustumCulled = false;
  }
  color(c: THREE.ColorRepresentation) {
    this.mat.uniforms.uC.value.set(c);
  }
  /** Phát n hạt quanh c trong vùng thân người (h cao), bay theo vel ± tỏa. */
  emit(c: THREE.Vector3, h: number, vel: THREE.Vector3, n: number) {
    for (let k = 0; k < n; k++) {
      const j = (this.i = (this.i + 1) % M);
      const r = new THREE.Vector3(Math.random() - 0.5, Math.random(), Math.random() - 0.5);
      this.p.set([c.x + r.x * 0.35 * h, c.y + (r.y - 0.45) * h, c.z + r.z * 0.35 * h], j * 3);
      const s = 0.6 + Math.random() * 0.6;
      this.v.set([vel.x * s + r.x * 0.8, vel.y * s + (Math.random() - 0.3) * 0.6, vel.z * s + r.z * 0.8], j * 3);
      this.l[j] = 0.25 + Math.random() * 0.25;
    }
  }
  update(dt: number) {
    for (let j = 0; j < M; j++) {
      if (this.l[j] <= 0) {
        this.a[j] = 0;
        continue;
      }
      this.l[j] -= dt;
      for (let k = 0; k < 3; k++) {
        this.p[j * 3 + k] += this.v[j * 3 + k] * dt;
        this.v[j * 3 + k] *= 1 - Math.min(1, dt * 4);
      }
      this.a[j] = Math.max(0, Math.min(1, this.l[j] * 3));
    }
    this.pts.geometry.attributes.position.needsUpdate = true;
    this.pts.geometry.attributes.a.needsUpdate = true;
  }
}

/** Bóng mờ khi lướt: chụp tư thế xương lúc đó, vẽ lại thân bằng màu nguyên tố, mờ dần. Dùng chung hình học với nhân vật. */
class Ghosts {
  group = new THREE.Group();
  private sets: { meshes: THREE.SkinnedMesh[]; mats: THREE.MeshBasicMaterial[]; age: number }[] = [];
  private src: VrmActor | null = null;
  private col = new THREE.Color(0xffffff);
  life = 0.32;
  color(c: THREE.ColorRepresentation) {
    this.col.set(c).multiplyScalar(0.85);
    for (const g of this.sets) for (const m of g.mats) m.color.copy(this.col);
  }
  private build(a: VrmActor) {
    for (const g of this.sets) for (const m of g.meshes) this.group.remove(m);
    this.sets = [];
    this.src = a;
    const orig: THREE.SkinnedMesh[] = [];
    a.vrm.scene.traverse((o) => {
      if ((o as THREE.SkinnedMesh).isSkinnedMesh) orig.push(o as THREE.SkinnedMesh);
    });
    for (let k = 0; k < 3; k++) {
      const mats: THREE.MeshBasicMaterial[] = [];
      const ghostMat = (m: THREE.Material) => {
        const map = (m as any).map ?? null;
        const g = new THREE.MeshBasicMaterial({
          color: this.col,
          map,
          alphaTest: map ? 0.4 : 0,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          side: THREE.FrontSide,
        });
        // Bóng một màu: chỉ lấy alpha của texture (tóc, mép vải), màu là màu nguyên tố.
        g.onBeforeCompile = (sh) => {
          sh.fragmentShader = sh.fragmentShader.replace(
            "#include <map_fragment>",
            "#ifdef USE_MAP\n diffuseColor.a *= texture2D( map, vMapUv ).a;\n#endif",
          );
        };
        mats.push(g);
        return g;
      };
      const meshes = orig.map((o) => {
        const mat = Array.isArray(o.material) ? o.material.map(ghostMat) : ghostMat(o.material);
        const g = new THREE.SkinnedMesh(o.geometry, mat);
        const sk = new THREE.Skeleton(o.skeleton.bones, o.skeleton.boneInverses);
        sk.boneMatrices = new Float32Array(o.skeleton.boneMatrices.length);
        sk.update = () => {};
        g.bind(sk, o.bindMatrix);
        g.bindMode = THREE.DetachedBindMode;
        g.matrixAutoUpdate = false;
        g.frustumCulled = false;
        g.visible = false;
        g.renderOrder = 2;
        this.group.add(g);
        return g;
      });
      this.sets.push({ meshes, mats, age: 9 });
    }
  }
  /** Chụp một bóng mờ ở tư thế hiện tại (sau khi nhân vật đã cập nhật khung này). */
  snap(a: VrmActor) {
    if (this.src !== a) this.build(a);
    const g = this.sets.reduce((x, y) => (y.age > x.age ? y : x));
    const orig: THREE.SkinnedMesh[] = [];
    a.vrm.scene.traverse((o) => {
      if ((o as THREE.SkinnedMesh).isSkinnedMesh) orig.push(o as THREE.SkinnedMesh);
    });
    g.meshes.forEach((m, i) => {
      const o = orig[i];
      if (!o) return;
      o.skeleton.update();
      m.skeleton.boneMatrices.set(o.skeleton.boneMatrices);
      if (m.skeleton.boneTexture) m.skeleton.boneTexture.needsUpdate = true;
      if (o.morphTargetInfluences && m.morphTargetInfluences) m.morphTargetInfluences.splice(0, Infinity, ...o.morphTargetInfluences);
      // Detached: vị trí thế giới = matrixWorld · bindMatrix⁻¹ · Σ(xương · bindMatrix · v) → đặt matrixWorld = bindMatrix.
      m.matrix.copy(o.bindMatrix);
      m.matrixWorld.copy(o.bindMatrix);
      m.visible = true;
    });
    // Hiện từ khung sau (nhân vật đã lao đi), không phủ lên thân.
    g.age = -1e-3;
    for (const m of g.meshes) m.visible = false;
  }
  update(dt: number) {
    for (const g of this.sets) {
      const first = g.age < 0;
      g.age += dt;
      const k = Math.max(0, 1 - g.age / this.life);
      for (const m of g.mats) m.opacity = 0.62 * k;
      if (!first) for (const m of g.meshes) m.visible = k > 0;
    }
  }
}

/** Vệt gió khi lướt: đoạn thẳng sáng bay ngược hướng lướt quanh thân (màu nhân alpha, cộng màu). */
const NL = 28;
class Streaks {
  lines: THREE.LineSegments;
  private p = new Float32Array(NL * 6);
  private c = new Float32Array(NL * 6);
  private o = Array.from({ length: NL }, () => ({ p: new THREE.Vector3(), v: new THREE.Vector3(), len: 0, age: 9, life: 1 }));
  private col = new THREE.Color(0xffffff);
  private i = 0;
  constructor() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.p, 3));
    g.setAttribute("color", new THREE.BufferAttribute(this.c, 3));
    this.lines = new THREE.LineSegments(
      g,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    this.lines.frustumCulled = false;
  }
  color(c: THREE.ColorRepresentation) {
    this.col.set(c).lerp(new THREE.Color(0xffffff), 0.45);
  }
  emit(c: THREE.Vector3, h: number, fwd: THREE.Vector3, n: number) {
    const side = new THREE.Vector3(fwd.z, 0, -fwd.x);
    for (let k = 0; k < n; k++) {
      const s = this.o[(this.i = (this.i + 1) % NL)];
      const a = Math.random() * Math.PI * 2,
        r = 0.22 + Math.random() * 0.25;
      s.p
        .copy(c)
        .addScaledVector(side, Math.cos(a) * r * h)
        .add(new THREE.Vector3(0, (Math.sin(a) * 0.55 + 0.1) * h, 0))
        .addScaledVector(fwd, (Math.random() - 0.2) * 0.4 * h);
      s.v.copy(fwd).multiplyScalar(-(3 + Math.random() * 2));
      s.len = (0.35 + Math.random() * 0.4) * h;
      s.age = 0;
      s.life = 0.18 + Math.random() * 0.14;
    }
  }
  update(dt: number) {
    const d = new THREE.Vector3();
    this.o.forEach((s, j) => {
      s.age += dt;
      const k = s.age < s.life ? Math.sin((Math.PI * s.age) / s.life) : 0;
      s.p.addScaledVector(s.v, dt);
      d.copy(s.v).setLength(s.len * (0.4 + 0.6 * k));
      this.p.set([s.p.x, s.p.y, s.p.z, s.p.x - d.x, s.p.y - d.y, s.p.z - d.z], j * 6);
      const r = this.col.r * k,
        g = this.col.g * k,
        b = this.col.b * k;
      this.c.set([r, g, b, r * 0.15, g * 0.15, b * 0.15], j * 6);
    });
    this.lines.geometry.attributes.position.needsUpdate = true;
    this.lines.geometry.attributes.color.needsUpdate = true;
  }
}

/** Vòng sóng gió ở điểm xuất phát lướt: một vòng nằm trên đất và một vòng dựng quanh thân, nở ra rồi tan. */
class Burst {
  group = new THREE.Group();
  private ground: THREE.Mesh;
  private wall: THREE.Mesh;
  private mats: THREE.MeshBasicMaterial[] = [];
  private age = 9;
  constructor() {
    const mat = () => {
      const m = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      this.mats.push(m);
      return m;
    };
    this.ground = new THREE.Mesh(new THREE.RingGeometry(0.78, 1, 40), mat());
    this.ground.rotation.x = -Math.PI / 2;
    this.wall = new THREE.Mesh(new THREE.RingGeometry(0.86, 1, 40), mat());
    this.group.add(this.ground, this.wall);
    this.group.visible = false;
  }
  color(c: THREE.ColorRepresentation) {
    for (const m of this.mats) m.color.set(c).lerp(new THREE.Color(0xffffff), 0.35);
  }
  fire(at: THREE.Vector3, h: number, fwd: THREE.Vector3) {
    this.group.position.copy(at);
    this.group.rotation.y = Math.atan2(fwd.x, fwd.z);
    this.group.scale.setScalar(h);
    this.wall.position.set(0, 0.55, 0.05);
    this.age = 0;
    this.group.visible = true;
  }
  update(dt: number) {
    if (!this.group.visible) return;
    this.age += dt;
    const k = this.age / 0.4;
    if (k >= 1) {
      this.group.visible = false;
      return;
    }
    const e = 1 - (1 - k) ** 3;
    this.ground.scale.setScalar(0.25 + 0.75 * e);
    this.wall.scale.setScalar(0.12 + 0.38 * e);
    this.mats[0].opacity = 0.75 * (1 - k);
    this.mats[1].opacity = 0.55 * (1 - k) ** 2;
  }
}

export interface HeroFxIn {
  /** Đang trong cửa sổ ra đòn, và đó là đòn kết (đòn 3 / kỹ năng / nộ). */
  acting: boolean;
  fin: boolean;
  dash: boolean;
}

export class HeroFx {
  group = new THREE.Group();
  private trail = new SwingTrail();
  private sparks = new Sparks();
  private ghosts = new Ghosts();
  private streaks = new Streaks();
  private burst = new Burst();
  private wasDash = false;
  private dashT = 0;
  constructor() {
    this.group.add(this.trail.mesh, this.sparks.pts, this.ghosts.group, this.streaks.lines, this.burst.group);
  }
  color(c: THREE.ColorRepresentation, c2: THREE.ColorRepresentation = c) {
    this.trail.color(c2);
    this.sparks.color(c);
    this.ghosts.color(c);
    this.streaks.color(c);
    this.burst.color(c);
  }
  clear() {
    this.trail.clear();
  }
  update(a: VrmActor, s: HeroFxIn, dt: number) {
    const w = a.wtype,
      inHand = !a.wfx || a.wfx.st === "hand";
    let tip: THREE.Vector3 | null = null,
      base: THREE.Vector3 | null = null;
    if (s.acting && inHand && a.weapon && w !== "bow" && w !== "cat") {
      a.weapon.updateWorldMatrix(true, false);
      tip = a.weapon.localToWorld(new THREE.Vector3(0, s.fin ? 1.08 : 0.95, 0));
      base = a.weapon.localToWorld(new THREE.Vector3(0, s.fin ? 0.22 : 0.38, 0));
    } else if (s.acting && w === "cat") {
      const f = a.vrm.humanoid.getNormalizedBoneNode("rightIndexDistal"),
        h = a.vrm.humanoid.getNormalizedBoneNode("rightHand");
      if (f && h) {
        tip = f.getWorldPosition(new THREE.Vector3());
        base = h.getWorldPosition(new THREE.Vector3()).lerp(tip, s.fin ? 0.25 : 0.5);
      }
    }
    this.trail.push(tip, base, s.fin ? 26 : 13, s.fin ? 1.25 : 0.8);
    if (s.dash) {
      const hips = a.vrm.humanoid.getNormalizedBoneNode("hips")!.getWorldPosition(new THREE.Vector3());
      const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(a.obj.getWorldQuaternion(new THREE.Quaternion()));
      fwd.y = 0;
      fwd.normalize();
      if (!this.wasDash) {
        this.dashT = 0;
        const foot = a.vrm.humanoid.getNormalizedBoneNode("leftFoot")!.getWorldPosition(new THREE.Vector3());
        this.burst.fire(new THREE.Vector3(hips.x, foot.y - 0.06, hips.z), a.hipsH * 1.1, fwd);
        this.ghosts.snap(a);
      } else if (Math.floor((this.dashT + dt) / 0.07) > Math.floor(this.dashT / 0.07)) this.ghosts.snap(a);
      this.dashT += dt;
      const n = Math.max(1, Math.round(dt * (this.wasDash ? 300 : 2600)));
      this.sparks.emit(hips, a.hipsH * 1.4, fwd.clone().multiplyScalar(-3.2), Math.min(n, 60));
      this.streaks.emit(hips, a.hipsH * 1.6, fwd, Math.max(1, Math.round(dt * 90)));
    }
    this.wasDash = s.dash;
    this.sparks.update(dt);
    this.ghosts.update(dt);
    this.streaks.update(dt);
    this.burst.update(dt);
  }
}
