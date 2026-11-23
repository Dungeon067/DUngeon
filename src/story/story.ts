/**
 * Chạy cốt truyện chính (Mở đầu, Chương 1) từ content/story.json (sinh bằng `pnpm story:build` từ docs/story/).
 * Hộp thoại có tên và chân dung người nói, lựa chọn, rẽ nhánh theo cờ, trận đánh trong truyện, lưu tiến độ trong hồ sơ.
 * Bước không có trong game (máy quay, âm thanh, NPC đi) được bỏ qua; nhận đồ và nhiệm vụ hiện thông báo.
 */
import storyRaw from "../../content/story.json";
import { portrait } from "../art/chibi";
import { GS } from "../core/state";
import { byId, EL } from "../data/content";
import { makeEnemy } from "../entities/enemy";
import { Server } from "../server/server";
import { button, h } from "../ui/ds";
import { toast } from "../ui/toast";
import { blockedAt } from "../world/collision";
import { TS } from "../world/map";
import "../ui/dialog.css";

type Step = Record<string, any>;
interface Section {
  id: string;
  ten: string;
  chuong: string;
  mucTieu: string;
  steps: Step[];
}
const DATA = storyRaw as unknown as { ten: Record<string, string>; sections: Section[] };
export const SECTIONS = DATA.sections;

export interface StorySave {
  done: string[];
  flags: Record<string, string>;
}

/** Quái trong kịch bản chưa có trong game: dùng quái gần nghĩa nhất. */
const ENEMY_MAP: Record<string, { t: string; el?: string; lv?: number }> = {
  bong_can: { t: "slime", el: "water" },
  goblin_lon: { t: "golem", el: "earth" },
  mat_na_trang: { t: "goblin" },
  mat_na_go: { t: "shaman", lv: 2 },
  hacgiao: { t: "golem", el: "water", lv: 3 },
};
const TOD: Record<string, number> = { dem: 0.95, sang: 0.35, chieu: 0.62 };

export function storySave(): StorySave {
  const P: any = Server.P;
  const s = P.story && typeof P.story === "object" ? P.story : {};
  P.story = {
    done: Array.isArray(s.done) ? s.done.filter((x: any) => typeof x === "string") : [],
    flags: s.flags && typeof s.flags === "object" ? s.flags : {},
  };
  return P.story;
}
/** Phân đoạn kế tiếp chưa xong, hoặc null khi đã hết. */
export function nextSection(): Section | null {
  const d = storySave().done;
  return SECTIONS.find((s) => !d.includes(s.id)) ?? null;
}

let run: { s: Section; steps: Step[]; pc: number; labels: Map<string, number>; battle: any[] | null } | null = null;
let box: HTMLElement | null = null;
let fadeEl: HTMLElement | null = null;

export const storyRunning = () => !!run;
export const storyDialogOpen = () => !!box && !!run && !run.battle;

/** Dòng mục tiêu trên HUD khi còn cốt truyện. */
export function storyObjective(): { text: string; target: string | null } | null {
  if (GS.G?.mode !== "world") return null;
  if (run?.battle)
    return { text: `${run.s.ten}: đánh bại quái (${run.battle.filter((e) => !e.dead).length} còn lại)`, target: null };
  if (run) return null;
  const n = nextSection();
  if (!n) return null;
  return { text: `${n.chuong} · ${n.ten}: chạm vào đây để tiếp tục`, target: null };
}

function labels(steps: Step[]) {
  const m = new Map<string, number>();
  steps.forEach((s, i) => s.label && m.set(s.label, i));
  return m;
}

/** Bắt đầu phân đoạn kế tiếp (hoặc phân đoạn cho trước). */
export function startStory(id?: string) {
  if (run || GS.G?.mode !== "world" || GS.overlay) return false;
  const s = id ? SECTIONS.find((x) => x.id === id) : nextSection();
  if (!s) return false;
  run = { s, steps: [...s.steps], pc: 0, labels: labels(s.steps), battle: null };
  GS.paused = true;
  GS.overlay = "dialog";
  advance();
  return true;
}

