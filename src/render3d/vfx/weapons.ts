/*
 * VFX vũ khí (S30). Pháp khí: sách lơ lửng mở cạnh tay trái, vòng phù văn xoay, trang tự lật khi đánh,
 * ánh nguyên tố hắt ra từ trang; đạn phép có lõi sáng + vỏ shader nhiễu + đuôi ruy-băng; trọng kích có vòng
 * phép dưới chân và vòng chữ quanh sách; rút ra/cất đi bằng hạt sáng xoáy. Lớp phẩm chất theo vũ khí.
 */
import * as THREE from "three";
import { EL } from "../../data/content";
import { fxMat, setCols, type FxMat } from "./mats";
import { runeTex, type Cell } from "./tex";
import * as SH from "./shapes";
import type { Vfx } from "./system";

const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const RUNE: Record<string, "ice" | "water" | "fire" | "wind" | "bolt" | "earth" | "wood"> = {
  ice: "ice",
  water: "water",
  fire: "fire",
  wind: "wind",
  bolt: "bolt",
  earth: "earth",
  wood: "wood",
};
/** Hạt đặc trưng của nguyên tố: [mảnh chính, mảnh phụ]. */
const ELCELL: Record<string, [Cell, Cell]> = {
  ice: ["hoaTuyet", "manhBang"],
  water: ["giotNuoc", "sao4"],
  fire: ["tanLua", "canhMai"],
  wind: ["soiGio", "longVu"],
  bolt: ["tiaSet", "sao4"],
  earth: ["manhVo", "bui"],
  wood: ["canhMai", "sao6"],
};
const colsOf = (el: string): [string, string, string] => {
  const E = (EL as any)[el] ?? { c: "#9fd8ff", c2: "#ffffff" };
  return ["#ffffff", E.c2, E.c];
};

/** Vũ khí đang trang bị: id, sao, bậc tinh luyện (1..5). */
export interface WInfo {
  id: string;
  r: number;
  tl: number;
}

/* ---------- Sách pháp khí ---------- */

const pivot = (g: THREE.BufferGeometry, dx: number) => (g.translate(dx, 0, 0), g);
const shaft = () => new THREE.CylinderGeometry(0.06, 0.13, 0.32, 20, 1, true).translate(0, 0.16, 0);

