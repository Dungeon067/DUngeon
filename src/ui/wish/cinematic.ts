// @ts-nocheck
/* Hoạt ảnh ước nguyện 5 cảnh (S10), chuyển từ bản mẫu uoc-nguyen-mau.html của chủ dự án.
   Giữ nguyên nhịp SHOT, khung điện ảnh và cảnh 5★ giả 4★ rồi quay chậm bùng vàng.
   Khác bản mẫu: kết quả lấy từ Server.req("pull") (không tự quay), nhân vật vẽ bằng drawChibi của game,
   nhịp và hệ số quay chậm đọc từ content/cinematic.yaml. Đây là bản dự phòng chạy bằng code cho video S20. */
import { drawChibi } from "../../art/chibi";
import { byId as GAME_BY_ID } from "../../data/content";
import { CINEMATIC } from "../../data/menu-content";

export interface CineItem { kind: "char" | "item"; id?: string; r: 3 | 4 | 5; name: string; k?: string; feat?: boolean; isNew?: boolean }
export interface CineHooks {
  sound: () => boolean;
  done: () => void;
  featured: () => string;
  line: (id: string) => string;
  skipBtn: { hidden: boolean };
  hint: { hidden: boolean; textContent: string | null };
}

export function createCinematic(cv: HTMLCanvasElement, hooks: CineHooks) {
const ui = { classList: { add() {}, remove() {} } };
const skipBtn = hooks.skipBtn, hint = hooks.hint;
const updPity = () => {};
const byId = new Proxy({}, { get: (_, id) => { const c = GAME_BY_ID[id]; return c && { ...c, line: c.line ?? hooks.line(id) }; } });
let FEATURED = hooks.featured();
const artCache = {}, silCache = {};
function charArt(id,h,raw){
 const key=id+"_"+h+(raw?"r":"");if(artCache[key])return artCache[key];
 const ch=byId[id],w=Math.round(h*.8),cv=document.createElement("canvas");cv.width=w;cv.height=h;const c=cv.getContext("2d");
 const el=EL[ch.el]??EL.fire;if(!raw){const g=c.createRadialGradient(w/2,h*.46,0,w/2,h*.46,h*.5);g.addColorStop(0,rgba(el.c,.35));g.addColorStop(1,rgba(el.c,0));c.fillStyle=g;c.fillRect(0,0,w,h);}
 const s=h/50;drawChibi(c,ch,w/2,h*.93,s,{t:.6,noShadow:true});
 artCache[key]=cv;return cv;
}
const cardCache={};
function cardArt(id,w,h){
 const key=id+w+"x"+h;if(cardCache[key])return cardCache[key];
 const ch=byId[id],el=EL[ch.el]??EL.fire,cv=document.createElement("canvas");cv.width=w;cv.height=h;const c=cv.getContext("2d");
 const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,shade(el.c,-.5));g.addColorStop(1,shade(el.c,-.85));c.fillStyle=g;c.fillRect(0,0,w,h);
 c.save();c.translate(w/2,h*.42);c.globalAlpha=.14;c.fillStyle=el.c2;for(let i=0;i<14;i++){c.rotate(TAU/14);c.beginPath();c.moveTo(0,0);c.lineTo(h,-h*.06);c.lineTo(h,h*.06);c.closePath();c.fill();}c.restore();
 drawChibi(c,ch,w/2,h*.8,h/62,{t:.6,noShadow:true});
 cardCache[key]=cv;return cv;
}

/* ============================ helpers ============================ */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const lerp=(a,b,t)=>a+(b-a)*t;
const rand=(a,b)=>a+Math.random()*(b-a);
const ease={out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,inOut:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,back:t=>{const c=1.70158,d=c+1;return 1+d*Math.pow(t-1,3)+c*Math.pow(t-1,2);}};
function hash2(x,y,s=0){let h=(x*374761393+y*668265263+s*1442695041)|0;h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return (h>>>0)/4294967296;}
function hex(h){const c=h.replace("#","");return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function rgba(h,a){const [r,g,b]=hex(h);return `rgba(${r},${g},${b},${a})`;}
function mix(a,b,t){const A=hex(a),B=hex(b);return "#"+A.map((v,i)=>Math.round(lerp(v,B[i],t)).toString(16).padStart(2,"0")).join("");}
function shade(h,amt){return amt<0?mix(h,"#000000",-amt):mix(h,"#ffffff",amt);}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
const RC={3:"#6fb6ff",4:"#b98cff",5:"#ffcf5a"};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================ characters (same as the game) ============================ */
const EL={fire:{vi:"Hỏa",c:"#ff6a3d",c2:"#ffc08a"},water:{vi:"Thủy",c:"#3aa6f5",c2:"#a6dcff"},wind:{vi:"Phong",c:"#45dfb1",c2:"#bdf6e4"},bolt:{vi:"Lôi",c:"#b47bff",c2:"#e0c8ff"},earth:{vi:"Thổ",c:"#e9b23a",c2:"#f8de98"},ice:{vi:"Băng",c:"#8fe1ff",c2:"#e6f9ff"}};


/* ============================ audio (synth, starts on a tap) ============================ */
let AC=null,master=null;const soundOn=true;
function audio(){
 if(!hooks.sound())return null;
 if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.55;const comp=AC.createDynamicsCompressor();master.connect(comp);comp.connect(AC.destination);}catch(e){return null;}}
 if(AC.state==="suspended")AC.resume();return AC;
}
function tone(f,t0,dur,type,vol,f2){const a=audio();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,a.currentTime+t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,a.currentTime+t0+dur);g.gain.setValueAtTime(.0001,a.currentTime+t0);g.gain.exponentialRampToValueAtTime(vol,a.currentTime+t0+Math.min(.04,dur/4));g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+t0+dur);o.connect(g);g.connect(master);o.start(a.currentTime+t0);o.stop(a.currentTime+t0+dur+.05);}
function noise(t0,dur,vol,f1,f2,q){const a=audio();if(!a)return;const n=a.createBuffer(1,Math.ceil(a.sampleRate*dur),a.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=a.createBufferSource();s.buffer=n;const f=a.createBiquadFilter();f.type="bandpass";f.Q.value=q||1.2;f.frequency.setValueAtTime(f1,a.currentTime+t0);f.frequency.exponentialRampToValueAtTime(f2,a.currentTime+t0+dur);const g=a.createGain();g.gain.setValueAtTime(.0001,a.currentTime+t0);g.gain.exponentialRampToValueAtTime(vol,a.currentTime+t0+dur*.3);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+t0+dur);s.connect(f);f.connect(g);g.connect(master);s.start(a.currentTime+t0);}
function bell(f,t0,vol){tone(f,t0,1.8,"sine",vol);tone(f*2.01,t0,1.1,"sine",vol*.3);tone(f*3.0,t0,.6,"triangle",vol*.12);}
const PENTA=[392,440,523.25,587.33,659.25,784,880,1046.5,1174.7,1318.5,1568];
const SFX={
 charge(){tone(98,0,1.4,"triangle",.12,262);tone(147,0,1.4,"sine",.08,392);noise(0,1.4,.05,300,2400,.8);},
 launch(){noise(0,.5,.12,600,5000,.7);tone(392,0,.35,"sine",.08,1568);},
 whoosh(){noise(0,1.4,.09,3000,400,.6);},
 flare(){bell(1046.5,0,.12);bell(1568,.06,.1);noise(0,.4,.06,4000,8000,2);},
 impact(r){tone(110,0,.9,"sine",.35,32);noise(0,.8,.2,900,120,.6);if(r>=4)tone(55,0,1.4,"sine",.25,28);},
 reveal(r){const n=r===5?7:r===4?4:2;for(let i=0;i<n;i++)bell(PENTA[i+(r===5?3:r===4?2:1)],i*.07,r===5?.11:.08);if(r===5){[523.25,659.25,784,1046.5].forEach((f,i)=>tone(f,.5,2.2,"sine",.05));}},
 star(i,r){bell(PENTA[4+i],0,r===5?.07:.05);},
 card(){tone(880,0,.12,"triangle",.04,1320);}
};

