# Nhiệm vụ phụ ở Đảo Lạc

> 10 nhiệm vụ phụ, mỗi nhiệm vụ 20–60 dòng thoại. Định dạng YAML tạm theo `docs/story/README.md`. NPC ở `npc-dao-lac.md`; điều kiện mở và phần thưởng tổng hợp ở `bang-kiem-tra.md`. Phần thưởng là gợi ý, cân bằng ở S19.

| Mã    | Tên                       | Loại               | NPC chính           | Mở khi                  |
| ----- | ------------------------- | ------------------ | ------------------- | ----------------------- |
| np_01 | Cát Sáng Cho Đèn Tết      | Tìm đồ             | Bà Ngoan            | Xong `c1_01`            |
| np_02 | Bé Sen Đi Lạc             | Hộ tống            | Bé Sen              | Xong `c1_01`            |
| np_03 | Câu Đối Thiếu Chữ         | Giải đố            | Thầy Đồ Khiêm       | Xong `c1_01`            |
| np_04 | Cánh Buồm Vá Dở           | Kể chuyện cảm động | Tám Lụa             | Xong `c1_02`            |
| np_05 | Con Cá To Nhất Vịnh       | Hài hước           | Hai Khoác           | Xong `c1_02`            |
| np_06 | Tiếng Sáo Trên Sông Sương | Hộ tống            | Ông Sáo             | Xong `c1_04`            |
| np_07 | Bánh Trống Cho Trại Bắc   | Giao đồ, hài hước  | Bà Tư Bánh, Cai Tôn | Xong `c1_05`            |
| np_08 | Đèn Mỏ Thứ Bảy            | Giải đố            | Bà Hiền, Đinh Bảo   | Xong `c1_03`            |
| np_09 | Tiếng Mõ Bà Hạnh          | Tìm đồ, cảm động   | Bà Hạnh             | Xong `c1_06`            |
| np_10 | Lời Xin Lỗi Gửi Trại Bắc  | Kể chuyện cảm động | Út Gạo, Lão Neo     | Xong Chương 1 (`c1_07`) |

---

## np_01: Cát Sáng Cho Đèn Tết

- **Loại:** tìm đồ. **Địa điểm:** Phố Cũ (Phố Vạn Đăng), Bãi Sao Rơi.
- **Mục tiêu:** nhặt 5 nắm cát sáng ở Bãi Sao Rơi, mang về cho Bà Ngoan.
- **Phần thưởng:** 20 Đá Sao, 3 Bánh Trống, Đèn Cá Nhỏ (đồ trang trí).

```yaml
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Cháu là người sao rơi bạn của cháu Mai Linh đấy à? Lại đây, bà nhờ một việc."
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Đêm Tết loạn quá, cát sáng bà để dành làm mắt đèn đổ hết xuống cống. Mắt đèn mà không sáng thì đèn mù."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cháu đi nhặt giúp bà. Ở Bãi Sao Rơi phải không ạ?"
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Phải. Hạt nào lấp lánh như mắt mèo thì nhặt. Hạt nào sáng mà nóng tay thì để lại, đó là hạt mới rơi, chưa nguội."
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Năm nắm là đủ. Nhặt nhiều quá thì bãi buồn."
- tutorial: thu_thap
  hint: "Nhặt cát sáng ở Bãi Sao Rơi (0/5)."
- speaker: mailinh
  emotion: vui
  text: "Hạt này! Này nữa! Sao Rơi, cậu nhặt nhanh thế. Chắc tại cậu là sao nên cát nhận ra cậu."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Hay tại tôi nhìn gần mặt đất. Hôm qua tôi còn nằm ở đây mà."
- speaker: mailinh
  emotion: vui
  text: "Ha! Đúng. Cậu là người duy nhất trên đảo từng nằm trong hố cát sao."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một hạt cát dưới chân sáng hơn hẳn, ấm như hòn than nhỏ."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Hạt này nóng. Bà dặn để lại."
- speaker: mailinh
  emotion: binh_thuong
  text: "Ừ. Để nó nguội cho người sau nhặt. Bà bảo thế là chia với năm sau."
- action: move_camera
  to: pho_cu_hang_den
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Đủ năm nắm, lại không lấy hạt nóng. Cháu ngoan. Ngồi xuống, bà làm cho cái đèn."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Bà Ngoan dán hai hạt cát lên đầu một chiếc đèn giấy hình cá. Đèn sáng lên, mắt cá lấp lánh."
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Ngày xưa Nàng Vạn Đăng làm đèn cho người đi biển. Ai về muộn thì thấy đèn mà về. Đèn của cháu là cho cháu."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cháu đâu có đi biển, bà."
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Cháu đi xa hơn biển. Cháu rơi từ trời xuống. Người về từ xa nhất thì cần đèn nhất."
- speaker: mailinh
  emotion: ngai
  text: "Bà ơi, bà nói thế cậu ấy khóc mất."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cháu không khóc. Cháu chỉ… thấy ấm."
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Ấm là đúng. Đèn làm ra để người ta thấy ấm, không phải để thấy sáng."
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Khóc thì ăn Bánh Trống. Cầm lấy. Cả mấy viên đá sáng bà nhặt hồi trẻ nữa."
- action: give_reward
  reward: np_01
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Ai thương nó thì châm. Nhớ đấy."
```

---

## np_02: Bé Sen Đi Lạc

- **Loại:** hộ tống. **Địa điểm:** Rừng Trúc Mây → Phố Vạn Đăng.
- **Mục tiêu:** tìm Bé Sen trong Rừng Trúc Mây, đưa về nhà an toàn (Bé Sen đi theo sau, Giọt Nhầy và Yêu Rừng tấn công dọc đường).
- **Phần thưởng:** 15 Đá Sao, 800 Xu, Kẹo Mạch Nha (hồi máu nhỏ) ×3.

