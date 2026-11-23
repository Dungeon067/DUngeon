/**
 * Giao diện "renderable" cho vật thể đặt trên bản đồ (câu đố, bí cảnh của S23...).
 * Logic câu đố chỉ cần đăng ký cách vẽ theo `kind`; renderer 2D gọi `draw2d`,
 * renderer 3D gọi `build3d`/`update3d` nếu có, nếu không thì tự vẽ `draw2d` ra canvas nhỏ
 * và dựng thành billboard. Xem docs/art/renderer-3d.md.
 */
export interface RenderableObj {
  /** Tọa độ thế giới (px logic, 1 ô = 40). */
  x: number;
  y: number;
  /** Độ cao chân theo bậc h (tùy chọn). */
  zh?: number;
  /** Trạng thái tùy ý của câu đố (bật/tắt, màu...). Renderer chỉ đọc. */
  [k: string]: unknown;
}

export interface Renderable3DCtx {
  /** Module three đã tải (kiểu any để file này không kéo three vào gói chính). */
  THREE: any;
  /** Chuyển tọa độ thế giới sang vị trí 3D. */
  toWorld(x: number, y: number, zh?: number): { x: number; y: number; z: number };
}

export interface RenderableDef {
  /** Vẽ 2D, gốc tọa độ ở chân vật thể (ctx đã dịch tới obj.x, obj.y). */
  draw2d(ctx: CanvasRenderingContext2D, obj: RenderableObj, t: number): void;
  /** Kích thước khung billboard tự sinh (px logic) khi không có build3d. */
  size?: { w: number; h: number };
  /** Dựng đối tượng 3D (THREE.Object3D) một lần. */
  build3d?(c: Renderable3DCtx, obj: RenderableObj): any;
  /** Cập nhật mỗi khung. */
  update3d?(o3d: any, obj: RenderableObj, t: number): void;
}

const REG = new Map<string, RenderableDef>();
/** Danh sách vật thể đang hiện; logic câu đố tự thêm/bớt. */
export const renderObjects: { kind: string; obj: RenderableObj }[] = [];

export function registerRenderable(kind: string, def: RenderableDef) {
  REG.set(kind, def);
}
export function getRenderable(kind: string) {
  return REG.get(kind);
}
