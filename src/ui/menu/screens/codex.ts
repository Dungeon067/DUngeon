import { portrait } from "../../../art/chibi";
import { CHARS, EL } from "../../../data/content";
import { type MdDoc, inline, parseDoc } from "../../../data/markdown";
import { CODEX, ITEMS, MC } from "../../../data/menu-content";
import { Server } from "../../../server/server";
import { elementBadge, h, stars, tabs, tag } from "../../ds";
import { icon } from "../../icons/icons";
import { blocksEl, sectionsEl } from "../md";
import { registerScreen, rerender } from "../shell";

/* Bách khoa (S10): sinh vật, nhân vật, địa danh, vật phẩm đã khám phá và các bài viết về Vọng Tinh Giới
   (docs/world/). Mục chưa khám phá hiện bóng đen và "???". */
const WORLD = import.meta.glob<string>("../../../../docs/world/0*.md", { query: "?raw", import: "default", eager: true });
const ARTICLES: { id: string; doc: MdDoc }[] = Object.entries(WORLD)
  .filter(([p]) => !/10-cau-hoi-mo/.test(p))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([p, src]) => ({ id: p.split("/").pop()!.replace(/\.md$/, ""), doc: parseDoc(src) }));

interface Entry {
  id: string;
  name: string;
  found: boolean;
  sub?: string;
  art?: () => HTMLElement;
  body: () => (HTMLElement | string)[];
}

const rich = (s?: string | null) => {
  const p = document.createElement("p");
  p.innerHTML = inline(s ?? "");
  return p;
};

export function codexEntries(cat: string, P: any = Server.P): Entry[] {
  const has = (k: string) => P.codex.includes(k);
  if (cat === "creatures")
    return CODEX.creatures.map((c) => ({
      id: c.id,
      name: c.name,
      found: has("quai:" + c.id),
      sub: c.inGame ? undefined : "Chưa xuất hiện trong bản thử nghiệm",
      body: () => [
        c.habitat ? h("p", {}, [h("b", {}, ["Nơi sống: "]), c.habitat]) : "",
        rich(c.lore),
        c.weak ? h("p", {}, [h("b", {}, ["Điểm yếu: "]), c.weak]) : "",
        c.rumor ? h("blockquote", { class: "tt-quote" }, [c.rumor.replace(/^"|"$/g, "")]) : "",
      ],
    }));
  if (cat === "chars")
    return CHARS.map((c) => ({
      id: c.id,
      name: c.name,
      found: !!P.owned[c.id] || has("nv:" + c.id),
      sub: c.title,
      art: () => {
        const cv = document.createElement("canvas");
        cv.width = cv.height = 96;
        cv.getContext("2d")!.drawImage(portrait(c.id, 96, 96, "head"), 0, 0);
        return cv;
      },
      body: () => [
        h("div", { class: "tt-row" }, [stars(c.r as 4 | 5, 14), elementBadge(c.el, { label: true, name: EL[c.el]?.vi })]),
        h("p", {}, [c.desc]),
        P.owned[c.id] ? h("p", { class: "tt-dim" }, ["Xem hồ sơ đầy đủ trong màn Nhân vật."]) : "",
      ],
    }));
  if (cat === "places")
    return CODEX.places.map((p) => ({
      id: p.id,
      name: p.name,
      found: has("dia:" + p.id),
      body: () => [rich(p.lore), p.secret ? h("details", { class: "tt-prof" }, [h("summary", {}, ["Bí mật"]), rich(p.secret)]) : ""],
    }));
  return ITEMS.map((it) => ({
    id: it.id,
    name: it.name,
    found: has("vat:" + it.id) || (P.bag[it.id] ?? 0) > 0 || (!!it.profileKey && Number(P[it.profileKey] ?? 0) > 0),
    sub: MC.items.types.find((t) => t.id === it.type)?.name,
    body: () => [h("div", { class: "tt-row" }, [stars(it.rarity, 14), tag(it.region)]), rich(it.story)],
  }));
}

let cat = "creatures";
let sel: Record<string, string> = {};
const CATS = [
  { id: "creatures", label: "Sinh vật", icon: "danh" },
  { id: "chars", label: "Nhân vật", icon: "nhan-vat" },
  { id: "places", label: "Địa danh", icon: "ban-do" },
  { id: "items", label: "Vật phẩm", icon: "tui-do" },
  { id: "world", label: "Thế giới", icon: "huong-dan" },
];

