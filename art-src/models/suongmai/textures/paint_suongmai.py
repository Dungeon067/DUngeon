# Vẽ texture Sương Mai trên khung UV xuất từ VRoid (dùng vị trí 3D từng điểm ảnh để định vùng).
# Chạy: python paint_suongmai.py <vrm gốc từ VRoid> <thư mục ảnh gốc đã tách> <thư mục ra>
import sys,os,numpy as np
from PIL import Image,ImageFilter
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from smlib import V
VRM,SRC,OUT=sys.argv[1:4]; os.makedirs(OUT,exist_ok=True)
v=V(VRM)
def hx(h): return np.array([int(h[i:i+2],16) for i in (1,3,5)],np.float32)
SHIRT,TRIM,ARMOR,SKIN=hx('#e9f2fb'),hx('#3aa6f5'),hx('#24466e'),hx('#f6d6bc')
ASH,BRONZE,LEG,WHITE=hx('#8a8f96'),hx('#b07a3a'),hx('#1d2c47'),hx('#f7fbff')
def src(i): return np.array(Image.open([os.path.join(SRC,f) for f in os.listdir(SRC) if f.startswith(f'img{i}_')][0]).convert('RGBA')).astype(np.float32)
def blur(a,s):
    from scipy.ndimage import gaussian_filter
    return gaussian_filter(a.astype(np.float32),s)
def g(d,s): return np.exp(-(d/s)**2)
def blend(img,mask,col,a=1.0):
    m=(np.clip(mask,0,1)*a)[...,None]; img[...,:3]=img[...,:3]*(1-m)+np.asarray(col,np.float32)*m
