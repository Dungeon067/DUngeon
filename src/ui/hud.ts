import { GS } from "../core/state";
import { portrait } from "../art/chibi";
import { $, TAU, dist, esc, fmt } from "../core/util";
import { EL } from "../data/content";
import { cur, switchTo } from "../entities/party";
import { Server } from "../server/server";
import { MH, MW, TS } from "../world/map";

/* =========================================================
   HUD
   ========================================================= */
export function buildHudParty() {
  const box = $("hudParty");
  box.innerHTML = "";
  GS.G.party.forEach((m: any, i: number) => {
    const b: any = document.createElement("button");
    b.className = "pm";
    b.dataset.i = i;
    const c = document.createElement("canvas");
    c.width = 72;
    c.height = 72;
    c.getContext("2d")!.drawImage(portrait(m.id, 72, 72, "head"), 0, 0);
    b.appendChild(c);
    b.insertAdjacentHTML(
      "beforeend",
      `<div><div class="pmn">${esc(m.c.name)}</div><div class="pmb"><span></span></div></div><span class="key">${i + 1}</span>`,
    );
    b.addEventListener("pointerdown", (ev: PointerEvent) => {
      ev.preventDefault();
      switchTo(i);
    });
    box.appendChild(b);
  });
}
export function updateHud() {
  if (!GS.G) return;
  const m = cur(),
    p = GS.G.p;
  const pms = $("hudParty").children;
  GS.G.party.forEach((pm: any, i: number) => {
    const el = pms[i];
    if (!el) return;
    el.classList.toggle("on", i === GS.G.act);
    el.classList.toggle("dead", !pm.alive);
    el.classList.toggle("ready", pm.energy >= pm.c.burst.cost);
    el.querySelector<HTMLElement>(".pmb span")!.style.width = (pm.hp / pm.maxHp) * 100 + "%";
  });
  if (m) {
    const nm = `${m.c.name} · Lv${m.st.lv}`;
    if (GS.hudCache.nm !== nm) {
      $("actName").textContent = nm;
      GS.hudCache.nm = nm;
    }
    $("actHp").style.width = (m.hp / m.maxHp) * 100 + "%";
    $("actSh").style.width = (p.shield > 0 ? Math.min(100, (p.shield / m.maxHp) * 100) : 0) + "%";
    $("actHpTxt").textContent = `${fmt(m.hp)} / ${fmt(m.maxHp)}${p.shield > 0 ? ` · Khiên ${fmt(p.shield)}` : ""}`;
    $("stam").style.width = p.stamina + "%";
    const sb: any = $("bSkill"),
      cdp = m.skillCd > 0 ? m.skillCd / m.c.skill.cd : 0;
    sb.querySelector(".cdv").style.setProperty("--p", cdp);
    sb.querySelector(".cdt").textContent = m.skillCd > 0 ? Math.ceil(m.skillCd) : "";
    sb.style.borderColor = EL[m.c.el].c;
    const bb = $("bBurst"),
      ek: any = m.energy / m.c.burst.cost;
    bb.style.setProperty("--e", ek);
    bb.style.setProperty("--ec", EL[m.c.el].c);
    bb.classList.toggle("ready", ek >= 1);
  }
  let info = "";
  if (GS.G.mode === "world") {
    info = `Đảo Lạc · Đã mở ${Server.P.chests.length}/${GS.G.map.chests.length} rương`;
  }
  if (GS.G.mode === "tower") {
    const T = GS.G.tower;
    info = `Tháp Tinh Tú · Tầng ${T.floor}<br>Đợt ${Math.max(1, T.wave)}/${T.waves.length} · ${Math.max(0, Math.ceil(T.timeLeft))} giây`;
  }
  if (GS.G.mode === "boss") {
    info = `Hang Hắc Giao · Cấp độ ${GS.G.opt.lv}`;
    $("bossHp").style.width = Math.max(0, (GS.G.boss.hp / GS.G.boss.maxHp) * 100) + "%";
  }
  if (GS.hudCache.info !== info) {
    $("modeInfo").innerHTML = info;
    GS.hudCache.info = info;
  }
  const bi = $("bInteract");
  if (GS.G.interact && !GS.G.over) {
    const t = (GS.isTouch ? "" : "F · ") + GS.G.interact.label;
    if (bi.textContent !== t) bi.textContent = t;
    bi.hidden = false;
  } else bi.hidden = true;
  drawMini();
}
export const miniCtx = $<HTMLCanvasElement>("mini").getContext("2d")!;
export function drawMini() {
  const c = miniCtx,
    S = 200,
    p = GS.G.p;
  c.clearRect(0, 0, S, S);
  c.save();
  c.beginPath();
  c.arc(S / 2, S / 2, S / 2, 0, TAU);
  c.clip();
  c.fillStyle = "#0a0f22";
  c.fillRect(0, 0, S, S);
  if (GS.G.map) {
    const sc = 4,
      ptx = p.x / TS,
      pty = p.y / TS;
    c.imageSmoothingEnabled = false;
    c.drawImage(GS.G.map.mini, S / 2 - ptx * sc, S / 2 - pty * sc, MW * sc, MH * sc);
    const P = (x: number, y: number, col: string, r = 4) => {
      c.fillStyle = col;
      c.beginPath();
      c.arc(S / 2 + (x - ptx) * sc, S / 2 + (y - pty) * sc, r, 0, TAU);
      c.fill();
    };
    GS.G.map.statues.forEach((s: any) => P(s.x + 0.5, s.y + 0.5, "#9fe8ff", 5));
    GS.G.map.chests.forEach((ch: any, i: any) => {
      if (!Server.P.chests.includes(i)) P(ch.x + 0.5, ch.y + 0.5, "#f0c060", 3);
    });
    P(GS.G.map.tower.x + 0.5, GS.G.map.tower.y + 0.5, "#ffd27a", 6);
    P(GS.G.map.gate.x + 0.5, GS.G.map.gate.y + 0.5, "#5aa0ff", 6);
    for (const e of GS.G.enemies) {
      if (!e.dead && dist(e.x, e.y, p.x, p.y) < 900) P(e.x / TS, e.y / TS, "#ff6060", 2.2);
    }
  } else {
    const B = GS.G.bounds,
      sc = S / Math.max(B.w, B.h);
    c.fillStyle = "#2a2f58";
    c.fillRect(0, 0, B.w * sc, B.h * sc);
    for (const e of GS.G.enemies)
      if (!e.dead) {
        c.fillStyle = "#ff6060";
        c.beginPath();
        c.arc(e.x * sc, e.y * sc, e.isBoss ? 7 : 3, 0, TAU);
        c.fill();
      }
    c.fillStyle = "#fff";
    c.beginPath();
    c.arc(p.x * sc, p.y * sc, 4, 0, TAU);
    c.fill();
    c.restore();
    return;
  }
  c.fillStyle = "#fff";
  c.save();
  c.translate(S / 2, S / 2);
  c.rotate(Math.atan2(GS.G.p.dirY, GS.G.p.dirX) + Math.PI / 2);
  c.beginPath();
  c.moveTo(0, -8);
  c.lineTo(6, 6);
  c.lineTo(-6, 6);
  c.closePath();
  c.fill();
  c.restore();
  c.restore();
}
