# Chương 1: Tiếng Trống Dưới Nước Đen

> Kịch bản đầy đủ Chương 1 tại Đảo Lạc. Định dạng YAML tạm theo `docs/story/README.md`. Điều kiện mở, phần thưởng, địa điểm từng nhiệm vụ ở `bang-kiem-tra.md`.
>
> **Mở khi:** xong `md_06`.
> **Dẫn đường:** Lạc Hồng, Thủy Nguyệt, Thạch Sơn. **Phản diện:** Lão Neo (Mặt Nạ Gỗ).
> **Hé lộ trong chương** ([Hé lộ Ch.1]): Hắc Giao sinh từ Nguyện Cặn; Mùa Nước Đen là lúc Hắc Giao trồi lên tìm người nghe; lời ước của Bà Lưới chỉ được trả lời một nửa; hai Bia Đá cổ mất lõi; ông Neo là Mặt Nạ Gỗ (chỉ ở `c1_07`).
> **Không hé lộ:** Hắc Giao là phần bị thương của Bà Khơi; Hắc Giao thức dậy vì Người Ước Nguyện; tên Tô Khuyết; Lõi Sao Cả.

## Nhiệm vụ trong chương

| Mã    | Tên                       | Địa điểm chính                    | Hộ Tinh nhập đội             | Trận                                    |
| ----- | ------------------------- | --------------------------------- | ---------------------------- | --------------------------------------- |
| c1_01 | Sáng Sau Đêm Sao          | Đình Trống Đồng                   | Lạc Hồng                     | Không                                   |
| c1_02 | Nước Đen Ở Bến Vạn Lưới   | Làng Vạn Lưới                     | Không                        | Bóng Cặn                                |
| c1_03 | Hai Ổ Lõi Trống           | Hang Hắc Giao (Bia Đông, Bia Tây) | Thạch Sơn                    | Hộ Vệ Đá Cổ                             |
| c1_04 | Chuông Bạc Lạc Nhịp       | Hồ Gương, Đền Trăng               | Thủy Nguyệt                  | Bóng Cặn                                |
| c1_05 | Mặt Nạ Trắng Ở Chợ Đêm    | Phố Vạn Đăng                      | Không                        | Lính Mặt Nạ Trắng, Pháp Sư Mặt Nạ       |
| c1_06 | Nửa Lời Của Bà Lưới       | Vịnh Khơi, Làng Chìm              | Minh Khải (đi cùng tạm thời) | Bóng Cặn                                |
| c1_07 | Tiếng Trống Dưới Nước Đen | Hang Hắc Giao, Bia Bắc            | Không                        | Boss: Mặt Nạ Gỗ, rồi Hắc Giao (bản yếu) |

## Hai lựa chọn nhỏ

| #   | Ở đâu                                               | Lựa chọn                                          | Cờ                                       | Ảnh hưởng                                                        |
| --- | --------------------------------------------------- | ------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| 1   | `c1_02`, ông Neo hỏi "ước người chết về được không" | "Tôi không biết." / "Không. Nhưng tôi nghe được." | `c1_tra_loi_neo` = `khong_biet` / `nghe` | Đổi câu cuối của ông Neo ở `c1_07` và một câu của Sương Mai      |
| 2   | `c1_05`, bắt được Út Gạo đeo mặt nạ trắng           | Giao cho Quân Trấn Thủ / Đưa về nhà               | `c1_ut_gao` = `giao_quan` / `ve_nha`     | Phần thưởng khác nhau; đổi lời Út Gạo ở `c1_07` và trong `np_10` |

Cả hai lựa chọn nhập lại cùng một mạch, không rẽ nhánh lớn.

## Ghi chú quái mới

- **Bóng Cặn** (`bong_can`): khối nước đen hình người không mặt, bò lên từ nơi nước bị Nguyện Cặn nhuộm. Hệ Thủy. Thì thầm nửa câu ước. Bị đánh bại thì tan thành nước trong. Có trong `docs/world/06-sinh-vat.md` (Mới).
- **Lính Mặt Nạ Trắng** (`mat_na_trang`): có trong `docs/world/06-sinh-vat.md` (Mới).
- **Mặt Nạ Gỗ** (`mat_na_go`): trận boss người, chỉ dùng trong `c1_07`.

---

## c1_01: Sáng Sau Đêm Sao

**Mục tiêu:** "Dự buổi họp Hội Đồng ở Đình Trống Đồng."

```yaml
- action: set_time
  to: sang
- action: move_camera
  to: dinh_trong_dong
- action: play_sfx
  id: trong_bao_dao
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Sáng mùng hai tháng Trống. Ba hồi trống báo vang khắp đảo. Lần đầu tiên sau nhiều năm, Hội Đồng họp ngoài ngày rằm."
- speaker: mailinh
  emotion: binh_thuong
  text: "Sao Rơi dậy chưa? Bà ngoại bảo tớ dẫn cậu lên Đình. Hội Đồng muốn gặp cậu."
- speaker: nguoi_uoc_nguyen
  emotion: lo_lang
  text: "Họ có nghĩ tôi mang con rồng tới không?"
- speaker: mailinh
  emotion: binh_thuong
  text: "Có người nghĩ thế thật. Nhưng bà ngoại bảo ai thương nó thì châm, ai sợ nó thì thổi. Tớ thương, tớ châm."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trong Đình, năm người ngồi quanh chiếc chiếu hoa. Lạc Hồng đứng sau lưng một ông lão tay run, tay cầm dùi trống."
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Cháu ngồi đi. Đêm qua cháu giúp Đình giữ được trống. Đình nợ cháu một bát nước chè."
- speaker: npc_cao_luy
  emotion: nghiem
  text: "Thưa Cụ, tôi vẫn phải hỏi. Người lạ rơi xuống, cùng đêm ấy Hắc Giao ra tới vịnh. Hai chuyện đó trùng nhau là lạ."
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Ông Cao Lũy. Sao rơi xuống đảo này đã nghìn năm. Đã có con quái nào theo sao mà ra đâu."
- speaker: npc_cao_luy
  emotion: nghiem
  text: "Bà Cả, tôi giữ đảo. Thấy hai chuyện lạ thì tôi phải hỏi. Hỏi xong thì tôi tin."
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Vậy hỏi đi. Cháu ở đây không ai cấm nói."
- speaker: npc_cao_luy
  emotion: nghiem
  text: "Cậu từ đâu tới? Cậu biết gì về Hắc Giao?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Tôi không nhớ mình từ đâu tới. Đêm qua là lần đầu tôi nghe tên nó."
- speaker: npc_cao_luy
  emotion: binh_thuong
  text: "Mắt không lảng. Được. Tôi ghi lại thế."
- speaker: npc_trum_kha
  emotion: lo_lang
  text: "Thưa Cụ, chuyện của Phường Đá Ngọc gấp hơn. Sáng nay thợ báo trăm bia dọc đường đều rung. Có bia nứt chân."
- speaker: npc_trum_kha
  emotion: lo_lang
  text: "Thợ Cả Thạch Sơn đi từ lúc trống chưa tắt. Ông ấy đi lên phía Hang, không nói với ai một câu."
- speaker: npc_lac_thanh
  emotion: buon
  text: "Đêm qua trống gõ đủ ba hồi, đúng giờ, đúng lời. Vậy mà sao không trả lời, chỉ có con quái trả lời."
- speaker: lachong
  emotion: buon
  text: "Bố… là con gõ. Nếu lệch là lệch ở tay con."
- speaker: npc_lac_thanh
  emotion: binh_thuong
  text: "Không lệch. Bố nghe rõ. Trống không cần gõ to, con ạ. Đêm qua con gõ đúng lúc."
- speaker: npc_doan_khang
  emotion: nghiem
  text: "Hội Đồng quyết thế này. Quân Trấn Thủ canh bến. Đền Trăng ru Bà. Phường Đá Ngọc chống bia."
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Còn Làng Vạn Lưới sáng nay báo nước bến đen như mực. Cần người đi xem. Người đi được việc đêm qua."
- speaker: lachong
  emotion: nghiem
  text: "Thưa Cụ, cháu đi. Và cháu muốn đi cùng người này."
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Người giữ Đình rời Đình là chuyện lớn đấy, cháu."
- speaker: npc_lac_thanh
  emotion: binh_thuong
  text: "Để bố giữ. Tay bố run, nhưng chưa run tới mức không giữ nổi cái cửa."
- speaker: lachong
  emotion: binh_thuong
  text: "Cảm ơn bố. Cậu khách, đêm qua cậu nói trước cho tôi biết đòn tới từ đâu. Tôi muốn được nghe thế thêm."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Vậy đi cùng nhau. Tôi cũng cần người biết đường."
- speaker: lachong
  emotion: binh_thuong
  text: "Trống còn, đảo còn. Đi thôi."
- action: join_party
  character: lachong
- speaker: he_thong
  emotion: binh_thuong
  text: "Lạc Hồng đã nhập đội"
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trước cửa Đình, một tấm bảng gỗ dán kín giấy. Giấy nào cũng viết tay, nét to nét nhỏ."
- speaker: lachong
  emotion: binh_thuong
  text: "Bảng Ủy thác. Dân đảo cần ai giúp việc gì thì dán ở đây. Làm xong, người nhờ trả công bằng Xu."
- speaker: mailinh
  emotion: vui
  text: "Mỗi ngày tớ đọc một lượt. Có hôm người ta nhờ tìm con gà, có hôm nhờ đánh trại quái. Vui lắm!"
- speaker: lachong
  emotion: binh_thuong
  text: "Hôm nay để sau. Vạn Lưới trước. Từ đây đi theo bờ sông xuống là tới."
- action: give_reward
  reward: c1_01
- action: complete_quest
  quest: c1_01
- action: start_quest
  quest: c1_02
```