class Book {
  readonly g = new THREE.Group();
  private coverL: THREE.Mesh;
  private coverR: THREE.Mesh;
  private pageL: THREE.Mesh;
  private pageR: THREE.Mesh;
  private flipM: THREE.Mesh;
  private glyph: THREE.Mesh;
  private light: THREE.Mesh;
  private mats: FxMat[] = [];
  private el = "";
  constructor(parent: THREE.Object3D) {
    const cover = fxMat({ facet: true, add: false, side: THREE.DoubleSide });
    const page = fxMat({ add: false, side: THREE.DoubleSide });
    const glyph = fxMat({ map: runeTex("ice"), side: THREE.DoubleSide });
    const light = fxMat({ fres: 1.2, soft: [0, 0, 0.1, 0.9], side: THREE.DoubleSide });
    this.mats.push(cover, page, glyph, light);
    const cg = () => pivot(new THREE.BoxGeometry(0.17, 0.012, 0.24), 0.085);
    const pg = () => pivot(new THREE.PlaneGeometry(0.155, 0.22).rotateX(-Math.PI / 2), 0.0775);
    this.coverL = new THREE.Mesh(cg(), cover);
    this.coverR = new THREE.Mesh(cg(), cover);
    this.pageL = new THREE.Mesh(pg(), page);
    this.pageR = new THREE.Mesh(pg(), page);
    this.flipM = new THREE.Mesh(pg(), page);
    this.glyph = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.24).rotateX(-Math.PI / 2), glyph);
    this.light = new THREE.Mesh(shaft(), light);
    for (const o of [this.coverL, this.coverR, this.pageL, this.pageR, this.flipM, this.glyph, this.light]) {
      o.frustumCulled = false;
      this.g.add(o);
    }
    this.glyph.renderOrder = this.light.renderOrder = 5;
    this.g.visible = false;
    parent.add(this.g);
  }
  /** open 0..1 (khép → mở), flip 0..1 (trang lật từ phải sang trái), glow cường độ ánh trang. */
  pose(t: number, el: string, open: number, flip: number, glow: number, dis: number) {
    const [c0, c1, c2] = colsOf(el);
    if (el !== this.el) {
      this.el = el;
      (this.glyph.material as FxMat).uniforms.uMap.value = runeTex(RUNE[el] ?? "ice");
    }
    const [cover, page, glyph, light] = this.mats;
    setCols(cover.uniforms, "#f6d9a0", "#7a3f2a", "#3a1d18");
    setCols(page.uniforms, "#e9dcbc", "#cdb68a", "#a98d5f");
    setCols(glyph.uniforms, c0, c1, c2);
    setCols(light.uniforms, c0, c1, c2);
    for (const m of this.mats) {
      m.uniforms.uT.value = t;
      m.uniforms.uDis.value = dis;
      m.uniforms.uWin.value.set(-1, 2);
      m.uniforms.uGlow.value = m === cover || m === page ? 0.75 : 1;
      m.uniforms.uScroll.value.set(0, 0);
    }
    cover.uniforms.uAge.value = 0.5;
    cover.uniforms.uNA.value = 0.1;
    page.uniforms.uAge.value = 0.2;
    page.uniforms.uNA.value = 0.15;
    page.uniforms.uNs.value.set(30, 30);
    glyph.uniforms.uAge.value = 0.35;
    glyph.uniforms.uA.value = 0.7 * glow * open;
    glyph.uniforms.uRot.value = t * 0.4;
    glyph.uniforms.uGlow.value = 1.3;
    light.uniforms.uAge.value = 0.4;
    light.uniforms.uA.value = 0.16 * glow * open;
    light.uniforms.uNs.value.set(10, 3);
    light.uniforms.uScroll.value.set(0.2, -1.2);
    light.uniforms.uNA.value = 0.8;
    const a = (1 - open) * Math.PI * 0.48;
    this.coverR.rotation.set(0, 0, a);
    this.pageR.rotation.set(0, 0, a);
    this.pageR.position.y = 0.012;
    this.coverL.rotation.set(0, 0, Math.PI - a);
    this.pageL.rotation.set(0, 0, Math.PI - a);
    this.pageL.position.y = 0.012;
    const fa = flip > 0 ? ease(flip) * Math.PI : 0;
    this.flipM.visible = flip > 0 && flip < 1;
    this.flipM.rotation.set(0, 0, a + fa * (1 - a / Math.PI));
    this.flipM.position.y = 0.016;
    this.glyph.position.y = 0.03;
    this.glyph.visible = this.light.visible = open > 0.5;
  }
}

/* ---------- trạng thái pháp khí của người đang điều khiển ---------- */

