# Cinematic ước nguyện (S20)

Video dựng sẵn cho phần sao băng của màn ước nguyện (cảnh 1–4). Cảnh 5 (giới thiệu nhân vật) chạy trong game như bản mẫu. Video hoàn toàn không có chữ, logo hay ghi công; âm thanh là file riêng.

> Trạng thái: **mốc duyệt 1**. Mới có cảnh 3–4 bản 5★ (video thử 720p). Các bản khác, âm thanh, `timeline.json` và trang thử làm sau khi chủ dự án duyệt hướng hình.

## Quy chuẩn

| Mục        | Giá trị                                           |
| ---------- | ------------------------------------------------- |
| Khung hình | 16:9, 1920×1080 (máy tính), 1280×720 (điện thoại) |
| Tốc độ     | 30 khung/giây                                     |
| Định dạng  | MP4 H.264 và WebM VP9, không có rãnh âm thanh     |
| Dung lượng | bản 720p dưới 6MB                                 |
| Lưu trữ    | Git LFS cho `media/cinematic/out/**`              |

## Thư mục

| Đường dẫn                          | Nội dung                                                       |
| ---------------------------------- | -------------------------------------------------------------- |
| `media/cinematic/blender/build.py` | Lệnh dựng và render một cảnh                                   |
| `media/cinematic/blender/cine/`    | Thư viện dựng cảnh: môi trường, trống đồng, hiệu ứng, các cảnh |
| `media/cinematic/tools/encode.py`  | Ghép khung PNG, chỉnh màu, hạt phim, xuất MP4 và WebM          |
| `media/cinematic/out/`             | Video và ảnh duyệt (Git LFS)                                   |

## Chạy lại

Cần Blender 5.3 (bản Linux, chạy không giao diện) và ffmpeg có `libx264`, `libvpx-vp9`.

```bash
cd media/cinematic/blender
blender -b --factory-startup -P build.py -- \
  --shot s3 --variant 5a --res 1280x720 --samples 64 --out ../out/frames/5a/s3
blender -b --factory-startup -P build.py -- \
  --shot s4 --variant 5a --res 1280x720 --samples 64 --out ../out/frames/5a/s4
python3 ../tools/encode.py --name s34-5a-thu --heights 720 \
  --shots ../out/frames/5a/s3 ../out/frames/5a/s4 --out ../out/video
```

`--frames 30,44` chỉ render vài khung (hạt và vệt sao băng vẫn được mô phỏng từ khung đầu). Khung PNG không commit.

Thời gian render trên máy 8 nhân CPU, không GPU, 720p 64 mẫu: cảnh 3 khoảng 20 giây/khung, cảnh 4 khoảng 40–60 giây/khung.

## Kỹ thuật

- Cycles, khử nhiễu OpenImageDenoise, motion blur.
- Compositor: bloom, quang sai màu nhẹ, vignette, sương theo khoảng cách (Mist pass). Hạt phim thêm lúc mã hóa.
- Biển bằng Ocean modifier, núi xa sinh theo noise, vách đá và cỏ bằng Geometry Nodes.
- Trống đồng: thân tiện, mặt trống có hoa văn nổi (mặt trời giữa, vòng chim bay, dải chấm) từ bản đồ độ cao EXR sinh bằng code.
- Sao băng: lõi và quầng phát sáng, vệt dạng ống thon, tia lửa là hạt tự mô phỏng. Sóng xung kích trên biển bằng Geometry Nodes.
- Bảng màu theo bản mẫu: 5★ `#ffcf5a` (bắt đầu tím rồi đổi vàng ở khoảng 55% cảnh 3), 4★ `#b98cff`, 3★ `#6fb6ff`.
