import { drawChibi } from "../../../art/chibi";
import { byId } from "../../../data/content";
import { FURN, HOME, comfort, fits, free, normHome, setsDone, size, type Placed } from "../../../home/home-core";
import { Server } from "../../../server/server";
import { button, h, tabs, tag } from "../../ds";
import { toast } from "../../toast";
import { registerScreen, rerender } from "../shell";
import { updateWallets } from "../../screens";
import "./home.css";

/* Nhà Sao (S21): phòng lưới ô nhìn chéo, đặt, xoay, dời, cất đồ; cửa hàng nội thất (Xu); Ấm Cúng; Hộ Tinh tới thăm. */

type Tab = "kho" | "shop" | "am" | "khach";
let tab: Tab = "kho";
/** Đang cầm món mới để đặt (id) hoặc đang dời món đã đặt (uid). */
let hold: { id: string; uid?: number; rot: 0 | 1 } | null = null;
let selUid: number | null = null;
let hover: { x: number; y: number } | null = null;
let cv: HTMLCanvasElement | null = null;
let raf = 0;

const H = () => (Server.P.home = normHome((Server.P as any).home)) as ReturnType<typeof normHome>;
const fmt = (n: number) => n.toLocaleString("vi-VN");

/* ---------- Vẽ phòng ---------- */
const CELL = 48,
  WALL = 70,
  TILT = 0.62; // ô nhìn chéo: chiều sâu ép lại
function geom() {
  const R = HOME.phong,
    W = R.rong * CELL,
    D = R.sau * CELL * TILT;
  return { R, W, D, ox: 24, oy: WALL + 16, cw: W + 48, ch: WALL + D + 40 };
}
const sx = (g: ReturnType<typeof geom>, x: number) => g.ox + x * CELL;
const sy = (g: ReturnType<typeof geom>, y: number) => g.oy + y * CELL * TILT;

function shade(c: string, k: number) {
  const n = parseInt(c.slice(1), 16),
    f = (v: number) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
}
/** Khối hộp nhìn chéo: mặt trên + mặt trước, cao `ht` px. */
function box(c: CanvasRenderingContext2D, x: number, y: number, w: number, d: number, ht: number, col: string) {
  c.fillStyle = "rgba(0,0,0,.18)";
  c.fillRect(x + 3, y + 3, w, d);
  c.fillStyle = shade(col, 0.72);
  c.fillRect(x, y + d - ht, w, ht);
  c.fillStyle = col;
  c.fillRect(x, y - ht, w, d);
  c.strokeStyle = "rgba(30,18,10,.55)";
  c.lineWidth = 1.5;
  c.strokeRect(x + 0.5, y - ht + 0.5, w - 1, d + ht - 1);
}

