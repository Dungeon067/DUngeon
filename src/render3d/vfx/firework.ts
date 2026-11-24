/*
 * Pháo hoa (S30, theo bản mẫu tham khảo): đạn bay lên có vệt lấp lánh, nổ thành tia dài theo vận tốc (quad
 * kéo theo vận tốc, một lần vẽ cho mọi quả), lực cản 0,9 mỗi khung rồi rủ xuống theo trọng lực,
 * màu trắng vàng → vàng → cam → đỏ, kim tuyến nhấp nháy 2 khung bật 3 khung tắt.
 * Quả đặc biệt nổ thành bông mai 5 cánh trên mặt phẳng quay về camera.
 */
import * as THREE from "three";
import type { Vfx } from "./system";
import { impactRing } from "./impact";

const FPS = 60;
const MAX_Q = 1400;
interface Streak {
  p: THREE.Vector3;
  v: THREE.Vector3;
  kind: 0 | 1 | 2 | 3;
  tip: number;
}
interface Shell {
  age: number;
  from: THREE.Vector3;
  to: THREE.Vector3;
  mai: boolean;
  first: boolean;
  st: Streak[];
  cr: { p: THREE.Vector3; ph: number }[];
  tr: { p: THREE.Vector3; f: number; wx: number; wz: number }[];
  smoke: boolean;
  boom: boolean;
  scale: number;
}
const C = {
  wg: new THREE.Color(0xfff6c8),
  g: new THREE.Color(0xffd24a),
  o: new THREE.Color(0xff8a2a),
  r: new THREE.Color(0xd83a1e),
  mb: new THREE.Color(0xffe35a),
  mt: new THREE.Color(0xff9a2e),
  mc: new THREE.Color(0xffc531),
  ms: new THREE.Color(0xff6a26),
  amber: new THREE.Color(0xffb347),
  white: new THREE.Color(0xffffff),
};

