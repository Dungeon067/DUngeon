/*
 * Hạt có hình (S30): billboard instanced đọc atlas tự vẽ (sao, hoa tuyết, cánh mai...), không bao giờ là chấm tròn.
 * Mô phỏng trên CPU theo dt của khung (chế độ quay xác định cho kết quả lặp lại). Có trần số lượng theo mức đồ họa.
 */
import * as THREE from "three";
import { CELL, spriteAtlas, type Cell } from "./tex";

export interface Emit {
  cell: Cell;
  x: number;
  y: number;
  z: number;
  vx?: number;
  vy?: number;
  vz?: number;
  life: number;
  size: number;
  /** Kích thước cuối đời (mặc định bằng size). */
  size1?: number;
  col: string;
  /** Màu cuối đời. */
  col1?: string;
  a?: number;
  grav?: number;
  drag?: number;
  rot?: number;
  spin?: number;
  /** >0: kéo dài theo hướng bay (tia lửa). */
  stretch?: number;
}

export class Sprites {
  readonly mesh: THREE.Mesh;
  private n = 0;
  private P: Float32Array;
  private V: Float32Array;
  private L: Float32Array;
  private S: Float32Array;
  private R: Float32Array;
  private C0: Float32Array;
  private C1: Float32Array;
  private K: Float32Array;
  private aPos: THREE.InstancedBufferAttribute;
  private aCol: THREE.InstancedBufferAttribute;
  private aP: THREE.InstancedBufferAttribute;
  private aVel: THREE.InstancedBufferAttribute;
  private geo: THREE.InstancedBufferGeometry;
  cap: number;
  constructor(
    readonly max: number,
    add: boolean,
  ) {
    this.cap = max;
    this.P = new Float32Array(max * 3);
    this.V = new Float32Array(max * 3);
    this.L = new Float32Array(max * 2);
    this.S = new Float32Array(max * 2);
    this.R = new Float32Array(max * 2);
    this.C0 = new Float32Array(max * 4);
    this.C1 = new Float32Array(max * 3);
    this.K = new Float32Array(max * 4);
    const base = new THREE.PlaneGeometry(1, 1);
    const g = (this.geo = new THREE.InstancedBufferGeometry());
    g.index = base.index;
    g.setAttribute("position", base.attributes.position);
    g.setAttribute("uv", base.attributes.uv);
    this.aPos = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3).setUsage(THREE.DynamicDrawUsage);
    this.aCol = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.aP = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.aVel = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("iPos", this.aPos);
    g.setAttribute("iCol", this.aCol);
    g.setAttribute("iP", this.aP);
    g.setAttribute("iVel", this.aVel);
    g.instanceCount = 0;
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: add ? THREE.AdditiveBlending : THREE.NormalBlending,
      fog: false,
      uniforms: { uMap: { value: spriteAtlas() } },
      vertexShader: /* glsl */ `
        attribute vec3 iPos; attribute vec4 iCol; attribute vec4 iP; attribute vec3 iVel;
        varying vec2 vUv; varying vec4 vCol;
        void main(){
          vec4 mv = modelViewMatrix * vec4(iPos, 1.0);
          vec2 q = position.xy;
          float r = iP.y;
          if (iP.w > 0.) {
            vec3 vv = (modelViewMatrix * vec4(iVel, 0.0)).xyz;
            r = atan(vv.y, vv.x) - 1.5708;
            q.y *= 1. + iP.w * min(1., length(vv.xy) * .15);
          }
          float c = cos(r), s = sin(r);
          mv.xy += mat2(c, s, -s, c) * q * iP.x;
          gl_Position = projectionMatrix * mv;
          float cell = iP.z;
          vUv = (vec2(mod(cell, 4.), 3. - floor(cell / 4.)) + uv) / 4.;
          vCol = iCol;
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap; varying vec2 vUv; varying vec4 vCol;
        void main(){
          float a = texture2D(uMap, vUv).a;
          vec3 col = mix(vCol.rgb, vec3(1.), pow(a, 5.) * .55);
          gl_FragColor = vec4(col, a * vCol.a);
        }`,
    });
    this.mesh = new THREE.Mesh(g, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 5;
  }
  private c = new THREE.Color();
  emit(e: Emit) {
    if (this.n >= this.cap) return;
    const i = this.n++;
    this.P.set([e.x, e.y, e.z], i * 3);
    this.V.set([e.vx ?? 0, e.vy ?? 0, e.vz ?? 0], i * 3);
    this.L.set([e.life, e.life], i * 2);
    this.S.set([e.size, e.size1 ?? e.size], i * 2);
    this.R.set([e.rot ?? Math.random() * 6.28, e.spin ?? 0], i * 2);
    this.c.set(e.col);
    this.C0.set([this.c.r, this.c.g, this.c.b, e.a ?? 1], i * 4);
    this.c.set(e.col1 ?? e.col);
    this.C1.set([this.c.r, this.c.g, this.c.b], i * 3);
    this.K.set([e.grav ?? 0, e.drag ?? 0, CELL[e.cell], e.stretch ?? 0], i * 4);
  }
  get count() {
    return this.n;
  }
  clear() {
    this.n = 0;
    this.geo.instanceCount = 0;
  }
  update(dt: number) {
    const { P, V, L, S, R, C0, C1, K } = this;
    const pa = this.aPos.array as Float32Array,
      ca = this.aCol.array as Float32Array,
      ka = this.aP.array as Float32Array,
      va = this.aVel.array as Float32Array;
    let w = 0;
    for (let i = 0; i < this.n; i++) {
      L[i * 2] -= dt;
      if (L[i * 2] <= 0) continue;
      if (w !== i) {
        // nén mảng: dời hạt còn sống lên chỗ trống
        P.copyWithin(w * 3, i * 3, i * 3 + 3);
        V.copyWithin(w * 3, i * 3, i * 3 + 3);
        L.copyWithin(w * 2, i * 2, i * 2 + 2);
        S.copyWithin(w * 2, i * 2, i * 2 + 2);
        R.copyWithin(w * 2, i * 2, i * 2 + 2);
        C0.copyWithin(w * 4, i * 4, i * 4 + 4);
        C1.copyWithin(w * 3, i * 3, i * 3 + 3);
        K.copyWithin(w * 4, i * 4, i * 4 + 4);
      }
      const j = w++;
      const dr = Math.exp(-K[j * 4 + 1] * dt);
      V[j * 3] *= dr;
      V[j * 3 + 2] *= dr;
      V[j * 3 + 1] = V[j * 3 + 1] * dr - K[j * 4] * dt;
      P[j * 3] += V[j * 3] * dt;
      P[j * 3 + 1] += V[j * 3 + 1] * dt;
      P[j * 3 + 2] += V[j * 3 + 2] * dt;
      R[j * 2] += R[j * 2 + 1] * dt;
      const u = 1 - L[j * 2] / L[j * 2 + 1];
      const fa = Math.min(1, u * 10) * Math.min(1, (1 - u) * 3.5);
      pa.set(P.subarray(j * 3, j * 3 + 3), j * 3);
      va.set(V.subarray(j * 3, j * 3 + 3), j * 3);
      ca[j * 4] = C0[j * 4] + (C1[j * 3] - C0[j * 4]) * u;
      ca[j * 4 + 1] = C0[j * 4 + 1] + (C1[j * 3 + 1] - C0[j * 4 + 1]) * u;
      ca[j * 4 + 2] = C0[j * 4 + 2] + (C1[j * 3 + 2] - C0[j * 4 + 2]) * u;
      ca[j * 4 + 3] = C0[j * 4 + 3] * fa;
      ka[j * 4] = S[j * 2] + (S[j * 2 + 1] - S[j * 2]) * u;
      ka[j * 4 + 1] = R[j * 2];
      ka[j * 4 + 2] = K[j * 4 + 2];
      ka[j * 4 + 3] = K[j * 4 + 3];
    }
    this.n = w;
    this.geo.instanceCount = w;
    this.aPos.needsUpdate = this.aCol.needsUpdate = this.aP.needsUpdate = this.aVel.needsUpdate = true;
  }
}
