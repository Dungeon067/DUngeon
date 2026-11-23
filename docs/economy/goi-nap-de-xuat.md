# Gói nạp đề xuất (chưa làm)

> Tài liệu thiết kế. **Giai đoạn thử nghiệm không có và không tích hợp thanh toán tiền thật.** Số liệu ở `content/economy.yaml` mục `goiNap`, chỉ dùng cho mô phỏng.

## 1. Các gói

Một lượt Ước nguyện = 160 Đá Sao.

| Gói                                |              Giá |                                   Đá Sao |                                               Thưởng |          Đá Sao / 1.000 đ | Lần đầu nhân đôi / 1.000 đ | Giá mỗi lượt ước |
| ---------------------------------- | ---------------: | ---------------------------------------: | ---------------------------------------------------: | ------------------------: | -------------------------: | ---------------: |
| Túi Đá Sao nhỏ                     |         20.000 đ |                                       50 |                                                    0 |                      2,50 |                       5,00 |         64.000 đ |
| Túi Đá Sao                         |        100.000 đ |                                      250 |                                                   15 |                      2,65 |                       5,00 |         60.377 đ |
| Hộp Đá Sao                         |        300.000 đ |                                      750 |                                                   75 |                      2,75 |                       5,00 |         58.182 đ |
| Rương Đá Sao                       |        600.000 đ |                                    1.500 |                                                  200 |                      2,83 |                       5,00 |         56.471 đ |
| Rương Đá Sao lớn                   |      1.000.000 đ |                                    2.500 |                                                  400 |                      2,90 |                       5,00 |         55.172 đ |
| Kho Đá Sao                         |      2.000.000 đ |                                    5.000 |                                                1.000 |                      3,00 |                       5,00 |         53.333 đ |
| **Thẻ Trăng** (thẻ tháng, 30 ngày) |         79.000 đ | 300 ngay + 90 mỗi ngày đăng nhập = 3.000 |                                                    — |                 **37,97** |                          — |          4.213 đ |
| **Hộ Chiếu Sao** (42 ngày)         |        149.000 đ |                                      680 | 120 Sách, 300.000 Xu, 1 vũ khí 4★ chọn, 1 trang phục | 4,56 (chưa tính vật phẩm) |                          — |         35.059 đ |
| Trang phục                         | 99.000–299.000 đ |                                        — |                                         Chỉ đổi hình |                         — |                          — |                — |

- **Lần đầu nhân đôi:** mỗi mệnh giá Đá Sao một lần trên mỗi tài khoản, nhận gấp đôi số Đá Sao gốc (thay cho phần thưởng thường).
- **So sánh:** Thẻ Trăng có giá trị mỗi đồng cao nhất (gấp ≈ 13 lần gói Đá Sao lớn nhất) để người nạp ít được lợi nhất. Gói lớn chỉ rẻ hơn gói nhỏ 17% mỗi lượt, để không thúc người chơi nạp gói to.
- Hộ Chiếu Sao có nhánh miễn phí cho mọi người; nhánh trả phí chỉ thêm Đá Sao, nguyên liệu và trang phục, không thêm chỉ số.

## 2. Bảo vệ người chơi

1. **Công khai tỉ lệ** ngay trên màn Ước nguyện và trong trang riêng: 5★ 0,6%, 4★ 5,1%, mốc tăng tỉ lệ từ lượt 74, chắc chắn 5★ ở lượt 90, 50/50 nhân vật nổi bật, bảo đảm 4★ mỗi 10 lượt; tỉ lệ thực tế tổng hợp gồm cả Bảo Hộ Vận Sao. Hiện số lượt đã ước kể từ lần 5★ gần nhất.
2. **Giới hạn chi tiêu do người chơi tự đặt** theo ngày, tuần, tháng. Mặc định 2.000.000 đ/tháng (`hanMucTuDatMacDinh`); hạ thì có hiệu lực ngay, nâng thì có hiệu lực sau 24 giờ.
3. **Không còn hạn mức hệ thống để giữ cân bằng.** Cân bằng dựa vào mô hình phân tầng nội dung (xem [phan-cap-suc-manh.md](phan-cap-suc-manh.md) mục 6). Hạn mức do người chơi tự đặt và cảnh báo dưới đây vẫn bắt buộc.
4. **Cảnh báo khi nạp nhiều trong ngày:** tổng nạp trong ngày vượt 1.000.000 đ (`canhBaoNgay`) thì hiện cảnh báo, kèm tổng đã nạp trong ngày, tuần, tháng; người chơi phải chờ 10 giây mới xác nhận tiếp được.
5. **Không dùng giao diện đánh lừa:**
   - nút nạp không đặt ở vị trí nút "Đóng", "Tiếp" hay nút đánh; không có nút nạp trong màn chiến đấu;
   - không đếm ngược giả, không "chỉ còn 2 suất" khi không thật; gói có thời hạn thì ghi ngày giờ kết thúc thật;
   - giá ghi bằng đồng (VND), không chỉ ghi bằng Đá Sao; Đá Sao còn lại hiện rõ trước khi ước;
   - không gói "may rủi" trả bằng tiền thật trực tiếp: tiền chỉ đổi ra Đá Sao, rồi người chơi tự chọn ước.