```yaml
- speaker: npc_ba_tu
  emotion: lo_lang
  text: "Cháu ơi! Có thấy con bé Sen nhà hàng xóm bà không? Nó đi hái măng từ sáng, giờ chưa về."
- speaker: npc_ba_tu
  emotion: lo_lang
  text: "Nó mới tám tuổi. Nó bảo vào Rừng Trúc Mây tìm con dế biết hát. Rừng ấy dạo này có Yêu Rừng."
- speaker: nguoi_uoc_nguyen
  emotion: nghiem
  text: "Cháu đi tìm ngay."
- action: move_camera
  to: rung_truc_may
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Rừng Trúc Mây xào xạc. Giữa một bụi trúc, một cô bé ngồi ôm giỏ măng, tai áp vào thân trúc."
- speaker: npc_be_sen
  emotion: binh_thuong
  text: "Suỵt! Đừng nói to. Con dế đang hát trong thân trúc này. Nghe này: tách, tách, rè."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bà Tư đang lo cho em lắm. Về nhà thôi."
- speaker: npc_be_sen
  emotion: gian
  text: "Chưa! Bắt được dế đã. Cả lớp bảo dế biết hát là chuyện bịa. Em phải mang về cho chúng nó nghe."
- speaker: bachvu
  emotion: vui
  text: "Mình hiểu rồi. Đây là việc danh dự. Sao Lạc, ta giúp bắt dế rồi đưa về. Tên em là gì, mình đặt biệt danh nhé."
- speaker: npc_be_sen
  emotion: vui
  text: "Sen. Anh lông trắng đặt biệt danh gì?"
- speaker: bachvu
  emotion: vui
  text: "Sen Nghe Trúc. Hay không?"
- speaker: npc_be_sen
  emotion: vui
  text: "Hay! Từ giờ em tên là Sen Nghe Trúc."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Thân trúc nứt nhẹ. Một con dế màu đồng nhảy ra, đậu lên vành giỏ, kêu một tràng dài."
- speaker: npc_be_sen
  emotion: vui
  text: "Thấy chưa! Nó hát! Về thôi, về thôi!"
- tutorial: ho_tong
  hint: "Đưa Bé Sen về Phố Vạn Đăng. Đừng để Bé Sen bị thương."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Giữa đường, ba Yêu Rừng nhảy ra từ bụi rậm, mắt dán vào giỏ măng."
- speaker: npc_be_sen
  emotion: lo_lang
  text: "Chúng muốn lấy măng! Măng của mẹ em!"
- speaker: lachong
  emotion: nghiem
  text: "Sen, đứng sau lưng tôi. Không ai lấy măng của mẹ em được."
- start_battle:
    enemies: [goblin, goblin, archer]
    on_win: np02_sau_tran
    protect: npc_be_sen
- label: np02_sau_tran
- speaker: npc_be_sen
  emotion: vui
  text: "Chúng chạy rồi! Anh chị đánh giỏi quá. Con dế còn không sợ."
- speaker: mailinh
  emotion: vui
  text: "Con dế dũng cảm thật. Đặt tên cho nó đi Sen."
- speaker: npc_be_sen
  emotion: binh_thuong
  text: "Tên nó là Tách Rè. Vì nó kêu tách rè."
- action: move_camera
  to: pho_van_dang
- speaker: npc_ba_tu
  emotion: vui
  text: "Trời ơi, về rồi! Con bé này, lần sau đi đâu phải nói!"
- speaker: npc_be_sen
  emotion: vui
  text: "Bà Tư ơi, con bắt được dế biết hát! Và con có biệt danh rồi, Sen Nghe Trúc!"
- speaker: npc_ba_tu
  emotion: vui
  text: "Biệt danh dài hơn cả người. Cảm ơn các cháu. Đây, kẹo mạch nha bà nấu Tết, và chút Xu."
- action: give_reward
  reward: np_02
- speaker: npc_be_sen
  emotion: vui
  text: "Mai em mang Tách Rè lên lớp. Ai không tin, em cho nghe. Ai tin rồi, em cũng cho nghe."
```

---

## np_03: Câu Đối Thiếu Chữ

- **Loại:** giải đố. **Địa điểm:** cổng Đình Trống Đồng, Phố Vạn Đăng, Bia Đá Dốc Cát.
- **Mục tiêu:** tìm ba chữ còn thiếu của câu đối Tết trên cổng Đình bằng các gợi ý Thầy Đồ Khiêm giấu ở ba nơi.
- **Phần thưởng:** 20 Đá Sao, Sách Kinh Nghiệm ×2, danh hiệu nhỏ "Người Điền Chữ".
- **Lời giải:** vế trên "Trống gọi sao về soi bến cũ", vế dưới "Đèn chờ người lại sáng đường xưa". Ba chữ thiếu: **sao**, **đèn**, **người**.

