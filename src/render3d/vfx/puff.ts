/*
 * Khói mềm theo nguyên tố (S30, theo bản mẫu tham khảo): billboard ghép 9 vòng tròn bằng SDF, rìa nhiễu,
 * cel 2 tông gần màu nhau, mép mờ, không viền tối. Lửa có ánh cam ở đáy, băng có lấp lánh bên trong.
 * Pool cố định, số lượng theo mức đồ họa.
 */
import * as THREE from "three";
import { NOISE_GLSL } from "./mats";

export type PuffKind = "fire" | "water" | "ice" | "mist";
const PAL: Record<PuffKind, [number, number, number, number]> = {
  // sáng, tối, alpha, chế độ (0 lửa, 1 nước, 2 băng)
  fire: [0xcfc6c0, 0x9c8f88, 0.6, 0],
  water: [0xffffff, 0xcdeff5, 0.55, 1],
  ice: [0xf2fbff, 0xbfe4f7, 0.55, 2],
  mist: [0xf4fbff, 0xd6ecf7, 0.35, 1],
};
const FPS = 60;
const quad = new THREE.PlaneGeometry(1, 1);

function puffMat() {
  const circles = Array.from({ length: 9 }, () => new THREE.Vector3());
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uCircles: { value: circles },
      uLight: { value: new THREE.Color() },
      uShadow: { value: new THREE.Color() },
      uBase: { value: 0.6 },
      uMode: { value: 0 },
      uDis: { value: 0 },
      uA: { value: 0 },
      uRot: { value: 0 },
      uT: { value: 0 },
      uSeed: { value: 0 },
    },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uCircles[9]; uniform vec3 uLight, uShadow;
      uniform float uBase, uDis, uA, uRot, uT, uSeed; uniform int uMode; varying vec2 vUv;
      ${NOISE_GLSL}
      float circ(vec2 p){
        float d = 10.;
        for (int i = 0; i < 9; i++) d = min(d, length(p - uCircles[i].xy) - uCircles[i].z);
        return d;
      }
      void main(){
        vec2 p = vUv * 2. - 1.;
        float c = cos(uRot), s = sin(uRot);
        vec2 q = mat2(c, -s, s, c) * p;
        float nz = (vn(q * 3.4 + vec2(uSeed, uT * .35)) - .5) * .26 + uDis * .46;
        float d = circ(q) + nz;
        float a = smoothstep(.08, -.08, d);
        if (a < .01) discard;
        // Cel 2 tông: mặt quay về phía đèn (trên) sáng, phần còn lại tối nhẹ; đo bằng SDF lệch về phía đèn.
        float lit = circ(q + mat2(c, -s, s, c) * vec2(0., -.16)) + nz;
        vec3 col = mix(uShadow, uLight, step(lit, -.02));
        if (uMode == 0) col += vec3(1., .478, .165) * .35 * smoothstep(-.3, -.58, p.y);
        if (uMode == 2) for (int i = 0; i < 6; i++) {
          vec2 dp = q - uCircles[i].xy * .72;
          float gl = max(0., 1. - (abs(dp.x) * 28. + abs(dp.y) * 9.)) + max(0., 1. - (abs(dp.y) * 28. + abs(dp.x) * 9.));
          col += vec3(.95, 1., 1.) * smoothstep(.25, .9, gl) * (.5 + .5 * sin(uT * 16. + float(i) * 2.1 + uSeed)) * .75;
        }
        gl_FragColor = vec4(col, a * uA * uBase);
      }`,
  });
}

interface P {
  m: THREE.Mesh;
  u: Record<string, { value: any }>;
  age: number;
  life: number;
  size: number;
  r0: number;
  r1: number;
  spin: number;
  vx: number;
  vz: number;
  on: boolean;
}

export class Puffs {
  private list: P[] = [];
  private next = 0;
  cap = 32;
  constructor(private parent: THREE.Object3D) {}
  /** Một cụm khói: size = bán kính đầu (m), life = số khung ở 60 FPS. */
  spawn(x: number, y: number, z: number, kind: PuffKind, size = 0.5, life = 40, vx = 0, vz = 0, rise = 0.8) {
    if (this.cap <= 0) return;
    let p = this.list.find((e) => !e.on);
    if (!p && this.list.length < this.cap) {
      const mat = puffMat();
      const m = new THREE.Mesh(quad, mat);
      m.frustumCulled = false;
      m.renderOrder = 3;
      this.parent.add(m);
      this.list.push((p = { m, u: mat.uniforms, age: 0, life, size, r0: 0, r1: 0, spin: 0, vx, vz, on: false }));
    }
    if (!p) p = this.list[this.next++ % this.list.length];
    const [li, sh, al, mode] = PAL[kind];
    const c = p.u.uCircles.value as THREE.Vector3[];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.38,
        d = i === 0 ? 0.04 : 0.14 + Math.random() * 0.16;
      c[i].set(Math.cos(a) * d, Math.sin(a) * d, 0.28 + Math.random() * 0.1);
    }
    p.u.uLight.value.setHex(li);
    p.u.uShadow.value.setHex(sh);
    p.u.uBase.value = al;
    p.u.uMode.value = mode;
    p.u.uSeed.value = Math.random() * 31.4;
    p.u.uRot.value = Math.random() * 6.28;
    Object.assign(p, {
      age: 0,
      life,
      size,
      r0: rise,
      r1: rise * 0.25,
      spin: Math.random() < 0.5 ? -0.35 : 0.35,
      vx,
      vz,
      on: true,
    });
    p.m.position.set(x, y, z);
    p.m.visible = true;
  }
  update(dt: number, cam: THREE.Camera) {
    for (const p of this.list) {
      if (!p.on) continue;
      p.age += dt;
      const f = p.age * FPS,
        n = (f / p.life) * 40;
      let sc: number,
        al = 1,
        dis = 0;
      if (n <= 10) {
        sc = 0.5 + 0.7 * (n / 10);
        al = n / 10;
      } else sc = 1.2 + 0.8 * Math.min(1, (n - 10) / 30);
      if (n >= 20) {
        dis = Math.min(1, (n - 20) / 20);
        al *= 1 - dis * 0.45;
      }
      p.m.scale.setScalar(sc * p.size * 2);
      p.m.position.y += (p.r0 + (p.r1 - p.r0) * Math.min(1, f / p.life)) * dt;
      p.m.position.x += p.vx * dt;
      p.m.position.z += p.vz * dt;
      p.m.quaternion.copy(cam.quaternion);
      p.u.uRot.value += p.spin * dt;
      p.u.uA.value = al;
      p.u.uDis.value = dis;
      p.u.uT.value = p.age;
      if (f >= p.life) p.on = p.m.visible = false;
    }
  }
}
