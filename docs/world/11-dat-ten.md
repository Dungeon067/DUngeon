# 11. Quy tắc đặt tên và bảng tên chính

File này có ba phần: tiêu chí và quy tắc đặt tên (mục 1, 2), phương án tên cho các khái niệm chính (mục 3), và rà lại thuật ngữ hiện có (mục 5).

**Trạng thái:** **Đã quyết.** Chủ dự án duyệt ngày 2026-11-22, kết quả ở mục 0. Các mục 3 đến 5 giữ lại phương án và lý do để tham khảo.

## 0. Kết quả duyệt (Đã quyết)

| Khái niệm                     | Quyết định                                                                                                     | Áp dụng vào game                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Tên thế giới                  | **Vọng Tinh Giới**                                                                                             | Chưa hiển thị trong game                                            |
| Danh hiệu thần hộ mệnh        | **Trấn Tinh**                                                                                                  | Chỉ trong tài liệu                                                  |
| Dấu ấn sức mạnh               | **Tinh Văn**                                                                                                   | Chỉ trong tài liệu                                                  |
| Nơi sao ngự                   | **Tinh Hải**                                                                                                   | Chỉ trong tài liệu                                                  |
| Tên riêng 7 Trấn Tinh         | Theo phương án ★ (mục 3.2)                                                                                     | Chỉ trong tài liệu                                                  |
| Tên chính thức Hội Mặt Nạ     | **Hội Bất Nguyện**. Trong lời thoại vẫn gọi "Hội Mặt Nạ" khi hợp                                               | Chỉ trong tài liệu                                                  |
| Chức vị trong hội             | Mặt Nạ Trắng, Mặt Nạ Khắc, Ngũ Diện, Kẻ Gánh Nguyện                                                            | Chỉ trong tài liệu                                                  |
| Danh hiệu nhân vật chính      | Giữ **Người Ước Nguyện**                                                                                       | Không đổi                                                           |
| Cấp danh vọng                 | **Đom Đóm → Đèn Lồng → Ngọn Đuốc → Vầng Trăng → Sao Mai**                                                      | Chưa có trong game                                                  |
| Tên vùng và thủ đô            | Theo phương án ★ (mục 4.1)                                                                                     | Chỉ trong tài liệu                                                  |
| Cung mệnh (C0–C6)             | Đổi thành **Nét Sao (N0–N6)**                                                                                  | Đã đổi chữ hiển thị (thẻ nhân vật, ước nguyện, admin)               |
| Động Thiên                    | Đổi thành **Lòng Sao**                                                                                         | Chưa có trong game                                                  |
| Slime                         | Đổi thành **Giọt Nhầy**                                                                                        | Đã đổi `name` trong `content/enemies/slime.yaml`, ID vẫn là `slime` |
| Danh hiệu Lôi Đình            | Đổi thành **Ngọn Thương Gọi Sấm**                                                                              | Đã đổi `title` trong `content/characters/loidinh.yaml`              |
| 8 tên phản ứng                | **Giữ nguyên**                                                                                                 | Không đổi                                                           |
| Ủy thác                       | **Giữ nguyên**                                                                                                 | Không đổi                                                           |
| Tên nộ "Tuyết Phủ Trường Sơn" | **Giữ nguyên**                                                                                                 | Không đổi                                                           |
| Tuyết Lan                     | Giữ vùng Shizukane, giữ các điểm khác biệt đã tạo                                                              | Không đổi                                                           |
| Địa danh có thật              | **Được phép** nhắc tới trong tên kỹ năng, thơ, mô tả. Vẫn không dùng làm nơi diễn ra sự kiện hay phe phản diện | Quy tắc viết                                                        |

## 1. Tiêu chí của một cái tên tốt

Một tên đạt khi qua được cả bảy câu hỏi:

