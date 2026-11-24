/**
 * S27: vũ khí trong tay hay đã cất. Dùng chung cho renderer 3D và 2D.
 * Rút: ngay khi đánh thường / kỹ năng / nộ (p.act). Giữ trong tay khi vừa đánh (< cho giây) hoặc còn quái gần.
 * Cất: thôi đánh và không còn quái gần quá `cho` giây.
 */
export interface ArmCfg {
  cho: number;
  gan: number;
}

export function weaponOut(p: any, enemies: Iterable<any>, T: number, cfg: ArmCfg): boolean {
  const t0 = p.act?.t0 ?? -1e9;
  if (p._wNeed === undefined || t0 > p._wNeed) p._wNeed = t0;
  const out = T - p._wNeed < cfg.cho;
  if (out) {
    const g2 = cfg.gan * cfg.gan;
    for (const e of enemies) {
      if (e.dead) continue;
      const dx = e.x - p.x,
        dy = e.y - p.y;
      if (dx * dx + dy * dy < g2) {
        p._wNeed = Math.max(p._wNeed, T - 0.001);
        break;
      }
    }
  }
  return out;
}
