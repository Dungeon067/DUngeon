import { GS } from "../core/state";
import { portrait } from "../art/chibi";
import { preloadSfx, sfx } from "../core/audio";
import { releaseAll } from "../core/input";
import { flushPending } from "../core/loop";
import { $, esc, fmt } from "../core/util";
import { byId } from "../data/content";
import { startWorld } from "../modes/world";
import { Server, statsOf } from "../server/server";
import { renderServer } from "../ui/admin";
import { renderBossScr } from "../ui/boss";
import { renderChars } from "../ui/chars";
import { renderDaily } from "../ui/daily";
import { closeModal } from "../ui/modal";
import { toast } from "../ui/toast";
import { renderTower } from "../ui/tower";
import { renderWish } from "../ui/wish";

export function exitToMenu(screen = "hub") {
  if (GS.G) {
    flushPending();
    if (GS.G.mode === "world" && GS.G.loot && (GS.G.loot.coin || GS.G.loot.books)) {
      Server.req("reward", { coin: GS.G.loot.coin, books: GS.G.loot.books });
      toast(`Mang về: ${fmt(GS.G.loot.coin)} Xu, ${GS.G.loot.books} Sách KN`);
    }
  }
  GS.G = null;
  GS.scene = "menu";
  GS.paused = false;
  $("hud").hidden = true;
  closeModal();
  releaseAll();
  GS.overlay = null;
  go(screen);
}
/* =========================================================
   MENU SCREENS
   ========================================================= */
export const SCREENS: any = {
  hub: "sHub",
  wish: "sWish",
  chars: "sChars",
  tower: "sTower",
  boss: "sBoss",
  daily: "sDaily",
  server: "sServer",
  help: "sHelp",
};
export function go(name: string) {
  if (name === "world") {
    startWorld();
    return;
  }
  document.querySelectorAll(".screen").forEach((s: any) => (s.hidden = true));
  $(SCREENS[name]).hidden = false;
  $(SCREENS[name]).scrollTop = 0;
  (<Record<string, () => void>>{
    hub: renderHub,
    wish: renderWish,
    chars: renderChars,
    tower: renderTower,
    boss: renderBossScr,
    daily: renderDaily,
    server: renderServer,
    help: () => {},
  })[name]();
  updateWallets();
}
export function walletHtml() {
  const P = Server.P;
  return `<span class="coin" title="Đá Sao"><i class="i-gem"></i>${fmt(P.gems)}</span><span class="coin" title="Xu"><i class="i-coin"></i>${fmt(P.coin)}</span><span class="coin" title="Sách Kinh Nghiệm"><i class="i-book"></i>${fmt(P.books)}</span>`;
}
export function updateWallets() {
  const h = walletHtml();
  $("wHub").innerHTML = h;
  document.querySelectorAll(".wl").forEach((w) => (w.innerHTML = h));
}
export function headCanvas(id: string, size = 60) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  c.getContext("2d")!.drawImage(portrait(id, size, size, "head"), 0, 0);
  return c;
}
export function renderHub() {
  const box = $("hubParty");
  box.innerHTML = "";
  Server.P.party.forEach((id: string) => {
    const d = document.createElement("span");
    d.className = "pchip";
    d.appendChild(headCanvas(id, 60));
    d.insertAdjacentHTML("beforeend", `${esc(byId[id].name)} <span class="muted">Lv${statsOf(id).lv}</span>`);
    box.appendChild(d);
  });
  const dl = Server.P.daily!,
    ready = dl.tasks.filter((t: any) => t.prog >= t.goal && !t.claimed).length;
  const db = $("dailyBtn");
  db.querySelector(".badge")?.remove();
  if (ready) db.insertAdjacentHTML("beforeend", `<span class="badge">${ready}</span>`);
}

export function init(): void {
  document.querySelectorAll("[data-go]").forEach((b: any) => b.addEventListener("click", () => go(b.dataset.go)));
  document.querySelectorAll(".back").forEach((b) => b.addEventListener("click", () => go("hub")));
  $("sndBtn").addEventListener("click", () => {
    GS.soundOn = !GS.soundOn;
    $("sndBtn").textContent = "Âm thanh: " + (GS.soundOn ? "bật" : "tắt");
    if (GS.soundOn) {
      preloadSfx();
      sfx("coin");
    }
  });
}
