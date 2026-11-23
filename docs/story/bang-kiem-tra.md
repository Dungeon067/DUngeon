# Bảng kiểm tra nhiệm vụ (S06)

> Bảng tổng hợp mọi nhiệm vụ của Mở đầu, Chương 1 và nhiệm vụ phụ Đảo Lạc để S11 (định dạng nội dung) và S12 (triển khai nhiệm vụ) làm theo. Mã người nói, mã hành động: `README.md`. NPC: `npc-dao-lac.md`.
>
> **Quy ước phần thưởng:** số Đá Sao và Xu là gợi ý, S19 cân bằng lại. Mã phần thưởng (`give_reward reward: <mã>`) ở cột "Mã thưởng". Tất cả vật phẩm, địa điểm mới đã ghi vào `docs/world/09-tu-dien.md` (mục "Bổ sung S06").
>
> **Danh vọng Đảo Lạc:** bắt đầu ở Đom Đóm; lên **Đèn Lồng** khi xong `c1_07`. Mỗi nhiệm vụ phụ cộng điểm danh vọng (gợi ý 50 điểm mỗi nhiệm vụ, S19 chốt ngưỡng).

## 0. Loại nhân vật 5★ (Đã chốt (S23))

- **`thuong-tru` (5★ thường trú, "5★ lệch"):** nằm trong pool cố định, ra khi thua 50/50. Người chơi không nạp có thể nhận qua quà sự kiện hoặc phần thưởng cột mốc.
- **`gioi-han` (5★ giới hạn):** chỉ ra ở banner giới hạn theo kỳ, có thể quay lại ở kỳ sau.
- **Quy tắc truyện:** truyện chính không tặng nhân vật 5★ nào (kể cả thường trú; việc tặng 5★ thường trú qua sự kiện hoặc cột mốc do S19 quyết). Nhân vật 5★ thường trú được **đi cùng tạm thời** trong nhiệm vụ (`join_party` có `temporary: true`). Nhân vật 5★ giới hạn chỉ xuất hiện như NPC hoặc khách mời, **không vào đội**, kể cả tạm thời. Lần ước miễn phí vẫn ra Bạch Vũ 4★.

| Loại         | Nhân vật 5★                                                  | Lý do                                                                                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `thuong-tru` | Lạc Hồng, Thủy Nguyệt, Thạch Sơn, Phong Vân                  | Bốn 5★ thường trú ban đầu, mỗi người một nguyên tố cơ bản (Hỏa, Thủy, Thổ, Phong); là người dẫn đường của các chương nên cần lấy được lâu dài. Sau này có thể thêm người thường trú.                                                              |
| `gioi-han`   | Lôi Đình, Tuyết Lan, Ardo, Golnar, Naraa, Nghiên Thu, Takane | 5★ ra theo kỳ (thứ tự banner: `docs/economy/phan-cap-suc-manh.md` mục 3). Lôi Đình và Tuyết Lan vẫn dẫn đường Ch.6 và Ch.3 nhưng chỉ ở vai NPC hoặc khách mời; năm người còn lại là 5★ của các vùng ngoài Đảo Lạc. Không ai vào đội trong truyện. |

Nhãn cũng ghi ở đầu `docs/characters/<id>/ho-so.md` của từng nhân vật.

### Nhân vật được nhắc trong Mở đầu và Chương 1