const BIRD=[[-.62,.05],[-.38,-.12],[-.18,-.02],[0,-.22],[.16,-.04],[.4,-.16],[.64,.02],[.2,.18],[0,.36],[-.2,.18]];
const BIRD_EDGES=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[2,9],[4,7],[9,8],[7,8],[3,8]];
/* ============================ extra cinematic sounds ============================ */
function pad(freqs,t0,dur,vol){freqs.forEach((f,i)=>{tone(f,t0,dur,"sine",vol);tone(f*1.004,t0+.02,dur,"sine",vol*.6);});}
let ambSrc=null;
function ambience(on){const a=audio();if(!a)return;if(ambSrc){try{ambSrc.stop();}catch(e){}ambSrc=null;}if(!on)return;
 const len=a.sampleRate*4,b=a.createBuffer(1,len,a.sampleRate),d=b.getChannelData(0);let last=0;for(let i=0;i<len;i++){last=(last+(Math.random()*2-1)*.02)/1.02;d[i]=last*3.5;}
 const s=a.createBufferSource();s.buffer=b;s.loop=true;const f=a.createBiquadFilter();f.type="lowpass";f.frequency.value=700;const g=a.createGain();g.gain.value=.0001;g.gain.exponentialRampToValueAtTime(.35,a.currentTime+.6);
 s.connect(f);f.connect(g);g.connect(master);s.start();ambSrc=s;ambSrc._g=g;}
function ambienceFade(){if(ambSrc&&AC){ambSrc._g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.8);const s=ambSrc;setTimeout(()=>{try{s.stop();}catch(e){}},900);ambSrc=null;}}
const CIN={
 open(){ambience(true);pad([196,293.66],.1,2.4,.05);},
 lantern(){noise(0,.9,.06,400,1800,.8);bell(784,0,.05);},
 rise(){ambienceFade();pad([261.63,329.63,392,523.25],0,2,.045);noise(0,1.8,.05,800,4000,.5);},
 line(i){bell(PENTA[2+i%8],0,.045);},
 burstStars(){bell(1046.5,0,.09);bell(1568,.05,.07);noise(0,.5,.07,3000,9000,1.5);},
 meteor(){noise(0,2.2,.12,200,3000,.5);tone(70,0,2.2,"sine",.15,140);},
 slowmo(){tone(60,0,1.6,"sine",.25,30);bell(523.25,.1,.1);bell(784,.2,.1);bell(1046.5,.3,.1);},
 descend(){noise(0,1.4,.12,3500,300,.6);},
};

/* ============================ canvas setup ============================ */
const X=cv.getContext("2d");
let W=0,H=0,DPR=1,stars=[];
const glowCache={};
function glow(col){if(glowCache[col])return glowCache[col];const s=64,c=document.createElement("canvas");c.width=c.height=s;const g=c.getContext("2d");const gr=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.18,rgba(col,.95));gr.addColorStop(.5,rgba(col,.25));gr.addColorStop(1,rgba(col,0));g.fillStyle=gr;g.fillRect(0,0,s,s);glowCache[col]=c;return c;}
function blob(x,y,r,col,a){if(a<=0||r<=0)return;X.globalAlpha=Math.min(1,a);X.drawImage(glow(col),x-r,y-r,r*2,r*2);X.globalAlpha=1;}
function flareH(x,y,w,h,col,a){if(a<=0)return;X.globalAlpha=Math.min(1,a);X.drawImage(glow(col),x-w,y-h,w*2,h*2);X.globalAlpha=1;}
function resize(){DPR=Math.min(2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
 stars=Array.from({length:Math.round(W*H/2200)},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.2,p:Math.random()*6,d:Math.random()*.8+.2}));}