```yaml
- speaker: npc_thay_khiem
  emotion: lo_lang
  text: "Khổ quá, khổ quá. Đêm Tết gió giật mất ba chữ câu đối trên cổng Đình. Ta viết lại thì được, nhưng ta… quên mất chữ gì."
- speaker: nguoi_uoc_nguyen
  emotion: ngac_nhien
  text: "Thầy viết mà thầy quên ạ?"
- speaker: npc_thay_khiem
  emotion: ngai
  text: "Viết bốn mươi câu đối mỗi Tết, câu nào cũng hay. Hay quá thì quên. May là năm nào ta cũng giấu gợi ý cho học trò đố nhau."
- speaker: npc_thay_khiem
  emotion: binh_thuong
  text: "Vế trên: “Trống gọi … về soi bến cũ.” Vế dưới: “… chờ … lại sáng đường xưa.” Ba chỗ trống."
- speaker: npc_thay_khiem
  emotion: binh_thuong
  text: "Gợi ý thứ nhất ta để ở Bia Đá Dốc Cát. Thứ hai ở hàng đèn Phố Cũ. Thứ ba ở ngay trong Đình."
- tutorial: giai_do
  hint: "Tìm ba gợi ý của Thầy Đồ Khiêm."
- action: move_camera
  to: bia_da_doc_cat
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Dưới chân Bia Đá Dốc Cát có một mảnh giấy đỏ gài trong khe đá: “Ta rơi thì người ước, ta lên thì người chờ.”"
- speaker: mailinh
  emotion: vui
  text: "Rơi thì người ta ước… là sao! Sao rơi!"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "“Trống gọi sao về soi bến cũ.” Nghe hợp."
- action: move_camera
  to: pho_cu_hang_den
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trên một chiếc đèn ở hàng Bà Ngoan có dòng chữ nhỏ: “Không có lửa thì ta là giấy, có lửa thì ta là đường.”"
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Lão Khiêm năm nào cũng viết lên đèn của bà. Bà để yên, coi như đèn biết chữ."
- speaker: mailinh
  emotion: vui
  text: "Cái này tớ biết! Là đèn. Đèn lồng!"
- action: move_camera
  to: dinh_trong_dong
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trong Đình, trên mặt trống đồng có mảnh giấy dán bằng hồ nếp: “Trống đợi ta, đèn đợi ta, bến đợi ta. Ta là ai?”"
- speaker: lachong
  emotion: binh_thuong
  text: "Trống đợi người gõ. Đèn đợi người châm. Bến đợi người về."
- choice:
    - text: "Chữ thứ ba là “người”."
      goto: np03_dung
    - text: "Chữ thứ ba là “thuyền”."
      goto: np03_sai
- label: np03_sai
- speaker: lachong
  emotion: binh_thuong
  text: "Thuyền thì không gõ trống được. Thử lại xem."
- goto: np03_hoi_lai
- label: np03_hoi_lai
- choice:
    - text: "Chữ thứ ba là “người”."
      goto: np03_dung
- label: np03_dung
- speaker: npc_thay_khiem
  emotion: vui
  text: "Đúng rồi! “Trống gọi sao về soi bến cũ. Đèn chờ người lại sáng đường xưa.” Ta nhớ ra rồi!"
- speaker: npc_thay_khiem
  emotion: binh_thuong
  text: "Năm nay viết câu ấy vì ta nghĩ tới những người không về. Ai ngờ năm nay lại có người về, từ trên trời."
- speaker: thachson
  emotion: binh_thuong
  text: "Chữ của thầy khắc vào đá cũng đẹp. Nếu thầy muốn, tôi khắc câu này lên chân Bia Đá Dốc Cát."
- speaker: npc_thay_khiem
  emotion: vui
  text: "Được thế thì quý quá. Đá nhớ lâu hơn ta. Đây, phần thưởng cho người điền chữ."
- action: give_reward
  reward: np_03
- speaker: npc_thay_khiem
  emotion: binh_thuong
  text: "Sang năm cháu ghé Đình, ta ra câu đối khác. Lần này ta sẽ ghi lời giải vào sổ, phòng khi ta lại quên."
- speaker: mailinh
  emotion: vui
  text: "Thầy ghi lời giải rồi giấu sổ ở đâu ạ?"
- speaker: npc_thay_khiem
  emotion: ngai
  text: "…Để ta nghĩ cách nhớ chỗ giấu sổ đã."
```

---

## np_04: Cánh Buồm Vá Dở

- **Loại:** kể chuyện cảm động. **Địa điểm:** bến Làng Vạn Lưới, Rừng Trúc Mây, Bãi Sao Rơi.
- **Mục tiêu:** mang về cho Tám Lụa một bó sợi gai ở Rừng Trúc Mây và một vỏ ốc trắng ở Bãi Sao Rơi để vá xong cánh buồm cũ.
- **Phần thưởng:** 20 Đá Sao, 1000 Xu, Mảnh Buồm Gió Nồm (vật phẩm kỷ niệm, mở một dòng thoại của Hạ Vy khi Hạ Vy có trong đội).

```yaml
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Cậu khách. Ngồi xuống đây. Bà vá buồm cả buổi mà chưa xong một cánh. Mắt kém rồi."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trên đùi bà Tám Lụa là một cánh buồm nâu cũ, vá chồng nhiều lớp. Chỗ rách cuối cùng to bằng bàn tay."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Buồm này của thuyền nào vậy bà?"
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Của con gái bà. Nó đi với đoàn thuyền buôn Gió Nồm từ năm mười lăm tuổi. Năm nào về cũng xé buồm một chỗ, bà vá một chỗ."
- speaker: npc_tam_lua
  emotion: buon
  text: "Năm nay nó không về Tết. Đoàn đi xa hơn mọi năm. Bà vá cho xong để khi nó về có buồm mà đi tiếp."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Bà thiếu sợi gai, loại mọc ở Rừng Trúc Mây, bện được dây không mục. Và một vỏ ốc trắng để miết đường khâu."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cháu đi lấy. Bà nghỉ tay đi."
- tutorial: thu_thap
  hint: "Lấy sợi gai ở Rừng Trúc Mây và vỏ ốc trắng ở Bãi Sao Rơi."
- speaker: suongmai
  emotion: binh_thuong
  text: "Báo cáo: sợi gai mọc ở chỗ trúc thưa, gần suối. Tôi hay đi qua lúc sáng."
- speaker: mailinh
  emotion: binh_thuong
  text: "Con gái bà Tám là chị Hạ Vy đấy, Sao Rơi. Chị ấy bắn cung giỏi lắm. Mùa hè mà tay lạnh như đá."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ở mép nước Bãi Sao Rơi, giữa cát đen, có một vỏ ốc trắng nằm úp, như ai cố ý đặt."
- action: move_camera
  to: lang_van_luoi_ben
- speaker: npc_tam_lua
  emotion: vui
  text: "Đủ cả rồi. Ngồi đây, xem bà vá. Không có gì hay đâu, nhưng có người ngồi cạnh thì kim đi nhanh hơn."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Kim đi lên, đi xuống. Vỏ ốc miết từng đường. Chỗ rách liền lại, để lại một đường khâu hình con sóng."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Chồng bà mất ngoài biển khi con bé mới năm tuổi. Bà sợ biển. Nhưng con bé lại thương biển."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Bà không giữ nó lại. Người ta thương cái gì thì cho người ta đi theo cái ấy. Bà chỉ vá buồm."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bà có muốn cháu nhắn gì cho chị ấy không, nếu cháu gặp?"
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Nhắn là buồm vá rồi. Thế là nó hiểu. Nhà bà không nói câu dài."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Mảnh vải thừa này, cậu cầm. Vải buồm Gió Nồm, gió thổi mấy cũng không rách. Gặp con bé thì đưa nó xem."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cháu sẽ giữ cẩn thận. Gặp chị ấy, cháu đưa ngay."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Ừ. Mà nếu nó hỏi bà có khỏe không, cứ bảo khỏe. Bà khỏe thật."
- action: give_reward
  reward: np_04
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Đường khâu hình sóng. Ở Đền Trăng, người ta khâu như thế lên áo người đi xa, để nước nhận ra mà đưa về."
- speaker: npc_tam_lua
  emotion: vui
  text: "Thế à? Bà khâu theo thói quen thôi. Hóa ra thói quen của bà cũng có nghĩa."
```

