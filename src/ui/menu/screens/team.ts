import { portrait } from "../../../art/chibi";
import { GS } from "../../../core/state";
import { EL, byId } from "../../../data/content";
import { MENU } from "../../../data/menu-content";
import { buildParty } from "../../../entities/party";
import { fmt } from "../../../core/util";
import { Server, powerOf, statsOf } from "../../../server/server";
import { buildHudParty } from "../../hud";
import { button, charCard, elementBadge, h, tabs, tag, toast } from "../../ds";
import { icon } from "../../icons/icons";
import { inCombat, reactionText } from "../logic";
import { registerScreen, rerender } from "../shell";

/* Màn Đội hình (S10): 4 đội lưu sẵn, kéo thả, thay bằng phím/tay cầm (chọn ô rồi chọn người),
   gợi ý phản ứng. Khi có quái đang đánh ở gần thì không cho đổi đội đang dùng. */
let idx = -1;
let draft: string[] = [];
let slot = 0;
let dirty = false;

export const teamLocked = () => inCombat(GS.G, MENU.combatLock.radius);

function head(id: string, s = 72) {
  const c = document.createElement("canvas");
  c.width = c.height = s;
  c.getContext("2d")!.drawImage(portrait(id, s, s, "head"), 0, 0);
  return c;
}

function load(i: number) {
  idx = i;
  draft = [...(Server.P.teams[i] ?? [])];
  slot = Math.min(draft.length, 3);
  dirty = false;
}

/** Đặt nhân vật id vào ô s (đổi chỗ nếu đã có trong đội). */
export function place(team: string[], s: number, id: string) {
  const t = [...team];
  const from = t.indexOf(id);
  if (from >= 0) {
    [t[from], t[s]] = [t[s]!, t[from]!];
    return t.filter(Boolean);
  }
  if (s >= t.length) t.push(id);
  else t[s] = id;
  return t.slice(0, 4);
}

function setDraft(t: string[]) {
  draft = t;
  dirty = true;
  rerender();
}

function apply(use: boolean) {
  const locked = teamLocked();
  if (idx === Server.P.team || use) {
    if (locked) return toast(MENU.combatLock.message, "warn");
  }
  if (!Server.req("setTeam", { idx, party: draft }).ok) return;
  dirty = false;
  if (use && Server.req("useTeam", { idx }).ok) toast(`Đã dùng Đội ${idx + 1}`, "ok");
  else toast(`Đã lưu Đội ${idx + 1}`, "ok");
  if (GS.G?.mode === "world" && (use || idx === Server.P.team)) {
    GS.G.party = buildParty();
    GS.G.act = 0;
    buildHudParty();
  }
  rerender();
}

