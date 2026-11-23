import { fmt } from "../../../core/util";
import { ECON } from "../../../data/economy";
import { ITEMS } from "../../../data/menu-content";
import { startBoss } from "../../../modes/boss";
import { startTower } from "../../../modes/tower";
import { Server, vk } from "../../../server/server";
import { drawBossWith } from "../../boss";
import { button, h, progress, tag, toast } from "../../ds";
import { icon } from "../../icons/icons";
import { leaveWorld } from "../../screens";
import { closeMenu, refreshWallets, registerScreen, rerender } from "../shell";

/* Ủy thác, Tháp Tinh Tú, Hắc Giao và Hướng dẫn (S10), vẽ lại bằng thành phần S08. */
function leaveWorldThen(start: () => void) {
  leaveWorld();
  closeMenu();
  start();
}

registerScreen("daily", {
  title: "Ủy thác",
  icon: "uy-thac",
  render(host) {
    Server.ensureDaily();
    const d = Server.P.daily!;
    host.classList.add("tt-menu-daily");
    const UT = ECON.game.thuong.uyThac.moiViec;
    const ul = h("ul", { class: "tt-tasks", id: "dailyTasks" });
    d.tasks.forEach((t: any, i: number) => {
      const done = t.prog >= t.goal;
      const b = button(t.claimed ? "Đã nhận" : done ? "Nhận thưởng" : "Chưa xong", {
        variant: done && !t.claimed ? "primary" : "ghost",
        icon: t.claimed ? "xac-nhan" : "ruong",
        disabled: !done || t.claimed,
        onClick: () => {
          if (Server.req("claimTask", { i }).ok) {
            toast(`+${UT.daSao} Đá Sao, +${fmt(UT.xu)} Xu`, "ok");
            refreshWallets();
            rerender();
          }
        },
      });
      ul.append(
        h("li", { class: "tt-task" + (t.claimed ? " is-done" : "") }, [
          icon("uy-thac", { size: 24 }),
          h("div", { class: "tt" }, [
            h("b", {}, [t.t]),
            progress(t.prog / t.goal, { label: `${t.prog}/${t.goal}`, text: `${t.prog}/${t.goal}` }),
          ]),
          b,
        ]),
      );
    });
    const all = d.tasks.every((t: any) => t.claimed);
    const ores = Object.entries(vk().nguon.uyThac)
      .map(([id, n]) => `${n} ${ITEMS.find((i) => i.id === id)?.name ?? id}`)
      .join(", ");
    ul.append(
      h("li", { class: "tt-task is-bonus" }, [
        icon("sao", { size: 24 }),
        h("div", { class: "tt" }, [
          h("b", {}, ["Thưởng hoàn thành ngày"]),
          h("small", { class: "tt-dim" }, [`60 Đá Sao, 5 Sách Kinh Nghiệm${ores ? ", " + ores : ""}`]),
        ]),
        button(d.bonus ? "Đã nhận" : "Nhận", {
          variant: all && !d.bonus ? "primary" : "ghost",
          disabled: !all || d.bonus,
          onClick: () => {
            if (Server.req("claimBonus").ok) {
              toast("+60 Đá Sao, +5 Sách KN", "ok");
              refreshWallets();
              rerender();
            }
          },
        }),
      ]),
    );
    host.append(
      h("p", { class: "tt-dim" }, [
        `Ngày ${new Date().toLocaleDateString("vi-VN")} · Mỗi Ủy thác: ${UT.daSao} Đá Sao và ${fmt(UT.xu)} Xu · Làm mới lúc 0 giờ`,
      ]),
      ul,
    );
  },
});

registerScreen("tower", {
  title: "Tháp Tinh Tú",
  icon: "thap",
  render(host) {
    const P = Server.P;
    host.classList.add("tt-menu-tower");
    const grid = h("div", { class: "tt-floors", id: "towerFloors" });
    for (let f = 1; f <= 12; f++) {
      const st = P.tower[f] || 0,
        open = f === 1 || (P.tower[f - 1] || 0) > 0;
      const b = h(
        "button",
        { type: "button", class: "tt-floor" + (st ? " is-done" : ""), disabled: !open, "data-floor": f },
        [
          h("b", {}, [`Tầng ${f}`]),
          h(
            "span",
            { class: "st", "aria-label": `${st}/3 sao` },
            [1, 2, 3].map((i) => h("i", { class: i <= st ? "on" : "" }, ["★"])),
          ),
          h("small", {}, [`Quái cấp ${1 + Math.round(f * 0.75)}${f >= 4 ? " · có Hộ Vệ Đá" : ""}`]),
          open ? "" : icon("khoa", { size: 16 }),
        ],
      );
      b.addEventListener("click", () => leaveWorldThen(() => startTower(f)));
      grid.append(b);
    }
    host.append(
      h("p", { class: "tt-dim" }, ["Hạ hết các đợt quái trước khi hết giờ. Còn càng nhiều thời gian, càng nhiều sao."]),
      grid,
    );
  },
});

registerScreen("boss", {
  title: "Hắc Giao",
  icon: "canh-bao",
  render(host) {
    host.classList.add("tt-menu-boss");
    const art = h("canvas", {
      width: 520,
      height: 360,
      class: "tt-boss-art",
      "aria-hidden": "true",
    }) as HTMLCanvasElement;
    const c = art.getContext("2d")!;
    const g = c.createLinearGradient(0, 0, 0, 360);
    g.addColorStop(0, "#0b1a33");
    g.addColorStop(1, "#163a5c");
    c.fillStyle = g;
    c.fillRect(0, 0, 520, 360);
    const fake = { segs: [] as { x: number; y: number }[], ang: -0.4, phase: 1, flash: 0 };
    for (let i = 0; i < 14; i++) fake.segs.push({ x: 300 - i * 22, y: 230 + Math.sin(i * 0.45) * 40 });
    c.save();
    c.translate(-30, 0);
    drawBossWith(c, fake, 1.2);
    c.restore();
    const list = h("div", { class: "tt-floors", id: "bossLevels" });
    for (let lv = 1; lv <= 5; lv++) {
      const done = Server.P.boss[lv],
        open = lv === 1 || Server.P.boss[lv - 1];
      const b = h(
        "button",
        { type: "button", class: "tt-floor" + (done ? " is-done" : ""), disabled: !open, "data-lv": lv },
        [
          h("b", {}, [`Cấp độ ${lv}`]),
          h("small", {}, [`Máu ${fmt(14000 * (1 + 0.9 * (lv - 1)))}`]),
          done ? tag("Đã hạ", "ok") : h("small", {}, [`Lần đầu: +${100 + lv * 40} Đá Sao`]),
          open ? "" : icon("khoa", { size: 16 }),
        ],
      );
      b.addEventListener("click", () => leaveWorldThen(() => startBoss(lv)));
      list.append(b);
    }
    host.append(
      h("div", { class: "tt-boss" }, [
        art,
        h("div", {}, [
          h("p", { class: "tt-dim" }, [
            "Ác long ngủ dưới đáy hang phía bắc. Giai đoạn 2 nó lao tới tạo sóng xung kích: nhảy để né.",
          ]),
          list,
        ]),
      ]),
    );
  },
});

registerScreen("help", {
  title: "Hướng dẫn",
  icon: "huong-dan",
  render(host) {
    const tpl = document.getElementById("tplHelp") as HTMLTemplateElement | null;
    host.classList.add("tt-menu-help");
    if (!tpl) throw new Error("Không tìm thấy nội dung hướng dẫn");
    host.append(tpl.content.cloneNode(true));
  },
});
