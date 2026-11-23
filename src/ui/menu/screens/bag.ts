import { sfx } from "../../../core/audio";
import { EL, byId } from "../../../data/content";
import { calm } from "../../../core/settings";
import { ECON } from "../../../data/economy";
import { ITEMS, MC } from "../../../data/menu-content";
import { lvCapOf, passiveLevels, type WeaponInst } from "../../../economy/weapons";
import { Server } from "../../../server/server";
import { button, h, lootCard, openDialog, stars, tabs, tag, type LootRarity } from "../../ds";
import { icon } from "../../icons/icons";
import { weaponImg } from "../../weapon-art";
import { type BagSort, filterSort } from "../logic";
import { openMenu, registerScreen, rerender } from "../shell";
import {
  TYPE_NAME,
  filterWeapons,
  holderOf,
  nguonName,
  stackNote,
  pct,
  sortWeapons,
  statRows,
  storyOf,
  weaponCell,
  type WSort,
} from "../weapon-ui";
import { chipGroup, lockBtn } from "./weapons";
import "../tu-do.css";

/* Tủ Đồ (S24b): tab theo loại, lưới thẻ đồ bên trái, thanh dưới (sắp xếp, lọc, sức chứa), bảng chi tiết bên phải.
   Vật phẩm lấy từ content/items.yaml; vũ khí từ hồ sơ. */
export const CAPACITY = 2000;
export type TuDoTab = "vu-khi" | "bao-an" | "nl-nang-cap" | "nl-khac" | "nhiem-vu";
const TABS: { id: TuDoTab; label: string; icon: string }[] = [
  { id: "vu-khi", label: "Vũ khí", icon: "danh" },
  { id: "bao-an", label: "Bảo Ấn", icon: "bao-an" },
  { id: "nl-nang-cap", label: "Nguyên liệu nâng cấp", icon: "nang-cap" },
  { id: "nl-khac", label: "Nguyên liệu khác", icon: "tui-do" },
  { id: "nhiem-vu", label: "Vật phẩm nhiệm vụ", icon: "nhiem-vu" },
];
/** Loại vật phẩm (items.yaml) → tab Tủ Đồ. */
export const ITEM_TAB: Record<string, TuDoTab> = {
  "nguyen-lieu": "nl-nang-cap",
  "manh-sao": "nl-khac",
  "di-vat": "nl-khac",
  "sach-co": "nhiem-vu",
  "vu-khi": "nhiem-vu",
};
const W_SORTS: [WSort, string][] = [
  ["r", "Độ hiếm"],
  ["lv", "Cấp"],
  ["tl", "Tinh luyện"],
];
const I_SORTS: [BagSort, string][] = [
  ["rarity", "Độ hiếm"],
  ["qty", "Số lượng"],
  ["name", "Tên"],
];
const st = {
  slide: null as "l" | "r" | null,
  pop: false,
  tab: "vu-khi" as TuDoTab,
  wsort: "r" as WSort,
  isort: "rarity" as BagSort,
  f: { type: "all", r: 0, eq: "all" as "all" | "on" | "off" },
  wsel: null as string | null,
  isel: null as string | null,
};

export function bagRows(P: any = Server.P) {
  return ITEMS.map((it) => ({
    id: it.id,
    name: it.name,
    type: it.type,
    r: it.rarity,
    qty: it.profileKey ? Number(P[it.profileKey] ?? 0) : (P.bag[it.id] ?? 0),
  })).filter((r) => r.qty > 0);
}
const fmtQ = new Intl.NumberFormat("vi-VN");
/** Biểu tượng riêng cho từng vật phẩm; còn lại dùng biểu tượng của loại. */
function itemIcon(id: string, type: string) {
  if (id.startsWith("quang-")) return "quang";
  if (id.startsWith("phoi-")) return "phoi";
  if (id === "sach-kinh-nghiem") return "huong-dan";
  if (type === "vu-khi") return "danh";
  return MC.items.types.find((x) => x.id === type)?.icon ?? "tui-do";
}

function extBtn(label: string, ic: string, screen: string) {
  const b = button(label, { variant: "ghost", icon: ic, onClick: () => openMenu(screen) });
  b.classList.add("tt-tudo-ext");
  b.setAttribute("aria-label", label);
  return b;
}