---

## np_05: Con Cá To Nhất Vịnh

- **Loại:** hài hước. **Địa điểm:** bến Làng Vạn Lưới, mỏm đá Vịnh Khơi.
- **Mục tiêu:** giúp Hai Khoác câu "con cá to nhất vịnh" để thắng vụ cá cược với cả làng; đánh lui đám Giọt Nhầy Nước nhảy vào giỏ cá.
- **Phần thưởng:** 15 Đá Sao, 1200 Xu, Cần Câu Tre (mở hoạt động câu cá sau này, ghi ở Đề xuất).

```yaml
- speaker: npc_hai_khoac
  emotion: vui
  text: "Người sao rơi! Cậu tới đúng lúc. Tôi kể cậu nghe chuyện con cá to nhất vịnh. Chuyện thật trăm phần trăm."
- speaker: npc_hai_khoac
  emotion: vui
  text: "Năm ngoái tôi câu được một con cá to bằng cái thuyền. Nó kéo tôi đi ba vòng vịnh rồi mới chịu lên."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Năm kia nó to bằng cái chiếu. Năm kìa bằng cái nong. Năm nào cũng lớn thêm."
- speaker: npc_hai_khoac
  emotion: ngai
  text: "Thì cá lớn mà. Cá không lớn thì là cá gì."
- speaker: npc_hai_khoac
  emotion: binh_thuong
  text: "Cả làng cược với tôi một nồi cháo cá. Hôm nay tôi mà không câu được con to hơn bắp chân, tôi phải nấu cháo cho cả làng."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Vậy ta đi câu thôi."
- action: move_camera
  to: vinh_khoi_mom_da
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Mỏm đá đầu vịnh lộng gió. Hai Khoác thả câu với vẻ mặt của người sắp làm việc lớn."
- speaker: npc_hai_khoac
  emotion: vui
  text: "Nhìn phao này. Phao rung là cá lớn. Phao chìm là cá rất lớn. Phao bay lên là… tôi chưa gặp."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Phao bay lên. Một Giọt Nhầy Nước bám chặt lưỡi câu, nhảy tưng tưng trên mặt nước, kéo theo cả đàn."
- speaker: npc_hai_khoac
  emotion: ngac_nhien
  text: "Cái gì đây! Cá gì mà không có vảy! Mềm như thạch!"
- speaker: bachvu
  emotion: vui
  text: "Giọt Nhầy đấy, ông. Chúng thích mồi của ông. Mình gọi chúng là Thạch Biết Nhảy."
- start_battle:
    enemies: [slime, slime, slime, slime]
    on_win: np05_sau_tran
- label: np05_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đám Giọt Nhầy tan thành bụi sao. Phao lặng. Rồi dây câu căng đến mức cần tre cong như cánh cung."
- speaker: npc_hai_khoac
  emotion: vui
  text: "Lần này thật! Giữ giúp tôi! Giữ!"
- tutorial: giu_nut
  hint: "Giữ nút đánh thường để giúp Hai Khoác kéo cần."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một con cá thu bạc dài hơn bắp chân một chút quẫy lên bờ đá. Không to bằng thuyền. Nhưng thật."
- speaker: npc_hai_khoac
  emotion: vui
  text: "To hơn bắp chân! Tôi thắng! Cả làng phải nghe tôi kể chuyện này mười năm."
- speaker: mailinh
  emotion: vui
  text: "Sang năm nó to bằng cái thuyền đúng không ông?"
- speaker: npc_hai_khoac
  emotion: ngai
  text: "…Sang năm nó to bằng hai cái thuyền. Vì có các cậu làm chứng."
- action: move_camera
  to: lang_van_luoi_ben
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Hơn bắp chân thật. Lần đầu tiên sau mười năm. Thôi được, làng nấu cháo cho ông."
- speaker: npc_hai_khoac
  emotion: vui
  text: "Không, không. Tôi thắng thì tôi nấu. Nấu cháo cá cho cả làng, ai cũng có phần. Thắng mà ăn một mình thì buồn lắm."
- speaker: npc_hai_khoac
  emotion: binh_thuong
  text: "Cậu cầm cái cần câu này. Tre già ở Rừng Trúc Mây, câu được cá thật. Nhớ là phao bay lên thì đừng hoảng."
- action: give_reward
  reward: np_05
- speaker: npc_tam_lua
  emotion: vui
  text: "Hai Khoác nói khoác cả đời, nhưng nồi cháo thì lúc nào cũng thật."
```

---

## np_06: Tiếng Sáo Trên Sông Sương

- **Loại:** hộ tống (trên đò). **Địa điểm:** Sông Sương, từ bến Vạn Lưới lên Hồ Gương.
- **Mục tiêu:** đi cùng đò của Ông Sáo lên Hồ Gương; giữ đò khỏi Bóng Cặn ở hai khúc sông; nghe ông thổi bài sáo cũ.
- **Phần thưởng:** 20 Đá Sao, 1000 Xu, Lá Sáo Trúc (vật phẩm kỷ niệm, mở bản nhạc "Sông Sương" trong máy hát ở Đình sau này).

