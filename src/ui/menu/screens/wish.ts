import { portrait } from "../../../art/chibi";
import { fmt } from "../../../core/util";
import { EL, byId } from "../../../data/content";
import { Server, vk, wDef, weaponList } from "../../../server/server";
import { sfx } from "../../../core/audio";
import { weaponImg } from "../../weapon-art";
import { TYPE_NAME, pct } from "../weapon-ui";
import { button, elementBadge, h, stars, tabs } from "../../ds";
import { icon } from "../../icons/icons";
import { playWish } from "../../wish/player";
import { filterHistory } from "../logic";
import { refreshWallets, registerScreen, rerender } from "../shell";

/* Màn Ước nguyện (S10): banner, tỉ lệ, lịch sử có lọc, nút ước 1 và 10 lần.
   S24 thêm banner vũ khí Binh Khí Tinh Tú (La Bàn Sao, Bảo Hộ Vận Sao và lịch sử riêng).
   Kết quả luôn lấy từ Server.req("pull" | "wPull"); cảnh phát qua WishPlayer (video S20 hoặc bản code 5 cảnh). */
let tab = "banner";
let hf = 0;
let kind: "char" | "weapon" = "char";

function pull(n: number) {
  const r = Server.req(kind === "weapon" ? "wPull" : "pull", { count: n });
  if (!r.ok) return;
  refreshWallets();
  playWish(r.data, () => {
    rerender();
    document.getElementById(n === 1 ? "wish1" : "wish10")?.focus();
  });
}

function render(host: HTMLElement, params: any = {}) {
  if (params.kind) {
    kind = params.kind === "weapon" ? "weapon" : "char";
    params.kind = null;
  }
  const P = Server.P,
    cfg = kind === "weapon" ? P.wcfg : P.cfg,
    f = byId[P.cfg.featured] ?? Object.values(byId)[0]!;
  host.classList.add("tt-menu-wish");
  const pick = h("div", { class: "tt-banner-pick", role: "group", "aria-label": "Chọn banner" });
  for (const [k, l] of [
    ["char", "Tinh Tú Giáng Thế"],
    ["weapon", "Binh Khí Tinh Tú"],
  ] as const) {
    const b = button(l, { variant: kind === k ? "primary" : "ghost", icon: k === "char" ? "nhan-vat" : "danh" });
    b.dataset.banner = k;
    b.setAttribute("aria-pressed", String(kind === k));
    b.addEventListener("click", () => {
      if (kind === k) return;
      kind = k;
      sfx("react");
      rerender();
    });
    pick.append(b);
  }
  const tl = tabs(
    [
      { id: "banner", label: "Banner", icon: "uoc-nguyen" },
      { id: "rates", label: "Tỉ lệ", icon: "thong-tin" },
      { id: "hist", label: "Lịch sử", icon: "lich-su" },
    ],
    tab,
    (id) => {
      if (id === tab) return;
      tab = id;
      rerender();
    },
  );
  const panel = h("div", { class: "tt-tabpanel", role: "tabpanel" });
  if (kind === "weapon") weaponPanel(panel);
  else if (tab === "banner") {
    const art = document.createElement("canvas");
    art.width = 520;
    art.height = 520;
    art.getContext("2d")!.drawImage(portrait(f.id, 520, 520, "splash"), 0, 0);
    panel.append(
      h("div", { class: "tt-banner-card", "data-el": f.el }, [
        h("div", { class: "txt" }, [
          h("p", { class: "tt-eyebrow" }, ["Ước nguyện có hạn · Nhân vật nổi bật"]),
          h("h3", { class: "tt-h1" }, [f.name]),
          h("p", { class: "tt-dim" }, [f.title]),
          h("div", { class: "meta" }, [stars(f.r as 5, 16), elementBadge(f.el, { label: true, name: EL[f.el]?.vi })]),
          h("p", {}, [f.desc]),
          h("p", { class: "pity", id: "wishPity" }, [
            `Bảo Hộ Vận Sao: ${P.pity5}/${cfg.hard} lần tới 5★ · ${P.pity4}/10 lần tới 4★`,
            P.guaranteed ? h("b", {}, [` · Lần 5★ tới chắc chắn là ${f.name}`]) : "",
          ]),
        ]),
        h("div", { class: "art" }, [art]),
      ]),
    );
  } else if (tab === "rates") {
    panel.append(
      h("dl", { class: "tt-stats" }, [
        h("dt", {}, ["5★"]),
        h("dd", {}, [`${cfg.rate5}% mỗi lần, tăng dần từ lần ${cfg.soft}, chắc chắn ở lần ${cfg.hard}`]),
        h("dt", {}, ["5★ nổi bật"]),
        h("dd", {}, [`50% là ${f.name}; nếu trượt, lần 5★ sau chắc chắn là ${f.name}`]),
        h("dt", {}, ["4★"]),
        h("dd", {}, [`${cfg.rate4}% mỗi lần, chắc chắn ít nhất 1 lần trong mỗi 10 lần`]),
        h("dt", {}, ["3★"]),
        h("dd", {}, ["Phần còn lại, mỗi vật phẩm 3★ đổi thành 500 Xu"]),
        h("dt", {}, ["Trùng nhân vật"]),
        h("dd", {}, ["+1 Nét Sao (tối đa N6, mỗi nét +10% máu và tấn công)"]),
      ]),
    );
  } else {
    const filt = h("div", { class: "tt-row", role: "group", "aria-label": "Lọc theo độ hiếm" });
    for (const [r, l] of [
      [0, "Tất cả"],
      [5, "5★"],
      [4, "4★"],
      [3, "3★"],
    ] as const) {
      const b = button(l, { variant: hf === r ? "primary" : "ghost" });
      b.setAttribute("aria-pressed", String(hf === r));
      b.addEventListener("click", () => ((hf = r), rerender()));
      filt.append(b);
    }
    const list = filterHistory(P.history, hf);
    const empty = P.history.length;
    const ul = h("ol", { class: "tt-hist", id: "wishHist" });
    for (const x of list.slice(0, 120))
      ul.append(
        h("li", { "data-r": x.r }, [
          h("span", { class: "r" }, ["★".repeat(x.r)]),
          h("span", { class: "n" }, [x.n]),
          h("time", {}, [
            new Date(x.t).toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
            }),
          ]),
        ]),
      );
    panel.append(
      filt,
      list.length
        ? ul
        : h("p", { class: "tt-dim" }, [empty ? "Không có lần ước nào khớp bộ lọc." : "Chưa có lần ước nào."]),
    );
  }
  const b1 = button(`Ước 1 lần · ${fmt(cfg.cost)} Đá Sao`, {
    icon: "da-sao",
    disabled: P.gems < cfg.cost,
    onClick: () => pull(1),
  });
  b1.id = "wish1";
  const b10 = button(`Ước 10 lần · ${fmt(cfg.cost * 10)} Đá Sao`, {
    variant: "primary",
    icon: "da-sao",
    disabled: P.gems < cfg.cost * 10,
    onClick: () => pull(10),
  });
  b10.id = "wish10";
  const buy = button("Mua Đá Sao · chưa mở", { variant: "ghost", icon: "cua-hang", disabled: true });
  buy.title = "Chưa có nạp thật";
  host.append(
    h("div", { class: "tt-wish-head" }, [pick, tl]),
    panel,
    h("div", { class: "tt-wish-actions" }, [
      h("p", { class: "tt-dim" }, [icon("da-sao", { size: 16 }), ` Đang có ${fmt(P.gems)} Đá Sao`]),
      buy,
      b1,
      b10,
    ]),
  );
}