function cycle<T>(opts: [T, string][], cur: T) {
  return opts[(opts.findIndex(([v]) => v === cur) + 1) % opts.length]![0];
}

function openFilter() {
  const body = h("div", { class: "tt-tudo-filter" });
  const paint = () => {
    body.replaceChildren(
      chipGroup<string>(
        "Loại",
        ["all", "sword", "great", "spear", "bow", "cat"].map((t) => [t, t === "all" ? "Tất cả" : TYPE_NAME(t)]),
        st.f.type,
        (v) => ((st.f.type = v), paint()),
      ),
      chipGroup<number>(
        "Độ hiếm",
        [
          [0, "Tất cả"],
          [5, "5★"],
          [4, "4★"],
          [3, "3★"],
        ],
        st.f.r,
        (v) => ((st.f.r = v), paint()),
      ),
      chipGroup<"all" | "on" | "off">(
        "Trang bị",
        [
          ["all", "Tất cả"],
          ["on", "Đang dùng"],
          ["off", "Chưa dùng"],
        ],
        st.f.eq,
        (v) => ((st.f.eq = v), paint()),
      ),
    );
  };
  paint();
  const reset = button("Bỏ lọc", { variant: "ghost", icon: "lam-moi" });
  const ok = button("Áp dụng", { variant: "primary", icon: "xac-nhan" });
  reset.addEventListener("click", () => {
    st.f = { type: "all", r: 0, eq: "all" };
    paint();
  });
  ok.addEventListener("click", () => rerender());
  openDialog({ title: "Lọc vũ khí", body: h("div", {}, [body, reset]), actions: [ok] });
}

/** Đầu bảng chi tiết: nền độ hiếm, tên, loại, chỉ số chính, sao, ảnh lớn bên phải. */
function detailHead(o: { r: number; name: string; kind: string; main?: [string, string]; art: Node; glow?: string }) {
  const motes = o.glow
    ? Array.from({ length: 7 }, (_, i) =>
        h("i", { class: "tt-mote", style: `--i:${i};--x:${(i * 37) % 100}%;--c:${o.glow}` }),
      )
    : [];
  return h("header", { class: "tt-tudo-head tt-loot-hero", "data-r": o.r }, [
    h("div", { class: "txt" }, [
      h("h3", { class: "name" }, [o.name]),
      h("p", { class: "kind" }, [o.kind]),
      o.main ? h("p", { class: "mk" }, [o.main[0]]) : null,
      o.main ? h("p", { class: "mv" }, [o.main[1]]) : null,
      stars(o.r as 3 | 4 | 5, 16),
    ]),
    h("div", { class: "art" }, [h("span", { class: "tt-tudo-ring", "aria-hidden": "true" }), o.art, ...motes]),
  ]);
}

/** Màu hạt sáng ở ảnh lớn: nguyên tố của chủ vũ khí (5★ giới hạn) hoặc người đang cầm, không có thì màu độ hiếm. */
function weaponGlow(d: { r: number; cua?: string }, who: string | null) {
  const el = byId[d.cua ?? who ?? ""]?.el;
  return el ? EL[el]?.c : `var(--tt-r${d.r})`;
}

