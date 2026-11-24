/**
 * Tóc kiểu anime toon cho mọi VRM (vá shader MToon lúc tải):
 * - tô 3 dải màu cứng, không matcap/rim (hết vẻ bóng nhựa), vùng tối giảm bão hòa, ngả lam tím;
 * - chân tóc tối, ngọn sáng (theo chiều V của texture tóc VRoid: 0 chân → 1 ngọn);
 * - vòng sáng (angel ring) vẽ như tay: dải quanh đỉnh đầu, đứt theo từng lọn, mỗi đoạn thon hai đầu;
 * - bóng tóc mái đổ lên trán và mặt (tính sẵn theo từng đỉnh ở tư thế nghỉ).
 * Vòng sáng và bóng tính trên tọa độ nghỉ nên dính theo lọn tóc khi spring bone lắc.
 */
import * as THREE from "three";
import type { VRM } from "@pixiv/three-vrm";

/** Tắt để chụp so sánh bản cũ (tools/vrm/sheet.html?oldHair). */
export const hairStyle = { on: true };

const isHair = (n: string) => /HAIR/i.test(n) && !/HairPin/i.test(n);
const isFaceSkin = (n: string) => /Face/i.test(n) && /SKIN/i.test(n);

type MeshM = THREE.Mesh & { material: any };

function restPos(m: THREE.Mesh, out: Float32Array, nrm?: Float32Array) {
  const p = m.geometry.attributes.position,
    n = m.geometry.attributes.normal,
    v = new THREE.Vector3(),
    nm = new THREE.Matrix3().getNormalMatrix(m.matrixWorld);
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    if ((m as THREE.SkinnedMesh).isSkinnedMesh) (m as THREE.SkinnedMesh).applyBoneTransform(i, v);
    v.applyMatrix4(m.matrixWorld);
    out.set([v.x, v.y, v.z], i * 3);
    if (nrm && n) {
      v.fromBufferAttribute(n, i).applyMatrix3(nm).normalize();
      nrm.set([v.x, v.y, v.z], i * 3);
    }
  }
}

/** Đỉnh thuộc vật liệu tóc (mesh gộp nhiều vật liệu như Body của VRoid). */
function hairVerts(m: MeshM) {
  const g = m.geometry,
    out = new Uint8Array(g.attributes.position.count),
    mats = [m.material].flat();
  if (!Array.isArray(m.material) || !g.index) return out.fill(isHair(m.material?.name ?? "") ? 1 : 0);
  for (const gr of g.groups)
    if (isHair(mats[gr.materialIndex ?? 0]?.name ?? ""))
      for (let t = gr.start; t < gr.start + gr.count; t++) out[g.index.getX(t)] = 1;
  return out;
}

export function toonHair(vrm: VRM) {
  if (!hairStyle.on) return;
  const hairs: MeshM[] = [],
    faces: MeshM[] = [];
  vrm.scene.updateMatrixWorld(true);
  vrm.scene.traverse((o: any) => {
    if (!o.isMesh) return;
    const ms = [o.material].flat().filter((m: any) => m?.isMToonMaterial && !m.isOutline);
    if (ms.some((m: any) => isHair(m.name ?? ""))) hairs.push(o);
    else if (ms.some((m: any) => isFaceSkin(m.name ?? ""))) faces.push(o);
  });
  const head = vrm.humanoid.getRawBoneNode("head");
  if (!hairs.length || !head) return;
  const hp = head.getWorldPosition(new THREE.Vector3());
  const rest = hairs.map((m) => {
    const c = m.geometry.attributes.position.count;
    const r = { p: new Float32Array(c * 3), n: new Float32Array(c * 3), hair: hairVerts(m) };
    restPos(m, r.p, r.n);
    return r;
  });
  // Khối đầu: hộp các đỉnh tóc phía trên khớp cổ-đầu.
  const box = new THREE.Box3();
  for (const r of rest)
    for (let i = 0; i < r.p.length; i += 3)
      if (r.p[i + 1] > hp.y) box.expandByPoint(new THREE.Vector3(r.p[i], r.p[i + 1], r.p[i + 2]));
  const top = box.max.y,
    ctr = new THREE.Vector3(hp.x, hp.y + 0.45 * (top - hp.y), hp.z),
    R = Math.max(0.05, top - ctr.y);

  hairs.forEach((m, k) => {
    const { p, n } = rest[k],
      a = new Float32Array((p.length / 3) * 4);
    for (let i = 0, j = 0; i < p.length; i += 3, j += 4) {
      const dx = (p[i] - ctr.x) / R,
        dy = (p[i + 1] - ctr.y) / R,
        dz = (p[i + 2] - ctr.z) / R,
        l = Math.hypot(dx, dy, dz) || 1;
      a[j] = dx;
      a[j + 1] = dy;
      a[j + 2] = dz;
      a[j + 3] = (n[i] * dx + n[i + 1] * dy + n[i + 2] * dz) / l;
    }
    m.geometry.setAttribute("aHair", new THREE.BufferAttribute(a, 4));
    for (const mat of [m.material].flat()) if (mat?.isMToonMaterial && isHair(mat.name ?? "")) patch(mat, "hair");
  });
  const eye = vrm.humanoid.getRawBoneNode("leftEye");
  if (faces.length) hairShadow(faces, rest, head, eye ? eye.getWorldPosition(new THREE.Vector3()).y : hp.y + 0.07);
}

