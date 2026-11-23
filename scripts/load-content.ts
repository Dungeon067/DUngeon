import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import type { RawContent } from "../src/data/schema";
import type { RawMenuContent } from "../src/data/menu-schema";

const ROOT = process.cwd();
const readDir = (dir: string) =>
  Object.fromEntries(
    readdirSync(join(ROOT, dir))
      .filter((f) => f.endsWith(".yaml"))
      .sort()
      .map((f) => [`${dir}/${f}`, parse(readFileSync(join(ROOT, dir, f), "utf8"))]),
  );

export function loadRawContent(): RawContent {
  return {
    config: parse(readFileSync(join(ROOT, "content/config.yaml"), "utf8")),
    characters: readDir("content/characters"),
    enemies: readDir("content/enemies"),
    feel: parse(readFileSync(join(ROOT, "content/combat-feel.yaml"), "utf8")),
    controls: parse(readFileSync(join(ROOT, "content/controls.yaml"), "utf8")),
    terrain: parse(readFileSync(join(ROOT, "content/terrain.yaml"), "utf8")),
    objectives: parse(readFileSync(join(ROOT, "content/objectives.yaml"), "utf8")),
  };
}

const read = (f: string) => parse(readFileSync(join(ROOT, f), "utf8"));
export function loadRawMenuContent(raw: RawContent): RawMenuContent {
  const objectives = raw.objectives as { world: { id: string }[] };
  return {
    menu: read("content/menu.yaml"),
    items: read("content/items.yaml"),
    codex: read("content/codex.yaml"),
    quests: read("content/quests.yaml"),
    cinematic: read("content/cinematic.yaml"),
    admin: read("content/admin.yaml"),
    objectiveIds: objectives.world.map((o) => o.id),
    enemyIds: Object.keys(raw.enemies).map((f) => f.replace(/^.*\//, "").replace(/\.yaml$/, "")),
  };
}

export const loadRawEconomy = () => read("content/economy.yaml");
