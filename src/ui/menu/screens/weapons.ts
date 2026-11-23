import { sfx } from "../../../core/audio";
import { GS } from "../../../core/state";
import { fmt } from "../../../core/util";
import { ITEMS } from "../../../data/menu-content";
import { byId } from "../../../data/content";
import { ECON } from "../../../data/economy";
import { ascendCost, fodderExp, lvCapOf, previewExp, type WeaponInst } from "../../../economy/weapons";
import { Server, powerOf, statsOf, vk, wDef, weaponList } from "../../../server/server";
import { button, h, openDialog, stars, tabs, tag } from "../../ds";
import { icon } from "../../icons/icons";
import { weaponImg } from "../../weapon-art";
import { stackOf } from "../../../entities/party";
import { renderTuDo } from "./bag";
import { refreshWallets, openMenu, back, registerScreen, rerender } from "../shell";
import {
  SUB_NAME,
  TYPE_NAME,
  compareRows,
  defOf,
  fmtInt,
  holderOf,
  pct,
  statRows,
  weaponCard,
  weaponCell,
  sortWeapons,
  filterWeapons,
  weaponBadge,
} from "../weapon-ui";

/* S24: Kho vũ khí, Nâng cấp / Tinh luyện, Thay vũ khí, Lò Rèn. Mọi thay đổi đi qua Server.req. */

type Sort = "lv" | "r" | "tl";
const TYPES = ["all", "sword", "great", "spear", "bow", "cat"] as const;
const inv = {
  type: "all" as string,
  r: 0,
  eq: "all" as "all" | "on" | "off",
  sort: "r" as Sort,
  sel: null as string | null,
};

const itemName = (id: string) => ITEMS.find((i) => i.id === id)?.name ?? id;
const bagOf = (id: string) => Server.P.bag[id] ?? 0;
const weapons = () => Object.values(Server.P.weapons) as WeaponInst[];

export { sortWeapons, filterWeapons };

export function chipGroup<T extends string | number>(label: string, opts: [T, string][], cur: T, set: (v: T) => void) {
  return h("div", { class: "tt-row tt-chips", role: "group", "aria-label": label }, [
    h("span", { class: "tt-dim" }, [label]),
    ...opts.map(([v, l]) => {
      const b = button(l, { variant: cur === v ? "primary" : "ghost" });
      b.setAttribute("aria-pressed", String(cur === v));
      b.addEventListener("click", () => {
        set(v);
        rerender();
      });
      return b;
    }),
  ]);
}

function confirm(title: string, body: string, ok: string, run: () => void) {
  const yes = button(ok, { variant: "primary", icon: "xac-nhan" });
  const no = button("Hủy", { variant: "ghost" });
  yes.addEventListener("click", run);
  openDialog({ title, body: h("p", {}, [body]), actions: [no, yes], ornate: true });
}

function refreshParty(ids: string[]) {
  for (const id of ids) {
    const m = GS.G?.party?.find((x: any) => x.id === id);
    if (!m) continue;
    const st = statsOf(id);
    m.hp = m.alive ? Math.round((m.hp / m.maxHp) * st.hp) : m.hp;
    m.st = st;
    m.maxHp = st.hp;
    m.stack = stackOf(id, m.stack ?? null);
  }
}

// ---------------------------------------------------------------- Kho vũ khí