```yaml
- speaker: npc_ong_sao
  emotion: binh_thuong
  text: "Cậu khách lên Hồ Gương à? Lên đò đi. Ta chở. Nhưng dạo này sông có bóng đen, ta không dám đi một mình."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bọn cháu đi cùng ông. Có gì bọn cháu giữ đò."
- speaker: npc_ong_sao
  emotion: vui
  text: "Tốt. Đò ta chậm. Ta chèo bằng một tay, tay kia cầm sáo. Sông Sương nghe sáo thì sương tan."
- tutorial: ho_tong
  hint: "Đi cùng đò của Ông Sáo lên Hồ Gương. Đừng để đò bị đánh chìm."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đò trôi chậm giữa hai bờ tre. Ông Sáo thổi một đoạn ngắn, sương trên mặt nước tách ra thành đường."
- speaker: suongmai
  emotion: binh_thuong
  text: "Báo cáo: tôi luyện kiếm ở khúc sông này mỗi sáng. Sáng nào cũng nghe tiếng sáo này. Giờ mới biết là ông."
- speaker: npc_ong_sao
  emotion: vui
  text: "Con bé múa kiếm trên bãi đá là cháu à? Ta vẫn thổi chậm lại cho cháu múa theo đấy."
- speaker: suongmai
  emotion: ngai
  text: "…Rõ. Cảm ơn ông ạ."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ở khúc quanh, mặt sông sủi đen. Hai Bóng Cặn đứng lên chắn mũi đò."
- start_battle:
    enemies: [bong_can, bong_can]
    on_win: np06_khuc_hai
    protect: do_ong_sao
- label: np06_khuc_hai
- speaker: npc_ong_sao
  emotion: lo_lang
  text: "Chúng nói gì đấy? Ta nghe như có người gọi tên ai."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Là lời ước cũ. Không phải của ông. Ông cứ thổi sáo, sáo ông làm nước dịu."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ông Sáo thổi tiếp. Tiếng sáo trầm xuống. Ở khúc sông thứ hai, Bóng Cặn đứng lên chậm hơn, như đang nghe."
- start_battle:
    enemies: [bong_can, bong_can, bong_can]
    on_win: np06_den_noi
    protect: do_ong_sao
- label: np06_den_noi
- action: move_camera
  to: ho_guong_ben_do
- speaker: npc_ong_sao
  emotion: binh_thuong
  text: "Tới rồi. Cảm ơn các cháu. Ta già, chèo thì được, đánh thì không."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Ông thổi bài gì vậy ạ? Nghe buồn mà không nặng."
- speaker: npc_ong_sao
  emotion: binh_thuong
  text: "Bài vợ ta hay hát khi giặt áo bên sông. Bà ấy mất hai mươi năm rồi. Ta không hát được, nên ta thổi."
- speaker: npc_ong_sao
  emotion: binh_thuong
  text: "Ngày bà ấy mất, ta ước được nghe giọng bà ấy một lần nữa. Không sao nào đáp. Ta thổi sáo, thấy giọng bà ấy trong đó. Thế cũng là đáp."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Ông cho cháu xin bài ấy được không? Cháu muốn ru Bà Khơi bằng bài ấy một đêm."
- speaker: npc_ong_sao
  emotion: vui
  text: "Lấy đi. Bài hát thì cho bao nhiêu cũng không hết. Cầm cái lá sáo này nữa, ta có nhiều."
- speaker: suongmai
  emotion: binh_thuong
  text: "Ông Sáo, sáng mai cháu vẫn luyện kiếm ở bãi đá. Ông cứ thổi chậm ạ."
- speaker: npc_ong_sao
  emotion: vui
  text: "Ừ. Mai ta thổi chậm hơn nữa. Để cháu kịp thở."
- action: give_reward
  reward: np_06
- speaker: npc_ong_sao
  emotion: binh_thuong
  text: "Khi nào cần qua sông, ra bến gọi to tên ta. Ta nghe được, dù đang ngủ."
```

---

## np_07: Bánh Trống Cho Trại Bắc

- **Loại:** giao đồ, hài hước. **Địa điểm:** Phố Vạn Đăng → đường phía bắc → Trại Bắc (Quân Trấn Thủ, gần Hang Hắc Giao).
- **Mục tiêu:** mang một giỏ Bánh Trống còn nóng từ hàng Bà Tư lên Trại Bắc trước khi nguội; dọc đường có Yêu Rừng đánh hơi thấy bánh.
- **Phần thưởng:** 15 Đá Sao, 1000 Xu, Bánh Trống ×5.

