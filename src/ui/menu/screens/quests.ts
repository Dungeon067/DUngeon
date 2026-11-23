import { QUESTS } from "../../../data/menu-content";
import { Server } from "../../../server/server";
import { button, h, progress, tabs, tag, toast } from "../../ds";
import { icon } from "../../icons/icons";
import { questState, stepText, syncQuests } from "../quests";
import { byId } from "../../../data/content";
import { MINI } from "../../../data/puzzles";
import { miniState } from "../../../world/puzzle-marks";
import { openMenu, registerScreen, rerender } from "../shell";

/* Nhật ký nhiệm vụ (S10): Đang làm, Đã xong, theo dõi, chỉ đường (đánh dấu trên bản đồ nhỏ và bản đồ lớn). */
let tab = "active";
let sel: string | null = null;
const TYPE: Record<string, string> = { chinh: "Cốt truyện", phu: "Phụ", "hang-ngay": "Hằng ngày", mini: "Quest mini" };

interface Entry {
  q: { id: string; name: string; type: string; giver: string; desc: string; reward: string };
  st: { done: boolean; cur: number; steps: { text: string; n: number; max: number; target?: string | null }[] };
}
/** Nhiệm vụ trong menu-content cộng quest mini S23 (content/puzzles.yaml), cùng một dạng để hiển thị. */
function entries(): Entry[] {
  const a: Entry[] = QUESTS.map((q) => {
    const st = questState(q);
    return {
      q,
      st: { done: st.done, cur: st.cur, steps: st.steps.map((s) => ({ ...s, text: stepText(s) })) },
    };
  });
  for (const m of MINI) {
    const reward = `${m.thuong.daSao} Đá Sao, ${m.thuong.xu} Xu${m.tang ? `, ${byId[m.tang]?.name} nhập đội` : ""}`;
    a.push({
      q: { id: m.id, name: m.ten, type: "mini", giver: m.npc, desc: `${m.vung}. ${m.moTa}`, reward },
      st: miniState(m),
    });
  }
  return a;
}

function render(host: HTMLElement) {
  syncQuests();
  host.classList.add("tt-menu-quests");
  const P = Server.P;
  const all = entries();
  const list = all.filter((x) => (tab === "done" ? x.st.done : !x.st.done));
  const tl = tabs(
    [
      { id: "active", label: `Đang làm (${all.filter((x) => !x.st.done).length})`, icon: "nhiem-vu" },
      { id: "done", label: `Đã xong (${all.filter((x) => x.st.done).length})`, icon: "xac-nhan" },
    ],
    tab,
    (id) => {
      if (id === tab) return;
      tab = id;
      sel = null;
      rerender();
    },
  );
  if (!sel || !list.some((x) => x.q.id === sel))
    sel = list.find((x) => x.q.id === P.quests.tracked)?.q.id ?? list[0]?.q.id ?? null;
  const ul = h("ul", { class: "tt-qlist", id: "questList" });
  for (const { q, st } of list) {
    const b = h(
      "button",
      {
        type: "button",
        class: "tt-qitem" + (q.id === sel ? " is-sel" : ""),
        "data-id": q.id,
        "aria-pressed": String(q.id === sel),
      },
      [
        h("span", { class: "nm" }, [q.name]),
        h("small", {}, [
          TYPE[q.type] ?? q.type,
          P.quests.tracked === q.id ? " · Đang theo dõi" : "",
          st.done ? " · Đã xong" : "",
        ]),
      ],
    );
    b.addEventListener("click", () => ((sel = q.id), rerender()));
    ul.append(h("li", {}, [b]));
  }
  const cur = all.find((x) => x.q.id === sel);
  let detail: HTMLElement;
  if (!cur)
    detail = h("aside", { class: "tt-panel tt-empty" }, [
      icon("nhiem-vu", { size: 40 }),
      h("p", {}, [tab === "done" ? "Chưa xong nhiệm vụ nào." : "Không còn nhiệm vụ đang làm."]),
    ]);
  else {
    const { q, st } = cur;
    const tracked = P.quests.tracked === q.id;
    const steps = h(
      "ol",
      { class: "tt-qsteps" },
      st.steps.map((s, i) =>
        h("li", { class: s.n >= s.max ? "is-done" : i === st.cur ? "is-cur" : "" }, [
          icon(s.n >= s.max ? "xac-nhan" : "nhiem-vu", { size: 16 }),
          h("span", {}, [s.text]),
          s.max > 1 ? progress(s.n / s.max, { label: `${s.n}/${s.max}` }) : "",
        ]),
      ),
    );
    const cs = st.steps[st.cur];
    const actions = st.done
      ? h("p", { class: "tt-dim" }, ["Đã hoàn thành."])
      : h("div", { class: "tt-row" }, [
          button(tracked ? "Bỏ theo dõi" : "Theo dõi", {
            variant: tracked ? "ghost" : "primary",
            icon: "nhiem-vu",
            onClick: () => {
              Server.req("trackQuest", { id: tracked ? null : q.id });
              if (!tracked) toast(`Đang theo dõi: ${q.name}`, "ok");
              rerender();
            },
          }),
          cs?.target
            ? button("Chỉ đường", {
                icon: "ban-do",
                onClick: () => {
                  Server.req("trackQuest", { id: q.id });
                  openMenu("map", { focus: cs.target });
                },
              })
            : "",
        ]);
    (actions.firstElementChild as HTMLElement | null)?.setAttribute("id", "questTrack");
    detail = h("article", { class: "tt-panel tt-qdetail", id: "questDetail" }, [
      h("div", { class: "tt-row" }, [
        tag(TYPE[q.type] ?? q.type, q.type === "chinh" ? "ok" : undefined),
        tracked ? tag("Đang theo dõi", "ok") : "",
      ]),
      h("h3", { class: "tt-h2" }, [q.name]),
      h("p", { class: "tt-dim" }, [`Người giao: ${q.giver}`]),
      h("p", { class: "tt-story" }, [q.desc]),
      steps,
      h("p", {}, [h("b", {}, ["Phần thưởng: "]), q.reward]),
      actions,
    ]);
  }
  host.append(tl, h("div", { class: "tt-quests" }, [ul, detail]));
}

registerScreen("quests", { title: "Nhiệm vụ", icon: "nhiem-vu", render });