| #   | Tiêu chí                       | Câu hỏi kiểm tra                                                                                                                                                                                   | Ví dụ đạt                      | Ví dụ không đạt                    |
| --- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------- |
| 1   | Dễ đọc với người Việt          | Học sinh lớp 6 đọc to có vấp không?                                                                                                                                                                | Golbaran                       | Gholbārān (dấu phụ khó đọc)        |
| 2   | Ngầu và đáng nhớ               | Nghe một lần có nhắc lại được không?                                                                                                                                                               | Hắc Giao                       | Con Rồng Đen Lớn                   |
| 3   | Nghĩa gốc rõ                   | Giải thích nghĩa từng chữ trong một câu được không?                                                                                                                                                | Hộ Tinh: người được sao bảo hộ | Tinh Long Vũ Đế (ghép chữ cho kêu) |
| 4   | Đúng chức năng hoặc câu chuyện | Nghe tên có đoán được nó làm gì không?                                                                                                                                                             | Kẻ Gánh Nguyện                 | Chúa Tể Bóng Đêm                   |
| 5   | Không trùng tác phẩm nổi tiếng | Có trùng tên, khái niệm của game, phim, truyện nổi tiếng không?                                                                                                                                    | Tinh Văn                       | Vision, Archon, Celestia           |
| 6   | Ngắn                           | Khái niệm hay dùng có tối đa 4 âm tiết không?                                                                                                                                                      | Trấn Tinh (2)                  | Đại Thần Hộ Mệnh Bảy Phương (6)    |
| 7   | Tôn trọng văn hóa gốc          | Có lấy tên nhân vật lịch sử, thần linh tôn giáo thật không? Có đặt địa danh thật làm tên vùng, nơi diễn ra sự kiện hay phe phản diện không? (Tên kỹ năng, thơ, mô tả được nhắc tới địa danh thật.) | Thính Phong                    | Tên một vị thần đang được thờ      |

Quy tắc phụ:

- **Không đặt tên chỉ để kêu.** Mỗi chữ phải có lý do.
- **Một khái niệm một tên.** Không dùng hai tên cho cùng một thứ trong lời thoại. Biệt danh dân gian được phép nhưng phải ghi trong `09-tu-dien.md`.
- **Tránh trùng âm gây hiểu lầm** giữa các khái niệm hay dùng. Ví dụ: không đặt khái niệm mới có chữ "Ấn" vì đã có Bảo Ấn.

## 2. Quy tắc đặt tên theo vùng

Hiển thị trong game theo dạng: **tên gốc** (lần đầu kèm nghĩa tiếng Việt). Tên Việt và Hán Việt hiển thị thẳng.

| Vùng      | Ngôn ngữ cảm hứng                                  | Cấu trúc tên người                                                              | Cấu trúc địa danh                                                 | Cách hiển thị                                       | Ví dụ                             | Tránh                                                                    |
| --------- | -------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| Đảo Lạc   | Thuần Việt và Hán Việt                             | Tên hai âm tiết, có thể thêm tên đệm. Người già gọi theo vai (Bà, Cụ, Ông Trùm) | Danh từ chung + tên riêng: Làng Vạn Lưới, Rừng Trúc Mây           | Hiển thị thẳng                                      | Thủy Nguyệt, Bà Khơi, Bãi Sao Rơi | Họ và tên trùng nhân vật lịch sử có thật. Tên thần trong tín ngưỡng thật |
| Lũng Vân  | Hán Việt (đọc theo âm Hán Việt, không dùng pinyin) | Họ một âm + tên hai âm: Lục Thanh Hà                                            | Hai đến ba chữ Hán Việt có nghĩa: Thiên Diên Thành                | Hiển thị thẳng, nghĩa ghi trong bách khoa           | Thính Phong, Chỉ Diên             | Tên vua, danh tướng, nhà thơ có thật. Danh hiệu thần Đạo giáo            |
| Shizukane | Tiếng Nhật, viết romaji không dấu dài              | Họ + tên, mỗi phần hai đến ba âm tiết                                           | Từ có nghĩa + hậu tố địa hình (-dake núi, -hashi cầu, -mori rừng) | Romaji, lần đầu kèm nghĩa: "Kanehashi (Cầu Chuông)" | Yukiakari, Hisame Rei             | Tên thần Thần đạo, tên thành phố thật, tên nhân vật anime nổi tiếng      |
| Purunae   | Tiếng Hàn thuần, romaji không dấu                  | Tên hai âm tiết, họ một âm tiết                                                 | Từ Hàn thuần có nghĩa: Solgol                                     | Romaji, lần đầu kèm nghĩa                           | Sonamu, Dasom                     | Tên vua chúa lịch sử, tên tỉnh thành thật                                |
| Golbaran  | Tiếng Ba Tư, viết Latin đơn giản không dấu phụ     | Tên + họ ghép có nghĩa (Khakzad "sinh từ đất")                                  | Ghép hai từ có nghĩa: gol + baran                                 | Latin, lần đầu kèm nghĩa                            | Minashahr, Ostad Khesht           | Từ ngữ tôn giáo, tên thành phố thật (Kashan, Kashgar...)                 |
| Marevia   | Latin                                              | Tên riêng + họ chỉ nghề hoặc tính chất: Aulus Cerarius                          | Gốc Latin ghép: Mare + via. Thêm "Mons" cho núi                   | Latin, lần đầu kèm nghĩa                            | Ardentia, Faber                   | Tên thần La Mã, Hy Lạp. Tên hoàng đế, tên thành phố thật (Roma, Pompeii) |
| Khokhtal  | Tiếng Mông Cổ, viết Latin đơn giản                 | Tên riêng + tên cha hoặc dòng họ: Sarnai Baatar                                 | Từ có nghĩa: Khokh + tal                                          | Latin, lần đầu kèm nghĩa                            | Aianga, Nüüdel Ordu               | Tên nhân vật lịch sử có thật, từ ngữ tín ngưỡng thật                     |

