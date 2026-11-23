/** Vật liệu toon dùng chung: tô 3 tông (gradientMap) và viền ngoài kiểu inverted hull. */
import * as THREE from "three";

let grad: THREE.DataTexture | null = null;
/** Bậc sáng: vùng tối, vùng giữa, vùng sáng (lọc nearest để ra mảng màu rõ). */
export function gradientMap(): THREE.DataTexture {
  if (grad) return grad;
  const d = new Uint8Array([90, 90, 90, 255, 175, 175, 175, 255, 255, 255, 255, 255]);
  grad = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat);
  grad.minFilter = grad.magFilter = THREE.NearestFilter;
  grad.needsUpdate = true;
  return grad;
}

export function toonMat(o: THREE.MeshToonMaterialParameters = {}): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ gradientMap: gradientMap(), ...o });
}

const outlineCache = new Map<string, THREE.MeshBasicMaterial>();
/** Viền: vẽ mặt sau, đẩy đỉnh ra theo pháp tuyến. Dùng được cho InstancedMesh. */
export function outlineMat(width = 0.025, color = 0x2a2238): THREE.MeshBasicMaterial {
  const key = `${width}:${color}`;
  let m = outlineCache.get(key);
  if (m) return m;
  m = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
  m.onBeforeCompile = (s) => {
    s.uniforms.uW = { value: width };
    s.vertexShader = s.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uW;")
      .replace("#include <begin_vertex>", "vec3 transformed = position + normalize(normal) * uW;");
  };
  m.customProgramCacheKey = () => "outline";
  outlineCache.set(key, m);
  return m;
}

/** Thêm lớp viền cho một mesh (cùng geometry, cùng ma trận instance nếu có). */
export function withOutline(mesh: THREE.Mesh, width?: number, color?: number): THREE.Object3D {
  const mat = outlineMat(width, color);
  let o: THREE.Mesh;
  if ((mesh as THREE.InstancedMesh).isInstancedMesh) {
    const im = mesh as THREE.InstancedMesh;
    o = new THREE.InstancedMesh(im.geometry, mat, im.count);
    (o as THREE.InstancedMesh).instanceMatrix = im.instanceMatrix;
  } else o = new THREE.Mesh(mesh.geometry, mat);
  o.castShadow = false;
  o.receiveShadow = false;
  mesh.add(o);
  return o;
}

/** Nhiễu giá trị mượt (dùng cho địa hình, màu, cây). */
export const hash2 = (x: number, y: number, s = 0) => {
  let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
export function noise2(x: number, y: number, s = 0): number {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    xf = x - xi,
    yf = y - yi;
  const u = xf * xf * (3 - 2 * xf),
    v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, s),
    b = hash2(xi + 1, yi, s),
    c = hash2(xi, yi + 1, s),
    d = hash2(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Vị trí nhân vật trên màn hình (px buffer) và độ sâu; vật đứng trước nhân vật trong bán kính này bị làm thưa (dither). */
export const FADE = {
  uFadeS: { value: new THREE.Vector2(-1e5, -1e5) },
  uFadeZ: { value: 0 },
  uFadeR: { value: 0 },
};

/** Gắn hiệu ứng làm mờ vật cản giữa camera và nhân vật vào vật liệu. */
export function fadeOccluder(m: THREE.Material): void {
  if ((m as any).userData?.fade) return;
  m.userData.fade = true;
  const prev = m.onBeforeCompile;
  m.onBeforeCompile = (sh, r) => {
    prev?.call(m, sh, r);
    Object.assign(sh.uniforms, FADE);
    sh.fragmentShader = sh.fragmentShader.replace(
      "void main() {",
      `uniform vec2 uFadeS; uniform float uFadeZ; uniform float uFadeR;
void main() {
  if (uFadeR > 0.0 && gl_FragCoord.z < uFadeZ) {
    float k = 1.0 - smoothstep(uFadeR * 0.55, uFadeR, distance(gl_FragCoord.xy, uFadeS));
    float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    if (n < k * 0.8) discard;
  }`,
    );
  };
  m.customProgramCacheKey = () => "fade";
  m.needsUpdate = true;
}

/**
 * Dọn hết tài nguyên GPU của một cây vật thể: geometry, vật liệu, texture trong vật liệu và uniform,
 * InstancedMesh, Reflector. Giữ lại tài nguyên dùng chung (gradient toon, vật liệu viền trong cache).
 */
export function disposeTree(root: THREE.Object3D): void {
  const shared = new Set<unknown>([gradientMap(), ...outlineCache.values()]);
  root.removeFromParent();
  root.traverse((o: any) => {
    o.geometry?.dispose();
    for (const m of [o.material].flat()) {
      if (!m || shared.has(m)) continue;
      for (const v of Object.values(m)) if ((v as any)?.isTexture && !shared.has(v)) (v as THREE.Texture).dispose();
      for (const u of Object.values((m as any).uniforms ?? {})) {
        const v = (u as any)?.value;
        if (v?.isTexture && !shared.has(v)) v.dispose();
      }
      m.dispose();
    }
    if (o.isInstancedMesh || o.isReflector) o.dispose();
  });
}