export class Fireworks {
  private shells: Shell[] = [];
  private pos = new Float32Array(MAX_Q * 12);
  private col = new Float32Array(MAX_Q * 12);
  private al = new Float32Array(MAX_Q * 4);
  private mesh: THREE.Mesh;
  private n = 0;
  /** Hệ số số tia theo mức đồ họa. */
  q = 1;
  private readonly t0 = new THREE.Vector3();
  private readonly t1 = new THREE.Vector3();
  private readonly cd = new THREE.Vector3();
  private readonly sd = new THREE.Vector3();
  private readonly tc = new THREE.Color();
  private readonly tc2 = new THREE.Color();
  constructor(parent: THREE.Object3D) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(this.col, 3));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(this.al, 1));
    const idx = new Uint32Array(MAX_Q * 6);
    for (let i = 0; i < MAX_Q; i++) idx.set([i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 1, i * 4 + 3, i * 4 + 2], i * 6);
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      vertexShader: /* glsl */ `attribute vec3 aColor; attribute float aAlpha; varying vec3 vC; varying float vA;
        void main(){ vC = aColor; vA = aAlpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `varying vec3 vC; varying float vA; void main(){ if (vA < .01) discard; gl_FragColor = vec4(vC * 1.4, vA); }`,
    });
    this.mesh = new THREE.Mesh(g, m);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 5;
    parent.add(this.mesh);
  }
  /** Bắn một quả từ `from`, nổ ở `to` sau 24 khung. scale = bán kính chùm (m) so với bản mẫu 2,2 m. */
  launch(from: THREE.Vector3, to: THREE.Vector3, mai: boolean, delayFrames = 0, scale = 0.6, first = false) {
    if (this.shells.length >= 8) this.shells.shift();
    const st: Streak[] = [];
    const n = Math.round((mai ? 175 : 140) * Math.max(0.4, this.q));
    for (let i = 0; i < n; i++) st.push({ p: new THREE.Vector3(), v: new THREE.Vector3(), kind: 0, tip: 0 });
    this.shells.push({
      age: -delayFrames / FPS,
      from: from.clone(),
      to: to.clone(),
      mai,
      first,
      st,
      cr: [],
      tr: [],
      smoke: false,
      boom: false,
      scale,
    });
  }
  private quad(h: THREE.Vector3, t: THREE.Vector3, w: number, c: THREE.Color, ah: number, cam: THREE.Camera) {
    if (this.n >= MAX_Q) return;
    const i = this.n++;
    this.cd.copy(cam.position).sub(h).normalize();
    this.sd.subVectors(h, t);
    if (this.sd.lengthSq() < 1e-8) this.sd.set(0, 0.01, 0);
    this.sd.cross(this.cd).normalize().multiplyScalar(w);
    const P = this.pos;
    P.set(
      [h.x + this.sd.x, h.y + this.sd.y, h.z + this.sd.z, h.x - this.sd.x, h.y - this.sd.y, h.z - this.sd.z],
      i * 12,
    );
    P.set(
      [t.x + this.sd.x, t.y + this.sd.y, t.z + this.sd.z, t.x - this.sd.x, t.y - this.sd.y, t.z - this.sd.z],
      i * 12 + 6,
    );
    for (let k = 0; k < 4; k++) this.col.set([c.r, c.g, c.b], i * 12 + k * 3);
    this.al.set([ah, ah, 0, 0], i * 4);
  }
  update(X: Vfx, dt: number, cam: THREE.Camera) {
    this.n = 0;
    const steps = dt * FPS;
    for (const s of this.shells) {
      s.age += dt;
      if (s.age < 0) continue;
      const f = s.age * FPS,
        S = s.scale;
      // Bay lên 24 khung, đầu đạn sáng và vệt lấp lánh lắc nhẹ.
      if (f < 24) {
        const e = 1 - Math.pow(1 - f / 23, 2.2);
        const hp = this.t0.lerpVectors(s.from, s.to, e);
        X.V.glow(hp.x, hp.y, hp.z, "#ffb347", 0.8);
        if (s.tr.length < 30 && s.tr.length < f + 1)
          s.tr.push({ p: hp.clone(), f, wx: (Math.random() - 0.5) * 0.1, wz: (Math.random() - 0.5) * 0.1 });
        this.t1.copy(hp).y -= 0.08;
        this.quad(hp, this.t1, 0.03, C.wg, 1, cam);
      }
      for (const t of s.tr) {
        const a = f - t.f;
        if (a < 0 || a >= 12) continue;
        const w = Math.sin(a * 1.4) * 0.05;
        this.t0.set(t.p.x + t.wx + w, t.p.y - a * 0.015, t.p.z + t.wz);
        this.t1.copy(this.t0).y -= 0.05;
        this.quad(this.t0, this.t1, 0.022, C.amber, 1 - a / 12, cam);
      }
      if (f >= 24 && !s.boom) {
        s.boom = true;
        this.burst(X, s, S, cam);
      }
      if (f >= 30 && !s.smoke) {
        s.smoke = true;
        for (let k = 0; k < (this.q >= 1 ? 2 : 1); k++) {
          const a = k * Math.PI;
          X.puffs.spawn(
            s.to.x + Math.cos(a) * 0.3 * S,
            s.to.y + (k - 1) * 0.15,
            s.to.z + Math.sin(a) * 0.3 * S,
            "fire",
            0.28 * S,
            40,
            0,
            0,
            0.4,
          );
        }
      }
      if (f >= 24 && f <= 76) {
        const drag = Math.pow(0.9, steps),
          ha = f < 55 ? 1 : Math.max(0, 1 - (f - 55) / 20);
        const c = this.tc;
        if (f <= 34) c.copy(C.wg);
        else if (f <= 40) c.copy(C.wg).lerp(C.g, (f - 34) / 6);
        else if (f <= 55) c.copy(C.g).lerp(C.o, (f - 40) / 15);
        else c.copy(C.o).lerp(C.r, Math.min(1, (f - 55) / 15));
        for (const st of s.st) {
          st.v.multiplyScalar(drag);
          if (f >= 34) st.v.y += (s.mai && f < 55 ? -0.45 : -3) * S * dt;
          st.p.addScaledVector(st.v, dt);
          const k = s.mai ? Math.max(0.055, 0.16 / Math.max(0.4, st.v.length() / S)) : 0.05;
          this.t1.copy(st.p).addScaledVector(st.v, -k);
          const sc =
            st.kind === 1 ? this.tc2.copy(C.mb).lerp(C.mt, st.tip) : st.kind === 2 ? C.mc : st.kind === 3 ? C.ms : c;
          this.quad(st.p, this.t1, 0.0175 * Math.max(0.7, S), sc, ha, cam);
        }
      }
      // Kim tuyến nhấp nháy dọc đường rủ.
      if (f >= 45 && f <= 90) {
        if (!s.cr.length)
          for (let i = 0; i < 60 * Math.max(0.4, this.q); i++) {
            const src = s.st[Math.floor((i / 60) * s.st.length)];
            s.cr.push({
              p: src.p
                .clone()
                .add(
                  new THREE.Vector3(
                    (Math.random() - 0.5) * 0.22,
                    (Math.random() - 0.5) * 0.22,
                    (Math.random() - 0.5) * 0.22,
                  ).multiplyScalar(S),
                ),
              ph: Math.floor(Math.random() * 5),
            });
          }
        const fi = Math.floor(f);
        for (const c of s.cr) {
          c.p.y -= 0.35 * S * dt;
          if ((fi + c.ph) % 5 >= 2) continue;
          this.t1.copy(c.p).y += 0.04;
          this.quad(c.p, this.t1, 0.02, C.white, 1 - Math.max(0, (f - 78) / 12), cam);
        }
      }
    }
    this.shells = this.shells.filter((s) => s.age * FPS < 102);
    const g = this.mesh.geometry;
    g.setDrawRange(0, this.n * 6);
    g.attributes.position.needsUpdate = g.attributes.aColor.needsUpdate = g.attributes.aAlpha.needsUpdate = true;
    this.mesh.visible = this.n > 0;
  }
  private burst(X: Vfx, s: Shell, S: number, cam: THREE.Camera) {
    const B = s.to;
    X.flash(B.x, B.y, B.z, "#ffe9a0", 2.2 * S + 0.6, 1.4);
    if (s.first) impactRing(B.x, B.y, B.z, 0.028);
    const fwd = this.cd.copy(cam.position).sub(B).normalize();
    const right = new THREE.Vector3(0, 1, 0).cross(fwd).normalize();
    const up = fwd.clone().cross(right).normalize();
    const DI = 0.136;
    const n = s.st.length;
    s.st.forEach((st, i) => {
      st.p.copy(B);
      if (s.mai) {
        const np = Math.round(n * (150 / 175)),
          nc = Math.round(n * (20 / 175));
        if (i < np) {
          const th = (i / np) * Math.PI * 2,
            pf = Math.pow(Math.abs(Math.cos(2.5 * th)), 0.6);
          st.kind = 1;
          st.tip = pf;
          st.v
            .copy(right)
            .multiplyScalar(Math.cos(th))
            .addScaledVector(up, Math.sin(th))
            .multiplyScalar((2 * S * pf) / DI);
        } else if (i < np + nc) {
          const a = ((i - np) / nc) * Math.PI * 2;
          st.kind = 2;
          st.v
            .copy(right)
            .multiplyScalar(Math.cos(a))
            .addScaledVector(up, Math.sin(a))
            .multiplyScalar(((0.12 + ((i % 4) / 3) * 0.23) * S) / DI);
        } else {
          const a = ((i - np - nc) / Math.max(1, n - np - nc)) * Math.PI * 2;
          st.kind = 3;
          st.v
            .copy(right)
            .multiplyScalar(Math.cos(a))
            .addScaledVector(up, Math.sin(a))
            .multiplyScalar((0.5 * S) / DI);
        }
      } else {
        const u = Math.random() * 2 - 1,
          ph = Math.random() * Math.PI * 2,
          sq = Math.sqrt(1 - u * u),
          sp = (14 + Math.random() * 4) * S;
        st.v.set(sq * Math.cos(ph) * sp, u * sp, sq * Math.sin(ph) * sp);
      }
      if (st.v.lengthSq() === 0) st.v.set(0, 1e-4, 0);
    });
  }
}
