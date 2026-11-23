/* Trang Admin riêng /admin/ (S10): bảng điều khiển cho bản thử nghiệm, dùng chung "server giả lập" với game qua localStorage.
   Trong game không có lối vào trang này. */
import "../ui/ds/ds.css";
import "./admin.css";
import { CHARS, EL } from "../data/content";
import { ADMIN_CFG } from "../data/menu-content";
import { stringify } from "yaml";
import { ECON, econEdited, econForYaml, resetEcon, setEcon } from "../data/economy";
import { packValue } from "../economy/core";
import { LOG_KEY, SAVE_KEY, Server, powerOf } from "../server/server";
import { button, field, h, tabs, tag, toggle } from "../ui/ds";
import { icon } from "../ui/icons/icons";
import { filterHistory } from "../ui/menu/logic";
import { checkPassword, endSession, hasSession, startSession } from "./auth";

type Kid = Node | string | null;
const SECTIONS = [
  { id: "tong-quan", name: "Tổng quan", icon: "bang-dieu-khien" },
  { id: "uoc-nguyen", name: "Ước nguyện", icon: "uoc-nguyen" },
  { id: "cap-phat", name: "Cấp tài nguyên", icon: "ruong" },
  { id: "gm", name: "Chế độ GM", icon: "cai-dat" },
  { id: "uy-thac", name: "Ủy thác", icon: "uy-thac" },
  { id: "kinh-te", name: "Kinh tế", icon: "da-sao" },
  { id: "bo-cuoc", name: "Điểm bỏ cuộc", icon: "canh-bao" },
  { id: "nhat-ky", name: "Nhật ký request", icon: "lich-su" },
] as const;
type SecId = (typeof SECTIONS)[number]["id"];

const app = document.getElementById("admin")!;
const fmt = (n: number) => n.toLocaleString("vi-VN");
const time = (t?: number) => (t ? new Date(t).toLocaleString("vi-VN") : "—");
const input = (f: HTMLElement) => f.querySelector("input")!;
const card = (title: string, kids: Kid[], cls = "") =>
  h("section", { class: "tt-admin-card " + cls }, [h("h2", { class: "tt-h4" }, [title]), ...kids]);
const table = (head: string[], rows: Kid[][], num: number[] = []) =>
  h("div", { class: "tt-table-wrap" }, [
    h("table", { class: "tt-table" }, [
      h("thead", {}, [
        h(
          "tr",
          {},
          head.map((t, i) => h("th", { class: num.includes(i) ? "num" : undefined }, [t])),
        ),
      ]),
      h(
        "tbody",
        {},
        rows.length
          ? rows.map((r) =>
              h(
                "tr",
                {},
                r.map((c, i) => h("td", { class: num.includes(i) ? "num" : undefined }, [c])),
              ),
            )
          : [h("tr", {}, [h("td", { colspan: head.length, class: "tt-admin-empty" }, ["Chưa có dữ liệu."])])],
      ),
    ]),
  ]);
const stat = (label: string, value: string, sub?: string) =>
  h("div", { class: "tt-admin-stat" }, [
    h("span", { class: "l" }, [label]),
    h("b", {}, [value]),
    sub ? h("small", {}, [sub]) : null,
  ]);

function sectionFromHash(): SecId {
  const id = location.hash.slice(1);
  return (SECTIONS.find((s) => s.id === id)?.id ?? "tong-quan") as SecId;
}

/* ---------- đăng nhập ---------- */
function renderLogin(err = "") {
  const pw = field("Mật khẩu", {
    type: "password",
    error: err || undefined,
    hint: err ? undefined : "Đặt trong content/admin.yaml",
  });
  const go = button("Đăng nhập", { variant: "primary", icon: "mo-khoa" });
  const form = h("form", { class: "tt-admin-login", "aria-labelledby": "admLoginT" }, [
    h("h1", { class: "tt-h2", id: "admLoginT" }, ["Admin · Tinh Tú Ước Nguyện"]),
    h("p", { class: "tt-admin-note" }, [
      "Chặn tạm ở bản thử nghiệm: chưa có server, dữ liệu nằm trên trình duyệt này. Khi có server thật, việc xác thực sẽ chuyển lên server.",
    ]),
    pw,
    go,
  ]);
  go.type = "submit";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    go.disabled = true;
    const ok = await checkPassword(input(pw).value, ADMIN_CFG);
    if (!ok) return renderLogin("Sai mật khẩu");
    startSession(ADMIN_CFG);
    render();
  });
  app.replaceChildren(form);
  input(pw).focus();
}