function renderInventory(host: HTMLElement, params: any) {
  host.classList.add("tt-menu-weapons");
  if (params.uid) {
    inv.sel = params.uid;
    params.uid = null;
  }
  const all = weapons();
  const list = sortWeapons(filterWeapons(all, inv), inv.sort);
  if (!inv.sel || !list.some((w) => w.uid === inv.sel)) inv.sel = list[0]?.uid ?? null;
  const typeTabs = tabs(
    TYPES.map((t) => ({ id: t, label: t === "all" ? "Tất cả" : TYPE_NAME(t), icon: t === "all" ? "tui-do" : "danh" })),
    inv.type,
    (id) => {
      if (id === inv.type) return;
      inv.type = id;
      rerender();
    },
  );
  const bar = h("div", { class: "tt-row tt-wbar" }, [
    chipGroup<number>(
      "Độ hiếm",
      [
        [0, "Tất cả"],
        [5, "5★"],
        [4, "4★"],
        [3, "3★"],
      ],
      inv.r,
      (v) => (inv.r = v),
    ),
    chipGroup<"all" | "on" | "off">(
      "Trang bị",
      [
        ["all", "Tất cả"],
        ["on", "Đang dùng"],
        ["off", "Chưa dùng"],
      ],
      inv.eq,
      (v) => (inv.eq = v),
    ),
    chipGroup<Sort>(
      "Sắp xếp",
      [
        ["r", "Độ hiếm"],
        ["lv", "Cấp"],
        ["tl", "Tinh luyện"],
      ],
      inv.sort,
      (v) => (inv.sort = v),
    ),
    button("Lò Rèn", { icon: "nang-cap", onClick: () => openMenu("forge") }),
    button("Bí Cảnh Binh Khí", { icon: "ruong", onClick: () => openMenu("bicanh") }),
  ]);
  const grid = h("div", { class: "tt-wgrid", id: "weaponGrid", role: "list" });
  for (const w of list) {
    const c = weaponCell(w, { selected: w.uid === inv.sel });
    c.setAttribute("role", "listitem");
    c.addEventListener("click", () => {
      inv.sel = w.uid;
      sfx("react");
      rerender();
    });
    grid.append(c);
  }
  const w = inv.sel ? Server.P.weapons[inv.sel] : null;
  const detail = w
    ? weaponCard(w, [
        lockBtn(w),
        button("Nâng Cấp", {
          variant: "primary",
          icon: "nang-cap",
          onClick: () => openMenu("wupgrade", { uid: w.uid, mode: "lv" }),
        }),
        button("Tinh Luyện", { icon: "net-sao", onClick: () => openMenu("wupgrade", { uid: w.uid, mode: "tl" }) }),
      ])
    : h("aside", { class: "tt-panel tt-empty" }, [
        icon("tui-do", { size: 40 }),
        h("p", {}, ["Không có vũ khí khớp bộ lọc."]),
      ]);
  detail.classList.add("tt-wdetail");
  detail.id = "weaponDetail";
  host.append(
    typeTabs,
    bar,
    h("p", { class: "tt-dim" }, [`${list.length}/${all.length} vũ khí`]),
    h("div", { class: "tt-wlayout" }, [grid, detail]),
  );
}

export function lockBtn(w: WeaponInst) {
  const b = button(w.lock ? "Mở khóa" : "Khóa", {
    variant: "ghost",
    icon: w.lock ? "mo-khoa" : "khoa",
    onClick: () => {
      if (Server.req("lockWeapon", { uid: w.uid, lock: !w.lock }).ok) {
        sfx("chest");
        rerender();
      }
    },
  });
  b.id = "weaponLock";
  b.setAttribute("aria-pressed", String(w.lock));
  return b;
}

// ---------------------------------------------------------------- Nâng cấp / Tinh luyện

const up = { uid: "", ores: {} as Record<string, number>, mats: new Set<string>() };

