import { portrait } from "../../../art/chibi";
import { GS } from "../../../core/state";
import { fmt } from "../../../core/util";
import { BURSTDESC, CHARS, EL, SKILLDESC, WEAP, byId } from "../../../data/content";
import { MENU } from "../../../data/menu-content";
import { affinityLevel, affinityNext, hasProfile, loadProfile, sectionLevel } from "../../../data/profiles";
import { ECON } from "../../../data/economy";
import { Server, lvCost, powerOf, statsOf } from "../../../server/server";
import { button, charCard, elementBadge, h, progress, stars, tabs, tag } from "../../ds";
import { blocksEl, sectionsEl, typewriter } from "../md";
import { registerScreen, rerender } from "../shell";

/* Màn Nhân vật (S10): danh sách đọc thẳng từ content/characters (S05B thêm người là tự có),
   hồ sơ đọc từ docs/characters/<id>/. Đổi nhân vật bằng ←/→ hoặc vuốt; Q/E đổi tab. */
const TABS = [
  { id: "info", label: "Thông tin", icon: "thong-tin" },
  { id: "stats", label: "Chỉ số", icon: "nang-cap" },
  { id: "skills", label: "Kỹ năng", icon: "ky-nang" },
  { id: "cons", label: "Nét Sao", icon: "net-sao" },
  { id: "profile", label: "Hồ sơ", icon: "huong-dan" },
];
let sel: string | null = null;
let tab = "info";
let say: ReturnType<typeof typewriter> | null = null;

/** Thứ tự: đã có trước, rồi độ hiếm, rồi thứ tự trong content. */
export function charOrder() {
  const P = Server.P;
  return [...CHARS].sort((a, b) => Number(!!P.owned[b.id]) - Number(!!P.owned[a.id]) || b.r - a.r).map((c) => c.id);
}

function step(d: number) {
  const ids = charOrder();
  sel = ids[(ids.indexOf(sel!) + d + ids.length) % ids.length]!;
  rerender();
  setTimeout(() => document.querySelector<HTMLElement>(`.tt-menu-chars [data-id="${sel}"]`)?.focus(), 0);
}
function stepTab(d: number) {
  tab = TABS[(TABS.findIndex((t) => t.id === tab) + d + TABS.length) % TABS.length]!.id;
  rerender();
  setTimeout(() => document.querySelector<HTMLElement>(".tt-char-detail .tt-tab[aria-selected=true]")?.focus(), 0);
}

function art(id: string, w: number, hh: number, kind: string) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = hh;
  c.getContext("2d")!.drawImage(portrait(id, w, hh, kind), 0, 0);
  return c;
}

