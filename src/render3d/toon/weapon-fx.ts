/**
 * S27: cất vũ khí ngoài trận và rút lại khi đánh.
 *  cất: (đứng yên) chạy clip cất, tới mốc `luc` vũ khí chuyển sang chỗ đeo rồi bay vào vị trí theo vòng cung
 *       đi lên và ra sau lưng (SLIDE giây, không tụt xuống thấp); giữ `giu` giây rồi tan thành hạt sáng theo màu nguyên tố.
 *  Sách phép: lơ lửng mở trang trước tay trái, lật trang khi niệm; cất thì gập lại, lơ lửng sau hông, lắc nhẹ.
 *  rút: hiện ngay trong tay ở khung đầu, hạt sáng tụ nhanh quanh vũ khí (không làm chậm đòn).
 */
import * as THREE from "three";
import type { VRM } from "@pixiv/three-vrm";
import type { VuKhiCfg } from "../../data/poses-schema";
import { setWorldQuat } from "./ik";
import { BookFloat } from "../vfx/book-float";

type St = "hand" | "stowing" | "worn" | "fading" | "gone";
const D = Math.PI / 180;
const SLIDE = 0.25;
/** Sách mở: bìa trước xoay quanh gáy. */
const OPEN = -150 * D;
/** Neo sách so với gốc nhân vật (+X trái, +Z trước; y so với ngực), đơn vị m ở tỉ lệ 1. */
const BOOK = { x: 0.42, y: -0.05, z: 0.3 };

export class WeaponFx {
  st: St = "hand";
  /** Clip cất đang chạy (renderer ưu tiên phát), null nếu không. */
  clip: string | null = null;
  color = new THREE.Color("#ffffff");
  private t = 0;
  handPos: THREE.Vector3;
  handQuat: THREE.Quaternion;
  private handScale: THREE.Vector3;
  private hand: THREE.Object3D;
  private sock: THREE.Object3D | null;
  private sockPos = new THREE.Vector3();
  private sockQuat = new THREE.Quaternion();
  private sockScale = new THREE.Vector3();
  private slide = 1;
  private fromPos = new THREE.Vector3();
  private fromQuat = new THREE.Quaternion();
  private pts: THREE.Points;
  private pp: Float32Array;
  private pv: Float32Array;
  private pl: Float32Array;
  private pa: Float32Array;
  private gather: THREE.Vector3[] = [];

