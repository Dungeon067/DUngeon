/** Thành phần giao diện Bảo Ấn dùng chung (S31): ô lưới, thẻ chi tiết, hiệu ứng bộ, chòm sao 5 mảnh, lọc và sắp xếp. */
import { fmt } from "../../core/util";
import { byId } from "../../data/content";
import { BA } from "../../data/bao-an";
import { SLOT_IDS, type SlotId, type StatId } from "../../data/bao-an-schema";
import { activeSets, capOf, isPct, mainValue, setOf, slotOf, starState, type BaoAnInst } from "../../economy/bao-an";
import { Server, baHolders } from "../../server/server";
import { h, lootCard, stars, tag, type LootRarity } from "../ds";
import { baoAnImg } from "../bao-an-art";
import { miniPortrait } from "./weapon-ui";
import "./bao-an.css";

export const statName = (k: StatId) => BA.chiSo[k]?.ten ?? k;
export const fmtStat = (k: StatId, v: number) =>
  isPct(BA, k) ? `${(v * 100).toFixed(1).replace(/\.0$/, "")}%` : fmt(Math.round(v));
/** Tên đầy đủ dòng chỉ số: "Máu" cho số, "Máu %" khi là phần trăm có cùng tên với chỉ số số. */
export const statLabel = (k: StatId) => (["hpPct", "atkPct", "defPct"].includes(k) ? `${statName(k)} %` : statName(k));
export const slotName = (o: SlotId) => slotOf(BA, o).ten;
export const pieceOf = (a: Pick<BaoAnInst, "bo" | "o">) => setOf(BA, a.bo).mon[a.o];
export const baHolderOf = (uid: string) => baHolders(Server.P)[uid] ?? null;
export const baList = () => Object.values(Server.P.baoAn ?? {}) as BaoAnInst[];

/** Thẻ Bảo Ấn trong lưới (kiểu thẻ đồ S24b). */
export function baCell(
  a: BaoAnInst,
  o: { selected?: boolean; picked?: boolean; disabled?: boolean; static?: boolean } = {},
) {
  const p = pieceOf(a),
    who = baHolderOf(a.uid);
  const b = lootCard({
    rarity: a.r as LootRarity,
    art: baoAnImg(a.bo, a.o, 128, p.ten),
    label: `+${a.lv}`,
    locked: a.lock,
    holder: who ? miniPortrait(who) : null,
    selected: o.selected,
    picked: o.picked,
    disabled: o.disabled,
    static: o.static,
    ariaLabel: `${p.ten}, ${slotName(a.o)}, ${a.r} sao, +${a.lv}${a.lock ? ", đã khóa" : ""}${who ? `, ${byId[who]?.name} đang mặc` : ""}`,
  });
  b.classList.add("tt-bacell");
  b.dataset.uid = a.uid;
  b.dataset.bo = a.bo;
  b.dataset.o = a.o;
  return b;
}

/** Dòng chỉ số chính và dòng phụ. `jump`: các dòng vừa đổi ở mốc +4 (hiệu ứng nhảy số). */
export function baStatList(a: BaoAnInst, jump: Set<string> = new Set()) {
  return h("dl", { class: "tt-stats tt-bastats" }, [
    h("dt", { class: "main" }, [statLabel(a.chinh)]),
    h("dd", { class: "main" + (jump.has("main") ? " is-jump" : "") }, [fmtStat(a.chinh, mainValue(BA, a))]),
    ...a.phu.flatMap((x) => [
      h("dt", {}, [`· ${statLabel(x.k)}`]),
      h("dd", { class: jump.has(x.k) ? "is-jump" : "", "data-k": x.k }, [
        `+${fmtStat(x.k, x.v)}`,
        x.n > 1 ? h("small", { class: "tt-dim" }, [` (${x.n} lần)`]) : null,
      ]),
    ]),
  ]);
}

/** Hiệu ứng 2 và 4 mảnh của một vì sao; `n` là số mảnh đang mặc (mức đạt thì sáng). */
export function setEffects(bo: string, n = 0) {
  const s = setOf(BA, bo);
  return h("div", { class: "tt-baset", "data-bo": bo, style: `--c1:${s.mau[0]};--c2:${s.mau[1]}` }, [
    h("h4", { class: "tt-h4" }, [s.sao.ten, h("small", { class: "tt-dim" }, [` · ${s.ten} · ${n}/5`])]),
    h("p", { class: n >= 2 ? "is-on" : "" }, [h("b", {}, ["2 mảnh: "]), s.hai.hieuUng]),
    h("p", { class: n >= 4 ? "is-on" : "" }, [h("b", {}, ["4 mảnh: "]), s.bon.hieuUng]),
  ]);
}

