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
        /** Biểu tượng riêng trong src/ui/icons/icons.ts (S09). */
        icon: z
          .string()
          .regex(/^kn-[a-z0-9]+$/)
          .optional(),
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
        style: z.enum(["spiky", "long", "longlocks", "pony", "buns", "short", "bob"]),
        outfit: hex,
        accent: hex,
        skin: hex,
        eye: hex,
        coat: z.boolean().optional(),
        pants: hex.optional(),
        // Chi tiết chỉ dùng cho sprite pixel (docs/art/pixel-chuan.md).
        shoe: hex.optional(),
        mark: hex.optional(),
        gem: hex.optional(),
        cord: hex.optional(),
        weaponColor: hex.optional(),
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

const pos = z.number().positive();
const nonneg = z.number().nonnegative();
export const PARTICLE_KINDS = [
  "ember",
  "drop",
  "leaf",
  "spark",
  "shard",
  "petal",
  "lantern",
  "feather",
  "snow",
  "mist",
] as const;
export const TRAIL_KINDS = ["arc", "wing", "crescent", "thrust", "heavy", "twin", "zigzag"] as const;
export const CharFxSchema = z
  .object({ c: hex, c2: hex, particle: z.enum(PARTICLE_KINDS), trail: z.enum(TRAIL_KINDS) })
  .strict();
const weaponNums = z
  .object(Object.fromEntries(WEAPON_IDS.map((k) => [k, nonneg])) as Record<(typeof WEAPON_IDS)[number], typeof nonneg>)
  .strict();

/** content/combat-feel.yaml: thông số cảm giác đánh (S14). */
export const FeelSchema = z
  .object({
    hitstop: z
      .object({
        heavy: nonneg,
        crit: nonneg,
        react: nonneg,
        skill: nonneg,
        burst: nonneg,
        break: nonneg,
        max: z.number().min(0).max(0.2),
      })
      .strict(),
    slowmo: z.object({ bossKill: z.object({ scale: z.number().gt(0).max(1), dur: nonneg }).strict() }).strict(),
    shake: z.record(z.string(), nonneg).refine((o) => "scale" in o && "decay" in o, "cần scale và decay"),
    camera: z
      .object({
        follow: pos,
        lead: nonneg,
        leadSpeed: pos,
        bossZoom: pos,
        burstZoom: pos,
        burstHold: nonneg,
        zoomSpeed: pos,
      })
      .strict(),
    input: z.object({ buffer: z.number().min(0).max(0.5), dashCancel: z.boolean() }).strict(),
    hit: z.object({ flash: nonneg, squash: nonneg }).strict(),
    poise: z
      .object({ stun: pos, stunVuln: z.number().min(1), regenDelay: nonneg, regen: nonneg, weapon: weaponNums })
      .strict(),
    enemies: z.record(z.string(), z.object({ mass: nonneg, poise: pos, stun: pos.optional() }).strict()),
    telegraph: z
      .object({ line: pos, touchScale: pos, flashAt: z.number().gt(0).lt(1), warnRange: pos, sound: z.boolean() })
      .strict(),
    audio: z
      .object({
        sfx: z.number().min(0).max(1),
        music: z.number().min(0).max(1),
        crossfade: nonneg,
        combatRange: pos,
        combatLinger: nonneg,
      })
      .strict(),
    characters: z.record(z.string(), CharFxSchema),
    jump: z
      .object({
        dur: pos,
        height: pos,
        levelPx: pos,
        stamina: nonneg,
        airControl: z.number().min(0).max(1),
        longJump: pos,
        airDashStamina: nonneg,
        dodgeHeight: nonneg,
        plunge: z.object({ base: pos, perLevel: nonneg, radius: pos, speed: pos }).strict(),
        fall: z.object({ safeLevels: nonneg, dmgPerLevel: z.number().min(0).max(0.5), landAnim: nonneg }).strict(),
      })
      .strict(),
  })
  .strict();

