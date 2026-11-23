/*
 * Bộ quản lý VFX (S30). Mỗi khung: begin() → các painter lấy mesh từ pool theo khóa (use) và đặt biến đổi,
 * uniform theo tuổi của hiệu ứng logic (f.life/f.max) → end() ẩn mesh thừa và mô phỏng hạt.
 * Hạt có hình chỉ là lớp phụ; lớp chính là mesh + shader. Số lượng theo mức đồ họa (q: 0..1).
 */
import * as THREE from "three";
import { fxMat, setCols, type FxMat, type FxMatOpt } from "./mats";
import { Sprites, type Emit } from "./sprites";
import { runeTex, type Rune } from "./tex";
import * as SH from "./shapes";

export interface VCtx {
  TS: number;
  t: number;
  dt: number;
  ground: (x: number, y: number) => number;
  glow: (x: number, y: number, z: number, col: string, i: number) => void;
  /** Hệ số chất lượng 0..1 (thấp 0.4, vừa 0.7, cao 1). */
  q: number;
  hero: THREE.Vector3;
  heroYaw: number;
}
type Pool = { list: { m: THREE.Mesh; u: FxMat["uniforms"] }[]; i: number };

export class Vfx {
  readonly group = new THREE.Group();
  readonly add: Sprites;
  readonly soft: Sprites;
  private pools = new Map<string, Pool>();
  private seen = new WeakSet<object>();
  private last = new WeakMap<object, number>();
  V!: VCtx;
  constructor(parent: THREE.Object3D) {
    this.add = new Sprites(1400, true);
    this.soft = new Sprites(500, false);
    this.group.add(this.add.mesh, this.soft.mesh);
    parent.add(this.group);
  }
  setQuality(q: number) {
    this.add.cap = Math.round(1400 * q);
    this.soft.cap = Math.round(500 * q);
  }
  begin(V: VCtx) {
    this.V = V;
    for (const p of this.pools.values()) p.i = 0;
  }
  /** Lấy một mesh từ pool `key` (tạo mới nếu thiếu). Pool tối đa 96 mesh mỗi khóa. */
  use(key: string, geo: () => THREE.BufferGeometry, opt: FxMatOpt = {}): { m: THREE.Mesh; u: FxMat["uniforms"] } | null {
    let p = this.pools.get(key);
    if (!p) this.pools.set(key, (p = { list: [], i: 0 }));
    if (p.i >= 96) return null;
    let e = p.list[p.i];
    if (!e) {
      const mat = fxMat(opt);
      const m = new THREE.Mesh(geo(), mat);
      m.frustumCulled = false;
      m.renderOrder = opt.add === false ? 3 : 4;
      this.group.add(m);
      p.list.push((e = { m, u: mat.uniforms }));
    }
    p.i++;
    e.m.visible = true;
    e.m.position.set(0, 0, 0);
    e.m.rotation.set(0, 0, 0);
    e.m.scale.set(1, 1, 1);
    const u = e.u;
    u.uT.value = this.V.t;
    u.uA.value = 1;
    u.uDis.value = 0;
    u.uWin.value.set(-1, 2);
    u.uGlow.value = 1;
    u.uRot.value = 0;
    u.uNA.value = 0.6;
    u.uScroll.value.set(0, 0);
    u.uNs.value.set(4, 4);
    return e;
  }
  end() {
    for (const p of this.pools.values()) for (let i = p.i; i < p.list.length; i++) p.list[i].m.visible = false;
    this.add.update(this.V.dt);
    this.soft.update(this.V.dt);
  }
  /** Lần đầu thấy đối tượng logic này (để phát hạt một lần). */
  first(o: object) {
    if (this.seen.has(o)) return false;
    this.seen.add(o);
    return true;
  }
  /** Đến hạn phát tiếp theo chu kỳ `every` giây (theo đồng hồ hiển thị). */
  every(o: object, every: number) {
    const t = this.V.t,
      l = this.last.get(o);
    if (l !== undefined && t - l < every) return false;
    this.last.set(o, t);
    return true;
  }
  /** Phát n hạt (đã nhân hệ số chất lượng). */
  emit(n: number, f: (i: number) => Emit, soft = false) {
    const k = Math.max(1, Math.round(n * this.V.q));
    for (let i = 0; i < k; i++) (soft ? this.soft : this.add).emit(f(i));
  }
  clear() {
    this.add.clear();
    this.soft.clear();
  }

