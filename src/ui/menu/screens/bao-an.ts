/* S31 Bảo Ấn: tab Tủ Đồ, thẻ Nhân vật, Thay Mảnh Sao, Nâng cấp, Bí Cảnh Bảo Ấn (kèm đổi Bụi Ấn và Admin). Mọi thay đổi đi qua Server.req. */
import { sfx } from "../../../core/audio";
import { calm } from "../../../core/settings";
import { fmt } from "../../../core/util";
import { byId } from "../../../data/content";
import { BA } from "../../../data/bao-an";
import { SLOT_IDS, type SlotId, type StatId } from "../../../data/bao-an-schema";
import { ITEM_BY_ID } from "../../../data/menu-content";
import {
  capOf,
  dismantleYield,
  fodderExp,
  previewExp,
  setOf,
  type BaoAnInst,
  type MilestoneRoll,
} from "../../../economy/bao-an";
import { stackOf } from "../../../entities/party";
import { GS } from "../../../core/state";
import { startBaoAn } from "../../../modes/bao-an";
import {
  Server,
  baDoiLeft,
  hoTinhOf,
  linhLucNow,
  powerOf,
  statsOf,
  ttMaxOf,
  type BaOverride,
} from "../../../server/server";
import { leaveWorld } from "../../screens";
import { button, h, openDialog, progress, toast } from "../../ds";
import { icon } from "../../icons/icons";
import { baoAnImg } from "../../bao-an-art";
import { back, closeMenu, openMenu, refreshWallets, registerScreen, rerender } from "../shell";
import {
  BA_SORTS,
  NO_FILTER,
  activeSetList,
  baCard,
  baCell,
  baHolderOf,
  baList,
  constellation,
  filterBa,
  fmtStat,
  mainStatsOf,
  nFilter,
  pieceOf,
  slotName,
  sortBa,
  statLabel,
  worn,
  type BaFilter,
  type BaSort,
} from "../bao-an-ui";
import { compareRows, fmtInt, pct } from "../weapon-ui";
import { chipGroup } from "./weapons";

const bagOf = (id: string) => Server.P.bag[id] ?? 0;
const itemName = (id: string) => ITEM_BY_ID[id]?.name ?? id;
const cycle = <T>(opts: [T, string][], cur: T) => opts[(opts.findIndex(([v]) => v === cur) + 1) % opts.length]![0];

function confirm(title: string, body: string, ok: string, run: () => void) {
  const yes = button(ok, { variant: "primary", icon: "xac-nhan" });
  const no = button("Hủy", { variant: "ghost" });
  yes.id = "baConfirm";
  yes.addEventListener("click", run);
  openDialog({ title, body: h("p", {}, [body]), actions: [no, yes], ornate: true });
}
function refreshParty(ids: (string | null)[]) {
  for (const id of ids) {
    const m = id && GS.G?.party?.find((x: any) => x.id === id);
    if (!m) continue;
    const st = statsOf(id);
    m.hp = m.alive ? Math.round((m.hp / m.maxHp) * st.hp) : m.hp;
    m.st = st;
    m.maxHp = st.hp;
    m.stack = stackOf(id, m.stack ?? null);
  }
}

