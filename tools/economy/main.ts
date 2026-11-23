/** pnpm economy:sim [--players 100000] [--days 365] [--seed n] [--out docs/economy/ket-qua] */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { validateContent } from "../../src/data/schema";
import { validateEconomy } from "../../src/data/economy-schema";
import { loadRawContent, loadRawEconomy } from "../../scripts/load-content";
import { simulateProfile, tiering } from "./sim";
import { renderReport } from "./report";

const arg = (k: string) => {
  const i = process.argv.indexOf("--" + k);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const content = validateContent(loadRawContent());
const E = validateEconomy(loadRawEconomy(), content.characters);
const opts = {
  players: Number(arg("players") ?? E.moPhong.soNguoi),
  days: Number(arg("days") ?? E.moPhong.soNgay),
  seed: Number(arg("seed") ?? E.moPhong.seed),
};
const out = arg("out") ?? "docs/economy/ket-qua";
const chars = content.characters.map((c) => ({ id: c.id, name: c.name, r: c.r, hp: c.hp, atk: c.atk, w: c.w }));
const G = content.config.gacha;
const t0 = Date.now();
const res = E.hoSo.map((p) => simulateProfile(p, chars, G, E, opts));
const fair = tiering(res, chars, E, opts.days);
mkdirSync(out, { recursive: true });
const files = renderReport(res, fair, chars, E, opts);
for (const [name, body] of Object.entries(files.files)) writeFileSync(join(out, name), body);
console.log(files.terminal);
console.log(
  `\n${opts.players.toLocaleString("vi-VN")} người chơi ảo × ${res.length} hồ sơ × ${opts.days} ngày, seed ${opts.seed}, ${((Date.now() - t0) / 1000).toFixed(1)} giây. Kết quả: ${out}/`,
);
if (!fair.ok) process.exit(1);
