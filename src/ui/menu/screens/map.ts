import { GS } from "../../../core/state";
import { TAU, clamp } from "../../../core/util";
import { MENU } from "../../../data/menu-content";
import { FOG, FOG_N, Server } from "../../../server/server";
import { MH, MW, TS } from "../../../world/map";
import { button, h, toast } from "../../ds";
import { icon } from "../../icons/icons";
import { anchorXY, seen } from "../anchor";
import { inCombat } from "../logic";
import { trackedObjective } from "../quests";
import { closeMenu, registerScreen, rerender } from "../shell";

/* Bản đồ lớn (S10): thu phóng, kéo, sương bản đồ theo ô đã đi qua, biểu tượng, dịch chuyển nhanh tới
   Bia Đá đã mở (Bia Đá nằm trong vùng đã tan sương), đánh dấu tự do. */
interface Poi {
  kind: "statue" | "chest" | "tower" | "gate" | "npc" | "mark" | "you" | "point";
  x: number;
  y: number;
  name: string;
  info?: string;
  i?: number;
}
const COL: Record<string, string> = {
  statue: "#9fe8ff",
  chest: "#f0c060",
  tower: "#ffd27a",
  gate: "#5aa0ff",
  npc: "#ff9ad5",
  mark: "#7dffb2",
  you: "#ffffff",
};
const LEGEND: [string, string][] = [
  ["statue", "Bia Đá (chạm vào để dịch chuyển)"],
  ["chest", "Rương đã thấy, chưa mở"],
  ["tower", "Cổng Tháp Tinh Tú"],
  ["gate", "Hang Hắc Giao"],
  ["npc", "Nhân vật quan trọng"],
  ["mark", "Điểm bạn đánh dấu"],
];

const V = { z: 1, x: MW / 2, y: MH / 2 };
let sel: Poi | null = null;
let cv: HTMLCanvasElement | null = null;

export const statueOpen = (i: number, P: any = Server.P, M: any = GS.WORLD) =>
  i === 0 || (!!M?.statues[i] && seen(P.fog, M.statues[i].x, M.statues[i].y));

function pois(): Poi[] {
  const M = GS.G?.map ?? GS.WORLD,
    P = Server.P,
    out: Poi[] = [];
  if (!M) return out;
  M.statues.forEach((s: any, i: number) => {
    if (statueOpen(i)) out.push({ kind: "statue", x: s.x + 0.5, y: s.y + 0.5, name: `Bia Đá ${i + 1}`, info: "Hồi phục đội, lưu điểm hồi sinh.", i });
  });
  M.chests.forEach((c: any, i: number) => {
    if (!P.chests.includes(i) && seen(P.fog, c.x, c.y)) out.push({ kind: "chest", x: c.x + 0.5, y: c.y + 0.5, name: "Rương báu", info: "Đã thấy nhưng chưa mở.", i });
  });
  if (seen(P.fog, M.tower.x, M.tower.y)) out.push({ kind: "tower", x: M.tower.x + 0.5, y: M.tower.y + 0.5, name: "Cổng Tháp Tinh Tú", info: "Lối vào Tháp Tinh Tú." });
  if (seen(P.fog, M.gate.x, M.gate.y)) out.push({ kind: "gate", x: M.gate.x + 0.5, y: M.gate.y + 0.5, name: "Hang Hắc Giao", info: "Nơi ác long đang ngủ." });
  for (const n of MENU.npcs) {
    const a = anchorXY(n.at, M);
    if (a && seen(P.fog, a[0], a[1])) out.push({ kind: "npc", x: a[0], y: a[1], name: n.name, info: n.role });
  }
  P.marks.forEach((m: any, i: number) => out.push({ kind: "mark", x: m.x, y: m.y, name: m.label, info: "Điểm đánh dấu của bạn.", i }));
  if (GS.G?.p) out.push({ kind: "you", x: GS.G.p.x / TS, y: GS.G.p.y / TS, name: "Vị trí của bạn" });
  return out;
}

