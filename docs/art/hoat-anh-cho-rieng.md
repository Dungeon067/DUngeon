# Kịch bản hoạt ảnh chờ riêng (S30, chỉ là tài liệu, chưa dựng)

Mỗi nhân vật có 1–2 hoạt ảnh chờ riêng, phát khi người chơi đứng yên quá 8–12 giây (chọn ngẫu nhiên, không lặp lại liền nhau).
Chỉ dựng sau khi mô hình VRM (S26) và hệ hoạt ảnh nền (S27) được chốt.

## Quy ước chung

- **Tên clip:** `<id>.cho1`, `<id>.cho2`. Đặt trong `kits.json` (cùng định dạng `humanoid.json` của S27: xương VRM normalized, 30 FPS, +X là trái nhân vật, +Y lên, +Z trước, Euler YXZ, gốc ở hips).
- **Khung đầu và khung cuối** trùng với tư thế đứng chờ của dáng (S27) để nối mượt với crossFade 0,25 giây. Lưng thẳng, không gập spine/chest quá mức. Lớp dáng × vũ khí của S27 vẫn cộng lên sau.
- **Ngắt ngay** khi có bất kỳ đầu vào nào (di chuyển, tấn công, đổi người). Đạo cụ phụ biến mất trong 0,15 giây bằng hiệu ứng tan nhỏ, không văng ra.
- **Vải và tóc:** dùng hệ gió/ClothGuard của S27. Mục "vải" dưới đây chỉ ghi chỗ cần một xung gió (`cloth.jolt`) hoặc lực nhẹ.
- **Đạo cụ phụ:** mesh nhỏ gắn xương tay qua socket, ẩn khi không phát clip. Hiệu ứng nguyên tố nhỏ dùng hệ VFX S30 ở mức thấp (không đèn điểm, tối đa 20 hạt).
- **Trang nhã cho mọi nhân vật.** Nhân vật trẻ em (dáng `nu-nho`, hiện có Mai Linh) chỉ dùng động tác hồn nhiên của trẻ: nhún chân, nghiêng đầu, ôm đồ chơi, vẫy tay. Không dùng tư thế tạo dáng người lớn, không xoay hông khoe dáng, không cúi gập người, không nháy mắt tán tỉnh.
- Thời lượng ghi theo giây; nhịp ghi dạng `thời điểm: động tác`.

## Bảng tóm tắt

| Nhân vật    | Dáng             | Vũ khí   | Chờ 1                      | Chờ 2                     |
| ----------- | ---------------- | -------- | -------------------------- | ------------------------- |
| Hạ Vy       | nu-teen          | cung     | Lật sổ vá buồm thổi băng   | Thử dây cung, gảy như đàn |
| Sương Mai   | nu-teen          | kiếm     | Hứng giọt sương            | Lau kiếm, soi bóng        |
| Mai Linh    | nu-nho           | pháp khí | Nghịch đèn lồng            | Đuổi đom đóm lửa          |
| Bạch Vũ     | nam-teen         | kiếm     | Thả diều giấy nhỏ          | Vuốt lông vũ áo choàng    |
| Lôi Đình    | nam-truong-thanh | thương   | Xoay thương, cắm đất       | Ngước nhìn trời giông     |
| Lạc Hồng    | nam-truong-thanh | kiếm     | Gõ nhịp trống đồng         | Vẽ cánh chim lửa          |
| Thủy Nguyệt | nu-dam-dang      | pháp khí | Rung chuông bạc            | Rót nước trăng            |
| Thạch Sơn   | nam-vam-vo       | đại kiếm | Đục chữ lên đá             | Phủi bụi khiên ngọc       |
| Phong Vân   | nu-teen          | cung     | Đo hướng gió               | Ngắm mây                  |
| Ardo        | nam-vam-vo       | đại kiếm | Gõ nghe tiếng kiếm         | Quạt than                 |
| Duri        | nu-truong-thanh  | đại kiếm | Xoay vò đất                | —                         |
| Golnar      | nu-dam-dang      | pháp khí | Thổi hơi lạnh lên quả lựu  | Quạt mát                  |
| Khởi Yên    | nam-truong-thanh | cung     | Gấp diều ước               | —                         |
| Kumi        | nu-teen          | kiếm     | Đổi vai đòn gánh           | Pha trà                   |
| Minh Khải   | nam-truong-thanh | cung     | Lau đèn sét                | Nghe ngóng thú            |
| Naraa       | nu-truong-thanh  | cung     | Huýt gọi ngựa              | —                         |
| Nghiên Thu  | nu-truong-thanh  | pháp khí | Viết chữ nước lên không    | Mài mực                   |
| Ngọc Thạch  | nu-teen          | thương   | Soi viên ngọc thô          | Tung hứng sỏi             |
| Payam       | nam-vam-vo       | đại kiếm | Áp tai nghe mạch nước      | —                         |
| Pruina      | nu-truong-thanh  | thương   | Dập tàn lửa                | —                         |
| Shonkhor    | nam-truong-thanh | thương   | Đại bàng đậu tay           | —                         |
| Takane      | nam-truong-thanh | thương   | Rung chuông tuyết          | —                         |
| Tuyết Lan   | nu-truong-thanh  | kiếm     | Nở lan băng trên lưỡi kiếm | —                         |
| Urae        | nam-teen         | kiếm     | Múa một nhịp chiêng        | Tung kiếm bắt lại         |

