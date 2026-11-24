# Hợp nhất ý tưởng từ các repo mã nguồn mở

Ngày khảo sát: 24/11/2026. Đã đọc mã nguồn, chỉ đọc chứ không chạy.

## 1. Nguồn và giấy phép

| Repo | Giấy phép | Engine | Dùng như thế nào |
|---|---|---|---|
| 526077247/GenshinGamePlay | MIT (© 2023 大大的奥斯卡) | Unity C# | Học kiến trúc. Code C# không chạy được trên web, phải viết lại bằng TypeScript |
| Wafflus/unity-genshin-impact-movement-system | MIT (© 2022 Gustavo Vieira) | Unity C# | Lấy bộ thông số và các trạng thái di chuyển |
| Gaolingx/GenshinCelShaderURP | MIT (© 2023 Gaolingx) | Unity HLSL | Học kỹ thuật shader. Không lấy thư mục `Model/` (có thể là mô hình trích từ game gốc) |
| kaze-mio/UnityGenshinToonShader | MIT (© 2023 风澪瑟) | Unity HLSL | Chuyển thuật toán sang GLSL cho Three.js |
| norio/vrm-game-starter | MIT (© 2026 norio) | Three.js WebGPU, TypeScript | Cùng ngôn ngữ, có thể chuyển trực tiếp phần toán (va chạm camera, IK chân) |
| aymenhayderhtml-pixel/pick-me-up-web-three-js | **Không có giấy phép** | Three.js | **Không được chép**, chỉ xem để biết |
| Hoyotoon, PrimoToon | | | **Loại bỏ.** Làm ra để hiển thị mô hình trích xuất trái phép |

Quy tắc:

- Đoạn code nào chép hoặc chuyển sát từ repo MIT thì ghi nguồn ở đầu file và thêm vào `THIRD_PARTY_NOTICES.md`.
- Không lấy mô hình, texture hay dữ liệu của game khác.

## 2. Hạng mục áp dụng, xếp theo độ ưu tiên

### A. Cảm giác di chuyển (nguồn: Wafflus) → `src/combat/*`, `content/feel`

Máy trạng thái gồm Idle → Walk/Run/Sprint → Stop (nhẹ/vừa/mạnh) → Dash → Jump/Fall → Land (nhẹ/lăn/nặng).

| Thông số | Giá trị gốc | Ý nghĩa |
|---|---|---|
| BaseSpeed | 5 m/s | tốc độ chạy cơ sở |
| Walk | ×0,225 | đi bộ (giữ phím đi hoặc cần analog nghiêng nhẹ) |
| Run | ×1,0 | chạy |
| Sprint | ×1,7 | chạy nhanh. Đang sprint mà nhả phím quá 1 s thì về run, quá 0,5 s nữa thì về walk |
| Dash | ×2,0 | lướt. Tối đa 2 lần liên tiếp, mỗi lần cách nhau dưới 1 s. Vượt giới hạn thì hồi 1,75 s |
| Stop | lực hãm 5 / 6,5 / 5 | dừng nhẹ sau walk, dừng vừa sau run, dừng mạnh sau sprint. Mỗi kiểu dùng một clip riêng |
| Fall | giới hạn tốc độ rơi 10 m/s | rơi từ trên 3 m thì tiếp đất nặng; đang chạy mà rơi thì lăn |
| Rotation | thời gian xoay tới hướng đích khoảng 0,14 s | xoay người mượt, không giật quay đầu |
| Camera recentering | | sau vài giây không xoay camera, camera tự vòng về sau lưng khi nhân vật chạy trong một dải góc nhất định |

Việc cần làm: thêm các trạng thái Stop ba mức và Land ba mức vào hệ thống di chuyển. S27 đang chuẩn bị nhóm động tác di chuyển, nên làm hai việc này cùng một đợt.

### B. Shader nhân vật kiểu anime (nguồn: kaze-mio, Gaolingx) → `src/render3d/toon/*`

