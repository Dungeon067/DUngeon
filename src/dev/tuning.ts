import { FEEL, feelSettings, setShakeEnabled } from "../combat/feel";
import { FEEL_DEFAULT } from "../data/content";
import { applyVolumes } from "../core/audio";

/* =========================================================
   BẢNG CHỈNH NHANH cảm giác đánh. Chỉ nạp ở `pnpm dev` hoặc khi URL có `?dev`.
   F9 bật/tắt. Giá trị chỉnh được lưu trong localStorage và xuất ra YAML để dán vào content/combat-feel.yaml.
   ========================================================= */

type Row = [path: string, label: string, min: number, max: number, step: number];
const GROUPS: [string, Row[]][] = [
  [
    "Dừng hình (giây)",
    [
      ["hitstop.heavy", "Đòn nặng", 0, 0.12, 0.005],
      ["hitstop.crit", "Chí mạng", 0, 0.12, 0.005],
      ["hitstop.react", "Phản ứng", 0, 0.12, 0.005],
      ["hitstop.burst", "Nộ", 0, 0.15, 0.005],
      ["hitstop.break", "Vỡ chịu đòn", 0, 0.15, 0.005],
      ["slowmo.bossKill.scale", "Chậm khi hạ boss (×)", 0.05, 1, 0.05],
      ["slowmo.bossKill.dur", "Thời gian chậm", 0, 3, 0.1],
    ],
  ],
  [
    "Rung",
    [
      ["shake.scale", "Hệ số chung", 0, 2, 0.05],
      ["shake.decay", "Tốc độ tắt", 5, 80, 1],
      ["shake.heavy", "Đòn nặng", 0, 12, 0.5],
      ["shake.skill", "Kỹ năng", 0, 12, 0.5],
      ["shake.burst", "Nộ", 0, 20, 0.5],
      ["shake.hurt", "Bị đánh", 0, 12, 0.5],
    ],
  ],
  [
    "Camera",
    [
      ["camera.follow", "Bám theo", 1, 20, 0.5],
      ["camera.lead", "Nhìn trước (px)", 0, 120, 2],
      ["camera.leadSpeed", "Tốc độ nhìn trước", 0.5, 10, 0.25],
      ["camera.bossZoom", "Thu phóng khi có boss", 0.6, 1.2, 0.01],
      ["camera.burstZoom", "Thu phóng khi nộ", 0.9, 1.4, 0.01],
      ["camera.zoomSpeed", "Tốc độ thu phóng", 0.5, 12, 0.25],
    ],
  ],
  [
    "Đòn đánh và quái",
    [
      ["input.buffer", "Đệm lệnh (giây)", 0, 0.3, 0.01],
      ["hit.flash", "Nháy trắng (giây)", 0, 0.3, 0.01],
      ["poise.stun", "Choáng (giây)", 0.5, 5, 0.1],
      ["poise.stunVuln", "Sát thương khi choáng (×)", 1, 2, 0.05],
      ["poise.regenDelay", "Chờ hồi chịu đòn", 0, 6, 0.25],
      ["telegraph.line", "Viền báo đòn (px)", 1, 8, 0.5],
      ["telegraph.flashAt", "Mốc nháy báo đòn", 0.3, 0.95, 0.05],
    ],
  ],
  [
    "Âm thanh",
    [
      ["audio.sfx", "Hiệu ứng", 0, 1, 0.05],
      ["audio.music", "Nhạc", 0, 1, 0.05],
      ["audio.crossfade", "Chuyển nhạc (giây)", 0, 5, 0.1],
    ],
  ],
];
const KEY = "tinhtu.feel.dev";

