import { GS } from "../core/state";
import { clamp, pick, rand } from "../core/util";
import { makeEnemy } from "../entities/enemy";
import { fxRing } from "../entities/fx";
import { newSession } from "../entities/party";
import { endRun, enterPlay, showBanner } from "../modes/session";

export function startTower(floor: number) {
  GS.G = newSession("tower", { floor });
  GS.G.bounds = { x: 0, y: 0, w: 1000, h: 760 };
  GS.G.p.x = 500;
  GS.G.p.y = 620;
  GS.G.tower = { floor, wave: 0, timeLeft: 150, waves: towerWaves(floor), gap: 1.5 };
  enterPlay();
  showBanner(`Tầng ${floor}`);
}
export function towerWaves(f: any) {
  const lv = 1 + Math.round(f * 0.75),
    waves = [];
  for (let w = 0; w < 2; w++) {
    const list = [];
    const n = 3 + Math.floor(f / 2) + w;
    for (let i = 0; i < n; i++) {
      const t = pick(
        f < 3
          ? ["slime", "goblin", "slime"]
          : f < 6
            ? ["slime", "goblin", "archer"]
            : ["goblin", "archer", "shaman", "slime"],
      );
      list.push(t);
    }
    if (f >= 4 && w === 1) list.push("golem");
    if (f >= 10) list.push("golem");
    waves.push({ list, lv: lv + w });
  }
  return waves;
}
export function spawnTowerWave() {
  const T = GS.G.tower,
    w = T.waves[T.wave];
  const B = GS.G.bounds;
  w.list.forEach((type: any, i: number) => {
    const a = (i / w.list.length) * Math.PI + Math.PI;
    const x = B.w / 2 + Math.cos(a) * 300 + rand(-30, 30),
      y = 300 + Math.sin(a) * 160 + rand(-20, 20);
    const e = makeEnemy(type, clamp(x, 60, B.w - 60), clamp(y, 80, B.h - 200), w.lv, type === "golem" ? "earth" : null);
    e.state = "chase";
    GS.G.enemies.push(e);
    fxRing(e.x, e.y - 10, 40, "#ffffff", 0.4);
  });
  showBanner(`Đợt ${T.wave + 1}/${T.waves.length}`);
}
export function towerLogic(dt: number) {
  const T = GS.G.tower;
  if (GS.G.over) return;
  T.timeLeft -= dt;
  if (T.timeLeft <= 0) {
    endRun(false, "Hết thời gian");
    return;
  }
  const alive = GS.G.enemies.some((e: any) => !e.dead);
  if (!alive) {
    T.gap -= dt;
    if (T.gap <= 0) {
      if (T.wave < T.waves.length) {
        spawnTowerWave();
        T.wave++;
        T.gap = 1.5;
      } else {
        const s = T.timeLeft >= 90 ? 3 : T.timeLeft >= 50 ? 2 : 1;
        endRun(true, "", s);
      }
    }
  }
}
