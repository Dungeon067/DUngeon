# Bảo Ấn (S31)

Bảo Ấn là hệ trang bị thứ hai của nhân vật, bên cạnh vũ khí. **Concept: Mảnh Sao.** Mỗi Bộ Ấn là một **vì sao** đã rơi xuống Đảo Lạc và vỡ thành 5 mảnh; mỗi món Bảo Ấn là một **Mảnh Sao**, người trong thế giới đem gắn vào một món trang sức (hoa, lông, bình cát, chén, vành). Mỗi nhân vật mang **5 Mảnh Sao ở 5 ô**. Mỗi món có một chỉ số chính, 3–4 dòng chỉ số phụ ngẫu nhiên và thuộc một trong 8 vì sao (Bộ Ấn).

- 2 mảnh cùng vì sao: **Sao nhóm**, mở hiệu ứng 2 món.
- 4 mảnh: **Sao rạng**, mở hiệu ứng 4 món.
- Đủ 5 mảnh: **Sao sáng trọn**, không thêm chỉ số, chỉ có hiệu ứng hình ảnh: 5 ô ở màn Nhân vật ghép thành chòm sao năm cánh phát sáng (mục 9).

Cách gọi thống nhất: hệ là **Bảo Ấn**; ô là **Mảnh Sao** (UI ghi “Mảnh Sao · Hoa”, gọn là “Mảnh Hoa”); bộ là **vì sao** (UI ghi tên bộ kèm tên sao, ví dụ “Đêm Hội Vạn Đăng · Sao Vạn Đăng”).

Nguồn số liệu duy nhất: [`content/bao-an.yaml`](../../content/bao-an.yaml), kiểm tra bằng `src/data/bao-an-schema.ts` (`pnpm content:check`). Mọi bảng dưới đây lấy từ file đó; đổi số thì sửa YAML, không sửa tài liệu trước.

**Bảo Ấn không bán bằng tiền.** Không gói nạp, không cửa hàng Đá Sao nào có Bảo Ấn, Sáp Ấn hay Bụi Ấn. `content:check` chặn nếu `goiNap` nhắc tới chúng. Đây là nơi F2P “cày” lâu dài: tiền thật chỉ mua nhân vật, nét sao, vũ khí; Bảo Ấn chỉ đến từ thời gian chơi.

## 1. Năm ô

| Ô             | Chỉ số chính                                                                                        | Ghi chú                                                       |
| ------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Mảnh Hoa**  | Máu (cố định)                                                                                       | Hoa cài áo. Người Đảo Lạc cài hoa khi đi xa để nhớ đường về.  |
| **Mảnh Lông** | Tấn công (cố định)                                                                                  | Lông chim buộc dây, cài tóc hoặc cán binh khí.                |
| **Mảnh Canh** | %Tấn công, %Máu, %Phòng thủ, Tinh thông, Hồi năng lượng                                             | Vật đo canh giờ: bình cát, đèn canh, đồng hồ nước tùy vì sao. |
| **Mảnh Chén** | Như Mảnh Canh (trừ Hồi năng lượng), thêm % sát thương 7 nguyên tố, % sát thương vật lý              | Chén ngọc của Mỏ Ngọc Lòng Chảo.                              |
| **Mảnh Miện** | Như Mảnh Chén (không có sát thương nguyên tố), thêm Tỉ lệ chí mạng, Sát thương chí mạng, % Trị liệu | Vành đội đầu.                                                 |

Tỉ lệ ra chỉ số chính ở ô ngẫu nhiên (trọng số `o[].chinh`):

| Ô         | Tỉ lệ                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| Mảnh Canh | %Tấn công 26%, %Máu 26%, %Phòng thủ 26%, Tinh thông 11%, Hồi năng lượng 11%                                       |
| Mảnh Chén | %Tấn công 19%, %Máu 19%, %Phòng thủ 18%, Tinh thông 3%, mỗi nguyên tố 5% (7 hệ), vật lý 6%                        |
| Mảnh Miện | %Tấn công 22%, %Máu 22%, %Phòng thủ 22%, Tinh thông 4%, Tỉ lệ chí mạng 10%, Sát thương chí mạng 10%, Trị liệu 10% |

