import numpy as np, math, random
from PIL import Image, ImageDraw, ImageFilter
random.seed(7)
S=2048
src=np.array(Image.open('C:/work/an/img12__12.png').convert('RGBA')).astype(np.float32)
lum=src[...,:3].mean(-1); bright=(lum>150)&(src[...,3]>0)
NAVY=np.array([0x26,0x34,0x82],np.float32)
yy,xx=np.mgrid[0:S,0:S].astype(np.float32)
# shading field (multiplier)
sh=np.ones((S,S),np.float32)
def g(x,c,w): return np.exp(-((x-c)/w)**2)
# skirt vertical folds (below waist y~930)
sk=(yy>930)
t=np.clip((yy-930)/1050,0,1)
fold=np.zeros((S,S),np.float32)
for i,cx in enumerate(np.arange(430,1650,95)):
    off=(random.random()-.5)*30
    c=cx+off+(cx-1024)*0.10*t
    w=10+28*t
    d=(xx-c)
    fold+= -0.20*g(d,0,w)*(0.3+0.7*t) + 0.12*g(d,w*1.6,w*0.9)*(0.3+0.7*t)
sh+=np.where(sk,fold,0)
sh-=0.10*g(yy,945,22)  # waist crease
sh+=0.05*g(yy,905,14)
# torso: underbust / armpit / side shading
tor=(yy<=930)&(yy>420)
sh-=np.where(tor,0.10*g(yy,800,30)*g(xx,1024,260),0)
for ax in (705,1343):
    sh-=np.where(tor,0.16*g(xx,ax,70)*g(yy,700,180),0)
sh+=np.where(tor,0.07*g(xx,900,60)*g(yy,640,90)+0.07*g(xx,1148,60)*g(yy,640,90),0)
# back panels darker toward center back edges
sh-=np.where(yy>420,0.08*(g(xx,400,60)+g(xx,1648,60)),0)
# sleeves (y<420): elbow folds + edge (underarm seam) darkening
sl=(yy<420)
for base,sgn in ((0,1),(S,-1)):
    ex=base+sgn*470
    ex=base+sgn*340
    for k,(dx,dy) in enumerate(((-30,-60),(0,40),(28,-10))):
        c=ex+sgn*dx+0.10*(yy-210)*(1 if k%2 else -1)
        sh+=np.where(sl,(-0.13*g(xx-c,0,22)+0.06*g(xx-c,-sgn*30,18))*g(yy,210+dy,120),0)
    # near cuff darker
    sh-=np.where(sl,0.10*g(xx,base+sgn*230,60),0)
sh-=np.where(sl,0.14*(g(yy,15,40)+g(yy,405,40)),0)
sh+=np.where(sl,0.06*g(yy,170,50),0)
# hem slightly darker before trim
sh-=np.where(sk,0.08*g(yy,1860,40),0)
noise=np.array(Image.effect_noise((S,S),18).convert('L').filter(ImageFilter.GaussianBlur(1.2)),np.float32)/255-0.5
sh+=noise*0.05
img=np.clip(NAVY[None,None,:]*sh[...,None],0,255)
out=np.dstack([img,src[...,3:4]]).astype(np.uint8)
im=Image.fromarray(out,'RGBA'); d=ImageDraw.Draw(im,'RGBA')
GOLD=(0xf2,0xa2,0x27); GHI=(0xff,0xd9,0x86); GDK=(0xa8,0x66,0x12)
def gold_band_h(y0,y1,x0,x1):
    for y in range(y0,y1):
        f=(y-y0)/max(1,y1-y0-1)
        k=1-abs(f-0.35)*1.6
        col=tuple(int(GDK[i]+(GHI[i]-GDK[i])*max(0,min(1,k))) for i in range(3))
        d.line([(x0,y),(x1,y)],fill=col+(255,))
    d.line([(x0,y0),(x1,y0)],fill=(0x7a,0x45,0x0c,255),width=3); d.line([(x0,y1-2),(x1,y1-2)],fill=(0x7a,0x45,0x0c,255),width=3)
