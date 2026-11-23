/* Tokens dạng TypeScript cho chỗ không đọc được CSS (Canvas, HUD vẽ tay). Giá trị khớp src/ui/tokens.css. */

export const COLOR = {
  bg: "#0f1b3d",
  "bg-deep": "#0a1230",
  "surface-1": "#16224a",
  "surface-2": "#1d2b5a",
  "surface-3": "#26366b",
  lacquer: "#241018",
  paper: "#f3e6c4",
  text: "#f3e6c4",
  "text-dim": "#b8b2c9",
  "text-faint": "#a9a6c4",
  "on-bronze": "#1e1405",
  "on-danger": "#fff4e0",
  "paper-ink": "#2b1d0e",
  "paper-ink-dim": "#6a5030",
  line: "#34457e",
  "line-strong": "#7383c4",
  bronze: "#c8962d",
  "bronze-hi": "#e2b453",
  "bronze-lo": "#8c6418",
  focus: "#f3e6c4",
  ok: "#6fd39a",
  warn: "#f0b44c",
  bad: "#ff8a7a",
  info: "#8cc4f0",
  danger: "#9e2b26",
  "danger-hi": "#b8352e",
  new: "#cc3a31",
  r1: "#a4a8b3",
  "r1-a": "#3d4049",
  "r1-b": "#6d717c",
  r2: "#86c79c",
  "r2-a": "#26463a",
  "r2-b": "#4a8063",
  r3: "#86b8e6",
  "r3-bg": "#172a4d",
  "r3-a": "#24406a",
  "r3-b": "#4c7cb0",
  r4: "#ab92f2",
  "r4-bg": "#211d4f",
  "r4-a": "#2f2a6b",
  "r4-b": "#6b5cc0",
  r5: "#eab35c",
  "r5-bg": "#33220f",
  "r5-a": "#5a3418",
  "r5-b": "#b8783a",
} as const;
export type ColorName = keyof typeof COLOR;

export type ElementId = "fire" | "water" | "wind" | "bolt" | "earth" | "ice" | "wood";
export const ELEMENTS: Record<ElementId, { vi: string; c: string; c2: string }> = {
  fire: { vi: "Hỏa", c: "#ff6a3d", c2: "#ffc08a" },
  water: { vi: "Thủy", c: "#3aa6f5", c2: "#a6dcff" },
  wind: { vi: "Phong", c: "#45dfb1", c2: "#bdf6e4" },
  bolt: { vi: "Lôi", c: "#b47bff", c2: "#e0c8ff" },
  earth: { vi: "Thổ", c: "#e9b23a", c2: "#f8de98" },
  ice: { vi: "Băng", c: "#8fe1ff", c2: "#e6f9ff" },
  wood: { vi: "Mộc", c: "#7cc95a", c2: "#d3f2b8" },
};
export const ELEMENT_IDS = Object.keys(ELEMENTS) as ElementId[];

export type Rarity = 3 | 4 | 5;
export const RARITY: Record<Rarity, { c: string; bg: string }> = {
  3: { c: COLOR.r3, bg: COLOR["r3-bg"] },
  4: { c: COLOR.r4, bg: COLOR["r4-bg"] },
  5: { c: COLOR.r5, bg: COLOR["r5-bg"] },
};

export const FONT = {
  body: '"Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", sans-serif',
  display: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
} as const;

export const SPACE = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48 } as const;
export const RADIUS = { xs: 3, sm: 6, md: 10, lg: 16, pill: 999 } as const;
export const TOUCH_MIN = 44;
export const MOTION = {
  dur: { instant: 80, fast: 140, base: 220, slow: 360, cine: 900 },
  ease: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
    in: "cubic-bezier(0.55, 0, 1, 0.45)",
    inout: "cubic-bezier(0.65, 0, 0.35, 1)",
    settle: "cubic-bezier(0.18, 1.25, 0.4, 1)",
  },
} as const;

/** Cỡ nút HUD theo chiều cao khung nhìn, cùng công thức với --tt-hud-* trong tokens.css. */
export function hudSize(viewportH: number) {
  const clamp = (min: number, v: number, max: number) => Math.min(max, Math.max(min, v));
  return {
    xl: clamp(64, viewportH * 0.18, 96),
    lg: clamp(52, viewportH * 0.144, 76),
    md: clamp(44, viewportH * 0.118, 60),
    gap: clamp(6, viewportH * 0.02, 14),
  };
}

