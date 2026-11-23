/* Thư viện thành phần (S08). Mỗi hàm trả về phần tử DOM; CSS ở ds.css. Xem docs/ux/he-thong-thiet-ke.md. */
import "./ds.css";
import "./the-do.css";
import { ELEMENT_ICON, icon, iconSvg } from "../icons/icons";
import type { Rarity } from "../tokens";

type Kids = (Node | string | null | undefined | false)[];
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number | boolean | undefined> = {},
  kids: Kids = [],
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue;
    if (k === "class") el.className = String(v);
    else if (k === "style") el.setAttribute("style", String(v));
    else el.setAttribute(k, v === true ? "" : String(v));
  }
  for (const c of kids) if (c) el.append(c);
  return el;
}

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export interface ButtonOpts {
  variant?: ButtonVariant;
  icon?: string;
  /** Nút chỉ có biểu tượng: bắt buộc có `label` để đọc bằng trình đọc màn hình. */
  iconOnly?: boolean;
  size?: "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: MouseEvent) => void;
}
export function button(label: string, o: ButtonOpts = {}): HTMLButtonElement {
  const cls = ["tt-btn", `tt-btn--${o.variant ?? "secondary"}`];
  if (o.iconOnly) cls.push("tt-btn--icon");
  if (o.size === "lg") cls.push("tt-btn--lg");
  const b = h("button", {
    type: "button",
    class: cls.join(" "),
    disabled: o.disabled,
    "aria-label": o.iconOnly ? label : undefined,
  });
  if (o.icon) b.append(icon(o.icon, { size: o.iconOnly ? 22 : 20 }));
  if (!o.iconOnly) b.append(h("span", { class: "tt-btn-label" }, [label]));
  if (o.onClick) b.addEventListener("click", o.onClick);
  setLoading(b, !!o.loading);
  return b;
}
/** Đang tải: giữ nguyên chữ để nút không đổi kích thước, thêm vòng quay và aria-busy. */
export function setLoading(b: HTMLButtonElement, on: boolean) {
  b.querySelector(".tt-spinner")?.remove();
  b.toggleAttribute("aria-busy", on);
  if (on) {
    b.setAttribute("aria-busy", "true");
    b.prepend(h("span", { class: "tt-spinner", "aria-hidden": "true" }));
  }
}

export function badgeDot(host: HTMLElement, count?: number, label = "Có mục mới") {
  host.classList.add("tt-dot-host");
  host.querySelector(":scope > .tt-dot")?.remove();
  const d = h("span", { class: "tt-dot", role: "status", "aria-label": count ? `${count} mục mới` : label });
  if (count) d.dataset.count = count > 99 ? "99+" : String(count);
  host.append(d);
  return host;
}

const fmt = new Intl.NumberFormat("vi-VN");
export function currency(kind: "da-sao" | "xu", amount: number, onAdd?: () => void) {
  const name = kind === "da-sao" ? "Đá Sao" : "Xu";
  const el = h("div", { class: "tt-currency", "data-kind": kind }, [
    icon(kind, { size: 20, title: name }),
    h("span", { class: "v" }, [fmt.format(amount)]),
  ]);
  if (onAdd) el.append(button(`Thêm ${name}`, { iconOnly: true, icon: "them", variant: "ghost", onClick: onAdd }));
  return el;
}

export function progress(
  value: number,
  o: { kind?: "hp" | "thin"; label?: string; text?: string; loading?: boolean } = {},
) {
  const v = Math.max(0, Math.min(1, value));
  const bar = h(
    "div",
    {
      class: [
        "tt-progress",
        o.kind && `tt-progress--${o.kind}`,
        o.kind === "hp" && v < 0.3 && "is-low",
        o.loading && "is-loading",
      ]
        .filter(Boolean)
        .join(" "),
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": o.loading ? undefined : Math.round(v * 100),
      "aria-label": o.label,
      style: `--v:${v}`,
    },
    [h("span")],
  );
  if (!o.label) return bar;
  return h("div", { class: "tt-progress-row" }, [
    h("div", { class: "lb" }, [h("span", {}, [o.label]), h("b", {}, [o.text ?? `${Math.round(v * 100)}%`])]),
    bar,
  ]);
}

