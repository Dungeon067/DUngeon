import { HOOKS } from "./hooks";
import { runBlock } from "./blocks";
import { consumeStatus, hasStatus } from "../status";

/* Sương Mai: Giọt Sương cho trọng kích rút kiếm, phản đòn hồi năng lượng, đòn thường mạnh hơn lên quái Ướt Sương. */
HOOKS.suongmai = {
  dac: {
    rutKiem: (b, c) => {
      const n = consumeStatus(c.m, "giotSuong");
      runBlock(
        {
          ...b,
          k: "chem",
          r: b.r + n * 10,
          goc: 150,
          xa: 0,
          m: b.m + 0.6 * n,
          sts: n ? b.sts : [],
          fx: "rutKiem",
        } as any,
        c,
      );
    },
  },
  onCounter: (m) => (m.energy = Math.min(m.c.burst.cost, m.energy + 4)),
  dmgBonus: (e, _m, o) => (o.normal && hasStatus(e, "uotSuong") ? 0.1 : 0),
};