> Tên ô theo concept Mảnh Sao (duyệt lần 2): Mảnh Hoa, Mảnh Lông, Mảnh Canh (vật đo thời gian, thay “Đồng Hồ Cát”; “canh” là đơn vị giờ đêm của thế giới), Mảnh Chén, Mảnh Miện. Id trong dữ liệu giữ `hoa`, `long`, `den`, `chen`, `mien`.

Chỉ số mới (Tinh thông nguyên tố, Hồi năng lượng, Trị liệu, Phòng thủ, % sát thương theo hệ) đặt sẵn để khớp S30. Khi S30 vào `main`, Bảo Ấn nối thẳng vào chỉ số của S30; trước đó Chiến Lực và mô phỏng quy đổi chúng theo `chienLuc` (mục 7).

## 2. Độ hiếm, cấp và mốc

| Độ hiếm | Cấp tối đa | Số mốc (+4) | Dòng phụ lúc rơi | Kinh nghiệm 0 → tối đa |
| ------- | ---------- | ----------- | ---------------- | ---------------------- |
| 3★      | +12        | 3           | 3 (10% ra 4)     | 37.200                 |
| 4★      | +16        | 4           | 3 (15% ra 4)     | 88.000                 |
| 5★      | +20        | 5           | 3 (20% ra 4)     | 154.400                |

- Kinh nghiệm để lên từ cấp L: `goc + moiCap × L` (`kinhNghiem.theoDoHiem`). Mỗi điểm kinh nghiệm tốn 0,1 Xu.
- **Quy tắc mốc:** cứ mỗi +4 (cấp 4, 8, 12, 16, 20), nếu còn dưới 4 dòng phụ thì thêm 1 dòng mới; đủ 4 dòng thì chọn ngẫu nhiên đều 1 dòng đã có và cộng thêm một lần tung.
- **Tung một lần:** chọn 1 trong 4 bậc giá trị `phu.bac = 70% / 80% / 90% / 100%` của giá trị tối đa, nhân hệ số độ hiếm.
- **Dòng mới:** chọn theo `phu.trongSo`, bỏ chỉ số chính của món và các dòng đã có.
- Vì vậy một món 5★ ra 3 dòng sẽ có 4 dòng ở +4 và 4 lần tăng thêm tới +20; món ra sẵn 4 dòng có 5 lần tăng. Tổng 8–9 lần tung trên mỗi món 5★.

## 3. Bảng chỉ số

### Chỉ số chính

Cấp 0 bằng 20% giá trị tối đa của độ hiếm đó, tăng đều theo cấp (`chinh.heSoCap0`). 4★ = 80%, 3★ = 60% bản 5★.

| Chỉ số chính         | 5★ +0 | 5★ +20 | 4★ +16 | 3★ +12 |
| -------------------- | ----- | ------ | ------ | ------ |
| Máu                  | 220   | 1100   | 880    | 660    |
| Tấn công             | 14    | 72     | 58     | 43     |
| %Máu                 | 3,6%  | 18%    | 14,4%  | 10,8%  |
| %Tấn công            | 3,6%  | 18%    | 14,4%  | 10,8%  |
| %Phòng thủ           | 4,5%  | 22,5%  | 18%    | 13,5%  |
| Tinh thông nguyên tố | 14    | 72     | 58     | 43     |
| Hồi năng lượng       | 4%    | 20%    | 16%    | 12%    |
| Tỉ lệ chí mạng       | 2,4%  | 12%    | 9,6%   | 7,2%   |
| Sát thương chí mạng  | 4,8%  | 24%    | 19,2%  | 14,4%  |
| Trị liệu             | 2,8%  | 14%    | 11,2%  | 8,4%   |
| % sát thương 1 hệ    | 3,6%  | 18%    | 14,4%  | 10,8%  |
| % sát thương vật lý  | 4,5%  | 22,5%  | 18%    | 13,5%  |

Tầm số: Máu và Tấn công ở cấp 60 của nhân vật chừng 5.400 và 680, nên Mảnh Hoa +20 ≈ 20% Máu, Mảnh Lông +20 ≈ 10% Tấn công.

### Chỉ số phụ (giá trị một lần tung, bậc 1 / 2 / 3 / 4)

