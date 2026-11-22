import { z } from "zod";

export const ELEMENT_IDS = ["fire", "water", "wind", "bolt", "earth", "ice"] as const;
export const WEAPON_IDS = ["sword", "great", "spear", "bow", "cat"] as const;
export const SKILL_TYPES = ["dash", "nova", "turret", "heal", "vortex", "shield"] as const;
export const BURST_TYPES = ["inferno", "storm", "tide", "meteor", "blizzard"] as const;

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, "màu dạng #rrggbb");

export const CharacterSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+$/),
    name: z.string().min(1),
    r: z.union([z.literal(4), z.literal(5)]),
    el: z.enum(ELEMENT_IDS),
    w: z.enum(WEAPON_IDS),
    title: z.string().min(1),
    desc: z.string().min(1),
    hp: z.number().positive(),
    atk: z.number().positive(),
    skill: z
      .object({
        name: z.string().min(1),
        type: z.enum(SKILL_TYPES),
        cd: z.number().positive(),
        m: z.number().positive(),
      })
      .strict(),
    burst: z
      .object({
        name: z.string().min(1),
        type: z.enum(BURST_TYPES),
        cost: z.number().positive(),
        m: z.number().positive(),
      })
      .strict(),
    look: z
      .object({
        hair: hex,
        style: z.enum(["spiky", "long", "pony", "buns", "short", "bob"]),
        outfit: hex,
        accent: hex,
        skin: hex,
        eye: hex,
        coat: z.boolean().optional(),
        pants: hex.optional(),
      })
      .strict(),
  })
  .strict();

export const EnemySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+$/),
    name: z.string().min(1),
    hp: z.number().positive(),
    atk: z.number().positive(),
    spd: z.number().positive(),
    r: z.number().positive(),
    aggro: z.number().positive(),
    cd: z.number().positive(),
    elite: z.boolean().optional(),
  })
  .strict();

export const BossSchema = z
  .object({
    id: z.literal("hacgiao"),
    name: z.string().min(1),
    hp: z.number().positive(),
    hpPerLv: z.number().nonnegative(),
    atk: z.number().positive(),
    atkPerLv: z.number().nonnegative(),
    r: z.number().positive(),
    spd: z.number().positive(),
    el: z.enum(ELEMENT_IDS),
    phase2: z.object({ at: z.number().gt(0).lt(1), el: z.enum(ELEMENT_IDS), spd: z.number().positive() }).strict(),
  })
  .strict();

const ElementSchema = z.object({ vi: z.string().min(1), c: hex, c2: hex }).strict();
const WeaponSchema = z
  .object({
    vi: z.string().min(1),
    int: z.number().positive(),
    range: z.number().positive().optional(),
    arc: z.number().positive().optional(),
    mult: z.tuple([z.number(), z.number(), z.number()]),
    kind: z.enum(["melee", "arrow", "orb"]),
  })
  .strict();
const descTemplate = z.string().includes("{pct}");

export const ConfigSchema = z
  .object({
    characterOrder: z.array(z.string()).min(1),
    enemyOrder: z.array(z.string()).min(1),
    gacha: z
      .object({
        rate5: z.number().min(0).max(100),
        rate4: z.number().min(0).max(100),
        soft: z.number().int().positive(),
        hard: z.number().int().positive(),
        cost: z.number().int().positive(),
        featured: z.string(),
      })
      .strict(),
    startProfile: z
      .object({
        gems: z.number().int().nonnegative(),
        coin: z.number().int().nonnegative(),
        books: z.number().int().nonnegative(),
        party: z.array(z.string()).min(1).max(4),
      })
      .strict(),
    elements: z
      .object(
        Object.fromEntries(ELEMENT_IDS.map((k) => [k, ElementSchema])) as Record<
          (typeof ELEMENT_IDS)[number],
          typeof ElementSchema
        >,
      )
      .strict(),
    weapons: z
      .object(
        Object.fromEntries(WEAPON_IDS.map((k) => [k, WeaponSchema])) as Record<
          (typeof WEAPON_IDS)[number],
          typeof WeaponSchema
        >,
      )
      .strict(),
    skillDesc: z
      .object(
        Object.fromEntries(SKILL_TYPES.map((k) => [k, descTemplate])) as Record<
          (typeof SKILL_TYPES)[number],
          typeof descTemplate
        >,
      )
      .strict(),
    burstDesc: z
      .object(
        Object.fromEntries(BURST_TYPES.map((k) => [k, descTemplate])) as Record<
          (typeof BURST_TYPES)[number],
          typeof descTemplate
        >,
      )
      .strict(),
    items3: z.array(z.string().min(1)).min(1),
    dailyPool: z
      .array(z.object({ id: z.string(), t: z.string().min(1), goal: z.number().int().positive() }).strict())
      .min(4),
  })
  .strict();