/* ============================ the cliff-and-sea set (virtual 1600×900) ============================ */
const VW=1600,VH=900,HORIZON=560,DRUM={x:420,y:612,rx:118,ry:28},FIG={x:540,y:610};
function ridge(seed,base,amp,step){const pts=[];for(let x=-400;x<=2000;x+=step){const n=Math.sin(x*.004+seed)*.5+Math.sin(x*.011+seed*2)*.3+Math.sin(x*.027+seed*3)*.2;pts.push([x,base-amp*(.55+.45*n)]);}return pts;}
const RIDGES=[ridge(1.3,HORIZON,210,40),ridge(4.1,HORIZON,140,30),ridge(7.7,HORIZON,80,24)];
const CLIFF=[[-400,900],[-400,560],[-120,520],[60,560],[160,600],[640,600],[700,640],[760,760],[820,900]];
let cam={x:VW/2,y:VH/2,z:1};
function applyCam(){const s=Math.max(W/VW,H/VH)*cam.z;X.translate(W/2,H/2);X.scale(s,s);X.translate(-cam.x,-cam.y);}
function drawSet(t,o={}){
 // sky
 const g=X.createLinearGradient(0,-600,0,HORIZON);g.addColorStop(0,"#03040c");g.addColorStop(.6,"#141a46");g.addColorStop(1,"#2c3f6e");X.fillStyle=g;X.fillRect(-800,-900,VW+1600,HORIZON+900);
 for(const s of stars){const tw=.35+.65*Math.abs(Math.sin(t*.7*s.d+s.p));X.globalAlpha=tw*.9;X.fillStyle="#e9ecff";X.fillRect(-400+s.x*(VW+800),-600+s.y*(HORIZON+500),s.r*1.2,s.r*1.2);}X.globalAlpha=1;
 // moon
 X.globalCompositeOperation="lighter";blob(1180,230,260,"#6a7fd0",.35);X.globalCompositeOperation="source-over";
 X.fillStyle="#f6efd8";X.beginPath();X.arc(1180,230,62,0,TAU);X.fill();X.fillStyle="rgba(200,190,160,.35)";X.beginPath();X.arc(1162,214,14,0,TAU);X.arc(1200,250,10,0,TAU);X.arc(1196,206,7,0,TAU);X.fill();
 // mountains
 const mc=["#1f2a55","#18214a","#10173a"];
 RIDGES.forEach((r,i)=>{X.fillStyle=mc[i];X.beginPath();X.moveTo(r[0][0],HORIZON+2);for(const p of r)X.lineTo(p[0],p[1]+i*6);X.lineTo(r[r.length-1][0],HORIZON+2);X.closePath();X.fill();});
 // mist band
 const mg=X.createLinearGradient(0,HORIZON-70,0,HORIZON+10);mg.addColorStop(0,"rgba(120,140,200,0)");mg.addColorStop(1,"rgba(120,140,200,.25)");X.fillStyle=mg;X.fillRect(-800,HORIZON-70,VW+1600,80);
 // sea
 const sg=X.createLinearGradient(0,HORIZON,0,VH+200);sg.addColorStop(0,"#1c2c5a");sg.addColorStop(1,"#050816");X.fillStyle=sg;X.fillRect(-800,HORIZON,VW+1600,VH-HORIZON+400);
 X.globalCompositeOperation="lighter";
 for(let i=0;i<70;i++){const y=HORIZON+6+Math.pow(i/70,1.6)*360,w=(10+i*2.2)*(.6+.4*Math.sin(t*1.3+i*1.7)),x=1180+Math.sin(i*12.9+t*.6)*(10+i*1.5);X.fillStyle=`rgba(246,239,216,${.5*(1-i/80)})`;X.fillRect(x-w/2,y,w,1.5+i*.03);}
 for(let i=0;i<40;i++){const x=(hash2(i,3)*2400-400+t*12)%2400-400,y=HORIZON+20+hash2(i,4)*320;X.fillStyle="rgba(140,170,240,.12)";X.fillRect(x,y,30+hash2(i,5)*60,1);}
 X.globalCompositeOperation="source-over";
 if(o.ripples)for(const r of o.ripples){X.strokeStyle=rgba(r.col,r.a);X.lineWidth=2;X.beginPath();X.ellipse(DRUM.x,HORIZON+40,r.r,r.r*.12,0,0,TAU);X.stroke();}
 // cliff
 X.fillStyle="#0a0d1e";X.beginPath();X.moveTo(CLIFF[0][0],CLIFF[0][1]);for(const p of CLIFF)X.lineTo(p[0],p[1]);X.closePath();X.fill();
 X.strokeStyle="rgba(120,140,220,.25)";X.lineWidth=2;X.beginPath();X.moveTo(160,600);X.lineTo(640,600);X.stroke();
 // grass tufts on the plateau
 X.fillStyle="#0d1226";for(let i=0;i<30;i++){const x=170+i*16,h=6+hash2(i,9)*10,sw=Math.sin(t*1.5+i)*2;X.beginPath();X.moveTo(x,600);X.lineTo(x+3+sw,600-h);X.lineTo(x+6,600);X.fill();}
 // bronze drum altar
 drawDrum(t,o.drumGlow||0,o.drumCol||"#ffcf5a");
 // the wisher, a cloaked figure seen from behind
 drawWisher(t,o.arm||0);
 if(o.lantern)drawLantern(o.lantern.x,o.lantern.y,o.lantern.s,t);
}
function drawDrum(t,ga,col){
 const D=DRUM;X.save();X.translate(D.x,D.y);
 const bg=X.createLinearGradient(0,0,0,D.ry*3);bg.addColorStop(0,"#6a4626");bg.addColorStop(1,"#1d1209");X.fillStyle=bg;
 X.beginPath();X.ellipse(0,0,D.rx,D.ry,0,Math.PI,0,true);X.lineTo(D.rx*.9,D.ry*2.2);X.ellipse(0,D.ry*2.2,D.rx*.9,D.ry*.7,0,0,Math.PI);X.closePath();X.fill();
 const fg=X.createRadialGradient(0,0,0,0,0,D.rx);fg.addColorStop(0,"#c99654");fg.addColorStop(.6,"#93653a");fg.addColorStop(1,"#5c3b1d");X.fillStyle=fg;X.beginPath();X.ellipse(0,0,D.rx,D.ry,0,0,TAU);X.fill();
 X.strokeStyle="rgba(255,226,170,.4)";X.lineWidth=1;for(const k of [.92,.74,.52,.3]){X.beginPath();X.ellipse(0,0,D.rx*k,D.ry*k,0,0,TAU);X.stroke();}
 X.save();X.scale(1,D.ry/D.rx);X.rotate(t*.1);X.fillStyle="rgba(255,226,170,.65)";X.beginPath();for(let i=0;i<28;i++){const r=i%2?D.rx*.07:D.rx*.2,a=i/28*TAU;X.lineTo(Math.cos(a)*r,Math.sin(a)*r);}X.closePath();X.fill();X.restore();
 if(ga>0){X.globalCompositeOperation="lighter";blob(0,0,D.rx*2.2,col,ga);X.globalCompositeOperation="source-over";}
 X.restore();
}
function drawWisher(t,arm){
 const F=FIG;X.save();X.translate(F.x,F.y);
 X.fillStyle="#05070f";
 // cloak
 X.beginPath();X.moveTo(-16,-70);X.quadraticCurveTo(-30,-20,-34+Math.sin(t*2)*3,0);X.lineTo(30+Math.sin(t*2+1)*3,0);X.quadraticCurveTo(26,-30,16,-70);X.closePath();X.fill();
 // hood
 X.beginPath();X.ellipse(0,-82,15,18,0,0,TAU);X.fill();X.beginPath();X.moveTo(-6,-98);X.lineTo(4,-112);X.lineTo(10,-96);X.fill();
 // raised arm toward the sky
 X.save();X.translate(-10,-66);X.rotate(lerp(.5,-2.3,arm));X.fillRect(-4,0,8,40);X.restore();
 // rim light from the moon
 X.strokeStyle="rgba(170,190,255,.35)";X.lineWidth=1.5;X.beginPath();X.moveTo(16,-70);X.quadraticCurveTo(26,-30,30,0);X.stroke();X.beginPath();X.arc(0,-82,15,-1.2,.6);X.stroke();
 X.restore();
}
function drawLantern(x,y,s,t){
 X.save();X.translate(x,y);X.scale(s,s);X.rotate(Math.sin(t*2)*.06);
 X.globalCompositeOperation="lighter";blob(0,0,70,"#ffb24a",.85);blob(0,0,26,"#ffe7b0",1);X.globalCompositeOperation="source-over";
 X.fillStyle="#ffd58a";X.beginPath();X.moveTo(-11,-16);X.lineTo(11,-16);X.lineTo(14,14);X.lineTo(-14,14);X.closePath();X.fill();
 X.strokeStyle="rgba(150,70,20,.5)";X.lineWidth=1;for(let i=-1;i<=1;i++){X.beginPath();X.moveTo(i*7,-16);X.lineTo(i*9,14);X.stroke();}
 X.fillStyle="#fff6dc";X.fillRect(-4,8,8,5);X.restore();
}

/* ============================ state ============================ */
const S={phase:"idle",t:0,gt:0,list:[],best:3,idx:0,parts:[],rings:[],shake:0,flash:0,flashCol:"#ffffff",bars:0,slow:1,flared:false,cues:{}};


/* ---- particles ---- */
function spark(x,y,col,o={}){if(S.parts.length>1600)return;const a=o.a!==undefined?o.a:rand(0,TAU),v=o.v!==undefined?o.v:rand(40,220);S.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:o.life||rand(.4,1),max:o.life||1,size:o.size||rand(2,5),col,drag:o.drag||1.6,g:o.g||0,kind:o.kind||"glow"});}
function ring(x,y,r0,r1,col,life,w,flat){S.rings.push({x,y,r0,r1,col,life,max:life,w,flat:flat===undefined?.3:flat});}
function updParts(dt){for(const p of S.parts){p.life-=dt;const d=Math.exp(-p.drag*dt);p.vx*=d;p.vy=p.vy*d+p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}S.parts=S.parts.filter(p=>p.life>0);for(const r of S.rings)r.life-=dt;S.rings=S.rings.filter(r=>r.life>0);}
function drawParts(){X.globalCompositeOperation="lighter";
 for(const p of S.parts){const k=clamp(p.life/p.max,0,1);if(p.kind==="streak"){X.strokeStyle=rgba(p.col,k);X.lineWidth=p.size*k;X.lineCap="round";X.beginPath();X.moveTo(p.x,p.y);X.lineTo(p.x-p.vx*.06,p.y-p.vy*.06);X.stroke();}else blob(p.x,p.y,p.size*(1.5+k*2),p.col,k);}
 for(const r of S.rings){const k=r.life/r.max,e=ease.out(1-k),rad=lerp(r.r0,r.r1,e);X.strokeStyle=rgba(r.col,k*.9);X.lineWidth=r.w*k+.5;X.beginPath();X.ellipse(r.x,r.y,rad,rad*r.flat,0,0,TAU);X.stroke();}
 X.globalCompositeOperation="source-over";}