function flagOk(cond: string) {
  const [k, v] = cond.split("=");
  const f = storySave().flags;
  return v === undefined ? !!f[k!] : f[k!] === v;
}
function setFlag(s: string) {
  const [k, v] = s.split("=");
  storySave().flags[k!] = v ?? "1";
}

function goto(label: string) {
  if (!run) return;
  const i = run.labels.get(label);
  run.pc = i === undefined ? run.pc + 1 : i;
}

/** Chạy các bước không cần chờ, dừng ở lời thoại, lựa chọn hoặc trận đánh. */
function advance() {
  while (run && run.pc < run.steps.length) {
    const st = run.steps[run.pc]!;
    if (st.speaker !== undefined && st.text !== undefined) return showLine(st);
    if (st.choice) return showChoice(st.choice);
    if (st.start_battle) return beginBattle(st.start_battle);
    run.pc++;
    if (st.goto) goto(st.goto);
    else if (st.if_flag) {
      const br: Step[] = (flagOk(st.if_flag) ? st.then : st.else) ?? [];
      run.steps.splice(run.pc, 0, ...br);
      run.labels = labels(run.steps);
    } else if (st.tutorial || st.hint) {
      if (st.hint) toast(st.hint);
    } else if (st.action) doAction(st);
  }
  if (run) finish();
}

function doAction(a: Step) {
  switch (a.action) {
    case "fade":
      flash(a.to === "den");
      break;
    case "set_time":
      (GS as any).tod = TOD[a.to] ?? undefined;
      break;
    case "start_quest":
      toast(`Nhiệm vụ mới: ${run?.s.ten ?? ""}`);
      break;
    case "complete_quest":
      break;
    case "join_party": {
      const c = byId[a.character];
      if (c) toast(a.temporary ? `${c.name} đi cùng đội` : `${c.name} nhập đội`);
      break;
    }
    case "give_item":
      toast(`Nhận: ${String(a.item).replace(/_/g, " ")}${a.count > 1 ? ` ×${a.count}` : ""}`);
      break;
    case "wish_cinematic": {
      const c = byId[a.character];
      if (c) toast(`Lời ước được đáp: ${c.name}`);
      break;
    }
    default:
    // move_camera, npc_move, play_sfx, play_bgm, give_reward (gộp vào thưởng cuối phân đoạn), spawn: bỏ qua.
  }
}

function flash(toBlack: boolean) {
  fadeEl?.remove();
  fadeEl = h("div", {
    style: `position:fixed;inset:0;z-index:55;pointer-events:none;background:#05060c;opacity:${toBlack ? 0.85 : 0};transition:opacity .6s`,
  });
  document.body.append(fadeEl);
  if (!toBlack) return;
  const el = fadeEl;
  setTimeout(() => (el.style.opacity = "0"), 700);
  setTimeout(() => el.remove(), 1400);
}

function who(id: string): { name: string; art: HTMLCanvasElement | null; col: string } {
  const c = byId[id];
  if (c) return { name: c.name, art: portrait(c.id, 72, 72, "head"), col: EL[c.el]?.c ?? "#f0c060" };
  return { name: DATA.ten[id] ?? id.replace(/^npc_/, "").replace(/_/g, " "), art: null, col: "#f0c060" };
}

function frame(children: (HTMLElement | string)[]) {
  box?.remove();
  document.body.classList.add("story-on");
  box = h(
    "div",
    { class: "tt-root tt-dialog tt-story", id: "storyDlg", role: "dialog", "aria-label": run?.s.ten ?? "" },
    children,
  );
  document.body.append(box);
}

function head() {
  return h("div", { class: "tt-dialog__head" }, [
    h("span", {}, [`${run!.s.chuong} · ${run!.s.ten}`]),
    Object.assign(button("Bỏ qua", { onClick: skip }), { id: "storySkip" }),
  ]);
}

