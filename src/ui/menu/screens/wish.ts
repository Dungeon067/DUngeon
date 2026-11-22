import { portrait } from "../../../art/chibi";
import { fmt } from "../../../core/util";
import { EL, byId } from "../../../data/content";
import { Server } from "../../../server/server";
import { button, elementBadge, h, stars, tabs } from "../../ds";
import { icon } from "../../icons/icons";
import { playWish } from "../../wish/player";
import { filterHistory } from "../logic";
import { refreshWallets, registerScreen, rerender } from "../shell";

/* Màn Ước nguyện (S10): banner, tỉ lệ, lịch sử có lọc, nút ước 1 và 10 lần.
   Kết quả luôn lấy từ Server.req("pull"); cảnh phát qua WishPlayer (video S20 hoặc bản code 5 cảnh). */
let tab = "banner";
let hf = 0;

function pull(n: number) {
  const r = Server.req("pull", { count: n });
  if (!r.ok) return;
  refreshWallets();
  playWish(r.data, () => {
    rerender();
    document.getElementById(n === 1 ? "wish1" : "wish10")?.focus();
  });
}

function render(host: HTMLElement) {
  const P = Server.P,
    cfg = P.cfg,
    f = byId[cfg.featured] ?? Object.values(byId)[0]!;
  host.classList.add("tt-menu-wish");
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
  if (tab === "banner") {
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
    const ul = h("ol", { class: "tt-hist", id: "wishHist" });
    for (const x of list.slice(0, 120))
      ul.append(
        h("li", { "data-r": x.r }, [
          h("span", { class: "r" }, ["★".repeat(x.r)]),
          h("span", { class: "n" }, [x.n]),
          h("time", {}, [
            new Date(x.t).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }),
          ]),
        ]),
      );
    panel.append(
      filt,
      list.length ? ul : h("p", { class: "tt-dim" }, [P.history.length ? "Không có lần ước nào khớp bộ lọc." : "Chưa có lần ước nào."]),
    );
  }
  const b1 = button(`Ước 1 lần · ${fmt(cfg.cost)} Đá Sao`, { icon: "da-sao", disabled: P.gems < cfg.cost, onClick: () => pull(1) });
  b1.id = "wish1";
  const b10 = button(`Ước 10 lần · ${fmt(cfg.cost * 10)} Đá Sao`, {
    variant: "primary",
    icon: "da-sao",
    disabled: P.gems < cfg.cost * 10,
    onClick: () => pull(10),
  });
  b10.id = "wish10";
  host.append(
    tl,
    panel,
    h("div", { class: "tt-wish-actions" }, [
      h("p", { class: "tt-dim" }, [icon("da-sao", { size: 16 }), ` Đang có ${fmt(P.gems)} Đá Sao`]),
      b1,
      b10,
    ]),
  );
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