---

## c1_02: Nước Đen Ở Bến Vạn Lưới

**Mục tiêu:** "Đến bến Làng Vạn Lưới." → "Đánh lui Bóng Cặn." → "Nói chuyện với ông Neo."

```yaml
- action: move_camera
  to: lang_van_luoi_ben
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Làng Vạn Lưới nằm ở cửa Sông Sương. Lưới phơi kín bãi. Nhưng sáng nay không ai vá lưới. Cả làng đứng nhìn ra bến."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Nước bến đen như mực, đặc sệt, không gợn sóng. Mấy chiếc thuyền con nằm im như bị giữ chân."
- speaker: npc_tam_lua
  emotion: lo_lang
  text: "Người giữ Đình tới rồi. Sáng nay nước đen từ ngoài vịnh lấn vào. Có thứ gì bò lên theo nước."
- speaker: suongmai
  emotion: nghiem
  text: "Báo cáo: ba hình người bằng nước đen trên bến. Không có mặt. Chúng đang… nói."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Những hình người ấy đứng lắc lư. Từ chỗ đáng lẽ là miệng, có tiếng thì thầm rời rạc."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "“Mong mùa sau được cá…” “Mong mẹ khỏi ho…” “Mong nó quay đầu nhìn tôi một lần…”"
- speaker: mailinh
  emotion: lo_lang
  text: "Chúng nói lời ước. Lời ước của người ta."
- speaker: lachong
  emotion: nghiem
  text: "Dân gọi chúng là Bóng Cặn. Ông bà kể Mùa Nước Đen ngày xưa chúng bò lên khắp đảo. Tôi chưa từng thấy tận mắt."
- speaker: lachong
  emotion: binh_thuong
  text: "Chúng là nước. Lửa của tôi và Mai Linh làm chúng bốc hơi. Đừng để chúng tới gần nhà."
- start_battle:
    enemies: [bong_can, bong_can, bong_can]
    on_win: c102_sau_tran
- label: c102_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Bóng Cặn cuối cùng tan ra, thành vũng nước trong vắt. Trong vũng ấy, một lúc còn vọng nửa câu: “…mong nó quay đầu…”"
- speaker: bachvu
  emotion: buon
  text: "Lạ thật. Đánh xong mà không thấy vui. Giống như vừa bịt miệng ai đó."
- speaker: npc_hai_khoac
  emotion: vui
  text: "Hay! Hay! Tôi biết mà, tôi đã bảo cả làng là người từ trên sao rơi xuống thì đánh giỏi!"
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Hai Khoác, sáng nay chính anh chạy trước nhất đấy."
- speaker: npc_hai_khoac
  emotion: ngai
  text: "Tôi chạy… đi báo tin. Báo tin cũng là việc lớn."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ở đầu bến, ông lão râu muối tiêu đang kéo một đứa bé ra khỏi mép nước đen, mắng nó bằng giọng khàn."
- speaker: npc_lao_neo
  emotion: gian
  text: "Đã bảo không ra bến! Nước này không phải nước để chơi! Về nhà, bảo mẹ đóng cửa lại!"
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đứa bé chạy đi. Ông Neo đứng lại, lau tay vào vạt áo rất lâu, dù tay không ướt."
- speaker: suongmai
  emotion: binh_thuong
  text: "Dạ, ông Neo. Cháu là Sương Mai. Ông có sao không ạ?"
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Không sao. Mày đeo cái móc câu ấy vẫn chưa tháo à."
- speaker: suongmai
  emotion: buon
  text: "Dạ. Cháu chưa ạ."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Ừ. Đừng tháo."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Còn người lạ. Đêm qua thằng bé gõ trống bảo cậu ước một câu là sao trả lời ngay. Thật không?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Thật. Tôi cũng không hiểu vì sao."
- speaker: npc_lao_neo
  emotion: nghiem
  text: "Vậy tôi hỏi cậu một câu. Cậu ước cho người chết trở về được không?"
- choice:
    - text: "Tôi không biết."
      goto: c102_khong_biet
      set_flag: c1_tra_loi_neo=khong_biet
    - text: "Không. Nhưng tôi nghe được."
      goto: c102_nghe
      set_flag: c1_tra_loi_neo=nghe
- label: c102_khong_biet
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Không biết. Ừ. Sao cũng không biết. Mười một năm nay tôi hỏi, nó cũng chỉ im."
- goto: c102_tiep
- label: c102_nghe
- speaker: npc_lao_neo
  emotion: ngac_nhien
  text: "Nghe được. Hừ. Cả làng này nghe tôi kể chuyện thằng con mười một năm rồi. Nghe thì được gì."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "…Thôi. Cậu thật thà. Tôi không ghét người thật thà."
- label: c102_tiep
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Đi đi. Bến này làng tự giữ được. Người giữ Đình về giữ cái trống của mình đi."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ông Neo quay vào làng. Trên vai ông có một vệt nước đen đã khô, như ai vừa vác thứ gì ướt."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Chú tôi đấy. Đừng để bụng."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một người áo sẫm ngồi trên mái nhà sàn, ngọn đèn sét tắt trong tay, mắt nhắm như vừa ngủ dậy."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Minh Khải. Đi săn đêm. Đêm qua tôi thấy một thuyền không đèn chạy lên phía bắc, về phía Hang."
- speaker: lachong
  emotion: nghiem
  text: "Đêm Tết, thuyền không đèn đi về phía Hang? Cậu có thấy ai trên thuyền không?"
- speaker: minhkhai
  emotion: binh_thuong
  text: "Không. Đèn tắt. Nghe đi. Tiếng mái chèo đều, người quen sông. Chỉ thế."
- speaker: lachong
  emotion: binh_thuong
  text: "Thợ Cả Thạch Sơn cũng lên phía Hang. Ta lên đó. Cảm ơn cậu."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Không cần cảm ơn. Lên đó trước khi tối."
- speaker: npc_hai_khoac
  emotion: vui
  text: "Người sao rơi ơi, xong việc thì quay lại! Tôi có chuyện con cá to nhất vịnh muốn kể!"
- action: give_reward
  reward: c1_02
- action: complete_quest
  quest: c1_02
- action: start_quest
  quest: c1_03
```

---

## c1_03: Hai Ổ Lõi Trống

**Mục tiêu:** "Lên phía bắc tìm Thạch Sơn." → "Đánh lui Hộ Vệ Đá Cổ." → "Xem Bia Đông và Bia Tây."