## Chi tiết từng nhân vật

### Hạ Vy (`havy`, cung Băng, mẹ là thợ vá buồm)

**Chờ 1: Lật sổ vá buồm thổi băng (5,5 giây).**

- Nhịp: `0,0`: cung chuyển sang tay trái, khoác xuống cạnh hông. `0,6`: tay phải rút cuốn sổ nhỏ bìa vải buồm từ thắt lưng. `1,3`: mở sổ, ngón cái lật 2 trang (mỗi trang 0,3 giây). `2,4`: chụm môi thổi nhẹ, một làn băng mỏng phủ trang giấy, nở 3 hoa tuyết nhỏ. `3,4`: mỉm cười, nghiêng đầu ngắm. `4,2`: gập sổ, cất vào thắt lưng. `4,8`: cung về tay, về tư thế chờ.
- Đạo cụ: sổ tay bìa vải buồm màu cam (socket tay phải). Hiệu ứng: sương băng trên trang, 3 hoa tuyết nhỏ, không đèn.
- Vũ khí/vải: cung giữ tay trái, dây cung không căng. Khăn vải đỏ ở eo nhận một xung gió nhẹ khi thổi (`2,4`).

**Chờ 2: Thử dây cung (4 giây).**

- Nhịp: `0,0`: nâng cung ngang ngực. `0,7`: ngón trỏ gảy dây 3 lần như đàn, mỗi lần dây rung và tỏa một vòng sương nhỏ. `2,2`: áp tai gần dây nghe tiếng. `3,2`: gật đầu hài lòng, hạ cung.
- Vũ khí: dây cung giả của S27 rung theo dịch đỉnh (biên độ nhỏ, tắt dần 0,4 giây).

### Sương Mai (`suongmai`, kiếm Thủy, luyện kiếm bên sông lúc sáng)

**Chờ 1: Hứng giọt sương (4,5 giây).** `0,0`: tay trái đưa ra trước, lòng bàn tay ngửa. `0,8`: một giọt nước rơi đọng lại lơ lửng trên tay. `1,6`: xoay cổ tay, giọt nước lăn thành vòng nhỏ. `3,0`: khẽ hất tay, giọt nước tan thành sương. `3,8`: về tư thế. Đạo cụ: không (giọt nước là VFX). Kiếm giữ yên tay phải, mũi hướng xuống.
**Chờ 2: Lau kiếm, soi bóng (5 giây).** `0,0`: nâng kiếm ngang. `0,6`: tay trái vuốt dọc sống kiếm từ chuôi tới mũi, lưỡi kiếm sáng một vệt nước theo tay. `2,4`: nghiêng lưỡi kiếm soi mặt. `3,6`: tra kiếm về thế thủ. Vải: tà áo nhận xung gió nhẹ khi vuốt kiếm.

