import type { Block } from "../../data/kit-schema";

/** Ngữ cảnh khi chạy một khối chiêu. */
export interface Ctx {
  m: any;
  x: number;
  y: number;
  ang: number;
  cast: any;
  /** Nguyên tố vừa bị hút (Khuếch Tán). */
  hut?: string | null;
  /** Đòn đánh thường. */
  normal?: boolean;
}
/** Phần riêng của nhân vật, đăng ký trong src/combat/kits/<id>.ts. */
export interface KitHooks {
  dac?: Record<string, (b: Extract<Block, { k: "dac" }>, c: Ctx) => void>;
  /** Thưởng tăng sát thương cộng thêm cho một đòn. */
  dmgBonus?: (e: any, m: any, o: any, el: string | null) => number;
  onSwirl?: (m: any, e: any, el: string) => void;
  onCounter?: (m: any) => void;
  onEc?: (m: any) => void;
  onNormalHit?: (m: any, e: any) => void;
  onVungHit?: (f: any, e: any) => void;
  /** Bấm kỹ năng lại khi đang hồi chiêu (Lao Kép); trả true nếu đã xử lý. */
  recast?: (m: any) => boolean;
  /** Chuỗi đánh thường thay thế (Lôi Đình tay không). */
  chain?: (m: any) => { m: number; clip?: string; el?: boolean }[] | null;
  atkSpeed?: (m: any) => number;
  /** Chạy mỗi khung cho mọi thành viên có bộ chiêu này (cả khi ngoài sân). */
  tick?: (m: any, dt: number) => void;
}
export const HOOKS: Record<string, KitHooks> = {};
export const hooksOf = (m: any): KitHooks => HOOKS[m?.c?.id] ?? {};