```yaml
- action: move_camera
  to: hang_hac_giao_loi_vao
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đường lên phía bắc dốc dần, cây thưa dần. Dưới chân núi là miệng hang tối, gió thổi ra lạnh và mặn."
- speaker: npc_cai_ton
  emotion: nghiem
  text: "Đứng lại! À, người giữ Đình. Quan Trấn Thủ có dặn. Mời qua, nhưng đừng xuống sâu."
- speaker: lachong
  emotion: binh_thuong
  text: "Cai Tôn, đêm qua anh có thấy thuyền không đèn cập vào đây không?"
- speaker: npc_cai_ton
  emotion: ngai
  text: "Đêm qua… là đêm Tết. Bọn tôi có nồi bánh. Tôi nghe tiếng nước, tưởng cá quẫy."
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Nhưng sáng nay Thợ Cả lên, đứng ở Bia Đông từ lúc mặt trời chưa mọc. Ông ấy chưa nói câu nào."
- action: move_camera
  to: bia_dong
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Bên trái miệng hang là một phiến đá cổ cao gấp đôi người, mặt khắc kín chữ. Giữa ngực bia có một hốc tròn. Hốc trống."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một người đàn ông vai rộng ngồi bệt trước bia, tay đặt lên mép hốc, như người ta đặt tay lên trán người ốm."
- speaker: thachson
  emotion: binh_thuong
  text: "Người giữ Đình. Mai Linh. Sương Mai. Và người lạ đã làm Bia Đá Dốc Cát sáng lại."
- speaker: thachson
  emotion: binh_thuong
  text: "Tôi là Thạch Sơn. Tôi chưa cảm ơn cậu. Bia ấy tắt từ năm tôi chưa đủ tay khắc."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Tôi chỉ chạm vào thôi. Còn cái hốc này là gì?"
- speaker: thachson
  emotion: nghiem
  text: "Chỗ để lõi sao. Mỗi Bia Đá cổ có một lõi. Bốn lõi giữ cho cửa hang đóng."
- speaker: thachson
  emotion: buon
  text: "Ba năm trước, năm 1347, lõi Bia Đông và Bia Tây mất cùng một đêm. Tôi báo Hội Đồng. Hội Đồng bảo giữ kín, kẻo cả đảo hoảng."
- speaker: lachong
  emotion: gian
  text: "Ba năm? Ba năm cả Đình gõ trống mà không ai nói với tôi?"
- speaker: thachson
  emotion: binh_thuong
  text: "Tôi đã muốn nói. Tôi không phải người giỏi chọn lời. Tôi chỉ giỏi chọn đá."
- speaker: thachson
  emotion: binh_thuong
  text: "Hai bia còn lõi vẫn giữ được cửa. Đến đêm qua. Đêm qua hai lõi còn lại cũng rung, như bị kéo."
- speaker: suongmai
  emotion: nghiem
  text: "Báo cáo: ở chân Bia Tây có vết chân ướt. Nước đen. Và…"
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Dưới chân Bia Tây có mấy mảnh dăm gỗ mỏng, cong như vỏ bào. Gỗ sung, còn thơm nhựa."
- speaker: suongmai
  emotion: binh_thuong
  text: "…Và dăm gỗ. Có người đẽo gỗ ở đây. Không có gì để báo cáo thêm."
- speaker: mailinh
  emotion: binh_thuong
  text: "Sương Mai, cậu nói nhanh quá. Bình thường cậu báo cáo dài lắm cơ mà."
- speaker: suongmai
  emotion: binh_thuong
  text: "Rõ. Lần sau tôi báo dài."
- action: play_sfx
  id: da_rung
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Mặt đất rung. Từ trong hang, một khối đá to lừ lừ bước ra, trên vai khắc những nét giống hệt nét trên Bia Đông."
- speaker: thachson
  emotion: ngac_nhien
  text: "Hộ Vệ Đá Cổ. Người xưa khắc nó ra để giữ cửa. Nó chỉ thức khi cửa hang yếu."
- speaker: thachson
  emotion: nghiem
  text: "Nó không ác. Nó chỉ không phân biệt được ai đến cứu, ai đến phá. Đánh cho nó ngủ lại, đừng đánh vỡ."
- speaker: thachson
  emotion: binh_thuong
  text: "Cho tôi đi cùng đội cậu. Đá thì tôi biết chỗ nào gõ là nó nghe."
- action: join_party
  character: thachson
- speaker: he_thong
  emotion: binh_thuong
  text: "Thạch Sơn đã nhập đội"
- speaker: thachson
  emotion: binh_thuong
  text: "Khiên ngọc của tôi che được cả đội. Khi nó giơ tay, gọi tôi trước."
- start_battle:
    enemies: [golem]
    on_win: c103_sau_tran
- label: c103_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Hộ Vệ Đá Cổ khuỵu xuống, ngồi im như một tảng đá bên đường. Nét khắc trên vai nó mờ dần, rồi sáng nhè nhẹ, đều như hơi thở ngủ."
- speaker: thachson
  emotion: binh_thuong
  text: "Nó ngủ rồi. Tốt. Khắc chậm thì nhớ lâu. Người khắc nó ngày xưa khắc rất chậm."
- speaker: bachvu
  emotion: vui
  text: "Mình đặt tên cho nó nhé. Ông Ngồi. Vì nó ngồi suốt."
- speaker: thachson
  emotion: binh_thuong
  text: "Nó có tên rồi. Nhưng gọi Ông Ngồi cũng được. Nó không phiền."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Ai đã lấy lõi? Và lấy để làm gì?"
- speaker: thachson
  emotion: nghiem
  text: "Tôi không biết ai. Nhưng người ấy biết bia. Biết chỗ cạy mà không làm vỡ nét khắc. Người ngoài đảo không làm được."
- speaker: lachong
  emotion: nghiem
  text: "Người trên đảo. Người quen sông, như Minh Khải nói."
- speaker: thachson
  emotion: binh_thuong
  text: "Muốn hiểu cửa hang yếu đến đâu, phải hỏi người nghe được đáy nước. Đền Trăng."
- speaker: mailinh
  emotion: lo_lang
  text: "Đêm qua Thủy Nguyệt bảo Bà đang đau. Ta qua Hồ Gương đi."
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Đi cẩn thận. Tôi sẽ không ăn bánh lúc gác nữa. Tôi hứa."
- action: give_reward
  reward: c1_03
- action: complete_quest
  quest: c1_03
- action: start_quest
  quest: c1_04
```

---

## c1_04: Chuông Bạc Lạc Nhịp

**Mục tiêu:** "Đến Đền Trăng bên Hồ Gương." → "Giữ bờ hồ trong lúc Thủy Nguyệt ru Bà." → "Nghe Bà Cả kể."

```yaml
- action: set_time
  to: chieu
- action: move_camera
  to: ho_guong
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Hồ Gương nằm giữa đảo, phẳng đến mức chim bay qua thấy cả bóng mình. Chiều nay mặt hồ gợn những vòng tròn nhỏ, từ đáy lên."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trên bậc đá Đền Trăng, Thủy Nguyệt quỳ, tay cầm chuông bạc. Mỗi tiếng chuông đều, nhưng cứ ba tiếng lại lệch một."
- speaker: thuynguyet
  emotion: met
  text: "Cậu tới rồi. Tôi đã ru Bà từ đêm qua tới giờ. Bà ngủ được một lúc lại trở mình."
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Người từ Bãi Sao Rơi. Ta là Thu Vọng, Bà Cả của Đền Trăng. Sương Mai báo cáo về cậu tới hai lần."
- speaker: suongmai
  emotion: nghiem
  text: "Rõ. Viết hai lần là theo lệnh Bà Cả ạ."
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Ta biết, cháu. Ta tin cả hai lần."
- speaker: lachong
  emotion: nghiem
  text: "Thưa Bà Cả, hai lõi Bia Đá cổ đã mất từ ba năm trước. Cửa hang đang yếu. Đền Trăng có biết không ạ?"
- speaker: npc_thu_vong
  emotion: buon
  text: "Biết. Bà Khơi trở mình nhiều hơn từ năm ấy. Ta tưởng ru thêm là đủ."
- action: play_sfx
  id: nuoc_soi
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Mép hồ sủi lên. Nước trong bỗng có những sợi đen như mực loang. Từ đó, Bóng Cặn đứng dậy."
- speaker: thuynguyet
  emotion: lo_lang
  text: "Không được. Hồ Gương chưa bao giờ đen. Nếu tôi ngừng chuông bây giờ, Bà sẽ thức hẳn."
- speaker: nguoi_uoc_nguyen
  emotion: nghiem
  text: "Cậu cứ rung chuông. Bọn tôi giữ bờ."
- speaker: thachson
  emotion: binh_thuong
  text: "Tôi đứng trước. Khiên ngọc che được tiếng chuông khỏi bị cắt ngang."
- start_battle:
    enemies: [bong_can, bong_can, bong_can, bong_can, slime]
    on_win: c104_sau_tran
- label: c104_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Tiếng chuông cuối kéo dài. Mặt hồ phẳng lại. Những sợi đen chìm xuống, mờ dần."
- speaker: thuynguyet
  emotion: met
  text: "Bà ngủ rồi. Cảm ơn cậu. Nước lặng thì nghe được. Lúc nãy tôi nghe được Bà."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bà nói gì?"
- speaker: thuynguyet
  emotion: buon
  text: "Bà không nói được thành lời. Chỉ là một cảm giác nặng. Giống như ôm một bao cát ướt rất lâu, mà không được đặt xuống."
- speaker: npc_thu_vong
  emotion: nghiem
  text: "Đã đến lúc kể cho các cháu biết. Đền Trăng gọi nước đen ấy là Nguyện Cặn."
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Người ước, sao nghe thì lời ước bay lên. Sao không nghe, lời ước không biến mất. Nó nặng xuống, chìm qua đất, chảy ra Biển Lặng."
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Bà Khơi nuốt những lời ấy, đã bao nhiêu đời người, để biển còn trong cho thuyền đi."
- speaker: mailinh
  emotion: ngac_nhien
  text: "Vậy Bóng Cặn nói lời ước là vì… chúng là lời ước thật ạ?"
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Đúng, cháu. Lời ước không ai nghe. Và khi Nguyện Cặn đông lại quá nhiều dưới đáy biển, nó thành một hình."
- speaker: npc_thu_vong
  emotion: nghiem
  text: "Hình ấy là Hắc Giao."
- speaker: lachong
  emotion: ngac_nhien
  text: "Hắc Giao… là lời ước? Không phải một con quái từ đâu tới?"
- speaker: npc_thu_vong
  emotion: buon
  text: "Sổ Đền Trăng ghi rằng Mùa Nước Đen năm 1046 không phải Hắc Giao đi đánh ai. Nó trồi lên để tìm người nghe. Nước đen theo nó dâng lên khắp nơi."
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Ba làng chìm vì người không biết phải nghe thế nào. Bà Khơi và Năm Người Giữ Đảo phải phong nó lại."
- speaker: bachvu
  emotion: buon
  text: "Thảo nào đánh Bóng Cặn xong mình thấy như vừa bịt miệng ai đó."
- speaker: thachson
  emotion: nghiem
  text: "Vậy kẻ lấy lõi muốn gì? Thả một đống lời ước giận dữ ra biển?"
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Ta không biết. Nhưng ai mất thứ gì trên biển thì hay nghĩ rằng biển nợ mình một câu trả lời."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Bà Cả, cho cháu đi cùng họ. Ngồi ru ở đây thì Bà ngủ được một đêm. Tìm được hai lõi thì Bà ngủ được lâu hơn."
- speaker: npc_thu_vong
  emotion: binh_thuong
  text: "Đi đi. Sương Mai đã đi rồi, Đền Trăng không thiếu thêm một người. Ta ru thay cháu."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Tôi là Thủy Nguyệt. Lần này chào cho đúng. Tôi đi cùng cậu."
- action: join_party
  character: thuynguyet
- speaker: he_thong
  emotion: binh_thuong
  text: "Thủy Nguyệt đã nhập đội"
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Chuông của tôi chữa được vết thương cho đội. Nếu ai ngã, gọi tôi."
- speaker: mailinh
  emotion: vui
  text: "Đội đông thế này rồi! Sao Rơi, đi ăn gì đã. Chợ đêm Phố Vạn Đăng mở lại tối nay. Bà Tư bán Bánh Trống nướng ngon nhất đảo."
- speaker: lachong
  emotion: binh_thuong
  text: "Ừ. Chợ đêm đông, người qua lại nhiều, nghe được nhiều chuyện. Ta ghé."
- action: give_reward
  reward: c1_04
- action: complete_quest
  quest: c1_04
- action: start_quest
  quest: c1_05
```

