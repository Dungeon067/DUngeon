import type { ObjType, Puzzle } from "../data/puzzles-schema";

/* Lõi câu đố nguyên tố (S23): không phụ thuộc DOM hay trạng thái game, để unit test. */

export interface PObj {
  pid: string;
  i: number;
  loai: string;
  def: ObjType;
  x: number;
  y: number;
  step: number;
  t: number;
  giay?: number;
  done: boolean;
  flash: number;
  /** Hồi giữa hai lần nhận đòn (giây), để đòn kéo dài như lướt không đếm nhiều bước một lúc. */
  cd: number;
  huong: Huong;
  /** Độ cao mặt ô đặt vật thể (bậc, như lớp `h` của bản đồ). */
  tang: number;
}
export type Huong = "n" | "s" | "e" | "w";

/**
 * Dữ liệu vẽ của một vật thể câu đố, không phụ thuộc renderer. Renderer 2D hiện tại và renderer 3D sau này
 * chỉ đọc dữ liệu này, không đọc trạng thái logic bên trong.
 */
export interface PObjView {
  id: string;
  cauDo: string;
  loai: string;
  /** Chỉ số trạng thái: 0 = ban đầu, `soTrangThai - 1` = đã xong; ở giữa là các bước của vật thể nhiều bước. */
  trangThai: number;
  soTrangThai: number;
  /** Tên trạng thái đọc được (`trangThai` trong content/puzzles.yaml: ban đầu hoặc đã xong). */
  nhan: string;
  xong: boolean;
  /** Ô lưới (110×110) và tọa độ thế giới (px). */
  o: { x: number; y: number };
  x: number;
  y: number;
  tang: number;
  huong: Huong;
  /** Nguyên tố của ký hiệu gợi ý và nguyên tố bước kế tiếp người chơi cần dùng. */
  bieuTuong: string;
  canNguyenTo: readonly string[];
  chan: boolean;
  nang: boolean;
  /** Thời gian còn lại của vật thể tự tắt, 0..1; `null` nếu không hẹn giờ. */
  henGio: number | null;
  /** Độ sáng khi vừa đổi trạng thái, 0..1. */
  loe: number;
}

export function objView(o: PObj, ts: number): PObjView {
  const n = o.def.buoc.length;
  return {
    id: `${o.pid}#${o.i}`,
    cauDo: o.pid,
    loai: o.loai,
    trangThai: o.done ? n : o.step,
    soTrangThai: n + 1,
    nhan: o.def.trangThai[o.done ? 1 : 0]!,
    xong: o.done,
    o: { x: Math.floor(o.x / ts), y: Math.floor(o.y / ts) },
    x: o.x,
    y: o.y,
    tang: o.tang,
    huong: o.huong,
    bieuTuong: o.def.bieuTuong,
    canNguyenTo: o.done ? [] : o.def.buoc[o.step]!,
    chan: !!o.def.chan && !o.done,
    nang: !!o.def.nang && o.done,
    henGio: o.giay ? (o.done ? Math.max(0, o.t) / o.giay : 0) : null,
    loe: o.flash,
  };
}
export interface PState {
  id: string;
  p: Puzzle;
  x: number;
  y: number;
  objs: PObj[];
  solved: boolean;
  near: number;
  hinted: boolean;
}
export type HitRes = "adv" | "done" | "reset" | "refresh" | null;
export interface PulseEvent {
  st: PState;
  o: PObj;
  res: HitRes;
  el: string;
  react?: string;
}

/** Tạo trạng thái câu đố tại tâm (px). `solved` = đã giải trong save, mọi vật thể ở trạng thái cuối. */
export function makeState(
  p: Puzzle,
  L: Record<string, ObjType>,
  x: number,
  y: number,
  ts: number,
  solved = false,
  tangAt: (x: number, y: number) => number = () => 0,
) {
  const objs: PObj[] = p.vatThe.map((v, i) => {
    const def = L[v.loai]!;
    return {
      pid: p.id,
      i,
      loai: v.loai,
      def,
      x: x + v.dx * ts,
      y: y + v.dy * ts,
      step: solved ? def.buoc.length : 0,
      t: 0,
      giay: v.giay,
      done: solved,
      flash: 0,
      cd: 0,
      huong: v.huong ?? "s",
      tang: tangAt(Math.floor((x + v.dx * ts) / ts), Math.floor((y + v.dy * ts) / ts)),
    };
  });
  return { id: p.id, p, x, y, objs, solved, near: 0, hinted: false } as PState;
}

