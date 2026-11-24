/**
 * S27: dây cung kéo theo tay phải, thân cung cong khi căng, mũi tên rời dây khi thả.
 * Mô hình cung chỉ có lưới "string" (không có xương dây) nên dây được giả bằng cách dịch đỉnh:
 *  - lúc móc dây: điểm giữa dây (nock) gắn vào ngón giữa tay phải, dây là 2 đoạn thẳng từ hai đầu cánh cung tới đó;
 *  - thân cung: hai cánh (limb, tip, vein) xoay quanh chỗ nối với tay cầm theo độ kéo, đầu dây đi theo đầu cánh;
 *  - lúc thả: nock rời tay, dây bật về thẳng và rung tắt dần, mũi tên bay ra theo hướng ngắm.
 * Độ kéo (0 nghỉ, 1 móc dây) lấy từ rãnh `str` trong humanoid.json; thời điểm thả suy ra từ cùng rãnh.
 */
import * as THREE from "three";
import { toonMat } from "./mat";

const D = Math.PI / 180;
/** Góc cong tối đa của mỗi cánh (độ) khi kéo hết tầm. */
const BEND = 12;
/** Tầm kéo (m, hệ mô hình cung) ứng với cong tối đa. */
const DRAW = 0.5;
const VIB = { amp: 0.03, tau: 0.07, hz: 15, end: 0.45 };
const FLY = { v: 24, end: 0.3 };

interface Limb {
  pv: THREE.Group;
  sg: number;
}

const _mi = new THREE.Matrix4();

export class BowRig {
  private rest: Float32Array;
  private lo: THREE.Vector3;
  private hi: THREE.Vector3;
  private lo2 = new THREE.Vector3();
  private hi2 = new THREE.Vector3();
  private limbs: Limb[] = [];
  private aimTail: THREE.Vector3 | null = null;
  private aimDir: THREE.Vector3 | null = null;
  arrow: THREE.Group;
  private _n = new THREE.Vector3();
  private _g = new THREE.Vector3();

