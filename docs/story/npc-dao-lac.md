# NPC ở Đảo Lạc

> 20 NPC có tên cho Mở đầu, Chương 1 và nhiệm vụ phụ. NPC đã có trong `docs/world/` hoặc hồ sơ nhân vật giữ nguyên tuổi, chức vị, quan hệ; NPC mới do S06 thêm đã ghi vào `docs/world/09-tu-dien.md` (mục "Bổ sung S06").
>
> **Lịch theo giờ** dùng năm khung giờ trong game: **Sáng** 5–11, **Trưa** 11–14, **Chiều** 14–18, **Tối** 18–22, **Đêm** 22–5. Trong lúc một nhiệm vụ chính đang chạy, vị trí trong kịch bản ưu tiên hơn lịch.
>
> **Ba câu bắt chuyện** là lời khi người chơi bấm nói chuyện ngoài nhiệm vụ, chạy lần lượt (lần 1, 2, 3 rồi lặp lại câu 3). Câu có `sau:` chỉ dùng sau nhiệm vụ đó.

## Bảng tóm tắt

| #   | Mã NPC         | Tên                       | Nghề, vai trò                                  | Vị trí chính                        | Nhiệm vụ liên quan                |
| --- | -------------- | ------------------------- | ---------------------------------------------- | ----------------------------------- | --------------------------------- |
| 1   | npc_doan_khang | Cụ Trưởng Đình Đoan Khang | Đứng đầu Hội Đồng Đình Trống, 81 tuổi          | Đình Trống Đồng                     | md_05, c1_01, c1_07               |
| 2   | npc_lac_thanh  | Ông Lạc Thành             | Người giữ trống đã nghỉ, bố Lạc Hồng           | Đình Trống Đồng, nhà ngang sau Đình | c1_01, dd_08, c1_07               |
| 3   | npc_thu_vong   | Bà Cả Thu Vọng            | Lãnh đạo Hội Đền Trăng, Hộ Tinh hệ Thủy đã yếu | Đền Trăng, Hồ Gương                 | c1_01, c1_04                      |
| 4   | npc_trum_kha   | Bà Trùm Kha               | Lãnh đạo Phường Đá Ngọc, thợ khắc              | Mỏ Ngọc, Đình (ngày họp)            | c1_01                             |
| 5   | npc_cao_luy    | Quan Trấn Thủ Cao Lũy     | Lãnh đạo Quân Trấn Thủ, cựu thủy thủ           | Trại Bắc, Đình (ngày họp)           | c1_01, c1_05, c1_07               |
| 6   | npc_ky_lam     | Đầu Sổ Kỳ Lam             | Lãnh đạo Người Đếm Sao                         | Đài Đếm Sao, Đỉnh Vọng Vân          | dd_12                             |
| 7   | npc_bay_song   | Bà Bảy Sóng               | Thuyền trưởng Đoàn Thuyền Buôn Gió Nồm         | Bến buôn Phố Vạn Đăng               | c1_05                             |
| 8   | npc_lao_neo    | Lão Neo                   | Ngư dân già (Mặt Nạ Gỗ, lộ ở c1_07)            | Làng Vạn Lưới; sau Ch.1: Trại Bắc   | md_05, c1_02, c1_07, np_10        |
| 9   | npc_tam_lua    | Bà Tám Lụa                | Thợ vá buồm, mẹ Hạ Vy                          | Bến Làng Vạn Lưới                   | c1_02, dd_09, np_04, np_05, dd_15 |
| 10  | npc_ba_hien    | Bà Hiền                   | Thợ chọn ngọc, mẹ Ngọc Thạch                   | Mỏ Ngọc, làng thợ mỏ                | np_08                             |
| 11  | npc_dinh_bao   | Ông Đinh Bảo              | Thợ mỏ, bố Ngọc Thạch                          | Mỏ Ngọc, đường hầm                  | np_08                             |
| 12  | npc_ba_ngoan   | Bà Ngoan                  | Thợ làm đèn lồng, bà ngoại Mai Linh            | Phố Cũ, hàng đèn                    | c1_05, dd_13, np_01, np_03        |
| 13  | npc_ut_gao     | Út Gạo                    | Ngư dân trẻ, cháu Bà Hạnh                      | Làng Vạn Lưới (hoặc Trại Bắc)       | c1_05, c1_07, np_07, np_10        |
| 14  | npc_ba_tu      | Bà Tư Bánh                | Bán Bánh Trống ở chợ đêm                       | Chợ đêm Phố Vạn Đăng                | c1_05, np_02, np_07               |
| 15  | npc_ong_sao    | Ông Sáo                   | Lái đò Sông Sương, thổi sáo                    | Bến Sông Sương                      | np_06, np_09                      |
| 16  | npc_be_sen     | Bé Sen                    | Cô bé tám tuổi, hàng xóm Bà Tư                 | Phố Vạn Đăng, Rừng Trúc Mây         | np_02                             |
| 17  | npc_ba_hanh    | Bà Hạnh                   | Người đánh mõ báo canh ở Vạn Lưới              | Làng Vạn Lưới, hiên nhà             | c1_05, c1_06, dd_15, np_09, np_10 |
| 18  | npc_cai_ton    | Cai Tôn                   | Cai lính Quân Trấn Thủ                         | Trại Bắc, cửa Hang Hắc Giao         | c1_03, dd_10, c1_07, np_07, np_10 |
| 19  | npc_thay_khiem | Thầy Đồ Khiêm             | Thầy đồ viết câu đối, dạy chữ ở Đình           | Cổng Đình Trống Đồng                | np_03                             |
| 20  | npc_hai_khoac  | Hai Khoác                 | Ngư dân thích kể chuyện                        | Bến Làng Vạn Lưới                   | c1_02, dd_15, np_05               |

