/**
 * S27: cất vũ khí ngoài trận và rút lại khi đánh.
 *  cất: (đứng yên) chạy clip cất, tới mốc `luc` vũ khí chuyển sang chỗ đeo (lưng / hông) rồi trượt vào vị trí;
 *       giữ `giu` giây rồi tan thành hạt sáng theo màu nguyên tố.
 *  rút: hiện ngay trong tay ở khung đầu, hạt sáng tụ nhanh quanh vũ khí (không làm chậm đòn).
 */
import * as THREE from "three";
import type { VRM } from "@pixiv/three-vrm";
import type { VuKhiCfg } from "../../data/poses-schema";

type St = "hand" | "stowing" | "worn" | "fading" | "gone";
const D = Math.PI / 180;

export class WeaponFx {
  st: St = "hand";
  /** Clip cất đang chạy (renderer ưu tiên phát), null nếu không. */
  clip: string | null = null;
  color = new THREE.Color("#ffffff");
  private t = 0;
  private handPos: THREE.Vector3;
  private handQuat: THREE.Quaternion;
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
  ) {
    this.hand = holder.parent!;
    this.handPos = holder.position.clone();
    this.handQuat = holder.quaternion.clone();
    this.handScale = holder.scale.clone();
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
          "uniform vec3 uC; varying float vA; void main(){ vec2 d=gl_PointCoord-0.5; float r=1.0-smoothstep(0.1,0.5,length(d)); if(vA<=0.0||r<=0.0) discard; gl_FragColor=vec4(mix(uC,vec3(1.0),0.45*r)*1.6, r*vA); }",
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.pts.frustumCulled = false;
  }
  private noi: VuKhiCfg["noi"]["sword"];

  /** Đặt trạng thái mong muốn mỗi khung. standing: đang đứng yên (mới chạy clip cất). */
  want(out: boolean, standing: boolean, scene: THREE.Object3D | null) {
    if (scene && this.pts.parent !== scene) scene.add(this.pts);
    if (out) {
      if (this.st !== "hand") this.draw();
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
  private draw() {
    const wasVisible = this.st === "hand" || this.st === "stowing";
    this.hand.add(this.holder);
    this.holder.position.copy(this.handPos);
    this.holder.quaternion.copy(this.handQuat);
    this.holder.scale.copy(this.handScale);
    this.holder.visible = true;
    this.st = "hand";
    this.clip = null;
    this.slide = 1;
    if (!wasVisible) this.burst(true);
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
    if (this.st === "stowing") {
      const at = this.clip ? this.noi.luc * this.clipDur(this.clip) : 0;
      if (this.t >= at && this.holder.parent === this.hand) {
        this.toSocket();
        this.st = "worn";
        this.t = 0;
      }
    } else if (this.st === "worn") {
      if (this.clip && this.t > this.clipDur(this.clip) * (1 - this.noi.luc)) this.clip = null;
      if (this.t >= this.cfg.giu) {
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
    if (this.slide < 1 && this.holder.parent === this.sock) {
      this.slide = Math.min(1, this.slide + dt / 0.22);
      const e = 1 - (1 - this.slide) ** 3;
      this.holder.position.lerpVectors(this.fromPos, this.sockPos, e);
      this.holder.quaternion.slerpQuaternions(this.fromQuat, this.sockQuat, e);
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