**Tên kỹ năng:** tối đa 4 âm tiết với kỹ năng thường, 6 âm tiết với nộ. Ưu tiên Hán Việt hoặc thuần Việt, hình ảnh gắn với vùng và tính khí nguyên tố. Hộ Tinh vùng khác vẫn dùng tên kỹ năng tiếng Việt (vì kỹ năng được người Đảo Lạc đặt tên), có thể kèm tên gốc trong bách khoa.

## 3. Phương án cho các khái niệm chính

Mỗi khái niệm có ba phương án. ★ là phương án khuyến nghị.

### 3.1. Danh hiệu chung của các vị thần hộ mệnh

|     | Tên           | Nghĩa từng chữ                                       | Vì sao hợp                                                                                                                                                                      | Cảm giác khi đọc              |
| --- | ------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| ★ A | **Trấn Tinh** | _trấn_: giữ yên một vùng (như trấn thủ). _tinh_: sao | Đúng bản chất: những vì sao đã xuống đất để giữ một vùng. Đối xứng với "Hộ Tinh" (người được sao bảo hộ) mà không trùng nghĩa. Nhấn vào việc **giữ** chứ không phải **cai trị** | Chắc, nghiêm, dễ nhớ          |
| B   | Lưu Tinh      | _lưu_: ở lại. _tinh_: sao                            | Gợi "sao ở lại". Nhưng "lưu tinh" trong Hán Việt cũng là sao băng (流星), dễ nhầm                                                                                               | Đẹp nhưng mơ hồ               |
| C   | Sao Giữ Đất   | Thuần Việt                                           | Rõ nghĩa nhất, hợp lời dân gian                                                                                                                                                 | Mộc mạc, dài, kém trang trọng |

### 3.2. Tên riêng từng vị Trấn Tinh

| Vùng      | ★ A                                                 | B                               | C                                       | Lý do chọn A                                                                                            |
| --------- | --------------------------------------------------- | ------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Đảo Lạc   | **Bà Khơi** (_khơi_: biển xa, cũng là "khơi nguồn") | Bà Nguồn                        | Nàng Sóng Cả                            | Thuần Việt, gợi cả biển cả và nguồn gốc. Không dùng "Mẹ", "Mẫu" để tránh gợi tín ngưỡng thờ Mẫu có thật |
| Lũng Vân  | **Thính Phong** (người nghe gió)                    | Tả Phong (người chép gió)       | Văn Phong Lão                           | Nói đúng tính cách: nghe và chép mọi lời gió mang. Hai chữ, dễ đọc                                      |
| Shizukane | **Yukiyo** (雪夜, đêm tuyết)                        | Mokuyuki (黙雪, tuyết lặng)     | Yukishizu (雪静, tuyết yên)             | Ngắn, dễ đọc, gợi sự im lặng và cô đơn. B quá khó đọc với người Việt                                    |
| Purunae   | **Sonamu** (소나무, cây thông)                      | Halbeosol ("ông thông")         | Nurisol (_nuri_ thế gian + _sol_ thông) | Từ có thật, dễ đọc, người Hàn hiểu ngay. Biệt danh "Ông Thông" giúp người Việt nhớ                      |
| Golbaran  | **Ostad Khesht** (thầy gạch)                        | Memar Bozorg (đại kiến trúc sư) | Kheshtsaz (thợ làm gạch)                | Gợi đúng hình ảnh ông thợ cả gần gũi. Biệt danh "Thầy Gạch"                                             |
| Marevia   | **Faber** (thợ)                                     | Ferrarius (thợ sắt)             | Malleus (búa)                           | Ngắn nhất, đúng tinh thần "đồng nghiệp"                                                                 |
| Khokhtal  | **Aianga** (sấm)                                    | Ayangaekh (mẹ sấm)              | Tsakhilgaan (tia chớp)                  | Ba âm tiết, dễ đọc, nghĩa rõ. C quá khó đọc                                                             |