export class Catalyst {
  private book: Book;
  out = 0;
  private want = false;
  private flip = 1;
  private lastAct = -99;
  private lastT0 = -1;
  private chargeK = 0;
  private wasCharging = false;
  readonly pos = new THREE.Vector3();
  el = "ice";
  constructor(parent: THREE.Object3D) {
    this.book = new Book(parent);
  }
  hide() {
    this.book.g.visible = false;
    this.out = 0;
  }
  /** Gọi mỗi khung khi nhân vật dùng pháp khí. hand: vị trí tay trái (thế giới) nếu có. */
  update(X: Vfx, G: any, m: any, hand: THREE.Vector3 | null, w: WInfo | null) {
    const V = X.V,
      p = G.p,
      dt = V.dt,
      h = V.hero,
      yaw = V.heroYaw;
    this.el = m.c.el;
    const cols = colsOf(this.el);
    const act = p.act;
    if (act && act.t0 !== this.lastT0) {
      this.lastT0 = act.t0;
      this.lastAct = G.time;
      if (this.out > 0.6) this.flip = 0;
    }
    const charging = !!p.charge && !p.charge.done && p.charge.t > 0.12;
    if (charging) this.lastAct = G.time;
    this.want = G.time - this.lastAct < 4 || !!G.cine;
    const prev = this.out;
    this.out = Math.max(0, Math.min(1, this.out + (this.want ? dt / 0.55 : -dt / 0.6)));
    if (this.out <= 0) return void (this.book.g.visible = false);
    // Vị trí: cạnh tay trái, lệch ra ngoài và lên trên một chút; trôi nhẹ.
    const lx = Math.cos(yaw),
      lz = -Math.sin(yaw),
      fx = Math.sin(yaw),
      fz = Math.cos(yaw);
    const base = hand ?? new THREE.Vector3(h.x + lx * 0.32, h.y + 1.0, h.z + lz * 0.32);
    this.pos.set(
      base.x + lx * 0.22 + fx * 0.12,
      base.y + 0.12 + Math.sin(V.t * 2.2) * 0.03,
      base.z + lz * 0.22 + fz * 0.12,
    );
    const appear = this.want ? ease(this.out * 1.6 - 0.4) : 1;
    const open = this.want ? ease((this.out - 0.45) / 0.55) : ease((this.out - 0.5) / 0.5);
    const dis = this.want ? 0 : Math.max(0, 1 - this.out / 0.5);
    this.flip = Math.min(1, this.flip + dt / 0.28);
    this.chargeK = charging ? Math.min(1, this.chargeK + dt / 0.9) : Math.max(0, this.chargeK - dt * 3);
    const glow = 0.55 + this.chargeK * 0.9 + (this.flip < 1 ? (1 - this.flip) * 0.8 : 0);
    const g = this.book.g;
    g.visible = true;
    g.position.copy(this.pos);
    g.rotation.set(-0.55, yaw + Math.PI + 0.35, 0, "YXZ");
    g.scale.setScalar((0.25 + 0.75 * appear) * 1.7);
    this.book.pose(V.t, this.el, open, this.flip, glow, dis);
    // Vòng phù văn quanh sách, xoay nhẹ; nạp trọng kích thì to hơn, nhanh hơn, hiện thêm vòng chữ.
    const ringA = open * (0.45 + this.chargeK * 0.9) * (1 - dis);
    const ring = X.use("cat-ring", SH.decal, { map: runeTex(RUNE[this.el] ?? "ice"), side: THREE.DoubleSide });
    if (ring) {
      ring.m.position.copy(this.pos);
      ring.m.rotation.set(-0.55 + Math.PI / 2 - 0.3, yaw + Math.PI + 0.35, 0, "YXZ");
      ring.m.scale.setScalar(0.4 + this.chargeK * 0.3);
      setCols(ring.u, ...cols);
      ring.u.uA.value = ringA;
      ring.u.uRot.value = V.t * (0.5 + this.chargeK * 3);
      ring.u.uAge.value = 0.3;
      ring.u.uGlow.value = 1 + this.chargeK * 0.8;
    }
    V.glow(this.pos.x, this.pos.y + 0.2, this.pos.z, cols[1], (0.5 + glow) * open);
    // Rút ra / cất đi: hạt sáng xoáy vào (rút) hoặc tản ra (cất).
    if (this.want && prev < 0.7 && this.out < 0.8)
      X.emit(3, (i) => {
        const a = V.t * 9 + i * 2.1,
          r = 0.55;
        return {
          cell: i % 2 ? "sao4" : (ELCELL[this.el]?.[0] ?? "sao6"),
          x: this.pos.x + Math.cos(a) * r,
          y: this.pos.y - 0.2 + i * 0.12,
          z: this.pos.z + Math.sin(a) * r,
          vx: -Math.cos(a) * 1.2 - Math.sin(a) * 1.8,
          vy: 0.4,
          vz: -Math.sin(a) * 1.2 + Math.cos(a) * 1.8,
          drag: 2,
          life: 0.35,
          size: 0.14,
          size1: 0.03,
          col: cols[0],
          col1: cols[1],
          spin: 6,
        };
      });
    if (!this.want && this.out < 0.5)
      X.emit(2, () => ({
        cell: "sao4",
        x: this.pos.x + (Math.random() - 0.5) * 0.3,
        y: this.pos.y + (Math.random() - 0.5) * 0.2,
        z: this.pos.z + (Math.random() - 0.5) * 0.3,
        vx: (Math.random() - 0.5) * 1.4,
        vy: 0.6 + Math.random(),
        vz: (Math.random() - 0.5) * 1.4,
        drag: 1.5,
        life: 0.5,
        size: 0.12,
        size1: 0.02,
        col: cols[0],
        col1: cols[1],
      }));
    // Trọng kích: vòng phép dưới chân lớn dần, hạt hội tụ vào sách; buông thì lóe lớn.
    if (this.chargeK > 0) {
      X.rune(
        RUNE[this.el] ?? "ice",
        h.x,
        h.y,
        h.z,
        0.8 + this.chargeK * 1.1,
        0.35,
        cols,
        this.chargeK,
        0.6 + this.chargeK * 2,
      );
      X.shock(h.x, h.y, h.z, 1.6, (V.t * 1.6) % 1, cols, 0.4 * this.chargeK, 0.9);
      X.emit(2 + this.chargeK * 3, () => {
        const a = Math.random() * 6.28,
          r = 1 + Math.random() * 0.6;
        return {
          cell: Math.random() < 0.5 ? "sao4" : (ELCELL[this.el]?.[1] ?? "sao4"),
          x: this.pos.x + Math.cos(a) * r,
          y: this.pos.y + (Math.random() - 0.3) * 1.2,
          z: this.pos.z + Math.sin(a) * r,
          vx: -Math.cos(a) * r * 3,
          vy: 0,
          vz: -Math.sin(a) * r * 3,
          drag: 0.2,
          life: 0.3,
          size: 0.16,
          size1: 0.04,
          col: cols[0],
          col1: cols[1],
          spin: 5,
        };
      });
      // Vòng chữ quanh sách: các phù văn nhỏ xoay quanh theo vòng tròn đứng.
      const n = 12;
      for (let i = 0; i < n; i++) {
        const a = V.t * 2.5 + (i / n) * Math.PI * 2;
        const e = X.use("cat-letter", SH.decal, {
          map: runeTex(RUNE[this.el] ?? "ice"),
          side: THREE.DoubleSide,
          depthTest: false,
        });
        if (!e) break;
        e.m.position.set(
          this.pos.x + Math.cos(a) * 0.62 * lx,
          this.pos.y + Math.sin(a) * 0.62,
          this.pos.z + Math.cos(a) * 0.62 * lz,
        );
        e.m.rotation.set(Math.PI / 2, yaw, a, "YXZ");
        e.m.scale.setScalar(0.2);
        setCols(e.u, ...cols);
        e.u.uA.value = Math.min(1, this.chargeK * 1.6);
        e.u.uGlow.value = 1.6;
        e.u.uRot.value = i;
      }
    }
    if (this.wasCharging && !charging && p.charge?.done !== false) {
      X.flash(this.pos.x, this.pos.y + 0.1, this.pos.z, cols[1], 4, 2);
      X.shock(h.x, h.y, h.z, 3, 0.05, cols, 1);
      this.flip = 0;
    }
    this.wasCharging = charging;
    if (w) quality(X, this, w, cols, open * (1 - dis));
  }
  /** Lóe ở miệng sách khi bắn một đạn phép. */
  muzzle(X: Vfx) {
    if (this.out < 0.5) return;
    const cols = colsOf(this.el);
    X.flash(this.pos.x, this.pos.y + 0.08, this.pos.z, cols[1], 2.2, 1.1);
    X.emit(1, () => ({
      cell: "sao4",
      x: this.pos.x,
      y: this.pos.y + 0.1,
      z: this.pos.z,
      life: 0.14,
      size: 0.6,
      size1: 0.15,
      col: cols[1],
      col1: cols[1],
      rot: Math.random(),
    }));
    X.emit(5, () => ({
      cell: "tiaLua",
      x: this.pos.x,
      y: this.pos.y + 0.1,
      z: this.pos.z,
      vx: (Math.random() - 0.5) * 4,
      vy: 1 + Math.random() * 2,
      vz: (Math.random() - 0.5) * 4,
      drag: 5,
      life: 0.2,
      size: 0.16,
      size1: 0.04,
      col: cols[0],
      col1: cols[1],
      stretch: 2.5,
    }));
  }
}

