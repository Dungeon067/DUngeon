import { $ } from "../core/util";
import { startTower } from "../modes/tower";
import { Server } from "../server/server";

/* ---------- tower / boss / daily ---------- */
export function renderTower() {
  const P = Server.P,
    box = $("floors");
  box.innerHTML = "";
  for (let f = 1; f <= 12; f++) {
    const st = P.tower[f] || 0,
      unlocked = f === 1 || (P.tower[f - 1] || 0) > 0;
    const b = document.createElement("button");
    b.className = "floor";
    b.disabled = !unlocked;
    b.innerHTML = `<b>Tầng ${f}</b><span class="st">${[1, 2, 3].map((i) => (i <= st ? "★" : `<span class="off">★</span>`)).join("")}</span><span class="muted">Quái Lv${1 + Math.round(f * 0.75)}${f >= 4 ? " · có Hộ Vệ Đá" : ""}</span>`;
    b.onclick = () => startTower(f);
    box.appendChild(b);
  }
}