| Chỉ số phụ           | Trọng số | 5★                        | 4★                        | 3★                        |
| -------------------- | -------- | ------------------------- | ------------------------- | ------------------------- |
| Máu                  | 6        | 84 / 96 / 108 / 120       | 67 / 77 / 86 / 96         | 50 / 58 / 65 / 72         |
| Tấn công             | 6        | 5,6 / 6,4 / 7,2 / 8       | 4,5 / 5,1 / 5,8 / 6,4     | 3,4 / 3,8 / 4,3 / 4,8     |
| Phòng thủ            | 6        | 7 / 8 / 9 / 10            | 5,6 / 6,4 / 7,2 / 8       | 4,2 / 4,8 / 5,4 / 6       |
| %Máu                 | 4        | 1,7% / 1,9% / 2,2% / 2,4% | 1,3% / 1,5% / 1,7% / 1,9% | 1% / 1,2% / 1,3% / 1,4%   |
| %Tấn công            | 4        | 1,7% / 1,9% / 2,2% / 2,4% | 1,3% / 1,5% / 1,7% / 1,9% | 1% / 1,2% / 1,3% / 1,4%   |
| %Phòng thủ           | 4        | 2,1% / 2,4% / 2,7% / 3%   | 1,7% / 1,9% / 2,2% / 2,4% | 1,3% / 1,4% / 1,6% / 1,8% |
| Tinh thông nguyên tố | 4        | 7 / 8 / 9 / 10            | 5,6 / 6,4 / 7,2 / 8       | 4,2 / 4,8 / 5,4 / 6       |
| Hồi năng lượng       | 4        | 1,9% / 2,2% / 2,4% / 2,7% | 1,5% / 1,7% / 1,9% / 2,2% | 1,1% / 1,3% / 1,5% / 1,6% |
| Tỉ lệ chí mạng       | 3        | 1,1% / 1,3% / 1,4% / 1,6% | 0,9% / 1% / 1,2% / 1,3%   | 0,7% / 0,8% / 0,9% / 1%   |
| Sát thương chí mạng  | 3        | 2,2% / 2,6% / 2,9% / 3,2% | 1,8% / 2% / 2,3% / 2,6%   | 1,3% / 1,5% / 1,7% / 1,9% |

Giá trị lưu dạng số thực (không làm tròn khi cộng dồn), giao diện làm tròn 1 chữ số thập phân cho %, số nguyên cho chỉ số thẳng.

## 4. Tám Bộ Ấn

Mỗi bộ gắn một vai trò của S30 ([docs/combat/bo-chieu-tong.md](../combat/bo-chieu-tong.md) trên nhánh S30) và một vùng trong [docs/world/03-dia-ly.md](../world/03-dia-ly.md). Cột “Quy đổi” là giá trị trung bình (đã tính thời gian hiệu lực) mà Chiến Lực và mô phỏng dùng, nằm ở `bo[].hai/bon.chienLuc`.

| Bộ Ấn                      | Vai trò               | Vùng                  | 2 món                      | 4 món                                                                                                         | Quy đổi 2 / 4       |
| -------------------------- | --------------------- | --------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------- |
| **Đêm Hội Vạn Đăng**       | Sát thương nộ         | Phố Vạn Đăng          | +20% sát thương nộ         | Sau khi dùng nộ, đánh thường và trọng kích +30% sát thương trong 8 giây                                       | +6% / +10% st       |
| **Hồ Muối Gương Trời**     | Phản ứng nguyên tố    | Khokhtal              | +60 Tinh thông             | +30% sát thương do phản ứng; Bốc Hơi và Tan Chảy thêm 12%                                                     | 60 TT / +9% st      |
| **Đình Trống Gọi Làng**    | Tăng sức đội sau nộ   | Đình Trống Đồng       | +15% Tấn công              | Dùng nộ thì cả đội +18% Tấn công trong 12 giây, không cộng dồn                                                | 15% / đội +10% TC   |
| **Diều Đo Hướng Gió**      | Hồi năng lượng đội    | Thiên Diên Thành      | +20% Hồi năng lượng        | Kỹ năng trúng địch thì cả đội hồi 2 năng lượng, mỗi 6 giây một lần                                            | 20% / 15% HNL       |
| **Vệt Cháy Đường Đua**     | Sát thương trọng kích | Đường Đua Giông       | +18% sát thương trọng kích | Trọng kích trúng cho 1 tầng Vó Giông (6 giây, tối đa 3); mỗi tầng +10% st trọng kích, +3% chí mạng trọng kích | +5% / +8% st, 3% CM |
| **Gạch Men Nhà Chưa Xong** | Khiên, che chắn       | Golbaran              | Khiên tạo ra bền thêm 30%  | Nhân vật đang có khiên +20% sát thương gây ra                                                                 | 10% Máu / +10% st   |
| **Đêm Rằm Đền Trăng**      | Trị liệu              | Hồ Gương và Đền Trăng | +15% Trị liệu              | Mỗi lần hồi máu cho đồng đội, cả đội +12% sát thương trong 6 giây                                             | 15% TL / +8% st     |
| **Lan Tuyết Rừng Ranmori** | Giảm kháng của địch   | Shizukane             | +15% sát thương nguyên tố  | Kỹ năng trúng địch làm giảm 15% kháng nguyên tố của nó trong 10 giây                                          | +15% / +10% st      |