export const ACTIONS = [
  "up",
  "down",
  "left",
  "right",
  "attack",
  "skill",
  "burst",
  "dash",
  "jump",
  "interact",
  "p1",
  "p2",
  "p3",
  "p4",
  "map",
  "pause",
] as const;
export const HUD_BUTTONS = ["atk", "skill", "burst", "jump", "dash", "interact", "joy"] as const;
const unit = z.number().min(0).max(1);
const LayoutItemSchema = z
  .object({
    anchor: z.enum(["br", "bl"]),
    dx: z.number().min(0).max(12),
    dy: z.number().min(0).max(8),
    scale: z.number().min(0.7).max(1.6),
    opacity: z.number().min(0.3).max(1),
  })
  .strict();
/** content/controls.yaml: phím, tay cầm, cần điều khiển, bố cục nút và mặc định Cài đặt (S09). */
export const ObjectivesSchema = z
  .object({
    world: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z0-9-]+$/),
            text: z.string().min(1),
            done: z
              .object({
                kind: z.enum(["statue", "chests", "tower", "boss"]),
                count: z.union([z.number().int().positive(), z.literal("all")]),
              })
              .strict(),
            target: z.enum(["statue", "chest", "tower", "gate"]),
          })
          .strict(),
      )
      .min(1),
    tower: z.string().min(1),
    boss: z.string().min(1),
  })
  .strict();
export type Objectives = z.infer<typeof ObjectivesSchema>;

export const ControlsSchema = z
  .object({
    keys: z.object(Object.fromEntries(ACTIONS.map((a) => [a, z.array(z.string().min(1)).min(1).max(2)]))).strict(),
    gamepad: z
      .object({
        deadzone: z.number().min(0).max(0.6),
        buttons: z.record(z.enum(ACTIONS), z.number().int().min(0).max(16)),
      })
      .strict(),
    joystick: z
      .object({
        mode: z.enum(["dynamic", "fixed"]),
        deadzone: z.number().min(0).max(0.5),
        sensitivity: z.number().min(0.5).max(2),
        radius: z.number().min(30).max(90),
      })
      .strict(),
    layout: z.object(Object.fromEntries(HUD_BUTTONS.map((b) => [b, LayoutItemSchema]))).strict(),
    centerSafe: z.object({ w: unit, h: unit }).strict(),
    defaults: z
      .object({
        master: unit,
        music: unit,
        sfx: unit,
        quality: z.enum(["high", "medium", "low"]),
        renderer: z.enum(["auto", "3d", "2d"]),
        shake: z.boolean(),
        vibrate: z.boolean(),
        fontScale: z.number().min(0.8).max(1.4),
        colorMode: z.enum(["none", "protan", "deutan", "tritan"]),
        mouseAim: z.boolean(),
        showHints: z.boolean(),
        reduceMotion: z.boolean(),
      })
      .strict(),
  })
  .strict();
export type Action = (typeof ACTIONS)[number];
export type HudButton = (typeof HUD_BUTTONS)[number];
export type LayoutItem = z.infer<typeof LayoutItemSchema>;
export type Controls = {
  keys: Record<Action, string[]>;
  gamepad: { deadzone: number; buttons: Partial<Record<Action, number>> };
  joystick: z.infer<typeof ControlsSchema>["joystick"];
  layout: Record<HudButton, LayoutItem>;
  centerSafe: { w: number; h: number };
  defaults: z.infer<typeof ControlsSchema>["defaults"];
};

const EffectsSchema = z.record(z.string(), z.number().min(0.5).max(1.5));
/** content/terrain.yaml: loại địa hình và bộ hiệu ứng theo vùng (định dạng cho S12). */
export const TerrainSchema = z
  .object({
    terrains: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z][a-z-]*$/),
            name: z.string().min(1),
            walkable: z.boolean().optional(),
            effects: EffectsSchema.optional(),
          })
          .strict(),
      )
      .min(1)
      .max(255),
    regions: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z][a-z-]*$/),
            name: z.string().min(1),
            effects: EffectsSchema,
            terrain: z.record(z.string(), EffectsSchema),
          })
          .strict(),
      )
      .min(1)
      .max(255),
    effectKeys: z.array(z.string()).min(1),
  })
  .strict();
export type TerrainData = z.infer<typeof TerrainSchema>;