/** Bóng tóc trên mặt: từ mỗi đỉnh da mặt dò theo hướng nắng (trên, hơi trước) xem có tóc che không. */
function hairShadow(faces: MeshM[], rest: { p: Float32Array; hair: Uint8Array }[], head: THREE.Object3D, eyeY: number) {
  const C = 0.007,
    occ = new Set<number>(),
    key = (x: number, y: number, z: number) =>
      Math.floor(x / C) + 512 + (Math.floor(y / C) + 512) * 1024 + (Math.floor(z / C) + 512) * 1048576;
  for (const r of rest)
    for (let i = 0; i < r.p.length; i += 3) if (r.hair[i / 3]) occ.add(key(r.p[i], r.p[i + 1], r.p[i + 2]));
  const hw = head.getWorldPosition(new THREE.Vector3()),
    fwd = new THREE.Vector3(),
    ps = faces.map((m) => {
      const p = new Float32Array(m.geometry.attributes.position.count * 3);
      restPos(m, p);
      for (let i = 0; i < p.length; i += 3) fwd.add(new THREE.Vector3(p[i], p[i + 1], p[i + 2]).sub(hw));
      return p;
    });
  // hướng nhìn lấy từ khối mặt so với khớp đầu (trục xương đầu khác nhau giữa các rig)
  fwd.setY(0);
  if (fwd.lengthSq() < 1e-8) fwd.set(0, 0, 1);
  const L = new THREE.Vector3(0, 1, 0).addScaledVector(fwd.normalize(), 0.35).normalize();
  for (const [k, m] of faces.entries()) {
    const c = m.geometry.attributes.position.count,
      p = ps[k],
      sh = new Float32Array(c);
    for (let i = 0; i < c; i++) {
      let s = 0;
      for (let t = 0.004; t < 0.03; t += 0.0015) {
        const x = p[i * 3] + L.x * t,
          y = p[i * 3 + 1] + L.y * t,
          z = p[i * 3 + 2] + L.z * t;
        if (occ.has(key(x, y, z))) {
          s = 1 - THREE.MathUtils.smoothstep(t, 0.012, 0.03);
          break;
        }
      }
      // chỉ đổ từ trán xuống tới mí mắt, như bóng mái trong tranh anime
      sh[i] =
        s *
        Math.max(
          THREE.MathUtils.smoothstep(p[i * 3 + 1], eyeY - 0.012, eyeY + 0.002),
          THREE.MathUtils.smoothstep(Math.abs(p[i * 3] - hw.x), 0.046, 0.056) *
            THREE.MathUtils.smoothstep(p[i * 3 + 1], eyeY - 0.035, eyeY - 0.02),
        );
    }
    blur(m.geometry, sh, 2);
    m.geometry.setAttribute("aHairSh", new THREE.BufferAttribute(sh, 1));
    for (const mat of [m.material].flat()) if (mat?.isMToonMaterial && isFaceSkin(mat.name ?? "")) patch(mat, "face");
  }
}

