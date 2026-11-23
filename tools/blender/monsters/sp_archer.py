"""Yêu Rừng Cung Thủ: Yêu Rừng lớn tuổi, nón lá trúc, cung từ một đốt trúc cong, ống tên bọc lá trên lưng."""
import math

from mathutils import Vector as V

import build as B
import mlib as M
import sp_goblin as G

CFG = dict(k=1.06, body_tris=1200, hunch=0.03, crown=False, leaf_green=(0.36, 0.48, 0.2),
           cloth=((0.3, 0.38, 0.2), (0.16, 0.2, 0.12)),
           skin=((0.33, 0.42, 0.24), (0.15, 0.21, 0.15), (0.58, 0.6, 0.38)))


BOW_R = 0.0075


class Extra:
    """Tay trái nắm giữa thân cung dựng đứng, tay phải nắm hờ (kéo dây). Xương bstr giữa dây cung để kéo căng,
    nock là mũi tên đặt trên tay cầm cung (chỉ hiện khi kéo cung)."""

    @staticmethod
    def grips(J, k):
        return {"L": (G.grip_point(J, "L", k), V((0, 0, 1)), BOW_R * k, -1),
                "R": (G.grip_point(J, "R", k), V((0, -1, 0.25)), 0.005 * k, 1)}

    @staticmethod
    def bones(J, k):
        g = G.grip_point(J, "L", k)
        mid = g + V((0, 0.06 * k, 0))
        return [("bow", g, g + V((0, 0, 0.14 * k)), "handL"),
                ("bstr", mid, mid + V((0, 0.05 * k, 0)), "bow"),
                ("nock", mid, mid + V((0, -0.05 * k, 0)), "bstr")]

    @staticmethod
    def pieces(J, k, sid, rope, bones, hug):
        out = []
        bam = G.mat_bamboo(f"{sid}_bamboo", (0.6, 0.58, 0.3), nodes_z=(0.25, 0.55, 0.8))
        hat_m = G.mat_bamboo(f"{sid}_hat", (0.74, 0.64, 0.36), nodes_z=tuple(J["head"].z + (0.03 + 0.012 * i) * k for i in range(8)))
        leaf = G.mat_leaf(f"{sid}_qleaf", (0.4, 0.5, 0.18), (0.7, 0.55, 0.25))
        hc = J["head"]
        # Nón lá: hạ nón tới khi mặt trong chạm đỉnh đầu, có vòng khua tre ôm đầu và quai buộc dưới cằm.
        prof = [(0.21, 0.035), (0.2, 0.045), (0.15, 0.075), (0.09, 0.105), (0.035, 0.13), (0.004, 0.14)]

        def r_at(z):
            for (r0, z0), (r1, z1) in zip(prof, prof[1:]):
                if z0 <= z <= z1:
                    return (r0 + (r1 - r0) * (z - z0) / (z1 - z0)) * k
            return 0.0 if z > prof[-1][1] else 9.0

        samples = []
        for zi in range(30):
            z = hc.z + (0.03 + 0.1 * zi / 29) * k
            for ai in range(16):
                a = ai / 16 * math.tau
                d = V((math.cos(a), math.sin(a), 0))
                hit = hug.ray(V((hc.x, hc.y, z)) + d * 0.3 * k, -d)
                if hit is not None and (hit - V((hc.x, hc.y, z))).length < 0.2 * k:
                    samples.append(((V((hit.x, hit.y, 0)) - V((hc.x, hc.y, 0))).length, (z - hc.z) / k))
        lo_, hi_ = -0.1, 0.1
        for _ in range(30):
            mid = (lo_ + hi_) / 2
            ok = all(r <= r_at(z - mid) - 0.006 * k for r, z in samples)
            hi_, lo_ = (mid, lo_) if ok else (hi_, mid)
        dz = hi_ * k
        rings = [M.ring(hc + V((0, 0.005 * k, z * k + dz)), (V((1, 0, 0)), V((0, 1, 0))), r * k, r * k * 0.96, 20)
                 for r, z in prof]
        out.append(B.Piece(M.loft("hat", rings, closed_ends=True), hat_m, "cloth", bone="head"))
        brim = [hc + V((math.cos(a) * 0.212 * k, 0.005 * k + math.sin(a) * 0.204 * k, 0.034 * k + dz)) for a in
                [i / 24 * math.tau for i in range(25)]]
        out.append(B.Piece(M.tube("hatrim", brim, 0.006 * k, 4), bam, "cloth", bone="head"))
        bz = hc.z + 0.06 * k + dz
        band = hug.path(G.collar("khua", V((hc.x, hc.y + 0.005 * k, bz)), 0.1 * k, 0.1 * k, 24), 0.004 * k)
        out.append(B.Piece(M.tube("hatband", band, 0.0045 * k, 4), bam, "cloth", bone="head"))
        for sd in (-1, 1):
            st = [hc + V((sd * 0.1 * k, 0.0, bz - hc.z)), hc + V((sd * 0.1 * k, -0.03 * k, -0.02 * k)),
                  hc + V((sd * 0.07 * k, -0.07 * k, -0.08 * k)), hc + V((sd * 0.02 * k, -0.09 * k, -0.11 * k))]
            out.append(B.Piece(M.tube(f"hatcord{sd}", hug.path(st, 0.003 * k), 0.0025 * k, 4), rope, "cloth",
                               bone="head"))
        # Cung trúc: tay trái nắm giữa thân cung, hai đầu cong về phía người bắn, dây cung căng sau tay cầm.
        g = G.grip_point(J, "L", k)
        H = 0.27 * k
        pts = [g + V((0, 0.06 * k * t * t, H * t)) for t in [i / 18 * 2 - 1 for i in range(19)]]
        top, bot = pts[-1], pts[0]
        out.append(B.Piece(M.tube("bow", pts, [BOW_R * k * (1.25 - 0.45 * abs(i / 9 - 1)) for i in range(19)], 6),
                           bam, "cloth", bone="bow"))
        mid = (top + bot) / 2
        for a_, b_ in ((top, mid), (mid, bot)):
            out.append(B.Piece(M.tube(f"bowstr{a_.z:.2f}", [a_, b_], 0.0013 * k, 4), rope, "cloth", bone="bstr"))
        for p in (top, bot, g + V((0, 0, 0.035 * k)), g - V((0, 0, 0.035 * k))):
            out.append(B.Piece(M.tube(f"bowtie{p.z:.3f}", [p + V((0, 0, -0.01 * k)), p + V((0, 0, 0.01 * k))],
                                      BOW_R * k * 1.25, 6), rope, "cloth", bone="bow"))
        # Mũi tên đặt trên tay cầm cung (lệch sang ngoài thân cung), đuôi gác vào dây.
        ar0, ar1 = mid + V((0.009 * k, 0, 0)), mid + V((0.009 * k, -0.3 * k, 0))
        out.append(B.Piece(M.tube("nockarrow", [ar0, ar1], 0.0028 * k, 4), bam, "cloth", bone="nock"))
        out.append(B.Piece(M.cone("nockhead", 0.006 * k, 0.0005 * k, 0.025 * k, 5, ar1, V((0, -1, 0))), rope, "cloth",
                           bone="nock"))
        out.append(B.Piece(M.leaf("nockfl", 0.05 * k, 0.012 * k, ar0 + V((0, -0.005 * k, 0)), V((0, -1, 0)),
                                  up=(0, 0, 1), curl=0.05, seg=2, thick=0.002 * k), leaf, "cloth", bone="nock"))
        # Ống tên bọc lá áp sát lưng, chéo từ hông phải lên vai trái; dây đeo vắt chéo ngực.
        ch = J["chest"]
        R = 0.03 * k
        a = hug.on(ch + V((-0.05 * k, 0.085 * k, -0.14 * k)), R + 0.006 * k)
        b = hug.on(ch + V((0.06 * k, 0.1 * k, 0.12 * k)), R + 0.006 * k)
        qp = [a + (b - a) * (i / 8) for i in range(9)]
        qp = [hug.on(q, R + 0.006 * k) for q in qp]
        out.append(B.Piece(M.tube("quiver", qp, [R * (0.85 + 0.15 * math.sin(i / 8 * math.pi)) for i in range(9)], 8),
                           leaf, "cloth", bone="chest"))
        d = (b - a).normalized()
        for i in range(5):
            o = qp[1 + i]
            nb = (o - hug.on(o)).normalized()
            ql = M.leaf(f"qwrap{i}", 0.09 * k, 0.03 * k, o + nb * R * 0.9, V((0.2 * (i % 2 * 2 - 1), 1, -0.4)),
                        up=d, curl=0.4, seg=3, thick=0.003 * k)
            out.append(B.Piece(ql, leaf, "cloth", bone="chest"))
        for i in range(4):
            off = V((0.012 * k * (i % 2 * 2 - 1), 0.01 * k * (i // 2 * 2 - 1), 0))
            s0 = b + off - d * 0.04 * k
            s1 = b + off + d * (0.09 + 0.02 * i) * k
            out.append(B.Piece(M.tube(f"arrow{i}", [s0, s1], 0.0028 * k, 4), bam, "cloth", bone="chest"))
            fl = M.leaf(f"fletch{i}", 0.05 * k, 0.014 * k, s1 - d * 0.035 * k, d, up=(0, 1, 0), curl=0.1, seg=2,
                        thick=0.002 * k)
            out.append(B.Piece(fl, leaf, "cloth", bone="chest"))
        # Dây đeo: hai vòng buộc quanh ống tên, nối qua vai trái và hông phải, ôm sát ngực.
        for t in (0.2, 0.8):
            c = a + (b - a) * t
            ring = [c + (d.orthogonal().normalized() * math.cos(q) + d.cross(d.orthogonal().normalized()) * math.sin(q))
                    * (R * 1.05) for q in [i / 12 * math.tau for i in range(13)]]
            out.append(B.Piece(M.tube(f"qband{t}", ring, 0.004 * k, 4), rope, "cloth", bone="chest"))
        sp = [b, ch + V((0.075 * k, -0.02 * k, 0.07 * k)), ch + V((0.03 * k, -0.08 * k, 0.02 * k)),
              ch + V((-0.03 * k, -0.08 * k, -0.06 * k)), ch + V((-0.075 * k, -0.02 * k, -0.12 * k)), a]
        fine = []
        for p0, p1 in zip(sp, sp[1:]):
            fine += [p0 + (p1 - p0) * (j / 4) for j in range(4)]
        fine.append(sp[-1])
        strap = [fine[0]] + hug.path(fine[1:-1], 0.005 * k) + [fine[-1]]
        out.append(B.Piece(M.tube("qstrap", strap, 0.0045 * k, 4), rope, "cloth", bone="chest"))
        return out

    @staticmethod
    def post(low, arm, bones):
        """Hai đầu dây cung theo thân cung, chỉ đoạn giữa theo xương bstr."""
        bw = arm.data.bones["bow"]
        top_z = bw.head_local.z
        vg_b, vg_s = low.vertex_groups["bow"], low.vertex_groups["bstr"]
        for v in low.data.vertices:
            if any(gr.group == vg_s.index and gr.weight > 0.5 for gr in v.groups):
                w = max(0.0, 1 - abs(v.co.z - top_z) / (0.27 * 1.06))
                vg_s.add([v.index], w, "REPLACE")
                vg_b.add([v.index], 1 - w, "REPLACE")


def build(args):
    G.build_common("archer", args, CFG, Extra)
