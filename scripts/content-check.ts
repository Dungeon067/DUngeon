import { validateContent } from "../src/data/schema";
import { loadRawContent } from "./load-content";

try {
  const c = validateContent(loadRawContent());
  console.log(
    `content/ hợp lệ: ${c.characters.length} nhân vật, ${Object.keys(c.enemies).length} loại quái, boss ${c.boss.name}.`,
  );
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
