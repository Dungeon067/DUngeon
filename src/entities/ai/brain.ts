/**
 * AI 3 tầng: biết (cảm nhận) – quyết (cây quyết định) – làm (module hành động). Khung, chưa gắn vào quái.
 * Kiến trúc theo 526077247/GenshinGamePlay (MIT, © 2023 大大的奥斯卡), viết lại bằng TypeScript.
 */
export interface Sense {
  /** Khoảng cách tới mục tiêu gần nhất (Infinity nếu không thấy). */
  dist: number;
  hpPct: number;
  skillReady: boolean;
}
export type Behavior = "dungYen" | "tuanTra" | "tiepCan" | "danhThuong" | "dungChieu" | "rutLui";
export type DecisionNode =
  | { la: Behavior }
  | {
      neu: { truong: keyof Sense; op: "<" | ">" | "=="; giaTri: number | boolean };
      dung: DecisionNode;
      sai: DecisionNode;
    };

/** Tầng 1: cảm nhận từ thế giới. */
export function perceive(
  self: { x: number; y: number; hp: number; maxHp: number; cd: number; tamNhin: number },
  targets: { x: number; y: number }[],
): Sense {
  let d = Infinity;
  for (const t of targets) d = Math.min(d, Math.hypot(t.x - self.x, t.y - self.y));
  return { dist: d > self.tamNhin ? Infinity : d, hpPct: self.hp / self.maxHp, skillReady: self.cd <= 0 };
}
/** Tầng 2: duyệt cây quyết định. */
export function decide(n: DecisionNode, s: Sense): Behavior {
  while (!("la" in n)) {
    const v = s[n.neu.truong],
      g = n.neu.giaTri;
    const ok =
      n.neu.op === "<" ? (v as number) < (g as number) : n.neu.op === ">" ? (v as number) > (g as number) : v === g;
    n = ok ? n.dung : n.sai;
  }
  return n.la;
}
/** Tầng 3: module hành động trả về lệnh cho thực thể. */
export type Command = { di?: { x: number; y: number }; danh?: boolean; chieu?: boolean };
export const ACTIONS: Record<
  Behavior,
  (self: { x: number; y: number }, tgt: { x: number; y: number } | null) => Command
> = {
  dungYen: () => ({}),
  tuanTra: (s) => ({ di: { x: s.x + 1, y: s.y } }),
  tiepCan: (s, t) => (t ? { di: { x: t.x - s.x, y: t.y - s.y } } : {}),
  danhThuong: () => ({ danh: true }),
  dungChieu: () => ({ chieu: true }),
  rutLui: (s, t) => (t ? { di: { x: s.x - t.x, y: s.y - t.y } } : {}),
};
/** Cây mẫu cho quái cận chiến. */
export const MELEE_TREE: DecisionNode = {
  neu: { truong: "dist", op: "==", giaTri: Infinity },
  dung: { la: "tuanTra" },
  sai: {
    neu: { truong: "hpPct", op: "<", giaTri: 0.2 },
    dung: { la: "rutLui" },
    sai: {
      neu: { truong: "dist", op: "<", giaTri: 60 },
      dung: {
        neu: { truong: "skillReady", op: "==", giaTri: true },
        dung: { la: "dungChieu" },
        sai: { la: "danhThuong" },
      },
      sai: { la: "tiepCan" },
    },
  },
};
