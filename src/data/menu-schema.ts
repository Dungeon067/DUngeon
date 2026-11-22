import { z } from "zod";

const anchor = z.string().regex(/^(start|center|tower|gate|statue:\d|dir:-?\d+:\d+)$/, "neo bản đồ không hợp lệ");
const id = z.string().regex(/^[a-z0-9-]+$/);

export const MenuSchema = z.object({
  main: z.array(z.object({ id, name: z.string(), icon: z.string(), group: z.string(), hint: z.string() })).min(1),
  quick: z.array(id),
  transitionMs: z.number().int().positive().max(250),
  combatLock: z.object({ radius: z.number().positive(), message: z.string() }),
  affinity: z.object({
    perSecond: z.number().nonnegative(),
    perKill: z.number().nonnegative(),
    levels: z.array(z.number().positive()).length(9),
  }),
  profile: z.array(
    z.object({ file: id, name: z.string(), level: z.number().int().min(1).max(10), perSection: z.number().int().min(0) }),
  ),
  npcs: z.array(z.object({ id, name: z.string(), role: z.string(), at: anchor })),
  map: z.object({ zoomMin: z.number().positive(), zoomMax: z.number().positive(), maxMarks: z.number().int().positive() }),
});

export const ItemsSchema = z.object({
  types: z.array(z.object({ id, name: z.string(), icon: z.string() })),
  drops: z.record(z.array(z.object({ chance: z.number().min(0).max(1), pool: z.array(id).min(1) }))),
  items: z.array(
    z.object({
      id,
      name: z.string(),
      type: id,
      rarity: z.union([z.literal(3), z.literal(4), z.literal(5)]),
      region: z.string(),
      story: z.string().min(1),
      weapon: z.string().optional(),
      profileKey: z.enum(["books"]).optional(),
    }),
  ),
});

export const CodexSchema = z.object({
  creatures: z.array(
    z.object({
      id,
      name: z.string(),
      tag: z.string().nullable(),
      habitat: z.string().nullable().optional(),
      lore: z.string().nullable().optional(),
      weak: z.string().nullable().optional(),
      rumor: z.string().nullable().optional(),
      inGame: z.boolean(),
    }),
  ),
  places: z.array(z.object({ id, name: z.string(), lore: z.string(), secret: z.string().nullable(), at: anchor })),
});

export const STEP_KINDS = ["objective", "kills", "reacts", "chests", "tower", "boss", "pulls", "owned", "codex"] as const;
export const QuestsSchema = z.object({
  quests: z.array(
    z.object({
      id,
      type: z.enum(["chinh", "phu", "hang-ngay"]),
      name: z.string(),
      giver: z.string(),
      desc: z.string(),
      steps: z
        .array(
          z.object({
            text: z.string(),
            kind: z.enum(STEP_KINDS),
            id: z.string().optional(),
            count: z.number().int().positive().optional(),
            target: z.enum(["statue", "chest", "tower", "gate", "camp"]).optional(),
          }),
        )
        .min(1),
      reward: z.string(),
    }),
  ),
});

export const CinematicSchema = z.object({
  shots: z.object({ s1: z.number().positive(), s2: z.number().positive(), s3: z.number().positive(), s4: z.number().positive() }),
  slowMo: z.number().positive().max(1),
  videos: z.record(z.string()),
  videoTimeoutMs: z.number().int().positive(),
});

export const AdminSchema = z.object({
  login: z.object({
    algo: z.literal("PBKDF2-SHA256"),
    iterations: z.number().int().min(10000),
    salt: z.string().min(8),
    hash: z.string().regex(/^[0-9a-f]{64}$/),
  }),
  sessionMinutes: z.number().positive(),
});

export type Menu = z.infer<typeof MenuSchema>;
export type ItemsFile = z.infer<typeof ItemsSchema>;
export type Item = ItemsFile["items"][number];
export type Codex = z.infer<typeof CodexSchema>;
export type Quest = z.infer<typeof QuestsSchema>["quests"][number];
export type Cinematic = z.infer<typeof CinematicSchema>;
export type AdminCfg = z.infer<typeof AdminSchema>;

export interface RawMenuContent {
  menu: unknown;
  items: unknown;
  codex: unknown;
  quests: unknown;
  cinematic: unknown;
  admin: unknown;
  objectiveIds: string[];
  enemyIds: string[];
}

/** Kiểm tra dữ liệu menu S10; ném lỗi kèm mọi vấn đề. */
export function validateMenuContent(raw: RawMenuContent) {
  const errors: string[] = [];
  const parse = <T>(file: string, s: z.ZodType<T>, v: unknown): T => {
    const r = s.safeParse(v);
    if (!r.success) r.error.issues.forEach((i) => errors.push(`${file}: ${i.path.join(".") || "(gốc)"}: ${i.message}`));
    return r.success ? r.data : (undefined as T);
  };
  const menu = parse("menu.yaml", MenuSchema, raw.menu);
  const items = parse("items.yaml", ItemsSchema, raw.items);
  const codex = parse("codex.yaml", CodexSchema, raw.codex);
  const quests = parse("quests.yaml", QuestsSchema, raw.quests);
  const cinematic = parse("cinematic.yaml", CinematicSchema, raw.cinematic);
  const admin = parse("admin.yaml", AdminSchema, raw.admin);
  if (items) {
    const ids = new Set(items.items.map((i) => i.id));
    if (ids.size !== items.items.length) errors.push("items.yaml: id vật phẩm trùng");
    const types = new Set(items.types.map((t) => t.id));
    items.items.forEach((i) => types.has(i.type) || errors.push(`items.yaml: ${i.id}: loại ${i.type} không có`));
    Object.entries(items.drops).forEach(([k, ds]) =>
      ds.forEach((d) => d.pool.forEach((p) => ids.has(p) || errors.push(`items.yaml: drops.${k}: không có vật phẩm ${p}`))),
    );
  }
  if (quests) {
    const qs = new Set<string>();
    for (const q of quests.quests) {
      if (qs.has(q.id)) errors.push(`quests.yaml: id trùng ${q.id}`);
      qs.add(q.id);
      for (const s of q.steps) {
        if (s.kind === "objective" && !raw.objectiveIds.includes(s.id ?? ""))
          errors.push(`quests.yaml: ${q.id}: không có mục tiêu ${s.id} trong objectives.yaml`);
        if (s.kind !== "objective" && !s.count) errors.push(`quests.yaml: ${q.id}: bước "${s.text}" thiếu count`);
      }
    }
  }
  if (codex)
    codex.creatures
      .filter((c) => c.inGame)
      .forEach((c) => raw.enemyIds.includes(c.id) || errors.push(`codex.yaml: quái ${c.id} không có trong content/enemies`));
  if (errors.length) throw new Error("Dữ liệu menu không hợp lệ:\n" + errors.join("\n"));
  return { menu, items, codex, quests: quests.quests, cinematic, admin };
}
export type MenuContent = ReturnType<typeof validateMenuContent>;
