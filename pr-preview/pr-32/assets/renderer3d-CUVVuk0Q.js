var x0=Object.defineProperty;var y0=(s,e,t)=>e in s?x0(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var Dn=(s,e,t)=>y0(s,typeof e!="symbol"?e+"":e,t);import{G as Et,S as to}from"./logic-BtqBKD0e.js";import{T as he,F as gd,o as M0,M as Ys,b as on,c as Vt,d as S0,l as or,e as w0}from"./main-03M26Rxs.js";import{Y as Ao,a3 as b0,X as xi,Z as zs,_ as T0,a6 as A0,a0 as E0,E as Lt}from"./index-C4rfMCBh.js";import{d as R0}from"./tokens-CbqLiqUK.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qi="170",C0={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},P0={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},im=0,ku=1,sm=2,I0=3,L0=0,ec=1,ch=2,oi=3,di=0,$t=1,Nt=2,ui=0,Vs=1,Sn=2,zu=3,Vu=4,rm=5,Ki=100,om=101,am=102,lm=103,cm=104,um=200,hm=201,dm=202,fm=203,ll=204,cl=205,pm=206,mm=207,gm=208,_m=209,vm=210,xm=211,ym=212,Mm=213,Sm=214,ul=0,hl=1,dl=2,js=3,fl=4,pl=5,No=6,ml=7,Yo=0,wm=1,bm=2,Pi=0,uh=1,hh=2,dh=3,fh=4,Tm=5,ph=6,mh=7,Hu="attached",Am="detached",tc=300,Li=301,es=302,Oo=303,Fo=304,Xr=306,ts=1e3,In=1001,Or=1002,qt=1003,nc=1004,U0=1004,Ds=1005,D0=1005,Ft=1006,Ur=1007,N0=1007,Bn=1008,O0=1008,fi=1009,gh=1010,_h=1011,Fr=1012,ic=1013,Ui=1014,Rn=1015,Kn=1016,sc=1017,rc=1018,Zs=1020,vh=35902,xh=1021,yh=1022,ln=1023,Mh=1024,Sh=1025,Hs=1026,$s=1027,oc=1028,jo=1029,wh=1030,ac=1031,F0=1032,lc=1033,Eo=33776,Ro=33777,Co=33778,Po=33779,gl=35840,_l=35841,vl=35842,xl=35843,yl=36196,Ml=37492,Sl=37496,wl=37808,bl=37809,Tl=37810,Al=37811,El=37812,Rl=37813,Cl=37814,Pl=37815,Il=37816,Ll=37817,Ul=37818,Dl=37819,Nl=37820,Ol=37821,Io=36492,Fl=36494,Bl=36495,bh=36283,kl=36284,zl=36285,Vl=36286,Th=2200,Ah=2201,Em=2202,Br=2300,kr=2301,nl=2302,Ns=2400,Os=2401,Bo=2402,cc=2500,Eh=2501,Rm=0,Rh=1,Hl=2,Cm=3200,Ch=3201,B0=3202,k0=3203,Di=0,Pm=1,Ei="",Ht="srgb",_n="srgb-linear",Zo="linear",Tt="srgb",z0=0,Cs=7680,V0=7681,H0=7682,G0=7683,W0=34055,X0=34056,q0=5386,Y0=512,j0=513,Z0=514,$0=515,K0=516,J0=517,Q0=518,Gu=519,Im=512,Lm=513,Um=514,Ph=515,Dm=516,Nm=517,Om=518,Fm=519,ko=35044,Bm=35048,e_=35040,t_=35045,n_=35049,i_=35041,s_=35046,r_=35050,o_=35042,a_="100",Wu="300 es",li=2e3,zo=2001;class gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _d=1234567;const Gs=Math.PI/180,zr=180/Math.PI;function Ln(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pn[s&255]+pn[s>>8&255]+pn[s>>16&255]+pn[s>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[t&63|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function Gt(s,e,t){return Math.max(e,Math.min(t,s))}function Ih(s,e){return(s%e+e)%e}function l_(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function c_(s,e,t){return s!==e?(t-s)/(e-s):0}function Lo(s,e,t){return(1-t)*s+t*e}function u_(s,e,t,n){return Lo(s,e,1-Math.exp(-t*n))}function h_(s,e=1){return e-Math.abs(Ih(s,e*2)-e)}function d_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function f_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function p_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function m_(s,e){return s+Math.random()*(e-s)}function g_(s){return s*(.5-Math.random())}function __(s){s!==void 0&&(_d=s);let e=_d+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function v_(s){return s*Gs}function x_(s){return s*zr}function y_(s){return(s&s-1)===0&&s!==0}function M_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function S_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function w_(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*u,l*h,l*d,a*c);break;case"YZY":s.set(l*d,a*u,l*h,a*c);break;case"ZXZ":s.set(l*h,l*d,a*u,a*c);break;case"XZX":s.set(a*u,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*u,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ht(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Dt={DEG2RAD:Gs,RAD2DEG:zr,generateUUID:Ln,clamp:Gt,euclideanModulo:Ih,mapLinear:l_,inverseLerp:c_,lerp:Lo,damp:u_,pingpong:h_,smoothstep:d_,smootherstep:f_,randInt:p_,randFloat:m_,randFloatSpread:g_,seededRandom:__,degToRad:v_,radToDeg:x_,isPowerOfTwo:y_,ceilPowerOfTwo:M_,floorPowerOfTwo:S_,setQuaternionFromProperEuler:w_,normalize:ht,denormalize:yn};class ne{constructor(e=0,t=0){ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e,t,n,i,r,o,a,l,c){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],v=i[1],y=i[4],x=i[7],E=i[2],T=i[5],w=i[8];return r[0]=o*_+a*v+l*E,r[3]=o*g+a*y+l*T,r[6]=o*m+a*x+l*w,r[1]=c*_+u*v+h*E,r[4]=c*g+u*y+h*T,r[7]=c*m+u*x+h*w,r[2]=d*_+f*v+p*E,r[5]=d*g+f*y+p*T,r[8]=d*m+f*x+p*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,p=t*h+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(u*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Pc.makeScale(e,t)),this}rotate(e){return this.premultiply(Pc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pc=new et;function km(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}const b_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Pr(s,e){return new b_[s](e)}function Vo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zm(){const s=Vo("canvas");return s.style.display="block",s}const vd={};function Mo(s){s in vd||(vd[s]=!0,console.warn(s))}function T_(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function A_(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function E_(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const mt={enabled:!0,workingColorSpace:_n,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Tt&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Tt&&(s.r=Dr(s.r),s.g=Dr(s.g),s.b=Dr(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ei?Zo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Ii(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Dr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const xd=[.64,.33,.3,.6,.15,.06],yd=[.2126,.7152,.0722],Md=[.3127,.329],Sd=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wd=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);mt.define({[_n]:{primaries:xd,whitePoint:Md,transfer:Zo,toXYZ:Sd,fromXYZ:wd,luminanceCoefficients:yd,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:xd,whitePoint:Md,transfer:Tt,toXYZ:Sd,fromXYZ:wd,luminanceCoefficients:yd,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}});let ar;class Vm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ar===void 0&&(ar=Vo("canvas")),ar.width=e.width,ar.height=e.height;const n=ar.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ar}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ii(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ii(t[n]/255)*255):t[n]=Ii(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let R_=0;class Fs{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:R_++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ic(i[o].image)):r.push(Ic(i[o]))}else r=Ic(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ic(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vm.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let C_=0;class Ut extends gi{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=In,i=In,r=Ft,o=Bn,a=ln,l=fi,c=Ut.DEFAULT_ANISOTROPY,u=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:C_++}),this.uuid=Ln(),this.name="",this.source=new Fs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ts:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case Or:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ts:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case Or:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=tc;Ut.DEFAULT_ANISOTROPY=1;class xt{constructor(e=0,t=0,n=0,i=1){xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,x=(f+1)/2,E=(m+1)/2,T=(u+d)/4,w=(h+_)/4,A=(p+g)/4;return y>x&&y>E?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=T/n,r=w/n):x>E?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=T/i,r=A/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=w/r,i=A/r),this.set(n,i,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(h-_)/v,this.z=(d-u)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hm extends gi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ut(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fs(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Hm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class uc extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=qt,this.minFilter=qt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class P_ extends cn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new uc(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Lh extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=qt,this.minFilter=qt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class I_ extends cn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Lh(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class Qe{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const d=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=_;return}if(h!==_||l!==d||c!==f||u!==p){let g=1-a;const m=l*d+c*f+u*p+h*_,v=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const E=Math.sqrt(y),T=Math.atan2(E,m*v);g=Math.sin(g*T)/E,a=Math.sin(a*T)/E}const x=a*v;if(l=l*g+d*x,c=c*g+f*x,u=u*g+p*x,h=h*g+_*x,g===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=E,c*=E,u*=E,h*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+u*h+l*f-c*d,e[t+1]=l*p+u*d+c*h-a*f,e[t+2]=c*p+u*f+a*d-l*h,e[t+3]=u*p-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"YXZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"ZXY":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"ZYX":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"YZX":this._x=d*u*h+c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h-d*f*p;break;case"XZY":this._x=d*u*h-c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lc.copy(this).projectOnVector(e),this.sub(Lc)}reflect(e){return this.sub(Lc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lc=new b,bd=new Qe;class un{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xn):Xn.fromBufferAttribute(r,o),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ia.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ia.copy(n.boundingBox)),ia.applyMatrix4(e.matrixWorld),this.union(ia)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(no),sa.subVectors(this.max,no),lr.subVectors(e.a,no),cr.subVectors(e.b,no),ur.subVectors(e.c,no),Hi.subVectors(cr,lr),Gi.subVectors(ur,cr),hs.subVectors(lr,ur);let t=[0,-Hi.z,Hi.y,0,-Gi.z,Gi.y,0,-hs.z,hs.y,Hi.z,0,-Hi.x,Gi.z,0,-Gi.x,hs.z,0,-hs.x,-Hi.y,Hi.x,0,-Gi.y,Gi.x,0,-hs.y,hs.x,0];return!Uc(t,lr,cr,ur,sa)||(t=[1,0,0,0,1,0,0,0,1],!Uc(t,lr,cr,ur,sa))?!1:(ra.crossVectors(Hi,Gi),t=[ra.x,ra.y,ra.z],Uc(t,lr,cr,ur,sa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const yi=[new b,new b,new b,new b,new b,new b,new b,new b],Xn=new b,ia=new un,lr=new b,cr=new b,ur=new b,Hi=new b,Gi=new b,hs=new b,no=new b,sa=new b,ra=new b,ds=new b;function Uc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ds.fromArray(s,r);const a=i.x*Math.abs(ds.x)+i.y*Math.abs(ds.y)+i.z*Math.abs(ds.z),l=e.dot(ds),c=t.dot(ds),u=n.dot(ds);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const L_=new un,io=new b,Dc=new b;class hn{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):L_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;io.subVectors(e,this.center);const t=io.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(io,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(io.copy(e.center).add(Dc)),this.expandByPoint(io.copy(e.center).sub(Dc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mi=new b,Nc=new b,oa=new b,Wi=new b,Oc=new b,aa=new b,Fc=new b;class qr{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Nc.copy(e).add(t).multiplyScalar(.5),oa.copy(t).sub(e).normalize(),Wi.copy(this.origin).sub(Nc);const r=e.distanceTo(t)*.5,o=-this.direction.dot(oa),a=Wi.dot(this.direction),l=-Wi.dot(oa),c=Wi.lengthSq(),u=Math.abs(1-o*o);let h,d,f,p;if(u>0)if(h=o*l-a,d=o*a-l,p=r*u,h>=0)if(d>=-p)if(d<=p){const _=1/u;h*=_,d*=_,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-p?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=p?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Nc).addScaledVector(oa,d),f}intersectSphere(e,t){Mi.subVectors(e.center,this.origin);const n=Mi.dot(this.direction),i=Mi.dot(Mi)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,n,i,r){Oc.subVectors(t,e),aa.subVectors(n,e),Fc.crossVectors(Oc,aa);let o=this.direction.dot(Fc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Wi.subVectors(this.origin,e);const l=a*this.direction.dot(aa.crossVectors(Wi,aa));if(l<0)return null;const c=a*this.direction.dot(Oc.cross(Wi));if(c<0||l+c>o)return null;const u=-a*Wi.dot(Fc);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ke{constructor(e,t,n,i,r,o,a,l,c,u,h,d,f,p,_,g){ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,u,h,d,f,p,_,g)}set(e,t,n,i,r,o,a,l,c,u,h,d,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ke().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/hr.setFromMatrixColumn(e,0).length(),r=1/hr.setFromMatrixColumn(e,1).length(),o=1/hr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,f=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-p,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d-_*a,t[4]=-o*h,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-d*h,t[8]=p*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+p,t[10]=d-_*h}else if(e.order==="XZY"){const d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=o*u,t[9]=f*h-p,t[2]=p*h-f,t[6]=a*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(U_,e,D_)}lookAt(e,t,n){const i=this.elements;return Cn.subVectors(e,t),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Xi.crossVectors(n,Cn),Xi.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Xi.crossVectors(n,Cn)),Xi.normalize(),la.crossVectors(Cn,Xi),i[0]=Xi.x,i[4]=la.x,i[8]=Cn.x,i[1]=Xi.y,i[5]=la.y,i[9]=Cn.y,i[2]=Xi.z,i[6]=la.z,i[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],y=n[7],x=n[11],E=n[15],T=i[0],w=i[4],A=i[8],S=i[12],M=i[1],P=i[5],F=i[9],B=i[13],U=i[2],z=i[6],k=i[10],j=i[14],W=i[3],ae=i[7],oe=i[11],be=i[15];return r[0]=o*T+a*M+l*U+c*W,r[4]=o*w+a*P+l*z+c*ae,r[8]=o*A+a*F+l*k+c*oe,r[12]=o*S+a*B+l*j+c*be,r[1]=u*T+h*M+d*U+f*W,r[5]=u*w+h*P+d*z+f*ae,r[9]=u*A+h*F+d*k+f*oe,r[13]=u*S+h*B+d*j+f*be,r[2]=p*T+_*M+g*U+m*W,r[6]=p*w+_*P+g*z+m*ae,r[10]=p*A+_*F+g*k+m*oe,r[14]=p*S+_*B+g*j+m*be,r[3]=v*T+y*M+x*U+E*W,r[7]=v*w+y*P+x*z+E*ae,r[11]=v*A+y*F+x*k+E*oe,r[15]=v*S+y*B+x*j+E*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+r*l*h-i*c*h-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*u-r*l*u)+g*(+t*c*h-t*a*f-r*o*h+n*o*f+r*a*u-n*c*u)+m*(-i*a*u-t*l*h+t*a*d+i*o*h-n*o*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=h*g*c-_*d*c+_*l*f-a*g*f-h*l*m+a*d*m,y=p*d*c-u*g*c-p*l*f+o*g*f+u*l*m-o*d*m,x=u*_*c-p*h*c+p*a*f-o*_*f-u*a*m+o*h*m,E=p*h*l-u*_*l-p*a*d+o*_*d+u*a*g-o*h*g,T=t*v+n*y+i*x+r*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return e[0]=v*w,e[1]=(_*d*r-h*g*r-_*i*f+n*g*f+h*i*m-n*d*m)*w,e[2]=(a*g*r-_*l*r+_*i*c-n*g*c-a*i*m+n*l*m)*w,e[3]=(h*l*r-a*d*r-h*i*c+n*d*c+a*i*f-n*l*f)*w,e[4]=y*w,e[5]=(u*g*r-p*d*r+p*i*f-t*g*f-u*i*m+t*d*m)*w,e[6]=(p*l*r-o*g*r-p*i*c+t*g*c+o*i*m-t*l*m)*w,e[7]=(o*d*r-u*l*r+u*i*c-t*d*c-o*i*f+t*l*f)*w,e[8]=x*w,e[9]=(p*h*r-u*_*r-p*n*f+t*_*f+u*n*m-t*h*m)*w,e[10]=(o*_*r-p*a*r+p*n*c-t*_*c-o*n*m+t*a*m)*w,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*f-t*a*f)*w,e[12]=E*w,e[13]=(u*_*i-p*h*i+p*n*d-t*_*d-u*n*g+t*h*g)*w,e[14]=(p*a*i-o*_*i-p*n*l+t*_*l+o*n*g-t*a*g)*w,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,p=r*h,_=o*u,g=o*h,m=a*h,v=l*c,y=l*u,x=l*h,E=n.x,T=n.y,w=n.z;return i[0]=(1-(_+m))*E,i[1]=(f+x)*E,i[2]=(p-y)*E,i[3]=0,i[4]=(f-x)*T,i[5]=(1-(d+m))*T,i[6]=(g+v)*T,i[7]=0,i[8]=(p+y)*w,i[9]=(g-v)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=hr.set(i[0],i[1],i[2]).length();const o=hr.set(i[4],i[5],i[6]).length(),a=hr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],qn.copy(this);const c=1/r,u=1/o,h=1/a;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=u,qn.elements[5]*=u,qn.elements[6]*=u,qn.elements[8]*=h,qn.elements[9]*=h,qn.elements[10]*=h,t.setFromRotationMatrix(qn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=li){const l=this.elements,c=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i);let f,p;if(a===li)f=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===zo)f=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=li){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-r),d=(t+e)*c,f=(n+i)*u;let p,_;if(a===li)p=(o+r)*h,_=-2*h;else if(a===zo)p=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const hr=new b,qn=new ke,U_=new b(0,0,0),D_=new b(1,1,1),Xi=new b,la=new b,Cn=new b,Td=new ke,Ad=new Qe;class an{constructor(e=0,t=0,n=0,i=an.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Td.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Td,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ad.setFromEuler(this),this.setFromQuaternion(Ad,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class hc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let N_=0;const Ed=new b,dr=new Qe,Si=new ke,ca=new b,so=new b,O_=new b,F_=new Qe,Rd=new b(1,0,0),Cd=new b(0,1,0),Pd=new b(0,0,1),Id={type:"added"},B_={type:"removed"},fr={type:"childadded",child:null},Bc={type:"childremoved",child:null};class pt extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:N_++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new b,t=new an,n=new Qe,i=new b(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ke},normalMatrix:{value:new et}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.multiply(dr),this}rotateOnWorldAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.premultiply(dr),this}rotateX(e){return this.rotateOnAxis(Rd,e)}rotateY(e){return this.rotateOnAxis(Cd,e)}rotateZ(e){return this.rotateOnAxis(Pd,e)}translateOnAxis(e,t){return Ed.copy(e).applyQuaternion(this.quaternion),this.position.add(Ed.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rd,e)}translateY(e){return this.translateOnAxis(Cd,e)}translateZ(e){return this.translateOnAxis(Pd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ca.copy(e):ca.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),so.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(so,ca,this.up):Si.lookAt(ca,so,this.up),this.quaternion.setFromRotationMatrix(Si),i&&(Si.extractRotation(i.matrixWorld),dr.setFromRotationMatrix(Si),this.quaternion.premultiply(dr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Id),fr.child=e,this.dispatchEvent(fr),fr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(B_),Bc.child=e,this.dispatchEvent(Bc),Bc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Id),fr.child=e,this.dispatchEvent(fr),fr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,e,O_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,F_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}pt.DEFAULT_UP=new b(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yn=new b,wi=new b,kc=new b,bi=new b,pr=new b,mr=new b,Ld=new b,zc=new b,Vc=new b,Hc=new b,Gc=new xt,Wc=new xt,Xc=new xt;class En{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Yn.subVectors(e,t),i.cross(Yn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Yn.subVectors(i,t),wi.subVectors(n,t),kc.subVectors(e,t);const o=Yn.dot(Yn),a=Yn.dot(wi),l=Yn.dot(kc),c=wi.dot(wi),u=wi.dot(kc),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,p=(o*u-a*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bi.x),l.addScaledVector(o,bi.y),l.addScaledVector(a,bi.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Gc.setScalar(0),Wc.setScalar(0),Xc.setScalar(0),Gc.fromBufferAttribute(e,t),Wc.fromBufferAttribute(e,n),Xc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Gc,r.x),o.addScaledVector(Wc,r.y),o.addScaledVector(Xc,r.z),o}static isFrontFacing(e,t,n,i){return Yn.subVectors(n,t),wi.subVectors(e,t),Yn.cross(wi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Yn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return En.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;pr.subVectors(i,n),mr.subVectors(r,n),zc.subVectors(e,n);const l=pr.dot(zc),c=mr.dot(zc);if(l<=0&&c<=0)return t.copy(n);Vc.subVectors(e,i);const u=pr.dot(Vc),h=mr.dot(Vc);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(pr,o);Hc.subVectors(e,r);const f=pr.dot(Hc),p=mr.dot(Hc);if(p>=0&&f<=p)return t.copy(r);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(mr,a);const g=u*p-f*h;if(g<=0&&h-u>=0&&f-p>=0)return Ld.subVectors(r,i),a=(h-u)/(h-u+(f-p)),t.copy(i).addScaledVector(Ld,a);const m=1/(g+_+d);return o=_*m,a=d*m,t.copy(n).addScaledVector(pr,o).addScaledVector(mr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Gm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},ua={h:0,s:0,l:0};function qc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class X{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,mt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=mt.workingColorSpace){if(e=Ih(e,1),t=Gt(t,0,1),n=Gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=qc(o,r,e+1/3),this.g=qc(o,r,e),this.b=qc(o,r,e-1/3)}return mt.toWorkingColorSpace(this,i),this}setStyle(e,t=Ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const n=Gm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}copyLinearToSRGB(e){return this.r=Dr(e.r),this.g=Dr(e.g),this.b=Dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return mt.fromWorkingColorSpace(mn.copy(this),e),Math.round(Gt(mn.r*255,0,255))*65536+Math.round(Gt(mn.g*255,0,255))*256+Math.round(Gt(mn.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.fromWorkingColorSpace(mn.copy(this),t);const n=mn.r,i=mn.g,r=mn.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mt.workingColorSpace){return mt.fromWorkingColorSpace(mn.copy(this),t),e.r=mn.r,e.g=mn.g,e.b=mn.b,e}getStyle(e=Ht){mt.fromWorkingColorSpace(mn.copy(this),e);const t=mn.r,n=mn.g,i=mn.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(ua);const n=Lo(qi.h,ua.h,t),i=Lo(qi.s,ua.s,t),r=Lo(qi.l,ua.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new X;X.NAMES=Gm;let k_=0;class Kt extends gi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Ln(),this.name="",this.blending=Vs,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ll,this.blendDst=cl,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ll&&(n.blendSrc=this.blendSrc),this.blendDst!==cl&&(n.blendDst=this.blendDst),this.blendEquation!==Ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Cs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Cs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class bt extends Kt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ri=z_();function z_(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function An(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Gt(s,-65504,65504),Ri.floatView[0]=s;const e=Ri.uint32View[0],t=e>>23&511;return Ri.baseTable[t]+((e&8388607)>>Ri.shiftTable[t])}function So(s){const e=s>>10;return Ri.uint32View[0]=Ri.mantissaTable[Ri.offsetTable[e]+(s&1023)]+Ri.exponentTable[e],Ri.floatView[0]}const V_={toHalfFloat:An,fromHalfFloat:So},jt=new b,ha=new ne;class Je{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ko,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ha.fromBufferAttribute(this,t),ha.applyMatrix3(e),this.setXY(t,ha.x,ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ko&&(e.usage=this.usage),e}}class H_ extends Je{constructor(e,t,n){super(new Int8Array(e),t,n)}}class G_ extends Je{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class W_ extends Je{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class X_ extends Je{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Uh extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class q_ extends Je{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Dh extends Je{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Y_ extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=So(this.array[e*this.itemSize]);return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=An(t),this}getY(e){let t=So(this.array[e*this.itemSize+1]);return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=An(t),this}getZ(e){let t=So(this.array[e*this.itemSize+2]);return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=An(t),this}getW(e){let t=So(this.array[e*this.itemSize+3]);return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=An(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=An(t),this.array[e+1]=An(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=An(t),this.array[e+1]=An(n),this.array[e+2]=An(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.array[e+0]=An(t),this.array[e+1]=An(n),this.array[e+2]=An(i),this.array[e+3]=An(r),this}}class Ne extends Je{constructor(e,t,n){super(new Float32Array(e),t,n)}}let j_=0;const Nn=new ke,Yc=new pt,gr=new b,Pn=new un,ro=new un,rn=new b;class qe extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(km(e)?Dh:Uh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,n){return Nn.makeTranslation(e,t,n),this.applyMatrix4(Nn),this}scale(e,t,n){return Nn.makeScale(e,t,n),this.applyMatrix4(Nn),this}lookAt(e){return Yc.lookAt(e),Yc.updateMatrix(),this.applyMatrix4(Yc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gr).negate(),this.translate(gr.x,gr.y,gr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ne(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ro.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(Pn.min,ro.min),Pn.expandByPoint(rn),rn.addVectors(Pn.max,ro.max),Pn.expandByPoint(rn)):(Pn.expandByPoint(ro.min),Pn.expandByPoint(ro.max))}Pn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)rn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(rn));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)rn.fromBufferAttribute(a,c),l&&(gr.fromBufferAttribute(e,c),rn.add(gr)),i=Math.max(i,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new b,l[A]=new b;const c=new b,u=new b,h=new b,d=new ne,f=new ne,p=new ne,_=new b,g=new b;function m(A,S,M){c.fromBufferAttribute(n,A),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,M),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,S),p.fromBufferAttribute(r,M),u.sub(c),h.sub(c),f.sub(d),p.sub(d);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(h,-f.y).multiplyScalar(P),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(P),a[A].add(_),a[S].add(_),a[M].add(_),l[A].add(g),l[S].add(g),l[M].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let A=0,S=v.length;A<S;++A){const M=v[A],P=M.start,F=M.count;for(let B=P,U=P+F;B<U;B+=3)m(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const y=new b,x=new b,E=new b,T=new b;function w(A){E.fromBufferAttribute(i,A),T.copy(E);const S=a[A];y.copy(S),y.sub(E.multiplyScalar(E.dot(S))).normalize(),x.crossVectors(T,S);const P=x.dot(l[A])<0?-1:1;o.setXYZW(A,y.x,y.y,y.z,P)}for(let A=0,S=v.length;A<S;++A){const M=v[A],P=M.start,F=M.count;for(let B=P,U=P+F;B<U;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new b,r=new b,o=new b,a=new b,l=new b,c=new b,u=new b,h=new b;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let m=0;m<u;m++)d[p++]=c[f++]}return new Je(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qe,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ud=new ke,fs=new qr,da=new hn,Dd=new b,fa=new b,pa=new b,ma=new b,jc=new b,ga=new b,Nd=new b,_a=new b;class Ie extends pt{constructor(e=new qe,t=new bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){ga.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(jc.fromBufferAttribute(h,e),o?ga.addScaledVector(jc,u):ga.addScaledVector(jc.sub(t),u))}t.add(ga)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(r),fs.copy(e.ray).recast(e.near),!(da.containsPoint(fs.origin)===!1&&(fs.intersectSphere(da,Dd)===null||fs.origin.distanceToSquared(Dd)>(e.far-e.near)**2))&&(Ud.copy(r).invert(),fs.copy(e.ray).applyMatrix4(Ud),!(n.boundingBox!==null&&fs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,fs)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,E=y;x<E;x+=3){const T=a.getX(x),w=a.getX(x+1),A=a.getX(x+2);i=va(this,m,e,n,c,u,h,T,w,A),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=a.getX(g),y=a.getX(g+1),x=a.getX(g+2);i=va(this,o,e,n,c,u,h,v,y,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,E=y;x<E;x+=3){const T=x,w=x+1,A=x+2;i=va(this,m,e,n,c,u,h,T,w,A),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,y=g+1,x=g+2;i=va(this,o,e,n,c,u,h,v,y,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Z_(s,e,t,n,i,r,o,a){let l;if(e.side===$t?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===di,a),l===null)return null;_a.copy(a),_a.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(_a);return c<t.near||c>t.far?null:{distance:c,point:_a.clone(),object:s}}function va(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,fa),s.getVertexPosition(l,pa),s.getVertexPosition(c,ma);const u=Z_(s,e,t,n,fa,pa,ma,Nd);if(u){const h=new b;En.getBarycoord(Nd,fa,pa,ma,h),i&&(u.uv=En.getInterpolatedAttribute(i,a,l,c,h,new ne)),r&&(u.uv1=En.getInterpolatedAttribute(r,a,l,c,h,new ne)),o&&(u.normal=En.getInterpolatedAttribute(o,a,l,c,h,new b),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new b,materialIndex:0};En.getNormal(fa,pa,ma,d.normal),u.face=d,u.barycoord=h}return u}class Pt extends qe{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(h,2));function p(_,g,m,v,y,x,E,T,w,A,S){const M=x/w,P=E/A,F=x/2,B=E/2,U=T/2,z=w+1,k=A+1;let j=0,W=0;const ae=new b;for(let oe=0;oe<k;oe++){const be=oe*P-B;for(let Xe=0;Xe<z;Xe++){const We=Xe*M-F;ae[_]=We*v,ae[g]=be*y,ae[m]=U,c.push(ae.x,ae.y,ae.z),ae[_]=0,ae[g]=0,ae[m]=T>0?1:-1,u.push(ae.x,ae.y,ae.z),h.push(Xe/w),h.push(1-oe/A),j+=1}}for(let oe=0;oe<A;oe++)for(let be=0;be<w;be++){const Xe=d+be+z*oe,We=d+be+z*(oe+1),$=d+(be+1)+z*(oe+1),pe=d+(be+1)+z*oe;l.push(Xe,We,pe),l.push(We,$,pe),W+=6}a.addGroup(f,W,S),f+=W,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function xn(s){const e={};for(let t=0;t<s.length;t++){const n=Vr(s[t]);for(const i in n)e[i]=n[i]}return e}function $_(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Wm(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const Vn={clone:Vr,merge:xn};var K_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,J_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mt extends Kt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=K_,this.fragmentShader=J_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vr(e.uniforms),this.uniformsGroups=$_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class dc extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=li}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new b,Od=new ne,Fd=new ne;class Zt extends dc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(Gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,t){return this.getViewBounds(e,Od,Fd),t.subVectors(Fd,Od)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const _r=-90,vr=1;class Xm extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Zt(_r,vr,e,t);i.layers=this.layers,this.add(i);const r=new Zt(_r,vr,e,t);r.layers=this.layers,this.add(r);const o=new Zt(_r,vr,e,t);o.layers=this.layers,this.add(o);const a=new Zt(_r,vr,e,t);a.layers=this.layers,this.add(a);const l=new Zt(_r,vr,e,t);l.layers=this.layers,this.add(l);const c=new Zt(_r,vr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===li)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class $o extends Ut{constructor(e,t,n,i,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Li,super(e,t,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qm extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new $o(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Pt(5,5,5),r=new Mt({name:"CubemapFromEquirect",uniforms:Vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:ui});r.uniforms.tEquirect.value=t;const o=new Ie(i,r),a=t.minFilter;return t.minFilter===Bn&&(t.minFilter=Ft),new Xm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const Zc=new b,Q_=new b,ev=new et;class ai{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Zc.subVectors(n,t).cross(Q_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Zc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ev.getNormalMatrix(e),i=this.coplanarPoint(Zc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ps=new hn,xa=new b;class Ko{constructor(e=new ai,t=new ai,n=new ai,i=new ai,r=new ai,o=new ai){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=li){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],p=i[9],_=i[10],g=i[11],m=i[12],v=i[13],y=i[14],x=i[15];if(n[0].setComponents(l-r,d-c,g-f,x-m).normalize(),n[1].setComponents(l+r,d+c,g+f,x+m).normalize(),n[2].setComponents(l+o,d+u,g+p,x+v).normalize(),n[3].setComponents(l-o,d-u,g-p,x-v).normalize(),n[4].setComponents(l-a,d-h,g-_,x-y).normalize(),t===li)n[5].setComponents(l+a,d+h,g+_,x+y).normalize();else if(t===zo)n[5].setComponents(a,h,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(e){return ps.center.set(0,0,0),ps.radius=.7071067811865476,ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(xa.x=i.normal.x>0?e.max.x:e.min.x,xa.y=i.normal.y>0?e.max.y:e.min.y,xa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(xa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ym(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function tv(s){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(s.bindBuffer(c,a),h.length===0)s.bufferSubData(c,0,u);else{h.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<h.length;f++){const p=h[d],_=h[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,p=h.length;f<p;f++){const _=h[f];s.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class _i extends qe{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,d=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<u;m++){const v=m*d-o;for(let y=0;y<c;y++){const x=y*h-r;p.push(x,-v,0),_.push(0,0,1),g.push(y/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){const y=v+c*m,x=v+c*(m+1),E=v+1+c*(m+1),T=v+1+c*m;f.push(y,x,T),f.push(x,E,T)}this.setIndex(f),this.setAttribute("position",new Ne(p,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.width,e.height,e.widthSegments,e.heightSegments)}}var nv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ov=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,av=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,hv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_v=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Tv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Av=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ev=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Rv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Nv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ov=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,jv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$v=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ex=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ix=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ox=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ax=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ux=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,px=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_x=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ax=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ex=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Px=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ux=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ox=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Bx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Vx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Xx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$x=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ey=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ty=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ny=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ry=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ay=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ly=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,cy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,py=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,my=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_y=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,My=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,by=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ty=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ay=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ey=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ry=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Py=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ly=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Uy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dt={alphahash_fragment:nv,alphahash_pars_fragment:iv,alphamap_fragment:sv,alphamap_pars_fragment:rv,alphatest_fragment:ov,alphatest_pars_fragment:av,aomap_fragment:lv,aomap_pars_fragment:cv,batching_pars_vertex:uv,batching_vertex:hv,begin_vertex:dv,beginnormal_vertex:fv,bsdfs:pv,iridescence_fragment:mv,bumpmap_pars_fragment:gv,clipping_planes_fragment:_v,clipping_planes_pars_fragment:vv,clipping_planes_pars_vertex:xv,clipping_planes_vertex:yv,color_fragment:Mv,color_pars_fragment:Sv,color_pars_vertex:wv,color_vertex:bv,common:Tv,cube_uv_reflection_fragment:Av,defaultnormal_vertex:Ev,displacementmap_pars_vertex:Rv,displacementmap_vertex:Cv,emissivemap_fragment:Pv,emissivemap_pars_fragment:Iv,colorspace_fragment:Lv,colorspace_pars_fragment:Uv,envmap_fragment:Dv,envmap_common_pars_fragment:Nv,envmap_pars_fragment:Ov,envmap_pars_vertex:Fv,envmap_physical_pars_fragment:jv,envmap_vertex:Bv,fog_vertex:kv,fog_pars_vertex:zv,fog_fragment:Vv,fog_pars_fragment:Hv,gradientmap_pars_fragment:Gv,lightmap_pars_fragment:Wv,lights_lambert_fragment:Xv,lights_lambert_pars_fragment:qv,lights_pars_begin:Yv,lights_toon_fragment:Zv,lights_toon_pars_fragment:$v,lights_phong_fragment:Kv,lights_phong_pars_fragment:Jv,lights_physical_fragment:Qv,lights_physical_pars_fragment:ex,lights_fragment_begin:tx,lights_fragment_maps:nx,lights_fragment_end:ix,logdepthbuf_fragment:sx,logdepthbuf_pars_fragment:rx,logdepthbuf_pars_vertex:ox,logdepthbuf_vertex:ax,map_fragment:lx,map_pars_fragment:cx,map_particle_fragment:ux,map_particle_pars_fragment:hx,metalnessmap_fragment:dx,metalnessmap_pars_fragment:fx,morphinstance_vertex:px,morphcolor_vertex:mx,morphnormal_vertex:gx,morphtarget_pars_vertex:_x,morphtarget_vertex:vx,normal_fragment_begin:xx,normal_fragment_maps:yx,normal_pars_fragment:Mx,normal_pars_vertex:Sx,normal_vertex:wx,normalmap_pars_fragment:bx,clearcoat_normal_fragment_begin:Tx,clearcoat_normal_fragment_maps:Ax,clearcoat_pars_fragment:Ex,iridescence_pars_fragment:Rx,opaque_fragment:Cx,packing:Px,premultiplied_alpha_fragment:Ix,project_vertex:Lx,dithering_fragment:Ux,dithering_pars_fragment:Dx,roughnessmap_fragment:Nx,roughnessmap_pars_fragment:Ox,shadowmap_pars_fragment:Fx,shadowmap_pars_vertex:Bx,shadowmap_vertex:kx,shadowmask_pars_fragment:zx,skinbase_vertex:Vx,skinning_pars_vertex:Hx,skinning_vertex:Gx,skinnormal_vertex:Wx,specularmap_fragment:Xx,specularmap_pars_fragment:qx,tonemapping_fragment:Yx,tonemapping_pars_fragment:jx,transmission_fragment:Zx,transmission_pars_fragment:$x,uv_pars_fragment:Kx,uv_pars_vertex:Jx,uv_vertex:Qx,worldpos_vertex:ey,background_vert:ty,background_frag:ny,backgroundCube_vert:iy,backgroundCube_frag:sy,cube_vert:ry,cube_frag:oy,depth_vert:ay,depth_frag:ly,distanceRGBA_vert:cy,distanceRGBA_frag:uy,equirect_vert:hy,equirect_frag:dy,linedashed_vert:fy,linedashed_frag:py,meshbasic_vert:my,meshbasic_frag:gy,meshlambert_vert:_y,meshlambert_frag:vy,meshmatcap_vert:xy,meshmatcap_frag:yy,meshnormal_vert:My,meshnormal_frag:Sy,meshphong_vert:wy,meshphong_frag:by,meshphysical_vert:Ty,meshphysical_frag:Ay,meshtoon_vert:Ey,meshtoon_frag:Ry,points_vert:Cy,points_frag:Py,shadow_vert:Iy,shadow_frag:Ly,sprite_vert:Uy,sprite_frag:Dy},Re={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Zn={basic:{uniforms:xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new X(0)}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:xn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:xn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new X(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:xn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:xn([Re.points,Re.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:xn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:xn([Re.common,Re.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:xn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:xn([Re.sprite,Re.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distanceRGBA:{uniforms:xn([Re.common,Re.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distanceRGBA_vert,fragmentShader:dt.distanceRGBA_frag},shadow:{uniforms:xn([Re.lights,Re.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};Zn.physical={uniforms:xn([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};const ya={r:0,b:0,g:0},ms=new an,Ny=new ke;function Oy(s,e,t,n,i,r,o){const a=new X(0);let l=r===!0?0:1,c,u,h=null,d=0,f=null;function p(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function _(v){let y=!1;const x=p(v);x===null?m(a,l):x&&x.isColor&&(m(x,1),y=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(v,y){const x=p(y);x&&(x.isCubeTexture||x.mapping===Xr)?(u===void 0&&(u=new Ie(new Pt(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:Vr(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ms.copy(y.backgroundRotation),ms.x*=-1,ms.y*=-1,ms.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ny.makeRotationFromEuler(ms)),u.material.toneMapped=mt.getTransfer(x.colorSpace)!==Tt,(h!==x||d!==x.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=x,d=x.version,f=s.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ie(new _i(2,2),new Mt({name:"BackgroundMaterial",uniforms:Vr(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=mt.getTransfer(x.colorSpace)!==Tt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,f=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,y){v.getRGB(ya,Wm(s)),n.buffers.color.setClear(ya.r,ya.g,ya.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),l=y,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(a,l)},render:_,addToRenderList:g}}function Fy(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(M,P,F,B,U){let z=!1;const k=h(B,F,P);r!==k&&(r=k,c(r.object)),z=f(M,B,F,U),z&&p(M,B,F,U),U!==null&&e.update(U,s.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,x(M,P,F,B),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function u(M){return s.deleteVertexArray(M)}function h(M,P,F){const B=F.wireframe===!0;let U=n[M.id];U===void 0&&(U={},n[M.id]=U);let z=U[P.id];z===void 0&&(z={},U[P.id]=z);let k=z[B];return k===void 0&&(k=d(l()),z[B]=k),k}function d(M){const P=[],F=[],B=[];for(let U=0;U<t;U++)P[U]=0,F[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:B,object:M,attributes:{},index:null}}function f(M,P,F,B){const U=r.attributes,z=P.attributes;let k=0;const j=F.getAttributes();for(const W in j)if(j[W].location>=0){const oe=U[W];let be=z[W];if(be===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(be=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(be=M.instanceColor)),oe===void 0||oe.attribute!==be||be&&oe.data!==be.data)return!0;k++}return r.attributesNum!==k||r.index!==B}function p(M,P,F,B){const U={},z=P.attributes;let k=0;const j=F.getAttributes();for(const W in j)if(j[W].location>=0){let oe=z[W];oe===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor));const be={};be.attribute=oe,oe&&oe.data&&(be.data=oe.data),U[W]=be,k++}r.attributes=U,r.attributesNum=k,r.index=B}function _(){const M=r.newAttributes;for(let P=0,F=M.length;P<F;P++)M[P]=0}function g(M){m(M,0)}function m(M,P){const F=r.newAttributes,B=r.enabledAttributes,U=r.attributeDivisors;F[M]=1,B[M]===0&&(s.enableVertexAttribArray(M),B[M]=1),U[M]!==P&&(s.vertexAttribDivisor(M,P),U[M]=P)}function v(){const M=r.newAttributes,P=r.enabledAttributes;for(let F=0,B=P.length;F<B;F++)P[F]!==M[F]&&(s.disableVertexAttribArray(F),P[F]=0)}function y(M,P,F,B,U,z,k){k===!0?s.vertexAttribIPointer(M,P,F,U,z):s.vertexAttribPointer(M,P,F,B,U,z)}function x(M,P,F,B){_();const U=B.attributes,z=F.getAttributes(),k=P.defaultAttributeValues;for(const j in z){const W=z[j];if(W.location>=0){let ae=U[j];if(ae===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),ae!==void 0){const oe=ae.normalized,be=ae.itemSize,Xe=e.get(ae);if(Xe===void 0)continue;const We=Xe.buffer,$=Xe.type,pe=Xe.bytesPerElement,Le=$===s.INT||$===s.UNSIGNED_INT||ae.gpuType===ic;if(ae.isInterleavedBufferAttribute){const me=ae.data,Oe=me.stride,Ke=ae.offset;if(me.isInstancedInterleavedBuffer){for(let je=0;je<W.locationSize;je++)m(W.location+je,me.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let je=0;je<W.locationSize;je++)g(W.location+je);s.bindBuffer(s.ARRAY_BUFFER,We);for(let je=0;je<W.locationSize;je++)y(W.location+je,be/W.locationSize,$,oe,Oe*pe,(Ke+be/W.locationSize*je)*pe,Le)}else{if(ae.isInstancedBufferAttribute){for(let me=0;me<W.locationSize;me++)m(W.location+me,ae.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let me=0;me<W.locationSize;me++)g(W.location+me);s.bindBuffer(s.ARRAY_BUFFER,We);for(let me=0;me<W.locationSize;me++)y(W.location+me,be/W.locationSize,$,oe,be*pe,be/W.locationSize*me*pe,Le)}}else if(k!==void 0){const oe=k[j];if(oe!==void 0)switch(oe.length){case 2:s.vertexAttrib2fv(W.location,oe);break;case 3:s.vertexAttrib3fv(W.location,oe);break;case 4:s.vertexAttrib4fv(W.location,oe);break;default:s.vertexAttrib1fv(W.location,oe)}}}}v()}function E(){A();for(const M in n){const P=n[M];for(const F in P){const B=P[F];for(const U in B)u(B[U].object),delete B[U];delete P[F]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const F in P){const B=P[F];for(const U in B)u(B[U].object),delete B[U];delete P[F]}delete n[M.id]}function w(M){for(const P in n){const F=n[P];if(F[M.id]===void 0)continue;const B=F[M.id];for(const U in B)u(B[U].object),delete B[U];delete F[M.id]}}function A(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:A,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function By(s,e,t){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(s.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let p=0;p<h;p++)f+=u[p];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)o(c[p],u[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_]*d[_];t.update(p,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ky(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==ln&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const A=w===Kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==fi&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Rn&&!A)}function l(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:E,maxSamples:T}}function zy(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new ai,a=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const p=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,m=s.get(h);if(!i||p===null||p.length===0||r&&!g)r?u(null):c();else{const v=r?0:n,y=v*4;let x=m.clippingState||null;l.value=x,x=u(p,d,y,f);for(let E=0;E!==y;++E)x[E]=t[E];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,p){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,x=f;y!==_;++y,x+=4)o.copy(h[y]).applyMatrix4(v,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function Vy(s){let e=new WeakMap;function t(o,a){return a===Oo?o.mapping=Li:a===Fo&&(o.mapping=es),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Oo||a===Fo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new qm(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Yr extends dc{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ir=4,Bd=[.125,.215,.35,.446,.526,.582],Is=20,$c=new Yr,kd=new X;let Kc=null,Jc=0,Qc=0,eu=!1;const Ps=(1+Math.sqrt(5))/2,xr=1/Ps,zd=[new b(-Ps,xr,0),new b(Ps,xr,0),new b(-xr,0,Ps),new b(xr,0,Ps),new b(0,Ps,-xr),new b(0,Ps,xr),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class Xu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Kc=this._renderer.getRenderTarget(),Jc=this._renderer.getActiveCubeFace(),Qc=this._renderer.getActiveMipmapLevel(),eu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Kc,Jc,Qc),this._renderer.xr.enabled=eu,e.scissorTest=!1,Ma(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kc=this._renderer.getRenderTarget(),Jc=this._renderer.getActiveCubeFace(),Qc=this._renderer.getActiveMipmapLevel(),eu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:Kn,format:ln,colorSpace:_n,depthBuffer:!1},i=Vd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vd(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hy(r)),this._blurMaterial=Gy(r,e,t)}return i}_compileMaterial(e){const t=new Ie(this._lodPlanes[0],e);this._renderer.compile(t,$c)}_sceneToCubeUV(e,t,n,i){const a=new Zt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(kd),u.toneMapping=Pi,u.autoClear=!1;const f=new bt({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),p=new Ie(new Pt,f);let _=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,_=!0):(f.color.copy(kd),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):v===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const y=this._cubeSize;Ma(i,v*y,m>2?y:0,y,y),u.setRenderTarget(i),_&&u.render(p,a),u.render(e,a)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Li||e.mapping===es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hd());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Ma(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,$c)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zd[(i-r-1)%zd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ie(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Is-1),_=r/p,g=isFinite(r)?1+Math.floor(u*_):Is;g>Is&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Is}`);const m=[];let v=0;for(let w=0;w<Is;++w){const A=w/_,S=Math.exp(-A*A/2);m.push(S),w===0?v+=S:w<g&&(v+=2*S)}for(let w=0;w<m.length;w++)m[w]=m[w]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=p,d.mipInt.value=y-n;const x=this._sizeLods[i],E=3*x*(i>y-Ir?i-y+Ir:0),T=4*(this._cubeSize-x);Ma(t,E,T,3*x,2*x),l.setRenderTarget(t),l.render(h,$c)}}function Hy(s){const e=[],t=[],n=[];let i=s;const r=s-Ir+1+Bd.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Ir?l=Bd[o-s+Ir-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),y=new Float32Array(g*p*f),x=new Float32Array(m*p*f);for(let T=0;T<f;T++){const w=T%3*2/3-1,A=T>2?0:-1,S=[w,A,0,w+2/3,A,0,w+2/3,A+1,0,w,A,0,w+2/3,A+1,0,w,A+1,0];v.set(S,_*p*T),y.set(d,g*p*T);const M=[T,T,T,T,T,T];x.set(M,m*p*T)}const E=new qe;E.setAttribute("position",new Je(v,_)),E.setAttribute("uv",new Je(y,g)),E.setAttribute("faceIndex",new Je(x,m)),e.push(E),i>Ir&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Vd(s,e,t){const n=new cn(s,e,t);return n.texture.mapping=Xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ma(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Gy(s,e,t){const n=new Float32Array(Is),i=new b(0,1,0);return new Mt({name:"SphericalGaussianBlur",defines:{n:Is,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Hd(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Gd(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Nh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Wy(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Oo||l===Fo,u=l===Li||l===es;if(c||u){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Xu(s)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Xu(s)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Xy(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Mo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function qy(s,e,t,n){const i={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);for(const p in d.morphAttributes){const _=d.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)e.remove(_[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const p in f){const _=f[p];for(let g=0,m=_.length;g<m;g++)e.update(_[g],s.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,p=h.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let y=0,x=v.length;y<x;y+=3){const E=v[y+0],T=v[y+1],w=v[y+2];d.push(E,T,T,w,w,E)}}else if(p!==void 0){const v=p.array;_=p.version;for(let y=0,x=v.length/3-1;y<x;y+=3){const E=y+0,T=y+1,w=y+2;d.push(E,T,T,w,w,E)}}else return;const g=new(km(d)?Dh:Uh)(d,1);g.version=_;const m=r.get(h);m&&e.remove(m),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Yy(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,p){p!==0&&(s.drawElementsInstanced(n,f,r,d*o,p),t.update(f,n,p))}function u(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function h(d,f,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=f[v]*_[v];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function jy(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Zy(s,e,t){const n=new WeakMap,i=new xt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let S=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),p===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const T=new Float32Array(x*E*4*h),w=new uc(T,x,E,h);w.type=Rn,w.needsUpdate=!0;const A=y*4;for(let M=0;M<h;M++){const P=g[M],F=m[M],B=v[M],U=x*E*4*M;for(let z=0;z<P.count;z++){const k=z*A;f===!0&&(i.fromBufferAttribute(P,z),T[U+k+0]=i.x,T[U+k+1]=i.y,T[U+k+2]=i.z,T[U+k+3]=0),p===!0&&(i.fromBufferAttribute(F,z),T[U+k+4]=i.x,T[U+k+5]=i.y,T[U+k+6]=i.z,T[U+k+7]=0),_===!0&&(i.fromBufferAttribute(B,z),T[U+k+8]=i.x,T[U+k+9]=i.y,T[U+k+10]=i.z,T[U+k+11]=B.itemSize===4?i.w:1)}}d={count:h,texture:w,size:new ne(x,E)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function $y(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Oh extends Ut{constructor(e,t,n,i,r,o,a,l,c,u=Hs){if(u!==Hs&&u!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Hs&&(n=Ui),n===void 0&&u===$s&&(n=Zs),super(null,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:qt,this.minFilter=l!==void 0?l:qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const jm=new Ut,Wd=new Oh(1,1),Zm=new uc,$m=new Lh,Km=new $o,Xd=[],qd=[],Yd=new Float32Array(16),jd=new Float32Array(9),Zd=new Float32Array(4);function jr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Xd[i];if(r===void 0&&(r=new Float32Array(i),Xd[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function nn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function sn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function fc(s,e){let t=qd[e];t===void 0&&(t=new Int32Array(e),qd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Ky(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Jy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2fv(this.addr,e),sn(t,e)}}function Qy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;s.uniform3fv(this.addr,e),sn(t,e)}}function eM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4fv(this.addr,e),sn(t,e)}}function tM(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;Zd.set(n),s.uniformMatrix2fv(this.addr,!1,Zd),sn(t,n)}}function nM(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;jd.set(n),s.uniformMatrix3fv(this.addr,!1,jd),sn(t,n)}}function iM(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;Yd.set(n),s.uniformMatrix4fv(this.addr,!1,Yd),sn(t,n)}}function sM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function rM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2iv(this.addr,e),sn(t,e)}}function oM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;s.uniform3iv(this.addr,e),sn(t,e)}}function aM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4iv(this.addr,e),sn(t,e)}}function lM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function cM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2uiv(this.addr,e),sn(t,e)}}function uM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;s.uniform3uiv(this.addr,e),sn(t,e)}}function hM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4uiv(this.addr,e),sn(t,e)}}function dM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Wd.compareFunction=Ph,r=Wd):r=jm,t.setTexture2D(e||r,i)}function fM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||$m,i)}function pM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Km,i)}function mM(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Zm,i)}function gM(s){switch(s){case 5126:return Ky;case 35664:return Jy;case 35665:return Qy;case 35666:return eM;case 35674:return tM;case 35675:return nM;case 35676:return iM;case 5124:case 35670:return sM;case 35667:case 35671:return rM;case 35668:case 35672:return oM;case 35669:case 35673:return aM;case 5125:return lM;case 36294:return cM;case 36295:return uM;case 36296:return hM;case 35678:case 36198:case 36298:case 36306:case 35682:return dM;case 35679:case 36299:case 36307:return fM;case 35680:case 36300:case 36308:case 36293:return pM;case 36289:case 36303:case 36311:case 36292:return mM}}function _M(s,e){s.uniform1fv(this.addr,e)}function vM(s,e){const t=jr(e,this.size,2);s.uniform2fv(this.addr,t)}function xM(s,e){const t=jr(e,this.size,3);s.uniform3fv(this.addr,t)}function yM(s,e){const t=jr(e,this.size,4);s.uniform4fv(this.addr,t)}function MM(s,e){const t=jr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function SM(s,e){const t=jr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function wM(s,e){const t=jr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function bM(s,e){s.uniform1iv(this.addr,e)}function TM(s,e){s.uniform2iv(this.addr,e)}function AM(s,e){s.uniform3iv(this.addr,e)}function EM(s,e){s.uniform4iv(this.addr,e)}function RM(s,e){s.uniform1uiv(this.addr,e)}function CM(s,e){s.uniform2uiv(this.addr,e)}function PM(s,e){s.uniform3uiv(this.addr,e)}function IM(s,e){s.uniform4uiv(this.addr,e)}function LM(s,e,t){const n=this.cache,i=e.length,r=fc(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||jm,r[o])}function UM(s,e,t){const n=this.cache,i=e.length,r=fc(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||$m,r[o])}function DM(s,e,t){const n=this.cache,i=e.length,r=fc(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Km,r[o])}function NM(s,e,t){const n=this.cache,i=e.length,r=fc(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Zm,r[o])}function OM(s){switch(s){case 5126:return _M;case 35664:return vM;case 35665:return xM;case 35666:return yM;case 35674:return MM;case 35675:return SM;case 35676:return wM;case 5124:case 35670:return bM;case 35667:case 35671:return TM;case 35668:case 35672:return AM;case 35669:case 35673:return EM;case 5125:return RM;case 36294:return CM;case 36295:return PM;case 36296:return IM;case 35678:case 36198:case 36298:case 36306:case 35682:return LM;case 35679:case 36299:case 36307:return UM;case 35680:case 36300:case 36308:case 36293:return DM;case 36289:case 36303:case 36311:case 36292:return NM}}class FM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gM(t.type)}}class BM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=OM(t.type)}}class kM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const tu=/(\w+)(\])?(\[|\.)?/g;function $d(s,e){s.seq.push(e),s.map[e.id]=e}function zM(s,e,t){const n=s.name,i=n.length;for(tu.lastIndex=0;;){const r=tu.exec(n),o=tu.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){$d(t,c===void 0?new FM(a,s,e):new BM(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new kM(a),$d(t,h)),t=h}}}class il{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);zM(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Kd(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const VM=37297;let HM=0;function GM(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Jd=new et;function WM(s){mt._getMatrix(Jd,mt.workingColorSpace,s);const e=`mat3( ${Jd.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(s)){case Zo:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Qd(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+GM(s.getShaderSource(e),o)}else return i}function XM(s,e){const t=WM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function qM(s,e){let t;switch(e){case uh:t="Linear";break;case hh:t="Reinhard";break;case dh:t="Cineon";break;case fh:t="ACESFilmic";break;case ph:t="AgX";break;case mh:t="Neutral";break;case Tm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sa=new b;function YM(){mt.getLuminanceCoefficients(Sa);const s=Sa.x.toFixed(4),e=Sa.y.toFixed(4),t=Sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function ZM(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function $M(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function wo(s){return s!==""}function ef(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const KM=/^[ \t]*#include +<([\w\d./]+)>/gm;function qu(s){return s.replace(KM,QM)}const JM=new Map;function QM(s,e){let t=dt[e];if(t===void 0){const n=JM.get(e);if(n!==void 0)t=dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return qu(t)}const eS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nf(s){return s.replace(eS,tS)}function tS(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function sf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function nS(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ec?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===ch?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===oi&&(e="SHADOWMAP_TYPE_VSM"),e}function iS(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Li:case es:e="ENVMAP_TYPE_CUBE";break;case Xr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sS(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case es:e="ENVMAP_MODE_REFRACTION";break}return e}function rS(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Yo:e="ENVMAP_BLENDING_MULTIPLY";break;case wm:e="ENVMAP_BLENDING_MIX";break;case bm:e="ENVMAP_BLENDING_ADD";break}return e}function oS(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function aS(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=nS(t),c=iS(t),u=sS(t),h=rS(t),d=oS(t),f=jM(t),p=ZM(r),_=i.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(wo).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(wo).join(`
`),m.length>0&&(m+=`
`)):(g=[sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),m=[sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?dt.tonemapping_pars_fragment:"",t.toneMapping!==Pi?qM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,XM("linearToOutputTexel",t.outputColorSpace),YM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wo).join(`
`)),o=qu(o),o=ef(o,t),o=tf(o,t),a=qu(a),a=ef(a,t),a=tf(a,t),o=nf(o),a=nf(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Wu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=v+g+o,x=v+m+a,E=Kd(i,i.VERTEX_SHADER,y),T=Kd(i,i.FRAGMENT_SHADER,x);i.attachShader(_,E),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(P){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(E).trim(),U=i.getShaderInfoLog(T).trim();let z=!0,k=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,T);else{const j=Qd(i,E,"vertex"),W=Qd(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+j+`
`+W)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(B===""||U==="")&&(k=!1);k&&(P.diagnostics={runnable:z,programLog:F,vertexShader:{log:B,prefix:g},fragmentShader:{log:U,prefix:m}})}i.deleteShader(E),i.deleteShader(T),A=new il(i,_),S=$M(i,_)}let A;this.getUniforms=function(){return A===void 0&&w(this),A};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,VM)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=HM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}let lS=0;class cS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new uS(e),t.set(e,n)),n}}class uS{constructor(e){this.id=lS++,this.code=e,this.usedTimes=0}}function hS(s,e,t,n,i,r,o){const a=new hc,l=new cS,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,F,B){const U=F.fog,z=B.geometry,k=S.isMeshStandardMaterial?F.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||k),W=j&&j.mapping===Xr?j.image.height:null,ae=p[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const oe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,be=oe!==void 0?oe.length:0;let Xe=0;z.morphAttributes.position!==void 0&&(Xe=1),z.morphAttributes.normal!==void 0&&(Xe=2),z.morphAttributes.color!==void 0&&(Xe=3);let We,$,pe,Le;if(ae){const lt=Zn[ae];We=lt.vertexShader,$=lt.fragmentShader}else We=S.vertexShader,$=S.fragmentShader,l.update(S),pe=l.getVertexShaderID(S),Le=l.getFragmentShaderID(S);const me=s.getRenderTarget(),Oe=s.state.buffers.depth.getReversed(),Ke=B.isInstancedMesh===!0,je=B.isBatchedMesh===!0,it=!!S.map,le=!!S.matcap,_e=!!j,D=!!S.aoMap,ze=!!S.lightMap,fe=!!S.bumpMap,Ue=!!S.normalMap,xe=!!S.displacementMap,$e=!!S.emissiveMap,Pe=!!S.metalnessMap,I=!!S.roughnessMap,R=S.anisotropy>0,q=S.clearcoat>0,ee=S.dispersion>0,re=S.iridescence>0,V=S.sheen>0,de=S.transmission>0,ce=R&&!!S.anisotropyMap,Ee=q&&!!S.clearcoatMap,te=q&&!!S.clearcoatNormalMap,J=q&&!!S.clearcoatRoughnessMap,Me=re&&!!S.iridescenceMap,De=re&&!!S.iridescenceThicknessMap,Be=V&&!!S.sheenColorMap,ve=V&&!!S.sheenRoughnessMap,Se=!!S.specularMap,we=!!S.specularColorMap,ut=!!S.specularIntensityMap,O=de&&!!S.transmissionMap,Ce=de&&!!S.thicknessMap,K=!!S.gradientMap,N=!!S.alphaMap,se=S.alphaTest>0,ie=!!S.alphaHash,Te=!!S.extensions;let Ze=Pi;S.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(Ze=s.toneMapping);const rt={shaderID:ae,shaderType:S.type,shaderName:S.name,vertexShader:We,fragmentShader:$,defines:S.defines,customVertexShaderID:pe,customFragmentShaderID:Le,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:je,batchingColor:je&&B._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&B.instanceColor!==null,instancingMorph:Ke&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:me===null?s.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:_n,alphaToCoverage:!!S.alphaToCoverage,map:it,matcap:le,envMap:_e,envMapMode:_e&&j.mapping,envMapCubeUVHeight:W,aoMap:D,lightMap:ze,bumpMap:fe,normalMap:Ue,displacementMap:d&&xe,emissiveMap:$e,normalMapObjectSpace:Ue&&S.normalMapType===Pm,normalMapTangentSpace:Ue&&S.normalMapType===Di,metalnessMap:Pe,roughnessMap:I,anisotropy:R,anisotropyMap:ce,clearcoat:q,clearcoatMap:Ee,clearcoatNormalMap:te,clearcoatRoughnessMap:J,dispersion:ee,iridescence:re,iridescenceMap:Me,iridescenceThicknessMap:De,sheen:V,sheenColorMap:Be,sheenRoughnessMap:ve,specularMap:Se,specularColorMap:we,specularIntensityMap:ut,transmission:de,transmissionMap:O,thicknessMap:Ce,gradientMap:K,opaque:S.transparent===!1&&S.blending===Vs&&S.alphaToCoverage===!1,alphaMap:N,alphaTest:se,alphaHash:ie,combine:S.combine,mapUv:it&&_(S.map.channel),aoMapUv:D&&_(S.aoMap.channel),lightMapUv:ze&&_(S.lightMap.channel),bumpMapUv:fe&&_(S.bumpMap.channel),normalMapUv:Ue&&_(S.normalMap.channel),displacementMapUv:xe&&_(S.displacementMap.channel),emissiveMapUv:$e&&_(S.emissiveMap.channel),metalnessMapUv:Pe&&_(S.metalnessMap.channel),roughnessMapUv:I&&_(S.roughnessMap.channel),anisotropyMapUv:ce&&_(S.anisotropyMap.channel),clearcoatMapUv:Ee&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:te&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:De&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:ve&&_(S.sheenRoughnessMap.channel),specularMapUv:Se&&_(S.specularMap.channel),specularColorMapUv:we&&_(S.specularColorMap.channel),specularIntensityMapUv:ut&&_(S.specularIntensityMap.channel),transmissionMapUv:O&&_(S.transmissionMap.channel),thicknessMapUv:Ce&&_(S.thicknessMap.channel),alphaMapUv:N&&_(S.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ue||R),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!z.attributes.uv&&(it||N),fog:!!U,useFog:S.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Oe,skinning:B.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ze,decodeVideoTexture:it&&S.map.isVideoTexture===!0&&mt.getTransfer(S.map.colorSpace)===Tt,decodeVideoTextureEmissive:$e&&S.emissiveMap.isVideoTexture===!0&&mt.getTransfer(S.emissiveMap.colorSpace)===Tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Nt,flipSided:S.side===$t,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Te&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&S.extensions.multiDraw===!0||je)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return rt.vertexUv1s=c.has(1),rt.vertexUv2s=c.has(2),rt.vertexUv3s=c.has(3),c.clear(),rt}function m(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(v(M,S),y(M,S),M.push(s.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function v(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const M=p[S.type];let P;if(M){const F=Zn[M];P=Vn.clone(F.uniforms)}else P=S.uniforms;return P}function E(S,M){let P;for(let F=0,B=u.length;F<B;F++){const U=u[F];if(U.cacheKey===M){P=U,++P.usedTimes;break}}return P===void 0&&(P=new aS(s,M,S,r),u.push(P)),P}function T(S){if(--S.usedTimes===0){const M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function w(S){l.remove(S)}function A(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:E,releaseProgram:T,releaseShaderCache:w,programs:u,dispose:A}}function dS(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function fS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function rf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function of(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,d,f,p,_,g){let m=s[e];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:p,renderOrder:h.renderOrder,z:_,group:g},s[e]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=h.renderOrder,m.z=_,m.group=g),e++,m}function a(h,d,f,p,_,g){const m=o(h,d,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(h,d,f,p,_,g){const m=o(h,d,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,d){t.length>1&&t.sort(h||fS),n.length>1&&n.sort(d||rf),i.length>1&&i.sort(d||rf)}function u(){for(let h=e,d=s.length;h<d;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function pS(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new of,s.set(n,[o])):i>=r.length?(o=new of,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function mS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new X};break;case"SpotLight":t={position:new b,direction:new b,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new X,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new X,groundColor:new X};break;case"RectAreaLight":t={color:new X,position:new b,halfWidth:new b,halfHeight:new b};break}return s[e.id]=t,t}}}function gS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let _S=0;function vS(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function xS(s){const e=new mS,t=gS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new b);const i=new b,r=new ke,o=new ke;function a(c){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,y=0,x=0,E=0,T=0,w=0;c.sort(vS);for(let S=0,M=c.length;S<M;S++){const P=c[S],F=P.color,B=P.intensity,U=P.distance,z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=F.r*B,h+=F.g*B,d+=F.b*B;else if(P.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(P.sh.coefficients[k],B);w++}else if(P.isDirectionalLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const j=P.shadow,W=t.get(P);W.shadowIntensity=j.intensity,W.shadowBias=j.bias,W.shadowNormalBias=j.normalBias,W.shadowRadius=j.radius,W.shadowMapSize=j.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=k,f++}else if(P.isSpotLight){const k=e.get(P);k.position.setFromMatrixPosition(P.matrixWorld),k.color.copy(F).multiplyScalar(B),k.distance=U,k.coneCos=Math.cos(P.angle),k.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),k.decay=P.decay,n.spot[_]=k;const j=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,j.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=j.matrix,P.castShadow){const W=t.get(P);W.shadowIntensity=j.intensity,W.shadowBias=j.bias,W.shadowNormalBias=j.normalBias,W.shadowRadius=j.radius,W.shadowMapSize=j.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=z,x++}_++}else if(P.isRectAreaLight){const k=e.get(P);k.color.copy(F).multiplyScalar(B),k.halfWidth.set(P.width*.5,0,0),k.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=k,g++}else if(P.isPointLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),k.distance=P.distance,k.decay=P.decay,P.castShadow){const j=P.shadow,W=t.get(P);W.shadowIntensity=j.intensity,W.shadowBias=j.bias,W.shadowNormalBias=j.normalBias,W.shadowRadius=j.radius,W.shadowMapSize=j.mapSize,W.shadowCameraNear=j.camera.near,W.shadowCameraFar=j.camera.far,n.pointShadow[p]=W,n.pointShadowMap[p]=z,n.pointShadowMatrix[p]=P.shadow.matrix,y++}n.point[p]=k,p++}else if(P.isHemisphereLight){const k=e.get(P);k.skyColor.copy(P.color).multiplyScalar(B),k.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[m]=k,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const A=n.hash;(A.directionalLength!==f||A.pointLength!==p||A.spotLength!==_||A.rectAreaLength!==g||A.hemiLength!==m||A.numDirectionalShadows!==v||A.numPointShadows!==y||A.numSpotShadows!==x||A.numSpotMaps!==E||A.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,A.directionalLength=f,A.pointLength=p,A.spotLength=_,A.rectAreaLength=g,A.hemiLength=m,A.numDirectionalShadows=v,A.numPointShadows=y,A.numSpotShadows=x,A.numSpotMaps=E,A.numLightProbes=w,n.version=_S++)}function l(c,u){let h=0,d=0,f=0,p=0,_=0;const g=u.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const y=c[m];if(y.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),h++}else if(y.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function af(s){const e=new xS(s),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function yS(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new af(s),e.set(i,[a])):r>=o.length?(a=new af(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class pc extends Kt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Cm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fh extends Kt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const MS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,SS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function wS(s,e,t){let n=new Ko;const i=new ne,r=new ne,o=new xt,a=new pc({depthPacking:Ch}),l=new Fh,c={},u=t.maxTextureSize,h={[di]:$t,[$t]:di,[Nt]:Nt},d=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:MS,fragmentShader:SS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new qe;p.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ie(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ec;let m=this.type;this.render=function(T,w,A){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const S=s.getRenderTarget(),M=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),F=s.state;F.setBlending(ui),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=m!==oi&&this.type===oi,U=m===oi&&this.type!==oi;for(let z=0,k=T.length;z<k;z++){const j=T[z],W=j.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ae=W.getFrameExtents();if(i.multiply(ae),r.copy(W.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ae.x),i.x=r.x*ae.x,W.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ae.y),i.y=r.y*ae.y,W.mapSize.y=r.y)),W.map===null||B===!0||U===!0){const be=this.type!==oi?{minFilter:qt,magFilter:qt}:{};W.map!==null&&W.map.dispose(),W.map=new cn(i.x,i.y,be),W.map.texture.name=j.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const oe=W.getViewportCount();for(let be=0;be<oe;be++){const Xe=W.getViewport(be);o.set(r.x*Xe.x,r.y*Xe.y,r.x*Xe.z,r.y*Xe.w),F.viewport(o),W.updateMatrices(j,be),n=W.getFrustum(),x(w,A,W.camera,j,this.type)}W.isPointLightShadow!==!0&&this.type===oi&&v(W,A),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(S,M,P)};function v(T,w){const A=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new cn(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(w,null,A,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(w,null,A,f,_,null)}function y(T,w,A,S){let M=null;const P=A.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)M=P;else if(M=A.isPointLight===!0?l:a,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const F=M.uuid,B=w.uuid;let U=c[F];U===void 0&&(U={},c[F]=U);let z=U[B];z===void 0&&(z=M.clone(),U[B]=z,w.addEventListener("dispose",E)),M=z}if(M.visible=w.visible,M.wireframe=w.wireframe,S===oi?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:h[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,A.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const F=s.properties.get(M);F.light=A}return M}function x(T,w,A,S,M){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===oi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,T.matrixWorld);const B=e.update(T),U=T.material;if(Array.isArray(U)){const z=B.groups;for(let k=0,j=z.length;k<j;k++){const W=z[k],ae=U[W.materialIndex];if(ae&&ae.visible){const oe=y(T,ae,S,M);T.onBeforeShadow(s,T,w,A,B,oe,W),s.renderBufferDirect(A,null,B,oe,T,W),T.onAfterShadow(s,T,w,A,B,oe,W)}}}else if(U.visible){const z=y(T,U,S,M);T.onBeforeShadow(s,T,w,A,B,z,null),s.renderBufferDirect(A,null,B,z,T,null),T.onAfterShadow(s,T,w,A,B,z,null)}}const F=T.children;for(let B=0,U=F.length;B<U;B++)x(F[B],w,A,S,M)}function E(T){T.target.removeEventListener("dispose",E);for(const A in c){const S=c[A],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const bS={[ul]:hl,[dl]:No,[fl]:ml,[js]:pl,[hl]:ul,[No]:dl,[ml]:fl,[pl]:js};function TS(s,e){function t(){let O=!1;const Ce=new xt;let K=null;const N=new xt(0,0,0,0);return{setMask:function(se){K!==se&&!O&&(s.colorMask(se,se,se,se),K=se)},setLocked:function(se){O=se},setClear:function(se,ie,Te,Ze,rt){rt===!0&&(se*=Ze,ie*=Ze,Te*=Ze),Ce.set(se,ie,Te,Ze),N.equals(Ce)===!1&&(s.clearColor(se,ie,Te,Ze),N.copy(Ce))},reset:function(){O=!1,K=null,N.set(-1,0,0,0)}}}function n(){let O=!1,Ce=!1,K=null,N=null,se=null;return{setReversed:function(ie){if(Ce!==ie){const Te=e.get("EXT_clip_control");Ce?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT);const Ze=se;se=null,this.setClear(Ze)}Ce=ie},getReversed:function(){return Ce},setTest:function(ie){ie?me(s.DEPTH_TEST):Oe(s.DEPTH_TEST)},setMask:function(ie){K!==ie&&!O&&(s.depthMask(ie),K=ie)},setFunc:function(ie){if(Ce&&(ie=bS[ie]),N!==ie){switch(ie){case ul:s.depthFunc(s.NEVER);break;case hl:s.depthFunc(s.ALWAYS);break;case dl:s.depthFunc(s.LESS);break;case js:s.depthFunc(s.LEQUAL);break;case fl:s.depthFunc(s.EQUAL);break;case pl:s.depthFunc(s.GEQUAL);break;case No:s.depthFunc(s.GREATER);break;case ml:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}N=ie}},setLocked:function(ie){O=ie},setClear:function(ie){se!==ie&&(Ce&&(ie=1-ie),s.clearDepth(ie),se=ie)},reset:function(){O=!1,K=null,N=null,se=null,Ce=!1}}}function i(){let O=!1,Ce=null,K=null,N=null,se=null,ie=null,Te=null,Ze=null,rt=null;return{setTest:function(lt){O||(lt?me(s.STENCIL_TEST):Oe(s.STENCIL_TEST))},setMask:function(lt){Ce!==lt&&!O&&(s.stencilMask(lt),Ce=lt)},setFunc:function(lt,st,Jt){(K!==lt||N!==st||se!==Jt)&&(s.stencilFunc(lt,st,Jt),K=lt,N=st,se=Jt)},setOp:function(lt,st,Jt){(ie!==lt||Te!==st||Ze!==Jt)&&(s.stencilOp(lt,st,Jt),ie=lt,Te=st,Ze=Jt)},setLocked:function(lt){O=lt},setClear:function(lt){rt!==lt&&(s.clearStencil(lt),rt=lt)},reset:function(){O=!1,Ce=null,K=null,N=null,se=null,ie=null,Te=null,Ze=null,rt=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,y=null,x=null,E=null,T=null,w=new X(0,0,0),A=0,S=!1,M=null,P=null,F=null,B=null,U=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,j=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(W)[1]),k=j>=1):W.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),k=j>=2);let ae=null,oe={};const be=s.getParameter(s.SCISSOR_BOX),Xe=s.getParameter(s.VIEWPORT),We=new xt().fromArray(be),$=new xt().fromArray(Xe);function pe(O,Ce,K,N){const se=new Uint8Array(4),ie=s.createTexture();s.bindTexture(O,ie),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Te=0;Te<K;Te++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(Ce,0,s.RGBA,1,1,N,0,s.RGBA,s.UNSIGNED_BYTE,se):s.texImage2D(Ce+Te,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,se);return ie}const Le={};Le[s.TEXTURE_2D]=pe(s.TEXTURE_2D,s.TEXTURE_2D,1),Le[s.TEXTURE_CUBE_MAP]=pe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[s.TEXTURE_2D_ARRAY]=pe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Le[s.TEXTURE_3D]=pe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),me(s.DEPTH_TEST),o.setFunc(js),fe(!1),Ue(ku),me(s.CULL_FACE),D(ui);function me(O){u[O]!==!0&&(s.enable(O),u[O]=!0)}function Oe(O){u[O]!==!1&&(s.disable(O),u[O]=!1)}function Ke(O,Ce){return h[O]!==Ce?(s.bindFramebuffer(O,Ce),h[O]=Ce,O===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=Ce),O===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=Ce),!0):!1}function je(O,Ce){let K=f,N=!1;if(O){K=d.get(Ce),K===void 0&&(K=[],d.set(Ce,K));const se=O.textures;if(K.length!==se.length||K[0]!==s.COLOR_ATTACHMENT0){for(let ie=0,Te=se.length;ie<Te;ie++)K[ie]=s.COLOR_ATTACHMENT0+ie;K.length=se.length,N=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,N=!0);N&&s.drawBuffers(K)}function it(O){return p!==O?(s.useProgram(O),p=O,!0):!1}const le={[Ki]:s.FUNC_ADD,[om]:s.FUNC_SUBTRACT,[am]:s.FUNC_REVERSE_SUBTRACT};le[lm]=s.MIN,le[cm]=s.MAX;const _e={[um]:s.ZERO,[hm]:s.ONE,[dm]:s.SRC_COLOR,[ll]:s.SRC_ALPHA,[vm]:s.SRC_ALPHA_SATURATE,[gm]:s.DST_COLOR,[pm]:s.DST_ALPHA,[fm]:s.ONE_MINUS_SRC_COLOR,[cl]:s.ONE_MINUS_SRC_ALPHA,[_m]:s.ONE_MINUS_DST_COLOR,[mm]:s.ONE_MINUS_DST_ALPHA,[xm]:s.CONSTANT_COLOR,[ym]:s.ONE_MINUS_CONSTANT_COLOR,[Mm]:s.CONSTANT_ALPHA,[Sm]:s.ONE_MINUS_CONSTANT_ALPHA};function D(O,Ce,K,N,se,ie,Te,Ze,rt,lt){if(O===ui){_===!0&&(Oe(s.BLEND),_=!1);return}if(_===!1&&(me(s.BLEND),_=!0),O!==rm){if(O!==g||lt!==S){if((m!==Ki||x!==Ki)&&(s.blendEquation(s.FUNC_ADD),m=Ki,x=Ki),lt)switch(O){case Vs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Sn:s.blendFunc(s.ONE,s.ONE);break;case zu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Vu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Vs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Sn:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case zu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Vu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}v=null,y=null,E=null,T=null,w.set(0,0,0),A=0,g=O,S=lt}return}se=se||Ce,ie=ie||K,Te=Te||N,(Ce!==m||se!==x)&&(s.blendEquationSeparate(le[Ce],le[se]),m=Ce,x=se),(K!==v||N!==y||ie!==E||Te!==T)&&(s.blendFuncSeparate(_e[K],_e[N],_e[ie],_e[Te]),v=K,y=N,E=ie,T=Te),(Ze.equals(w)===!1||rt!==A)&&(s.blendColor(Ze.r,Ze.g,Ze.b,rt),w.copy(Ze),A=rt),g=O,S=!1}function ze(O,Ce){O.side===Nt?Oe(s.CULL_FACE):me(s.CULL_FACE);let K=O.side===$t;Ce&&(K=!K),fe(K),O.blending===Vs&&O.transparent===!1?D(ui):D(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const N=O.stencilWrite;a.setTest(N),N&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),$e(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?me(s.SAMPLE_ALPHA_TO_COVERAGE):Oe(s.SAMPLE_ALPHA_TO_COVERAGE)}function fe(O){M!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),M=O)}function Ue(O){O!==im?(me(s.CULL_FACE),O!==P&&(O===ku?s.cullFace(s.BACK):O===sm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Oe(s.CULL_FACE),P=O}function xe(O){O!==F&&(k&&s.lineWidth(O),F=O)}function $e(O,Ce,K){O?(me(s.POLYGON_OFFSET_FILL),(B!==Ce||U!==K)&&(s.polygonOffset(Ce,K),B=Ce,U=K)):Oe(s.POLYGON_OFFSET_FILL)}function Pe(O){O?me(s.SCISSOR_TEST):Oe(s.SCISSOR_TEST)}function I(O){O===void 0&&(O=s.TEXTURE0+z-1),ae!==O&&(s.activeTexture(O),ae=O)}function R(O,Ce,K){K===void 0&&(ae===null?K=s.TEXTURE0+z-1:K=ae);let N=oe[K];N===void 0&&(N={type:void 0,texture:void 0},oe[K]=N),(N.type!==O||N.texture!==Ce)&&(ae!==K&&(s.activeTexture(K),ae=K),s.bindTexture(O,Ce||Le[O]),N.type=O,N.texture=Ce)}function q(){const O=oe[ae];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ee(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function re(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function V(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ee(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Me(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function De(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Be(O){We.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),We.copy(O))}function ve(O){$.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),$.copy(O))}function Se(O,Ce){let K=c.get(Ce);K===void 0&&(K=new WeakMap,c.set(Ce,K));let N=K.get(O);N===void 0&&(N=s.getUniformBlockIndex(Ce,O.name),K.set(O,N))}function we(O,Ce){const N=c.get(Ce).get(O);l.get(Ce)!==N&&(s.uniformBlockBinding(Ce,N,O.__bindingPointIndex),l.set(Ce,N))}function ut(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ae=null,oe={},h={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,y=null,x=null,E=null,T=null,w=new X(0,0,0),A=0,S=!1,M=null,P=null,F=null,B=null,U=null,We.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:me,disable:Oe,bindFramebuffer:Ke,drawBuffers:je,useProgram:it,setBlending:D,setMaterial:ze,setFlipSided:fe,setCullFace:Ue,setLineWidth:xe,setPolygonOffset:$e,setScissorTest:Pe,activeTexture:I,bindTexture:R,unbindTexture:q,compressedTexImage2D:ee,compressedTexImage3D:re,texImage2D:Me,texImage3D:De,updateUBOMapping:Se,uniformBlockBinding:we,texStorage2D:te,texStorage3D:J,texSubImage2D:V,texSubImage3D:de,compressedTexSubImage2D:ce,compressedTexSubImage3D:Ee,scissor:Be,viewport:ve,reset:ut}}function AS(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function ES(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function RS(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function Yu(s,e,t,n){const i=CS(n);switch(t){case xh:return s*e;case Mh:return s*e;case Sh:return s*e*2;case oc:return s*e/i.components*i.byteLength;case jo:return s*e/i.components*i.byteLength;case wh:return s*e*2/i.components*i.byteLength;case ac:return s*e*2/i.components*i.byteLength;case yh:return s*e*3/i.components*i.byteLength;case ln:return s*e*4/i.components*i.byteLength;case lc:return s*e*4/i.components*i.byteLength;case Eo:case Ro:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Co:case Po:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case _l:case xl:return Math.max(s,16)*Math.max(e,8)/4;case gl:case vl:return Math.max(s,8)*Math.max(e,8)/2;case yl:case Ml:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Sl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Al:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case El:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Il:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ul:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Dl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Nl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Ol:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Io:case Fl:case Bl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case bh:case kl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case zl:case Vl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function CS(s){switch(s){case fi:case gh:return{byteLength:1,components:1};case Fr:case _h:case Kn:return{byteLength:2,components:1};case sc:case rc:return{byteLength:2,components:4};case Ui:case ic:case Rn:return{byteLength:4,components:1};case vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}const PS={contain:AS,cover:ES,fill:RS,getByteLength:Yu};function IS(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(I,R){return f?new OffscreenCanvas(I,R):Vo("canvas")}function _(I,R,q){let ee=1;const re=Pe(I);if((re.width>q||re.height>q)&&(ee=q/Math.max(re.width,re.height)),ee<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const V=Math.floor(ee*re.width),de=Math.floor(ee*re.height);h===void 0&&(h=p(V,de));const ce=R?p(V,de):h;return ce.width=V,ce.height=de,ce.getContext("2d").drawImage(I,0,0,V,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+V+"x"+de+")."),ce}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),I;return I}function g(I){return I.generateMipmaps}function m(I){s.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(I,R,q,ee,re=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let V=R;if(R===s.RED&&(q===s.FLOAT&&(V=s.R32F),q===s.HALF_FLOAT&&(V=s.R16F),q===s.UNSIGNED_BYTE&&(V=s.R8)),R===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(V=s.R8UI),q===s.UNSIGNED_SHORT&&(V=s.R16UI),q===s.UNSIGNED_INT&&(V=s.R32UI),q===s.BYTE&&(V=s.R8I),q===s.SHORT&&(V=s.R16I),q===s.INT&&(V=s.R32I)),R===s.RG&&(q===s.FLOAT&&(V=s.RG32F),q===s.HALF_FLOAT&&(V=s.RG16F),q===s.UNSIGNED_BYTE&&(V=s.RG8)),R===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(V=s.RG8UI),q===s.UNSIGNED_SHORT&&(V=s.RG16UI),q===s.UNSIGNED_INT&&(V=s.RG32UI),q===s.BYTE&&(V=s.RG8I),q===s.SHORT&&(V=s.RG16I),q===s.INT&&(V=s.RG32I)),R===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(V=s.RGB8UI),q===s.UNSIGNED_SHORT&&(V=s.RGB16UI),q===s.UNSIGNED_INT&&(V=s.RGB32UI),q===s.BYTE&&(V=s.RGB8I),q===s.SHORT&&(V=s.RGB16I),q===s.INT&&(V=s.RGB32I)),R===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(V=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(V=s.RGBA16UI),q===s.UNSIGNED_INT&&(V=s.RGBA32UI),q===s.BYTE&&(V=s.RGBA8I),q===s.SHORT&&(V=s.RGBA16I),q===s.INT&&(V=s.RGBA32I)),R===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(V=s.RGB9_E5),R===s.RGBA){const de=re?Zo:mt.getTransfer(ee);q===s.FLOAT&&(V=s.RGBA32F),q===s.HALF_FLOAT&&(V=s.RGBA16F),q===s.UNSIGNED_BYTE&&(V=de===Tt?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(V=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(V=s.RGB5_A1)}return(V===s.R16F||V===s.R32F||V===s.RG16F||V===s.RG32F||V===s.RGBA16F||V===s.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function x(I,R){let q;return I?R===null||R===Ui||R===Zs?q=s.DEPTH24_STENCIL8:R===Rn?q=s.DEPTH32F_STENCIL8:R===Fr&&(q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Ui||R===Zs?q=s.DEPTH_COMPONENT24:R===Rn?q=s.DEPTH_COMPONENT32F:R===Fr&&(q=s.DEPTH_COMPONENT16),q}function E(I,R){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==qt&&I.minFilter!==Ft?Math.log2(Math.max(R.width,R.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?R.mipmaps.length:1}function T(I){const R=I.target;R.removeEventListener("dispose",T),A(R),R.isVideoTexture&&u.delete(R)}function w(I){const R=I.target;R.removeEventListener("dispose",w),M(R)}function A(I){const R=n.get(I);if(R.__webglInit===void 0)return;const q=I.source,ee=d.get(q);if(ee){const re=ee[R.__cacheKey];re.usedTimes--,re.usedTimes===0&&S(I),Object.keys(ee).length===0&&d.delete(q)}n.remove(I)}function S(I){const R=n.get(I);s.deleteTexture(R.__webglTexture);const q=I.source,ee=d.get(q);delete ee[R.__cacheKey],o.memory.textures--}function M(I){const R=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(R.__webglFramebuffer[ee]))for(let re=0;re<R.__webglFramebuffer[ee].length;re++)s.deleteFramebuffer(R.__webglFramebuffer[ee][re]);else s.deleteFramebuffer(R.__webglFramebuffer[ee]);R.__webglDepthbuffer&&s.deleteRenderbuffer(R.__webglDepthbuffer[ee])}else{if(Array.isArray(R.__webglFramebuffer))for(let ee=0;ee<R.__webglFramebuffer.length;ee++)s.deleteFramebuffer(R.__webglFramebuffer[ee]);else s.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&s.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&s.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let ee=0;ee<R.__webglColorRenderbuffer.length;ee++)R.__webglColorRenderbuffer[ee]&&s.deleteRenderbuffer(R.__webglColorRenderbuffer[ee]);R.__webglDepthRenderbuffer&&s.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const q=I.textures;for(let ee=0,re=q.length;ee<re;ee++){const V=n.get(q[ee]);V.__webglTexture&&(s.deleteTexture(V.__webglTexture),o.memory.textures--),n.remove(q[ee])}n.remove(I)}let P=0;function F(){P=0}function B(){const I=P;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),P+=1,I}function U(I){const R=[];return R.push(I.wrapS),R.push(I.wrapT),R.push(I.wrapR||0),R.push(I.magFilter),R.push(I.minFilter),R.push(I.anisotropy),R.push(I.internalFormat),R.push(I.format),R.push(I.type),R.push(I.generateMipmaps),R.push(I.premultiplyAlpha),R.push(I.flipY),R.push(I.unpackAlignment),R.push(I.colorSpace),R.join()}function z(I,R){const q=n.get(I);if(I.isVideoTexture&&xe(I),I.isRenderTargetTexture===!1&&I.version>0&&q.__version!==I.version){const ee=I.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(q,I,R);return}}t.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+R)}function k(I,R){const q=n.get(I);if(I.version>0&&q.__version!==I.version){$(q,I,R);return}t.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+R)}function j(I,R){const q=n.get(I);if(I.version>0&&q.__version!==I.version){$(q,I,R);return}t.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+R)}function W(I,R){const q=n.get(I);if(I.version>0&&q.__version!==I.version){pe(q,I,R);return}t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+R)}const ae={[ts]:s.REPEAT,[In]:s.CLAMP_TO_EDGE,[Or]:s.MIRRORED_REPEAT},oe={[qt]:s.NEAREST,[nc]:s.NEAREST_MIPMAP_NEAREST,[Ds]:s.NEAREST_MIPMAP_LINEAR,[Ft]:s.LINEAR,[Ur]:s.LINEAR_MIPMAP_NEAREST,[Bn]:s.LINEAR_MIPMAP_LINEAR},be={[Im]:s.NEVER,[Fm]:s.ALWAYS,[Lm]:s.LESS,[Ph]:s.LEQUAL,[Um]:s.EQUAL,[Om]:s.GEQUAL,[Dm]:s.GREATER,[Nm]:s.NOTEQUAL};function Xe(I,R){if(R.type===Rn&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===Ft||R.magFilter===Ur||R.magFilter===Ds||R.magFilter===Bn||R.minFilter===Ft||R.minFilter===Ur||R.minFilter===Ds||R.minFilter===Bn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,ae[R.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,ae[R.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,ae[R.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,oe[R.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,oe[R.minFilter]),R.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,be[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===qt||R.minFilter!==Ds&&R.minFilter!==Bn||R.type===Rn&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,i.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function We(I,R){let q=!1;I.__webglInit===void 0&&(I.__webglInit=!0,R.addEventListener("dispose",T));const ee=R.source;let re=d.get(ee);re===void 0&&(re={},d.set(ee,re));const V=U(R);if(V!==I.__cacheKey){re[V]===void 0&&(re[V]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),re[V].usedTimes++;const de=re[I.__cacheKey];de!==void 0&&(re[I.__cacheKey].usedTimes--,de.usedTimes===0&&S(R)),I.__cacheKey=V,I.__webglTexture=re[V].texture}return q}function $(I,R,q){let ee=s.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(ee=s.TEXTURE_2D_ARRAY),R.isData3DTexture&&(ee=s.TEXTURE_3D);const re=We(I,R),V=R.source;t.bindTexture(ee,I.__webglTexture,s.TEXTURE0+q);const de=n.get(V);if(V.version!==de.__version||re===!0){t.activeTexture(s.TEXTURE0+q);const ce=mt.getPrimaries(mt.workingColorSpace),Ee=R.colorSpace===Ei?null:mt.getPrimaries(R.colorSpace),te=R.colorSpace===Ei||ce===Ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let J=_(R.image,!1,i.maxTextureSize);J=$e(R,J);const Me=r.convert(R.format,R.colorSpace),De=r.convert(R.type);let Be=y(R.internalFormat,Me,De,R.colorSpace,R.isVideoTexture);Xe(ee,R);let ve;const Se=R.mipmaps,we=R.isVideoTexture!==!0,ut=de.__version===void 0||re===!0,O=V.dataReady,Ce=E(R,J);if(R.isDepthTexture)Be=x(R.format===$s,R.type),ut&&(we?t.texStorage2D(s.TEXTURE_2D,1,Be,J.width,J.height):t.texImage2D(s.TEXTURE_2D,0,Be,J.width,J.height,0,Me,De,null));else if(R.isDataTexture)if(Se.length>0){we&&ut&&t.texStorage2D(s.TEXTURE_2D,Ce,Be,Se[0].width,Se[0].height);for(let K=0,N=Se.length;K<N;K++)ve=Se[K],we?O&&t.texSubImage2D(s.TEXTURE_2D,K,0,0,ve.width,ve.height,Me,De,ve.data):t.texImage2D(s.TEXTURE_2D,K,Be,ve.width,ve.height,0,Me,De,ve.data);R.generateMipmaps=!1}else we?(ut&&t.texStorage2D(s.TEXTURE_2D,Ce,Be,J.width,J.height),O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,J.width,J.height,Me,De,J.data)):t.texImage2D(s.TEXTURE_2D,0,Be,J.width,J.height,0,Me,De,J.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){we&&ut&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Be,Se[0].width,Se[0].height,J.depth);for(let K=0,N=Se.length;K<N;K++)if(ve=Se[K],R.format!==ln)if(Me!==null)if(we){if(O)if(R.layerUpdates.size>0){const se=Yu(ve.width,ve.height,R.format,R.type);for(const ie of R.layerUpdates){const Te=ve.data.subarray(ie*se/ve.data.BYTES_PER_ELEMENT,(ie+1)*se/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,ie,ve.width,ve.height,1,Me,Te)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ve.width,ve.height,J.depth,Me,ve.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,K,Be,ve.width,ve.height,J.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else we?O&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ve.width,ve.height,J.depth,Me,De,ve.data):t.texImage3D(s.TEXTURE_2D_ARRAY,K,Be,ve.width,ve.height,J.depth,0,Me,De,ve.data)}else{we&&ut&&t.texStorage2D(s.TEXTURE_2D,Ce,Be,Se[0].width,Se[0].height);for(let K=0,N=Se.length;K<N;K++)ve=Se[K],R.format!==ln?Me!==null?we?O&&t.compressedTexSubImage2D(s.TEXTURE_2D,K,0,0,ve.width,ve.height,Me,ve.data):t.compressedTexImage2D(s.TEXTURE_2D,K,Be,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):we?O&&t.texSubImage2D(s.TEXTURE_2D,K,0,0,ve.width,ve.height,Me,De,ve.data):t.texImage2D(s.TEXTURE_2D,K,Be,ve.width,ve.height,0,Me,De,ve.data)}else if(R.isDataArrayTexture)if(we){if(ut&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Be,J.width,J.height,J.depth),O)if(R.layerUpdates.size>0){const K=Yu(J.width,J.height,R.format,R.type);for(const N of R.layerUpdates){const se=J.data.subarray(N*K/J.data.BYTES_PER_ELEMENT,(N+1)*K/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,N,J.width,J.height,1,Me,De,se)}R.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,Me,De,J.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Be,J.width,J.height,J.depth,0,Me,De,J.data);else if(R.isData3DTexture)we?(ut&&t.texStorage3D(s.TEXTURE_3D,Ce,Be,J.width,J.height,J.depth),O&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,Me,De,J.data)):t.texImage3D(s.TEXTURE_3D,0,Be,J.width,J.height,J.depth,0,Me,De,J.data);else if(R.isFramebufferTexture){if(ut)if(we)t.texStorage2D(s.TEXTURE_2D,Ce,Be,J.width,J.height);else{let K=J.width,N=J.height;for(let se=0;se<Ce;se++)t.texImage2D(s.TEXTURE_2D,se,Be,K,N,0,Me,De,null),K>>=1,N>>=1}}else if(Se.length>0){if(we&&ut){const K=Pe(Se[0]);t.texStorage2D(s.TEXTURE_2D,Ce,Be,K.width,K.height)}for(let K=0,N=Se.length;K<N;K++)ve=Se[K],we?O&&t.texSubImage2D(s.TEXTURE_2D,K,0,0,Me,De,ve):t.texImage2D(s.TEXTURE_2D,K,Be,Me,De,ve);R.generateMipmaps=!1}else if(we){if(ut){const K=Pe(J);t.texStorage2D(s.TEXTURE_2D,Ce,Be,K.width,K.height)}O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Me,De,J)}else t.texImage2D(s.TEXTURE_2D,0,Be,Me,De,J);g(R)&&m(ee),de.__version=V.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function pe(I,R,q){if(R.image.length!==6)return;const ee=We(I,R),re=R.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+q);const V=n.get(re);if(re.version!==V.__version||ee===!0){t.activeTexture(s.TEXTURE0+q);const de=mt.getPrimaries(mt.workingColorSpace),ce=R.colorSpace===Ei?null:mt.getPrimaries(R.colorSpace),Ee=R.colorSpace===Ei||de===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const te=R.isCompressedTexture||R.image[0].isCompressedTexture,J=R.image[0]&&R.image[0].isDataTexture,Me=[];for(let N=0;N<6;N++)!te&&!J?Me[N]=_(R.image[N],!0,i.maxCubemapSize):Me[N]=J?R.image[N].image:R.image[N],Me[N]=$e(R,Me[N]);const De=Me[0],Be=r.convert(R.format,R.colorSpace),ve=r.convert(R.type),Se=y(R.internalFormat,Be,ve,R.colorSpace),we=R.isVideoTexture!==!0,ut=V.__version===void 0||ee===!0,O=re.dataReady;let Ce=E(R,De);Xe(s.TEXTURE_CUBE_MAP,R);let K;if(te){we&&ut&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,Se,De.width,De.height);for(let N=0;N<6;N++){K=Me[N].mipmaps;for(let se=0;se<K.length;se++){const ie=K[se];R.format!==ln?Be!==null?we?O&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se,0,0,ie.width,ie.height,Be,ie.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se,Se,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se,0,0,ie.width,ie.height,Be,ve,ie.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se,Se,ie.width,ie.height,0,Be,ve,ie.data)}}}else{if(K=R.mipmaps,we&&ut){K.length>0&&Ce++;const N=Pe(Me[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,Se,N.width,N.height)}for(let N=0;N<6;N++)if(J){we?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,Me[N].width,Me[N].height,Be,ve,Me[N].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,Se,Me[N].width,Me[N].height,0,Be,ve,Me[N].data);for(let se=0;se<K.length;se++){const Te=K[se].image[N].image;we?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se+1,0,0,Te.width,Te.height,Be,ve,Te.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se+1,Se,Te.width,Te.height,0,Be,ve,Te.data)}}else{we?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,Be,ve,Me[N]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,Se,Be,ve,Me[N]);for(let se=0;se<K.length;se++){const ie=K[se];we?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se+1,0,0,Be,ve,ie.image[N]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+N,se+1,Se,Be,ve,ie.image[N])}}}g(R)&&m(s.TEXTURE_CUBE_MAP),V.__version=re.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function Le(I,R,q,ee,re,V){const de=r.convert(q.format,q.colorSpace),ce=r.convert(q.type),Ee=y(q.internalFormat,de,ce,q.colorSpace),te=n.get(R),J=n.get(q);if(J.__renderTarget=R,!te.__hasExternalTextures){const Me=Math.max(1,R.width>>V),De=Math.max(1,R.height>>V);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,V,Ee,Me,De,R.depth,0,de,ce,null):t.texImage2D(re,V,Ee,Me,De,0,de,ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),Ue(R)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ee,re,J.__webglTexture,0,fe(R)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ee,re,J.__webglTexture,V),t.bindFramebuffer(s.FRAMEBUFFER,null)}function me(I,R,q){if(s.bindRenderbuffer(s.RENDERBUFFER,I),R.depthBuffer){const ee=R.depthTexture,re=ee&&ee.isDepthTexture?ee.type:null,V=x(R.stencilBuffer,re),de=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=fe(R);Ue(R)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ce,V,R.width,R.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,V,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,V,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,I)}else{const ee=R.textures;for(let re=0;re<ee.length;re++){const V=ee[re],de=r.convert(V.format,V.colorSpace),ce=r.convert(V.type),Ee=y(V.internalFormat,de,ce,V.colorSpace),te=fe(R);q&&Ue(R)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,te,Ee,R.width,R.height):Ue(R)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,Ee,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,Ee,R.width,R.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Oe(I,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(R.depthTexture);ee.__renderTarget=R,(!ee.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),z(R.depthTexture,0);const re=ee.__webglTexture,V=fe(R);if(R.depthTexture.format===Hs)Ue(R)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0);else if(R.depthTexture.format===$s)Ue(R)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Ke(I){const R=n.get(I),q=I.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==I.depthTexture){const ee=I.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),ee){const re=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,ee.removeEventListener("dispose",re)};ee.addEventListener("dispose",re),R.__depthDisposeCallback=re}R.__boundDepthTexture=ee}if(I.depthTexture&&!R.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Oe(R.__webglFramebuffer,I)}else if(q){R.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer[ee]),R.__webglDepthbuffer[ee]===void 0)R.__webglDepthbuffer[ee]=s.createRenderbuffer(),me(R.__webglDepthbuffer[ee],I,!1);else{const re=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,V=R.__webglDepthbuffer[ee];s.bindRenderbuffer(s.RENDERBUFFER,V),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,V)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=s.createRenderbuffer(),me(R.__webglDepthbuffer,I,!1);else{const ee=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=R.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,re)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function je(I,R,q){const ee=n.get(I);R!==void 0&&Le(ee.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&Ke(I)}function it(I){const R=I.texture,q=n.get(I),ee=n.get(R);I.addEventListener("dispose",w);const re=I.textures,V=I.isWebGLCubeRenderTarget===!0,de=re.length>1;if(de||(ee.__webglTexture===void 0&&(ee.__webglTexture=s.createTexture()),ee.__version=R.version,o.memory.textures++),V){q.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(R.mipmaps&&R.mipmaps.length>0){q.__webglFramebuffer[ce]=[];for(let Ee=0;Ee<R.mipmaps.length;Ee++)q.__webglFramebuffer[ce][Ee]=s.createFramebuffer()}else q.__webglFramebuffer[ce]=s.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){q.__webglFramebuffer=[];for(let ce=0;ce<R.mipmaps.length;ce++)q.__webglFramebuffer[ce]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(de)for(let ce=0,Ee=re.length;ce<Ee;ce++){const te=n.get(re[ce]);te.__webglTexture===void 0&&(te.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&Ue(I)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ce=0;ce<re.length;ce++){const Ee=re[ce];q.__webglColorRenderbuffer[ce]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[ce]);const te=r.convert(Ee.format,Ee.colorSpace),J=r.convert(Ee.type),Me=y(Ee.internalFormat,te,J,Ee.colorSpace,I.isXRRenderTarget===!0),De=fe(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,De,Me,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,q.__webglColorRenderbuffer[ce])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),me(q.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(V){t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture),Xe(s.TEXTURE_CUBE_MAP,R);for(let ce=0;ce<6;ce++)if(R.mipmaps&&R.mipmaps.length>0)for(let Ee=0;Ee<R.mipmaps.length;Ee++)Le(q.__webglFramebuffer[ce][Ee],I,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee);else Le(q.__webglFramebuffer[ce],I,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(R)&&m(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let ce=0,Ee=re.length;ce<Ee;ce++){const te=re[ce],J=n.get(te);t.bindTexture(s.TEXTURE_2D,J.__webglTexture),Xe(s.TEXTURE_2D,te),Le(q.__webglFramebuffer,I,te,s.COLOR_ATTACHMENT0+ce,s.TEXTURE_2D,0),g(te)&&m(s.TEXTURE_2D)}t.unbindTexture()}else{let ce=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ce=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,ee.__webglTexture),Xe(ce,R),R.mipmaps&&R.mipmaps.length>0)for(let Ee=0;Ee<R.mipmaps.length;Ee++)Le(q.__webglFramebuffer[Ee],I,R,s.COLOR_ATTACHMENT0,ce,Ee);else Le(q.__webglFramebuffer,I,R,s.COLOR_ATTACHMENT0,ce,0);g(R)&&m(ce),t.unbindTexture()}I.depthBuffer&&Ke(I)}function le(I){const R=I.textures;for(let q=0,ee=R.length;q<ee;q++){const re=R[q];if(g(re)){const V=v(I),de=n.get(re).__webglTexture;t.bindTexture(V,de),m(V),t.unbindTexture()}}}const _e=[],D=[];function ze(I){if(I.samples>0){if(Ue(I)===!1){const R=I.textures,q=I.width,ee=I.height;let re=s.COLOR_BUFFER_BIT;const V=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=n.get(I),ce=R.length>1;if(ce)for(let Ee=0;Ee<R.length;Ee++)t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Ee=0;Ee<R.length;Ee++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),ce){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,de.__webglColorRenderbuffer[Ee]);const te=n.get(R[Ee]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,te,0)}s.blitFramebuffer(0,0,q,ee,0,0,q,ee,re,s.NEAREST),l===!0&&(_e.length=0,D.length=0,_e.push(s.COLOR_ATTACHMENT0+Ee),I.depthBuffer&&I.resolveDepthBuffer===!1&&(_e.push(V),D.push(V),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,_e))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ce)for(let Ee=0;Ee<R.length;Ee++){t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,de.__webglColorRenderbuffer[Ee]);const te=n.get(R[Ee]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,te,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const R=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[R])}}}function fe(I){return Math.min(i.maxSamples,I.samples)}function Ue(I){const R=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function xe(I){const R=o.render.frame;u.get(I)!==R&&(u.set(I,R),I.update())}function $e(I,R){const q=I.colorSpace,ee=I.format,re=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||q!==_n&&q!==Ei&&(mt.getTransfer(q)===Tt?(ee!==ln||re!==fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),R}function Pe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=z,this.setTexture2DArray=k,this.setTexture3D=j,this.setTextureCube=W,this.rebindTextures=je,this.setupRenderTarget=it,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=Ue}function Jm(s,e){function t(n,i=Ei){let r;const o=mt.getTransfer(i);if(n===fi)return s.UNSIGNED_BYTE;if(n===sc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===rc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===vh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===gh)return s.BYTE;if(n===_h)return s.SHORT;if(n===Fr)return s.UNSIGNED_SHORT;if(n===ic)return s.INT;if(n===Ui)return s.UNSIGNED_INT;if(n===Rn)return s.FLOAT;if(n===Kn)return s.HALF_FLOAT;if(n===xh)return s.ALPHA;if(n===yh)return s.RGB;if(n===ln)return s.RGBA;if(n===Mh)return s.LUMINANCE;if(n===Sh)return s.LUMINANCE_ALPHA;if(n===Hs)return s.DEPTH_COMPONENT;if(n===$s)return s.DEPTH_STENCIL;if(n===oc)return s.RED;if(n===jo)return s.RED_INTEGER;if(n===wh)return s.RG;if(n===ac)return s.RG_INTEGER;if(n===lc)return s.RGBA_INTEGER;if(n===Eo||n===Ro||n===Co||n===Po)if(o===Tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gl||n===_l||n===vl||n===xl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===gl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_l)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yl||n===Ml||n===Sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===yl||n===Ml)return o===Tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Sl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wl||n===bl||n===Tl||n===Al||n===El||n===Rl||n===Cl||n===Pl||n===Il||n===Ll||n===Ul||n===Dl||n===Nl||n===Ol)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Al)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===El)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Pl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Il)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ul)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nl)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ol)return o===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Io||n===Fl||n===Bl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Io)return o===Tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bh||n===kl||n===zl||n===Vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Io)return r.COMPRESSED_RED_RGTC1_EXT;if(n===kl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===zl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Qm extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ge extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const LS={type:"move"};class nu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(LS)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ge;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const US=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,DS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class NS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Ut,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Mt({vertexShader:US,fragmentShader:DS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ie(new _i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class OS extends gi{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,p=null;const _=new NS,g=t.getContextAttributes();let m=null,v=null;const y=[],x=[],E=new ne;let T=null;const w=new Zt;w.viewport=new xt;const A=new Zt;A.viewport=new xt;const S=[w,A],M=new Qm;let P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let pe=y[$];return pe===void 0&&(pe=new nu,y[$]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function($){let pe=y[$];return pe===void 0&&(pe=new nu,y[$]=pe),pe.getGripSpace()},this.getHand=function($){let pe=y[$];return pe===void 0&&(pe=new nu,y[$]=pe),pe.getHandSpace()};function B($){const pe=x.indexOf($.inputSource);if(pe===-1)return;const Le=y[pe];Le!==void 0&&(Le.update($.inputSource,$.frame,c||o),Le.dispatchEvent({type:$.type,data:$.inputSource}))}function U(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",z);for(let $=0;$<y.length;$++){const pe=x[$];pe!==null&&(x[$]=null,y[$].disconnect(pe))}P=null,F=null,_.reset(),e.setRenderTarget(m),f=null,d=null,h=null,i=null,v=null,We.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",U),i.addEventListener("inputsourceschange",z),g.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0){const pe={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new cn(f.framebufferWidth,f.framebufferHeight,{format:ln,type:fi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let pe=null,Le=null,me=null;g.depth&&(me=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=g.stencil?$s:Hs,Le=g.stencil?Zs:Ui);const Oe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(Oe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new cn(d.textureWidth,d.textureHeight,{format:ln,type:fi,depthTexture:new Oh(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),We.setContext(i),We.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function z($){for(let pe=0;pe<$.removed.length;pe++){const Le=$.removed[pe],me=x.indexOf(Le);me>=0&&(x[me]=null,y[me].disconnect(Le))}for(let pe=0;pe<$.added.length;pe++){const Le=$.added[pe];let me=x.indexOf(Le);if(me===-1){for(let Ke=0;Ke<y.length;Ke++)if(Ke>=x.length){x.push(Le),me=Ke;break}else if(x[Ke]===null){x[Ke]=Le,me=Ke;break}if(me===-1)break}const Oe=y[me];Oe&&Oe.connect(Le)}}const k=new b,j=new b;function W($,pe,Le){k.setFromMatrixPosition(pe.matrixWorld),j.setFromMatrixPosition(Le.matrixWorld);const me=k.distanceTo(j),Oe=pe.projectionMatrix.elements,Ke=Le.projectionMatrix.elements,je=Oe[14]/(Oe[10]-1),it=Oe[14]/(Oe[10]+1),le=(Oe[9]+1)/Oe[5],_e=(Oe[9]-1)/Oe[5],D=(Oe[8]-1)/Oe[0],ze=(Ke[8]+1)/Ke[0],fe=je*D,Ue=je*ze,xe=me/(-D+ze),$e=xe*-D;if(pe.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX($e),$.translateZ(xe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Oe[10]===-1)$.projectionMatrix.copy(pe.projectionMatrix),$.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const Pe=je+xe,I=it+xe,R=fe-$e,q=Ue+(me-$e),ee=le*it/I*Pe,re=_e*it/I*Pe;$.projectionMatrix.makePerspective(R,q,ee,re,Pe,I),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ae($,pe){pe===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(pe.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let pe=$.near,Le=$.far;_.texture!==null&&(_.depthNear>0&&(pe=_.depthNear),_.depthFar>0&&(Le=_.depthFar)),M.near=A.near=w.near=pe,M.far=A.far=w.far=Le,(P!==M.near||F!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,F=M.far),w.layers.mask=$.layers.mask|2,A.layers.mask=$.layers.mask|4,M.layers.mask=w.layers.mask|A.layers.mask;const me=$.parent,Oe=M.cameras;ae(M,me);for(let Ke=0;Ke<Oe.length;Ke++)ae(Oe[Ke],me);Oe.length===2?W(M,w,A):M.projectionMatrix.copy(w.projectionMatrix),oe($,M,me)};function oe($,pe,Le){Le===null?$.matrix.copy(pe.matrixWorld):($.matrix.copy(Le.matrixWorld),$.matrix.invert(),$.matrix.multiply(pe.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(pe.projectionMatrix),$.projectionMatrixInverse.copy(pe.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=zr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let be=null;function Xe($,pe){if(u=pe.getViewerPose(c||o),p=pe,u!==null){const Le=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let me=!1;Le.length!==M.cameras.length&&(M.cameras.length=0,me=!0);for(let Ke=0;Ke<Le.length;Ke++){const je=Le[Ke];let it=null;if(f!==null)it=f.getViewport(je);else{const _e=h.getViewSubImage(d,je);it=_e.viewport,Ke===0&&(e.setRenderTargetTextures(v,_e.colorTexture,d.ignoreDepthValues?void 0:_e.depthStencilTexture),e.setRenderTarget(v))}let le=S[Ke];le===void 0&&(le=new Zt,le.layers.enable(Ke),le.viewport=new xt,S[Ke]=le),le.matrix.fromArray(je.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(je.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(it.x,it.y,it.width,it.height),Ke===0&&(M.matrix.copy(le.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),me===!0&&M.cameras.push(le)}const Oe=i.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){const Ke=h.getDepthInformation(Le[0]);Ke&&Ke.isValid&&Ke.texture&&_.init(e,Ke,i.renderState)}}for(let Le=0;Le<y.length;Le++){const me=x[Le],Oe=y[Le];me!==null&&Oe!==void 0&&Oe.update(me,pe,c||o)}be&&be($,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),p=null}const We=new Ym;We.setAnimationLoop(Xe),this.setAnimationLoop=function($){be=$},this.dispose=function(){}}}const gs=new an,FS=new ke;function BS(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Wm(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,y,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,v,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===$t&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===$t&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),y=v.envMap,x=v.envMapRotation;y&&(g.envMap.value=y,gs.copy(x),gs.x*=-1,gs.y*=-1,gs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),g.envMapRotation.value.setFromMatrix4(FS.makeRotationFromEuler(gs)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$t&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function kS(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const x=y.program;n.uniformBlockBinding(v,x)}function c(v,y){let x=i[v.id];x===void 0&&(p(v),x=u(v),i[v.id]=x,v.addEventListener("dispose",g));const E=y.program;n.updateUBOMapping(v,E);const T=e.render.frame;r[v.id]!==T&&(d(v),r[v.id]=T)}function u(v){const y=h();v.__bindingPointIndex=y;const x=s.createBuffer(),E=v.__size,T=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,E,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,x),x}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=i[v.id],x=v.uniforms,E=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let T=0,w=x.length;T<w;T++){const A=Array.isArray(x[T])?x[T]:[x[T]];for(let S=0,M=A.length;S<M;S++){const P=A[S];if(f(P,T,S,E)===!0){const F=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let U=0;for(let z=0;z<B.length;z++){const k=B[z],j=_(k);typeof k=="number"||typeof k=="boolean"?(P.__data[0]=k,s.bufferSubData(s.UNIFORM_BUFFER,F+U,P.__data)):k.isMatrix3?(P.__data[0]=k.elements[0],P.__data[1]=k.elements[1],P.__data[2]=k.elements[2],P.__data[3]=0,P.__data[4]=k.elements[3],P.__data[5]=k.elements[4],P.__data[6]=k.elements[5],P.__data[7]=0,P.__data[8]=k.elements[6],P.__data[9]=k.elements[7],P.__data[10]=k.elements[8],P.__data[11]=0):(k.toArray(P.__data,U),U+=j.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,y,x,E){const T=v.value,w=y+"_"+x;if(E[w]===void 0)return typeof T=="number"||typeof T=="boolean"?E[w]=T:E[w]=T.clone(),!0;{const A=E[w];if(typeof T=="number"||typeof T=="boolean"){if(A!==T)return E[w]=T,!0}else if(A.equals(T)===!1)return A.copy(T),!0}return!1}function p(v){const y=v.uniforms;let x=0;const E=16;for(let w=0,A=y.length;w<A;w++){const S=Array.isArray(y[w])?y[w]:[y[w]];for(let M=0,P=S.length;M<P;M++){const F=S[M],B=Array.isArray(F.value)?F.value:[F.value];for(let U=0,z=B.length;U<z;U++){const k=B[U],j=_(k),W=x%E,ae=W%j.boundary,oe=W+ae;x+=ae,oe!==0&&E-oe<j.storage&&(x+=E-oe),F.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=j.storage}}}const T=x%E;return T>0&&(x+=E-T),v.__size=x,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function m(){for(const v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}class eg{constructor(e={}){const{canvas:t=zm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ht,this.toneMapping=Pi,this.toneMappingExposure=1;const x=this;let E=!1,T=0,w=0,A=null,S=-1,M=null;const P=new xt,F=new xt;let B=null;const U=new X(0);let z=0,k=t.width,j=t.height,W=1,ae=null,oe=null;const be=new xt(0,0,k,j),Xe=new xt(0,0,k,j);let We=!1;const $=new Ko;let pe=!1,Le=!1;const me=new ke,Oe=new ke,Ke=new b,je=new xt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function _e(){return A===null?W:1}let D=n;function ze(C,H){return t.getContext(C,H)}try{const C={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Qi}`),t.addEventListener("webglcontextlost",N,!1),t.addEventListener("webglcontextrestored",se,!1),t.addEventListener("webglcontextcreationerror",ie,!1),D===null){const H="webgl2";if(D=ze(H,C),D===null)throw ze(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let fe,Ue,xe,$e,Pe,I,R,q,ee,re,V,de,ce,Ee,te,J,Me,De,Be,ve,Se,we,ut,O;function Ce(){fe=new Xy(D),fe.init(),we=new Jm(D,fe),Ue=new ky(D,fe,e,we),xe=new TS(D,fe),Ue.reverseDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),$e=new jy(D),Pe=new dS,I=new IS(D,fe,xe,Pe,Ue,we,$e),R=new Vy(x),q=new Wy(x),ee=new tv(D),ut=new Fy(D,ee),re=new qy(D,ee,$e,ut),V=new $y(D,re,ee,$e),Be=new Zy(D,Ue,I),J=new zy(Pe),de=new hS(x,R,q,fe,Ue,ut,J),ce=new BS(x,Pe),Ee=new pS,te=new yS(fe),De=new Oy(x,R,q,xe,V,f,l),Me=new wS(x,V,Ue),O=new kS(D,$e,Ue,xe),ve=new By(D,fe,$e),Se=new Yy(D,fe,$e),$e.programs=de.programs,x.capabilities=Ue,x.extensions=fe,x.properties=Pe,x.renderLists=Ee,x.shadowMap=Me,x.state=xe,x.info=$e}Ce();const K=new OS(x,D);this.xr=K,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const C=fe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=fe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(C){C!==void 0&&(W=C,this.setSize(k,j,!1))},this.getSize=function(C){return C.set(k,j)},this.setSize=function(C,H,Z=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=C,j=H,t.width=Math.floor(C*W),t.height=Math.floor(H*W),Z===!0&&(t.style.width=C+"px",t.style.height=H+"px"),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(k*W,j*W).floor()},this.setDrawingBufferSize=function(C,H,Z){k=C,j=H,W=Z,t.width=Math.floor(C*Z),t.height=Math.floor(H*Z),this.setViewport(0,0,C,H)},this.getCurrentViewport=function(C){return C.copy(P)},this.getViewport=function(C){return C.copy(be)},this.setViewport=function(C,H,Z,Y){C.isVector4?be.set(C.x,C.y,C.z,C.w):be.set(C,H,Z,Y),xe.viewport(P.copy(be).multiplyScalar(W).round())},this.getScissor=function(C){return C.copy(Xe)},this.setScissor=function(C,H,Z,Y){C.isVector4?Xe.set(C.x,C.y,C.z,C.w):Xe.set(C,H,Z,Y),xe.scissor(F.copy(Xe).multiplyScalar(W).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(C){xe.setScissorTest(We=C)},this.setOpaqueSort=function(C){ae=C},this.setTransparentSort=function(C){oe=C},this.getClearColor=function(C){return C.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(C=!0,H=!0,Z=!0){let Y=0;if(C){let G=!1;if(A!==null){const Ae=A.texture.format;G=Ae===lc||Ae===ac||Ae===jo}if(G){const Ae=A.texture.type,Fe=Ae===fi||Ae===Ui||Ae===Fr||Ae===Zs||Ae===sc||Ae===rc,Ye=De.getClearColor(),Ve=De.getClearAlpha(),ot=Ye.r,ct=Ye.g,He=Ye.b;Fe?(p[0]=ot,p[1]=ct,p[2]=He,p[3]=Ve,D.clearBufferuiv(D.COLOR,0,p)):(_[0]=ot,_[1]=ct,_[2]=He,_[3]=Ve,D.clearBufferiv(D.COLOR,0,_))}else Y|=D.COLOR_BUFFER_BIT}H&&(Y|=D.DEPTH_BUFFER_BIT),Z&&(Y|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",N,!1),t.removeEventListener("webglcontextrestored",se,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),Ee.dispose(),te.dispose(),Pe.dispose(),R.dispose(),q.dispose(),V.dispose(),ut.dispose(),O.dispose(),de.dispose(),K.dispose(),K.removeEventListener("sessionstart",Gn),K.removeEventListener("sessionend",Fi),dn.stop()};function N(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function se(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const C=$e.autoReset,H=Me.enabled,Z=Me.autoUpdate,Y=Me.needsUpdate,G=Me.type;Ce(),$e.autoReset=C,Me.enabled=H,Me.autoUpdate=Z,Me.needsUpdate=Y,Me.type=G}function ie(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Te(C){const H=C.target;H.removeEventListener("dispose",Te),Ze(H)}function Ze(C){rt(C),Pe.remove(C)}function rt(C){const H=Pe.get(C).programs;H!==void 0&&(H.forEach(function(Z){de.releaseProgram(Z)}),C.isShaderMaterial&&de.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,Z,Y,G,Ae){H===null&&(H=it);const Fe=G.isMesh&&G.matrixWorld.determinant()<0,Ye=Jr(C,H,Z,Y,G);xe.setMaterial(Y,Fe);let Ve=Z.index,ot=1;if(Y.wireframe===!0){if(Ve=re.getWireframeAttribute(Z),Ve===void 0)return;ot=2}const ct=Z.drawRange,He=Z.attributes.position;let gt=ct.start*ot,L=(ct.start+ct.count)*ot;Ae!==null&&(gt=Math.max(gt,Ae.start*ot),L=Math.min(L,(Ae.start+Ae.count)*ot)),Ve!==null?(gt=Math.max(gt,0),L=Math.min(L,Ve.count)):He!=null&&(gt=Math.max(gt,0),L=Math.min(L,He.count));const Q=L-gt;if(Q<0||Q===1/0)return;ut.setup(G,Y,Ye,Z,Ve);let ue,ge=ve;if(Ve!==null&&(ue=ee.get(Ve),ge=Se,ge.setIndex(ue)),G.isMesh)Y.wireframe===!0?(xe.setLineWidth(Y.wireframeLinewidth*_e()),ge.setMode(D.LINES)):ge.setMode(D.TRIANGLES);else if(G.isLine){let ye=Y.linewidth;ye===void 0&&(ye=1),xe.setLineWidth(ye*_e()),G.isLineSegments?ge.setMode(D.LINES):G.isLineLoop?ge.setMode(D.LINE_LOOP):ge.setMode(D.LINE_STRIP)}else G.isPoints?ge.setMode(D.POINTS):G.isSprite&&ge.setMode(D.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)ge.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))ge.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const ye=G._multiDrawStarts,It=G._multiDrawCounts,at=G._multiDrawCount,en=Ve?ee.get(Ve).bytesPerElement:1,Wn=Pe.get(Y).currentProgram.getUniforms();for(let fn=0;fn<at;fn++)Wn.setValue(D,"_gl_DrawID",fn),ge.render(ye[fn]/en,It[fn])}else if(G.isInstancedMesh)ge.renderInstances(gt,Q,G.count);else if(Z.isInstancedBufferGeometry){const ye=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,It=Math.min(Z.instanceCount,ye);ge.renderInstances(gt,Q,It)}else ge.render(gt,Q)};function lt(C,H,Z){C.transparent===!0&&C.side===Nt&&C.forceSinglePass===!1?(C.side=$t,C.needsUpdate=!0,ti(C,H,Z),C.side=di,C.needsUpdate=!0,ti(C,H,Z),C.side=Nt):ti(C,H,Z)}this.compile=function(C,H,Z=null){Z===null&&(Z=C),m=te.get(Z),m.init(H),y.push(m),Z.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),C!==Z&&C.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights();const Y=new Set;return C.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const Ae=G.material;if(Ae)if(Array.isArray(Ae))for(let Fe=0;Fe<Ae.length;Fe++){const Ye=Ae[Fe];lt(Ye,Z,G),Y.add(Ye)}else lt(Ae,Z,G),Y.add(Ae)}),y.pop(),m=null,Y},this.compileAsync=function(C,H,Z=null){const Y=this.compile(C,H,Z);return new Promise(G=>{function Ae(){if(Y.forEach(function(Fe){Pe.get(Fe).currentProgram.isReady()&&Y.delete(Fe)}),Y.size===0){G(C);return}setTimeout(Ae,10)}fe.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let st=null;function Jt(C){st&&st(C)}function Gn(){dn.stop()}function Fi(){dn.start()}const dn=new Ym;dn.setAnimationLoop(Jt),typeof self<"u"&&dn.setContext(self),this.setAnimationLoop=function(C){st=C,K.setAnimationLoop(C),C===null?dn.stop():dn.start()},K.addEventListener("sessionstart",Gn),K.addEventListener("sessionend",Fi),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(H),H=K.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,H,A),m=te.get(C,y.length),m.init(H),y.push(m),Oe.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),$.setFromProjectionMatrix(Oe),Le=this.localClippingEnabled,pe=J.init(this.clippingPlanes,Le),g=Ee.get(C,v.length),g.init(),v.push(g),K.enabled===!0&&K.isPresenting===!0){const Ae=x.xr.getDepthSensingMesh();Ae!==null&&Bi(Ae,H,-1/0,x.sortObjects)}Bi(C,H,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ae,oe),le=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,le&&De.addToRenderList(g,C),this.info.render.frame++,pe===!0&&J.beginShadows();const Z=m.state.shadowsArray;Me.render(Z,C,H),pe===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=g.opaque,G=g.transmissive;if(m.setupLights(),H.isArrayCamera){const Ae=H.cameras;if(G.length>0)for(let Fe=0,Ye=Ae.length;Fe<Ye;Fe++){const Ve=Ae[Fe];kt(Y,G,C,Ve)}le&&De.render(C);for(let Fe=0,Ye=Ae.length;Fe<Ye;Fe++){const Ve=Ae[Fe];sr(g,C,Ve,Ve.viewport)}}else G.length>0&&kt(Y,G,C,H),le&&De.render(C),sr(g,C,H);A!==null&&(I.updateMultisampleRenderTarget(A),I.updateRenderTargetMipmap(A)),C.isScene===!0&&C.onAfterRender(x,C,H),ut.resetDefaultState(),S=-1,M=null,y.pop(),y.length>0?(m=y[y.length-1],pe===!0&&J.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function Bi(C,H,Z,Y){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)Z=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||$.intersectsSprite(C)){Y&&je.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Oe);const Fe=V.update(C),Ye=C.material;Ye.visible&&g.push(C,Fe,Ye,Z,je.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||$.intersectsObject(C))){const Fe=V.update(C),Ye=C.material;if(Y&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),je.copy(C.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),je.copy(Fe.boundingSphere.center)),je.applyMatrix4(C.matrixWorld).applyMatrix4(Oe)),Array.isArray(Ye)){const Ve=Fe.groups;for(let ot=0,ct=Ve.length;ot<ct;ot++){const He=Ve[ot],gt=Ye[He.materialIndex];gt&&gt.visible&&g.push(C,Fe,gt,Z,je.z,He)}}else Ye.visible&&g.push(C,Fe,Ye,Z,je.z,null)}}const Ae=C.children;for(let Fe=0,Ye=Ae.length;Fe<Ye;Fe++)Bi(Ae[Fe],H,Z,Y)}function sr(C,H,Z,Y){const G=C.opaque,Ae=C.transmissive,Fe=C.transparent;m.setupLightsView(Z),pe===!0&&J.setGlobalState(x.clippingPlanes,Z),Y&&xe.viewport(P.copy(Y)),G.length>0&&Qt(G,H,Z),Ae.length>0&&Qt(Ae,H,Z),Fe.length>0&&Qt(Fe,H,Z),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function kt(C,H,Z,Y){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Y.id]===void 0&&(m.state.transmissionRenderTarget[Y.id]=new cn(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?Kn:fi,minFilter:Bn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));const Ae=m.state.transmissionRenderTarget[Y.id],Fe=Y.viewport||P;Ae.setSize(Fe.z,Fe.w);const Ye=x.getRenderTarget();x.setRenderTarget(Ae),x.getClearColor(U),z=x.getClearAlpha(),z<1&&x.setClearColor(16777215,.5),x.clear(),le&&De.render(Z);const Ve=x.toneMapping;x.toneMapping=Pi;const ot=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),m.setupLightsView(Y),pe===!0&&J.setGlobalState(x.clippingPlanes,Y),Qt(C,Z,Y),I.updateMultisampleRenderTarget(Ae),I.updateRenderTargetMipmap(Ae),fe.has("WEBGL_multisampled_render_to_texture")===!1){let ct=!1;for(let He=0,gt=H.length;He<gt;He++){const L=H[He],Q=L.object,ue=L.geometry,ge=L.material,ye=L.group;if(ge.side===Nt&&Q.layers.test(Y.layers)){const It=ge.side;ge.side=$t,ge.needsUpdate=!0,ki(Q,Z,Y,ue,ge,ye),ge.side=It,ge.needsUpdate=!0,ct=!0}}ct===!0&&(I.updateMultisampleRenderTarget(Ae),I.updateRenderTargetMipmap(Ae))}x.setRenderTarget(Ye),x.setClearColor(U,z),ot!==void 0&&(Y.viewport=ot),x.toneMapping=Ve}function Qt(C,H,Z){const Y=H.isScene===!0?H.overrideMaterial:null;for(let G=0,Ae=C.length;G<Ae;G++){const Fe=C[G],Ye=Fe.object,Ve=Fe.geometry,ot=Y===null?Fe.material:Y,ct=Fe.group;Ye.layers.test(Z.layers)&&ki(Ye,H,Z,Ve,ot,ct)}}function ki(C,H,Z,Y,G,Ae){C.onBeforeRender(x,H,Z,Y,G,Ae),C.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),G.onBeforeRender(x,H,Z,Y,C,Ae),G.transparent===!0&&G.side===Nt&&G.forceSinglePass===!1?(G.side=$t,G.needsUpdate=!0,x.renderBufferDirect(Z,H,Y,G,C,Ae),G.side=di,G.needsUpdate=!0,x.renderBufferDirect(Z,H,Y,G,C,Ae),G.side=Nt):x.renderBufferDirect(Z,H,Y,G,C,Ae),C.onAfterRender(x,H,Z,Y,G,Ae)}function ti(C,H,Z){H.isScene!==!0&&(H=it);const Y=Pe.get(C),G=m.state.lights,Ae=m.state.shadowsArray,Fe=G.state.version,Ye=de.getParameters(C,G.state,Ae,H,Z),Ve=de.getProgramCacheKey(Ye);let ot=Y.programs;Y.environment=C.isMeshStandardMaterial?H.environment:null,Y.fog=H.fog,Y.envMap=(C.isMeshStandardMaterial?q:R).get(C.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,ot===void 0&&(C.addEventListener("dispose",Te),ot=new Map,Y.programs=ot);let ct=ot.get(Ve);if(ct!==void 0){if(Y.currentProgram===ct&&Y.lightsStateVersion===Fe)return Kr(C,Ye),ct}else Ye.uniforms=de.getUniforms(C),C.onBeforeCompile(Ye,x),ct=de.acquireProgram(Ye,Ve),ot.set(Ve,ct),Y.uniforms=Ye.uniforms;const He=Y.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(He.clippingPlanes=J.uniform),Kr(C,Ye),Y.needsLights=us(C),Y.lightsStateVersion=Fe,Y.needsLights&&(He.ambientLightColor.value=G.state.ambient,He.lightProbe.value=G.state.probe,He.directionalLights.value=G.state.directional,He.directionalLightShadows.value=G.state.directionalShadow,He.spotLights.value=G.state.spot,He.spotLightShadows.value=G.state.spotShadow,He.rectAreaLights.value=G.state.rectArea,He.ltc_1.value=G.state.rectAreaLTC1,He.ltc_2.value=G.state.rectAreaLTC2,He.pointLights.value=G.state.point,He.pointLightShadows.value=G.state.pointShadow,He.hemisphereLights.value=G.state.hemi,He.directionalShadowMap.value=G.state.directionalShadowMap,He.directionalShadowMatrix.value=G.state.directionalShadowMatrix,He.spotShadowMap.value=G.state.spotShadowMap,He.spotLightMatrix.value=G.state.spotLightMatrix,He.spotLightMap.value=G.state.spotLightMap,He.pointShadowMap.value=G.state.pointShadowMap,He.pointShadowMatrix.value=G.state.pointShadowMatrix),Y.currentProgram=ct,Y.uniformsList=null,ct}function rr(C){if(C.uniformsList===null){const H=C.currentProgram.getUniforms();C.uniformsList=il.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function Kr(C,H){const Z=Pe.get(C);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function Jr(C,H,Z,Y,G){H.isScene!==!0&&(H=it),I.resetTextureUnits();const Ae=H.fog,Fe=Y.isMeshStandardMaterial?H.environment:null,Ye=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:_n,Ve=(Y.isMeshStandardMaterial?q:R).get(Y.envMap||Fe),ot=Y.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,ct=!!Z.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),He=!!Z.morphAttributes.position,gt=!!Z.morphAttributes.normal,L=!!Z.morphAttributes.color;let Q=Pi;Y.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Q=x.toneMapping);const ue=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ge=ue!==void 0?ue.length:0,ye=Pe.get(Y),It=m.state.lights;if(pe===!0&&(Le===!0||C!==M)){const Un=C===M&&Y.id===S;J.setState(Y,C,Un)}let at=!1;Y.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==It.state.version||ye.outputColorSpace!==Ye||G.isBatchedMesh&&ye.batching===!1||!G.isBatchedMesh&&ye.batching===!0||G.isBatchedMesh&&ye.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&ye.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&ye.instancing===!1||!G.isInstancedMesh&&ye.instancing===!0||G.isSkinnedMesh&&ye.skinning===!1||!G.isSkinnedMesh&&ye.skinning===!0||G.isInstancedMesh&&ye.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&ye.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&ye.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&ye.instancingMorph===!1&&G.morphTexture!==null||ye.envMap!==Ve||Y.fog===!0&&ye.fog!==Ae||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==J.numPlanes||ye.numIntersection!==J.numIntersection)||ye.vertexAlphas!==ot||ye.vertexTangents!==ct||ye.morphTargets!==He||ye.morphNormals!==gt||ye.morphColors!==L||ye.toneMapping!==Q||ye.morphTargetsCount!==ge)&&(at=!0):(at=!0,ye.__version=Y.version);let en=ye.currentProgram;at===!0&&(en=ti(Y,H,G));let Wn=!1,fn=!1,Qr=!1;const Ct=en.getUniforms(),ni=ye.uniforms;if(xe.useProgram(en.program)&&(Wn=!0,fn=!0,Qr=!0),Y.id!==S&&(S=Y.id,fn=!0),Wn||M!==C){xe.buffers.depth.getReversed()?(me.copy(C.projectionMatrix),A_(me),E_(me),Ct.setValue(D,"projectionMatrix",me)):Ct.setValue(D,"projectionMatrix",C.projectionMatrix),Ct.setValue(D,"viewMatrix",C.matrixWorldInverse);const zi=Ct.map.cameraPosition;zi!==void 0&&zi.setValue(D,Ke.setFromMatrixPosition(C.matrixWorld)),Ue.logarithmicDepthBuffer&&Ct.setValue(D,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ct.setValue(D,"isOrthographic",C.isOrthographicCamera===!0),M!==C&&(M=C,fn=!0,Qr=!0)}if(G.isSkinnedMesh){Ct.setOptional(D,G,"bindMatrix"),Ct.setOptional(D,G,"bindMatrixInverse");const Un=G.skeleton;Un&&(Un.boneTexture===null&&Un.computeBoneTexture(),Ct.setValue(D,"boneTexture",Un.boneTexture,I))}G.isBatchedMesh&&(Ct.setOptional(D,G,"batchingTexture"),Ct.setValue(D,"batchingTexture",G._matricesTexture,I),Ct.setOptional(D,G,"batchingIdTexture"),Ct.setValue(D,"batchingIdTexture",G._indirectTexture,I),Ct.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&Ct.setValue(D,"batchingColorTexture",G._colorsTexture,I));const eo=Z.morphAttributes;if((eo.position!==void 0||eo.normal!==void 0||eo.color!==void 0)&&Be.update(G,Z,en),(fn||ye.receiveShadow!==G.receiveShadow)&&(ye.receiveShadow=G.receiveShadow,Ct.setValue(D,"receiveShadow",G.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(ni.envMap.value=Ve,ni.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&H.environment!==null&&(ni.envMapIntensity.value=H.environmentIntensity),fn&&(Ct.setValue(D,"toneMappingExposure",x.toneMappingExposure),ye.needsLights&&vi(ni,Qr),Ae&&Y.fog===!0&&ce.refreshFogUniforms(ni,Ae),ce.refreshMaterialUniforms(ni,Y,W,j,m.state.transmissionRenderTarget[C.id]),il.upload(D,rr(ye),ni,I)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(il.upload(D,rr(ye),ni,I),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ct.setValue(D,"center",G.center),Ct.setValue(D,"modelViewMatrix",G.modelViewMatrix),Ct.setValue(D,"normalMatrix",G.normalMatrix),Ct.setValue(D,"modelMatrix",G.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Un=Y.uniformsGroups;for(let zi=0,Vi=Un.length;zi<Vi;zi++){const md=Un[zi];O.update(md,en),O.bind(md,en)}}return en}function vi(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function us(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(C,H,Z){Pe.get(C.texture).__webglTexture=H,Pe.get(C.depthTexture).__webglTexture=Z;const Y=Pe.get(C);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=Z===void 0,Y.__autoAllocateDepthBuffer||fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,H){const Z=Pe.get(C);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(C,H=0,Z=0){A=C,T=H,w=Z;let Y=!0,G=null,Ae=!1,Fe=!1;if(C){const Ve=Pe.get(C);if(Ve.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(D.FRAMEBUFFER,null),Y=!1;else if(Ve.__webglFramebuffer===void 0)I.setupRenderTarget(C);else if(Ve.__hasExternalTextures)I.rebindTextures(C,Pe.get(C.texture).__webglTexture,Pe.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const He=C.depthTexture;if(Ve.__boundDepthTexture!==He){if(He!==null&&Pe.has(He)&&(C.width!==He.image.width||C.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(C)}}const ot=C.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(Fe=!0);const ct=Pe.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(ct[H])?G=ct[H][Z]:G=ct[H],Ae=!0):C.samples>0&&I.useMultisampledRTT(C)===!1?G=Pe.get(C).__webglMultisampledFramebuffer:Array.isArray(ct)?G=ct[Z]:G=ct,P.copy(C.viewport),F.copy(C.scissor),B=C.scissorTest}else P.copy(be).multiplyScalar(W).floor(),F.copy(Xe).multiplyScalar(W).floor(),B=We;if(xe.bindFramebuffer(D.FRAMEBUFFER,G)&&Y&&xe.drawBuffers(C,G),xe.viewport(P),xe.scissor(F),xe.setScissorTest(B),Ae){const Ve=Pe.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ve.__webglTexture,Z)}else if(Fe){const Ve=Pe.get(C.texture),ot=H||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ve.__webglTexture,Z||0,ot)}S=-1},this.readRenderTargetPixels=function(C,H,Z,Y,G,Ae,Fe){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=Pe.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ye=Ye[Fe]),Ye){xe.bindFramebuffer(D.FRAMEBUFFER,Ye);try{const Ve=C.texture,ot=Ve.format,ct=Ve.type;if(!Ue.textureFormatReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-Y&&Z>=0&&Z<=C.height-G&&D.readPixels(H,Z,Y,G,we.convert(ot),we.convert(ct),Ae)}finally{const Ve=A!==null?Pe.get(A).__webglFramebuffer:null;xe.bindFramebuffer(D.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(C,H,Z,Y,G,Ae,Fe){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=Pe.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ye=Ye[Fe]),Ye){const Ve=C.texture,ot=Ve.format,ct=Ve.type;if(!Ue.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=C.width-Y&&Z>=0&&Z<=C.height-G){xe.bindFramebuffer(D.FRAMEBUFFER,Ye);const He=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,He),D.bufferData(D.PIXEL_PACK_BUFFER,Ae.byteLength,D.STREAM_READ),D.readPixels(H,Z,Y,G,we.convert(ot),we.convert(ct),0);const gt=A!==null?Pe.get(A).__webglFramebuffer:null;xe.bindFramebuffer(D.FRAMEBUFFER,gt);const L=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await T_(D,L,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,He),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Ae),D.deleteBuffer(He),D.deleteSync(L),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,H=null,Z=0){C.isTexture!==!0&&(Mo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,C=arguments[1]);const Y=Math.pow(2,-Z),G=Math.floor(C.image.width*Y),Ae=Math.floor(C.image.height*Y),Fe=H!==null?H.x:0,Ye=H!==null?H.y:0;I.setTexture2D(C,0),D.copyTexSubImage2D(D.TEXTURE_2D,Z,0,0,Fe,Ye,G,Ae),xe.unbindTexture()},this.copyTextureToTexture=function(C,H,Z=null,Y=null,G=0){C.isTexture!==!0&&(Mo("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,C=arguments[1],H=arguments[2],G=arguments[3]||0,Z=null);let Ae,Fe,Ye,Ve,ot,ct,He,gt,L;const Q=C.isCompressedTexture?C.mipmaps[G]:C.image;Z!==null?(Ae=Z.max.x-Z.min.x,Fe=Z.max.y-Z.min.y,Ye=Z.isBox3?Z.max.z-Z.min.z:1,Ve=Z.min.x,ot=Z.min.y,ct=Z.isBox3?Z.min.z:0):(Ae=Q.width,Fe=Q.height,Ye=Q.depth||1,Ve=0,ot=0,ct=0),Y!==null?(He=Y.x,gt=Y.y,L=Y.z):(He=0,gt=0,L=0);const ue=we.convert(H.format),ge=we.convert(H.type);let ye;H.isData3DTexture?(I.setTexture3D(H,0),ye=D.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(I.setTexture2DArray(H,0),ye=D.TEXTURE_2D_ARRAY):(I.setTexture2D(H,0),ye=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,H.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,H.unpackAlignment);const It=D.getParameter(D.UNPACK_ROW_LENGTH),at=D.getParameter(D.UNPACK_IMAGE_HEIGHT),en=D.getParameter(D.UNPACK_SKIP_PIXELS),Wn=D.getParameter(D.UNPACK_SKIP_ROWS),fn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Q.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Q.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ve),D.pixelStorei(D.UNPACK_SKIP_ROWS,ot),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ct);const Qr=C.isDataArrayTexture||C.isData3DTexture,Ct=H.isDataArrayTexture||H.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const ni=Pe.get(C),eo=Pe.get(H),Un=Pe.get(ni.__renderTarget),zi=Pe.get(eo.__renderTarget);xe.bindFramebuffer(D.READ_FRAMEBUFFER,Un.__webglFramebuffer),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Vi=0;Vi<Ye;Vi++)Qr&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Pe.get(C).__webglTexture,G,ct+Vi),C.isDepthTexture?(Ct&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Pe.get(H).__webglTexture,G,L+Vi),D.blitFramebuffer(Ve,ot,Ae,Fe,He,gt,Ae,Fe,D.DEPTH_BUFFER_BIT,D.NEAREST)):Ct?D.copyTexSubImage3D(ye,G,He,gt,L+Vi,Ve,ot,Ae,Fe):D.copyTexSubImage2D(ye,G,He,gt,L+Vi,Ve,ot,Ae,Fe);xe.bindFramebuffer(D.READ_FRAMEBUFFER,null),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ct?C.isDataTexture||C.isData3DTexture?D.texSubImage3D(ye,G,He,gt,L,Ae,Fe,Ye,ue,ge,Q.data):H.isCompressedArrayTexture?D.compressedTexSubImage3D(ye,G,He,gt,L,Ae,Fe,Ye,ue,Q.data):D.texSubImage3D(ye,G,He,gt,L,Ae,Fe,Ye,ue,ge,Q):C.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,G,He,gt,Ae,Fe,ue,ge,Q.data):C.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,G,He,gt,Q.width,Q.height,ue,Q.data):D.texSubImage2D(D.TEXTURE_2D,G,He,gt,Ae,Fe,ue,ge,Q);D.pixelStorei(D.UNPACK_ROW_LENGTH,It),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,at),D.pixelStorei(D.UNPACK_SKIP_PIXELS,en),D.pixelStorei(D.UNPACK_SKIP_ROWS,Wn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,fn),G===0&&H.generateMipmaps&&D.generateMipmap(ye),xe.unbindTexture()},this.copyTextureToTexture3D=function(C,H,Z=null,Y=null,G=0){return C.isTexture!==!0&&(Mo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,Y=arguments[1]||null,C=arguments[2],H=arguments[3],G=arguments[4]||0),Mo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,H,Z,Y,G)},this.initRenderTarget=function(C){Pe.get(C).__webglFramebuffer===void 0&&I.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?I.setTextureCube(C,0):C.isData3DTexture?I.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?I.setTexture2DArray(C,0):I.setTexture2D(C,0),xe.unbindTexture()},this.resetState=function(){T=0,w=0,A=null,xe.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}class mc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new X(e),this.density=t}clone(){return new mc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Jo{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new X(e),this.near=t,this.far=n}clone(){return new Jo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bh extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class tr{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ko,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const vn=new b;class pi{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix4(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyNormalMatrix(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.transformDirection(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new pi(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class kh extends Kt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let yr;const oo=new b,Mr=new b,Sr=new b,wr=new ne,ao=new ne,tg=new ke,wa=new b,lo=new b,ba=new b,lf=new ne,iu=new ne,cf=new ne;class ng extends pt{constructor(e=new kh){if(super(),this.isSprite=!0,this.type="Sprite",yr===void 0){yr=new qe;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new tr(t,5);yr.setIndex([0,1,2,0,2,3]),yr.setAttribute("position",new pi(n,3,0,!1)),yr.setAttribute("uv",new pi(n,2,3,!1))}this.geometry=yr,this.material=e,this.center=new ne(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Mr.setFromMatrixScale(this.matrixWorld),tg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Sr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Mr.multiplyScalar(-Sr.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Ta(wa.set(-.5,-.5,0),Sr,o,Mr,i,r),Ta(lo.set(.5,-.5,0),Sr,o,Mr,i,r),Ta(ba.set(.5,.5,0),Sr,o,Mr,i,r),lf.set(0,0),iu.set(1,0),cf.set(1,1);let a=e.ray.intersectTriangle(wa,lo,ba,!1,oo);if(a===null&&(Ta(lo.set(-.5,.5,0),Sr,o,Mr,i,r),iu.set(0,1),a=e.ray.intersectTriangle(wa,ba,lo,!1,oo),a===null))return;const l=e.ray.origin.distanceTo(oo);l<e.near||l>e.far||t.push({distance:l,point:oo.clone(),uv:En.getInterpolation(oo,wa,lo,ba,lf,iu,cf,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ta(s,e,t,n,i,r){wr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(ao.x=r*wr.x-i*wr.y,ao.y=i*wr.x+r*wr.y):ao.copy(wr),s.copy(e),s.x+=ao.x,s.y+=ao.y,s.applyMatrix4(tg)}const Aa=new b,uf=new b;class ig extends pt{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Aa.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Aa);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Aa.setFromMatrixPosition(e.matrixWorld),uf.setFromMatrixPosition(this.matrixWorld);const n=Aa.distanceTo(uf)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const hf=new b,df=new xt,ff=new xt,zS=new b,pf=new ke,Ea=new b,su=new hn,mf=new ke,ru=new qr;class gc extends Ie{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Hu,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new un),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ea),this.boundingBox.expandByPoint(Ea)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ea),this.boundingSphere.expandByPoint(Ea)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),su.copy(this.boundingSphere),su.applyMatrix4(i),e.ray.intersectsSphere(su)!==!1&&(mf.copy(i).invert(),ru.copy(e.ray).applyMatrix4(mf),!(this.boundingBox!==null&&ru.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ru)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Hu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Am?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;df.fromBufferAttribute(i.attributes.skinIndex,e),ff.fromBufferAttribute(i.attributes.skinWeight,e),hf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=ff.getComponent(r);if(o!==0){const a=df.getComponent(r);pf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(zS.copy(hf).applyMatrix4(pf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class _c extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class kn extends Ut{constructor(e=null,t=1,n=1,i,r,o,a,l,c=qt,u=qt,h,d){super(null,o,a,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const gf=new ke,VS=new ke;class as{constructor(e=[],t=[]){this.uuid=Ln(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:VS;gf.multiplyMatrices(a,t[r]),gf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new as(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new kn(t,e,e,ln,Rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new _c),this.bones.push(o),this.boneInverses.push(new ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ns extends Je{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const br=new ke,_f=new ke,Ra=[],vf=new un,HS=new ke,co=new Ie,uo=new hn;class Xt extends Ie{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ns(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,HS)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new un),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,br),vf.copy(e.boundingBox).applyMatrix4(br),this.boundingBox.union(vf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,br),uo.copy(e.boundingSphere).applyMatrix4(br),this.boundingSphere.union(uo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(co.geometry=this.geometry,co.material=this.material,co.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),uo.copy(this.boundingSphere),uo.applyMatrix4(n),e.ray.intersectsSphere(uo)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,br),_f.multiplyMatrices(n,br),co.matrixWorld=_f,co.raycast(e,Ra);for(let o=0,a=Ra.length;o<a;o++){const l=Ra[o];l.instanceId=r,l.object=this,t.push(l)}Ra.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ns(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new kn(new Float32Array(i*this.count),i,this.count,oc,Rn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function ou(s,e){return s-e}function GS(s,e){return s.z-e.z}function WS(s,e){return e.z-s.z}class XS{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const a=r[this.index];o.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const Tn=new ke,qS=new X(1,1,1),au=new Ko,Ca=new un,_s=new hn,ho=new b,xf=new b,YS=new b,lu=new XS,gn=new Ie,Pa=[];function jS(s,e,t=0){const n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){const i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function vs(s,e){if(s.constructor!==e.constructor){const t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{const t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}class sg extends Ie{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(e,t,n=t*2,i){super(new qe,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new kn(t,e,e,ln,Rn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new kn(t,e,e,jo,Ui);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new kn(t,e,e,ln,Rn);n.colorSpace=mt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in e.attributes){const o=e.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,u=new a.constructor(n*l),h=new Je(u,l,c);t.setAttribute(r,h)}if(e.getIndex()!==null){const r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Je(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,Tn),this.getBoundingBoxAt(r,Ca).applyMatrix4(Tn),e.union(Ca)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,Tn),this.getBoundingSphereAt(r,_s).applyMatrix4(Tn),e.union(_s)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(ou),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const r=this._matricesTexture;Tn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;const o=this._colorsTexture;return o&&(qS.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(ou),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._geometryInfo[e];if(i&&o.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const h=t.getAttribute(u),d=n.getAttribute(u);jS(h,d,l);const f=h.itemSize;for(let p=h.count,_=c;p<_;p++){const g=l+p;for(let m=0;m<f;m++)d.setComponent(g,m,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const u=a.indexStart,h=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let d=0;d<o.count;d++)r.setX(u+d,l+o.getX(d));for(let d=o.count,f=h;d<f;d++)r.setX(u+d,l);r.needsUpdate=!0,r.addUpdateRange(u,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?this:(t[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){const l=i[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,f=r.index,p=f.array,_=e-h;for(let g=u;g<u+d;g++)p[g]=p[g]+_;f.array.copyWithin(t,u,u+d),f.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:h}=c,d=r.attributes;for(const f in d){const p=d[f],{array:_,itemSize:g}=p;_.copyWithin(e*g,u*g,(u+h)*g),p.addUpdateRange(e*g,h*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart,this._nextIndexStart=r.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const r=new un,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;o&&(u=o.getX(u)),r.expandByPoint(ho.fromBufferAttribute(a,u))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const r=new hn;this.getBoundingBoxAt(e,Ca),Ca.getCenter(r.center);const o=n.index,a=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let h=c;o&&(h=o.getX(h)),ho.fromBufferAttribute(a,h),l=Math.max(l,r.center.distanceToSquared(ho))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture,r=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?null:t.fromArray(i,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,r=this._instanceInfo;return e>=r.length||r[e].active===!1?this:(t.toArray(i,e*4),n.needsUpdate=!0,this)}getColorAt(e,t){const n=this._colorsTexture.image.data,i=this._instanceInfo;return e>=i.length||i[e].active===!1?null:t.fromArray(n,e*4)}setVisibleAt(e,t){const n=this._instanceInfo;return e>=n.length||n[e].active===!1||n[e].visible===t?this:(n[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?!1:t[e].visible}setGeometryIdAt(e,t){const n=this._instanceInfo,i=this._geometryInfo;return e>=n.length||n[e].active===!1||t>=i.length||i[t].active===!1?null:(n[e].geometryIndex=t,this)}getGeometryIdAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?-1:t[e].geometryIndex}getGeometryRangeAt(e,t={}){if(e<0||e>=this._geometryCount)return null;const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(ou);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),r=new Int32Array(e);vs(this._multiDrawCounts,i),vs(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;const o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),vs(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),vs(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),vs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new qe,this._initializeGeometry(r));const o=this.geometry;r.index&&vs(r.index.array,o.index.array);for(const a in r.attributes)vs(r.attributes[a].array,o.attributes[a].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;gn.material=this.material,gn.geometry.index=o.index,gn.geometry.attributes=o.attributes,gn.geometry.boundingBox===null&&(gn.geometry.boundingBox=new un),gn.geometry.boundingSphere===null&&(gn.geometry.boundingSphere=new hn);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;const c=n[a].geometryIndex,u=i[c];gn.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(a,gn.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,gn.geometry.boundingBox),this.getBoundingSphereAt(c,gn.geometry.boundingSphere),gn.raycast(e,Pa);for(let h=0,d=Pa.length;h<d;h++){const f=Pa[h];f.object=this,f.batchId=a,t.push(f)}Pa.length=0}gn.material=null,gn.geometry.index=null,gn.geometry.attributes={},gn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,p=f.image.data;d&&(Tn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),au.setFromProjectionMatrix(Tn,e.coordinateSystem));let _=0;if(this.sortObjects){Tn.copy(this.matrixWorld).invert(),ho.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Tn),xf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Tn);for(let v=0,y=l.length;v<y;v++)if(l[v].visible&&l[v].active){const x=l[v].geometryIndex;this.getMatrixAt(v,Tn),this.getBoundingSphereAt(x,_s).applyMatrix4(Tn);let E=!1;if(d&&(E=!au.intersectsSphere(_s)),!E){const T=h[x],w=YS.subVectors(_s.center,ho).dot(xf);lu.push(T.start,T.count,w,v)}}const g=lu.list,m=this.customSort;m===null?g.sort(r.transparent?WS:GS):m.call(this,g,n);for(let v=0,y=g.length;v<y;v++){const x=g[v];c[_]=x.start*a,u[_]=x.count,p[_]=x.index,_++}lu.reset()}else for(let g=0,m=l.length;g<m;g++)if(l[g].visible&&l[g].active){const v=l[g].geometryIndex;let y=!1;if(d&&(this.getMatrixAt(g,Tn),this.getBoundingSphereAt(v,_s).applyMatrix4(Tn),y=!au.intersectsSphere(_s)),!y){const x=h[v];c[_]=x.start*a,u[_]=x.count,p[_]=g,_++}}f.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}}class Yt extends Kt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gl=new b,Wl=new b,yf=new ke,fo=new qr,Ia=new hn,cu=new b,Mf=new b;class mi extends pt{constructor(e=new qe,t=new Yt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Gl.fromBufferAttribute(t,i-1),Wl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Gl.distanceTo(Wl);e.setAttribute("lineDistance",new Ne(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ia.copy(n.boundingSphere),Ia.applyMatrix4(i),Ia.radius+=r,e.ray.intersectsSphere(Ia)===!1)return;yf.copy(i).invert(),fo.copy(e.ray).applyMatrix4(yf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=u.getX(_),v=u.getX(_+1),y=La(this,e,fo,l,m,v);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(p-1),g=u.getX(f),m=La(this,e,fo,l,_,g);m&&t.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=La(this,e,fo,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=La(this,e,fo,l,p-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function La(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(Gl.fromBufferAttribute(o,i),Wl.fromBufferAttribute(o,r),t.distanceSqToSegment(Gl,Wl,cu,Mf)>n)return;cu.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(cu);if(!(l<e.near||l>e.far))return{distance:l,point:Mf.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Sf=new b,wf=new b;class wn extends mi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Sf.fromBufferAttribute(t,i),wf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Sf.distanceTo(wf);e.setAttribute("lineDistance",new Ne(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class zh extends mi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class vc extends Kt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bf=new ke,ju=new qr,Ua=new hn,Da=new b;class Hr extends pt{constructor(e=new qe,t=new vc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(i),Ua.radius+=r,e.ray.intersectsSphere(Ua)===!1)return;bf.copy(i).invert(),ju.copy(e.ray).applyMatrix4(bf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,_=f;p<_;p++){const g=c.getX(p);Da.fromBufferAttribute(h,g),Tf(Da,g,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let p=d,_=f;p<_;p++)Da.fromBufferAttribute(h,p),Tf(Da,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Tf(s,e,t,n,i,r,o){const a=ju.distanceSqToPoint(s);if(a<t){const l=new b;ju.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ZS extends Ut{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:Ft,this.magFilter=r!==void 0?r:Ft,this.generateMipmaps=!1;const u=this;function h(){u.needsUpdate=!0,e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(h)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class $S extends Ut{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=qt,this.minFilter=qt,this.generateMipmaps=!1,this.needsUpdate=!0}}class xc extends Ut{constructor(e,t,n,i,r,o,a,l,c,u,h,d){super(null,o,a,l,c,u,i,r,h,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class KS extends xc{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=In,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class JS extends xc{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Li),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Vh extends Ut{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const u=n[i],d=n[i+1]-u,f=(o-u)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ne:new b);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new b,i=[],r=[],o=[],a=new b,l=new ke;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new b)}r[0]=new b,o[0]=new b;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Gt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Gt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class yc extends Qn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ne){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class rg extends yc{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Hh(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Na=new b,uu=new Hh,hu=new Hh,du=new Hh;class Ho extends Qn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new b){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%r]:(Na.subVectors(i[0],i[1]).add(i[0]),c=Na);const h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(Na.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Na),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),uu.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,p,_,g),hu.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,p,_,g),du.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,p,_,g)}else this.curveType==="catmullrom"&&(uu.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),hu.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),du.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(uu.calc(l),hu.calc(l),du.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new b().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Af(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function QS(s,e){const t=1-s;return t*t*e}function ew(s,e){return 2*(1-s)*s*e}function tw(s,e){return s*s*e}function Uo(s,e,t,n){return QS(s,e)+ew(s,t)+tw(s,n)}function nw(s,e){const t=1-s;return t*t*t*e}function iw(s,e){const t=1-s;return 3*t*t*s*e}function sw(s,e){return 3*(1-s)*s*s*e}function rw(s,e){return s*s*s*e}function Do(s,e,t,n,i){return nw(s,e)+iw(s,t)+sw(s,n)+rw(s,i)}class Gh extends Qn{constructor(e=new ne,t=new ne,n=new ne,i=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Do(e,i.x,r.x,o.x,a.x),Do(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class og extends Qn{constructor(e=new b,t=new b,n=new b,i=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new b){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Do(e,i.x,r.x,o.x,a.x),Do(e,i.y,r.y,o.y,a.y),Do(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Wh extends Qn{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ag extends Qn{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xh extends Qn{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Uo(e,i.x,r.x,o.x),Uo(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qh extends Qn{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Uo(e,i.x,r.x,o.x),Uo(e,i.y,r.y,o.y),Uo(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Yh extends Qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Af(a,l.x,c.x,u.x,h.x),Af(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ne().fromArray(i))}return this}}var Xl=Object.freeze({__proto__:null,ArcCurve:rg,CatmullRomCurve3:Ho,CubicBezierCurve:Gh,CubicBezierCurve3:og,EllipseCurve:yc,LineCurve:Wh,LineCurve3:ag,QuadraticBezierCurve:Xh,QuadraticBezierCurve3:qh,SplineCurve:Yh});class lg extends Qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Xl[i.type]().fromJSON(i))}return this}}class Go extends lg{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Wh(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Xh(this.currentPoint.clone(),new ne(e,t),new ne(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new Gh(this.currentPoint.clone(),new ne(e,t),new ne(n,i),new ne(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Yh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new yc(e,t,n,i,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Qo extends qe{constructor(e=[new ne(0,-.5),new ne(.5,0),new ne(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Gt(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,h=new b,d=new ne,f=new b,p=new b,_=new b;let g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=t;v++){const y=n+v*u*i,x=Math.sin(y),E=Math.cos(y);for(let T=0;T<=e.length-1;T++){h.x=e[T].x*x,h.y=e[T].y,h.z=e[T].x*E,o.push(h.x,h.y,h.z),d.x=v/t,d.y=T/(e.length-1),a.push(d.x,d.y);const w=l[3*T+0]*x,A=l[3*T+1],S=l[3*T+0]*E;c.push(w,A,S)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){const x=y+v*e.length,E=x,T=x+e.length,w=x+e.length+1,A=x+1;r.push(E,T,A),r.push(w,A,T)}this.setIndex(r),this.setAttribute("position",new Ne(o,3)),this.setAttribute("uv",new Ne(a,2)),this.setAttribute("normal",new Ne(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.points,e.segments,e.phiStart,e.phiLength)}}class Mc extends Qo{constructor(e=1,t=1,n=4,i=8){const r=new Go;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Mc(e.radius,e.length,e.capSegments,e.radialSegments)}}class is extends qe{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new b,u=new ne;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Ne(o,3)),this.setAttribute("normal",new Ne(a,3)),this.setAttribute("uv",new Ne(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Bt extends qe{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(d,3)),this.setAttribute("uv",new Ne(f,2));function v(){const x=new b,E=new b;let T=0;const w=(t-e)/n;for(let A=0;A<=r;A++){const S=[],M=A/r,P=M*(t-e)+e;for(let F=0;F<=i;F++){const B=F/i,U=B*l+a,z=Math.sin(U),k=Math.cos(U);E.x=P*z,E.y=-M*n+g,E.z=P*k,h.push(E.x,E.y,E.z),x.set(z,w,k).normalize(),d.push(x.x,x.y,x.z),f.push(B,1-M),S.push(p++)}_.push(S)}for(let A=0;A<i;A++)for(let S=0;S<r;S++){const M=_[S][A],P=_[S+1][A],F=_[S+1][A+1],B=_[S][A+1];(e>0||S!==0)&&(u.push(M,P,B),T+=3),(t>0||S!==r-1)&&(u.push(P,F,B),T+=3)}c.addGroup(m,T,0),m+=T}function y(x){const E=p,T=new ne,w=new b;let A=0;const S=x===!0?e:t,M=x===!0?1:-1;for(let F=1;F<=i;F++)h.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),p++;const P=p;for(let F=0;F<=i;F++){const U=F/i*l+a,z=Math.cos(U),k=Math.sin(U);w.x=S*k,w.y=g*M,w.z=S*z,h.push(w.x,w.y,w.z),d.push(0,M,0),T.x=z*.5+.5,T.y=k*.5*M+.5,f.push(T.x,T.y),p++}for(let F=0;F<i;F++){const B=E+F,U=P+F;x===!0?u.push(U,U+1,B):u.push(U+1,U,B),A+=3}c.addGroup(m,A,x===!0?1:2),m+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Mn extends Bt{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Mn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ls extends qe{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),u(),this.setAttribute("position",new Ne(r,3)),this.setAttribute("normal",new Ne(r.slice(),3)),this.setAttribute("uv",new Ne(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new b,x=new b,E=new b;for(let T=0;T<t.length;T+=3)f(t[T+0],y),f(t[T+1],x),f(t[T+2],E),l(y,x,E,v)}function l(v,y,x,E){const T=E+1,w=[];for(let A=0;A<=T;A++){w[A]=[];const S=v.clone().lerp(x,A/T),M=y.clone().lerp(x,A/T),P=T-A;for(let F=0;F<=P;F++)F===0&&A===T?w[A][F]=S:w[A][F]=S.clone().lerp(M,F/P)}for(let A=0;A<T;A++)for(let S=0;S<2*(T-A)-1;S++){const M=Math.floor(S/2);S%2===0?(d(w[A][M+1]),d(w[A+1][M]),d(w[A][M])):(d(w[A][M+1]),d(w[A+1][M+1]),d(w[A+1][M]))}}function c(v){const y=new b;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(v),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function u(){const v=new b;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const x=g(v)/2/Math.PI+.5,E=m(v)/Math.PI+.5;o.push(x,1-E)}p(),h()}function h(){for(let v=0;v<o.length;v+=6){const y=o[v+0],x=o[v+2],E=o[v+4],T=Math.max(y,x,E),w=Math.min(y,x,E);T>.9&&w<.1&&(y<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),E<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,y){const x=v*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function p(){const v=new b,y=new b,x=new b,E=new b,T=new ne,w=new ne,A=new ne;for(let S=0,M=0;S<r.length;S+=9,M+=6){v.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),T.set(o[M+0],o[M+1]),w.set(o[M+2],o[M+3]),A.set(o[M+4],o[M+5]),E.copy(v).add(y).add(x).divideScalar(3);const P=g(E);_(T,M+0,v,P),_(w,M+2,y,P),_(A,M+4,x,P)}}function _(v,y,x,E){E<0&&v.x===1&&(o[y]=v.x-1),x.x===0&&x.z===0&&(o[y]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.vertices,e.indices,e.radius,e.details)}}class ea extends ls{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ea(e.radius,e.detail)}}const Oa=new b,Fa=new b,fu=new b,Ba=new En;class cg extends qe{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(Gs*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:g,c:m}=Ba;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Ba.getNormal(fu),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const y=(v+1)%3,x=h[v],E=h[y],T=Ba[u[v]],w=Ba[u[y]],A=`${x}_${E}`,S=`${E}_${x}`;S in d&&d[S]?(fu.dot(d[S].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(w.x,w.y,w.z)),d[S]=null):A in d||(d[A]={index0:c[v],index1:c[y],normal:fu.clone()})}}for(const p in d)if(d[p]){const{index0:_,index1:g}=d[p];Oa.fromBufferAttribute(a,_),Fa.fromBufferAttribute(a,g),f.push(Oa.x,Oa.y,Oa.z),f.push(Fa.x,Fa.y,Fa.z)}this.setAttribute("position",new Ne(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ws extends Go{constructor(e){super(e),this.uuid=Ln(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Go().fromJSON(i))}return this}}const ow={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=ug(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,u,h,d,f;if(n&&(r=hw(s,e,r,t)),s.length>80*t){a=c=s[0],l=u=s[1];for(let p=t;p<i;p+=t)h=s[p],d=s[p+1],h<a&&(a=h),d<l&&(l=d),h>c&&(c=h),d>u&&(u=d);f=Math.max(c-a,u-l),f=f!==0?32767/f:0}return Wo(r,o,t,a,l,f,0),o}};function ug(s,e,t,n,i){let r,o;if(i===Sw(s,e,t,n)>0)for(r=e;r<t;r+=n)o=Ef(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=Ef(r,s[r],s[r+1],o);return o&&Sc(o,o.next)&&(qo(o),o=o.next),o}function Ks(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Sc(t,t.next)||Ot(t.prev,t,t.next)===0)){if(qo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Wo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&gw(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?lw(s,n,i,r):aw(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),qo(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=cw(Ks(s),e,t),Wo(s,e,t,n,i,r,2)):o===2&&uw(s,e,t,n,i,r):Wo(Ks(s),e,t,n,i,r,1);break}}}function aw(s){const e=s.prev,t=s,n=s.next;if(Ot(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=i<r?i<o?i:o:r<o?r:o,h=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=d&&p.y>=h&&p.y<=f&&Lr(i,a,r,l,o,c,p.x,p.y)&&Ot(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function lw(s,e,t,n){const i=s.prev,r=s,o=s.next;if(Ot(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,u=i.y,h=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,p=u<h?u<d?u:d:h<d?h:d,_=a>l?a>c?a:c:l>c?l:c,g=u>h?u>d?u:d:h>d?h:d,m=Zu(f,p,e,t,n),v=Zu(_,g,e,t,n);let y=s.prevZ,x=s.nextZ;for(;y&&y.z>=m&&x&&x.z<=v;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Lr(a,u,l,h,c,d,y.x,y.y)&&Ot(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Lr(a,u,l,h,c,d,x.x,x.y)&&Ot(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Lr(a,u,l,h,c,d,y.x,y.y)&&Ot(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=v;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Lr(a,u,l,h,c,d,x.x,x.y)&&Ot(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function cw(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!Sc(i,r)&&hg(i,n,n.next,r)&&Xo(i,r)&&Xo(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),qo(n),qo(n.next),n=s=r),n=n.next}while(n!==s);return Ks(n)}function uw(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&xw(o,a)){let l=dg(o,a);o=Ks(o,o.next),l=Ks(l,l.next),Wo(o,e,t,n,i,r,0),Wo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function hw(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=ug(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(vw(c));for(i.sort(dw),r=0;r<i.length;r++)t=fw(i[r],t);return t}function dw(s,e){return s.x-e.x}function fw(s,e){const t=pw(s,e);if(!t)return e;const n=dg(t,s);return Ks(n,n.next),Ks(t,t.next)}function pw(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,h;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&Lr(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),Xo(t,s)&&(h<u||h===u&&(t.x>i.x||t.x===i.x&&mw(i,t)))&&(i=t,u=h)),t=t.next;while(t!==a);return i}function mw(s,e){return Ot(s.prev,s,e.prev)<0&&Ot(e.next,s,s.next)<0}function gw(s,e,t,n){let i=s;do i.z===0&&(i.z=Zu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,_w(i)}function _w(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function Zu(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function vw(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Lr(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function xw(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!yw(s,e)&&(Xo(s,e)&&Xo(e,s)&&Mw(s,e)&&(Ot(s.prev,s,e.prev)||Ot(s,e.prev,e))||Sc(s,e)&&Ot(s.prev,s,s.next)>0&&Ot(e.prev,e,e.next)>0)}function Ot(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Sc(s,e){return s.x===e.x&&s.y===e.y}function hg(s,e,t,n){const i=za(Ot(s,e,t)),r=za(Ot(s,e,n)),o=za(Ot(t,n,s)),a=za(Ot(t,n,e));return!!(i!==r&&o!==a||i===0&&ka(s,t,e)||r===0&&ka(s,n,e)||o===0&&ka(t,s,n)||a===0&&ka(t,e,n))}function ka(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function za(s){return s>0?1:s<0?-1:0}function yw(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&hg(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Xo(s,e){return Ot(s.prev,s,s.next)<0?Ot(s,e,s.next)>=0&&Ot(s,s.prev,e)>=0:Ot(s,e,s.prev)<0||Ot(s,s.next,e)<0}function Mw(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function dg(s,e){const t=new $u(s.i,s.x,s.y),n=new $u(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ef(s,e,t,n){const i=new $u(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function qo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function $u(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Sw(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class hi{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return hi.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];Rf(e),Cf(n,e);let o=e.length;t.forEach(Rf);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Cf(n,t[l]);const a=ow.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Rf(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Cf(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class wc extends qe{constructor(e=new Ws([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Ne(i,3)),this.setAttribute("uv",new Ne(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:ww;let y,x=!1,E,T,w,A;m&&(y=m.getSpacedPoints(u),x=!0,d=!1,E=m.computeFrenetFrames(u,!1),T=new b,w=new b,A=new b),d||(g=0,f=0,p=0,_=0);const S=a.extractPoints(c);let M=S.shape;const P=S.holes;if(!hi.isClockWise(M)){M=M.reverse();for(let le=0,_e=P.length;le<_e;le++){const D=P[le];hi.isClockWise(D)&&(P[le]=D.reverse())}}const B=hi.triangulateShape(M,P),U=M;for(let le=0,_e=P.length;le<_e;le++){const D=P[le];M=M.concat(D)}function z(le,_e,D){return _e||console.error("THREE.ExtrudeGeometry: vec does not exist"),le.clone().addScaledVector(_e,D)}const k=M.length,j=B.length;function W(le,_e,D){let ze,fe,Ue;const xe=le.x-_e.x,$e=le.y-_e.y,Pe=D.x-le.x,I=D.y-le.y,R=xe*xe+$e*$e,q=xe*I-$e*Pe;if(Math.abs(q)>Number.EPSILON){const ee=Math.sqrt(R),re=Math.sqrt(Pe*Pe+I*I),V=_e.x-$e/ee,de=_e.y+xe/ee,ce=D.x-I/re,Ee=D.y+Pe/re,te=((ce-V)*I-(Ee-de)*Pe)/(xe*I-$e*Pe);ze=V+xe*te-le.x,fe=de+$e*te-le.y;const J=ze*ze+fe*fe;if(J<=2)return new ne(ze,fe);Ue=Math.sqrt(J/2)}else{let ee=!1;xe>Number.EPSILON?Pe>Number.EPSILON&&(ee=!0):xe<-Number.EPSILON?Pe<-Number.EPSILON&&(ee=!0):Math.sign($e)===Math.sign(I)&&(ee=!0),ee?(ze=-$e,fe=xe,Ue=Math.sqrt(R)):(ze=xe,fe=$e,Ue=Math.sqrt(R/2))}return new ne(ze/Ue,fe/Ue)}const ae=[];for(let le=0,_e=U.length,D=_e-1,ze=le+1;le<_e;le++,D++,ze++)D===_e&&(D=0),ze===_e&&(ze=0),ae[le]=W(U[le],U[D],U[ze]);const oe=[];let be,Xe=ae.concat();for(let le=0,_e=P.length;le<_e;le++){const D=P[le];be=[];for(let ze=0,fe=D.length,Ue=fe-1,xe=ze+1;ze<fe;ze++,Ue++,xe++)Ue===fe&&(Ue=0),xe===fe&&(xe=0),be[ze]=W(D[ze],D[Ue],D[xe]);oe.push(be),Xe=Xe.concat(be)}for(let le=0;le<g;le++){const _e=le/g,D=f*Math.cos(_e*Math.PI/2),ze=p*Math.sin(_e*Math.PI/2)+_;for(let fe=0,Ue=U.length;fe<Ue;fe++){const xe=z(U[fe],ae[fe],ze);me(xe.x,xe.y,-D)}for(let fe=0,Ue=P.length;fe<Ue;fe++){const xe=P[fe];be=oe[fe];for(let $e=0,Pe=xe.length;$e<Pe;$e++){const I=z(xe[$e],be[$e],ze);me(I.x,I.y,-D)}}}const We=p+_;for(let le=0;le<k;le++){const _e=d?z(M[le],Xe[le],We):M[le];x?(w.copy(E.normals[0]).multiplyScalar(_e.x),T.copy(E.binormals[0]).multiplyScalar(_e.y),A.copy(y[0]).add(w).add(T),me(A.x,A.y,A.z)):me(_e.x,_e.y,0)}for(let le=1;le<=u;le++)for(let _e=0;_e<k;_e++){const D=d?z(M[_e],Xe[_e],We):M[_e];x?(w.copy(E.normals[le]).multiplyScalar(D.x),T.copy(E.binormals[le]).multiplyScalar(D.y),A.copy(y[le]).add(w).add(T),me(A.x,A.y,A.z)):me(D.x,D.y,h/u*le)}for(let le=g-1;le>=0;le--){const _e=le/g,D=f*Math.cos(_e*Math.PI/2),ze=p*Math.sin(_e*Math.PI/2)+_;for(let fe=0,Ue=U.length;fe<Ue;fe++){const xe=z(U[fe],ae[fe],ze);me(xe.x,xe.y,h+D)}for(let fe=0,Ue=P.length;fe<Ue;fe++){const xe=P[fe];be=oe[fe];for(let $e=0,Pe=xe.length;$e<Pe;$e++){const I=z(xe[$e],be[$e],ze);x?me(I.x,I.y+y[u-1].y,y[u-1].x+D):me(I.x,I.y,h+D)}}}$(),pe();function $(){const le=i.length/3;if(d){let _e=0,D=k*_e;for(let ze=0;ze<j;ze++){const fe=B[ze];Oe(fe[2]+D,fe[1]+D,fe[0]+D)}_e=u+g*2,D=k*_e;for(let ze=0;ze<j;ze++){const fe=B[ze];Oe(fe[0]+D,fe[1]+D,fe[2]+D)}}else{for(let _e=0;_e<j;_e++){const D=B[_e];Oe(D[2],D[1],D[0])}for(let _e=0;_e<j;_e++){const D=B[_e];Oe(D[0]+k*u,D[1]+k*u,D[2]+k*u)}}n.addGroup(le,i.length/3-le,0)}function pe(){const le=i.length/3;let _e=0;Le(U,_e),_e+=U.length;for(let D=0,ze=P.length;D<ze;D++){const fe=P[D];Le(fe,_e),_e+=fe.length}n.addGroup(le,i.length/3-le,1)}function Le(le,_e){let D=le.length;for(;--D>=0;){const ze=D;let fe=D-1;fe<0&&(fe=le.length-1);for(let Ue=0,xe=u+g*2;Ue<xe;Ue++){const $e=k*Ue,Pe=k*(Ue+1),I=_e+ze+$e,R=_e+fe+$e,q=_e+fe+Pe,ee=_e+ze+Pe;Ke(I,R,q,ee)}}}function me(le,_e,D){l.push(le),l.push(_e),l.push(D)}function Oe(le,_e,D){je(le),je(_e),je(D);const ze=i.length/3,fe=v.generateTopUV(n,i,ze-3,ze-2,ze-1);it(fe[0]),it(fe[1]),it(fe[2])}function Ke(le,_e,D,ze){je(le),je(_e),je(ze),je(_e),je(D),je(ze);const fe=i.length/3,Ue=v.generateSideWallUV(n,i,fe-6,fe-3,fe-2,fe-1);it(Ue[0]),it(Ue[1]),it(Ue[3]),it(Ue[1]),it(Ue[2]),it(Ue[3])}function je(le){i.push(l[le*3+0]),i.push(l[le*3+1]),i.push(l[le*3+2])}function it(le){r.push(le.x),r.push(le.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return bw(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Xl[i.type]().fromJSON(i)),new wc(n,e.options)}}const ww={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new ne(r,o),new ne(a,l),new ne(c,u)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new ne(o,1-l),new ne(c,1-h),new ne(d,1-p),new ne(_,1-m)]:[new ne(a,1-l),new ne(u,1-h),new ne(f,1-p),new ne(g,1-m)]}};function bw(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ni extends ls{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ni(e.radius,e.detail)}}class zn extends ls{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new zn(e.radius,e.detail)}}class ss extends qe{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],u=[];let h=e;const d=(t-e)/i,f=new b,p=new ne;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=r+g/n*o;f.x=h*Math.cos(m),f.y=h*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,u.push(p.x,p.y)}h+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const v=m+g,y=v,x=v+n+1,E=v+n+2,T=v+1;a.push(y,x,T),a.push(x,E,T)}}this.setIndex(a),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class bc extends qe{constructor(e=new Ws([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ne(i,3)),this.setAttribute("normal",new Ne(r,3)),this.setAttribute("uv",new Ne(o,2));function c(u){const h=i.length/3,d=u.extractPoints(t);let f=d.shape;const p=d.holes;hi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];hi.isClockWise(v)===!0&&(p[g]=v.reverse())}const _=hi.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){const v=f[g];i.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){const v=_[g],y=v[0]+h,x=v[1]+h,E=v[2]+h;n.push(y,x,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Tw(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const o=t[e.shapes[i]];n.push(o)}return new bc(n,e.curveSegments)}}function Tw(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class tn extends qe{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new b,d=new b,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],y=m/n;let x=0;m===0&&o===0?x=.5/t:m===n&&l===Math.PI&&(x=-.5/t);for(let E=0;E<=t;E++){const T=E/t;h.x=-e*Math.cos(i+T*r)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(i+T*r)*Math.sin(o+y*a),p.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(T+x,1-y),v.push(c++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const y=u[m][v+1],x=u[m][v],E=u[m+1][v],T=u[m+1][v+1];(m!==0||o>0)&&f.push(y,x,T),(m!==n-1||l<Math.PI)&&f.push(x,E,T)}this.setIndex(f),this.setAttribute("position",new Ne(p,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Tc extends ls{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Tc(e.radius,e.detail)}}class Oi extends qe{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],u=new b,h=new b,d=new b;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const _=p/i*r,g=f/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const _=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,v=(i+1)*f+p;o.push(_,g,v),o.push(g,m,v)}this.setIndex(o),this.setAttribute("position",new Ne(a,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ac extends qe{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],u=[],h=new b,d=new b,f=new b,p=new b,_=new b,g=new b,m=new b;for(let y=0;y<=n;++y){const x=y/n*r*Math.PI*2;v(x,r,o,e,f),v(x+.01,r,o,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let E=0;E<=i;++E){const T=E/i*Math.PI*2,w=-t*Math.cos(T),A=t*Math.sin(T);h.x=f.x+(w*m.x+A*_.x),h.y=f.y+(w*m.y+A*_.y),h.z=f.z+(w*m.z+A*_.z),l.push(h.x,h.y,h.z),d.subVectors(h,f).normalize(),c.push(d.x,d.y,d.z),u.push(y/n),u.push(E/i)}}for(let y=1;y<=n;y++)for(let x=1;x<=i;x++){const E=(i+1)*(y-1)+(x-1),T=(i+1)*y+(x-1),w=(i+1)*y+x,A=(i+1)*(y-1)+x;a.push(E,T,A),a.push(T,w,A)}this.setIndex(a),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(u,2));function v(y,x,E,T,w){const A=Math.cos(y),S=Math.sin(y),M=E/x*y,P=Math.cos(M);w.x=T*(2+P)*.5*A,w.y=T*(2+P)*S*.5,w.z=T*Math.sin(M)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ac(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class Js extends qe{constructor(e=new qh(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,l=new b,c=new ne;let u=new b;const h=[],d=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(d,3)),this.setAttribute("uv",new Ne(f,2));function _(){for(let y=0;y<t;y++)g(y);g(r===!1?t:0),v(),m()}function g(y){u=e.getPointAt(y/t,u);const x=o.normals[y],E=o.binormals[y];for(let T=0;T<=i;T++){const w=T/i*Math.PI*2,A=Math.sin(w),S=-Math.cos(w);l.x=S*x.x+A*E.x,l.y=S*x.y+A*E.y,l.z=S*x.z+A*E.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function m(){for(let y=1;y<=t;y++)for(let x=1;x<=i;x++){const E=(i+1)*(y-1)+(x-1),T=(i+1)*y+(x-1),w=(i+1)*y+x,A=(i+1)*(y-1)+x;p.push(E,T,A),p.push(T,w,A)}}function v(){for(let y=0;y<=t;y++)for(let x=0;x<=i;x++)c.x=y/t,c.y=x/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Js(new Xl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class fg extends qe{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new b,r=new b;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],d=h.start,f=h.count;for(let p=d,_=d+f;p<_;p+=3)for(let g=0;g<3;g++){const m=a.getX(p+g),v=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),r.fromBufferAttribute(o,v),Pf(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,h=3*a+(c+1)%3;i.fromBufferAttribute(o,u),r.fromBufferAttribute(o,h),Pf(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Ne(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Pf(s,e,t){const n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var If=Object.freeze({__proto__:null,BoxGeometry:Pt,CapsuleGeometry:Mc,CircleGeometry:is,ConeGeometry:Mn,CylinderGeometry:Bt,DodecahedronGeometry:ea,EdgesGeometry:cg,ExtrudeGeometry:wc,IcosahedronGeometry:Ni,LatheGeometry:Qo,OctahedronGeometry:zn,PlaneGeometry:_i,PolyhedronGeometry:ls,RingGeometry:ss,ShapeGeometry:bc,SphereGeometry:tn,TetrahedronGeometry:Tc,TorusGeometry:Oi,TorusKnotGeometry:Ac,TubeGeometry:Js,WireframeGeometry:fg});class pg extends Kt{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new X(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class jh extends Mt{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class ta extends Kt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hn extends ta{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new X(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new X(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new X(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class mg extends Kt{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new X(16777215),this.specular=new X(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zh extends Kt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new X(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class gg extends Kt{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class $h extends Kt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _g extends Kt{static get type(){return"MeshMatcapMaterial"}constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new X(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Di,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class vg extends Yt{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Bs(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function xg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function yg(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ku(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function Kh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function Aw(s,e,t,n,i=30){const r=s.clone();r.name=e;const o=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],u=c.getValueSize(),h=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<t||p>=n)){h.push(c.times[f]);for(let _=0;_<u;++_)d.push(c.values[f*u+_])}}h.length!==0&&(c.times=Bs(h,c.times.constructor),c.values=Bs(d,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function Ew(s,e=0,t=s,n=30){n<=0&&(n=30);const i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){const a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=a.times.length-1;let _;if(r<=a.times[0]){const m=u,v=h-u;_=a.values.slice(m,v)}else if(r>=a.times[p]){const m=p*h+u,v=m+h-u;_=a.values.slice(m,v)}else{const m=a.createInterpolant(),v=u,y=h-u;m.evaluate(r),_=m.resultBuffer.slice(v,y)}l==="quaternion"&&new Qe().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let m=0;m<g;++m){const v=m*f+d;if(l==="quaternion")Qe.multiplyQuaternionsFlat(c.values,v,_,0,c.values,v);else{const y=f-d*2;for(let x=0;x<y;++x)c.values[v+x]-=_[x]}}}return s.blendMode=Eh,s}const Rw={convertArray:Bs,isTypedArray:xg,getKeyframeOrder:yg,sortedArray:Ku,flattenJSON:Kh,subclip:Aw,makeClipAdditive:Ew};class Zr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Mg extends Zr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ns,endingEnd:Ns}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Os:r=e,a=2*t-n;break;case Bo:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Os:o=e,l=2*n-t;break;case Bo:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,v=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,y=(-1-f)*g+(1.5+f)*_+.5*p,x=f*g-f*_;for(let E=0;E!==a;++E)r[E]=m*o[u+E]+v*o[c+E]+y*o[l+E]+x*o[h+E];return r}}class Jh extends Zr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*h+o[l+d]*u;return r}}class Sg extends Zr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ei{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Bs(t,this.TimeBufferType),this.values=Bs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Bs(e.times,Array),values:Bs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Br:t=this.InterpolantFactoryMethodDiscrete;break;case kr:t=this.InterpolantFactoryMethodLinear;break;case nl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Br;case this.InterpolantFactoryMethodLinear:return kr;case this.InterpolantFactoryMethodSmooth:return nl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&xg(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===nl,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,d=h-n,f=h+n;for(let p=0;p!==n;++p){const _=t[h+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ei.prototype.TimeBufferType=Float32Array;ei.prototype.ValueBufferType=Float32Array;ei.prototype.DefaultInterpolation=kr;class nr extends ei{constructor(e,t,n){super(e,t,n)}}nr.prototype.ValueTypeName="bool";nr.prototype.ValueBufferType=Array;nr.prototype.DefaultInterpolation=Br;nr.prototype.InterpolantFactoryMethodLinear=void 0;nr.prototype.InterpolantFactoryMethodSmooth=void 0;class Qh extends ei{}Qh.prototype.ValueTypeName="color";class Qs extends ei{}Qs.prototype.ValueTypeName="number";class wg extends Zr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Qe.slerpFlat(r,0,o,c-a,o,c,l);return r}}class rs extends ei{InterpolantFactoryMethodLinear(e){return new wg(this.times,this.values,this.getValueSize(),e)}}rs.prototype.ValueTypeName="quaternion";rs.prototype.InterpolantFactoryMethodSmooth=void 0;class ir extends ei{constructor(e,t,n){super(e,t,n)}}ir.prototype.ValueTypeName="string";ir.prototype.ValueBufferType=Array;ir.prototype.DefaultInterpolation=Br;ir.prototype.InterpolantFactoryMethodLinear=void 0;ir.prototype.InterpolantFactoryMethodSmooth=void 0;class os extends ei{}os.prototype.ValueTypeName="vector";class er{constructor(e="",t=-1,n=[],i=cc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ln(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Pw(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ei.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=yg(l);l=Ku(l,1,u),c=Ku(c,1,u),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Qs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,p,_){if(f.length!==0){const g=[],m=[];Kh(f,g,m,p),g.length!==0&&_.push(new h(d,g,m))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let v=0;v!==d[p].morphTargets.length;++v){const y=d[p];g.push(y.time),m.push(y.morphTarget===_?1:0)}i.push(new Qs(".morphTargetInfluence["+_+"]",g,m))}l=f.length*o}else{const f=".bones["+t[h].name+"]";n(os,f+".position",d,"pos",i),n(rs,f+".quaternion",d,"rot",i),n(os,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Cw(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qs;case"vector":case"vector2":case"vector3":case"vector4":return os;case"color":return Qh;case"quaternion":return rs;case"bool":case"boolean":return nr;case"string":return ir}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Pw(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Cw(s.type);if(s.times===void 0){const t=[],n=[];Kh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Ci={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class ed{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],p=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null}}}const bg=new ed;class bn{constructor(e){this.manager=e!==void 0?e:bg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}bn.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ti={};class Iw extends Error{constructor(e,t){super(e),this.response=t}}class Jn extends bn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ci.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ti[e]!==void 0){Ti[e].push({onLoad:t,onProgress:n,onError:i});return}Ti[e]=[],Ti[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ti[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){h.read().then(({done:y,value:x})=>{if(y)m.close();else{_+=x.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let T=0,w=u.length;T<w;T++){const A=u[T];A.onProgress&&A.onProgress(E)}m.enqueue(x),v()}},y=>{m.error(y)})}}});return new Response(g)}else throw new Iw(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Ci.add(e,c);const u=Ti[e];delete Ti[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Ti[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ti[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Lw extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Jn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=er.parse(e[n]);t.push(i)}return t}}class Uw extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=[],a=new xc,l=new Jn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function u(h){l.load(e[h],function(d){const f=r.parse(d,!0);o[h]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=Ft),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let h=0,d=e.length;h<d;++h)u(h);else l.load(e,function(h){const d=r.parse(h,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)o[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+_]),o[p].format=d.format,o[p].width=d.width,o[p].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=Ft),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}}class Gr extends bn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ci.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Vo("img");function l(){u(),Ci.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Dw extends bn{constructor(e){super(e)}load(e,t,n,i){const r=new $o;r.colorSpace=Ht;const o=new Gr(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(u){r.images[c]=u,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class Nw extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new kn,a=new Jn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(u){if(i!==void 0)i(u);else{console.error(u);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:In,o.wrapT=c.wrapT!==void 0?c.wrapT:In,o.magFilter=c.magFilter!==void 0?c.magFilter:Ft,o.minFilter=c.minFilter!==void 0?c.minFilter:Ft,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Bn),c.mipmapCount===1&&(o.minFilter=Ft),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class Tg extends bn{constructor(e){super(e)}load(e,t,n,i){const r=new Ut,o=new Gr(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class cs extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new X(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class td extends cs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new X(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const pu=new ke,Lf=new b,Uf=new b;class nd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ko,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Lf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Lf),Uf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Uf),t.updateMatrixWorld(),pu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(pu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ow extends nd{constructor(){super(new Zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=zr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class id extends cs{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ow}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Df=new ke,po=new b,mu=new b;class Fw extends nd{constructor(){super(new Zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),po.setFromMatrixPosition(e.matrixWorld),n.position.copy(po),mu.copy(n.position),mu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(mu),n.updateMatrixWorld(),i.makeTranslation(-po.x,-po.y,-po.z),Df.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Df)}}class Xs extends cs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Fw}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Bw extends nd{constructor(){super(new Yr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ec extends cs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new Bw}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ag extends cs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Eg extends cs{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class Rg{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new b)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}class Cg extends cs{constructor(e=new Rg,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class Rc extends bn{constructor(e){super(e),this.textures={}}load(e,t,n,i){const r=this,o=new Jn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(r){return t[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),t[r]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new X().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const r in e.uniforms){const o=e.uniforms[r];switch(i.uniforms[r]={},o.type){case"t":i.uniforms[r].value=n(o.value);break;case"c":i.uniforms[r].value=new X().setHex(o.value);break;case"v2":i.uniforms[r].value=new ne().fromArray(o.value);break;case"v3":i.uniforms[r].value=new b().fromArray(o.value);break;case"v4":i.uniforms[r].value=new xt().fromArray(o.value);break;case"m3":i.uniforms[r].value=new et().fromArray(o.value);break;case"m4":i.uniforms[r].value=new ke().fromArray(o.value);break;default:i.uniforms[r].value=o.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)i.extensions[r]=e.extensions[r];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new ne().fromArray(r)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return Rc.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:pg,SpriteMaterial:kh,RawShaderMaterial:jh,ShaderMaterial:Mt,PointsMaterial:vc,MeshPhysicalMaterial:Hn,MeshStandardMaterial:ta,MeshPhongMaterial:mg,MeshToonMaterial:Zh,MeshNormalMaterial:gg,MeshLambertMaterial:$h,MeshDepthMaterial:pc,MeshDistanceMaterial:Fh,MeshBasicMaterial:bt,MeshMatcapMaterial:_g,LineDashedMaterial:vg,LineBasicMaterial:Yt,Material:Kt};return new t[e]}}class Ji{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Pg extends qe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Ig extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Jn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];const g=f.interleavedBuffers[p],m=r(f,g.buffer),v=Pr(g.type,m),y=new tr(v,g.stride);return y.uuid=g.uuid,t[p]=y,y}function r(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const o=e.isInstancedBufferGeometry?new Pg:new qe,a=e.data.index;if(a!==void 0){const f=Pr(a.type,a.array);o.setIndex(new Je(f,1))}const l=e.data.attributes;for(const f in l){const p=l[f];let _;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);_=new pi(g,p.itemSize,p.offset,p.normalized)}else{const g=Pr(p.type,p.array),m=p.isInstancedBufferAttribute?ns:Je;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),o.setAttribute(f,_)}const c=e.data.morphAttributes;if(c)for(const f in c){const p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){const v=p[g];let y;if(v.isInterleavedBufferAttribute){const x=i(e.data,v.data);y=new pi(x,v.itemSize,v.offset,v.normalized)}else{const x=Pr(v.type,v.array);y=new Je(x,v.itemSize,v.normalized)}v.name!==void 0&&(y.name=v.name),_.push(y)}o.morphAttributes[f]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const h=e.data.groups||e.data.drawcalls||e.data.offsets;if(h!==void 0)for(let f=0,p=h.length;f!==p;++f){const _=h[f];o.addGroup(_.start,_.count,_.materialIndex)}const d=e.data.boundingSphere;if(d!==void 0){const f=new b;d.center!==void 0&&f.fromArray(d.center),o.boundingSphere=new hn(f,d.radius)}return e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}class kw extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=this.path===""?Ji.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const a=new Jn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(h){i!==void 0&&i(h),console.error("THREE:ObjectLoader: Can't parse "+e+".",h.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?Ji.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const r=new Jn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);const o=await r.loadAsync(e,t),a=JSON.parse(o),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let h=!1;for(const d in o)if(o[d].data instanceof HTMLImageElement){h=!0;break}h===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,i,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const r=new Ws().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=new as().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new Ig;for(let r=0,o=e.length;r<o;r++){let a;const l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in If?a=If[l.type].fromJSON(l,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const r=new Rc;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){const l=e[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],r=er.parse(i);t[r.uuid]=r}return t}parseImages(e,t){const n=this,i={};let r;function o(l){return n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(u)}else return l.data?{data:Pr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new ed(t);r=new Gr(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const h=e[c],d=h.url;if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new kn(m.data,m.width,m.height)))}i[h.uuid]=new Fs(f)}else{const f=a(h.url);i[h.uuid]=new Fs(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function r(o){if(typeof o=="string"){const a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:Pr(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new Gr(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){const l=e[o],c=l.url;if(Array.isArray(c)){const u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h],p=await r(f);p!==null&&(p instanceof HTMLImageElement?u.push(p):u.push(new kn(p.data,p.width,p.height)))}n[l.uuid]=new Fs(u)}else{const u=await r(l.url);n[l.uuid]=new Fs(u)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}const i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=e[r];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=t[a.image],c=l.data;let u;Array.isArray(c)?(u=new $o,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new kn:u=new Ut,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=a.uuid,a.name!==void 0&&(u.name=a.name),a.mapping!==void 0&&(u.mapping=n(a.mapping,zw)),a.channel!==void 0&&(u.channel=a.channel),a.offset!==void 0&&u.offset.fromArray(a.offset),a.repeat!==void 0&&u.repeat.fromArray(a.repeat),a.center!==void 0&&u.center.fromArray(a.center),a.rotation!==void 0&&(u.rotation=a.rotation),a.wrap!==void 0&&(u.wrapS=n(a.wrap[0],Nf),u.wrapT=n(a.wrap[1],Nf)),a.format!==void 0&&(u.format=a.format),a.internalFormat!==void 0&&(u.internalFormat=a.internalFormat),a.type!==void 0&&(u.type=a.type),a.colorSpace!==void 0&&(u.colorSpace=a.colorSpace),a.minFilter!==void 0&&(u.minFilter=n(a.minFilter,Of)),a.magFilter!==void 0&&(u.magFilter=n(a.magFilter,Of)),a.anisotropy!==void 0&&(u.anisotropy=a.anisotropy),a.flipY!==void 0&&(u.flipY=a.flipY),a.generateMipmaps!==void 0&&(u.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(u.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(u.compareFunction=a.compareFunction),a.userData!==void 0&&(u.userData=a.userData),i[a.uuid]=u}return i}parseObject(e,t,n,i,r){let o;function a(d){return t[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let u,h;switch(e.type){case"Scene":o=new Bh,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new X(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new Jo(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new mc(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new Zt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new Yr(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new Ag(e.color,e.intensity);break;case"DirectionalLight":o=new Ec(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new Xs(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Eg(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new id(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new td(e.color,e.groundColor,e.intensity);break;case"LightProbe":o=new Cg().fromJSON(e);break;case"SkinnedMesh":u=a(e.geometry),h=l(e.material),o=new gc(u,h),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":u=a(e.geometry),h=l(e.material),o=new Ie(u,h);break;case"InstancedMesh":u=a(e.geometry),h=l(e.material);const d=e.count,f=e.instanceMatrix,p=e.instanceColor;o=new Xt(u,h,d),o.instanceMatrix=new ns(new Float32Array(f.array),16),p!==void 0&&(o.instanceColor=new ns(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":u=a(e.geometry),h=l(e.material),o=new sg(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,h),o.geometry=u,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._visibility=e.visibility,o._active=e.active,o._bounds=e.bounds.map(_=>{const g=new un;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);const m=new hn;return m.radius=_.sphereRadius,m.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:m}}),o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._geometryCount=e.geometryCount,o._matricesTexture=c(e.matricesTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=c(e.colorsTexture.uuid));break;case"LOD":o=new ig;break;case"Line":o=new mi(a(e.geometry),l(e.material));break;case"LineLoop":o=new zh(a(e.geometry),l(e.material));break;case"LineSegments":o=new wn(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new Hr(a(e.geometry),l(e.material));break;case"Sprite":o=new ng(l(e.material));break;case"Group":o=new Ge;break;case"Bone":o=new _c;break;default:o=new pt}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],t,n,i,r))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const p=d[f];o.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const p=d[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new pt}})}}const zw={UVMapping:tc,CubeReflectionMapping:Li,CubeRefractionMapping:es,EquirectangularReflectionMapping:Oo,EquirectangularRefractionMapping:Fo,CubeUVReflectionMapping:Xr},Nf={RepeatWrapping:ts,ClampToEdgeWrapping:In,MirroredRepeatWrapping:Or},Of={NearestFilter:qt,NearestMipmapNearestFilter:nc,NearestMipmapLinearFilter:Ds,LinearFilter:Ft,LinearMipmapNearestFilter:Ur,LinearMipmapLinearFilter:Bn};class Lg extends bn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ci.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ci.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Ci.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ci.add(e,l),r.manager.itemStart(e)}}let Va;class sd{static getContext(){return Va===void 0&&(Va=new(window.AudioContext||window.webkitAudioContext)),Va}static setContext(e){Va=e}}class Vw extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Jn(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{const c=l.slice(0);sd.getContext().decodeAudioData(c,function(h){t(h)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i?i(l):console.error(l),r.manager.itemError(e)}}}const Ff=new ke,Bf=new ke,xs=new ke;class Hw{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Zt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Zt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,xs.copy(e.projectionMatrix);const i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(Gs*t.fov*.5)/t.zoom;let a,l;Bf.elements[12]=-i,Ff.elements[12]=i,a=-o*t.aspect+r,l=o*t.aspect+r,xs.elements[0]=2*t.near/(l-a),xs.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(xs),a=-o*t.aspect-r,l=o*t.aspect-r,xs.elements[0]=2*t.near/(l-a),xs.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(xs)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Bf),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Ff)}}class rd{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=kf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=kf();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function kf(){return performance.now()}const ys=new b,zf=new Qe,Gw=new b,Ms=new b;class Ww extends pt{constructor(){super(),this.type="AudioListener",this.context=sd.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new rd}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(ys,zf,Gw),Ms.set(0,0,-1).applyQuaternion(zf),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(ys.x,i),t.positionY.linearRampToValueAtTime(ys.y,i),t.positionZ.linearRampToValueAtTime(ys.z,i),t.forwardX.linearRampToValueAtTime(Ms.x,i),t.forwardY.linearRampToValueAtTime(Ms.y,i),t.forwardZ.linearRampToValueAtTime(Ms.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(ys.x,ys.y,ys.z),t.setOrientation(Ms.x,Ms.y,Ms.z,n.x,n.y,n.z)}}class Ug extends pt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const Ss=new b,Vf=new Qe,Xw=new b,ws=new b;class qw extends Ug{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ss,Vf,Xw),ws.set(0,0,1).applyQuaternion(Vf);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Ss.x,n),t.positionY.linearRampToValueAtTime(Ss.y,n),t.positionZ.linearRampToValueAtTime(Ss.z,n),t.orientationX.linearRampToValueAtTime(ws.x,n),t.orientationY.linearRampToValueAtTime(ws.y,n),t.orientationZ.linearRampToValueAtTime(ws.z,n)}else t.setPosition(Ss.x,Ss.y,Ss.z),t.setOrientation(ws.x,ws.y,ws.z)}}class Yw{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class Dg{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Qe.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;Qe.multiplyQuaternionsFlat(e,o,e,t,e,n),Qe.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const od="\\[\\]\\.:\\/",jw=new RegExp("["+od+"]","g"),ad="[^"+od+"]",Zw="[^"+od.replace("\\.","")+"]",$w=/((?:WC+[\/:])*)/.source.replace("WC",ad),Kw=/(WCOD+)?/.source.replace("WCOD",Zw),Jw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ad),Qw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ad),eb=new RegExp("^"+$w+Kw+Jw+Qw+"$"),tb=["material","materials","bones","map"];class nb{constructor(e,t,n){const i=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class yt{constructor(e,t,n){this.path=t,this.parsedPath=n||yt.parseTrackName(t),this.node=yt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new yt.Composite(e,t,n):new yt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(jw,"")}static parseTrackName(e){const t=eb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);tb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=yt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}yt.Composite=nb;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ib{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Ln(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length;let a,l=e.length,c=this.nCachedObjects_;for(let u=0,h=arguments.length;u!==h;++u){const d=arguments[u],f=d.uuid;let p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(d);for(let _=0,g=o;_!==g;++_)r[_].push(new yt(d,n[_],i[_]))}else if(p<c){a=e[p];const _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=d;for(let m=0,v=o;m!==v;++m){const y=r[m],x=y[_];let E=y[p];y[p]=x,E===void 0&&(E=new yt(d,n[m],i[m])),y[_]=E}}else e[p]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const l=arguments[o],c=l.uuid,u=t[c];if(u!==void 0&&u>=r){const h=r++,d=e[h];t[d.uuid]=u,e[u]=d,t[c]=h,e[h]=l;for(let f=0,p=i;f!==p;++f){const _=n[f],g=_[h],m=_[u];_[u]=g,_[h]=m}}}this.nCachedObjects_=r}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],u=c.uuid,h=t[u];if(h!==void 0)if(delete t[u],h<r){const d=--r,f=e[d],p=--o,_=e[p];t[f.uuid]=h,e[h]=f,t[_.uuid]=d,e[d]=_,e.pop();for(let g=0,m=i;g!==m;++g){const v=n[g],y=v[d],x=v[p];v[h]=y,v[d]=x,v.pop()}}else{const d=--o,f=e[d];d>0&&(t[f.uuid]=h),e[h]=f,e.pop();for(let p=0,_=i;p!==_;++p){const g=n[p];g[h]=g[d],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const r=this._bindings;if(i!==void 0)return r[i];const o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,h=new Array(c);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(h);for(let d=u,f=l.length;d!==f;++d){const p=l[d];h[d]=new yt(p,e,t)}return h}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=e[a];t[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}}class Ng{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Ns,endingEnd:Ns};for(let c=0;c!==o;++c){const u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ah,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Eh:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case cc:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===Em;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Th){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Os,i.endingEnd=Os):(e?i.endingStart=this.zeroSlopeAtStart?Os:Ns:i.endingStart=Bo,t?i.endingEnd=this.zeroSlopeAtEnd?Os:Ns:i.endingEnd=Bo)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const sb=new Float32Array(1);class Og extends gi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){const d=i[h],f=d.name;let p=u[f];if(p!==void 0)++p.referenceCount,o[h]=p;else{if(p=o[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;p=new Dg(yt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[h]=p}a[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Jh(new Float32Array(2),new Float32Array(2),1,sb),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?er.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=cc),l!==void 0){const h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const u=new Ng(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?er.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class ld{constructor(e){this.value=e}clone(){return new ld(this.value.clone===void 0?this.value:this.value.clone())}}let rb=0;class ob extends gi{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:rb++}),this.name="",this.usage=ko,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class ab extends tr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class Ju{constructor(e,t,n,i,r){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const Hf=new ke;class Fg{constructor(e,t,n=0,i=1/0){this.ray=new qr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new hc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hf),this}intersectObject(e,t=!0,n=[]){return Qu(e,this,n,t),n.sort(Gf),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Qu(e[i],this,n,t);return n.sort(Gf),n}}function Gf(s,e){return s.distance-e.distance}function Qu(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Qu(r[o],e,t,!0)}}class lb{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Gt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class cb{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}class cd{constructor(e,t,n,i){cd.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}}const Wf=new ne;class ub{constructor(e=new ne(1/0,1/0),t=new ne(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Xf=new b,Ha=new b;class hb{constructor(e=new b,t=new b){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Xf.subVectors(e,this.start),Ha.subVectors(this.end,this.start);const n=Ha.dot(Ha);let r=Ha.dot(Xf)/n;return t&&(r=Gt(r,0,1)),r}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const qf=new b;class db extends pt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new qe,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,u=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new Ne(i,3));const r=new Yt({fog:!1,toneMapped:!1});this.cone=new wn(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),qf.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(qf),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const ji=new b,Ga=new ke,gu=new ke;class fb extends wn{constructor(e){const t=Bg(e),n=new qe,i=[],r=[],o=new X(0,0,1),a=new X(0,1,0);for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new Ne(i,3)),n.setAttribute("color",new Ne(r,3));const l=new Yt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");gu.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){const a=t[r];a.parent&&a.parent.isBone&&(Ga.multiplyMatrices(gu,a.matrixWorld),ji.setFromMatrixPosition(Ga),i.setXYZ(o,ji.x,ji.y,ji.z),Ga.multiplyMatrices(gu,a.parent.matrixWorld),ji.setFromMatrixPosition(Ga),i.setXYZ(o+1,ji.x,ji.y,ji.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function Bg(s){const e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,Bg(s.children[t]));return e}class pb extends Ie{constructor(e,t,n){const i=new tn(t,4,2),r=new bt({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const mb=new b,Yf=new X,jf=new X;class gb extends pt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new zn(t);i.rotateY(Math.PI*.5),this.material=new bt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Je(o,3)),this.add(new Ie(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Yf.copy(this.light.color),jf.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const r=n<i/2?Yf:jf;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(mb.setFromMatrixPosition(this.light.matrixWorld).negate())}}class _b extends wn{constructor(e=10,t=10,n=4473924,i=8947848){n=new X(n),i=new X(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,p=-a;d<=t;d++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);const _=d===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const u=new qe;u.setAttribute("position",new Ne(l,3)),u.setAttribute("color",new Ne(c,3));const h=new Yt({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class vb extends wn{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new X(r),o=new X(o);const a=[],l=[];if(t>1)for(let h=0;h<t;h++){const d=h/t*(Math.PI*2),f=Math.sin(d)*e,p=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,p);const _=h&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let h=0;h<n;h++){const d=h&1?r:o,f=e-e/n*h;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),l.push(d.r,d.g,d.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),l.push(d.r,d.g,d.b)}}const c=new qe;c.setAttribute("position",new Ne(a,3)),c.setAttribute("color",new Ne(l,3));const u=new Yt({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Zf=new b,Wa=new b,$f=new b;class xb extends pt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new qe;i.setAttribute("position",new Ne([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const r=new Yt({fog:!1,toneMapped:!1});this.lightPlane=new mi(i,r),this.add(this.lightPlane),i=new qe,i.setAttribute("position",new Ne([0,0,0,0,0,1],3)),this.targetLine=new mi(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Zf.setFromMatrixPosition(this.light.matrixWorld),Wa.setFromMatrixPosition(this.light.target.matrixWorld),$f.subVectors(Wa,Zf),this.lightPlane.lookAt(Wa),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Wa),this.targetLine.scale.z=$f.length()}}const Xa=new b,zt=new dc;class yb extends wn{constructor(e){const t=new qe,n=new Yt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){i.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}t.setAttribute("position",new Ne(i,3)),t.setAttribute("color",new Ne(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const c=new X(16755200),u=new X(16711680),h=new X(43775),d=new X(16777215),f=new X(3355443);this.setColors(c,u,h,d,f)}setColors(e,t,n,i,r){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;zt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Wt("c",t,e,zt,0,0,-1),Wt("t",t,e,zt,0,0,1),Wt("n1",t,e,zt,-n,-i,-1),Wt("n2",t,e,zt,n,-i,-1),Wt("n3",t,e,zt,-n,i,-1),Wt("n4",t,e,zt,n,i,-1),Wt("f1",t,e,zt,-n,-i,1),Wt("f2",t,e,zt,n,-i,1),Wt("f3",t,e,zt,-n,i,1),Wt("f4",t,e,zt,n,i,1),Wt("u1",t,e,zt,n*.7,i*1.1,-1),Wt("u2",t,e,zt,-n*.7,i*1.1,-1),Wt("u3",t,e,zt,0,i*2,-1),Wt("cf1",t,e,zt,-n,0,1),Wt("cf2",t,e,zt,n,0,1),Wt("cf3",t,e,zt,0,-i,1),Wt("cf4",t,e,zt,0,i,1),Wt("cn1",t,e,zt,-n,0,-1),Wt("cn2",t,e,zt,n,0,-1),Wt("cn3",t,e,zt,0,-i,-1),Wt("cn4",t,e,zt,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Wt(s,e,t,n,i,r,o){Xa.set(i,r,o).unproject(n);const a=e[s];if(a!==void 0){const l=t.getAttribute("position");for(let c=0,u=a.length;c<u;c++)l.setXYZ(a[c],Xa.x,Xa.y,Xa.z)}}const qa=new un;class Mb extends wn{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new qe;r.setIndex(new Je(n,1)),r.setAttribute("position",new Je(i,3)),super(r,new Yt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(e!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&qa.setFromObject(this.object),qa.isEmpty())return;const t=qa.min,n=qa.max,i=this.geometry.attributes.position,r=i.array;r[0]=n.x,r[1]=n.y,r[2]=n.z,r[3]=t.x,r[4]=n.y,r[5]=n.z,r[6]=t.x,r[7]=t.y,r[8]=n.z,r[9]=n.x,r[10]=t.y,r[11]=n.z,r[12]=n.x,r[13]=n.y,r[14]=t.z,r[15]=t.x,r[16]=n.y,r[17]=t.z,r[18]=t.x,r[19]=t.y,r[20]=t.z,r[21]=n.x,r[22]=t.y,r[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Sb extends wn{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new qe;r.setIndex(new Je(n,1)),r.setAttribute("position",new Ne(i,3)),super(r,new Yt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class wb extends mi{constructor(e,t=1,n=16776960){const i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new qe;o.setAttribute("position",new Ne(r,3)),o.computeBoundingSphere(),super(o,new Yt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new qe;l.setAttribute("position",new Ne(a,3)),l.computeBoundingSphere(),this.add(new Ie(l,new bt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Kf=new b;let Ya,_u;class bb extends pt{constructor(e=new b(0,0,1),t=new b(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Ya===void 0&&(Ya=new qe,Ya.setAttribute("position",new Ne([0,0,0,0,1,0],3)),_u=new Bt(0,.5,1,5,1),_u.translate(0,-.5,0)),this.position.copy(t),this.line=new mi(Ya,new Yt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ie(_u,new bt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Kf.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Kf,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class kg extends wn{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new qe;i.setAttribute("position",new Ne(t,3)),i.setAttribute("color",new Ne(n,3));const r=new Yt({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){const i=new X,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Tb{constructor(){this.type="ShapePath",this.color=new X,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Go,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const v=[];for(let y=0,x=m.length;y<x;y++){const E=m[y],T=new Ws;T.curves=E.curves,v.push(T)}return v}function n(m,v){const y=v.length;let x=!1;for(let E=y-1,T=0;T<y;E=T++){let w=v[E],A=v[T],S=A.x-w.x,M=A.y-w.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(w=v[T],S=-S,A=v[E],M=-M),m.y<w.y||m.y>A.y)continue;if(m.y===w.y){if(m.x===w.x)return!0}else{const P=M*(m.x-w.x)-S*(m.y-w.y);if(P===0)return!0;if(P<0)continue;x=!x}}else{if(m.y!==w.y)continue;if(A.x<=m.x&&m.x<=w.x||w.x<=m.x&&m.x<=A.x)return!0}}return x}const i=hi.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,l;const c=[];if(r.length===1)return a=r[0],l=new Ws,l.curves=a.curves,c.push(l),c;let u=!i(r[0].getPoints());u=e?!u:u;const h=[],d=[];let f=[],p=0,_;d[p]=void 0,f[p]=[];for(let m=0,v=r.length;m<v;m++)a=r[m],_=a.getPoints(),o=i(_),o=e?!o:o,o?(!u&&d[p]&&p++,d[p]={s:new Ws,p:_},d[p].s.curves=a.curves,u&&p++,f[p]=[]):f[p].push({h:a,p:_[0]});if(!d[0])return t(r);if(d.length>1){let m=!1,v=0;for(let y=0,x=d.length;y<x;y++)h[y]=[];for(let y=0,x=d.length;y<x;y++){const E=f[y];for(let T=0;T<E.length;T++){const w=E[T];let A=!0;for(let S=0;S<d.length;S++)n(w.p,d[S].p)&&(y!==S&&v++,A?(A=!1,h[S].push(w)):m=!0);A&&h[y].push(w)}}v>0&&m===!1&&(f=h)}let g;for(let m=0,v=d.length;m<v;m++){l=d[m].s,c.push(l),g=f[m];for(let y=0,x=g.length;y<x;y++)l.holes.push(g[y].h)}return c}}class Ab extends gi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class Eb extends cn{constructor(e=1,t=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(e,t,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qi}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qi);const Rb=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:fh,AddEquation:Ki,AddOperation:bm,AdditiveAnimationBlendMode:Eh,AdditiveBlending:Sn,AgXToneMapping:ph,AlphaFormat:xh,AlwaysCompare:Fm,AlwaysDepth:hl,AlwaysStencilFunc:Gu,AmbientLight:Ag,AnimationAction:Ng,AnimationClip:er,AnimationLoader:Lw,AnimationMixer:Og,AnimationObjectGroup:ib,AnimationUtils:Rw,ArcCurve:rg,ArrayCamera:Qm,ArrowHelper:bb,AttachedBindMode:Hu,Audio:Ug,AudioAnalyser:Yw,AudioContext:sd,AudioListener:Ww,AudioLoader:Vw,AxesHelper:kg,BackSide:$t,BasicDepthPacking:Cm,BasicShadowMap:L0,BatchedMesh:sg,Bone:_c,BooleanKeyframeTrack:nr,Box2:ub,Box3:un,Box3Helper:Sb,BoxGeometry:Pt,BoxHelper:Mb,BufferAttribute:Je,BufferGeometry:qe,BufferGeometryLoader:Ig,ByteType:gh,Cache:Ci,Camera:dc,CameraHelper:yb,CanvasTexture:Vh,CapsuleGeometry:Mc,CatmullRomCurve3:Ho,CineonToneMapping:dh,CircleGeometry:is,ClampToEdgeWrapping:In,Clock:rd,Color:X,ColorKeyframeTrack:Qh,ColorManagement:mt,CompressedArrayTexture:KS,CompressedCubeTexture:JS,CompressedTexture:xc,CompressedTextureLoader:Uw,ConeGeometry:Mn,ConstantAlphaFactor:Mm,ConstantColorFactor:xm,Controls:Ab,CubeCamera:Xm,CubeReflectionMapping:Li,CubeRefractionMapping:es,CubeTexture:$o,CubeTextureLoader:Dw,CubeUVReflectionMapping:Xr,CubicBezierCurve:Gh,CubicBezierCurve3:og,CubicInterpolant:Mg,CullFaceBack:ku,CullFaceFront:sm,CullFaceFrontBack:I0,CullFaceNone:im,Curve:Qn,CurvePath:lg,CustomBlending:rm,CustomToneMapping:Tm,CylinderGeometry:Bt,Cylindrical:cb,Data3DTexture:Lh,DataArrayTexture:uc,DataTexture:kn,DataTextureLoader:Nw,DataUtils:V_,DecrementStencilOp:G0,DecrementWrapStencilOp:X0,DefaultLoadingManager:bg,DepthFormat:Hs,DepthStencilFormat:$s,DepthTexture:Oh,DetachedBindMode:Am,DirectionalLight:Ec,DirectionalLightHelper:xb,DiscreteInterpolant:Sg,DodecahedronGeometry:ea,DoubleSide:Nt,DstAlphaFactor:pm,DstColorFactor:gm,DynamicCopyUsage:r_,DynamicDrawUsage:Bm,DynamicReadUsage:n_,EdgesGeometry:cg,EllipseCurve:yc,EqualCompare:Um,EqualDepth:fl,EqualStencilFunc:Z0,EquirectangularReflectionMapping:Oo,EquirectangularRefractionMapping:Fo,Euler:an,EventDispatcher:gi,ExtrudeGeometry:wc,FileLoader:Jn,Float16BufferAttribute:Y_,Float32BufferAttribute:Ne,FloatType:Rn,Fog:Jo,FogExp2:mc,FramebufferTexture:$S,FrontSide:di,Frustum:Ko,GLBufferAttribute:Ju,GLSL1:a_,GLSL3:Wu,GreaterCompare:Dm,GreaterDepth:No,GreaterEqualCompare:Om,GreaterEqualDepth:pl,GreaterEqualStencilFunc:Q0,GreaterStencilFunc:K0,GridHelper:_b,Group:Ge,HalfFloatType:Kn,HemisphereLight:td,HemisphereLightHelper:gb,IcosahedronGeometry:Ni,ImageBitmapLoader:Lg,ImageLoader:Gr,ImageUtils:Vm,IncrementStencilOp:H0,IncrementWrapStencilOp:W0,InstancedBufferAttribute:ns,InstancedBufferGeometry:Pg,InstancedInterleavedBuffer:ab,InstancedMesh:Xt,Int16BufferAttribute:X_,Int32BufferAttribute:q_,Int8BufferAttribute:H_,IntType:ic,InterleavedBuffer:tr,InterleavedBufferAttribute:pi,Interpolant:Zr,InterpolateDiscrete:Br,InterpolateLinear:kr,InterpolateSmooth:nl,InvertStencilOp:q0,KeepStencilOp:Cs,KeyframeTrack:ei,LOD:ig,LatheGeometry:Qo,Layers:hc,LessCompare:Lm,LessDepth:dl,LessEqualCompare:Ph,LessEqualDepth:js,LessEqualStencilFunc:$0,LessStencilFunc:j0,Light:cs,LightProbe:Cg,Line:mi,Line3:hb,LineBasicMaterial:Yt,LineCurve:Wh,LineCurve3:ag,LineDashedMaterial:vg,LineLoop:zh,LineSegments:wn,LinearFilter:Ft,LinearInterpolant:Jh,LinearMipMapLinearFilter:O0,LinearMipMapNearestFilter:N0,LinearMipmapLinearFilter:Bn,LinearMipmapNearestFilter:Ur,LinearSRGBColorSpace:_n,LinearToneMapping:uh,LinearTransfer:Zo,Loader:bn,LoaderUtils:Ji,LoadingManager:ed,LoopOnce:Th,LoopPingPong:Em,LoopRepeat:Ah,LuminanceAlphaFormat:Sh,LuminanceFormat:Mh,MOUSE:C0,Material:Kt,MaterialLoader:Rc,MathUtils:Dt,Matrix2:cd,Matrix3:et,Matrix4:ke,MaxEquation:cm,Mesh:Ie,MeshBasicMaterial:bt,MeshDepthMaterial:pc,MeshDistanceMaterial:Fh,MeshLambertMaterial:$h,MeshMatcapMaterial:_g,MeshNormalMaterial:gg,MeshPhongMaterial:mg,MeshPhysicalMaterial:Hn,MeshStandardMaterial:ta,MeshToonMaterial:Zh,MinEquation:lm,MirroredRepeatWrapping:Or,MixOperation:wm,MultiplyBlending:Vu,MultiplyOperation:Yo,NearestFilter:qt,NearestMipMapLinearFilter:D0,NearestMipMapNearestFilter:U0,NearestMipmapLinearFilter:Ds,NearestMipmapNearestFilter:nc,NeutralToneMapping:mh,NeverCompare:Im,NeverDepth:ul,NeverStencilFunc:Y0,NoBlending:ui,NoColorSpace:Ei,NoToneMapping:Pi,NormalAnimationBlendMode:cc,NormalBlending:Vs,NotEqualCompare:Nm,NotEqualDepth:ml,NotEqualStencilFunc:J0,NumberKeyframeTrack:Qs,Object3D:pt,ObjectLoader:kw,ObjectSpaceNormalMap:Pm,OctahedronGeometry:zn,OneFactor:hm,OneMinusConstantAlphaFactor:Sm,OneMinusConstantColorFactor:ym,OneMinusDstAlphaFactor:mm,OneMinusDstColorFactor:_m,OneMinusSrcAlphaFactor:cl,OneMinusSrcColorFactor:fm,OrthographicCamera:Yr,PCFShadowMap:ec,PCFSoftShadowMap:ch,PMREMGenerator:Xu,Path:Go,PerspectiveCamera:Zt,Plane:ai,PlaneGeometry:_i,PlaneHelper:wb,PointLight:Xs,PointLightHelper:pb,Points:Hr,PointsMaterial:vc,PolarGridHelper:vb,PolyhedronGeometry:ls,PositionalAudio:qw,PropertyBinding:yt,PropertyMixer:Dg,QuadraticBezierCurve:Xh,QuadraticBezierCurve3:qh,Quaternion:Qe,QuaternionKeyframeTrack:rs,QuaternionLinearInterpolant:wg,RED_GREEN_RGTC2_Format:zl,RED_RGTC1_Format:bh,REVISION:Qi,RGBADepthPacking:Ch,RGBAFormat:ln,RGBAIntegerFormat:lc,RGBA_ASTC_10x10_Format:Dl,RGBA_ASTC_10x5_Format:Il,RGBA_ASTC_10x6_Format:Ll,RGBA_ASTC_10x8_Format:Ul,RGBA_ASTC_12x10_Format:Nl,RGBA_ASTC_12x12_Format:Ol,RGBA_ASTC_4x4_Format:wl,RGBA_ASTC_5x4_Format:bl,RGBA_ASTC_5x5_Format:Tl,RGBA_ASTC_6x5_Format:Al,RGBA_ASTC_6x6_Format:El,RGBA_ASTC_8x5_Format:Rl,RGBA_ASTC_8x6_Format:Cl,RGBA_ASTC_8x8_Format:Pl,RGBA_BPTC_Format:Io,RGBA_ETC2_EAC_Format:Sl,RGBA_PVRTC_2BPPV1_Format:xl,RGBA_PVRTC_4BPPV1_Format:vl,RGBA_S3TC_DXT1_Format:Ro,RGBA_S3TC_DXT3_Format:Co,RGBA_S3TC_DXT5_Format:Po,RGBDepthPacking:B0,RGBFormat:yh,RGBIntegerFormat:F0,RGB_BPTC_SIGNED_Format:Fl,RGB_BPTC_UNSIGNED_Format:Bl,RGB_ETC1_Format:yl,RGB_ETC2_Format:Ml,RGB_PVRTC_2BPPV1_Format:_l,RGB_PVRTC_4BPPV1_Format:gl,RGB_S3TC_DXT1_Format:Eo,RGDepthPacking:k0,RGFormat:wh,RGIntegerFormat:ac,RawShaderMaterial:jh,Ray:qr,Raycaster:Fg,RectAreaLight:Eg,RedFormat:oc,RedIntegerFormat:jo,ReinhardToneMapping:hh,RenderTarget:Hm,RepeatWrapping:ts,ReplaceStencilOp:V0,ReverseSubtractEquation:am,RingGeometry:ss,SIGNED_RED_GREEN_RGTC2_Format:Vl,SIGNED_RED_RGTC1_Format:kl,SRGBColorSpace:Ht,SRGBTransfer:Tt,Scene:Bh,ShaderChunk:dt,ShaderLib:Zn,ShaderMaterial:Mt,ShadowMaterial:pg,Shape:Ws,ShapeGeometry:bc,ShapePath:Tb,ShapeUtils:hi,ShortType:_h,Skeleton:as,SkeletonHelper:fb,SkinnedMesh:gc,Source:Fs,Sphere:hn,SphereGeometry:tn,Spherical:lb,SphericalHarmonics3:Rg,SplineCurve:Yh,SpotLight:id,SpotLightHelper:db,Sprite:ng,SpriteMaterial:kh,SrcAlphaFactor:ll,SrcAlphaSaturateFactor:vm,SrcColorFactor:dm,StaticCopyUsage:s_,StaticDrawUsage:ko,StaticReadUsage:t_,StereoCamera:Hw,StreamCopyUsage:o_,StreamDrawUsage:e_,StreamReadUsage:i_,StringKeyframeTrack:ir,SubtractEquation:om,SubtractiveBlending:zu,TOUCH:P0,TangentSpaceNormalMap:Di,TetrahedronGeometry:Tc,Texture:Ut,TextureLoader:Tg,TextureUtils:PS,TorusGeometry:Oi,TorusKnotGeometry:Ac,Triangle:En,TriangleFanDrawMode:Hl,TriangleStripDrawMode:Rh,TrianglesDrawMode:Rm,TubeGeometry:Js,UVMapping:tc,Uint16BufferAttribute:Uh,Uint32BufferAttribute:Dh,Uint8BufferAttribute:G_,Uint8ClampedBufferAttribute:W_,Uniform:ld,UniformsGroup:ob,UniformsLib:Re,UniformsUtils:Vn,UnsignedByteType:fi,UnsignedInt248Type:Zs,UnsignedInt5999Type:vh,UnsignedIntType:Ui,UnsignedShort4444Type:sc,UnsignedShort5551Type:rc,UnsignedShortType:Fr,VSMShadowMap:oi,Vector2:ne,Vector3:b,Vector4:xt,VectorKeyframeTrack:os,VideoTexture:ZS,WebGL3DRenderTarget:I_,WebGLArrayRenderTarget:P_,WebGLCoordinateSystem:li,WebGLCubeRenderTarget:qm,WebGLMultipleRenderTargets:Eb,WebGLRenderTarget:cn,WebGLRenderer:eg,WebGLUtils:Jm,WebGPUCoordinateSystem:zo,WireframeGeometry:fg,WrapAroundEnding:Bo,ZeroCurvatureEnding:Ns,ZeroFactor:um,ZeroSlopeEnding:Os,ZeroStencilOp:z0,createCanvasElement:zm},Symbol.toStringTag,{value:"Module"})),zg={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class $r{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Cb=new Yr(-1,1,1,-1,0,1);class Pb extends qe{constructor(){super(),this.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ne([0,2,0,0,2,0],2))}}const Ib=new Pb;class ud{constructor(e){this._mesh=new Ie(Ib,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Cb)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Vg extends $r{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Mt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Vn.clone(e.uniforms),this.material=new Mt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ud(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Jf extends $r{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class Lb extends $r{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ub{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ne);this._width=n.width,this._height=n.height,t=new cn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Vg(zg),this.copyPass.material.blending=ui,this.clock=new rd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Jf!==void 0&&(o instanceof Jf?n=!0:o instanceof Lb&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Db extends $r{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new X}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const Nb={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new X(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Wr extends $r{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ne(e.x,e.y):new ne(256,256),this.clearColor=new X(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new cn(r,o,{type:Kn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new cn(r,o,{type:Kn});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new cn(r,o,{type:Kn});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=Nb;this.highPassUniforms=Vn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Mt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ne(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=zg;this.copyUniforms=Vn.clone(u.uniforms),this.blendMaterial=new Mt({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Sn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new X,this.oldClearAlpha=1,this.basic=new bt,this.fsQuad=new ud(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new ne(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Wr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Wr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Mt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Mt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Wr.BlurDirectionX=new ne(1,0);Wr.BlurDirectionY=new ne(0,1);const Ob={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Fb extends $r{constructor(){super();const e=Ob;this.uniforms=Vn.clone(e.uniforms),this.material=new jh({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ud(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},mt.getTransfer(this._outputColorSpace)===Tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===uh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===hh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===dh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===fh?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ph?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===mh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}let Bb=1;function kb(s,e,t,n){const i=new _i(s,e);return i.translate(s/2-t,e/2-(e-n),0),i}function zb(s,e){const t=new bt({map:e,color:1714790,transparent:!0,opacity:.5,alphaTest:.5,depthFunc:No,depthWrite:!1}),n=new Ie(s.geometry,t);return n.renderOrder=10,n}class Qf{constructor(e,t,n,i=!0){Dn(this,"obj",new Ge);Dn(this,"cv",document.createElement("canvas"));Dn(this,"ctx");Dn(this,"tex");Dn(this,"mesh");this.w=e,this.h=t,this.cv.width=e*2,this.cv.height=t*2,this.ctx=this.cv.getContext("2d"),this.tex=new Vh(this.cv),this.tex.magFilter=this.tex.minFilter=qt,this.tex.generateMipmaps=!1,this.tex.colorSpace=Ht;const r=kb(e/he,t/he,e/2/he,(t-8)/he);this.mesh=new Ie(r,new $h({map:this.tex,emissiveMap:this.tex,emissive:7829367,alphaTest:.4,side:Nt})),this.mesh.castShadow=n,this.mesh.customDepthMaterial=new pc({depthPacking:Ch,map:this.tex,alphaTest:.4}),this.obj.add(this.mesh),i&&this.obj.add(zb(this.mesh,this.tex))}paint(e){const t=this.ctx;t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.cv.width,this.cv.height),t.setTransform(2,0,0,2,this.w,(this.h-8)*2),e(t),this.tex.needsUpdate=!0,this.obj.scale.y=Bb*.85}dispose(){this.mesh.geometry.dispose(),this.tex.dispose()}}const Vb=new Map,Hb=[];function Gb(s){return Vb.get(s)}function ep(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new qe;let c=0;for(let u=0;u<s.length;++u){const h=s[u];let d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(t){let u=0;const h=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let p=0;p<f.count;++p)h.push(f.getX(p)+u);u+=s[d].attributes.position.count}l.setIndex(h)}for(const u in r){const h=tp(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let _=0;_<o[u].length;++_)f.push(o[u][_][d]);const p=tp(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}return l}function tp(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){const u=s[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const o=new e(r),a=new Je(o,t,n);let l=0;for(let c=0;c<s.length;++c){const u=s[c];if(u.isInterleavedBufferAttribute){const h=l/t;for(let d=0,f=u.count;d<f;d++)for(let p=0;p<t;p++){const _=u.getComponent(d,p);a.setComponent(d+h,p,_)}}else o.set(u.array,l);l+=u.count*t}return i!==void 0&&(a.gpuType=i),a}function np(s,e){if(e===Rm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Hl||e===Rh){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Hl)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class Hg extends bn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new jb(t)}),this.register(function(t){return new Zb(t)}),this.register(function(t){return new sT(t)}),this.register(function(t){return new rT(t)}),this.register(function(t){return new oT(t)}),this.register(function(t){return new Kb(t)}),this.register(function(t){return new Jb(t)}),this.register(function(t){return new Qb(t)}),this.register(function(t){return new eT(t)}),this.register(function(t){return new Yb(t)}),this.register(function(t){return new tT(t)}),this.register(function(t){return new $b(t)}),this.register(function(t){return new iT(t)}),this.register(function(t){return new nT(t)}),this.register(function(t){return new Xb(t)}),this.register(function(t){return new aT(t)}),this.register(function(t){return new lT(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Ji.extractUrlBase(e);o=Ji.resolveURL(c,this.path)}else o=Ji.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Jn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Gg){try{o[_t.KHR_BINARY_GLTF]=new cT(e)}catch(h){i&&i(h);return}r=JSON.parse(o[_t.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new ST(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case _t.KHR_MATERIALS_UNLIT:o[h]=new qb;break;case _t.KHR_DRACO_MESH_COMPRESSION:o[h]=new uT(r,this.dracoLoader);break;case _t.KHR_TEXTURE_TRANSFORM:o[h]=new hT;break;case _t.KHR_MESH_QUANTIZATION:o[h]=new dT;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Wb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const _t={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Xb{constructor(e){this.parser=e,this.name=_t.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new X(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],_n);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ec(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Xs(u),c.distance=h;break;case"spot":c=new id(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Ai(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class qb{constructor(){this.name=_t.KHR_MATERIALS_UNLIT}getMaterialType(){return bt}extendParams(e,t,n){const i=[];e.color=new X(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],_n),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ht))}return Promise.all(i)}}class Yb{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class jb{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(a,a)}return Promise.all(r)}}class Zb{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class $b{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class Kb{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new X(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],_n)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ht)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Jb{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Qb{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new X().setRGB(a[0],a[1],a[2],_n),Promise.all(r)}}class eT{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class tT{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new X().setRGB(a[0],a[1],a[2],_n),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ht)),Promise.all(r)}}class nT{constructor(e){this.parser=e,this.name=_t.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class iT{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class sT{constructor(e){this.parser=e,this.name=_t.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class rT{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class oT{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class aT{constructor(e){this.name=_t.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class lT{constructor(e){this.name=_t.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Fn.TRIANGLES&&c.mode!==Fn.TRIANGLE_STRIP&&c.mode!==Fn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(const p of h){const _=new ke,g=new b,m=new Qe,v=new b(1,1,1),y=new Xt(p.geometry,p.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,x),l.SCALE&&v.fromBufferAttribute(l.SCALE,x),y.setMatrixAt(x,_.compose(g,m,v));for(const x in l)if(x==="_COLOR_0"){const E=l[x];y.instanceColor=new ns(E.array,E.itemSize,E.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&p.geometry.setAttribute(x,l[x]);pt.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),f.push(y)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Gg="glTF",mo=12,ip={JSON:1313821514,BIN:5130562};class cT{constructor(e){this.name=_t.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,mo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Gg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-mo,r=new DataView(e,mo);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===ip.JSON){const c=new Uint8Array(e,mo+o,a);this.content=n.decode(c)}else if(l===ip.BIN){const c=mo+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class uT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=_t.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=eh[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=eh[u]||u.toLowerCase();if(o[u]!==void 0){const d=n.accessors[e.attributes[u]],f=Nr[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const p in f.attributes){const _=f.attributes[p],g=l[p];g!==void 0&&(_.normalized=g)}h(f)},a,c,_n,d)})})}}class hT{constructor(){this.name=_t.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class dT{constructor(){this.name=_t.KHR_MESH_QUANTIZATION}}class Wg extends Zr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,p=e*c,_=p-c,g=-2*f+3*d,m=f-d,v=1-g,y=m-d+h;for(let x=0;x!==a;x++){const E=o[_+x+a],T=o[_+x+l]*u,w=o[p+x+a],A=o[p+x]*u;r[x]=v*E+y*T+g*w+m*A}return r}}const fT=new Qe;class pT extends Wg{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return fT.fromArray(r).normalize().toArray(r),r}}const Fn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Nr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sp={9728:qt,9729:Ft,9984:nc,9985:Ur,9986:Ds,9987:Bn},rp={33071:In,33648:Or,10497:ts},vu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},eh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},mT={CUBICSPLINE:void 0,LINEAR:kr,STEP:Br},xu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function gT(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ta({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:di})),s.DefaultMaterial}function bs(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ai(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function _T(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;o.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function vT(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function xT(s){let e;const t=s.extensions&&s.extensions[_t.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+yu(t.attributes):e=s.indices+":"+yu(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+yu(s.targets[n]);return e}function yu(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function th(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yT(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const MT=new ke;class ST{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Wb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new Tg(this.options.manager):this.textureLoader=new Lg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Jn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return bs(r,a,i),Ai(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())r(u,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[_t.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Ji.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=vu[i.type],a=Nr[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Je(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=vu[i.type],c=Nr[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let _,g;if(f&&f!==h){const m=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let y=t.cache.get(v);y||(_=new c(a,m*f,i.count*f/u),y=new tr(_,f/u),t.cache.add(v,y)),g=new pi(y,l,d%f/u,p)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),g=new Je(_,l,p);if(i.sparse!==void 0){const m=vu.SCALAR,v=Nr[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,E=new v(o[1],y,i.sparse.count*m),T=new c(o[2],x,i.sparse.count*l);a!==null&&(g=new Je(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let w=0,A=E.length;w<A;w++){const S=E[w];if(g.setX(S,T[w*l]),l>=2&&g.setY(S,T[w*l+1]),l>=3&&g.setZ(S,T[w*l+2]),l>=4&&g.setW(S,T[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return u.magFilter=sp[d.magFilter]||Ft,u.minFilter=sp[d.minFilter]||Bn,u.wrapS=rp[d.wrapS]||ts,u.wrapT=rp[d.wrapT]||ts,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==qt&&u.minFilter!==Ft,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(_){const g=new Ut(_);g.needsUpdate=!0,d(g)}),t.load(Ji.resolveURL(h,r.path),p,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),Ai(h,o),h.userData.mimeType=o.mimeType||yT(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[_t.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[_t.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[_t.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new vc,Kt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Yt,Kt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ta}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[_t.KHR_MATERIALS_UNLIT]){const h=i[_t.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,r,t))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new X(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],_n),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,Ht)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Nt);const u=r.alphaMode||xu.OPAQUE;if(u===xu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===xu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==bt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ne(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==bt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==bt){const h=r.emissiveFactor;a.emissive=new X().setRGB(h[0],h[1],h[2],_n)}return r.emissiveTexture!==void 0&&o!==bt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ht)),Promise.all(c).then(function(){const h=new o(a);return r.name&&(h.name=r.name),Ai(h,r),t.associations.set(h,{materials:e}),r.extensions&&bs(i,h,r),h})}createUniqueName(e){const t=yt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[_t.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return op(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=xT(c),h=i[u];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[_t.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=op(new qe,c,t),i[u]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?gT(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,p=u.length;f<p;f++){const _=u[f],g=o[f];let m;const v=c[f];if(g.mode===Fn.TRIANGLES||g.mode===Fn.TRIANGLE_STRIP||g.mode===Fn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new gc(_,v):new Ie(_,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===Fn.TRIANGLE_STRIP?m.geometry=np(m.geometry,Rh):g.mode===Fn.TRIANGLE_FAN&&(m.geometry=np(m.geometry,Hl));else if(g.mode===Fn.LINES)m=new wn(_,v);else if(g.mode===Fn.LINE_STRIP)m=new mi(_,v);else if(g.mode===Fn.LINE_LOOP)m=new zh(_,v);else if(g.mode===Fn.POINTS)m=new Hr(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&vT(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Ai(m,r),g.extensions&&bs(i,m,g),t.assignFinalMaterial(m),h.push(m)}for(let f=0,p=h.length;f<p;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&bs(i,h[0],r),h[0];const d=new Ge;r.extensions&&bs(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=h.length;f<p;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Zt(Dt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Yr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ai(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const d=new ke;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new as(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],p=i.samplers[f.sampler],_=f.target,g=_.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,v=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",v)),c.push(p),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],p=h[2],_=h[3],g=h[4],m=[];for(let v=0,y=d.length;v<y;v++){const x=d[v],E=f[v],T=p[v],w=_[v],A=g[v];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const S=n._createAnimationTracks(x,E,T,w,A);if(S)for(let M=0;M<S.length;M++)m.push(S[M])}return new er(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,MT)});for(let f=0,p=h.length;f<p;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new _c:c.length>1?u=new Ge:c.length===1?u=c[0]:u=new pt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Ai(u,r),r.extensions&&bs(n,u,r),r.matrix!==void 0){const h=new ke;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Ge;n.name&&(r.name=i.createUniqueName(n.name)),Ai(r,n),n.extensions&&bs(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);const c=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof Kt||d instanceof Ut)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];Zi[r.path]===Zi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Zi[r.path]){case Zi.weights:c=Qs;break;case Zi.rotation:c=rs;break;case Zi.position:case Zi.scale:c=os;break;default:switch(n.itemSize){case 1:c=Qs;break;case 2:case 3:default:c=os;break}break}const u=i.interpolation!==void 0?mT[i.interpolation]:kr,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const p=new c(l[d]+"."+Zi[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=th(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof rs?pT:Wg;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function wT(s,e,t){const n=e.attributes,i=new un;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new b(l[0],l[1],l[2]),new b(c[0],c[1],c[2])),a.normalized){const u=th(Nr[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new b,l=new b;for(let c=0,u=r.length;c<u;c++){const h=r[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const _=th(Nr[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new hn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function op(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=eh[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return mt.workingColorSpace!==_n&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${mt.workingColorSpace}" not supported.`),Ai(s,e),wT(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?_T(s,e.targets,t):s})}/*!
 * @pixiv/three-vrm v3.5.5
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */var ja=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),wt=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),ap=class extends pt{constructor(s){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${s}`,this.expressionName=s,this.type="VRMExpression",this.visible=!1}get binds(){return this._binds}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.outputWeight?1:0:this.overrideBlink==="blend"?this.outputWeight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.outputWeight?1:0:this.overrideLookAt==="blend"?this.outputWeight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.outputWeight?1:0:this.overrideMouth==="blend"?this.outputWeight:0}get outputWeight(){return this.isBinary?this.weight>.5?1:0:this.weight}addBind(s){this._binds.push(s)}deleteBind(s){const e=this._binds.indexOf(s);e>=0&&this._binds.splice(e,1)}applyWeight(s){var e;let t=this.outputWeight;t*=(e=s?.multiplier)!=null?e:1,this.isBinary&&t<1&&(t=0),this._binds.forEach(n=>n.applyWeight(t))}clearAppliedWeight(){this._binds.forEach(s=>s.clearAppliedWeight())}};function Xg(s,e,t){var n,i;const r=s.parser.json,o=(n=r.nodes)==null?void 0:n[e];if(o==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;const a=o.mesh;if(a==null)return null;const l=(i=r.meshes)==null?void 0:i[a];if(l==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${a}] of glTF but the mesh doesn't exist`),null;const c=l.primitives.length,u=[];return t.traverse(h=>{u.length<c&&h.isMesh&&u.push(h)}),u}function lp(s,e){return wt(this,null,function*(){const t=yield s.parser.getDependency("node",e);return Xg(s,e,t)})}function cp(s){return wt(this,null,function*(){const e=yield s.parser.getDependencies("node"),t=new Map;return e.forEach((n,i)=>{const r=Xg(s,i,n);r!=null&&t.set(i,r)}),t})}var nh={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function qg(s){return Math.max(Math.min(s,1),0)}var up=class Yg{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){const e={},t=new Set(Object.values(nh));return Object.entries(this._expressionMap).forEach(([n,i])=>{t.has(n)&&(e[n]=i)}),e}get customExpressionMap(){const e={},t=new Set(Object.values(nh));return Object.entries(this._expressionMap).forEach(([n,i])=>{t.has(n)||(e[n]=i)}),e}copy(e){return this._expressions.concat().forEach(n=>{this.unregisterExpression(n)}),e._expressions.forEach(n=>{this.registerExpression(n)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new Yg().copy(this)}getExpression(e){var t;return(t=this._expressionMap[e])!=null?t:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){const t=this._expressions.indexOf(e);t===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(t,1),delete this._expressionMap[e.expressionName]}getValue(e){var t;const n=this.getExpression(e);return(t=n?.weight)!=null?t:null}setValue(e,t){const n=this.getExpression(e);n&&(n.weight=qg(t))}resetValues(){this._expressions.forEach(e=>{e.weight=0})}getExpressionTrackName(e){const t=this.getExpression(e);return t?`${t.name}.weight`:null}update(){const e=this._calculateWeightMultipliers();this._expressions.forEach(t=>{t.clearAppliedWeight()}),this._expressions.forEach(t=>{let n=1;const i=t.expressionName;this.blinkExpressionNames.indexOf(i)!==-1&&(n*=e.blink),this.lookAtExpressionNames.indexOf(i)!==-1&&(n*=e.lookAt),this.mouthExpressionNames.indexOf(i)!==-1&&(n*=e.mouth),t.applyWeight({multiplier:n})})}_calculateWeightMultipliers(){let e=1,t=1,n=1;return this._expressions.forEach(i=>{e-=i.overrideBlinkAmount,t-=i.overrideLookAtAmount,n-=i.overrideMouthAmount}),e=Math.max(0,e),t=Math.max(0,t),n=Math.max(0,n),{blink:e,lookAt:t,mouth:n}}},go={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",RimColor:"rimColor",OutlineColor:"outlineColor"},bT={_Color:go.Color,_EmissionColor:go.EmissionColor,_ShadeColor:go.ShadeColor,_RimColor:go.RimColor,_OutlineColor:go.OutlineColor},TT=new X,jg=class Zg{constructor({material:e,type:t,targetValue:n,targetAlpha:i}){this.material=e,this.type=t,this.targetValue=n,this.targetAlpha=i??1;const r=this._initColorBindState(),o=this._initAlphaBindState();this._state={color:r,alpha:o}}applyWeight(e){const{color:t,alpha:n}=this._state;if(t!=null){const{propertyName:i,deltaValue:r}=t,o=this.material[i];o?.add(TT.copy(r).multiplyScalar(e))}if(n!=null){const{propertyName:i,deltaValue:r}=n;this.material[i]!=null&&(this.material[i]+=r*e)}}clearAppliedWeight(){const{color:e,alpha:t}=this._state;if(e!=null){const{propertyName:n,initialValue:i}=e,r=this.material[n];r?.copy(i)}if(t!=null){const{propertyName:n,initialValue:i}=t;this.material[n]!=null&&(this.material[n]=i)}}_initColorBindState(){var e,t,n;const{material:i,type:r,targetValue:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a?.[r])==null?void 0:e[0])!=null?t:null;if(l==null)return console.warn(`Tried to add a material color bind to the material ${(n=i.name)!=null?n:"(no name)"}, the type ${r} but the material or the type is not supported.`),null;const u=i[l].clone(),h=new X(o.r-u.r,o.g-u.g,o.b-u.b);return{propertyName:l,initialValue:u,deltaValue:h}}_initAlphaBindState(){var e,t,n;const{material:i,type:r,targetAlpha:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a?.[r])==null?void 0:e[1])!=null?t:null;if(l==null&&o!==1)return console.warn(`Tried to add a material alpha bind to the material ${(n=i.name)!=null?n:"(no name)"}, the type ${r} but the material or the type does not support alpha.`),null;if(l==null)return null;const c=i[l],u=o-c;return{propertyName:l,initialValue:c,deltaValue:u}}_getPropertyNameMap(){var e,t;return(t=(e=Object.entries(Zg._propertyNameMapMap).find(([n])=>this.material[n]===!0))==null?void 0:e[1])!=null?t:null}};jg._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var hp=jg,ql=class{constructor({primitives:s,index:e,weight:t}){this.primitives=s,this.index=e,this.weight=t}applyWeight(s){this.primitives.forEach(e=>{var t;((t=e.morphTargetInfluences)==null?void 0:t[this.index])!=null&&(e.morphTargetInfluences[this.index]+=this.weight*s)})}clearAppliedWeight(){this.primitives.forEach(s=>{var e;((e=s.morphTargetInfluences)==null?void 0:e[this.index])!=null&&(s.morphTargetInfluences[this.index]=0)})}},dp=new ne,$g=class Kg{constructor({material:e,scale:t,offset:n}){var i,r;this.material=e,this.scale=t,this.offset=n;const o=(i=Object.entries(Kg._propertyNamesMap).find(([a])=>e[a]===!0))==null?void 0:i[1];o==null?(console.warn(`Tried to add a texture transform bind to the material ${(r=e.name)!=null?r:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],o.forEach(a=>{var l;const c=(l=e[a])==null?void 0:l.clone();if(!c)return null;e[a]=c;const u=c.offset.clone(),h=c.repeat.clone(),d=n.clone().sub(u),f=t.clone().sub(h);this._properties.push({name:a,initialOffset:u,deltaOffset:d,initialScale:h,deltaScale:f})}))}applyWeight(e){this._properties.forEach(t=>{const n=this.material[t.name];n!==void 0&&(n.offset.add(dp.copy(t.deltaOffset).multiplyScalar(e)),n.repeat.add(dp.copy(t.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{const t=this.material[e.name];t!==void 0&&(t.offset.copy(e.initialOffset),t.repeat.copy(e.initialScale))})}};$g._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var fp=$g,AT=new Set(["1.0","1.0-beta"]),Jg=class Qg{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return wt(this,null,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return wt(this,null,function*(){const t=yield this._v1Import(e);if(t)return t;const n=yield this._v0Import(e);return n||null})}_v1Import(e){return wt(this,null,function*(){var t,n;const i=this.parser.json;if(!(((t=i.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;const o=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;const a=o.specVersion;if(!AT.has(a))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;const l=o.expressions;if(!l)return null;const c=new Set(Object.values(nh)),u=new Map;l.preset!=null&&Object.entries(l.preset).forEach(([d,f])=>{if(f!=null){if(!c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${d}" detected. Ignoring the expression`);return}u.set(d,f)}}),l.custom!=null&&Object.entries(l.custom).forEach(([d,f])=>{if(c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${d}". Ignoring the expression`);return}u.set(d,f)});const h=new up;return yield Promise.all(Array.from(u.entries()).map(d=>wt(this,[d],function*([f,p]){var _,g,m,v,y,x,E;const T=new ap(f);if(e.scene.add(T),T.isBinary=(_=p.isBinary)!=null?_:!1,T.overrideBlink=(g=p.overrideBlink)!=null?g:"none",T.overrideLookAt=(m=p.overrideLookAt)!=null?m:"none",T.overrideMouth=(v=p.overrideMouth)!=null?v:"none",(y=p.morphTargetBinds)==null||y.forEach(w=>wt(this,null,function*(){var A;if(w.node===void 0||w.index===void 0)return;const S=yield lp(e,w.node),M=w.index;if(!S.every(P=>Array.isArray(P.morphTargetInfluences)&&M<P.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${p.name} attempts to index morph #${M} but not found.`);return}T.addBind(new ql({primitives:S,index:M,weight:(A=w.weight)!=null?A:1}))})),p.materialColorBinds||p.textureTransformBinds){const w=[];e.scene.traverse(A=>{const S=A.material;S&&(Array.isArray(S)?w.push(...S):w.push(S))}),(x=p.materialColorBinds)==null||x.forEach(A=>wt(this,null,function*(){w.filter(M=>{var P;const F=(P=this.parser.associations.get(M))==null?void 0:P.materials;return A.material===F}).forEach(M=>{T.addBind(new hp({material:M,type:A.type,targetValue:new X().fromArray(A.targetValue),targetAlpha:A.targetValue[3]}))})})),(E=p.textureTransformBinds)==null||E.forEach(A=>wt(this,null,function*(){w.filter(M=>{var P;const F=(P=this.parser.associations.get(M))==null?void 0:P.materials;return A.material===F}).forEach(M=>{var P,F;T.addBind(new fp({material:M,offset:new ne().fromArray((P=A.offset)!=null?P:[0,0]),scale:new ne().fromArray((F=A.scale)!=null?F:[1,1])}))})}))}h.registerExpression(T)}))),h})}_v0Import(e){return wt(this,null,function*(){var t;const n=this.parser.json,i=(t=n.extensions)==null?void 0:t.VRM;if(!i)return null;const r=i.blendShapeMaster;if(!r)return null;const o=new up,a=r.blendShapeGroups;if(!a)return o;const l=new Set;return yield Promise.all(a.map(c=>wt(this,null,function*(){var u;const h=c.presetName,d=h!=null&&Qg.v0v1PresetNameMap[h]||null,f=d??c.name;if(f==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(l.has(f)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${h} has duplicated entries. Ignoring the expression`);return}l.add(f);const p=new ap(f);e.scene.add(p),p.isBinary=(u=c.isBinary)!=null?u:!1,c.binds&&c.binds.forEach(g=>wt(this,null,function*(){var m;if(g.mesh===void 0||g.index===void 0)return;const v=[];if((m=n.nodes)==null||m.forEach((x,E)=>{x.mesh===g.mesh&&v.push(E)}),v.length===0){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to bind a morph target to the mesh #${g.mesh} but the mesh is not found or not used in the scene. Ignoring the bind.`);return}const y=g.index;yield Promise.all(v.map(x=>wt(this,null,function*(){var E;const T=yield lp(e,x);if(!T.every(w=>Array.isArray(w.morphTargetInfluences)&&y<w.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to index ${y}th morph but not found.`);return}p.addBind(new ql({primitives:T,index:y,weight:.01*((E=g.weight)!=null?E:100)}))})))}));const _=c.materialValues;_&&_.length!==0&&_.forEach(g=>{if(g.materialName===void 0||g.propertyName===void 0||g.targetValue===void 0)return;const m=[];e.scene.traverse(y=>{if(y.material){const x=y.material;Array.isArray(x)?m.push(...x.filter(E=>(E.name===g.materialName||E.name===g.materialName+" (Outline)")&&m.indexOf(E)===-1)):x.name===g.materialName&&m.indexOf(x)===-1&&m.push(x)}});const v=g.propertyName;m.forEach(y=>{if(v==="_MainTex_ST"){const E=new ne(g.targetValue[0],g.targetValue[1]),T=new ne(g.targetValue[2],g.targetValue[3]);T.y=1-T.y-E.y,p.addBind(new fp({material:y,scale:E,offset:T}));return}const x=bT[v];if(x){p.addBind(new hp({material:y,type:x,targetValue:new X().fromArray(g.targetValue),targetAlpha:g.targetValue[3]}));return}console.warn(v+" is not supported")})}),o.registerExpression(p)}))),o})}};Jg.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var ET=Jg,hd=class Rr{constructor(e,t){this._firstPersonOnlyLayer=Rr.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=Rr.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=t}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(t=>({meshes:t.meshes.concat(),type:t.type})),this}clone(){return new Rr(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=Rr.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:t=Rr.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=t,this.meshAnnotations.forEach(n=>{n.meshes.forEach(i=>{n.type==="firstPersonOnly"?(i.layers.set(this._firstPersonOnlyLayer),i.traverse(r=>r.layers.set(this._firstPersonOnlyLayer))):n.type==="thirdPersonOnly"?(i.layers.set(this._thirdPersonOnlyLayer),i.traverse(r=>r.layers.set(this._thirdPersonOnlyLayer))):n.type==="auto"&&this._createHeadlessModel(i)})}),this._initializedLayers=!0)}_excludeTriangles(e,t,n,i){let r=0;if(t!=null&&t.length>0)for(let o=0;o<e.length;o+=3){const a=e[o],l=e[o+1],c=e[o+2],u=t[a],h=n[a];if(u[0]>0&&i.includes(h[0])||u[1]>0&&i.includes(h[1])||u[2]>0&&i.includes(h[2])||u[3]>0&&i.includes(h[3]))continue;const d=t[l],f=n[l];if(d[0]>0&&i.includes(f[0])||d[1]>0&&i.includes(f[1])||d[2]>0&&i.includes(f[2])||d[3]>0&&i.includes(f[3]))continue;const p=t[c],_=n[c];p[0]>0&&i.includes(_[0])||p[1]>0&&i.includes(_[1])||p[2]>0&&i.includes(_[2])||p[3]>0&&i.includes(_[3])||(e[r++]=a,e[r++]=l,e[r++]=c)}return r}_createErasedMesh(e,t){const n=new gc(e.geometry.clone(),e.material);n.name=`${e.name}(erase)`,n.frustumCulled=e.frustumCulled,n.layers.set(this._firstPersonOnlyLayer);const i=n.geometry,r=i.getAttribute("skinIndex"),o=r instanceof Ju?[]:r.array,a=[];for(let _=0;_<o.length;_+=4)a.push([o[_],o[_+1],o[_+2],o[_+3]]);const l=i.getAttribute("skinWeight"),c=l instanceof Ju?[]:l.array,u=[];for(let _=0;_<c.length;_+=4)u.push([c[_],c[_+1],c[_+2],c[_+3]]);const h=i.getIndex();if(!h)throw new Error("The geometry doesn't have an index buffer");const d=Array.from(h.array),f=this._excludeTriangles(d,u,a,t),p=[];for(let _=0;_<f;_++)p[_]=d[_];return i.setIndex(p),e.onBeforeRender&&(n.onBeforeRender=e.onBeforeRender),n.bind(new as(e.skeleton.bones,e.skeleton.boneInverses),new ke),n}_createHeadlessModelForSkinnedMesh(e,t){const n=[];if(t.skeleton.bones.forEach((r,o)=>{this._isEraseTarget(r)&&n.push(o)}),!n.length){t.layers.enable(this._thirdPersonOnlyLayer),t.layers.enable(this._firstPersonOnlyLayer);return}t.layers.set(this._thirdPersonOnlyLayer);const i=this._createErasedMesh(t,n);e.add(i)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer));else{const t=new Ge;t.name=`_headless_${e.name}`,t.layers.set(this._firstPersonOnlyLayer),e.parent.add(t),e.children.filter(n=>n.type==="SkinnedMesh").forEach(n=>{const i=n;this._createHeadlessModelForSkinnedMesh(t,i)})}else if(e.type==="SkinnedMesh"){const t=e;this._createHeadlessModelForSkinnedMesh(e.parent,t)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};hd.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;hd.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var pp=hd,RT=new Set(["1.0","1.0-beta"]),CT=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(s){this.parser=s}afterRoot(s){return wt(this,null,function*(){const e=s.userData.vrmHumanoid;if(e!==null){if(e===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");s.userData.vrmFirstPerson=yield this._import(s,e)}})}_import(s,e){return wt(this,null,function*(){if(e==null)return null;const t=yield this._v1Import(s,e);if(t)return t;const n=yield this._v0Import(s,e);return n||null})}_v1Import(s,e){return wt(this,null,function*(){var t,n;const i=this.parser.json;if(!(((t=i.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;const o=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;const a=o.specVersion;if(!RT.has(a))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;const l=o.firstPerson,c=[],u=yield cp(s);return Array.from(u.entries()).forEach(([h,d])=>{var f,p;const _=(f=l?.meshAnnotations)==null?void 0:f.find(g=>g.node===h);c.push({meshes:d,type:(p=_?.type)!=null?p:"auto"})}),new pp(e,c)})}_v0Import(s,e){return wt(this,null,function*(){var t;const n=this.parser.json,i=(t=n.extensions)==null?void 0:t.VRM;if(!i)return null;const r=i.firstPerson;if(!r)return null;const o=[],a=yield cp(s);return Array.from(a.entries()).forEach(([l,c])=>{const u=n.nodes[l],h=r.meshAnnotations?r.meshAnnotations.find(d=>d.mesh===u.mesh):void 0;o.push({meshes:c,type:this._convertV0FlagToV1Type(h?.firstPersonFlag)})}),new pp(e,o)})}_convertV0FlagToV1Type(s){return s==="FirstPersonOnly"?"firstPersonOnly":s==="ThirdPersonOnly"?"thirdPersonOnly":s==="Both"?"both":"auto"}},mp=new b,gp=new b,PT=new Qe,_p=class extends Ge{constructor(s){super(),this.vrmHumanoid=s,this._boneAxesMap=new Map,Object.values(s.humanBones).forEach(e=>{const t=new kg(1);t.matrixAutoUpdate=!1,t.material.depthTest=!1,t.material.depthWrite=!1,this.add(t),this._boneAxesMap.set(e,t)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(s=>{s.geometry.dispose(),s.material.dispose()})}updateMatrixWorld(s){Array.from(this._boneAxesMap.entries()).forEach(([e,t])=>{e.node.updateWorldMatrix(!0,!1),e.node.matrixWorld.decompose(mp,PT,gp);const n=mp.set(.1,.1,.1).divide(gp);t.matrix.copy(e.node.matrixWorld).scale(n)}),super.updateMatrixWorld(s)}},Mu=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"],IT={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function e0(s){return s.invert?s.invert():s.inverse(),s}var Ts=new b,As=new Qe,ih=class{constructor(s){this.humanBones=s,this.restPose=this.getAbsolutePose()}getAbsolutePose(){const s={};return Object.keys(this.humanBones).forEach(e=>{const t=e,n=this.getBoneNode(t);n&&(Ts.copy(n.position),As.copy(n.quaternion),s[t]={position:Ts.toArray(),rotation:As.toArray()})}),s}getPose(){const s={};return Object.keys(this.humanBones).forEach(e=>{const t=e,n=this.getBoneNode(t);if(!n)return;Ts.set(0,0,0),As.identity();const i=this.restPose[t];i?.position&&Ts.fromArray(i.position).negate(),i?.rotation&&e0(As.fromArray(i.rotation)),Ts.add(n.position),As.premultiply(n.quaternion),s[t]={position:Ts.toArray(),rotation:As.toArray()}}),s}setPose(s){Object.entries(s).forEach(([e,t])=>{const n=e,i=this.getBoneNode(n);if(!i)return;const r=this.restPose[n];r&&(t?.position&&(i.position.fromArray(t.position),r.position&&i.position.add(Ts.fromArray(r.position))),t?.rotation&&(i.quaternion.fromArray(t.rotation),r.rotation&&i.quaternion.multiply(As.fromArray(r.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([s,e])=>{const t=this.getBoneNode(s);t&&(e?.position&&t.position.fromArray(e.position),e?.rotation&&t.quaternion.fromArray(e.rotation))})}getBone(s){var e;return(e=this.humanBones[s])!=null?e:void 0}getBoneNode(s){var e,t;return(t=(e=this.humanBones[s])==null?void 0:e.node)!=null?t:null}},Su=new b,LT=new Qe,UT=new b,vp=class t0 extends ih{static _setupTransforms(e){const t=new pt;t.name="VRMHumanoidRig";const n={},i={},r={};Mu.forEach(a=>{var l;const c=e.getBoneNode(a);if(c){const u=new b,h=new Qe;c.updateWorldMatrix(!0,!1),c.matrixWorld.decompose(u,h,Su),n[a]=u,i[a]=c.quaternion.clone();const d=new Qe;(l=c.parent)==null||l.matrixWorld.decompose(Su,d,Su),r[a]=d}});const o={};return Mu.forEach(a=>{var l;const c=e.getBoneNode(a);if(c){const u=n[a];let h=a,d;for(;d==null&&(h=IT[h],h!=null);)d=n[h];const f=new pt;f.name="Normalized_"+c.name,(h?(l=o[h])==null?void 0:l.node:t).add(f),f.position.copy(u),d&&f.position.sub(d),o[a]={node:f}}}),{rigBones:o,root:t,parentWorldRotations:r,boneRotations:i}}constructor(e){const{rigBones:t,root:n,parentWorldRotations:i,boneRotations:r}=t0._setupTransforms(e);super(t),this.original=e,this.root=n,this._parentWorldRotations=i,this._boneRotations=r}update(){Mu.forEach(e=>{const t=this.original.getBoneNode(e);if(t!=null){const n=this.getBoneNode(e),i=this._parentWorldRotations[e],r=LT.copy(i).invert(),o=this._boneRotations[e];if(t.quaternion.copy(n.quaternion).multiply(i).premultiply(r).multiply(o),e==="hips"){const a=n.getWorldPosition(UT);t.parent.updateWorldMatrix(!0,!1);const l=t.parent.matrixWorld,c=a.applyMatrix4(l.invert());t.position.copy(c)}}})}},xp=class n0{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(e,t){var n;this.autoUpdateHumanBones=(n=t?.autoUpdateHumanBones)!=null?n:!0,this._rawHumanBones=new ih(e),this._normalizedHumanBones=new vp(this._rawHumanBones)}copy(e){return this.autoUpdateHumanBones=e.autoUpdateHumanBones,this._rawHumanBones=new ih(e.humanBones),this._normalizedHumanBones=new vp(this._rawHumanBones),this}clone(){return new n0(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(e){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(e)}setRawPose(e){return this._rawHumanBones.setPose(e)}setNormalizedPose(e){return this._normalizedHumanBones.setPose(e)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(e){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(e)}getRawBone(e){return this._rawHumanBones.getBone(e)}getNormalizedBone(e){return this._normalizedHumanBones.getBone(e)}getBoneNode(e){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(e)}getRawBoneNode(e){return this._rawHumanBones.getBoneNode(e)}getNormalizedBoneNode(e){return this._normalizedHumanBones.getBoneNode(e)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},DT={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},NT=new Set(["1.0","1.0-beta"]),yp={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},OT=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(s,e){this.parser=s,this.helperRoot=e?.helperRoot,this.autoUpdateHumanBones=e?.autoUpdateHumanBones}afterRoot(s){return wt(this,null,function*(){s.userData.vrmHumanoid=yield this._import(s)})}_import(s){return wt(this,null,function*(){const e=yield this._v1Import(s);if(e)return e;const t=yield this._v0Import(s);return t||null})}_v1Import(s){return wt(this,null,function*(){var e,t;const n=this.parser.json;if(!(((e=n.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;const r=(t=n.extensions)==null?void 0:t.VRMC_vrm;if(!r)return null;const o=r.specVersion;if(!NT.has(o))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${o}"`),null;const a=r.humanoid;if(!a)return null;const l=a.humanBones.leftThumbIntermediate!=null||a.humanBones.rightThumbIntermediate!=null,c={};a.humanBones!=null&&(yield Promise.all(Object.entries(a.humanBones).map(h=>wt(this,[h],function*([d,f]){let p=d;const _=f.node;if(l){const m=yp[p];m!=null&&(p=m)}const g=yield this.parser.getDependency("node",_);if(g==null){console.warn(`A glTF node bound to the humanoid bone ${p} (index = ${_}) does not exist`);return}c[p]={node:g}}))));const u=new xp(this._ensureRequiredBonesExist(c),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(s.scene.add(u.normalizedHumanBonesRoot),this.helperRoot){const h=new _p(u);this.helperRoot.add(h),h.renderOrder=this.helperRoot.renderOrder}return u})}_v0Import(s){return wt(this,null,function*(){var e;const n=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!n)return null;const i=n.humanoid;if(!i)return null;const r={};i.humanBones!=null&&(yield Promise.all(i.humanBones.map(a=>wt(this,null,function*(){const l=a.bone,c=a.node;if(l==null||c==null)return;if(c<0){console.warn(`A glTF node index for the humanoid bone ${l} is negative (${c}), ignoring this bone.`);return}const u=yield this.parser.getDependency("node",c);if(u==null){console.warn(`A glTF node bound to the humanoid bone ${l} (index = ${c}) does not exist`);return}const h=yp[l],d=h??l;if(r[d]!=null){console.warn(`Multiple bone entries for ${d} detected (index = ${c}), ignoring duplicated entries.`);return}r[d]={node:u}}))));const o=new xp(this._ensureRequiredBonesExist(r),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(s.scene.add(o.normalizedHumanBonesRoot),this.helperRoot){const a=new _p(o);this.helperRoot.add(a),a.renderOrder=this.helperRoot.renderOrder}return o})}_ensureRequiredBonesExist(s){const e=Object.values(DT).filter(t=>s[t]==null);if(e.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${e.join(", ")}`);return s}},Mp=class extends qe{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new Je(new Float32Array(195),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Je(new Uint16Array(189),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,s=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,s=!0),s&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let s=0;s<64;s++){const e=s/63*this._currentTheta;this._attrPos.setXYZ(s+1,this._currentRadius*Math.sin(e),0,this._currentRadius*Math.cos(e))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<63;s++)this._attrIndex.setXYZ(s*3,0,s+1,s+2);this._attrIndex.needsUpdate=!0}},FT=class extends qe{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new b,this._currentTail=new b,this._attrPos=new Je(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Je(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,s=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),s=!0),s&&this._buildPosition()}_buildPosition(){for(let s=0;s<32;s++){const e=s/16*Math.PI;this._attrPos.setXYZ(s,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+s,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+s,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(64+s*2,32+s,32+e),this._attrIndex.setXY(128+s*2,64+s,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},Za=new Qe,Sp=new Qe,_o=new b,wp=new b,bp=Math.sqrt(2)/2,BT=new Qe(0,0,-bp,bp),kT=new b(0,1,0),zT=class extends Ge{constructor(s){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=s;{const e=new Mp;e.radius=.5;const t=new bt({color:65280,transparent:!0,opacity:.5,side:Nt,depthTest:!1,depthWrite:!1});this._meshPitch=new Ie(e,t),this.add(this._meshPitch)}{const e=new Mp;e.radius=.5;const t=new bt({color:16711680,transparent:!0,opacity:.5,side:Nt,depthTest:!1,depthWrite:!1});this._meshYaw=new Ie(e,t),this.add(this._meshYaw)}{const e=new FT;e.radius=.1;const t=new Yt({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new wn(e,t),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(s){const e=Dt.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=e,this._meshYaw.geometry.update();const t=Dt.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=t,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(_o),this.vrmLookAt.getLookAtWorldQuaternion(Za),Za.multiply(this.vrmLookAt.getFaceFrontQuaternion(Sp)),this._meshYaw.position.copy(_o),this._meshYaw.quaternion.copy(Za),this._meshPitch.position.copy(_o),this._meshPitch.quaternion.copy(Za),this._meshPitch.quaternion.multiply(Sp.setFromAxisAngle(kT,e)),this._meshPitch.quaternion.multiply(BT);const{target:n,autoUpdate:i}=this.vrmLookAt;n!=null&&i&&(n.getWorldPosition(wp).sub(_o),this._lineTarget.geometry.tail.copy(wp),this._lineTarget.geometry.update(),this._lineTarget.position.copy(_o)),super.updateMatrixWorld(s)}},VT=new b,HT=new b;function sh(s,e){return s.matrixWorld.decompose(VT,e,HT),e}function sl(s){return[Math.atan2(-s.z,s.x),Math.atan2(s.y,Math.sqrt(s.x*s.x+s.z*s.z))]}function Tp(s){const e=Math.round(s/2/Math.PI);return s-2*Math.PI*e}var Ap=new b(0,0,1),GT=new b,WT=new b,XT=new b,qT=new Qe,wu=new Qe,Ep=new Qe,YT=new Qe,bu=new an,i0=class s0{constructor(e,t){this.offsetFromHeadBone=new b,this.autoUpdate=!0,this.faceFront=new b(0,0,1),this.humanoid=e,this.applier=t,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new Qe)}get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new an)}getEuler(e){return e.set(Dt.DEG2RAD*this._pitch,Dt.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new s0(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){const t=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(t.matrixWorld)}getLookAtWorldQuaternion(e){const t=this.humanoid.getRawBoneNode("head");return sh(t,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(Ap)<.01)return e.copy(this._restHeadWorldQuaternion).invert();const[t,n]=sl(this.faceFront);return bu.set(0,.5*Math.PI+t,n,"YZX"),e.setFromEuler(bu).premultiply(YT.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(wu),this.getFaceFrontQuaternion(Ep),e.copy(Ap).applyQuaternion(wu).applyQuaternion(Ep).applyEuler(this.getEuler(bu))}lookAt(e){const t=qT.copy(this._restHeadWorldQuaternion).multiply(e0(this.getLookAtWorldQuaternion(wu))),n=this.getLookAtWorldPosition(WT),i=XT.copy(e).sub(n).applyQuaternion(t).normalize(),[r,o]=sl(this.faceFront),[a,l]=sl(i),c=Tp(a-r),u=Tp(o-l);this._yaw=Dt.RAD2DEG*c,this._pitch=Dt.RAD2DEG*u,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(GT)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};i0.EULER_ORDER="YXZ";var jT=i0,ZT=new b(0,0,1),ii=new Qe,Tr=new Qe,On=new an(0,0,0,"YXZ"),rl=class{constructor(s,e,t,n,i){this.humanoid=s,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=i,this.faceFront=new b(0,0,1),this._restQuatLeftEye=new Qe,this._restQuatRightEye=new Qe,this._restLeftEyeParentWorldQuat=new Qe,this._restRightEyeParentWorldQuat=new Qe;const r=this.humanoid.getRawBoneNode("leftEye"),o=this.humanoid.getRawBoneNode("rightEye");r&&(this._restQuatLeftEye.copy(r.quaternion),sh(r.parent,this._restLeftEyeParentWorldQuat)),o&&(this._restQuatRightEye.copy(o.quaternion),sh(o.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(s,e){const t=this.humanoid.getRawBoneNode("leftEye"),n=this.humanoid.getRawBoneNode("rightEye"),i=this.humanoid.getNormalizedBoneNode("leftEye"),r=this.humanoid.getNormalizedBoneNode("rightEye");t&&(e<0?On.x=-Dt.DEG2RAD*this.rangeMapVerticalDown.map(-e):On.x=Dt.DEG2RAD*this.rangeMapVerticalUp.map(e),s<0?On.y=-Dt.DEG2RAD*this.rangeMapHorizontalInner.map(-s):On.y=Dt.DEG2RAD*this.rangeMapHorizontalOuter.map(s),ii.setFromEuler(On),this._getWorldFaceFrontQuat(Tr),i.quaternion.copy(Tr).multiply(ii).multiply(Tr.invert()),ii.copy(this._restLeftEyeParentWorldQuat),t.quaternion.copy(i.quaternion).multiply(ii).premultiply(ii.invert()).multiply(this._restQuatLeftEye)),n&&(e<0?On.x=-Dt.DEG2RAD*this.rangeMapVerticalDown.map(-e):On.x=Dt.DEG2RAD*this.rangeMapVerticalUp.map(e),s<0?On.y=-Dt.DEG2RAD*this.rangeMapHorizontalOuter.map(-s):On.y=Dt.DEG2RAD*this.rangeMapHorizontalInner.map(s),ii.setFromEuler(On),this._getWorldFaceFrontQuat(Tr),r.quaternion.copy(Tr).multiply(ii).multiply(Tr.invert()),ii.copy(this._restRightEyeParentWorldQuat),n.quaternion.copy(r.quaternion).multiply(ii).premultiply(ii.invert()).multiply(this._restQuatRightEye))}lookAt(s){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");const e=Dt.RAD2DEG*s.y,t=Dt.RAD2DEG*s.x;this.applyYawPitch(e,t)}_getWorldFaceFrontQuat(s){if(this.faceFront.distanceToSquared(ZT)<.01)return s.identity();const[e,t]=sl(this.faceFront);return On.set(0,.5*Math.PI+e,t,"YZX"),s.setFromEuler(On)}};rl.type="bone";var rh=class{constructor(s,e,t,n,i){this.expressions=s,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=i}applyYawPitch(s,e){e<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-e))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(e))),s<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-s))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(s)))}lookAt(s){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");const e=Dt.RAD2DEG*s.y,t=Dt.RAD2DEG*s.x;this.applyYawPitch(e,t)}};rh.type="expression";var Rp=class{constructor(s,e){this.inputMaxValue=s,this.outputScale=e}map(s){return this.outputScale*qg(s/this.inputMaxValue)}},$T=new Set(["1.0","1.0-beta"]),$a=.01,KT=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(s,e){this.parser=s,this.helperRoot=e?.helperRoot}afterRoot(s){return wt(this,null,function*(){const e=s.userData.vrmHumanoid;if(e===null)return;if(e===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");const t=s.userData.vrmExpressionManager;if(t!==null){if(t===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");s.userData.vrmLookAt=yield this._import(s,e,t)}})}_import(s,e,t){return wt(this,null,function*(){if(e==null||t==null)return null;const n=yield this._v1Import(s,e,t);if(n)return n;const i=yield this._v0Import(s,e,t);return i||null})}_v1Import(s,e,t){return wt(this,null,function*(){var n,i,r;const o=this.parser.json;if(!(((n=o.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;const l=(i=o.extensions)==null?void 0:i.VRMC_vrm;if(!l)return null;const c=l.specVersion;if(!$T.has(c))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${c}"`),null;const u=l.lookAt;if(!u)return null;const h=u.type==="expression"?1:10,d=this._v1ImportRangeMap(u.rangeMapHorizontalInner,h),f=this._v1ImportRangeMap(u.rangeMapHorizontalOuter,h),p=this._v1ImportRangeMap(u.rangeMapVerticalDown,h),_=this._v1ImportRangeMap(u.rangeMapVerticalUp,h);let g;u.type==="expression"?g=new rh(t,d,f,p,_):g=new rl(e,d,f,p,_);const m=this._importLookAt(e,g);return m.offsetFromHeadBone.fromArray((r=u.offsetFromHeadBone)!=null?r:[0,.06,0]),m})}_v1ImportRangeMap(s,e){var t,n;let i=(t=s?.inputMaxValue)!=null?t:90;const r=(n=s?.outputScale)!=null?n:e;return i<$a&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),i=$a),new Rp(i,r)}_v0Import(s,e,t){return wt(this,null,function*(){var n,i,r,o;const l=(n=this.parser.json.extensions)==null?void 0:n.VRM;if(!l)return null;const c=l.firstPerson;if(!c)return null;const u=c.lookAtTypeName==="BlendShape"?1:10,h=this._v0ImportDegreeMap(c.lookAtHorizontalInner,u),d=this._v0ImportDegreeMap(c.lookAtHorizontalOuter,u),f=this._v0ImportDegreeMap(c.lookAtVerticalDown,u),p=this._v0ImportDegreeMap(c.lookAtVerticalUp,u);let _;c.lookAtTypeName==="BlendShape"?_=new rh(t,h,d,f,p):_=new rl(e,h,d,f,p);const g=this._importLookAt(e,_);return c.firstPersonBoneOffset?g.offsetFromHeadBone.set((i=c.firstPersonBoneOffset.x)!=null?i:0,(r=c.firstPersonBoneOffset.y)!=null?r:.06,-((o=c.firstPersonBoneOffset.z)!=null?o:0)):g.offsetFromHeadBone.set(0,.06,0),g.faceFront.set(0,0,-1),_ instanceof rl&&_.faceFront.set(0,0,-1),g})}_v0ImportDegreeMap(s,e){var t,n;const i=s?.curve;JSON.stringify(i)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let r=(t=s?.xRange)!=null?t:90;const o=(n=s?.yRange)!=null?n:e;return r<$a&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),r=$a),new Rp(r,o)}_importLookAt(s,e){const t=new jT(s,e);if(this.helperRoot){const n=new zT(t);this.helperRoot.add(n),n.renderOrder=this.helperRoot.renderOrder}return t}};function JT(s,e){return typeof s!="string"||s===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(s)&&(e=e.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(s)||/^data:.*,.*$/i.test(s)||/^blob:.*$/i.test(s)?s:e+s)}var QT=new Set(["1.0","1.0-beta"]),e1=class{get name(){return"VRMMetaLoaderPlugin"}constructor(s,e){var t,n,i;this.parser=s,this.needThumbnailImage=(t=e?.needThumbnailImage)!=null?t:!1,this.acceptLicenseUrls=(n=e?.acceptLicenseUrls)!=null?n:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(i=e?.acceptV0Meta)!=null?i:!0}afterRoot(s){return wt(this,null,function*(){s.userData.vrmMeta=yield this._import(s)})}_import(s){return wt(this,null,function*(){const e=yield this._v1Import(s);if(e!=null)return e;const t=yield this._v0Import(s);return t??null})}_v1Import(s){return wt(this,null,function*(){var e,t,n;const i=this.parser.json;if(!(((e=i.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;const o=(t=i.extensions)==null?void 0:t.VRMC_vrm;if(o==null)return null;const a=o.specVersion;if(!QT.has(a))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;const l=o.meta;if(!l)return null;const c=l.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(c))throw new Error(`VRMMetaLoaderPlugin: The license url "${c}" is not accepted`);let h;return this.needThumbnailImage&&l.thumbnailImage!=null&&(h=(n=yield this._extractGLTFImage(l.thumbnailImage))!=null?n:void 0),{metaVersion:"1",name:l.name,version:l.version,authors:l.authors,copyrightInformation:l.copyrightInformation,contactInformation:l.contactInformation,references:l.references,thirdPartyLicenses:l.thirdPartyLicenses,thumbnailImage:h,licenseUrl:l.licenseUrl,avatarPermission:l.avatarPermission,allowExcessivelyViolentUsage:l.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:l.allowExcessivelySexualUsage,commercialUsage:l.commercialUsage,allowPoliticalOrReligiousUsage:l.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:l.allowAntisocialOrHateUsage,creditNotation:l.creditNotation,allowRedistribution:l.allowRedistribution,modification:l.modification,otherLicenseUrl:l.otherLicenseUrl}})}_v0Import(s){return wt(this,null,function*(){var e;const n=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!n)return null;const i=n.meta;if(!i)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let r;return this.needThumbnailImage&&i.texture!=null&&i.texture!==-1&&(r=yield this.parser.getDependency("texture",i.texture)),{metaVersion:"0",allowedUserName:i.allowedUserName,author:i.author,commercialUssageName:i.commercialUssageName,contactInformation:i.contactInformation,licenseName:i.licenseName,otherLicenseUrl:i.otherLicenseUrl,otherPermissionUrl:i.otherPermissionUrl,reference:i.reference,sexualUssageName:i.sexualUssageName,texture:r??void 0,title:i.title,version:i.version,violentUssageName:i.violentUssageName}})}_extractGLTFImage(s){return wt(this,null,function*(){var e;const n=(e=this.parser.json.images)==null?void 0:e[s];if(n==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${s}] of glTF as a thumbnail but the image doesn't exist`),null;let i=n.uri;if(n.bufferView!=null){const o=yield this.parser.getDependency("bufferView",n.bufferView),a=new Blob([o],{type:n.mimeType});i=URL.createObjectURL(a)}return i==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${s}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new Gr().loadAsync(JT(i,this.parser.options.path)).catch(o=>(console.error(o),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},t1=class{constructor(s){this.scene=s.scene,this.meta=s.meta,this.humanoid=s.humanoid,this.expressionManager=s.expressionManager,this.firstPerson=s.firstPerson,this.lookAt=s.lookAt}update(s){this.humanoid.update(),this.lookAt&&this.lookAt.update(s),this.expressionManager&&this.expressionManager.update()}},n1=class extends t1{constructor(s){super(s),this.materials=s.materials,this.springBoneManager=s.springBoneManager,this.nodeConstraintManager=s.nodeConstraintManager}update(s){super.update(s),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(s),this.materials&&this.materials.forEach(e=>{e.update&&e.update(s)})}},i1=Object.defineProperty,Cp=Object.getOwnPropertySymbols,s1=Object.prototype.hasOwnProperty,r1=Object.prototype.propertyIsEnumerable,Pp=(s,e,t)=>e in s?i1(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,Ip=(s,e)=>{for(var t in e||(e={}))s1.call(e,t)&&Pp(s,t,e[t]);if(Cp)for(var t of Cp(e))r1.call(e,t)&&Pp(s,t,e[t]);return s},ks=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),o1={"":3e3,srgb:3001};function a1(s,e){parseInt(Qi,10)>=152?s.colorSpace=e:s.encoding=o1[e]}var l1=class{get pending(){return Promise.all(this._pendings)}constructor(s,e){this._parser=s,this._materialParams=e,this._pendings=[]}assignPrimitive(s,e){e!=null&&(this._materialParams[s]=e)}assignColor(s,e,t){if(e!=null){const n=new X().fromArray(e);t&&n.convertSRGBToLinear(),this._materialParams[s]=n}}assignTexture(s,e,t){return ks(this,null,function*(){const n=ks(this,null,function*(){if(e!=null){const i=yield this._parser.assignTexture(this._materialParams,s,e);if(i==null){console.warn("GLTFMToonMaterialParamsAssignHelper: Failed to load texture. The rendering result may be wrong");return}t&&a1(i,"srgb")}});return this._pendings.push(n),n})}assignTextureByIndex(s,e,t){return ks(this,null,function*(){return this.assignTexture(s,e!=null?{index:e}:void 0,t)})}},c1=`// #define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

#include <common>

// #include <uv_pars_vertex>
#ifdef MTOON_USE_UV
  varying vec2 vUv;

  // COMPAT: pre-r151 uses a common uvTransform
  #if THREE_VRM_THREE_REVISION < 151
    uniform mat3 uvTransform;
  #endif
#endif

// #include <uv2_pars_vertex>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    attribute vec2 uv2;
    varying vec2 vUv2;
    uniform mat3 uv2Transform;
  #endif
#endif

// #include <displacementmap_pars_vertex>
// #include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
  uniform sampler2D outlineWidthMultiplyTexture;
  uniform mat3 outlineWidthMultiplyTextureUvTransform;
#endif

uniform float outlineWidthFactor;

void main() {

  // #include <uv_vertex>
  #ifdef MTOON_USE_UV
    // COMPAT: pre-r151 uses a common uvTransform
    #if THREE_VRM_THREE_REVISION >= 151
      vUv = uv;
    #else
      vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    #endif
  #endif

  // #include <uv2_vertex>
  // COMAPT: pre-r151 uses uv2 for lightMap and aoMap
  #if THREE_VRM_THREE_REVISION < 151
    #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
      vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
    #endif
  #endif

  #include <color_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>

  // we need this to compute the outline properly
  objectNormal = normalize( objectNormal );

  #include <defaultnormal_vertex>

  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
    vNormal = normalize( transformedNormal );
  #endif

  #include <begin_vertex>

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  // #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  #ifdef OUTLINE
    float worldNormalLength = length( transformedNormal );
    vec3 outlineOffset = outlineWidthFactor * worldNormalLength * objectNormal;

    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;
      float outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;
      outlineOffset *= outlineTex;
    #endif

    #ifdef OUTLINE_WIDTH_SCREEN
      outlineOffset *= vViewPosition.z / projectionMatrix[ 1 ].y;
    #endif

    gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );

    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic
  #endif

  #include <worldpos_vertex>
  // #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}`,u1=`// #define PHONG

uniform vec3 litFactor;

uniform float opacity;

uniform vec3 shadeColorFactor;
#ifdef USE_SHADEMULTIPLYTEXTURE
  uniform sampler2D shadeMultiplyTexture;
  uniform mat3 shadeMultiplyTextureUvTransform;
#endif

uniform float shadingShiftFactor;
uniform float shadingToonyFactor;

#ifdef USE_SHADINGSHIFTTEXTURE
  uniform sampler2D shadingShiftTexture;
  uniform mat3 shadingShiftTextureUvTransform;
  uniform float shadingShiftTextureScale;
#endif

uniform float giEqualizationFactor;

uniform vec3 parametricRimColorFactor;
#ifdef USE_RIMMULTIPLYTEXTURE
  uniform sampler2D rimMultiplyTexture;
  uniform mat3 rimMultiplyTextureUvTransform;
#endif
uniform float rimLightingMixFactor;
uniform float parametricRimFresnelPowerFactor;
uniform float parametricRimLiftFactor;

#ifdef USE_MATCAPTEXTURE
  uniform vec3 matcapFactor;
  uniform sampler2D matcapTexture;
  uniform mat3 matcapTextureUvTransform;
#endif

uniform vec3 emissive;
uniform float emissiveIntensity;

uniform vec3 outlineColorFactor;
uniform float outlineLightingMixFactor;

#ifdef USE_UVANIMATIONMASKTEXTURE
  uniform sampler2D uvAnimationMaskTexture;
  uniform mat3 uvAnimationMaskTextureUvTransform;
#endif

uniform float uvAnimationScrollXOffset;
uniform float uvAnimationScrollYOffset;
uniform float uvAnimationRotationPhase;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>

// #include <uv_pars_fragment>
#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
  varying vec2 vUv;
#endif

// #include <uv2_pars_fragment>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    varying vec2 vUv2;
  #endif
#endif

#include <map_pars_fragment>

#ifdef USE_MAP
  uniform mat3 mapUvTransform;
#endif

// #include <alphamap_pars_fragment>

#include <alphatest_pars_fragment>

#include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>

#ifdef USE_EMISSIVEMAP
  uniform mat3 emissiveMapUvTransform;
#endif

// #include <envmap_common_pars_fragment>
// #include <envmap_pars_fragment>
// #include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>

// #include <bsdfs>
// COMPAT: pre-r151 doesn't have BRDF_Lambert in <common>
#if THREE_VRM_THREE_REVISION < 151
  vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
    return RECIPROCAL_PI * diffuseColor;
  }
#endif

#include <lights_pars_begin>

#include <normal_pars_fragment>

// #include <lights_phong_pars_fragment>
varying vec3 vViewPosition;

struct MToonMaterial {
  vec3 diffuseColor;
  vec3 shadeColor;
  float shadingShift;
};

float linearstep( float a, float b, float t ) {
  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );
}

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
float getShading(
  const in float dotNL,
  const in float shadow,
  const in float shadingShift
) {
  float shading = dotNL;
  shading = shading + shadingShift;
  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );
  shading *= shadow;
  return shading;
}

/**
 * Mix diffuseColor and shadeColor using shading factor and light color
 */
vec3 getDiffuse(
  const in MToonMaterial material,
  const in float shading,
  in vec3 lightColor
) {
  #ifdef DEBUG_LITSHADERATE
    return vec3( BRDF_Lambert( shading * lightColor ) );
  #endif

  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );

  // The "comment out if you want to PBR absolutely" line
  #ifdef V0_COMPAT_SHADE
    col = min( col, material.diffuseColor );
  #endif

  return col;
}

// COMPAT: pre-r156 uses a struct GeometricContext
#if THREE_VRM_THREE_REVISION >= 157
  void RE_Direct_MToon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometryNormal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#else
  void RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometry.normal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#endif

#define RE_Direct RE_Direct_MToon
#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon
#define Material_LightProbeLOD( material ) (0)

#include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>

// #include <normalmap_pars_fragment>
#ifdef USE_NORMALMAP

  uniform sampler2D normalMap;
  uniform mat3 normalMapUvTransform;
  uniform vec2 normalScale;

#endif

// COMPAT: pre-r151
// USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
#if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

  uniform mat3 normalMatrix;

#endif

// COMPAT: pre-r151
// USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( TANGENTSPACE_NORMALMAP ) )

  // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

  // three-vrm specific change: it requires \`uv\` as an input in order to support uv scrolls

  // Temporary compat against shader change @ Three.js r126, r151
  #if THREE_VRM_THREE_REVISION >= 151

    mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

      vec3 q0 = dFdx( eye_pos.xyz );
      vec3 q1 = dFdy( eye_pos.xyz );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = surf_norm;

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

      return mat3( T * scale, B * scale, N );

    }

  #else

    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {

      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = normalize( surf_norm );

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
      // TODO: Is this still required? Or shall I make a PR about it?
      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {
        return surf_norm;
      }

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );

      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );

    }

  #endif

#endif

// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == post correction ==========================================================
void postCorrection() {
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec2 uv = vec2(0.5, 0.5);

  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
    uv = vUv;

    float uvAnimMask = 1.0;
    #ifdef USE_UVANIMATIONMASKTEXTURE
      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;
      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;
    #endif

    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );
    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );
    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;
    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;
  #endif

  #ifdef DEBUG_UV
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
      gl_FragColor = vec4( uv, 0.0, 1.0 );
    #endif
    return;
  #endif

  vec4 diffuseColor = vec4( litFactor, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;
    vec4 sampledDiffuseColor = texture2D( map, mapUv );
    #ifdef DECODE_VIDEO_TEXTURE
      sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
    #endif
    diffuseColor *= sampledDiffuseColor;
  #endif

  // #include <color_fragment>
  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    diffuseColor.rgb *= vColor;
  #endif

  // #include <alphamap_fragment>

  #include <alphatest_fragment>

  // #include <specularmap_fragment>

  // #include <normal_fragment_begin>
  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;

  #ifdef FLAT_SHADED

    vec3 fdx = dFdx( vViewPosition );
    vec3 fdy = dFdy( vViewPosition );
    vec3 normal = normalize( cross( fdx, fdy ) );

  #else

    vec3 normal = normalize( vNormal );

    #ifdef DOUBLE_SIDED

      normal *= faceDirection;

    #endif

  #endif

  #ifdef USE_NORMALMAP

    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;

  #endif

  #ifdef USE_NORMALMAP_TANGENTSPACE

    #ifdef USE_TANGENT

      mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn = getTangentFrame( - vViewPosition, normal, normalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn[0] *= faceDirection;
      tbn[1] *= faceDirection;

    #endif

  #endif

  #ifdef USE_CLEARCOAT_NORMALMAP

    #ifdef USE_TANGENT

      mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn2[0] *= faceDirection;
      tbn2[1] *= faceDirection;

    #endif

  #endif

  // non perturbed normal for clearcoat among others

  vec3 nonPerturbedNormal = normal;

  #ifdef OUTLINE
    normal *= -1.0;
  #endif

  // #include <normal_fragment_maps>

  // COMPAT: pre-r151
  // USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
  #if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

    #ifdef FLIP_SIDED

      normal = - normal;

    #endif

    #ifdef DOUBLE_SIDED

      normal = normal * faceDirection;

    #endif

    normal = normalize( normalMatrix * normal );

  // COMPAT: pre-r151
  // USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
  #elif defined( USE_NORMALMAP_TANGENTSPACE ) || defined( TANGENTSPACE_NORMALMAP )

    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;
    mapN.xy *= normalScale;

    // COMPAT: pre-r151
    #if THREE_VRM_THREE_REVISION >= 151 || defined( USE_TANGENT )

      normal = normalize( tbn * mapN );

    #else

      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );

    #endif

  #endif

  // #include <emissivemap_fragment>
  #ifdef USE_EMISSIVEMAP
    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;
    totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;
  #endif

  #ifdef DEBUG_NORMAL
    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );
    return;
  #endif

  // -- MToon: lighting --------------------------------------------------------
  // accumulation
  // #include <lights_phong_fragment>
  MToonMaterial material;

  material.diffuseColor = diffuseColor.rgb;

  material.shadeColor = shadeColorFactor;
  #ifdef USE_SHADEMULTIPLYTEXTURE
    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;
  #endif

  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    material.shadeColor.rgb *= vColor;
  #endif

  material.shadingShift = shadingShiftFactor;
  #ifdef USE_SHADINGSHIFTTEXTURE
    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;
  #endif

  // #include <lights_fragment_begin>

  // MToon Specific changes:
  // Since we want to take shadows into account of shading instead of irradiance,
  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.

  // COMPAT: pre-r156 uses a struct GeometricContext
  #if THREE_VRM_THREE_REVISION >= 157
    vec3 geometryPosition = - vViewPosition;
    vec3 geometryNormal = normal;
    vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    vec3 geometryClearcoatNormal;

    #ifdef USE_CLEARCOAT

      geometryClearcoatNormal = clearcoatNormal;

    #endif
  #else
    GeometricContext geometry;

    geometry.position = - vViewPosition;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    #ifdef USE_CLEARCOAT

      geometry.clearcoatNormal = clearcoatNormal;

    #endif
  #endif

  IncidentLight directLight;

  // since these variables will be used in unrolled loop, we have to define in prior
  float shadow;

  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

    PointLight pointLight;
    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
    PointLightShadow pointLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

      pointLight = pointLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getPointLightInfo( pointLight, geometryPosition, directLight );
      #else
        getPointLightInfo( pointLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
      pointLightShadow = pointLightShadows[ i ];
      // COMPAT: pre-r166
      // r166 introduced shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #else
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #endif
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

    SpotLight spotLight;
    // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS, r144+ uses NUM_SPOT_LIGHT_COORDS
    #if THREE_VRM_THREE_REVISION >= 144
      #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_COORDS > 0
      SpotLightShadow spotLightShadow;
      #endif
    #elif defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
    SpotLightShadow spotLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

      spotLight = spotLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getSpotLightInfo( spotLight, geometryPosition, directLight );
      #else
        getSpotLightInfo( spotLight, geometry, directLight );
      #endif

      shadow = 1.0;
      // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS and vSpotShadowCoord, r144+ uses NUM_SPOT_LIGHT_COORDS and vSpotLightCoord
      // COMPAT: pre-r166 does not have shadowIntensity, r166+ has shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )
        spotLightShadow = spotLightShadows[ i ];
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
        #endif
      #elif THREE_VRM_THREE_REVISION >= 144
        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )
        spotLightShadow = spotLightShadows[ i ];
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
        #endif
      #elif defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
      spotLightShadow = spotLightShadows[ i ];
      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

    DirectionalLight directionalLight;
    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

      directionalLight = directionalLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getDirectionalLightInfo( directionalLight, directLight );
      #else
        getDirectionalLightInfo( directionalLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      // COMPAT: pre-r166
      // r166 introduced shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #else
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #endif
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

  //   RectAreaLight rectAreaLight;

  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

  //     rectAreaLight = rectAreaLights[ i ];
  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

  //   }
  //   #pragma unroll_loop_end

  // #endif

  #if defined( RE_IndirectDiffuse )

    vec3 iblIrradiance = vec3( 0.0 );

    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

    // COMPAT: pre-r156 uses a struct GeometricContext
    // COMPAT: pre-r156 doesn't have a define USE_LIGHT_PROBES
    #if THREE_VRM_THREE_REVISION >= 157
      #if defined( USE_LIGHT_PROBES )
        irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
      #endif
    #else
      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
    #endif

    #if ( NUM_HEMI_LIGHTS > 0 )

      #pragma unroll_loop_start
      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

        // COMPAT: pre-r156 uses a struct GeometricContext
        #if THREE_VRM_THREE_REVISION >= 157
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
        #else
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
        #endif

      }
      #pragma unroll_loop_end

    #endif

  #endif

  // #if defined( RE_IndirectSpecular )

  //   vec3 radiance = vec3( 0.0 );
  //   vec3 clearcoatRadiance = vec3( 0.0 );

  // #endif

  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  #ifdef DEBUG_LITSHADERATE
    gl_FragColor = vec4( col, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // -- MToon: rim lighting -----------------------------------------
  vec3 viewDir = normalize( vViewPosition );

  #ifndef PHYSICALLY_CORRECT_LIGHTS
    reflectedLight.directSpecular /= PI;
  #endif
  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, rimLightingMixFactor );

  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );

  #ifdef USE_MATCAPTEXTURE
    {
      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );
      vec3 y = cross( viewDir, x ); // guaranteed to be normalized
      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );
      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;
      vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;
      rim += matcapFactor * matcap;
    }
  #endif

  #ifdef USE_RIMMULTIPLYTEXTURE
    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;
  #endif

  col += rimMix * rim;

  // -- MToon: Emission --------------------------------------------------------
  col += totalEmissiveRadiance;

  // #include <envmap_fragment>

  // -- Almost done! -----------------------------------------------------------
  #if defined( OUTLINE )
    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );
  #endif

  #ifdef OPAQUE
    diffuseColor.a = 1.0;
  #endif

  gl_FragColor = vec4( col, diffuseColor.a );
  postCorrection();
}
`,h1={None:"none"},Lp={None:"none",ScreenCoordinates:"screenCoordinates"},d1={3e3:"",3001:"srgb"};function Tu(s){return parseInt(Qi,10)>=152?s.colorSpace:d1[s.encoding]}var f1=class extends Mt{constructor(s={}){var e;super({vertexShader:c1,fragmentShader:u1}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=Di,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=h1.None,this._outlineWidthMode=Lp.None,this._isOutline=!1,s.transparentWithZWrite&&(s.depthWrite=!0),delete s.transparentWithZWrite,s.fog=!0,s.lights=!0,s.clipping=!0,this.uniforms=Vn.merge([Re.common,Re.normalmap,Re.emissivemap,Re.fog,Re.lights,{litFactor:{value:new X(1,1,1)},mapUvTransform:{value:new et},colorAlpha:{value:1},normalMapUvTransform:{value:new et},shadeColorFactor:{value:new X(0,0,0)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new et},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new et},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new X(1,1,1)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new et},parametricRimColorFactor:{value:new X(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new et},rimLightingMixFactor:{value:1},parametricRimFresnelPowerFactor:{value:5},parametricRimLiftFactor:{value:0},emissive:{value:new X(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new et},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new et},outlineWidthFactor:{value:0},outlineColorFactor:{value:new X(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new et},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(e=s.uniforms)!=null?e:{}]),this.setValues(s),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([t,n])=>`${t}:${n}`),this.matcapTexture?`matcapTextureColorSpace:${Tu(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${Tu(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${Tu(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=t=>{const n=parseInt(Qi,10),i=Object.entries(Ip(Ip({},this._generateDefines()),this.defines)).filter(([r,o])=>!!o).map(([r,o])=>`#define ${r} ${o}`).join(`
`)+`
`;t.vertexShader=i+t.vertexShader,t.fragmentShader=i+t.fragmentShader,n<154&&(t.fragmentShader=t.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>"))}}get color(){return this.uniforms.litFactor.value}set color(s){this.uniforms.litFactor.value=s}get map(){return this.uniforms.map.value}set map(s){this.uniforms.map.value=s}get normalMap(){return this.uniforms.normalMap.value}set normalMap(s){this.uniforms.normalMap.value=s}get normalScale(){return this.uniforms.normalScale.value}set normalScale(s){this.uniforms.normalScale.value=s}get emissive(){return this.uniforms.emissive.value}set emissive(s){this.uniforms.emissive.value=s}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(s){this.uniforms.emissiveIntensity.value=s}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(s){this.uniforms.emissiveMap.value=s}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(s){this.uniforms.shadeColorFactor.value=s}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(s){this.uniforms.shadeMultiplyTexture.value=s}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(s){this.uniforms.shadingShiftFactor.value=s}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(s){this.uniforms.shadingShiftTexture.value=s}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(s){this.uniforms.shadingShiftTextureScale.value=s}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(s){this.uniforms.shadingToonyFactor.value=s}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(s){this.uniforms.giEqualizationFactor.value=s}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(s){this.uniforms.matcapFactor.value=s}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(s){this.uniforms.matcapTexture.value=s}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(s){this.uniforms.parametricRimColorFactor.value=s}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(s){this.uniforms.rimMultiplyTexture.value=s}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(s){this.uniforms.rimLightingMixFactor.value=s}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(s){this.uniforms.parametricRimFresnelPowerFactor.value=s}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(s){this.uniforms.parametricRimLiftFactor.value=s}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(s){this.uniforms.outlineWidthMultiplyTexture.value=s}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(s){this.uniforms.outlineWidthFactor.value=s}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(s){this.uniforms.outlineColorFactor.value=s}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(s){this.uniforms.outlineLightingMixFactor.value=s}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(s){this.uniforms.uvAnimationMaskTexture.value=s}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(s){this.uniforms.uvAnimationScrollXOffset.value=s}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(s){this.uniforms.uvAnimationScrollYOffset.value=s}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(s){this.uniforms.uvAnimationRotationPhase.value=s}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(s){this._ignoreVertexColor=s,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(s){this._v0CompatShade=s,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(s){this._debugMode=s,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(s){this._outlineWidthMode=s,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(s){this._isOutline=s,this.needsUpdate=!0}get isMToonMaterial(){return!0}update(s){this._uploadUniformsWorkaround(),this._updateUVAnimation(s)}copy(s){return super.copy(s),this.map=s.map,this.normalMap=s.normalMap,this.emissiveMap=s.emissiveMap,this.shadeMultiplyTexture=s.shadeMultiplyTexture,this.shadingShiftTexture=s.shadingShiftTexture,this.matcapTexture=s.matcapTexture,this.rimMultiplyTexture=s.rimMultiplyTexture,this.outlineWidthMultiplyTexture=s.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=s.uvAnimationMaskTexture,this.normalMapType=s.normalMapType,this.uvAnimationScrollXSpeedFactor=s.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=s.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=s.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=s.ignoreVertexColor,this.v0CompatShade=s.v0CompatShade,this.debugMode=s.debugMode,this.outlineWidthMode=s.outlineWidthMode,this.isOutline=s.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(s){this.uniforms.uvAnimationScrollXOffset.value+=s*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=s*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=s*this.uvAnimationRotationSpeedFactor,this.uniforms.alphaTest.value=this.alphaTest,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),this.uniformsNeedUpdate=!0}_generateDefines(){const s=parseInt(Qi,10),e=this.outlineWidthMultiplyTexture!==null,t=this.map!==null||this.normalMap!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:s,OUTLINE:this._isOutline,MTOON_USE_UV:e||t,MTOON_UVS_VERTEX_ONLY:e&&!t,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===Lp.ScreenCoordinates}}_updateTextureMatrix(s,e){s.value&&(s.value.matrixAutoUpdate&&s.value.updateMatrix(),e.value.copy(s.value.matrix))}},p1=new Set(["1.0","1.0-beta"]),r0=class ol{get name(){return ol.EXTENSION_NAME}constructor(e,t={}){var n,i,r,o;this.parser=e,this.materialType=(n=t.materialType)!=null?n:f1,this.renderOrderOffset=(i=t.renderOrderOffset)!=null?i:0,this.v0CompatShade=(r=t.v0CompatShade)!=null?r:!1,this.debugMode=(o=t.debugMode)!=null?o:"none",this._mToonMaterialSet=new Set}beforeRoot(){return ks(this,null,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(e){return ks(this,null,function*(){e.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(e){return this._getMToonExtension(e)?this.materialType:null}extendMaterialParams(e,t){const n=this._getMToonExtension(e);return n?this._extendMaterialParams(n,t):null}loadMesh(e){return ks(this,null,function*(){var t;const n=this.parser,r=(t=n.json.meshes)==null?void 0:t[e];if(r==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);const o=r.primitives,a=yield n.loadMesh(e);if(o.length===1){const l=a,c=o[0].material;c!=null&&this._setupPrimitive(l,c)}else{const l=a;for(let c=0;c<o.length;c++){const u=l.children[c],h=o[c].material;h!=null&&this._setupPrimitive(u,h)}}return a})}_removeUnlitExtensionIfMToonExists(){const n=this.parser.json.materials;n?.map((i,r)=>{var o;this._getMToonExtension(r)&&((o=i.extensions)!=null&&o.KHR_materials_unlit)&&delete i.extensions.KHR_materials_unlit})}_getMToonExtension(e){var t,n;const o=(t=this.parser.json.materials)==null?void 0:t[e];if(o==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}const a=(n=o.extensions)==null?void 0:n[ol.EXTENSION_NAME];if(a==null)return;const l=a.specVersion;if(!p1.has(l)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${ol.EXTENSION_NAME} specVersion "${l}"`);return}return a}_extendMaterialParams(e,t){return ks(this,null,function*(){var n;delete t.metalness,delete t.roughness;const i=new l1(this.parser,t);i.assignPrimitive("transparentWithZWrite",e.transparentWithZWrite),i.assignColor("shadeColorFactor",e.shadeColorFactor),i.assignTexture("shadeMultiplyTexture",e.shadeMultiplyTexture,!0),i.assignPrimitive("shadingShiftFactor",e.shadingShiftFactor),i.assignTexture("shadingShiftTexture",e.shadingShiftTexture,!0),i.assignPrimitive("shadingShiftTextureScale",(n=e.shadingShiftTexture)==null?void 0:n.scale),i.assignPrimitive("shadingToonyFactor",e.shadingToonyFactor),i.assignPrimitive("giEqualizationFactor",e.giEqualizationFactor),i.assignColor("matcapFactor",e.matcapFactor),i.assignTexture("matcapTexture",e.matcapTexture,!0),i.assignColor("parametricRimColorFactor",e.parametricRimColorFactor),i.assignTexture("rimMultiplyTexture",e.rimMultiplyTexture,!0),i.assignPrimitive("rimLightingMixFactor",e.rimLightingMixFactor),i.assignPrimitive("parametricRimFresnelPowerFactor",e.parametricRimFresnelPowerFactor),i.assignPrimitive("parametricRimLiftFactor",e.parametricRimLiftFactor),i.assignPrimitive("outlineWidthMode",e.outlineWidthMode),i.assignPrimitive("outlineWidthFactor",e.outlineWidthFactor),i.assignTexture("outlineWidthMultiplyTexture",e.outlineWidthMultiplyTexture,!1),i.assignColor("outlineColorFactor",e.outlineColorFactor),i.assignPrimitive("outlineLightingMixFactor",e.outlineLightingMixFactor),i.assignTexture("uvAnimationMaskTexture",e.uvAnimationMaskTexture,!1),i.assignPrimitive("uvAnimationScrollXSpeedFactor",e.uvAnimationScrollXSpeedFactor),i.assignPrimitive("uvAnimationScrollYSpeedFactor",e.uvAnimationScrollYSpeedFactor),i.assignPrimitive("uvAnimationRotationSpeedFactor",e.uvAnimationRotationSpeedFactor),i.assignPrimitive("v0CompatShade",this.v0CompatShade),i.assignPrimitive("debugMode",this.debugMode),yield i.pending})}_setupPrimitive(e,t){const n=this._getMToonExtension(t);if(n){const i=this._parseRenderOrder(n);e.renderOrder=i+this.renderOrderOffset,this._generateOutline(e),this._addToMaterialSet(e);return}}_shouldGenerateOutline(e){return typeof e.outlineWidthMode=="string"&&e.outlineWidthMode!=="none"&&typeof e.outlineWidthFactor=="number"&&e.outlineWidthFactor>0}_generateOutline(e){const t=e.material;if(!(t instanceof Kt)||!this._shouldGenerateOutline(t))return;e.material=[t];const n=t.clone();n.name+=" (Outline)",n.isOutline=!0,n.side=$t,e.material.push(n);const i=e.geometry,r=i.index?i.index.count:i.attributes.position.count/3;i.addGroup(0,r,0),i.addGroup(0,r,1)}_addToMaterialSet(e){const t=e.material,n=new Set;Array.isArray(t)?t.forEach(i=>n.add(i)):n.add(t);for(const i of n)this._mToonMaterialSet.add(i)}_parseRenderOrder(e){var t;return(e.transparentWithZWrite?0:19)+((t=e.renderQueueOffsetNumber)!=null?t:0)}};r0.EXTENSION_NAME="VRMC_materials_mtoon";var m1=r0,g1=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),o0=class oh{get name(){return oh.EXTENSION_NAME}constructor(e){this.parser=e}extendMaterialParams(e,t){return g1(this,null,function*(){const n=this._getHDREmissiveMultiplierExtension(e);if(n==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");const i=n.emissiveMultiplier;t.emissiveIntensity=i})}_getHDREmissiveMultiplierExtension(e){var t,n;const o=(t=this.parser.json.materials)==null?void 0:t[e];if(o==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}const a=(n=o.extensions)==null?void 0:n[oh.EXTENSION_NAME];if(a!=null)return a}};o0.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";var _1=o0,v1=Object.defineProperty,x1=Object.defineProperties,y1=Object.getOwnPropertyDescriptors,Up=Object.getOwnPropertySymbols,M1=Object.prototype.hasOwnProperty,S1=Object.prototype.propertyIsEnumerable,Dp=(s,e,t)=>e in s?v1(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,si=(s,e)=>{for(var t in e||(e={}))M1.call(e,t)&&Dp(s,t,e[t]);if(Up)for(var t of Up(e))S1.call(e,t)&&Dp(s,t,e[t]);return s},Np=(s,e)=>x1(s,y1(e)),w1=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())});function Ar(s){return Math.pow(s,2.2)}var b1=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(s){var e;this.parser=s,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;const t=this.parser.json;t.extensionsUsed=(e=t.extensionsUsed)!=null?e:[],t.extensionsUsed.indexOf("KHR_texture_transform")===-1&&t.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){return w1(this,null,function*(){var s;const e=this.parser.json,t=(s=e.extensions)==null?void 0:s.VRM,n=t?.materialProperties;n&&(this._populateRenderQueueMap(n),n.forEach((i,r)=>{var o,a;const l=(o=e.materials)==null?void 0:o[r];if(l==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${r}] of glTF but the material doesn't exist`);return}if(i.shader==="VRM/MToon"){const c=this._parseV0MToonProperties(i,l);e.materials[r]=c}else if((a=i.shader)!=null&&a.startsWith("VRM/Unlit")){const c=this._parseV0UnlitProperties(i,l);e.materials[r]=c}else i.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${i.shader}`)}))})}_parseV0MToonProperties(s,e){var t,n,i,r,o,a,l,c,u,h,d,f,p,_,g,m,v,y,x,E,T,w,A,S,M,P,F,B,U,z,k,j,W,ae,oe,be,Xe,We,$,pe,Le,me,Oe,Ke,je,it,le,_e,D,ze,fe,Ue,xe,$e,Pe;const I=(n=(t=s.keywordMap)==null?void 0:t._ALPHABLEND_ON)!=null?n:!1,q=((i=s.floatProperties)==null?void 0:i._ZWrite)===1&&I,ee=this._v0ParseRenderQueue(s),re=(o=(r=s.keywordMap)==null?void 0:r._ALPHATEST_ON)!=null?o:!1,V=I?"BLEND":re?"MASK":"OPAQUE",de=re?(l=(a=s.floatProperties)==null?void 0:a._Cutoff)!=null?l:.5:void 0,Ee=((u=(c=s.floatProperties)==null?void 0:c._CullMode)!=null?u:2)===0,te=this._portTextureTransform(s),J=((d=(h=s.vectorProperties)==null?void 0:h._Color)!=null?d:[1,1,1,1]).map((G,Ae)=>Ae===3?G:Ar(G)),Me=(f=s.textureProperties)==null?void 0:f._MainTex,De=Me!=null?{index:Me,extensions:si({},te)}:void 0,Be=(_=(p=s.floatProperties)==null?void 0:p._BumpScale)!=null?_:1,ve=(g=s.textureProperties)==null?void 0:g._BumpMap,Se=ve!=null?{index:ve,scale:Be,extensions:si({},te)}:void 0,we=((v=(m=s.vectorProperties)==null?void 0:m._EmissionColor)!=null?v:[0,0,0,1]).map(Ar),ut=(y=s.textureProperties)==null?void 0:y._EmissionMap,O=ut!=null?{index:ut,extensions:si({},te)}:void 0,Ce=((E=(x=s.vectorProperties)==null?void 0:x._ShadeColor)!=null?E:[.97,.81,.86,1]).map(Ar),K=(T=s.textureProperties)==null?void 0:T._ShadeTexture,N=K!=null?{index:K,extensions:si({},te)}:void 0;let se=(A=(w=s.floatProperties)==null?void 0:w._ShadeShift)!=null?A:0,ie=(M=(S=s.floatProperties)==null?void 0:S._ShadeToony)!=null?M:.9;ie=Dt.lerp(ie,1,.5+.5*se),se=-se-(1-ie);const Te=(F=(P=s.floatProperties)==null?void 0:P._IndirectLightIntensity)!=null?F:.1,Ze=Te?1-Te:void 0,rt=(B=s.textureProperties)==null?void 0:B._SphereAdd,lt=rt!=null?[1,1,1]:void 0,st=rt!=null?{index:rt}:void 0,Jt=(z=(U=s.floatProperties)==null?void 0:U._RimLightingMix)!=null?z:0,Gn=(k=s.textureProperties)==null?void 0:k._RimTexture,Fi=Gn!=null?{index:Gn,extensions:si({},te)}:void 0,dn=((W=(j=s.vectorProperties)==null?void 0:j._RimColor)!=null?W:[0,0,0,1]).map(Ar),Bi=(oe=(ae=s.floatProperties)==null?void 0:ae._RimFresnelPower)!=null?oe:1,sr=(Xe=(be=s.floatProperties)==null?void 0:be._RimLift)!=null?Xe:0,kt=["none","worldCoordinates","screenCoordinates"][($=(We=s.floatProperties)==null?void 0:We._OutlineWidthMode)!=null?$:0];let Qt=(Le=(pe=s.floatProperties)==null?void 0:pe._OutlineWidth)!=null?Le:0;Qt=.01*Qt;const ki=(me=s.textureProperties)==null?void 0:me._OutlineWidthTexture,ti=ki!=null?{index:ki,extensions:si({},te)}:void 0,rr=((Ke=(Oe=s.vectorProperties)==null?void 0:Oe._OutlineColor)!=null?Ke:[0,0,0]).map(Ar),Jr=((it=(je=s.floatProperties)==null?void 0:je._OutlineColorMode)!=null?it:0)===1?(_e=(le=s.floatProperties)==null?void 0:le._OutlineLightingMix)!=null?_e:1:0,vi=(D=s.textureProperties)==null?void 0:D._UvAnimMaskTexture,us=vi!=null?{index:vi,extensions:si({},te)}:void 0,C=(fe=(ze=s.floatProperties)==null?void 0:ze._UvAnimScrollX)!=null?fe:0;let H=(xe=(Ue=s.floatProperties)==null?void 0:Ue._UvAnimScrollY)!=null?xe:0;H!=null&&(H=-H);const Z=(Pe=($e=s.floatProperties)==null?void 0:$e._UvAnimRotation)!=null?Pe:0,Y={specVersion:"1.0",transparentWithZWrite:q,renderQueueOffsetNumber:ee,shadeColorFactor:Ce,shadeMultiplyTexture:N,shadingShiftFactor:se,shadingToonyFactor:ie,giEqualizationFactor:Ze,matcapFactor:lt,matcapTexture:st,rimLightingMixFactor:Jt,rimMultiplyTexture:Fi,parametricRimColorFactor:dn,parametricRimFresnelPowerFactor:Bi,parametricRimLiftFactor:sr,outlineWidthMode:kt,outlineWidthFactor:Qt,outlineWidthMultiplyTexture:ti,outlineColorFactor:rr,outlineLightingMixFactor:Jr,uvAnimationMaskTexture:us,uvAnimationScrollXSpeedFactor:C,uvAnimationScrollYSpeedFactor:H,uvAnimationRotationSpeedFactor:Z};return Np(si({},e),{pbrMetallicRoughness:{baseColorFactor:J,baseColorTexture:De},normalTexture:Se,emissiveTexture:O,emissiveFactor:we,alphaMode:V,alphaCutoff:de,doubleSided:Ee,extensions:{VRMC_materials_mtoon:Y}})}_parseV0UnlitProperties(s,e){var t,n,i,r,o;const a=s.shader==="VRM/UnlitTransparentZWrite",l=s.shader==="VRM/UnlitTransparent"||a,c=this._v0ParseRenderQueue(s),u=s.shader==="VRM/UnlitCutout",h=l?"BLEND":u?"MASK":"OPAQUE",d=u?(n=(t=s.floatProperties)==null?void 0:t._Cutoff)!=null?n:.5:void 0,f=this._portTextureTransform(s),p=((r=(i=s.vectorProperties)==null?void 0:i._Color)!=null?r:[1,1,1,1]).map(Ar),_=(o=s.textureProperties)==null?void 0:o._MainTex,g=_!=null?{index:_,extensions:si({},f)}:void 0,m={specVersion:"1.0",transparentWithZWrite:a,renderQueueOffsetNumber:c,shadeColorFactor:p,shadeMultiplyTexture:g};return Np(si({},e),{pbrMetallicRoughness:{baseColorFactor:p,baseColorTexture:g},alphaMode:h,alphaCutoff:d,extensions:{VRMC_materials_mtoon:m}})}_portTextureTransform(s){var e,t,n,i,r;const o=(e=s.vectorProperties)==null?void 0:e._MainTex;if(o==null)return{};const a=[(t=o?.[0])!=null?t:0,(n=o?.[1])!=null?n:0],l=[(i=o?.[2])!=null?i:1,(r=o?.[3])!=null?r:1];return a[1]=1-l[1]-a[1],{KHR_texture_transform:{offset:a,scale:l}}}_v0ParseRenderQueue(s){var e,t;const n=s.shader==="VRM/UnlitTransparentZWrite",i=((e=s.keywordMap)==null?void 0:e._ALPHABLEND_ON)!=null||s.shader==="VRM/UnlitTransparent"||n,r=((t=s.floatProperties)==null?void 0:t._ZWrite)===1||n;let o=0;if(i){const a=s.renderQueue;a!=null&&(r?o=this._renderQueueMapTransparentZWrite.get(a):o=this._renderQueueMapTransparent.get(a))}return o}_populateRenderQueueMap(s){const e=new Set,t=new Set;s.forEach(n=>{var i,r;const o=n.shader==="VRM/UnlitTransparentZWrite",a=((i=n.keywordMap)==null?void 0:i._ALPHABLEND_ON)!=null||n.shader==="VRM/UnlitTransparent"||o,l=((r=n.floatProperties)==null?void 0:r._ZWrite)===1||o;if(a){const c=n.renderQueue;c!=null&&(l?t.add(c):e.add(c))}}),e.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${e.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),t.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${t.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(e).sort().forEach((n,i)=>{const r=Math.min(Math.max(i-e.size+1,-9),0);this._renderQueueMapTransparent.set(n,r)}),Array.from(t).sort().forEach((n,i)=>{const r=Math.min(Math.max(i,0),9);this._renderQueueMapTransparentZWrite.set(n,r)})}},Op=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),$i=new b,Au=class extends Ge{constructor(s){super(),this._attrPosition=new Je(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(Bm);const e=new qe;e.setAttribute("position",this._attrPosition);const t=new Yt({color:16711935,depthTest:!1,depthWrite:!1});this._line=new mi(e,t),this.add(this._line),this.constraint=s}updateMatrixWorld(s){$i.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,$i.x,$i.y,$i.z),this.constraint.source&&$i.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,$i.x,$i.y,$i.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(s)}};function Fp(s,e){return e.set(s.elements[12],s.elements[13],s.elements[14])}var T1=new b,A1=new b;function E1(s,e){return s.decompose(T1,e,A1),e}function Yl(s){return s.invert?s.invert():s.inverse(),s}var dd=class{constructor(s,e){this.destination=s,this.source=e,this.weight=1}},R1=new b,C1=new b,P1=new b,I1=new Qe,L1=new Qe,U1=new Qe,D1=class extends dd{get aimAxis(){return this._aimAxis}set aimAxis(s){this._aimAxis=s,this._v3AimAxis.set(s==="PositiveX"?1:s==="NegativeX"?-1:0,s==="PositiveY"?1:s==="NegativeY"?-1:0,s==="PositiveZ"?1:s==="NegativeZ"?-1:0)}get dependencies(){const s=new Set([this.source]);return this.destination.parent&&s.add(this.destination.parent),s}constructor(s,e){super(s,e),this._aimAxis="PositiveX",this._v3AimAxis=new b(1,0,0),this._dstRestQuat=new Qe}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);const s=I1.identity(),e=L1.identity();this.destination.parent&&(E1(this.destination.parent.matrixWorld,s),Yl(e.copy(s)));const t=R1.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(s),n=Fp(this.source.matrixWorld,C1).sub(Fp(this.destination.matrixWorld,P1)).normalize(),i=U1.setFromUnitVectors(t,n).premultiply(e).multiply(s).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(i,this.weight)}};function N1(s,e){const t=[s];let n=s.parent;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(i=>{e(i)})}var O1=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(s){this._constraints.add(s);let e=this._objectConstraintsMap.get(s.destination);e==null&&(e=new Set,this._objectConstraintsMap.set(s.destination,e)),e.add(s)}deleteConstraint(s){this._constraints.delete(s),this._objectConstraintsMap.get(s.destination).delete(s)}setInitState(){const s=new Set,e=new Set;for(const t of this._constraints)this._processConstraint(t,s,e,n=>n.setInitState())}update(){const s=new Set,e=new Set;for(const t of this._constraints)this._processConstraint(t,s,e,n=>n.update())}_processConstraint(s,e,t,n){if(t.has(s))return;if(e.has(s))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");e.add(s);const i=s.dependencies;for(const r of i)N1(r,o=>{const a=this._objectConstraintsMap.get(o);if(a)for(const l of a)this._processConstraint(l,e,t,n)});n(s),t.add(s)}},F1=new Qe,B1=new Qe,k1=class extends dd{get dependencies(){return new Set([this.source])}constructor(s,e){super(s,e),this._dstRestQuat=new Qe,this._invSrcRestQuat=new Qe}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),Yl(this._invSrcRestQuat.copy(this.source.quaternion))}update(){const s=F1.copy(this._invSrcRestQuat).multiply(this.source.quaternion),e=B1.copy(this._dstRestQuat).multiply(s);this.destination.quaternion.copy(this._dstRestQuat).slerp(e,this.weight)}},z1=new b,V1=new Qe,H1=new Qe,G1=class extends dd{get rollAxis(){return this._rollAxis}set rollAxis(s){this._rollAxis=s,this._v3RollAxis.set(s==="X"?1:0,s==="Y"?1:0,s==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(s,e){super(s,e),this._rollAxis="X",this._v3RollAxis=new b(1,0,0),this._dstRestQuat=new Qe,this._invDstRestQuat=new Qe,this._invSrcRestQuatMulDstRestQuat=new Qe}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),Yl(this._invDstRestQuat.copy(this._dstRestQuat)),Yl(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){const s=V1.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),e=z1.copy(this._v3RollAxis).applyQuaternion(s),n=H1.setFromUnitVectors(e,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(s);this.destination.quaternion.copy(this._dstRestQuat).slerp(n,this.weight)}},W1=new Set(["1.0","1.0-beta"]),a0=class bo{get name(){return bo.EXTENSION_NAME}constructor(e,t){this.parser=e,this.helperRoot=t?.helperRoot}afterRoot(e){return Op(this,null,function*(){e.userData.vrmNodeConstraintManager=yield this._import(e)})}_import(e){return Op(this,null,function*(){var t;const n=this.parser.json;if(!(((t=n.extensionsUsed)==null?void 0:t.indexOf(bo.EXTENSION_NAME))!==-1))return null;const r=new O1,o=yield this.parser.getDependencies("node");return o.forEach((a,l)=>{var c;const u=n.nodes[l],h=(c=u?.extensions)==null?void 0:c[bo.EXTENSION_NAME];if(h==null)return;const d=h.specVersion;if(!W1.has(d)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${bo.EXTENSION_NAME} specVersion "${d}"`);return}const f=h.constraint;if(f.roll!=null){const p=this._importRollConstraint(a,o,f.roll);r.addConstraint(p)}else if(f.aim!=null){const p=this._importAimConstraint(a,o,f.aim);r.addConstraint(p)}else if(f.rotation!=null){const p=this._importRotationConstraint(a,o,f.rotation);r.addConstraint(p)}}),e.scene.updateMatrixWorld(),r.setInitState(),r})}_importRollConstraint(e,t,n){const{source:i,rollAxis:r,weight:o}=n,a=t[i],l=new G1(e,a);if(r!=null&&(l.rollAxis=r),o!=null&&(l.weight=o),this.helperRoot){const c=new Au(l);this.helperRoot.add(c)}return l}_importAimConstraint(e,t,n){const{source:i,aimAxis:r,weight:o}=n,a=t[i],l=new D1(e,a);if(r!=null&&(l.aimAxis=r),o!=null&&(l.weight=o),this.helperRoot){const c=new Au(l);this.helperRoot.add(c)}return l}_importRotationConstraint(e,t,n){const{source:i,weight:r}=n,o=t[i],a=new k1(e,o);if(r!=null&&(a.weight=r),this.helperRoot){const l=new Au(a);this.helperRoot.add(l)}return a}};a0.EXTENSION_NAME="VRMC_node_constraint";var X1=a0,Ka=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),fd=class{},Eu=new b,Es=new b,l0=class extends fd{get type(){return"capsule"}constructor(s){var e,t,n,i;super(),this.offset=(e=s?.offset)!=null?e:new b(0,0,0),this.tail=(t=s?.tail)!=null?t:new b(0,0,0),this.radius=(n=s?.radius)!=null?n:0,this.inside=(i=s?.inside)!=null?i:!1}calculateCollision(s,e,t,n){Eu.setFromMatrixPosition(s),Es.subVectors(this.tail,this.offset).applyMatrix4(s),Es.sub(Eu);const i=Es.lengthSq();n.copy(e).sub(Eu);const r=Es.dot(n);r<=0||(i<=r||Es.multiplyScalar(r/i),n.sub(Es));const o=n.length(),a=this.inside?this.radius-t-o:o-t-this.radius;return a<0&&(n.multiplyScalar(1/o),this.inside&&n.negate()),a}},Ru=new b,Bp=new et,c0=class extends fd{get type(){return"plane"}constructor(s){var e,t;super(),this.offset=(e=s?.offset)!=null?e:new b(0,0,0),this.normal=(t=s?.normal)!=null?t:new b(0,0,1)}calculateCollision(s,e,t,n){n.setFromMatrixPosition(s),n.negate().add(e),Bp.getNormalMatrix(s),Ru.copy(this.normal).applyNormalMatrix(Bp).normalize();const i=n.dot(Ru)-t;return n.copy(Ru),i}},q1=new b,u0=class extends fd{get type(){return"sphere"}constructor(s){var e,t,n;super(),this.offset=(e=s?.offset)!=null?e:new b(0,0,0),this.radius=(t=s?.radius)!=null?t:0,this.inside=(n=s?.inside)!=null?n:!1}calculateCollision(s,e,t,n){n.subVectors(e,q1.setFromMatrixPosition(s));const i=n.length(),r=this.inside?this.radius-t-i:i-t-this.radius;return r<0&&(n.multiplyScalar(1/i),this.inside&&n.negate()),r}},ri=new b,Y1=class extends qe{constructor(s){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new b,this._currentTail=new b,this._shape=s,this._attrPos=new Je(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Je(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;const e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,s=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),s=!0);const t=ri.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(t)>1e-10&&(this._currentTail.copy(t),s=!0),s&&this._buildPosition()}_buildPosition(){ri.copy(this._currentTail).sub(this._currentOffset);const s=ri.length()/this._currentRadius;for(let n=0;n<=16;n++){const i=n/16*Math.PI;this._attrPos.setXYZ(n,-Math.sin(i),-Math.cos(i),0),this._attrPos.setXYZ(17+n,s+Math.sin(i),Math.cos(i),0),this._attrPos.setXYZ(34+n,-Math.sin(i),0,-Math.cos(i)),this._attrPos.setXYZ(51+n,s+Math.sin(i),0,Math.cos(i))}for(let n=0;n<32;n++){const i=n/16*Math.PI;this._attrPos.setXYZ(68+n,0,Math.sin(i),Math.cos(i)),this._attrPos.setXYZ(100+n,s,Math.sin(i),Math.cos(i))}const e=Math.atan2(ri.y,Math.sqrt(ri.x*ri.x+ri.z*ri.z)),t=-Math.atan2(ri.z,ri.x);this.rotateZ(e),this.rotateY(t),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<34;s++){const e=(s+1)%34;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(68+s*2,34+s,34+e)}for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(136+s*2,68+s,68+e),this._attrIndex.setXY(200+s*2,100+s,100+e)}this._attrIndex.needsUpdate=!0}},j1=class extends qe{constructor(s){super(),this.worldScale=1,this._currentOffset=new b,this._currentNormal=new b,this._shape=s,this._attrPos=new Je(new Float32Array(18),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Je(new Uint16Array(10),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),s=!0),this._currentNormal.equals(this._shape.normal)||(this._currentNormal.copy(this._shape.normal),s=!0),s&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,-.5,-.5,0),this._attrPos.setXYZ(1,.5,-.5,0),this._attrPos.setXYZ(2,.5,.5,0),this._attrPos.setXYZ(3,-.5,.5,0),this._attrPos.setXYZ(4,0,0,0),this._attrPos.setXYZ(5,0,0,.25),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this.lookAt(this._currentNormal),this._attrPos.needsUpdate=!0}_buildIndex(){this._attrIndex.setXY(0,0,1),this._attrIndex.setXY(2,1,2),this._attrIndex.setXY(4,2,3),this._attrIndex.setXY(6,3,0),this._attrIndex.setXY(8,4,5),this._attrIndex.needsUpdate=!0}},Z1=class extends qe{constructor(s){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new b,this._shape=s,this._attrPos=new Je(new Float32Array(288),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Je(new Uint16Array(192),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;const e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,s=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),s=!0),s&&this._buildPosition()}_buildPosition(){for(let s=0;s<32;s++){const e=s/16*Math.PI;this._attrPos.setXYZ(s,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+s,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+s,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(64+s*2,32+s,32+e),this._attrIndex.setXY(128+s*2,64+s,64+e)}this._attrIndex.needsUpdate=!0}},$1=new b,Cu=class extends Ge{constructor(s){if(super(),this.matrixAutoUpdate=!1,this.collider=s,this.collider.shape instanceof u0)this._geometry=new Z1(this.collider.shape);else if(this.collider.shape instanceof l0)this._geometry=new Y1(this.collider.shape);else if(this.collider.shape instanceof c0)this._geometry=new j1(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");const e=new Yt({color:16711935,depthTest:!1,depthWrite:!1});this._line=new wn(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(s){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);const e=this.matrix.elements;this._geometry.worldScale=$1.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(s)}},K1=class extends qe{constructor(s){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new b,this._springBone=s,this._attrPos=new Je(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Je(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;const e=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,s=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),s=!0),s&&this._buildPosition()}_buildPosition(){for(let s=0;s<32;s++){const e=s/16*Math.PI;this._attrPos.setXYZ(s,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+s,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+s,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(64+s*2,32+s,32+e),this._attrIndex.setXY(128+s*2,64+s,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},J1=new b,Q1=class extends Ge{constructor(s){super(),this.matrixAutoUpdate=!1,this.springBone=s,this._geometry=new K1(this.springBone);const e=new Yt({color:16776960,depthTest:!1,depthWrite:!1});this._line=new wn(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(s){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);const e=this.matrix.elements;this._geometry.worldScale=J1.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(s)}},Pu=class extends pt{constructor(s){super(),this.colliderMatrix=new ke,this.shape=s}updateWorldMatrix(s,e){super.updateWorldMatrix(s,e),eA(this.colliderMatrix,this.matrixWorld,this.shape.offset)}};function eA(s,e,t){const n=e.elements;s.copy(e),t&&(s.elements[12]=n[0]*t.x+n[4]*t.y+n[8]*t.z+n[12],s.elements[13]=n[1]*t.x+n[5]*t.y+n[9]*t.z+n[13],s.elements[14]=n[2]*t.x+n[6]*t.y+n[10]*t.z+n[14])}var tA=new ke;function nA(s){return s.invert?s.invert():s.getInverse(tA.copy(s)),s}var iA=class{constructor(s){this._inverseCache=new ke,this._shouldUpdateInverse=!0,this.matrix=s;const e={set:(t,n,i)=>(this._shouldUpdateInverse=!0,t[n]=i,!0)};this._originalElements=s.elements,s.elements=new Proxy(s.elements,e)}get inverse(){return this._shouldUpdateInverse&&(nA(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}},Iu=new ke,Er=new b,vo=new b,xo=new b,yo=new b,sA=new ke,rA=class{constructor(s,e,t={},n=[]){this._currentTail=new b,this._prevTail=new b,this._boneAxis=new b,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new ke,this._initialLocalRotation=new Qe,this._initialLocalChildPosition=new b;var i,r,o,a,l,c;this.bone=s,this.bone.matrixAutoUpdate=!1,this.child=e,this.settings={hitRadius:(i=t.hitRadius)!=null?i:0,stiffness:(r=t.stiffness)!=null?r:1,gravityPower:(o=t.gravityPower)!=null?o:0,gravityDir:(l=(a=t.gravityDir)==null?void 0:a.clone())!=null?l:new b(0,-1,0),dragForce:(c=t.dragForce)!=null?c:.4},this.colliderGroups=n}get dependencies(){const s=new Set,e=this.bone.parent;e&&s.add(e);for(let t=0;t<this.colliderGroups.length;t++)for(let n=0;n<this.colliderGroups[t].colliders.length;n++)s.add(this.colliderGroups[t].colliders[n]);return s}get center(){return this._center}set center(s){var e;(e=this._center)!=null&&e.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=s,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new iA(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:Iu}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);const s=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(s),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);const s=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(s),this._prevTail.copy(this._currentTail)}update(s){if(s<=0)return;this._calcWorldSpaceBoneLength();const e=vo.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);yo.copy(this._currentTail).add(Er.subVectors(this._currentTail,this._prevTail).multiplyScalar(1-this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(e,this.settings.stiffness*s).addScaledVector(this.settings.gravityDir,this.settings.gravityPower*s),xo.setFromMatrixPosition(this.bone.matrixWorld),yo.sub(xo).normalize().multiplyScalar(this._worldSpaceBoneLength).add(xo),this._collision(yo),this._prevTail.copy(this._currentTail),this._currentTail.copy(yo).applyMatrix4(this._getMatrixWorldToCenter());const t=sA.multiplyMatrices(this._parentMatrixWorld,this._initialLocalMatrix).invert();this.bone.quaternion.setFromUnitVectors(this._boneAxis,Er.copy(yo).applyMatrix4(t).normalize()).premultiply(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(s){for(let e=0;e<this.colliderGroups.length;e++)for(let t=0;t<this.colliderGroups[e].colliders.length;t++){const n=this.colliderGroups[e].colliders[t],i=n.shape.calculateCollision(n.colliderMatrix,s,this.settings.hitRadius,Er);if(i<0){s.addScaledVector(Er,-i),s.sub(xo);const r=s.length();s.multiplyScalar(this._worldSpaceBoneLength/r).add(xo)}}}_calcWorldSpaceBoneLength(){Er.setFromMatrixPosition(this.bone.matrixWorld),this.child?vo.setFromMatrixPosition(this.child.matrixWorld):(vo.copy(this._initialLocalChildPosition),vo.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=Er.sub(vo).length()}_getMatrixCenterToWorld(){return this._center?this._center.matrixWorld:Iu}_getMatrixWorldToCenter(){return this._center?this._center.userData.inverseCacheProxy.inverse:Iu}};function oA(s,e){const t=[];let n=s;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(i=>{e(i)})}function ah(s,e){s.children.forEach(t=>{e(t)||ah(t,e)})}function aA(s){var e;const t=new Map;for(const n of s){let i=n;do{const r=((e=t.get(i))!=null?e:0)+1;if(r===s.size)return i;t.set(i,r),i=i.parent}while(i!==null)}return null}var kp=class{constructor(){this._joints=new Set,this._sortedJoints=[],this._hasWarnedCircularDependency=!1,this._ancestors=[],this._objectSpringBonesMap=new Map,this._isSortedJointsDirty=!1,this._relevantChildrenUpdated=this._relevantChildrenUpdated.bind(this)}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){const s=new Set;return this._joints.forEach(e=>{e.colliderGroups.forEach(t=>{s.add(t)})}),Array.from(s)}get colliders(){const s=new Set;return this.colliderGroups.forEach(e=>{e.colliders.forEach(t=>{s.add(t)})}),Array.from(s)}addJoint(s){this._joints.add(s);let e=this._objectSpringBonesMap.get(s.bone);e==null&&(e=new Set,this._objectSpringBonesMap.set(s.bone,e)),e.add(s),this._isSortedJointsDirty=!0}addSpringBone(s){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(s)}deleteJoint(s){this._joints.delete(s),this._objectSpringBonesMap.get(s.bone).delete(s),this._isSortedJointsDirty=!0}deleteSpringBone(s){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(s)}setInitState(){this._sortJoints();for(let s=0;s<this._sortedJoints.length;s++){const e=this._sortedJoints[s];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.setInitState()}}reset(){this._sortJoints();for(let s=0;s<this._sortedJoints.length;s++){const e=this._sortedJoints[s];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.reset()}}update(s){this._sortJoints();for(let e=0;e<this._ancestors.length;e++)this._ancestors[e].updateWorldMatrix(e===0,!1);for(let e=0;e<this._sortedJoints.length;e++){const t=this._sortedJoints[e];t.bone.updateMatrix(),t.bone.updateWorldMatrix(!1,!1),t.update(s),ah(t.bone,this._relevantChildrenUpdated)}}_sortJoints(){if(!this._isSortedJointsDirty)return;const s=[],e=new Set,t=new Set,n=new Set;for(const r of this._joints)this._insertJointSort(r,e,t,s,n);this._sortedJoints=s;const i=aA(n);this._ancestors=[],i&&(this._ancestors.push(i),ah(i,r=>{var o,a;return((a=(o=this._objectSpringBonesMap.get(r))==null?void 0:o.size)!=null?a:0)>0?!0:(this._ancestors.push(r),!1)})),this._isSortedJointsDirty=!1}_insertJointSort(s,e,t,n,i){if(t.has(s))return;if(e.has(s)){this._hasWarnedCircularDependency||(console.warn("VRMSpringBoneManager: Circular dependency detected"),this._hasWarnedCircularDependency=!0);return}e.add(s);const r=s.dependencies;for(const o of r){let a=!1,l=null;oA(o,c=>{const u=this._objectSpringBonesMap.get(c);if(u)for(const h of u)a=!0,this._insertJointSort(h,e,t,n,i);else a||(l=c)}),l&&i.add(l)}n.push(s),t.add(s)}_relevantChildrenUpdated(s){var e,t;return((t=(e=this._objectSpringBonesMap.get(s))==null?void 0:e.size)!=null?t:0)>0?!0:(s.updateWorldMatrix(!1,!1),!1)}},zp="VRMC_springBone_extended_collider",lA=new Set(["1.0","1.0-beta"]),cA=new Set(["1.0"]),h0=class Cr{get name(){return Cr.EXTENSION_NAME}constructor(e,t){var n;this.parser=e,this.jointHelperRoot=t?.jointHelperRoot,this.colliderHelperRoot=t?.colliderHelperRoot,this.useExtendedColliders=(n=t?.useExtendedColliders)!=null?n:!0}afterRoot(e){return Ka(this,null,function*(){e.userData.vrmSpringBoneManager=yield this._import(e)})}_import(e){return Ka(this,null,function*(){const t=yield this._v1Import(e);if(t!=null)return t;const n=yield this._v0Import(e);return n??null})}_v1Import(e){return Ka(this,null,function*(){var t,n,i,r,o;const a=e.parser.json;if(!(((t=a.extensionsUsed)==null?void 0:t.indexOf(Cr.EXTENSION_NAME))!==-1))return null;const c=new kp,u=yield e.parser.getDependencies("node"),h=(n=a.extensions)==null?void 0:n[Cr.EXTENSION_NAME];if(!h)return null;const d=h.specVersion;if(!lA.has(d))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Cr.EXTENSION_NAME} specVersion "${d}"`),null;const f=(i=h.colliders)==null?void 0:i.map((_,g)=>{var m,v,y,x,E,T,w,A,S,M,P,F,B,U,z;const k=u[_.node];if(k==null)return console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} attempted to reference a node #${_.node} but not found. Skipping the collider`),null;const j=_.shape,W=(m=_.extensions)==null?void 0:m[zp];if(this.useExtendedColliders&&W!=null){const ae=W.specVersion;if(!cA.has(ae))console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${zp} specVersion "${ae}". Fallbacking to the ${Cr.EXTENSION_NAME} definition`);else{const oe=W.shape;if(oe.sphere)return this._importSphereCollider(k,{offset:new b().fromArray((v=oe.sphere.offset)!=null?v:[0,0,0]),radius:(y=oe.sphere.radius)!=null?y:0,inside:(x=oe.sphere.inside)!=null?x:!1});if(oe.capsule)return this._importCapsuleCollider(k,{offset:new b().fromArray((E=oe.capsule.offset)!=null?E:[0,0,0]),radius:(T=oe.capsule.radius)!=null?T:0,tail:new b().fromArray((w=oe.capsule.tail)!=null?w:[0,0,0]),inside:(A=oe.capsule.inside)!=null?A:!1});if(oe.plane)return this._importPlaneCollider(k,{offset:new b().fromArray((S=oe.plane.offset)!=null?S:[0,0,0]),normal:new b().fromArray((M=oe.plane.normal)!=null?M:[0,0,1])})}}if(j.sphere)return this._importSphereCollider(k,{offset:new b().fromArray((P=j.sphere.offset)!=null?P:[0,0,0]),radius:(F=j.sphere.radius)!=null?F:0,inside:!1});if(j.capsule)return this._importCapsuleCollider(k,{offset:new b().fromArray((B=j.capsule.offset)!=null?B:[0,0,0]),radius:(U=j.capsule.radius)!=null?U:0,tail:new b().fromArray((z=j.capsule.tail)!=null?z:[0,0,0]),inside:!1});console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} has no valid shape. Skipping the collider`)}),p=(r=h.colliderGroups)==null?void 0:r.map((_,g)=>{var m;return{colliders:((m=_.colliders)!=null?m:[]).map(y=>{const x=f?.[y];return x??(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${g} attempted to reference a collider #${y} but not found. Skipping the collider`),null)}).filter(y=>y!=null),name:_.name}});return(o=h.springs)==null||o.forEach((_,g)=>{var m;const v=_.joints,y=(m=_.colliderGroups)==null?void 0:m.map(T=>{const w=p?.[T];return w??(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${g} attempted to reference a collider group #${T} but not found. Skipping the collider group`),null)}).filter(T=>T!=null),x=_.center!=null?u[_.center]:void 0;let E;v.forEach(T=>{if(E){const w=E.node,A=u[w],S=T.node,M=u[S],P={hitRadius:E.hitRadius,dragForce:E.dragForce,gravityPower:E.gravityPower,stiffness:E.stiffness,gravityDir:E.gravityDir!=null?new b().fromArray(E.gravityDir):void 0},F=this._importJoint(A,M,P,y);x&&(F.center=x),c.addJoint(F)}E=T})}),c.setInitState(),c})}_v0Import(e){return Ka(this,null,function*(){var t,n,i;const r=e.parser.json;if(!(((t=r.extensionsUsed)==null?void 0:t.indexOf("VRM"))!==-1))return null;const a=(n=r.extensions)==null?void 0:n.VRM,l=a?.secondaryAnimation;if(!l)return null;const c=l?.boneGroups;if(!c)return null;const u=new kp,h=yield e.parser.getDependencies("node"),d=(i=l.colliderGroups)==null?void 0:i.map((f,p)=>{var _;const g=h[f.node];return g==null?(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${p} attempted to reference a node #${f.node} but not found. Skipping the collider group`),null):{colliders:((_=f.colliders)!=null?_:[]).map((v,y)=>{var x,E,T;const w=new b(0,0,0);return v.offset&&w.set((x=v.offset.x)!=null?x:0,(E=v.offset.y)!=null?E:0,v.offset.z?-v.offset.z:0),this._importSphereCollider(g,{offset:w,radius:(T=v.radius)!=null?T:0,inside:!1})})}});return c?.forEach((f,p)=>{const _=f.bones;_&&_.forEach(g=>{var m,v,y,x;const E=h[g];if(E==null){console.warn(`VRMSpringBoneLoaderPlugin: The spring bone group #${p} attempted to reference a node #${g} but not found. Skipping the node`);return}const T=new b;f.gravityDir?T.set((m=f.gravityDir.x)!=null?m:0,(v=f.gravityDir.y)!=null?v:0,(y=f.gravityDir.z)!=null?y:0):T.set(0,-1,0);const w=f.center!=null?h[f.center]:void 0,A={hitRadius:f.hitRadius,dragForce:f.dragForce,gravityPower:f.gravityPower,stiffness:f.stiffiness,gravityDir:T},S=(x=f.colliderGroups)==null?void 0:x.map(M=>{const P=d?.[M];return P??(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${p} attempted to reference a collider group #${M} but not found. Skipping the collider group`),null)}).filter(M=>M!=null);E.traverse(M=>{var P;const F=(P=M.children[0])!=null?P:null,B=this._importJoint(M,F,A,S);w&&(B.center=w),u.addJoint(B)})})}),e.scene.updateMatrixWorld(),u.setInitState(),u})}_importJoint(e,t,n,i){const r=new rA(e,t,n,i);if(this.jointHelperRoot){const o=new Q1(r);this.jointHelperRoot.add(o),o.renderOrder=this.jointHelperRoot.renderOrder}return r}_importSphereCollider(e,t){const n=new u0(t),i=new Pu(n);if(e.add(i),this.colliderHelperRoot){const r=new Cu(i);this.colliderHelperRoot.add(r),r.renderOrder=this.colliderHelperRoot.renderOrder}return i}_importCapsuleCollider(e,t){const n=new l0(t),i=new Pu(n);if(e.add(i),this.colliderHelperRoot){const r=new Cu(i);this.colliderHelperRoot.add(r),r.renderOrder=this.colliderHelperRoot.renderOrder}return i}_importPlaneCollider(e,t){const n=new c0(t),i=new Pu(n);if(e.add(i),this.colliderHelperRoot){const r=new Cu(i);this.colliderHelperRoot.add(r),r.renderOrder=this.colliderHelperRoot.renderOrder}return i}};h0.EXTENSION_NAME="VRMC_springBone";var uA=h0,hA=class{get name(){return"VRMLoaderPlugin"}constructor(s,e){var t,n,i,r,o,a,l,c,u,h;this.parser=s;const d=e?.helperRoot,f=e?.autoUpdateHumanBones;this.expressionPlugin=(t=e?.expressionPlugin)!=null?t:new ET(s),this.firstPersonPlugin=(n=e?.firstPersonPlugin)!=null?n:new CT(s),this.humanoidPlugin=(i=e?.humanoidPlugin)!=null?i:new OT(s,{helperRoot:d,autoUpdateHumanBones:f}),this.lookAtPlugin=(r=e?.lookAtPlugin)!=null?r:new KT(s,{helperRoot:d}),this.metaPlugin=(o=e?.metaPlugin)!=null?o:new e1(s),this.mtoonMaterialPlugin=(a=e?.mtoonMaterialPlugin)!=null?a:new m1(s),this.materialsHDREmissiveMultiplierPlugin=(l=e?.materialsHDREmissiveMultiplierPlugin)!=null?l:new _1(s),this.materialsV0CompatPlugin=(c=e?.materialsV0CompatPlugin)!=null?c:new b1(s),this.springBonePlugin=(u=e?.springBonePlugin)!=null?u:new uA(s,{colliderHelperRoot:d,jointHelperRoot:d}),this.nodeConstraintPlugin=(h=e?.nodeConstraintPlugin)!=null?h:new X1(s,{helperRoot:d})}beforeRoot(){return ja(this,null,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(s){return ja(this,null,function*(){return yield this.mtoonMaterialPlugin.loadMesh(s)})}getMaterialType(s){const e=this.mtoonMaterialPlugin.getMaterialType(s);return e??null}extendMaterialParams(s,e){return ja(this,null,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(s,e),yield this.mtoonMaterialPlugin.extendMaterialParams(s,e)})}afterRoot(s){return ja(this,null,function*(){yield this.metaPlugin.afterRoot(s),yield this.humanoidPlugin.afterRoot(s),yield this.expressionPlugin.afterRoot(s),yield this.lookAtPlugin.afterRoot(s),yield this.firstPersonPlugin.afterRoot(s),yield this.springBonePlugin.afterRoot(s),yield this.nodeConstraintPlugin.afterRoot(s),yield this.mtoonMaterialPlugin.afterRoot(s);const e=s.userData.vrmMeta,t=s.userData.vrmHumanoid;if(e&&t){const n=new n1({scene:s.scene,expressionManager:s.userData.vrmExpressionManager,firstPerson:s.userData.vrmFirstPerson,humanoid:t,lookAt:s.userData.vrmLookAt,meta:e,materials:s.userData.vrmMToonMaterials,springBoneManager:s.userData.vrmSpringBoneManager,nodeConstraintManager:s.userData.vrmNodeConstraintManager});s.userData.vrm=n}})}};function dA(s){const e=new Set;return s.traverse(t=>{if(!t.isMesh)return;const n=t;e.add(n)}),e}function Vp(s,e,t){if(e.size===1){const o=e.values().next().value;if(o.weight===1)return s[o.index]}const n=new Float32Array(s[0].count*3);let i=0;if(t)i=1;else for(const o of e)i+=o.weight;for(const o of e){const a=s[o.index],l=o.weight/i;for(let c=0;c<a.count;c++)n[c*3+0]+=a.getX(c)*l,n[c*3+1]+=a.getY(c)*l,n[c*3+2]+=a.getZ(c)*l}return new Je(n,3)}function fA(s){var e;const t=dA(s.scene),n=new Map,i=(e=s.expressionManager)==null?void 0:e.expressionMap;if(i!=null)for(const[r,o]of Object.entries(i)){const a=new Set;for(const l of o.binds)if(l instanceof ql){if(l.weight!==0)for(const c of l.primitives){let u=n.get(c);u==null&&(u=new Map,n.set(c,u));let h=u.get(r);h==null&&(h=new Set,u.set(r,h)),h.add(l)}a.add(l)}for(const l of a)o.deleteBind(l)}for(const r of t){const o=n.get(r);if(o==null)continue;const a=r.geometry.morphAttributes;r.geometry.morphAttributes={};const l=r.geometry.clone();r.geometry=l;const c=l.morphTargetsRelative,u=a.position!=null,h=a.normal!=null,d={},f={},p=[];if(u||h){u&&(d.position=[]),h&&(d.normal=[]);let _=0;for(const[g,m]of o)u&&(d.position[_]=Vp(a.position,m,c)),h&&(d.normal[_]=Vp(a.normal,m,c)),i?.[g].addBind(new ql({index:_,weight:1,primitives:[r]})),f[g]=_,p.push(0),_++}l.morphAttributes=d,r.morphTargetDictionary=f,r.morphTargetInfluences=p}}function jl(s,e,t){if(s.getComponent)return s.getComponent(e,t);{let n=s.array[e*s.itemSize+t];return s.normalized&&(n=Dt.denormalize(n,s.array)),n}}function d0(s,e,t,n){s.setComponent?s.setComponent(e,t,n):(s.normalized&&(n=Dt.normalize(n,s.array)),s.array[e*s.itemSize+t]=n)}function pA(s){var e;const t=mA(s),n=new Set;for(const h of t)n.has(h.geometry)&&(h.geometry=MA(h.geometry)),n.add(h.geometry);const i=new Map;for(const h of n){const d=h.getAttribute("skinIndex"),f=(e=i.get(d))!=null?e:new Map;i.set(d,f);const p=h.getAttribute("skinWeight"),_=gA(d,p);f.set(p,_)}const r=new Map;for(const h of t){const d=_A(h,i);r.set(h,d)}const o=[];for(const[h,d]of r){let f=!1;for(const p of o)if(vA(d,p.boneInverseMap)){f=!0,p.meshes.add(h);for(const[g,m]of d)p.boneInverseMap.set(g,m);break}f||o.push({boneInverseMap:d,meshes:new Set([h])})}const a=new Map,l=new Lu,c=new Lu,u=new Lu;for(const h of o){const{boneInverseMap:d,meshes:f}=h,p=Array.from(d.keys()),_=Array.from(d.values()),g=new as(p,_),m=c.getOrCreate(g);for(const v of f){const y=v.geometry.getAttribute("skinIndex"),x=l.getOrCreate(y),E=v.skeleton.bones,T=E.map(S=>u.getOrCreate(S)).join(","),w=`${x};${m};${T}`;let A=a.get(w);A==null&&(A=y.clone(),xA(A,E,p),a.set(w,A)),v.geometry.setAttribute("skinIndex",A)}for(const v of f)v.bind(g,new ke)}}function mA(s){const e=new Set;return s.traverse(t=>{if(!t.isSkinnedMesh)return;const n=t;e.add(n)}),e}function gA(s,e){const t=new Set;for(let n=0;n<s.count;n++)for(let i=0;i<s.itemSize;i++){const r=jl(s,n,i);jl(e,n,i)!==0&&t.add(r)}return t}function _A(s,e){const t=new Map,n=s.skeleton,i=s.geometry,r=i.getAttribute("skinIndex"),o=i.getAttribute("skinWeight"),a=e.get(r),l=a?.get(o);if(!l)throw new Error("Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute.");for(const c of l)t.set(n.bones[c],n.boneInverses[c]);return t}function vA(s,e){for(const[t,n]of s.entries()){const i=e.get(t);if(i!=null&&!yA(n,i))return!1}return!0}function xA(s,e,t){const n=new Map;for(const r of e)n.set(r,n.size);const i=new Map;for(const[r,o]of t.entries()){const a=n.get(o);i.set(a,r)}for(let r=0;r<s.count;r++)for(let o=0;o<s.itemSize;o++){const a=jl(s,r,o),l=i.get(a);d0(s,r,o,l)}s.needsUpdate=!0}function yA(s,e,t){if(t=t||1e-4,s.elements.length!=e.elements.length)return!1;for(let n=0,i=s.elements.length;n<i;n++)if(Math.abs(s.elements[n]-e.elements[n])>t)return!1;return!0}var Lu=class{constructor(){this._objectIndexMap=new Map,this._index=0}get(s){return this._objectIndexMap.get(s)}getOrCreate(s){let e=this._objectIndexMap.get(s);return e==null&&(e=this._index,this._objectIndexMap.set(s,e),this._index++),e}};function MA(s){var e,t,n,i;const r=new qe;r.name=s.name,r.setIndex(s.index);for(const[o,a]of Object.entries(s.attributes))r.setAttribute(o,a);for(const[o,a]of Object.entries(s.morphAttributes)){const l=o;r.morphAttributes[l]=a.concat()}r.morphTargetsRelative=s.morphTargetsRelative,r.groups=[];for(const o of s.groups)r.addGroup(o.start,o.count,o.materialIndex);return r.boundingSphere=(t=(e=s.boundingSphere)==null?void 0:e.clone())!=null?t:null,r.boundingBox=(i=(n=s.boundingBox)==null?void 0:n.clone())!=null?i:null,r.drawRange.start=s.drawRange.start,r.drawRange.count=s.drawRange.count,r.userData=s.userData,r}function Hp(s){if(Object.values(s).forEach(e=>{e?.isTexture&&e.dispose()}),s.isShaderMaterial){const e=s.uniforms;e&&Object.values(e).forEach(t=>{const n=t.value;n?.isTexture&&n.dispose()})}s.dispose()}function SA(s){const e=s.geometry;e&&e.dispose();const t=s.skeleton;t&&t.dispose();const n=s.material;n&&(Array.isArray(n)?n.forEach(i=>Hp(i)):n&&Hp(n))}function wA(s){s.traverse(SA)}function bA(s,e){var t,n;console.warn("VRMUtils.removeUnnecessaryJoints: removeUnnecessaryJoints is deprecated. Use combineSkeletons instead. combineSkeletons contributes more to the performance improvement. This function will be removed in the next major version.");const i=(t=e?.experimentalSameBoneCounts)!=null?t:!1,r=[];s.traverse(l=>{l.type==="SkinnedMesh"&&r.push(l)});const o=new Map;let a=0;for(const l of r){const u=l.geometry.getAttribute("skinIndex");if(o.has(u))continue;const h=new Map,d=new Map;for(let f=0;f<u.count;f++)for(let p=0;p<u.itemSize;p++){const _=jl(u,f,p);let g=h.get(_);g==null&&(g=h.size,h.set(_,g),d.set(g,_)),d0(u,f,p,g)}u.needsUpdate=!0,o.set(u,d),a=Math.max(a,h.size)}for(const l of r){const u=l.geometry.getAttribute("skinIndex"),h=o.get(u),d=[],f=[],p=i?a:h.size;for(let g=0;g<p;g++){const m=(n=h.get(g))!=null?n:0;d.push(l.skeleton.bones[m]),f.push(l.skeleton.boneInverses[m])}const _=new as(d,f);l.bind(_,new ke)}}function TA(s,e){const t=s.position.count,n=new Array(t);let i=0;const r=e.array;for(let o=0;o<r.length;o++){const a=r[o];n[a]||(n[a]=!0,i++)}return{isVertexUsed:n,vertexCount:t,verticesUsed:i}}function AA(s){const e=[],t=[];let n=0;for(let i=0;i<s.length;i++)if(s[i]){const r=n++;e[i]=r,t[r]=i}return{originalIndexNewIndexMap:e,newIndexOriginalIndexMap:t}}function EA(s,e){var t,n,i,r;e.name=s.name,e.morphTargetsRelative=s.morphTargetsRelative,s.groups.forEach(o=>{e.addGroup(o.start,o.count,o.materialIndex)}),e.boundingBox=(n=(t=s.boundingBox)==null?void 0:t.clone())!=null?n:null,e.boundingSphere=(r=(i=s.boundingSphere)==null?void 0:i.clone())!=null?r:null,e.setDrawRange(s.drawRange.start,s.drawRange.count),e.userData=s.userData}function RA(s,e,t){const n=e.array,i=new n.constructor(n.length);for(let r=0;r<n.length;r++){const o=n[r];i[r]=t[o]}s.setIndex(new Je(i,e.itemSize,e.normalized))}function Zl(s,e,t){const n=s.constructor,i=new n(e.length*t);let r=!0;for(let o=0;o<e.length;o++){const l=e[o]*t,c=o*t;for(let u=0;u<t;u++){const h=s[l+u];i[c+u]=h,r=r&&h===0}}return[i,r]}function CA(s){var e;const t=new Map,n=[];for(const[i,r]of Object.entries(s))if(r.isInterleavedBufferAttribute){const o=r,a=o.data,l=(e=t.get(a))!=null?e:[];t.set(a,l),l.push([i,o])}else{const o=r;n.push([i,o])}return[t,n]}function PA(s,e,t){const[n,i]=CA(e);for(const[r,o]of n){const a=r.array,{stride:l}=r,[c]=Zl(a,t,l),u=new tr(c,l);u.setUsage(r.usage);for(const[h,d]of o){const{itemSize:f,offset:p,normalized:_}=d,g=new pi(u,f,p,_);s.setAttribute(h,g)}}for(const[r,o]of i){const a=o.array,{itemSize:l,normalized:c}=o,[u]=Zl(a,t,l);s.setAttribute(r,new Je(u,l,c))}}function IA(s){var e;const t=new Map,n=[];for(const[i,r]of Object.entries(s)){const o=i;for(let a=0;a<r.length;a++){const l=r[a];if(l.isInterleavedBufferAttribute){const c=l,u=c.data,h=(e=t.get(u))!=null?e:[];t.set(u,h),h.push([o,a,c])}else{const c=l;n.push([o,a,c])}}}return[t,n]}function LA(s,e,t){var n,i;let r=!0;const[o,a]=IA(e),l={};for(const[c,u]of o){const h=c.array,{stride:d}=c,[f,p]=Zl(h,t,d);r=r&&p;const _=new tr(f,d);_.setUsage(c.usage);for(const[g,m,v]of u){const{itemSize:y,offset:x,normalized:E}=v,T=new pi(_,y,x,E);(n=l[g])!=null||(l[g]=[]),l[g][m]=T}}for(const[c,u,h]of a){const d=h,f=d.array,{itemSize:p,normalized:_}=d,[g,m]=Zl(f,t,p);r=r&&m,(i=l[c])!=null||(l[c]=[]),l[c][u]=new Je(g,p,_)}s.morphAttributes=r?{}:l}function UA(s){const e=new Map;s.traverse(t=>{if(!t.isMesh)return;const n=t,i=n.geometry,r=i.index;if(r==null)return;const o=e.get(i);if(o!=null){n.geometry=o;return}const{isVertexUsed:a,vertexCount:l,verticesUsed:c}=TA(i.attributes,r);if(c===l)return;const{originalIndexNewIndexMap:u,newIndexOriginalIndexMap:h}=AA(a),d=new qe;EA(i,d),e.set(i,d),RA(d,r,u),PA(d,i.attributes,h),LA(d,i.morphAttributes,h),n.geometry=d}),Array.from(e.keys()).forEach(t=>{t.dispose()})}function DA(s){var e;((e=s.meta)==null?void 0:e.metaVersion)==="0"&&(s.scene.rotation.y=Math.PI)}var ci=class{constructor(){}};ci.combineMorphs=fA;ci.combineSkeletons=pA;ci.deepDispose=wA;ci.removeUnnecessaryJoints=bA;ci.removeUnnecessaryVertices=UA;ci.rotateVRM0=DA;/*!
 * @pixiv/three-vrm-core v3.5.5
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 *//*!
 * @pixiv/three-vrm-materials-mtoon v3.5.5
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 *//*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.5.5
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 *//*!
 * @pixiv/three-vrm-materials-v0compat v3.5.5
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 *//*!
 * @pixiv/three-vrm-node-constraint v3.5.5
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 *//*!
 * @pixiv/three-vrm-springbone v3.5.5
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */const NA={mau:"_mau",macDinh:{height:1.6,yOffset:0},vuKhiMacDinh:{sword:"kiem-sat-lu-khach",great:"dai-kiem-xom-mo",spear:"thuong-go-lim",bow:"cung-tre-dau-lang",cat:"vo-chep-thay-do"},camVuKhi:{sword:{bone:"rightHand",pos:[-.07,-.02,.12],rot:[90,0,0],scale:.75},great:{bone:"rightHand",pos:[-.07,-.02,.2],rot:[90,0,0],scale:.85},spear:{bone:"rightHand",pos:[-.07,-.02,.45],rot:[90,0,0],scale:.9},bow:{bone:"leftHand",pos:[.07,0,0],rot:[0,0,90],scale:.85},cat:{bone:"rightHand",pos:[-.08,.08,0],rot:[0,0,0],scale:.6}},hoatAnh:{sword:{stand:"swordIdle",atk:["sword1","sword2","sword3"],charge:"cast",skill:"skill",burst:"burst",speed:1},great:{stand:"swordIdle",atk:["great1","great2","great3"],charge:"cast",skill:"skill",burst:"burst",speed:.75},spear:{stand:"idle",atk:["spear1","spear2","spear3"],charge:"cast",skill:"skill",burst:"burst",speed:1},bow:{stand:"idle",atk:["bow1","bow2","bow3"],charge:"bowAim",skill:"skill",burst:"bowBurst",speed:1},cat:{stand:"idle",atk:["cat1","cat2","cat3"],charge:"cast",skill:"skill",burst:"burst",speed:1}},nhanVat:{havy:{height:1.55}}};E0(["sword","great","spear","bow","cat"]);const Gp=A0([zs(),zs(),zs()]),Uu=s=>Ao({sword:s,great:s,spear:s,bow:s,cat:s}),Wp=Ao({height:zs().positive(),yOffset:zs().default(0)}),OA=Ao({mau:xi().min(1),macDinh:Wp,vuKhiMacDinh:Uu(xi()),camVuKhi:Uu(Ao({bone:xi(),pos:Gp,rot:Gp,scale:zs().positive()})),hoatAnh:Uu(Ao({stand:xi(),atk:T0(xi()).length(3),charge:xi(),skill:xi(),burst:xi(),speed:zs().positive()})),nhanVat:b0(xi(),Wp.partial()).default({})});function FA(s){return OA.parse(s)}let Rs=null;function f0(){if(Rs)return Rs;const s=new Uint8Array([90,90,90,255,175,175,175,255,255,255,255,255]);return Rs=new kn(s,3,1,ln),Rs.minFilter=Rs.magFilter=qt,Rs.needsUpdate=!0,Rs}function St(s={}){return new Zh({gradientMap:f0(),...s})}const lh=new Map;function na(s=.025,e=2761272){const t=`${s}:${e}`;let n=lh.get(t);return n||(n=new bt({color:e,side:$t}),n.onBeforeCompile=i=>{i.uniforms.uW={value:s},i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uW;`).replace("#include <begin_vertex>","vec3 transformed = position + normalize(normal) * uW;")},n.customProgramCacheKey=()=>"outline",lh.set(t,n),n)}function Ls(s,e,t){const n=na(e,t);let i;if(s.isInstancedMesh){const r=s;i=new Xt(r.geometry,n,r.count),i.instanceMatrix=r.instanceMatrix}else i=new Ie(s.geometry,n);return i.castShadow=!1,i.receiveShadow=!1,s.add(i),i}const At=(s,e,t=0)=>{let n=s*374761393+e*668265263+t*2147483647|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296};function $n(s,e,t=0){const n=Math.floor(s),i=Math.floor(e),r=s-n,o=e-i,a=r*r*(3-2*r),l=o*o*(3-2*o),c=At(n,i,t),u=At(n+1,i,t),h=At(n,i+1,t),d=At(n+1,i+1,t);return c+(u-c)*a+(h-c)*l+(c-u-h+d)*a*l}const To={uFadeS:{value:new ne(-1e5,-1e5)},uFadeZ:{value:0},uFadeR:{value:0}};function $l(s){if(s.userData?.fade)return;s.userData.fade=!0;const e=s.onBeforeCompile;s.onBeforeCompile=(t,n)=>{e?.call(s,t,n),Object.assign(t.uniforms,To),t.fragmentShader=t.fragmentShader.replace("void main() {",`uniform vec2 uFadeS; uniform float uFadeZ; uniform float uFadeR;
void main() {
  if (uFadeR > 0.0 && gl_FragCoord.z < uFadeZ) {
    float k = 1.0 - smoothstep(uFadeR * 0.55, uFadeR, distance(gl_FragCoord.xy, uFadeS));
    float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    if (n < k * 0.8) discard;
  }`)},s.customProgramCacheKey=()=>"fade",s.needsUpdate=!0}function p0(s){const e=new Set([f0(),...lh.values()]);s.removeFromParent(),s.traverse(t=>{t.geometry?.dispose();for(const n of[t.material].flat())if(!(!n||e.has(n))){for(const i of Object.values(n))i?.isTexture&&!e.has(i)&&i.dispose();for(const i of Object.values(n.uniforms??{})){const r=i?.value;r?.isTexture&&!e.has(r)&&r.dispose()}n.dispose()}(t.isInstancedMesh||t.isReflector)&&t.dispose()})}const Us=FA(NA),Kl="./",m0=new Hg;m0.register(s=>new hA(s));const BA=new Hg;let kA=null;function zA(){return kA??(kA=fetch(`${Kl}media/anim/humanoid.json`).then(s=>s.ok?s.json():null).catch(()=>null))}const Xp=new Map;function VA(s){let e=Xp.get(s);return e||(e=fetch(s,{method:"HEAD"}).then(t=>t.ok&&!(t.headers.get("content-type")??"").includes("text/html")).catch(()=>typeof caches>"u"?!1:caches.match(s).then(t=>!!t,()=>!1)),Xp.set(s,e)),e}const qp=new Map;function HA(s){let e=qp.get(s);return e||(e=BA.loadAsync(`${Kl}media/models/weapons/${s}.glb`).then(t=>{const n=[];return t.scene.traverse(i=>i.isMesh&&n.push(i)),n.forEach(i=>{const r=i.material,o=r.name.startsWith("glow_");i.material=St({color:r.color,emissive:o?r.color:new X(0),emissiveIntensity:o?1.6:0}),i.castShadow=!0;const a=new Ie(i.geometry,na(.006));i.add(a)}),t.scene}).catch(t=>(console.warn("[3d] không tải được vũ khí",s,t),null)),qp.set(s,e)),e.then(t=>t?t.clone():null)}class pd{constructor(e,t,n,i,r){Dn(this,"obj",new Ge);Dn(this,"mixer");Dn(this,"actions",new Map);Dn(this,"cur",null);Dn(this,"curName","");Dn(this,"weapon",null);this.vrm=e,this.wtype=t,this.src=r,this.mixer=new Og(e.scene);const o=e.humanoid,a=o.getNormalizedBoneNode("hips"),l=a.position.clone();e.scene.updateMatrixWorld(!0);const c=Math.max(.3,a.getWorldPosition(new b).y),u=e.meta?.metaVersion==="0";for(const[h,d]of Object.entries(n)){const f=Array.from({length:d.n},(g,m)=>m/i),p=[];for(const[g,m]of Object.entries(d.bones)){const v=o.getNormalizedBoneNode(g);if(!v)continue;const y=m.q.flatMap(([x,E,T,w])=>u?[-x,E,-T,w]:[x,E,T,w]);p.push(new rs(`${v.name}.quaternion`,f,y))}const _=d.hips.flatMap(([g,m,v])=>[l.x+(u?-g:g)*c,l.y+m*c,l.z+(u?-v:v)*c]);p.push(new os(`${a.name}.position`,f,_)),this.actions.set(h,this.mixer.clipAction(new er(h,-1,p)))}this.obj.add(e.scene)}static async load(e,t,n,i){const r=`${Kl}media/models/${e}/model.vrm`,o=await VA(r)?r:`${Kl}media/models/${Us.mau}/model.vrm`,[a,l]=await Promise.all([m0.loadAsync(o).catch(()=>null),zA()]),c=a?.userData.vrm;if(!c||!l)return null;ci.removeUnnecessaryVertices(c.scene),ci.combineSkeletons(c.scene),ci.rotateVRM0(c);const u=o!==r&&i?GA(i):null;c.scene.traverse(g=>{if(g.isMesh){g.castShadow=!0,g.frustumCulled=!1;for(const m of[g.material].flat()){if(!m?.isMToonMaterial)continue;const v=u?.(m.name??"");v&&(m.color?.copy(v).multiplyScalar(1.25),m.shadeColorFactor?.copy(v).multiplyScalar(.6)),m.shadeColorFactor?.lerp(new X(6970010),.25),m.parametricRimColorFactor?.set(8022608),m.parametricRimFresnelPowerFactor=5,m.parametricRimLiftFactor=0,m.rimLightingMixFactor=1}}});const h={...Us.macDinh,...Us.nhanVat[e]??{}},d=new un().setFromObject(c.scene),f=h.height/Math.max(.1,d.max.y-d.min.y),p=new pd(c,t,l.clips,l.fps,o);p.obj.scale.setScalar(f),p.obj.updateMatrixWorld(!0),p.obj.userData.yOff=h.yOffset-d.min.y*f;const _=n??Us.vuKhiMacDinh[t];if(_){const g=await HA(_),m=Us.camVuKhi[t],v=c.humanoid.getRawBoneNode(m.bone);if(g&&v){const y=new Ge,x=v.getWorldScale(new b).x||1;y.position.fromArray(m.pos).divideScalar(x),y.rotation.set(...m.rot.map(E=>E*Math.PI/180)),y.scale.setScalar(m.scale/x),y.add(g),v.add(y),p.weapon=y}}return p}has(e){return this.actions.has(e)}play(e,t={}){const n=this.actions.get(e);n&&(n.timeScale=t.speed??1,!(this.cur===n&&!t.restart)&&(n.reset(),n.setLoop(t.once?Th:Ah,1/0),n.clampWhenFinished=!!t.once,n.enabled=!0,n.setEffectiveWeight(1),n.play(),this.cur&&this.cur!==n&&this.cur.crossFadeTo(n,t.fade??.15,!1),this.cur=n,this.curName=e))}duration(e){return this.actions.get(e)?.getClip().duration??.5}update(e){this.mixer.update(e),this.vrm.update(e)}dispose(){this.mixer.stopAllAction(),this.obj.removeFromParent(),ci.deepDispose(this.vrm.scene)}}function GA(s){const e=o=>o?new X(o):null,t=e(s.hair),n=e(s.outfit),i=e(s.eye),r=e(s.accent);return o=>/HAIR/i.test(o)?t:/EyeIris/i.test(o)?i:/Shoes/i.test(o)?r:/Tops|Bottoms|CLOTH/i.test(o)?n:null}function Rt(s,e,t,n=.03,i){const r=St({color:e,emissive:i??0,emissiveIntensity:i?1.2:0});t.push(r);const o=new Ie(s,r);return o.castShadow=!0,n&&o.add(new Ie(s,na(n))),o}function Du(s,e,t,n,i,r,o=16777215){for(const a of[-1,1]){const l=Rt(new tn(i,10,8),o,r,0);l.position.set(a*n,e,t);const c=Rt(new tn(i*.55,8,6),1709094,r,0);c.position.set(0,0,i*.6),l.add(c),s.add(l)}}function WA(s){const e=new Ge,t=new Ge,n=[];e.add(t);const i=Lt[s.el??"water"]??Lt.water,r=Math.max(.5,(s.r??14)/16);if(s.isBoss)return qA(s);if(s.type==="slime"){const o=Rt(new tn(.42,18,12),i.c,n);o.scale.set(1,.78,1),o.position.y=.33,t.add(o),Du(o,.08,.34,.14,.07,n)}else if(s.type==="golem"){const o=Rt(new Pt(.9,.8,.6),9077880,n,.035);o.position.y=.95,t.add(o);const a=Rt(new zn(.16,0),i.c,n,0,i.c);a.position.set(0,.05,.31),o.add(a);const l=Rt(new Pt(.42,.34,.4),10130568,n,.03);l.position.y=.6,o.add(l),Du(l,.03,.2,.1,.05,n,new X(i.c).getHex());for(const c of[-1,1]){const u=Rt(new Pt(.28,.75,.3),8025192,n,.03);u.position.set(c*.62,-.15,0),o.add(u);const h=Rt(new Pt(.3,.55,.32),7235678,n,.03);h.position.set(c*.24,.28,0),t.add(h)}}else{const o=s.type==="shaman"?3880304:s.type==="archer"?4942650:7027242,a=s.type==="archer"?15260864:s.type==="shaman"?14278896:15853263,l=Rt(new Bt(.2,.32,.55,10),o,n);l.position.y=.42,t.add(l);const c=Rt(new tn(.26,14,10),a,n);c.position.y=.48,l.add(c),Du(c,.02,.22,.09,.05,n,16769136);for(const h of[-1,1]){const d=Rt(new Mn(.07,.24,5),a,n,.015);d.position.set(h*.25,.1,0),d.rotation.z=h*-1.2,c.add(d)}const u=new Ge;if(u.position.set(.3,.05,.1),l.add(u),s.type==="archer"){const h=Rt(new Oi(.28,.025,4,12,Math.PI),6965802,n,.01);h.rotation.z=Math.PI/2,u.add(h)}else if(s.type==="shaman"){const h=Rt(new Bt(.025,.025,.9,5),5913130,n,.01);h.position.y=.2,u.add(h);const d=Rt(new tn(.09,10,8),i.c,n,0,i.c);d.position.y=.68,u.add(d)}else{const h=Rt(new Bt(.06,.035,.5,6),8016434,n,.012);h.rotation.x=Math.PI/2.4,h.position.z=.15,u.add(h)}t.userData.hand=u}return e.scale.setScalar(r),{obj:e,body:t,mats:n,boss:!1}}const XA=new X(16777215);function Yp(s,e,t,n){s.obj.rotation.y=n;const i=e.tele?e.tele.t/e.tele.dur:0,r=e.swing>0?e.swing:0;if(s.boss)YA(s,e,t);else{const a=Math.abs(Math.sin(t*9+(e.x??0)))*(e.moving||e.vx||e.vy?.12:.03);s.body.position.y=a,s.body.rotation.x=-i*.35+r*.5,s.body.scale.set(1+r*.12,1-r*.12+a*.5,1+r*.12)}const o=Math.max(0,Math.min(1,(e.flash??0)*6));for(const a of s.mats){a.userData.e0||(a.userData.e0={c:a.emissive.clone(),i:a.emissiveIntensity});const l=a.userData.e0;a.emissive.copy(l.c).lerp(XA,o),a.emissiveIntensity=l.i+o*.9}}const al=14,Ja=2634838,Nu=3819640,jp=11055816;function Qa(s,e,t,n=[]){s.updateMatrixWorld(!0);const i=s.matrixWorld.clone().invert(),r=[],o=[],a=[],l=c=>{for(const u of[...c.children]){if(n.includes(u))continue;l(u);const h=u;if(!h.isMesh)continue;a.push(h);const d=h.material;if(!d.isMeshToonMaterial)continue;const f=h.geometry.index?h.geometry.toNonIndexed():h.geometry.clone();f.applyMatrix4(new ke().multiplyMatrices(i,h.matrixWorld));for(const p of Object.keys(f.attributes))p!=="position"&&p!=="normal"&&f.deleteAttribute(p);if(d.emissiveIntensity>0)o.push(f);else{const p=f.attributes.position.count,_=new Float32Array(p*3);for(let g=0;g<p;g++)d.color.toArray(_,g*3);f.setAttribute("color",new Je(_,3)),r.push(f)}}};l(s);for(const c of a)c.removeFromParent(),c.geometry.dispose();if(r.length){const c=ep(r),u=St({vertexColors:!0});t.push(u);const h=new Ie(c,u);h.castShadow=!0,h.add(new Ie(c,na(.045))),s.add(h)}if(o.length){const c=new Ie(ep(o),e);c.castShadow=!0,s.add(c)}for(const c of[...r,...o])c.dispose()}function qA(s){const e=new Ge,t=new Ge,n=[],i=[];e.add(t);const r=Lt[s.el??"water"]??Lt.water,o=St({color:r.c,emissive:r.c,emissiveIntensity:1.6}),a=[o];i.push(o);const l=()=>o,c=w=>new Ie(w,l()),u=new Ge,h=Rt(new tn(.62,16,12),Nu,n,.05);h.scale.set(1,.78,1.15),u.add(h);const d=Rt(new Pt(.62,.36,.95,2,2,2),Ja,n,.04);d.position.set(0,-.04,.78);const f=d.geometry.attributes.position;for(let w=0;w<f.count;w++)f.getZ(w)>0&&f.setX(w,f.getX(w)*.7);d.geometry.computeVertexNormals(),u.add(d);const p=new Ge;p.position.set(0,-.2,.3);const _=Rt(new Pt(.5,.16,.95,2,1,2),Nu,n,.035),g=_.geometry.attributes.position;for(let w=0;w<g.count;w++)g.getZ(w)>0&&g.setX(w,g.getX(w)*.65);_.geometry.computeVertexNormals(),_.position.set(0,-.06,.45);const m=Rt(new Pt(.4,.06,.8),jp,n,0);m.position.set(0,-.15,.45),p.add(m),p.add(_),u.add(p);const v=new Mn(.035,.14,4);for(let w=0;w<6;w++)for(const A of[-1,1]){const S=Rt(v,16051932,n,0);S.rotation.x=Math.PI,S.position.set(A*.2,-.24,.5+w*.12),u.add(S)}for(const w of[-1,1]){const A=c(new tn(.11,10,8));A.scale.set(1.3,.7,1),A.position.set(w*.34,.14,.52),u.add(A);const S=Rt(new Pt(.26,.08,.32),Ja,n,.02);S.position.set(w*.32,.25,.48),S.rotation.z=w*-.35,u.add(S);const M=new Ho([new b(w*.28,.35,.1),new b(w*.5,.75,-.3),new b(w*.55,.95,-.9),new b(w*.45,1,-1.35)]),P=Rt(new Js(M,12,.07,6),15260864,n,.02),F=P.geometry.attributes.position,B=P.geometry;for(let U=0;U<F.count;U++){const z=Math.floor(U/7)/12,k=B.parameters.path.getPointAt(Math.min(1,z)),j=1.6-z*1.4;F.setXYZ(U,k.x+(F.getX(U)-k.x)*j,k.y+(F.getY(U)-k.y)*j,k.z+(F.getZ(U)-k.z)*j)}P.geometry.computeVertexNormals(),u.add(P)}const y=[];for(const w of[-1,1]){const A=new Ge;A.position.set(w*.25,-.05,1.1);const S=new Ho([new b(0,0,0),new b(w*.35,-.1,.1),new b(w*.7,-.3,-.3),new b(w*.9,-.55,-.9)]),M=new Ie(new Js(S,10,.022,4),l());A.add(M),u.add(A),y.push(A)}for(let w=0;w<4;w++){const A=c(new Mn(.1,.55-w*.07,4));A.scale.set(.35,1,1.4),A.position.set(0,.5-w*.04,-.15-w*.22),A.rotation.x=-.75,u.add(A)}u.scale.setScalar(1.25),t.add(u);const x=[],E=new Mn(.12,.6,4),T=new tn(.06,6,4);for(let w=1;w<al;w++){const A=w/(al-1),S=.68-A*.48,M=new Ge,P=Rt(new Ni(S,2),w%2?Ja:Nu,n,.045);P.scale.set(1,.9,1.35),M.add(P);const F=Rt(new tn(S*.82,10,6),jp,n,0);if(F.scale.set(.95,.55,1.3),F.position.y=-S*.42,M.add(F),w<al-1){const B=new Ie(E,l());B.scale.set(.4,1.4-A,1.6),B.position.set(0,S*.95,-S*.1),B.rotation.x=-.6,M.add(B);for(const U of[-1,1]){const z=new Ie(T,a[0]);z.position.set(U*S*.92,S*.1,0),M.add(z)}}else for(const B of[-1,1]){const U=c(new Mn(.22,1.2,4));U.scale.set(.3,1,1),U.rotation.set(-Math.PI/2,0,B*.6),U.position.set(B*.25,.1,-.6),M.add(U)}if(w===2||w===7)for(const B of[-1,1]){const U=Rt(new Bt(.06,.09,.55,5),Ja,n,.02);U.position.set(B*S*1.05,-S*.4,.05),U.rotation.z=B*.9,M.add(U);const z=Rt(new Mn(.08,.2,4),15260864,n,.01);z.position.set(B*S*1.3,-S*.62,.12),z.rotation.x=Math.PI/2,M.add(z)}t.add(M),x.push(M)}Qa(u,o,i,[p,...y]),Qa(p,o,i);for(const w of y)Qa(w,o,i);for(const w of x)Qa(w,o,i);for(const w of n)w.dispose();return{obj:e,body:t,mats:i,boss:!0,segs:x,head:u,jaw:p,whisk:y,glow:a,el:s.el}}const Ou=new b,Zp=new b;function YA(s,e,t){const i=e.segs??[],r=e.state==="wind"&&e.tele?Math.min(1,e.t/e.tele.dur):0,o=e.state==="charge"?1:0,a=s.deadT??0,l=a*3.2;s.obj.position.set(0,0,0),s.obj.rotation.set(0,0,0),s.obj.scale.setScalar(1);const c=1.7+r*.9-o*1+Math.sin(t*1.6)*.12-l,u=(i[0]?.x??e.x)/40,h=(i[0]?.y??e.y)/40,d=s.head;d.position.set(u,c,h),d.rotation.set(-.25*r+.35*o+a*.6,Math.atan2(Math.cos(e.ang),Math.sin(e.ang)),0),s.jaw&&(s.jaw.rotation.x=.1+r*.55+o*.3+Math.max(0,Math.sin(t*.9))*.08),s.whisk?.forEach((g,m)=>g.rotation.y=Math.sin(t*3+m*2)*.25);let f=u,p=c-.5,_=h;if(s.segs.forEach((g,m)=>{const v=m+1,y=i[Math.min(v,i.length-1)]??{x:e.x,y:e.y},x=v/al,E=y.x/40,T=y.y/40,w=Math.max(.15-l,(1.1-x*.9)*(1-o*.4)+Math.sin(t*2.2-v*.65)*.32-l);g.position.set(E,w,T),Ou.set(f,p,_),Zp.set(E,w,T),Ou.distanceToSquared(Zp)>1e-4&&g.lookAt(Ou),f=E,p=w,_=T}),s.glow&&s.el!==e.el){s.el=e.el;const g=Lt[e.el]?.c??"#3aa6f5";for(const m of s.glow)m.color.set(g),m.emissive.set(g),m.userData.e0={c:m.emissive.clone(),i:m.emissiveIntensity}}if(s.glow){const g=1.4+Math.sin(t*4)*.25+r*1.2+(e.phase===2?.5:0);for(const m of s.glow)m.userData.e0&&(m.userData.e0.i=g)}}function jA(){const s=new Mt({side:$t,depthWrite:!1,fog:!1,uniforms:{uT:{value:0},uTop:{value:new X(5218280)},uHor:{value:new X(13626111)},uCloud:{value:new X(16777215)},uShade:{value:new X(12110060)},uNight:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); vec4 p = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position = p.xyww; }",fragmentShader:`uniform float uT; uniform vec3 uTop, uHor, uCloud, uShade; uniform float uNight; varying vec3 vD;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
      float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<4;i++){ s+=a*n(p); p*=2.03; a*=0.5; } return s; }
      void main(){
        float y = clamp(vD.y, -0.2, 1.0);
        vec3 c = mix(uHor, uTop, smoothstep(0.0, 0.55, y));
        if (y > 0.02) {
          vec2 p = vD.xz / (y + 0.25) * 1.6 + vec2(uT*0.012, uT*0.006);
          float f = fbm(p);
          float cl = smoothstep(0.52, 0.56, f);
          float sh = smoothstep(0.56, 0.68, fbm(p + vec2(0.06, 0.1)));
          vec3 cc = mix(uShade, uCloud, sh);
          c = mix(c, cc, cl * smoothstep(0.02, 0.18, y) * (1.0 - uNight*0.6));
          float st = step(0.996, h(floor(vD.xz / (y + 0.3) * 160.0))) * uNight * smoothstep(0.1, 0.4, y) * (1.0 - cl);
          c += vec3(st);
        }
        gl_FragColor = vec4(c, 1.0);
      }`}),e=new Ie(new tn(30,32,16),s);return e.frustumCulled=!1,e.renderOrder=-1,{mesh:e,mat:s}}class Cc extends Ie{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new Zt;const n=this,i=t.color!==void 0?new X(t.color):new X(8355711),r=t.textureWidth||512,o=t.textureHeight||512,a=t.clipBias||0,l=t.shader||Cc.ReflectorShader,c=t.multisample!==void 0?t.multisample:4,u=new ai,h=new b,d=new b,f=new b,p=new ke,_=new b(0,0,-1),g=new xt,m=new b,v=new b,y=new xt,x=new ke,E=this.camera,T=new cn(r,o,{samples:c,type:Kn}),w=new Mt({name:l.name!==void 0?l.name:"unspecified",uniforms:Vn.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});w.uniforms.tDiffuse.value=T.texture,w.uniforms.color.value=i,w.uniforms.textureMatrix.value=x,this.material=w,this.onBeforeRender=function(A,S,M){if(d.setFromMatrixPosition(n.matrixWorld),f.setFromMatrixPosition(M.matrixWorld),p.extractRotation(n.matrixWorld),h.set(0,0,1),h.applyMatrix4(p),m.subVectors(d,f),m.dot(h)>0)return;m.reflect(h).negate(),m.add(d),p.extractRotation(M.matrixWorld),_.set(0,0,-1),_.applyMatrix4(p),_.add(f),v.subVectors(d,_),v.reflect(h).negate(),v.add(d),E.position.copy(m),E.up.set(0,1,0),E.up.applyMatrix4(p),E.up.reflect(h),E.lookAt(v),E.far=M.far,E.updateMatrixWorld(),E.projectionMatrix.copy(M.projectionMatrix),x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),x.multiply(E.projectionMatrix),x.multiply(E.matrixWorldInverse),x.multiply(n.matrixWorld),u.setFromNormalAndCoplanarPoint(h,d),u.applyMatrix4(E.matrixWorldInverse),g.set(u.normal.x,u.normal.y,u.normal.z,u.constant);const P=E.projectionMatrix;y.x=(Math.sign(g.x)+P.elements[8])/P.elements[0],y.y=(Math.sign(g.y)+P.elements[9])/P.elements[5],y.z=-1,y.w=(1+P.elements[10])/P.elements[14],g.multiplyScalar(2/g.dot(y)),P.elements[2]=g.x,P.elements[6]=g.y,P.elements[10]=g.z+1-a,P.elements[14]=g.w,n.visible=!1;const F=A.getRenderTarget(),B=A.xr.enabled,U=A.shadowMap.autoUpdate;A.xr.enabled=!1,A.shadowMap.autoUpdate=!1,A.setRenderTarget(T),A.state.buffers.depth.setMask(!0),A.autoClear===!1&&A.clear(),A.render(S,E),A.xr.enabled=B,A.shadowMap.autoUpdate=U,A.setRenderTarget(F);const z=M.viewport;z!==void 0&&A.state.viewport(z),n.visible=!0},this.getRenderTarget=function(){return T},this.dispose=function(){T.dispose(),n.material.dispose()}}}Cc.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function ZA(s){const e=[{main:15777888,sky:726080,neb:3821480,stone:5067392,trim:13214298},{main:5953791,sky:268844,neb:1927818,stone:4021360,trim:9427176},{main:12618495,sky:1049898,neb:5909130,stone:5194094,trim:13676799},{main:16743002,sky:1967372,neb:8003632,stone:5913156,trim:16760970}],t=Math.max(1,Math.min(12,Math.round(s)||1)),n=e[Math.floor((t-1)/3)],i=(t-1)%3*.025,r=o=>new X(o).offsetHSL(i,0,0);return{main:r(n.main),sky:r(n.sky),neb:r(n.neb),stone:r(n.stone),trim:r(n.trim)}}const vt=(s,e)=>At(s,e,77);function el(s,e,t,n){const i=[],r=new Float32Array(s.count).fill(1),o=new ke,a=new ke;for(let l=0;l<s.count;l++){const c=new ke;s.getMatrixAt(l,c),i.push(c)}return l=>{let c=!1;for(let u=0;u<s.count;u++){const h=Math.hypot(l.x-e[u].x,l.z-e[u].z),d=Math.max(0,Math.min(1,(h-t)/(n-t)));if(Math.abs(d-r[u])<.01)continue;r[u]=d,c=!0;const f=i[u].elements;o.copy(i[u]).multiply(a.makeScale(d,d,d)),o.elements[12]=f[12],o.elements[13]=f[13],o.elements[14]=f[14],s.setMatrixAt(u,o)}c&&(s.instanceMatrix.needsUpdate=!0)}}function $A(s,e,t){const n=new Mt({side:$t,depthWrite:!1,fog:!1,uniforms:{uT:{value:0},uTop:{value:s},uNeb:{value:e},uAcc:{value:t}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); vec4 p = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position = p.xyww; }",fragmentShader:`uniform float uT; uniform vec3 uTop, uNeb, uAcc; varying vec3 vD;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
      float n(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y),
                   mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float fbm(vec3 p){ float s=0.0, a=0.5; for(int i=0;i<4;i++){ s+=a*n(p); p*=2.1; a*=0.5; } return s; }
      void main(){
        vec3 d = normalize(vD);
        vec3 c = mix(uTop*1.25, uTop*0.45, smoothstep(-0.4, 0.8, d.y));
        float band = exp(-pow(dot(d, normalize(vec3(0.35, 0.5, -0.8))) * 3.2, 2.0));
        float nb = fbm(d * 3.0 + vec3(uT * 0.004));
        c += uNeb * smoothstep(0.35, 0.85, nb) * (0.35 + band * 0.9);
        c += uAcc * smoothstep(0.62, 0.95, fbm(d * 5.0 - 3.0)) * band * 0.35;
        vec3 g = floor(d * 220.0);
        float s = h(g);
        float tw = 0.6 + 0.4 * sin(uT * (1.5 + s * 4.0) + s * 40.0);
        c += vec3(step(0.994, s) * tw * (0.6 + band));
        c += vec3(step(0.9993, h(floor(d * 90.0)))) * 1.4;
        gl_FragColor = vec4(c, 1.0);
      }`}),i=new Ie(new tn(30,32,16),n);return i.frustumCulled=!1,i.renderOrder=-1,{mesh:i,mat:n}}function KA(s,e){const n=document.createElement("canvas"),i=document.createElement("canvas");n.width=n.height=i.width=i.height=1024;const r=n.getContext("2d"),o=i.getContext("2d"),a=s.clone();r.fillStyle="#"+a.clone().multiplyScalar(.7).getHexString(),r.fillRect(0,0,1024,1024);const l=16,c=1024/l;for(let f=0;f<l;f++)for(let p=0;p<l;p++){const _=.82+At(p,f,3)*.3;r.fillStyle="#"+a.clone().multiplyScalar(_).getHexString(),r.fillRect(p*c+3,f*c+3,c-6,c-6)}o.fillStyle="#000",o.fillRect(0,0,1024,1024);const u=1024/2,h=[.16,.27,.38,.47];for(const f of[r,o]){f.save(),f.translate(u,u),f.strokeStyle=f===o?"#"+e.getHexString():"#"+e.clone().multiplyScalar(.55).getHexString(),f.lineWidth=f===o?5:9;for(const p of h)f.beginPath(),f.arc(0,0,p*1024,0,Math.PI*2),f.stroke();for(let p=0;p<12;p++){const _=p/12*Math.PI*2;f.beginPath(),f.moveTo(Math.cos(_)*h[0]*1024,Math.sin(_)*h[0]*1024),f.lineTo(Math.cos(_)*h[2]*1024,Math.sin(_)*h[2]*1024),f.stroke();const g=(h[2]+h[3])/2*1024,m=Math.cos(_+.26)*g,v=Math.sin(_+.26)*g;f.beginPath(),f.moveTo(m-14,v+8),f.lineTo(m,v-12),f.lineTo(m+14,v+6),f.stroke()}f.restore()}const d=(f,p)=>{const _=new Vh(f);return _.colorSpace=Ht,_.anisotropy=4,_};return{map:d(n),emissive:d(i)}}function $p(s,e,t,n){const i=[],r=[];for(let h=0;h<e;h++){const d=h/e*Math.PI*2+vt(h,n)*.2,f=s*(.95+vt(h,n+1)*.1),p=(vt(h,n+2)-.5)*1.4;i.push(Math.cos(d)*f,p,Math.sin(d)*f)}for(let h=0;h<e;h++){if(vt(h,n+3)<.25)continue;const d=(h+1)%e;r.push(i[h*3],i[h*3+1],i[h*3+2],i[d*3],i[d*3+1],i[d*3+2])}const o=new Ge,a=new qe;a.setAttribute("position",new Ne(i,3));const l=new Mt({transparent:!0,depthWrite:!1,blending:Sn,fog:!1,uniforms:{uC:{value:t.clone().multiplyScalar(1.6)},uT:{value:0}},vertexShader:`uniform float uT; varying float vT; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0);
      vT = 0.65 + 0.35*sin(uT*2.0 + position.x*3.1 + position.z*1.7);
      gl_PointSize = clamp(260.0 / -mv.z, 3.0, 16.0); gl_Position = projectionMatrix*mv; }`,fragmentShader:`uniform vec3 uC; varying float vT; void main(){ vec2 q = gl_PointCoord - 0.5; float d = length(q);
      float a = smoothstep(0.5, 0.0, d); a += smoothstep(0.06, 0.0, abs(q.x)) * smoothstep(0.5, 0.1, abs(q.y)) * 0.6;
      a += smoothstep(0.06, 0.0, abs(q.y)) * smoothstep(0.5, 0.1, abs(q.x)) * 0.6;
      gl_FragColor = vec4(mix(uC, vec3(1.4), smoothstep(0.2, 0.0, d)) * vT, clamp(a, 0.0, 1.0)); }`});o.add(new Hr(a,l));const c=new qe;c.setAttribute("position",new Ne(r,3)),o.add(new wn(c,new Yt({color:t.clone().multiplyScalar(.9),transparent:!0,opacity:.45,blending:Sn,depthWrite:!1,fog:!1})));const u=new Ie(new Oi(s,.035,4,160),new bt({color:t.clone().multiplyScalar(1.2),transparent:!0,opacity:.55,blending:Sn,depthWrite:!1,fog:!1}));return u.rotation.x=Math.PI/2,o.add(u),{g:o,pm:l}}function g0(s,e=1){return new Mt({transparent:!0,depthWrite:!1,side:Nt,blending:Sn,fog:!1,uniforms:{uC:{value:s.clone()},uA:{value:e},uT:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`uniform vec3 uC; uniform float uA; uniform float uT; varying vec2 vUv;
      void main(){ float v = 1.0 - vUv.y; float a = pow(v, 1.6) * (0.75 + 0.25*sin(vUv.x*40.0 + uT*6.0)) * uA;
        gl_FragColor = vec4(uC * 1.4, a * smoothstep(0.0, 0.08, vUv.y)); }`})}function _0(s,e){const t=20/he,n=(s.w-20)/he,i=60/he,r=(s.h-20)/he,o=1.1,a=[[t,i],[n,i],[n,r],[t,r],[t,i]],l=[],c=[],u=[];let h=0;for(let _=0;_<4;_++){const[g,m]=a[_],[v,y]=a[_+1],x=Math.hypot(v-g,y-m),E=l.length/3;l.push(g,0,m,v,0,y,v,o,y,g,o,m),c.push(h,0,h+x,0,h+x,1,h,1),u.push(E,E+1,E+2,E,E+2,E+3),h+=x}const d=new qe;d.setAttribute("position",new Ne(l,3)),d.setAttribute("uv",new Ne(c,2)),d.setIndex(u);const f=new Mt({transparent:!0,depthWrite:!1,side:Nt,blending:Sn,fog:!1,uniforms:{uC:{value:e.clone()},uT:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`uniform vec3 uC; uniform float uT; varying vec2 vUv;
      void main(){ float v = vUv.y; float a = (1.0 - v) * (0.16 + 0.1 * sin(vUv.x * 2.2 - uT * 2.0));
        a += smoothstep(0.06, 0.0, v) * 0.55;
        gl_FragColor = vec4(uC * 1.3, a); }`}),p=new Ie(d,f);return p.renderOrder=3,{mesh:p,mat:f}}function v0(s){const e=new Ge;e.name=`arena-${s}`;const t=[],n=[],i=new Bt(.55,.9,9,20,1,!0).translate(0,4.5,0),r=new ss(.8,1,40).rotateX(-Math.PI/2);let o=0;function a(u,h,d){let f=n.find(p=>o-p.t0>1.2);if(!f){const p=g0(new X(d)),_=new Ge,g=new Ie(r,new bt({color:16777215,transparent:!0,depthWrite:!1,blending:Sn}));_.add(new Ie(i,p),g),e.add(_),f={o:_,mat:p,ring:g,t0:0,x:0,z:0,col:d},n.push(f)}f.t0=o,f.x=u/he,f.z=h/he,f.col=d,f.mat.uniforms.uC.value.set(d),f.ring.material.color.set(d).multiplyScalar(1.5),f.o.position.set(f.x,.02,f.z)}t.push(u=>{o=u.t;for(const h of n){const d=(u.t-h.t0)/1.1;if(h.o.visible=d>=0&&d<1,!h.o.visible)continue;const f=d<.15?d/.15:1-(d-.15)/.85;h.mat.uniforms.uA.value=f,h.mat.uniforms.uT.value=u.t,h.o.children[0].scale.set(.4+f*.8,1,.4+f*.8);const p=.3+d*1.8;if(h.ring.scale.set(p,1,p),h.ring.material.opacity=1-d,d<.6)for(let _=0;_<5;_++){const g=_*1.26+u.t*3+h.x,m=.5+_*7%5*.12;u.addP(h.x+Math.cos(g)*m,(d*6+_*.5)%4,h.z+Math.sin(g)*m,_%2?h.col:"#ffffff",.9)}}});function l(){p0(e),i.dispose(),r.dispose()}function c(){let u=0;return e.traverse(()=>u++),{objects:u}}return{group:e,tick:t,spawnFx:a,dispose:l,stats:c,beams:n}}function JA(s,e,t){const n=v0("tower"),{group:i}=n,r=ZA(s),o=e.w/2/he,a=e.h/2/he,l=e.w/he*.76,c=e.h/he*.76,u=(V,de=1)=>new ne(Math.cos(V)*l*de,Math.sin(V)*c*de),h=$A(r.sky,r.neb,r.main);i.add(h.mesh);const d=KA(r.stone,r.main),f=new is(1,8);f.rotateX(-Math.PI/2),f.scale(l,1,c);const p=f.attributes.uv,_=f.attributes.position,g=Math.max(l,c);for(let V=0;V<p.count;V++)p.setXY(V,.5+_.getX(V)/(2*g),.5-_.getZ(V)/(2*g));const m=St({map:d.map,emissive:16777215,emissiveMap:d.emissive,emissiveIntensity:.6}),v=new Ie(f,m);v.receiveShadow=t.shadows,v.position.set(o,0,a),i.add(v);const y=new Bt(1,.96,1,8,1,!0);y.rotateY(-Math.PI/2+Math.PI/8-Math.PI/8);const x=new Ie(y,St({color:r.trim.clone().multiplyScalar(.7)}));x.scale.set(l,.9,c),x.rotation.y=Math.PI/2,x.position.set(o,-.45,a),i.add(x);const E=new Mn(1,1,8,6),T=E.attributes.position;for(let V=0;V<T.count;V++){const de=T.getX(V),ce=T.getY(V),Ee=T.getZ(V),te=1+($n(de*3+5,Ee*3+ce*2,4)-.5)*.35*(.5-ce);T.setXYZ(V,de*te,ce,Ee*te)}E.computeVertexNormals(),E.rotateX(Math.PI),E.rotateY(Math.PI/2);const w=new Ie(E,St({color:r.stone.clone().multiplyScalar(.75)}));w.scale.set(l*.97,9,c*.97),w.position.set(o,-.9-4.5,a),i.add(w);const A=[];for(let V=0;V<=8;V++){const de=u(V/8*Math.PI*2);A.push(new b(de.x,.05,de.y))}const S=new Ie(new Js(new Ho(A,!1,"catmullrom",0),64,.12,5),St({color:r.trim,emissive:r.main,emissiveIntensity:.35}));S.position.set(o,0,a),i.add(S);const M=8,P=new Bt(.42,.5,4.2,8).translate(0,2.1,0),F=new Pt(1.3,.35,1.3),B=new zn(.42,0),U=new Pt(.1,3.2,.06).translate(0,2.1,.47),z=St({color:r.stone.clone().lerp(new X(16777215),.12)}),k=new Xt(P,z,M),j=new Xt(F,St({color:r.trim.clone().multiplyScalar(.8)}),M*2),W=St({color:r.main,emissive:r.main,emissiveIntensity:1.6}),ae=new Xt(B,W,M),oe=new Xt(U,new bt({color:r.main.clone().multiplyScalar(1.5)}),M),be=[],Xe=[],We=new ke,$=new Qe,pe=new b(0,1,0);for(let V=0;V<M;V++){const de=u(V/M*Math.PI*2,.93),ce=new b(o+de.x,0,a+de.y);be.push(ce),$.setFromAxisAngle(pe,-Math.atan2(a-ce.z,o-ce.x)+Math.PI/2),Xe.push($.clone()),We.compose(ce,$,new b(1,1,1)),k.setMatrixAt(V,We),oe.setMatrixAt(V,We),j.setMatrixAt(V*2,We.compose(ce.clone().setY(.17),$,new b(1,1,1))),j.setMatrixAt(V*2+1,We.compose(ce.clone().setY(4.3),$,new b(1,1,1)))}for(const V of[k,j])V.castShadow=t.shadows,V.receiveShadow=t.shadows,Ls(V,.04),i.add(V);i.add(ae,oe);const Le=$p(Math.max(l,c)*1.35,28,r.main,11);Le.g.position.set(o,1.2,a);const me=$p(Math.max(l,c)*1.05,20,r.trim,23);me.g.position.set(o,9,a-4),me.g.rotation.set(.5,0,.18),i.add(Le.g,me.g);const Oe=Math.round(18*t.dense),Ke=new Xt(new Ni(1,0),St({color:r.stone.clone().multiplyScalar(.8)}),Oe),je=[];for(let V=0;V<Oe;V++){const de=vt(V,1)*Math.PI*2,ce=Math.max(l,c)*(1.15+vt(V,2)*.6);je.push({x:o+Math.cos(de)*ce,y:-3+vt(V,3)*6,z:a+Math.sin(de)*ce*.85,s:.3+vt(V,4)*1.1,ph:vt(V,5)*6})}i.add(Ke);const it=new Ge;it.position.set(o,0,a-c*.86);const le=new Ie(new Oi(1.7,.26,8,28,Math.PI),St({color:r.trim,emissive:r.main,emissiveIntensity:.25}));le.position.y=1.6,Ls(le,.04);const _e=new Pt(.5,1.6,.5).translate(0,.8,0);for(const V of[-1,1]){const de=new Ie(_e,z);de.position.x=V*1.7,de.castShadow=t.shadows,it.add(de)}const D=new Mt({transparent:!0,depthWrite:!1,side:Nt,fog:!1,uniforms:{uT:{value:0},uC:{value:r.main.clone()},uOpen:{value:0}},vertexShader:"varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`uniform float uT; uniform vec3 uC; uniform float uOpen; varying vec2 vP;
      void main(){ vec2 p = vP - vec2(0.0, 1.6); float r = length(p) / 1.6; float a = atan(p.y, p.x);
        if (vP.y < 0.0 || r > 1.0) discard;
        float sw = 0.5 + 0.5*sin(a*5.0 - r*10.0 + uT*(2.0 + uOpen*4.0));
        vec3 c = mix(uC*0.4, uC*1.6, sw*r) + vec3(1.0)*smoothstep(0.35, 0.0, r)*uOpen;
        gl_FragColor = vec4(c, (0.35 + 0.55*uOpen) * (0.4 + 0.6*sw) * smoothstep(1.0, 0.85, r)); }`}),ze=new Ie(new is(1.6,32).translate(0,1.6,0),D);it.add(le,ze),i.add(it);const fe=new bt({color:r.main.clone().multiplyScalar(1.4),transparent:!0,opacity:0,depthWrite:!1,blending:Sn}),Ue=new ss(.55,.75,6).rotateX(-Math.PI/2),xe=new Xt(Ue,fe,7);for(let V=0;V<7;V++){const de=Math.PI+V/6*Math.PI;We.makeTranslation(o+Math.cos(de)*(300/he),.04,300/he+Math.sin(de)*(160/he)),xe.setMatrixAt(V,We)}i.add(xe);const $e=_0(e,r.main);i.add($e.mesh),i.traverse(V=>V.isMesh&&V!==h.mesh&&[V.material].flat().forEach($l));const Pe=be.map(V=>({x:V.x,y:4.8,z:V.z,c:r.main.clone(),i:1.2}));Pe.push({x:it.position.x,y:1.8,z:it.position.z+.6,c:r.main.clone(),i:.8});const I={fog:r.sky.clone().lerp(r.neb,.35),fogNear:30,fogFar:110,hemiSky:r.neb.clone().lerp(new X(16777215),.55),hemiGround:r.sky.clone().lerp(r.main,.25),hemiI:1.25,sunCol:new X(16773852).lerp(r.main,.2),sunI:1.9,sunOff:new b(-7,15,-6)},R=new Array(M).fill(1),q=new b,ee=new Qe,re=new an;return n.tick.push(V=>{const{t:de,G:ce}=V;h.mesh.position.copy(V.camera.position),h.mat.uniforms.uT.value=de,Le.g.rotation.y=de*.03,me.g.rotation.y=-de*.05,Le.pm.uniforms.uT.value=me.pm.uniforms.uT.value=de,$e.mat.uniforms.uT.value=de;const Ee=ce.tower,te=Ee&&!ce.over&&Ee.wave<Ee.waves.length&&!ce.enemies.some(Se=>!Se.dead),J=te?Math.max(0,Math.min(1,1-Ee.gap/1.5)):0,Me=ce.over&&ce._ended&&Ee&&Ee.wave>=Ee.waves.length&&Ee.timeLeft>0,De=V.camera.position;for(let Se=0;Se<M;Se++){const we=be[Se],ut=Math.hypot(De.x-we.x,De.z-we.z),O=Math.max(0,Math.min(1,(ut-5)/4));if(R[Se]!==O){R[Se]=O;const K=new b(O,O,O);We.compose(we,Xe[Se],K),k.setMatrixAt(Se,We),oe.setMatrixAt(Se,We),j.setMatrixAt(Se*2,We.compose(we.clone().setY(.17),Xe[Se],K)),j.setMatrixAt(Se*2+1,We.compose(we.clone().setY(4.3*O),Xe[Se],K)),k.instanceMatrix.needsUpdate=oe.instanceMatrix.needsUpdate=j.instanceMatrix.needsUpdate=!0}re.set(0,de*.8+Se,0),ee.setFromEuler(re);const Ce=(1+J*.35+Math.sin(de*3+Se)*.05)*R[Se];We.compose(q.set(we.x,5.1+Math.sin(de*1.6+Se)*.15,we.z),ee,new b(Ce,Ce*1.3,Ce)),ae.setMatrixAt(Se,We),Pe[Se].i=(1.1+J*1.5+Math.sin(de*2+Se)*.1)*R[Se]}if(ae.instanceMatrix.needsUpdate=!0,W.emissiveIntensity=1.4+J*1.4,fe.opacity=J*.9,J>0){for(let Se=0;Se<7;Se++){const we=Math.PI+Se/6*Math.PI;We.compose(q.set(o+Math.cos(we)*(300/he),.04,300/he+Math.sin(we)*(160/he)),ee.setFromEuler(re.set(0,de*2+Se,0)),new b(.6+J*.9,1,.6+J*.9)),xe.setMatrixAt(Se,We),(Se+Math.floor(de*20))%3===0&&V.addP(o+Math.cos(we)*(300/he)+Math.sin(de*7+Se)*.5,J*2+Se%3*.3,300/he+Math.sin(we)*(160/he)+Math.cos(de*5+Se)*.5,"#"+r.main.getHexString(),.8)}xe.instanceMatrix.needsUpdate=!0}const Be=Me?1:0,ve=D.uniforms.uOpen;ve.value+=(Be-ve.value)*Math.min(1,V.dt*3),D.uniforms.uT.value=de,Pe[M].i=.6+ve.value*2.4;for(let Se=0;Se<Oe;Se++){const we=je[Se];We.compose(q.set(we.x,we.y+Math.sin(de*.6+we.ph)*.4,we.z),ee.setFromEuler(re.set(de*.1+we.ph,de*.15+we.ph,0)),new b(we.s,we.s*.8,we.s)),Ke.setMatrixAt(Se,We)}Ke.instanceMatrix.needsUpdate=!0}),{kind:"tower",group:i,env:I,lamps:Pe,tick:V=>n.tick.forEach(de=>de(V)),spawnFx:n.spawnFx,stats:n.stats,dispose:n.dispose}}function QA(s,e,t,n,i,r){const a={uT:{value:0},uDeep:{value:new X(132620)},uTint:{value:new X(797242)},uLP:{value:Array.from({length:8},()=>new b)},uLC:{value:Array.from({length:8},()=>new X)},tDiffuse:{value:null},textureMatrix:{value:new ke},color:{value:new X(16777215)},uRefl:{value:i.reflect?1:0}};r.slice(0,8).forEach((h,d)=>{a.uLP.value[d].set(h.x,h.y,h.z),a.uLC.value[d].copy(h.c)});const l={uniforms:a,vertexShader:`uniform mat4 textureMatrix; varying vec4 vUvR; varying vec3 vW;
      #include <common>
      #include <fog_pars_vertex>
      void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; vUvR = textureMatrix*vec4(position,1.0);
        vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`uniform float uT; uniform vec3 uDeep, uTint; uniform vec3 uLP[8]; uniform vec3 uLC[8];
      uniform sampler2D tDiffuse; uniform float uRefl; varying vec4 vUvR; varying vec3 vW;
      #include <common>
      #include <fog_pars_fragment>
      float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec2 q = vW.xz;
        float e = 0.08;
        float hA = n2(q*1.3 + vec2(uT*0.35, uT*0.2)) + 0.5*n2(q*3.1 - vec2(uT*0.5, uT*0.1));
        float hX = n2((q+vec2(e,0.0))*1.3 + vec2(uT*0.35, uT*0.2)) + 0.5*n2((q+vec2(e,0.0))*3.1 - vec2(uT*0.5, uT*0.1));
        float hZ = n2((q+vec2(0.0,e))*1.3 + vec2(uT*0.35, uT*0.2)) + 0.5*n2((q+vec2(0.0,e))*3.1 - vec2(uT*0.5, uT*0.1));
        vec3 N = normalize(vec3((hA-hX)*0.9, 1.0, (hA-hZ)*0.9));
        vec3 V = normalize(cameraPosition - vW);
        float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
        vec3 c = mix(uDeep, uTint, 0.25 + fres*0.6);
        vec3 R = reflect(-V, N);
        for (int i = 0; i < 8; i++) {
          vec3 L = normalize(uLP[i] - vW);
          float s = pow(max(dot(R, L), 0.0), 90.0);
          float d = length(uLP[i].xz - vW.xz);
          c += uLC[i] * (s * 2.2 + exp(-d*0.5) * 0.06);
        }
        if (uRefl > 0.5) {
          vec4 uvr = vUvR; uvr.xy += N.xz * 0.6;
          vec3 rc = texture2DProj(tDiffuse, uvr).rgb;
          c += rc * (0.45 + fres * 0.4);
        }
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`},c=new _i(s,e);let u;if(i.reflect){const h=Math.min(window.devicePixelRatio||1,2);u=new Cc(c,{shader:l,textureWidth:Math.round(innerWidth*h*.5),textureHeight:Math.round(innerHeight*h*.5),clipBias:.003});const d=u.material.uniforms;for(const f of["uT","uDeep","uTint","uLP","uLC","uRefl"])d[f]=a[f];u.material.fog=!0,Object.assign(d,Vn.clone(Re.fog))}else u=new Ie(c,new Mt({...l,uniforms:Vn.merge([Re.fog,{}]),fog:!0})),Object.assign(u.material.uniforms,a);return u.rotation.x=-Math.PI/2,u.position.set(t,0,n),u.receiveShadow=!1,{mesh:u,uniforms:a}}function eE(s,e){const t=v0("boss"),{group:n}=t,i=s.w/2/he,r=s.h/2/he,o=s.w/he/2+13,a=s.h/he/2+13,l=16,c=72,u=20,h=[],d=[],f=[],p=new X(2503244),_=new X(4478586),g=new X(1186348),m=new X;for(let te=0;te<=u;te++){const J=te/u,Me=J*Math.PI*.5*.94;for(let De=0;De<=c;De++){const Be=De/c*Math.PI*2,ve=$n(Math.cos(Be)*3+9,Math.sin(Be)*3+J*6,2),Se=1+(ve-.5)*.28+($n(De*.6,te*.8,5)-.5)*.08,we=Math.cos(Me)*Se,ut=-1.5+Math.sin(Me)*l*(.95+(ve-.5)*.15);h.push(i+Math.cos(Be)*o*we,ut,r+Math.sin(Be)*a*we),m.copy(p).lerp(_,Math.max(0,Math.sin(te*1.7+ve*4))*.6).lerp(g,J*.6),d.push(m.r,m.g,m.b)}}for(let te=0;te<u;te++)for(let J=0;J<c;J++){const Me=te*(c+1)+J,De=Me+1,Be=Me+c+1,ve=Be+1;f.push(Me,Be,De,De,Be,ve)}const v=new qe;v.setAttribute("position",new Ne(h,3)),v.setAttribute("color",new Ne(d,3)),v.setIndex(f),v.computeVertexNormals();const y=new Ie(v,St({vertexColors:!0,side:$t}));y.receiveShadow=e.shadows,n.add(y);const x=Math.round(46*e.dense),E=Math.round(30*e.dense),T=St({color:2305348}),w=new Xt(new Mn(1,1,6).rotateX(Math.PI),T,x),A=new Xt(new Mn(1,1,6).translate(0,.5,0),T,E),S=new ke,M=new Qe,P=new an,F=new b,B=new b;for(let te=0;te<x;te++){const J=vt(te,7)*Math.PI*2,Me=Math.sqrt(vt(te,8))*.85,De=Math.acos(Math.min(1,Me)),Be=1.2+vt(te,9)*3.5;F.set(i+Math.cos(J)*o*Me,-1.5+Math.sin(De)*l*.92-Be/2,r+Math.sin(J)*a*Me),S.compose(F,M.identity(),B.set(.3+vt(te,10)*.5,Be,.3+vt(te,10)*.5)),w.setMatrixAt(te,S)}for(let te=0;te<E;te++){const J=vt(te,11)*Math.PI*2,Me=.86+vt(te,12)*.1,De=.8+vt(te,13)*2.6;F.set(i+Math.cos(J)*o*Me,-.4,r+Math.sin(J)*a*Me),S.compose(F,M.setFromEuler(P.set(vt(te,14)*.3,0,vt(te,15)*.3)),B.set(.5+vt(te,16)*.7,De,.5)),A.setMatrixAt(te,S)}A.castShadow=e.shadows;const U=[];for(let te=0;te<E;te++)A.getMatrixAt(te,S),U.push(new b().setFromMatrixPosition(S));const z=[el(A,U,4,8)];n.add(w,A);const k=[3862736,5945599,10124287,3862736,8191920],j=[],W=20,ae=Math.round(7*Math.max(.7,e.dense)),oe=new tn(1,8,5,0,Math.PI*2,0,Math.PI/2),be=new Bt(.25,.32,1,5).translate(0,-.5,0),Xe=new zn(1,0).scale(.45,1.4,.45),We=new Xt(oe,new bt({color:16777215}),W*ae),$=new Xt(be,St({color:10137800}),W*ae),pe=new Xt(Xe,new bt({color:16777215}),W*3),Le=new X;let me=0,Oe=0;const Ke=[],je=[];for(let te=0;te<W;te++){const J=te/W*Math.PI*2+vt(te,20)*.3,Me=.1+vt(te,21)*(te%3===0?5:1.6),De=Math.cos(Math.asin(Math.min(.95,(Me+1.5)/l)))*.9,Be=i+Math.cos(J)*o*De,ve=r+Math.sin(J)*a*De,Se=new X(k[te%k.length]);j.push({x:Be-Math.cos(J)*.8,y:Me+.9,z:ve-Math.sin(J)*.8,c:Se,i:1.5});for(let we=0;we<ae;we++){const ut=(we-ae/2)*.35,O=.3+vt(te*10+we,22)*.55;F.set(Be-Math.sin(J)*ut+vt(we,te)*.3,Me+vt(we,te+1)*.8+O*2,ve+Math.cos(J)*ut),S.compose(F,M.setFromEuler(P.set(vt(we,te+2)*.5-.25,0,vt(we,te+3)*.5-.25)),B.set(O,O*.6,O)),We.setMatrixAt(me,S),We.setColorAt(me,Le.copy(Se).offsetHSL(vt(we,te+4)*.08-.04,0,0)),S.compose(F,M,B.set(O*.5,O*2,O*.5)),$.setMatrixAt(me++,S),Ke.push(new b(Be,Me,ve))}for(let we=0;we<3;we++){const ut=.3+vt(te,30+we)*.5;F.set(Be+(we-1)*.5,Me+ut*.8-.3,ve+vt(te,40+we)*.4),S.compose(F,M.setFromEuler(P.set((we-1)*.4,vt(te,we)*3,0)),B.set(ut,ut,ut)),pe.setMatrixAt(Oe,S),pe.setColorAt(Oe++,Le.copy(Se).lerp(new X(16777215),.2)),je.push(new b(Be,Me,ve))}}n.add(We,$,pe);const it=[],le=[];j.forEach(te=>{it.push(te.x,te.y-.3,te.z),le.push(te.c.r,te.c.g,te.c.b)});const _e=new qe;_e.setAttribute("position",new Ne(it,3)),_e.setAttribute("color",new Ne(le,3));const D=new Hr(_e,new Mt({transparent:!0,depthWrite:!1,blending:Sn,vertexColors:!0,vertexShader:`varying vec3 vC; void main(){ vC = color; vec4 mv = modelViewMatrix*vec4(position,1.0);
        gl_PointSize = clamp(2400.0 / -mv.z, 8.0, 260.0); gl_Position = projectionMatrix*mv; }`,fragmentShader:"varying vec3 vC; void main(){ float d = length(gl_PointCoord-0.5); gl_FragColor = vec4(vC, pow(smoothstep(0.5, 0.0, d), 2.2) * 0.45); }"}));D.frustumCulled=!1,n.add(D),z.push(el(We,Ke,4,8),el($,Ke,4,8),el(pe,je,4,8));const ze=g0(new X(3828376),.16),fe=new Ie(new Bt(1.4,3.6,l,24,1,!0).translate(0,l/2,0),ze);fe.rotation.x=Math.PI,fe.position.set(i,l-.5,r-1),n.add(fe);const Ue=Math.round(160*e.dense),xe=new Float32Array(Ue*3),$e=new Float32Array(Ue);for(let te=0;te<Ue;te++)xe[te*3]=i+(vt(te,50)-.5)*o*1.7,xe[te*3+1]=.3+vt(te,51)*8,xe[te*3+2]=r+(vt(te,52)-.5)*a*1.7,$e[te]=vt(te,53)*6.28;const Pe=new qe;Pe.setAttribute("position",new Je(xe,3)),Pe.setAttribute("ph",new Je($e,1));const I=new Mt({transparent:!0,depthWrite:!1,blending:Sn,uniforms:{uT:{value:0},uC:{value:new X(7009760)}},vertexShader:`attribute float ph; uniform float uT; varying float vA; void main(){
      vec3 p = position + vec3(sin(uT*0.3+ph)*0.6, sin(uT*0.5+ph*2.0)*0.4, cos(uT*0.25+ph)*0.6);
      vec4 mv = modelViewMatrix*vec4(p,1.0); vA = 0.5 + 0.5*sin(uT*1.7 + ph*3.0);
      gl_PointSize = clamp(120.0 / -mv.z, 1.5, 7.0); gl_Position = projectionMatrix*mv; }`,fragmentShader:`uniform vec3 uC; varying float vA; void main(){ float d = length(gl_PointCoord-0.5);
      gl_FragColor = vec4(uC*1.5, smoothstep(0.5, 0.0, d) * vA); }`}),R=new Hr(Pe,I);R.frustumCulled=!1,n.add(R);const q=QA(o*2.4,a*2.4,i,r,e,j);n.add(q.mesh);const ee=_0(s,new X(3862736));n.add(ee.mesh),n.traverse(te=>te.isMesh&&te!==q.mesh&&[te.material].flat().forEach($l));const re={fog:new X(330518),fogNear:22,fogFar:62,hemiSky:new X(9091304),hemiGround:new X(1714760),hemiI:1.45,sunCol:new X(12574975),sunI:1.8,sunOff:new b(-3,16,-5)},V=j.map(te=>te.c.clone()),de=new X(Lt.bolt?.c??"#b47bff");let ce=0,Ee=1;return t.tick.push(te=>{const{t:J,G:Me,dt:De}=te;for(const Se of z)Se(te.camera.position);q.uniforms.uT.value=J,ee.mat.uniforms.uT.value=J,I.uniforms.uT.value=J,ze.uniforms.uT.value=J*.2;const Be=Me.boss,ve=Be&&Be.phase===2?1:0;ve&&Ee===1&&(ce=.5),Ee=ve?2:1,ve&&Math.random()<De*.35&&(ce=.25),ce=Math.max(0,ce-De),j.forEach((Se,we)=>{Se.c.copy(V[we]).lerp(de,ve*.45),Se.i=1.4+Math.sin(J*1.3+we*1.7)*.25,q.uniforms.uLC.value[we]?.copy(Se.c).multiplyScalar(Se.i*.6)}),re.hemiSky.set(9091304).lerp(de,ve*.3),re.hemiI=1.45+ce*3,re.sunI=1.8+ce*4,I.uniforms.uC.value.set(7009760).lerp(de,ve*.6)}),{kind:"boss",group:n,env:re,lamps:j,tick:te=>t.tick.forEach(J=>J(te)),spawnFx:t.spawnFx,stats:t.stats,dispose:t.dispose}}const tE={circle:0,fan:1,rect:2,ring:3,dash:4},nE=`uniform float uR; varying vec2 vP; void main(){ vP = position.xz * uR * 1.02;
  gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,iE=`uniform float uShape, uR, uP, uHalf, uK, uFlash, uT, uEdge; uniform vec3 uC; varying vec2 vP;
  void main(){
    vec2 p = vP; float r = length(p); float ed; float pr;
    if (uShape < 0.5) { ed = uR - r; pr = step(r, uR * uP); }
    else if (uShape < 1.5) { float a = abs(atan(p.y, p.x)); ed = min(uR - r, (uHalf - a) * max(r, 0.3)); pr = step(r, uR * uP); }
    else if (uShape < 2.5) { ed = min(min(p.x, uR - p.x), uHalf - abs(p.y)); pr = step(p.x, uR * uP); }
    else if (uShape < 3.5) { ed = uHalf - abs(r - uR); pr = 1.0; }
    else { ed = min(min(p.x, uR - p.x), uHalf - abs(p.y)); pr = step(0.45, fract((p.x - uT * 1.5) / 0.45)); }
    if (ed < 0.0) discard;
    bool fl = uFlash > 0.5;
    vec3 col = uC; float a = 0.10 + uK * 0.08;
    if (uShape > 2.5) { a = 0.0; }
    if (pr > 0.5 && uShape < 2.5) { a = fl ? 0.42 : 0.22 + uK * 0.2; col = fl ? vec3(1.0, 0.92, 0.92) : uC; }
    float e = 1.0 - smoothstep(0.0, uEdge, ed);
    if (uShape > 2.5) e = uShape > 3.5 ? pr * (0.6 + 0.4 * (1.0 - smoothstep(0.0, uHalf, ed))) : 1.0 - smoothstep(0.0, uHalf, ed) * 0.6;
    vec3 ec = fl ? vec3(1.6) : mix(uC * 1.4, vec3(1.5, 1.2, 0.95), uK * 0.6);
    col = mix(col, ec, e);
    a = max(a, e * (0.45 + uK * 0.55));
    gl_FragColor = vec4(col, a);
  }`,sE=new X(1,.24,.22);function rE(s){const e=new Ge;e.name="tele3d",s.add(e);const t=new _i(2,2).rotateX(-Math.PI/2),n=[];let i=0;function r(){let p=n[i];if(!p){const _={uShape:{value:0},uR:{value:1},uP:{value:1},uHalf:{value:.5},uK:{value:0},uFlash:{value:0},uT:{value:0},uEdge:{value:.09},uC:{value:new X}},g=new Mt({uniforms:_,vertexShader:nE,fragmentShader:iE,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),m=new Ie(t,g);m.renderOrder=2,m.frustumCulled=!1,e.add(m),p={m,u:_},n.push(p)}return i++,p.m.visible=!0,p}function o(p,_,g,m,v,y,x={}){const E=r(),T=v/he;return E.m.position.set(_/he,.035+i*.002,g/he),E.m.rotation.y=-m,E.m.scale.set(T,1,T),E.u.uShape.value=tE[p],E.u.uR.value=T,E.u.uP.value=x.p??y,E.u.uHalf.value=x.half??.5,E.u.uK.value=y,E.u.uFlash.value=x.flash??(y>=gd.telegraph.flashAt&&Math.sin(x.time*42)>-.2?1:0),E.u.uT.value=x.time??0,E.u.uEdge.value=x.edge??.09,E.u.uC.value.copy(x.col??sE),E}const a=new Bt(1,1,.45,64,1,!0).translate(0,.22,0),l=[];let c=0;function u(p,_){const g=new X(Lt[p.el]?.c??"#ffb070"),m=Math.max(0,1-p.r/p.max);o("ring",p.x,p.y,0,p.r,1,{half:.12,col:g,flash:0,time:_});let v=l[c];if(!v){const x=new Mt({transparent:!0,depthWrite:!1,side:Nt,blending:Sn,uniforms:{uC:{value:new X},uA:{value:1}},vertexShader:"varying float vY; void main(){ vY = position.y / 0.45; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform vec3 uC; uniform float uA; varying float vY; void main(){ gl_FragColor = vec4(mix(vec3(1.4), uC*1.5, vY), (1.0 - vY) * uA); }"}),E=new Ie(a,x);E.frustumCulled=!1,e.add(E),v={m:E,mat:x},l.push(v)}c++,v.m.visible=!0,v.m.position.set(p.x/he,0,p.y/he);const y=p.r/he;v.m.scale.set(y,1,y),v.mat.uniforms.uC.value.copy(g),v.mat.uniforms.uA.value=.35+m*.6}function h(p){i=c=0;const _=p.time,g=p.p;for(const m of p.enemies){if(m.dead)continue;const v=m.tele;if(!v)continue;if(m.isBoss){if(m.state!=="wind")continue;const x=Math.min(1,m.t/v.dur);if(v.kind==="line")o("rect",m.x,m.y,v.ang,v.len,x,{half:46/he,time:_});else if(v.kind==="fan")o("fan",m.x,m.y-24,v.ang,480,x,{p:(60+420*x)/480,half:.6,time:_});else if(v.kind==="rain")for(const E of m.rain??[])o("circle",E.x,E.y,0,66,x,{time:_});else if(v.kind==="summon"){const E=x>=gd.telegraph.flashAt&&Math.sin(_*42)>-.2;o("ring",m.x,m.y,0,60+x*60,x,{half:.1,col:E?new X(1,1,1):new X(Lt.bolt.c),flash:0,time:_})}continue}const y=Math.min(1,v.t/v.dur);if(v.kind==="circle")o("circle",v.x,v.y,0,v.r,y,{time:_});else if(v.kind==="hop")o("circle",v.tx,v.ty,0,v.r,y,{time:_});else if(v.kind==="arc")o("fan",v.x,v.y,v.ang,v.r,y,{half:v.arc,time:_});else if(v.kind==="proj"){const x=g.x-m.x,E=g.y-m.y;o("dash",m.x,m.y,Math.atan2(E,x),Math.hypot(x,E),y,{half:.07,time:_,edge:.07})}}for(const m of p.waves??[])u(m,_);for(const m of p.fields??[]){const v=new X(Lt[m.el]?.c??"#ffffff");o("circle",m.x,m.y,0,m.r,.4,{p:0,col:v,flash:0,time:_}),o("ring",m.x,m.y,0,m.r*(.55+.1*Math.sin(_*3)),1,{half:.06,col:v,flash:0,time:_})}for(let m=i;m<n.length;m++)n[m].m.visible=!1;for(let m=c;m<l.length;m++)l[m].m.visible=!1}function d(){e.removeFromParent(),t.dispose(),a.dispose();for(const p of n)p.m.material.dispose();for(const p of l)p.mat.dispose()}function f(){for(const p of n)p.m.visible=!1;for(const p of l)p.m.visible=!1}return{sync:h,clear:f,dispose:d,count:()=>i}}const tt={box:(s,e,t)=>new Pt(s,e,t),cyl:(s,e,t,n=10)=>new Bt(s,e,t,n),sph:(s,e=12)=>new tn(s,e,Math.max(6,e*2/3)),ico:(s,e=1)=>new Ni(s,e),cone:(s,e,t=8)=>new Mn(s,e,t)};function nt(s,e,t=.02,n,i=1.2){const r=St({color:e,emissive:n??0,emissiveIntensity:n!==void 0?i:0}),o=new Ie(s,r);return o.castShadow=!0,o.receiveShadow=!0,t&&o.add(new Ie(s,na(t))),o}const ft=(s,e,t,n)=>(s.position.set(e,t,n),s),Fu=s=>s.material;function Kp(s=1){const e=new Ge,t=nt(tt.cone(.12*s,.36*s,7),16747066,0,16738848,1.8),n=nt(tt.cone(.06*s,.22*s,6),16769152,0,16765024,2.2);return n.position.y=-.03*s,e.add(t,n),e}const Jp=(s,e,t=0)=>{const n=1+Math.sin(e*17+t)*.08+Math.sin(e*29+t*2)*.05;s.scale.set(1/n,n,1/n)};function Qp(s=.55,e=.12,t=9078392){return ft(nt(tt.cyl(s*.55,s*.62,e,8),t,.02),0,e/2,0)}const Jl={den(){const s=new Ge;s.add(Qp(.5)),s.add(ft(nt(tt.cyl(.11,.14,.55,6),8223346),0,.39,0));const e=ft(nt(tt.cyl(.24,.2,.12,6),6052436),0,.72,0);s.add(e);const t=ft(nt(tt.cyl(.16,.1,.08,8),4868162),0,.82,0);s.add(t);const n=ft(Kp(1.1),0,1,0),i=new Xs(16752720,0,3.2,1.6);return i.position.y=1.05,s.add(n,i),{obj:s,upd(r,o){n.visible=r.xong,Jp(n,o,r.x);const a=r.henGio===null?1:.45+.55*r.henGio;n.scale.multiplyScalar(a),i.intensity=r.xong?2.2*a:0}}},denLan(){const s=Jl.den(),e=ft(nt(tt.box(.26,.26,.26),12601914,.02),0,1.05,0);e.rotation.y=Math.PI/4,s.obj.add(e);const t=s.upd;return{obj:s.obj,upd(n,i){t(n,i);const r=Fu(e);r.emissive.set(n.xong?16748624:n.trangThai>0?8400928:0),r.emissiveIntensity=n.xong?1.6+Math.sin(i*6)*.2:1,e.rotation.y=Math.PI/4+(n.xong?i*.8:0)}}},gai(){const s=new Ge,e=[];for(let n=0;n<9;n++){const i=n/9*Math.PI*2,r=.2+At(n,3)*.2,o=nt(tt.cone(.09,.55+At(n,7)*.3,5),4872746,.015);o.position.set(Math.cos(i)*r,.25,Math.sin(i)*r),o.rotation.set(Math.sin(i)*.5,0,-Math.cos(i)*.5),e.push(o),s.add(o)}s.add(ft(nt(tt.ico(.32,1),4016674,.02),0,.2,0));const t=ft(nt(tt.cyl(.45,.5,.05,10),3814964,0),0,.03,0);return s.add(t),{obj:s,upd(n){for(const i of e)i.visible=!n.xong;s.children[9].visible=!n.xong,t.visible=n.xong}}},bangChan(){const s=new Ge,e=new Ge;for(let n=0;n<4;n++){const i=nt(tt.ico(.35-n*.04,0),11068671,.02,4894944,.25);i.position.set((n-1.5)*.22,.32+n%2*.12,n%2*.1),i.rotation.set(n,n*2,0),e.add(i)}const t=ft(nt(tt.cyl(.5,.5,.02,12),8044776,0),0,.02,0);return s.add(e,t),{obj:s,upd(n){e.visible=!n.xong,t.visible=n.xong}}},bon(){const s=new Ge;s.add(ft(nt(tt.cyl(.42,.36,.34,10),9078392),0,.17,0));const e=ft(nt(tt.cyl(.33,.33,.02,10),5920334,0),0,.33,0),t=ft(nt(tt.cyl(.33,.33,.04,14),4892904,0,2783424,.35),0,.32,0);return s.add(e,t),{obj:s,upd(n,i){t.visible=n.xong||n.trangThai>0,t.position.y=.3+Math.sin(i*2+n.x)*.006}}},bonHoi(){const s=Jl.bon(),e=ft(nt(tt.cyl(.36,.36,.08,10),11577488,.02),0,.38,0),t=[];for(let i=0;i<4;i++){const r=nt(tt.sph(.12,8),16777215,0);r.material.transparent=!0,t.push(r),s.obj.add(r)}s.obj.add(e);const n=s.upd;return{obj:s.obj,upd(i,r){n(i,r),e.position.y=i.xong?.38+.9:.38,t.forEach((o,a)=>{o.visible=i.xong;const l=(r*.6+a/4)%1;o.position.set(Math.sin(a*2.3)*.15,.4+l*.9,Math.cos(a*1.7)*.15),o.scale.setScalar(.6+l*.8),o.material.opacity=.7*(1-l)})}}},lua(){const s=new Ge,e=[];for(let i=0;i<5;i++){const r=Kp(1.4+At(i,1)*.6);r.position.set((i-2)*.18,.18,Math.sin(i*2.1)*.12),e.push(r),s.add(r)}const t=ft(nt(tt.cyl(.5,.55,.06,10),2761248,0),0,.03,0),n=new Xs(16744512,2,3.5,1.5);return n.position.y=.6,s.add(t,n),{obj:s,upd(i,r){e.forEach((o,a)=>(o.visible=!i.xong,Jp(o,r,a*1.7))),n.intensity=i.xong?0:2+Math.sin(r*13)*.4}}},mam(){const s=new Ge;s.add(ft(nt(tt.cyl(.3,.36,.12,8),8018490),0,.06,0));const e=ft(nt(tt.cone(.06,.35,5),9075274,.015),0,.28,0);e.rotation.z=.5;const t=new Ge;for(let i=0;i<5;i++){const r=nt(tt.box(.7,.05,.45),i%2?5943368:6997080,.015);r.position.set(0,.12,-.4-i*.42),r.rotation.y=(i%2?1:-1)*.15,t.add(r)}const n=ft(nt(tt.cyl(.06,.08,.6,6),3836474,.015),0,.3,0);return s.add(e,t,n),{obj:s,upd(i){e.visible=!i.xong,t.visible=n.visible=i.xong,t.rotation.y={n:0,s:Math.PI,e:-Math.PI/2,w:Math.PI/2}[i.huong]}}},cot(){const s=new Ge,e=ft(nt(tt.box(.7,.06,.7),6973020,.015),0,.03,0),t=ft(nt(tt.box(.36,.02,.36),15315514,0,15315514,.4),0,.07,0),n=ft(nt(tt.cyl(.26,.3,1,6),12098138,.025),0,.55,0);return s.add(e,t,n),{obj:s,upd(i,r){n.visible=i.xong,Fu(t).emissiveIntensity=i.xong?1.6:.3+Math.sin(r*3)*.15}}},cau(){const s=new Ge,e=[];for(let t=0;t<6;t++){const n=nt(tt.box(.9,.08,.3),9071170,.015);n.position.set(0,.05,(t-2.5)*.34),e.push(n),s.add(n)}for(const t of[-1,1])s.add(ft(nt(tt.box(.06,.06,2.1),6965802,.012),t*.45,.14,0));return{obj:s,upd(t){e.forEach((n,i)=>{const r=!t.xong&&(i===2||i===3);n.visible=!r,n.rotation.z=t.xong?0:i%2?.08:-.06}),s.rotation.y=t.huong==="e"||t.huong==="w"?Math.PI/2:0}}},tuong(){const s=new Ge,e=new Ge;for(let i=0;i<3;i++)for(let r=0;r<3;r++){const o=nt(tt.box(.34,.32,.4),i===1&&r===1?8025190:9077878,.015);o.position.set((r-1)*.35+i%2*.06,.17+i*.33,0),e.add(o)}const t=ft(nt(tt.box(.04,.6,.42),2762272,0),.02,.5,0);t.rotation.z=.4;const n=new Ge;for(let i=0;i<6;i++){const r=nt(tt.ico(.1+At(i,9)*.06,0),9077878,.012);r.position.set((At(i,2)-.5)*.9,.07,(At(i,5)-.5)*.6),n.add(r)}return s.add(e,t,n),{obj:s,upd(i){e.visible=t.visible=!i.xong,n.visible=i.xong,s.rotation.y=i.huong==="e"||i.huong==="w"?Math.PI/2:0}}},coi(){const s=new Ge;s.add(ft(nt(tt.cyl(.22,.3,1.1,8),14207136,.02),0,.55,0)),s.add(ft(nt(tt.cone(.32,.3,8),9062970,.02),0,1.25,0));const e=ft(new Ge,0,.95,.3);for(let t=0;t<4;t++){const n=nt(tt.box(.12,.6,.03),15788240,.012);n.position.y=.32;const i=new Ge;i.rotation.z=t*Math.PI/2,i.add(n),e.add(i)}return s.add(e),{obj:s,upd(t,n){e.rotation.z=t.xong?-n*4:.2}}},suong(){const s=new Ge,e=[];for(let t=0;t<7;t++){const n=nt(tt.sph(.3+At(t,4)*.15,10),10119880,0,6961824,.4),i=n.material;i.transparent=!0,i.opacity=.55,i.depthWrite=!1,n.castShadow=!1,e.push(n),s.add(n)}return{obj:s,upd(t,n){e.forEach((i,r)=>{i.visible=!t.xong,i.position.set(Math.sin(n*.5+r*1.3)*.4,.35+Math.sin(n*.8+r)*.1+r%3*.15,Math.cos(n*.4+r*2.1)*.35)})}}},luongGio(){const s=new Ge;s.add(ft(nt(tt.cyl(.4,.46,.1,10),6982266,.015),0,.05,0));const e=ft(nt(tt.cyl(.28,.28,.02,12),2767412,0),0,.11,0);s.add(e);const t=[];for(let n=0;n<3;n++){const i=new Ie(new Oi(.3,.025,6,20),new bt({color:12449508,transparent:!0,depthWrite:!1}));i.rotation.x=Math.PI/2,t.push(i),s.add(i)}return{obj:s,upd(n,i){t.forEach((r,o)=>{r.visible=n.xong;const a=(i*.9+o/3)%1;r.position.y=.15+a*1.8,r.scale.setScalar(1+a*.6),r.material.opacity=.8*(1-a)})}}},bangMat(){const s=new Ge,e=ft(nt(tt.box(.95,.02,.95),2775706,0,1718896,.3),0,.01,0),t=ft(nt(tt.box(.9,.08,.9),12577023,.012,8046832,.25),0,.04,0);return s.add(e,t),{obj:s,upd(n){t.visible=n.xong}}},loiTru(){const s=new Ge;s.add(Qp(.55)),s.add(ft(nt(tt.cyl(.08,.1,1.2,6),5921386,.02),0,.7,0));const e=ft(nt(tt.ico(.16,1),12088115,.015,11828223,0),0,1,0),t=ft(nt(tt.cone(.06,.25,6),12632272,.012),0,1.42,0),n=new Xs(11828223,0,3,1.6);return n.position.y=1.1,s.add(e,t,n),{obj:s,upd(i,r){const o=Fu(e);o.emissiveIntensity=i.xong?1.8+Math.sin(r*20)*.4:i.trangThai>0?.6:0,e.rotation.y=r*(i.xong?3:.3),n.intensity=i.xong?2:0}}}};function oE(s){let e=0;for(const m of s)e=e*31+m.charCodeAt(0)|0;const t=m=>At(e&65535,m),n=[6965898,3828362,9067066,4880986,9058890,5921402],i=[3811872,1710628,9071162,13156528,6961706,2767450],r=[15913648,15253658,14198912,16178372],o=n[Math.floor(t(1)*n.length)],a=i[Math.floor(t(2)*i.length)],l=r[Math.floor(t(3)*r.length)],c=.85+t(4)*.25,u=new Ge,h=new Ge;u.add(h),h.scale.setScalar(c),h.add(ft(nt(tt.cyl(.17,.3,.7,10),o,.02),0,.35,0)),h.add(ft(nt(tt.cyl(.18,.18,.08,10),14731408,.012),0,.5,0));const d=ft(nt(tt.sph(.22,14),l,.02),0,.95,0);h.add(d);const f=nt(tt.sph(.235,14),a,.02);f.scale.set(1,.75,1),f.position.set(0,.06,-.03),d.add(f),t(5)>.5&&d.add(ft(nt(tt.sph(.11,8),a,.015),0,.1,-.2));for(const m of[-1,1]){const v=nt(tt.sph(.035,8),1709094,0);v.position.set(m*.08,-.01,.19),d.add(v);const y=nt(tt.cyl(.05,.06,.45,6),o,.015);y.position.set(m*.22,.48,0),y.rotation.z=m*.25,h.add(y),y.add(ft(nt(tt.sph(.06,8),l,0),0,-.25,0))}const p=new Ge;p.add(ft(nt(tt.box(.07,.24,.07),16769658,.015,16760896,1.4),0,.12,0)),p.add(ft(nt(tt.box(.07,.07,.07),16769658,.015,16760896,1.4),0,-.06,0));const _=new Ge;for(let m=0;m<3;m++)_.add(ft(nt(tt.sph(.045,8),10479871,.01,6998256,1.2),(m-1)*.12,0,0));const g=ft(new Ge,0,1.45*c,0);return g.add(p,_),u.add(g),{obj:u,body:h,head:d,mark:g,bang:p,dots:_,yaw:t(6)*Math.PI*2}}function aE(s){const e=new Ge;s.add(e);const t=new Map,n=new Map,i=r=>{r.removeFromParent(),r.traverse(o=>{o.geometry?.dispose(),o.material&&!o.material.side&&o.material.dispose?.()})};return{sync(r,o,a,l,c,u,h){const d=new Set;for(const p of r?.puzzles??[])for(const _ of p.objs){if(!h(_.x,_.y))continue;const g=Jl[_.loai];if(!g)continue;d.add(_);let m=t.get(_);m||(m=g(),t.set(_,m),e.add(m.obj));const v=M0(_,l);m.obj.position.set(_.x/l,c(_.x,_.y),_.y/l),m.upd?.(v,u),_.flash>0?m.obj.scale.setScalar(1+_.flash*.12):m.obj.scale.setScalar(1)}for(const[p,_]of t)d.has(p)||(i(_.obj),t.delete(p));const f=new Set;for(const p of r?.npcs??[]){if(!h(p.x,p.y))continue;f.add(p);let _=n.get(p);_||(_=oE(p.mini?.id??`${p.x},${p.y}`),n.set(p,_),e.add(_.obj)),_.obj.position.set(p.x/l,c(p.x,p.y),p.y/l);let v=(Math.hypot(o.x-p.x,o.y-p.y)<l*4?Math.atan2(o.x-p.x,o.y-p.y):_.yaw)-_.obj.rotation.y;v=Math.atan2(Math.sin(v),Math.cos(v)),_.obj.rotation.y+=v*.08,_.body.position.y=Math.sin(u*2+_.yaw)*.015,_.head.rotation.z=Math.sin(u*1.3+_.yaw)*.05;const y=p.mini?.id,x=y&&a.mini.includes(y),E=y&&a.talked.includes(y);_.mark.visible=!x,_.bang.visible=!E,_.dots.visible=!!E,_.mark.position.y=1.45*_.body.scale.y+Math.sin(u*4)*.05,_.mark.rotation.y=u*1.5-_.obj.rotation.y}for(const[p,_]of n)f.has(p)||(i(_.obj),n.delete(p))},has(r){return!!Jl[r]},dispose(){for(const r of t.values())i(r.obj);for(const r of n.values())i(r.obj);t.clear(),n.clear(),e.removeFromParent()}}}const Ql=22/40,qs=-.14,Bu=-.7,lE=22;function cE(s,e,t){if(e<0||t<0||e>=on||t>=Ys)return Bu;const n=t*on+e,i=s.m[n];return i===Vt.WATER||i===Vt.DEEP||i===Vt.BRIDGE?i===Vt.DEEP?Bu-.3:Bu:i===Vt.TREE||i===Vt.ROCK?i===Vt.ROCK&&s.h[n]>1?s.h[n]*Ql:0:(s.h?.[n]??0)*Ql}function uE(s,e){const t=on*e+1,n=new Float32Array(t*t);for(let r=0;r<t;r++)for(let o=0;o<t;o++){const a=o/e,l=r/e,c=o%e===0,u=r%e===0;let h=-9;for(const d of c?[-1,0]:[0])for(const f of u?[-1,0]:[0])h=Math.max(h,cE(s,Math.floor(a)+d,Math.floor(l)+f));n[r*t+o]=h}const i=new Float32Array(t*t);for(let r=0;r<2;r++){for(let o=0;o<t;o++)for(let a=0;a<t;a++){let l=0,c=0;for(let h=-1;h<=1;h++)for(let d=-1;d<=1;d++){const f=a+d,p=o+h;f<0||p<0||f>=t||p>=t||(l+=n[p*t+f],c++)}const u=n[o*t+a];i[o*t+a]=u+(l/c-u)*(u<qs?.9:.55)}n.set(i)}for(let r=0;r<t;r++)for(let o=0;o<t;o++)n[r*t+o]+=($n(o/(e*2.5),r/(e*2.5),3)-.5)*.06;return{R:e,n:t,h:n,at(r,o){const a=Math.min(t-1.001,Math.max(0,r*e)),l=Math.min(t-1.001,Math.max(0,o*e)),c=Math.floor(a),u=Math.floor(l),h=a-c,d=l-u,f=n[u*t+c],p=n[u*t+c+1],_=n[(u+1)*t+c],g=n[(u+1)*t+c+1];return f+(p-f)*h+(_-f)*d+(f-p-_+g)*h*d}}}const jn={grass:new X(8176474),grass2:new X(6270540),path:new X(13804650),sand:new X(15785120),bed:new X(13220234),rock:new X(10129286),rock2:new X(8023923),ledge:new X(9424738)};function hE(s,e,t,n,i,r){if(e<0||t<0||e>=on||t>=Ys)return n.copy(jn.bed);const o=s.m[t*on+e];return o===Vt.PATH?n.copy(jn.path):o===Vt.SAND?n.copy(jn.sand):o===Vt.WATER||o===Vt.DEEP||o===Vt.BRIDGE?n.copy(jn.bed):o===Vt.ROCK&&s.h[t*on+e]>1?n.copy(jn.rock):o===Vt.LEDGE?n.copy(jn.ledge):n.copy(jn.grass).lerp(jn.grass2,$n(i*.35,r*.35,9))}function dE(s,e,t,n=!1){const i=new Ge,{R:r,n:o,h:a}=e,l=new Float32Array(o*o),c=new Float32Array(o*o),u=new Float32Array(o*o*3),h=new X,d=new X;for(let _=0;_<o;_++)for(let g=0;g<o;g++){const m=_*o+g,v=g/r,y=_/r,x=(a[Math.min(o-1,g+1)+_*o]-a[Math.max(0,g-1)+_*o])*r*.5,E=(a[g+Math.min(o-1,_+1)*o]-a[g+Math.max(0,_-1)*o])*r*.5,T=Math.hypot(x,E),w=Math.min(1,T*.8)*.16;l[m]=v+($n(v*2.1,y*2.1,1)-.5)*w*2,c[m]=y+($n(v*2.1,y*2.1,2)-.5)*w*2,d.setRGB(0,0,0);for(let M=0;M<4;M++){const P=(M&1?.22:-.22)+($n(v*.9,y*.9,5)-.5)*.7,F=(M&2?.22:-.22)+($n(v*.9,y*.9,6)-.5)*.7;hE(s,Math.floor(v+P),Math.floor(y+F),h,v,y),d.r+=h.r/4,d.g+=h.g/4,d.b+=h.b/4}const A=a[m];if(T>.9){const M=Math.floor(A/.18)%2?jn.rock2:jn.rock;d.lerp(M,Math.min(1,(T-.9)*1.5))}A<qs+.06&&A>qs-.25&&d.lerp(jn.sand,.6);const S=.94+At(g,_,4)*.06;u[m*3]=d.r*S,u[m*3+1]=d.g*S,u[m*3+2]=d.b*S}const f=St({vertexColors:!0}),p=lE*r;for(let _=0;_<o-1;_+=p)for(let g=0;g<o-1;g+=p){const m=Math.min(p,o-1-g),v=Math.min(p,o-1-_),y=new Float32Array((m+1)*(v+1)*3),x=new Float32Array((m+1)*(v+1)*3);for(let A=0;A<=v;A++)for(let S=0;S<=m;S++){const M=(_+A)*o+g+S,P=(A*(m+1)+S)*3;y[P]=l[M],y[P+1]=a[M],y[P+2]=c[M],x.set(u.subarray(M*3,M*3+3),P)}const E=[];for(let A=0;A<v;A++)for(let S=0;S<m;S++){const M=A*(m+1)+S,P=M+1,F=M+m+1,B=F+1;E.push(M,F,P,P,F,B)}const T=new qe;T.setAttribute("position",new Je(y,3)),T.setAttribute("color",new Je(x,3)),T.setIndex(E),T.computeVertexNormals(),T.computeBoundingSphere();const w=new Ie(T,f);w.receiveShadow=t,w.castShadow=n,i.add(w)}return i}function fE(s){const t=on*4,n=new Uint8Array(t*t),i=new Float32Array(t*t).fill(1e9),r=[];for(let u=0;u<t;u++)for(let h=0;h<t;h++)s.at((h+.5)/4,(u+.5)/4)>qs&&(n[u*t+h]=1,i[u*t+h]=0,r.push(u*t+h));for(let u=0;u<r.length;u++){const h=r[u],d=h%t,f=h/t|0;for(let p=-1;p<=1;p++)for(let _=-1;_<=1;_++){const g=d+_,m=f+p;if(g<0||m<0||g>=t||m>=t)continue;const v=m*t+g,y=i[h]+(_&&p?1.41:1);y<i[v]&&(i[v]=y,r.push(v))}}const o=new Uint8Array(t*t*4);for(let u=0;u<t*t;u++){o[u*4]=Math.min(255,i[u]/16*255);const h=u/t|0,d=u%t;o[u*4+1]=Math.min(255,Math.max(0,(qs-s.at((d+.5)/4,(h+.5)/4))/1.2*255)),o[u*4+3]=255}const a=new kn(o,t,t,ln);a.magFilter=a.minFilter=Ft,a.needsUpdate=!0;const l=new Mt({transparent:!0,fog:!0,uniforms:Vn.merge([Re.fog,{uT:{value:0},uShore:{value:null},uSize:{value:on},uSky:{value:new X},uNight:{value:0}}]),vertexShader:`varying vec2 vMap; varying vec3 vW;
      #include <fog_pars_vertex>
      void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW=w.xyz; vMap=w.xz;
        vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`uniform float uT; uniform sampler2D uShore; uniform float uSize; uniform vec3 uSky; uniform float uNight;
      varying vec2 vMap; varying vec3 vW;
      #include <fog_pars_fragment>
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec2 uv = vMap/uSize; vec4 s = texture2D(uShore, uv);
        bool inside = uv.x>0.0 && uv.y>0.0 && uv.x<1.0 && uv.y<1.0;
        float d = inside ? s.r : 1.0; float depth = inside ? s.g : 1.0;
        vec3 shallow = vec3(0.18,0.68,0.78), deep = vec3(0.06,0.3,0.6);
        vec3 c = mix(shallow, deep, smoothstep(0.05, 0.6, depth));
        c = mix(c, uSky, 0.1);
        float wob = n(vMap*1.3 + vec2(uT*0.25, uT*0.18))*0.06;
        float foam = 1.0 - smoothstep(0.0, 0.025, abs(d - 0.06 - 0.03*sin(uT*1.6 + n(vMap*2.0)*6.0) - wob));
        foam = max(foam, 1.0 - smoothstep(0.02, 0.05, d));
        float line = step(0.78, n(vMap*vec2(2.2,5.0) + vec2(uT*0.4, uT*0.1))) * step(0.5, n(vMap*0.7 - uT*0.05)) * 0.35;
        c = mix(c, vec3(1.0), clamp(foam + line, 0.0, 1.0));
        c *= mix(1.0, 0.45, uNight);
        gl_FragColor = vec4(c, mix(0.88, 0.97, smoothstep(0.0, 0.3, depth)));
        #include <fog_fragment>
      }`});l.uniforms.uShore.value=a;const c=new Ie(new _i(on*3,Ys*3).rotateX(-Math.PI/2),l);return c.position.set(on/2,qs,Ys/2),c.renderOrder=1,{mesh:c,tick(u,h){l.uniforms.uT.value=u,l.uniforms.uSky.value.copy(h)}}}function pE(s,e,t){const i=new qe,r=[],o=[];for(let y=0;y<5;y++){const x=y/5*Math.PI+At(y,1)*.6,E=.12+At(y,2)*.12,T=Math.cos(x*2.3)*E,w=Math.sin(x*2.3)*E,A=.045,S=.26+At(y,3)*.14,M=Math.cos(x)*A,P=Math.sin(x)*A;r.push(T-M,0,w-P,T+M,0,w+P,T+M*.2,S,w+P*.2),o.push(0,0,1)}i.setAttribute("position",new Ne(r,3)),i.setAttribute("k",new Ne(o,1));const a=t*900,l=new Mt({side:Nt,fog:!0,uniforms:Vn.merge([Re.fog,{uT:{value:0},uLight:{value:new X(1,1,1)}}]),vertexShader:`attribute float k; attribute vec3 tint; varying float vK; varying vec3 vTint; uniform float uT;
      #include <fog_pars_vertex>
      void main(){ vK=k; vTint=tint; vec4 w = modelMatrix*instanceMatrix*vec4(position,1.0);
        float sway = sin(uT*2.2 + w.x*0.9 + w.z*0.7)*0.06 + sin(uT*3.7 + w.x*2.1)*0.025;
        w.x += sway*k; w.z += sway*0.6*k;
        vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`varying float vK; varying vec3 vTint; uniform vec3 uLight;
      #include <fog_pars_fragment>
      void main(){ vec3 root = vec3(0.24,0.52,0.25), tip = vTint;
        gl_FragColor = vec4(mix(root, tip, smoothstep(0.0,1.0,vK))*uLight, 1.0);
        #include <fog_fragment>
      }`}),c=new Xt(i,l,Math.max(1,a)),u=new Float32Array(Math.max(1,a)*3);i.setAttribute("tint",new ns(u,3)),c.frustumCulled=!1,c.count=0;let h=-999,d=-999;const f=new ke,p=new Qe,_=new b,g=new b,m=new b(0,1,0),v=[16765152,16773792,14207231,16777215];return{mesh:c,mat:l,update(y,x,E){if(l.uniforms.uT.value=E,Math.abs(y-h)<3&&Math.abs(x-d)<3)return;h=Math.round(y),d=Math.round(x);let T=0;const w=new X;for(let A=d-14;A<=d+14&&T<a;A++)for(let S=h-15;S<=h+15&&T<a;S++){if(S<0||A<0||S>=on||A>=Ys)continue;const M=s.m[A*on+S];if(!(M!==Vt.GRASS&&M!==Vt.FLOWER&&M!==Vt.LEDGE))for(let P=0;P<t&&T<a;P++){const F=S+At(S,A,P*2+11),B=A+At(S,A,P*2+12),U=e.at(F,B);if(U<qs+.05)continue;p.setFromAxisAngle(m,At(S,A,P+40)*6.28);const z=.8+At(S,A,P+50)*.6;f.compose(g.set(F,U-.02,B),p,_.set(z,z,z)),c.setMatrixAt(T,f),M===Vt.FLOWER&&P%2===0?w.set(v[(S*7+A*3+P)%v.length]):w.setHSL(.24+$n(F*.3,B*.3,8)*.06,.6,.55+At(S,A,P+60)*.08),u[T*3]=w.r,u[T*3+1]=w.g,u[T*3+2]=w.b,T++}}c.count=T,c.instanceMatrix.needsUpdate=!0,i.getAttribute("tint").needsUpdate=!0}}}function mE(s,e,t,n){const i=new Ge,r=new Map;for(let U=0;U<Ys;U++)for(let z=0;z<on;z++){const k=s.m[U*on+z],j=Math.floor(U/11)*20+Math.floor(z/11);if(k!==Vt.TREE&&!(k===Vt.ROCK&&s.h[U*on+z]<=1))continue;let W=r.get(j);W||r.set(j,W={trees:[],rocks:[]}),k===Vt.TREE?W.trees.push([z,U]):W.rocks.push([z,U,s.h[U*on+z]])}const o=[];for(const[U,z,k,j]of[[0,1.3,0,.6],[.32,1.05,.1,.38],[-.3,1.08,-.08,.4]]){const W=new Ni(j,1).translate(U,z,k);o.push(W)}const a=gE(o),l=a.getAttribute("position"),c=a.getAttribute("normal"),u=new b;for(let U=0;U<l.count;U++)u.set(l.getX(U),l.getY(U)-1.2,l.getZ(U)).normalize(),c.setXYZ(U,u.x,u.y,u.z);const h=new Bt(.08,.13,1,6).translate(0,.5,0),d=new ea(.42,1);{const U=d.getAttribute("position");for(let z=0;z<U.count;z++){u.fromBufferAttribute(U,z);const k=.82+$n(u.x*4+3,u.z*4+u.y*2,7)*.36;U.setXYZ(z,u.x*k,u.y*k*.75,u.z*k)}d.computeVertexNormals()}const f=St({color:16777215}),p=St({color:8016434}),_=St({color:11051680}),g=new ke,m=new Qe,v=new b,y=new b,x=new b(0,1,0),E=new X,T=[];for(const[U,{trees:z,rocks:k}]of r){const j={x:U%20*11+5.5,z:Math.floor(U/20)*11+5.5,ol:[]};if(T.push(j),z.length){const W=new Xt(h,p,z.length),ae=new Xt(a,f,z.length);z.forEach(([oe,be],Xe)=>{const We=.9+At(oe,be,3)*.35,$=(At(oe,be,4)-.5)*.25,pe=(At(oe,be,5)-.5)*.25,Le=e.at(oe+.5,be+.5);m.setFromAxisAngle(x,At(oe,be,6)*6.28),g.compose(y.set(oe+.5+$,Le-.05,be+.5+pe),m,v.set(We,We,We)),W.setMatrixAt(Xe,g),ae.setMatrixAt(Xe,g),E.setHSL(.26+At(oe,be,8)*.07,.55,.42+At(oe,be,9)*.08),ae.setColorAt(Xe,E)});for(const oe of[W,ae])oe.castShadow=t,oe.receiveShadow=t,oe.computeBoundingSphere(),i.add(oe);j.ol.push(Ls(ae,.035),Ls(W,.02))}if(k.length){const W=new Xt(d,_,k.length);k.forEach(([ae,oe,be],Xe)=>{const We=e.at(ae+.5,oe+.5);m.setFromAxisAngle(x,At(ae,oe,2)*6.28),g.compose(y.set(ae+.5,We+.08,oe+.5),m,v.set(1,.8+be*.4,1)),W.setMatrixAt(Xe,g)}),W.castShadow=W.receiveShadow=t,W.computeBoundingSphere(),i.add(W),j.ol.push(Ls(W,.025))}}const w=new Pt(1,.08,.95),A=St({color:12158288}),S=[];for(let U=0;U<Ys;U++)for(let z=0;z<on;z++)s.m[U*on+z]===Vt.BRIDGE&&S.push([z,U]);if(S.length){const U=new Xt(w,A,S.length);S.forEach(([z,k],j)=>{g.makeTranslation(z+.5,0,k+.5),U.setMatrixAt(j,g)}),U.castShadow=U.receiveShadow=t,U.computeBoundingSphere(),i.add(U),Ls(U,.015)}const M=[],P=(U,z=.02)=>(U.castShadow=U.receiveShadow=t,Ls(U,z),i.add(U),U);for(const U of s.statues??[]){const z=e.at(U.x+.5,U.y+.6);P(new Ie(new Bt(.28,.36,1,8).translate(0,.5,0),St({color:12104392}))).position.set(U.x+.5,z,U.y+.6);const k=new Ie(new zn(.18,0),St({color:10479359,emissive:6276863,emissiveIntensity:1.2}));k.position.set(U.x+.5,z+1.3,U.y+.6),i.add(k),M.push({x:U.x+.5,y:z+1.3,z:U.y+.6,c:10479359})}const F=(U,z)=>{if(!U)return;const k=e.at(U.x+.5,U.y+.8);P(new Ie(new Oi(.62,.13,8,20),St({color:10130344}))).position.set(U.x+.5,k+.75,U.y+.8);const j=new Ie(new is(.5,20),new bt({color:z,transparent:!0,opacity:.85,side:Nt}));j.position.set(U.x+.5,k+.75,U.y+.8),i.add(j),M.push({x:U.x+.5,y:k+.9,z:U.y+1.1,c:z})};F(s.tower,15777888),F(s.gate,5939455);const B=[];(s.chests??[]).forEach((U,z)=>{const k=e.at(U.x+.5,U.y+.6),j=P(new Ie(new Pt(.55,.36,.38).translate(0,.18,0),St({color:11561520})));j.position.set(U.x+.5,k,U.y+.6);const W=new Ie(new Pt(.57,.07,.4),St({color:15777888}));W.position.y=.26,j.add(W),j.visible=!n(z),B.push(j)});for(const U of s.decks??[]){const z=U.axis==="x",k=z?U.len:U.w,j=z?U.w:U.len,W=U.h*Ql;P(new Ie(new Pt(k,.12,j),St({color:11565637}))).position.set(U.x+k/2,W-.06,U.y+j/2);for(const ae of[0,1])P(new Ie(new Pt(z?k:.07,.24,z?.07:j),St({color:8147497})),.012).position.set(U.x+(z?k/2:ae?k-.04:.04),W+.12,U.y+(z?ae?j-.04:.04:j/2));for(const[ae,oe]of[[.15,.15],[k-.15,.15],[.15,j-.15],[k-.15,j-.15]]){const be=e.at(U.x+ae,U.y+oe);P(new Ie(new Bt(.07,.08,W-be,6),St({color:7227427})),.012).position.set(U.x+ae,(W+be)/2,U.y+oe)}}return{grp:i,chests:B,lamps:M,lods:T}}function gE(s){const e=[],t=[];for(const i of s){const r=i.index?i.toNonIndexed():i;e.push(...r.getAttribute("position").array),t.push(...r.getAttribute("normal").array)}const n=new qe;return n.setAttribute("position",new Ne(e,3)),n.setAttribute("normal",new Ne(t,3)),n}const em={low:{scale:.7,shadows:!1,shadowMap:0,soft:!1,bloom:!1,dof:!1,lights:2,grass:0,R:2,msaa:0},medium:{scale:.85,shadows:!0,shadowMap:1024,soft:!1,bloom:!0,dof:!1,lights:4,grass:2,R:2,msaa:0},high:{scale:1,shadows:!0,shadowMap:2048,soft:!0,bloom:!0,dof:!0,lights:8,grass:4,R:3,msaa:4}},_E=40,tl=[[0,659507,2306142,.35,10466559,42],[.22,1975382,6969998,.4,11055359,46],[.28,5930960,16761498,1.3,16763024,60],[.5,4034534,13823231,2.4,16773334,78],[.72,5926848,16754808,1.5,16756848,62],[.8,1975382,6969998,.45,11055359,46],[1,659507,2306142,.35,10466559,42]];function vE(s){let e=0;for(;e<tl.length-2&&s>tl[e+1][0];)e++;const t=tl[e],n=tl[e+1],i=(s-t[0])/(n[0]-t[0]||1),r=(a,l)=>new X(a).lerp(new X(l),i),o=s<.24||s>.79?1:s<.28?(.28-s)/.04:s>.75?(s-.75)/.04:0;return{top:r(t[1],n[1]),hor:r(t[2],n[2]),sun:t[3]+(n[3]-t[3])*i,sunCol:r(t[4],n[4]),amb:(t[5]+(n[5]-t[5])*i)/100,night:o}}function tm(){const s=Et;if(typeof s.tod=="number")return s.tod;const e=new URLSearchParams(location.search).get("tod");return e!==null&&!isNaN(+e)?+e:(.35+(Et.G?.time??0)/480)%1}const xE={uniforms:{tDiffuse:{value:null},amount:{value:1.2},res:{value:new ne(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float amount; uniform vec2 res; varying vec2 vUv;
    void main(){ float d = smoothstep(0.3, 0.55, abs(vUv.y-0.5)); vec4 c = vec4(0.0); float r = d*amount;
      for(int i=-2;i<=2;i++){ for(int j=-2;j<=2;j++){ c += texture2D(tDiffuse, vUv + vec2(float(i),float(j))*r/res); } }
      gl_FragColor = c/25.0; }`},nm={atk1:.5,atk2:.5,atk3:.62,skill:.75,burst:1.3};function TE(s){const e=document.getElementById("game"),t=document.createElement("canvas");t.id="game3d",t.setAttribute("aria-hidden","true"),Object.assign(t.style,{position:"fixed",inset:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"0"}),e.parentElement.insertBefore(t,e);const n=new eg({canvas:t,antialias:!0,powerPreference:"high-performance",stencil:!1});n.outputColorSpace=Ht,n.info.autoReset=!1,t.addEventListener("webglcontextlost",N=>{N.preventDefault(),s()});let i=em[S0.quality];const r=new Bh,o=new Zt(_E,1,.3,220),a=new td(13624575,6970010,.9),l=new Ec(16773334,2.4);l.shadow.bias=-6e-4,l.shadow.normalBias=.03,r.add(a,l,l.target),r.fog=new Jo(13626111,30,90);const c=jA();r.add(c.mesh);const u=[];for(let N=0;N<8;N++){const se=new Xs(16777215,0,6,2);u.push(se),r.add(se)}let h=null,d=null,f=null,p=null,_=null,g=null,m=null,v=null,y=[],x=[],E=[],T="",w=null,A=null,S=Math.PI;const M=new Ie(new is(.34,16),new bt({color:2760520,transparent:!0,opacity:.35,depthWrite:!1}));M.rotation.x=-Math.PI/2,r.add(M);const P=new Ge;r.add(P);const F=14,B=new Float32Array(F*2*3),U=new qe;U.setAttribute("position",new Je(B,3));const z=new Float32Array(F*2);U.setAttribute("a",new Je(z,1));const k=[];for(let N=0;N<F-1;N++)k.push(N*2,N*2+1,N*2+2,N*2+1,N*2+3,N*2+2);U.setIndex(k);const j=new Mt({transparent:!0,depthWrite:!1,side:Nt,blending:Sn,uniforms:{uC:{value:new X(16777215)}},vertexShader:"attribute float a; varying float vA; void main(){ vA=a; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform vec3 uC; varying float vA; void main(){ gl_FragColor=vec4(uC*vA, vA); }"}),W=new Ie(U,j);W.frustumCulled=!1,r.add(W);const ae=[],oe=[],be=new Map,Xe=new Map,We=aE(r);let $=null,pe=null;const Le=rE(r),me=700,Oe=new Xt(new zn(.06,0),new bt({color:16777215,fog:!1,transparent:!0,opacity:.7,depthWrite:!1}),me);Oe.frustumCulled=!1,$l(Oe.material),r.add(Oe);const Ke={coin:new Bt(.13,.13,.04,14).rotateX(Math.PI/2),book:new Pt(.3,.08,.22),shard:new zn(.15,0),orb:new tn(.1,10,8)},je=[],it=[],le=new Bt(.05,.06,.6,6).translate(0,.3,0),_e=new zn(.18,1),D=[],ze=[],fe=[],Ue=[],xe=new Map,$e=N=>{const se=Math.round(N*20)/20;let ie=xe.get(se);return ie||(ie=new ss(.5,1,28,1,-se,se*2),xe.set(se,ie)),ie};function Pe(){const N=new Mt({uniforms:{uC:{value:new X},uCore:{value:new X},uK:{value:1},uArc:{value:1}},vertexShader:"varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 uC; uniform vec3 uCore; uniform float uK; uniform float uArc; varying vec2 vP;
        void main(){ float r = length(vP); float a = atan(vP.y, vP.x);
          float edge = smoothstep(0.5, 1.0, r);
          // Đầu vệt (phía cuối cung) đậm, đuôi nhạt: theo chiều vung.
          float along = clamp((a + uArc) / (2.0 * uArc), 0.0, 1.0);
          float alpha = clamp(edge * 1.4, 0.0, 1.0) * (0.35 + 0.65 * along) * uK;
          vec3 col = mix(uC, uCore, smoothstep(0.82, 0.98, r));
          gl_FragColor = vec4(col * 1.3, alpha); }`,transparent:!0,depthWrite:!1,side:Nt}),se=new Ie($e(1),N);se.rotation.x=-Math.PI/2;const ie=new Ge;return ie.add(se),{g:ie,m:se,mat:N}}function I(){if(h?.dispose(),h=null,d=null,!i.bloom&&!i.dof)return;const N=new cn(4,4,{samples:i.msaa});h=new Ub(n,N),h.addPass(new Db(r,o)),i.bloom&&h.addPass(new Wr(new ne(256,256),.22,.35,.93)),i.dof&&(d=new Vg(xE),h.addPass(d)),h.addPass(new Fb)}function R(){if(n.shadowMap.enabled=i.shadows,n.shadowMap.type=i.soft?ch:ec,l.castShadow=i.shadows,i.shadows){l.shadow.mapSize.set(i.shadowMap,i.shadowMap),l.shadow.map?.dispose(),l.shadow.map=null;const N=l.shadow.camera;N.left=N.bottom=-15,N.right=N.top=15,N.near=1,N.far=70,N.updateProjectionMatrix()}M.visible=!i.shadows,ee(),re(),w?.dispose(),w=null,A?.obj.removeFromParent(),A?.dispose(),A=null,T="",I(),q()}function q(){const N=Math.min(window.devicePixelRatio||1,2)*i.scale;n.setPixelRatio(N),n.setSize(Et.VW,Et.VH,!1),o.aspect=Et.VW/Et.VH,o.updateProjectionMatrix(),h?.setPixelRatio(N),h?.setSize(Et.VW,Et.VH),d&&d.uniforms.res.value.set(Et.VW*N,Et.VH*N)}function ee(){for(const N of[f,m?.mesh,v?.mesh])N&&p0(N);f=null,p=null,m=null,v=null}function re(){$?.dispose(),$=null,pe=null,Le.clear()}function V(){const N=Et.G;if(pe===N&&$)return;re();const se={shadows:i.shadows,bloom:i.bloom,reflect:i.msaa>0,dense:i.grass?i.grass/2:.5};$=N.mode==="boss"?eE(N.bounds,se):JA(N.tower?.floor??1,N.bounds,se),r.add($.group),pe=N}function de(){const N=Et.G.map;if(p===N&&_===N.mini)return;ee(),g=uE(N,i.R),f=new Ge,f.add(dE(N,g,i.shadows,i.soft));const se=mE(N,g,i.shadows,ie=>to.P.chests.includes(ie));f.add(se.grp),se.grp.traverse(ie=>ie.isMesh&&[ie.material].flat().forEach($l)),y=se.chests,E=se.lamps,x=se.lods,r.add(f),m=fE(g),r.add(m.mesh),i.grass&&(v=pE(N,g,i.grass),r.add(v.mesh)),p=N,_=N.mini}const ce=(N,se,ie)=>Math.max(g?g.at(N/he,se/he):0,ie/he),Ee=new b,te=(N,se,ie=0)=>Ee.set(N/he,ie/he,se/he);function J(N,se){const ie=Et.G.time,Te=se.c.w??"sword",Ze=Us.hoatAnh[Te]??Us.hoatAnh.sword;if(!se.alive)return{k:"die",once:!0,fade:.2};const rt=N.act;if(rt&&nm[rt.k]){const lt=nm[rt.k]/(rt.k.startsWith("atk")?Ze.speed:1);if(ie-rt.t0<lt){const st=rt.k.startsWith("atk")?Ze.atk[+rt.k.slice(3)-1]:rt.k==="skill"?Ze.skill:Ze.burst,Jt=w.duration(st);return{k:`${st}#${rt.t0}`,once:!0,speed:Jt/lt,fade:.08}}}return N.hurt>0?{k:"hurt",once:!0,fade:.06}:N.dashT>0?{k:"dash",once:!0,speed:1.3,fade:.06}:N.air?(N._landT=ie,N.vz>0?{k:"jumpUp",once:!0,fade:.08}:{k:"jumpAir",fade:.2}):N._landT!==void 0&&ie-N._landT<.22?{k:"jumpLand",once:!0,speed:1.4,fade:.06}:N.moving?Et.holdDash&&N.dashHeld>.25&&N.stamina>0?{k:"sprint",fade:.2}:{k:"run",fade:.18,speed:N.atkAnim>0?.6:1}:{k:Ze.stand,fade:.25}}let Me=0;const De=new b;let Be=!1;const ve=new b,Se=new ne;function we(){const N=Et.G?.p;if(!N)return void(To.uFadeR.value=0);n.getDrawingBufferSize(Se);const se=or(N),ie=ce(N.x,N.y,se.g)+se.air/he;ve.set(N.x/he,ie+.8,N.y/he).project(o);const Te=(ve.x*.5+.5)*Se.x,Ze=(ve.y*.5+.5)*Se.y,rt=ve.z*.5+.5;ve.set(N.x/he,ie+1.7,N.y/he).project(o);const lt=(ve.y*.5+.5)*Se.y;To.uFadeS.value.set(Te,Ze),To.uFadeZ.value=rt,To.uFadeR.value=Math.max(40,Math.abs(lt-Ze)*2.2)}function ut(N){if(n.getContext().isContextLost())return!1;const se=Math.min(.05,N-Me||.016);Me=N,t.style.display="block",n.info.reset(),Et.G.map?(re(),de()):(ee(),g=null,V());const ie=Et.G,Te=ie.p,Ze=w0(),rt=or(Te),lt=ce(Te.x,Te.y,rt.g),st=new b(Te.x/he,lt+rt.air/he,Te.y/he),Jt=new b(st.x,lt+1,st.z);Be||De.copy(Jt),Be=!0,De.lerp(Jt,1-Math.exp(-se*10));const Gn=Et.camYaw??0,Fi=Math.min(1.2,Math.max(.2,Et.camPitch??.62));let dn=Math.min(24,Math.max(5,Et.camDist??13));const Bi=new b(-Math.sin(Gn)*Math.cos(Fi),Math.sin(Fi),Math.cos(Gn)*Math.cos(Fi));if(g)for(let L=1;L<=24;L++){const Q=dn*L/24,ue=De.clone().addScaledVector(Bi,Q);if(g.at(ue.x,ue.z)+.35>ue.y){dn=Math.max(2.5,Q-.6);break}}const sr=ie.shake?(Math.random()-.5)*ie.shake*.02:0;o.position.copy(De).addScaledVector(Bi,dn),o.position.x+=sr,o.lookAt(De),c.mesh.position.copy(o.position),c.mesh.visible=!$;const kt=vE(tm());c.mat.uniforms.uTop.value.copy(kt.top),c.mat.uniforms.uHor.value.copy(kt.hor),c.mat.uniforms.uNight.value=kt.night,c.mat.uniforms.uT.value=N,c.mat.uniforms.uCloud.value.setRGB(1,1,1).lerp(kt.sunCol,.35),c.mat.uniforms.uShade.value.copy(kt.hor).lerp(new X(9079496),.5);const Qt=r.fog;Qt.color.copy(kt.hor),Qt.near=14+dn*.8,Qt.far=40+dn*1.8,(o.far!==Qt.far+12||o.near!==.3)&&(o.near=.3,o.far=Qt.far+12,o.updateProjectionMatrix());const ki=(tm()-.25)*Math.PI;l.color.copy(kt.sunCol),l.intensity=kt.sun;const ti=kt.night>.5,rr=ti?8:-Math.cos(ki)*12,Kr=ti?14:6+Math.sin(Math.max(.15,Math.min(Math.PI-.15,ki)))*14;if(l.position.set(st.x+rr,st.y+Kr,st.z-7),l.target.position.copy(st),a.intensity=kt.amb*1.4,a.color.copy(kt.top).lerp(new X(16777215),.55),a.groundColor.set(6970010).multiplyScalar(.6+.4*(1-kt.night)),n.toneMappingExposure=1,$){const L=$.env;Qt.color.copy(L.fog),Qt.near=L.fogNear,Qt.far=L.fogFar,(o.far!==Qt.far+12||o.near!==2)&&(o.far=Qt.far+12,o.near=2,o.updateProjectionMatrix()),a.color.copy(L.hemiSky),a.groundColor.copy(L.hemiGround),a.intensity=L.hemiI,l.color.copy(L.sunCol),l.intensity=L.sunI,l.position.copy(st).add(L.sunOff)}y.forEach((L,Q)=>L.visible=!to.P.chests.includes(Q));const Jr=(dn+8)**2;for(const L of x){const Q=(L.x-De.x)**2+(L.z-De.z)**2<Jr;for(const ue of L.ol)ue.visible=Q}if(m?.tick(N,kt.hor),m&&(m.mesh.material.uniforms.uNight.value=kt.night),v&&(v.update(st.x,st.z,N),v.mat.uniforms.uLight.value.copy(kt.sunCol).multiplyScalar(.35+kt.sun*.28).lerp(new X(7372992),kt.night*.5)),Ze){const L=to.P.owned?.[Ze.c.id]?.vk,Q=L?to.P.weapons?.[L]?.id??null:null,ue=`${Ze.c.id}:${Ze.c.w}:${Q}`;ue!==T&&(T=ue,w?.dispose(),w=null,A?.obj.removeFromParent(),A?.dispose(),A=null,ae.length=oe.length=0,pd.load(Ze.c.id,Ze.c.w??"sword",Q,Ze.c.look).then(ge=>{if(ue!==T)return ge?.dispose();w=ge,ge?r.add(ge.obj):(A=new Qf(80,96,i.shadows),r.add(A.obj))}))}if(w&&Ze){const L=J(Te,Ze),Q=L.k.split("#")[0];L.k!==w.curName&&(w.curName.split("#")[0]!==Q||L.k.includes("#"))?(w.play(Q,{once:L.once,fade:L.fade,speed:L.speed,restart:L.k.includes("#")}),w.curName=L.k):L.speed&&!L.once&&w.play(Q,{speed:L.speed});const ue=Te.act&&ie.time-Te.act.t0<.6;let ge=S;ue?ge=Math.atan2(Math.cos(Te.ang),Math.sin(Te.ang)):(Te.moving||Te.dashT>0)&&(ge=Math.atan2(Te.dirX,Te.dirY));let ye=ge-S;ye=Math.atan2(Math.sin(ye),Math.cos(ye)),S+=ye*Math.min(1,se*(ue?30:14)),w.obj.rotation.y=S,w.obj.position.set(st.x,st.y+(w.obj.userData.yOff??0),st.z),w.obj.visible=!(Te.iframes>0&&Te.hurt>0&&Math.floor(N*20)%2),w.update(se);const It=Ze.c.w!=="bow"&&Ze.c.w!=="cat";if(w.weapon&&It&&ue){const at=new b(0,.95,0),en=new b(0,.35,0);w.weapon.localToWorld(at),w.weapon.localToWorld(en),ae.unshift(at),oe.unshift(en),ae.length>F&&(ae.pop(),oe.pop()),j.uniforms.uC.value.set(Lt[Ze.c.el]?.c2??"#ffffff")}else ae.length&&(ae.pop(),oe.pop());for(let at=0;at<F;at++){const en=ae[Math.min(at,ae.length-1)],Wn=oe[Math.min(at,oe.length-1)];if(en&&Wn){B.set([en.x,en.y,en.z,Wn.x,Wn.y,Wn.z],at*6);const fn=ae.length>1?(1-at/F)*.8:0;z[at*2]=fn,z[at*2+1]=fn*.2}else z[at*2]=z[at*2+1]=0}U.attributes.position.needsUpdate=!0,U.attributes.a.needsUpdate=!0}!w&&A&&Ze&&(A.paint(L=>R0(L,Ze.c,0,0,1.12,{fx:Te.fx,back:Te.back,walk:Te.walk,moving:Te.moving,atk:Te.atkAnim,t:N,noShadow:!0})),A.obj.position.copy(st),A.obj.rotation.y=Math.atan2(o.position.x-st.x,o.position.z-st.z)),M.position.set(st.x,lt+.02,st.z),M.scale.setScalar(rt.shadow);const vi=new Set;for(const L of ie.enemies){if(L.dead||Math.abs(L.x-Te.x)>1100||Math.abs(L.y-Te.y)>1100)continue;vi.add(L);let Q=be.get(L);Q||(Q=WA(L),be.set(L,Q),r.add(Q.obj),$&&!L.isBoss&&$.spawnFx(L.x,L.y,Lt[L.el]?.c??"#ffffff"));const ue=or(L);Q.obj.position.set(L.x/he,ce(L.x,L.y,ue.g)+ue.air/he,L.y/he),Yp(Q,L,N,Math.atan2(Te.x-L.x,Te.y-L.y))}for(const[L,Q]of be)L.isBoss&&L.dead&&!vi.has(L)&&(Q.deadT??0)<1&&(Q.deadT=Math.min(1,(Q.deadT??0)+se/1.6),vi.add(L),Yp(Q,L,N,0));for(const[L,Q]of be)if(!vi.has(L)){Q.obj.removeFromParent(),Q.obj.traverse(ue=>ue.geometry?.dispose());for(const ue of Q.mats)ue.dispose();be.delete(L)}let us=0;for(const L of ie.pickups){const Q=Ke[L.k];if(!Q)continue;let ue=je[us];ue||(ue=new Ie(Q,St()),ue.castShadow=!0,je.push(ue),P.add(ue)),us++,ue.geometry=Q,ue.visible=!0;const ge=ue.material,ye=L.k==="coin"?"#f0c060":L.k==="book"?"#9b6ff0":L.k==="shard"?Lt[L.el].c:Lt[L.el].c2;ge.color.set(ye),ge.emissive.set(L.k==="shard"||L.k==="orb"?ye:"#000000"),ue.position.set(L.x/he,ce(L.x,L.y,0)+.3+Math.sin(N*5+L.x)*.05,L.y/he),ue.rotation.y=N*2.5}for(let L=us;L<je.length;L++)je[L].visible=!1;let C=0;const H=[];for(const L of ie.turrets){let Q=it[C];if(!Q){Q=new Ge;const It=new Ie(le,St({color:4864554}));It.castShadow=!0;const at=new Ie(_e,St({color:16777215,emissive:16777215,emissiveIntensity:1.4}));at.position.y=.85,Q.add(It,at),it.push(Q),P.add(Q)}C++;const ue=Q.children[1],ge=ue.material,ye=Lt[L.el]?.c??"#ffffff";ge.color.set(Lt[L.el]?.c2??ye),ge.emissive.set(ye),Q.visible=!(L.life<2&&Math.floor(N*8)%2),Q.position.set(L.x/he,ce(L.x,L.y,0),L.y/he),ue.position.y=.85+Math.sin(N*4)*.05,ue.rotation.y=N*2,H.push({x:L.x/he,y:Q.position.y+.9,z:L.y/he,c:new X(ye),i:1})}for(let L=C;L<it.length;L++)it[L].visible=!1;const Z=new Set;for(const L of Hb){const Q=Gb(L.kind);if(!Q)continue;Z.add(L.obj);let ue=Xe.get(L.obj);if(!ue){if(Q.build3d)ue={o:Q.build3d({THREE:Rb,toWorld:(ge,ye,It=0)=>({x:ge/he,y:It*Ql,z:ye/he})},L.obj)};else{const ge=Q.size??{w:64,h:64},ye=new Qf(ge.w,ge.h,i.shadows,!1);ue={o:ye.obj,auto:ye}}r.add(ue.o),Xe.set(L.obj,ue)}ue.auto?ue.auto.paint(ge=>Q.draw2d(ge,L.obj,N)):Q.update3d?.(ue.o,L.obj,N),ue.o.position.copy(te(L.obj.x,L.obj.y,(L.obj.zh??0)*22)),ue.auto&&(ue.o.rotation.y=Math.atan2(o.position.x-ue.o.position.x,o.position.z-ue.o.position.z))}for(const[L,Q]of Xe)Z.has(L)||(Q.o.removeFromParent(),Q.auto?.dispose(),Xe.delete(L));We.sync(ie.map,Te,to.P.puz,he,(L,Q)=>ce(L,Q,0),N,(L,Q)=>Math.abs(L-Te.x)<1100&&Math.abs(Q-Te.y)<1100);const Y=[...H];let G=0,Ae=0,Fe=0,Ye=0,Ve=0;const ot=new ke,ct=new X;for(const L of ie.projs){const Q=ce(L.x,L.y,0)+.9+Math.max(0,or(L).air)/he;if(L.kind==="arrow"||L.kind==="earrow"){let ue=ze[Ae];if(!ue){ue=new Ge;const ye=new Ie(new Bt(.015,.015,.6,5).rotateZ(Math.PI/2),new bt({color:16777215})),It=new Ie(new Mn(.05,.16,6).rotateZ(-Math.PI/2).translate(.36,0,0),new bt({color:16777215}));ue.add(ye,It),ze.push(ue),P.add(ue)}Ae++,ue.visible=!0;const ge=L.kind==="earrow"?"#ffb0a0":L.el?Lt[L.el].c2:"#f3ead2";if(ue.children.forEach(ye=>ye.material.color.set(ge)),ue.position.set(L.x/he,Q,L.y/he),ue.rotation.set(0,-Math.atan2(L.vy,L.vx),0),L.el){Y.push({x:L.x/he,y:Q,z:L.y/he,c:new X(Lt[L.el].c),i:1.2});for(let ye=0;ye<3&&Ve<me;ye++)ot.makeScale(.6,.6,.6).setPosition((L.x-L.vx*.012*ye)/he,Q+Math.sin(N*30+ye)*.03,(L.y-L.vy*.012*ye)/he),Oe.setMatrixAt(Ve,ot),Oe.setColorAt(Ve++,ct.set(Lt[L.el].c2))}}else{let ue=fe[Fe];ue||(ue=new Ie(new Ni(.13,1),new bt({color:16777215})),fe.push(ue),P.add(ue)),Fe++,ue.visible=!0;const ge=Lt[L.el||"water"];ue.material.color.set(ge.c2),ue.position.set(L.x/he,Q,L.y/he),ue.scale.setScalar(Math.max(.6,L.r/8)),Y.push({x:L.x/he,y:Q,z:L.y/he,c:new X(ge.c),i:1.6})}}for(let L=Ae;L<ze.length;L++)ze[L].visible=!1;for(let L=Fe;L<fe.length;L++)fe[L].visible=!1;const He=(L,Q,ue,ge,ye)=>{Ve>=me||(ot.makeScale(ye,ye,ye).setPosition(L,Q,ue),Oe.setMatrixAt(Ve,ot),Oe.setColorAt(Ve,ct.set(ge)),Ve++)};for(const L of ie.fx){const Q=L.life/L.max,ue=ce(L.x,L.y,0);if(L.k==="dot")He(L.x/he,ue+.2+(L.z??0)/he+(1-Q)*.4,L.y/he,L.col,Math.min(1,Math.max(.35,L.size*Q*.3)));else if(L.k==="pt")He(L.x/he,ue+.5+(1-Q)*.5,L.y/he,L.col??"#fff",.5*Q+.25);else if(L.k==="ring"){let ge=D[Ye];ge||(ge=new Ie(new ss(.88,1,40),new bt({color:16777215,transparent:!0,depthWrite:!1,side:Nt})),ge.rotation.x=-Math.PI/2,D.push(ge),P.add(ge)),Ye++,ge.visible=!0;const ye=L.r*(1-Q*.7)/he;ge.scale.set(ye,ye,1),ge.position.set(L.x/he,ue+.06,L.y/he);const It=ge.material;It.color.set(L.col),It.opacity=Q,Q>.5&&Y.push({x:L.x/he,y:ue+.6,z:L.y/he,c:new X(L.col),i:2*Q})}else if(L.k==="slash"){let ge=Ue[G];ge||(ge=Pe(),Ue.push(ge),P.add(ge.g)),G++,ge.g.visible=!0;const ye=L.arc??1.1,It=Math.max(.6,(L.r??60)/he)*(1.05-Q*.2);ge.m.geometry=$e(ye),ge.mat.uniforms.uArc.value=ye,ge.mat.uniforms.uK.value=Math.min(1,Q*1.4),ge.mat.uniforms.uC.value.set(L.col??"#ffffff"),ge.mat.uniforms.uCore.value.set(L.core??"#ffffff"),ge.g.position.set(L.x/he,ue+.75+(L.trail==="heavy"?-.15:0),L.y/he),ge.g.rotation.set(0,-(L.ang??0),(L.flip??1)*.25),ge.m.scale.set(It,It*(L.flip??1),1),Y.push({x:L.x/he,y:ue+.8,z:L.y/he,c:new X(L.col??"#fff"),i:1.2*Q})}else if(L.k==="arrowRain"||L.k==="meteor"){for(let ge=0;ge<8;ge++)He(L.x/he+Math.sin(ge*2.1+L.x)*.6*(1-Q),ue+.5+ge*.1,L.y/he+Math.cos(ge*1.7)*.4,L.col??"#fff",.8);Y.push({x:L.x/he,y:ue+.8,z:L.y/he,c:new X(L.col??"#fff"),i:1.2*Q})}else if(L.k==="bolt"){for(let ge=0;ge<16;ge++)He(L.x/he+Math.sin(ge*7.3+(L.seed??0))*.2,ue+ge*.4,L.y/he,ge%3?L.col:"#ffffff",1.2);Y.push({x:L.x/he,y:ue+1.5,z:L.y/he,c:new X(L.col),i:4*Q})}}const gt=Te.act?.k==="burst"&&ie.time-Te.act.t0<1.3;if(Ze&&(gt||Te.act?.k==="skill"&&ie.time-Te.act.t0<.7)){const L=Lt[Ze.c.el];for(let Q=0;Q<(gt?32:14);Q++){const ue=Q*2.4+N*(gt?4:2),ge=.9+Q*37%10/6,ye=(Q*13+N*60)%30/14;He(st.x+Math.cos(ue)*ge,st.y+ye,st.z+Math.sin(ue)*ge,Q%4?L.c2:"#ffffff",.45+Q%3*.12)}Y.push({x:st.x,y:st.y+2.6,z:st.z,c:new X(L.c),i:gt?1.4:.8})}for(const L of ie.fields)Y.push({x:L.x/he,y:ce(L.x,L.y,0)+.4,z:L.y/he,c:new X(Lt[L.el].c),i:1.5});Oe.count=Ve,Oe.instanceMatrix.needsUpdate=!0,Oe.instanceColor&&(Oe.instanceColor.needsUpdate=!0);for(let L=Ye;L<D.length;L++)D[L].visible=!1;for(let L=G;L<Ue.length;L++)Ue[L].g.visible=!1;if($){$.tick({t:N,dt:se,G:ie,camera:o,addP:He});for(const Q of $.lamps)Y.push({x:Q.x,y:Q.y,z:Q.z,c:Q.c,i:Q.i});Le.sync(ie);const L=ie.boss;if(L&&!L.dead&&L.phase===2)for(let Q=0;Q<10;Q++){const ue=L.segs[(Q*3+Math.floor(N*30))%L.segs.length];He(ue.x/he+(Math.random()-.5)*.9,.6+Math.random()*1.4,ue.y/he+(Math.random()-.5)*.9,Q%3?Lt.bolt.c2:"#ffffff",.9)}L&&!L.dead&&Y.push({x:L.x/he,y:2.4,z:L.y/he,c:new X(Lt[L.el].c),i:1.6})}else Le.clear();if(ti&&!$){for(const L of E)Y.push({x:L.x,y:L.y,z:L.z,c:new X(L.c),i:1.4});Ze&&Y.push({x:st.x,y:st.y+1.8,z:st.z+.6,c:new X(Lt[Ze.c.el].c),i:.35})}return Y.sort((L,Q)=>(L.x-st.x)**2+(L.z-st.z)**2-((Q.x-st.x)**2+(Q.z-st.z)**2)),u.forEach((L,Q)=>{const ue=Q<i.lights?Y[Q]:void 0;L.intensity=ue?ue.i*1.2:0,ue&&(L.position.set(ue.x,Math.max(ue.y,(g?g.at(ue.x,ue.z):0)+1.1),ue.z),L.color.copy(ue.c))}),we(),h?h.render():n.render(r,o),!0}const O=new Fg,Ce=new ai(new b(0,1,0),0),K=new b;return R(),{frame:ut,project(N,se,ie=0){const Te=g?g.at(N/he,se/he):0,Ze=new b(N/he,Te+ie/he,se/he).project(o);return{x:(Ze.x*.5+.5)*Et.VW,y:(-Ze.y*.5+.5)*Et.VH,vis:Ze.z<1}},unproject(N,se){O.setFromCamera(new ne(N/Et.VW*2-1,-(se/Et.VH)*2+1),o);const ie=Et.G.p;let Te=null,Ze=1e9;for(const rt of Et.G.enemies){if(rt.dead)continue;const lt=or(rt),st=new b(rt.x/he,ce(rt.x,rt.y,lt.g)+lt.air/he+(rt.isBoss?1:.45),rt.y/he),Jt=(rt.r??14)/he+.25;if(O.ray.distanceSqToPoint(st)>Jt*Jt)continue;const Gn=st.distanceTo(O.ray.origin);Gn<Ze&&(Ze=Gn,Te=rt)}return Te?{x:Te.x,y:Te.y-(Te.isBoss?20:10)}:(Ce.constant=-ce(ie.x,ie.y,or(ie).g),O.ray.intersectPlane(Ce,K)?{x:K.x*he,y:K.z*he}:{x:ie.x,y:ie.y})},setQuality(N){i=em[N],R()},resize:q,dispose(){re(),Le.dispose(),h?.dispose(),n.dispose(),t.remove()},stats(){return{calls:n.info.render.calls,tris:n.info.render.triangles,textures:n.info.memory.textures}},hide(){t.style.display="none",(!Et.G||Et.G.map||Et.scene!=="play")&&re()},debug(){const N={};return r.traverseVisible(se=>{if(!se.isMesh||!se.geometry)return;const ie=se.geometry,Te=(ie.index?ie.index.count:ie.attributes.position.count)/3,Ze=se.isInstancedMesh?se.count:1,rt=se.parent===r?se.type:(se.parent?.parent===r?"grp":se.parent?.parent?.type)+":"+(se.material?.type??"");N[rt]=(N[rt]??0)+Te*Ze}),{by:N,hero:w,scene:r,arena:$?{kind:$.kind,...$.stats()}:null,tele:Le.count()}}}}export{em as QUALITY3D,TE as createRenderer3D,tm as timeOfDay};
