import { GS } from "../core/state";
import { $, esc } from "../core/util";
import { CHARS, EL } from "../data/content";
import { Server } from "../server/server";
import { updateWallets } from "../ui/screens";
import { toast } from "../ui/toast";

/* ---------- server ---------- */
export function renderServer() {
  const P = Server.P,
    c = P.cfg;
  $<HTMLInputElement>("cR5").value = String(c.rate5);
  $<HTMLInputElement>("cR4").value = String(c.rate4);
  $<HTMLInputElement>("cSoft").value = String(c.soft);
  $<HTMLInputElement>("cHard").value = String(c.hard);
  $<HTMLInputElement>("cCost").value = String(c.cost);
  if (!$<HTMLSelectElement>("cFeat").options.length) {
    CHARS.forEach((ch) => {
      if (ch.r === 5) $<HTMLSelectElement>("cFeat").add(new Option(ch.name, ch.id));
      $<HTMLSelectElement>("gChar").add(new Option(`${ch.name} (${ch.r}★ ${EL[ch.el].vi})`, ch.id));
    });
  }
  $<HTMLInputElement>("cFeat").value = String(c.featured);
  $<HTMLInputElement>("gGod").checked = P.gm.god;
  $<HTMLInputElement>("gOne").checked = P.gm.one;
  $<HTMLInputElement>("gNoCd").checked = P.gm.nocd;
  $("slog").innerHTML = Server.log.length
    ? Server.log
        .slice(0, 50)
        .map(
          (l) =>
            `<div><span>${l.ok ? "→" : "✕"} ${esc(l.a)} ${esc(JSON.stringify(l.p)).slice(0, 80)}</span><span class="${l.ok ? "" : "r5t"}">${esc(l.msg)}</span></div>`,
        )
        .join("")
    : `<span class="muted">Chưa có request nào.</span>`;
}
export const give = (k: string) => () => {
  if (Server.req("give", { kind: k, amount: $<HTMLInputElement>("gAmt").value }).ok) {
    toast("Đã cấp");
    updateWallets();
    renderServer();
  }
};

export function init(): void {
  $("saveCfg").onclick = () => {
    if (
      Server.req("setConfig", {
        rate5: $<HTMLInputElement>("cR5").value,
        rate4: $<HTMLInputElement>("cR4").value,
        soft: $<HTMLInputElement>("cSoft").value,
        hard: $<HTMLInputElement>("cHard").value,
        cost: $<HTMLInputElement>("cCost").value,
        featured: $<HTMLInputElement>("cFeat").value,
      }).ok
    )
      toast("Đã lưu cấu hình");
    renderServer();
  };
  $("gGem").onclick = give("gem");
  $("gCoin").onclick = give("coin");
  $("gBook").onclick = give("book");
  $("gGive").onclick = () => {
    const r = Server.req("giveChar", { id: $<HTMLInputElement>("gChar").value });
    if (r.ok) {
      toast(r.data.dup ? `Tăng Nét Sao: N${r.data.cons}` : "Đã cấp nhân vật mới");
      renderServer();
    }
  };
  $("gMax").onclick = () => {
    if (Server.req("maxLv", { id: $<HTMLInputElement>("gChar").value }).ok) {
      toast("Đã nâng lên Lv 60");
      renderServer();
    }
  };
  for (const [id, k] of [
    ["gGod", "god"],
    ["gOne", "one"],
    ["gNoCd", "nocd"],
  ])
    $(id).onchange = (e: any) => {
      Server.req("setGm", { [k]: e.target.checked });
      renderServer();
    };
  $("gDaily").onclick = () => {
    Server.req("resetDaily");
    toast("Đã làm mới ủy thác");
    renderServer();
  };
  $("gWipe").onclick = () => {
    if (Date.now() - GS.wipeArm > 4000) {
      GS.wipeArm = Date.now();
      $("gWipe").textContent = "Bấm lần nữa để xác nhận xóa";
      setTimeout(() => ($("gWipe").textContent = "Xóa dữ liệu, chơi lại từ đầu"), 4000);
      return;
    }
    Server.req("wipe");
    GS.wipeArm = 0;
    $("gWipe").textContent = "Xóa dữ liệu, chơi lại từ đầu";
    toast("Đã xóa dữ liệu");
    renderServer();
    updateWallets();
  };
}
