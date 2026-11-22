import { GS } from "../core/state";
import { BOSS } from "../data/content";
import { newSession } from "../entities/party";
import { enterPlay, showBanner } from "../modes/session";

export function startBoss(lv: number) {
  GS.G = newSession("boss", { lv });
  GS.G.bounds = { x: 0, y: 0, w: 1300, h: 960 };
  GS.G.p.x = 650;
  GS.G.p.y = 820;
  const hp = BOSS.hp * (1 + BOSS.hpPerLv * (lv - 1));
  const b = {
    x: 650,
    y: 300,
    hp,
    maxHp: hp,
    atk: BOSS.atk * (1 + BOSS.atkPerLv * (lv - 1)),
    lv,
    phase: 1,
    el: BOSS.el,
    ang: Math.PI / 2,
    state: "idle",
    t: 1.5,
    flash: 0,
    aura: null,
    auraT: 0,
    frozen: 0,
    vuln: 0,
    ec: null,
    r: BOSS.r,
    segs: [] as { x: number; y: number }[],
    trail: [] as { x: number; y: number }[],
    tele: null,
    act: null,
    isBoss: true,
    dead: false,
    spd: BOSS.spd,
    type: "boss",
  };
  for (let i = 0; i < 14; i++) b.segs.push({ x: 650, y: 300 - i * 18 });
  for (let i = 0; i < 200; i++) b.trail.push({ x: 650, y: 300 - i * 2 });
  GS.G.boss = b;
  GS.G.enemies.push(b);
  enterPlay();
  showBanner("Hắc Giao thức giấc");
}
