# Găng tay mỏng tối #272838 (lộ đốt ngón cuối) + dây đỏ #e8503a cổ tay trái, vẽ thành layer trong suốt cho texture Body.
import json,struct,numpy as np
from PIL import Image,ImageDraw,ImageFilter
VRM='C:/work/havy_v1.vrm'; S=2048
d=open(VRM,'rb').read(); jl=struct.unpack('<I',d[12:16])[0]; j=json.loads(d[20:20+jl]); bin0=20+jl+8
CT={5126:('f',4),5125:('I',4),5123:('H',2),5121:('B',1)}; NC={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}
def acc(i):
    a=j['accessors'][i]; bv=j['bufferViews'][a['bufferView']]; t,sz=CT[a['componentType']]; n=NC[a['type']]
    off=bin0+bv.get('byteOffset',0)+a.get('byteOffset',0); st=bv.get('byteStride',sz*n)
    raw=np.frombuffer(d,dtype=np.uint8,count=st*(a['count']-1)+sz*n,offset=off)
    dt={'f':np.float32,'I':np.uint32,'H':np.uint16,'B':np.uint8}[t]
    return np.lib.stride_tricks.as_strided(raw,(a['count'],sz*n),(st,1)).copy().view(dt).reshape(a['count'],n)
mi=[k for k,m in enumerate(j['meshes']) if m['name'].startswith('Body')][0]
node=[n for n in j['nodes'] if n.get('mesh')==mi][0]; joints=j['skins'][node['skin']]['joints']
names=[j['nodes'][k]['name'] for k in joints]
p=[p for p in j['meshes'][mi]['primitives'] if p['material']==7][0]
uv=acc(p['attributes']['TEXCOORD_0']); J=acc(p['attributes']['JOINTS_0']); W=acc(p['attributes']['WEIGHTS_0']); idx=acc(p['indices']).reshape(-1,3)
dom=np.array([names[J[v][np.argmax(W[v])]] for v in range(len(uv))])
def cls(n):
    for side in 'LR':
        if n==f'J_Bip_{side}_Hand' or n.endswith('1') and f'_{side}_' in n and any(f in n for f in ('Thumb','Index','Middle','Ring','Little')): return 'glove'+side
        if any(f in n for f in ('Thumb2','Index2','Middle2','Ring2','Little2')) and f'_{side}_' in n: return 'glove'+side
    return None
c=np.array([cls(n) for n in dom],dtype=object)
# dây cổ tay: đỉnh thuộc tay trái nhưng có trọng số LowerArm đáng kể
la=names.index('J_Bip_L_LowerArm'); ra=names.index('J_Bip_R_LowerArm')
wl=np.array([W[v][J[v]==la].sum() for v in range(len(uv))]); wr=np.array([W[v][J[v]==ra].sum() for v in range(len(uv))])
pos=acc(p['attributes']['POSITION'])
def wpos(name):
    k=[i for i,n in enumerate(j['nodes']) if n['name']==name][0]; t=np.zeros(3)
    par={c:i for i,n in enumerate(j['nodes']) for c in n.get('children',[])}
    while True:
        t+=np.array(j['nodes'][k].get('translation',[0,0,0])); 
        if k not in par: return t
        k=par[k]
wl_,ir_=wpos('J_Bip_L_Hand'),wpos('J_Bip_L_Index2'); wr_,il_=wpos('J_Bip_R_Hand'),wpos('J_Bip_R_Index2')
print('wrist',wl_,ir_)
ax=np.abs(pos[:,0]); wx=abs(wl_[0]); fx=abs(ir_[0])
side=np.where(pos[:,0]>0,'L','R')
hand=(ax>wx-0.004)&(ax<fx+0.004)&np.array(['Thumb3' not in n and 'Index3' not in n for n in dom])
c=np.where(hand,np.char.add('glove',side),None).astype(object)
bandL=(pos[:,0]>0)&(ax>wx-0.002)&(ax<wx+0.016)
# nội suy toạ độ |x| theo từng pixel để viền găng/dây mượt, không răng cưa theo tam giác
X=np.full((S,S),-1.0,np.float32); TIP=np.zeros((S,S),bool); SIDE=np.zeros((S,S),np.int8)
tipv=np.array([('Thumb3' in n) or ('Index3' in n) for n in dom])
for t in idx:
    if ax[t].max()<wx-0.03: continue
    q=uv[t]*S; x0,y0=np.floor(q.min(0)).astype(int); x1,y1=np.ceil(q.max(0)).astype(int)
    x0=max(x0,0);y0=max(y0,0);x1=min(x1,S-1);y1=min(y1,S-1)
    if x1<x0 or y1<y0: continue
    gy,gx=np.mgrid[y0:y1+1,x0:x1+1]+0.5
    (ax_,ay),(bx,by),(cx,cy)=q; den=(by-cy)*(ax_-cx)+(cx-bx)*(ay-cy)
    if abs(den)<1e-9: continue
    l1=((by-cy)*(gx-cx)+(cx-bx)*(gy-cy))/den; l2=((cy-ay)*(gx-cx)+(ax_-cx)*(gy-cy))/den; l3=1-l1-l2
    ins=(l1>=-0.02)&(l2>=-0.02)&(l3>=-0.02)
    v=l1*ax[t[0]]+l2*ax[t[1]]+l3*ax[t[2]]
    sl=(slice(y0,y1+1),slice(x0,x1+1))
    X[sl]=np.where(ins,v,X[sl]); TIP[sl]=np.where(ins,tipv[t].sum()>=2,TIP[sl])
    SIDE[sl]=np.where(ins,1 if pos[t[0],0]>0 else -1,SIDE[sl])
m=(X>wx-0.004)&(X<fx+0.002)&~TIP
m=np.array(Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)))>0
mc=(X>wx+0.002)&(X<wx+0.014)&(SIDE==1)
base=np.array(Image.open('C:/work/an/img10__10.png').convert('RGB')).astype(np.float32)
lum=base.mean(-1); lum=(lum/ (np.median(lum[m])+1e-3))
out=np.zeros((S,S,4),np.uint8)
GL=np.array([0x27,0x28,0x38],np.float32)
col=np.clip(GL*np.clip(lum,0.75,1.2)[...,None],0,255)
out[m,:3]=col[m]; out[m,3]=255
out[mc,:3]=(0xe8,0x50,0x3a); out[mc,3]=255
Image.fromarray(out,'RGBA').save('C:/work/tex/havy_gloves.png')
prev=base.copy(); prev[m]=out[m,:3]; prev[mc]=out[mc,:3]
Image.fromarray(prev.astype(np.uint8)).crop((0,900,2048,2048)).resize((1024,574)).save('C:/work/an/prev_gloves.png')
print('glove px',m.sum(),'cord px',mc.sum())