/** Hộp lọc Bảo Ấn: bộ, ô, chỉ số chính, độ hiếm, trang bị. */
function openBaFilter(cur: BaFilter, apply: (f: BaFilter) => void, fixO = false) {
  const f = { ...cur };
  const body = h("div", { class: "tt-tudo-filter", id: "baFilter" });
  const paint = () => {
    body.replaceChildren(
      chipGroup<string>(
        "Bộ",
        [["all", "Tất cả"], ...BA.bo.map((b) => [b.id, b.sao.ten] as [string, string])],
        f.bo,
        (v) => ((f.bo = v), paint()),
      ),
      fixO
        ? h("span")
        : chipGroup<string>(
            "Ô",
            [["all", "Tất cả"], ...SLOT_IDS.map((o) => [o, slotName(o)] as [string, string])],
            f.o,
            (v) => ((f.o = v as SlotId | "all"), (f.chinh = "all"), paint()),
          ),
      chipGroup<string>(
        "Chỉ số chính",
        [["all", "Tất cả"], ...mainStatsOf(f.o).map((k) => [k, statLabel(k)] as [string, string])],
        f.chinh,
        (v) => ((f.chinh = v as StatId | "all"), paint()),
      ),
      chipGroup<number>(
        "Độ hiếm",
        [
          [0, "Tất cả"],
          [5, "5★"],
          [4, "4★"],
          [3, "3★"],
        ],
        f.r,
        (v) => ((f.r = v), paint()),
      ),
      chipGroup<string>(
        "Trang bị",
        [
          ["all", "Tất cả"],
          ["on", "Đang mặc"],
          ["off", "Chưa mặc"],
        ],
        f.eq,
        (v) => ((f.eq = v as BaFilter["eq"]), paint()),
      ),
    );
  };
  paint();
  const reset = button("Bỏ lọc", { variant: "ghost", icon: "lam-moi" });
  const ok = button("Áp dụng", { variant: "primary", icon: "xac-nhan" });
  ok.id = "baFilterOk";
  reset.addEventListener("click", () => {
    Object.assign(f, { ...NO_FILTER, o: fixO ? f.o : "all" });
    paint();
  });
  ok.addEventListener("click", () => {
    apply(f);
    rerender();
  });
  openDialog({ title: "Lọc Bảo Ấn", body: h("div", {}, [body, reset]), actions: [ok] });
}

function lockBaBtn(a: BaoAnInst) {
  const b = button(a.lock ? "Mở khóa" : "Khóa", {
    variant: "ghost",
    icon: a.lock ? "mo-khoa" : "khoa",
    onClick: () => {
      if (Server.req("lockBaoAn", { uid: a.uid, lock: !a.lock }).ok) {
        sfx("chest");
        rerender();
      }
    },
  });
  b.id = "baLock";
  b.setAttribute("aria-pressed", String(a.lock));
  return b;
}

// ---------------------------------------------------------------- Tủ Đồ: tab Bảo Ấn

const bag = {
  sort: "r" as BaSort,
  f: { ...NO_FILTER } as BaFilter,
  sel: null as string | null,
  /** Chế độ phân rã nhiều món. */
  scrap: false,
  picked: new Set<string>(),
};

/** Món phân rã được: không khóa, không đang mặc. */
const scrappable = (a: BaoAnInst) => !a.lock && !baHolderOf(a.uid);

function scrapYield(uids: string[]) {
  let bui = 0;
  const sap: Record<string, number> = {};
  for (const u of uids) {
    const a = Server.P.baoAn[u];
    if (!a) continue;
    const y = dismantleYield(BA, a);
    bui += y.bui;
    for (const [k, n] of Object.entries(y.sap)) sap[k] = (sap[k] ?? 0) + n;
  }
  return { bui, sap };
}