function render(host: HTMLElement) {
  host.classList.add("tt-menu-codex");
  const P = Server.P;
  const counts = (c: string) => {
    const e = codexEntries(c, P);
    return `${e.filter((x) => x.found).length}/${e.length}`;
  };
  const tl = tabs(
    CATS.map((c) => ({ ...c, label: c.id === "world" ? c.label : `${c.label} ${counts(c.id)}` })),
    cat,
    (id) => {
      if (id === cat) return;
      cat = id;
      rerender();
    },
  );
  const grid = h("div", { class: "tt-codex-grid", id: "codexGrid", role: "list" });
  let detail: HTMLElement;
  if (cat === "world") {
    const cur = ARTICLES.find((a) => a.id === sel.world) ?? ARTICLES[0];
    for (const a of ARTICLES) {
      const b = h("button", { type: "button", class: "tt-codex-cell is-found" + (a === cur ? " is-sel" : ""), role: "listitem", "aria-pressed": String(a === cur) }, [
        icon("huong-dan", { size: 26 }),
        h("span", { class: "nm" }, [a.doc.title.replace(/^\d+\.\s*/, "")]),
      ]);
      b.addEventListener("click", () => ((sel.world = a.id), rerender()));
      grid.append(b);
    }
    detail = h("article", { class: "tt-panel tt-codex-detail tt-md-doc", id: "codexDetail" }, cur
      ? [h("h3", { class: "tt-h2" }, [cur.doc.title]), blocksEl(cur.doc.intro), sectionsEl(cur.doc.sections, () => true)]
      : [h("p", { class: "tt-dim" }, ["Chưa có bài viết."])]);
  } else {
    const list = codexEntries(cat, P);
    const cur = list.find((e) => e.id === sel[cat]) ?? list.find((e) => e.found) ?? list[0];
    for (const e of list) {
      const b = h(
        "button",
        {
          type: "button",
          class: "tt-codex-cell" + (e.found ? " is-found" : " is-locked") + (e === cur ? " is-sel" : ""),
          role: "listitem",
          "data-id": e.id,
          "aria-pressed": String(e === cur),
          "aria-label": e.found ? e.name : "Chưa khám phá",
        },
        [e.art ? e.art() : icon(CATS.find((c) => c.id === cat)!.icon, { size: 26 }), h("span", { class: "nm" }, [e.found ? e.name : "???"])],
      );
      b.addEventListener("click", () => ((sel[cat] = e.id), rerender()));
      grid.append(b);
    }
    detail = h(
      "article",
      { class: "tt-panel tt-codex-detail", id: "codexDetail" },
      !cur
        ? [h("p", { class: "tt-dim" }, ["Chưa có mục nào."])]
        : cur.found
          ? [h("h3", { class: "tt-h2" }, [cur.name]), cur.sub ? h("p", { class: "tt-dim" }, [cur.sub]) : "", ...cur.body()]
          : [
              h("div", { class: "tt-codex-shadow" }, [cur.art ? cur.art() : icon(CATS.find((c) => c.id === cat)!.icon, { size: 64 })]),
              h("h3", { class: "tt-h2" }, ["???"]),
              h("p", { class: "tt-dim" }, [
                cat === "creatures" ? "Hạ được sinh vật này để mở mục." : cat === "places" ? "Đi tới nơi này để mở mục." : cat === "chars" ? "Gặp Hộ Tinh này qua Ước nguyện để mở mục." : "Tìm được vật phẩm này để mở mục.",
              ]),
            ],
    );
  }
  host.append(tl, h("div", { class: "tt-codex" }, [grid, detail]));
}

registerScreen("codex", {
  title: "Bách khoa",
  icon: "huong-dan",
  render,
  onKey(e) {
    if (e.key !== "q" && e.key !== "e") return false;
    const i = CATS.findIndex((c) => c.id === cat);
    cat = CATS[(i + (e.key === "e" ? 1 : CATS.length - 1)) % CATS.length]!.id;
    rerender();
    return true;
  },
});