function targetXY(t: string): [number, number] | null {
  const M = GS.G?.map ?? GS.WORLD;
  if (!M) return null;
  if (t === "tower" || t === "gate") return anchorXY(t, M);
  const p = GS.G?.p ? [GS.G.p.x / TS, GS.G.p.y / TS] : [M.cx, M.cy];
  const list: any[] = t === "statue" ? M.statues : t === "chest" ? M.chests.filter((_: any, i: number) => !Server.P.chests.includes(i)) : t === "camp" ? M.camps : [];
  let best: any = null,
    bd = Infinity;
  for (const s of list) {
    const d = Math.hypot(s.x - p[0]!, s.y - p[1]!);
    if (d < bd) ((bd = d), (best = s));
  }
  return best ? [best.x + 0.5, best.y + 0.5] : null;
}

const scale = () => (cv ? (Math.min(cv.width, cv.height) / MW) * V.z : 1);
const toTile = (px: number, py: number) => {
  const s = scale();
  return [V.x + (px - cv!.width / 2) / s, V.y + (py - cv!.height / 2) / s] as const;
};
function clampView() {
  V.z = clamp(V.z, MENU.map.zoomMin, MENU.map.zoomMax);
  V.x = clamp(V.x, 0, MW);
  V.y = clamp(V.y, 0, MH);
}

function draw() {
  if (!cv || !cv.isConnected) return;
  const c = cv.getContext("2d")!,
    M = GS.G?.map ?? GS.WORLD,
    s = scale(),
    W = cv.width,
    H = cv.height;
  const X = (x: number) => W / 2 + (x - V.x) * s,
    Y = (y: number) => H / 2 + (y - V.y) * s;
  c.fillStyle = "#070b1c";
  c.fillRect(0, 0, W, H);
  if (!M) return;
  c.imageSmoothingEnabled = false;
  c.drawImage(M.mini, X(0), Y(0), MW * s, MH * s);
  const fog = Server.P.fog;
  c.fillStyle = "rgba(6,9,24,.92)";
  for (let fy = 0; fy < FOG_N; fy++)
    for (let fx = 0; fx < FOG_N; fx++)
      if (fog[fy * FOG_N + fx] !== "1") c.fillRect(Math.floor(X(fx * FOG)), Math.floor(Y(fy * FOG)), Math.ceil(FOG * s) + 1, Math.ceil(FOG * s) + 1);
  const t = trackedObjective()?.target ?? GS.G?.objTarget;
  const tg = t ? targetXY(t) : null;
  if (tg) {
    c.strokeStyle = "#7dffb2";
    c.lineWidth = 2;
    c.beginPath();
    c.arc(X(tg[0]), Y(tg[1]), 12 + Math.sin(performance.now() / 200) * 2, 0, TAU);
    c.stroke();
  }
  for (const p of pois()) {
    const r = p.kind === "chest" ? 4 : p.kind === "you" ? 6 : 7;
    c.fillStyle = "#000";
    c.beginPath();
    c.arc(X(p.x), Y(p.y), r + 2, 0, TAU);
    c.fill();
    c.fillStyle = COL[p.kind]!;
    c.beginPath();
    if (p.kind === "mark") {
      c.moveTo(X(p.x), Y(p.y) - r - 3);
      c.lineTo(X(p.x) + r, Y(p.y));
      c.lineTo(X(p.x), Y(p.y) + r + 3);
      c.lineTo(X(p.x) - r, Y(p.y));
    } else c.arc(X(p.x), Y(p.y), r, 0, TAU);
    c.fill();
    if (sel && sel.kind === p.kind && sel.i === p.i && Math.abs(sel.x - p.x) < 0.01) {
      c.strokeStyle = "#fff";
      c.lineWidth = 2;
      c.beginPath();
      c.arc(X(p.x), Y(p.y), r + 6, 0, TAU);
      c.stroke();
    }
  }
  if (sel?.kind === "point") {
    c.strokeStyle = "#fff";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(X(sel.x) - 8, Y(sel.y));
    c.lineTo(X(sel.x) + 8, Y(sel.y));
    c.moveTo(X(sel.x), Y(sel.y) - 8);
    c.lineTo(X(sel.x), Y(sel.y) + 8);
    c.stroke();
  }
}