export function renderBaoAnBag(host: HTMLElement, params: any, tl: HTMLElement) {
  if (params.uid) {
    bag.sel = params.uid;
    params.uid = null;
  }
  const P = Server.P,
    all = baList(),
    list = sortBa(filterBa(all, bag.f), bag.sort);
  if (!bag.sel || !list.some((a) => a.uid === bag.sel)) bag.sel = list[0]?.uid ?? null;
  for (const u of [...bag.picked]) if (!P.baoAn[u] || !scrappable(P.baoAn[u]!)) bag.picked.delete(u);
  const grid = h("div", { class: "tt-tudo-grid", role: "list", id: "baGrid" });
  for (const a of list) {
    const c = baCell(a, {
      selected: !bag.scrap && a.uid === bag.sel,
      picked: bag.scrap && bag.picked.has(a.uid),
      disabled: bag.scrap && !scrappable(a),
    });
    c.setAttribute("role", "listitem");
    c.addEventListener("click", () => {
      if (bag.scrap) {
        if (bag.picked.has(a.uid)) bag.picked.delete(a.uid);
        else bag.picked.add(a.uid);
      } else bag.sel = a.uid;
      sfx("pick");
      rerender();
    });
    grid.append(c);
  }
  const bar = h("div", { class: "tt-tudo-bar tt-babar" });
  const nf = nFilter(bag.f);
  bar.append(
    button(`Sắp xếp: ${BA_SORTS.find(([k]) => k === bag.sort)![1]}`, {
      variant: "ghost",
      icon: "sap-xep",
      onClick: () => ((bag.sort = cycle(BA_SORTS, bag.sort)), rerender()),
    }),
    button(nf ? `Lọc (${nf})` : "Lọc", {
      variant: nf ? "primary" : "ghost",
      icon: "tim-kiem",
      onClick: () => openBaFilter(bag.f, (f) => (bag.f = f)),
    }),
  );
  const scrapBtn = button(bag.scrap ? "Thoát phân rã" : "Phân Rã", {
    variant: bag.scrap ? "primary" : "ghost",
    icon: "lam-moi",
    onClick: () => {
      bag.scrap = !bag.scrap;
      bag.picked.clear();
      rerender();
    },
  });
  scrapBtn.id = "baScrapMode";
  const domBtn = button("Bí Cảnh Bảo Ấn", { variant: "ghost", icon: "ruong", onClick: () => openMenu("baoan") });
  domBtn.classList.add("tt-tudo-ext");
  domBtn.setAttribute("aria-label", "Bí Cảnh Bảo Ấn");
  bar.append(
    scrapBtn,
    domBtn,
    h("span", { class: "cap" }, [
      icon("bao-an", { size: 16 }),
      h("b", {}, [`${list.length}`]),
      list.length !== all.length ? `/${all.length}` : "",
      ` · Bụi Ấn ${fmt(bagOf("bui-an"))}`,
    ]),
  );
  let detail: HTMLElement;
  if (bag.scrap) {
    const pick = (fn: (a: BaoAnInst) => boolean) => () => {
      for (const a of list) if (scrappable(a) && fn(a)) bag.picked.add(a.uid);
      rerender();
    };
    const y = scrapYield([...bag.picked]);
    const go = button(`Phân rã ${bag.picked.size} món`, {
      variant: "primary",
      icon: "xac-nhan",
      disabled: !bag.picked.size,
      onClick: () => {
        const uids = [...bag.picked],
          hi = uids.filter((u) => (P.baoAn[u]?.r ?? 0) >= 5 || (P.baoAn[u]?.lv ?? 0) > 0 || (P.baoAn[u]?.exp ?? 0) > 0);
        const run = () => {
          const r = Server.req("dismantleBaoAn", { uids });
          if (!r.ok) return;
          sfx("slam");
          bag.picked.clear();
          toast(
            `Phân rã ${r.data.n} món: ` +
              Object.entries(r.data.got as Record<string, number>)
                .map(([k, n]) => `+${n} ${itemName(k)}`)
                .join(", "),
            "ok",
          );
          rerender();
        };
        if (hi.length)
          confirm(
            "Phân rã cả món 5★ hoặc đã nâng?",
            `${hi.length} món quý sẽ mất. Không hoàn tác được.`,
            "Phân rã",
            run,
          );
        else run();
      },
    });
    go.id = "baScrapGo";
    detail = h("aside", { class: "tt-tudo-detail tt-bascrap", id: "baScrap" }, [
      h("div", { class: "body" }, [
        h("h3", { class: "tt-h3" }, ["Phân rã Bảo Ấn"]),
        h("p", { class: "tt-dim" }, [
          "Món khóa và món đang mặc không chọn được. Kinh nghiệm đã dồn trả lại một phần thành Sáp Ấn.",
        ]),
        h("div", { class: "tt-row tt-wrap" }, [
          button("Chọn 3★", { variant: "ghost", onClick: pick((a) => a.r === 3) }),
          button("Chọn 4★ chưa nâng", {
            variant: "ghost",
            onClick: pick((a) => a.r === 4 && a.lv === 0 && a.exp === 0),
          }),
          button("Chọn tất cả trong lọc", { variant: "ghost", onClick: pick((a) => a.r < 5) }),
          button("Bỏ chọn", { variant: "ghost", onClick: () => (bag.picked.clear(), rerender()) }),
        ]),
        h("p", { id: "baScrapYield" }, [
          `Nhận: ${fmt(y.bui)} Bụi Ấn`,
          ...Object.entries(y.sap).map(([k, n]) => `, ${n} ${itemName(k)}`),
        ]),
      ]),
      h("footer", { class: "acts" }, [go]),
    ]);
  } else {
    const a = bag.sel ? P.baoAn[bag.sel] : null;
    if (a) {
      const up = button("Nâng Cấp", {
        variant: "primary",
        icon: "nang-cap",
        disabled: a.lv >= capOf(BA, a.r),
        onClick: () => openMenu("baupgrade", { uid: a.uid }),
      });
      up.id = "baUpgradeOpen";
      detail = h("aside", { class: "tt-tudo-detail tt-badetail", id: "baDetail", "data-uid": a.uid }, [
        baCard(a),
        h("footer", { class: "acts" }, [lockBaBtn(a), up]),
      ]);
    } else
      detail = h("aside", { class: "tt-tudo-detail tt-empty" }, [
        icon("bao-an", { size: 40 }),
        all.length ? "Không có Bảo Ấn khớp bộ lọc." : "Chưa có Bảo Ấn. Vào Bí Cảnh Bảo Ấn để tìm Mảnh Sao.",
      ]);
  }
  host.append(tl, h("div", { class: "tt-tudo-main" }, [h("section", { class: "tt-tudo-left" }, [grid, bar]), detail]));
}

