# Vũ khí (S23)

Danh sách 26 vũ khí, tên đặt lại ở S23. Nguồn duy nhất: [`content/weapons.yaml`](../../content/weapons.yaml) (tên, bị động, truyện, chỉ số), kiểm tra bằng `src/data/weapons-schema.ts` (`pnpm content:check`). Khi nạp, danh sách được ghép vào `thietKe.vuKhi.danhSach` của `economy.yaml` để game, trang Admin và mô phỏng dùng chung. Chỉ số và banner vũ khí: [phan-cap-suc-manh.md](phan-cap-suc-manh.md) mục 2.

## Quy tắc đặt tên

- **5★:** Hán Việt bốn chữ, hùng tráng như tên tuyệt kỹ. Riêng vũ khí của Golnar giữ đúng tên chủ dự án chốt (sáu chữ).
- **4★:** thuần Việt, có chất thơ, gắn một nơi trên Đảo Lạc.
- **3★:** mộc mạc, đời thường, nói thẳng vũ khí là gì và của ai.
- Mỗi vũ khí có một tên bị động riêng. Bị động tăng sát thương gây ra; mỗi bậc tinh luyện thêm 25% mức R1, R5 gấp đôi R1 (`thietKe.vuKhi.buocTinhLuyen`).
- Truyện 2–3 câu theo `docs/writing/huong-dan-van-phong.md` mục 4.1, gắn địa danh và truyền thuyết trong `docs/world/`. Truyện nằm trong `weapons.yaml`.
- Tên đều tự đặt, không dịch hay chép tên vũ khí của game khác. Schema chặn tên vũ khí hoặc tên bị động trùng nhau và tên quá 6 âm tiết.

## Danh sách

### 5★ giới hạn

| Tên                         | Loại     | ★   | Lấy ở đâu               | Đặc trưng của | Bị động               | R1 / R2 / R3 / R4 / R5      | Tên cũ (S19)         |
| --------------------------- | -------- | --- | ----------------------- | ------------- | --------------------- | --------------------------- | -------------------- |
| **Thiên Lôi Phá Trận**      | Thương   | 5★  | Banner vũ khí (nổi bật) | Lôi Đình      | Sấm Rền Chín Tầng     | 24% / 30% / 36% / 42% / 48% | Thương Mây Giông     |
| **Tuyết Lạc Vô Thanh**      | Kiếm đơn | 5★  | Banner vũ khí (nổi bật) | Tuyết Lan     | Hàn Lan Tĩnh Nở       | 24% / 30% / 36% / 42% / 48% | Băng Lan Kiếm        |
| **Đóa Hồng Ngủ Trong Băng** | Pháp khí | 5★  | Banner vũ khí (nổi bật) | Golnar        | Băng Tâm Ủ Hương      | 24% / 30% / 36% / 42% / 48% | Thiên Văn Tỏa Nguyệt |
| **Phong Đỉnh Vô Cực**       | Thương   | 5★  | Banner vũ khí (nổi bật) | Takane        | Nhất Phong Quá Lĩnh   | 24% / 30% / 36% / 42% / 48% | Hoa Rơi Trên Sóng    |
| **Vó Sấm Thảo Nguyên**      | Cung     | 5★  | Banner vũ khí (nổi bật) | Naraa         | Lôi Mã Truy Phong     | 24% / 30% / 36% / 42% / 48% | Phong Tiêu Du Ca     |
| **Chuông Lửa Vạn Niên**     | Đại kiếm | 5★  | Banner vũ khí (nổi bật) | Ardo          | Hỏa Chung Trường Minh | 24% / 30% / 36% / 42% / 48% | Trầm Sa Hoàng Kim    |
| **Thủy Mặc Vấn Thiên**      | Pháp khí | 5★  | Banner vũ khí (nổi bật) | Nghiên Thu    | Bút Lạc Thành Hà      | 24% / 30% / 36% / 42% / 48% | Nghiên Mặc Thư Lâm   |

### 5★ thường trú