---

## c1_05: Mặt Nạ Trắng Ở Chợ Đêm

**Mục tiêu:** "Đến chợ đêm Phố Vạn Đăng." → "Giữ đèn chợ." → "Đuổi theo kẻ đeo mặt nạ."

```yaml
- action: set_time
  to: dem
- action: move_camera
  to: pho_van_dang_cho_dem
- action: play_bgm
  id: cho_dem
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Phố Vạn Đăng về đêm sáng như được thắp từ trong ra. Đèn lồng treo kín mái, kín cột, kín cả cầu tàu ở bến buôn."
- speaker: npc_ba_tu
  emotion: vui
  text: "Mai Linh! Dẫn khách tới à? Bánh Trống vừa ra lò, ăn đi kẻo nguội. Người sao rơi thì bà cho không."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Cảm ơn bà. Thơm quá."
- speaker: npc_ba_tu
  emotion: binh_thuong
  text: "Thơm là tại bột nếp Vạn Lưới. Năm nay cá ít, nhưng nếp vẫn dẻo. Trời lấy cái này thì cho cái kia."
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Cháu Mai Linh, đèn của cháu treo đầu ngõ sáng nhất phố đấy. Ai thương nó thì châm."
- speaker: mailinh
  emotion: ngai
  text: "Bà ơi, đừng khen trước mặt khách, cháu ngại."
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Ngại gì. Khách nghe cho biết. Phố này sáng là nhờ người châm, không phải nhờ trời."
- speaker: npc_bay_song
  emotion: binh_thuong
  text: "Người giữ Đình. Đoàn Gió Nồm vừa cập bến. Ngoài khơi nước đen loang thành vệt dài, từ Vịnh Khơi kéo về phía nam."
- speaker: npc_bay_song
  emotion: nghiem
  text: "Thuyền của ta tránh được. Thuyền con của dân chài thì không. Người Đình nên biết."
- speaker: lachong
  emotion: nghiem
  text: "Cảm ơn bà Bảy Sóng. Sáng mai cháu báo Hội Đồng."
- action: play_sfx
  id: den_tat
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một dãy đèn ở cuối phố tắt phụt, rồi dãy nữa. Bóng tối lan dọc phố như ai kéo một tấm vải đen."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trong bóng tối có những chiếc mặt nạ trắng trơn, không mắt, không miệng. Một người đeo mặt nạ khắc chữ đứng giữa, tay rỏ nước đen."
- speaker: npc_mat_na_khac
  emotion: binh_thuong
  text: "Đèn là lời ước treo lên. Ước là gánh nặng. Tắt đi, các người sẽ nhẹ người."
- speaker: npc_ba_ngoan
  emotion: gian
  text: "Nhẹ người cái gì! Đèn này ta châm sáu mươi năm rồi. Đứa nào tắt thì đứa ấy thắp lại cho ta!"
- speaker: mailinh
  emotion: gian
  text: "Bà ngoại lùi lại! Sao Rơi, chúng tắt đèn phố tớ. Tớ không để yên đâu!"
- speaker: thuynguyet
  emotion: nghiem
  text: "Người khắc chữ kia dùng Nguyện Cặn. Cẩn thận, đòn của hắn mang nước đen."
- start_battle:
    enemies: [mat_na_trang, mat_na_trang, mat_na_trang, shaman]
    on_win: c105_sau_tran
- label: c105_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Pháp Sư Mặt Nạ lùi vào bóng tối rồi biến mất. Mấy kẻ mặt nạ trắng tản ra mọi ngả. Một kẻ nhỏ nhất vấp chân, chạy về phía bến."
- speaker: suongmai
  emotion: nghiem
  text: "Báo cáo: một tên chạy về bến cũ. Chân yếu, chạy không quen. Đuổi kịp được."
- tutorial: duoi_theo
  hint: "Đuổi theo kẻ đeo mặt nạ trắng, đừng để mất dấu."
- action: move_camera
  to: pho_van_dang_ben_cu
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ở cuối bến cũ, kẻ đeo mặt nạ trượt chân trên rêu, ngã ngồi. Mặt nạ trắng văng ra."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Dưới mặt nạ là một cậu trai chừng mười bảy tuổi, mặt rám nắng, tay còn vết dây lưới."
- speaker: lachong
  emotion: ngac_nhien
  text: "Út Gạo? Cậu là cháu bà Hạnh ở Vạn Lưới mà."
- speaker: npc_ut_gao
  emotion: lo_lang
  text: "Đừng bảo bà tôi. Tôi xin. Bà tôi đánh mõ cả đời, bà mà biết thì bà không đánh mõ nổi nữa."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Vì sao cậu vào hội ấy?"
- speaker: npc_ut_gao
  emotion: buon
  text: "Bố tôi đi biển không về. Năm nào tôi cũng lên Đình ước. Không sao nào trả lời. Người trong hội bảo ước là tự làm khổ mình."
- speaker: npc_ut_gao
  emotion: buon
  text: "Họ bảo tắt hết đi thì không ai phải đợi nữa. Nghe thì… nghe thì thấy nhẹ."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Ai bảo cậu thế? Người đứng đầu hội trên đảo này là ai?"
- speaker: npc_ut_gao
  emotion: lo_lang
  text: "Tôi không biết mặt. Bọn tôi gọi là Ông Gỗ, vì ông ấy đeo mặt nạ gỗ. Giọng khàn. Ông ấy hay họp ở Làng Chìm, lúc nước ròng."
- speaker: npc_ut_gao
  emotion: lo_lang
  text: "Đêm nay nước ròng. Ông ấy bảo đêm nay là đêm cuối phải họp. Rồi sẽ không phải họp nữa."
- speaker: thachson
  emotion: nghiem
  text: "Không phải họp nữa. Tức là việc sắp xong."
- speaker: suongmai
  emotion: binh_thuong
  text: "…Mặt nạ gỗ. Giọng khàn."
- speaker: mailinh
  emotion: binh_thuong
  text: "Sương Mai? Cậu biết ai à?"
- speaker: suongmai
  emotion: binh_thuong
  text: "Không. Không có gì để báo cáo. Cậu ấy thì làm sao bây giờ?"
- speaker: npc_ut_gao
  emotion: buon
  text: "Các người muốn làm gì tôi thì làm. Tôi chỉ xin đừng để bà tôi thấy tôi bị trói."
- choice:
    - text: "Giao cậu ấy cho Quân Trấn Thủ. Họ sẽ hỏi cho rõ."
      goto: c105_giao_quan
      set_flag: c1_ut_gao=giao_quan
    - text: "Đưa cậu ấy về nhà. Tự cậu ấy nói với bà."
      goto: c105_ve_nha
      set_flag: c1_ut_gao=ve_nha
- label: c105_giao_quan
- speaker: npc_cao_luy
  emotion: nghiem
  text: "Tôi nhận. Không trói. Cậu ta sẽ ngồi ở Trại Bắc tới khi nói hết những gì biết. Rồi về."
- speaker: npc_cao_luy
  emotion: binh_thuong
  text: "Cậu khách làm đúng phép. Quân Trấn Thủ ghi công. Đây là tiền thưởng của Trại."
- action: give_reward
  reward: c1_05_giao_quan
- speaker: npc_ut_gao
  emotion: buon
  text: "…Cũng được. Ít ra tôi không phải nhìn bà lúc nói."
- goto: c105_tiep
- label: c105_ve_nha
- action: move_camera
  to: lang_van_luoi_nha_ba_hanh
- speaker: npc_ba_hanh
  emotion: ngac_nhien
  text: "Gạo? Sao giờ này mới về? Ai đi với cháu thế này?"
- speaker: npc_ut_gao
  emotion: buon
  text: "Bà ơi. Cháu có chuyện phải nói. Bà ngồi xuống đã."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Út Gạo kể. Bà Hạnh nghe hết, không ngắt lời, chỉ có tay bà siết chặt cái dùi mõ."
- speaker: npc_ba_hanh
  emotion: buon
  text: "Cháu ngốc. Đợi thì khổ. Nhưng không đợi thì còn khổ hơn. Bố cháu đi rồi, cháu mà quên đợi thì ai còn đợi bố cháu nữa."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Cảm ơn cháu đưa nó về. Bà không có gì nhiều. Mấy viên Đá Sao bà nhặt ở Bãi Sao Rơi bao năm, cháu cầm lấy."
- action: give_reward
  reward: c1_05_ve_nha
- goto: c105_tiep
- label: c105_tiep
- speaker: lachong
  emotion: nghiem
  text: "Làng Chìm, lúc nước ròng, đêm nay. Phải đi ngay."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Làng Chìm nằm dưới Vịnh Khơi. Nước ròng thì lộ ra mái nhà. Người quen đường mới đi được ban đêm."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Minh Khải đi săn đêm. Cậu ấy biết đường."
- speaker: lachong
  emotion: binh_thuong
  text: "Phải. Về Vạn Lưới tìm Minh Khải."
- action: complete_quest
  quest: c1_05
- action: start_quest
  quest: c1_06
```

---

## c1_06: Nửa Lời Của Bà Lưới

**Mục tiêu:** "Tìm Minh Khải ở Vạn Lưới." → "Nghe bà Hạnh kể chuyện." → "Theo Minh Khải xuống Làng Chìm lúc nước ròng."

