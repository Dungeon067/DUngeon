import { renderer3d } from "../render3d/select";
import { skillDown, skillUp, skipCine } from "../combat/kits/run";
import { GS } from "../core/state";
import { press } from "../combat/actions";
import { cv } from "../core/canvas";
import { $ } from "../core/util";
import { switchTo } from "../entities/party";
import { doInteract } from "../modes/world";
import { dialogNext, dialogOpen } from "../ui/dialog";
import { storyDialogOpen, storyNext } from "../story/story";
import { chestRevealOpen, closeChestReveal } from "../ui/chest-reveal";
import { pause, resume } from "../ui/modal";
import { ACTIONS, type Action } from "../data/schema";
import { CONTROLS } from "../data/content";
import { actionForKey, settings } from "./settings";

/* =========================================================
   NHẬP LIỆU (S09): bàn phím theo phím đã đặt, chuột, cần điều khiển
   cảm ứng (cố định hoặc động), nút cảm ứng. Tay cầm ở core/gamepad.ts.
   ========================================================= */

/** Thao tác đang giữ (bàn phím hoặc tay cầm). */
export const held = Object.fromEntries(ACTIONS.map((a) => [a, false])) as Record<Action, boolean>;
const keyHeld = new Set<string>();
export const joy = { x: 0, y: 0, active: false, id: null as number | null, ox: 0, oy: 0 };
/** Cần trái của tay cầm, gamepad.ts ghi vào. */
export const pad = { x: 0, y: 0 };

/** Đổi độ lệch ngón tay thành hướng chạy, áp vùng chết và độ nhạy. Trả về [x, y] với độ dài ≤ 1. */
export function joyVector(dx: number, dy: number, radius: number, deadzone: number, sensitivity: number) {
  const L = Math.hypot(dx, dy) / radius;
  if (L <= deadzone || L === 0) return [0, 0] as [number, number];
  const mag = Math.min(1, ((Math.min(L, 1) - deadzone) / (1 - deadzone)) * sensitivity);
  const n = Math.hypot(dx, dy);
  return [(dx / n) * mag, (dy / n) * mag] as [number, number];
}

export function moveAxis(): [number, number] {
  const kx = (held.right ? 1 : 0) - (held.left ? 1 : 0),
    ky = (held.down ? 1 : 0) - (held.up ? 1 : 0);
  return [kx + joy.x + pad.x, ky + joy.y + pad.y];
}

/** Đang chờ người chơi bấm phím mới (màn đổi phím). */
let capture: ((code: string) => void) | null = null;
export function captureNextKey(f: ((code: string) => void) | null) {
  capture = f;
}

const playing = () => GS.scene === "play" && !!GS.G && !GS.paused;
let mapToggle: () => void = () => {};
export function onMapAction(f: () => void) {
  mapToggle = f;
}

/** Bấm một thao tác (bàn phím, tay cầm). */
export function actionDown(a: Action) {
  if (dialogOpen()) {
    if (a === "interact" || a === "attack" || a === "jump") dialogNext();
    return;
  }
  // Màn mở rương: phím xác nhận chỉ đóng màn; phím khác (đổi người, di chuyển...) đóng màn rồi làm tiếp như thường.
  if (chestRevealOpen()) {
    closeChestReveal();
    if (a === "interact" || a === "attack" || a === "jump" || a === "pause") return;
  }
  if (storyDialogOpen()) {
    if (a === "interact" || a === "attack" || a === "jump") storyNext();
    return;
  }
  if (a === "pause") {
    if (GS.scene !== "play" || !GS.G) return;
    if (GS.overlay) return;
    if (GS.paused && !$("modal").hidden && !GS.G._ended) resume();
    else if (!GS.paused) pause();
    return;
  }
  if (a === "map") {
    if (GS.scene === "play" && GS.G?.mode === "world" && (!GS.paused || GS.overlay === "menu")) mapToggle();
    return;
  }
  held[a] = true;
  if (!playing()) return;
  // Cảnh nộ (S30): bấm nút chiến đấu để bỏ qua.
  if ((a === "attack" || a === "skill" || a === "burst" || a === "jump") && skipCine()) return;
  if (a === "attack") press("atk");
  else if (a === "skill") skillDown(() => press("skill"));
  else if (a === "burst") press("burst");
  else if (a === "jump") press("jump");
  else if (a === "dash") {
    GS.holdDash = true;
    GS.G.p.dashHeld = 0;
    press("dash");
  } else if (a === "interact") doInteract();
  else if (a === "p1" || a === "p2" || a === "p3" || a === "p4") switchTo(+a[1]! - 1);
}
export function actionUp(a: Action) {
  held[a] = false;
  if (a === "dash") GS.holdDash = false;
  if (a === "skill") skillUp();
}
export function releaseAll() {
  joy.x = joy.y = 0;
  pad.x = pad.y = 0;
  for (const a of ACTIONS) held[a] = false;
  keyHeld.clear();
  GS.holdAtk = false;
  GS.holdDash = false;
}