Quy tắc: 2 món và 4 món của **cùng một bộ** cộng dồn (4 món là có cả hiệu ứng 2 món). Có thể mang 2 + 2 của hai bộ khác nhau. Món thứ 5 luôn tự do.

Hiệu ứng ghi bằng ngôn ngữ của S30 (nộ, kỹ năng, trọng kích, khiên, phản ứng, kháng). Trong bản S31, game đã áp thật: hiệu ứng chỉ số tĩnh (2 món) và phần quy đổi trung bình của 4 món vào chỉ số nhân vật. Khi S30 có hệ buff/debuff thật, phần 4 món chuyển sang buff có thời gian theo đúng chữ mô tả; chữ mô tả và quy đổi đã đặt sẵn.

### Tên vì sao

Mỗi bộ có `bo[].sao`: tên vì sao và truyện 2–3 câu kể nó rơi ở đâu, vỡ thành 5 mảnh ra sao. Hiện ở đầu khung hiệu ứng bộ và ở màn “sáng trọn”.

| Bộ Ấn                  | Vì sao         |
| ---------------------- | -------------- |
| Đêm Hội Vạn Đăng       | Sao Vạn Đăng   |
| Hồ Muối Gương Trời     | Sao Gương Muối |
| Đình Trống Gọi Làng    | Sao Trống Làng |
| Diều Đo Hướng Gió      | Sao Diều Gió   |
| Vệt Cháy Đường Đua     | Sao Vệt Cháy   |
| Gạch Men Nhà Chưa Xong | Sao Gạch Men   |
| Đêm Rằm Đền Trăng      | Sao Rằm        |
| Lan Tuyết Rừng Ranmori | Sao Lan Tuyết  |

### Tên và truyện từng món

Truyện mỗi món nhắc tới mảnh sao gắn trên nó. Hai bộ mẫu (Đêm Hội Vạn Đăng, Lan Tuyết) đã viết lại theo hình mới; 6 bộ còn lại viết lại cùng lúc dựng icon ở Mốc 2.

Theo [docs/writing/huong-dan-van-phong.md](../writing/huong-dan-van-phong.md): tên tối đa 6 âm tiết, truyện 2–3 câu, không ghi chỉ số, gắn địa danh có trong `docs/world`. Truyện đầy đủ nằm trong `content/bao-an.yaml`; schema kiểm tra số âm tiết, số câu, độ dài, không có chữ số.

| Bộ Ấn (vì sao)         | Mảnh Hoa            | Mảnh Lông              | Mảnh Canh            | Mảnh Chén            | Mảnh Miện            |
| ---------------------- | ------------------- | ---------------------- | -------------------- | -------------------- | -------------------- |
| Đêm Hội Vạn Đăng       | Hoa Giấy Đèn Lồng   | Lông Cánh Pháo Hoa     | Bình Cát Chợ Đêm     | Chén Rượu Mừng Hội   | Vành Lửa Người Múa   |
| Hồ Muối Gương Trời     | Hoa Muối Đầu Mùa    | Lông Chim Lội Muối     | Bình Muối Đo Giông   | Chén Nước Hai Trời   | Vành Muối Kết Tinh   |
| Đình Trống Gọi Làng    | Hoa Đồng Mặt Trống  | Lông Chim Lạc Bay Xuôi | Bình Cát Hội Đồng    | Chén Nước Ba Hồi     | Vành Đồng Người Gõ   |
| Diều Đo Hướng Gió      | Hoa Giấy Đuôi Diều  | Lông Hạc Chép Gió      | Bình Gió Tầng Chín   | Chén Ngọc Hứng Mây   | Vành Dây Diều Bạc    |
| Vệt Cháy Đường Đua     | Hoa Cỏ Sau Sét      | Lông Bờm Ngựa Giông    | Bình Cát Đếm Vòng    | Chén Sữa Mừng Đích   | Vành Đá Sét Nóng     |
| Gạch Men Nhà Chưa Xong | Hoa Lựu Trên Gạch   | Lông Chim Mái Vòm      | Bình Cát Đất Nung    | Chén Men Ốc Đảo      | Vành Vữa Đông Nhanh  |
| Đêm Rằm Đền Trăng      | Hoa Súng Hồ Gương   | Lông Cò Đứng Bờ        | Bình Trăng Mở Cửa    | Chén Nước Chuông Bạc | Vành Trăng Người Giữ |
| Lan Tuyết Rừng Ranmori | Lan Tuyết Không Tan | Lông Cú Tuyết Tùng     | Bình Tuyết Đường Thư | Chén Ngọc Tôi Kiếm   | Vành Tuyết Không Lời |

