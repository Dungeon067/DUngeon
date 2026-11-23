import { CONTROLS } from "../data/content";
import type { Action, HudButton, LayoutItem } from "../data/schema";
import { ACTIONS, HUD_BUTTONS } from "../data/schema";

/* =========================================================
   CÀI ĐẶT NGƯỜI CHƠI (S09). Mặc định đọc từ content/controls.yaml,
   lựa chọn lưu riêng ở localStorage khóa "tinhtu-settings-v1" (tách khỏi hồ sơ).
   ========================================================= */

export const SETTINGS_KEY = "tinhtu-settings-v1";
const OLD_FEEL_KEY = "tinhtu.feel.v1";

export type Quality = "high" | "medium" | "low";
export type ColorMode = "none" | "protan" | "deutan" | "tritan";
export type RendererPref = "auto" | "3d" | "2d";
export type JoyMode = "dynamic" | "fixed";

export interface Settings {
  master: number;
  music: number;
  sfx: number;
  quality: Quality;
  /** Lớp vẽ thế giới: tự chọn (3D nếu máy đủ mạnh, không thì 2D), 3D, hoặc Canvas 2D cũ. */
  renderer: RendererPref;
  shake: boolean;
  vibrate: boolean;
  fontScale: number;
  colorMode: ColorMode;
  mouseAim: boolean;
  showHints: boolean;
  joystick: { mode: JoyMode; deadzone: number; sensitivity: number };
  keys: Record<Action, string[]>;
  layout: Record<HudButton, LayoutItem>;
}

const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function defaultSettings(): Settings {
  const d = CONTROLS.defaults;
  return {
    ...clone(d),
    joystick: {
      mode: CONTROLS.joystick.mode,
      deadzone: CONTROLS.joystick.deadzone,
      sensitivity: CONTROLS.joystick.sensitivity,
    },
    keys: clone(CONTROLS.keys),
    layout: clone(CONTROLS.layout),
  };
}

/** Ghép dữ liệu đã lưu vào mặc định, bỏ mọi trường sai kiểu để dữ liệu hỏng không làm vỡ game. */
export function sanitize(raw: any): Settings {
  const s = defaultSettings();
  if (!raw || typeof raw !== "object") return s;
  const num = (k: "master" | "music" | "sfx") => {
    if (typeof raw[k] === "number") s[k] = clamp(raw[k], 0, 1);
  };
  num("master");
  num("music");
  num("sfx");
  if (["high", "medium", "low"].includes(raw.quality)) s.quality = raw.quality;
  if (["auto", "3d", "2d"].includes(raw.renderer)) s.renderer = raw.renderer;
  for (const k of ["shake", "vibrate", "mouseAim", "showHints"] as const)
    if (typeof raw[k] === "boolean") s[k] = raw[k];
  if (typeof raw.fontScale === "number") s.fontScale = clamp(raw.fontScale, 0.8, 1.4);
  if (["none", "protan", "deutan", "tritan"].includes(raw.colorMode)) s.colorMode = raw.colorMode;
  const j = raw.joystick;
  if (j && typeof j === "object") {
    if (j.mode === "dynamic" || j.mode === "fixed") s.joystick.mode = j.mode;
    if (typeof j.deadzone === "number") s.joystick.deadzone = clamp(j.deadzone, 0, 0.5);
    if (typeof j.sensitivity === "number") s.joystick.sensitivity = clamp(j.sensitivity, 0.5, 2);
  }
  if (raw.keys && typeof raw.keys === "object")
    for (const a of ACTIONS) {
      const v = raw.keys[a];
      if (Array.isArray(v) && v.length <= 2 && v.every((x: unknown) => typeof x === "string"))
        s.keys[a] = v.filter(Boolean);
    }
  if (raw.layout && typeof raw.layout === "object")
    for (const b of HUD_BUTTONS) {
      const v = raw.layout[b];
      if (!v || typeof v !== "object") continue;
      const it = s.layout[b];
      if (typeof v.dx === "number") it.dx = clamp(v.dx, 0, 12);
      if (typeof v.dy === "number") it.dy = clamp(v.dy, 0, 8);
      if (typeof v.scale === "number") it.scale = clamp(v.scale, 0.7, 1.6);
      if (typeof v.opacity === "number") it.opacity = clamp(v.opacity, 0.3, 1);
    }
  return s;
}

