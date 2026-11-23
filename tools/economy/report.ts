/** Xuất CSV, HTML (biểu đồ SVG tự chứa) và bảng in ra terminal. */
import type { Economy } from "../../src/data/economy-schema";
import { type ProfileResult, type SimChar, type SimOpts, type Tiering, doDe } from "./sim";

const f0 = (x: number) => Math.round(x).toLocaleString("vi-VN");
const f2 = (x: number) => x.toFixed(2).replace(".", ",");
const pad = (s: string, n: number) => s + " ".repeat(Math.max(0, n - [...s].length));
const csv = (rows: (string | number)[][]) => rows.map((r) => r.join(",")).join("\n") + "\n";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const COLORS = ["#7be0a0", "#7fb0ff", "#c69cff", "#ffd36a"];

function table(head: string[], rows: string[][]) {
  const w = head.map((h, i) => Math.max([...h].length, ...rows.map((r) => [...r[i]!].length)));
  const line = (r: string[]) => "| " + r.map((c, i) => pad(c, w[i]!)).join(" | ") + " |";
  return [line(head), "|" + w.map((x) => "-".repeat(x + 2)).join("|") + "|", ...rows.map(line)].join("\n");
}

function lineChart(
  title: string,
  series: { name: string; pts: [number, number][] }[],
  yLabel: string,
  refs: { name: string; y: number }[] = [],
) {
  const W = 640,
    H = 260,
    L = 56,
    B = 30;
  const xs = series.flatMap((s) => s.pts.map((p) => p[0])),
    ys = [...series.flatMap((s) => s.pts.map((p) => p[1])), ...refs.map((r) => r.y)];
  const xm = Math.max(...xs),
    ym = Math.max(...ys) * 1.08 || 1;
  const X = (x: number) => L + (x / xm) * (W - L - 10),
    Y = (y: number) => H - B - (y / ym) * (H - B - 20);
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map(
      (t) =>
        `<line x1="${L}" x2="${W - 10}" y1="${Y(t * ym)}" y2="${Y(t * ym)}" stroke="#2a3150"/><text x="${L - 6}" y="${Y(t * ym) + 4}" text-anchor="end">${f0(t * ym)}</text>`,
    )
    .join("");
  const lines = series
    .map(
      (s, i) =>
        `<polyline fill="none" stroke="${COLORS[i % COLORS.length]}" stroke-width="2" points="${s.pts.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ")}"/>`,
    )
    .join("");
  const refLines = refs
    .map(
      (r) =>
        `<line x1="${L}" x2="${W - 10}" y1="${Y(r.y)}" y2="${Y(r.y)}" stroke="#ff8080" stroke-dasharray="4 4"/><text x="${W - 12}" y="${Y(r.y) - 4}" text-anchor="end" fill="#ff8080">${esc(r.name)}</text>`,
    )
    .join("");
  const legend = series.map((s, i) => `<tspan fill="${COLORS[i % COLORS.length]}">■ ${esc(s.name)}</tspan>`).join("  ");
  return `<figure><figcaption>${esc(title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">${grid}${refLines}${lines}<text x="${W / 2}" y="${H - 6}" text-anchor="middle">Ngày (${esc(yLabel)})</text><text x="${L}" y="12">${legend}</text></svg></figure>`;
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
          return `<rect x="${(L + i * bw * (series.length + 0.5) + si * bw).toFixed(1)}" y="${(H - B - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" fill="${COLORS[si % COLORS.length]}"/>`;
        })
        .join(""),
    )
    .join("");
  const ticks = Array.from({ length: n }, (_, i) =>
    i % Math.ceil(n / 16)
      ? ""
      : `<text x="${(L + (i + 0.5) * bw * (series.length + 0.5)).toFixed(1)}" y="${H - 14}" text-anchor="middle">${i}</text>`,
  ).join("");
  const legend = series.map((s, i) => `<tspan fill="${COLORS[i % COLORS.length]}">■ ${esc(s.name)}</tspan>`).join("  ");
  return `<figure><figcaption>${esc(title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">${bars}${ticks}<text x="${W / 2}" y="${H - 2}" text-anchor="middle">Số nhân vật 5★ nhận được</text><text x="${L}" y="12">${legend}</text></svg></figure>`;
}