/* ---------- các mục ---------- */
function overview() {
  const P = Server.P;
  const owned = Object.keys(P.owned).length;
  const daily = P.daily?.tasks ?? [];
  const lastQuit = P.quits[0];
  return [
    h("div", { class: "tt-admin-stats" }, [
      stat("Đá Sao", fmt(P.gems)),
      stat("Xu", fmt(P.coin)),
      stat("Sách Kinh Nghiệm", fmt(P.books)),
      stat("Nhân vật", `${owned}/${CHARS.length}`),
      stat("Lượt ước", fmt(P.history.length), "100 lượt gần nhất"),
      stat(
        "Bảo Hộ Vận Sao",
        `${P.pity5}/${P.cfg.hard}`,
        P.guaranteed ? "Lần 5★ sau chắc chắn ra nhân vật banner" : "Đang 50/50",
      ),
      stat("Rương đã mở", fmt(P.chests.length)),
      stat("Ủy thác hôm nay", `${daily.filter((t) => t.claimed).length}/${daily.length}`),
      stat("Bách khoa", fmt(P.codex.length), "mục đã mở"),
      stat(
        "Lần bỏ cuộc gần nhất",
        lastQuit ? `${lastQuit.mode} · ${lastQuit.at}` : "—",
        lastQuit ? time(lastQuit.t) : undefined,
      ),
    ]),
    card("Đội đang dùng", [
      h(
        "p",
        {},
        P.party.map((id) => {
          const c = CHARS.find((x) => x.id === id);
          return c ? tag(`${c.name} · ${EL[c.el]?.vi ?? c.el}`) : null;
        }),
      ),
    ]),
  ];
}

let histR = 0;
function wish() {
  const P = Server.P,
    c = P.cfg;
  const f = {
    rate5: field("Tỉ lệ 5★ (%)", { type: "number", value: String(c.rate5) }),
    rate4: field("Tỉ lệ 4★ (%)", { type: "number", value: String(c.rate4) }),
    soft: field("Bắt đầu tăng tỉ lệ từ lượt", { type: "number", value: String(c.soft) }),
    hard: field("Chắc chắn 5★ ở lượt", { type: "number", value: String(c.hard) }),
    cost: field("Giá một lần ước (Đá Sao)", { type: "number", value: String(c.cost) }),
  };
  const feat = h("select", { class: "tt-input", id: "admFeat" });
  for (const ch of CHARS.filter((x) => ECON.game.nhanVat5Sao.gioiHan.includes(x.id)))
    feat.add(new Option(ch.name, ch.id, false, ch.id === c.featured));
  const save = button("Lưu cấu hình", {
    variant: "primary",
    icon: "xac-nhan",
    onClick: () => {
      const r = Server.req("setConfig", {
        ...Object.fromEntries(Object.entries(f).map(([k, v]) => [k, input(v).value])),
        featured: feat.value,
      });
      if (r.ok) done("Đã lưu cấu hình ước nguyện");
    },
  });
  const hist = filterHistory(P.history, histR);
  return [
    card("Cấu hình", [
      h("div", { class: "tt-admin-form" }, [
        ...Object.values(f),
        h("div", { class: "tt-field" }, [h("label", { for: "admFeat" }, ["Nhân vật nổi bật (5★)"]), feat]),
      ]),
      save,
    ]),
    card("Lịch sử ước", [
      tabs(
        [
          { id: "0", label: `Tất cả (${P.history.length})` },
          { id: "5", label: "5★" },
          { id: "4", label: "4★" },
          { id: "3", label: "3★" },
        ],
        String(histR),
        (id) => {
          if (Number(id) === histR) return;
          histR = Number(id);
          render();
        },
      ),
      table(
        ["Thời gian", "Kết quả", "Độ hiếm"],
        hist.map((x) => [time(x.t), x.n, `${x.r}★`]),
      ),
    ]),
  ];
}