function weaponDetail(w: WeaponInst) {
  const { d, rows } = statRows(w);
  const cap = lvCapOf(w, ECON),
    who = holderOf(w.uid),
    pv = passiveLevels(d, ECON);
  return h("aside", { class: "tt-tudo-detail", id: "weaponDetail", "data-r": d.r, "data-uid": w.uid }, [
    detailHead({
      r: d.r,
      name: d.ten,
      kind: TYPE_NAME(d.loai),
      main: rows[0],
      art: weaponImg(w.id, 512, d.ten),
      glow: weaponGlow(d, who),
    }),
    h("div", { class: "body" }, [
      h("div", { class: "tt-row meta" }, [
        h("b", { class: "lvl" }, [`Cấp ${w.lv}`, h("small", {}, [`/${cap}`])]),
        h("span", { class: "ref" }, [`Tinh luyện ${w.tl}`]),
        w.lock ? tag("Đã khóa", "warn") : null,
      ]),
      rows[1] ? h("dl", { class: "tt-stats" }, [h("dt", {}, [rows[1][0]]), h("dd", {}, [rows[1][1]])]) : null,
      h("h4", { class: "pname" }, [d.biDong.ten]),
      h("p", { class: "ptext" }, [
        "Tăng ",
        h("b", {}, [pct(pv[w.tl - 1]!)]),
        " sát thương gây ra" + stackNote(d, pv[w.tl - 1]!) + ".",
        h("small", { class: "tt-dim" }, [` (R${w.tl}; R5: ${pct(pv[4]!)})`]),
      ]),
      h("p", { class: "tt-story" }, [storyOf(d)]),
      h("p", { class: "src tt-dim" }, [`Nguồn: ${nguonName(d)}`]),
      who ? h("p", { class: "who" }, [`${byId[who]?.name} đang trang bị`]) : null,
    ]),
    h("footer", { class: "acts" }, [
      lockBtn(w),
      button("Nâng Cấp", {
        variant: "primary",
        icon: "nang-cap",
        onClick: () => openMenu("wupgrade", { uid: w.uid, mode: "lv" }),
      }),
      button("Tinh Luyện", { icon: "net-sao", onClick: () => openMenu("wupgrade", { uid: w.uid, mode: "tl" }) }),
    ]),
  ]);
}

function itemDetail(id: string, qty: number) {
  const it = ITEMS.find((x) => x.id === id)!;
  const t = MC.items.types.find((x) => x.id === it.type);
  return h("aside", { class: "tt-tudo-detail tt-bag-detail", id: "bagDetail", "data-r": it.rarity }, [
    detailHead({
      r: it.rarity,
      name: it.name,
      kind: t?.name ?? it.type,
      art: icon(itemIcon(it.id, it.type), { size: 72 }),
    }),
    h("div", { class: "body" }, [
      h("p", { class: "meta" }, [h("b", {}, [`Đang có ${fmtQ.format(qty)}`]), " · ", it.region]),
      h("p", { class: "tt-story" }, [it.story]),
    ]),
  ]);
}

