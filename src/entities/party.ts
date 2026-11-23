import { GS } from "../core/state";
import { EL, byId } from "../data/content";
import { fxBurst, fxRing } from "../entities/fx";
import { Server, investOf, statsOf } from "../server/server";
import { ECON } from "../data/economy";
import { weaponOf } from "../economy/core";
import { buildHudParty } from "../ui/hud";
import { resetFeel } from "../combat/feel";

export function buildParty() {
  return Server.P.party
    .filter((id: string) => Server.P.owned[id])
    .map((id: string) => {
      const st = statsOf(id);
      return { id, c: byId[id], st, hp: st.hp, maxHp: st.hp, energy: 20, skillCd: 0, alive: true, stack: stackOf(id) };
    });
}
/** Trạng thái tích tầng của vũ khí đang cầm; giữ số tầng cũ nếu vẫn cùng vũ khí và mức tinh luyện. */
export function stackOf(id: string, prev: { id: string; tl: number; tang: number; t: number } | null = null) {
  const vk = investOf(id).vuKhi;
  if (!vk || !weaponOf(vk.id, ECON).biDong.coChe) return null;
  if (prev && prev.id === vk.id && prev.tl === vk.tinhLuyen) return prev;
  return { id: vk.id, tl: vk.tinhLuyen, tang: 0, t: 0 };
}
export function newSession(mode: string, opt = {}) {
  resetFeel();
  const g = {
    mode,
    opt,
    time: 0,
    party: buildParty(),
    act: 0,
    switchCd: 0,
    p: {
      x: 0,
      y: 0,
      fx: 1,
      back: false,
      dirX: 1,
      dirY: 0,
      ang: 0,
      walk: 0,
      moving: false,
      atkCd: 0,
      atkAnim: 0,
      combo: 0,
      comboT: 0,
      dashT: 0,
      dvx: 0,
      dvy: 0,
      iframes: 0,
      stamina: 100,
      shield: 0,
      shieldT: 0,
      shieldMax: 1,
      hurt: 0,
      dashHeld: 0,
      zh: 0,
      air: false,
      vz: 0,
      jvx: 0,
      jvy: 0,
      peak: 0,
      airDash: false,
      plunge: false,
      long: false,
      land: 0,
      safe: null as any,
    },
    enemies: [],
    projs: [],
    waves: [] as any[],
    fx: [],
    texts: [],
    fields: [],
    turrets: [],
    pickups: [],
    later: [],
    boss: null,
    cam: { x: 0, y: 0 },
    shake: 0,
    map: null,
    bounds: null,
    cine: null,
    banner: { t: 0, txt: "" },
    pending: { kill: 0, react: 0, burst: 0 },
    loot: { coin: 0, books: 0 },
    over: false,
    interact: null,
    respawn: null,
  };
  return g;
}
export function cur() {
  return GS.G.party[GS.G.act];
}
export function switchTo(i: number) {
  if (!GS.G || GS.G.over || i === GS.G.act || !GS.G.party[i] || !GS.G.party[i].alive || GS.G.switchCd > 0) return;
  GS.G.act = i;
  GS.G.switchCd = 0.8;
  fxRing(GS.G.p.x, GS.G.p.y - 14, 40, EL[cur().c.el].c, 0.35, 5);
  fxBurst(GS.G.p.x, GS.G.p.y - 14, EL[cur().c.el].c, 12, 150);
  buildHudParty();
}
