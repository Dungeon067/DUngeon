# Mở đầu: Sao Rơi Đêm Tết

> Kịch bản đầy đủ phần Mở đầu, khoảng 15–20 phút chơi. Định dạng YAML tạm theo `docs/story/README.md`. Mã nhiệm vụ `md_01`–`md_06`, điều kiện và phần thưởng ở `bang-kiem-tra.md`.
>
> **Thời điểm:** đêm Tết Sao Rơi, đầu tháng Trống, NS 1350.
> **Hộ Tinh gặp trong mở đầu:** Mai Linh, Sương Mai, Bạch Vũ (nhập đội qua lần ước đầu tiên), Lạc Hồng (đi cùng tạm thời), Thủy Nguyệt (gặp ở cảnh cuối).
> **Đội khi hết mở đầu:** Sương Mai, Mai Linh, Bạch Vũ, khớp `startProfile` trong `content/config.yaml`.

## Nguyên tắc dựng mở đầu

- **Hướng dẫn là việc trong truyện.** Mỗi bước hướng dẫn có một lý do để nhân vật nói ra: quái chặn đường, rương lộc Tết, Bia Đá cần ánh sao. Dòng nhắc trên màn hình (`hint`) chỉ một câu ngắn, hiện khi người chơi chưa làm sau vài giây.
- **Người Ước Nguyện không chiến đấu.** Họ không có Tinh Văn. Các Hộ Tinh đi cùng nghe được ý của họ như nghe tiếng gọi trong đầu, nên người chơi "điều khiển" Hộ Tinh theo nghĩa đó. Mai Linh và Sương Mai nhận ra điều này ngay trận đầu và thấy lạ.
- **Ước nguyện không phải mua bán.** Lần ước đầu tiên là miễn phí, dùng viên Đá Sao nhặt ở hố cát. Không nhân vật nào giục người chơi ước thêm.
- **Nhịp cảm xúc:** lạ lẫm (md_01) → vui và tò mò (md_02–md_04) → hành động (md_05) → kỳ bí, lạnh gáy (md_06), rồi kết bằng một việc nhỏ ấm áp.

## Tóm tắt các phân đoạn

| Mã    | Tên                | Địa điểm                              | Hướng dẫn lồng vào                                  | Thời lượng |
| ----- | ------------------ | ------------------------------------- | --------------------------------------------------- | ---------- |
| md_01 | Hố Cát Còn Ấm      | Bãi Sao Rơi                           | Di chuyển, đánh thường, kỹ năng, đổi người, Bốc Hơi | 5 phút     |
| md_02 | Viên Đá Nguội      | Bãi Sao Rơi                           | Ước nguyện, lướt né                                 | 4 phút     |
| md_03 | Rương Lộc Tết      | Đường dốc Bãi Sao Rơi                 | Mở rương                                            | 2 phút     |
| md_04 | Bia Đá Đầu Dốc     | Đầu dốc lên Phố Vạn Đăng              | Kích hoạt Bia Đá, hồi phục, dịch chuyển             | 2 phút     |
| md_05 | Trống Đình Đêm Tết | Đình Trống Đồng                       | Nộ                                                  | 4 phút     |
| md_06 | Bóng Dưới Vịnh     | Sân Đình Trống Đồng nhìn ra Vịnh Khơi | Không (cảnh cắt)                                    | 2 phút     |

---

## md_01: Hố Cát Còn Ấm

**Mục tiêu hiện trên màn hình:** "Đi theo ánh đèn lồng."

