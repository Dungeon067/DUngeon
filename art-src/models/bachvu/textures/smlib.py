import json,struct,numpy as np
CT={5126:('f',4),5125:('I',4),5123:('H',2),5121:('B',1)}; NC={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}
class V:
    def __init__(s,p):
        d=open(p,'rb').read(); jl=struct.unpack('<I',d[12:16])[0]; s.j=json.loads(d[20:20+jl]); s.b0=20+jl+8; s.d=d
        s.par={c:i for i,n in enumerate(s.j['nodes']) for c in n.get('children',[])}
    def acc(s,i):
        j=s.j;a=j['accessors'][i]; bv=j['bufferViews'][a['bufferView']]; t,sz=CT[a['componentType']]; n=NC[a['type']]
        off=s.b0+bv.get('byteOffset',0)+a.get('byteOffset',0); st=bv.get('byteStride',sz*n)
        raw=np.frombuffer(s.d,dtype=np.uint8,count=st*(a['count']-1)+sz*n,offset=off)
        dt={'f':np.float32,'I':np.uint32,'H':np.uint16,'B':np.uint8}[t]
        return np.lib.stride_tricks.as_strided(raw,(a['count'],sz*n),(st,1)).copy().view(dt).reshape(a['count'],n)
    def wpos(s,name):
        k=[i for i,n in enumerate(s.j['nodes']) if n['name']==name][0]; t=np.zeros(3)
        while True:
            t+=np.array(s.j['nodes'][k].get('translation',[0,0,0]))
            if k not in s.par: return t
            k=s.par[k]
    def prims(s,mat):
        for m in s.j['meshes']:
            for p in m['primitives']:
                if p['material']==mat: yield p
    def raster(s,mat,S,H=None,attr='POSITION'):
        H=H or S
        """per-pixel world position (S,S,3), mask"""
        P=np.full((H,S,3),np.nan,np.float32)
        for p in s.prims(mat):
            uv=s.acc(p['attributes']['TEXCOORD_0']); pos=s.acc(p['attributes'][attr]); idx=s.acc(p['indices']).reshape(-1,3)
            for t in idx:
                q=uv[t]*np.array([S,H]); x0,y0=np.floor(q.min(0)).astype(int); x1,y1=np.ceil(q.max(0)).astype(int)
                x0=max(x0,0);y0=max(y0,0);x1=min(x1,S-1);y1=min(y1,H-1)
                if x1<x0 or y1<y0: continue
                gy,gx=np.mgrid[y0:y1+1,x0:x1+1]+0.5
                (ax,ay),(bx,by),(cx,cy)=q; den=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy)
                if abs(den)<1e-12: continue
                l1=((by-cy)*(gx-cx)+(cx-bx)*(gy-cy))/den; l2=((cy-ay)*(gx-cx)+(ax-cx)*(gy-cy))/den; l3=1-l1-l2
                ins=(l1>=-0.03)&(l2>=-0.03)&(l3>=-0.03)
                v=l1[...,None]*pos[t[0]]+l2[...,None]*pos[t[1]]+l3[...,None]*pos[t[2]]
                sl=(slice(y0,y1+1),slice(x0,x1+1))
                P[sl]=np.where(ins[...,None],v,P[sl])
        return P,~np.isnan(P[...,0])
