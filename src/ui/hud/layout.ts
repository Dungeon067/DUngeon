import { GS } from "../../core/state";
import { $ } from "../../core/util";
import { CONTROLS } from "../../data/content";
import { HUD_BUTTONS, type HudButton } from "../../data/schema";
import { resetLayout, saveSettings, settings } from "../../core/settings";
import { centerZone, itemRect, layoutProblems, overlaps, partyFit, toItem, type Rect, type Safe } from "./geometry";

/* Đặt nút cảm ứng theo settings.layout, và chế độ chỉnh bố cục (kéo thả, đổi cỡ, độ trong suốt). */

const el = (b: HudButton) => document.querySelector<HTMLElement>(`[data-btn="${b}"]`);

let probe: HTMLElement | null = null;
export function safeInsets(): Safe {
  if (!probe) {
    probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;visibility:hidden;pointer-events:none;left:0;top:0;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";
    document.body.append(probe);
  }
  const cs = getComputedStyle(probe);
  const px = (v: string) => parseFloat(v) || 0;
  // Luôn chừa tối thiểu 10 px để nút không sát mép.
  return {
    l: Math.max(10, px(cs.paddingLeft)),
    r: Math.max(10, px(cs.paddingRight)),
    t: Math.max(8, px(cs.paddingTop)),
    b: Math.max(8, px(cs.paddingBottom)),
  };
}
const vp = () => ({ vw: innerWidth, vh: innerHeight });

export function rectOf(b: HudButton): Rect {
  const { vw, vh } = vp();
  return itemRect(b, settings.layout[b], vw, vh, safeInsets(), CONTROLS.joystick.radius);
}

export function applyLayout() {
  for (const b of HUD_BUTTONS) {
    const e = el(b);
    if (!e) continue;
    const r = rectOf(b);
    e.style.left = "";
    e.style.top = "";
    e.style.setProperty("--x", r.x + "px");
    e.style.setProperty("--y", r.y + "px");
    e.style.setProperty("--size", r.w + "px");
    e.style.setProperty("--op", String(settings.layout[b].opacity));
  }
  layoutParty();
  const { vw, vh } = vp();
  const cz = centerZone(vw, vh, CONTROLS.centerSafe);
  const z = document.getElementById("centerZone");
  if (z) z.style.cssText = `left:${cz.x}px;top:${cz.y}px;width:${cz.w}px;height:${cz.h}px`;
}

/** Cỡ tự nhiên của một ô đội hình (ds.css .tt-slot: chân dung 42 px + viền). */
const SLOT_H = 48;
/** Đặt cột đội hình ở cạnh phải giữa màn, luôn tránh menu nhanh và cụm nút dưới phải. */
export function layoutParty() {
  const box = document.getElementById("hudParty");
  if (!box) return;
  const n = box.children.length;
  const first = box.children[0] as HTMLElement | undefined;
  if (!n || !first) return;
  const { vw, vh } = vp();
  const qm = document.getElementById("quickMenu")?.getBoundingClientRect();
  const top = (qm && qm.height ? qm.bottom : safeInsets().t + 44) + 8;
  const buttons = HUD_BUTTONS.filter((b) => b !== "joy" && b !== "interact").map(rectOf);
  const f = partyFit(n, first.offsetWidth, SLOT_H, vh <= 520 ? 4 : 6, vw, vh, safeInsets(), top, buttons);
  box.style.top = f.y + "px";
  box.style.setProperty("--slot-h", f.slotH + "px");
  box.style.setProperty("--slot-gap", f.gap + "px");
  box.style.setProperty("--slot-k", String(Math.min(1, (f.slotH - 6) / 42)));
}

/* ---------------- chế độ chỉnh bố cục ---------------- */
let sel: HudButton | null = null;
let before: string | null = null;
let wasPaused = false;
export const isEditing = () => document.body.classList.contains("hud-editing");

function select(b: HudButton | null) {
  sel = b;
  for (const x of HUD_BUTTONS) el(x)?.classList.toggle("is-selected", x === b);
  const sc = $<HTMLInputElement>("lbScale"),
    op = $<HTMLInputElement>("lbOpacity");
  sc.disabled = op.disabled = !b;
  if (b) {
    sc.value = String(settings.layout[b].scale);
    op.value = String(settings.layout[b].opacity);
  }
}
function flash(msg: string) {
  const t = $("hudHint");
  t.textContent = msg;
  t.classList.remove("is-on");
  void t.offsetWidth;
  t.classList.add("is-on");
}
/** Bố cục mới có hợp lệ không (không chồng, không vào vùng giữa, không ra ngoài). */
function valid(): boolean {
  const { vw, vh } = vp();
  const rects: Partial<Record<HudButton, Rect>> = {};
  for (const b of HUD_BUTTONS) rects[b] = rectOf(b);
  return layoutProblems(rects, vw, vh, safeInsets(), CONTROLS.centerSafe, fixedRects()).length === 0;
}
/** Phần HUD không kéo được (bản đồ nhỏ, menu nhanh, đội hình, máu): nút không được đè lên. */
export function fixedRects(): Record<string, Rect> {
  const out: Record<string, Rect> = {};
  for (const id of ["miniBtn", "quickMenu", "hudParty", "hudSelf"]) {
    const e = document.getElementById(id);
    if (!e) continue;
    const r = e.getBoundingClientRect();
    out[id] = { x: r.x, y: r.y, w: r.width, h: r.height };
  }
  return out;
}