/* ============================ shot list ============================ */
// Shot 1  "Vách đá"     the wisher on the cliff lifts a sky lantern
// Shot 2  "Lên trời"    follow the lantern through clouds; it bursts into the featured constellation
// Shot 3  "Sao băng"    a meteor rushes out of deep space (5★ disguises as 4★, then slow-motion flare)
// Shot 4  "Hạ giới"     wide shot: the meteor falls onto the bronze drum; shockwave across the sea
// Shot 5  "Hộ Tinh"     silhouette, rim light, colour floods in, name slams in
const SHOT={...CINEMATIC.shots};
function start(list){
 S.list=list;S.best=Math.max(...list.map(x=>x.r));S.order=[...list].sort((a,b)=>a.r-b.r);S.idx=0;
 S.phase="s1";S.t=0;S.parts=[];S.rings=[];S.flared=false;S.cues={};S.slow=1;S.flash=0;S.shake=0;
 ui.classList.add("off");skipBtn.hidden=false;hint.hidden=true;CIN.open();
 S.clouds=Array.from({length:26},(_,i)=>({x:rand(-.2,1.2),y:i/26*3.2,r:rand(.18,.4),c:i%3?"#5b6aa8":"#7a6aa8"}));
 S.meteors=[];const n=list.length>1?6:1;for(let i=0;i<n;i++)S.meteors.push({main:i===0,r:i===0?S.best:list[i].r,off:i===0?0:rand(-.25,.25),delay:i===0?0:.1+i*.07,trail:[]});
}
function cue(name,fn){if(!S.cues[name]){S.cues[name]=1;fn();}}
function go(ph){S.phase=ph;S.t=0;}
function enterReveal(){S.phase="reveal";S.t=0;S.idx=0;onItem();}
function onItem(){const it=S.order[S.idx];S.t=0;S.parts=[];S.rings=[];S.flash=it.r===5?.6:.35;S.flashCol=RC[it.r];S.starsShown=0;S.revealCue=false;}
function nextItem(){S.idx++;if(S.idx>=S.order.length){if(S.list.length>1){go("summary");S.parts=[];hint.textContent="Chạm để quay lại";hint.hidden=false;skipBtn.hidden=true;S.lastCard=-1;}else finish();}else onItem();}
function finish(){hooks.done();ambienceFade();S.phase="idle";S.t=0;S.parts=[];S.rings=[];S.slow=1;ui.classList.remove("off");skipBtn.hidden=true;hint.hidden=true;updPity();}
function skip(){if(S.phase==="summary"||S.phase==="idle")return;ambienceFade();S.slow=1;if(S.phase==="reveal"){if(S.list.length>1){go("summary");S.parts=[];skipBtn.hidden=true;hint.textContent="Chạm để quay lại";hint.hidden=false;S.lastCard=-1;}else finish();}else enterReveal();}

/* ============================ update ============================ */
function update(rdt){
 const dt=rdt*S.slow;S.t+=dt;S.gt+=rdt;S.shake=Math.max(0,S.shake-rdt*36);S.flash=Math.max(0,S.flash-rdt*1.4);
 const cin=["s1","s2","s3","s4"].includes(S.phase);S.bars=clamp(S.bars+(cin?rdt:-rdt)*3,0,1);
 if(S.phase==="idle"){if(Math.random()<rdt*10)spark(rand(0,W),H+10,"#ffd68c",{a:-Math.PI/2+rand(-.3,.3),v:rand(20,60),drag:.2,life:rand(3,6),size:rand(1,2.2)});}
 else if(S.phase==="s1"){
  const k=S.t/SHOT.s1;
  if(S.t>1.0)cue("lantern",CIN.lantern);
  if(S.t>=SHOT.s1){go("s2");CIN.rise();}
 }
 else if(S.phase==="s2"){
  const k=S.t/SHOT.s2;
  if(S.t>.9){const ln=Math.floor((S.t-.9)/.08);if(ln>=0&&ln<BIRD_EDGES.length)cue("l"+ln,()=>CIN.line(ln));}
  if(S.t>.85)cue("burst",()=>{CIN.burstStars();S.flash=.35;S.flashCol="#ffe1a0";for(let i=0;i<90;i++)spark(W/2,H*.55,i%2?"#ffd68c":"#ffffff",{v:rand(80,520),life:rand(.6,1.4)});});
  if(S.t>=SHOT.s2){go("s3");CIN.meteor();}
 }
 else if(S.phase==="s3"){
  const k=clamp(S.t/SHOT.s3,0,1);
  const m=S.meteors[0];
  if(S.best===5&&k>.55&&!S.flared){S.flared=true;S.slow=CINEMATIC.slowMo;S.flash=.7;S.flashCol=RC[5];CIN.slowmo();for(let i=0;i<120;i++)spark(m.x||W/2,m.y||H/2,i%2?RC[5]:"#ffffff",{v:rand(150,700),life:rand(.6,1.4),size:rand(2,5)});ring(m.x||W/2,m.y||H/2,10,Math.max(W,H)*.5,RC[5],1.2,10,1);}
  if(S.flared&&S.slow<1&&k>.72)S.slow=Math.min(1,S.slow+rdt*2.5);
  if(S.t>=SHOT.s3){S.slow=1;go("s4");CIN.descend();}
 }
 else if(S.phase==="s4"){
  if(S.t>1.0)cue("impact",()=>{SFX.impact(S.best);S.shake=reduce?0:(S.best===5?24:S.best===4?15:9);S.flash=1;S.flashCol=RC[S.best];});
  if(S.t>=SHOT.s4)enterReveal();
 }
 else if(S.phase==="reveal"){
  const it=S.order[S.idx],col=RC[it.r];
  if(S.t>.55&&!S.revealCue){S.revealCue=true;SFX.reveal(it.r);}
  if(Math.random()<(it.r===5?.9:.45))spark(rand(0,W),H+10,it.r===5?(Math.random()<.5?RC[5]:"#fff2c8"):col,{a:-Math.PI/2+rand(-.25,.25),v:rand(40,160),drag:.3,life:rand(2,4),size:rand(1.5,3.5)});
  const want=Math.min(it.r,Math.floor(clamp((S.t-1.15)/.15,0,9)));while(S.starsShown<want){SFX.star(S.starsShown,it.r);S.starsShown++;}
 }
 else if(S.phase==="summary"){if(Math.random()<.5)spark(rand(0,W),H+10,"#ffd68c",{a:-Math.PI/2,v:rand(20,60),drag:.2,life:4,size:rand(1,2)});const shown=Math.floor(S.t/.07);if(shown<=S.list.length&&shown!==S.lastCard){S.lastCard=shown;if(shown>0)SFX.card();}}
 updParts(rdt);
}