```yaml
- action: fade
  to: den
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đêm đầu tháng Trống. Cả Đảo Lạc thức chờ tiếng trống Tết Sao Rơi."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một vệt sáng vàng xé ngang trời, rơi xuống mũi nam, nơi bãi cát đen lấp lánh như rắc vụn sao."
- action: play_sfx
  id: sao_cham_dat
- action: fade
  to: sang
- action: move_camera
  to: bai_sao_roi_ho_cat
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Giữa bãi cát đen có một hố cát trắng còn ấm. Ai đó đang nằm trong ấy."
- speaker: nguoi_uoc_nguyen
  emotion: met
  text: "…Đây là đâu?"
- speaker: nguoi_uoc_nguyen
  emotion: lo_lang
  text: "Mình là ai? Sao mình không nhớ gì cả?"
- action: npc_move
  npc: mailinh
  to: bai_sao_roi_ho_cat
- speaker: mailinh
  emotion: ngac_nhien
  text: "Ơ! Có người thật này! Tớ cứ tưởng sao rơi thì chỉ có cát sáng thôi chứ!"
- speaker: mailinh
  emotion: vui
  text: "Cậu rơi từ trên trời xuống đúng không? Tớ thấy cả vệt vàng luôn. Vậy tớ gọi cậu là Sao Rơi nhé."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Sao Rơi… Ừ, tôi cũng chẳng nhớ tên mình. Gọi vậy cũng được."
- speaker: mailinh
  emotion: vui
  text: "Tớ là Mai Linh, làm đèn lồng ở Phố Cũ. Tớ xuống đây nhặt cát sáng cho đèn Tết thì gặp cậu."
- speaker: mailinh
  emotion: binh_thuong
  text: "Đứng dậy được không? Đi theo đèn của tớ này, chỗ hố cát lún lắm."
- tutorial: di_chuyen
  hint: "Đi theo ánh đèn lồng của Mai Linh."
- action: npc_move
  npc: mailinh
  to: bai_sao_roi_mep_song
- speaker: mailinh
  emotion: vui
  text: "Đúng rồi, chầm chậm thôi. Cát ở đây ăn chân lắm, Tết nào cũng có người mất dép."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Mép sóng sủi bọt. Mấy khối nước nhầy nhụa trồi lên, ánh lên màu xanh đục."
- speaker: mailinh
  emotion: ngac_nhien
  text: "Giọt Nhầy! Đêm Tết mà chúng cũng bò lên à? Bình thường chúng sợ tiếng trống lắm."
- action: npc_move
  npc: suongmai
  to: bai_sao_roi_mep_song
- speaker: suongmai
  emotion: nghiem
  text: "Báo cáo: ba Giọt Nhầy ở mép sóng. Mai Linh, lùi lại. Người lạ, đứng sau tôi ba bước."
- speaker: mailinh
  emotion: vui
  text: "Sương Mai! Cậu được Bà Cả cử xuống xem sao rơi à?"
- speaker: suongmai
  emotion: binh_thuong
  text: "Rõ. Bà Cả bảo vệt sáng này không giống sao thường. Tôi xuống xem. Giờ thì tôi thấy rồi."
- speaker: suongmai
  emotion: nghiem
  text: "Cậu không có Tinh Văn. Cậu không đánh được. Cứ nhìn tôi đánh, đừng chạy lung tung."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Người Ước Nguyện nhìn theo một Giọt Nhầy đang nhảy tới. Trong đầu họ nghĩ: “bên trái, chém”."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Kiếm của Sương Mai vung sang trái đúng lúc ấy."
- tutorial: danh_thuong
  hint: "Bấm nút đánh để Sương Mai chém."
- start_battle:
    enemies: [slime, slime]
    on_win: md01_sau_tran_1
- label: md01_sau_tran_1
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Hai Giọt Nhầy vỡ ra thành bụi sao lấm tấm, gió biển cuốn đi."
- speaker: suongmai
  emotion: ngac_nhien
  text: "Khoan. Vừa rồi… tôi nghe thấy cậu. Không phải bằng tai. Cậu nghĩ “chém” là tay tôi chém."
- speaker: nguoi_uoc_nguyen
  emotion: ngac_nhien
  text: "Tôi cũng không biết vì sao. Tôi chỉ nghĩ thôi."
- speaker: suongmai
  emotion: nghiem
  text: "Ghi nhận. Chưa hiểu. Báo cáo sau. Còn một con to hơn đang lên, thử nghĩ ra một đòn mạnh hơn xem."
- speaker: suongmai
  emotion: binh_thuong
  text: "Kiếm của tôi gọi được nước. Cậu muốn nó cuộn lên thì cứ gọi."
- tutorial: ky_nang
  hint: "Bấm nút kỹ năng để Sương Mai gọi nước."
- start_battle:
    enemies: [slime]
    on_win: md01_sau_tran_2
- label: md01_sau_tran_2
- speaker: mailinh
  emotion: vui
  text: "Hay quá! Cho tớ thử với! Đèn của tớ bắn lửa được đấy, chỉ là bà ngoại cấm bắn trong nhà."
- speaker: suongmai
  emotion: binh_thuong
  text: "Hộ Tinh cùng một đội thì đổi chỗ nhau được trong chớp mắt. Cậu gọi tên ai, người đó bước lên."
- speaker: mailinh
  emotion: vui
  text: "Gọi tớ đi, Sao Rơi! Đúng lúc Sương Mai vừa làm ướt chúng thì gọi tớ, tớ có ý này hay lắm."
- tutorial: doi_nguoi
  hint: "Bấm vào Mai Linh trong danh sách đội để đổi người."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Thêm bốn Giọt Nhầy trồi lên. Lần này chúng xếp thành vòng, như đã quen nhau."
- speaker: suongmai
  emotion: nghiem
  text: "Tôi làm chúng ướt trước. Mai Linh, đốt sau."
- tutorial: phan_ung_boc_hoi
  hint: "Dùng Sương Mai đánh trước, rồi đổi sang Mai Linh."
- start_battle:
    enemies: [slime, slime, slime, slime]
    on_win: md01_sau_tran_3
- label: md01_sau_tran_3
- speaker: he_thong
  emotion: binh_thuong
  text: "Bốc Hơi"
- speaker: mailinh
  emotion: vui
  text: "Xèo! Thấy chưa? Nước gặp lửa là bốc hơi phụt lên, mạnh gấp mấy lần đánh thường!"
- speaker: suongmai
  emotion: binh_thuong
  text: "Người làng gọi thế là Bốc Hơi. Thủy với Hỏa đi cùng nhau thì đau hơn đi một mình."
- speaker: mailinh
  emotion: vui
  text: "Như nấu chè ấy. Bà ngoại bảo nồi nào sôi to là nồi đó ngon."
- speaker: suongmai
  emotion: binh_thuong
  text: "Không phải như nấu chè."
- speaker: mailinh
  emotion: vui
  text: "Hơi hơi giống mà."
- action: complete_quest
  quest: md_01
```

