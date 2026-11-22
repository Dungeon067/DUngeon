/** Đọc Markdown hồ sơ (docs/characters, docs/world) thành khối đơn giản để hiển thị trong menu. */
export type MdBlock =
  | { t: "p"; text: string }
  | { t: "list"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "h"; level: number; text: string };

export interface MdSection {
  title: string;
  blocks: MdBlock[];
}
export interface MdDoc {
  title: string;
  intro: MdBlock[];
  sections: MdSection[];
}

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function parseBlocks(src: string): MdBlock[] {
  const out: MdBlock[] = [];
  const lines = src.replace(/\r/g, "").split("\n");
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push({ t: "p", text: para.join(" ") });
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]!;
    if (!l.trim()) {
      flush();
      continue;
    }
    const hm = /^(#{3,6})\s+(.*)$/.exec(l);
    if (hm) {
      flush();
      out.push({ t: "h", level: hm[1]!.length, text: hm[2]!.trim() });
      continue;
    }
    if (l.trim().startsWith("|")) {
      flush();
      const head = cells(l);
      const rows: string[][] = [];
      i++;
      if (i < lines.length && /^\s*\|[\s:|-]+\|?\s*$/.test(lines[i]!)) i++;
      for (; i < lines.length && lines[i]!.trim().startsWith("|"); i++) rows.push(cells(lines[i]!));
      i--;
      out.push({ t: "table", head, rows });
      continue;
    }
    if (/^\s*[-*]\s+/.test(l)) {
      flush();
      const items: string[] = [];
      for (; i < lines.length && /^\s*([-*]\s+|\s{2,}\S)/.test(lines[i]!); i++) {
        const li = lines[i]!;
        if (/^\s*[-*]\s+/.test(li)) items.push(li.replace(/^\s*[-*]\s+/, ""));
        else items[items.length - 1] += " " + li.trim();
      }
      i--;
      out.push({ t: "list", items });
      continue;
    }
    if (/^\s*>/.test(l)) {
      para.push(l.replace(/^\s*>\s?/, ""));
      continue;
    }
    para.push(l.trim());
  }
  flush();
  return out;
}

export function parseDoc(src: string): MdDoc {
  const titleM = /^#\s+(.*)$/m.exec(src);
  const title = titleM ? titleM[1]!.trim() : "";
  const body = titleM ? src.slice(titleM.index + titleM[0].length) : src;
  const parts = body.split(/^##\s+/m);
  const intro = parseBlocks(parts[0] ?? "");
  const sections = parts.slice(1).map((p) => {
    const nl = p.indexOf("\n");
    const head = (nl < 0 ? p : p.slice(0, nl)).trim();
    return { title: head.replace(/^\d+(\.\d+)*\.\s*/, ""), blocks: parseBlocks(nl < 0 ? "" : p.slice(nl + 1)) };
  });
  return { title, intro, sections };
}

/** Bỏ dấu Markdown nội dòng (đậm, nghiêng, mã) để lấy chữ thuần. */
export const plain = (s: string) => s.replace(/\*\*|__|`/g, "").replace(/(^|[^\w])[*_]([^*_]+)[*_]/g, "$1$2");

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
/** Đổi Markdown nội dòng sang HTML an toàn (chỉ đậm, nghiêng, mã). */
export function inline(s: string) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^\w*])[*_]([^*_]+)[*_](?=[^\w*]|$)/g, "$1<i>$2</i>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}