def gold_band_v(x0,x1,y0,y1):
    for x in range(x0,x1):
        f=(x-x0)/max(1,x1-x0-1); k=1-abs(f-0.5)*1.8
        col=tuple(int(GDK[i]+(GHI[i]-GDK[i])*max(0,min(1,k))) for i in range(3))
        d.line([(x,y0),(x,y1)],fill=col+(255,))
    d.line([(x0,y0),(x0,y1)],fill=(0x7a,0x45,0x0c,255),width=3); d.line([(x1-2,y0),(x1-2,y1)],fill=(0x7a,0x45,0x0c,255),width=3)
def stitch_h(y,x0,x1,col=(0x55,0x6a,0xc8,200)):
    for x in range(x0,x1,22): d.line([(x,y),(x+12,y)],fill=col,width=3)
def stitch_v(x,y0,y1,col=(0x55,0x6a,0xc8,200)):
    for y in range(y0,y1,22): d.line([(x,y),(x,y+12)],fill=col,width=3)
def snow(cx,cy,r,col,w=3):
    for a in range(6):
        t=a*math.pi/3; ex,ey=cx+r*math.cos(t),cy+r*math.sin(t)
        d.line([(cx,cy),(ex,ey)],fill=col,width=w)
        for s in (0.55,):
            bx,by=cx+r*s*math.cos(t),cy+r*s*math.sin(t)
            for dt in (0.6,-0.6):
                d.line([(bx,by),(bx+r*0.32*math.cos(t+dt),by+r*0.32*math.sin(t+dt))],fill=col,width=w)
    d.ellipse([cx-w,cy-w,cx+w,cy+w],fill=col)
def star(cx,cy,r,col):
    pts=[]
    for i in range(8):
        rr=r if i%2==0 else r*0.3; t=i*math.pi/4-math.pi/2
        pts.append((cx+rr*math.cos(t),cy+rr*math.sin(t)))
    d.polygon(pts,fill=col)
# --- cuffs gold, lace transparent
gold_band_v(98,208,0,420); gold_band_v(S-208,S-98,0,420)
stitch_v(222,10,410,(0xd8,0x9a,0x35,220)); stitch_v(S-222,10,410,(0xd8,0x9a,0x35,220))
# wrist cord (left-image sleeve only) red twisted line at the wrist edge
for y in range(0,420,14):
    d.line([(100,y),(112,y+10)],fill=(0xe8,0x50,0x3a,255),width=6)
    d.line([(100,y+7),(112,y+17)],fill=(0xb0,0x30,0x22,255),width=3)
a=np.array(im)
a[:, :98,3]=0; a[:, S-98:,3]=0   # sleeve lace removed
# collar: lace zig transparent, band navy w/ gold edge
a[265:338,700:1350,3]=0
im=Image.fromarray(a,'RGBA'); d=ImageDraw.Draw(im,'RGBA')
gold_band_h(338,356,760,1290)
stitch_h(372,775,1275,(0xd8,0x9a,0x35,220))
# collar flaps: bright areas near neckline -> navy with gold piping
fl=bright.copy(); fl[:420]=False; fl[620:]=False; fl[:, :880]=False; fl[:,1170:]=False
a=np.array(im); 
fa=Image.fromarray((fl*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
fm=np.array(fa)>0
edge=np.array(fa.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.MaxFilter(7)))>0
a[fm,:3]=(0x23,0x31,0x7c); a[edge&fm,:3]=GOLD
im=Image.fromarray(a,'RGBA'); d=ImageDraw.Draw(im,'RGBA')
# center front opening + placket stitch
# gold buttons cover old white buttons
for y in (565,630,700,755,820,890):
    d.ellipse([1004,y-20,1044,y+20],fill=tuple(int(v) for v in img[y,1060])+(255,))
d.line([(1024,560),(1024,1990)],fill=(0x10,0x16,0x3c,255),width=5)
d.line([(1030,560),(1030,1990)],fill=(0x4a,0x5e,0xbf,180),width=2)
stitch_v(1048,600,1960); stitch_v(1000,600,1960)
# waist seam + stitches
d.line([(380,932),(1668,932)],fill=(0x14,0x1c,0x4d,255),width=4)
stitch_h(946,380,1668); stitch_h(918,780,1270)
# side/shoulder seams on torso
for x in (760,1288): stitch_v(x,430,925)
# ice gem at collar front: giọt nước #7fe0ff, viền vàng
cx,cy=1024,584
def drop(cx,cy,r,col):
    d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=col)
    d.polygon([(cx-r*0.93,cy-r*0.36),(cx,cy-r*2.4),(cx+r*0.93,cy-r*0.36)],fill=col)
