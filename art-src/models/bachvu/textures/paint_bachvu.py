# Vẽ texture Bạch Vũ trên khung UV xuất từ VRoid (dùng vị trí/pháp tuyến 3D từng điểm ảnh để định vùng).
# Chạy: python paint_bachvu.py <vrm từ VRoid> <thư mục ảnh gốc đã tách (dump.py)> <thư mục ra>
import sys,os,numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from smlib import V
VRM,SRC,OUT=sys.argv[1:4]; os.makedirs(OUT,exist_ok=True)
v=V(VRM)
def hx(h): return np.array([int(h[i:i+2],16) for i in (1,3,5)],np.float32)
WHITE,MINT,MOSS,JADE=hx('#f1f1f1'),hx('#bdf6e4'),hx('#3d7a68'),hx('#45dfb1')
IVORY,SON,ASH,BRONZE,INK=hx('#f4ecd8'),hx('#b8322a'),hx('#8a8f8c'),hx('#b08a55'),hx('#22262b')
MOSSD,LEATHER=hx('#24443b'),hx('#6b4a2e')
def mat_img(m):
    t=v.j['materials'][m]['pbrMetallicRoughness']['baseColorTexture']['index']; return v.j['textures'][t]['source']
def src(i): return np.array(Image.open([os.path.join(SRC,f) for f in os.listdir(SRC) if f.startswith(f'img{i}_')][0]).convert('RGBA')).astype(np.float32)
def g(d,s): return np.exp(-(d/s)**2)
def blend(img,mask,col,a=1.0):
    m=(np.clip(np.nan_to_num(mask),0,1)*a)[...,None]; img[...,:3]=img[...,:3]*(1-m)+np.asarray(col,np.float32)*m
def mul(img,f): img[...,:3]*=np.nan_to_num(f,nan=1.0)[...,None]
def shade_from(base,keep,bl=6,lo=0.78,hi=1.12):
    lum=base[...,:3].mean(-1); med=np.median(lum[keep]); l=gaussian_filter(np.where(keep,lum,med),bl)
    return np.clip(l/med,lo,hi)
rng=np.random.default_rng(11)
def weave(sh,a=0.035): return 1+a*np.clip(gaussian_filter(rng.normal(0,1,sh),[0.7,2.5]),-2,2)
def save(img,name): Image.fromarray(np.clip(np.nan_to_num(img,nan=128),0,255).astype(np.uint8),'RGBA').save(f'{OUT}/{name}')
def load(m):
    i=mat_img(m); base=src(i); H,W=base.shape[:2]
    P,M=v.raster(m,W,H); N,_=v.raster(m,W,H,'NORMAL'); return base,P,M,N
def feathers(u,w,M,spu,spw,L,img,tipcol=MINT,edge=hx('#9fb8b0')):
    """lớp lông vũ xếp vảy, rủ xuống (u: vòng quanh thân, w: chiều cao, mét). Trả về t (0 gốc..1 ngọn) của lông nhìn thấy."""
    T=np.full(u.shape,np.nan,np.float32); DU=np.zeros(u.shape,np.float32); HW=np.ones(u.shape,np.float32)
    r0=np.ceil(w/spw)
    for k in range(int(np.ceil(L/spw))+1):
        r=r0+k; wr=r*spw; off=(r%2)*spu*0.5
        cu=np.round((u-off)/spu)*spu+off; du=u-cu; t=(wr-w)/L
        hw=spu*0.62*np.sqrt(np.clip(1-((t-0.42)/0.58)**2,0,1))
        ins=M&(t>=0)&(t<=1)&(np.abs(du)<hw)
        T=np.where(ins,t,T); DU=np.where(ins,du,DU); HW=np.where(ins,hw,HW)
    vis=~np.isnan(T); t=np.nan_to_num(T); e=np.abs(DU)/np.maximum(HW,1e-6)
    blend(img,vis,WHITE)
    mul(img,np.where(vis,0.86+0.14*np.clip(t/0.25,0,1),1))           # bóng do lông hàng trên phủ xuống
    mul(img,np.where(vis,1-0.06*e**2,1))                              # cong phồng
    barb=0.5+0.5*np.sin((np.abs(DU)*900+t*40))
    mul(img,np.where(vis,1-0.035*barb*(e>0.1),1))                     # sợi lông
    blend(img,vis*np.clip((t-0.62)/0.38,0,1)**1.3,tipcol,0.85)       # ngọn ánh ngọc
    blend(img,vis*g(DU,0.0012)*(t<0.85),hx('#d6dedb'),0.9)           # cuống lông
    blend(img,vis*np.clip((e-0.86)/0.14,0,1),edge,0.8)               # viền mép
    return vis,t

