import menu from "../../content/menu.yaml";
import items from "../../content/items.yaml";
import codex from "../../content/codex.yaml";
import quests from "../../content/quests.yaml";
import cinematic from "../../content/cinematic.yaml";
import admin from "../../content/admin.yaml";
import { CONTENT } from "./content";
import { validateMenuContent } from "./menu-schema";
import type { Item } from "./menu-schema";

export const MC = validateMenuContent({
  menu,
  items,
  codex,
  quests,
  cinematic,
  admin,
  objectiveIds: CONTENT.objectives.world.map((o) => o.id),
  enemyIds: Object.keys(CONTENT.enemies).concat(CONTENT.boss ? ["hacgiao"] : []),
});
export const MENU = MC.menu;
export const ITEMS: Item[] = MC.items.items;
export const ITEM_BY_ID: Record<string, Item> = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
export const ITEM_TYPES = MC.items.types;
export const DROPS = MC.items.drops;
export const CODEX = MC.codex;
export const QUESTS = MC.quests;
export const CINEMATIC = MC.cinematic;
export const ADMIN_CFG = MC.admin;
