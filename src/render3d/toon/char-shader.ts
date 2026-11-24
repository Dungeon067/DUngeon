/**
 * Shader nhân vật kiểu anime (hợp nhất B, mục 1–3). Khung, TẮT mặc định (CHAR_SHADER.bat = false; bật thử bằng ?charShader=1).
 * Thuật toán chuyển sang GLSL từ kaze-mio/UnityGenshinToonShader (MIT, © 2023 风澪瑟) và
 * Gaolingx/GenshinCelShaderURP (MIT, © 2023 Gaolingx); không dùng mô hình hay texture nào của hai repo.
 *  1. Bóng mặt SDF: so ngưỡng từ dot(hướng mặt, hướng sáng) với lightmap mặt; lật UV theo cross(F, L).y.
 *  2. Ramp theo vật liệu (da, tóc, vải, kim loại, khác) × ngày/đêm: 10 dòng; dòng chọn theo vật liệu.
 *  3. Viền sáng theo độ sâu: lấy mẫu depth lệch theo pháp tuyến view; chênh > ngưỡng thì vẽ viền × fresnel.
 * Các hàm thuần (faceShadow, rampV, depthRim) giống hệt GLSL để kiểm thử.
 */
import * as THREE from "three";

export const CHAR_SHADER = {
  bat: typeof location !== "undefined" && new URLSearchParams(location.search).get("charShader") === "1",
  rimRong: 3,
  rimNguong: 0.08,
  rimManh: 0.6,
};
export const MAT_ROWS = ["da", "toc", "vai", "kimLoai", "khac"] as const;
export type MatRow = (typeof MAT_ROWS)[number];

/** 1: 1 = sáng, 0 = bóng. F, R: hướng trước / phải của đầu (mặt phẳng ngang), L: hướng tới nguồn sáng. */
export function faceShadow(
  F: THREE.Vector3,
  R: THREE.Vector3,
  L: THREE.Vector3,
  u: number,
  sample: (u: number) => number,
) {
  const f = new THREE.Vector2(F.x, F.z).normalize(),
    r = new THREE.Vector2(R.x, R.z).normalize(),
    l = new THREE.Vector2(L.x, L.z).normalize();
  const th = 1 - (f.dot(l) * 0.5 + 0.5);
  const flip = r.dot(l) < 0;
  return sample(flip ? 1 - u : u) >= th ? 1 : 0;
}
/** 2: toạ độ V trên ramp 10 dòng: dòng = vật liệu × 2 + (đêm ? 1 : 0). */
export const rampV = (row: MatRow, night: number) => (MAT_ROWS.indexOf(row) * 2 + (night > 0.5 ? 1 : 0) + 0.5) / 10;
/** 3: độ mạnh viền sáng từ chênh độ sâu tuyến tính (m) và fresnel. */
export const depthRim = (dDepth: number, fresnel: number, th = CHAR_SHADER.rimNguong, k = CHAR_SHADER.rimManh) =>
  dDepth > th ? Math.min(1, fresnel) * k : 0;

export const FACE_GLSL = /* glsl */ `
uniform sampler2D uFaceMap; uniform vec3 uFaceF; uniform vec3 uFaceR; uniform vec3 uLightDir;
float faceShadow(vec2 uv){
  vec2 f = normalize(uFaceF.xz), r = normalize(uFaceR.xz), l = normalize(uLightDir.xz);
  float th = 1.0 - (dot(f, l) * 0.5 + 0.5);
  vec2 u = dot(r, l) < 0.0 ? vec2(1.0 - uv.x, uv.y) : uv;
  return step(th, texture2D(uFaceMap, u).r);
}`;
export const RAMP_GLSL = /* glsl */ `
uniform sampler2D uRamp; uniform float uRampRow; uniform float uNight;
vec3 rampShade(float ndl){
  float v = (uRampRow * 2.0 + step(0.5, uNight) + 0.5) / 10.0;
  return texture2D(uRamp, vec2(clamp(ndl * 0.5 + 0.5, 0.01, 0.99), v)).rgb;
}`;
export const RIM_GLSL = /* glsl */ `
uniform sampler2D uDepth; uniform vec2 uRes; uniform float uRimW; uniform float uRimTh; uniform float uRimK;
uniform float uNear; uniform float uFar;
float linD(float d){ float z = d * 2.0 - 1.0; return 2.0 * uNear * uFar / (uFar + uNear - z * (uFar - uNear)); }
float depthRim(vec3 nView, float fres){
  vec2 uv = gl_FragCoord.xy / uRes;
  float d0 = linD(texture2D(uDepth, uv).r);
  float d1 = linD(texture2D(uDepth, uv + nView.xy * uRimW / uRes).r);
  return (d1 - d0) > uRimTh ? min(1.0, fres) * uRimK : 0.0;
}`;

export interface CharShaderOpt {
  row?: (m: THREE.Material) => MatRow;
  ramp?: THREE.Texture;
  faceMap?: THREE.Texture;
  depth?: THREE.Texture;
}
/** Đoán dòng ramp theo tên vật liệu VRoid. */
export const guessRow = (m: THREE.Material): MatRow =>
  /HAIR/i.test(m.name)
    ? "toc"
    : /SKIN|FACE|BODY/i.test(m.name)
      ? "da"
      : /METAL|ARMOR|ACC/i.test(m.name)
        ? "kimLoai"
        : /CLOTH|TOPS|BOTTOMS|SHOES/i.test(m.name)
          ? "vai"
          : "khac";

/** Gắn uniform và đoạn GLSL vào vật liệu MToon (giữ callback gốc). Không làm gì khi cờ tắt. Trả về số vật liệu đã gắn. */
export function applyCharShader(root: THREE.Object3D, o: CharShaderOpt = {}) {
  if (!CHAR_SHADER.bat) return 0;
  let n = 0;
  root.traverse((ob) => {
    const mats = (ob as THREE.Mesh).material;
    for (const m of Array.isArray(mats) ? mats : mats ? [mats] : []) {
      if ((m as any).userData?.ttChar) continue;
      const row = (o.row ?? guessRow)(m);
      const prev = m.onBeforeCompile.bind(m);
      m.onBeforeCompile = (sh, r) => {
        prev(sh, r);
        Object.assign(sh.uniforms, {
          uRamp: { value: o.ramp ?? null },
          uRampRow: { value: MAT_ROWS.indexOf(row) },
          uNight: { value: 0 },
          uFaceMap: { value: o.faceMap ?? null },
          uFaceF: { value: new THREE.Vector3(0, 0, 1) },
          uFaceR: { value: new THREE.Vector3(1, 0, 0) },
          uLightDir: { value: new THREE.Vector3(0.3, 1, 0.4) },
          uDepth: { value: o.depth ?? null },
          uRes: { value: new THREE.Vector2(1, 1) },
          uRimW: { value: CHAR_SHADER.rimRong },
          uRimTh: { value: CHAR_SHADER.rimNguong },
          uRimK: { value: CHAR_SHADER.rimManh },
          uNear: { value: 0.1 },
          uFar: { value: 200 },
        });
        sh.fragmentShader = sh.fragmentShader.replace(
          "void main() {",
          `${RAMP_GLSL}\n${row === "da" ? FACE_GLSL : ""}\n${RIM_GLSL}\nvoid main() {`,
        );
      };
      const key = m.customProgramCacheKey?.bind(m);
      m.customProgramCacheKey = () => `${key ? key() : ""}|tt-char-${row}`;
      (m as any).userData = { ...(m as any).userData, ttChar: row };
      m.needsUpdate = true;
      n++;
    }
  });
  return n;
}