| Tên                      | Loại     | ★   | Lấy ở đâu                | Đặc trưng của | Bị động             | R1 / R2 / R3 / R4 / R5      | Tên cũ (S19)                |
| ------------------------ | -------- | --- | ------------------------ | ------------- | ------------------- | --------------------------- | --------------------------- |
| **Hồng Vũ Trường Ca**    | Kiếm đơn | 5★  | Banner vũ khí (khi lệch) | Lạc Hồng      | Cánh Lửa Trống Đồng | 16% / 20% / 24% / 28% / 32% | Hồng Vũ Trường Ca (giữ tên) |
| **Bàn Thạch Trấn Sơn**   | Đại kiếm | 5★  | Banner vũ khí (khi lệch) | Thạch Sơn     | Vạn Thạch Quy Tông  | 16% / 20% / 24% / 28% / 32% | Đại Kiếm Bia Cổ             |
| **Kính Thủy Lưu Nguyệt** | Pháp khí | 5★  | Banner vũ khí (khi lệch) | Thủy Nguyệt   | Nguyệt Ảnh Trầm Hồ  | 16% / 20% / 24% / 28% / 32% | Chuông Bạc Hồ Sâu           |
| **Ngự Phong Truy Vân**   | Cung     | 5★  | Banner vũ khí (khi lệch) | Phong Vân     | Vân Khai Kiến Nhật  | 16% / 20% / 24% / 28% / 32% | Cung Đỉnh Mây               |

### 4★ Lò Rèn

| Tên                       | Loại     | ★   | Lấy ở đâu | Đặc trưng của | Bị động            | R1 / R2 / R3 / R4 / R5          | Tên cũ (S19)       |
| ------------------------- | -------- | --- | --------- | ------------- | ------------------ | ------------------------------- | ------------------ |
| **Lời Thề Bãi Sao**       | Kiếm đơn | 4★  | Lò Rèn    | —             | Sao Rơi Giữ Hẹn    | 10% / 12,5% / 15% / 17,5% / 20% | Kiếm Thép Làng Rèn |
| **Tiếng Trống Đình Làng** | Đại kiếm | 4★  | Lò Rèn    | —             | Trống Dồn Ba Hồi   | 10% / 12,5% / 15% / 17,5% / 20% | Đại Kiếm Đồng Hun  |
| **Đèn Canh Hải Đăng**     | Pháp khí | 4★  | Lò Rèn    | —             | Ánh Đèn Gọi Thuyền | 10% / 12,5% / 15% / 17,5% / 20% | Đèn Pháp Phố Cổ    |
| **Mảnh Trăng Bến Cũ**     | Cung     | 4★  | Lò Rèn    | —             | Trăng Soi Đầu Tên  | 10% / 12,5% / 15% / 17,5% / 20% | Cung Tre Ven Sông  |
| **Gió Bấc Trại Bắc**      | Thương   | 4★  | Lò Rèn    | —             | Đứng Vững Đầu Gió  | 10% / 12,5% / 15% / 17,5% / 20% | Thương Gỗ Lim (4★) |

### 4★ banner

| Tên                         | Loại     | ★   | Lấy ở đâu     | Đặc trưng của | Bị động              | R1 / R2 / R3 / R4 / R5      | Tên cũ (S19)      |
| --------------------------- | -------- | --- | ------------- | ------------- | -------------------- | --------------------------- | ----------------- |
| **Sương Sớm Bến Sông**      | Kiếm đơn | 4★  | Banner, rương | —             | Lưỡi Kiếm Đọng Sương | 12% / 15% / 18% / 21% / 24% | Kiếm Sương Sớm    |
| **Khúc Hát Người Kéo Lưới** | Đại kiếm | 4★  | Banner, rương | —             | Nhịp Chèo Về Bến     | 12% / 15% / 18% / 21% / 24% | Đại Kiếm Sóng Bạc |
| **Bóng Trăng Hồ Gương**     | Pháp khí | 4★  | Banner, rương | —             | Mặt Hồ Không Gợn     | 12% / 15% / 18% / 21% / 24% | Ngọc Bội Hồ Trăng |
| **Tiếng Sấm Đầu Mùa**       | Cung     | 4★  | Banner, rương | —             | Mưa Rào Qua Đồng     | 12% / 15% / 18% / 21% / 24% | Cung Đêm Sét      |
| **Mạch Ngọc Lòng Chảo**     | Thương   | 4★  | Banner, rương | —             | Đèn Mỏ Không Tắt     | 12% / 15% / 18% / 21% / 24% | Thương Mỏ Ngọc    |

