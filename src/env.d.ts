/// <reference types="vite/client" />
declare module "*.yaml" {
  const data: unknown;
  export default data;
}

interface Window {
  // Móc nạp lại nóng của môi trường xem thử cũ (giữ nguyên từ bản một file).

  claude?: any;
}