---

## md_02: Viên Đá Nguội

**Mục tiêu hiện trên màn hình:** "Xem thứ đang sáng trong hố cát."

```yaml
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Dưới đáy hố cát trắng có một viên đá nhỏ, trong như thủy tinh, bên trong còn le lói ánh vàng."
- speaker: mailinh
  emotion: ngac_nhien
  text: "Đá Sao! Tớ mới thấy trong sách thôi. Bà ngoại bảo đó là ánh sao nguội lại sau khi rơi xuống đất."
- speaker: suongmai
  emotion: binh_thuong
  text: "Người thường cầm nó thì chỉ là viên đá đẹp. Người làng hay để dành, Tết đem lên Đình ước."
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Nó ấm. Giống như nó đang chờ tôi nói gì đó."
- speaker: suongmai
  emotion: nghiem
  text: "Bà Cả có dặn: nếu người rơi xuống cầm Đá Sao mà đá ấm lên, thì để người đó ước. Tôi không hiểu. Tôi chỉ làm theo."
- speaker: mailinh
  emotion: vui
  text: "Ước đi! Ước gì cũng được. Nhưng phải nói thật lòng, sao không nghe lời nói dối đâu."
- choice:
    - text: "Tôi ước có người đi cùng tôi đêm nay."
      goto: md02_uoc
      set_flag: md_loi_uoc_dau=di_cung
    - text: "Tôi ước biết mình là ai."
      goto: md02_uoc
      set_flag: md_loi_uoc_dau=minh_la_ai
- label: md02_uoc
- tutorial: uoc_nguyen
  hint: "Giữ viên Đá Sao và nói lời ước."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Viên đá tan ra trong lòng bàn tay, thành một sợi sáng mảnh bay thẳng lên trời."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một lúc lâu không có gì. Rồi phía tây bắc, một vệt tím rạch ngang mây, cong về phía bãi biển."
- action: wish_cinematic
  star: tim
  character: bachvu
- speaker: suongmai
  emotion: ngac_nhien
  text: "Sao trả lời ngay. Chưa đếm hết mười hơi thở. Ở Đình, người ta ước cả đời chưa chắc thấy một vệt."
- speaker: mailinh
  emotion: ngac_nhien
  text: "Sao tím! Sao tím là sao trẻ. Nó không rơi xuống đâu, nó dẫn ai đó tới đây!"
- speaker: suongmai
  emotion: binh_thuong
  text: "Đúng. Sao băng không tạo ra người. Nó chỉ chỉ đường. Ai thấy sợi duyên kéo mình thì tự đi tới."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Gió chợt đổi chiều. Một bóng áo choàng lông trắng lướt xuống theo luồng gió, đáp nhẹ lên cát."
- speaker: bachvu
  emotion: vui
  text: "Ối, đúng chỗ rồi! Mình đang ngồi uống nước ở bến buôn thì thấy ngực kéo một cái, như có ai buộc dây vào."
- speaker: bachvu
  emotion: vui
  text: "Chào cả nhà. Mình là Bạch Vũ, người Lũng Vân, đi đưa thư. Còn cậu là người vừa ước phải không?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Phải. Tôi không định gọi ai tới cả, tôi chỉ nói thật lòng thôi."
- if_flag: md_loi_uoc_dau=di_cung
  then:
    - speaker: bachvu
      emotion: vui
      text: "Muốn có người đi cùng hả? Dễ thôi. Ở thuyền mây nhà mình, ai lên cùng thuyền là bạn."
  else:
    - speaker: bachvu
      emotion: binh_thuong
      text: "Muốn biết mình là ai hả? Mình không trả lời được. Nhưng tìm thì mình đi tìm cùng được."
- speaker: bachvu
  emotion: vui
  text: "Cậu rơi xuống Đảo Lạc, vậy mình gọi cậu là Sao Lạc nhé. Mai Linh gọi Sao Rơi rồi, mình phải khác chứ."
- speaker: mailinh
  emotion: gian
  text: "Tớ đặt trước!"
- speaker: bachvu
  emotion: vui
  text: "Thì cậu ấy có hai tên. Lũng Vân bọn mình ai cũng có ít nhất ba."
- action: join_party
  character: bachvu
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Từ mép rừng phi lao, một mũi tên tẩm nhựa cắm phập xuống cát, cách chân Mai Linh một gang tay."
- speaker: suongmai
  emotion: nghiem
  text: "Báo cáo: Yêu Rừng Cung Thủ, hai tên, trên gò cát. Chúng bắn theo tiếng động."
- speaker: bachvu
  emotion: binh_thuong
  text: "Sao Lạc, để mình. Thấy tên bay tới thì đừng đứng đợi, lướt sang một bên. Gió bên mình sẽ đẩy giúp."
- tutorial: luot_ne
  hint: "Bấm nút lướt khi mũi tên bay tới."
- start_battle:
    enemies: [archer, archer]
    on_win: md02_sau_tran
- label: md02_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Hai Yêu Rừng Cung Thủ vứt cung, chạy biến vào rừng phi lao."
- speaker: bachvu
  emotion: vui
  text: "Lướt đẹp đấy! Lướt hơi tốn sức, nên chỉ lướt khi cần. Ở thuyền mây ai lướt bừa là rơi xuống mây."
- speaker: mailinh
  emotion: lo_lang
  text: "Yêu Rừng thường chỉ trộm bánh thôi, có bao giờ bắn người đâu. Đêm nay lạ thật."
- speaker: suongmai
  emotion: nghiem
  text: "Ghi nhận. Đưa người lạ về Đình trước. Bà Cả và Cụ Trưởng Đình cần biết chuyện sao trả lời ngay."
- action: complete_quest
  quest: md_02
```

