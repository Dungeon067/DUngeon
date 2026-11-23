import { sfx } from "../core/audio";
import { GS } from "../core/state";
import { h, itemCard } from "./ds";
import type { Rarity } from "./tokens";
import "./chest-reveal.css";

/* Màn mở rương: rương bật nắp, tỏa sáng theo hạng, phần thưởng bay ra thành thẻ đồ. Chạm bất kỳ để đóng. */

export type ChestTier = "thuong" | "quy" | "tinhXao";
export interface ChestLoot {
  name: string;
  icon: string;
  qty: number;
  rarity: Rarity;
}
const TIER: Record<ChestTier, { ten: string; c: string; c2: string }> = {
  thuong: { ten: "Rương Thường", c: "#9fb7d8", c2: "#e8f0ff" },
  quy: { ten: "Rương Quý", c: "#b98cff", c2: "#efe2ff" },
  tinhXao: { ten: "Rương Tinh Xảo", c: "#f0c060", c2: "#fff2c8" },
};

let el: HTMLElement | null = null;
let onClose: (() => void) | null = null;
export const chestRevealOpen = () => !!el;

/** Phần thưởng chuẩn của rương (Đá Sao, Xu, Sách) thành danh sách thẻ. */
export function lootOf(r: { gems?: number; coin?: number; books?: number }, extra: ChestLoot[] = []): ChestLoot[] {
  const out: ChestLoot[] = [];
  if (r.gems) out.push({ name: "Đá Sao", icon: "da-sao", qty: r.gems, rarity: 5 });
  if (r.coin) out.push({ name: "Xu", icon: "xu", qty: r.coin, rarity: 3 });
  if (r.books) out.push({ name: "Sách Kinh Nghiệm", icon: "nang-cap", qty: r.books, rarity: 4 });
  return out.concat(extra);
}

function chestSvg(c: string) {
  // Rương vẽ tay: thân gỗ viền kim loại, nắp tách rời để bật lên.
  return `<svg viewBox="0 0 160 130" class="cr-chest" aria-hidden="true">
  <defs><linearGradient id="crw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#5a3418"/></linearGradient></defs>
  <g class="cr-body"><rect x="18" y="58" width="124" height="62" rx="8" fill="url(#crw)" stroke="#2a1608" stroke-width="3"/>
  <rect x="18" y="58" width="124" height="12" fill="${c}" opacity=".85"/><rect x="72" y="62" width="16" height="22" rx="3" fill="${c}" stroke="#2a1608" stroke-width="2"/>
  <rect x="30" y="58" width="8" height="62" fill="${c}" opacity=".7"/><rect x="122" y="58" width="8" height="62" fill="${c}" opacity=".7"/></g>
  <g class="cr-lid"><path d="M18 60 Q18 22 80 22 Q142 22 142 60 Z" fill="url(#crw)" stroke="#2a1608" stroke-width="3"/>
  <path d="M30 60 Q30 30 38 28 L38 60Z M122 60 L122 28 Q130 30 130 60Z" fill="${c}" opacity=".7"/>
  <path d="M18 60 L142 60" stroke="${c}" stroke-width="6"/></g></svg>`;
}

export function showChestReveal(tier: ChestTier, loot: ChestLoot[], done?: () => void) {
  closeChestReveal();
  const T = TIER[tier];
  onClose = done ?? null;
  const cards = h(
    "div",
    { class: "cr-cards" },
    loot.map((l, i) => {
      const c = itemCard({ name: l.name, rarity: l.rarity, icon: l.icon, qty: l.qty });
      c.style.setProperty("--d", `${0.75 + i * 0.12}s`);
      c.tabIndex = -1;
      return c;
    }),
  );
  const stage = h("div", { class: "cr-stage" });
  stage.innerHTML = `<div class="cr-rays"></div><div class="cr-glow"></div>${chestSvg(T.c)}`;
  el = h(
    "div",
    {
      class: "tt-root cr",
      id: "chestReveal",
      role: "dialog",
      "aria-label": `${T.ten}: ${loot.map((l) => `${l.qty} ${l.name}`).join(", ")}`,
      style: `--c:${T.c};--c2:${T.c2}`,
    },
    [h("div", { class: "cr-title" }, [T.ten]), stage, cards, h("div", { class: "cr-tap" }, ["Chạm để tiếp tục"])],
  );
  el.addEventListener("click", closeChestReveal);
  document.body.append(el);
  GS.paused = true;
  GS.overlay = "dialog";
  sfx("chest");
  setTimeout(() => sfx(tier === "tinhXao" ? "star5" : tier === "quy" ? "star4" : "star3"), 650);
}

export function closeChestReveal() {
  if (!el) return;
  el.remove();
  el = null;
  GS.overlay = null;
  GS.paused = false;
  const f = onClose;
  onClose = null;
  f?.();
}
