import { validateContent } from "../src/data/schema";
import { validateMenuContent } from "../src/data/menu-schema";
import { validateEconomy } from "../src/data/economy-schema";
import { validateWeapons } from "../src/data/weapons-schema";
import { puzzleGems, validatePuzzles } from "../src/data/puzzles-schema";
import { loadRawContent, loadRawEconomy, loadRawMenuContent, loadRawWeapons, loadRawPuzzles } from "./load-content";

try {
  const raw = loadRawContent();
  const c = validateContent(raw);
  const m = validateMenuContent(loadRawMenuContent(raw));
  const w = validateWeapons(loadRawWeapons(), c.characters);
  const e = validateEconomy(loadRawEconomy(), c.characters);
  const pz = validatePuzzles(loadRawPuzzles(), c.characters);
  const g = puzzleGems(pz, e.game.thuong.ruongCauDo);
  if (g !== e.thietKe.thuNhap.cauDo.daSao)
    throw new Error(
      `economy.yaml thietKe.thuNhap.cauDo.daSao = ${e.thietKe.thuNhap.cauDo.daSao}, nhưng puzzles.yaml cho ${g} Đá Sao`,
    );
  console.log(
    `content/ hợp lệ: ${c.characters.length} nhân vật, ${Object.keys(c.enemies).length} loại quái, boss ${c.boss.name}; ${m.items.items.length} vật phẩm, ${m.quests.length} nhiệm vụ, ${m.codex.creatures.length + m.codex.places.length} mục Bách khoa; kinh tế: ${e.goiNap.daSao.length} gói Đá Sao, ${e.hoSo.length} hồ sơ mô phỏng; ${w.danhSach.length} vũ khí; ${pz.cauDo.length} câu đố, ${pz.biCanh.length} bí cảnh, ${pz.mini.length} quest mini.`,
  );
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
