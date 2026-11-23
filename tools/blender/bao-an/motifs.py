"""Hình cách điệu hai lớp (men + viền kim loại + lõi) cho các vì sao không dùng lửa hay băng."""
import math

from mathutils import Matrix

from lib import curve_obj, extrude_poly


def arc(cx, cz, r, a0, a1, n):
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cz + r * math.sin(math.radians(a0 + (a1 - a0) * i / n)))
            for i in range(n + 1)]


def shape_pts(kind, h, w):
    if kind == "tia":  # tia mặt trời trên mặt trống
        return [(w, 0), (w * 0.35, h * 0.55), (0, h), (-w * 0.35, h * 0.55), (-w, 0)]
    if kind == "dieu":  # cánh diều hình thoi
        return [(0, 0), (w, h * 0.38), (0, h), (-w, h * 0.38)]
    if kind == "set":  # tia sét gấp khúc
        return [(-0.15 * w, 0), (0.75 * w, 0.52 * h), (0.15 * w, 0.5 * h), (0.55 * w, h), (-0.75 * w, 0.4 * h),
                (-0.12 * w, 0.42 * h)]
    if kind == "vom":  # vòm nhọn của mái gạch men
        top = [(w * math.cos(math.radians(a)) - w * 0.0, h * 0.42 + h * 0.58 * math.sin(math.radians(a)) ** 1.6)
               for a in range(0, 181, 15)]
        return [(w, 0)] + top + [(-w, 0)]
    if kind == "trang":  # trăng lưỡi liềm, hai sừng chỉ lên
        R = h / 1.2
        return arc(0, R, R, 190, 350, 16) + arc(0, R * 1.42, R * 0.9, -30, -150, 14)[1:-1]
    if kind == "muoi":  # tinh thể muối bậc thang
        return [(w, 0), (w, 0.38 * h), (0.62 * w, 0.38 * h), (0.62 * w, 0.72 * h), (0.28 * w, 0.72 * h), (0.28 * w, h),
                (-0.28 * w, h), (-0.28 * w, 0.72 * h), (-0.62 * w, 0.72 * h), (-0.62 * w, 0.38 * h), (-w, 0.38 * h),
                (-w, 0)]
    raise ValueError(kind)


def badge(name, kind, base, h, w, rot_z, fill, rim, inner, parent, thick=0.01, rot_y=0.0):
    """Hình 2D đùn dày, viền kim loại, lõi nhỏ cùng dáng. Dựng trong mặt XZ (mặt trước nhìn −Y)."""
    pts = shape_pts(kind, h, w)
    objs = [extrude_poly(name, pts, thick, [fill], parent, smooth=False, bevel_w=thick * 0.3)]
    cx = sum(p[0] for p in pts) / len(pts)
    cz = sum(p[1] for p in pts) / len(pts)
    ins = [(cx + (x - cx) * 0.5, cz + (z - cz) * 0.5) for x, z in pts]
    objs.append(extrude_poly(name + "_trong", ins, thick * 0.6, [inner], parent, y=-thick * 0.55))
    loop = [(x, -thick * 0.5, z) for x, z in pts] + [(pts[0][0], -thick * 0.5, pts[0][1])]
    objs.append(curve_obj(name + "_vien", [loop], thick * 0.32, rim, parent, bevel_res=2))
    for ob in objs:
        ob.matrix_basis = (Matrix.Translation(base) @ Matrix.Rotation(rot_z, 4, "Z") @ Matrix.Rotation(rot_y, 4, "Y")
                           @ ob.matrix_basis)
    return objs