function showLine(st: Step) {
  const sp: string = st.speaker;
  const narr = sp === "ke_chuyen" || sp === "he_thong";
  const w = narr ? null : who(sp);
  frame([
    head(),
    h("div", { class: "tt-story__body" }, [
      w?.art ? h("div", { class: "tt-story__pic", style: `border-color:${w.col}` }, [w.art]) : "",
      h("div", { class: "tt-story__txt" }, [
        w ? h("div", { class: "tt-dialog__who", style: `color:${w.col}` }, [w.name]) : "",
        h("div", { id: "dlgText", class: narr ? "tt-story__narr" : "" }, [st.text]),
      ]),
    ]),
    h("div", { class: "tt-dialog__row" }, [
      Object.assign(button("Tiếp", { variant: "primary", onClick: storyNext }), { id: "dlgNext" }),
    ]),
  ]);
}

function showChoice(ch: { text: string; goto?: string; set_flag?: string }[]) {
  frame([
    head(),
    h(
      "div",
      { class: "tt-story__choices" },
      ch.map((c) =>
        button(c.text, {
          variant: "primary",
          onClick: () => {
            if (!run) return;
            if (c.set_flag) setFlag(c.set_flag);
            run.pc++;
            if (c.goto) goto(c.goto);
            advance();
          },
        }),
      ),
    ),
  ]);
}

/** Sang dòng kế (nút Tiếp, phím tương tác hoặc đánh). */
export function storyNext() {
  if (!run || run.battle) return;
  const st = run.steps[run.pc];
  if (st?.choice) return;
  run.pc++;
  advance();
}

function beginBattle(b: { enemies: string[]; on_win?: string }) {
  if (!run) return;
  const G = GS.G,
    p = G.p,
    lv = run.s.id.startsWith("md") ? 1 : 2;
  const list: any[] = [];
  b.enemies.forEach((name, i) => {
    const m = ENEMY_MAP[name] ?? { t: name };
    for (let k = 0; k < 8; k++) {
      const a = (i / b.enemies.length) * Math.PI * 2 + k * 0.4,
        r = TS * (3.2 + k * 0.3),
        x = p.x + Math.cos(a) * r,
        y = p.y + Math.sin(a) * r;
      if (blockedAt(x, y, 12, G.map)) continue;
      try {
        const e: any = makeEnemy(m.t, x, y, lv + (m.lv ?? 0), m.el);
        e.story = true;
        e.state = "chase";
        G.enemies.push(e);
        list.push(e);
      } catch {
        /* loại quái lạ: bỏ qua */
      }
      break;
    }
  });
  run.battle = list;
  (run as any).onWin = b.on_win;
  box?.remove();
  box = null;
  document.body.classList.remove("story-on");
  GS.overlay = null;
  GS.paused = false;
  if (!list.length) endBattle();
}

function endBattle() {
  if (!run) return;
  const onWin = (run as any).onWin as string | undefined;
  run.battle = null;
  GS.paused = true;
  GS.overlay = "dialog";
  run.pc++;
  if (onWin) goto(onWin);
  advance();
}

/** Gọi mỗi khung trong chế độ thế giới: theo dõi trận đánh trong truyện. */
export function storyTick() {
  if (!run?.battle) return;
  if (run.battle.every((e) => e.dead || !GS.G.enemies.includes(e))) endBattle();
}

function skip() {
  if (!run) return;
  if (run.battle) for (const e of run.battle) e.dead = true;
  // Vẫn ghi lại lựa chọn mặc định (lựa chọn đầu tiên) để các rẽ nhánh sau còn đúng.
  for (const st of run.steps)
    if (st.choice?.[0]?.set_flag && !storySave().flags[st.choice[0].set_flag.split("=")[0]])
      setFlag(st.choice[0].set_flag);
  finish();
}

function finish() {
  if (!run) return;
  const s = run.s,
    S = storySave();
  if (!S.done.includes(s.id)) {
    S.done.push(s.id);
    // Thưởng mỗi phân đoạn: Đá Sao và Xu (kịch bản ghi give_reward theo bảng kiểm tra; gộp thành một mức chung).
    Server.P.gems += 40;
    Server.P.coin += 4000;
  }
  Server.save();
  run = null;
  box?.remove();
  box = null;
  document.body.classList.remove("story-on");
  (GS as any).tod = undefined;
  GS.overlay = null;
  GS.paused = false;
  toast(`Hoàn thành: ${s.ten} · +40 Đá Sao, +4.000 Xu`);
}