export type Character = z.infer<typeof CharacterSchema>;
export type EnemyDef = z.infer<typeof EnemySchema>;
export type BossDef = z.infer<typeof BossSchema>;
export type Config = z.infer<typeof ConfigSchema>;

export interface RawContent {
  config: unknown;
  characters: Record<string, unknown>;
  enemies: Record<string, unknown>;
}

export interface Content {
  config: Config;
  characters: Character[];
  enemies: Record<string, EnemyDef>;
  boss: BossDef;
}

/** Kiểm tra và ghép dữ liệu. Ném lỗi kèm danh sách mọi vấn đề tìm thấy. */
export function validateContent(raw: RawContent): Content {
  const errors: string[] = [];
  const fmtErr = (file: string, e: z.ZodError) =>
    e.issues.forEach((i) => errors.push(`${file}: ${i.path.join(".") || "(gốc)"}: ${i.message}`));
  const cfgRes = ConfigSchema.safeParse(raw.config);
  if (!cfgRes.success) fmtErr("config.yaml", cfgRes.error);
  const chars: Record<string, Character> = {};
  for (const [file, data] of Object.entries(raw.characters)) {
    const r = CharacterSchema.safeParse(data);
    if (!r.success) {
      fmtErr(file, r.error);
      continue;
    }
    if (chars[r.data.id]) errors.push(`${file}: ID nhân vật trùng "${r.data.id}"`);
    if (!file.endsWith(`/${r.data.id}.yaml`)) errors.push(`${file}: tên file phải là ${r.data.id}.yaml`);
    chars[r.data.id] = r.data;
  }
  const enemies: Record<string, EnemyDef> = {};
  let boss: BossDef | undefined;
  for (const [file, data] of Object.entries(raw.enemies)) {
    if (file.endsWith("/hacgiao.yaml")) {
      const r = BossSchema.safeParse(data);
      if (r.success) boss = r.data;
      else fmtErr(file, r.error);
      continue;
    }
    const r = EnemySchema.safeParse(data);
    if (!r.success) {
      fmtErr(file, r.error);
      continue;
    }
    if (enemies[r.data.id]) errors.push(`${file}: ID quái trùng "${r.data.id}"`);
    if (!file.endsWith(`/${r.data.id}.yaml`)) errors.push(`${file}: tên file phải là ${r.data.id}.yaml`);
    enemies[r.data.id] = r.data;
  }
  if (!boss) errors.push("enemies/hacgiao.yaml: thiếu hoặc sai cấu hình boss");
  const characters: Character[] = [];
  if (cfgRes.success) {
    const cfg = cfgRes.data;
    const dup = (arr: string[]) => arr.filter((x, i) => arr.indexOf(x) !== i);
    for (const d of dup(cfg.characterOrder)) errors.push(`config.yaml: characterOrder trùng "${d}"`);
    for (const d of dup(cfg.enemyOrder)) errors.push(`config.yaml: enemyOrder trùng "${d}"`);
    for (const id of cfg.characterOrder)
      if (chars[id]) characters.push(chars[id]);
      else errors.push(`config.yaml: characterOrder có "${id}" nhưng không có file nhân vật`);
    for (const id of Object.keys(chars))
      if (!cfg.characterOrder.includes(id)) errors.push(`characters/${id}.yaml: chưa có trong characterOrder`);
    for (const id of cfg.enemyOrder)
      if (!enemies[id]) errors.push(`config.yaml: enemyOrder có "${id}" nhưng không có file quái`);
    for (const id of Object.keys(enemies))
      if (!cfg.enemyOrder.includes(id)) errors.push(`enemies/${id}.yaml: chưa có trong enemyOrder`);
    const f = chars[cfg.gacha.featured];
    if (!f) errors.push(`config.yaml: gacha.featured "${cfg.gacha.featured}" không tồn tại`);
    else if (f.r !== 5) errors.push(`config.yaml: gacha.featured "${f.id}" phải là nhân vật 5★`);
    if (cfg.gacha.soft > cfg.gacha.hard) errors.push("config.yaml: gacha.soft phải ≤ gacha.hard");
    for (const id of cfg.startProfile.party)
      if (!chars[id]) errors.push(`config.yaml: startProfile.party có "${id}" không tồn tại`);
    if (dup(cfg.dailyPool.map((d) => d.id)).length) errors.push("config.yaml: dailyPool có ID trùng");
    if (!Object.values(chars).some((c) => c.r === 4)) errors.push("Cần ít nhất một nhân vật 4★");
    if (!Object.values(chars).some((c) => c.r === 5 && c.id !== cfg.gacha.featured))
      errors.push("Cần ít nhất một nhân vật 5★ ngoài nhân vật nổi bật");
  }
  if (errors.length) throw new Error("Dữ liệu content/ không hợp lệ:\n- " + errors.join("\n- "));
  return { config: cfgRes.data!, characters, enemies, boss: boss! };
}
