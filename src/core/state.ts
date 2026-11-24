// Trạng thái dùng chung giữa các module (trước đây là biến `let` cấp cao nhất trong bản một file).
export const GS = {
  toastT: undefined as ReturnType<typeof setTimeout> | undefined,
  AC: null as AudioContext | null,
  soundOn: false,
  WORLD: null as any,
  worldPos: null as null | { x: number; y: number; rx: number; ry: number },
  VW: 0,
  VH: 0,
  DPR: 1,
  ZOOM: 1,
  BASE_ZOOM: 1,
  camZoom: 1,
  /** Góc xoay camera 3D quanh trục đứng (rad); 0 là nhìn về phía bắc như bản 2D. */
  camYaw: 0,
  /** S25: góc nghiêng (rad) và khoảng cách camera 3D, đổi bằng kéo màn hình, lăn chuột hoặc chụm. */
  camPitch: 0.62,
  camDist: 13,
  G: null as any,
  scene: "menu",
  paused: false,
  holdAtk: false,
  /** Đang giữ nút kỹ năng (S30): t giây. */
  skHold: null as { t: number } | null,
  holdDash: false,
  /** Giữ phím đi bộ (máy trạng thái di chuyển). */
  holdWalk: false,
  lastSync: 0,
  hudCache: {} as Record<string, any>,
  mouse: { sx: 0, sy: 0, wx: 0, wy: 0, inside: false },
  /** Lớp giao diện đang mở trên game (bản đồ lớn, cài đặt, chỉnh bố cục); game tạm dừng. */
  overlay: null as null | string,
  isTouch: matchMedia("(pointer: coarse)").matches,
  lastT: performance.now(),
  /** Đồng hồ của chế độ quay xác định; null khi chơi bình thường. */
  capT: null as number | null,
  selChar: null as string | null,
  draftParty: null as any,
  wipeArm: 0,
};