---

## md_03: Rương Lộc Tết

**Mục tiêu hiện trên màn hình:** "Lên dốc về Phố Vạn Đăng."

Lệ Tết Sao Rơi (bổ sung S06, ghi ở `docs/world/09-tu-dien.md`): đêm Tết, dân đảo đặt **Rương Lộc** dọc các đường dốc, trong để bánh, Xu lẻ và đồ dùng, cho người đi biển lỡ đêm về muộn. Ai nhặt được thì lấy, sang năm đặt lại một rương cho người khác.

```yaml
- action: move_camera
  to: doc_bai_sao_roi
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Bên đường dốc có một chiếc rương gỗ sơn đỏ, nắp buộc dây đay, trên dán mảnh giấy vẽ hình ngôi sao."
- speaker: mailinh
  emotion: vui
  text: "Rương Lộc! Đêm Tết nhà nào cũng đặt một cái dọc đường cho người đi biển về muộn."
- speaker: nguoi_uoc_nguyen
  emotion: ngac_nhien
  text: "Tôi lấy được thật à? Tôi đâu phải người đi biển."
- speaker: suongmai
  emotion: binh_thuong
  text: "Lệ là ai lỡ đường thì lấy. Cậu lỡ đường xa nhất đảo đêm nay."
- speaker: bachvu
  emotion: vui
  text: "Lấy đi, sang năm đặt lại một cái cho người khác là được. Ở đâu người ta cũng tính vậy cả."
- tutorial: mo_ruong
  hint: "Đến gần rương và bấm nút tương tác để mở."
- action: give_item
  item: banh_trong
  count: 3
- action: give_item
  item: xu
  count: 500
- speaker: mailinh
  emotion: vui
  text: "Bánh Trống! Bánh tròn có vân như mặt trống đấy. Cậu ăn đi, ăn vào thấy khỏe hẳn."
- speaker: suongmai
  emotion: binh_thuong
  text: "Rương lớn có khóa thường nằm gần trại quái. Rương nhỏ thì nằm khắp đảo. Ghi nhớ thế là đủ."
- speaker: bachvu
  emotion: vui
  text: "Vậy là Sao Lạc có tiền tiêu Tết rồi. Giàu hơn mình. Mình tiêu hết vào trà ở bến buôn."
- action: complete_quest
  quest: md_03
```