/** Lớp phẩm chất: 4★ ánh nhẹ; 5★ hiệu ứng thường trực theo vũ khí; R5 rõ hơn. */
function quality(X: Vfx, c: Catalyst, w: WInfo, cols: [string, string, string], al: number) {
  if (w.r < 4 || al <= 0.05) return;
  const V = X.V,
    k = (w.tl >= 5 ? 1.4 : 1) * al,
    P = c.pos;
  const halo = X.use("cat-halo", () => SH.shock(0.9), { soft: [0, 0, 0.3, 0.3] });
  if (halo) {
    halo.m.position.copy(P);
    halo.m.rotation.set(Math.PI / 2, V.heroYaw, V.t * 0.6, "YXZ");
    halo.m.scale.setScalar(0.26 + (w.r >= 5 ? 0.05 : 0));
    halo.u.uNs.value.set(24, 2);
    halo.u.uScroll.value.set(0.3, 0);
    setCols(halo.u, ...(w.r >= 5 ? (["#fff6d8", "#ffd77a", cols[1]] as [string, string, string]) : cols));
    halo.u.uA.value = (w.r >= 5 ? 0.55 : 0.3) * k;
    halo.u.uAge.value = 0.4;
  }
  if (w.r < 5) return;
  const sig = SIG[w.id];
  if (sig && X.every(c, 0.09 / Math.min(1.4, k))) X.emit(1, () => sig(P, V.t));
}
/** Hiệu ứng thường trực riêng của pháp khí 5★, theo tên và truyện vũ khí. */
const SIG: Record<string, (P: THREE.Vector3, t: number) => any> = {
  // Đóa Hồng Ngủ Trong Băng: cánh hoa lựu hồng đông băng, trôi chậm quanh sách.
  "doa-hong-ngu-trong-bang": (P, t) => {
    const a = t * 1.3 + Math.random() * 6.28;
    return {
      cell: "canhMai",
      x: P.x + Math.cos(a) * 0.35,
      y: P.y + (Math.random() - 0.5) * 0.3,
      z: P.z + Math.sin(a) * 0.35,
      vx: -Math.sin(a) * 0.4,
      vy: 0.15,
      vz: Math.cos(a) * 0.4,
      life: 1.2,
      size: 0.12,
      size1: 0.06,
      col: "#ffd0dc",
      col1: "#9fe6ff",
      spin: 1.5,
    };
  },
  // Thủy Mặc Vấn Thiên: giọt mực nổi lên rồi tan thành chữ.
  "thuy-mac-van-thien": (P) => ({
    cell: Math.random() < 0.5 ? "giotNuoc" : "khoi",
    x: P.x + (Math.random() - 0.5) * 0.3,
    y: P.y,
    z: P.z + (Math.random() - 0.5) * 0.3,
    vy: 0.5,
    drag: 0.5,
    life: 1,
    size: 0.08,
    size1: 0.18,
    col: "#1d2a4a",
    col1: "#6fa8ff",
    a: 0.8,
  }),
  // Kính Thủy Lưu Nguyệt: ánh trăng non bạc lấp lánh như mặt hồ.
  "kinh-thuy-luu-nguyet": (P, t) => {
    const a = t * 0.8 + Math.random() * 0.8;
    return {
      cell: "sao6",
      x: P.x + Math.cos(a) * 0.4,
      y: P.y + 0.2 + Math.sin(a) * 0.3,
      z: P.z,
      life: 0.8,
      size: 0.1,
      size1: 0.02,
      col: "#ffffff",
      col1: "#bcd8ff",
      spin: 2,
    };
  },
};