  /* ---------- lớp dùng chung ---------- */

  /** Sóng xung kích phẳng nở ra: bán kính R (m), tuổi a 0..1. */
  shock(x: number, y: number, z: number, R: number, a: number, c: [string, string, string], al = 1, w = 0.75) {
    const e = this.use(`shock${w}`, () => SH.shock(w), { soft: [0, 0, 0.35, 0.25] });
    if (!e) return;
    const r = R * (0.25 + 0.75 * (1 - Math.pow(1 - a, 3)));
    e.m.position.set(x, y + 0.05, z);
    e.m.scale.set(r, 1, r);
    setCols(e.u, ...c);
    e.u.uAge.value = a;
    e.u.uA.value = al * (1 - a) * 1.4;
    e.u.uNs.value.set(18, 3);
    e.u.uScroll.value.set(0.4, -2);
    e.u.uDis.value = a * 0.55;
  }
  /** Decal phù văn trên nền: nở nhanh, xoay chậm, tan theo noise khi già. */
  rune(k: Rune, x: number, y: number, z: number, R: number, a: number, c: [string, string, string], al = 1, spin = 0.3) {
    const e = this.use(`rune-${k}`, SH.decal, { map: runeTex(k), depthTest: true });
    if (!e) return;
    const grow = 1 - Math.pow(1 - Math.min(1, a * 4), 3);
    e.m.position.set(x, y + 0.04, z);
    e.m.scale.set(R * (0.6 + 0.4 * grow), 1, R * (0.6 + 0.4 * grow));
    setCols(e.u, ...c);
    e.u.uAge.value = a;
    e.u.uRot.value = this.V.t * spin;
    e.u.uA.value = al * Math.min(1, a * 8);
    e.u.uNs.value.set(6, 6);
    e.u.uNA.value = 0.5;
    e.u.uDis.value = Math.max(0, a - 0.7) * 2.4;
  }
  /** Tinh thể/gai đứng tại chỗ: mọc lên (grow 0..1), tan theo noise (dis 0..1). */
  crystal(
    key: "crystal" | "spike",
    x: number,
    y: number,
    z: number,
    h: number,
    w: number,
    yaw: number,
    tilt: number,
    grow: number,
    dis: number,
    c: [string, string, string],
  ) {
    const e = this.use(key, key === "crystal" ? SH.crystal : SH.spike, { facet: true, add: false, side: THREE.FrontSide });
    if (!e) return;
    const g = 1 - Math.pow(1 - Math.min(1, grow), 3);
    e.m.position.set(x, y, z);
    e.m.rotation.set(tilt, yaw, 0, "YXZ");
    e.m.scale.set(w, h * g, w);
    setCols(e.u, ...c);
    e.u.uAge.value = Math.min(1, dis);
    e.u.uA.value = 0.92;
    e.u.uNA.value = 0.15;
    e.u.uNs.value.set(3, 6);
    e.u.uDis.value = dis;
  }
  /** Lớp sáng bọc ngoài tinh thể (glow cộng) để có cảm giác trong suốt phát sáng. */
  crystalGlow(x: number, y: number, z: number, h: number, w: number, yaw: number, tilt: number, al: number, c: string) {
    const e = this.use("crystalGlow", SH.crystal, { fres: 2.2, fresAlpha: true });
    if (!e) return;
    e.m.position.set(x, y, z);
    e.m.rotation.set(tilt, yaw, 0, "YXZ");
    e.m.scale.set(w * 1.25, h * 1.08, w * 1.25);
    setCols(e.u, c, c, c);
    e.u.uA.value = al;
    e.u.uNA.value = 0.2;
  }
  /** Chớp sáng tâm: đèn điểm + lõi quầng nhỏ (không phải hạt rơi). */
  flash(x: number, y: number, z: number, col: string, i: number, size = 1.6) {
    this.V.glow(x, y, z, col, i);
    if (i <= 0.05) return;
    const e = this.use("flash", SH.ball, { fres: 1.5, fresAlpha: false, depthTest: false });
    if (!e) return;
    e.m.position.set(x, y, z);
    e.m.scale.setScalar(size * Math.min(1, i / 3) * 0.16);
    setCols(e.u, "#ffffff", col, col);
    e.u.uA.value = Math.min(1, i / 3) * 0.3;
    e.u.uNA.value = 0;
  }
}
