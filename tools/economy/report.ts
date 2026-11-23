/** Xuất CSV, HTML (biểu đồ SVG tự chứa) và bảng in ra terminal. */
import type { Economy } from "../../src/data/economy-schema";
import { reputationTier } from "../../src/economy/core";
import { quantile, type Fairness, type ProfileResult, type SimChar, type SimOpts } from "./sim";

const f0 = (x: number) => Math.round(x).toLocaleString("vi-VN");
const f2 = (x: number) => x.toFixed(2).replace(".", ",");
const pad = (s: string, n: number) => s + " ".repeat(Math.max(0, n - [...s].length));
const csv = (rows: (string | number)[][]) => rows.map((r) => r.join(",")).join("\n") + "\n";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const COLORS = ["#7fb0ff", "#c69cff", "#ffd36a"];

function table(head: string[], rows: string[][]) {
  const w = head.map((h, i) => Math.max([...h].length, ...rows.map((r) => [...r[i]!].length)));
  const line = (r: string[]) => "| " + r.map((c, i) => pad(c, w[i]!)).join(" | ") + " |";
  return [line(head), "|" + w.map((x) => "-".repeat(x + 2)).join("|") + "|", ...rows.map(line)].join("\n");
}

function lineChart(title: string, series: { name: string; pts: [number, number][] }[], yLabel: string) {
  const W = 640,
    H = 260,
    L = 56,
    B = 30;
  const xs = series.flatMap((s) => s.pts.map((p) => p[0])),
    ys = series.flatMap((s) => s.pts.map((p) => p[1]));
  const xm = Math.max(...xs),
    ym = Math.max(...ys) * 1.08 || 1;
  const X = (x: number) => L + (x / xm) * (W - L - 10),
    Y = (y: number) => H - B - (y / ym) * (H - B - 20);
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((t) => `<line x1="${L}" x2="${W - 10}" y1="${Y(t * ym)}" y2="${Y(t * ym)}" stroke="#2a3150"/><text x="${L - 6}" y="${Y(t * ym) + 4}" text-anchor="end">${f0(t * ym)}</text>`)
    .join("");
  const lines = series
    .map((s, i) => `<polyline fill="none" stroke="${COLORS[i % 3]}" stroke-width="2" points="${s.pts.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ")}"/>`)
    .join("");
  const legend = series.map((s, i) => `<tspan fill="${COLORS[i % 3]}">■ ${esc(s.name)}</tspan>`).join("  ");
  return `<figure><figcaption>${esc(title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">${grid}${lines}<text x="${W / 2}" y="${H - 6}" text-anchor="middle">Ngày (${esc(yLabel)})</text><text x="${L}" y="12">${legend}</text></svg></figure>`;
}

function barChart(title: string, series: { name: string; vals: number[] }[]) {
  const W = 640,
    H = 240,
    L = 40,
    B = 30,
    n = Math.max(...series.map((s) => s.vals.length));
  const ym = Math.max(...series.flatMap((s) => s.vals)) * 1.08 || 1;
  const bw = (W - L - 10) / n / (series.length + 0.5);
  const bars = series
    .map((s, si) =>
      s.vals
        .map((v, i) => {
          const h = (v / ym) * (H - B - 20);
          return `<rect x="${(L + i * bw * (series.length + 0.5) + si * bw).toFixed(1)}" y="${(H - B - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" fill="${COLORS[si % 3]}"/>`;
        })
        .join(""),
    )
    .join("");
  const ticks = Array.from({ length: n }, (_, i) => (i % Math.ceil(n / 16) ? "" : `<text x="${(L + (i + 0.5) * bw * (series.length + 0.5)).toFixed(1)}" y="${H - 14}" text-anchor="middle">${i}</text>`)).join("");
  const legend = series.map((s, i) => `<tspan fill="${COLORS[i % 3]}">■ ${esc(s.name)}</tspan>`).join("  ");
  return `<figure><figcaption>${esc(title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">${bars}${ticks}<text x="${W / 2}" y="${H - 2}" text-anchor="middle">Số nhân vật 5★ nhận được</text><text x="${L}" y="12">${legend}</text></svg></figure>`;
}

