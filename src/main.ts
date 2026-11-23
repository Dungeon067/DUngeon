import { DOMAINS, MINI, PZ } from "./data/puzzles";
import { exitDomain, startDomain } from "./modes/domain";
import { pulseElement } from "./world/puzzles";
import { applyRenderer, renderer3d } from "./render3d/select";
import { GS } from "./core/state";
import { portraitCache } from "./art/chibi";
import { frame } from "./core/loop";
import { SAVE_KEY, Server } from "./server/server";
import { ECON_KEY, reloadEcon } from "./data/economy";
import { init as initCanvas } from "./core/canvas";
import { init as initInput } from "./core/input";
import { init as initModal } from "./ui/modal";
import { exitToMenu, updateWallets } from "./ui/screens";
import { initHud } from "./ui/hud";
import { closeMenu, currentScreen, initMenuShell, menuOpen, openMenu, rerender } from "./ui/menu/shell";
import "./ui/menu/screens";
import { initLayoutEditor } from "./ui/hud/layout";
import { initRotate } from "./ui/hud/rotate";
import { initHints } from "./ui/hud/hints";
import { applyDocumentSettings } from "./core/settings";
import { initPwa } from "./ui/pwa";

/* =========================================================
   BOOT
   ========================================================= */
function start(data: any) {
  Server.load();
  if (data && data.P) Server.P = data.P;
  // Không còn sảnh (S10): vào thẳng Đảo Lạc, mọi màn quản lý là lớp phủ menu.
  exitToMenu();
  requestAnimationFrame(frame);
  if (document.fonts)
    document.fonts.ready.then(() => {
      for (const k in portraitCache) delete portraitCache[k];
    });
}

// Thứ tự khởi tạo giữ đúng thứ tự chạy trong bản một file.
applyDocumentSettings();
initCanvas();
void applyRenderer();
initHud();
initInput();
initLayoutEditor();
initRotate();
initHints();
initModal();
initMenuShell();
initPwa();
// Trang Admin (tab khác) vừa ghi hồ sơ: đọc lại để game thấy ngay.
addEventListener("storage", (e) => {
  if (e.key === ECON_KEY) {
    reloadEcon();
    if (menuOpen()) rerender();
    return;
  }
  if (e.key !== SAVE_KEY || !Server.P) return;
  Server.reload();
  updateWallets();
  if (menuOpen()) rerender();
});
if (import.meta.env.DEV || new URLSearchParams(location.search).has("dev"))
  void import("./dev/tuning").then((m) => m.initTuning());
window.claude?.hot?.snapshot?.(() => ({ P: Server.P }));
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});

// Móc kiểm thử: chỉ bật khi URL có ?e2e, để Playwright đọc trạng thái game. Người chơi không bị ảnh hưởng.
if (new URLSearchParams(location.search).has("e2e"))
  Object.assign(window, {
    __tinhtu: {
      S: GS,
      Server,
      r3: renderer3d,
      menu: { openMenu, closeMenu, currentScreen },
      pz: { pulse: pulseElement, startDomain, exitDomain, data: { DOMAINS, MINI, PZ } },
    },
  });
