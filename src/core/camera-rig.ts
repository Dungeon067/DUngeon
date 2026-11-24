/**
 * Camera va chạm tường + ngăn xếp trạng thái (hợp nhất C). Khung rỗng, chưa bật (content/camera.yaml bat: false).
 * Va chạm: ý tưởng từ norio/vrm-game-starter src/app/CameraRig.ts (MIT, © 2026 norio): bắn tia từ nhân vật ra camera
 * (giữa + 4 góc khung gần), lấy điểm chạm gần nhất trừ đệm. Ngăn xếp: ý tưởng từ 526077247/GenshinGamePlay (MIT).
 */
import raw from "../../content/camera.yaml";
import { CameraSchema, type CameraCfg, type CamState } from "../data/hop-nhat-schema";

export const CAMERA: CameraCfg = CameraSchema.parse(raw);

/** Khoảng cách camera được phép: điểm chạm gần nhất trừ đệm, không gần hơn `gan`. */
export function collideDistance(want: number, hits: number[], dem = CAMERA.vaCham.dem, gan = CAMERA.vaCham.gan) {
  let d = want;
  for (const h of hits) if (h >= 0 && h - dem < d) d = h - dem;
  return Math.max(Math.min(gan, want), d);
}
/** Kéo vào nhanh khi chạm tường, nới ra từ từ khi hết vật cản. */
export class CamCollide {
  d = -1;
  constructor(private C = CAMERA.vaCham) {}
  update(dt: number, want: number, hits: number[]) {
    const allow = collideDistance(want, hits, this.C.dem, this.C.gan);
    if (this.d < 0) this.d = allow;
    const k = allow < this.d ? this.C.keoVao : this.C.noiRa;
    this.d += (allow - this.d) * Math.min(1, dt * k);
    return Math.min(this.d, allow);
  }
}
export interface CamOut {
  xa: number;
  goc: number;
  fov: number;
}
/** Ngăn xếp trạng thái camera: trạng thái ưu tiên cao nhất thắng, chuyển qua lại có pha trộn theo `tron` giây. */
export class CamStack {
  private on = new Map<string, CamState>();
  private cur: CamOut;
  constructor(private S = CAMERA.trangThai) {
    const b = S.thuong ?? Object.values(S)[0];
    this.cur = { xa: b.xa, goc: b.goc, fov: b.fov };
  }
  push(id: string) {
    const s = this.S[id];
    if (!s) throw new Error(`không có trạng thái camera ${id}`);
    this.on.set(id, s);
  }
  pop(id: string) {
    this.on.delete(id);
  }
  top(): [string, CamState] {
    let best: [string, CamState] = ["thuong", this.S.thuong];
    for (const e of this.on) if (e[1].uuTien > best[1].uuTien) best = e;
    return best;
  }
  update(dt: number): CamOut {
    const s = this.top()[1],
      k = Math.min(1, (3 * dt) / s.tron);
    this.cur = {
      xa: this.cur.xa + (s.xa - this.cur.xa) * k,
      goc: this.cur.goc + (s.goc - this.cur.goc) * k,
      fov: this.cur.fov + (s.fov - this.cur.fov) * k,
    };
    return this.cur;
  }
}