export function renderReport(res: ProfileResult[], fair: Fairness, chars: SimChar[], E: Economy, o: SimOpts) {
  const name = (id: string) => id;
  const r5 = new Set(chars.filter((c) => c.r === 5).map((c) => c.id));
  const files: Record<string, string> = {};
  const moc = E.moPhong.mocNgay.filter((d) => d <= o.days);

  files["uoc-nguyen.csv"] = csv([
    ["ho_so", "ngay", "luot_uoc_tb", "so_5sao_tb", "so_5sao_gioi_han_tb"],
    ...res.flatMap((r) => Array.from({ length: o.days }, (_, i) => [r.id, i + 1, r.pulls[i + 1]!.toFixed(2), r.five[i + 1]!.toFixed(3), r.featured[i + 1]!.toFixed(3)])),
  ]);
  const nMax = Math.max(...res.map((r) => r.fiveDist.length));
  files["phan-phoi-5sao.csv"] = csv([
    ["ho_so", "so_5sao", "so_nguoi", "ti_le"],
    ...res.flatMap((r) => Array.from({ length: nMax }, (_, k) => [r.id, k, r.fiveDist[k] ?? 0, ((r.fiveDist[k] ?? 0) / o.players).toFixed(5)])),
  ]);
  files["chien-luc.csv"] = csv([
    ["ho_so", "ngay", "p10", "p50", "p90", "p99"],
    ...res.flatMap((r) => r.checkpoints.map((d, i) => [r.id, d, ...[0.1, 0.5, 0.9, 0.99].map((q) => Math.round(quantile(r.cl[i]!, q)))])),
  ]);
  files["cong-bang.csv"] = csv([
    ["ngay", "khong_nap_p50", "nap_it_p50", "nap_nhieu_p50", "nap_nhieu_p99", "nap_nhieu_max", "tran_ly_thuyet", "ti_le_p50", "ti_le_p99", "ti_le_max", "ti_le_tran", "dat"],
    ...fair.ratio.map((r) => [r.ngay, Math.round(r.khongNap), Math.round(r.napIt), Math.round(r.napNhieu), Math.round(r.napNhieuP99), Math.round(r.napNhieuMax), r.tran, r.tiLe.toFixed(3), r.tiLeP99.toFixed(3), r.tiLeMax.toFixed(3), r.tiLeTran.toFixed(3), r.ok ? "dat" : "truot"]),
  ]);

  const ok = (b: boolean) => (b ? "ĐẠT" : "TRƯỢT");
  const tran = E.thietKe.congBang.tranChenhLech;
  const tRatio = table(
    ["Ngày", "Không nạp", "Thẻ tháng", "Nạp nhiều", "Nạp nhiều p99", "Nạp nhiều cao nhất", "Tỉ lệ p50", "Tỉ lệ p99", "Tỉ lệ cao nhất", "Kết quả", "Tham khảo: không hạn mức"],
    fair.ratio.map((r) => [String(r.ngay), f0(r.khongNap), f0(r.napIt), f0(r.napNhieu), f0(r.napNhieuP99), f0(r.napNhieuMax), f2(r.tiLe) + "×", f2(r.tiLeP99) + "×", f2(r.tiLeMax) + "×", ok(r.ok), `${f0(r.tran)} (${f2(r.tiLeTran)}×)`]),
  );
  const tStory = table(
    ["Chương", "Ngày", "Chiến Lực cần", "Đội 4★ miễn phí", "Kết quả"],
    fair.story.map((s) => [String(s.chuong), String(s.ngay), f0(s.can), f0(s.co), ok(s.ok)]),
  );
  const tTower = table(
    ["Tầng", "Sát thương/giây cần cho 3★", "Ngày đội 4★ miễn phí đạt", "Kết quả"],
    fair.tower.map((t) => [String(t.tang), f0(t.dpsCan), t.ngayDat === null ? "chưa" : String(t.ngayDat), ok(t.ok)]),
  );
  const tProfiles = table(
    ["Hồ sơ", ...moc.map((d) => `Lượt ước ${d} ngày`), "5★ (180 ngày)", "5★ giới hạn", "Ngày có 5★ giới hạn đầu", "Đá Sao/tháng"],
    res.map((r) => [r.ten, ...moc.map((d) => f0(r.pulls[d]!)), f2(r.five[o.days]!), f2(r.featured[o.days]!), f0(r.firstFeaturedDay), f0(r.gemsPerMonth)]),
  );
  const roster = res
    .map((r) =>
      moc
        .map((d) => {
          const s = r.sampleAt[d];
          if (!s) return "";
          const list = Object.entries(s.owned)
            .filter(([id]) => r5.has(id))
            .map(([id, c]) => `${name(id)} N${c}`);
          const n4 = Object.keys(s.owned).length - list.length;
          return `- ${r.ten}, ngày ${d}: Chiến Lực đội ${f0(s.cl)}, ${s.pulls} lượt ước; 5★: ${list.join(", ") || "chưa có"}; ${n4} nhân vật 4★.`;
        })
        .join("\n"),
    )
    .join("\n");
  const terminal = [
    "== Ba hồ sơ người chơi ==",
    tProfiles,
    `\n== Trần chênh lệch Chiến Lực (≤ ${f2(tran)}×, so cùng số ngày) ==`,
    tRatio,
    "\n== Cốt truyện bằng đội 4★ miễn phí ==",
    tStory,
    "\n== Tháp Tinh Tú 3★ bằng đội 4★ miễn phí ==",
    tTower,
    "\n== Người chơi trung vị ==",
    roster,
    `\nKết luận: ${ok(fair.ok)}`,
  ].join("\n");
  files["tom-tat.md"] = `# Kết quả mô phỏng\n\nTạo bằng \`pnpm economy:sim --players ${o.players} --days ${o.days} --seed ${o.seed}\`. Không sửa tay.\n\n## Ba hồ sơ\n\n${tProfiles}\n\n## Trần chênh lệch Chiến Lực (≤ ${f2(tran)}×)\n\n${tRatio}\n\n## Cốt truyện bằng đội 4★ miễn phí\n\n${tStory}\n\n## Tháp Tinh Tú 3★ bằng đội 4★ miễn phí\n\n${tTower}\n\n## Người chơi trung vị\n\n${roster}\n\nCấp Hộ Tinh ở ngày ${o.days}: bậc ${reputationTier(60, E)} khi đủ cấp 51.\n\nKết luận: **${ok(fair.ok)}**\n`;

  const clChart = lineChart(
    "Chiến Lực đội (trung vị) theo ngày",
    res.map((r) => ({ name: r.ten, pts: r.checkpoints.map((d, i) => [d, quantile(r.cl[i]!, 0.5)] as [number, number]) })),
    "Chiến Lực",
  );
  const pullChart = lineChart(
    "Lượt ước tích lũy (trung bình)",
    res.map((r) => ({ name: r.ten, pts: Array.from({ length: o.days }, (_, i) => [i + 1, r.pulls[i + 1]!] as [number, number]) })),
    "lượt ước",
  );
  const distChart = barChart(
    `Phân phối số 5★ sau ${o.days} ngày (tỉ lệ người chơi)`,
    res.map((r) => ({ name: r.ten, vals: Array.from({ length: Math.min(nMax, 40) }, (_, k) => (r.fiveDist[k] ?? 0) / o.players) })),
  );
  const htmlTable = (md: string) => {
    const [h, , ...rows] = md.split("\n");
    const cells = (l: string) => l.split("|").slice(1, -1).map((c) => esc(c.trim()));
    return `<table><thead><tr>${cells(h!).map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${cells(r).map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  };
  files["bao-cao.html"] = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mô phỏng kinh tế · Tinh Tú Ước Nguyện</title><style>body{margin:0;padding:24px;background:#0b1020;color:#e8ecff;font:14px/1.5 system-ui,sans-serif}h1,h2{font-weight:600}h1{color:#ffd36a}main{max-width:980px;margin:auto}figure{margin:16px 0;background:#121a33;border-radius:12px;padding:12px}figcaption{color:#aab4dd;margin-bottom:6px}svg{width:100%;height:auto;font-size:11px;fill:#aab4dd}table{border-collapse:collapse;width:100%;margin:8px 0 20px;background:#121a33}th,td{padding:6px 8px;border-bottom:1px solid #2a3150;text-align:right}th:first-child,td:first-child{text-align:left}.ok{color:#7be0a0}.bad{color:#ff8080}</style></head><body><main><h1>Mô phỏng kinh tế và Chiến Lực</h1><p>${f0(o.players)} người chơi ảo mỗi hồ sơ, ${o.days} ngày, seed ${o.seed}. Kết luận: <b class="${fair.ok ? "ok" : "bad"}">${ok(fair.ok)}</b>. Chỉ mô phỏng, không có thanh toán.</p>${clChart}${pullChart}${distChart}<h2>Ba hồ sơ</h2>${htmlTable(tProfiles)}<h2>Trần chênh lệch (≤ ${f2(tran)}×)</h2>${htmlTable(tRatio)}<h2>Cốt truyện bằng đội 4★ miễn phí</h2>${htmlTable(tStory)}<h2>Tháp Tinh Tú 3★ bằng đội 4★ miễn phí</h2>${htmlTable(tTower)}</main></body></html>\n`;
  return { files, terminal };
}