/* ============================ shots ============================ */
function shot1(t){
 const k=S.t/SHOT.s1,e=ease.inOut(clamp(k,0,1));
 cam={x:lerp(760,520,e),y:lerp(470,520,e),z:lerp(1,1.55,e)};
 const arm=clamp((S.t-.5)/.6,0,1);const lt=clamp((S.t-1.0)/1.6,0,1);
 const lantern=S.t>1.0?{x:FIG.x-30+Math.sin(lt*4)*10,y:lerp(FIG.y-150,FIG.y-560,ease.in(lt)),s:lerp(1,.7,lt)}:null;
 X.save();applyCam();drawSet(t,{arm:ease.out(arm),lantern,drumGlow:.08});X.restore();
}
function shot2(t){
 const k=clamp(S.t/SHOT.s2,0,1);
 // the sky as the camera tilts up after the lantern
 const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,mix("#0b1030","#02030a",k));g.addColorStop(1,mix("#24305e","#0a0d24",k));X.fillStyle=g;X.fillRect(0,0,W,H);
 const scroll=ease.out(k)*H*2.6;
 for(const s of stars){const y=((s.y*H*1.4+scroll*s.d*.35)%(H*1.4))-H*.2;X.globalAlpha=(.3+.6*Math.abs(Math.sin(t*.8+s.p)))*(.4+k*.6);X.fillStyle="#e9ecff";X.fillRect(s.x*W,y,s.r,s.r+scroll*.0008*s.d*40);}X.globalAlpha=1;
 X.globalCompositeOperation="lighter";
 for(const c of S.clouds){const y=(c.y*H-scroll*1.2+H*3)%(H*3.2)-H*.4;blob(c.x*W,y,c.r*Math.max(W,H),c.c,.22*(1-k*.6));}
 X.globalCompositeOperation="source-over";
 // lantern rises and bursts into the constellation
 const lx=W/2+Math.sin(S.t*3)*8,ly=lerp(H*.75,H*.55,ease.out(clamp(S.t/.85,0,1)));
 if(S.t<.85){X.save();X.translate(0,0);drawLanternScreen(lx,ly,lerp(1.4,.8,S.t/.85),t);X.restore();}
 const R=Math.min(W,H)*.42,cx=W/2,cy=H*.5;
 if(S.t>.85){
  const lk=clamp((S.t-.9)/(BIRD_EDGES.length*.08),0,1),edges=Math.floor(lk*BIRD_EDGES.length),part=lk*BIRD_EDGES.length-edges;
  X.save();X.translate(cx,cy);X.rotate(-.08+S.t*.03);X.globalCompositeOperation="lighter";
  X.strokeStyle="rgba(201,154,91,.35)";X.lineWidth=1;for(const kk of [1.25,1.05]){X.beginPath();X.ellipse(0,0,R*kk,R*kk*.92,0,0,TAU*Math.min(1,(S.t-.85)*1.5));X.stroke();}
  X.strokeStyle="rgba(255,214,140,.85)";X.lineWidth=2.2;X.shadowColor="#ffd68c";X.shadowBlur=12;
  for(let i=0;i<Math.min(BIRD_EDGES.length,edges+1);i++){const [a,b]=BIRD_EDGES[i];const f=i<edges?1:part;const A=BIRD[a],B=BIRD[b];X.beginPath();X.moveTo(A[0]*R,A[1]*R);X.lineTo(lerp(A[0],B[0],f)*R,lerp(A[1],B[1],f)*R);X.stroke();}
  X.shadowBlur=0;BIRD.forEach((p,i)=>blob(p[0]*R,p[1]*R,10+4*Math.sin(t*3+i),"#ffd68c",clamp((S.t-.85)*3-i*.1,0,1)));
  X.restore();X.globalCompositeOperation="source-over";
  X.textAlign="center";X.globalAlpha=clamp((S.t-1.3)/.4,0,1)*(1-clamp((S.t-2)/.2,0,1));X.font=`italic 600 ${Math.round(Math.min(W*.03,30))}px "Cormorant Garamond",Georgia,serif`;X.fillStyle="#ffe7b8";X.fillText("Chòm Hồng Điểu",cx,cy+R*.62);X.globalAlpha=1;
 }
 drawParts();
}
function drawLanternScreen(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);X.globalCompositeOperation="lighter";blob(0,0,90,"#ffb24a",.9);blob(0,0,30,"#ffe7b0",1);X.globalCompositeOperation="source-over";X.fillStyle="#ffd58a";X.beginPath();X.moveTo(-14,-20);X.lineTo(14,-20);X.lineTo(18,18);X.lineTo(-18,18);X.closePath();X.fill();X.fillStyle="#fff6dc";X.fillRect(-5,10,10,6);X.restore();}
function shot3(t){
 const k=clamp(S.t/SHOT.s3,0,1);
 X.fillStyle="#02030a";X.fillRect(0,0,W,H);
 const vx=W*.72,vy=H*.28;
 // warp starfield streaking away from the vanishing point
 const speed=.4+ease.in(k)*2.2;
 for(let i=0;i<stars.length;i++){const s=stars[i];const a=s.p*10,d=((s.y+S.gt*.25*s.d*speed)%1);const r=Math.pow(d,2)*Math.hypot(W,H);const x=vx+Math.cos(a)*r,y=vy+Math.sin(a)*r;const len=Math.max(1,r*.06*speed);X.strokeStyle=`rgba(220,228,255,${.15+d*.7})`;X.lineWidth=s.r*(.5+d);X.beginPath();X.moveTo(x,y);X.lineTo(x-Math.cos(a)*len,y-Math.sin(a)*len);X.stroke();}
 X.globalCompositeOperation="lighter";
 for(const m of S.meteors){
  const tt=clamp((S.t-m.delay)/(SHOT.s3*.95),0,1);if(tt<=0)continue;const e=ease.in(tt);
  const x=lerp(vx,W*(-.15+m.off*.5),e)+Math.sin(e*3)*W*.05,y=lerp(vy,H*(1.05+m.off*.3),e);
  const size=lerp(2,m.main?Math.min(W,H)*.06:Math.min(W,H)*.02,e);
  let col=RC[m.r];if(m.main&&S.best===5)col=k<.55?RC[4]:mix(RC[4],RC[5],clamp((k-.55)/.06,0,1));
  m.x=x;m.y=y;m.col=col;m.trail.unshift({x,y,s:size});if(m.trail.length>40)m.trail.pop();
  for(let i=0;i<m.trail.length-1;i++){const f=1-i/m.trail.length,p=m.trail[i],q=m.trail[i+1];X.strokeStyle=rgba(col,f*.85);X.lineWidth=p.s*f*1.2;X.lineCap="round";X.beginPath();X.moveTo(p.x,p.y);X.lineTo(q.x,q.y);X.stroke();}
  blob(x,y,size*4,col,1);blob(x,y,size*1.3,"#ffffff",1);
  if(m.main){flareH(x,y,size*14,size*.9,col,.6);flareH(x,y,size*.9,size*6,col,.25);if(Math.random()<.9)spark(x,y,col,{v:rand(30,160),life:rand(.3,.7),size:rand(2,4)});}
 }
 X.globalCompositeOperation="source-over";
 drawParts();
}
function shot4(t){
 const k=clamp(S.t/SHOT.s4,0,1);const hit=clamp((S.t-1.0)/.9,0,1);
 cam={x:lerp(720,DRUM.x+60,ease.inOut(clamp(S.t/1.0,0,1))),y:lerp(380,560,ease.inOut(clamp(S.t/1.0,0,1))),z:lerp(.95,1.25,ease.inOut(clamp(S.t/1.2,0,1)))};
 const col=RC[S.best];
 const ripples=hit>0?[0,1,2].map(i=>({r:lerp(20,900,clamp(hit*1.2-i*.15,0,1)),a:.6*(1-clamp(hit*1.2-i*.15,0,1)),col})):null;
 X.save();applyCam();drawSet(t,{arm:1,drumGlow:hit>0?(1-hit)*1.2+.3:.1,drumCol:col,ripples});
 // falling meteor in world space
 X.globalCompositeOperation="lighter";
 if(S.t<1.0){const f=ease.in(S.t/1.0);const sx=1380,sy=-40,x=lerp(sx,DRUM.x,f),y=lerp(sy,DRUM.y,f);
  for(let i=0;i<24;i++){const g=i/24;const px=lerp(sx,DRUM.x,Math.max(0,f-g*.25)),py=lerp(sy,DRUM.y,Math.max(0,f-g*.25));blob(px,py,40*(1-g),col,.5*(1-g));}
  blob(x,y,90,col,1);blob(x,y,26,"#ffffff",1);}
 else{
  // shockwave dome and light pillars
  const D=DRUM;X.strokeStyle=rgba(col,.8*(1-hit));X.lineWidth=6*(1-hit)+1;X.beginPath();X.ellipse(D.x,D.y,lerp(20,1100,ease.out(hit)),lerp(8,260,ease.out(hit)),0,0,TAU);X.stroke();
  X.beginPath();X.ellipse(D.x,D.y,lerp(10,500,ease.out(hit)),lerp(10,500,ease.out(hit)),0,Math.PI,0);X.stroke();
  for(let i=0;i<S.best;i++){const px=D.x+(i-(S.best-1)/2)*48;const pg=X.createLinearGradient(0,D.y,0,D.y-900);pg.addColorStop(0,rgba(col,.85*(1-hit*.6)));pg.addColorStop(1,rgba(col,0));X.fillStyle=pg;X.fillRect(px-10*(1+hit),D.y-900,20*(1+hit),900);}
  if(!S.cues.burst4){S.cues.burst4=1;for(let i=0;i<160;i++)S.parts.push({x:D.x,y:D.y,vx:Math.cos(rand(Math.PI,TAU))*rand(100,700),vy:Math.sin(rand(Math.PI,TAU))*rand(100,700),life:rand(.6,1.4),max:1.4,size:rand(2,5),col:i%3?col:"#ffffff",drag:1.2,g:500,kind:"glow"});}
 }
 X.globalCompositeOperation="source-over";
 drawParts();X.restore();
}
/* ---- reveal: silhouette, rim light, colour flood ---- */
function silhouette(id,h,col){const key=id+h+col;if(silCache[key])return silCache[key];const a=charArt(id,h,true),c=document.createElement("canvas");c.width=a.width;c.height=a.height;const g=c.getContext("2d");g.drawImage(a,0,0);g.globalCompositeOperation="source-in";g.fillStyle=col;g.fillRect(0,0,c.width,c.height);silCache[key]=c;return c;}
function drawElementIcon(el,x,y,s){const c=EL[el].c;X.save();X.translate(x,y);X.strokeStyle=c;X.fillStyle=rgba(c,.25);X.lineWidth=Math.max(1.5,s*.09);X.lineJoin="round";X.beginPath();
 if(el==="fire"){X.moveTo(0,-s*.55);X.bezierCurveTo(s*.45,-s*.15,s*.4,s*.45,0,s*.5);X.bezierCurveTo(-s*.4,s*.45,-s*.45,-s*.05,-s*.1,-s*.2);X.bezierCurveTo(-s*.05,0,s*.05,-s*.2,0,-s*.55);}
 else if(el==="water"){X.moveTo(0,-s*.55);X.bezierCurveTo(s*.5,0,s*.4,s*.5,0,s*.5);X.bezierCurveTo(-s*.4,s*.5,-s*.5,0,0,-s*.55);}
 else if(el==="wind"){for(let i=0;i<40;i++){const a=i/40*TAU*1.6,r=s*.06+i/40*s*.45;X.lineTo(Math.cos(a)*r,Math.sin(a)*r);}}
 else if(el==="bolt"){X.moveTo(s*.1,-s*.55);X.lineTo(-s*.25,s*.05);X.lineTo(s*.05,s*.05);X.lineTo(-s*.1,s*.55);X.lineTo(s*.3,-s*.1);X.lineTo(0,-s*.1);X.closePath();}
 else if(el==="earth"){X.moveTo(0,-s*.55);X.lineTo(s*.45,0);X.lineTo(0,s*.55);X.lineTo(-s*.45,0);X.closePath();X.moveTo(-s*.45,0);X.lineTo(s*.45,0);}
 else{for(let i=0;i<6;i++){const a=i/6*TAU;X.moveTo(0,0);X.lineTo(Math.cos(a)*s*.5,Math.sin(a)*s*.5);X.moveTo(Math.cos(a)*s*.3,Math.sin(a)*s*.3);X.lineTo(Math.cos(a+.4)*s*.4,Math.sin(a+.4)*s*.4);}}
 if(el!=="wind"&&el!=="ice")X.fill();X.stroke();X.restore();}
