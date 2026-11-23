const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./tuning-2B_YJuI0.js","./index-CDYr9kju.js","./index-JZqo9pwl.css","./logic-C_T68GIS.js","./tokens-DekWLhs9.js"])))=>i.map(i=>d[i]);
import{d as xi,e as ba,A as Kt,H as Xi,g as An,$ as D,j as En,r as F,T as B,k as ha,l as fn,m as Vo,n as nn,o as Qn,i as Tn,h as v,b as en,p as be,F as wo,c as ii,q as Eo,s as Ao,t as Ro,u as Tt,v as tc,O as yh,w as Ko,E as K,x as Rn,y as zh,z as Yi,B as Do,D as ft,G as Ta,W as ph,I as Nn,J as tt,K as Te,L as ic,M as $i,N as Wh,P as Oa,a as st,S as Oo,Q as qo,C as hc}from"./index-CDYr9kju.js";import{F as Lt,b as Yt,M as Di,S as E,I as Io,G as e,c as pn,d as $o,C as Ph,e as Vh,Q as qa,s as zi,t as ac,l as zo,r as Wo,i as ec,f as Qo,g as jo,h as Ia,a as Xo}from"./logic-C_T68GIS.js";import{d as ka,h as $a,p as Mi,a as ke}from"./tokens-DekWLhs9.js";const Yo="modulepreload",Fo=function(n,t){return new URL(n,t).href},xe={},k=function(t,i,h){let a=Promise.resolve();if(i&&i.length>0){let l=function(p){return Promise.all(p.map(d=>Promise.resolve(d).then(M=>({status:"fulfilled",value:M}),M=>({status:"rejected",reason:M}))))};const c=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),u=s?.nonce||s?.getAttribute("nonce");a=l(i.map(p=>{if(p=Fo(p,h),p in xe)return;xe[p]=!0;const d=p.endsWith(".css"),M=d?'[rel="stylesheet"]':"";if(!!h)for(let C=c.length-1;C>=0;C--){const P=c[C];if(P.href===p&&(!d||P.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${M}`))return;const N=document.createElement("link");if(N.rel=d?"stylesheet":Yo,d||(N.as="script"),N.crossOrigin="",N.href=p,u&&N.setAttribute("nonce",u),document.head.appendChild(N),d)return new Promise((C,P)=>{N.addEventListener("load",C),N.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${p}`)))})}))}function g(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return a.then(l=>{for(const c of l||[])c.status==="rejected"&&g(c.reason);return t().catch(g)})},Uo=5,Le=3e3,si=new Map;function Zt(n,t,i,h,a=""){const g=document.getElementById("lootFeed");if(!g)return;const l=si.get(n);if(l){l.n+=i,clearTimeout(l.t),l.el.querySelector(".n").textContent=i?`+${l.n}`:"",l.el.classList.remove("is-bump"),l.el.offsetWidth,l.el.classList.add("is-bump"),l.t=setTimeout(()=>Me(n),Le);return}const c=document.createElement("li");for(c.className="hud-loot-i",a&&c.style.setProperty("--c",a),c.innerHTML=`${xi(h,{size:18})}<span class="l">${ba(t)}</span><span class="n">${i?"+"+i:""}</span>`,g.prepend(c),si.set(n,{el:c,n:i,t:setTimeout(()=>Me(n),Le)});g.children.length>Uo;){const s=g.lastElementChild;for(const[u,p]of si)p.el===s&&si.delete(u);s.remove()}}function Me(n){const t=si.get(n);t&&(si.delete(n),t.el.classList.add("is-out"),setTimeout(()=>t.el.remove(),260))}function za(n,t){if(!t)return null;if(n==="start")return t.statues[0]?[t.statues[0].x+.5,t.statues[0].y+.5]:null;if(n==="center")return[t.cx,t.cy];if(n==="tower")return[t.tower.x+.5,t.tower.y+.5];if(n==="gate")return[t.gate.x+.5,t.gate.y+.5];const i=/^statue:(\d)$/.exec(n);if(i){const a=t.statues[Number(i[1])];return a?[a.x+.5,a.y+.5]:null}const h=/^dir:(-?\d+):(\d+)$/.exec(n);if(h){const a=Number(h[1])*Math.PI/180;return[t.cx+Math.cos(a)*Number(h[2]),t.cy+Math.sin(a)*Number(h[2])]}return null}const xa=(n,t)=>{const i=Math.floor(n/Yt),h=Math.floor(t/Yt);return i<0||h<0||i>=Lt||h>=Lt?-1:h*Lt+i},ui=(n,t,i)=>n[xa(t,i)]==="1";let Se=-1;function Zo(n,t){const i=xa(n,t);if(i===Se)return;Se=i;const h=E.P.fog,a=$o(n,t,Yt,Lt,1).filter(c=>h[c]!=="1");if(!a.length)return;E.req("explore",{cells:a});const g=e.G?.map,l=Ph.places.filter(c=>{const s=za(c.at,g);return s&&E.P.fog[xa(s[0],s[1])]==="1"}).map(c=>"dia:"+c.id).filter(c=>!E.P.codex.includes(c));l.length&&E.req("discover",{ids:l})}function Jo(n){const t=E.P,i="quai:"+(n.isBoss?"hacgiao":n.type);Ph.creatures.some(a=>"quai:"+a.id===i)&&!t.codex.includes(i)&&E.req("discover",{ids:[i]});const h=e.G?.party?.[e.G.act]?.c?.id;h&&pn.affinity.perKill&&E.req("affinity",{id:h,n:pn.affinity.perKill}),cc(n.isBoss?"boss":"enemy")}function cc(n){for(const t of Di.items.drops[n]??[]){if(Math.random()>=t.chance)continue;const i=t.pool[Math.floor(Math.random()*t.pool.length)];E.req("addItems",{items:{[i]:1}}).ok&&Zt("item:"+i,Io[i]?.name??i,1,"tui-do","#c9a6ff")}}let eh=0;function ng(n){if(!e.G||e.G.mode!=="world"||e.paused||!pn.affinity.perSecond||(eh+=n,eh<10))return;const t=e.G.party?.[e.G.act]?.c?.id;t&&E.req("affinity",{id:t,n:Math.round(eh*pn.affinity.perSecond)}),eh=0}const oc="tinhtu-settings-v1",tg="tinhtu.feel.v1",Oi=n=>JSON.parse(JSON.stringify(n)),Bt=(n,t,i)=>Math.max(t,Math.min(i,n));function La(){const n=An.defaults;return{...Oi(n),joystick:{mode:An.joystick.mode,deadzone:An.joystick.deadzone,sensitivity:An.joystick.sensitivity},keys:Oi(An.keys),layout:Oi(An.layout)}}function ig(n){const t=La();if(!n||typeof n!="object")return t;const i=a=>{typeof n[a]=="number"&&(t[a]=Bt(n[a],0,1))};i("master"),i("music"),i("sfx"),["high","medium","low"].includes(n.quality)&&(t.quality=n.quality);for(const a of["shake","vibrate","mouseAim","showHints"])typeof n[a]=="boolean"&&(t[a]=n[a]);typeof n.fontScale=="number"&&(t.fontScale=Bt(n.fontScale,.8,1.4)),["none","protan","deutan","tritan"].includes(n.colorMode)&&(t.colorMode=n.colorMode);const h=n.joystick;if(h&&typeof h=="object"&&((h.mode==="dynamic"||h.mode==="fixed")&&(t.joystick.mode=h.mode),typeof h.deadzone=="number"&&(t.joystick.deadzone=Bt(h.deadzone,0,.5)),typeof h.sensitivity=="number"&&(t.joystick.sensitivity=Bt(h.sensitivity,.5,2))),n.keys&&typeof n.keys=="object")for(const a of Kt){const g=n.keys[a];Array.isArray(g)&&g.length<=2&&g.every(l=>typeof l=="string")&&(t.keys[a]=g.filter(Boolean))}if(n.layout&&typeof n.layout=="object")for(const a of Xi){const g=n.layout[a];if(!g||typeof g!="object")continue;const l=t.layout[a];typeof g.dx=="number"&&(l.dx=Bt(g.dx,0,12)),typeof g.dy=="number"&&(l.dy=Bt(g.dy,0,8)),typeof g.scale=="number"&&(l.scale=Bt(g.scale,.7,1.6)),typeof g.opacity=="number"&&(l.opacity=Bt(g.opacity,.3,1))}return t}function hg(){try{const n=localStorage.getItem(oc);if(n)return ig(JSON.parse(n));const t=JSON.parse(localStorage.getItem(tg)||"{}"),i=La();return typeof t.shake=="boolean"&&(i.shake=t.shake),i}catch{return La()}}const z=hg(),gc=[];function ag(n){gc.push(n)}function Si(){try{localStorage.setItem(oc,JSON.stringify(z))}catch{}for(const n of gc)n(z)}function eg(){z.layout=Oi(An.layout),Si()}function cg(){z.keys=Oi(An.keys),Si()}function Ne(n){for(const t of Kt)if(z.keys[t].includes(n))return t;return null}function og(n,t,i,h=z.keys){const a=h[n][t];let g=null;for(const s of Kt){if(s===n)continue;const u=h[s].indexOf(i);u<0||(g=s,a?h[s][u]=a:h[s].splice(u,1))}const l=h[n].indexOf(i);l>=0&&l!==t&&h[n].splice(l,1);const c=h[n].slice();return t<c.length?c[t]=i:c.push(i),h[n]=c.filter((s,u)=>c.indexOf(s)===u),g}function gg(n=z.keys){return Kt.filter(t=>n[t].length===0)}const _e={Space:"Space",ShiftLeft:"Shift",ShiftRight:"Shift phải",ControlLeft:"Ctrl",ControlRight:"Ctrl phải",AltLeft:"Alt",AltRight:"Alt phải",Escape:"Esc",Enter:"Enter",Tab:"Tab",Backspace:"Xóa lùi",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→"};function qi(n){return n?_e[n]?_e[n]:/^Key[A-Z]$/.test(n)?n.slice(3):/^Digit\d$/.test(n)?n.slice(5):/^Numpad\d$/.test(n)?"Số "+n.slice(6):/^F\d+$/.test(n)?n:n.replace(/(Left|Right)$/,""):""}const rg=n=>qi(z.keys[n][0]);function rc(n=document){const t=n.documentElement;t.style.setProperty("--tt-font-scale",String(z.fontScale)),t.dataset.colorMode=z.colorMode,t.dataset.quality=z.quality}const lg={hurt:35,heavy:18,burst:[20,40,30]};let Ce=0;function lc(n){if(!z.vibrate||typeof navigator>"u"||!("vibrate"in navigator))return!1;const t=performance.now();if(t-Ce<120)return!1;Ce=t;try{return navigator.vibrate(lg[n]??20)}catch{return!1}}const sg={high:2,medium:1.5,low:1},bi=D("game"),o=bi.getContext("2d");function Ma(){e.DPR=Math.min(sg[z.quality],window.devicePixelRatio||1),e.VW=window.innerWidth,e.VH=window.innerHeight,bi.width=Math.round(e.VW*e.DPR),bi.height=Math.round(e.VH*e.DPR),e.BASE_ZOOM=En(Math.min(e.VW,e.VH)/620,.72,1.35),e.ZOOM=e.BASE_ZOOM*e.camZoom}function ug(){addEventListener("resize",Ma),Ma()}function Kn(n,t,i,h,a=16,g=!1){e.G.texts.push({x:n+F(-8,8),y:t,txt:i,col:h,size:g?a*1.35:a,life:.9,max:.9,vy:-55})}function dn(n,t,i,h,a=.35,g=4){e.G.fx.push({k:"ring",x:n,y:t,r:i,col:h,life:a,max:a,w:g})}function Ln(n,t,i,h=10,a=140,g=3){for(let l=0;l<h;l++){const c=F(0,B),s=F(a*.3,a);e.G.fx.push({k:"dot",x:n,y:t,vx:Math.cos(c)*s,vy:Math.sin(c)*s-40,col:i,life:F(.3,.7),max:.7,size:F(g*.6,g*1.3)})}}function Wa(n,t,i,h,a,g,l="arc",c="#ffffff"){const s=l==="thrust"||g==="spear";e.G.fx.push({k:"slash",x:n,y:t,ang:i,r:h,col:a,core:c,trail:s?"thrust":l,life:l==="heavy"?.22:.18,max:l==="heavy"?.22:.18,w:g==="great"?11:s?6:7,arc:s?.35:l==="crescent"?1.3:1.1,flip:Math.random()<.5?-1:1})}function Qh(n,t,i,h=6,a=160){e.G.fx.length>240&&(h=Math.min(h,2));const g=mg[i.particle];for(let l=0;l<h;l++){const c=F(0,B),s=F(a*.3,a)*g.sp;e.G.fx.push({k:"pt",pk:i.particle,x:n,y:t,vx:Math.cos(c)*s,vy:Math.sin(c)*s-g.lift,g:g.g,rot:F(0,B),vr:F(-g.spin,g.spin),col:Math.random()<.35?i.c2:i.c,life:F(.35,.75)*g.life,max:.75*g.life,size:F(2.5,4.5)*g.size})}}const mg={ember:{sp:.8,lift:70,g:-60,spin:2,life:1,size:.9},drop:{sp:.9,lift:90,g:420,spin:0,life:.9,size:.9},leaf:{sp:1.1,lift:30,g:40,spin:9,life:1.2,size:1.1},spark:{sp:1.5,lift:0,g:0,spin:0,life:.5,size:1},shard:{sp:1,lift:120,g:520,spin:8,life:.9,size:1.1},petal:{sp:.8,lift:40,g:30,spin:6,life:1.3,size:1},lantern:{sp:.6,lift:50,g:-80,spin:1,life:1.2,size:1.2},feather:{sp:.9,lift:40,g:25,spin:5,life:1.3,size:1.2},snow:{sp:.7,lift:20,g:50,spin:3,life:1.3,size:.9},mist:{sp:.5,lift:20,g:-20,spin:0,life:1.1,size:2}};function wh(n,t,i){e.G.fx.push({k:"bolt",x:n,y:t,col:i,life:.25,max:.25,seed:Math.random()*100})}function ni(n,t){e.G.later.push({t:n,fn:t})}const dg={xbox:["A","B","X","Y","LB","RB","LT","RT","View","Menu","LS","RS","↑","↓","←","→"],ps:["✕","○","□","△","L1","R1","L2","R2","Create","Options","L3","R3","↑","↓","←","→"]};function fg(n){return/xbox|xinput|045e/i.test(n)?"xbox":/054c|playstation|dualshock|dualsense|wireless controller/i.test(n)?"ps":"xbox"}function Ge(){const n=new Map;for(const t of Kt){const i=An.gamepad.buttons[t];i!==void 0&&n.set(i,t)}return n}function sc(n,t){const i=An.gamepad.buttons[n];return i===void 0?"":dg[t][i]??String(i)}function yg(n,t,i=An.gamepad.deadzone){const h=Math.hypot(n,t);if(h<=i)return[0,0];const a=Math.min(1,(h-i)/(1-i))/h;return[n*a,t*a]}function pg(n,t,i){const h=n.left+n.width/2,a=n.top+n.height/2;let g=-1,l=1/0;return t.forEach((c,s)=>{const u=c.left+c.width/2,p=c.top+c.height/2,d=u-h,M=p-a,f=i==="left"?-d:i==="right"?d:i==="up"?-M:M,N=Math.abs(i==="left"||i==="right"?M:d);if(f<=1)return;const C=f+N*2;C<l&&(l=C,g=s)}),g}const vg="button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex='-1'])",Eh=n=>{const t=n.getBoundingClientRect();return t.width>0&&t.height>0&&getComputedStyle(n).visibility!=="hidden"};function uc(){const n=[...document.querySelectorAll(".tt-scrim")].filter(Eh);if(n.length)return n[n.length-1];const t=document.getElementById("modal");if(t&&!t.hidden)return t;for(const i of["layoutBar","wishFx","ttMenu","rotateOverlay"]){const h=document.getElementById(i);if(h&&!h.hidden&&Eh(h))return h}return document.body}function Qa(n){const i=[...uc().querySelectorAll(vg)].filter(Eh);if(!i.length)return;const h=document.activeElement;if(!h||!i.includes(h)){i[0].focus();return}if(h.tagName==="INPUT"&&h.type==="range"&&(n==="left"||n==="right")){const l=h;n==="left"?l.stepDown():l.stepUp(),l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}));return}const a=i.filter(l=>l!==h),g=pg(h.getBoundingClientRect(),a.map(l=>l.getBoundingClientRect()),n);g>=0&&(a[g].focus(),a[g].scrollIntoView?.({block:"nearest"}))}function bg(){const n=document.activeElement;n&&n!==document.body?n.click():Qa("down")}function He(){const t=[...uc().querySelectorAll('[data-back], [data-act="resume"], [data-close], .back')].find(Eh);if(t)return t.click();document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0}))}const ci=[];let aa=0,ea=null,ca=0;const yt={connected:!1,brand:"xbox"};function Tg(){const t=[...(typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[])??[]].find(d=>d&&d.connected)??null,i=performance.now(),h=ca?Math.min(.1,(i-ca)/1e3):0;if(ca=i,!t){if(yt.connected){yt.connected=!1,pt.x=pt.y=0;for(const[d,M]of Ge())ci[d]&&Ch(M);ci.length=0}return}yt.connected||(yt.connected=!0,yt.brand=fg(t.id),document.documentElement.dataset.pad=yt.brand);const a=t.buttons.map(d=>d.pressed||d.value>.5),g=d=>a[d]&&!ci[d];(a.some(Boolean)||Math.hypot(t.axes[0]??0,t.axes[1]??0)>.5)&&(document.documentElement.dataset.input="pad");const c=e.scene!=="play"||e.paused,[s,u]=yg(t.axes[0]??0,t.axes[1]??0),p=Ge();if(c){pt.x=pt.y=0;let d=a[12]?"up":a[13]?"down":a[14]?"left":a[15]?"right":null;!d&&Math.hypot(s,u)>.5&&(d=Math.abs(s)>Math.abs(u)?s>0?"right":"left":u>0?"down":"up"),d&&(aa-=h,(d!==ea||aa<=0)&&(Qa(d),aa=d===ea?.12:.35)),ea=d,g(0)&&bg(),g(1)&&He(),(g(4)||g(5))&&document.dispatchEvent(new KeyboardEvent("keydown",{key:g(4)?"q":"e",bubbles:!0})),g(9)&&(e.scene==="play"?Ka("pause"):He());for(const[M,f]of p)ci[M]&&!a[M]&&Ch(f)}else{pt.x=s,pt.y=u;for(const[d,M]of p)g(d)?Ka(M):ci[d]&&!a[d]&&Ch(M)}for(let d=0;d<a.length;d++)ci[d]=!!a[d]}const kg=n=>Math.max(0,Vo.terrains.findIndex(t=>t.id===n)),A=40,Z=110,mn=110,j={GRASS:0,WATER:1,TREE:2,ROCK:3,PATH:4,SAND:5,FLOWER:6,DEEP:7,BRIDGE:8,LEDGE:9},Sa=[!1,!0,!0,!0,!1,!1,!1,!0,!1,!0],mc=[!1,!0,!1,!1,!1,!1,!1,!0,!1,!1],xg=[0,0,4,1,0,0,0,0,0,1],Lg=["co","nuoc-sau","co","da","dat","cat","co","nuoc-sau","dat","da"];function Mg(n,t){const i=[],h=[["n",0,-1],["s",0,1],["e",1,0],["w",-1,0]];for(let a=1;a<mn-1;a++)for(let g=1;g<Z-1;g++){const l=a*Z+g;if(!(!n[l]||t[l]===j.TREE))for(const[c,s,u]of h){const p=(a+u)*Z+g+s;if(t[p]===j.TREE)continue;const d=n[l]-n[p];d>0&&i.push({x:g,y:a,side:c,drop:d})}}return i}const Be=[{dx:-6,dy:-4,w:4,hgt:3,h:1},{dx:-6,dy:-6,w:2,hgt:2,h:2},{dx:-4,dy:2,w:1,hgt:1,h:1},{dx:-2,dy:3,w:1,hgt:1,h:1}],oa={dx:-2,dy:4,len:3};function Sg(){const n=new Uint8Array(Z*mn),t=Z/2,i=mn/2;for(let H=0;H<mn;H++)for(let R=0;R<Z;R++){const Q=Math.hypot(R-t,H-i)/(Z/2),J=ha(R*.055,H*.055,11)+.42-Q*Q*.75;let cn=j.GRASS;if(J<.22)cn=j.DEEP;else if(J<.32)cn=j.WATER;else if(J<.355)cn=j.SAND;else{const rn=ha(R*.09+40,H*.09+40,23);ha(R*.08+90,H*.08+10,31)>.66?cn=j.ROCK:rn>.6?cn=j.TREE:fn(R,H,5)<.05&&(cn=j.FLOWER)}(R<2||H<2||R>=Z-2||H>=mn-2)&&(cn=j.DEEP),n[H*Z+R]=cn}const h=(H,R,Q)=>{H>1&&R>1&&H<Z-2&&R<mn-2&&(n[R*Z+H]=Q)},a=(H,R)=>n[R*Z+H];for(let H=-6;H<=6;H++)for(let R=-6;R<=6;R++)R*R+H*H<=36&&h(t+R,i+H,fn(R,H,2)<.07?j.FLOWER:j.GRASS);function g(H,R){for(let Q=0;Q<30;Q++){const J=H+(Q%2?1:-1)*Q*.05,cn=R-Q*.6,rn=Math.round(t+Math.cos(J)*cn),sn=Math.round(i+Math.sin(J)*cn),Un=a(rn,sn);if(Un!==j.DEEP&&Un!==j.WATER)return{x:rn,y:sn}}return{x:Math.round(t+Math.cos(H)*R*.5),y:Math.round(i+Math.sin(H)*R*.5)}}const l=[{x:t+2,y:i-3},g(.6,30),g(2.6,32),g(4.4,30)],c=g(1.6,26),s=g(5.4,40);function u(H,R,Q,J,cn){let rn=H,sn=R,Un=0;for(;(rn!==Q||sn!==J)&&Un++<600;){Math.abs(Q-rn)>Math.abs(J-sn)?rn+=Math.sign(Q-rn):sn+=Math.sign(J-sn),fn(rn,sn,77)<.25&&Math.abs(Q-rn)>0&&fn(rn,sn,78)<.5&&(rn+=Math.sign(Q-rn));for(let _t=-cn;_t<=cn;_t++)for(let On=-cn;On<=cn;On++){const Ct=a(rn+On,sn+_t);Ct===j.WATER||Ct===j.DEEP?h(rn+On,sn+_t,j.BRIDGE):(Sa[Ct]||Ct===j.GRASS||Ct===j.FLOWER||Ct===j.SAND)&&h(rn+On,sn+_t,j.PATH)}}}for(const H of[...l.slice(1),c,s])u(t,i,H.x,H.y,0);u(l[1].x,l[1].y,c.x,c.y,0);for(const H of[...l,c,s])for(let R=-2;R<=2;R++)for(let Q=-2;Q<=2;Q++){const J=a(H.x+Q,H.y+R);J!==j.PATH&&J!==j.BRIDGE&&h(H.x+Q,H.y+R,j.GRASS)}const p=new Uint8Array(Z*mn),d=[[t,i]];for(p[i*Z+t]=1;d.length;){const[H,R]=d.pop();for(const[Q,J]of[[1,0],[-1,0],[0,1],[0,-1]]){const cn=H+Q,rn=R+J,sn=rn*Z+cn;cn<0||rn<0||cn>=Z||rn>=mn||p[sn]||Sa[n[sn]]||(p[sn]=1,d.push([cn,rn]))}}const M=[],f=[];let N=12345;const C=()=>(N=N*16807%2147483647,N/2147483647),P=(H,R,Q)=>R.every(J=>Math.hypot(J.x-H.x,J.y-H.y)>=Q),O=[...l,c,s];for(let H=0;H<4e3&&M.length<22;H++){const R=2+Math.floor(C()*(Z-4)),Q=2+Math.floor(C()*(mn-4));if(Math.hypot(R-t,Q-i)<11||!p[Q*Z+R])continue;const cn={x:R,y:Q};!P(cn,M,9)||!P(cn,O,6)||M.push(cn)}for(let H=0;H<4e3&&f.length<26;H++){const R=2+Math.floor(C()*(Z-4)),Q=2+Math.floor(C()*(mn-4));if(!p[Q*Z+R]||Math.hypot(R-t,Q-i)<6)continue;const J={x:R,y:Q};!P(J,f,7)||!P(J,O,3)||f.push(J)}const q=H=>H!==j.PATH&&H!==j.BRIDGE;for(const H of Be)for(let R=0;R<H.hgt;R++)for(let Q=0;Q<H.w;Q++){const J=(i+H.dy+R)*Z+t+H.dx+Q;q(n[J])&&(n[J]=H.w*H.hgt===1?j.ROCK:j.LEDGE)}for(let H=0;H<oa.len;H++){const R=(i+oa.dy+H)*Z+t+oa.dx;q(n[R])&&(n[R]=j.WATER)}const tn=new Uint8Array(Z*mn),hn=new Uint8Array(Z*mn),$n=new Uint8Array(Z*mn);for(let H=0;H<Z*mn;H++)tn[H]=xg[n[H]];for(const H of Be)for(let R=0;R<H.hgt;R++)for(let Q=0;Q<H.w;Q++){const J=(i+H.dy+R)*Z+t+H.dx+Q;(n[J]===j.LEDGE||n[J]===j.ROCK)&&(tn[J]=H.h)}for(let H=0;H<Z*mn;H++)hn[H]=kg(Lg[n[H]]);const yn=Mg(tn,n),Xn=document.createElement("canvas");Xn.width=Z,Xn.height=mn;const at=Xn.getContext("2d"),Bn=at.createImageData(Z,mn),Nt={0:[70,130,80],1:[50,120,180],2:[34,88,52],3:[120,118,110],4:[190,160,110],5:[215,196,140],6:[80,140,90],7:[30,80,140],8:[150,110,70],9:[150,146,134]};for(let H=0;H<Z*mn;H++){const R=Nt[n[H]];Bn.data[H*4]=R[0],Bn.data[H*4+1]=R[1],Bn.data[H*4+2]=R[2],Bn.data[H*4+3]=255}return at.putImageData(Bn,0,0),{m:n,h:tn,terrain:hn,region:$n,ledges:yn,statues:l,tower:c,gate:s,camps:M,chests:f,mini:Xn,cx:t,cy:i}}const oi={statue:{c:"#9fe8ff"},chest:{c:"#f0c060"},tower:{c:"#ffd27a"},gate:{c:"#5aa0ff"},enemy:{c:"#ff6060"},target:{c:"#7dffb2"}};function Ng(){const n=e.G.map,t=e.G.objTarget;if(!n||!t)return[];if(t==="statue")return n.statues.map(i=>[i.x+.5,i.y+.5]);if(t==="tower")return[[n.tower.x+.5,n.tower.y+.5]];if(t==="gate")return[[n.gate.x+.5,n.gate.y+.5]];if(t==="chest"){const i=e.G.p;let h=null,a=1/0;return n.chests.forEach((g,l)=>{if(E.P.chests.includes(l))return;const c=nn(g.x,g.y,i.x/A,i.y/A);c<a&&(a=c,h=g)}),h?[[h.x+.5,h.y+.5]]:[]}return[]}function _g(n,t,i,h){const a=e.G.map,g=e.G.p;a.statues.forEach(l=>t(l.x+.5,l.y+.5,oi.statue.c,5)),a.chests.forEach((l,c)=>{E.P.chests.includes(c)||t(l.x+.5,l.y+.5,oi.chest.c,3)}),t(a.tower.x+.5,a.tower.y+.5,oi.tower.c,6),t(a.gate.x+.5,a.gate.y+.5,oi.gate.c,6);for(const l of e.G.enemies)!l.dead&&nn(l.x,l.y,g.x,g.y)<900&&t(l.x/A,l.y/A,oi.enemy.c,2.2);n.lineWidth=2;for(const[l,c]of Ng())n.strokeStyle=oi.target.c,n.beginPath(),i(l,c)}let Pe=null;function Cg(){Pe??(Pe=D("mini").getContext("2d"));const n=Pe,t=200,i=e.G.p;if(n.clearRect(0,0,t,t),n.save(),n.beginPath(),n.arc(t/2,t/2,t/2,0,B),n.clip(),n.fillStyle="#0a0f22",n.fillRect(0,0,t,t),e.G.map){const a=i.x/A,g=i.y/A;n.imageSmoothingEnabled=!1,n.drawImage(e.G.map.mini,t/2-a*4,t/2-g*4,Z*4,mn*4);const l=(u,p)=>[t/2+(u-a)*4,t/2+(p-g)*4];_g(n,(u,p,d,M=4)=>{const[f,N]=l(u,p);n.fillStyle=d,n.beginPath(),n.arc(f,N,M,0,B),n.fill()},(u,p)=>{let[d,M]=l(u,p);const f=d-t/2,N=M-t/2,C=Math.hypot(f,N);C>t/2-12&&(d=t/2+f/C*(t/2-12),M=t/2+N/C*(t/2-12)),n.arc(d,M,8+Math.sin(performance.now()/200)*1.5,0,B),n.stroke()})}else{const h=e.G.bounds,a=t/Math.max(h.w,h.h);n.fillStyle="#2a2f58",n.fillRect(0,0,h.w*a,h.h*a);for(const g of e.G.enemies)g.dead||(n.fillStyle="#ff6060",n.beginPath(),n.arc(g.x*a,g.y*a,g.isBoss?7:3,0,B),n.fill());n.fillStyle="#fff",n.beginPath(),n.arc(i.x*a,i.y*a,4,0,B),n.fill(),n.restore();return}n.fillStyle="#fff",n.save(),n.translate(t/2,t/2),n.rotate(Math.atan2(i.dirY,i.dirX)+Math.PI/2),n.beginPath(),n.moveTo(0,-8),n.lineTo(6,6),n.lineTo(-6,6),n.closePath(),n.fill(),n.restore(),n.restore()}const Ve=n=>n.trim().replace(/^\||\|$/g,"").split("|").map(t=>t.trim());function we(n){const t=[],i=n.replace(/\r/g,"").split(`
`);let h=[];const a=()=>{h.length&&t.push({t:"p",text:h.join(" ")}),h=[]};for(let g=0;g<i.length;g++){const l=i[g];if(!l.trim()){a();continue}const c=/^(#{3,6})\s+(.*)$/.exec(l);if(c){a(),t.push({t:"h",level:c[1].length,text:c[2].trim()});continue}if(l.trim().startsWith("|")){a();const s=Ve(l),u=[];for(g++,g<i.length&&/^\s*\|[\s:|-]+\|?\s*$/.test(i[g])&&g++;g<i.length&&i[g].trim().startsWith("|");g++)u.push(Ve(i[g]));g--,t.push({t:"table",head:s,rows:u});continue}if(/^\s*[-*]\s+/.test(l)){a();const s=[];for(;g<i.length&&/^\s*([-*]\s+|\s{2,}\S)/.test(i[g]);g++){const u=i[g];/^\s*[-*]\s+/.test(u)?s.push(u.replace(/^\s*[-*]\s+/,"")):s[s.length-1]+=" "+u.trim()}g--,t.push({t:"list",items:s});continue}if(/^\s*>/.test(l)){h.push(l.replace(/^\s*>\s?/,""));continue}h.push(l.trim())}return a(),t}function Na(n){const t=/^#\s+(.*)$/m.exec(n),i=t?t[1].trim():"",a=(t?n.slice(t.index+t[0].length):n).split(/^##\s+/m),g=we(a[0]??""),l=a.slice(1).map(c=>{const s=c.indexOf(`
`);return{title:(s<0?c:c.slice(0,s)).trim().replace(/^\d+(\.\d+)*\.\s*/,""),blocks:we(s<0?"":c.slice(s+1))}});return{title:i,intro:g,sections:l}}const vh=n=>n.replace(/\*\*|__|`/g,"").replace(/(^|[^\w])[*_]([^*_]+)[*_]/g,"$1$2"),Gg=n=>n.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Ti(n){return Gg(n).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|[^\w*])[*_]([^*_]+)[*_](?=[^\w*]|$)/g,"$1<i>$2</i>").replace(/`([^`]+)`/g,"<code>$1</code>")}const _a=Object.assign({"../../docs/characters/ardo/cung-menh.md":()=>k(()=>import("./cung-menh-Bw3WKY1H.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ardo/ho-so.md":()=>k(()=>import("./ho-so-CyNtXUFL.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ardo/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-BajTs6vl.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ardo/loi-thoai.md":()=>k(()=>import("./loi-thoai-BZE5-Y5M.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ardo/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-BpZb-Bcd.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ardo/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-C-N4yAP-.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ardo/quan-he.md":()=>k(()=>import("./quan-he-q_Z01S3D.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ardo/tieu-su.md":()=>k(()=>import("./tieu-su-Dr-Tk9Ip.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/cung-menh.md":()=>k(()=>import("./cung-menh-IZBPyj_h.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/ho-so.md":()=>k(()=>import("./ho-so-7RvgVOBS.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-8OdIeRD_.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/loi-thoai.md":()=>k(()=>import("./loi-thoai-C6Id6dEc.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DnwHGvMg.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-DmFnYjq1.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/quan-he.md":()=>k(()=>import("./quan-he-DcbvSb0O.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/bachvu/tieu-su.md":()=>k(()=>import("./tieu-su-oZaEHin1.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/cung-menh.md":()=>k(()=>import("./cung-menh-07HJ1Bgp.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/ho-so.md":()=>k(()=>import("./ho-so-B444uQMh.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-zUx7BzwG.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/loi-thoai.md":()=>k(()=>import("./loi-thoai-DdIO6CsH.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DNvwti-Z.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-CAzBOX93.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/quan-he.md":()=>k(()=>import("./quan-he-CigjC3Mv.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/duri/tieu-su.md":()=>k(()=>import("./tieu-su-Cy97SfJ9.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/cung-menh.md":()=>k(()=>import("./cung-menh-B-iWJ-SR.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/ho-so.md":()=>k(()=>import("./ho-so-DvSo_RKt.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DhRFaw7k.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/loi-thoai.md":()=>k(()=>import("./loi-thoai-BGPGOYfA.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-BFL6mFhw.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-SQJ5iABF.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/quan-he.md":()=>k(()=>import("./quan-he-BXjGf434.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/golnar/tieu-su.md":()=>k(()=>import("./tieu-su-FVRXheBx.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/cung-menh.md":()=>k(()=>import("./cung-menh-DBICzybp.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/ho-so.md":()=>k(()=>import("./ho-so-CKYC-tnq.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-BchIhHT1.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/loi-thoai.md":()=>k(()=>import("./loi-thoai-tm_1keTz.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-BbqfsZ_h.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-BC1tpXPp.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/quan-he.md":()=>k(()=>import("./quan-he-DOjkFrMh.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/havy/tieu-su.md":()=>k(()=>import("./tieu-su-B-aMzp6d.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/cung-menh.md":()=>k(()=>import("./cung-menh-BXBcohBB.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/ho-so.md":()=>k(()=>import("./ho-so-CB9dmSU5.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DTsh37u8.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/loi-thoai.md":()=>k(()=>import("./loi-thoai-Csflvtkc.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-D82MgzaF.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-BaJijDuX.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/quan-he.md":()=>k(()=>import("./quan-he-BNpYoPMj.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/khoiyen/tieu-su.md":()=>k(()=>import("./tieu-su-tCU34GTm.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/cung-menh.md":()=>k(()=>import("./cung-menh-B6RsDDqm.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/ho-so.md":()=>k(()=>import("./ho-so-C38gvF_q.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-aF28bRe_.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/loi-thoai.md":()=>k(()=>import("./loi-thoai-Dg0Hhtgd.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DIt_uIAd.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-FkXivyYo.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/quan-he.md":()=>k(()=>import("./quan-he-BjFsR2BE.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/kumi/tieu-su.md":()=>k(()=>import("./tieu-su-CUBjkPCL.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/cung-menh.md":()=>k(()=>import("./cung-menh-CPn40_qh.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/ho-so.md":()=>k(()=>import("./ho-so-CM_McNJ_.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-BQDdjgwC.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/loi-thoai.md":()=>k(()=>import("./loi-thoai-Cta2Fi-J.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-YoC4g_wA.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-DDI1atW_.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/quan-he.md":()=>k(()=>import("./quan-he-D1bvSM-q.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/lachong/tieu-su.md":()=>k(()=>import("./tieu-su-BKXwa5kl.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/cung-menh.md":()=>k(()=>import("./cung-menh-BNSr1FzA.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/ho-so.md":()=>k(()=>import("./ho-so-_fwYk_cD.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DU2m5CM9.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/loi-thoai.md":()=>k(()=>import("./loi-thoai-D5TaQsOj.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DpnFKYwS.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-iXpYMrYI.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/quan-he.md":()=>k(()=>import("./quan-he-CpBV7JGm.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/loidinh/tieu-su.md":()=>k(()=>import("./tieu-su-D3q1q1PM.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/cung-menh.md":()=>k(()=>import("./cung-menh-CWs5OG5B.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/ho-so.md":()=>k(()=>import("./ho-so-BzrdCSP_.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DhvEazOY.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/loi-thoai.md":()=>k(()=>import("./loi-thoai-CXQkPIGS.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-Bdfx3HeP.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-DUgCKFCs.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/quan-he.md":()=>k(()=>import("./quan-he-CjPlQnjn.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/mailinh/tieu-su.md":()=>k(()=>import("./tieu-su-ndZbIoTb.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/cung-menh.md":()=>k(()=>import("./cung-menh-GMouyf52.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/ho-so.md":()=>k(()=>import("./ho-so-C5QBtc75.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-BAaK5BQ-.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/loi-thoai.md":()=>k(()=>import("./loi-thoai-C3eEq-9K.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-KqRlo0CC.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-Ck4EqDGl.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/quan-he.md":()=>k(()=>import("./quan-he-CbHaNigJ.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/minhkhai/tieu-su.md":()=>k(()=>import("./tieu-su-1haXgXwB.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/cung-menh.md":()=>k(()=>import("./cung-menh-C4zZFs6-.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/ho-so.md":()=>k(()=>import("./ho-so-CqgvzbXj.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-BSunPo76.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/loi-thoai.md":()=>k(()=>import("./loi-thoai-BJ1vqtZw.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DNLLdaMf.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-qEcFMxw4.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/quan-he.md":()=>k(()=>import("./quan-he-DHs-egeh.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/naraa/tieu-su.md":()=>k(()=>import("./tieu-su-C_vjk7JM.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/cung-menh.md":()=>k(()=>import("./cung-menh-B7_vhRFv.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/ho-so.md":()=>k(()=>import("./ho-so-DY_MrhvR.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DO532OVU.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/loi-thoai.md":()=>k(()=>import("./loi-thoai-nZue2trW.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DSzW3tCj.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-7qquKpOu.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/quan-he.md":()=>k(()=>import("./quan-he-B4ZIWfve.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/nghienthu/tieu-su.md":()=>k(()=>import("./tieu-su-DeLKpmv7.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/cung-menh.md":()=>k(()=>import("./cung-menh-lubofNRZ.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/ho-so.md":()=>k(()=>import("./ho-so-D2q1_W84.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-B95Nz7kV.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/loi-thoai.md":()=>k(()=>import("./loi-thoai-DZslTSkM.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-CAye0HU9.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-9FvWEV5D.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/quan-he.md":()=>k(()=>import("./quan-he-CdXeg_-E.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/ngocthach/tieu-su.md":()=>k(()=>import("./tieu-su-BHDC7weN.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/cung-menh.md":()=>k(()=>import("./cung-menh-DSRXbrjV.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/ho-so.md":()=>k(()=>import("./ho-so-BZ2rBJV7.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-xS3sXfJE.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/loi-thoai.md":()=>k(()=>import("./loi-thoai-5YyGeBTV.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-C2DUU1nL.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-Bn0Y6vkt.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/quan-he.md":()=>k(()=>import("./quan-he-DL_wtQxv.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/payam/tieu-su.md":()=>k(()=>import("./tieu-su-CyF22goe.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/cung-menh.md":()=>k(()=>import("./cung-menh-Cxw61pjN.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/ho-so.md":()=>k(()=>import("./ho-so-B5RU5iV1.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-BcLQSSd7.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/loi-thoai.md":()=>k(()=>import("./loi-thoai-DLZGd00H.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-Bl5YCAfk.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-C32MFLPp.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/quan-he.md":()=>k(()=>import("./quan-he-CwDNbXNX.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/phongvan/tieu-su.md":()=>k(()=>import("./tieu-su-Cf8Xtj7O.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/cung-menh.md":()=>k(()=>import("./cung-menh-IHyBFG54.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/ho-so.md":()=>k(()=>import("./ho-so--6JOu-W5.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-h_hvXGPB.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/loi-thoai.md":()=>k(()=>import("./loi-thoai-u_XrqF8Q.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-CIkZkPSn.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-Y3y321lM.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/quan-he.md":()=>k(()=>import("./quan-he-BQ_D9f3S.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/pruina/tieu-su.md":()=>k(()=>import("./tieu-su-BBjE5iFS.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/cung-menh.md":()=>k(()=>import("./cung-menh-5DR9mFmL.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/ho-so.md":()=>k(()=>import("./ho-so-B42km1D7.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DA09cE1_.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/loi-thoai.md":()=>k(()=>import("./loi-thoai-DW82-yBi.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DvZzruXq.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-CwVajwMO.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/quan-he.md":()=>k(()=>import("./quan-he-DJWCPnOg.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/shonkhor/tieu-su.md":()=>k(()=>import("./tieu-su-CqndH0qy.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/cung-menh.md":()=>k(()=>import("./cung-menh-C_auVHQo.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/ho-so.md":()=>k(()=>import("./ho-so-DzYkSBlM.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-ck4iTZbf.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/loi-thoai.md":()=>k(()=>import("./loi-thoai-CvfYZKDm.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DPRmg0s1.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-BoaIrfMR.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/quan-he.md":()=>k(()=>import("./quan-he-CsTZB2Bx.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/suongmai/tieu-su.md":()=>k(()=>import("./tieu-su-B0OW5Lg5.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/cung-menh.md":()=>k(()=>import("./cung-menh-BTk99S_p.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/ho-so.md":()=>k(()=>import("./ho-so-CLHM71ZJ.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-CLFU4bEb.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/loi-thoai.md":()=>k(()=>import("./loi-thoai-D4u0IKAO.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-ButnTG2B.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-DJGNWA_W.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/quan-he.md":()=>k(()=>import("./quan-he-BUCHh9hZ.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/takane/tieu-su.md":()=>k(()=>import("./tieu-su-DqOcLKVr.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/cung-menh.md":()=>k(()=>import("./cung-menh-DUBNM6Wo.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/ho-so.md":()=>k(()=>import("./ho-so-CggKvRoJ.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DRx6Xj14.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/loi-thoai.md":()=>k(()=>import("./loi-thoai-CXMZaCzT.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-D0hTPQOK.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-THs25Q_n.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/quan-he.md":()=>k(()=>import("./quan-he-YjhrVzdh.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thachson/tieu-su.md":()=>k(()=>import("./tieu-su-BqoosOJU.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/cung-menh.md":()=>k(()=>import("./cung-menh-CIFPj_iy.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/ho-so.md":()=>k(()=>import("./ho-so-CNcpMHuk.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-DKbTZpU3.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/loi-thoai.md":()=>k(()=>import("./loi-thoai-qFRKxkla.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-mzBGbxbj.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-FnYqLF7k.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/quan-he.md":()=>k(()=>import("./quan-he-U4EVXgpY.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/thuynguyet/tieu-su.md":()=>k(()=>import("./tieu-su-DfqGjWq4.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/cung-menh.md":()=>k(()=>import("./cung-menh-CDpoI8WM.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/ho-so.md":()=>k(()=>import("./ho-so-CFoEszy_.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-Zz6s9vux.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/loi-thoai.md":()=>k(()=>import("./loi-thoai-CUj3oFmf.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-DbJUIb7I.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-BwOJuoqJ.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/quan-he.md":()=>k(()=>import("./quan-he-D2i7-P-B.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/tuyetlan/tieu-su.md":()=>k(()=>import("./tieu-su-8gr0-Dka.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/cung-menh.md":()=>k(()=>import("./cung-menh-DXKBOqCN.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/ho-so.md":()=>k(()=>import("./ho-so-CrEExOIY.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/ky-nang-truyen.md":()=>k(()=>import("./ky-nang-truyen-CHWv8XSa.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/loi-thoai.md":()=>k(()=>import("./loi-thoai-BOQHgflN.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/ngoai-hinh.md":()=>k(()=>import("./ngoai-hinh-Ct6n2BZ1.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/nhiem-vu-nhan-vat.md":()=>k(()=>import("./nhiem-vu-nhan-vat-CSCRuSSO.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/quan-he.md":()=>k(()=>import("./quan-he-CvvGjC9h.js"),[],import.meta.url).then(n=>n.default),"../../docs/characters/urae/tieu-su.md":()=>k(()=>import("./tieu-su-BqwDtytm.js"),[],import.meta.url).then(n=>n.default)}),Ca=(n,t)=>`../../docs/characters/${n}/${t}.md`,ga=new Map;function wi(n){return pn.profile.some(t=>Ca(n,t.file)in _a)}function Ei(n){let t=ga.get(n);return t||(t=Promise.all(pn.profile.map(async i=>{const h=_a[Ca(n,i.file)];return[i.file,h?Na(await h()):null]})).then(async i=>{const h={};for(const[g,l]of i)l&&(h[g]=l);const a=_a[Ca(n,"cung-menh")];return a&&(h["cung-menh"]=Na(await a())),h}),t.catch(()=>ga.delete(n)),ga.set(n,t)),t}function Hg(n){let t=1;for(const i of pn.affinity.levels)n>=i&&t++;return t}function Bg(n){const t=pn.affinity.levels.find(i=>n<i);return t===void 0?null:t-n}function Ee(n,t){const i=pn.profile.find(h=>h.file===n);return i?i.level+i.perSection*t:1}function Pg(n,t){const i=t.skipBtn,h=t.hint,a=new Proxy({},{get:(y,b)=>{const x=Qn[b];return x&&{...x,line:x.line??t.line(b)}}});let g=t.featured();const l={},c={};function s(y,b,x){const m=y+"_"+b+(x?"r":"");if(l[m])return l[m];const _=a[y],S=Math.round(b*.8),L=document.createElement("canvas");L.width=S,L.height=b;const G=L.getContext("2d"),V=at[_.el]??at.fire;if(!x){const W=G.createRadialGradient(S/2,b*.46,0,S/2,b*.46,b*.5);W.addColorStop(0,q(V.c,.35)),W.addColorStop(1,q(V.c,0)),G.fillStyle=W,G.fillRect(0,0,S,b)}const w=b/50;return ka(G,_,S/2,b*.93,w,{t:.6,noShadow:!0}),l[m]=L,L}const u={};function p(y,b,x){const m=y+b+"x"+x;if(u[m])return u[m];const _=a[y],S=at[_.el]??at.fire,L=document.createElement("canvas");L.width=b,L.height=x;const G=L.getContext("2d"),V=G.createLinearGradient(0,0,0,x);V.addColorStop(0,hn(S.c,-.5)),V.addColorStop(1,hn(S.c,-.85)),G.fillStyle=V,G.fillRect(0,0,b,x),G.save(),G.translate(b/2,x*.42),G.globalAlpha=.14,G.fillStyle=S.c2;for(let w=0;w<14;w++)G.rotate(d/14),G.beginPath(),G.moveTo(0,0),G.lineTo(x,-x*.06),G.lineTo(x,x*.06),G.closePath(),G.fill();return G.restore(),ka(G,_,b/2,x*.8,x/62,{t:.6,noShadow:!0}),u[m]=L,L}const d=Math.PI*2,M=(y,b,x)=>y<b?b:y>x?x:y,f=(y,b,x)=>y+(b-y)*x,N=(y,b)=>y+Math.random()*(b-y),C={out:y=>1-Math.pow(1-y,3),in:y=>y*y*y,inOut:y=>y<.5?4*y*y*y:1-Math.pow(-2*y+2,3)/2,back:y=>1+2.70158*Math.pow(y-1,3)+1.70158*Math.pow(y-1,2)};function P(y,b,x=0){let m=y*374761393+b*668265263+x*1442695041|0;return m=Math.imul(m^m>>>13,1274126177),m^=m>>>16,(m>>>0)/4294967296}function O(y){const b=y.replace("#","");return[parseInt(b.slice(0,2),16),parseInt(b.slice(2,4),16),parseInt(b.slice(4,6),16)]}function q(y,b){const[x,m,_]=O(y);return`rgba(${x},${m},${_},${b})`}function tn(y,b,x){const m=O(y),_=O(b);return"#"+m.map((S,L)=>Math.round(f(S,_[L],x)).toString(16).padStart(2,"0")).join("")}function hn(y,b){return b<0?tn(y,"#000000",-b):tn(y,"#ffffff",b)}function $n(y,b,x,m,_,S){y.beginPath(),y.moveTo(b+S,x),y.arcTo(b+m,x,b+m,x+_,S),y.arcTo(b+m,x+_,b,x+_,S),y.arcTo(b,x+_,b,x,S),y.arcTo(b,x,b+m,x,S),y.closePath()}const yn={3:"#6fb6ff",4:"#b98cff",5:"#ffcf5a"},Xn=matchMedia("(prefers-reduced-motion: reduce)").matches,at={fire:{vi:"Hỏa",c:"#ff6a3d",c2:"#ffc08a"},water:{vi:"Thủy",c:"#3aa6f5",c2:"#a6dcff"},wind:{vi:"Phong",c:"#45dfb1",c2:"#bdf6e4"},bolt:{vi:"Lôi",c:"#b47bff",c2:"#e0c8ff"},earth:{vi:"Thổ",c:"#e9b23a",c2:"#f8de98"},ice:{vi:"Băng",c:"#8fe1ff",c2:"#e6f9ff"}};let Bn=null,Nt=null;function H(){if(!t.sound())return null;if(!Bn)try{Bn=new(window.AudioContext||window.webkitAudioContext),Nt=Bn.createGain(),Nt.gain.value=.55;const y=Bn.createDynamicsCompressor();Nt.connect(y),y.connect(Bn.destination)}catch{return null}return Bn.state==="suspended"&&Bn.resume(),Bn}function R(y,b,x,m,_,S){const L=H();if(!L)return;const G=L.createOscillator(),V=L.createGain();G.type=m||"sine",G.frequency.setValueAtTime(y,L.currentTime+b),S&&G.frequency.exponentialRampToValueAtTime(S,L.currentTime+b+x),V.gain.setValueAtTime(1e-4,L.currentTime+b),V.gain.exponentialRampToValueAtTime(_,L.currentTime+b+Math.min(.04,x/4)),V.gain.exponentialRampToValueAtTime(1e-4,L.currentTime+b+x),G.connect(V),V.connect(Nt),G.start(L.currentTime+b),G.stop(L.currentTime+b+x+.05)}function Q(y,b,x,m,_,S){const L=H();if(!L)return;const G=L.createBuffer(1,Math.ceil(L.sampleRate*b),L.sampleRate),V=G.getChannelData(0);for(let Y=0;Y<V.length;Y++)V[Y]=Math.random()*2-1;const w=L.createBufferSource();w.buffer=G;const W=L.createBiquadFilter();W.type="bandpass",W.Q.value=S||1.2,W.frequency.setValueAtTime(m,L.currentTime+y),W.frequency.exponentialRampToValueAtTime(_,L.currentTime+y+b);const on=L.createGain();on.gain.setValueAtTime(1e-4,L.currentTime+y),on.gain.exponentialRampToValueAtTime(x,L.currentTime+y+b*.3),on.gain.exponentialRampToValueAtTime(1e-4,L.currentTime+y+b),w.connect(W),W.connect(on),on.connect(Nt),w.start(L.currentTime+y)}function J(y,b,x){R(y,b,1.8,"sine",x),R(y*2.01,b,1.1,"sine",x*.3),R(y*3,b,.6,"triangle",x*.12)}const cn=[392,440,523.25,587.33,659.25,784,880,1046.5,1174.7,1318.5,1568],rn={charge(){R(98,0,1.4,"triangle",.12,262),R(147,0,1.4,"sine",.08,392),Q(0,1.4,.05,300,2400,.8)},launch(){Q(0,.5,.12,600,5e3,.7),R(392,0,.35,"sine",.08,1568)},whoosh(){Q(0,1.4,.09,3e3,400,.6)},flare(){J(1046.5,0,.12),J(1568,.06,.1),Q(0,.4,.06,4e3,8e3,2)},impact(y){R(110,0,.9,"sine",.35,32),Q(0,.8,.2,900,120,.6),y>=4&&R(55,0,1.4,"sine",.25,28)},reveal(y){const b=y===5?7:y===4?4:2;for(let x=0;x<b;x++)J(cn[x+(y===5?3:y===4?2:1)],x*.07,y===5?.11:.08);y===5&&[523.25,659.25,784,1046.5].forEach((x,m)=>R(x,.5,2.2,"sine",.05))},star(y,b){J(cn[4+y],0,b===5?.07:.05)},card(){R(880,0,.12,"triangle",.04,1320)}},sn=[[-.62,.05],[-.38,-.12],[-.18,-.02],[0,-.22],[.16,-.04],[.4,-.16],[.64,.02],[.2,.18],[0,.36],[-.2,.18]],Un=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[2,9],[4,7],[9,8],[7,8],[3,8]];function _t(y,b,x,m){y.forEach((_,S)=>{R(_,b,x,"sine",m),R(_*1.004,b+.02,x,"sine",m*.6)})}let On=null;function Ct(y){const b=H();if(!b)return;if(On){try{On.stop()}catch{}On=null}const x=b.sampleRate*4,m=b.createBuffer(1,x,b.sampleRate),_=m.getChannelData(0);let S=0;for(let w=0;w<x;w++)S=(S+(Math.random()*2-1)*.02)/1.02,_[w]=S*3.5;const L=b.createBufferSource();L.buffer=m,L.loop=!0;const G=b.createBiquadFilter();G.type="lowpass",G.frequency.value=700;const V=b.createGain();V.gain.value=1e-4,V.gain.exponentialRampToValueAtTime(.35,b.currentTime+.6),L.connect(G),G.connect(V),V.connect(Nt),L.start(),On=L,On._g=V}function Zi(){if(On&&Bn){On._g.gain.exponentialRampToValueAtTime(1e-4,Bn.currentTime+.8);const y=On;setTimeout(()=>{try{y.stop()}catch{}},900),On=null}}const Gt={open(){Ct(),_t([196,293.66],.1,2.4,.05)},lantern(){Q(0,.9,.06,400,1800,.8),J(784,0,.05)},rise(){Zi(),_t([261.63,329.63,392,523.25],0,2,.045),Q(0,1.8,.05,800,4e3,.5)},line(y){J(cn[2+y%8],0,.045)},burstStars(){J(1046.5,0,.09),J(1568,.05,.07),Q(0,.5,.07,3e3,9e3,1.5)},meteor(){Q(0,2.2,.12,200,3e3,.5),R(70,0,2.2,"sine",.15,140)},slowmo(){R(60,0,1.6,"sine",.25,30),J(523.25,.1,.1),J(784,.2,.1),J(1046.5,.3,.1)},descend(){Q(0,1.4,.12,3500,300,.6)}},r=n.getContext("2d");let I=0,$=0,Ci=1,qt=[];const Uh={};function ee(y){if(Uh[y])return Uh[y];const b=64,x=document.createElement("canvas");x.width=x.height=b;const m=x.getContext("2d"),_=m.createRadialGradient(b/2,b/2,0,b/2,b/2,b/2);return _.addColorStop(0,"rgba(255,255,255,1)"),_.addColorStop(.18,q(y,.95)),_.addColorStop(.5,q(y,.25)),_.addColorStop(1,q(y,0)),m.fillStyle=_,m.fillRect(0,0,b,b),Uh[y]=x,x}function Sn(y,b,x,m,_){_<=0||x<=0||(r.globalAlpha=Math.min(1,_),r.drawImage(ee(m),y-x,b-x,x*2,x*2),r.globalAlpha=1)}function ce(y,b,x,m,_,S){S<=0||(r.globalAlpha=Math.min(1,S),r.drawImage(ee(_),y-x,b-m,x*2,m*2),r.globalAlpha=1)}function oe(){Ci=Math.min(2,window.devicePixelRatio||1),I=innerWidth,$=innerHeight,n.width=Math.round(I*Ci),n.height=Math.round($*Ci),qt=Array.from({length:Math.round(I*$/2200)},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.2,p:Math.random()*6,d:Math.random()*.8+.2}))}const hi=1600,Ji=900,_n=560,Ht={x:420,y:612,rx:118,ry:28},nh={x:540,y:610};function Zh(y,b,x,m){const _=[];for(let S=-400;S<=2e3;S+=m){const L=Math.sin(S*.004+y)*.5+Math.sin(S*.011+y*2)*.3+Math.sin(S*.027+y*3)*.2;_.push([S,b-x*(.55+.45*L)])}return _}const lo=[Zh(1.3,_n,210,40),Zh(4.1,_n,140,30),Zh(7.7,_n,80,24)],Jh=[[-400,900],[-400,560],[-120,520],[60,560],[160,600],[640,600],[700,640],[760,760],[820,900]];let ai={x:hi/2,y:Ji/2,z:1};function na(){const y=Math.max(I/hi,$/Ji)*ai.z;r.translate(I/2,$/2),r.scale(y,y),r.translate(-ai.x,-ai.y)}function ta(y,b={}){const x=r.createLinearGradient(0,-600,0,_n);x.addColorStop(0,"#03040c"),x.addColorStop(.6,"#141a46"),x.addColorStop(1,"#2c3f6e"),r.fillStyle=x,r.fillRect(-800,-900,hi+1600,_n+900);for(const L of qt){const G=.35+.65*Math.abs(Math.sin(y*.7*L.d+L.p));r.globalAlpha=G*.9,r.fillStyle="#e9ecff",r.fillRect(-400+L.x*(hi+800),-600+L.y*(_n+500),L.r*1.2,L.r*1.2)}r.globalAlpha=1,r.globalCompositeOperation="lighter",Sn(1180,230,260,"#6a7fd0",.35),r.globalCompositeOperation="source-over",r.fillStyle="#f6efd8",r.beginPath(),r.arc(1180,230,62,0,d),r.fill(),r.fillStyle="rgba(200,190,160,.35)",r.beginPath(),r.arc(1162,214,14,0,d),r.arc(1200,250,10,0,d),r.arc(1196,206,7,0,d),r.fill();const m=["#1f2a55","#18214a","#10173a"];lo.forEach((L,G)=>{r.fillStyle=m[G],r.beginPath(),r.moveTo(L[0][0],_n+2);for(const V of L)r.lineTo(V[0],V[1]+G*6);r.lineTo(L[L.length-1][0],_n+2),r.closePath(),r.fill()});const _=r.createLinearGradient(0,_n-70,0,_n+10);_.addColorStop(0,"rgba(120,140,200,0)"),_.addColorStop(1,"rgba(120,140,200,.25)"),r.fillStyle=_,r.fillRect(-800,_n-70,hi+1600,80);const S=r.createLinearGradient(0,_n,0,Ji+200);S.addColorStop(0,"#1c2c5a"),S.addColorStop(1,"#050816"),r.fillStyle=S,r.fillRect(-800,_n,hi+1600,Ji-_n+400),r.globalCompositeOperation="lighter";for(let L=0;L<70;L++){const G=_n+6+Math.pow(L/70,1.6)*360,V=(10+L*2.2)*(.6+.4*Math.sin(y*1.3+L*1.7)),w=1180+Math.sin(L*12.9+y*.6)*(10+L*1.5);r.fillStyle=`rgba(246,239,216,${.5*(1-L/80)})`,r.fillRect(w-V/2,G,V,1.5+L*.03)}for(let L=0;L<40;L++){const G=(P(L,3)*2400-400+y*12)%2400-400,V=_n+20+P(L,4)*320;r.fillStyle="rgba(140,170,240,.12)",r.fillRect(G,V,30+P(L,5)*60,1)}if(r.globalCompositeOperation="source-over",b.ripples)for(const L of b.ripples)r.strokeStyle=q(L.col,L.a),r.lineWidth=2,r.beginPath(),r.ellipse(Ht.x,_n+40,L.r,L.r*.12,0,0,d),r.stroke();r.fillStyle="#0a0d1e",r.beginPath(),r.moveTo(Jh[0][0],Jh[0][1]);for(const L of Jh)r.lineTo(L[0],L[1]);r.closePath(),r.fill(),r.strokeStyle="rgba(120,140,220,.25)",r.lineWidth=2,r.beginPath(),r.moveTo(160,600),r.lineTo(640,600),r.stroke(),r.fillStyle="#0d1226";for(let L=0;L<30;L++){const G=170+L*16,V=6+P(L,9)*10,w=Math.sin(y*1.5+L)*2;r.beginPath(),r.moveTo(G,600),r.lineTo(G+3+w,600-V),r.lineTo(G+6,600),r.fill()}so(y,b.drumGlow||0,b.drumCol||"#ffcf5a"),uo(y,b.arm||0),b.lantern&&mo(b.lantern.x,b.lantern.y,b.lantern.s,y)}function so(y,b,x){const m=Ht;r.save(),r.translate(m.x,m.y);const _=r.createLinearGradient(0,0,0,m.ry*3);_.addColorStop(0,"#6a4626"),_.addColorStop(1,"#1d1209"),r.fillStyle=_,r.beginPath(),r.ellipse(0,0,m.rx,m.ry,0,Math.PI,0,!0),r.lineTo(m.rx*.9,m.ry*2.2),r.ellipse(0,m.ry*2.2,m.rx*.9,m.ry*.7,0,0,Math.PI),r.closePath(),r.fill();const S=r.createRadialGradient(0,0,0,0,0,m.rx);S.addColorStop(0,"#c99654"),S.addColorStop(.6,"#93653a"),S.addColorStop(1,"#5c3b1d"),r.fillStyle=S,r.beginPath(),r.ellipse(0,0,m.rx,m.ry,0,0,d),r.fill(),r.strokeStyle="rgba(255,226,170,.4)",r.lineWidth=1;for(const L of[.92,.74,.52,.3])r.beginPath(),r.ellipse(0,0,m.rx*L,m.ry*L,0,0,d),r.stroke();r.save(),r.scale(1,m.ry/m.rx),r.rotate(y*.1),r.fillStyle="rgba(255,226,170,.65)",r.beginPath();for(let L=0;L<28;L++){const G=L%2?m.rx*.07:m.rx*.2,V=L/28*d;r.lineTo(Math.cos(V)*G,Math.sin(V)*G)}r.closePath(),r.fill(),r.restore(),b>0&&(r.globalCompositeOperation="lighter",Sn(0,0,m.rx*2.2,x,b),r.globalCompositeOperation="source-over"),r.restore()}function uo(y,b){const x=nh;r.save(),r.translate(x.x,x.y),r.fillStyle="#05070f",r.beginPath(),r.moveTo(-16,-70),r.quadraticCurveTo(-30,-20,-34+Math.sin(y*2)*3,0),r.lineTo(30+Math.sin(y*2+1)*3,0),r.quadraticCurveTo(26,-30,16,-70),r.closePath(),r.fill(),r.beginPath(),r.ellipse(0,-82,15,18,0,0,d),r.fill(),r.beginPath(),r.moveTo(-6,-98),r.lineTo(4,-112),r.lineTo(10,-96),r.fill(),r.save(),r.translate(-10,-66),r.rotate(f(.5,-2.3,b)),r.fillRect(-4,0,8,40),r.restore(),r.strokeStyle="rgba(170,190,255,.35)",r.lineWidth=1.5,r.beginPath(),r.moveTo(16,-70),r.quadraticCurveTo(26,-30,30,0),r.stroke(),r.beginPath(),r.arc(0,-82,15,-1.2,.6),r.stroke(),r.restore()}function mo(y,b,x,m){r.save(),r.translate(y,b),r.scale(x,x),r.rotate(Math.sin(m*2)*.06),r.globalCompositeOperation="lighter",Sn(0,0,70,"#ffb24a",.85),Sn(0,0,26,"#ffe7b0",1),r.globalCompositeOperation="source-over",r.fillStyle="#ffd58a",r.beginPath(),r.moveTo(-11,-16),r.lineTo(11,-16),r.lineTo(14,14),r.lineTo(-14,14),r.closePath(),r.fill(),r.strokeStyle="rgba(150,70,20,.5)",r.lineWidth=1;for(let _=-1;_<=1;_++)r.beginPath(),r.moveTo(_*7,-16),r.lineTo(_*9,14),r.stroke();r.fillStyle="#fff6dc",r.fillRect(-4,8,8,5),r.restore()}const T={phase:"idle",t:0,gt:0,list:[],best:3,idx:0,parts:[],rings:[],shake:0,flash:0,flashCol:"#ffffff",bars:0,slow:1,flared:!1,cues:{}};function It(y,b,x,m={}){if(T.parts.length>1600)return;const _=m.a!==void 0?m.a:N(0,d),S=m.v!==void 0?m.v:N(40,220);T.parts.push({x:y,y:b,vx:Math.cos(_)*S,vy:Math.sin(_)*S,life:m.life||N(.4,1),max:m.life||1,size:m.size||N(2,5),col:x,drag:m.drag||1.6,g:m.g||0,kind:m.kind||"glow"})}function ge(y,b,x,m,_,S,L,G){T.rings.push({x:y,y:b,r0:x,r1:m,col:_,life:S,max:S,w:L,flat:G})}function fo(y){for(const b of T.parts){b.life-=y;const x=Math.exp(-b.drag*y);b.vx*=x,b.vy=b.vy*x+b.g*y,b.x+=b.vx*y,b.y+=b.vy*y}T.parts=T.parts.filter(b=>b.life>0);for(const b of T.rings)b.life-=y;T.rings=T.rings.filter(b=>b.life>0)}function ei(){r.globalCompositeOperation="lighter";for(const y of T.parts){const b=M(y.life/y.max,0,1);y.kind==="streak"?(r.strokeStyle=q(y.col,b),r.lineWidth=y.size*b,r.lineCap="round",r.beginPath(),r.moveTo(y.x,y.y),r.lineTo(y.x-y.vx*.06,y.y-y.vy*.06),r.stroke()):Sn(y.x,y.y,y.size*(1.5+b*2),y.col,b)}for(const y of T.rings){const b=y.life/y.max,x=C.out(1-b),m=f(y.r0,y.r1,x);r.strokeStyle=q(y.col,b*.9),r.lineWidth=y.w*b+.5,r.beginPath(),r.ellipse(y.x,y.y,m,m*y.flat,0,0,d),r.stroke()}r.globalCompositeOperation="source-over"}const Zn={...Vh.shots};function yo(y){T.list=y,T.best=Math.max(...y.map(x=>x.r)),T.order=[...y].sort((x,m)=>x.r-m.r),T.idx=0,T.phase="s1",T.t=0,T.parts=[],T.rings=[],T.flared=!1,T.cues={},T.slow=1,T.flash=0,T.shake=0,i.hidden=!1,h.hidden=!0,Gt.open(),T.clouds=Array.from({length:26},(x,m)=>({x:N(-.2,1.2),y:m/26*3.2,r:N(.18,.4),c:m%3?"#5b6aa8":"#7a6aa8"})),T.meteors=[];const b=y.length>1?6:1;for(let x=0;x<b;x++)T.meteors.push({main:x===0,r:x===0?T.best:y[x].r,off:x===0?0:N(-.25,.25),delay:x===0?0:.1+x*.07,trail:[]})}function th(y,b){T.cues[y]||(T.cues[y]=1,b())}function Gi(y){T.phase=y,T.t=0}function re(){T.phase="reveal",T.t=0,T.idx=0,le()}function le(){const y=T.order[T.idx];T.t=0,T.parts=[],T.rings=[],T.flash=y.r===5?.6:.35,T.flashCol=yn[y.r],T.starsShown=0,T.revealCue=!1}function po(){T.idx++,T.idx>=T.order.length?T.list.length>1?(Gi("summary"),T.parts=[],h.textContent="Chạm để quay lại",h.hidden=!1,i.hidden=!0,T.lastCard=-1):ia():le()}function ia(){t.done(),Zi(),T.phase="idle",T.t=0,T.parts=[],T.rings=[],T.slow=1,i.hidden=!0,h.hidden=!0}function vo(){T.phase==="summary"||T.phase==="idle"||(Zi(),T.slow=1,T.phase==="reveal"?T.list.length>1?(Gi("summary"),T.parts=[],i.hidden=!0,h.textContent="Chạm để quay lại",h.hidden=!1,T.lastCard=-1):ia():re())}function bo(y){const b=y*T.slow;T.t+=b,T.gt+=y,T.shake=Math.max(0,T.shake-y*36),T.flash=Math.max(0,T.flash-y*1.4);const x=["s1","s2","s3","s4"].includes(T.phase);if(T.bars=M(T.bars+(x?y:-y)*3,0,1),T.phase==="idle")Math.random()<y*10&&It(N(0,I),$+10,"#ffd68c",{a:-Math.PI/2+N(-.3,.3),v:N(20,60),drag:.2,life:N(3,6),size:N(1,2.2)});else if(T.phase==="s1")T.t/Zn.s1,T.t>1&&th("lantern",Gt.lantern),T.t>=Zn.s1&&(Gi("s2"),Gt.rise());else if(T.phase==="s2"){if(T.t/Zn.s2,T.t>.9){const m=Math.floor((T.t-.9)/.08);m>=0&&m<Un.length&&th("l"+m,()=>Gt.line(m))}T.t>.85&&th("burst",()=>{Gt.burstStars(),T.flash=.35,T.flashCol="#ffe1a0";for(let m=0;m<90;m++)It(I/2,$*.55,m%2?"#ffd68c":"#ffffff",{v:N(80,520),life:N(.6,1.4)})}),T.t>=Zn.s2&&(Gi("s3"),Gt.meteor())}else if(T.phase==="s3"){const m=M(T.t/Zn.s3,0,1),_=T.meteors[0];if(T.best===5&&m>.55&&!T.flared){T.flared=!0,T.slow=Vh.slowMo,T.flash=.7,T.flashCol=yn[5],Gt.slowmo();for(let S=0;S<120;S++)It(_.x||I/2,_.y||$/2,S%2?yn[5]:"#ffffff",{v:N(150,700),life:N(.6,1.4),size:N(2,5)});ge(_.x||I/2,_.y||$/2,10,Math.max(I,$)*.5,yn[5],1.2,10,1)}T.flared&&T.slow<1&&m>.72&&(T.slow=Math.min(1,T.slow+y*2.5)),T.t>=Zn.s3&&(T.slow=1,Gi("s4"),Gt.descend())}else if(T.phase==="s4")T.t>1&&th("impact",()=>{rn.impact(T.best),T.shake=Xn?0:T.best===5?24:T.best===4?15:9,T.flash=1,T.flashCol=yn[T.best]}),T.t>=Zn.s4&&re();else if(T.phase==="reveal"){const m=T.order[T.idx],_=yn[m.r];T.t>.55&&!T.revealCue&&(T.revealCue=!0,rn.reveal(m.r)),Math.random()<(m.r===5?.9:.45)&&It(N(0,I),$+10,m.r===5?Math.random()<.5?yn[5]:"#fff2c8":_,{a:-Math.PI/2+N(-.25,.25),v:N(40,160),drag:.3,life:N(2,4),size:N(1.5,3.5)});const S=Math.min(m.r,Math.floor(M((T.t-1.15)/.15,0,9)));for(;T.starsShown<S;)rn.star(T.starsShown,m.r),T.starsShown++}else if(T.phase==="summary"){Math.random()<.5&&It(N(0,I),$+10,"#ffd68c",{a:-Math.PI/2,v:N(20,60),drag:.2,life:4,size:N(1,2)});const m=Math.floor(T.t/.07);m<=T.list.length&&m!==T.lastCard&&(T.lastCard=m,m>0&&rn.card())}fo(y)}function To(y){const b=T.t/Zn.s1,x=C.inOut(M(b,0,1));ai={x:f(760,520,x),y:f(470,520,x),z:f(1,1.55,x)};const m=M((T.t-.5)/.6,0,1),_=M((T.t-1)/1.6,0,1),S=T.t>1?{x:nh.x-30+Math.sin(_*4)*10,y:f(nh.y-150,nh.y-560,C.in(_)),s:f(1,.7,_)}:null;r.save(),na(),ta(y,{arm:C.out(m),lantern:S,drumGlow:.08}),r.restore()}function ko(y){const b=M(T.t/Zn.s2,0,1),x=r.createLinearGradient(0,0,0,$);x.addColorStop(0,tn("#0b1030","#02030a",b)),x.addColorStop(1,tn("#24305e","#0a0d24",b)),r.fillStyle=x,r.fillRect(0,0,I,$);const m=C.out(b)*$*2.6;for(const w of qt){const W=(w.y*$*1.4+m*w.d*.35)%($*1.4)-$*.2;r.globalAlpha=(.3+.6*Math.abs(Math.sin(y*.8+w.p)))*(.4+b*.6),r.fillStyle="#e9ecff",r.fillRect(w.x*I,W,w.r,w.r+m*8e-4*w.d*40)}r.globalAlpha=1,r.globalCompositeOperation="lighter";for(const w of T.clouds){const W=(w.y*$-m*1.2+$*3)%($*3.2)-$*.4;Sn(w.x*I,W,w.r*Math.max(I,$),w.c,.22*(1-b*.6))}r.globalCompositeOperation="source-over";const _=I/2+Math.sin(T.t*3)*8,S=f($*.75,$*.55,C.out(M(T.t/.85,0,1)));T.t<.85&&(r.save(),r.translate(0,0),xo(_,S,f(1.4,.8,T.t/.85)),r.restore());const L=Math.min(I,$)*.42,G=I/2,V=$*.5;if(T.t>.85){const w=M((T.t-.9)/(Un.length*.08),0,1),W=Math.floor(w*Un.length),on=w*Un.length-W;r.save(),r.translate(G,V),r.rotate(-.08+T.t*.03),r.globalCompositeOperation="lighter",r.strokeStyle="rgba(201,154,91,.35)",r.lineWidth=1;for(const Y of[1.25,1.05])r.beginPath(),r.ellipse(0,0,L*Y,L*Y*.92,0,0,d*Math.min(1,(T.t-.85)*1.5)),r.stroke();r.strokeStyle="rgba(255,214,140,.85)",r.lineWidth=2.2,r.shadowColor="#ffd68c",r.shadowBlur=12;for(let Y=0;Y<Math.min(Un.length,W+1);Y++){const[Pn,Cn]=Un[Y],zn=Y<W?1:on,kt=sn[Pn],Vn=sn[Cn];r.beginPath(),r.moveTo(kt[0]*L,kt[1]*L),r.lineTo(f(kt[0],Vn[0],zn)*L,f(kt[1],Vn[1],zn)*L),r.stroke()}r.shadowBlur=0,sn.forEach((Y,Pn)=>Sn(Y[0]*L,Y[1]*L,10+4*Math.sin(y*3+Pn),"#ffd68c",M((T.t-.85)*3-Pn*.1,0,1))),r.restore(),r.globalCompositeOperation="source-over",r.textAlign="center",r.globalAlpha=M((T.t-1.3)/.4,0,1)*(1-M((T.t-2)/.2,0,1)),r.font=`italic 600 ${Math.round(Math.min(I*.03,30))}px "Cormorant Garamond",Georgia,serif`,r.fillStyle="#ffe7b8",r.fillText("Chòm Hồng Điểu",G,V+L*.62),r.globalAlpha=1}ei()}function xo(y,b,x,m){r.save(),r.translate(y,b),r.scale(x,x),r.globalCompositeOperation="lighter",Sn(0,0,90,"#ffb24a",.9),Sn(0,0,30,"#ffe7b0",1),r.globalCompositeOperation="source-over",r.fillStyle="#ffd58a",r.beginPath(),r.moveTo(-14,-20),r.lineTo(14,-20),r.lineTo(18,18),r.lineTo(-18,18),r.closePath(),r.fill(),r.fillStyle="#fff6dc",r.fillRect(-5,10,10,6),r.restore()}function Lo(y){const b=M(T.t/Zn.s3,0,1);r.fillStyle="#02030a",r.fillRect(0,0,I,$);const x=I*.72,m=$*.28,_=.4+C.in(b)*2.2;for(let S=0;S<qt.length;S++){const L=qt[S],G=L.p*10,V=(L.y+T.gt*.25*L.d*_)%1,w=Math.pow(V,2)*Math.hypot(I,$),W=x+Math.cos(G)*w,on=m+Math.sin(G)*w,Y=Math.max(1,w*.06*_);r.strokeStyle=`rgba(220,228,255,${.15+V*.7})`,r.lineWidth=L.r*(.5+V),r.beginPath(),r.moveTo(W,on),r.lineTo(W-Math.cos(G)*Y,on-Math.sin(G)*Y),r.stroke()}r.globalCompositeOperation="lighter";for(const S of T.meteors){const L=M((T.t-S.delay)/(Zn.s3*.95),0,1);if(L<=0)continue;const G=C.in(L),V=f(x,I*(-.15+S.off*.5),G)+Math.sin(G*3)*I*.05,w=f(m,$*(1.05+S.off*.3),G),W=f(2,S.main?Math.min(I,$)*.06:Math.min(I,$)*.02,G);let on=yn[S.r];S.main&&T.best===5&&(on=b<.55?yn[4]:tn(yn[4],yn[5],M((b-.55)/.06,0,1))),S.x=V,S.y=w,S.col=on,S.trail.unshift({x:V,y:w,s:W}),S.trail.length>40&&S.trail.pop();for(let Y=0;Y<S.trail.length-1;Y++){const Pn=1-Y/S.trail.length,Cn=S.trail[Y],zn=S.trail[Y+1];r.strokeStyle=q(on,Pn*.85),r.lineWidth=Cn.s*Pn*1.2,r.lineCap="round",r.beginPath(),r.moveTo(Cn.x,Cn.y),r.lineTo(zn.x,zn.y),r.stroke()}Sn(V,w,W*4,on,1),Sn(V,w,W*1.3,"#ffffff",1),S.main&&(ce(V,w,W*14,W*.9,on,.6),ce(V,w,W*.9,W*6,on,.25),Math.random()<.9&&It(V,w,on,{v:N(30,160),life:N(.3,.7),size:N(2,4)}))}r.globalCompositeOperation="source-over",ei()}function Mo(y){M(T.t/Zn.s4,0,1);const b=M((T.t-1)/.9,0,1);ai={x:f(720,Ht.x+60,C.inOut(M(T.t/1,0,1))),y:f(380,560,C.inOut(M(T.t/1,0,1))),z:f(.95,1.25,C.inOut(M(T.t/1.2,0,1)))};const x=yn[T.best],m=b>0?[0,1,2].map(_=>({r:f(20,900,M(b*1.2-_*.15,0,1)),a:.6*(1-M(b*1.2-_*.15,0,1)),col:x})):null;if(r.save(),na(),ta(y,{arm:1,drumGlow:b>0?(1-b)*1.2+.3:.1,drumCol:x,ripples:m}),r.globalCompositeOperation="lighter",T.t<1){const _=C.in(T.t/1),S=1380,L=-40,G=f(S,Ht.x,_),V=f(L,Ht.y,_);for(let w=0;w<24;w++){const W=w/24,on=f(S,Ht.x,Math.max(0,_-W*.25)),Y=f(L,Ht.y,Math.max(0,_-W*.25));Sn(on,Y,40*(1-W),x,.5*(1-W))}Sn(G,V,90,x,1),Sn(G,V,26,"#ffffff",1)}else{const _=Ht;r.strokeStyle=q(x,.8*(1-b)),r.lineWidth=6*(1-b)+1,r.beginPath(),r.ellipse(_.x,_.y,f(20,1100,C.out(b)),f(8,260,C.out(b)),0,0,d),r.stroke(),r.beginPath(),r.ellipse(_.x,_.y,f(10,500,C.out(b)),f(10,500,C.out(b)),0,Math.PI,0),r.stroke();for(let S=0;S<T.best;S++){const L=_.x+(S-(T.best-1)/2)*48,G=r.createLinearGradient(0,_.y,0,_.y-900);G.addColorStop(0,q(x,.85*(1-b*.6))),G.addColorStop(1,q(x,0)),r.fillStyle=G,r.fillRect(L-10*(1+b),_.y-900,20*(1+b),900)}if(!T.cues.burst4){T.cues.burst4=1;for(let S=0;S<160;S++)T.parts.push({x:_.x,y:_.y,vx:Math.cos(N(Math.PI,d))*N(100,700),vy:Math.sin(N(Math.PI,d))*N(100,700),life:N(.6,1.4),max:1.4,size:N(2,5),col:S%3?x:"#ffffff",drag:1.2,g:500,kind:"glow"})}}r.globalCompositeOperation="source-over",ei(),r.restore()}function se(y,b,x){const m=y+b+x;if(c[m])return c[m];const _=s(y,b,!0),S=document.createElement("canvas");S.width=_.width,S.height=_.height;const L=S.getContext("2d");return L.drawImage(_,0,0),L.globalCompositeOperation="source-in",L.fillStyle=x,L.fillRect(0,0,S.width,S.height),c[m]=S,S}function So(y,b,x,m){const _=at[y].c;if(r.save(),r.translate(b,x),r.strokeStyle=_,r.fillStyle=q(_,.25),r.lineWidth=Math.max(1.5,m*.09),r.lineJoin="round",r.beginPath(),y==="fire")r.moveTo(0,-m*.55),r.bezierCurveTo(m*.45,-m*.15,m*.4,m*.45,0,m*.5),r.bezierCurveTo(-m*.4,m*.45,-m*.45,-m*.05,-m*.1,-m*.2),r.bezierCurveTo(-m*.05,0,m*.05,-m*.2,0,-m*.55);else if(y==="water")r.moveTo(0,-m*.55),r.bezierCurveTo(m*.5,0,m*.4,m*.5,0,m*.5),r.bezierCurveTo(-m*.4,m*.5,-m*.5,0,0,-m*.55);else if(y==="wind")for(let S=0;S<40;S++){const L=S/40*d*1.6,G=m*.06+S/40*m*.45;r.lineTo(Math.cos(L)*G,Math.sin(L)*G)}else if(y==="bolt")r.moveTo(m*.1,-m*.55),r.lineTo(-m*.25,m*.05),r.lineTo(m*.05,m*.05),r.lineTo(-m*.1,m*.55),r.lineTo(m*.3,-m*.1),r.lineTo(0,-m*.1),r.closePath();else if(y==="earth")r.moveTo(0,-m*.55),r.lineTo(m*.45,0),r.lineTo(0,m*.55),r.lineTo(-m*.45,0),r.closePath(),r.moveTo(-m*.45,0),r.lineTo(m*.45,0);else for(let S=0;S<6;S++){const L=S/6*d;r.moveTo(0,0),r.lineTo(Math.cos(L)*m*.5,Math.sin(L)*m*.5),r.moveTo(Math.cos(L)*m*.3,Math.sin(L)*m*.3),r.lineTo(Math.cos(L+.4)*m*.4,Math.sin(L+.4)*m*.4)}y!=="wind"&&y!=="ice"&&r.fill(),r.stroke(),r.restore()}function ue(y,b,x,m,_){r.save(),r.translate(b,x),r.rotate(-.6),r.globalCompositeOperation="lighter",Sn(0,0,m*.9,_,.5),r.globalCompositeOperation="source-over",r.fillStyle="#cfd6e4",r.strokeStyle=_,r.lineWidth=2,y==="sword"?($n(r,-m*.04,-m*.5,m*.08,m*.75,3),r.fill(),r.fillStyle=_,r.fillRect(-m*.16,m*.22,m*.32,m*.05)):y==="great"?(r.beginPath(),r.moveTo(-m*.1,m*.25),r.lineTo(-m*.12,-m*.42),r.lineTo(0,-m*.55),r.lineTo(m*.12,-m*.42),r.lineTo(m*.1,m*.25),r.closePath(),r.fill(),r.fillStyle=_,r.fillRect(-m*.22,m*.25,m*.44,m*.06)):y==="spear"?(r.fillStyle="#7a5534",r.fillRect(-m*.03,-m*.4,m*.06,m*.95),r.fillStyle=_,r.beginPath(),r.moveTo(0,-m*.6),r.lineTo(-m*.1,-m*.38),r.lineTo(m*.1,-m*.38),r.closePath(),r.fill()):y==="bow"?(r.beginPath(),r.arc(0,0,m*.45,-1.2,1.2),r.stroke(),r.strokeStyle="#fff",r.lineWidth=1,r.beginPath(),r.moveTo(Math.cos(-1.2)*m*.45,Math.sin(-1.2)*m*.45),r.lineTo(Math.cos(1.2)*m*.45,Math.sin(1.2)*m*.45),r.stroke()):($n(r,-m*.3,-m*.38,m*.6,m*.76,6),r.fill(),r.fillStyle=_,r.fillRect(-m*.22,-m*.28,m*.44,m*.06),r.fillRect(-m*.22,-m*.12,m*.3,m*.04)),r.restore()}function No(y,b,x,m,_,S){r.save(),r.translate(y,b),r.rotate(_*.12),r.globalCompositeOperation="lighter",r.fillStyle=q(x,m);const L=Math.hypot(I,$);for(let G=0;G<S;G++)r.rotate(d/S),r.beginPath(),r.moveTo(0,0),r.lineTo(L,-L*.05),r.lineTo(L,L*.05),r.closePath(),r.fill();r.restore(),r.globalCompositeOperation="source-over"}function _o(y,b,x,m,_){const S=y.split(" ");let L="",G=x;for(const V of S){const w=L?L+" "+V:V;r.measureText(w).width>m&&L?(r.fillText(L,b,G),L=V,G+=_):L=w}L&&r.fillText(L,b,G)}function Co(y){const b=T.order[T.idx],x=yn[b.r],m=I>=$*1.05;r.fillStyle="#04050c",r.fillRect(0,0,I,$);for(const w of qt)r.globalAlpha=.25+.4*Math.abs(Math.sin(y*.7*w.d+w.p)),r.fillStyle="#e9ecff",r.fillRect(w.x*I,w.y*$,w.r,w.r);r.globalAlpha=1;const _=m?I*.66:I/2,S=m?$*.5:$*.36,L=M((T.t-.55)/.45,0,1),G=r.createRadialGradient(_,S,0,_,S,Math.max(I,$)*.7);G.addColorStop(0,q(x,.15+.3*L)),G.addColorStop(.5,q(x,.05+.06*L)),G.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=G,r.fillRect(0,0,I,$),No(_,S,x,(b.r===5?.075:.045)*(.3+.7*L),y,b.r===5?26:16),r.save(),r.translate(_,S),r.rotate(y*.05),r.strokeStyle=q(x,.35*L),r.lineWidth=1.2;const V=Math.min(I,$)*(m?.4:.31);for(const w of[1,.86,.7])r.beginPath(),r.arc(0,0,V*w,0,d),r.stroke();for(let w=0;w<48;w++){const W=w/48*d;r.beginPath(),r.moveTo(Math.cos(W)*V,Math.sin(W)*V),r.lineTo(Math.cos(W)*V*(w%4?.97:.93),Math.sin(W)*V*(w%4?.97:.93)),r.stroke()}if(r.restore(),b.kind==="char"){const w=a[b.id],W=Math.round(Math.min($*(m?.96:.64),I*(m?.62:1.05))),on=s(b.id,W),Y=on.width,Pn=f(1.12,1,C.out(M(T.t/1.1,0,1)));r.save(),r.translate(_,S+W*.02),r.scale(Pn,Pn);const Cn=-Y/2,zn=-W*.52;r.globalCompositeOperation="lighter";const kt=se(b.id,W,x);if(r.globalAlpha=.55*(1-L*.6),r.drawImage(kt,Cn-4,zn-3),r.drawImage(kt,Cn+4,zn-3),r.globalAlpha=1,r.globalCompositeOperation="source-over",r.drawImage(se(b.id,W,"#06070f"),Cn,zn),L>0&&(r.save(),r.beginPath(),r.rect(Cn,zn+W*(1-C.out(L)),Y,W*C.out(L)+2),r.clip(),r.drawImage(s(b.id,W,!0),Cn,zn),r.restore(),L<1)){r.globalCompositeOperation="lighter";const Gn=zn+W*(1-C.out(L)),mt=r.createLinearGradient(0,Gn-20,0,Gn+20);mt.addColorStop(0,q(x,0)),mt.addColorStop(.5,q(x,.9)),mt.addColorStop(1,q(x,0)),r.fillStyle=mt,r.fillRect(Cn,Gn-20,Y,40),r.globalCompositeOperation="source-over"}if(r.restore(),T.t>.55&&T.t<.62&&!T.cues["b"+T.idx]){T.cues["b"+T.idx]=1;for(let Gn=0;Gn<(b.r===5?140:70);Gn++)It(_,S,Gn%2?at[w.el].c:x,{v:N(100,600),life:N(.6,1.3),size:N(2,5)});ge(_,S,20,Math.min(I,$)*.6,x,.9,8,1)}const Vn=m?Math.max(28,I*.07):I/2,Jn=m?$*.52:$*.74;r.textAlign=m?"left":"center";const kn=Math.round(Math.min(m?I*.078:I*.12,100)),ut=M((T.t-.9)/.35,0,1),de=f(1.5,1,C.out(ut));r.globalAlpha=M((T.t-.75)/.35,0,1),r.font=`600 ${Math.max(12,Math.round(kn*.2))}px "Be Vietnam Pro",sans-serif`,r.fillStyle=at[w.el].c2;const fe=`${w.title} · ${at[w.el].vi}`;if(m?(So(w.el,Vn+kn*.18,Jn-kn*1.02,kn*.32),r.fillText(fe,Vn+kn*.42,Jn-kn*.95)):r.fillText(fe,Vn,Jn-kn*.95),r.save(),r.translate(Vn,Jn),r.scale(de,de),r.globalAlpha=ut,r.font=`700 ${kn}px "Cormorant Garamond",Georgia,serif`,r.shadowColor=q(x,.8),r.shadowBlur=26,r.fillStyle="#fbf5e6",r.fillText(w.name,0,0),r.shadowBlur=0,r.restore(),b.r===5&&T.t>1.3&&T.t<2.6){r.font=`700 ${kn}px "Cormorant Garamond",Georgia,serif`;const Gn=r.measureText(w.name).width,mt=m?Vn:Vn-Gn/2,hh=(T.t-1.3)/1.3;r.globalCompositeOperation="lighter";const ah=mt+Gn*hh*1.4-Gn*.2,xt=r.createLinearGradient(ah-40,0,ah+40,0);xt.addColorStop(0,"rgba(255,230,160,0)"),xt.addColorStop(.5,"rgba(255,240,200,.55)"),xt.addColorStop(1,"rgba(255,230,160,0)"),r.fillStyle=xt,r.globalAlpha=1,r.fillText(w.name,Vn,Jn),r.globalCompositeOperation="source-over"}const ye=Jn+kn*.55,zt=Math.max(18,kn*.3);for(let Gn=0;Gn<b.r;Gn++){const mt=M((T.t-1.15-Gn*.15)/.25,0,1);if(mt<=0)continue;const hh=C.back(mt),ah=m?Vn+zt*.6+Gn*zt*1.15:Vn+(Gn-(b.r-1)/2)*zt*1.15;r.save(),r.translate(ah,ye),r.scale(hh,hh),r.globalAlpha=1,r.globalCompositeOperation="lighter",Sn(0,0,zt*.9,x,.6*mt),r.globalCompositeOperation="source-over",r.fillStyle=x,r.beginPath();for(let xt=0;xt<10;xt++){const pe=xt%2?zt*.22:zt*.5,ve=xt/10*d-Math.PI/2;r.lineTo(Math.cos(ve)*pe,Math.sin(ve)*pe)}r.closePath(),r.fill(),r.restore()}r.globalAlpha=M((T.t-1.8)/.5,0,1),r.font=`italic 600 ${Math.max(14,Math.round(kn*.24))}px "Cormorant Garamond",Georgia,serif`,r.fillStyle="rgba(243,236,219,.85)",_o(`“${w.line}”`,Vn,ye+zt*1.5,m?Math.min(I*.42,520):I*.86,Math.max(18,kn*.3)),r.font=`700 ${Math.max(11,Math.round(kn*.15))}px "Be Vietnam Pro",sans-serif`,r.fillStyle=x,r.fillText((b.isNew?"HỘ TINH MỚI":"ĐÃ GẶP LẠI · +1 CUNG MỆNH")+(b.feat?" · NHÂN VẬT GIỚI HẠN":""),Vn,Jn-kn*1.45),r.globalAlpha=1}else{const w=C.out(M(T.t/.5,0,1)),W=Math.min(I,$)*.42;ue(b.k,_+(1-w)*80,S,W,x),r.textAlign="center";const on=m?_:I/2,Y=m?$*.86:$*.74;r.font=`700 ${Math.round(Math.min(I*.07,64))}px "Cormorant Garamond",Georgia,serif`,r.fillStyle="#f3ecdb",r.globalAlpha=w,r.fillText(b.name,on,Y),r.font='600 14px "Be Vietnam Pro",sans-serif',r.fillStyle=x,r.fillText("★★★ · đổi thành 500 Xu",on,Y+30),r.globalAlpha=1}ei(),r.textAlign="center",r.font='500 12px "Be Vietnam Pro",sans-serif',r.fillStyle="rgba(243,236,219,.5)",r.fillText(`${T.idx+1}/${T.order.length} · chạm để tiếp tục`,I/2,$-18)}function Go(y){r.fillStyle="#04050c",r.fillRect(0,0,I,$);for(const Y of qt)r.globalAlpha=.3+.4*Math.abs(Math.sin(T.gt*.7*Y.d+Y.p)),r.fillStyle="#e9ecff",r.fillRect(Y.x*I,Y.y*$,Y.r,Y.r);r.globalAlpha=1;const b=[...T.list].sort((Y,Pn)=>Pn.r-Y.r),x=b.length,m=x>5?5:x,_=Math.ceil(x/m),S=Math.max(6,I*.008),L=Math.min((I-32)/m-S,200),G=Math.min(L*1.55,($-130)/_-S),V=G/1.55,w=m*(V+S)-S,W=(I-w)/2,on=($-(_*(G+S)-S))/2+14;r.textAlign="center",r.font=`700 ${Math.round(Math.min(40,I*.05))}px "Cormorant Garamond",Georgia,serif`,r.fillStyle="#f3ecdb",r.fillText("Sao đã rơi",I/2,Math.max(40,on-20)),b.forEach((Y,Pn)=>{const Cn=M((y-Pn*.07)/.35,0,1);if(Cn<=0)return;const zn=W+Pn%m*(V+S),kt=on+Math.floor(Pn/m)*(G+S)+(1-C.out(Cn))*30,Vn=Math.abs(Math.cos(Math.PI*(1-Cn))),Jn=Cn>.5,kn=yn[Y.r];if(r.save(),r.translate(zn+V/2,kt+G/2),r.scale(Math.max(.02,Vn),1),r.translate(-V/2,-G/2),Y.r===5&&Jn&&(r.globalCompositeOperation="lighter",Sn(V/2,G/2,V*1.1,kn,.35+.15*Math.sin(T.gt*3)),r.globalCompositeOperation="source-over"),$n(r,0,0,V,G,10),r.save(),r.clip(),Jn)Y.kind==="char"?r.drawImage(p(Y.id,200,310),0,0,V,G):(r.fillStyle="#1d2a44",r.fillRect(0,0,V,G),ue(Y.k,V/2,G*.42,V*.8,kn));else{r.fillStyle="#1a1630",r.fillRect(0,0,V,G),r.strokeStyle="rgba(201,154,91,.5)";for(let ut=1;ut<5;ut++)r.beginPath(),r.arc(V/2,G/2,V*.12*ut,0,d),r.stroke()}if(Jn){const ut=r.createLinearGradient(0,G*.55,0,G);ut.addColorStop(0,"rgba(0,0,0,0)"),ut.addColorStop(1,"rgba(0,0,0,.75)"),r.fillStyle=ut,r.fillRect(0,0,V,G),r.fillStyle="#fff",r.font=`700 ${Math.max(10,Math.round(V*.11))}px "Be Vietnam Pro",sans-serif`,r.textAlign="center",r.fillText(Y.name,V/2,G-V*.2),r.fillStyle=kn,r.font=`${Math.max(10,Math.round(V*.12))}px sans-serif`,r.fillText("★".repeat(Y.r),V/2,G-V*.06)}r.restore(),r.strokeStyle=Jn?kn:"rgba(201,154,91,.6)",r.lineWidth=2,$n(r,0,0,V,G,10),r.stroke(),r.restore()}),ei()}function Ho(y){ai={x:640+Math.sin(y*.1)*20,y:500,z:1.08},r.save(),na(),ta(y,{arm:0,drumGlow:.12+.06*Math.sin(y*2)}),r.restore(),r.save(),r.globalCompositeOperation="lighter";const b=Math.min(I,$)*.22,x=I*.62,m=$*.24;r.strokeStyle="rgba(255,214,140,.35)",r.lineWidth=1.2;for(const[L,G]of Un)r.beginPath(),r.moveTo(x+sn[L][0]*b,m+sn[L][1]*b),r.lineTo(x+sn[G][0]*b,m+sn[G][1]*b),r.stroke();sn.forEach((L,G)=>Sn(x+L[0]*b,m+L[1]*b,5+2*Math.sin(y*2+G),"#ffd68c",.8)),r.restore();const _=Math.round(Math.min($*.62,I*.42)),S=s(g,_);r.globalAlpha=.95,r.drawImage(S,I*.7-S.width/2,$*.47-_*.5+Math.sin(y*1.2)*6),r.globalAlpha=1,ei()}function Bo(y){r.setTransform(Ci,0,0,Ci,0,0);const b=T.shake?[N(-T.shake,T.shake),N(-T.shake,T.shake)]:[0,0];if(r.save(),r.translate(b[0],b[1]),T.phase==="idle"?Ho(y):T.phase==="s1"?To(y):T.phase==="s2"?ko(y):T.phase==="s3"?Lo():T.phase==="s4"?Mo(y):T.phase==="reveal"?Co(y):T.phase==="summary"&&Go(T.t),r.restore(),T.flash>0&&(r.fillStyle=q(T.flashCol,Math.min(1,T.flash)*.85),r.fillRect(0,0,I,$)),T.bars>0){const x=$*.1*C.out(T.bars);r.fillStyle="#000",r.fillRect(0,0,I,x),r.fillRect(0,$-x,I,x)}["s1","s2","s3","s4"].includes(T.phase)&&T.t<.12&&(r.fillStyle=`rgba(0,0,0,${1-T.t/.12})`,r.fillRect(0,0,I,$))}let ih=0,$t=0;function me(y){const b=ih?Math.min(.05,(y-ih)/1e3):.016666666666666666;ih=y;try{bo(b),Bo(y/1e3)}catch(x){console.error(x)}T.phase!=="idle"?$t=requestAnimationFrame(me):$t=0}function Po(){T.phase==="reveal"?T.t<2?(T.t=2.2,T.starsShown=T.order[T.idx].r,T.revealCue||(T.revealCue=!0)):po():T.phase==="summary"&&T.t>.6&&ia()}return{S:T,resize:oe,tap:Po,skip:vo,play(y){g=t.featured(),oe(),yo(y),ih=0,$t||($t=requestAnimationFrame(me))},stop(){T.phase="idle",$t&&cancelAnimationFrame($t),$t=0,Zi()},clearCache(){for(const y in l)delete l[y];for(const y in u)delete u[y];for(const y in c)delete c[y]}}}const jn=n=>document.getElementById(n);let gt=null,Ga=null;const bh={};function Vg(n){return n.map(t=>t.kind==="char"?{kind:"char",id:t.id,r:t.r,name:t.name,feat:!!t.feat,isNew:!t.dup}:{kind:"item",r:3,name:typeof t.name=="string"?t.name:String(t.name?.n??t.name),k:"sword"})}async function wg(n){await Promise.all(n.filter(t=>t.kind==="char"&&t.id&&!(t.id in bh)).map(async t=>{const i=t.id;if(bh[i]=Qn[i]?.desc??"",!!wi(i))try{const h=(await Ei(i))["loi-thoai"];for(const a of h?.sections??[])for(const g of a.blocks)if(g.t==="table"){const l=g.rows.find(c=>c.some(s=>/Ước nguyện/i.test(s)));if(l){bh[i]=vh(l[l.length-1]).replace(/^"|"$/g,"");return}}}catch{}}))}function Eg(){if(gt)return gt;const n=jn("wishFx"),t=jn("wishSkip"),i=jn("wishHint");return gt=Pg(jn("wishCv"),{sound:()=>e.soundOn,done:()=>Kg(),featured:()=>E.P?.cfg?.featured??"lachong",line:h=>bh[h]??Qn[h]?.desc??"",skipBtn:t,hint:i}),t.addEventListener("click",h=>{h.stopPropagation(),gt.skip()}),n.addEventListener("pointerdown",h=>{h.target.id!=="wishSkip"&&gt.tap()}),addEventListener("resize",()=>!n.hidden&&gt.resize()),gt}function Ag(n){if(!gt||jn("wishFx").hidden)return!1;if(n.key==="Escape")gt.skip();else if(n.key===" "||n.key==="Enter")gt.tap();else return!1;return n.preventDefault(),!0}const Rg=()=>!!gt&&!jn("wishFx").hidden;function Kg(){const n=jn("wishFx");n.hidden=!0,jn("wishVid").pause(),jn("wishVid").hidden=!0;const t=Ga;Ga=null,t?.()}function Dg(n){const t=jn("wishVid");return new Promise(i=>{let h=!1;const a=l=>{h||(h=!0,clearTimeout(g),t.onended=t.onerror=null,t.hidden=!0,i(l))},g=setTimeout(()=>t.readyState<2&&a(!1),Vh.videoTimeoutMs);t.onended=()=>a(!0),t.onerror=()=>a(!1),t.hidden=!1,t.src=n,t.play().catch(()=>a(!1)),jn("wishSkip").onclick=()=>a(!0)})}async function Og(n,t){const i=Vg(n),h=Eg();Ga=t??null;const a=jn("wishFx");a.hidden=!1,await wg(i);const g=Math.max(...i.map(c=>c.r)),l=Vh.videos[String(g)];if(l&&await Dg(l)){jn("wishSkip").onclick=null,h.play(i),h.skip();return}jn("wishSkip").onclick=null,h.play(i)}const Ni={},ht=(n,t)=>Ni[n]=t,it=[];let Hn,Ft,Ha,Ah,mi,Ai=null,ra=0;const Fi=()=>!!Hn&&!Hn.hidden,jh=()=>it[it.length-1]?.id??null;function qg(){Hn=v("div",{id:"ttMenu",class:"tt-root tt-menu",role:"dialog","aria-modal":"true","aria-labelledby":"ttMenuTitle",hidden:!0}),Hn.style.setProperty("--menu-ms",`${pn.transitionMs}ms`),mi=en("Quay lại",{variant:"ghost",icon:"quay-lai",onClick:()=>dc()}),mi.dataset.back="",mi.id="ttMenuBack",Ha=v("h2",{id:"ttMenuTitle",class:"tt-h2"}),Ah=v("div",{class:"tt-menu-wallets"});const n=en("Đóng menu",{variant:"ghost",icon:"dong",iconOnly:!0,onClick:()=>Dt()});n.id="ttMenuClose",Ft=v("main",{id:"ttMenuBody",class:"tt-menu-body"}),Hn.append(v("header",{class:"tt-menu-top"},[mi,Ha,Ah,n]),Ft),document.body.append(Hn)}function Wi(){Ah&&Ah.replaceChildren(be("da-sao",E.P.gems),be("xu",E.P.coin))}function Mt(n="main",t={}){if(!Ni[n])throw new Error(`Không có màn menu "${n}"`);return Fi()||(fc=performance.now(),Ai=document.activeElement,it.length=0,n!=="main"&&it.push({id:"main",params:{}}),e.G&&_i(),he(),e.paused=!0,e.overlay="menu",Hn.hidden=!1,Hn.classList.remove("is-open"),Hn.offsetWidth,Hn.classList.add("is-open")),it.push({id:n,params:t}),Xh()}function dc(){return it.length<=1?Dt():(Ni[jh()]?.onClose?.(),it.pop(),Xh())}function Dt(){if(Fi()){for(const n of it)Ni[n.id]?.onClose?.();it.length=0,Hn.classList.remove("is-open"),Hn.hidden=!0,Ft.replaceChildren(),e.overlay=null,document.getElementById("modal")?.hidden!==!1&&(e.paused=!1),(Ai&&document.contains(Ai)?Ai:document.getElementById("game"))?.focus?.(),Ai=null,document.dispatchEvent(new CustomEvent("tt-menu-close"))}}const an=()=>Xh(!1);async function Xh(n=!0){const t=it[it.length-1],i=Ni[t.id],h=++ra,a=performance.now();Ha.replaceChildren(i.icon?Tn(i.icon,{size:24}):"",i.title),mi.querySelector(".tt-btn-label").textContent=it.length>1?"Quay lại":"Tiếp tục",Hn.dataset.screen=t.id,Hn.removeAttribute("data-ready"),Wi();const g=v("div",{class:"tt-menu-screen"+(n?" is-enter":""),"data-screen":t.id}),l=n?0:Ft.firstElementChild?.scrollTop??0;Ft.replaceChildren(g);try{const c=i.render(g,t.params);if(c instanceof Promise){const s=v("div",{class:"tt-menu-loading",role:"status"},[v("span",{class:"tt-spinner","aria-hidden":"true"}),"Đang tải…"]);Ft.append(s);try{await c}finally{s.remove()}}if(h!==ra)return;g.scrollTop=l,Hn.dataset.ready="",Hn.dataset.ms=String(Math.round(performance.now()-a)),n&&$g(g)}catch(c){if(h!==ra)return;console.warn(c);const s=en("Thử lại",{variant:"primary",icon:"lam-moi",onClick:()=>Xh()});Ft.replaceChildren(v("div",{class:"tt-menu-error",role:"alert"},[Tn("bao-loi",{size:40}),v("h3",{class:"tt-h3"},["Không mở được màn này"]),v("p",{},[String(c?.message??c)]),s])),Hn.dataset.ready="error",s.focus()}}const Ig="[autofocus], button:not(:disabled), [href], input, select, textarea, [tabindex='0']";function $g(n){(n.querySelector("[autofocus]")??n.querySelector(Ig)??mi).focus({preventScroll:!0})}let fc=-1;const Ae={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};function zg(n){if(Rg()){(Ag(n)||n.key!=="Tab")&&n.stopImmediatePropagation();return}if(!Fi())return;if(n.timeStamp<=fc)return n.stopImmediatePropagation();if([...document.querySelectorAll(".tt-scrim")].some(g=>!g.hidden&&g.offsetParent!==null))return;const t=document.activeElement,i=!!t&&(/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)||t.isContentEditable),h=!!t?.closest("[role=tablist]");let a=!1;n.key==="Escape"||n.key==="Backspace"&&!i?(dc(),a=!0):!i&&Ni[jh()]?.onKey?.(n)?a=!0:Ae[n.key]&&!i&&!h&&(Qa(Ae[n.key]),a=!0),a&&n.preventDefault(),n.key!=="Tab"&&n.stopImmediatePropagation()}function Wg(){qg(),addEventListener("keydown",zg,{capture:!0})}const X=JSON.parse(JSON.stringify(wo)),Qg={get shake(){return z.shake}};function Ts(n){z.shake=n,!n&&e.G&&(e.G.shake=0),Si()}const vn={stop:0,slow:0,slowDur:0,slowScale:1,burstT:0,leadX:0,leadY:0},Et={atk:0,skill:0,burst:0,dash:0,jump:0};function jg(){for(const n in Et)Et[n]=0;Object.assign(vn,{stop:0,slow:0,slowDur:0,slowScale:1,burstT:0,leadX:0,leadY:0}),e.camZoom=1,e.ZOOM=e.BASE_ZOOM}function Li(n){const t=Math.min(X.hitstop[n],X.hitstop.max);vn.stop=Math.max(vn.stop,t)}function Xg(n,t){vn.slowScale=n,vn.slow=vn.slowDur=t}function In(n,t=1){if(!Qg.shake||!e.G)return;const i=(X.shake[n]??0)*(X.shake.scale??1)*t;e.G.shake=Math.max(e.G.shake,i)}function Yg(n){if(e.G&&(e.G.shake=Math.max(0,e.G.shake-n*(X.shake.decay??30))),vn.stop>0)return vn.stop-=n,0;if(vn.slow>0){vn.slow-=n;const t=Math.min(1,Math.max(0,vn.slow)/Math.min(.3,vn.slowDur));return n*(1-(1-vn.slowScale)*t)}return n}const Fg={c:"#ffffff",c2:"#ffffff",particle:"spark",trail:"arc"};function Ui(n){return X.characters[n]??Fg}function yc(n){return X.enemies[n.isBoss?"hacgiao":n.type]??{mass:1,poise:60}}const bt={sfx:null,music:null};function ja(){if(!e.soundOn)return null;if(!e.AC)try{const n=new(window.AudioContext||window.webkitAudioContext),t=n.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=4,t.connect(n.destination),bt.sfx=n.createGain(),bt.music=n.createGain(),bt.sfx.connect(t),bt.music.connect(t),e.AC=n,Th()}catch{return null}return e.AC.state==="suspended"&&e.AC.resume(),e.AC}function Th(){e.AC&&(bt.sfx.gain.value=X.audio.sfx*z.master*z.sfx,bt.music.gain.value=X.audio.music*z.master*z.music)}const Ug=n=>`./audio/kenney/${n}.ogg`,et=(n,t)=>Array.from({length:t},(i,h)=>`${n}_00${h}`),pc={hit_sword:{files:et("impactMetal_light",3),vol:.55,rate:[1.05,1.25]},hit_great:{files:et("impactPlate_heavy",3),vol:.75,rate:[.8,.95]},hit_spear:{files:et("impactPlank_medium",3),vol:.65,rate:[1,1.2]},hit_bow:{files:et("impactWood_light",3),vol:.55,rate:[1.1,1.3]},hit_cat:{files:et("impactGlass_light",3),vol:.45,rate:[.9,1.15]},crit:{files:et("impactMetal_heavy",2),vol:.5,rate:[1.1,1.25]},swing:{files:["cloth1","cloth2","cloth3","cloth4"],vol:.35,rate:[1.3,1.6]},swing_great:{files:["cloth1","cloth2"],vol:.5,rate:[.7,.85]},shoot:{files:["knifeSlice2"],vol:.3,rate:[1.3,1.5]},cast:{files:["impactGlass_medium_000"],vol:.2,rate:[1.6,1.9]},dash:{files:["cloth3","cloth4"],vol:.45,rate:[.9,1.1]},skill:{files:et("impactBell_heavy",2),vol:.35,rate:[1.3,1.45],synth:"rise"},burst:{files:["impactBell_heavy_001"],vol:.55,rate:[.7,.75],synth:"boom"},break:{files:et("impactMining",2),vol:.75,rate:[.85,1],synth:"crack"},kill:{files:et("impactSoft_heavy",2),vol:.55,rate:[.9,1.1]},hurt:{files:et("impactPunch_heavy",2),vol:.7,rate:[.9,1.05]},slam:{files:et("impactPlate_heavy",3),vol:.8,rate:[.55,.65],synth:"boom"},react:{files:["impactGlass_medium_000"],vol:.45,rate:[.95,1.2]},chest:{files:["metalLatch"],vol:.6,rate:[1,1]},coin:{files:["handleCoins","handleCoins2"],vol:.45,rate:[1,1.15]},roar:{files:[],vol:0,rate:[1,1],synth:"roar"},bossKill:{files:["impactBell_heavy_000"],vol:.7,rate:[.5,.5],synth:"boom"}},Ri=new Map,Re=new Map;function vc(n,t){Ri.has(t)||n.currentTime-(Re.get(t)??-1/0)<5||(Ri.set(t,null),fetch(Ug(t)).then(i=>i.arrayBuffer()).then(i=>n.decodeAudioData(i)).then(i=>Ri.set(t,i)).catch(()=>{Ri.delete(t),Re.set(t,n.currentTime)}))}function Zg(){const n=ja();if(n)for(const t of Object.values(pc))for(const i of t.files)vc(n,i)}const Ke={};let Ba=0;function Mn(n){const t=ja();if(!t)return;const i=t.currentTime;if(i-(Ke[n]??-1)<.035||Ba>14)return;Ke[n]=i;const h=pc[n];if(h){if(h.files.length){const a=h.files[Math.random()*h.files.length|0],g=Ri.get(a);g?Jg(t,g,h.vol,h.rate[0]+Math.random()*(h.rate[1]-h.rate[0])):vc(t,a)}h.synth&&De(t,h.synth);return}De(t,n)}function Jg(n,t,i,h){const a=n.createBufferSource(),g=n.createGain();a.buffer=t,a.playbackRate.value=h,g.gain.value=i,a.connect(g).connect(bt.sfx),Ba++,a.onended=()=>Ba--,a.start()}function nt(n,t,i,h,a,g,l=0,c=.005){const s=n.currentTime+l,u=n.createOscillator(),p=n.createGain();u.type=t,u.frequency.setValueAtTime(i,s),h!==i&&u.frequency.exponentialRampToValueAtTime(Math.max(20,h),s+a),p.gain.setValueAtTime(1e-4,s),p.gain.exponentialRampToValueAtTime(g,s+c),p.gain.exponentialRampToValueAtTime(1e-4,s+a),u.connect(p).connect(bt.sfx),u.start(s),u.stop(s+a+.02)}let ch=null;function la(n,t,i,h,a=1,g="lowpass"){if(!ch){ch=n.createBuffer(1,n.sampleRate,n.sampleRate);const p=ch.getChannelData(0);for(let d=0;d<p.length;d++)p[d]=Math.random()*2-1}const l=n.currentTime,c=n.createBufferSource(),s=n.createBiquadFilter(),u=n.createGain();c.buffer=ch,s.type=g,s.frequency.setValueAtTime(h,l),s.frequency.exponentialRampToValueAtTime(Math.max(40,h*.25),l+t),s.Q.value=a,u.gain.setValueAtTime(i,l),u.gain.exponentialRampToValueAtTime(1e-4,l+t),c.connect(s).connect(u).connect(bt.sfx),c.start(l),c.stop(l+t)}function De(n,t){switch(t){case"warn":nt(n,"triangle",660,660,.09,.09);break;case"warn2":nt(n,"triangle",990,990,.08,.11),nt(n,"sine",1320,1320,.1,.06,.02);break;case"warnBoss":nt(n,"sawtooth",220,330,.25,.06),nt(n,"triangle",440,660,.25,.08);break;case"rise":nt(n,"triangle",300,900,.22,.05);break;case"boom":nt(n,"sine",120,40,.5,.25),la(n,.45,.25,1200);break;case"crack":la(n,.18,.35,4e3,2,"bandpass");break;case"roar":nt(n,"sawtooth",90,55,.9,.12,0,.08),la(n,.9,.18,700,1);break;case"star3":nt(n,"sine",784,784,.35,.06);break;case"star4":[659,880,1109].forEach((i,h)=>nt(n,"sine",i,i,.5,.06,h*.08));break;case"star5":[523,784,1047,1319,1568].forEach((i,h)=>nt(n,"sine",i,i,.9,.06,h*.09));break;default:nt(n,"sine",440,440,.1,.03)}}const nr={atk:"xl",skill:"lg",burst:"lg",jump:"lg",dash:"md",interact:"md",joy:"joy"};function tr(n,t,i){const h=nr[n];return h==="joy"?i*2+20:$a(t)[h]}function ir(n,t,i,h,a,g){const l=$a(h).xl,c=tr(n,h,g)*t.scale,s=t.anchor==="br"?i-a.r-t.dx*l:a.l+t.dx*l,u=h-a.b-t.dy*l;return{x:s-c/2,y:u-c/2,w:c,h:c}}function hr(n,t,i,h,a,g){const l=$a(a).xl,c=n.anchor==="br"?(h-g.r-t)/l:(t-g.l)/l,s=(a-g.b-i)/l,u=p=>Math.round(p*100)/100;return{...n,dx:u(Math.max(0,Math.min(12,c))),dy:u(Math.max(0,Math.min(8,s)))}}function Xa(n,t,i){const h=n*i.w,a=t*i.h;return{x:(n-h)/2,y:(t-a)/2,w:h,h:a}}const kh=(n,t,i=0)=>n.x<t.x+t.w+i&&t.x<n.x+n.w+i&&n.y<t.y+t.h+i&&t.y<n.y+n.h+i,ar=(n,t,i,h)=>n.x>=h.l-.5&&n.y>=h.t-.5&&n.x+n.w<=t-h.r+.5&&n.y+n.h<=i-h.b+.5;function er(n,t,i,h,a,g={}){const l=[],c=Xa(t,i,a),s=Object.entries(n);for(const[u,p]of s){ar(p,t,i,h)||l.push(`${u}: ra ngoài màn`),kh(p,c)&&l.push(`${u}: vào vùng giữa màn`);for(const[d,M]of Object.entries(g))M.w&&kh(p,M)&&l.push(`${u} chồng ${d}`)}for(let u=0;u<s.length;u++)for(let p=u+1;p<s.length;p++)kh(s[u][1],s[p][1])&&l.push(`${s[u][0]} chồng ${s[p][0]}`);return l}const Ya=n=>document.querySelector(`[data-btn="${n}"]`);let Hi=null;function Fa(){Hi||(Hi=document.createElement("div"),Hi.style.cssText="position:fixed;visibility:hidden;pointer-events:none;left:0;top:0;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)",document.body.append(Hi));const n=getComputedStyle(Hi),t=i=>parseFloat(i)||0;return{l:Math.max(10,t(n.paddingLeft)),r:Math.max(10,t(n.paddingRight)),t:Math.max(8,t(n.paddingTop)),b:Math.max(8,t(n.paddingBottom))}}const Qi=()=>({vw:innerWidth,vh:innerHeight});function Rh(n){const{vw:t,vh:i}=Qi();return ir(n,z.layout[n],t,i,Fa(),An.joystick.radius)}function rt(){for(const a of Xi){const g=Ya(a);if(!g)continue;const l=Rh(a);g.style.left="",g.style.top="",g.style.setProperty("--x",l.x+"px"),g.style.setProperty("--y",l.y+"px"),g.style.setProperty("--size",l.w+"px"),g.style.setProperty("--op",String(z.layout[a].opacity))}const{vw:n,vh:t}=Qi(),i=Xa(n,t,An.centerSafe),h=document.getElementById("centerZone");h&&(h.style.cssText=`left:${i.x}px;top:${i.y}px;width:${i.w}px;height:${i.h}px`)}let li=null,Pa=null,bc=!1;const di=()=>document.body.classList.contains("hud-editing");function Kh(n){li=n;for(const h of Xi)Ya(h)?.classList.toggle("is-selected",h===n);const t=D("lbScale"),i=D("lbOpacity");t.disabled=i.disabled=!n,n&&(t.value=String(z.layout[n].scale),i.value=String(z.layout[n].opacity))}function sa(n){const t=D("hudHint");t.textContent=n,t.classList.remove("is-on"),t.offsetWidth,t.classList.add("is-on")}function ua(){const{vw:n,vh:t}=Qi(),i={};for(const h of Xi)i[h]=Rh(h);return er(i,n,t,Fa(),An.centerSafe,cr()).length===0}function cr(){const n={};for(const t of["miniBtn","quickMenu","hudParty","hudSelf"]){const i=document.getElementById(t);if(!i)continue;const h=i.getBoundingClientRect();n[t]={x:h.x,y:h.y,w:h.width,h:h.height}}return n}function or(n=e.paused){di()||(Pa=JSON.stringify(z.layout),bc=n,e.paused=!0,e.overlay="layout",document.body.classList.add("hud-editing"),D("hud").hidden=!1,D("bInteract").hidden=!1,D("layoutBar").hidden=!1,Kh("atk"),rt(),D("lbDone").focus())}function Oe(n=!0){di()&&(!n&&Pa&&(z.layout=JSON.parse(Pa)),Si(),document.body.classList.remove("hud-editing"),D("layoutBar").hidden=!0,Kh(null),rt(),e.overlay=null,e.paused=bc,e.G||(D("hud").hidden=!0),Va?.(),Va=null)}let Va=null;function gr(n){Va=n}function rr(){const n=document.createElement("div");n.id="centerZone",n.className="hud-center-zone",n.setAttribute("aria-hidden","true"),n.innerHTML="<span>Vùng nhân vật: không đặt nút</span>",D("hud").append(n),addEventListener("resize",rt),screen.orientation?.addEventListener?.("change",()=>setTimeout(rt,60));for(const i of Xi){const h=Ya(i);if(!h)continue;let a=0,g=0,l=0,c=0,s="",u=null;h.addEventListener("pointerdown",d=>{if(!di())return;d.preventDefault(),d.stopPropagation(),Kh(i);const M=Rh(i);u=d.pointerId,a=d.clientX,g=d.clientY,l=M.x+M.w/2,c=M.y+M.h/2,s=JSON.stringify(z.layout[i]);try{h.setPointerCapture(d.pointerId)}catch{}h.classList.add("is-dragging")},!0),h.addEventListener("pointermove",d=>{if(!di()||u!==d.pointerId)return;const{vw:M,vh:f}=Qi();z.layout[i]=hr(z.layout[i],l+d.clientX-a,c+d.clientY-g,M,f,Fa()),rt();const{vw:N,vh:C}=Qi();h.classList.toggle("is-bad",kh(Rh(i),Xa(N,C,An.centerSafe))||!ua())});const p=d=>{u===d.pointerId&&(u=null,h.classList.remove("is-dragging","is-bad"),ua()||(z.layout[i]=JSON.parse(s),rt(),sa("Không đặt được ở đó: nút sẽ che nhân vật, chồng nút khác hoặc ra ngoài màn")))};h.addEventListener("pointerup",p),h.addEventListener("pointercancel",p),h.addEventListener("click",d=>{di()&&(d.preventDefault(),d.stopImmediatePropagation())},!0)}const t=(i,h)=>D(i).addEventListener("input",a=>{if(!li)return;const g=+a.target.value,l=z.layout[li][h];z.layout[li][h]=g,rt(),h==="scale"&&!ua()&&(z.layout[li][h]=l,a.target.value=String(l),rt(),sa("Nút to hơn sẽ chồng nút khác hoặc che nhân vật"))});t("lbScale","scale"),t("lbOpacity","opacity"),D("lbReset").addEventListener("click",()=>{eg(),Kh(li??"atk"),rt(),sa("Đã về bố cục mặc định")}),D("lbDone").addEventListener("click",()=>Oe(!0)),addEventListener("keydown",i=>{i.key==="Escape"&&di()&&(i.stopPropagation(),Oe(!0))},!0)}const Bi={up:"Đi lên",down:"Đi xuống",left:"Sang trái",right:"Sang phải",attack:"Đánh",skill:"Kỹ năng",burst:"Nộ",dash:"Lướt",jump:"Nhảy",interact:"Tương tác",p1:"Đổi người 1",p2:"Đổi người 2",p3:"Đổi người 3",p4:"Đổi người 4",map:"Bản đồ",pause:"Tạm dừng"},ln=(n,t={},i=[])=>{const h=document.createElement(n);for(const[a,g]of Object.entries(t))h.setAttribute(a,g);return h.append(...i),h};function wa(n,t,i,h){const a="st-"+Math.random().toString(36).slice(2,7),g=ln("select",{id:a,class:"tt-input"});for(const[l,c]of t){const s=ln("option",{value:l},[c]);l===i&&(s.selected=!0),g.append(s)}return g.addEventListener("change",()=>h(g.value)),ln("div",{class:"tt-field"},[ln("label",{for:a},[n]),g])}function fi(n,t,i,h={}){const a=Ao(n,Math.round(t*100),{min:h.min??0,max:h.max??100,step:h.step??5,unit:h.unit??"%"});return a.querySelector("input").addEventListener("input",g=>i(+g.target.value/100)),a}const xh=(n,t,i)=>Ro(n,t,{onChange:i}),Yn=()=>{Si(),rc()};function lr(){return ln("div",{class:"st-grid"},[fi("Âm lượng tổng",z.master,n=>(z.master=n,Yn(),Th())),fi("Nhạc",z.music,n=>(z.music=n,Yn(),Th())),fi("Hiệu ứng âm thanh",z.sfx,n=>(z.sfx=n,Yn(),Th())),wa("Chất lượng hình",[["high","Cao (nét nhất)"],["medium","Vừa"],["low","Thấp (mượt hơn trên máy yếu)"]],z.quality,n=>(z.quality=n,Yn(),Ma())),fi("Cỡ chữ",z.fontScale,n=>(z.fontScale=n,Yn()),{min:80,max:140,step:10}),wa("Chế độ màu cho người mù màu",[["none","Tắt"],["protan","Khó thấy màu đỏ"],["deutan","Khó thấy màu lục"],["tritan","Khó thấy màu lam"]],z.colorMode,n=>(z.colorMode=n,Yn())),xh("Rung màn hình khi đánh",z.shake,n=>(z.shake=n,Yn())),xh("Rung máy khi trúng đòn (điện thoại)",z.vibrate,n=>(z.vibrate=n,Yn())),xh("Hiện gợi ý HUD lần đầu",z.showHints,n=>(z.showHints=n,Yn()))])}function sr(n){const t=z.joystick;return ln("div",{class:"st-grid"},[wa("Cần điều khiển (cảm ứng)",[["dynamic","Động: hiện ở chỗ đặt ngón"],["fixed","Cố định: đứng yên ở góc trái"]],t.mode,i=>(t.mode=i,Yn())),fi("Vùng chết của cần",t.deadzone,i=>(t.deadzone=i,Yn()),{min:0,max:50}),fi("Độ nhạy của cần",t.sensitivity,i=>(t.sensitivity=i,Yn()),{min:50,max:200,step:10}),xh("Ngắm bằng chuột (máy tính)",z.mouseAim,i=>(z.mouseAim=i,Yn())),ln("div",{class:"st-row"},[en("Chỉnh bố cục nút",{variant:"primary",icon:"bang-dieu-khien",onClick:()=>{n();const i=document.getElementById("modal"),h=!!i&&!i.hidden;i&&(i.hidden=!0),gr(()=>{i&&h&&(i.hidden=!1),Yh("controls")}),or(Tc)}})]),ln("p",{class:"st-note"},["Chỉnh bố cục: kéo nút tới chỗ mới, chọn nút rồi đổi cỡ và độ trong suốt. Nút không được che vùng giữa quanh nhân vật."])])}function ur(){const n=ln("div",{class:"st-keys"}),t=()=>{n.innerHTML="";const i=gg();i.length&&n.append(ln("p",{class:"st-warn",role:"alert"},[`Chưa có phím: ${i.map(g=>Bi[g]).join(", ")}`]));const h=ln("table",{class:"st-table"});h.append(ln("thead",{},[ln("tr",{},[ln("th",{scope:"col"},["Thao tác"]),ln("th",{scope:"col"},["Phím chính"]),ln("th",{scope:"col"},["Phím phụ"]),ln("th",{scope:"col"},["Tay cầm"])])]));const a=ln("tbody");for(const g of Kt){const l=ln("tr",{},[ln("th",{scope:"row"},[Bi[g]])]);for(const c of[0,1]){const s=z.keys[g][c],u=ln("button",{type:"button",class:"tt-btn tt-btn--secondary st-key","data-action":g,"data-slot":String(c)},[s?qi(s):"Trống"]);u.setAttribute("aria-label",`${Bi[g]}, phím ${c?"phụ":"chính"}: ${s?qi(s):"trống"}. Bấm để đổi`),u.addEventListener("click",()=>{u.textContent="Bấm phím mới…",u.classList.add("is-wait"),Ic(p=>{if(p!=="Escape"){const d=og(g,c,p);Si(),d&&Tt(`${qi(p)} đã chuyển từ "${Bi[d]}" sang "${Bi[g]}"`,"warn")}t(),n.querySelector(`[data-action="${g}"][data-slot="${c}"]`)?.focus()})}),l.append(ln("td",{},[u]))}l.append(ln("td",{class:"st-pad"},[sc(g,yt.connected?yt.brand:"xbox")||"·"])),a.append(l)}h.append(a),n.append(h,ln("div",{class:"st-row"},[en("Về phím mặc định",{variant:"ghost",onClick:()=>{cg(),t()}})]),ln("p",{class:"st-note"},["Bấm ô phím rồi bấm phím mới; Esc để hủy. Phím đang dùng cho thao tác khác sẽ được đổi chỗ, không bao giờ trùng."]))};return t(),n}let ma=null,Tc=!1;function Yh(n="general"){if(ma)return;const t=e.paused,i=e.overlay;Tc=t,e.paused=!0,e.overlay="settings";const h=ln("div",{class:"st-panels"});let a=()=>{};const l=ii([{id:"general",label:"Chung",icon:"cai-dat"},{id:"controls",label:"Điều khiển",icon:"bang-dieu-khien"},{id:"keys",label:"Phím",icon:"huong-dan"}],n,d=>{h.innerHTML="",h.append(d==="controls"?sr(()=>a()):d==="keys"?ur():lr())}),c=ln("div",{class:"st-body",id:"settingsBody"},[l,h]),s=en("Xong",{variant:"primary"});s.dataset.back="",a=Eo({title:"Cài đặt",body:c,actions:[s]});const u=c.closest(".tt-scrim");u.classList.add("st-scrim"),u.id="settingsDlg",ma=a;const p=new MutationObserver(()=>{u.isConnected||(p.disconnect(),ma=null,Ic(null),e.overlay==="settings"&&(e.overlay=i==="settings"?null:i,e.paused=t))});p.observe(document.body,{childList:!0})}function kc(){return E.ensureDaily(),E.P.daily.tasks.filter(n=>n.prog>=n.goal&&!n.claimed).length}function mr(n){if(n==="settings")return Yh();Mt(n)}ht("main",{title:"Menu",icon:"menu",render(n){n.classList.add("tt-menu-main");const t=E.P,i=v("div",{class:"tt-main-party"},t.party.map(c=>v("span",{class:"tt-chip"},[Qn[c]?.name??c]))),h=en("Tiếp tục khám phá",{variant:"primary",icon:"choi",size:"lg",onClick:()=>Dt()});h.id="menuResume",h.autofocus=!0;const a=v("aside",{class:"tt-main-side"},[v("p",{class:"tt-eyebrow"},["Đảo Lạc · Vọng Tinh Giới"]),v("h3",{class:"tt-h2"},[e.G?.mode==="world"?"Đang tạm dừng":"Menu"]),v("p",{class:"tt-dim"},["Đội đang dùng"]),i,h,en("Hướng dẫn",{variant:"ghost",icon:"huong-dan",onClick:()=>Mt("help")}),dr()]),g=new Map;for(const c of pn.main){let s=g.get(c.group);s||(s=v("div",{class:"tt-main-items"}),g.set(c.group,s));const u=v("button",{type:"button",class:"tt-main-item","data-item":c.id},[Tn(c.icon,{size:30}),v("span",{class:"nm"},[c.name]),v("small",{},[c.hint])]);c.id==="daily"&&tc(u,kc()||void 0),u.addEventListener("click",()=>mr(c.id)),s.append(u)}const l=v("div",{class:"tt-main-grid"},[...g].map(([c,s])=>v("section",{},[v("h4",{class:"tt-h4"},[c]),s])));n.append(a,l)}});function dr(){const n=()=>"Âm thanh: "+(e.soundOn?"bật":"tắt"),t=en(n(),{variant:"ghost",icon:"am-thanh",onClick:()=>{e.soundOn=!e.soundOn,e.soundOn&&(Zg(),Mn("coin")),t.querySelector(".tt-btn-label").textContent=n(),t.setAttribute("aria-pressed",String(e.soundOn))}});return t.id="soundBtn",t.setAttribute("aria-pressed",String(e.soundOn)),t}function fr(n,t=E.P,i=e.G){const h=n.count??1;switch(n.kind){case"objective":{const a=yh.world.find(s=>s.id===n.id);if(!a)return{n:0,max:h};const g=a.done.count==="all"?i?.map?.chests.length??26:a.done.count,l=a.done.kind,c=l==="chests"?t.chests.length:l==="statue"?i?.statueUsed||t.chests.length||Object.keys(t.tower??{}).length?1:0:l==="tower"?Object.keys(t.tower??{}).length:Object.values(t.boss??{}).some(Boolean)?1:0;return{n:Math.min(c,g),max:g}}case"kills":return{n:Math.min(t.stats.kills,h),max:h};case"reacts":return{n:Math.min(t.stats.reacts,h),max:h};case"chests":return{n:Math.min(t.chests.length,h),max:h};case"tower":return{n:Math.min(Object.keys(t.tower??{}).length,h),max:h};case"boss":return{n:Object.values(t.boss??{}).filter(Boolean).length>=h?h:0,max:h};case"pulls":return{n:Math.min(t.history.length,h),max:h};case"owned":return{n:Math.min(Object.keys(t.owned).length,h),max:h};case"codex":{const a=n.id?n.id+":":"";return{n:Math.min(t.codex.filter(g=>g.startsWith(a)).length,h),max:h}}}}function Ua(n,t=E.P,i=e.G){const h=n.steps.map(g=>({...g,...fr(g,t,i)})),a=h.findIndex(g=>g.n<g.max);return{steps:h,cur:a,done:a<0||t.quests.done.includes(n.id)}}const xc=n=>n.text.replace("{n}",String(n.n)).replace("{max}",String(n.max));function Lc(){const n=E.P.quests?.tracked,t=n&&qa.find(a=>a.id===n);if(!t)return null;const i=Ua(t);if(i.done)return null;const h=i.steps[i.cur];return{text:`${t.name}: ${xc(h)}`,target:h.target??null}}function yr(){const n=E.P;for(const t of qa)!n.quests.done.includes(t.id)&&Ua(t).cur<0&&E.req("completeQuest",{id:t.id})}const Mc=[["bAtk","attack"],["bSkill","skill"],["bBurst","burst"],["bJump","jump"],["bDash","dash"],["bInteract","interact"]];function Lh(n){if(document.documentElement.dataset.input==="pad"&&yt.connected)return sc(n,yt.brand);const t=rg(n);return t?qi(t):""}function Mh(n=!0){for(const[t,i]of Mc){const h=D(t);let a=h.querySelector(".key");a||(a=document.createElement("span"),a.className="key",a.setAttribute("aria-hidden","true"),h.append(a)),a.textContent=Lh(i);const g=h.dataset.label??h.getAttribute("aria-label")??"";h.dataset.label=g,h.title=a.textContent?`${g} (${a.textContent})`:g}D("pauseBtn").title=`Tạm dừng (${Lh("pause")})`,D("qmMap").title=`Bản đồ (${Lh("map")})`,n&&e.G&&Ot()}function pr(){const n=D("quickMenu"),t=D("qmMap");for(const i of[...pn.quick,"main"]){const h=pn.main.find(l=>l.id===i),a=h?.name??"Menu",g=document.createElement("button");g.type="button",g.className="hud-qb",g.id="qm-"+i,g.setAttribute("aria-label",a),g.title=a,g.insertAdjacentHTML("afterbegin",xi(h?.icon??"menu",{size:22})),g.addEventListener("click",()=>Mt(i)),n.insertBefore(g,i==="main"?null:t)}Sc()}function Sc(){const n=document.getElementById("qm-daily");if(!n||!E.P)return;const t=kc();t?tc(n,t):n.querySelector(":scope > .tt-dot")?.remove()}let qe=!1;function vr(){if(qe)return;qe=!0;for(const i of document.querySelectorAll(".hud-qb[data-icon]"))i.insertAdjacentHTML("afterbegin",xi(i.dataset.icon,{size:22}));for(const[i]of Mc){const h=D(i);h.prepend(Tn(h.dataset.kind)),h.insertAdjacentHTML("beforeend",'<span class="cd" aria-hidden="true"></span>')}D("bInteract").insertAdjacentHTML("beforeend",'<span class="hud-int-l" aria-hidden="true"></span>');const n=()=>Fi()&&jh()==="map"?Dt():Mt("map");D("qmMap").addEventListener("click",n),D("miniBtn").addEventListener("click",n),D("qmSettings").addEventListener("click",()=>Yh()),Jr(n),pr();const t=document.createElement("div");t.id="edgeArrows",t.className="hud-edge",t.setAttribute("aria-hidden","true"),D("hud").append(t),Mh(),rt(),ag(()=>{Mh(),rt()}),new MutationObserver(()=>Mh()).observe(document.documentElement,{attributes:!0,attributeFilter:["data-input"]})}function Ot(){const n=D("hudParty");n.innerHTML="",e.G.party.forEach((t,i)=>{const h=Lh(`p${i+1}`)||String(i+1),a=Ko({name:t.c.name,rarity:t.c.r,el:t.c.el,elName:K[t.c.el].vi,hp:t.hp/t.maxHp,key:h,art:Mi(t.id,84,84,"head"),active:i===e.G.act,down:!t.alive});a.classList.add("hud-slot"),a.dataset.i=String(i),a.setAttribute("aria-label",`${t.c.name}${i===e.G.act?", đang điều khiển":""}${t.alive?"":", đã gục"}. Phím ${h}`),a.insertAdjacentHTML("beforeend",'<span class="hud-en" aria-hidden="true"></span><span class="hud-sw" aria-hidden="true"></span>'),t.alive||a.querySelector(".tt-portrait")?.insertAdjacentHTML("beforeend",xi("guc",{size:18,cls:"hud-down"})),a.addEventListener("click",()=>_c(i)),n.append(a)}),e.hudCache={}}function br(){const n=e.G;if(n.mode==="tower")return{text:yh.tower.replace("{floor}",String(n.tower.floor)),target:null};if(n.mode==="boss")return{text:yh.boss,target:null};const t=Lc();if(t)return t;const i=E.P;for(const h of yh.world){let a=0,g=typeof h.done.count=="number"?h.done.count:0;if(h.done.kind==="chests"?(a=i.chests.length,h.done.count==="all"&&(g=n.map?.chests.length??0)):h.done.kind==="statue"?a=n.statueUsed?1:0:h.done.kind==="tower"?a=Object.keys(i.tower??{}).length:h.done.kind==="boss"&&(a=Object.values(i.boss??{}).some(Boolean)?1:0),a<g)return{text:h.text.replace("{n}",String(a)).replace("{max}",String(g)),target:h.target}}return{text:"Đảo Lạc đã được khám phá. Hãy thử thách Tháp Tinh Tú ở tầng cao hơn",target:"tower"}}function Tr(n,t,i){const h=t>0;n.classList.toggle("is-cooldown",h),n.style.setProperty("--cd",String(t));const a=n.querySelector(".cd"),g=h?String(Math.ceil(i)):"";a.textContent!==g&&(a.textContent=g)}function kr(n,t){const i=[];return n.shield>0&&i.push(["khien",`Khiên ${Rn(n.shield)}`,`${Math.ceil(n.shieldT)}s`]),e.G.healAura&&i.push(["bia-da","Đang hồi phục gần Bia Đá",""]),n.iframes>0&&n.dashT>0&&i.push(["luot","Đang lướt né, miễn sát thương",""]),t&&t.energy>=t.c.burst.cost&&i.push(["no","Nộ đã đầy",""]),n.stamina<20&&i.push(["the-luc","Thể lực thấp, chưa lướt được",""]),i}function xr(){const n=document.getElementById("edgeArrows");if(!n)return;const t=e.G,i=e.VW/2/e.ZOOM,h=e.VH/2/e.ZOOM,a=t.enemies.filter(l=>!l.dead&&l.tele);t.boss&&t.boss.hp>0&&t.boss.state&&t.boss.state!=="idle"&&a.push(t.boss);const g=[];for(const l of a){const c=l.x-t.cam.x,s=l.y-t.cam.y;if(Math.abs(c)<i-10&&Math.abs(s)<h-10)continue;const u=Math.atan2(s,c),p=26,d=Math.min((e.VW/2-p)/Math.abs(Math.cos(u)||1e-6),(e.VH/2-p)/Math.abs(Math.sin(u)||1e-6));if(g.push({x:e.VW/2+Math.cos(u)*d,y:e.VH/2+Math.sin(u)*d,a:u}),g.length>=6)break}for(;n.children.length<g.length;)n.insertAdjacentHTML("beforeend","<i></i>");[...n.children].forEach((l,c)=>{const s=g[c],u=l.style;if(!s){u.display="none";return}u.display="",u.transform=`translate(${s.x}px, ${s.y}px) rotate(${s.a}rad)`})}function Lr(){if(!e.G)return;const n=Dn(),t=e.G.p,i=e.hudCache,h=D("hudParty").children;if(e.G.party.forEach((d,M)=>{const f=h[M];if(!f)return;if(!!f.classList.contains("is-down")===d.alive)return Ot();f.querySelector(".tt-progress")?.style.setProperty("--v",String(d.hp/d.maxHp));const C=Math.min(1,d.energy/d.c.burst.cost);f.style.setProperty("--en",String(C)),f.classList.toggle("is-ready",C>=1),f.style.setProperty("--sw",String(M===e.G.act?0:Math.max(0,e.G.switchCd/.8)))}),n){if(i.nm!==n.id+n.st.lv){D("actName").textContent=n.c.name,D("actLv").textContent=`Cấp ${n.st.lv}`,i.nm=n.id+n.st.lv;const C=D("bSkill");C.querySelector(".tt-icon")?.replaceWith(Tn(n.c.skill.icon??"ky-nang")),C.dataset.label=`Kỹ năng: ${n.c.skill.name}`,C.setAttribute("aria-label",C.dataset.label);const P=D("bBurst");P.dataset.label=`Nộ: ${n.c.burst.name}`,P.setAttribute("aria-label",P.dataset.label),P.style.setProperty("--el",K[n.c.el].c),C.style.setProperty("--ac",K[n.c.el].c),Mh(!1)}const d=n.hp/n.maxHp;D("actHp").style.width=d*100+"%",D("actSh").style.width=(t.shield>0?Math.min(100,t.shield/n.maxHp*100):0)+"%",D("actHpMeter").setAttribute("aria-valuenow",String(Math.round(d*100))),D("hudSelf").classList.toggle("is-low",d<.3),D("lowHp").classList.toggle("is-on",d<.3&&n.alive);const M=`${Rn(n.hp)} / ${Rn(n.maxHp)}${t.shield>0?` · Khiên ${Rn(t.shield)}`:""}`;i.hpT!==M&&(D("actHpTxt").textContent=i.hpT=M),Tr(D("bSkill"),n.skillCd>0?n.skillCd/n.c.skill.cd:0,n.skillCd);const f=D("bBurst"),N=Math.min(1,n.energy/n.c.burst.cost);f.style.setProperty("--en",String(N)),f.classList.toggle("is-ready",N>=1),D("bDash").classList.toggle("is-disabled",t.air&&t.airDash||t.stamina<20)}const a=D("stamRing"),g=t.stamina<99.5;a.hidden=!g,g&&(D("stamArc").style.strokeDasharray=`${t.stamina} 100`,a.classList.toggle("is-low",t.stamina<20),a.style.transform=`translate(${e.VW/2+(t.x-e.G.cam.x)*e.ZOOM+26}px, ${e.VH/2+(t.y-e.G.cam.y-(t.zh??0)*22)*e.ZOOM-46}px)`);const l=kr(t,n),c=l.map(d=>d[0]+d[2]).join();i.st!==c&&(i.st=c,D("hudStatus").innerHTML=l.map(([d,M,f])=>`<span class="hud-st" role="listitem" title="${M}" aria-label="${M}">${xi(d,{size:16})}${f?`<b>${f}</b>`:""}</span>`).join(""));const s=br();i.ob!==s.text&&(i.ob=s.text,D("objective").innerHTML=`${xi("nhiem-vu",{size:16})}<span>${s.text}</span>`),e.G.objTarget=s.target;let u="";if(e.G.mode==="tower"){const d=e.G.tower;u=`Đợt ${Math.max(1,d.wave)}/${d.waves.length} · ${Math.max(0,Math.ceil(d.timeLeft))} giây`}if(e.G.mode==="boss"){u=`Hang Hắc Giao · Cấp độ ${e.G.opt.lv}`;const d=`Hắc Giao · Cấp độ ${e.G.boss.lv} · Giai đoạn ${e.G.boss.phase===2?"2: nổi giận":"1"}`;i.boss!==d&&(D("bossName").textContent=i.boss=d),D("bossHp").style.width=Math.max(0,e.G.boss.hp/e.G.boss.maxHp*100)+"%"}i.info!==u&&(D("modeInfo").textContent=i.info=u);const p=D("bInteract");if(e.G.interact&&!e.G.over){const d=e.G.interact.label;i.int!==d&&(i.int=d,p.querySelector(".hud-int-l").textContent=d,p.setAttribute("aria-label",`Tương tác: ${d}`),p.dataset.label=`Tương tác: ${d}`),p.hidden=!1}else p.hidden=!0;xr(),Cg()}function Nc(){return E.P.party.filter(n=>E.P.owned[n]).map(n=>{const t=zi(n);return{id:n,c:Qn[n],st:t,hp:t.hp,maxHp:t.hp,energy:20,skillCd:0,alive:!0}})}function Za(n,t={}){return jg(),{mode:n,opt:t,time:0,party:Nc(),act:0,switchCd:0,p:{x:0,y:0,fx:1,back:!1,dirX:1,dirY:0,ang:0,walk:0,moving:!1,atkCd:0,atkAnim:0,combo:0,comboT:0,dashT:0,dvx:0,dvy:0,iframes:0,stamina:100,shield:0,shieldT:0,shieldMax:1,hurt:0,dashHeld:0,zh:0,air:!1,vz:0,jvx:0,jvy:0,peak:0,airDash:!1,plunge:!1,long:!1,land:0,safe:null},enemies:[],projs:[],waves:[],fx:[],texts:[],fields:[],turrets:[],pickups:[],later:[],boss:null,cam:{x:0,y:0},shake:0,map:null,bounds:null,cine:null,banner:{t:0,txt:""},pending:{kill:0,react:0,burst:0},loot:{coin:0,books:0},over:!1,interact:null,respawn:null}}function Dn(){return e.G.party[e.G.act]}function _c(n){!e.G||e.G.over||n===e.G.act||!e.G.party[n]||!e.G.party[n].alive||e.G.switchCd>0||(e.G.act=n,e.G.switchCd=.8,dn(e.G.p.x,e.G.p.y-14,40,K[Dn().c.el].c,.35,5),Ln(e.G.p.x,e.G.p.y-14,K[Dn().c.el].c,12,150),Ot())}function Cc(n,t,i){if(!t)return;const h=X.telegraph;if(!h.sound)return;const a=nn(n.x,n.y,e.G.p.x,e.G.p.y)<h.warnRange;t.w1||(t.w1=!0,a&&Mn(n.isBoss?"warnBoss":"warn")),!t.w2&&i>=h.flashAt&&(t.w2=!0,a&&Mn("warn2"))}const Ja=.2;function ne(n,t,i){const h=Math.floor(n/A),a=Math.floor(t/A);return h<0||a<0||h>=Z||a>=mn?-1:a*Z+h}function ti(n,t,i=e.G?.map){if(!i||!i.h)return 0;const h=ne(n,t);return h<0?0:i.h[h]}function Gc(n,t,i=e.G?.map){if(!i)return!0;const h=ne(n,t);return h>=0&&!mc[i.m[h]]&&i.m[h]!==j.TREE}function Qt(n,t,i,h,a){const g=ne(n,t);if(g<0)return!0;const l=i.m[g];return i.h?l===j.TREE?!0:mc[l]?!a:i.h[g]>h+Ja:Sa[l]}function Mr(n,t,i){return Qt(n,t,i,0,!1)}function Hc(n,t,i,h,a=0,g=!1){return Qt(n-i,t,h,a,g)||Qt(n+i,t,h,a,g)||Qt(n,t-i*.6,h,a,g)||Qt(n,t+i*.4,h,a,g)||Qt(n-i*.7,t-i*.4,h,a,g)||Qt(n+i*.7,t-i*.4,h,a,g)}function Bc(n,t,i,h=0,a=!1){if(e.G.map)return Hc(n,t,i,e.G.map,h,a);const g=e.G.bounds;return n-i<g.x+20||n+i>g.x+g.w-20||t-i<g.y+60||t>g.y+g.h-20}function Fn(n,t,i,h){const a=typeof n.zh=="number",g=a?n.zh:ti(n.x,n.y),l=a?!!n.air:!1,c=a?1/0:g,s=(u,p)=>!Bc(u,p,h,g,l)&&(a||ti(u,p)>=c-Ja);s(n.x+t,n.y)&&(n.x+=t),s(n.x,n.y+i)&&(n.y+=i)}const Jt=155;function Pc(n=X.jump.dur,t=X.jump.height){return{v0:4*t/n,g:8*t/(n*n)}}function Sr(n){const t=X.jump.plunge;return t.base+t.perLevel*Math.max(0,n)}function Nr(n,t,i=1/0){const h=X.jump.fall,a=Math.floor(n+.05)-h.safeLevels;return a<=0?0:Math.max(0,Math.min(Math.round(t*h.dmgPerLevel*a),i-1))}const Vc=n=>Math.max(0,(n.zh??0)-ti(n.x,n.y)),wc=n=>!!n.air&&Vc(n)>X.jump.dodgeHeight;function _r(){const n=e.G;if(!n)return!1;const t=n.p,i=Dn();if(!i||!i.alive||n.over||n.cine||t.air)return!1;const h=X.jump;if(t.stamina<h.stamina)return!1;t.stamina-=h.stamina;const{v0:a}=Pc(),g=t.dashT>0;let l=0,c=0;if(g){const s=Math.hypot(t.dvx,t.dvy)||1,u=Jt*h.longJump;l=t.dvx/s*u,c=t.dvy/s*u,t.dashT=0,t.dashHit=null}else t.moving&&(l=t.dirX*Jt,c=t.dirY*Jt);return Object.assign(t,{air:!0,vz:a,jvx:l,jvy:c,peak:t.zh,airDash:!1,plunge:!1,long:g}),Ln(t.x,t.y,"#ffffff",6,60,2),Mn("dash"),!0}function Cr(n){return n.air&&!n.airDash&&!n.plunge&&n.stamina>=X.jump.airDashStamina}function Gr(){const n=e.G.p;return!n.air||n.plunge||n.vz>0&&Vc(n)<1?!1:(n.plunge=!0,n.plungeFrom=n.peak,n.vz=-X.jump.plunge.speed,n.jvx*=.2,n.jvy*=.2,n.dashT=0,!0)}function Hr(n,t,i,h){const a=X.jump,{g}=Pc();if(n.dashT>0)n.dashT-=t,Fn(n,n.dvx*t,n.dvy*t,9),n.vz=0;else{if(!n.plunge){const c=Math.min(1,a.airControl*4*t);n.jvx+=(i*Jt-n.jvx)*c*(n.long&&!i?0:1),n.jvy+=(h*Jt-n.jvy)*c*(n.long&&!h?0:1)}Fn(n,n.jvx*t,n.jvy*t,9),n.plunge?n.vz=-a.plunge.speed:n.vz-=g*t}Math.abs(i)>.2&&(n.fx=i>0?1:-1),n.zh+=n.vz*t,n.peak=Math.max(n.peak,n.zh);const l=ti(n.x,n.y);n.zh<=l&&Pr(n,l)}function Br(n){const t=ti(n.x,n.y);n.zh>t+Ja?(Object.assign(n,{air:!0,vz:0,jvx:n.dirX*(n.moving?Jt:0),jvy:0,peak:n.zh}),n.jvy=n.dirY*(n.moving?Jt:0),n.airDash=!1,n.plunge=!1,n.long=!1):(n.zh=t,Gc(n.x,n.y)&&(n.safe={x:n.x,y:n.y,zh:t}))}function Pr(n,t){const i=n.peak-t,h=n.plunge;if(n.air=!1,n.vz=0,n.zh=t,n.plunge=!1,n.airDash=!1,n.long=!1,!Gc(n.x,n.y)){Ln(n.x,n.y,"#9fd4ff",10,120,2),n.safe&&(n.x=n.safe.x,n.y=n.safe.y,n.zh=n.safe.zh);return}if(h){const l=Dn(),c=X.jump.plunge,s=Sr((n.plungeFrom??n.peak)-t);let u=!1;for(const p of e.G.enemies)p.dead||nn(n.x,n.y,p.x,p.y)>c.radius+p.r||(lt(p,l,s,l.c.el,{kb:160}),u=!0);dn(n.x,n.y,c.radius,K[l.c.el].c,.35,6),Ln(n.x,n.y,K[l.c.el].c,14,170),In("heavy",1+i*.3),u&&Li("heavy"),n.land=X.jump.fall.landAnim;return}i>=.8&&(n.land=X.jump.fall.landAnim,Ln(n.x,n.y,"#d8cfc0",6,70,2));const a=Dn();if(!a||e.G.over)return;const g=Nr(i,a.maxHp,a.hp);g>0&&(a.hp-=g,n.hurt=.25,Kn(n.x,n.y-48,"-"+g,"#ff9a7a",15),In("hurt",.6),lc("hurt"))}function Ec(n,t,i,h,a,g,l=260){var c;((c=e.G).waves??(c.waves=[])).push({x:n,y:t,r:i,max:h,spd:l,dmg:a,el:g,hit:!1})}function Vr(n){const t=e.G.waves;if(!t)return;const i=e.G.p;for(let h=t.length-1;h>=0;h--){const a=t[h];a.r+=a.spd*n;const g=nn(i.x,i.y,a.x,a.y);!a.hit&&Math.abs(g-a.r)<16&&(a.hit=!0,wc(i)?Kn(i.x,i.y-52,"Né","#e8f0ff",13):Rt(a.dmg,K[a.el]?.c??"#ff7070")),a.r>=a.max&&t.splice(h,1)}}function Dh(n,t,i,h,a){const g=zh[n],l=1+.5*(h-1),c=1+.28*(h-1);return{type:n,x:t,y:i,hx:t,hy:i,lv:h,el:a||Yi(Do.filter(s=>s!=="earth"&&s!=="wind").concat(["water","fire"])),hp:g.hp*l,maxHp:g.hp*l,atk:g.atk*c,r:g.r,spd:g.spd,aura:null,auraT:0,frozen:0,ec:null,vuln:0,state:"idle",cd:F(.5,1.5),tele:null,flash:0,swing:0,hop:0,kx:0,ky:0,fx:1,walk:0,wx:t,wy:i,wt:0,seed:Math.random()*10,dead:!1,hurtT:0}}function wr(n,t){const i=e.G.p,h=zh[n.type];if(n.flash-=t,n.swing=Math.max(0,n.swing-t*4),n.auraT>0&&(n.auraT-=t,n.auraT<=0&&(n.aura=null)),n.vuln>0&&(n.vuln-=t),n.hitT>0&&(n.hitT-=t),Ac(n,t),n.ec&&(n.ec.t-=t,n.ec.t<=0&&(n.ec.t=.5,n.ec.n--,wh(n.x,n.y-10,K.bolt.c),qh(n,n.ec.dmg,K.bolt.c2),n.ec&&n.ec.n<=0&&(n.ec=null))),n.dead)return;if((n.kx||n.ky)&&(Fn(n,n.kx*t,n.ky*t,n.r*.6),n.kx*=Math.pow(.002,t),n.ky*=Math.pow(.002,t),Math.abs(n.kx)<3&&(n.kx=0),Math.abs(n.ky)<3&&(n.ky=0)),n.frozen>0){n.frozen-=t,n.tele=null;return}if(n.stun>0){n.tele=null,n.hop=0;return}const a=nn(n.x,n.y,i.x,i.y),g=Dn()&&Dn().alive&&!e.G.over;if(n.cd-=t,n.tele){const s=n.tele;if(s.t+=t,Cc(n,s,s.t/s.dur),n.type==="slime"&&s.kind==="hop"){n.hop=s.t/s.dur;const u=t/s.dur;n.x+=s.dx*u,n.y+=s.dy*u,Bc(n.x,n.y,n.r*.6)&&(n.x-=s.dx*u,n.y-=s.dy*u)}s.t>=s.dur&&(Ar(n,s),n.tele=null,n.hop=0,n.cd=h.cd*F(.8,1.2));return}if(e.G.mode==="world"&&nn(n.x,n.y,n.hx,n.hy)>520&&(n.state="return"),n.state==="return"){const s=Math.atan2(n.hy-n.y,n.hx-n.x);Fn(n,Math.cos(s)*n.spd*1.6*t,Math.sin(s)*n.spd*1.6*t,n.r*.6),n.walk+=t*8,n.fx=Math.cos(s)>0?1:-1,n.hp=Math.min(n.maxHp,n.hp+n.maxHp*t*.5),nn(n.x,n.y,n.hx,n.hy)<20&&(n.state="idle");return}if(n.state==="idle"){if(n.wt-=t,n.wt<=0&&(n.wt=F(1.5,3.5),n.wx=n.hx+F(-60,60),n.wy=n.hy+F(-60,60)),nn(n.x,n.y,n.wx,n.wy)>6){const u=Math.atan2(n.wy-n.y,n.wx-n.x);Fn(n,Math.cos(u)*n.spd*.4*t,Math.sin(u)*n.spd*.4*t,n.r*.6),n.walk+=t*5,n.fx=Math.cos(u)>0?1:-1}g&&a<h.aggro&&(n.state="chase");return}if(!g)return;n.fx=i.x>n.x?1:-1;const l=Math.atan2(i.y-n.y,i.x-n.x),c=n.type==="archer"?220:n.type==="shaman"?200:n.type==="golem"?70:n.type==="slime"?110:40;if(n.type==="archer"||n.type==="shaman")a>c+50?(Fn(n,Math.cos(l)*n.spd*t,Math.sin(l)*n.spd*t,n.r*.6),n.walk+=t*8):a<c-60&&(Fn(n,-Math.cos(l)*n.spd*.8*t,-Math.sin(l)*n.spd*.8*t,n.r*.6),n.walk+=t*8),n.cd<=0&&a<c+140&&(n.type==="archer"?n.tele={kind:"proj",t:0,dur:.55,ang:l}:n.tele={kind:"circle",x:i.x,y:i.y,r:62,t:0,dur:1.05,el:n.el});else if(a>c&&(Fn(n,Math.cos(l)*n.spd*t,Math.sin(l)*n.spd*t,n.r*.6),n.walk+=t*(n.type==="golem"?5:9)),n.cd<=0&&a<c+30)if(n.type==="slime"){const s=Math.min(a,130);n.tele={kind:"hop",t:0,dur:.6,dx:Math.cos(l)*s,dy:Math.sin(l)*s,tx:n.x+Math.cos(l)*s,ty:n.y+Math.sin(l)*s,r:34}}else n.type==="golem"?n.tele={kind:"circle",x:n.x,y:n.y,r:120,t:0,dur:1.1,el:"earth"}:n.tele={kind:"arc",x:n.x,y:n.y,r:62,ang:l,arc:1.1,t:0,dur:.55}}function Er(n,t,i){if(nn(i.x,i.y,n,t)>i.r+10)return!1;let a=Math.atan2(t-i.y,n-i.x)-i.ang;for(;a>Math.PI;)a-=B;for(;a<-Math.PI;)a+=B;return Math.abs(a)<i.arc}function Ar(n,t){const i=e.G.p;if(t.kind==="arc")n.swing=1,Er(i.x,i.y,t)&&Rt(n.atk),Wa(n.x,n.y-12,t.ang,t.r,"#ff9a9a","sword");else if(t.kind==="circle"){const h=n.type==="golem";nn(i.x,i.y,t.x,t.y)<t.r+6&&(h&&wc(i)?Kn(i.x,i.y-52,"Né","#e8f0ff",13):Rt(n.atk*(h?1.3:1),t.el?K[t.el].c:"#ff7070")),h&&Ec(t.x,t.y,t.r,t.r+90,n.atk*.6,"earth",240),dn(t.x,t.y,t.r,t.el?K[t.el].c:"#ff8080",.35,8),Ln(t.x,t.y,t.el?K[t.el].c:"#ff8080",14,160),n.type==="golem"&&In("golem")}else if(t.kind==="hop")nn(i.x,i.y,n.x,n.y)<t.r+6&&Rt(n.atk),dn(n.x,n.y,t.r,K[n.el].c,.3,5);else if(t.kind==="proj"){const h=Math.atan2(i.y-14-(n.y-14),i.x-n.x);e.G.projs.push({own:"e",x:n.x,y:n.y-14,vx:Math.cos(h)*360,vy:Math.sin(h)*360,r:5,life:1.4,dmg:n.atk,kind:"earrow"}),n.swing=1}}function Ac(n,t){if(n.maxPoise!==void 0){if(n.stun>0){n.stun-=t,n.stun<=0&&(n.stun=0,n.poise=n.maxPoise);return}n.poiseT=(n.poiseT||0)+t,n.poiseT>X.poise.regenDelay&&n.poise<n.maxPoise&&(n.poise=Math.min(n.maxPoise,n.poise+n.maxPoise*X.poise.regen*t))}}function Ea(n){e.G=Za("boss",{lv:n}),e.G.bounds={x:0,y:0,w:1300,h:960},e.G.p.x=650,e.G.p.y=820;const t=ft.hp*(1+ft.hpPerLv*(n-1)),i={x:650,y:300,hp:t,maxHp:t,atk:ft.atk*(1+ft.atkPerLv*(n-1)),lv:n,phase:1,el:ft.el,ang:Math.PI/2,state:"idle",t:1.5,flash:0,aura:null,auraT:0,frozen:0,vuln:0,ec:null,r:ft.r,segs:[],trail:[],tele:null,act:null,isBoss:!0,dead:!1,spd:ft.spd,type:"boss"};for(let h=0;h<14;h++)i.segs.push({x:650,y:300-h*18});for(let h=0;h<200;h++)i.trail.push({x:650,y:300-h*2});e.G.boss=i,e.G.enemies.push(i),ie(),St("Hắc Giao thức giấc")}function Aa(n){e.G=Za("tower",{floor:n}),e.G.bounds={x:0,y:0,w:1e3,h:760},e.G.p.x=500,e.G.p.y=620,e.G.tower={floor:n,wave:0,timeLeft:150,waves:Rr(n),gap:1.5},ie(),St(`Tầng ${n}`)}function Rr(n){const t=1+Math.round(n*.75),i=[];for(let h=0;h<2;h++){const a=[],g=3+Math.floor(n/2)+h;for(let l=0;l<g;l++){const c=Yi(n<3?["slime","goblin","slime"]:n<6?["slime","goblin","archer"]:["goblin","archer","shaman","slime"]);a.push(c)}n>=4&&h===1&&a.push("golem"),n>=10&&a.push("golem"),i.push({list:a,lv:t+h})}return i}function Kr(){const n=e.G.tower,t=n.waves[n.wave],i=e.G.bounds;t.list.forEach((h,a)=>{const g=a/t.list.length*Math.PI+Math.PI,l=i.w/2+Math.cos(g)*300+F(-30,30),c=300+Math.sin(g)*160+F(-20,20),s=Dh(h,En(l,60,i.w-60),En(c,80,i.h-200),t.lv,h==="golem"?"earth":null);s.state="chase",e.G.enemies.push(s),dn(s.x,s.y-10,40,"#ffffff",.4)}),St(`Đợt ${n.wave+1}/${n.waves.length}`)}function Dr(n){const t=e.G.tower;if(e.G.over)return;if(t.timeLeft-=n,t.timeLeft<=0){Oh(!1,"Hết thời gian");return}if(!e.G.enemies.some(h=>!h.dead)&&(t.gap-=n,t.gap<=0))if(t.wave<t.waves.length)Kr(),t.wave++,t.gap=1.5;else{const h=t.timeLeft>=90?3:t.timeLeft>=50?2:1;Oh(!0,"",h)}}function Or(){const n=e.G;n?.mode==="world"&&(_i(),e.worldPos={x:n.p.x,y:n.p.y,rx:n.respawn.x,ry:n.respawn.y})}function Rc(n){e.G&&e.G.mode!=="world"&&(_i(),e.G._ended||E.req("logQuit",{mode:e.G.mode,at:e.G.mode==="tower"?`tầng ${e.G.tower.floor}`:`cấp ${e.G.opt?.lv}`})),jt(),Dt(),he(),e.overlay=null,e.G?.mode!=="world"&&Xr(),te()}function te(){Wi(),Sc()}function Ra(){if(!(!e.G||e.G._ended)){if(_i(),e.G.mode==="world")return Mt("main");e.paused=!0,Dc('<h3>Tạm dừng</h3><p class="muted">Rời trận bây giờ sẽ không nhận được phần thưởng.</p><div class="row"><button class="btn gold" data-act="resume">Tiếp tục</button><button class="btn" data-act="settings">Cài đặt</button><button class="btn" data-act="menu">Về đảo</button></div>')}}function Kc(){jt(),e.paused=!1}function Dc(n){D("modalBox").innerHTML=n,D("modal").hidden=!1,e.paused=!0}function jt(){D("modal").hidden=!0}function qr(){D("modal").addEventListener("click",n=>{const t=n.target.closest("[data-act]");if(!t)return;const i=t.dataset.act;if(i==="settings")Yh();else if(i==="resume")Kc();else if(i==="menu")jt(),Rc();else if(i==="retry"){jt();const h=e.G;h.mode==="tower"?Aa(h.tower.floor):h.mode==="boss"&&Ea(h.opt.lv)}else i==="next"?(jt(),Aa(e.G.tower.floor+1)):i==="bnext"?(jt(),Ea(e.G.opt.lv+1)):i==="close"&&jt()})}const Ir=()=>innerHeight>innerWidth,Oc=()=>matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0&&!matchMedia("(hover: hover)").matches;let da=!1;function Sh(){const n=D("rotateOverlay"),t=Oc()&&Ir();t!==!n.hidden&&(n.hidden=!t,document.body.classList.toggle("is-portrait-block",t),t?e.paused||(e.paused=!0,da=!0):da&&(da=!1,!e.overlay&&D("modal").hidden&&(e.paused=!1)))}async function $r(){if(Oc()){try{!document.fullscreenElement&&document.documentElement.requestFullscreen&&await document.documentElement.requestFullscreen({navigationUI:"hide"})}catch{}try{await screen.orientation?.lock?.("landscape")}catch{}Sh()}}function zr(){addEventListener("resize",Sh),screen.orientation?.addEventListener?.("change",Sh),Sh()}const Ie="tinhtu-hints-v1",Wr=[["miniBtn","Bản đồ nhỏ: chạm để mở bản đồ lớn"],["objective","Mục tiêu tiếp theo"],["hudParty","Đội hình: chạm để đổi người"],["hudSelf","Máu của nhân vật đang điều khiển"],["bAtk","Đánh"],["bSkill","Kỹ năng"],["bBurst","Nộ: dùng khi vòng sáng đầy"],["bJump","Nhảy"],["bDash","Lướt né"],["quickMenu","Bản đồ, Cài đặt, Tạm dừng"]];function Qr(n=!1){let t=!1;try{t=localStorage.getItem(Ie)==="1"}catch{}if(!n&&(t||!z.showHints))return;const i=document.getElementById("hud");if(i){i.querySelectorAll(".hud-tip").forEach(h=>h.remove()),requestAnimationFrame(()=>{for(const[h,a]of Wr){const g=document.getElementById(h);if(!g||g.hidden)continue;const l=g.getBoundingClientRect();if(!l.width)continue;const c=document.createElement("div");c.className="hud-tip",c.setAttribute("aria-hidden","true"),c.textContent=a;const s=l.left+l.width/2>innerWidth/2;c.dataset.side=s?"l":"r",c.style.top=Math.max(4,l.top+l.height/2-12)+"px",s?c.style.right=innerWidth-l.left+6+"px":c.style.left=l.right+6+"px",i.append(c)}setTimeout(()=>i.querySelectorAll(".hud-tip").forEach(h=>h.classList.add("is-out")),6e3),setTimeout(()=>i.querySelectorAll(".hud-tip").forEach(h=>h.remove()),7e3)});try{localStorage.setItem(Ie,"1")}catch{}}}function ie(){e.scene="play",e.paused=!1,document.querySelectorAll(".screen").forEach(n=>n.hidden=!0),D("hud").hidden=!1,D("bossBar").hidden=!e.G.boss,e.G.boss&&(D("bossName").textContent=`Hắc Giao · Cấp độ ${e.G.boss.lv}`),Ot(),Jc(),$r(),Qr()}function St(n){e.G.banner={t:2.2,txt:n}}function jr(){e.G.mode==="world"?(St("Cả đội gục ngã"),e.G.over=!0,ni(1.6,()=>{for(const n of e.G.party)n.alive=!0,n.hp=n.maxHp;e.G.act=0,e.G.p.x=e.G.respawn.x,e.G.p.y=e.G.respawn.y,e.G.over=!1,Jc(),Ot(),St("Hồi sinh tại Bia Đá"),ac("Cả đội về Bia Đá đã chạm gần nhất, máu đầy, không mất vật phẩm")})):Oh(!1,"Cả đội đã gục ngã")}function Oh(n,t="",i=0){if(e.G._ended)return;e.G._ended=!0,e.G.over=!0,_i();let h="";if(e.G.mode==="tower"){const a=e.G.tower.floor;if(n){const l=E.req("towerClear",{floor:a,stars:i}).data;h=`<h3>Vượt tầng ${a}</h3><div class="starsbig">${[1,2,3].map(c=>c<=i?"★":'<span class="off">★</span>').join("")}</div><p class="muted">Còn ${Math.ceil(e.G.tower.timeLeft)} giây</p><div class="rewards">${gi("gem",l.gems)}${gi("coin",l.coin)}${gi("book",l.books)}</div>
        <div class="row">${a<12?`<button class="btn gold" data-act="next">Tầng ${a+1}</button>`:""}<button class="btn" data-act="retry">Đánh lại</button><button class="btn" data-act="menu">Về đảo</button></div>`}else h=`<h3>Thất bại</h3><p class="muted">${ba(t)}. Thử nâng cấp nhân vật hoặc ghép đội có nhiều phản ứng nguyên tố hơn.</p><div class="row"><button class="btn gold" data-act="retry">Thử lại</button><button class="btn" data-act="menu">Về đảo</button></div>`}else if(e.G.mode==="boss")if(n){const g=E.req("bossClear",{lv:e.G.opt.lv}).data;h=`<h3>Chiến thắng!</h3><p class="muted">Hắc Giao cấp độ ${e.G.opt.lv} đã bị đánh bại${g.first?" lần đầu":""}.</p><div class="rewards">${gi("gem",g.gems)}${gi("coin",g.coin)}${gi("book",g.books)}</div><div class="row">${e.G.opt.lv<5?`<button class="btn gold" data-act="bnext">Cấp độ ${e.G.opt.lv+1}</button>`:""}<button class="btn" data-act="retry">Đánh lại</button><button class="btn" data-act="menu">Về đảo</button></div>`}else h=`<h3>Thất bại</h3><p class="muted">${ba(t)}. Hắc Giao còn ${Math.round(e.G.boss.hp/e.G.boss.maxHp*100)}% máu. Dùng Lướt để né đòn lao và vùng mưa.</p><div class="row"><button class="btn gold" data-act="retry">Thử lại</button><button class="btn" data-act="menu">Về đảo</button></div>`;setTimeout(()=>Dc(h),n?300:900)}function gi(n,t){return`<span class="coin"><i class="${{gem:"i-gem",coin:"i-coin",book:"i-book"}[n]}"></i>+${Rn(t)} ${n==="gem"?"Đá Sao":n==="coin"?"Xu":"Sách KN"}</span>`}function Xr(){e.WORLD||(e.WORLD=Sg()),e.G=Za("world"),e.G.map=e.WORLD;const n=e.WORLD.statues[0],t=e.worldPos;e.G.p.x=t?t.x:(n.x+.5)*A,e.G.p.y=t?t.y:(n.y+2.5)*A,e.G.respawn=t?{x:t.rx,y:t.ry}:{x:e.G.p.x,y:e.G.p.y},e.worldPos=null,e.WORLD.camps.forEach((i,h)=>{const a=Math.hypot(i.x-e.WORLD.cx,i.y-e.WORLD.cy),g=Math.max(1,Math.min(8,1+Math.floor((a-8)/6))),l=3+h%3,c=h%6===5;for(let s=0;s<l;s++){const u=Yi(g<2?["slime","slime","goblin"]:g<4?["slime","goblin","archer","goblin"]:["goblin","archer","shaman","slime"]),p=s/l*B,d=(i.x+.5)*A+Math.cos(p)*50,M=(i.y+.5)*A+Math.sin(p)*50;Hc(d,M,12,e.WORLD)||e.G.enemies.push(Dh(u,d,M,g))}c&&e.G.enemies.push(Dh("golem",(i.x+.5)*A,(i.y+.5)*A,g+1,"earth"))}),ie(),St("Đảo Lạc")}function Yr(n){const t=e.G.p,i=e.G.map;let h=null,a=60;const g=(l,c,s,u,p)=>{const d=nn(t.x,t.y,l,c);d<a&&(a=d,h={kind:s,i:u,label:p,x:l,y:c})};i.statues.forEach((l,c)=>g((l.x+.5)*A,(l.y+.9)*A,"statue",c,"Bia Đá: hồi phục đội")),i.chests.forEach((l,c)=>{E.P.chests.includes(c)||g((l.x+.5)*A,(l.y+.6)*A,"chest",c,"Mở rương báu")}),g((i.tower.x+.5)*A,(i.tower.y+.8)*A,"tower",0,"Vào Tháp Tinh Tú"),g((i.gate.x+.5)*A,(i.gate.y+.8)*A,"gate",0,"Vào hang Hắc Giao"),e.G.interact=h,Zo(t.x/A,t.y/A),e.G.healAura=!1;for(const l of i.statues)if(nn(t.x,t.y,(l.x+.5)*A,(l.y+.9)*A)<90){e.G.healAura=!0;for(const c of e.G.party)c.alive&&(c.hp=Math.min(c.maxHp,c.hp+c.maxHp*.25*n))}}function qc(){if(!e.G||!e.G.interact||e.G.over)return;const n=e.G.interact;if(n.kind==="statue"){for(const t of e.G.party)t.alive=!0,t.hp=t.maxHp;e.G.respawn={x:e.G.p.x,y:e.G.p.y},e.G.statueUsed=!0,dn(n.x,n.y-20,70,"#9fe8ff",.5,6),Ln(n.x,n.y-30,"#9fe8ff",20,160),ac("Đã hồi phục cả đội và lưu điểm hồi sinh"),Ot()}else if(n.kind==="chest"){const t=E.req("openChest",{idx:n.i});t.ok&&(cc("chest"),Mn("chest"),Ln(n.x,n.y-14,"#f0c060",30,240,4),dn(n.x,n.y-10,60,"#f0c060",.5,6),Kn(n.x,n.y-44,`+${t.data.gems} Đá Sao`,"#7fc8ff",18),Kn(n.x,n.y-26,`+${Rn(t.data.coin)} Xu · +${t.data.books} Sách`,"#f0c060",13),Zt("gems","Đá Sao",t.data.gems,"da-sao","#7fc8ff"),Zt("coin","Xu",t.data.coin,"xu","#f0c060"),Zt("book","Sách kinh nghiệm",t.data.books,"nang-cap","#c9a6ff"),te())}else n.kind==="tower"?Mt("tower"):n.kind==="gate"&&Mt("boss")}const At=Object.fromEntries(Kt.map(n=>[n,!1])),Nh=new Set,bn={x:0,y:0,active:!1,id:null,ox:0,oy:0},pt={x:0,y:0};function Fr(n,t,i,h,a){const g=Math.hypot(n,t)/i;if(g<=h||g===0)return[0,0];const l=Math.min(1,(Math.min(g,1)-h)/(1-h)*a),c=Math.hypot(n,t);return[n/c*l,t/c*l]}function Ur(){const n=(At.right?1:0)-(At.left?1:0),t=(At.down?1:0)-(At.up?1:0);return[n+bn.x+pt.x,t+bn.y+pt.y]}let _h=null;function Ic(n){_h=n}const Zr=()=>e.scene==="play"&&!!e.G&&!e.paused;let $c=()=>{};function Jr(n){$c=n}function Ka(n){if(n==="pause"){if(e.scene!=="play"||!e.G||e.overlay)return;e.paused&&!D("modal").hidden&&!e.G._ended?Kc():e.paused||Ra();return}if(n==="map"){e.scene==="play"&&e.G?.mode==="world"&&(!e.paused||e.overlay==="menu")&&$c();return}At[n]=!0,Zr()&&(n==="attack"?vt("atk"):n==="skill"?vt("skill"):n==="burst"?vt("burst"):n==="jump"?vt("jump"):n==="dash"?(e.holdDash=!0,e.G.p.dashHeld=0,vt("dash")):n==="interact"?qc():(n==="p1"||n==="p2"||n==="p3"||n==="p4")&&_c(+n[1]-1))}function Ch(n){At[n]=!1,n==="dash"&&(e.holdDash=!1)}function he(){bn.x=bn.y=0,pt.x=pt.y=0;for(const n of Kt)At[n]=!1;Nh.clear(),e.holdAtk=!1,e.holdDash=!1}function Pi(n,t,i){n.addEventListener("pointerdown",a=>{if(a.preventDefault(),!document.body.classList.contains("hud-editing")){try{n.setPointerCapture(a.pointerId)}catch{}n.classList.add("is-active"),t()}});const h=()=>{n.classList.remove("is-active"),i&&i()};n.addEventListener("pointerup",h),n.addEventListener("pointercancel",h),n.addEventListener("contextmenu",a=>a.preventDefault())}function zc(n,t){const i=e.G;return{x:i.cam.x+(n-e.VW/2)/e.ZOOM,y:i.cam.y+(t-e.VH/2)/e.ZOOM}}const nl=n=>n&&(n.tagName==="INPUT"||n.tagName==="SELECT"||n.tagName==="TEXTAREA");function tl(){addEventListener("keydown",c=>{if(_h){c.preventDefault(),c.stopImmediatePropagation();const u=_h;_h=null,u(c.code);return}if(nl(c.target))return;const s=Ne(c.code);s&&(e.scene==="play"&&!e.paused&&s!=="pause"&&c.preventDefault(),!c.repeat&&(Nh.add(c.code),Ka(s)))},!0),addEventListener("keyup",c=>{Nh.delete(c.code);const s=Ne(c.code);s&&(z.keys[s].some(u=>Nh.has(u))||Ch(s))}),addEventListener("blur",()=>{he(),e.scene==="play"&&!e.paused&&e.G&&!e.G.over&&Ra()}),bi.addEventListener("pointerdown",c=>{e.scene==="play"&&c.pointerType==="mouse"&&c.button===0&&(e.holdAtk=!0)}),addEventListener("pointerup",c=>{c.pointerType==="mouse"&&(e.holdAtk=!1)});const n=c=>{if(c.pointerType!=="mouse"||(e.mouse.sx=c.clientX,e.mouse.sy=c.clientY,e.mouse.inside=!0,e.scene!=="play"||!e.G))return;const s=zc(c.clientX,c.clientY);e.mouse.wx=s.x,e.mouse.wy=s.y;const u=e.G.enemies.some(p=>!p.dead&&Math.hypot(p.x-s.x,p.y-(p.isBoss?30:14)-s.y)<p.r+14);document.body.classList.toggle("cursor-enemy",u)};bi.addEventListener("pointermove",n),D("joyZone").addEventListener("pointermove",n),bi.addEventListener("pointerleave",()=>{e.mouse.inside=!1,document.body.classList.remove("cursor-enemy")});const t=D("joyZone"),i=D("joy"),h=D("joyKnob"),a=()=>An.joystick.radius,g=c=>{c.pointerId===bn.id&&(bn.active=!1,bn.id=null,bn.x=0,bn.y=0,i.classList.remove("is-active"),i.style.left="",i.style.top="",h.style.transform="")};t.addEventListener("pointerdown",c=>{if(c.pointerType==="mouse"){e.holdAtk=!0;return}if(!(document.body.classList.contains("hud-editing")||bn.active)){if(e.isTouch=!0,document.documentElement.dataset.input="touch",bn.active=!0,bn.id=c.pointerId,z.joystick.mode==="dynamic"){bn.ox=c.clientX,bn.oy=c.clientY;const s=i.offsetParent?.getBoundingClientRect()??{left:0,top:0};i.style.left=c.clientX-s.left+"px",i.style.top=c.clientY-s.top+"px"}else{const s=i.getBoundingClientRect();bn.ox=s.left+s.width/2,bn.oy=s.top+s.height/2}i.classList.add("is-active"),h.style.transform="translate(-50%,-50%)";try{t.setPointerCapture(c.pointerId)}catch{}c.preventDefault(),l(c)}});const l=c=>{if(!bn.active||c.pointerId!==bn.id)return;let s=c.clientX-bn.ox,u=c.clientY-bn.oy;const[p,d]=Fr(s,u,a(),z.joystick.deadzone,z.joystick.sensitivity);bn.x=p,bn.y=d;const M=Math.hypot(s,u);M>a()&&(s=s/M*a(),u=u/M*a()),h.style.transform=`translate(calc(-50% + ${s}px), calc(-50% + ${u}px))`};t.addEventListener("pointermove",l),t.addEventListener("pointerup",g),t.addEventListener("pointercancel",g),addEventListener("touchstart",()=>document.documentElement.dataset.input="touch",{passive:!0}),addEventListener("mousemove",()=>{e.isTouch||(document.documentElement.dataset.input="mouse")}),Pi(D("bAtk"),()=>{e.holdAtk=!0,vt("atk")},()=>e.holdAtk=!1),Pi(D("bSkill"),()=>vt("skill")),Pi(D("bBurst"),()=>vt("burst")),Pi(D("bJump"),()=>vt("jump")),Pi(D("bDash"),()=>{e.holdDash=!0,e.G.p.dashHeld=0,vt("dash")},()=>e.holdDash=!1),D("bInteract").addEventListener("click",qc),D("pauseBtn").addEventListener("click",()=>Ra())}function il(n,t,i){if(!t)return{mult:1};const h=n.aura,a=(c,s)=>{e.G.pending.react++,Kn(n.x,n.y-(n.isBoss?80:44),c,s,15),Mn("react")};if(t==="wind")return h&&h!=="wind"&&h!=="earth"&&(n.aura=null,a("Khuếch Tán",K.wind.c),hl(n,h,i)),{mult:1};if(t==="earth")return h&&h!=="wind"&&h!=="earth"&&(n.aura=null,a("Kết Tinh",K.earth.c),e.G.pickups.push({k:"shard",x:n.x+F(-20,20),y:n.y+F(-10,10),el:h,t:12,vy:0})),{mult:1};if(!h||h===t)return n.aura=t,n.auraT=7,{mult:1};n.aura=null;const g=new Set([h,t]),l=(c,s)=>g.has(c)&&g.has(s);return l("fire","water")?(a("Bốc Hơi","#ffb27a"),{mult:t==="water"?2:1.5}):l("fire","ice")?(a("Tan Chảy","#ffcf8a"),{mult:t==="fire"?2:1.5}):l("fire","bolt")?(a("Quá Tải",K.fire.c),ni(0,()=>{dn(n.x,n.y-10,90,K.fire.c,.4,8),Ln(n.x,n.y-10,K.fire.c,16,220),In("react");for(const c of e.G.enemies){if(c.dead)continue;const s=nn(n.x,n.y,c.x,c.y);if(s<90+c.r&&(qh(c,i.st.atk*1.8,K.fire.c),!c.isBoss)){const u=(1-s/120)*260,p=Math.atan2(c.y-n.y,c.x-n.x);c.kx+=Math.cos(p)*u,c.ky+=Math.sin(p)*u}}}),{mult:1}):l("water","bolt")?(a("Điện Cảm",K.bolt.c2),n.ec={t:.5,n:4,dmg:i.st.atk*.55},{mult:1}):l("water","ice")?(a("Đóng Băng",K.ice.c2),n.frozen=n.isBoss?1.2:3,{mult:1}):l("bolt","ice")?(a("Siêu Dẫn","#c9b8ff"),n.vuln=8,ni(0,()=>{dn(n.x,n.y-10,80,"#c9b8ff",.35,6);for(const c of e.G.enemies)!c.dead&&nn(n.x,n.y,c.x,c.y)<80+c.r&&(qh(c,i.st.atk*.7,"#c9b8ff"),c.vuln=8)}),{mult:1}):(n.aura=t,n.auraT=7,{mult:1})}function hl(n,t,i){ni(0,()=>{dn(n.x,n.y-10,110,K[t].c,.45,7),Ln(n.x,n.y-12,K[t].c,14,200);for(const h of e.G.enemies)h.dead||nn(n.x,n.y,h.x,h.y)<110+h.r&&lt(h,i,.9,t,{noEnergy:!0,noKb:!0})})}function al(n,t){const i=e.G.p;if(n.flash-=t,n.auraT>0&&(n.auraT-=t,n.auraT<=0&&(n.aura=null)),n.vuln>0&&(n.vuln-=t),n.hitT>0&&(n.hitT-=t),Ac(n,t),n.ec&&(n.ec.t-=t,n.ec.t<=0&&(n.ec.t=.5,n.ec.n--,wh(n.x,n.y-20,K.bolt.c),qh(n,n.ec.dmg,K.bolt.c2),n.ec&&n.ec.n<=0&&(n.ec=null))),n.dead)return;n.phase===1&&n.hp<n.maxHp*ft.phase2.at&&(n.phase=2,n.el=ft.phase2.el,n.spd=ft.phase2.spd,St("Hắc Giao nổi giận!"),In("bossPhase"),Mn("roar"),dn(n.x,n.y,260,K.bolt.c,.8,14),n.state="idle",n.t=1.2,n.tele=null);const h=n.frozen>0||n.stun>0;h&&(n.frozen-=t);const a=n.phase===2?1.3:1,g=Math.atan2(i.y-n.y,i.x-n.x);if(!h){if(n.state==="idle"){n.t-=t;const l=260,c=nn(n.x,n.y,i.x,i.y),s=g+Math.PI/2;let u=Math.cos(s)*n.spd*.6,p=Math.sin(s)*n.spd*.6;if(c>l?(u+=Math.cos(g)*n.spd,p+=Math.sin(g)*n.spd):(u-=Math.cos(g)*n.spd*.6,p-=Math.sin(g)*n.spd*.6),n.x=En(n.x+u*t,80,e.G.bounds.w-80),n.y=En(n.y+p*t,140,e.G.bounds.h-80),n.ang=Ta(n.ang,Math.atan2(p,u),t*4),n.t<=0){const d=n.phase===2?["fan","charge","rain","summon","fan","charge"]:["fan","charge","rain"];if(n.act=Yi(d),n.state="wind",n.t=0,n.act==="fan"&&(n.tele={kind:"fan",ang:g,dur:.8/a}),n.act==="charge"&&(n.tele={kind:"line",ang:g,len:520,dur:1/a}),n.act==="rain"){n.rain=[];for(let M=0;M<(n.phase===2?8:6);M++)n.rain.push({x:En(i.x+F(-200,200),40,e.G.bounds.w-40),y:En(i.y+F(-160,160),80,e.G.bounds.h-40)});n.rain[0]={x:i.x,y:i.y},n.tele={kind:"rain",dur:1.2/a}}n.act==="summon"&&(n.tele={kind:"summon",dur:.8})}}else if(n.state==="wind"){if(n.t+=t,Cc(n,n.tele,n.t/n.tele.dur),(n.tele.kind==="line"||n.tele.kind==="fan")&&(n.ang=Ta(n.ang,n.tele.ang,t*8)),n.t>=n.tele.dur){const l=n.tele.kind,c=n.el,s=K[c].c;if(l==="fan"){const u=n.phase===2?9:7;for(let p=0;p<u;p++){const d=n.tele.ang+(p-(u-1)/2)*.16;e.G.projs.push({own:"e",x:n.x+Math.cos(d)*40,y:n.y-24+Math.sin(d)*40,vx:Math.cos(d)*330*a,vy:Math.sin(d)*330*a,r:10,life:2.2,dmg:n.atk*.8,kind:"bossorb",el:c})}n.state="idle",n.t=F(1.2,2)/a}else if(l==="line")n.state="charge",n.t=0,n.cv={x:Math.cos(n.tele.ang)*900*a,y:Math.sin(n.tele.ang)*900*a,left:520},n.hitP=!1;else if(l==="rain"){for(const u of n.rain)dn(u.x,u.y,64,s,.4,8),Ln(u.x,u.y,s,10,160),c==="bolt"&&wh(u.x,u.y,s),nn(i.x,i.y,u.x,u.y)<70&&Rt(n.atk,s);In("boss"),n.state="idle",n.t=F(1.3,2)/a}else if(l==="summon"){for(let u=0;u<2;u++){const p=Dh("slime",En(n.x+F(-120,120),60,e.G.bounds.w-60),En(n.y+F(60,160),120,e.G.bounds.h-60),n.lv*2,"bolt");p.state="chase",e.G.enemies.push(p),dn(p.x,p.y,40,K.bolt.c,.4,5)}n.state="idle",n.t=1.5}n.tele=null}}else if(n.state==="charge"){const l=Math.hypot(n.cv.x,n.cv.y)*t;n.x+=n.cv.x*t,n.y+=n.cv.y*t,n.cv.left-=l,n.ang=Math.atan2(n.cv.y,n.cv.x),!n.hitP&&nn(n.x,n.y,i.x,i.y)<60&&(n.hitP=!0,Rt(n.atk*1.4,K[n.el].c)),(n.cv.left<=0||n.x<60||n.x>e.G.bounds.w-60||n.y<120||n.y>e.G.bounds.h-60)&&(n.x=En(n.x,60,e.G.bounds.w-60),n.y=En(n.y,120,e.G.bounds.h-60),n.state="idle",n.t=F(1,1.6)/a,In("boss"),Ec(n.x,n.y,30,340,n.atk*.7,n.el,300))}}n.trail.unshift({x:n.x,y:n.y}),n.trail.length>240&&n.trail.pop();for(let l=0;l<n.segs.length;l++){const c=Math.min(n.trail.length-1,l*6+4);n.segs[l].x=n.trail[c].x,n.segs[l].y=n.trail[c].y}n.segs[0].x=n.x,n.segs[0].y=n.y,nn(n.x,n.y,i.x,i.y)<46&&n.state!=="charge"&&!(n.stun>0)&&Rt(n.atk*.5,K[n.el].c)}function el(){const n=e.G.boss;n.dead=!0,In("bossKill"),Xg(X.slowmo.bossKill.scale,X.slowmo.bossKill.dur),Mn("bossKill"),dn(n.x,n.y,300,K[n.el].c,1,18);for(let t=0;t<4;t++)Ln(n.x+F(-60,60),n.y+F(-40,40),K[n.el].c,30,380,5);St("Hắc Giao đã bị đánh bại!"),e.G.over=!0,ni(1.8,()=>Oh(!0))}function ji(n,t,i){let h=null,a=i;for(const g of e.G.enemies){if(g.dead)continue;const l=nn(n,t,g.x,g.y);l<a&&(a=l,h=g)}return h}function Wc(){const n=e.G.p,t=ji(n.x,n.y,300);if(z.mouseAim&&e.mouse?.inside&&!e.isTouch){const i=zc(e.mouse.sx,e.mouse.sy);n.ang=Math.atan2(i.y-(n.y-14),i.x-n.x)}else t?n.ang=Math.atan2(t.y-(t.isBoss?20:10)-(n.y-14),t.x-n.x):n.ang=Math.atan2(n.dirY,n.dirX);Math.abs(Math.cos(n.ang))>.2&&(n.fx=Math.cos(n.ang)>0?1:-1),n.back=Math.sin(n.ang)<-.75}function qh(n,t,i){n.dead||(E.P.gm.one&&(t=n.hp+1),t*=(n.vuln>0?1.25:1)*(n.stun>0?X.poise.stunVuln:1),n.hp-=t,n.flash=Math.max(n.flash,X.hit.flash*.7),Kn(n.x,n.y-(n.isBoss?70:34),Rn(t),i,14),n.hp<=0&&Qc(n))}function lt(n,t,i,h,a={}){if(n.dead)return 0;const g=Math.random()<t.st.crit;let l=t.st.atk*i*(g?1+t.st.cdmg:1)*F(.95,1.05);const c=il(n,h,t);l*=c.mult*(n.vuln>0?1.25:1)*(n.stun>0?X.poise.stunVuln:1),E.P.gm.one&&(l=Math.max(l,n.hp+1)),n.hp-=l,n.flash=X.hit.flash,n.hitT=X.hit.squash,cl(n,(X.poise.weapon[t.c.w]??8)*i),g&&Li("crit"),c.mult>1&&(Li("react"),In("react",.6));const s=h?K[h].c2:"#ffffff";Kn(n.x,n.y-(n.isBoss?70:34),Rn(l)+(g?"!":""),c.mult>1?"#ffd27a":s,c.mult>1?20:16,g);const u=Ui(t.c.id);Ln(n.x,n.y-14,"#ffffff",3,120,2),Qh(n.x,n.y-14,u,h?6:3);const p=yc(n).mass;if(!a.noKb&&p>0){const d=a.ang!==void 0?a.ang:Math.atan2(n.y-e.G.p.y,n.x-e.G.p.x),M=(a.kb||80)/p;n.kx+=Math.cos(d)*M,n.ky+=Math.sin(d)*M}return a.noEnergy||(a.cast?a.cast.gave||(a.cast.gave=!0,ol(a.cast.amount||12,n.x,n.y,t)):t.energy=Math.min(t.c.burst.cost,t.energy+1.2)),Mn("hit_"+t.c.w),(g||a.heavy)&&Mn("crit"),n.hp<=0&&Qc(n),n.state==="idle"&&!n.isBoss&&(n.state="chase"),l}function cl(n,t){const i=yc(n);n.maxPoise===void 0&&(n.poise=n.maxPoise=i.poise),n.poiseT=0,!(n.stun>0||n.dead)&&(n.poise-=t,!(n.poise>0)&&(n.poise=0,n.stun=i.stun??X.poise.stun,n.tele=null,n.isBoss&&(n.state="idle",n.t=Math.max(n.t,.6)),Kn(n.x,n.y-(n.isBoss?96:56),"Choáng","#ffe27a",16,!0),dn(n.x,n.y-12,n.isBoss?120:50,"#ffe27a",.4,6),Li("break"),In("break"),Mn("break")))}function ol(n,t,i,h){for(const a of e.G.party){if(!a.alive)continue;const g=a===Dn()?n:n*.35;a.energy=Math.min(a.c.burst.cost,a.energy+g)}for(let a=0;a<3;a++)e.G.pickups.push({k:"orb",x:t+F(-14,14),y:i+F(-14,14),el:h.c.el,t:3,vy:0,auto:!0,delay:F(.1,.35)})}function Qc(n){if(!n.dead){if(n.dead=!0,n.hp=0,Ln(n.x,n.y-14,n.el?K[n.el].c:"#ccc",18,200,3.5),dn(n.x,n.y-10,40,"#ffffff",.3,3),Mn("kill"),Jo(n),n.isBoss){el();return}if(e.G.pending.kill++,e.G.mode==="world"){const t=1+Math.floor(n.lv/2);for(let i=0;i<t;i++)e.G.pickups.push({k:"coin",x:n.x+F(-16,16),y:n.y+F(-16,16),v:40*n.lv,t:30,vy:0});Math.random()<.18+(n.type==="golem"?.8:0)&&e.G.pickups.push({k:"book",x:n.x,y:n.y,v:n.type==="golem"?3:1,t:30,vy:0})}}}function Rt(n,t="#ff7070"){const i=e.G.p,h=Dn();if(!(!h||!h.alive||i.iframes>0||e.G.over)){if(E.P.gm.god){Kn(i.x,i.y-48,"Miễn","#bbb",13),i.iframes=.25;return}if(i.shield>0){const a=Math.min(i.shield,n);i.shield-=a,n-=a,dn(i.x,i.y-18,30,K.earth.c,.25,3)}if(n<=0){i.iframes=.2;return}if(h.hp-=n,i.hurt=.25,i.iframes=.45,In("hurt"),lc("hurt"),Kn(i.x,i.y-48,"-"+Rn(n),t,16),Mn("hurt"),h.hp<=0){h.hp=0,h.alive=!1,Ln(i.x,i.y-20,"#ffffff",20,180);const a=e.G.party.findIndex(g=>g.alive);a>=0?(e.G.act=a,e.G.switchCd=.5,St(`${h.c.name} đã gục`),Ot()):jr()}}}const jc={atk:()=>Xc(),skill:()=>ll(),burst:()=>sl(),dash:()=>rl(),jump:()=>_r()};function vt(n){jc[n]()?Et[n]=0:Et[n]=X.input.buffer}function gl(n){for(const t of Object.keys(Et))Et[t]<=0||(jc[t]()?Et[t]=0:Et[t]-=n)}function Xc(){const n=e.G.p,t=Dn();if(!t||!t.alive||e.G.over||e.G.cine)return!1;if(n.air)return Gr();if(n.atkCd>0||n.dashT>0)return!1;const i=ph[t.c.w];n.comboT<=0&&(n.combo=0);const h=n.combo;n.combo=(n.combo+1)%3,n.comboT=1.1,n.atkCd=i.int,n.atkAnim=1,Wc();const a=n.ang,g=t.c.w==="cat"||h===2?t.c.el:null,l=i.mult[h],c=Ui(t.c.id);if(i.kind==="melee"){Wa(n.x,n.y-16,a,i.range,g?c.c:c.c2,t.c.w,c.trail,g?c.c2:"#ffffff"),g&&Qh(n.x+Math.cos(a)*i.range*.7,n.y-16+Math.sin(a)*i.range*.7,c,5);let s=!1;n.x+=Math.cos(a)*4,n.y+=Math.sin(a)*4;for(const u of e.G.enemies){if(u.dead)continue;const p=u.x,d=u.y-(u.isBoss?20:10),M=nn(n.x,n.y-12,p,d);if(M>i.range+u.r)continue;let f=Math.atan2(d-(n.y-12),p-n.x)-a;for(;f>Math.PI;)f-=B;for(;f<-Math.PI;)f+=B;Math.abs(f)>i.arc&&M>u.r+10||(lt(u,t,l,g,{ang:a,kb:t.c.w==="great"?160:70,heavy:h===2||t.c.w==="great"}),s=!0)}s&&(h===2||t.c.w==="great")&&(Li("heavy"),In("heavy")),Mn(t.c.w==="great"?"swing_great":"swing")}else{const s=i.kind==="arrow"?640:400;e.G.projs.push({own:"p",h0:ti(n.x,n.y),x:n.x+Math.cos(a)*14,y:n.y-16+Math.sin(a)*14,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:i.kind==="arrow"?5:8,life:.8,m:t,mult:l,el:g,kind:i.kind,home:i.kind==="orb",heavy:h===2}),Mn(i.kind==="arrow"?"shoot":"cast")}return!0}function rl(){const n=e.G.p;if(n.dashT>0||e.G.over||e.G.cine)return!1;if(n.air){if(!Cr(n))return!1;n.airDash=!0,n.stamina-=X.jump.airDashStamina}else{if(n.stamina<20)return!1;n.stamina-=20}X.input.dashCancel&&(n.atkAnim=0,n.atkCd=0);let t=n.dirX,i=n.dirY;const h=Math.hypot(t,i)||1;return t/=h,i/=h,n.dashT=.2,n.dvx=t*460,n.dvy=i*460,n.iframes=Math.max(n.iframes,.32),Ln(n.x,n.y-6,"#ffffff",8,90,2),Mn("dash"),!0}function ll(){const n=e.G.p,t=Dn();if(!t||!t.alive||e.G.over||e.G.cine||t.skillCd>0&&!E.P.gm.nocd)return!1;const i=t.c.skill,h=t.c.el,a=Ui(t.c.id),g=a.c;t.skillCd=i.cd,Wc();const l=n.ang,c={gave:!1,amount:12};if(Mn("skill"),i.type==="dash"){n.dashT=.2,n.dvx=Math.cos(l)*820,n.dvy=Math.sin(l)*820,n.iframes=.35,n.atkAnim=1;const s=new Set;n.dashHit={set:s,m:t,mult:i.m,el:h,cast:c},Wa(n.x,n.y-16,l,90,g,"great",a.trail,a.c2)}else if(i.type==="nova"||i.type==="shield"||i.type==="heal"){const s=i.type==="heal"?120:130;dn(n.x,n.y-12,s,g,.45,10),Ln(n.x,n.y-12,g,24,260,3.5),Qh(n.x,n.y-12,a,14,220),In("skill");for(const u of e.G.enemies)!u.dead&&nn(n.x,n.y,u.x,u.y)<s+u.r&&lt(u,t,i.m,h,{cast:c,kb:180});if(i.type==="shield"&&(n.shield=t.maxHp*.3,n.shieldMax=n.shield,n.shieldT=12),i.type==="heal"){for(const u of e.G.party)u.alive&&(u.hp=Math.min(u.maxHp,u.hp+u.maxHp*.12+200));Kn(n.x,n.y-56,"Hồi máu","#7dffa8",15)}}else if(i.type==="turret")e.G.turrets.push({x:n.x+Math.cos(l)*30,y:n.y+Math.sin(l)*20,el:h,m:t,life:10,cd:.3,mult:i.m,cast:c,t:0}),dn(n.x,n.y,50,g,.3,5);else if(i.type==="vortex"){const s=n.x+Math.cos(l)*110,u=n.y+Math.sin(l)*110;e.G.fields.push({k:"vortex",x:s,y:u,r:150,el:h,m:t,life:2.5,tick:0,ti:.5,mult:i.m,cast:c,pull:180})}return!0}function sl(){const n=e.G.p,t=Dn();return!t||!t.alive||e.G.over||e.G.cine||t.energy<t.c.burst.cost&&!E.P.gm.nocd?!1:(vn.burstT=X.camera.burstHold,t.energy=0,e.G.pending.burst++,n.iframes=1.4,Mn("burst"),e.G.cine={t:.95,max:.95,m:t,fire:()=>ul(t)},!0)}function ul(n){const t=e.G.p,i=n.c.burst,h=n.c.el,a=Ui(n.c.id),g=a.c;if(In("burst"),Li("burst"),Qh(t.x,t.y-12,a,24,320),i.type==="inferno"){dn(t.x,t.y-12,230,g,.6,16),dn(t.x,t.y-12,150,a.c2,.5,8),Ln(t.x,t.y-12,g,50,420,5);for(const l of e.G.enemies)!l.dead&&nn(t.x,t.y,l.x,l.y)<230+l.r&&lt(l,n,i.m,h,{noEnergy:!0,kb:260})}else if(i.type==="storm")for(let l=0;l<10;l++)ni(l*.2,()=>{let c=ji(t.x,t.y,340);const s=e.G.enemies.filter(d=>!d.dead&&nn(t.x,t.y,d.x,d.y)<340);s.length&&(c=Yi(s));const u=c?c.x+F(-10,10):t.x+F(-200,200),p=c?c.y+F(-6,6):t.y+F(-150,150);n.c.w==="bow"?e.G.fx.push({k:"arrowRain",x:u,y:p,col:g,life:.22,max:.22}):wh(u,p,g),dn(u,p,55,g,.25,4);for(const d of e.G.enemies)!d.dead&&nn(u,p,d.x,d.y)<55+d.r&&lt(d,n,i.m,h,{noEnergy:!0,noKb:!0})});else if(i.type==="tide"){dn(t.x,t.y-12,240,g,.7,18),dn(t.x,t.y-12,180,a.c2,.6,10),Ln(t.x,t.y-12,a.c2,40,360,4);for(const l of e.G.enemies)!l.dead&&nn(t.x,t.y,l.x,l.y)<240+l.r&&lt(l,n,i.m,h,{noEnergy:!0,kb:300});for(const l of e.G.party)l.alive&&(l.hp=Math.min(l.maxHp,l.hp+l.maxHp*.3));Kn(t.x,t.y-60,"Hồi máu cả đội","#7dffa8",16)}else if(i.type==="meteor"){const l=ji(t.x,t.y,360),c=l?l.x:t.x+Math.cos(t.ang)*150,s=l?l.y:t.y+Math.sin(t.ang)*150;e.G.fx.push({k:"meteor",x:c,y:s,col:g,life:.8,max:.8}),ni(.8,()=>{In("meteor"),Mn("slam"),dn(c,s,170,g,.6,16),Ln(c,s,g,50,420,5);for(const u of e.G.enemies)!u.dead&&nn(c,s,u.x,u.y)<170+u.r&&lt(u,n,i.m,h,{noEnergy:!0,kb:200})}),t.shield=Math.max(t.shield,n.maxHp*.35),t.shieldMax=t.shield,t.shieldT=12}else i.type==="blizzard"&&e.G.fields.push({k:"storm",follow:!0,x:t.x,y:t.y,r:160,el:h,m:n,life:6,tick:0,ti:.5,mult:i.m,cast:{gave:!0}})}function ml(n){const t=e.G.p,i=X.camera,h=t.moving?i.lead:0,a=Math.min(1,n*i.leadSpeed);return vn.leadX+=(t.dirX*h-vn.leadX)*a,vn.leadY+=(t.dirY*h*.7-vn.leadY)*a,{x:t.x+vn.leadX,y:t.y-20+vn.leadY}}function dl(n){const t=X.camera;vn.burstT>0&&(vn.burstT-=n);const i=e.G.boss,h=vn.burstT>0?t.burstZoom:i&&!i.dead?t.bossZoom:1;e.camZoom+=(h-e.camZoom)*Math.min(1,n*t.zoomSpeed),e.ZOOM=e.BASE_ZOOM*e.camZoom}const $e={world:{bpm:84,root:220,scale:[0,2,4,7,9,12,14,16],lead:"triangle",drone:.5},tower:{bpm:72,root:196,scale:[0,3,5,7,10,12,15,17],lead:"sine",drone:.5},boss:{bpm:96,root:110,scale:[0,1,5,7,8,12,13,17],lead:"sawtooth",drone:1}},U={theme:"",explore:null,combat:null,out:null,next:0,step:0,inCombat:!1,linger:0,paused:!1,combatAudible:0};function oh(n,t){return n*Math.pow(2,t/12)}function gh(n,t,i,h,a,g,l,c=.01){const s=n.createOscillator(),u=n.createGain();s.type=i,s.frequency.value=h,u.gain.setValueAtTime(1e-4,a),u.gain.exponentialRampToValueAtTime(l,a+c),u.gain.exponentialRampToValueAtTime(1e-4,a+g),s.connect(u).connect(t),s.start(a),s.stop(a+g+.05)}function fa(n,t,i,h,a){const g=n.createOscillator(),l=n.createGain();g.frequency.setValueAtTime(h,i),g.frequency.exponentialRampToValueAtTime(h*.4,i+.18),l.gain.setValueAtTime(a,i),l.gain.exponentialRampToValueAtTime(1e-4,i+.22),g.connect(l).connect(t),g.start(i),g.stop(i+.25)}function rh(n,t){const i=Math.sin(n*12.9898+t*78.233)*43758.5453;return i-Math.floor(i)}function fl(n,t,i,h){const a=h%32,g=60/t.bpm/2,l=U.explore,c=U.combat;a%8===0&&gh(n,l,"sine",oh(t.root/2,t.scale[a/8%2?3:0]),i,g*8,.05*t.drone,.4),rh(a,1)>.45&&gh(n,l,t.lead,oh(t.root,t.scale[rh(a,2)*t.scale.length|0]),i,g*1.8,.035),a%16===8&&fa(n,l,i,90,.08),!(!U.inCombat&&n.currentTime>U.combatAudible)&&(a%4===0&&fa(n,c,i,70,.22),a%4===2&&fa(n,c,i,140,.08),gh(n,c,"square",oh(t.root/2,t.scale[[0,0,3,0,4,0,3,1][a%8]]),i,g*.9,.025),rh(a,3)>.35&&gh(n,c,t.lead,oh(t.root*2,t.scale[rh(a,4)*t.scale.length|0]),i,g*.9,.025))}function yl(n){U.out||(U.out=n.createGain(),U.out.connect(bt.music),U.explore=n.createGain(),U.combat=n.createGain(),U.combat.gain.value=0,U.explore.connect(U.out),U.combat.connect(U.out))}function lh(n,t,i){const h=e.AC;n.gain.cancelScheduledValues(h.currentTime),n.gain.setTargetAtTime(t,h.currentTime,Math.max(.01,i/3))}function pl(){const n=e.G;if(n.boss&&!n.boss.dead)return!0;const t=X.audio.combatRange;for(const i of n.enemies)if(!i.dead&&(i.state==="chase"||i.tele)&&nn(i.x,i.y,n.p.x,n.p.y)<t)return!0;return!1}function vl(n){const t=e.scene==="play"&&e.G&&!e.G._ended;if(!e.soundOn||!e.AC){!e.soundOn&&U.out&&(U.out.disconnect(),U.out=U.explore=U.combat=null,U.theme="",U.inCombat=!1,U.linger=0),e.soundOn&&t&&ja();return}const i=e.AC;yl(i);const h=t?$e[e.G.mode]?e.G.mode:"world":"",a=X.audio.crossfade;if(h!==U.theme&&(U.theme=h,U.paused=e.paused,lh(U.out,h&&!e.paused?1:0,a),U.next=i.currentTime+.1,U.step=0),!h)return;e.paused!==U.paused&&(U.paused=e.paused,lh(U.out,e.paused?.35:1,.6));const g=pl();g?U.linger=X.audio.combatLinger:U.linger-=n;const l=g||U.linger>0;l!==U.inCombat&&(U.inCombat=l,l||(U.combatAudible=i.currentTime+a*2),lh(U.combat,l?1:0,a),lh(U.explore,l?.35:1,a));const c=$e[h],s=60/c.bpm/2;for(U.next<i.currentTime&&(U.next=i.currentTime+.05);U.next<i.currentTime+.25;)fl(i,c,U.next,U.step++),U.next+=s}function Yc(n){const t=X.jump.levelPx,i=(n.zh??0)*t,h=ti(n.x,n.y)*t,a=Math.max(0,i-h);return{z:i,g:h,air:a,shadow:Math.max(.45,1-a/(t*3))}}function bl(n,t,i=16){const h=Yc(t);n.fillStyle=`rgba(0,0,0,${.32*h.shadow})`,n.beginPath(),n.ellipse(t.x,t.y-h.g,i*h.shadow,i*.36*h.shadow,0,0,B),n.fill()}function Tl(n,t){const i=Yc(t);if(n.save(),n.translate(0,-i.z),t.land>0){const h=t.land/X.jump.fall.landAnim;n.translate(t.x,t.y),n.scale(1+.12*h,1-.14*h),n.translate(-t.x,-t.y)}}function kl(n){for(const t of e.G.waves??[]){const i=K[t.el]?.c??"#ffb070",h=Math.max(0,1-t.r/t.max);n.strokeStyle=i,n.globalAlpha=.35+h*.5,n.lineWidth=7,n.beginPath(),n.ellipse(t.x,t.y,t.r,t.r*.6,0,0,B),n.stroke(),n.lineWidth=2,n.strokeStyle="#fff",n.beginPath(),n.ellipse(t.x,t.y,t.r-5,(t.r-5)*.6,0,0,B),n.stroke()}n.globalAlpha=1}function xl(n,t,i){const h=t.flash>0;if(n.save(),n.translate(t.x,t.y),t.hitT>0){const a=Math.sin(t.hitT/.14*Math.PI)*.12;n.scale(1+a,1-a)}if(t.frozen>0&&(n.globalAlpha=.95),n.fillStyle="rgba(0,0,0,.28)",n.beginPath(),n.ellipse(0,0,t.r*.9,t.r*.32,0,0,B),n.fill(),zh[t.type],t.type==="slime"){const a=t.hop>0?1+Math.sin(t.hop*Math.PI)*.3:1+Math.sin(i*5+t.seed)*.06,g=h?"#ffffff":K[t.el].c,l=t.hop>0?Math.sin(t.hop*Math.PI)*16:0;n.translate(0,-l),n.fillStyle=g,n.beginPath(),n.ellipse(0,-t.r*.75/a,t.r/a*1.05,t.r*.8*a,0,0,B),n.fill(),n.fillStyle="rgba(255,255,255,.35)",n.beginPath(),n.ellipse(-t.r*.35,-t.r*1.1,t.r*.3,t.r*.18,-.5,0,B),n.fill(),n.fillStyle="#1a1a2a",n.beginPath(),n.arc(-4*t.fx+2,-t.r*.7,2.2,0,B),n.arc(4*t.fx+2,-t.r*.7,2.2,0,B),n.fill()}else if(t.type==="goblin"||t.type==="archer"||t.type==="shaman"){const a=Math.abs(Math.sin(t.walk))*1.5;n.translate(0,-a),n.scale(t.fx,1);const g=h?"#fff":"#7a5a3a",l=h?"#fff":t.type==="archer"?"#e8dcc0":t.type==="shaman"?"#d9e0f0":"#f1e6cf",c=t.type==="shaman"?"#3b3570":t.type==="archer"?"#4b6b3a":"#6b3a2a";n.fillStyle=g,Nn(n,-4,-8,3,8,1.2),n.fill(),Nn(n,1,-8,3,8,1.2),n.fill(),n.fillStyle=h?"#fff":c,Nn(n,-7,-19,14,13,4),n.fill(),t.type==="shaman"&&(n.beginPath(),n.moveTo(-9,-6),n.lineTo(9,-6),n.lineTo(7,-18),n.lineTo(-7,-18),n.closePath(),n.fill()),n.fillStyle=g,n.beginPath(),n.arc(0,-25,8,0,B),n.fill(),n.fillStyle=l,n.beginPath(),n.ellipse(2,-25,7,7.5,0,0,B),n.fill(),n.fillStyle="#b23a3a",n.fillRect(-1,-31,2,12),n.fillRect(4,-31,1.5,12),n.fillStyle="#1a1a1a",n.beginPath(),n.arc(-.5,-26,1.4,0,B),n.arc(5,-26,1.4,0,B),n.fill(),n.fillStyle="#d8c9a8",n.beginPath(),n.moveTo(-5,-30),n.lineTo(-9,-38),n.lineTo(-2,-32),n.closePath(),n.fill(),n.beginPath(),n.moveTo(5,-30),n.lineTo(9,-38),n.lineTo(2,-32),n.closePath(),n.fill(),n.save(),n.translate(7,-14);const s=t.tele&&t.tele.kind!=="proj"?-1.2*(t.tele.t/t.tele.dur):t.swing>0?1.2*t.swing:0;if(n.rotate(s),t.type==="goblin")n.fillStyle="#5a3a1e",Nn(n,-1.5,-16,3,18,1.5),n.fill(),n.fillStyle="#3a2a18",n.beginPath(),n.arc(0,-16,4,0,B),n.fill();else if(t.type==="archer")n.strokeStyle="#6a4a2a",n.lineWidth=2,n.beginPath(),n.arc(0,-4,9,-1.3,1.3),n.stroke();else{n.fillStyle="#4a3a2a",n.fillRect(-1,-22,2,26);const u=n.createRadialGradient(0,-24,0,0,-24,7);u.addColorStop(0,K[t.el].c2),u.addColorStop(1,tt(K[t.el].c,0)),n.fillStyle=u,n.beginPath(),n.arc(0,-24,7,0,B),n.fill()}n.restore()}else if(t.type==="golem"){const a=Math.abs(Math.sin(t.walk*.6))*2;n.translate(0,-a);const g=h?"#fff":"#7d7a73",l=h?"#fff":"#5b5852";n.fillStyle=l,Nn(n,-14,-16,10,16,3),n.fill(),Nn(n,4,-16,10,16,3),n.fill(),n.fillStyle=g,Nn(n,-20,-48,40,34,8),n.fill();const c=t.tele?t.tele.t/t.tele.dur:0;n.fillStyle=l,Nn(n,-30,-46-c*16,11,28,4),n.fill(),Nn(n,19,-46-c*16,11,28,4),n.fill(),n.fillStyle=g,Nn(n,-11,-64,22,18,6),n.fill();const s=K.earth.c;n.fillStyle=s,n.shadowColor=s,n.shadowBlur=12,n.beginPath(),n.arc(0,-32,5,0,B),n.fill(),n.fillRect(-5,-58,4,3),n.fillRect(2,-58,4,3),n.shadowBlur=0,n.strokeStyle="rgba(0,0,0,.25)",n.lineWidth=1.5,n.beginPath(),n.moveTo(-12,-40),n.lineTo(-4,-36),n.lineTo(-8,-26),n.moveTo(8,-44),n.lineTo(14,-34),n.stroke()}n.restore()}function Ll(n,t,i){const h=t.flash>0?"#ffffff":t.phase===2?"#4a2f7a":"#1f3f6a",a=t.phase===2?K.bolt.c:K.water.c;for(let c=t.segs.length-1;c>=0;c--){const s=t.segs[c],u=30-c*1.6;u<8||(n.fillStyle="rgba(0,0,0,.25)",n.beginPath(),n.ellipse(s.x,s.y+6,u,u*.35,0,0,B),n.fill(),n.fillStyle=h,n.beginPath(),n.arc(s.x,s.y-u*.6,u,0,B),n.fill(),n.fillStyle=a,n.globalAlpha=.75,n.beginPath(),n.moveTo(s.x-u*.3,s.y-u*1.5),n.lineTo(s.x,s.y-u*2.1),n.lineTo(s.x+u*.3,s.y-u*1.5),n.closePath(),n.fill(),n.globalAlpha=1,n.fillStyle="rgba(255,255,255,.1)",n.beginPath(),n.arc(s.x-u*.3,s.y-u,u*.4,0,B),n.fill())}const g=t.segs[0],l=t.ang;n.save(),n.translate(g.x,g.y-24),n.rotate(l),n.fillStyle=h,n.beginPath(),n.ellipse(10,0,40,28,0,0,B),n.fill(),n.beginPath(),n.moveTo(30,-14),n.lineTo(62,-4),n.lineTo(62,6),n.lineTo(30,16),n.closePath(),n.fill(),n.fillStyle="#e8e2c8",n.beginPath(),n.moveTo(-6,-22),n.lineTo(-34,-46),n.lineTo(4,-26),n.closePath(),n.fill(),n.beginPath(),n.moveTo(-6,22),n.lineTo(-34,46),n.lineTo(4,26),n.closePath(),n.fill(),n.fillStyle=a,n.shadowColor=a,n.shadowBlur=14,n.beginPath(),n.arc(28,-11,4.5,0,B),n.arc(28,11,4.5,0,B),n.fill(),n.shadowBlur=0,n.strokeStyle=a,n.lineWidth=2,n.beginPath(),n.moveTo(56,-4),n.quadraticCurveTo(80,-20+Math.sin(i*4)*6,90,-8),n.moveTo(56,6),n.quadraticCurveTo(80,20+Math.sin(i*4+1)*6,90,10),n.stroke(),n.restore()}function Ml(n,t){const i=K[n.el].c,h=K[n.el].c2;o.fillStyle="rgba(0,0,0,.25)",o.beginPath(),o.ellipse(n.x,n.y,12,4,0,0,B),o.fill(),o.fillStyle="#4a3a2a",o.fillRect(n.x-2,n.y-24,4,24);const a=n.y-32+Math.sin(t*4)*2,g=o.createRadialGradient(n.x,a,0,n.x,a,16);g.addColorStop(0,h),g.addColorStop(1,tt(i,0)),o.fillStyle=g,o.beginPath(),o.arc(n.x,a,16,0,B),o.fill(),o.fillStyle=i,Nn(o,n.x-6,a-8,12,16,4),o.fill(),o.fillStyle=h,o.fillRect(n.x-6,a-2,12,2),n.life<2&&Math.floor(t*8)%2&&(o.globalAlpha=.5),o.globalAlpha=1}function Ih(n=1){const t=X.telegraph;return t.line*n*(e.isTouch?t.touchScale:1)/e.ZOOM}function Fh(n){return n>=X.telegraph.flashAt&&Math.sin(e.G.time*42)>-.2}function ki(n,t){const i=Fh(n);o.fillStyle=`rgba(255,50,50,${.1+n*.08})`,t(1),o.fill(),o.fillStyle=i?"rgba(255,235,235,.42)":`rgba(255,60,60,${.22+n*.2})`,t(n),o.fill(),o.lineJoin="round",o.strokeStyle="rgba(20,0,0,.55)",o.lineWidth=Ih(1.8),t(1),o.stroke(),o.strokeStyle=i?"#ffffff":`rgba(255,${110+n*110},${90+n*60},${.45+n*.55})`,o.lineWidth=Ih(i?1.25:1),o.stroke()}function Sl(n){const t=n.tele;if(!t)return;const i=Math.min(1,t.t/t.dur);if(o.save(),t.kind==="circle")ki(i,h=>{o.beginPath(),o.arc(t.x,t.y,Math.max(.1,t.r*h),0,B)});else if(t.kind==="arc")ki(i,h=>{o.beginPath(),o.moveTo(t.x,t.y),o.arc(t.x,t.y,Math.max(.1,t.r*h),t.ang-t.arc,t.ang+t.arc),o.closePath()});else if(t.kind==="hop")ki(i,h=>{o.beginPath(),o.arc(t.tx,t.ty,Math.max(.1,t.r*h),0,B)});else if(t.kind==="proj"){const h=Fh(i);o.strokeStyle=h?"#ffffff":`rgba(255,90,80,${.35+i*.6})`,o.lineWidth=Ih(h?1.2:.8),o.setLineDash([10/e.ZOOM,7/e.ZOOM]),o.lineDashOffset=-e.G.time*60,o.beginPath(),o.moveTo(n.x,n.y-14),o.lineTo(e.G.p.x,e.G.p.y-14),o.stroke()}o.restore()}function Nl(n){const t=n.tele;if(!t||n.state!=="wind")return;const i=Math.min(1,n.t/t.dur);if(o.save(),t.kind==="line")o.translate(n.x,n.y),o.rotate(t.ang),ki(i,h=>{o.beginPath(),o.rect(0,-46,t.len*h,92)});else if(t.kind==="fan")o.translate(n.x,n.y-24),ki(i,h=>{o.beginPath(),o.moveTo(0,0),o.arc(0,0,60+420*h,t.ang-.6,t.ang+.6),o.closePath()});else if(t.kind==="rain")for(const h of n.rain)ki(i,a=>{o.beginPath(),o.arc(h.x,h.y,Math.max(.1,66*a),0,B)});else t.kind==="summon"&&(o.strokeStyle=Fh(i)?"#ffffff":K.bolt.c,o.lineWidth=Ih(1),o.beginPath(),o.arc(n.x,n.y,60+i*60,0,B),o.stroke());o.restore(),t.kind!=="summon"&&Fc(n.x,n.y-110,i)}function Fc(n,t,i){const h=Fh(i),a=(e.isTouch?X.telegraph.touchScale:1)/e.ZOOM,g=(7+i*3)*a;o.save(),o.translate(n,t),o.fillStyle=h?"#ffffff":"#ff4a3d",o.strokeStyle="rgba(30,0,0,.8)",o.lineWidth=2*a,o.beginPath(),o.moveTo(0,-g*1.25),o.lineTo(g,g*.6),o.lineTo(-g,g*.6),o.closePath(),o.fill(),o.stroke(),o.fillStyle=h?"#ff3020":"#fff",o.fillRect(-g*.13,-g*.6,g*.26,g*.7),o.fillRect(-g*.13,g*.22,g*.26,g*.22),o.restore()}function Uc(n,t,i,h){n.maxPoise===void 0||n.poise>=n.maxPoise&&!(n.stun>0)||(o.fillStyle="rgba(0,0,0,.6)",o.fillRect(t-h/2-1,i-1,h+2,4),n.stun>0?(o.fillStyle=Math.sin(e.G.time*20)>0?"#ffe27a":"#fff6c8",o.fillRect(t-h/2,i,h*Math.min(1,n.stun/(X.enemies[n.isBoss?"hacgiao":n.type]?.stun??X.poise.stun)),2)):(o.fillStyle="#e8eef8",o.fillRect(t-h/2,i,h*Math.max(0,n.poise/n.maxPoise),2)))}function _l(n){n.dead||(Uc(n,n.x,n.y-92,90),n.stun>0&&Zc(n.x,n.y-100,22))}function Zc(n,t,i){o.fillStyle="#ffe27a";for(let h=0;h<3;h++){const a=e.G.time*4+h*B/3;o.beginPath(),o.arc(n+Math.cos(a)*i,t+Math.sin(a)*i*.35,2.6,0,B),o.fill()}}function Cl(n){const t=n.type==="golem"?78:n.type==="slime"?34:46;if(n.hp<n.maxHp){const h=n.type==="golem"?56:36;o.fillStyle="rgba(0,0,0,.6)",o.fillRect(n.x-h/2-1,n.y-t-1,h+2,6),o.fillStyle="#ff6060",o.fillRect(n.x-h/2,n.y-t,h*Math.max(0,n.hp/n.maxHp),4)}Uc(n,n.x,n.y-t+6,n.type==="golem"?56:36),n.stun>0&&Zc(n.x,n.y-t+14,n.r*.8),n.tele&&Fc(n.x,n.y-t-22,Math.min(1,n.tele.t/n.tele.dur)),o.font="700 10px 'Be Vietnam Pro',sans-serif",o.textAlign="center",o.fillStyle="#fff",o.strokeStyle="rgba(0,0,0,.7)",o.lineWidth=2.5;const i=`Lv${n.lv}${zh[n.type].elite?" ✦":""}`;o.strokeText(i,n.x,n.y-t-5),o.fillText(i,n.x,n.y-t-5),n.aura&&(o.fillStyle=K[n.aura].c,o.beginPath(),o.arc(n.x+(n.type==="golem"?34:24),n.y-t+2,5,0,B),o.fill(),o.strokeStyle="#fff",o.lineWidth=1,o.stroke()),n.frozen>0&&(o.fillStyle="rgba(170,230,255,.35)",o.beginPath(),o.ellipse(n.x,n.y-n.r,n.r*1.2,n.r*1.4,0,0,B),o.fill())}function Gl(n,t){const i=1-t,h=n.ang-n.arc*(1-t*.3)*n.flip,a=n.ang+n.arc*(1-t*.3)*n.flip,g=n.r*.8;switch(o.globalAlpha=Math.min(1,t*1.4),o.lineCap="round",o.strokeStyle=n.col,o.shadowColor=n.col,o.shadowBlur=10,n.trail){case"thrust":{const l=n.r*(.6+i*.4),c=Math.cos(n.ang),s=Math.sin(n.ang);o.lineWidth=n.w*t+2,o.beginPath(),o.moveTo(n.x+c*10,n.y+s*10),o.lineTo(n.x+c*l,n.y+s*l),o.stroke(),o.beginPath(),o.moveTo(n.x+c*l,n.y+s*l),o.lineTo(n.x+c*(l-16)-s*7,n.y+s*(l-16)+c*7),o.moveTo(n.x+c*l,n.y+s*l),o.lineTo(n.x+c*(l-16)+s*7,n.y+s*(l-16)-c*7),o.stroke();break}case"wing":{ri(n,g,h,a,n.w*t+2),o.lineWidth=2;for(let l=1;l<=3;l++){const c=h+(a-h)*l/4;o.beginPath(),o.moveTo(n.x+Math.cos(c)*g,n.y+Math.sin(c)*g),o.lineTo(n.x+Math.cos(c)*(g+14*t),n.y+Math.sin(c)*(g+14*t)),o.stroke()}break}case"crescent":{o.fillStyle=n.col,o.beginPath(),o.arc(n.x,n.y,g+4,h,a,n.flip<0),o.arc(n.x+Math.cos(n.ang)*10,n.y+Math.sin(n.ang)*10,g-6,a,h,n.flip>0),o.closePath(),o.fill();break}case"twin":ri(n,g,h,a,n.w*t*.7+1),ri(n,g*.72,h+.15*n.flip,a-.15*n.flip,n.w*t*.5+1);break;case"zigzag":{o.lineWidth=n.w*t*.6+1.5,o.beginPath();for(let l=0;l<=6;l++){const c=h+(a-h)*l/6,s=g+(l%2?9:-6);l?o.lineTo(n.x+Math.cos(c)*s,n.y+Math.sin(c)*s):o.moveTo(n.x+Math.cos(c)*s,n.y+Math.sin(c)*s)}o.stroke();break}case"heavy":ri(n,g,h,a,n.w*t*1.4+3),o.globalAlpha*=.4,ri(n,g*1.15,h,a,3);break;default:ri(n,g,h,a,n.w*t+1)}n.trail!=="thrust"&&n.trail!=="crescent"&&(o.shadowBlur=0,o.strokeStyle=n.core,o.globalAlpha=t*.85,o.lineWidth=Math.max(1,n.w*t*.3),o.beginPath(),o.arc(n.x,n.y,g,h,a,n.flip<0),o.stroke())}function ri(n,t,i,h,a){o.lineWidth=a,o.beginPath(),o.arc(n.x,n.y,t,i,h,n.flip<0),o.stroke()}function Hl(n,t){const i=n.size;switch(o.globalAlpha=Math.min(1,t*1.5),o.fillStyle=n.col,o.strokeStyle=n.col,o.translate(n.x,n.y),o.rotate(n.rot),n.pk){case"drop":o.beginPath(),o.arc(0,0,i*.8,0,Math.PI),o.lineTo(0,-i*1.6),o.closePath(),o.fill();break;case"leaf":case"petal":case"feather":o.beginPath(),o.ellipse(0,0,i*(n.pk==="feather"?1.8:1.4),i*.55,0,0,B),o.fill(),n.pk==="feather"&&(o.globalAlpha*=.6,o.lineWidth=.8,o.beginPath(),o.moveTo(-i*2.2,0),o.lineTo(i*1.8,0),o.stroke());break;case"spark":o.lineWidth=1.6,o.beginPath(),o.moveTo(-i*1.6,0),o.lineTo(-i*.3,i*.5),o.lineTo(i*.3,-i*.5),o.lineTo(i*1.6,0),o.stroke();break;case"shard":o.beginPath(),o.moveTo(0,-i*1.3),o.lineTo(i*.8,0),o.lineTo(0,i*1.1),o.lineTo(-i*.7,0),o.closePath(),o.fill();break;case"snow":o.lineWidth=1.2,o.beginPath();for(let h=0;h<3;h++){const a=h*Math.PI/3;o.moveTo(-Math.cos(a)*i*1.3,-Math.sin(a)*i*1.3),o.lineTo(Math.cos(a)*i*1.3,Math.sin(a)*i*1.3)}o.stroke();break;case"lantern":o.fillRect(-i*.7,-i*.9,i*1.4,i*1.8),o.globalAlpha*=.35,o.beginPath(),o.arc(0,0,i*2,0,B),o.fill();break;case"mist":o.globalAlpha*=.35,o.beginPath(),o.arc(0,0,i*(1.6-t*.6),0,B),o.fill();break;default:o.beginPath(),o.arc(0,0,i*t+.6,0,B),o.fill()}}function Bl(n){const t=e.G.cine,i=t.m,h=1-t.t/t.max,a=K[i.c.el];o.fillStyle=`rgba(0,0,0,${.55*Math.min(1,h*4)})`,o.fillRect(0,0,e.VW,e.VH);const g=Math.min(e.VH*.5,340),l=e.VH/2-g/2,c=Math.min(1,h*3.5);o.save(),o.beginPath(),o.moveTo(0,l+30),o.lineTo(e.VW,l),o.lineTo(e.VW,l+g-30),o.lineTo(0,l+g),o.closePath(),o.clip();const s=o.createLinearGradient(0,0,e.VW,0);s.addColorStop(0,Te(a.c,-.6)),s.addColorStop(.5,a.c),s.addColorStop(1,Te(a.c,-.6)),o.fillStyle=s,o.fillRect(0,l,e.VW,g),o.strokeStyle=tt(a.c2,.35),o.lineWidth=3;for(let M=0;M<14;M++){const f=(M*140+n*900)%(e.VW+300)-150;o.beginPath(),o.moveTo(f,l),o.lineTo(f-80,l+g),o.stroke()}const u=g*1.25,p=u*.75,d=Mi(i.id,300,400,"splash");o.drawImage(d,e.VW*.62-p/2+(1-c)*e.VW*.5,e.VH/2-u*.52,p,u),o.restore(),o.globalAlpha=c,o.textAlign="left",o.fillStyle="#fff",o.shadowColor="#000",o.shadowBlur=12,o.font=`700 ${Math.min(54,e.VW/11)}px 'Cormorant Garamond',serif`,o.fillText(i.c.burst.name,Math.max(20,e.VW*.08)-(1-c)*200,e.VH/2+10),o.font=`600 ${Math.min(18,e.VW/26)}px 'Be Vietnam Pro',sans-serif`,o.fillStyle=a.c2,o.fillText(`${i.c.name} · Kỹ năng nộ`,Math.max(20,e.VW*.08)-(1-c)*200,e.VH/2-38),o.shadowBlur=0,o.globalAlpha=1,t.t<.12&&(o.fillStyle=`rgba(255,255,255,${(1-t.t/.12)*.7})`,o.fillRect(0,0,e.VW,e.VH))}const Pl=Array.from({length:180},(n,t)=>({x:fn(t,1,3),y:fn(t,2,3),s:fn(t,3,3)*1.6+.3,p:fn(t,4,3)*6}));function Vl(n){const t=o.createLinearGradient(0,0,0,e.VH);t.addColorStop(0,"#0b0f28"),t.addColorStop(.6,"#1a1f4a"),t.addColorStop(1,"#2b2450"),o.fillStyle=t,o.fillRect(0,0,e.VW,e.VH);for(const a of Pl)o.globalAlpha=.35+.5*Math.abs(Math.sin(n*.8+a.p)),o.fillStyle="#e8ecff",o.beginPath(),o.arc(a.x*e.VW,a.y*e.VH*.8,a.s,0,B),o.fill();o.globalAlpha=1;const i=o.createRadialGradient(e.VW*.82,e.VH*.16,0,e.VW*.82,e.VH*.16,90);i.addColorStop(0,"rgba(255,240,200,.95)"),i.addColorStop(.35,"rgba(255,230,180,.55)"),i.addColorStop(1,"rgba(255,230,180,0)"),o.fillStyle=i,o.beginPath(),o.arc(e.VW*.82,e.VH*.16,90,0,B),o.fill();const h=n*.25%1;if(h<.25){const a=h/.25;o.strokeStyle=`rgba(255,240,200,${1-a})`,o.lineWidth=2,o.beginPath(),o.moveTo(e.VW*(.2+a*.4),e.VH*(.05+a*.2)),o.lineTo(e.VW*(.2+a*.4)-80,e.VH*(.05+a*.2)-30),o.stroke()}o.fillStyle="#141a3a",o.beginPath(),o.moveTo(0,e.VH);for(let a=0;a<=e.VW;a+=20)o.lineTo(a,e.VH*.82+Math.sin(a*.006)*30+Math.sin(a*.017)*12);o.lineTo(e.VW,e.VH),o.fill(),o.fillStyle="#0e1230",o.beginPath(),o.moveTo(0,e.VH);for(let a=0;a<=e.VW;a+=20)o.lineTo(a,e.VH*.9+Math.sin(a*.01+2)*18);o.lineTo(e.VW,e.VH),o.fill();for(let a=0;a<24;a++){const g=fn(a,7)*e.VW+Math.sin(n*.5+a)*40,l=e.VH*.7+fn(a,8)*e.VH*.25+Math.cos(n*.7+a)*20;o.fillStyle=`rgba(255,230,140,${.3+.4*Math.abs(Math.sin(n*2+a))})`,o.beginPath(),o.arc(g,l,2,0,B),o.fill()}}const ya={0:["#3f7d48","#44844d","#3a7444"],5:["#d8c38c","#d2bc84"],4:["#b99a68","#b29262"]};function wl(n,t,i,h){const a=n*A,g=t*A,l=fn(n,t,1);if(i===j.WATER||i===j.DEEP){o.fillStyle=i===j.DEEP?"#1f5a8e":"#2b7bb3",o.fillRect(a,g,A+.5,A+.5),Math.sin(h*1.6+n*.7+t*.4)>.4&&(o.fillStyle="rgba(255,255,255,.14)",o.fillRect(a+8+l*14,g+12+l*10,12,2));return}if(i===j.BRIDGE){o.fillStyle="#2b7bb3",o.fillRect(a,g,A+.5,A+.5),o.fillStyle="#8a6440",o.fillRect(a+3,g,A-6,A+.5),o.fillStyle="#6e4e30";for(let s=0;s<4;s++)o.fillRect(a+3,g+s*10+8,A-6,1.5);return}if(i===j.LEDGE){o.fillStyle=l<.5?"#8f8a7c":"#999382",o.fillRect(a,g,A+.5,A+.5),o.fillStyle="#6a6558",o.fillRect(a,g+A-9,A+.5,9.5),o.fillStyle="rgba(255,255,255,.16)",o.fillRect(a+4+l*10,g+6,10,2),o.fillRect(a+18,g+18+l*6,8,2);return}const c=i===j.SAND?ya[5]:i===j.PATH?ya[4]:ya[0];if(o.fillStyle=c[Math.floor(l*c.length)],o.fillRect(a,g,A+.5,A+.5),i===j.GRASS||i===j.FLOWER||i===j.TREE||i===j.ROCK){o.fillStyle="rgba(120,190,110,.35)";for(let s=0;s<3;s++){const u=a+fn(n,t,s+10)*A,p=g+fn(n,t,s+20)*A;o.fillRect(u,p,1.5,4)}}if(i===j.FLOWER){const s=["#ffd1e8","#fff3a6","#c8b8ff","#ffffff"];for(let u=0;u<3;u++)o.fillStyle=s[(n+t+u)%4],o.beginPath(),o.arc(a+6+fn(n,t,u+30)*28,g+6+fn(n,t,u+40)*28,2.2,0,B),o.fill()}i===j.PATH&&l<.3&&(o.fillStyle="rgba(0,0,0,.1)",o.beginPath(),o.arc(a+l*40,g+20,2.5,0,B),o.fill())}function El(n,t,i){const h=(n+.5)*A,a=(t+.85)*A,g=fn(n,t,3),l=Math.sin(i*1.2+n)*1.5;o.fillStyle="rgba(0,0,0,.25)",o.beginPath(),o.ellipse(h,a,18,6,0,0,B),o.fill(),o.fillStyle="#5a3e26",o.fillRect(h-3.5,a-20,7,20);const c=g<.5?["#1f5f3a","#2b7a48","#3f9a5c"]:["#24603c","#307e4a","#57a868"];if(o.fillStyle=c[0],o.beginPath(),o.arc(h+l,a-34,21,0,B),o.fill(),o.fillStyle=c[1],o.beginPath(),o.arc(h-7+l,a-38,15,0,B),o.arc(h+8+l,a-32,14,0,B),o.fill(),o.fillStyle=c[2],o.beginPath(),o.arc(h-5+l,a-44,8,0,B),o.fill(),g>.85){o.fillStyle="#ff9ab8";for(let s=0;s<4;s++)o.beginPath(),o.arc(h-12+fn(n,t,s+50)*24+l,a-48+fn(n,t,s+60)*24,2,0,B),o.fill()}}function Al(n,t){const i=(n+.5)*A,h=(t+.8)*A,a=fn(n,t,4);o.fillStyle="rgba(0,0,0,.22)",o.beginPath(),o.ellipse(i,h,18,6,0,0,B),o.fill(),o.fillStyle="#7d7d84",o.beginPath(),o.moveTo(i-18,h),o.lineTo(i-14,h-20-a*8),o.lineTo(i+2,h-28-a*6),o.lineTo(i+17,h-16),o.lineTo(i+18,h),o.closePath(),o.fill(),o.fillStyle="#9a9aa2",o.beginPath(),o.moveTo(i-14,h-20-a*8),o.lineTo(i+2,h-28-a*6),o.lineTo(i+4,h-14),o.lineTo(i-8,h-10),o.closePath(),o.fill()}function Rl(n,t,i){o.fillStyle="rgba(0,0,0,.28)",o.beginPath(),o.ellipse(n,t,26,8,0,0,B),o.fill(),o.fillStyle="#8b8a80",Nn(o,-22+n,t-14,44,14,3),o.fill(),o.fillStyle="#a7a597",Nn(o,n-14,t-62,28,50,6),o.fill(),o.fillStyle="#6f6e66";for(let a=0;a<4;a++)o.fillRect(n-9,t-52+a*9,18,2);const h=o.createRadialGradient(n,t-72,0,n,t-72,24);h.addColorStop(0,"rgba(160,230,255,.95)"),h.addColorStop(1,"rgba(160,230,255,0)"),o.fillStyle=h,o.beginPath(),o.arc(n,t-72+Math.sin(i*2)*3,24,0,B),o.fill(),o.fillStyle="#e6fbff",o.save(),o.translate(n,t-72+Math.sin(i*2)*3),o.rotate(i),o.fillRect(-5,-5,10,10),o.restore()}function Kl(n,t,i){o.fillStyle="rgba(0,0,0,.25)",o.beginPath(),o.ellipse(n,t,16,5,0,0,B),o.fill(),o.fillStyle="#8a5a2a",Nn(o,n-14,t-18,28,18,3),o.fill(),o.fillStyle="#f0c060",o.fillRect(n-14,t-11,28,3),o.fillRect(n-2,t-14,4,7),o.fillStyle="#a06a32",Nn(o,n-15,t-26,30,10,4),o.fill(),o.fillStyle="#f0c060",o.fillRect(n-15,t-22,30,2);{const h=performance.now()/1e3;o.fillStyle=`rgba(255,230,150,${.25+.2*Math.sin(h*3)})`,o.beginPath(),o.arc(n,t-14,24,0,B),o.fill()}}function ze(n,t,i,h,a){o.save(),o.translate(n,t-34),o.fillStyle="rgba(0,0,0,.3)",o.beginPath(),o.ellipse(0,34,34,10,0,0,B),o.fill(),o.fillStyle="#5a5468",Nn(o,-34,-38,10,72,3),o.fill(),Nn(o,24,-38,10,72,3),o.fill(),Nn(o,-40,-48,80,12,3),o.fill();const g=o.createRadialGradient(0,0,2,0,0,30);g.addColorStop(0,"#ffffff"),g.addColorStop(.4,h),g.addColorStop(1,tt(h,0)),o.fillStyle=g,o.beginPath(),o.ellipse(0,0,22,32,0,0,B),o.fill(),o.strokeStyle="rgba(255,255,255,.6)",o.lineWidth=2,o.beginPath(),o.ellipse(0,0,14+Math.sin(i*3)*3,24,0,0,B),o.stroke(),o.font="700 13px 'Be Vietnam Pro',sans-serif",o.textAlign="center",o.fillStyle="#fff",o.strokeStyle="rgba(0,0,0,.7)",o.lineWidth=3,o.strokeText(a,0,-58),o.fillText(a,0,-58),o.restore()}function Dl(n){const t=e.G.bounds,i=e.G.mode==="boss";o.fillStyle=i?"#132038":"#1b1f3e",o.fillRect(-2e3,-2e3,t.w+4e3,t.h+4e3),o.fillStyle=i?"#1d3350":"#2a2f58",o.fillRect(0,0,t.w,t.h);for(let h=0;h<t.h;h+=80)for(let a=0;a<t.w;a+=80){const g=fn(a,h,9);o.fillStyle=i?g<.5?"#1f3756":"#1b3150":g<.5?"#2e3460":"#292e57",o.fillRect(a+2,h+2,76,76)}o.save(),o.translate(t.w/2,t.h/2),o.strokeStyle=i?"rgba(100,180,255,.18)":"rgba(240,192,96,.18)",o.lineWidth=3;for(const h of[140,240,330])o.beginPath(),o.arc(0,0,h,0,B),o.stroke();o.rotate(n*.05);for(let h=0;h<12;h++)o.rotate(B/12),o.beginPath(),o.moveTo(140,0),o.lineTo(330,0),o.stroke();o.restore(),o.fillStyle=i?"#0c1626":"#14183a",o.fillRect(0,0,t.w,60),o.fillRect(0,0,20,t.h),o.fillRect(t.w-20,0,20,t.h),o.fillRect(0,t.h-20,t.w,20);for(let h=60;h<t.w;h+=180){const a=Math.sin(n*8+h)*2;o.fillStyle="#3a3550",o.fillRect(h-6,20,12,40);const g=o.createRadialGradient(h,16,0,h,16,26);g.addColorStop(0,i?"#9fd8ff":"#ffd27a"),g.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=g,o.beginPath(),o.arc(h,16+a,26,0,B),o.fill()}if(i)for(let h=0;h<10;h++){const a=fn(h,1)*t.w,g=100+fn(h,2)*(t.h-150);o.fillStyle="rgba(80,160,230,.12)",o.beginPath(),o.ellipse(a,g,60+Math.sin(n+h)*6,20,0,0,B),o.fill()}}function Ol(){const n=performance.now()/1e3;if(o.setTransform(e.DPR,0,0,e.DPR,0,0),e.scene!=="play"){Vl(n);return}const t=e.G.shake?F(-e.G.shake,e.G.shake):0,i=e.G.shake?F(-e.G.shake,e.G.shake):0;o.fillStyle="#1f5a8e",o.fillRect(0,0,e.VW,e.VH),o.save(),o.translate(e.VW/2+t,e.VH/2+i),o.scale(e.ZOOM,e.ZOOM),o.translate(-e.G.cam.x,-e.G.cam.y);const h=e.VW/e.ZOOM/2+A,a=e.VH/e.ZOOM/2+A*2,g=Math.max(0,Math.floor((e.G.cam.x-h)/A)),l=Math.min(Z-1,Math.ceil((e.G.cam.x+h)/A)),c=Math.max(0,Math.floor((e.G.cam.y-a)/A)),s=Math.min(mn-1,Math.ceil((e.G.cam.y+a+A)/A)),u=[];if(e.G.map){const f=e.G.map;for(let C=c;C<=s;C++)for(let P=g;P<=l;P++)wl(P,C,f.m[C*Z+P],n);for(let C=c;C<=s;C++)for(let P=g;P<=l;P++){const O=f.m[C*Z+P];O===j.TREE?u.push({y:(C+.85)*A,f:()=>El(P,C,n)}):O===j.ROCK&&u.push({y:(C+.8)*A,f:()=>Al(P,C)})}const N=(C,P)=>Math.abs(C-e.G.cam.x)<h+60&&Math.abs(P-e.G.cam.y)<a+80;f.statues.forEach(C=>{const P=(C.x+.5)*A,O=(C.y+.9)*A;N(P,O)&&u.push({y:O,f:()=>Rl(P,O,n)})}),f.chests.forEach((C,P)=>{if(E.P.chests.includes(P))return;const O=(C.x+.5)*A,q=(C.y+.6)*A;N(O,q)&&u.push({y:q,f:()=>Kl(O,q)})});{const C=(f.tower.x+.5)*A,P=(f.tower.y+.8)*A;N(C,P)&&u.push({y:P,f:()=>ze(C,P,n,"#f0c060","Tháp Tinh Tú")})}{const C=(f.gate.x+.5)*A,P=(f.gate.y+.8)*A;N(C,P)&&u.push({y:P,f:()=>ze(C,P,n,"#5aa0ff","Hang Hắc Giao")})}}else Dl(n);for(const f of e.G.fields){o.save();const N=K[f.el].c,C=o.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);C.addColorStop(0,tt(N,.05)),C.addColorStop(.8,tt(N,.22)),C.addColorStop(1,tt(N,0)),o.fillStyle=C,o.beginPath(),o.ellipse(f.x,f.y,f.r,f.r*.6,0,0,B),o.fill(),o.strokeStyle=tt(K[f.el].c2,.5),o.lineWidth=2;for(let P=0;P<3;P++)o.beginPath(),o.ellipse(f.x,f.y-10,f.r*(.3+P*.2),f.r*(.18+P*.12),0,n*(3+P)+P,n*(3+P)+P+3.5),o.stroke();o.restore()}kl(o);for(const f of e.G.enemies)f.dead||(f.isBoss?Nl(f):Sl(f));for(const f of e.G.pickups)u.push({y:f.y,f:()=>{if(f.k==="coin")o.fillStyle="#f0c060",o.beginPath(),o.arc(f.x,f.y-6+Math.sin(n*5+f.x)*2,5,0,B),o.fill(),o.fillStyle="#fff3c4",o.fillRect(f.x-1,f.y-9,2,5);else if(f.k==="book")o.fillStyle="#9b6ff0",o.fillRect(f.x-6,f.y-14,12,9),o.fillStyle="#e7dbff",o.fillRect(f.x-5,f.y-13,1.5,7);else if(f.k==="shard"){const N=K[f.el].c;o.save(),o.translate(f.x,f.y-10+Math.sin(n*4)*2),o.rotate(n),o.fillStyle=N,o.shadowColor=N,o.shadowBlur=10,o.beginPath(),o.moveTo(0,-8),o.lineTo(6,0),o.lineTo(0,8),o.lineTo(-6,0),o.closePath(),o.fill(),o.restore()}else if(f.k==="orb"){const N=K[f.el].c2;o.fillStyle=N,o.shadowColor=N,o.shadowBlur=10,o.beginPath(),o.arc(f.x,f.y,4,0,B),o.fill(),o.shadowBlur=0}}});for(const f of e.G.turrets)u.push({y:f.y,f:()=>Ml(f,n)});for(const f of e.G.enemies)if(!f.dead){if(f.isBoss){u.push({y:f.y,f:()=>(Ll(o,f,n),_l(f))});continue}e.G.map&&(Math.abs(f.x-e.G.cam.x)>h+60||Math.abs(f.y-e.G.cam.y)>a+80)||u.push({y:f.y,f:()=>{xl(o,f,n),Cl(f)}})}const p=e.G.p,d=Dn();d&&u.push({y:p.y,f:()=>{bl(o,p),Tl(o,p),p.iframes>0&&p.hurt>0&&Math.floor(n*20)%2&&(o.globalAlpha=.5),ka(o,d.c,p.x,p.y,1.12,{fx:p.fx,back:p.back,walk:p.walk,moving:p.moving,atk:p.atkAnim,t:n,noShadow:!0}),o.globalAlpha=1,p.shield>0&&(o.strokeStyle=tt(K.earth.c,.7),o.lineWidth=2.5,o.beginPath(),o.ellipse(p.x,p.y-22,22,28,0,0,B),o.stroke(),o.fillStyle=tt(K.earth.c,.1),o.fill()),o.strokeStyle=tt(K[d.c.el].c,.6),o.lineWidth=1.5,o.beginPath(),o.ellipse(p.x,p.y,15,5,0,0,B),o.stroke(),o.restore()}}),u.sort((f,N)=>f.y-N.y);for(const f of u)f.f();for(const f of e.G.projs){if(o.save(),f.kind==="arrow"||f.kind==="earrow")o.translate(f.x,f.y),o.rotate(Math.atan2(f.vy,f.vx)),o.fillStyle=f.kind==="earrow"?"#ffb0a0":f.el?K[f.el].c2:"#f3ead2",o.fillRect(-12,-1,18,2),o.beginPath(),o.moveTo(10,0),o.lineTo(4,-4),o.lineTo(4,4),o.closePath(),o.fill(),f.el&&(o.shadowColor=K[f.el].c,o.shadowBlur=8,o.fillRect(-12,-1,18,2));else{const N=K[f.el||"water"].c,C=K[f.el||"water"].c2,P=o.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*1.8);P.addColorStop(0,"#fff"),P.addColorStop(.35,C),P.addColorStop(1,tt(N,0)),o.fillStyle=P,o.beginPath(),o.arc(f.x,f.y,f.r*1.8,0,B),o.fill()}o.restore()}for(const f of e.G.fx){const N=f.life/f.max;if(o.save(),f.k==="dot")o.globalAlpha=N,o.fillStyle=f.col,o.beginPath(),o.arc(f.x,f.y,f.size*N+.5,0,B),o.fill();else if(f.k==="ring")o.globalAlpha=N,o.strokeStyle=f.col,o.lineWidth=f.w*N+1,o.beginPath(),o.ellipse(f.x,f.y,f.r*(1-N*.7),f.r*(1-N*.7)*.62,0,0,B),o.stroke();else if(f.k==="slash")Gl(f,N);else if(f.k==="pt")Hl(f,N);else if(f.k==="bolt"){o.globalAlpha=N,o.strokeStyle=f.col,o.lineWidth=3,o.shadowColor=f.col,o.shadowBlur=14,o.beginPath();let C=f.x,P=f.y-260;o.moveTo(C,P);for(let O=0;O<8;O++)C=f.x+(fn(O,f.seed|0)-.5)*30,P+=32,o.lineTo(C,P);o.lineTo(f.x,f.y),o.stroke(),o.strokeStyle="#fff",o.lineWidth=1,o.stroke()}else if(f.k==="arrowRain"){o.globalAlpha=N,o.strokeStyle=f.col,o.lineWidth=2;for(let C=0;C<5;C++){const P=(fn(C,f.x|0)-.5)*50,O=(fn(C,f.y|0)-.5)*30;o.beginPath(),o.moveTo(f.x+P-20,f.y+O-80*N-40),o.lineTo(f.x+P,f.y+O-40*N),o.stroke()}}else if(f.k==="meteor"){const C=1-N;o.globalAlpha=.4,o.fillStyle=f.col,o.beginPath(),o.ellipse(f.x,f.y,170*C+20,(170*C+20)*.6,0,0,B),o.fill(),o.globalAlpha=1;const P=f.y-500*(1-C),O=f.x+300*(1-C);o.fillStyle="#7a6a50",o.shadowColor=f.col,o.shadowBlur=30,o.beginPath(),o.arc(O,P,34,0,B),o.fill(),o.fillStyle=f.col,o.beginPath(),o.arc(O-6,P-6,14,0,B),o.fill()}o.restore()}o.textAlign="center";for(const f of e.G.texts){const N=f.life/f.max;o.globalAlpha=Math.min(1,N*2),o.font=`800 ${f.size}px 'Be Vietnam Pro',sans-serif`,o.lineWidth=3,o.strokeStyle="rgba(0,0,0,.65)",o.strokeText(f.txt,f.x,f.y),o.fillStyle=f.col,o.fillText(f.txt,f.x,f.y)}o.globalAlpha=1,o.restore();const M=o.createRadialGradient(e.VW/2,e.VH/2,Math.min(e.VW,e.VH)*.35,e.VW/2,e.VH/2,Math.max(e.VW,e.VH)*.75);if(M.addColorStop(0,"rgba(0,0,0,0)"),M.addColorStop(1,"rgba(5,8,30,.45)"),o.fillStyle=M,o.fillRect(0,0,e.VW,e.VH),e.G.banner.t>0){const f=Math.min(1,e.G.banner.t/.4,(2.2-e.G.banner.t)/.3);o.globalAlpha=Math.max(0,f),o.font=`700 ${Math.min(52,e.VW/12)}px 'Cormorant Garamond',serif`,o.textAlign="center",o.fillStyle="#f0c060",o.shadowColor="#000",o.shadowBlur=14,o.fillText(e.G.banner.txt,e.VW/2,e.VH*.28),o.shadowBlur=0,o.globalAlpha=1}e.G.cine&&Bl(n)}function ql(n){if(e.G.cine){if(e.G.cine.t-=n,e.G.cine.t<=0){const c=e.G.cine.fire;e.G.cine=null,c()}return}e.G.time+=n;const t=e.G.p;Dn();let[i,h]=Ur();const a=Math.hypot(i,h);if(a>1&&(i/=a,h/=a),t.moving=a>.15&&!e.G.over,t.moving&&(t.dirX=i,t.dirY=h),t.air)Hr(t,n,e.G.over?0:i,e.G.over?0:h),We(t),t.dashT<=0&&(t.dashHit=null);else if(t.dashT>0)t.dashT-=n,Fn(t,t.dvx*n,t.dvy*n,9),We(t),t.dashT<=0&&(t.dashHit=null);else if(t.moving){const c=e.holdDash&&t.dashHeld>.25&&t.stamina>0,s=(c?225:155)*(t.atkAnim>0?.45:1);c&&(t.stamina=Math.max(0,t.stamina-22*n)),Fn(t,i*s*n,h*s*n,9),t.walk+=n*(c?14:10),t.dirX=i,t.dirY=h,Math.abs(i)>.2&&(t.fx=i>0?1:-1),t.back=h<-.5&&Math.abs(i)<.6}t.air||Br(t),t.land=Math.max(0,t.land-n),e.holdDash&&(t.dashHeld+=n),e.holdDash&&t.moving||(t.stamina=Math.min(100,t.stamina+28*n)),t.atkCd-=n,t.comboT-=n,t.atkAnim=Math.max(0,t.atkAnim-n*5),t.iframes-=n,t.hurt-=n,e.G.switchCd-=n,t.shieldT>0&&(t.shieldT-=n,t.shieldT<=0&&(t.shield=0));for(const c of e.G.party)c.skillCd>0&&(c.skillCd-=n),E.P.gm.nocd&&(c.skillCd=0,c.energy=c.c.burst.cost);gl(n),Vr(n),(e.holdAtk||At.attack)&&Xc();for(let c=e.G.later.length-1;c>=0;c--){const s=e.G.later[c];s.t-=n,s.t<=0&&(e.G.later.splice(c,1),s.fn())}for(const c of e.G.enemies){if(c.isBoss){al(c,n);continue}e.G.mode==="world"&&nn(c.x,c.y,t.x,t.y)>1e3&&!c.ec||wr(c,n)}for(let c=0;c<e.G.enemies.length;c++){const s=e.G.enemies[c];if(!(s.dead||s.isBoss))for(let u=c+1;u<e.G.enemies.length;u++){const p=e.G.enemies[u];if(p.dead||p.isBoss)continue;const d=p.x-s.x,M=p.y-s.y,f=Math.hypot(d,M),N=s.r+p.r;if(f>0&&f<N){const C=(N-f)/2,P=d/f,O=M/f;Fn(s,-P*C,-O*C,s.r*.6),Fn(p,P*C,O*C,p.r*.6)}}}e.G.enemies=e.G.enemies.filter(c=>!c.dead||c.isBoss);for(const c of e.G.projs){if(c.life-=n,c.home&&c.own==="p"){const s=ji(c.x,c.y,180);if(s){const u=Math.atan2(s.y-14-c.y,s.x-c.x),p=Math.hypot(c.vx,c.vy),d=Math.atan2(c.vy,c.vx),M=Ta(d,u,n*6);c.vx=Math.cos(M)*p,c.vy=Math.sin(M)*p}}if(c.x+=c.vx*n,c.y+=c.vy*n,c.own==="p"&&c.m&&e.G.fx.length<240&&Math.random()<n*30){const s=Ui(c.m.c.id);e.G.fx.push({k:"dot",x:c.x,y:c.y,vx:-c.vx*.05,vy:-c.vy*.05,g:0,col:c.el?s.c:s.c2,life:.25,max:.25,size:c.r*.5})}if(e.G.map&&Mr(c.x,c.y+14,e.G.map)&&c.kind!=="bossorb"){const s=Math.floor((c.y+14)/A)*Z+Math.floor(c.x/A),u=e.G.map.m[s],p=e.G.map.h&&e.G.map.h[s]<=(c.h0??0);(u===j.TREE||u===j.ROCK)&&!p&&(c.life=0)}if(e.G.bounds&&(c.x<0||c.y<0||c.x>e.G.bounds.w||c.y>e.G.bounds.h)&&(c.life=0),c.own==="p"){for(const s of e.G.enemies)if(!s.dead&&nn(c.x,c.y,s.x,s.y-(s.isBoss?24:12))<c.r+s.r){lt(s,c.m,c.mult,c.el,{ang:Math.atan2(c.vy,c.vx),cast:c.cast,noEnergy:c.noEnergy}),c.life=0;break}}else nn(c.x,c.y,t.x,t.y-14)<c.r+10&&(Rt(c.dmg,c.el?K[c.el].c:"#ff7070"),c.life=0);(c.kind==="orb"||c.kind==="bossorb"||c.kind==="tbolt")&&Math.random()<.5&&e.G.fx.push({k:"dot",x:c.x,y:c.y,vx:0,vy:0,col:K[c.el||"water"].c,life:.25,max:.25,size:c.r*.5})}e.G.projs=e.G.projs.filter(c=>c.life>0);for(const c of e.G.turrets)if(c.life-=n,c.cd-=n,c.t+=n,c.cd<=0){const s=ji(c.x,c.y,340);if(s){c.cd=1;const u=Math.atan2(s.y-14-(c.y-30),s.x-c.x);e.G.projs.push({own:"p",x:c.x,y:c.y-30,vx:Math.cos(u)*520,vy:Math.sin(u)*520,r:7,life:.9,m:c.m,mult:c.mult,el:c.el,kind:"tbolt",cast:c.cast})}else c.cd=.3}e.G.turrets=e.G.turrets.filter(c=>c.life>0);for(const c of e.G.fields){if(c.life-=n,c.follow&&(c.x=t.x,c.y=t.y),c.tick-=n,c.pull)for(const s of e.G.enemies){if(s.dead||s.isBoss||s.type==="golem")continue;const u=nn(c.x,c.y,s.x,s.y);if(u<c.r&&u>8){const p=Math.atan2(c.y-s.y,c.x-s.x);Fn(s,Math.cos(p)*c.pull*n,Math.sin(p)*c.pull*n,s.r*.6)}}if(c.tick<=0){c.tick=c.ti;for(const s of e.G.enemies)!s.dead&&nn(c.x,c.y,s.x,s.y)<c.r+s.r&&lt(s,c.m,c.mult,c.el,{cast:c.cast,noKb:!0})}Math.random()<.7&&e.G.fx.push({k:"dot",x:c.x+F(-c.r,c.r)*.8,y:c.y+F(-c.r,c.r)*.5,vx:F(-30,30),vy:-F(20,60),col:K[c.el].c2,life:.6,max:.6,size:F(2,4)})}e.G.fields=e.G.fields.filter(c=>c.life>0);for(const c of e.G.pickups){if(c.t-=n,c.delay>0){c.delay-=n;continue}const s=nn(c.x,c.y,t.x,t.y-10);if(c.auto||s<110){const u=Math.atan2(t.y-10-c.y,t.x-c.x),p=c.auto?420:300;c.x+=Math.cos(u)*p*n,c.y+=Math.sin(u)*p*n}s<18&&(c.t=0,c.k==="coin"&&(e.G.loot.coin+=c.v,Kn(t.x,t.y-50,"+"+c.v+" Xu","#f0c060",12),Zt("coin","Xu",c.v,"xu","#f0c060"),Mn("coin")),c.k==="book"&&(e.G.loot.books+=c.v,Kn(t.x,t.y-50,"+"+c.v+" Sách KN","#c9a6ff",13),Zt("book","Sách kinh nghiệm",c.v,"nang-cap","#c9a6ff")),c.k==="shard"&&(t.shield=Math.max(t.shield,Dn().maxHp*.25),t.shieldMax=t.shield,t.shieldT=12,Kn(t.x,t.y-50,"Khiên tinh thể",K[c.el].c,13),Zt("shard","Khiên tinh thể",0,"khien",K[c.el].c)))}e.G.pickups=e.G.pickups.filter(c=>c.t>0);for(const c of e.G.fx)c.life-=n,c.vx!==void 0&&(c.x+=c.vx*n,c.y+=c.vy*n,c.vy+=(c.g??200)*n,c.vr&&(c.rot+=c.vr*n));e.G.fx=e.G.fx.filter(c=>c.life>0);for(const c of e.G.texts)c.life-=n,c.y+=c.vy*n,c.vy*=Math.pow(.15,n);e.G.texts=e.G.texts.filter(c=>c.life>0),e.G.banner.t>0&&(e.G.banner.t-=n),e.G.mode==="world"&&(Yr(n),ng(n)),e.G.mode==="tower"&&Dr(n);const g=ml(n),l=Math.min(1,n*X.camera.follow);e.G.cam.x+=(g.x-e.G.cam.x)*l,e.G.cam.y+=(g.y-e.G.cam.y)*l,no(),e.lastSync+=n,e.lastSync>2&&_i()}function _i(){if(e.lastSync=0,!e.G)return;const n=e.G.pending;for(const i of["kill","react","burst"])n[i]>0&&(E.req("progress",{id:i,n:n[i]}),n[i]=0);const t=e.G.loot;e.G.mode==="world"&&t&&(t.coin||t.books)&&(E.req("reward",{coin:t.coin,books:t.books}),t.coin=t.books=0)}function Jc(){e.G.cam.x=e.G.p.x,e.G.cam.y=e.G.p.y-20,no()}function no(){const n=e.VW/e.ZOOM/2,t=e.VH/e.ZOOM/2,i=e.G.map?Z*A:e.G.bounds.w,h=e.G.map?mn*A:e.G.bounds.h;e.G.cam.x=i<n*2?i/2:En(e.G.cam.x,n,i-n),e.G.cam.y=h<t*2?h/2:En(e.G.cam.y,t,h-t)}function to(n){const t=Math.min(.05,(n-e.lastT)/1e3);e.lastT=n;try{Tg(),e.scene==="play"&&e.G&&!e.paused&&(ql(Yg(t)),dl(t)),vl(t),Ol(),e.scene==="play"&&e.G&&Lr()}catch(i){console.error(i)}requestAnimationFrame(to)}function We(n){if(n.dashHit){for(const t of e.G.enemies)t.dead||n.dashHit.set.has(t)||nn(n.x,n.y,t.x,t.y)<50+t.r&&(n.dashHit.set.add(t),lt(t,n.dashHit.m,n.dashHit.mult,n.dashHit.el,{cast:n.dashHit.cast,kb:140}));e.G.fx.push({k:"dot",x:n.x+F(-6,6),y:n.y-14+F(-8,8),vx:0,vy:0,col:K[n.dashHit.el].c,life:.3,max:.3,size:5})}}function yi(n,t){const i=v("div",{class:"tt-md"});for(const h of n)if(h.t==="p")i.append(Ii("p",Ti(h.text)));else if(h.t==="h")i.append(Ii(h.level<=3?"h4":"h5",Ti(h.text)));else if(h.t==="list"){const a=v("ul");for(const g of h.items)a.append(Ii("li",Ti(g)));i.append(a)}else h.t==="table"&&i.append($l(h.head,h.rows,t));return i}function Ii(n,t){const i=document.createElement(n);return i.innerHTML=t,i}const Il=/^["“].*["”]$/;function $l(n,t,i){if(!!i&&t.length>0&&t.every(c=>Il.test(vh(c[c.length-1]??"").trim()))){const c=v("ul",{class:"tt-lines"});for(const s of t){const u=vh(s.length>2?s[1]:s[0]),p=vh(s[s.length-1]).trim().replace(/^["“]|["”]$/g,""),d=v("button",{type:"button",class:"tt-line-btn"},[Tn("am-thanh",{size:16}),v("span",{class:"situ"},[u])]);d.addEventListener("click",()=>i(u,p)),c.append(v("li",{},[d]))}return c}const a=v("table",{class:"tt-table"}),g=v("tr");for(const c of n)g.append(Ii("th",Ti(c)));a.append(v("thead",{},[g]));const l=v("tbody");for(const c of t){const s=v("tr");for(const u of c)s.append(Ii("td",Ti(u)));l.append(s)}return a.append(l),v("div",{class:"tt-table-wrap"},[a])}function Da(n,t,i){const h=v("div",{class:"tt-sections"});return n.forEach((a,g)=>{const l=t(g),c=a.title.replace(/^\d+\.\s*/,"");l===!0?h.append(v("section",{class:"tt-sec"},[v("h4",{class:"tt-h4"},[c]),yi(a.blocks,i)])):h.append(v("section",{class:"tt-sec is-locked"},[v("h4",{class:"tt-h4"},[Tn("khoa",{size:16})," ",c]),v("p",{class:"tt-dim"},[`Mở khi Thân thiết đạt cấp ${l}.`])]))}),h}function zl(){const n=v("b",{class:"who"}),t=v("span",{class:"txt","aria-live":"polite"}),i=v("div",{class:"tt-say",hidden:!0},[n,t]);let h="",a=0,g=0;const l=()=>{clearInterval(g),t.textContent=h};return i.addEventListener("click",()=>a<h.length?(a=h.length,l()):i.hidden=!0),{el:i,say(c,s){if(clearInterval(g),i.hidden=!1,n.textContent=c,h=s,a=0,t.textContent="",matchMedia("(prefers-reduced-motion: reduce)").matches)return l();g=window.setInterval(()=>{a+=1,t.textContent=h.slice(0,a),a>=h.length&&clearInterval(g)},28)},stop:()=>clearInterval(g)}}const Ki=[{id:"info",label:"Thông tin",icon:"thong-tin"},{id:"stats",label:"Chỉ số",icon:"nang-cap"},{id:"skills",label:"Kỹ năng",icon:"ky-nang"},{id:"cons",label:"Nét Sao",icon:"net-sao"},{id:"profile",label:"Hồ sơ",icon:"huong-dan"}];let ot=null,ct="info",Gh=null;function io(){const n=E.P;return[...hc].sort((t,i)=>+!!n.owned[i.id]-+!!n.owned[t.id]||i.r-t.r).map(t=>t.id)}function Hh(n){const t=io();ot=t[(t.indexOf(ot)+n+t.length)%t.length],an(),setTimeout(()=>document.querySelector(`.tt-menu-chars [data-id="${ot}"]`)?.focus(),0)}function Wl(n){ct=Ki[(Ki.findIndex(t=>t.id===ct)+n+Ki.length)%Ki.length].id,an(),setTimeout(()=>document.querySelector(".tt-char-detail .tt-tab[aria-selected=true]")?.focus(),0)}function Qe(n,t,i,h){const a=document.createElement("canvas");return a.width=t,a.height=i,a.getContext("2d").drawImage(Mi(n,t,i,h),0,0),a}async function Ql(n,t){const i=E.P;t.id&&Qn[t.id]&&(ot=t.id,t.id=null),t.tab&&(ct=t.tab,t.tab=null);const h=io();(!ot||!Qn[ot])&&(ot=i.party[0]??h[0]);const a=Qn[ot];n.classList.add("tt-menu-chars");const g=v("div",{class:"tt-roster",role:"listbox","aria-label":"Danh sách nhân vật"});for(const O of h){const q=Qn[O],tn=i.owned[O],hn=ic({name:q.name,rarity:q.r,el:q.el,elName:K[q.el]?.vi??q.el,level:tn?.lv,netSao:tn?.cons,art:Qe(O,96,96,"head"),locked:!tn,selected:O===ot});hn.dataset.id=O,hn.setAttribute("role","option"),hn.setAttribute("aria-selected",String(O===ot)),hn.addEventListener("click",()=>{ot=O,an()}),g.append(hn)}const l=v("div",{class:"tt-char-detail","data-id":a.id}),c=i.owned[a.id],s=i.affinity[a.id]??0,u=Hg(s),p=Bg(s),d=v("div",{class:"tt-char-head"},[v("div",{class:"splash","data-r":a.r},[Qe(a.id,300,400,"splash")]),v("div",{class:"who"},[v("div",{class:"eyebrow"},[$i(a.r,14),Wh(a.el,{label:!0,name:K[a.el]?.vi})," ",ph[a.w]?.vi??""]),v("h3",{class:"tt-h2 name"},[a.name]),v("p",{class:"tt-dim"},[a.title]),c?v("div",{class:"aff"},[v("span",{},[`Thân thiết cấp ${u}`]),Oa(p===null?1:(s-(pn.affinity.levels[u-2]??0))/((pn.affinity.levels[u-1]??1)-(pn.affinity.levels[u-2]??0)),{kind:"thin",label:"Độ thân thiết"}),v("small",{class:"tt-dim"},[p===null?"Đã thân thiết tối đa":`Còn ${Math.ceil(p)} điểm tới cấp sau`])]):st("Chưa có","warn"),v("div",{class:"nav"},[en("Người trước",{variant:"ghost",icon:"quay-lai",iconOnly:!0,onClick:()=>Hh(-1)}),v("span",{class:"tt-dim"},[`${h.indexOf(a.id)+1}/${h.length}`]),en("Người sau",{variant:"ghost",icon:"tiep",iconOnly:!0,onClick:()=>Hh(1)})])])]),M=v("div",{class:"tt-tabpanel",role:"tabpanel"}),f=ii(Ki,ct,O=>{O!==ct&&(ct=O,an())});l.append(d,f,M),n.append(g,l);let N=0,C=0;d.addEventListener("pointerdown",O=>(N=O.clientX,C=O.clientY)),d.addEventListener("pointerup",O=>{const q=O.clientX-N;Math.abs(q)>50&&Math.abs(q)>Math.abs(O.clientY-C)*1.5&&Hh(q<0?1:-1)});const P=zi(a.id);if(ct==="info"){if(M.append(v("p",{},[a.desc])),c){const tn=zo(c.lv),hn=v("div",{class:"tt-row"});c.lv<60?hn.append(en(`Lên 1 cấp · ${tn.books} Sách, ${Rn(tn.coin)} Xu`,{variant:"primary",icon:"nang-cap",onClick:()=>je(a.id,1)}),en("Lên 10 cấp",{onClick:()=>je(a.id,10)})):hn.append(st("Đã đạt cấp tối đa","ok")),M.append(v("p",{class:"tt-dim"},[`Cấp ${c.lv}/60 · Nét Sao N${c.cons}`]),hn)}else M.append(v("p",{class:"tt-dim"},["Chưa sở hữu. Ước nguyện để gặp nhân vật này."]));const q=(wi(a.id)?(await Ei(a.id))["ho-so"]:null)?.sections[0];q&&M.append(v("h4",{class:"tt-h4"},[q.title.replace(/^\d+\.\s*/,"")]),yi(q.blocks))}else if(ct==="stats"){const O=[["Cấp",`${P.lv}/60`],["Máu",Rn(P.hp)],["Tấn công",Rn(P.atk)],["Tỉ lệ chí mạng",`${Math.round(P.crit*100)}%`],["Sát thương chí mạng",`${Math.round(P.cdmg*100)}%`],["Nét Sao",`N${P.cons} (+${P.cons*10}% máu và tấn công)`],["Nguyên tố",K[a.el]?.vi??a.el],["Vũ khí",ph[a.w]?.vi??a.w]];M.append(v("dl",{class:"tt-stats"},O.flatMap(([q,tn])=>[v("dt",{},[q]),v("dd",{},[tn])])))}else if(ct==="skills"){const O=a.skill,q=a.burst;M.append(pa(`Đánh thường · ${ph[a.w]?.vi??""}`,`Combo 3 đòn, đòn thứ 3 mang nguyên tố ${K[a.el]?.vi}.`),pa(`Kỹ năng · ${O.name} · hồi ${O.cd} giây`,Oo[O.type]?.(O.m)??""),pa(`Nộ · ${q.name} · ${q.cost} năng lượng`,qo[q.type]?.(q.m)??""));const tn=wi(a.id)?(await Ei(a.id))["ky-nang-truyen"]:null;if(tn){const hn=Ee("ky-nang-truyen",0);M.append(v("h4",{class:"tt-h4"},["Chuyện kỹ năng"])),M.append(u>=hn&&c?Da(tn.sections,()=>!0):v("p",{class:"tt-dim"},[`Mở khi Thân thiết đạt cấp ${hn}.`]))}}else if(ct==="cons"){const O=wi(a.id)?(await Ei(a.id))["cung-menh"]:null,q=[...O?.intro??[],...O?.sections.flatMap(hn=>hn.blocks)??[]].find(hn=>hn.t==="table");O?.intro[0]?.t==="p"&&M.append(yi([O.intro[0]]));const tn=v("ol",{class:"tt-cons"});for(let hn=1;hn<=6;hn++){const $n=q?.rows.find(Xn=>Xn[0]?.trim()===`N${hn}`),yn=(c?.cons??-1)>=hn;tn.append(v("li",{class:yn?"is-on":""},[v("span",{class:"n"},[`N${hn}`]),v("div",{},[yi([{t:"p",text:$n?`**${$n[1].replace(/\*\*/g,"")}**`:`Nét Sao ${hn}`}]),$n&&yn?yi([{t:"p",text:$n[2]}]):v("p",{class:"tt-dim"},[yn?"":"Nhận thêm bản nhân vật này qua Ước nguyện để thắp nét sao."]),v("small",{class:"tt-dim"},["+10% máu và tấn công"])])]))}M.append(tn)}else if(ct==="profile")if(!wi(a.id))M.append(v("p",{class:"tt-dim"},["Hồ sơ của nhân vật này đang được biên soạn."]));else{const O=await Ei(a.id);Gh=zl();const q=c?u:0;for(const tn of pn.profile){const hn=O[tn.file];if(!hn)continue;const $n=v("details",{class:"tt-prof",open:tn.file==="ho-so"},[v("summary",{},[tn.name,q<tn.level?st(`Thân thiết ${tn.level}`,"warn"):null])]);$n.append(Da(hn.sections,yn=>{const Xn=Ee(tn.file,yn);return q>=Xn?!0:Xn},(yn,Xn)=>Gh.say(`${a.name} · ${yn}`,Xn))),M.append($n)}M.append(Gh.el)}}function pa(n,t){return v("div",{class:"tt-kit"},[v("h4",{class:"tt-h4"},[n]),v("p",{},[t])])}function je(n,t){if(!E.req("levelUp",{id:n,times:t}).ok)return;const h=e.G?.party?.find(a=>a.id===n);if(h){const a=zi(n);h.hp=h.alive?Math.round(h.hp/h.maxHp*a.hp):h.hp,h.st=a,h.maxHp=a.hp}an()}ht("chars",{title:"Nhân vật",icon:"nhan-vat",render:Ql,onKey(n){const t=document.activeElement;return t?.closest("details, .tt-tabpanel")&&(n.key==="ArrowLeft"||n.key==="ArrowRight")?!1:n.key==="ArrowLeft"||n.key==="ArrowRight"?t?.closest(".tt-roster")?!1:(Hh(n.key==="ArrowRight"?1:-1),!0):n.key==="q"||n.key==="e"?(Wl(n.key==="e"?1:-1),!0):!1},onClose:()=>Gh?.stop()});let qn=-1,wn=[],dt=0,wt=!1;const ho=()=>ec(e.G,pn.combatLock.radius);function Xe(n,t=72){const i=document.createElement("canvas");return i.width=i.height=t,i.getContext("2d").drawImage(Mi(n,t,t,"head"),0,0),i}function Bh(n){qn=n,wn=[...E.P.teams[n]??[]],dt=Math.min(wn.length,3),wt=!1}function Ye(n,t,i){const h=[...n],a=h.indexOf(i);return a>=0?([h[a],h[t]]=[h[t],h[a]],h.filter(Boolean)):(t>=h.length?h.push(i):h[t]=i,h.slice(0,4))}function sh(n){wn=n,wt=!0,an()}function Fe(n){const t=ho();if((qn===E.P.team||n)&&t)return Tt(pn.combatLock.message,"warn");E.req("setTeam",{idx:qn,party:wn}).ok&&(wt=!1,n&&E.req("useTeam",{idx:qn}).ok?Tt(`Đã dùng Đội ${qn+1}`,"ok"):Tt(`Đã lưu Đội ${qn+1}`,"ok"),e.G?.mode==="world"&&(n||qn===E.P.team)&&(e.G.party=Nc(),e.G.act=0,Ot()),an())}function jl(n,t){const i=E.P;t.idx!==void 0&&(Bh(t.idx),delete t.idx),qn<0&&Bh(i.team);const h=ho();n.classList.add("tt-menu-team");const a=ii(i.teams.map((d,M)=>({id:String(M),label:`Đội ${M+1}${M===i.team?" · đang dùng":""}`})),String(qn),d=>{Number(d)!==qn&&(Bh(Number(d)),an())}),g=h?v("div",{class:"tt-banner is-warn",role:"alert",id:"teamLock"},[Tn("canh-bao",{size:20}),pn.combatLock.message]):null,l=v("ol",{class:"tt-slots","aria-label":"Bốn ô trong đội"});for(let d=0;d<4;d++){const M=wn[d],f=M?Qn[M]:null,N=v("button",{type:"button",class:"tt-tslot"+(d===dt?" is-sel":"")+(f?"":" is-empty"),"aria-pressed":String(d===dt),"aria-label":f?`Ô ${d+1}: ${f.name}`:`Ô ${d+1}: trống`,"data-slot":d,draggable:f?"true":"false"},f?[v("span",{class:"k"},[String(d+1)]),Xe(f.id),v("span",{class:"nm"},[f.name]),v("small",{},[Wh(f.el,{size:14,name:K[f.el]?.vi}),` Cấp ${zi(f.id).lv}`])]:[v("span",{class:"k"},[String(d+1)]),Tn("them",{size:28}),v("span",{class:"nm"},["Trống"])]);N.addEventListener("click",()=>{dt=d,an()}),N.addEventListener("dragstart",C=>C.dataTransfer.setData("text/plain",`slot:${d}`)),N.addEventListener("dragover",C=>{C.preventDefault(),N.classList.add("is-over")}),N.addEventListener("dragleave",()=>N.classList.remove("is-over")),N.addEventListener("drop",C=>{C.preventDefault();const P=C.dataTransfer.getData("text/plain");if(P.startsWith("slot:")){const O=Number(P.slice(5)),q=[...wn];q[O]&&q[d]?[q[O],q[d]]=[q[d],q[O]]:q[O]&&q.push(q.splice(O,1)[0]),sh(q.filter(Boolean))}else P.startsWith("char:")&&sh(Ye(wn,d,P.slice(5)))}),l.append(v("li",{},[N]))}const c=wn.map(d=>Qn[d]?.el??""),s=v("p",{class:"tt-react",id:"teamReact"},[Tn("sao",{size:18}),Wo(c)]),u=v("div",{class:"tt-row"},[en("Bỏ khỏi ô",{variant:"ghost",icon:"bot",disabled:!wn[dt],onClick:()=>sh(wn.filter((d,M)=>M!==dt))}),en(wt?"Lưu đội":"Đã lưu",{icon:"xac-nhan",disabled:!wt||qn===i.team&&h,onClick:()=>Fe(!1)}),en(qn===i.team&&!wt?"Đang dùng":"Dùng đội này",{variant:"primary",icon:"doi-nguoi",disabled:h||!wn.length||qn===i.team&&!wt,onClick:()=>Fe(!0)})]);u.lastElementChild.id="teamUse";const p=v("div",{class:"tt-roster tt-roster--grid","aria-label":"Nhân vật đã có"});for(const d of Object.keys(i.owned)){const M=Qn[d];if(!M)continue;const f=ic({name:M.name,rarity:M.r,el:M.el,elName:K[M.el]?.vi??M.el,level:zi(d).lv,netSao:i.owned[d].cons,art:Xe(d,96),selected:wn.includes(d)});f.dataset.id=d,f.draggable=!0,f.addEventListener("dragstart",N=>N.dataTransfer.setData("text/plain",`char:${d}`)),f.addEventListener("click",()=>{wn.includes(d)&&wn[dt]===d||(sh(Ye(wn,dt,d)),dt=Math.min(wn.length,3))}),p.append(f)}n.append(a,g??"",v("div",{class:"tt-team-grid"},[v("section",{class:"tt-panel"},[l,s,v("p",{class:"tt-dim"},["Kéo nhân vật vào ô, hoặc chọn một ô rồi chọn người. Q/E đổi đội."]),u,wt?st("Chưa lưu","warn"):""]),v("section",{class:"tt-panel"},[v("h3",{class:"tt-h3"},["Nhân vật"]),p])]))}ht("team",{title:"Đội hình",icon:"doi-hinh",render:jl,onKey(n){return n.key==="q"||n.key==="e"?(Bh((qn+(n.key==="e"?1:3))%4),an(),!0):/^[1-4]$/.test(n.key)?(dt=Number(n.key)-1,an(),!0):!1},onClose(){qn=-1}});let Xt="banner",uh=0;function Ue(n){const t=E.req("pull",{count:n});t.ok&&(Wi(),Og(t.data,()=>{an(),document.getElementById(n===1?"wish1":"wish10")?.focus()}))}function Xl(n){const t=E.P,i=t.cfg,h=Qn[i.featured]??Object.values(Qn)[0];n.classList.add("tt-menu-wish");const a=ii([{id:"banner",label:"Banner",icon:"uoc-nguyen"},{id:"rates",label:"Tỉ lệ",icon:"thong-tin"},{id:"hist",label:"Lịch sử",icon:"lich-su"}],Xt,s=>{s!==Xt&&(Xt=s,an())}),g=v("div",{class:"tt-tabpanel",role:"tabpanel"});if(Xt==="banner"){const s=document.createElement("canvas");s.width=520,s.height=520,s.getContext("2d").drawImage(Mi(h.id,520,520,"splash"),0,0),g.append(v("div",{class:"tt-banner-card","data-el":h.el},[v("div",{class:"txt"},[v("p",{class:"tt-eyebrow"},["Ước nguyện có hạn · Nhân vật nổi bật"]),v("h3",{class:"tt-h1"},[h.name]),v("p",{class:"tt-dim"},[h.title]),v("div",{class:"meta"},[$i(h.r,16),Wh(h.el,{label:!0,name:K[h.el]?.vi})]),v("p",{},[h.desc]),v("p",{class:"pity",id:"wishPity"},[`Bảo Hộ Vận Sao: ${t.pity5}/${i.hard} lần tới 5★ · ${t.pity4}/10 lần tới 4★`,t.guaranteed?v("b",{},[` · Lần 5★ tới chắc chắn là ${h.name}`]):""])]),v("div",{class:"art"},[s])]))}else if(Xt==="rates")g.append(v("dl",{class:"tt-stats"},[v("dt",{},["5★"]),v("dd",{},[`${i.rate5}% mỗi lần, tăng dần từ lần ${i.soft}, chắc chắn ở lần ${i.hard}`]),v("dt",{},["5★ nổi bật"]),v("dd",{},[`50% là ${h.name}; nếu trượt, lần 5★ sau chắc chắn là ${h.name}`]),v("dt",{},["4★"]),v("dd",{},[`${i.rate4}% mỗi lần, chắc chắn ít nhất 1 lần trong mỗi 10 lần`]),v("dt",{},["3★"]),v("dd",{},["Phần còn lại, mỗi vật phẩm 3★ đổi thành 500 Xu"]),v("dt",{},["Trùng nhân vật"]),v("dd",{},["+1 Nét Sao (tối đa N6, mỗi nét +10% máu và tấn công)"])]));else{const s=v("div",{class:"tt-row",role:"group","aria-label":"Lọc theo độ hiếm"});for(const[d,M]of[[0,"Tất cả"],[5,"5★"],[4,"4★"],[3,"3★"]]){const f=en(M,{variant:uh===d?"primary":"ghost"});f.setAttribute("aria-pressed",String(uh===d)),f.addEventListener("click",()=>(uh=d,an())),s.append(f)}const u=Qo(t.history,uh),p=v("ol",{class:"tt-hist",id:"wishHist"});for(const d of u.slice(0,120))p.append(v("li",{"data-r":d.r},[v("span",{class:"r"},["★".repeat(d.r)]),v("span",{class:"n"},[d.n]),v("time",{},[new Date(d.t).toLocaleString("vi-VN",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit"})])]));g.append(s,u.length?p:v("p",{class:"tt-dim"},[t.history.length?"Không có lần ước nào khớp bộ lọc.":"Chưa có lần ước nào."]))}const l=en(`Ước 1 lần · ${Rn(i.cost)} Đá Sao`,{icon:"da-sao",disabled:t.gems<i.cost,onClick:()=>Ue(1)});l.id="wish1";const c=en(`Ước 10 lần · ${Rn(i.cost*10)} Đá Sao`,{variant:"primary",icon:"da-sao",disabled:t.gems<i.cost*10,onClick:()=>Ue(10)});c.id="wish10",n.append(a,g,v("div",{class:"tt-wish-actions"},[v("p",{class:"tt-dim"},[Tn("da-sao",{size:16}),` Đang có ${Rn(t.gems)} Đá Sao`]),l,c]))}ht("wish",{title:"Ước nguyện",icon:"uoc-nguyen",render:Xl,onKey(n){if(n.key!=="q"&&n.key!=="e")return!1;const t=["banner","rates","hist"];return Xt=t[(t.indexOf(Xt)+(n.key==="e"?1:2))%3],an(),!0}});let Wt="all",mh="rarity",Pt=null;const Yl=[["rarity","Độ hiếm"],["name","Tên"],["qty","Số lượng"]];function Fl(n=E.P){return Ia.map(t=>({id:t.id,name:t.name,type:t.type,r:t.rarity,qty:t.profileKey?Number(n[t.profileKey]??0):n.bag[t.id]??0})).filter(t=>t.qty>0)}function Ul(n){n.classList.add("tt-menu-bag");const t=Fl(),i=Di.items.types.filter(u=>t.some(p=>p.type===u.id));Wt!=="all"&&!i.some(u=>u.id===Wt)&&(Wt="all");const h=ii([{id:"all",label:"Tất cả",icon:"tui-do"},...i.map(u=>({id:u.id,label:u.name,icon:u.icon}))],Wt,u=>{u!==Wt&&(Wt=u,Pt=null,an())}),a=v("div",{class:"tt-row",role:"group","aria-label":"Sắp xếp"},[v("span",{class:"tt-dim"},["Sắp xếp:"]),...Yl.map(([u,p])=>{const d=en(p,{variant:mh===u?"primary":"ghost"});return d.setAttribute("aria-pressed",String(mh===u)),d.addEventListener("click",()=>(mh=u,an())),d})]),g=jo(t,Wt,mh);(!Pt||!g.some(u=>u.id===Pt))&&(Pt=g[0]?.id??null);const l=v("div",{class:"tt-bag-grid",id:"bagGrid",role:"list"});for(const u of g){const p=Di.items.types.find(M=>M.id===u.type),d=v("button",{type:"button",class:"tt-bag-cell"+(u.id===Pt?" is-sel":""),"data-r":u.r,"data-id":u.id,role:"listitem","aria-pressed":String(u.id===Pt)},[Tn(p?.icon??"tui-do",{size:34}),v("span",{class:"q"},[`×${u.qty}`]),v("span",{class:"nm"},[u.name])]);d.addEventListener("click",()=>(Pt=u.id,an())),l.append(d)}const c=Ia.find(u=>u.id===Pt),s=c?v("aside",{class:"tt-panel tt-bag-detail",id:"bagDetail","data-r":c.rarity},[v("h3",{class:"tt-h2"},[c.name]),$i(c.rarity,16),v("div",{class:"tt-row"},[st(Di.items.types.find(u=>u.id===c.type)?.name??c.type),st(c.region),c.weapon?st(c.weapon):""]),v("p",{class:"tt-story"},[c.story]),v("p",{class:"tt-dim"},[`Đang có: ${g.find(u=>u.id===c.id)?.qty??0}`]),v("p",{class:"tt-dim"},["Vật phẩm này để sưu tầm và đọc chuyện; cách dùng sẽ có ở bản sau."])]):v("aside",{class:"tt-panel tt-empty"},[Tn("tui-do",{size:40}),v("p",{},["Túi đồ trống. Mở rương và hạ quái để tìm vật phẩm."])]);n.append(h,a,v("div",{class:"tt-bag"},[g.length?l:v("div"),s]))}ht("bag",{title:"Túi đồ",icon:"tui-do",render:Ul});let Vi="active",Vt=null;const Ze={chinh:"Cốt truyện",phu:"Phụ","hang-ngay":"Hằng ngày"};function Zl(n){yr(),n.classList.add("tt-menu-quests");const t=E.P,i=qa.map(s=>({q:s,st:Ua(s)})),h=i.filter(s=>Vi==="done"?s.st.done:!s.st.done),a=ii([{id:"active",label:`Đang làm (${i.filter(s=>!s.st.done).length})`,icon:"nhiem-vu"},{id:"done",label:`Đã xong (${i.filter(s=>s.st.done).length})`,icon:"xac-nhan"}],Vi,s=>{s!==Vi&&(Vi=s,Vt=null,an())});(!Vt||!h.some(s=>s.q.id===Vt))&&(Vt=h.find(s=>s.q.id===t.quests.tracked)?.q.id??h[0]?.q.id??null);const g=v("ul",{class:"tt-qlist",id:"questList"});for(const{q:s,st:u}of h){const p=v("button",{type:"button",class:"tt-qitem"+(s.id===Vt?" is-sel":""),"data-id":s.id,"aria-pressed":String(s.id===Vt)},[v("span",{class:"nm"},[s.name]),v("small",{},[Ze[s.type]??s.type,t.quests.tracked===s.id?" · Đang theo dõi":"",u.done?" · Đã xong":""])]);p.addEventListener("click",()=>(Vt=s.id,an())),g.append(v("li",{},[p]))}const l=i.find(s=>s.q.id===Vt);let c;if(!l)c=v("aside",{class:"tt-panel tt-empty"},[Tn("nhiem-vu",{size:40}),v("p",{},[Vi==="done"?"Chưa xong nhiệm vụ nào.":"Không còn nhiệm vụ đang làm."])]);else{const{q:s,st:u}=l,p=t.quests.tracked===s.id,d=v("ol",{class:"tt-qsteps"},u.steps.map((N,C)=>v("li",{class:N.n>=N.max?"is-done":C===u.cur?"is-cur":""},[Tn(N.n>=N.max?"xac-nhan":"nhiem-vu",{size:16}),v("span",{},[xc(N)]),N.max>1?Oa(N.n/N.max,{label:`${N.n}/${N.max}`}):""]))),M=u.steps[u.cur],f=u.done?v("p",{class:"tt-dim"},["Đã hoàn thành."]):v("div",{class:"tt-row"},[en(p?"Bỏ theo dõi":"Theo dõi",{variant:p?"ghost":"primary",icon:"nhiem-vu",onClick:()=>{E.req("trackQuest",{id:p?null:s.id}),p||Tt(`Đang theo dõi: ${s.name}`,"ok"),an()}}),M?.target?en("Chỉ đường",{icon:"ban-do",onClick:()=>{E.req("trackQuest",{id:s.id}),Mt("map",{focus:M.target})}}):""]);f.firstElementChild?.setAttribute("id","questTrack"),c=v("article",{class:"tt-panel tt-qdetail",id:"questDetail"},[v("div",{class:"tt-row"},[st(Ze[s.type]??s.type,s.type==="chinh"?"ok":void 0),p?st("Đang theo dõi","ok"):""]),v("h3",{class:"tt-h2"},[s.name]),v("p",{class:"tt-dim"},[`Người giao: ${s.giver}`]),v("p",{class:"tt-story"},[s.desc]),d,v("p",{},[v("b",{},["Phần thưởng: "]),s.reward]),f])}n.append(a,v("div",{class:"tt-quests"},[g,c]))}ht("quests",{title:"Nhiệm vụ",icon:"nhiem-vu",render:Zl});const ao={statue:"#9fe8ff",chest:"#f0c060",tower:"#ffd27a",gate:"#5aa0ff",npc:"#ff9ad5",mark:"#7dffb2",you:"#ffffff"},Jl=[["statue","Bia Đá (chạm vào để dịch chuyển)"],["chest","Rương đã thấy, chưa mở"],["tower","Cổng Tháp Tinh Tú"],["gate","Hang Hắc Giao"],["npc","Nhân vật quan trọng"],["mark","Điểm bạn đánh dấu"]],gn={z:1,x:Z/2,y:mn/2};let xn=null,un=null;const eo=(n,t=E.P,i=e.WORLD)=>n===0||!!i?.statues[n]&&ui(t.fog,i.statues[n].x,i.statues[n].y);function co(){const n=e.G?.map??e.WORLD,t=E.P,i=[];if(!n)return i;n.statues.forEach((h,a)=>{eo(a)&&i.push({kind:"statue",x:h.x+.5,y:h.y+.5,name:`Bia Đá ${a+1}`,info:"Hồi phục đội, lưu điểm hồi sinh.",i:a})}),n.chests.forEach((h,a)=>{!t.chests.includes(a)&&ui(t.fog,h.x,h.y)&&i.push({kind:"chest",x:h.x+.5,y:h.y+.5,name:"Rương báu",info:"Đã thấy nhưng chưa mở.",i:a})}),ui(t.fog,n.tower.x,n.tower.y)&&i.push({kind:"tower",x:n.tower.x+.5,y:n.tower.y+.5,name:"Cổng Tháp Tinh Tú",info:"Lối vào Tháp Tinh Tú."}),ui(t.fog,n.gate.x,n.gate.y)&&i.push({kind:"gate",x:n.gate.x+.5,y:n.gate.y+.5,name:"Hang Hắc Giao",info:"Nơi ác long đang ngủ."});for(const h of pn.npcs){const a=za(h.at,n);a&&ui(t.fog,a[0],a[1])&&i.push({kind:"npc",x:a[0],y:a[1],name:h.name,info:h.role})}return t.marks.forEach((h,a)=>i.push({kind:"mark",x:h.x,y:h.y,name:h.label,info:"Điểm đánh dấu của bạn.",i:a})),e.G?.p&&i.push({kind:"you",x:e.G.p.x/A,y:e.G.p.y/A,name:"Vị trí của bạn"}),i}function oo(n){const t=e.G?.map??e.WORLD;if(!t)return null;if(n==="tower"||n==="gate")return za(n,t);const i=e.G?.p?[e.G.p.x/A,e.G.p.y/A]:[t.cx,t.cy],h=n==="statue"?t.statues:n==="chest"?t.chests.filter((l,c)=>!E.P.chests.includes(c)):n==="camp"?t.camps:[];let a=null,g=1/0;for(const l of h){const c=Math.hypot(l.x-i[0],l.y-i[1]);c<g&&(g=c,a=l)}return a?[a.x+.5,a.y+.5]:null}const $h=()=>un?Math.min(un.width,un.height)/Z*gn.z:1,ns=(n,t)=>{const i=$h();return[gn.x+(n-un.width/2)/i,gn.y+(t-un.height/2)/i]};function ae(){gn.z=En(gn.z,pn.map.zoomMin,pn.map.zoomMax),gn.x=En(gn.x,0,Z),gn.y=En(gn.y,0,mn)}function pi(){if(!un||!un.isConnected)return;const n=un.getContext("2d"),t=e.G?.map??e.WORLD,i=$h(),h=un.width,a=un.height,g=p=>h/2+(p-gn.x)*i,l=p=>a/2+(p-gn.y)*i;if(n.fillStyle="#070b1c",n.fillRect(0,0,h,a),!t)return;n.imageSmoothingEnabled=!1,n.drawImage(t.mini,g(0),l(0),Z*i,mn*i);const c=E.P.fog;n.fillStyle="rgba(6,9,24,.92)";for(let p=0;p<Lt;p++)for(let d=0;d<Lt;d++)c[p*Lt+d]!=="1"&&n.fillRect(Math.floor(g(d*Yt)),Math.floor(l(p*Yt)),Math.ceil(Yt*i)+1,Math.ceil(Yt*i)+1);const s=Lc()?.target??e.G?.objTarget,u=s?oo(s):null;u&&(n.strokeStyle="#7dffb2",n.lineWidth=2,n.beginPath(),n.arc(g(u[0]),l(u[1]),12+Math.sin(performance.now()/200)*2,0,B),n.stroke());for(const p of co()){const d=p.kind==="chest"?4:p.kind==="you"?6:7;n.fillStyle="#000",n.beginPath(),n.arc(g(p.x),l(p.y),d+2,0,B),n.fill(),n.fillStyle=ao[p.kind],n.beginPath(),p.kind==="mark"?(n.moveTo(g(p.x),l(p.y)-d-3),n.lineTo(g(p.x)+d,l(p.y)),n.lineTo(g(p.x),l(p.y)+d+3),n.lineTo(g(p.x)-d,l(p.y))):n.arc(g(p.x),l(p.y),d,0,B),n.fill(),xn&&xn.kind===p.kind&&xn.i===p.i&&Math.abs(xn.x-p.x)<.01&&(n.strokeStyle="#fff",n.lineWidth=2,n.beginPath(),n.arc(g(p.x),l(p.y),d+6,0,B),n.stroke())}xn?.kind==="point"&&(n.strokeStyle="#fff",n.lineWidth=2,n.beginPath(),n.moveTo(g(xn.x)-8,l(xn.y)),n.lineTo(g(xn.x)+8,l(xn.y)),n.moveTo(g(xn.x),l(xn.y)-8),n.lineTo(g(xn.x),l(xn.y)+8),n.stroke())}function go(n,t){const i=2.2/gn.z+.8;let h=null,a=i;for(const l of co()){const c=Math.hypot(l.x-n,l.y-t);c<a&&(a=c,h=l)}const g=e.G?.map??e.WORLD;xn=h??(g&&ui(E.P.fog,n,t)?{kind:"point",x:n,y:t,name:"Vùng đã khám phá"}:{kind:"point",x:n,y:t,name:"Vùng chưa khám phá"}),an()}function ts(n){const t=e.G,i=t?.map?.statues[n];return!t||t.mode!=="world"||!i?!1:eo(n)?ec(t,pn.combatLock.radius)?(Tt("Không thể dịch chuyển khi đang chiến đấu","warn"),!1):(t.p.x=(i.x+.5)*A,t.p.y=(i.y+2.5)*A,t.p.vx=t.p.vy=0,t.respawn={x:t.p.x,y:t.p.y},t.cam&&(t.cam.x=t.p.x,t.cam.y=t.p.y),Dt(),Tt(`Đã dịch chuyển tới Bia Đá ${n+1}`,"ok"),!0):(Tt("Bia Đá này chưa được mở","warn"),!1)}function is(){const n=v("aside",{class:"tt-panel tt-map-side"});if(xn){const i=xn,h=v("div",{class:"tt-row"});if(i.kind==="statue"){const a=en("Dịch chuyển",{variant:"primary",icon:"bia-da",onClick:()=>ts(i.i)});a.id="mapTravel",h.append(a)}if(i.kind==="mark")h.append(en("Xóa đánh dấu",{variant:"ghost",icon:"dong",onClick:()=>{E.req("delMark",{i:i.i}).ok&&(xn=null),an()}}));else if(i.kind!=="you"){const a=en("Đánh dấu tại đây",{icon:"sao",onClick:()=>{const g=E.req("addMark",{x:+i.x.toFixed(2),y:+i.y.toFixed(2),label:i.kind==="point"?`Điểm ${E.P.marks.length+1}`:i.name});g.ok&&(xn={kind:"mark",x:i.x,y:i.y,name:g.data.at(-1).label,i:g.data.length-1}),an()}});a.id="mapMark",h.append(a)}n.append(v("h3",{class:"tt-h3",id:"mapSel"},[i.name]),i.info?v("p",{class:"tt-dim"},[i.info]):"",h)}else n.append(v("p",{class:"tt-dim"},["Chọn một điểm trên bản đồ. Kéo để di chuyển, cuộn hoặc chụm hai ngón để thu phóng."]));const t=[...E.P.fog].filter(i=>i==="1").length;return n.append(v("p",{class:"tt-dim"},[`Đã khám phá ${Math.round(t/(Lt*Lt)*100)}% Đảo Lạc`]),v("ul",{class:"tt-legend"},Jl.map(([i,h])=>v("li",{},[v("i",{style:`--c:${ao[i]}`}),h])))),n}function hs(n,t){if(n.classList.add("tt-menu-map"),t.focus){const u=oo(t.focus);u&&([gn.x,gn.y,gn.z]=[u[0],u[1],Math.max(gn.z,2)]),delete t.focus}else!xn&&e.G?.p&&([gn.x,gn.y]=[e.G.p.x/A,e.G.p.y/A]);if(!e.G?.map&&!e.WORLD){n.append(v("p",{class:"tt-dim"},["Bản đồ chỉ có khi đang ở Đảo Lạc."]));return}un=v("canvas",{id:"mapCv",tabindex:"0","aria-label":"Bản đồ Đảo Lạc. Mũi tên để kéo, + và − để thu phóng, Enter để chọn điểm giữa."});const i=v("div",{class:"tt-map-wrap"},[un,v("div",{class:"tt-map-zoom"},[en("Phóng to",{iconOnly:!0,icon:"them",onClick:()=>vi(1.25)}),en("Thu nhỏ",{iconOnly:!0,icon:"bot",onClick:()=>vi(.8)}),en("Về vị trí của bạn",{iconOnly:!0,icon:"tim-kiem",onClick:()=>{e.G?.p&&([gn.x,gn.y]=[e.G.p.x/A,e.G.p.y/A]),pi()}})])]);n.append(v("div",{class:"tt-map"},[i,is()]));const h=()=>{if(!un?.isConnected)return;const u=i.getBoundingClientRect(),p=Math.min(devicePixelRatio||1,2);un.width=Math.max(200,u.width*p),un.height=Math.max(160,u.height*p),pi()};requestAnimationFrame(h),new ResizeObserver(h).observe(i);const a=new Map;let g=0,l=0;un.addEventListener("pointerdown",u=>{if(un.setPointerCapture(u.pointerId),a.set(u.pointerId,[u.clientX,u.clientY]),g=0,a.size===2){const[p,d]=[...a.values()];l=Math.hypot(p[0]-d[0],p[1]-d[1])}}),un.addEventListener("pointermove",u=>{const p=a.get(u.pointerId);if(!p)return;const d=Math.min(devicePixelRatio||1,2);if(a.size===2){a.set(u.pointerId,[u.clientX,u.clientY]);const[N,C]=[...a.values()],P=Math.hypot(N[0]-C[0],N[1]-C[1]);l&&vi(P/l),l=P,g=99;return}const M=u.clientX-p[0],f=u.clientY-p[1];g+=Math.abs(M)+Math.abs(f),a.set(u.pointerId,[u.clientX,u.clientY]),gn.x-=M*d/$h(),gn.y-=f*d/$h(),ae(),pi()});const c=u=>{if(a.has(u.pointerId)&&(a.delete(u.pointerId),g<6&&a.size===0)){const p=un.getBoundingClientRect(),d=un.width/p.width,[M,f]=ns((u.clientX-p.left)*d,(u.clientY-p.top)*d);go(M,f)}};un.addEventListener("pointerup",c),un.addEventListener("pointercancel",u=>a.delete(u.pointerId)),un.addEventListener("wheel",u=>{u.preventDefault(),vi(u.deltaY<0?1.15:.87)},{passive:!1});const s=()=>{un?.isConnected&&(pi(),setTimeout(()=>requestAnimationFrame(s),120))};s()}function vi(n){gn.z*=n,ae(),pi()}ht("map",{title:"Bản đồ",icon:"ban-do",render:hs,onKey(n){if(document.activeElement!==un)return n.key==="+"||n.key==="="||n.key==="-"?(vi(n.key==="-"?.8:1.25),!0):!1;const t=6/gn.z,i={ArrowLeft:[-t,0],ArrowRight:[t,0],ArrowUp:[0,-t],ArrowDown:[0,t]};return i[n.key]?(gn.x+=i[n.key][0],gn.y+=i[n.key][1],ae(),pi(),!0):n.key==="+"||n.key==="="||n.key==="-"?(vi(n.key==="-"?.8:1.25),!0):n.key==="Enter"||n.key===" "?(go(gn.x,gn.y),!0):!1},onClose(){xn=null,un=null}});const as=`# 00. Tổng quan thế giới

Tài liệu nội bộ cho nhóm sáng tác. Đây là file đầu tiên của bộ "Kinh thánh thế giới" (\`docs/world/\`). Mọi cốt truyện, nhân vật, bản đồ, quái và vật phẩm mới phải khớp với bộ tài liệu này. Khi hai file mâu thuẫn, file có số nhỏ hơn được ưu tiên, sau đó sửa file còn lại.

Quy ước trong bộ tài liệu:

- Thuật ngữ dùng đúng bảng A.5, cộng các tên chủ dự án đã duyệt đổi: **Vọng Tinh Giới** (tên thế giới), **Nét Sao** N0–N6 (thay Cung mệnh C0–C6), **Lòng Sao** (thay Động Thiên), **Giọt Nhầy** (thay Slime). Xem [\`11-dat-ten.md\`](11-dat-ten.md) mục 0.
- Tên các khái niệm mới (Trấn Tinh, Tinh Văn, Tinh Hải, Hội Bất Nguyện, cấp danh vọng...) đã được chủ dự án duyệt theo phương án ★ trong \`11-dat-ten.md\`.
- Nhãn bí mật: **[Công khai]** là người chơi biết ngay. **[Hé lộ Ch.N]** là hé lộ ở chương N. **[Bí mật cuối]** chỉ hé lộ ở chương kết.

## 1. Thông điệp cốt lõi

> **Một lời ước chỉ thật sự thành khi có người cùng gánh.**

Ở Vọng Tinh Giới, lời ước có thật. Lời ước bay lên trời, kết thành sao, và sao chọn người để giúp. Nhưng lời ước nào cũng có giá, và những lời ước không ai nghe sẽ chìm xuống đáy biển thành thứ bùn đen. Game kể chuyện một người có thể nói chuyện với các vì sao, đi qua nhiều vùng đất, và nhận ra rằng sức mạnh thật không nằm ở việc được chọn. Nó nằm ở việc cùng nhau mang những điều chưa được nghe.

## 2. Ba chủ đề chính

### 2.1. Lời ước và cái giá của nó

Mỗi phép màu đều lấy đi một thứ gì đó. Hộ Tinh mạnh lên khi đánh đổi, thần hộ mệnh yếu đi khi che chở. Hội Mặt Nạ ra đời từ những lời ước bị bỏ quên.

- Ví dụ trong game: Bà Khơi, thần hộ mệnh Đảo Lạc, đã nuốt những lời ước đắng của cả đảo suốt ba trăm năm. Hắc Giao lớn lên từ chính chỗ bùn đó.
- Câu hỏi mà mỗi chương nên đặt ra: "Ai đã trả giá cho điều tốt đẹp này?"

### 2.2. Ký ức cộng đồng

Một làng nhớ được gì là nhờ đình, nhờ bia đá, nhờ bài hát ru và món ăn ngày giỗ. Quên là một kiểu chết. Các vùng đất khác nhau giữ ký ức theo cách khác nhau: khắc đá, viết lên diều, ghi vào gạch men, hát trên lưng ngựa.

- Ví dụ trong game: Thạch Sơn khắc trăm bia trên Đảo Lạc để không ai quên tên người đã giữ đảo. Bia Đá trên bản đồ vừa là điểm hồi phục, vừa là nơi lưu tên.

### 2.3. Con người và thiên nhiên cùng một nhịp

Thiên nhiên ở đây không phải kẻ thù để chinh phục. Quái vật phần lớn là sinh vật bị đẩy ra khỏi chỗ của mình, hoặc bị nhiễm bùn ước nguyện, chứ không ác sẵn. Người chơi được thưởng khi biết lắng nghe môi trường: đọc gió, xem thủy triều, chờ đúng mùa.

- Ví dụ trong game: Yêu Rừng tấn công làng chỉ vì Hội Mặt Nạ đốt bãi trúc nơi chúng sống.

## 3. Tông màu cảm xúc

Tỉ lệ để người viết tự kiểm tra một chương hoặc một nhiệm vụ dài (tính theo thời lượng chơi):

| Sắc thái   | Tỉ lệ | Ví dụ                                                                   |
| ---------- | ----- | ----------------------------------------------------------------------- |
| Ấm áp, vui | 35%   | Chợ đêm phố Vạn Đăng, Mai Linh khoe đèn lồng mới, mấy trò chơi dân gian |
| Hành động  | 30%   | Trại quái, boss, Tháp Tinh Tú, rượt đuổi trên mái nhà                   |
| Kỳ bí      | 20%   | Bia đá có chữ lạ, sao rơi giữa ban ngày, đền trăng chỉ mở lúc trăng rằm |
| Buồn, lắng | 15%   | Người già kể chuyện mất mát, Bà Khơi im lặng, lời ước không thành       |

Nguyên tắc nhịp: sau mỗi cảnh buồn phải có một cảnh đời thường ấm áp trong vòng 10 phút chơi. Không kết chương bằng cảnh tuyệt vọng hoàn toàn. Luôn để lại một việc nhỏ mà nhân vật có thể làm.

## 4. Những gì game không bao giờ làm

1. **Không máu me.** Đòn đánh tạo tia sáng, mảnh đá, hoa băng. Quái bị đánh bại thì tan thành bụi sao hoặc chạy trốn, không có xác hay máu.
2. **Không giễu cợt văn hóa vùng miền.** Không lấy giọng nói, trang phục hay món ăn của một vùng làm trò cười. Phương ngữ chỉ dùng để tạo màu sắc, có chừng mực (xem [\`05-van-hoa-doi-thuong.md\`](05-van-hoa-doi-thuong.md)).
3. **Không đưa tôn giáo thật đang được thờ phụng vào truyện**, không đưa nhân vật lịch sử có thật, không dùng địa danh có thật làm nơi diễn ra sự kiện hay làm phe phản diện. Kiến trúc chỉ lấy dáng công trình dân sự (đình, cung điện, chợ, thư viện, cầu, nhà tắm, đấu trường), không dựng đền chùa, nhà thờ, thánh đường thật.
4. **Không ác vô cớ.** Mỗi kẻ thù có lý do mà người chơi hiểu được, dù không đồng ý.
5. **Không tình dục hóa nhân vật**, không trang phục hở hang so với văn hóa gốc của vùng.
6. **Không làm nhục người thua.** Người chơi thắng thì kẻ thua vẫn giữ phẩm giá, có thể quay lại làm đồng minh.
7. **Không dùng nỗi đau thật** (chiến tranh có thật, thiên tai có thật, nạn đói có thật) làm cảnh trong truyện.
8. **Không ép người chơi bằng tiền.** Trong truyện không có nhân vật nào nói "hãy ước thêm nữa". Gacha được giải thích bằng câu chuyện chứ không được cổ vũ.

## 5. Đối tượng người chơi

- **Độ tuổi:** 13 tuổi trở lên. Nội dung tương đương phim hoạt hình phiêu lưu dành cho gia đình: có đánh nhau, có mất mát, không có máu, không có lời thô tục.
- **Người chơi chính:** học sinh, sinh viên và người đi làm trẻ ở Việt Nam, đã quen thể loại nhập vai hành động có gacha. Họ chơi trên điện thoại vào giờ nghỉ (5–15 phút) và trên máy tính vào buổi tối (30–60 phút).
- **Điều họ tìm:** nhân vật đẹp và có cá tính, thế giới để khám phá, cảm giác thấy văn hóa của mình được đặt cạnh các nền văn hóa lớn khác một cách tự hào.
- **Người chơi phụ:** người nước ngoài thích văn hóa châu Á. Vì vậy mọi tên riêng phải có nghĩa giải thích được trong một câu (xem \`11-dat-ten.md\`).

## 6. Bản đồ bộ tài liệu

| File                                                           | Nội dung                                                       |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| [\`01-vu-tru-va-sao.md\`](01-vu-tru-va-sao.md)                   | Vũ trụ quan, cơ chế ước nguyện, bảy nguyên tố, phản ứng        |
| [\`02-lich-su.md\`](02-lich-su.md)                               | Bảy thời kỳ, Hắc Giao, nguồn gốc Hội Mặt Nạ                    |
| [\`03-dia-ly.md\`](03-dia-ly.md)                                 | Bảy vùng đất, địa danh, ẩm thực, nhạc, bảng màu, quái          |
| [\`04-phe-phai.md\`](04-phe-phai.md)                             | Tám phe phái, bảng quan hệ, nhân vật thuộc phe nào             |
| [\`05-van-hoa-doi-thuong.md\`](05-van-hoa-doi-thuong.md)         | Lịch, lễ hội, chào hỏi, xưng hô, tín ngưỡng, trò chơi, tiền Xu |
| [\`06-sinh-vat.md\`](06-sinh-vat.md)                             | Bách khoa quái vật                                             |
| [\`07-hac-giao-va-hoi-mat-na.md\`](07-hac-giao-va-hoi-mat-na.md) | Hồ sơ phản diện, kế hoạch theo chương                          |
| [\`08-vat-pham-va-di-vat.md\`](08-vat-pham-va-di-vat.md)         | 30 vật phẩm có câu chuyện                                      |
| [\`09-tu-dien.md\`](09-tu-dien.md)                               | Từ điển tên riêng và thuật ngữ                                 |
| [\`10-cau-hoi-mo.md\`](10-cau-hoi-mo.md)                         | Điểm cố ý bỏ ngỏ                                               |
| [\`11-dat-ten.md\`](11-dat-ten.md)                               | Quy tắc đặt tên, phương án tên, rà thuật ngữ                   |

## 7. Những điểm khác biệt với các game cùng thể loại

Thể loại nhập vai thế giới mở có gacha thường có mô-típ "mỗi vùng một nguyên tố, một vị thần". Vọng Tinh Giới giữ mô-típ đó, nhưng khác ở chi tiết, cấu trúc và ý nghĩa.

### 7.1. Bảng ghép vùng, nguyên tố và thần hộ mệnh

| Vùng      | Cảm hứng               | Nguyên tố | Thần hộ mệnh (Trấn Tinh) | Cách thần sống với người                                                                    | Cặp ghép đã tránh                                 |
| --------- | ---------------------- | --------- | ------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Đảo Lạc   | Việt Nam               | Thủy      | Bà Khơi                  | Ngủ dưới đáy Hồ Gương đã ba trăm năm, chỉ còn trong lời ru                                  | Thủy không gắn vùng cảm hứng Pháp                 |
| Lũng Vân  | Trung Hoa cổ           | Phong     | Thính Phong              | Một ông già khó tính chép lại mọi lời nói bay trong gió, ghét lời dối                       | Trung Hoa không phải Thổ                          |
| Shizukane | Nhật Bản               | Băng      | Yukiyo                   | Đã thề im lặng sau một trận tuyết lở do chính mình gây ra, chỉ "nói" bằng hoa văn tuyết rơi | Nhật Bản không phải Lôi                           |
| Purunae   | Hàn Quốc               | Mộc       | Sonamu                   | Cây thông già biết đi, vị thần duy nhất đang già đi, được dân chăm như ông nội              | Mộc không gắn vùng cảm hứng Ấn Độ, Ba Tư          |
| Golbaran  | Ba Tư và Trung Đông    | Thổ       | Ostad Khesht             | Ông thợ xây vui tính, đếm thời gian bằng số mái nhà đã dựng cho người                       | Ba Tư không phải Mộc                              |
| Marevia   | La Mã và Địa Trung Hải | Hỏa       | Faber                    | Thợ rèn từ chối được thờ, bắt dân gọi mình là "đồng nghiệp"                                 | Hỏa không gắn vùng cảm hứng Trung Mỹ hay châu Phi |
| Khokhtal  | Thảo nguyên Trung Á    | Lôi       | Aianga                   | Đàn ngựa giông, ai chạy kịp cơn giông thì được nói chuyện                                   | Lôi không gắn Nhật Bản                            |

Lý do theo câu chuyện của từng cặp ghép nằm ở [\`01-vu-tru-va-sao.md\`](01-vu-tru-va-sao.md) mục 4 và [\`03-dia-ly.md\`](03-dia-ly.md).

### 7.2. Khác biệt về cấu trúc thế giới

| Khía cạnh                | Vọng Tinh Giới                                                                                                                                                                                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thần hộ mệnh             | Gọi là **Trấn Tinh**: những vì sao rơi xuống đất và tự nguyện ở lại giữ một vùng. Họ **không cai trị**. Mỗi vùng có chính quyền của người. Thần chỉ là người láng giềng quyền năng, mỗi vị một mối quan hệ khác (người ngủ, ông thầy, người im lặng, ông nội, đồng nghiệp, đối thủ đua). |
| Nơi thần và sao ngự      | **Tinh Hải** là biển sao trên trời, nơi các lời ước kết thành sao. Đây không phải một tòa thành, không có ai cai quản, không có cổng. Các Trấn Tinh đã rời Tinh Hải và sống dưới đất.                                                                                                    |
| Nguồn sức mạnh nguyên tố | Không phải vật phẩm mang theo. Khi một vì sao chọn ai, trên da người đó hiện lên **Tinh Văn**, một hoa văn sáng như chòm sao nhỏ. Mỗi lần gặp lại cùng vì sao đó, Tinh Văn thêm một nét. Đây chính là Nét Sao.                                                                           |
| Nhân vật chính           | Người Ước Nguyện không tìm người thân thất lạc. Họ tỉnh dậy ở Bãi Sao Rơi, có khả năng hiếm là nói được với sao. Bí ẩn của họ gắn với phản diện, không gắn với anh chị em.                                                                                                               |
| Gacha                    | Có lý do trong truyện: Đá Sao là ánh sao đã nguội. Người Ước Nguyện "đốt" nó để gửi lời ước lên Tinh Hải, và một vì sao trả lời bằng cách dẫn một Hộ Tinh tới.                                                                                                                           |
| Phản diện                | Hắc Giao không phải sinh vật cổ đại tự có. Nó sinh ra từ **Nguyện Cặn**, tức bùn của những lời ước không ai nghe. Hội Mặt Nạ không thờ một vị thần nào. Họ là những người chưa bao giờ được sao chọn.                                                                                    |
| Nguyên tố                | Nguyên tố là **tính khí của vì sao** đã chọn người, không phải của quê hương. Vì vậy Đảo Lạc có Hộ Tinh đủ sáu hệ.                                                                                                                                                                       |

### 7.3. Rủi ro cần để ý khi thiết kế tiếp

Một số nhân vật hạt giống ở A.6 có tổ hợp (nguyên tố, vũ khí, vai trò) gần với nhân vật nổi tiếng ở game khác. Bộ tài liệu không đổi tên, nguyên tố, vũ khí hay độ hiếm. Nó chỉ ghi hướng tạo khác biệt; quyết định của chủ dự án ghi ở \`11-dat-ten.md\` mục 0.

| Nhân vật    | Điểm dễ bị so sánh                                                      | Hướng tạo khác biệt trong bộ tài liệu                                                                                                                                            |
| ----------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lôi Đình    | Tổ hợp Lôi, thương, người cầm quân (danh hiệu cũ "Tướng Quân Giông Tố") | Là đội trưởng trẻ của Quân Trấn Thủ, không phải người cai trị. Ngọn thương do Aianga của thảo nguyên trao trong một trận đua giông. Danh hiệu đã đổi thành "Ngọn Thương Gọi Sấm" |
| Tuyết Lan   | Nữ kiếm sĩ Băng đến từ vùng cảm hứng Nhật                               | Không thuộc dòng quý tộc. Là người đưa thư leo núi tuyết, biểu tượng hoa lan, kiếm pháp gắn với sự im lặng của Yukiyo                                                            |
| Thủy Nguyệt | Nữ người giữ đền, Thủy, pháp khí, chữa trị                              | Biểu tượng chuông bạc và trăng, gắn với hồ nước ngọt, không dùng hình ảnh biển, sứa hay san hô                                                                                   |
| Bạch Vũ     | Kiếm khách Phong lang thang                                             | Là người hộ tống đoàn thuyền buôn, vui vẻ, nói nhiều, không làm thơ hay thổi sáo                                                                                                 |

Kết quả rà thuật ngữ A.5 và các tên đã đổi nằm ở \`11-dat-ten.md\` mục 0 và mục 5.
`,es=`# 01. Vũ trụ và các vì sao

## 1. Ba tầng của thế giới

| Tầng | Tên                     | Mô tả                                                                                                                                                 | Người chơi đến được?                                                          |
| ---- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Trên | **Tinh Hải** (biển sao) | Bầu trời đêm của Vọng Tinh Giới. Không phải nơi ở của ai, không có cung điện, không có cổng. Đó là một "biển" ánh sáng nơi các lời ước kết thành sao. | Không. Chỉ nhìn thấy, và ở chương kết thì "chạm" được trong một cảnh đặc biệt |
| Giữa | **Mặt Đất**             | Các vùng đất, biển, đảo nơi con người sống                                                                                                            | Có                                                                            |
| Dưới | **Biển Lặng**           | Đáy sâu dưới mọi đại dương, tối và không có tiếng động. Nơi những lời ước không được trả lời chìm xuống và lắng thành **Nguyện Cặn**                  | Một phần, qua Hang Hắc Giao và các Lòng Sao bị nhiễm bùn                      |

Ba tầng nối với nhau bằng một vòng tuần hoàn: **ước, bay lên, thành sao, rơi xuống, giúp người**. Lời ước nào không đủ nhẹ để bay lên (vì quá đắng, quá ích kỷ, hoặc vì không ai cùng ước) sẽ chìm xuống Biển Lặng.

## 2. Khai thiên lập địa (truyền thuyết dân gian) [Công khai]

Thuở đầu chỉ có Tinh Hải và Biển Lặng, không có đất. Ngôi sao đầu tiên, dân gian gọi là **Sao Cả**, cô đơn quá lâu nên ước "có một chỗ để rơi xuống". Nó tự rơi. Chỗ nó chạm vào Biển Lặng nổi lên thành đất liền đầu tiên. Bụi của nó vương khắp nơi, về sau thành con người, cây cỏ và muông thú.

Vì vậy người Vọng Tinh Giới tin rằng **mỗi người đều có một chút bụi sao trong mình**. Đó là lý do ai cũng ước được, và sao nghe được tiếng người.

> Bí mật [Hé lộ Ch.7]: Sao Cả không chết. Phần lõi của nó vẫn nằm dưới Đảo Lạc, và Đảo Lạc chính là mảnh đất đầu tiên. Đây là lý do Hắc Giao, sao băng và Người Ước Nguyện đều tìm về đảo này.

## 3. Lời ước, vì sao và Hộ Tinh

### 3.1. Lời ước thành sao thế nào

- Mỗi lời ước thật lòng tạo ra một đốm sáng rất nhỏ, gọi là **hạt nguyện**, bay lên Tinh Hải.
- Nhiều hạt nguyện cùng một ý nghĩa ("mong mẹ khỏi bệnh", "mong làng được mùa", "mong được bay") tụ lại thành một vì sao. Vì sao mang **ý muốn chung** của những lời ước đó. Đó là "tính cách" của sao.
- Sao càng gom nhiều lời ước thì càng sáng và càng già. Sao cổ, sáng màu vàng, có thể đã gom hàng chục nghìn lời ước qua nhiều thế kỷ.

### 3.2. Vì sao chọn ai làm Hộ Tinh

Vì sao không chọn người mạnh nhất hay giỏi nhất. Nó chọn **người đang tự mình làm dở một việc giống với điều ước mà nó mang**.

- Ví dụ: một vì sao gom lời ước "mong đảo có người canh giữ" sẽ chọn người đã đứng gác ở cổng làng ba năm liền mà không ai trả công.
- Khi được chọn, người đó thấy trên da mình hiện lên **Tinh Văn**: một hoa văn sáng như một chòm sao nhỏ, thường ở cổ tay, vai hoặc sau gáy. Từ lúc đó họ là **Hộ Tinh**, tức người được vì sao bảo hộ.
- Nguyên tố của Hộ Tinh là **tính khí của vì sao** chứ không phải của quê hương. Vì vậy một cô gái sinh vào mùa hè như Hạ Vy vẫn có thể được một vì sao Băng chọn.

### 3.3. Sao có thể rời đi

Nếu Hộ Tinh phản bội chính việc mà vì sao đã thấy ở họ, Tinh Văn mờ dần và sao bỏ đi. Người mất sao gọi là **Người Tắt Sao**. Chuyện này hiếm, đáng xấu hổ, và là gốc rễ của Hội Mặt Nạ (xem [\`07-hac-giao-va-hoi-mat-na.md\`](07-hac-giao-va-hoi-mat-na.md)).

## 4. Cơ chế ước nguyện trong truyện (lý do của gacha)

### 4.1. Người Ước Nguyện và Đá Sao [Công khai]

- Người thường chỉ gửi được hạt nguyện rất nhỏ. Lời ước của họ phải chờ hàng trăm năm mới đủ để thành sao.
- **Người Ước Nguyện** (nhân vật chính) có khả năng hiếm: lời ước của họ **được Tinh Hải nghe ngay**, như nói thẳng vào tai sao.
- **Đá Sao** là ánh sao đã nguội và đông lại sau khi sao băng chạm đất. Người Ước Nguyện cầm Đá Sao, nói lời ước, viên đá tan thành ánh sáng bay lên. Đó là một **lần ước nguyện**.
- Vì sao nghe thấy thì trả lời bằng một **sao băng**. Sao băng không "tạo ra" người. Nó **dẫn đường**: một Hộ Tinh đang sống ở đâu đó trên đảo hay vùng khác cảm thấy một sợi duyên kéo họ về phía Người Ước Nguyện, và họ tự nguyện đến nhập đội.

> Quy tắc viết: không bao giờ mô tả Hộ Tinh như đồ vật bị triệu hồi hay sở hữu. Họ là người có đời sống riêng, chọn đi cùng Người Ước Nguyện vì duyên do sao dẫn.

### 4.2. Màu của sao băng

| Màu           | Ý nghĩa trong truyện                                                             | Trong game                             |
| ------------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| Vàng          | Sao cổ, gom rất nhiều lời ước, dẫn tới Hộ Tinh đã được sao cổ chọn               | 5★                                     |
| Tím           | Sao trẻ, dẫn tới Hộ Tinh trẻ hoặc mới được chọn                                  | 4★                                     |
| Xanh lam nhạt | Mảnh sao vỡ, không đủ sức dẫn người, chỉ mang theo một món đồ cũ đã thấm ánh sao | Vật phẩm 3★ (Kiếm Sắt Cũ, Cung Tre...) |

### 4.3. Bảo Hộ Vận Sao 90 lần và 50/50

- **Luật Chín Mươi Lời** [Công khai, dân gian]: người xưa nói "chín mươi lời cùng một ý thì sao cổ phải quay đầu". Lời ước của Người Ước Nguyện dồn lại. Khi đủ nặng, một sao cổ bắt buộc phải trả lời. Đây là lý do trong truyện của Bảo Hộ Vận Sao 90 lần.
- **Sao Mùa**: mỗi mùa có một sao cổ sáng nhất bầu trời. Trong game, đó là Hộ Tinh nổi bật. Khi sao cổ trả lời, có lúc sao mùa trả lời, có lúc là một sao cổ khác đang ở gần hơn. Nếu lần trước sao mùa bị "chen lời", lần sau nó chắc chắn đáp. Đây là lý do trong truyện của 50/50.

### 4.4. Gặp lại cùng một Hộ Tinh: Nét Sao

- Một vì sao chỉ chọn một người. Khi sao đó trả lời Người Ước Nguyện **lần nữa**, nó không dẫn tới người thứ hai. Nó **rót thêm ánh sáng** vào Hộ Tinh đã đi cùng.
- Mỗi lần như vậy, Tinh Văn của Hộ Tinh **thêm một nét**. Có sáu nét có thể thêm, ứng với **Nét Sao N1 đến N6**. Ở N6, Tinh Văn thành một chòm sao hoàn chỉnh, và vì sao đó coi như đã trao hết những gì nó có.
- Trong truyện, mỗi nét mới thường đi kèm một ký ức mà Hộ Tinh nhớ lại (một lời ước cũ của chính họ). Đây là chỗ để viết câu chuyện Nét Sao của từng nhân vật.

### 4.5. Các thuật ngữ khác có lý do trong truyện

| Thuật ngữ             | Lý do trong truyện                                                                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Khai Tinh**         | Mở thêm một lớp sáng bị khóa trong Tinh Văn. Cần nguyên liệu thấm ánh sao (lõi quái, hoa hiếm) để "đánh thức" lớp đó                                                                                                 |
| **Bảo Ấn**, **Bộ Ấn** | Những con ấn khắc bằng đá, đồng, ngọc mà người xưa đã giữ mảnh sao nhỏ trong đó. Ấn cùng một xưởng, cùng một câu chuyện thì cộng hưởng với nhau, nên gọi là một Bộ Ấn                                                |
| **Bia Đá**            | Bia khắc tên người đã giữ đất. Một chút ánh sao trú trong chữ khắc. Khi Hộ Tinh chạm vào, bia nhận ra Tinh Văn và trả sức. Các bia nối với nhau bằng **mạch sao** ngầm dưới đất, nên đi được từ bia này sang bia kia |
| **Tháp Tinh Tú**      | Tháp do Người Đếm Sao dựng để hứng ánh sao xuống giữ phong ấn Hắc Giao. Mười hai tầng ứng với mười hai chòm sao của lịch                                                                                             |
| **Lòng Sao**          | Những khoảng đất bị sao rơi cuốn vào lòng mình, tách khỏi thế giới thành một không gian riêng. Nhiều nguyên liệu quý chỉ còn sống trong đó                                                                           |
| **Ủy thác**           | Việc nhờ của dân làng, nhận ở bảng gỗ trước Đình Trống. Hộ Tinh có lệ làm việc nhờ hằng ngày như một lời cảm ơn vì sao đã chọn mình                                                                                  |

## 5. Bảy nguyên tố

Nguyên tố là **bảy tính khí lớn** của các vì sao. Mỗi tính khí bắt nguồn từ một trong bảy sao lớn đầu tiên rơi xuống sau Sao Cả, sau này trở thành bảy Trấn Tinh (thần hộ mệnh). Mỗi Trấn Tinh chọn một vùng hợp với tính khí của mình.

| Nguyên tố | Tính khí cốt lõi                                                | Biểu tượng                   | Màu chính và phụ             | Vùng và Trấn Tinh      | Điều cấm kỵ (dân gian)                                                 |
| --------- | --------------------------------------------------------------- | ---------------------------- | ---------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| **Thủy**  | Ghi nhớ và gắn kết. Nước chảy qua mọi nơi và mang theo dấu vết  | Giọt nước có vòng sóng       | \`#3aa6f5\`, \`#a6dcff\`         | Đảo Lạc, Bà Khơi       | Không chặn dòng chảy: ai lấp sông, đắp đập ngăn suối sẽ bị nước "quên" |
| **Phong** | Truyền tin và lời nói. Gió mang lời từ người này tới người kia  | Ba nét cong như nét bút lướt | \`#45dfb1\`, \`#bdf6e4\`         | Lũng Vân, Thính Phong  | Không nói dối trước gió: lời dối bay đi sẽ quay lại với người nói      |
| **Băng**  | Tiết chế và lắng nghe. Lạnh làm mọi thứ chậm lại để nghe cho rõ | Bông tuyết sáu cánh khép kín | \`#8fe1ff\`, \`#e6f9ff\`         | Shizukane, Yukiyo      | Không hét giữa núi tuyết: tiếng ồn gọi tuyết lở                        |
| **Mộc**   | Sinh trưởng và nối tiếp. Cây già nuôi mầm non                   | Chồi non mọc từ vòng gỗ      | Đề xuất \`#7cc95a\`, \`#d3f2b8\` | Purunae, Sonamu        | Không ép cây ra trái mùa, không chặt cây chưa từng ra hoa              |
| **Thổ**   | Che chở và bền bỉ. Đất làm móng, làm tường, làm mái             | Hình vuông có mái vòm        | \`#e9b23a\`, \`#f8de98\`         | Golbaran, Ostad Khesht | Không dời móng nhà của người khác, không đào mả                        |
| **Hỏa**   | Ý chí làm ra. Lửa nung, rèn, thắp sáng                          | Ngọn đuốc ba lưỡi            | \`#ff6a3d\`, \`#ffc08a\`         | Marevia, Faber         | Không đốt thứ người khác làm ra bằng tay                               |
| **Lôi**   | Khoảnh khắc quyết định. Sấm chỉ đến một lần, chần chừ là lỡ     | Vó ngựa hình tia chớp        | \`#b47bff\`, \`#e0c8ff\`         | Khokhtal, Aianga       | Không bỏ chạy giữa cuộc đua: ai bỏ cuộc giữa giông sẽ bị sét "nhớ mặt" |

Màu Thủy, Phong, Băng, Thổ, Hỏa, Lôi lấy đúng từ \`content/config.yaml\`. Màu Mộc là đề xuất cho khi thêm nguyên tố này.

### 5.1. Vì sao mỗi vùng gắn với nguyên tố của nó (lý do theo truyện)

- **Đảo Lạc, Thủy:** Đảo là mảnh đất đầu tiên nổi lên từ Biển Lặng, bốn bề sông biển, người sống nhờ lúa nước và nghề chài. Bà Khơi chọn ở lại vì nơi đây là chỗ mọi dòng nước của thế giới chảy về. Bà giữ ký ức của mọi lời ước trôi qua.
- **Lũng Vân, Phong:** Lũng Vân là xứ của chữ viết, diều giấy và những thung lũng nhiều gió. Thính Phong ở lại vì mọi lời nói ở đây đều được ghi xuống, và ông muốn đọc tất cả.
- **Shizukane, Băng:** Xứ núi tuyết, nơi người ta quý sự im lặng và tiết chế. Yukiyo chọn nơi này để chuộc lỗi sau trận tuyết lở cổ, và người Shizukane học cách sống chậm từ bà.
- **Purunae, Mộc:** Bán đảo núi rừng, nhiều thảo dược, cây thông cổ. Sonamu là cái cây đầu tiên mọc từ bụi Sao Cả, và ông chọn già đi cùng rừng của mình.
- **Golbaran, Thổ:** Sa mạc và ốc đảo. Ở đây một mái nhà, một bức tường chắn cát là ranh giới giữa sống và chết. Ostad Khesht ở lại vì ông muốn dựng đủ nhà cho mọi người.
- **Marevia, Hỏa:** Bờ biển nhiều núi lửa, nghề rèn, gốm và đúc đồng. Faber rơi xuống miệng một núi lửa và thấy người dân đã biết dùng lửa của núi để làm ra mọi thứ. Ông ở lại để học hỏi họ.
- **Khokhtal, Lôi:** Thảo nguyên mênh mông, giông kéo đến rất nhanh, người sống trên lưng ngựa. Aianga ở lại vì chỉ ở đây mới có người dám đua với giông.

## 6. Vì sao các nguyên tố phản ứng với nhau

Theo cách hiểu của người Vọng Tinh Giới, mỗi đòn nguyên tố để lại một **dấu tính khí** trên vật bị đánh. Khi hai tính khí khác nhau cùng ở một chỗ, chúng không thể cùng tồn tại yên ổn. Chúng **giằng co** rồi bùng ra thành một hiện tượng mới. Người xưa ví như hai người tính trái ngược ở chung một nhà: hoặc cãi nhau to, hoặc ghép lại thành một việc mà một mình không ai làm được.

Phong và Thổ là hai tính khí "trung gian": Phong không tranh mà **mang tính khí kia đi xa**, Thổ không tranh mà **đóng khung tính khí kia thành vật rắn**.

| Phản ứng       | Tính khí gặp nhau                      | Giải thích trong thế giới                                                                                                                                                          |
| -------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bốc Hơi**    | Hỏa + Thủy                             | Ý chí của lửa muốn làm ra một thứ mới, ký ức của nước muốn giữ nguyên thứ cũ. Lửa thắng nhưng nước không mất, nó bay lên thành hơi, mang ký ức đi. Vì vậy đòn bốc hơi mạnh hơn hẳn |
| **Tan Chảy**   | Hỏa + Băng                             | Lửa không chịu chờ, băng muốn mọi thứ chậm lại. Băng nhường trước, vỡ ra nhanh, và đòn đánh mang cả sức của hai bên                                                                |
| **Quá Tải**    | Hỏa + Lôi                              | Hai tính khí đều nóng vội, cùng muốn làm ngay. Không bên nào nhường nên nổ tung                                                                                                    |
| **Điện Cảm**   | Thủy + Lôi                             | Sấm muốn quyết, nước muốn nối. Nước dẫn sấm đi khắp nơi nó chạm tới, nên điện lan và giật mãi                                                                                      |
| **Đóng Băng**  | Thủy + Băng                            | Băng bảo nước dừng lại để lắng nghe. Nước đồng ý, nên mọi thứ đứng yên                                                                                                             |
| **Siêu Dẫn**   | Lôi + Băng                             | Sấm vội, băng chậm. Băng làm sấm lạnh đi, sấm làm băng giòn. Vật bị đánh mất lớp phòng thủ                                                                                         |
| **Khuếch Tán** | Phong + một trong Hỏa, Thủy, Lôi, Băng | Gió mang lời. Gió chạm vào tính khí khác thì mang nó đi khắp xung quanh như truyền tin                                                                                             |
| **Kết Tinh**   | Thổ + một trong Hỏa, Thủy, Lôi, Băng   | Đất che chở. Đất bọc tính khí kia lại thành một viên tinh thể, Hộ Tinh nhặt lên làm khiên                                                                                          |

Mộc chưa có phản ứng. Gợi ý cho session thêm Mộc nằm ở [\`10-cau-hoi-mo.md\`](10-cau-hoi-mo.md).

## 7. Người thường và Hộ Tinh

### 7.1. Số lượng

- Ước tính dân gian: cứ khoảng **hai nghìn người thì có một Hộ Tinh**. Một làng chài vài trăm người có thể cả đời không có ai.
- Đảo Lạc hiện có khoảng ba mươi Hộ Tinh đang sống, trong đó 10 người xuất hiện trong bản thử nghiệm.

### 7.2. Lệ làng về Hộ Tinh [Công khai]

- **Khắc tên lên bia:** Hộ Tinh mới phải tới Bia Đá gần nhất khắc tên mình và tên vì sao (nếu biết). Từ đó dân làng có quyền nhờ họ.
- **Không đứng trên luật:** Hộ Tinh phạm lỗi bị xử như người thường. Ở Đảo Lạc, Hội Đồng Đình Trống xử.
- **Không nhận tiền khi làm việc nhờ nhỏ**, nhưng được nhận cơm, quà, chỗ ngủ. Việc lớn (đánh trại quái, đi xa) thì được trả Xu.
- **Không ép ai thành Hộ Tinh:** người ta không thể "xin" sao chọn mình, chỉ có thể sống tốt và chờ.

### 7.3. Những căng thẳng ngầm

- Có người coi Hộ Tinh là "người được trời thương", ghen tị, nói rằng sao chỉ chọn con nhà có điều kiện. Điều này không đúng, nhưng niềm tin đó có thật và là đất sống của Hội Mặt Nạ.
- Một số gia đình mong con được chọn đến mức ép con làm việc thiện để "lọt mắt sao". Câu chuyện kiểu này có thể dùng cho nhiệm vụ phụ.
- Hộ Tinh già đi như người thường và chết như người thường. Khi họ chết, vì sao của họ quay về Tinh Hải và tiếp tục gom lời ước. Đám tang Hộ Tinh có nghi thức **tiễn sao** (xem \`05-van-hoa-doi-thuong.md\`).

### 7.4. Người Ước Nguyện trong mắt người thường

- Ở Đảo Lạc, người ta gọi nhân vật chính là "người từ Bãi Sao Rơi". Trẻ con thì thích, người già thì vừa mừng vừa lo. Câu tục ngữ quen là "sao rơi nhiều thì giông đến".
- Người Ước Nguyện **không có Tinh Văn**. Họ không tự đánh bằng nguyên tố. Họ đi cùng đội Hộ Tinh, chỉ đường và giữ lửa cho cả đội. Trong bản thử nghiệm, người chơi điều khiển các Hộ Tinh trong đội.
`,cs=`# 02. Lịch sử

## 0. Cách tính năm

- Lịch chung của Vọng Tinh Giới là **Niên Sao**, viết tắt **NS**. Năm NS 1 là năm người đầu tiên được sao chọn làm Hộ Tinh (xem Thời kỳ 3).
- **Hiện tại là NS 1350.** Bản thử nghiệm bắt đầu vào tháng Trống (tháng đầu năm) NS 1350.
- Trước NS 1 không có năm, chỉ có truyền thuyết. Các vùng có lịch riêng (xem \`05-van-hoa-doi-thuong.md\`) nhưng giấy tờ giữa các vùng đều ghi NS.

Nhãn: **[Công khai]** người chơi biết ngay hoặc đọc được trên bia, sách. **[Hé lộ Ch.N]** hé lộ ở chương N. **[Bí mật cuối]** chỉ hé lộ ở chương kết. Thứ tự chương xem \`07-hac-giao-va-hoi-mat-na.md\` mục 5.

## 1. Dòng thời gian tóm tắt

| #   | Thời kỳ            | Khoảng thời gian        | Sự kiện chính                                                                                  | Nhân vật huyền thoại              | Di tích còn trên bản đồ                 |
| --- | ------------------ | ----------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------- |
| 1   | Thuở Biển Sao      | Trước khi có đất        | Sao Cả rơi xuống Biển Lặng, đất liền đầu tiên nổi lên                                          | Sao Cả                            | Hồ Gương (Đảo Lạc)                      |
| 2   | Thời Bảy Sao Xuống | Trước NS, không rõ năm  | Bảy sao lớn rơi xuống thành bảy Trấn Tinh, con người sinh ra từ bụi sao                        | Bảy Trấn Tinh, Cô Gieo            | Bảy Vết Rơi ở bảy vùng                  |
| 3   | Thời Lời Ước Đầu   | NS 1 – khoảng NS 400    | Con người học cách ước, Hộ Tinh đầu tiên xuất hiện, trống đồng được đúc                        | Bà Lưới, Ông Đúc Trống            | Bãi Sao Rơi, Đình Trống Đồng            |
| 4   | Thời Trăm Bến      | Khoảng NS 400 – NS 1045 | Đường biển nối bảy vùng, các đoàn thuyền buôn và Người Đếm Sao ra đời                          | Ông Mười Buồm, Bà Đầu Sổ Thứ Nhất | Cảng cổ Vạn Đăng, Hải Đăng Mắt Cá       |
| 5   | Thời Nước Đen      | NS 1046 – NS 1052       | Hắc Giao xuất hiện lần đầu, ba làng chìm, Bà Khơi và Năm Người Giữ Đảo phong ấn Hắc Giao       | Năm Người Giữ Đảo, Bà Khơi        | Hang Hắc Giao, bốn Bia Đá cổ, Làng Chìm |
| 6   | Thời Bia Đá        | NS 1053 – NS 1339       | Dựng lại đảo, lập Hội Đồng Đình Trống, dựng Tháp Tinh Tú, Tô Khuyết mất sao, Hội Mặt Nạ ra đời | Thợ Cả Đầu, Bà Hiên, Tô Khuyết    | Tháp Tinh Tú, trăm bia đường            |
| 7   | Thời Thức Giấc     | NS 1340 – nay           | Phong ấn yếu dần, Hội Mặt Nạ hoạt động công khai, Người Ước Nguyện rơi xuống Bãi Sao Rơi       | Thế hệ Hộ Tinh hiện tại           | Toàn bộ Đảo Lạc hiện nay                |

## 2. Chi tiết từng thời kỳ

### Thời kỳ 1: Thuở Biển Sao

- **Sự kiện:** Chỉ có Tinh Hải ở trên và Biển Lặng ở dưới. Sao Cả, ngôi sao đầu tiên, ước có một chỗ để rơi và tự rơi xuống. Đất liền đầu tiên nổi lên ở chỗ nó chạm biển. [Công khai, truyền thuyết]
- **Huyền thoại:** **Sao Cả**. Dân gian hình dung nó như một bà lão to lớn, tóc là dải ngân hà.
- **Di tích:** **Hồ Gương** trên Đảo Lạc, một hồ tròn hoàn hảo giữa đảo. Người ta nói đó là vết Sao Cả rơi. Đền Trăng dựng bên bờ hồ.
- **Bí mật:** Đảo Lạc chính là mảnh đất đầu tiên, và lõi Sao Cả vẫn còn sống dưới đáy Hồ Gương. [Hé lộ Ch.7]

### Thời kỳ 2: Thời Bảy Sao Xuống

- **Sự kiện:** Bụi của Sao Cả lan ra, đất nối dài thành các lục địa. Bảy sao lớn thấy mặt đất có sự sống nên lần lượt rơi xuống. Mỗi sao chọn một vùng hợp tính khí, trở thành **Trấn Tinh** của vùng đó. Con người, cây cỏ, muông thú sinh ra từ bụi sao. Họ chưa biết ước, chỉ biết sống. [Công khai]
- **Huyền thoại:**
  - **Bảy Trấn Tinh:** Bà Khơi, Thính Phong, Yukiyo, Sonamu, Ostad Khesht, Faber, Aianga (hồ sơ ở \`03-dia-ly.md\`).
  - **Cô Gieo:** người đầu tiên của Đảo Lạc gieo lúa nước. Theo truyện, Bà Khơi dạy cô dẫn nước vào ruộng. Đây là nhân vật dân gian sáng tác, không lấy từ truyền thuyết có thật.
- **Di tích:** **Bảy Vết Rơi**, mỗi vùng một nơi Trấn Tinh chạm đất. Ví dụ: Miệng Lò ở Marevia, Giếng Đầu ở Golbaran. Ở Đảo Lạc, vết rơi của Bà Khơi là **Vịnh Khơi** phía đông.
- **Bí mật:** Trấn Tinh không phải lúc nào cũng hòa thuận. Yukiyo và Aianga từng cãi nhau to đến mức gây ra cơn bão tuyết dài một năm. [Hé lộ Ch.3]

### Thời kỳ 3: Thời Lời Ước Đầu (NS 1 – khoảng NS 400)

- **Sự kiện:**
  - Con người bắt đầu ước. Hạt nguyện bay lên Tinh Hải, các vì sao mới hình thành. [Công khai]
  - **NS 1:** Một người đàn bà làng chài ở Đảo Lạc, gọi là **Bà Lưới**, ra biển mười đêm liền tìm con trai mất tích. Một vì sao gom lời ước "mong người đi biển trở về" chọn bà. Bà là Hộ Tinh đầu tiên. Lịch Niên Sao tính từ năm này. [Công khai]
  - Các làng học được rằng **lời ước cả làng cùng ước thì bay nhanh hơn**. Ông Đúc Trống đúc chiếc trống đồng đầu tiên để cả làng gõ cùng lúc khi ước. Từ đó trống đồng trở thành vật thiêng của Đảo Lạc. [Công khai]
- **Huyền thoại:** Bà Lưới, Ông Đúc Trống.
- **Di tích:**
  - **Bãi Sao Rơi:** bãi cát đen phía nam đảo, nơi Bà Lưới thấy sao đầu tiên. Cũng là nơi Người Ước Nguyện tỉnh dậy.
  - **Đình Trống Đồng:** ngôi đình cổ nhất đảo, giữ chiếc trống của Ông Đúc Trống.
- **Bí mật:** Con trai của Bà Lưới không bao giờ trở về. Lời ước của bà chỉ được trả lời một nửa: bà được sức mạnh chứ không được con. Nửa lời ước còn lại là hạt nguyện đầu tiên chìm xuống Biển Lặng. [Hé lộ Ch.1]

### Thời kỳ 4: Thời Trăm Bến (khoảng NS 400 – NS 1045)

- **Sự kiện:**
  - Hộ Tinh hệ Phong ở Lũng Vân tìm ra luồng gió mùa nối các vùng. Thuyền buôn bắt đầu đi lại giữa bảy vùng. [Công khai]
  - **Khoảng NS 520:** Ông Mười Buồm lập **Đoàn Thuyền Buôn Gió Nồm** ở cảng Vạn Đăng. [Công khai]
  - **Khoảng NS 610:** Những người ghi chép sao băng từ nhiều vùng họp nhau thành **Người Đếm Sao**, mở đài quan sát đầu tiên trên đỉnh cao nhất Đảo Lạc. [Công khai]
  - Giao thương làm người ta ước nhiều hơn bao giờ hết: ước giàu, ước thắng, ước người khác thua. Số lời ước không thành tăng gấp nhiều lần. Bà Khơi lặng lẽ **nuốt Nguyện Cặn** chìm quanh đảo để biển khỏi đục. [Hé lộ Ch.1 là Bà Khơi nuốt bùn; Hé lộ Ch.7 là bà đã chịu đựng thế nào]
- **Huyền thoại:**
  - **Ông Mười Buồm:** thuyền trưởng có con thuyền mười cánh buồm, mỗi cánh do một thợ dệt ở một vùng khác nhau làm.
  - **Bà Đầu Sổ Thứ Nhất:** người lập sổ sao, chép tên sáu nghìn vì sao trong đời mình.
- **Di tích:**
  - **Cảng cổ Vạn Đăng:** bến đá cũ dưới phố đèn lồng, nay ngập nửa.
  - **Hải Đăng Mắt Cá:** ngọn hải đăng cũ đã tắt ở mũi đảo phía tây.
- **Bí mật:** Sổ sao của Người Đếm Sao ghi rằng từ NS 900, số sao mới sinh ra ít dần mỗi năm. Lời ước nhiều hơn nhưng sao lại ít hơn, vì phần lớn lời ước đã chìm. [Hé lộ Ch.4]

### Thời kỳ 5: Thời Nước Đen (NS 1046 – NS 1052)

- **Sự kiện:**
  - **NS 1046, tháng Lưới:** Nguyện Cặn tích tụ trong Bà Khơi quá nhiều, nó tách ra khỏi bà và thành hình một con giao đen khổng lồ: **Hắc Giao**. Nó trồi lên ở Vịnh Khơi và kéo theo **Mùa Nước Đen**: nước biển đen lại, triều dâng không rút. Ba làng ven biển phía đông chìm. [Công khai: Hắc Giao xuất hiện và ba làng chìm. Hé lộ Ch.1: Hắc Giao sinh ra từ Nguyện Cặn. Bí mật cuối: nó tách ra từ chính Bà Khơi]
  - **NS 1046 – 1051:** Năm năm chiến đấu và chạy lũ. Dân rút lên vùng cao. Phố Vạn Đăng được dựng tạm trên núi.
  - **NS 1052:** Bà Khơi và **Năm Người Giữ Đảo** dụ Hắc Giao vào hang đá dưới núi phía bắc. Tô Khuyết khắc **bốn Bia Đá cổ** ở bốn hướng quanh hang làm neo. Bà Khơi rót gần hết sức mình vào phong ấn rồi chìm xuống ngủ ở đáy Hồ Gương. Từ đó bà không nói nữa. [Công khai]
- **Năm Người Giữ Đảo** (huyền thoại, sáng tác mới):

| Tên           | Nguyên tố | Vai trò trong trận phong ấn                                       | Số phận                                                            |
| ------------- | --------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| Tô Khuyết     | Thổ       | Thợ khắc trẻ, khắc bốn Bia Đá neo phong ấn                        | Mất sao năm NS 1061, biến mất. [Bí mật: thủ lĩnh Hội Mặt Nạ]       |
| Nàng Vạn Đăng | Hỏa       | Người làm đèn, dẫn dân chạy lũ trong đêm bằng hàng nghìn ngọn đèn | Mất năm NS 1088. Phố Vạn Đăng mang tên nàng                        |
| Ông Lái Gió   | Phong     | Người Lũng Vân, lái thuyền chở Bà Khơi tới miệng hang             | Về Lũng Vân, viết sách _Mười Đêm Nước Đen_                         |
| Hà Thanh      | Băng      | Cung thủ, bắn tên băng giữ Hắc Giao đứng yên lúc khắc bia         | Hy sinh trong hang. Tên nàng khắc ở Bia Bắc                        |
| Kiên          | Lôi       | Trưởng đội dân binh, sau lập Quân Trấn Thủ                        | Mất năm NS 1090. Quân Trấn Thủ thờ cây thương của ông ở trại chính |

- **Di tích:**
  - **Hang Hắc Giao:** hang sâu dưới núi phía bắc, nơi có boss.
  - **Bốn Bia Đá cổ:** Bia Đông, Bia Tây, Bia Nam, Bia Bắc. Trên bản đồ bản thử nghiệm đây là bốn Bia Đá dùng để hồi phục và dịch chuyển.
  - **Làng Chìm:** những mái đình ba làng cũ, nhìn thấy dưới nước khi triều xuống thấp ở Vịnh Khơi.
- **Bí mật:** Trong hang, Hà Thanh không chết vì Hắc Giao. Tô Khuyết đã ước Hà Thanh được sống, nhưng sao không trả lời, và nàng chết trong tay anh. Đó là lời ước đầu tiên của Tô Khuyết chìm xuống Biển Lặng. [Hé lộ Ch.6]

### Thời kỳ 6: Thời Bia Đá (NS 1053 – NS 1339)

- **Sự kiện:**
  - **NS 1055:** Các làng lập **Hội Đồng Đình Trống**, cai quản đảo bằng hội đồng các bô lão và đại diện các phường. [Công khai]
  - **NS 1057:** **Hội Đền Trăng** ra đời để trông giấc ngủ của Bà Khơi, hát cho bà mỗi đêm trăng rằm. [Công khai]
  - **NS 1061:** Tô Khuyết tìm cách đánh thức Bà Khơi bằng cách mở một phần phong ấn. Anh tin rằng bà sẽ tự khống chế được Hắc Giao. Vì sao của anh mang lời ước "mong đảo bình yên", nên nó bỏ anh. Tinh Văn tắt. Hội Đồng Đình Trống trục xuất anh. Anh biến mất trên một thuyền buôn. [Công khai: có một người giữ đảo bị trục xuất. Hé lộ Ch.2: người đó là Tô Khuyết. Hé lộ Ch.6: lý do thật]
  - **NS 1068:** **Phường Đá Ngọc** được lập, nhận việc giữ và sửa bốn Bia Đá cổ. [Công khai]
  - **NS 1110:** Người Đếm Sao và Phường Đá Ngọc dựng **Tháp Tinh Tú** trên nền một vết sao rơi nhỏ. Tháp hứng ánh sao xuống mạch sao và nuôi bốn Bia Đá, giúp phong ấn bền thêm. Mười hai tầng ứng với mười hai chòm sao của lịch. [Công khai]
  - **Khoảng NS 1180:** Những người đeo mặt nạ gốm trắng đầu tiên xuất hiện ở Lũng Vân, đi xin những tờ giấy ước bị đốt bỏ. [Hé lộ Ch.2]
  - **NS 1230:** Một nhóm đeo mặt nạ cướp kho Đá Sao của Người Đếm Sao trên Đảo Lạc. Dân gian bắt đầu gọi họ là **Hội Mặt Nạ**. [Công khai]
  - **NS 1310 – 1345:** Thạch Sơn khắc **trăm bia đường** khắp đảo, ghi tên người cũ và chỉ lối. Ông cũng tu sửa bốn Bia Đá cổ. [Công khai]
- **Huyền thoại:**
  - **Thợ Cả Đầu:** người lập Phường Đá Ngọc, được cho là học trò cũ của Tô Khuyết.
  - **Bà Hiên:** Bà Cả đầu tiên của Hội Đền Trăng, người viết những bài hát ru Bà Khơi mà nay trẻ con trên đảo vẫn hát.
- **Di tích:** Tháp Tinh Tú, trăm bia đường, nền móng phố Vạn Đăng tạm trên núi (nay là **Phố Cũ** trên đồi).
- **Bí mật:** Tô Khuyết không chết. Anh sống bằng cách uống Nguyện Cặn, thứ giữ anh không già nhưng xóa dần gương mặt anh. [Hé lộ Ch.6]

### Thời kỳ 7: Thời Thức Giấc (NS 1340 – nay)

- **Sự kiện:**
  - **NS 1340 – 1349:** Nước Vịnh Khơi đen lại theo từng mảng nhỏ. Quái trên đảo hung dữ hơn. Có sao rơi giữa ban ngày. [Công khai]
  - **NS 1347:** Bia Đông và Bia Tây mất lõi sao. Phường Đá Ngọc giữ kín chuyện này. [Hé lộ Ch.1]
  - **NS 1349:** Tuyết Lan đến Đảo Lạc theo một vì sao rơi lệch hướng. Bạch Vũ đến trên thuyền buôn, mang thư của Thính Phong. [Công khai: hai người là khách từ xa. Hé lộ Ch.2 và Ch.3: lý do thật]
  - **NS 1350, đêm đầu tháng Trống:** Một sao băng vàng rất lớn rơi xuống Bãi Sao Rơi. Sáng hôm sau, dân làng chài tìm thấy Người Ước Nguyện nằm trên cát. Cùng đêm đó, Hắc Giao cựa mình trong hang. [Công khai]
- **Di tích:** Bản đồ Đảo Lạc hiện nay (xem \`03-dia-ly.md\`).

## 3. Hắc Giao: xuất hiện, phong ấn, thức dậy

| Câu hỏi                    | Trả lời                                                                                                                                                                                                                                                                                       | Nhãn                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Lần đầu xuất hiện          | NS 1046, ở Vịnh Khơi, kéo theo Mùa Nước Đen                                                                                                                                                                                                                                                   | Công khai                               |
| Nó là gì                   | Con giao đen thành hình từ Nguyện Cặn, tức những lời ước không ai nghe                                                                                                                                                                                                                        | Hé lộ Ch.1                              |
| Nó từ đâu ra               | Tách ra từ chính Bà Khơi, phần bùn mà bà đã nuốt suốt sáu trăm năm                                                                                                                                                                                                                            | Bí mật cuối                             |
| Phong ấn ra sao            | Bà Khơi dụ nó vào hang dưới núi phía bắc. Tô Khuyết khắc bốn Bia Đá neo bốn hướng. Hà Thanh giữ nó đứng yên. Bà Khơi rót sức mình vào phong ấn rồi ngủ ở Hồ Gương. Năm NS 1110, Tháp Tinh Tú được dựng để nuôi bốn bia                                                                        | Công khai                               |
| Vì sao nay thức dậy        | 1. Ba trăm năm Nguyện Cặn tiếp tục chìm xuống, phong ấn quá tải. 2. Hội Mặt Nạ lấy lõi sao của Bia Đông và Bia Tây năm NS 1347. 3. Người Ước Nguyện rơi xuống: lời ước của họ được Tinh Hải nghe ngay, và Hắc Giao, kẻ sinh ra từ những lời không ai nghe, cảm thấy điều đó như một tiếng gọi | 1 công khai, 2 hé lộ Ch.1, 3 hé lộ Ch.7 |
| Vì sao không giết hẳn được | Giết Hắc Giao là giết phần bị thương của Bà Khơi, và bà sẽ chết theo. Cách giải duy nhất là trả những lời ước trong nó về cho người đã ước, để họ cùng gánh                                                                                                                                   | Bí mật cuối                             |

Đánh Hắc Giao trong bản thử nghiệm (hai giai đoạn, đánh lại nhiều lần) được giải thích là **làm nó dịu lại** và đẩy nó về sâu trong hang. Hắc Giao không chết hẳn trước chương kết.

## 4. Nguồn gốc Hội Mặt Nạ (tóm tắt)

Hồ sơ đầy đủ ở \`07-hac-giao-va-hoi-mat-na.md\`.

1. **NS 1061:** Tô Khuyết mất sao và bị trục xuất. [Hé lộ Ch.2]
2. **NS 1061 – 1180:** Anh đi qua nhiều vùng, gặp những người như mình: Người Tắt Sao, người ước cả đời không được chọn, người có lời ước bị đốt bỏ. Anh dạy họ rằng việc sao chọn người là bất công. [Hé lộ Ch.2]
3. **Khoảng NS 1180:** Nhóm đầu tiên làm mặt nạ gốm trắng. Mặt nạ không để che mặt mà để **chứa một lời ước không thành** của chính người đeo. Đeo mặt nạ nghĩa là "ta không cần sao nhìn thấy mặt ta". [Hé lộ Ch.2]
4. **NS 1230:** Cướp kho Đá Sao trên Đảo Lạc, lần đầu được biết công khai. [Công khai]
5. **NS 1347:** Lấy lõi sao của hai Bia Đá cổ. [Hé lộ Ch.1]
`,os=`# 03. Địa lý

## 1. Bản đồ tổng thể

Vọng Tinh Giới là một vòng đất bao quanh một biển trong lớn tên **Biển Trăm Bến**. Đảo Lạc nằm ở giữa biển, mọi luồng gió mùa và hải lưu đều đi qua đảo. Vì vậy đảo là nơi khởi đầu tự nhiên của mọi chuyến đi.

\`\`\`
                         Bắc
         KHOKHTAL (Lôi)                 SHIZUKANE (Băng)
     thảo nguyên, giông            quần đảo núi tuyết
              \\                        /
               LŨNG VÂN (Phong)   PURUNAE (Mộc)
            núi mây, ruộng bậc    bán đảo rừng thông
                      \\             /
   Tây  ------------  BIỂN TRĂM BẾN  ------------  Đông
                           ĐẢO LẠC (Thủy)
                      /                 \\
         GOLBARAN (Thổ)                  Biển Lặng sâu
     sa mạc, ốc đảo, mái vòm             (không ai qua được)
             |
         MAREVIA (Hỏa)
   bờ biển đá trắng, núi lửa
\`\`\`

| Đường đi  | Từ Đảo Lạc                                           | Thời gian trong truyện |
| --------- | ---------------------------------------------------- | ---------------------- |
| Lũng Vân  | Thuyền buôn đi gió mùa đông bắc lên phía tây bắc     | 6 ngày                 |
| Purunae   | Thuyền nhỏ lên phía bắc                              | 5 ngày                 |
| Shizukane | Qua Purunae rồi vượt eo biển                         | 9 ngày                 |
| Khokhtal  | Qua Lũng Vân rồi đi ngựa lên cao nguyên              | 15 ngày                |
| Golbaran  | Thuyền buôn xuống phía tây nam, cập bờ rồi đi lạc đà | 12 ngày                |
| Marevia   | Qua Golbaran theo Đường Cát hoặc đi biển vòng        | 20 ngày                |

### 1.1. Thứ tự vùng theo cốt truyện

| Chương | Vùng                | Lý do đi (tóm tắt)                                                                                                                  |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1      | Đảo Lạc             | Tỉnh dậy ở Bãi Sao Rơi, Hắc Giao cựa mình, hai Bia Đá cổ mất lõi                                                                    |
| 2      | Lũng Vân            | Bạch Vũ mang thư của Thính Phong: có người lấy trộm giấy ước bị đốt, và Thính Phong giữ lời nói cuối của người giữ đảo bị trục xuất |
| 3      | Shizukane           | Tuyết Lan theo vì sao lệch hướng về đây. Hoa văn tuyết của Yukiyo đã ghi lại trận phong ấn năm NS 1052                              |
| 4      | Golbaran            | Kho gạch men của Ostad Khesht giữ bản sao sổ sao, cho thấy sao mới sinh ít dần                                                      |
| 5      | Marevia             | Cần Faber rèn lõi sao mới cho Bia Đông và Bia Tây                                                                                   |
| 6      | Khokhtal            | Theo dấu Tô Khuyết. Aianga đã thấy khoảnh khắc anh mất niềm tin                                                                     |
| 7      | Purunae             | Chỉ rễ của Sonamu chạm được tới Biển Lặng để rút bùn khỏi Bà Khơi mà không giết bà                                                  |
| 8      | Đảo Lạc và Tinh Hải | Chương kết                                                                                                                          |

Bản thử nghiệm chỉ làm Đảo Lạc. Các vùng còn lại viết đủ để thiết kế nhân vật đến từ đó.

---

## 2. Đảo Lạc (cảm hứng Việt Nam), Thủy

- **Tên:** Đảo Lạc. "Lạc" trong chim Lạc, và cũng là "lạc" trong "lạc đường": đảo nơi mọi thứ trôi dạt tới.
- **Thủ phủ:** Phố Vạn Đăng.
- **Trấn Tinh:** Bà Khơi.

### 2.1. Thể chế và quan hệ

- **Thể chế:** **Hội Đồng Đình Trống**, gồm mười hai bô lão do các làng cử và đại diện các phường nghề. Đứng đầu là Cụ Trưởng Đình, nhiệm kỳ đến khi tự xin thôi. Họp ở Đình Trống Đồng, việc lớn phải gõ trống báo cả đảo.
- **Quân sự:** Quân Trấn Thủ, đặt dưới Hội Đồng.
- **Quan hệ:** Là ngã tư của Biển Trăm Bến, đảo trung lập và buôn bán với mọi vùng. Thân nhất với Lũng Vân và Purunae. Golbaran và Marevia coi Đảo Lạc là trạm nghỉ quan trọng. Khokhtal ít qua lại vì xa biển.

### 2.2. Trấn Tinh: Bà Khơi

- **Tính cách:** dịu dàng, nhẫn nại, giữ hết cho riêng mình. Bà không bao giờ phạt ai, chỉ âm thầm nhận lấy.
- **Hình dáng trong truyện kể:** một người đàn bà cao bằng cây cau, tóc là dòng nước, mặc áo tứ thân màu nước sông, đội nón quai thao kết bằng sóng.
- **Lịch sử:** rơi xuống Vịnh Khơi thời Bảy Sao Xuống, dạy Cô Gieo dẫn nước vào ruộng. Từ Thời Trăm Bến, bà nuốt Nguyện Cặn để giữ biển trong. Năm NS 1052 bà phong ấn Hắc Giao rồi ngủ ở đáy Hồ Gương.
- **Quan hệ với người:** người dân không thờ bà như thần cai trị. Họ hát ru bà như hát ru một người mẹ già ốm. Hội Đền Trăng thay phiên trông bà.
- **Điều đặc biệt:** bà là Trấn Tinh duy nhất hiện **không thể nói chuyện** với ai.

### 2.3. Thiên nhiên

- **Khí hậu:** nhiệt đới gió mùa. Mùa mưa từ tháng Thuyền đến tháng Chuông (tháng 5–9), sáng sớm nhiều sương, hè có giông. Núi phía bắc mát, có sương muối vào tháng Đuốc và tháng Trống.
- **Địa hình:** đồng bằng ven biển ở nam và đông, đồi trung du ở giữa, núi phía bắc, một hồ tròn lớn ở trung tâm (Hồ Gương), rừng trúc phía tây.
- **Động vật:** cò, chim lạc (loài chim lớn mỏ dài, biểu tượng của đảo), trâu, cá chép, cua đá, đom đóm.
- **Thực vật:** lúa nước, trúc, tre, sen, cau, đa cổ thụ, hoa súng.
- **Tài nguyên:** cá, lúa, đồng để đúc trống, ngọc bích ở mỏ phía bắc, giấy dó.

### 2.4. Địa danh

| #   | Tên                        | Mô tả                                                                                                                                                                                                                               | Bí mật nhỏ                                                                                                                          |
| --- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Bãi Sao Rơi**            | Bãi cát đen lấp lánh ở mũi nam, cát có những hạt sáng như mảnh sao. Nơi Bà Lưới thấy vì sao đầu tiên năm NS 1, và nơi Người Ước Nguyện tỉnh dậy.                                                                                    | Đào sâu một sải tay sẽ gặp lớp cát trắng như sứ, đó là nơi sao băng vàng chạm đất đêm đầu năm NS 1350.                              |
| 2   | **Làng Vạn Lưới**          | Làng chài lớn nhất đảo, nhà sàn tre bên cửa Sông Sương đổ ra biển, lưới phơi kín bãi. Khu nhỏ **Bến Sông Sương** là nơi Sương Mai luyện kiếm mỗi sáng.                                                                              | Dưới gầm nhà trưởng làng có một chiếc thuyền nhỏ không bao giờ được hạ thủy. Người ta nói đó là thuyền của con trai Bà Lưới.        |
| 3   | **Phố Vạn Đăng**           | Thủ phủ, phố cảng mái ngói rêu phong, đêm nào cũng treo hàng nghìn đèn lồng. Có **Đình Trống Đồng** (trụ sở Hội Đồng, giữ trống đồng cổ nhất), chợ đêm, bến thuyền buôn. Trên đồi phía sau là **Phố Cũ**, nơi Mai Linh mở hàng đèn. | Đèn lồng đầu tiên của Nàng Vạn Đăng vẫn treo ở góc một con hẻm trong Phố Cũ và chưa bao giờ tắt. Không ai biết ai châm dầu cho nó.  |
| 4   | **Rừng Trúc Mây**          | Rừng trúc phía tây, thân trúc cao đến mức ngọn chìm trong mây thấp. Gió qua rừng tạo tiếng như sáo. Nơi ở của Yêu Rừng.                                                                                                             | Có một lối đi chỉ hiện ra khi trăng non, dẫn tới một khoảng đất trống có bàn cờ đá. Không ai biết ai đã chơi dở ván cờ trên đó.     |
| 5   | **Hồ Gương và Đền Trăng**  | Hồ tròn hoàn hảo giữa đảo, mặt nước phẳng như gương. Đền Trăng mái cong nằm bên bờ, có chuông bạc, chỉ mở cửa trong cho khách vào đêm rằm. Bà Khơi ngủ dưới đáy hồ.                                                                 | Vào những đêm không trăng, mặt hồ phản chiếu bầu trời của ba trăm năm trước. Thủy Nguyệt biết chuyện này và giữ kín.                |
| 6   | **Đỉnh Vọng Vân**          | Đỉnh núi cao nhất đảo ở phía bắc, có **Đài Đếm Sao** của Người Đếm Sao. Phong Vân lớn lên ở đây.                                                                                                                                    | Trên vách đá sau đài có một danh sách tên được khắc rồi bị đục xóa. Một trong những tên đó là Tô Khuyết.                            |
| 7   | **Mỏ Ngọc Lòng Chảo**      | Mỏ ngọc bích trong một thung lũng hình lòng chảo dưới chân núi. Phường Đá Ngọc khai thác ở đây. Ngọc Thạch là con gái một thợ mỏ ở đây.                                                                                             | Tầng sâu nhất của mỏ đã bị bịt từ NS 1052, vì từ đó nghe được tiếng thở của Hắc Giao.                                               |
| 8   | **Vịnh Khơi và Làng Chìm** | Vịnh phía đông, nơi Bà Khơi rơi xuống thời Bảy Sao Xuống và nơi Hắc Giao trồi lên năm NS 1046. Khi triều xuống thấp, thấy mái đình ba làng chìm.                                                                                    | Trong đình chìm lớn nhất vẫn còn một chiếc trống đồng. Gõ đúng nhịp ru của Bà Hiên thì nước quanh vịnh trong trở lại trong một đêm. |
| 9   | **Tháp Tinh Tú**           | Tháp đá mười hai tầng dựng năm NS 1110 trên một vết sao rơi nhỏ ở phía đông bắc. Mỗi tầng khắc một chòm sao của lịch. Ánh sao rơi vào tháp rồi chảy xuống mạch sao nuôi bốn Bia Đá.                                                 | Có tầng thứ mười ba không có cầu thang, chỉ thấy được từ bên ngoài vào đêm sao rơi.                                                 |
| 10  | **Hang Hắc Giao**          | Hang sâu dưới núi phía bắc, miệng hang có bốn Bia Đá cổ trấn ở bốn hướng: Bia Đông, Bia Tây, Bia Nam, Bia Bắc. Nước trong hang đen như mực.                                                                                         | Bia Bắc khắc tên Hà Thanh. Ai đứng trước bia này lâu sẽ nghe một giọng con gái đếm nhịp thở.                                        |

Ghi chú cho thiết kế bản đồ: bản thử nghiệm sinh bản đồ theo seed 110×110 ô với 4 Bia Đá, cổng Tháp, hang Boss. Bốn Bia Đá trên bản đồ là **bốn Bia Đá cổ**. Session làm bản đồ có thể đặt các khu theo hướng ở bảng trên.

### 2.5. Văn hóa

- **Ẩm thực:**
  1. **Bánh Trống**: bánh gạo nếp tròn dẹt, mặt in hoa văn trống đồng, nhân đậu xanh và thịt. Ăn trong Tết Sao Rơi. (Cảm hứng: bánh chưng, bánh dày.)
  2. **Bún Cá Vạn Lưới**: bún nước dùng chua thanh nấu từ cá và cà chua, ăn với rau sống. Món sáng của làng chài. (Cảm hứng: bún cá, canh chua.)
  3. **Chè Sao Rơi**: chè hạt sen với thạch đen cắt hình ngôi sao, nước cốt dừa. Bán ở chợ đêm Vạn Đăng.
- **Nghề truyền thống:** đánh cá, làm đèn lồng, đúc đồng, khắc đá, dệt chiếu, làm giấy dó.
- **Lễ hội:**
  - **Tết Sao Rơi** (đầu tháng Trống): đầu năm. Cả làng gõ trống đồng cùng lúc và ước chung một lời.
  - **Hội Vạn Đăng** (rằm tháng Đèn Lồng): thả đèn lồng giấy trên sông để tưởng Nàng Vạn Đăng.
  - **Đêm Ru Bà** (mỗi rằm, lớn nhất vào rằm tháng Gương): Hội Đền Trăng mở cửa, dân đến bờ Hồ Gương hát ru Bà Khơi.
- **Nhạc nền gợi ý:** đàn bầu, sáo trúc, đàn nguyệt, trống đồng, mõ. Nhịp 2/4 thong thả, có điệu hò chèo thuyền. Cảm xúc ban ngày bình yên, ấm. Ban đêm thì da diết, có chút buồn.
- **Bảng màu:**

| Mã        | Gợi ý                                     |
| --------- | ----------------------------------------- |
| \`#0f1b3d\` | Trời đêm (đồng bộ tông giao diện hiện có) |
| \`#c8962d\` | Đồng trống đồng                           |
| \`#2f7a5b\` | Trúc và lúa non                           |
| \`#d9433b\` | Đèn lồng đỏ                               |
| \`#f3e6c4\` | Giấy dó, cát trắng                        |

- **Trang phục:** áo tứ thân, áo dài cổ, khăn vấn, nón lá, nón quai thao, yếm (chỉ dùng như lớp trong, không hở hang), áo cánh nâu của người làng chài.

### 2.6. Quái đặc trưng

| Quái                                                 | Vì sao sống ở đây                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| Giọt Nhầy                                            | Hạt nguyện rơi xuống đất ẩm rồi đông lại. Nhiều nhất quanh ruộng và bờ sông |
| Yêu Rừng, Yêu Rừng Cung Thủ                          | Dân rừng trúc, nay hung dữ vì Hội Mặt Nạ đốt bãi trúc của chúng             |
| Pháp Sư Mặt Nạ                                       | Thành viên cấp thấp của Hội Mặt Nạ, lén lút quanh các Bia Đá                |
| Hộ Vệ Đá Cổ                                          | Tượng đá do Tô Khuyết khắc để canh hang, nay không phân biệt bạn thù        |
| Cua Mai Đồng, Đom Đóm Lạc Lối, Bóng Cặn, Trâu Đá Ngủ | Xem \`06-sinh-vat.md\`                                                        |
| Hắc Giao                                             | Boss, trong Hang Hắc Giao                                                   |

---

## 3. Lũng Vân (cảm hứng Trung Hoa cổ), Phong

- **Tên:** Lũng Vân, Hán Việt: _lũng_ (thung lũng) + _vân_ (mây), tức "thung lũng mây".
- **Thủ đô:** Thiên Diên Thành, Hán Việt: _thiên_ (trời) + _diên_ (diều), tức "thành diều trời". Hàng nghìn con diều buộc dây trên mái thành.
- **Trấn Tinh:** Thính Phong, Hán Việt: "người nghe gió". Dân gọi thân là "Ông Nghe".

### 3.1. Thể chế và quan hệ

- **Thể chế:** **Hội Đồng Bút**, gồm chín học sĩ đỗ đầu kỳ thi Phong Khảo tổ chức ba năm một lần. Người đứng đầu gọi là **Chưởng Bút**. Không có vua. Mọi luật lệ phải được viết ra và đọc to trước gió ở quảng trường thành.
- **Quan hệ:**
  - Đảo Lạc: bạn lâu năm, chung đường thuyền buôn. Ông Lái Gió, một trong Năm Người Giữ Đảo, là người Lũng Vân.
  - Khokhtal: tranh chấp đồng cỏ biên giới. Năm NS 1288 hai bên ký **Ước Thư Biên Gió**: chỉ chăn thả khi gió thổi từ bắc xuống.
  - Golbaran: bạn hàng trên **Đường Cát**, đổi lụa lấy gạch men và nghệ tây.
  - Shizukane: Thính Phong và Yukiyo viết thư cho nhau hằng năm bằng gió và tuyết.
- **Lý do người chơi đến (Ch.2):** Bạch Vũ mang thư của Thính Phong tới Đảo Lạc. Có người đang lấy trộm giấy ước mà dân Lũng Vân đốt sau Hội Thả Diều. Thính Phong còn giữ lời nói cuối cùng của Tô Khuyết trước khi anh biến mất.

### 3.2. Trấn Tinh: Thính Phong

- **Tính cách:** khó tính, kỹ lưỡng, rất ghét lời dối, nhưng tận tụy và hay âm thầm giúp học trò nghèo. Nói ít, viết nhiều.
- **Hình dáng:** ông già gầy, áo bào lụa xám bạc bay mãi không rủ xuống, tay luôn cầm bút. Râu dài thành từng sợi mây.
- **Lịch sử:** từ Thời Bảy Sao Xuống ông chép lại mọi lời nói mà gió mang qua Lũng Vân. Thời Trăm Bến ông xé bỏ toàn bộ sổ của một thành vì cả thành lừa ông. Thành đó mất hết lịch sử, nay là **Thành Không Tên**. Ông hối hận cả nghìn năm.
- **Quan hệ với người:** ông là **ông thầy**. Dân mang tranh chấp đến Các Nghe Gió để ông đọc lại lời gió đã ghi: ai đã hứa gì, ai đã nói gì. Ông không xử, chỉ đọc. Người ta tự xấu hổ.

### 3.3. Thiên nhiên

- **Khí hậu:** ôn đới bốn mùa. Xuân nhiều gió, hè nóng ẩm, thu khô trong, đông lạnh. Thung lũng sáng nào cũng ngập mây.
- **Địa hình:** núi đá vôi dựng đứng như cột, ruộng bậc thang, sông rộng chảy chậm, vách đá dài.
- **Động vật:** hạc, khỉ núi, cá chép vàng, ngựa nhỏ chân ngắn, tằm.
- **Thực vật:** tre, thông, mẫu đơn, chè, dâu tằm, liễu.
- **Tài nguyên:** giấy, lụa, mực, chè, ngọc trắng.

### 3.4. Địa danh

| #   | Tên                     | Mô tả                                                                                                                                      | Bí mật nhỏ                                                                                            |
| --- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 1   | **Thiên Diên Thành**    | Thủ đô xây trên ba tầng vách núi, nối bằng cầu treo. Mái cong lợp ngói xanh, nghìn con diều buộc trên mái để đo hướng gió.                 | Có một con diều không dây bay trên thành đã ba trăm năm. Nó là diều của Ông Lái Gió.                  |
| 2   | **Các Nghe Gió**        | Tòa tháp chín tầng làm bằng giấy bồi trên vách đá cao nhất. Nơi Thính Phong ở và chép sổ. Gió chui qua lỗ cửa sổ tạo thành tiếng thì thầm. | Tầng chín không có sổ, chỉ có một tờ giấy trắng. Thính Phong để dành nó cho lời nói ông chưa dám ghi. |
| 3   | **Thung Mây Ngủ**       | Thung lũng sâu luôn ngập mây đến ngang ngực. Người dân đi thuyền nhỏ trên mây.                                                             | Mây ở đây là hơi thở của một vì sao già chưa chịu rơi.                                                |
| 4   | **Ruộng Bậc Chín Tầng** | Ruộng lúa bậc thang chín tầng, mỗi tầng một giống lúa khác nhau, chín màu từ xanh tới vàng.                                                | Bờ ruộng tầng ba có những dòng chữ do nông dân khắc để ghi năm mất mùa.                               |
| 5   | **Bến Lụa**             | Bến sông nơi các xưởng dệt phơi lụa dài cả dặm. Lụa bay như sông thứ hai trên trời.                                                        | Một số tấm lụa được dệt kèm chữ ẩn chỉ đọc được khi ngược sáng. Đó là thư tình.                       |
| 6   | **Hẻm Thư Pháp**        | Hẻm núi hẹp, vách đá bị gió mài thành những nét như chữ viết. Học sĩ đến chép lại để học thư pháp.                                         | Gió viết thêm chữ mới mỗi năm. Năm NS 1349, vách đá hiện lên ba chữ "Hắn đã về".                      |
| 7   | **Thành Không Tên**     | Phế tích một thành cổ ở cuối thung lũng. Không ai nhớ tên, không có sổ ghi chép nào.                                                       | Phế tích là nơi Hội Mặt Nạ cất giấy ước bị đốt.                                                       |
| 8   | **Hồ Mực**              | Hồ nước đen tự nhiên vì đá phiến dưới đáy. Dân lấy nước hồ làm mực.                                                                        | Nhúng bút vào hồ mà viết lời dối thì chữ tự bay khỏi giấy.                                            |

### 3.5. Văn hóa

- **Ẩm thực:**
  1. **Mì Kéo Gió**: mì kéo bằng tay quay thật nhanh cho gió làm sợi dai, ăn với nước xương hầm. (Cảm hứng: mì kéo tay.)
  2. **Bánh Bao Mây**: bánh bao hấp trắng mịn, nhân rau và nấm, hấp trong lồng tre trên hơi nước suối nóng.
  3. **Canh Chè Hạc**: canh nấu bằng lá chè non, đậu phụ và nấm, món của học sĩ trước ngày thi.
- **Nghề truyền thống:** làm giấy, dệt lụa, nuôi tằm, làm diều, viết thư pháp, làm mực.
- **Lễ hội:**
  - **Hội Thả Diều Thư** (tháng Diều): mỗi nhà viết lời ước lên diều, thả cho gió mang tới Thính Phong. Sau hội, diều rơi được gom lại và đốt.
  - **Đêm Đọc Gió** (rằm tháng Hạc): Thính Phong đọc to một trang sổ cũ ở quảng trường. Ai nghe được tên tổ tiên mình là điềm lành.
- **Nhạc nền gợi ý:** đàn tranh, đàn nhị, sáo tiêu, chuông đồng nhỏ. Thang ngũ cung, nhịp vừa. Cảm xúc thanh cao, rộng, hơi xa vắng.
- **Bảng màu:**

| Mã        | Gợi ý                  |
| --------- | ---------------------- |
| \`#b8312f\` | Son đỏ cột và cửa      |
| \`#1f3b4d\` | Mực đen xanh           |
| \`#e8dcc0\` | Giấy và lụa mộc        |
| \`#6b8f71\` | Ngọc bích nhạt, lá chè |
| \`#d4a640\` | Vàng lụa thêu          |

- **Trang phục:** áo giao lĩnh tay rộng, áo bào lụa, thắt lưng vải dài, mũ vải học sĩ, áo ngắn của người làm ruộng.
- **Tránh:** không dựng đạo quán, chùa thật, không dùng danh hiệu thần trong tín ngưỡng thật, không có hoàng đế hay triều đình lịch sử.

### 3.6. Quái đặc trưng

| Quái              | Vì sao sống ở đây                                                |
| ----------------- | ---------------------------------------------------------------- |
| Diều Hoang        | Diều ước bị đốt không hết, hạt nguyện còn sót làm chúng sống dậy |
| Hạc Mực           | Hạc uống nước Hồ Mực, lông đen, sống quanh Hẻm Thư Pháp          |
| Lính Mặt Nạ Trắng | Hội Mặt Nạ hoạt động mạnh quanh Thành Không Tên                  |

---

## 4. Shizukane (cảm hứng Nhật Bản), Băng

- **Tên:** Shizukane (静鐘), tiếng Nhật: _shizuka_ (lặng) + _kane_ (chuông), tức "chuông lặng". Hiển thị: **Shizukane, Xứ Chuông Lặng**.
- **Thủ đô:** Yukiakari (雪明かり), nghĩa là "ánh sáng tuyết hắt lên trong đêm". Hiển thị: **Yukiakari, Thành Tuyết Sáng**.
- **Trấn Tinh:** Yukiyo (雪夜), nghĩa là "đêm tuyết". Dân gọi là "Bà Đêm Tuyết".

### 4.1. Thể chế và quan hệ

- **Thể chế:** **Hội Đồng Bốn Mùa**. Bốn dòng họ nghề (Rèn, Trà, Giấy, Chuông), mỗi họ cầm quyền một mùa trong năm. Việc lớn phải có cả bốn họ đồng ý. Không có vua, không có tướng quân cai trị.
- **Quan hệ:**
  - Purunae: láng giềng thân nhất, vừa bạn vừa đối thủ (thi gốm, thi trà, thi thơ).
  - Khokhtal: hiềm khích cũ từ trận **Tuyết Lở Lớn** do Yukiyo và Aianga cãi nhau.
  - Đảo Lạc: buôn thép, gỗ tuyết tùng, đổi lấy lúa và cá khô.
  - Lũng Vân: Yukiyo và Thính Phong trao thư hằng năm.
- **Lý do người chơi đến (Ch.3):** Tuyết Lan theo một vì sao rơi lệch hướng từ Shizukane tới Đảo Lạc, và vì sao đó đang gọi cô quay về. Hoa văn tuyết của Yukiyo đã ghi lại toàn bộ trận phong ấn năm NS 1052, vì bà nhìn thấy từ xa. Mặt Nạ Sứ, một trong Ngũ Diện, là người Shizukane.

### 4.2. Trấn Tinh: Yukiyo

- **Tính cách:** trầm, kiên nhẫn, sâu sắc, mang nặng mặc cảm. Bà thương người nhưng sợ chính sức mạnh của mình.
- **Hình dáng:** người đàn bà mặc áo nhiều lớp màu chàm và trắng, tóc dài chạm đất như tuyết trôi, mặt che bằng một tấm khăn mỏng.
- **Lịch sử:** thời Bảy Sao Xuống, bà và Aianga cãi nhau về việc ai được giữ dãy núi biên giới. Tiếng hét của hai vị gây ra **Tuyết Lở Lớn**, vùi ba làng. Từ đó Yukiyo thề không bao giờ cất tiếng.
- **Quan hệ với người:** bà chỉ "nói" bằng **hoa văn của tuyết rơi**. Người Shizukane có một nghề riêng là **Người Đọc Tuyết**, chuyên đọc và chép lại lời bà. Dân coi bà như người cô xa cách nhưng thương mình. Họ học theo bà sự im lặng và tiết chế.

### 4.3. Thiên nhiên

- **Khí hậu:** lạnh. Đông dài, tuyết dày. Xuân ngắn, hè mát, thu đỏ lá.
- **Địa hình:** quần đảo núi cao, rừng tuyết tùng, suối nước nóng, vịnh hẹp sâu.
- **Động vật:** cú tuyết, hươu sao, cá hồi, khỉ suối nóng, chim sẻ núi.
- **Thực vật:** tuyết tùng, phong đỏ, trúc lùn, **lan tuyết** (hoa lan trắng nở dưới tuyết, biểu tượng của Tuyết Lan).
- **Tài nguyên:** thép ít tạp chất, gỗ tuyết tùng, chè, băng lâu tan dùng để bảo quản.

### 4.4. Địa danh

| #   | Tên                                | Mô tả                                                                                                                     | Bí mật nhỏ                                                                                |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1   | **Yukiakari** (Thành Tuyết Sáng)   | Thủ đô trên sườn núi, nhà gỗ mái dốc, đêm đến tuyết phản chiếu ánh đèn nên cả thành sáng mờ. Bốn khu phố của bốn họ nghề. | Dưới thành có hầm băng chứa ký ức của từng trận tuyết. Người Đọc Tuyết cất chép ở đây.    |
| 2   | **Kotonashi-dake** (Núi Không Lời) | Ngọn núi cao nhất, nơi Yukiyo ở. Trên đỉnh không có gió, không có tiếng động nào.                                         | Ai nói một lời thật lòng trên đỉnh thì tuyết rơi thành chữ trả lời. Rất ít người dám thử. |
| 3   | **Kanehashi** (Cầu Chuông)         | Cây cầu gỗ dài qua vịnh, treo một trăm chiếc chuông nhỏ. Chuông chỉ kêu khi có người nói dối trên cầu.                    | Có một chiếc chuông chưa bao giờ kêu, vì nó không có quả lắc. Không ai biết vì sao.       |
| 4   | **Làng Suối Nóng Yuge**            | Làng nhỏ quanh các suối nước nóng, hơi nước bốc lên quanh năm. Khách đường xa nghỉ ở đây.                                 | Một suối nóng ở làng ấm lên bất thường từ năm NS 1349.                                    |
| 5   | **Ranmori** (Rừng Lan)             | Rừng tuyết tùng nơi lan tuyết nở. Tuyết Lan lớn lên ở rìa rừng này.                                                       | Lan tuyết chỉ nở trên những nơi từng có người khóc.                                       |
| 6   | **Xưởng Rèn Shimogane**            | Làng thợ rèn bên thác, búa đập theo nhịp nước. Họ Rèn của Hội Đồng Bốn Mùa ở đây.                                         | Lưỡi kiếm của Tuyết Lan được rèn ở đây, bằng thép trộn một mảnh sao rơi.                  |
| 7   | **Đường Thư Núi**                  | Con đường mòn dài nối các làng núi, dành cho người đưa thư. Có trạm nghỉ mỗi nửa ngày đường.                              | Ở trạm cuối có một hộp thư không người nhận, đầy những lá thư gửi Yukiyo.                 |
| 8   | **Nadare-no-ato** (Vết Tuyết Lở)   | Thung lũng nơi xảy ra Tuyết Lở Lớn, nay phủ băng xanh. Ba làng cổ nằm dưới băng.                                          | Nhìn qua băng thấy được mái nhà cổ còn nguyên. Có một ngọn đèn vẫn sáng dưới băng.        |

### 4.5. Văn hóa

- **Ẩm thực:**
  1. **Yukimusubi**: cơm nắm muối tuyết (muối biển phơi trên tuyết), nhân cá hồi nướng. Món của người đưa thư.
  2. **Lẩu Cá Hồi Suối Nóng**: cá hồi, đậu phụ, củ cải nấu trong nồi đất ngâm trong suối nóng.
  3. **Bánh Lan Tuyết**: bánh nếp dẻo trắng hình hoa lan, nhân đậu đỏ ngọt nhẹ. (Cảm hứng: bánh mochi.)
- **Nghề truyền thống:** rèn thép, làm chuông, pha chè, làm giấy, đưa thư núi, đọc tuyết.
- **Lễ hội:**
  - **Hatsuyuki-yo** (Đêm Tuyết Đầu): đêm tuyết đầu mùa. Người Đọc Tuyết đọc lời Yukiyo cho cả năm.
  - **Hội Chuông Lặng**: một đêm mỗi năm cả xứ không ai nói. Người ta treo chuông không quả lắc trước cửa để tưởng nhớ ba làng bị tuyết vùi.
- **Nhạc nền gợi ý:** sáo trúc dọc shakuhachi, đàn koto, đàn shamisen, chuông nhỏ. Nhịp tự do, nhiều khoảng lặng dài. Cảm xúc thanh tịnh, man mác, rất trong.
- **Bảng màu:**

| Mã        | Gợi ý                |
| --------- | -------------------- |
| \`#f4f7fb\` | Tuyết                |
| \`#2e3a59\` | Chàm đêm             |
| \`#8aa9c1\` | Băng xanh            |
| \`#b23a48\` | Đỏ sơn mài (dùng ít) |
| \`#e6c6d6\` | Lan tuyết hồng nhạt  |

- **Trang phục:** áo nhiều lớp kiểu kimono mùa đông, áo khoác bông haori, khăn quấn, ủng rơm đi tuyết, nón rộng của người đưa thư.
- **Tránh:** không dựng cổng torii, đền thờ Thần đạo hay chùa thật. Không lấy hình ảnh samurai, ninja, tướng quân cai trị. Không lạm dụng hoa anh đào.

### 4.6. Quái đặc trưng

| Quái             | Vì sao sống ở đây                                                            |
| ---------------- | ---------------------------------------------------------------------------- |
| Cú Tuyết Lặng    | Chim săn đêm, bị lời ước "mong được yên tĩnh" bám vào nên tấn công ai gây ồn |
| Giáp Băng Vô Chủ | Áo giáp của người chết trong Tuyết Lở Lớn, đông cứng và tự đi lại            |

---

## 5. Purunae (cảm hứng Hàn Quốc), Mộc

- **Tên:** Purunae (푸르내), tiếng Hàn thuần: _pureu-_ (xanh) + _nae_ (dòng suối), tức "dòng suối xanh". Hiển thị: **Purunae, Xứ Suối Xanh**.
- **Thủ đô:** Solgol (솔골), _sol_ (thông) + _gol_ (thung lũng), tức "thung lũng thông". Hiển thị: **Solgol, Thung Thông**.
- **Trấn Tinh:** Sonamu (소나무, "cây thông"). Dân gọi là "Ông Thông".

### 5.1. Thể chế và quan hệ

- **Thể chế:** **Vương triều Rễ**. Người cai trị phải được Sonamu "nhận": người ứng cử ngồi dưới gốc Ông Thông một trăm ngày, nếu rễ cây quấn quanh chân thì được làm vua hoặc nữ vương. Hiện nay là **Nữ Vương Dasom** (다솜, "tình thương", từ Hàn cổ), 24 tuổi. Viện Thảo Dược giúp việc triều chính.
- **Quan hệ:**
  - Shizukane: láng giềng thân thiết, thi đua đủ thứ.
  - Đảo Lạc: buôn thảo dược, gốm men ngọc. Thầy thuốc Purunae từng sang chữa bệnh dịch cho đảo năm NS 1201.
  - Mọi vùng: Purunae trung lập, nổi tiếng là nơi chữa bệnh, không đem quân đi đâu.
- **Lý do người chơi đến (Ch.7):** Để cứu Bà Khơi mà không giết Hắc Giao, phải rút Nguyện Cặn ra khỏi bà. Chỉ rễ của Sonamu chạm được tới Biển Lặng. Việc này tốn phần đời còn lại của ông.

### 5.2. Trấn Tinh: Sonamu

- **Tính cách:** chậm rãi, hiền, hay quên, thích nghe kể chuyện, thích trẻ con. Đôi khi bướng như ông già.
- **Hình dáng:** cây thông đỏ khổng lồ, thân có nếp nhăn giống mặt người. Trăm năm ông đi lại một lần, rễ nhấc lên như chân.
- **Lịch sử:** ông là cái cây đầu tiên mọc từ bụi Sao Cả. Ông chọn **già đi** cùng rừng của mình. Ông là Trấn Tinh duy nhất đang già và sẽ chết.
- **Quan hệ với người:** dân Purunae chăm Sonamu như **ông nội**. Mỗi làng cử một đứa trẻ tới đọc sách cho ông nghe mỗi mùa thu. Người ta dạy nhau rằng già đi không phải điều đáng sợ.

### 5.3. Thiên nhiên

- **Khí hậu:** bốn mùa rõ. Xuân hoa nở, hè mưa, thu lá đỏ trời cao, đông khô lạnh.
- **Địa hình:** bán đảo nhiều núi đồi, rừng thông, ruộng bậc, bờ biển đá và nhiều đảo nhỏ.
- **Động vật:** hổ núi (được kính trọng, không bị săn), chim ác là, hạc đầu đỏ, cá thu, bào ngư.
- **Thực vật:** thông đỏ, sâm núi, hoa đỗ quyên, cây hồng, dâu giấy.
- **Tài nguyên:** sâm và thảo dược, gỗ thông, gốm men ngọc, giấy dâu, hải sản lặn.

### 5.4. Địa danh

| #   | Tên                       | Mô tả                                                                                                                               | Bí mật nhỏ                                                                                    |
| --- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1   | **Solgol** (Thung Thông)  | Thủ đô trong thung lũng, nhà mái ngói cong nhẹ, sân đất nện, tường đá thấp. Cung điện là một dãy nhà gỗ đơn sơ quanh đồi Ông Thông. | Mỗi nhà có một cây con được ươm từ hạt của Sonamu. Khi ông mất, những cây đó sẽ là ông.       |
| 2   | **Đồi Ông Thông**         | Ngọn đồi giữa Solgol, nơi Sonamu đứng. Quanh gốc có ghế đá cho người đọc sách.                                                      | Rễ ông chạy dưới cả bán đảo. Ở một số giếng, áp tai sát vào nước nghe được tiếng ông ngáy.    |
| 3   | **Chợ Thảo Dược Yakjang** | Chợ thuốc lớn nhất Vọng Tinh Giới, họp mỗi năm hai lần, mùi sâm và gừng thơm cả dặm.                                                | Có một sạp chỉ bán cho Hộ Tinh, thuốc giúp Tinh Văn bớt đau khi thêm nét.                     |
| 4   | **Làng Gốm Men Ngọc**     | Làng gốm bên suối, lò nung trên sườn đồi. Gốm men xanh ngọc như nước hồ trong.                                                      | Men ngọc được pha bằng tro lá thông của chính Sonamu. Mỗi mẻ gốm là một chút đời ông.         |
| 5   | **Rừng Ngàn Thông**       | Rừng thông bạt ngàn phía bắc, mùa thu thành biển vàng đỏ. Nơi hổ núi sống.                                                          | Có một cây thông trong rừng mọc ngược, ngọn chĩa xuống đất. Bên dưới là lối vào một Lòng Sao. |
| 6   | **Thác Bảy Tầng**         | Thác nước chảy qua bảy bậc đá, mỗi bậc một hồ nhỏ.                                                                                  | Tắm ở hồ thứ bảy thì quên được một nỗi buồn, nhưng cũng quên luôn người gắn với nỗi buồn đó.  |
| 7   | **Đảo Người Lặn**         | Đảo đá núi lửa nhỏ phía nam, nơi những người phụ nữ lặn biển hái bào ngư.                                                           | Họ biết một hang dưới nước dẫn thẳng tới gần Biển Lặng.                                       |
| 8   | **Đèo Hổ Ngủ**            | Con đèo hẹp nối Purunae với bờ biển phía bắc, có tảng đá hình con hổ nằm.                                                           | Hổ đá là Hộ Tinh cổ đã hóa đá theo lời ước của chính mình.                                    |

### 5.5. Văn hóa

- **Ẩm thực:**
  1. **Canh Sâm Gà Non**: gà non nhồi gạo nếp, sâm, táo đỏ, hầm trong nồi đá. (Cảm hứng: samgyetang.)
  2. **Bánh Lá Thông**: bánh gạo nhân vừng hoặc đậu, hấp trên lá thông cho thơm. Ăn trong Hội Trăng Thu. (Cảm hứng: songpyeon.)
  3. **Cơm Trộn Bảy Màu**: cơm trộn bảy loại rau theo bảy màu, trứng và tương ớt. (Cảm hứng: bibimbap.)
- **Nghề truyền thống:** hái thuốc, làm gốm men ngọc, lặn biển, làm giấy dâu, dệt vải gai.
- **Lễ hội:**
  - **Hội Trăng Thu Đọc Sách** (rằm tháng Gương): trẻ em mỗi làng đọc sách cho Ông Thông. Người lớn làm bánh lá thông.
  - **Lễ Gieo Mầm** (đầu tháng Lúa): mỗi nhà gieo một hạt thông. Cây của năm nào sống tốt nhất thì làng đó được cử người ứng cử lần sau.
- **Nhạc nền gợi ý:** đàn gayageum, trống janggu, đàn haegeum, sáo tre. Nhịp ba, lắc lư. Cảm xúc ấm, vui, có chút hoài niệm.
- **Bảng màu:**

| Mã        | Gợi ý               |
| --------- | ------------------- |
| \`#2f5d50\` | Thông xanh đậm      |
| \`#9cc5b0\` | Men ngọc            |
| \`#b5432a\` | Lá thu đỏ           |
| \`#f2ead3\` | Giấy dâu            |
| \`#e8b04a\` | Vàng lúa, hồng chín |

- **Trang phục:** áo ngắn và váy dài phồng kiểu hanbok, áo khoác ngắn, mũ lông mùa đông, áo lặn bằng vải bông của người lặn biển.
- **Tránh:** không dựng chùa thật, không dùng vua hay triều đại lịch sử, không dùng quốc hoa, quốc kỳ hay biểu tượng quốc gia thật.

### 5.6. Quái đặc trưng

| Quái    | Vì sao sống ở đây                                                               |
| ------- | ------------------------------------------------------------------------------- |
| Nấm Đèn | Nấm phát sáng mọc trên rễ Sonamu, hút chút sức của ông nên tính khí thất thường |
| Hổ Rêu  | Hổ núi già phủ rêu, giữ rừng. Chỉ đánh khi rừng bị xâm phạm                     |

---

## 6. Golbaran (cảm hứng Ba Tư và Trung Đông), Thổ

- **Tên:** Golbaran (گل‌باران), tiếng Ba Tư: _gol_ (hoa) + _bārān_ (mưa), tức "mưa hoa". Hiển thị: **Golbaran, Xứ Mưa Hoa**. Tên gọi từ việc sa mạc nở hoa ba ngày sau mỗi trận mưa hiếm hoi.
- **Thủ đô:** Minashahr, _minā_ (men xanh) + _shahr_ (thành), tức "thành men xanh". Hiển thị: **Minashahr, Thành Men Xanh**.
- **Trấn Tinh:** Ostad Khesht, _ostād_ (thầy, thợ cả) + _khesht_ (gạch bùn), tức "Thầy Gạch". Dân gọi là "Thầy Gạch".

### 6.1. Thể chế và quan hệ

- **Thể chế:** **Hội Đồng Giếng**. Mỗi ốc đảo cử một **Ab-dar** (người giữ nước), vì ở sa mạc ai giữ nước là người giữ sự sống. Đứng đầu là **Ab-dar Bozorg** (Người Giữ Nước Lớn), do các Ab-dar bầu, nhiệm kỳ bảy năm. Không có vua.
- **Quan hệ:**
  - Marevia: bạn hàng lớn nhất, chung biển ấm phía tây.
  - Lũng Vân: hai đầu của Đường Cát, đổi gạch men, thảm, nghệ tây lấy lụa và chè.
  - Khokhtal: xưa có lúc bị cướp ngựa, nay mua ngựa của họ và gả con cho nhau.
  - Đảo Lạc: trạm nghỉ trên đường biển, mua gạo và cá khô.
- **Lý do người chơi đến (Ch.4):** Ostad Khesht ghi mọi việc lên gạch men. Ông giữ một bản sao sổ sao của Người Đếm Sao, cho thấy sao mới sinh ít dần từ NS 900. Mặt Nạ Đất Nung đang lấy nước của kênh ngầm để nuôi Nguyện Cặn.

### 6.2. Trấn Tinh: Ostad Khesht

- **Tính cách:** vui vẻ, ồn ào, cực kỳ chăm chỉ, hơi cầu toàn. Rất thương người không nhà.
- **Hình dáng:** người đàn ông to lớn bằng đất nung, ngực có khảm gạch men xanh, đội khăn vải trắng, tay lúc nào cũng dính vữa.
- **Lịch sử:** rơi xuống **Giếng Đầu** thời Bảy Sao Xuống. Ông cùng người dân đào hệ thống kênh ngầm đầu tiên đưa nước từ núi về ốc đảo. Ông đếm năm tháng bằng số mái nhà đã dựng, không bằng lịch.
- **Quan hệ với người:** ông là **người thợ cả cùng làm**. Ai xây nhà cũng có thể gặp ông xắn tay vào giúp. Ông không nhận lễ vật, chỉ nhận một viên gạch có khắc tên chủ nhà.

### 6.3. Thiên nhiên

- **Khí hậu:** sa mạc khô nóng, ngày nóng đêm lạnh. Mưa rất hiếm, gió cát vào mùa xuân.
- **Địa hình:** cồn cát lớn, núi đá đỏ, ốc đảo, hệ thống kênh ngầm, hồ muối.
- **Động vật:** lạc đà, chim họa mi, báo cát, linh dương, bọ hung.
- **Thực vật:** chà là, lựu, hoa hồng, nghệ tây, cây hồ trăn.
- **Tài nguyên:** gạch men, thảm len, đồng, nghệ tây, muối, lựu.

### 6.4. Địa danh

| #   | Tên                            | Mô tả                                                                                                                  | Bí mật nhỏ                                                                          |
| --- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | **Minashahr** (Thành Men Xanh) | Thủ đô quanh ốc đảo lớn nhất, mái vòm và tường ốp gạch men xanh lam lấp lánh dưới nắng. Đường phố có mái che bằng vải. | Mỗi viên gạch trên tường thành khắc tên một người từng sống ở đây.                  |
| 2   | **Nhà Chưa Xong**              | Cung điện mái vòm Ostad Khesht xây mãi chưa xong suốt nghìn năm. Mỗi ngày ông thêm một phòng cho người không nhà.      | Có một phòng ông xây xong rồi khóa lại, đề tên "cho người giữ đảo".                 |
| 3   | **Chợ Mái Vòm Bảy Cửa**        | Chợ có mái vòm khổng lồ, bảy cửa ứng với bảy vùng. Bán thảm, gia vị, đồng, đèn.                                        | Thương nhân chợ này đổi được cả "lời hứa" như hàng hóa, viết trên gạch.             |
| 4   | **Kênh Ngầm Dài**              | Hệ thống kênh ngầm hàng trăm dặm đưa nước từ núi về, có giếng đứng mỗi trăm bước.                                      | Một nhánh kênh đã bị đào lệch, nước chảy về một nơi không có trên bản đồ.           |
| 5   | **Ốc Đảo Lựu**                 | Ốc đảo nhỏ trồng lựu đỏ, vườn chia bốn phần bằng bốn dòng nước.                                                        | Cây lựu già nhất cho trái có hạt trắng một năm một lần. Ăn vào thì mơ thấy quê nhà. |
| 6   | **Cồn Cát Hát**                | Dãy cồn cát phát ra tiếng như đàn khi gió thổi qua.                                                                    | Bài hát của cồn cát là một bài ru mà người Đảo Lạc cũng biết.                       |
| 7   | **Thành Tháp Gió**             | Thị trấn có những tháp gió cao hút gió mát xuống nhà. Thợ gạch men tụ ở đây.                                           | Tháp gió cao nhất có một căn phòng giữ bản sao sổ sao bằng gạch.                    |
| 8   | **Giếng Đầu**                  | Giếng cổ nơi Ostad Khesht rơi xuống, sâu không thấy đáy.                                                               | Thả gạch xuống giếng, ba ngày sau gạch nổi lên ở ốc đảo khác.                       |

### 6.5. Văn hóa

- **Ẩm thực:**
  1. **Cơm Nghệ Tây Đáy Giòn**: cơm nấu với nghệ tây và bơ, đáy nồi cháy giòn vàng, ai cũng tranh phần đáy. (Cảm hứng: tahdig.)
  2. **Hầm Lựu Óc Chó**: thịt gà hầm với nước lựu chua ngọt và óc chó giã. (Cảm hứng: fesenjan.)
  3. **Kem Sợi Hoa Hồng**: sợi bột mỏng đông lạnh với nước hoa hồng và chanh. Món của Ngày Mưa Hoa. (Cảm hứng: faloodeh.)
- **Nghề truyền thống:** dệt thảm, làm gạch men, đào kênh ngầm, gò đồng, trồng nghệ tây, kể chuyện chợ.
- **Lễ hội:**
  - **Ngày Mưa Hoa**: không cố định, ba ngày sau mỗi trận mưa lớn. Cả xứ ra sa mạc ngắm hoa nở.
  - **Đêm Dài Nhất** (giữa tháng Đuốc): đêm dài nhất năm. Gia đình thức tới sáng, ăn lựu, đọc thơ để "giữ mặt trời quay lại".
- **Nhạc nền gợi ý:** đàn tar, đàn santur, trống khung daf, sáo nay. Nhịp 6/8 đều và lôi cuốn. Cảm xúc mênh mông, ấm, có chút huyền bí.
- **Bảng màu:**

| Mã        | Gợi ý        |
| --------- | ------------ |
| \`#1e6f8f\` | Men xanh lam |
| \`#2aa198\` | Ngọc lam     |
| \`#d9a441\` | Cát vàng     |
| \`#8e2c3a\` | Đỏ thảm      |
| \`#f1e3c6\` | Vữa trắng    |

- **Trang phục:** áo dài tay rộng, áo choàng mỏng chống cát, khăn đội đầu và khăn che bụi, giày da mũi cong, đồ trang sức đồng.
- **Tránh:** không dựng thánh đường hay dùng biểu tượng tôn giáo thật. Không dùng thần linh trong tín ngưỡng thật (kể cả thần đèn). Không dùng khuôn mẫu "nghìn lẻ một đêm", hậu cung, kẻ cướp sa mạc.

### 6.6. Quái đặc trưng

| Quái         | Vì sao sống ở đây                                                 |
| ------------ | ----------------------------------------------------------------- |
| Bọ Hung Men  | Bọ hung lăn những viên gạch men vỡ, lưng dính men thành giáp      |
| Rắn Cát Kính | Rắn sống dưới cát, vảy trong như thủy tinh nhờ sét đánh xuống cát |

---

## 7. Marevia (cảm hứng La Mã và Địa Trung Hải), Hỏa

- **Tên:** Marevia, gốc Latin: _mare_ (biển) + _via_ (đường), tức "đường biển". Hiển thị: **Marevia, Xứ Đường Biển**.
- **Thủ đô:** Ardentia, gốc Latin _ardens_ (đang cháy), tức "thành rực lửa". Hiển thị: **Ardentia, Thành Rực**.
- **Trấn Tinh:** Faber, Latin: "người thợ". Dân gọi là "Thầy Thợ Lửa".

### 7.1. Thể chế và quan hệ

- **Thể chế:** cộng hòa. **Hội Đồng Trăm Đuốc** có một trăm đại biểu do các phường nghề bầu. Hội đồng bầu **Song Chấp Chính**, hai người cùng điều hành trong một năm, không ai được làm hai năm liền.
- **Quan hệ:**
  - Golbaran: bạn hàng lớn nhất.
  - Đảo Lạc: đồng nghiệp trong nghề đúc đồng. Thợ Marevia từng học cách đúc trống của Đảo Lạc.
  - Lũng Vân: tôn trọng học sĩ, mua giấy và sách.
  - Khokhtal: ít qua lại, có giao kèo bán sắt lấy ngựa.
- **Lý do người chơi đến (Ch.5):** Bia Đông và Bia Tây mất lõi sao, phải rèn lõi mới. Chỉ Faber rèn được lõi sao từ Đá Sao. Mặt Nạ Sáp, một trong Ngũ Diện, là thợ Marevia và đang làm giả lõi sao.

### 7.2. Trấn Tinh: Faber

- **Tính cách:** tự hào, hào phóng, nóng tính nhưng nguôi nhanh, ghét bị thờ. Ông luôn nói "ta là đồng nghiệp chứ không phải thần".
- **Hình dáng:** người thợ rèn râu đỏ như than hồng, tạp dề da, tay phải bằng đồng chảy lỏng, áo choàng ngắn kiểu toga xắn một vai để làm việc.
- **Lịch sử:** rơi xuống miệng núi lửa Mons Fornax. Thấy dân đã biết dùng lửa núi để làm đồ, ông ở lại học. Thời Trăm Bến ông rèn một thanh kiếm hoàn hảo, và hai thành đánh nhau để giành nó. Từ đó ông thề chỉ rèn công cụ. Nhưng ông vẫn lén rèn vũ khí.
- **Quan hệ với người:** ông là **đồng nghiệp**. Ông đi họp phường như mọi thợ cả, bỏ phiếu như mọi đại biểu, và từng thua bầu cử.

### 7.3. Thiên nhiên

- **Khí hậu:** Địa Trung Hải. Hè khô nắng, đông ấm có mưa, gió biển quanh năm.
- **Địa hình:** bờ biển vách đá trắng, đồi ô liu, núi lửa còn hoạt động, nhiều đảo nhỏ.
- **Động vật:** cú, dê núi, cá heo, ve sầu, ngựa trắng.
- **Thực vật:** ô liu, nho, nguyệt quế, bách, chanh.
- **Tài nguyên:** đá cẩm thạch, đồng, sắt, muối biển, dầu ô liu, thủy tinh.

### 7.4. Địa danh

| #   | Tên                      | Mô tả                                                                                                            | Bí mật nhỏ                                                                       |
| --- | ------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1   | **Ardentia** (Thành Rực) | Thủ đô trên bảy ngọn đồi sát biển, đền đá trắng cột tròn, mái ngói đỏ, đường lát đá. Đêm nào lò rèn cũng đỏ rực. | Bảy ngọn đồi là bảy miệng núi lửa nhỏ đã tắt. Một ngọn vẫn còn ấm.               |
| 2   | **Mons Fornax** (Núi Lò) | Núi lửa lớn sau thành, Faber ở trong lòng núi. Lò Lớn là xưởng rèn giữa dung nham.                               | Trong Lò Lớn có một thanh kiếm cắm ngược trên đe, chưa từng có ai rút ra.        |
| 3   | **Quảng Trường Đuốc**    | Quảng trường lớn giữa thành, nơi Hội Đồng Trăm Đuốc họp ngoài trời quanh một trăm cây đuốc.                      | Đuốc của đại biểu nào tắt giữa phiên họp là điềm họ đang nói dối.                |
| 4   | **Đấu Trường Đá Trắng**  | Đấu trường tròn cổ, nay chỉ dùng cho **Hội Tranh Tài Thợ** và các trận đấu tay đôi không sát thương.             | Dưới sàn đấu có một xưởng ngầm cũ, nơi Mặt Nạ Sáp làm việc.                      |
| 5   | **Cống Bảy Vòm**         | Cống dẫn nước bằng đá bảy tầng vòm, đưa nước núi vào thành.                                                      | Một vòm của cống được xây bằng đá Đảo Lạc, quà của Phường Đá Ngọc.               |
| 6   | **Nhà Tắm Hơi Núi**      | Nhà tắm công cộng dùng hơi nóng núi lửa, nơi dân bàn chuyện chính sự.                                            | Một phòng xông hơi dẫn xuống tận lò của Faber.                                   |
| 7   | **Thư Viện Cuộn**        | Thư viện giữ hàng vạn cuộn giấy cói và sách da. Có một phòng sách Lũng Vân.                                      | Một cuộn ghi lại tên Năm Người Giữ Đảo, nhưng tên Tô Khuyết bị cạo đi.           |
| 8   | **Đồi Ô Liu Già**        | Đồi trồng ô liu nghìn năm, thân cây xoắn như dây thừng.                                                          | Mỗi cây do một Hộ Tinh trồng khi mất. Có một cây chết khô, đề tên Người Tắt Sao. |
| 9   | **Đảo Vỏ Sò**            | Đảo nhỏ ngoài khơi có bãi vỏ sò tím, nơi làm thuốc nhuộm tím quý.                                                | Người nhuộm tím ở đây giữ công thức làm sáp mặt nạ.                              |

### 7.5. Văn hóa

- **Ẩm thực:**
  1. **Bánh Mì Lò Núi**: bánh mì tròn nướng trong lò đá dùng hơi núi lửa, chấm dầu ô liu và muối biển.
  2. **Cá Nướng Muối Đá**: cá biển bọc muối đá nướng nguyên con, đập vỡ lớp muối khi ăn.
  3. **Bánh Mật Ong Hạt Dẻ**: bánh mềm nướng với mật ong núi và hạt dẻ. Món của Lễ Thắp Lửa.
- **Nghề truyền thống:** rèn, đúc đồng, thổi thủy tinh, khắc cẩm thạch, ghép tranh đá (mosaic), nhuộm tím.
- **Lễ hội:**
  - **Lễ Thắp Lửa** (đầu tháng Lúa, năm mới của Marevia): mỗi nhà xin lửa từ Lò Lớn về thắp bếp.
  - **Hội Tranh Tài Thợ** (tháng Hạc): thợ khắp các vùng mang tác phẩm đến thi ở Đấu Trường Đá Trắng. Faber làm giám khảo và thường cho mình điểm thấp nhất.
- **Nhạc nền gợi ý:** đàn lyre, kèn đôi aulos, trống khung, tiếng búa trên đe làm nhịp. Nhịp hành khúc 4/4. Cảm xúc hào hùng, ấm, rộn ràng.
- **Bảng màu:**

| Mã        | Gợi ý             |
| --------- | ----------------- |
| \`#f2efe6\` | Cẩm thạch trắng   |
| \`#b5482c\` | Đất nung, ngói đỏ |
| \`#6b2d5c\` | Tím vỏ sò         |
| \`#c9a227\` | Đồng thau         |
| \`#2c5e8a\` | Biển sâu          |

- **Trang phục:** áo choàng quấn kiểu toga, áo tunic, áo choàng ngắn có trâm cài, dép da buộc dây, vòng nguyệt quế cho người thắng thi.
- **Tránh:** không dùng tên thần La Mã hay Hy Lạp thật, không có hoàng đế lịch sử. Không có đấu sĩ chết, không có nô lệ.

### 7.6. Quái đặc trưng

| Quái              | Vì sao sống ở đây                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| Kỳ Đà Lửa         | Thằn lằn sống trong khe dung nham, ăn tro than của các lò rèn                                   |
| Tượng Đồng Đấu Sĩ | Tượng đồng do thợ xưa làm để luyện tập, nay tự chạy vì nhiễm Nguyện Cặn từ xưởng của Mặt Nạ Sáp |

---

## 8. Khokhtal (cảm hứng thảo nguyên Mông Cổ và Trung Á), Lôi

Vùng do Devin đề xuất. Lý do chọn:

1. Thảo nguyên là nền văn hóa lớn của châu Á mà thể loại này ít khai thác, nên dễ tạo cảm giác mới.
2. Đua ngựa, lều nỉ, đàn đầu ngựa, đại bàng là hình ảnh mạnh cho hệ Lôi (tốc độ, khoảnh khắc).
3. Vị trí phía bắc Lũng Vân tạo căng thẳng biên giới tự nhiên và lý do để Lôi Đình có ngọn thương từ thần sấm mà không cần chuyển anh khỏi Đảo Lạc.

- **Tên:** Khokhtal, gốc Mông Cổ: _khökh_ (xanh trời) + _tal_ (thảo nguyên), tức "thảo nguyên xanh". Hiển thị: **Khokhtal, Thảo Nguyên Xanh**.
- **Thủ đô:** Nüüdel Ordu, _nüüdel_ (di cư) + _ordu_ (trại lớn), tức "đại trại di động". Thủ đô là một trại lều nỉ khổng lồ, dời chỗ bốn lần một năm theo mùa cỏ. Hiển thị: **Nüüdel Ordu, Đại Trại Di Động**.
- **Trấn Tinh:** Aianga, tiếng Mông Cổ: "sấm". Dân gọi là "Nàng Sấm".

### 8.1. Thể chế và quan hệ

- **Thể chế:** **Hội Lửa Trại Lớn**: bảy năm một lần, đại diện các thị tộc họp quanh một đống lửa lớn, bầu **Người Cầm Cương** lãnh đạo toàn thảo nguyên. Người Cầm Cương phải thắng một vòng đua giông với Aianga, hoặc ít nhất không bỏ cuộc.
- **Quan hệ:**
  - Lũng Vân: tranh chấp đồng cỏ, nay có Ước Thư Biên Gió.
  - Shizukane: hiềm khích cũ từ Tuyết Lở Lớn, ít qua lại.
  - Golbaran: bán ngựa, đổi đồng và muối, có thông gia.
  - Đảo Lạc: xa, ít qua lại. Lôi Đình là người Đảo Lạc hiếm hoi được Aianga biết mặt.
- **Lý do người chơi đến (Ch.6):** Tô Khuyết đã sống ẩn giữa các thị tộc du mục hàng chục năm, và hiện đang trốn ở đây. Aianga đã thấy khoảnh khắc anh mất niềm tin. Ngọn thương của Lôi Đình là món quà của Aianga, nên anh dẫn đường.

### 8.2. Trấn Tinh: Aianga

- **Tính cách:** bốc đồng, thẳng thắn, ham vui, thích tranh tài, không giữ hiềm thù lâu (trừ với Yukiyo). Bà quý ai dám làm ngay khi cần làm.
- **Hình dáng:** một đàn ngựa giông màu tím xám với bờm là tia chớp. Khi muốn nói chuyện, cả đàn nhập lại thành một người đàn bà cưỡi ngựa, áo choàng như mây dông.
- **Lịch sử:** thời Bảy Sao Xuống, bà cãi nhau với Yukiyo và gây Tuyết Lở Lớn. Bà không thấy tội như Yukiyo, chỉ thấy tiếc. Từ đó bà chạy khắp thảo nguyên, không bao giờ dừng lâu một chỗ.
- **Quan hệ với người:** bà là **đối thủ đua**. Ai chạy kịp một cơn giông của bà thì được nói chuyện với bà. Người thắng được ban một "khoảnh khắc": một lần trong đời, thời gian chậm lại cho họ quyết định.

### 8.3. Thiên nhiên

- **Khí hậu:** lục địa. Hè ngắn, nóng, giông nhiều. Đông dài, rất lạnh, gió mạnh.
- **Địa hình:** đồng cỏ mênh mông, đồi thấp, hồ muối, sa mạc đá ở phía nam, núi tuyết xa ở phía đông.
- **Động vật:** ngựa, đại bàng, sói, cừu, lạc đà hai bướu, linh dương.
- **Thực vật:** cỏ lông, hoa nhung tuyết, cây liễu bụi ven hồ.
- **Tài nguyên:** ngựa, len, nỉ, sữa, da, bạc, **đá sét** (cát bị sét đánh hóa thành ống thủy tinh).

### 8.4. Địa danh

| #   | Tên                                | Mô tả                                                                                                               | Bí mật nhỏ                                                                             |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1   | **Nüüdel Ordu** (Đại Trại Di Động) | Hàng nghìn lều nỉ trắng quanh một lều lớn của Người Cầm Cương. Dời trại mất ba ngày, cả đoàn kéo dài tới chân trời. | Mỗi lần dời trại, người ta để lại một cái lều trống cho khách lạc đường.               |
| 2   | **Đường Đua Giông**                | Đồng cỏ phẳng dài cả trăm dặm, nơi đua với Aianga. Cỏ bị sét đánh thành những vệt cháy thẳng tắp.                   | Vệt cháy dài nhất là của Lôi Đình năm 17 tuổi.                                         |
| 3   | **Hồ Muối Gương Trời**             | Hồ muối nông, mặt hồ phản chiếu bầu trời như gương. Khi giông tới, sét như đánh từ dưới lên.                        | Dưới lớp muối có những dấu chân người đi ngược chiều vào hồ mà không đi ra.            |
| 4   | **Đồi Đá Sét**                     | Đồi cát nơi sét đánh nhiều nhất, đầy ống đá sét. Thợ bạc tới nhặt đá làm trang sức.                                 | Thổi vào ống đá sét lâu năm sẽ nghe được tiếng sấm của ngày nó sinh ra.                |
| 5   | **Đống Đá Chỉ Đường**              | Những đống đá xếp ở các ngã ba đồng cỏ. Người qua đường thêm một viên đá và buộc một sợi vải màu.                   | Một đống đá xếp theo kiểu Đảo Lạc, do Tô Khuyết dựng.                                  |
| 6   | **Hẻm Gió Hú**                     | Hẻm núi đá phía bắc, gió rít như tiếng sói. Đường tắt nguy hiểm sang Lũng Vân.                                      | Trong hẻm có một trạm canh cũ của Lũng Vân bị bỏ hoang từ khi ký Ước Thư Biên Gió.     |
| 7   | **Núi Răng Sói**                   | Dãy núi đá nhọn phía nam, nơi sói sấm làm ổ.                                                                        | Đầu đàn sói sấm là một con sói trắng mang Tinh Văn.                                    |
| 8   | **Bãi Cỏ Mùa Xanh**                | Đồng cỏ mùa hè ven sông, nơi diễn ra Hội Ba Môn.                                                                    | Có một vòng cỏ không bao giờ mọc lại, đúng chỗ Aianga và Yukiyo đứng cãi nhau năm xưa. |

### 8.5. Văn hóa

- **Ẩm thực:**
  1. **Bánh Hấp Nhân Thịt Cừu**: bánh bột mì hấp xếp nếp, nhân thịt cừu và hành. (Cảm hứng: buuz.)
  2. **Trà Sữa Muối**: trà nấu với sữa và chút muối, uống cả ngày. (Cảm hứng: suutei tsai.)
  3. **Thịt Hầm Đá Nóng**: thịt và rau nấu trong bình kín với đá nung nóng. Đá được truyền tay cho ấm tay. (Cảm hứng: khorkhog.)
- **Nghề truyền thống:** chăn ngựa, làm lều nỉ, đúc bạc, làm cung sừng, nuôi đại bàng, hát kể sử thi.
- **Lễ hội:**
  - **Hội Ba Môn** (tháng Hạc): đua ngựa, vật và bắn cung.
  - **Đêm Giông Đầu Mùa** (tháng Thuyền): người ta thức chờ cơn giông đầu tiên của năm. Ai muốn đua với Aianga thì đăng ký đêm này.
- **Nhạc nền gợi ý:** đàn đầu ngựa, hát đồng âm (một người hát hai giọng), trống da, đàn tobshuur. Nhịp ba như vó ngựa. Cảm xúc rộng lớn, tự hào, có lúc dữ dội.
- **Bảng màu:**

| Mã        | Gợi ý                 |
| --------- | --------------------- |
| \`#3f7cac\` | Trời xanh thảo nguyên |
| \`#7aa95c\` | Cỏ hè                 |
| \`#e7d8b1\` | Nỉ lều                |
| \`#a23e48\` | Đỏ áo choàng          |
| \`#f5c04a\` | Vàng nắng             |

- **Trang phục:** áo choàng dài vạt chéo thắt đai lụa, ủng da mũi cong, mũ lông, áo choàng lông mùa đông, trang sức bạc và san hô.
- **Tránh:** không dùng nhân vật lịch sử có thật hay đế quốc lịch sử. Không dùng tín ngưỡng thật (thờ trời, nghi lễ shaman). Không dùng khuôn mẫu "đoàn quân man rợ".

### 8.6. Quái đặc trưng

| Quái              | Vì sao sống ở đây                                                    |
| ----------------- | -------------------------------------------------------------------- |
| Sói Sấm           | Sói sống ở Núi Răng Sói, lông tích điện từ những cơn giông liên miên |
| Đại Bàng Mây Dông | Đại bàng cổ làm tổ trong mây dông, bay theo đàn ngựa của Aianga      |

---

## 9. Bảng tổng hợp các vùng

| Vùng      | Cảm hứng                     | Nguyên tố | Trấn Tinh    | Thủ đô           | Thể chế                                    | Chương |
| --------- | ---------------------------- | --------- | ------------ | ---------------- | ------------------------------------------ | ------ |
| Đảo Lạc   | Việt Nam                     | Thủy      | Bà Khơi      | Phố Vạn Đăng     | Hội Đồng Đình Trống (bô lão và phường)     | 1, 8   |
| Lũng Vân  | Trung Hoa cổ                 | Phong     | Thính Phong  | Thiên Diên Thành | Hội Đồng Bút (học sĩ thi tuyển)            | 2      |
| Shizukane | Nhật Bản                     | Băng      | Yukiyo       | Yukiakari        | Hội Đồng Bốn Mùa (bốn họ nghề luân phiên)  | 3      |
| Golbaran  | Ba Tư, Trung Đông            | Thổ       | Ostad Khesht | Minashahr        | Hội Đồng Giếng (người giữ nước)            | 4      |
| Marevia   | La Mã, Địa Trung Hải         | Hỏa       | Faber        | Ardentia         | Cộng hòa, Hội Đồng Trăm Đuốc               | 5      |
| Khokhtal  | Thảo nguyên Mông Cổ, Trung Á | Lôi       | Aianga       | Nüüdel Ordu      | Hội Lửa Trại Lớn, Người Cầm Cương          | 6      |
| Purunae   | Hàn Quốc                     | Mộc       | Sonamu       | Solgol           | Vương triều Rễ (người cai trị do cây chọn) | 7      |

Lý do tách Nhật và Hàn thành hai vùng: hai nền văn hóa có kiến trúc, ẩm thực, nhạc cụ và trang phục khác nhau rõ. Gộp lại dễ làm mờ cả hai. Tách ra còn cho đủ bảy vùng ứng với bảy nguyên tố.
`,gs=`# 04. Phe phái

Bảy phe chính, gồm sáu phe trên Đảo Lạc và Hội Mặt Nạ hoạt động khắp các vùng. Cuối file có bảng thế lực ở các vùng khác và bảng nhân vật thuộc phe nào.

## 1. Hội Đồng Đình Trống

- **Loại:** chính quyền của Đảo Lạc.
- **Mục tiêu:** giữ đảo yên ổn, xử kiện, chia ruộng, điều phối các phường. Lúc này mục tiêu là **giữ bình tĩnh cho dân** trong khi Hắc Giao cựa mình.
- **Lãnh đạo:** **Cụ Trưởng Đình Đoan Khang**, 81 tuổi, người thường. Trí nhớ tốt, nói chậm, thương dân nhưng sợ thay đổi. Cụ muốn giấu tin hai Bia Đá cổ mất lõi để dân khỏi hoảng.
- **Trụ sở:** Đình Trống Đồng, Phố Vạn Đăng.
- **Biểu tượng:** mặt trống đồng có ngôi sao mười hai cánh ở giữa, vòng ngoài là chim Lạc bay.
- **Cách làm việc:** họp mỗi sáng mùng một và rằm. Việc lớn phải gõ trống báo cả đảo. Bảng Ủy thác đặt trước cửa đình.
- **Thành viên nổi bật:**
  - **Lạc Hồng** (Hỏa, kiếm đơn, 5★): hậu duệ dòng người giữ trống đồng của Đình. Anh là kiếm sĩ được Hội Đồng giao giữ Đình và đi dẹp những việc mà Quân Trấn Thủ không kịp.
  - **Mai Linh** (Hỏa, pháp khí, 4★): con gái phường làm đèn ở Phố Cũ. Phường đèn là một phường thuộc Hội Đồng. Đèn của cô thắp trong mọi lễ của Đình.

## 2. Hội Đền Trăng

- **Loại:** hội người trông giữ Bà Khơi. Đây không phải một tôn giáo: họ không cầu xin Bà Khơi điều gì, chỉ hát ru và chăm sóc bà như chăm người thân ốm.
- **Mục tiêu:** giữ giấc ngủ yên cho Bà Khơi, giữ nước Hồ Gương trong, ghi lại những lần bà trở mình. Mục tiêu sâu hơn là tìm cách đánh thức bà mà không làm đứt phong ấn.
- **Lãnh đạo:** **Bà Cả Thu Vọng**, 67 tuổi, Hộ Tinh hệ Thủy đã yếu. Bà nghiêm khắc, kiệm lời, giữ nhiều bí mật nhất đảo. Bà chọn Thủy Nguyệt làm người kế vị.
- **Trụ sở:** Đền Trăng bên Hồ Gương.
- **Biểu tượng:** chiếc chuông bạc lồng trong vầng trăng khuyết.
- **Cách làm việc:** mỗi đêm hai người thức bên hồ. Mỗi rằm mở cửa cho dân vào hát ru (Đêm Ru Bà).
- **Thành viên nổi bật:**
  - **Thủy Nguyệt** (Thủy, pháp khí, 5★): **Người Giữ Đền Trăng**, phụ trách chuông bạc. Tiếng chuông của cô làm nước hồ dịu lại và chữa lành người bị thương. Cô biết bí mật mặt hồ phản chiếu bầu trời ba trăm năm trước.
  - **Sương Mai** (Thủy, kiếm đơn, 4★): kiếm khách hộ vệ của Đền. Mỗi sáng cô luyện kiếm ở Bến Sông Sương, nơi nước từ Hồ Gương chảy ra biển. Cô đi tuần dọc sông.

## 3. Phường Đá Ngọc

- **Loại:** phường nghề của thợ đá, thợ khắc và thợ mỏ.
- **Mục tiêu:** khai thác ngọc và đá, khắc bia, giữ và sửa **bốn Bia Đá cổ** và trăm bia đường. Lúc này họ đang lặng lẽ tìm cách thay hai lõi sao bị mất.
- **Lãnh đạo:** **Bà Trùm Kha**, 54 tuổi, người thường, thợ khắc giỏi nhất thế hệ mình. Bà thực tế, thẳng tính, không ưa Hội Đồng giấu dân.
- **Trụ sở:** xưởng lớn ở cửa Mỏ Ngọc Lòng Chảo.
- **Biểu tượng:** chiếc đục chéo với cây búa trên một viên ngọc lục giác.
- **Cách làm việc:** phường có lệ "đá nhớ thay người": khắc tên mọi người chết vì việc chung lên bia.
- **Thành viên nổi bật:**
  - **Thạch Sơn** (Thổ, đại kiếm, 5★): Thợ Cả của phường, 58 tuổi, đã khắc trăm bia đường từ NS 1310 tới NS 1345 và tu sửa bốn Bia Đá cổ. Dân gọi ông là "Thợ Đá Hóa Thần" vì nghe đồn ông khắc một phần linh hồn vào mỗi bia. Ông là người đầu tiên phát hiện Bia Đông mất lõi.
  - **Ngọc Thạch** (Thổ, thương, 4★): con gái một thợ mỏ ở Lòng Chảo, học việc dưới tay Thạch Sơn. Ngọn thương của cô gọi được những khối đá ngọc rơi từ trên cao xuống như thiên thạch.

## 4. Đoàn Thuyền Buôn Gió Nồm

- **Loại:** đoàn thương thuyền lâu đời nhất Biển Trăm Bến, lập năm khoảng NS 520.
- **Mục tiêu:** buôn bán giữa bảy vùng, giữ đường biển an toàn, kiếm lời một cách tử tế. Họ trung lập, chở cả hàng của những người họ không ưa.
- **Lãnh đạo:** **Bà Bảy Sóng** (tên thật ít ai biết), 49 tuổi, thuyền trưởng con thuyền lớn nhất đoàn. Bà mặc cả giỏi, hay cười to, coi mọi thủy thủ như con cháu.
- **Trụ sở:** bến buôn của Phố Vạn Đăng. Có văn phòng nhỏ ở cảng của mọi vùng.
- **Biểu tượng:** cánh buồm nâu với ba vạch sóng, vạch giữa là một ngôi sao.
- **Cách làm việc:** mỗi chuyến thuyền đều có người hộ tống. Quy tắc lớn nhất là "không bỏ lại ai trên biển".
- **Thành viên nổi bật:**
  - **Hạ Vy** (Băng, cung, 4★): cháu gái Bà Bảy Sóng, sinh giữa mùa hè nhưng được một vì sao Băng chọn. Trên thuyền cô vừa canh gác bằng cung, vừa làm lạnh hầm cá để hàng đi xa không hỏng.
  - **Bạch Vũ** (Phong, kiếm đơn, 4★): người Lũng Vân, làm người hộ tống thuê cho đoàn. Đến Đảo Lạc năm NS 1349 mang theo thư của Thính Phong. Xem mục 8.

## 5. Quân Trấn Thủ

- **Loại:** lực lượng giữ đảo, do Kiên (một trong Năm Người Giữ Đảo) lập sau Thời Nước Đen.
- **Mục tiêu:** canh Hang Hắc Giao, dẹp trại quái, tuần tra bờ biển, bảo vệ dân khi có lũ hay giông.
- **Lãnh đạo:** **Quan Trấn Thủ Cao Lũy**, 52 tuổi, người thường, cựu thủy thủ. Ông nghiêm, giữ kỷ luật, tôn trọng Hộ Tinh nhưng không để họ đứng trên luật. Ông nghi ngờ Hội Đồng che giấu thông tin.
- **Trụ sở:** Trại Bắc, ngay dưới chân núi có Hang Hắc Giao.
- **Biểu tượng:** cây thương dựng đứng trước sóng biển. Trại chính treo cây thương thật của Kiên.
- **Cách làm việc:** chia thành các đội. **Đội Giông** là đội Hộ Tinh. **Đội Săn Đêm** làm trinh sát và đặt bẫy.
- **Thành viên nổi bật:**
  - **Lôi Đình** (Lôi, thương, 5★): **Đội trưởng Đội Giông**, 22 tuổi, đội trưởng trẻ nhất từ trước tới nay. Năm 17 tuổi anh hộ tống đoàn buôn tới Khokhtal, chạy kịp cơn giông của Aianga trên Đường Đua Giông và được bà trao ngọn thương. Danh hiệu của anh là "Ngọn Thương Gọi Sấm": mỗi lần anh giơ ngọn thương của Aianga lên, sấm kéo về. Anh không phải tướng và không cai quản ai ngoài đội của mình.
  - **Minh Khải** (Lôi, cung, 4★): thợ săn của Đội Săn Đêm. Đi đêm với ngọn đèn sét, đặt bẫy quanh Rừng Trúc Mây. Anh là người đầu tiên thấy Pháp Sư Mặt Nạ lảng vảng quanh Bia Tây.

## 6. Người Đếm Sao

- **Loại:** phe **trung lập bí ẩn**. Một hội người ghi chép sao băng, có thành viên ở mọi vùng, lập khoảng NS 610.
- **Mục tiêu công khai:** đếm, đặt tên và ghi lại mọi vì sao, mọi sao băng, mọi Hộ Tinh mới. Dựng và giữ Tháp Tinh Tú.
- **Mục tiêu thật:** [Hé lộ Ch.4] Họ biết từ NS 900 sao mới sinh ít dần, và tin rằng nếu cứ thế, một ngày Tinh Hải sẽ tắt. Họ đang tìm cách "cứu" Tinh Hải và **chưa chọn phe**. Một số người trong hội nghĩ Hội Mặt Nạ có lý.
- **Lãnh đạo:** **Đầu Sổ Kỳ Lam**, tuổi không rõ, Hộ Tinh hệ Phong. Bà luôn che mắt bằng dải lụa đen, nói "ta đọc sao bằng tai". Thân phận thật là một câu hỏi mở.
- **Trụ sở:** Đài Đếm Sao trên Đỉnh Vọng Vân, Đảo Lạc. Có đài nhỏ ở mọi vùng.
- **Biểu tượng:** con mắt mở với mười hai chấm sao quanh tròng.
- **Cách làm việc:** không can thiệp chính sự. Chỉ trao sổ ghi cho ai họ tin. Không bao giờ nói dối, nhưng thường không nói hết.
- **Thành viên nổi bật:**
  - **Phong Vân** (Phong, cung, 5★): lớn lên trên Đỉnh Vọng Vân, được Người Đếm Sao nuôi từ nhỏ. Mũi tên của cô cưỡi gió, dùng để bắn tín hiệu giữa các đài. Cô chưa biết mục tiêu thật của hội.
  - **Tuyết Lan** (Băng, kiếm đơn, 5★): người Shizukane, người đưa thư của đài Người Đếm Sao trên núi tuyết. Năm NS 1349 cô theo một vì sao rơi lệch hướng tới Đảo Lạc và ở lại Đài Đếm Sao. Xem mục 8.

## 7. Hội Mặt Nạ

- **Loại:** tổ chức phản diện, hoạt động ở mọi vùng. Hồ sơ đầy đủ ở [\`07-hac-giao-va-hoi-mat-na.md\`](07-hac-giao-va-hoi-mat-na.md).
- **Mục tiêu công khai trong mắt dân:** trộm Đá Sao, phá Bia Đá, gây rối.
- **Mục tiêu thật:** tạo ra **Đêm Không Sao**, một đêm mọi vì sao tắt và mọi lời ước chìm dưới Biển Lặng trở về với người đã ước. Không ai còn được chọn, không ai bị bỏ quên.
- **Lãnh đạo:** **Kẻ Gánh Nguyện**. [Hé lộ Ch.6] Đó là Tô Khuyết.
- **Biểu tượng:** mặt nạ trắng không có lỗ mắt, chỉ có một vạch ngang ở chỗ miệng.
- **Thành viên nổi bật:** Ngũ Diện (năm thành viên cấp cao, mỗi người một chất liệu mặt nạ). Không có nhân vật chơi được trong bản thử nghiệm.

## 8. Ghi chú về hai nhân vật chuyển vùng

| Nhân vật      | Vùng gốc mới | Phe                      | Lý do chuyển                                                                                                                                                                                                                                                        | Điều không đổi                                                   |
| ------------- | ------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Tuyết Lan** | Shizukane    | Người Đếm Sao            | Mô tả gốc đã ghi "từ vùng núi tuyết phía bắc". Shizukane là xứ núi tuyết, hệ Băng, có hoa lan tuyết làm biểu tượng. Tên tiếng Shizukane của cô là **Yukiran** (雪蘭, "lan tuyết"). Ở Đảo Lạc người ta đọc theo âm Hán Việt là **Tuyết Lan**, và cô dùng luôn tên đó | Tên hiển thị, Băng, kiếm đơn, 5★, danh hiệu "Hoa Lan Trên Tuyết" |
| **Bạch Vũ**   | Lũng Vân     | Đoàn Thuyền Buôn Gió Nồm | Lữ khách lang thang, hệ Phong. Lũng Vân là xứ Phong và là nơi đoàn buôn qua lại nhiều nhất. Áo choàng lông vũ làm từ lông hạc trắng Lũng Vân. Tên **Bạch Vũ** là Hán Việt, "lông trắng", nên hợp với vùng                                                           | Tên, Phong, kiếm đơn, 4★, danh hiệu "Lữ Khách Lông Trắng"        |

Mô tả trong game (\`desc\`) của Bạch Vũ ghi "Kẻ lang thang khắp đảo". Vẫn đúng, vì cậu đã lang thang khắp Đảo Lạc từ khi đến. Không cần sửa dữ liệu.

## 9. Bảng quan hệ giữa các phe

Ký hiệu: **++** đồng minh, **+** thân thiện, **0** trung lập, **−** căng thẳng, **−−** thù địch.

|                         | Hội Đồng Đình Trống | Hội Đền Trăng | Phường Đá Ngọc | Đoàn Thuyền Buôn | Quân Trấn Thủ | Người Đếm Sao | Hội Mặt Nạ |
| ----------------------- | ------------------- | ------------- | -------------- | ---------------- | ------------- | ------------- | ---------- |
| **Hội Đồng Đình Trống** |                     | +             | −              | +                | +             | 0             | −−         |
| **Hội Đền Trăng**       | +                   |               | +              | 0                | +             | −             | −−         |
| **Phường Đá Ngọc**      | −                   | +             |                | +                | ++            | +             | −−         |
| **Đoàn Thuyền Buôn**    | +                   | 0             | +              |                  | 0             | +             | −          |
| **Quân Trấn Thủ**       | +                   | +             | ++             | 0                |               | 0             | −−         |
| **Người Đếm Sao**       | 0                   | −             | +              | +                | 0             |               | 0          |
| **Hội Mặt Nạ**          | −−                  | −−            | −−             | −                | −−            | 0             |            |

Giải thích các ô đáng chú ý:

- **Hội Đồng và Phường Đá Ngọc (−):** Hội Đồng bắt phường giữ kín việc hai Bia Đá mất lõi. Bà Trùm Kha phản đối.
- **Hội Đền Trăng và Người Đếm Sao (−):** Người Đếm Sao từng xin lặn xuống đáy Hồ Gương để "đo" Bà Khơi. Bà Cả Thu Vọng từ chối và không bao giờ quên chuyện đó.
- **Đoàn Thuyền Buôn và Hội Mặt Nạ (−, không phải −−):** đoàn buôn từng vô tình chở người của Hội Mặt Nạ, vì luật "chở mọi khách trả tiền". Nhiều thủy thủ thông cảm với những người không được sao chọn.
- **Người Đếm Sao và Hội Mặt Nạ (0):** Người Đếm Sao không đứng về phía nào. Một số thành viên ngầm đồng ý với Hội Mặt Nạ rằng hệ thống sao đang hỏng. [Hé lộ Ch.4]
- **Phường Đá Ngọc và Quân Trấn Thủ (++):** cùng giữ Hang Hắc Giao. Thạch Sơn và Quan Trấn Thủ Cao Lũy là bạn cũ.

## 10. Thế lực ở các vùng khác (để thiết kế nhân vật sau)

| Vùng      | Thế lực            | Mục tiêu                            | Lãnh đạo (sáng tác)                                         |
| --------- | ------------------ | ----------------------------------- | ----------------------------------------------------------- |
| Lũng Vân  | Hội Đồng Bút       | Cai quản bằng chữ viết và thi tuyển | Chưởng Bút Lục Thanh Hà                                     |
| Lũng Vân  | Phường Diều        | Làm diều, tổ chức Hội Thả Diều Thư  | Thợ cả Âu Phi Diên                                          |
| Shizukane | Hội Đồng Bốn Mùa   | Cai quản luân phiên theo mùa        | Mùa hiện tại do họ Trà giữ, người đứng đầu là Kazane Shiori |
| Shizukane | Người Đọc Tuyết    | Đọc và chép lời Yukiyo              | Trưởng đọc Fuyuno Tsugumi                                   |
| Purunae   | Vương triều Rễ     | Cai quản theo lựa chọn của Sonamu   | Nữ Vương Dasom                                              |
| Purunae   | Viện Thảo Dược     | Chữa bệnh cho mọi vùng              | Viện trưởng Ha Seum                                         |
| Golbaran  | Hội Đồng Giếng     | Giữ nước, chia nước                 | Ab-dar Bozorg Roshan Abyar                                  |
| Golbaran  | Phường Gạch Men    | Xây, ốp, ghi chép trên gạch         | Thợ cả Nasrin Minakar                                       |
| Marevia   | Hội Đồng Trăm Đuốc | Cộng hòa phường nghề                | Song Chấp Chính Livia Ferra và Cassio Vitrum                |
| Marevia   | Phường Lò Lớn      | Rèn, đúc, cùng làm với Faber        | Thợ cả Tullia Ignis                                         |
| Khokhtal  | Hội Lửa Trại Lớn   | Bầu Người Cầm Cương                 | Người Cầm Cương Sarnai Baatar                               |
| Khokhtal  | Đội Cưỡi Giông     | Những người đua với Aianga          | Đội trưởng Temuulen Khurdan                                 |

Quy tắc khi dùng tên ở bảng này: xem [\`11-dat-ten.md\`](11-dat-ten.md) mục 2. Không dùng tên của người nổi tiếng có thật.

## 11. Bảng nhân vật A.6 theo vùng và phe

| ID         | Tên         | ★   | Nguyên tố | Vũ khí   | Vùng gốc      | Phe                              | Vai trò trong phe                                  |
| ---------- | ----------- | --- | --------- | -------- | ------------- | -------------------------------- | -------------------------------------------------- |
| lachong    | Lạc Hồng    | 5   | Hỏa       | Kiếm đơn | Đảo Lạc       | Hội Đồng Đình Trống              | Kiếm sĩ giữ Đình, hậu duệ dòng người giữ trống     |
| thuynguyet | Thủy Nguyệt | 5   | Thủy      | Pháp khí | Đảo Lạc       | Hội Đền Trăng                    | Người Giữ Đền Trăng, kế vị Bà Cả                   |
| phongvan   | Phong Vân   | 5   | Phong     | Cung     | Đảo Lạc       | Người Đếm Sao                    | Cung thủ đưa tín hiệu giữa các đài                 |
| loidinh    | Lôi Đình    | 5   | Lôi       | Thương   | Đảo Lạc       | Quân Trấn Thủ                    | Đội trưởng Đội Giông                               |
| thachson   | Thạch Sơn   | 5   | Thổ       | Đại kiếm | Đảo Lạc       | Phường Đá Ngọc                   | Thợ Cả, người giữ bốn Bia Đá cổ                    |
| tuyetlan   | Tuyết Lan   | 5   | Băng      | Kiếm đơn | **Shizukane** | Người Đếm Sao                    | Người đưa thư núi tuyết                            |
| mailinh    | Mai Linh    | 4   | Hỏa       | Pháp khí | Đảo Lạc       | Hội Đồng Đình Trống (phường đèn) | Thợ đèn nhỏ tuổi                                   |
| suongmai   | Sương Mai   | 4   | Thủy      | Kiếm đơn | Đảo Lạc       | Hội Đền Trăng                    | Kiếm khách hộ vệ, tuần sông                        |
| bachvu     | Bạch Vũ     | 4   | Phong     | Kiếm đơn | **Lũng Vân**  | Đoàn Thuyền Buôn Gió Nồm         | Người hộ tống thuê, người mang thư của Thính Phong |
| minhkhai   | Minh Khải   | 4   | Lôi       | Cung     | Đảo Lạc       | Quân Trấn Thủ                    | Thợ săn Đội Săn Đêm                                |
| ngocthach  | Ngọc Thạch  | 4   | Thổ       | Thương   | Đảo Lạc       | Phường Đá Ngọc                   | Thợ học việc, con gái thợ mỏ                       |
| havy       | Hạ Vy       | 4   | Băng      | Cung     | Đảo Lạc       | Đoàn Thuyền Buôn Gió Nồm         | Cung thủ canh thuyền, giữ lạnh hầm hàng            |

Mỗi phe trên Đảo Lạc có đúng hai Hộ Tinh chơi được. Bốn phe có một 5★ và một 4★, Người Đếm Sao có hai 5★, Đoàn Thuyền Buôn có hai 4★. Như vậy mỗi phe đều có chỗ cho nhiệm vụ nhân vật.
`,rs=`# 05. Văn hóa đời thường

## 1. Lịch

### 1.1. Năm, tháng, mùa

- Năm tính theo **Niên Sao (NS)**, hiện tại NS 1350 (xem \`02-lich-su.md\`).
- Một năm có **12 tháng âm lịch**, mỗi tháng 30 ngày, đặt tên theo **12 chòm sao** của Vọng Tinh Giới. Chòm sao của tháng là chòm sáng nhất trên đầu lúc nửa đêm ngày rằm.
- Mười hai chòm sao này cũng là **mười hai tầng của Tháp Tinh Tú**.
- Đầu năm cách nhau theo vùng: Đảo Lạc, Lũng Vân, Purunae, Khokhtal bắt đầu năm từ tháng Trống. Shizukane bắt đầu năm từ đêm tuyết đầu mùa. Golbaran và Marevia bắt đầu từ tháng Lúa (xuân phân).

| Tháng | Chòm sao     | Hình dáng        | Mùa (Đảo Lạc)     | Ý nghĩa dân gian         | Tầng Tháp |
| ----- | ------------ | ---------------- | ----------------- | ------------------------ | --------- |
| 1     | **Trống**    | Mặt trống tròn   | Xuân              | Khởi đầu, gọi nhau về    | 1         |
| 2     | **Diều**     | Cánh diều có dây | Xuân              | Gửi lời đi xa            | 2         |
| 3     | **Lúa**      | Bông lúa trĩu    | Xuân              | Gieo trồng               | 3         |
| 4     | **Cá Chép**  | Cá vượt sóng     | Hè                | Vượt khó                 | 4         |
| 5     | **Thuyền**   | Thuyền buồm      | Hè, đầu mùa mưa   | Lên đường                | 5         |
| 6     | **Đèn Lồng** | Đèn tròn có tua  | Hè                | Soi đường cho người lạc  | 6         |
| 7     | **Hạc**      | Hạc dang cánh    | Thu               | Tuổi thọ, thầy dạy       | 7         |
| 8     | **Gương**    | Vòng tròn sáng   | Thu               | Nhớ lại, nhìn lại mình   | 8         |
| 9     | **Chuông**   | Chuông treo      | Thu, cuối mùa mưa | Tỉnh thức, cảnh báo      | 9         |
| 10    | **Lưới**     | Tấm lưới tung    | Đông              | Gom góp, mùa đánh cá lớn | 10        |
| 11    | **Rìu**      | Lưỡi rìu         | Đông              | Cắt bỏ điều cũ           | 11        |
| 12    | **Đuốc**     | Ngọn đuốc        | Đông              | Giữ lửa qua đêm dài      | 12        |

### 1.2. Ngày trong tháng

- Mùng một (trăng non) và rằm (trăng tròn) là hai ngày quan trọng nhất. Hội Đồng Đình Trống họp hai ngày này.
- Tuần không phổ biến ở Đảo Lạc. Người ta chia tháng làm ba **con nước** (mỗi con nước mười ngày) theo thủy triều.

## 2. Các ngày lễ trong năm

Bảng gộp lễ hội lớn của bảy vùng. Lễ của Đảo Lạc in đậm vì có thể dùng trong bản thử nghiệm.

| Thời gian          | Lễ                          | Vùng      | Hoạt động chính                                                                                         |
| ------------------ | --------------------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| Đầu tháng Trống    | **Tết Sao Rơi**             | Đảo Lạc   | Cả làng gõ trống đồng cùng lúc và ước chung một lời. Ăn Bánh Trống. Trẻ con nhặt cát sáng ở Bãi Sao Rơi |
| Tháng Diều         | Hội Thả Diều Thư            | Lũng Vân  | Viết lời ước lên diều, thả cho gió mang đi                                                              |
| Đầu tháng Lúa      | Lễ Thắp Lửa                 | Marevia   | Xin lửa từ Lò Lớn về thắp bếp                                                                           |
| Đầu tháng Lúa      | Lễ Gieo Mầm                 | Purunae   | Mỗi nhà gieo một hạt thông                                                                              |
| Rằm tháng Cá Chép  | **Hội Đua Thuyền Vạn Lưới** | Đảo Lạc   | Các làng chài đua thuyền rồng trên cửa Sông Sương                                                       |
| Tháng Thuyền       | Đêm Giông Đầu Mùa           | Khokhtal  | Chờ cơn giông đầu năm, đăng ký đua với Aianga                                                           |
| Rằm tháng Đèn Lồng | **Hội Vạn Đăng**            | Đảo Lạc   | Thả đèn lồng trên sông, tưởng Nàng Vạn Đăng                                                             |
| Tháng Hạc          | Hội Ba Môn                  | Khokhtal  | Đua ngựa, vật, bắn cung                                                                                 |
| Tháng Hạc          | Hội Tranh Tài Thợ           | Marevia   | Thợ bảy vùng thi tác phẩm                                                                               |
| Rằm tháng Hạc      | Đêm Đọc Gió                 | Lũng Vân  | Thính Phong đọc một trang sổ cũ                                                                         |
| Rằm tháng Gương    | **Đêm Ru Bà lớn**           | Đảo Lạc   | Cả đảo đến Hồ Gương hát ru Bà Khơi                                                                      |
| Rằm tháng Gương    | Hội Trăng Thu Đọc Sách      | Purunae   | Trẻ em đọc sách cho Ông Thông                                                                           |
| Rằm tháng Lưới     | **Lễ Nhớ Ba Làng**          | Đảo Lạc   | Thả hoa ở Vịnh Khơi tưởng nhớ ba làng chìm năm NS 1046                                                  |
| Đêm tuyết đầu tiên | Hatsuyuki-yo                | Shizukane | Người Đọc Tuyết đọc lời Yukiyo cho cả năm                                                               |
| Một đêm đông       | Hội Chuông Lặng             | Shizukane | Cả xứ không ai nói một đêm                                                                              |
| Giữa tháng Đuốc    | Đêm Dài Nhất                | Golbaran  | Thức tới sáng, ăn lựu, đọc thơ                                                                          |
| Không cố định      | Ngày Mưa Hoa                | Golbaran  | Ra sa mạc ngắm hoa nở sau mưa                                                                           |
| Mỗi rằm            | **Đêm Ru Bà**               | Đảo Lạc   | Hội Đền Trăng mở cửa cho dân hát ru                                                                     |

## 3. Chào hỏi

| Vùng      | Cách chào                                                                    | Câu chào thường gặp (hiển thị tiếng Việt)                                    |
| --------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Đảo Lạc   | Chắp tay trước ngực, cúi đầu nhẹ. Người làng chài vẫy tay cao như vẫy thuyền | "Sao soi đường nhé." (chào khi chia tay) / "Về rồi đấy à?" (chào người quen) |
| Lũng Vân  | Chắp tay, tay trái ôm nắm tay phải, cúi người                                | "Gió mang lời tốt tới."                                                      |
| Shizukane | Cúi người sâu, không nói hoặc nói rất khẽ                                    | "Tuyết yên." (nghĩa là "mọi sự bình an")                                     |
| Purunae   | Cúi người, hai tay đưa đồ cho người lớn                                      | "Đã ăn cơm chưa?" (lời hỏi thăm, không phải mời)                             |
| Golbaran  | Đặt tay phải lên ngực, hơi cúi đầu                                           | "Mong nhà cậu có mái che."                                                   |
| Marevia   | Bắt tay, nắm cẳng tay nhau                                                   | "Lửa bếp ấm!"                                                                |
| Khokhtal  | Chạm vai nhau, hỏi về đàn ngựa                                               | "Đàn ngựa nhà cậu béo khỏe chứ?"                                             |

Quy tắc: lời chào hiển thị bằng tiếng Việt. Có thể ghi âm gốc ở phần ghi chú hoặc bách khoa, không đưa vào lời thoại chính.

## 4. Xưng hô

### 4.0. Nguyên tắc chung (chủ dự án quyết, 2026-11-22)

Xưng hô trong game **trung tính**, giống "I – you" của tiếng Anh: không thể hiện tuổi tác hay thứ bậc giữa các Hộ Tinh với nhau và giữa mọi nhân vật với Người Ước Nguyện. Quy tắc chi tiết, bảng mẫu và ví dụ nằm ở [\`docs/writing/huong-dan-van-phong.md\`](../writing/huong-dan-van-phong.md) mục 2.

- **Mặc định:** "tôi – cậu". "Cậu" dùng cho mọi giới, không ngầm nói ai lớn tuổi hơn.
- **Biến thể theo tính cách, không theo tuổi:** "mình – cậu" (cởi mở, hoặc khi đã thân), "tôi – ngài" (lễ độ trang trọng), "ta – cậu" (Trấn Tinh, người đứng đầu), "ta – ngươi" (kiêu kỳ hoặc thù địch).
- **Ngoại lệ người già:** NPC được thiết kế là cụ ông, cụ bà thì người khác gọi "ông", "bà", "cụ", có thể kèm "ạ"; người già được gọi người trẻ là "cháu". Ngoại lệ này không áp dụng cho Hộ Tinh chơi được.
- **Cách xưng hô riêng:** nhân vật được có cách xưng riêng nếu hợp concept (ví dụ gọi "ngài" rồi thân hơn mới gọi "cậu"), ghi lý do và mốc thay đổi trong thẻ giọng nói.
- **Người thân trong gia đình** gọi nhau theo quan hệ gia đình ("Mẹ ơi", "Anh ơi").
- **Tuổi** vẫn ghi trong hồ sơ nhân vật, nhưng không quyết định cách xưng hô.
- **Người Ước Nguyện** do người chơi chọn giới tính: viết trung tính, chỉ dùng biến \`{anh|chị}\` khi bắt buộc.

### 4.1. Đảo Lạc

- **Chung:** theo mục 4.0. Người Đảo Lạc thân thiện với người lạ bằng lời hỏi han và lời mời ăn uống, không bằng xưng hô họ hàng.
- **Với Hộ Tinh:** gọi tên. Khi nói trang trọng thì thêm "Hộ Tinh" hoặc chức danh trước tên, ví dụ "Hộ Tinh Lôi Đình", "Thợ Cả Thạch Sơn".
- **Với Người Ước Nguyện:** dân làng gọi "cậu" hoặc "người từ Bãi Sao Rơi". Trẻ con gọi "Người Sao Rơi".
- **Phương ngữ nhẹ theo khu:**

| Khu                          | Nét giọng (dùng có chừng mực)                                           | Ví dụ                                     |
| ---------------------------- | ----------------------------------------------------------------------- | ----------------------------------------- |
| Làng Vạn Lưới (làng chài)    | Thân mật, cuối câu hay có "nhé", "nghe", "à nha". Hay dùng từ nghề biển | "Biển hôm nay êm, ra khơi được rồi nghe." |
| Phố Vạn Đăng                 | Giọng phố chuẩn, lịch sự, nhiều từ buôn bán                             | "Mời cậu xem đèn, tôi bán rẻ thôi."       |
| Vùng núi phía bắc (mỏ, trại) | Ngắn gọn, thẳng, ít từ đệm                                              | "Đá nứt. Đi gọi Thợ Cả."                  |
| Đền Trăng                    | Chậm, nhẹ, nhiều từ cổ vừa phải                                         | "Đêm nay trăng tỏ, Bà ngủ yên."           |

Không viết sai chính tả để giả giọng địa phương. Không dùng giọng vùng miền thật để chỉ người xấu hay người kém hiểu biết.

### 4.2. Các vùng khác (khi nhân vật nói tiếng Việt trong game)

| Vùng      | Cách thể hiện trong lời thoại tiếng Việt                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| Lũng Vân  | Hơi trang trọng, thích dùng thành ngữ và câu đối xứng. Không lạm dụng "tại hạ", "cô nương" kiểu truyện chưởng |
| Shizukane | Câu ngắn, lịch sự, hay xin lỗi, hay im lặng (ghi bằng dấu "..."). Gọi người khác bằng "ngài" khi trang trọng  |
| Purunae   | Ấm, hay hỏi han chuyện ăn uống, sức khỏe. Lễ độ thể hiện bằng lời hỏi han, không bằng thứ bậc tuổi            |
| Golbaran  | Trau chuốt, nhiều hình ảnh thơ, khen khách trước khi vào việc                                                 |
| Marevia   | Thẳng, to, hay dùng từ nghề thợ, gọi nhau là "đồng nghiệp", "bạn thợ"                                         |
| Khokhtal  | Ngắn, mộc, so sánh bằng ngựa, gió, cỏ. Gọi bạn thân là "bạn cùng yên ngựa"                                    |

## 5. Tín ngưỡng dân gian trong thế giới game

Tất cả đều là sáng tác. Không lấy giáo lý, thần linh hay nghi lễ của tôn giáo thật nào.

### 5.1. Niềm tin chung

- **Mỗi người có bụi sao trong mình.** Vì vậy ai cũng ước được, ai cũng đáng được nghe.
- **Ước chung bay nhanh hơn ước riêng.** Đây là lý do có trống đồng, diều thư, chuông, lửa trại: nghi thức nào cũng làm cùng nhau.
- **Trấn Tinh là láng giềng, không phải chủ.** Không có nơi thờ Trấn Tinh để cầu xin. Người ta chăm sóc, trò chuyện, làm việc cùng họ. Ở Marevia, "đền" đá trắng là nhà họp của các phường, không phải nơi thờ.

### 5.2. Tục lệ Đảo Lạc

- **Tiễn sao:** khi Hộ Tinh qua đời, người nhà thả một chiếc đèn lồng không thắp lửa lên trời từ Đỉnh Vọng Vân. Nếu đêm đó có sao bay ngược lên trời, nghĩa là vì sao của họ đã về.
- **Thắp đèn cửa:** đêm giông, mỗi nhà treo một chiếc đèn trước cửa để người đi biển thấy đường về. Tục này có từ Nàng Vạn Đăng.
- **Giỗ Bia:** mỗi năm một lần, dòng họ ra Bia Đá có khắc tên người nhà để lau bia và đặt cơm nắm.
- **Kiêng kỵ:**
  - Không chỉ tay vào sao băng. Làm vậy là "giành lời ước" của người khác.
  - Không chặn dòng nước. Muốn làm mương phải xin cả làng.
  - Không huýt sáo trên Hồ Gương, vì sợ đánh thức Bà Khơi trước giờ.
  - Không ước điều xấu cho người khác vào đêm rằm. Người ta tin lời đó sẽ chìm xuống và nuôi Hắc Giao.
- **Điềm:**
  - Thấy sao băng vàng: năm có người được chọn.
  - Nước Vịnh Khơi đen: phải đóng cửa, không ra khơi.
  - Đom đóm bay thành vòng: có người lạc trong Rừng Trúc Mây.

### 5.3. Tục lệ các vùng khác (tóm tắt)

| Vùng      | Tục lệ đặc trưng                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| Lũng Vân  | Viết lời hứa ra giấy rồi đọc trước gió. Lời hứa nói miệng không có giá trị trước Hội Đồng Bút                |
| Shizukane | Trước việc lớn phải ngồi im một khắc. Treo chuông không quả lắc để nhớ người đã mất                          |
| Purunae   | Ươm cây khi sinh con, chăm cây đó suốt đời. Người già được kính như cây cổ thụ                               |
| Golbaran  | Khách đến nhà được mời uống nước trước khi nói chuyện. Từ chối nước là điều thất lễ nặng                     |
| Marevia   | Thợ học việc phải tự rèn một chiếc đinh đầu tiên và đóng lên cửa lò của thầy                                 |
| Khokhtal  | Không bước qua ngưỡng lều. Buộc một sợi vải màu lên Đống Đá Chỉ Đường trước mỗi chuyến đi xa để nhớ đường về |

## 6. Trò chơi dân gian

| Tên                      | Vùng      | Cách chơi                                                                                                     | Gợi ý dùng trong game              |
| ------------------------ | --------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **Ô Sao**                | Đảo Lạc   | Bàn cờ khắc trên đất hoặc gỗ, mười hai ô và hai ô "trăng" ở hai đầu, rải hạt và ăn hạt. (Cảm hứng: ô ăn quan) | Trò chơi nhỏ ở Làng Vạn Lưới       |
| **Đá Cầu Lông Chim Lạc** | Đảo Lạc   | Đá cầu lông vũ qua lại, không để rơi                                                                          | Thử thách nhanh tay ở Phố Vạn Đăng |
| **Kéo Lưới**             | Đảo Lạc   | Hai đội kéo một tấm lưới. (Cảm hứng: kéo co)                                                                  | Sự kiện Hội Đua Thuyền             |
| **Bịt Mắt Bắt Đèn**      | Đảo Lạc   | Người bịt mắt bắt người cầm đèn lồng nhỏ                                                                      | Nhiệm vụ cùng Mai Linh             |
| **Cờ Gió**               | Lũng Vân  | Cờ trên bàn chín ô, quân di chuyển theo hướng gió rút thăm                                                    | Trò chơi bàn cờ                    |
| **Đua Diều Đứt Dây**     | Lũng Vân  | Hai diều cọ dây, diều nào đứt dây thì thua                                                                    | Sự kiện Hội Thả Diều               |
| **Chuông Im**            | Shizukane | Đi qua phòng treo chuông, ai làm chuông kêu thì thua                                                          | Thử thách lén lút                  |
| **Ném Que Bốn Mặt**      | Purunae   | Ném bốn que gỗ, đi quân theo số mặt ngửa. (Cảm hứng: yut)                                                     | Trò chơi lễ Trăng Thu              |
| **Xếp Gạch Men**         | Golbaran  | Ghép gạch men thành hoa văn đối xứng                                                                          | Câu đố ghép hình                   |
| **Vật Tay Thợ Rèn**      | Marevia   | Vật tay trên đe                                                                                               | Trò chơi nhỏ ở quán                |
| **Ném Đốt Xương**        | Khokhtal  | Búng những đốt xương cừu nhỏ, trúng đốt xương khác thì được ăn                                                | Trò chơi trong lều                 |

## 7. Tiền tệ Xu và buôn bán

### 7.1. Xu

- **Xu** là tiền chung của cả Vọng Tinh Giới, do Đoàn Thuyền Buôn Gió Nồm đề xuất từ Thời Trăm Bến để các vùng buôn bán dễ.
- Xu là đồng tròn bằng đồng thau, **lỗ giữa hình ngôi sao năm cánh**. Mặt trước in biểu tượng vùng đúc, mặt sau in chòm sao của năm đúc.
- Mỗi vùng tự đúc Xu, nhưng cân nặng và độ đồng phải giống nhau. Người Đếm Sao kiểm định mẫu Xu mỗi năm.
- Trong game chỉ có một đơn vị là Xu. Dân gian có cách nói "một xâu" (100 Xu xâu dây qua lỗ sao) và "một hòm" (10.000 Xu).

### 7.2. Giá cả tham khảo (cho người viết thoại và cân bằng sau này)

| Món                                        | Giá ở Đảo Lạc  |
| ------------------------------------------ | -------------- |
| Một bát Bún Cá Vạn Lưới                    | 8 Xu           |
| Một chiếc đèn lồng giấy của Mai Linh       | 30 Xu          |
| Một đêm trọ ở Phố Vạn Đăng                 | 50 Xu          |
| Một thanh kiếm sắt tốt                     | 2.000 Xu       |
| Tiền công đánh một trại quái (Ủy thác lớn) | 300 đến 800 Xu |

### 7.3. Đá Sao không phải tiền

- Đá Sao **không được mua bán công khai**. Người thường không dùng được nó, chỉ Người Ước Nguyện mới đốt được nó để ước.
- Đá Sao có được khi khám phá (rương báu, Bia Đá, nhiệm vụ), hoặc do người dân và Người Đếm Sao tặng.
- Việc Hội Mặt Nạ cướp kho Đá Sao năm NS 1230 là tội rất nặng.
- Quy tắc viết: không có nhân vật nào bán Đá Sao hay khuyên người chơi mua Đá Sao (xem A.3 mục 4).

### 7.4. Buôn bán

- **Chợ phiên:** mỗi làng một phiên mỗi con nước. Chợ đêm Vạn Đăng họp mỗi tối.
- **Hàng xuất của Đảo Lạc:** cá khô, lúa gạo, giấy dó, đèn lồng, ngọc bích, trống đồng nhỏ.
- **Hàng nhập:** lụa (Lũng Vân), thép (Shizukane), thảo dược (Purunae), gạch men và nghệ tây (Golbaran), thủy tinh và dầu ô liu (Marevia), len nỉ (Khokhtal).
- **Mặc cả** là bình thường ở chợ, không mặc cả ở hàng của người già và trẻ em.

## 8. Trang phục theo vùng

| Vùng      | Thường ngày                         | Lễ hội                                    | Hộ Tinh hay mặc                                         | Màu chủ đạo                  |
| --------- | ----------------------------------- | ----------------------------------------- | ------------------------------------------------------- | ---------------------------- |
| Đảo Lạc   | Áo cánh, quần lụa, nón lá, khăn vấn | Áo tứ thân, áo dài cổ, nón quai thao      | Áo ngắn tay gọn để đánh, đai lưng có hoa văn trống đồng | Nâu, chàm, đỏ son, vàng đồng |
| Lũng Vân  | Áo giao lĩnh ngắn, quần ống rộng    | Áo bào lụa tay rộng                       | Áo bào xẻ tà, đai vải dài                               | Son đỏ, mực, xanh ngọc       |
| Shizukane | Áo nhiều lớp, áo khoác bông         | Áo dài tay rộng nhiều lớp màu             | Áo ngắn bó tay, khăn quàng dài, ủng đi tuyết            | Chàm, trắng, đỏ sơn mài      |
| Purunae   | Áo ngắn và váy dài phồng, quần rộng | Áo lụa màu sáng, áo khoác ngắn            | Áo khoác ngắn, đai thêu, giày vải                       | Xanh thông, men ngọc, đỏ thu |
| Golbaran  | Áo dài tay rộng, khăn che bụi       | Áo thêu kim tuyến, khăn lụa               | Áo choàng mỏng xẻ vạt, khăn đội đầu                     | Xanh men, đỏ thảm, cát vàng  |
| Marevia   | Áo tunic, dép da                    | Áo choàng quấn kiểu toga, vòng nguyệt quế | Tunic ngắn, tạp dề da, áo choàng có trâm                | Trắng, đỏ đất nung, tím      |
| Khokhtal  | Áo choàng dài vạt chéo, ủng da      | Áo choàng thêu, mũ lông cao               | Áo choàng ngắn để cưỡi ngựa, giáp da                    | Đỏ, xanh trời, vàng          |

Quy tắc chung: trang phục lấy cảm hứng từ đồ truyền thống, được cách điệu cho hợp chibi và chiến đấu. Không phóng đại thành khuôn mẫu. Không làm hở hang hơn đồ gốc.
`,ls=`# 06. Bách khoa sinh vật

## 0. Quy ước

- **Mức nguy hiểm:** 1 (trẻ con cũng tránh được) đến 5 (cần cả đội Hộ Tinh). **Tinh anh** là quái mạnh đứng riêng một khu, **Boss** là trận đánh riêng.
- **Nguyên tố "Không"** nghĩa là quái không mang tính khí nào. Mọi nguyên tố đánh bình thường.
- **Điểm yếu** ghi theo logic thế giới và gợi ý cơ chế. Số liệu cụ thể do session cân bằng quyết định.
- Mọi quái khi bị đánh bại **tan thành bụi sao hoặc bỏ chạy**, không có máu hay xác (xem \`00-tong-quan.md\` mục 4).
- **Vì sao quái dữ:** phần lớn sinh vật trong file này vốn không ác. Chúng dữ lên vì bị **Nguyện Cặn** bám vào, bị mất chỗ ở, hoặc do người tạo ra rồi bỏ mặc.

## 1. Tổng quan

| #   | Tên               | Vùng               | Nguyên tố                    | Nguy hiểm | Loại         | Trạng thái                |
| --- | ----------------- | ------------------ | ---------------------------- | --------- | ------------ | ------------------------- |
| 1   | Giọt Nhầy         | Đảo Lạc, mọi vùng  | Theo nơi sống                | 1         | Thường       | Có trong game (\`slime\`)   |
| 2   | Yêu Rừng          | Đảo Lạc            | Không                        | 2         | Thường       | Có trong game (\`goblin\`)  |
| 3   | Yêu Rừng Cung Thủ | Đảo Lạc            | Không                        | 2         | Thường       | Có trong game (\`archer\`)  |
| 4   | Pháp Sư Mặt Nạ    | Mọi vùng           | Theo mặt nạ                  | 3         | Thường       | Có trong game (\`shaman\`)  |
| 5   | Hộ Vệ Đá Cổ       | Đảo Lạc            | Thổ                          | 4         | Tinh anh     | Có trong game (\`golem\`)   |
| 6   | Hắc Giao          | Đảo Lạc            | Thủy, sang Lôi ở giai đoạn 2 | 5         | Boss         | Có trong game (\`hacgiao\`) |
| 7   | Cua Mai Đồng      | Đảo Lạc            | Thủy                         | 2         | Thường       | Mới                       |
| 8   | Đom Đóm Lạc Lối   | Đảo Lạc            | Lôi                          | 1         | Thường (bầy) | Mới                       |
| 9   | Bóng Cặn          | Đảo Lạc, Biển Lặng | Thủy                         | 3         | Thường       | Mới                       |
| 10  | Trâu Đá Ngủ       | Đảo Lạc            | Thổ                          | 4         | Tinh anh     | Mới                       |
| 11  | Lính Mặt Nạ Trắng | Mọi vùng           | Không                        | 2         | Thường       | Mới                       |
| 12  | Diều Hoang        | Lũng Vân           | Phong                        | 2         | Thường       | Mới                       |
| 13  | Hạc Mực           | Lũng Vân           | Phong                        | 3         | Thường       | Mới                       |
| 14  | Cú Tuyết Lặng     | Shizukane          | Băng                         | 2         | Thường       | Mới                       |
| 15  | Giáp Băng Vô Chủ  | Shizukane          | Băng                         | 4         | Tinh anh     | Mới                       |
| 16  | Nấm Đèn           | Purunae            | Mộc                          | 1         | Thường (bầy) | Mới                       |
| 17  | Hổ Rêu            | Purunae            | Mộc                          | 4         | Tinh anh     | Mới                       |
| 18  | Bọ Hung Men       | Golbaran           | Thổ                          | 2         | Thường       | Mới                       |
| 19  | Rắn Cát Kính      | Golbaran           | Thổ                          | 3         | Thường       | Mới                       |
| 20  | Kỳ Đà Lửa         | Marevia            | Hỏa                          | 2         | Thường       | Mới                       |
| 21  | Tượng Đồng Đấu Sĩ | Marevia            | Hỏa                          | 4         | Tinh anh     | Mới                       |
| 22  | Sói Sấm           | Khokhtal           | Lôi                          | 3         | Thường (bầy) | Mới                       |
| 23  | Đại Bàng Mây Dông | Khokhtal           | Lôi                          | 4         | Tinh anh     | Mới                       |

Tổng: 6 loại hiện có (5 quái và Hắc Giao) và 17 loại mới.

---

## 2. Quái hiện có

### 2.1. Giọt Nhầy (\`slime\`)

- **Vùng sống:** ruộng, bờ sông, rìa rừng Đảo Lạc. Biến thể có ở mọi vùng.
- **Tập tính:** hạt nguyện nhỏ rơi xuống đất ẩm rồi đông thành khối nhầy trong. Chúng đi theo nhóm, bò về chỗ có tiếng người vì "nhớ" mình từng là lời ước của người.
- **Nguy hiểm:** 1.
- **Nguyên tố:** mang màu và tính khí của nơi sống (ruộng thì Thủy, gần lò rèn thì Hỏa). Trong bản thử nghiệm không có nguyên tố.
- **Điểm yếu:** chậm, dễ bị đẩy lùi. Phong thổi bay.
- **Lời đồn dân gian:** "Giọt nhầy nào vỡ ra mà có tiếng cười là lời ước của trẻ con."
- **Gợi ý hình ảnh:** khối tròn mọng, trong suốt, bên trong có một đốm sáng nhỏ nhấp nháy như hạt nguyện. Mắt là hai chấm.
- **Gợi ý cơ chế:** nhảy bổ vào người. Khi bị đánh bại nhả ra một hạt sáng hồi chút năng lượng.
- **Ghi chú tên:** tên hiển thị là Giọt Nhầy (trước đây là "Slime"). ID dữ liệu vẫn là \`slime\`.

### 2.2. Yêu Rừng (\`goblin\`)

- **Vùng sống:** Rừng Trúc Mây.
- **Tập tính:** dân rừng nhỏ bé, mặt xanh, tai dài, sống thành làng trên ngọn trúc. Trước đây chúng chỉ trộm cơm nắm của người đi rừng. Từ khi Hội Mặt Nạ đốt bãi trúc phía nam, chúng coi mọi người lạ là kẻ thù và lập trại ra tận bìa rừng.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Không.
- **Điểm yếu:** Hỏa (sợ lửa vì bãi trúc bị đốt). Nếu đánh tan trại, chúng chạy về rừng chứ không biến mất.
- **Lời đồn dân gian:** "Để một nắm xôi ở gốc trúc thì đêm đó Yêu Rừng không vào làng."
- **Gợi ý hình ảnh:** thân nhỏ, áo bằng lá trúc khô, gậy trúc vót nhọn, đeo một vòng hạt trúc.
- **Gợi ý cơ chế:** lao vào đánh gần, đi theo nhóm 3 đến 4 con.
- **Mở rộng cốt truyện:** một nhiệm vụ phụ cho phép làm hòa với làng Yêu Rừng.

### 2.3. Yêu Rừng Cung Thủ (\`archer\`)

- **Vùng sống:** Rừng Trúc Mây, trên cành cao.
- **Tập tính:** Yêu Rừng lớn tuổi hơn, canh gác làng. Bắn mũi tên trúc từ xa.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Không.
- **Điểm yếu:** Phong (gió làm lệch tên), đánh gần.
- **Lời đồn dân gian:** "Nghe tiếng trúc gõ ba lần là Yêu Rừng Cung Thủ báo động."
- **Gợi ý hình ảnh:** giống Yêu Rừng nhưng đội nón lá trúc, cung làm từ một đốt trúc cong.
- **Gợi ý cơ chế:** giữ khoảng cách, lùi lại khi bị áp sát.

### 2.4. Pháp Sư Mặt Nạ (\`shaman\`)

- **Vùng sống:** quanh các Bia Đá, trại quái, phế tích. Có ở mọi vùng.
- **Tập tính:** thành viên cấp thấp của Hội Mặt Nạ (bậc Mặt Nạ Trắng có học phép). Họ là người thật, không phải quái. Họ dùng Nguyện Cặn chứa trong mặt nạ để bắn những cầu năng lượng tối.
- **Nguy hiểm:** 3.
- **Nguyên tố:** mặt nạ chứa lời ước nào thì mang tính khí đó. Trong bản thử nghiệm không có nguyên tố.
- **Điểm yếu:** đánh gần, ngắt phép. Khi bị đánh bại, mặt nạ nứt và họ bỏ chạy. Người chơi không bao giờ thấy mặt họ trong bản thử nghiệm.
- **Lời đồn dân gian:** "Ai đeo mặt nạ trắng ba năm thì quên mặt mình."
- **Gợi ý hình ảnh:** áo choàng xám có mũ trùm, mặt nạ gốm trắng không có lỗ mắt, tay cầm chuỗi hạt đen.
- **Gợi ý cơ chế:** đứng xa niệm phép. Có thể tăng sức cho quái xung quanh.
- **Quy tắc viết:** khi đánh bại, gọi là "bỏ chạy" hoặc "ngã quỵ", không bao giờ là "chết".

### 2.5. Hộ Vệ Đá Cổ (\`golem\`, tinh anh)

- **Vùng sống:** quanh Hang Hắc Giao và các phế tích Thời Nước Đen.
- **Tập tính:** tượng đá Tô Khuyết khắc năm NS 1052 để canh miệng hang. Lõi chứa một mảnh sao nhỏ. Ba trăm năm qua, lõi bị Nguyện Cặn thấm vào nên tượng không còn phân biệt bạn thù, đánh mọi ai đến gần.
- **Nguy hiểm:** 4.
- **Nguyên tố:** Thổ.
- **Điểm yếu:** chậm, sau mỗi cú đập mạnh phải đứng nghỉ. Lõi sao lộ ra ở lưng. Lôi và Băng làm đá giòn.
- **Lời đồn dân gian:** "Hộ Vệ Đá Cổ là Tô Khuyết hóa đá." (Sai, nhưng có lý do: mặt tượng được khắc theo mặt anh.)
- **Gợi ý hình ảnh:** tượng người bằng đá xám to gấp ba người, khắc hoa văn trống đồng trên ngực, mắt là hai khe sáng xanh lục. Một nửa mặt nứt vỡ.
- **Gợi ý cơ chế:** cú đập đất có vùng cảnh báo trước, đòn quét rộng. Đánh vào lưng thì sát thương cao hơn.

### 2.6. Hắc Giao (\`hacgiao\`, boss)

Hồ sơ đầy đủ ở \`07-hac-giao-va-hoi-mat-na.md\`. Phần dưới chỉ ghi phần sinh vật học và chiến đấu.

- **Vùng sống:** Hang Hắc Giao, nối thông xuống Biển Lặng.
- **Tập tính:** con giao (rồng nước không sừng) đen dài hàng trăm sải, thân bằng Nguyện Cặn đông lại. Nó không ăn, không ngủ, chỉ cuộn mình và **thì thầm** những lời ước chưa ai nghe.
- **Nguy hiểm:** 5.
- **Nguyên tố:** Thủy ở giai đoạn 1. Khi mất một nửa sức, lớp lời ước giận dữ nhất trong nó bùng ra thành sấm, nó chuyển sang **Lôi** và nhanh hơn. Đây là lý do trong truyện của giai đoạn 2 trong game.
- **Điểm yếu:** giai đoạn 1 yếu với Lôi (Điện Cảm) và Băng (Đóng Băng). Giai đoạn 2 yếu với Băng (Siêu Dẫn) và Thổ (Kết Tinh làm khiên).
- **Lời đồn dân gian:** "Đêm Vịnh Khơi đen, đừng nói lời ước thành tiếng, kẻo Hắc Giao nghe được mà học theo."
- **Gợi ý hình ảnh:** thân dài như mực đặc, trên da lấp lánh những chữ viết mờ (những lời ước), mắt màu bạc đục như trăng sau mây. Giai đoạn 2: vảy nứt, tia chớp tím chạy dọc sống lưng.
- **Gợi ý cơ chế:** giai đoạn 1 quẫy đuôi, phun sóng, triệu Bóng Cặn. Giai đoạn 2 lao nhanh, gọi sét đánh theo vùng.
- **Ghi chú truyện:** mỗi lần thắng, Hắc Giao không chết mà **dịu xuống** và chìm sâu vào hang.

---

## 3. Quái mới ở Đảo Lạc

### 3.1. Cua Mai Đồng

- **Vùng sống:** Bãi Sao Rơi, Làng Vạn Lưới, bờ đá Vịnh Khơi.
- **Tập tính:** cua đá to như cái thúng. Mai của chúng bám đầy mảnh đồng vỡ từ những chiếc trống ở ba làng chìm. Bình thường hiền, chỉ đánh khi bị dẫm vào tổ.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Thủy.
- **Điểm yếu:** bụng mềm. Lật ngửa bằng Phong (Khuếch Tán) hoặc đòn hất tung. Lôi lan qua mai đồng.
- **Lời đồn dân gian:** "Gõ vào mai cua đồng mà nghe tiếng trống thì năm ấy được mùa cá."
- **Gợi ý hình ảnh:** cua màu xanh rêu, mai có hoa văn trống đồng gỉ xanh, càng to một bên.
- **Gợi ý cơ chế:** giơ càng đỡ đòn trước mặt, phải đánh vòng ra sau. Đi ngang.

### 3.2. Đom Đóm Lạc Lối

- **Vùng sống:** Rừng Trúc Mây, ruộng lúa đêm.
- **Tập tính:** bầy đom đóm bị lời ước "mong được về nhà" của người lạc bám vào, nên mỗi bầy là một cơn lốc ánh sáng tìm đường. Chúng dẫn người lạc vào sâu hơn và chích điện ai đuổi theo.
- **Nguy hiểm:** 1 (một bầy), 2 (nhiều bầy).
- **Nguyên tố:** Lôi.
- **Điểm yếu:** Thủy (gây Điện Cảm làm cả bầy tê liệt). Đèn lồng của Mai Linh hút chúng lại.
- **Lời đồn dân gian:** "Đom đóm bay thành vòng là có người lạc trong rừng."
- **Gợi ý hình ảnh:** đám 20 đến 30 đốm sáng tím vàng xoáy tròn, ở giữa thấp thoáng hình một bàn tay.
- **Gợi ý cơ chế:** bầy bay vòng quanh người chơi, gây sát thương nhỏ liên tục. Đánh vào tâm bầy thì tan.

### 3.3. Bóng Cặn

- **Vùng sống:** Vịnh Khơi lúc nước đen, Hang Hắc Giao, Lòng Sao bị nhiễm bùn.
- **Tập tính:** những mảnh Nguyện Cặn nhỏ tách khỏi Hắc Giao, mang hình người mờ đen. Mỗi Bóng Cặn lặp đi lặp lại một lời ước không thành, ví dụ "giá mà ta đã ở lại".
- **Nguy hiểm:** 3.
- **Nguyên tố:** Thủy.
- **Điểm yếu:** Hỏa (Bốc Hơi), ánh sáng của Bia Đá. Đứng gần Bia Đá thì chúng yếu đi.
- **Lời đồn dân gian:** "Nghe Bóng Cặn nói đến câu thứ ba thì đừng đáp lại."
- **Gợi ý hình ảnh:** bóng người cao gầy làm bằng nước mực, mặt trống trơn, có một đốm sáng bạc ở chỗ tim.
- **Gợi ý cơ chế:** biến mất rồi hiện lại sau lưng người chơi. Khi bị đánh bại để lại vũng nước đen làm chậm.
- **Ghi chú truyện:** khi bị đánh bại, Bóng Cặn nói hết câu ước của nó rồi tan. Đây là chỗ để viết những dòng ngắn đầy cảm xúc.

### 3.4. Trâu Đá Ngủ (tinh anh)

- **Vùng sống:** Mỏ Ngọc Lòng Chảo, tầng sâu.
- **Tập tính:** con trâu khổng lồ hóa đá từ thời Bảy Sao Xuống, ngủ cuộn trong lòng mỏ. Thợ mỏ đào sâu quá làm nó tỉnh dậy. Nó không ác, chỉ cáu vì bị đánh thức.
- **Nguy hiểm:** 4.
- **Nguyên tố:** Thổ.
- **Điểm yếu:** sau mỗi cú húc phải dừng lại thở. Thủy làm đá trơn khiến nó trượt ngã.
- **Lời đồn dân gian:** "Thợ mỏ hát ru thì Trâu Đá ngủ tiếp." Thực tế đúng: nếu có Thủy Nguyệt trong đội, trận đấu ngắn hơn.
- **Gợi ý hình ảnh:** trâu đá xám, sừng là hai khối ngọc bích, lưng mọc rêu và cỏ.
- **Gợi ý cơ chế:** húc theo đường thẳng có cảnh báo, giậm chân làm đá rơi từ trần mỏ.

### 3.5. Lính Mặt Nạ Trắng

- **Vùng sống:** mọi vùng, quanh trại của Hội Mặt Nạ.
- **Tập tính:** thành viên mới của Hội Mặt Nạ, chưa học phép, dùng gậy và dao găm. Phần lớn là người nghèo, Người Tắt Sao, hoặc người trẻ giận đời.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Không.
- **Điểm yếu:** thiếu kỷ luật. Nếu Pháp Sư Mặt Nạ đi cùng bị đánh bại, họ bỏ chạy.
- **Lời đồn dân gian:** "Lính mặt nạ ban ngày là thợ, là phu, là người bán hàng ngay cạnh nhà mình."
- **Gợi ý hình ảnh:** áo vải thô, mặt nạ gốm trắng trơn có vết nứt, khăn quấn tay.
- **Gợi ý cơ chế:** đánh gần, đi theo nhóm, có con ném bình mực đen gây chậm.

---

## 4. Quái mới ở các vùng khác

### 4.1. Diều Hoang (Lũng Vân)

- **Vùng sống:** Thiên Diên Thành, Bến Lụa, Thành Không Tên.
- **Tập tính:** những con diều ước bị đốt không hết sau Hội Thả Diều Thư. Hạt nguyện còn sót làm chúng bay dậy và lượn tìm người viết.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Phong.
- **Điểm yếu:** Hỏa (giấy cháy). Cắt dây (đòn chém) thì rơi xuống.
- **Lời đồn dân gian:** "Thấy diều không dây bay ngược gió là lời ước của mình chưa đến."
- **Gợi ý hình ảnh:** diều giấy hình chim, mép cháy sém, chữ viết tay chạy dọc thân, dây diều lơ lửng như đuôi.
- **Gợi ý cơ chế:** lao bổ từ trên xuống, kéo người chơi lại gần bằng dây.

### 4.2. Hạc Mực (Lũng Vân)

- **Vùng sống:** Hồ Mực, Hẻm Thư Pháp.
- **Tập tính:** hạc uống nước Hồ Mực qua nhiều đời, lông chuyển đen. Chúng ghét tiếng nói dối và mổ người nói dối.
- **Nguy hiểm:** 3.
- **Nguyên tố:** Phong.
- **Điểm yếu:** Lôi (lông ướt mực dẫn điện). Khi đứng một chân nghỉ thì không phòng thủ.
- **Lời đồn dân gian:** "Học sĩ được hạc mực đi theo là người viết thật."
- **Gợi ý hình ảnh:** hạc thanh mảnh, lông đen loang như nét mực tàu, mỏ và chân đỏ son.
- **Gợi ý cơ chế:** vỗ cánh bắn ra những vệt mực, vùng mực làm mờ tầm nhìn.

### 4.3. Cú Tuyết Lặng (Shizukane)

- **Vùng sống:** Ranmori, Đường Thư Núi.
- **Tập tính:** cú trắng săn đêm. Bị lời ước "mong được yên tĩnh" bám vào, chúng tấn công bất cứ thứ gì gây ồn.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Băng.
- **Điểm yếu:** Hỏa (Tan Chảy). Đi chậm, không chạy, thì chúng không phát hiện.
- **Lời đồn dân gian:** "Cú tuyết đậu lên mái nhà nào thì nhà đó sắp có tin vui."
- **Gợi ý hình ảnh:** cú tròn trắng, lông như tuyết bông, mắt xanh băng, không bao giờ kêu.
- **Gợi ý cơ chế:** tầm phát hiện dựa vào tiếng (chạy, lướt, đánh). Lao xuống từ trên cao gây chậm.

### 4.4. Giáp Băng Vô Chủ (Shizukane, tinh anh)

- **Vùng sống:** Nadare-no-ato (Vết Tuyết Lở).
- **Tập tính:** những bộ áo giáp của người chết trong Tuyết Lở Lớn, đông cứng và tự đi lại. Chúng vẫn tuần tra con đường cũ như đang làm nhiệm vụ.
- **Nguy hiểm:** 4.
- **Nguyên tố:** Băng.
- **Điểm yếu:** Hỏa (Tan Chảy), đòn nặng của đại kiếm. Nếu cúi chào trước khi vào vùng tuần tra, chúng do dự vài giây.
- **Lời đồn dân gian:** "Giáp băng không đánh trẻ con."
- **Gợi ý hình ảnh:** bộ giáp lá kiểu cổ đông trong băng xanh, bên trong rỗng, có tuyết rơi bên trong.
- **Gợi ý cơ chế:** đánh chậm nhưng nặng, phản đòn khi bị đánh trực diện, tạo vùng băng trơn.

### 4.5. Nấm Đèn (Purunae)

- **Vùng sống:** Rừng Ngàn Thông, gốc rễ Sonamu.
- **Tập tính:** nấm phát sáng mọc trên rễ của Sonamu, hút chút sức của ông nên vui buồn thất thường. Lúc vui thì soi đường, lúc buồn thì phun bào tử làm người buồn ngủ.
- **Nguy hiểm:** 1.
- **Nguyên tố:** Mộc.
- **Điểm yếu:** Hỏa. Ánh sáng mạnh làm chúng cụp mũ.
- **Lời đồn dân gian:** "Nấm đèn sáng xanh là Ông Thông đang mơ đẹp."
- **Gợi ý hình ảnh:** nấm nhỏ mũ tròn phát sáng xanh lục nhạt, có chân như hai cái rễ, đi lạch bạch.
- **Gợi ý cơ chế:** đi theo bầy, phun vùng bào tử làm chậm hồi kỹ năng.

### 4.6. Hổ Rêu (Purunae, tinh anh)

- **Vùng sống:** Rừng Ngàn Thông, Đèo Hổ Ngủ.
- **Tập tính:** hổ núi già phủ rêu, giữ rừng. Hổ được người Purunae kính trọng. Hổ Rêu chỉ đánh khi rừng bị xâm phạm, ví dụ khi Hội Mặt Nạ chặt thông.
- **Nguy hiểm:** 4.
- **Nguyên tố:** Mộc.
- **Điểm yếu:** Hỏa, nhưng đánh bằng Hỏa trong rừng làm giảm điểm uy tín với dân Purunae (gợi ý cơ chế). Có thể kết thúc trận bằng cách không đánh nữa khi nó còn một phần ba máu.
- **Lời đồn dân gian:** "Hổ rêu không ăn thịt người. Nó chỉ nhớ mặt người chặt cây."
- **Gợi ý hình ảnh:** hổ lớn, sọc lông là những vệt rêu xanh thẫm, lưng mọc nấm và dương xỉ, mắt màu hổ phách hiền.
- **Gợi ý cơ chế:** vồ có cảnh báo, gọi rễ trồi lên trói chân.
- **Quy tắc viết:** không bao giờ gọi Hổ Rêu là ác thú. Kết trận là nó bỏ đi vào rừng.

### 4.7. Bọ Hung Men (Golbaran)

- **Vùng sống:** quanh Minashahr, các phế tích, Thành Tháp Gió.
- **Tập tính:** bọ hung to bằng con chó, lăn những viên gạch men vỡ về tổ. Lưng dính men nên cứng như giáp.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Thổ.
- **Điểm yếu:** Lôi và Băng làm men nứt. Lật ngửa thì yếu.
- **Lời đồn dân gian:** "Theo bọ hung men là tìm được gạch của nhà người xưa."
- **Gợi ý hình ảnh:** bọ hung tròn, lưng ốp gạch men xanh lam hoa văn hình học, chân đen bóng.
- **Gợi ý cơ chế:** lăn viên gạch to về phía người chơi, cuộn tròn phòng thủ.

### 4.8. Rắn Cát Kính (Golbaran)

- **Vùng sống:** Cồn Cát Hát, sa mạc mở.
- **Tập tính:** rắn sống dưới cát. Vảy trong như thủy tinh vì cát quanh tổ bị sét đánh nóng chảy.
- **Nguy hiểm:** 3.
- **Nguyên tố:** Thổ.
- **Điểm yếu:** Thủy (làm cát đặc lại, rắn không lặn được). Đòn đánh vào lúc rắn trồi lên.
- **Lời đồn dân gian:** "Rắn cát kính giữ lối tới ốc đảo bị mất."
- **Gợi ý hình ảnh:** rắn dài, vảy trong suốt như kính, nhìn thấy cát chảy bên trong.
- **Gợi ý cơ chế:** lặn dưới cát (chỉ thấy gợn cát), trồi lên cắn, phun cát làm mờ mắt.

### 4.9. Kỳ Đà Lửa (Marevia)

- **Vùng sống:** khe dung nham Mons Fornax, bãi xỉ quanh lò rèn.
- **Tập tính:** thằn lằn lớn ăn tro than của các lò rèn. Thợ Marevia coi chúng như mèo nhà, nhưng kỳ đà hoang thì rất dữ.
- **Nguy hiểm:** 2.
- **Nguyên tố:** Hỏa.
- **Điểm yếu:** Thủy (Bốc Hơi), Băng (Tan Chảy).
- **Lời đồn dân gian:** "Kỳ đà lửa nằm trên đe nào thì đe ấy rèn ra đồ tốt."
- **Gợi ý hình ảnh:** thằn lằn da như than nứt, khe nứt đỏ rực, đuôi có ngọn lửa nhỏ.
- **Gợi ý cơ chế:** phun lửa hình nón, để lại vệt cháy trên mặt đất.

### 4.10. Tượng Đồng Đấu Sĩ (Marevia, tinh anh)

- **Vùng sống:** Đấu Trường Đá Trắng, xưởng ngầm.
- **Tập tính:** tượng đồng thợ xưa làm để học trò luyện đánh. Nhiễm Nguyện Cặn từ xưởng của Mặt Nạ Sáp, chúng tự chạy và đánh thật.
- **Nguy hiểm:** 4.
- **Nguyên tố:** Hỏa.
- **Điểm yếu:** Thủy làm đồng nguội và chậm lại. Lôi gây Quá Tải khi đồng đang nóng đỏ.
- **Lời đồn dân gian:** "Tượng đồng nhớ từng thế đánh của mọi học trò từng đấu với nó."
- **Gợi ý hình ảnh:** tượng đồng cao lớn, khiên tròn, mũ có chóp, khớp nối phát sáng đỏ.
- **Gợi ý cơ chế:** học theo đòn người chơi: dùng một kỹ năng quá nhiều lần thì tượng chặn được kỹ năng đó.

### 4.11. Sói Sấm (Khokhtal)

- **Vùng sống:** Núi Răng Sói, đồng cỏ lúc giông.
- **Tập tính:** sói sống theo đàn. Lông tích điện từ những cơn giông liên miên. Chúng chạy theo đàn ngựa của Aianga để kiếm mồi bị sét đánh.
- **Nguy hiểm:** 3.
- **Nguyên tố:** Lôi.
- **Điểm yếu:** Thổ (Kết Tinh hút điện), Băng (Siêu Dẫn).
- **Lời đồn dân gian:** "Sói sấm không bao giờ tấn công người đang đua với giông."
- **Gợi ý hình ảnh:** sói xám lông dựng, những tia điện tím chạy trên lưng, mắt vàng.
- **Gợi ý cơ chế:** đi theo đàn 3 con, bao vây, lao điện theo đường thẳng.

### 4.12. Đại Bàng Mây Dông (Khokhtal, tinh anh)

- **Vùng sống:** mây dông trên Đường Đua Giông, Đồi Đá Sét.
- **Tập tính:** đại bàng cổ to như cánh buồm, làm tổ trong mây dông và bay theo đàn ngựa của Aianga. Đó là "chim báo giông" của thảo nguyên.
- **Nguy hiểm:** 4.
- **Nguyên tố:** Lôi.
- **Điểm yếu:** Cung và pháp khí đánh lúc nó lượn thấp. Thổ làm nó không gọi được sét xuống.
- **Lời đồn dân gian:** "Đại bàng mây dông rơi một chiếc lông ở lều nào thì con nhà ấy sẽ cưỡi ngựa giỏi."
- **Gợi ý hình ảnh:** đại bàng nâu sẫm, mép cánh như mây xám, mắt có tia chớp nhỏ.
- **Gợi ý cơ chế:** bay vòng ngoài tầm đánh gần, đánh dấu vùng rồi gọi sét. Lao xuống quặp người chơi.

---

## 5. Gợi ý boss các vùng (cho session sau)

| Vùng      | Boss gợi ý                    | Ý tưởng                                     |
| --------- | ----------------------------- | ------------------------------------------- |
| Lũng Vân  | Mặt Nạ Giấy và Diều Khổng Lồ  | Diều kết bằng nghìn tờ giấy ước bị đốt      |
| Shizukane | Bóng Tuyết Lở                 | Ký ức của Tuyết Lở Lớn thành hình           |
| Purunae   | Rễ Già Mất Trí                | Một nhánh rễ của Sonamu bị Nguyện Cặn nhiễm |
| Golbaran  | Mặt Nạ Đất Nung và Tượng Gạch | Người khổng lồ bằng gạch chưa nung          |
| Marevia   | Mặt Nạ Sáp và Lõi Sao Giả     | Lõi sao giả quá tải                         |
| Khokhtal  | Kẻ Gánh Nguyện (lần 1)        | Tô Khuyết thử sức Người Ước Nguyện          |
`,ss=`# 07. Hắc Giao và Hội Mặt Nạ: hồ sơ phản diện

Nhãn bí mật như các file khác: **[Công khai]**, **[Hé lộ Ch.N]**, **[Bí mật cuối]**.

Nguyên tắc chung: **không ác vô cớ**. Người chơi phải hiểu được cả hai phản diện, và đến cuối có thể thấy thương họ, dù không đồng ý với cách họ làm.

---

## 1. Hắc Giao

### 1.1. Hồ sơ

| Mục               | Nội dung                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| Loài              | Giao, rồng nước không sừng, thân dài                                                                 |
| Thành phần        | Nguyện Cặn đông đặc: hàng triệu lời ước không ai nghe trong sáu trăm năm                             |
| Nơi ở             | Hang Hắc Giao dưới núi phía bắc Đảo Lạc, nối xuống Biển Lặng                                         |
| Xuất hiện lần đầu | NS 1046, Vịnh Khơi [Công khai]                                                                       |
| Bị phong ấn       | NS 1052, bởi Bà Khơi và Năm Người Giữ Đảo [Công khai]                                                |
| Nguyên tố         | Thủy. Lớp lời ước giận dữ nhất trong nó mang tính khí Lôi, bùng ra khi bị thương nặng                |
| Tiếng nói         | Không nói thành câu của riêng nó. Nó thì thầm lại những lời ước nó mang, bằng giọng của người đã ước |

### 1.2. Động cơ

Hắc Giao không muốn phá hủy. **Nó muốn được nghe.**

- Mỗi lời ước trong nó là một tiếng nói chưa bao giờ được trả lời. Gộp lại, chúng thành một ý muốn duy nhất: **"Hãy có ai đó nghe chúng ta."**
- Mùa Nước Đen năm NS 1046 không phải một cuộc tấn công. Đó là lúc nó trồi lên để tìm người nghe, và nước đen theo nó dâng lên khắp nơi. [Hé lộ Ch.1]
- Nay nó thức dậy vì cảm thấy Người Ước Nguyện, người có lời ước được nghe ngay, đã xuất hiện. Với nó, đó là tiếng gọi đầu tiên sau ba trăm năm. [Hé lộ Ch.7]

### 1.3. Hắc Giao và Bà Khơi [Bí mật cuối]

- Hắc Giao **tách ra từ chính Bà Khơi**. Từ Thời Trăm Bến, bà nuốt Nguyện Cặn để biển khỏi đục. Năm NS 1046, phần bùn ấy nặng đến mức thành một sinh vật riêng.
- Đôi mắt bạc đục của Hắc Giao là **mắt của Bà Khơi**.
- Giết Hắc Giao là giết phần bị thương của Bà Khơi. Bà sẽ chết theo.
- Cách giải duy nhất: trả từng lời ước trong Hắc Giao về cho người đã ước (hoặc con cháu, làng xóm của họ), để **cộng đồng cùng gánh**. Đó là thông điệp cốt lõi của game.

### 1.4. Hắc Giao qua từng chương

| Chương | Hắc Giao làm gì                                                                         | Người chơi thấy gì                                    |
| ------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 1      | Cựa mình, đánh thức Bóng Cặn, đòi ra khỏi hang                                          | Trận boss đầu tiên. Thắng thì nó dịu xuống            |
| 2–6    | Ngủ chập chờn. Mỗi lần một vùng có biến cố liên quan Nguyện Cặn, Vịnh Khơi lại đen thêm | Tin từ Đảo Lạc gửi qua thư. Bia Đá rung               |
| 7      | Rễ Sonamu chạm tới Hắc Giao. Nó nói câu đầu tiên của riêng mình: "Mẹ."                  | Cảnh cắt lớn                                          |
| 8      | Trồi lên Vịnh Khơi lần cuối, giữa lúc Hội Mặt Nạ thực hiện Đêm Không Sao                | Trận cuối: không phải đánh cho chết mà "nghe" cho hết |

---

## 2. Hội Mặt Nạ

### 2.1. Tên gọi

- **Dân gian:** **Hội Mặt Nạ** (thuật ngữ A.5, dùng trong game).
- **Họ tự gọi mình:** "những người chưa được nghe". Tên chính thức là **Hội Bất Nguyện**, xem \`11-dat-ten.md\` mục 3.6.

### 2.2. Lý tưởng

> "Sao chọn một người, bỏ quên hai nghìn người. Lời ước của hai nghìn người đó chìm xuống đáy biển và hóa thành quái vật. Chúng ta không cần ai được chọn nữa."

- **Điều họ thấy đúng:** hệ thống sao đang hỏng. Sao mới sinh ít dần, lời ước chìm nhiều dần, Trấn Tinh kiệt sức. Đây là sự thật mà Người Đếm Sao cũng biết. [Hé lộ Ch.4]
- **Điều họ làm sai:** họ muốn **tắt hết các vì sao** trong một đêm, gọi là **Đêm Không Sao**. Khi đó mọi lời ước dưới Biển Lặng trồi lên trả về người đã ước. Họ tin rằng đó là công bằng. Họ không tính tới việc bảy vùng sẽ ra sao khi không còn Hộ Tinh, không còn Bia Đá, và khi hàng triệu nỗi đau cũ cùng ập về một lúc.
- **Quy tắc của hội:** không giết người thường, không đốt nhà dân. Trộm, phá, đánh Hộ Tinh thì được. Một số thành viên cấp cao vi phạm quy tắc này, gây chia rẽ trong hội.

### 2.3. Mặt nạ

- Mỗi thành viên **viết hoặc khắc lời ước không thành của chính mình** vào mặt trong mặt nạ.
- Mặt nạ hút Nguyện Cặn từ lời ước đó, cho người đeo dùng sức mạnh tối (phép của Pháp Sư Mặt Nạ).
- Đeo lâu thì mặt nạ "ăn" dần ký ức của người đeo về khuôn mặt mình. Câu đồn "đeo ba năm thì quên mặt mình" là thật. [Hé lộ Ch.2]
- Mặt nạ không có lỗ mắt, vì "ta không cần nhìn sao, sao cũng chẳng nhìn ta".

### 2.4. Cấu trúc tổ chức

| Bậc | Tên                | Số lượng ước tính   | Mô tả                                                                          |
| --- | ------------------ | ------------------- | ------------------------------------------------------------------------------ |
| 1   | **Mặt Nạ Trắng**   | Vài trăm ở mỗi vùng | Thành viên mới, mặt nạ gốm trắng trơn chưa khắc. Làm lính, đưa tin, canh gác   |
| 2   | **Mặt Nạ Khắc**    | Vài chục ở mỗi vùng | Đã khắc lời ước vào mặt nạ, dùng được Nguyện Cặn. Trong game là Pháp Sư Mặt Nạ |
| 3   | **Ngũ Diện**       | 5                   | Năm người cấp cao, mỗi người một chất liệu mặt nạ, phụ trách một vùng          |
| 4   | **Kẻ Gánh Nguyện** | 1                   | Thủ lĩnh. Không đeo mặt nạ, vì gương mặt anh đã nhẵn như sứ                    |

- **Tổ:** mỗi vùng có nhiều tổ nhỏ năm đến mười người, không biết mặt nhau.
- **Nhà Gánh:** những căn nhà bình thường làm nơi trú, thường là nhà người nghèo được hội giúp đỡ.
- **Tuyển người:** hội giúp người khốn khó (cho ăn, chữa bệnh, trả nợ), rồi hỏi họ: "Anh đã từng ước điều gì mà không ai nghe?"

### 2.5. Ngũ Diện

| #   | Danh hiệu           | Tên            | Vùng      | Tuổi | Nguyên tố                                     | Chương |
| --- | ------------------- | -------------- | --------- | ---- | --------------------------------------------- | ------ |
| 1   | **Mặt Nạ Gỗ**       | Lão Neo        | Đảo Lạc   | 61   | Không (người thường), dùng Nguyện Cặn hệ Thủy | 1      |
| 2   | **Mặt Nạ Giấy**     | Chỉ Diên       | Lũng Vân  | 34   | Người Tắt Sao, từng hệ Phong                  | 2      |
| 3   | **Mặt Nạ Sứ**       | Hisame Rei     | Shizukane | 40   | Không, dùng Nguyện Cặn hệ Băng                | 3      |
| 4   | **Mặt Nạ Đất Nung** | Darya Khakzad  | Golbaran  | 45   | Không, dùng Nguyện Cặn hệ Thổ                 | 4      |
| 5   | **Mặt Nạ Sáp**      | Aulus Cerarius | Marevia   | 38   | Không, dùng Nguyện Cặn hệ Hỏa                 | 5      |

#### 2.5.1. Mặt Nạ Gỗ: Lão Neo

- **Mặt nạ:** gỗ trôi dạt, mặn mùi biển, khắc nguệch ngoạc.
- **Quá khứ:** ngư dân Làng Vạn Lưới. Mười năm trước con trai ông chết đuối trong một cơn giông. Đêm Tết Sao Rơi năm đó, cả làng gõ trống ước "mong người đi biển trở về", nhưng không có sao nào trả lời. Ông đã nghe chuyện Bà Lưới từ bé và không thể tha thứ cho bầu trời.
- **Lời ước khắc trong mặt nạ:** "Trả con tôi về."
- **Tính cách:** cộc cằn, thương trẻ con, cực đoan nhất Ngũ Diện. Ông sẵn lòng thả Hắc Giao ra ngay.
- **Vai trò:** chỉ huy hội trên Đảo Lạc. Người lấy lõi sao của Bia Đông và Bia Tây năm NS 1347.
- **Kết cục gợi ý:** cuối Ch.1 bị bắt. Ở Ch.8, ông là người đầu tiên nghe lại được lời ước của con trai mình, vì cậu bé cũng từng ước "mong bố đừng buồn".

#### 2.5.2. Mặt Nạ Giấy: Chỉ Diên

- **Mặt nạ:** giấy bồi nhiều lớp từ những tờ giấy ước bị đốt dở, chữ cháy sém chồng lên nhau.
- **Quá khứ:** học sĩ nghèo, thi Phong Khảo bảy lần đều trượt vì giám khảo nhận tiền. Cô làm giả một tờ sổ để tố cáo việc đó, và vì sao Phong của cô (mang lời ước "mong lời nói được ghi đúng") bỏ cô. Thính Phong biết sự thật nhưng "chỉ đọc, không xử".
- **Lời ước khắc trong mặt nạ:** "Mong có ai đọc bài của tôi."
- **Tính cách:** sắc sảo, lạnh lùng bề ngoài, mềm bên trong. Người có lý lẽ thuyết phục nhất hội.
- **Vai trò:** người viết lý tưởng của hội, tuyển người ở Lũng Vân, gom giấy ước bị đốt về Thành Không Tên.
- **Kết cục gợi ý:** có thể quay về phe người chơi ở Ch.8. Là ứng viên tốt cho nhân vật chơi được trong tương lai (đề xuất, chưa quyết).

#### 2.5.3. Mặt Nạ Sứ: Hisame Rei

- **Mặt nạ:** sứ trắng mỏng như vỏ trứng, nứt một đường từ trán xuống cằm.
- **Tên:** Hisame (氷雨, "mưa băng"), Rei (零, "số không", cũng đọc là "linh"). Trong hội gọi ông là **Utsuro** ("trống rỗng").
- **Quá khứ:** Người Đọc Tuyết. Hai mươi năm trước ông đọc thấy trong hoa văn tuyết một lời cảnh báo tuyết lở, nhưng lời đó mơ hồ và Hội Đồng Bốn Mùa không tin ông. Làng ông bị vùi. Yukiyo biết, nhưng vì lời thề im lặng nên bà không nói rõ hơn.
- **Lời ước khắc trong mặt nạ:** "Mong bà ấy nói một lời thôi."
- **Tính cách:** trầm, lễ độ, đau khổ, cực kỳ kiên nhẫn. Ông không ghét Yukiyo, ông ghét lời thề của bà.
- **Vai trò:** giữ Vết Tuyết Lở, nghiên cứu cách dùng Nguyện Cặn để "ép" Trấn Tinh lên tiếng.
- **Kết cục gợi ý:** Ch.3 kết thúc khi Yukiyo phá lời thề để nói với ông một câu. Ông rời hội nhưng không quay lại Shizukane.

#### 2.5.4. Mặt Nạ Đất Nung: Darya Khakzad

- **Mặt nạ:** đất nung đỏ chưa tráng men, có dấu vân tay của người nặn.
- **Tên:** Darya (tiếng Ba Tư, "biển"), Khakzad (_khāk_ "đất" + _zād_ "sinh ra", tức "sinh từ đất").
- **Quá khứ:** Ab-dar của một ốc đảo nhỏ. Hội Đồng Giếng chuyển nước về thủ đô trong một năm hạn, ốc đảo của bà khô cạn, dân phải bỏ đi. Bà ước mưa suốt mười năm, không một trận mưa nào đến.
- **Lời ước khắc trong mặt nạ:** "Mong giếng nhà tôi có nước."
- **Tính cách:** thực tế, giỏi tổ chức, nghiêm khắc với người dưới, rất thương người không nhà. Ostad Khesht từng dựng nhà cho bà, và bà vẫn kính trọng ông.
- **Vai trò:** chịu trách nhiệm hậu cần của hội. Bà cho đào lệch một nhánh Kênh Ngầm Dài để tích Nguyện Cặn dưới sa mạc.
- **Kết cục gợi ý:** đầu hàng ở Ch.4 khi Ostad Khesht mở căn phòng "cho người giữ đảo" và trong đó có đủ chỗ cho cả làng bà.

#### 2.5.5. Mặt Nạ Sáp: Aulus Cerarius

- **Mặt nạ:** sáp ong trộn tím vỏ sò. Mặt nạ chảy khi nóng và đông lại thành hình khác, nên không ai nhớ ông trông thế nào.
- **Tên:** Aulus (tên riêng kiểu Latin), Cerarius (Latin, "thợ sáp").
- **Quá khứ:** học trò của Phường Lò Lớn, được xem là thợ rèn giỏi nhất thế hệ. Faber khen ông nhưng luôn nói "chưa đủ". Hai mươi năm ông chờ một vì sao, nhưng sao chọn những học trò kém hơn ông.
- **Lời ước khắc trong mặt nạ:** "Mong có ai nói 'đủ rồi'."
- **Tính cách:** kiêu hãnh, tài hoa, cay đắng, khao khát được công nhận.
- **Vai trò:** rèn **lõi sao giả** cho hội. Những lõi này hút ánh sao từ mạch sao thay vì nuôi Bia Đá. Đây là công cụ chính để thực hiện Đêm Không Sao.
- **Kết cục gợi ý:** Ch.5 kết thúc bằng trận đấu ở Đấu Trường Đá Trắng. Faber thừa nhận lỗi của mình. Ông có thể hy sinh lõi sao giả cuối cùng của mình để cứu Ardentia.

### 2.6. Kẻ Gánh Nguyện: Tô Khuyết

| Mục       | Nội dung                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Danh hiệu | **Kẻ Gánh Nguyện**: "người gánh những lời ước không ai nghe"               |
| Tên thật  | **Tô Khuyết**. "Khuyết" là thiếu, khuyết, như trăng khuyết [Hé lộ Ch.6]    |
| Tuổi thật | Khoảng 320 năm. Trông như người bốn mươi tuổi                              |
| Nguyên tố | Từng là Hộ Tinh hệ Thổ. Nay là Người Tắt Sao, dùng Nguyện Cặn của mọi hệ   |
| Gương mặt | Nhẵn như sứ, không còn đường nét. Vì vậy anh không cần mặt nạ              |
| Nơi ẩn    | Giữa các thị tộc du mục Khokhtal, trong một chiếc lều không ai nhớ đã dựng |

**Quá khứ:**

1. Thợ khắc trẻ của Đảo Lạc, một trong Năm Người Giữ Đảo. Khắc bốn Bia Đá cổ năm NS 1052.
2. Trong hang, anh ước Hà Thanh được sống. Không có sao nào trả lời, và nàng chết trong vòng tay anh. [Hé lộ Ch.6]
3. Năm NS 1061, anh tìm cách mở một phần phong ấn để đánh thức Bà Khơi. Vì sao của anh (mang lời ước "mong đảo bình yên") bỏ anh. Anh bị trục xuất. [Hé lộ Ch.2 là bị trục xuất, Hé lộ Ch.6 là lý do]
4. Anh sống ba trăm năm bằng cách uống Nguyện Cặn. Mỗi ngụm là nỗi buồn của một người lạ, và anh nhớ hết.
5. Khoảng NS 1180, anh lập Hội Mặt Nạ.

**Động cơ:** anh đã nghe hàng triệu lời ước chìm. Anh tin rằng cách duy nhất để những người đó được đền bù là **tắt bầu trời** để mọi lời ước về lại với người ước. Anh không muốn quyền lực. Anh muốn được ngừng nghe.

**Lời ước cả đời của anh:** mỗi đêm trong gần ba trăm năm, anh ước cùng một câu: **"Mong có một người nói được với sao thay cho những người không được chọn."**

**Tính cách:** điềm tĩnh, lịch sự, mệt mỏi, rất hiểu người khác. Anh không bao giờ nói dối. Anh tôn trọng Người Ước Nguyện ngay từ đầu.

---

## 3. Kế hoạch của Hội Mặt Nạ qua từng chương

| Chương | Vùng                | Hội Mặt Nạ làm gì                                                                  | Kết quả với người chơi                                                      | Hé lộ                                                                                         |
| ------ | ------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1      | Đảo Lạc             | Lão Neo dùng hai lõi sao lấy được để làm yếu phong ấn, kích Hắc Giao thức dậy      | Đánh Hắc Giao lần đầu, bắt Lão Neo. Biết hai Bia Đá mất lõi                 | Hắc Giao sinh từ Nguyện Cặn. Bà Lưới chỉ được trả lời một nửa                                 |
| 2      | Lũng Vân            | Chỉ Diên gom giấy ước bị đốt về Thành Không Tên để làm mặt nạ hàng loạt            | Đánh boss diều giấy. Thính Phong đọc lời cuối của người bị trục xuất        | Người bị trục xuất là Tô Khuyết. Đeo mặt nạ lâu thì quên mặt mình                             |
| 3      | Shizukane           | Hisame Rei dùng Nguyện Cặn ép Yukiyo lên tiếng ở Vết Tuyết Lở                      | Yukiyo phá lời thề nói một câu. Tuyết Lan hiểu vì sao sao của mình rơi lệch | Yukiyo và Aianga từng gây Tuyết Lở Lớn. Hoa văn tuyết ghi lại trận phong ấn                   |
| 4      | Golbaran            | Darya đào lệch kênh ngầm, tích Nguyện Cặn dưới sa mạc                              | Sửa kênh, Darya đầu hàng. Đọc sổ sao bằng gạch                              | Sao mới sinh ít dần từ NS 900. Người Đếm Sao biết điều này                                    |
| 5      | Marevia             | Aulus rèn lõi sao giả và cài vào mạch sao của mọi Bia Đá lớn                       | Faber rèn lõi thật cho Bia Đông và Bia Tây. Aulus thua ở Đấu Trường         | Lõi sao giả nối về một nơi ở thảo nguyên                                                      |
| 6      | Khokhtal            | Kẻ Gánh Nguyện chuẩn bị Đêm Không Sao, gặp Người Ước Nguyện lần đầu                | Đối đầu Tô Khuyết lần 1 và thua. Aianga kể khoảnh khắc anh mất niềm tin     | Tên thật Tô Khuyết, chuyện Hà Thanh, lý do thật của việc trục xuất                            |
| 7      | Purunae             | Hội tìm cách đốt rừng Sonamu để ông không thể dùng rễ cứu Bà Khơi                  | Bảo vệ rừng. Sonamu dùng rễ chạm tới Hắc Giao                               | Lõi Sao Cả dưới Hồ Gương. Hắc Giao gọi "Mẹ". Hắc Giao cảm thấy Người Ước Nguyện như tiếng gọi |
| 8      | Đảo Lạc và Tinh Hải | Đêm Không Sao bắt đầu. Các lõi sao giả hút ánh sao của bảy vùng, Hắc Giao trồi lên | Trận cuối và lựa chọn cuối                                                  | Toàn bộ bí mật cuối                                                                           |

---

## 4. Bí mật cuối cùng [Bí mật cuối]

1. **Hắc Giao là phần bị thương của Bà Khơi.** Giết nó thì bà chết.
2. **Người Ước Nguyện là câu trả lời cho lời ước của Tô Khuyết.** Gần ba trăm năm ước cùng một câu, theo Luật Chín Mươi Lời, đủ nặng để một sao cổ cuối cùng phải trả lời. Sao đó không chọn Tô Khuyết. Nó trả lời bằng cách **rơi xuống thành một con người** có khả năng nói với sao thay cho người khác. Đó là sao băng vàng rơi xuống Bãi Sao Rơi đầu năm NS 1350.
3. Vì vậy, **Đêm Không Sao cũng sẽ xóa Người Ước Nguyện**, bởi họ được làm từ ánh sao.
4. **Lối ra:** Người Ước Nguyện không tắt bầu trời. Họ dùng khả năng của mình để **đọc to** từng lời ước trong Hắc Giao cho người dân bảy vùng nghe. Mỗi lời ước có người nhận lại: người thân, con cháu, cả làng. Cộng đồng cùng gánh, Nguyện Cặn tan thành mưa rơi khắp bảy vùng (gợi lại Ngày Mưa Hoa của Golbaran). Bà Khơi tỉnh dậy.
5. **Tô Khuyết** thấy lời ước của mình đã được trả lời từ lâu mà anh không biết. Kết cục của anh để mở (xem \`10-cau-hoi-mo.md\`).

---

## 5. Thứ tự chương (tham chiếu cho mọi file)

| Chương      | Vùng                | Nhân vật dẫn đường gợi ý         |
| ----------- | ------------------- | -------------------------------- |
| Mở đầu và 1 | Đảo Lạc             | Lạc Hồng, Thủy Nguyệt, Thạch Sơn |
| 2           | Lũng Vân            | Bạch Vũ                          |
| 3           | Shizukane           | Tuyết Lan                        |
| 4           | Golbaran            | Hạ Vy (đoàn thuyền buôn)         |
| 5           | Marevia             | Thạch Sơn, Ngọc Thạch            |
| 6           | Khokhtal            | Lôi Đình                         |
| 7           | Purunae             | Thủy Nguyệt                      |
| 8           | Đảo Lạc và Tinh Hải | Cả đội                           |
`,us=`# 08. Vật phẩm và di vật

30 vật phẩm có câu chuyện, dùng cho mô tả vật phẩm trong game. Mỗi mô tả viết sẵn ở giọng văn hiển thị trong game (2–3 câu). Loại vật phẩm ghi theo lore, còn việc nó là vũ khí, Bảo Ấn, nguyên liệu hay vật phẩm nhiệm vụ do session thiết kế hệ thống quyết định.

Quy tắc viết mô tả vật phẩm:

- Câu đầu nói vật đó là gì. Câu sau kể một mảnh chuyện. Câu cuối (nếu có) để lại một câu hỏi hay một chi tiết lạ.
- Không ghi chỉ số trong mô tả.
- Không dùng từ tiếng Anh.

## 1. Vũ khí huyền thoại (10)

| #   | Tên                           | Loại     | Vùng      | Mô tả trong game                                                                                                                                                                                                 |
| --- | ----------------------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Thương Của Kiên**           | Thương   | Đảo Lạc   | Cây thương gỗ lim bịt đồng của người lập Quân Trấn Thủ. Đã ba trăm năm treo ở Trại Bắc, mũi thương vẫn ấm như vừa rút khỏi giông. Lính mới phải chạm tay vào nó trước khi nhận việc.                             |
| 2   | **Lưỡi Mây Aianga**           | Thương   | Khokhtal  | Ngọn thương Aianga trao cho người Đảo Lạc đầu tiên chạy kịp cơn giông của bà. Cán làm từ một ống đá sét dài, khi cầm thì nghe tiếng vó ngựa. Đây là thương của Lôi Đình.                                         |
| 3   | **Kiếm Hồng Điểu**            | Kiếm đơn | Đảo Lạc   | Thanh kiếm lưỡi cong nhẹ, chuôi khắc hình chim Lạc dang cánh. Dòng người giữ Đình truyền nó qua mười đời. Mỗi đời, cánh chim trên chuôi lại sáng thêm một chút.                                                  |
| 4   | **Cung Đỉnh Mây**             | Cung     | Đảo Lạc   | Cây cung làm từ một thân trúc mọc trên Đỉnh Vọng Vân, nơi gió thổi không ngừng. Người Đếm Sao dùng nó bắn tín hiệu giữa các đài. Dây cung rung khi có sao băng ở xa.                                             |
| 5   | **Băng Lan Nhất Thức**        | Kiếm đơn | Shizukane | Lưỡi kiếm rèn ở Xưởng Rèn Shimogane bằng thép trộn một mảnh sao rơi. Khi rút khỏi vỏ, hoa lan băng nở dọc sống kiếm rồi rụng xuống mà không tan. Kiếm này không phát ra tiếng khi chém.                          |
| 6   | **Đại Kiếm Đá Bia**           | Đại kiếm | Đảo Lạc   | Thanh đại kiếm đẽo từ một tấm bia vỡ trong Mùa Nước Đen. Trên lưỡi còn mờ mờ chín cái tên mà không ai đọc trọn. Thợ đá nói nó nặng bằng cả lời hứa của chín người.                                               |
| 7   | **Kiếm Không Tên Của Lò Lớn** | Kiếm đơn | Marevia   | Thanh kiếm hoàn hảo Faber rèn thời Trăm Bến, nguyên nhân của một cuộc chiến giữa hai thành. Ông cắm nó ngược trên đe trong Lò Lớn. Chưa ai rút được nó ra, kể cả ông.                                            |
| 8   | **Bút Gió**                   | Pháp khí | Lũng Vân  | Cây bút lông Thính Phong dùng chép sổ suốt nghìn năm. Ngòi bút làm từ lông đuôi của một con hạc đã sống ba trăm tuổi. Viết lời dối bằng bút này thì nét mực tự bay đi.                                           |
| 9   | **Cung Sừng Bảy Mùa**         | Cung     | Khokhtal  | Cung sừng ghép bảy lớp, mỗi lớp là sừng của một con dê núi ở một mùa cỏ khác nhau. Thợ làm mất bảy năm mới xong một cây. Người Cầm Cương đầu tiên dùng nó trong Hội Ba Môn.                                      |
| 10  | **Đuốc Đá Ostad**             | Pháp khí | Golbaran  | Ngọn đuốc bằng đất nung có khảm men xanh, ánh sáng của nó làm vữa đông nhanh gấp mười. Ostad Khesht cho mượn khi ai đó cần dựng nhà gấp trước cơn bão cát. Người mượn phải trả bằng một viên gạch khắc tên mình. |

## 2. Di vật (12)

| #   | Tên                         | Vùng      | Mô tả trong game                                                                                                                                                                     |
| --- | --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 11  | **Trống Của Ông Đúc Trống** | Đảo Lạc   | Chiếc trống đồng đầu tiên của Đảo Lạc, đặt giữa Đình Trống Đồng. Mặt trống có ngôi sao mười hai cánh và một vòng chim Lạc bay ngược chiều kim đồng hồ. Gõ một tiếng, cả đảo nghe.    |
| 12  | **Lưới Của Bà Lưới**        | Đảo Lạc   | Một mảnh lưới đánh cá đã mục, sợi nào cũng lấp lánh bụi sao. Người ta nói Bà Lưới đã đan nó trong mười đêm chờ con. Mắt lưới cuối cùng chưa được thắt.                               |
| 13  | **Đèn Nàng Vạn Đăng**       | Đảo Lạc   | Chiếc đèn lồng đầu tiên của Nàng Vạn Đăng, treo ở một góc hẻm trong Phố Cũ và chưa từng tắt. Giấy đèn đã vàng như lá khô mà không rách. Không ai thấy ai châm dầu cho nó.            |
| 14  | **Chuông Bạc Đền Trăng**    | Đảo Lạc   | Chiếc chuông bạc nhỏ của Người Giữ Đền Trăng. Tiếng chuông làm nước dịu lại và vết thương khép miệng. Mỗi đời người giữ đền khắc thêm một vòng trăng vào quai chuông.                |
| 15  | **Lõi Sao Bia Đông**        | Đảo Lạc   | Viên đá to bằng nắm tay, trong suốt, có một đốm sáng chuyển động như cá bơi. Đây là một trong bốn lõi giữ phong ấn Hắc Giao. Năm NS 1347 nó bị lấy đi khỏi bia.                      |
| 16  | **Đục Của Tô Khuyết**       | Đảo Lạc   | Chiếc đục đồng mòn vẹt, cán quấn dây mây. Bốn Bia Đá cổ được khắc bằng chính chiếc đục này. Phường Đá Ngọc cất nó trong hộp khóa ba lớp mà không nói vì sao.                         |
| 17  | **Mặt Nạ Gỗ Trôi**          | Đảo Lạc   | Mặt nạ gỗ trôi dạt của Lão Neo, mặt trong khắc nguệch ngoạc bốn chữ "Trả con tôi về". Áp tai vào gỗ nghe được tiếng sóng. Gỗ vẫn mặn dù đã phơi khô.                                 |
| 18  | **Chuông Không Quả Lắc**    | Shizukane | Chiếc chuông đồng không có quả lắc, lấy từ Cầu Kanehashi. Người Shizukane treo nó trước cửa để nhớ ba làng bị tuyết vùi. Có người nói nó đã kêu một lần, vào đêm Yukiyo thề im lặng. |
| 19  | **Gạch Tên Đầu Tiên**       | Golbaran  | Viên gạch bùn khô đầu tiên Ostad Khesht nhận làm lễ, khắc tên một người chủ nhà đã bị cát xóa mờ. Ông mang nó theo người suốt nghìn năm. Ông nói đó là ngôi nhà ông thích nhất.      |
| 20  | **Hạt Thông Đầu Tiên**      | Purunae   | Một hạt thông to bằng ngón tay cái, nâu bóng, nằm trong hộp gỗ của Vương triều Rễ. Đây là hạt đầu tiên rụng từ Sonamu. Nó chưa bao giờ nảy mầm, và người ta tin nó đang chờ.         |
| 21  | **Vòng Nguyệt Quế Đồng**    | Marevia   | Vòng nguyệt quế đúc bằng đồng, phần thưởng của Hội Tranh Tài Thợ năm Faber tự chấm mình hạng nhất. Ông chỉ đeo nó một ngày rồi tặng cho người thua. Người thua ấy là thợ Đảo Lạc.    |
| 22  | **Sợi Cương Giông**         | Khokhtal  | Một sợi dây cương bằng lông bờm ngựa giông, sờ vào tê tê như kiến bò. Người Cầm Cương được trao nó khi nhậm chức. Ai không bỏ cuộc giữa giông thì sợi dây không bao giờ đứt.         |

## 3. Sách cổ (8)

| #   | Tên                              | Vùng      | Mô tả trong game                                                                                                                                                                                                 |
| --- | -------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 23  | _**Mười Đêm Nước Đen**_          | Lũng Vân  | Sách Ông Lái Gió viết về Mùa Nước Đen và trận phong ấn Hắc Giao. Có một trang bị xé, đúng chỗ lẽ ra ghi tên một trong Năm Người Giữ Đảo. Bản chép tay ở Các Nghe Gió còn nguyên trang ấy.                        |
| 24  | _**Sổ Sao Thứ Nhất**_            | Đảo Lạc   | Cuốn sổ của Bà Đầu Sổ Thứ Nhất, chép tên sáu nghìn vì sao bằng mực pha bụi sao. Đọc dưới trăng thì những cái tên phát sáng. Mấy trang cuối ghi số sao mới mỗi năm, và con số giảm dần.                           |
| 25  | _**Bài Ru Bà Hiên**_             | Đảo Lạc   | Tập bài hát ru Bà Khơi do Bà Cả đầu tiên của Hội Đền Trăng viết. Trẻ con trên đảo thuộc lòng bài đầu mà không biết nó dành cho ai. Bài cuối cùng chưa ai từng hát.                                               |
| 26  | _**Sách Đá Của Phường**_         | Đảo Lạc   | Không phải sách giấy mà là mười hai phiến đá mỏng xâu dây đồng, ghi cách khắc Bia Đá và cách giữ lõi sao. Phiến thứ mười hai bị đục xóa. Người xóa dùng đúng nét đục của người viết.                             |
| 27  | _**Hoa Văn Tuyết Năm Phong Ấn**_ | Shizukane | Bản chép của Người Đọc Tuyết về những gì Yukiyo thấy năm NS 1052, vẽ bằng mực chàm trên giấy trắng. Nhìn lâu thì hoa văn như chuyển động. Ở góc cuối có một hoa văn chưa ai đọc được, giống chữ "xin lỗi".       |
| 28  | _**Sổ Gạch Ngôi Sao**_           | Golbaran  | Bản sao sổ sao của Người Đếm Sao, khắc trên ba trăm viên gạch men xanh trong Thành Tháp Gió. Ostad Khesht cho chép vì "giấy thì cháy, gạch thì không". Viên gạch cuối ghi năm NS 900 và một con số bị gạch chéo. |
| 29  | _**Luật Trăm Đuốc**_             | Marevia   | Bộ luật của cộng hòa Marevia, viết trên da và đọc to mỗi năm ở Quảng Trường Đuốc. Điều đầu tiên ghi: "Lửa là của người làm ra nó." Faber viết chú thích bên lề: "Ta đồng ý."                                     |
| 30  | _**Thư Của Người Gánh Nguyện**_  | Không rõ  | Một bức thư không ký tên, mực đã nhạt, gửi "người sẽ đến sau". Trong thư chỉ có một lời ước được viết lại hàng nghìn lần bằng một nét chữ đều tăm tắp. Ở dòng cuối, nét chữ run lên.                             |

Ghi chú: món 30 là đầu mối cho bí mật cuối (xem \`07-hac-giao-va-hoi-mat-na.md\` mục 4). Chỉ cho người chơi nhặt ở chương 6 trở đi.

## 4. Câu chuyện cho vật phẩm 3★ hiện có

Vật phẩm 3★ trong \`content/config.yaml\` (\`items3\`) là "mảnh sao vỡ mang theo đồ cũ" (xem \`01-vu-tru-va-sao.md\` mục 4.2). Gợi ý mô tả ngắn:

| Tên hiện có    | Gợi ý mô tả                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| Kiếm Sắt Cũ    | Thanh kiếm của một người lính vô danh thời Nước Đen. Sắt đã xỉn, nhưng lưỡi vẫn sắc.                       |
| Cung Tre       | Cung tre của một đứa trẻ làng chài, dây cung là sợi gai bện. Nó từng bắn trúng một con cò và khóc cả ngày. |
| Sách Phép Rách | Nửa cuốn sách học phép của một Hộ Tinh già. Nửa còn lại chắc đang nằm dưới một vì sao nào đó.              |
| Thương Gỗ      | Cây thương tập của dân binh Đảo Lạc. Cán gỗ đầy vết tay của nhiều thế hệ.                                  |
| Ngọc Vỡ        | Mảnh ngọc bích từ Mỏ Ngọc Lòng Chảo, vỡ khi rơi theo sao băng. Một mặt vẫn còn hoa văn khắc dở.            |
| Bùa Giấy       | Lá bùa giấy dó viết một lời ước nhỏ: "mong mai trời nắng". Có vẻ hôm đó trời đã nắng.                      |
| Đại Kiếm Gỉ    | Đại kiếm đã gỉ của một thợ đá kiêm lính canh. Ông dùng nó để chặt đá nhiều hơn là đánh nhau.               |
`,ms=`# 09. Từ điển tên riêng và thuật ngữ

Toàn bộ tên riêng và thuật ngữ trong \`docs/world/\`, sắp theo thứ tự chữ cái tiếng Việt (a, ă, â, b, c, d, đ, e, ê...). Dấu thanh không ảnh hưởng thứ tự chữ cái. Tên nước ngoài xếp theo chữ Latin.

Loại: Thuật ngữ, Danh hiệu, Vùng, Địa danh, Trấn Tinh, Nhân vật (gồm cả NPC), Huyền thoại (nhân vật trong lịch sử thế giới), Phe, Chức vị, Phản diện, Quái, Nguyên tố, Phản ứng, Vật phẩm, Lễ hội, Thời kỳ, Sự kiện, Biệt danh.

Tên trong bảng là tên đang dùng. Tên cũ đã đổi có ghi chú ở định nghĩa. Các vật phẩm có tên riêng xem đầy đủ ở \`08-vat-pham-va-di-vat.md\`, chỉ những món được nhắc ở file khác mới có ở đây. Địa danh ngoài Đảo Lạc chỉ ghi thủ đô và nơi quan trọng, danh sách đầy đủ ở \`03-dia-ly.md\`.

## A

| Tên                | Loại      | Định nghĩa                                                                                |
| ------------------ | --------- | ----------------------------------------------------------------------------------------- |
| **Ab-dar**         | Chức vị   | Người giữ nước của một ốc đảo ở Golbaran, thành viên Hội Đồng Giếng.                      |
| **Ab-dar Bozorg**  | Chức vị   | Người Giữ Nước Lớn, đứng đầu Hội Đồng Giếng, nhiệm kỳ bảy năm.                            |
| **Aianga**         | Trấn Tinh | Trấn Tinh hệ Lôi của Khokhtal, một đàn ngựa giông, thích đua tranh. Tiếng Mông Cổ: "sấm". |
| **Ardentia**       | Địa danh  | Thủ đô Marevia trên bảy ngọn đồi sát biển, "Thành Rực".                                   |
| **Aulus Cerarius** | Nhân vật  | Mặt Nạ Sáp, thợ rèn Marevia, người rèn lõi sao giả cho Hội Mặt Nạ.                        |

## B

| Tên                                     | Loại        | Định nghĩa                                                                               |
| --------------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| **Bà Bảy Sóng**                         | Nhân vật    | Thuyền trưởng, lãnh đạo Đoàn Thuyền Buôn Gió Nồm, dì của Hạ Vy.                          |
| **Bà Cả Thu Vọng**                      | Nhân vật    | Lãnh đạo Hội Đền Trăng, Hộ Tinh hệ Thủy đã yếu.                                          |
| **Bà Đầu Sổ Thứ Nhất**                  | Huyền thoại | Người lập sổ sao của Người Đếm Sao, chép tên sáu nghìn vì sao.                           |
| **Bà Hiên**                             | Huyền thoại | Bà Cả đầu tiên của Hội Đền Trăng, tác giả những bài hát ru Bà Khơi.                      |
| **Bà Khơi**                             | Trấn Tinh   | Trấn Tinh hệ Thủy của Đảo Lạc, ngủ dưới đáy Hồ Gương từ NS 1052.                         |
| **Bà Lưới**                             | Huyền thoại | Hộ Tinh đầu tiên, người đàn bà làng chài được sao chọn năm NS 1, mốc của lịch Niên Sao.  |
| **Bà Trùm Kha**                         | Nhân vật    | Lãnh đạo Phường Đá Ngọc, thợ khắc giỏi nhất thế hệ mình.                                 |
| **Bạch Vũ**                             | Nhân vật    | Hộ Tinh hệ Phong 4★, người Lũng Vân, hộ tống thuê của Đoàn Thuyền Buôn Gió Nồm.          |
| **Bãi Sao Rơi**                         | Địa danh    | Bãi cát đen lấp lánh ở mũi nam Đảo Lạc, nơi Người Ước Nguyện tỉnh dậy.                   |
| **Bảo Ấn**                              | Thuật ngữ   | Trang bị phụ: con ấn khắc giữ một mảnh sao nhỏ của người xưa.                            |
| **Bảy Vết Rơi**                         | Địa danh    | Bảy nơi bảy Trấn Tinh chạm đất, mỗi vùng một nơi (Vịnh Khơi, Giếng Đầu, Miệng Lò...).    |
| **Băng**                                | Nguyên tố   | Tính khí tiết chế và lắng nghe. Gắn Shizukane và Yukiyo.                                 |
| **Bến Sông Sương**                      | Địa danh    | Bến sông cạnh Làng Vạn Lưới, nơi Sương Mai luyện kiếm.                                   |
| **Bia Đá**                              | Thuật ngữ   | Bia khắc tên người giữ đất. Hồi phục Hộ Tinh, nối với nhau bằng mạch sao để dịch chuyển. |
| **Bia Đông, Bia Tây, Bia Nam, Bia Bắc** | Địa danh    | Bốn Bia Đá cổ do Tô Khuyết khắc quanh Hang Hắc Giao, neo phong ấn.                       |
| **Biển Lặng**                           | Thuật ngữ   | Tầng dưới đáy mọi đại dương, nơi lời ước không thành chìm xuống.                         |
| **Biển Trăm Bến**                       | Địa danh    | Biển trong lớn giữa các vùng, Đảo Lạc nằm ở giữa.                                        |
| **Bọ Hung Men**                         | Quái        | Bọ hung lưng ốp gạch men ở Golbaran. Thổ.                                                |
| **Bóng Cặn**                            | Quái        | Mảnh Nguyện Cặn hình người, lặp lại một lời ước không thành. Thủy.                       |
| **Bộ Ấn**                               | Thuật ngữ   | Nhóm Bảo Ấn cùng xưởng, cùng câu chuyện, cộng thêm sức mạnh khi đi cùng nhau.            |
| **Bốc Hơi**                             | Phản ứng    | Hỏa gặp Thủy: lửa đốt ký ức của nước thành hơi.                                          |
| **Bùa Giấy**                            | Vật phẩm    | Vật phẩm 3★, lá bùa ghi lời ước nhỏ "mong mai trời nắng".                                |

## C

| Tên                           | Loại        | Định nghĩa                                                                       |
| ----------------------------- | ----------- | -------------------------------------------------------------------------------- |
| **Các Nghe Gió**              | Địa danh    | Tháp giấy chín tầng ở Lũng Vân, nơi Thính Phong ở và chép sổ.                    |
| **Cao Lũy**                   | Nhân vật    | Quan Trấn Thủ, lãnh đạo Quân Trấn Thủ.                                           |
| **Chỉ Diên**                  | Nhân vật    | Mặt Nạ Giấy, học sĩ Lũng Vân, Người Tắt Sao, người viết lý tưởng của Hội Mặt Nạ. |
| **Chưởng Bút**                | Chức vị     | Người đứng đầu Hội Đồng Bút của Lũng Vân.                                        |
| **Cô Gieo**                   | Huyền thoại | Người đầu tiên gieo lúa nước ở Đảo Lạc, được Bà Khơi dạy dẫn nước.               |
| **Cụ Trưởng Đình Đoan Khang** | Nhân vật    | Đứng đầu Hội Đồng Đình Trống, 81 tuổi.                                           |
| **Cú Tuyết Lặng**             | Quái        | Cú trắng săn đêm ở Shizukane, tấn công thứ gây ồn. Băng.                         |
| **Cua Mai Đồng**              | Quái        | Cua đá mai dính mảnh trống đồng, sống ở bờ biển Đảo Lạc. Thủy.                   |

## D

| Tên               | Loại     | Định nghĩa                                                          |
| ----------------- | -------- | ------------------------------------------------------------------- |
| **Darya Khakzad** | Nhân vật | Mặt Nạ Đất Nung, cựu Ab-dar Golbaran, phụ trách hậu cần Hội Mặt Nạ. |
| **Dasom**         | Nhân vật | Nữ Vương hiện tại của Purunae, 24 tuổi.                             |
| **Diều Hoang**    | Quái     | Diều ước bị đốt dở sống dậy ở Lũng Vân. Phong.                      |

## Đ

| Tên                                                   | Loại      | Định nghĩa                                                                              |
| ----------------------------------------------------- | --------- | --------------------------------------------------------------------------------------- |
| **Đá Sao**                                            | Thuật ngữ | Ánh sao nguội đông lại. Người Ước Nguyện đốt nó để ước nguyện. Không mua bán công khai. |
| **Đại Bàng Mây Dông**                                 | Quái      | Tinh anh hệ Lôi ở Khokhtal, đại bàng làm tổ trong mây dông.                             |
| **Đài Đếm Sao**                                       | Địa danh  | Trụ sở Người Đếm Sao trên Đỉnh Vọng Vân.                                                |
| **Đảo Lạc**                                           | Vùng      | Vùng khởi đầu, cảm hứng Việt Nam, hệ Thủy, Trấn Tinh Bà Khơi.                           |
| **Đầu Sổ Kỳ Lam**                                     | Nhân vật  | Lãnh đạo Người Đếm Sao, che mắt bằng lụa đen, thân phận bí ẩn.                          |
| **Đêm Không Sao**                                     | Thuật ngữ | Kế hoạch của Hội Mặt Nạ: tắt mọi vì sao để lời ước chìm trở về người ước.               |
| **Đêm Ru Bà**                                         | Lễ hội    | Mỗi rằm, dân Đảo Lạc hát ru Bà Khơi bên Hồ Gương.                                       |
| **Đền Trăng**                                         | Địa danh  | Đền mái cong bên Hồ Gương, trụ sở Hội Đền Trăng.                                        |
| **Điện Cảm**                                          | Phản ứng  | Thủy gặp Lôi: nước dẫn sấm đi khắp nơi.                                                 |
| **Đình Trống Đồng**                                   | Địa danh  | Ngôi đình cổ nhất Đảo Lạc ở Phố Vạn Đăng, trụ sở Hội Đồng Đình Trống.                   |
| **Đỉnh Vọng Vân**                                     | Địa danh  | Đỉnh núi cao nhất Đảo Lạc, nơi Phong Vân lớn lên.                                       |
| **Đoàn Thuyền Buôn Gió Nồm**                          | Phe       | Đoàn thương thuyền lâu đời nhất Biển Trăm Bến, lập khoảng NS 520.                       |
| **Đom Đóm, Đèn Lồng, Ngọn Đuốc, Vầng Trăng, Sao Mai** | Thuật ngữ | Năm cấp danh vọng của Hộ Tinh, từ thấp tới cao.                                         |
| **Đom Đóm Lạc Lối**                                   | Quái      | Bầy đom đóm bị lời ước "mong được về nhà" bám vào. Lôi.                                 |
| **Đóng Băng**                                         | Phản ứng  | Thủy gặp Băng: nước dừng lại để lắng nghe.                                              |
| **Đội Giông**                                         | Phe       | Đội Hộ Tinh của Quân Trấn Thủ, đội trưởng Lôi Đình.                                     |
| **Đồi Ông Thông**                                     | Địa danh  | Đồi giữa Solgol nơi Sonamu đứng.                                                        |
| **Đội Săn Đêm**                                       | Phe       | Đội trinh sát và đặt bẫy của Quân Trấn Thủ, có Minh Khải.                               |
| **Đường Cát**                                         | Địa danh  | Đường buôn trên bộ nối Lũng Vân và Golbaran.                                            |
| **Đường Đua Giông**                                   | Địa danh  | Đồng cỏ ở Khokhtal nơi người ta đua với Aianga.                                         |

## F

| Tên       | Loại      | Định nghĩa                                                                  |
| --------- | --------- | --------------------------------------------------------------------------- |
| **Faber** | Trấn Tinh | Trấn Tinh hệ Hỏa của Marevia, thợ rèn từ chối được thờ. Latin: "người thợ". |

## G

| Tên                  | Loại | Định nghĩa                                                                    |
| -------------------- | ---- | ----------------------------------------------------------------------------- |
| **Giáp Băng Vô Chủ** | Quái | Tinh anh hệ Băng ở Shizukane, áo giáp người chết trong Tuyết Lở Lớn.          |
| **Giọt Nhầy**        | Quái | Quái \`slime\` (trước đây hiển thị "Slime"): hạt nguyện đông lại trên đất ẩm.   |
| **Golbaran**         | Vùng | Vùng cảm hứng Ba Tư và Trung Đông, hệ Thổ, Trấn Tinh Ostad Khesht. "Mưa hoa". |

## H

| Tên                         | Loại        | Định nghĩa                                                                    |
| --------------------------- | ----------- | ----------------------------------------------------------------------------- |
| **Hà Thanh**                | Huyền thoại | Một trong Năm Người Giữ Đảo, cung thủ hệ Băng, hy sinh trong Hang Hắc Giao.   |
| **Hạ Vy**                   | Nhân vật    | Hộ Tinh hệ Băng 4★, cung thủ canh thuyền của Đoàn Thuyền Buôn Gió Nồm.        |
| **Hạc Mực**                 | Quái        | Hạc lông đen ở Lũng Vân, mổ người nói dối. Phong.                             |
| **Hải Đăng Mắt Cá**         | Địa danh    | Ngọn hải đăng cũ đã tắt ở mũi tây Đảo Lạc, di tích Thời Trăm Bến.             |
| **Hang Hắc Giao**           | Địa danh    | Hang dưới núi phía bắc Đảo Lạc, nơi phong ấn Hắc Giao.                        |
| **Hạt nguyện**              | Thuật ngữ   | Đốm sáng nhỏ do một lời ước tạo ra, bay lên Tinh Hải.                         |
| **Hắc Giao**                | Phản diện   | Con giao đen sinh từ Nguyện Cặn, bị phong ấn năm NS 1052.                     |
| **Hisame Rei**              | Nhân vật    | Mặt Nạ Sứ, cựu Người Đọc Tuyết ở Shizukane, trong hội gọi là Utsuro.          |
| **Hỏa**                     | Nguyên tố   | Tính khí ý chí làm ra. Gắn Marevia và Faber.                                  |
| **Hồ Gương**                | Địa danh    | Hồ tròn giữa Đảo Lạc, vết rơi của Sao Cả, nơi Bà Khơi ngủ.                    |
| **Hổ Rêu**                  | Quái        | Tinh anh hệ Mộc ở Purunae, hổ già giữ rừng, không ác.                         |
| **Hộ Tinh**                 | Thuật ngữ   | Người được một vì sao chọn và bảo hộ, mang Tinh Văn và sức mạnh nguyên tố.    |
| **Hộ Vệ Đá Cổ**             | Quái        | Tinh anh hệ Thổ, tượng đá Tô Khuyết khắc để canh Hang Hắc Giao.               |
| **Hội Bất Nguyện**          | Phe         | Tên chính thức của Hội Mặt Nạ.                                                |
| **Hội Đền Trăng**           | Phe         | Hội trông giữ giấc ngủ Bà Khơi, lập năm NS 1057.                              |
| **Hội Đồng Bốn Mùa**        | Phe         | Chính quyền Shizukane: bốn họ nghề luân phiên cầm quyền theo mùa.             |
| **Hội Đồng Bút**            | Phe         | Chính quyền Lũng Vân: chín học sĩ đỗ đầu kỳ thi Phong Khảo.                   |
| **Hội Đồng Đình Trống**     | Phe         | Chính quyền Đảo Lạc: mười hai bô lão và đại diện các phường, lập năm NS 1055. |
| **Hội Đồng Giếng**          | Phe         | Chính quyền Golbaran: hội đồng những người giữ nước.                          |
| **Hội Đồng Trăm Đuốc**      | Phe         | Chính quyền cộng hòa Marevia, bầu Song Chấp Chính.                            |
| **Hội Đua Thuyền Vạn Lưới** | Lễ hội      | Rằm tháng Cá Chép, các làng chài đua thuyền trên cửa Sông Sương.              |
| **Hội Lửa Trại Lớn**        | Phe         | Đại hội thị tộc Khokhtal bảy năm một lần, bầu Người Cầm Cương.                |
| **Hội Mặt Nạ**              | Phe         | Tổ chức phản diện của những người chưa được sao chọn, do Kẻ Gánh Nguyện lập.  |
| **Hội Vạn Đăng**            | Lễ hội      | Rằm tháng Đèn Lồng, thả đèn trên sông tưởng Nàng Vạn Đăng.                    |

## K

| Tên                | Loại        | Định nghĩa                                                               |
| ------------------ | ----------- | ------------------------------------------------------------------------ |
| **Kẻ Gánh Nguyện** | Chức vị     | Thủ lĩnh Hội Mặt Nạ. Tên thật là Tô Khuyết.                              |
| **Kênh Ngầm Dài**  | Địa danh    | Hệ thống kênh ngầm của Golbaran. Một nhánh bị Mặt Nạ Đất Nung đào lệch.  |
| **Kết Tinh**       | Phản ứng    | Thổ gặp nguyên tố khác: đất bọc tính khí thành tinh thể làm khiên.       |
| **Khai Tinh**      | Thuật ngữ   | Đột phá giới hạn cấp: mở thêm một lớp sáng bị khóa trong Tinh Văn.       |
| **Khokhtal**       | Vùng        | Vùng cảm hứng thảo nguyên, hệ Lôi, Trấn Tinh Aianga. "Thảo nguyên xanh". |
| **Khuếch Tán**     | Phản ứng    | Phong gặp nguyên tố khác: gió mang tính khí kia đi xa.                   |
| **Kiên**           | Huyền thoại | Một trong Năm Người Giữ Đảo, hệ Lôi, người lập Quân Trấn Thủ.            |
| **Kỳ Đà Lửa**      | Quái        | Thằn lằn ăn tro lò rèn ở Marevia. Hỏa.                                   |

## L

| Tên                    | Loại      | Định nghĩa                                                                                       |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| **Lạc Hồng**           | Nhân vật  | Hộ Tinh hệ Hỏa 5★, kiếm sĩ giữ Đình của Hội Đồng Đình Trống.                                     |
| **Làng Chìm**          | Địa danh  | Ba làng chìm ở Vịnh Khơi trong Mùa Nước Đen năm NS 1046.                                         |
| **Làng Vạn Lưới**      | Địa danh  | Làng chài lớn nhất Đảo Lạc, bên cửa Sông Sương.                                                  |
| **Lão Neo**            | Nhân vật  | Mặt Nạ Gỗ, ngư dân Làng Vạn Lưới, chỉ huy Hội Mặt Nạ ở Đảo Lạc.                                  |
| **Lễ Nhớ Ba Làng**     | Lễ hội    | Rằm tháng Lưới, thả hoa ở Vịnh Khơi tưởng nhớ ba làng chìm.                                      |
| **Lính Mặt Nạ Trắng**  | Quái      | Thành viên mới của Hội Mặt Nạ, đánh gần.                                                         |
| **Lò Lớn**             | Địa danh  | Xưởng rèn của Faber trong lòng Mons Fornax.                                                      |
| **Lõi sao**            | Thuật ngữ | Viên đá giữ ánh sao trong Bia Đá. Bia Đông và Bia Tây mất lõi năm NS 1347.                       |
| **Lõi sao giả**        | Thuật ngữ | Lõi do Mặt Nạ Sáp rèn, hút ánh sao khỏi mạch sao. Công cụ của Đêm Không Sao.                     |
| **Lòng Sao**           | Thuật ngữ | Bí cảnh lấy nguyên liệu: khoảng đất bị sao rơi cuốn vào lòng mình. Trước đây gọi là Động Thiên.  |
| **Lôi**                | Nguyên tố | Tính khí khoảnh khắc quyết định. Gắn Khokhtal và Aianga.                                         |
| **Lôi Đình**           | Nhân vật  | Hộ Tinh hệ Lôi 5★, Đội trưởng Đội Giông của Quân Trấn Thủ, danh hiệu "Ngọn Thương Gọi Sấm".      |
| **Luật Chín Mươi Lời** | Thuật ngữ | Câu dân gian: chín mươi lời cùng một ý thì sao cổ phải trả lời. Lý do của Bảo Hộ Vận Sao 90 lần. |
| **Lũng Vân**           | Vùng      | Vùng cảm hứng Trung Hoa cổ, hệ Phong, Trấn Tinh Thính Phong. "Thung lũng mây".                   |

## M

| Tên                   | Loại      | Định nghĩa                                                                                                                          |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Mạch sao**          | Thuật ngữ | Dòng ánh sao ngầm dưới đất nối các Bia Đá và Tháp Tinh Tú.                                                                          |
| **Mai Linh**          | Nhân vật  | Hộ Tinh hệ Hỏa 4★, cô bé làm đèn ở Phố Cũ, thuộc Hội Đồng Đình Trống.                                                               |
| **Marevia**           | Vùng      | Vùng cảm hứng La Mã và Địa Trung Hải, hệ Hỏa, Trấn Tinh Faber. "Đường biển".                                                        |
| **Mặt Nạ Khắc**       | Chức vị   | Bậc 2 của Hội Mặt Nạ, đã khắc lời ước vào mặt nạ, dùng được Nguyện Cặn.                                                             |
| **Mặt Nạ Trắng**      | Chức vị   | Bậc 1 của Hội Mặt Nạ, thành viên mới.                                                                                               |
| **Minashahr**         | Địa danh  | Thủ đô Golbaran, "Thành Men Xanh".                                                                                                  |
| **Minh Khải**         | Nhân vật  | Hộ Tinh hệ Lôi 4★, thợ săn Đội Săn Đêm của Quân Trấn Thủ.                                                                           |
| **Mỏ Ngọc Lòng Chảo** | Địa danh  | Mỏ ngọc bích phía bắc Đảo Lạc, nơi Phường Đá Ngọc khai thác.                                                                        |
| **Mons Fornax**       | Địa danh  | Núi lửa sau Ardentia, nơi Faber có Lò Lớn.                                                                                          |
| **Mộc**               | Nguyên tố | Tính khí sinh trưởng và nối tiếp. Gắn Purunae và Sonamu. Sẽ thêm vào game sau.                                                      |
| **Mùa Nước Đen**      | Sự kiện   | Trận triều đen kéo dài sáu năm khi Hắc Giao trồi lên, từ NS 1046.                                                                   |
| **Mười hai chòm sao** | Thuật ngữ | Trống, Diều, Lúa, Cá Chép, Thuyền, Đèn Lồng, Hạc, Gương, Chuông, Lưới, Rìu, Đuốc. Tên mười hai tháng và mười hai tầng Tháp Tinh Tú. |

## N

| Tên                     | Loại        | Định nghĩa                                                                                                     |
| ----------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| **Nàng Vạn Đăng**       | Huyền thoại | Một trong Năm Người Giữ Đảo, hệ Hỏa, dẫn dân chạy lũ bằng đèn.                                                 |
| **Năm Người Giữ Đảo**   | Huyền thoại | Năm Hộ Tinh cùng Bà Khơi phong ấn Hắc Giao năm NS 1052: Tô Khuyết, Nàng Vạn Đăng, Ông Lái Gió, Hà Thanh, Kiên. |
| **Nấm Đèn**             | Quái        | Nấm phát sáng mọc trên rễ Sonamu. Mộc.                                                                         |
| **Nét Sao**             | Thuật ngữ   | N0 đến N6: số nét Tinh Văn đã thêm khi vì sao trả lời lại. Trước đây gọi là Cung mệnh (C0–C6).                 |
| **Ngọc Thạch**          | Nhân vật    | Hộ Tinh hệ Thổ 4★, con gái thợ mỏ, học việc ở Phường Đá Ngọc.                                                  |
| **Ngọn Thương Gọi Sấm** | Danh hiệu   | Danh hiệu của Lôi Đình (trước đây là "Tướng Quân Giông Tố").                                                   |
| **Ngũ Diện**            | Chức vị     | Năm thành viên cấp cao của Hội Mặt Nạ: Mặt Nạ Gỗ, Giấy, Sứ, Đất Nung, Sáp.                                     |
| **Nguyện Cặn**          | Thuật ngữ   | Bùn đen của những lời ước không ai nghe, lắng dưới Biển Lặng.                                                  |
| **Người Cầm Cương**     | Chức vị     | Lãnh đạo toàn Khokhtal, do Hội Lửa Trại Lớn bầu.                                                               |
| **Người Đếm Sao**       | Phe         | Hội trung lập ghi chép sao, có mặt ở mọi vùng, lập khoảng NS 610.                                              |
| **Người Đọc Tuyết**     | Chức vị     | Nghề ở Shizukane, đọc và chép lời Yukiyo trong hoa văn tuyết.                                                  |
| **Người Gọi Sao**       | Biệt danh   | Biệt danh của Người Ước Nguyện trong lời thoại.                                                                |
| **Người Tắt Sao**       | Thuật ngữ   | Hộ Tinh bị vì sao bỏ đi, Tinh Văn đã tắt.                                                                      |
| **Người Ước Nguyện**    | Thuật ngữ   | Nhân vật chính, người có lời ước được Tinh Hải nghe ngay.                                                      |
| **Nhà Chưa Xong**       | Địa danh    | Cung điện Ostad Khesht xây mãi ở Minashahr, mỗi ngày thêm một phòng cho người không nhà.                       |
| **Niên Sao (NS)**       | Thuật ngữ   | Lịch chung, tính từ năm Bà Lưới được chọn. Hiện tại NS 1350.                                                   |
| **Nüüdel Ordu**         | Địa danh    | Thủ đô di động của Khokhtal, "Đại Trại Di Động".                                                               |

## O

| Tên              | Loại      | Định nghĩa                                                                     |
| ---------------- | --------- | ------------------------------------------------------------------------------ |
| **Ostad Khesht** | Trấn Tinh | Trấn Tinh hệ Thổ của Golbaran, ông thợ xây vui tính. Tiếng Ba Tư: "thầy gạch". |

## Ô

| Tên                                                                      | Loại        | Định nghĩa                                                                             |
| ------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------------------- |
| **Ông Đúc Trống**                                                        | Huyền thoại | Người đúc chiếc trống đồng đầu tiên của Đảo Lạc.                                       |
| **Ông Lái Gió**                                                          | Huyền thoại | Một trong Năm Người Giữ Đảo, hệ Phong, người Lũng Vân, tác giả sách Mười Đêm Nước Đen. |
| **Ông Mười Buồm**                                                        | Huyền thoại | Người lập Đoàn Thuyền Buôn Gió Nồm.                                                    |
| **Ông Thông, Thầy Gạch, Thầy Thợ Lửa, Nàng Sấm, Ông Nghe, Bà Đêm Tuyết** | Biệt danh   | Cách dân gian gọi Sonamu, Ostad Khesht, Faber, Aianga, Thính Phong, Yukiyo.            |

## P

| Tên                | Loại      | Định nghĩa                                                                               |
| ------------------ | --------- | ---------------------------------------------------------------------------------------- |
| **Pháp Sư Mặt Nạ** | Quái      | Thành viên bậc Mặt Nạ Khắc của Hội Mặt Nạ, dùng phép Nguyện Cặn.                         |
| **Phong**          | Nguyên tố | Tính khí truyền tin và lời nói. Gắn Lũng Vân và Thính Phong.                             |
| **Phong Khảo**     | Sự kiện   | Kỳ thi ba năm một lần ở Lũng Vân để chọn Hội Đồng Bút.                                   |
| **Phong Vân**      | Nhân vật  | Hộ Tinh hệ Phong 5★, cung thủ của Người Đếm Sao trên Đỉnh Vọng Vân.                      |
| **Phố Cũ**         | Địa danh  | Phố trên đồi sau Phố Vạn Đăng, nền phố dựng tạm thời Nước Đen. Có hàng đèn của Mai Linh. |
| **Phố Vạn Đăng**   | Địa danh  | Thủ phủ Đảo Lạc, phố cảng treo hàng nghìn đèn lồng.                                      |
| **Phường Đá Ngọc** | Phe       | Phường thợ đá, thợ khắc, thợ mỏ của Đảo Lạc, lập năm NS 1068, giữ bốn Bia Đá cổ.         |
| **Purunae**        | Vùng      | Vùng cảm hứng Hàn Quốc, hệ Mộc, Trấn Tinh Sonamu. "Suối xanh".                           |

## Q

| Tên               | Loại     | Định nghĩa                                          |
| ----------------- | -------- | --------------------------------------------------- |
| **Quá Tải**       | Phản ứng | Hỏa gặp Lôi: hai tính khí nóng vội cùng bùng nổ.    |
| **Quân Trấn Thủ** | Phe      | Lực lượng giữ Đảo Lạc, có Đội Giông và Đội Săn Đêm. |

## R

| Tên               | Loại     | Định nghĩa                                     |
| ----------------- | -------- | ---------------------------------------------- |
| **Rắn Cát Kính**  | Quái     | Rắn vảy thủy tinh sống dưới cát Golbaran. Thổ. |
| **Rừng Trúc Mây** | Địa danh | Rừng trúc phía tây Đảo Lạc, nơi Yêu Rừng sống. |

## S

| Tên                 | Loại        | Định nghĩa                                                                           |
| ------------------- | ----------- | ------------------------------------------------------------------------------------ |
| **Sao Cả**          | Huyền thoại | Ngôi sao đầu tiên, tự rơi xuống Biển Lặng và tạo ra đất liền. Lõi nằm dưới Hồ Gương. |
| **Sao Mùa**         | Thuật ngữ   | Sao cổ sáng nhất bầu trời trong một mùa: Hộ Tinh nổi bật. Lý do của 50/50.           |
| **Shizukane**       | Vùng        | Vùng cảm hứng Nhật Bản, hệ Băng, Trấn Tinh Yukiyo. "Chuông lặng".                    |
| **Siêu Dẫn**        | Phản ứng    | Lôi gặp Băng: vật bị đánh mất lớp phòng thủ.                                         |
| **Sói Sấm**         | Quái        | Sói tích điện sống theo đàn ở Khokhtal. Lôi.                                         |
| **Solgol**          | Địa danh    | Thủ đô Purunae, "Thung Thông".                                                       |
| **Sonamu**          | Trấn Tinh   | Trấn Tinh hệ Mộc của Purunae, cây thông già, vị thần duy nhất đang già đi.           |
| **Song Chấp Chính** | Chức vị     | Hai người cùng điều hành Marevia trong một năm.                                      |
| **Sương Mai**       | Nhân vật    | Hộ Tinh hệ Thủy 4★, kiếm khách hộ vệ của Hội Đền Trăng.                              |

## T

| Tên                    | Loại      | Định nghĩa                                                                                   |
| ---------------------- | --------- | -------------------------------------------------------------------------------------------- |
| **Tan Chảy**           | Phản ứng  | Hỏa gặp Băng: băng nhường trước và vỡ ra.                                                    |
| **Tết Sao Rơi**        | Lễ hội    | Lễ đầu năm của Đảo Lạc, cả làng gõ trống đồng ước chung một lời.                             |
| **Thạch Sơn**          | Nhân vật  | Hộ Tinh hệ Thổ 5★, Thợ Cả Phường Đá Ngọc, người khắc trăm bia đường.                         |
| **Thành Không Tên**    | Địa danh  | Phế tích ở Lũng Vân bị Thính Phong xóa sổ, nơi Hội Mặt Nạ cất giấy ước.                      |
| **Tháp Tinh Tú**       | Thuật ngữ | Tháp mười hai tầng dựng năm NS 1110, hứng ánh sao nuôi bốn Bia Đá.                           |
| **Thiên Diên Thành**   | Địa danh  | Thủ đô Lũng Vân, "thành diều trời".                                                          |
| **Thiên Tinh Giới**    | Thuật ngữ | Tên tạm cũ của thế giới, nay là Vọng Tinh Giới.                                              |
| **Thính Phong**        | Trấn Tinh | Trấn Tinh hệ Phong của Lũng Vân, ông già chép mọi lời gió mang.                              |
| **Thổ**                | Nguyên tố | Tính khí che chở và bền bỉ. Gắn Golbaran và Ostad Khesht.                                    |
| **Thời Bảy Sao Xuống** | Thời kỳ   | Thời kỳ 2: bảy sao lớn rơi xuống thành bảy Trấn Tinh.                                        |
| **Thời Bia Đá**        | Thời kỳ   | Thời kỳ 6, NS 1053 đến 1339: dựng lại đảo, Hội Mặt Nạ ra đời.                                |
| **Thời Lời Ước Đầu**   | Thời kỳ   | Thời kỳ 3, NS 1 đến khoảng 400: con người học ước, Hộ Tinh đầu tiên.                         |
| **Thời Nước Đen**      | Thời kỳ   | Thời kỳ 5, NS 1046 đến 1052: Hắc Giao xuất hiện và bị phong ấn.                              |
| **Thời Thức Giấc**     | Thời kỳ   | Thời kỳ 7, NS 1340 đến nay.                                                                  |
| **Thời Trăm Bến**      | Thời kỳ   | Thời kỳ 4, khoảng NS 400 đến 1045: đường biển nối bảy vùng.                                  |
| **Thuở Biển Sao**      | Thời kỳ   | Thời kỳ 1, trước khi có đất.                                                                 |
| **Thủy**               | Nguyên tố | Tính khí ghi nhớ và gắn kết. Gắn Đảo Lạc và Bà Khơi.                                         |
| **Thủy Nguyệt**        | Nhân vật  | Hộ Tinh hệ Thủy 5★, Người Giữ Đền Trăng, kế vị Bà Cả Hội Đền Trăng.                          |
| **Tiễn sao**           | Thuật ngữ | Nghi thức đám tang Hộ Tinh: thả đèn lồng không thắp từ Đỉnh Vọng Vân.                        |
| **Tinh Hải**           | Thuật ngữ | Biển sao trên trời, nơi lời ước kết thành sao. Không có ai cai quản.                         |
| **Tinh Văn**           | Thuật ngữ | Hoa văn sáng như chòm sao hiện trên da Hộ Tinh khi được sao chọn.                            |
| **Tô Khuyết**          | Nhân vật  | Kẻ Gánh Nguyện, thủ lĩnh Hội Mặt Nạ, từng là một trong Năm Người Giữ Đảo.                    |
| **Trăm bia đường**     | Địa danh  | Những bia chỉ lối, ghi tên người cũ do Thạch Sơn khắc từ NS 1310 tới NS 1345.                |
| **Trấn Tinh**          | Thuật ngữ | Danh hiệu chung của bảy vị thần hộ mệnh: những vì sao xuống đất giữ một vùng, không cai trị. |
| **Trâu Đá Ngủ**        | Quái      | Tinh anh hệ Thổ, trâu khổng lồ hóa đá trong Mỏ Ngọc Lòng Chảo.                               |
| **Tuyết Lan**          | Nhân vật  | Hộ Tinh hệ Băng 5★, người Shizukane (tên gốc Yukiran), người đưa thư của Người Đếm Sao.      |
| **Tuyết Lở Lớn**       | Sự kiện   | Trận tuyết lở thời Bảy Sao Xuống do Yukiyo và Aianga cãi nhau, vùi ba làng.                  |
| **Tượng Đồng Đấu Sĩ**  | Quái      | Tinh anh hệ Hỏa ở Marevia, tượng tập đánh tự chạy.                                           |

## U

| Tên         | Loại      | Định nghĩa                                                         |
| ----------- | --------- | ------------------------------------------------------------------ |
| **Utsuro**  | Nhân vật  | Biệt danh trong hội của Hisame Rei, nghĩa là "trống rỗng".         |
| **Ủy thác** | Thuật ngữ | Nhiệm vụ hằng ngày: việc nhờ của dân nhận ở bảng trước Đình Trống. |

## Ư

| Tên                  | Loại      | Định nghĩa                                                           |
| -------------------- | --------- | -------------------------------------------------------------------- |
| **Ước nguyện**       | Thuật ngữ | Một lần đốt Đá Sao gửi lời ước lên Tinh Hải.                         |
| **Ước Thư Biên Gió** | Sự kiện   | Hiệp ước năm NS 1288 giữa Lũng Vân và Khokhtal về đồng cỏ biên giới. |

## V

| Tên                | Loại      | Định nghĩa                                                          |
| ------------------ | --------- | ------------------------------------------------------------------- |
| **Vịnh Khơi**      | Địa danh  | Vịnh phía đông Đảo Lạc, nơi Bà Khơi rơi xuống và Hắc Giao trồi lên. |
| **Vọng Tinh Giới** | Thuật ngữ | Tên thế giới: cõi của những người ngước nhìn sao mà ước.            |

## X

| Tên    | Loại      | Định nghĩa                                            |
| ------ | --------- | ----------------------------------------------------- |
| **Xu** | Thuật ngữ | Tiền chung của Vọng Tinh Giới, đồng thau lỗ hình sao. |

## Y

| Tên                   | Loại      | Định nghĩa                                                                   |
| --------------------- | --------- | ---------------------------------------------------------------------------- |
| **Yêu Rừng**          | Quái      | Dân rừng trúc nhỏ bé, hung dữ vì bãi trúc bị đốt.                            |
| **Yêu Rừng Cung Thủ** | Quái      | Yêu Rừng lớn tuổi canh gác, bắn tên trúc.                                    |
| **Yukiakari**         | Địa danh  | Thủ đô Shizukane, "Thành Tuyết Sáng".                                        |
| **Yukiran**           | Nhân vật  | Tên gốc tiếng Shizukane của Tuyết Lan (雪蘭, lan tuyết).                     |
| **Yukiyo**            | Trấn Tinh | Trấn Tinh hệ Băng của Shizukane, đã thề im lặng, chỉ nói bằng hoa văn tuyết. |

## Bổ sung S06

Tên riêng do S06 (cốt truyện Mở đầu, Chương 1, nhiệm vụ phụ Đảo Lạc) thêm vào. Chi tiết ở \`docs/story/\`.

| Tên                       | Loại      | Định nghĩa                                                                            |
| ------------------------- | --------- | ------------------------------------------------------------------------------------- |
| **Bà Hạnh**               | Nhân vật  | Người đánh mõ báo canh ở Làng Vạn Lưới, bà nội Út Gạo, thuộc câu hát cũ về Bà Lưới.   |
| **Bà Hiền**               | Nhân vật  | Thợ chọn ngọc ở Mỏ Ngọc, mẹ Ngọc Thạch.                                               |
| **Bà Ngoan**              | Nhân vật  | Thợ làm đèn lồng ở Phố Cũ, bà ngoại Mai Linh.                                         |
| **Bà Tám Lụa**            | Nhân vật  | Thợ vá buồm ở bến Làng Vạn Lưới, mẹ Hạ Vy.                                            |
| **Bà Tư Bánh**            | Nhân vật  | Bán Bánh Trống ở chợ đêm Phố Vạn Đăng.                                                |
| **Bánh Trống**            | Vật phẩm  | Bánh nếp nướng in hoa văn mặt trống đồng, món chợ đêm Vạn Đăng. Hồi máu nhỏ.          |
| **Bé Sen**                | Nhân vật  | Cô bé tám tuổi ở Phố Vạn Đăng, nuôi con dế Tách Rè.                                   |
| **Bia Đá Dốc Cát**        | Địa danh  | Bia Đá ở đầu dốc từ Bãi Sao Rơi lên phố, tắt nhiều năm, sáng lại đêm Tết NS 1350.     |
| **Cai Tôn**               | Nhân vật  | Cai lính Quân Trấn Thủ gác cửa Hang Hắc Giao, mê Bánh Trống.                          |
| **Cần Câu Tre**           | Vật phẩm  | Cần câu tre già Rừng Trúc Mây, quà của Hai Khoác.                                     |
| **Chợ đêm Vạn Đăng**      | Địa danh  | Chợ họp mỗi tối dưới mái đèn lồng ở Phố Vạn Đăng, gần bến buôn.                       |
| **Cò**                    | Nhân vật  | Con trai Lão Neo, mất ngoài biển mùa đông NS 1339; hay làm diều hình cá.              |
| **Diều Cá Của Cò**        | Vật phẩm  | Con diều giấy hình cá Cò làm, tìm thấy trên gác nhà Lão Neo. Vật kỷ niệm.             |
| **Dùi Mõ Vạn Lưới**       | Vật phẩm  | Dùi mõ làm từ gỗ mõ cũ của Bà Hạnh. Vật kỷ niệm.                                      |
| **Đèn Cá Nhỏ**            | Vật phẩm  | Đèn lồng giấy hình cá, mắt bằng cát sáng, quà của Bà Ngoan. Đồ trang trí.             |
| **Đèn Sét Của Minh Khải** | Vật phẩm  | Ngọn đèn sét Minh Khải để lại cho Người Ước Nguyện, soi được dưới nước đen.           |
| **Đinh Bảo**              | Nhân vật  | Thợ mỏ ở Mỏ Ngọc, bố Ngọc Thạch.                                                      |
| **Hai Khoác**             | Nhân vật  | Ngư dân Vạn Lưới thích kể chuyện phóng đại, nấu cháo cá cho cả làng.                  |
| **Kẹo Mạch Nha**          | Vật phẩm  | Kẹo Tết của Bà Tư. Hồi máu nhỏ.                                                       |
| **Lá Sáo Trúc**           | Vật phẩm  | Quà của Ông Sáo, mở bản nhạc "Sông Sương".                                            |
| **Lõi Sao Cạn**           | Vật phẩm  | Hai lõi sao của Bia Đông và Bia Tây sau khi bị dùng làm mỏng phong ấn; Thạch Sơn giữ. |
| **Mảnh Buồm Gió Nồm**     | Vật phẩm  | Mảnh vải buồm thừa Tám Lụa gửi cho Hạ Vy. Vật kỷ niệm.                                |
| **Ngọc Thô**              | Vật phẩm  | Ngọc chưa mài ở Mỏ Ngọc, nguyên liệu Khai Tinh hệ Thổ.                                |
| **Ông Ngồi**              | Biệt danh | Biệt danh Bạch Vũ đặt cho Hộ Vệ Đá Cổ ở Bia Đông.                                     |
| **Ông Lạc Thành**         | Nhân vật  | Người giữ trống đã nghỉ của Đình Trống Đồng, bố Lạc Hồng, tay run từ NS 1344.         |
| **Ông Sáo**               | Nhân vật  | Lái đò Sông Sương, thổi sáo tan sương.                                                |
| **Rương Lộc Tết**         | Vật phẩm  | Rương quà Tết người Vạn Đăng đặt dọc đường cho người lỡ đường đêm Tết.                |
| **Sách Kinh Nghiệm**      | Vật phẩm  | Sách tăng kinh nghiệm cho Hộ Tinh (tên gọi trong truyện của "sách" ở \`startProfile\`). |
| **Tách Rè**               | Sinh vật  | Con dế màu đồng biết "hát" của Bé Sen.                                                |
| **Thầy Đồ Khiêm**         | Nhân vật  | Thầy đồ viết câu đối và dạy chữ cho trẻ ở Đình Trống Đồng.                            |
| **Trại Bắc**              | Địa danh  | Trại của Quân Trấn Thủ cạnh lối vào Hang Hắc Giao; nơi Lão Neo bị giữ sau Chương 1.   |
| **Út Gạo**                | Nhân vật  | Ngư dân trẻ Vạn Lưới, cháu Bà Hạnh, từng đeo mặt nạ trắng của Hội Bất Nguyện.         |
| **Yêu Rừng Lớn**          | Quái      | Biến thể to của Yêu Rừng (\`goblin_lon\`), nhiều máu, chậm.                             |
`,ds=Object.assign({"../../../../docs/world/00-tong-quan.md":as,"../../../../docs/world/01-vu-tru-va-sao.md":es,"../../../../docs/world/02-lich-su.md":cs,"../../../../docs/world/03-dia-ly.md":os,"../../../../docs/world/04-phe-phai.md":gs,"../../../../docs/world/05-van-hoa-doi-thuong.md":rs,"../../../../docs/world/06-sinh-vat.md":ls,"../../../../docs/world/07-hac-giao-va-hoi-mat-na.md":ss,"../../../../docs/world/08-vat-pham-va-di-vat.md":us,"../../../../docs/world/09-tu-dien.md":ms}),va=Object.entries(ds).filter(([n])=>!/10-cau-hoi-mo/.test(n)).sort(([n],[t])=>n.localeCompare(t)).map(([n,t])=>({id:n.split("/").pop().replace(/\.md$/,""),doc:Na(t)})),dh=n=>{const t=document.createElement("p");return t.innerHTML=Ti(n??""),t};function Je(n,t=E.P){const i=h=>t.codex.includes(h);return n==="creatures"?Ph.creatures.map(h=>({id:h.id,name:h.name,found:i("quai:"+h.id),sub:h.inGame?void 0:"Chưa xuất hiện trong bản thử nghiệm",body:()=>[h.habitat?v("p",{},[v("b",{},["Nơi sống: "]),h.habitat]):"",dh(h.lore),h.weak?v("p",{},[v("b",{},["Điểm yếu: "]),h.weak]):"",h.rumor?v("blockquote",{class:"tt-quote"},[h.rumor.replace(/^"|"$/g,"")]):""]})):n==="chars"?hc.map(h=>({id:h.id,name:h.name,found:!!t.owned[h.id]||i("nv:"+h.id),sub:h.title,art:()=>{const a=document.createElement("canvas");return a.width=a.height=96,a.getContext("2d").drawImage(Mi(h.id,96,96,"head"),0,0),a},body:()=>[v("div",{class:"tt-row"},[$i(h.r,14),Wh(h.el,{label:!0,name:K[h.el]?.vi})]),v("p",{},[h.desc]),t.owned[h.id]?v("p",{class:"tt-dim"},["Xem hồ sơ đầy đủ trong màn Nhân vật."]):""]})):n==="places"?Ph.places.map(h=>({id:h.id,name:h.name,found:i("dia:"+h.id),body:()=>[dh(h.lore),h.secret?v("details",{class:"tt-prof"},[v("summary",{},["Bí mật"]),dh(h.secret)]):""]})):Ia.map(h=>({id:h.id,name:h.name,found:i("vat:"+h.id)||(t.bag[h.id]??0)>0||!!h.profileKey&&Number(t[h.profileKey]??0)>0,sub:Di.items.types.find(a=>a.id===h.type)?.name,body:()=>[v("div",{class:"tt-row"},[$i(h.rarity,14),st(h.region)]),dh(h.story)]}))}let Wn="creatures";const fh={},Ut=[{id:"creatures",label:"Sinh vật",icon:"danh"},{id:"chars",label:"Nhân vật",icon:"nhan-vat"},{id:"places",label:"Địa danh",icon:"ban-do"},{id:"items",label:"Vật phẩm",icon:"tui-do"},{id:"world",label:"Thế giới",icon:"huong-dan"}];function fs(n){n.classList.add("tt-menu-codex");const t=E.P,i=l=>{const c=Je(l,t);return`${c.filter(s=>s.found).length}/${c.length}`},h=ii(Ut.map(l=>({...l,label:l.id==="world"?l.label:`${l.label} ${i(l.id)}`})),Wn,l=>{l!==Wn&&(Wn=l,an())}),a=v("div",{class:"tt-codex-grid",id:"codexGrid",role:"list"});let g;if(Wn==="world"){const l=va.find(c=>c.id===fh.world)??va[0];for(const c of va){const s=v("button",{type:"button",class:"tt-codex-cell is-found"+(c===l?" is-sel":""),role:"listitem","aria-pressed":String(c===l)},[Tn("huong-dan",{size:26}),v("span",{class:"nm"},[c.doc.title.replace(/^\d+\.\s*/,"")])]);s.addEventListener("click",()=>(fh.world=c.id,an())),a.append(s)}g=v("article",{class:"tt-panel tt-codex-detail tt-md-doc",id:"codexDetail"},l?[v("h3",{class:"tt-h2"},[l.doc.title]),yi(l.doc.intro),Da(l.doc.sections,()=>!0)]:[v("p",{class:"tt-dim"},["Chưa có bài viết."])])}else{const l=Je(Wn,t),c=l.find(s=>s.id===fh[Wn])??l.find(s=>s.found)??l[0];for(const s of l){const u=v("button",{type:"button",class:"tt-codex-cell"+(s.found?" is-found":" is-locked")+(s===c?" is-sel":""),role:"listitem","data-id":s.id,"aria-pressed":String(s===c),"aria-label":s.found?s.name:"Chưa khám phá"},[s.art?s.art():Tn(Ut.find(p=>p.id===Wn).icon,{size:26}),v("span",{class:"nm"},[s.found?s.name:"???"])]);u.addEventListener("click",()=>(fh[Wn]=s.id,an())),a.append(u)}g=v("article",{class:"tt-panel tt-codex-detail",id:"codexDetail"},c?c.found?[v("h3",{class:"tt-h2"},[c.name]),c.sub?v("p",{class:"tt-dim"},[c.sub]):"",...c.body()]:[v("div",{class:"tt-codex-shadow"},[c.art?c.art():Tn(Ut.find(s=>s.id===Wn).icon,{size:64})]),v("h3",{class:"tt-h2"},["???"]),v("p",{class:"tt-dim"},[Wn==="creatures"?"Hạ được sinh vật này để mở mục.":Wn==="places"?"Đi tới nơi này để mở mục.":Wn==="chars"?"Gặp Hộ Tinh này qua Ước nguyện để mở mục.":"Tìm được vật phẩm này để mở mục."])]:[v("p",{class:"tt-dim"},["Chưa có mục nào."])])}n.append(h,v("div",{class:"tt-codex"},[a,g]))}ht("codex",{title:"Bách khoa",icon:"huong-dan",render:fs,onKey(n){if(n.key!=="q"&&n.key!=="e")return!1;const t=Ut.findIndex(i=>i.id===Wn);return Wn=Ut[(t+(n.key==="e"?1:Ut.length-1))%Ut.length].id,an(),!0}});function ys(n,t,i){const h="#1f3f6a",a=K.water.c;for(let l=t.segs.length-1;l>=0;l--){const c=t.segs[l],s=30-l*1.6;s<8||(n.fillStyle=h,n.beginPath(),n.arc(c.x,c.y-s*.6,s,0,B),n.fill(),n.fillStyle=a,n.globalAlpha=.75,n.beginPath(),n.moveTo(c.x-s*.3,c.y-s*1.5),n.lineTo(c.x,c.y-s*2.1),n.lineTo(c.x+s*.3,c.y-s*1.5),n.closePath(),n.fill(),n.globalAlpha=1)}const g=t.segs[0];n.save(),n.translate(g.x,g.y-24),n.rotate(t.ang),n.fillStyle=h,n.beginPath(),n.ellipse(10,0,40,28,0,0,B),n.fill(),n.beginPath(),n.moveTo(30,-14),n.lineTo(62,-4),n.lineTo(62,6),n.lineTo(30,16),n.closePath(),n.fill(),n.fillStyle="#e8e2c8",n.beginPath(),n.moveTo(-6,-22),n.lineTo(-34,-46),n.lineTo(4,-26),n.closePath(),n.fill(),n.beginPath(),n.moveTo(-6,22),n.lineTo(-34,46),n.lineTo(4,26),n.closePath(),n.fill(),n.fillStyle=a,n.shadowColor=a,n.shadowBlur=14,n.beginPath(),n.arc(28,-11,4.5,0,B),n.arc(28,11,4.5,0,B),n.fill(),n.shadowBlur=0,n.restore()}function ro(n){Or(),Dt(),n()}ht("daily",{title:"Ủy thác",icon:"uy-thac",render(n){E.ensureDaily();const t=E.P.daily;n.classList.add("tt-menu-daily");const i=v("ul",{class:"tt-tasks",id:"dailyTasks"});t.tasks.forEach((a,g)=>{const l=a.prog>=a.goal,c=en(a.claimed?"Đã nhận":l?"Nhận thưởng":"Chưa xong",{variant:l&&!a.claimed?"primary":"ghost",icon:a.claimed?"xac-nhan":"ruong",disabled:!l||a.claimed,onClick:()=>{E.req("claimTask",{i:g}).ok&&(Tt("+30 Đá Sao, +3.000 Xu","ok"),Wi(),an())}});i.append(v("li",{class:"tt-task"+(a.claimed?" is-done":"")},[Tn("uy-thac",{size:24}),v("div",{class:"tt"},[v("b",{},[a.t]),Oa(a.prog/a.goal,{label:`${a.prog}/${a.goal}`,text:`${a.prog}/${a.goal}`})]),c]))});const h=t.tasks.every(a=>a.claimed);i.append(v("li",{class:"tt-task is-bonus"},[Tn("sao",{size:24}),v("div",{class:"tt"},[v("b",{},["Thưởng hoàn thành ngày"]),v("small",{class:"tt-dim"},["60 Đá Sao, 5 Sách Kinh Nghiệm"])]),en(t.bonus?"Đã nhận":"Nhận",{variant:h&&!t.bonus?"primary":"ghost",disabled:!h||t.bonus,onClick:()=>{E.req("claimBonus").ok&&(Tt("+60 Đá Sao, +5 Sách KN","ok"),Wi(),an())}})])),n.append(v("p",{class:"tt-dim"},[`Ngày ${new Date().toLocaleDateString("vi-VN")} · Mỗi Ủy thác: 30 Đá Sao và 3.000 Xu · Làm mới lúc 0 giờ`]),i)}});ht("tower",{title:"Tháp Tinh Tú",icon:"thap",render(n){const t=E.P;n.classList.add("tt-menu-tower");const i=v("div",{class:"tt-floors",id:"towerFloors"});for(let h=1;h<=12;h++){const a=t.tower[h]||0,g=h===1||(t.tower[h-1]||0)>0,l=v("button",{type:"button",class:"tt-floor"+(a?" is-done":""),disabled:!g,"data-floor":h},[v("b",{},[`Tầng ${h}`]),v("span",{class:"st","aria-label":`${a}/3 sao`},[1,2,3].map(c=>v("i",{class:c<=a?"on":""},["★"]))),v("small",{},[`Quái cấp ${1+Math.round(h*.75)}${h>=4?" · có Hộ Vệ Đá":""}`]),g?"":Tn("khoa",{size:16})]);l.addEventListener("click",()=>ro(()=>Aa(h))),i.append(l)}n.append(v("p",{class:"tt-dim"},["Hạ hết các đợt quái trước khi hết giờ. Còn càng nhiều thời gian, càng nhiều sao."]),i)}});ht("boss",{title:"Hắc Giao",icon:"canh-bao",render(n){n.classList.add("tt-menu-boss");const t=v("canvas",{width:520,height:360,class:"tt-boss-art","aria-hidden":"true"}),i=t.getContext("2d"),h=i.createLinearGradient(0,0,0,360);h.addColorStop(0,"#0b1a33"),h.addColorStop(1,"#163a5c"),i.fillStyle=h,i.fillRect(0,0,520,360);const a={segs:[],ang:-.4};for(let l=0;l<14;l++)a.segs.push({x:300-l*22,y:230+Math.sin(l*.45)*40});i.save(),i.translate(-30,0),ys(i,a),i.restore();const g=v("div",{class:"tt-floors",id:"bossLevels"});for(let l=1;l<=5;l++){const c=E.P.boss[l],s=l===1||E.P.boss[l-1],u=v("button",{type:"button",class:"tt-floor"+(c?" is-done":""),disabled:!s,"data-lv":l},[v("b",{},[`Cấp độ ${l}`]),v("small",{},[`Máu ${Rn(14e3*(1+.9*(l-1)))}`]),c?st("Đã hạ","ok"):v("small",{},[`Lần đầu: +${100+l*40} Đá Sao`]),s?"":Tn("khoa",{size:16})]);u.addEventListener("click",()=>ro(()=>Ea(l))),g.append(u)}n.append(v("div",{class:"tt-boss"},[t,v("div",{},[v("p",{class:"tt-dim"},["Ác long ngủ dưới đáy hang phía bắc. Giai đoạn 2 nó lao tới tạo sóng xung kích: nhảy để né."]),g])]))}});ht("help",{title:"Hướng dẫn",icon:"huong-dan",render(n){const t=document.getElementById("tplHelp");if(n.classList.add("tt-menu-help"),!t)throw new Error("Không tìm thấy nội dung hướng dẫn");n.append(t.content.cloneNode(!0))}});function nc(n){E.load(),n&&n.P&&(E.P=n.P),Rc(),requestAnimationFrame(to),document.fonts&&document.fonts.ready.then(()=>{for(const t in ke)delete ke[t]})}rc();ug();vr();tl();rr();zr();qr();Wg();addEventListener("storage",n=>{n.key!==Xo||!E.P||(E.reload(),te(),Fi()&&an())});new URLSearchParams(location.search).has("dev")&&k(()=>import("./tuning-2B_YJuI0.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(n=>n.initTuning());window.claude?.hot?.snapshot?.(()=>({P:E.P}));window.claude?.hot?.ready?window.claude.hot.ready(nc):nc(window.claude?.hot?.data??{});new URLSearchParams(location.search).has("e2e")&&Object.assign(window,{__tinhtu:{S:e,Server:E,menu:{openMenu:Mt,closeMenu:Dt,currentScreen:jh}}});export{X as F,Th as a,Qg as f,Ts as s};