async function render(host: HTMLElement, params: any) {
  const P = Server.P;
  if (params.id && byId[params.id]) {
    sel = params.id;
    params.id = null;
  }
  if (params.tab) {
    tab = params.tab;
    params.tab = null;
  }
  const ids = charOrder();
  if (!sel || !byId[sel]) sel = P.party[0] ?? ids[0]!;
  const c = byId[sel]!;
  host.classList.add("tt-menu-chars");

  const roster = h("div", { class: "tt-roster", role: "listbox", "aria-label": "Danh sách nhân vật" });
  for (const id of ids) {
    const x = byId[id]!,
      own = P.owned[id];
    const card = charCard({
      name: x.name,
      rarity: x.r as 4 | 5,
      el: x.el,
      elName: EL[x.el]?.vi ?? x.el,
      level: own?.lv,
      netSao: own?.cons,
      art: art(id, 96, 96, "head"),
      locked: !own,
      selected: id === sel,
    });
    card.dataset.id = id;
    card.setAttribute("role", "option");
    card.setAttribute("aria-selected", String(id === sel));
    card.addEventListener("click", () => {
      sel = id;
      rerender();
    });
    roster.append(card);
  }

  const detail = h("div", { class: "tt-char-detail", "data-id": c.id });
  const own = P.owned[c.id];
  const pts = P.affinity[c.id] ?? 0,
    alv = affinityLevel(pts),
    next = affinityNext(pts);
  const head = h("div", { class: "tt-char-head" }, [
    h("div", { class: "splash", "data-r": c.r }, [art(c.id, 300, 400, "splash")]),
    h("div", { class: "who" }, [
      h("div", { class: "eyebrow" }, [
        stars(c.r as 4 | 5, 14),
        elementBadge(c.el, { label: true, name: EL[c.el]?.vi }),
        " ",
        WEAP[c.w]?.vi ?? "",
      ]),
      h("h3", { class: "tt-h2 name" }, [c.name]),
      h("p", { class: "tt-dim" }, [c.title]),
      own
        ? h("div", { class: "aff" }, [
            h("span", {}, [`Thân thiết cấp ${alv}`]),
            progress(
              next === null
                ? 1
                : (pts - (MENU.affinity.levels[alv - 2] ?? 0)) /
                    ((MENU.affinity.levels[alv - 1] ?? 1) - (MENU.affinity.levels[alv - 2] ?? 0)),
              {
                kind: "thin",
                label: "Độ thân thiết",
              },
            ),
            h("small", { class: "tt-dim" }, [
              next === null ? "Đã thân thiết tối đa" : `Còn ${Math.ceil(next)} điểm tới cấp sau`,
            ]),
          ])
        : tag("Chưa có", "warn"),
      h("div", { class: "nav" }, [
        button("Người trước", { variant: "ghost", icon: "quay-lai", iconOnly: true, onClick: () => step(-1) }),
        h("span", { class: "tt-dim" }, [`${ids.indexOf(c.id) + 1}/${ids.length}`]),
        button("Người sau", { variant: "ghost", icon: "tiep", iconOnly: true, onClick: () => step(1) }),
      ]),
    ]),
  ]);
  const panel = h("div", { class: "tt-tabpanel", role: "tabpanel" });
  const tl = tabs(TABS, tab, (id) => {
    if (id === tab) return;
    tab = id;
    rerender();
  });
  detail.append(head, tl, panel);
  host.append(roster, detail);

  // vuốt ngang trên khung chi tiết để đổi nhân vật
  let sx = 0,
    sy = 0;
  head.addEventListener("pointerdown", (e) => ((sx = e.clientX), (sy = e.clientY)));
  head.addEventListener("pointerup", (e) => {
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - sy) * 1.5) step(dx < 0 ? 1 : -1);
  });

  const st = statsOf(c.id);
  if (tab === "info") {
    panel.append(h("p", {}, [c.desc]));
    if (own) {
      const cost = lvCost(own.lv);
      const row = h("div", { class: "tt-row" });
      if (own.lv < ECON.game.capNhanVat.toiDa) {
        row.append(
          button(`Lên 1 cấp · ${cost.books} Sách, ${fmt(cost.coin)} Xu`, {
            variant: "primary",
            icon: "nang-cap",
            onClick: () => lvUp(c.id, 1),
          }),
          button("Lên 10 cấp", { onClick: () => lvUp(c.id, 10) }),
        );
      } else row.append(tag("Đã đạt cấp tối đa", "ok"));
      panel.append(h("p", { class: "tt-dim" }, [`Cấp ${own.lv}/${ECON.game.capNhanVat.toiDa} · Nét Sao N${own.cons} · Chiến Lực ${fmt(powerOf(c.id))}`]), row);
    } else panel.append(h("p", { class: "tt-dim" }, ["Chưa sở hữu. Ước nguyện để gặp nhân vật này."]));
    const doc = hasProfile(c.id) ? (await loadProfile(c.id))["ho-so"] : null;
    const basic = doc?.sections[0];
    if (basic)
      panel.append(h("h4", { class: "tt-h4" }, [basic.title.replace(/^\d+\.\s*/, "")]), blocksEl(basic.blocks));
  } else if (tab === "stats") {
    const rows: [string, string][] = [
      ["Chiến Lực", fmt(powerOf(c.id))],
      ["Cấp", `${st.lv}/${ECON.game.capNhanVat.toiDa}`],
      ["Máu", fmt(st.hp)],
      ["Tấn công", fmt(st.atk)],
      ["Tỉ lệ chí mạng", `${Math.round(st.crit * 100)}%`],
      ["Sát thương chí mạng", `${Math.round(st.cdmg * 100)}%`],
      ["Nét Sao", `N${st.cons} (+${Math.round(st.cons * ECON.game.netSao.tangMoiNet * 100)}% máu và tấn công)`],
      ["Nguyên tố", EL[c.el]?.vi ?? c.el],
      ["Vũ khí", WEAP[c.w]?.vi ?? c.w],
    ];
    panel.append(
      h(
        "dl",
        { class: "tt-stats" },
        rows.flatMap(([k, v]) => [h("dt", {}, [k]), h("dd", {}, [v])]),
      ),
    );
  } else if (tab === "skills") {
    const sk = c.skill as any,
      bu = c.burst as any;
    panel.append(
      kit(`Đánh thường · ${WEAP[c.w]?.vi ?? ""}`, `Combo 3 đòn, đòn thứ 3 mang nguyên tố ${EL[c.el]?.vi}.`),
      kit(`Kỹ năng · ${sk.name} · hồi ${sk.cd} giây`, SKILLDESC[sk.type]?.(sk.m) ?? ""),
      kit(`Nộ · ${bu.name} · ${bu.cost} năng lượng`, BURSTDESC[bu.type]?.(bu.m) ?? ""),
    );
    const doc = hasProfile(c.id) ? (await loadProfile(c.id))["ky-nang-truyen"] : null;
    if (doc) {
      const need = sectionLevel("ky-nang-truyen", 0);
      panel.append(h("h4", { class: "tt-h4" }, ["Chuyện kỹ năng"]));
      panel.append(
        alv >= need && own
          ? sectionsEl(doc.sections, () => true)
          : h("p", { class: "tt-dim" }, [`Mở khi Thân thiết đạt cấp ${need}.`]),
      );
    }
  } else if (tab === "cons") {
    const doc = hasProfile(c.id) ? (await loadProfile(c.id))["cung-menh"] : null;
    const tbl = [...(doc?.intro ?? []), ...(doc?.sections.flatMap((s) => s.blocks) ?? [])].find(
      (b) => b.t === "table",
    ) as any;
    if (doc?.intro[0]?.t === "p") panel.append(blocksEl([doc.intro[0]]));
    const list = h("ol", { class: "tt-cons" });
    for (let i = 1; i <= 6; i++) {
      const row = tbl?.rows.find((r: string[]) => r[0]?.trim() === `N${i}`);
      const on = (own?.cons ?? -1) >= i;
      list.append(
        h("li", { class: on ? "is-on" : "" }, [
          h("span", { class: "n" }, [`N${i}`]),
          h("div", {}, [
            blocksEl([{ t: "p", text: row ? `**${row[1]!.replace(/\*\*/g, "")}**` : `Nét Sao ${i}` }]),
            row && on
              ? blocksEl([{ t: "p", text: row[2]! }])
              : h("p", { class: "tt-dim" }, [on ? "" : "Nhận thêm bản nhân vật này qua Ước nguyện để thắp nét sao."]),
            h("small", { class: "tt-dim" }, ["+10% máu và tấn công"]),
          ]),
        ]),
      );
    }
    panel.append(list);
  } else if (tab === "profile") {
    if (!hasProfile(c.id)) panel.append(h("p", { class: "tt-dim" }, ["Hồ sơ của nhân vật này đang được biên soạn."]));
    else {
      const docs = await loadProfile(c.id);
      say = typewriter();
      const lvl = own ? alv : 0;
      for (const sec of MENU.profile) {
        const d = docs[sec.file];
        if (!d) continue;
        const det = h("details", { class: "tt-prof", open: sec.file === "ho-so" }, [
          h("summary", {}, [sec.name, lvl < sec.level ? tag(`Thân thiết ${sec.level}`, "warn") : null]),
        ]);
        det.append(
          sectionsEl(
            d.sections,
            (i) => {
              const need = sectionLevel(sec.file, i);
              return lvl >= need ? true : need;
            },
            (situ, text) => say!.say(`${c.name} · ${situ}`, text),
          ),
        );
        panel.append(det);
      }
      panel.append(say.el);
    }
  }
}