/** Làm mượt giá trị theo đỉnh kề (gộp đỉnh trùng vị trí ở đường nối UV). */
function blur(g: THREE.BufferGeometry, v: Float32Array, n: number) {
  const idx = g.index;
  if (!idx) return;
  const p = g.attributes.position,
    weld = new Map<string, number>(),
    id = new Int32Array(p.count);
  for (let i = 0; i < p.count; i++) {
    const k = `${p.getX(i).toFixed(4)},${p.getY(i).toFixed(4)},${p.getZ(i).toFixed(4)}`;
    if (!weld.has(k)) weld.set(k, weld.size);
    id[i] = weld.get(k)!;
  }
  let w = new Float32Array(weld.size);
  for (let i = 0; i < p.count; i++) w[id[i]] = Math.max(w[id[i]], v[i]);
  for (let it = 0; it < n; it++) {
    const sum = new Float32Array(w.length),
      cnt = new Float32Array(w.length);
    for (let t = 0; t < idx.count; t += 3)
      for (let a = 0; a < 3; a++) {
        const i = id[idx.getX(t + a)],
          j = id[idx.getX(t + ((a + 1) % 3))];
        sum[i] += w[j];
        cnt[i]++;
        sum[j] += w[i];
        cnt[j]++;
      }
    w = w.map((x, i) => (x + sum[i]) / (1 + cnt[i]));
  }
  for (let i = 0; i < p.count; i++) v[i] = w[id[i]];
}

const HAIR_FRAG = /* glsl */ `
  #if defined( TT_HAIR ) && defined( MTOON_USE_UV )
  {
    vec3 base = material.diffuseColor;
    // dẹt bớt dải sáng mượt vẽ sẵn trong texture VRoid (gây vẻ nhựa), chỉ giữ chút vân lọn
    #ifdef USE_MAP
      vec3 avg = textureLod( map, vec2( 0.5 ), 12.0 ).rgb * litFactor;
      base = mix( avg, base, 0.3 );
    #endif
    // chân tóc tối, ngọn sáng
    base *= mix( 0.55, 1.15, smoothstep( 0.0, 0.9, vUv.y ) );
    // vòng sáng vẽ tay: chia quanh đầu thành từng lọn, mỗi lọn một đoạn thon, lệch cao thấp, có chỗ đứt
    vec3 d = vHair.xyz;
    float r = length( d );
    vec3 dn = d / max( r, 1e-4 );
    float az = ( atan( dn.x, dn.z ) + PI ) * ( 26.0 / PI2 );
    float k = floor( az ), f = fract( az );
    float h1 = fract( sin( k * 127.1 ) * 43758.5453 ), h2 = fract( sin( k * 269.5 ) * 18731.137 ), h3 = fract( sin( k * 419.2 ) * 9631.73 );
    float c = 0.44 + ( h1 - 0.5 ) * 0.14 - 0.18 * smoothstep( 0.0, 0.9, -dn.z );
    float w = ( 0.06 + 0.06 * h2 ) * max( 0.0, 1.0 - pow( 2.0 * f - 1.0, 2.0 ) * 0.85 );
    // mép dưới răng cưa theo sợi nhỏ trong lọn, như nét bút vẽ tay
    float sub = abs( fract( az * 3.0 ) - 0.5 );
    float e = abs( d.y - c + ( d.y < c ? sub * 0.05 : 0.0 ) ), aa = fwidth( d.y ) * 0.8 + 1e-4;
    float ring = 1.0 - smoothstep( w - aa, w + aa, e );
    ring *= step( 0.14, h3 ) * smoothstep( -0.25, 0.2, vHair.w ) * ( 1.0 - smoothstep( 1.45, 1.75, r ) );
    // dải tối vẽ ngay dưới vòng sáng (kiểu tô 3 tông), cũng đứt theo lọn
    float lo = c - w - 0.02 - sub * 0.04;
    float under = smoothstep( lo - 0.22 - aa, lo - 0.22 + aa, d.y ) * ( 1.0 - smoothstep( lo - aa, lo + aa, d.y ) );
    under *= step( 0.3, h2 ) * smoothstep( -0.25, 0.2, vHair.w ) * ( 1.0 - smoothstep( 1.45, 1.75, r ) );
    base *= 1.0 - 0.22 * under;
    vec3 ringCol = mix( base, vec3( 0.82, 0.93, 1.0 ), 0.38 ) * 1.16;
    base = mix( base, ringCol, ring );
    material.diffuseColor = base;
    // tách lọn: mép lọn (pháp tuyến quay ngang tầm nhìn) và lớp tóc trong/sau bị đẩy vào dải tối
    float nv = abs( dot( normal, normalize( vViewPosition ) ) );
    float lum = dot( base, vec3( 0.299, 0.587, 0.114 ) );
    material.shadeColor = mix( vec3( lum ), base, 0.5 ) * vec3( 0.5, 0.5, 0.66 );
    // vòng sáng là nét vẽ, vẫn hiện (dịu hơn) cả khi tóc nằm trong dải tối
    material.shadeColor = mix( material.shadeColor, ringCol * 0.75, ring * 0.7 );
    // mép lọn và lớp tóc trong tối hẳn bất kể hướng nắng, để lọn tách rõ
    float sep = max( 1.0 - smoothstep( 0.14, 0.3, nv ), 0.6 * ( 1.0 - smoothstep( -0.1, 0.25, vHair.w ) ) );
    material.diffuseColor = mix( material.diffuseColor, material.shadeColor * 1.15, sep * 0.75 );
    material.shadeColor *= 1.0 - 0.3 * sep;
  }
  #endif
`;