/** resumePaused: trạng thái tạm dừng cần trả lại khi đóng (khi mở từ Cài đặt, là trạng thái trước Cài đặt). */
export function openLayoutEditor(resumePaused = GS.paused) {
  if (isEditing()) return;
  before = JSON.stringify(settings.layout);
  wasPaused = resumePaused;
  GS.paused = true;
  GS.overlay = "layout";
  document.body.classList.add("hud-editing");
  $("hud").hidden = false;
  $("bInteract").hidden = false;
  $("layoutBar").hidden = false;
  select("atk");
  applyLayout();
  $("lbDone").focus();
}
export function closeLayoutEditor(save = true) {
  if (!isEditing()) return;
  if (!save && before) settings.layout = JSON.parse(before);
  saveSettings();
  document.body.classList.remove("hud-editing");
  $("layoutBar").hidden = true;
  select(null);
  applyLayout();
  GS.overlay = null;
  GS.paused = wasPaused;
  if (!GS.G) $("hud").hidden = true;
  closeCb?.();
  closeCb = null;
}
let closeCb: (() => void) | null = null;
export function onLayoutClosed(f: () => void) {
  closeCb = f;
}

export function initLayoutEditor() {
  const zone = document.createElement("div");
  zone.id = "centerZone";
  zone.className = "hud-center-zone";
  zone.setAttribute("aria-hidden", "true");
  zone.innerHTML = "<span>Vùng nhân vật: không đặt nút</span>";
  $("hud").append(zone);
  addEventListener("resize", applyLayout);
  screen.orientation?.addEventListener?.("change", () => setTimeout(applyLayout, 60));

  for (const b of HUD_BUTTONS) {
    const e = el(b);
    if (!e) continue;
    let sx = 0,
      sy = 0,
      ox = 0,
      oy = 0,
      prev = "",
      id: number | null = null;
    e.addEventListener(
      "pointerdown",
      (ev: PointerEvent) => {
        if (!isEditing()) return;
        ev.preventDefault();
        ev.stopPropagation();
        select(b);
        const r = rectOf(b);
        id = ev.pointerId;
        sx = ev.clientX;
        sy = ev.clientY;
        ox = r.x + r.w / 2;
        oy = r.y + r.h / 2;
        prev = JSON.stringify(settings.layout[b]);
        try {
          e.setPointerCapture(ev.pointerId);
        } catch {
          /* bỏ qua */
        }
        e.classList.add("is-dragging");
      },
      true,
    );
    e.addEventListener("pointermove", (ev: PointerEvent) => {
      if (!isEditing() || id !== ev.pointerId) return;
      const { vw, vh } = vp();
      settings.layout[b] = toItem(settings.layout[b], ox + ev.clientX - sx, oy + ev.clientY - sy, vw, vh, safeInsets());
      applyLayout();
      const { vw: w, vh: h } = vp();
      e.classList.toggle("is-bad", overlaps(rectOf(b), centerZone(w, h, CONTROLS.centerSafe)) || !valid());
    });
    const end = (ev: PointerEvent) => {
      if (id !== ev.pointerId) return;
      id = null;
      e.classList.remove("is-dragging", "is-bad");
      if (!valid()) {
        settings.layout[b] = JSON.parse(prev);
        applyLayout();
        flash("Không đặt được ở đó: nút sẽ che nhân vật, chồng nút khác hoặc ra ngoài màn");
      }
    };
    e.addEventListener("pointerup", end);
    e.addEventListener("pointercancel", end);
    e.addEventListener(
      "click",
      (ev) => {
        if (isEditing()) {
          ev.preventDefault();
          ev.stopImmediatePropagation();
        }
      },
      true,
    );
  }
  const slider = (id: string, k: "scale" | "opacity") =>
    $<HTMLInputElement>(id).addEventListener("input", (ev) => {
      if (!sel) return;
      const v = +(ev.target as HTMLInputElement).value;
      const old = settings.layout[sel][k];
      settings.layout[sel][k] = v;
      applyLayout();
      if (k === "scale" && !valid()) {
        settings.layout[sel][k] = old;
        (ev.target as HTMLInputElement).value = String(old);
        applyLayout();
        flash("Nút to hơn sẽ chồng nút khác hoặc che nhân vật");
      }
    });
  slider("lbScale", "scale");
  slider("lbOpacity", "opacity");
  $("lbReset").addEventListener("click", () => {
    resetLayout();
    select(sel ?? "atk");
    applyLayout();
    flash("Đã về bố cục mặc định");
  });
  $("lbDone").addEventListener("click", () => closeLayoutEditor(true));
  addEventListener(
    "keydown",
    (ev) => {
      if (ev.key === "Escape" && isEditing()) {
        ev.stopPropagation();
        closeLayoutEditor(true);
      }
    },
    true,
  );
}