### 3.3. Dấu ấn trao sức mạnh nguyên tố cho Hộ Tinh

|     | Tên          | Nghĩa từng chữ                         | Vì sao hợp                                                                                               | Cảm giác                    |
| --- | ------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------- |
| ★ A | **Tinh Văn** | _tinh_: sao. _văn_: hoa văn, đường vân | Không phải vật mang theo mà là hoa văn sao hiện trên da. Thêm nét theo Cung mệnh. Gợi hoa văn trống đồng | Thanh, có chiều sâu         |
| B   | Tinh Ngấn    | _ngấn_: vết hằn                        | Gợi dấu vết để lại, nhưng "ngấn" hơi buồn và ít người dùng                                               | Lạ, hơi nặng                |
| C   | Dấu Sao      | Thuần Việt                             | Rõ nghĩa, dễ đọc                                                                                         | Đơn giản, dễ bị coi là nhạt |

Lưu ý: "Tinh Văn" (văn: hoa văn) khác "tinh vân" (vân: mây, tức nebula). Lời thoại phải viết đúng dấu.

### 3.4. Nơi các vì sao ngự

|     | Tên          | Nghĩa      | Vì sao hợp                                                                                    | Cảm giác                     |
| --- | ------------ | ---------- | --------------------------------------------------------------------------------------------- | ---------------------------- |
| ★ A | **Tinh Hải** | biển sao   | Không phải tòa thành hay cung điện, chỉ là một "biển" ánh sáng. Đối xứng với Biển Lặng ở dưới | Rộng, mơ màng                |
| B   | Ngân Lộ      | đường bạc  | Gợi dải ngân hà. Nhưng "đường" khiến người ta nghĩ có thể đi lên đó                           | Đẹp, hơi giống tên đường phố |
| C   | Biển Trời    | Thuần Việt | Rõ nghĩa                                                                                      | Bình thường                  |

### 3.5. Tên thế giới

|     | Tên                       | Nghĩa                                                  | Vì sao hợp                                                                          | Cảm giác               |
| --- | ------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------- |
| A   | Thiên Tinh Giới (tên tạm) | cõi của sao trời                                       | Rõ nghĩa, nhưng chung chung, dễ trùng truyện tiên hiệp                              | Quen, an toàn          |
| ★ B | **Vọng Tinh Giới**        | _vọng_: trông ngóng, hy vọng. _tinh_: sao. _giới_: cõi | Cõi của những người ngước nhìn sao mà ước. Gắn trực tiếp với ước nguyện và tên game | Có cảm xúc, riêng biệt |
| C   | Hạ Tinh Giới              | cõi dưới các vì sao                                    | Đúng vũ trụ quan ba tầng. Nhưng "hạ" dễ hiểu là "mùa hè" hoặc "thấp kém"            | Lạ, dễ hiểu sai        |

**Đã quyết:** Vọng Tinh Giới.

### 3.6. Tên Hội Mặt Nạ và chức vị trong hội

Tên chính thức (họ tự gọi). Tên dân gian "Hội Mặt Nạ" giữ nguyên theo A.5.

|     | Tên                | Nghĩa                                                  | Vì sao hợp                                                             | Cảm giác             |
| --- | ------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------- | -------------------- |
| ★ A | **Hội Bất Nguyện** | những người không còn ước, hoặc có lời ước không thành | Nói đúng gốc rễ: họ là lời ước bị bỏ quên. Đối nghịch với "Ước Nguyện" | Lạnh, có trọng lượng |
| B   | Hội Gánh Lời       | những người gánh lời ước                               | Gần với danh hiệu thủ lĩnh, nhưng nghe như hội từ thiện                | Hiền, kém đe dọa     |
| C   | Hội Vô Tinh        | những người không có sao                               | Rõ ý, nhưng dễ đọc nhầm thành "vô tình"                                | Hay nhưng dễ đùa     |