function drawItemIcon(k,x,y,s,col){X.save();X.translate(x,y);X.rotate(-.6);X.globalCompositeOperation="lighter";blob(0,0,s*.9,col,.5);X.globalCompositeOperation="source-over";X.fillStyle="#cfd6e4";X.strokeStyle=col;X.lineWidth=2;
 if(k==="sword"){rr(X,-s*.04,-s*.5,s*.08,s*.75,3);X.fill();X.fillStyle=col;X.fillRect(-s*.16,s*.22,s*.32,s*.05);}
 else if(k==="great"){X.beginPath();X.moveTo(-s*.1,s*.25);X.lineTo(-s*.12,-s*.42);X.lineTo(0,-s*.55);X.lineTo(s*.12,-s*.42);X.lineTo(s*.1,s*.25);X.closePath();X.fill();X.fillStyle=col;X.fillRect(-s*.22,s*.25,s*.44,s*.06);}
 else if(k==="spear"){X.fillStyle="#7a5534";X.fillRect(-s*.03,-s*.4,s*.06,s*.95);X.fillStyle=col;X.beginPath();X.moveTo(0,-s*.6);X.lineTo(-s*.1,-s*.38);X.lineTo(s*.1,-s*.38);X.closePath();X.fill();}
 else if(k==="bow"){X.beginPath();X.arc(0,0,s*.45,-1.2,1.2);X.stroke();X.strokeStyle="#fff";X.lineWidth=1;X.beginPath();X.moveTo(Math.cos(-1.2)*s*.45,Math.sin(-1.2)*s*.45);X.lineTo(Math.cos(1.2)*s*.45,Math.sin(1.2)*s*.45);X.stroke();}
 else{rr(X,-s*.3,-s*.38,s*.6,s*.76,6);X.fill();X.fillStyle=col;X.fillRect(-s*.22,-s*.28,s*.44,s*.06);X.fillRect(-s*.22,-s*.12,s*.3,s*.04);}X.restore();}
