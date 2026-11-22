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
initCanvas();
initInput();
initModal();
initScreens();
initWish();
initAdmin();
window.claude?.hot?.snapshot?.(() => ({ P: Server.P }));
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});

// Móc kiểm thử: chỉ bật khi URL có ?e2e, để Playwright đọc trạng thái game. Người chơi không bị ảnh hưởng.
if (new URLSearchParams(location.search).has("e2e")) Object.assign(window, { __tinhtu: { S: GS, Server } });