let wipeArm = 0;
function grants() {
  const amt = field("Số lượng", { type: "number", value: "1600" });
  const give = (kind: string, label: string) =>
    button(label, {
      icon: "them",
      onClick: () => {
        if (Server.req("give", { kind, amount: input(amt).value }).ok) done("Đã cấp " + label.toLowerCase());
      },
    });
  const sel = h("select", { class: "tt-input", id: "admChar" });
  for (const c of CHARS)
    sel.add(new Option(`${c.name} (${c.r}★ ${EL[c.el]?.vi ?? c.el})${Server.P.owned[c.id] ? " · đã có" : ""}`, c.id));
  const wipe = button(Date.now() - wipeArm < 4000 ? "Bấm lần nữa để xác nhận xóa" : "Xóa dữ liệu, chơi lại từ đầu", {
    variant: "danger",
    icon: "canh-bao",
    onClick: () => {
      if (Date.now() - wipeArm > 4000) {
        wipeArm = Date.now();
        render();
        return;
      }
      wipeArm = 0;
      if (Server.req("wipe").ok) done("Đã xóa dữ liệu");
    },
  });
  return [
    card("Tài nguyên", [
      amt,
      h("div", { class: "tt-admin-row" }, [
        give("gem", "Đá Sao"),
        give("coin", "Xu"),
        give("book", "Sách Kinh Nghiệm"),
      ]),
    ]),
    card("Nhân vật", [
      h("div", { class: "tt-field" }, [h("label", { for: "admChar" }, ["Chọn nhân vật"]), sel]),
      h("div", { class: "tt-admin-row" }, [
        button("Cấp nhân vật", {
          variant: "primary",
          icon: "them",
          onClick: () => {
            const r = Server.req("giveChar", { id: sel.value });
            if (r.ok) done(r.data.dup ? `Đã tăng Nét Sao: N${r.data.cons}` : "Đã cấp nhân vật mới");
          },
        }),
        button("Nâng lên cấp 60", {
          icon: "nang-cap",
          onClick: () => {
            if (Server.req("maxLv", { id: sel.value }).ok) done("Đã nâng lên cấp 60");
          },
        }),
      ]),
    ]),
    card(
      "Vùng nguy hiểm",
      [h("p", { class: "tt-admin-note" }, ["Xóa toàn bộ hồ sơ trên trình duyệt này. Không hoàn tác được."]), wipe],
      "is-danger",
    ),
  ];
}

function gm() {
  const g = Server.P.gm;
  const t = (k: "god" | "one" | "nocd", label: string) =>
    toggle(label, !!g[k], {
      onChange: (on) => {
        if (Server.req("setGm", { [k]: on }).ok) done(`${label}: ${on ? "bật" : "tắt"}`);
      },
    });
  return [
    card("Chế độ GM", [
      h("p", { class: "tt-admin-note" }, ["Áp dụng ngay cho game đang mở trên cùng trình duyệt."]),
      h("div", { class: "tt-admin-col" }, [
        t("god", "Bất tử"),
        t("one", "Một đòn hạ gục"),
        t("nocd", "Không hồi chiêu"),
      ]),
    ]),
  ];
}

function daily() {
  Server.ensureDaily();
  const d = Server.P.daily!;
  return [
    card(`Ủy thác ngày ${d.date}`, [
      table(
        ["Việc", "Tiến độ", "Trạng thái"],
        d.tasks.map((t) => [
          t.t,
          `${Math.min(t.prog, t.goal)}/${t.goal}`,
          tag(
            t.claimed ? "Đã nhận" : t.prog >= t.goal ? "Chờ nhận" : "Đang làm",
            t.claimed ? "ok" : t.prog >= t.goal ? "warn" : undefined,
          ),
        ]),
        [1],
      ),
      h("p", {}, ["Thưởng hoàn thành ngày: ", tag(d.bonus ? "Đã nhận" : "Chưa nhận", d.bonus ? "ok" : undefined)]),
      button("Làm mới ủy thác", {
        icon: "lam-moi",
        onClick: () => {
          if (Server.req("resetDaily").ok) done("Đã làm mới ủy thác");
        },
      }),
    ]),
  ];
}

const ECON_NAME: Record<string, string> = {
  "ra:uoc": "Ước nguyện",
  "vao:thuong": "Thưởng chung",
  "vao:ruong": "Rương",
  "vao:thap": "Tháp Tinh Tú",
  "vao:boss": "Hắc Giao",
  "vao:uy-thac": "Ủy thác",
  "vao:admin": "Admin cấp",
};
function econ() {
  const e = Server.P.econ;
  const rows = Object.entries(e).sort((a, b) => b[1] - a[1]);
  const vao = rows.filter(([k]) => k.startsWith("vao:")).reduce((s, [, n]) => s + n, 0);
  const ra = rows.filter(([k]) => k.startsWith("ra:")).reduce((s, [, n]) => s + n, 0);
  return [
    h("div", { class: "tt-admin-stats" }, [
      stat("Đá Sao vào", fmt(vao)),
      stat("Đá Sao ra", fmt(ra)),
      stat("Chênh lệch", fmt(vao - ra)),
      stat("Đang giữ", fmt(Server.P.gems)),
    ]),
    card("Theo nguồn", [
      table(
        ["Nguồn", "Chiều", "Đá Sao"],
        rows.map(([k, n]) => [ECON_NAME[k] ?? k, k.startsWith("ra:") ? tag("Ra", "warn") : tag("Vào", "ok"), fmt(n)]),
        [2],
      ),
    ]),
    ...econConfig(),
  ];
}

