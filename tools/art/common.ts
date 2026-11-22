/** Hàm dùng chung cho các lệnh art:*: tìm Blender, đọc YAML nhân vật và chi tiết dựng. */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export interface Look {
  hair: string;
  style: string;
  outfit: string;
  accent: string;
  skin: string;
  eye: string;
  coat?: boolean;
}

export interface Dung {
  than?: { gioi_tinh?: "nam" | "nu"; dang?: string; ti_le?: number };
  bang_mau?: Record<string, string>;
  trang_phuc?: Record<string, number | boolean>;
}

export interface ArtCharacter {
  id: string;
  name: string;
  el: string;
  elColor: string;
  weapon: string;
  look: Look;
  dung: Dung;
}

/** Blender: biến môi trường BLENDER, rồi bản mới nhất trong ~/tools, rồi `blender` trên PATH. */
export function blenderPath(): string {
  if (process.env.BLENDER) return process.env.BLENDER;
  const tools = join(homedir(), "tools");
  if (existsSync(tools)) {
    const found = readdirSync(tools)
      .filter((d) => d.startsWith("blender-"))
      .sort()
      .reverse()
      .map((d) => join(tools, d, "blender"))
      .find((p) => existsSync(p));
    if (found) return found;
  }
  return "blender";
}

export function loadCharacter(id: string): ArtCharacter {
  const c = parse(readFileSync(join(ROOT, "content/characters", id + ".yaml"), "utf8"));
  const cfg = parse(readFileSync(join(ROOT, "content/config.yaml"), "utf8"));
  const dungFile = join(ROOT, "media/characters", id, "dung.yaml");
  const dung: Dung = existsSync(dungFile) ? (parse(readFileSync(dungFile, "utf8")) ?? {}) : {};
  const el = cfg.elements?.[c.el];
  if (!el) throw new Error(`Nguyên tố "${c.el}" của ${id} không có trong content/config.yaml`);
  return { id, name: c.name, el: c.el, elColor: el.c, weapon: c.w, look: c.look, dung };
}
