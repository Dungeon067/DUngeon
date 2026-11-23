import { validateContent } from "../src/data/schema";
import { validateMenuContent } from "../src/data/menu-schema";
import { validateEconomy } from "../src/data/economy-schema";
import { validateWeapons } from "../src/data/weapons-schema";
import { puzzleGems, validatePuzzles } from "../src/data/puzzles-schema";
import { validateModels } from "../src/data/models-schema";
import { clipsOfKit, validateKits } from "../src/data/kit-schema";
import {
  loadRawContent,
  loadRawEconomy,
  loadRawMenuContent,
  loadRawWeapons,
  loadRawPuzzles,
  loadRawModels,
  loadRawKits,
} from "./load-content";
import { existsSync, readFileSync } from "node:fs";

try {
  const raw = loadRawContent();
  const c = validateContent(raw);
  const m = validateMenuContent(loadRawMenuContent(raw));
  const w = validateWeapons(loadRawWeapons(), c.characters);
  const e = validateEconomy(loadRawEconomy(), c.characters);
  const pz = validatePuzzles(loadRawPuzzles(), c.characters);
  const md = validateModels(loadRawModels());
  const clips = JSON.parse(readFileSync("public/media/anim/humanoid.json", "utf8")).clips;
  for (const [t, a] of Object.entries(md.hoatAnh))
    for (const k of [a.stand, ...a.atk, a.charge, a.skill, a.burst])
      if (!clips[k])
        throw new Error(`models.yaml hoatAnh.${t}: không có clip ${k} trong public/media/anim/humanoid.json`);
  const rk = loadRawKits();
  const kv = validateKits(rk.kits, rk.statuses, c.characters.map((x) => x.id));
  const kc = JSON.parse(readFileSync("public/media/anim/kits.json", "utf8")).clips;
  for (const [id, k] of Object.entries(kv.kits)) {
    if (k.no.cost !== c.characters.find((x) => x.id === id)!.burst.cost)
      throw new Error(`kits/${id}.yaml: no.cost khác burst.cost trong characters/${id}.yaml`);
    for (const cl of clipsOfKit(k))
      if (!kc[cl] && !clips[cl]) throw new Error(`kits/${id}.yaml: không có clip ${cl} trong public/media/anim/kits.json`);
  }
  for (const [t, id] of Object.entries(md.vuKhiMacDinh))
    if (!existsSync(`public/media/models/weapons/${id}.glb`))
      throw new Error(`models.yaml vuKhiMacDinh.${t}: thiếu public/media/models/weapons/${id}.glb`);
  if (!existsSync(`public/media/models/${md.mau}/model.vrm`))
    throw new Error(`models.yaml mau: thiếu public/media/models/${md.mau}/model.vrm`);
  const g = puzzleGems(pz, e.game.thuong.ruongCauDo);
  if (g !== e.thietKe.thuNhap.cauDo.daSao)
    throw new Error(
      `economy.yaml thietKe.thuNhap.cauDo.daSao = ${e.thietKe.thuNhap.cauDo.daSao}, nhưng puzzles.yaml cho ${g} Đá Sao`,
    );
  console.log(
    `content/ hợp lệ: ${c.characters.length} nhân vật, ${Object.keys(c.enemies).length} loại quái, boss ${c.boss.name}; ${m.items.items.length} vật phẩm, ${m.quests.length} nhiệm vụ, ${m.codex.creatures.length + m.codex.places.length} mục Bách khoa; kinh tế: ${e.goiNap.daSao.length} gói Đá Sao, ${e.hoSo.length} hồ sơ mô phỏng; ${w.danhSach.length} vũ khí; ${pz.cauDo.length} câu đố, ${pz.biCanh.length} bí cảnh, ${pz.mini.length} quest mini; mô hình 3D: mẫu ${md.mau}, ${Object.keys(clips).length} clip hoạt ảnh; ${Object.keys(kv.kits).length} bộ chiêu riêng, ${kv.statuses.trangThai.length} buff/debuff, ${Object.keys(kc).length} clip chiêu.`,
  );
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