/** Thẻ chi tiết Bảo Ấn: ảnh lớn, tên, ô, sao, cấp, chỉ số, hiệu ứng bộ, truyện. */
export function baCard(a: BaoAnInst, actions: HTMLElement[] = [], jump?: Set<string>) {
  const p = pieceOf(a),
    s = setOf(BA, a.bo),
    who = baHolderOf(a.uid);
  return h("article", { class: "tt-wcard tt-bacard", "data-r": a.r, "data-uid": a.uid }, [
    h("div", { class: "hero tt-loot-hero", "data-r": a.r }, [baoAnImg(a.bo, a.o, 512, p.ten)]),
    h("div", { class: "body" }, [
      h("p", { class: "tt-eyebrow" }, [`Mảnh Sao · ${slotName(a.o).replace(/^Mảnh /, "")} · ${s.sao.ten}`]),
      h("h3", { class: "tt-h2 name" }, [p.ten]),
      h("div", { class: "tt-row meta" }, [
        stars(a.r, 15),
        h("b", { class: "lvl" }, [`+${a.lv}/${capOf(BA, a.r)}`]),
        a.lock ? tag("Đã khóa", "warn") : null,
        who ? tag(`${byId[who]?.name} đang mặc`, "ok") : null,
      ]),
      baStatList(a, jump),
      setEffects(a.bo, who ? worn(who).filter((x) => x.bo === a.bo).length : 0),
      h("p", { class: "tt-story" }, [p.truyen]),
      actions.length ? h("div", { class: "tt-row actions" }, actions) : null,
    ]),
  ]);
}

export const worn = (cid: string) =>
  SLOT_IDS.map((o) => Server.P.owned[cid]?.ba?.[o])
    .map((u) => (u ? Server.P.baoAn[u] : undefined))
    .filter((x): x is BaoAnInst => !!x);

/** Danh sách vì sao đang kích hoạt cho một bộ đồ đang mặc. */
export function activeSetList(items: BaoAnInst[]) {
  const sets = activeSets(BA, items);
  if (!sets.some((x) => x.hai))
    return h("p", { class: "tt-dim", id: "baSetNone" }, [
      "Chưa có vì sao nào sáng. Mặc 2 mảnh cùng bộ để sáng Sao nhóm.",
    ]);
  return h(
    "div",
    { class: "tt-basets", id: "baSets" },
    sets
      .filter((x) => x.hai)
      .map((x) => {
        const el = setEffects(x.bo, x.n);
        el.prepend(tag(starState(x.n), x.tron ? "ok" : undefined));
        return el;
      }),
  );
}

// Năm đỉnh ngôi sao (tâm 50,50, bán kính 42), đỉnh trên cùng là Mảnh Hoa, đi theo chiều kim đồng hồ.
export const STAR_PTS: [number, number][] = SLOT_IDS.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
  return [50 + 42 * Math.cos(a), 50 + 42 * Math.sin(a)];
});
const STAR_PATH = [0, 2, 4, 1, 3, 0]
  .map((i, k) => `${k ? "L" : "M"}${STAR_PTS[i]![0].toFixed(1)} ${STAR_PTS[i]![1].toFixed(1)}`)
  .join(" ");

