import { GS } from "../core/state";
import { STATUS } from "../data/kits";
import { portrait } from "../art/chibi";
import { $, fmt } from "../core/util";
import { EL, OBJECTIVES } from "../data/content";
import { cur, switchTo } from "../entities/party";
import { Server } from "../server/server";
import { badgeDot, partySlot } from "./ds";
import { icon, iconSvg } from "./icons/icons";
import { keyLabel, primaryKey, onSettings } from "../core/settings";
import { padLabelFor, padState } from "../core/gamepad";
import { onMapAction } from "../core/input";
import { drawMini } from "./hud/map";
import { closeMenu, currentScreen, menuOpen, openMenu } from "./menu/shell";
import { dailyReady } from "./menu/screens/main";
import { MENU } from "../data/menu-content";
import { trackedObjective } from "./menu/quests";
import { applyLayout, layoutParty } from "./hud/layout";
import { openSettings } from "./settings";
import type { Action } from "../data/schema";
import { REGIONS, cellAt, regionEffectText } from "../world/regions";
import { startStory, storyObjective } from "../story/story";

/* =========================================================
   HUD (S09). Vị trí theo bố cục quen thuộc của thể loại, phần nhìn theo hệ thống
   thiết kế S08. Xem docs/ux/hud-dieu-khien.md.
   ========================================================= */
export { drawMini };

const ACT_BTNS: [string, Action][] = [
  ["bAtk", "attack"],
  ["bSkill", "skill"],
  ["bBurst", "burst"],
  ["bJump", "jump"],
  ["bDash", "dash"],
  ["bInteract", "interact"],
];

/** Nhãn phím hoặc nút tay cầm đang dùng cho một thao tác. */
export function hintFor(a: Action) {
  if (document.documentElement.dataset.input === "pad" && padState.connected) return padLabelFor(a, padState.brand);
  const k = primaryKey(a);
  return k ? keyLabel(k) : "";
}
function refreshKeyHints(party = true) {
  for (const [id, a] of ACT_BTNS) {
    const b = $(id);
    let k = b.querySelector<HTMLElement>(".key");
    if (!k) {
      k = document.createElement("span");
      k.className = "key";
      k.setAttribute("aria-hidden", "true");
      b.append(k);
    }
    k.textContent = hintFor(a);
    const base = b.dataset.label ?? b.getAttribute("aria-label") ?? "";
    b.dataset.label = base;
    b.title = k.textContent ? `${base} (${k.textContent})` : base;
  }
  $("pauseBtn").title = `Tạm dừng (${hintFor("pause")})`;
  $("qmMap").title = `Bản đồ (${hintFor("map")})`;
  if (party && GS.G) buildHudParty();
}

/** Menu nhanh góc trên phải (S10): lối tắt đọc từ content/menu.yaml, nút Menu mở menu chính. */
function buildQuickMenu() {
  const qm = $("quickMenu"),
    first = $("qmMap");
  for (const id of [...MENU.quick, "main"]) {
    const it = MENU.main.find((m) => m.id === id);
    const name = it?.name ?? "Menu";
    const b = document.createElement("button");
    b.type = "button";
    b.className = "hud-qb";
    b.id = "qm-" + id;
    b.setAttribute("aria-label", name);
    b.title = name;
    b.insertAdjacentHTML("afterbegin", iconSvg(it?.icon ?? "menu", { size: 22 }));
    b.addEventListener("click", () => openMenu(id));
    qm.insertBefore(b, id === "main" ? null : first);
  }
  refreshQuickDots();
}
export function refreshQuickDots() {
  const b = document.getElementById("qm-daily");
  if (!b || !Server.P) return;
  const n = dailyReady();
  if (n) badgeDot(b, n);
  else b.querySelector(":scope > .tt-dot")?.remove();
}