### Mai Linh (`mailinh`, pháp khí Hỏa, cô bé làm đèn lồng, dáng `nu-nho`)

**Chờ 1: Nghịch đèn lồng (5 giây).** `0,0`: đèn lồng hoa mai bay xuống ngang ngực. `0,6`: hai tay ôm lấy đèn, nhún nhẹ gót chân 2 lần. `1,8`: chọc ngón tay vào đèn, đèn lóe sáng và phụt 3 cánh hoa mai lửa nhỏ. `2,6`: giật mình lùi nửa bước, rồi cười, hai tay che miệng. `3,8`: thả đèn bay về chỗ cũ, vẫy tay nhẹ.
**Chờ 2: Đuổi đom đóm lửa (5,5 giây).** `0,0`: một đốm lửa nhỏ bay ra từ đèn. `0,5`: mắt dõi theo, xoay người nửa vòng tại chỗ (bước nhỏ). `2,0`: chụm hai tay bắt hụt, đốm lửa bay lên. `3,2`: kiễng chân với lên, đốm lửa đậu lên đầu ngón tay. `4,4`: thổi nhẹ, đốm lửa bay về đèn.

- Lưu ý trẻ em: chỉ dùng động tác hồn nhiên (nhún, kiễng chân, che miệng cười, bước nhỏ). Không xoay hông, không tạo dáng, không cúi gập. Tốc độ động tác hơi nhanh, nhịp vui.

### Bạch Vũ (`bachvu`, kiếm Phong, lữ khách lông vũ có diều)

**Chờ 1: Thả diều giấy nhỏ (6 giây).** `0,0`: kiếm cắm xuống đất bên phải. `0,5`: rút diều giấy nhỏ từ áo choàng. `1,2`: tung diều, gió xoáy nhẹ nâng diều lên 2 m. `1,5–4,5`: tay trái giật dây 3 lần, diều lượn hình số 8. `4,8`: kéo diều về, cất vào áo, rút kiếm lên. Vải: áo choàng lông nhận gió đều suốt clip (gió hướng lên).
**Chờ 2: Vuốt lông vũ áo choàng (3,5 giây).** Rút một chiếc lông từ vai, thổi bay theo gió, mắt dõi theo rồi quay lại. Lông vũ là hạt có hình (texture lông).

### Lôi Đình (`loidinh`, thương Sấm, "Ngọn Thương Gọi Sấm")

**Chờ 1: Xoay thương, cắm đất (4 giây).** `0,0`: xoay thương 1 vòng trước ngực (1 giây). `1,2`: cắm cán thương xuống đất, tia điện nhỏ chạy quanh chân. `2,0`: khoanh tay, đứng thẳng. `3,2`: rút thương lên. Vải: dải khăn sau lưng nhận xung gió khi cắm thương.
**Chờ 2: Ngước nhìn trời giông (4,5 giây).** Ngẩng đầu, nheo mắt nhìn trời, một tia chớp nhỏ lóe xa ở chân trời (VFX bầu trời), khẽ cười, hạ đầu.

### Lạc Hồng (`lachong`, kiếm Hỏa, hậu duệ chim Lạc)

**Chờ 1: Gõ nhịp trống đồng (4 giây).** Sống kiếm gõ nhẹ vào lòng bàn tay trái 4 nhịp; mỗi nhịp bung một vòng hoa văn trống đồng lửa nhỏ dưới chân.
**Chờ 2: Vẽ cánh chim lửa (4,5 giây).** Mũi kiếm vẽ trên không một đường cong, vệt lửa thành hình chim Lạc bay vút lên rồi tan.

### Thủy Nguyệt (`thuynguyet`, pháp khí Thủy, nữ tư tế đền trăng)