const has = (a: readonly string[], e: string) => a.includes(e);

function finish(o: PObj) {
  o.step = o.def.buoc.length;
  o.done = true;
  o.t = o.giay ?? 0;
  o.flash = 1;
}
function reset(o: PObj) {
  o.step = 0;
  o.done = false;
  o.t = 0;
}

/** Một đòn nguyên tố chạm vật thể. */
export function hitObj(o: PObj, el: string): HitRes {
  if (!el) return null;
  if (has(o.def.tat, el) && o.step > 0) {
    reset(o);
    return "reset";
  }
  if (o.done) {
    const last = o.def.buoc[o.def.buoc.length - 1]!;
    if (o.giay && has(last, el)) {
      o.t = o.giay;
      return "refresh";
    }
    return null;
  }
  if (!has(o.def.buoc[o.step]!, el)) return null;
  o.step++;
  o.flash = 1;
  if (o.step >= o.def.buoc.length) {
    finish(o);
    return "done";
  }
  return "adv";
}

/** Tên phản ứng hiển thị khi vật thể chuyển bước bằng nguyên tố thứ hai (dùng tên phản ứng đã có trong game). */
export function reactName(o: PObj, el: string): string | undefined {
  if (o.def.buoc.length > 1 && o.step === o.def.buoc.length) {
    const prev = o.def.buoc[o.step - 2]!;
    if (has(prev, "water") && el === "fire") return "Bốc Hơi";
    if (has(prev, "fire") && el === "wind") return "Khuếch Tán";
  }
  if (o.loai === "bangChan" && el === "fire" && o.done) return "Tan Chảy";
  if (o.loai === "bangMat" && el === "ice" && o.done) return "Đóng Băng";
  if (o.loai === "loiTru" && el === "bolt" && o.done) return "Quá Tải";
  return undefined;
}

export const HIT_CD = 0.3;
const solvedNow = (st: PState) => st.objs.every((o) => o.done);

/** Xung nguyên tố tại (x, y) bán kính r: chạm mọi vật thể trong vùng, lan lửa bằng gió, đánh dấu câu đố vừa giải. */
export function pulse(states: PState[], x: number, y: number, r: number, el: string): PulseEvent[] {
  const ev: PulseEvent[] = [];
  if (!el) return ev;
  for (const st of states) {
    if (st.solved) continue;
    for (const o of st.objs) {
      if (o.cd > 0 || Math.hypot(o.x - x, o.y - y) > r + 22) continue;
      const res = hitObj(o, el);
      if (!res) continue;
      o.cd = HIT_CD;
      ev.push({ st, o, res, el, react: res === "done" ? reactName(o, el) : undefined });
      if (el === "wind" && o.done && o.def.lan) {
        // Lửa lan dây chuyền: đèn vừa bùng sáng thổi tiếp sang đèn kế bên trong tầm `lan`.
        const q = [o];
        while (q.length) {
          const s = q.shift()!;
          for (const n of st.objs)
            if (n.loai === o.loai && !n.done && Math.hypot(n.x - s.x, n.y - s.y) <= o.def.lan) {
              finish(n);
              n.cd = HIT_CD;
              q.push(n);
              ev.push({ st, o: n, res: "done", el, react: "Khuếch Tán" });
            }
        }
      }
    }
    if (solvedNow(st)) st.solved = true;
  }
  return ev;
}

/** Đếm giờ vật thể tự tắt. Trả về true nếu có vật thể vừa về trạng thái đầu. */
export function tickPuzzle(st: PState, dt: number): boolean {
  let off = false;
  for (const o of st.objs) {
    o.flash = Math.max(0, o.flash - dt * 2);
    o.cd = Math.max(0, o.cd - dt);
    if (st.solved || !o.done || !o.giay) continue;
    o.t -= dt;
    if (o.t <= 0) {
      reset(o);
      off = true;
    }
  }
  return off;
}

/** Vật thể còn chắn đường. */
export const blocking = (o: PObj) => o.def.chan && !o.done;