Chức vị:

| Bậc | ★ A (dùng trong bộ tài liệu) | B              | C               |
| --- | ---------------------------- | -------------- | --------------- |
| 1   | **Mặt Nạ Trắng**             | Lính Câm       | Người Mới       |
| 2   | **Mặt Nạ Khắc**              | Người Khắc Lời | Thầy Bùn        |
| 3   | **Ngũ Diện** (năm mặt)       | Năm Mặt        | Năm Chất Liệu   |
| 4   | **Kẻ Gánh Nguyện**           | Người Cầm Gánh | Người Không Mặt |

Lý do chọn A: bậc 1 và 2 mô tả đúng mặt nạ (trơn hay đã khắc lời ước), người chơi nhìn là biết cấp. "Ngũ Diện" ngắn và gợi năm chất liệu. "Kẻ Gánh Nguyện" nói đúng việc anh làm. Phương án C bậc 4 bị loại vì "người không mặt" dễ gợi các nhân vật phim nổi tiếng.

### 3.7. Danh hiệu nhân vật chính

|     | Tên                        | Nghĩa                           | Vì sao hợp                                                    | Cảm giác  |
| --- | -------------------------- | ------------------------------- | ------------------------------------------------------------- | --------- |
| ★ A | **Người Ước Nguyện** (giữ) | người có lời ước được trời nghe | Trùng tên game, nói đúng năng lực                             | Ấm, rõ    |
| B   | Người Gọi Sao              | người gọi được sao              | Hành động rõ, hay. Đề xuất dùng làm biệt danh trong lời thoại | Năng động |
| C   | Tri Tinh                   | người hiểu sao                  | Ngắn, Hán Việt, nhưng nghe như chức quan                      | Xa cách   |

### 3.8. Cấp bậc danh vọng của Hộ Tinh

Đây là cấp danh vọng do Hội Đồng Đình Trống và Người Đếm Sao ghi nhận (dùng cho cấp người chơi, mở khu vực, danh hiệu). Khác với Cung mệnh và Khai Tinh.

|     | Hệ thống                 | Các bậc                                                   | Vì sao hợp                                                                                                                                            | Cảm giác                 |
| --- | ------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| ★ A | Theo độ sáng, thuần Việt | **Đom Đóm → Đèn Lồng → Ngọn Đuốc → Vầng Trăng → Sao Mai** | Mỗi bậc là một nguồn sáng lớn dần, tất cả đều có trong văn hóa Đảo Lạc. Bậc cao nhất là "Sao Mai" (sao sáng nhất lúc bình minh). Đọc lên là hiểu ngay | Ấm, dễ hiểu, có hình ảnh |
| B   | Theo độ sáng, Hán Việt   | Huỳnh → Đăng → Cự → Nguyệt → Nhật                         | Cùng ý với A nhưng trang trọng, hợp lời người Lũng Vân. "Cự" (đuốc) ít người biết                                                                     | Trang trọng, khó với trẻ |
| C   | Theo số nét sao          | Một Nét → Ba Nét → Năm Nét → Bảy Nét → Chòm Đầy           | Gắn với Tinh Văn, nhưng dễ nhầm với Cung mệnh                                                                                                         | Kỹ thuật, dễ rối         |

## 4. Bảng tên chính đã dùng (tóm tắt)

| Khái niệm                 | Tên dùng trong bộ tài liệu | Trạng thái |
| ------------------------- | -------------------------- | ---------- |
| Thế giới                  | Vọng Tinh Giới             | Đã quyết   |
| Danh hiệu thần hộ mệnh    | Trấn Tinh                  | Đã quyết   |
| Dấu ấn sức mạnh           | Tinh Văn                   | Đã quyết   |
| Nơi sao ngự               | Tinh Hải                   | Đã quyết   |
| Tầng dưới đáy biển        | Biển Lặng                  | Đã quyết   |
| Bùn lời ước               | Nguyện Cặn                 | Đã quyết   |
| Tên chính thức Hội Mặt Nạ | Hội Bất Nguyện             | Đã quyết   |
| Cấp danh vọng             | Đom Đóm → Sao Mai          | Đã quyết   |

### 4.1. Tên vùng và thủ đô