  constructor(
    vrm: VRM,
    private holder: THREE.Object3D,
    wtype: string,
    private cfg: VuKhiCfg,
    private clipDur: (n: string) => number,
    gripScale: number,
    private root: THREE.Object3D | null = null,
  ) {
    this.cat = wtype === "cat";
    this.v0 = vrm.meta?.metaVersion === "0";
    this.hand = holder.parent!;
    this.handPos = holder.position.clone();
    this.handQuat = holder.quaternion.clone();
    this.handScale = holder.scale.clone();
    this.chest = vrm.humanoid.getNormalizedBoneNode("chest") ?? null;
    this.floatQuat.copy(this.handQuat);
    if (this.v0)
      this.floatQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI));
    if (this.cat) this.rigBook();
    const noi = cfg.noi[wtype as keyof VuKhiCfg["noi"]];
    this.sock = vrm.humanoid.getNormalizedBoneNode(noi.bone as any) ?? null;
    if (this.sock) {
      const bs = this.sock.getWorldScale(new THREE.Vector3()).x || 1;
      this.sockPos.fromArray(noi.pos).divideScalar(bs);
      this.sockQuat.setFromEuler(new THREE.Euler(noi.rot[0] * D, noi.rot[1] * D, noi.rot[2] * D));
      if (vrm.meta?.metaVersion === "0") {
        this.sockPos.set(-this.sockPos.x, this.sockPos.y, -this.sockPos.z);
        this.sockQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI));
      }
      this.sockScale.setScalar(gripScale / bs);
      this.sockBs = bs;
    }
    this.noi = noi;
    const n = cfg.hat.so * 2;
    this.pp = new Float32Array(n * 3);
    this.pv = new Float32Array(n * 3);
    this.pl = new Float32Array(n);
    this.pa = new Float32Array(n);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.pp, 3));
    g.setAttribute("a", new THREE.BufferAttribute(this.pa, 1));
    this.pts = new THREE.Points(
      g,
      new THREE.ShaderMaterial({
        uniforms: { uC: { value: this.color }, uS: { value: cfg.hat.coDo * 900 } },
        vertexShader:
          "attribute float a; varying float vA; uniform float uS; void main(){ vA=a; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=uS*a/-mv.z; gl_Position=projectionMatrix*mv; }",
        fragmentShader:
          "uniform vec3 uC; varying float vA; void main(){ vec2 d=gl_PointCoord-0.5; float r=1.0-smoothstep(0.1,0.5,length(d)); if(vA<=0.0||r<=0.0) discard; gl_FragColor=vec4(mix(uC,vec3(1.0),0.3*r*r)*1.15, r*vA); }",
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    );
    this.pts.frustumCulled = false;
  }
  private noi: VuKhiCfg["noi"]["sword"];
  private cat = false;
  private v0 = false;
  private sockBs = 1;
  private floatQuat = new THREE.Quaternion();
  private cover: THREE.Object3D | null = null;
  private page: THREE.Object3D | null = null;
  private openK = 0;
  private flip = 0;

  /** Tách bìa trước (kèm góc bọc, huy hiệu) và thêm một tờ lật, cùng xoay quanh gáy sách. */
  private rigBook() {
    const w = this.holder.children[0];
    if (!w) return;
    const parts = ["cover_f", "emblem", "emblem_c", "corner-1-1", "corner-11", "corner1-1", "corner11"]
      .map((n) => w.getObjectByName(n))
      .filter((o): o is THREE.Object3D => !!o);
    const pages = w.getObjectByName("pages") as THREE.Mesh | undefined;
    if (!parts.length) return;
    const hinge = new THREE.Vector3(-0.18, 0, 0.05);
    const pv = new THREE.Group();
    pv.position.copy(hinge);
    w.add(pv);
    for (const o of parts) {
      o.position.sub(hinge);
      pv.add(o);
    }
    this.cover = pv;
    if (pages?.isMesh) {
      const g = new THREE.PlaneGeometry(0.33, 0.45).translate(0.175, 0, 0);
      const m = (pages.material as THREE.Material).clone();
      m.side = THREE.DoubleSide;
      const pg = new THREE.Group();
      pg.position.set(-0.18, 0, 0.042);
      pg.add(new THREE.Mesh(g, m));
      pg.visible = false;
      w.add(pg);
      this.page = pg;
    }
  }

  private book(dt: number) {
    const want = this.st === "hand" ? 1 : 0;
    this.openK += (want - this.openK) * Math.min(1, dt * (want ? 9 : 12));
    const e = this.openK * this.openK * (3 - 2 * this.openK);
    if (this.cover) this.cover.rotation.y = OPEN * e;
    if (!this.page) return;
    // Lật trang: chậm khi chờ, nhanh khi đang niệm (pháp khí bay vòng).
    this.flip += dt * (this.orbit ? 2.2 : 0.55);
    const ph = this.flip % 1;
    const k = ph < 0.45 ? 0 : Math.min(1, (ph - 0.45) / 0.4);
    this.page.visible = this.openK > 0.9 && k > 0 && k < 1;
    this.page.rotation.y = OPEN * 0.97 * k * k * (3 - 2 * k);
  }
  /** Pháp khí: đang niệm (renderer đặt mỗi khung); sách lật trang nhanh hơn. */
  orbit = false;
  private bf = new BookFloat();
  private bfReset = true;
  private chest: THREE.Object3D | null = null;
  private kickIn = -1;
  private kickS = 1;

  /** Pháp khí: mỗi lần ra đòn gọi một lần; sách giật lùi lúc phép bay ra (sau `tre` giây). */
  cast(s = 1, tre = 0.16) {
    this.kickIn = tre;
    this.kickS = s;
  }

  /**
   * Sách bay độc lập (S30 `BookFloat`): neo theo thân (cạnh vai trái, phía trước), không theo xương tay,
   * đuổi theo bằng lò xo giảm chấn nên trễ khi chạy hoặc lướt; quay mặt về hướng nhân vật nhìn.
   */
  private float(dt: number) {
    if (!this.root) return;
    const rq = this.root.getWorldQuaternion(new THREE.Quaternion()),
      sc = this.root.getWorldScale(new THREE.Vector3()).y;
    const base = this.root.getWorldPosition(new THREE.Vector3());
    const h = this.chest ? this.chest.getWorldPosition(new THREE.Vector3()).y - base.y : 1.15 * sc;
    const anchor = base.add(new THREE.Vector3(BOOK.x, 0, BOOK.z).multiplyScalar(sc).applyQuaternion(rq));
    anchor.y += h + BOOK.y * sc;
    const yaw = new THREE.Euler().setFromQuaternion(rq, "YXZ").y;
    if (this.bfReset) {
      this.bf.reset(anchor, yaw);
      this.bfReset = false;
    }
    if (this.kickIn >= 0 && (this.kickIn -= dt) < 0) {
      this.bf.kick(new THREE.Vector3(0, 0, 1).applyQuaternion(rq), this.kickS);
      this.kickIn = -1;
    }
    this.bf.update(dt, anchor, yaw);
    this.holder.position.copy(this.hand.worldToLocal(this.bf.pos.clone()));
    setWorldQuat(this.holder, this.bf.quat.clone().multiply(this.floatQuat));
  }
  private t2 = 0;

  /** Đặt trạng thái mong muốn mỗi khung. standing: đang đứng yên (mới chạy clip cất). */
  want(out: boolean, standing: boolean, scene: THREE.Object3D | null, idle = standing) {
    if (scene && this.pts.parent !== scene) scene.add(this.pts);
    if (out) {
      if (this.st !== "hand") this.draw(idle);
      return;
    }
    if (this.st === "hand") {
      this.st = "stowing";
      this.t = 0;
      const c = this.noi.clip;
      this.clip = c && standing ? c : null;
    }
  }

  private toSocket() {
    if (!this.sock) return;
    this.holder.updateWorldMatrix(true, false);
    this.sock.attach(this.holder);
    this.fromPos.copy(this.holder.position);
    this.fromQuat.copy(this.holder.quaternion);
    this.holder.scale.copy(this.sockScale);
    this.slide = 0;
  }

  /** Rút ngay về tay ở khung này, hạt sáng tụ lại quanh vũ khí. */
  private draw(idle = false) {
    const wasVisible = this.st === "hand" || this.st === "stowing";
    this.hand.add(this.holder);
    this.holder.position.copy(this.handPos);
    this.holder.quaternion.copy(this.handQuat);
    this.holder.scale.copy(this.handScale);
    this.holder.visible = true;
    this.st = "hand";
    this.clip = null;
    this.slide = 1;
    this.bfReset = true;
    this.t = 0;
    if (!wasVisible) {
      this.burst(true);
      if (idle && this.noi.rut) this.clip = this.noi.rut;
    }
  }

  /** Đang phát clip rút: xoay vũ khí trong tay (xoay kiếm, quay thương). */
  private twirl() {
    const d = this.clipDur(this.clip!);
    if (this.t >= d) {
      this.clip = null;
      if (!this.cat) this.holder.quaternion.copy(this.handQuat);
      return;
    }
    const x = this.noi.xoay;
    if (!x || this.cat) return;
    const u = THREE.MathUtils.clamp((this.t / d - x[0]) / Math.max(1e-3, x[1] - x[0]), 0, 1);
    const e = u * u * (3 - 2 * u);
    const ax = new THREE.Vector3(
      this.noi.truc === "x" ? 1 : 0,
      this.noi.truc === "y" ? 1 : 0,
      this.noi.truc === "z" || !this.noi.truc ? 1 : 0,
    );
    this.holder.quaternion
      .copy(this.handQuat)
      .multiply(new THREE.Quaternion().setFromAxisAngle(ax, e * x[2] * Math.PI * 2));
  }

  private sample(n: number) {
    const out: THREE.Vector3[] = [];
    const ms: THREE.Mesh[] = [];
    this.holder.updateWorldMatrix(true, true);
    this.holder.traverse((o: any) => o.isMesh && o.geometry?.attributes.position && !o.material?.side && ms.push(o));
    if (!ms.length) this.holder.traverse((o: any) => o.isMesh && ms.push(o));
    for (let i = 0; i < n && ms.length; i++) {
      const m = ms[i % ms.length],
        pa = m.geometry.attributes.position as THREE.BufferAttribute;
      out.push(
        new THREE.Vector3().fromBufferAttribute(pa, Math.floor(Math.random() * pa.count)).applyMatrix4(m.matrixWorld),
      );
    }
    return out;
  }

  /** Bắn hạt: tan (bay ra, mờ dần) hoặc tụ (từ ngoài bay vào điểm trên vũ khí). */
  private burst(inward: boolean) {
    const n = this.cfg.hat.so,
      P = this.sample(n),
      bay = this.cfg.hat.bay,
      life = inward ? this.cfg.hien * 1.6 : this.cfg.tan + 0.4;
    for (let k = 0; k < P.length; k++) {
      let i = 0;
      while (i < this.pl.length - 1 && this.pl[i] > 0) i++;
      const d = new THREE.Vector3(Math.random() - 0.5, Math.random() * 0.8 + 0.2, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(bay * (0.4 + Math.random() * 0.8));
      const p = inward ? P[k].clone().addScaledVector(d, life * 0.9) : P[k];
      if (inward) d.multiplyScalar(-1);
      this.pp.set([p.x, p.y, p.z], i * 3);
      this.pv.set([d.x, d.y, d.z], i * 3);
      this.pl[i] = life * (0.6 + Math.random() * 0.4);
    }
  }

  update(dt: number) {
    this.t += dt;
    if (this.st === "hand" && !this.cat && this.holder.parent === this.hand) {
      this.holder.position.copy(this.handPos);
      this.holder.quaternion.copy(this.handQuat);
    }
    if (this.st === "hand" && this.clip) this.twirl();
    if (this.cat && this.st === "hand") this.float(dt);
    if (this.cat) this.book(dt);
    if (this.st === "stowing") {
      const at = this.clip ? this.noi.luc * this.clipDur(this.clip) : 0;
      if (this.t >= at && this.holder.parent === this.hand) {
        this.toSocket();
        this.st = "worn";
        this.t = 0;
      }
    } else if (this.st === "worn") {
      if (this.clip && this.t > this.clipDur(this.clip) * (1 - this.noi.luc)) this.clip = null;
      if (this.t >= (this.noi.giu ?? this.cfg.giu)) {
        this.st = "fading";
        this.t = 0;
        this.burst(false);
      }
    } else if (this.st === "fading") {
      const k = Math.min(1, this.t / this.cfg.tan);
      this.holder.scale.copy(this.sockScale).multiplyScalar(Math.max(0.001, 1 - k * k));
      if (this.t < this.cfg.tan * 0.7 && Math.random() < dt * 30) this.burst(false);
      if (k >= 1) {
        this.holder.visible = false;
        this.st = "gone";
        this.clip = null;
      }
    }
    if (this.holder.parent === this.sock && (this.slide < 1 || this.cat)) {
      this.slide = Math.min(1, this.slide + dt / SLIDE);
      const e = 1 - (1 - this.slide) ** 3;
      this.holder.position.lerpVectors(this.fromPos, this.sockPos, e);
      // Vòng cung đi lên và ra sau lưng (hệ xương ở tư thế chữ T: +Y lên, -Z sau; VRM0 đảo trục Z).
      const arc = Math.sin(Math.PI * this.slide) / this.sockBs;
      this.holder.position.y += 0.12 * arc;
      this.holder.position.z += (this.v0 ? 0.1 : -0.1) * arc;
      this.holder.quaternion.slerpQuaternions(this.fromQuat, this.sockQuat, e);
      if (this.cat) {
        // Sách lơ lửng sau hông: nhấp nhô và lắc nhẹ, không tụt xuống.
        const t = (this.t2 += dt);
        this.holder.position.y += (0.012 * Math.sin(t * 2.4) * e) / this.sockBs;
        this.holder.rotateZ(0.06 * Math.sin(t * 1.7) * e);
      }
    }
    // Hạt sáng.
    let any = false;
    for (let i = 0; i < this.pl.length; i++) {
      if (this.pl[i] <= 0) {
        this.pa[i] = 0;
        continue;
      }
      any = true;
      this.pl[i] -= dt;
      for (let j = 0; j < 3; j++) this.pp[i * 3 + j] += this.pv[i * 3 + j] * dt;
      this.pa[i] = Math.min(1, this.pl[i] * 3);
    }
    this.pts.visible = any;
    if (any) {
      this.pts.geometry.attributes.position.needsUpdate = true;
      this.pts.geometry.attributes.a.needsUpdate = true;
    }
  }

  dispose() {
    this.pts.removeFromParent();
    this.pts.geometry.dispose();
    (this.pts.material as THREE.Material).dispose();
  }
}
