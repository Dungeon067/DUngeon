# Renderer 3D toon: cel-shading và nhân vật VRM (S25)

Hướng đồ họa (chủ dự án chốt 23/11): hoạt hình 3D kiểu anime (cel-shading), không còn pixel trong 3D. Sprite pixel Hạ Vy chỉ còn dùng cho renderer 2D dự phòng.

## Kiến trúc

- `src/render3d/select.ts` (không nhập three): chọn lớp vẽ. Người chơi luôn chạy 3D ở mọi chế độ (đảo, bí cảnh, Tháp, Hắc Giao); máy không có WebGL2 hoặc 3D lỗi hai lần thì hiện thông báo, không lùi về 2D. Lớp vẽ 2D trong `src/core/render.ts` chỉ còn chạy với `?e2e` hoặc `?renderer=2d` (kiểm thử tự động); `?e2e&renderer=3d` để kiểm thử 3D.
- `src/render3d/renderer3d.ts` (Three.js 0.170, tải sau): camera, ánh sáng, ngày đêm, đèn nguyên tố, hạt, vệt vũ khí, hậu kỳ.
- `src/render3d/toon/terrain.ts`: địa hình mượt, nước, cỏ, cây, đá, bia, cổng, rương, cầu.
- `src/render3d/toon/actor.ts`: nhân vật VRM, hoạt ảnh, vũ khí trên tay.
- `src/render3d/toon/monsters.ts`: quái low-poly tạm thời và Hắc Giao 3D (đốt thân bám `b.segs` của logic).
- `src/render3d/toon/arena.ts`: đấu trường Tháp Tinh Tú và hang Hắc Giao (S28).
- `src/render3d/toon/tele3d.ts`: vùng cảnh báo đòn và sóng xung kích 3D trên sàn đấu trường.
- `src/render3d/toon/sky.ts`, `mat.ts`: bầu trời, vật liệu toon 3 tông, viền inverted hull.
- Lớp logic không đổi: lưới 110×110, `h`, va chạm, nhảy, AI, câu đố S23. Renderer chỉ đọc `GS`. HUD, bản đồ nhỏ, bản đồ lớn vẫn là lớp 2D đè lên.

## Địa hình mượt từ lưới

1. Mỗi ô chia R×R đỉnh (R = 2 ở mức Thấp và Vừa, 3 ở mức Cao). Độ cao đỉnh lấy theo ô chứa nó; đỉnh nằm trên mép ô lấy ô cao nhất, nên mặt bệ phủ kín đúng ô logic.
2. Làm mượt 2 lượt (đáy nước làm mạnh hơn): mép bệ bo tròn, chân vách thoải, bờ nước dốc dần.
3. Chỗ dốc được rung ngang theo nhiễu và tô dải màu đá theo độ cao, nhìn như vách đá tự nhiên.
4. Màu đỉnh lấy mẫu loại ô ở vị trí lệch theo nhiễu rồi trộn 4 mẫu: đường đất uốn lượn, cỏ sang đất có viền mềm.
5. Chia khối 22×22 ô để bỏ khối ngoài màn hình. Va chạm vẫn theo lưới; nhân vật đứng theo mặt hiển thị (không thấp hơn mặt logic, ví dụ trên cầu cao).

Nước: một mặt phẳng shader, màu theo độ sâu, viền bọt trắng chạy theo bờ (khoảng cách tới đất tính sẵn trên lưới 4 điểm mỗi ô), vân sáng trôi.

## Phong cách

- Vật liệu `MeshToonMaterial` với gradient 3 tông, viền tối kiểu inverted hull (vật ở xa tắt viền để giảm tam giác).
- Nắng ấm, phần khuất nắng nhận ánh tím lam từ đất (hemisphere), nhân vật có rim light (MToon).
- Cỏ: nhiều ngọn, lay theo gió, tô từ gốc sẫm lên ngọn sáng, ô hoa có ngọn màu hoa. Rải lại quanh nhân vật khi đi xa.
- Cây: tán gồm 3 khối cầu, pháp tuyến hướng từ tâm tán nên bóng tô tròn mềm.
- Bầu trời: dải màu theo giờ, mây cách điệu, sao ban đêm. Sương xa theo màu chân trời. Bloom nhẹ (chỉ phần phát sáng).

## Nhân vật VRM

- Thả `public/media/models/<id>/model.vrm` là game tự nhận. Thiếu file thì dùng mẫu tạm `content/models.yaml › mau`.
- `content/models.yaml`: chiều cao hiển thị, vũ khí mặc định theo loại, vị trí vũ khí trên xương tay, clip hoạt ảnh theo loại vũ khí.
- Nạp bằng `@pixiv/three-vrm` 3.5.5: MToon, spring bone cho tóc và vạt áo.
- Hoạt ảnh: `public/media/anim/humanoid.json`, dựng từ thư viện CC0. Nguồn và cách ghép xem [nguon-hoat-anh.md](nguon-hoat-anh.md).
- Hướng: xoay tự do 360° theo joystick; khi ra đòn quay theo hướng ngắm (tự ngắm mục tiêu gần nhất, hoặc chuột). Nhịp đòn của logic giữ nguyên: clip được co giãn vào khung thời gian của đòn.
- Vũ khí: GLB xuất từ mô hình Blender của S24, đổi sang vật liệu toon có viền, gắn vào xương tay. Vũ khí cận chiến có vệt chém theo màu nguyên tố.