```yaml
- speaker: npc_ba_tu
  emotion: binh_thuong
  text: "Cháu ơi, bà hứa với Cai Tôn một giỏ bánh từ Tết, giờ mới nướng xong. Cháu mang lên Trại Bắc giúp bà được không?"
- speaker: npc_ba_tu
  emotion: nghiem
  text: "Phải mang lúc còn nóng. Bánh Trống nguội thì cứng như mặt trống. Cai Tôn sẽ bảo bà làm bánh dở."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Cháu chạy nhanh lắm, bà yên tâm."
- tutorial: giao_hang
  hint: "Mang giỏ Bánh Trống lên Trại Bắc trước khi bánh nguội."
- speaker: bachvu
  emotion: vui
  text: "Sao Lạc, thơm quá. Mình ăn một cái thôi. Một cái thì Cai Tôn không đếm được đâu."
- speaker: lachong
  emotion: nghiem
  text: "Cai Tôn đếm được. Anh ấy đếm bánh giỏi hơn đếm lính."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Giữa đường, hai Yêu Rừng thò đầu khỏi bụi cây, mũi khịt khịt về phía giỏ bánh."
- speaker: mailinh
  emotion: gian
  text: "Không được! Bánh của Cai Tôn! Muốn ăn thì xuống chợ mua!"
- start_battle:
    enemies: [goblin, goblin]
    on_win: np07_den_trai
- label: np07_den_trai
- action: move_camera
  to: trai_bac
- speaker: npc_cai_ton
  emotion: vui
  text: "Bánh! Bánh của Bà Tư! Còn nóng! Cậu khách, cậu là người tốt nhất đảo."
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Khoan. Để tôi đếm. Một, hai… mười một. Bà Tư hứa mười hai."
- speaker: bachvu
  emotion: ngai
  text: "…Mình xin lỗi. Một cái thôi mà."
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Thôi được. Một cái phí đường. Hợp lệ. Quân Trấn Thủ cũng có phí đường."
- if_flag: c1_ut_gao=giao_quan
  then:
    - speaker: npc_ut_gao
      emotion: binh_thuong
      text: "Bánh Bà Tư à? Bà tôi hay mua cho tôi hồi nhỏ. Cho tôi một cái được không?"
    - speaker: npc_cai_ton
      emotion: binh_thuong
      text: "Lấy đi. Cậu ngồi Trại mấy hôm mà còn chăm quét sân hơn lính tôi."
  else:
    - speaker: npc_cai_ton
      emotion: binh_thuong
      text: "Để dành hai cái cho ông Neo. Ông ấy không nói, nhưng tôi biết ông ấy thích bánh cháy cạnh."
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Cảm ơn cậu. Gửi Bà Tư mấy đồng này, bảo tháng sau tôi xuống chợ trả nốt. Còn đây là phần của cậu."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Bà Tư dặn bánh phải ăn lúc nóng. Anh ăn ngay đi."
- speaker: npc_cai_ton
  emotion: vui
  text: "Lệnh của Bà Tư thì Quân Trấn Thủ phải theo. Ăn ngay."
- speaker: mailinh
  emotion: vui
  text: "Cháu sẽ kể với Bà Tư là anh khen bánh ngon nhất đảo nhé!"
- speaker: npc_cai_ton
  emotion: ngai
  text: "Kể thì kể, đừng kể là tôi ăn một lúc bốn cái."
- action: give_reward
  reward: np_07
- speaker: npc_cai_ton
  emotion: vui
  text: "Từ nay ai lên Trại mà mang bánh, tôi cho qua không hỏi. Ai không mang bánh, tôi hỏi kỹ."
- speaker: lachong
  emotion: binh_thuong
  text: "Cai Tôn, đó không phải luật gác."
- speaker: npc_cai_ton
  emotion: vui
  text: "Luật gác của tôi."
```

---

## np_08: Đèn Mỏ Thứ Bảy

> **Trong game (S23):** đã làm thành quest mini `np_08` trong `content/puzzles.yaml`. Người chơi thắp bảy đèn mỏ bằng Hỏa và Ngọc Thạch nhập đội thật, là nguồn Thổ miễn phí. Vì game chưa chạy theo chương, quest mở ngay từ đầu. Xem [docs/world/cau-do-bi-canh.md](../world/cau-do-bi-canh.md).

- **Loại:** giải đố. **Địa điểm:** Mỏ Ngọc, làng thợ mỏ.
- **Mục tiêu:** thắp bảy đèn mỏ dọc đường hầm cũ theo đúng thứ tự trong bài vè của thợ mỏ để mở lại lối vào gian ngọc đã đóng từ năm xảy ra sập hầm.
- **Lời giải:** bài vè "Một đèn cửa gió, hai đèn giọt nước, ba đèn đá đỏ, bốn đèn cột chống, năm đèn ngã ba, sáu đèn vết búa, bảy đèn tên người". Đèn thứ bảy đặt dưới tấm đá khắc tên những thợ mỏ cũ.
- **Phần thưởng:** 25 Đá Sao, 1500 Xu, Ngọc Thô ×3 (nguyên liệu Khai Tinh hệ Thổ).

```yaml
- speaker: npc_dinh_bao
  emotion: binh_thuong
  text: "Cậu là người Thạch Sơn kể? Tốt. Tôi cần một người tay chắc. Đường hầm cũ phía tây có bảy cái đèn, tắt từ năm sập hầm."
- speaker: npc_ba_hien
  emotion: binh_thuong
  text: "Ông nhà tôi muốn mở lại gian ngọc trong đó. Nhưng đèn phải thắp đúng thứ tự, không thì cửa đá không mở. Thợ mỏ xưa làm thế cho trẻ con khỏi lạc vào."
- speaker: npc_ba_hien
  emotion: binh_thuong
  text: "Thứ tự ở trong bài vè. Tôi chỉ nhớ câu đầu: “Một đèn cửa gió.” Những câu sau tôi nhớ lơ mơ."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bọn cháu vào xem. Có gì cháu gọi."
- tutorial: giai_do
  hint: "Thắp bảy đèn mỏ theo đúng thứ tự trong bài vè."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đèn đầu tiên treo ở chỗ gió lùa vào hầm. Bên cạnh có khắc mấy chữ đã mòn: “Hai đèn giọt nước.”"
- speaker: thachson
  emotion: binh_thuong
  text: "Mỗi đèn có khắc câu sau. Người xưa thương trẻ con, nhưng không thương đến mức viết sẵn cả bài."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đèn thứ hai dưới một mỏm đá rỉ nước. Đèn thứ ba bên vỉa đá đỏ. Rồi cột chống, rồi ngã ba, rồi một vết búa sâu trên vách."
- speaker: mailinh
  emotion: vui
  text: "Sáu đèn rồi! Câu thứ bảy là gì?"
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Cạnh đèn thứ sáu chỉ khắc: “Bảy đèn tên người.” Không có đèn nào nữa trong tầm mắt."
- speaker: thachson
  emotion: binh_thuong
  text: "Tên người. Thợ mỏ hay khắc tên bạn mình lên đá khi có người không ra khỏi hầm."
- choice:
    - text: "Tìm tấm đá có khắc tên người."
      goto: np08_dung
    - text: "Thắp lại đèn thứ nhất lần nữa."
      goto: np08_sai
- label: np08_sai
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Sáu ngọn đèn cùng tắt phụt. Trong bóng tối có tiếng đá cười khe khẽ, như ông thợ già trêu học trò."
- speaker: thachson
  emotion: binh_thuong
  text: "Thắp lại từ đầu. Lần này đi tìm tên người."
- goto: np08_dung
- label: np08_dung
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Cuối nhánh hầm bên trái có một tấm đá phẳng khắc mười tên người. Chân tấm đá có một cái đèn nhỏ, phủ bụi."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đèn thứ bảy sáng. Vách đá phía trước kêu rền rồi tách ra. Bên trong, ngọc thô ánh xanh như mặt hồ."
- action: move_camera
  to: mo_ngoc_lang_tho
- speaker: npc_dinh_bao
  emotion: binh_thuong
  text: "Mở được rồi à. Tốt. Mười tên trên tấm đá ấy, bốn người là bạn tôi."
- speaker: npc_ba_hien
  emotion: binh_thuong
  text: "Từ năm ấy ông nhà tôi không vào nhánh hầm tây. Giờ có đèn, có đường, ông ấy vào thăm bạn được rồi."
- speaker: npc_dinh_bao
  emotion: binh_thuong
  text: "Ngọc trong đó là của mỏ. Nhưng ba viên đầu tiên là của người mở cửa. Lệ thợ mỏ."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bác có muốn vào trong đó cùng bọn cháu không?"
- speaker: npc_dinh_bao
  emotion: binh_thuong
  text: "Mai. Hôm nay đèn vừa sáng, để bạn tôi quen với ánh sáng đã."
- speaker: thachson
  emotion: binh_thuong
  text: "Tôi sẽ khắc lại mấy tên đã mòn trên tấm đá. Khắc chậm thì nhớ lâu."
- speaker: npc_dinh_bao
  emotion: binh_thuong
  text: "Cảm ơn. Tay cậu chắc hơn tay tôi bây giờ."
- action: give_reward
  reward: np_08
- speaker: npc_ba_hien
  emotion: vui
  text: "Con gái tôi mà biết có người giải được bài vè, nó sẽ đòi đố cậu bài khác. Nó tên Ngọc Thạch. Gặp thì đừng chạy."
```