export function renderReport(res: ProfileResult[], fair: Tiering, chars: SimChar[], E: Economy, o: SimOpts) {
  const name = (id: string) => chars.find((c) => c.id === id)?.name ?? id;
  const r5 = new Set(chars.filter((c) => c.r === 5).map((c) => c.id));
  const files: Record<string, string> = {};
  const moc = E.moPhong.mocNgay.filter((d) => d <= o.days);
  const pct = (x: number) => `${(x * 100).toFixed(x > 0 && x < 0.01 ? 2 : 0).replace(".", ",")}%`;
  const ok = (b: boolean) => (b ? "ĐẠT" : "TRƯỢT");
  const day = (d: number | null) => (d === null ? `> ${o.days}` : String(d));
  const P = E.thietKe.phanTang;
  const carryId = E.game.nhanVat5Sao.gioiHan[0]!;
  const sigName = E.thietKe.vuKhi.danhSach.find((w) => w.cua === carryId)?.ten ?? "";

  files["uoc-nguyen.csv"] = csv([
    ["ho_so", "ngay", "luot_uoc_nhan_vat_tb", "luot_uoc_vu_khi_tb", "so_5sao_tb", "so_5sao_gioi_han_tb"],
    ...res.flatMap((r) =>
      Array.from({ length: o.days }, (_, i) => [
        r.id,
        i + 1,
        r.pulls[i + 1]!.toFixed(2),
        r.wpulls[i + 1]!.toFixed(2),
        r.five[i + 1]!.toFixed(3),
        r.featured[i + 1]!.toFixed(3),
      ]),
    ),
  ]);
  const nMax = Math.max(...res.map((r) => r.fiveDist.length));
  files["phan-phoi-5sao.csv"] = csv([
    ["ho_so", "so_5sao", "so_nguoi", "ti_le"],
    ...res.flatMap((r) =>
      Array.from({ length: nMax }, (_, k) => [
        r.id,
        k,
        r.fiveDist[k] ?? 0,
        ((r.fiveDist[k] ?? 0) / o.players).toFixed(5),
      ]),
    ),
  ]);
  files["chien-luc.csv"] = csv([
    ["ho_so", "ngay", "chien_luc_p10", "chien_luc_p50", "chien_luc_p90", "dps_p10", "dps_p50", "dps_p90"],
    ...res.flatMap((r) =>
      r.checkpoints.map((d, i) => [
        r.id,
        d,
        ...[r.cl[i]!, r.dps[i]!].flatMap((q) => [q.p10, q.p50, q.p90].map((x) => Math.round(x))),
      ]),
    ),
  ]);
  files["phan-tang.csv"] = csv([
    ["loai", "noi_dung", "ngay", "can", "doi_4sao_mien_phi", ...res.map((r) => `du_${r.id}`), "f2p_qua_ngay"],
    ...fair.thuong.map((x) => [
      "thuong",
      `"${x.ten}"`,
      x.ngay,
      x.can,
      x.mienPhi,
      ...x.du.map((v) => v.toFixed(3)),
      x.f2pNgay ?? "",
    ]),
    ...fair.thap.map((x) => [
      "thap",
      `"Tháp tầng ${x.tang} 3★ (sát thương/giây)"`,
      "",
      x.dpsCan,
      x.mienPhiNgay ?? "",
      ...res.map(() => ""),
      x.f2pNgay ?? "",
    ]),
    ...moc.flatMap((d) =>
      res.map((r) => [
        "dinh",
        `"${r.ten} ngày ${d}"`,
        d,
        Math.round(fair.dinh.cham),
        "",
        ...res.map((x) => (x === r ? (r.chamDinh[d] ?? 0).toFixed(4) : "")),
        (r.diemToiDa[d] ?? 0).toFixed(4),
      ]),
    ),
  ]);

  const tProfiles = table(
    [
      "Hồ sơ",
      "Chi tiêu/tháng",
      "Đá Sao/tháng",
      ...moc.map((d) => `Lượt ước ${d} ngày (NV + VK)`),
      `5★ (${o.days} ngày)`,
      "5★ giới hạn",
      "Ngày có 5★ giới hạn đầu",
    ],
    res.map((r) => [
      r.ten,
      `${f0(r.vndPerMonth)} đ`,
      f0(r.gemsPerMonth),
      ...moc.map((d) => `${f0(r.pulls[d]!)} + ${f0(r.wpulls[d]!)}`),
      f2(r.five[o.days]!),
      f2(r.featured[o.days]!),
      f0(r.firstFeaturedDay),
    ]),
  );
  const medIdx = (dist: number[]) => {
    let acc = 0;
    for (let k = 0; k < dist.length; k++) if ((acc += dist[k]!) >= 0.5) return k;
    return dist.length - 1;
  };
  const tCarry = table(
    ["Ngày", ...res.map((r) => r.ten)],
    moc.map((d) => [
      String(d),
      ...res.map((r) => {
        const n = medIdx(r.carryN[d]!) - 1,
          w = medIdx(r.carryR[d]!);
        return `${n < 0 ? "chưa có" : "N" + n} · ${w ? "R" + w : "vũ khí 4★"}`;
      }),
    ]),
  );
  const tNormal = table(
    ["Nội dung", "Ngày mở", "Chiến Lực cần", "Đội 4★ miễn phí", ...res.map((r) => r.ten), "F2P qua từ ngày"],
    fair.thuong.map((x) => [
      x.ten,
      String(x.ngay),
      f0(x.can),
      `${f0(x.mienPhi)} (${f2(x.mienPhi / x.can)}×)`,
      ...x.du.map((v) => `${f2(v)}× ${doDe(v, E)}`),
      day(x.f2pNgay),
    ]),
  );
  const tTower = table(
    ["Tầng", "Sát thương/giây cần cho 3★", "Đội 4★ miễn phí đạt ngày", "F2P đạt ngày"],
    fair.thap.map((x) => [String(x.tang), f0(x.dpsCan), day(x.mienPhiNgay), day(x.f2pNgay)]),
  );
  const tDiff = table(
    ["Hồ sơ", "Độ dư thấp nhất", "Độ dư trung vị", "Độ dễ"],
    res.map((r, k) => [r.ten, `${f2(fair.doDe[k]!.min)}×`, `${f2(fair.doDe[k]!.median)}×`, fair.doDe[k]!.nhan]),
  );
  const tPeak = table(
    ["Ngày", ...res.flatMap((r) => [`${r.ten}: sát thương/giây (trung vị)`, "chạm Đỉnh", "điểm tối đa"])],
    moc.map((d) => {
      const i = res[0]!.checkpoints.indexOf(d);
      return [
        String(d),
        ...res.flatMap((r) => [
          `${f0(r.dps[i]!.p50)} (${pct(r.dps[i]!.p50 / fair.dinh.cham)})`,
          pct(r.chamDinh[d] ?? 0),
          pct(r.diemToiDa[d] ?? 0),
        ]),
      ];
    }),
  );
  const tPeakDay = table(
    ["Hồ sơ", "Ngày chạm Đỉnh (trung vị)", "Ngày đạt điểm tối đa (trung vị)"],
    res.map((r) => [r.ten, day(r.chamDinhDay), day(r.diemToiDaDay)]),
  );
  const tCl = table(
    ["Ngày", ...res.map((r) => r.ten), ...res.slice(1).map((r) => `${r.ten} / F2P`)],
    moc.map((d) => {
      const i = res[0]!.checkpoints.indexOf(d);
      return [
        String(d),
        ...res.map((r) => f0(r.cl[i]!.p50)),
        ...res.slice(1).map((r) => `${f2(r.cl[i]!.p50 / res[0]!.cl[i]!.p50)}×`),
      ];
    }),
  );
  const checks = fair.checks.map((c) => `- ${ok(c.ok)}: ${c.ten}`).join("\n");
  const roster = (r: ProfileResult, d: number) => {
    const s = r.sampleAt[d]!;
    const five = Object.entries(s.owned)
      .filter(([id]) => r5.has(id))
      .map(([id, c]) => `${name(id)} N${c}`);
    const nFour = Object.keys(s.owned).filter((id) => !r5.has(id)).length;
    return `- ${r.ten}, ngày ${d}: Chiến Lực đội ${f0(s.cl)}, sát thương/giây ${f0(s.dps)}, ${s.pulls} lượt ước nhân vật + ${s.wpulls} lượt ước vũ khí; chủ lực ${name(carryId)} ${s.carryN < 0 ? "chưa có" : "N" + s.carryN}, ${s.carryR ? `${sigName} R${s.carryR}` : "vũ khí 4★ Lò Rèn"}; 5★: ${five.join(", ") || "chưa có"}; ${nFour} nhân vật 4★.`;
  };
  const md = `# Kết quả mô phỏng kinh tế

${f0(o.players)} người chơi ảo mỗi hồ sơ, ${o.days} ngày, seed ${o.seed}. Chạy lại: \`pnpm economy:sim\`. Cấu hình: \`content/economy.yaml\`.

## Kiểm tra mô hình phân tầng

${checks}

Kết luận: **${ok(fair.ok)}**

## Bốn hồ sơ

${tProfiles}

## Chủ lực theo thời gian (trung vị Nét Sao và tinh luyện)

Chủ lực: ${name(carryId)} (banner giới hạn đầu tiên), vũ khí đặc trưng: ${sigName}.

${tCarry}

## A. Nội dung thường

F2P chơi kỹ (trung vị) qua 100% nội dung thường từ ngày **${day(fair.f2pTatCa)}** (yêu cầu: trước ngày ${P.hanThuong}).

Độ dư = Chiến Lực đội (trung vị) ở ngày mở / Chiến Lực cần. Dưới ${f2(1)}×: chưa qua; tới ${f2(P.doDe.vuaDu)}×: qua được; tới ${f2(P.doDe.de)}×: vừa đủ; tới ${f2(P.doDe.ratNhe)}×: dễ; từ ${f2(P.doDe.ratNhe)}×: rất nhẹ nhàng.

${tNormal}

### Tháp Tinh Tú tầng 1–${P.thapThuong} (nội dung thường)

${tTower}

### Độ dễ theo hồ sơ

${tDiff}

## B. Nội dung đỉnh

Chạm Đỉnh: sao tối đa tầng 12 bản Đỉnh, cần ${f0(fair.dinh.cham)} sát thương/giây. Điểm tối đa (bảng xếp hạng): ${f0(fair.dinh.max)} sát thương/giây.

${tPeak}

${tPeakDay}

## Chiến Lực đội theo thời gian (trung vị)

${tCl}

## Người chơi trung vị

${moc.flatMap((d) => res.map((r) => roster(r, d))).join("\n")}
`;
  files["tom-tat.md"] = md;

  const terminal = [
    "== Kiểm tra mô hình phân tầng ==",
    checks,
    "",
    "== Bốn hồ sơ ==",
    tProfiles,
    "",
    "== Chủ lực theo thời gian ==",
    tCarry,
    "",
    `== A. Nội dung thường (F2P qua 100% từ ngày ${day(fair.f2pTatCa)}) ==`,
    tNormal,
    "",
    tDiff,
    "",
    "== B. Nội dung đỉnh ==",
    tPeak,
    "",
    tPeakDay,
    "",
    `Kết luận: ${ok(fair.ok)}`,
  ].join("\n");

  const clChart = lineChart(
    "Chiến Lực đội theo ngày (trung vị)",
    res.map((r) => ({ name: r.ten, pts: r.checkpoints.map((d, i) => [d, r.cl[i]!.p50] as [number, number]) })),
    "Chiến Lực",
  );
  const dpsChart = lineChart(
    "Sát thương mỗi giây của đội theo ngày (trung vị) so với ngưỡng nội dung đỉnh",
    res.map((r) => ({ name: r.ten, pts: r.checkpoints.map((d, i) => [d, r.dps[i]!.p50] as [number, number]) })),
    "sát thương/giây",
    [
      { name: "Chạm Đỉnh", y: fair.dinh.cham },
      { name: "Điểm tối đa", y: fair.dinh.max },
    ],
  );
  const pullChart = lineChart(
    "Lượt ước tích lũy (nhân vật + vũ khí, trung bình)",
    res.map((r) => ({
      name: r.ten,
      pts: Array.from({ length: o.days }, (_, i) => [i + 1, r.pulls[i + 1]! + r.wpulls[i + 1]!] as [number, number]),
    })),
    "lượt ước",
  );
  const distChart = barChart(
    `Phân phối số 5★ nhân vật sau ${o.days} ngày (tỉ lệ người chơi)`,
    res.map((r) => ({
      name: r.ten,
      vals: Array.from({ length: Math.min(nMax, 40) }, (_, k) => (r.fiveDist[k] ?? 0) / o.players),
    })),
  );
  const htmlTable = (t: string) => {
    const [h, , ...rows] = t.split("\n");
    const cells = (l: string) =>
      l
        .split("|")
        .slice(1, -1)
        .map((c) => esc(c.trim()));
    return `<table><thead><tr>${cells(h!)
      .map((c) => `<th>${c}</th>`)
      .join("")}</tr></thead><tbody>${rows
      .map(
        (r) =>
          `<tr>${cells(r)
            .map((c) => `<td>${c}</td>`)
            .join("")}</tr>`,
      )
      .join("")}</tbody></table>`;
  };
  const checkHtml = fair.checks
    .map((c) => `<li><b class="${c.ok ? "ok" : "bad"}">${ok(c.ok)}</b> ${esc(c.ten)}</li>`)
    .join("");
  files["bao-cao.html"] =
    `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mô phỏng kinh tế · Tinh Tú Ước Nguyện</title><style>body{margin:0;padding:24px;background:#0b1020;color:#e8ecff;font:14px/1.5 system-ui,sans-serif}h1,h2{font-weight:600}h1{color:#ffd36a}main{max-width:1100px;margin:auto}figure{margin:16px 0;background:#121a33;border-radius:12px;padding:12px}figcaption{color:#aab4dd;margin-bottom:6px}svg{width:100%;height:auto;font-size:11px;fill:#aab4dd}table{border-collapse:collapse;width:100%;margin:8px 0 20px;background:#121a33;font-size:13px}th,td{padding:6px 8px;border-bottom:1px solid #2a3150;text-align:right}th:first-child,td:first-child{text-align:left}.ok{color:#7be0a0}.bad{color:#ff8080}</style></head><body><main><h1>Mô phỏng kinh tế và Chiến Lực</h1><p>${f0(o.players)} người chơi ảo mỗi hồ sơ, ${o.days} ngày, seed ${o.seed}. Kết luận: <b class="${fair.ok ? "ok" : "bad"}">${ok(fair.ok)}</b>. Chỉ mô phỏng, không có thanh toán.</p><ul>${checkHtml}</ul>${clChart}${dpsChart}${pullChart}${distChart}<h2>Bốn hồ sơ</h2>${htmlTable(tProfiles)}<h2>Chủ lực theo thời gian</h2>${htmlTable(tCarry)}<h2>A. Nội dung thường (F2P qua 100% từ ngày ${day(fair.f2pTatCa)})</h2>${htmlTable(tNormal)}${htmlTable(tTower)}${htmlTable(tDiff)}<h2>B. Nội dung đỉnh</h2>${htmlTable(tPeak)}${htmlTable(tPeakDay)}<h2>Chiến Lực đội (trung vị)</h2>${htmlTable(tCl)}</main></body></html>\n`;
  return { files, terminal };
}