Ví dụ hiển thị (định dạng mục 4.1 của hướng dẫn văn phong):

> **Hoa Giấy Đèn Lồng** · Mảnh Sao · Hoa · 5★
> Bộ Đêm Hội Vạn Đăng: 2 món tăng 20% sát thương nộ; 4 món sau khi dùng nộ, đánh thường và trọng kích tăng 30% sát thương trong 8 giây.
> _Bông hoa cánh men đỏ, viền vàng như giấy dán đèn lồng ở Phố Vạn Đăng. Giữa nhụy là một mảnh sao rơi đúng đêm hội, người thợ đèn gắn vào để giữ lửa. Cầm lâu thấy tay ấm như đứng cạnh bấc._

## 5. Nguồn

### Bí Cảnh Bảo Ấn

Mở ở cấp Hộ Tinh 18. Mỗi lượt tốn **20 Linh Lực**, cho 1.800 Xu, Sáp Ấn và Bảo Ấn của **2 bộ** (mỗi món 50/50 một trong hai bộ, ô đều nhau). Vào từ bản đồ (cổng ở vùng tương ứng) hoặc menu Bí Cảnh. Trận đánh dùng đấu trường 3D của S28; thắng thì mở rương bằng màn mở rương có sẵn.

| Bí cảnh               | Vùng          | Hai bộ rơi                                |
| --------------------- | ------------- | ----------------------------------------- |
| **Hầm Đèn Phố Cũ**    | Phố Vạn Đăng  | Đêm Hội Vạn Đăng, Đình Trống Gọi Làng     |
| **Vết Sao Bãi Cát**   | Bãi Sao Rơi   | Hồ Muối Gương Trời, Vệt Cháy Đường Đua    |
| **Đáy Hồ Gương**      | Hồ Gương      | Đêm Rằm Đền Trăng, Lan Tuyết Rừng Ranmori |
| **Hang Gió Trúc Mây** | Rừng Trúc Mây | Diều Đo Hướng Gió, Gạch Men Nhà Chưa Xong |

Số món rơi mỗi lượt theo Thiên Tượng (kỳ vọng; phần lẻ là xác suất thêm 1 món). Thiên Tượng mở theo cấp Hộ Tinh như `economy.yaml thienTuong.moTaiCapHoTinh`.

| Thiên Tượng | 0   | 1   | 2   | 3    | 4   | 5   | 6   | 7   | 8   |
| ----------- | --- | --- | --- | ---- | --- | --- | --- | --- | --- |
| 3★          | 2   | 2   | 1,6 | 1,4  | 1,2 | 1   | 0,8 | 0,6 | 0,4 |
| 4★          | 0,4 | 0,8 | 1   | 1,1  | 1,2 | 1,3 | 1,3 | 1,2 | 1,2 |
| 5★          | 0   | 0   | 0,1 | 0,25 | 0,4 | 0,6 | 0,8 | 1   | 1,1 |

Sáp Ấn mỗi lượt: 2 Sáp Ấn Thô + 1 Sáp Ấn, cộng 0,25 Sáp Ấn Thô mỗi bậc Thiên Tượng.

### Vật phẩm mới (`content/items.yaml`)

| Vật phẩm   | ★   | Dùng để                   |
| ---------- | --- | ------------------------- |
| Sáp Ấn Thô | 3★  | 500 kinh nghiệm Bảo Ấn    |
| Sáp Ấn     | 4★  | 2.500 kinh nghiệm         |
| Sáp Ấn Sao | 5★  | 10.000 kinh nghiệm        |
| Bụi Ấn     | 4★  | Tiền đổi Bảo Ấn (mục Đổi) |

