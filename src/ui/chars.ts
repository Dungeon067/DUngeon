import { GS } from "../core/state";
import { portrait } from "../art/chibi";
import { $, esc, fmt } from "../core/util";
import { BURSTDESC, CHARS, EL, SKILLDESC, WEAP, byId } from "../data/content";
import { Server, lvCost, statsOf } from "../server/server";
import { headCanvas, updateWallets } from "../ui/screens";
import { toast } from "../ui/toast";

/* ---------- characters ---------- */

export function renderChars() {
  const P = Server.P;
  if (!GS.selChar || !byId[GS.selChar]) GS.selChar = P.party[0];
  GS.draftParty = [...P.party];
  renderTeamSlots();
  const L = $("clist");
  L.innerHTML = "";
  [...CHARS]
    .sort((a, b) => +!!P.owned[b.id] - +!!P.owned[a.id] || b.r - a.r)
    .forEach((c) => {
      const own = P.owned[c.id];
      const b = document.createElement("button");
      b.className = `ccard r${c.r}${own ? "" : " lock"}${c.id === GS.selChar ? " sel" : ""}`;
      const cvp = document.createElement("canvas");
      cvp.width = 150;
      cvp.height = 150;
      cvp.getContext("2d")!.drawImage(portrait(c.id, 150, 200, "card"), 0, -20);
      b.appendChild(cvp);
      b.insertAdjacentHTML(
        "beforeend",
        `<div>${esc(c.name)}</div><div class="muted" style="font-size:10px">${own ? `Lv${own.lv} · C${own.cons}` : "Chưa có"}</div>${P.party.includes(c.id) ? `<span class="inp">Đội</span>` : ""}`,
      );
      b.addEventListener("click", () => {
        GS.selChar = c.id;
        renderChars();
      });
      L.appendChild(b);
    });
  renderDetail();
}
export function renderTeamSlots() {
  const box = $("teamSlots");
  box.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const id = Server.P.party[i];
    const s = document.createElement("button");
    s.className = "tslot" + (id ? " f" : "");
    if (id) {
      s.appendChild(headCanvas(id, 88));
      s.insertAdjacentHTML("beforeend", `<span>${esc(byId[id].name)}</span>`);
      s.title = "Bấm để bỏ khỏi đội";
      s.addEventListener("click", () => {
        const np = Server.P.party.filter((x: any) => x !== id);
        if (!np.length) return toast("Đội cần ít nhất 1 người");
        Server.req("setParty", { party: np });
        renderChars();
      });
    } else s.innerHTML = `<span class="muted">Trống</span>`;
    box.appendChild(s);
  }
}
export function renderDetail() {
  const c = byId[GS.selChar!],
    P = Server.P,
    own = P.owned[c.id],
    st = statsOf(c.id),
    box: any = $("cdetail");
  const inParty = P.party.includes(c.id);
  const cost: any = own ? lvCost(own.lv) : null;
  box.innerHTML = `<div class="detail"><div><canvas class="big" width="480" height="640"></canvas></div><div style="display:flex;flex-direction:column;gap:12px;min-width:0">
    <div><div class="eyebrow">${"★".repeat(c.r)} · ${EL[c.el].vi} · ${WEAP[c.w].vi}</div><h2 class="title" style="font-size:36px;margin-top:4px">${esc(c.name)}</h2><div class="muted">${esc(c.title)}</div></div>
    <p class="muted" style="margin:0">${esc(c.desc)}</p>
    ${
      own
        ? `<div class="stats"><div><span>Cấp</span>${st.lv}/60</div><div><span>Cung mệnh</span>C${st.cons}</div><div><span>Máu</span>${fmt(st.hp)}</div><div><span>Tấn công</span>${fmt(st.atk)}</div><div><span>Tỉ lệ chí mạng</span>${Math.round(st.crit * 100)}%</div><div><span>Sát thương chí mạng</span>${Math.round(st.cdmg * 100)}%</div></div>
      <div class="cons">${[1, 2, 3, 4, 5, 6].map((i) => `<i class="${i <= st.cons ? "on" : ""}" title="Cung mệnh ${i}"></i>`).join("")}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">${st.lv < 60 ? `<button class="btn gold sm" id="lv1">Lên 1 cấp · ${cost.books} Sách, ${fmt(cost.coin)} Xu</button><button class="btn sm" id="lv10">Lên 10 cấp</button>` : `<span class="muted">Đã đạt cấp tối đa</span>`}
      ${inParty ? `<span class="muted">Đang trong đội</span>` : `<button class="btn sm" id="toParty">Vào đội</button>`}</div>`
        : `<p class="muted" style="margin:0">Chưa sở hữu. Ước nguyện để nhận nhân vật này${c.r === 5 && P.cfg.featured !== c.id ? " (hoặc đặt làm banner trong tab Server)" : ""}.</p>`
    }
    <div class="kit">
      <div><div class="kl">Đánh thường · ${WEAP[c.w].vi}</div><p>Combo 3 đòn. ${c.w === "cat" ? "Mọi đòn mang nguyên tố " + EL[c.el].vi + "." : "Đòn thứ 3 mang nguyên tố " + EL[c.el].vi + "."} ${c.w === "bow" ? "Bắn tên tầm xa." : c.w === "cat" ? "Bắn cầu năng lượng tự đuổi mục tiêu." : "Chém vòng cung trước mặt."}</p></div>
      <div><div class="kl">Kỹ năng · ${esc(c.skill.name)} · hồi ${c.skill.cd} giây</div><p>${SKILLDESC[c.skill.type](c.skill.m)}</p></div>
      <div><div class="kl">Nộ · ${esc(c.burst.name)} · ${c.burst.cost} năng lượng</div><p>${BURSTDESC[c.burst.type](c.burst.m)}</p></div>
    </div></div></div>`;
  box
    .querySelector("canvas.big")
    .getContext("2d")!
    .drawImage(portrait(c.id, 480, 640, "splash"), 0, 0);
  const b1 = $("lv1"),
    b10 = $("lv10"),
    tp = $("toParty");
  if (b1)
    b1.onclick = () => {
      if (Server.req("levelUp", { id: c.id, times: 1 }).ok) {
        updateWallets();
        renderChars();
      }
    };
  if (b10)
    b10.onclick = () => {
      if (Server.req("levelUp", { id: c.id, times: 10 }).ok) {
        updateWallets();
        renderChars();
      }
    };
  if (tp)
    tp.onclick = () => {
      const p = [...P.party];
      if (p.length >= 4) return toast("Đội đã đủ 4 người. Bấm vào một ô trong đội để bỏ bớt.");
      p.push(c.id);
      if (Server.req("setParty", { party: p }).ok) renderChars();
    };
}