**Chờ 1: Rung chuông bạc (4 giây).** Nâng chuông bạc ngang mặt, rung 2 lần; vòng sóng nước trăng lan trên nền. Tay áo dài nhận xung gió nhẹ.
**Chờ 2: Rót nước trăng (5 giây).** Tay trái vốc nước từ không khí, rót thành dòng sáng xuống đất, nở một bông súng nước rồi tan. Tư thế đoan trang, hai chân khép.

### Thạch Sơn (`thachson`, đại kiếm Đất, thợ đá khắc trăm bia)

**Chờ 1: Đục chữ lên đá (6 giây).** Dựng đại kiếm. Một phiến đá nhỏ trồi lên; ông rút cái đục, gõ 3 nhát, chữ phát sáng vàng rồi phiến đá chìm xuống. Đạo cụ: đục, búa nhỏ (socket hai tay).
**Chờ 2: Phủi bụi khiên ngọc (3,5 giây).** Khiên ngọc hiện ra ở tay trái, tay phải phủi 2 lần, bụi đá bay; khiên tan.

### Phong Vân (`phongvan`, cung Phong, lớn lên trên đỉnh núi)

**Chờ 1: Đo hướng gió (3,5 giây).** Giơ ngón tay lên trời, một dải gió xoáy quanh ngón tay; quay đầu theo hướng gió. Tóc và vạt áo bay theo hướng đó.
**Chờ 2: Ngắm mây (4 giây).** Kéo cung không tên, ngắm lên trời, buông dây; một luồng gió bắn lên tách một đám mây nhỏ.

### Ardo (`ardo`, đại kiếm Hỏa, thợ đúc chuông)

**Chờ 1: Gõ nghe tiếng kiếm (4,5 giây).** Gõ khớp ngón tay lên lưỡi đại kiếm, nghiêng đầu nghe; lưỡi kiếm rung, tỏa vòng sóng âm đỏ cam.
**Chờ 2: Quạt than (4 giây).** Thổi vào lòng bàn tay, một hòn than nhỏ đỏ rực; tung lên bắt lại 2 lần rồi bóp tắt.

### Duri (`duri`, đại kiếm Đất, thợ nặn vò sành)

**Chờ 1: Xoay vò đất (5,5 giây).** Khuỵu nhẹ một gối (lưng thẳng), hai tay nặn một chiếc vò nhỏ trồi từ đất, xoay 1 vòng, vỗ nhẹ, vò chìm xuống. Đại kiếm dựa vai.

### Golnar (`golnar`, pháp khí Băng, người giữ nhà băng sa mạc)

**Chờ 1: Thổi hơi lạnh lên quả lựu (4,5 giây).** Lấy quả lựu, thổi hơi lạnh, vỏ lựu phủ sương; mỉm cười, cất đi.
**Chờ 2: Quạt mát (3,5 giây).** Pháp khí bay vòng quanh người tỏa sương mát; tay quạt nhẹ, khăn đội đầu bay.

### Khởi Yên (`khoiyen`, cung Hỏa, phường diều)

**Chờ 1: Gấp diều ước (5,5 giây).** Rút tờ giấy, gấp nhanh thành diều nhỏ, viết một chữ bằng đầu ngón tay sáng lửa, thả bay; diều cháy thành tàn lửa trên cao.

### Kumi (`kumi`, kiếm Thủy, gánh nước cho nhà trà)

**Chờ 1: Đổi vai đòn gánh (3,5 giây).** Kiếm thành đòn gánh trên vai, chuyển sang vai kia, hai thùng nước nhỏ đung đưa, nước sóng sánh.
**Chờ 2: Pha trà (5 giây).** Rót một chén trà nhỏ từ ấm, thổi, nhấp một ngụm, cất đi. Nhỏ người, động tác gọn.

### Minh Khải (`minhkhai`, cung Sấm, thợ săn đêm)

**Chờ 1: Lau đèn sét (4 giây).** Gỡ đèn sét ở thắt lưng, lau mặt kính, đèn lóe tia điện; treo lại.
**Chờ 2: Nghe ngóng thú (3,5 giây).** Khuỵu thấp nửa người, áp tay xuống đất, quay đầu nghe, đứng dậy.

