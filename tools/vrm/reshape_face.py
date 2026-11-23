"""Bo tròn mặt sau khi xuất VRoid (VRoid không làm được cằm ngắn tròn): cằm ngắn + tròn, quai hàm/má đầy, cằm không nhô.
Phần mặt dưới đường mắt được kéo về một khối siêu elip; miệng/mũi đi theo da; pháp tuyến vùng đó lấy theo khối elip.
Mắt, lông mày không bị đụng (nằm trên đường mắt).
python tools/vrm/reshape_face.py in.vrm out.vrm [short=0.15] [p=2.2] [alpha=0.75] [cheek=0.04] [back=0.003]
- short: tỉ lệ rút ngắn mặt dưới (cằm lên)   - p: số mũ siêu elip (2 = elip; lớn hơn = má/hàm đầy hơn)
- alpha: mức kéo về khối elip (0..1)          - cheek: nới rộng má (tỉ lệ)   - back: kéo cằm lùi (m)
Tham số từng nhân vật: art-src/models/<id>/face.json"""
import sys, json, struct, numpy as np
src, dst = sys.argv[1:3]
kw = dict(a.split('=') for a in sys.argv[3:])
SHORT = float(kw.get('short', 0.15)); PEXP = float(kw.get('p', 2.3)); FLOOR = float(kw.get('floor', 0.0))
BACK = float(kw.get('back', 0.003)); ALPHA = float(kw.get('alpha', 0.75)); CHEEK = float(kw.get('cheek', 0.04)); FULL = float(kw.get('full', 1.0))
d = bytearray(open(src, 'rb').read())
jl = struct.unpack('<I', d[12:16])[0]; j = json.loads(bytes(d[20:20 + jl])); b0 = 20 + jl + 8
def view(i):
    a = j['accessors'][i]; bv = j['bufferViews'][a['bufferView']]
    o = b0 + bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    n = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3}[a['type']]
    dt = {5126: np.float32, 5125: np.uint32, 5123: np.uint16}[a['componentType']]
    return o, np.frombuffer(bytes(d[o:o + a['count'] * n * np.dtype(dt).itemsize]), dt).reshape(a['count'], n) if n > 1 else None
mesh = [m for m in j['meshes'] if m['name'].startswith('Face')][0]
pacc = mesh['primitives'][0]['attributes']['POSITION']
assert all(p['attributes']['POSITION'] == pacc for p in mesh['primitives'])
off, P = view(pacc); P = P.copy()
mat = lambda p: j['materials'][p['material']]['name']
def verts(key):
    out = []
    for p in mesh['primitives']:
        if key in mat(p):
            a = j['accessors'][p['indices']]; bv = j['bufferViews'][a['bufferView']]
            dt = {5125: np.uint32, 5123: np.uint16}[a['componentType']]
            o = b0 + bv.get('byteOffset', 0) + a.get('byteOffset', 0)
            out.append(np.frombuffer(bytes(d[o:o + a['count'] * np.dtype(dt).itemsize]), dt))
    return np.unique(np.concatenate(out))
skin = verts('_SKIN'); eyes = verts('_EYE')
S = P[skin]
ytop = P[eyes, 1].min() - 0.002
ychin = S[:, 1].min()
zc = (S[:, 2].max() + S[:, 2].min()) / 2
front = S[S[:, 2] > zc]
def w0(y):  # nửa bề rộng viền mặt hiện tại ở độ cao y
    s = front[np.abs(front[:, 1] - y) < 0.003]
    return np.abs(s[:, 0]).max() if len(s) else 1e-4
wtop = w0(ytop)
span = ytop - ychin
ychin2 = ytop - span * (1 - SHORT)
ztop = front[np.abs(front[:, 1] - ytop) < 0.004][:, 2].max()
rx, ry = wtop * (1 + CHEEK), ytop - ychin2
# zc0: tâm elip theo trục z; rz: bán kính tới mặt trước ở đường mắt
zc0 = zc - 0.01; rz = ztop - zc0
def solid(Q):
    y, x, z = Q[:, 1], Q[:, 0], Q[:, 2]
    t = np.clip((ytop - y) / span, 0, 1)
    dy = np.minimum(y - ytop, 0)
    q = (np.abs(x / rx) ** PEXP + np.abs(dy / ry) ** PEXP + np.abs(np.maximum(z - zc0, 0) / rz) ** PEXP) ** (1 / PEXP)
    k = 1 / np.maximum(q, 1e-6)
    tgt = np.stack([x * k, ytop + dy * k, zc0 + (z - zc0) * k], 1)
    r = np.clip(t / 0.6, 0, 1); w = r * r * (3 - 2 * r)
    fw = np.clip((z - (zc - 0.035)) / 0.045, 0, 1); fw = fw * fw * (3 - 2 * fw)
    w = (w * fw * ALPHA)[:, None]
    out = Q * (1 - w) + tgt * w
    out[:, 2] -= BACK * t ** 2 * fw
    return out, t
newS, t_s = solid(P[skin])
disp = np.zeros_like(P, dtype=np.float64); disp[skin] = newS - P[skin]
other = np.setdiff1d(np.arange(len(P)), skin)
if len(other):
    S0 = P[skin].astype(np.float64)
    for i0 in range(0, len(other), 256):
        ids = other[i0:i0 + 256]
        dd = ((P[ids][:, None, :] - S0[None]) ** 2).sum(-1)
        nn = np.argsort(dd, 1)[:, :6]; wn = 1 / (np.take_along_axis(dd, nn, 1) + 1e-9)
        disp[ids] = (disp[skin][nn] * wn[..., None]).sum(1) / wn.sum(1, keepdims=True)
P = P + disp
t = np.clip((ytop - P[:, 1]) / span, 0, 1)
P = P.astype(np.float32); d[off:off + P.nbytes] = P.tobytes()
# tính lại pháp tuyến cho da mặt vùng đã sửa (gộp đỉnh trùng vị trí để không lộ đường nối)
nacc = mesh['primitives'][0]['attributes'].get('NORMAL')
if nacc is not None:
    noff, N = view(nacc); N = N.copy()
    # pháp tuyến vùng mặt dưới lấy theo khối elip đã bo, chuyển mềm lên vùng trên
    dyn = np.minimum(P[:, 1] - ytop, 0)
    ge = np.stack([P[:, 0] / rx ** 2, dyn / ry ** 2, (P[:, 2] - zc0) / rz ** 2], 1)
    ge /= np.linalg.norm(ge, axis=1, keepdims=True) + 1e-12
    r = np.clip(t / 0.35, 0, 1); wn = r * r * (3 - 2 * r)
    fz = np.clip((P[:, 2] - (zc - 0.035)) / 0.045, 0, 1)
    wn = (wn * fz * np.isin(np.arange(len(P)), skin) * 0.85)[:, None]
    N = N * (1 - wn) + ge * wn; N /= np.linalg.norm(N, axis=1, keepdims=True) + 1e-12
    N = N.astype(np.float32); d[noff:noff + N.nbytes] = N.tobytes()
a = j['accessors'][pacc]; a['min'] = P.min(0).tolist(); a['max'] = P.max(0).tolist()
js = json.dumps(j, ensure_ascii=False, separators=(',', ':')).encode()
js += b' ' * ((4 - len(js) % 4) % 4)
binc = bytes(d[b0 - 8:])
out = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + len(binc)) + struct.pack('<II', len(js), 0x4E4F534A) + js + binc
open(dst, 'wb').write(out)
print(f'ytop {ytop:.4f} chin {ychin:.4f}->{P[skin,1].min():.4f} wtop {wtop:.4f} rz {rz:.4f}')