Ngoài 20 NPC trên, kịch bản có người nói `npc_mat_na_khac` (Pháp Sư Mặt Nạ ở chợ đêm, quái không tên) và `npc_mat_na_go` (Lão Neo khi còn đeo mặt nạ). Hai mã này là kẻ địch, không có lịch.

## Chi tiết

```yaml
- id: npc_doan_khang
  ten: Cụ Trưởng Đình Đoan Khang
  nghe: Đứng đầu Hội Đồng Đình Trống
  vi_tri: dinh_trong_dong
  lich:
    sang: dinh_trong_dong_san
    trua: nha_doan_khang
    chieu: dinh_trong_dong_gian_chinh
    toi: dinh_trong_dong_hien
    dem: nha_doan_khang
  loi_chao:
    - "Đình mở cửa từ sáng sớm. Ai cần nói gì với Hội Đồng thì vào, đừng đứng ngoài cổng."
    - "Ta già rồi, nói chậm. Cháu nghe chậm giúp ta."
    - "sau c1_07: Giấu một chuyện ba năm nặng hơn gánh ba năm. Ta học được thế ở tuổi tám mươi mốt."
  nhiem_vu: [md_05, c1_01, c1_07]

- id: npc_lac_thanh
  ten: Ông Lạc Thành
  nghe: Người giữ trống đã nghỉ, giữ cửa Đình
  vi_tri: dinh_trong_dong
  lich:
    sang: dinh_trong_dong_canh_trong
    trua: nha_ngang_sau_dinh
    chieu: dinh_trong_dong_canh_trong
    toi: nha_ngang_sau_dinh
    dem: nha_ngang_sau_dinh
  loi_chao:
    - "Lau trống thì lau theo vòng, từ giữa ra. Như sóng."
    - "Tay tôi run, nhưng tai thì chưa. Nghe trống lệch nửa nhịp tôi vẫn biết."
    - "sau c1_07: Đêm ấy tôi gõ chậm. Nhưng không sai. Cậu nói với nó thế giúp tôi."
  nhiem_vu: [c1_01, c1_07]

- id: npc_thu_vong
  ten: Bà Cả Thu Vọng
  nghe: Lãnh đạo Hội Đền Trăng
  vi_tri: den_trang
  lich:
    sang: den_trang_bac_da
    trua: den_trang_gian_trong
    chieu: ho_guong_bo
    toi: den_trang_bac_da
    dem: den_trang_gian_trong
  loi_chao:
    - "Nói nhỏ thôi. Bà Khơi ngủ không sâu."
    - "Đền Trăng không giữ bí mật cho vui. Giữ vì có những chuyện nói ra sớm thì người ta không nghe."
    - "sau c1_04: Thủy Nguyệt đi với cháu thì ta yên tâm. Cháu đi với Thủy Nguyệt thì ta càng yên tâm."
  nhiem_vu: [c1_01, c1_04]

- id: npc_trum_kha
  ten: Bà Trùm Kha
  nghe: Lãnh đạo Phường Đá Ngọc, thợ khắc
  vi_tri: mo_ngoc
  lich:
    sang: mo_ngoc_xuong_khac
    trua: mo_ngoc_lang_tho
    chieu: mo_ngoc_xuong_khac
    toi: mo_ngoc_lang_tho
    dem: mo_ngoc_lang_tho
  loi_chao:
    - "Có việc thì nói thẳng. Phường Đá Ngọc không có thời gian cho lời vòng."
    - "Đá không biết nói dối. Người khắc đá thì có. Ta ghét loại thứ hai."
    - "sau c1_03: Hội Đồng giấu chuyện lõi sao ba năm. Ta đã nói rồi, giấu đá thì đá nứt."
  nhiem_vu: [c1_01]

- id: npc_cao_luy
  ten: Quan Trấn Thủ Cao Lũy
  nghe: Lãnh đạo Quân Trấn Thủ
  vi_tri: trai_bac
  lich:
    sang: trai_bac_san_tap
    trua: trai_bac
    chieu: hang_hac_giao_loi_vao
    toi: trai_bac
    dem: trai_bac
  loi_chao:
    - "Luật đảo áp cho cả Hộ Tinh. Ai muốn qua cửa Hang thì phải có lý do."
    - "Tôi đi biển hai mươi năm. Biển dạy tôi đếm người trước khi đếm hàng."
    - "sau c1_07: Ông Neo ăn ít, ngủ ít, nhưng nói nhiều hơn trước. Tôi coi thế là tốt."
  nhiem_vu: [c1_01, c1_05, c1_07]

- id: npc_ky_lam
  ten: Đầu Sổ Kỳ Lam
  nghe: Lãnh đạo Người Đếm Sao
  vi_tri: dai_dem_sao
  lich:
    sang: dai_dem_sao_gian_so
    trua: dai_dem_sao_gian_so
    chieu: dinh_vong_van_loi_mon
    toi: dai_dem_sao_san_thuong
    dem: dai_dem_sao_san_thuong
  loi_chao:
    - "Ta đọc sao bằng tai. Đêm nay sao nói nhỏ."
    - "Người Đếm Sao ghi lại, không đoán trước. Đoán trước là việc của người khác."
    - "Cậu đi qua thì gió đổi chiều một chút. Ta ghi vào sổ rồi."
  nhiem_vu: [dd_12]

- id: npc_bay_song
  ten: Bà Bảy Sóng
  nghe: Thuyền trưởng Đoàn Thuyền Buôn Gió Nồm
  vi_tri: pho_van_dang_ben_buon
  lich:
    sang: pho_van_dang_ben_buon
    trua: pho_van_dang_ben_buon
    chieu: thuyen_gio_nom
    toi: cho_dem_van_dang
    dem: thuyen_gio_nom
  loi_chao:
    - "Đoàn Gió Nồm cập bến ba hôm rồi đi. Có hàng cần gửi thì gửi sớm."
    - "Biển Trăm Bến rộng lắm. Đi hết đời cũng chưa cập hết bến."
    - "Con cháu gái tôi bắn cung giỏi hơn tôi chèo thuyền. Gặp nó thì đừng thách bắn."
  nhiem_vu: [c1_05]

- id: npc_lao_neo
  ten: Lão Neo
  nghe: Ngư dân già; thủ lĩnh Hội Bất Nguyện ở Đảo Lạc (Mặt Nạ Gỗ), chỉ lộ ở c1_07
  vi_tri: lang_van_luoi
  lich:
    sang: lang_van_luoi_ben
    trua: nha_lao_neo
    chieu: lang_van_luoi_ben
    toi: nha_lao_neo
    dem: khong_xuat_hien
  lich_sau_c1_07:
    sang: trai_bac_cua_so
    trua: trai_bac
    chieu: trai_bac_cua_so
    toi: trai_bac
    dem: trai_bac
  loi_chao:
    - "Đi đi. Bến không phải chỗ chơi."
    - "Lưới rách thì vá. Người rách thì không ai vá."
    - "sau c1_07: Người lạ. Ngồi đây một lát cũng được. Ngồi im thôi."
  nhiem_vu: [md_05, c1_02, c1_07, np_10]

- id: npc_tam_lua
  ten: Bà Tám Lụa
  nghe: Thợ vá buồm, mẹ Hạ Vy
  vi_tri: lang_van_luoi_ben
  lich:
    sang: lang_van_luoi_ben
    trua: lang_van_luoi_ben
    chieu: lang_van_luoi_ben
    toi: nha_tam_lua
    dem: nha_tam_lua
  loi_chao:
    - "Ngồi đi, đừng đứng che nắng của bà. Mắt bà cần nắng để xỏ kim."
    - "Buồm rách thì vá. Không vá thì gió đi qua mất."
    - "sau np_04: Gặp con bé thì nhắn là buồm vá rồi. Đừng nhắn gì thêm, nó khóc."
  nhiem_vu: [c1_02, np_04, np_05]

- id: npc_ba_hien
  ten: Bà Hiền
  nghe: Thợ chọn ngọc, mẹ Ngọc Thạch
  vi_tri: mo_ngoc_lang_tho
  lich:
    sang: mo_ngoc_bai_chon_ngoc
    trua: mo_ngoc_lang_tho
    chieu: mo_ngoc_bai_chon_ngoc
    toi: mo_ngoc_lang_tho
    dem: mo_ngoc_lang_tho
  loi_chao:
    - "Ngọc tốt thì nặng tay, ngọc giả thì ấm tay. Cậu muốn thử không?"
    - "Ông nhà tôi ít nói. Ông ấy nói bằng búa."
    - "Con gái tôi đi đâu thì đá theo đó. Cậu mà gặp nó, cẩn thận chân."
  nhiem_vu: [np_08]

- id: npc_dinh_bao
  ten: Ông Đinh Bảo
  nghe: Thợ mỏ, bố Ngọc Thạch
  vi_tri: mo_ngoc
  lich:
    sang: mo_ngoc_duong_ham
    trua: mo_ngoc_lang_tho
    chieu: mo_ngoc_duong_ham
    toi: mo_ngoc_lang_tho
    dem: mo_ngoc_lang_tho
  loi_chao:
    - "Đứng xa vách. Vách hầm này già hơn tôi."
    - "Thợ mỏ không hứa. Thợ mỏ làm rồi mới nói."
    - "sau np_08: Đèn thứ bảy còn sáng. Mỗi sáng tôi vào châm thêm dầu."
  nhiem_vu: [np_08]

- id: npc_ba_ngoan
  ten: Bà Ngoan
  nghe: Thợ làm đèn lồng, bà ngoại Mai Linh
  vi_tri: pho_cu_hang_den
  lich:
    sang: pho_cu_hang_den
    trua: nha_ba_ngoan
    chieu: pho_cu_hang_den
    toi: pho_cu_goc_hem
    dem: nha_ba_ngoan
  loi_chao:
    - "Ai thương nó thì châm. Cháu châm giúp bà ngọn đầu ngõ nhé."
    - "Đèn giấy thì mỏng, nhưng người cầm đèn thì không được mỏng."
    - "Cháu Mai Linh lại chạy đi đâu rồi? Thấy nó thì bảo về ăn cơm."
  nhiem_vu: [c1_05, np_01, np_03]

- id: npc_ut_gao
  ten: Út Gạo
  nghe: Ngư dân trẻ, cháu Bà Hạnh
  vi_tri: lang_van_luoi
  lich:
    sang: lang_van_luoi_ben
    trua: nha_ba_hanh
    chieu: lang_van_luoi_bai
    toi: nha_ba_hanh
    dem: nha_ba_hanh
  lich_neu_c1_ut_gao_giao_quan:
    ghi_chu: "Ở Trại Bắc từ sau c1_05 tới hết c1_07, sau đó theo lịch thường."
  loi_chao:
    - "Lưới hôm nay nhẹ. Cá đi đâu hết rồi."
    - "Bà tôi bảo đánh mõ phải đều tay. Tôi đánh thì cứ nhanh dần."
    - "sau c1_07: Tôi không tắt đèn nữa. Tôi thắp đèn giúp bà Ngoan mỗi tối."
  nhiem_vu: [c1_05, c1_07, np_07, np_10]

- id: npc_ba_tu
  ten: Bà Tư Bánh
  nghe: Bán Bánh Trống ở chợ đêm
  vi_tri: cho_dem_van_dang
  lich:
    sang: nha_ba_tu_bep
    trua: nha_ba_tu_bep
    chieu: cho_dem_van_dang
    toi: cho_dem_van_dang
    dem: nha_ba_tu_bep
  loi_chao:
    - "Bánh Trống vừa ra lò! Ăn lúc nóng, nguội là bà giận."
    - "Bột nếp Vạn Lưới, nhân đậu xanh. Bánh của bà đi khắp đảo."
    - "Cai Tôn lại nợ bà ba cái bánh. Cháu lên Trại thì đòi giúp."
  nhiem_vu: [c1_05, np_02, np_07]

- id: npc_ong_sao
  ten: Ông Sáo
  nghe: Lái đò Sông Sương
  vi_tri: ben_song_suong
  lich:
    sang: song_suong_tren_do
    trua: ben_song_suong
    chieu: song_suong_tren_do
    toi: ben_song_suong
    dem: ben_song_suong_lan_do
  loi_chao:
    - "Qua sông không? Ta chở. Không qua thì ngồi nghe sáo."
    - "Sông Sương sáng nào cũng có sương. Thổi một đoạn là tan."
    - "sau np_06: Bài sáo ấy ta cho cháu rồi. Cháu hát thì nhớ hát chậm."
  nhiem_vu: [np_06, np_09]

- id: npc_be_sen
  ten: Bé Sen
  nghe: Cô bé tám tuổi
  vi_tri: pho_van_dang
  lich:
    sang: dinh_trong_dong_lop_hoc
    trua: pho_van_dang
    chieu: rung_truc_may_bia_rung
    toi: pho_van_dang
    dem: khong_xuat_hien
  loi_chao:
    - "Suỵt! Anh chị có nghe con dế hát không?"
    - "Thầy Khiêm bảo chữ “sao” viết có cái mũ. Em vẽ thêm cái đuôi."
    - "sau np_02: Tách Rè hát cả đêm. Mẹ em bảo mang nó ra vườn."
  nhiem_vu: [np_02]

- id: npc_ba_hanh
  ten: Bà Hạnh
  nghe: Người đánh mõ báo canh ở Vạn Lưới
  vi_tri: lang_van_luoi_nha_ba_hanh
  lich:
    sang: lang_van_luoi_ben
    trua: lang_van_luoi_nha_ba_hanh
    chieu: lang_van_luoi_nha_ba_hanh
    toi: lang_van_luoi_nha_ba_hanh
    dem: lang_van_luoi_nha_ba_hanh
  loi_chao:
    - "Mõ báo canh thì đánh đều. Người ngủ thì yên, người thức thì biết giờ."
    - "Ngày xưa có Bà Lưới. Ngồi xuống đây, bà kể."
    - "sau np_09: Mõ mới kêu trong hơn mõ cũ. Nhưng vẫn là tiếng nhà mình."
  nhiem_vu: [c1_05, c1_06, np_09, np_10]

- id: npc_cai_ton
  ten: Cai Tôn
  nghe: Cai lính Quân Trấn Thủ
  vi_tri: trai_bac
  lich:
    sang: hang_hac_giao_loi_vao
    trua: trai_bac_bep
    chieu: hang_hac_giao_loi_vao
    toi: trai_bac
    dem: hang_hac_giao_loi_vao
  loi_chao:
    - "Đứng lại! À, người quen. Mời qua."
    - "Gác cửa Hang thì không được ngủ. Nhưng được nghĩ về bánh."
    - "sau np_07: Ai mang bánh thì qua không hỏi. Luật của tôi."
  nhiem_vu: [c1_03, c1_07, np_07, np_10]

- id: npc_thay_khiem
  ten: Thầy Đồ Khiêm
  nghe: Thầy đồ viết câu đối, dạy chữ cho trẻ ở Đình
  vi_tri: dinh_trong_dong_cong
  lich:
    sang: dinh_trong_dong_lop_hoc
    trua: dinh_trong_dong_cong
    chieu: dinh_trong_dong_cong
    toi: cho_dem_van_dang
    dem: nha_thay_khiem
  loi_chao:
    - "Chữ đẹp không bằng chữ đúng. Chữ đúng không bằng chữ có người đọc."
    - "Cháu biết chữ không? Không biết thì ta dạy. Biết rồi thì ta đố."
    - "sau np_03: Câu đối năm nay ta nhớ rồi. Câu năm sau thì chưa nghĩ ra."
  nhiem_vu: [np_03]

- id: npc_hai_khoac
  ten: Hai Khoác
  nghe: Ngư dân thích kể chuyện
  vi_tri: lang_van_luoi_ben
  lich:
    sang: vinh_khoi_mom_da
    trua: lang_van_luoi_ben
    chieu: vinh_khoi_mom_da
    toi: lang_van_luoi_ben
    dem: nha_hai_khoac
  loi_chao:
    - "Người sao rơi! Tôi kể chuyện này nghe, thật trăm phần trăm."
    - "Năm tôi mười tuổi, tôi bơi một hơi từ Vạn Lưới ra Vịnh Khơi. Không ai thấy, nhưng thật."
    - "sau np_05: Con cá hôm ấy giờ to bằng hai cái thuyền rồi. Cậu làm chứng nhé."
  nhiem_vu: [c1_02, np_05]
```