### Nâng cấp

Dùng Sáp Ấn hoặc Bảo Ấn khác làm nguyên liệu. Một Bảo Ấn làm nguyên liệu cho 420 / 1.260 / 2.520 kinh nghiệm (3★ / 4★ / 5★) cộng 80% kinh nghiệm nó đã có. Món khóa hoặc đang mang không thể làm nguyên liệu.

### Phân rã

Tách món thừa (không khóa, không đang mang) thành **Bụi Ấn** và Sáp Ấn. Có chọn nhanh: “mọi 3★”, “4★ cấp 0”, theo bộ, theo ô.

| Độ hiếm | Bụi Ấn gốc | Thêm mỗi mốc đã nâng | Sáp Ấn gốc   | Hoàn kinh nghiệm       |
| ------- | ---------- | -------------------- | ------------ | ---------------------- |
| 3★      | 1          | 0                    | 1 Sáp Ấn Thô | 60% kinh nghiệm đã dồn |
| 4★      | 3          | 1                    | 2 Sáp Ấn Thô | 60%                    |
| 5★      | 10         | 2                    | 1 Sáp Ấn     | 60%                    |

### Đổi (giới hạn mỗi tuần, làm mới thứ Hai)

| Lựa chọn          | Chọn được             | Giá        | Mỗi tuần |
| ----------------- | --------------------- | ---------- | -------- |
| **Ấn Chọn Ô**     | Bộ và ô               | 120 Bụi Ấn | 3        |
| **Ấn Chọn Chính** | Bộ, ô và chỉ số chính | 300 Bụi Ấn | 1        |

Món đổi ra luôn là 5★ cấp 0, chỉ số phụ vẫn ngẫu nhiên. Giới hạn tuần và giá làm cho đổi chỉ là đường lót đáy cho người xui (thường 1–2 món/tuần), không thay cho bí cảnh.

## 6. Kinh tế

### Ngân sách Linh Lực

Linh Lực hồi 180/ngày. Trước S31: Lòng Sao 20/lượt, Bí Cảnh Binh Khí 2 lượt/ngày. Sau khi mở Bí Cảnh Bảo Ấn (cấp Hộ Tinh 18), mô phỏng dành **3 lượt/ngày (60 Linh Lực)** cho Bảo Ấn, lấy bớt từ Lòng Sao (`moPhong.luotMoiNgay`). Ở Thiên Tượng 8 mỗi ngày chừng 3,3 món 5★, nhưng chỉ khoảng 1/2 đúng bộ, 1/5 đúng ô, rồi còn phải đúng chỉ số chính và phụ: đây là phần cày dài.

### Thay mô hình mô phỏng

Bản cũ coi Bảo Ấn là một số `chất lượng 0..1` (4 ô, tối đa +32% Tấn công, +24% Máu, +12% bộ). S31 thay bằng mô phỏng thật:

1. `soNguoi` người cày ảo (chung cho mọi hồ sơ, vì Bảo Ấn không phụ thuộc tiền) đi bí cảnh mỗi ngày theo Thiên Tượng của họ, tung đồ đúng bảng content, phân rã, đổi theo giới hạn tuần, dồn Sáp vào món tốt nhất.
2. Mỗi ngày chọn bộ mang tốt nhất cho chủ lực (4 món bộ chính + 1 món tự do, chấm điểm theo Chiến Lực) và quy về `BaoAnStats` (cộng thẳng, phần trăm, chí mạng, sát thương, hiệu ứng bộ).
3. Lấy trung vị theo ngày, đưa vào `charStats` thay cho số chất lượng cũ. Lòng Sao bớt 3 lượt từ ngày mở bí cảnh.

### Mục tiêu phân tầng phải giữ (kiểm ở Mốc 2 bằng `pnpm economy:sim`)