drop(cx,cy,24,(0xb0,0x74,0x18,255)); drop(cx,cy,19,(0x7f,0xe0,0xff,255))
d.ellipse([cx-7,cy-6,cx+19,cy+19],fill=(0x3c,0xa8,0xd8,255)); drop(cx,cy,12,(0x7f,0xe0,0xff,255))
d.ellipse([cx-10,cy-20,cx-3,cy-8],fill=(255,255,255,255)); d.ellipse([cx+5,cy+6,cx+9,cy+10],fill=(0xe0,0xfa,0xff,255))
# two red X marks
for (x,y) in ((950,700),(1098,700)):
    r=24
    for w2,col in ((22,(0x14,0x1c,0x4d,90)),):
        d.line([(x-r+3,y-r+4),(x+r+3,y+r+4)],fill=col,width=w2); d.line([(x-r+3,y+r+4),(x+r+3,y-r+4)],fill=col,width=w2)
    d.line([(x-r,y-r),(x+r,y+r)],fill=(0x8a,0x1c,0x1e,255),width=16)
    d.line([(x-r,y+r),(x+r,y-r)],fill=(0x8a,0x1c,0x1e,255),width=16)
    d.line([(x-r,y-r),(x+r,y+r)],fill=(0xe0,0x38,0x3a,255),width=11)
    d.line([(x-r,y+r),(x+r,y-r)],fill=(0xe0,0x38,0x3a,255),width=11)
    d.line([(x-r+4,y-r+2),(x-2,y-6)],fill=(0xff,0x8a,0x80,255),width=3)
# pockets on skirt front
for px in (840,1208):
    d.rectangle([px-80,1120,px+80,1290],fill=(0x24,0x33,0x80,255))
    d.rectangle([px-80,1120,px+80,1290],outline=(0x14,0x1c,0x4d,255),width=4)
    d.polygon([(px-88,1100),(px+88,1100),(px+88,1150),(px,1172),(px-88,1150)],fill=(0x2e,0x40,0x9c,255),outline=(0x14,0x1c,0x4d,255))
    d.line([(px-88,1150),(px,1172),(px+88,1150)],fill=GOLD+(255,),width=5)
    for x in range(px-78,px+78,20): d.line([(x,1110),(x+10,1110)],fill=(0x6a,0x80,0xd8,220),width=3)
    d.ellipse([px-9,1152,px+9,1170],fill=GOLD+(255,))
# hem: frill transparent, gold band, motifs
a=np.array(im); a[1988:,:,3]=0; im=Image.fromarray(a,'RGBA'); d=ImageDraw.Draw(im,'RGBA')
gold_band_h(1890,1988,380,1668)
d.line([(380,1858),(1668,1858)],fill=GOLD+(255,),width=6)
stitch_h(1874,380,1668,(0xd8,0x9a,0x35,220))
for i,x in enumerate(range(410,1668,64)):
    if i%2==0: snow(x,1939,24,(0x7a,0x45,0x0c,255),3)
    else: star(x,1939,14,(0x9a,0x5a,0x10,255))
# constellation / snow motif above hem
ICE=(0x9f,0xd8,0xff,200)
for x0 in range(420,1660,170):
    pts=[(x0+random.randint(-10,10),1800+random.randint(-25,25)) for _ in range(1)]
    pts+=[(x0+50+random.randint(-10,10),1740+random.randint(-30,30)),(x0+105+random.randint(-10,10),1790+random.randint(-30,30)),(x0+140,1730+random.randint(-20,20))]
    for p,q in zip(pts,pts[1:]): d.line([p,q],fill=(0x9f,0xd8,0xff,110),width=2)
    for j,p in enumerate(pts): star(p[0],p[1],10 if j!=1 else 14,ICE)
    snow(x0+85,1665,22,(0x9f,0xd8,0xff,150),3)
im.save('C:/work/tex/havy_coat.png')
# preview overlay with uv
uv=Image.open('C:/work/an/uv_mat8.png').convert('RGBA'); uva=np.array(uv); m=(uva[...,0]==255)&(uva[...,1]==0)
p=np.array(im.convert('RGBA')).copy(); p[m]=(255,0,0,255); Image.fromarray(p).resize((1024,1024)).save('C:/work/an/prev_coat.png')