| Nhân vật    | ★   | Loại 5★       | Vai trò trong Mở đầu, Ch.1                                             | Vào đội                      |
| ----------- | --- | ------------- | ---------------------------------------------------------------------- | ---------------------------- |
| Sương Mai   | 4★  | Không áp dụng | Đi cùng từ `md_01`                                                     | Có, thật (đội khởi đầu)      |
| Mai Linh    | 4★  | Không áp dụng | Đi cùng từ `md_01`                                                     | Có, thật (đội khởi đầu)      |
| Bạch Vũ     | 4★  | Không áp dụng | Lần ước miễn phí `md_02`                                               | Có, thật (đội khởi đầu)      |
| Lạc Hồng    | 5★  | `thuong-tru`  | Dẫn đường Ch.1; trận `md_05`; từ `c1_01`                               | Tạm thời (`temporary: true`) |
| Thạch Sơn   | 5★  | `thuong-tru`  | Dẫn đường Ch.1; từ `c1_03`                                             | Tạm thời (`temporary: true`) |
| Thủy Nguyệt | 5★  | `thuong-tru`  | Gặp ở `md_06`; dẫn đường Ch.1 từ `c1_04`                               | Tạm thời (`temporary: true`) |
| Minh Khải   | 4★  | Không áp dụng | Gặp ở `c1_02`; dẫn đường Làng Chìm `c1_06`                             | Tạm thời trong `c1_06`       |
| Phong Vân   | 5★  | `thuong-tru`  | Chỉ được nhắc tên (`dd_12`)                                            | Không                        |
| Ngọc Thạch  | 4★  | Không áp dụng | Nhắc tên ở `dd_03`; nhận free qua `np_08` (S23)                        | Nhập đội thật sau `np_08`    |
| Hạ Vy       | 4★  | Không áp dụng | Nhắc tên ở `np_04`, `c1_05`; nhận free qua quest mini `mq-ha-vy` (S23) | Nhập đội thật sau `mq-ha-vy` |

Không nhân vật 5★ giới hạn nào xuất hiện trong Mở đầu và Chương 1.

## 1. Mở đầu: Sao Rơi Đêm Tết

| Mã    | Tên                | Mở khi       | Phần thưởng                          | Hộ Tinh xuất hiện                       | NPC                    | Địa điểm                       | Hướng dẫn                       |
| ----- | ------------------ | ------------ | ------------------------------------ | --------------------------------------- | ---------------------- | ------------------------------ | ------------------------------- |
| md_01 | Hố Cát Còn Ấm      | Bắt đầu game | Không                                | Mai Linh, Sương Mai (nhập đội)          | Không                  | Bãi Sao Rơi (hố cát, mép sóng) | Di chuyển, đánh thường, kỹ năng |
| md_02 | Viên Đá Nguội      | Xong `md_01` | Lần ước miễn phí: **Bạch Vũ 4★**     | Mai Linh, Sương Mai, Bạch Vũ (nhập đội) | Không                  | Bãi Sao Rơi                    | Ước nguyện, đổi người, Bốc Hơi  |
| md_03 | Rương Lộc Tết      | Xong `md_02` | 3 Bánh Trống, 500 Xu                 | Mai Linh, Sương Mai, Bạch Vũ            | Không                  | Dốc Bãi Sao Rơi                | Lướt né, mở rương               |
| md_04 | Bia Đá Đầu Dốc     | Xong `md_03` | Mở dịch chuyển Bia Đá Dốc Cát        | Mai Linh, Sương Mai, Bạch Vũ            | Không                  | Bia Đá Dốc Cát                 | Kích hoạt Bia Đá                |
| md_05 | Trống Đình Đêm Tết | Xong `md_04` | Lạc Hồng đi cùng tạm thời trong trận | Mai Linh, Sương Mai, Bạch Vũ, Lạc Hồng  | Cụ Đoan Khang, Lão Neo | Đình Trống Đồng, Phố Vạn Đăng  | Dùng nộ                         |
| md_06 | Bóng Dưới Vịnh     | Xong `md_05` | Mở Chương 1                          | Cả bốn, Thủy Nguyệt (gặp, chưa nhập)    | Cụ Đoan Khang          | Vịnh Khơi                      | Không                           |

Đội sau Mở đầu khớp `startProfile` trong `content/config.yaml`: Sương Mai, Mai Linh, Bạch Vũ (Lạc Hồng chỉ đi cùng tạm thời trong trận ở `md_05`, tiếp tục đi cùng tạm thời trong Chương 1).

## 2. Chương 1: Tiếng Trống Dưới Nước Đen

