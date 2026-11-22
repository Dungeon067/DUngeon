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
  $("cR5").value = c.rate5;
  $("cR4").value = c.rate4;
  $("cSoft").value = c.soft;
  $("cHard").value = c.hard;
  $("cCost").value = c.cost;
  if (!$("cFeat").options.length) {
    CHARS.forEach((ch) => {
      if (ch.r === 5) $("cFeat").add(new Option(ch.name, ch.id));
      $("gChar").add(new Option(`${ch.name} (${ch.r}★ ${EL[ch.el].vi})`, ch.id));
    });
  }
  $("cFeat").value = c.featured;
  $("gGod").checked = P.gm.god;
  $("gOne").checked = P.gm.one;
  $("gNoCd").checked = P.gm.nocd;
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
export const give = (k) => () => {
  if (Server.req("give", { kind: k, amount: $("gAmt").value }).ok) {
    toast("Đã cấp");
    updateWallets();
    renderServer();
  }
};

export function init(): void {
  $("saveCfg").onclick = () => {
    if (
      Server.req("setConfig", {
        rate5: $("cR5").value,
        rate4: $("cR4").value,
        soft: $("cSoft").value,
        hard: $("cHard").value,
        cost: $("cCost").value,
        featured: $("cFeat").value,
      }).ok
    )
      toast("Đã lưu cấu hình");
    renderServer();
  };
  $("gGem").onclick = give("gem");
  $("gCoin").onclick = give("coin");
  $("gBook").onclick = give("book");
  $("gGive").onclick = () => {
    const r = Server.req("giveChar", { id: $("gChar").value });
    if (r.ok) {
      toast(r.data.dup ? `Tăng cung mệnh: C${r.data.cons}` : "Đã cấp nhân vật mới");
      renderServer();
    }
  };
  $("gMax").onclick = () => {
    if (Server.req("maxLv", { id: $("gChar").value }).ok) {
      toast("Đã nâng lên Lv 60");
      renderServer();
    }
  };
  for (const [id, k] of [
    ["gGod", "god"],
    ["gOne", "one"],
    ["gNoCd", "nocd"],
  ])
    $(id).onchange = (e) => {
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