// ---------------------------------------------------------------- Nhân vật: thẻ Bảo Ấn

let lastTron = "";
export function charBaoAnPanel(panel: HTMLElement, cid: string, center: Node) {
  const own = Server.P.owned[cid];
  if (!own) {
    panel.append(h("p", { class: "tt-dim" }, ["Chưa sở hữu. Ước nguyện để gặp nhân vật này."]));
    return;
  }
  const items = worn(cid);
  const full = items.length === 5 && items.every((a) => a.bo === items[0]!.bo) ? `${cid}:${items[0]!.bo}` : "";
  const play = !!full && full !== lastTron && !calm();
  lastTron = full;
  if (play) setTimeout(() => sfx("star5"), 900);
  const star = constellation(items, center, (o) => openMenu("baswap", { char: cid, o }), play);
  panel.append(
    h("div", { class: "tt-bapanel" }, [
      star,
      h("div", { class: "tt-baside" }, [
        h("p", { class: "tt-dim" }, [`Chiến Lực ${fmt(powerOf(cid))} · Bấm một Mảnh Sao để thay`]),
        activeSetList(items),
        items.length
          ? button("Tháo hết", {
              variant: "ghost",
              icon: "quay-lai",
              onClick: () => {
                for (const o of SLOT_IDS) if (own.ba?.[o]) Server.req("unequipBaoAn", { char: cid, o });
                refreshParty([cid]);
                rerender();
              },
            })
          : null,
      ]),
    ]),
  );
}

// ---------------------------------------------------------------- Thay Mảnh Sao

const sw = {
  char: "",
  o: "hoa" as SlotId,
  sel: null as string | null,
  sort: "r" as BaSort,
  f: { ...NO_FILTER } as BaFilter,
};