function render(host: HTMLElement, params: any) {
  const P = Server.P;
  if (params.idx !== undefined) {
    load(params.idx);
    delete params.idx;
  }
  if (idx < 0) load(P.team);
  const locked = teamLocked();
  host.classList.add("tt-menu-team");

  const tl = tabs(
    P.teams.map((t: string[], i: number) => ({
      id: String(i),
      label: `Đội ${i + 1}${i === P.team ? " · đang dùng" : ""}`,
    })),
    String(idx),
    (id) => {
      if (Number(id) === idx) return;
      load(Number(id));
      rerender();
    },
  );
  const warn = locked
    ? h("div", { class: "tt-banner is-warn", role: "alert", id: "teamLock" }, [
        icon("canh-bao", { size: 20 }),
        MENU.combatLock.message,
      ])
    : null;

  const slots = h("ol", { class: "tt-slots", "aria-label": "Bốn ô trong đội" });
  for (let s = 0; s < 4; s++) {
    const id = draft[s];
    const c = id ? byId[id] : null;
    const b = h(
      "button",
      {
        type: "button",
        class: "tt-tslot" + (s === slot ? " is-sel" : "") + (c ? "" : " is-empty"),
        "aria-pressed": String(s === slot),
        "aria-label": c ? `Ô ${s + 1}: ${c.name}` : `Ô ${s + 1}: trống`,
        "data-slot": s,
        draggable: c ? "true" : "false",
      },
      c
        ? [
            h("span", { class: "k" }, [String(s + 1)]),
            head(c.id),
            h("span", { class: "nm" }, [c.name]),
            h("small", {}, [elementBadge(c.el, { size: 14, name: EL[c.el]?.vi }), ` Cấp ${statsOf(c.id).lv}`]),
            h("small", { class: "tt-power" }, [`Chiến Lực ${fmt(powerOf(c.id))}`]),
          ]
        : [
            h("span", { class: "k" }, [String(s + 1)]),
            icon("them", { size: 28 }),
            h("span", { class: "nm" }, ["Trống"]),
          ],
    );
    b.addEventListener("click", () => {
      slot = s;
      rerender();
    });
    b.addEventListener("dragstart", (e) => e.dataTransfer!.setData("text/plain", `slot:${s}`));
    b.addEventListener("dragover", (e) => {
      e.preventDefault();
      b.classList.add("is-over");
    });
    b.addEventListener("dragleave", () => b.classList.remove("is-over"));
    b.addEventListener("drop", (e) => {
      e.preventDefault();
      const d = e.dataTransfer!.getData("text/plain");
      if (d.startsWith("slot:")) {
        const f = Number(d.slice(5));
        const t = [...draft];
        if (t[f] && t[s]) [t[f], t[s]] = [t[s]!, t[f]!];
        else if (t[f]) t.push(t.splice(f, 1)[0]!);
        setDraft(t.filter(Boolean));
      } else if (d.startsWith("char:")) setDraft(place(draft, s, d.slice(5)));
    });
    slots.append(h("li", {}, [b]));
  }

  const els = draft.map((id) => byId[id]?.el ?? "");
  const tips = h("p", { class: "tt-react", id: "teamReact" }, [icon("sao", { size: 18 }), reactionText(els)]);

  const actions = h("div", { class: "tt-row" }, [
    button("Bỏ khỏi ô", {
      variant: "ghost",
      icon: "bot",
      disabled: !draft[slot],
      onClick: () => setDraft(draft.filter((_, i) => i !== slot)),
    }),
    button(dirty ? "Lưu đội" : "Đã lưu", {
      icon: "xac-nhan",
      disabled: !dirty || (idx === P.team && locked),
      onClick: () => apply(false),
    }),
    button(idx === P.team && !dirty ? "Đang dùng" : "Dùng đội này", {
      variant: "primary",
      icon: "doi-nguoi",
      disabled: locked || !draft.length || (idx === P.team && !dirty),
      onClick: () => apply(true),
    }),
  ]);
  (actions.lastElementChild as HTMLElement).id = "teamUse";

  const roster = h("div", { class: "tt-roster tt-roster--grid", "aria-label": "Nhân vật đã có" });
  for (const id of Object.keys(P.owned)) {
    const c = byId[id];
    if (!c) continue;
    const card = charCard({
      name: c.name,
      rarity: c.r as 4 | 5,
      el: c.el,
      elName: EL[c.el]?.vi ?? c.el,
      level: statsOf(id).lv,
      netSao: P.owned[id].cons,
      art: head(id, 96),
      selected: draft.includes(id),
    });
    card.dataset.id = id;
    card.draggable = true;
    card.addEventListener("dragstart", (e) => e.dataTransfer!.setData("text/plain", `char:${id}`));
    card.addEventListener("click", () => {
      if (draft.includes(id) && draft[slot] === id) return;
      setDraft(place(draft, slot, id));
      slot = Math.min(draft.length, 3);
    });
    roster.append(card);
  }

  host.append(
    tl,
    warn ?? "",
    h("div", { class: "tt-team-grid" }, [
      h("section", { class: "tt-panel" }, [
        h("p", { class: "tt-team-power", "data-testid": "team-power" }, [
          "Chiến Lực đội ",
          h("b", {}, [fmt(draft.reduce((n, id) => n + powerOf(id), 0))]),
        ]),
        slots,
        tips,
        h("p", { class: "tt-dim" }, ["Kéo nhân vật vào ô, hoặc chọn một ô rồi chọn người. Q/E đổi đội."]),
        actions,
        dirty ? tag("Chưa lưu", "warn") : "",
      ]),
      h("section", { class: "tt-panel" }, [h("h3", { class: "tt-h3" }, ["Nhân vật"]), roster]),
    ]),
  );
}

registerScreen("team", {
  title: "Đội hình",
  icon: "doi-hinh",
  render,
  onKey(e) {
    if (e.key === "q" || e.key === "e") {
      load((idx + (e.key === "e" ? 1 : 3)) % 4);
      rerender();
      return true;
    }
    if (/^[1-4]$/.test(e.key)) {
      slot = Number(e.key) - 1;
      rerender();
      return true;
    }
    return false;
  },
  onClose() {
    idx = -1;
  },
});