/* ---------- đạn phép ---------- */

/** Đạn phép pháp khí: lõi sáng, vỏ nhiễu, đuôi ruy-băng, hình theo nguyên tố. */
export function catProj(pr: any, X: Vfx) {
  const V = X.V,
    el = pr.el ?? "water",
    cols = colsOf(el),
    x = pr.x / V.TS,
    z = pr.y / V.TS,
    y = V.ground(pr.x, pr.y) + 1,
    yaw = Math.atan2(pr.vx, pr.vy),
    s = Math.max(0.8, pr.r / 8);
  const core = X.use("cp-core", SH.ball, { fres: 0.8, depthTest: true });
  if (core) {
    core.m.position.set(x, y, z);
    core.m.scale.setScalar(0.09 * s);
    setCols(core.u, cols[1], cols[1], cols[2]);
    core.u.uGlow.value = 1.1;
  }
  const shell = X.use("cp-shell", SH.ball, { fres: 1.8, fresAlpha: true });
  if (shell) {
    shell.m.position.set(x, y, z);
    shell.m.rotation.set(0, yaw, 0);
    shell.m.scale.set(0.2 * s, 0.2 * s, (el === "water" ? 0.34 : 0.24) * s);
    setCols(shell.u, ...cols);
    shell.u.uAge.value = 0.5;
    shell.u.uNs.value.set(6, 6);
    shell.u.uScroll.value.set(0, 3);
    shell.u.uNA.value = 0.9;
    shell.u.uA.value = 1.2;
  }
  const tail = X.use("cp-tail", () => SH.beam(1), { soft: [0.5, 0.02, 0.35, 0.35] });
  if (tail) {
    tail.m.position.set(x, y, z);
    tail.m.rotation.set(0, yaw + Math.PI, Math.sin(V.t * 14 + pr.x) * 0.6);
    tail.m.scale.set(1, 0.18 * s, 1.3 * s);
    setCols(tail.u, ...cols);
    tail.u.uAge.value = 0.45;
    tail.u.uNs.value.set(8, 2);
    tail.u.uScroll.value.set(5, 0);
  }
  // Hình nguyên tố bám đạn.
  if (el === "ice" || el === "earth") {
    for (let i = 0; i < 3; i++) {
      const a = V.t * 8 + (i * Math.PI * 2) / 3;
      X.crystal(
        "crystal",
        x + Math.cos(a) * 0.16 * Math.cos(yaw),
        y + Math.sin(a) * 0.16,
        z - Math.cos(a) * 0.16 * Math.sin(yaw),
        0.16 * s,
        0.35,
        yaw,
        a,
        1,
        0,
        cols,
      );
    }
  } else if (el === "fire" || el === "wood") {
    for (let i = 0; i < 4; i++) {
      const e = X.use("cp-petal", SH.petal, { soft: [0, 0, 0, 0] });
      if (!e) break;
      e.m.position.set(x, y, z);
      e.m.rotation.set(V.t * 6, yaw + (i * Math.PI) / 2, (i * Math.PI) / 2, "YXZ");
      e.m.scale.setScalar(0.22 * s);
      setCols(e.u, ...cols);
      e.u.uAge.value = 0.4;
    }
  } else if (el === "wind") {
    const e = X.use("cp-helix", () => SH.helix(1.5, 1, 0.3, 1, 0.3), { soft: [0, 0, 0.3, 0.3] });
    if (e) {
      e.m.position.set(x, y, z);
      e.m.rotation.set(Math.PI / 2, yaw, V.t * 10, "YXZ");
      e.m.scale.set(0.2 * s, 0.6 * s, 0.2 * s);
      setCols(e.u, ...cols);
      e.u.uAge.value = 0.3;
    }
  }
  const [c1, c2] = ELCELL[el] ?? ["sao4", "sao4"];
  X.emit(2, (i) => ({
    cell: i ? c2 : c1,
    x,
    y,
    z,
    vx: (Math.random() - 0.5) * 0.8 - (pr.vx / V.TS) * 0.05,
    vy: (Math.random() - 0.3) * 0.8,
    vz: (Math.random() - 0.5) * 0.8 - (pr.vy / V.TS) * 0.05,
    life: 0.35,
    size: 0.14 * s,
    size1: 0.03,
    col: cols[0],
    col1: cols[1],
    spin: 6,
  }));
  V.glow(x, y, z, cols[1], 1.4);
}