  constructor(
    private str: THREE.Mesh,
    private grip: THREE.Object3D,
    private hand: THREE.Object3D,
    parent: THREE.Object3D,
  ) {
    str.geometry = str.geometry.clone();
    for (const c of str.children) if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).geometry = str.geometry;
    const pos = str.geometry.attributes.position as THREE.BufferAttribute;
    this.rest = Float32Array.from(pos.array as ArrayLike<number>);
    let lo = 0,
      hi = 0;
    for (let i = 0; i < pos.count; i++) {
      if (pos.getY(i) < pos.getY(lo)) lo = i;
      if (pos.getY(i) > pos.getY(hi)) hi = i;
    }
    this.lo = new THREE.Vector3().fromBufferAttribute(pos, lo);
    this.hi = new THREE.Vector3().fromBufferAttribute(pos, hi);
    this.rigLimbs();
    this.arrow = makeArrow();
    this.arrow.visible = false;
    parent.add(this.arrow);
  }

  /** Gom limb/tip/vein mỗi bên vào một nhóm xoay quanh chỗ nối tay cầm. */
  private rigLimbs() {
    const root = this.str.parent;
    if (!root) return;
    for (const [sfx, sg] of [
      ["up", 1],
      ["lo", -1],
    ] as const) {
      const ms = ["limb_", "tip_", "vein_"]
        .map((n) => root.getObjectByName(n + sfx))
        .filter((o): o is THREE.Object3D => !!o && o.parent === root);
      const limb = ms[0] as THREE.Mesh | undefined;
      if (!limb?.isMesh) continue;
      limb.geometry.computeBoundingBox();
      const b = limb.geometry.boundingBox!.clone().applyMatrix4(limb.matrix);
      const pv = new THREE.Group();
      pv.name = "pivot_" + sfx;
      pv.position.set(b.max.x - 0.015, sg > 0 ? b.min.y : b.max.y, 0);
      root.add(pv);
      for (const o of ms) {
        o.position.sub(pv.position);
        pv.add(o);
      }
      this.limbs.push({ pv, sg });
    }
  }

  /** Đầu dây sau khi cánh cung cong (hệ lưới dây). */
  private tipEnd(p: THREE.Vector3, sg: number, out: THREE.Vector3) {
    out.copy(p);
    const L = this.limbs.find((l) => l.sg === sg);
    if (!L) return out;
    this.str.updateMatrix();
    L.pv.updateMatrix();
    // lưới dây → gốc cung → hệ nhóm cánh lúc nghỉ → xoay → về lại hệ lưới dây.
    out.applyMatrix4(this.str.matrix);
    out.sub(L.pv.position).applyQuaternion(L.pv.quaternion).add(L.pv.position);
    return out.applyMatrix4(_mi.copy(this.str.matrix).invert());
  }

  /**
   * Gọi sau khi xương đã cập nhật xong khung này.
   * k: độ móc dây (0..1); rel: số giây kể từ lúc thả dây, -1 nếu không vừa thả.
   */
  update(k: number, rel = -1) {
    const pos = this.str.geometry.attributes.position as THREE.BufferAttribute;
    const R = this.rest,
      { lo, hi } = this;
    const released = rel >= 0;
    const h = released ? 0 : THREE.MathUtils.smoothstep(k, 0.02, 0.15);
    // Điểm móc dây: đốt giữa ngón giữa tay phải.
    this.hand.updateWorldMatrix(true, false);
    const n = this.hand.getWorldPosition(this._n);
    this.str.updateWorldMatrix(true, false);
    this.str.worldToLocal(n);
    const len = hi.y - lo.y;
    const mid = _v1.addVectors(lo, hi).multiplyScalar(0.5);
    const pull = THREE.MathUtils.clamp(n.distanceTo(mid) / DRAW, 0, 1) * h;
    for (const L of this.limbs) L.pv.rotation.z = L.sg * BEND * D * pull * (2 - pull);
    const lo2 = this.tipEnd(lo, -1, this.lo2),
      hi2 = this.tipEnd(hi, 1, this.hi2);
    const sn = THREE.MathUtils.clamp((n.y - lo2.y) / (hi2.y - lo2.y || 1), 0.25, 0.75);
    // Rung sau khi thả: bật quá về phía thân cung rồi tắt dần.
    const vib =
      released && rel < VIB.end ? VIB.amp * Math.exp(-rel / VIB.tau) * Math.cos(2 * Math.PI * VIB.hz * rel) : 0;
    const line = (s: number, o: THREE.Vector3) => {
      o.lerpVectors(lo2, hi2, s);
      if (h > 0) {
        const v = s <= sn ? _v2.lerpVectors(lo2, n, s / sn) : _v2.lerpVectors(n, hi2, (s - sn) / (1 - sn));
        o.lerp(v, h);
      }
      o.x += vib * Math.sin(Math.PI * s);
      return o;
    };
    const t = _v3;
    for (let i = 0; i < pos.count; i++) {
      const x = R[i * 3],
        y = R[i * 3 + 1],
        z = R[i * 3 + 2];
      const s = THREE.MathUtils.clamp((y - lo.y) / len, 0, 1);
      line(s, t);
      pos.setXYZ(
        i,
        x + t.x - (lo.x + (hi.x - lo.x) * s),
        y + t.y - (lo.y + len * s),
        z + t.z - (lo.z + (hi.z - lo.z) * s),
      );
    }
    pos.needsUpdate = true;
    this.str.geometry.computeBoundingSphere();
    // Mũi tên: lúc móc dây đuôi ở nock, thân tựa lên tay cầm; lúc thả bay thẳng ra trước theo hướng ngắm.
    const flying = released && rel < FLY.end;
    this.arrow.visible = flying || (h > 0.3 && k > 0.05);
    if (!this.arrow.visible) return;
    const par = this.arrow.parent!;
    par.updateWorldMatrix(true, false);
    const g = this.grip.getWorldPosition(this._g);
    let tail: THREE.Vector3, dir: THREE.Vector3;
    if (flying) {
      // Bay tiếp từ chỗ đuôi tên lúc thả, theo hướng ngắm cuối cùng.
      tail = this.aimTail ? _v4.copy(this.aimTail) : this.str.localToWorld(_v4.lerpVectors(lo2, hi2, 0.5));
      dir = this.aimDir ? _v1.copy(this.aimDir) : g.sub(tail).normalize();
      tail.addScaledVector(dir, FLY.v * rel);
    } else {
      tail = this.str.localToWorld(line(sn, _v4));
      dir = g.sub(tail).normalize();
      (this.aimTail ??= new THREE.Vector3()).copy(tail);
      (this.aimDir ??= new THREE.Vector3()).copy(dir);
    }
    this.arrow.position.copy(par.worldToLocal(tail.clone()));
    this.arrow.lookAt(_v5.copy(tail).add(dir));
    const sc = par.getWorldScale(_v5).x || 1;
    this.arrow.scale.setScalar(1 / sc);
  }

  /** Mũi tên nằm ngoài cảnh VRM: tự gỡ và giải phóng. */
  dispose() {
    this.arrow.removeFromParent();
    this.arrow.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    });
  }
}

const _v1 = new THREE.Vector3(),
  _v2 = new THREE.Vector3(),
  _v3 = new THREE.Vector3(),
  _v4 = new THREE.Vector3(),
  _v5 = new THREE.Vector3();
/** Mũi tên đơn giản: thân gỗ, mũi kim loại, ba lông đuôi. Trục +Z, đuôi ở gốc tọa độ. */
function makeArrow() {
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.005, 0.72, 5),
    toonMat({ color: new THREE.Color("#b08a5a") }),
  );
  shaft.rotation.x = Math.PI / 2;
  shaft.position.z = 0.36;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.05, 6), toonMat({ color: new THREE.Color("#cfd6de") }));
  head.rotation.x = Math.PI / 2;
  head.position.z = 0.745;
  g.add(shaft, head);
  for (let i = 0; i < 3; i++) {
    const f = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.08), toonMat({ color: new THREE.Color("#f2efe6") }));
    (f.material as THREE.Material).side = THREE.DoubleSide;
    f.rotation.set(Math.PI / 2, (i * Math.PI * 2) / 3, 0, "ZXY");
    f.position.set(Math.cos((i * Math.PI * 2) / 3) * 0.011, Math.sin((i * Math.PI * 2) / 3) * 0.011, 0.06);
    g.add(f);
  }
  return g;
}