/** Tab theo mẫu WAI-ARIA: mũi tên trái/phải để chuyển. */
export function tabs(
  items: { id: string; label: string; icon?: string; disabled?: boolean }[],
  selected: string,
  onChange?: (id: string) => void,
) {
  const list = h("div", { class: "tt-tabs", role: "tablist" });
  const select = (id: string, focus = false) => {
    for (const t of list.querySelectorAll<HTMLButtonElement>(".tt-tab")) {
      const on = t.dataset.id === id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    }
    onChange?.(id);
  };
  for (const it of items) {
    const t = h("button", { type: "button", class: "tt-tab", role: "tab", "data-id": it.id, disabled: it.disabled }, [
      it.icon ? icon(it.icon, { size: 18 }) : null,
      it.label,
    ]);
    t.addEventListener("click", () => select(it.id));
    list.append(t);
  }
  list.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const on = items.filter((i) => !i.disabled);
    const cur = on.findIndex((i) => i.id === (document.activeElement as HTMLElement)?.dataset.id);
    const next = on[(cur + (e.key === "ArrowRight" ? 1 : -1) + on.length) % on.length]!;
    select(next.id, true);
  });
  select(selected);
  return list;
}

export interface DialogOpts {
  title: string;
  body: Node | string;
  actions?: HTMLButtonElement[];
  /** Khung trống đồng cho hộp thoại quan trọng (thắng, nhận nhân vật, xác nhận tiêu Đá Sao). */
  ornate?: boolean;
}
export function dialogBox(o: DialogOpts) {
  const id = "tt-dlg-" + Math.random().toString(36).slice(2, 8);
  const box = h(
    "div",
    {
      class: `tt-dialog${o.ornate ? " tt-frame-drum" : ""}`,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": id,
    },
    [
      h("h2", { class: "tt-h3", id }, [o.title]),
      h("div", { class: "tt-dialog-body" }, [o.body]),
      o.actions?.length ? h("div", { class: "tt-dialog-actions" }, o.actions) : null,
    ],
  );
  return box;
}
/** Mở hộp thoại có lớp phủ; Esc hoặc bấm ra ngoài để đóng; trả focus về chỗ cũ. */
export function openDialog(o: DialogOpts) {
  const prev = document.activeElement as HTMLElement | null;
  const box = dialogBox(o);
  const scrim = h("div", { class: "tt-scrim tt-root" }, [box]);
  const close = () => {
    scrim.remove();
    document.removeEventListener("keydown", onKey);
    prev?.focus();
  };
  /* Giữ focus trong hộp thoại: Tab và Shift+Tab quay vòng giữa các phần tử bấm được. */
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key !== "Tab") return;
    const f = [
      ...box.querySelectorAll<HTMLElement>(
        "button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [href], [contenteditable=true], [tabindex]:not([tabindex='-1'])",
      ),
    ];
    if (!f.length) return e.preventDefault();
    const first = f[0]!;
    const last = f[f.length - 1]!;
    const inBox = box.contains(document.activeElement);
    if (e.shiftKey && (document.activeElement === first || !inBox)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !inBox)) {
      e.preventDefault();
      first.focus();
    }
  };
  scrim.addEventListener("click", (e) => e.target === scrim && close());
  for (const b of o.actions ?? []) b.addEventListener("click", close);
  document.addEventListener("keydown", onKey);
  document.body.append(scrim);
  (box.querySelector<HTMLElement>(".tt-btn--primary") ?? box.querySelector<HTMLElement>("button"))?.focus();
  return close;
}