function renderSwap(host: HTMLElement, params: any) {
  const P = Server.P,
    cid = params.char as string,
    c = byId[cid],
    own = P.owned[cid];
  if (!c || !own) throw new Error("Bạn chưa có nhân vật này");
  const o = (SLOT_IDS.includes(params.o) ? params.o : "hoa") as SlotId;
  if (sw.char !== cid || sw.o !== o) Object.assign(sw, { char: cid, o, sel: null, f: { ...NO_FILTER } });
  host.classList.add("tt-menu-wswap", "tt-menu-baswap");
  const curUid = own.ba?.[o] ?? null,
    cur = curUid ? P.baoAn[curUid] : null;
  const list = sortBa(
    filterBa(
      baList().filter((a) => a.o === o),
      sw.f,
    ),
    sw.sort,
  );
  if (!sw.sel || !P.baoAn[sw.sel] || P.baoAn[sw.sel]!.o !== o)
    sw.sel = list.find((a) => a.uid !== curUid)?.uid ?? curUid ?? null;
  const slotTabs = h(
    "div",
    { class: "tt-row tt-chips", role: "group", "aria-label": "Ô" },
    SLOT_IDS.map((x) => {
      const b = button(slotName(x), {
        variant: x === o ? "primary" : "ghost",
        onClick: () => openMenu("baswap", { char: cid, o: x }),
      });
      b.dataset.o = x;
      return b;
    }),
  );
  const ul = h("div", { class: "tt-wswap-list", id: "baSwapList", role: "listbox", "aria-label": slotName(o) });
  for (const a of list) {
    const who = baHolderOf(a.uid);
    const row = h(
      "button",
      {
        type: "button",
        class: "tt-wrow tt-barow" + (a.uid === sw.sel ? " is-sel" : ""),
        "data-r": a.r,
        "data-uid": a.uid,
        role: "option",
        "aria-selected": String(a.uid === sw.sel),
      },
      [
        h("span", { class: "art" }, [baCell(a, { static: true })]),
        h("span", { class: "txt" }, [
          h("b", {}, [pieceOf(a).ten]),
          h("small", {}, [`${setOf(BA, a.bo).sao.ten} · ${statLabel(a.chinh)} · +${a.lv}`]),
          who
            ? h("small", { class: who === cid ? "ok" : "warn" }, [
                who === cid ? "Đang mặc" : `${byId[who]?.name} đang mặc`,
              ])
            : null,
        ]),
      ],
    );
    row.addEventListener("click", () => {
      sw.sel = a.uid;
      sfx("react");
      rerender();
    });
    ul.append(row);
  }
  if (!list.length)
    ul.append(h("p", { class: "tt-dim" }, ["Không có Mảnh Sao nào ở ô này. Vào Bí Cảnh Bảo Ấn để tìm."]));
  const nf = nFilter(sw.f);
  const bar = h("div", { class: "tt-row" }, [
    button(`Sắp xếp: ${BA_SORTS.find(([k]) => k === sw.sort)![1]}`, {
      variant: "ghost",
      icon: "sap-xep",
      onClick: () => ((sw.sort = cycle(BA_SORTS, sw.sort)), rerender()),
    }),
    button(nf ? `Lọc (${nf})` : "Lọc", {
      variant: nf ? "primary" : "ghost",
      icon: "tim-kiem",
      onClick: () => openBaFilter(sw.f, (f) => (sw.f = { ...f, o: "all" }), true),
    }),
  ]);
  const right = h("section", { class: "tt-wswap-cmp" });
  const sel = sw.sel ? P.baoAn[sw.sel] : null;
  if (sel) {
    const ov: BaOverride = { [o]: sel.uid };
    const a = statsOf(cid),
      b = statsOf(cid, undefined, ov);
    right.append(
      baCard(sel),
      h("h4", { class: "tt-h4" }, [`So với ${cur ? pieceOf(cur).ten : "ô trống"}`]),
      compareRows([
        { k: "Chiến Lực", a: powerOf(cid), b: powerOf(cid, undefined, ov), f: fmtInt },
        { k: "Máu", a: a.hp, b: b.hp, f: fmtInt },
        { k: "Tấn công", a: a.atk, b: b.atk, f: fmtInt },
        { k: "Tỉ lệ chí mạng", a: a.crit, b: b.crit, f: (v) => pct(v) },
        { k: "Sát thương chí mạng", a: a.cdmg, b: b.cdmg, f: (v) => pct(v) },
        { k: "Tăng sát thương", a: a.dmg, b: b.dmg, f: (v) => pct(v) },
      ]),
    );
    const who = baHolderOf(sel.uid);
    const eq = button(who === cid ? "Đang mặc" : "Trang Bị", {
      variant: "primary",
      icon: "xac-nhan",
      disabled: who === cid,
      onClick: () => {
        const run = (swap: boolean) => {
          const r = Server.req("equipBaoAn", { char: cid, uid: sel.uid, swap });
          if (!r.ok) return;
          sfx("chest");
          refreshParty([cid, who]);
          back();
        };
        if (who && who !== cid)
          confirm(
            "Đổi Mảnh Sao giữa hai nhân vật?",
            `${pieceOf(sel).ten} đang ở ${byId[who]?.name}. ${byId[who]?.name} sẽ nhận ${cur ? pieceOf(cur).ten : "ô trống"}.`,
            "Đổi",
            () => run(true),
          );
        else run(false);
      },
    });
    eq.id = "baEquip";
    const acts = [eq];
    if (curUid) {
      const un = button("Tháo", {
        variant: "ghost",
        icon: "quay-lai",
        onClick: () => {
          if (!Server.req("unequipBaoAn", { char: cid, o }).ok) return;
          refreshParty([cid]);
          rerender();
        },
      });
      un.id = "baUnequip";
      acts.push(un);
    }
    right.append(h("div", { class: "tt-row actions" }, acts));
  }
  host.append(
    h("p", { class: "tt-dim" }, [`${c.name} · ${slotName(o)}`]),
    slotTabs,
    h("div", { class: "tt-wswap" }, [h("div", {}, [bar, ul]), right]),
  );
}