---

## md_04: Bia Đá Đầu Dốc

**Mục tiêu hiện trên màn hình:** "Chạm vào Bia Đá ở đầu dốc."

Đây là một trong trăm Bia Đá dọc đường do Thạch Sơn khắc (`docs/characters/thachson/`), không phải bốn Bia Đá cổ trấn Hang Hắc Giao. Tên trong game: **Bia Đá Dốc Cát**.

```yaml
- action: move_camera
  to: bia_da_doc_cat
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đầu dốc có một phiến đá xám cao ngang vai. Mặt đá khắc chòm sao và một dòng chữ nhỏ đã mờ."
- speaker: suongmai
  emotion: binh_thuong
  text: "Bia Đá. Người đi đường chạm vào để nghỉ chân. Bia nào còn ánh sao thì hồi sức cho người chạm."
- speaker: mailinh
  emotion: buon
  text: "Nhưng bia này tắt lâu rồi. Từ hồi tớ còn bé tí nó đã không sáng nữa."
- speaker: bachvu
  emotion: binh_thuong
  text: "Sao Lạc vừa nói một câu là sao trả lời. Thử chạm vào xem. Biết đâu đá cũng nghe."
- tutorial: kich_hoat_bia_da
  hint: "Đến gần Bia Đá và bấm nút tương tác."
- action: play_sfx
  id: bia_da_sang
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Các nét khắc sáng lên từng đường, như có ai thắp đèn trong lòng đá. Hơi ấm lan khắp người."
- speaker: suongmai
  emotion: ngac_nhien
  text: "Nó sáng lại. Báo cáo này tôi phải viết hai lần, kẻo Bà Cả không tin."
- speaker: mailinh
  emotion: vui
  text: "Sao Rơi ơi, bia sáng rồi thì cậu đi đâu xa cũng quay về đây được trong một hơi thở đấy!"
- speaker: suongmai
  emotion: binh_thuong
  text: "Đúng. Mọi Bia Đá đã sáng nối với nhau trên bản đồ. Mệt thì về bia, bia hồi sức cho cả đội."
- speaker: bachvu
  emotion: vui
  text: "Lũng Vân không có cái này đâu. Ở đấy muốn về nhà thì phải đợi gió."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Dưới chân bia, dòng chữ nhỏ hiện rõ: “Đá nhớ thay người.”"
- speaker: mailinh
  emotion: binh_thuong
  text: "Đó là chữ của Thạch Sơn, người khắc bia. Thạch Sơn khắc câu đó ở mọi bia."
- action: complete_quest
  quest: md_04
```

