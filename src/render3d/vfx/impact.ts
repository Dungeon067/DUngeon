/*
 * Cảm giác lực khi trúng đòn (S30): vòng khúc xạ lan ra trên màn hình từ điểm trúng. Chỉ chạy khi có hậu kỳ
 * (mức đồ họa vừa/cao) và người chơi bật "Hiệu ứng lực đòn" trong cài đặt; máy yếu (mức thấp) tự tắt.
 */
import * as THREE from "three";
import { settings } from "../../core/settings";

export const RefractShader = {
  uniforms: {
    tDiffuse: { value: null },
    uCenter: { value: new THREE.Vector2(0.5, 0.5) },
    uR: { value: 0 },
    uS: { value: 0 },
    uAsp: { value: 16 / 9 },
  },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `uniform sampler2D tDiffuse; uniform vec2 uCenter; uniform float uR, uS, uAsp; varying vec2 vUv;
    void main(){
      vec2 d = vUv - uCenter; d.x *= uAsp;
      float r = length(d);
      float k = exp(-pow((r - uR) / .045, 2.)) * uS;
      vec2 o = r > 1e-4 ? d / r : vec2(0.);
      o.x /= uAsp;
      gl_FragColor = texture2D(tDiffuse, vUv - o * k);
    }`,
};

const S = { p: new THREE.Vector3(), age: 9, dur: 0.34, s: 0 };
/** Phát một vòng khúc xạ tại điểm thế giới; strength là độ lệch UV lớn nhất (0,02–0,035). */
export function impactRing(x: number, y: number, z: number, strength = 0.028) {
  if (!settings.impactFx) return;
  S.p.set(x, y, z);
  S.age = 0;
  S.s = strength;
}
/** Cập nhật uniform; trả về false khi không có vòng nào (tắt pass để không tốn một lượt vẽ toàn màn hình). */
export function updateImpact(u: (typeof RefractShader)["uniforms"], cam: THREE.Camera, dt: number, asp: number) {
  S.age += dt;
  const k = S.age / S.dur;
  if (k >= 1) return false;
  const p = S.p.clone().project(cam);
  u.uCenter.value.set((p.x + 1) / 2, (p.y + 1) / 2);
  u.uR.value = 0.02 + k * 0.32;
  u.uS.value = S.s * (1 - k) * (1 - k);
  u.uAsp.value = asp;
  return true;
}
