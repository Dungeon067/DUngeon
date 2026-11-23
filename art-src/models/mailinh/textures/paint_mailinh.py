# Vẽ texture Mai Linh trên khung UV xuất từ VRoid (dùng vị trí 3D từng điểm ảnh để định vùng).
# Chạy: python paint_mailinh.py <vrm từ VRoid> <thư mục ảnh gốc đã tách (dump.py)> <thư mục ra> [thư mục ảnh gốc của áo, nếu khác]
import sys,os,numpy as np
from PIL import Image,ImageFilter
from scipy.ndimage import gaussian_filter
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from smlib import V
VRM,SRC,OUT=sys.argv[1:4]; SRC_TOPS=sys.argv[4] if len(sys.argv)>4 else SRC; os.makedirs(OUT,exist_ok=True)
v=V(VRM)
def hx(h): return np.array([int(h[i:i+2],16) for i in (1,3,5)],np.float32)
RED,GOLD,TASSEL,FIRE=hx('#d1495b'),hx('#ffd27a'),hx('#a8323f'),hx('#ff6a2a')
PAPER,BAMBOO,BRONZE,CREAM=hx('#b48a5a'),hx('#d9b77a'),hx('#c98a3a'),hx('#fff1cf')
def src(i,d=None):
    d=d or SRC; return np.array(Image.open([os.path.join(d,f) for f in os.listdir(d) if f.startswith(f'img{i}_')][0]).convert('RGBA')).astype(np.float32)
def g(d,s): return np.exp(-(d/s)**2)
def blend(img,mask,col,a=1.0):
    m=(np.clip(np.nan_to_num(mask),0,1)*a)[...,None]; img[...,:3]=img[...,:3]*(1-m)+np.asarray(col,np.float32)*m
def mul(img,f): img[...,:3]*=np.nan_to_num(f,nan=1.0)[...,None]
def shade_from(base,keep,bl=6):
    lum=base[...,:3].mean(-1); med=np.median(lum[keep]); l=gaussian_filter(np.where(keep,lum,med),bl)
    return np.clip(l/med,0.72,1.15)
def stitch(d,along,period=0.008,w=0.0011): return g(d,w)*(np.mod(along,period)<period*0.55)
def flower(u,w,sp,R,stag=True):
    """họa tiết hoa năm cánh lặp lại (u,w: toạ độ mặt vải theo mét)"""
    row=np.round(w/sp); cu=np.round((u-(row%2)*sp*0.5*stag)/sp)*sp+(row%2)*sp*0.5*stag; cw=row*sp
    du,dw=u-cu,w-cw; r=np.hypot(du,dw); a=np.arctan2(dw,du)
    petal=r<R*(0.5+0.5*np.abs(np.cos(2.5*a))); core=r<R*0.28
    return petal&~core, core
def flames(s,t,lam):
    """lưỡi lửa cách điệu mọc từ mép dưới dải (t=0 mép, t=1 trong)"""
    ph=np.mod(s/lam,1.0); h=0.35+0.6*np.abs(np.sin(np.pi*ph))**2.5
    wob=0.08*np.sin(2*np.pi*(s/lam*2+t*1.5))
    outer=t<h+wob; inner=t<(h*0.55+wob*0.5)
    return outer,inner
def lantern(u,w,cu,cw,R):
    du,dw=(u-cu)/R,(w-cw)/R
    body=(du/0.75)**2+(dw/1.0)**2<1; caps=(np.abs(du)<0.45)&(np.abs(np.abs(dw)-1.0)<0.18)
    ribs=body&(np.abs(np.abs(du)-0.38)<0.07); tas=(np.abs(du)<0.08)&(dw<-1.1)&(dw>-2.0)
    glow=body&((du/0.35)**2+(dw/0.5)**2<1)
    return body,caps,ribs,tas,glow
rng=np.random.default_rng(7)
def fiber(sh): return np.clip(gaussian_filter(rng.normal(0,1,sh),[0.6,3.0]),-2,2)