---

## np_09: Tiếng Mõ Bà Hạnh

- **Loại:** tìm đồ, cảm động. **Địa điểm:** Làng Vạn Lưới, Rừng Trúc Mây, Làng Chìm lúc nước ròng.
- **Mục tiêu:** tìm cái mõ gỗ mít cũ của Bà Hạnh, rơi xuống nước đêm cả làng hát ru ở bãi; nếu không tìm được thì giúp Ông Sáo và Thạch Sơn làm mõ mới.
- **Phần thưởng:** 25 Đá Sao, 1200 Xu, Dùi Mõ Vạn Lưới (vật phẩm kỷ niệm).

```yaml
- speaker: npc_ba_hanh
  emotion: buon
  text: "Cháu đấy à. Ngồi xuống. Đêm hát ở bãi, bà vui quá, đánh mõ mạnh tay. Cái mõ tuột khỏi tay rơi xuống nước."
- speaker: npc_ba_hanh
  emotion: buon
  text: "Mõ ấy của mẹ bà để lại. Gỗ mít, bóng như đồng. Bà đánh nó năm mươi năm. Sáng nay làng không có mõ báo sáng."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Nước rút thì cháu xuống tìm. Bà có nhớ nó rơi ở đâu không?"
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Chỗ bãi sát Làng Chìm. Nước kéo ra thì chắc nó trôi vào giữa mấy mái nhà cũ."
- tutorial: thu_thap
  hint: "Tìm cái mõ của Bà Hạnh ở Làng Chìm lúc nước ròng."
- action: move_camera
  to: lang_chim
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Nước rút. Giữa những mái nhà phủ hà, một khúc gỗ tròn mắc trong khung cửa sổ cũ. Gỗ bóng, có một vết nứt dài."
- speaker: thachson
  emotion: binh_thuong
  text: "Nứt rồi. Gỗ ngấm nước biển cả đêm. Đánh vào sẽ không kêu được như cũ."
- speaker: mailinh
  emotion: buon
  text: "Bà Hạnh sẽ buồn lắm."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trong khung cửa sổ ấy, người ta còn thấy một cái mõ nhỏ hơn nằm lẫn trong bùn, đen như than. Mõ của ai đó từ ba trăm năm trước."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Làng này cũng từng có người đánh mõ báo sáng. Mõ của bà Hạnh trôi về đúng chỗ mõ cũ nằm."
- action: move_camera
  to: lang_van_luoi_nha_ba_hanh
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Tìm được rồi à. Nứt rồi. Bà biết mà. Gỗ già thì nứt, người già thì run."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bà ơi, cháu mang cả cái mõ cũ này lên nữa. Nó nằm cạnh mõ của bà, dưới Làng Chìm."
- speaker: npc_ba_hanh
  emotion: ngac_nhien
  text: "Mõ của làng chìm… Ba trăm năm không ai đánh. Đêm qua mõ của bà xuống ngủ cạnh nó."
- speaker: npc_ong_sao
  emotion: binh_thuong
  text: "Bà Hạnh, để tôi. Tôi khoét sáo được thì khoét mõ được. Gỗ mít ở Rừng Trúc Mây còn nhiều."
- speaker: thachson
  emotion: binh_thuong
  text: "Tôi giúp ông giữ khối gỗ. Lấy mảnh nứt của mõ cũ làm cán dùi, để cái cũ đi tiếp trong cái mới."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đến chiều, có một cái mõ mới, màu gỗ còn tươi. Dùi mõ làm bằng mảnh gỗ cũ, bóng như đồng."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Thử nào."
- action: play_sfx
  id: mo_bao_gio
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Tiếng mõ vang khắp Vạn Lưới. Trong hơn tiếng cũ một chút. Ở bến, mấy người ngẩng lên, cười."
- speaker: npc_ba_hanh
  emotion: vui
  text: "Kêu rồi. Kêu khác, nhưng vẫn là tiếng nhà mình."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Cái mõ cũ của làng chìm, cháu để bà đặt lên Đình. Làng chìm không còn người, nhưng còn tiếng."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Dùi cũ bà giữ một cái. Cái này bà làm thêm cho cháu. Cháu đi xa, nhớ tiếng mõ Vạn Lưới."
- action: give_reward
  reward: np_09
- speaker: lachong
  emotion: binh_thuong
  text: "Sáng mai làng lại có mõ báo sáng. Trống còn, đảo còn. Mõ còn, làng còn."
```

