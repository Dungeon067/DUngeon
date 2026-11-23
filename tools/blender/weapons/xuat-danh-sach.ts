/**
 * In danh sách vũ khí (JSON) cho script render Blender: đọc từ content, không chép tay.
 * Nếu có content/weapons.yaml (tách riêng) thì đọc ở đó, không thì đọc economy.yaml thietKe.vuKhi.danhSach.
 * Dùng: pnpm exec tsx tools/blender/weapons/xuat-danh-sach.ts > danh-sach.json
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

const root = join(import.meta.dirname, "../../..");
const read = (p: string) => parse(readFileSync(join(root, p), "utf8"));
const weaponsFile = join(root, "content/weapons.yaml");
const list: any[] = existsSync(weaponsFile)
  ? (read("content/weapons.yaml").danhSach ?? read("content/weapons.yaml"))
  : read("content/economy.yaml").thietKe.vuKhi.danhSach;

const chars: Record<string, { el: string; name: string }> = {};
for (const f of readdirSync(join(root, "content/characters"))) {
  const c = read(`content/characters/${f}`);
  chars[c.id] = { el: c.el, name: c.name };
}
const out = list.map((w) => ({
  id: w.id,
  ten: w.ten,
  loai: w.loai,
  r: w.r,
  nguon: w.nguon,
  cua: w.cua ?? null,
  el: w.cua ? (chars[w.cua]?.el ?? null) : null,
}));
process.stdout.write(JSON.stringify(out, null, 2) + "\n");