# ---------- ÁO (Tops, 2048) ----------
S=2048; base=src(14,SRC_TOPS); P,M=v.raster(10,S); x,y,z=P[...,0],P[...,1],P[...,2]; ax=np.abs(x)
lum=base[...,:3].mean(-1); keep=M&(base[...,3]>0)
sh=np.clip(1+(shade_from(base,keep,14)-1)*1.3,0.82,1.06)
img=np.zeros((S,S,4),np.float32); img[...,3]=base[...,3]; img[...,:3]=RED*sh[...,None]
sleeve=ax>0.125; th=np.arctan2(x,z); phi=np.arctan2(y-0.966,z); front=z>0
ymin=np.nanmin(np.where(M&~sleeve,y,np.nan)); ytop=np.nanmax(np.where(M&~sleeve,y,np.nan)); xmax=np.nanmax(np.where(M,ax,np.nan))
# bóng sườn, dưới tay
mul(img,1-0.10*np.clip((np.abs(np.sin(th))-0.6)/0.4,0,1)*(~sleeve))
mul(img,1-0.14*np.clip(-np.sin(phi),0,1)*sleeve)
# hoa mai năm cánh rải đều
pet,core=flower(np.where(sleeve,ax,th*0.11),np.where(sleeve,phi*0.04,y),0.045,0.010)
blend(img,pet*M,hx('#e8707e'),0.85); blend(img,core*M,GOLD,0.9)
# nếp gấp khuỷu tay và eo
fold=np.zeros((S,S),np.float32)
for o,a in [(-0.018,0.6),(0.0,1.0),(0.016,0.7),(0.032,0.4)]:
    fold+=a*g(ax-(0.262+o+0.008*np.sin(3*phi+o*90)),0.004)*sleeve
for o,a in [(0.0,1.0),(0.025,0.6)]:
    fold+=a*g(y-(0.80+o+0.025*np.abs(np.sin(th))-0.015*np.cos(4*th)),0.0035)*np.clip(np.abs(np.sin(th))*1.6-0.4,0,1)*(~sleeve)
mul(img,1-0.22*np.clip(fold,0,1)); img[...,:3]+=(10*np.clip(np.roll(fold,-3,0),0,1))[...,None]
# viền vàng: gấu (lửa), cổ, cổ tay
hem=(~sleeve)&(y<ymin+0.03); t=(y-ymin)/0.03
blend(img,hem,GOLD); o_,i_=flames(th*0.11,t,0.03); blend(img,o_*hem,FIRE,0.9); blend(img,i_*hem,RED,0.9)
mul(img,1-0.25*g(y-(ymin+0.03),0.0015)*(~sleeve)); blend(img,stitch(y-(ymin+0.036),th*0.11)*(~sleeve),hx('#ffe6a8'))
col=(~sleeve)&(y>ytop-0.022); blend(img,col,GOLD); blend(img,g(y-(ytop-0.011),0.0016)*col,TASSEL,0.8)
blend(img,stitch(y-(ytop-0.028),th*0.07)*(~sleeve),hx('#ffe6a8'))
cuff=ax>xmax-0.026; t3=(xmax-ax)/0.026
blend(img,cuff,GOLD); o_,i_=flames(phi*0.035,t3,0.02); blend(img,o_*cuff,FIRE,0.85); blend(img,i_*cuff,RED,0.85)
blend(img,stitch(ax-(xmax-0.032),phi*0.035)*sleeve,hx('#ffe6a8'))
# đường may vai, sườn
blend(img,stitch(ax-0.127,phi*0.035)*(y>0.9),hx('#f08a96')); 
blend(img,stitch(np.abs(np.sin(th))-0.9995,y,0.008,0.0006)*(~sleeve)*(y<ytop-0.03)*(y>ymin+0.04),hx('#f08a96'))
# nẹp cúc vàng giữa ngực (thay khóa kéo)
pl=front&(np.abs(x)<0.008)&(y>0.76)&(y<ytop-0.02); blend(img,pl,GOLD); blend(img,front*g(np.abs(x)-0.008,0.0012)*(y>0.76)*(y<ytop-0.02),TASSEL,0.7)
for yy in (0.97,0.92,0.87,0.82):
    d=np.hypot(x,y-yy); blend(img,(d<0.0075)*front,hx('#e0a640')); blend(img,(d<0.005)*front,GOLD); blend(img,(np.hypot(x+0.002,y-yy-0.002)<0.0018)*front,CREAM)