function pick(tx: number, ty: number) {
  const R = 2.2 / V.z + 0.8;
  let best: Poi | null = null,
    bd = R;
  for (const p of pois()) {
    const d = Math.hypot(p.x - tx, p.y - ty);
    if (d < bd) ((bd = d), (best = p));
  }
  const M = GS.G?.map ?? GS.WORLD;
  sel = best ?? (M && seen(Server.P.fog, tx, ty) ? { kind: "point", x: tx, y: ty, name: "Vùng đã khám phá" } : { kind: "point", x: tx, y: ty, name: "Vùng chưa khám phá" });
  rerender();
}

export function fastTravel(i: number) {
  const G = GS.G,
    s = G?.map?.statues[i];
  if (!G || G.mode !== "world" || !s) return false;
  if (!statueOpen(i)) return toast("Bia Đá này chưa được mở", "warn"), false;
  if (inCombat(G, MENU.combatLock.radius)) return toast("Không thể dịch chuyển khi đang chiến đấu", "warn"), false;
  G.p.x = (s.x + 0.5) * TS;
  G.p.y = (s.y + 2.5) * TS;
  G.p.vx = G.p.vy = 0;
  G.respawn = { x: G.p.x, y: G.p.y };
  G.cam && ((G.cam.x = G.p.x), (G.cam.y = G.p.y));
  closeMenu();
  toast(`Đã dịch chuyển tới Bia Đá ${i + 1}`, "ok");
  return true;
}

function panel() {
  const box = h("aside", { class: "tt-panel tt-map-side" });
  if (sel) {
    const p = sel;
    const acts = h("div", { class: "tt-row" });
    if (p.kind === "statue") {
      const b = button("Dịch chuyển", { variant: "primary", icon: "bia-da", onClick: () => fastTravel(p.i!) });
      b.id = "mapTravel";
      acts.append(b);
    }
    if (p.kind === "mark")
      acts.append(
        button("Xóa đánh dấu", {
          variant: "ghost",
          icon: "dong",
          onClick: () => {
            if (Server.req("delMark", { i: p.i }).ok) sel = null;
            rerender();
          },
        }),
      );
    else if (p.kind !== "you") {
      const b = button("Đánh dấu tại đây", {
        icon: "ghim",
        onClick: () => {
          const r = Server.req("addMark", { x: +p.x.toFixed(2), y: +p.y.toFixed(2), label: p.kind === "point" ? `Điểm ${Server.P.marks.length + 1}` : p.name });
          if (r.ok) sel = { kind: "mark", x: p.x, y: p.y, name: r.data.at(-1).label, i: r.data.length - 1 };
          rerender();
        },
      });
      b.id = "mapMark";
      acts.append(b);
    }
    box.append(h("h3", { class: "tt-h3", id: "mapSel" }, [p.name]), p.info ? h("p", { class: "tt-dim" }, [p.info]) : "", acts);
  } else box.append(h("p", { class: "tt-dim" }, ["Chọn một điểm trên bản đồ. Kéo để di chuyển, cuộn hoặc chụm hai ngón để thu phóng."]));
  const explored = [...Server.P.fog].filter((x) => x === "1").length;
  box.append(
    h("p", { class: "tt-dim" }, [`Đã khám phá ${Math.round((explored / (FOG_N * FOG_N)) * 100)}% Đảo Lạc`]),
    h(
      "ul",
      { class: "tt-legend" },
      LEGEND.map(([k, l]) => h("li", {}, [h("i", { style: `--c:${COL[k]}` }), l])),
    ),
  );
  return box;
}