---

## np_10: Lời Xin Lỗi Gửi Trại Bắc

- **Loại:** kể chuyện cảm động. **Mở khi:** xong Chương 1 (`c1_07`). **Địa điểm:** Làng Vạn Lưới (nhà ông Neo), Bãi Sao Rơi, Trại Bắc.
- **Mục tiêu:** Út Gạo nhờ mang con diều hình cá anh Cò làm năm xưa (tìm thấy trên gác nhà ông Neo) lên Trại Bắc, kèm lời xin lỗi.
- **Phần thưởng:** 30 Đá Sao, 1500 Xu, Diều Cá Của Cò (vật phẩm kỷ niệm). Nếu `c1_tra_loi_neo=nghe`: thêm 10 Đá Sao (ông Neo gửi lại số đá ông nhặt được).
- **Ghi chú:** nhiệm vụ này không thay chuỗi nhiệm vụ nhân vật của Minh Khải và Sương Mai; nó chỉ là lần đầu người chơi gặp lại ông Neo sau Chương 1.

```yaml
- if_flag: c1_ut_gao=ve_nha
  then:
    - speaker: npc_ut_gao
      emotion: binh_thuong
      text: "Cậu ơi. Bà tôi bảo ai làm sai thì phải tự đi xin lỗi. Nhưng tôi không dám lên Trại một mình."
  else:
    - speaker: npc_ut_gao
      emotion: binh_thuong
      text: "Cậu ơi. Quan Trấn Thủ cho tôi về nhà rồi. Giờ tôi muốn lên lại Trại, lần này để xin lỗi ông Neo."
- speaker: npc_ut_gao
  emotion: buon
  text: "Trong hội, ông ấy dặn tắt đèn. Nhưng tôi là người tắt đèn nhà bà Ngoan đầu tiên. Ông ấy chưa bảo tôi làm thế."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Tôi đi cùng cậu. Cậu có muốn mang gì cho ông ấy không?"
- speaker: npc_ut_gao
  emotion: binh_thuong
  text: "Có. Hôm dọn nhà ông Neo, Minh Khải thấy cái này trên gác. Anh ấy bảo tôi mang lên, vì anh ấy chưa lên được."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Út Gạo mở gói vải. Bên trong là một con diều hình cá, đuôi dài, giấy đã ố vàng."
- speaker: mailinh
  emotion: buon
  text: "Diều anh Cò… Cháu nhớ con này. Anh ấy thả nó ở Bãi Sao Rơi. Nó bay không cao, nhưng lâu lắm."
- speaker: suongmai
  emotion: binh_thuong
  text: "Báo cáo: dây diều đã mục. Nếu thả, cần dây mới. Tôi có dây kiếm. Đủ dài."
- action: move_camera
  to: bai_sao_roi
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ở Bãi Sao Rơi, gió từ biển lên đều. Út Gạo buộc dây mới, chạy mấy bước. Con diều cá rung rung rồi lên."
- speaker: npc_ut_gao
  emotion: vui
  text: "Lên rồi! Nó lên rồi! Từ đây nhìn lên chắc Trại Bắc thấy."
- speaker: bachvu
  emotion: binh_thuong
  text: "Gió đang thổi về phía bắc. Nếu ông ấy đứng ở cửa sổ, ông ấy sẽ thấy."
- action: move_camera
  to: trai_bac
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Ông Neo đứng ở cửa sổ cả buổi. Ông ấy bảo trời có con cá bay. Tôi tưởng ông nói mê."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Thằng Gạo. Và người lạ. Diều ấy… mày lấy ở đâu?"
- speaker: npc_ut_gao
  emotion: buon
  text: "Trên gác nhà ông. Ông Neo, cháu xin lỗi. Cháu tắt đèn bà Ngoan trước khi ông bảo. Cháu muốn tắt hết cho nhanh hết buồn."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "…Người phải xin lỗi là tôi. Tôi dạy trẻ con rằng ước là khổ. Tôi quên mất ngày xưa thằng Cò vừa thả diều vừa ước."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Nó ước gì, mày biết không? Nó ước diều bay tới được Tinh Hải. Diều thì không bay tới đó được. Nó vẫn thả."
- if_flag: c1_tra_loi_neo=nghe
  then:
    - speaker: npc_lao_neo
      emotion: binh_thuong
      text: "Người lạ, cậu bảo cậu nghe được. Vậy cậu nghe giùm tôi điều này: tôi muốn được thả diều này thêm một lần, khi ra khỏi đây."
    - speaker: nguoi_uoc_nguyen
      emotion: binh_thuong
      text: "Tôi nghe rồi. Diều sẽ đợi ông ở Bãi Sao Rơi."
  else:
    - speaker: npc_lao_neo
      emotion: binh_thuong
      text: "Người lạ, cậu bảo cậu không biết. Tôi cũng không biết. Nhưng tôi biết một con diều thì cần người giữ dây."
    - speaker: nguoi_uoc_nguyen
      emotion: binh_thuong
      text: "Tôi giữ giúp ông tới khi ông ra."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Thằng Gạo, về bảo bà Hạnh: tôi nợ làng một đêm hát. Ra khỏi đây tôi sẽ hát. Hát dở nhưng hát."
- speaker: npc_ut_gao
  emotion: vui
  text: "Dạ! Cháu sẽ bảo bà."
- action: give_reward
  reward: np_10
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Từ hôm ấy, cứ chiều nào gió thổi về phía bắc, trên Bãi Sao Rơi lại có một con diều cá. Ở Trại Bắc, có một người già đứng ở cửa sổ."
```
