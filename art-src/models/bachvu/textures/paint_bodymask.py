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
# áo lót ngà lộ ở cổ áo + chốt ngọc phong giọt nước (~3 cm) ở giữa ngực
def hx(h): return np.array([int(h[i:i+2],16) for i in (1,3,5)],np.float32)
img=base.astype(np.float32)
shirt=M&(ax<0.17)&(y>1.2)&(y<1.415-np.clip(0.05-ax,0,None)*0.6)
img[...,:3]=np.where(shirt[...,None],hx('#f4ecd8')*(0.93+0.07*np.cos(x*120))[...,None]*np.where(y>1.40,0.9,1)[...,None],img[...,:3])
img[...,3]=np.where(shirt,255,img[...,3])
dx,dy=x/0.011,(y-1.372)/0.017; r=dx**2+np.where(dy<0,dy*0.7,dy*1.5)**2
gem=M&(z>0)&(r<1); ring=M&(z>0)&(r>=1)&(r<1.45)
img[...,:3]=np.where(gem[...,None],(hx('#45dfb1')*(1.15-0.35*np.clip(dy+0.3,0,1))[...,None]),img[...,:3])
img[...,:3]=np.where((gem&(np.hypot(dx+0.35,dy-0.45)<0.28))[...,None],hx('#e6fff7'),img[...,:3])
img[...,:3]=np.where(ring[...,None],hx('#b08a55'),img[...,:3])
img[...,3]=np.where(gem|ring,255,img[...,3])
Image.fromarray(np.clip(img,0,255).astype(np.uint8)).save(OUT); print('shirt px',int(shirt.sum()),'gem',int(gem.sum()))
