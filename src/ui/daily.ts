import { $, esc } from "../core/util";
import { Server } from "../server/server";
import { updateWallets } from "../ui/screens";
import { toast } from "../ui/toast";

export function renderDaily() {
  Server.ensureDaily();
  const d = Server.P.daily,
    box = $("tasks");
  $("dailyDate").textContent =
    `Ngày ${new Date().toLocaleDateString("vi-VN")} · Mỗi nhiệm vụ: 30 Đá Sao và 3.000 Xu · Hoàn thành cả 4: thêm 60 Đá Sao và 5 Sách KN`;
  box.innerHTML = "";
  d.tasks.forEach((t, i) => {
    const done = t.prog >= t.goal;
    const el = document.createElement("div");
    el.className = "task";
    el.innerHTML = `<div class="tt"><b>${esc(t.t)}</b><div class="muted">${t.prog}/${t.goal}</div><div class="pb"><span style="width:${(t.prog / t.goal) * 100}%"></span></div></div>`;
    const b = document.createElement("button");
    b.className = "btn sm" + (done && !t.claimed ? " gold" : "");
    b.disabled = !done || t.claimed;
    b.textContent = t.claimed ? "Đã nhận" : done ? "Nhận thưởng" : "Chưa xong";
    b.onclick = () => {
      if (Server.req("claimTask", { i }).ok) {
        toast("+30 Đá Sao, +3.000 Xu");
        renderDaily();
        updateWallets();
      }
    };
    el.appendChild(b);
    box.appendChild(el);
  });
  const all = d.tasks.every((t) => t.claimed);
  const el = document.createElement("div");
  el.className = "task";
  el.innerHTML = `<div class="tt"><b>Thưởng hoàn thành ngày</b><div class="muted">60 Đá Sao, 5 Sách KN</div></div>`;
  const b = document.createElement("button");
  b.className = "btn sm" + (all && !d.bonus ? " gold" : "");
  b.disabled = !all || d.bonus;
  b.textContent = d.bonus ? "Đã nhận" : "Nhận";
  b.onclick = () => {
    if (Server.req("claimBonus").ok) {
      toast("+60 Đá Sao, +5 Sách KN");
      renderDaily();
      updateWallets();
    }
  };
  el.appendChild(b);
  box.appendChild(el);
}
