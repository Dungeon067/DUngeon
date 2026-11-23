"""Lớp má hồng mềm (không viền) cho texture da mặt VRoid: PNG trong suốt, nhập làm layer trên cùng trong Texture Editor.
python paint_blush.py out.png [size=2048] [u=0.37] [v=0.645] [rx=0.06] [ry=0.032] [a=0.42] [color=F6A3A3]
[skin=texture_da.png nu=0.493 nv=0.635 nrx=0.03 nry=0.05]  (phủ mũi, để lại 1 chấm sáng)
u, v: tâm má trái theo UV (gốc trên-trái); má phải lấy đối xứng 1-u."""
import sys, numpy as np
from PIL import Image
out = sys.argv[1]
kw = dict(a.split('=') for a in sys.argv[2:])
N = int(kw.get('size', 2048)); u = float(kw.get('u', 0.37)); v = float(kw.get('v', 0.645))
rx = float(kw.get('rx', 0.06)); ry = float(kw.get('ry', 0.032)); A = float(kw.get('a', 0.42))
c = kw.get('color', 'F6A3A3'); rgb = [int(c[i:i + 2], 16) for i in (0, 2, 4)]
yy, xx = np.mgrid[0:N, 0:N] / N
al = np.zeros((N, N))
for cu in (u, 1 - u):
    r2 = ((xx - cu) / rx) ** 2 + ((yy - v) / ry) ** 2
    al = np.maximum(al, np.exp(-r2 * 1.6))
img = np.zeros((N, N, 4), np.uint8); img[..., :3] = rgb; img[..., 3] = (al * A * 255).clip(0, 255)
Image.fromarray(img, 'RGBA').save(out)
# Mũi chỉ còn một chấm sáng: phủ vùng mũi trên texture bằng màu da lấy mẫu xung quanh, rồi chấm một điểm sáng nhỏ.
if 'skin' in kw:
    sk = np.array(Image.open(kw['skin']).convert('RGB').resize((N, N)), float)
    nu, nv = float(kw.get('nu', 0.493)), float(kw.get('nv', 0.635))
    nrx, nry = float(kw.get('nrx', 0.03)), float(kw.get('nry', 0.05))
    ring = (((xx - nu) / (nrx * 1.6)) ** 2 + ((yy - nv) / (nry * 1.4)) ** 2)
    sel = (ring > 1) & (ring < 1.6)
    base = sk[sel].mean(0)
    m = np.exp(-np.maximum(((xx - nu) / nrx) ** 2 + ((yy - nv) / nry) ** 2 - 0.6, 0) * 3)
    hl = np.exp(-(((xx - nu - 0.004) / 0.0045) ** 2 + ((yy - nv - 0.022) / 0.0035) ** 2)) * 0.85
    col = img[..., :3].astype(float); a0 = img[..., 3] / 255.0
    # trộn: blush dưới cùng, phủ mũi, điểm sáng trên cùng
    a1 = m + a0 * (1 - m); c1 = (base * m[..., None] + col * (a0 * (1 - m))[..., None]) / np.maximum(a1, 1e-6)[..., None]
    a2 = hl + a1 * (1 - hl); c2 = (np.array([255, 250, 246]) * hl[..., None] + c1 * (a1 * (1 - hl))[..., None]) / np.maximum(a2, 1e-6)[..., None]
    img[..., :3] = c2.clip(0, 255); img[..., 3] = (a2 * 255).clip(0, 255)
    Image.fromarray(img, 'RGBA').save(out)
