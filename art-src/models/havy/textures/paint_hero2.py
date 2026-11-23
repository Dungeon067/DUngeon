# Texture tự vẽ cho Hạ Vy hero2 (nền: preset trang phục mặc định VRoid), chạy ngay sau khi xuất VRoid:
#   python paint_hero2.py hero2_export.vrm havy_hero2_raw.vrm
# Đổi tông đen/bạc/đỏ của preset sang navy #2a3a8f / vàng #f2a227 / băng #7fe0ff, vẽ 2 cúc X đỏ #e0383a,
# ngọc Băng giọt nước ở ngực, cắt áo choàng sau xuống ngang hông (đuôi nhọn), quần tất #272838, ủng #2b2230,
# thay tròng mắt đỏ nhiều lớp (havy_hero_eye_*.png, vẽ bằng paint_eyes_hero.py). PNG kết quả lưu cạnh script.
import sys, os
import numpy as np
from PIL import Image, ImageDraw
from paint_hero import load, save, img_of, rebuild, png

HERE = os.path.dirname(os.path.abspath(__file__))
C = lambda h: np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float) / 255
NAVY_LO, NAVY_HI = C('0d1338'), C('3d55c4')
GOLD_SH, GOLD_HI = C('8a4f08'), C('ffd77e')
ICE_LO, ICE_HI = C('1f4f86'), C('c9f5ff')
ICE_WHITE = C('e4f7ff')
TIGHT_LO, TIGHT_HI = C('121219'), C('3b3c55')
BOOT_LO, BOOT_HI = C('100b13'), C('4a3b52')
GLOVE_LO, GLOVE_HI = C('0e0f1c'), C('2f3356')
X_RED, ICE = (224, 56, 58), (127, 224, 255)


def lerp(a, b, t):
    t = np.clip(t, 0, 1)[..., None]
    return a + (b - a) * t


def masks(rgb):
    mx, mn = rgb.max(-1), rgb.min(-1)
    sat = (mx - mn) / (mx + 1e-6)
    L = rgb @ np.array([0.299, 0.587, 0.114])
    grey = sat < 0.25
    red = (sat >= 0.3) & (rgb[..., 0] > rgb[..., 1] * 1.5) & (rgb[..., 0] > rgb[..., 2] * 1.5)
    return L, mx, grey & (L < 0.42), grey & (L >= 0.42) & (L < 0.86), grey & (L >= 0.86), red


def recolor(im, lo=NAVY_LO, hi=NAVY_HI, silver=(GOLD_SH, GOLD_HI), white=True, ice_box=None):
    a = np.asarray(im.convert('RGBA')).astype(float) / 255
    rgb = a[..., :3]
    L, V, dk, sv, wh, rd = masks(rgb)
    out = rgb.copy()
    out[dk] = lerp(lo, hi, L / 0.42)[dk]
    out[sv] = lerp(silver[0], silver[1], (L - 0.42) / 0.44)[sv]
    if white:
        out[wh] = (rgb * 0.65 + ICE_WHITE * 0.35)[wh]
    out[rd] = lerp(ICE_LO, ICE_HI, V * 1.1)[rd]
    if ice_box:
        x0, y0, x1, y1 = ice_box
        box = np.zeros(L.shape, bool)
        box[y0:y1, x0:x1] = True
        m = box & (sv | dk)
        out[m] = lerp(ICE_LO, ICE_HI, L * 1.15)[m]
    a[..., :3] = out
    return Image.fromarray((a * 255 + 0.5).astype(np.uint8), 'RGBA'), rd


def blobs(mask, split_x=None):
    ys, xs = np.nonzero(mask)
    groups = [(xs < split_x), (xs >= split_x)] if split_x else [np.ones(len(xs), bool)]
    return [(xs[g].min(), ys[g].min(), xs[g].max(), ys[g].max()) for g in groups if g.any()]


def x_button(d, box):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    r = max(x1 - x0, y1 - y0) * 0.75 + 6
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(18, 24, 70, 255), outline=(242, 162, 39, 255), width=max(4, int(r * 0.18)))
    k, w = r * 0.55, max(5, int(r * 0.32))
    for s in (1, -1):
        d.line([cx - k, cy - k * s, cx + k, cy + k * s], fill=(90, 10, 14, 255), width=w + 4)
    for s in (1, -1):
        d.line([cx - k, cy - k * s, cx + k, cy + k * s], fill=X_RED + (255,), width=w)