let built = false;
export function initHud() {
  if (built) return;
  built = true;
  for (const b of document.querySelectorAll<HTMLElement>(".hud-qb[data-icon]"))
    b.insertAdjacentHTML("afterbegin", iconSvg(b.dataset.icon!, { size: 22 }));
  for (const [id] of ACT_BTNS) {
    const b = $(id);
    b.prepend(icon(b.dataset.kind!));
    b.insertAdjacentHTML("beforeend", `<span class="cd" aria-hidden="true"></span>`);
  }
  $("bInteract").insertAdjacentHTML("beforeend", `<span class="hud-int-l" aria-hidden="true"></span>`);
  const toggleMap = () => (menuOpen() && currentScreen() === "map" ? closeMenu() : openMenu("map"));
  $("qmMap").addEventListener("click", toggleMap);
  $("miniBtn").addEventListener("click", toggleMap);
  $("qmSettings").addEventListener("click", () => openSettings());
  onMapAction(toggleMap);
  buildQuickMenu();
  const edge = document.createElement("div");
  edge.id = "edgeArrows";
  edge.className = "hud-edge";
  edge.setAttribute("aria-hidden", "true");
  $("hud").append(edge);
  refreshKeyHints();
  applyLayout();
  onSettings(() => {
    refreshKeyHints();
    applyLayout();
  });
  new MutationObserver(() => refreshKeyHints()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-input"],
  });
}

export function buildHudParty() {
  const box = $("hudParty");
  box.innerHTML = "";
  GS.G.party.forEach((m: any, i: number) => {
    const key = hintFor(`p${i + 1}` as Action) || String(i + 1);
    const b = partySlot({
      name: m.c.name,
      rarity: m.c.r,
      el: m.c.el,
      elName: EL[m.c.el].vi,
      hp: m.hp / m.maxHp,
      key,
      art: portrait(m.id, 84, 84, "head"),
      active: i === GS.G.act,
      down: !m.alive,
    });
    b.classList.add("hud-slot");
    b.dataset.i = String(i);
    b.setAttribute(
      "aria-label",
      `${m.c.name}${i === GS.G.act ? ", đang điều khiển" : ""}${!m.alive ? ", đã gục" : ""}. Phím ${key}`,
    );
    b.insertAdjacentHTML(
      "beforeend",
      `<span class="hud-en" aria-hidden="true"></span><span class="hud-sw" aria-hidden="true"></span>`,
    );
    if (!m.alive)
      b.querySelector(".tt-portrait")?.insertAdjacentHTML("beforeend", iconSvg("guc", { size: 18, cls: "hud-down" }));
    b.addEventListener("click", () => switchTo(i));
    box.append(b);
  });
  layoutParty();
  GS.hudCache = {};
}

/** Mục tiêu hiện tại, lấy từ content/objectives.yaml. */
export function currentObjective(): { text: string; target: string | null } {
  const G = GS.G;
  if (G.mode === "tower") return { text: OBJECTIVES.tower.replace("{floor}", String(G.tower.floor)), target: null };
  if (G.mode === "boss") return { text: OBJECTIVES.boss, target: null };
  if (G.mode === "baoan") return { text: `${G.ba.ten}: hạ hết các đợt quái trước khi hết giờ`, target: null };
  const so = storyObjective();
  if (so) return so;
  const tq = trackedObjective();
  if (tq) return tq;
  const P = Server.P;
  for (const o of OBJECTIVES.world) {
    let n = 0,
      max = typeof o.done.count === "number" ? o.done.count : 0;
    if (o.done.kind === "chests") {
      n = P.chests.length;
      if (o.done.count === "all") max = G.map?.chests.length ?? 0;
    } else if (o.done.kind === "statue") n = G.statueUsed ? 1 : 0;
    else if (o.done.kind === "tower") n = Object.keys(P.tower ?? {}).length;
    else if (o.done.kind === "boss") n = Object.values(P.boss ?? {}).some(Boolean) ? 1 : 0;
    if (n < max) return { text: o.text.replace("{n}", String(n)).replace("{max}", String(max)), target: o.target };
  }
  return { text: "Đảo Lạc đã được khám phá. Hãy thử thách Tháp Tinh Tú ở tầng cao hơn", target: "tower" };
}

function setCd(b: HTMLElement, frac: number, secs: number) {
  const on = frac > 0;
  b.classList.toggle("is-cooldown", on);
  b.style.setProperty("--cd", String(frac));
  const cd = b.querySelector(".cd")!;
  const t = on ? String(Math.ceil(secs)) : "";
  if (cd.textContent !== t) cd.textContent = t;
}