| Mã    | Tên                       | Mở khi       | Phần thưởng (mã thưởng)                                                                                                        | Hộ Tinh xuất hiện                                 | NPC                                                                | Địa điểm                                               | Trận                                                                                             |
| ----- | ------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| c1_01 | Sáng Sau Đêm Sao          | Xong `md_06` | Lạc Hồng đi cùng tạm thời; mở bảng Ủy thác; 20 Đá Sao, 1000 Xu (`c1_01`)                                                       | Lạc Hồng, Mai Linh, Sương Mai, Bạch Vũ            | Cụ Đoan Khang, Ông Lạc Thành, Bà Cả Thu Vọng, Bà Trùm Kha, Cao Lũy | Đình Trống Đồng                                        | Không                                                                                            |
| c1_02 | Nước Đen Ở Bến Vạn Lưới   | Xong `c1_01` | 20 Đá Sao, 1200 Xu (`c1_02`); cờ `c1_tra_loi_neo`                                                                              | Lạc Hồng, Mai Linh, Sương Mai, Bạch Vũ, Minh Khải | Lão Neo, Tám Lụa, Hai Khoác                                        | Bến Làng Vạn Lưới                                      | 3 Bóng Cặn                                                                                       |
| c1_03 | Hai Ổ Lõi Trống           | Xong `c1_02` | Thạch Sơn đi cùng tạm thời; 20 Đá Sao, 1200 Xu (`c1_03`)                                                                       | Thạch Sơn + đội                                   | Cai Tôn                                                            | Lối vào Hang Hắc Giao, Bia Đông, Bia Tây               | Hộ Vệ Đá Cổ (`golem`)                                                                            |
| c1_04 | Chuông Bạc Lạc Nhịp       | Xong `c1_03` | Thủy Nguyệt đi cùng tạm thời; 20 Đá Sao, 1200 Xu (`c1_04`)                                                                     | Thủy Nguyệt, Thạch Sơn + đội                      | Bà Cả Thu Vọng                                                     | Hồ Gương, Đền Trăng                                    | 4 Bóng Cặn, 1 Giọt Nhầy                                                                          |
| c1_05 | Mặt Nạ Trắng Ở Chợ Đêm    | Xong `c1_04` | Theo cờ `c1_ut_gao`: `giao_quan` 500 Xu + 50 danh vọng (`c1_05_giao_quan`); `ve_nha` 3 Bánh Trống + 20 Đá Sao (`c1_05_ve_nha`) | Đội                                               | Bà Tư, Bà Ngoan, Bà Bảy Sóng, Út Gạo, Cao Lũy hoặc Bà Hạnh         | Chợ đêm Phố Vạn Đăng, bến cũ, nhà Bà Hạnh              | 3 Lính Mặt Nạ Trắng, 1 Pháp Sư Mặt Nạ (`shaman`)                                                 |
| c1_06 | Nửa Lời Của Bà Lưới       | Xong `c1_05` | Đèn Sét Của Minh Khải (`den_set_minh_khai`); 20 Đá Sao, 1200 Xu (`c1_06`)                                                      | Minh Khải (đi cùng tạm thời) + đội                | Bà Hạnh                                                            | Làng Vạn Lưới, Vịnh Khơi, Làng Chìm                    | 6 Bóng Cặn                                                                                       |
| c1_07 | Tiếng Trống Dưới Nước Đen | Xong `c1_06` | 2 Lõi Sao Cạn (`loi_sao_can`); 60 Đá Sao, 3000 Xu, danh vọng lên Đèn Lồng (`c1_07_ket_chuong`)                                 | Cả đội, Minh Khải (cuối cảnh)                     | Lão Neo, Cao Lũy, Cai Tôn, Út Gạo, Ông Lạc Thành, Cụ Đoan Khang    | Hang Hắc Giao (Bia Bắc), Đình Trống Đồng, Phố Vạn Đăng | **Boss:** Mặt Nạ Gỗ + 2 Lính Mặt Nạ Trắng; rồi Hắc Giao bản yếu (`hacgiao`, `variant: chuong_1`) |

**Hội thoại dọc đường** `dd_01`–`dd_15`: không có phần thưởng, tự chạy trong nhiệm vụ ghi ở tên cảnh (`chuong-1.md`).

### Hai lựa chọn nhỏ

| Cờ               | Đặt ở   | Giá trị                | Ảnh hưởng                                                                                      |
| ---------------- | ------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| `c1_tra_loi_neo` | `c1_02` | `khong_biet` / `nghe`  | Lời ông Neo và Sương Mai ở `c1_07`; lời ông Neo và +10 Đá Sao (`nghe`) ở `np_10`               |
| `c1_ut_gao`      | `c1_05` | `giao_quan` / `ve_nha` | Phần thưởng `c1_05`; câu mở `c1_06`; lời Út Gạo ở `c1_07`; lời ở `np_07`, `np_10`; lịch Út Gạo |

