"""Yêu Rừng Cung Thủ: Yêu Rừng lớn tuổi, nón lá trúc, cung từ một đốt trúc cong, ống tên bọc lá trên lưng."""
import math

from mathutils import Vector as V

import build as B
import mlib as M
import sp_goblin as G

CFG = dict(k=1.06, hunch=0.03, crown=False, leaf_green=(0.36, 0.48, 0.2),
           cloth=((0.3, 0.38, 0.2), (0.16, 0.2, 0.12)),
           skin=((0.33, 0.42, 0.24), (0.15, 0.21, 0.15), (0.58, 0.6, 0.38)))


class Extra:
    @staticmethod
    def bones(J, k):
        w = J["wristL"]
        return [("bow", w, w + V((0, -0.02, 0.14)) * 1, "handL")]

    @staticmethod
    def pieces(J, k, sid, rope, bones):
        out = []
        bam = G.mat_bamboo(f"{sid}_bamboo", (0.6, 0.58, 0.3), nodes_z=(0.25, 0.55, 0.8))
        hat_m = G.mat_bamboo(f"{sid}_hat", (0.74, 0.64, 0.36), nodes_z=tuple(J["head"].z + (0.03 + 0.012 * i) * k for i in range(8)))
        leaf = G.mat_leaf(f"{sid}_qleaf", (0.4, 0.5, 0.18), (0.7, 0.55, 0.25))
        hc = J["head"]
        # Nón lá: hình nón thấp, vành uốn, dây buộc dưới cằm.
        rings = []
        for i, (r, z) in enumerate(((0.21, 0.035), (0.2, 0.045), (0.15, 0.075), (0.09, 0.105), (0.035, 0.13), (0.004, 0.14))):
            rings.append(M.ring(hc + V((0, 0.005 * k, z * k)), (V((1, 0, 0)), V((0, 1, 0))), r * k, r * k * 0.96, 20))
        hat = M.loft("hat", rings, closed_ends=True)
        out.append(B.Piece(hat, hat_m, "cloth", bone="head"))
        brim = [hc + V((math.cos(a) * 0.212 * k, 0.005 * k + math.sin(a) * 0.204 * k, 0.034 * k)) for a in
                [i / 24 * math.tau for i in range(25)]]
        out.append(B.Piece(M.tube("hatrim", brim, 0.006 * k, 5), bam, "cloth", bone="head"))
        for sd in (-1, 1):
            st = [hc + V((sd * 0.09 * k, -0.01 * k, 0.04 * k)), hc + V((sd * 0.075 * k, -0.06 * k, -0.07 * k)),
                  hc + V((0, -0.1 * k, -0.11 * k))]
            out.append(B.Piece(M.tube(f"hatcord{sd}", st, 0.0025 * k, 4), rope, "cloth", bone="head"))
        # Cung: một đốt trúc cong, hai đầu buộc dây, dây cung căng.
        w = J["wristL"] + V((0.0, -0.012 * k, 0))
        H = 0.27 * k
        pts, top, bot = [], None, None
        for i in range(19):
            t = i / 18 * 2 - 1
            p = w + V((0.006 * k, -0.06 * k * (1 - t * t) + 0.012 * k, H * t))
            pts.append(p)
        top, bot = pts[-1], pts[0]
        out.append(B.Piece(M.tube("bow", pts, [0.006 * k * (1.25 - 0.45 * abs(i / 9 - 1)) for i in range(19)], 6),
                           bam, "cloth", bone="bow"))
        out.append(B.Piece(M.tube("bowstr", [top, (top + bot) / 2 + V((0, 0.03 * k, 0)), bot], 0.0012 * k, 3),
                           rope, "cloth", bone="bow"))
        for p in (top, bot):
            out.append(B.Piece(M.tube(f"bowtie{p.z:.2f}", [p + V((0, 0, -0.012 * k)), p + V((0, 0, 0.012 * k))],
                                      0.0085 * k, 5), rope, "cloth", bone="bow"))
        # Ống tên bọc lá trên lưng, chéo từ hông phải lên vai trái; bốn mũi tên trúc lông lá.
        ch = J["chest"]
        a = ch + V((-0.05 * k, 0.085 * k, -0.14 * k))
        b = ch + V((0.06 * k, 0.1 * k, 0.12 * k))
        qp = [a + (b - a) * (i / 8) for i in range(9)]
        out.append(B.Piece(M.tube("quiver", qp, [0.03 * k * (0.85 + 0.15 * math.sin(i / 8 * math.pi)) for i in range(9)], 10),
                           leaf, "cloth", bone="chest"))
        d = (b - a).normalized()
        for i in range(5):
            o = a + (b - a) * (0.15 + i * 0.17)
            ql = M.leaf(f"qwrap{i}", 0.09 * k, 0.03 * k, o + V((0, 0.03 * k, 0)), V((0.2 * (i % 2 * 2 - 1), 1, -0.4)),
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
        out.append(B.Piece(M.tube("qstrap", [a + V((0, -0.02 * k, 0)), ch + V((0.0, -0.075 * k, 0.03 * k)),
                                             b + V((0, -0.02 * k, 0))], 0.004 * k, 4), rope, "cloth", bone="chest"))
        return out


def build(args):
    G.build_common("archer", args, CFG, Extra)