export type Character = z.infer<typeof CharacterSchema>;
export type Feel = z.infer<typeof FeelSchema>;
export type CharFx = z.infer<typeof CharFxSchema>;
export type ParticleKind = (typeof PARTICLE_KINDS)[number];
export type TrailKind = (typeof TRAIL_KINDS)[number];
export type EnemyDef = z.infer<typeof EnemySchema>;
export type BossDef = z.infer<typeof BossSchema>;
export type Config = z.infer<typeof ConfigSchema>;

export interface RawContent {
  config: unknown;
  characters: Record<string, unknown>;
  enemies: Record<string, unknown>;
  feel: unknown;
  controls: unknown;
  terrain: unknown;
  objectives: unknown;
}

export interface Content {
  config: Config;
  characters: Character[];
  enemies: Record<string, EnemyDef>;
  boss: BossDef;
  feel: Feel;
  controls: Controls;
  terrain: TerrainData;
  objectives: Objectives;
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
  const feelRes = FeelSchema.safeParse(raw.feel);
  if (!feelRes.success) fmtErr("combat-feel.yaml", feelRes.error);
  else {
    const f = feelRes.data;
    for (const id of Object.keys(chars))
      if (!f.characters[id]) errors.push(`combat-feel.yaml: characters thiếu hiệu ứng cho "${id}"`);
    for (const id of Object.keys(f.characters))
      if (!chars[id]) errors.push(`combat-feel.yaml: characters có "${id}" nhưng không có file nhân vật`);
    for (const id of [...Object.keys(enemies), "hacgiao"])
      if (!f.enemies[id]) errors.push(`combat-feel.yaml: enemies thiếu cân nặng và chịu đòn cho "${id}"`);
  }
  const ctlRes = ControlsSchema.safeParse(raw.controls);
  if (!ctlRes.success) fmtErr("controls.yaml", ctlRes.error);
  else {
    const seen = new Map<string, string>();
    for (const [a, ks] of Object.entries(ctlRes.data.keys) as [string, string[]][])
      for (const k of ks) {
        if (seen.has(k)) errors.push(`controls.yaml: phím "${k}" dùng cho cả "${seen.get(k)}" và "${a}"`);
        seen.set(k, a);
      }
    const used = new Map<number, string>();
    for (const [a, b] of Object.entries(ctlRes.data.gamepad.buttons)) {
      if (used.has(b!)) errors.push(`controls.yaml: nút tay cầm ${b} dùng cho cả "${used.get(b!)}" và "${a}"`);
      used.set(b!, a);
    }
  }
  const objRes = ObjectivesSchema.safeParse(raw.objectives);
  if (!objRes.success) fmtErr("objectives.yaml", objRes.error);
  else if (new Set(objRes.data.world.map((o) => o.id)).size !== objRes.data.world.length)
    errors.push("objectives.yaml: id mục tiêu trùng");
  const terRes = TerrainSchema.safeParse(raw.terrain);
  if (!terRes.success) fmtErr("terrain.yaml", terRes.error);
  else {
    const t = terRes.data;
    const ids = new Set(t.terrains.map((x) => x.id));
    if (ids.size !== t.terrains.length) errors.push("terrain.yaml: id địa hình trùng");
    const keyOk = (o: Record<string, number> | undefined, where: string) => {
      for (const k of Object.keys(o ?? {}))
        if (!t.effectKeys.includes(k)) errors.push(`terrain.yaml: ${where} có hiệu ứng lạ "${k}"`);
    };
    for (const x of t.terrains) keyOk(x.effects, x.id);
    for (const r of t.regions) {
      keyOk(r.effects, r.id);
      for (const [tid, eff] of Object.entries(r.terrain)) {
        if (!ids.has(tid)) errors.push(`terrain.yaml: vùng ${r.id} có địa hình lạ "${tid}"`);
        keyOk(eff, `${r.id}.${tid}`);
      }
    }
  }
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
  return {
    config: cfgRes.data!,
    characters,
    enemies,
    boss: boss!,
    feel: feelRes.data!,
    controls: ctlRes.data as Controls,
    terrain: terRes.data!,
    objectives: objRes.data!,
  };
}
