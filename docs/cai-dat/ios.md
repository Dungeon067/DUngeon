# Cài bản ứng dụng iOS lên iPad (miễn phí, dùng Xcode)

Cách nhanh nhất cho iPad/iPhone là bản PWA (xem [README.md](README.md)). Trang này dành cho ai muốn bản ứng dụng thật: ẩn hẳn thanh trạng thái, khoá ngang. Không tốn tiền, nhưng cần một máy Mac và làm lại mỗi 7 ngày.

## Cần chuẩn bị

- Máy Mac có macOS mới (Xcode 16 cần macOS 14.5 trở lên).
- **Xcode**: tải miễn phí trong App Store của Mac (khoảng 10 GB).
- **Node.js 22** ([nodejs.org](https://nodejs.org)) và **pnpm**: mở Terminal, chạy `npm install -g pnpm@9`.
- Một **Apple ID** bình thường (tài khoản iCloud). Không cần đăng ký Apple Developer.
- Cáp nối iPad với Mac.

## Các bước

1. **Lấy mã nguồn.** Trong Terminal:
   ```sh
   git clone https://github.com/Dungeon067/DUngeon.git
   cd DUngeon
   pnpm install
   pnpm build
   pnpm exec cap sync ios
   ```
2. **Mở bằng Xcode.** Chạy `pnpm exec cap open ios` (hoặc mở file `ios/App/App.xcodeproj` trong Xcode). Đợi Xcode tải xong các gói (thanh trạng thái trên cùng hết chữ "Resolving packages").
3. **Đăng nhập Apple ID.** Xcode → **Settings…** → tab **Accounts** → nút **+** → **Apple ID** → đăng nhập.
4. **Chọn đội ký.** Ở cột trái bấm **App** (biểu tượng xanh trên cùng) → chọn target **App** → tab **Signing & Capabilities**:
   - Bật **Automatically manage signing**.
   - **Team**: chọn tên bạn kèm chữ _(Personal Team)_.
   - Nếu báo trùng **Bundle Identifier**, đổi `vn.tinhtu.uocnguyen` thành tên khác, ví dụ `vn.tinhtu.uocnguyen.tenban`.
5. **Cắm iPad.** Mở khoá iPad, chọn **Tin cậy** máy tính này. Trên iPad bật **Chế độ nhà phát triển**: Cài đặt → Quyền riêng tư & Bảo mật → Chế độ nhà phát triển → bật, iPad khởi động lại.
6. **Run.** Trên thanh trên cùng của Xcode, chọn iPad của bạn ở danh sách thiết bị, bấm nút **▶ (Run)**. Lần đầu Xcode mất vài phút.
7. **Tin cậy nhà phát triển trên iPad.** Lần đầu mở, iPad báo "Nhà phát triển chưa được tin cậy": vào Cài đặt → Cài đặt chung → **VPN & Quản lý thiết bị** → chọn Apple ID của bạn → **Tin cậy**. Mở lại Tinh Tú.

## Giới hạn của tài khoản miễn phí

- Ứng dụng ký bằng Apple ID miễn phí **hết hạn sau 7 ngày**. Khi hết hạn, ứng dụng không mở được nữa: cắm iPad vào Mac và bấm **Run** lại (dữ liệu chơi vẫn còn).
- Mỗi Apple ID miễn phí chỉ cài được tối đa 3 ứng dụng tự ký trên một máy cùng lúc.
- Chỉ cài được lên máy cắm trực tiếp, không gửi cho người khác qua mạng được.

Muốn phát cho người khác qua **TestFlight** hoặc đưa lên **App Store**, cần tài khoản **Apple Developer Program, 99 USD/năm**. Chủ dự án tự quyết định việc này sau; repo không tự đăng ký hay trả phí gì.

## Cập nhật lên bản mới

```sh
cd DUngeon
git pull
pnpm install
pnpm build
pnpm exec cap sync ios
```

Rồi bấm **Run** trong Xcode như bước 6.

## Gặp lỗi

- **iPad đang cầm dọc thì game hiện nằm ngang, có hai dải đen**: xoay iPad sang ngang. iPadOS 26 không tự xoay ứng dụng chỉ chơi ngang.

- **"Untrusted Developer"** hoặc **"Nhà phát triển chưa được tin cậy"**: làm bước 7.
- **"Failed to register bundle identifier"**: đổi Bundle Identifier như ở bước 4.
- **Màn hình đen hoặc trắng**: chạy lại `pnpm build && pnpm exec cap sync ios`, rồi Run.
- **Không thấy iPad trong danh sách**: rút cáp cắm lại, mở khoá iPad, chọn Tin cậy; kiểm tra đã bật Chế độ nhà phát triển.