function render(host: HTMLElement, params: any) {
  host.classList.add("tt-menu-map");
  if (params.focus) {
    const t = targetXY(params.focus);
    if (t) [V.x, V.y, V.z] = [t[0], t[1], Math.max(V.z, 2)];
    delete params.focus;
  } else if (!sel && GS.G?.p) [V.x, V.y] = [GS.G.p.x / TS, GS.G.p.y / TS];
  if (!GS.G?.map && !GS.WORLD) {
    host.append(h("p", { class: "tt-dim" }, ["Bản đồ chỉ có khi đang ở Đảo Lạc."]));
    return;
  }
  cv = h("canvas", { id: "mapCv", tabindex: "0", "aria-label": "Bản đồ Đảo Lạc. Mũi tên để kéo, + và − để thu phóng, Enter để chọn điểm giữa." }) as HTMLCanvasElement;
  const wrap = h("div", { class: "tt-map-wrap" }, [
    cv,
    h("div", { class: "tt-map-zoom" }, [
      button("Phóng to", { iconOnly: true, icon: "them", onClick: () => zoom(1.25) }),
      button("Thu nhỏ", { iconOnly: true, icon: "bot", onClick: () => zoom(0.8) }),
      button("Về vị trí của bạn", {
        iconOnly: true,
        icon: "vi-tri",
        onClick: () => {
          if (GS.G?.p) [V.x, V.y] = [GS.G.p.x / TS, GS.G.p.y / TS];
          draw();
        },
      }),
    ]),
  ]);
  host.append(h("div", { class: "tt-map" }, [wrap, panel()]));
  const fit = () => {
    if (!cv?.isConnected) return;
    const r = wrap.getBoundingClientRect(),
      d = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.max(200, r.width * d);
    cv.height = Math.max(160, r.height * d);
    draw();
  };
  requestAnimationFrame(fit);
  new ResizeObserver(fit).observe(wrap);
  const ptr = new Map<number, [number, number]>();
  let moved = 0,
    pinch = 0;
  cv.addEventListener("pointerdown", (e) => {
    cv!.setPointerCapture(e.pointerId);
    ptr.set(e.pointerId, [e.clientX, e.clientY]);
    moved = 0;
    if (ptr.size === 2) {
      const [a, b] = [...ptr.values()];
      pinch = Math.hypot(a![0] - b![0], a![1] - b![1]);
    }
  });
  cv.addEventListener("pointermove", (e) => {
    const o = ptr.get(e.pointerId);
    if (!o) return;
    const d = Math.min(devicePixelRatio || 1, 2);
    if (ptr.size === 2) {
      ptr.set(e.pointerId, [e.clientX, e.clientY]);
      const [a, b] = [...ptr.values()];
      const nd = Math.hypot(a![0] - b![0], a![1] - b![1]);
      if (pinch) zoom(nd / pinch);
      pinch = nd;
      moved = 99;
      return;
    }
    const dx = e.clientX - o[0],
      dy = e.clientY - o[1];
    moved += Math.abs(dx) + Math.abs(dy);
    ptr.set(e.pointerId, [e.clientX, e.clientY]);
    V.x -= (dx * d) / scale();
    V.y -= (dy * d) / scale();
    clampView();
    draw();
  });
  const up = (e: PointerEvent) => {
    if (!ptr.has(e.pointerId)) return;
    ptr.delete(e.pointerId);
    if (moved < 6 && ptr.size === 0) {
      const r = cv!.getBoundingClientRect(),
        d = cv!.width / r.width;
      const [tx, ty] = toTile((e.clientX - r.left) * d, (e.clientY - r.top) * d);
      pick(tx, ty);
    }
  };
  cv.addEventListener("pointerup", up);
  cv.addEventListener("pointercancel", (e) => ptr.delete(e.pointerId));
  cv.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      zoom(e.deltaY < 0 ? 1.15 : 0.87);
    },
    { passive: false },
  );
  const loop = () => {
    if (!cv?.isConnected) return;
    draw();
    setTimeout(() => requestAnimationFrame(loop), 120);
  };
  loop();
}

function zoom(f: number) {
  V.z *= f;
  clampView();
  draw();
}

registerScreen("map", {
  title: "Bản đồ",
  icon: "ban-do",
  render,
  onKey(e) {
    if (document.activeElement !== cv) {
      if (e.key === "+" || e.key === "=" || e.key === "-") return zoom(e.key === "-" ? 0.8 : 1.25), true;
      return false;
    }
    const step = 6 / V.z;
    const k: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (k[e.key]) {
      V.x += k[e.key]![0];
      V.y += k[e.key]![1];
      clampView();
      draw();
      return true;
    }
    if (e.key === "+" || e.key === "=" || e.key === "-") return zoom(e.key === "-" ? 0.8 : 1.25), true;
    if (e.key === "Enter" || e.key === " ") return pick(V.x, V.y), true;
    return false;
  },
  onClose() {
    sel = null;
    cv = null;
  },
});
