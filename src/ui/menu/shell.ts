import { GS } from "../../core/state";
import { releaseAll } from "../../core/input";
import { flushPending } from "../../core/loop";
import { navigate } from "../../core/gamepad";
import { MENU } from "../../data/menu-content";
import { Server } from "../../server/server";
import { button, currency, h } from "../ds";
import { icon } from "../icons/icons";
import { wishKey, wishPlaying } from "../wish/player";
import "./menu.css";

/**
 * Khung menu lớp phủ (S10). Người chơi luôn ở trong thế giới; menu tạm dừng game và vẽ màn lên trên.
 * Mỗi màn đăng ký qua registerScreen(); render có thể trả Promise (hiện trạng thái đang tải),
 * ném lỗi thì hiện hộp lỗi có nút Thử lại. Xem docs/ux/menu.md.
 */
export interface MenuScreen {
  title: string;
  icon?: string;
  render(host: HTMLElement, params: any): void | Promise<void>;
  /** Phím riêng của màn (←/→ đổi nhân vật, Q/E đổi tab). Trả true nếu đã xử lý. */
  onKey?(e: KeyboardEvent): boolean;
  onClose?(): void;
}
const REG: Record<string, MenuScreen> = {};
export const registerScreen = (id: string, s: MenuScreen) => (REG[id] = s);

const stack: { id: string; params: any }[] = [];
let root: HTMLElement, body: HTMLElement, title: HTMLElement, wallets: HTMLElement, backBtn: HTMLButtonElement;
let opener: HTMLElement | null = null;
let seq = 0;

export const menuOpen = () => !!root && !root.hidden;
export const currentScreen = () => stack[stack.length - 1]?.id ?? null;

function build() {
  root = h("div", {
    id: "ttMenu",
    class: "tt-root tt-menu",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "ttMenuTitle",
    hidden: true,
  });
  root.style.setProperty("--menu-ms", `${MENU.transitionMs}ms`);
  backBtn = button("Quay lại", { variant: "ghost", icon: "quay-lai", onClick: () => back() });
  backBtn.dataset.back = "";
  backBtn.id = "ttMenuBack";
  title = h("h2", { id: "ttMenuTitle", class: "tt-h2" });
  wallets = h("div", { class: "tt-menu-wallets" });
  const close = button("Đóng menu", { variant: "ghost", icon: "dong", iconOnly: true, onClick: () => closeMenu() });
  close.id = "ttMenuClose";
  body = h("main", { id: "ttMenuBody", class: "tt-menu-body" });
  root.append(h("header", { class: "tt-menu-top" }, [backBtn, title, wallets, close]), body);
  document.body.append(root);
}

export function refreshWallets() {
  if (!wallets) return;
  wallets.replaceChildren(currency("da-sao", Server.P.gems), currency("xu", Server.P.coin));
}

/** Mở menu ở màn id (mặc định menu chính). Đang mở thì đẩy thêm màn mới vào ngăn xếp. */
export function openMenu(id = "main", params: any = {}) {
  if (!REG[id]) throw new Error(`Không có màn menu "${id}"`);
  if (!menuOpen()) {
    opener = document.activeElement as HTMLElement | null;
    stack.length = 0;
    if (id !== "main") stack.push({ id: "main", params: {} });
    if (GS.G) flushPending();
    releaseAll();
    GS.paused = true;
    GS.overlay = "menu";
    root.hidden = false;
    root.classList.remove("is-open");
    void root.offsetWidth;
    root.classList.add("is-open");
  }
  stack.push({ id, params });
  return show();
}

/** Thay màn trên cùng (đổi params, không thêm vào ngăn xếp). */
export function replaceScreen(id: string, params: any = {}) {
  stack[stack.length - 1] = { id, params };
  return show();
}

export function back() {
  if (stack.length <= 1) return closeMenu();
  REG[currentScreen()!]?.onClose?.();
  stack.pop();
  return show();
}

