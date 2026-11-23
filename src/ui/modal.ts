import { openSettings } from "./settings";
import { GS } from "../core/state";
import { flushPending } from "../core/loop";
import { $ } from "../core/util";
import { startBoss } from "../modes/boss";
import { startTower } from "../modes/tower";
import { startBaoAn } from "../modes/bao-an";
import { exitToMenu } from "../ui/screens";
import { openMenu } from "./menu/shell";

export function pause() {
  if (!GS.G || GS.G._ended) return;
  flushPending();
  if (GS.G.mode === "world") return openMenu("main");
  GS.paused = true;
  openModal(
    `<h3>Tạm dừng</h3><p class="muted">Rời trận bây giờ sẽ không nhận được phần thưởng.</p><div class="row"><button class="btn gold" data-act="resume">Tiếp tục</button><button class="btn" data-act="settings">Cài đặt</button><button class="btn" data-act="menu">Về đảo</button></div>`,
  );
}
export function resume() {
  closeModal();
  GS.paused = false;
}
export function openModal(html: string) {
  $("modalBox").innerHTML = html;
  $("modal").hidden = false;
  GS.paused = true;
}
export function closeModal() {
  $("modal").hidden = true;
}

export function init(): void {
  $("modal").addEventListener("click", (e: any) => {
    const a = e.target.closest("[data-act]");
    if (!a) return;
    const act = a.dataset.act;
    if (act === "settings") openSettings();
    else if (act === "resume") resume();
    else if (act === "menu") {
      closeModal();
      exitToMenu();
    } else if (act === "retry") {
      closeModal();
      const g = GS.G;
      if (g.mode === "tower") startTower(g.tower.floor);
      else if (g.mode === "boss") startBoss(g.opt.lv);
      else if (g.mode === "baoan") startBaoAn(g.ba.id, g.ba.tt);
    } else if (act === "next") {
      closeModal();
      startTower(GS.G.tower.floor + 1);
    } else if (act === "bnext") {
      closeModal();
      startBoss(GS.G.opt.lv + 1);
    } else if (act === "bamenu") {
      closeModal();
      exitToMenu("baoan");
    } else if (act === "close") closeModal();
  });
}
