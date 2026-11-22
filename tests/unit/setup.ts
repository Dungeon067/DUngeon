import { readFileSync } from "node:fs";
import { join } from "node:path";

// Dựng DOM giống index.html để các module đọc phần tử lúc nạp.
const html = readFileSync(join(process.cwd(), "index.html"), "utf8");
document.body.innerHTML = html.slice(html.indexOf("<canvas"), html.indexOf('<script type="module"'));

// jsdom không có canvas: thay bằng đối tượng bỏ qua mọi lệnh vẽ.
const noop: ProxyHandler<object> = {
  get: (_t, k) =>
    k === "measureText"
      ? () => ({ width: 0 })
      : k === "canvas"
        ? document.createElement("canvas")
        : () => new Proxy({}, noop),
  set: () => true,
};
HTMLCanvasElement.prototype.getContext = (() => new Proxy({}, noop)) as unknown as HTMLCanvasElement["getContext"];
window.matchMedia ??= ((q: string) => ({
  matches: false,
  media: q,
  addEventListener() {},
  removeEventListener() {},
})) as unknown as typeof window.matchMedia;