export function closeMenu() {
  if (!menuOpen()) return;
  for (const s of stack) REG[s.id]?.onClose?.();
  stack.length = 0;
  root.classList.remove("is-open");
  root.hidden = true;
  body.replaceChildren();
  GS.overlay = null;
  if (document.getElementById("modal")?.hidden !== false) GS.paused = false;
  (opener && document.contains(opener) ? opener : (document.getElementById("game") as HTMLElement | null))?.focus?.();
  opener = null;
  document.dispatchEvent(new CustomEvent("tt-menu-close"));
}

/** Vẽ lại màn hiện tại (sau khi dữ liệu đổi). */
export const rerender = () => show(false);

async function show(anim = true) {
  const top = stack[stack.length - 1]!;
  const scr = REG[top.id]!;
  const my = ++seq;
  const t0 = performance.now();
  title.replaceChildren(scr.icon ? icon(scr.icon, { size: 24 }) : "", scr.title);
  backBtn.querySelector(".tt-btn-label")!.textContent = stack.length > 1 ? "Quay lại" : "Tiếp tục";
  root.dataset.screen = top.id;
  root.removeAttribute("data-ready");
  refreshWallets();
  const host = h("div", { class: "tt-menu-screen" + (anim ? " is-enter" : ""), "data-screen": top.id });
  const keepScroll = anim ? 0 : (body.firstElementChild as HTMLElement | null)?.scrollTop ?? 0;
  body.replaceChildren(host);
  try {
    const r = scr.render(host, top.params);
    if (r instanceof Promise) {
      const wait = h("div", { class: "tt-menu-loading", role: "status" }, [
        h("span", { class: "tt-spinner", "aria-hidden": "true" }),
        "Đang tải…",
      ]);
      body.append(wait);
      try {
        await r;
      } finally {
        wait.remove();
      }
    }
    if (my !== seq) return;
    host.scrollTop = keepScroll;
    root.dataset.ready = "";
    root.dataset.ms = String(Math.round(performance.now() - t0));
    if (anim) focusFirst(host);
  } catch (err) {
    if (my !== seq) return;
    console.warn(err);
    const retry = button("Thử lại", { variant: "primary", icon: "lam-moi", onClick: () => show() });
    body.replaceChildren(
      h("div", { class: "tt-menu-error", role: "alert" }, [
        icon("bao-loi", { size: 40 }),
        h("h3", { class: "tt-h3" }, ["Không mở được màn này"]),
        h("p", {}, [String((err as Error)?.message ?? err)]),
        retry,
      ]),
    );
    root.dataset.ready = "error";
    retry.focus();
  }
}

const FOCUSABLE = "[autofocus], button:not(:disabled), [href], input, select, textarea, [tabindex='0']";
function focusFirst(host: HTMLElement) {
  const el = host.querySelector<HTMLElement>("[autofocus]") ?? host.querySelector<HTMLElement>(FOCUSABLE) ?? backBtn;
  el.focus({ preventScroll: true });
}

const DIRS: Record<string, "up" | "down" | "left" | "right"> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};
function onKey(e: KeyboardEvent) {
  if (wishPlaying()) {
    if (wishKey(e) || e.key !== "Tab") e.stopImmediatePropagation();
    return;
  }
  if (!menuOpen()) return;
  // hộp thoại DS (Cài đặt, xác nhận) nằm trên menu: để nó tự xử lý
  if ([...document.querySelectorAll<HTMLElement>(".tt-scrim")].some((s) => !s.hidden && s.offsetParent !== null))
    return;
  const a = document.activeElement as HTMLElement | null;
  const typing = !!a && (/^(INPUT|SELECT|TEXTAREA)$/.test(a.tagName) || a.isContentEditable);
  const inTabs = !!a?.closest("[role=tablist]");
  let done = false;
  if (e.key === "Escape" || (e.key === "Backspace" && !typing)) {
    back();
    done = true;
  } else if (!typing && REG[currentScreen()!]?.onKey?.(e)) done = true;
  else if (DIRS[e.key] && !typing && !inTabs) {
    navigate(DIRS[e.key]!);
    done = true;
  }
  if (done) e.preventDefault();
  // game đang dừng: không để phím menu lọt xuống điều khiển trận
  if (e.key !== "Tab") e.stopImmediatePropagation();
}

export function initMenuShell() {
  build();
  addEventListener("keydown", onKey, { capture: true });
}
