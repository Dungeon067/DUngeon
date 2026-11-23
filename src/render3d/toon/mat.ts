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