### 3★

| Tên                   | Loại     | ★   | Lấy ở đâu     | Đặc trưng của | Bị động            | R1 / R2 / R3 / R4 / R5       | Tên cũ (S19)      |
| --------------------- | -------- | --- | ------------- | ------------- | ------------------ | ---------------------------- | ----------------- |
| **Kiếm Sắt Lữ Khách** | Kiếm đơn | 3★  | Banner, rương | —             | Đường Xa Chân Cứng | 6% / 7,5% / 9% / 10,5% / 12% | Kiếm Sắt Tuần Tra |
| **Đại Kiếm Xóm Mỏ**   | Đại kiếm | 3★  | Banner, rương | —             | Tay Chai Vai Rộng  | 6% / 7,5% / 9% / 10,5% / 12% | Đại Kiếm Thợ Đá   |
| **Vở Chép Thầy Đồ**   | Pháp khí | 3★  | Banner, rương | —             | Nét Chữ Nết Người  | 6% / 7,5% / 9% / 10,5% / 12% | Sách Học Trò      |
| **Cung Tre Đầu Làng** | Cung     | 3★  | Banner, rương | —             | Mắt Người Đi Săn   | 6% / 7,5% / 9% / 10,5% / 12% | Cung Săn          |
| **Thương Gỗ Lim**     | Thương   | 3★  | Banner, rương | —             | Canh Đêm Bến Đò    | 6% / 7,5% / 9% / 10,5% / 12% | Thương Lính Gác   |

## Ghi chú khớp loại vũ khí

Tên chủ dự án chốt đều giữ nguyên. Vài chỗ chỉnh nhẹ ở hình dáng vũ khí cho khớp loại của nhân vật:

- **Đóa Hồng Ngủ Trong Băng** (Golnar, pháp khí): pháp khí là một đóa hoa lựu đỏ hồng đông trong khối băng. "Golnar" nghĩa là hoa lựu, nên chọn hoa lựu thay cho hoa hồng.
- **Thủy Mặc Vấn Thiên** (Nghiên Thu, pháp khí): pháp khí là một nghiên đá; chữ "thủy mặc" là nước thay mực.
- **Chuông Lửa Vạn Niên** (Ardo, đại kiếm): đại kiếm đúc lại từ đồng của một quả chuông nứt, vẫn giữ tiếng chuông.
- **Vó Sấm Thảo Nguyên** (Naraa, cung) và **Phong Đỉnh Vô Cực** (Takane, thương): khớp loại, không chỉnh.
- **Thiên Lôi Phá Trận** (Lôi Đình, thương) thay Thương Mây Giông; **Tuyết Lạc Vô Thanh** (Tuyết Lan, kiếm đơn) thay Băng Lan Kiếm. Hai vũ khí này lên 5★ giới hạn vì Lôi Đình và Tuyết Lan nay là nhân vật giới hạn; Hồng Vũ Trường Ca xuống 5★ thường trú vì Lạc Hồng nay là thường trú.
- Thanh **Thương Gỗ Lim** cũ (4★ Lò Rèn) đổi thành Gió Bấc Trại Bắc; tên Thương Gỗ Lim nay là của vũ khí 3★ (trước là Thương Lính Gác).

Vũ khí trong truyện của nhân vật (ví dụ Kiếm Hồng Điểu của Lạc Hồng, Lưỡi Mây Aianga của Lôi Đình, `docs/world/08-vat-pham-va-di-vat.md`) là vật riêng trong truyện, khác với vũ khí ước nguyện ở đây.