# ---------- ÁO CHOÀNG LÔNG VŨ + TAY ÁO (Tops CLOTH_01/_02) ----------
for m,name in [(10,'bachvu_coat_a.png'),(13,'bachvu_coat_b.png')]:
    base,P,M,N=load(m); x,y,z=P[...,0],P[...,1],P[...,2]; ax=np.abs(x)
    keep=M&(base[...,3]>0); sh=shade_from(base,keep,10)
    img=np.zeros_like(base); img[...,3]=base[...,3]
    sleeve=M&(ax>0.21)&(y>1.12)
    body=M&~sleeve
    rad_b=np.stack([x,np.zeros_like(x),z],-1); rad_s=np.stack([np.zeros_like(x),y-1.38,z],-1)
    outer=np.where(sleeve,(N*rad_s).sum(-1),(N*rad_b).sum(-1))>0
    # tay áo: vải xanh rêu, nếp khuỷu, cổ tay xắn + dây vải buộc
    img[...,:3]=MOSS
    phi=np.arctan2(y-1.38,z)
    mul(img,np.where(sleeve,1-0.16*np.clip(-np.sin(phi),0,1),1))
    fold=sum(a*g(ax-(0.40+o+0.006*np.sin(4*phi+o*80)),0.005) for o,a in [(-0.02,0.6),(0,1),(0.018,0.7)])
    mul(img,1-0.22*fold*sleeve)
    xm=np.nanmax(np.where(sleeve,ax,np.nan))
    cuff=sleeve&(ax>xm-0.07)
    blend(img,cuff,hx('#4f8f7c')); mul(img,np.where(cuff,1-0.18*g(ax-(xm-0.07),0.006),1))
    blend(img,sleeve&(np.abs(ax-(xm-0.035))<0.003)&(np.mod(phi*30,1)<0.55),MINT,0.9)
    tie=sleeve&(np.abs(ax-(xm-0.11))<0.009); blend(img,tie,MOSSD); blend(img,tie*g(ax-(xm-0.11),0.003),hx('#3a6658'),0.6)
    # dây diều đỏ quấn cổ tay trái (x>0)
    cord=sleeve&(x>0)&(ax>xm-0.025)&(np.mod((ax+phi*0.004)*260,1)<0.45)
    blend(img,cord,SON)
    # thân: áo choàng lông hạc trắng
    th=np.arctan2(x,z); u=th*0.16
    vis,t=feathers(u,y,body&outer,0.05,0.055,0.13,img)
    # lót trong: trắng ngà ánh bạc hà
    blend(img,body&~outer,hx('#dcefe8')); mul(img,np.where(body&~outer,0.9+0.1*weave(y.shape,0.4),1))
    # mép gấu cắt thành ngọn lông (alpha)
    bins=np.round(th*12); ymin={}
    for b in np.unique(bins[body]): ymin[b]=np.nanmin(y[body&(bins==b)])
    yb=np.vectorize(lambda b:ymin.get(b,-9))(np.where(body,bins,0)).astype(np.float32)
    f=np.mod(u/0.05+0.5,1)-0.5; hcut=0.03*(1-np.sqrt(np.clip(1-(2*f)**2,0,1)))
    cut=body&(y<yb+hcut)&(yb>0)&(yb<1.0)
    img[...,3]=np.where(cut,0,img[...,3])
    mul(img,np.where(M,sh*weave(sh.shape),1)); save(img,name)
    print(name,'ok',int(sleeve.sum()),int((body&outer).sum()),int(cut.sum()))

# ---------- CỔ CHOÀNG LÔNG DÀY (mũ trùm, N00_005) ----------
base,P,M,N=load(12); x,y,z=P[...,0],P[...,1],P[...,2]
img=np.zeros_like(base); img[...,3]=base[...,3]; img[...,:3]=WHITE
feathers(np.arctan2(x,z)*0.12,y,M,0.032,0.03,0.075,img)
mul(img,np.where(M,shade_from(base,M&(base[...,3]>0),8,0.8,1.1),1)); save(img,'bachvu_collar.png')