### Naraa (`naraa`, cung Sấm, Đội Cưỡi Giông)

**Chờ 1: Huýt gọi ngựa (4 giây).** Hai ngón tay đưa lên môi huýt sáo; một bóng ngựa bằng tia chớp phi qua sau lưng rồi tan. Tóc bay theo bóng ngựa.

### Nghiên Thu (`nghienthu`, pháp khí Thủy, học sĩ chép luật)

**Chờ 1: Viết chữ nước lên không (5 giây).** Ngón tay vẽ một chữ trên không bằng mực nước, chữ xoáy lại thành giọt rồi rơi vào nghiên.
**Chờ 2: Mài mực (4,5 giây).** Nghiên bay lơ lửng trước người, tay mài thỏi mực 3 vòng, mực lóe sáng xanh.

### Ngọc Thạch (`ngocthach`, thương Đất, con gái thợ mỏ)

**Chờ 1: Soi viên ngọc thô (4 giây).** Lấy viên ngọc thô, giơ lên soi, ngọc lóe sáng; lau vào áo, cất đi.
**Chờ 2: Tung hứng sỏi (3,5 giây).** Tung 3 viên sỏi lên, bắt lại, viên cuối hóa bụi đá.

### Payam (`payam`, đại kiếm Đất, thợ đào kênh ngầm)

**Chờ 1: Áp tai nghe mạch nước (5 giây).** Cắm đại kiếm, quỳ một gối (lưng thẳng), áp tai xuống đất; vòng gợn nước mờ hiện dưới nền; gật đầu, đứng dậy.

### Pruina (`pruina`, thương Băng, Đội Canh Lửa)

**Chờ 1: Dập tàn lửa (4 giây).** Một đốm tàn lửa rơi gần chân; giật mình, dẫm nhẹ lên, hơi băng dập tắt; thở phào.

### Shonkhor (`shonkhor`, thương Phong, người nuôi đại bàng)

**Chờ 1: Đại bàng đậu tay (6 giây).** Giơ cánh tay trái có bao da; đại bàng Khurmast sà xuống đậu, vỗ cánh; vuốt đầu nó rồi thả bay. Đạo cụ: mô hình đại bàng (dùng chung với chiêu), bao tay da.

### Takane (`takane`, thương Phong, người canh tuyết lở)

**Chờ 1: Rung chuông tuyết (4 giây).** Chuông nhỏ treo cán thương; lắc 2 lần, gió đẩy một lớp tuyết mịn trượt khỏi vai.

### Tuyết Lan (`tuyetlan`, kiếm Băng, kiếm khách núi tuyết)

**Chờ 1: Nở lan băng trên lưỡi kiếm (5 giây).** Nâng kiếm thẳng đứng trước mặt, nhắm mắt; một đóa lan băng nở trên sống kiếm, nàng thổi, cánh lan tan thành tuyết. Tư thế tĩnh, trang nghiêm.

### Urae (`urae`, kiếm Sấm, vũ công gánh hát)

**Chờ 1: Múa một nhịp chiêng (5 giây).** Xoay kiếm múa 2 nhịp, gõ sống kiếm vào chiêng nhỏ đeo hông, vòng sấm nhỏ lan ra; cúi chào kiểu gánh hát (nghiêng người nhẹ, không gập).
**Chờ 2: Tung kiếm bắt lại (3 giây).** Tung kiếm xoay 2 vòng trên không, bắt lại sau lưng.

## Việc cần làm khi dựng

1. Tạo đạo cụ phụ (sổ tay, diều giấy, quả lựu, đục, chuông...) với socket tay, ẩn mặc định.
2. Dựng clip bằng `tools/anim/author.ts` của S27 sau khi S27 chốt.
3. Thêm trạng thái chờ lâu vào `heroClip()` (phối hợp S27): hẹn giờ 8–12 giây, chọn ngẫu nhiên, ngắt khi có đầu vào.
4. Thêm test: mỗi nhân vật có ít nhất 1 clip `<id>.cho*`, khung đầu/cuối gần tư thế chờ.