function kit(t: string, d: string) {
  return h("div", { class: "tt-kit" }, [h("h4", { class: "tt-h4" }, [t]), h("p", {}, [d])]);
}

function lvUp(id: string, times: number) {
  const r = Server.req("levelUp", { id, times });
  if (!r.ok) return;
  // Nhân vật đang ra trận: cập nhật chỉ số ngay, giữ tỉ lệ máu hiện có.
  const m = GS.G?.party?.find((x: any) => x.id === id);
  if (m) {
    const st = statsOf(id);
    m.hp = m.alive ? Math.round((m.hp / m.maxHp) * st.hp) : m.hp;
    m.st = st;
    m.maxHp = st.hp;
  }
  rerender();
}

registerScreen("chars", {
  title: "Nhân vật",
  icon: "nhan-vat",
  render,
  onKey(e) {
    const a = document.activeElement as HTMLElement | null;
    if (a?.closest("details, .tt-tabpanel") && (e.key === "ArrowLeft" || e.key === "ArrowRight")) return false;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (a?.closest(".tt-roster")) return false;
      step(e.key === "ArrowRight" ? 1 : -1);
      return true;
    }
    if (e.key === "q" || e.key === "e") {
      stepTab(e.key === "e" ? 1 : -1);
      return true;
    }
    return false;
  },
  onClose: () => say?.stop(),
});