function renderUpgrade(host: HTMLElement, params: any) {
  const P = Server.P;
  const w = P.weapons[params.uid];
  if (!w) throw new Error("Không còn vũ khí này");
  if (up.uid !== w.uid) {
    up.uid = w.uid;
    up.ores = {};
    up.mats.clear();
  }
  const mode: "lv" | "tl" = params.mode === "tl" ? "tl" : "lv";
  host.classList.add("tt-menu-wup");
  const d = defOf(w);
  const tl = tabs(
    [
      { id: "lv", label: "Nâng Cấp", icon: "nang-cap" },
      { id: "tl", label: "Tinh Luyện", icon: "net-sao" },
    ],
    mode,
    (id) => {
      if (id === mode) return;
      params.mode = id;
      up.mats.clear();
      rerender();
    },
  );
  const left = h("div", { class: "tt-wup-left" }, [weaponCard(w)]);
  const right = h("section", { class: "tt-panel tt-wup-right", id: "weaponUpgrade" });
  const usable = weapons().filter((m) => m.uid !== w.uid && !holderOf(m.uid));
  if (mode === "lv") {
    const cap = lvCapOf(w, ECON);
    const atCap = w.lv >= cap;
    if (atCap && w.khai < 6) {
      const c = ascendCost(w, ECON)!;
      const ok = bagOf(c.quangId) >= c.quang && P.coin >= c.xu;
      const b = button(`Đột phá · ${c.quang} ${itemName(c.quangId)}, ${fmt(c.xu)} Xu`, {
        variant: "primary",
        icon: "khai-tinh",
        disabled: !ok,
        onClick: () => {
          if (Server.req("ascendWeapon", { uid: w.uid }).ok) {
            sfx("burst");
            refreshWallets();
            rerender();
          }
        },
      });
      b.id = "weaponAscend";
      right.append(
        h("h3", { class: "tt-h3" }, ["Đột phá"]),
        h("p", {}, [
          `Đã đạt giới hạn cấp ${cap}. Đột phá để mở tới cấp ${ECON.thietKe.vuKhi.cap.gioiHan[w.khai + 1]}.`,
        ]),
        h("p", { class: "tt-dim" }, [`Đang có ${bagOf(c.quangId)} ${itemName(c.quangId)}`]),
        b,
      );
    } else if (atCap) right.append(h("p", {}, [tag("Đã đạt cấp tối đa", "ok")]));
    else {
      right.append(h("h3", { class: "tt-h3" }, ["Nguyên liệu"]));
      const ores = h("div", { class: "tt-wores" });
      for (const q of vk().quang) {
        const have = bagOf(q.id),
          n = up.ores[q.id] ?? 0;
        const minus = button("Bớt", { variant: "ghost", icon: "quay-lai", iconOnly: true, disabled: n <= 0 });
        const plus = button("Thêm", { variant: "ghost", icon: "tiep", iconOnly: true, disabled: n >= have });
        minus.addEventListener("click", () => ((up.ores[q.id] = n - 1), rerender()));
        plus.addEventListener("click", () => ((up.ores[q.id] = n + 1), rerender()));
        plus.dataset.ore = q.id;
        ores.append(
          h("div", { class: "tt-wore", "data-r": q.r }, [
            icon("long-sao", { size: 28 }),
            h("span", { class: "nm" }, [
              itemName(q.id),
              h("small", { class: "tt-dim" }, [` +${fmt(q.kinhNghiem)} KN · có ${have}`]),
            ]),
            minus,
            h("b", { class: "n" }, [String(n)]),
            plus,
          ]),
        );
      }
      right.append(ores);
      right.append(h("h4", { class: "tt-h4" }, ["Dùng vũ khí khác (vũ khí khóa và đang trang bị không hiện)"]));
      const grid = h("div", { class: "tt-wgrid tt-wgrid--sm", id: "fodderGrid" });
      for (const m of sortWeapons(
        usable.filter((m) => !m.lock),
        "r",
      ).reverse()) {
        const c = weaponCell(m, { picked: up.mats.has(m.uid) });
        c.addEventListener("click", () => {
          if (up.mats.has(m.uid)) up.mats.delete(m.uid);
          else up.mats.add(m.uid);
          rerender();
        });
        grid.append(c);
      }
      right.append(usable.length ? grid : h("p", { class: "tt-dim" }, ["Không có vũ khí rảnh để dùng."]));
      let exp = 0;
      for (const q of vk().quang) exp += (up.ores[q.id] ?? 0) * q.kinhNghiem;
      for (const u of up.mats) if (P.weapons[u]) exp += fodderExp(P.weapons[u]!, ECON);
      const pv = previewExp(w, exp, ECON),
        cost = Math.ceil(pv.used * vk().cap.xuMoiKinhNghiem);
      const before = statRows(w).rows,
        after = statRows({ ...w, lv: pv.lv }).rows;
      right.append(
        h("p", { class: "tt-wpreview", id: "weaponPreview" }, [
          `Cấp ${w.lv} → `,
          h("b", {}, [`${pv.lv}`]),
          ` / ${cap} · +${fmt(pv.used)} KN · ${fmt(cost)} Xu`,
        ]),
        compareRows(
          before.map(([k], i) => ({
            k,
            a: parseFloat(before[i]![1].slice(1)),
            b: parseFloat(after[i]![1].slice(1)),
            f: (v: number) => (v >= 0 ? "+" : "") + v.toFixed(1).replace(/\.0$/, "") + "%",
          })),
        ),
      );
      const hi = [...up.mats].filter((u) => P.weapons[u] && defOf(P.weapons[u]!).r >= 4);
      const go = button("Nâng Cấp", {
        variant: "primary",
        icon: "nang-cap",
        disabled: !exp || P.coin < cost,
        onClick: () => {
          const run = () => {
            const r = Server.req("upgradeWeapon", {
              uid: w.uid,
              ores: up.ores,
              mats: [...up.mats],
              confirm: hi.length > 0,
            });
            if (!r.ok) return;
            sfx("skill");
            up.ores = {};
            up.mats.clear();
            refreshParty([holderOf(w.uid) ?? ""]);
            refreshWallets();
            rerender();
          };
          if (hi.length)
            confirm(
              "Dùng vũ khí quý làm nguyên liệu?",
              `${hi.map((u) => `${defOf(P.weapons[u]!).ten} (${defOf(P.weapons[u]!).r}★)`).join(", ")} sẽ mất đi. Không hoàn tác được.`,
              "Vẫn dùng",
              run,
            );
          else run();
        },
      });
      go.id = "weaponUpgradeGo";
      right.append(h("div", { class: "tt-row" }, [go]));
    }
  } else {
    right.append(h("h3", { class: "tt-h3" }, [`Tinh luyện R${w.tl}${w.tl < 5 ? ` → R${w.tl + 1}` : ""}`]));
    if (w.tl >= 5) right.append(h("p", {}, [tag("Đã tinh luyện tối đa R5", "ok")]));
    else {
      right.append(h("p", { class: "tt-dim" }, [`Cần một bản trùng ${d.ten}. Bản trùng chưa khóa và chưa trang bị.`]));
      const dups = usable.filter((m) => m.id === w.id && !m.lock);
      const pick = [...up.mats].find((u) => dups.some((m) => m.uid === u)) ?? dups[0]?.uid;
      const grid = h("div", { class: "tt-wgrid tt-wgrid--sm", id: "dupGrid" });
      for (const m of dups) {
        const c = weaponCell(m, { picked: m.uid === pick });
        c.addEventListener("click", () => {
          up.mats = new Set([m.uid]);
          rerender();
        });
        grid.append(c);
      }
      right.append(dups.length ? grid : h("p", {}, ["Chưa có bản trùng. Ước nguyện Binh Khí Tinh Tú hoặc rèn thêm."]));
      const go = button("Tinh Luyện", {
        variant: "primary",
        icon: "net-sao",
        disabled: !pick,
        onClick: () => {
          const run = () => {
            const r = Server.req("refineWeapon", { uid: w.uid, mat: pick, confirm: true });
            if (!r.ok) return;
            sfx("burst");
            up.mats.clear();
            refreshParty([holderOf(w.uid) ?? ""]);
            rerender();
          };
          if (d.r >= 4)
            confirm(
              `Tinh luyện ${d.ten}?`,
              `Một bản ${d.ten} (${d.r}★) sẽ được dùng làm nguyên liệu.`,
              "Tinh luyện",
              run,
            );
          else run();
        },
      });
      go.id = "weaponRefineGo";
      right.append(h("div", { class: "tt-row" }, [go]));
    }
  }
  host.append(tl, h("div", { class: "tt-wup" }, [left, right]));
}

