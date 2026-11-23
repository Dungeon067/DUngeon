import { GS } from "../core/state";
import { CONTROLS } from "../data/content";
import { ACTIONS, type Action } from "../data/schema";
import {
  applyDocumentSettings,
  bindKey,
  keyLabel,
  resetKeys,
  saveSettings,
  settings,
  unboundActions,
  type ColorMode,
  type Quality,
  type RendererPref,
} from "../core/settings";
import { applyRenderer } from "../render3d/select";
import { captureNextKey } from "../core/input";
import { resize } from "../core/canvas";
import { applyVolumes } from "../core/audio";
import { padLabelFor, padState } from "../core/gamepad";
import { button, openDialog, slider, tabs, toast, toggle } from "./ds";
import { onLayoutClosed, openLayoutEditor } from "./hud/layout";
import {
  RELEASES_URL,
  canInstall,
  fullscreenSupported,
  isFullscreen,
  isIOS,
  isNativeApp,
  isStandalone,
  onInstallChange,
  promptInstall,
  toggleFullscreen,
} from "./pwa";

/* =========================================================
   HỘP CÀI ĐẶT (S09). Mở từ nút Cài đặt trên HUD và từ hộp Tạm dừng.
   Không phải màn hình menu (S10 làm); chỉ là hộp thoại phủ lên game.
   ========================================================= */

export const ACTION_VI: Record<Action, string> = {
  up: "Đi lên",
  down: "Đi xuống",
  left: "Sang trái",
  right: "Sang phải",
  attack: "Đánh",
  skill: "Kỹ năng",
  burst: "Nộ",
  dash: "Lướt",
  jump: "Nhảy",
  interact: "Tương tác",
  p1: "Đổi người 1",
  p2: "Đổi người 2",
  p3: "Đổi người 3",
  p4: "Đổi người 4",
  map: "Bản đồ",
  pause: "Tạm dừng",
};

const h = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  kids: (Node | string)[] = [],
) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  e.append(...kids);
  return e;
};
function choice<T extends string>(label: string, opts: [T, string][], cur: T, on: (v: T) => void) {
  const id = "st-" + Math.random().toString(36).slice(2, 7);
  const sel = h("select", { id, class: "tt-input" });
  for (const [v, l] of opts) {
    const o = h("option", { value: v }, [l]);
    if (v === cur) o.selected = true;
    sel.append(o);
  }
  sel.addEventListener("change", () => on(sel.value as T));
  return h("div", { class: "tt-field" }, [h("label", { for: id }, [label]), sel]);
}
function pct(
  label: string,
  v: number,
  on: (v: number) => void,
  o: { min?: number; max?: number; step?: number; unit?: string } = {},
) {
  const f = slider(label, Math.round(v * 100), {
    min: o.min ?? 0,
    max: o.max ?? 100,
    step: o.step ?? 5,
    unit: o.unit ?? "%",
  });
  f.querySelector("input")!.addEventListener("input", (e) => on(+(e.target as HTMLInputElement).value / 100));
  return f;
}
const sw = (label: string, on: boolean, f: (v: boolean) => void) => toggle(label, on, { onChange: f });
const commit = () => {
  saveSettings();
  applyDocumentSettings();
};

function panelGeneral() {
  return h("div", { class: "st-grid" }, [
    pct("Âm lượng tổng", settings.master, (v) => ((settings.master = v), commit(), applyVolumes())),
    pct("Nhạc", settings.music, (v) => ((settings.music = v), commit(), applyVolumes())),
    pct("Hiệu ứng âm thanh", settings.sfx, (v) => ((settings.sfx = v), commit(), applyVolumes())),
    choice<Quality>(
      "Chất lượng hình",
      [
        ["high", "Cao (nét nhất)"],
        ["medium", "Vừa"],
        ["low", "Thấp (mượt hơn trên máy yếu)"],
      ],
      settings.quality,
      (v) => ((settings.quality = v), commit(), resize(), void applyRenderer()),
    ),
    choice<RendererPref>(
      "Lớp vẽ thế giới",
      [
        ["auto", "Tự chọn (3D nếu máy hỗ trợ)"],
        ["3d", "3D (WebGL)"],
        ["2d", "2D (bản cũ, nhẹ nhất)"],
      ],
      settings.renderer,
      (v) => ((settings.renderer = v), commit(), applyRenderer()),
    ),
    pct("Cỡ chữ", settings.fontScale, (v) => ((settings.fontScale = v), commit()), { min: 80, max: 140, step: 10 }),
    choice<ColorMode>(
      "Chế độ màu cho người mù màu",
      [
        ["none", "Tắt"],
        ["protan", "Khó thấy màu đỏ"],
        ["deutan", "Khó thấy màu lục"],
        ["tritan", "Khó thấy màu lam"],
      ],
      settings.colorMode,
      (v) => ((settings.colorMode = v), commit()),
    ),
    sw("Rung màn hình khi đánh", settings.shake, (v) => ((settings.shake = v), commit())),
    sw("Rung máy khi trúng đòn (điện thoại)", settings.vibrate, (v) => ((settings.vibrate = v), commit())),
    sw("Hiện gợi ý HUD lần đầu", settings.showHints, (v) => ((settings.showHints = v), commit())),
  ]);
}

