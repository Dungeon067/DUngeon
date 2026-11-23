# Vẽ texture mắt Bạch Vũ (1024x512, bố cục mẫu VRoid): tròng xanh ngọc + 2 điểm sáng sắc.
import numpy as np, sys
from PIL import Image, ImageDraw, ImageFilter
src = sys.argv[1] if len(sys.argv) > 1 else 'eye_iris_src.png'
W, H = 1024, 512
eyes = [(262, 260), (762, 260)]
RX, RY = 112, 124

# Tròng: giữ độ đậm nhạt của mẫu, tô lại theo dải màu xanh ngọc #45dfb1
a = np.array(Image.open(src).convert('RGBA')).astype(np.float32)
lum = (a[..., :3] @ [0.3, 0.59, 0.11]) / 255.0
lum = np.clip((lum - lum[a[..., 3] > 20].min()) / (np.percentile(lum[a[..., 3] > 20], 99) + 1e-6), 0, 1)
dark, mid, light = np.array([12, 66, 58]), np.array([69, 223, 177]), np.array([205, 255, 238])
yy, xx = np.mgrid[0:H, 0:W]
grad = np.zeros((H, W))
for cx, cy in eyes:
    d = ((yy - cy) / RY)
    m = ((xx - cx) / RX) ** 2 + d ** 2 < 1.2
    grad[m] = np.clip((d[m] + 0.2) / 1.1, 0, 1)  # tối ở trên, sáng dần xuống dưới
t = np.clip(0.55 * lum + 0.55 * grad, 0, 1)[..., None]
col = np.where(t < 0.5, dark + (mid - dark) * (t / 0.5), mid + (light - mid) * ((t - 0.5) / 0.5))
out = np.concatenate([col, a[..., 3:]], -1)
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save('bachvu_eye_iris.png')

# Điểm sáng: lớn phía trên (elip nghiêng) + nhỏ phía dưới, viền sắc, có quầng mờ nhẹ
hl = Image.new('RGBA', (W, H), (255, 255, 255, 0))
glow = Image.new('L', (W, H), 0)
gd, d = ImageDraw.Draw(glow), ImageDraw.Draw(hl)
for cx, cy in eyes:
    big = (cx - 70, cy - 95, cx - 10, cy - 40)
    small = (cx + 28, cy + 42, cx + 52, cy + 66)
    gd.ellipse((big[0] - 8, big[1] - 8, big[2] + 8, big[3] + 8), 90)
    d.ellipse(big, (255, 255, 255, 255))
    d.ellipse(small, (255, 255, 255, 255))
    d.ellipse((cx + 40, cy - 70, cx + 52, cy - 58), (255, 255, 255, 200))
g = glow.filter(ImageFilter.GaussianBlur(6))
arr = np.array(hl)
arr[..., 3] = np.maximum(arr[..., 3], np.array(g))
Image.fromarray(arr).save('bachvu_eye_highlight.png')
print('ok')
