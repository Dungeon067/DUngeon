# Ẩn da thân dưới quần/áo (alpha=0) để da không xuyên qua quần áo khi chuyển động.
# Chạy: python paint_bodymask.py <vrm từ VRoid> <ảnh texture thân đã xuất> <ảnh ra>
import sys,os,numpy as np
from PIL import Image
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from smlib import V
VRM,SRC,OUT=sys.argv[1:4]
v=V(VRM); base=np.array(Image.open(SRC).convert('RGBA')); H,W=base.shape[:2]
P,M=v.raster(7,W,H); x,y,z=P[...,0],P[...,1],P[...,2]; ax=np.abs(x)
hx=abs(v.wpos('J_Bip_L_Hand')[0]); print('hand x',hx)
legs=(y>0.45)&(y<0.98)
torso=(ax<0.2)&(y>=0.98)&(y<1.30)
arms=(ax>0.2)&(ax<hx-0.05)&(y>1.2)
hide=M&(legs|torso|arms)
base[...,3]=np.where(hide,0,base[...,3])
Image.fromarray(base).save(OUT); print('hidden px',int(hide.sum()))