/* ---------- Tương phản WCAG 2.x ---------- */
export function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}
export function contrast(a: string, b: string): number {
  const A = luminance(a);
  const B = luminance(b);
  return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05);
}

/**
 * Mọi cặp chữ trên nền mà thành phần dùng. Chữ thường cần 4,5:1; "large" (≥24 px, hoặc ≥18,66 px đậm) cần 3:1;
 * "ui" là biểu tượng, viền ô nhập, thanh tiến độ cần 3:1 (WCAG 1.4.11).
 */
export type PairKind = "text" | "large" | "ui";
export interface Pair {
  fg: string;
  bg: string;
  kind: PairKind;
  where: string;
}
const TEXT_ON_DARK: ColorName[] = ["text", "text-dim", "text-faint", "bronze-hi", "ok", "warn", "bad", "info"];
const DARK_BGS: ColorName[] = ["bg", "bg-deep", "surface-1", "surface-2", "surface-3", "lacquer"];
const COLORED_TEXT_BGS: ColorName[] = ["bg", "bg-deep", "surface-1", "surface-2", "lacquer"];

export const PAIRS: Pair[] = [
  ...DARK_BGS.flatMap((bg) =>
    TEXT_ON_DARK.map((fg) => ({ fg: COLOR[fg], bg: COLOR[bg], kind: "text" as const, where: `${fg} trên ${bg}` })),
  ),
  ...COLORED_TEXT_BGS.flatMap((bg) => [
    { fg: COLOR.bronze, bg: COLOR[bg], kind: "text" as const, where: `bronze trên ${bg}` },
    ...([3, 4, 5] as Rarity[]).map((r) => ({
      fg: RARITY[r].c,
      bg: COLOR[bg],
      kind: "text" as const,
      where: `${r}★ trên ${bg}`,
    })),
    ...ELEMENT_IDS.map((id) => ({
      fg: ELEMENTS[id].c,
      bg: COLOR[bg],
      kind: "text" as const,
      where: `${ELEMENTS[id].vi} trên ${bg}`,
    })),
  ]),
  ...([3, 4, 5] as Rarity[]).flatMap((r) => [
    { fg: COLOR.text, bg: RARITY[r].bg, kind: "text" as const, where: `chữ trên nền thẻ ${r}★` },
    { fg: COLOR["text-dim"], bg: RARITY[r].bg, kind: "text" as const, where: `chữ phụ trên nền thẻ ${r}★` },
    { fg: RARITY[r].c, bg: RARITY[r].bg, kind: "text" as const, where: `sao ${r}★ trên nền thẻ ${r}★` },
  ]),
  { fg: COLOR["on-bronze"], bg: COLOR.bronze, kind: "text", where: "nút chính" },
  { fg: COLOR["on-bronze"], bg: COLOR["bronze-hi"], kind: "text", where: "nút chính khi rê chuột" },
  { fg: COLOR["on-danger"], bg: COLOR.danger, kind: "text", where: "nút nguy hiểm" },
  { fg: COLOR["on-danger"], bg: COLOR["danger-hi"], kind: "text", where: "nút nguy hiểm khi rê chuột" },
  { fg: "#ffffff", bg: COLOR.new, kind: "text", where: "số trên chấm đỏ" },
  { fg: COLOR["paper-ink"], bg: COLOR.paper, kind: "text", where: "chữ trên giấy dó" },
  { fg: COLOR["paper-ink-dim"], bg: COLOR.paper, kind: "text", where: "chữ phụ trên giấy dó" },
  { fg: COLOR["line-strong"], bg: COLOR["surface-1"], kind: "ui", where: "viền ô nhập" },
  { fg: COLOR["line-strong"], bg: COLOR["surface-2"], kind: "ui", where: "viền ô nhập trên thẻ" },
  { fg: COLOR.focus, bg: COLOR.bg, kind: "ui", where: "vòng focus" },
  { fg: COLOR.bronze, bg: COLOR["surface-3"], kind: "ui", where: "thanh tiến độ, công tắc bật" },
  { fg: COLOR.new, bg: COLOR.bg, kind: "ui", where: "chấm đỏ báo mới (luôn có vòng viền màu nền 2 px)" },
];

export const PAIR_MIN: Record<PairKind, number> = { text: 4.5, large: 3, ui: 3 };