function drawFurn(
  c: CanvasRenderingContext2D,
  p: { id: string; x: number; y: number; rot: number },
  g: ReturnType<typeof geom>,
  alpha = 1,
  t = 0,
) {
  const f = FURN[p.id]!,
    [w, d] = size(p),
    X = sx(g, p.x) + 3,
    Y = sy(g, p.y) + 2,
    PW = w * CELL - 6,
    PD = d * CELL * TILT - 4;
  c.save();
  c.globalAlpha = alpha;
  const m = f.mau,
    m2 = f.mau2;
  switch (f.hinh) {
    case "tham":
      c.fillStyle = m;
      c.fillRect(X, Y, PW, PD);
      c.strokeStyle = m2;
      c.lineWidth = 3;
      c.strokeRect(X + 5, Y + 4, PW - 10, PD - 8);
      for (let i = 1; i < 4; i++) {
        c.beginPath();
        c.moveTo(X + 10, Y + (PD * i) / 4);
        c.quadraticCurveTo(X + PW / 2, Y + (PD * i) / 4 - 6, X + PW - 10, Y + (PD * i) / 4);
        c.stroke();
      }
      break;
    case "ao-ca": {
      c.fillStyle = m2;
      c.beginPath();
      c.ellipse(X + PW / 2, Y + PD / 2, PW / 2, PD / 2, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = m;
      c.beginPath();
      c.ellipse(X + PW / 2, Y + PD / 2, PW / 2 - 6, PD / 2 - 5, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#ff8a3a";
      const a = t * 1.3;
      c.beginPath();
      c.ellipse(
        X + PW / 2 + Math.cos(a) * PW * 0.25,
        Y + PD / 2 + Math.sin(a) * PD * 0.2,
        6,
        3,
        a + Math.PI / 2,
        0,
        Math.PI * 2,
      );
      c.fill();
      break;
    }
    case "giuong":
      box(c, X, Y, PW, PD, 14, m);
      c.fillStyle = m2;
      c.fillRect(X + 4, Y - 14 + 4, PW - 8, PD * 0.72);
      c.fillStyle = "#ffffff";
      c.fillRect(X + 8, Y - 14 + 6, PW - 16, 12);
      break;
    case "ban":
      box(c, X, Y + PD * 0.2, PW, PD * 0.7, 22, m);
      break;
    case "ghe":
      box(c, X + PW * 0.15, Y + PD * 0.2, PW * 0.7, PD * 0.6, 14, m);
      box(c, X + PW * 0.15, Y + PD * 0.05, PW * 0.7, 6, 30, m2);
      break;
    case "tu":
    case "ke":
      box(c, X, Y + PD * 0.35, PW, PD * 0.6, 58, m);
      c.fillStyle = m2;
      if (f.hinh === "ke")
        for (let i = 0; i < 3; i++)
          for (let k = 0; k < 6; k++)
            c.fillRect(X + 6 + (k * (PW - 12)) / 6, Y + PD * 0.35 - 52 + i * 18, (PW - 12) / 6 - 3, 12);
      else {
        c.fillRect(X + PW / 2 - 4, Y + PD * 0.35 - 30, 3, 8);
        c.fillRect(X + PW / 2 + 2, Y + PD * 0.35 - 30, 3, 8);
      }
      break;
    case "tranh":
      c.fillStyle = "#5a3a20";
      c.fillRect(X, Y + PD - 50, PW, 40);
      c.fillStyle = m;
      c.fillRect(X + 4, Y + PD - 46, PW - 8, 32);
      c.strokeStyle = m2;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(X + 10, Y + PD - 20);
      c.lineTo(X + PW * 0.35, Y + PD - 40);
      c.lineTo(X + PW * 0.55, Y + PD - 26);
      c.lineTo(X + PW * 0.75, Y + PD - 36);
      c.lineTo(X + PW - 10, Y + PD - 20);
      c.stroke();
      break;
    case "den": {
      c.fillStyle = "#3a2a20";
      c.fillRect(X + PW / 2 - 2, Y + PD * 0.3 - 24, 4, 24);
      const glow = c.createRadialGradient(X + PW / 2, Y - 34, 2, X + PW / 2, Y - 34, 34);
      glow.addColorStop(0, m2 + "cc");
      glow.addColorStop(1, "transparent");
      c.fillStyle = glow;
      c.fillRect(X + PW / 2 - 36, Y - 70, 72, 72);
      c.fillStyle = m;
      c.beginPath();
      c.ellipse(X + PW / 2, Y - 34, 12, 15, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = m2;
      c.fillRect(X + PW / 2 - 6, Y - 50, 12, 4);
      c.fillRect(X + PW / 2 - 6, Y - 20, 12, 4);
      break;
    }
    case "cay":
      box(c, X + PW * 0.25, Y + PD * 0.3, PW * 0.5, PD * 0.5, 14, m2);
      c.fillStyle = m;
      for (let i = 0; i < 5; i++) {
        c.beginPath();
        c.arc(X + PW / 2 + Math.cos(i * 1.3) * 9, Y - 20 - i * 5 + Math.sin(t * 2 + i) * 1.5, 9, 0, Math.PI * 2);
        c.fill();
      }
      break;
    case "trong":
      c.fillStyle = shade(m, 0.7);
      c.beginPath();
      c.ellipse(X + PW / 2, Y + PD * 0.5, PW * 0.42, PD * 0.35, 0, 0, Math.PI);
      c.fill();
      c.fillRect(X + PW * 0.08, Y + PD * 0.5 - 18, PW * 0.84, 18);
      c.fillStyle = m;
      c.beginPath();
      c.ellipse(X + PW / 2, Y + PD * 0.5 - 18, PW * 0.42, PD * 0.35, 0, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = m2;
      c.beginPath();
      c.ellipse(X + PW / 2, Y + PD * 0.5 - 18, PW * 0.22, PD * 0.18, 0, 0, Math.PI * 2);
      c.stroke();
      break;
    case "bep":
      box(c, X, Y + PD * 0.2, PW, PD * 0.7, 26, m);
      c.fillStyle = m2;
      c.beginPath();
      c.arc(X + PW * 0.3, Y + PD * 0.2 - 18 + Math.sin(t * 9) * 1.2, 6, 0, Math.PI * 2);
      c.fill();
      break;
    case "hang-rao":
      c.fillStyle = m;
      for (let i = 0; i < 6; i++) c.fillRect(X + i * (PW / 6) + 2, Y + PD - 34, PW / 6 - 5, 32);
      c.fillStyle = m2;
      c.fillRect(X, Y + PD - 26, PW, 4);
      break;
    default:
      box(c, X + PW * 0.15, Y + PD * 0.2, PW * 0.7, PD * 0.6, 18, m);
      c.fillStyle = m2;
      c.fillRect(X + PW * 0.35, Y + PD * 0.2 - 12, PW * 0.3, 5);
  }
  c.restore();
}

function draw(t: number) {
  if (!cv || !cv.isConnected) return cancelAnimationFrame(raf);
  const c = cv.getContext("2d")!,
    g = geom(),
    Hs = H();
  c.clearRect(0, 0, cv.width, cv.height);
  // Tường sau và sàn gỗ.
  const wg = c.createLinearGradient(0, g.oy - WALL, 0, g.oy);
  wg.addColorStop(0, "#e8dcc0");
  wg.addColorStop(1, "#cbb894");
  c.fillStyle = wg;
  c.fillRect(g.ox, g.oy - WALL, g.W, WALL);
  c.fillStyle = "#8a5a32";
  c.fillRect(g.ox, g.oy - 8, g.W, 8);
  c.fillStyle = "#6a4a2a";
  for (let i = 1; i < 4; i++) c.fillRect(g.ox + (g.W * i) / 4 - 3, g.oy - WALL, 6, WALL);
  // Cửa sổ có trời sao.
  c.fillStyle = "#1a2450";
  c.fillRect(g.ox + g.W * 0.42, g.oy - WALL + 12, g.W * 0.16, 40);
  c.fillStyle = "#fff6c8";
  for (let i = 0; i < 6; i++)
    c.fillRect(g.ox + g.W * 0.43 + ((i * 37) % (g.W * 0.14)), g.oy - WALL + 16 + ((i * 13) % 32), 2, 2);
  for (let y = 0; y < g.R.sau; y++)
    for (let x = 0; x < g.R.rong; x++) {
      c.fillStyle = (x + y) % 2 ? "#c8975e" : "#bd8b54";
      c.fillRect(sx(g, x), sy(g, y), CELL, CELL * TILT);
    }
  c.strokeStyle = "rgba(80,50,20,.25)";
  c.lineWidth = 1;
  for (let y = 0; y <= g.R.sau; y++) {
    c.beginPath();
    c.moveTo(g.ox, sy(g, y));
    c.lineTo(g.ox + g.W, sy(g, y));
    c.stroke();
  }
  // Đồ: thảm trước, sau đó theo chiều sâu.
  const list = [...Hs.dat].sort(
    (a, b) =>
      (FURN[a.id]!.hinh === "tham" ? -1 : 0) - (FURN[b.id]!.hinh === "tham" ? -1 : 0) ||
      a.y + size(a)[1] - (b.y + size(b)[1]),
  );
  for (const p of list) {
    if (hold?.uid === p.uid) continue;
    drawFurn(c, p, g, 1, t);
    if (p.uid === selUid) {
      const [w, d] = size(p);
      c.strokeStyle = "#ffe27a";
      c.lineWidth = 2;
      c.setLineDash([6, 4]);
      c.strokeRect(sx(g, p.x) + 1, sy(g, p.y) + 1, w * CELL - 2, d * CELL * TILT - 2);
      c.setLineDash([]);
    }
  }
  // Khách: Hộ Tinh đứng trong phòng.
  Hs.khach.forEach((id, i) => {
    const art = guestArt(id);
    if (!art) return;
    const gx = g.ox + g.W * (0.2 + i * 0.3),
      gy = g.oy + g.D * 0.55 + Math.sin(t * 2 + i) * 2;
    c.fillStyle = "rgba(0,0,0,.2)";
    c.beginPath();
    c.ellipse(gx, gy + 4, 16, 5, 0, 0, Math.PI * 2);
    c.fill();
    c.drawImage(art, gx - 35, gy - 80, 70, 84);
  });
  // Bóng đặt thử.
  if (hold && hover) {
    const p = { id: hold.id, x: hover.x, y: hover.y, rot: hold.rot };
    const ok = fits(Hs, p, hold.uid);
    const [w, d] = size(p);
    c.fillStyle = ok ? "rgba(125,255,178,.25)" : "rgba(255,90,90,.3)";
    c.fillRect(sx(g, p.x), sy(g, p.y), w * CELL, d * CELL * TILT);
    drawFurn(c, p, g, 0.75, t);
  }
  raf = requestAnimationFrame((ms) => draw(ms / 1000));
}

const guestCache = new Map<string, HTMLCanvasElement | null>();
function guestArt(id: string) {
  if (!guestCache.has(id)) {
    const c = byId[id];
    let cv2: HTMLCanvasElement | null = null;
    if (c) {
      // Vẽ chibi cả người (không nền) để Hộ Tinh đứng tự nhiên trong phòng.
      cv2 = document.createElement("canvas");
      cv2.width = 120;
      cv2.height = 144;
      const x = cv2.getContext("2d")!;
      x.setTransform(3.4, 0, 0, 3.4, 60, 140);
      drawChibi(x, c, 0, 0, 1, { noShadow: true, t: 0 });
    }
    guestCache.set(id, cv2);
  }
  return guestCache.get(id) ?? null;
}

function cellFromEvent(e: PointerEvent): { x: number; y: number } | null {
  if (!cv) return null;
  const r = cv.getBoundingClientRect(),
    g = geom(),
    px = ((e.clientX - r.left) / r.width) * cv.width,
    py = ((e.clientY - r.top) / r.height) * cv.height;
  const x = Math.floor((px - g.ox) / CELL),
    y = Math.floor((py - g.oy) / (CELL * TILT));
  if (x < 0 || y < 0 || x >= g.R.rong || y >= g.R.sau) return null;
  return { x, y };
}

function act(a: string, p: any) {
  const r = Server.req(a, p);
  if (!r.ok) toast(r.error);
  return r;
}

/* ---------- Bảng bên phải ---------- */
function panel(): HTMLElement {
  const Hs = H(),
    P = Server.P;
  const sel = selUid !== null ? Hs.dat.find((p) => p.uid === selUid) : null;
  const tools = sel
    ? h("div", { class: "home-tools" }, [
        h("b", {}, [FURN[sel.id]!.ten]),
        button("Xoay", {
          icon: "lam-moi",
          onClick: () => {
            const r = act("homeMove", { uid: sel.uid, x: sel.x, y: sel.y, rot: sel.rot ? 0 : 1 });
            if (r.ok) rerender();
          },
        }),
        button("Dời", {
          icon: "luot",
          onClick: () => ((hold = { id: sel.id, uid: sel.uid, rot: sel.rot }), (selUid = null), rerender()),
        }),
        button("Cất", {
          icon: "tui-do",
          onClick: () => (act("homeRemove", { uid: sel.uid }), (selUid = null), rerender()),
        }),
      ])
    : hold
      ? h("div", { class: "home-tools" }, [
          h("b", {}, [`Đang ${hold.uid ? "dời" : "đặt"}: ${FURN[hold.id]!.ten}`]),
          h("span", { class: "tt-dim" }, ["Chạm vào sàn để đặt."]),
          button("Xoay", { icon: "lam-moi", onClick: () => ((hold!.rot = hold!.rot ? 0 : 1), rerender()) }),
          button("Hủy", { icon: "dong", onClick: () => ((hold = null), rerender()) }),
        ])
      : h("div", { class: "home-tools tt-dim" }, [
          "Chọn đồ trong kho để đặt, hoặc chạm đồ trong phòng để xoay, dời, cất.",
        ]);
  const t = tabs(
    [
      { id: "kho", label: "Kho đồ", icon: "tui-do" },
      { id: "shop", label: "Cửa hàng", icon: "cua-hang" },
      { id: "am", label: "Ấm Cúng", icon: "sao" },
      { id: "khach", label: "Khách", icon: "nhan-vat" },
    ],
    tab,
    (id) => {
      if (id === tab) return;
      tab = id as Tab;
      rerender();
    },
  );
  let body: HTMLElement;
  if (tab === "kho") {
    const own = HOME.noiThat.filter((f) => (Hs.kho[f.id] ?? 0) > 0);
    body = h(
      "div",
      { class: "home-list" },
      own.length
        ? own.map((f) => {
            const n = free(Hs, f.id);
            const b = button(`${f.ten} · còn ${n}`, {
              variant: hold?.id === f.id && !hold.uid ? "primary" : "ghost",
              onClick: () => {
                if (n <= 0) return toast("Đã đặt hết món này");
                hold = { id: f.id, rot: 0 };
                selUid = null;
                rerender();
              },
            });
            b.disabled = n <= 0;
            return b;
          })
        : [h("p", { class: "tt-dim" }, ["Kho trống. Ghé Cửa hàng mua đồ."])],
    );
  } else if (tab === "shop") {
    body = h(
      "div",
      { class: "home-list" },
      HOME.noiThat.map((f) =>
        h("div", { class: "home-row" }, [
          h("div", {}, [
            h("b", {}, [f.ten]),
            h("div", { class: "tt-dim" }, [
              `${f.kt[0]}×${f.kt[1]} ô · Ấm Cúng +${f.amCung} · Bộ ${HOME.bo.find((b) => b.id === f.bo)?.ten ?? ""}`,
            ]),
          ]),
          button(`${fmt(f.gia)} Xu`, {
            variant: "primary",
            onClick: () => {
              if (act("homeBuy", { id: f.id }).ok) {
                toast(`Đã mua ${f.ten}`);
                updateWallets();
                rerender();
              }
            },
          }),
        ]),
      ),
    );
  } else if (tab === "am") {
    const s = comfort(Hs),
      done = setsDone(Hs);
    body = h("div", { class: "home-list" }, [
      h("div", { class: "home-score" }, [h("span", {}, ["Ấm Cúng"]), h("b", {}, [String(s)])]),
      ...HOME.moc.map((m) => {
        const got = Hs.moc.includes(m.can);
        return h("div", { class: "home-row" }, [
          h("div", {}, [
            h("b", {}, [`Mốc ${m.can}`]),
            h("div", { class: "tt-dim" }, [`${m.thuong.daSao} Đá Sao · ${fmt(m.thuong.xu)} Xu`]),
          ]),
          got
            ? tag("Đã nhận", "ok")
            : Object.assign(
                button("Nhận", {
                  variant: "primary",
                  onClick: () => act("homeClaim", { kind: "moc", id: m.can }).ok && (updateWallets(), rerender()),
                }),
                { disabled: s < m.can },
              ),
        ]);
      }),
      h("h4", {}, ["Bộ sưu tập"]),
      ...HOME.bo.map((b) => {
        const items = HOME.noiThat.filter((f) => f.bo === b.id),
          have = items.filter((f) => Hs.dat.some((p) => p.id === f.id)).length,
          ok = done.includes(b),
          got = Hs.bo.includes(b.id);
        return h("div", { class: "home-row" }, [
          h("div", {}, [
            h("b", {}, [`${b.ten} (${have}/${items.length})`]),
            h("div", { class: "tt-dim" }, [`Ấm Cúng +${b.them} · ${b.thuong.daSao} Đá Sao · ${fmt(b.thuong.xu)} Xu`]),
          ]),
          got
            ? tag("Đã nhận", "ok")
            : Object.assign(
                button("Nhận", {
                  variant: "primary",
                  onClick: () => act("homeClaim", { kind: "bo", id: b.id }).ok && (updateWallets(), rerender()),
                }),
                { disabled: !ok },
              ),
        ]);
      }),
    ]);
  } else {
    const owned = Object.keys(P.owned).filter((id) => byId[id]);
    body = h("div", { class: "home-list" }, [
      h("p", { class: "tt-dim" }, [
        `Mời tối đa ${HOME.khach.toiDa} Hộ Tinh ở lại nhà. Mỗi ngày trò chuyện một lần với mỗi người để tăng Thân thiết.`,
      ]),
      ...owned.map((id) => {
        const inHome = Hs.khach.includes(id);
        return h("div", { class: "home-row" }, [
          h("b", {}, [byId[id]!.name]),
          h("div", { class: "tt-row" }, [
            button(inHome ? "Tiễn về" : "Mời", {
              variant: inHome ? "ghost" : "primary",
              onClick: () => {
                const ids = inHome ? Hs.khach.filter((x) => x !== id) : [...Hs.khach, id];
                if (!inHome && Hs.khach.length >= HOME.khach.toiDa) return toast("Nhà đã đủ khách");
                act("homeGuests", { ids });
                rerender();
              },
            }),
            inHome
              ? button("Trò chuyện", {
                  onClick: () => {
                    const r = act("homeTalk", { id });
                    if (r.ok)
                      toast(`${byId[id]!.name}: “${r.data.line}”${r.data.n ? ` · Thân thiết +${r.data.n}` : ""}`);
                  },
                })
              : "",
          ]),
        ]);
      }),
    ]);
  }
  return h("div", { class: "home-side" }, [tools, t, body]);
}

function render(host: HTMLElement) {
  host.classList.add("tt-menu-home");
  const g = geom();
  cv = h("canvas", {
    class: "home-room",
    width: g.cw,
    height: g.ch,
    "aria-label": "Phòng Nhà Sao",
  }) as HTMLCanvasElement;
  cv.addEventListener("pointermove", (e) => (hover = cellFromEvent(e)));
  cv.addEventListener("pointerleave", () => (hover = null));
  cv.addEventListener("pointerdown", (e) => {
    const cell = cellFromEvent(e);
    if (!cell) return;
    hover = cell;
    const Hs = H();
    if (hold) {
      const r = hold.uid
        ? act("homeMove", { uid: hold.uid, x: cell.x, y: cell.y, rot: hold.rot })
        : act("homePlace", { id: hold.id, x: cell.x, y: cell.y, rot: hold.rot });
      if (r.ok) {
        // Đặt liên tiếp nếu còn món cùng loại trong kho.
        hold = !hold.uid && free(H(), hold.id) > 0 ? hold : null;
        rerender();
      }
      return;
    }
    const hit = [...Hs.dat]
      .reverse()
      .find((p: Placed) => cell.x >= p.x && cell.x < p.x + size(p)[0] && cell.y >= p.y && cell.y < p.y + size(p)[1]);
    selUid = hit ? hit.uid : null;
    rerender();
  });
  host.append(
    h("div", { class: "home-wrap" }, [
      h("div", { class: "home-stage" }, [
        h("div", { class: "home-head" }, [
          h("b", {}, [HOME.ten]),
          h("span", { class: "tt-dim" }, [`Ấm Cúng ${comfort(H())}`]),
        ]),
        cv,
        h("p", { class: "tt-dim home-desc" }, [HOME.moTa]),
      ]),
      panel(),
    ]),
  );
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame((ms) => draw(ms / 1000));
}

registerScreen("home", { title: "Nhà Sao", icon: "bia-da", render });
