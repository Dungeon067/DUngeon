const n=`# Hạ Vy: Đặc tả ngoại hình

> Theo mẫu chủ dự án tự vẽ (S25). Bảng màu gốc nằm trong \`content/characters/havy.yaml\`: tóc xanh dương sáng (\`#4a8ff0\`), kiểu **tóc dài, mái bằng, hai lọn dài hai bên** (\`longlocks\`), áo khoác navy đậm (\`#2a3a8f\`), điểm nhấn vàng cam (\`#f2a227\`), da (\`#fbe3d6\`), mắt đỏ (\`#d9262e\`), **có áo khoác** (\`coat: true\`).
> Phong cách fantasy phi văn hóa (xem \`docs/art/pixel-chuan.md\` mục 7). Tinh thần giữ nguyên: cô gái mùa hè lại mang sức mạnh băng giá.

## 1. Tổng thể

- Cô gái 19 tuổi, tầm trung, thon, chân chắc. Dáng đứng hơi nghiêng người như đang giữ thăng bằng trên boong.
- Bản chibi pixel: đầu (tóc và mặt) chiếm khoảng 1/2 chiều cao. Khung 48×64 px, điểm neo ở chân.
- Cảm giác chung: màu nắng ấm ở viền áo, kẹp tóc và giày; màu lạnh ở tóc, áo khoác và mũi tên. Đôi mắt đỏ là điểm nóng nhất trên người.

## 2. Đầu và mặt

- **Tóc:** dài quá vai, xanh dương sáng. **Mái bằng** cắt thẳng ngang lông mày. **Hai lọn dài** rủ trước vai, dài tới ngực.
- **Phụ kiện tóc:** **hai kẹp tóc vuông màu vàng cam**, mỗi bên một cái, kẹp ở gốc hai lọn tóc.
- **Mặt:** tròn, cằm nhỏ, má hồng nhạt. Miệng nhỏ, hay cười nửa miệng.
- **Mắt:** to, **màu đỏ**, có một điểm sáng trắng ở góc trên.

## 3. Trang phục

| Lớp           | Mô tả                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| Áo khoác      | **Áo khoác dài xanh navy đậm**, dài tới gối, vạt dưới xòe như chuông. Cổ áo đứng                           |
| Viền          | **Viền tay áo và gấu áo màu vàng cam**                                                                     |
| Cúc           | **Hai cúc hình chữ X màu đỏ** trước ngực, xếp dọc                                                          |
| Quần, tất     | Quần bó hoặc tất dài màu tối (\`#272838\`)                                                                   |
| Giày          | Giày thấp cổ màu tối, **viền vàng cam** ở đế                                                               |
| Phụ kiện khác | **Dây đếm người** ở cổ tay trái: sợi dây đỏ thắt nhiều nút, có một hạt trượt được để đếm. Ống tên sau lưng |

## 4. Vũ khí

- **Hình dạng:** cung dài gần bằng người cô, hai đầu hơi cong ngược. Tay cầm quấn dây.
- **Màu:** thân cung xanh trắng như phủ sương (\`#c7e3f2\`). Khi giương thì tỏa hơi lạnh mờ.
- **Tên:** đầu tên phủ băng, bay để lại vệt tuyết nhỏ.
- **Cách cầm:** tay trái cầm cung, tay phải kéo dây. Khi lật sprite sang hướng trái, cung đổi sang tay kia cho đúng tay.

## 5. Viên ngọc nguyên tố

- Ngọc Băng hình giọt nước, cỡ đốt ngón tay cái, cài **giữa cổ áo khoác** (\`#7fe0ff\`).
- Khi cô dùng sức sao, ngọc tỏa hơi lạnh làm cổ áo đọng sương. Tinh Văn lộ ra khi mở cổ áo khoác.

## 6. Bảng màu

| Tên       | Mã HEX    | Dùng ở                      |
| --------- | --------- | --------------------------- |
| Tóc       | \`#4a8ff0\` | Tóc (theo YAML \`hair\`)      |
| Da        | \`#fbe3d6\` | Da (theo YAML \`skin\`)       |
| Áo khoác  | \`#2a3a8f\` | Áo khoác (theo YAML)        |
| Vàng cam  | \`#f2a227\` | Viền áo, kẹp tóc, viền giày |
| Mắt       | \`#d9262e\` | Mắt (theo YAML \`eye\`)       |
| Cúc chữ X | \`#e0383a\` | Hai cúc trước ngực (\`mark\`) |
| Quần, tất | \`#272838\` | Quần, tất (\`pants\`)         |
| Giày      | \`#2b2230\` | Giày (\`shoe\`)               |
| Ngọc Băng | \`#7fe0ff\` | Ngọc ở cổ áo (\`gem\`)        |
| Dây đếm   | \`#e8503a\` | Dây ở cổ tay (\`cord\`)       |
| Cung      | \`#c7e3f2\` | Thân cung (\`weaponColor\`)   |

## 7. Ba chi tiết nhận diện bắt buộc

1. **Hai kẹp tóc vuông vàng cam** trên mái tóc xanh dài có hai lọn.
2. **Áo khoác navy dài vạt xòe, viền vàng cam, hai cúc chữ X đỏ.**
3. **Dây đếm người** ở cổ tay và **ngọc Băng** ở cổ áo.

## 8. Dáng đứng và biểu cảm

- **Dáng đứng đặc trưng:** cung cầm thấp bên người, vạt áo khẽ bay, đầu nghiêng như đang mặc cả.
- **Tư thế nộ:** giương cung lên trời, vạt áo bay, xoáy tuyết quanh chân.
- **Năm biểu cảm hội thoại:**
  - **Bình thường:** cười mỉm, một tay đặt trên dây đếm người.
  - **Vui:** cười lộ răng, mắt nhắm thành hai đường cong.
  - **Giận:** phồng một bên má, chống tay lên hông, ngón trỏ giơ lên như đang đòi nợ.
  - **Buồn:** cúi mặt, ngón tay đẩy hạt trên dây đếm, miệng mím.
  - **Ngạc nhiên:** mắt đỏ mở to, hai lọn tóc bay lên.

## 9. Những gì **không** được có

- Không trang phục truyền thống nguyên bản (áo bà ba, khăn rằn, nón lá). Bản cũ có các món này đã bỏ ở S25.
- Không kẹp vỏ ốc, không mắt xanh, không tóc ngắn.
- Không váy ngắn, không hở bụng, không hở vai.
- Không cung kim loại, không nỏ, không kính ngắm.
- Không trang phục, họa tiết hay tông màu giống cung thủ hệ Băng của bất kỳ game thương mại nào. Không hoa lan tuyết làm họa tiết (dấu riêng của Tuyết Lan).
`;export{n as default};