6. **Xác nhận hai bước trước khi nạp:** bước 1 chọn gói và xem giá, nội dung, tổng đã nạp trong tháng; bước 2 xác nhận lại ở màn riêng (hoặc qua cổng thanh toán). Không lưu lựa chọn "không hỏi lại".
7. **Người dưới 18 tuổi:** hạn mức đề xuất 500.000 đ/tháng (`hanMucDuoi18`), cần xác thực theo quy định (xem mục 3).
8. **Banner vũ khí cũng công khai đầy đủ:** 5★ 0,7%, 4★ 6%, tăng tỉ lệ từ lượt 63, chắc chắn 5★ ở lượt 77, 75% là vũ khí nổi bật, cách tính La Bàn Sao.
9. **Nút nạp trong bản thử nghiệm (nếu có) chỉ là giao diện giả**, ghi rõ nhãn "chưa mở", không gọi bất kỳ cổng thanh toán nào.
10. **Hoàn tiền và hỗ trợ:** có kênh khiếu nại, lịch sử giao dịch đầy đủ trong game.

## 3. Yêu cầu pháp lý ở Việt Nam

> **Chưa phải tư vấn pháp lý.** Danh sách dưới đây do Devin tổng hợp từ hiểu biết chung, **chưa đối chiếu với bản gốc và có thể đã bị sửa đổi hoặc thay thế**. Cần luật sư xác nhận trước khi mở nạp.

Việc cần có trước khi mở nạp:

- **Giấy phép phát hành game có nạp tiền.** Trò chơi điện tử trên mạng có nạp tiền và tương tác nhiều người (thường xếp loại G1) phải có giấy phép cung cấp dịch vụ và quyết định phê duyệt nội dung, kịch bản trước khi phát hành; doanh nghiệp phải đăng ký tại Việt Nam.
- **Thanh toán qua kênh hợp pháp.** Chỉ nhận tiền qua tổ chức cung ứng dịch vụ thanh toán, trung gian thanh toán được Ngân hàng Nhà nước cấp phép, hoặc qua kho ứng dụng; vật phẩm ảo, Đá Sao không được đổi ngược ra tiền hay tài sản.
- **Xác thực tài khoản.** Định danh người chơi (số điện thoại, giấy tờ hoặc định danh điện tử theo quy định), lưu thông tin theo thời hạn quy định.
- **Người dưới 18 tuổi:** giới hạn thời gian chơi mỗi ngày, cần cha mẹ hoặc người giám hộ đồng ý khi đăng ký, hiển thị phân loại độ tuổi và cảnh báo chơi quá thời gian.
- **Công khai tỉ lệ vật phẩm ngẫu nhiên** và quy tắc Bảo Hộ Vận Sao.
- **Bảo vệ dữ liệu cá nhân và quyền lợi người tiêu dùng:** chính sách quyền riêng tư, điều khoản dịch vụ, giải quyết khiếu nại, hóa đơn và thuế.

Văn bản liên quan tìm được (cần kiểm tra hiệu lực):

| Văn bản                                                                                                                                                  | Nội dung liên quan                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nghị định 147/2024/NĐ-CP về quản lý, cung cấp, sử dụng dịch vụ Internet và thông tin trên mạng (thay Nghị định 72/2013/NĐ-CP và Nghị định 27/2018/NĐ-CP) | Phân loại game G1–G4, giấy phép G1, phê duyệt nội dung, xác thực tài khoản, giới hạn thời gian chơi của người dưới 18 tuổi, quy định về vật phẩm ảo |
| Nghị định 72/2013/NĐ-CP và Nghị định 27/2018/NĐ-CP                                                                                                       | Quy định cũ về trò chơi điện tử trên mạng; tham khảo lịch sử, kiểm tra còn hiệu lực phần nào                                                        |
| Thông tư của Bộ Thông tin và Truyền thông hướng dẫn về trò chơi điện tử trên mạng (ví dụ Thông tư 24/2014/TT-BTTTT)                                      | Hồ sơ, thủ tục cấp phép; kiểm tra văn bản thay thế và cơ quan quản lý hiện tại sau khi sắp xếp bộ ngành năm 2025                                    |
| Nghị định 52/2024/NĐ-CP về thanh toán không dùng tiền mặt                                                                                                | Điều kiện của tổ chức cung ứng dịch vụ trung gian thanh toán, ví điện tử                                                                            |
| Luật Bảo vệ quyền lợi người tiêu dùng 2023 (Luật số 19/2023/QH15)                                                                                        | Thông tin minh bạch, giao dịch từ xa, giải quyết khiếu nại                                                                                          |
| Luật Giao dịch điện tử 2023 (Luật số 20/2023/QH15)                                                                                                       | Hợp đồng và giao dịch điện tử                                                                                                                       |
| Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và Luật Bảo vệ dữ liệu cá nhân 2025                                                                    | Thu thập, xử lý dữ liệu cá nhân, đặc biệt dữ liệu trẻ em                                                                                            |
| Luật Trẻ em 2016                                                                                                                                         | Bảo vệ trẻ em trên môi trường mạng                                                                                                                  |
| Nghị định 15/2020/NĐ-CP (sửa đổi bởi Nghị định 14/2022/NĐ-CP)                                                                                            | Xử phạt vi phạm hành chính trong lĩnh vực bưu chính, viễn thông, công nghệ thông tin                                                                |
| Quy định về thuế đối với hoạt động kinh doanh trên nền tảng số                                                                                           | Kê khai thuế doanh thu từ vật phẩm ảo                                                                                                               |

Việc tiếp theo khi chuẩn bị mở nạp: thuê luật sư rà lại bảng trên, chọn đơn vị phát hành có giấy phép, chọn cổng thanh toán được cấp phép, rồi mới viết code thanh toán ở phía server thật (không viết trong trình duyệt).