Cả hai lựa chọn đều nhập lại cùng một mạch, không khóa nhiệm vụ nào.

## 3. Nhiệm vụ phụ Đảo Lạc

| Mã    | Tên                       | Loại              | Mở khi       | Phần thưởng (mã thưởng `np_XX`)                                          | Hộ Tinh có lời                             | NPC                                      | Địa điểm                                    | Trận                                            |
| ----- | ------------------------- | ----------------- | ------------ | ------------------------------------------------------------------------ | ------------------------------------------ | ---------------------------------------- | ------------------------------------------- | ----------------------------------------------- |
| np_01 | Cát Sáng Cho Đèn Tết      | Tìm đồ            | Xong `c1_01` | 20 Đá Sao, 3 Bánh Trống, Đèn Cá Nhỏ                                      | Mai Linh                                   | Bà Ngoan                                 | Phố Cũ (hàng đèn), Bãi Sao Rơi              | Không                                           |
| np_02 | Bé Sen Đi Lạc             | Hộ tống           | Xong `c1_01` | 15 Đá Sao, 800 Xu, 3 Kẹo Mạch Nha                                        | Bạch Vũ, Lạc Hồng, Mai Linh                | Bà Tư, Bé Sen                            | Rừng Trúc Mây, Phố Vạn Đăng                 | 2 Yêu Rừng, 1 Yêu Rừng Cung Thủ (bảo vệ Bé Sen) |
| np_03 | Câu Đối Thiếu Chữ         | Giải đố           | Xong `c1_01` | 20 Đá Sao, 2 Sách Kinh Nghiệm, danh hiệu "Người Điền Chữ"                | Mai Linh, Lạc Hồng, Thạch Sơn              | Thầy Đồ Khiêm, Bà Ngoan                  | Bia Đá Dốc Cát, Phố Cũ, Đình Trống Đồng     | Không                                           |
| np_04 | Cánh Buồm Vá Dở           | Cảm động          | Xong `c1_02` | 20 Đá Sao, 1000 Xu, Mảnh Buồm Gió Nồm                                    | Sương Mai, Mai Linh, Thủy Nguyệt           | Tám Lụa                                  | Bến Vạn Lưới, Rừng Trúc Mây, Bãi Sao Rơi    | Không                                           |
| np_05 | Con Cá To Nhất Vịnh       | Hài hước          | Xong `c1_02` | 15 Đá Sao, 1200 Xu, Cần Câu Tre                                          | Bạch Vũ, Mai Linh                          | Hai Khoác, Tám Lụa                       | Bến Vạn Lưới, mỏm đá Vịnh Khơi              | 4 Giọt Nhầy                                     |
| np_06 | Tiếng Sáo Trên Sông Sương | Hộ tống           | Xong `c1_04` | 20 Đá Sao, 1000 Xu, Lá Sáo Trúc                                          | Sương Mai, Thủy Nguyệt                     | Ông Sáo                                  | Bến Sông Sương, Sông Sương, bến đò Hồ Gương | 2 rồi 3 Bóng Cặn (bảo vệ đò)                    |
| np_07 | Bánh Trống Cho Trại Bắc   | Giao đồ, hài hước | Xong `c1_05` | 15 Đá Sao, 1000 Xu, 5 Bánh Trống                                         | Bạch Vũ, Lạc Hồng, Mai Linh                | Bà Tư, Cai Tôn, Út Gạo (nếu `giao_quan`) | Phố Vạn Đăng, Trại Bắc                      | 2 Yêu Rừng                                      |
| np_08 | Đèn Mỏ Thứ Bảy            | Giải đố           | Xong `c1_03` | 25 Đá Sao, 1500 Xu, 3 Ngọc Thô                                           | Thạch Sơn, Mai Linh                        | Bà Hiền, Đinh Bảo                        | Mỏ Ngọc (đường hầm tây, làng thợ)           | Không                                           |
| np_09 | Tiếng Mõ Bà Hạnh          | Tìm đồ, cảm động  | Xong `c1_06` | 25 Đá Sao, 1200 Xu, Dùi Mõ Vạn Lưới                                      | Thạch Sơn, Mai Linh, Thủy Nguyệt, Lạc Hồng | Bà Hạnh, Ông Sáo                         | Làng Vạn Lưới, Làng Chìm                    | Không                                           |
| np_10 | Lời Xin Lỗi Gửi Trại Bắc  | Cảm động          | Xong `c1_07` | 30 Đá Sao, 1500 Xu, Diều Cá Của Cò; +10 Đá Sao nếu `c1_tra_loi_neo=nghe` | Mai Linh, Sương Mai, Bạch Vũ               | Út Gạo, Lão Neo, Cai Tôn                 | Bãi Sao Rơi, Trại Bắc                       | Không                                           |

