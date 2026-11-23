import { sfx } from "../../../core/audio";
import { fmt } from "../../../core/util";
import { ITEMS } from "../../../data/menu-content";
import { ECON } from "../../../data/economy";
import { Server, achState, linhLucNow, shopLeft, vk, wDef } from "../../../server/server";
import { button, h, progress, toast } from "../../ds";
import { icon } from "../../icons/icons";
import { refreshWallets, registerScreen, rerender } from "../shell";

/* Bí Cảnh Binh Khí, cửa hàng quặng tuần và thành tựu Binh Khí (nguồn nguyên liệu vũ khí).
   Tạm là hoạt động độc lập: khi hệ bí cảnh S23 vào game thì gộp lượt quét này thành một bí cảnh đánh thật. */
const itemName = (id: string) => ITEMS.find((i) => i.id === id)?.name ?? id;
const bagOf = (id: string) => Server.P.bag[id] ?? 0;
const list = (o: Record<string, number>) =>
  Object.entries(o)
    .map(([id, n]) => `${n} ${itemName(id)}`)
    .join(", ");

registerScreen("bicanh", {
  title: "Bí Cảnh Binh Khí",
  icon: "ruong",
  render(host) {
    const P = Server.P,
      N = vk().nguon,
      L = ECON.thietKe.linhLuc,
      ll = Math.floor(linhLucNow(P));
    host.classList.add("tt-menu-daily", "tt-menu-bicanh");
    const run = button(`Quét bí cảnh · ${N.biCanh.linhLuc} Linh Lực`, {
      variant: "primary",
      icon: "choi",
      disabled: ll < N.biCanh.linhLuc,
      onClick: () => {
        const r = Server.req("biCanh");
        if (!r.ok) return;
        sfx("slam");
        toast(`+${list(N.biCanh.roi)}, +${fmt(N.biCanh.xu)} Xu`, "ok");
        refreshWallets();
        rerender();
      },
    });
    run.id = "biCanhRun";
    host.append(
      h("p", { class: "tt-dim" }, [
        `Mỗi lượt rơi ${list(N.biCanh.roi)} và ${fmt(N.biCanh.xu)} Xu. Linh Lực hồi ${L.hoiMoiNgay} mỗi ngày, tối đa ${L.toiDa}. Quét nhanh, lặp lại mỗi ngày; bí cảnh trên đảo chỉ khám phá một lần.`,
      ]),
      h("div", { class: "tt-row" }, [progress(ll / L.toiDa, { label: "Linh Lực", text: `${ll}/${L.toiDa}` }), run]),
    );

    const shop = h("ul", { class: "tt-tasks", id: "oreShop" });
    const wName = (id: string) => wDef(id)?.ten ?? id;
    for (const it of N.cuaHang) {
      const left = shopLeft(P, it.id);
      const b = button(`Đổi · ${fmt(it.xu)} Xu`, {
        variant: left > 0 && P.coin >= it.xu ? "primary" : "ghost",
        icon: "xu",
        disabled: left <= 0 || P.coin < it.xu,
        onClick: () => {
          if (!Server.req("buyOre", { id: it.id }).ok) return;
          sfx("ui");
          refreshWallets();
          rerender();
        },
      });
      b.dataset.id = it.id;
      shop.append(
        h("li", { class: "tt-task" + (left <= 0 ? " is-done" : "") }, [
          icon("cua-hang", { size: 24 }),
          h("div", { class: "tt" }, [
            h("b", {}, [itemName(it.id)]),
            h("small", { class: "tt-dim" }, [`Còn ${left}/${it.moiTuan} lượt tuần này · Đang có ${bagOf(it.id)}`]),
          ]),
          b,
        ]),
      );
    }

    for (const it of N.cuaHangVuKhi) {
      const left = shopLeft(P, it.id);
      const b = button(`Đổi · ${fmt(it.xu)} Xu`, {
        variant: left > 0 && P.coin >= it.xu ? "primary" : "ghost",
        icon: "xu",
        disabled: left <= 0 || P.coin < it.xu,
        onClick: () => {
          if (!Server.req("buyWeaponShop", { id: it.id }).ok) return;
          sfx("ui");
          refreshWallets();
          rerender();
        },
      });
      b.dataset.id = it.id;
      shop.append(
        h("li", { class: "tt-task" + (left <= 0 ? " is-done" : "") }, [
          icon("danh", { size: 24 }),
          h("div", { class: "tt" }, [
            h("b", {}, [wName(it.id)]),
            h("small", { class: "tt-dim" }, [`Vũ khí 4★ · Còn ${left}/${it.moiTuan} lượt tuần này`]),
          ]),
          b,
        ]),
      );
    }

    const ach = h("ul", { class: "tt-tasks", id: "weaponAch" });
    const phoi = itemName(vk().loRen.nguyenLieu);
    for (const a of N.phoi.thanhTuu) {
      const s = achState(P, a);
      const b = button(s.claimed ? "Đã nhận" : s.done ? "Nhận" : "Chưa xong", {
        variant: s.done && !s.claimed ? "primary" : "ghost",
        icon: s.claimed ? "xac-nhan" : "ruong",
        disabled: !s.done || s.claimed,
        onClick: () => {
          if (!Server.req("claimWAch", { id: a.id }).ok) return;
          toast(`+${a.phoi} ${phoi}`, "ok");
          rerender();
        },
      });
      b.dataset.id = a.id;
      const have = Math.min(s.have, a.can);
      ach.append(
        h("li", { class: "tt-task" + (s.claimed ? " is-done" : "") }, [
          icon("long-sao", { size: 24 }),
          h("div", { class: "tt" }, [
            h("b", {}, [`${a.ten} · ${a.phoi} ${phoi}`]),
            progress(have / a.can, { label: `${have}/${a.can}`, text: `${have}/${a.can}` }),
          ]),
          b,
        ]),
      );
    }
    host.append(
      h("h3", { class: "tt-h3" }, ["Cửa hàng quặng (làm mới thứ Hai)"]),
      shop,
      h("h3", { class: "tt-h3" }, ["Thành tựu Binh Khí"]),
      ach,
      h("p", { class: "tt-dim" }, [`${phoi} còn đổi ở cửa hàng sự kiện khi hệ sự kiện mở.`]),
    );
  },
});