/* S22: toàn màn hình, cài PWA, tải bản cài đặt. */
function panelApp() {
  const rows: (Node | string)[] = [];
  if (fullscreenSupported()) {
    const fs = button(isFullscreen() ? "Thoát toàn màn hình" : "Toàn màn hình", {
      variant: "primary",
      onClick: () => void toggleFullscreen(),
    });
    fs.id = "stFullscreen";
    const sync = () => (fs.textContent = isFullscreen() ? "Thoát toàn màn hình" : "Toàn màn hình");
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    rows.push(h("div", { class: "st-row" }, [fs]));
  }
  if (!isStandalone()) {
    const inst = button("Cài đặt", {
      variant: "primary",
      onClick: () => void promptInstall().then((ok) => ok && toast("Đã cài Tinh Tú lên máy")),
    });
    inst.id = "stInstall";
    const sync = () => {
      inst.hidden = !canInstall();
      if (inst.isConnected) inst.dataset.mounted = "1";
      else if (inst.dataset.mounted) off();
    };
    const off = onInstallChange(sync);
    sync();
    rows.push(h("div", { class: "st-row" }, [inst]));
    rows.push(
      h("p", { class: "st-note" }, [
        isIOS()
          ? "iPad/iPhone: mở game bằng Safari, chạm nút Chia sẻ rồi chọn “Thêm vào MH chính”. Mở Tinh Tú từ màn hình chính để chơi không còn thanh địa chỉ."
          : "Chrome/Edge: bấm “Cài đặt” ở trên (hoặc biểu tượng cài trên thanh địa chỉ) để thêm Tinh Tú như một ứng dụng. Chơi được cả khi mất mạng.",
      ]),
    );
  }
  const a = h(
    "a",
    { class: "tt-btn tt-btn--secondary", id: "stReleases", href: RELEASES_URL, target: "_blank", rel: "noopener" },
    ["Tải bản cài đặt"],
  );
  rows.push(h("div", { class: "st-row" }, [a]));
  rows.push(
    h("p", { class: "st-note" }, [
      isNativeApp()
        ? "Bạn đang dùng bản cài đặt. Bản mới nằm ở trang Tải bản cài đặt (GitHub Releases)."
        : "Bản Android (APK), Windows, macOS và Linux nằm ở trang Tải bản cài đặt (GitHub Releases), miễn phí.",
    ]),
  );
  return h("div", { class: "st-grid" }, rows);
}

function panelControls(close: () => void) {
  const J = settings.joystick;
  return h("div", { class: "st-grid" }, [
    choice(
      "Cần điều khiển (cảm ứng)",
      [
        ["dynamic", "Động: hiện ở chỗ đặt ngón"],
        ["fixed", "Cố định: đứng yên ở góc trái"],
      ],
      J.mode,
      (v) => ((J.mode = v), commit()),
    ),
    pct("Vùng chết của cần", J.deadzone, (v) => ((J.deadzone = v), commit()), { min: 0, max: 50 }),
    pct("Độ nhạy của cần", J.sensitivity, (v) => ((J.sensitivity = v), commit()), { min: 50, max: 200, step: 10 }),
    sw("Ngắm bằng chuột (máy tính)", settings.mouseAim, (v) => ((settings.mouseAim = v), commit())),
    h("div", { class: "st-row" }, [
      button("Chỉnh bố cục nút", {
        variant: "primary",
        icon: "bang-dieu-khien",
        onClick: () => {
          close();
          const pm = document.getElementById("modal");
          const pmOpen = !!pm && !pm.hidden;
          if (pm) pm.hidden = true;
          onLayoutClosed(() => {
            if (pm && pmOpen) pm.hidden = false;
            openSettings("controls");
          });
          openLayoutEditor(pausedBefore);
        },
      }),
    ]),
    h("p", { class: "st-note" }, [
      "Chỉnh bố cục: kéo nút tới chỗ mới, chọn nút rồi đổi cỡ và độ trong suốt. Nút không được che vùng giữa quanh nhân vật.",
    ]),
  ]);
}

