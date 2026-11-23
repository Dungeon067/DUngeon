# Kinh tế và phân cấp sức mạnh (S19)

Thiết kế và mô phỏng kinh tế của Vọng Tinh Giới, sẵn sàng cho việc nạp sau giai đoạn thử nghiệm. **Chưa có và không có code thanh toán thật.**

| Tài liệu                                     | Nội dung                                                                                                              |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [phan-cap-suc-manh.md](phan-cap-suc-manh.md) | Các nguồn sức mạnh, công thức Chiến Lực, ba hồ sơ người chơi, nguyên tắc công bằng, những gì bán và không bao giờ bán |
| [kinh-te.md](kinh-te.md)                     | Dòng Đá Sao, Xu, Sách Kinh Nghiệm, nguyên liệu, Linh Lực theo ngày, tuần, tháng; lạm phát và chỗ tiêu                 |
| [goi-nap-de-xuat.md](goi-nap-de-xuat.md)     | Gói nạp đề xuất (VND), giá trị mỗi đồng, bảo vệ người chơi, yêu cầu pháp lý ở Việt Nam                                |
| [ket-qua/](ket-qua/)                         | Kết quả lần chạy chuẩn: `tom-tat.md`, `bao-cao.html` (biểu đồ), các file CSV                                          |

## Nguồn số liệu duy nhất

Mọi con số nằm trong [`content/economy.yaml`](../../content/economy.yaml), kiểm tra bằng schema trong `src/data/economy-schema.ts` (`pnpm content:check`).

- Mục `game`: đang chạy trong game (thưởng rương, Tháp, Hắc Giao, Ủy thác, chi phí lên cấp, hệ số cấp và Nét Sao, Xu khi trùng N6, Xu cho vật phẩm 3★, hệ số Chiến Lực). Server giả lập đọc từ đây.
- Mục `thietKe`: Khai Tinh, kỹ năng, vũ khí, Bảo Ấn, cấp Hộ Tinh, Thiên Tượng, Linh Lực, thu nhập, mốc cốt truyện, trần chênh lệch. Mới có trong tài liệu và mô phỏng.
- Mục `goiNap`, `hoSo`, `moPhong`: gói nạp đề xuất, ba hồ sơ người chơi, thông số mô phỏng.
- Tỉ lệ ước nguyện (0,6%, Bảo Hộ Vận Sao 74/90, 50/50) vẫn ở `content/config.yaml` mục `gacha`; bước tăng sau mốc mềm, bảo đảm 4★ và tỉ lệ 50/50 ở `economy.yaml` mục `game.uocNguyen`.

## Chạy mô phỏng

```bash
pnpm economy:sim                       # 100.000 người chơi ảo mỗi hồ sơ, 180 ngày (khoảng 25 giây)
pnpm economy:sim --players 5000 --days 90 --out /tmp/thu
pnpm economy:sim --seed 42             # đổi seed; cùng seed luôn cho cùng kết quả
```

Lệnh in bảng so sánh ra terminal, ghi CSV và HTML vào `docs/economy/ket-qua/`, và **thoát mã 1 nếu một nguyên tắc công bằng TRƯỢT**. Đổi số trong `economy.yaml` thì chạy lại để cập nhật kết quả.

Mã nguồn: `src/economy/core.ts` (công thức dùng chung cho game, Admin và mô phỏng), `tools/economy/sim.ts` (mô phỏng), `tools/economy/report.ts` (CSV, HTML, bảng), `tools/economy/main.ts` (dòng lệnh).

## Trong game

- Chiến Lực hiện ở màn Nhân vật (thẻ Thông tin và Chỉ số) và màn Đội hình (từng ô và tổng đội).
- Trang Admin (`/admin/#kinh-te`) có mục Kinh tế: dòng Đá Sao vào và ra, chỉnh mọi con số trong `economy.yaml` (lưu trên trình duyệt, áp dụng ngay), tải YAML, bảng Chiến Lực và giá trị gói nạp.