export type ToastKind = "ok" | "warn" | "bad" | "info";
const TOAST_ICON: Record<ToastKind, string> = { ok: "thanh-cong", warn: "canh-bao", bad: "bao-loi", info: "thong-tin" };
export function toastEl(msg: string, kind: ToastKind = "info") {
  return h("div", { class: "tt-toast", "data-kind": kind }, [
    icon(TOAST_ICON[kind], { size: 20 }),
    h("span", {}, [msg]),
  ]);
}
export function toast(msg: string, kind: ToastKind = "info", ms = 2600) {
  let host = document.querySelector<HTMLElement>(".tt-toasts");
  if (!host) {
    host = h("div", { class: "tt-toasts tt-root", role: "status", "aria-live": "polite" });
    document.body.append(host);
  }
  const t = toastEl(msg, kind);
  host.append(t);
  setTimeout(() => t.remove(), ms);
  return t;
}

export interface ListItem {
  title: string;
  sub?: string;
  icon?: string;
  end?: string;
  current?: boolean;
  disabled?: boolean;
}
export function list(items: ListItem[], onPick?: (i: number) => void) {
  return h(
    "ul",
    { class: "tt-list" },
    items.map((it, i) => {
      const b = h(
        "button",
        {
          type: "button",
          class: "tt-list-item",
          "aria-current": it.current ? "true" : undefined,
          disabled: it.disabled,
        },
        [
          it.icon ? icon(it.icon, { size: 22 }) : null,
          h("span", { class: "main" }, [h("span", {}, [it.title]), it.sub ? h("small", {}, [it.sub]) : null]),
          h("span", { class: "end" }, [it.end ?? "", icon(it.disabled ? "khoa" : "tiep", { size: 18 })]),
        ],
      );
      if (onPick) b.addEventListener("click", () => onPick(i));
      return h("li", {}, [b]);
    }),
  );
}

export function field(
  label: string,
  o: { value?: string; placeholder?: string; hint?: string; error?: string; disabled?: boolean; type?: string } = {},
) {
  const id = "tt-in-" + Math.random().toString(36).slice(2, 8);
  const input = h("input", {
    id,
    class: "tt-input",
    type: o.type ?? "text",
    value: o.value,
    placeholder: o.placeholder,
    disabled: o.disabled,
    "aria-invalid": o.error ? "true" : undefined,
    "aria-describedby": o.hint || o.error ? id + "-h" : undefined,
  });
  return h("div", { class: `tt-field${o.error ? " is-error" : ""}` }, [
    h("label", { for: id }, [label]),
    input,
    o.error || o.hint ? h("div", { class: "hint", id: id + "-h" }, [o.error ?? o.hint!]) : null,
  ]);
}

export function toggle(label: string, on = false, o: { disabled?: boolean; onChange?: (on: boolean) => void } = {}) {
  const b = h(
    "button",
    { type: "button", class: "tt-switch", role: "switch", "aria-checked": String(on), disabled: o.disabled },
    [h("span", { class: "track", "aria-hidden": "true" }), h("span", {}, [label])],
  );
  b.addEventListener("click", () => {
    const v = b.getAttribute("aria-checked") !== "true";
    b.setAttribute("aria-checked", String(v));
    o.onChange?.(v);
  });
  return b;
}

export function slider(
  label: string,
  value: number,
  o: { min?: number; max?: number; step?: number; disabled?: boolean; unit?: string } = {},
) {
  const min = o.min ?? 0;
  const max = o.max ?? 100;
  const id = "tt-sl-" + Math.random().toString(36).slice(2, 8);
  const out = h("b", {}, [`${value}${o.unit ?? ""}`]);
  const input = h("input", {
    id,
    class: "tt-slider",
    type: "range",
    min,
    max,
    step: o.step ?? 1,
    value,
    disabled: o.disabled,
  });
  const paint = () => {
    input.style.setProperty("--v", `${((+input.value - min) / (max - min)) * 100}%`);
    out.textContent = `${input.value}${o.unit ?? ""}`;
  };
  input.addEventListener("input", paint);
  paint();
  return h("div", { class: "tt-field" }, [
    h("label", { for: id, style: "display:flex;justify-content:space-between" }, [label, out]),
    input,
  ]);
}

export function elementBadge(el: string, o: { label?: boolean; size?: number; name?: string } = {}) {
  const name = o.name ?? el;
  return h("span", { class: "tt-el", "data-el": el }, [
    icon(ELEMENT_ICON[el] ?? "sao", { size: o.size ?? 20, title: o.label ? undefined : name }),
    o.label ? name : null,
  ]);
}