function statusIcons(p: any, m: any) {
  const out: [string, string, string][] = [];
  if (p.shield > 0) out.push(["khien", `Khiên ${fmt(p.shield)}`, `${Math.ceil(p.shieldT)}s`]);
  if (GS.G.healAura) out.push(["bia-da", "Đang hồi phục gần Bia Đá", ""]);
  if (GS.G.mode === "world") {
    const rg = cellAt(GS.G.map, p.x, p.y).r,
      fx = regionEffectText(rg);
    if (fx.length) out.push(["ban-do", `${REGIONS[rg]!.name}: ${fx.join(", ")}`, ""]);
  }
  if (p.iframes > 0 && p.dashT > 0) out.push(["luot", "Đang lướt né, miễn sát thương", ""]);
  if (m && m.energy >= m.c.burst.cost) out.push(["no", "Nộ đã đầy", ""]);
  if (p.stamina < 20) out.push(["the-luc", "Thể lực thấp, chưa lướt được", ""]);
  // Buff và debuff của nhân vật đang điều khiển (S30).
  for (const s of m?.sts ?? []) {
    const d = STATUS[s.id];
    if (!d) continue;
    out.push([
      d.icon,
      `${d.ten}${s.n > 1 ? ` ×${s.n}` : ""}: ${d.mo}`,
      `${s.n > 1 ? `${s.n}·` : ""}${Math.ceil(s.t)}s`,
    ]);
  }
  return out;
}

function edgeArrows() {
  const box = document.getElementById("edgeArrows");
  if (!box) return;
  const G = GS.G,
    hw = GS.VW / 2 / GS.ZOOM,
    hh = GS.VH / 2 / GS.ZOOM;
  const src: any[] = G.enemies.filter((e: any) => !e.dead && e.tele);
  if (G.boss && G.boss.hp > 0 && G.boss.state && G.boss.state !== "idle") src.push(G.boss);
  const pts: { x: number; y: number; a: number }[] = [];
  for (const e of src) {
    const dx = e.x - G.cam.x,
      dy = e.y - G.cam.y;
    if (Math.abs(dx) < hw - 10 && Math.abs(dy) < hh - 10) continue;
    const a = Math.atan2(dy, dx);
    const m = 26;
    const k = Math.min(
      (GS.VW / 2 - m) / Math.abs(Math.cos(a) || 1e-6),
      (GS.VH / 2 - m) / Math.abs(Math.sin(a) || 1e-6),
    );
    pts.push({ x: GS.VW / 2 + Math.cos(a) * k, y: GS.VH / 2 + Math.sin(a) * k, a });
    if (pts.length >= 6) break;
  }
  while (box.children.length < pts.length) box.insertAdjacentHTML("beforeend", "<i></i>");
  [...box.children].forEach((el, i) => {
    const q = pts[i],
      s = (el as HTMLElement).style;
    if (!q) {
      s.display = "none";
      return;
    }
    s.display = "";
    s.transform = `translate(${q.x}px, ${q.y}px) rotate(${q.a}rad)`;
  });
}