Ghi chú: `np_06` có lời của Thủy Nguyệt nên mở sau `c1_04`. Nếu người chơi làm `np_06` mà Hộ Tinh có lời không ở trong đội, S12 bỏ qua dòng của Hộ Tinh đó (quy tắc chung cho mọi nhiệm vụ phụ).

## 4. Chuỗi nhiệm vụ nhân vật liên quan Đảo Lạc

Kịch bản ở `docs/characters/<id>/nhiem-vu-nhan-vat.md`. Bảng này chỉ ghi mốc mở để khớp Chương 1, không thay điều kiện chi tiết trong từng file.

| Nhân vật    | Chuỗi                  | Phần mở ở Đảo Lạc trong/sau Ch.1                                                              | Mốc khóa                             |
| ----------- | ---------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| Lạc Hồng    | Trống Không Ai Đáp     | Phần 1 khi đã sở hữu và xong `c1_01`                                                          | Theo file nhân vật                   |
| Thủy Nguyệt | Bầu Trời Dưới Đáy Hồ   | Phần 1–3 khi đã sở hữu và xong `c1_04`                                                        | Phần 4–5 mở muộn hơn (theo file)     |
| Thạch Sơn   | Đá Nhớ Thay Người      | Phần 1 khi đã sở hữu và xong `c1_03`; Phần 2 "Ổ Lõi Trống" sau khi Ch.1 hé lộ hai bia mất lõi | Theo file nhân vật                   |
| Sương Mai   | Báo Cáo Chưa Viết      | Phần 1–2 sau Mở đầu                                                                           | Phần 3–5 sau `c1_07` (ông Neo đã lộ) |
| Mai Linh    | Ngọn Đèn Không Ai Châm | Phần 1 sau Mở đầu                                                                             | Theo file nhân vật                   |
| Bạch Vũ     | Nút Hai Vòng           | Phần 1 sau Mở đầu                                                                             | Phần 2–5 sau Ch.2                    |
| Minh Khải   | Đèn Canh               | Phần 1–3 sau `c1_02` (gặp lần đầu)                                                            | Phần 4–5 sau `c1_07`                 |
| Ngọc Thạch  | Ba Ngắn Một Dài        | Khi có Ngọc Thạch trong đội                                                                   | Theo file nhân vật                   |
| Phong Vân   | Dải Tín                | Khi có Phong Vân trong đội                                                                    | Phần 4 sau Ch.4                      |
| Hạ Vy       | Không Bỏ Lại Ai        | Khi có Hạ Vy trong đội                                                                        | Theo file nhân vật                   |

## 5. Danh sách kiểm tra cho S11, S12

- [ ] Mọi `quest` trong `start_quest`/`complete_quest` có trong bảng trên.
- [ ] Mọi mã người nói có trong `README.md` hoặc `npc-dao-lac.md`.
- [ ] Mọi mã quái trong `start_battle` có trong `content/` (`slime`, `goblin`, `archer`, `shaman`, `golem`, `hacgiao` đã có trong bản thử; `goblin_lon`, `bong_can`, `mat_na_trang`, `mat_na_go` cần thêm).
- [ ] Hai cờ lựa chọn được lưu và đọc đúng ở các nhiệm vụ sau.
- [ ] Lão Neo không bị gọi là Mặt Nạ Gỗ ở bất kỳ chỗ nào trước `c1_07` (kể cả bách khoa, nhật ký nhiệm vụ).
- [ ] Danh vọng Đảo Lạc lên Đèn Lồng sau `c1_07`.