export function holdBtn(el: HTMLElement, down: () => void, up?: () => void) {
  el.addEventListener("pointerdown", (e: PointerEvent) => {
    e.preventDefault();
    if (document.body.classList.contains("hud-editing")) return;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* phần tử đã bị gỡ */
    }
    el.classList.add("is-active");
    down();
  });
  const end = () => {
    el.classList.remove("is-active");
    if (up) up();
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener("contextmenu", (e) => e.preventDefault());
}

/** Toạ độ thế giới của điểm trên màn hình (cùng phép biến đổi với render.ts). */
export function screenToWorld(sx: number, sy: number) {
  const G = GS.G;
  const r3 = renderer3d();
  if (r3) return r3.unproject(sx, sy);
  return { x: G.cam.x + (sx - GS.VW / 2) / GS.ZOOM, y: G.cam.y + (sy - GS.VH / 2) / GS.ZOOM };
}

const isField = (t: any) => t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA");

export function init(): void {
  addEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (capture) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const f = capture;
        capture = null;
        f(e.code);
        return;
      }
      if (isField(e.target)) return;
      const a = actionForKey(e.code);
      if (!a) return;
      if (GS.scene === "play" && !GS.paused && a !== "pause") e.preventDefault();
      if (e.repeat) return;
      keyHeld.add(e.code);
      actionDown(a);
    },
    true,
  );
  addEventListener("keyup", (e: KeyboardEvent) => {
    keyHeld.delete(e.code);
    const a = actionForKey(e.code);
    if (!a) return;
    // Thao tác còn phím khác đang giữ thì chưa thả.
    if (settings.keys[a].some((k) => keyHeld.has(k))) return;
    actionUp(a);
  });
  addEventListener("blur", () => {
    releaseAll();
    if (GS.scene === "play" && !GS.paused && GS.G && !GS.G.over) pause();
  });

  /* ---------- chuột ---------- */
  cv.addEventListener("pointerdown", (e: PointerEvent) => {
    if (GS.scene !== "play" || e.pointerType !== "mouse" || e.button !== 0) return;
    GS.holdAtk = true;
    if (playing() && !skipCine()) press("atk");
  });
  addEventListener("pointerup", (e) => {
    if (e.pointerType === "mouse") GS.holdAtk = false;
  });
  const hover = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    GS.mouse.sx = e.clientX;
    GS.mouse.sy = e.clientY;
    GS.mouse.inside = true;
    if (GS.scene !== "play" || !GS.G) return;
    const w = screenToWorld(e.clientX, e.clientY);
    GS.mouse.wx = w.x;
    GS.mouse.wy = w.y;
    const over = GS.G.enemies.some(
      (en: any) => !en.dead && Math.hypot(en.x - w.x, en.y - (en.isBoss ? 30 : 14) - w.y) < en.r + 14,
    );
    document.body.classList.toggle("cursor-enemy", over);
  };
  cv.addEventListener("pointermove", hover);
  $("joyZone").addEventListener("pointermove", hover);
  cv.addEventListener("pointerleave", () => {
    GS.mouse.inside = false;
    document.body.classList.remove("cursor-enemy");
  });

  /* ---------- camera 3D (S25): kéo chuột phải hoặc kéo màn hình để xoay, lăn chuột hoặc chụm hai ngón để zoom ---------- */
  const drag = new Map<number, { x: number; y: number }>();
  let pinch = 0;
  cv.addEventListener("pointerdown", (e: PointerEvent) => {
    if (!renderer3d() || GS.scene !== "play") return;
    if (e.pointerType === "mouse" && e.button !== 2) return;
    drag.set(e.pointerId, { x: e.clientX, y: e.clientY });
    pinch = 0;
  });
  addEventListener("pointermove", (e: PointerEvent) => {
    const d = drag.get(e.pointerId);
    if (!d) return;
    if (drag.size === 1) {
      GS.camYaw -= (e.clientX - d.x) * 0.006;
      GS.camPitch = Math.min(1.2, Math.max(0.2, GS.camPitch + (e.clientY - d.y) * 0.004));
    } else if (drag.size === 2) {
      const [a, b] = [...drag.values()];
      d.x = e.clientX;
      d.y = e.clientY;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch) GS.camDist = Math.min(22, Math.max(6, GS.camDist * (pinch / dist)));
      pinch = dist;
      return;
    }
    d.x = e.clientX;
    d.y = e.clientY;
  });
  const dragEnd = (e: PointerEvent) => {
    drag.delete(e.pointerId);
    pinch = 0;
  };
  addEventListener("pointerup", dragEnd);
  addEventListener("pointercancel", dragEnd);
  cv.addEventListener("contextmenu", (e: Event) => {
    if (renderer3d()) e.preventDefault();
  });
  cv.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (!renderer3d() || GS.scene !== "play") return;
      e.preventDefault();
      GS.camDist = Math.min(22, Math.max(6, GS.camDist * (e.deltaY > 0 ? 1.1 : 1 / 1.1)));
    },
    { passive: false },
  );

  /* ---------- cần điều khiển cảm ứng ---------- */
  const jz = $("joyZone"),
    jEl = $("joy"),
    jK = $("joyKnob");
  const R = () => CONTROLS.joystick.radius;
  const jEnd = (e: PointerEvent) => {
    if (e.pointerId !== joy.id) return;
    joy.active = false;
    joy.id = null;
    joy.x = 0;
    joy.y = 0;
    jEl.classList.remove("is-active");
    jEl.style.left = "";
    jEl.style.top = "";
    jK.style.transform = "";
  };
  jz.addEventListener("pointerdown", (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      GS.holdAtk = true;
      return;
    }
    if (document.body.classList.contains("hud-editing") || joy.active) return;
    GS.isTouch = true;
    document.documentElement.dataset.input = "touch";
    joy.active = true;
    joy.id = e.pointerId;
    if (settings.joystick.mode === "dynamic") {
      joy.ox = e.clientX;
      joy.oy = e.clientY;
      const box = jEl.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0 };
      jEl.style.left = e.clientX - box.left + "px";
      jEl.style.top = e.clientY - box.top + "px";
    } else {
      const r = jEl.getBoundingClientRect();
      joy.ox = r.left + r.width / 2;
      joy.oy = r.top + r.height / 2;
    }
    jEl.classList.add("is-active");
    jK.style.transform = "translate(-50%,-50%)";
    try {
      jz.setPointerCapture(e.pointerId);
    } catch {
      /* bỏ qua */
    }
    e.preventDefault();
    moveKnob(e);
  });
  const moveKnob = (e: PointerEvent) => {
    if (!joy.active || e.pointerId !== joy.id) return;
    let dx = e.clientX - joy.ox,
      dy = e.clientY - joy.oy;
    const [vx, vy] = joyVector(dx, dy, R(), settings.joystick.deadzone, settings.joystick.sensitivity);
    joy.x = vx;
    joy.y = vy;
    const L = Math.hypot(dx, dy);
    if (L > R()) {
      dx = (dx / L) * R();
      dy = (dy / L) * R();
    }
    jK.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  };
  jz.addEventListener("pointermove", moveKnob);
  jz.addEventListener("pointerup", jEnd);
  jz.addEventListener("pointercancel", jEnd);
  addEventListener("touchstart", () => (document.documentElement.dataset.input = "touch"), { passive: true });
  addEventListener("mousemove", () => {
    if (!GS.isTouch) document.documentElement.dataset.input = "mouse";
  });

  /* ---------- nút cảm ứng ---------- */
  holdBtn(
    $("bAtk"),
    () => {
      GS.holdAtk = true;
      press("atk");
    },
    () => (GS.holdAtk = false),
  );
  holdBtn(
    $("bSkill"),
    () => skipCine() || skillDown(() => press("skill")),
    () => skillUp(),
  );
  holdBtn($("bBurst"), () => press("burst"));
  holdBtn($("bJump"), () => press("jump"));
  holdBtn(
    $("bDash"),
    () => {
      GS.holdDash = true;
      GS.G.p.dashHeld = 0;
      press("dash");
    },
    () => (GS.holdDash = false),
  );
  $("bInteract").addEventListener("click", doInteract);
  $("pauseBtn").addEventListener("click", () => pause());
}