function get(o: any, path: string): number {
  return path.split(".").reduce((a, k) => a[k], o);
}
function set(o: any, path: string, v: number) {
  const ks = path.split("."),
    last = ks.pop()!;
  ks.reduce((a, k) => a[k], o)[last] = v;
}
function save() {
  const out: Record<string, number> = {};
  for (const [, rows] of GROUPS)
    for (const [p] of rows) if (get(FEEL, p) !== get(FEEL_DEFAULT, p)) out[p] = get(FEEL, p);
  localStorage.setItem(KEY, JSON.stringify(out));
}
/** Xuất các mục đã chỉnh dưới dạng YAML lồng nhau. */
export function exportYaml(): string {
  const tree: any = {};
  for (const [, rows] of GROUPS)
    for (const [p] of rows) {
      const v = get(FEEL, p);
      if (v === get(FEEL_DEFAULT, p)) continue;
      const ks = p.split(".");
      let n = tree;
      for (const k of ks.slice(0, -1)) n = n[k] ??= {};
      n[ks[ks.length - 1]] = +v.toFixed(4);
    }
  const walk = (o: any, ind: string): string =>
    Object.entries(o)
      .map(([k, v]) => (typeof v === "object" ? `${ind}${k}:\n${walk(v, ind + "  ")}` : `${ind}${k}: ${v}`))
      .join("\n");
  return walk(tree, "") || "# chưa chỉnh mục nào";
}

let panel: HTMLDivElement | null = null;
function build() {
  panel = document.createElement("div");
  panel.id = "devTuning";
  panel.style.cssText =
    "position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9999;width:min(420px,92vw);max-height:86vh;overflow:auto;" +
    "background:rgba(10,14,30,.94);color:#e8ecf8;font:12px/1.4 'Be Vietnam Pro',sans-serif;padding:10px 12px;border:1px solid #445;border-radius:8px";
  let html = `<b>Chỉnh nhanh cảm giác đánh</b> <span style="opacity:.6">(F9 đóng)</span>
    <label style="display:block;margin:6px 0"><input type="checkbox" data-shake ${feelSettings.shake ? "checked" : ""}> Rung màn hình</label>`;
  for (const [g, rows] of GROUPS) {
    html += `<div style="margin-top:8px;color:#ffd77a">${g}</div>`;
    for (const [p, label, min, max, step] of rows)
      html += `<label style="display:grid;grid-template-columns:1fr 130px 44px;gap:6px;align-items:center">
        <span>${label}</span><input type="range" data-p="${p}" min="${min}" max="${max}" step="${step}" value="${get(FEEL, p)}">
        <output data-o="${p}">${get(FEEL, p)}</output></label>`;
  }
  html += `<div style="margin-top:10px;display:flex;gap:6px"><button data-reset>Mặc định</button><button data-export>Xuất YAML</button></div>
    <pre data-yaml style="white-space:pre-wrap;margin:6px 0 0;color:#9fe0a8"></pre>`;
  panel.innerHTML = html;
  panel.addEventListener("input", (e) => {
    const t = e.target as HTMLInputElement;
    if (t.dataset.shake !== undefined) return setShakeEnabled(t.checked);
    const p = t.dataset.p;
    if (!p) return;
    set(FEEL, p, +t.value);
    panel!.querySelector(`[data-o="${p}"]`)!.textContent = t.value;
    if (p.startsWith("audio.")) applyVolumes();
    save();
  });
  panel.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t.dataset.reset !== undefined) {
      for (const [, rows] of GROUPS) for (const [p] of rows) set(FEEL, p, get(FEEL_DEFAULT, p));
      localStorage.removeItem(KEY);
      applyVolumes();
      panel!.remove();
      build();
      panel!.hidden = false;
    } else if (t.dataset.export !== undefined) {
      const y = exportYaml();
      panel!.querySelector("[data-yaml]")!.textContent = y;
      void navigator.clipboard?.writeText(y).catch(() => {});
    }
  });
  panel.hidden = true;
  document.body.appendChild(panel);
}

export function initTuning() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY) || "{}");
    for (const [p, v] of Object.entries(o)) if (typeof v === "number") set(FEEL, p, v);
  } catch {
    /* bỏ qua */
  }
  addEventListener("keydown", (e) => {
    if (e.key !== "F9") return;
    e.preventDefault();
    if (!panel) build();
    panel!.hidden = !panel!.hidden;
  });
}