export function stars(r: Rarity, size = 14) {
  const s = h("span", { class: "tt-stars", "data-r": r, role: "img", "aria-label": `${r} sao` });
  s.innerHTML = iconSvg("sao", { size }).repeat(r);
  return s;
}

export function portraitFrame(
  art: HTMLCanvasElement | null,
  o: { rarity: Rarity; el?: string; elName?: string; size?: number; down?: boolean },
) {
  const f = h("div", {
    class: `tt-portrait${o.down ? " is-down" : ""}`,
    "data-r": o.rarity,
    style: o.size ? `--ps:${o.size}px` : undefined,
  });
  f.append(art ?? h("span", { class: "ph" }, [icon("nhan-vat", { size: 22 })]));
  if (o.el) f.append(elementBadge(o.el, { size: 16, name: o.elName }));
  return f;
}

export interface CharCardOpts {
  name: string;
  title?: string;
  rarity: Rarity;
  el: string;
  elName: string;
  level?: number;
  netSao?: number;
  art?: HTMLCanvasElement | null;
  locked?: boolean;
  selected?: boolean;
}
export function charCard(o: CharCardOpts) {
  const art = h("div", { class: "art" }, [o.art ?? null, elementBadge(o.el, { size: 18, name: o.elName })]);
  if (o.level && !o.locked) art.append(h("span", { class: "lv" }, [`Cấp ${o.level}`]));
  if (o.locked) art.append(h("span", { class: "lock" }, [icon("khoa", { size: 28 })]));
  return h(
    "button",
    {
      type: "button",
      class: `tt-char${o.locked ? " is-locked" : ""}`,
      "data-r": o.rarity,
      "aria-pressed": o.selected ? "true" : "false",
    },
    [
      art,
      h("span", { class: "info" }, [
        h("span", { class: "name" }, [o.name]),
        h("span", { class: "meta" }, [
          stars(o.rarity, 12),
          h("span", {}, [o.locked ? "Chưa có" : `N${o.netSao ?? 0}`]),
        ]),
      ]),
    ],
  );
}

export function itemCard(o: { name: string; rarity: Rarity; icon: string; qty?: number; selected?: boolean }) {
  return h(
    "button",
    { type: "button", class: "tt-item", "data-r": o.rarity, "aria-pressed": o.selected ? "true" : "false" },
    [
      h("span", { class: "art" }, [
        icon(o.icon, { size: 40 }),
        o.qty ? h("span", { class: "qty" }, [`×${fmt.format(o.qty)}`]) : null,
        stars(o.rarity, 11),
      ]),
      h("span", { class: "nm" }, [o.name]),
    ],
  );
}

export type LootRarity = 1 | 2 | 3 | 4 | 5;
export interface LootOpts {
  rarity: LootRarity;
  art: Node;
  /** Dải nhãn dưới: "Cấp 60", "×120"... */
  label: string;
  ariaLabel: string;
  refine?: number;
  locked?: boolean;
  /** Chân dung nhỏ của nhân vật đang trang bị. */
  holder?: Node | null;
  selected?: boolean;
  picked?: boolean;
  disabled?: boolean;
  starSize?: number;
}
/** Thẻ đồ dọc: ảnh trên nền theo độ hiếm, hàng sao đè mép, dải nhãn sáng, R góc trái, khóa/người dùng góc phải. */
export function lootCard(o: LootOpts) {
  const st = h("span", { class: "tt-loot__stars", "aria-hidden": "true" });
  st.innerHTML = iconSvg("sao", { size: o.starSize ?? 13 }).repeat(o.rarity);
  const tr =
    o.locked || o.holder
      ? h("span", { class: "tt-loot__tr" }, [
          o.locked ? h("span", { class: "tt-loot__lock", title: "Đã khóa" }, [icon("khoa", { size: 12 })]) : null,
          o.holder ? h("span", { class: "tt-loot__who" }, [o.holder]) : null,
        ])
      : null;
  return h(
    "button",
    {
      type: "button",
      class: "tt-loot" + (o.selected ? " is-sel" : "") + (o.picked ? " is-picked" : ""),
      "data-r": o.rarity,
      "aria-pressed": String(!!(o.selected || o.picked)),
      "aria-label": o.ariaLabel,
      disabled: o.disabled,
    },
    [
      h("span", { class: "tt-loot__art" }, [
        o.art,
        o.rarity >= 4 ? h("span", { class: "tt-loot__shine", "aria-hidden": "true" }) : null,
      ]),
      o.refine ? h("span", { class: "tt-loot__ref" }, [`R${o.refine}`]) : null,
      tr,
      st,
      h("span", { class: "tt-loot__label" }, [o.label]),
    ],
  );
}