- F2P chơi kỹ vẫn qua 100% nội dung thường (Thử thách 1–4, Hắc Giao thường) đúng mốc ngày như bản đã duyệt.
- Điểm tối đa ở Đỉnh (Tháp 12, Hắc Giao 10) vẫn chủ yếu cho người nạp nhiều; F2P vẫn chạm Đỉnh trong ngày 180–365.
- Ước lượng: bộ chủ lực 5★ +20 “tốt” (đúng bộ, đúng chính, nửa số lần tung vào chỉ số có ích) tăng Chiến Lực chừng +55–65% so với không có Bảo Ấn; trung vị F2P ngày 180 chừng +40%. Bản cũ ở chất lượng 1 là +37%. Vì Bảo Ấn như nhau cho mọi hồ sơ, khoảng cách giữa các tầng nạp không đổi; nếu mô phỏng cho thấy F2P chạm điểm tối đa sớm hơn mục tiêu, sẽ chỉnh `chinh.giaTri` và `phu.giaTriToiDa` trước khi đụng tới ngưỡng Đỉnh.

## 7. Chiến Lực

Chiến Lực vẫn theo công thức `game.chienLuc` của `economy.yaml`. Bảo Ấn cộng vào Tấn công hiệu dụng và Máu như sau (hệ số ở `bao-an.yaml chienLuc`):

- Máu, Tấn công thẳng và % cộng vào chỉ số gốc. Phòng thủ quy ra Máu: Phòng thủ gốc = Máu × 0,06, mỗi điểm Phòng thủ tính bằng 3 Máu.
- Tỉ lệ và sát thương chí mạng vào hệ số chí mạng sẵn có.
- % sát thương nguyên tố đúng hệ nhân vật, % vật lý (chỉ nhân vật chưa có hệ), hiệu ứng bộ quy đổi: cộng vào hệ số sát thương.
- Tinh thông × 0,0008, Hồi năng lượng × 0,25, Trị liệu × 0,3 quy thành % sát thương.

## 8. Dữ liệu và lưu trữ

- Hồ sơ thêm `baoAn: Record<uid, BaoAnInst>`, `baSeq`, `baoAnMang: Record<charId, Partial<Record<ô, uid>>>`, `buiAn`, `sapAn: Record<id, số>`, `doiTuan: { tuan, da: Record<id, số> }`.
- `BaoAnInst = { uid, bo, o, r, lv, exp, chinh, phu: [{ k, lanTung: số[] }], lock }`. Lưu từng lần tung (bậc) để màn chi tiết vẽ được và để kiểm tra lại đúng bảng.
- Save cũ (v3, không có các trường trên) được bổ sung khi tải: kho rỗng + quà `khoiDau` (một bộ 3★ Đêm Hội Vạn Đăng đủ 5 ô, 20 Sáp Ấn Thô, 4 Sáp Ấn). Không đổi khóa `tinhtu-v3`.
- Tung ngẫu nhiên dùng PRNG có hạt trong hồ sơ (như ước nguyện), nên test và mô phỏng lặp lại được.

## 9. Giao diện

- **Màn Nhân vật, thẻ Bảo Ấn:** 5 ô xếp quanh ảnh nhân vật, khung theo độ hiếm, số cấp. Dưới cùng là hiệu ứng bộ đang kích hoạt (sáng) và chưa đủ (mờ). Bấm một ô mở danh sách thay: thẻ kiểu S24, lọc theo bộ / ô / chỉ số chính, sắp xếp theo độ hiếm, cấp, bộ; bảng so sánh với món đang mang, tăng màu xanh, giảm màu đỏ.
- **Tủ Đồ, tab Bảo Ấn:** lưới thẻ kiểu S24, chi tiết bên phải. Nâng cấp: chọn Sáp hoặc món làm nguyên liệu, thanh kinh nghiệm xem trước; khi qua mốc +4, dòng mới hoặc dòng được tăng nhảy số và sáng lên. Phân rã nhiều món: chế độ chọn, bộ chọn nhanh, xác nhận có tổng Bụi Ấn và Sáp nhận được. Khóa bằng biểu tượng ổ khóa trên thẻ.
- **Bí Cảnh Bảo Ấn:** mục mới trong menu Bí Cảnh và cổng trên bản đồ; chọn Thiên Tượng, xem hai bộ rơi, vào đấu trường 3D của S28, xong mở rương.
- **Sao sáng trọn (ghép sao):** khi nhân vật mang đủ 5 mảnh cùng vì sao, 5 ô trượt về 5 đỉnh của một ngôi sao năm cánh quanh nhân vật, các đường sáng nối đỉnh theo nét vẽ sao (Hoa → Chén → Lông → Miện → Canh → Hoa), lõi sáng giữa bùng lên theo màu vì sao (`bo[].mau`), rồi hiện tên vì sao. Dài khoảng 1,6 giây, chỉ chạy lúc vừa đủ bộ; sau đó chòm sao giữ sáng nhẹ và lấp lánh. Mang 4 mảnh thì 4 đường nối sáng, đường thiếu mờ. Có bản phác ở `media/bao-an/phac-ghep-sao.png` và `.mp4`.
- **Admin:** cấp Bảo Ấn thử: chọn bộ, ô, độ hiếm, cấp, chỉ số chính và từng dòng phụ; nút “cấp đủ bộ 5 ô”.