// ---------------------------------------------------------------- Nâng cấp

const up = { uid: "", sap: {} as Record<string, number>, mats: new Set<string>(), jump: new Set<string>() };

function renderUpgrade(host: HTMLElement, params: any) {
  const P = Server.P,
    a = P.baoAn[params.uid];
  if (!a) throw new Error("Không còn Bảo Ấn này");
  if (up.uid !== a.uid) Object.assign(up, { uid: a.uid, sap: {}, mats: new Set(), jump: new Set() });
  host.classList.add("tt-menu-wup", "tt-menu-baup");
  const cap = capOf(BA, a.r);
  const left = h("div", { class: "tt-wup-left" }, [baCard(a, [], up.jump)]);
  up.jump = new Set();
  const right = h("section", { class: "tt-panel tt-wup-right", id: "baUpgrade" });
  if (a.lv >= cap) right.append(h("p", {}, [`Đã đạt cấp tối đa +${cap}.`]));
  else {
    right.append(h("h3", { class: "tt-h3" }, ["Sáp Ấn"]));
    const ores = h("div", { class: "tt-wores" });
    const selExp = () => {
      let t = 0;
      for (const s of BA.kinhNghiem.sap) t += (up.sap[s.id] ?? 0) * s.kinhNghiem;
      for (const u of up.mats) if (P.baoAn[u]) t += fodderExp(BA, P.baoAn[u]!);
      return t;
    };
    for (const s of BA.kinhNghiem.sap) {
      const have = bagOf(s.id),
        n = up.sap[s.id] ?? 0;
      const minus = button("Bớt", { variant: "ghost", icon: "quay-lai", iconOnly: true, disabled: n <= 0 });
      const plus = button("Thêm", { variant: "ghost", icon: "tiep", iconOnly: true, disabled: n >= have });
      const all = button("Tối đa", { variant: "ghost", disabled: n >= have });
      minus.addEventListener("click", () => ((up.sap[s.id] = n - 1), rerender()));
      plus.addEventListener("click", () => ((up.sap[s.id] = n + 1), rerender()));
      all.addEventListener("click", () => {
        const need = previewExp(BA, a, Number.MAX_SAFE_INTEGER).used - selExp() + n * s.kinhNghiem;
        up.sap[s.id] = Math.min(have, Math.max(0, Math.ceil(need / s.kinhNghiem)));
        rerender();
      });
      plus.dataset.sap = s.id;
      ores.append(
        h("div", { class: "tt-wore", "data-r": s.r }, [
          icon("nang-cap", { size: 28 }),
          h("span", { class: "nm" }, [
            itemName(s.id),
            h("small", { class: "tt-dim" }, [` +${fmt(s.kinhNghiem)} KN · có ${have}`]),
          ]),
          minus,
          h("b", { class: "n" }, [String(n)]),
          plus,
          all,
        ]),
      );
    }
    right.append(ores, h("h4", { class: "tt-h4" }, ["Dùng Bảo Ấn khác (món khóa và đang mặc không hiện)"]));
    const fod = sortBa(
      baList().filter((m) => m.uid !== a.uid && !m.lock && !baHolderOf(m.uid)),
      "r",
    ).reverse();
    const grid = h("div", { class: "tt-wgrid tt-wgrid--sm", id: "baFodder" });
    for (const m of fod) {
      const c = baCell(m, { picked: up.mats.has(m.uid) });
      c.addEventListener("click", () => {
        if (up.mats.has(m.uid)) up.mats.delete(m.uid);
        else up.mats.add(m.uid);
        rerender();
      });
      grid.append(c);
    }
    right.append(fod.length ? grid : h("p", { class: "tt-dim" }, ["Không có Bảo Ấn rảnh để dùng."]));
    const exp = selExp();
    const pv = previewExp(BA, a, exp),
      cost = Math.ceil(pv.used * BA.kinhNghiem.xuMoiKinhNghiem);
    const moc = Math.floor(pv.lv / BA.mocCap) - Math.floor(a.lv / BA.mocCap);
    const nAdd = Math.min(moc, 4 - a.phu.length);
    right.append(
      h("p", { class: "tt-wpreview", id: "baPreview" }, [
        `+${a.lv} → `,
        h("b", {}, [`+${pv.lv}`]),
        ` / ${cap} · +${fmt(pv.used)} KN · ${fmt(cost)} Xu`,
      ]),
      h("p", { class: "tt-dim", id: "baMilestone" }, [
        moc
          ? `Qua ${moc} mốc +${BA.mocCap}: ${nAdd ? `thêm ${nAdd} dòng phụ` : ""}${nAdd && moc - nAdd ? ", " : ""}${moc - nAdd ? `tăng ngẫu nhiên ${moc - nAdd} lần dòng có sẵn` : ""}.`
          : `Mốc kế tiếp: +${(Math.floor(a.lv / BA.mocCap) + 1) * BA.mocCap}. Mỗi mốc thêm 1 dòng phụ (nếu dưới 4 dòng) hoặc tăng 1 dòng.`,
      ]),
    );
    const go = button("Nâng Cấp", {
      variant: "primary",
      icon: "nang-cap",
      disabled: !exp || P.coin < cost,
      onClick: () => {
        const r = Server.req("upgradeBaoAn", { uid: a.uid, sap: up.sap, mats: [...up.mats] });
        if (!r.ok) return;
        const d = r.data;
        up.sap = {};
        up.mats.clear();
        up.jump = new Set(d.lv > d.from ? ["main"] : []);
        for (const x of d.rolls) up.jump.add(x.k);
        sfx(d.rolls.length ? "burst" : "skill");
        if (d.rolls.length)
          toast(
            d.rolls
              .map(
                (x: MilestoneRoll) => `+${x.lv}: ${x.moi ? "thêm" : "tăng"} ${statLabel(x.k)} +${fmtStat(x.k, x.add)}`,
              )
              .join(" · "),
            "ok",
          );
        refreshParty([baHolderOf(a.uid)]);
        refreshWallets();
        rerender();
      },
    });
    go.id = "baUpgradeGo";
    right.append(h("div", { class: "tt-row" }, [go]));
  }
  host.append(h("div", { class: "tt-wup" }, [left, right]));
}