function readStored(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return sanitize(JSON.parse(raw));
    // Chuyển cài đặt rung màn hình cũ của S14 sang khóa mới.
    const old = JSON.parse(localStorage.getItem(OLD_FEEL_KEY) || "{}");
    const s = defaultSettings();
    if (typeof old.shake === "boolean") s.shake = old.shake;
    return s;
  } catch {
    return defaultSettings();
  }
}

export const settings: Settings = readStored();
type Listener = (s: Settings) => void;
const listeners: Listener[] = [];
export function onSettings(f: Listener) {
  listeners.push(f);
}

export function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* trình duyệt chặn lưu trữ */
  }
  for (const f of listeners) f(settings);
}
/** Nạp lại từ localStorage (dùng cho test và khi tab khác đổi cài đặt). */
export function reloadSettings() {
  Object.assign(settings, readStored());
  for (const f of listeners) f(settings);
}
export function resetLayout() {
  settings.layout = clone(CONTROLS.layout);
  saveSettings();
}
export function resetKeys() {
  settings.keys = clone(CONTROLS.keys);
  saveSettings();
}

/** Thao tác gắn với phím (theo KeyboardEvent.code), hoặc null. */
export function actionForKey(code: string): Action | null {
  for (const a of ACTIONS) if (settings.keys[a].includes(code)) return a;
  return null;
}

/**
 * Đặt phím cho thao tác ở ô slot (0 hoặc 1). Phím đã thuộc thao tác khác thì
 * hoán đổi: thao tác kia nhận lại phím cũ của ô này (hoặc mất phím nếu ô trống).
 * Trả về thao tác bị ảnh hưởng để giao diện báo cho người chơi.
 */
export function bindKey(action: Action, slot: 0 | 1, code: string, keys = settings.keys): Action | null {
  const prev = keys[action][slot];
  let swapped: Action | null = null;
  for (const a of ACTIONS) {
    if (a === action) continue;
    const i = keys[a].indexOf(code);
    if (i < 0) continue;
    swapped = a;
    if (prev) keys[a][i] = prev;
    else keys[a].splice(i, 1);
  }
  const own = keys[action].indexOf(code);
  if (own >= 0 && own !== slot) keys[action].splice(own, 1);
  const list = keys[action].slice();
  if (slot < list.length) list[slot] = code;
  else list.push(code);
  keys[action] = list.filter((x, i) => list.indexOf(x) === i);
  // Thao tác bị lấy hết phím thì không chơi được: báo về để giao diện yêu cầu đặt lại.
  return swapped;
}
/** Danh sách thao tác đang không có phím nào. */
export function unboundActions(keys = settings.keys): Action[] {
  return ACTIONS.filter((a) => keys[a].length === 0);
}

const KEY_LABEL: Record<string, string> = {
  Space: "Space",
  ShiftLeft: "Shift",
  ShiftRight: "Shift phải",
  ControlLeft: "Ctrl",
  ControlRight: "Ctrl phải",
  AltLeft: "Alt",
  AltRight: "Alt phải",
  Escape: "Esc",
  Enter: "Enter",
  Tab: "Tab",
  Backspace: "Xóa lùi",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
};
/** Nhãn ngắn để in trên nút: KeyE → "E", Digit1 → "1". */
export function keyLabel(code: string | undefined): string {
  if (!code) return "";
  if (KEY_LABEL[code]) return KEY_LABEL[code];
  if (/^Key[A-Z]$/.test(code)) return code.slice(3);
  if (/^Digit\d$/.test(code)) return code.slice(5);
  if (/^Numpad\d$/.test(code)) return "Số " + code.slice(6);
  if (/^F\d+$/.test(code)) return code;
  return code.replace(/(Left|Right)$/, "");
}
export const primaryKey = (a: Action) => keyLabel(settings.keys[a][0]);

/** Áp cài đặt có hiệu lực ngay lên trang: cỡ chữ, chế độ màu, chất lượng. */
export function applyDocumentSettings(doc: Document = document) {
  const r = doc.documentElement;
  r.style.setProperty("--tt-font-scale", String(settings.fontScale));
  r.dataset.colorMode = settings.colorMode;
  r.dataset.quality = settings.quality;
}
