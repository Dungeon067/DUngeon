import { GS } from "../core/state";
import { flushPending, snapCam } from "../core/loop";
import { $, esc, fmt } from "../core/util";
import { later } from "../entities/fx";
import { Server } from "../server/server";
import { buildHudParty } from "../ui/hud";
import { openModal } from "../ui/modal";
import { requestLandscape } from "../ui/hud/rotate";
import { showFirstHints } from "../ui/hud/hints";

export function enterPlay() {
  GS.scene = "play";
  GS.paused = false;
  document.querySelectorAll(".screen").forEach((s: any) => (s.hidden = true));
  $("hud").hidden = false;
  $("bossBar").hidden = !GS.G.boss;
  if (GS.G.boss) $("bossName").textContent = `Hắc Giao · Cấp độ ${GS.G.boss.lv}`;
  buildHudParty();
  snapCam();
  void requestLandscape();
  showFirstHints();
}
export function showBanner(t: any) {
  GS.G.banner = { t: 2.2, txt: t };
}
export function partyWipe() {
  if (GS.G.mode === "world") {
    showBanner("Cả đội gục ngã");
    GS.G.over = true;
    later(1.6, () => {
      for (const m of GS.G.party) {
        m.alive = true;
        m.hp = m.maxHp;
      }
      GS.G.act = 0;
      GS.G.p.x = GS.G.respawn.x;
      GS.G.p.y = GS.G.respawn.y;
      GS.G.over = false;
      snapCam();
      buildHudParty();
      showBanner("Hồi sinh tại bia đá");
    });
  } else endRun(false, "Cả đội đã gục ngã");
}
export function endRun(win: any, reason = "", stars = 0) {
  if (GS.G._ended) return;
  GS.G._ended = true;
  GS.G.over = true;
  flushPending();
  let html = "";
  if (GS.G.mode === "tower") {
    const f = GS.G.tower.floor;
    if (win) {
      const r = Server.req("towerClear", { floor: f, stars });
      const d = r.data;
      html = `<h3>Vượt tầng ${f}</h3><div class="starsbig">${[1, 2, 3].map((i) => (i <= stars ? "★" : `<span class="off">★</span>`)).join("")}</div><p class="muted">Còn ${Math.ceil(GS.G.tower.timeLeft)} giây</p><div class="rewards">${coinHtml("gem", d.gems)}${coinHtml("coin", d.coin)}${coinHtml("book", d.books)}</div>
        <div class="row">${f < 12 ? `<button class="btn gold" data-act="next">Tầng ${f + 1}</button>` : ""}<button class="btn" data-act="retry">Đánh lại</button><button class="btn" data-act="menu">Về sảnh</button></div>`;
    } else
      html = `<h3>Thất bại</h3><p class="muted">${esc(reason)}. Thử nâng cấp nhân vật hoặc ghép đội có nhiều phản ứng nguyên tố hơn.</p><div class="row"><button class="btn gold" data-act="retry">Thử lại</button><button class="btn" data-act="menu">Về sảnh</button></div>`;
  } else if (GS.G.mode === "boss") {
    if (win) {
      const r = Server.req("bossClear", { lv: GS.G.opt.lv });
      const d = r.data;
      html = `<h3>Chiến thắng!</h3><p class="muted">Hắc Giao cấp độ ${GS.G.opt.lv} đã bị đánh bại${d.first ? " lần đầu" : ""}.</p><div class="rewards">${coinHtml("gem", d.gems)}${coinHtml("coin", d.coin)}${coinHtml("book", d.books)}</div><div class="row">${GS.G.opt.lv < 5 ? `<button class="btn gold" data-act="bnext">Cấp độ ${GS.G.opt.lv + 1}</button>` : ""}<button class="btn" data-act="retry">Đánh lại</button><button class="btn" data-act="menu">Về sảnh</button></div>`;
    } else
      html = `<h3>Thất bại</h3><p class="muted">${esc(reason)}. Hắc Giao còn ${Math.round((GS.G.boss.hp / GS.G.boss.maxHp) * 100)}% máu. Dùng Lướt để né đòn lao và vùng mưa.</p><div class="row"><button class="btn gold" data-act="retry">Thử lại</button><button class="btn" data-act="menu">Về sảnh</button></div>`;
  }
  setTimeout(() => openModal(html), win ? 300 : 900);
}
export function coinHtml(k: string, v: any) {
  const ic = { gem: "i-gem", coin: "i-coin", book: "i-book" }[k];
  return `<span class="coin"><i class="${ic}"></i>${k === "gem" ? "" : ""}+${fmt(v)} ${k === "gem" ? "Đá Sao" : k === "coin" ? "Xu" : "Sách KN"}</span>`;
}