# ---------- ÁO TRONG: vạt chéo xanh rêu, cổ ngà, đai, túi, dây diều ----------
base,P,M,N=load(15); x,y,z=P[...,0],P[...,1],P[...,2]; front=z>0.0
img=np.zeros_like(base); img[...,3]=base[...,3]; img[...,:3]=MOSS
mul(img,1-0.12*np.clip((np.abs(x)-0.08)/0.08,0,1))
neck=M&front&(y>1.33)&(np.abs(x)<(y-1.33)*0.55); blend(img,neck,IVORY)
xl=0.06-(1.46-y)*0.27; d=x-xl
band=M&front&(np.abs(d)<0.014)&(y>0.96)
blend(img,band,hx('#2f6656'))
cl=np.mod(y*90,1); cloud=band&(np.hypot(d,(cl-0.5)/90*1.0)<0.006)&(np.hypot(d,(cl-0.5)/90)>0.0035)
blend(img,cloud,MINT,0.95); blend(img,band&(np.abs(np.abs(d)-0.011)<0.0012),MINT,0.8)
mul(img,np.where(M&front&(d<-0.014)&(d>-0.03)&(y>0.96),0.82,1))   # bóng vạt chồng
belt=M&(y>0.885)&(y<0.94); blend(img,belt,MOSSD); blend(img,belt&(np.abs(y-0.912)<0.0015)&(np.mod(np.arctan2(x,z)*40,1)<0.5),hx('#5a8f7f'))
knot=M&front&(np.hypot(x+0.095,y-0.912)<0.018); blend(img,knot,hx('#2d5448'))
blend(img,M&front&(np.abs(np.hypot(x+0.095,y-0.912)-0.012)<0.0025),hx('#5a8f7f'))
pouch=M&front&(np.abs(x+0.13)<0.03)&(y<0.885)&(y>0.84); blend(img,pouch,hx('#a08a62'))
blend(img,pouch&(y>0.872),hx('#8a7350')); blend(img,pouch&(np.abs(y-0.872)<0.0015),hx('#5e4c33'))
coil=M&front&(np.abs(np.hypot(x+0.065,y-0.862)-0.012)<0.004); blend(img,coil,SON)
mul(img,np.where(M,shade_from(base,M&(base[...,3]>0),10)*weave(x.shape),1)); save(img,'bachvu_inner.png')

# ---------- DÂY CHÉO NGỰC + CHỐT NGỌC PHONG ----------
base,P,M,N=load(14); x,y,z=P[...,0],P[...,1],P[...,2]
lum=base[...,:3].mean(-1); img=base.copy()
img[...,:3]=np.where((lum>110)[...,None],BRONZE*(lum/170)[...,None],LEATHER*(0.55+lum/160)[...,None])
yc=np.nanmedian(np.where(M&(np.abs(x)<0.02)&(z>0),y,np.nan)) if np.any(M&(np.abs(x)<0.02)&(z>0)) else 1.38
dx,dy=x/0.014,(y-yc)/0.02; gem=M&(z>0)&(dx**2+np.where(dy<0,dy*0.8,dy*1.6)**2<1)
blend(img,gem,JADE); blend(img,gem&(np.hypot(dx+0.3,dy-0.35)<0.3),hx('#d8fff3'))
blend(img,M&(z>0)&(np.abs(dx**2+np.where(dy<0,dy*0.8,dy*1.6)**2-1.15)<0.15),BRONZE)
save(img,'bachvu_strap.png')

# ---------- QUẦN XÁM TRO, BUỘC TÚM DƯỚI GỐI ----------
base,P,M,N=load(8); x,y,z=P[...,0],P[...,1],P[...,2]
img=np.zeros_like(base); img[...,3]=base[...,3]; img[...,:3]=ASH
mul(img,shade_from(base,M&(base[...,3]>0),6))
tie=M&(np.abs(y-0.47)<0.014); blend(img,tie,MOSS); blend(img,M&(np.abs(y-0.47)<0.003),hx('#2f6656'))
mul(img,np.where(M&(y<0.456)&(y>0.43),0.88,1)); mul(img,np.where(M&(y>0.484)&(y<0.5),0.9,1))
img[...,3]=np.where(M&(y<0.438),0,img[...,3])   # ống dưới gối nhét vào bốt
mul(img,weave(x.shape)); save(img,'bachvu_pants.png')

# ---------- BỐT LỮ KHÁCH ----------
base,P,M,N=load(9); x,y,z=P[...,0],P[...,1],P[...,2]
lum=base[...,:3].mean(-1); img=base.copy()
lace=lum>95
img[...,:3]=np.where(lace[...,None],hx('#c9b48a')*(lum/200)[...,None],INK*(0.6+lum/110)[...,None])
blend(img,M&(y<0.022),hx('#4a3a2c'))
heel=M&(z<-0.06)&(y>0.03)&(y<0.07); blend(img,heel,hx('#5c5346'),0.85)
blend(img,heel&((np.abs(y-0.03)<0.002)|(np.abs(y-0.07)<0.002)),hx('#8a7f6a'))
blend(img,M&(np.abs(y-0.30)<0.006),SON,0.9)
save(img,'bachvu_boots.png')
base,P,M,N=load(16); lum=base[...,:3].mean(-1); img=base.copy()
orn=(base[...,1]>110)
img[...,:3]=np.where(orn[...,None],MINT*(lum/200)[...,None],hx('#2f5f51')*(0.6+lum/150)[...,None])
save(img,'bachvu_bootcuff.png')
print('done')
