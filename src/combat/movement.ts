/**
 * Máy trạng thái di chuyển (hợp nhất A). Chuyển thể ý tưởng và thông số từ
 * Wafflus/unity-genshin-impact-movement-system (MIT, © 2022 Gustavo Vieira):
 * Idle → Walk/Run/Sprint → Stop nhẹ/vừa/mạnh → Dash (giới hạn liên tiếp + hồi) → Fall → Land nhẹ/lăn/nặng.
 * Thuần logic, không phụ thuộc renderer; thông số ở content/movement.yaml.
 */
import raw from "../../content/movement.yaml";
import { MoveSchema, type MoveCfg } from "../data/hop-nhat-schema";

export const MOVE: MoveCfg = MoveSchema.parse(raw);

export type MoveState =
  | "idle"
  | "walk"
  | "run"
  | "sprint"
  | "dash"
  | "stopLight"
  | "stopMedium"
  | "stopHard"
  | "fall"
  | "landLight"
  | "landRoll"
  | "landHard";

export interface MoveInput {
  /** Độ nghiêng cần (0..1). */
  len: number;
  /** Giữ phím đi bộ. */
  walk?: boolean;
  /** Giữ phím chạy nhanh. */
  sprint?: boolean;
  /** Đang trên không (do logic nhảy / rơi quyết định). */
  air?: boolean;
  /** Hết thể lực: bỏ thời gian ân hạn chạy nhanh. */
  tired?: boolean;
}

const STOP: Record<string, MoveState> = { walk: "stopLight", run: "stopMedium", sprint: "stopHard", dash: "stopHard" };
const LAND = new Set<MoveState>(["landLight", "landRoll", "landHard"]);
export const isStop = (s: MoveState) => s === "stopLight" || s === "stopMedium" || s === "stopHard";
export const isLand = (s: MoveState) => LAND.has(s);

export class MoveFSM {
  st: MoveState = "idle";
  /** Giây trong trạng thái hiện tại. */
  t = 0;
  /** Tốc độ mặt phẳng hiện tại (px/s). */
  v = 0;
  private sprintOff = 0;
  private startT = 0;
  /** Còn bao nhiêu giây pivot (quay đầu gấp). */
  pivotT = 0;
  private dashN = 0;
  private dashLast = -99;
  private now = 0;
  /** Còn bao nhiêu giây hồi lướt (sau khi lướt quá giới hạn liên tiếp). */
  dashCd = 0;
  constructor(private C: MoveCfg = MOVE) {}

  private go(s: MoveState) {
    if (s !== this.st) {
      this.st = s;
      this.t = 0;
    }
  }
  /** Xin lướt. Tối đa `lienTiep` lần, mỗi lần cách nhau < `cuaSo` giây; vượt thì khóa `hoi` giây. */
  tryDash(): boolean {
    const L = this.C.luot;
    if (this.dashCd > 0) return false;
    if (this.now - this.dashLast >= L.cuaSo) this.dashN = 0;
    this.dashN++;
    this.dashLast = this.now;
    if (this.dashN >= L.lienTiep) {
      this.dashN = 0;
      this.dashCd = L.hoi;
    }
    this.go("dash");
    this.v = this.C.toc.coSo * this.C.toc.luot;
    return true;
  }
  /** Tiếp đất sau khi rơi `dropM` mét. */
  land(dropM: number, moving: boolean): MoveState {
    const s: MoveState = dropM < this.C.roi.nangTu ? "landLight" : moving ? "landRoll" : "landHard";
    this.go(s);
    if (s === "landHard") this.v = 0;
    return s;
  }
  /** Giới hạn tốc độ rơi (đơn vị tùy ý, `perM` đơn vị mỗi mét). */
  limitFall(vz: number, perM: number) {
    return Math.max(vz, -this.C.roi.gioiHan * perM);
  }
  /**
   * Bước xoay người về hướng đích (d = góc lệch, rad). Đang chạy mà lệch quá `quay.goc` thì pivot:
   * hãm tốc độ, xoay nhanh trên chân trụ thay vì xoay cả người như tượng.
   */
  turn(d: number, dt: number) {
    const Q = this.C.muot.quay;
    if (
      this.pivotT <= 0 &&
      Math.abs(d) > (Q.goc * Math.PI) / 180 &&
      (this.st === "walk" || this.st === "run" || this.st === "sprint")
    ) {
      this.pivotT = Q.t;
      this.v *= Q.giu;
    }
    return d * turnK(dt, this.pivotT > 0 ? Q.t : this.C.xoay);
  }
  /** Tốc độ đích theo trạng thái di chuyển. */
  speedOf(s: MoveState) {
    const T = this.C.toc;
    return s === "walk" ? T.coSo * T.di : s === "run" ? T.coSo * T.chay : s === "sprint" ? T.coSo * T.chayNhanh : 0;
  }
  update(dt: number, inp: MoveInput): { st: MoveState; v: number } {
    const C = this.C;
    this.now += dt;
    this.t += dt;
    this.dashCd = Math.max(0, this.dashCd - dt);
    this.pivotT = Math.max(0, this.pivotT - dt);
    if (inp.air) {
      // Trên không, vận tốc ngang do logic nhảy quyết định: không giữ tốc độ mặt đất để khỏi trượt khi đáp.
      if (this.st !== "dash" || this.t >= C.luot.thoiGian) {
        this.go("fall");
        this.v = 0;
      }
      return { st: this.st, v: this.v };
    }
    if (this.st === "fall") this.land(0, inp.len > 0.15);
    if (this.st === "dash") {
      if (this.t < C.luot.thoiGian) return { st: this.st, v: this.v };
      // Hết lướt: còn giữ hướng thì vào chạy nhanh (như bản gốc), nhả thì dừng mạnh.
      this.go(inp.len > 0.15 ? "sprint" : "stopHard");
      this.sprintOff = 0;
    }
    if (isLand(this.st)) {
      const k = this.st === "landLight" ? C.dat.nhe : this.st === "landRoll" ? C.dat.lan : C.dat.nang;
      if (this.t < k && !(this.st === "landLight" && inp.len > 0.15)) {
        if (this.st === "landRoll") this.v = this.speedOf("run");
        return { st: this.st, v: this.st === "landHard" ? 0 : this.v };
      }
      this.go("idle");
    }
    const moving = inp.len > 0.15;
    if (moving) {
      let want: MoveState = inp.walk || inp.len < C.toc.diNguong ? "walk" : "run";
      if (inp.sprint) {
        want = "sprint";
        this.sprintOff = 0;
      } else if (this.st === "sprint" && !inp.tired) {
        this.sprintOff += dt;
        if (this.sprintOff < C.toc.nhaChayNhanh) want = "sprint";
      }
      // Khởi động từ đứng yên / đang dừng: vài khung đầu tốc độ thấp (dồn trọng tâm, bước đầu ngắn).
      if (this.st === "idle" || isStop(this.st) || isLand(this.st))
        this.startT = this.v < C.toc.coSo * 0.3 ? C.muot.batDau.t : 0;
      this.go(want);
      let tgt = this.speedOf(want);
      if (this.startT > 0) {
        this.startT -= dt;
        tgt *= C.muot.batDau.k;
      }
      // Đổi tốc độ mượt (gia tốc ~0,15 s), không giật.
      this.v += (tgt - this.v) * Math.min(1, dt * 7);
      return { st: this.st, v: this.v };
    }
    if (STOP[this.st]) this.go(STOP[this.st]);
    if (isStop(this.st)) {
      const S = this.st === "stopLight" ? C.dung.nhe : this.st === "stopMedium" ? C.dung.vua : C.dung.manh;
      this.v *= Math.exp(-S.ham * dt);
      if (this.t >= S.toiDa || this.v < C.toc.coSo * 0.1) {
        this.v = 0;
        this.go("idle");
      }
      return { st: this.st, v: this.v };
    }
    this.v = 0;
    this.go("idle");
    return { st: "idle", v: 0 };
  }
}