export function updateHud() {
  if (!GS.G) return;
  const m = cur(),
    p = GS.G.p,
    C = GS.hudCache;
  const slots = $("hudParty").children;
  GS.G.party.forEach((pm: any, i: number) => {
    const el = slots[i] as HTMLElement | undefined;
    if (!el) return;
    if (!!el.classList.contains("is-down") === pm.alive) return buildHudParty();
    const bar = el.querySelector<HTMLElement>(".tt-progress");
    bar?.style.setProperty("--v", String(pm.hp / pm.maxHp));
    const en = Math.min(1, pm.energy / pm.c.burst.cost);
    el.style.setProperty("--en", String(en));
    el.classList.toggle("is-ready", en >= 1);
    el.style.setProperty("--sw", String(i === GS.G.act ? 0 : Math.max(0, GS.G.switchCd / 0.8)));
  });
  if (m) {
    if (C.nm !== m.id + m.st.lv) {
      $("actName").textContent = m.c.name;
      $("actLv").textContent = `Cấp ${m.st.lv}`;
      C.nm = m.id + m.st.lv;
      const sb = $("bSkill");
      sb.querySelector(".tt-icon")?.replaceWith(icon(m.c.skill.icon ?? "ky-nang"));
      sb.dataset.label = `Kỹ năng: ${m.c.skill.name}`;
      sb.setAttribute("aria-label", sb.dataset.label);
      const bb = $("bBurst");
      bb.dataset.label = `Nộ: ${m.c.burst.name}`;
      bb.setAttribute("aria-label", bb.dataset.label);
      bb.style.setProperty("--el", EL[m.c.el].c);
      sb.style.setProperty("--ac", EL[m.c.el].c);
      refreshKeyHints(false);
    }
    const hp = m.hp / m.maxHp;
    $("actHp").style.width = hp * 100 + "%";
    $("actSh").style.width = (p.shield > 0 ? Math.min(100, (p.shield / m.maxHp) * 100) : 0) + "%";
    $("actHpMeter").setAttribute("aria-valuenow", String(Math.round(hp * 100)));
    $("hudSelf").classList.toggle("is-low", hp < 0.3);
    $("lowHp").classList.toggle("is-on", hp < 0.3 && m.alive);
    const t = `${fmt(m.hp)} / ${fmt(m.maxHp)}${p.shield > 0 ? ` · Khiên ${fmt(p.shield)}` : ""}`;
    if (C.hpT !== t) $("actHpTxt").textContent = C.hpT = t;
    setCd($("bSkill"), m.skillCd > 0 ? m.skillCd / m.c.skill.cd : 0, m.skillCd);
    const bb = $("bBurst"),
      ek = Math.min(1, m.energy / m.c.burst.cost);
    bb.style.setProperty("--en", String(ek));
    bb.classList.toggle("is-ready", ek >= 1);
    $("bDash").classList.toggle("is-disabled", p.air ? p.airDash || p.stamina < 20 : p.stamina < 20);
  }
  // Thể lực: vòng nhỏ cạnh nhân vật, chỉ hiện khi đang tiêu hoặc chưa hồi đầy.
  const sr = $("stamRing");
  const showSt = p.stamina < 99.5;
  sr.hidden = !showSt;
  if (showSt) {
    $("stamArc").style.strokeDasharray = `${p.stamina} 100`;
    sr.classList.toggle("is-low", p.stamina < 20);
    sr.style.transform = `translate(${GS.VW / 2 + (p.x - GS.G.cam.x) * GS.ZOOM + 26}px, ${
      GS.VH / 2 + (p.y - GS.G.cam.y - (p.zh ?? 0) * 22) * GS.ZOOM - 46
    }px)`;
  }
  // Hiệu ứng đang có
  const st = statusIcons(p, m);
  const sk = st.map((s) => s[0] + s[2]).join();
  if (C.st !== sk) {
    C.st = sk;
    $("hudStatus").innerHTML = st
      .map(
        ([ic, label, t]) =>
          `<span class="hud-st" role="listitem" title="${label}" aria-label="${label}">${iconSvg(ic, { size: 16 })}${t ? `<b>${t}</b>` : ""}</span>`,
      )
      .join("");
  }
  // Mục tiêu và thông tin chế độ
  const ob = currentObjective();
  if (C.ob !== ob.text) {
    C.ob = ob.text;
    $("objective").innerHTML = `${iconSvg("nhiem-vu", { size: 16 })}<span>${ob.text}</span>`;
    const el = $("objective");
    if (!el.dataset.story) {
      el.dataset.story = "1";
      // Chạm dòng mục tiêu để chơi tiếp cốt truyện.
      el.addEventListener("click", () => startStory());
    }
    el.classList.toggle("is-story", !!storyObjective());
  }
  GS.G.objTarget = ob.target;
  let info = "";
  if (GS.G.mode === "tower" || GS.G.mode === "baoan") {
    const T = GS.G.tower;
    info = `Đợt ${Math.max(1, T.wave)}/${T.waves.length} · ${Math.max(0, Math.ceil(T.timeLeft))} giây`;
  }
  if (GS.G.mode === "boss") {
    info = `Hang Hắc Giao · Cấp độ ${GS.G.opt.lv}`;
    const bn = `Hắc Giao · Cấp độ ${GS.G.boss.lv} · Giai đoạn ${GS.G.boss.phase === 2 ? "2: nổi giận" : "1"}`;
    if (C.boss !== bn) $("bossName").textContent = C.boss = bn;
    $("bossHp").style.width = Math.max(0, (GS.G.boss.hp / GS.G.boss.maxHp) * 100) + "%";
  }
  if (C.info !== info) $("modeInfo").textContent = C.info = info;
  const bi = $("bInteract");
  if (GS.G.interact && !GS.G.over) {
    const l = GS.G.interact.label;
    if (C.int !== l) {
      C.int = l;
      bi.querySelector(".hud-int-l")!.textContent = l;
      bi.setAttribute("aria-label", `Tương tác: ${l}`);
      bi.dataset.label = `Tương tác: ${l}`;
    }
    bi.hidden = false;
  } else bi.hidden = true;
  edgeArrows();
  drawMini();
}