/** Vụ nổ nhỏ có hình khi đạn phép trúng. */
export function catBurst(f: any, X: Vfx) {
  const V = X.V,
    el = f.el ?? "water",
    cols = colsOf(el),
    x = f.x / V.TS,
    z = f.y / V.TS,
    gy = V.ground(f.x, f.y),
    y = gy + 0.9,
    a = 1 - f.life / f.max;
  const e = X.use("cb-shell", SH.ball, { fres: 1.4, fresAlpha: true });
  if (e) {
    e.m.position.set(x, y, z);
    e.m.scale.setScalar(0.08 + ease(a * 2) * 0.16);
    setCols(e.u, ...cols);
    e.u.uAge.value = a;
    e.u.uA.value = 0.5 * (1 - a);
    e.u.uDis.value = 0.2 + a * 0.8;
    e.u.uNs.value.set(5, 5);
  }
  if (el === "ice" || el === "earth")
    for (let i = 0; i < 5; i++) {
      const t = (i / 5) * Math.PI * 2;
      X.crystal(
        "spike",
        x + Math.cos(t) * 0.2,
        y - 0.1,
        z + Math.sin(t) * 0.2,
        0.45,
        0.5,
        -t,
        1.1,
        a * 5,
        Math.max(0, a - 0.4) * 1.7,
        cols,
      );
    }
  else if (el === "fire" || el === "wood")
    for (let i = 0; i < 6; i++) {
      const p = X.use("cb-petal", SH.petal, {});
      if (!p) break;
      const t = (i / 6) * Math.PI * 2;
      p.m.position.set(x + Math.cos(t) * ease(a * 2) * 0.4, y, z + Math.sin(t) * ease(a * 2) * 0.4);
      p.m.rotation.set(0.6, -t, 0, "YXZ");
      p.m.scale.setScalar(0.35 * (1 - a * 0.5));
      setCols(p.u, ...cols);
      p.u.uAge.value = a;
      p.u.uDis.value = Math.max(0, a - 0.3);
    }
  else if (el === "wind") {
    const h = X.use("cb-helix", () => SH.helix(1.2, 1, 0.3, 1.5, 0.35), { soft: [0, 0, 0.3, 0.3] });
    if (h) {
      h.m.position.set(x, gy + 0.2, z);
      h.m.rotation.set(0, V.t * 8, 0);
      h.m.scale.set(0.3 + a * 0.6, 1.2, 0.3 + a * 0.6);
      setCols(h.u, ...cols);
      h.u.uAge.value = a;
      h.u.uA.value = 1 - a;
    }
  } else if (el === "water") {
    const d = X.use("cb-dome", SH.dome, { fres: 1.5, fresAlpha: true });
    if (d) {
      d.m.position.set(x, gy, z);
      d.m.scale.set(0.3 + a * 0.8, 0.5 + a * 0.3, 0.3 + a * 0.8);
      setCols(d.u, ...cols);
      d.u.uA.value = 1.2 * (1 - a);
      d.u.uDis.value = a * 0.7;
    }
  }
  X.shock(x, gy, z, 1.1, a, cols, 0.9);
  if (X.first(f)) {
    const [c1, c2] = ELCELL[el] ?? ["sao4", "sao4"];
    X.emit(10, (i) => {
      const t = Math.random() * 6.28,
        v = 1.5 + Math.random() * 2.5;
      return {
        cell: i % 2 ? c1 : c2,
        x,
        y,
        z,
        vx: Math.cos(t) * v,
        vy: 1 + Math.random() * 2.5,
        vz: Math.sin(t) * v,
        grav: 6,
        drag: 1.5,
        life: 0.5,
        size: 0.16,
        size1: 0.04,
        col: cols[0],
        col1: cols[1],
        spin: 8,
      };
    });
  }
  if (a < 0.35) X.flash(x, y, z, cols[1], (1 - a / 0.35) * 1.6, 1.1);
}