const ECON_GROUP: Record<string, string> = {
  game: "Đang chạy trong game",
  thietKe: "Thiết kế (tài liệu và mô phỏng)",
  goiNap: "Gói nạp đề xuất (chỉ mô phỏng)",
  hoSo: "Hồ sơ mô phỏng",
  moPhong: "Thông số mô phỏng",
};
function numericLeaves(o: unknown, path = "", out: [string, number][] = []) {
  if (typeof o === "number") out.push([path, o]);
  else if (o && typeof o === "object")
    for (const [k, v] of Object.entries(o)) numericLeaves(v, path ? `${path}.${k}` : k, out);
  return out;
}
function setPath(o: any, path: string, v: number) {
  const ks = path.split(".");
  let cur = o;
  for (const k of ks.slice(0, -1)) cur = cur[k];
  cur[ks.at(-1)!] = v;
}
function econConfig(): Kid[] {
  const inputs: [string, HTMLInputElement][] = [];
  const groups = Object.keys(ECON_GROUP).map((g) => {
    const fields = numericLeaves((ECON as any)[g], g).map(([path, v]) => {
      const f = field(path.slice(g.length + 1), { type: "number", value: String(v) });
      const el = input(f);
      el.step = "any";
      el.dataset.path = path;
      inputs.push([path, el]);
      return f;
    });
    return h("details", { class: "tt-admin-econ", open: g === "game" }, [
      h("summary", {}, [`${ECON_GROUP[g]} · ${fields.length} số`]),
      h("div", { class: "tt-admin-form" }, fields),
    ]);
  });
  const save = button("Lưu và áp dụng", {
    variant: "primary",
    icon: "xac-nhan",
    onClick: () => {
      const next = JSON.parse(JSON.stringify(ECON));
      for (const [path, el] of inputs) setPath(next, path, Number(el.value));
      try {
        setEcon(next);
        done("Đã lưu cấu hình kinh tế trên trình duyệt này");
      } catch (e) {
        done((e as Error).message.split("\n").slice(0, 2).join(" "));
      }
    },
  });
  const reset = button("Khôi phục theo economy.yaml", {
    icon: "lam-moi",
    onClick: () => (resetEcon(), done("Đã khôi phục cấu hình gốc")),
  });
  const dl = button("Tải YAML", {
    icon: "tiep",
    onClick: () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([stringify(econForYaml())], { type: "text/yaml" }));
      a.download = "economy.yaml";
      a.click();
      URL.revokeObjectURL(a.href);
    },
  });
  const owned = Object.keys(Server.P.owned).filter((id) => CHARS.some((c) => c.id === id));
  return [
    card("Cấu hình kinh tế (content/economy.yaml)", [
      h("p", { class: "tt-admin-note" }, [
        econEdited() ? tag("Đang dùng bản chỉnh trên trình duyệt", "warn") : tag("Đang dùng file gốc", "ok"),
        " Bản chỉnh lưu trong trình duyệt này và áp dụng ngay cho game. Muốn đổi cho mọi người: tải YAML, chép số vào content/economy.yaml rồi chạy lại pnpm economy:sim. Không có thanh toán thật.",
      ]),
      ...groups,
      h("div", { class: "tt-row" }, [save, reset, dl]),
    ]),
    card("Chiến Lực nhân vật đang có", [
      table(
        ["Nhân vật", "Cấp", "Nét Sao", "Chiến Lực"],
        owned
          .map((id) => ({ c: CHARS.find((x) => x.id === id)!, o: Server.P.owned[id]!, p: powerOf(id) }))
          .sort((a, b) => b.p - a.p)
          .map(({ c, o, p }) => [c.name, String(o.lv), `N${o.cons}`, fmt(p)]),
        [1, 3],
      ),
    ]),
    card("Giá trị gói nạp đề xuất (Đá Sao mỗi 1.000 đ)", [
      table(
        ["Gói", "Giá (đ)", "Đá Sao", "Mỗi 1.000 đ", "Lần đầu nhân đôi"],
        packValue(ECON).map((r) => [
          r.id,
          fmt(r.gia),
          fmt(r.daSao),
          r.moi1000.toFixed(2),
          r.lanDau === null ? "—" : r.lanDau.toFixed(2),
        ]),
        [1, 2, 3, 4],
      ),
    ]),
  ];
}

