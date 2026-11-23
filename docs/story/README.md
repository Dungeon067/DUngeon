# Cốt truyện chính (S06)

Thư mục này chứa cốt truyện chính của **Tinh Tú Ước Nguyện**: dàn ý tám chương, kịch bản Mở đầu, Chương 1 tại Đảo Lạc, nhiệm vụ phụ, NPC và bảng kiểm tra để S11, S12 triển khai.

Mọi tên riêng lấy từ `docs/world/` và `docs/characters/`. Tên mới do S06 thêm đã ghi vào `docs/world/09-tu-dien.md` (mục "Bổ sung S06").

## Mục lục

| File                                               | Nội dung                                                                |
| -------------------------------------------------- | ----------------------------------------------------------------------- |
| [tong-quan-cot-truyen.md](tong-quan-cot-truyen.md) | Dàn ý Mở đầu, tám chương và đoạn kết mở                                 |
| [mo-dau.md](mo-dau.md)                             | Kịch bản Mở đầu (15–20 phút), lồng hướng dẫn chơi vào truyện            |
| [chuong-1.md](chuong-1.md)                         | Kịch bản Chương 1 "Tiếng Trống Dưới Nước Đen", 7 nhiệm vụ               |
| [nhiem-vu-phu-dao-lac.md](nhiem-vu-phu-dao-lac.md) | 10 nhiệm vụ phụ ở Đảo Lạc                                               |
| [npc-dao-lac.md](npc-dao-lac.md)                   | 20 NPC: nghề, vị trí, lịch theo giờ, câu bắt chuyện, nhiệm vụ liên quan |
| [bang-kiem-tra.md](bang-kiem-tra.md)               | Bảng mọi nhiệm vụ: mã, điều kiện mở, phần thưởng, nhân vật, địa điểm    |

## Thứ tự đọc

1. `tong-quan-cot-truyen.md` để nắm cả mạch.
2. `mo-dau.md` rồi `chuong-1.md`.
3. `nhiem-vu-phu-dao-lac.md` và `npc-dao-lac.md`.
4. `bang-kiem-tra.md` khi triển khai.

## Định dạng kịch bản tạm

Định dạng giống `docs/characters/*/nhiem-vu-nhan-vat.md` (S03–S05). S11 sẽ chuyển sang định dạng chính thức trong `content/`. Mỗi cảnh là một khối `yaml` chứa **một danh sách bước**. Mỗi bước là đúng một trong các loại sau:

| Loại bước | Trường                                                    | Ý nghĩa                                                                          |
| --------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Lời thoại | `speaker`, `emotion`, `text`                              | Một dòng thoại. Đây là đơn vị khi đếm "dòng thoại"                               |
| Hành động | `action` cùng tham số (`to`, `id`, `target`, `item`...)   | Chuyển cảnh, máy quay, âm thanh, cho đồ, mở nhiệm vụ                             |
| Hướng dẫn | `tutorial`, `hint`                                        | Bật một bước hướng dẫn trong truyện. `hint` là dòng nhắc ngắn hiện trên màn hình |
| Nhãn      | `label`                                                   | Điểm đến của `goto`                                                              |
| Nhảy      | `goto`                                                    | Chuyển đến nhãn                                                                  |
| Lựa chọn  | `choice` (danh sách `text`, `goto`, có thể có `set_flag`) | Người chơi chọn câu trả lời                                                      |
| Trận đánh | `start_battle` (`enemies`, `on_win`, có thể có `on_lose`) | Vào trận; thắng thì nhảy tới nhãn `on_win`                                       |
| Điều kiện | `if_flag`, `then`, `else`                                 | Rẽ lời thoại theo cờ đã đặt bằng `set_flag`                                      |

### Mã hành động

`fade` (`to: den` hoặc `to: sang`), `move_camera` (`to: [x, y]` hoặc `to: <mã địa điểm>`), `play_sfx` (`id`), `play_bgm` (`id`), `give_item` (`item`, `count`), `give_reward` (`reward`), `join_party` (`character`, tùy chọn `temporary: true` cho người đi cùng tạm thời), `start_quest` (`quest`), `complete_quest` (`quest`), `set_time` (`to: dem|sang|chieu`), `wish_cinematic` (`star: vang|tim|xanh`, `character`), `npc_move` (`npc`, `to`), `spawn` (`enemy`, `at`).

### Cảm xúc (`emotion`)

`binh_thuong`, `vui`, `buon`, `gian`, `ngac_nhien`, `lo_lang`, `nghiem`, `ngai`, `met`. Dòng của người kể chuyện (`speaker: ke_chuyen`) và dòng hiện chữ hệ thống (`speaker: he_thong`) dùng `binh_thuong`.

### Mã người nói

| Mã                                                                                                                | Ai                                                  |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `nguoi_uoc_nguyen`                                                                                                | Người Ước Nguyện (người chơi)                       |
| `ke_chuyen`                                                                                                       | Lời kể, chữ chạy trên màn đen                       |
| `he_thong`                                                                                                        | Chữ ngắn của trò chơi (tên nhiệm vụ, tên trận)      |
| `lachong`, `thuynguyet`, `thachson`, `suongmai`, `mailinh`, `bachvu`, `minhkhai`, `ngocthach`, `phongvan`, `havy` | Hộ Tinh, mã trùng `content/`                        |
| `npc_<mã>`                                                                                                        | NPC, mã ở `npc-dao-lac.md`                          |
| `hacgiao`                                                                                                         | Hắc Giao (chỉ là âm thanh, chữ in nghiêng trên màn) |

### Lời của Người Ước Nguyện và giới tính

Người chơi chọn giới tính. Lời thoại **không** dùng "anh", "chị", "em" với Người Ước Nguyện; chỉ dùng "cậu", "bạn", biệt danh ("Sao Rơi", "Sao Lạc") hoặc "cháu" khi người già nói. Nếu buộc phải phân giới, viết `{anh|chị}` để trò chơi thay theo lựa chọn; S06 không cần dùng chỗ nào.

### Mã nhiệm vụ

- `md_01`…`md_06`: các phân đoạn Mở đầu.
- `c1_01`…`c1_07`: nhiệm vụ chính Chương 1.
- `np_01`…`np_10`: nhiệm vụ phụ Đảo Lạc.
- Nhiệm vụ nhân vật giữ mã của S03–S05 (ví dụ `lachong_q1`).

### Cách đếm dòng thoại

Một "dòng thoại" là một bước có `speaker` khác `he_thong`. Lời của `ke_chuyen` có tính.

## Tham số bổ sung

- `start_battle` có thể có `protect: <mã NPC hoặc vật>` (nhiệm vụ hộ tống: thua nếu đối tượng này hết máu) và `variant: <mã>` (biến thể của quái, ví dụ `hacgiao` bản `chuong_1`).
- Người nói là kẻ địch: `hacgiao` (Hắc Giao), `npc_mat_na_khac` (Pháp Sư Mặt Nạ ở chợ đêm), `npc_mat_na_go` (Lão Neo khi còn đeo mặt nạ, chỉ trong `c1_07`).

## Nhân vật 5★ trong truyện

Mỗi nhân vật 5★ có nhãn `thuong-tru` hoặc `gioi-han` (danh sách và lý do: `bang-kiem-tra.md` mục 0; nhãn ở đầu `docs/characters/<id>/ho-so.md`). Truyện chính không tặng nhân vật 5★. Nhân vật 5★ thường trú chỉ được `join_party` với `temporary: true`. Nhân vật 5★ giới hạn không được `join_party`, chỉ xuất hiện như NPC hoặc khách mời.