---

## md_05: Trống Đình Đêm Tết

**Mục tiêu hiện trên màn hình:** "Đến Đình Trống Đồng."

```yaml
- action: move_camera
  to: dinh_trong_dong
- action: play_bgm
  id: tet_sao_roi
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Sân Đình Trống Đồng đông nghịt người. Đèn lồng treo kín mái. Mùi Bánh Trống nướng thơm cả dốc."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Giữa sân là chiếc trống đồng lớn. Một người trẻ cầm dùi đứng cạnh, lưng thẳng, mắt nhìn trời."
- speaker: mailinh
  emotion: vui
  text: "Lạc Hồng! Năm nay Lạc Hồng gõ trống chính đấy. Sao Rơi, ra chào đi!"
- speaker: lachong
  emotion: ngac_nhien
  text: "Mai Linh, Sương Mai… và một người tôi chưa gặp. Cậu là người từ Bãi Sao Rơi?"
- speaker: nguoi_uoc_nguyen
  emotion: binh_thuong
  text: "Hình như vậy. Tôi tỉnh dậy trong hố cát, không nhớ gì trước đó."
- speaker: lachong
  emotion: binh_thuong
  text: "Tôi là Lạc Hồng, người giữ Đình. Đêm nay Tết, người lạc đường tới Đình là khách của cả đảo."
- speaker: suongmai
  emotion: nghiem
  text: "Báo cáo: người này cầm Đá Sao ước, sao trả lời trước mười hơi thở. Bia Đá Dốc Cát đã sáng lại."
- speaker: lachong
  emotion: ngac_nhien
  text: "Trước mười hơi thở…"
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Chuyện lạ thì để sáng mai, cháu Lạc Hồng ạ. Giờ lành sắp tới. Cả đảo đang đợi trống."
- speaker: lachong
  emotion: binh_thuong
  text: "Dạ, thưa Cụ. Cậu đứng cạnh tôi nhé. Tết đầu tiên trên đảo thì phải đứng gần trống."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ở góc sân, một ông lão râu muối tiêu đứng khoanh tay, không cầm dùi, không cầm đèn."
- speaker: suongmai
  emotion: binh_thuong
  text: "Dạ, cháu chào ông Neo ạ. Năm nay ông cũng lên Đình ạ?"
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Lên xem người ta ước. Năm nào cũng ước. Ước xong thì về ngủ."
- speaker: npc_lao_neo
  emotion: binh_thuong
  text: "Người lạ đấy à? Đêm biển động, đừng ra bến một mình."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Ông quay đi trước khi ai kịp đáp."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một tiếng hét vang từ cổng Đình. Yêu Rừng tràn vào từ hai phía, giật đèn, hất đổ mâm bánh."
- speaker: lachong
  emotion: gian
  text: "Đêm Tết mà dám vào tận Đình. Cụ ơi, Cụ vào trong! Sương Mai, giữ cổng phía đông!"
- speaker: lachong
  emotion: nghiem
  text: "Cậu khách. Mai Linh nói cậu chỉ huy được Hộ Tinh. Cho tôi đi cùng đội cậu một trận."
- action: join_party
  character: lachong
  temporary: true
- speaker: bachvu
  emotion: vui
  text: "Kiếm lửa lên đội rồi! Sao Lạc, lúc này mà có Sương Mai làm ướt trước thì đẹp lắm."
- start_battle:
    enemies: [goblin, goblin, goblin, archer]
    on_win: md05_dot_2
- label: md05_dot_2
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Từ bóng tối sau mái Đình, một tên Yêu Rừng to gấp đôi những tên khác vác chày gỗ bước ra."
- speaker: lachong
  emotion: nghiem
  text: "Đánh mãi thế này thì lâu. Cậu khách, cậu thấy ánh sáng tụ quanh lưỡi kiếm tôi chưa?"
- speaker: lachong
  emotion: binh_thuong
  text: "Mỗi đòn trúng là lửa gom thêm một chút. Khi đầy, gọi tên tôi. Tôi cho cậu xem chim Lạc bay."
- tutorial: no
  hint: "Khi thanh nộ của Lạc Hồng đầy, bấm nút nộ."
- start_battle:
    enemies: [goblin_lon, goblin, goblin]
    on_win: md05_sau_tran
- label: md05_sau_tran
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Vệt lửa đỏ vút qua sân như cánh chim lướt trên mặt trống. Đám Yêu Rừng tan thành bụi sao, mấy tên chạy thục mạng ra rừng."
- speaker: lachong
  emotion: met
  text: "Xong. Cảm ơn cậu. Lần đầu tôi đánh mà có người nói trước cho tôi biết đòn tới từ đâu."
- speaker: mailinh
  emotion: vui
  text: "Mâm bánh đổ hết rồi, nhưng trống còn nguyên! Gõ đi, Lạc Hồng!"
- speaker: npc_doan_khang
  emotion: binh_thuong
  text: "Giờ lành tới rồi. Cả đảo, cùng ước một lời nào."
- action: play_sfx
  id: trong_dong_tet
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Lạc Hồng giơ dùi. Tiếng trống thứ nhất lan xuống dốc, thứ hai lan ra biển, thứ ba vang tới tận Đỉnh Vọng Vân."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Cả sân cùng nói: “Mong đảo yên, mong người đi biển trở về.”"
- action: complete_quest
  quest: md_05
```

