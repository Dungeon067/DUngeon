/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/** Số phiên bản trong package.json, Vite thay lúc build. */
declare const __APP_VERSION__: string;
declare module "*.yaml" {
  const data: unknown;
  export default data;
}

interface Window {
  // Móc nạp lại nóng của môi trường xem thử cũ (giữ nguyên từ bản một file).

  claude?: any;
}