# thắt lưng vải đỏ đậm + nơ trước bên trái
sash=(~sleeve)&(y>0.745)&(y<0.775); blend(img,sash,TASSEL); mul(img,1-0.25*sash*np.clip((0.775-y)/0.03,0,1))
blend(img,(stitch(y-0.749,th*0.11)+stitch(y-0.771,th*0.11))*(~sleeve),hx('#e06070'))
for sgn in (-1,1):
    bx,by=0.055+sgn*0.022,0.762; d=np.hypot((x-bx)/1.3,y-by)
    blend(img,front*(d<0.014),hx('#c23a4d')); blend(img,front*(np.abs(d-0.012)<0.0015),TASSEL)
blend(img,front*(np.hypot(x-0.055,y-0.762)<0.007),TASSEL)
for k,dx in ((0,0.012),(1,0.024)):
    tl=front*(np.abs(x-(0.05+dx)+0.25*(0.755-y))<0.004)*(y<0.755)*(y>0.70+0.01*k); blend(img,tl,hx('#c23a4d'))
# tạp dề giấy nâu phía trước dưới thắt lưng, 3 túi, nan tre ở túi trái
ap=front&(np.abs(x)<0.125)&(y<0.745)&(~sleeve)
blend(img,ap,PAPER); mul(img,np.where(ap,1+0.06*fiber((S,S)),1)); mul(img,1-0.15*ap*np.clip((0.745-y)/0.12,0,1)*0)
eap=ap&~(np.array(Image.fromarray((ap*255).astype(np.uint8)).filter(ImageFilter.MinFilter(9)))>0)
blend(img,eap,hx('#8a6440')); blend(img,stitch(np.abs(x)-0.118,y)*front*(y<0.745)+stitch(y-(ymin+0.006),x)*ap,hx('#e2c79a'))
for cx in (-0.075,0.0,0.075):
    pk=ap&(np.abs(x-cx)<0.032)&(y>ymin+0.012)&(y<0.70)
    blend(img,pk,hx('#a67c4e')); mul(img,1-0.25*g(y-0.70,0.002)*ap*(np.abs(x-cx)<0.032))
    blend(img,(stitch(np.abs(x-cx)-0.029,y)+stitch(y-0.697,x))*pk,hx('#e2c79a'))
    blend(img,(np.hypot(x-cx,y-0.69)<0.004)*ap,TASSEL)
for k,bxx in enumerate((0.060,0.068,0.076,0.084,0.092)):
    bam=front*(np.abs(x-bxx-0.04*(y-0.70))<0.0028)*(y>0.69)*(y<0.735+0.006*(k%2)); blend(img,bam,BAMBOO); blend(img,bam*g(np.mod(y,0.015)-0.0075,0.0008),hx('#a8874f'))
img[...,:3]=np.clip(img[...,:3],0,255)
Image.fromarray(np.nan_to_num(img,nan=200).astype(np.uint8),'RGBA').save(f'{OUT}/mailinh_tops.png')

# ---------- VÁY XẾP (Bottoms, 1024x512) ----------
W,H=1024,512; base=src(12); P,M=v.raster(8,W,H); x,y,z=P[...,0],P[...,1],P[...,2]
lum=base[...,:3].mean(-1); keep=M&(lum<235); sh=shade_from(base,keep,1.2)
th=np.arctan2(x,z); img=np.zeros((H,W,4),np.float32); img[...,3]=base[...,3]
SK=hx('#f4cf86'); img[...,:3]=SK*np.clip(1+(sh-1)*2.0,0.6,1.15)[...,None]
y0=np.nanmin(np.where(M,y,np.nan)); s=th*0.15
hem=M&(y<y0+0.03); t=(y-y0)/0.03; o_,i_=flames(s,t,0.035)
blend(img,hem,RED); blend(img,o_*hem,FIRE,0.95); blend(img,i_*hem,GOLD,0.95)
blend(img,stitch(y-(y0+0.036),s),hx('#c9893a'))
for k in range(10):
    cu=(k/10)*2*np.pi*0.15-np.pi*0.15; b,c,r_,ta,gl=lantern(s,y,cu,y0+0.085,0.014)
    if True:
        blend(img,b*M,RED); blend(img,gl*M,FIRE,0.8); blend(img,r_*M,TASSEL,0.8); blend(img,c*M,hx('#e0a640')); blend(img,ta*M,TASSEL)
