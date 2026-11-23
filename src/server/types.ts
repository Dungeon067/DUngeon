import type { WeaponInst } from "../economy/weapons";
import type { WeaponPity } from "../economy/core";
import type { Config } from "../data/schema";

export interface OwnedChar {
  lv: number;
  cons: number;
  /** uid vũ khí đang trang bị (trong Profile.weapons). */
  vk?: string;
}

export interface DailyTask {
  id: string;
  t: string;
  goal: number;
  prog: number;
  claimed: boolean;
}

export interface Daily {
  date: string;
  tasks: DailyTask[];
  bonus: boolean;
}

export interface MapMark {
  x: number;
  y: number;
  label: string;
}

/** Hồ sơ người chơi, lưu ở localStorage khóa "tinhtu-v3" (tự chuyển từ "tinhtu-v2"). */
export interface Profile {
  v: 3;
  gems: number;
  coin: number;
  books: number;
  owned: Record<string, OwnedChar>;
  party: string[];
  pity5: number;
  pity4: number;
  guaranteed: boolean;
  history: { n: string; r: number; t: number }[];
  chests: number[];
  tower: Record<number, number>;
  boss: Record<number, number | boolean>;
  daily: Daily | null;
  cfg: Config["gacha"];
  gm: { god: boolean; one: boolean; nocd: boolean };
  stats: { kills: number; reacts: number };
  /** 4 đội lưu sẵn; `party` luôn là bản sao của `teams[team]`. */
  teams: string[][];
  team: number;
  /** Túi đồ: id vật phẩm trong content/items.yaml → số lượng. */
  bag: Record<string, number>;
  quests: { tracked: string | null; done: string[] };
  /** Sương bản đồ: mỗi ký tự là một khối FOG×FOG ô, "1" là đã đi qua. */
  fog: string;
  marks: MapMark[];
  /** Mục Bách khoa đã mở, ví dụ "quai:slime", "vat:den-troi". */
  codex: string[];
  /** Độ thân thiết theo nhân vật (điểm thô, đổi ra mức ở content/menu.yaml). */
  affinity: Record<string, number>;
  /** Số liệu cho Admin: Đá Sao vào và ra theo nguồn, lần rời trận giữa chừng. */
  econ: Record<string, number>;
  quits: { mode: string; t: number; at: string }[];
  /** S24: kho vũ khí theo uid, bộ đếm uid, banner Binh Khí Tinh Tú (Bảo Hộ Vận Sao, La Bàn Sao, lịch sử riêng). */
  weapons: Record<string, WeaponInst>;
  wSeq: number;
  wPity: WeaponPity;
  /** Vũ khí La Bàn Sao đang chọn (một trong hai vũ khí nổi bật), null = chưa chọn. */
  wPick: string | null;
  wHistory: { n: string; r: number; t: number; id: string }[];
  wcfg: WeaponBannerCfg;
}

export interface WeaponBannerCfg {
  rate5: number;
  rate4: number;
  soft: number;
  hard: number;
  cost: number;
  featured: [string, string];
}

export interface LogEntry {
  a: string;
  p: unknown;
  ok: boolean;
  msg: string;
  t?: number;
}
