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
  private wasDash = false;
  constructor() {
    this.group.add(this.trail.mesh, this.sparks.pts);
  }
  color(c: THREE.ColorRepresentation, c2: THREE.ColorRepresentation = c) {
    this.trail.color(c2);
    this.sparks.color(c);
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
      const n = Math.max(1, Math.round(dt * (this.wasDash ? 260 : 2600)));
      this.sparks.emit(hips, a.hipsH * 1.4, fwd.multiplyScalar(-3.2), Math.min(n, 60));
    }
    this.wasDash = s.dash;
    this.sparks.update(dt);
  }
}
