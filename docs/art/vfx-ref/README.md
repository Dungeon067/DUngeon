# Tham khảo VFX từ Gemini (bản 4)

`gemini-vfx-rev4.html` là bản mẫu Three.js chạy độc lập. Mở bằng trình duyệt; phím 1–4 tung chiêu, S chạy chậm 0,5×, F tạm dừng, `.` tiến từng khung hình.

Chỉ lấy những phần sau vào game, viết lại theo cấu trúc `src/render3d/vfx/`:

1. Pháo hoa của Mai Linh (`spawnFireworkShell`):
   - đạn bay lên kèm vệt sáng, nổ thành tia dài theo vận tốc, rủ xuống;
   - màu đổi dần vàng → cam → đỏ, có kim tuyến nhấp nháy;
   - quả số 3 nổ thành bông mai 5 cánh quay về phía camera.
2. Khói mềm theo nguyên tố (`spawnProceduralPuff`): ghép từ 9 vòng tròn, cel 2 tông, mép mờ.
3. Cụm băng mọc từ đất rồi vỡ khi pháp khí Băng trúng đích.
4. Bloom ngưỡng cao kết hợp cảm giác lực khi trúng đòn (`juice`):
   - đứng hình 3 khung;
   - rung camera;
   - vòng khúc xạ lan ra trên màn hình.
5. Bão Trắng có dải màu leo dần từ dưới lên (`uWaveY`) khi hút nguyên tố.

Không lấy Sóng Bạc. Giữ bản S30 đang có; sau này làm lại bằng mô hình Blender có xương.