```yaml
- action: move_camera
  to: lang_van_luoi
- action: play_sfx
  id: mo_bao_gio
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Vạn Lưới về khuya. Tiếng mõ báo canh hai vang đều. Bà Hạnh ngồi trước hiên, dùi mõ trong tay."
- if_flag: c1_ut_gao=ve_nha
  then:
    - speaker: npc_ba_hanh
      emotion: binh_thuong
      text: "Lại là các cháu. Thằng Gạo ngủ rồi. Nó khóc một trận rồi ngủ như hồi lên năm."
  else:
    - speaker: npc_ba_hanh
      emotion: buon
      text: "Các cháu đấy à. Quan Trấn Thủ cho người báo thằng Gạo ở Trại Bắc. Bà biết rồi. Bà không trách ai."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bà ơi, bọn cháu tìm Minh Khải. Và muốn hỏi bà về Làng Chìm."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Minh Khải ra bãi từ chập tối, chắc sắp về. Ngồi đây, bà kể. Chuyện Làng Chìm phải kể từ Bà Lưới."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Ngày xưa, xưa lắm, trước cả khi có lịch, có một người đàn bà làng chài mất đứa con trai ngoài biển."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Bà ấy chèo ra khơi mười đêm liền, đêm nào cũng gọi tên con, đêm nào cũng ước một câu: mong người đi biển trở về."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Đêm thứ mười, một vì sao rơi xuống Bãi Sao Rơi. Sao chọn bà. Bà thành Hộ Tinh đầu tiên. Người ta gọi bà là Bà Lưới."
- speaker: mailinh
  emotion: vui
  text: "Cháu biết chuyện này! Bà Lưới dệt lưới bằng ánh sao, kéo được thuyền đắm lên. Năm đầu lịch Niên Sao là năm ấy."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Ừ, cháu kể đúng như sách. Nhưng các bà đánh mõ ở Vạn Lưới còn truyền nhau một câu hát. Sách không chép."
- speaker: npc_ba_hanh
  emotion: buon
  text: "“Lưới kéo trăm thuyền về bến, chẳng kéo được một người con.”"
- speaker: nguoi_uoc_nguyen
  emotion: ngac_nhien
  text: "Vậy… con trai bà ấy không về?"
- speaker: npc_ba_hanh
  emotion: buon
  text: "Không bao giờ về. Sao cho bà sức mạnh. Sao không cho bà con. Lời ước của bà chỉ được trả lời một nửa."
- speaker: thuynguyet
  emotion: nghiem
  text: "Sổ cũ nhất của Đền Trăng có ghi một dòng, chưa ai hiểu. “Nửa lời đầu tiên chìm.” Giờ tôi hiểu rồi."
- speaker: thuynguyet
  emotion: buon
  text: "Nửa lời ước không được trả lời của Bà Lưới là hạt Nguyện Cặn đầu tiên chìm xuống Biển Lặng. Từ năm một."
- speaker: lachong
  emotion: buon
  text: "Một nghìn ba trăm năm mươi năm. Lời ước nào không ai nghe thì cứ chìm xuống đó."
- speaker: lachong
  emotion: buon
  text: "Kể cả lời ước Tết năm 1340. Năm ấy tôi gõ trống. Không có sao nào rơi."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Ừ, năm ấy. Năm thằng Cò nhà ông Neo không về. Cả làng ước cho nó. Bà đánh mõ suốt đêm."
- speaker: suongmai
  emotion: buon
  text: "…"
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Nhưng bà kể không phải để các cháu buồn. Bà Lưới không được con, bà vẫn đi kéo thuyền cho con người khác. Làng này còn là nhờ thế."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Ai mất gì trên biển thì nhớ câu ấy. Không được cái mình ước, vẫn gánh được cái người khác ước."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Bà Hạnh. Các cậu. Tôi nghe hết rồi. Nước ròng sắp tới đáy. Muốn xuống Làng Chìm thì đi bây giờ."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Tôi dẫn. Đèn của tôi soi được dưới nước đen. Đi sau tôi, bước vào chỗ tôi bước."
- action: join_party
  character: minhkhai
  temporary: true
- action: move_camera
  to: lang_chim
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Nước rút xa. Dưới đáy Vịnh Khơi lộ ra những mái nhà phủ hà, những bậc thềm phủ rong. Ba làng chìm từ Mùa Nước Đen nằm im trong bùn."
- speaker: bachvu
  emotion: buon
  text: "Mình đi khắp nơi rồi, chưa thấy làng nào nằm dưới biển. Ở đây yên quá. Yên kiểu không ai muốn yên."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Giữa quảng trường cũ có một vòng đá kê làm ghế. Trên mỗi ghế là một chiếc mặt nạ trắng đã bỏ lại."
- speaker: thachson
  emotion: nghiem
  text: "Chỗ họp. Đếm được mười hai mặt nạ. Ghế đầu trống, nhưng có dăm gỗ sung. Lại dăm gỗ."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Đèn tắt. Nghe đi."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đèn sét tắt. Trong bóng tối có tiếng mái chèo xa dần về phía bắc. Đều. Quen sông."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trên mặt vịnh, một chiếc thuyền không đèn trôi đi. Ở mũi thuyền có hai đốm sáng vàng nhạt, như hai viên đá còn ấm."
- speaker: thachson
  emotion: ngac_nhien
  text: "Hai lõi sao. Tôi nhận ra ánh ấy. Hắn mang chúng về phía Hang."
- speaker: minhkhai
  emotion: binh_thuong
  text: "…"
- speaker: lachong
  emotion: nghiem
  text: "Minh Khải? Cậu nhận ra tiếng chèo ấy à?"
- speaker: minhkhai
  emotion: binh_thuong
  text: "Chưa chắc. Tôi không nói khi chưa chắc."
- action: play_sfx
  id: nuoc_soi
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Bùn quanh quảng trường sôi lên. Bóng Cặn đứng dậy từ những bậc thềm cũ, nhiều hơn bất cứ lần nào."
- speaker: thuynguyet
  emotion: lo_lang
  text: "Nước đang lên lại. Bóng Cặn kéo nước theo. Phải mở đường ra trước khi Làng Chìm ngập."
- start_battle:
    enemies: [bong_can, bong_can, bong_can, bong_can, bong_can, bong_can]
    on_win: c106_sau_tran
- label: c106_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Bóng Cặn tan thành nước trong. Đội trèo lên bờ đá vừa lúc sóng đầu tiên phủ lại mái nhà cũ."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Tôi về báo Quan Trấn Thủ. Các cậu lên Hang. Đèn tôi để lại cho cậu."
- action: give_item
  item: den_set_minh_khai
  count: 1
- speaker: minhkhai
  emotion: binh_thuong
  text: "Nếu đúng là người tôi nghĩ… thì đừng để ai làm ông ấy đau. Tôi chỉ xin thế."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Tôi hứa sẽ cố."
- action: give_reward
  reward: c1_06
- action: complete_quest
  quest: c1_06
- action: start_quest
  quest: c1_07
```

---

## c1_07: Tiếng Trống Dưới Nước Đen

**Mục tiêu:** "Vào Hang Hắc Giao." → "Đánh bại Mặt Nạ Gỗ." → "Giữ chân Hắc Giao." → "Về Đình Trống Đồng."

Trận boss chia hai phần: **Mặt Nạ Gỗ** (trận người, một giai đoạn, kèm Lính Mặt Nạ Trắng) rồi **Hắc Giao bản yếu** (`hacgiao`, hai giai đoạn: Thủy, sang Lôi khi còn nửa máu; lượng máu và sát thương thấp hơn bản ở Tháp và Ch.8, cân bằng ở S19).

