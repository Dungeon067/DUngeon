import { ITEMS, MC } from "../../../data/menu-content";
import { Server } from "../../../server/server";
import { button, h, stars, tabs, tag } from "../../ds";
import { icon } from "../../icons/icons";
import { type BagSort, filterSort } from "../logic";
import { registerScreen, rerender } from "../shell";

/* Túi đồ (S10): lưới theo loại, lọc, sắp xếp, chi tiết kèm câu chuyện (content/items.yaml ← docs/world/08). */
let type = "all";
let sort: BagSort = "rarity";
let sel: string | null = null;
const SORTS: [BagSort, string][] = [
  ["rarity", "Độ hiếm"],
  ["name", "Tên"],
  ["qty", "Số lượng"],
];

export function bagRows(P: any = Server.P) {
  return ITEMS.map((it) => ({
    id: it.id,
    name: it.name,
    type: it.type,
    r: it.rarity,
    qty: it.profileKey ? Number(P[it.profileKey] ?? 0) : (P.bag[it.id] ?? 0),
  })).filter((r) => r.qty > 0);
}

function render(host: HTMLElement) {
  host.classList.add("tt-menu-bag");
  const all = bagRows();
  const types = MC.items.types.filter((t) => all.some((r) => r.type === t.id));
  if (type !== "all" && !types.some((t) => t.id === type)) type = "all";
  const tl = tabs(
    [{ id: "all", label: "Tất cả", icon: "tui-do" }, ...types.map((t) => ({ id: t.id, label: t.name, icon: t.icon }))],
    type,
    (id) => {
      if (id === type) return;
      type = id;
      sel = null;
      rerender();
    },
  );
  const sorter = h("div", { class: "tt-row", role: "group", "aria-label": "Sắp xếp" }, [
    h("span", { class: "tt-dim" }, ["Sắp xếp:"]),
    ...SORTS.map(([k, l]) => {
      const b = button(l, { variant: sort === k ? "primary" : "ghost" });
      b.setAttribute("aria-pressed", String(sort === k));
      b.addEventListener("click", () => ((sort = k), rerender()));
      return b;
    }),
  ]);
  const rows = filterSort(all, type, sort);
  if (!sel || !rows.some((r) => r.id === sel)) sel = rows[0]?.id ?? null;
  const grid = h("div", { class: "tt-bag-grid", id: "bagGrid", role: "list" });
  for (const r of rows) {
    const t = MC.items.types.find((x) => x.id === r.type);
    const b = h(
      "button",
      { type: "button", class: "tt-bag-cell" + (r.id === sel ? " is-sel" : ""), "data-r": r.r, "data-id": r.id, role: "listitem", "aria-pressed": String(r.id === sel) },
      [icon(t?.icon ?? "tui-do", { size: 34 }), h("span", { class: "q" }, [`×${r.qty}`]), h("span", { class: "nm" }, [r.name])],
    );
    b.addEventListener("click", () => ((sel = r.id), rerender()));
    grid.append(b);
  }
  const it = ITEMS.find((x) => x.id === sel);
  const detail = it
    ? h("aside", { class: "tt-panel tt-bag-detail", id: "bagDetail", "data-r": it.rarity }, [
        h("h3", { class: "tt-h2" }, [it.name]),
        stars(it.rarity, 16),
        h("div", { class: "tt-row" }, [
          tag(MC.items.types.find((x) => x.id === it.type)?.name ?? it.type),
          tag(it.region),
          it.weapon ? tag(it.weapon) : "",
        ]),
        h("p", { class: "tt-story" }, [it.story]),
        h("p", { class: "tt-dim" }, [`Đang có: ${rows.find((r) => r.id === it.id)?.qty ?? 0}`]),
        h("p", { class: "tt-dim" }, ["Vật phẩm này để sưu tầm và đọc chuyện; cách dùng sẽ có ở bản sau."]),
      ])
    : h("aside", { class: "tt-panel tt-empty" }, [icon("tui-do", { size: 40 }), h("p", {}, ["Túi đồ trống. Mở rương và hạ quái để tìm vật phẩm."])]);
  host.append(tl, sorter, h("div", { class: "tt-bag" }, [rows.length ? grid : h("div"), detail]));
}

registerScreen("bag", { title: "Túi đồ", icon: "tui-do", render });