const FSMS = new WeakMap<object, MoveFSM>();
/** Máy trạng thái gắn với một đối tượng người chơi (không lưu vào save). */
export function fsmOf(p: object) {
  let f = FSMS.get(p);
  if (!f) FSMS.set(p, (f = new MoveFSM()));
  return f;
}

/** Clip cho trạng thái (null = để renderer chọn thế đứng). `mv` = bộ clip di chuyển theo vũ khí nếu có. */
export function moveClip(
  s: MoveState,
  mv?: { walk?: string; run?: string; sprint?: string; stop?: string },
): { k: string; speed?: number } | null {
  if (s === "idle") return null;
  const c = MOVE.clip[s];
  const k =
    s === "walk"
      ? (mv?.walk ?? c.tam)
      : s === "run"
        ? (mv?.run ?? c.tam)
        : s === "sprint"
          ? (mv?.sprint ?? c.tam)
          : isStop(s)
            ? (mv?.stop ?? c.tam)
            : c.tam;
  return { k, speed: c.toc };
}
/** Clip còn thiếu (đang dùng tạm clip gần nhất). */
export const missingClips = () =>
  Object.entries(MOVE.clip)
    .filter(([, c]) => c.can)
    .map(([s, c]) => ({ state: s, need: c.can!, temp: c.tam }));
/** Hệ số nội suy mũ để xoay tới hướng đích ~95% trong `MOVE.xoay` giây. */
export const turnK = (dt: number, reach = MOVE.xoay) => 1 - Math.exp((-3 * dt) / reach);

/** Tốc độ của từng clip trong blend 1D (đi, chạy, chạy nhanh). */
export const locoSpeeds = (C: MoveCfg = MOVE) => [C.toc.di, C.toc.chay, C.toc.chayNhanh].map((k) => k * C.toc.coSo);
/** Trọng số blend 1D theo tốc độ: nội suy tuyến tính giữa hai clip kề nhau, tổng = 1. */
export function locoWeights(sp: number[], v: number) {
  const w = sp.map(() => 0);
  if (v <= sp[0]) w[0] = 1;
  else if (v >= sp[sp.length - 1]) w[sp.length - 1] = 1;
  else
    for (let i = 0; i < sp.length - 1; i++)
      if (v <= sp[i + 1]) {
        const k = (v - sp[i]) / (sp[i + 1] - sp[i]);
        w[i] = 1 - k;
        w[i + 1] = k;
        break;
      }
  return w;
}
/** Lò xo giảm chấn (tanSo Hz, giam < 1 thì có quá đà). Chia bước nhỏ để ổn định khi khung chậm. */
export class Spring {
  x = 0;
  v = 0;
  step(dt: number, target: number, hz: number, zeta: number) {
    const w = 2 * Math.PI * hz,
      n = Math.max(1, Math.ceil(dt / (1 / 120)));
    for (let i = 0; i < n; i++) {
      const h = dt / n;
      this.v += (w * w * (target - this.x) - 2 * zeta * w * this.v) * h;
      this.x += this.v * h;
    }
    return this.x;
  }
}
