/*
 * Xuất icon PNG từ assets/icon/icon.svg (S22). Chạy: `pnpm icons`.
 * Ra public/icons/ (PWA, apple-touch-icon, favicon) và assets/icon/icon-1024.png
 * (nguồn cho `tauri icon` và icon Android/iOS của Capacitor).
 */
import { Resvg } from "@resvg/resvg-js";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const svg = readFileSync("assets/icon/icon.svg", "utf8");
const png = (size: number, src = svg) =>
  new Resvg(src, { fitTo: { mode: "width", value: size }, font: { loadSystemFonts: false } }).render().asPng();

/* Maskable: nền phủ kín, nội dung thu về 72% để không bị cắt khi hệ điều hành bo tròn hay cắt tròn. */
const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const masked = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#0f1430"/><g transform="translate(71.7 71.7) scale(0.72)">${inner}</g></svg>`;

mkdirSync("public/icons", { recursive: true });
const out: [string, Buffer][] = [
  ["public/icons/icon-192.png", png(192)],
  ["public/icons/icon-512.png", png(512)],
  ["public/icons/maskable-512.png", png(512, masked)],
  ["public/icons/maskable-192.png", png(192, masked)],
  ["public/icons/apple-touch-icon-180.png", png(180)],
  ["public/icons/favicon-32.png", png(32)],
  ["assets/icon/icon-1024.png", png(1024)],
  ["assets/icon/icon-foreground-1024.png", png(1024, masked)],
];
for (const [p, b] of out) writeFileSync(p, b);
writeFileSync("public/icons/icon.svg", svg);
console.log(out.map(([p, b]) => `${p} ${b.length} B`).join("\n"));

/* Icon và màn chờ cho bản Android/iOS (Capacitor): ghi đè ảnh mặc định của Capacitor theo đúng cỡ cũ. */
const pngSize = (p: string) => {
  const b = readFileSync(p);
  return [b.readUInt32BE(16), b.readUInt32BE(20)] as const;
};
const splash = (w: number, h: number) => {
  const s = Math.round(Math.min(w, h) * 0.42);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#0f1430"/><g transform="translate(${(w - s) / 2} ${(h - s) / 2}) scale(${s / 512})">${inner}</g></svg>`;
};
const native: string[] = [];
const put = (p: string, b: Buffer) => (writeFileSync(p, b), native.push(p));
if (existsSync("android/app/src/main/res")) {
  const res = "android/app/src/main/res";
  const dens: [string, number][] = [
    ["mdpi", 1],
    ["hdpi", 1.5],
    ["xhdpi", 2],
    ["xxhdpi", 3],
    ["xxxhdpi", 4],
  ];
  for (const [d, k] of dens) {
    put(`${res}/mipmap-${d}/ic_launcher.png`, png(48 * k, masked));
    put(`${res}/mipmap-${d}/ic_launcher_round.png`, png(48 * k, masked));
    // Tiền cảnh icon thích ứng: 108 dp, vùng an toàn 66 dp ở giữa.
    const fg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108"><g transform="translate(19 19) scale(${70 / 512})">${inner}</g></svg>`;
    put(`${res}/mipmap-${d}/ic_launcher_foreground.png`, png(108 * k, fg));
  }
  for (const dir of readdirSync(res).filter((n) => n.startsWith("drawable"))) {
    const p = `${res}/${dir}/splash.png`;
    if (existsSync(p)) put(p, png(pngSize(p)[0], splash(...pngSize(p))));
  }
}
const ios = "ios/App/App/Assets.xcassets";
if (existsSync(ios)) {
  put(
    `${ios}/AppIcon.appiconset/AppIcon-512@2x.png`,
    png(1024, masked.replace("<svg ", '<svg width="1024" height="1024" ')),
  );
  for (const f of readdirSync(`${ios}/Splash.imageset`).filter((n) => n.endsWith(".png")))
    put(`${ios}/Splash.imageset/${f}`, png(2732, splash(2732, 2732)));
}
if (native.length) console.log(`${native.length} ảnh Android/iOS`);