| Vùng               | ★ A (dùng trong bộ tài liệu)           | B                           | C                             | Lý do chọn A                                                          |
| ------------------ | -------------------------------------- | --------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| Đảo Lạc (vùng)     | **Đảo Lạc** (A.5)                      |                             |                               | Đã cố định                                                            |
| Đảo Lạc (thủ phủ)  | **Phố Vạn Đăng** (phố vạn ngọn đèn)    | Bến Nguyệt                  | Phố Hội Đèn                   | Gắn với phố đèn lồng và Nàng Vạn Đăng, dễ nhớ                         |
| Lũng Vân (vùng)    | **Lũng Vân** (thung lũng mây)          | Vân Khuyết (cửa mây)        | Phong Lĩnh (núi gió)          | Hai chữ, hình ảnh rõ, không trùng tên nước thật                       |
| Lũng Vân (thủ đô)  | **Thiên Diên Thành** (thành diều trời) | Bút Kinh (kinh đô của bút)  | Phong Các Thành               | Gợi nghìn con diều trên mái, gắn với lễ hội của vùng                  |
| Shizukane (vùng)   | **Shizukane** (chuông lặng)            | Yukishima (đảo tuyết)       | Kotonashi (không lời)         | Gợi cả sự im lặng của Yukiyo lẫn những chiếc chuông. B quá chung      |
| Shizukane (thủ đô) | **Yukiakari** (ánh tuyết)              | Shirogane (bạc trắng)       | Fuyunomiya (cung mùa đông)    | Từ đẹp ít người dùng làm tên riêng. B trùng nhiều địa danh thật       |
| Purunae (vùng)     | **Purunae** (suối xanh)                | Sollim (rừng thông)         | Pureunsan (núi xanh)          | Dễ đọc, nghĩa tươi, không trùng địa danh thật                         |
| Purunae (thủ đô)   | **Solgol** (thung lũng thông)          | Namugol (thung lũng cây)    | Sonamuteo (chỗ của cây thông) | Ngắn, gắn trực tiếp với Sonamu                                        |
| Golbaran (vùng)    | **Golbaran** (mưa hoa)                 | Khakestan (xứ đất)          | Minaabad (vùng men xanh)      | Gợi hình ảnh sa mạc nở hoa, nghe mềm và đẹp. B nghe như tên nước thật |
| Golbaran (thủ đô)  | **Minashahr** (thành men xanh)         | Kashishahr (thành gạch men) | Abshahr (thành nước)          | Gợi mái vòm xanh lam, không trùng thành phố thật                      |
| Marevia (vùng)     | **Marevia** (đường biển)               | Ignaria (xứ lửa)            | Litoria (xứ bờ biển)          | Gợi biển Địa Trung Hải và đường buôn. B quá lộ liễu                   |
| Marevia (thủ đô)   | **Ardentia** (thành rực lửa)           | Fornacia (thành lò)         | Lucerna (đèn)                 | Mạnh, dễ đọc. C trùng tên thành phố thật (Lucerne)                    |
| Khokhtal (vùng)    | **Khokhtal** (thảo nguyên xanh)        | Salkhital (thảo nguyên gió) | Ayangatal (thảo nguyên sấm)   | Ngắn, nghĩa đẹp. C quá lộ hệ Lôi                                      |
| Khokhtal (thủ đô)  | **Nüüdel Ordu** (đại trại di động)     | Ikh Ordu (trại lớn)         | Gertal (đồng lều)             | Nói đúng đặc điểm thủ đô dời chỗ theo mùa                             |

## 5. Rà lại thuật ngữ hiện có (A.5)

Đánh giá ban đầu: **Giữ**, **Đề xuất đổi**, **Cần kiểm**. Những dòng có **Đã quyết** là quyết định của chủ dự án.

Về nhận định "có thể trùng": Devin đối chiếu theo hiểu biết của mình về các bản Việt hóa phổ biến, **chưa kiểm được trên bản chính thức**. Chủ dự án nên kiểm lại trước khi quyết.

