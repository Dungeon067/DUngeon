import { GS } from "../../core/state";
import { fxText } from "../../entities/fx";
import { HOOKS } from "./hooks";
import { runBlock } from "./blocks";
import { addStatus, consumeStatus, stacksOf } from "../status";

/* Lôi Đình: Nhịp Vó cho trọng kích phi thương, Lao Kép bấm lại, Cọc Sấm và đánh tay không. */
const lao = (b: any, c: any, m: number) =>
  runBlock(
    { k: "lao", quang: b.r, t: 0.22, r: 60, m, el: b.el, sts: b.sts, lui: false, lap: 1, cach: 0, fx: "laoSam" } as any,
    c,
  );
const UNARMED = [
  { m: 0.55, clip: "loidinh.unarmed1" },
  { m: 0.6, clip: "loidinh.unarmed2" },
  { m: 0.95, clip: "loidinh.unarmed3", el: true },
];
HOOKS.loidinh = {
  dac: {
    phiThuong: (b, c) => {
      const n = consumeStatus(c.m, "nhipVo");
      if (n) fxText(GS.G.p.x, GS.G.p.y - 60, `Nhịp Vó ×${n}`, "#ffe27a", 15, true);
      lao({ ...b, sts: n >= 3 ? b.sts : [] }, c, b.m + 0.35 * n);
    },
    laoKep: (b, c) => {
      lao({ ...b, sts: [] }, c, b.m);
      c.m.recast = { t: 3, b, c };
    },
    tayKhong: (_b, c) => (c.m.tayKhong = 8),
  },
  recast: (m) => {
    if (!m.recast || m.recast.t <= 0) return false;
    const { b, c } = m.recast;
    m.recast = null;
    GS.G.p.act = { k: "skill", clip: "loidinh.skillTap", t0: GS.G.time };
    lao({ ...b, sts: [] }, { ...c, x: GS.G.p.x, y: GS.G.p.y, ang: GS.G.p.ang }, 1);
    return true;
  },
  chain: (m) => (m.tayKhong > 0 ? UNARMED : null),
  onNormalHit: (m) => {
    if (!(m.tayKhong > 0)) return;
    for (const t of GS.G.turrets) if (t.m === m && t.tag === "cocSam") t.cd = Math.min(t.cd, 0);
  },
  onEc: (m) => addStatus(m, "nhipVo", { t: 15 }),
  atkSpeed: (m) => (stacksOf(m, "nhipVo") >= 5 ? 0.87 : 1),
  tick: (m, dt) => {
    if (m.recast) m.recast.t -= dt;
    if (m.tayKhong > 0) m.tayKhong -= dt;
  },
};
