import { GS } from "./state";
import { FEEL, feelState } from "../combat/feel";

/** Điểm camera hướng tới: nhân vật cộng một đoạn nhìn trước theo hướng chạy. */
export function cameraTarget(dt: number) {
  const p = GS.G.p,
    C = FEEL.camera,
    lead = p.moving ? C.lead : 0;
  const k = Math.min(1, dt * C.leadSpeed);
  feelState.leadX += (p.dirX * lead - feelState.leadX) * k;
  feelState.leadY += (p.dirY * lead * 0.7 - feelState.leadY) * k;
  return { x: p.x + feelState.leadX, y: p.y - 20 + feelState.leadY };
}

/** Thu phóng theo tình huống: kéo ra khi có boss, kéo vào khi dùng nộ. Chạy theo thời gian thật. */
export function updateZoom(dt: number) {
  const C = FEEL.camera;
  if (feelState.burstT > 0) feelState.burstT -= dt;
  const b = GS.G.boss;
  const target = feelState.burstT > 0 ? C.burstZoom : b && !b.dead ? C.bossZoom : 1;
  GS.camZoom += (target - GS.camZoom) * Math.min(1, dt * C.zoomSpeed);
  GS.ZOOM = GS.BASE_ZOOM * GS.camZoom;
}