## 10. Hình ảnh

Hướng mỹ thuật (duyệt lần 3): **trang sức kiểu hoạt hình**, hợp game toon anime, mọi thiết kế tự dựng.

- **Vật thể quen của thể loại**, dáng tự thiết kế: hoa cài, lông vũ, bình cát, chén chân cao, vành miện.
- **Shading hoạt hình** (`tools/blender/bao-an/toon.py`, Cycles): mỗi vật liệu phân 2–3 tông theo hướng sáng, chuyển tông bằng gradient vẽ tay, đốm highlight sắc, rim sáng một bên, viền tối mảnh quanh silhouette (Freestyle, bản icon viền dày hơn). Không dùng PBR thật.
- **Chất liệu vẽ:** kim loại có dải phản chiếu cách điệu (tối giữa, sáng trên), đá cắt giác mỗi mặt một tông rõ kèm lấp lánh, men màu tươi, ngọc trai, pha lê trong (Chén Ngọc Tôi Kiếm), giấy dó thắp sáng, tua vải.
- **Khối gọn, chi tiết to:** ít vòng cuộn, hạt và đá hơn bản trang sức, dây và hạt to hơn để đọc rõ ở icon 128.
- **Mảnh sao trên mọi món:** một ngôi sao năm cánh cắt giác, lõi sáng bên trong, viền kim loại, hạt ở mỗi đỉnh, ánh lấp lánh. Đây là điểm nhận ra hệ Mảnh Sao.
- **Ngôn ngữ thiết kế riêng cho từng vì sao** (`tools/blender/bao-an/sets.py`): bảng màu, kim loại, đá, motif. 5 món cùng vì sao dùng chung motif nên nhìn là biết cùng bộ.

| Vì sao        | Kim loại                                                                                        | Men, đá                                                    | Motif                                                           |
| ------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| Sao Vạn Đăng  | Vàng ấm, đồng đỏ                                                                                | Men đỏ son chuyển cam, đá lửa hổ phách, hồng ngọc          | Ngọn lửa men hai lớp, giấy dó, tia pháo, tua đỏ, cát than hồng  |
| Sao Lan Tuyết | Bạc, vàng trắng                                                                                 | Men trắng chuyển tím lan, pha lê băng, ngọc trai, lam ngọc | Hoa lan tuyết, gai băng, bông tuyết, chuỗi ngọc trai, cát tuyết |
| 6 bộ còn lại  | Dựng ở Mốc 2 theo cùng khung: muối kết tinh, đồng trống, giấy diều, đá sét, men gạch, bạc trăng |                                                            |                                                                 |

- Góc nhìn 3/4 như ảnh S24, rim theo màu vì sao. Ảnh lớn 1024 cho màn chi tiết; icon 256/128 trong khung độ hiếm S24 (3★ xanh, 4★ tím, 5★ vàng) bằng `tools/blender/weapons/hau-ky.sh`.
- Dựng hình: `tools/blender/bao-an/render.py` (5 ô), khối trang sức dùng chung: `tools/blender/bao-an/jewel.py`, vật liệu hoạt hình: `tools/blender/bao-an/toon.py` (`--pbr` để render lại bản PBR cũ). Ảnh nguồn ở `media/bao-an/`, ảnh game ở `public/bao-an/`.
- Phong cách fantasy phi văn hóa: không biểu tượng tôn giáo, không chép món cụ thể của game khác.

## 11. Duyệt

- **Mốc 1 (bản này, gửi lại):** tài liệu này, `content/bao-an.yaml`, schema Zod, 10 món mẫu của 2 vì sao (icon + ảnh lớn 1024), bản phác ghép sao.
- **Mốc 2:** cài đặt trong game, mô phỏng, đủ 40 icon; video màn Nhân vật, Tủ Đồ, một lượt Bí Cảnh Bảo Ấn; kết quả `economy:sim`.
