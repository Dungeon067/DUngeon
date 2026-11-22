import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import type { RawContent } from "../src/data/schema";

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
  };
}