/** Chòm sao 5 mảnh: nét nối các ô đang mặc; đủ 5 mảnh cùng bộ thì vì sao sáng trọn (ghép sao). */
export function constellation(items: BaoAnInst[], center: Node, onSlot: (o: SlotId) => void, play: boolean) {
  const by: Partial<Record<SlotId, BaoAnInst>> = {};
  for (const a of items) by[a.o] = a;
  const sets = activeSets(BA, items),
    full = sets.find((x) => x.tron),
    main = sets[0];
  const col = main && main.n >= 2 ? main.set.mau : ["#ffe7a0", "#9fc4ff"];
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("class", "tt-bastar-svg");
  svg.setAttribute("aria-hidden", "true");
  const seg = (i: number, j: number) => {
    const l = document.createElementNS(svgNs, "line"),
      on = !!by[SLOT_IDS[i]!] && !!by[SLOT_IDS[j]!];
    l.setAttribute("x1", String(STAR_PTS[i]![0]));
    l.setAttribute("y1", String(STAR_PTS[i]![1]));
    l.setAttribute("x2", String(STAR_PTS[j]![0]));
    l.setAttribute("y2", String(STAR_PTS[j]![1]));
    l.setAttribute("class", on ? "on" : "off");
    return l;
  };
  for (const [i, j] of [
    [0, 2],
    [2, 4],
    [4, 1],
    [1, 3],
    [3, 0],
  ] as const)
    svg.append(seg(i, j));
  const glow = document.createElementNS(svgNs, "path");
  glow.setAttribute("d", STAR_PATH + " Z");
  glow.setAttribute("class", "glow");
  svg.append(glow);
  const host = h(
    "div",
    {
      class:
        "tt-bastar" + (full ? " is-tron" : main && main.n >= 4 ? " is-rang" : "") + (full && play ? " is-play" : ""),
      id: "baStar",
      "data-state": full ? "tron" : main ? starState(main.n) : "",
      style: `--c1:${col[0]};--c2:${col[1]}`,
    },
    [svg, h("div", { class: "tt-bastar-c" }, [center])],
  );
  SLOT_IDS.forEach((o, i) => {
    const a = by[o],
      [x, y] = STAR_PTS[i]!;
    const b = h(
      "button",
      {
        type: "button",
        class: "tt-baslot" + (a ? " is-on" : ""),
        "data-o": o,
        "data-r": a?.r ?? 0,
        style: `left:${x}%;top:${y}%;--i:${i};--dx:${50 - x}%;--dy:${50 - y}%`,
        "aria-label": a ? `${slotName(o)}: ${pieceOf(a).ten} +${a.lv}` : `${slotName(o)}: trống`,
      },
      [
        a ? baoAnImg(a.bo, a.o, 128, pieceOf(a).ten) : h("span", { class: "empty" }, ["+"]),
        h("small", {}, [a ? `+${a.lv}` : slotName(o).replace(/^Mảnh /, "")]),
      ],
    );
    b.addEventListener("click", () => onSlot(o));
    host.append(b);
  });
  if (full) host.append(h("div", { class: "tt-bastar-name", role: "status" }, [`${full.set.sao.ten} sáng trọn`]));
  return host;
}

export type BaSort = "r" | "lv" | "bo";
export interface BaFilter {
  bo: string;
  o: SlotId | "all";
  chinh: StatId | "all";
  r: number;
  eq: "all" | "on" | "off";
}
export const NO_FILTER: BaFilter = { bo: "all", o: "all", chinh: "all", r: 0, eq: "all" };
export const nFilter = (f: BaFilter) =>
  (f.bo !== "all" ? 1 : 0) +
  (f.o !== "all" ? 1 : 0) +
  (f.chinh !== "all" ? 1 : 0) +
  (f.r ? 1 : 0) +
  (f.eq !== "all" ? 1 : 0);
export function filterBa(list: BaoAnInst[], f: BaFilter) {
  const hold = baHolders(Server.P);
  return list.filter(
    (a) =>
      (f.bo === "all" || a.bo === f.bo) &&
      (f.o === "all" || a.o === f.o) &&
      (f.chinh === "all" || a.chinh === f.chinh) &&
      (!f.r || a.r === f.r) &&
      (f.eq === "all" || (f.eq === "on") === !!hold[a.uid]),
  );
}
export function sortBa(list: BaoAnInst[], sort: BaSort) {
  const bi = (bo: string) => BA.bo.findIndex((x) => x.id === bo);
  const key = (a: BaoAnInst) =>
    sort === "lv" ? [a.lv, a.r, -bi(a.bo)] : sort === "bo" ? [-bi(a.bo), a.r, a.lv] : [a.r, a.lv, -bi(a.bo)];
  return [...list].sort((a, b) => {
    const ka = key(a),
      kb = key(b);
    for (let i = 0; i < 3; i++) if (ka[i] !== kb[i]) return kb[i]! - ka[i]!;
    return SLOT_IDS.indexOf(a.o) - SLOT_IDS.indexOf(b.o) || a.uid.localeCompare(b.uid, undefined, { numeric: true });
  });
}
export const BA_SORTS: [BaSort, string][] = [
  ["r", "Độ hiếm"],
  ["lv", "Cấp"],
  ["bo", "Bộ"],
];
/** Chỉ số chính có thể ra ở ô o (hoặc mọi ô). */
export function mainStatsOf(o: SlotId | "all") {
  const ks = new Set<StatId>();
  for (const s of BA.o) if (o === "all" || s.id === o) for (const k of Object.keys(s.chinh) as StatId[]) ks.add(k);
  return [...ks];
}
