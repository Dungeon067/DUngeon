import { GS } from "./state";
import { CONTROLS } from "../data/content";
import { ACTIONS, type Action } from "../data/schema";
import { actionDown, actionUp, pad } from "./input";

/* =========================================================
   TAY CẦM (Gamepad API, bố cục "standard"). Trong trận: cần trái để đi,
   nút theo content/controls.yaml. Ngoài trận hoặc khi tạm dừng: điều hướng
   giao diện bằng phím hướng hoặc cần trái, nút dưới để chọn, nút phải để quay lại.
   ========================================================= */

export type PadBrand = "xbox" | "ps";
export const PAD_LABEL: Record<PadBrand, string[]> = {
  xbox: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "View", "Menu", "LS", "RS", "↑", "↓", "←", "→"],
  ps: ["✕", "○", "□", "△", "L1", "R1", "L2", "R2", "Create", "Options", "L3", "R3", "↑", "↓", "←", "→"],
};
export function padBrand(id: string): PadBrand {
  if (/xbox|xinput|045e/i.test(id)) return "xbox";
  return /054c|playstation|dualshock|dualsense|wireless controller/i.test(id) ? "ps" : "xbox";
}
/** Bảng nút → thao tác theo content/controls.yaml. */
export function buttonActions(): Map<number, Action> {
  const m = new Map<number, Action>();
  for (const a of ACTIONS) {
    const b = CONTROLS.gamepad.buttons[a];
    if (b !== undefined) m.set(b, a);
  }
  return m;
}
/** Nhãn nút tay cầm của một thao tác, theo hãng. */
export function padLabelFor(a: Action, brand: PadBrand): string {
  const b = CONTROLS.gamepad.buttons[a];
  return b === undefined ? "" : (PAD_LABEL[brand][b] ?? String(b));
}
/** Áp vùng chết hướng tròn cho cần analog. */
export function stick(x: number, y: number, dz = CONTROLS.gamepad.deadzone): [number, number] {
  const L = Math.hypot(x, y);
  if (L <= dz) return [0, 0];
  const k = Math.min(1, (L - dz) / (1 - dz)) / L;
  return [x * k, y * k];
}

export type Dir = "up" | "down" | "left" | "right";
interface R {
  left: number;
  top: number;
  width: number;
  height: number;
}
/** Chọn phần tử kế tiếp theo hướng: ưu tiên gần theo trục chính, phạt lệch trục phụ. */
export function spatialPick(from: R, rects: R[], dir: Dir): number {
  const cx = from.left + from.width / 2,
    cy = from.top + from.height / 2;
  let best = -1,
    bestScore = Infinity;
  rects.forEach((r, i) => {
    const x = r.left + r.width / 2,
      y = r.top + r.height / 2;
    const dx = x - cx,
      dy = y - cy;
    const main = dir === "left" ? -dx : dir === "right" ? dx : dir === "up" ? -dy : dy;
    const side = dir === "left" || dir === "right" ? Math.abs(dy) : Math.abs(dx);
    if (main <= 1) return;
    const score = main + side * 2;
    if (score < bestScore) {
      bestScore = score;
      best = i;
    }
  });
  return best;
}

const FOCUSABLE =
  "button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex='-1'])";
