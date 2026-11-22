import config from "../../content/config.yaml";
import feel from "../../content/combat-feel.yaml";
import { validateContent } from "./schema";
import type { Character, Config, EnemyDef } from "./schema";

const characters = import.meta.glob<unknown>("../../content/characters/*.yaml", { eager: true, import: "default" });
const enemies = import.meta.glob<unknown>("../../content/enemies/*.yaml", { eager: true, import: "default" });

export const CONTENT = validateContent({ config, characters, enemies, feel });
const C = CONTENT.config;

const fillPct = (t: string) => (m: number) => t.replace("{pct}", String(Math.round(m * 100)));
const mapValues = <T, U>(o: Record<string, T>, f: (v: T) => U): Record<string, U> =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)]));

export type ElementDef = Config["elements"]["fire"];
export type WeaponDef = Config["weapons"]["sword"];
export const EL: Record<string, ElementDef> = C.elements;
export const WEAP: Record<string, WeaponDef> = C.weapons;
export const SKILLDESC = mapValues(C.skillDesc, fillPct);
export const BURSTDESC = mapValues(C.burstDesc, fillPct);
export const CHARS: Character[] = CONTENT.characters;
export const byId: Record<string, Character> = Object.fromEntries(CHARS.map((c) => [c.id, c]));
export const ITEMS3 = C.items3;
export const DEFAULT_CFG = C.gacha;
export const START_PROFILE = C.startProfile;
export const DAILY_POOL = C.dailyPool;
export const ENEMY: Record<string, EnemyDef> = Object.fromEntries(C.enemyOrder.map((id) => [id, CONTENT.enemies[id]!]));
export const BOSS = CONTENT.boss;
export const ELS = Object.keys(EL);
export const FEEL_DEFAULT = CONTENT.feel;
