import { GS } from "../../core/state";
import { HOOKS } from "./hooks";
import { runBlock } from "./blocks";

/* Mai Linh: đèn trời nạp dầu cho đèn, nộ làm nổ mọi đèn, mỗi đèn đang treo tăng sát thương Hỏa. */
const lanterns = (m: any) => GS.G.turrets.filter((t: any) => t.m === m && t.tag === "den" && t.life > 0);
HOOKS.mailinh = {
  dac: {
    napDau: (_b, c) => lanterns(c.m).forEach((t: any) => (t.oil = 3)),
    noDen: (b, c) => {
      for (const t of lanterns(c.m)) {
        runBlock(
          { k: "chem", r: b.r, goc: 360, xa: 0, m: b.m, el: b.el, sts: [], fx: "phaoHoa", lap: 1, cach: 0 } as any,
          {
            ...c,
            x: t.x,
            y: t.y,
          },
        );
        t.life = Math.max(t.life, t.max ?? 8);
      }
    },
  },
  dmgBonus: (_e, m, _o, el) => (el === "fire" ? 0.04 * lanterns(m).length : 0),
};