def shade_from(base,keep,bl=6,grow=0):
    """độ sáng tương đối của texture gốc (giữ bóng đổ VRoid), bỏ các điểm vẽ sẵn (sọc/khóa)"""
    if grow: keep=~(np.array(Image.fromarray((~keep*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(grow)))>0)
    lum=base[...,:3].mean(-1); med=np.median(lum[keep]); l=np.where(keep,lum,med)
    l=blur(l,bl)
    return np.clip(l/med,0.7,1.15)
def wave(s,t,lam,w=0.13):
    """họa tiết sóng nước cách điệu trong dải viền: s dọc dải (m), t ngang dải 0..1"""
    ph=2*np.pi*s/lam; c=0.5+0.22*np.sin(ph); crest=np.clip(np.sin(ph),0,1)**6
    line=g(t-c,w*0.5)+0.8*g(np.hypot((np.mod(s,lam)/lam-0.25)*3.0,t-0.78),0.09)*crest
    return np.clip(line,0,1)
def stitch(d,along,period=0.009,w=0.0011):
    return g(d,w)*(np.mod(along,period)<period*0.55)

# ---------- ÁO (Tops, 2048) ----------
S=2048; base=src(14); P,M=v.raster(10,S); x,y,z=P[...,0],P[...,1],P[...,2]
ax=np.abs(x); r,gch,b=base[...,0],base[...,1],base[...,2]
red=(r>gch+40)&(r>b+30)                                          # nền đỏ gốc, bỏ sọc trắng/vàng, khóa kéo, cổ đen
sh=np.minimum(shade_from(base,red,6,13),1.02)
img=np.zeros((S,S,4),np.float32); img[...,3]=base[...,3]
img[...,:3]=SHIRT*sh[...,None]
sleeve=ax>0.165; th=np.arctan2(x,z)
phi=np.arctan2(y-1.302,z)                                        # góc quanh trục tay
# bóng mềm hai sườn, nách và dưới tay
side=np.clip((np.abs(np.sin(th))-0.6)/0.4,0,1)*(~sleeve)
img[...,:3]*= (1-0.10*side)[...,None]
img[...,:3]*= (1-0.12*np.clip((1.30-y)/0.03,0,1)*np.clip(-np.sin(phi),0,1)*sleeve)[...,None]
# nếp gấp khuỷu tay
fold=np.zeros((S,S),np.float32)
for o,a in [(-0.022,0.6),(0.0,1.0),(0.02,0.7),(0.04,0.4)]:
    fold+=a*g(ax-(0.33+o+0.01*np.sin(3*phi+o*90)),0.0045)*sleeve
# nếp gấp eo (chéo nhẹ hai bên)
for o,a in [(0.0,1.0),(0.03,0.7),(0.06,0.5)]:
    fold+=a*g(y-(0.97+o+0.035*np.abs(np.sin(th))-0.02*np.cos(4*th)),0.004)*np.clip(np.abs(np.sin(th))*1.6-0.4,0,1)*(~sleeve)
img[...,:3]*=(1-0.18*np.clip(fold,0,1))[...,None]
img[...,:3]+= (8*np.clip(np.roll(fold,-3,0),0,1))[...,None]       # viền sáng cạnh nếp
# viền gấu áo
ymin=0.891; hem=(~sleeve)&(y<ymin+0.03); t=(y-ymin)/0.03
blend(img,hem,TRIM); blend(img,wave(th*0.13,t,0.045)*hem,WHITE,0.9)
img[...,:3]*=(1-0.25*g(y-(ymin+0.03),0.0015)*(~sleeve))[...,None]
blend(img,stitch(y-(ymin+0.038),th*0.13)*(~sleeve),hx('#9fc3e6'))
# cổ đứng
ytop=1.3766; col=(~sleeve)&(y>ytop-0.032); t2=(ytop-y)/0.032
blend(img,col,TRIM); blend(img,wave(th*0.07,t2,0.03)*col,WHITE,0.9)
blend(img,stitch(y-(ytop-0.04),th*0.07)*(~sleeve),hx('#9fc3e6'))
# cổ tay: dải xanh nước buộc dây
xmax=0.5586; cuff=ax>xmax-0.035; t3=(xmax-ax)/0.035
blend(img,cuff,TRIM); blend(img,wave(phi*0.04,t3,0.03)*cuff,WHITE,0.85)
blend(img,g(ax-(xmax-0.0175),0.0025),hx('#1f6fb0'),0.9)         # dây buộc
blend(img,stitch(ax-(xmax-0.043),phi*0.04)*sleeve,hx('#9fc3e6'))
# đường may vai, sườn, nẹp tay
blend(img,stitch(ax-0.168,phi*0.04)*(y>1.2),hx('#b9c7d6'))
blend(img,stitch(np.abs(np.sin(th))-0.995,y,0.009,0.004)*(~sleeve)*(y<ytop-0.04)*(y>ymin+0.04),hx('#b9c7d6'))
# vạt cài chéo bên phải (nẹp xanh + khuy vải)
front=z>0
pl=(x-(-0.75*(1.33-y)))                                          # đường chéo từ cổ xuống nách phải
plm=front&(x<0.0)&(y>1.12)&(y<ytop-0.03)
blend(img,g(pl,0.004)*plm,TRIM); blend(img,g(pl+0.012,0.0012)*plm,hx('#b9c7d6'),0.8)
img[...,:3]*=(1-0.15*g(pl+0.007,0.003)*plm)[...,None]
for yy in (1.30,1.24,1.18):
    bx=-0.75*(1.33-yy); d=np.hypot(x-bx,y-yy)
    blend(img,g(d,0.006)*front,hx('#2b7fc4')); blend(img,g(d-0.001,0.002)*front*(y>yy),WHITE,0.6)
# đai lưng chàm bản rộng, nút vuông bên trái
belt=(~sleeve)&(y>0.955)&(y<1.005)
blend(img,belt,ARMOR); img[...,:3]*=(1-0.18*belt*np.clip((y-0.955)/0.05,0,1)[...,])[...,None]
blend(img,stitch(y-0.960,th*0.13)*(~sleeve)+stitch(y-1.000,th*0.13)*(~sleeve),hx('#5a7ea8'))
img[...,:3]*=(1-0.3*(g(y-0.955,0.002)+g(y-1.005,0.002))[...,None]*(~sleeve)[...,None])
kn=(np.abs(th-1.35)*0.13<0.025)&(np.abs(y-0.98)<0.028)&(~sleeve)
blend(img,kn,hx('#1a3456')); blend(img,(np.abs(th-1.35)*0.13<0.021)&(np.abs(y-0.98)<0.024)&(~sleeve),hx('#2c5584'))
blend(img,g(np.abs(th-1.35)*0.13-0.021,0.0015)*(np.abs(y-0.98)<0.024)*(~sleeve),hx('#5a7ea8'))
# giáp da chàm: ngực trái + vai trái
chest=front&(x>0.012)&(x<0.165)&(y>1.13+0.18*(x-0.09)**2/0.0081*0.03)&(y<ytop-0.03)
shoulder=(x>0.10)&(x<0.255)&(np.sin(phi)>-0.25)&(y>1.24)
arm=chest|shoulder
d_in=np.array(Image.fromarray((arm*255).astype(np.uint8)).filter(ImageFilter.MinFilter(9)))>0
leather=ARMOR*(0.9+0.12*np.clip(np.sin(phi*2)*0.5+0.5,0,1)*shoulder[...,]+0.0)[...,None] if False else ARMOR
blend(img,arm,leather)
nz=np.clip(blur(np.random.default_rng(1).normal(0.5,0.6,(S,S)),2),0,1)
img[...,:3]*=np.where(arm,0.92+0.12*nz,1)[...,None]
edge=arm&~d_in
blend(img,edge,hx('#3a6595'))
inner=d_in&~(np.array(Image.fromarray((d_in*255).astype(np.uint8)).filter(ImageFilter.MinFilter(7)))>0)
blend(img,inner*(np.mod(y*400+x*400,2)<1.1),hx('#7fa6cf'))             # đường may giáp
for o in (0.0,0.035):                                                      # nẹp vai chồng lớp
    blend(img,g(ax-(0.205+o),0.003)*shoulder*(x>0),hx('#16304f'))
img[...,:3]*=(1-0.22*g(blur(arm,5)-0.15,0.12)*(~arm))[...,None]
# dây chéo sau lưng: vai trái -> eo phải
back=z<0
dl=np.abs((x-0.12)*(1.0-1.28)-(y-1.28)*(-0.15-0.12))/np.hypot(1.0-1.28,-0.15-0.12)
strap=back&(dl<0.014)&(y>1.0)&(y<1.30)&(~sleeve)
blend(img,strap,ARMOR); blend(img,back*(np.abs(dl-0.011)<0.0012)*(y>1.0)*(y<1.3)*(~sleeve),hx('#5a7ea8'))
for k in (0.25,0.6):
    bx,by=0.12+(-0.27)*k,1.28-0.28*k; blend(img,back*(np.abs(x-bx)<0.012)*(np.abs(y-by)<0.009),BRONZE)
img[...,:3]=np.clip(img[...,:3],0,255)
Image.fromarray(np.nan_to_num(img,nan=200).astype(np.uint8),'RGBA').save(f'{OUT}/suongmai_tops.png')

# ---------- VÁY XẾP (Bottoms, 1024x512) ----------
W,H=1024,512; base=src(12); P,M=v.raster(8,W,H); x,y,z=P[...,0],P[...,1],P[...,2]
lum=base[...,:3].mean(-1); keep=lum<150; sh=shade_from(base,keep,1.2,7)
th=np.arctan2(x,z); img=np.zeros((H,W,4),np.float32); img[...,3]=base[...,3]
lines=np.clip((sh-0.75)/0.4,0,1)
img[...,:3]=SHIRT*np.clip(sh*1.03,0.75,1.1)[...,None]
row=np.mgrid[0:H,0:W][0].astype(np.float32); hem=row>436; t=(H-row)/(H-436)
img[...,:3]*=np.clip(1+(sh-1)*2.2,0.55,1.15)[...,None]/np.clip(sh*1.03,0.75,1.1)[...,None]
blend(img,hem,TRIM); col_=np.mgrid[0:H,0:W][1]/W*1.4
blend(img,wave(col_,t,0.05)*hem,WHITE,0.9)
blend(img,stitch(row-428,col_,0.009,1.2),hx('#9fc3e6'))
img[...,:3]*=(1-0.12*np.clip((y-0.86)/0.2,0,1))[...,None]         # tối dần lên dưới vạt áo
# hai dải đai rủ bên trái (theo spring bone váy)
for c,w0 in [(1.30,0.022),(1.46,0.018)]:
    tl=(np.abs(th-c)*0.2<w0)&(y>0.78+0.05*(c-1.3)); blend(img,tl,ARMOR)
    blend(img,(np.abs(np.abs(th-c)*0.2-w0+0.004)<0.0012)&(y>0.79),hx('#5a7ea8'))
    blend(img,(np.abs(th-c)*0.2<w0)&(np.abs(y-(0.79+0.05*(c-1.3)))<0.008),hx('#3aa6f5'))
img[...,:3]=np.clip(img[...,:3],0,255)
Image.fromarray(np.nan_to_num(img,nan=200).astype(np.uint8),'RGBA').save(f'{OUT}/suongmai_skirt.png')

# ---------- BỐT (Shoes_01 / Shoes_02) ----------
def ramp(l,stops):
    xs=np.array([s[0] for s in stops]); return np.stack([np.interp(l,xs,[s[1][i] for s in stops]) for i in range(3)],-1)
for i,name in [(13,'suongmai_boots.png'),(18,'suongmai_bootstrap.png')]:
    base=src(i); l=base[...,:3].mean(-1)/255
    if i==13: col=ramp(l,[(0,hx('#2b2f36')),(0.25,hx('#5d636b')),(0.45,ASH),(0.7,hx('#c3c8cf')),(1,hx('#f0f2f5'))])
    else:     col=ramp(l,[(0,hx('#0f1c30')),(0.35,ARMOR),(0.6,hx('#3a6595')),(0.8,hx('#c79a5a')),(1,hx('#f2d9a8'))])
    out=base.copy(); out[...,:3]=col
    Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA').save(f'{OUT}/{name}')
# ---------- CHÂN + GĂNG (lớp phủ trong suốt cho Body, 2048) ----------
S=2048; base=src(10); P,M=v.raster(7,S); x,y,z=P[...,0],P[...,1],P[...,2]; ax=np.abs(x)
out=np.zeros((S,S,4),np.float32)
tight=(np.abs(base[...,0]-90)<25)&(np.abs(base[...,1]-67)<25)&(np.abs(base[...,2]-73)<25)
l=base[...,:3].mean(-1); l=np.clip(l/np.median(l[tight]),0.75,1.25)
out[tight,:3]=(LEG*l[...,None])[tight]; out[tight,3]=255
wx=0.544; tipx=0.650
glove=M&(ax>wx-0.006)&(ax<tipx)&(y>1.2)
glove=np.array(Image.fromarray((glove*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)))>0
lb=base[...,:3].mean(-1); lb=np.clip(lb/np.median(lb[glove]),0.8,1.15)
out[glove,:3]=(ARMOR*lb[...,None])[glove]; out[glove,3]=255
knuck=glove&(np.abs(ax-0.600)<0.004); out[knuck,:3]=hx('#3a6595')
cord=M&(ax>wx-0.002)&(ax<wx+0.010)&(y>1.2); out[cord,:3]=TRIM; out[cord,3]=255
Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA').save(f'{OUT}/suongmai_body_overlay.png')
# ---------- DÂY CỔ + MÓC CÂU ĐỒNG (vòng cổ, 2048) ----------
base=src(17); a=base[...,3]; out=np.zeros_like(base)
gold=(base[...,0]>base[...,2]+25)&(a>10)
out[gold,:3]=TRIM*0.8; out[gold,3]=a[gold]
cy,cx=np.mgrid[0:S,0:S]; ys,xs=np.nonzero(a[250:340,960:1100]>10); py,px=250+ys.mean(),960+xs.mean()
rr=np.hypot(cx-px,cy-(py+4))
hook=((np.abs(rr-11)<3.2)&(cy>py+4))|((np.abs(cx-(px+11))<3.2)&(cy<py+4)&(cy>py-22))|((np.abs(cx-(px-11))<3.0)&(cy>py-4)&(cy<py+6))
out[hook,:3]=BRONZE; out[hook,3]=255
Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA').save(f'{OUT}/suongmai_necklace.png')
print('ok')
