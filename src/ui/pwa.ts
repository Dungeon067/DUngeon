import { registerSW } from "virtual:pwa-register";
import { flushPending } from "../core/loop";
import { $ } from "../core/util";

/* =========================================================
   BẢN CÀI ĐẶT (S22): service worker, thông báo cập nhật, gợi ý cài PWA,
   toàn màn hình. Bản Android/iOS (Capacitor) và máy tính (Tauri) không dùng service worker.
   ========================================================= */

export const RELEASES_URL = "https://github.com/Dungeon067/DUngeon/releases/latest";
const PWA_KEY = "tinhtu-pwa-v1";

type Win = Window & {
  Capacitor?: { isNativePlatform?: () => boolean };
  __TAURI_INTERNALS__?: unknown;
  __TAURI__?: any;
};
const w = window as Win;
export const isCapacitor = () => !!w.Capacitor?.isNativePlatform?.();
export const isTauri = () => "__TAURI_INTERNALS__" in w;
export const isNativeApp = () => isCapacitor() || isTauri();

/** Đang chạy như ứng dụng đã cài (PWA ở màn hình chính, hoặc bản Capacitor/Tauri). */
export const isStandalone = () =>
  isNativeApp() ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true ||
  matchMedia("(display-mode: standalone)").matches ||
  // Fullscreen API trên tab thường cũng khớp display-mode: fullscreen, không tính là đã cài.
  (matchMedia("(display-mode: fullscreen)").matches && !document.fullscreenElement);

/** iPhone, iPad (iPadOS báo là Mac nhưng có màn cảm ứng). */
export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
/** Safari trên iOS: chỉ Safari có mục "Thêm vào MH chính" (Chrome, Firefox iOS dùng menu riêng). */
export const isIOSSafari = () =>
  isIOS() && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS/.test(navigator.userAgent);

function store(): { iosHint?: number } {
  try {
    return JSON.parse(localStorage.getItem(PWA_KEY) || "{}");
  } catch {
    return {};
  }
}
function save(v: { iosHint?: number }) {
  try {
    localStorage.setItem(PWA_KEY, JSON.stringify({ ...store(), ...v }));
  } catch {
    /* bỏ qua */
  }
}

/* ---------------- cài đặt trên Android/Chrome/Edge ---------------- */
interface InstallEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
let deferred: InstallEvent | null = null;
const listeners = new Set<() => void>();
export const onInstallChange = (f: () => void) => (listeners.add(f), () => listeners.delete(f));
export const canInstall = () => !!deferred;
export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false;
  const e = deferred;
  deferred = null;
  listeners.forEach((f) => f());
  await e.prompt();
  return (await e.userChoice).outcome === "accepted";
}

/* ---------------- toàn màn hình ---------------- */
type FsDoc = Document & {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
};
type FsEl = HTMLElement & { webkitRequestFullscreen?: () => void };
const d = document as FsDoc;
export const fullscreenSupported = () => isTauri() || !!(d.fullscreenEnabled || d.webkitFullscreenEnabled);
export const isFullscreen = () => !!(d.fullscreenElement || d.webkitFullscreenElement);
export async function toggleFullscreen(): Promise<void> {
  if (isTauri()) {
    const win = w.__TAURI__?.window?.getCurrentWindow?.();
    if (win) await win.setFullscreen(!(await win.isFullscreen()));
    return;
  }
  const el = document.documentElement as FsEl;
  try {
    if (isFullscreen()) await (d.exitFullscreen?.() ?? d.webkitExitFullscreen?.());
    else if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
    else el.webkitRequestFullscreen?.();
  } catch {
    /* trình duyệt từ chối */
  }
}

/* ---------------- banner gợi ý cài trên Safari iOS (hiện một lần) ---------------- */
export function maybeShowIOSHint(force = false) {
  if (!force && (!isIOSSafari() || isStandalone() || store().iosHint)) return;
  const el = $("pwaHint");
  el.hidden = false;
  save({ iosHint: Date.now() });
  $("pwaHintClose").focus({ preventScroll: true });
}

/* ---------------- cập nhật ---------------- */
export function initPwa() {
  $("pwaHintClose").addEventListener("click", () => ($("pwaHint").hidden = true));
  addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallEvent;
    listeners.forEach((f) => f());
  });
  addEventListener("appinstalled", () => {
    deferred = null;
    listeners.forEach((f) => f());
  });
  // F11 cũng bật/tắt toàn màn hình ở bản máy tính (Tauri); trình duyệt tự xử lý F11.
  addEventListener("keydown", (e) => {
    if (e.key === "F11" && isTauri()) {
      e.preventDefault();
      void toggleFullscreen();
    }
  });
  setTimeout(() => maybeShowIOSHint(), 1500);
  const q = new URLSearchParams(location.search);
  if (isNativeApp() || !("serviceWorker" in navigator) || (q.has("e2e") && !q.has("sw"))) return;
  const update = registerSW({
    onNeedRefresh() {
      const b = $("pwaUpdate") as HTMLButtonElement;
      b.hidden = false;
      b.onclick = () => {
        b.disabled = true;
        flushPending();
        void update(true);
      };
    },
  });
}
