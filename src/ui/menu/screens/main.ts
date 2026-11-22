import { GS } from "../../../core/state";
import { byId } from "../../../data/content";
import { MENU } from "../../../data/menu-content";
import { Server } from "../../../server/server";
import { openSettings } from "../../settings";
import { badgeDot, button, h } from "../../ds";
import { icon } from "../../icons/icons";
import { closeMenu, openMenu, registerScreen } from "../shell";

/** Số Ủy thác đã xong chưa nhận (chấm báo trên menu và menu nhanh). */
export function dailyReady() {
  Server.ensureDaily();
  return Server.P.daily!.tasks.filter((t: any) => t.prog >= t.goal && !t.claimed).length;
}

/** Mở một mục của menu chính (Cài đặt là hộp thoại S09 nằm trên menu). */
export function goItem(id: string) {
  if (id === "settings") return openSettings();
  openMenu(id);
}

registerScreen("main", {
  title: "Menu",
  icon: "menu",
  render(host) {
    host.classList.add("tt-menu-main");
    const P = Server.P;
    const party = h(
      "div",
      { class: "tt-main-party" },
      P.party.map((id: string) => h("span", { class: "tt-chip" }, [byId[id]?.name ?? id])),
    );
    const resume = button("Tiếp tục khám phá", { variant: "primary", icon: "choi", size: "lg", onClick: () => closeMenu() });
    resume.id = "menuResume";
    resume.autofocus = true;
    const side = h("aside", { class: "tt-main-side" }, [
      h("p", { class: "tt-eyebrow" }, ["Đảo Lạc · Vọng Tinh Giới"]),
      h("h3", { class: "tt-h2" }, [GS.G?.mode === "world" ? "Đang tạm dừng" : "Menu"]),
      h("p", { class: "tt-dim" }, ["Đội đang dùng"]),
      party,
      resume,
      button("Hướng dẫn", { variant: "ghost", icon: "huong-dan", onClick: () => openMenu("help") }),
    ]);
    const groups = new Map<string, HTMLElement>();
    for (const it of MENU.main) {
      let g = groups.get(it.group);
      if (!g) {
        g = h("div", { class: "tt-main-items" });
        groups.set(it.group, g);
      }
      const b = h("button", { type: "button", class: "tt-main-item", "data-item": it.id }, [
        icon(it.icon, { size: 30 }),
        h("span", { class: "nm" }, [it.name]),
        h("small", {}, [it.hint]),
      ]);
      if (it.id === "daily") badgeDot(b, dailyReady() || undefined);
      b.addEventListener("click", () => goItem(it.id));
      g.append(b);
    }
    const grid = h(
      "div",
      { class: "tt-main-grid" },
      [...groups].map(([name, g]) => h("section", {}, [h("h4", { class: "tt-h4" }, [name]), g])),
    );
    host.append(side, grid);
  },
});