// ---------------------------------------------------------------- Thay vũ khí

const sw = { char: "", sel: null as string | null };

function renderSwap(host: HTMLElement, params: any) {
  const P = Server.P,
    cid = params.char as string,
    c = byId[cid],
    own = P.owned[cid];
  if (!c || !own) throw new Error("Bạn chưa có nhân vật này");
  host.classList.add("tt-menu-wswap");
  if (sw.char !== cid) {
    sw.char = cid;
    sw.sel = null;
  }
  const cur = own.vk ? P.weapons[own.vk] : null;
  const list = sortWeapons(
    weapons().filter((w) => defOf(w).loai === c.w),
    "r",
  );
  if (!sw.sel || !P.weapons[sw.sel]) sw.sel = list.find((w) => w.uid !== own.vk)?.uid ?? own.vk ?? null;
  const ul = h("div", {
    class: "tt-wswap-list",
    id: "swapList",
    role: "listbox",
    "aria-label": `${TYPE_NAME(c.w)} có thể trang bị`,
  });
  for (const w of list) {
    const d = defOf(w),
      who = holderOf(w.uid);
    const row = h(
      "button",
      {
        type: "button",
        class: "tt-wrow" + (w.uid === sw.sel ? " is-sel" : ""),
        "data-r": d.r,
        "data-uid": w.uid,
        role: "option",
        "aria-selected": String(w.uid === sw.sel),
      },
      [
        h("span", { class: "art" }, [weaponBadge(w.id, `Cấp ${w.lv}`, { refine: w.tl, locked: w.lock, holder: who })]),
        h("span", { class: "txt" }, [
          h("b", {}, [d.ten]),
          h("small", {}, [stars(d.r, 10), ` Cấp ${w.lv} · R${w.tl}`]),
          who
            ? h("small", { class: who === cid ? "ok" : "warn" }, [
                who === cid ? "Đang dùng" : `${byId[who]?.name} đang dùng`,
              ])
            : null,
        ]),
      ],
    );
    row.addEventListener("click", () => {
      sw.sel = w.uid;
      sfx("react");
      rerender();
    });
    ul.append(row);
  }
  const sel = sw.sel ? P.weapons[sw.sel] : null;
  const right = h("section", { class: "tt-wswap-cmp" });
  if (sel) {
    const a = statsOf(cid),
      b = statsOf(cid, sel.uid);
    right.append(
      weaponCard(sel),
      h("h4", { class: "tt-h4" }, [`So với ${cur ? defOf(cur).ten : "tay không"}`]),
      compareRows([
        { k: "Chiến Lực", a: powerOf(cid), b: powerOf(cid, sel.uid), f: fmtInt },
        { k: "Tấn công", a: a.atk, b: b.atk, f: fmtInt },
        { k: SUB_NAME.chiMang, a: a.crit, b: b.crit, f: (v) => pct(v) },
        { k: SUB_NAME.satThuongChiMang, a: a.cdmg, b: b.cdmg, f: (v) => pct(v) },
        { k: "Tăng sát thương", a: a.dmg, b: b.dmg, f: (v) => pct(v) },
      ]),
    );
    const who = holderOf(sel.uid);
    const eq = button(who === cid ? "Đang trang bị" : "Trang Bị", {
      variant: "primary",
      icon: "xac-nhan",
      disabled: who === cid,
      onClick: () => {
        const run = (swap: boolean) => {
          const r = Server.req("equipWeapon", { char: cid, uid: sel.uid, swap });
          if (!r.ok) return;
          sfx("chest");
          refreshParty([cid, who ?? ""]);
          back();
        };
        if (who && who !== cid)
          confirm(
            "Đổi vũ khí giữa hai nhân vật?",
            `${defOf(sel).ten} đang ở ${byId[who]?.name}. ${byId[who]?.name} sẽ nhận ${cur ? defOf(cur).ten : "vũ khí mặc định"}.`,
            "Đổi",
            () => run(true),
          );
        else run(false);
      },
    });
    eq.id = "weaponEquip";
    right.append(h("div", { class: "tt-row actions" }, [eq]));
  }
  host.append(
    h("p", { class: "tt-dim" }, [`${c.name} · ${TYPE_NAME(c.w)}`]),
    h("div", { class: "tt-wswap" }, [ul, right]),
  );
}