function panelKeys(): HTMLElement {
  const box = h("div", { class: "st-keys" });
  const render = () => {
    box.innerHTML = "";
    const miss = unboundActions();
    if (miss.length)
      box.append(
        h("p", { class: "st-warn", role: "alert" }, [`Chưa có phím: ${miss.map((a) => ACTION_VI[a]).join(", ")}`]),
      );
    const tbl = h("table", { class: "st-table" });
    tbl.append(
      h("thead", {}, [
        h("tr", {}, [
          h("th", { scope: "col" }, ["Thao tác"]),
          h("th", { scope: "col" }, ["Phím chính"]),
          h("th", { scope: "col" }, ["Phím phụ"]),
          h("th", { scope: "col" }, ["Tay cầm"]),
        ]),
      ]),
    );
    const body = h("tbody");
    for (const a of ACTIONS) {
      const tr = h("tr", {}, [h("th", { scope: "row" }, [ACTION_VI[a]])]);
      for (const slot of [0, 1] as const) {
        const code = settings.keys[a][slot];
        const b = h(
          "button",
          { type: "button", class: "tt-btn tt-btn--secondary st-key", "data-action": a, "data-slot": String(slot) },
          [code ? keyLabel(code) : "Trống"],
        );
        b.setAttribute(
          "aria-label",
          `${ACTION_VI[a]}, phím ${slot ? "phụ" : "chính"}: ${code ? keyLabel(code) : "trống"}. Bấm để đổi`,
        );
        b.addEventListener("click", () => {
          b.textContent = "Bấm phím mới…";
          b.classList.add("is-wait");
          captureNextKey((c) => {
            if (c !== "Escape") {
              const other = bindKey(a, slot, c);
              saveSettings();
              if (other) toast(`${keyLabel(c)} đã chuyển từ "${ACTION_VI[other]}" sang "${ACTION_VI[a]}"`, "warn");
            }
            render();
            box.querySelector<HTMLElement>(`[data-action="${a}"][data-slot="${slot}"]`)?.focus();
          });
        });
        tr.append(h("td", {}, [b]));
      }
      tr.append(h("td", { class: "st-pad" }, [padLabelFor(a, padState.connected ? padState.brand : "xbox") || "·"]));
      body.append(tr);
    }
    tbl.append(body);
    box.append(
      tbl,
      h("div", { class: "st-row" }, [
        button("Về phím mặc định", {
          variant: "ghost",
          onClick: () => {
            resetKeys();
            render();
          },
        }),
      ]),
      h("p", { class: "st-note" }, [
        "Bấm ô phím rồi bấm phím mới; Esc để hủy. Phím đang dùng cho thao tác khác sẽ được đổi chỗ, không bao giờ trùng.",
      ]),
    );
  };
  render();
  return box;
}

let openNow: (() => void) | null = null;
let pausedBefore = false;
export function openSettings(tab: "general" | "controls" | "keys" | "app" = "general") {
  if (openNow) return;
  const wasPaused = GS.paused,
    prevOverlay = GS.overlay;
  pausedBefore = wasPaused;
  GS.paused = true;
  GS.overlay = "settings";
  const panels = h("div", { class: "st-panels" });
  let close: () => void = () => {};
  const show = (id: string) => {
    panels.innerHTML = "";
    panels.append(
      id === "controls"
        ? panelControls(() => close())
        : id === "keys"
          ? panelKeys()
          : id === "app"
            ? panelApp()
            : panelGeneral(),
    );
  };
  const tb = tabs(
    [
      { id: "general", label: "Chung", icon: "cai-dat" },
      { id: "controls", label: "Điều khiển", icon: "bang-dieu-khien" },
      { id: "keys", label: "Phím", icon: "huong-dan" },
      { id: "app", label: "Ứng dụng", icon: "da-sao" },
    ],
    tab,
    show,
  );
  const body = h("div", { class: "st-body", id: "settingsBody" }, [tb, panels]);
  const done = button("Xong", { variant: "primary" });
  done.dataset.back = "";
  close = openDialog({ title: "Cài đặt", body, actions: [done] });
  const scrim = body.closest(".tt-scrim") as HTMLElement;
  scrim.classList.add("st-scrim");
  scrim.id = "settingsDlg";
  openNow = close;
  const obs = new MutationObserver(() => {
    if (scrim.isConnected) return;
    obs.disconnect();
    openNow = null;
    captureNextKey(null);
    // Hộp đóng để mở lớp khác (chỉnh bố cục) thì lớp đó tự trả trạng thái tạm dừng.
    if (GS.overlay !== "settings") return;
    GS.overlay = prevOverlay === "settings" ? null : prevOverlay;
    GS.paused = wasPaused;
  });
  obs.observe(document.body, { childList: true });
  void CONTROLS;
}
