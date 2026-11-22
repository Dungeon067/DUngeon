import { GS } from "../core/state";
import { $, clamp } from "../core/util";

/* =========================================================
   GAME STATE
   ========================================================= */
export const cv = $("game"),
  ctx = cv.getContext("2d");
export function resize() {
  GS.DPR = Math.min(2, window.devicePixelRatio || 1);
  GS.VW = window.innerWidth;
  GS.VH = window.innerHeight;
  cv.width = Math.round(GS.VW * GS.DPR);
  cv.height = Math.round(GS.VH * GS.DPR);
  GS.ZOOM = clamp(Math.min(GS.VW, GS.VH) / 620, 0.72, 1.35);
}

export function init(): void {
  addEventListener("resize", resize);
  resize();
}