function quits() {
  const q = Server.P.quits;
  const by = new Map<string, number>();
  for (const x of q) by.set(`${x.mode} · ${x.at}`, (by.get(`${x.mode} · ${x.at}`) ?? 0) + 1);
  return [
    card("Điểm bỏ cuộc nhiều nhất", [
      table(
        ["Chế độ · vị trí", "Số lần"],
        [...by].sort((a, b) => b[1] - a[1]).map(([k, n]) => [k, fmt(n)]),
        [1],
      ),
      h("p", { class: "tt-admin-note" }, [
        "Ghi khi người chơi rời Tháp hoặc trận Boss giữa chừng. S13 sẽ dùng số liệu này để chỉnh độ khó.",
      ]),
    ]),
    card("Gần đây", [
      table(
        ["Thời gian", "Chế độ", "Vị trí"],
        q.slice(0, 30).map((x) => [time(x.t), x.mode, x.at]),
      ),
    ]),
  ];
}

let errOnly = false;
function logs() {
  const list = Server.log.filter((l) => !errOnly || !l.ok);
  return [
    card("Nhật ký request", [
      h("div", { class: "tt-admin-row" }, [
        toggle("Chỉ hiện lỗi", errOnly, {
          onChange: (on) => {
            errOnly = on;
            render();
          },
        }),
        button("Tải lại", { icon: "lam-moi", onClick: () => (Server.reload(), render()) }),
      ]),
      table(
        ["Thời gian", "Lệnh", "Dữ liệu", "Kết quả"],
        list.map((l) => [
          time(l.t),
          h("code", {}, [l.a]),
          h("code", { class: "tt-admin-payload" }, [JSON.stringify(l.p ?? {}).slice(0, 120)]),
          tag(l.msg, l.ok ? "ok" : "bad"),
        ]),
      ),
    ]),
  ];
}

const RENDER: Record<SecId, () => Kid[]> = {
  "tong-quan": overview,
  "uoc-nguyen": wish,
  "cap-phat": grants,
  gm,
  "uy-thac": daily,
  "kinh-te": econ,
  "bo-cuoc": quits,
  "nhat-ky": logs,
};

function done(msg: string) {
  const t = document.getElementById("toast")!;
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(Number(t.dataset.t));
  t.dataset.t = String(setTimeout(() => (t.hidden = true), 2400));
  render();
}

function render() {
  if (!hasSession()) return renderLogin();
  const cur = sectionFromHash();
  const sec = SECTIONS.find((s) => s.id === cur)!;
  const focusId = (document.activeElement as HTMLElement | null)?.dataset?.sec;
  const nav = h(
    "nav",
    { class: "tt-admin-nav", "aria-label": "Các mục" },
    SECTIONS.map((s) => {
      const a = h(
        "a",
        {
          href: "#" + s.id,
          class: "tt-admin-link",
          "data-sec": s.id,
          "aria-current": s.id === cur ? "page" : undefined,
        },
        [icon(s.icon, { size: 20 }), h("span", {}, [s.name])],
      );
      return a;
    }),
  );
  const main = h("main", { class: "tt-admin-main", id: "admMain", tabindex: "-1" }, [
    h("header", { class: "tt-admin-head" }, [h("h1", { class: "tt-h2" }, [sec.name])]),
    ...RENDER[cur](),
  ]);
  app.replaceChildren(
    h("div", { class: "tt-admin" }, [
      h("aside", { class: "tt-admin-side" }, [
        h("div", { class: "tt-admin-brand" }, [
          h("b", {}, ["Tinh Tú Ước Nguyện"]),
          h("small", {}, ["Admin · bản thử nghiệm"]),
        ]),
        nav,
        h("p", { class: "tt-admin-note" }, [
          "Chặn tạm bằng mật khẩu trên trình duyệt. Có server thật thì xác thực chuyển lên server.",
        ]),
        button("Đăng xuất", {
          variant: "ghost",
          icon: "dong",
          onClick: () => {
            endSession();
            render();
          },
        }),
      ]),
      main,
    ]),
  );
  if (focusId) (app.querySelector(`[data-sec="${focusId}"]`) as HTMLElement | null)?.focus();
}

Server.load();
addEventListener("hashchange", () => {
  render();
  document.getElementById("admMain")?.focus();
});
// Game ở tab khác vừa ghi hồ sơ hoặc nhật ký: đọc lại.
addEventListener("storage", (e) => {
  if (e.key !== SAVE_KEY && e.key !== LOG_KEY) return;
  Server.reload();
  if (hasSession()) render();
});
render();