| Thuật ngữ                             | Đánh giá                                | Đề xuất                           | Lý do                                                                                                                                                                                                                                                                        |
| ------------------------------------- | --------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thiên Tinh Giới                       | **Đã quyết: đổi thành Vọng Tinh Giới**  | Vọng Tinh Giới                    | Xem mục 3.5                                                                                                                                                                                                                                                                  |
| Đảo Lạc                               | Giữ                                     |                                   | Ngắn, gợi chim Lạc và sự trôi dạt                                                                                                                                                                                                                                            |
| Hộ Tinh                               | Giữ                                     |                                   | Nghĩa rõ, đúng vai trò, riêng biệt                                                                                                                                                                                                                                           |
| Người Ước Nguyện                      | Giữ                                     | Biệt danh: Người Gọi Sao          | Gắn tên game                                                                                                                                                                                                                                                                 |
| Đá Sao                                | Giữ                                     |                                   | Rõ nghĩa, có lý do trong truyện (ánh sao nguội). Lưu ý: có game khác dùng tiền tệ tên tương tự "ngọc sao", nhưng "Đá Sao" đủ khác                                                                                                                                            |
| Xu                                    | Giữ                                     |                                   | Đơn giản, đúng                                                                                                                                                                                                                                                               |
| Ước nguyện (lần quay)                 | Giữ                                     |                                   | Gắn tên game. Khác với tên lần quay của các game phổ biến                                                                                                                                                                                                                    |
| Cung mệnh (C0–C6)                     | **Đã quyết: đổi thành Nét Sao (N0–N6)** | **Nét Sao** (N0–N6)               | Theo hiểu biết của Devin, "Cung Mệnh" là bản Việt hóa của một hệ thống cùng chức năng trong game nổi tiếng cùng thể loại, và cách ghi C0–C6 cũng là cách cộng đồng game đó dùng. "Nét Sao" gắn trực tiếp với Tinh Văn (mỗi lần gặp lại thêm một nét)                         |
| Bảo Ấn, Bộ Ấn                         | Giữ                                     |                                   | Riêng biệt, gợi con ấn khắc của văn hóa Á Đông                                                                                                                                                                                                                               |
| Khai Tinh                             | Giữ                                     |                                   | Nghĩa "mở sao" hợp lore (mở lớp sáng của Tinh Văn)                                                                                                                                                                                                                           |
| Bia Đá                                | Giữ                                     |                                   | Mộc mạc nhưng có câu chuyện mạnh (bia khắc tên người giữ đất, neo phong ấn)                                                                                                                                                                                                  |
| Tháp Tinh Tú                          | Giữ                                     |                                   | Gắn mười hai chòm sao của lịch                                                                                                                                                                                                                                               |
| Ủy thác                               | **Đã quyết: giữ**                       | **Việc Nhờ** (Việc Nhờ hằng ngày) | Theo hiểu biết của Devin, "Ủy Thác" trùng bản Việt hóa của nhiệm vụ hằng ngày trong game nổi tiếng cùng thể loại. "Việc Nhờ" thuần Việt, khớp lore (bảng việc nhờ trước Đình Trống)                                                                                          |
| Động Thiên                            | **Đã quyết: đổi thành Lòng Sao**        | **Lòng Sao**                      | Hai lý do: (1) "động thiên" là khái niệm của Đạo giáo (động thiên phúc địa), một tôn giáo đang được thờ phụng. (2) Theo hiểu biết của Devin, một game cùng thể loại dùng "Động Thiên" trong tên một hệ thống. "Lòng Sao" khớp lore: khoảng đất bị sao rơi cuốn vào lòng mình |
| Hắc Giao                              | Giữ                                     |                                   | Rõ nghĩa (giao đen), mạnh                                                                                                                                                                                                                                                    |
| Hội Mặt Nạ                            | Giữ                                     | Tên chính thức: Hội Bất Nguyện    | Dân gian gọi theo cái nhìn thấy, rất tự nhiên                                                                                                                                                                                                                                |
| Hỏa, Thủy, Phong, Lôi, Thổ, Băng, Mộc | Giữ                                     |                                   | Từ Hán Việt thông dụng, không thuộc riêng game nào                                                                                                                                                                                                                           |
| Tên 8 phản ứng                        | **Đã quyết: giữ**                       | Xem bảng 5.1                      | Theo hiểu biết của Devin, cả tám tên trùng bản Việt hóa của tám phản ứng trong game nổi tiếng cùng thể loại, theo đúng cặp nguyên tố. Đây là rủi ro lớn nhất về tên trong A.5                                                                                                |
| Slime (tên quái `slime`)              | **Đã quyết: đổi thành Giọt Nhầy**       | **Giọt Nhầy**                     | Là tiếng Anh, trái A.3 mục 3                                                                                                                                                                                                                                                 |

