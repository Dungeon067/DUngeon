import { GS } from "../core/state";
import { dealRaw, hitEnemy } from "../combat/damage";
import { sfx } from "../core/audio";
import { dist, rand } from "../core/util";
import { EL } from "../data/content";
import { shake } from "../combat/feel";
import { fxBurst, fxRing, fxText, later } from "../entities/fx";

export function applyElement(e: any, el: string, m: any) {
  if (!el) return { mult: 1 };
  const a = e.aura;
  const react = (name: string, col: string) => {
    GS.G.pending.react++;
    fxText(e.x, e.y - (e.isBoss ? 80 : 44), name, col, 15);
    sfx("react");
  };
  if (el === "wind") {
    if (a && a !== "wind" && a !== "earth") {
      e.aura = null;
      react("Khuếch Tán", EL.wind.c);
      swirl(e, a, m);
    }
    return { mult: 1 };
  }
  if (el === "earth") {
    if (a && a !== "wind" && a !== "earth") {
      e.aura = null;
      react("Kết Tinh", EL.earth.c);
      GS.G.pickups.push({ k: "shard", x: e.x + rand(-20, 20), y: e.y + rand(-10, 10), el: a, t: 12, vy: 0 });
    }
    return { mult: 1 };
  }
  if (!a || a === el) {
    e.aura = el;
    e.auraT = 7;
    return { mult: 1 };
  }
  e.aura = null;
  const pair = new Set([a, el]);
  const has = (x: string, y: string) => pair.has(x) && pair.has(y);
  if (has("fire", "water")) {
    react("Bốc Hơi", "#ffb27a");
    return { mult: el === "water" ? 2 : 1.5 };
  }
  if (has("fire", "ice")) {
    react("Tan Chảy", "#ffcf8a");
    return { mult: el === "fire" ? 2 : 1.5 };
  }
  if (has("fire", "bolt")) {
    react("Quá Tải", EL.fire.c);
    later(0, () => {
      fxRing(e.x, e.y - 10, 90, EL.fire.c, 0.4, 8);
      fxBurst(e.x, e.y - 10, EL.fire.c, 16, 220);
      shake("react");
      for (const o of GS.G.enemies) {
        if (o.dead) continue;
        const d = dist(e.x, e.y, o.x, o.y);
        if (d < 90 + o.r) {
          dealRaw(o, m.st.atk * 1.8, EL.fire.c);
          if (!o.isBoss) {
            const k = (1 - d / 120) * 260;
            const an = Math.atan2(o.y - e.y, o.x - e.x);
            o.kx += Math.cos(an) * k;
            o.ky += Math.sin(an) * k;
          }
        }
      }
    });
    return { mult: 1 };
  }
  if (has("water", "bolt")) {
    react("Điện Cảm", EL.bolt.c2);
    e.ec = { t: 0.5, n: 4, dmg: m.st.atk * 0.55 };
    return { mult: 1 };
  }
  if (has("water", "ice")) {
    react("Đóng Băng", EL.ice.c2);
    e.frozen = e.isBoss ? 1.2 : 3;
    return { mult: 1 };
  }
  if (has("bolt", "ice")) {
    react("Siêu Dẫn", "#c9b8ff");
    e.vuln = 8;
    later(0, () => {
      fxRing(e.x, e.y - 10, 80, "#c9b8ff", 0.35, 6);
      for (const o of GS.G.enemies) {
        if (!o.dead && dist(e.x, e.y, o.x, o.y) < 80 + o.r) {
          dealRaw(o, m.st.atk * 0.7, "#c9b8ff");
          o.vuln = 8;
        }
      }
    });
    return { mult: 1 };
  }
  e.aura = el;
  e.auraT = 7;
  return { mult: 1 };
}
/** Xung gió (chỉ để hiển thị: tóc, vải bay); khóa `k` trong gio.xung của content/poses.yaml. */
export function gust(k: string, x: number, y: number) {
  const g = (GS.G.gusts ??= []);
  g.push({ k, x, y });
  if (g.length > 16) g.shift();
}
export function swirl(e: any, el: string, m: any) {
  gust("swirl", e.x, e.y);
  later(0, () => {
    fxRing(e.x, e.y - 10, 110, EL[el].c, 0.45, 7);
    fxBurst(e.x, e.y - 12, EL[el].c, 14, 200);
    for (const o of GS.G.enemies) {
      if (o.dead) continue;
      if (dist(e.x, e.y, o.x, o.y) < 110 + o.r) {
        hitEnemy(o, m, 0.9, el, { noEnergy: true, noKb: true });
      }
    }
  });
}