```yaml
- action: move_camera
  to: hang_hac_giao_bia_bac
- action: play_bgm
  id: hang_hac_giao
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trong hang, nước đen như mực, phẳng như tấm gương úp xuống. Bia Bắc đứng sâu nhất, nét khắc mờ trong hơi nước."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Cai Tôn nằm dựa vách đá, ngủ say, trên áo dính những giọt nước đen. Thở đều."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Không sao. Nguyện Cặn làm người ta buồn ngủ. Anh ấy sẽ tỉnh."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Trước Bia Bắc, một người đứng quay lưng, đeo mặt nạ gỗ sung đẽo thô. Hai lõi sao nằm dưới chân, ánh vàng chỉ còn le lói."
- speaker: npc_mat_na_go
  emotion: binh_thuong
  text: "Tới nhanh đấy. Tôi tưởng người giữ Đình phải gõ trống báo trước ba hồi rồi mới dám đi."
- speaker: lachong
  emotion: nghiem
  text: "Dừng tay. Hai lõi đó là của Bia Đông và Bia Tây. Trả lại."
- speaker: npc_mat_na_go
  emotion: binh_thuong
  text: "Trả cho ai? Cho cái bia giữ cửa? Sau cửa ấy là gì, cậu biết không?"
- speaker: npc_mat_na_go
  emotion: gian
  text: "Là lời ước. Của cả đảo này. Ba trăm năm người ta khóa chúng lại để khỏi phải nghe."
- speaker: thuynguyet
  emotion: nghiem
  text: "Thả Hắc Giao ra thì nước đen dâng lên khắp đảo. Như Mùa Nước Đen. Ông biết thế mà."
- speaker: npc_mat_na_go
  emotion: binh_thuong
  text: "Biết. Ba làng chìm. Người ta gọi là thảm họa. Tôi gọi là lần duy nhất biển chịu nói."
- speaker: suongmai
  emotion: buon
  text: "…Dạ. Ông Neo."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Người đeo mặt nạ đứng im rất lâu. Rồi ông kéo mặt nạ lên đỉnh đầu. Râu muối tiêu. Mắt đỏ vì gió."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Con bé này mắt tinh từ nhỏ. Mày biết từ bao giờ?"
- speaker: suongmai
  emotion: buon
  text: "Dạ, cháu thấy ông đẽo mặt nạ… từ hai năm trước ạ. Cháu không báo. Cháu không báo được."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Ừ. Thằng Cò cũng thế. Thấy gì cũng không mách bố."
- speaker: lachong
  emotion: buon
  text: "Ông Neo… vì sao?"
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Mười một năm trước, cậu là thằng bé gõ trống. Cả làng ước cho con tôi về. Cậu gõ đúng lắm. Sao không rơi."
- speaker: npc_lao_neo
  emotion: gian
  text: "Lời ước ấy đi đâu? Tôi đi hỏi khắp đảo. Không ai trả lời. Rồi có người ở xa trả lời tôi: nó chìm. Nó nằm trong con giao ấy."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Tôi không cần nó về. Tôi biết nó không về. Tôi chỉ muốn lời ước của cả làng cho nó được ra khỏi cái hang này."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Ông thả nó ra, nó sẽ kéo cả Vạn Lưới xuống theo. Cả những đứa bé ông vẫn mắng không cho ra bến."
- speaker: npc_lao_neo
  emotion: buon
  text: "…Thì phải đánh tôi trước đã. Tôi già, nhưng biển cho tôi mượn sức."
- action: npc_move
  npc: npc_lao_neo
  to: hang_hac_giao_bia_bac
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ông kéo mặt nạ xuống. Nước đen dâng quanh chân ông, cuộn thành sợi. Từ bóng tối, mấy kẻ mặt nạ trắng bước ra."
- start_battle:
    enemies: [mat_na_go, mat_na_trang, mat_na_trang]
    on_win: c107_sau_mat_na_go
- label: c107_sau_mat_na_go
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Mặt nạ gỗ nứt đôi, rơi xuống nước. Ông Neo quỳ một gối, thở dốc. Nước đen quanh ông rút đi."
- speaker: npc_lao_neo
  emotion: met
  text: "Đánh khá. Nhưng muộn rồi. Lõi đã thả từ lúc các người còn ở Làng Chìm."
- speaker: thachson
  emotion: ngac_nhien
  text: "Hai lõi cạn ánh rồi. Hắn dùng chút sáng cuối để làm mỏng phong ấn. Bia Bắc đang nứt."
- action: play_sfx
  id: gam_duoi_bien
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Mặt nước đen phồng lên. Một cái đầu dài, không sừng, trồi khỏi nước. Hai mắt sáng như hai ngọn đèn chìm."
- speaker: hacgiao
  emotion: binh_thuong
  text: "…mong mùa sau được cá… mong mẹ khỏi ho… mong người đi biển trở về…"
- speaker: hacgiao
  emotion: binh_thuong
  text: "…mong thằng Cò về… mong thằng Cò về…"
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Câu cuối là giọng ông Neo. Giọng của mười một năm trước, chưa khàn."
- speaker: npc_lao_neo
  emotion: ngac_nhien
  text: "…Đó là tôi. Nó giữ cả giọng tôi."
- speaker: thuynguyet
  emotion: nghiem
  text: "Nó chưa ra hẳn được. Nếu nó ra khỏi hang bây giờ, nó sẽ kéo cả vịnh theo. Phải đẩy nó về."
- speaker: lachong
  emotion: nghiem
  text: "Đội, vào vị trí. Đừng cố giết nó. Chỉ cần làm nó lùi."
- start_battle:
    enemies: [hacgiao]
    variant: chuong_1
    on_win: c107_sau_hac_giao
- label: c107_sau_hac_giao
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Hắc Giao lùi lại, sét quanh vây nó tắt dần. Nhưng nó không chìm. Nó cứ lặp đi lặp lại những lời ước, như đứa trẻ không ai dỗ."
- speaker: thuynguyet
  emotion: lo_lang
  text: "Đánh nữa chỉ làm nó đau thêm. Nó cần được ru. Một mình tôi không đủ."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Không phải một mình. Lạc Hồng, trống còn, đảo còn, đúng không?"
- speaker: lachong
  emotion: ngac_nhien
  text: "…Đúng. Minh Khải đã về báo Trại. Nếu Đình nghe được tín hiệu…"
- action: play_sfx
  id: trong_dong_xa
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Từ phía nam, rất xa, tiếng trống đồng vọng tới. Chậm. Hơi run. Nhưng đúng nhịp."
- speaker: lachong
  emotion: buon
  text: "Bố…"
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Rồi tiếng mõ của Vạn Lưới. Rồi tiếng hát từ bờ: cả làng chài đứng dọc bãi, cầm đèn, hát bài ru Bà Khơi."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Nước lặng thì nghe được. Mọi người, giúp tôi."
- tutorial: giu_nhip
  hint: "Bấm theo nhịp trống để Thủy Nguyệt rung chuông."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Chúng tôi nghe thấy rồi. Mọi lời. Chúng tôi sẽ nhớ."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Hắc Giao im. Hai đốm sáng nhìn Người Ước Nguyện rất lâu. Rồi cái đầu dài chìm xuống, chậm như người ngủ thiếp."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Nước trong hang vẫn đen. Nhưng mặt nước phẳng lại, và Bia Bắc thôi nứt."
- speaker: thachson
  emotion: binh_thuong
  text: "Cửa giữ được. Chưa lâu. Hai bia mất lõi thì phải có lõi mới. Đảo này không ai làm được lõi."
- action: give_item
  item: loi_sao_can
  count: 2
- speaker: thachson
  emotion: binh_thuong
  text: "Tôi giữ hai lõi cạn này. Đá nhớ thay người. Biết đâu có nơi nào nhớ cách làm lại."
- action: npc_move
  npc: npc_cao_luy
  to: hang_hac_giao_bia_bac
- speaker: npc_cao_luy
  emotion: nghiem
  text: "Quân Trấn Thủ. Ông Neo, ông theo tôi về Trại Bắc. Không trói. Ông đi được."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Đi được."
- if_flag: c1_tra_loi_neo=nghe
  then:
    - speaker: npc_lao_neo
      emotion: binh_thuong
      text: "Người lạ. Hôm trước cậu bảo cậu nghe được. Tôi tưởng cậu nói cho sướng miệng. Hóa ra cậu nghe thật."
    - speaker: suongmai
      emotion: buon
      text: "Ông Neo, cháu sẽ lên Trại thăm ông. Cháu hứa ạ."
  else:
    - speaker: npc_lao_neo
      emotion: binh_thuong
      text: "Người lạ. Hôm trước cậu bảo không biết. Giờ thì biết rồi đấy. Người chết không về. Nhưng tiếng thì còn."
    - speaker: suongmai
      emotion: buon
      text: "Ông Neo… cháu xin lỗi vì không báo sớm ạ."
- if_flag: c1_ut_gao=ve_nha
  then:
    - speaker: npc_ut_gao
      emotion: buon
      text: "Ông Gỗ… ông Neo. Cháu ở trên bờ, cháu hát cùng bà. Cháu không tắt đèn nữa đâu."
  else:
    - speaker: npc_ut_gao
      emotion: buon
      text: "Ông Neo. Cháu khai hết rồi. Cháu không giận ông. Cháu chỉ… không muốn tắt đèn nữa."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Ừ. Đừng tắt. Đứa nào cũng thế, đừng tắt."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ông Neo đi theo Cao Lũy ra khỏi hang. Ở cửa hang, Minh Khải đứng đợi, cầm ngọn đèn đã tắt. Hai chú cháu đi cạnh nhau, không ai nói gì."
- action: fade
  to: den
- action: set_time
  to: sang
- action: move_camera
  to: dinh_trong_dong
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Sáng hôm sau, Đình Trống Đồng mở cửa sớm. Ông Lạc Thành ngồi cạnh trống, tay còn run, nhưng cười."
- speaker: npc_lac_thanh
  emotion: vui
  text: "Con gõ đúng lúc. Đêm qua bố gõ cũng đúng lúc. Hai bố con có tiến bộ."
- speaker: lachong
  emotion: vui
  text: "Bố gõ hay hơn con."
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Hội Đồng có lỗi vì giấu chuyện lõi sao ba năm. Từ nay việc lớn của đảo thì gõ trống báo cả đảo. Như lệ cũ."
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Còn cháu, người từ Bãi Sao Rơi. Đảo Lạc ghi tên cháu vào sổ Đình. Từ nay cháu là người nhà."
- action: give_reward
  reward: c1_07_ket_chuong
- speaker: he_thong
  emotion: binh_thuong
  text: "Danh vọng Đảo Lạc: Đèn Lồng"
- speaker: mailinh
  emotion: vui
  text: "Người nhà rồi nhé, Sao Rơi! Người nhà thì phải ăn chè ở nhà tớ mỗi tối rằm."
- speaker: bachvu
  emotion: binh_thuong
  text: "Sao Lạc, mình có chuyện phải nói. Lá thư mình mang theo, người nhận ở Lũng Vân. Mình đã để nó đợi quá lâu."
- speaker: bachvu
  emotion: binh_thuong
  text: "Thợ làm lõi sao, đảo này không có. Nhưng đi khắp bảy vùng thì kiểu gì cũng có người biết. Đi cùng mình chứ?"
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Bà ngủ yên rồi. Nhưng chỉ yên khi những lời dưới nước kia có người nghe. Tôi muốn biết vì sao lời ước lại chìm nhiều đến thế."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Vậy ta đi. Trước khi đi, tôi muốn thắp lại mấy ngọn đèn ở chợ đêm."
- speaker: mailinh
  emotion: vui
  text: "Để tớ châm! Ai thương nó thì châm mà."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đêm ấy Phố Vạn Đăng sáng lại từng dãy. Ở Trại Bắc, trên bậu cửa sổ, ai đó cũng đặt một ngọn đèn nhỏ."
- speaker: he_thong
  emotion: binh_thuong
  text: "Hết Chương 1: Tiếng Trống Dưới Nước Đen"
- action: complete_quest
  quest: c1_07
```

