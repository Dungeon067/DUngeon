/*
 * Vật liệu VFX (S30): một shader chung có noise thủ tục, UV cuộn, dissolve theo noise, viền fresnel,
 * màu gradient theo thời gian sống (lõi → giữa → đuôi), additive kèm alpha mềm, cửa sổ lộ dần theo trục U.
 */
import * as THREE from "three";

export const NOISE_GLSL = /* glsl */ `
float vh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(vh(i), vh(i + vec2(1, 0)), f.x), mix(vh(i + vec2(0, 1)), vh(i + vec2(1, 1)), f.x), f.y); }
float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * vn(p); p = p * 2.03 + 17.1; a *= .5; } return s; }
`;

export interface FxMatOpt {
  /** Cộng sáng (mặc định) hoặc trộn alpha thường. */
  add?: boolean;
  map?: THREE.Texture | null;
  /** Mũ fresnel; 0 là tắt. */
  fres?: number;
  /** Fresnel quyết định alpha (vỏ khiên, vòm) thay vì chỉ cộng viền. */
  fresAlpha?: boolean;
  side?: THREE.Side;
  depthTest?: boolean;
  /** Mép mềm theo U đầu/cuối, V đầu/cuối. */
  soft?: [number, number, number, number];
  /** Bóng mờ (dùng cho tinh thể đặc: có mặt sáng tối giả). */
  facet?: boolean;
  /** Dải màu leo theo trục Y cục bộ (uWaveY): phía dưới đổi sang uWC, viền sóng lóe sáng. */
  wave?: boolean;
}

export type FxMat = THREE.ShaderMaterial & {
  uniforms: {
    uT: { value: number };
    uAge: { value: number };
    uA: { value: number };
    uC0: { value: THREE.Color };
    uC1: { value: THREE.Color };
    uC2: { value: THREE.Color };
    uDis: { value: number };
    uScroll: { value: THREE.Vector2 };
    uNs: { value: THREE.Vector2 };
    uNA: { value: number };
    uWin: { value: THREE.Vector2 };
    uRot: { value: number };
    uGlow: { value: number };
    uWaveY: { value: number };
    uWC: { value: THREE.Color };
  };
};

export function fxMat(o: FxMatOpt = {}): FxMat {
  const soft = o.soft ?? [0, 0, 0, 0];
  const m = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: o.depthTest ?? true,
    side: o.side ?? THREE.DoubleSide,
    blending: o.add === false ? THREE.NormalBlending : THREE.AdditiveBlending,
    fog: false,
    defines: {
      ...(o.map ? { USE_FXMAP: 1 } : {}),
      ...(o.fres ? { FRES: o.fres.toFixed(2) } : {}),
      ...(o.fresAlpha ? { FRES_ALPHA: 1 } : {}),
      ...(o.facet ? { FACET: 1 } : {}),
      ...(o.wave ? { WAVE: 1 } : {}),
    },
    uniforms: {
      uT: { value: 0 },
      uAge: { value: 0 },
      uA: { value: 1 },
      uC0: { value: new THREE.Color(0xffffff) },
      uC1: { value: new THREE.Color(0x88ccff) },
      uC2: { value: new THREE.Color(0x224488) },
      uDis: { value: 0 },
      uScroll: { value: new THREE.Vector2(0, 0) },
      uNs: { value: new THREE.Vector2(4, 4) },
      uNA: { value: 0.6 },
      uWin: { value: new THREE.Vector2(-1, 2) },
      uRot: { value: 0 },
      uGlow: { value: 1 },
      uWaveY: { value: -10 },
      uWC: { value: new THREE.Color(0xffffff) },
      uMap: { value: o.map ?? null },
      uSoft: { value: new THREE.Vector4(...soft) },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv; varying vec3 vN; varying vec3 vV; varying vec3 vW; varying float vLy;
      void main(){
        vUv = uv;
        vLy = position.y;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - w.xyz);
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uT, uAge, uA, uDis, uNA, uRot, uGlow, uWaveY;
      uniform vec3 uWC; varying float vLy;
      uniform vec3 uC0, uC1, uC2;
      uniform vec2 uScroll, uNs, uWin;
      uniform vec4 uSoft;
      uniform sampler2D uMap;
      varying vec2 vUv; varying vec3 vN; varying vec3 vV; varying vec3 vW;
      ${NOISE_GLSL}
      void main(){
        vec2 uv = vUv;
        float n = fbm(uv * uNs + uScroll * uT);
        vec3 col = uAge < .5 ? mix(uC0, uC1, uAge * 2.) : mix(uC1, uC2, (uAge - .5) * 2.);
        col = mix(col, uC0, smoothstep(.6, .95, n) * .6);
        #ifdef WAVE
          float am = smoothstep(uWaveY + .12, uWaveY - .12, vLy);
          col = mix(col, uWC * (.75 + n * .6), am * .85);
          col += uWC * exp(-pow((vLy - uWaveY) * 9., 2.)) * step(-.5, uWaveY) * .9;
        #endif
        float a = uA * mix(1., .45 + n * 1.1, uNA);
        #ifdef USE_FXMAP
          vec2 c = uv - .5; float cs = cos(uRot), sn = sin(uRot);
          vec4 tx = texture2D(uMap, vec2(cs * c.x - sn * c.y, sn * c.x + cs * c.y) + .5);
          a *= tx.a;
          col = mix(col, uC0, tx.a * tx.a * .5);
        #endif
        if (uSoft.x > 0.) a *= smoothstep(0., uSoft.x, uv.x);
        if (uSoft.y > 0.) a *= smoothstep(1., 1. - uSoft.y, uv.x);
        if (uSoft.z > 0.) a *= smoothstep(0., uSoft.z, uv.y);
        if (uSoft.w > 0.) a *= smoothstep(1., 1. - uSoft.w, uv.y);
        a *= smoothstep(uWin.x - .12, uWin.x, uv.x) * (1. - smoothstep(uWin.y, uWin.y + .12, uv.x));
        float d = n - uDis;
        if (d < 0.) discard;
        col += uC0 * (1. - smoothstep(0., .1, d)) * step(.001, uDis) * 1.6;
        #ifdef FRES
          float f = pow(1. - abs(dot(normalize(vN), normalize(vV))), FRES);
          col += uC0 * f * 1.2;
          #ifdef FRES_ALPHA
            a *= .03 + f * 1.4;
          #endif
        #endif
        #ifdef FACET
          vec3 fn = normalize(cross(dFdx(vW), dFdy(vW)));
          float l = .55 + .45 * max(dot(fn, normalize(vec3(.4, .9, .3))), 0.);
          float rim = pow(1. - abs(dot(fn, normalize(vV))), 2.);
          col = col * l + uC0 * rim * .9;
        #endif
        gl_FragColor = vec4(col * uGlow, clamp(a, 0., 1.));
      }`,
  });
  return m as FxMat;
}

/** Đặt ba màu gradient từ chuỗi hex. */
export function setCols(u: FxMat["uniforms"], c0: string, c1: string, c2: string) {
  u.uC0.value.set(c0);
  u.uC1.value.set(c1);
  u.uC2.value.set(c2);
}