function patch(m: any, kind: "hair" | "face") {
  if (m.userData.ttHair) return;
  m.userData.ttHair = kind;
  if (kind === "hair") {
    m.matcapFactor?.set(0, 0, 0);
    m.parametricRimColorFactor?.set(0, 0, 0);
    // HAIR_FRAG lấy màu trung bình ở mip nhỏ nhất, cần mipmap
    if (m.map && m.map.minFilter !== THREE.LinearMipmapLinearFilter) {
      m.map.generateMipmaps = true;
      m.map.minFilter = THREE.LinearMipmapLinearFilter;
      m.map.needsUpdate = true;
    }
  }
  const prevKey = m.customProgramCacheKey?.bind(m);
  m.customProgramCacheKey = () => `${prevKey?.() ?? ""}|tt-${kind}`;
  const prevCompile = m.onBeforeCompile?.bind(m);
  m.onBeforeCompile = (s: THREE.WebGLProgramParametersWithUniforms, r: THREE.WebGLRenderer) => {
    prevCompile?.(s, r);
    const hair = kind === "hair";
    const att = hair
      ? "attribute vec4 aHair;\nvarying vec4 vHair;\n"
      : "attribute float aHairSh;\nvarying float vHairSh;\n";
    s.vertexShader = s.vertexShader
      .replace("void main() {", `${att}void main() {`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>\n${hair ? "vHair = aHair;" : "vHairSh = aHairSh;"}`);
    s.fragmentShader =
      (hair
        ? // ánh sáng trời (hemisphere) cho tóc gần như phẳng, để khối tóc chỉ do các dải cel quyết định
          "#define TT_HAIR\nvarying vec4 vHair;\n#define TT_HEMI_N(n) normalize( mix( n, ( viewMatrix * vec4( 0.0, 1.0, 0.0, 0.0 ) ).xyz, 0.85 ) )\n"
        : "#define TT_FACE\nvarying float vHairSh;\n#define TT_HEMI_N(n) n\n") +
      s.fragmentShader
        .replace(
          "reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );",
          `#ifdef TT_HAIR
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, 0.55 ) );
    #else
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
    #endif`,
        )
        .replaceAll("hemisphereLights[ i ], geometryNormal )", "hemisphereLights[ i ], TT_HEMI_N( geometryNormal ) )")
        .replaceAll("hemisphereLights[ i ], geometry.normal )", "hemisphereLights[ i ], TT_HEMI_N( geometry.normal ) )")
        .replace(
          "shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );",
          `#ifdef TT_HAIR
    // bóng đổ (shadow map PCF mềm) cũng cắt cứng thành dải, không loang mượt
    shading = mix( min( shading, -0.6 ), shading, smoothstep( 0.4, 0.6, shadow ) );
    float aaS = min( fwidth( shading ) * 0.5, 0.025 ) + 1e-3;
    shading = 0.5 * smoothstep( -0.3 - aaS, -0.3 + aaS, shading ) + 0.5 * smoothstep( 0.25 - aaS, 0.25 + aaS, shading );
    shading /= max( shadow, 1e-3 );
  #else
    shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );
  #endif
  #ifdef TT_FACE
    float aaH = fwidth( vHairSh ) + 1e-3;
    shading *= 1.0 - 0.85 * smoothstep( 0.42 - aaH, 0.42 + aaH, vHairSh );
  #endif`,
        )
        .replace(
          "  material.shadingShift = shadingShiftFactor;",
          `${HAIR_FRAG}
  #ifdef TT_FACE
  material.shadeColor = mix( material.shadeColor, material.diffuseColor * vec3( 0.84, 0.72, 0.78 ), smoothstep( 0.3, 0.5, vHairSh ) );
  #endif
  material.shadingShift = shadingShiftFactor;`,
        );
  };
  m.needsUpdate = true;
}