---

## Hội thoại dọc đường

Các cảnh ngắn tự chạy khi đội đi giữa hai điểm của nhiệm vụ chính (người chơi vẫn điều khiển được, lời hiện ở khung nhỏ). Chúng thuộc mạch chính, được tính vào tổng dòng thoại của chương. Mã `dd_01`–`dd_15`; thứ tự trong game theo nhiệm vụ ghi ở tên cảnh.

### dd_01: Đường từ Đình xuống Vạn Lưới (trong `c1_02`)

```yaml
- speaker: mailinh
  emotion: vui
  text: "Sao Rơi, cậu có nhớ món gì mình thích ăn không? Hay rơi xuống là quên luôn cả cái bụng?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Không nhớ. Nhưng Bánh Trống thì tôi thích rồi."
- speaker: mailinh
  emotion: vui
  text: "Vậy món đầu tiên cậu thích là món của đảo tớ. Tớ thắng Bạch Vũ một điểm."
- speaker: bachvu
  emotion: binh_thuong
  text: "Chưa chắc. Mình còn trà Lũng Vân. Đợi đấy."
- speaker: lachong
  emotion: binh_thuong
  text: "Đi đường này nhớ nhìn Bia Đá. Bia sáng thì đường an toàn. Bia tối thì đi sát nhau."
- speaker: suongmai
  emotion: binh_thuong
  text: "Báo cáo: từ hôm qua tới giờ, ba bia trên đường này đã sáng lại. Cả ba đều sau khi người này đi qua."
- speaker: lachong
  emotion: ngac_nhien
  text: "Cậu không chạm vào mà bia vẫn sáng?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Tôi không để ý. Chắc bia thích người đi bộ chậm."
```

### dd_02: Lên phía bắc (trong `c1_03`)

```yaml
- speaker: lachong
  emotion: binh_thuong
  text: "Phía bắc lạnh hơn. Gió từ núi xuống. Hồi nhỏ tôi lên đây với bố, sợ đến mức không dám nhìn miệng hang."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Giờ còn sợ không?"
- speaker: lachong
  emotion: binh_thuong
  text: "Còn. Nhưng tôi không phải đi một mình nữa."
- speaker: bachvu
  emotion: vui
  text: "Lạc Hồng nói câu đó nghe như thơ. Mình gọi cậu là Dùi Trống nhé."
- speaker: lachong
  emotion: gian
  text: "Không."
- speaker: bachvu
  emotion: vui
  text: "Vậy Dùi Trống Không. Hai chữ thêm vào cho đủ ba chữ."
- speaker: mailinh
  emotion: vui
  text: "Ha! Lạc Hồng đỏ mặt kìa."
- speaker: lachong
  emotion: binh_thuong
  text: "Đó là lửa. Hệ Hỏa thì mặt đỏ là thường."
```

### dd_03: Từ Hang về Hồ Gương (trong `c1_04`)

```yaml
- speaker: thachson
  emotion: binh_thuong
  text: "Cậu đi cạnh tôi một đoạn. Có chuyện tôi muốn hỏi."
- speaker: thachson
  emotion: binh_thuong
  text: "Lúc cậu chạm Bia Đá Dốc Cát, cậu có nghe gì không?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Có một tiếng rất khẽ. Giống như ai đó thở ra sau khi nín lâu."
- speaker: thachson
  emotion: binh_thuong
  text: "Ừ. Đá cũng nín được. Tôi khắc bia bốn mươi năm, lần đầu nghe người khác nói thế."
- speaker: thachson
  emotion: binh_thuong
  text: "Ngọc Thạch, đứa học trò của tôi ở Mỏ Ngọc, chắc sẽ muốn gặp cậu. Nó hỏi nhiều hơn tôi."
- speaker: mailinh
  emotion: vui
  text: "Ngọc Thạch đấy à? Cậu ấy từng dạy tớ gõ đá nghe tiếng. Tớ gõ trúng ngón tay."
- speaker: thachson
  emotion: binh_thuong
  text: "Nó cũng gõ trúng ngón tay. Lần đầu ai cũng thế."
```

### dd_04: Bờ Hồ Gương lúc chiều (sau trận trong `c1_04`)

```yaml
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Cậu biết không, tôi ngồi bên hồ từ năm lên mười. Hồ chưa bao giờ đen."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cậu có sợ không?"
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Sợ. Nhưng người giữ đền không được để giọng mình run. Bà nghe được giọng tôi."
- speaker: suongmai
  emotion: binh_thuong
  text: "Báo cáo: giọng cậu vừa run một chút."
- speaker: thuynguyet
  emotion: vui
  text: "Sương Mai, đừng báo cáo cái đó."
- speaker: suongmai
  emotion: binh_thuong
  text: "Rõ. Xóa khỏi báo cáo."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Cảm ơn. Cậu cũng nên ăn chút gì. Lúc đánh cậu quên thở đấy."
```

### dd_05: Phố Vạn Đăng, trước khi chợ tắt đèn (trong `c1_05`)

```yaml
- speaker: mailinh
  emotion: vui
  text: "Sao Rơi, nhìn ngọn đèn hình cá kia! Tớ làm đấy. Mắt cá là hạt cát sáng nhặt ở Bãi Sao Rơi."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Đẹp thật. Sao cậu nghĩ ra được?"
- speaker: mailinh
  emotion: binh_thuong
  text: "Bà ngoại kể chuyện Nàng Vạn Đăng. Nàng thắp đèn cho người đi biển thấy đường về. Tớ nghĩ cá cũng muốn về."
- speaker: bachvu
  emotion: binh_thuong
  text: "Lũng Vân có hội thả giấy ước theo gió. Ở đây thì treo đèn. Mỗi nơi một kiểu nói với trời."
- speaker: thachson
  emotion: binh_thuong
  text: "Nói với trời thì giống nhau. Chỉ khác nhau ở chỗ ai đứng nghe."
- speaker: lachong
  emotion: binh_thuong
  text: "Ăn đi rồi nói. Bà Tư cho bánh, để nguội là bà giận."
```

### dd_06: Từ Vạn Lưới ra Vịnh Khơi lúc nửa đêm (trong `c1_06`)

```yaml
- speaker: minhkhai
  emotion: binh_thuong
  text: "Đi sát mép đá. Bùn ở giữa ăn chân."
- speaker: mailinh
  emotion: binh_thuong
  text: "Giống cát Bãi Sao Rơi. Đảo này cái gì cũng thích ăn chân người."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Không phải ăn. Giữ. Biển giữ những gì nó thích."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cậu đi đêm một mình như thế này mỗi đêm à?"
- speaker: minhkhai
  emotion: binh_thuong
  text: "Phải. Ban ngày người ta nói nhiều quá. Ban đêm chỉ còn biển nói."
- speaker: minhkhai
  emotion: binh_thuong
  text: "Chú tôi cũng hay ra đây ban đêm. Từ năm thằng Cò mất."
- speaker: suongmai
  emotion: buon
  text: "…"
- speaker: lachong
  emotion: binh_thuong
  text: "Minh Khải, nếu cậu muốn quay về thì—"
- speaker: minhkhai
  emotion: binh_thuong
  text: "Không. Tôi đã nhận dẫn đường thì dẫn tới nơi."
```

### dd_07: Đường vào Hang lần hai (đầu `c1_07`)

```yaml
- speaker: suongmai
  emotion: binh_thuong
  text: "Người Ước Nguyện. Tôi có một việc chưa báo cáo. Nếu lát nữa đúng là người ấy, tôi sẽ báo."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cậu không cần báo với tôi. Cậu chỉ cần đứng cạnh tôi là được."
- speaker: suongmai
  emotion: binh_thuong
  text: "Rõ. Ba bước. Không, hai bước."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Nếu Hắc Giao trồi lên, đừng nhìn thẳng vào mắt nó lâu. Mắt nó kéo người ta như nước xoáy."
- speaker: thachson
  emotion: binh_thuong
  text: "Nếu bia nứt, tôi giữ bia. Các cậu giữ nhau."
- speaker: bachvu
  emotion: binh_thuong
  text: "Mình chưa từng đánh rồng. Nghĩ cũng hơi vui. Vui kiểu run tay."
- speaker: mailinh
  emotion: binh_thuong
  text: "Tớ cũng run tay. Nhưng đèn tớ không run. Đèn không biết sợ."
- speaker: lachong
  emotion: nghiem
  text: "Trống còn, đảo còn. Vào thôi."
```

### dd_08: Đình Trống Đồng, sau buổi họp (trong `c1_01`)

```yaml
- speaker: npc_lac_thanh
  emotion: binh_thuong
  text: "Cậu khách, lại đây. Đứa con tôi ít nói, nhưng nó tin ai thì tin đến cùng. Cậu đừng để nó tin uổng."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cháu sẽ cố, thưa ông."
- speaker: npc_lac_thanh
  emotion: binh_thuong
  text: "Tay tôi run từ sáu năm nay. Gõ trống không được nữa thì giữ cửa. Mỗi người một việc."
- speaker: npc_lac_thanh
  emotion: binh_thuong
  text: "Nếu có ngày nào đảo cần trống mà nó không ở nhà, tôi vẫn gõ được. Chậm thôi, nhưng gõ được."
- speaker: lachong
  emotion: binh_thuong
  text: "Bố, con đi đây."
- speaker: npc_lac_thanh
  emotion: binh_thuong
  text: "Ừ. Về rồi đấy à, bố sẽ hỏi câu ấy khi con về."
```

