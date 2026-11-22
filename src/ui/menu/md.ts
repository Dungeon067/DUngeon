import { inline, plain } from "../../data/markdown";
import type { MdBlock, MdSection } from "../../data/markdown";
import { h } from "../ds";
import { icon } from "../icons/icons";

/** Vẽ khối Markdown đã đọc (docs/) thành DOM dùng class của S08. */
export function blocksEl(blocks: MdBlock[], onLine?: (speaker: string, text: string) => void): HTMLElement {
  const box = h("div", { class: "tt-md" });
  for (const b of blocks) {
    if (b.t === "p") box.append(html("p", inline(b.text)));
    else if (b.t === "h") box.append(html(b.level <= 3 ? "h4" : "h5", inline(b.text)));
    else if (b.t === "list") {
      const ul = h("ul");
      for (const it of b.items) ul.append(html("li", inline(it)));
      box.append(ul);
    } else if (b.t === "table") box.append(tableEl(b.head, b.rows, onLine));
  }
  return box;
}

function html<K extends keyof HTMLElementTagNameMap>(tag: K, s: string) {
  const el = document.createElement(tag);
  el.innerHTML = s;
  return el;
}

const QUOTE = /^["“].*["”]$/;
/** Bảng; nếu cột cuối là lời thoại trong ngoặc kép thì mỗi dòng bấm được để nghe chữ chạy. */
function tableEl(head: string[], rows: string[][], onLine?: (s: string, t: string) => void) {
  const spoken = !!onLine && rows.length > 0 && rows.every((r) => QUOTE.test(plain(r[r.length - 1] ?? "").trim()));
  if (spoken) {
    const ul = h("ul", { class: "tt-lines" });
    for (const r of rows) {
      const situ = plain(r.length > 2 ? r[1]! : r[0]!);
      const text = plain(r[r.length - 1]!).trim().replace(/^["“]|["”]$/g, "");
      const b = h("button", { type: "button", class: "tt-line-btn" }, [
        icon("am-thanh", { size: 16 }),
        h("span", { class: "situ" }, [situ]),
      ]);
      b.addEventListener("click", () => onLine!(situ, text));
      ul.append(h("li", {}, [b]));
    }
    return ul;
  }
  const t = h("table", { class: "tt-table" });
  const tr = h("tr");
  for (const c of head) tr.append(html("th", inline(c)));
  t.append(h("thead", {}, [tr]));
  const tb = h("tbody");
  for (const r of rows) {
    const row = h("tr");
    for (const c of r) row.append(html("td", inline(c)));
    tb.append(row);
  }
  t.append(tb);
  return h("div", { class: "tt-table-wrap" }, [t]);
}

/** Mục hồ sơ: phần chưa đủ thân thiết hiện khóa. */
export function sectionsEl(
  sections: MdSection[],
  unlocked: (i: number) => number | true,
  onLine?: (speaker: string, text: string) => void,
) {
  const box = h("div", { class: "tt-sections" });
  sections.forEach((s, i) => {
    const u = unlocked(i);
    const title = s.title.replace(/^\d+\.\s*/, "");
    if (u === true)
      box.append(h("section", { class: "tt-sec" }, [h("h4", { class: "tt-h4" }, [title]), blocksEl(s.blocks, onLine)]));
    else
      box.append(
        h("section", { class: "tt-sec is-locked" }, [
          h("h4", { class: "tt-h4" }, [icon("khoa", { size: 16 }), " ", title]),
          h("p", { class: "tt-dim" }, [`Mở khi Thân thiết đạt cấp ${u}.`]),
        ]),
      );
  });
  return box;
}

/** Hộp thoại chữ chạy. say() bắt đầu câu mới; bấm vào hộp khi đang chạy thì hiện hết câu. */
export function typewriter() {
  const who = h("b", { class: "who" });
  const txt = h("span", { class: "txt", "aria-live": "polite" });
  const el = h("div", { class: "tt-say", hidden: true }, [who, txt]);
  let full = "",
    i = 0,
    tm = 0;
  const stop = () => {
    clearInterval(tm);
    txt.textContent = full;
  };
  el.addEventListener("click", () => (i < full.length ? ((i = full.length), stop()) : (el.hidden = true)));
  return {
    el,
    say(name: string, text: string) {
      clearInterval(tm);
      el.hidden = false;
      who.textContent = name;
      full = text;
      i = 0;
      txt.textContent = "";
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return stop();
      tm = window.setInterval(() => {
        i += 1;
        txt.textContent = full.slice(0, i);
        if (i >= full.length) clearInterval(tm);
      }, 28);
    },
    stop: () => clearInterval(tm),
  };
}
