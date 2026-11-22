import { GS } from "./core/state";
import { portraitCache } from "./art/chibi";
import { frame } from "./core/loop";
import { $ } from "./core/util";
import { Server } from "./server/server";
import { init as initCanvas } from "./core/canvas";
import { init as initInput } from "./core/input";
import { init as initModal } from "./ui/modal";
import { go, init as initScreens, renderHub } from "./ui/screens";
import { init as initWish } from "./ui/wish";
import { init as initAdmin } from "./ui/admin";
import { initHud } from "./ui/hud";
import { initBigMap } from "./ui/hud/map";
import { initLayoutEditor } from "./ui/hud/layout";
import { initRotate } from "./ui/hud/rotate";
import { initHints } from "./ui/hud/hints";
import { applyDocumentSettings } from "./core/settings";

/* =========================================================
   BOOT
   ========================================================= */
function start(data: any) {
  Server.load();
  if (data && data.P) Server.P = data.P;
  go("hub");
  requestAnimationFrame(frame);
  if (document.fonts)
    document.fonts.ready.then(() => {
      for (const k in portraitCache) delete portraitCache[k];
      if (GS.scene === "menu") {
        const vis = [...document.querySelectorAll(".screen")].find((s: any) => !s.hidden);
        if (vis === $("sHub")) renderHub();
      }
    });
}

// Thứ tự khởi tạo giữ đúng thứ tự chạy trong bản một file.
applyDocumentSettings();
initCanvas();
initHud();
initInput();
initBigMap();
initLayoutEditor();
initRotate();
initHints();
initModal();
initScreens();
initWish();
initAdmin();
if (import.meta.env.DEV || new URLSearchParams(location.search).has("dev"))
  void import("./dev/tuning").then((m) => m.initTuning());
window.claude?.hot?.snapshot?.(() => ({ P: Server.P }));
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});

// Móc kiểm thử: chỉ bật khi URL có ?e2e, để Playwright đọc trạng thái game. Người chơi không bị ảnh hưởng.
if (new URLSearchParams(location.search).has("e2e")) Object.assign(window, { __tinhtu: { S: GS, Server } });
