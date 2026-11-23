# Renderer 3D: pixel trong cảnh 3D (S25)

## Kiến trúc

- `src/render3d/select.ts` (không nhập three): chọn lớp vẽ. Cài đặt **Lớp vẽ thế giới**: Tự chọn / 3D / 2D. URL `?renderer=2d|3d` để thử; `localStorage.tt_force2d = "1"` ép 2D. Không có WebGL2, tải lỗi hoặc mất context thì tự lùi về Canvas 2D cũ.
- `src/render3d/renderer3d.ts` (Three.js 0.170, MIT, tải sau): camera, ánh sáng, ngày đêm, đèn nguyên tố, hạt, hậu kỳ.
- `src/render3d/world3d.ts`: dựng lưới logic thành mesh. 1 ô = 1 đơn vị, 1 bậc `h` = 22/40 đơn vị. Khối 22×22 ô gộp một geometry: mặt trên theo `h`, vách nơi ô bên cạnh thấp hơn, nước, cây và đá (InstancedMesh), bia, rương, cổng, cầu cao `decks`.
- `src/render3d/actors3d.ts`: billboard 8 hướng đọc `media/sprites/<id>/sheet.json`. Thiếu sheet thì vẽ sprite 2D cũ ra canvas rồi dán lên billboard. Nhân vật bị cây hay vách che thì hiện bóng mờ.
- Lớp logic không đổi: lưới 110×110, `h`, va chạm, nhảy, AI. Renderer chỉ đọc `GS`. HUD, bản đồ nhỏ, bản đồ lớn vẫn là lớp 2D đè lên; chữ sát thương chiếu từ 3D ra màn hình.
- Đấu trường boss (không có `G.map`) và menu vẫn vẽ bằng 2D ở mốc 1.

## Giao diện renderable (cho S23)

```ts
import { registerRenderable, renderObjects } from "src/render3d/renderables";
registerRenderable("cot-bang", {
  draw2d(ctx, obj, t) { /* vẽ 2D, gốc ở chân vật */ },
  size: { w: 48, h: 64 },        // tùy chọn, cho billboard tự sinh
  build3d({ THREE, toWorld }, obj) { return new THREE.Mesh(...); }, // tùy chọn
  update3d(o3d, obj, t) {},        // tùy chọn
});
renderObjects.push({ kind: "cot-bang", obj: { x, y, on: false } });
```

Chưa có `build3d` thì renderer 3D tự vẽ `draw2d` ra canvas nhỏ và dựng billboard, nên câu đố hiện ngay trong 3D mà không sửa logic.

## Mức đồ họa

| Mức  | Độ phân giải | Bóng                 | Bloom | Tilt-shift | Đèn điểm |
| ---- | ------------ | -------------------- | ----- | ---------- | -------- |
| Thấp | 0,5          | Bóng tròn dưới chân  | Tắt   | Tắt        | 2        |
| Vừa  | 0,75         | Shadow map 1024 cứng | Bật   | Tắt        | 4        |
| Cao  | 1            | Shadow map 2048 mềm  | Bật   | Bật        | 8        |

## Ngày đêm

`timeOfDay()`: một ngày bằng 8 phút chơi. `?tod=0.9` hoặc `GS.tod` ép giờ. Ban đêm bật đèn ở bia và cổng, ánh nguyên tố quanh nhân vật.

## Đo đạc

`node tools/render3d/milestone.mjs video|shots|fps <thư mục>` (cần `pnpm dev --port 5173`).