### dd_09: Bến Vạn Lưới, sau khi ông Neo đi (trong `c1_02`)

```yaml
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Ông Neo cộc thế thôi, chứ đứa nào trong làng ốm là ông mang cá tới đầu tiên."
- speaker: npc_tam_lua
  emotion: buon
  text: "Từ năm thằng Cò mất, ông không đi biển xa nữa. Ông chỉ đi đêm, một mình."
- speaker: mailinh
  emotion: buon
  text: "Cháu nhớ anh Cò. Anh ấy hay làm diều cho bọn cháu."
- speaker: suongmai
  emotion: binh_thuong
  text: "Diều hình con cá. Đuôi dài. Bay không cao, nhưng bay lâu."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Thôi, các cháu đi đi. Nước đen ở đây làng tự giữ. Có việc thì bà vá buồm ở bến, cứ ghé."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Cảm ơn bà. Cháu sẽ ghé."
```

### dd_10: Rời Trại Bắc (trong `c1_03`)

```yaml
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Cậu khách, cho tôi hỏi nhỏ. Sao rơi trúng người có đau không?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Tôi không nhớ. Chắc là không. Lúc tỉnh tôi chỉ thấy ấm."
- speaker: npc_cai_ton
  emotion: vui
  text: "Vậy may. Tôi định ước một ngôi sao rơi trúng bếp nhà tôi, cho bếp lúc nào cũng ấm."
- speaker: bachvu
  emotion: vui
  text: "Ước thế thì sao nó ngại lắm. Rơi trúng bếp thì ăn gì?"
- speaker: npc_cai_ton
  emotion: binh_thuong
  text: "Thì ăn bánh. Bà Tư hứa gửi bánh lên Trại. Tôi đợi mãi chưa thấy."
- speaker: mailinh
  emotion: vui
  text: "Để cháu nhắc Bà Tư! Bà quên thì cháu mang lên."
```

### dd_11: Hang Hắc Giao, sau khi ông Neo đi (trong `c1_07`)

```yaml
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Cậu nói với nó: chúng tôi nghe thấy rồi. Nó im thật. Tôi ru cả đêm không bằng một câu ấy."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Tôi chỉ nói điều mình thấy. Nó không muốn đánh. Nó muốn được nghe."
- speaker: thachson
  emotion: binh_thuong
  text: "Vậy lần sau nó trồi lên, ta phải nghe cho hết. Không phải đánh cho hết."
- speaker: lachong
  emotion: buon
  text: "Tôi đã tưởng trống không ai đáp là lỗi ở tay tôi. Hóa ra lời ước vẫn ở đó. Chỉ là chưa ai đáp."
- speaker: suongmai
  emotion: buon
  text: "Báo cáo cuối ngày: cháu… tôi đã giấu một việc hai năm. Tôi sẽ viết hết cho Bà Cả. Lần này viết một lần là đủ."
- speaker: mailinh
  emotion: binh_thuong
  text: "Sương Mai, ngày mai cậu ăn chè với tớ nhé. Báo cáo viết sau cũng được."
- speaker: suongmai
  emotion: binh_thuong
  text: "…Rõ."
- speaker: bachvu
  emotion: binh_thuong
  text: "Mình đặt tên cho đêm nay nhé. Đêm Cả Đảo Hát. Dài quá à? Thôi kệ."
```

### dd_12: Đài Đếm Sao nhìn xuống (giữa `c1_04` và `c1_05`, tùy chọn ghé Đỉnh Vọng Vân)

```yaml
- speaker: npc_ky_lam
  emotion: binh_thuong
  text: "Người từ Bãi Sao Rơi. Sổ Đài ghi đêm Tết có một sao vàng rơi, rồi một sao tím đi ngược lên. Sao tím ấy là của cậu?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Là lời ước của tôi. Sao trả lời rồi dẫn Bạch Vũ tới."
- speaker: npc_ky_lam
  emotion: nghiem
  text: "Ta đọc sao bằng tai bốn mươi năm. Chưa nghe sao nào trả lời nhanh như thế. Ta sẽ ghi lại, không ghi thêm."
- speaker: bachvu
  emotion: vui
  text: "Dì Lam, dì ghi giúp con là con tới đúng giờ nhé. Lần đầu trong đời."
- speaker: npc_ky_lam
  emotion: binh_thuong
  text: "Ghi rồi. Phong Vân đi tuần trên đỉnh, chưa về. Khi nào nó về, ta bảo nó xuống chào cậu."
- speaker: npc_ky_lam
  emotion: binh_thuong
  text: "Đi đi. Đêm nay trời trong. Trời trong thì người dưới đất nên ở gần nhau."
```

### dd_13: Mai Linh và bà ngoại (sau trận trong `c1_05`)

```yaml
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Cháu Mai Linh, lại đây bà xem tay. Có bỏng không?"
- speaker: mailinh
  emotion: ngai
  text: "Không bỏng ạ. Lửa của cháu không cắn cháu đâu bà."
- speaker: npc_ba_ngoan
  emotion: binh_thuong
  text: "Lửa không cắn, nhưng người thì cắn. Bọn mặt nạ ấy dặn tắt đèn là nhẹ người. Bà sống bảy mươi tư năm, chưa thấy ai tắt đèn mà nhẹ người."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Bà ơi, sao bà châm đèn suốt sáu mươi năm?"
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Vì có người về muộn. Không biết là ai. Châm cho người không biết tên mới là châm thật."
- speaker: mailinh
  emotion: binh_thuong
  text: "Bà lại nói câu khó hiểu rồi."
- speaker: npc_ba_ngoan
  emotion: vui
  text: "Lớn thì hiểu. Đi đi, cháu. Đèn nhà mình bà giữ."
```

### dd_14: Đường từ Làng Chìm lên Hang (trong `c1_07`)

```yaml
- speaker: lachong
  emotion: binh_thuong
  text: "Nếu đúng là người Minh Khải nghĩ, tôi không biết phải nói gì."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Không cần nói gì nhiều. Có khi chỉ cần hỏi vì sao."
- speaker: thachson
  emotion: binh_thuong
  text: "Người lấy lõi đã cạy rất khéo. Tay người ấy biết thương đá. Người thương đá thì không ác hẳn."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Người không ác hẳn vẫn làm được việc rất ác. Bà Cả bảo thế. Tôi mong lần này Bà Cả sai."
- speaker: mailinh
  emotion: binh_thuong
  text: "Sao Rơi, nếu đánh xong mà buồn thì làm sao?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Thì về nhà cậu ăn chè. Cậu hứa rồi mà."
- speaker: mailinh
  emotion: vui
  text: "Ừ! Hứa rồi."
- speaker: bachvu
  emotion: binh_thuong
  text: "Gió đổi rồi. Gió lùa vào hang. Đi nhanh lên, Sao Lạc."
```

### dd_15: Sáng hôm sau ở bến Vạn Lưới (sau `c1_07`, trước khi rời Đình)

```yaml
- speaker: npc_hai_khoac
  emotion: vui
  text: "Người sao rơi! Cả làng kể rồi. Đêm qua tôi đứng hát to nhất bãi. Hỏi Tám Lụa mà xem."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Hát to nhất thật. Sai lời nhiều nhất cũng thật."
- speaker: npc_hai_khoac
  emotion: ngai
  text: "Sai lời thì con giao vẫn nghe. Nó có chê đâu."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Nó không chê. Nó im nghe mà."
- speaker: npc_tam_lua
  emotion: binh_thuong
  text: "Nước bến trong lại một nửa rồi. Sáng nay có thuyền ra khơi gần. Lần đầu sau ba hôm."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Bà đánh mõ báo sáng sớm hơn mọi khi một khắc. Cho cả làng biết là còn sáng để mà đợi."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Bà Hạnh, cảm ơn bà đã hát. Bài ru ấy tới được tận đáy hang."
- speaker: npc_ba_hanh
  emotion: binh_thuong
  text: "Bài ru thì phải có người hát cùng mới tới được. Một người hát thì chỉ tới được cái nôi."
- speaker: mailinh
  emotion: vui
  text: "Vậy lần sau cháu hát cùng! Cháu hát dở nhưng to."
- speaker: npc_hai_khoac
  emotion: vui
  text: "To là được! Giống tôi!"
- speaker: lachong
  emotion: binh_thuong
  text: "Về Đình thôi. Cụ đợi."
- speaker: suongmai
  emotion: binh_thuong
  text: "Rõ. Tôi đi trước. Cậu giữ khoảng ba bước."
- speaker: nguoi_uoc_nguyen
  emotion: vui
  text: "Hôm qua cậu bảo hai bước mà."
- speaker: suongmai
  emotion: vui
  text: "…Hai bước. Ghi nhận."
```

## Thống kê Chương 1

Đếm bằng script tạm (không commit) theo quy tắc ở `README.md`; nhánh `if_flag` và `choice` tính mọi vế.

| Phần                | Dòng thoại |
| ------------------- | ---------- |
| c1_01               | 30         |
| c1_02               | 37         |
| c1_03               | 35         |
| c1_04               | 34         |
| c1_05               | 45         |
| c1_06               | 40         |
| c1_07               | 67         |
| Hội thoại dọc đường | 114        |
| **Tổng**            | **402**    |
