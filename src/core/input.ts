import { GS } from "../core/state";
import { press } from "../combat/actions";
import { cv } from "../core/canvas";
import { $ } from "../core/util";
import { switchTo } from "../entities/party";
import { doInteract } from "../modes/world";
import { pause, resume } from "../ui/modal";

export const keys: any = {};
export const joy: any = { x: 0, y: 0, active: false, id: null, ox: 0, oy: 0 };
// joystick
export const jz = $("joyZone"),
  jEl = $("joy"),
  jK = $("joyKnob");
export const jEnd = (e: any) => {
  if (e.pointerId !== joy.id) return;
  joy.active = false;
  joy.x = 0;
  joy.y = 0;
  jEl.style.display = "none";
};
export function holdBtn(el: HTMLElement, down: () => void, up?: () => void) {
  el.addEventListener("pointerdown", (e: any) => {
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    down();
  });
  el.addEventListener("pointerup", () => up && up());
  el.addEventListener("pointercancel", () => up && up());
  el.addEventListener("contextmenu", (e: any) => e.preventDefault());
}

export function init(): void {
  addEventListener("keydown", (e: any) => {
    const k = e.key.toLowerCase();
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
    if (GS.scene === "play" && !GS.paused) {
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
      if (k === "e" && !e.repeat) press("skill");
      if (k === "q" && !e.repeat) press("burst");
      if (k === "shift" && !e.repeat) {
        GS.holdDash = true;
        GS.G.p.dashHeld = 0;
        press("dash");
      }
      if (k === "f" && !e.repeat) doInteract();
      if (["1", "2", "3", "4"].includes(k)) switchTo(+k - 1);
    }
    if (k === "escape" && GS.scene === "play") {
      if (GS.paused && !$("modal").hidden && GS.G && !GS.G._ended) resume();
      else if (!GS.paused) pause();
    }
    keys[k] = true;
  });
  addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    keys[k] = false;
    if (k === "shift") GS.holdDash = false;
  });
  addEventListener("blur", () => {
    for (const k in keys) keys[k] = false;
    GS.holdAtk = false;
    GS.holdDash = false;
    if (GS.scene === "play" && !GS.paused && GS.G && !GS.G.over) pause();
  });
  cv.addEventListener("pointerdown", (e: PointerEvent) => {
    if (GS.scene === "play" && e.pointerType === "mouse") {
      GS.holdAtk = true;
    }
  });
  addEventListener("pointerup", (e) => {
    if (e.pointerType === "mouse") GS.holdAtk = false;
  });
  jz.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") {
      GS.holdAtk = true;
      return;
    }
    GS.isTouch = true;
    joy.active = true;
    joy.id = e.pointerId;
    joy.ox = e.clientX;
    joy.oy = e.clientY;
    jEl.style.display = "block";
    jEl.style.left = e.clientX - 60 + "px";
    jEl.style.top = e.clientY - 60 + "px";
    jK.style.transform = "translate(0,0)";
    jz.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  jz.addEventListener("pointermove", (e) => {
    if (!joy.active || e.pointerId !== joy.id) return;
    let dx = e.clientX - joy.ox,
      dy = e.clientY - joy.oy;
    const L = Math.hypot(dx, dy),
      mx = 50;
    if (L > mx) {
      dx = (dx / L) * mx;
      dy = (dy / L) * mx;
    }
    joy.x = dx / mx;
    joy.y = dy / mx;
    jK.style.transform = `translate(${dx}px,${dy}px)`;
  });
  jz.addEventListener("pointerup", jEnd);
  jz.addEventListener("pointercancel", jEnd);
  holdBtn(
    $("bAtk"),
    () => {
      GS.holdAtk = true;
      press("atk");
    },
    () => (GS.holdAtk = false),
  );
  holdBtn($("bSkill"), () => press("skill"));
  holdBtn($("bBurst"), () => press("burst"));
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