// ---------------------------------------------------------------- Lò Rèn

function renderForge(host: HTMLElement) {
  const P = Server.P,
    F = vk().loRen;
  host.classList.add("tt-menu-forge");
  const have = bagOf(F.nguyenLieu);
  host.append(
    h("p", {}, [
      icon("long-sao", { size: 18 }),
      ` Mỗi lần rèn tốn ${F.so} ${itemName(F.nguyenLieu)} và ${fmt(F.xu)} Xu. Đang có ${have} ${itemName(F.nguyenLieu)}.`,
    ]),
  );
  const grid = h("div", { class: "tt-forge", id: "forgeList" });
  for (const d of weaponList().filter((w) => w.nguon === "loRen")) {
    const n = weapons().filter((w) => w.id === d.id).length;
    const b = button("Rèn", {
      variant: "primary",
      icon: "nang-cap",
      disabled: have < F.so || P.coin < F.xu,
      onClick: () => {
        const r = Server.req("forgeWeapon", { id: d.id });
        if (!r.ok) return;
        sfx("slam");
        refreshWallets();
        rerender();
      },
    });
    b.dataset.id = d.id;
    grid.append(
      h("article", { class: "tt-forge-item", "data-r": d.r, "data-id": d.id }, [
        h("span", { class: "art" }, [weaponBadge(d.id, `Đang có ${n}`)]),
        h("b", {}, [d.ten]),
        h("small", { class: "tt-dim" }, [`${TYPE_NAME(d.loai)} · Tấn công +${pct(d.tanCong)} · ${d.biDong.ten}`]),
        h("small", {}, [`Đang có ${n}`]),
        b,
      ]),
    );
  }
  host.append(grid);
}

registerScreen("weapons", {
  title: "Tủ Đồ",
  icon: "tui-do",
  render: (host, params) => {
    if (params.tab === undefined) params.tab = "vu-khi";
    renderTuDo(host, params);
  },
});
registerScreen("wupgrade", { title: "Vũ khí", icon: "nang-cap", render: renderUpgrade });
registerScreen("wswap", { title: "Thay vũ khí", icon: "danh", render: renderSwap });
registerScreen("forge", { title: "Lò Rèn", icon: "nang-cap", render: renderForge });