mul(img,1-0.15*np.clip((y-(y0+0.15))/0.1,0,1))
ap=(z>0)&(np.abs(x)<0.125)
blend(img,ap*M,PAPER); mul(img,np.where(ap&M,(1+0.06*fiber((H,W)))*np.clip(1+(sh-1)*1.2,0.8,1.1),1))
blend(img,(stitch(np.abs(x)-0.118,y,0.008,0.0035)+stitch(y-(y0+0.008),x,0.008,0.0035))*ap*M,hx('#e2c79a'))
blend(img,g(np.abs(x)-0.124,0.002)*(z>0)*M,hx('#8a6440'))
img[...,:3]=np.clip(img[...,:3],0,255)
Image.fromarray(np.nan_to_num(img,nan=200).astype(np.uint8),'RGBA').save(f'{OUT}/mailinh_skirt.png')

# ---------- GIÀY (Shoes, 512x1024): đỏ mai #d1495b, đế gỗ, hoa vàng giữ nguyên ----------
base=src(13); r,gg,b=base[...,0],base[...,1],base[...,2]; out=base.copy()
red=(r>gg+50)&(r>b+40); l=base[...,:3].max(-1)/255
out[red,:3]=(RED[None]*np.clip(l[red]/0.75,0.4,1.25)[:,None])
tan=(r>120)&(gg>90)&(b<120)&(np.abs(r-gg)<70)&~red; out[tan,:3]=(hx('#9a6a3e')[None]*np.clip(l[tan]/0.7,0.6,1.3)[:,None])
Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA').save(f'{OUT}/mailinh_shoes.png')

# ---------- THÂN (lớp phủ trong suốt cho Body, 2048): tất vàng nến, chuông đồng cổ chân trái, dấu hoa lòng bàn tay trái ----------
S=2048; base=src(10); P,M=v.raster(7,S); x,y,z=P[...,0],P[...,1],P[...,2]
out=np.zeros((S,S,4),np.float32); lum=base[...,:3].mean(-1)
sock=M&(y<0.2)&(lum>236)
l=np.clip(lum/np.median(lum[sock]),0.8,1.1)
out[sock,:3]=(hx('#f8e2a6')*l[...,None])[sock]; out[sock,3]=255
ytop=np.nanmax(np.where(sock,y,np.nan)); band=sock&(y>ytop-0.012); out[band,:3]=RED; out[band,3]=255
cand=np.where(M&(x>0)&(np.abs(y-(ytop-0.02))<0.004),x,-1); k=np.unravel_index(np.argmax(cand),cand.shape); pt=P[k]
d=np.linalg.norm(np.nan_to_num(P,nan=9)-pt,axis=-1); bell=M&(d<0.011)
out[bell,:3]=(BRONZE*np.clip(1.25-d[bell,None]/0.011*0.6,0.6,1.3)); out[bell,3]=255
slot=bell&(np.abs(y-pt[1]+0.004)<0.0012); out[slot,:3]=hx('#5a3a1a')
hl=M&(np.linalg.norm(np.nan_to_num(P,nan=9)-(pt+np.array([0,0.004,0.003])),axis=-1)<0.003); out[hl,:3]=hx('#ffe9b8'); out[hl,3]=255
hand=M&(x>0.43)&(x<0.50)&(y<0.966)
yy=np.nanmin(np.where(hand,y,np.nan)); du,dz=x-0.465,z; r_=np.hypot(du,dz); a=np.arctan2(dz,du)
palm=hand&(y<yy+0.01)&(r_<0.012*(0.5+0.5*np.abs(np.cos(2.5*a))))
out[palm,:3]=hx('#ffc75a'); out[palm,3]=200
Image.fromarray(np.clip(np.nan_to_num(out),0,255).astype(np.uint8),'RGBA').save(f'{OUT}/mailinh_body_overlay.png')
print('ok',float(ytop),pt)
