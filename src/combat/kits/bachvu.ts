import { GS } from "../../core/state";
import { HOOKS } from "./hooks";
import { addStatus, hnOf } from "../status";

/* Bạch Vũ: Khuếch Tán của Bạch Vũ giảm kháng nguyên tố bị hút; lốc trúng lần đầu cho cả đội năng lượng. */
HOOKS.bachvu = {
  onSwirl: (_m, e, el) => addStatus(e, "gioDocTen", { v: 0.2, t: 10, el }),
  onVungHit: (f) => {
    if (f.gaveEnergy) return;
    f.gaveEnergy = true;
    for (const pm of GS.G.party) if (pm.alive) pm.energy = Math.min(pm.c.burst.cost, pm.energy + 2 * hnOf(pm));
  },
};
