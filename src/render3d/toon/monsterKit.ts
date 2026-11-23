/**
 * S29: vật liệu toon cho quái GLB (Blender, tools/blender/monsters).
 * Atlas mặt nạ: R = phát sáng, G = bóng ướt, B = vùng nhuộm theo nguyên tố.
 * Màu và độ sáng nguyên tố là uniform, cả loài dùng chung geometry và texture.
 */
import * as THREE from "three";
import { gradientMap } from "./mat";

export interface MonsterUniforms {
  uTint: { value: THREE.Color };
  /** 1 = kênh B nhuộm màu nguyên tố; 0 = kênh B là vết nứt giai đoạn 2 (boss). */
  uTintK: { value: number };
  uCrack: { value: THREE.Color };
  uGlow: { value: THREE.Color };
  uGlowK: { value: number };
  uRim: { value: THREE.Color };
  uHit: { value: number };
  uDust: { value: number };
  uPhase: { value: number };
  uTime: { value: number };
}

export function monsterUniforms(): MonsterUniforms {
  return {
    uTint: { value: new THREE.Color(1, 1, 1) },
    uTintK: { value: 1 },
    uCrack: { value: new THREE.Color(0.75, 0.35, 1) },
    uGlow: { value: new THREE.Color(1, 1, 1) },
    uGlowK: { value: 1 },
    uRim: { value: new THREE.Color(0.75, 0.85, 1) },
    uHit: { value: 0 },
    uDust: { value: 0 },
    uPhase: { value: 0 },
    uTime: { value: 0 },
  };
}

export type MonsterPart = "skin" | "jelly" | "glow" | "fin" | "eye" | "cloth";

/** Tạo vật liệu toon từ vật liệu glTF gốc (map, normalMap, emissiveMap = mặt nạ). */
export function monsterMat(src: THREE.MeshStandardMaterial, u: MonsterUniforms): THREE.MeshToonMaterial {
  const part = (src.name.split(".")[0] || "skin") as MonsterPart;
  const jelly = part === "jelly",
    fin = part === "fin",
    glow = part === "glow";
  const m = new THREE.MeshToonMaterial({
    gradientMap: gradientMap(),
    map: src.map,
    normalMap: src.normalMap,
    transparent: jelly || fin,
    depthWrite: !(jelly || fin),
    side: fin ? THREE.DoubleSide : THREE.FrontSide,
  });
  if (src.normalMap) m.normalScale.set(1, -1).multiplyScalar(jelly ? 0.6 : 1);
  m.name = part;
  const mask = src.emissiveMap;
  m.userData.part = part;
  m.onBeforeCompile = (s) => {
    Object.assign(s.uniforms, u, { uMask: { value: mask } });
    s.defines = { ...(s.defines ?? {}), M_JELLY: jelly ? 1 : 0, M_FIN: fin ? 1 : 0, M_GLOW: glow ? 1 : 0 };
    s.fragmentShader = s.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform sampler2D uMask; uniform vec3 uTint, uGlow, uRim, uCrack; uniform float uTintK, uGlowK, uHit, uDust, uPhase, uTime;
float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }`,
      )
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
vec4 mk = texture2D(uMask, vMapUv);
diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * uTint * 1.35, mk.b * uTintK);`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
totalEmissiveRadiance += mk.r * mix(uGlow, diffuseColor.rgb * uGlow * 1.4, 0.4) * uGlowK;
totalEmissiveRadiance += mk.b * (1.0 - uTintK) * uPhase * uCrack * (1.6 + 0.6 * sin(uTime * 7.0 + vMapUv.x * 40.0));`,
      )
      .replace(
        "#include <opaque_fragment>",
        `vec3 vv = normalize(vViewPosition);
float fr = 1.0 - clamp(dot(normal, vv), 0.0, 1.0);
outgoingLight += uRim * smoothstep(0.62, 0.8, fr) * (M_JELLY == 1 ? 0.55 : 0.32);
#if NUM_DIR_LIGHTS > 0
vec3 hv = normalize(directionalLights[0].direction + vv);
outgoingLight += vec3(1.0) * smoothstep(0.9, 0.935, dot(normal, hv)) * mk.g * 0.9;
#endif
outgoingLight = mix(outgoingLight, vec3(1.0, 0.92, 0.95), uHit * 0.55);
#if M_JELLY == 1
diffuseColor.a = mix(0.5, 0.95, smoothstep(0.2, 0.9, fr));
#elif M_FIN == 1
diffuseColor.a = 0.55 + 0.4 * mk.r;
#endif
if (uDust > 0.0) {
  float n = h21(floor(gl_FragCoord.xy / 3.0));
  if (n < uDust) discard;
  outgoingLight += uGlow * smoothstep(uDust, uDust + 0.12, n) * (1.0 - smoothstep(uDust + 0.12, uDust + 0.3, n)) * 2.0 * step(0.01, uDust);
}
#include <opaque_fragment>`,
      );
  };
  m.customProgramCacheKey = () => `monster-${part}`;
  return m;
}