1. **Bóng mặt SDF.** Dùng một texture lightmap cho mặt. So `dot(hướng mặt, hướng sáng)` với giá trị lightmap để bóng trên mặt luôn gọn, không loang lổ. Lật UV theo `cross(F, L).y` để bóng đổi bên trái phải. Lightmap mặt sinh bằng script Blender cho từng nhân vật (tự làm, không lấy texture của game khác).
2. **Ramp bóng theo vật liệu và giờ trong ngày.** Một texture ramp gồm 5 dòng vật liệu (da, tóc, vải, kim loại, khác) × 2 (ngày, đêm). Chọn dòng theo kênh alpha của lightmap. Ban đêm bóng ngả tím xanh.
3. **Viền sáng theo chiều sâu.** Lấy mẫu depth lệch theo pháp tuyến ở không gian view. Nếu độ chênh depth lớn hơn ngưỡng thì vẽ viền sáng, rồi nhân với fresnel. Viền chỉ hiện ở mép bóng ngoài, không bị bẩn như rim fresnel đơn thuần.
4. **Phản quang kim loại bằng matcap.** Chỉ áp cho vùng kim loại (kênh lightmap.r > 0,9). Vùng phi kim dùng highlight dạng bậc thang.
5. **Viền nét theo khoảng cách camera.** Độ dày viền nội suy theo khoảng cách view Z và FOV. Nhân thêm với vertex color alpha để mảnh lại ở mặt và ngón tay.
6. **Má hồng.** Pha màu má hồng vào albedo theo mặt nạ.

Việc cần làm: viết `toon/char-shader.ts` mở rộng MToon bằng onBeforeCompile hoặc NodeMaterial. Trên máy yếu chỉ bật mục 1 và 2.

### C. Camera (nguồn: vrm-game-starter, GenshinGamePlay) → `src/core/camera.ts`

- **Va chạm camera:** bắn tia hoặc mặt cầu từ nhân vật ra camera. Nếu chạm tường thì kéo camera lại gần, nới ra từ từ.
- **Camera theo ngăn xếp trạng thái:** các trạng thái thường, boss, nộ, hội thoại xếp chồng lên nhau, chuyển qua lại có pha trộn. Thay cho các biến zoom rời rạc hiện có.

### D. IK chân (nguồn: vrm-game-starter) → `src/render3d/toon/actor.ts`

Chân bám bậc thang và dốc. Bàn chân xoay theo pháp tuyến mặt đất. Giới hạn chỉnh tối đa 0,3–0,6 m, có làm mượt.

### E. Kiến trúc chiến đấu và màn chơi (nguồn: GenshinGamePlay) → `content/kits`, `src/combat`

- **Ability / Modifier / Mixin:** kỹ năng gồm các mixin dữ liệu, ví dụ "khi trúng đòn thì gắn trạng thái", "mỗi 1 s gây sát thương trong vùng". Mỗi kỹ năng mới chỉ cần thêm YAML, không phải viết code.
- **AI 3 tầng (biết – quyết – làm):** cây quyết định chọn hành vi, các module con lo cảm nhận, mục tiêu, kỹ năng, di chuyển.
- **SceneGroup:** cơ quan giải đố viết theo kiểu "sân khấu – diễn viên – kịch bản": vùng kích hoạt, giai đoạn, sự kiện. Phù hợp để làm bí cảnh và giải đố thế giới mở.

## 3. Thứ tự đề xuất

| Đợt | Hạng mục | Phụ thuộc |
|---|---|---|
| 1 | A (di chuyển) + D (IK chân) | đi cùng S27 nhóm di chuyển |
| 2 | B1, B2, B3 (bóng mặt, ramp, viền sáng) | sau khi đủ mô hình VRM đội khởi đầu |
| 3 | C (camera) | |
| 4 | B4, B5, B6 và E | lối chơi dài hạn |
