import { GS } from "../core/state";
import { flushPending } from "../core/loop";
import { $ } from "../core/util";
import { startBoss } from "../modes/boss";
import { startTower } from "../modes/tower";
import { exitToMenu } from "../ui/screens";

export function pause() {
  if (!GS.G || GS.G._ended) return;
  GS.paused = true;
  flushPending();
  const extra = GS.G.mode === "world" ? `<button class="btn" data-act="tochars">Đổi đội hình</button>` : "";
  openModal(
    `<h3>Tạm dừng</h3><p class="muted">${GS.G.mode === "world" ? "Tiến trình rương đã được lưu. Quái sẽ xuất hiện lại khi bạn quay lại đảo." : "Rời trận bây giờ sẽ không nhận được phần thưởng."}</p><div class="row"><button class="btn gold" data-act="resume">Tiếp tục</button>${extra}<button class="btn" data-act="menu">Về sảnh</button></div>`,
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
    if (act === "resume") resume();
    else if (act === "menu") {
      closeModal();
      exitToMenu();
    } else if (act === "tochars") {
      closeModal();
      exitToMenu("chars");
    } else if (act === "retry") {
      closeModal();
      const g = GS.G;
      if (g.mode === "tower") startTower(g.tower.floor);
      else if (g.mode === "boss") startBoss(g.opt.lv);
    } else if (act === "next") {
      closeModal();
      startTower(GS.G.tower.floor + 1);
    } else if (act === "bnext") {
      closeModal();
      startBoss(GS.G.opt.lv + 1);
    } else if (act === "close") closeModal();
  });
}
