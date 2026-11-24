import { GS } from "../core/state";
import { releaseAll } from "../core/input";
import { flushPending } from "../core/loop";
import { startWorld } from "../modes/world";
import { Server } from "../server/server";
import { closeModal } from "../ui/modal";
import { refreshQuickDots } from "./hud";
import { closeMenu, openMenu, refreshWallets } from "./menu/shell";

/* Điều hướng giữa các chế độ (S10). Không còn sảnh: người chơi luôn quay về Đảo Lạc,
   các màn quản lý là lớp phủ menu mở từ thế giới. */

/** Ghi lại vị trí trên đảo trước khi rời sang Tháp/Boss để quay về đúng chỗ. */
export function leaveWorld() {
  const G = GS.G;
  if (G?.mode !== "world") return;
  flushPending();
  GS.worldPos = { x: G.p.x, y: G.p.y, rx: G.respawn.x, ry: G.respawn.y };
}

/** Rời Tháp/Boss (hoặc khởi động) và về Đảo Lạc; screen: mở sẵn một màn menu. */
export function exitToMenu(screen?: string) {
  if (GS.G && GS.G.mode !== "world") {
    flushPending();
    if (!GS.G._ended)
      Server.req("logQuit", {
        mode: GS.G.mode,
        at:
          GS.G.mode === "tower"
            ? `tầng ${GS.G.tower.floor}`
            : GS.G.mode === "domain"
              ? GS.G.dom.d.ten
              : GS.G.mode === "baoan"
                ? `${GS.G.ba.ten} · Thiên Tượng ${GS.G.ba.tt}`
                : `cấp ${GS.G.opt?.lv}`,
      });
  }
  closeModal();
  closeMenu();
  releaseAll();
  GS.overlay = null;
  if (GS.G?.mode !== "world") startWorld();
  updateWallets();
  if (screen) openMenu(screen);
}

export function updateWallets() {
  refreshWallets();
  refreshQuickDots();
}
