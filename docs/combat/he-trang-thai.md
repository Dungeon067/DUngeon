# Hệ buff, debuff và chỉ số phụ (S30)

> Trạng thái: đang cài (sau duyệt Mốc 1). Áp dụng cho mọi bộ chiêu trong `content/kits/<id>.yaml`.

## Chỉ số phụ

| Chỉ số               | Ý nghĩa                                  | Gốc                    | Khai báo                                             |
| -------------------- | ---------------------------------------- | ---------------------- | ---------------------------------------------------- |
| Tinh thông nguyên tố | Tăng hệ số phản ứng                      | 0                      | `economy.yaml game.chiSoPhu`, `kits/<id>.yaml chiSo` |
| Hồi năng lượng       | Nhân lượng năng lượng nhận được          | 100%                   | như trên                                             |
| Kháng (quái)         | Giảm sát thương theo nguyên tố và vật lý | 10% mọi loại           | `economy.yaml game.chiSoPhu.khangQuai`               |
| Phòng thủ (quái)     | Giảm sát thương, bị trừ bởi debuff       | hệ số 0,5 khi cùng cấp | công thức ở `src/combat/status.ts`                   |

- Phản ứng khuếch đại (Bốc Hơi, Tan Chảy): hệ số × (1 + 2,78 × TT / (TT + 1400)).
- Phản ứng biến đổi (Quá Tải, Điện Cảm, Siêu Dẫn, Khuếch Tán): sát thương × (1 + 16 × TT / (TT + 2000)).
- Kháng và phòng thủ được chuẩn hóa: quái chưa bị debuff nhận đúng sát thương như trước S30, nên cân bằng cũ giữ nguyên.

## Trạng thái

Danh mục ở `content/statuses.yaml`. Mỗi trạng thái có: tên, biểu tượng, loại (buff/debuff), chỉ số tác động, cách cộng.

| Cách cộng | Luật                                                                             |
| --------- | -------------------------------------------------------------------------------- |
| `lamMoi`  | Cùng trạng thái: làm mới thời gian, lấy giá trị lớn hơn                          |
| `tang`    | Cộng tầng đến `toiDa`, mỗi lần trúng làm mới thời gian                           |
| `nhom`    | Các trạng thái chung một nhóm (ví dụ mọi "tăng tấn công") chỉ tính cái mạnh nhất |

Hiển thị: buff của nhân vật đang điều khiển ở dãy biểu tượng HUD; debuff của quái thành hàng biểu tượng nhỏ trên đầu quái, kèm số tầng.

## Vai trò

| Vai trò          | Nghĩa                                                          |
| ---------------- | -------------------------------------------------------------- |
| Sát thương chính | Đứng sân lâu, ngân sách sát thương cao nhất                    |
| Sát thương phụ   | Gây sát thương khi ở ngoài sân (đèn, cọc, vùng)                |
| Hỗ trợ buff      | Tăng chỉ số đội, hồi năng lượng; sát thương được thấp hơn ±10% |
| Khống chế        | Gom, làm chậm, đóng băng                                       |
| Bảo vệ           | Khiên, giảm sát thương nhận, hồi máu                           |
