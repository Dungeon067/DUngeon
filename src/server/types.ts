import type { Config } from "../data/schema";

export interface OwnedChar {
  lv: number;
  cons: number;
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

/** Hồ sơ người chơi, lưu ở localStorage khóa "tinhtu-v2". */
export interface Profile {
  v: 2;
  gems: number;
  coin: number;
  books: number;
  owned: Record<string, OwnedChar>;
  party: string[];
  pity5: number;
  pity4: number;
  guaranteed: boolean;
  history: { n: string; r: number; t: number }[];
  chests: string[];
  tower: Record<number, number>;
  boss: Record<number, number | boolean>;
  daily: Daily | null;
  cfg: Config["gacha"];
  gm: { god: boolean; one: boolean; nocd: boolean };
  stats: { kills: number; reacts: number };
}

export interface LogEntry {
  a: string;
  p: unknown;
  ok: boolean;
  msg: string;
}