## Camera

Góc 3/4 phía sau và trên nhân vật, theo sát. Kéo chuột phải hoặc kéo màn hình (ngoài joystick và nút) để xoay; lăn chuột hoặc chụm hai ngón để zoom (6–22 ô). Joystick đi theo hướng camera. Camera tự kéo lại gần khi địa hình chắn giữa camera và nhân vật.

## Đấu trường (S28)

Tháp Tinh Tú và Hắc Giao không có bản đồ ô (`GS.G.map` rỗng): renderer dựng đấu trường một lần khi vào trận (theo `GS.G`), dọn sạch (geometry, vật liệu, texture, Reflector) khi về đảo, đổi mức đồ họa hoặc rời màn chơi. Sàn phẳng ở y = 0, khung đi lại vẫn là `GS.G.bounds`; logic chiến đấu không đổi. Dùng chung nhân vật VRM, vệt chém, hạt nguyên tố, đèn điểm, bloom/tilt-shift của renderer thế giới.

- **Tháp Tinh Tú:** sàn bát giác lơ lửng giữa trời sao, lát đá có vòng chú văn phát sáng, viền và tám cột đá có đá sao trên đỉnh, hai vòng chòm sao xoay chậm, đá vụn trôi. Màu theo tầng (`floorPalette`): 1–3 vàng sao, 4–6 lam ngọc, 7–9 tử vi, 10–12 huyết tinh. Cổng ra ở mép bắc, mở rực khi vượt tầng. Lúc chờ đợt mới: đá sao sáng dần, vòng triệu hồi ở cung xuất quái; quái xuất hiện có cột sáng, vòng lan và hạt. Cột chắn trước camera tự thu nhỏ.
- **Hang Hắc Giao:** vách và vòm đá (vẽ mặt trong, camera lùi ra ngoài vẫn nhìn xuyên), nhũ đá, măng đá, cụm nấm và tinh thể lân tinh có quầng sáng, bào tử trôi, cột sáng từ khe trần. Mặt nước đen gợn sóng có ánh đèn lân tinh phản chiếu; mức Cao thêm ảnh phản chiếu thật (Reflector nửa độ phân giải). Giai đoạn 2: hang ngả tím Lôi, chớp sáng, tia lôi dọc thân boss.
- **Hắc Giao 3D:** đầu có hàm mở khi lấy đà, sừng cong, râu, bờm vây; 13 đốt thân theo đúng `b.segs`, vây lưng và đốm phát sáng đổi màu theo nguyên tố; mỗi nhóm gộp thành 1 lưới màu đỉnh + viền + 1 lưới phát sáng. Bị hạ thì chìm dần.
- **Cảnh báo đòn:** decal shader trên sàn, cùng hình và tiến độ với bản 2D (`art/props.ts`): quạt, đường lao, mưa, vòng triệu hồi của boss; vòng, cung, nhảy, đường đạn của quái thường. Sóng xung kích là vòng sáng có vách thấp. Thanh máu quái, dấu "!", thanh chịu đòn và sao choáng của boss là lớp 2D chiếu qua `project()`.
- **Ngân sách (đo SwiftShader 1280×720, có VRM):** Tháp khoảng 100–230 lệnh vẽ, 160–170k tam giác; Hắc Giao Thấp 173 / Vừa 348 / Cao khoảng 510 lệnh vẽ (Cao vẽ thêm lượt phản chiếu).

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

Chưa có `build3d` thì renderer tự vẽ `draw2d` ra canvas nhỏ và dựng thành tấm phẳng. Câu đố, NPC quest mini và cửa bí cảnh S23 hiện có (`src/world/draw-puzzles.ts`) được chiếu bản vẽ 2D lên đúng điểm chân trong cảnh 3D.

## Mức đồ họa

| Mức  | Độ phân giải | Bóng                 | Bloom | Tilt-shift | Đèn điểm | Cỏ (ngọn/ô) | Địa hình |
| ---- | ------------ | -------------------- | ----- | ---------- | -------- | ----------- | -------- |
| Thấp | 0,7          | Bóng tròn dưới chân  | Tắt   | Tắt        | 2        | Tắt         | R = 2    |
| Vừa  | 0,85         | Shadow map 1024 cứng | Bật   | Tắt        | 4        | 2 cụm       | R = 2    |
| Cao  | 1, MSAA 4×   | Shadow map 2048 mềm  | Bật   | Bật        | 8        | 4 cụm       | R = 3    |

Ngân sách nhân vật: 20–30k tam giác mỗi mẫu, texture 1024–2048.

## Ngày đêm

`timeOfDay()`: một ngày bằng 8 phút chơi. `?tod=0.9` hoặc `GS.tod` ép giờ. Ban đêm ánh trăng tím lam, bật đèn ở bia và cổng, sao trên trời.

## Đo đạc

`node tools/render3d/milestone.mjs video|shots|fps <thư mục>` (cần dev server, đặt `URL` nếu khác cổng 5173). `node tools/render3d/probe.mjs <ảnh>` chụp nhanh một khung, biến môi trường `Q`, `TOD`, `HERO`, `EVAL`, `DBG`.
