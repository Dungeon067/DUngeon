import { GS } from "../../core/state";
import { $ } from "../../core/util";

/* Chỉ chơi màn ngang (A.3): cầm dọc trên thiết bị cảm ứng thì hiện lớp phủ và tạm dừng. */

export const isPortrait = () => innerHeight > innerWidth;
/** Thiết bị cảm ứng (điện thoại, máy tính bảng). Máy tính có cửa sổ hẹp không bị chặn. */
export const isHandheld = () =>
  matchMedia("(pointer: coarse)").matches || (navigator.maxTouchPoints > 0 && !matchMedia("(hover: hover)").matches);

let pausedByRotate = false;
export function checkOrientation() {
  const el = $("rotateOverlay");
  const block = isHandheld() && isPortrait();
  if (block === !el.hidden) return;
  el.hidden = !block;
  document.body.classList.toggle("is-portrait-block", block);
  if (block) {
    if (!GS.paused) {
      GS.paused = true;
      pausedByRotate = true;
    }
  } else if (pausedByRotate) {
    pausedByRotate = false;
    if (!GS.overlay && $("modal").hidden) GS.paused = false;
  }
}

/** Khi vào trận: xin toàn màn hình và khóa ngang nếu trình duyệt hỗ trợ (iOS Safari không có: dựa vào lớp phủ). */
export async function requestLandscape() {
  if (!isHandheld()) return;
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen)
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
  } catch {
    /* người chơi hoặc trình duyệt từ chối */
  }
  try {
    await (screen.orientation as any)?.lock?.("landscape");
  } catch {
    /* không hỗ trợ khóa hướng */
  }
  checkOrientation();
}

export function initRotate() {
  addEventListener("resize", checkOrientation);
  screen.orientation?.addEventListener?.("change", checkOrientation);
  checkOrientation();
}