def ice_drop(d, box, grow=1.6):
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    h = (y1 - y0) * grow / 2 + 4
    w = h * 0.62
    pts = [(cx, cy - h)]
    for t in np.linspace(-0.25, 1.25, 25) * np.pi:
        pts.append((cx + w * np.cos(t), cy + h * 0.35 + w * np.sin(t)))
    d.polygon(pts, fill=(200, 140, 30, 255))
    s = 0.78
    d.polygon([(cx + (px - cx) * s, cy + (py - cy) * s) for px, py in pts], fill=ICE + (255,))
    d.polygon([(cx + (px - cx) * 0.45 - w * 0.15, cy + (py - cy) * 0.45 + h * 0.12) for px, py in pts], fill=(70, 170, 230, 255))
    d.ellipse([cx - w * 0.38, cy - h * 0.25, cx - w * 0.05, cy + h * 0.05], fill=(240, 252, 255, 255))


def cut_cape(im, keep=0.58, teeth=3):
    a = np.asarray(im).copy()
    al = a[..., 3] > 8
    cols = al.any(0)
    xs = np.nonzero(cols)[0]
    runs, s = [], xs[0]
    for p, q in zip(xs, xs[1:]):
        if q != p + 1:
            runs.append((s, p)); s = q
    runs.append((s, xs[-1]))
    for x0, x1 in runs:
        ys = np.nonzero(al[:, x0:x1 + 1].any(1))[0]
        y0, y1 = ys.min(), ys.max()
        base = y0 + keep * (y1 - y0)
        amp = 0.06 * (y1 - y0)
        for x in range(x0, x1 + 1):
            f = ((x - x0) / max(1, x1 - x0) * teeth) % 1
            yc = int(base + amp * (1 - abs(2 * f - 1)))
            a[yc:, x, 3] = 0
            g = slice(max(0, yc - 14), yc)
            a[g, x, :3] = (242, 162, 39)
    return Image.fromarray(a, 'RGBA')


def acc(j, b, i):
    a = j['accessors'][i]
    v = j['bufferViews'][a['bufferView']]
    dt = {5126: np.float32, 5125: np.uint32, 5123: np.uint16, 5121: np.uint8}[a['componentType']]
    n = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
    return np.frombuffer(b, dt, a['count'] * n, v.get('byteOffset', 0) + a.get('byteOffset', 0)).reshape(-1, n)


def shorts(j, b, im, y0=0.88, y1=1.12):
    # quần short tối #272838 vẽ lên da hông/đùi trên (phần nằm dưới váy), chọn tam giác theo độ cao
    mi = next(i for i, m in enumerate(j['materials']) if 'Body_00_SKIN' in m['name'])
    W, H = im.size
    mask = Image.new('L', im.size, 0)
    d = ImageDraw.Draw(mask)
    for me in j['meshes']:
        for p in me['primitives']:
            if p.get('material') != mi:
                continue
            P = acc(j, b, p['attributes']['POSITION'])
            UV = acc(j, b, p['attributes']['TEXCOORD_0'])
            T = acc(j, b, p['indices']).reshape(-1, 3)
            cy = P[T, 1].mean(1)
            for t in T[(cy > y0) & (cy < y1)]:
                d.polygon([(UV[k, 0] * W, UV[k, 1] * H) for k in t], fill=255)
    a = np.asarray(im).astype(float)
    L = (a[..., :3] @ np.array([0.299, 0.587, 0.114])) / 255
    col = lerp(C('1a1b28') * 255, C('3a3c56') * 255, (L - 0.4) * 1.6)
    m = np.asarray(mask) > 0
    a[m, :3] = col[m]
    return Image.fromarray(a.astype(np.uint8), 'RGBA')


