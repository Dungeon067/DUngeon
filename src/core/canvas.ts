import { GS } from "../core/state";
import { $, clamp } from "../core/util";
import { settings } from "./settings";

const DPR_CAP = { high: 2, medium: 1.5, low: 1 } as const;

/* =========================================================
   GAME STATE
   ========================================================= */
export const cv: any = $("game"),
  ctx = cv.getContext("2d")!;
export function resize() {
  GS.DPR = Math.min(DPR_CAP[settings.quality], window.devicePixelRatio || 1);
  GS.VW = window.innerWidth;
  GS.VH = window.innerHeight;
  cv.width = Math.round(GS.VW * GS.DPR);
  cv.height = Math.round(GS.VH * GS.DPR);
  GS.BASE_ZOOM = clamp(Math.min(GS.VW, GS.VH) / 620, 0.72, 1.35);
  GS.ZOOM = GS.BASE_ZOOM * GS.camZoom;
}

export function init(): void {
  addEventListener("resize", resize);
  resize();
}