function render(host: HTMLElement, params: any = {}) {
  host.classList.add("tt-menu-bag", "tt-tudo");
  if (params.tab) {
    st.tab = params.tab;
    params.tab = null;
  }
  if (params.uid) {
    st.wsel = params.uid;
    st.tab = "vu-khi";
    params.uid = null;
  }
  const tl = tabs(
    TABS.map((t) => ({ ...t })),
    st.tab,
    (id) => {
      if (id === st.tab) return;
      const ix = (t: string) => TABS.findIndex((x) => x.id === t);
      st.slide = ix(id) > ix(st.tab) ? "r" : "l";
      st.tab = id as TuDoTab;
      sfx("tab");
      rerender();
    },
  );
  tl.classList.add("tt-tudo-tabs");
  const grid = h("div", { class: "tt-tudo-grid", role: "list" });
  let detail: HTMLElement;
  const bar = h("div", { class: "tt-tudo-bar" });
  if (st.tab === "bao-an") {
    host.append(
      tl,
      h("div", { class: "tt-soon tt-tudo-soon" }, [icon("bao-an", { size: 44 }), h("b", {}, ["Bảo Ấn"]), "Sắp có"]),
    );
    return;
  }
  if (st.tab === "vu-khi") {
    grid.id = "weaponGrid";
    const all = Object.values(Server.P.weapons) as WeaponInst[];
    const list = sortWeapons(filterWeapons(all, st.f), st.wsort);
    if (!st.wsel || !list.some((w) => w.uid === st.wsel)) st.wsel = list[0]?.uid ?? null;
    for (const w of list) {
      const c = weaponCell(w, { selected: w.uid === st.wsel });
      c.setAttribute("role", "listitem");
      c.addEventListener("click", () => {
        st.wsel = w.uid;
        st.pop = true;
        sfx("pick");
        rerender();
      });
      grid.append(c);
    }
    const w = st.wsel ? Server.P.weapons[st.wsel] : null;
    detail = w
      ? weaponDetail(w)
      : h("aside", { class: "tt-tudo-detail tt-empty" }, [
          icon("tui-do", { size: 40 }),
          "Không có vũ khí khớp bộ lọc.",
        ]);
    const nf = (st.f.type !== "all" ? 1 : 0) + (st.f.r ? 1 : 0) + (st.f.eq !== "all" ? 1 : 0);
    bar.append(
      button(`Sắp xếp: ${W_SORTS.find(([k]) => k === st.wsort)![1]}`, {
        variant: "ghost",
        icon: "sap-xep",
        onClick: () => ((st.wsort = cycle(W_SORTS, st.wsort)), rerender()),
      }),
      button(nf ? `Lọc (${nf})` : "Lọc", { variant: nf ? "primary" : "ghost", icon: "tim-kiem", onClick: openFilter }),
      extBtn("Lò Rèn", "nang-cap", "forge"),
      extBtn("Bí Cảnh Binh Khí", "ruong", "bicanh"),
      h("span", { class: "cap", title: "Sức chứa" }, [
        icon("danh", { size: 16 }),
        h("b", {}, [`${list.length}`]),
        list.length !== all.length ? `/${all.length} · ` : "",
        `${all.length}/${CAPACITY}`,
      ]),
    );
  } else {
    grid.id = "bagGrid";
    const rows = filterSort(
      bagRows().filter((r) => ITEM_TAB[r.type] === st.tab),
      "all",
      st.isort,
    );
    if (!st.isel || !rows.some((r) => r.id === st.isel)) st.isel = rows[0]?.id ?? null;
    for (const r of rows) {
      const c = lootCard({
        rarity: r.r as LootRarity,
        art: icon(itemIcon(r.id, r.type), { size: 40 }),
        label: fmtQ.format(r.qty),
        selected: r.id === st.isel,
        ariaLabel: `${r.name}, ${r.r} sao, có ${r.qty}`,
      });
      c.classList.add("tt-item-cell");
      c.dataset.id = r.id;
      c.setAttribute("role", "listitem");
      c.addEventListener("click", () => ((st.isel = r.id), (st.pop = true), sfx("pick"), rerender()));
      grid.append(c);
    }
    const sel = rows.find((r) => r.id === st.isel);
    detail = sel
      ? itemDetail(sel.id, sel.qty)
      : h("aside", { class: "tt-tudo-detail tt-empty" }, [
          icon("tui-do", { size: 40 }),
          "Chưa có vật phẩm loại này. Mở rương và hạ quái để tìm.",
        ]);
    bar.append(
      button(`Sắp xếp: ${I_SORTS.find(([k]) => k === st.isort)![1]}`, {
        variant: "ghost",
        icon: "sap-xep",
        onClick: () => ((st.isort = cycle(I_SORTS, st.isort)), rerender()),
      }),
      h("span", { class: "cap" }, [`${rows.length} loại`]),
    );
  }
  const main = h("div", { class: "tt-tudo-main" + (st.slide ? ` tt-slide-${st.slide}` : "") }, [
    h("section", { class: "tt-tudo-left" }, [grid, bar]),
    detail,
  ]);
  if (st.pop) grid.querySelector(".is-sel")?.classList.add("is-pop");
  st.slide = null;
  st.pop = false;
  host.append(sky(host), tl, main);
}

/** Lớp chòm sao parallax: theo con trỏ hoặc độ nghiêng máy, gom theo khung hình; tắt khi Giảm chuyển động. */
function sky(host: HTMLElement) {
  const el = h("div", { class: "tt-tudo-sky", "aria-hidden": "true" });
  if (calm()) return el;
  const ac = new AbortController();
  let tx = 0,
    ty = 0,
    raf = 0;
  const set = (x: number, y: number) => {
    tx = Math.max(-1, Math.min(1, x));
    ty = Math.max(-1, Math.min(1, y));
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!el.isConnected) return ac.abort();
        el.style.setProperty("--px", tx.toFixed(3));
        el.style.setProperty("--py", ty.toFixed(3));
      });
  };
  const o = { signal: ac.signal, passive: true } as const;
  host.addEventListener(
    "pointermove",
    (e) => set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1),
    o,
  );
  addEventListener("deviceorientation", (e) => set((e.gamma ?? 0) / 30, ((e.beta ?? 45) - 45) / 30), o);
  return el;
}

export const renderTuDo = render;
registerScreen("bag", { title: "Tủ Đồ", icon: "tui-do", render });
