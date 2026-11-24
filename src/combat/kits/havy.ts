import { GS } from "../../core/state";
import { dist } from "../../core/util";
import { fxText } from "../../entities/fx";
import { cur } from "../../entities/party";
import { HOOKS } from "./hooks";
import { applyDebuffs, kfx } from "./blocks";
import { addStatus } from "../status";

/* Hạ Vy: khâu tối đa 3 quái bằng chỉ băng; tự bọc khiên cứu đồng đội sắp gục (kể cả khi ngoài sân). */
HOOKS.havy = {
  dac: {
    khauBang: (b, c) => {
      const ls = GS.G.enemies
        .filter((e: any) => !e.dead && dist(c.x, c.y, e.x, e.y) < b.r + e.r)
        .sort((u: any, v: any) => dist(c.x, c.y, u.x, u.y) - dist(c.x, c.y, v.x, v.y))
        .slice(0, 3);
      for (const e of ls) applyDebuffs(e, b, c);
      if (ls.length) kfx("chiBang", c, c.x, c.y, b.r, 0.8, { pts: ls.map((e: any) => [e.x, e.y]) });
    },
  },
  tick: (m, dt) => {
    m.rescueCd = Math.max(0, (m.rescueCd ?? 0) - dt);
    const a = cur();
    if (!m.alive || m.rescueCd > 0 || !a?.alive || a.hp > a.maxHp * 0.3 || GS.G.over) return;
    const p = GS.G.p;
    m.rescueCd = 20;
    p.shield = Math.max(p.shield, m.maxHp * 0.3);
    p.shieldMax = p.shield;
    p.shieldT = 10;
    addStatus(a, "aoBuom", { t: 10 });
    fxText(p.x, p.y - 60, "Mũi Vá Buồm", "#8fdcff", 15, true);
    kfx("aoBuom", { m, x: p.x, y: p.y, ang: 0, cast: null }, p.x, p.y, 40, 0.9);
  },
};