> **Ghi chú triển khai:** `goblin_lon` là biến thể to của Yêu Rừng (thêm máu, chậm hơn), cùng mô hình `goblin`. Lạc Hồng chỉ đi cùng tạm thời trong md_05; nhập đội chính thức ở `c1_01`. Nếu S11 thấy cần, có thể cho người chơi dùng nộ của Sương Mai thay cho Lạc Hồng mà không đổi lời thoại khác.

---

## md_06: Bóng Dưới Vịnh

**Mục tiêu hiện trên màn hình:** không có. Cảnh cắt.

```yaml
- action: play_sfx
  id: chuong_bac_loan
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Tiếng trống cuối chưa tắt hẳn thì từ phía Hồ Gương vọng lại tiếng chuông bạc. Không phải một tiếng. Hàng chục tiếng, dồn dập, lệch nhịp."
- speaker: suongmai
  emotion: lo_lang
  text: "Chuông Đền Trăng. Không ai rung mà nó tự kêu. Chuyện này chưa từng có trong sổ trực."
- action: npc_move
  npc: thuynguyet
  to: dinh_trong_dong
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một người mặc áo lam nhạt chạy lên bậc Đình, tay cầm chiếc chuông bạc nhỏ, tóc còn ướt sương hồ."
- speaker: thuynguyet
  emotion: lo_lang
  text: "Cụ Trưởng Đình. Bà trở mình. Mặt hồ vừa rung như có ai gõ từ dưới đáy lên."
- speaker: npc_doan_khang
  emotion: lo_lang
  text: "Thủy Nguyệt, cháu ru Bà rồi chứ?"
- speaker: thuynguyet
  emotion: buon
  text: "Cháu ru rồi ạ. Bà không ngủ lại được. Bà không giận. Bà giống như… đang đau."
- speaker: thuynguyet
  emotion: ngac_nhien
  text: "Cậu là người rơi xuống Bãi Sao Rơi phải không? Lúc vệt sao vàng rơi, chuông trong tay tôi cũng rung một tiếng."
- speaker: nguoi_uoc_nguyen
  emotion: lo_lang
  text: "Tôi không biết chuyện đó có liên quan tới tôi không."
- speaker: thuynguyet
  emotion: binh_thuong
  text: "Tôi cũng không biết. Tôi là Thủy Nguyệt, người giữ Đền Trăng. Có lẽ ta sẽ cần biết, sớm thôi."
- action: play_sfx
  id: gam_duoi_bien
- action: move_camera
  to: vinh_khoi
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Từ sân Đình nhìn ra, Vịnh Khơi đen hơn cả trời. Mặt nước phồng lên rồi lặng xuống, như một hơi thở rất dài."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Một cái bóng trườn qua dưới mặt nước. Dài hơn ba con thuyền nối nhau. Không sừng. Hai đốm sáng như hai ngọn đèn chìm."
- speaker: hacgiao
  emotion: binh_thuong
  text: "…mong… người đi biển… trở về…"
- speaker: mailinh
  emotion: lo_lang
  text: "Nó… nó nói lại lời ước của mình. Bằng giọng của cả sân vừa nãy."
- speaker: lachong
  emotion: nghiem
  text: "Hắc Giao. Ba trăm năm nó nằm yên trong hang. Đêm nay nó ra tới vịnh."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Cái bóng chìm dần. Vịnh lặng. Chỉ còn tiếng chuông bạc thưa dần rồi tắt."
- speaker: npc_doan_khang
  emotion: nghiem
  text: "Không ai ra bến đêm nay. Sáng mai, Hội Đồng họp ở Đình. Lạc Hồng, cho gõ trống báo cả đảo."
- speaker: bachvu
  emotion: binh_thuong
  text: "Mình tới đưa thư, ai ngờ gặp đúng Tết có rồng. Thôi, thư để đó đã."
- speaker: mailinh
  emotion: binh_thuong
  text: "Sao Rơi, về nhà tớ ngủ nhé. Bà ngoại có nồi chè còn ấm. Tớ treo thêm một cái đèn ngoài cửa cho sáng."
- speaker: ke_chuyen
  emotion: binh_thuong
  text: "Đêm ấy, trên phố Vạn Đăng có thêm một ngọn đèn lồng không ai bảo mà vẫn thắp."
- action: complete_quest
  quest: md_06
- action: start_quest
  quest: c1_01
```

## Thống kê

| Phân đoạn | Dòng thoại |
| --------- | ---------- |
| md_01     | 34         |
| md_02     | 27         |
| md_03     | 8          |
| md_04     | 11         |
| md_05     | 28         |
| md_06     | 19         |
| **Tổng**  | **127**    |

Số dòng đếm bằng script tạm (không commit) theo quy tắc ở `README.md`; nhánh `if_flag` tính cả hai vế. Ước lượng thời lượng: khoảng 6–7 phút đọc thoại, 8–11 phút đi đường, đánh và làm theo hướng dẫn.