export type ActionKind = "danh" | "ky-nang" | "no" | "luot" | "nhay";
const ACTION_LABEL: Record<ActionKind, string> = {
  danh: "Đánh",
  "ky-nang": "Kỹ năng",
  no: "Nộ",
  luot: "Lướt",
  nhay: "Nhảy",
};
/** Nút HUD tròn. `cooldown` là phần còn lại (0–1) kèm số giây; `energy` (0–1) chỉ dùng cho Nộ. */
export function actionButton(
  kind: ActionKind,
  o: {
    size?: "xl" | "lg" | "md";
    key?: string;
    cooldown?: number;
    seconds?: number;
    energy?: number;
    elColor?: string;
    disabled?: boolean;
  } = {},
) {
  const b = h(
    "button",
    {
      type: "button",
      class: "tt-act",
      "data-kind": kind,
      "data-size": o.size ?? "lg",
      "aria-label": ACTION_LABEL[kind],
      disabled: o.disabled,
    },
    [icon(kind)],
  );
  if (o.cooldown && o.cooldown > 0) {
    b.classList.add("is-cooldown");
    b.style.setProperty("--cd", String(o.cooldown));
    b.append(h("span", { class: "cd", "aria-hidden": "true" }, [String(o.seconds ?? "")]));
    b.setAttribute("aria-label", `${ACTION_LABEL[kind]}, còn ${o.seconds ?? ""} giây`);
  }
  if (kind === "no") {
    const en = o.energy ?? 1;
    b.style.setProperty("--en", String(en));
    if (o.elColor) b.style.setProperty("--el", o.elColor);
    b.classList.toggle("is-ready", en >= 1);
  }
  if (o.key) b.append(h("span", { class: "key", "aria-hidden": "true" }, [o.key]));
  return b;
}

export function partySlot(o: {
  name?: string;
  rarity?: Rarity;
  el?: string;
  elName?: string;
  hp?: number;
  key: string;
  art?: HTMLCanvasElement | null;
  active?: boolean;
  down?: boolean;
}) {
  if (!o.name)
    return h("button", { type: "button", class: "tt-slot is-empty", "aria-label": `Ô ${o.key} trống, thêm nhân vật` }, [
      h("span", { class: "tt-portrait", style: "--ps:42px;background:none" }, [
        h("span", { class: "ph" }, [icon("them", { size: 20 })]),
      ]),
      h("span", { class: "nm" }, ["Thêm"]),
      h("span", { class: "k" }, [o.key]),
    ]);
  return h(
    "button",
    { type: "button", class: `tt-slot${o.down ? " is-down" : ""}`, "aria-current": o.active ? "true" : undefined },
    [
      portraitFrame(o.art ?? null, { rarity: o.rarity ?? 4, el: o.el, elName: o.elName, size: 42, down: o.down }),
      h("span", { class: "nm" }, [
        h("span", {}, [o.down ? `${o.name} · Gục` : o.name]),
        progress(o.hp ?? 1, { kind: "thin", label: undefined }),
      ]),
      h("span", { class: "k" }, [o.key]),
    ],
  );
}

export function tag(text: string, kind?: "ok" | "warn" | "bad") {
  return h("span", { class: "tt-tag", "data-kind": kind }, [text]);
}
