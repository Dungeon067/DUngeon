import { GS } from "../core/state";
import { sfx } from "../core/audio";
import { FEEL } from "../combat/feel";
import { dist } from "../core/util";

/** Âm báo trước đòn: một tiếng khi bắt đầu, một tiếng cao hơn khi sắp đánh. Chỉ phát khi quái ở gần. */
export function teleWarn(e: any, tl: any, k: number) {
  if (!tl) return;
  const T = FEEL.telegraph;
  if (!T.sound) return;
  const near = dist(e.x, e.y, GS.G.p.x, GS.G.p.y) < T.warnRange;
  if (!tl.w1) {
    tl.w1 = true;
    if (near) sfx(e.isBoss ? "warnBoss" : "warn");
  }
  if (!tl.w2 && k >= T.flashAt) {
    tl.w2 = true;
    if (near) sfx("warn2");
  }
}