def main(inp, outp):
    j, b = load(inp)
    repl = {}

    def put(mat, im, name):
        s, _ = img_of(j, b, mat)
        im.save(os.path.join(HERE, f'havy_hero2_{name}.png'), optimize=True)
        repl[s] = png(im)

    # áo khoác lửng + gi-lê (vùng giữa thành xanh băng), 2 ô đỏ ở vạt trước -> cúc X
    s, im = img_of(j, b, 'N00_007_01_Tops_01_CLOTH_01')
    W = im.size[0]
    out, rd = recolor(im, ice_box=(int(W * .377), int(W * .208), int(W * .606), int(W * .6)))
    d = ImageDraw.Draw(out)
    for fy in (0.442, 0.482):
        x_button(d, (W * .462, W * fy - W * .009, W * .488, W * fy + W * .009))
    put('N00_007_01_Tops_01_CLOTH_01', out, 'jacket')
    # cổ đứng, nơ ngực, cổ tay: ngọc đỏ giữa ngực -> ngọc Băng giọt nước
    s, im = img_of(j, b, 'N00_007_01_Tops_01_CLOTH_02')
    W = im.size[0]
    out, rd = recolor(im)
    pale = recolor(im, silver=(C('8fb0d8'), C('f4fbff')))[0]
    mask = Image.new('L', im.size, 0)
    ImageDraw.Draw(mask).rectangle([W * .3, 0, W * .7, im.size[1]], fill=255)
    out.paste(pale, (0, 0), mask)
    mid = rd.copy(); mid[:, :int(W * .4)] = False; mid[:, int(W * .6):] = False
    if mid.any():
        ice_drop(ImageDraw.Draw(out), blobs(mid)[0])
    put('N00_007_01_Tops_01_CLOTH_02', out, 'collar')
    put('N00_007_03_Tops_01_CLOTH_01', recolor(img_of(j, b, 'N00_007_03_Tops_01_CLOTH_01')[1])[0], 'capelet')
    for k, nm in (('02', 'cape_out'), ('03', 'cape_in')):
        im = recolor(img_of(j, b, f'N00_007_03_Tops_01_CLOTH_{k}')[1])[0]
        put(f'N00_007_03_Tops_01_CLOTH_{k}', cut_cape(im), nm)
    put('N00_002_03_Tops_01_CLOTH_01', recolor(img_of(j, b, 'N00_002_03_Tops_01_CLOTH_01')[1])[0], 'skirt')
    put('N00_002_03_Tops_01_CLOTH_02', recolor(img_of(j, b, 'N00_002_03_Tops_01_CLOTH_02')[1])[0], 'bow')
    put('N00_002_03_Tops_01_CLOTH_03', recolor(img_of(j, b, 'N00_002_03_Tops_01_CLOTH_03')[1], GLOVE_LO, GLOVE_HI, silver=(C('1c1e33'), C('4a5080')))[0], 'gloves')
    put('N00_002_03_Tops_01_CLOTH_04', recolor(img_of(j, b, 'N00_002_03_Tops_01_CLOTH_04')[1])[0], 'belt')
    put('N00_010_01_Onepiece_00_CLOTH', recolor(img_of(j, b, 'N00_010_01_Onepiece_00_CLOTH')[1])[0], 'petticoat')
    for k in ('01', '02'):
        im = img_of(j, b, f'N00_008_01_Shoes_01_CLOTH_{k}')[1]
        put(f'N00_008_01_Shoes_01_CLOTH_{k}', recolor(im, BOOT_LO, BOOT_HI)[0], f'boots{k}')
    im = img_of(j, b, 'N00_000_00_Body_00_SKIN')[1]
    body = recolor(im, TIGHT_LO, TIGHT_HI, silver=(TIGHT_LO, TIGHT_HI), white=False)[0]
    put('N00_000_00_Body_00_SKIN', shorts(j, b, body), 'body')
    for mat, f in (('EyeIris', 'havy_hero_eye_iris.png'), ('EyeHighlight', 'havy_hero_eye_highlight.png')):
        repl[img_of(j, b, mat)[0]] = png(Image.open(os.path.join(HERE, f)))
    b = rebuild(j, b, repl)
    save(outp, j, b)
    print('ok', outp, len(repl), 'textures')


if __name__ == '__main__':
    main(*sys.argv[1:3])