const visible = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
};
/** Lớp giao diện trên cùng đang mở: hộp thoại, modal, lớp phủ, hoặc màn hình menu. */
function topLayer(): HTMLElement {
  const scrims = [...document.querySelectorAll<HTMLElement>(".tt-scrim")].filter(visible);
  if (scrims.length) return scrims[scrims.length - 1]!;
  const modal = document.getElementById("modal");
  if (modal && !modal.hidden) return modal;
  for (const id of ["layoutBar", "wishFx", "ttMenu", "rotateOverlay"]) {
    const el = document.getElementById(id);
    if (el && !el.hidden && visible(el)) return el;
  }
  return document.body;
}
export function navigate(dir: Dir) {
  const layer = topLayer();
  const items = [...layer.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(visible);
  if (!items.length) return;
  const cur = document.activeElement as HTMLElement | null;
  if (!cur || !items.includes(cur)) {
    items[0]!.focus();
    return;
  }
  if (cur.tagName === "INPUT" && (cur as HTMLInputElement).type === "range" && (dir === "left" || dir === "right")) {
    const inp = cur as HTMLInputElement;
    if (dir === "left") inp.stepDown();
    else inp.stepUp();
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    inp.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }
  const others = items.filter((x) => x !== cur);
  const i = spatialPick(
    cur.getBoundingClientRect(),
    others.map((x) => x.getBoundingClientRect()),
    dir,
  );
  if (i >= 0) {
    others[i]!.focus();
    others[i]!.scrollIntoView?.({ block: "nearest" });
  }
}
function confirm() {
  const el = document.activeElement as HTMLElement | null;
  if (el && el !== document.body) el.click();
  else navigate("down");
}
function back() {
  const layer = topLayer();
  const b = [...layer.querySelectorAll<HTMLElement>('[data-back], [data-act="resume"], [data-close], .back')].find(
    visible,
  );
  if (b) return b.click();
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
}

const prev: boolean[] = [];
let navT = 0,
  lastNav: Dir | null = null,
  lastPoll = 0;
export const padState = { connected: false, brand: "xbox" as PadBrand };

export function pollGamepad() {
  const list = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
  const gp = [...(list ?? [])].find((g) => g && g.connected) ?? null;
  const now = performance.now();
  const dt = lastPoll ? Math.min(0.1, (now - lastPoll) / 1000) : 0;
  lastPoll = now;
  if (!gp) {
    if (padState.connected) {
      padState.connected = false;
      pad.x = pad.y = 0;
      for (const [i, a] of buttonActions()) if (prev[i]) actionUp(a);
      prev.length = 0;
    }
    return;
  }
  if (!padState.connected) {
    padState.connected = true;
    padState.brand = padBrand(gp.id);
    document.documentElement.dataset.pad = padState.brand;
  }
  const down = gp.buttons.map((b) => b.pressed || b.value > 0.5);
  const edge = (i: number) => down[i] && !prev[i];
  const any = down.some(Boolean) || Math.hypot(gp.axes[0] ?? 0, gp.axes[1] ?? 0) > 0.5;
  if (any) document.documentElement.dataset.input = "pad";
  const menu = GS.scene !== "play" || GS.paused;
  const [sx, sy] = stick(gp.axes[0] ?? 0, gp.axes[1] ?? 0);
  const map = buttonActions();
  if (menu) {
    pad.x = pad.y = 0;
    let dir: Dir | null = down[12] ? "up" : down[13] ? "down" : down[14] ? "left" : down[15] ? "right" : null;
    if (!dir && Math.hypot(sx, sy) > 0.5)
      dir = Math.abs(sx) > Math.abs(sy) ? (sx > 0 ? "right" : "left") : sy > 0 ? "down" : "up";
    if (dir) {
      navT -= dt;
      if (dir !== lastNav || navT <= 0) {
        navigate(dir);
        navT = dir === lastNav ? 0.12 : 0.35;
      }
    }
    lastNav = dir;
    if (edge(0)) confirm();
    if (edge(1)) back();
    // LB/RB đổi tab trong menu (như Q/E trên bàn phím)
    if (edge(4) || edge(5))
      document.dispatchEvent(new KeyboardEvent("keydown", { key: edge(4) ? "q" : "e", bubbles: true }));
    if (edge(9)) {
      if (GS.scene === "play") actionDown("pause");
      else back();
    }
    // nhả mọi thao tác trận đang giữ
    for (const [i, a] of map) if (prev[i] && !down[i]) actionUp(a);
  } else {
    pad.x = sx;
    pad.y = sy;
    for (const [i, a] of map) {
      if (edge(i)) actionDown(a);
      else if (prev[i] && !down[i]) actionUp(a);
    }
  }
  for (let i = 0; i < down.length; i++) prev[i] = !!down[i];
}
