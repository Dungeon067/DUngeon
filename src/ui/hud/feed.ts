import { esc } from "../../core/util";
import { iconSvg } from "../../ui/icons/icons";

/* Danh sách nhặt đồ trượt bên trái: tối đa 5 dòng, cùng loại thì cộng dồn, mỗi dòng tự mờ sau 3 giây. */
const MAX = 5,
  LIFE = 3000;
const rows = new Map<string, { el: HTMLLIElement; n: number; t: ReturnType<typeof setTimeout> }>();

export function lootFeed(kind: string, label: string, n: number, iconName: string, color = "") {
  const box = document.getElementById("lootFeed");
  if (!box) return;
  const r = rows.get(kind);
  if (r) {
    r.n += n;
    clearTimeout(r.t);
    r.el.querySelector(".n")!.textContent = n ? `+${r.n}` : "";
    r.el.classList.remove("is-bump");
    void r.el.offsetWidth;
    r.el.classList.add("is-bump");
    r.t = setTimeout(() => drop(kind), LIFE);
    return;
  }
  const el = document.createElement("li");
  el.className = "hud-loot-i";
  if (color) el.style.setProperty("--c", color);
  el.innerHTML = `${iconSvg(iconName, { size: 18 })}<span class="l">${esc(label)}</span><span class="n">${n ? "+" + n : ""}</span>`;
  box.prepend(el);
  rows.set(kind, { el, n, t: setTimeout(() => drop(kind), LIFE) });
  while (box.children.length > MAX) {
    const last = box.lastElementChild as HTMLElement;
    for (const [k, v] of rows) if (v.el === last) rows.delete(k);
    last.remove();
  }
}
function drop(kind: string) {
  const r = rows.get(kind);
  if (!r) return;
  rows.delete(kind);
  r.el.classList.add("is-out");
  setTimeout(() => r.el.remove(), 260);
}
