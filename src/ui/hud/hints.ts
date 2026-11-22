import { settings } from "../../core/settings";

/* Gợi ý lần đầu: nhãn ngắn cạnh từng thành phần HUD, mờ dần sau vài giây. Chỉ hiện ở lần chơi đầu
   (khóa "tinhtu-hints-v1"); bật lại được trong Cài đặt. */

const KEY = "tinhtu-hints-v1";
const TIPS: [string, string][] = [
  ["miniBtn", "Bản đồ nhỏ: chạm để mở bản đồ lớn"],
  ["objective", "Mục tiêu tiếp theo"],
  ["hudParty", "Đội hình: chạm để đổi người"],
  ["hudSelf", "Máu của nhân vật đang điều khiển"],
  ["bAtk", "Đánh"],
  ["bSkill", "Kỹ năng"],
  ["bBurst", "Nộ: dùng khi vòng sáng đầy"],
  ["bJump", "Nhảy"],
  ["bDash", "Lướt né"],
  ["quickMenu", "Bản đồ, Cài đặt, Tạm dừng"],
];

export function initHints() {
  /* dành chỗ: gợi ý gắn khi vào trận */
}
export function showFirstHints(force = false) {
  let seen = false;
  try {
    seen = localStorage.getItem(KEY) === "1";
  } catch {
    /* bỏ qua */
  }
  if (!force && (seen || !settings.showHints)) return;
  const hud = document.getElementById("hud");
  if (!hud) return;
  hud.querySelectorAll(".hud-tip").forEach((t) => t.remove());
  requestAnimationFrame(() => {
    for (const [id, text] of TIPS) {
      const el = document.getElementById(id);
      if (!el || el.hidden) continue;
      const r = el.getBoundingClientRect();
      if (!r.width) continue;
      const t = document.createElement("div");
      t.className = "hud-tip";
      t.setAttribute("aria-hidden", "true");
      t.textContent = text;
      const left = r.left + r.width / 2 > innerWidth / 2;
      t.dataset.side = left ? "l" : "r";
      t.style.top = Math.max(4, r.top + r.height / 2 - 12) + "px";
      if (left) t.style.right = innerWidth - r.left + 6 + "px";
      else t.style.left = r.right + 6 + "px";
      hud.append(t);
    }
    setTimeout(() => hud.querySelectorAll(".hud-tip").forEach((t) => t.classList.add("is-out")), 6000);
    setTimeout(() => hud.querySelectorAll(".hud-tip").forEach((t) => t.remove()), 7000);
  });
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* bỏ qua */
  }
}
