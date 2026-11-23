import { GS } from "../core/state";
import type { Mini } from "../data/puzzles-schema";
import { Server } from "../server/server";
import { tryFinishMini } from "../world/puzzles";
import { button, h } from "./ds";
import "./dialog.css";

/* Hộp thoại NPC của quest mini (S23). Mở thì game tạm dừng; bấm Tiếp, Tương tác hoặc Đánh để sang dòng. */

let box: HTMLElement | null = null;
let lines: { ai: string; loi: string }[] = [];
let at = 0;
let after: (() => void) | null = null;

function show(m: Mini) {
  if (!box) return;
  const L = lines[at]!;
  box.replaceChildren(
    h("div", { class: "tt-dialog__head" }, [
      h("span", { class: "tt-dialog__who" }, [L.ai]),
      h("span", {}, [`${m.ten} · ${at + 1}/${lines.length}`]),
    ]),
    h("div", { id: "dlgText" }, [L.loi]),
    h("div", { class: "tt-dialog__row" }, [
      Object.assign(button(at < lines.length - 1 ? "Tiếp" : "Xong", { variant: "primary", onClick: dialogNext }), {
        id: "dlgNext",
      }),
    ]),
  );
}

export function openMiniDialog(m: Mini) {
  const P = Server.P.puz;
  const done = P.mini.includes(m.id),
    talked = P.talked.includes(m.id);
  lines = done
    ? [{ ai: m.npc, loi: "Nhờ có các cháu cả. Lúc nào ghé qua thì vào uống chén nước." }]
    : talked
      ? [{ ai: m.npc, loi: m.moTa }]
      : m.thoai;
  at = 0;
  after = () => {
    if (!talked && !done) Server.req("talkMini", { id: m.id });
    tryFinishMini(m);
  };
  box?.remove();
  box = h("div", { class: "tt-root tt-dialog", id: "dlg", role: "dialog", "aria-label": m.ten });
  document.body.append(box);
  GS.overlay = "dialog";
  GS.paused = true;
  show(m);
  (box as any)._m = m;
}

export function dialogNext() {
  if (!box) return;
  if (at < lines.length - 1) {
    at++;
    show((box as any)._m);
    return;
  }
  box.remove();
  box = null;
  GS.overlay = null;
  GS.paused = false;
  const f = after;
  after = null;
  f?.();
}
export const dialogOpen = () => !!box;