function histFilter() {
  const filt = h("div", { class: "tt-row", role: "group", "aria-label": "Lọc theo độ hiếm" });
  for (const [r, l] of [
    [0, "Tất cả"],
    [5, "5★"],
    [4, "4★"],
    [3, "3★"],
  ] as const) {
    const b = button(l, { variant: hf === r ? "primary" : "ghost" });
    b.setAttribute("aria-pressed", String(hf === r));
    b.addEventListener("click", () => ((hf = r), rerender()));
    filt.append(b);
  }
  return filt;
}

/** Banner Binh Khí Tinh Tú: đôi vũ khí nổi bật, La Bàn Sao, tỉ lệ và lịch sử riêng. */
function weaponPanel(panel: HTMLElement) {
  const P = Server.P,
    c = P.wcfg,
    [a, b] = c.featured.map((id) => wDef(id)!);
  if (tab === "banner") {
    const cards = h("div", { class: "tt-wbanner-pair" });
    for (const w of [a!, b!]) {
      const on = P.wPick === w.id;
      const card = h(
        "button",
        {
          type: "button",
          class: "tt-wbanner-w" + (on ? " is-sel" : ""),
          "data-r": 5,
          "data-id": w.id,
          "aria-pressed": String(on),
          "aria-label": `La Bàn Sao: chọn ${w.ten}`,
        },
        [
          h("span", { class: "art" }, [weaponImg(w.id, 512, w.ten)]),
          h("b", {}, [w.ten]),
          h("small", { class: "tt-dim" }, [
            `${TYPE_NAME(w.loai)}${w.cua && byId[w.cua] ? ` · vũ khí của ${byId[w.cua]!.name}` : ""}`,
          ]),
          on
            ? h("small", { class: "pickd" }, ["Đã chọn bằng La Bàn Sao"])
            : h("small", { class: "tt-dim" }, ["Chạm để chọn"]),
        ],
      );
      card.addEventListener("click", () => {
        if (Server.req("wPick", { id: on ? null : w.id }).ok) {
          sfx("chest");
          rerender();
        }
      });
      cards.append(card);
    }
    panel.append(
      h("div", { class: "tt-banner-card tt-wbanner", "data-el": "earth" }, [
        h("div", { class: "txt" }, [
          h("p", { class: "tt-eyebrow" }, ["Ước nguyện có hạn · Binh Khí Tinh Tú"]),
          h("h3", { class: "tt-h1" }, ["Binh Khí Tinh Tú"]),
          h("p", {}, [
            `Hai binh khí 5★ nổi bật. Dùng La Bàn Sao chọn trước một món: mỗi lần 5★ ra không đúng món đã chọn tích 1 điểm, đủ ${vk().banner.laBanSao} điểm thì 5★ kế tiếp chắc chắn là món đã chọn.`,
          ]),
          h("p", { class: "pity", id: "wishPity" }, [
            `Bảo Hộ Vận Sao: ${P.wPity.pity5}/${c.hard} lần tới 5★ · ${P.wPity.pity4}/10 lần tới 4★`,
            ` · La Bàn Sao ${P.wPick ? P.wPity.laBan : 0}/${vk().banner.laBanSao}`,
            P.wPity.guaranteed ? h("b", {}, [" · Lần 5★ tới chắc chắn là vũ khí nổi bật"]) : "",
          ]),
        ]),
        cards,
      ]),
    );
  } else if (tab === "rates") {
    panel.append(
      h("dl", { class: "tt-stats" }, [
        h("dt", {}, ["5★"]),
        h("dd", {}, [`${c.rate5}% mỗi lần, tăng dần từ lần ${c.soft}, chắc chắn ở lần ${c.hard}`]),
        h("dt", {}, ["5★ nổi bật"]),
        h("dd", {}, [
          `${pct(0.75, 0)} là một trong hai: ${a!.ten}, ${b!.ten}; nếu trượt, lần 5★ sau chắc chắn nổi bật`,
        ]),
        h("dt", {}, ["La Bàn Sao"]),
        h("dd", {}, ["Chọn trước 1 trong 2 vũ khí; trượt 1 lần thì lần 5★ sau chắc chắn đúng món đã chọn"]),
        h("dt", {}, ["4★"]),
        h("dd", {}, [`${c.rate4}% mỗi lần, chắc chắn ít nhất 1 lần trong mỗi 10 lần`]),
        h("dt", {}, ["Vũ khí 4★"]),
        h("dd", {}, [
          weaponList()
            .filter((w) => w.r === 4 && w.nguon === "uocNguyen")
            .map((w) => w.ten)
            .join(", "),
        ]),
        h("dt", {}, ["3★"]),
        h("dd", {}, [
          weaponList()
            .filter((w) => w.r === 3)
            .map((w) => w.ten)
            .join(", "),
        ]),
        h("dt", {}, ["Riêng biệt"]),
        h("dd", {}, ["Bảo Hộ Vận Sao và lịch sử không dùng chung với banner nhân vật"]),
      ]),
    );
  } else {
    const list = filterHistory(P.wHistory, hf);
    const ul = h("ol", { class: "tt-hist", id: "wishHist" });
    for (const x of list.slice(0, 120))
      ul.append(
        h("li", { "data-r": x.r }, [
          h("span", { class: "r" }, ["★".repeat(x.r)]),
          h("span", { class: "n" }, [x.n]),
          h("time", {}, [
            new Date(x.t).toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
            }),
          ]),
        ]),
      );
    panel.append(
      histFilter(),
      list.length
        ? ul
        : h("p", { class: "tt-dim" }, [
            P.wHistory.length ? "Không có lần ước nào khớp bộ lọc." : "Chưa có lần ước vũ khí nào.",
          ]),
    );
  }
}

registerScreen("wish", {
  title: "Ước nguyện",
  icon: "uoc-nguyen",
  render,
  onKey(e) {
    if (e.key !== "q" && e.key !== "e") return false;
    const ids = ["banner", "rates", "hist"];
    tab = ids[(ids.indexOf(tab) + (e.key === "e" ? 1 : 2)) % 3]!;
    rerender();
    return true;
  },
});
