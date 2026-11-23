var Qg=Object.defineProperty;var e0=(s,e,t)=>e in s?Qg(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var Pn=(s,e,t)=>e0(s,typeof e!="symbol"?e+"":e,t);import{G as wt,S as Zr}from"./logic-5SgFy-hE.js";import{T as Re,o as t0,M as Ws,b as Xt,c as It,d as n0,l as nr,e as i0}from"./main-4lrbp7qI.js";import{X as Mo,a2 as s0,V as di,Y as Fs,Z as r0,a5 as o0,_ as a0,E as Un}from"./index-DFFyy23X.js";import{d as l0}from"./tokens-CKUYKcgV.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ki="170",c0={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},u0={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vp=0,Ru=1,zp=2,h0=3,d0=0,Xl=1,Ku=2,Jn=3,ri=0,jt=1,qt=2,ni=0,Bs=1,Po=2,Cu=3,Pu=4,Hp=5,ji=100,Gp=101,Wp=102,Xp=103,qp=104,Yp=200,jp=201,Zp=202,$p=203,el=204,tl=205,Kp=206,Jp=207,Qp=208,em=209,tm=210,nm=211,im=212,sm=213,rm=214,nl=0,il=1,sl=2,Xs=3,rl=4,ol=5,Io=6,al=7,Ho=0,om=1,am=2,wi=0,Ju=1,Qu=2,eh=3,th=4,lm=5,nh=6,ih=7,Iu="attached",cm="detached",ql=300,Ei=301,Ji=302,Lo=303,Uo=304,Vr=306,Qi=1e3,wn=1001,Lr=1002,Ot=1003,Yl=1004,f0=1004,Is=1005,p0=1005,Ct=1006,Cr=1007,m0=1007,Nn=1008,g0=1008,oi=1009,sh=1010,rh=1011,Ur=1012,jl=1013,Ri=1014,vn=1015,ii=1016,Zl=1017,$l=1018,qs=1020,oh=35902,ah=1021,lh=1022,Kt=1023,ch=1024,uh=1025,ks=1026,Ys=1027,Kl=1028,Go=1029,hh=1030,Jl=1031,_0=1032,Ql=1033,So=33776,bo=33777,wo=33778,To=33779,ll=35840,cl=35841,ul=35842,hl=35843,dl=36196,fl=37492,pl=37496,ml=37808,gl=37809,_l=37810,vl=37811,xl=37812,yl=37813,Ml=37814,Sl=37815,bl=37816,wl=37817,Tl=37818,Al=37819,El=37820,Rl=37821,Ao=36492,Cl=36494,Pl=36495,dh=36283,Il=36284,Ll=36285,Ul=36286,fh=2200,ph=2201,um=2202,Dr=2300,Nr=2301,Za=2302,Ls=2400,Us=2401,Do=2402,ec=2500,mh=2501,hm=0,gh=1,Dl=2,dm=3200,_h=3201,v0=3202,x0=3203,Ii=0,fm=1,Mi="",Nt="srgb",rn="srgb-linear",Wo="linear",_t="srgb",y0=0,Es=7680,M0=7681,S0=7682,b0=7683,w0=34055,T0=34056,A0=5386,E0=512,R0=513,C0=514,P0=515,I0=516,L0=517,U0=518,Lu=519,pm=512,mm=513,gm=514,vh=515,_m=516,vm=517,xm=518,ym=519,No=35044,Mm=35048,D0=35040,N0=35045,O0=35049,F0=35041,B0=35046,k0=35050,V0=35042,z0="100",Uu="300 es",Qn=2e3,Oo=2001;class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let sd=1234567;const Vs=Math.PI/180,Or=180/Math.PI;function Tn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[s&255]+en[s>>8&255]+en[s>>16&255]+en[s>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function Lt(s,e,t){return Math.max(e,Math.min(t,s))}function xh(s,e){return(s%e+e)%e}function H0(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function G0(s,e,t){return s!==e?(t-s)/(e-s):0}function Eo(s,e,t){return(1-t)*s+t*e}function W0(s,e,t,n){return Eo(s,e,1-Math.exp(-t*n))}function X0(s,e=1){return e-Math.abs(xh(s,e*2)-e)}function q0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Y0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function j0(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Z0(s,e){return s+Math.random()*(e-s)}function $0(s){return s*(.5-Math.random())}function K0(s){s!==void 0&&(sd=s);let e=sd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function J0(s){return s*Vs}function Q0(s){return s*Or}function e_(s){return(s&s-1)===0&&s!==0}function t_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function n_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function i_(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*u,l*h,l*d,a*c);break;case"YZY":s.set(l*d,a*u,l*h,a*c);break;case"ZXZ":s.set(l*h,l*d,a*u,a*c);break;case"XZX":s.set(a*u,l*m,l*f,a*c);break;case"YXY":s.set(l*f,a*u,l*m,a*c);break;case"ZYZ":s.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function un(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function et(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Et={DEG2RAD:Vs,RAD2DEG:Or,generateUUID:Tn,clamp:Lt,euclideanModulo:xh,mapLinear:H0,inverseLerp:G0,lerp:Eo,damp:W0,pingpong:X0,smoothstep:q0,smootherstep:Y0,randInt:j0,randFloat:Z0,randFloatSpread:$0,seededRandom:K0,degToRad:J0,radToDeg:Q0,isPowerOfTwo:e_,ceilPowerOfTwo:t_,floorPowerOfTwo:n_,setQuaternionFromProperEuler:i_,normalize:et,denormalize:un};class K{constructor(e=0,t=0){K.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,i,r,o,a,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],_=i[0],g=i[3],p=i[6],y=i[1],x=i[4],v=i[7],C=i[2],T=i[5],E=i[8];return r[0]=o*_+a*y+l*C,r[3]=o*g+a*x+l*T,r[6]=o*p+a*v+l*E,r[1]=c*_+u*y+h*C,r[4]=c*g+u*x+h*T,r[7]=c*p+u*v+h*E,r[2]=d*_+f*y+m*C,r[5]=d*g+f*x+m*T,r[8]=d*p+f*v+m*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,m=t*h+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(u*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Sc.makeScale(e,t)),this}rotate(e){return this.premultiply(Sc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Sc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Sc=new We;function Sm(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}const s_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Ar(s,e){return new s_[s](e)}function Fo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function bm(){const s=Fo("canvas");return s.style.display="block",s}const rd={};function go(s){s in rd||(rd[s]=!0,console.warn(s))}function r_(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function o_(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function a_(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const at={enabled:!0,workingColorSpace:rn,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===_t&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===_t&&(s.r=Pr(s.r),s.g=Pr(s.g),s.b=Pr(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Mi?Wo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Ti(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Pr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const od=[.64,.33,.3,.6,.15,.06],ad=[.2126,.7152,.0722],ld=[.3127,.329],cd=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ud=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);at.define({[rn]:{primaries:od,whitePoint:ld,transfer:Wo,toXYZ:cd,fromXYZ:ud,luminanceCoefficients:ad,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:od,whitePoint:ld,transfer:_t,toXYZ:cd,fromXYZ:ud,luminanceCoefficients:ad,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}});let ir;class wm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ir===void 0&&(ir=Fo("canvas")),ir.width=e.width,ir.height=e.height;const n=ir.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ir}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ti(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let l_=0;class Ds{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=Tn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(bc(i[o].image)):r.push(bc(i[o]))}else r=bc(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function bc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wm.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let c_=0;class At extends ci{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,n=wn,i=wn,r=Ct,o=Nn,a=Kt,l=oi,c=At.DEFAULT_ANISOTROPY,u=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:c_++}),this.uuid=Tn(),this.name="",this.source=new Ds(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ql)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qi:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case Lr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qi:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case Lr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=ql;At.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,n=0,i=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(f+1)/2,C=(p+1)/2,T=(u+d)/4,E=(h+_)/4,R=(m+g)/4;return x>v&&x>C?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=T/n,r=E/n):v>C?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=T/i,r=R/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=E/r,i=R/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(h-_)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tm extends ci{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new At(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ds(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends Tm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class tc extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class u_ extends sn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new tc(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class yh extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class h_ extends sn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new yh(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class $e{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=_;return}if(h!==_||l!==d||c!==f||u!==m){let g=1-a;const p=l*d+c*f+u*m+h*_,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),T=Math.atan2(C,p*y);g=Math.sin(g*T)/C,a=Math.sin(a*T)/C}const v=a*y;if(l=l*g+d*v,c=c*g+f*v,u=u*g+m*v,h=h*g+_*v,g===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-a*f,e[t+2]=c*m+u*f+a*d-l*h,e[t+3]=u*m-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,n=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wc.copy(this).projectOnVector(e),this.sub(wc)}reflect(e){return this.sub(wc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wc=new w,hd=new $e;class Jt{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jo.copy(n.boundingBox)),Jo.applyMatrix4(e.matrixWorld),this.union(Jo)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($r),Qo.subVectors(this.max,$r),sr.subVectors(e.a,$r),rr.subVectors(e.b,$r),or.subVectors(e.c,$r),ki.subVectors(rr,sr),Vi.subVectors(or,rr),cs.subVectors(sr,or);let t=[0,-ki.z,ki.y,0,-Vi.z,Vi.y,0,-cs.z,cs.y,ki.z,0,-ki.x,Vi.z,0,-Vi.x,cs.z,0,-cs.x,-ki.y,ki.x,0,-Vi.y,Vi.x,0,-cs.y,cs.x,0];return!Tc(t,sr,rr,or,Qo)||(t=[1,0,0,0,1,0,0,0,1],!Tc(t,sr,rr,or,Qo))?!1:(ea.crossVectors(ki,Vi),t=[ea.x,ea.y,ea.z],Tc(t,sr,rr,or,Qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fi=[new w,new w,new w,new w,new w,new w,new w,new w],Vn=new w,Jo=new Jt,sr=new w,rr=new w,or=new w,ki=new w,Vi=new w,cs=new w,$r=new w,Qo=new w,ea=new w,us=new w;function Tc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){us.fromArray(s,r);const a=i.x*Math.abs(us.x)+i.y*Math.abs(us.y)+i.z*Math.abs(us.z),l=e.dot(us),c=t.dot(us),u=n.dot(us);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const d_=new Jt,Kr=new w,Ac=new w;class Qt{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):d_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Kr.subVectors(e,this.center);const t=Kr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Kr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ac.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Kr.copy(e.center).add(Ac)),this.expandByPoint(Kr.copy(e.center).sub(Ac))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pi=new w,Ec=new w,ta=new w,zi=new w,Rc=new w,na=new w,Cc=new w;class zr{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ec.copy(e).add(t).multiplyScalar(.5),ta.copy(t).sub(e).normalize(),zi.copy(this.origin).sub(Ec);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ta),a=zi.dot(this.direction),l=-zi.dot(ta),c=zi.lengthSq(),u=Math.abs(1-o*o);let h,d,f,m;if(u>0)if(h=o*l-a,d=o*a-l,m=r*u,h>=0)if(d>=-m)if(d<=m){const _=1/u;h*=_,d*=_,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Ec).addScaledVector(ta,d),f}intersectSphere(e,t){pi.subVectors(e.center,this.origin);const n=pi.dot(this.direction),i=pi.dot(pi)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,i,r){Rc.subVectors(t,e),na.subVectors(n,e),Cc.crossVectors(Rc,na);let o=this.direction.dot(Cc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zi.subVectors(this.origin,e);const l=a*this.direction.dot(na.crossVectors(zi,na));if(l<0)return null;const c=a*this.direction.dot(Rc.cross(zi));if(c<0||l+c>o)return null;const u=-a*zi.dot(Cc);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(e,t,n,i,r,o,a,l,c,u,h,d,f,m,_,g){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,u,h,d,f,m,_,g)}set(e,t,n,i,r,o,a,l,c,u,h,d,f,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ar.setFromMatrixColumn(e,0).length(),r=1/ar.setFromMatrixColumn(e,1).length(),o=1/ar.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,f=o*h,m=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,m=c*u,_=c*h;t[0]=d+_*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-m,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,m=c*u,_=c*h;t[0]=d-_*a,t[4]=-o*h,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,m=a*u,_=a*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=_-d*h,t[8]=m*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-_*h}else if(e.order==="XZY"){const d=o*l,f=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=o*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=a*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(f_,e,p_)}lookAt(e,t,n){const i=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Hi.crossVectors(n,Sn),Hi.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Hi.crossVectors(n,Sn)),Hi.normalize(),ia.crossVectors(Sn,Hi),i[0]=Hi.x,i[4]=ia.x,i[8]=Sn.x,i[1]=Hi.y,i[5]=ia.y,i[9]=Sn.y,i[2]=Hi.z,i[6]=ia.z,i[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],x=n[7],v=n[11],C=n[15],T=i[0],E=i[4],R=i[8],b=i[12],M=i[1],I=i[5],V=i[9],H=i[13],D=i[2],z=i[6],B=i[10],$=i[14],G=i[3],re=i[7],te=i[11],me=i[15];return r[0]=o*T+a*M+l*D+c*G,r[4]=o*E+a*I+l*z+c*re,r[8]=o*R+a*V+l*B+c*te,r[12]=o*b+a*H+l*$+c*me,r[1]=u*T+h*M+d*D+f*G,r[5]=u*E+h*I+d*z+f*re,r[9]=u*R+h*V+d*B+f*te,r[13]=u*b+h*H+d*$+f*me,r[2]=m*T+_*M+g*D+p*G,r[6]=m*E+_*I+g*z+p*re,r[10]=m*R+_*V+g*B+p*te,r[14]=m*b+_*H+g*$+p*me,r[3]=y*T+x*M+v*D+C*G,r[7]=y*E+x*I+v*z+C*re,r[11]=y*R+x*V+v*B+C*te,r[15]=y*b+x*H+v*$+C*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+r*l*h-i*c*h-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*u-r*l*u)+g*(+t*c*h-t*a*f-r*o*h+n*o*f+r*a*u-n*c*u)+p*(-i*a*u-t*l*h+t*a*d+i*o*h-n*o*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=h*g*c-_*d*c+_*l*f-a*g*f-h*l*p+a*d*p,x=m*d*c-u*g*c-m*l*f+o*g*f+u*l*p-o*d*p,v=u*_*c-m*h*c+m*a*f-o*_*f-u*a*p+o*h*p,C=m*h*l-u*_*l-m*a*d+o*_*d+u*a*g-o*h*g,T=t*y+n*x+i*v+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return e[0]=y*E,e[1]=(_*d*r-h*g*r-_*i*f+n*g*f+h*i*p-n*d*p)*E,e[2]=(a*g*r-_*l*r+_*i*c-n*g*c-a*i*p+n*l*p)*E,e[3]=(h*l*r-a*d*r-h*i*c+n*d*c+a*i*f-n*l*f)*E,e[4]=x*E,e[5]=(u*g*r-m*d*r+m*i*f-t*g*f-u*i*p+t*d*p)*E,e[6]=(m*l*r-o*g*r-m*i*c+t*g*c+o*i*p-t*l*p)*E,e[7]=(o*d*r-u*l*r+u*i*c-t*d*c-o*i*f+t*l*f)*E,e[8]=v*E,e[9]=(m*h*r-u*_*r-m*n*f+t*_*f+u*n*p-t*h*p)*E,e[10]=(o*_*r-m*a*r+m*n*c-t*_*c-o*n*p+t*a*p)*E,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*f-t*a*f)*E,e[12]=C*E,e[13]=(u*_*i-m*h*i+m*n*d-t*_*d-u*n*g+t*h*g)*E,e[14]=(m*a*i-o*_*i-m*n*l+t*_*l+o*n*g-t*a*g)*E,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*d+t*a*d)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,m=r*h,_=o*u,g=o*h,p=a*h,y=l*c,x=l*u,v=l*h,C=n.x,T=n.y,E=n.z;return i[0]=(1-(_+p))*C,i[1]=(f+v)*C,i[2]=(m-x)*C,i[3]=0,i[4]=(f-v)*T,i[5]=(1-(d+p))*T,i[6]=(g+y)*T,i[7]=0,i[8]=(m+x)*E,i[9]=(g-y)*E,i[10]=(1-(d+_))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=ar.set(i[0],i[1],i[2]).length();const o=ar.set(i[4],i[5],i[6]).length(),a=ar.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],zn.copy(this);const c=1/r,u=1/o,h=1/a;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=h,zn.elements[9]*=h,zn.elements[10]*=h,t.setFromRotationMatrix(zn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Qn){const l=this.elements,c=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i);let f,m;if(a===Qn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Oo)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Qn){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-r),d=(t+e)*c,f=(n+i)*u;let m,_;if(a===Qn)m=(o+r)*h,_=-2*h;else if(a===Oo)m=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ar=new w,zn=new Le,f_=new w(0,0,0),p_=new w(1,1,1),Hi=new w,ia=new w,Sn=new w,dd=new Le,fd=new $e;class on{constructor(e=0,t=0,n=0,i=on.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return dd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fd.setFromEuler(this),this.setFromQuaternion(fd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class nc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let m_=0;const pd=new w,lr=new $e,mi=new Le,sa=new w,Jr=new w,g_=new w,__=new $e,md=new w(1,0,0),gd=new w(0,1,0),_d=new w(0,0,1),vd={type:"added"},v_={type:"removed"},cr={type:"childadded",child:null},Pc={type:"childremoved",child:null};class rt extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:m_++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rt.DEFAULT_UP.clone();const e=new w,t=new on,n=new $e,i=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Le},normalMatrix:{value:new We}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.multiply(lr),this}rotateOnWorldAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.premultiply(lr),this}rotateX(e){return this.rotateOnAxis(md,e)}rotateY(e){return this.rotateOnAxis(gd,e)}rotateZ(e){return this.rotateOnAxis(_d,e)}translateOnAxis(e,t){return pd.copy(e).applyQuaternion(this.quaternion),this.position.add(pd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(md,e)}translateY(e){return this.translateOnAxis(gd,e)}translateZ(e){return this.translateOnAxis(_d,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sa.copy(e):sa.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(Jr,sa,this.up):mi.lookAt(sa,Jr,this.up),this.quaternion.setFromRotationMatrix(mi),i&&(mi.extractRotation(i.matrixWorld),lr.setFromRotationMatrix(mi),this.quaternion.premultiply(lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vd),cr.child=e,this.dispatchEvent(cr),cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(v_),Pc.child=e,this.dispatchEvent(Pc),Pc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vd),cr.child=e,this.dispatchEvent(cr),cr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,e,g_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,__,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}rt.DEFAULT_UP=new w(0,1,0);rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Hn=new w,gi=new w,Ic=new w,_i=new w,ur=new w,hr=new w,xd=new w,Lc=new w,Uc=new w,Dc=new w,Nc=new dt,Oc=new dt,Fc=new dt;class _n{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Hn.subVectors(e,t),i.cross(Hn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Hn.subVectors(i,t),gi.subVectors(n,t),Ic.subVectors(e,t);const o=Hn.dot(Hn),a=Hn.dot(gi),l=Hn.dot(Ic),c=gi.dot(gi),u=gi.dot(Ic),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,m=(o*u-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,_i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_i.x),l.addScaledVector(o,_i.y),l.addScaledVector(a,_i.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Nc.setScalar(0),Oc.setScalar(0),Fc.setScalar(0),Nc.fromBufferAttribute(e,t),Oc.fromBufferAttribute(e,n),Fc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Nc,r.x),o.addScaledVector(Oc,r.y),o.addScaledVector(Fc,r.z),o}static isFrontFacing(e,t,n,i){return Hn.subVectors(n,t),gi.subVectors(e,t),Hn.cross(gi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Hn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return _n.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;ur.subVectors(i,n),hr.subVectors(r,n),Lc.subVectors(e,n);const l=ur.dot(Lc),c=hr.dot(Lc);if(l<=0&&c<=0)return t.copy(n);Uc.subVectors(e,i);const u=ur.dot(Uc),h=hr.dot(Uc);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(ur,o);Dc.subVectors(e,r);const f=ur.dot(Dc),m=hr.dot(Dc);if(m>=0&&f<=m)return t.copy(r);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(hr,a);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return xd.subVectors(r,i),a=(h-u)/(h-u+(f-m)),t.copy(i).addScaledVector(xd,a);const p=1/(g+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(ur,o).addScaledVector(hr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},ra={h:0,s:0,l:0};function Bc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Z{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=xh(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Bc(o,r,e+1/3),this.g=Bc(o,r,e),this.b=Bc(o,r,e-1/3)}return at.toWorkingColorSpace(this,i),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){const n=Am[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=Pr(e.r),this.g=Pr(e.g),this.b=Pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return at.fromWorkingColorSpace(tn.copy(this),e),Math.round(Lt(tn.r*255,0,255))*65536+Math.round(Lt(tn.g*255,0,255))*256+Math.round(Lt(tn.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(tn.copy(this),t);const n=tn.r,i=tn.g,r=tn.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=Nt){at.fromWorkingColorSpace(tn.copy(this),e);const t=tn.r,n=tn.g,i=tn.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(ra);const n=Eo(Gi.h,ra.h,t),i=Eo(Gi.s,ra.s,t),r=Eo(Gi.l,ra.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new Z;Z.NAMES=Am;let x_=0;class Bt extends ci{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:x_++}),this.uuid=Tn(),this.name="",this.blending=Bs,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=tl,this.blendEquation=ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Z(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Es,this.stencilZFail=Es,this.stencilZPass=Es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==el&&(n.blendSrc=this.blendSrc),this.blendDst!==tl&&(n.blendDst=this.blendDst),this.blendEquation!==ji&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mt extends Bt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Si=y_();function y_(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function gn(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Lt(s,-65504,65504),Si.floatView[0]=s;const e=Si.uint32View[0],t=e>>23&511;return Si.baseTable[t]+((e&8388607)>>Si.shiftTable[t])}function _o(s){const e=s>>10;return Si.uint32View[0]=Si.mantissaTable[Si.offsetTable[e]+(s&1023)]+Si.exponentTable[e],Si.floatView[0]}const M_={toHalfFloat:gn,fromHalfFloat:_o},Ft=new w,oa=new K;class Ze{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=No,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oa.fromBufferAttribute(this,t),oa.applyMatrix3(e),this.setXY(t,oa.x,oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=un(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=un(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=un(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==No&&(e.usage=this.usage),e}}class S_ extends Ze{constructor(e,t,n){super(new Int8Array(e),t,n)}}class b_ extends Ze{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class w_ extends Ze{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class T_ extends Ze{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Mh extends Ze{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class A_ extends Ze{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Sh extends Ze{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class E_ extends Ze{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=_o(this.array[e*this.itemSize]);return this.normalized&&(t=un(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=gn(t),this}getY(e){let t=_o(this.array[e*this.itemSize+1]);return this.normalized&&(t=un(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=gn(t),this}getZ(e){let t=_o(this.array[e*this.itemSize+2]);return this.normalized&&(t=un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=gn(t),this}getW(e){let t=_o(this.array[e*this.itemSize+3]);return this.normalized&&(t=un(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=gn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=gn(t),this.array[e+1]=gn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=gn(t),this.array[e+1]=gn(n),this.array[e+2]=gn(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=gn(t),this.array[e+1]=gn(n),this.array[e+2]=gn(i),this.array[e+3]=gn(r),this}}class Pe extends Ze{constructor(e,t,n){super(new Float32Array(e),t,n)}}let R_=0;const In=new Le,kc=new rt,dr=new w,bn=new Jt,Qr=new Jt,Gt=new w;class Ve extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:R_++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sm(e)?Sh:Mh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return kc.lookAt(e),kc.updateMatrix(),this.applyMatrix4(kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Pe(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Qr.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(bn.min,Qr.min),bn.expandByPoint(Gt),Gt.addVectors(bn.max,Qr.max),bn.expandByPoint(Gt)):(bn.expandByPoint(Qr.min),bn.expandByPoint(Qr.max))}bn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Gt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Gt.fromBufferAttribute(a,c),l&&(dr.fromBufferAttribute(e,c),Gt.add(dr)),i=Math.max(i,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new w,l[R]=new w;const c=new w,u=new w,h=new w,d=new K,f=new K,m=new K,_=new w,g=new w;function p(R,b,M){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,M),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,M),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),a[R].add(_),a[b].add(_),a[M].add(_),l[R].add(g),l[b].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let R=0,b=y.length;R<b;++R){const M=y[R],I=M.start,V=M.count;for(let H=I,D=I+V;H<D;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const x=new w,v=new w,C=new w,T=new w;function E(R){C.fromBufferAttribute(i,R),T.copy(C);const b=a[R];x.copy(b),x.sub(C.multiplyScalar(C.dot(b))).normalize(),v.crossVectors(T,b);const I=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,I)}for(let R=0,b=y.length;R<b;++R){const M=y[R],I=M.start,V=M.count;for(let H=I,D=I+V;H<D;H+=3)E(e.getX(H+0)),E(e.getX(H+1)),E(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ze(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new w,r=new w,o=new w,a=new w,l=new w,c=new w,u=new w,h=new w;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Ze(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ve,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yd=new Le,hs=new zr,aa=new Qt,Md=new w,la=new w,ca=new w,ua=new w,Vc=new w,ha=new w,Sd=new w,da=new w;class je extends rt{constructor(e=new Ve,t=new Mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){ha.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Vc.fromBufferAttribute(h,e),o?ha.addScaledVector(Vc,u):ha.addScaledVector(Vc.sub(t),u))}t.add(ha)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(r),hs.copy(e.ray).recast(e.near),!(aa.containsPoint(hs.origin)===!1&&(hs.intersectSphere(aa,Md)===null||hs.origin.distanceToSquared(Md)>(e.far-e.near)**2))&&(yd.copy(r).invert(),hs.copy(e.ray).applyMatrix4(yd),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,C=x;v<C;v+=3){const T=a.getX(v),E=a.getX(v+1),R=a.getX(v+2);i=fa(this,p,e,n,c,u,h,T,E,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=a.getX(g),x=a.getX(g+1),v=a.getX(g+2);i=fa(this,o,e,n,c,u,h,y,x,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,C=x;v<C;v+=3){const T=v,E=v+1,R=v+2;i=fa(this,p,e,n,c,u,h,T,E,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,x=g+1,v=g+2;i=fa(this,o,e,n,c,u,h,y,x,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function C_(s,e,t,n,i,r,o,a){let l;if(e.side===jt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===ri,a),l===null)return null;da.copy(a),da.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(da);return c<t.near||c>t.far?null:{distance:c,point:da.clone(),object:s}}function fa(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,la),s.getVertexPosition(l,ca),s.getVertexPosition(c,ua);const u=C_(s,e,t,n,la,ca,ua,Sd);if(u){const h=new w;_n.getBarycoord(Sd,la,ca,ua,h),i&&(u.uv=_n.getInterpolatedAttribute(i,a,l,c,h,new K)),r&&(u.uv1=_n.getInterpolatedAttribute(r,a,l,c,h,new K)),o&&(u.normal=_n.getInterpolatedAttribute(o,a,l,c,h,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new w,materialIndex:0};_n.getNormal(la,ca,ua,d.normal),u.face=d,u.barycoord=h}return u}class Yt extends Ve{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Pe(c,3)),this.setAttribute("normal",new Pe(u,3)),this.setAttribute("uv",new Pe(h,2));function m(_,g,p,y,x,v,C,T,E,R,b){const M=v/E,I=C/R,V=v/2,H=C/2,D=T/2,z=E+1,B=R+1;let $=0,G=0;const re=new w;for(let te=0;te<B;te++){const me=te*I-H;for(let Be=0;Be<z;Be++){const tt=Be*M-V;re[_]=tt*y,re[g]=me*x,re[p]=D,c.push(re.x,re.y,re.z),re[_]=0,re[g]=0,re[p]=T>0?1:-1,u.push(re.x,re.y,re.z),h.push(Be/E),h.push(1-te/R),$+=1}}for(let te=0;te<R;te++)for(let me=0;me<E;me++){const Be=d+me+z*te,tt=d+me+z*(te+1),Q=d+(me+1)+z*(te+1),le=d+(me+1)+z*te;l.push(Be,tt,le),l.push(tt,Q,le),G+=6}a.addGroup(f,G,b),f+=G,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function cn(s){const e={};for(let t=0;t<s.length;t++){const n=Fr(s[t]);for(const i in n)e[i]=n[i]}return e}function P_(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Em(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Ci={clone:Fr,merge:cn};var I_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,L_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ut extends Bt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=I_,this.fragmentShader=L_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fr(e.uniforms),this.uniformsGroups=P_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ic extends rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=Qn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new w,bd=new K,wd=new K;class Vt extends ic{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Or*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z)}getViewSize(e,t){return this.getViewBounds(e,bd,wd),t.subVectors(wd,bd)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fr=-90,pr=1;class Rm extends rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Vt(fr,pr,e,t);i.layers=this.layers,this.add(i);const r=new Vt(fr,pr,e,t);r.layers=this.layers,this.add(r);const o=new Vt(fr,pr,e,t);o.layers=this.layers,this.add(o);const a=new Vt(fr,pr,e,t);a.layers=this.layers,this.add(a);const l=new Vt(fr,pr,e,t);l.layers=this.layers,this.add(l);const c=new Vt(fr,pr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Oo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Xo extends At{constructor(e,t,n,i,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ei,super(e,t,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cm extends sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Xo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ct}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Yt(5,5,5),r=new Ut({name:"CubemapFromEquirect",uniforms:Fr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:ni});r.uniforms.tEquirect.value=t;const o=new je(i,r),a=t.minFilter;return t.minFilter===Nn&&(t.minFilter=Ct),new Rm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const zc=new w,U_=new w,D_=new We;class yi{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=zc.subVectors(n,t).cross(U_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(zc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||D_.getNormalMatrix(e),i=this.coplanarPoint(zc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new Qt,pa=new w;class qo{constructor(e=new yi,t=new yi,n=new yi,i=new yi,r=new yi,o=new yi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],m=i[9],_=i[10],g=i[11],p=i[12],y=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-r,d-c,g-f,v-p).normalize(),n[1].setComponents(l+r,d+c,g+f,v+p).normalize(),n[2].setComponents(l+o,d+u,g+m,v+y).normalize(),n[3].setComponents(l-o,d-u,g-m,v-y).normalize(),n[4].setComponents(l-a,d-h,g-_,v-x).normalize(),t===Qn)n[5].setComponents(l+a,d+h,g+_,v+x).normalize();else if(t===Oo)n[5].setComponents(a,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){return ds.center.set(0,0,0),ds.radius=.7071067811865476,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(pa.x=i.normal.x>0?e.max.x:e.min.x,pa.y=i.normal.y>0?e.max.y:e.min.y,pa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(pa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Pm(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function N_(s){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(s.bindBuffer(c,a),h.length===0)s.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],_=h[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const _=h[f];s.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class is extends Ve{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,d=t/l,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const y=p*d-o;for(let x=0;x<c;x++){const v=x*h-r;m.push(v,-y,0),_.push(0,0,1),g.push(x/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const x=y+c*p,v=y+c*(p+1),C=y+1+c*(p+1),T=y+1+c*p;f.push(x,v,T),f.push(v,C,T)}this.setIndex(f),this.setAttribute("position",new Pe(m,3)),this.setAttribute("normal",new Pe(_,3)),this.setAttribute("uv",new Pe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.width,e.height,e.widthSegments,e.heightSegments)}}var O_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,F_=`#ifdef USE_ALPHAHASH
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
#endif`,B_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,k_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,V_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,z_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,H_=`#ifdef USE_AOMAP
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
#endif`,G_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,W_=`#ifdef USE_BATCHING
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
#endif`,X_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,q_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Y_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,j_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Z_=`#ifdef USE_IRIDESCENCE
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
#endif`,$_=`#ifdef USE_BUMPMAP
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
#endif`,K_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,J_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Q_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ev=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,iv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sv=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rv=`#define PI 3.141592653589793
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
} // validated`,ov=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,av=`vec3 transformedNormal = objectNormal;
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
#endif`,lv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dv="gl_FragColor = linearToOutputTexel( gl_FragColor );",fv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pv=`#ifdef USE_ENVMAP
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
#endif`,mv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gv=`#ifdef USE_ENVMAP
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
#endif`,_v=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vv=`#ifdef USE_ENVMAP
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
#endif`,xv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bv=`#ifdef USE_GRADIENTMAP
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
}`,wv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Av=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ev=`uniform bool receiveShadow;
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
#endif`,Rv=`#ifdef USE_ENVMAP
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
#endif`,Cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Iv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Uv=`PhysicalMaterial material;
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
#endif`,Dv=`struct PhysicalMaterial {
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
}`,Nv=`
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
#endif`,Ov=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xv=`#if defined( USE_POINTS_UV )
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
#endif`,qv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$v=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kv=`#ifdef USE_MORPHTARGETS
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
#endif`,Jv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ex=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ix=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sx=`#ifdef USE_NORMALMAP
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
#endif`,rx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ox=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ax=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ux=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yx=`float getShadowMask() {
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
}`,Mx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sx=`#ifdef USE_SKINNING
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
#endif`,bx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wx=`#ifdef USE_SKINNING
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
#endif`,Tx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ex=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cx=`#ifdef USE_TRANSMISSION
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
#endif`,Px=`#ifdef USE_TRANSMISSION
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ox=`uniform sampler2D t2D;
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
}`,Fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zx=`#include <common>
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
}`,Hx=`#if DEPTH_PACKING == 3200
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
}`,Gx=`#define DISTANCE
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
}`,Wx=`#define DISTANCE
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
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`uniform float scale;
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
}`,jx=`uniform vec3 diffuse;
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
}`,Zx=`#include <common>
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
}`,$x=`uniform vec3 diffuse;
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
}`,Kx=`#define LAMBERT
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
}`,Jx=`#define LAMBERT
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
}`,Qx=`#define MATCAP
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
}`,ey=`#define MATCAP
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
}`,ty=`#define NORMAL
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
}`,ny=`#define NORMAL
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
}`,iy=`#define PHONG
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
}`,sy=`#define PHONG
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
}`,ry=`#define STANDARD
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
}`,oy=`#define STANDARD
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
}`,ay=`#define TOON
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
}`,ly=`#define TOON
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
}`,cy=`uniform float size;
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
}`,uy=`uniform vec3 diffuse;
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
}`,hy=`#include <common>
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
}`,dy=`uniform vec3 color;
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
}`,fy=`uniform float rotation;
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
}`,py=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:O_,alphahash_pars_fragment:F_,alphamap_fragment:B_,alphamap_pars_fragment:k_,alphatest_fragment:V_,alphatest_pars_fragment:z_,aomap_fragment:H_,aomap_pars_fragment:G_,batching_pars_vertex:W_,batching_vertex:X_,begin_vertex:q_,beginnormal_vertex:Y_,bsdfs:j_,iridescence_fragment:Z_,bumpmap_pars_fragment:$_,clipping_planes_fragment:K_,clipping_planes_pars_fragment:J_,clipping_planes_pars_vertex:Q_,clipping_planes_vertex:ev,color_fragment:tv,color_pars_fragment:nv,color_pars_vertex:iv,color_vertex:sv,common:rv,cube_uv_reflection_fragment:ov,defaultnormal_vertex:av,displacementmap_pars_vertex:lv,displacementmap_vertex:cv,emissivemap_fragment:uv,emissivemap_pars_fragment:hv,colorspace_fragment:dv,colorspace_pars_fragment:fv,envmap_fragment:pv,envmap_common_pars_fragment:mv,envmap_pars_fragment:gv,envmap_pars_vertex:_v,envmap_physical_pars_fragment:Rv,envmap_vertex:vv,fog_vertex:xv,fog_pars_vertex:yv,fog_fragment:Mv,fog_pars_fragment:Sv,gradientmap_pars_fragment:bv,lightmap_pars_fragment:wv,lights_lambert_fragment:Tv,lights_lambert_pars_fragment:Av,lights_pars_begin:Ev,lights_toon_fragment:Cv,lights_toon_pars_fragment:Pv,lights_phong_fragment:Iv,lights_phong_pars_fragment:Lv,lights_physical_fragment:Uv,lights_physical_pars_fragment:Dv,lights_fragment_begin:Nv,lights_fragment_maps:Ov,lights_fragment_end:Fv,logdepthbuf_fragment:Bv,logdepthbuf_pars_fragment:kv,logdepthbuf_pars_vertex:Vv,logdepthbuf_vertex:zv,map_fragment:Hv,map_pars_fragment:Gv,map_particle_fragment:Wv,map_particle_pars_fragment:Xv,metalnessmap_fragment:qv,metalnessmap_pars_fragment:Yv,morphinstance_vertex:jv,morphcolor_vertex:Zv,morphnormal_vertex:$v,morphtarget_pars_vertex:Kv,morphtarget_vertex:Jv,normal_fragment_begin:Qv,normal_fragment_maps:ex,normal_pars_fragment:tx,normal_pars_vertex:nx,normal_vertex:ix,normalmap_pars_fragment:sx,clearcoat_normal_fragment_begin:rx,clearcoat_normal_fragment_maps:ox,clearcoat_pars_fragment:ax,iridescence_pars_fragment:lx,opaque_fragment:cx,packing:ux,premultiplied_alpha_fragment:hx,project_vertex:dx,dithering_fragment:fx,dithering_pars_fragment:px,roughnessmap_fragment:mx,roughnessmap_pars_fragment:gx,shadowmap_pars_fragment:_x,shadowmap_pars_vertex:vx,shadowmap_vertex:xx,shadowmask_pars_fragment:yx,skinbase_vertex:Mx,skinning_pars_vertex:Sx,skinning_vertex:bx,skinnormal_vertex:wx,specularmap_fragment:Tx,specularmap_pars_fragment:Ax,tonemapping_fragment:Ex,tonemapping_pars_fragment:Rx,transmission_fragment:Cx,transmission_pars_fragment:Px,uv_pars_fragment:Ix,uv_pars_vertex:Lx,uv_vertex:Ux,worldpos_vertex:Dx,background_vert:Nx,background_frag:Ox,backgroundCube_vert:Fx,backgroundCube_frag:Bx,cube_vert:kx,cube_frag:Vx,depth_vert:zx,depth_frag:Hx,distanceRGBA_vert:Gx,distanceRGBA_frag:Wx,equirect_vert:Xx,equirect_frag:qx,linedashed_vert:Yx,linedashed_frag:jx,meshbasic_vert:Zx,meshbasic_frag:$x,meshlambert_vert:Kx,meshlambert_frag:Jx,meshmatcap_vert:Qx,meshmatcap_frag:ey,meshnormal_vert:ty,meshnormal_frag:ny,meshphong_vert:iy,meshphong_frag:sy,meshphysical_vert:ry,meshphysical_frag:oy,meshtoon_vert:ay,meshtoon_frag:ly,points_vert:cy,points_frag:uy,shadow_vert:hy,shadow_frag:dy,sprite_vert:fy,sprite_frag:py},ve={common:{diffuse:{value:new Z(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Z(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Z(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Z(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Wn={basic:{uniforms:cn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:cn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Z(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:cn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Z(0)},specular:{value:new Z(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:cn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Z(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:cn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Z(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:cn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:cn([ve.points,ve.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:cn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:cn([ve.common,ve.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:cn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:cn([ve.sprite,ve.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:cn([ve.common,ve.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:cn([ve.lights,ve.fog,{color:{value:new Z(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Wn.physical={uniforms:cn([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Z(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Z(0)},specularColor:{value:new Z(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const ma={r:0,b:0,g:0},fs=new on,my=new Le;function gy(s,e,t,n,i,r,o){const a=new Z(0);let l=r===!0?0:1,c,u,h=null,d=0,f=null;function m(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function _(y){let x=!1;const v=m(y);v===null?p(a,l):v&&v.isColor&&(p(v,1),x=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(y,x){const v=m(x);v&&(v.isCubeTexture||v.mapping===Vr)?(u===void 0&&(u=new je(new Yt(1,1,1),new Ut({name:"BackgroundCubeMaterial",uniforms:Fr(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),fs.copy(x.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(my.makeRotationFromEuler(fs)),u.material.toneMapped=at.getTransfer(v.colorSpace)!==_t,(h!==v||d!==v.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=s.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new je(new is(2,2),new Ut({name:"BackgroundMaterial",uniforms:Fr(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=at.getTransfer(v.colorSpace)!==_t,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,x){y.getRGB(ma,Em(s)),n.buffers.color.setClear(ma.r,ma.g,ma.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:g}}function _y(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(M,I,V,H,D){let z=!1;const B=h(H,V,I);r!==B&&(r=B,c(r.object)),z=f(M,H,V,D),z&&m(M,H,V,D),D!==null&&e.update(D,s.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,v(M,I,V,H),D!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function u(M){return s.deleteVertexArray(M)}function h(M,I,V){const H=V.wireframe===!0;let D=n[M.id];D===void 0&&(D={},n[M.id]=D);let z=D[I.id];z===void 0&&(z={},D[I.id]=z);let B=z[H];return B===void 0&&(B=d(l()),z[H]=B),B}function d(M){const I=[],V=[],H=[];for(let D=0;D<t;D++)I[D]=0,V[D]=0,H[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,I,V,H){const D=r.attributes,z=I.attributes;let B=0;const $=V.getAttributes();for(const G in $)if($[G].location>=0){const te=D[G];let me=z[G];if(me===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(me=M.instanceColor)),te===void 0||te.attribute!==me||me&&te.data!==me.data)return!0;B++}return r.attributesNum!==B||r.index!==H}function m(M,I,V,H){const D={},z=I.attributes;let B=0;const $=V.getAttributes();for(const G in $)if($[G].location>=0){let te=z[G];te===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(te=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(te=M.instanceColor));const me={};me.attribute=te,te&&te.data&&(me.data=te.data),D[G]=me,B++}r.attributes=D,r.attributesNum=B,r.index=H}function _(){const M=r.newAttributes;for(let I=0,V=M.length;I<V;I++)M[I]=0}function g(M){p(M,0)}function p(M,I){const V=r.newAttributes,H=r.enabledAttributes,D=r.attributeDivisors;V[M]=1,H[M]===0&&(s.enableVertexAttribArray(M),H[M]=1),D[M]!==I&&(s.vertexAttribDivisor(M,I),D[M]=I)}function y(){const M=r.newAttributes,I=r.enabledAttributes;for(let V=0,H=I.length;V<H;V++)I[V]!==M[V]&&(s.disableVertexAttribArray(V),I[V]=0)}function x(M,I,V,H,D,z,B){B===!0?s.vertexAttribIPointer(M,I,V,D,z):s.vertexAttribPointer(M,I,V,H,D,z)}function v(M,I,V,H){_();const D=H.attributes,z=V.getAttributes(),B=I.defaultAttributeValues;for(const $ in z){const G=z[$];if(G.location>=0){let re=D[$];if(re===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(re=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(re=M.instanceColor)),re!==void 0){const te=re.normalized,me=re.itemSize,Be=e.get(re);if(Be===void 0)continue;const tt=Be.buffer,Q=Be.type,le=Be.bytesPerElement,Ce=Q===s.INT||Q===s.UNSIGNED_INT||re.gpuType===jl;if(re.isInterleavedBufferAttribute){const pe=re.data,Ne=pe.stride,Xe=re.offset;if(pe.isInstancedInterleavedBuffer){for(let ze=0;ze<G.locationSize;ze++)p(G.location+ze,pe.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ze=0;ze<G.locationSize;ze++)g(G.location+ze);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let ze=0;ze<G.locationSize;ze++)x(G.location+ze,me/G.locationSize,Q,te,Ne*le,(Xe+me/G.locationSize*ze)*le,Ce)}else{if(re.isInstancedBufferAttribute){for(let pe=0;pe<G.locationSize;pe++)p(G.location+pe,re.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let pe=0;pe<G.locationSize;pe++)g(G.location+pe);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let pe=0;pe<G.locationSize;pe++)x(G.location+pe,me/G.locationSize,Q,te,me*le,me/G.locationSize*pe*le,Ce)}}else if(B!==void 0){const te=B[$];if(te!==void 0)switch(te.length){case 2:s.vertexAttrib2fv(G.location,te);break;case 3:s.vertexAttrib3fv(G.location,te);break;case 4:s.vertexAttrib4fv(G.location,te);break;default:s.vertexAttrib1fv(G.location,te)}}}}y()}function C(){R();for(const M in n){const I=n[M];for(const V in I){const H=I[V];for(const D in H)u(H[D].object),delete H[D];delete I[V]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const V in I){const H=I[V];for(const D in H)u(H[D].object),delete H[D];delete I[V]}delete n[M.id]}function E(M){for(const I in n){const V=n[I];if(V[M.id]===void 0)continue;const H=V[M.id];for(const D in H)u(H[D].object),delete H[D];delete V[M.id]}}function R(){b(),o=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function vy(s,e,t){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(s.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let m=0;for(let _=0;_<h;_++)m+=u[_]*d[_];t.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function xy(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Kt&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==oi&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==vn&&!R)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:C,maxSamples:T}}function yy(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new yi,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=s.get(h);if(!i||m===null||m.length===0||r&&!g)r?u(null):c();else{const y=r?0:n,x=y*4;let v=p.clippingState||null;l.value=v,v=u(m,d,x,f);for(let C=0;C!==x;++C)v[C]=t[C];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,v=f;x!==_;++x,v+=4)o.copy(h[x]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function My(s){let e=new WeakMap;function t(o,a){return a===Lo?o.mapping=Ei:a===Uo&&(o.mapping=Ji),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Lo||a===Uo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Cm(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Hr extends ic{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Er=4,Td=[.125,.215,.35,.446,.526,.582],Cs=20,Hc=new Hr,Ad=new Z;let Gc=null,Wc=0,Xc=0,qc=!1;const Rs=(1+Math.sqrt(5))/2,mr=1/Rs,Ed=[new w(-Rs,mr,0),new w(Rs,mr,0),new w(-mr,0,Rs),new w(mr,0,Rs),new w(0,Rs,-mr),new w(0,Rs,mr),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Du{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Gc=this._renderer.getRenderTarget(),Wc=this._renderer.getActiveCubeFace(),Xc=this._renderer.getActiveMipmapLevel(),qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Gc,Wc,Xc),this._renderer.xr.enabled=qc,e.scissorTest=!1,ga(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===Ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gc=this._renderer.getRenderTarget(),Wc=this._renderer.getActiveCubeFace(),Xc=this._renderer.getActiveMipmapLevel(),qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:ii,format:Kt,colorSpace:rn,depthBuffer:!1},i=Rd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rd(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sy(r)),this._blurMaterial=by(r,e,t)}return i}_compileMaterial(e){const t=new je(this._lodPlanes[0],e);this._renderer.compile(t,Hc)}_sceneToCubeUV(e,t,n,i){const a=new Vt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Ad),u.toneMapping=wi,u.autoClear=!1;const f=new Mt({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),m=new je(new Yt,f);let _=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,_=!0):(f.color.copy(Ad),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;ga(i,y*x,p>2?x:0,x,x),u.setRenderTarget(i),_&&u.render(m,a),u.render(e,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ei||e.mapping===Ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cd());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new je(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;ga(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Hc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ed[(i-r-1)%Ed.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new je(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Cs-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):Cs;g>Cs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Cs}`);const p=[];let y=0;for(let E=0;E<Cs;++E){const R=E/_,b=Math.exp(-R*R/2);p.push(b),E===0?y+=b:E<g&&(y+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-n;const v=this._sizeLods[i],C=3*v*(i>x-Er?i-x+Er:0),T=4*(this._cubeSize-v);ga(t,C,T,3*v,2*v),l.setRenderTarget(t),l.render(h,Hc)}}function Sy(s){const e=[],t=[],n=[];let i=s;const r=s-Er+1+Td.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Er?l=Td[o-s+Er-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),x=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,R=T>2?0:-1,b=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];y.set(b,_*m*T),x.set(d,g*m*T);const M=[T,T,T,T,T,T];v.set(M,p*m*T)}const C=new Ve;C.setAttribute("position",new Ze(y,_)),C.setAttribute("uv",new Ze(x,g)),C.setAttribute("faceIndex",new Ze(v,p)),e.push(C),i>Er&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Rd(s,e,t){const n=new sn(s,e,t);return n.texture.mapping=Vr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ga(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function by(s,e,t){const n=new Float32Array(Cs),i=new w(0,1,0);return new Ut({name:"SphericalGaussianBlur",defines:{n:Cs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:bh(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Cd(){return new Ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bh(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Pd(){return new Ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function bh(){return`

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
	`}function wy(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Lo||l===Uo,u=l===Ei||l===Ji;if(c||u){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Du(s)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Du(s)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Ty(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&go("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ay(s,e,t,n){const i={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)e.remove(_[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const m in d)e.update(d[m],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const m in f){const _=f[m];for(let g=0,p=_.length;g<p;g++)e.update(_[g],s.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,m=h.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let x=0,v=y.length;x<v;x+=3){const C=y[x+0],T=y[x+1],E=y[x+2];d.push(C,T,T,E,E,C)}}else if(m!==void 0){const y=m.array;_=m.version;for(let x=0,v=y.length/3-1;x<v;x+=3){const C=x+0,T=x+1,E=x+2;d.push(C,T,T,E,E,C)}}else return;const g=new(Sm(d)?Sh:Mh)(d,1);g.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,g)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Ey(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*o,m),t.update(f,n,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function h(d,f,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Ry(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Cy(s,e,t){const n=new WeakMap,i=new dt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let b=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),m===!0&&(x=2),_===!0&&(x=3);let v=a.attributes.position.count*x,C=1;v>e.maxTextureSize&&(C=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const T=new Float32Array(v*C*4*h),E=new tc(T,v,C,h);E.type=vn,E.needsUpdate=!0;const R=x*4;for(let M=0;M<h;M++){const I=g[M],V=p[M],H=y[M],D=v*C*4*M;for(let z=0;z<I.count;z++){const B=z*R;f===!0&&(i.fromBufferAttribute(I,z),T[D+B+0]=i.x,T[D+B+1]=i.y,T[D+B+2]=i.z,T[D+B+3]=0),m===!0&&(i.fromBufferAttribute(V,z),T[D+B+4]=i.x,T[D+B+5]=i.y,T[D+B+6]=i.z,T[D+B+7]=0),_===!0&&(i.fromBufferAttribute(H,z),T[D+B+8]=i.x,T[D+B+9]=i.y,T[D+B+10]=i.z,T[D+B+11]=H.itemSize===4?i.w:1)}}d={count:h,texture:E,size:new K(v,C)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Py(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class wh extends At{constructor(e,t,n,i,r,o,a,l,c,u=ks){if(u!==ks&&u!==Ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ks&&(n=Ri),n===void 0&&u===Ys&&(n=qs),super(null,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ot,this.minFilter=l!==void 0?l:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Im=new At,Id=new wh(1,1),Lm=new tc,Um=new yh,Dm=new Xo,Ld=[],Ud=[],Dd=new Float32Array(16),Nd=new Float32Array(9),Od=new Float32Array(4);function Gr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Ld[i];if(r===void 0&&(r=new Float32Array(i),Ld[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function zt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ht(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function sc(s,e){let t=Ud[e];t===void 0&&(t=new Int32Array(e),Ud[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Iy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Ly(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;s.uniform2fv(this.addr,e),Ht(t,e)}}function Uy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;s.uniform3fv(this.addr,e),Ht(t,e)}}function Dy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;s.uniform4fv(this.addr,e),Ht(t,e)}}function Ny(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Od.set(n),s.uniformMatrix2fv(this.addr,!1,Od),Ht(t,n)}}function Oy(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Nd.set(n),s.uniformMatrix3fv(this.addr,!1,Nd),Ht(t,n)}}function Fy(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Dd.set(n),s.uniformMatrix4fv(this.addr,!1,Dd),Ht(t,n)}}function By(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function ky(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;s.uniform2iv(this.addr,e),Ht(t,e)}}function Vy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;s.uniform3iv(this.addr,e),Ht(t,e)}}function zy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;s.uniform4iv(this.addr,e),Ht(t,e)}}function Hy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Gy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;s.uniform2uiv(this.addr,e),Ht(t,e)}}function Wy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;s.uniform3uiv(this.addr,e),Ht(t,e)}}function Xy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;s.uniform4uiv(this.addr,e),Ht(t,e)}}function qy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Id.compareFunction=vh,r=Id):r=Im,t.setTexture2D(e||r,i)}function Yy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Um,i)}function jy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Dm,i)}function Zy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Lm,i)}function $y(s){switch(s){case 5126:return Iy;case 35664:return Ly;case 35665:return Uy;case 35666:return Dy;case 35674:return Ny;case 35675:return Oy;case 35676:return Fy;case 5124:case 35670:return By;case 35667:case 35671:return ky;case 35668:case 35672:return Vy;case 35669:case 35673:return zy;case 5125:return Hy;case 36294:return Gy;case 36295:return Wy;case 36296:return Xy;case 35678:case 36198:case 36298:case 36306:case 35682:return qy;case 35679:case 36299:case 36307:return Yy;case 35680:case 36300:case 36308:case 36293:return jy;case 36289:case 36303:case 36311:case 36292:return Zy}}function Ky(s,e){s.uniform1fv(this.addr,e)}function Jy(s,e){const t=Gr(e,this.size,2);s.uniform2fv(this.addr,t)}function Qy(s,e){const t=Gr(e,this.size,3);s.uniform3fv(this.addr,t)}function eM(s,e){const t=Gr(e,this.size,4);s.uniform4fv(this.addr,t)}function tM(s,e){const t=Gr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function nM(s,e){const t=Gr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function iM(s,e){const t=Gr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function sM(s,e){s.uniform1iv(this.addr,e)}function rM(s,e){s.uniform2iv(this.addr,e)}function oM(s,e){s.uniform3iv(this.addr,e)}function aM(s,e){s.uniform4iv(this.addr,e)}function lM(s,e){s.uniform1uiv(this.addr,e)}function cM(s,e){s.uniform2uiv(this.addr,e)}function uM(s,e){s.uniform3uiv(this.addr,e)}function hM(s,e){s.uniform4uiv(this.addr,e)}function dM(s,e,t){const n=this.cache,i=e.length,r=sc(t,i);zt(n,r)||(s.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Im,r[o])}function fM(s,e,t){const n=this.cache,i=e.length,r=sc(t,i);zt(n,r)||(s.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Um,r[o])}function pM(s,e,t){const n=this.cache,i=e.length,r=sc(t,i);zt(n,r)||(s.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Dm,r[o])}function mM(s,e,t){const n=this.cache,i=e.length,r=sc(t,i);zt(n,r)||(s.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Lm,r[o])}function gM(s){switch(s){case 5126:return Ky;case 35664:return Jy;case 35665:return Qy;case 35666:return eM;case 35674:return tM;case 35675:return nM;case 35676:return iM;case 5124:case 35670:return sM;case 35667:case 35671:return rM;case 35668:case 35672:return oM;case 35669:case 35673:return aM;case 5125:return lM;case 36294:return cM;case 36295:return uM;case 36296:return hM;case 35678:case 36198:case 36298:case 36306:case 35682:return dM;case 35679:case 36299:case 36307:return fM;case 35680:case 36300:case 36308:case 36293:return pM;case 36289:case 36303:case 36311:case 36292:return mM}}class _M{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$y(t.type)}}class vM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gM(t.type)}}class xM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Yc=/(\w+)(\])?(\[|\.)?/g;function Fd(s,e){s.seq.push(e),s.map[e.id]=e}function yM(s,e,t){const n=s.name,i=n.length;for(Yc.lastIndex=0;;){const r=Yc.exec(n),o=Yc.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Fd(t,c===void 0?new _M(a,s,e):new vM(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new xM(a),Fd(t,h)),t=h}}}class $a{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);yM(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Bd(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const MM=37297;let SM=0;function bM(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const kd=new We;function wM(s){at._getMatrix(kd,at.workingColorSpace,s);const e=`mat3( ${kd.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(s)){case Wo:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Vd(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+bM(s.getShaderSource(e),o)}else return i}function TM(s,e){const t=wM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function AM(s,e){let t;switch(e){case Ju:t="Linear";break;case Qu:t="Reinhard";break;case eh:t="Cineon";break;case th:t="ACESFilmic";break;case nh:t="AgX";break;case ih:t="Neutral";break;case lm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _a=new w;function EM(){at.getLuminanceCoefficients(_a);const s=_a.x.toFixed(4),e=_a.y.toFixed(4),t=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function RM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vo).join(`
`)}function CM(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function PM(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function vo(s){return s!==""}function zd(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hd(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const IM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nu(s){return s.replace(IM,UM)}const LM=new Map;function UM(s,e){let t=it[e];if(t===void 0){const n=LM.get(e);if(n!==void 0)t=it[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Nu(t)}const DM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gd(s){return s.replace(DM,NM)}function NM(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Wd(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function OM(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Xl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ku?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function FM(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ei:case Ji:e="ENVMAP_TYPE_CUBE";break;case Vr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function BM(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ji:e="ENVMAP_MODE_REFRACTION";break}return e}function kM(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ho:e="ENVMAP_BLENDING_MULTIPLY";break;case om:e="ENVMAP_BLENDING_MIX";break;case am:e="ENVMAP_BLENDING_ADD";break}return e}function VM(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zM(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=OM(t),c=FM(t),u=BM(t),h=kM(t),d=VM(t),f=RM(t),m=CM(r),_=i.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(vo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(vo).join(`
`),p.length>0&&(p+=`
`)):(g=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vo).join(`
`),p=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?it.tonemapping_pars_fragment:"",t.toneMapping!==wi?AM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,TM("linearToOutputTexel",t.outputColorSpace),EM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vo).join(`
`)),o=Nu(o),o=zd(o,t),o=Hd(o,t),a=Nu(a),a=zd(a,t),a=Hd(a,t),o=Gd(o),a=Gd(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+g+o,v=y+p+a,C=Bd(i,i.VERTEX_SHADER,x),T=Bd(i,i.FRAGMENT_SHADER,v);i.attachShader(_,C),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(I){if(s.debug.checkShaderErrors){const V=i.getProgramInfoLog(_).trim(),H=i.getShaderInfoLog(C).trim(),D=i.getShaderInfoLog(T).trim();let z=!0,B=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,C,T);else{const $=Vd(i,C,"vertex"),G=Vd(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+$+`
`+G)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(H===""||D==="")&&(B=!1);B&&(I.diagnostics={runnable:z,programLog:V,vertexShader:{log:H,prefix:g},fragmentShader:{log:D,prefix:p}})}i.deleteShader(C),i.deleteShader(T),R=new $a(i,_),b=PM(i,_)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,MM)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=SM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}let HM=0;class GM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new WM(e),t.set(e,n)),n}}class WM{constructor(e){this.id=HM++,this.code=e,this.usedTimes=0}}function XM(s,e,t,n,i,r,o){const a=new nc,l=new GM,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,I,V,H){const D=V.fog,z=H.geometry,B=b.isMeshStandardMaterial?V.environment:null,$=(b.isMeshStandardMaterial?t:e).get(b.envMap||B),G=$&&$.mapping===Vr?$.image.height:null,re=m[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const te=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,me=te!==void 0?te.length:0;let Be=0;z.morphAttributes.position!==void 0&&(Be=1),z.morphAttributes.normal!==void 0&&(Be=2),z.morphAttributes.color!==void 0&&(Be=3);let tt,Q,le,Ce;if(re){const ht=Wn[re];tt=ht.vertexShader,Q=ht.fragmentShader}else tt=b.vertexShader,Q=b.fragmentShader,l.update(b),le=l.getVertexShaderID(b),Ce=l.getFragmentShaderID(b);const pe=s.getRenderTarget(),Ne=s.state.buffers.depth.getReversed(),Xe=H.isInstancedMesh===!0,ze=H.isBatchedMesh===!0,ot=!!b.map,ie=!!b.matcap,fe=!!$,L=!!b.aoMap,Ue=!!b.lightMap,oe=!!b.bumpMap,Ee=!!b.normalMap,ge=!!b.displacementMap,He=!!b.emissiveMap,Te=!!b.metalnessMap,P=!!b.roughnessMap,A=b.anisotropy>0,W=b.clearcoat>0,J=b.dispersion>0,ae=b.iridescence>0,ee=b.sheen>0,Ie=b.transmission>0,Se=A&&!!b.anisotropyMap,Ae=W&&!!b.clearcoatMap,q=W&&!!b.clearcoatNormalMap,j=W&&!!b.clearcoatRoughnessMap,se=ae&&!!b.iridescenceMap,ce=ae&&!!b.iridescenceThicknessMap,_e=ee&&!!b.sheenColorMap,ue=ee&&!!b.sheenRoughnessMap,Je=!!b.specularMap,ye=!!b.specularColorMap,lt=!!b.specularIntensityMap,O=Ie&&!!b.transmissionMap,Me=Ie&&!!b.thicknessMap,Y=!!b.gradientMap,ne=!!b.alphaMap,be=b.alphaTest>0,de=!!b.alphaHash,Ke=!!b.extensions;let xt=wi;b.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(xt=s.toneMapping);const Tt={shaderID:re,shaderType:b.type,shaderName:b.name,vertexShader:tt,fragmentShader:Q,defines:b.defines,customVertexShaderID:le,customFragmentShaderID:Ce,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:ze,batchingColor:ze&&H._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&H.instanceColor!==null,instancingMorph:Xe&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:pe===null?s.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:rn,alphaToCoverage:!!b.alphaToCoverage,map:ot,matcap:ie,envMap:fe,envMapMode:fe&&$.mapping,envMapCubeUVHeight:G,aoMap:L,lightMap:Ue,bumpMap:oe,normalMap:Ee,displacementMap:d&&ge,emissiveMap:He,normalMapObjectSpace:Ee&&b.normalMapType===fm,normalMapTangentSpace:Ee&&b.normalMapType===Ii,metalnessMap:Te,roughnessMap:P,anisotropy:A,anisotropyMap:Se,clearcoat:W,clearcoatMap:Ae,clearcoatNormalMap:q,clearcoatRoughnessMap:j,dispersion:J,iridescence:ae,iridescenceMap:se,iridescenceThicknessMap:ce,sheen:ee,sheenColorMap:_e,sheenRoughnessMap:ue,specularMap:Je,specularColorMap:ye,specularIntensityMap:lt,transmission:Ie,transmissionMap:O,thicknessMap:Me,gradientMap:Y,opaque:b.transparent===!1&&b.blending===Bs&&b.alphaToCoverage===!1,alphaMap:ne,alphaTest:be,alphaHash:de,combine:b.combine,mapUv:ot&&_(b.map.channel),aoMapUv:L&&_(b.aoMap.channel),lightMapUv:Ue&&_(b.lightMap.channel),bumpMapUv:oe&&_(b.bumpMap.channel),normalMapUv:Ee&&_(b.normalMap.channel),displacementMapUv:ge&&_(b.displacementMap.channel),emissiveMapUv:He&&_(b.emissiveMap.channel),metalnessMapUv:Te&&_(b.metalnessMap.channel),roughnessMapUv:P&&_(b.roughnessMap.channel),anisotropyMapUv:Se&&_(b.anisotropyMap.channel),clearcoatMapUv:Ae&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:q&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:ue&&_(b.sheenRoughnessMap.channel),specularMapUv:Je&&_(b.specularMap.channel),specularColorMapUv:ye&&_(b.specularColorMap.channel),specularIntensityMapUv:lt&&_(b.specularIntensityMap.channel),transmissionMapUv:O&&_(b.transmissionMap.channel),thicknessMapUv:Me&&_(b.thicknessMap.channel),alphaMapUv:ne&&_(b.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ee||A),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!z.attributes.uv&&(ot||ne),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ne,skinning:H.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Be,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:xt,decodeVideoTexture:ot&&b.map.isVideoTexture===!0&&at.getTransfer(b.map.colorSpace)===_t,decodeVideoTextureEmissive:He&&b.emissiveMap.isVideoTexture===!0&&at.getTransfer(b.emissiveMap.colorSpace)===_t,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===qt,flipSided:b.side===jt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ke&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ke&&b.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(M,b),x(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function x(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const M=m[b.type];let I;if(M){const V=Wn[M];I=Ci.clone(V.uniforms)}else I=b.uniforms;return I}function C(b,M){let I;for(let V=0,H=u.length;V<H;V++){const D=u[V];if(D.cacheKey===M){I=D,++I.usedTimes;break}}return I===void 0&&(I=new zM(s,M,b,r),u.push(I)),I}function T(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function E(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:T,releaseShaderCache:E,programs:u,dispose:R}}function qM(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function YM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Xd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function qd(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,d,f,m,_,g){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:_,group:g},s[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=_,p.group=g),e++,p}function a(h,d,f,m,_,g){const p=o(h,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(h,d,f,m,_,g){const p=o(h,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||YM),n.length>1&&n.sort(d||Xd),i.length>1&&i.sort(d||Xd)}function u(){for(let h=e,d=s.length;h<d;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function jM(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new qd,s.set(n,[o])):i>=r.length?(o=new qd,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function ZM(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Z};break;case"SpotLight":t={position:new w,direction:new w,color:new Z,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Z,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Z,groundColor:new Z};break;case"RectAreaLight":t={color:new Z,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function $M(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let KM=0;function JM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function QM(s){const e=new ZM,t=$M(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new w);const i=new w,r=new Le,o=new Le;function a(c){let u=0,h=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,x=0,v=0,C=0,T=0,E=0;c.sort(JM);for(let b=0,M=c.length;b<M;b++){const I=c[b],V=I.color,H=I.intensity,D=I.distance,z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=V.r*H,h+=V.g*H,d+=V.b*H;else if(I.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(I.sh.coefficients[B],H);E++}else if(I.isDirectionalLight){const B=e.get(I);if(B.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const $=I.shadow,G=t.get(I);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=B,f++}else if(I.isSpotLight){const B=e.get(I);B.position.setFromMatrixPosition(I.matrixWorld),B.color.copy(V).multiplyScalar(H),B.distance=D,B.coneCos=Math.cos(I.angle),B.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),B.decay=I.decay,n.spot[_]=B;const $=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,$.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[_]=$.matrix,I.castShadow){const G=t.get(I);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=z,v++}_++}else if(I.isRectAreaLight){const B=e.get(I);B.color.copy(V).multiplyScalar(H),B.halfWidth.set(I.width*.5,0,0),B.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=B,g++}else if(I.isPointLight){const B=e.get(I);if(B.color.copy(I.color).multiplyScalar(I.intensity),B.distance=I.distance,B.decay=I.decay,I.castShadow){const $=I.shadow,G=t.get(I);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,G.shadowCameraNear=$.camera.near,G.shadowCameraFar=$.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=z,n.pointShadowMatrix[m]=I.shadow.matrix,x++}n.point[m]=B,m++}else if(I.isHemisphereLight){const B=e.get(I);B.skyColor.copy(I.color).multiplyScalar(H),B.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[p]=B,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==y||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==C||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,R.directionalLength=f,R.pointLength=m,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=y,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=C,R.numLightProbes=E,n.version=KM++)}function l(c,u){let h=0,d=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const x=c[p];if(x.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),h++}else if(x.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function Yd(s){const e=new QM(s),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function eS(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Yd(s),e.set(i,[a])):r>=o.length?(a=new Yd(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class rc extends Bt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=dm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Th extends Bt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nS=`uniform sampler2D shadow_pass;
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
}`;function iS(s,e,t){let n=new qo;const i=new K,r=new K,o=new dt,a=new rc({depthPacking:_h}),l=new Th,c={},u=t.maxTextureSize,h={[ri]:jt,[jt]:ri,[qt]:qt},d=new Ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:tS,fragmentShader:nS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ve;m.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new je(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xl;let p=this.type;this.render=function(T,E,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const b=s.getRenderTarget(),M=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),V=s.state;V.setBlending(ni),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const H=p!==Jn&&this.type===Jn,D=p===Jn&&this.type!==Jn;for(let z=0,B=T.length;z<B;z++){const $=T[z],G=$.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const re=G.getFrameExtents();if(i.multiply(re),r.copy(G.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/re.x),i.x=r.x*re.x,G.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/re.y),i.y=r.y*re.y,G.mapSize.y=r.y)),G.map===null||H===!0||D===!0){const me=this.type!==Jn?{minFilter:Ot,magFilter:Ot}:{};G.map!==null&&G.map.dispose(),G.map=new sn(i.x,i.y,me),G.map.texture.name=$.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const te=G.getViewportCount();for(let me=0;me<te;me++){const Be=G.getViewport(me);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),V.viewport(o),G.updateMatrices($,me),n=G.getFrustum(),v(E,R,G.camera,$,this.type)}G.isPointLightShadow!==!0&&this.type===Jn&&y(G,R),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(b,M,I)};function y(T,E){const R=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new sn(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(E,null,R,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(E,null,R,f,_,null)}function x(T,E,R,b){let M=null;const I=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=R.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const V=M.uuid,H=E.uuid;let D=c[V];D===void 0&&(D={},c[V]=D);let z=D[H];z===void 0&&(z=M.clone(),D[H]=z,E.addEventListener("dispose",C)),M=z}if(M.visible=E.visible,M.wireframe=E.wireframe,b===Jn?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:h[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=s.properties.get(M);V.light=R}return M}function v(T,E,R,b,M){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Jn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const H=e.update(T),D=T.material;if(Array.isArray(D)){const z=H.groups;for(let B=0,$=z.length;B<$;B++){const G=z[B],re=D[G.materialIndex];if(re&&re.visible){const te=x(T,re,b,M);T.onBeforeShadow(s,T,E,R,H,te,G),s.renderBufferDirect(R,null,H,te,T,G),T.onAfterShadow(s,T,E,R,H,te,G)}}}else if(D.visible){const z=x(T,D,b,M);T.onBeforeShadow(s,T,E,R,H,z,null),s.renderBufferDirect(R,null,H,z,T,null),T.onAfterShadow(s,T,E,R,H,z,null)}}const V=T.children;for(let H=0,D=V.length;H<D;H++)v(V[H],E,R,b,M)}function C(T){T.target.removeEventListener("dispose",C);for(const R in c){const b=c[R],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const sS={[nl]:il,[sl]:Io,[rl]:al,[Xs]:ol,[il]:nl,[Io]:sl,[al]:rl,[ol]:Xs};function rS(s,e){function t(){let O=!1;const Me=new dt;let Y=null;const ne=new dt(0,0,0,0);return{setMask:function(be){Y!==be&&!O&&(s.colorMask(be,be,be,be),Y=be)},setLocked:function(be){O=be},setClear:function(be,de,Ke,xt,Tt){Tt===!0&&(be*=xt,de*=xt,Ke*=xt),Me.set(be,de,Ke,xt),ne.equals(Me)===!1&&(s.clearColor(be,de,Ke,xt),ne.copy(Me))},reset:function(){O=!1,Y=null,ne.set(-1,0,0,0)}}}function n(){let O=!1,Me=!1,Y=null,ne=null,be=null;return{setReversed:function(de){if(Me!==de){const Ke=e.get("EXT_clip_control");Me?Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.ZERO_TO_ONE_EXT):Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.NEGATIVE_ONE_TO_ONE_EXT);const xt=be;be=null,this.setClear(xt)}Me=de},getReversed:function(){return Me},setTest:function(de){de?pe(s.DEPTH_TEST):Ne(s.DEPTH_TEST)},setMask:function(de){Y!==de&&!O&&(s.depthMask(de),Y=de)},setFunc:function(de){if(Me&&(de=sS[de]),ne!==de){switch(de){case nl:s.depthFunc(s.NEVER);break;case il:s.depthFunc(s.ALWAYS);break;case sl:s.depthFunc(s.LESS);break;case Xs:s.depthFunc(s.LEQUAL);break;case rl:s.depthFunc(s.EQUAL);break;case ol:s.depthFunc(s.GEQUAL);break;case Io:s.depthFunc(s.GREATER);break;case al:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ne=de}},setLocked:function(de){O=de},setClear:function(de){be!==de&&(Me&&(de=1-de),s.clearDepth(de),be=de)},reset:function(){O=!1,Y=null,ne=null,be=null,Me=!1}}}function i(){let O=!1,Me=null,Y=null,ne=null,be=null,de=null,Ke=null,xt=null,Tt=null;return{setTest:function(ht){O||(ht?pe(s.STENCIL_TEST):Ne(s.STENCIL_TEST))},setMask:function(ht){Me!==ht&&!O&&(s.stencilMask(ht),Me=ht)},setFunc:function(ht,an,yn){(Y!==ht||ne!==an||be!==yn)&&(s.stencilFunc(ht,an,yn),Y=ht,ne=an,be=yn)},setOp:function(ht,an,yn){(de!==ht||Ke!==an||xt!==yn)&&(s.stencilOp(ht,an,yn),de=ht,Ke=an,xt=yn)},setLocked:function(ht){O=ht},setClear:function(ht){Tt!==ht&&(s.clearStencil(ht),Tt=ht)},reset:function(){O=!1,Me=null,Y=null,ne=null,be=null,de=null,Ke=null,xt=null,Tt=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,x=null,v=null,C=null,T=null,E=new Z(0,0,0),R=0,b=!1,M=null,I=null,V=null,H=null,D=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,$=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(G)[1]),B=$>=1):G.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),B=$>=2);let re=null,te={};const me=s.getParameter(s.SCISSOR_BOX),Be=s.getParameter(s.VIEWPORT),tt=new dt().fromArray(me),Q=new dt().fromArray(Be);function le(O,Me,Y,ne){const be=new Uint8Array(4),de=s.createTexture();s.bindTexture(O,de),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ke=0;Ke<Y;Ke++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(Me,0,s.RGBA,1,1,ne,0,s.RGBA,s.UNSIGNED_BYTE,be):s.texImage2D(Me+Ke,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,be);return de}const Ce={};Ce[s.TEXTURE_2D]=le(s.TEXTURE_2D,s.TEXTURE_2D,1),Ce[s.TEXTURE_CUBE_MAP]=le(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ce[s.TEXTURE_2D_ARRAY]=le(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ce[s.TEXTURE_3D]=le(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pe(s.DEPTH_TEST),o.setFunc(Xs),oe(!1),Ee(Ru),pe(s.CULL_FACE),L(ni);function pe(O){u[O]!==!0&&(s.enable(O),u[O]=!0)}function Ne(O){u[O]!==!1&&(s.disable(O),u[O]=!1)}function Xe(O,Me){return h[O]!==Me?(s.bindFramebuffer(O,Me),h[O]=Me,O===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=Me),O===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=Me),!0):!1}function ze(O,Me){let Y=f,ne=!1;if(O){Y=d.get(Me),Y===void 0&&(Y=[],d.set(Me,Y));const be=O.textures;if(Y.length!==be.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let de=0,Ke=be.length;de<Ke;de++)Y[de]=s.COLOR_ATTACHMENT0+de;Y.length=be.length,ne=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,ne=!0);ne&&s.drawBuffers(Y)}function ot(O){return m!==O?(s.useProgram(O),m=O,!0):!1}const ie={[ji]:s.FUNC_ADD,[Gp]:s.FUNC_SUBTRACT,[Wp]:s.FUNC_REVERSE_SUBTRACT};ie[Xp]=s.MIN,ie[qp]=s.MAX;const fe={[Yp]:s.ZERO,[jp]:s.ONE,[Zp]:s.SRC_COLOR,[el]:s.SRC_ALPHA,[tm]:s.SRC_ALPHA_SATURATE,[Qp]:s.DST_COLOR,[Kp]:s.DST_ALPHA,[$p]:s.ONE_MINUS_SRC_COLOR,[tl]:s.ONE_MINUS_SRC_ALPHA,[em]:s.ONE_MINUS_DST_COLOR,[Jp]:s.ONE_MINUS_DST_ALPHA,[nm]:s.CONSTANT_COLOR,[im]:s.ONE_MINUS_CONSTANT_COLOR,[sm]:s.CONSTANT_ALPHA,[rm]:s.ONE_MINUS_CONSTANT_ALPHA};function L(O,Me,Y,ne,be,de,Ke,xt,Tt,ht){if(O===ni){_===!0&&(Ne(s.BLEND),_=!1);return}if(_===!1&&(pe(s.BLEND),_=!0),O!==Hp){if(O!==g||ht!==b){if((p!==ji||v!==ji)&&(s.blendEquation(s.FUNC_ADD),p=ji,v=ji),ht)switch(O){case Bs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Po:s.blendFunc(s.ONE,s.ONE);break;case Cu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Bs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Po:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Cu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}y=null,x=null,C=null,T=null,E.set(0,0,0),R=0,g=O,b=ht}return}be=be||Me,de=de||Y,Ke=Ke||ne,(Me!==p||be!==v)&&(s.blendEquationSeparate(ie[Me],ie[be]),p=Me,v=be),(Y!==y||ne!==x||de!==C||Ke!==T)&&(s.blendFuncSeparate(fe[Y],fe[ne],fe[de],fe[Ke]),y=Y,x=ne,C=de,T=Ke),(xt.equals(E)===!1||Tt!==R)&&(s.blendColor(xt.r,xt.g,xt.b,Tt),E.copy(xt),R=Tt),g=O,b=!1}function Ue(O,Me){O.side===qt?Ne(s.CULL_FACE):pe(s.CULL_FACE);let Y=O.side===jt;Me&&(Y=!Y),oe(Y),O.blending===Bs&&O.transparent===!1?L(ni):L(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const ne=O.stencilWrite;a.setTest(ne),ne&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),He(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?pe(s.SAMPLE_ALPHA_TO_COVERAGE):Ne(s.SAMPLE_ALPHA_TO_COVERAGE)}function oe(O){M!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),M=O)}function Ee(O){O!==Vp?(pe(s.CULL_FACE),O!==I&&(O===Ru?s.cullFace(s.BACK):O===zp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ne(s.CULL_FACE),I=O}function ge(O){O!==V&&(B&&s.lineWidth(O),V=O)}function He(O,Me,Y){O?(pe(s.POLYGON_OFFSET_FILL),(H!==Me||D!==Y)&&(s.polygonOffset(Me,Y),H=Me,D=Y)):Ne(s.POLYGON_OFFSET_FILL)}function Te(O){O?pe(s.SCISSOR_TEST):Ne(s.SCISSOR_TEST)}function P(O){O===void 0&&(O=s.TEXTURE0+z-1),re!==O&&(s.activeTexture(O),re=O)}function A(O,Me,Y){Y===void 0&&(re===null?Y=s.TEXTURE0+z-1:Y=re);let ne=te[Y];ne===void 0&&(ne={type:void 0,texture:void 0},te[Y]=ne),(ne.type!==O||ne.texture!==Me)&&(re!==Y&&(s.activeTexture(Y),re=Y),s.bindTexture(O,Me||Ce[O]),ne.type=O,ne.texture=Me)}function W(){const O=te[re];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function J(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ae(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ie(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Se(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ae(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function q(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function se(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ce(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _e(O){tt.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),tt.copy(O))}function ue(O){Q.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),Q.copy(O))}function Je(O,Me){let Y=c.get(Me);Y===void 0&&(Y=new WeakMap,c.set(Me,Y));let ne=Y.get(O);ne===void 0&&(ne=s.getUniformBlockIndex(Me,O.name),Y.set(O,ne))}function ye(O,Me){const ne=c.get(Me).get(O);l.get(Me)!==ne&&(s.uniformBlockBinding(Me,ne,O.__bindingPointIndex),l.set(Me,ne))}function lt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},re=null,te={},h={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,x=null,v=null,C=null,T=null,E=new Z(0,0,0),R=0,b=!1,M=null,I=null,V=null,H=null,D=null,tt.set(0,0,s.canvas.width,s.canvas.height),Q.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pe,disable:Ne,bindFramebuffer:Xe,drawBuffers:ze,useProgram:ot,setBlending:L,setMaterial:Ue,setFlipSided:oe,setCullFace:Ee,setLineWidth:ge,setPolygonOffset:He,setScissorTest:Te,activeTexture:P,bindTexture:A,unbindTexture:W,compressedTexImage2D:J,compressedTexImage3D:ae,texImage2D:se,texImage3D:ce,updateUBOMapping:Je,uniformBlockBinding:ye,texStorage2D:q,texStorage3D:j,texSubImage2D:ee,texSubImage3D:Ie,compressedTexSubImage2D:Se,compressedTexSubImage3D:Ae,scissor:_e,viewport:ue,reset:lt}}function oS(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function aS(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function lS(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function Ou(s,e,t,n){const i=cS(n);switch(t){case ah:return s*e;case ch:return s*e;case uh:return s*e*2;case Kl:return s*e/i.components*i.byteLength;case Go:return s*e/i.components*i.byteLength;case hh:return s*e*2/i.components*i.byteLength;case Jl:return s*e*2/i.components*i.byteLength;case lh:return s*e*3/i.components*i.byteLength;case Kt:return s*e*4/i.components*i.byteLength;case Ql:return s*e*4/i.components*i.byteLength;case So:case bo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case wo:case To:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case cl:case hl:return Math.max(s,16)*Math.max(e,8)/4;case ll:case ul:return Math.max(s,8)*Math.max(e,8)/2;case dl:case fl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case pl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case _l:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case vl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case xl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case yl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ml:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Sl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case bl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case wl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Tl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Al:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case El:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Rl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ao:case Cl:case Pl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case dh:case Il:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Ll:case Ul:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function cS(s){switch(s){case oi:case sh:return{byteLength:1,components:1};case Ur:case rh:case ii:return{byteLength:2,components:1};case Zl:case $l:return{byteLength:2,components:4};case Ri:case jl:case vn:return{byteLength:4,components:1};case oh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}const uS={contain:oS,cover:aS,fill:lS,getByteLength:Ou};function hS(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new K,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,A){return f?new OffscreenCanvas(P,A):Fo("canvas")}function _(P,A,W){let J=1;const ae=Te(P);if((ae.width>W||ae.height>W)&&(J=W/Math.max(ae.width,ae.height)),J<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ee=Math.floor(J*ae.width),Ie=Math.floor(J*ae.height);h===void 0&&(h=m(ee,Ie));const Se=A?m(ee,Ie):h;return Se.width=ee,Se.height=Ie,Se.getContext("2d").drawImage(P,0,0,ee,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ee+"x"+Ie+")."),Se}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),P;return P}function g(P){return P.generateMipmaps}function p(P){s.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(P,A,W,J,ae=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ee=A;if(A===s.RED&&(W===s.FLOAT&&(ee=s.R32F),W===s.HALF_FLOAT&&(ee=s.R16F),W===s.UNSIGNED_BYTE&&(ee=s.R8)),A===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(ee=s.R8UI),W===s.UNSIGNED_SHORT&&(ee=s.R16UI),W===s.UNSIGNED_INT&&(ee=s.R32UI),W===s.BYTE&&(ee=s.R8I),W===s.SHORT&&(ee=s.R16I),W===s.INT&&(ee=s.R32I)),A===s.RG&&(W===s.FLOAT&&(ee=s.RG32F),W===s.HALF_FLOAT&&(ee=s.RG16F),W===s.UNSIGNED_BYTE&&(ee=s.RG8)),A===s.RG_INTEGER&&(W===s.UNSIGNED_BYTE&&(ee=s.RG8UI),W===s.UNSIGNED_SHORT&&(ee=s.RG16UI),W===s.UNSIGNED_INT&&(ee=s.RG32UI),W===s.BYTE&&(ee=s.RG8I),W===s.SHORT&&(ee=s.RG16I),W===s.INT&&(ee=s.RG32I)),A===s.RGB_INTEGER&&(W===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),W===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),W===s.UNSIGNED_INT&&(ee=s.RGB32UI),W===s.BYTE&&(ee=s.RGB8I),W===s.SHORT&&(ee=s.RGB16I),W===s.INT&&(ee=s.RGB32I)),A===s.RGBA_INTEGER&&(W===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),W===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),W===s.UNSIGNED_INT&&(ee=s.RGBA32UI),W===s.BYTE&&(ee=s.RGBA8I),W===s.SHORT&&(ee=s.RGBA16I),W===s.INT&&(ee=s.RGBA32I)),A===s.RGB&&W===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),A===s.RGBA){const Ie=ae?Wo:at.getTransfer(J);W===s.FLOAT&&(ee=s.RGBA32F),W===s.HALF_FLOAT&&(ee=s.RGBA16F),W===s.UNSIGNED_BYTE&&(ee=Ie===_t?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(P,A){let W;return P?A===null||A===Ri||A===qs?W=s.DEPTH24_STENCIL8:A===vn?W=s.DEPTH32F_STENCIL8:A===Ur&&(W=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Ri||A===qs?W=s.DEPTH_COMPONENT24:A===vn?W=s.DEPTH_COMPONENT32F:A===Ur&&(W=s.DEPTH_COMPONENT16),W}function C(P,A){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ot&&P.minFilter!==Ct?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function T(P){const A=P.target;A.removeEventListener("dispose",T),R(A),A.isVideoTexture&&u.delete(A)}function E(P){const A=P.target;A.removeEventListener("dispose",E),M(A)}function R(P){const A=n.get(P);if(A.__webglInit===void 0)return;const W=P.source,J=d.get(W);if(J){const ae=J[A.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&b(P),Object.keys(J).length===0&&d.delete(W)}n.remove(P)}function b(P){const A=n.get(P);s.deleteTexture(A.__webglTexture);const W=P.source,J=d.get(W);delete J[A.__cacheKey],o.memory.textures--}function M(P){const A=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(A.__webglFramebuffer[J]))for(let ae=0;ae<A.__webglFramebuffer[J].length;ae++)s.deleteFramebuffer(A.__webglFramebuffer[J][ae]);else s.deleteFramebuffer(A.__webglFramebuffer[J]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[J])}else{if(Array.isArray(A.__webglFramebuffer))for(let J=0;J<A.__webglFramebuffer.length;J++)s.deleteFramebuffer(A.__webglFramebuffer[J]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let J=0;J<A.__webglColorRenderbuffer.length;J++)A.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[J]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const W=P.textures;for(let J=0,ae=W.length;J<ae;J++){const ee=n.get(W[J]);ee.__webglTexture&&(s.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(W[J])}n.remove(P)}let I=0;function V(){I=0}function H(){const P=I;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),I+=1,P}function D(P){const A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function z(P,A){const W=n.get(P);if(P.isVideoTexture&&ge(P),P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){const J=P.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(W,P,A);return}}t.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+A)}function B(P,A){const W=n.get(P);if(P.version>0&&W.__version!==P.version){Q(W,P,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+A)}function $(P,A){const W=n.get(P);if(P.version>0&&W.__version!==P.version){Q(W,P,A);return}t.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+A)}function G(P,A){const W=n.get(P);if(P.version>0&&W.__version!==P.version){le(W,P,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+A)}const re={[Qi]:s.REPEAT,[wn]:s.CLAMP_TO_EDGE,[Lr]:s.MIRRORED_REPEAT},te={[Ot]:s.NEAREST,[Yl]:s.NEAREST_MIPMAP_NEAREST,[Is]:s.NEAREST_MIPMAP_LINEAR,[Ct]:s.LINEAR,[Cr]:s.LINEAR_MIPMAP_NEAREST,[Nn]:s.LINEAR_MIPMAP_LINEAR},me={[pm]:s.NEVER,[ym]:s.ALWAYS,[mm]:s.LESS,[vh]:s.LEQUAL,[gm]:s.EQUAL,[xm]:s.GEQUAL,[_m]:s.GREATER,[vm]:s.NOTEQUAL};function Be(P,A){if(A.type===vn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Ct||A.magFilter===Cr||A.magFilter===Is||A.magFilter===Nn||A.minFilter===Ct||A.minFilter===Cr||A.minFilter===Is||A.minFilter===Nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,re[A.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,re[A.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,re[A.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,te[A.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,te[A.minFilter]),A.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,me[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Ot||A.minFilter!==Is&&A.minFilter!==Nn||A.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function tt(P,A){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",T));const J=A.source;let ae=d.get(J);ae===void 0&&(ae={},d.set(J,ae));const ee=D(A);if(ee!==P.__cacheKey){ae[ee]===void 0&&(ae[ee]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ae[ee].usedTimes++;const Ie=ae[P.__cacheKey];Ie!==void 0&&(ae[P.__cacheKey].usedTimes--,Ie.usedTimes===0&&b(A)),P.__cacheKey=ee,P.__webglTexture=ae[ee].texture}return W}function Q(P,A,W){let J=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(J=s.TEXTURE_3D);const ae=tt(P,A),ee=A.source;t.bindTexture(J,P.__webglTexture,s.TEXTURE0+W);const Ie=n.get(ee);if(ee.version!==Ie.__version||ae===!0){t.activeTexture(s.TEXTURE0+W);const Se=at.getPrimaries(at.workingColorSpace),Ae=A.colorSpace===Mi?null:at.getPrimaries(A.colorSpace),q=A.colorSpace===Mi||Se===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let j=_(A.image,!1,i.maxTextureSize);j=He(A,j);const se=r.convert(A.format,A.colorSpace),ce=r.convert(A.type);let _e=x(A.internalFormat,se,ce,A.colorSpace,A.isVideoTexture);Be(J,A);let ue;const Je=A.mipmaps,ye=A.isVideoTexture!==!0,lt=Ie.__version===void 0||ae===!0,O=ee.dataReady,Me=C(A,j);if(A.isDepthTexture)_e=v(A.format===Ys,A.type),lt&&(ye?t.texStorage2D(s.TEXTURE_2D,1,_e,j.width,j.height):t.texImage2D(s.TEXTURE_2D,0,_e,j.width,j.height,0,se,ce,null));else if(A.isDataTexture)if(Je.length>0){ye&&lt&&t.texStorage2D(s.TEXTURE_2D,Me,_e,Je[0].width,Je[0].height);for(let Y=0,ne=Je.length;Y<ne;Y++)ue=Je[Y],ye?O&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,ue.width,ue.height,se,ce,ue.data):t.texImage2D(s.TEXTURE_2D,Y,_e,ue.width,ue.height,0,se,ce,ue.data);A.generateMipmaps=!1}else ye?(lt&&t.texStorage2D(s.TEXTURE_2D,Me,_e,j.width,j.height),O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,j.width,j.height,se,ce,j.data)):t.texImage2D(s.TEXTURE_2D,0,_e,j.width,j.height,0,se,ce,j.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ye&&lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Me,_e,Je[0].width,Je[0].height,j.depth);for(let Y=0,ne=Je.length;Y<ne;Y++)if(ue=Je[Y],A.format!==Kt)if(se!==null)if(ye){if(O)if(A.layerUpdates.size>0){const be=Ou(ue.width,ue.height,A.format,A.type);for(const de of A.layerUpdates){const Ke=ue.data.subarray(de*be/ue.data.BYTES_PER_ELEMENT,(de+1)*be/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,de,ue.width,ue.height,1,se,Ke)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,ue.width,ue.height,j.depth,se,ue.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,_e,ue.width,ue.height,j.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ye?O&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,ue.width,ue.height,j.depth,se,ce,ue.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Y,_e,ue.width,ue.height,j.depth,0,se,ce,ue.data)}else{ye&&lt&&t.texStorage2D(s.TEXTURE_2D,Me,_e,Je[0].width,Je[0].height);for(let Y=0,ne=Je.length;Y<ne;Y++)ue=Je[Y],A.format!==Kt?se!==null?ye?O&&t.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,ue.width,ue.height,se,ue.data):t.compressedTexImage2D(s.TEXTURE_2D,Y,_e,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ye?O&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,ue.width,ue.height,se,ce,ue.data):t.texImage2D(s.TEXTURE_2D,Y,_e,ue.width,ue.height,0,se,ce,ue.data)}else if(A.isDataArrayTexture)if(ye){if(lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Me,_e,j.width,j.height,j.depth),O)if(A.layerUpdates.size>0){const Y=Ou(j.width,j.height,A.format,A.type);for(const ne of A.layerUpdates){const be=j.data.subarray(ne*Y/j.data.BYTES_PER_ELEMENT,(ne+1)*Y/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ne,j.width,j.height,1,se,ce,be)}A.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,se,ce,j.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,_e,j.width,j.height,j.depth,0,se,ce,j.data);else if(A.isData3DTexture)ye?(lt&&t.texStorage3D(s.TEXTURE_3D,Me,_e,j.width,j.height,j.depth),O&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,se,ce,j.data)):t.texImage3D(s.TEXTURE_3D,0,_e,j.width,j.height,j.depth,0,se,ce,j.data);else if(A.isFramebufferTexture){if(lt)if(ye)t.texStorage2D(s.TEXTURE_2D,Me,_e,j.width,j.height);else{let Y=j.width,ne=j.height;for(let be=0;be<Me;be++)t.texImage2D(s.TEXTURE_2D,be,_e,Y,ne,0,se,ce,null),Y>>=1,ne>>=1}}else if(Je.length>0){if(ye&&lt){const Y=Te(Je[0]);t.texStorage2D(s.TEXTURE_2D,Me,_e,Y.width,Y.height)}for(let Y=0,ne=Je.length;Y<ne;Y++)ue=Je[Y],ye?O&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,se,ce,ue):t.texImage2D(s.TEXTURE_2D,Y,_e,se,ce,ue);A.generateMipmaps=!1}else if(ye){if(lt){const Y=Te(j);t.texStorage2D(s.TEXTURE_2D,Me,_e,Y.width,Y.height)}O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,se,ce,j)}else t.texImage2D(s.TEXTURE_2D,0,_e,se,ce,j);g(A)&&p(J),Ie.__version=ee.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function le(P,A,W){if(A.image.length!==6)return;const J=tt(P,A),ae=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+W);const ee=n.get(ae);if(ae.version!==ee.__version||J===!0){t.activeTexture(s.TEXTURE0+W);const Ie=at.getPrimaries(at.workingColorSpace),Se=A.colorSpace===Mi?null:at.getPrimaries(A.colorSpace),Ae=A.colorSpace===Mi||Ie===Se?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const q=A.isCompressedTexture||A.image[0].isCompressedTexture,j=A.image[0]&&A.image[0].isDataTexture,se=[];for(let ne=0;ne<6;ne++)!q&&!j?se[ne]=_(A.image[ne],!0,i.maxCubemapSize):se[ne]=j?A.image[ne].image:A.image[ne],se[ne]=He(A,se[ne]);const ce=se[0],_e=r.convert(A.format,A.colorSpace),ue=r.convert(A.type),Je=x(A.internalFormat,_e,ue,A.colorSpace),ye=A.isVideoTexture!==!0,lt=ee.__version===void 0||J===!0,O=ae.dataReady;let Me=C(A,ce);Be(s.TEXTURE_CUBE_MAP,A);let Y;if(q){ye&&lt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Me,Je,ce.width,ce.height);for(let ne=0;ne<6;ne++){Y=se[ne].mipmaps;for(let be=0;be<Y.length;be++){const de=Y[be];A.format!==Kt?_e!==null?ye?O&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be,0,0,de.width,de.height,_e,de.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be,Je,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ye?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be,0,0,de.width,de.height,_e,ue,de.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be,Je,de.width,de.height,0,_e,ue,de.data)}}}else{if(Y=A.mipmaps,ye&&lt){Y.length>0&&Me++;const ne=Te(se[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Me,Je,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(j){ye?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,se[ne].width,se[ne].height,_e,ue,se[ne].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Je,se[ne].width,se[ne].height,0,_e,ue,se[ne].data);for(let be=0;be<Y.length;be++){const Ke=Y[be].image[ne].image;ye?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be+1,0,0,Ke.width,Ke.height,_e,ue,Ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be+1,Je,Ke.width,Ke.height,0,_e,ue,Ke.data)}}else{ye?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,_e,ue,se[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Je,_e,ue,se[ne]);for(let be=0;be<Y.length;be++){const de=Y[be];ye?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be+1,0,0,_e,ue,de.image[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,be+1,Je,_e,ue,de.image[ne])}}}g(A)&&p(s.TEXTURE_CUBE_MAP),ee.__version=ae.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function Ce(P,A,W,J,ae,ee){const Ie=r.convert(W.format,W.colorSpace),Se=r.convert(W.type),Ae=x(W.internalFormat,Ie,Se,W.colorSpace),q=n.get(A),j=n.get(W);if(j.__renderTarget=A,!q.__hasExternalTextures){const se=Math.max(1,A.width>>ee),ce=Math.max(1,A.height>>ee);ae===s.TEXTURE_3D||ae===s.TEXTURE_2D_ARRAY?t.texImage3D(ae,ee,Ae,se,ce,A.depth,0,Ie,Se,null):t.texImage2D(ae,ee,Ae,se,ce,0,Ie,Se,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),Ee(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,ae,j.__webglTexture,0,oe(A)):(ae===s.TEXTURE_2D||ae>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,ae,j.__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function pe(P,A,W){if(s.bindRenderbuffer(s.RENDERBUFFER,P),A.depthBuffer){const J=A.depthTexture,ae=J&&J.isDepthTexture?J.type:null,ee=v(A.stencilBuffer,ae),Ie=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Se=oe(A);Ee(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Se,ee,A.width,A.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,Se,ee,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,ee,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ie,s.RENDERBUFFER,P)}else{const J=A.textures;for(let ae=0;ae<J.length;ae++){const ee=J[ae],Ie=r.convert(ee.format,ee.colorSpace),Se=r.convert(ee.type),Ae=x(ee.internalFormat,Ie,Se,ee.colorSpace),q=oe(A);W&&Ee(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,q,Ae,A.width,A.height):Ee(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,q,Ae,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Ae,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ne(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(A.depthTexture);J.__renderTarget=A,(!J.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),z(A.depthTexture,0);const ae=J.__webglTexture,ee=oe(A);if(A.depthTexture.format===ks)Ee(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ae,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ae,0);else if(A.depthTexture.format===Ys)Ee(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ae,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Xe(P){const A=n.get(P),W=P.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==P.depthTexture){const J=P.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),J){const ae=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,J.removeEventListener("dispose",ae)};J.addEventListener("dispose",ae),A.__depthDisposeCallback=ae}A.__boundDepthTexture=J}if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ne(A.__webglFramebuffer,P)}else if(W){A.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[J]),A.__webglDepthbuffer[J]===void 0)A.__webglDepthbuffer[J]=s.createRenderbuffer(),pe(A.__webglDepthbuffer[J],P,!1);else{const ae=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=A.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,ae,s.RENDERBUFFER,ee)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),pe(A.__webglDepthbuffer,P,!1);else{const J=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ae),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,ae)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ze(P,A,W){const J=n.get(P);A!==void 0&&Ce(J.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&Xe(P)}function ot(P){const A=P.texture,W=n.get(P),J=n.get(A);P.addEventListener("dispose",E);const ae=P.textures,ee=P.isWebGLCubeRenderTarget===!0,Ie=ae.length>1;if(Ie||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=A.version,o.memory.textures++),ee){W.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(A.mipmaps&&A.mipmaps.length>0){W.__webglFramebuffer[Se]=[];for(let Ae=0;Ae<A.mipmaps.length;Ae++)W.__webglFramebuffer[Se][Ae]=s.createFramebuffer()}else W.__webglFramebuffer[Se]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){W.__webglFramebuffer=[];for(let Se=0;Se<A.mipmaps.length;Se++)W.__webglFramebuffer[Se]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(Ie)for(let Se=0,Ae=ae.length;Se<Ae;Se++){const q=n.get(ae[Se]);q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture(),o.memory.textures++)}if(P.samples>0&&Ee(P)===!1){W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Se=0;Se<ae.length;Se++){const Ae=ae[Se];W.__webglColorRenderbuffer[Se]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[Se]);const q=r.convert(Ae.format,Ae.colorSpace),j=r.convert(Ae.type),se=x(Ae.internalFormat,q,j,Ae.colorSpace,P.isXRRenderTarget===!0),ce=oe(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,se,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,W.__webglColorRenderbuffer[Se])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),pe(W.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),Be(s.TEXTURE_CUBE_MAP,A);for(let Se=0;Se<6;Se++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ae=0;Ae<A.mipmaps.length;Ae++)Ce(W.__webglFramebuffer[Se][Ae],P,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ae);else Ce(W.__webglFramebuffer[Se],P,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);g(A)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let Se=0,Ae=ae.length;Se<Ae;Se++){const q=ae[Se],j=n.get(q);t.bindTexture(s.TEXTURE_2D,j.__webglTexture),Be(s.TEXTURE_2D,q),Ce(W.__webglFramebuffer,P,q,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,0),g(q)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let Se=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Se=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Se,J.__webglTexture),Be(Se,A),A.mipmaps&&A.mipmaps.length>0)for(let Ae=0;Ae<A.mipmaps.length;Ae++)Ce(W.__webglFramebuffer[Ae],P,A,s.COLOR_ATTACHMENT0,Se,Ae);else Ce(W.__webglFramebuffer,P,A,s.COLOR_ATTACHMENT0,Se,0);g(A)&&p(Se),t.unbindTexture()}P.depthBuffer&&Xe(P)}function ie(P){const A=P.textures;for(let W=0,J=A.length;W<J;W++){const ae=A[W];if(g(ae)){const ee=y(P),Ie=n.get(ae).__webglTexture;t.bindTexture(ee,Ie),p(ee),t.unbindTexture()}}}const fe=[],L=[];function Ue(P){if(P.samples>0){if(Ee(P)===!1){const A=P.textures,W=P.width,J=P.height;let ae=s.COLOR_BUFFER_BIT;const ee=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ie=n.get(P),Se=A.length>1;if(Se)for(let Ae=0;Ae<A.length;Ae++)t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ae=0;Ae<A.length;Ae++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ae|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ae|=s.STENCIL_BUFFER_BIT)),Se){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ae]);const q=n.get(A[Ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,q,0)}s.blitFramebuffer(0,0,W,J,0,0,W,J,ae,s.NEAREST),l===!0&&(fe.length=0,L.length=0,fe.push(s.COLOR_ATTACHMENT0+Ae),P.depthBuffer&&P.resolveDepthBuffer===!1&&(fe.push(ee),L.push(ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,L)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Se)for(let Ae=0;Ae<A.length;Ae++){t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ae]);const q=n.get(A[Ae]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,q,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const A=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function oe(P){return Math.min(i.maxSamples,P.samples)}function Ee(P){const A=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ge(P){const A=o.render.frame;u.get(P)!==A&&(u.set(P,A),P.update())}function He(P,A){const W=P.colorSpace,J=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==rn&&W!==Mi&&(at.getTransfer(W)===_t?(J!==Kt||ae!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),A}function Te(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=V,this.setTexture2D=z,this.setTexture2DArray=B,this.setTexture3D=$,this.setTextureCube=G,this.rebindTextures=ze,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Ee}function Nm(s,e){function t(n,i=Mi){let r;const o=at.getTransfer(i);if(n===oi)return s.UNSIGNED_BYTE;if(n===Zl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===$l)return s.UNSIGNED_SHORT_5_5_5_1;if(n===oh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===sh)return s.BYTE;if(n===rh)return s.SHORT;if(n===Ur)return s.UNSIGNED_SHORT;if(n===jl)return s.INT;if(n===Ri)return s.UNSIGNED_INT;if(n===vn)return s.FLOAT;if(n===ii)return s.HALF_FLOAT;if(n===ah)return s.ALPHA;if(n===lh)return s.RGB;if(n===Kt)return s.RGBA;if(n===ch)return s.LUMINANCE;if(n===uh)return s.LUMINANCE_ALPHA;if(n===ks)return s.DEPTH_COMPONENT;if(n===Ys)return s.DEPTH_STENCIL;if(n===Kl)return s.RED;if(n===Go)return s.RED_INTEGER;if(n===hh)return s.RG;if(n===Jl)return s.RG_INTEGER;if(n===Ql)return s.RGBA_INTEGER;if(n===So||n===bo||n===wo||n===To)if(o===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===So)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===So)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===bo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ll||n===cl||n===ul||n===hl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ll)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===dl||n===fl||n===pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===dl||n===fl)return o===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ml||n===gl||n===_l||n===vl||n===xl||n===yl||n===Ml||n===Sl||n===bl||n===wl||n===Tl||n===Al||n===El||n===Rl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ml)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===gl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_l)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===vl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ml)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Tl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Al)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===El)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Rl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ao||n===Cl||n===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ao)return o===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dh||n===Il||n===Ll||n===Ul)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ao)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ll)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ul)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Om extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ge extends rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dS={type:"move"};class jc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dS)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ge;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const fS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pS=`
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

}`;class mS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new At,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ut({vertexShader:fS,fragmentShader:pS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gS extends ci{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const _=new mS,g=t.getContextAttributes();let p=null,y=null;const x=[],v=[],C=new K;let T=null;const E=new Vt;E.viewport=new dt;const R=new Vt;R.viewport=new dt;const b=[E,R],M=new Om;let I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let le=x[Q];return le===void 0&&(le=new jc,x[Q]=le),le.getTargetRaySpace()},this.getControllerGrip=function(Q){let le=x[Q];return le===void 0&&(le=new jc,x[Q]=le),le.getGripSpace()},this.getHand=function(Q){let le=x[Q];return le===void 0&&(le=new jc,x[Q]=le),le.getHandSpace()};function H(Q){const le=v.indexOf(Q.inputSource);if(le===-1)return;const Ce=x[le];Ce!==void 0&&(Ce.update(Q.inputSource,Q.frame,c||o),Ce.dispatchEvent({type:Q.type,data:Q.inputSource}))}function D(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",z);for(let Q=0;Q<x.length;Q++){const le=v[Q];le!==null&&(v[Q]=null,x[Q].disconnect(le))}I=null,V=null,_.reset(),e.setRenderTarget(p),f=null,d=null,h=null,i=null,y=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",D),i.addEventListener("inputsourceschange",z),g.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(C),i.renderState.layers===void 0){const le={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,le),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new sn(f.framebufferWidth,f.framebufferHeight,{format:Kt,type:oi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let le=null,Ce=null,pe=null;g.depth&&(pe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=g.stencil?Ys:ks,Ce=g.stencil?qs:Ri);const Ne={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(Ne),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new sn(d.textureWidth,d.textureHeight,{format:Kt,type:oi,depthTexture:new wh(d.textureWidth,d.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function z(Q){for(let le=0;le<Q.removed.length;le++){const Ce=Q.removed[le],pe=v.indexOf(Ce);pe>=0&&(v[pe]=null,x[pe].disconnect(Ce))}for(let le=0;le<Q.added.length;le++){const Ce=Q.added[le];let pe=v.indexOf(Ce);if(pe===-1){for(let Xe=0;Xe<x.length;Xe++)if(Xe>=v.length){v.push(Ce),pe=Xe;break}else if(v[Xe]===null){v[Xe]=Ce,pe=Xe;break}if(pe===-1)break}const Ne=x[pe];Ne&&Ne.connect(Ce)}}const B=new w,$=new w;function G(Q,le,Ce){B.setFromMatrixPosition(le.matrixWorld),$.setFromMatrixPosition(Ce.matrixWorld);const pe=B.distanceTo($),Ne=le.projectionMatrix.elements,Xe=Ce.projectionMatrix.elements,ze=Ne[14]/(Ne[10]-1),ot=Ne[14]/(Ne[10]+1),ie=(Ne[9]+1)/Ne[5],fe=(Ne[9]-1)/Ne[5],L=(Ne[8]-1)/Ne[0],Ue=(Xe[8]+1)/Xe[0],oe=ze*L,Ee=ze*Ue,ge=pe/(-L+Ue),He=ge*-L;if(le.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(He),Q.translateZ(ge),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ne[10]===-1)Q.projectionMatrix.copy(le.projectionMatrix),Q.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{const Te=ze+ge,P=ot+ge,A=oe-He,W=Ee+(pe-He),J=ie*ot/P*Te,ae=fe*ot/P*Te;Q.projectionMatrix.makePerspective(A,W,J,ae,Te,P),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function re(Q,le){le===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(le.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let le=Q.near,Ce=Q.far;_.texture!==null&&(_.depthNear>0&&(le=_.depthNear),_.depthFar>0&&(Ce=_.depthFar)),M.near=R.near=E.near=le,M.far=R.far=E.far=Ce,(I!==M.near||V!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,V=M.far),E.layers.mask=Q.layers.mask|2,R.layers.mask=Q.layers.mask|4,M.layers.mask=E.layers.mask|R.layers.mask;const pe=Q.parent,Ne=M.cameras;re(M,pe);for(let Xe=0;Xe<Ne.length;Xe++)re(Ne[Xe],pe);Ne.length===2?G(M,E,R):M.projectionMatrix.copy(E.projectionMatrix),te(Q,M,pe)};function te(Q,le,Ce){Ce===null?Q.matrix.copy(le.matrixWorld):(Q.matrix.copy(Ce.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(le.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(le.projectionMatrix),Q.projectionMatrixInverse.copy(le.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Or*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Q){l=Q,d!==null&&(d.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let me=null;function Be(Q,le){if(u=le.getViewerPose(c||o),m=le,u!==null){const Ce=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let pe=!1;Ce.length!==M.cameras.length&&(M.cameras.length=0,pe=!0);for(let Xe=0;Xe<Ce.length;Xe++){const ze=Ce[Xe];let ot=null;if(f!==null)ot=f.getViewport(ze);else{const fe=h.getViewSubImage(d,ze);ot=fe.viewport,Xe===0&&(e.setRenderTargetTextures(y,fe.colorTexture,d.ignoreDepthValues?void 0:fe.depthStencilTexture),e.setRenderTarget(y))}let ie=b[Xe];ie===void 0&&(ie=new Vt,ie.layers.enable(Xe),ie.viewport=new dt,b[Xe]=ie),ie.matrix.fromArray(ze.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(ze.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(ot.x,ot.y,ot.width,ot.height),Xe===0&&(M.matrix.copy(ie.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),pe===!0&&M.cameras.push(ie)}const Ne=i.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){const Xe=h.getDepthInformation(Ce[0]);Xe&&Xe.isValid&&Xe.texture&&_.init(e,Xe,i.renderState)}}for(let Ce=0;Ce<x.length;Ce++){const pe=v[Ce],Ne=x[Ce];pe!==null&&Ne!==void 0&&Ne.update(pe,le,c||o)}me&&me(Q,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),m=null}const tt=new Pm;tt.setAnimationLoop(Be),this.setAnimationLoop=function(Q){me=Q},this.dispose=function(){}}}const ps=new on,_S=new Le;function vS(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Em(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,y,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===jt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===jt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),x=y.envMap,v=y.envMapRotation;x&&(g.envMap.value=x,ps.copy(v),ps.x*=-1,ps.y*=-1,ps.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),g.envMapRotation.value.setFromMatrix4(_S.makeRotationFromEuler(ps)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function xS(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const v=x.program;n.uniformBlockBinding(y,v)}function c(y,x){let v=i[y.id];v===void 0&&(m(y),v=u(y),i[y.id]=v,y.addEventListener("dispose",g));const C=x.program;n.updateUBOMapping(y,C);const T=e.render.frame;r[y.id]!==T&&(d(y),r[y.id]=T)}function u(y){const x=h();y.__bindingPointIndex=x;const v=s.createBuffer(),C=y.__size,T=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,C,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,v),v}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=i[y.id],v=y.uniforms,C=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let T=0,E=v.length;T<E;T++){const R=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,M=R.length;b<M;b++){const I=R[b];if(f(I,T,b,C)===!0){const V=I.__offset,H=Array.isArray(I.value)?I.value:[I.value];let D=0;for(let z=0;z<H.length;z++){const B=H[z],$=_(B);typeof B=="number"||typeof B=="boolean"?(I.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,V+D,I.__data)):B.isMatrix3?(I.__data[0]=B.elements[0],I.__data[1]=B.elements[1],I.__data[2]=B.elements[2],I.__data[3]=0,I.__data[4]=B.elements[3],I.__data[5]=B.elements[4],I.__data[6]=B.elements[5],I.__data[7]=0,I.__data[8]=B.elements[6],I.__data[9]=B.elements[7],I.__data[10]=B.elements[8],I.__data[11]=0):(B.toArray(I.__data,D),D+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,V,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,x,v,C){const T=y.value,E=x+"_"+v;if(C[E]===void 0)return typeof T=="number"||typeof T=="boolean"?C[E]=T:C[E]=T.clone(),!0;{const R=C[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return C[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function m(y){const x=y.uniforms;let v=0;const C=16;for(let E=0,R=x.length;E<R;E++){const b=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,I=b.length;M<I;M++){const V=b[M],H=Array.isArray(V.value)?V.value:[V.value];for(let D=0,z=H.length;D<z;D++){const B=H[D],$=_(B),G=v%C,re=G%$.boundary,te=G+re;v+=re,te!==0&&C-te<$.storage&&(v+=C-te),V.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=v,v+=$.storage}}}const T=v%C;return T>0&&(v+=C-T),y.__size=v,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function g(y){const x=y.target;x.removeEventListener("dispose",g);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class Fm{constructor(e={}){const{canvas:t=bm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Nt,this.toneMapping=wi,this.toneMappingExposure=1;const v=this;let C=!1,T=0,E=0,R=null,b=-1,M=null;const I=new dt,V=new dt;let H=null;const D=new Z(0);let z=0,B=t.width,$=t.height,G=1,re=null,te=null;const me=new dt(0,0,B,$),Be=new dt(0,0,B,$);let tt=!1;const Q=new qo;let le=!1,Ce=!1;const pe=new Le,Ne=new Le,Xe=new w,ze=new dt,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ie=!1;function fe(){return R===null?G:1}let L=n;function Ue(S,U){return t.getContext(S,U)}try{const S={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ki}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",de,!1),L===null){const U="webgl2";if(L=Ue(U,S),L===null)throw Ue(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let oe,Ee,ge,He,Te,P,A,W,J,ae,ee,Ie,Se,Ae,q,j,se,ce,_e,ue,Je,ye,lt,O;function Me(){oe=new Ty(L),oe.init(),ye=new Nm(L,oe),Ee=new xy(L,oe,e,ye),ge=new rS(L,oe),Ee.reverseDepthBuffer&&d&&ge.buffers.depth.setReversed(!0),He=new Ry(L),Te=new qM,P=new hS(L,oe,ge,Te,Ee,ye,He),A=new My(v),W=new wy(v),J=new N_(L),lt=new _y(L,J),ae=new Ay(L,J,He,lt),ee=new Py(L,ae,J,He),_e=new Cy(L,Ee,P),j=new yy(Te),Ie=new XM(v,A,W,oe,Ee,lt,j),Se=new vS(v,Te),Ae=new jM,q=new eS(oe),ce=new gy(v,A,W,ge,ee,f,l),se=new iS(v,ee,Ee),O=new xS(L,He,Ee,ge),ue=new vy(L,oe,He),Je=new Ey(L,oe,He),He.programs=Ie.programs,v.capabilities=Ee,v.extensions=oe,v.properties=Te,v.renderLists=Ae,v.shadowMap=se,v.state=ge,v.info=He}Me();const Y=new gS(v,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=oe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=oe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(S){S!==void 0&&(G=S,this.setSize(B,$,!1))},this.getSize=function(S){return S.set(B,$)},this.setSize=function(S,U,k=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=S,$=U,t.width=Math.floor(S*G),t.height=Math.floor(U*G),k===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(B*G,$*G).floor()},this.setDrawingBufferSize=function(S,U,k){B=S,$=U,G=k,t.width=Math.floor(S*k),t.height=Math.floor(U*k),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(me)},this.setViewport=function(S,U,k,X){S.isVector4?me.set(S.x,S.y,S.z,S.w):me.set(S,U,k,X),ge.viewport(I.copy(me).multiplyScalar(G).round())},this.getScissor=function(S){return S.copy(Be)},this.setScissor=function(S,U,k,X){S.isVector4?Be.set(S.x,S.y,S.z,S.w):Be.set(S,U,k,X),ge.scissor(V.copy(Be).multiplyScalar(G).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(S){ge.setScissorTest(tt=S)},this.setOpaqueSort=function(S){re=S},this.setTransparentSort=function(S){te=S},this.getClearColor=function(S){return S.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(S=!0,U=!0,k=!0){let X=0;if(S){let N=!1;if(R!==null){const he=R.texture.format;N=he===Ql||he===Jl||he===Go}if(N){const he=R.texture.type,we=he===oi||he===Ri||he===Ur||he===qs||he===Zl||he===$l,De=ce.getClearColor(),Oe=ce.getClearAlpha(),Qe=De.r,nt=De.g,Fe=De.b;we?(m[0]=Qe,m[1]=nt,m[2]=Fe,m[3]=Oe,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=Qe,_[1]=nt,_[2]=Fe,_[3]=Oe,L.clearBufferiv(L.COLOR,0,_))}else X|=L.COLOR_BUFFER_BIT}U&&(X|=L.DEPTH_BUFFER_BIT),k&&(X|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Ae.dispose(),q.dispose(),Te.dispose(),A.dispose(),W.dispose(),ee.dispose(),lt.dispose(),O.dispose(),Ie.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Li),Y.removeEventListener("sessionend",Ui),En.stop()};function ne(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=He.autoReset,U=se.enabled,k=se.autoUpdate,X=se.needsUpdate,N=se.type;Me(),He.autoReset=S,se.enabled=U,se.autoUpdate=k,se.needsUpdate=X,se.type=N}function de(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ke(S){const U=S.target;U.removeEventListener("dispose",Ke),xt(U)}function xt(S){Tt(S),Te.remove(S)}function Tt(S){const U=Te.get(S).programs;U!==void 0&&(U.forEach(function(k){Ie.releaseProgram(k)}),S.isShaderMaterial&&Ie.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,k,X,N,he){U===null&&(U=ot);const we=N.isMesh&&N.matrixWorld.determinant()<0,De=Oi(S,U,k,X,N);ge.setMaterial(X,we);let Oe=k.index,Qe=1;if(X.wireframe===!0){if(Oe=ae.getWireframeAttribute(k),Oe===void 0)return;Qe=2}const nt=k.drawRange,Fe=k.attributes.position;let ft=nt.start*Qe,yt=(nt.start+nt.count)*Qe;he!==null&&(ft=Math.max(ft,he.start*Qe),yt=Math.min(yt,(he.start+he.count)*Qe)),Oe!==null?(ft=Math.max(ft,0),yt=Math.min(yt,Oe.count)):Fe!=null&&(ft=Math.max(ft,0),yt=Math.min(yt,Fe.count));const St=yt-ft;if(St<0||St===1/0)return;lt.setup(N,X,De,k,Oe);let pn,mt=ue;if(Oe!==null&&(pn=J.get(Oe),mt=Je,mt.setIndex(pn)),N.isMesh)X.wireframe===!0?(ge.setLineWidth(X.wireframeLinewidth*fe()),mt.setMode(L.LINES)):mt.setMode(L.TRIANGLES);else if(N.isLine){let ke=X.linewidth;ke===void 0&&(ke=1),ge.setLineWidth(ke*fe()),N.isLineSegments?mt.setMode(L.LINES):N.isLineLoop?mt.setMode(L.LINE_LOOP):mt.setMode(L.LINE_STRIP)}else N.isPoints?mt.setMode(L.POINTS):N.isSprite&&mt.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)mt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))mt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const ke=N._multiDrawStarts,hi=N._multiDrawCounts,gt=N._multiDrawCount,kn=Oe?J.get(Oe).bytesPerElement:1,tr=Te.get(X).currentProgram.getUniforms();for(let Mn=0;Mn<gt;Mn++)tr.setValue(L,"_gl_DrawID",Mn),mt.render(ke[Mn]/kn,hi[Mn])}else if(N.isInstancedMesh)mt.renderInstances(ft,St,N.count);else if(k.isInstancedBufferGeometry){const ke=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,hi=Math.min(k.instanceCount,ke);mt.renderInstances(ft,St,hi)}else mt.render(ft,St)};function ht(S,U,k){S.transparent===!0&&S.side===qt&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,Bn(S,U,k),S.side=ri,S.needsUpdate=!0,Bn(S,U,k),S.side=qt):Bn(S,U,k)}this.compile=function(S,U,k=null){k===null&&(k=S),p=q.get(k),p.init(U),x.push(p),k.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),S!==k&&S.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const X=new Set;return S.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const he=N.material;if(he)if(Array.isArray(he))for(let we=0;we<he.length;we++){const De=he[we];ht(De,k,N),X.add(De)}else ht(he,k,N),X.add(he)}),x.pop(),p=null,X},this.compileAsync=function(S,U,k=null){const X=this.compile(S,U,k);return new Promise(N=>{function he(){if(X.forEach(function(we){Te.get(we).currentProgram.isReady()&&X.delete(we)}),X.size===0){N(S);return}setTimeout(he,10)}oe.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let an=null;function yn(S){an&&an(S)}function Li(){En.stop()}function Ui(){En.start()}const En=new Pm;En.setAnimationLoop(yn),typeof self<"u"&&En.setContext(self),this.setAnimationLoop=function(S){an=S,Y.setAnimationLoop(S),S===null?En.stop():En.start()},Y.addEventListener("sessionstart",Li),Y.addEventListener("sessionend",Ui),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,U,R),p=q.get(S,x.length),p.init(U),x.push(p),Ne.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Q.setFromProjectionMatrix(Ne),Ce=this.localClippingEnabled,le=j.init(this.clippingPlanes,Ce),g=Ae.get(S,y.length),g.init(),y.push(g),Y.enabled===!0&&Y.isPresenting===!0){const he=v.xr.getDepthSensingMesh();he!==null&&Zt(he,U,-1/0,v.sortObjects)}Zt(S,U,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(re,te),ie=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,ie&&ce.addToRenderList(g,S),this.info.render.frame++,le===!0&&j.beginShadows();const k=p.state.shadowsArray;se.render(k,S,U),le===!0&&j.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=g.opaque,N=g.transmissive;if(p.setupLights(),U.isArrayCamera){const he=U.cameras;if(N.length>0)for(let we=0,De=he.length;we<De;we++){const Oe=he[we];Ni(X,N,S,Oe)}ie&&ce.render(S);for(let we=0,De=he.length;we<De;we++){const Oe=he[we];Di(g,S,Oe,Oe.viewport)}}else N.length>0&&Ni(X,N,S,U),ie&&ce.render(S),Di(g,S,U);R!==null&&(P.updateMultisampleRenderTarget(R),P.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(v,S,U),lt.resetDefaultState(),b=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],le===!0&&j.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Zt(S,U,k,X){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Q.intersectsSprite(S)){X&&ze.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ne);const we=ee.update(S),De=S.material;De.visible&&g.push(S,we,De,k,ze.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Q.intersectsObject(S))){const we=ee.update(S),De=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ze.copy(S.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),ze.copy(we.boundingSphere.center)),ze.applyMatrix4(S.matrixWorld).applyMatrix4(Ne)),Array.isArray(De)){const Oe=we.groups;for(let Qe=0,nt=Oe.length;Qe<nt;Qe++){const Fe=Oe[Qe],ft=De[Fe.materialIndex];ft&&ft.visible&&g.push(S,we,ft,k,ze.z,Fe)}}else De.visible&&g.push(S,we,De,k,ze.z,null)}}const he=S.children;for(let we=0,De=he.length;we<De;we++)Zt(he[we],U,k,X)}function Di(S,U,k,X){const N=S.opaque,he=S.transmissive,we=S.transparent;p.setupLightsView(k),le===!0&&j.setGlobalState(v.clippingPlanes,k),X&&ge.viewport(I.copy(X)),N.length>0&&Rn(N,U,k),he.length>0&&Rn(he,U,k),we.length>0&&Rn(we,U,k),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Ni(S,U,k,X){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new sn(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?ii:oi,minFilter:Nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const he=p.state.transmissionRenderTarget[X.id],we=X.viewport||I;he.setSize(we.z,we.w);const De=v.getRenderTarget();v.setRenderTarget(he),v.getClearColor(D),z=v.getClearAlpha(),z<1&&v.setClearColor(16777215,.5),v.clear(),ie&&ce.render(k);const Oe=v.toneMapping;v.toneMapping=wi;const Qe=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),le===!0&&j.setGlobalState(v.clippingPlanes,X),Rn(S,k,X),P.updateMultisampleRenderTarget(he),P.updateRenderTargetMipmap(he),oe.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let Fe=0,ft=U.length;Fe<ft;Fe++){const yt=U[Fe],St=yt.object,pn=yt.geometry,mt=yt.material,ke=yt.group;if(mt.side===qt&&St.layers.test(X.layers)){const hi=mt.side;mt.side=jt,mt.needsUpdate=!0,fn(St,k,X,pn,mt,ke),mt.side=hi,mt.needsUpdate=!0,nt=!0}}nt===!0&&(P.updateMultisampleRenderTarget(he),P.updateRenderTargetMipmap(he))}v.setRenderTarget(De),v.setClearColor(D,z),Qe!==void 0&&(X.viewport=Qe),v.toneMapping=Oe}function Rn(S,U,k){const X=U.isScene===!0?U.overrideMaterial:null;for(let N=0,he=S.length;N<he;N++){const we=S[N],De=we.object,Oe=we.geometry,Qe=X===null?we.material:X,nt=we.group;De.layers.test(k.layers)&&fn(De,U,k,Oe,Qe,nt)}}function fn(S,U,k,X,N,he){S.onBeforeRender(v,U,k,X,N,he),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(v,U,k,X,S,he),N.transparent===!0&&N.side===qt&&N.forceSinglePass===!1?(N.side=jt,N.needsUpdate=!0,v.renderBufferDirect(k,U,X,N,S,he),N.side=ri,N.needsUpdate=!0,v.renderBufferDirect(k,U,X,N,S,he),N.side=qt):v.renderBufferDirect(k,U,X,N,S,he),S.onAfterRender(v,U,k,X,N,he)}function Bn(S,U,k){U.isScene!==!0&&(U=ot);const X=Te.get(S),N=p.state.lights,he=p.state.shadowsArray,we=N.state.version,De=Ie.getParameters(S,N.state,he,U,k),Oe=Ie.getProgramCacheKey(De);let Qe=X.programs;X.environment=S.isMeshStandardMaterial?U.environment:null,X.fog=U.fog,X.envMap=(S.isMeshStandardMaterial?W:A).get(S.envMap||X.environment),X.envMapRotation=X.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Qe===void 0&&(S.addEventListener("dispose",Ke),Qe=new Map,X.programs=Qe);let nt=Qe.get(Oe);if(nt!==void 0){if(X.currentProgram===nt&&X.lightsStateVersion===we)return ui(S,De),nt}else De.uniforms=Ie.getUniforms(S),S.onBeforeCompile(De,v),nt=Ie.acquireProgram(De,Oe),Qe.set(Oe,nt),X.uniforms=De.uniforms;const Fe=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Fe.clippingPlanes=j.uniform),ui(S,De),X.needsLights=xe(S),X.lightsStateVersion=we,X.needsLights&&(Fe.ambientLightColor.value=N.state.ambient,Fe.lightProbe.value=N.state.probe,Fe.directionalLights.value=N.state.directional,Fe.directionalLightShadows.value=N.state.directionalShadow,Fe.spotLights.value=N.state.spot,Fe.spotLightShadows.value=N.state.spotShadow,Fe.rectAreaLights.value=N.state.rectArea,Fe.ltc_1.value=N.state.rectAreaLTC1,Fe.ltc_2.value=N.state.rectAreaLTC2,Fe.pointLights.value=N.state.point,Fe.pointLightShadows.value=N.state.pointShadow,Fe.hemisphereLights.value=N.state.hemi,Fe.directionalShadowMap.value=N.state.directionalShadowMap,Fe.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Fe.spotShadowMap.value=N.state.spotShadowMap,Fe.spotLightMatrix.value=N.state.spotLightMatrix,Fe.spotLightMap.value=N.state.spotLightMap,Fe.pointShadowMap.value=N.state.pointShadowMap,Fe.pointShadowMatrix.value=N.state.pointShadowMatrix),X.currentProgram=nt,X.uniformsList=null,nt}function ls(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=$a.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function ui(S,U){const k=Te.get(S);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function Oi(S,U,k,X,N){U.isScene!==!0&&(U=ot),P.resetTextureUnits();const he=U.fog,we=X.isMeshStandardMaterial?U.environment:null,De=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:rn,Oe=(X.isMeshStandardMaterial?W:A).get(X.envMap||we),Qe=X.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,nt=!!k.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Fe=!!k.morphAttributes.position,ft=!!k.morphAttributes.normal,yt=!!k.morphAttributes.color;let St=wi;X.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(St=v.toneMapping);const pn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,mt=pn!==void 0?pn.length:0,ke=Te.get(X),hi=p.state.lights;if(le===!0&&(Ce===!0||S!==M)){const Cn=S===M&&X.id===b;j.setState(X,S,Cn)}let gt=!1;X.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==hi.state.version||ke.outputColorSpace!==De||N.isBatchedMesh&&ke.batching===!1||!N.isBatchedMesh&&ke.batching===!0||N.isBatchedMesh&&ke.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&ke.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&ke.instancing===!1||!N.isInstancedMesh&&ke.instancing===!0||N.isSkinnedMesh&&ke.skinning===!1||!N.isSkinnedMesh&&ke.skinning===!0||N.isInstancedMesh&&ke.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&ke.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&ke.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&ke.instancingMorph===!1&&N.morphTexture!==null||ke.envMap!==Oe||X.fog===!0&&ke.fog!==he||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==j.numPlanes||ke.numIntersection!==j.numIntersection)||ke.vertexAlphas!==Qe||ke.vertexTangents!==nt||ke.morphTargets!==Fe||ke.morphNormals!==ft||ke.morphColors!==yt||ke.toneMapping!==St||ke.morphTargetsCount!==mt)&&(gt=!0):(gt=!0,ke.__version=X.version);let kn=ke.currentProgram;gt===!0&&(kn=Bn(X,U,N));let tr=!1,Mn=!1,Yr=!1;const bt=kn.getUniforms(),jn=ke.uniforms;if(ge.useProgram(kn.program)&&(tr=!0,Mn=!0,Yr=!0),X.id!==b&&(b=X.id,Mn=!0),tr||M!==S){ge.buffers.depth.getReversed()?(pe.copy(S.projectionMatrix),o_(pe),a_(pe),bt.setValue(L,"projectionMatrix",pe)):bt.setValue(L,"projectionMatrix",S.projectionMatrix),bt.setValue(L,"viewMatrix",S.matrixWorldInverse);const Fi=bt.map.cameraPosition;Fi!==void 0&&Fi.setValue(L,Xe.setFromMatrixPosition(S.matrixWorld)),Ee.logarithmicDepthBuffer&&bt.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&bt.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,Mn=!0,Yr=!0)}if(N.isSkinnedMesh){bt.setOptional(L,N,"bindMatrix"),bt.setOptional(L,N,"bindMatrixInverse");const Cn=N.skeleton;Cn&&(Cn.boneTexture===null&&Cn.computeBoneTexture(),bt.setValue(L,"boneTexture",Cn.boneTexture,P))}N.isBatchedMesh&&(bt.setOptional(L,N,"batchingTexture"),bt.setValue(L,"batchingTexture",N._matricesTexture,P),bt.setOptional(L,N,"batchingIdTexture"),bt.setValue(L,"batchingIdTexture",N._indirectTexture,P),bt.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&bt.setValue(L,"batchingColorTexture",N._colorsTexture,P));const jr=k.morphAttributes;if((jr.position!==void 0||jr.normal!==void 0||jr.color!==void 0)&&_e.update(N,k,kn),(Mn||ke.receiveShadow!==N.receiveShadow)&&(ke.receiveShadow=N.receiveShadow,bt.setValue(L,"receiveShadow",N.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(jn.envMap.value=Oe,jn.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&U.environment!==null&&(jn.envMapIntensity.value=U.environmentIntensity),Mn&&(bt.setValue(L,"toneMappingExposure",v.toneMappingExposure),ke.needsLights&&F(jn,Yr),he&&X.fog===!0&&Se.refreshFogUniforms(jn,he),Se.refreshMaterialUniforms(jn,X,G,$,p.state.transmissionRenderTarget[S.id]),$a.upload(L,ls(ke),jn,P)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&($a.upload(L,ls(ke),jn,P),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&bt.setValue(L,"center",N.center),bt.setValue(L,"modelViewMatrix",N.modelViewMatrix),bt.setValue(L,"normalMatrix",N.normalMatrix),bt.setValue(L,"modelMatrix",N.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Cn=X.uniformsGroups;for(let Fi=0,Bi=Cn.length;Fi<Bi;Fi++){const id=Cn[Fi];O.update(id,kn),O.bind(id,kn)}}return kn}function F(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function xe(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,U,k){Te.get(S.texture).__webglTexture=U,Te.get(S.depthTexture).__webglTexture=k;const X=Te.get(S);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=k===void 0,X.__autoAllocateDepthBuffer||oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){const k=Te.get(S);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,k=0){R=S,T=U,E=k;let X=!0,N=null,he=!1,we=!1;if(S){const Oe=Te.get(S);if(Oe.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(L.FRAMEBUFFER,null),X=!1;else if(Oe.__webglFramebuffer===void 0)P.setupRenderTarget(S);else if(Oe.__hasExternalTextures)P.rebindTextures(S,Te.get(S.texture).__webglTexture,Te.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Fe=S.depthTexture;if(Oe.__boundDepthTexture!==Fe){if(Fe!==null&&Te.has(Fe)&&(S.width!==Fe.image.width||S.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(S)}}const Qe=S.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(we=!0);const nt=Te.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(nt[U])?N=nt[U][k]:N=nt[U],he=!0):S.samples>0&&P.useMultisampledRTT(S)===!1?N=Te.get(S).__webglMultisampledFramebuffer:Array.isArray(nt)?N=nt[k]:N=nt,I.copy(S.viewport),V.copy(S.scissor),H=S.scissorTest}else I.copy(me).multiplyScalar(G).floor(),V.copy(Be).multiplyScalar(G).floor(),H=tt;if(ge.bindFramebuffer(L.FRAMEBUFFER,N)&&X&&ge.drawBuffers(S,N),ge.viewport(I),ge.scissor(V),ge.setScissorTest(H),he){const Oe=Te.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Oe.__webglTexture,k)}else if(we){const Oe=Te.get(S.texture),Qe=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Oe.__webglTexture,k||0,Qe)}b=-1},this.readRenderTargetPixels=function(S,U,k,X,N,he,we){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De){ge.bindFramebuffer(L.FRAMEBUFFER,De);try{const Oe=S.texture,Qe=Oe.format,nt=Oe.type;if(!Ee.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ee.textureTypeReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-X&&k>=0&&k<=S.height-N&&L.readPixels(U,k,X,N,ye.convert(Qe),ye.convert(nt),he)}finally{const Oe=R!==null?Te.get(R).__webglFramebuffer:null;ge.bindFramebuffer(L.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(S,U,k,X,N,he,we){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(De=De[we]),De){const Oe=S.texture,Qe=Oe.format,nt=Oe.type;if(!Ee.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ee.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-X&&k>=0&&k<=S.height-N){ge.bindFramebuffer(L.FRAMEBUFFER,De);const Fe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.bufferData(L.PIXEL_PACK_BUFFER,he.byteLength,L.STREAM_READ),L.readPixels(U,k,X,N,ye.convert(Qe),ye.convert(nt),0);const ft=R!==null?Te.get(R).__webglFramebuffer:null;ge.bindFramebuffer(L.FRAMEBUFFER,ft);const yt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await r_(L,yt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,he),L.deleteBuffer(Fe),L.deleteSync(yt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,U=null,k=0){S.isTexture!==!0&&(go("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);const X=Math.pow(2,-k),N=Math.floor(S.image.width*X),he=Math.floor(S.image.height*X),we=U!==null?U.x:0,De=U!==null?U.y:0;P.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,k,0,0,we,De,N,he),ge.unbindTexture()},this.copyTextureToTexture=function(S,U,k=null,X=null,N=0){S.isTexture!==!0&&(go("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,S=arguments[1],U=arguments[2],N=arguments[3]||0,k=null);let he,we,De,Oe,Qe,nt,Fe,ft,yt;const St=S.isCompressedTexture?S.mipmaps[N]:S.image;k!==null?(he=k.max.x-k.min.x,we=k.max.y-k.min.y,De=k.isBox3?k.max.z-k.min.z:1,Oe=k.min.x,Qe=k.min.y,nt=k.isBox3?k.min.z:0):(he=St.width,we=St.height,De=St.depth||1,Oe=0,Qe=0,nt=0),X!==null?(Fe=X.x,ft=X.y,yt=X.z):(Fe=0,ft=0,yt=0);const pn=ye.convert(U.format),mt=ye.convert(U.type);let ke;U.isData3DTexture?(P.setTexture3D(U,0),ke=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(P.setTexture2DArray(U,0),ke=L.TEXTURE_2D_ARRAY):(P.setTexture2D(U,0),ke=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const hi=L.getParameter(L.UNPACK_ROW_LENGTH),gt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),kn=L.getParameter(L.UNPACK_SKIP_PIXELS),tr=L.getParameter(L.UNPACK_SKIP_ROWS),Mn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,St.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,St.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Oe),L.pixelStorei(L.UNPACK_SKIP_ROWS,Qe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,nt);const Yr=S.isDataArrayTexture||S.isData3DTexture,bt=U.isDataArrayTexture||U.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const jn=Te.get(S),jr=Te.get(U),Cn=Te.get(jn.__renderTarget),Fi=Te.get(jr.__renderTarget);ge.bindFramebuffer(L.READ_FRAMEBUFFER,Cn.__webglFramebuffer),ge.bindFramebuffer(L.DRAW_FRAMEBUFFER,Fi.__webglFramebuffer);for(let Bi=0;Bi<De;Bi++)Yr&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Te.get(S).__webglTexture,N,nt+Bi),S.isDepthTexture?(bt&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Te.get(U).__webglTexture,N,yt+Bi),L.blitFramebuffer(Oe,Qe,he,we,Fe,ft,he,we,L.DEPTH_BUFFER_BIT,L.NEAREST)):bt?L.copyTexSubImage3D(ke,N,Fe,ft,yt+Bi,Oe,Qe,he,we):L.copyTexSubImage2D(ke,N,Fe,ft,yt+Bi,Oe,Qe,he,we);ge.bindFramebuffer(L.READ_FRAMEBUFFER,null),ge.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else bt?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(ke,N,Fe,ft,yt,he,we,De,pn,mt,St.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(ke,N,Fe,ft,yt,he,we,De,pn,St.data):L.texSubImage3D(ke,N,Fe,ft,yt,he,we,De,pn,mt,St):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Fe,ft,he,we,pn,mt,St.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Fe,ft,St.width,St.height,pn,St.data):L.texSubImage2D(L.TEXTURE_2D,N,Fe,ft,he,we,pn,mt,St);L.pixelStorei(L.UNPACK_ROW_LENGTH,hi),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,gt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,kn),L.pixelStorei(L.UNPACK_SKIP_ROWS,tr),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Mn),N===0&&U.generateMipmaps&&L.generateMipmap(ke),ge.unbindTexture()},this.copyTextureToTexture3D=function(S,U,k=null,X=null,N=0){return S.isTexture!==!0&&(go("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,X=arguments[1]||null,S=arguments[2],U=arguments[3],N=arguments[4]||0),go('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,U,k,X,N)},this.initRenderTarget=function(S){Te.get(S).__webglFramebuffer===void 0&&P.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?P.setTextureCube(S,0):S.isData3DTexture?P.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?P.setTexture2DArray(S,0):P.setTexture2D(S,0),ge.unbindTexture()},this.resetState=function(){T=0,E=0,R=null,ge.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}class oc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Z(e),this.density=t}clone(){return new oc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Yo{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Z(e),this.near=t,this.far=n}clone(){return new Yo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ah extends rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ks{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=No,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ln=new w;class ai{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ze(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ai(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Eh extends Bt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Z(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let gr;const eo=new w,_r=new w,vr=new w,xr=new K,to=new K,Bm=new Le,va=new w,no=new w,xa=new w,jd=new K,Zc=new K,Zd=new K;class km extends rt{constructor(e=new Eh){if(super(),this.isSprite=!0,this.type="Sprite",gr===void 0){gr=new Ve;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ks(t,5);gr.setIndex([0,1,2,0,2,3]),gr.setAttribute("position",new ai(n,3,0,!1)),gr.setAttribute("uv",new ai(n,2,3,!1))}this.geometry=gr,this.material=e,this.center=new K(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_r.setFromMatrixScale(this.matrixWorld),Bm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),vr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_r.multiplyScalar(-vr.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;ya(va.set(-.5,-.5,0),vr,o,_r,i,r),ya(no.set(.5,-.5,0),vr,o,_r,i,r),ya(xa.set(.5,.5,0),vr,o,_r,i,r),jd.set(0,0),Zc.set(1,0),Zd.set(1,1);let a=e.ray.intersectTriangle(va,no,xa,!1,eo);if(a===null&&(ya(no.set(-.5,.5,0),vr,o,_r,i,r),Zc.set(0,1),a=e.ray.intersectTriangle(va,xa,no,!1,eo),a===null))return;const l=e.ray.origin.distanceTo(eo);l<e.near||l>e.far||t.push({distance:l,point:eo.clone(),uv:_n.getInterpolation(eo,va,no,xa,jd,Zc,Zd,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ya(s,e,t,n,i,r){xr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(to.x=r*xr.x-i*xr.y,to.y=i*xr.x+r*xr.y):to.copy(xr),s.copy(e),s.x+=to.x,s.y+=to.y,s.applyMatrix4(Bm)}const Ma=new w,$d=new w;class Vm extends rt{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Ma.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Ma);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Ma.setFromMatrixPosition(e.matrixWorld),$d.setFromMatrixPosition(this.matrixWorld);const n=Ma.distanceTo($d)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const Kd=new w,Jd=new dt,Qd=new dt,yS=new w,ef=new Le,Sa=new w,$c=new Qt,tf=new Le,Kc=new zr;class ac extends je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Iu,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Sa),this.boundingBox.expandByPoint(Sa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Qt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Sa),this.boundingSphere.expandByPoint(Sa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$c.copy(this.boundingSphere),$c.applyMatrix4(i),e.ray.intersectsSphere($c)!==!1&&(tf.copy(i).invert(),Kc.copy(e.ray).applyMatrix4(tf),!(this.boundingBox!==null&&Kc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Kc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new dt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Iu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Jd.fromBufferAttribute(i.attributes.skinIndex,e),Qd.fromBufferAttribute(i.attributes.skinWeight,e),Kd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Qd.getComponent(r);if(o!==0){const a=Jd.getComponent(r);ef.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(yS.copy(Kd).applyMatrix4(ef),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class lc extends rt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class On extends At{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Ot,u=Ot,h,d){super(null,o,a,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nf=new Le,MS=new Le;class ss{constructor(e=[],t=[]){this.uuid=Tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:MS;nf.multiplyMatrices(a,t[r]),nf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ss(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new On(t,e,e,Kt,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new lc),this.bones.push(o),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class es extends Ze{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const yr=new Le,sf=new Le,ba=[],rf=new Jt,SS=new Le,io=new je,so=new Qt;class ei extends je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new es(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,SS)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yr),rf.copy(e.boundingBox).applyMatrix4(yr),this.boundingBox.union(rf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yr),so.copy(e.boundingSphere).applyMatrix4(yr),this.boundingSphere.union(so)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(io.geometry=this.geometry,io.material=this.material,io.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),so.copy(this.boundingSphere),so.applyMatrix4(n),e.ray.intersectsSphere(so)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,yr),sf.multiplyMatrices(n,yr),io.matrixWorld=sf,io.raycast(e,ba);for(let o=0,a=ba.length;o<a;o++){const l=ba[o];l.instanceId=r,l.object=this,t.push(l)}ba.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new es(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new On(new Float32Array(i*this.count),i,this.count,Kl,vn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Jc(s,e){return s-e}function bS(s,e){return s.z-e.z}function wS(s,e){return e.z-s.z}class TS{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const a=r[this.index];o.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const mn=new Le,AS=new Z(1,1,1),Qc=new qo,wa=new Jt,ms=new Qt,ro=new w,of=new w,ES=new w,eu=new TS,nn=new je,Ta=[];function RS(s,e,t=0){const n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){const i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function gs(s,e){if(s.constructor!==e.constructor){const t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{const t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}class zm extends je{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(e,t,n=t*2,i){super(new Ve,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new On(t,e,e,Kt,vn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new On(t,e,e,Go,Ri);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new On(t,e,e,Kt,vn);n.colorSpace=at.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in e.attributes){const o=e.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,u=new a.constructor(n*l),h=new Ze(u,l,c);t.setAttribute(r,h)}if(e.getIndex()!==null){const r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Ze(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,mn),this.getBoundingBoxAt(r,wa).applyMatrix4(mn),e.union(wa)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,mn),this.getBoundingSphereAt(r,ms).applyMatrix4(mn),e.union(ms)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Jc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const r=this._matricesTexture;mn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;const o=this._colorsTexture;return o&&(AS.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Jc),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._geometryInfo[e];if(i&&o.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const h=t.getAttribute(u),d=n.getAttribute(u);RS(h,d,l);const f=h.itemSize;for(let m=h.count,_=c;m<_;m++){const g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const u=a.indexStart,h=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let d=0;d<o.count;d++)r.setX(u+d,l+o.getX(d));for(let d=o.count,f=h;d<f;d++)r.setX(u+d,l);r.needsUpdate=!0,r.addUpdateRange(u,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?this:(t[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){const l=i[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,f=r.index,m=f.array,_=e-h;for(let g=u;g<u+d;g++)m[g]=m[g]+_;f.array.copyWithin(t,u,u+d),f.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:h}=c,d=r.attributes;for(const f in d){const m=d[f],{array:_,itemSize:g}=m;_.copyWithin(e*g,u*g,(u+h)*g),m.addUpdateRange(e*g,h*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart,this._nextIndexStart=r.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const r=new Jt,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;o&&(u=o.getX(u)),r.expandByPoint(ro.fromBufferAttribute(a,u))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const r=new Qt;this.getBoundingBoxAt(e,wa),wa.getCenter(r.center);const o=n.index,a=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let h=c;o&&(h=o.getX(h)),ro.fromBufferAttribute(a,h),l=Math.max(l,r.center.distanceToSquared(ro))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture,r=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?null:t.fromArray(i,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,r=this._instanceInfo;return e>=r.length||r[e].active===!1?this:(t.toArray(i,e*4),n.needsUpdate=!0,this)}getColorAt(e,t){const n=this._colorsTexture.image.data,i=this._instanceInfo;return e>=i.length||i[e].active===!1?null:t.fromArray(n,e*4)}setVisibleAt(e,t){const n=this._instanceInfo;return e>=n.length||n[e].active===!1||n[e].visible===t?this:(n[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?!1:t[e].visible}setGeometryIdAt(e,t){const n=this._instanceInfo,i=this._geometryInfo;return e>=n.length||n[e].active===!1||t>=i.length||i[t].active===!1?null:(n[e].geometryIndex=t,this)}getGeometryIdAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?-1:t[e].geometryIndex}getGeometryRangeAt(e,t={}){if(e<0||e>=this._geometryCount)return null;const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Jc);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),r=new Int32Array(e);gs(this._multiDrawCounts,i),gs(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;const o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),gs(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),gs(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),gs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Ve,this._initializeGeometry(r));const o=this.geometry;r.index&&gs(r.index.array,o.index.array);for(const a in r.attributes)gs(r.attributes[a].array,o.attributes[a].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;nn.material=this.material,nn.geometry.index=o.index,nn.geometry.attributes=o.attributes,nn.geometry.boundingBox===null&&(nn.geometry.boundingBox=new Jt),nn.geometry.boundingSphere===null&&(nn.geometry.boundingSphere=new Qt);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;const c=n[a].geometryIndex,u=i[c];nn.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(a,nn.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,nn.geometry.boundingBox),this.getBoundingSphereAt(c,nn.geometry.boundingSphere),nn.raycast(e,Ta);for(let h=0,d=Ta.length;h<d;h++){const f=Ta[h];f.object=this,f.batchId=a,t.push(f)}Ta.length=0}nn.material=null,nn.geometry.index=null,nn.geometry.attributes={},nn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data;d&&(mn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Qc.setFromProjectionMatrix(mn,e.coordinateSystem));let _=0;if(this.sortObjects){mn.copy(this.matrixWorld).invert(),ro.setFromMatrixPosition(n.matrixWorld).applyMatrix4(mn),of.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(mn);for(let y=0,x=l.length;y<x;y++)if(l[y].visible&&l[y].active){const v=l[y].geometryIndex;this.getMatrixAt(y,mn),this.getBoundingSphereAt(v,ms).applyMatrix4(mn);let C=!1;if(d&&(C=!Qc.intersectsSphere(ms)),!C){const T=h[v],E=ES.subVectors(ms.center,ro).dot(of);eu.push(T.start,T.count,E,y)}}const g=eu.list,p=this.customSort;p===null?g.sort(r.transparent?wS:bS):p.call(this,g,n);for(let y=0,x=g.length;y<x;y++){const v=g[y];c[_]=v.start*a,u[_]=v.count,m[_]=v.index,_++}eu.reset()}else for(let g=0,p=l.length;g<p;g++)if(l[g].visible&&l[g].active){const y=l[g].geometryIndex;let x=!1;if(d&&(this.getMatrixAt(g,mn),this.getBoundingSphereAt(y,ms).applyMatrix4(mn),x=!Qc.intersectsSphere(ms)),!x){const v=h[y];c[_]=v.start*a,u[_]=v.count,m[_]=g,_++}}f.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}}class kt extends Bt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Z(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Nl=new w,Ol=new w,af=new Le,oo=new zr,Aa=new Qt,tu=new w,lf=new w;class li extends rt{constructor(e=new Ve,t=new kt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Nl.fromBufferAttribute(t,i-1),Ol.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Nl.distanceTo(Ol);e.setAttribute("lineDistance",new Pe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Aa.copy(n.boundingSphere),Aa.applyMatrix4(i),Aa.radius+=r,e.ray.intersectsSphere(Aa)===!1)return;af.copy(i).invert(),oo.copy(e.ray).applyMatrix4(af);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){const p=u.getX(_),y=u.getX(_+1),x=Ea(this,e,oo,l,p,y);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(f),p=Ea(this,e,oo,l,_,g);p&&t.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){const p=Ea(this,e,oo,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=Ea(this,e,oo,l,m-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ea(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(Nl.fromBufferAttribute(o,i),Ol.fromBufferAttribute(o,r),t.distanceSqToSegment(Nl,Ol,tu,lf)>n)return;tu.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(tu);if(!(l<e.near||l>e.far))return{distance:l,point:lf.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const cf=new w,uf=new w;class xn extends li{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)cf.fromBufferAttribute(t,i),uf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+cf.distanceTo(uf);e.setAttribute("lineDistance",new Pe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Rh extends li{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class cc extends Bt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Z(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hf=new Le,Fu=new zr,Ra=new Qt,Ca=new w;class Ch extends rt{constructor(e=new Ve,t=new cc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ra.copy(n.boundingSphere),Ra.applyMatrix4(i),Ra.radius+=r,e.ray.intersectsSphere(Ra)===!1)return;hf.copy(i).invert(),Fu.copy(e.ray).applyMatrix4(hf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,_=f;m<_;m++){const g=c.getX(m);Ca.fromBufferAttribute(h,g),df(Ca,g,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let m=d,_=f;m<_;m++)Ca.fromBufferAttribute(h,m),df(Ca,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function df(s,e,t,n,i,r,o){const a=Fu.distanceSqToPoint(s);if(a<t){const l=new w;Fu.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class CS extends At{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:Ct,this.magFilter=r!==void 0?r:Ct,this.generateMipmaps=!1;const u=this;function h(){u.needsUpdate=!0,e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(h)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class PS extends At{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Ot,this.minFilter=Ot,this.generateMipmaps=!1,this.needsUpdate=!0}}class uc extends At{constructor(e,t,n,i,r,o,a,l,c,u,h,d){super(null,o,a,l,c,u,i,r,h,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class IS extends uc{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=wn,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class LS extends uc{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Ei),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Hm extends At{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const u=n[i],d=n[i+1]-u,f=(o-u)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new K:new w);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new w,i=[],r=[],o=[],a=new w,l=new Le;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new w)}r[0]=new w,o[0]=new w;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Lt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Lt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class hc extends qn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new K){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Gm extends hc{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ph(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Pa=new w,nu=new Ph,iu=new Ph,su=new Ph;class Wm extends qn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%r]:(Pa.subVectors(i[0],i[1]).add(i[0]),c=Pa);const h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(Pa.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Pa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),nu.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,_,g),iu.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,_,g),su.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(nu.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),iu.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),su.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(nu.calc(l),iu.calc(l),su.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ff(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function US(s,e){const t=1-s;return t*t*e}function DS(s,e){return 2*(1-s)*s*e}function NS(s,e){return s*s*e}function Ro(s,e,t,n){return US(s,e)+DS(s,t)+NS(s,n)}function OS(s,e){const t=1-s;return t*t*t*e}function FS(s,e){const t=1-s;return 3*t*t*s*e}function BS(s,e){return 3*(1-s)*s*s*e}function kS(s,e){return s*s*s*e}function Co(s,e,t,n,i){return OS(s,e)+FS(s,t)+BS(s,n)+kS(s,i)}class Ih extends qn{constructor(e=new K,t=new K,n=new K,i=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new K){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Co(e,i.x,r.x,o.x,a.x),Co(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Xm extends qn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Co(e,i.x,r.x,o.x,a.x),Co(e,i.y,r.y,o.y,a.y),Co(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Lh extends qn{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new K){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qm extends qn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uh extends qn{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ro(e,i.x,r.x,o.x),Ro(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dh extends qn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ro(e,i.x,r.x,o.x),Ro(e,i.y,r.y,o.y),Ro(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nh extends qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new K){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(ff(a,l.x,c.x,u.x,h.x),ff(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new K().fromArray(i))}return this}}var Fl=Object.freeze({__proto__:null,ArcCurve:Gm,CatmullRomCurve3:Wm,CubicBezierCurve:Ih,CubicBezierCurve3:Xm,EllipseCurve:hc,LineCurve:Lh,LineCurve3:qm,QuadraticBezierCurve:Uh,QuadraticBezierCurve3:Dh,SplineCurve:Nh});class Ym extends qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Fl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Fl[i.type]().fromJSON(i))}return this}}class Bo extends Ym{constructor(e){super(),this.type="Path",this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Lh(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Uh(this.currentPoint.clone(),new K(e,t),new K(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new Ih(this.currentPoint.clone(),new K(e,t),new K(n,i),new K(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Nh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new hc(e,t,n,i,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class jo extends Ve{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Lt(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,h=new w,d=new K,f=new w,m=new w,_=new w;let g=0,p=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(m)}for(let y=0;y<=t;y++){const x=n+y*u*i,v=Math.sin(x),C=Math.cos(x);for(let T=0;T<=e.length-1;T++){h.x=e[T].x*v,h.y=e[T].y,h.z=e[T].x*C,o.push(h.x,h.y,h.z),d.x=y/t,d.y=T/(e.length-1),a.push(d.x,d.y);const E=l[3*T+0]*v,R=l[3*T+1],b=l[3*T+0]*C;c.push(E,R,b)}}for(let y=0;y<t;y++)for(let x=0;x<e.length-1;x++){const v=x+y*e.length,C=v,T=v+e.length,E=v+e.length+1,R=v+1;r.push(C,T,R),r.push(E,R,T)}this.setIndex(r),this.setAttribute("position",new Pe(o,3)),this.setAttribute("uv",new Pe(a,2)),this.setAttribute("normal",new Pe(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.points,e.segments,e.phiStart,e.phiLength)}}class dc extends jo{constructor(e=1,t=1,n=4,i=8){const r=new Bo;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new dc(e.radius,e.length,e.capSegments,e.radialSegments)}}class Wr extends Ve{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new w,u=new K;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Pe(o,3)),this.setAttribute("normal",new Pe(a,3)),this.setAttribute("uv",new Pe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class hn extends Ve{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Pe(h,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(f,2));function y(){const v=new w,C=new w;let T=0;const E=(t-e)/n;for(let R=0;R<=r;R++){const b=[],M=R/r,I=M*(t-e)+e;for(let V=0;V<=i;V++){const H=V/i,D=H*l+a,z=Math.sin(D),B=Math.cos(D);C.x=I*z,C.y=-M*n+g,C.z=I*B,h.push(C.x,C.y,C.z),v.set(z,E,B).normalize(),d.push(v.x,v.y,v.z),f.push(H,1-M),b.push(m++)}_.push(b)}for(let R=0;R<i;R++)for(let b=0;b<r;b++){const M=_[b][R],I=_[b+1][R],V=_[b+1][R+1],H=_[b][R+1];(e>0||b!==0)&&(u.push(M,I,H),T+=3),(t>0||b!==r-1)&&(u.push(I,V,H),T+=3)}c.addGroup(p,T,0),p+=T}function x(v){const C=m,T=new K,E=new w;let R=0;const b=v===!0?e:t,M=v===!0?1:-1;for(let V=1;V<=i;V++)h.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const I=m;for(let V=0;V<=i;V++){const D=V/i*l+a,z=Math.cos(D),B=Math.sin(D);E.x=b*B,E.y=g*M,E.z=b*z,h.push(E.x,E.y,E.z),d.push(0,M,0),T.x=z*.5+.5,T.y=B*.5*M+.5,f.push(T.x,T.y),m++}for(let V=0;V<i;V++){const H=C+V,D=I+V;v===!0?u.push(D,D+1,H):u.push(D+1,D,H),R+=3}c.addGroup(p,R,v===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ai extends hn{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ai(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rs extends Ve{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),u(),this.setAttribute("position",new Pe(r,3)),this.setAttribute("normal",new Pe(r.slice(),3)),this.setAttribute("uv",new Pe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const x=new w,v=new w,C=new w;for(let T=0;T<t.length;T+=3)f(t[T+0],x),f(t[T+1],v),f(t[T+2],C),l(x,v,C,y)}function l(y,x,v,C){const T=C+1,E=[];for(let R=0;R<=T;R++){E[R]=[];const b=y.clone().lerp(v,R/T),M=x.clone().lerp(v,R/T),I=T-R;for(let V=0;V<=I;V++)V===0&&R===T?E[R][V]=b:E[R][V]=b.clone().lerp(M,V/I)}for(let R=0;R<T;R++)for(let b=0;b<2*(T-R)-1;b++){const M=Math.floor(b/2);b%2===0?(d(E[R][M+1]),d(E[R+1][M]),d(E[R][M])):(d(E[R][M+1]),d(E[R+1][M+1]),d(E[R+1][M]))}}function c(y){const x=new w;for(let v=0;v<r.length;v+=3)x.x=r[v+0],x.y=r[v+1],x.z=r[v+2],x.normalize().multiplyScalar(y),r[v+0]=x.x,r[v+1]=x.y,r[v+2]=x.z}function u(){const y=new w;for(let x=0;x<r.length;x+=3){y.x=r[x+0],y.y=r[x+1],y.z=r[x+2];const v=g(y)/2/Math.PI+.5,C=p(y)/Math.PI+.5;o.push(v,1-C)}m(),h()}function h(){for(let y=0;y<o.length;y+=6){const x=o[y+0],v=o[y+2],C=o[y+4],T=Math.max(x,v,C),E=Math.min(x,v,C);T>.9&&E<.1&&(x<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),C<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,x){const v=y*3;x.x=e[v+0],x.y=e[v+1],x.z=e[v+2]}function m(){const y=new w,x=new w,v=new w,C=new w,T=new K,E=new K,R=new K;for(let b=0,M=0;b<r.length;b+=9,M+=6){y.set(r[b+0],r[b+1],r[b+2]),x.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),T.set(o[M+0],o[M+1]),E.set(o[M+2],o[M+3]),R.set(o[M+4],o[M+5]),C.copy(y).add(x).add(v).divideScalar(3);const I=g(C);_(T,M+0,y,I),_(E,M+2,x,I),_(R,M+4,v,I)}}function _(y,x,v,C){C<0&&y.x===1&&(o[x]=y.x-1),v.x===0&&v.z===0&&(o[x]=C/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rs(e.vertices,e.indices,e.radius,e.details)}}class Zo extends rs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zo(e.radius,e.detail)}}const Ia=new w,La=new w,ru=new w,Ua=new _n;class jm extends Ve{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(Vs*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:_,b:g,c:p}=Ua;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Ua.getNormal(ru),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){const x=(y+1)%3,v=h[y],C=h[x],T=Ua[u[y]],E=Ua[u[x]],R=`${v}_${C}`,b=`${C}_${v}`;b in d&&d[b]?(ru.dot(d[b].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(E.x,E.y,E.z)),d[b]=null):R in d||(d[R]={index0:c[y],index1:c[x],normal:ru.clone()})}}for(const m in d)if(d[m]){const{index0:_,index1:g}=d[m];Ia.fromBufferAttribute(a,_),La.fromBufferAttribute(a,g),f.push(Ia.x,Ia.y,Ia.z),f.push(La.x,La.y,La.z)}this.setAttribute("position",new Pe(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class zs extends Bo{constructor(e){super(e),this.uuid=Tn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Bo().fromJSON(i))}return this}}const VS={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Zm(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,u,h,d,f;if(n&&(r=XS(s,e,r,t)),s.length>80*t){a=c=s[0],l=u=s[1];for(let m=t;m<i;m+=t)h=s[m],d=s[m+1],h<a&&(a=h),d<l&&(l=d),h>c&&(c=h),d>u&&(u=d);f=Math.max(c-a,u-l),f=f!==0?32767/f:0}return ko(r,o,t,a,l,f,0),o}};function Zm(s,e,t,n,i){let r,o;if(i===nb(s,e,t,n)>0)for(r=e;r<t;r+=n)o=pf(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=pf(r,s[r],s[r+1],o);return o&&fc(o,o.next)&&(zo(o),o=o.next),o}function js(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(fc(t,t.next)||Rt(t.prev,t,t.next)===0)){if(zo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ko(s,e,t,n,i,r,o){if(!s)return;!o&&r&&$S(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?HS(s,n,i,r):zS(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),zo(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=GS(js(s),e,t),ko(s,e,t,n,i,r,2)):o===2&&WS(s,e,t,n,i,r):ko(js(s),e,t,n,i,r,1);break}}}function zS(s){const e=s.prev,t=s,n=s.next;if(Rt(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=i<r?i<o?i:o:r<o?r:o,h=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&Rr(i,a,r,l,o,c,m.x,m.y)&&Rt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function HS(s,e,t,n){const i=s.prev,r=s,o=s.next;if(Rt(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,u=i.y,h=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,m=u<h?u<d?u:d:h<d?h:d,_=a>l?a>c?a:c:l>c?l:c,g=u>h?u>d?u:d:h>d?h:d,p=Bu(f,m,e,t,n),y=Bu(_,g,e,t,n);let x=s.prevZ,v=s.nextZ;for(;x&&x.z>=p&&v&&v.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&Rr(a,u,l,h,c,d,x.x,x.y)&&Rt(x.prev,x,x.next)>=0||(x=x.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Rr(a,u,l,h,c,d,v.x,v.y)&&Rt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&Rr(a,u,l,h,c,d,x.x,x.y)&&Rt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Rr(a,u,l,h,c,d,v.x,v.y)&&Rt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function GS(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!fc(i,r)&&$m(i,n,n.next,r)&&Vo(i,r)&&Vo(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),zo(n),zo(n.next),n=s=r),n=n.next}while(n!==s);return js(n)}function WS(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&QS(o,a)){let l=Km(o,a);o=js(o,o.next),l=js(l,l.next),ko(o,e,t,n,i,r,0),ko(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function XS(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Zm(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(JS(c));for(i.sort(qS),r=0;r<i.length;r++)t=YS(i[r],t);return t}function qS(s,e){return s.x-e.x}function YS(s,e){const t=jS(s,e);if(!t)return e;const n=Km(t,s);return js(n,n.next),js(t,t.next)}function jS(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,h;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&Rr(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),Vo(t,s)&&(h<u||h===u&&(t.x>i.x||t.x===i.x&&ZS(i,t)))&&(i=t,u=h)),t=t.next;while(t!==a);return i}function ZS(s,e){return Rt(s.prev,s,e.prev)<0&&Rt(e.next,s,s.next)<0}function $S(s,e,t,n){let i=s;do i.z===0&&(i.z=Bu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,KS(i)}function KS(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function Bu(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function JS(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Rr(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function QS(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!eb(s,e)&&(Vo(s,e)&&Vo(e,s)&&tb(s,e)&&(Rt(s.prev,s,e.prev)||Rt(s,e.prev,e))||fc(s,e)&&Rt(s.prev,s,s.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function fc(s,e){return s.x===e.x&&s.y===e.y}function $m(s,e,t,n){const i=Na(Rt(s,e,t)),r=Na(Rt(s,e,n)),o=Na(Rt(t,n,s)),a=Na(Rt(t,n,e));return!!(i!==r&&o!==a||i===0&&Da(s,t,e)||r===0&&Da(s,n,e)||o===0&&Da(t,s,n)||a===0&&Da(t,e,n))}function Da(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Na(s){return s>0?1:s<0?-1:0}function eb(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&$m(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Vo(s,e){return Rt(s.prev,s,s.next)<0?Rt(s,e,s.next)>=0&&Rt(s,s.prev,e)>=0:Rt(s,e,s.prev)<0||Rt(s,s.next,e)<0}function tb(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Km(s,e){const t=new ku(s.i,s.x,s.y),n=new ku(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function pf(s,e,t,n){const i=new ku(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function zo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ku(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function nb(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class si{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return si.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];mf(e),gf(n,e);let o=e.length;t.forEach(mf);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,gf(n,t[l]);const a=VS.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function mf(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function gf(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class pc extends Ve{constructor(e=new zs([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Pe(i,3)),this.setAttribute("uv",new Pe(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:ib;let x,v=!1,C,T,E,R;p&&(x=p.getSpacedPoints(u),v=!0,d=!1,C=p.computeFrenetFrames(u,!1),T=new w,E=new w,R=new w),d||(g=0,f=0,m=0,_=0);const b=a.extractPoints(c);let M=b.shape;const I=b.holes;if(!si.isClockWise(M)){M=M.reverse();for(let ie=0,fe=I.length;ie<fe;ie++){const L=I[ie];si.isClockWise(L)&&(I[ie]=L.reverse())}}const H=si.triangulateShape(M,I),D=M;for(let ie=0,fe=I.length;ie<fe;ie++){const L=I[ie];M=M.concat(L)}function z(ie,fe,L){return fe||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(fe,L)}const B=M.length,$=H.length;function G(ie,fe,L){let Ue,oe,Ee;const ge=ie.x-fe.x,He=ie.y-fe.y,Te=L.x-ie.x,P=L.y-ie.y,A=ge*ge+He*He,W=ge*P-He*Te;if(Math.abs(W)>Number.EPSILON){const J=Math.sqrt(A),ae=Math.sqrt(Te*Te+P*P),ee=fe.x-He/J,Ie=fe.y+ge/J,Se=L.x-P/ae,Ae=L.y+Te/ae,q=((Se-ee)*P-(Ae-Ie)*Te)/(ge*P-He*Te);Ue=ee+ge*q-ie.x,oe=Ie+He*q-ie.y;const j=Ue*Ue+oe*oe;if(j<=2)return new K(Ue,oe);Ee=Math.sqrt(j/2)}else{let J=!1;ge>Number.EPSILON?Te>Number.EPSILON&&(J=!0):ge<-Number.EPSILON?Te<-Number.EPSILON&&(J=!0):Math.sign(He)===Math.sign(P)&&(J=!0),J?(Ue=-He,oe=ge,Ee=Math.sqrt(A)):(Ue=ge,oe=He,Ee=Math.sqrt(A/2))}return new K(Ue/Ee,oe/Ee)}const re=[];for(let ie=0,fe=D.length,L=fe-1,Ue=ie+1;ie<fe;ie++,L++,Ue++)L===fe&&(L=0),Ue===fe&&(Ue=0),re[ie]=G(D[ie],D[L],D[Ue]);const te=[];let me,Be=re.concat();for(let ie=0,fe=I.length;ie<fe;ie++){const L=I[ie];me=[];for(let Ue=0,oe=L.length,Ee=oe-1,ge=Ue+1;Ue<oe;Ue++,Ee++,ge++)Ee===oe&&(Ee=0),ge===oe&&(ge=0),me[Ue]=G(L[Ue],L[Ee],L[ge]);te.push(me),Be=Be.concat(me)}for(let ie=0;ie<g;ie++){const fe=ie/g,L=f*Math.cos(fe*Math.PI/2),Ue=m*Math.sin(fe*Math.PI/2)+_;for(let oe=0,Ee=D.length;oe<Ee;oe++){const ge=z(D[oe],re[oe],Ue);pe(ge.x,ge.y,-L)}for(let oe=0,Ee=I.length;oe<Ee;oe++){const ge=I[oe];me=te[oe];for(let He=0,Te=ge.length;He<Te;He++){const P=z(ge[He],me[He],Ue);pe(P.x,P.y,-L)}}}const tt=m+_;for(let ie=0;ie<B;ie++){const fe=d?z(M[ie],Be[ie],tt):M[ie];v?(E.copy(C.normals[0]).multiplyScalar(fe.x),T.copy(C.binormals[0]).multiplyScalar(fe.y),R.copy(x[0]).add(E).add(T),pe(R.x,R.y,R.z)):pe(fe.x,fe.y,0)}for(let ie=1;ie<=u;ie++)for(let fe=0;fe<B;fe++){const L=d?z(M[fe],Be[fe],tt):M[fe];v?(E.copy(C.normals[ie]).multiplyScalar(L.x),T.copy(C.binormals[ie]).multiplyScalar(L.y),R.copy(x[ie]).add(E).add(T),pe(R.x,R.y,R.z)):pe(L.x,L.y,h/u*ie)}for(let ie=g-1;ie>=0;ie--){const fe=ie/g,L=f*Math.cos(fe*Math.PI/2),Ue=m*Math.sin(fe*Math.PI/2)+_;for(let oe=0,Ee=D.length;oe<Ee;oe++){const ge=z(D[oe],re[oe],Ue);pe(ge.x,ge.y,h+L)}for(let oe=0,Ee=I.length;oe<Ee;oe++){const ge=I[oe];me=te[oe];for(let He=0,Te=ge.length;He<Te;He++){const P=z(ge[He],me[He],Ue);v?pe(P.x,P.y+x[u-1].y,x[u-1].x+L):pe(P.x,P.y,h+L)}}}Q(),le();function Q(){const ie=i.length/3;if(d){let fe=0,L=B*fe;for(let Ue=0;Ue<$;Ue++){const oe=H[Ue];Ne(oe[2]+L,oe[1]+L,oe[0]+L)}fe=u+g*2,L=B*fe;for(let Ue=0;Ue<$;Ue++){const oe=H[Ue];Ne(oe[0]+L,oe[1]+L,oe[2]+L)}}else{for(let fe=0;fe<$;fe++){const L=H[fe];Ne(L[2],L[1],L[0])}for(let fe=0;fe<$;fe++){const L=H[fe];Ne(L[0]+B*u,L[1]+B*u,L[2]+B*u)}}n.addGroup(ie,i.length/3-ie,0)}function le(){const ie=i.length/3;let fe=0;Ce(D,fe),fe+=D.length;for(let L=0,Ue=I.length;L<Ue;L++){const oe=I[L];Ce(oe,fe),fe+=oe.length}n.addGroup(ie,i.length/3-ie,1)}function Ce(ie,fe){let L=ie.length;for(;--L>=0;){const Ue=L;let oe=L-1;oe<0&&(oe=ie.length-1);for(let Ee=0,ge=u+g*2;Ee<ge;Ee++){const He=B*Ee,Te=B*(Ee+1),P=fe+Ue+He,A=fe+oe+He,W=fe+oe+Te,J=fe+Ue+Te;Xe(P,A,W,J)}}}function pe(ie,fe,L){l.push(ie),l.push(fe),l.push(L)}function Ne(ie,fe,L){ze(ie),ze(fe),ze(L);const Ue=i.length/3,oe=y.generateTopUV(n,i,Ue-3,Ue-2,Ue-1);ot(oe[0]),ot(oe[1]),ot(oe[2])}function Xe(ie,fe,L,Ue){ze(ie),ze(fe),ze(Ue),ze(fe),ze(L),ze(Ue);const oe=i.length/3,Ee=y.generateSideWallUV(n,i,oe-6,oe-3,oe-2,oe-1);ot(Ee[0]),ot(Ee[1]),ot(Ee[3]),ot(Ee[1]),ot(Ee[2]),ot(Ee[3])}function ze(ie){i.push(l[ie*3+0]),i.push(l[ie*3+1]),i.push(l[ie*3+2])}function ot(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return sb(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Fl[i.type]().fromJSON(i)),new pc(n,e.options)}}const ib={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new K(r,o),new K(a,l),new K(c,u)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],_=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new K(o,1-l),new K(c,1-h),new K(d,1-m),new K(_,1-p)]:[new K(a,1-l),new K(u,1-h),new K(f,1-m),new K(g,1-p)]}};function sb(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class os extends rs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new os(e.radius,e.detail)}}class Pi extends rs{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Pi(e.radius,e.detail)}}class $o extends Ve{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],u=[];let h=e;const d=(t-e)/i,f=new w,m=new K;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const p=r+g/n*o;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,x=y,v=y+n+1,C=y+n+2,T=y+1;a.push(x,v,T),a.push(v,C,T)}}this.setIndex(a),this.setAttribute("position",new Pe(l,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $o(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class mc extends Ve{constructor(e=new zs([new K(0,.5),new K(-.5,-.5),new K(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Pe(i,3)),this.setAttribute("normal",new Pe(r,3)),this.setAttribute("uv",new Pe(o,2));function c(u){const h=i.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;si.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];si.isClockWise(y)===!0&&(m[g]=y.reverse())}const _=si.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){const y=_[g],x=y[0]+h,v=y[1]+h,C=y[2]+h;n.push(x,v,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return rb(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const o=t[e.shapes[i]];n.push(o)}return new mc(n,e.curveSegments)}}function rb(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class An extends Ve{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new w,d=new w,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],x=p/n;let v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let C=0;C<=t;C++){const T=C/t;h.x=-e*Math.cos(i+T*r)*Math.sin(o+x*a),h.y=e*Math.cos(o+x*a),h.z=e*Math.sin(i+T*r)*Math.sin(o+x*a),m.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(T+v,1-x),y.push(c++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const x=u[p][y+1],v=u[p][y],C=u[p+1][y],T=u[p+1][y+1];(p!==0||o>0)&&f.push(x,v,T),(p!==n-1||l<Math.PI)&&f.push(v,C,T)}this.setIndex(f),this.setAttribute("position",new Pe(m,3)),this.setAttribute("normal",new Pe(_,3)),this.setAttribute("uv",new Pe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class gc extends rs{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new gc(e.radius,e.detail)}}class Js extends Ve{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],u=new w,h=new w,d=new w;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const _=m/i*r,g=f/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const _=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,y=(i+1)*f+m;o.push(_,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new Pe(a,3)),this.setAttribute("normal",new Pe(l,3)),this.setAttribute("uv",new Pe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class _c extends Ve{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],u=[],h=new w,d=new w,f=new w,m=new w,_=new w,g=new w,p=new w;for(let x=0;x<=n;++x){const v=x/n*r*Math.PI*2;y(v,r,o,e,f),y(v+.01,r,o,e,m),g.subVectors(m,f),p.addVectors(m,f),_.crossVectors(g,p),p.crossVectors(_,g),_.normalize(),p.normalize();for(let C=0;C<=i;++C){const T=C/i*Math.PI*2,E=-t*Math.cos(T),R=t*Math.sin(T);h.x=f.x+(E*p.x+R*_.x),h.y=f.y+(E*p.y+R*_.y),h.z=f.z+(E*p.z+R*_.z),l.push(h.x,h.y,h.z),d.subVectors(h,f).normalize(),c.push(d.x,d.y,d.z),u.push(x/n),u.push(C/i)}}for(let x=1;x<=n;x++)for(let v=1;v<=i;v++){const C=(i+1)*(x-1)+(v-1),T=(i+1)*x+(v-1),E=(i+1)*x+v,R=(i+1)*(x-1)+v;a.push(C,T,R),a.push(T,E,R)}this.setIndex(a),this.setAttribute("position",new Pe(l,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(u,2));function y(x,v,C,T,E){const R=Math.cos(x),b=Math.sin(x),M=C/v*x,I=Math.cos(M);E.x=T*(2+I)*.5*R,E.y=T*(2+I)*b*.5,E.z=T*Math.sin(M)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _c(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class vc extends Ve{constructor(e=new Dh(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new w,l=new w,c=new K;let u=new w;const h=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new Pe(h,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(f,2));function _(){for(let x=0;x<t;x++)g(x);g(r===!1?t:0),y(),p()}function g(x){u=e.getPointAt(x/t,u);const v=o.normals[x],C=o.binormals[x];for(let T=0;T<=i;T++){const E=T/i*Math.PI*2,R=Math.sin(E),b=-Math.cos(E);l.x=b*v.x+R*C.x,l.y=b*v.y+R*C.y,l.z=b*v.z+R*C.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=t;x++)for(let v=1;v<=i;v++){const C=(i+1)*(x-1)+(v-1),T=(i+1)*x+(v-1),E=(i+1)*x+v,R=(i+1)*(x-1)+v;m.push(C,T,R),m.push(T,E,R)}}function y(){for(let x=0;x<=t;x++)for(let v=0;v<=i;v++)c.x=x/t,c.y=v/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new vc(new Fl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Jm extends Ve{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new w,r=new w;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],d=h.start,f=h.count;for(let m=d,_=d+f;m<_;m+=3)for(let g=0;g<3;g++){const p=a.getX(m+g),y=a.getX(m+(g+1)%3);i.fromBufferAttribute(o,p),r.fromBufferAttribute(o,y),_f(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,h=3*a+(c+1)%3;i.fromBufferAttribute(o,u),r.fromBufferAttribute(o,h),_f(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Pe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function _f(s,e,t){const n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var vf=Object.freeze({__proto__:null,BoxGeometry:Yt,CapsuleGeometry:dc,CircleGeometry:Wr,ConeGeometry:Ai,CylinderGeometry:hn,DodecahedronGeometry:Zo,EdgesGeometry:jm,ExtrudeGeometry:pc,IcosahedronGeometry:os,LatheGeometry:jo,OctahedronGeometry:Pi,PlaneGeometry:is,PolyhedronGeometry:rs,RingGeometry:$o,ShapeGeometry:mc,SphereGeometry:An,TetrahedronGeometry:gc,TorusGeometry:Js,TorusKnotGeometry:_c,TubeGeometry:vc,WireframeGeometry:Jm});class Qm extends Bt{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new Z(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Oh extends Ut{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class Ko extends Bt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Z(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fn extends Ko{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new K(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Z(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Z(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Z(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class eg extends Bt{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new Z(16777215),this.specular=new Z(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fh extends Bt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Z(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class tg extends Bt{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Bh extends Bt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ng extends Bt{static get type(){return"MeshMatcapMaterial"}constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new Z(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ii,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ig extends kt{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Ns(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function sg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function rg(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Vu(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function kh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function ob(s,e,t,n,i=30){const r=s.clone();r.name=e;const o=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],u=c.getValueSize(),h=[],d=[];for(let f=0;f<c.times.length;++f){const m=c.times[f]*i;if(!(m<t||m>=n)){h.push(c.times[f]);for(let _=0;_<u;++_)d.push(c.values[f*u+_])}}h.length!==0&&(c.times=Ns(h,c.times.constructor),c.values=Ns(d,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function ab(s,e=0,t=s,n=30){n<=0&&(n=30);const i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){const a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(p){return p.name===a.name&&p.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const m=a.times.length-1;let _;if(r<=a.times[0]){const p=u,y=h-u;_=a.values.slice(p,y)}else if(r>=a.times[m]){const p=m*h+u,y=p+h-u;_=a.values.slice(p,y)}else{const p=a.createInterpolant(),y=u,x=h-u;p.evaluate(r),_=p.resultBuffer.slice(y,x)}l==="quaternion"&&new $e().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let p=0;p<g;++p){const y=p*f+d;if(l==="quaternion")$e.multiplyQuaternionsFlat(c.values,y,_,0,c.values,y);else{const x=f-d*2;for(let v=0;v<x;++v)c.values[y+v]-=_[v]}}}return s.blendMode=mh,s}const lb={convertArray:Ns,isTypedArray:sg,getKeyframeOrder:rg,sortedArray:Vu,flattenJSON:kh,subclip:ob,makeClipAdditive:ab};class Xr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class og extends Xr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ls,endingEnd:Ls}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Us:r=e,a=2*t-n;break;case Do:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Us:o=e,l=2*n-t;break;case Do:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,x=(-1-f)*g+(1.5+f)*_+.5*m,v=f*g-f*_;for(let C=0;C!==a;++C)r[C]=p*o[u+C]+y*o[c+C]+x*o[l+C]+v*o[h+C];return r}}class Vh extends Xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*h+o[l+d]*u;return r}}class ag extends Xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Yn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ns(t,this.TimeBufferType),this.values=Ns(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ns(e.times,Array),values:Ns(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ag(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Vh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new og(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Dr:t=this.InterpolantFactoryMethodDiscrete;break;case Nr:t=this.InterpolantFactoryMethodLinear;break;case Za:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Dr;case this.InterpolantFactoryMethodLinear:return Nr;case this.InterpolantFactoryMethodSmooth:return Za}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&sg(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Za,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const _=t[h+m];if(_!==t[d+m]||_!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=Nr;class Qs extends Yn{constructor(e,t,n){super(e,t,n)}}Qs.prototype.ValueTypeName="bool";Qs.prototype.ValueBufferType=Array;Qs.prototype.DefaultInterpolation=Dr;Qs.prototype.InterpolantFactoryMethodLinear=void 0;Qs.prototype.InterpolantFactoryMethodSmooth=void 0;class zh extends Yn{}zh.prototype.ValueTypeName="color";class Zs extends Yn{}Zs.prototype.ValueTypeName="number";class lg extends Xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)$e.slerpFlat(r,0,o,c-a,o,c,l);return r}}class ts extends Yn{InterpolantFactoryMethodLinear(e){return new lg(this.times,this.values,this.getValueSize(),e)}}ts.prototype.ValueTypeName="quaternion";ts.prototype.InterpolantFactoryMethodSmooth=void 0;class er extends Yn{constructor(e,t,n){super(e,t,n)}}er.prototype.ValueTypeName="string";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=Dr;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;class ns extends Yn{}ns.prototype.ValueTypeName="vector";class $s{constructor(e="",t=-1,n=[],i=ec){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Tn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ub(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Yn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=rg(l);l=Vu(l,1,u),c=Vu(c,1,u),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Zs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,_){if(f.length!==0){const g=[],p=[];kh(f,g,p,m),g.length!==0&&_.push(new h(d,g,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const x=d[m];g.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new Zs(".morphTargetInfluence["+_+"]",g,p))}l=f.length*o}else{const f=".bones["+t[h].name+"]";n(ns,f+".position",d,"pos",i),n(ts,f+".quaternion",d,"rot",i),n(ns,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function cb(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Zs;case"vector":case"vector2":case"vector3":case"vector4":return ns;case"color":return zh;case"quaternion":return ts;case"bool":case"boolean":return Qs;case"string":return er}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function ub(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cb(s.type);if(s.times===void 0){const t=[],n=[];kh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const bi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Hh{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null}}}const cg=new Hh;class dn{constructor(e){this.manager=e!==void 0?e:cg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}dn.DEFAULT_MATERIAL_NAME="__DEFAULT";const vi={};class hb extends Error{constructor(e,t){super(e),this.response=t}}class Xn extends dn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=bi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:i});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=vi[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){h.read().then(({done:x,value:v})=>{if(x)p.close();else{_+=v.byteLength;const C=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let T=0,E=u.length;T<E;T++){const R=u[T];R.onProgress&&R.onProgress(C)}p.enqueue(v),y()}},x=>{p.error(x)})}}});return new Response(g)}else throw new hb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{bi.add(e,c);const u=vi[e];delete vi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=vi[e];if(u===void 0)throw this.manager.itemError(e),c;delete vi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class db extends dn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Xn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=$s.parse(e[n]);t.push(i)}return t}}class fb extends dn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=[],a=new uc,l=new Xn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function u(h){l.load(e[h],function(d){const f=r.parse(d,!0);o[h]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=Ct),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let h=0,d=e.length;h<d;++h)u(h);else l.load(e,function(h){const d=r.parse(h,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){o[m]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)o[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+_]),o[m].format=d.format,o[m].width=d.width,o[m].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=Ct),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}}class Br extends dn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=bi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Fo("img");function l(){u(),bi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class pb extends dn{constructor(e){super(e)}load(e,t,n,i){const r=new Xo;r.colorSpace=Nt;const o=new Br(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(u){r.images[c]=u,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class mb extends dn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new On,a=new Xn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(u){if(i!==void 0)i(u);else{console.error(u);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:wn,o.wrapT=c.wrapT!==void 0?c.wrapT:wn,o.magFilter=c.magFilter!==void 0?c.magFilter:Ct,o.minFilter=c.minFilter!==void 0?c.minFilter:Ct,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Nn),c.mipmapCount===1&&(o.minFilter=Ct),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class ug extends dn{constructor(e){super(e)}load(e,t,n,i){const r=new At,o=new Br(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class as extends rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Z(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Gh extends as{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Z(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ou=new Le,xf=new w,yf=new w;class Wh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qo,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xf.setFromMatrixPosition(e.matrixWorld),t.position.copy(xf),yf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yf),t.updateMatrixWorld(),ou.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ou),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ou)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class gb extends Wh{constructor(){super(new Vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Or*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Xh extends as{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new gb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Mf=new Le,ao=new w,au=new w;class _b extends Wh{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new K(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ao.setFromMatrixPosition(e.matrixWorld),n.position.copy(ao),au.copy(n.position),au.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(au),n.updateMatrixWorld(),i.makeTranslation(-ao.x,-ao.y,-ao.z),Mf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mf)}}class Hs extends as{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new _b}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class vb extends Wh{constructor(){super(new Hr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xc extends as{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.shadow=new vb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class hg extends as{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class dg extends as{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class fg{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new w)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}class pg extends as{constructor(e=new fg,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class yc extends dn{constructor(e){super(e),this.textures={}}load(e,t,n,i){const r=this,o=new Xn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(r){return t[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),t[r]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Z().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const r in e.uniforms){const o=e.uniforms[r];switch(i.uniforms[r]={},o.type){case"t":i.uniforms[r].value=n(o.value);break;case"c":i.uniforms[r].value=new Z().setHex(o.value);break;case"v2":i.uniforms[r].value=new K().fromArray(o.value);break;case"v3":i.uniforms[r].value=new w().fromArray(o.value);break;case"v4":i.uniforms[r].value=new dt().fromArray(o.value);break;case"m3":i.uniforms[r].value=new We().fromArray(o.value);break;case"m4":i.uniforms[r].value=new Le().fromArray(o.value);break;default:i.uniforms[r].value=o.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)i.extensions[r]=e.extensions[r];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new K().fromArray(r)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return yc.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Qm,SpriteMaterial:Eh,RawShaderMaterial:Oh,ShaderMaterial:Ut,PointsMaterial:cc,MeshPhysicalMaterial:Fn,MeshStandardMaterial:Ko,MeshPhongMaterial:eg,MeshToonMaterial:Fh,MeshNormalMaterial:tg,MeshLambertMaterial:Bh,MeshDepthMaterial:rc,MeshDistanceMaterial:Th,MeshBasicMaterial:Mt,MeshMatcapMaterial:ng,LineDashedMaterial:ig,LineBasicMaterial:kt,Material:Bt};return new t[e]}}class $i{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class mg extends Ve{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class gg extends dn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Xn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,m){if(t[m]!==void 0)return t[m];const g=f.interleavedBuffers[m],p=r(f,g.buffer),y=Ar(g.type,p),x=new Ks(y,g.stride);return x.uuid=g.uuid,t[m]=x,x}function r(f,m){if(n[m]!==void 0)return n[m];const g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}const o=e.isInstancedBufferGeometry?new mg:new Ve,a=e.data.index;if(a!==void 0){const f=Ar(a.type,a.array);o.setIndex(new Ze(f,1))}const l=e.data.attributes;for(const f in l){const m=l[f];let _;if(m.isInterleavedBufferAttribute){const g=i(e.data,m.data);_=new ai(g,m.itemSize,m.offset,m.normalized)}else{const g=Ar(m.type,m.array),p=m.isInstancedBufferAttribute?es:Ze;_=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(_.name=m.name),m.usage!==void 0&&_.setUsage(m.usage),o.setAttribute(f,_)}const c=e.data.morphAttributes;if(c)for(const f in c){const m=c[f],_=[];for(let g=0,p=m.length;g<p;g++){const y=m[g];let x;if(y.isInterleavedBufferAttribute){const v=i(e.data,y.data);x=new ai(v,y.itemSize,y.offset,y.normalized)}else{const v=Ar(y.type,y.array);x=new Ze(v,y.itemSize,y.normalized)}y.name!==void 0&&(x.name=y.name),_.push(x)}o.morphAttributes[f]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const h=e.data.groups||e.data.drawcalls||e.data.offsets;if(h!==void 0)for(let f=0,m=h.length;f!==m;++f){const _=h[f];o.addGroup(_.start,_.count,_.materialIndex)}const d=e.data.boundingSphere;if(d!==void 0){const f=new w;d.center!==void 0&&f.fromArray(d.center),o.boundingSphere=new Qt(f,d.radius)}return e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}class xb extends dn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=this.path===""?$i.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const a=new Xn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(h){i!==void 0&&i(h),console.error("THREE:ObjectLoader: Can't parse "+e+".",h.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?$i.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const r=new Xn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);const o=await r.loadAsync(e,t),a=JSON.parse(o),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let h=!1;for(const d in o)if(o[d].data instanceof HTMLImageElement){h=!0;break}h===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,i,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const r=new zs().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=new ss().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new gg;for(let r=0,o=e.length;r<o;r++){let a;const l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in vf?a=vf[l.type].fromJSON(l,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const r=new yc;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){const l=e[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],r=$s.parse(i);t[r.uuid]=r}return t}parseImages(e,t){const n=this,i={};let r;function o(l){return n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(u)}else return l.data?{data:Ar(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new Hh(t);r=new Br(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const h=e[c],d=h.url;if(Array.isArray(d)){const f=[];for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new On(p.data,p.width,p.height)))}i[h.uuid]=new Ds(f)}else{const f=a(h.url);i[h.uuid]=new Ds(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function r(o){if(typeof o=="string"){const a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:Ar(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new Br(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){const l=e[o],c=l.url;if(Array.isArray(c)){const u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=await r(f);m!==null&&(m instanceof HTMLImageElement?u.push(m):u.push(new On(m.data,m.width,m.height)))}n[l.uuid]=new Ds(u)}else{const u=await r(l.url);n[l.uuid]=new Ds(u)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}const i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=e[r];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=t[a.image],c=l.data;let u;Array.isArray(c)?(u=new Xo,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new On:u=new At,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=a.uuid,a.name!==void 0&&(u.name=a.name),a.mapping!==void 0&&(u.mapping=n(a.mapping,yb)),a.channel!==void 0&&(u.channel=a.channel),a.offset!==void 0&&u.offset.fromArray(a.offset),a.repeat!==void 0&&u.repeat.fromArray(a.repeat),a.center!==void 0&&u.center.fromArray(a.center),a.rotation!==void 0&&(u.rotation=a.rotation),a.wrap!==void 0&&(u.wrapS=n(a.wrap[0],Sf),u.wrapT=n(a.wrap[1],Sf)),a.format!==void 0&&(u.format=a.format),a.internalFormat!==void 0&&(u.internalFormat=a.internalFormat),a.type!==void 0&&(u.type=a.type),a.colorSpace!==void 0&&(u.colorSpace=a.colorSpace),a.minFilter!==void 0&&(u.minFilter=n(a.minFilter,bf)),a.magFilter!==void 0&&(u.magFilter=n(a.magFilter,bf)),a.anisotropy!==void 0&&(u.anisotropy=a.anisotropy),a.flipY!==void 0&&(u.flipY=a.flipY),a.generateMipmaps!==void 0&&(u.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(u.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(u.compareFunction=a.compareFunction),a.userData!==void 0&&(u.userData=a.userData),i[a.uuid]=u}return i}parseObject(e,t,n,i,r){let o;function a(d){return t[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let m=0,_=d.length;m<_;m++){const g=d[m];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let u,h;switch(e.type){case"Scene":o=new Ah,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new Z(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new Yo(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new oc(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new Vt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new Hr(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new hg(e.color,e.intensity);break;case"DirectionalLight":o=new xc(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new Hs(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new dg(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Xh(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new Gh(e.color,e.groundColor,e.intensity);break;case"LightProbe":o=new pg().fromJSON(e);break;case"SkinnedMesh":u=a(e.geometry),h=l(e.material),o=new ac(u,h),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":u=a(e.geometry),h=l(e.material),o=new je(u,h);break;case"InstancedMesh":u=a(e.geometry),h=l(e.material);const d=e.count,f=e.instanceMatrix,m=e.instanceColor;o=new ei(u,h,d),o.instanceMatrix=new es(new Float32Array(f.array),16),m!==void 0&&(o.instanceColor=new es(new Float32Array(m.array),m.itemSize));break;case"BatchedMesh":u=a(e.geometry),h=l(e.material),o=new zm(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,h),o.geometry=u,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._visibility=e.visibility,o._active=e.active,o._bounds=e.bounds.map(_=>{const g=new Jt;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);const p=new Qt;return p.radius=_.sphereRadius,p.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:p}}),o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._geometryCount=e.geometryCount,o._matricesTexture=c(e.matricesTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=c(e.colorsTexture.uuid));break;case"LOD":o=new Vm;break;case"Line":o=new li(a(e.geometry),l(e.material));break;case"LineLoop":o=new Rh(a(e.geometry),l(e.material));break;case"LineSegments":o=new xn(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new Ch(a(e.geometry),l(e.material));break;case"Sprite":o=new km(l(e.material));break;case"Group":o=new Ge;break;case"Bone":o=new lc;break;default:o=new rt}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],t,n,i,r))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const m=d[f];o.animations.push(r[m])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const m=d[f],_=o.getObjectByProperty("uuid",m.object);_!==void 0&&o.addLevel(_,m.distance,m.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new rt}})}}const yb={UVMapping:ql,CubeReflectionMapping:Ei,CubeRefractionMapping:Ji,EquirectangularReflectionMapping:Lo,EquirectangularRefractionMapping:Uo,CubeUVReflectionMapping:Vr},Sf={RepeatWrapping:Qi,ClampToEdgeWrapping:wn,MirroredRepeatWrapping:Lr},bf={NearestFilter:Ot,NearestMipmapNearestFilter:Yl,NearestMipmapLinearFilter:Is,LinearFilter:Ct,LinearMipmapNearestFilter:Cr,LinearMipmapLinearFilter:Nn};class _g extends dn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=bi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return bi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),bi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});bi.add(e,l),r.manager.itemStart(e)}}let Oa;class qh{static getContext(){return Oa===void 0&&(Oa=new(window.AudioContext||window.webkitAudioContext)),Oa}static setContext(e){Oa=e}}class Mb extends dn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Xn(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{const c=l.slice(0);qh.getContext().decodeAudioData(c,function(h){t(h)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i?i(l):console.error(l),r.manager.itemError(e)}}}const wf=new Le,Tf=new Le,_s=new Le;class Sb{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Vt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Vt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,_s.copy(e.projectionMatrix);const i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(Vs*t.fov*.5)/t.zoom;let a,l;Tf.elements[12]=-i,wf.elements[12]=i,a=-o*t.aspect+r,l=o*t.aspect+r,_s.elements[0]=2*t.near/(l-a),_s.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(_s),a=-o*t.aspect-r,l=o*t.aspect-r,_s.elements[0]=2*t.near/(l-a),_s.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(_s)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Tf),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(wf)}}class Yh{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Af(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Af();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Af(){return performance.now()}const vs=new w,Ef=new $e,bb=new w,xs=new w;class wb extends rt{constructor(){super(),this.type="AudioListener",this.context=qh.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Yh}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(vs,Ef,bb),xs.set(0,0,-1).applyQuaternion(Ef),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(vs.x,i),t.positionY.linearRampToValueAtTime(vs.y,i),t.positionZ.linearRampToValueAtTime(vs.z,i),t.forwardX.linearRampToValueAtTime(xs.x,i),t.forwardY.linearRampToValueAtTime(xs.y,i),t.forwardZ.linearRampToValueAtTime(xs.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(vs.x,vs.y,vs.z),t.setOrientation(xs.x,xs.y,xs.z,n.x,n.y,n.z)}}class vg extends rt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const ys=new w,Rf=new $e,Tb=new w,Ms=new w;class Ab extends vg{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(ys,Rf,Tb),Ms.set(0,0,1).applyQuaternion(Rf);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(ys.x,n),t.positionY.linearRampToValueAtTime(ys.y,n),t.positionZ.linearRampToValueAtTime(ys.z,n),t.orientationX.linearRampToValueAtTime(Ms.x,n),t.orientationY.linearRampToValueAtTime(Ms.y,n),t.orientationZ.linearRampToValueAtTime(Ms.z,n)}else t.setPosition(ys.x,ys.y,ys.z),t.setOrientation(Ms.x,Ms.y,Ms.z)}}class Eb{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class xg{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){$e.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;$e.multiplyQuaternionsFlat(e,o,e,t,e,n),$e.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const jh="\\[\\]\\.:\\/",Rb=new RegExp("["+jh+"]","g"),Zh="[^"+jh+"]",Cb="[^"+jh.replace("\\.","")+"]",Pb=/((?:WC+[\/:])*)/.source.replace("WC",Zh),Ib=/(WCOD+)?/.source.replace("WCOD",Cb),Lb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zh),Ub=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zh),Db=new RegExp("^"+Pb+Ib+Lb+Ub+"$"),Nb=["material","materials","bones","map"];class Ob{constructor(e,t,n){const i=n||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ut{constructor(e,t,n){this.path=t,this.parsedPath=n||ut.parseTrackName(t),this.node=ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ut.Composite(e,t,n):new ut(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rb,"")}static parseTrackName(e){const t=Db.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Nb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ut.Composite=Ob;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Fb{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Tn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length;let a,l=e.length,c=this.nCachedObjects_;for(let u=0,h=arguments.length;u!==h;++u){const d=arguments[u],f=d.uuid;let m=t[f];if(m===void 0){m=l++,t[f]=m,e.push(d);for(let _=0,g=o;_!==g;++_)r[_].push(new ut(d,n[_],i[_]))}else if(m<c){a=e[m];const _=--c,g=e[_];t[g.uuid]=m,e[m]=g,t[f]=_,e[_]=d;for(let p=0,y=o;p!==y;++p){const x=r[p],v=x[_];let C=x[m];x[m]=v,C===void 0&&(C=new ut(d,n[p],i[p])),x[_]=C}}else e[m]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const l=arguments[o],c=l.uuid,u=t[c];if(u!==void 0&&u>=r){const h=r++,d=e[h];t[d.uuid]=u,e[u]=d,t[c]=h,e[h]=l;for(let f=0,m=i;f!==m;++f){const _=n[f],g=_[h],p=_[u];_[u]=g,_[h]=p}}}this.nCachedObjects_=r}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],u=c.uuid,h=t[u];if(h!==void 0)if(delete t[u],h<r){const d=--r,f=e[d],m=--o,_=e[m];t[f.uuid]=h,e[h]=f,t[_.uuid]=d,e[d]=_,e.pop();for(let g=0,p=i;g!==p;++g){const y=n[g],x=y[d],v=y[m];y[h]=x,y[d]=v,y.pop()}}else{const d=--o,f=e[d];d>0&&(t[f.uuid]=h),e[h]=f,e.pop();for(let m=0,_=i;m!==_;++m){const g=n[m];g[h]=g[d],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const r=this._bindings;if(i!==void 0)return r[i];const o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,h=new Array(c);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(h);for(let d=u,f=l.length;d!==f;++d){const m=l[d];h[d]=new ut(m,e,t)}return h}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=e[a];t[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}}class yg{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Ls,endingEnd:Ls};for(let c=0;c!==o;++c){const u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=ph,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case mh:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case ec:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===um;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===fh){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Us,i.endingEnd=Us):(e?i.endingStart=this.zeroSlopeAtStart?Us:Ls:i.endingStart=Do,t?i.endingEnd=this.zeroSlopeAtEnd?Us:Ls:i.endingEnd=Do)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const Bb=new Float32Array(1);class Mg extends ci{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){const d=i[h],f=d.name;let m=u[f];if(m!==void 0)++m.referenceCount,o[h]=m;else{if(m=o[h],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;m=new xg(ut.create(n,f,_),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[h]=m}a[h].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Vh(new Float32Array(2),new Float32Array(2),1,Bb),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?$s.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=ec),l!==void 0){const h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const u=new yg(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?$s.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class $h{constructor(e){this.value=e}clone(){return new $h(this.value.clone===void 0?this.value:this.value.clone())}}let kb=0;class Vb extends ci{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:kb++}),this.name="",this.usage=No,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class zb extends Ks{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class zu{constructor(e,t,n,i,r){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const Cf=new Le;class Sg{constructor(e,t,n=0,i=1/0){this.ray=new zr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new nc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Cf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cf),this}intersectObject(e,t=!0,n=[]){return Hu(e,this,n,t),n.sort(Pf),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Hu(e[i],this,n,t);return n.sort(Pf),n}}function Pf(s,e){return s.distance-e.distance}function Hu(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Hu(r[o],e,t,!0)}}class Hb{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Lt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Gb{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}class Kh{constructor(e,t,n,i){Kh.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}}const If=new K;class Wb{constructor(e=new K(1/0,1/0),t=new K(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=If.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,If).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Lf=new w,Fa=new w;class Xb{constructor(e=new w,t=new w){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Lf.subVectors(e,this.start),Fa.subVectors(this.end,this.start);const n=Fa.dot(Fa);let r=Fa.dot(Lf)/n;return t&&(r=Lt(r,0,1)),r}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Uf=new w;class qb extends rt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new Ve,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,u=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new Pe(i,3));const r=new kt({fog:!1,toneMapped:!1});this.cone=new xn(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Uf.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Uf),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Xi=new w,Ba=new Le,lu=new Le;class Yb extends xn{constructor(e){const t=bg(e),n=new Ve,i=[],r=[],o=new Z(0,0,1),a=new Z(0,1,0);for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new Pe(i,3)),n.setAttribute("color",new Pe(r,3));const l=new kt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");lu.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){const a=t[r];a.parent&&a.parent.isBone&&(Ba.multiplyMatrices(lu,a.matrixWorld),Xi.setFromMatrixPosition(Ba),i.setXYZ(o,Xi.x,Xi.y,Xi.z),Ba.multiplyMatrices(lu,a.parent.matrixWorld),Xi.setFromMatrixPosition(Ba),i.setXYZ(o+1,Xi.x,Xi.y,Xi.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function bg(s){const e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,bg(s.children[t]));return e}class jb extends je{constructor(e,t,n){const i=new An(t,4,2),r=new Mt({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const Zb=new w,Df=new Z,Nf=new Z;class $b extends rt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Pi(t);i.rotateY(Math.PI*.5),this.material=new Mt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Ze(o,3)),this.add(new je(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Df.copy(this.light.color),Nf.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const r=n<i/2?Df:Nf;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(Zb.setFromMatrixPosition(this.light.matrixWorld).negate())}}class Kb extends xn{constructor(e=10,t=10,n=4473924,i=8947848){n=new Z(n),i=new Z(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,m=-a;d<=t;d++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const _=d===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const u=new Ve;u.setAttribute("position",new Pe(l,3)),u.setAttribute("color",new Pe(c,3));const h=new kt({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Jb extends xn{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new Z(r),o=new Z(o);const a=[],l=[];if(t>1)for(let h=0;h<t;h++){const d=h/t*(Math.PI*2),f=Math.sin(d)*e,m=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,m);const _=h&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let h=0;h<n;h++){const d=h&1?r:o,f=e-e/n*h;for(let m=0;m<i;m++){let _=m/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f;a.push(g,0,p),l.push(d.r,d.g,d.b),_=(m+1)/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f,a.push(g,0,p),l.push(d.r,d.g,d.b)}}const c=new Ve;c.setAttribute("position",new Pe(a,3)),c.setAttribute("color",new Pe(l,3));const u=new kt({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Of=new w,ka=new w,Ff=new w;class Qb extends rt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new Ve;i.setAttribute("position",new Pe([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const r=new kt({fog:!1,toneMapped:!1});this.lightPlane=new li(i,r),this.add(this.lightPlane),i=new Ve,i.setAttribute("position",new Pe([0,0,0,0,0,1],3)),this.targetLine=new li(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Of.setFromMatrixPosition(this.light.matrixWorld),ka.setFromMatrixPosition(this.light.target.matrixWorld),Ff.subVectors(ka,Of),this.lightPlane.lookAt(ka),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(ka),this.targetLine.scale.z=Ff.length()}}const Va=new w,Pt=new ic;class ew extends xn{constructor(e){const t=new Ve,n=new kt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(m,_){l(m),l(_)}function l(m){i.push(0,0,0),r.push(0,0,0),o[m]===void 0&&(o[m]=[]),o[m].push(i.length/3-1)}t.setAttribute("position",new Pe(i,3)),t.setAttribute("color",new Pe(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const c=new Z(16755200),u=new Z(16711680),h=new Z(43775),d=new Z(16777215),f=new Z(3355443);this.setColors(c,u,h,d,f)}setColors(e,t,n,i,r){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;Pt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Dt("c",t,e,Pt,0,0,-1),Dt("t",t,e,Pt,0,0,1),Dt("n1",t,e,Pt,-n,-i,-1),Dt("n2",t,e,Pt,n,-i,-1),Dt("n3",t,e,Pt,-n,i,-1),Dt("n4",t,e,Pt,n,i,-1),Dt("f1",t,e,Pt,-n,-i,1),Dt("f2",t,e,Pt,n,-i,1),Dt("f3",t,e,Pt,-n,i,1),Dt("f4",t,e,Pt,n,i,1),Dt("u1",t,e,Pt,n*.7,i*1.1,-1),Dt("u2",t,e,Pt,-n*.7,i*1.1,-1),Dt("u3",t,e,Pt,0,i*2,-1),Dt("cf1",t,e,Pt,-n,0,1),Dt("cf2",t,e,Pt,n,0,1),Dt("cf3",t,e,Pt,0,-i,1),Dt("cf4",t,e,Pt,0,i,1),Dt("cn1",t,e,Pt,-n,0,-1),Dt("cn2",t,e,Pt,n,0,-1),Dt("cn3",t,e,Pt,0,-i,-1),Dt("cn4",t,e,Pt,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Dt(s,e,t,n,i,r,o){Va.set(i,r,o).unproject(n);const a=e[s];if(a!==void 0){const l=t.getAttribute("position");for(let c=0,u=a.length;c<u;c++)l.setXYZ(a[c],Va.x,Va.y,Va.z)}}const za=new Jt;class tw extends xn{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new Ve;r.setIndex(new Ze(n,1)),r.setAttribute("position",new Ze(i,3)),super(r,new kt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(e!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&za.setFromObject(this.object),za.isEmpty())return;const t=za.min,n=za.max,i=this.geometry.attributes.position,r=i.array;r[0]=n.x,r[1]=n.y,r[2]=n.z,r[3]=t.x,r[4]=n.y,r[5]=n.z,r[6]=t.x,r[7]=t.y,r[8]=n.z,r[9]=n.x,r[10]=t.y,r[11]=n.z,r[12]=n.x,r[13]=n.y,r[14]=t.z,r[15]=t.x,r[16]=n.y,r[17]=t.z,r[18]=t.x,r[19]=t.y,r[20]=t.z,r[21]=n.x,r[22]=t.y,r[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class nw extends xn{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new Ve;r.setIndex(new Ze(n,1)),r.setAttribute("position",new Pe(i,3)),super(r,new kt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class iw extends li{constructor(e,t=1,n=16776960){const i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new Ve;o.setAttribute("position",new Pe(r,3)),o.computeBoundingSphere(),super(o,new kt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Ve;l.setAttribute("position",new Pe(a,3)),l.computeBoundingSphere(),this.add(new je(l,new Mt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Bf=new w;let Ha,cu;class sw extends rt{constructor(e=new w(0,0,1),t=new w(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Ha===void 0&&(Ha=new Ve,Ha.setAttribute("position",new Pe([0,0,0,0,1,0],3)),cu=new hn(0,.5,1,5,1),cu.translate(0,-.5,0)),this.position.copy(t),this.line=new li(Ha,new kt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new je(cu,new Mt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Bf.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Bf,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class wg extends xn{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ve;i.setAttribute("position",new Pe(t,3)),i.setAttribute("color",new Pe(n,3));const r=new kt({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){const i=new Z,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class rw{constructor(){this.type="ShapePath",this.color=new Z,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Bo,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const y=[];for(let x=0,v=p.length;x<v;x++){const C=p[x],T=new zs;T.curves=C.curves,y.push(T)}return y}function n(p,y){const x=y.length;let v=!1;for(let C=x-1,T=0;T<x;C=T++){let E=y[C],R=y[T],b=R.x-E.x,M=R.y-E.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(E=y[T],b=-b,R=y[C],M=-M),p.y<E.y||p.y>R.y)continue;if(p.y===E.y){if(p.x===E.x)return!0}else{const I=M*(p.x-E.x)-b*(p.y-E.y);if(I===0)return!0;if(I<0)continue;v=!v}}else{if(p.y!==E.y)continue;if(R.x<=p.x&&p.x<=E.x||E.x<=p.x&&p.x<=R.x)return!0}}return v}const i=si.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,l;const c=[];if(r.length===1)return a=r[0],l=new zs,l.curves=a.curves,c.push(l),c;let u=!i(r[0].getPoints());u=e?!u:u;const h=[],d=[];let f=[],m=0,_;d[m]=void 0,f[m]=[];for(let p=0,y=r.length;p<y;p++)a=r[p],_=a.getPoints(),o=i(_),o=e?!o:o,o?(!u&&d[m]&&m++,d[m]={s:new zs,p:_},d[m].s.curves=a.curves,u&&m++,f[m]=[]):f[m].push({h:a,p:_[0]});if(!d[0])return t(r);if(d.length>1){let p=!1,y=0;for(let x=0,v=d.length;x<v;x++)h[x]=[];for(let x=0,v=d.length;x<v;x++){const C=f[x];for(let T=0;T<C.length;T++){const E=C[T];let R=!0;for(let b=0;b<d.length;b++)n(E.p,d[b].p)&&(x!==b&&y++,R?(R=!1,h[b].push(E)):p=!0);R&&h[x].push(E)}}y>0&&p===!1&&(f=h)}let g;for(let p=0,y=d.length;p<y;p++){l=d[p].s,c.push(l),g=f[p];for(let x=0,v=g.length;x<v;x++)l.holes.push(g[x].h)}return c}}class ow extends ci{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class aw extends sn{constructor(e=1,t=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(e,t,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ki}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ki);const lw=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:th,AddEquation:ji,AddOperation:am,AdditiveAnimationBlendMode:mh,AdditiveBlending:Po,AgXToneMapping:nh,AlphaFormat:ah,AlwaysCompare:ym,AlwaysDepth:il,AlwaysStencilFunc:Lu,AmbientLight:hg,AnimationAction:yg,AnimationClip:$s,AnimationLoader:db,AnimationMixer:Mg,AnimationObjectGroup:Fb,AnimationUtils:lb,ArcCurve:Gm,ArrayCamera:Om,ArrowHelper:sw,AttachedBindMode:Iu,Audio:vg,AudioAnalyser:Eb,AudioContext:qh,AudioListener:wb,AudioLoader:Mb,AxesHelper:wg,BackSide:jt,BasicDepthPacking:dm,BasicShadowMap:d0,BatchedMesh:zm,Bone:lc,BooleanKeyframeTrack:Qs,Box2:Wb,Box3:Jt,Box3Helper:nw,BoxGeometry:Yt,BoxHelper:tw,BufferAttribute:Ze,BufferGeometry:Ve,BufferGeometryLoader:gg,ByteType:sh,Cache:bi,Camera:ic,CameraHelper:ew,CanvasTexture:Hm,CapsuleGeometry:dc,CatmullRomCurve3:Wm,CineonToneMapping:eh,CircleGeometry:Wr,ClampToEdgeWrapping:wn,Clock:Yh,Color:Z,ColorKeyframeTrack:zh,ColorManagement:at,CompressedArrayTexture:IS,CompressedCubeTexture:LS,CompressedTexture:uc,CompressedTextureLoader:fb,ConeGeometry:Ai,ConstantAlphaFactor:sm,ConstantColorFactor:nm,Controls:ow,CubeCamera:Rm,CubeReflectionMapping:Ei,CubeRefractionMapping:Ji,CubeTexture:Xo,CubeTextureLoader:pb,CubeUVReflectionMapping:Vr,CubicBezierCurve:Ih,CubicBezierCurve3:Xm,CubicInterpolant:og,CullFaceBack:Ru,CullFaceFront:zp,CullFaceFrontBack:h0,CullFaceNone:Vp,Curve:qn,CurvePath:Ym,CustomBlending:Hp,CustomToneMapping:lm,CylinderGeometry:hn,Cylindrical:Gb,Data3DTexture:yh,DataArrayTexture:tc,DataTexture:On,DataTextureLoader:mb,DataUtils:M_,DecrementStencilOp:b0,DecrementWrapStencilOp:T0,DefaultLoadingManager:cg,DepthFormat:ks,DepthStencilFormat:Ys,DepthTexture:wh,DetachedBindMode:cm,DirectionalLight:xc,DirectionalLightHelper:Qb,DiscreteInterpolant:ag,DodecahedronGeometry:Zo,DoubleSide:qt,DstAlphaFactor:Kp,DstColorFactor:Qp,DynamicCopyUsage:k0,DynamicDrawUsage:Mm,DynamicReadUsage:O0,EdgesGeometry:jm,EllipseCurve:hc,EqualCompare:gm,EqualDepth:rl,EqualStencilFunc:C0,EquirectangularReflectionMapping:Lo,EquirectangularRefractionMapping:Uo,Euler:on,EventDispatcher:ci,ExtrudeGeometry:pc,FileLoader:Xn,Float16BufferAttribute:E_,Float32BufferAttribute:Pe,FloatType:vn,Fog:Yo,FogExp2:oc,FramebufferTexture:PS,FrontSide:ri,Frustum:qo,GLBufferAttribute:zu,GLSL1:z0,GLSL3:Uu,GreaterCompare:_m,GreaterDepth:Io,GreaterEqualCompare:xm,GreaterEqualDepth:ol,GreaterEqualStencilFunc:U0,GreaterStencilFunc:I0,GridHelper:Kb,Group:Ge,HalfFloatType:ii,HemisphereLight:Gh,HemisphereLightHelper:$b,IcosahedronGeometry:os,ImageBitmapLoader:_g,ImageLoader:Br,ImageUtils:wm,IncrementStencilOp:S0,IncrementWrapStencilOp:w0,InstancedBufferAttribute:es,InstancedBufferGeometry:mg,InstancedInterleavedBuffer:zb,InstancedMesh:ei,Int16BufferAttribute:T_,Int32BufferAttribute:A_,Int8BufferAttribute:S_,IntType:jl,InterleavedBuffer:Ks,InterleavedBufferAttribute:ai,Interpolant:Xr,InterpolateDiscrete:Dr,InterpolateLinear:Nr,InterpolateSmooth:Za,InvertStencilOp:A0,KeepStencilOp:Es,KeyframeTrack:Yn,LOD:Vm,LatheGeometry:jo,Layers:nc,LessCompare:mm,LessDepth:sl,LessEqualCompare:vh,LessEqualDepth:Xs,LessEqualStencilFunc:P0,LessStencilFunc:R0,Light:as,LightProbe:pg,Line:li,Line3:Xb,LineBasicMaterial:kt,LineCurve:Lh,LineCurve3:qm,LineDashedMaterial:ig,LineLoop:Rh,LineSegments:xn,LinearFilter:Ct,LinearInterpolant:Vh,LinearMipMapLinearFilter:g0,LinearMipMapNearestFilter:m0,LinearMipmapLinearFilter:Nn,LinearMipmapNearestFilter:Cr,LinearSRGBColorSpace:rn,LinearToneMapping:Ju,LinearTransfer:Wo,Loader:dn,LoaderUtils:$i,LoadingManager:Hh,LoopOnce:fh,LoopPingPong:um,LoopRepeat:ph,LuminanceAlphaFormat:uh,LuminanceFormat:ch,MOUSE:c0,Material:Bt,MaterialLoader:yc,MathUtils:Et,Matrix2:Kh,Matrix3:We,Matrix4:Le,MaxEquation:qp,Mesh:je,MeshBasicMaterial:Mt,MeshDepthMaterial:rc,MeshDistanceMaterial:Th,MeshLambertMaterial:Bh,MeshMatcapMaterial:ng,MeshNormalMaterial:tg,MeshPhongMaterial:eg,MeshPhysicalMaterial:Fn,MeshStandardMaterial:Ko,MeshToonMaterial:Fh,MinEquation:Xp,MirroredRepeatWrapping:Lr,MixOperation:om,MultiplyBlending:Pu,MultiplyOperation:Ho,NearestFilter:Ot,NearestMipMapLinearFilter:p0,NearestMipMapNearestFilter:f0,NearestMipmapLinearFilter:Is,NearestMipmapNearestFilter:Yl,NeutralToneMapping:ih,NeverCompare:pm,NeverDepth:nl,NeverStencilFunc:E0,NoBlending:ni,NoColorSpace:Mi,NoToneMapping:wi,NormalAnimationBlendMode:ec,NormalBlending:Bs,NotEqualCompare:vm,NotEqualDepth:al,NotEqualStencilFunc:L0,NumberKeyframeTrack:Zs,Object3D:rt,ObjectLoader:xb,ObjectSpaceNormalMap:fm,OctahedronGeometry:Pi,OneFactor:jp,OneMinusConstantAlphaFactor:rm,OneMinusConstantColorFactor:im,OneMinusDstAlphaFactor:Jp,OneMinusDstColorFactor:em,OneMinusSrcAlphaFactor:tl,OneMinusSrcColorFactor:$p,OrthographicCamera:Hr,PCFShadowMap:Xl,PCFSoftShadowMap:Ku,PMREMGenerator:Du,Path:Bo,PerspectiveCamera:Vt,Plane:yi,PlaneGeometry:is,PlaneHelper:iw,PointLight:Hs,PointLightHelper:jb,Points:Ch,PointsMaterial:cc,PolarGridHelper:Jb,PolyhedronGeometry:rs,PositionalAudio:Ab,PropertyBinding:ut,PropertyMixer:xg,QuadraticBezierCurve:Uh,QuadraticBezierCurve3:Dh,Quaternion:$e,QuaternionKeyframeTrack:ts,QuaternionLinearInterpolant:lg,RED_GREEN_RGTC2_Format:Ll,RED_RGTC1_Format:dh,REVISION:Ki,RGBADepthPacking:_h,RGBAFormat:Kt,RGBAIntegerFormat:Ql,RGBA_ASTC_10x10_Format:Al,RGBA_ASTC_10x5_Format:bl,RGBA_ASTC_10x6_Format:wl,RGBA_ASTC_10x8_Format:Tl,RGBA_ASTC_12x10_Format:El,RGBA_ASTC_12x12_Format:Rl,RGBA_ASTC_4x4_Format:ml,RGBA_ASTC_5x4_Format:gl,RGBA_ASTC_5x5_Format:_l,RGBA_ASTC_6x5_Format:vl,RGBA_ASTC_6x6_Format:xl,RGBA_ASTC_8x5_Format:yl,RGBA_ASTC_8x6_Format:Ml,RGBA_ASTC_8x8_Format:Sl,RGBA_BPTC_Format:Ao,RGBA_ETC2_EAC_Format:pl,RGBA_PVRTC_2BPPV1_Format:hl,RGBA_PVRTC_4BPPV1_Format:ul,RGBA_S3TC_DXT1_Format:bo,RGBA_S3TC_DXT3_Format:wo,RGBA_S3TC_DXT5_Format:To,RGBDepthPacking:v0,RGBFormat:lh,RGBIntegerFormat:_0,RGB_BPTC_SIGNED_Format:Cl,RGB_BPTC_UNSIGNED_Format:Pl,RGB_ETC1_Format:dl,RGB_ETC2_Format:fl,RGB_PVRTC_2BPPV1_Format:cl,RGB_PVRTC_4BPPV1_Format:ll,RGB_S3TC_DXT1_Format:So,RGDepthPacking:x0,RGFormat:hh,RGIntegerFormat:Jl,RawShaderMaterial:Oh,Ray:zr,Raycaster:Sg,RectAreaLight:dg,RedFormat:Kl,RedIntegerFormat:Go,ReinhardToneMapping:Qu,RenderTarget:Tm,RepeatWrapping:Qi,ReplaceStencilOp:M0,ReverseSubtractEquation:Wp,RingGeometry:$o,SIGNED_RED_GREEN_RGTC2_Format:Ul,SIGNED_RED_RGTC1_Format:Il,SRGBColorSpace:Nt,SRGBTransfer:_t,Scene:Ah,ShaderChunk:it,ShaderLib:Wn,ShaderMaterial:Ut,ShadowMaterial:Qm,Shape:zs,ShapeGeometry:mc,ShapePath:rw,ShapeUtils:si,ShortType:rh,Skeleton:ss,SkeletonHelper:Yb,SkinnedMesh:ac,Source:Ds,Sphere:Qt,SphereGeometry:An,Spherical:Hb,SphericalHarmonics3:fg,SplineCurve:Nh,SpotLight:Xh,SpotLightHelper:qb,Sprite:km,SpriteMaterial:Eh,SrcAlphaFactor:el,SrcAlphaSaturateFactor:tm,SrcColorFactor:Zp,StaticCopyUsage:B0,StaticDrawUsage:No,StaticReadUsage:N0,StereoCamera:Sb,StreamCopyUsage:V0,StreamDrawUsage:D0,StreamReadUsage:F0,StringKeyframeTrack:er,SubtractEquation:Gp,SubtractiveBlending:Cu,TOUCH:u0,TangentSpaceNormalMap:Ii,TetrahedronGeometry:gc,Texture:At,TextureLoader:ug,TextureUtils:uS,TorusGeometry:Js,TorusKnotGeometry:_c,Triangle:_n,TriangleFanDrawMode:Dl,TriangleStripDrawMode:gh,TrianglesDrawMode:hm,TubeGeometry:vc,UVMapping:ql,Uint16BufferAttribute:Mh,Uint32BufferAttribute:Sh,Uint8BufferAttribute:b_,Uint8ClampedBufferAttribute:w_,Uniform:$h,UniformsGroup:Vb,UniformsLib:ve,UniformsUtils:Ci,UnsignedByteType:oi,UnsignedInt248Type:qs,UnsignedInt5999Type:oh,UnsignedIntType:Ri,UnsignedShort4444Type:Zl,UnsignedShort5551Type:$l,UnsignedShortType:Ur,VSMShadowMap:Jn,Vector2:K,Vector3:w,Vector4:dt,VectorKeyframeTrack:ns,VideoTexture:CS,WebGL3DRenderTarget:h_,WebGLArrayRenderTarget:u_,WebGLCoordinateSystem:Qn,WebGLCubeRenderTarget:Cm,WebGLMultipleRenderTargets:aw,WebGLRenderTarget:sn,WebGLRenderer:Fm,WebGLUtils:Nm,WebGPUCoordinateSystem:Oo,WireframeGeometry:Jm,WrapAroundEnding:Do,ZeroCurvatureEnding:Ls,ZeroFactor:Yp,ZeroSlopeEnding:Us,ZeroStencilOp:y0,createCanvasElement:bm},Symbol.toStringTag,{value:"Module"})),Tg={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class qr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cw=new Hr(-1,1,1,-1,0,1);class uw extends Ve{constructor(){super(),this.setAttribute("position",new Pe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Pe([0,2,0,0,2,0],2))}}const hw=new uw;class Jh{constructor(e){this._mesh=new je(hw,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cw)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ag extends qr{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ci.clone(e.uniforms),this.material=new Ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Jh(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class kf extends qr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class dw extends qr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class fw{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new K);this._width=n.width,this._height=n.height,t=new sn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ii}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ag(Tg),this.copyPass.material.blending=ni,this.clock=new Yh}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}kf!==void 0&&(o instanceof kf?n=!0:o instanceof dw&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new K);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class pw extends qr{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Z}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const mw={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Z(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class kr extends qr{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new K(e.x,e.y):new K(256,256),this.clearColor=new Z(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new sn(r,o,{type:ii}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new sn(r,o,{type:ii});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new sn(r,o,{type:ii});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=mw;this.highPassUniforms=Ci.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ut({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new K(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Tg;this.copyUniforms=Ci.clone(u.uniforms),this.blendMaterial=new Ut({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Po,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Z,this.oldClearAlpha=1,this.basic=new Mt,this.fsQuad=new Jh(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new K(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=kr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=kr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ut({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new K(.5,.5)},direction:{value:new K(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new Ut({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}kr.BlurDirectionX=new K(1,0);kr.BlurDirectionY=new K(0,1);const gw={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class _w extends qr{constructor(){super();const e=gw;this.uniforms=Ci.clone(e.uniforms),this.material=new Oh({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Jh(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},at.getTransfer(this._outputColorSpace)===_t&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ju?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Qu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===eh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===th?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===nh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ih&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}let vw=1;function xw(s,e,t,n){const i=new is(s,e);return i.translate(s/2-t,e/2-(e-n),0),i}function yw(s,e){const t=new Mt({map:e,color:1714790,transparent:!0,opacity:.5,alphaTest:.5,depthFunc:Io,depthWrite:!1}),n=new je(s.geometry,t);return n.renderOrder=10,n}class Vf{constructor(e,t,n,i=!0){Pn(this,"obj",new Ge);Pn(this,"cv",document.createElement("canvas"));Pn(this,"ctx");Pn(this,"tex");Pn(this,"mesh");this.w=e,this.h=t,this.cv.width=e*2,this.cv.height=t*2,this.ctx=this.cv.getContext("2d"),this.tex=new Hm(this.cv),this.tex.magFilter=this.tex.minFilter=Ot,this.tex.generateMipmaps=!1,this.tex.colorSpace=Nt;const r=xw(e/Re,t/Re,e/2/Re,(t-8)/Re);this.mesh=new je(r,new Bh({map:this.tex,emissiveMap:this.tex,emissive:7829367,alphaTest:.4,side:qt})),this.mesh.castShadow=n,this.mesh.customDepthMaterial=new rc({depthPacking:_h,map:this.tex,alphaTest:.4}),this.obj.add(this.mesh),i&&this.obj.add(yw(this.mesh,this.tex))}paint(e){const t=this.ctx;t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.cv.width,this.cv.height),t.setTransform(2,0,0,2,this.w,(this.h-8)*2),e(t),this.tex.needsUpdate=!0,this.obj.scale.y=vw*.85}dispose(){this.mesh.geometry.dispose(),this.tex.dispose()}}const Mw=new Map,Sw=[];function bw(s){return Mw.get(s)}function zf(s,e){if(e===hm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Dl||e===gh){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Dl)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class Eg extends dn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Rw(t)}),this.register(function(t){return new Cw(t)}),this.register(function(t){return new Bw(t)}),this.register(function(t){return new kw(t)}),this.register(function(t){return new Vw(t)}),this.register(function(t){return new Iw(t)}),this.register(function(t){return new Lw(t)}),this.register(function(t){return new Uw(t)}),this.register(function(t){return new Dw(t)}),this.register(function(t){return new Ew(t)}),this.register(function(t){return new Nw(t)}),this.register(function(t){return new Pw(t)}),this.register(function(t){return new Fw(t)}),this.register(function(t){return new Ow(t)}),this.register(function(t){return new Tw(t)}),this.register(function(t){return new zw(t)}),this.register(function(t){return new Hw(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=$i.extractUrlBase(e);o=$i.resolveURL(c,this.path)}else o=$i.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Xn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Rg){try{o[ct.KHR_BINARY_GLTF]=new Gw(e)}catch(h){i&&i(h);return}r=JSON.parse(o[ct.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new nT(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case ct.KHR_MATERIALS_UNLIT:o[h]=new Aw;break;case ct.KHR_DRACO_MESH_COMPRESSION:o[h]=new Ww(r,this.dracoLoader);break;case ct.KHR_TEXTURE_TRANSFORM:o[h]=new Xw;break;case ct.KHR_MESH_QUANTIZATION:o[h]=new qw;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function ww(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const ct={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Tw{constructor(e){this.parser=e,this.name=ct.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new Z(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],rn);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new xc(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Hs(u),c.distance=h;break;case"spot":c=new Xh(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,xi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Aw{constructor(){this.name=ct.KHR_MATERIALS_UNLIT}getMaterialType(){return Mt}extendParams(e,t,n){const i=[];e.color=new Z(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],rn),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Nt))}return Promise.all(i)}}class Ew{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Rw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new K(a,a)}return Promise.all(r)}}class Cw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Pw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class Iw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Z(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],rn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Nt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Lw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Uw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Z().setRGB(a[0],a[1],a[2],rn),Promise.all(r)}}class Dw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Nw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Z().setRGB(a[0],a[1],a[2],rn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Nt)),Promise.all(r)}}class Ow{constructor(e){this.parser=e,this.name=ct.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class Fw{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class Bw{constructor(e){this.parser=e,this.name=ct.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class kw{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Vw{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class zw{constructor(e){this.name=ct.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class Hw{constructor(e){this.name=ct.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Dn.TRIANGLES&&c.mode!==Dn.TRIANGLE_STRIP&&c.mode!==Dn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(const m of h){const _=new Le,g=new w,p=new $e,y=new w(1,1,1),x=new ei(m.geometry,m.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&y.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,_.compose(g,p,y));for(const v in l)if(v==="_COLOR_0"){const C=l[v];x.instanceColor=new es(C.array,C.itemSize,C.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&m.geometry.setAttribute(v,l[v]);rt.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),f.push(x)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Rg="glTF",lo=12,Hf={JSON:1313821514,BIN:5130562};class Gw{constructor(e){this.name=ct.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,lo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Rg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-lo,r=new DataView(e,lo);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Hf.JSON){const c=new Uint8Array(e,lo+o,a);this.content=n.decode(c)}else if(l===Hf.BIN){const c=lo+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ww{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ct.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=Gu[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=Gu[u]||u.toLowerCase();if(o[u]!==void 0){const d=n.accessors[e.attributes[u]],f=Ir[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const m in f.attributes){const _=f.attributes[m],g=l[m];g!==void 0&&(_.normalized=g)}h(f)},a,c,rn,d)})})}}class Xw{constructor(){this.name=ct.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class qw{constructor(){this.name=ct.KHR_MESH_QUANTIZATION}}class Cg extends Xr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,m=e*c,_=m-c,g=-2*f+3*d,p=f-d,y=1-g,x=p-d+h;for(let v=0;v!==a;v++){const C=o[_+v+a],T=o[_+v+l]*u,E=o[m+v+a],R=o[m+v]*u;r[v]=y*C+x*T+g*E+p*R}return r}}const Yw=new $e;class jw extends Cg{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Yw.fromArray(r).normalize().toArray(r),r}}const Dn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ir={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gf={9728:Ot,9729:Ct,9984:Yl,9985:Cr,9986:Is,9987:Nn},Wf={33071:wn,33648:Lr,10497:Qi},uu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Gu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},qi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Zw={CUBICSPLINE:void 0,LINEAR:Nr,STEP:Dr},hu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function $w(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ko({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ri})),s.DefaultMaterial}function Ss(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function xi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Kw(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;o.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Jw(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Qw(s){let e;const t=s.extensions&&s.extensions[ct.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+du(t.attributes):e=s.indices+":"+du(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+du(s.targets[n]);return e}function du(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Wu(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function eT(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const tT=new Le;class nT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ww,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new ug(this.options.manager):this.textureLoader=new _g(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Ss(r,a,i),xi(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())r(u,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ct.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load($i.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=uu[i.type],a=Ir[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Ze(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=uu[i.type],c=Ir[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let _,g;if(f&&f!==h){const p=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(y);x||(_=new c(a,p*f,i.count*f/u),x=new Ks(_,f/u),t.cache.add(y,x)),g=new ai(x,l,d%f/u,m)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),g=new Ze(_,l,m);if(i.sparse!==void 0){const p=uu.SCALAR,y=Ir[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,C=new y(o[1],x,i.sparse.count*p),T=new c(o[2],v,i.sparse.count*l);a!==null&&(g=new Ze(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let E=0,R=C.length;E<R;E++){const b=C[E];if(g.setX(b,T[E*l]),l>=2&&g.setY(b,T[E*l+1]),l>=3&&g.setZ(b,T[E*l+2]),l>=4&&g.setW(b,T[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return u.magFilter=Gf[d.magFilter]||Ct,u.minFilter=Gf[d.minFilter]||Nn,u.wrapS=Wf[d.wrapS]||Qi,u.wrapT=Wf[d.wrapT]||Qi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Ot&&u.minFilter!==Ct,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const g=new At(_);g.needsUpdate=!0,d(g)}),t.load($i.resolveURL(h,r.path),m,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),xi(h,o),h.userData.mimeType=o.mimeType||eT(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[ct.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[ct.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[ct.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new cc,Bt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new kt,Bt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ko}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[ct.KHR_MATERIALS_UNLIT]){const h=i[ct.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,r,t))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new Z(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],rn),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,Nt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=qt);const u=r.alphaMode||hu.OPAQUE;if(u===hu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===hu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Mt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new K(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Mt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Mt){const h=r.emissiveFactor;a.emissive=new Z().setRGB(h[0],h[1],h[2],rn)}return r.emissiveTexture!==void 0&&o!==Mt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Nt)),Promise.all(c).then(function(){const h=new o(a);return r.name&&(h.name=r.name),xi(h,r),t.associations.set(h,{materials:e}),r.extensions&&Ss(i,h,r),h})}createUniqueName(e){const t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[ct.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Xf(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=Qw(c),h=i[u];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[ct.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Xf(new Ve,c,t),i[u]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?$w(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,m=u.length;f<m;f++){const _=u[f],g=o[f];let p;const y=c[f];if(g.mode===Dn.TRIANGLES||g.mode===Dn.TRIANGLE_STRIP||g.mode===Dn.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new ac(_,y):new je(_,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Dn.TRIANGLE_STRIP?p.geometry=zf(p.geometry,gh):g.mode===Dn.TRIANGLE_FAN&&(p.geometry=zf(p.geometry,Dl));else if(g.mode===Dn.LINES)p=new xn(_,y);else if(g.mode===Dn.LINE_STRIP)p=new li(_,y);else if(g.mode===Dn.LINE_LOOP)p=new Rh(_,y);else if(g.mode===Dn.POINTS)p=new Ch(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&Jw(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),xi(p,r),g.extensions&&Ss(i,p,g),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&Ss(i,h[0],r),h[0];const d=new Ge;r.extensions&&Ss(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Vt(Et.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Hr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),xi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const d=new Le;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ss(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],m=i.samplers[f.sampler],_=f.target,g=_.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,y=i.parameters!==void 0?i.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",y)),c.push(m),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],m=h[2],_=h[3],g=h[4],p=[];for(let y=0,x=d.length;y<x;y++){const v=d[y],C=f[y],T=m[y],E=_[y],R=g[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const b=n._createAnimationTracks(v,C,T,E,R);if(b)for(let M=0;M<b.length;M++)p.push(b[M])}return new $s(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,tT)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new lc:c.length>1?u=new Ge:c.length===1?u=c[0]:u=new rt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=o),xi(u,r),r.extensions&&Ss(n,u,r),r.matrix!==void 0){const h=new Le;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Ge;n.name&&(r.name=i.createUniqueName(n.name)),xi(r,n),n.extensions&&Ss(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);const c=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof Bt||d instanceof At)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];qi[r.path]===qi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(qi[r.path]){case qi.weights:c=Zs;break;case qi.rotation:c=ts;break;case qi.position:case qi.scale:c=ns;break;default:switch(n.itemSize){case 1:c=Zs;break;case 2:case 3:default:c=ns;break}break}const u=i.interpolation!==void 0?Zw[i.interpolation]:Nr,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const m=new c(l[d]+"."+qi[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Wu(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ts?jw:Cg;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function iT(s,e,t){const n=e.attributes,i=new Jt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new w(l[0],l[1],l[2]),new w(c[0],c[1],c[2])),a.normalized){const u=Wu(Ir[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new w,l=new w;for(let c=0,u=r.length;c<u;c++){const h=r[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=Wu(Ir[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Qt;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Xf(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=Gu[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return at.workingColorSpace!==rn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),xi(s,e),iT(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Kw(s,e.targets,t):s})}/*!
 * @pixiv/three-vrm v3.5.5
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */var Ga=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),pt=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),qf=class extends rt{constructor(s){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${s}`,this.expressionName=s,this.type="VRMExpression",this.visible=!1}get binds(){return this._binds}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.outputWeight?1:0:this.overrideBlink==="blend"?this.outputWeight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.outputWeight?1:0:this.overrideLookAt==="blend"?this.outputWeight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.outputWeight?1:0:this.overrideMouth==="blend"?this.outputWeight:0}get outputWeight(){return this.isBinary?this.weight>.5?1:0:this.weight}addBind(s){this._binds.push(s)}deleteBind(s){const e=this._binds.indexOf(s);e>=0&&this._binds.splice(e,1)}applyWeight(s){var e;let t=this.outputWeight;t*=(e=s?.multiplier)!=null?e:1,this.isBinary&&t<1&&(t=0),this._binds.forEach(n=>n.applyWeight(t))}clearAppliedWeight(){this._binds.forEach(s=>s.clearAppliedWeight())}};function Pg(s,e,t){var n,i;const r=s.parser.json,o=(n=r.nodes)==null?void 0:n[e];if(o==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;const a=o.mesh;if(a==null)return null;const l=(i=r.meshes)==null?void 0:i[a];if(l==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${a}] of glTF but the mesh doesn't exist`),null;const c=l.primitives.length,u=[];return t.traverse(h=>{u.length<c&&h.isMesh&&u.push(h)}),u}function Yf(s,e){return pt(this,null,function*(){const t=yield s.parser.getDependency("node",e);return Pg(s,e,t)})}function jf(s){return pt(this,null,function*(){const e=yield s.parser.getDependencies("node"),t=new Map;return e.forEach((n,i)=>{const r=Pg(s,i,n);r!=null&&t.set(i,r)}),t})}var Xu={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function Ig(s){return Math.max(Math.min(s,1),0)}var Zf=class Lg{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){const e={},t=new Set(Object.values(Xu));return Object.entries(this._expressionMap).forEach(([n,i])=>{t.has(n)&&(e[n]=i)}),e}get customExpressionMap(){const e={},t=new Set(Object.values(Xu));return Object.entries(this._expressionMap).forEach(([n,i])=>{t.has(n)||(e[n]=i)}),e}copy(e){return this._expressions.concat().forEach(n=>{this.unregisterExpression(n)}),e._expressions.forEach(n=>{this.registerExpression(n)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new Lg().copy(this)}getExpression(e){var t;return(t=this._expressionMap[e])!=null?t:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){const t=this._expressions.indexOf(e);t===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(t,1),delete this._expressionMap[e.expressionName]}getValue(e){var t;const n=this.getExpression(e);return(t=n?.weight)!=null?t:null}setValue(e,t){const n=this.getExpression(e);n&&(n.weight=Ig(t))}resetValues(){this._expressions.forEach(e=>{e.weight=0})}getExpressionTrackName(e){const t=this.getExpression(e);return t?`${t.name}.weight`:null}update(){const e=this._calculateWeightMultipliers();this._expressions.forEach(t=>{t.clearAppliedWeight()}),this._expressions.forEach(t=>{let n=1;const i=t.expressionName;this.blinkExpressionNames.indexOf(i)!==-1&&(n*=e.blink),this.lookAtExpressionNames.indexOf(i)!==-1&&(n*=e.lookAt),this.mouthExpressionNames.indexOf(i)!==-1&&(n*=e.mouth),t.applyWeight({multiplier:n})})}_calculateWeightMultipliers(){let e=1,t=1,n=1;return this._expressions.forEach(i=>{e-=i.overrideBlinkAmount,t-=i.overrideLookAtAmount,n-=i.overrideMouthAmount}),e=Math.max(0,e),t=Math.max(0,t),n=Math.max(0,n),{blink:e,lookAt:t,mouth:n}}},co={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",RimColor:"rimColor",OutlineColor:"outlineColor"},sT={_Color:co.Color,_EmissionColor:co.EmissionColor,_ShadeColor:co.ShadeColor,_RimColor:co.RimColor,_OutlineColor:co.OutlineColor},rT=new Z,Ug=class Dg{constructor({material:e,type:t,targetValue:n,targetAlpha:i}){this.material=e,this.type=t,this.targetValue=n,this.targetAlpha=i??1;const r=this._initColorBindState(),o=this._initAlphaBindState();this._state={color:r,alpha:o}}applyWeight(e){const{color:t,alpha:n}=this._state;if(t!=null){const{propertyName:i,deltaValue:r}=t,o=this.material[i];o?.add(rT.copy(r).multiplyScalar(e))}if(n!=null){const{propertyName:i,deltaValue:r}=n;this.material[i]!=null&&(this.material[i]+=r*e)}}clearAppliedWeight(){const{color:e,alpha:t}=this._state;if(e!=null){const{propertyName:n,initialValue:i}=e,r=this.material[n];r?.copy(i)}if(t!=null){const{propertyName:n,initialValue:i}=t;this.material[n]!=null&&(this.material[n]=i)}}_initColorBindState(){var e,t,n;const{material:i,type:r,targetValue:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a?.[r])==null?void 0:e[0])!=null?t:null;if(l==null)return console.warn(`Tried to add a material color bind to the material ${(n=i.name)!=null?n:"(no name)"}, the type ${r} but the material or the type is not supported.`),null;const u=i[l].clone(),h=new Z(o.r-u.r,o.g-u.g,o.b-u.b);return{propertyName:l,initialValue:u,deltaValue:h}}_initAlphaBindState(){var e,t,n;const{material:i,type:r,targetAlpha:o}=this,a=this._getPropertyNameMap(),l=(t=(e=a?.[r])==null?void 0:e[1])!=null?t:null;if(l==null&&o!==1)return console.warn(`Tried to add a material alpha bind to the material ${(n=i.name)!=null?n:"(no name)"}, the type ${r} but the material or the type does not support alpha.`),null;if(l==null)return null;const c=i[l],u=o-c;return{propertyName:l,initialValue:c,deltaValue:u}}_getPropertyNameMap(){var e,t;return(t=(e=Object.entries(Dg._propertyNameMapMap).find(([n])=>this.material[n]===!0))==null?void 0:e[1])!=null?t:null}};Ug._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var $f=Ug,Bl=class{constructor({primitives:s,index:e,weight:t}){this.primitives=s,this.index=e,this.weight=t}applyWeight(s){this.primitives.forEach(e=>{var t;((t=e.morphTargetInfluences)==null?void 0:t[this.index])!=null&&(e.morphTargetInfluences[this.index]+=this.weight*s)})}clearAppliedWeight(){this.primitives.forEach(s=>{var e;((e=s.morphTargetInfluences)==null?void 0:e[this.index])!=null&&(s.morphTargetInfluences[this.index]=0)})}},Kf=new K,Ng=class Og{constructor({material:e,scale:t,offset:n}){var i,r;this.material=e,this.scale=t,this.offset=n;const o=(i=Object.entries(Og._propertyNamesMap).find(([a])=>e[a]===!0))==null?void 0:i[1];o==null?(console.warn(`Tried to add a texture transform bind to the material ${(r=e.name)!=null?r:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],o.forEach(a=>{var l;const c=(l=e[a])==null?void 0:l.clone();if(!c)return null;e[a]=c;const u=c.offset.clone(),h=c.repeat.clone(),d=n.clone().sub(u),f=t.clone().sub(h);this._properties.push({name:a,initialOffset:u,deltaOffset:d,initialScale:h,deltaScale:f})}))}applyWeight(e){this._properties.forEach(t=>{const n=this.material[t.name];n!==void 0&&(n.offset.add(Kf.copy(t.deltaOffset).multiplyScalar(e)),n.repeat.add(Kf.copy(t.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{const t=this.material[e.name];t!==void 0&&(t.offset.copy(e.initialOffset),t.repeat.copy(e.initialScale))})}};Ng._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var Jf=Ng,oT=new Set(["1.0","1.0-beta"]),Fg=class Bg{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return pt(this,null,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return pt(this,null,function*(){const t=yield this._v1Import(e);if(t)return t;const n=yield this._v0Import(e);return n||null})}_v1Import(e){return pt(this,null,function*(){var t,n;const i=this.parser.json;if(!(((t=i.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;const o=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;const a=o.specVersion;if(!oT.has(a))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;const l=o.expressions;if(!l)return null;const c=new Set(Object.values(Xu)),u=new Map;l.preset!=null&&Object.entries(l.preset).forEach(([d,f])=>{if(f!=null){if(!c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${d}" detected. Ignoring the expression`);return}u.set(d,f)}}),l.custom!=null&&Object.entries(l.custom).forEach(([d,f])=>{if(c.has(d)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${d}". Ignoring the expression`);return}u.set(d,f)});const h=new Zf;return yield Promise.all(Array.from(u.entries()).map(d=>pt(this,[d],function*([f,m]){var _,g,p,y,x,v,C;const T=new qf(f);if(e.scene.add(T),T.isBinary=(_=m.isBinary)!=null?_:!1,T.overrideBlink=(g=m.overrideBlink)!=null?g:"none",T.overrideLookAt=(p=m.overrideLookAt)!=null?p:"none",T.overrideMouth=(y=m.overrideMouth)!=null?y:"none",(x=m.morphTargetBinds)==null||x.forEach(E=>pt(this,null,function*(){var R;if(E.node===void 0||E.index===void 0)return;const b=yield Yf(e,E.node),M=E.index;if(!b.every(I=>Array.isArray(I.morphTargetInfluences)&&M<I.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${m.name} attempts to index morph #${M} but not found.`);return}T.addBind(new Bl({primitives:b,index:M,weight:(R=E.weight)!=null?R:1}))})),m.materialColorBinds||m.textureTransformBinds){const E=[];e.scene.traverse(R=>{const b=R.material;b&&(Array.isArray(b)?E.push(...b):E.push(b))}),(v=m.materialColorBinds)==null||v.forEach(R=>pt(this,null,function*(){E.filter(M=>{var I;const V=(I=this.parser.associations.get(M))==null?void 0:I.materials;return R.material===V}).forEach(M=>{T.addBind(new $f({material:M,type:R.type,targetValue:new Z().fromArray(R.targetValue),targetAlpha:R.targetValue[3]}))})})),(C=m.textureTransformBinds)==null||C.forEach(R=>pt(this,null,function*(){E.filter(M=>{var I;const V=(I=this.parser.associations.get(M))==null?void 0:I.materials;return R.material===V}).forEach(M=>{var I,V;T.addBind(new Jf({material:M,offset:new K().fromArray((I=R.offset)!=null?I:[0,0]),scale:new K().fromArray((V=R.scale)!=null?V:[1,1])}))})}))}h.registerExpression(T)}))),h})}_v0Import(e){return pt(this,null,function*(){var t;const n=this.parser.json,i=(t=n.extensions)==null?void 0:t.VRM;if(!i)return null;const r=i.blendShapeMaster;if(!r)return null;const o=new Zf,a=r.blendShapeGroups;if(!a)return o;const l=new Set;return yield Promise.all(a.map(c=>pt(this,null,function*(){var u;const h=c.presetName,d=h!=null&&Bg.v0v1PresetNameMap[h]||null,f=d??c.name;if(f==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(l.has(f)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${h} has duplicated entries. Ignoring the expression`);return}l.add(f);const m=new qf(f);e.scene.add(m),m.isBinary=(u=c.isBinary)!=null?u:!1,c.binds&&c.binds.forEach(g=>pt(this,null,function*(){var p;if(g.mesh===void 0||g.index===void 0)return;const y=[];if((p=n.nodes)==null||p.forEach((v,C)=>{v.mesh===g.mesh&&y.push(C)}),y.length===0){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to bind a morph target to the mesh #${g.mesh} but the mesh is not found or not used in the scene. Ignoring the bind.`);return}const x=g.index;yield Promise.all(y.map(v=>pt(this,null,function*(){var C;const T=yield Yf(e,v);if(!T.every(E=>Array.isArray(E.morphTargetInfluences)&&x<E.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to index ${x}th morph but not found.`);return}m.addBind(new Bl({primitives:T,index:x,weight:.01*((C=g.weight)!=null?C:100)}))})))}));const _=c.materialValues;_&&_.length!==0&&_.forEach(g=>{if(g.materialName===void 0||g.propertyName===void 0||g.targetValue===void 0)return;const p=[];e.scene.traverse(x=>{if(x.material){const v=x.material;Array.isArray(v)?p.push(...v.filter(C=>(C.name===g.materialName||C.name===g.materialName+" (Outline)")&&p.indexOf(C)===-1)):v.name===g.materialName&&p.indexOf(v)===-1&&p.push(v)}});const y=g.propertyName;p.forEach(x=>{if(y==="_MainTex_ST"){const C=new K(g.targetValue[0],g.targetValue[1]),T=new K(g.targetValue[2],g.targetValue[3]);T.y=1-T.y-C.y,m.addBind(new Jf({material:x,scale:C,offset:T}));return}const v=sT[y];if(v){m.addBind(new $f({material:x,type:v,targetValue:new Z().fromArray(g.targetValue),targetAlpha:g.targetValue[3]}));return}console.warn(y+" is not supported")})}),o.registerExpression(m)}))),o})}};Fg.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var aT=Fg,Qh=class wr{constructor(e,t){this._firstPersonOnlyLayer=wr.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=wr.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=t}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(t=>({meshes:t.meshes.concat(),type:t.type})),this}clone(){return new wr(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=wr.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:t=wr.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=t,this.meshAnnotations.forEach(n=>{n.meshes.forEach(i=>{n.type==="firstPersonOnly"?(i.layers.set(this._firstPersonOnlyLayer),i.traverse(r=>r.layers.set(this._firstPersonOnlyLayer))):n.type==="thirdPersonOnly"?(i.layers.set(this._thirdPersonOnlyLayer),i.traverse(r=>r.layers.set(this._thirdPersonOnlyLayer))):n.type==="auto"&&this._createHeadlessModel(i)})}),this._initializedLayers=!0)}_excludeTriangles(e,t,n,i){let r=0;if(t!=null&&t.length>0)for(let o=0;o<e.length;o+=3){const a=e[o],l=e[o+1],c=e[o+2],u=t[a],h=n[a];if(u[0]>0&&i.includes(h[0])||u[1]>0&&i.includes(h[1])||u[2]>0&&i.includes(h[2])||u[3]>0&&i.includes(h[3]))continue;const d=t[l],f=n[l];if(d[0]>0&&i.includes(f[0])||d[1]>0&&i.includes(f[1])||d[2]>0&&i.includes(f[2])||d[3]>0&&i.includes(f[3]))continue;const m=t[c],_=n[c];m[0]>0&&i.includes(_[0])||m[1]>0&&i.includes(_[1])||m[2]>0&&i.includes(_[2])||m[3]>0&&i.includes(_[3])||(e[r++]=a,e[r++]=l,e[r++]=c)}return r}_createErasedMesh(e,t){const n=new ac(e.geometry.clone(),e.material);n.name=`${e.name}(erase)`,n.frustumCulled=e.frustumCulled,n.layers.set(this._firstPersonOnlyLayer);const i=n.geometry,r=i.getAttribute("skinIndex"),o=r instanceof zu?[]:r.array,a=[];for(let _=0;_<o.length;_+=4)a.push([o[_],o[_+1],o[_+2],o[_+3]]);const l=i.getAttribute("skinWeight"),c=l instanceof zu?[]:l.array,u=[];for(let _=0;_<c.length;_+=4)u.push([c[_],c[_+1],c[_+2],c[_+3]]);const h=i.getIndex();if(!h)throw new Error("The geometry doesn't have an index buffer");const d=Array.from(h.array),f=this._excludeTriangles(d,u,a,t),m=[];for(let _=0;_<f;_++)m[_]=d[_];return i.setIndex(m),e.onBeforeRender&&(n.onBeforeRender=e.onBeforeRender),n.bind(new ss(e.skeleton.bones,e.skeleton.boneInverses),new Le),n}_createHeadlessModelForSkinnedMesh(e,t){const n=[];if(t.skeleton.bones.forEach((r,o)=>{this._isEraseTarget(r)&&n.push(o)}),!n.length){t.layers.enable(this._thirdPersonOnlyLayer),t.layers.enable(this._firstPersonOnlyLayer);return}t.layers.set(this._thirdPersonOnlyLayer);const i=this._createErasedMesh(t,n);e.add(i)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer));else{const t=new Ge;t.name=`_headless_${e.name}`,t.layers.set(this._firstPersonOnlyLayer),e.parent.add(t),e.children.filter(n=>n.type==="SkinnedMesh").forEach(n=>{const i=n;this._createHeadlessModelForSkinnedMesh(t,i)})}else if(e.type==="SkinnedMesh"){const t=e;this._createHeadlessModelForSkinnedMesh(e.parent,t)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(t=>t.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};Qh.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;Qh.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var Qf=Qh,lT=new Set(["1.0","1.0-beta"]),cT=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(s){this.parser=s}afterRoot(s){return pt(this,null,function*(){const e=s.userData.vrmHumanoid;if(e!==null){if(e===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");s.userData.vrmFirstPerson=yield this._import(s,e)}})}_import(s,e){return pt(this,null,function*(){if(e==null)return null;const t=yield this._v1Import(s,e);if(t)return t;const n=yield this._v0Import(s,e);return n||null})}_v1Import(s,e){return pt(this,null,function*(){var t,n;const i=this.parser.json;if(!(((t=i.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;const o=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;const a=o.specVersion;if(!lT.has(a))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;const l=o.firstPerson,c=[],u=yield jf(s);return Array.from(u.entries()).forEach(([h,d])=>{var f,m;const _=(f=l?.meshAnnotations)==null?void 0:f.find(g=>g.node===h);c.push({meshes:d,type:(m=_?.type)!=null?m:"auto"})}),new Qf(e,c)})}_v0Import(s,e){return pt(this,null,function*(){var t;const n=this.parser.json,i=(t=n.extensions)==null?void 0:t.VRM;if(!i)return null;const r=i.firstPerson;if(!r)return null;const o=[],a=yield jf(s);return Array.from(a.entries()).forEach(([l,c])=>{const u=n.nodes[l],h=r.meshAnnotations?r.meshAnnotations.find(d=>d.mesh===u.mesh):void 0;o.push({meshes:c,type:this._convertV0FlagToV1Type(h?.firstPersonFlag)})}),new Qf(e,o)})}_convertV0FlagToV1Type(s){return s==="FirstPersonOnly"?"firstPersonOnly":s==="ThirdPersonOnly"?"thirdPersonOnly":s==="Both"?"both":"auto"}},ep=new w,tp=new w,uT=new $e,np=class extends Ge{constructor(s){super(),this.vrmHumanoid=s,this._boneAxesMap=new Map,Object.values(s.humanBones).forEach(e=>{const t=new wg(1);t.matrixAutoUpdate=!1,t.material.depthTest=!1,t.material.depthWrite=!1,this.add(t),this._boneAxesMap.set(e,t)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(s=>{s.geometry.dispose(),s.material.dispose()})}updateMatrixWorld(s){Array.from(this._boneAxesMap.entries()).forEach(([e,t])=>{e.node.updateWorldMatrix(!0,!1),e.node.matrixWorld.decompose(ep,uT,tp);const n=ep.set(.1,.1,.1).divide(tp);t.matrix.copy(e.node.matrixWorld).scale(n)}),super.updateMatrixWorld(s)}},fu=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"],hT={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function kg(s){return s.invert?s.invert():s.inverse(),s}var bs=new w,ws=new $e,qu=class{constructor(s){this.humanBones=s,this.restPose=this.getAbsolutePose()}getAbsolutePose(){const s={};return Object.keys(this.humanBones).forEach(e=>{const t=e,n=this.getBoneNode(t);n&&(bs.copy(n.position),ws.copy(n.quaternion),s[t]={position:bs.toArray(),rotation:ws.toArray()})}),s}getPose(){const s={};return Object.keys(this.humanBones).forEach(e=>{const t=e,n=this.getBoneNode(t);if(!n)return;bs.set(0,0,0),ws.identity();const i=this.restPose[t];i?.position&&bs.fromArray(i.position).negate(),i?.rotation&&kg(ws.fromArray(i.rotation)),bs.add(n.position),ws.premultiply(n.quaternion),s[t]={position:bs.toArray(),rotation:ws.toArray()}}),s}setPose(s){Object.entries(s).forEach(([e,t])=>{const n=e,i=this.getBoneNode(n);if(!i)return;const r=this.restPose[n];r&&(t?.position&&(i.position.fromArray(t.position),r.position&&i.position.add(bs.fromArray(r.position))),t?.rotation&&(i.quaternion.fromArray(t.rotation),r.rotation&&i.quaternion.multiply(ws.fromArray(r.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([s,e])=>{const t=this.getBoneNode(s);t&&(e?.position&&t.position.fromArray(e.position),e?.rotation&&t.quaternion.fromArray(e.rotation))})}getBone(s){var e;return(e=this.humanBones[s])!=null?e:void 0}getBoneNode(s){var e,t;return(t=(e=this.humanBones[s])==null?void 0:e.node)!=null?t:null}},pu=new w,dT=new $e,fT=new w,ip=class Vg extends qu{static _setupTransforms(e){const t=new rt;t.name="VRMHumanoidRig";const n={},i={},r={};fu.forEach(a=>{var l;const c=e.getBoneNode(a);if(c){const u=new w,h=new $e;c.updateWorldMatrix(!0,!1),c.matrixWorld.decompose(u,h,pu),n[a]=u,i[a]=c.quaternion.clone();const d=new $e;(l=c.parent)==null||l.matrixWorld.decompose(pu,d,pu),r[a]=d}});const o={};return fu.forEach(a=>{var l;const c=e.getBoneNode(a);if(c){const u=n[a];let h=a,d;for(;d==null&&(h=hT[h],h!=null);)d=n[h];const f=new rt;f.name="Normalized_"+c.name,(h?(l=o[h])==null?void 0:l.node:t).add(f),f.position.copy(u),d&&f.position.sub(d),o[a]={node:f}}}),{rigBones:o,root:t,parentWorldRotations:r,boneRotations:i}}constructor(e){const{rigBones:t,root:n,parentWorldRotations:i,boneRotations:r}=Vg._setupTransforms(e);super(t),this.original=e,this.root=n,this._parentWorldRotations=i,this._boneRotations=r}update(){fu.forEach(e=>{const t=this.original.getBoneNode(e);if(t!=null){const n=this.getBoneNode(e),i=this._parentWorldRotations[e],r=dT.copy(i).invert(),o=this._boneRotations[e];if(t.quaternion.copy(n.quaternion).multiply(i).premultiply(r).multiply(o),e==="hips"){const a=n.getWorldPosition(fT);t.parent.updateWorldMatrix(!0,!1);const l=t.parent.matrixWorld,c=a.applyMatrix4(l.invert());t.position.copy(c)}}})}},sp=class zg{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(e,t){var n;this.autoUpdateHumanBones=(n=t?.autoUpdateHumanBones)!=null?n:!0,this._rawHumanBones=new qu(e),this._normalizedHumanBones=new ip(this._rawHumanBones)}copy(e){return this.autoUpdateHumanBones=e.autoUpdateHumanBones,this._rawHumanBones=new qu(e.humanBones),this._normalizedHumanBones=new ip(this._rawHumanBones),this}clone(){return new zg(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(e){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(e)}setRawPose(e){return this._rawHumanBones.setPose(e)}setNormalizedPose(e){return this._normalizedHumanBones.setPose(e)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(e){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(e)}getRawBone(e){return this._rawHumanBones.getBone(e)}getNormalizedBone(e){return this._normalizedHumanBones.getBone(e)}getBoneNode(e){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(e)}getRawBoneNode(e){return this._rawHumanBones.getBoneNode(e)}getNormalizedBoneNode(e){return this._normalizedHumanBones.getBoneNode(e)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},pT={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},mT=new Set(["1.0","1.0-beta"]),rp={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},gT=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(s,e){this.parser=s,this.helperRoot=e?.helperRoot,this.autoUpdateHumanBones=e?.autoUpdateHumanBones}afterRoot(s){return pt(this,null,function*(){s.userData.vrmHumanoid=yield this._import(s)})}_import(s){return pt(this,null,function*(){const e=yield this._v1Import(s);if(e)return e;const t=yield this._v0Import(s);return t||null})}_v1Import(s){return pt(this,null,function*(){var e,t;const n=this.parser.json;if(!(((e=n.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;const r=(t=n.extensions)==null?void 0:t.VRMC_vrm;if(!r)return null;const o=r.specVersion;if(!mT.has(o))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${o}"`),null;const a=r.humanoid;if(!a)return null;const l=a.humanBones.leftThumbIntermediate!=null||a.humanBones.rightThumbIntermediate!=null,c={};a.humanBones!=null&&(yield Promise.all(Object.entries(a.humanBones).map(h=>pt(this,[h],function*([d,f]){let m=d;const _=f.node;if(l){const p=rp[m];p!=null&&(m=p)}const g=yield this.parser.getDependency("node",_);if(g==null){console.warn(`A glTF node bound to the humanoid bone ${m} (index = ${_}) does not exist`);return}c[m]={node:g}}))));const u=new sp(this._ensureRequiredBonesExist(c),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(s.scene.add(u.normalizedHumanBonesRoot),this.helperRoot){const h=new np(u);this.helperRoot.add(h),h.renderOrder=this.helperRoot.renderOrder}return u})}_v0Import(s){return pt(this,null,function*(){var e;const n=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!n)return null;const i=n.humanoid;if(!i)return null;const r={};i.humanBones!=null&&(yield Promise.all(i.humanBones.map(a=>pt(this,null,function*(){const l=a.bone,c=a.node;if(l==null||c==null)return;if(c<0){console.warn(`A glTF node index for the humanoid bone ${l} is negative (${c}), ignoring this bone.`);return}const u=yield this.parser.getDependency("node",c);if(u==null){console.warn(`A glTF node bound to the humanoid bone ${l} (index = ${c}) does not exist`);return}const h=rp[l],d=h??l;if(r[d]!=null){console.warn(`Multiple bone entries for ${d} detected (index = ${c}), ignoring duplicated entries.`);return}r[d]={node:u}}))));const o=new sp(this._ensureRequiredBonesExist(r),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(s.scene.add(o.normalizedHumanBonesRoot),this.helperRoot){const a=new np(o);this.helperRoot.add(a),a.renderOrder=this.helperRoot.renderOrder}return o})}_ensureRequiredBonesExist(s){const e=Object.values(pT).filter(t=>s[t]==null);if(e.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${e.join(", ")}`);return s}},op=class extends Ve{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new Ze(new Float32Array(195),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ze(new Uint16Array(189),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,s=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,s=!0),s&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let s=0;s<64;s++){const e=s/63*this._currentTheta;this._attrPos.setXYZ(s+1,this._currentRadius*Math.sin(e),0,this._currentRadius*Math.cos(e))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<63;s++)this._attrIndex.setXYZ(s*3,0,s+1,s+2);this._attrIndex.needsUpdate=!0}},_T=class extends Ve{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new w,this._currentTail=new w,this._attrPos=new Ze(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ze(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,s=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),s=!0),s&&this._buildPosition()}_buildPosition(){for(let s=0;s<32;s++){const e=s/16*Math.PI;this._attrPos.setXYZ(s,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+s,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+s,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(64+s*2,32+s,32+e),this._attrIndex.setXY(128+s*2,64+s,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},Wa=new $e,ap=new $e,uo=new w,lp=new w,cp=Math.sqrt(2)/2,vT=new $e(0,0,-cp,cp),xT=new w(0,1,0),yT=class extends Ge{constructor(s){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=s;{const e=new op;e.radius=.5;const t=new Mt({color:65280,transparent:!0,opacity:.5,side:qt,depthTest:!1,depthWrite:!1});this._meshPitch=new je(e,t),this.add(this._meshPitch)}{const e=new op;e.radius=.5;const t=new Mt({color:16711680,transparent:!0,opacity:.5,side:qt,depthTest:!1,depthWrite:!1});this._meshYaw=new je(e,t),this.add(this._meshYaw)}{const e=new _T;e.radius=.1;const t=new kt({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new xn(e,t),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(s){const e=Et.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=e,this._meshYaw.geometry.update();const t=Et.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=t,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(uo),this.vrmLookAt.getLookAtWorldQuaternion(Wa),Wa.multiply(this.vrmLookAt.getFaceFrontQuaternion(ap)),this._meshYaw.position.copy(uo),this._meshYaw.quaternion.copy(Wa),this._meshPitch.position.copy(uo),this._meshPitch.quaternion.copy(Wa),this._meshPitch.quaternion.multiply(ap.setFromAxisAngle(xT,e)),this._meshPitch.quaternion.multiply(vT);const{target:n,autoUpdate:i}=this.vrmLookAt;n!=null&&i&&(n.getWorldPosition(lp).sub(uo),this._lineTarget.geometry.tail.copy(lp),this._lineTarget.geometry.update(),this._lineTarget.position.copy(uo)),super.updateMatrixWorld(s)}},MT=new w,ST=new w;function Yu(s,e){return s.matrixWorld.decompose(MT,e,ST),e}function Ka(s){return[Math.atan2(-s.z,s.x),Math.atan2(s.y,Math.sqrt(s.x*s.x+s.z*s.z))]}function up(s){const e=Math.round(s/2/Math.PI);return s-2*Math.PI*e}var hp=new w(0,0,1),bT=new w,wT=new w,TT=new w,AT=new $e,mu=new $e,dp=new $e,ET=new $e,gu=new on,Hg=class Gg{constructor(e,t){this.offsetFromHeadBone=new w,this.autoUpdate=!0,this.faceFront=new w(0,0,1),this.humanoid=e,this.applier=t,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new $e)}get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new on)}getEuler(e){return e.set(Et.DEG2RAD*this._pitch,Et.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new Gg(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){const t=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(t.matrixWorld)}getLookAtWorldQuaternion(e){const t=this.humanoid.getRawBoneNode("head");return Yu(t,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(hp)<.01)return e.copy(this._restHeadWorldQuaternion).invert();const[t,n]=Ka(this.faceFront);return gu.set(0,.5*Math.PI+t,n,"YZX"),e.setFromEuler(gu).premultiply(ET.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(mu),this.getFaceFrontQuaternion(dp),e.copy(hp).applyQuaternion(mu).applyQuaternion(dp).applyEuler(this.getEuler(gu))}lookAt(e){const t=AT.copy(this._restHeadWorldQuaternion).multiply(kg(this.getLookAtWorldQuaternion(mu))),n=this.getLookAtWorldPosition(wT),i=TT.copy(e).sub(n).applyQuaternion(t).normalize(),[r,o]=Ka(this.faceFront),[a,l]=Ka(i),c=up(a-r),u=up(o-l);this._yaw=Et.RAD2DEG*c,this._pitch=Et.RAD2DEG*u,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(bT)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};Hg.EULER_ORDER="YXZ";var RT=Hg,CT=new w(0,0,1),Zn=new $e,Mr=new $e,Ln=new on(0,0,0,"YXZ"),Ja=class{constructor(s,e,t,n,i){this.humanoid=s,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=i,this.faceFront=new w(0,0,1),this._restQuatLeftEye=new $e,this._restQuatRightEye=new $e,this._restLeftEyeParentWorldQuat=new $e,this._restRightEyeParentWorldQuat=new $e;const r=this.humanoid.getRawBoneNode("leftEye"),o=this.humanoid.getRawBoneNode("rightEye");r&&(this._restQuatLeftEye.copy(r.quaternion),Yu(r.parent,this._restLeftEyeParentWorldQuat)),o&&(this._restQuatRightEye.copy(o.quaternion),Yu(o.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(s,e){const t=this.humanoid.getRawBoneNode("leftEye"),n=this.humanoid.getRawBoneNode("rightEye"),i=this.humanoid.getNormalizedBoneNode("leftEye"),r=this.humanoid.getNormalizedBoneNode("rightEye");t&&(e<0?Ln.x=-Et.DEG2RAD*this.rangeMapVerticalDown.map(-e):Ln.x=Et.DEG2RAD*this.rangeMapVerticalUp.map(e),s<0?Ln.y=-Et.DEG2RAD*this.rangeMapHorizontalInner.map(-s):Ln.y=Et.DEG2RAD*this.rangeMapHorizontalOuter.map(s),Zn.setFromEuler(Ln),this._getWorldFaceFrontQuat(Mr),i.quaternion.copy(Mr).multiply(Zn).multiply(Mr.invert()),Zn.copy(this._restLeftEyeParentWorldQuat),t.quaternion.copy(i.quaternion).multiply(Zn).premultiply(Zn.invert()).multiply(this._restQuatLeftEye)),n&&(e<0?Ln.x=-Et.DEG2RAD*this.rangeMapVerticalDown.map(-e):Ln.x=Et.DEG2RAD*this.rangeMapVerticalUp.map(e),s<0?Ln.y=-Et.DEG2RAD*this.rangeMapHorizontalOuter.map(-s):Ln.y=Et.DEG2RAD*this.rangeMapHorizontalInner.map(s),Zn.setFromEuler(Ln),this._getWorldFaceFrontQuat(Mr),r.quaternion.copy(Mr).multiply(Zn).multiply(Mr.invert()),Zn.copy(this._restRightEyeParentWorldQuat),n.quaternion.copy(r.quaternion).multiply(Zn).premultiply(Zn.invert()).multiply(this._restQuatRightEye))}lookAt(s){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");const e=Et.RAD2DEG*s.y,t=Et.RAD2DEG*s.x;this.applyYawPitch(e,t)}_getWorldFaceFrontQuat(s){if(this.faceFront.distanceToSquared(CT)<.01)return s.identity();const[e,t]=Ka(this.faceFront);return Ln.set(0,.5*Math.PI+e,t,"YZX"),s.setFromEuler(Ln)}};Ja.type="bone";var ju=class{constructor(s,e,t,n,i){this.expressions=s,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=t,this.rangeMapVerticalDown=n,this.rangeMapVerticalUp=i}applyYawPitch(s,e){e<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-e))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(e))),s<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-s))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(s)))}lookAt(s){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");const e=Et.RAD2DEG*s.y,t=Et.RAD2DEG*s.x;this.applyYawPitch(e,t)}};ju.type="expression";var fp=class{constructor(s,e){this.inputMaxValue=s,this.outputScale=e}map(s){return this.outputScale*Ig(s/this.inputMaxValue)}},PT=new Set(["1.0","1.0-beta"]),Xa=.01,IT=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(s,e){this.parser=s,this.helperRoot=e?.helperRoot}afterRoot(s){return pt(this,null,function*(){const e=s.userData.vrmHumanoid;if(e===null)return;if(e===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");const t=s.userData.vrmExpressionManager;if(t!==null){if(t===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");s.userData.vrmLookAt=yield this._import(s,e,t)}})}_import(s,e,t){return pt(this,null,function*(){if(e==null||t==null)return null;const n=yield this._v1Import(s,e,t);if(n)return n;const i=yield this._v0Import(s,e,t);return i||null})}_v1Import(s,e,t){return pt(this,null,function*(){var n,i,r;const o=this.parser.json;if(!(((n=o.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;const l=(i=o.extensions)==null?void 0:i.VRMC_vrm;if(!l)return null;const c=l.specVersion;if(!PT.has(c))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${c}"`),null;const u=l.lookAt;if(!u)return null;const h=u.type==="expression"?1:10,d=this._v1ImportRangeMap(u.rangeMapHorizontalInner,h),f=this._v1ImportRangeMap(u.rangeMapHorizontalOuter,h),m=this._v1ImportRangeMap(u.rangeMapVerticalDown,h),_=this._v1ImportRangeMap(u.rangeMapVerticalUp,h);let g;u.type==="expression"?g=new ju(t,d,f,m,_):g=new Ja(e,d,f,m,_);const p=this._importLookAt(e,g);return p.offsetFromHeadBone.fromArray((r=u.offsetFromHeadBone)!=null?r:[0,.06,0]),p})}_v1ImportRangeMap(s,e){var t,n;let i=(t=s?.inputMaxValue)!=null?t:90;const r=(n=s?.outputScale)!=null?n:e;return i<Xa&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),i=Xa),new fp(i,r)}_v0Import(s,e,t){return pt(this,null,function*(){var n,i,r,o;const l=(n=this.parser.json.extensions)==null?void 0:n.VRM;if(!l)return null;const c=l.firstPerson;if(!c)return null;const u=c.lookAtTypeName==="BlendShape"?1:10,h=this._v0ImportDegreeMap(c.lookAtHorizontalInner,u),d=this._v0ImportDegreeMap(c.lookAtHorizontalOuter,u),f=this._v0ImportDegreeMap(c.lookAtVerticalDown,u),m=this._v0ImportDegreeMap(c.lookAtVerticalUp,u);let _;c.lookAtTypeName==="BlendShape"?_=new ju(t,h,d,f,m):_=new Ja(e,h,d,f,m);const g=this._importLookAt(e,_);return c.firstPersonBoneOffset?g.offsetFromHeadBone.set((i=c.firstPersonBoneOffset.x)!=null?i:0,(r=c.firstPersonBoneOffset.y)!=null?r:.06,-((o=c.firstPersonBoneOffset.z)!=null?o:0)):g.offsetFromHeadBone.set(0,.06,0),g.faceFront.set(0,0,-1),_ instanceof Ja&&_.faceFront.set(0,0,-1),g})}_v0ImportDegreeMap(s,e){var t,n;const i=s?.curve;JSON.stringify(i)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let r=(t=s?.xRange)!=null?t:90;const o=(n=s?.yRange)!=null?n:e;return r<Xa&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),r=Xa),new fp(r,o)}_importLookAt(s,e){const t=new RT(s,e);if(this.helperRoot){const n=new yT(t);this.helperRoot.add(n),n.renderOrder=this.helperRoot.renderOrder}return t}};function LT(s,e){return typeof s!="string"||s===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(s)&&(e=e.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(s)||/^data:.*,.*$/i.test(s)||/^blob:.*$/i.test(s)?s:e+s)}var UT=new Set(["1.0","1.0-beta"]),DT=class{get name(){return"VRMMetaLoaderPlugin"}constructor(s,e){var t,n,i;this.parser=s,this.needThumbnailImage=(t=e?.needThumbnailImage)!=null?t:!1,this.acceptLicenseUrls=(n=e?.acceptLicenseUrls)!=null?n:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(i=e?.acceptV0Meta)!=null?i:!0}afterRoot(s){return pt(this,null,function*(){s.userData.vrmMeta=yield this._import(s)})}_import(s){return pt(this,null,function*(){const e=yield this._v1Import(s);if(e!=null)return e;const t=yield this._v0Import(s);return t??null})}_v1Import(s){return pt(this,null,function*(){var e,t,n;const i=this.parser.json;if(!(((e=i.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;const o=(t=i.extensions)==null?void 0:t.VRMC_vrm;if(o==null)return null;const a=o.specVersion;if(!UT.has(a))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;const l=o.meta;if(!l)return null;const c=l.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(c))throw new Error(`VRMMetaLoaderPlugin: The license url "${c}" is not accepted`);let h;return this.needThumbnailImage&&l.thumbnailImage!=null&&(h=(n=yield this._extractGLTFImage(l.thumbnailImage))!=null?n:void 0),{metaVersion:"1",name:l.name,version:l.version,authors:l.authors,copyrightInformation:l.copyrightInformation,contactInformation:l.contactInformation,references:l.references,thirdPartyLicenses:l.thirdPartyLicenses,thumbnailImage:h,licenseUrl:l.licenseUrl,avatarPermission:l.avatarPermission,allowExcessivelyViolentUsage:l.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:l.allowExcessivelySexualUsage,commercialUsage:l.commercialUsage,allowPoliticalOrReligiousUsage:l.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:l.allowAntisocialOrHateUsage,creditNotation:l.creditNotation,allowRedistribution:l.allowRedistribution,modification:l.modification,otherLicenseUrl:l.otherLicenseUrl}})}_v0Import(s){return pt(this,null,function*(){var e;const n=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!n)return null;const i=n.meta;if(!i)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let r;return this.needThumbnailImage&&i.texture!=null&&i.texture!==-1&&(r=yield this.parser.getDependency("texture",i.texture)),{metaVersion:"0",allowedUserName:i.allowedUserName,author:i.author,commercialUssageName:i.commercialUssageName,contactInformation:i.contactInformation,licenseName:i.licenseName,otherLicenseUrl:i.otherLicenseUrl,otherPermissionUrl:i.otherPermissionUrl,reference:i.reference,sexualUssageName:i.sexualUssageName,texture:r??void 0,title:i.title,version:i.version,violentUssageName:i.violentUssageName}})}_extractGLTFImage(s){return pt(this,null,function*(){var e;const n=(e=this.parser.json.images)==null?void 0:e[s];if(n==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${s}] of glTF as a thumbnail but the image doesn't exist`),null;let i=n.uri;if(n.bufferView!=null){const o=yield this.parser.getDependency("bufferView",n.bufferView),a=new Blob([o],{type:n.mimeType});i=URL.createObjectURL(a)}return i==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${s}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new Br().loadAsync(LT(i,this.parser.options.path)).catch(o=>(console.error(o),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},NT=class{constructor(s){this.scene=s.scene,this.meta=s.meta,this.humanoid=s.humanoid,this.expressionManager=s.expressionManager,this.firstPerson=s.firstPerson,this.lookAt=s.lookAt}update(s){this.humanoid.update(),this.lookAt&&this.lookAt.update(s),this.expressionManager&&this.expressionManager.update()}},OT=class extends NT{constructor(s){super(s),this.materials=s.materials,this.springBoneManager=s.springBoneManager,this.nodeConstraintManager=s.nodeConstraintManager}update(s){super.update(s),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(s),this.materials&&this.materials.forEach(e=>{e.update&&e.update(s)})}},FT=Object.defineProperty,pp=Object.getOwnPropertySymbols,BT=Object.prototype.hasOwnProperty,kT=Object.prototype.propertyIsEnumerable,mp=(s,e,t)=>e in s?FT(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,gp=(s,e)=>{for(var t in e||(e={}))BT.call(e,t)&&mp(s,t,e[t]);if(pp)for(var t of pp(e))kT.call(e,t)&&mp(s,t,e[t]);return s},Os=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),VT={"":3e3,srgb:3001};function zT(s,e){parseInt(Ki,10)>=152?s.colorSpace=e:s.encoding=VT[e]}var HT=class{get pending(){return Promise.all(this._pendings)}constructor(s,e){this._parser=s,this._materialParams=e,this._pendings=[]}assignPrimitive(s,e){e!=null&&(this._materialParams[s]=e)}assignColor(s,e,t){if(e!=null){const n=new Z().fromArray(e);t&&n.convertSRGBToLinear(),this._materialParams[s]=n}}assignTexture(s,e,t){return Os(this,null,function*(){const n=Os(this,null,function*(){if(e!=null){const i=yield this._parser.assignTexture(this._materialParams,s,e);if(i==null){console.warn("GLTFMToonMaterialParamsAssignHelper: Failed to load texture. The rendering result may be wrong");return}t&&zT(i,"srgb")}});return this._pendings.push(n),n})}assignTextureByIndex(s,e,t){return Os(this,null,function*(){return this.assignTexture(s,e!=null?{index:e}:void 0,t)})}},GT=`// #define PHONG

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

}`,WT=`// #define PHONG

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
`,XT={None:"none"},_p={None:"none",ScreenCoordinates:"screenCoordinates"},qT={3e3:"",3001:"srgb"};function _u(s){return parseInt(Ki,10)>=152?s.colorSpace:qT[s.encoding]}var YT=class extends Ut{constructor(s={}){var e;super({vertexShader:GT,fragmentShader:WT}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=Ii,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=XT.None,this._outlineWidthMode=_p.None,this._isOutline=!1,s.transparentWithZWrite&&(s.depthWrite=!0),delete s.transparentWithZWrite,s.fog=!0,s.lights=!0,s.clipping=!0,this.uniforms=Ci.merge([ve.common,ve.normalmap,ve.emissivemap,ve.fog,ve.lights,{litFactor:{value:new Z(1,1,1)},mapUvTransform:{value:new We},colorAlpha:{value:1},normalMapUvTransform:{value:new We},shadeColorFactor:{value:new Z(0,0,0)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new We},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new We},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new Z(1,1,1)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new We},parametricRimColorFactor:{value:new Z(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new We},rimLightingMixFactor:{value:1},parametricRimFresnelPowerFactor:{value:5},parametricRimLiftFactor:{value:0},emissive:{value:new Z(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new We},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new We},outlineWidthFactor:{value:0},outlineColorFactor:{value:new Z(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new We},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(e=s.uniforms)!=null?e:{}]),this.setValues(s),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([t,n])=>`${t}:${n}`),this.matcapTexture?`matcapTextureColorSpace:${_u(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${_u(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${_u(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=t=>{const n=parseInt(Ki,10),i=Object.entries(gp(gp({},this._generateDefines()),this.defines)).filter(([r,o])=>!!o).map(([r,o])=>`#define ${r} ${o}`).join(`
`)+`
`;t.vertexShader=i+t.vertexShader,t.fragmentShader=i+t.fragmentShader,n<154&&(t.fragmentShader=t.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>"))}}get color(){return this.uniforms.litFactor.value}set color(s){this.uniforms.litFactor.value=s}get map(){return this.uniforms.map.value}set map(s){this.uniforms.map.value=s}get normalMap(){return this.uniforms.normalMap.value}set normalMap(s){this.uniforms.normalMap.value=s}get normalScale(){return this.uniforms.normalScale.value}set normalScale(s){this.uniforms.normalScale.value=s}get emissive(){return this.uniforms.emissive.value}set emissive(s){this.uniforms.emissive.value=s}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(s){this.uniforms.emissiveIntensity.value=s}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(s){this.uniforms.emissiveMap.value=s}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(s){this.uniforms.shadeColorFactor.value=s}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(s){this.uniforms.shadeMultiplyTexture.value=s}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(s){this.uniforms.shadingShiftFactor.value=s}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(s){this.uniforms.shadingShiftTexture.value=s}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(s){this.uniforms.shadingShiftTextureScale.value=s}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(s){this.uniforms.shadingToonyFactor.value=s}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(s){this.uniforms.giEqualizationFactor.value=s}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(s){this.uniforms.matcapFactor.value=s}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(s){this.uniforms.matcapTexture.value=s}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(s){this.uniforms.parametricRimColorFactor.value=s}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(s){this.uniforms.rimMultiplyTexture.value=s}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(s){this.uniforms.rimLightingMixFactor.value=s}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(s){this.uniforms.parametricRimFresnelPowerFactor.value=s}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(s){this.uniforms.parametricRimLiftFactor.value=s}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(s){this.uniforms.outlineWidthMultiplyTexture.value=s}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(s){this.uniforms.outlineWidthFactor.value=s}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(s){this.uniforms.outlineColorFactor.value=s}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(s){this.uniforms.outlineLightingMixFactor.value=s}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(s){this.uniforms.uvAnimationMaskTexture.value=s}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(s){this.uniforms.uvAnimationScrollXOffset.value=s}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(s){this.uniforms.uvAnimationScrollYOffset.value=s}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(s){this.uniforms.uvAnimationRotationPhase.value=s}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(s){this._ignoreVertexColor=s,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(s){this._v0CompatShade=s,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(s){this._debugMode=s,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(s){this._outlineWidthMode=s,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(s){this._isOutline=s,this.needsUpdate=!0}get isMToonMaterial(){return!0}update(s){this._uploadUniformsWorkaround(),this._updateUVAnimation(s)}copy(s){return super.copy(s),this.map=s.map,this.normalMap=s.normalMap,this.emissiveMap=s.emissiveMap,this.shadeMultiplyTexture=s.shadeMultiplyTexture,this.shadingShiftTexture=s.shadingShiftTexture,this.matcapTexture=s.matcapTexture,this.rimMultiplyTexture=s.rimMultiplyTexture,this.outlineWidthMultiplyTexture=s.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=s.uvAnimationMaskTexture,this.normalMapType=s.normalMapType,this.uvAnimationScrollXSpeedFactor=s.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=s.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=s.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=s.ignoreVertexColor,this.v0CompatShade=s.v0CompatShade,this.debugMode=s.debugMode,this.outlineWidthMode=s.outlineWidthMode,this.isOutline=s.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(s){this.uniforms.uvAnimationScrollXOffset.value+=s*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=s*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=s*this.uvAnimationRotationSpeedFactor,this.uniforms.alphaTest.value=this.alphaTest,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),this.uniformsNeedUpdate=!0}_generateDefines(){const s=parseInt(Ki,10),e=this.outlineWidthMultiplyTexture!==null,t=this.map!==null||this.normalMap!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:s,OUTLINE:this._isOutline,MTOON_USE_UV:e||t,MTOON_UVS_VERTEX_ONLY:e&&!t,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===_p.ScreenCoordinates}}_updateTextureMatrix(s,e){s.value&&(s.value.matrixAutoUpdate&&s.value.updateMatrix(),e.value.copy(s.value.matrix))}},jT=new Set(["1.0","1.0-beta"]),Wg=class Qa{get name(){return Qa.EXTENSION_NAME}constructor(e,t={}){var n,i,r,o;this.parser=e,this.materialType=(n=t.materialType)!=null?n:YT,this.renderOrderOffset=(i=t.renderOrderOffset)!=null?i:0,this.v0CompatShade=(r=t.v0CompatShade)!=null?r:!1,this.debugMode=(o=t.debugMode)!=null?o:"none",this._mToonMaterialSet=new Set}beforeRoot(){return Os(this,null,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(e){return Os(this,null,function*(){e.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(e){return this._getMToonExtension(e)?this.materialType:null}extendMaterialParams(e,t){const n=this._getMToonExtension(e);return n?this._extendMaterialParams(n,t):null}loadMesh(e){return Os(this,null,function*(){var t;const n=this.parser,r=(t=n.json.meshes)==null?void 0:t[e];if(r==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);const o=r.primitives,a=yield n.loadMesh(e);if(o.length===1){const l=a,c=o[0].material;c!=null&&this._setupPrimitive(l,c)}else{const l=a;for(let c=0;c<o.length;c++){const u=l.children[c],h=o[c].material;h!=null&&this._setupPrimitive(u,h)}}return a})}_removeUnlitExtensionIfMToonExists(){const n=this.parser.json.materials;n?.map((i,r)=>{var o;this._getMToonExtension(r)&&((o=i.extensions)!=null&&o.KHR_materials_unlit)&&delete i.extensions.KHR_materials_unlit})}_getMToonExtension(e){var t,n;const o=(t=this.parser.json.materials)==null?void 0:t[e];if(o==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}const a=(n=o.extensions)==null?void 0:n[Qa.EXTENSION_NAME];if(a==null)return;const l=a.specVersion;if(!jT.has(l)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${Qa.EXTENSION_NAME} specVersion "${l}"`);return}return a}_extendMaterialParams(e,t){return Os(this,null,function*(){var n;delete t.metalness,delete t.roughness;const i=new HT(this.parser,t);i.assignPrimitive("transparentWithZWrite",e.transparentWithZWrite),i.assignColor("shadeColorFactor",e.shadeColorFactor),i.assignTexture("shadeMultiplyTexture",e.shadeMultiplyTexture,!0),i.assignPrimitive("shadingShiftFactor",e.shadingShiftFactor),i.assignTexture("shadingShiftTexture",e.shadingShiftTexture,!0),i.assignPrimitive("shadingShiftTextureScale",(n=e.shadingShiftTexture)==null?void 0:n.scale),i.assignPrimitive("shadingToonyFactor",e.shadingToonyFactor),i.assignPrimitive("giEqualizationFactor",e.giEqualizationFactor),i.assignColor("matcapFactor",e.matcapFactor),i.assignTexture("matcapTexture",e.matcapTexture,!0),i.assignColor("parametricRimColorFactor",e.parametricRimColorFactor),i.assignTexture("rimMultiplyTexture",e.rimMultiplyTexture,!0),i.assignPrimitive("rimLightingMixFactor",e.rimLightingMixFactor),i.assignPrimitive("parametricRimFresnelPowerFactor",e.parametricRimFresnelPowerFactor),i.assignPrimitive("parametricRimLiftFactor",e.parametricRimLiftFactor),i.assignPrimitive("outlineWidthMode",e.outlineWidthMode),i.assignPrimitive("outlineWidthFactor",e.outlineWidthFactor),i.assignTexture("outlineWidthMultiplyTexture",e.outlineWidthMultiplyTexture,!1),i.assignColor("outlineColorFactor",e.outlineColorFactor),i.assignPrimitive("outlineLightingMixFactor",e.outlineLightingMixFactor),i.assignTexture("uvAnimationMaskTexture",e.uvAnimationMaskTexture,!1),i.assignPrimitive("uvAnimationScrollXSpeedFactor",e.uvAnimationScrollXSpeedFactor),i.assignPrimitive("uvAnimationScrollYSpeedFactor",e.uvAnimationScrollYSpeedFactor),i.assignPrimitive("uvAnimationRotationSpeedFactor",e.uvAnimationRotationSpeedFactor),i.assignPrimitive("v0CompatShade",this.v0CompatShade),i.assignPrimitive("debugMode",this.debugMode),yield i.pending})}_setupPrimitive(e,t){const n=this._getMToonExtension(t);if(n){const i=this._parseRenderOrder(n);e.renderOrder=i+this.renderOrderOffset,this._generateOutline(e),this._addToMaterialSet(e);return}}_shouldGenerateOutline(e){return typeof e.outlineWidthMode=="string"&&e.outlineWidthMode!=="none"&&typeof e.outlineWidthFactor=="number"&&e.outlineWidthFactor>0}_generateOutline(e){const t=e.material;if(!(t instanceof Bt)||!this._shouldGenerateOutline(t))return;e.material=[t];const n=t.clone();n.name+=" (Outline)",n.isOutline=!0,n.side=jt,e.material.push(n);const i=e.geometry,r=i.index?i.index.count:i.attributes.position.count/3;i.addGroup(0,r,0),i.addGroup(0,r,1)}_addToMaterialSet(e){const t=e.material,n=new Set;Array.isArray(t)?t.forEach(i=>n.add(i)):n.add(t);for(const i of n)this._mToonMaterialSet.add(i)}_parseRenderOrder(e){var t;return(e.transparentWithZWrite?0:19)+((t=e.renderQueueOffsetNumber)!=null?t:0)}};Wg.EXTENSION_NAME="VRMC_materials_mtoon";var ZT=Wg,$T=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),Xg=class Zu{get name(){return Zu.EXTENSION_NAME}constructor(e){this.parser=e}extendMaterialParams(e,t){return $T(this,null,function*(){const n=this._getHDREmissiveMultiplierExtension(e);if(n==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");const i=n.emissiveMultiplier;t.emissiveIntensity=i})}_getHDREmissiveMultiplierExtension(e){var t,n;const o=(t=this.parser.json.materials)==null?void 0:t[e];if(o==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}const a=(n=o.extensions)==null?void 0:n[Zu.EXTENSION_NAME];if(a!=null)return a}};Xg.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";var KT=Xg,JT=Object.defineProperty,QT=Object.defineProperties,eA=Object.getOwnPropertyDescriptors,vp=Object.getOwnPropertySymbols,tA=Object.prototype.hasOwnProperty,nA=Object.prototype.propertyIsEnumerable,xp=(s,e,t)=>e in s?JT(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,$n=(s,e)=>{for(var t in e||(e={}))tA.call(e,t)&&xp(s,t,e[t]);if(vp)for(var t of vp(e))nA.call(e,t)&&xp(s,t,e[t]);return s},yp=(s,e)=>QT(s,eA(e)),iA=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())});function Sr(s){return Math.pow(s,2.2)}var sA=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(s){var e;this.parser=s,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;const t=this.parser.json;t.extensionsUsed=(e=t.extensionsUsed)!=null?e:[],t.extensionsUsed.indexOf("KHR_texture_transform")===-1&&t.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){return iA(this,null,function*(){var s;const e=this.parser.json,t=(s=e.extensions)==null?void 0:s.VRM,n=t?.materialProperties;n&&(this._populateRenderQueueMap(n),n.forEach((i,r)=>{var o,a;const l=(o=e.materials)==null?void 0:o[r];if(l==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${r}] of glTF but the material doesn't exist`);return}if(i.shader==="VRM/MToon"){const c=this._parseV0MToonProperties(i,l);e.materials[r]=c}else if((a=i.shader)!=null&&a.startsWith("VRM/Unlit")){const c=this._parseV0UnlitProperties(i,l);e.materials[r]=c}else i.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${i.shader}`)}))})}_parseV0MToonProperties(s,e){var t,n,i,r,o,a,l,c,u,h,d,f,m,_,g,p,y,x,v,C,T,E,R,b,M,I,V,H,D,z,B,$,G,re,te,me,Be,tt,Q,le,Ce,pe,Ne,Xe,ze,ot,ie,fe,L,Ue,oe,Ee,ge,He,Te;const P=(n=(t=s.keywordMap)==null?void 0:t._ALPHABLEND_ON)!=null?n:!1,W=((i=s.floatProperties)==null?void 0:i._ZWrite)===1&&P,J=this._v0ParseRenderQueue(s),ae=(o=(r=s.keywordMap)==null?void 0:r._ALPHATEST_ON)!=null?o:!1,ee=P?"BLEND":ae?"MASK":"OPAQUE",Ie=ae?(l=(a=s.floatProperties)==null?void 0:a._Cutoff)!=null?l:.5:void 0,Ae=((u=(c=s.floatProperties)==null?void 0:c._CullMode)!=null?u:2)===0,q=this._portTextureTransform(s),j=((d=(h=s.vectorProperties)==null?void 0:h._Color)!=null?d:[1,1,1,1]).map((N,he)=>he===3?N:Sr(N)),se=(f=s.textureProperties)==null?void 0:f._MainTex,ce=se!=null?{index:se,extensions:$n({},q)}:void 0,_e=(_=(m=s.floatProperties)==null?void 0:m._BumpScale)!=null?_:1,ue=(g=s.textureProperties)==null?void 0:g._BumpMap,Je=ue!=null?{index:ue,scale:_e,extensions:$n({},q)}:void 0,ye=((y=(p=s.vectorProperties)==null?void 0:p._EmissionColor)!=null?y:[0,0,0,1]).map(Sr),lt=(x=s.textureProperties)==null?void 0:x._EmissionMap,O=lt!=null?{index:lt,extensions:$n({},q)}:void 0,Me=((C=(v=s.vectorProperties)==null?void 0:v._ShadeColor)!=null?C:[.97,.81,.86,1]).map(Sr),Y=(T=s.textureProperties)==null?void 0:T._ShadeTexture,ne=Y!=null?{index:Y,extensions:$n({},q)}:void 0;let be=(R=(E=s.floatProperties)==null?void 0:E._ShadeShift)!=null?R:0,de=(M=(b=s.floatProperties)==null?void 0:b._ShadeToony)!=null?M:.9;de=Et.lerp(de,1,.5+.5*be),be=-be-(1-de);const Ke=(V=(I=s.floatProperties)==null?void 0:I._IndirectLightIntensity)!=null?V:.1,xt=Ke?1-Ke:void 0,Tt=(H=s.textureProperties)==null?void 0:H._SphereAdd,ht=Tt!=null?[1,1,1]:void 0,an=Tt!=null?{index:Tt}:void 0,yn=(z=(D=s.floatProperties)==null?void 0:D._RimLightingMix)!=null?z:0,Li=(B=s.textureProperties)==null?void 0:B._RimTexture,Ui=Li!=null?{index:Li,extensions:$n({},q)}:void 0,En=((G=($=s.vectorProperties)==null?void 0:$._RimColor)!=null?G:[0,0,0,1]).map(Sr),Zt=(te=(re=s.floatProperties)==null?void 0:re._RimFresnelPower)!=null?te:1,Di=(Be=(me=s.floatProperties)==null?void 0:me._RimLift)!=null?Be:0,Ni=["none","worldCoordinates","screenCoordinates"][(Q=(tt=s.floatProperties)==null?void 0:tt._OutlineWidthMode)!=null?Q:0];let Rn=(Ce=(le=s.floatProperties)==null?void 0:le._OutlineWidth)!=null?Ce:0;Rn=.01*Rn;const fn=(pe=s.textureProperties)==null?void 0:pe._OutlineWidthTexture,Bn=fn!=null?{index:fn,extensions:$n({},q)}:void 0,ls=((Xe=(Ne=s.vectorProperties)==null?void 0:Ne._OutlineColor)!=null?Xe:[0,0,0]).map(Sr),Oi=((ot=(ze=s.floatProperties)==null?void 0:ze._OutlineColorMode)!=null?ot:0)===1?(fe=(ie=s.floatProperties)==null?void 0:ie._OutlineLightingMix)!=null?fe:1:0,F=(L=s.textureProperties)==null?void 0:L._UvAnimMaskTexture,xe=F!=null?{index:F,extensions:$n({},q)}:void 0,S=(oe=(Ue=s.floatProperties)==null?void 0:Ue._UvAnimScrollX)!=null?oe:0;let U=(ge=(Ee=s.floatProperties)==null?void 0:Ee._UvAnimScrollY)!=null?ge:0;U!=null&&(U=-U);const k=(Te=(He=s.floatProperties)==null?void 0:He._UvAnimRotation)!=null?Te:0,X={specVersion:"1.0",transparentWithZWrite:W,renderQueueOffsetNumber:J,shadeColorFactor:Me,shadeMultiplyTexture:ne,shadingShiftFactor:be,shadingToonyFactor:de,giEqualizationFactor:xt,matcapFactor:ht,matcapTexture:an,rimLightingMixFactor:yn,rimMultiplyTexture:Ui,parametricRimColorFactor:En,parametricRimFresnelPowerFactor:Zt,parametricRimLiftFactor:Di,outlineWidthMode:Ni,outlineWidthFactor:Rn,outlineWidthMultiplyTexture:Bn,outlineColorFactor:ls,outlineLightingMixFactor:Oi,uvAnimationMaskTexture:xe,uvAnimationScrollXSpeedFactor:S,uvAnimationScrollYSpeedFactor:U,uvAnimationRotationSpeedFactor:k};return yp($n({},e),{pbrMetallicRoughness:{baseColorFactor:j,baseColorTexture:ce},normalTexture:Je,emissiveTexture:O,emissiveFactor:ye,alphaMode:ee,alphaCutoff:Ie,doubleSided:Ae,extensions:{VRMC_materials_mtoon:X}})}_parseV0UnlitProperties(s,e){var t,n,i,r,o;const a=s.shader==="VRM/UnlitTransparentZWrite",l=s.shader==="VRM/UnlitTransparent"||a,c=this._v0ParseRenderQueue(s),u=s.shader==="VRM/UnlitCutout",h=l?"BLEND":u?"MASK":"OPAQUE",d=u?(n=(t=s.floatProperties)==null?void 0:t._Cutoff)!=null?n:.5:void 0,f=this._portTextureTransform(s),m=((r=(i=s.vectorProperties)==null?void 0:i._Color)!=null?r:[1,1,1,1]).map(Sr),_=(o=s.textureProperties)==null?void 0:o._MainTex,g=_!=null?{index:_,extensions:$n({},f)}:void 0,p={specVersion:"1.0",transparentWithZWrite:a,renderQueueOffsetNumber:c,shadeColorFactor:m,shadeMultiplyTexture:g};return yp($n({},e),{pbrMetallicRoughness:{baseColorFactor:m,baseColorTexture:g},alphaMode:h,alphaCutoff:d,extensions:{VRMC_materials_mtoon:p}})}_portTextureTransform(s){var e,t,n,i,r;const o=(e=s.vectorProperties)==null?void 0:e._MainTex;if(o==null)return{};const a=[(t=o?.[0])!=null?t:0,(n=o?.[1])!=null?n:0],l=[(i=o?.[2])!=null?i:1,(r=o?.[3])!=null?r:1];return a[1]=1-l[1]-a[1],{KHR_texture_transform:{offset:a,scale:l}}}_v0ParseRenderQueue(s){var e,t;const n=s.shader==="VRM/UnlitTransparentZWrite",i=((e=s.keywordMap)==null?void 0:e._ALPHABLEND_ON)!=null||s.shader==="VRM/UnlitTransparent"||n,r=((t=s.floatProperties)==null?void 0:t._ZWrite)===1||n;let o=0;if(i){const a=s.renderQueue;a!=null&&(r?o=this._renderQueueMapTransparentZWrite.get(a):o=this._renderQueueMapTransparent.get(a))}return o}_populateRenderQueueMap(s){const e=new Set,t=new Set;s.forEach(n=>{var i,r;const o=n.shader==="VRM/UnlitTransparentZWrite",a=((i=n.keywordMap)==null?void 0:i._ALPHABLEND_ON)!=null||n.shader==="VRM/UnlitTransparent"||o,l=((r=n.floatProperties)==null?void 0:r._ZWrite)===1||o;if(a){const c=n.renderQueue;c!=null&&(l?t.add(c):e.add(c))}}),e.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${e.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),t.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${t.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(e).sort().forEach((n,i)=>{const r=Math.min(Math.max(i-e.size+1,-9),0);this._renderQueueMapTransparent.set(n,r)}),Array.from(t).sort().forEach((n,i)=>{const r=Math.min(Math.max(i,0),9);this._renderQueueMapTransparentZWrite.set(n,r)})}},Mp=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),Yi=new w,vu=class extends Ge{constructor(s){super(),this._attrPosition=new Ze(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(Mm);const e=new Ve;e.setAttribute("position",this._attrPosition);const t=new kt({color:16711935,depthTest:!1,depthWrite:!1});this._line=new li(e,t),this.add(this._line),this.constraint=s}updateMatrixWorld(s){Yi.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,Yi.x,Yi.y,Yi.z),this.constraint.source&&Yi.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,Yi.x,Yi.y,Yi.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(s)}};function Sp(s,e){return e.set(s.elements[12],s.elements[13],s.elements[14])}var rA=new w,oA=new w;function aA(s,e){return s.decompose(rA,e,oA),e}function kl(s){return s.invert?s.invert():s.inverse(),s}var ed=class{constructor(s,e){this.destination=s,this.source=e,this.weight=1}},lA=new w,cA=new w,uA=new w,hA=new $e,dA=new $e,fA=new $e,pA=class extends ed{get aimAxis(){return this._aimAxis}set aimAxis(s){this._aimAxis=s,this._v3AimAxis.set(s==="PositiveX"?1:s==="NegativeX"?-1:0,s==="PositiveY"?1:s==="NegativeY"?-1:0,s==="PositiveZ"?1:s==="NegativeZ"?-1:0)}get dependencies(){const s=new Set([this.source]);return this.destination.parent&&s.add(this.destination.parent),s}constructor(s,e){super(s,e),this._aimAxis="PositiveX",this._v3AimAxis=new w(1,0,0),this._dstRestQuat=new $e}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);const s=hA.identity(),e=dA.identity();this.destination.parent&&(aA(this.destination.parent.matrixWorld,s),kl(e.copy(s)));const t=lA.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(s),n=Sp(this.source.matrixWorld,cA).sub(Sp(this.destination.matrixWorld,uA)).normalize(),i=fA.setFromUnitVectors(t,n).premultiply(e).multiply(s).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(i,this.weight)}};function mA(s,e){const t=[s];let n=s.parent;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(i=>{e(i)})}var gA=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(s){this._constraints.add(s);let e=this._objectConstraintsMap.get(s.destination);e==null&&(e=new Set,this._objectConstraintsMap.set(s.destination,e)),e.add(s)}deleteConstraint(s){this._constraints.delete(s),this._objectConstraintsMap.get(s.destination).delete(s)}setInitState(){const s=new Set,e=new Set;for(const t of this._constraints)this._processConstraint(t,s,e,n=>n.setInitState())}update(){const s=new Set,e=new Set;for(const t of this._constraints)this._processConstraint(t,s,e,n=>n.update())}_processConstraint(s,e,t,n){if(t.has(s))return;if(e.has(s))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");e.add(s);const i=s.dependencies;for(const r of i)mA(r,o=>{const a=this._objectConstraintsMap.get(o);if(a)for(const l of a)this._processConstraint(l,e,t,n)});n(s),t.add(s)}},_A=new $e,vA=new $e,xA=class extends ed{get dependencies(){return new Set([this.source])}constructor(s,e){super(s,e),this._dstRestQuat=new $e,this._invSrcRestQuat=new $e}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),kl(this._invSrcRestQuat.copy(this.source.quaternion))}update(){const s=_A.copy(this._invSrcRestQuat).multiply(this.source.quaternion),e=vA.copy(this._dstRestQuat).multiply(s);this.destination.quaternion.copy(this._dstRestQuat).slerp(e,this.weight)}},yA=new w,MA=new $e,SA=new $e,bA=class extends ed{get rollAxis(){return this._rollAxis}set rollAxis(s){this._rollAxis=s,this._v3RollAxis.set(s==="X"?1:0,s==="Y"?1:0,s==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(s,e){super(s,e),this._rollAxis="X",this._v3RollAxis=new w(1,0,0),this._dstRestQuat=new $e,this._invDstRestQuat=new $e,this._invSrcRestQuatMulDstRestQuat=new $e}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),kl(this._invDstRestQuat.copy(this._dstRestQuat)),kl(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){const s=MA.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),e=yA.copy(this._v3RollAxis).applyQuaternion(s),n=SA.setFromUnitVectors(e,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(s);this.destination.quaternion.copy(this._dstRestQuat).slerp(n,this.weight)}},wA=new Set(["1.0","1.0-beta"]),qg=class xo{get name(){return xo.EXTENSION_NAME}constructor(e,t){this.parser=e,this.helperRoot=t?.helperRoot}afterRoot(e){return Mp(this,null,function*(){e.userData.vrmNodeConstraintManager=yield this._import(e)})}_import(e){return Mp(this,null,function*(){var t;const n=this.parser.json;if(!(((t=n.extensionsUsed)==null?void 0:t.indexOf(xo.EXTENSION_NAME))!==-1))return null;const r=new gA,o=yield this.parser.getDependencies("node");return o.forEach((a,l)=>{var c;const u=n.nodes[l],h=(c=u?.extensions)==null?void 0:c[xo.EXTENSION_NAME];if(h==null)return;const d=h.specVersion;if(!wA.has(d)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${xo.EXTENSION_NAME} specVersion "${d}"`);return}const f=h.constraint;if(f.roll!=null){const m=this._importRollConstraint(a,o,f.roll);r.addConstraint(m)}else if(f.aim!=null){const m=this._importAimConstraint(a,o,f.aim);r.addConstraint(m)}else if(f.rotation!=null){const m=this._importRotationConstraint(a,o,f.rotation);r.addConstraint(m)}}),e.scene.updateMatrixWorld(),r.setInitState(),r})}_importRollConstraint(e,t,n){const{source:i,rollAxis:r,weight:o}=n,a=t[i],l=new bA(e,a);if(r!=null&&(l.rollAxis=r),o!=null&&(l.weight=o),this.helperRoot){const c=new vu(l);this.helperRoot.add(c)}return l}_importAimConstraint(e,t,n){const{source:i,aimAxis:r,weight:o}=n,a=t[i],l=new pA(e,a);if(r!=null&&(l.aimAxis=r),o!=null&&(l.weight=o),this.helperRoot){const c=new vu(l);this.helperRoot.add(c)}return l}_importRotationConstraint(e,t,n){const{source:i,weight:r}=n,o=t[i],a=new xA(e,o);if(r!=null&&(a.weight=r),this.helperRoot){const l=new vu(a);this.helperRoot.add(l)}return a}};qg.EXTENSION_NAME="VRMC_node_constraint";var TA=qg,qa=(s,e,t)=>new Promise((n,i)=>{var r=l=>{try{a(t.next(l))}catch(c){i(c)}},o=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(r,o);a((t=t.apply(s,e)).next())}),td=class{},xu=new w,Ts=new w,Yg=class extends td{get type(){return"capsule"}constructor(s){var e,t,n,i;super(),this.offset=(e=s?.offset)!=null?e:new w(0,0,0),this.tail=(t=s?.tail)!=null?t:new w(0,0,0),this.radius=(n=s?.radius)!=null?n:0,this.inside=(i=s?.inside)!=null?i:!1}calculateCollision(s,e,t,n){xu.setFromMatrixPosition(s),Ts.subVectors(this.tail,this.offset).applyMatrix4(s),Ts.sub(xu);const i=Ts.lengthSq();n.copy(e).sub(xu);const r=Ts.dot(n);r<=0||(i<=r||Ts.multiplyScalar(r/i),n.sub(Ts));const o=n.length(),a=this.inside?this.radius-t-o:o-t-this.radius;return a<0&&(n.multiplyScalar(1/o),this.inside&&n.negate()),a}},yu=new w,bp=new We,jg=class extends td{get type(){return"plane"}constructor(s){var e,t;super(),this.offset=(e=s?.offset)!=null?e:new w(0,0,0),this.normal=(t=s?.normal)!=null?t:new w(0,0,1)}calculateCollision(s,e,t,n){n.setFromMatrixPosition(s),n.negate().add(e),bp.getNormalMatrix(s),yu.copy(this.normal).applyNormalMatrix(bp).normalize();const i=n.dot(yu)-t;return n.copy(yu),i}},AA=new w,Zg=class extends td{get type(){return"sphere"}constructor(s){var e,t,n;super(),this.offset=(e=s?.offset)!=null?e:new w(0,0,0),this.radius=(t=s?.radius)!=null?t:0,this.inside=(n=s?.inside)!=null?n:!1}calculateCollision(s,e,t,n){n.subVectors(e,AA.setFromMatrixPosition(s));const i=n.length(),r=this.inside?this.radius-t-i:i-t-this.radius;return r<0&&(n.multiplyScalar(1/i),this.inside&&n.negate()),r}},Kn=new w,EA=class extends Ve{constructor(s){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new w,this._currentTail=new w,this._shape=s,this._attrPos=new Ze(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ze(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;const e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,s=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),s=!0);const t=Kn.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(t)>1e-10&&(this._currentTail.copy(t),s=!0),s&&this._buildPosition()}_buildPosition(){Kn.copy(this._currentTail).sub(this._currentOffset);const s=Kn.length()/this._currentRadius;for(let n=0;n<=16;n++){const i=n/16*Math.PI;this._attrPos.setXYZ(n,-Math.sin(i),-Math.cos(i),0),this._attrPos.setXYZ(17+n,s+Math.sin(i),Math.cos(i),0),this._attrPos.setXYZ(34+n,-Math.sin(i),0,-Math.cos(i)),this._attrPos.setXYZ(51+n,s+Math.sin(i),0,Math.cos(i))}for(let n=0;n<32;n++){const i=n/16*Math.PI;this._attrPos.setXYZ(68+n,0,Math.sin(i),Math.cos(i)),this._attrPos.setXYZ(100+n,s,Math.sin(i),Math.cos(i))}const e=Math.atan2(Kn.y,Math.sqrt(Kn.x*Kn.x+Kn.z*Kn.z)),t=-Math.atan2(Kn.z,Kn.x);this.rotateZ(e),this.rotateY(t),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<34;s++){const e=(s+1)%34;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(68+s*2,34+s,34+e)}for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(136+s*2,68+s,68+e),this._attrIndex.setXY(200+s*2,100+s,100+e)}this._attrIndex.needsUpdate=!0}},RA=class extends Ve{constructor(s){super(),this.worldScale=1,this._currentOffset=new w,this._currentNormal=new w,this._shape=s,this._attrPos=new Ze(new Float32Array(18),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ze(new Uint16Array(10),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),s=!0),this._currentNormal.equals(this._shape.normal)||(this._currentNormal.copy(this._shape.normal),s=!0),s&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,-.5,-.5,0),this._attrPos.setXYZ(1,.5,-.5,0),this._attrPos.setXYZ(2,.5,.5,0),this._attrPos.setXYZ(3,-.5,.5,0),this._attrPos.setXYZ(4,0,0,0),this._attrPos.setXYZ(5,0,0,.25),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this.lookAt(this._currentNormal),this._attrPos.needsUpdate=!0}_buildIndex(){this._attrIndex.setXY(0,0,1),this._attrIndex.setXY(2,1,2),this._attrIndex.setXY(4,2,3),this._attrIndex.setXY(6,3,0),this._attrIndex.setXY(8,4,5),this._attrIndex.needsUpdate=!0}},CA=class extends Ve{constructor(s){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new w,this._shape=s,this._attrPos=new Ze(new Float32Array(288),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ze(new Uint16Array(192),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;const e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,s=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),s=!0),s&&this._buildPosition()}_buildPosition(){for(let s=0;s<32;s++){const e=s/16*Math.PI;this._attrPos.setXYZ(s,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+s,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+s,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(64+s*2,32+s,32+e),this._attrIndex.setXY(128+s*2,64+s,64+e)}this._attrIndex.needsUpdate=!0}},PA=new w,Mu=class extends Ge{constructor(s){if(super(),this.matrixAutoUpdate=!1,this.collider=s,this.collider.shape instanceof Zg)this._geometry=new CA(this.collider.shape);else if(this.collider.shape instanceof Yg)this._geometry=new EA(this.collider.shape);else if(this.collider.shape instanceof jg)this._geometry=new RA(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");const e=new kt({color:16711935,depthTest:!1,depthWrite:!1});this._line=new xn(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(s){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);const e=this.matrix.elements;this._geometry.worldScale=PA.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(s)}},IA=class extends Ve{constructor(s){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new w,this._springBone=s,this._attrPos=new Ze(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ze(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let s=!1;const e=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,s=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),s=!0),s&&this._buildPosition()}_buildPosition(){for(let s=0;s<32;s++){const e=s/16*Math.PI;this._attrPos.setXYZ(s,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+s,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+s,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let s=0;s<32;s++){const e=(s+1)%32;this._attrIndex.setXY(s*2,s,e),this._attrIndex.setXY(64+s*2,32+s,32+e),this._attrIndex.setXY(128+s*2,64+s,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},LA=new w,UA=class extends Ge{constructor(s){super(),this.matrixAutoUpdate=!1,this.springBone=s,this._geometry=new IA(this.springBone);const e=new kt({color:16776960,depthTest:!1,depthWrite:!1});this._line=new xn(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(s){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);const e=this.matrix.elements;this._geometry.worldScale=LA.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(s)}},Su=class extends rt{constructor(s){super(),this.colliderMatrix=new Le,this.shape=s}updateWorldMatrix(s,e){super.updateWorldMatrix(s,e),DA(this.colliderMatrix,this.matrixWorld,this.shape.offset)}};function DA(s,e,t){const n=e.elements;s.copy(e),t&&(s.elements[12]=n[0]*t.x+n[4]*t.y+n[8]*t.z+n[12],s.elements[13]=n[1]*t.x+n[5]*t.y+n[9]*t.z+n[13],s.elements[14]=n[2]*t.x+n[6]*t.y+n[10]*t.z+n[14])}var NA=new Le;function OA(s){return s.invert?s.invert():s.getInverse(NA.copy(s)),s}var FA=class{constructor(s){this._inverseCache=new Le,this._shouldUpdateInverse=!0,this.matrix=s;const e={set:(t,n,i)=>(this._shouldUpdateInverse=!0,t[n]=i,!0)};this._originalElements=s.elements,s.elements=new Proxy(s.elements,e)}get inverse(){return this._shouldUpdateInverse&&(OA(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}},bu=new Le,br=new w,ho=new w,fo=new w,po=new w,BA=new Le,kA=class{constructor(s,e,t={},n=[]){this._currentTail=new w,this._prevTail=new w,this._boneAxis=new w,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new Le,this._initialLocalRotation=new $e,this._initialLocalChildPosition=new w;var i,r,o,a,l,c;this.bone=s,this.bone.matrixAutoUpdate=!1,this.child=e,this.settings={hitRadius:(i=t.hitRadius)!=null?i:0,stiffness:(r=t.stiffness)!=null?r:1,gravityPower:(o=t.gravityPower)!=null?o:0,gravityDir:(l=(a=t.gravityDir)==null?void 0:a.clone())!=null?l:new w(0,-1,0),dragForce:(c=t.dragForce)!=null?c:.4},this.colliderGroups=n}get dependencies(){const s=new Set,e=this.bone.parent;e&&s.add(e);for(let t=0;t<this.colliderGroups.length;t++)for(let n=0;n<this.colliderGroups[t].colliders.length;n++)s.add(this.colliderGroups[t].colliders[n]);return s}get center(){return this._center}set center(s){var e;(e=this._center)!=null&&e.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=s,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new FA(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:bu}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);const s=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(s),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);const s=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(s),this._prevTail.copy(this._currentTail)}update(s){if(s<=0)return;this._calcWorldSpaceBoneLength();const e=ho.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);po.copy(this._currentTail).add(br.subVectors(this._currentTail,this._prevTail).multiplyScalar(1-this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(e,this.settings.stiffness*s).addScaledVector(this.settings.gravityDir,this.settings.gravityPower*s),fo.setFromMatrixPosition(this.bone.matrixWorld),po.sub(fo).normalize().multiplyScalar(this._worldSpaceBoneLength).add(fo),this._collision(po),this._prevTail.copy(this._currentTail),this._currentTail.copy(po).applyMatrix4(this._getMatrixWorldToCenter());const t=BA.multiplyMatrices(this._parentMatrixWorld,this._initialLocalMatrix).invert();this.bone.quaternion.setFromUnitVectors(this._boneAxis,br.copy(po).applyMatrix4(t).normalize()).premultiply(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(s){for(let e=0;e<this.colliderGroups.length;e++)for(let t=0;t<this.colliderGroups[e].colliders.length;t++){const n=this.colliderGroups[e].colliders[t],i=n.shape.calculateCollision(n.colliderMatrix,s,this.settings.hitRadius,br);if(i<0){s.addScaledVector(br,-i),s.sub(fo);const r=s.length();s.multiplyScalar(this._worldSpaceBoneLength/r).add(fo)}}}_calcWorldSpaceBoneLength(){br.setFromMatrixPosition(this.bone.matrixWorld),this.child?ho.setFromMatrixPosition(this.child.matrixWorld):(ho.copy(this._initialLocalChildPosition),ho.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=br.sub(ho).length()}_getMatrixCenterToWorld(){return this._center?this._center.matrixWorld:bu}_getMatrixWorldToCenter(){return this._center?this._center.userData.inverseCacheProxy.inverse:bu}};function VA(s,e){const t=[];let n=s;for(;n!==null;)t.unshift(n),n=n.parent;t.forEach(i=>{e(i)})}function $u(s,e){s.children.forEach(t=>{e(t)||$u(t,e)})}function zA(s){var e;const t=new Map;for(const n of s){let i=n;do{const r=((e=t.get(i))!=null?e:0)+1;if(r===s.size)return i;t.set(i,r),i=i.parent}while(i!==null)}return null}var wp=class{constructor(){this._joints=new Set,this._sortedJoints=[],this._hasWarnedCircularDependency=!1,this._ancestors=[],this._objectSpringBonesMap=new Map,this._isSortedJointsDirty=!1,this._relevantChildrenUpdated=this._relevantChildrenUpdated.bind(this)}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){const s=new Set;return this._joints.forEach(e=>{e.colliderGroups.forEach(t=>{s.add(t)})}),Array.from(s)}get colliders(){const s=new Set;return this.colliderGroups.forEach(e=>{e.colliders.forEach(t=>{s.add(t)})}),Array.from(s)}addJoint(s){this._joints.add(s);let e=this._objectSpringBonesMap.get(s.bone);e==null&&(e=new Set,this._objectSpringBonesMap.set(s.bone,e)),e.add(s),this._isSortedJointsDirty=!0}addSpringBone(s){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(s)}deleteJoint(s){this._joints.delete(s),this._objectSpringBonesMap.get(s.bone).delete(s),this._isSortedJointsDirty=!0}deleteSpringBone(s){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(s)}setInitState(){this._sortJoints();for(let s=0;s<this._sortedJoints.length;s++){const e=this._sortedJoints[s];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.setInitState()}}reset(){this._sortJoints();for(let s=0;s<this._sortedJoints.length;s++){const e=this._sortedJoints[s];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.reset()}}update(s){this._sortJoints();for(let e=0;e<this._ancestors.length;e++)this._ancestors[e].updateWorldMatrix(e===0,!1);for(let e=0;e<this._sortedJoints.length;e++){const t=this._sortedJoints[e];t.bone.updateMatrix(),t.bone.updateWorldMatrix(!1,!1),t.update(s),$u(t.bone,this._relevantChildrenUpdated)}}_sortJoints(){if(!this._isSortedJointsDirty)return;const s=[],e=new Set,t=new Set,n=new Set;for(const r of this._joints)this._insertJointSort(r,e,t,s,n);this._sortedJoints=s;const i=zA(n);this._ancestors=[],i&&(this._ancestors.push(i),$u(i,r=>{var o,a;return((a=(o=this._objectSpringBonesMap.get(r))==null?void 0:o.size)!=null?a:0)>0?!0:(this._ancestors.push(r),!1)})),this._isSortedJointsDirty=!1}_insertJointSort(s,e,t,n,i){if(t.has(s))return;if(e.has(s)){this._hasWarnedCircularDependency||(console.warn("VRMSpringBoneManager: Circular dependency detected"),this._hasWarnedCircularDependency=!0);return}e.add(s);const r=s.dependencies;for(const o of r){let a=!1,l=null;VA(o,c=>{const u=this._objectSpringBonesMap.get(c);if(u)for(const h of u)a=!0,this._insertJointSort(h,e,t,n,i);else a||(l=c)}),l&&i.add(l)}n.push(s),t.add(s)}_relevantChildrenUpdated(s){var e,t;return((t=(e=this._objectSpringBonesMap.get(s))==null?void 0:e.size)!=null?t:0)>0?!0:(s.updateWorldMatrix(!1,!1),!1)}},Tp="VRMC_springBone_extended_collider",HA=new Set(["1.0","1.0-beta"]),GA=new Set(["1.0"]),$g=class Tr{get name(){return Tr.EXTENSION_NAME}constructor(e,t){var n;this.parser=e,this.jointHelperRoot=t?.jointHelperRoot,this.colliderHelperRoot=t?.colliderHelperRoot,this.useExtendedColliders=(n=t?.useExtendedColliders)!=null?n:!0}afterRoot(e){return qa(this,null,function*(){e.userData.vrmSpringBoneManager=yield this._import(e)})}_import(e){return qa(this,null,function*(){const t=yield this._v1Import(e);if(t!=null)return t;const n=yield this._v0Import(e);return n??null})}_v1Import(e){return qa(this,null,function*(){var t,n,i,r,o;const a=e.parser.json;if(!(((t=a.extensionsUsed)==null?void 0:t.indexOf(Tr.EXTENSION_NAME))!==-1))return null;const c=new wp,u=yield e.parser.getDependencies("node"),h=(n=a.extensions)==null?void 0:n[Tr.EXTENSION_NAME];if(!h)return null;const d=h.specVersion;if(!HA.has(d))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Tr.EXTENSION_NAME} specVersion "${d}"`),null;const f=(i=h.colliders)==null?void 0:i.map((_,g)=>{var p,y,x,v,C,T,E,R,b,M,I,V,H,D,z;const B=u[_.node];if(B==null)return console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} attempted to reference a node #${_.node} but not found. Skipping the collider`),null;const $=_.shape,G=(p=_.extensions)==null?void 0:p[Tp];if(this.useExtendedColliders&&G!=null){const re=G.specVersion;if(!GA.has(re))console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Tp} specVersion "${re}". Fallbacking to the ${Tr.EXTENSION_NAME} definition`);else{const te=G.shape;if(te.sphere)return this._importSphereCollider(B,{offset:new w().fromArray((y=te.sphere.offset)!=null?y:[0,0,0]),radius:(x=te.sphere.radius)!=null?x:0,inside:(v=te.sphere.inside)!=null?v:!1});if(te.capsule)return this._importCapsuleCollider(B,{offset:new w().fromArray((C=te.capsule.offset)!=null?C:[0,0,0]),radius:(T=te.capsule.radius)!=null?T:0,tail:new w().fromArray((E=te.capsule.tail)!=null?E:[0,0,0]),inside:(R=te.capsule.inside)!=null?R:!1});if(te.plane)return this._importPlaneCollider(B,{offset:new w().fromArray((b=te.plane.offset)!=null?b:[0,0,0]),normal:new w().fromArray((M=te.plane.normal)!=null?M:[0,0,1])})}}if($.sphere)return this._importSphereCollider(B,{offset:new w().fromArray((I=$.sphere.offset)!=null?I:[0,0,0]),radius:(V=$.sphere.radius)!=null?V:0,inside:!1});if($.capsule)return this._importCapsuleCollider(B,{offset:new w().fromArray((H=$.capsule.offset)!=null?H:[0,0,0]),radius:(D=$.capsule.radius)!=null?D:0,tail:new w().fromArray((z=$.capsule.tail)!=null?z:[0,0,0]),inside:!1});console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} has no valid shape. Skipping the collider`)}),m=(r=h.colliderGroups)==null?void 0:r.map((_,g)=>{var p;return{colliders:((p=_.colliders)!=null?p:[]).map(x=>{const v=f?.[x];return v??(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${g} attempted to reference a collider #${x} but not found. Skipping the collider`),null)}).filter(x=>x!=null),name:_.name}});return(o=h.springs)==null||o.forEach((_,g)=>{var p;const y=_.joints,x=(p=_.colliderGroups)==null?void 0:p.map(T=>{const E=m?.[T];return E??(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${g} attempted to reference a collider group #${T} but not found. Skipping the collider group`),null)}).filter(T=>T!=null),v=_.center!=null?u[_.center]:void 0;let C;y.forEach(T=>{if(C){const E=C.node,R=u[E],b=T.node,M=u[b],I={hitRadius:C.hitRadius,dragForce:C.dragForce,gravityPower:C.gravityPower,stiffness:C.stiffness,gravityDir:C.gravityDir!=null?new w().fromArray(C.gravityDir):void 0},V=this._importJoint(R,M,I,x);v&&(V.center=v),c.addJoint(V)}C=T})}),c.setInitState(),c})}_v0Import(e){return qa(this,null,function*(){var t,n,i;const r=e.parser.json;if(!(((t=r.extensionsUsed)==null?void 0:t.indexOf("VRM"))!==-1))return null;const a=(n=r.extensions)==null?void 0:n.VRM,l=a?.secondaryAnimation;if(!l)return null;const c=l?.boneGroups;if(!c)return null;const u=new wp,h=yield e.parser.getDependencies("node"),d=(i=l.colliderGroups)==null?void 0:i.map((f,m)=>{var _;const g=h[f.node];return g==null?(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${m} attempted to reference a node #${f.node} but not found. Skipping the collider group`),null):{colliders:((_=f.colliders)!=null?_:[]).map((y,x)=>{var v,C,T;const E=new w(0,0,0);return y.offset&&E.set((v=y.offset.x)!=null?v:0,(C=y.offset.y)!=null?C:0,y.offset.z?-y.offset.z:0),this._importSphereCollider(g,{offset:E,radius:(T=y.radius)!=null?T:0,inside:!1})})}});return c?.forEach((f,m)=>{const _=f.bones;_&&_.forEach(g=>{var p,y,x,v;const C=h[g];if(C==null){console.warn(`VRMSpringBoneLoaderPlugin: The spring bone group #${m} attempted to reference a node #${g} but not found. Skipping the node`);return}const T=new w;f.gravityDir?T.set((p=f.gravityDir.x)!=null?p:0,(y=f.gravityDir.y)!=null?y:0,(x=f.gravityDir.z)!=null?x:0):T.set(0,-1,0);const E=f.center!=null?h[f.center]:void 0,R={hitRadius:f.hitRadius,dragForce:f.dragForce,gravityPower:f.gravityPower,stiffness:f.stiffiness,gravityDir:T},b=(v=f.colliderGroups)==null?void 0:v.map(M=>{const I=d?.[M];return I??(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${m} attempted to reference a collider group #${M} but not found. Skipping the collider group`),null)}).filter(M=>M!=null);C.traverse(M=>{var I;const V=(I=M.children[0])!=null?I:null,H=this._importJoint(M,V,R,b);E&&(H.center=E),u.addJoint(H)})})}),e.scene.updateMatrixWorld(),u.setInitState(),u})}_importJoint(e,t,n,i){const r=new kA(e,t,n,i);if(this.jointHelperRoot){const o=new UA(r);this.jointHelperRoot.add(o),o.renderOrder=this.jointHelperRoot.renderOrder}return r}_importSphereCollider(e,t){const n=new Zg(t),i=new Su(n);if(e.add(i),this.colliderHelperRoot){const r=new Mu(i);this.colliderHelperRoot.add(r),r.renderOrder=this.colliderHelperRoot.renderOrder}return i}_importCapsuleCollider(e,t){const n=new Yg(t),i=new Su(n);if(e.add(i),this.colliderHelperRoot){const r=new Mu(i);this.colliderHelperRoot.add(r),r.renderOrder=this.colliderHelperRoot.renderOrder}return i}_importPlaneCollider(e,t){const n=new jg(t),i=new Su(n);if(e.add(i),this.colliderHelperRoot){const r=new Mu(i);this.colliderHelperRoot.add(r),r.renderOrder=this.colliderHelperRoot.renderOrder}return i}};$g.EXTENSION_NAME="VRMC_springBone";var WA=$g,XA=class{get name(){return"VRMLoaderPlugin"}constructor(s,e){var t,n,i,r,o,a,l,c,u,h;this.parser=s;const d=e?.helperRoot,f=e?.autoUpdateHumanBones;this.expressionPlugin=(t=e?.expressionPlugin)!=null?t:new aT(s),this.firstPersonPlugin=(n=e?.firstPersonPlugin)!=null?n:new cT(s),this.humanoidPlugin=(i=e?.humanoidPlugin)!=null?i:new gT(s,{helperRoot:d,autoUpdateHumanBones:f}),this.lookAtPlugin=(r=e?.lookAtPlugin)!=null?r:new IT(s,{helperRoot:d}),this.metaPlugin=(o=e?.metaPlugin)!=null?o:new DT(s),this.mtoonMaterialPlugin=(a=e?.mtoonMaterialPlugin)!=null?a:new ZT(s),this.materialsHDREmissiveMultiplierPlugin=(l=e?.materialsHDREmissiveMultiplierPlugin)!=null?l:new KT(s),this.materialsV0CompatPlugin=(c=e?.materialsV0CompatPlugin)!=null?c:new sA(s),this.springBonePlugin=(u=e?.springBonePlugin)!=null?u:new WA(s,{colliderHelperRoot:d,jointHelperRoot:d}),this.nodeConstraintPlugin=(h=e?.nodeConstraintPlugin)!=null?h:new TA(s,{helperRoot:d})}beforeRoot(){return Ga(this,null,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(s){return Ga(this,null,function*(){return yield this.mtoonMaterialPlugin.loadMesh(s)})}getMaterialType(s){const e=this.mtoonMaterialPlugin.getMaterialType(s);return e??null}extendMaterialParams(s,e){return Ga(this,null,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(s,e),yield this.mtoonMaterialPlugin.extendMaterialParams(s,e)})}afterRoot(s){return Ga(this,null,function*(){yield this.metaPlugin.afterRoot(s),yield this.humanoidPlugin.afterRoot(s),yield this.expressionPlugin.afterRoot(s),yield this.lookAtPlugin.afterRoot(s),yield this.firstPersonPlugin.afterRoot(s),yield this.springBonePlugin.afterRoot(s),yield this.nodeConstraintPlugin.afterRoot(s),yield this.mtoonMaterialPlugin.afterRoot(s);const e=s.userData.vrmMeta,t=s.userData.vrmHumanoid;if(e&&t){const n=new OT({scene:s.scene,expressionManager:s.userData.vrmExpressionManager,firstPerson:s.userData.vrmFirstPerson,humanoid:t,lookAt:s.userData.vrmLookAt,meta:e,materials:s.userData.vrmMToonMaterials,springBoneManager:s.userData.vrmSpringBoneManager,nodeConstraintManager:s.userData.vrmNodeConstraintManager});s.userData.vrm=n}})}};function qA(s){const e=new Set;return s.traverse(t=>{if(!t.isMesh)return;const n=t;e.add(n)}),e}function Ap(s,e,t){if(e.size===1){const o=e.values().next().value;if(o.weight===1)return s[o.index]}const n=new Float32Array(s[0].count*3);let i=0;if(t)i=1;else for(const o of e)i+=o.weight;for(const o of e){const a=s[o.index],l=o.weight/i;for(let c=0;c<a.count;c++)n[c*3+0]+=a.getX(c)*l,n[c*3+1]+=a.getY(c)*l,n[c*3+2]+=a.getZ(c)*l}return new Ze(n,3)}function YA(s){var e;const t=qA(s.scene),n=new Map,i=(e=s.expressionManager)==null?void 0:e.expressionMap;if(i!=null)for(const[r,o]of Object.entries(i)){const a=new Set;for(const l of o.binds)if(l instanceof Bl){if(l.weight!==0)for(const c of l.primitives){let u=n.get(c);u==null&&(u=new Map,n.set(c,u));let h=u.get(r);h==null&&(h=new Set,u.set(r,h)),h.add(l)}a.add(l)}for(const l of a)o.deleteBind(l)}for(const r of t){const o=n.get(r);if(o==null)continue;const a=r.geometry.morphAttributes;r.geometry.morphAttributes={};const l=r.geometry.clone();r.geometry=l;const c=l.morphTargetsRelative,u=a.position!=null,h=a.normal!=null,d={},f={},m=[];if(u||h){u&&(d.position=[]),h&&(d.normal=[]);let _=0;for(const[g,p]of o)u&&(d.position[_]=Ap(a.position,p,c)),h&&(d.normal[_]=Ap(a.normal,p,c)),i?.[g].addBind(new Bl({index:_,weight:1,primitives:[r]})),f[g]=_,m.push(0),_++}l.morphAttributes=d,r.morphTargetDictionary=f,r.morphTargetInfluences=m}}function Vl(s,e,t){if(s.getComponent)return s.getComponent(e,t);{let n=s.array[e*s.itemSize+t];return s.normalized&&(n=Et.denormalize(n,s.array)),n}}function Kg(s,e,t,n){s.setComponent?s.setComponent(e,t,n):(s.normalized&&(n=Et.normalize(n,s.array)),s.array[e*s.itemSize+t]=n)}function jA(s){var e;const t=ZA(s),n=new Set;for(const h of t)n.has(h.geometry)&&(h.geometry=tE(h.geometry)),n.add(h.geometry);const i=new Map;for(const h of n){const d=h.getAttribute("skinIndex"),f=(e=i.get(d))!=null?e:new Map;i.set(d,f);const m=h.getAttribute("skinWeight"),_=$A(d,m);f.set(m,_)}const r=new Map;for(const h of t){const d=KA(h,i);r.set(h,d)}const o=[];for(const[h,d]of r){let f=!1;for(const m of o)if(JA(d,m.boneInverseMap)){f=!0,m.meshes.add(h);for(const[g,p]of d)m.boneInverseMap.set(g,p);break}f||o.push({boneInverseMap:d,meshes:new Set([h])})}const a=new Map,l=new wu,c=new wu,u=new wu;for(const h of o){const{boneInverseMap:d,meshes:f}=h,m=Array.from(d.keys()),_=Array.from(d.values()),g=new ss(m,_),p=c.getOrCreate(g);for(const y of f){const x=y.geometry.getAttribute("skinIndex"),v=l.getOrCreate(x),C=y.skeleton.bones,T=C.map(b=>u.getOrCreate(b)).join(","),E=`${v};${p};${T}`;let R=a.get(E);R==null&&(R=x.clone(),QA(R,C,m),a.set(E,R)),y.geometry.setAttribute("skinIndex",R)}for(const y of f)y.bind(g,new Le)}}function ZA(s){const e=new Set;return s.traverse(t=>{if(!t.isSkinnedMesh)return;const n=t;e.add(n)}),e}function $A(s,e){const t=new Set;for(let n=0;n<s.count;n++)for(let i=0;i<s.itemSize;i++){const r=Vl(s,n,i);Vl(e,n,i)!==0&&t.add(r)}return t}function KA(s,e){const t=new Map,n=s.skeleton,i=s.geometry,r=i.getAttribute("skinIndex"),o=i.getAttribute("skinWeight"),a=e.get(r),l=a?.get(o);if(!l)throw new Error("Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute.");for(const c of l)t.set(n.bones[c],n.boneInverses[c]);return t}function JA(s,e){for(const[t,n]of s.entries()){const i=e.get(t);if(i!=null&&!eE(n,i))return!1}return!0}function QA(s,e,t){const n=new Map;for(const r of e)n.set(r,n.size);const i=new Map;for(const[r,o]of t.entries()){const a=n.get(o);i.set(a,r)}for(let r=0;r<s.count;r++)for(let o=0;o<s.itemSize;o++){const a=Vl(s,r,o),l=i.get(a);Kg(s,r,o,l)}s.needsUpdate=!0}function eE(s,e,t){if(t=t||1e-4,s.elements.length!=e.elements.length)return!1;for(let n=0,i=s.elements.length;n<i;n++)if(Math.abs(s.elements[n]-e.elements[n])>t)return!1;return!0}var wu=class{constructor(){this._objectIndexMap=new Map,this._index=0}get(s){return this._objectIndexMap.get(s)}getOrCreate(s){let e=this._objectIndexMap.get(s);return e==null&&(e=this._index,this._objectIndexMap.set(s,e),this._index++),e}};function tE(s){var e,t,n,i;const r=new Ve;r.name=s.name,r.setIndex(s.index);for(const[o,a]of Object.entries(s.attributes))r.setAttribute(o,a);for(const[o,a]of Object.entries(s.morphAttributes)){const l=o;r.morphAttributes[l]=a.concat()}r.morphTargetsRelative=s.morphTargetsRelative,r.groups=[];for(const o of s.groups)r.addGroup(o.start,o.count,o.materialIndex);return r.boundingSphere=(t=(e=s.boundingSphere)==null?void 0:e.clone())!=null?t:null,r.boundingBox=(i=(n=s.boundingBox)==null?void 0:n.clone())!=null?i:null,r.drawRange.start=s.drawRange.start,r.drawRange.count=s.drawRange.count,r.userData=s.userData,r}function Ep(s){if(Object.values(s).forEach(e=>{e?.isTexture&&e.dispose()}),s.isShaderMaterial){const e=s.uniforms;e&&Object.values(e).forEach(t=>{const n=t.value;n?.isTexture&&n.dispose()})}s.dispose()}function nE(s){const e=s.geometry;e&&e.dispose();const t=s.skeleton;t&&t.dispose();const n=s.material;n&&(Array.isArray(n)?n.forEach(i=>Ep(i)):n&&Ep(n))}function iE(s){s.traverse(nE)}function sE(s,e){var t,n;console.warn("VRMUtils.removeUnnecessaryJoints: removeUnnecessaryJoints is deprecated. Use combineSkeletons instead. combineSkeletons contributes more to the performance improvement. This function will be removed in the next major version.");const i=(t=e?.experimentalSameBoneCounts)!=null?t:!1,r=[];s.traverse(l=>{l.type==="SkinnedMesh"&&r.push(l)});const o=new Map;let a=0;for(const l of r){const u=l.geometry.getAttribute("skinIndex");if(o.has(u))continue;const h=new Map,d=new Map;for(let f=0;f<u.count;f++)for(let m=0;m<u.itemSize;m++){const _=Vl(u,f,m);let g=h.get(_);g==null&&(g=h.size,h.set(_,g),d.set(g,_)),Kg(u,f,m,g)}u.needsUpdate=!0,o.set(u,d),a=Math.max(a,h.size)}for(const l of r){const u=l.geometry.getAttribute("skinIndex"),h=o.get(u),d=[],f=[],m=i?a:h.size;for(let g=0;g<m;g++){const p=(n=h.get(g))!=null?n:0;d.push(l.skeleton.bones[p]),f.push(l.skeleton.boneInverses[p])}const _=new ss(d,f);l.bind(_,new Le)}}function rE(s,e){const t=s.position.count,n=new Array(t);let i=0;const r=e.array;for(let o=0;o<r.length;o++){const a=r[o];n[a]||(n[a]=!0,i++)}return{isVertexUsed:n,vertexCount:t,verticesUsed:i}}function oE(s){const e=[],t=[];let n=0;for(let i=0;i<s.length;i++)if(s[i]){const r=n++;e[i]=r,t[r]=i}return{originalIndexNewIndexMap:e,newIndexOriginalIndexMap:t}}function aE(s,e){var t,n,i,r;e.name=s.name,e.morphTargetsRelative=s.morphTargetsRelative,s.groups.forEach(o=>{e.addGroup(o.start,o.count,o.materialIndex)}),e.boundingBox=(n=(t=s.boundingBox)==null?void 0:t.clone())!=null?n:null,e.boundingSphere=(r=(i=s.boundingSphere)==null?void 0:i.clone())!=null?r:null,e.setDrawRange(s.drawRange.start,s.drawRange.count),e.userData=s.userData}function lE(s,e,t){const n=e.array,i=new n.constructor(n.length);for(let r=0;r<n.length;r++){const o=n[r];i[r]=t[o]}s.setIndex(new Ze(i,e.itemSize,e.normalized))}function zl(s,e,t){const n=s.constructor,i=new n(e.length*t);let r=!0;for(let o=0;o<e.length;o++){const l=e[o]*t,c=o*t;for(let u=0;u<t;u++){const h=s[l+u];i[c+u]=h,r=r&&h===0}}return[i,r]}function cE(s){var e;const t=new Map,n=[];for(const[i,r]of Object.entries(s))if(r.isInterleavedBufferAttribute){const o=r,a=o.data,l=(e=t.get(a))!=null?e:[];t.set(a,l),l.push([i,o])}else{const o=r;n.push([i,o])}return[t,n]}function uE(s,e,t){const[n,i]=cE(e);for(const[r,o]of n){const a=r.array,{stride:l}=r,[c]=zl(a,t,l),u=new Ks(c,l);u.setUsage(r.usage);for(const[h,d]of o){const{itemSize:f,offset:m,normalized:_}=d,g=new ai(u,f,m,_);s.setAttribute(h,g)}}for(const[r,o]of i){const a=o.array,{itemSize:l,normalized:c}=o,[u]=zl(a,t,l);s.setAttribute(r,new Ze(u,l,c))}}function hE(s){var e;const t=new Map,n=[];for(const[i,r]of Object.entries(s)){const o=i;for(let a=0;a<r.length;a++){const l=r[a];if(l.isInterleavedBufferAttribute){const c=l,u=c.data,h=(e=t.get(u))!=null?e:[];t.set(u,h),h.push([o,a,c])}else{const c=l;n.push([o,a,c])}}}return[t,n]}function dE(s,e,t){var n,i;let r=!0;const[o,a]=hE(e),l={};for(const[c,u]of o){const h=c.array,{stride:d}=c,[f,m]=zl(h,t,d);r=r&&m;const _=new Ks(f,d);_.setUsage(c.usage);for(const[g,p,y]of u){const{itemSize:x,offset:v,normalized:C}=y,T=new ai(_,x,v,C);(n=l[g])!=null||(l[g]=[]),l[g][p]=T}}for(const[c,u,h]of a){const d=h,f=d.array,{itemSize:m,normalized:_}=d,[g,p]=zl(f,t,m);r=r&&p,(i=l[c])!=null||(l[c]=[]),l[c][u]=new Ze(g,m,_)}s.morphAttributes=r?{}:l}function fE(s){const e=new Map;s.traverse(t=>{if(!t.isMesh)return;const n=t,i=n.geometry,r=i.index;if(r==null)return;const o=e.get(i);if(o!=null){n.geometry=o;return}const{isVertexUsed:a,vertexCount:l,verticesUsed:c}=rE(i.attributes,r);if(c===l)return;const{originalIndexNewIndexMap:u,newIndexOriginalIndexMap:h}=oE(a),d=new Ve;aE(i,d),e.set(i,d),lE(d,r,u),uE(d,i.attributes,h),dE(d,i.morphAttributes,h),n.geometry=d}),Array.from(e.keys()).forEach(t=>{t.dispose()})}function pE(s){var e;((e=s.meta)==null?void 0:e.metaVersion)==="0"&&(s.scene.rotation.y=Math.PI)}var ti=class{constructor(){}};ti.combineMorphs=YA;ti.combineSkeletons=jA;ti.deepDispose=iE;ti.removeUnnecessaryJoints=sE;ti.removeUnnecessaryVertices=fE;ti.rotateVRM0=pE;/*!
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
 */const mE={mau:"_mau",macDinh:{height:1.6,yOffset:0},vuKhiMacDinh:{sword:"kiem-sat-lu-khach",great:"dai-kiem-xom-mo",spear:"thuong-go-lim",bow:"cung-tre-dau-lang",cat:"vo-chep-thay-do"},camVuKhi:{sword:{bone:"rightHand",pos:[-.07,-.02,.12],rot:[90,0,0],scale:.75},great:{bone:"rightHand",pos:[-.07,-.02,.2],rot:[90,0,0],scale:.85},spear:{bone:"rightHand",pos:[-.07,-.02,.45],rot:[90,0,0],scale:.9},bow:{bone:"leftHand",pos:[.07,0,0],rot:[0,0,90],scale:.85},cat:{bone:"rightHand",pos:[-.08,.08,0],rot:[0,0,0],scale:.6}},hoatAnh:{sword:{stand:"swordIdle",atk:["sword1","sword2","sword3"],charge:"cast",skill:"skill",burst:"burst",speed:1},great:{stand:"swordIdle",atk:["great1","great2","great3"],charge:"cast",skill:"skill",burst:"burst",speed:.75},spear:{stand:"idle",atk:["spear1","spear2","spear3"],charge:"cast",skill:"skill",burst:"burst",speed:1},bow:{stand:"idle",atk:["bow1","bow2","bow3"],charge:"bowAim",skill:"skill",burst:"bowBurst",speed:1},cat:{stand:"idle",atk:["cat1","cat2","cat3"],charge:"cast",skill:"skill",burst:"burst",speed:1}},nhanVat:{havy:{height:1.55}}};a0(["sword","great","spear","bow","cat"]);const Rp=o0([Fs(),Fs(),Fs()]),Tu=s=>Mo({sword:s,great:s,spear:s,bow:s,cat:s}),Cp=Mo({height:Fs().positive(),yOffset:Fs().default(0)}),gE=Mo({mau:di().min(1),macDinh:Cp,vuKhiMacDinh:Tu(di()),camVuKhi:Tu(Mo({bone:di(),pos:Rp,rot:Rp,scale:Fs().positive()})),hoatAnh:Tu(Mo({stand:di(),atk:r0(di()).length(3),charge:di(),skill:di(),burst:di(),speed:Fs().positive()})),nhanVat:s0(di(),Cp.partial()).default({})});function _E(s){return gE.parse(s)}let As=null;function vE(){if(As)return As;const s=new Uint8Array([90,90,90,255,175,175,175,255,255,255,255,255]);return As=new On(s,3,1,Kt),As.minFilter=As.magFilter=Ot,As.needsUpdate=!0,As}function $t(s={}){return new Fh({gradientMap:vE(),...s})}const Pp=new Map;function Mc(s=.025,e=2761272){const t=`${s}:${e}`;let n=Pp.get(t);return n||(n=new Mt({color:e,side:jt}),n.onBeforeCompile=i=>{i.uniforms.uW={value:s},i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uW;`).replace("#include <begin_vertex>","vec3 transformed = position + normalize(normal) * uW;")},n.customProgramCacheKey=()=>"outline",Pp.set(t,n),n)}function mo(s,e,t){const n=Mc(e,t);let i;if(s.isInstancedMesh){const r=s;i=new ei(r.geometry,n,r.count),i.instanceMatrix=r.instanceMatrix}else i=new je(s.geometry,n);return i.castShadow=!1,i.receiveShadow=!1,s.add(i),i}const vt=(s,e,t=0)=>{let n=s*374761393+e*668265263+t*2147483647|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296};function Zi(s,e,t=0){const n=Math.floor(s),i=Math.floor(e),r=s-n,o=e-i,a=r*r*(3-2*r),l=o*o*(3-2*o),c=vt(n,i,t),u=vt(n+1,i,t),h=vt(n,i+1,t),d=vt(n+1,i+1,t);return c+(u-c)*a+(h-c)*l+(c-u-h+d)*a*l}const yo={uFadeS:{value:new K(-1e5,-1e5)},uFadeZ:{value:0},uFadeR:{value:0}};function Ip(s){if(s.userData?.fade)return;s.userData.fade=!0;const e=s.onBeforeCompile;s.onBeforeCompile=(t,n)=>{e?.call(s,t,n),Object.assign(t.uniforms,yo),t.fragmentShader=t.fragmentShader.replace("void main() {",`uniform vec2 uFadeS; uniform float uFadeZ; uniform float uFadeR;
void main() {
  if (uFadeR > 0.0 && gl_FragCoord.z < uFadeZ) {
    float k = 1.0 - smoothstep(uFadeR * 0.55, uFadeR, distance(gl_FragCoord.xy, uFadeS));
    float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    if (n < k * 0.8) discard;
  }`)},s.customProgramCacheKey=()=>"fade",s.needsUpdate=!0}const Ps=_E(mE),Hl="./",Jg=new Eg;Jg.register(s=>new XA(s));const xE=new Eg;let yE=null;function ME(){return yE??(yE=fetch(`${Hl}media/anim/humanoid.json`).then(s=>s.ok?s.json():null).catch(()=>null))}const Lp=new Map;function SE(s){let e=Lp.get(s);return e||(e=fetch(s,{method:"HEAD"}).then(t=>t.ok&&!(t.headers.get("content-type")??"").includes("text/html")).catch(()=>typeof caches>"u"?!1:caches.match(s).then(t=>!!t,()=>!1)),Lp.set(s,e)),e}const Up=new Map;function bE(s){let e=Up.get(s);return e||(e=xE.loadAsync(`${Hl}media/models/weapons/${s}.glb`).then(t=>{const n=[];return t.scene.traverse(i=>i.isMesh&&n.push(i)),n.forEach(i=>{const r=i.material,o=r.name.startsWith("glow_");i.material=$t({color:r.color,emissive:o?r.color:new Z(0),emissiveIntensity:o?1.6:0}),i.castShadow=!0;const a=new je(i.geometry,Mc(.006));i.add(a)}),t.scene}).catch(t=>(console.warn("[3d] không tải được vũ khí",s,t),null)),Up.set(s,e)),e.then(t=>t?t.clone():null)}class nd{constructor(e,t,n,i,r){Pn(this,"obj",new Ge);Pn(this,"mixer");Pn(this,"actions",new Map);Pn(this,"cur",null);Pn(this,"curName","");Pn(this,"weapon",null);this.vrm=e,this.wtype=t,this.src=r,this.mixer=new Mg(e.scene);const o=e.humanoid,a=o.getNormalizedBoneNode("hips"),l=a.position.clone();e.scene.updateMatrixWorld(!0);const c=Math.max(.3,a.getWorldPosition(new w).y),u=e.meta?.metaVersion==="0";for(const[h,d]of Object.entries(n)){const f=Array.from({length:d.n},(g,p)=>p/i),m=[];for(const[g,p]of Object.entries(d.bones)){const y=o.getNormalizedBoneNode(g);if(!y)continue;const x=p.q.flatMap(([v,C,T,E])=>u?[-v,C,-T,E]:[v,C,T,E]);m.push(new ts(`${y.name}.quaternion`,f,x))}const _=d.hips.flatMap(([g,p,y])=>[l.x+(u?-g:g)*c,l.y+p*c,l.z+(u?-y:y)*c]);m.push(new ns(`${a.name}.position`,f,_)),this.actions.set(h,this.mixer.clipAction(new $s(h,-1,m)))}this.obj.add(e.scene)}static async load(e,t,n,i){const r=`${Hl}media/models/${e}/model.vrm`,o=await SE(r)?r:`${Hl}media/models/${Ps.mau}/model.vrm`,[a,l]=await Promise.all([Jg.loadAsync(o).catch(()=>null),ME()]),c=a?.userData.vrm;if(!c||!l)return null;ti.removeUnnecessaryVertices(c.scene),ti.combineSkeletons(c.scene),ti.rotateVRM0(c);const u=o!==r&&i?wE(i):null;c.scene.traverse(g=>{if(g.isMesh){g.castShadow=!0,g.frustumCulled=!1;for(const p of[g.material].flat()){if(!p?.isMToonMaterial)continue;const y=u?.(p.name??"");y&&(p.color?.copy(y).multiplyScalar(1.25),p.shadeColorFactor?.copy(y).multiplyScalar(.6)),p.shadeColorFactor?.lerp(new Z(6970010),.25),p.parametricRimColorFactor?.set(8022608),p.parametricRimFresnelPowerFactor=5,p.parametricRimLiftFactor=0,p.rimLightingMixFactor=1}}});const h={...Ps.macDinh,...Ps.nhanVat[e]??{}},d=new Jt().setFromObject(c.scene),f=h.height/Math.max(.1,d.max.y-d.min.y),m=new nd(c,t,l.clips,l.fps,o);m.obj.scale.setScalar(f),m.obj.updateMatrixWorld(!0),m.obj.userData.yOff=h.yOffset-d.min.y*f;const _=n??Ps.vuKhiMacDinh[t];if(_){const g=await bE(_),p=Ps.camVuKhi[t],y=c.humanoid.getRawBoneNode(p.bone);if(g&&y){const x=new Ge,v=y.getWorldScale(new w).x||1;x.position.fromArray(p.pos).divideScalar(v),x.rotation.set(...p.rot.map(C=>C*Math.PI/180)),x.scale.setScalar(p.scale/v),x.add(g),y.add(x),m.weapon=x}}return m}has(e){return this.actions.has(e)}play(e,t={}){const n=this.actions.get(e);n&&(n.timeScale=t.speed??1,!(this.cur===n&&!t.restart)&&(n.reset(),n.setLoop(t.once?fh:ph,1/0),n.clampWhenFinished=!!t.once,n.enabled=!0,n.setEffectiveWeight(1),n.play(),this.cur&&this.cur!==n&&this.cur.crossFadeTo(n,t.fade??.15,!1),this.cur=n,this.curName=e))}duration(e){return this.actions.get(e)?.getClip().duration??.5}update(e){this.mixer.update(e),this.vrm.update(e)}dispose(){this.mixer.stopAllAction(),this.obj.removeFromParent(),ti.deepDispose(this.vrm.scene)}}function wE(s){const e=o=>o?new Z(o):null,t=e(s.hair),n=e(s.outfit),i=e(s.eye),r=e(s.accent);return o=>/HAIR/i.test(o)?t:/EyeIris/i.test(o)?i:/Shoes/i.test(o)?r:/Tops|Bottoms|CLOTH/i.test(o)?n:null}function Wt(s,e,t,n=.03,i){const r=$t({color:e,emissive:i??0,emissiveIntensity:i?1.2:0});t.push(r);const o=new je(s,r);return o.castShadow=!0,n&&o.add(new je(s,Mc(n))),o}function Ya(s,e,t,n,i,r,o=16777215){for(const a of[-1,1]){const l=Wt(new An(i,10,8),o,r,0);l.position.set(a*n,e,t);const c=Wt(new An(i*.55,8,6),1709094,r,0);c.position.set(0,0,i*.6),l.add(c),s.add(l)}}function TE(s){const e=new Ge,t=new Ge,n=[];e.add(t);const i=Un[s.el??"water"]??Un.water,r=Math.max(.5,(s.r??14)/16);if(s.isBoss){const o=[];for(let c=0;c<9;c++){const u=.7-c*.055,h=Wt(new os(u,2),c%2?2830154:3422812,n,.05);h.position.set(0,u,-c*.65),t.add(h),o.push(h)}const a=o[0];for(const c of[-1,1]){const u=Wt(new Ai(.12,.7,6),15260864,n,.02);u.position.set(c*.35,.55,-.15),u.rotation.set(-.6,0,c*-.35),a.add(u)}Ya(a,.18,.55,.28,.12,n,new Z(i.c).getHex());const l=Wt(new Ai(.25,.8,4),new Z(i.c).getHex(),n,.02,i.c);return l.position.set(0,.75,-.3),a.add(l),e.scale.setScalar(1.2),{obj:e,body:t,mats:n,boss:!0,segs:o}}if(s.type==="slime"){const o=Wt(new An(.42,18,12),i.c,n);o.scale.set(1,.78,1),o.position.y=.33,t.add(o),Ya(o,.08,.34,.14,.07,n)}else if(s.type==="golem"){const o=Wt(new Yt(.9,.8,.6),9077880,n,.035);o.position.y=.95,t.add(o);const a=Wt(new Pi(.16,0),i.c,n,0,i.c);a.position.set(0,.05,.31),o.add(a);const l=Wt(new Yt(.42,.34,.4),10130568,n,.03);l.position.y=.6,o.add(l),Ya(l,.03,.2,.1,.05,n,new Z(i.c).getHex());for(const c of[-1,1]){const u=Wt(new Yt(.28,.75,.3),8025192,n,.03);u.position.set(c*.62,-.15,0),o.add(u);const h=Wt(new Yt(.3,.55,.32),7235678,n,.03);h.position.set(c*.24,.28,0),t.add(h)}}else{const o=s.type==="shaman"?3880304:s.type==="archer"?4942650:7027242,a=s.type==="archer"?15260864:s.type==="shaman"?14278896:15853263,l=Wt(new hn(.2,.32,.55,10),o,n);l.position.y=.42,t.add(l);const c=Wt(new An(.26,14,10),a,n);c.position.y=.48,l.add(c),Ya(c,.02,.22,.09,.05,n,16769136);for(const h of[-1,1]){const d=Wt(new Ai(.07,.24,5),a,n,.015);d.position.set(h*.25,.1,0),d.rotation.z=h*-1.2,c.add(d)}const u=new Ge;if(u.position.set(.3,.05,.1),l.add(u),s.type==="archer"){const h=Wt(new Js(.28,.025,4,12,Math.PI),6965802,n,.01);h.rotation.z=Math.PI/2,u.add(h)}else if(s.type==="shaman"){const h=Wt(new hn(.025,.025,.9,5),5913130,n,.01);h.position.y=.2,u.add(h);const d=Wt(new An(.09,10,8),i.c,n,0,i.c);d.position.y=.68,u.add(d)}else{const h=Wt(new hn(.06,.035,.5,6),8016434,n,.012);h.rotation.x=Math.PI/2.4,h.position.z=.15,u.add(h)}t.userData.hand=u}return e.scale.setScalar(r),{obj:e,body:t,mats:n,boss:!1}}const AE=new Z(16777215);function EE(s,e,t,n){s.obj.rotation.y=n;const i=e.tele?e.tele.t/e.tele.dur:0,r=e.swing>0?e.swing:0;if(s.boss&&s.segs)s.segs.forEach((a,l)=>{a.position.x=Math.sin(t*2.4-l*.7)*.25*Math.min(1,l/2),a.position.y=.7-l*.055+Math.sin(t*1.8-l*.5)*.08+(l===0?i*.6:0)});else{const a=Math.abs(Math.sin(t*9+(e.x??0)))*(e.moving||e.vx||e.vy?.12:.03);s.body.position.y=a,s.body.rotation.x=-i*.35+r*.5,s.body.scale.set(1+r*.12,1-r*.12+a*.5,1+r*.12)}const o=Math.min(1,(e.flash??0)*6);for(const a of s.mats){a.userData.e0||(a.userData.e0={c:a.emissive.clone(),i:a.emissiveIntensity});const l=a.userData.e0;a.emissive.copy(l.c).lerp(AE,o),a.emissiveIntensity=l.i+o*.9}}function RE(){const s=new Ut({side:jt,depthWrite:!1,fog:!1,uniforms:{uT:{value:0},uTop:{value:new Z(5218280)},uHor:{value:new Z(13626111)},uCloud:{value:new Z(16777215)},uShade:{value:new Z(12110060)},uNight:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); vec4 p = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position = p.xyww; }",fragmentShader:`uniform float uT; uniform vec3 uTop, uHor, uCloud, uShade; uniform float uNight; varying vec3 vD;
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
      }`}),e=new je(new An(30,32,16),s);return e.frustumCulled=!1,e.renderOrder=-1,{mesh:e,mat:s}}const qe={box:(s,e,t)=>new Yt(s,e,t),cyl:(s,e,t,n=10)=>new hn(s,e,t,n),sph:(s,e=12)=>new An(s,e,Math.max(6,e*2/3)),ico:(s,e=1)=>new os(s,e),cone:(s,e,t=8)=>new Ai(s,e,t)};function Ye(s,e,t=.02,n,i=1.2){const r=$t({color:e,emissive:n??0,emissiveIntensity:n!==void 0?i:0}),o=new je(s,r);return o.castShadow=!0,o.receiveShadow=!0,t&&o.add(new je(s,Mc(t))),o}const st=(s,e,t,n)=>(s.position.set(e,t,n),s),Au=s=>s.material;function Dp(s=1){const e=new Ge,t=Ye(qe.cone(.12*s,.36*s,7),16747066,0,16738848,1.8),n=Ye(qe.cone(.06*s,.22*s,6),16769152,0,16765024,2.2);return n.position.y=-.03*s,e.add(t,n),e}const Np=(s,e,t=0)=>{const n=1+Math.sin(e*17+t)*.08+Math.sin(e*29+t*2)*.05;s.scale.set(1/n,n,1/n)};function Op(s=.55,e=.12,t=9078392){return st(Ye(qe.cyl(s*.55,s*.62,e,8),t,.02),0,e/2,0)}const Gl={den(){const s=new Ge;s.add(Op(.5)),s.add(st(Ye(qe.cyl(.11,.14,.55,6),8223346),0,.39,0));const e=st(Ye(qe.cyl(.24,.2,.12,6),6052436),0,.72,0);s.add(e);const t=st(Ye(qe.cyl(.16,.1,.08,8),4868162),0,.82,0);s.add(t);const n=st(Dp(1.1),0,1,0),i=new Hs(16752720,0,3.2,1.6);return i.position.y=1.05,s.add(n,i),{obj:s,upd(r,o){n.visible=r.xong,Np(n,o,r.x);const a=r.henGio===null?1:.45+.55*r.henGio;n.scale.multiplyScalar(a),i.intensity=r.xong?2.2*a:0}}},denLan(){const s=Gl.den(),e=st(Ye(qe.box(.26,.26,.26),12601914,.02),0,1.05,0);e.rotation.y=Math.PI/4,s.obj.add(e);const t=s.upd;return{obj:s.obj,upd(n,i){t(n,i);const r=Au(e);r.emissive.set(n.xong?16748624:n.trangThai>0?8400928:0),r.emissiveIntensity=n.xong?1.6+Math.sin(i*6)*.2:1,e.rotation.y=Math.PI/4+(n.xong?i*.8:0)}}},gai(){const s=new Ge,e=[];for(let n=0;n<9;n++){const i=n/9*Math.PI*2,r=.2+vt(n,3)*.2,o=Ye(qe.cone(.09,.55+vt(n,7)*.3,5),4872746,.015);o.position.set(Math.cos(i)*r,.25,Math.sin(i)*r),o.rotation.set(Math.sin(i)*.5,0,-Math.cos(i)*.5),e.push(o),s.add(o)}s.add(st(Ye(qe.ico(.32,1),4016674,.02),0,.2,0));const t=st(Ye(qe.cyl(.45,.5,.05,10),3814964,0),0,.03,0);return s.add(t),{obj:s,upd(n){for(const i of e)i.visible=!n.xong;s.children[9].visible=!n.xong,t.visible=n.xong}}},bangChan(){const s=new Ge,e=new Ge;for(let n=0;n<4;n++){const i=Ye(qe.ico(.35-n*.04,0),11068671,.02,4894944,.25);i.position.set((n-1.5)*.22,.32+n%2*.12,n%2*.1),i.rotation.set(n,n*2,0),e.add(i)}const t=st(Ye(qe.cyl(.5,.5,.02,12),8044776,0),0,.02,0);return s.add(e,t),{obj:s,upd(n){e.visible=!n.xong,t.visible=n.xong}}},bon(){const s=new Ge;s.add(st(Ye(qe.cyl(.42,.36,.34,10),9078392),0,.17,0));const e=st(Ye(qe.cyl(.33,.33,.02,10),5920334,0),0,.33,0),t=st(Ye(qe.cyl(.33,.33,.04,14),4892904,0,2783424,.35),0,.32,0);return s.add(e,t),{obj:s,upd(n,i){t.visible=n.xong||n.trangThai>0,t.position.y=.3+Math.sin(i*2+n.x)*.006}}},bonHoi(){const s=Gl.bon(),e=st(Ye(qe.cyl(.36,.36,.08,10),11577488,.02),0,.38,0),t=[];for(let i=0;i<4;i++){const r=Ye(qe.sph(.12,8),16777215,0);r.material.transparent=!0,t.push(r),s.obj.add(r)}s.obj.add(e);const n=s.upd;return{obj:s.obj,upd(i,r){n(i,r),e.position.y=i.xong?.38+.9:.38,t.forEach((o,a)=>{o.visible=i.xong;const l=(r*.6+a/4)%1;o.position.set(Math.sin(a*2.3)*.15,.4+l*.9,Math.cos(a*1.7)*.15),o.scale.setScalar(.6+l*.8),o.material.opacity=.7*(1-l)})}}},lua(){const s=new Ge,e=[];for(let i=0;i<5;i++){const r=Dp(1.4+vt(i,1)*.6);r.position.set((i-2)*.18,.18,Math.sin(i*2.1)*.12),e.push(r),s.add(r)}const t=st(Ye(qe.cyl(.5,.55,.06,10),2761248,0),0,.03,0),n=new Hs(16744512,2,3.5,1.5);return n.position.y=.6,s.add(t,n),{obj:s,upd(i,r){e.forEach((o,a)=>(o.visible=!i.xong,Np(o,r,a*1.7))),n.intensity=i.xong?0:2+Math.sin(r*13)*.4}}},mam(){const s=new Ge;s.add(st(Ye(qe.cyl(.3,.36,.12,8),8018490),0,.06,0));const e=st(Ye(qe.cone(.06,.35,5),9075274,.015),0,.28,0);e.rotation.z=.5;const t=new Ge;for(let i=0;i<5;i++){const r=Ye(qe.box(.7,.05,.45),i%2?5943368:6997080,.015);r.position.set(0,.12,-.4-i*.42),r.rotation.y=(i%2?1:-1)*.15,t.add(r)}const n=st(Ye(qe.cyl(.06,.08,.6,6),3836474,.015),0,.3,0);return s.add(e,t,n),{obj:s,upd(i){e.visible=!i.xong,t.visible=n.visible=i.xong,t.rotation.y={n:0,s:Math.PI,e:-Math.PI/2,w:Math.PI/2}[i.huong]}}},cot(){const s=new Ge,e=st(Ye(qe.box(.7,.06,.7),6973020,.015),0,.03,0),t=st(Ye(qe.box(.36,.02,.36),15315514,0,15315514,.4),0,.07,0),n=st(Ye(qe.cyl(.26,.3,1,6),12098138,.025),0,.55,0);return s.add(e,t,n),{obj:s,upd(i,r){n.visible=i.xong,Au(t).emissiveIntensity=i.xong?1.6:.3+Math.sin(r*3)*.15}}},cau(){const s=new Ge,e=[];for(let t=0;t<6;t++){const n=Ye(qe.box(.9,.08,.3),9071170,.015);n.position.set(0,.05,(t-2.5)*.34),e.push(n),s.add(n)}for(const t of[-1,1])s.add(st(Ye(qe.box(.06,.06,2.1),6965802,.012),t*.45,.14,0));return{obj:s,upd(t){e.forEach((n,i)=>{const r=!t.xong&&(i===2||i===3);n.visible=!r,n.rotation.z=t.xong?0:i%2?.08:-.06}),s.rotation.y=t.huong==="e"||t.huong==="w"?Math.PI/2:0}}},tuong(){const s=new Ge,e=new Ge;for(let i=0;i<3;i++)for(let r=0;r<3;r++){const o=Ye(qe.box(.34,.32,.4),i===1&&r===1?8025190:9077878,.015);o.position.set((r-1)*.35+i%2*.06,.17+i*.33,0),e.add(o)}const t=st(Ye(qe.box(.04,.6,.42),2762272,0),.02,.5,0);t.rotation.z=.4;const n=new Ge;for(let i=0;i<6;i++){const r=Ye(qe.ico(.1+vt(i,9)*.06,0),9077878,.012);r.position.set((vt(i,2)-.5)*.9,.07,(vt(i,5)-.5)*.6),n.add(r)}return s.add(e,t,n),{obj:s,upd(i){e.visible=t.visible=!i.xong,n.visible=i.xong,s.rotation.y=i.huong==="e"||i.huong==="w"?Math.PI/2:0}}},coi(){const s=new Ge;s.add(st(Ye(qe.cyl(.22,.3,1.1,8),14207136,.02),0,.55,0)),s.add(st(Ye(qe.cone(.32,.3,8),9062970,.02),0,1.25,0));const e=st(new Ge,0,.95,.3);for(let t=0;t<4;t++){const n=Ye(qe.box(.12,.6,.03),15788240,.012);n.position.y=.32;const i=new Ge;i.rotation.z=t*Math.PI/2,i.add(n),e.add(i)}return s.add(e),{obj:s,upd(t,n){e.rotation.z=t.xong?-n*4:.2}}},suong(){const s=new Ge,e=[];for(let t=0;t<7;t++){const n=Ye(qe.sph(.3+vt(t,4)*.15,10),10119880,0,6961824,.4),i=n.material;i.transparent=!0,i.opacity=.55,i.depthWrite=!1,n.castShadow=!1,e.push(n),s.add(n)}return{obj:s,upd(t,n){e.forEach((i,r)=>{i.visible=!t.xong,i.position.set(Math.sin(n*.5+r*1.3)*.4,.35+Math.sin(n*.8+r)*.1+r%3*.15,Math.cos(n*.4+r*2.1)*.35)})}}},luongGio(){const s=new Ge;s.add(st(Ye(qe.cyl(.4,.46,.1,10),6982266,.015),0,.05,0));const e=st(Ye(qe.cyl(.28,.28,.02,12),2767412,0),0,.11,0);s.add(e);const t=[];for(let n=0;n<3;n++){const i=new je(new Js(.3,.025,6,20),new Mt({color:12449508,transparent:!0,depthWrite:!1}));i.rotation.x=Math.PI/2,t.push(i),s.add(i)}return{obj:s,upd(n,i){t.forEach((r,o)=>{r.visible=n.xong;const a=(i*.9+o/3)%1;r.position.y=.15+a*1.8,r.scale.setScalar(1+a*.6),r.material.opacity=.8*(1-a)})}}},bangMat(){const s=new Ge,e=st(Ye(qe.box(.95,.02,.95),2775706,0,1718896,.3),0,.01,0),t=st(Ye(qe.box(.9,.08,.9),12577023,.012,8046832,.25),0,.04,0);return s.add(e,t),{obj:s,upd(n){t.visible=n.xong}}},loiTru(){const s=new Ge;s.add(Op(.55)),s.add(st(Ye(qe.cyl(.08,.1,1.2,6),5921386,.02),0,.7,0));const e=st(Ye(qe.ico(.16,1),12088115,.015,11828223,0),0,1,0),t=st(Ye(qe.cone(.06,.25,6),12632272,.012),0,1.42,0),n=new Hs(11828223,0,3,1.6);return n.position.y=1.1,s.add(e,t,n),{obj:s,upd(i,r){const o=Au(e);o.emissiveIntensity=i.xong?1.8+Math.sin(r*20)*.4:i.trangThai>0?.6:0,e.rotation.y=r*(i.xong?3:.3),n.intensity=i.xong?2:0}}}};function CE(s){let e=0;for(const p of s)e=e*31+p.charCodeAt(0)|0;const t=p=>vt(e&65535,p),n=[6965898,3828362,9067066,4880986,9058890,5921402],i=[3811872,1710628,9071162,13156528,6961706,2767450],r=[15913648,15253658,14198912,16178372],o=n[Math.floor(t(1)*n.length)],a=i[Math.floor(t(2)*i.length)],l=r[Math.floor(t(3)*r.length)],c=.85+t(4)*.25,u=new Ge,h=new Ge;u.add(h),h.scale.setScalar(c),h.add(st(Ye(qe.cyl(.17,.3,.7,10),o,.02),0,.35,0)),h.add(st(Ye(qe.cyl(.18,.18,.08,10),14731408,.012),0,.5,0));const d=st(Ye(qe.sph(.22,14),l,.02),0,.95,0);h.add(d);const f=Ye(qe.sph(.235,14),a,.02);f.scale.set(1,.75,1),f.position.set(0,.06,-.03),d.add(f),t(5)>.5&&d.add(st(Ye(qe.sph(.11,8),a,.015),0,.1,-.2));for(const p of[-1,1]){const y=Ye(qe.sph(.035,8),1709094,0);y.position.set(p*.08,-.01,.19),d.add(y);const x=Ye(qe.cyl(.05,.06,.45,6),o,.015);x.position.set(p*.22,.48,0),x.rotation.z=p*.25,h.add(x),x.add(st(Ye(qe.sph(.06,8),l,0),0,-.25,0))}const m=new Ge;m.add(st(Ye(qe.box(.07,.24,.07),16769658,.015,16760896,1.4),0,.12,0)),m.add(st(Ye(qe.box(.07,.07,.07),16769658,.015,16760896,1.4),0,-.06,0));const _=new Ge;for(let p=0;p<3;p++)_.add(st(Ye(qe.sph(.045,8),10479871,.01,6998256,1.2),(p-1)*.12,0,0));const g=st(new Ge,0,1.45*c,0);return g.add(m,_),u.add(g),{obj:u,body:h,head:d,mark:g,bang:m,dots:_,yaw:t(6)*Math.PI*2}}function PE(s){const e=new Ge;s.add(e);const t=new Map,n=new Map,i=r=>{r.removeFromParent(),r.traverse(o=>{o.geometry?.dispose(),o.material&&!o.material.side&&o.material.dispose?.()})};return{sync(r,o,a,l,c,u,h){const d=new Set;for(const m of r?.puzzles??[])for(const _ of m.objs){if(!h(_.x,_.y))continue;const g=Gl[_.loai];if(!g)continue;d.add(_);let p=t.get(_);p||(p=g(),t.set(_,p),e.add(p.obj));const y=t0(_,l);p.obj.position.set(_.x/l,c(_.x,_.y),_.y/l),p.upd?.(y,u),_.flash>0?p.obj.scale.setScalar(1+_.flash*.12):p.obj.scale.setScalar(1)}for(const[m,_]of t)d.has(m)||(i(_.obj),t.delete(m));const f=new Set;for(const m of r?.npcs??[]){if(!h(m.x,m.y))continue;f.add(m);let _=n.get(m);_||(_=CE(m.mini?.id??`${m.x},${m.y}`),n.set(m,_),e.add(_.obj)),_.obj.position.set(m.x/l,c(m.x,m.y),m.y/l);let y=(Math.hypot(o.x-m.x,o.y-m.y)<l*4?Math.atan2(o.x-m.x,o.y-m.y):_.yaw)-_.obj.rotation.y;y=Math.atan2(Math.sin(y),Math.cos(y)),_.obj.rotation.y+=y*.08,_.body.position.y=Math.sin(u*2+_.yaw)*.015,_.head.rotation.z=Math.sin(u*1.3+_.yaw)*.05;const x=m.mini?.id,v=x&&a.mini.includes(x),C=x&&a.talked.includes(x);_.mark.visible=!v,_.bang.visible=!C,_.dots.visible=!!C,_.mark.position.y=1.45*_.body.scale.y+Math.sin(u*4)*.05,_.mark.rotation.y=u*1.5-_.obj.rotation.y}for(const[m,_]of n)f.has(m)||(i(_.obj),n.delete(m))},has(r){return!!Gl[r]},dispose(){for(const r of t.values())i(r.obj);for(const r of n.values())i(r.obj);t.clear(),n.clear(),e.removeFromParent()}}}const Wl=22/40,Gs=-.14,Eu=-.7,IE=22;function LE(s,e,t){if(e<0||t<0||e>=Xt||t>=Ws)return Eu;const n=t*Xt+e,i=s.m[n];return i===It.WATER||i===It.DEEP||i===It.BRIDGE?i===It.DEEP?Eu-.3:Eu:i===It.TREE||i===It.ROCK?i===It.ROCK&&s.h[n]>1?s.h[n]*Wl:0:(s.h?.[n]??0)*Wl}function UE(s,e){const t=Xt*e+1,n=new Float32Array(t*t);for(let r=0;r<t;r++)for(let o=0;o<t;o++){const a=o/e,l=r/e,c=o%e===0,u=r%e===0;let h=-9;for(const d of c?[-1,0]:[0])for(const f of u?[-1,0]:[0])h=Math.max(h,LE(s,Math.floor(a)+d,Math.floor(l)+f));n[r*t+o]=h}const i=new Float32Array(t*t);for(let r=0;r<2;r++){for(let o=0;o<t;o++)for(let a=0;a<t;a++){let l=0,c=0;for(let h=-1;h<=1;h++)for(let d=-1;d<=1;d++){const f=a+d,m=o+h;f<0||m<0||f>=t||m>=t||(l+=n[m*t+f],c++)}const u=n[o*t+a];i[o*t+a]=u+(l/c-u)*(u<Gs?.9:.55)}n.set(i)}for(let r=0;r<t;r++)for(let o=0;o<t;o++)n[r*t+o]+=(Zi(o/(e*2.5),r/(e*2.5),3)-.5)*.06;return{R:e,n:t,h:n,at(r,o){const a=Math.min(t-1.001,Math.max(0,r*e)),l=Math.min(t-1.001,Math.max(0,o*e)),c=Math.floor(a),u=Math.floor(l),h=a-c,d=l-u,f=n[u*t+c],m=n[u*t+c+1],_=n[(u+1)*t+c],g=n[(u+1)*t+c+1];return f+(m-f)*h+(_-f)*d+(f-m-_+g)*h*d}}}const Gn={grass:new Z(8176474),grass2:new Z(6270540),path:new Z(13804650),sand:new Z(15785120),bed:new Z(13220234),rock:new Z(10129286),rock2:new Z(8023923),ledge:new Z(9424738)};function DE(s,e,t,n,i,r){if(e<0||t<0||e>=Xt||t>=Ws)return n.copy(Gn.bed);const o=s.m[t*Xt+e];return o===It.PATH?n.copy(Gn.path):o===It.SAND?n.copy(Gn.sand):o===It.WATER||o===It.DEEP||o===It.BRIDGE?n.copy(Gn.bed):o===It.ROCK&&s.h[t*Xt+e]>1?n.copy(Gn.rock):o===It.LEDGE?n.copy(Gn.ledge):n.copy(Gn.grass).lerp(Gn.grass2,Zi(i*.35,r*.35,9))}function NE(s,e,t,n=!1){const i=new Ge,{R:r,n:o,h:a}=e,l=new Float32Array(o*o),c=new Float32Array(o*o),u=new Float32Array(o*o*3),h=new Z,d=new Z;for(let _=0;_<o;_++)for(let g=0;g<o;g++){const p=_*o+g,y=g/r,x=_/r,v=(a[Math.min(o-1,g+1)+_*o]-a[Math.max(0,g-1)+_*o])*r*.5,C=(a[g+Math.min(o-1,_+1)*o]-a[g+Math.max(0,_-1)*o])*r*.5,T=Math.hypot(v,C),E=Math.min(1,T*.8)*.16;l[p]=y+(Zi(y*2.1,x*2.1,1)-.5)*E*2,c[p]=x+(Zi(y*2.1,x*2.1,2)-.5)*E*2,d.setRGB(0,0,0);for(let M=0;M<4;M++){const I=(M&1?.22:-.22)+(Zi(y*.9,x*.9,5)-.5)*.7,V=(M&2?.22:-.22)+(Zi(y*.9,x*.9,6)-.5)*.7;DE(s,Math.floor(y+I),Math.floor(x+V),h,y,x),d.r+=h.r/4,d.g+=h.g/4,d.b+=h.b/4}const R=a[p];if(T>.9){const M=Math.floor(R/.18)%2?Gn.rock2:Gn.rock;d.lerp(M,Math.min(1,(T-.9)*1.5))}R<Gs+.06&&R>Gs-.25&&d.lerp(Gn.sand,.6);const b=.94+vt(g,_,4)*.06;u[p*3]=d.r*b,u[p*3+1]=d.g*b,u[p*3+2]=d.b*b}const f=$t({vertexColors:!0}),m=IE*r;for(let _=0;_<o-1;_+=m)for(let g=0;g<o-1;g+=m){const p=Math.min(m,o-1-g),y=Math.min(m,o-1-_),x=new Float32Array((p+1)*(y+1)*3),v=new Float32Array((p+1)*(y+1)*3);for(let R=0;R<=y;R++)for(let b=0;b<=p;b++){const M=(_+R)*o+g+b,I=(R*(p+1)+b)*3;x[I]=l[M],x[I+1]=a[M],x[I+2]=c[M],v.set(u.subarray(M*3,M*3+3),I)}const C=[];for(let R=0;R<y;R++)for(let b=0;b<p;b++){const M=R*(p+1)+b,I=M+1,V=M+p+1,H=V+1;C.push(M,V,I,I,V,H)}const T=new Ve;T.setAttribute("position",new Ze(x,3)),T.setAttribute("color",new Ze(v,3)),T.setIndex(C),T.computeVertexNormals(),T.computeBoundingSphere();const E=new je(T,f);E.receiveShadow=t,E.castShadow=n,i.add(E)}return i}function OE(s){const t=Xt*4,n=new Uint8Array(t*t),i=new Float32Array(t*t).fill(1e9),r=[];for(let u=0;u<t;u++)for(let h=0;h<t;h++)s.at((h+.5)/4,(u+.5)/4)>Gs&&(n[u*t+h]=1,i[u*t+h]=0,r.push(u*t+h));for(let u=0;u<r.length;u++){const h=r[u],d=h%t,f=h/t|0;for(let m=-1;m<=1;m++)for(let _=-1;_<=1;_++){const g=d+_,p=f+m;if(g<0||p<0||g>=t||p>=t)continue;const y=p*t+g,x=i[h]+(_&&m?1.41:1);x<i[y]&&(i[y]=x,r.push(y))}}const o=new Uint8Array(t*t*4);for(let u=0;u<t*t;u++){o[u*4]=Math.min(255,i[u]/16*255);const h=u/t|0,d=u%t;o[u*4+1]=Math.min(255,Math.max(0,(Gs-s.at((d+.5)/4,(h+.5)/4))/1.2*255)),o[u*4+3]=255}const a=new On(o,t,t,Kt);a.magFilter=a.minFilter=Ct,a.needsUpdate=!0;const l=new Ut({transparent:!0,fog:!0,uniforms:Ci.merge([ve.fog,{uT:{value:0},uShore:{value:null},uSize:{value:Xt},uSky:{value:new Z},uNight:{value:0}}]),vertexShader:`varying vec2 vMap; varying vec3 vW;
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
      }`});l.uniforms.uShore.value=a;const c=new je(new is(Xt*3,Ws*3).rotateX(-Math.PI/2),l);return c.position.set(Xt/2,Gs,Ws/2),c.renderOrder=1,{mesh:c,tick(u,h){l.uniforms.uT.value=u,l.uniforms.uSky.value.copy(h)}}}function FE(s,e,t){const i=new Ve,r=[],o=[];for(let x=0;x<5;x++){const v=x/5*Math.PI+vt(x,1)*.6,C=.12+vt(x,2)*.12,T=Math.cos(v*2.3)*C,E=Math.sin(v*2.3)*C,R=.045,b=.26+vt(x,3)*.14,M=Math.cos(v)*R,I=Math.sin(v)*R;r.push(T-M,0,E-I,T+M,0,E+I,T+M*.2,b,E+I*.2),o.push(0,0,1)}i.setAttribute("position",new Pe(r,3)),i.setAttribute("k",new Pe(o,1));const a=t*900,l=new Ut({side:qt,fog:!0,uniforms:Ci.merge([ve.fog,{uT:{value:0},uLight:{value:new Z(1,1,1)}}]),vertexShader:`attribute float k; attribute vec3 tint; varying float vK; varying vec3 vTint; uniform float uT;
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
      }`}),c=new ei(i,l,Math.max(1,a)),u=new Float32Array(Math.max(1,a)*3);i.setAttribute("tint",new es(u,3)),c.frustumCulled=!1,c.count=0;let h=-999,d=-999;const f=new Le,m=new $e,_=new w,g=new w,p=new w(0,1,0),y=[16765152,16773792,14207231,16777215];return{mesh:c,mat:l,update(x,v,C){if(l.uniforms.uT.value=C,Math.abs(x-h)<3&&Math.abs(v-d)<3)return;h=Math.round(x),d=Math.round(v);let T=0;const E=new Z;for(let R=d-14;R<=d+14&&T<a;R++)for(let b=h-15;b<=h+15&&T<a;b++){if(b<0||R<0||b>=Xt||R>=Ws)continue;const M=s.m[R*Xt+b];if(!(M!==It.GRASS&&M!==It.FLOWER&&M!==It.LEDGE))for(let I=0;I<t&&T<a;I++){const V=b+vt(b,R,I*2+11),H=R+vt(b,R,I*2+12),D=e.at(V,H);if(D<Gs+.05)continue;m.setFromAxisAngle(p,vt(b,R,I+40)*6.28);const z=.8+vt(b,R,I+50)*.6;f.compose(g.set(V,D-.02,H),m,_.set(z,z,z)),c.setMatrixAt(T,f),M===It.FLOWER&&I%2===0?E.set(y[(b*7+R*3+I)%y.length]):E.setHSL(.24+Zi(V*.3,H*.3,8)*.06,.6,.55+vt(b,R,I+60)*.08),u[T*3]=E.r,u[T*3+1]=E.g,u[T*3+2]=E.b,T++}}c.count=T,c.instanceMatrix.needsUpdate=!0,i.getAttribute("tint").needsUpdate=!0}}}function BE(s,e,t,n){const i=new Ge,r=new Map;for(let D=0;D<Ws;D++)for(let z=0;z<Xt;z++){const B=s.m[D*Xt+z],$=Math.floor(D/11)*20+Math.floor(z/11);if(B!==It.TREE&&!(B===It.ROCK&&s.h[D*Xt+z]<=1))continue;let G=r.get($);G||r.set($,G={trees:[],rocks:[]}),B===It.TREE?G.trees.push([z,D]):G.rocks.push([z,D,s.h[D*Xt+z]])}const o=[];for(const[D,z,B,$]of[[0,1.3,0,.6],[.32,1.05,.1,.38],[-.3,1.08,-.08,.4]]){const G=new os($,1).translate(D,z,B);o.push(G)}const a=kE(o),l=a.getAttribute("position"),c=a.getAttribute("normal"),u=new w;for(let D=0;D<l.count;D++)u.set(l.getX(D),l.getY(D)-1.2,l.getZ(D)).normalize(),c.setXYZ(D,u.x,u.y,u.z);const h=new hn(.08,.13,1,6).translate(0,.5,0),d=new Zo(.42,1);{const D=d.getAttribute("position");for(let z=0;z<D.count;z++){u.fromBufferAttribute(D,z);const B=.82+Zi(u.x*4+3,u.z*4+u.y*2,7)*.36;D.setXYZ(z,u.x*B,u.y*B*.75,u.z*B)}d.computeVertexNormals()}const f=$t({color:16777215}),m=$t({color:8016434}),_=$t({color:11051680}),g=new Le,p=new $e,y=new w,x=new w,v=new w(0,1,0),C=new Z,T=[];for(const[D,{trees:z,rocks:B}]of r){const $={x:D%20*11+5.5,z:Math.floor(D/20)*11+5.5,ol:[]};if(T.push($),z.length){const G=new ei(h,m,z.length),re=new ei(a,f,z.length);z.forEach(([te,me],Be)=>{const tt=.9+vt(te,me,3)*.35,Q=(vt(te,me,4)-.5)*.25,le=(vt(te,me,5)-.5)*.25,Ce=e.at(te+.5,me+.5);p.setFromAxisAngle(v,vt(te,me,6)*6.28),g.compose(x.set(te+.5+Q,Ce-.05,me+.5+le),p,y.set(tt,tt,tt)),G.setMatrixAt(Be,g),re.setMatrixAt(Be,g),C.setHSL(.26+vt(te,me,8)*.07,.55,.42+vt(te,me,9)*.08),re.setColorAt(Be,C)});for(const te of[G,re])te.castShadow=t,te.receiveShadow=t,te.computeBoundingSphere(),i.add(te);$.ol.push(mo(re,.035),mo(G,.02))}if(B.length){const G=new ei(d,_,B.length);B.forEach(([re,te,me],Be)=>{const tt=e.at(re+.5,te+.5);p.setFromAxisAngle(v,vt(re,te,2)*6.28),g.compose(x.set(re+.5,tt+.08,te+.5),p,y.set(1,.8+me*.4,1)),G.setMatrixAt(Be,g)}),G.castShadow=G.receiveShadow=t,G.computeBoundingSphere(),i.add(G),$.ol.push(mo(G,.025))}}const E=new Yt(1,.08,.95),R=$t({color:12158288}),b=[];for(let D=0;D<Ws;D++)for(let z=0;z<Xt;z++)s.m[D*Xt+z]===It.BRIDGE&&b.push([z,D]);if(b.length){const D=new ei(E,R,b.length);b.forEach(([z,B],$)=>{g.makeTranslation(z+.5,0,B+.5),D.setMatrixAt($,g)}),D.castShadow=D.receiveShadow=t,D.computeBoundingSphere(),i.add(D),mo(D,.015)}const M=[],I=(D,z=.02)=>(D.castShadow=D.receiveShadow=t,mo(D,z),i.add(D),D);for(const D of s.statues??[]){const z=e.at(D.x+.5,D.y+.6);I(new je(new hn(.28,.36,1,8).translate(0,.5,0),$t({color:12104392}))).position.set(D.x+.5,z,D.y+.6);const B=new je(new Pi(.18,0),$t({color:10479359,emissive:6276863,emissiveIntensity:1.2}));B.position.set(D.x+.5,z+1.3,D.y+.6),i.add(B),M.push({x:D.x+.5,y:z+1.3,z:D.y+.6,c:10479359})}const V=(D,z)=>{if(!D)return;const B=e.at(D.x+.5,D.y+.8);I(new je(new Js(.62,.13,8,20),$t({color:10130344}))).position.set(D.x+.5,B+.75,D.y+.8);const $=new je(new Wr(.5,20),new Mt({color:z,transparent:!0,opacity:.85,side:qt}));$.position.set(D.x+.5,B+.75,D.y+.8),i.add($),M.push({x:D.x+.5,y:B+.9,z:D.y+1.1,c:z})};V(s.tower,15777888),V(s.gate,5939455);const H=[];(s.chests??[]).forEach((D,z)=>{const B=e.at(D.x+.5,D.y+.6),$=I(new je(new Yt(.55,.36,.38).translate(0,.18,0),$t({color:11561520})));$.position.set(D.x+.5,B,D.y+.6);const G=new je(new Yt(.57,.07,.4),$t({color:15777888}));G.position.y=.26,$.add(G),$.visible=!n(z),H.push($)});for(const D of s.decks??[]){const z=D.axis==="x",B=z?D.len:D.w,$=z?D.w:D.len,G=D.h*Wl;I(new je(new Yt(B,.12,$),$t({color:11565637}))).position.set(D.x+B/2,G-.06,D.y+$/2);for(const re of[0,1])I(new je(new Yt(z?B:.07,.24,z?.07:$),$t({color:8147497})),.012).position.set(D.x+(z?B/2:re?B-.04:.04),G+.12,D.y+(z?re?$-.04:.04:$/2));for(const[re,te]of[[.15,.15],[B-.15,.15],[.15,$-.15],[B-.15,$-.15]]){const me=e.at(D.x+re,D.y+te);I(new je(new hn(.07,.08,G-me,6),$t({color:7227427})),.012).position.set(D.x+re,(G+me)/2,D.y+te)}}return{grp:i,chests:H,lamps:M,lods:T}}function kE(s){const e=[],t=[];for(const i of s){const r=i.index?i.toNonIndexed():i;e.push(...r.getAttribute("position").array),t.push(...r.getAttribute("normal").array)}const n=new Ve;return n.setAttribute("position",new Pe(e,3)),n.setAttribute("normal",new Pe(t,3)),n}const Fp={low:{scale:.7,shadows:!1,shadowMap:0,soft:!1,bloom:!1,dof:!1,lights:2,grass:0,R:2,msaa:0},medium:{scale:.85,shadows:!0,shadowMap:1024,soft:!1,bloom:!0,dof:!1,lights:4,grass:2,R:2,msaa:0},high:{scale:1,shadows:!0,shadowMap:2048,soft:!0,bloom:!0,dof:!0,lights:8,grass:4,R:3,msaa:4}},VE=40,ja=[[0,659507,2306142,.35,10466559,42],[.22,1975382,6969998,.4,11055359,46],[.28,5930960,16761498,1.3,16763024,60],[.5,4034534,13823231,2.4,16773334,78],[.72,5926848,16754808,1.5,16756848,62],[.8,1975382,6969998,.45,11055359,46],[1,659507,2306142,.35,10466559,42]];function zE(s){let e=0;for(;e<ja.length-2&&s>ja[e+1][0];)e++;const t=ja[e],n=ja[e+1],i=(s-t[0])/(n[0]-t[0]||1),r=(a,l)=>new Z(a).lerp(new Z(l),i),o=s<.24||s>.79?1:s<.28?(.28-s)/.04:s>.75?(s-.75)/.04:0;return{top:r(t[1],n[1]),hor:r(t[2],n[2]),sun:t[3]+(n[3]-t[3])*i,sunCol:r(t[4],n[4]),amb:(t[5]+(n[5]-t[5])*i)/100,night:o}}function Bp(){const s=wt;if(typeof s.tod=="number")return s.tod;const e=new URLSearchParams(location.search).get("tod");return e!==null&&!isNaN(+e)?+e:(.35+(wt.G?.time??0)/480)%1}const HE={uniforms:{tDiffuse:{value:null},amount:{value:1.2},res:{value:new K(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float amount; uniform vec2 res; varying vec2 vUv;
    void main(){ float d = smoothstep(0.3, 0.55, abs(vUv.y-0.5)); vec4 c = vec4(0.0); float r = d*amount;
      for(int i=-2;i<=2;i++){ for(int j=-2;j<=2;j++){ c += texture2D(tDiffuse, vUv + vec2(float(i),float(j))*r/res); } }
      gl_FragColor = c/25.0; }`},kp={atk1:.5,atk2:.5,atk3:.62,skill:.75,burst:1.3};function jE(s){const e=document.getElementById("game"),t=document.createElement("canvas");t.id="game3d",t.setAttribute("aria-hidden","true"),Object.assign(t.style,{position:"fixed",inset:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"0"}),e.parentElement.insertBefore(t,e);const n=new Fm({canvas:t,antialias:!0,powerPreference:"high-performance",stencil:!1});n.outputColorSpace=Nt,n.info.autoReset=!1,t.addEventListener("webglcontextlost",q=>{q.preventDefault(),s()});let i=Fp[n0.quality];const r=new Ah,o=new Vt(VE,1,.3,220),a=new Gh(13624575,6970010,.9),l=new xc(16773334,2.4);l.shadow.bias=-6e-4,l.shadow.normalBias=.03,r.add(a,l,l.target),r.fog=new Yo(13626111,30,90);const c=RE();r.add(c.mesh);const u=[];for(let q=0;q<8;q++){const j=new Hs(16777215,0,6,2);u.push(j),r.add(j)}let h=null,d=null,f=null,m=null,_=null,g=null,p=null,y=null,x=[],v=[],C=[],T="",E=null,R=null,b=Math.PI;const M=new je(new Wr(.34,16),new Mt({color:2760520,transparent:!0,opacity:.35,depthWrite:!1}));M.rotation.x=-Math.PI/2,r.add(M);const I=new Ge;r.add(I);const V=14,H=new Float32Array(V*2*3),D=new Ve;D.setAttribute("position",new Ze(H,3));const z=new Float32Array(V*2);D.setAttribute("a",new Ze(z,1));const B=[];for(let q=0;q<V-1;q++)B.push(q*2,q*2+1,q*2+2,q*2+1,q*2+3,q*2+2);D.setIndex(B);const $=new Ut({transparent:!0,depthWrite:!1,side:qt,blending:Po,uniforms:{uC:{value:new Z(16777215)}},vertexShader:"attribute float a; varying float vA; void main(){ vA=a; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform vec3 uC; varying float vA; void main(){ gl_FragColor=vec4(uC*vA, vA); }"}),G=new je(D,$);G.frustumCulled=!1,r.add(G);const re=[],te=[],me=new Map,Be=new Map,tt=PE(r),Q=700,le=new ei(new Pi(.06,0),new Mt({color:16777215,fog:!1,transparent:!0,opacity:.7,depthWrite:!1}),Q);le.frustumCulled=!1,Ip(le.material),r.add(le);const Ce={coin:new hn(.13,.13,.04,14).rotateX(Math.PI/2),book:new Yt(.3,.08,.22),shard:new Pi(.15,0),orb:new An(.1,10,8)},pe=[],Ne=[],Xe=[],ze=[];function ot(){if(h?.dispose(),h=null,d=null,!i.bloom&&!i.dof)return;const q=new sn(4,4,{samples:i.msaa});h=new fw(n,q),h.addPass(new pw(r,o)),i.bloom&&h.addPass(new kr(new K(256,256),.22,.35,.93)),i.dof&&(d=new Ag(HE),h.addPass(d)),h.addPass(new _w)}function ie(){if(n.shadowMap.enabled=i.shadows,n.shadowMap.type=i.soft?Ku:Xl,l.castShadow=i.shadows,i.shadows){l.shadow.mapSize.set(i.shadowMap,i.shadowMap),l.shadow.map?.dispose(),l.shadow.map=null;const q=l.shadow.camera;q.left=q.bottom=-15,q.right=q.top=15,q.near=1,q.far=70,q.updateProjectionMatrix()}M.visible=!i.shadows,L(),E?.dispose(),E=null,R?.obj.removeFromParent(),R?.dispose(),R=null,T="",ot(),fe()}function fe(){const q=Math.min(window.devicePixelRatio||1,2)*i.scale;n.setPixelRatio(q),n.setSize(wt.VW,wt.VH,!1),o.aspect=wt.VW/wt.VH,o.updateProjectionMatrix(),h?.setPixelRatio(q),h?.setSize(wt.VW,wt.VH),d&&d.uniforms.res.value.set(wt.VW*q,wt.VH*q)}function L(){for(const q of[f,p?.mesh,y?.mesh])q?.removeFromParent(),q?.traverse(j=>{j.geometry?.dispose();for(const se of[j.material].flat())se?.dispose?.()});f=null,m=null,p=null,y=null}function Ue(){const q=wt.G.map;if(m===q&&_===q.mini)return;L(),g=UE(q,i.R),f=new Ge,f.add(NE(q,g,i.shadows,i.soft));const j=BE(q,g,i.shadows,se=>Zr.P.chests.includes(se));f.add(j.grp),j.grp.traverse(se=>se.isMesh&&[se.material].flat().forEach(Ip)),x=j.chests,C=j.lamps,v=j.lods,r.add(f),p=OE(g),r.add(p.mesh),i.grass&&(y=FE(q,g,i.grass),r.add(y.mesh)),m=q,_=q.mini}const oe=(q,j,se)=>Math.max(g?g.at(q/Re,j/Re):0,se/Re),Ee=new w,ge=(q,j,se=0)=>Ee.set(q/Re,se/Re,j/Re);function He(q,j){const se=wt.G.time,ce=j.c.w??"sword",_e=Ps.hoatAnh[ce]??Ps.hoatAnh.sword;if(!j.alive)return{k:"die",once:!0,fade:.2};const ue=q.act;if(ue&&kp[ue.k]){const Je=kp[ue.k]/(ue.k.startsWith("atk")?_e.speed:1);if(se-ue.t0<Je){const ye=ue.k.startsWith("atk")?_e.atk[+ue.k.slice(3)-1]:ue.k==="skill"?_e.skill:_e.burst,lt=E.duration(ye);return{k:`${ye}#${ue.t0}`,once:!0,speed:lt/Je,fade:.08}}}return q.hurt>0?{k:"hurt",once:!0,fade:.06}:q.dashT>0?{k:"dash",once:!0,speed:1.3,fade:.06}:q.air?(q._landT=se,q.vz>0?{k:"jumpUp",once:!0,fade:.08}:{k:"jumpAir",fade:.2}):q._landT!==void 0&&se-q._landT<.22?{k:"jumpLand",once:!0,speed:1.4,fade:.06}:q.moving?wt.holdDash&&q.dashHeld>.25&&q.stamina>0?{k:"sprint",fade:.2}:{k:"run",fade:.18,speed:q.atkAnim>0?.6:1}:{k:_e.stand,fade:.25}}let Te=0;const P=new w;let A=!1;const W=new w,J=new K;function ae(){const q=wt.G?.p;if(!q||!wt.G.map)return void(yo.uFadeR.value=0);n.getDrawingBufferSize(J);const j=nr(q),se=oe(q.x,q.y,j.g)+j.air/Re;W.set(q.x/Re,se+.8,q.y/Re).project(o);const ce=(W.x*.5+.5)*J.x,_e=(W.y*.5+.5)*J.y,ue=W.z*.5+.5;W.set(q.x/Re,se+1.7,q.y/Re).project(o);const Je=(W.y*.5+.5)*J.y;yo.uFadeS.value.set(ce,_e),yo.uFadeZ.value=ue,yo.uFadeR.value=Math.max(40,Math.abs(Je-_e)*2.2)}function ee(q){if(n.getContext().isContextLost())return!1;const j=Math.min(.05,q-Te||.016);Te=q,t.style.display="block",n.info.reset(),Ue();const se=wt.G,ce=se.p,_e=i0(),ue=nr(ce),Je=oe(ce.x,ce.y,ue.g),ye=new w(ce.x/Re,Je+ue.air/Re,ce.y/Re),lt=new w(ye.x,Je+1,ye.z);A||P.copy(lt),A=!0,P.lerp(lt,1-Math.exp(-j*10));const O=wt.camYaw??0,Me=Math.min(1.2,Math.max(.2,wt.camPitch??.62));let Y=Math.min(24,Math.max(5,wt.camDist??13));const ne=new w(-Math.sin(O)*Math.cos(Me),Math.sin(Me),Math.cos(O)*Math.cos(Me));if(g)for(let F=1;F<=24;F++){const xe=Y*F/24,S=P.clone().addScaledVector(ne,xe);if(g.at(S.x,S.z)+.35>S.y){Y=Math.max(2.5,xe-.6);break}}const be=se.shake?(Math.random()-.5)*se.shake*.02:0;o.position.copy(P).addScaledVector(ne,Y),o.position.x+=be,o.lookAt(P),c.mesh.position.copy(o.position);const de=zE(Bp());c.mat.uniforms.uTop.value.copy(de.top),c.mat.uniforms.uHor.value.copy(de.hor),c.mat.uniforms.uNight.value=de.night,c.mat.uniforms.uT.value=q,c.mat.uniforms.uCloud.value.setRGB(1,1,1).lerp(de.sunCol,.35),c.mat.uniforms.uShade.value.copy(de.hor).lerp(new Z(9079496),.5);const Ke=r.fog;Ke.color.copy(de.hor),Ke.near=14+Y*.8,Ke.far=40+Y*1.8,o.far!==Ke.far+12&&(o.far=Ke.far+12,o.updateProjectionMatrix());const xt=(Bp()-.25)*Math.PI;l.color.copy(de.sunCol),l.intensity=de.sun;const Tt=de.night>.5,ht=Tt?8:-Math.cos(xt)*12,an=Tt?14:6+Math.sin(Math.max(.15,Math.min(Math.PI-.15,xt)))*14;l.position.set(ye.x+ht,ye.y+an,ye.z-7),l.target.position.copy(ye),a.intensity=de.amb*1.4,a.color.copy(de.top).lerp(new Z(16777215),.55),a.groundColor.set(6970010).multiplyScalar(.6+.4*(1-de.night)),n.toneMappingExposure=1,x.forEach((F,xe)=>F.visible=!Zr.P.chests.includes(xe));const yn=(Y+8)**2;for(const F of v){const xe=(F.x-P.x)**2+(F.z-P.z)**2<yn;for(const S of F.ol)S.visible=xe}if(p?.tick(q,de.hor),p&&(p.mesh.material.uniforms.uNight.value=de.night),y&&(y.update(ye.x,ye.z,q),y.mat.uniforms.uLight.value.copy(de.sunCol).multiplyScalar(.35+de.sun*.28).lerp(new Z(7372992),de.night*.5)),_e){const F=Zr.P.owned?.[_e.c.id]?.vk,xe=F?Zr.P.weapons?.[F]?.id??null:null,S=`${_e.c.id}:${_e.c.w}:${xe}`;S!==T&&(T=S,E?.dispose(),E=null,R?.obj.removeFromParent(),R?.dispose(),R=null,re.length=te.length=0,nd.load(_e.c.id,_e.c.w??"sword",xe,_e.c.look).then(U=>{if(S!==T)return U?.dispose();E=U,U?r.add(U.obj):(R=new Vf(80,96,i.shadows),r.add(R.obj))}))}if(E&&_e){const F=He(ce,_e),xe=F.k.split("#")[0];F.k!==E.curName&&(E.curName.split("#")[0]!==xe||F.k.includes("#"))?(E.play(xe,{once:F.once,fade:F.fade,speed:F.speed,restart:F.k.includes("#")}),E.curName=F.k):F.speed&&!F.once&&E.play(xe,{speed:F.speed});const S=ce.act&&se.time-ce.act.t0<.6;let U=b;S?U=Math.atan2(Math.cos(ce.ang),Math.sin(ce.ang)):(ce.moving||ce.dashT>0)&&(U=Math.atan2(ce.dirX,ce.dirY));let k=U-b;k=Math.atan2(Math.sin(k),Math.cos(k)),b+=k*Math.min(1,j*(S?30:14)),E.obj.rotation.y=b,E.obj.position.set(ye.x,ye.y+(E.obj.userData.yOff??0),ye.z),E.obj.visible=!(ce.iframes>0&&ce.hurt>0&&Math.floor(q*20)%2),E.update(j);const X=_e.c.w!=="bow"&&_e.c.w!=="cat";if(E.weapon&&X&&S){const N=new w(0,.95,0),he=new w(0,.35,0);E.weapon.localToWorld(N),E.weapon.localToWorld(he),re.unshift(N),te.unshift(he),re.length>V&&(re.pop(),te.pop()),$.uniforms.uC.value.set(Un[_e.c.el]?.c2??"#ffffff")}else re.length&&(re.pop(),te.pop());for(let N=0;N<V;N++){const he=re[Math.min(N,re.length-1)],we=te[Math.min(N,te.length-1)];if(he&&we){H.set([he.x,he.y,he.z,we.x,we.y,we.z],N*6);const De=re.length>1?(1-N/V)*.8:0;z[N*2]=De,z[N*2+1]=De*.2}else z[N*2]=z[N*2+1]=0}D.attributes.position.needsUpdate=!0,D.attributes.a.needsUpdate=!0}!E&&R&&_e&&(R.paint(F=>l0(F,_e.c,0,0,1.12,{fx:ce.fx,back:ce.back,walk:ce.walk,moving:ce.moving,atk:ce.atkAnim,t:q,noShadow:!0})),R.obj.position.copy(ye),R.obj.rotation.y=Math.atan2(o.position.x-ye.x,o.position.z-ye.z)),M.position.set(ye.x,Je+.02,ye.z),M.scale.setScalar(ue.shadow);const Li=new Set;for(const F of se.enemies){if(F.dead||Math.abs(F.x-ce.x)>1100||Math.abs(F.y-ce.y)>1100)continue;Li.add(F);let xe=me.get(F);xe||(xe=TE(F),me.set(F,xe),r.add(xe.obj));const S=nr(F);xe.obj.position.set(F.x/Re,oe(F.x,F.y,S.g)+S.air/Re,F.y/Re),EE(xe,F,q,Math.atan2(ce.x-F.x,ce.y-F.y))}for(const[F,xe]of me)if(!Li.has(F)){xe.obj.removeFromParent(),xe.obj.traverse(S=>S.geometry?.dispose());for(const S of xe.mats)S.dispose();me.delete(F)}let Ui=0;for(const F of se.pickups){const xe=Ce[F.k];if(!xe)continue;let S=pe[Ui];S||(S=new je(xe,$t()),S.castShadow=!0,pe.push(S),I.add(S)),Ui++,S.geometry=xe,S.visible=!0;const U=S.material,k=F.k==="coin"?"#f0c060":F.k==="book"?"#9b6ff0":F.k==="shard"?Un[F.el].c:Un[F.el].c2;U.color.set(k),U.emissive.set(F.k==="shard"||F.k==="orb"?k:"#000000"),S.position.set(F.x/Re,oe(F.x,F.y,0)+.3+Math.sin(q*5+F.x)*.05,F.y/Re),S.rotation.y=q*2.5}for(let F=Ui;F<pe.length;F++)pe[F].visible=!1;const En=new Set;for(const F of Sw){const xe=bw(F.kind);if(!xe)continue;En.add(F.obj);let S=Be.get(F.obj);if(!S){if(xe.build3d)S={o:xe.build3d({THREE:lw,toWorld:(U,k,X=0)=>({x:U/Re,y:X*Wl,z:k/Re})},F.obj)};else{const U=xe.size??{w:64,h:64},k=new Vf(U.w,U.h,i.shadows,!1);S={o:k.obj,auto:k}}r.add(S.o),Be.set(F.obj,S)}S.auto?S.auto.paint(U=>xe.draw2d(U,F.obj,q)):xe.update3d?.(S.o,F.obj,q),S.o.position.copy(ge(F.obj.x,F.obj.y,(F.obj.zh??0)*22)),S.auto&&(S.o.rotation.y=Math.atan2(o.position.x-S.o.position.x,o.position.z-S.o.position.z))}for(const[F,xe]of Be)En.has(F)||(xe.o.removeFromParent(),xe.auto?.dispose(),Be.delete(F));tt.sync(se.map,ce,Zr.P.puz,Re,(F,xe)=>oe(F,xe,0),q,(F,xe)=>Math.abs(F-ce.x)<1100&&Math.abs(xe-ce.y)<1100);const Zt=[];let Di=0,Ni=0,Rn=0,fn=0;const Bn=new Le,ls=new Z;for(const F of se.projs){const xe=oe(F.x,F.y,0)+.9+Math.max(0,nr(F).air)/Re;if(F.kind==="arrow"||F.kind==="earrow"){let S=Xe[Di];if(!S){S=new Ge;const k=new je(new hn(.015,.015,.6,5).rotateZ(Math.PI/2),new Mt({color:16777215})),X=new je(new Ai(.05,.16,6).rotateZ(-Math.PI/2).translate(.36,0,0),new Mt({color:16777215}));S.add(k,X),Xe.push(S),I.add(S)}Di++,S.visible=!0;const U=F.kind==="earrow"?"#ffb0a0":F.el?Un[F.el].c2:"#f3ead2";if(S.children.forEach(k=>k.material.color.set(U)),S.position.set(F.x/Re,xe,F.y/Re),S.rotation.set(0,-Math.atan2(F.vy,F.vx),0),F.el){Zt.push({x:F.x/Re,y:xe,z:F.y/Re,c:new Z(Un[F.el].c),i:1.2});for(let k=0;k<3&&fn<Q;k++)Bn.makeScale(.6,.6,.6).setPosition((F.x-F.vx*.012*k)/Re,xe+Math.sin(q*30+k)*.03,(F.y-F.vy*.012*k)/Re),le.setMatrixAt(fn,Bn),le.setColorAt(fn++,ls.set(Un[F.el].c2))}}else{let S=ze[Ni];S||(S=new je(new os(.13,1),new Mt({color:16777215})),ze.push(S),I.add(S)),Ni++,S.visible=!0;const U=Un[F.el||"water"];S.material.color.set(U.c2),S.position.set(F.x/Re,xe,F.y/Re),S.scale.setScalar(Math.max(.6,F.r/8)),Zt.push({x:F.x/Re,y:xe,z:F.y/Re,c:new Z(U.c),i:1.6})}}for(let F=Di;F<Xe.length;F++)Xe[F].visible=!1;for(let F=Ni;F<ze.length;F++)ze[F].visible=!1;const ui=(F,xe,S,U,k)=>{fn>=Q||(Bn.makeScale(k,k,k).setPosition(F,xe,S),le.setMatrixAt(fn,Bn),le.setColorAt(fn,ls.set(U)),fn++)};for(const F of se.fx){const xe=F.life/F.max,S=oe(F.x,F.y,0);if(F.k==="dot")ui(F.x/Re,S+.2+(F.z??0)/Re+(1-xe)*.4,F.y/Re,F.col,Math.min(1,Math.max(.35,F.size*xe*.3)));else if(F.k==="pt")ui(F.x/Re,S+.5+(1-xe)*.5,F.y/Re,F.col??"#fff",.5*xe+.25);else if(F.k==="ring"){let U=Ne[Rn];U||(U=new je(new $o(.88,1,40),new Mt({color:16777215,transparent:!0,depthWrite:!1,side:qt})),U.rotation.x=-Math.PI/2,Ne.push(U),I.add(U)),Rn++,U.visible=!0;const k=F.r*(1-xe*.7)/Re;U.scale.set(k,k,1),U.position.set(F.x/Re,S+.06,F.y/Re);const X=U.material;X.color.set(F.col),X.opacity=xe,xe>.5&&Zt.push({x:F.x/Re,y:S+.6,z:F.y/Re,c:new Z(F.col),i:2*xe})}else if(F.k==="slash"||F.k==="arrowRain"||F.k==="meteor"){for(let U=0;U<8;U++)ui(F.x/Re+Math.sin(U*2.1+F.x)*.6*(1-xe),S+.5+U*.1,F.y/Re+Math.cos(U*1.7)*.4,F.col??"#fff",.8);Zt.push({x:F.x/Re,y:S+.8,z:F.y/Re,c:new Z(F.col??"#fff"),i:1.2*xe})}else if(F.k==="bolt"){for(let U=0;U<16;U++)ui(F.x/Re+Math.sin(U*7.3+(F.seed??0))*.2,S+U*.4,F.y/Re,U%3?F.col:"#ffffff",1.2);Zt.push({x:F.x/Re,y:S+1.5,z:F.y/Re,c:new Z(F.col),i:4*xe})}}const Oi=ce.act?.k==="burst"&&se.time-ce.act.t0<1.3;if(_e&&(Oi||ce.act?.k==="skill"&&se.time-ce.act.t0<.7)){const F=Un[_e.c.el];for(let xe=0;xe<(Oi?32:14);xe++){const S=xe*2.4+q*(Oi?4:2),U=.9+xe*37%10/6,k=(xe*13+q*60)%30/14;ui(ye.x+Math.cos(S)*U,ye.y+k,ye.z+Math.sin(S)*U,xe%4?F.c2:"#ffffff",.45+xe%3*.12)}Zt.push({x:ye.x,y:ye.y+2.6,z:ye.z,c:new Z(F.c),i:Oi?1.4:.8})}for(const F of se.fields)Zt.push({x:F.x/Re,y:oe(F.x,F.y,0)+.4,z:F.y/Re,c:new Z(Un[F.el].c),i:1.5});le.count=fn,le.instanceMatrix.needsUpdate=!0,le.instanceColor&&(le.instanceColor.needsUpdate=!0);for(let F=Rn;F<Ne.length;F++)Ne[F].visible=!1;if(Tt){for(const F of C)Zt.push({x:F.x,y:F.y,z:F.z,c:new Z(F.c),i:1.4});_e&&Zt.push({x:ye.x,y:ye.y+1.8,z:ye.z+.6,c:new Z(Un[_e.c.el].c),i:.35})}return Zt.sort((F,xe)=>(F.x-ye.x)**2+(F.z-ye.z)**2-((xe.x-ye.x)**2+(xe.z-ye.z)**2)),u.forEach((F,xe)=>{const S=xe<i.lights?Zt[xe]:void 0;F.intensity=S?S.i*1.2:0,S&&(F.position.set(S.x,Math.max(S.y,(g?g.at(S.x,S.z):0)+1.1),S.z),F.color.copy(S.c))}),ae(),h?h.render():n.render(r,o),!0}const Ie=new Sg,Se=new yi(new w(0,1,0),0),Ae=new w;return ie(),{frame:ee,project(q,j,se=0){const ce=g?g.at(q/Re,j/Re):0,_e=new w(q/Re,ce+se/Re,j/Re).project(o);return{x:(_e.x*.5+.5)*wt.VW,y:(-_e.y*.5+.5)*wt.VH,vis:_e.z<1}},unproject(q,j){Ie.setFromCamera(new K(q/wt.VW*2-1,-(j/wt.VH)*2+1),o);const se=wt.G.p;let ce=null,_e=1e9;for(const ue of wt.G.enemies){if(ue.dead)continue;const Je=nr(ue),ye=new w(ue.x/Re,oe(ue.x,ue.y,Je.g)+Je.air/Re+(ue.isBoss?1:.45),ue.y/Re),lt=(ue.r??14)/Re+.25;if(Ie.ray.distanceSqToPoint(ye)>lt*lt)continue;const O=ye.distanceTo(Ie.ray.origin);O<_e&&(_e=O,ce=ue)}return ce?{x:ce.x,y:ce.y-(ce.isBoss?20:10)}:(Se.constant=-oe(se.x,se.y,nr(se).g),Ie.ray.intersectPlane(Se,Ae)?{x:Ae.x*Re,y:Ae.z*Re}:{x:se.x,y:se.y})},setQuality(q){i=Fp[q],ie()},resize:fe,dispose(){h?.dispose(),n.dispose(),t.remove()},stats(){return{calls:n.info.render.calls,tris:n.info.render.triangles,textures:n.info.memory.textures}},hide(){t.style.display="none"},debug(){const q={};return r.traverseVisible(j=>{if(!j.isMesh||!j.geometry)return;const se=j.geometry,ce=(se.index?se.index.count:se.attributes.position.count)/3,_e=j.isInstancedMesh?j.count:1,ue=j.parent===r?j.type:(j.parent?.parent===r?"grp":j.parent?.parent?.type)+":"+(j.material?.type??"");q[ue]=(q[ue]??0)+ce*_e}),{by:q,hero:E,scene:r}}}}export{Fp as QUALITY3D,jE as createRenderer3D,Bp as timeOfDay};