### 5.1. Đề xuất tên phản ứng mới

Tên mới dựa trên giải thích trong `01-vu-tru-va-sao.md` mục 6. Cơ chế giữ nguyên, chỉ đổi tên hiển thị.

| Cặp          | Tên hiện tại | ★ Đề xuất     | Phương án khác | Lý do                                                 |
| ------------ | ------------ | ------------- | -------------- | ----------------------------------------------------- |
| Hỏa + Thủy   | Bốc Hơi      | **Hóa Mây**   | Thăng Vân      | Nước bay lên thành mây mang ký ức đi                  |
| Hỏa + Băng   | Tan Chảy     | **Rã Băng**   | Phá Tuyết      | Băng nhường trước và vỡ ra                            |
| Hỏa + Lôi    | Quá Tải      | **Sấm Lửa**   | Nổ Vội         | Hai tính khí nóng vội cùng bùng                       |
| Thủy + Lôi   | Điện Cảm     | **Dẫn Lôi**   | Sấm Lan        | Nước dẫn sấm đi khắp nơi                              |
| Thủy + Băng  | Đóng Băng    | **Lặng Nước** | Đông Cứng      | Băng bảo nước dừng lại để lắng nghe                   |
| Lôi + Băng   | Siêu Dẫn     | **Giòn Giáp** | Phá Giáp       | Sấm làm băng giòn, mất lớp phòng thủ                  |
| Phong + khác | Khuếch Tán   | **Gió Cuốn**  | Truyền Gió     | Gió mang tính khí kia đi xa                           |
| Thổ + khác   | Kết Tinh     | **Kết Ngọc**  | Bọc Đá         | Đất bọc tính khí thành viên ngọc, gợi Mỏ Ngọc Đảo Lạc |

**Đã quyết: giữ tên cũ.** Bảng trên chỉ để tham khảo.

### 5.2. Tên kỹ năng hiện có cần xem lại

| Nhân vật  | Tên hiện tại              | Vấn đề                                                                                                                    | Đề xuất                                                                                              |
| --------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Tuyết Lan | Tuyết Phủ Trường Sơn (nộ) | "Trường Sơn" là tên dãy núi có thật ở Việt Nam (A.3 mục 2: không dùng địa danh có thật). Tuyết Lan nay là người Shizukane | **Đã quyết: giữ nguyên.** Chủ dự án cho phép nhắc tới địa danh có thật trong tên kỹ năng, thơ, mô tả |

Các tên kỹ năng còn lại đạt tiêu chí ở mục 1.

## 6. Danh sách tên đã chủ động tránh

Trong lúc viết, các tên sau bị loại vì trùng hoặc quá gần tác phẩm nổi tiếng, tôn giáo hay địa danh thật:

| Tên bị loại                      | Lý do                                                                          | Thay bằng                                       |
| -------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------- |
| Đinh Trời (cọc giữ phong ấn)     | Gần khái niệm "đinh trời" trong một game cùng thể loại                         | Bốn Bia Đá cổ và Tháp Tinh Tú                   |
| Vô Diện (tên hội hoặc thủ lĩnh)  | Tên nhân vật nổi tiếng trong một phim hoạt hình                                | Kẻ Gánh Nguyện                                  |
| Mẫu, Mẹ (cho Bà Khơi)            | Gợi tín ngưỡng thờ Mẫu có thật                                                 | Bà Khơi                                         |
| Tinh Quân, Tinh Chủ              | Danh hiệu thần trong tín ngưỡng thật, hoặc quá phổ biến trong truyện tiên hiệp | Trấn Tinh                                       |
| Thần đèn (vùng Golbaran)         | Gắn với tín ngưỡng thật                                                        | Không dùng                                      |
| Kashan, Kashgar, Lucerna         | Trùng thành phố có thật                                                        | Minashahr, Ardentia                             |
| Tengri, ovoo, shaman             | Tín ngưỡng thật của thảo nguyên                                                | Đống Đá Chỉ Đường (không mang nghĩa tín ngưỡng) |
| Torii, đền Thần đạo, chùa        | Tôn giáo đang được thờ phụng                                                   | Nhà gỗ, cầu chuông, xưởng rèn                   |
| "Cộng hưởng" làm thuật ngữ chính | Gần tên hệ thống của một game cùng thể loại                                    | Dùng như từ thường, không làm thuật ngữ         |