// ---------------------------------------------------------------- Bí Cảnh Bảo Ấn, đổi Bụi Ấn, Admin

const dom = { tt: -1, doi: { bo: BA.bo[0]!.id, o: "hoa" as SlotId, chinh: "hp" as StatId } };

function renderDomain(host: HTMLElement) {
  const P = Server.P,
    B = BA.biCanh,
    ll = Math.floor(linhLucNow(P)),
    ttMax = ttMaxOf(P),
    open = hoTinhOf(P) >= B.moCapHoTinh;
  if (dom.tt < 0 || dom.tt > ttMax) dom.tt = ttMax;
  host.classList.add("tt-menu-daily", "tt-menu-babicanh");
  host.append(
    h("p", { class: "tt-dim" }, [
      `Mỗi lượt thắng tốn ${B.linhLuc} Linh Lực, thua không mất. Thiên Tượng càng cao, quái càng mạnh và Mảnh Sao càng hiếm. Bảo Ấn chỉ có từ cày, không bán bằng tiền.`,
    ]),
    h("div", { class: "tt-row" }, [
      progress(ll / 200, { label: "Linh Lực", text: `${ll}` }),
      chipGroup<number>(
        "Thiên Tượng",
        Array.from({ length: ttMax + 1 }, (_, i) => [i, String(i)] as [number, string]),
        dom.tt,
        (v) => (dom.tt = v),
      ),
    ]),
  );
  if (!open) host.append(h("p", { class: "tt-warn", id: "baLocked" }, [`Mở khi có một Hộ Tinh cấp ${B.moCapHoTinh}.`]));
  const roi = B.roi[dom.tt]!;
  host.append(
    h("p", { class: "tt-dim", id: "baDrop" }, [
      `Mỗi lượt rơi trung bình: ${roi.r3} món 3★, ${roi.r4} món 4★, ${roi.r5} món 5★, kèm Sáp Ấn và ${fmt(B.xu)} Xu.`,
    ]),
  );
  const ul = h("ul", { class: "tt-tasks", id: "baDomains" });
  for (const d of B.danhSach) {
    const go = button("Vào", {
      variant: "primary",
      icon: "choi",
      disabled: !open || ll < B.linhLuc,
      onClick: () => {
        leaveWorld();
        closeMenu();
        startBaoAn(d.id, dom.tt);
      },
    });
    go.dataset.id = d.id;
    ul.append(
      h("li", { class: "tt-task tt-badom" }, [
        h(
          "div",
          { class: "arts" },
          d.bo.map((b) => baoAnImg(b, "hoa", 128, setOf(BA, b).sao.ten)),
        ),
        h("div", { class: "tt" }, [
          h("b", {}, [d.ten]),
          h("small", { class: "tt-dim" }, [`${d.vung} · ${d.bo.map((b) => setOf(BA, b).sao.ten).join(", ")}`]),
        ]),
        go,
      ]),
    );
  }
  host.append(ul);

  // Đổi Bụi Ấn
  const D = dom.doi;
  if (!mainStatsOf(D.o).includes(D.chinh)) D.chinh = mainStatsOf(D.o)[0]!;
  const ex = h("div", { class: "tt-panel", id: "baExchange" }, [
    h("h3", { class: "tt-h3" }, [`Đổi Bụi Ấn (đang có ${fmt(bagOf("bui-an"))}, làm mới thứ Hai)`]),
    chipGroup<string>(
      "Bộ",
      BA.bo.map((b) => [b.id, b.sao.ten] as [string, string]),
      D.bo,
      (v) => (D.bo = v),
    ),
    chipGroup<string>(
      "Ô",
      SLOT_IDS.map((o) => [o, slotName(o)] as [string, string]),
      D.o,
      (v) => (D.o = v as SlotId),
    ),
    chipGroup<string>(
      "Chỉ số chính (Ấn Chọn Chính)",
      mainStatsOf(D.o).map((k) => [k, statLabel(k)] as [string, string]),
      D.chinh,
      (v) => (D.chinh = v as StatId),
    ),
  ]);
  const exRow = h("div", { class: "tt-row" });
  for (const d of BA.doi) {
    const left = baDoiLeft(P, d.id);
    const b = button(`${d.ten} · ${d.buiAn} Bụi Ấn · còn ${left}/${d.moiTuan}`, {
      variant: left > 0 && bagOf("bui-an") >= d.buiAn ? "primary" : "ghost",
      icon: "bao-an",
      disabled: left <= 0 || bagOf("bui-an") < d.buiAn,
      onClick: () => {
        const r = Server.req("exchangeBaoAn", { id: d.id, bo: D.bo, o: D.o, chinh: D.chinh });
        if (!r.ok) return;
        sfx("star5");
        const a = P.baoAn[r.data.uid]!;
        toast(`Nhận ${pieceOf(a).ten} 5★ (${statLabel(a.chinh)})`, "ok");
        rerender();
      },
    });
    b.dataset.id = d.id;
    exRow.append(b);
  }
  ex.append(exRow);
  host.append(ex);
}

registerScreen("baswap", { title: "Thay Mảnh Sao", icon: "bao-an", render: renderSwap });
registerScreen("baupgrade", { title: "Nâng Bảo Ấn", icon: "nang-cap", render: renderUpgrade });
registerScreen("baoan", { title: "Bí Cảnh Bảo Ấn", icon: "bao-an", render: renderDomain });