function drawRays(x,y,col,a,t,n){X.save();X.translate(x,y);X.rotate(t*.12);X.globalCompositeOperation="lighter";X.fillStyle=rgba(col,a);const L=Math.hypot(W,H);for(let i=0;i<n;i++){X.rotate(TAU/n);X.beginPath();X.moveTo(0,0);X.lineTo(L,-L*.05);X.lineTo(L,L*.05);X.closePath();X.fill();}X.restore();X.globalCompositeOperation="source-over";}
function wrapText(txt,x,y,maxW,lh){const words=txt.split(" ");let line="",yy=y;for(const w of words){const test=line?line+" "+w:w;if(X.measureText(test).width>maxW&&line){X.fillText(line,x,yy);line=w;yy+=lh;}else line=test;}if(line)X.fillText(line,x,yy);}
function drawReveal(t){
 const it=S.order[S.idx],col=RC[it.r],land=W>=H*1.05;
 X.fillStyle="#04050c";X.fillRect(0,0,W,H);
 for(const s of stars){X.globalAlpha=.25+.4*Math.abs(Math.sin(t*.7*s.d+s.p));X.fillStyle="#e9ecff";X.fillRect(s.x*W,s.y*H,s.r,s.r);}X.globalAlpha=1;
 const cx=land?W*.66:W/2,cy=land?H*.5:H*.36;
 const lit=clamp((S.t-.55)/.45,0,1);
 const g=X.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*.7);g.addColorStop(0,rgba(col,.15+.3*lit));g.addColorStop(.5,rgba(col,.05+.06*lit));g.addColorStop(1,"rgba(0,0,0,0)");X.fillStyle=g;X.fillRect(0,0,W,H);
 drawRays(cx,cy,col,(it.r===5?.075:.045)*(.3+.7*lit),t,it.r===5?26:16);
 X.save();X.translate(cx,cy);X.rotate(t*.05);X.strokeStyle=rgba(col,.35*lit);X.lineWidth=1.2;const R0=Math.min(W,H)*(land?.4:.31);for(const k of [1,.86,.7]){X.beginPath();X.arc(0,0,R0*k,0,TAU);X.stroke();}for(let i=0;i<48;i++){const a=i/48*TAU;X.beginPath();X.moveTo(Math.cos(a)*R0,Math.sin(a)*R0);X.lineTo(Math.cos(a)*R0*(i%4?.97:.93),Math.sin(a)*R0*(i%4?.97:.93));X.stroke();}X.restore();
 if(it.kind==="char"){
  const ch=byId[it.id],h=Math.round(Math.min(H*(land?.96:.64),W*(land?.62:1.05))),art=charArt(it.id,h),w=art.width;
  const push=lerp(1.12,1,ease.out(clamp(S.t/1.1,0,1)));
  X.save();X.translate(cx,cy+h*.02);X.scale(push,push);const ax=-w/2,ay=-h*.52;
  // rim light behind the silhouette
  X.globalCompositeOperation="lighter";const rim=silhouette(it.id,h,col);X.globalAlpha=.55*(1-lit*.6);X.drawImage(rim,ax-4,ay-3);X.drawImage(rim,ax+4,ay-3);X.globalAlpha=1;X.globalCompositeOperation="source-over";
  X.drawImage(silhouette(it.id,h,"#06070f"),ax,ay);
  // colour floods in from the feet up
  if(lit>0){X.save();X.beginPath();X.rect(ax,ay+h*(1-ease.out(lit)),w,h*ease.out(lit)+2);X.clip();X.drawImage(charArt(it.id,h,true),ax,ay);X.restore();
   if(lit<1){X.globalCompositeOperation="lighter";const yb=ay+h*(1-ease.out(lit));const lg=X.createLinearGradient(0,yb-20,0,yb+20);lg.addColorStop(0,rgba(col,0));lg.addColorStop(.5,rgba(col,.9));lg.addColorStop(1,rgba(col,0));X.fillStyle=lg;X.fillRect(ax,yb-20,w,40);X.globalCompositeOperation="source-over";}}
  X.restore();
  if(S.t>.55&&S.t<.62&&!S.cues["b"+S.idx]){S.cues["b"+S.idx]=1;for(let i=0;i<(it.r===5?140:70);i++)spark(cx,cy,i%2?EL[ch.el].c:col,{v:rand(100,600),life:rand(.6,1.3),size:rand(2,5)});ring(cx,cy,20,Math.min(W,H)*.6,col,.9,8,1);}
  // text block
  const tx=land?Math.max(28,W*.07):W/2,ty=land?H*.52:H*.74;X.textAlign=land?"left":"center";
  const nameSize=Math.round(Math.min(land?W*.078:W*.12,100));
  const nk=clamp((S.t-.9)/.35,0,1),ns=lerp(1.5,1,ease.out(nk));
  X.globalAlpha=clamp((S.t-.75)/.35,0,1);X.font=`600 ${Math.max(12,Math.round(nameSize*.2))}px "Be Vietnam Pro",sans-serif`;X.fillStyle=EL[ch.el].c2;
  const elLine=`${ch.title} · ${EL[ch.el].vi}`;if(land){drawElementIcon(ch.el,tx+nameSize*.18,ty-nameSize*1.02,nameSize*.32);X.fillText(elLine,tx+nameSize*.42,ty-nameSize*.95);}else X.fillText(elLine,tx,ty-nameSize*.95);
  X.save();X.translate(tx,ty);X.scale(ns,ns);X.globalAlpha=nk;X.font=`700 ${nameSize}px "Cormorant Garamond",Georgia,serif`;X.shadowColor=rgba(col,.8);X.shadowBlur=26;X.fillStyle="#fbf5e6";X.fillText(ch.name,0,0);X.shadowBlur=0;X.restore();
  if(it.r===5&&S.t>1.3&&S.t<2.6){X.font=`700 ${nameSize}px "Cormorant Garamond",Georgia,serif`;const mw=X.measureText(ch.name).width,sx=land?tx:tx-mw/2,k=(S.t-1.3)/1.3;X.globalCompositeOperation="lighter";const lx=sx+mw*k*1.4-mw*.2;const lg=X.createLinearGradient(lx-40,0,lx+40,0);lg.addColorStop(0,"rgba(255,230,160,0)");lg.addColorStop(.5,"rgba(255,240,200,.55)");lg.addColorStop(1,"rgba(255,230,160,0)");X.fillStyle=lg;X.globalAlpha=1;X.fillText(ch.name,tx,ty);X.globalCompositeOperation="source-over";}
  const sy=ty+nameSize*.55,ss=Math.max(18,nameSize*.3);
  for(let i=0;i<it.r;i++){const st=clamp((S.t-1.15-i*.15)/.25,0,1);if(st<=0)continue;const sc=ease.back(st);const sx2=land?tx+ss*.6+i*ss*1.15:tx+(i-(it.r-1)/2)*ss*1.15;X.save();X.translate(sx2,sy);X.scale(sc,sc);X.globalAlpha=1;X.globalCompositeOperation="lighter";blob(0,0,ss*.9,col,.6*st);X.globalCompositeOperation="source-over";X.fillStyle=col;X.beginPath();for(let k=0;k<10;k++){const r=k%2?ss*.22:ss*.5,a=k/10*TAU-Math.PI/2;X.lineTo(Math.cos(a)*r,Math.sin(a)*r);}X.closePath();X.fill();X.restore();}
  X.globalAlpha=clamp((S.t-1.8)/.5,0,1);X.font=`italic 600 ${Math.max(14,Math.round(nameSize*.24))}px "Cormorant Garamond",Georgia,serif`;X.fillStyle="rgba(243,236,219,.85)";wrapText(`“${ch.line}”`,tx,sy+ss*1.5,land?Math.min(W*.42,520):W*.86,Math.max(18,nameSize*.3));
  X.font=`700 ${Math.max(11,Math.round(nameSize*.15))}px "Be Vietnam Pro",sans-serif`;X.fillStyle=col;X.fillText((it.isNew?"HỘ TINH MỚI":"ĐÃ GẶP LẠI · +1 CUNG MỆNH")+(it.feat?" · NHÂN VẬT GIỚI HẠN":""),tx,ty-nameSize*1.45);X.globalAlpha=1;
 }else{
  const enter=ease.out(clamp(S.t/.5,0,1));const s=Math.min(W,H)*.42;drawItemIcon(it.k,cx+(1-enter)*80,cy,s,col);
  X.textAlign="center";const tx=land?cx:W/2,ty=land?H*.86:H*.74;X.font=`700 ${Math.round(Math.min(W*.07,64))}px "Cormorant Garamond",Georgia,serif`;X.fillStyle="#f3ecdb";X.globalAlpha=enter;X.fillText(it.name,tx,ty);X.font=`600 14px "Be Vietnam Pro",sans-serif`;X.fillStyle=col;X.fillText("★★★ · đổi thành 500 Xu",tx,ty+30);X.globalAlpha=1;
 }
 drawParts();
 X.textAlign="center";X.font=`500 12px "Be Vietnam Pro",sans-serif`;X.fillStyle="rgba(243,236,219,.5)";X.fillText(`${S.idx+1}/${S.order.length} · chạm để tiếp tục`,W/2,H-18);
}
function drawSummary(t){
 X.fillStyle="#04050c";X.fillRect(0,0,W,H);for(const s of stars){X.globalAlpha=.3+.4*Math.abs(Math.sin(S.gt*.7*s.d+s.p));X.fillStyle="#e9ecff";X.fillRect(s.x*W,s.y*H,s.r,s.r);}X.globalAlpha=1;
 const items=[...S.list].sort((a,b)=>b.r-a.r),n=items.length,cols=n>5?5:n,rows=Math.ceil(n/cols);
 const gap=Math.max(6,W*.008),cw=Math.min((W-32)/cols-gap,200),ch=Math.min(cw*1.55,(H-130)/rows-gap),cwF=ch/1.55;
 const totalW=cols*(cwF+gap)-gap,ox=(W-totalW)/2,oy=(H-(rows*(ch+gap)-gap))/2+14;
 X.textAlign="center";X.font=`700 ${Math.round(Math.min(40,W*.05))}px "Cormorant Garamond",Georgia,serif`;X.fillStyle="#f3ecdb";X.fillText("Sao đã rơi",W/2,Math.max(40,oy-20));
 items.forEach((it,i)=>{const p=clamp((t-i*.07)/.35,0,1);if(p<=0)return;const x=ox+(i%cols)*(cwF+gap),y=oy+Math.floor(i/cols)*(ch+gap)+(1-ease.out(p))*30;const sx=Math.abs(Math.cos(Math.PI*(1-p)));const front=p>.5,col=RC[it.r];
  X.save();X.translate(x+cwF/2,y+ch/2);X.scale(Math.max(.02,sx),1);X.translate(-cwF/2,-ch/2);
  if(it.r===5&&front){X.globalCompositeOperation="lighter";blob(cwF/2,ch/2,cwF*1.1,col,.35+.15*Math.sin(S.gt*3));X.globalCompositeOperation="source-over";}
  rr(X,0,0,cwF,ch,10);X.save();X.clip();
  if(!front){X.fillStyle="#1a1630";X.fillRect(0,0,cwF,ch);X.strokeStyle="rgba(201,154,91,.5)";for(let k=1;k<5;k++){X.beginPath();X.arc(cwF/2,ch/2,cwF*.12*k,0,TAU);X.stroke();}}
  else if(it.kind==="char")X.drawImage(cardArt(it.id,200,310),0,0,cwF,ch);
  else{X.fillStyle="#1d2a44";X.fillRect(0,0,cwF,ch);drawItemIcon(it.k,cwF/2,ch*.42,cwF*.8,col);}
  if(front){const vg=X.createLinearGradient(0,ch*.55,0,ch);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,.75)");X.fillStyle=vg;X.fillRect(0,0,cwF,ch);X.fillStyle="#fff";X.font=`700 ${Math.max(10,Math.round(cwF*.11))}px "Be Vietnam Pro",sans-serif`;X.textAlign="center";X.fillText(it.name,cwF/2,ch-cwF*.2);X.fillStyle=col;X.font=`${Math.max(10,Math.round(cwF*.12))}px sans-serif`;X.fillText("★".repeat(it.r),cwF/2,ch-cwF*.06);}
  X.restore();X.strokeStyle=front?col:"rgba(201,154,91,.6)";X.lineWidth=2;rr(X,0,0,cwF,ch,10);X.stroke();X.restore();});
 drawParts();
}
function drawIdle(t){
 cam={x:640+Math.sin(t*.1)*20,y:500,z:1.08};X.save();applyCam();drawSet(t,{arm:0,drumGlow:.12+.06*Math.sin(t*2)});X.restore();
 // the featured constellation faintly in the sky
 X.save();X.globalCompositeOperation="lighter";const R=Math.min(W,H)*.22,cx=W*.62,cy=H*.24;X.strokeStyle="rgba(255,214,140,.35)";X.lineWidth=1.2;for(const [a,b] of BIRD_EDGES){X.beginPath();X.moveTo(cx+BIRD[a][0]*R,cy+BIRD[a][1]*R);X.lineTo(cx+BIRD[b][0]*R,cy+BIRD[b][1]*R);X.stroke();}BIRD.forEach((p,i)=>blob(cx+p[0]*R,cy+p[1]*R,5+2*Math.sin(t*2+i),"#ffd68c",.8));X.restore();
 // featured portrait floating over the sea
 const h=Math.round(Math.min(H*.62,W*.42)),art=charArt(FEATURED,h);X.globalAlpha=.95;X.drawImage(art,W*.7-art.width/2,H*.47-h*.5+Math.sin(t*1.2)*6);X.globalAlpha=1;
 drawParts();
}
function render(t){
 X.setTransform(DPR,0,0,DPR,0,0);
 const sh=S.shake?[rand(-S.shake,S.shake),rand(-S.shake,S.shake)]:[0,0];X.save();X.translate(sh[0],sh[1]);
 if(S.phase==="idle")drawIdle(t);else if(S.phase==="s1")shot1(t);else if(S.phase==="s2")shot2(t);else if(S.phase==="s3")shot3(t);else if(S.phase==="s4")shot4(t);else if(S.phase==="reveal")drawReveal(t);else if(S.phase==="summary")drawSummary(S.t);
 X.restore();
 if(S.flash>0){X.fillStyle=rgba(S.flashCol,Math.min(1,S.flash)*.85);X.fillRect(0,0,W,H);}
 // cinematic letterbox and a brief dip between shots
 if(S.bars>0){const bh=H*.1*ease.out(S.bars);X.fillStyle="#000";X.fillRect(0,0,W,bh);X.fillRect(0,H-bh,W,bh);}
 if(["s1","s2","s3","s4"].includes(S.phase)&&S.t<.12){X.fillStyle=`rgba(0,0,0,${1-S.t/.12})`;X.fillRect(0,0,W,H);}
}


let last=0,raf=0;
function frame(now){const dt=last?Math.min(.05,(now-last)/1000):1/60;last=now;try{update(dt);render(now/1000);}catch(e){console.error(e);}if(S.phase!=="idle")raf=requestAnimationFrame(frame);else raf=0;}
function tap(){if(S.phase==="reveal"){if(S.t<2){S.t=2.2;S.starsShown=S.order[S.idx].r;if(!S.revealCue){S.revealCue=true;}}else nextItem();}else if(S.phase==="summary"){if(S.t>.6)finish();}}
return {
  S,
  resize,
  tap,
  skip,
  play(list){FEATURED=hooks.featured();resize();start(list);last=0;if(!raf)raf=requestAnimationFrame(frame);},
  stop(){S.phase="idle";if(raf)cancelAnimationFrame(raf);raf=0;ambienceFade();},
  clearCache(){for(const k in artCache)delete artCache[k];for(const k in cardCache)delete cardCache[k];for(const k in silCache)delete silCache[k];},
};
}
