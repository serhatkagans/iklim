// İklim Sözlüğü tema görseli: maviden kırmızıya ısınma şeritlerinden bir yayla çevrili, Türkiye merkezli gerçek dünya küresi
// (Natural Earth verisi, globe-paths.ts); önünde Toroslar, rüzgâr türbinleri, güneş panelleri, Yivli Minare, palmiyeler ve Akdeniz.
// Kırmızı vurgu rengidir (Türkiye, sıcaklık, yayın sıcak ucu); doğa kendi renkleriyle çizilir. Yaydaki şeritler veri değil, süslemedir.
import {useId} from 'react';
import {antalya,graticule,land,turkey} from './globe-paths';

// Sayfadaki şeritler için kırmızı palet: açık tondan koyu kırmızıya.
export const heat=['#fde7dc','#fbd0bd','#f8b49b','#f39478','#ec7458','#e2553f','#d43a2c','#c4161c','#a51218','#860e14','#650b10'];
const pick=(t:number,scale=heat)=>scale[Math.max(0,Math.min(scale.length-1,Math.round(t*(scale.length-1))))];
// Görseldeki yay: ısınma şeritlerinin bilinen maviden kırmızıya renkleri.
const warming=['#08306b','#08519c','#2171b5','#4292c6','#6baed6','#9ecae1','#c6dbef','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d'];

export function HeatStripes({count=44,className='heat-stripes'}:{count?:number;className?:string}){
 // Soldan sağa ısınma: renk dizisinde yumuşak, hafif dalgalı bir ilerleme.
 const bars=Array.from({length:count},(_,i)=>pick(i/(count-1)+Math.sin(i*1.7)*.09+Math.sin(i*.6)*.05));
 return <div className={className} aria-hidden="true">{bars.map((c,i)=><span key={i} style={{background:c}}/>)}</div>;
}

// Halka dilimi: merkez (cx,cy), iç/dış yarıçap, başlangıç ve bitiş açısı (derece, saat yönünde, tepeden).
function arc(cx:number,cy:number,r1:number,r2:number,a:number,b:number){
 const p=(r:number,d:number)=>{const t=(d-90)*Math.PI/180;return `${(cx+r*Math.cos(t)).toFixed(2)} ${(cy+r*Math.sin(t)).toFixed(2)}`;};
 return `M${p(r2,a)} A${r2} ${r2} 0 0 1 ${p(r2,b)} L${p(r1,b)} A${r1} ${r1} 0 0 0 ${p(r1,a)}Z`;
}

function Turbine({x,y,h,speed}:{x:number;y:number;h:number;speed:number}){
 const blade='M0 0 C3.2 -9 3 -28 0 -40 C-3 -28 -3.2 -9 0 0Z',s=h/90;
 return <g><path d={`M${x-2.2} ${y} L${x-1} ${y-h} L${x+1} ${y-h} L${x+2.2} ${y}Z`} fill="#ffffff"/>
 <g transform={`translate(${x} ${y-h}) scale(${s})`}><g>{[0,120,240].map(r=><path key={r} d={blade} fill="#ffffff" transform={`rotate(${r})`}/>)}<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={`${speed}s`} repeatCount="indefinite"/></g><circle r="3.4" fill="#ffffff" stroke="#9aa5ae" strokeWidth="1.2"/></g></g>;
}

// Palmiye: halkalı, incelen gövde; tüylü (yaprakçıklı) sarkan yapraklar ve hurma salkımı.
const qb=(a:number[],b:number[],c:number[],t:number)=>[0,1].map(k=>(1-t)*(1-t)*a[k]+2*(1-t)*t*b[k]+t*t*c[k]);
const f1=(n:number)=>n.toFixed(1);
function Frond({x,y,a,l,color}:{x:number;y:number;a:number;l:number;color:string}){
 const r=a*Math.PI/180,dx=Math.cos(r),dy=Math.sin(r),B=[x,y],C=[x+dx*l*.55,y+dy*l*.55-l*.28],E=[x+dx*l,y+dy*l+l*.32];
 const leaflets=Array.from({length:9},(_,i)=>{const t=.14+i*.095,[px,py]=qb(B,C,E,t),[qx,qy]=qb(B,C,E,t+.01),m=Math.hypot(qx-px,qy-py),tx=(qx-px)/m,ty=(qy-py)/m,len=10*(1-t*.55);
  return [55,-55].map(g=>{const gr=g*Math.PI/180,ux=tx*Math.cos(gr)-ty*Math.sin(gr),uy=tx*Math.sin(gr)+ty*Math.cos(gr);return `M${f1(px)} ${f1(py)} q${f1(ux*len*.5)} ${f1(uy*len*.5)} ${f1(ux*len)} ${f1(uy*len+len*.45)}`;}).join(' ');}).join(' ');
 return <g stroke={color} fill="none" strokeLinecap="round"><path d={`M${x} ${y} Q${f1(C[0])} ${f1(C[1])} ${f1(E[0])} ${f1(E[1])}`} strokeWidth="2"/><path d={leaflets} strokeWidth="1.7"/></g>;
}
function Palm({x,y,h,flip=false,delay=0}:{x:number;y:number;h:number;flip?:boolean;delay?:number}){
 const d=flip?-1:1,P0=[x,y],P1=[x+d*2,y-h*.5],P2=[x+d*10,y-h],[tx,ty]=P2;
 const side=(sgn:number)=>Array.from({length:11},(_,i)=>{const t=i/10,[px,py]=qb(P0,P1,P2,t),[qx,qy]=qb(P0,P1,P2,Math.min(1,t+.01)),[rx,ry]=t<1?[qx-px,qy-py]:[px-qb(P0,P1,P2,.99)[0],py-qb(P0,P1,P2,.99)[1]],m=Math.hypot(rx,ry),w=(3.4-t*1.4)*sgn;return `${f1(px-ry/m*w)} ${f1(py+rx/m*w)}`;});
 const trunk=`M${side(1).join(' L')} L${side(-1).reverse().join(' L')}Z`;
 const rings=Array.from({length:10},(_,i)=>{const t=.06+i*.09,[px,py]=qb(P0,P1,P2,t),w=3.4-t*1.4;return `M${f1(px-w)} ${f1(py)} q${f1(w)} ${f1(1.6)} ${f1(w*2)} 0`;}).join(' ');
 const fr=(as:number[],l:number,c:string)=>as.map(a=><Frond key={a} x={tx} y={ty} a={flip?180-a:a} l={l} color={c}/>);
 return <g><path d={trunk} fill="#8a6446"/><path d={rings} stroke="#6b4a33" strokeWidth="1.1" fill="none"/>
 <g className="ca-palm" style={{transformOrigin:`${tx}px ${ty}px`,animationDelay:`${-delay}s`}}>
 {fr([-150,-30,-95],h*.36,'#35684a')}{fr([-175,-120,-62,-5,160,22],h*.42,'#4f8a5b')}
 <g fill="#d9902a">{[[-2.6,3],[1.4,3.8],[-.4,5.6],[3.2,2]].map(([a,b],i)=><circle key={i} cx={tx+d*a} cy={ty+b} r="1.7"/>)}</g>
 <circle cx={tx} cy={ty} r="2.6" fill="#6b4a33"/></g></g>;
}

export default function ClimateArt({className='climate-art'}:{className?:string}){
 const id=useId().replace(/:/g,''),card=`card${id}`,globe=`globe${id}`,ocean=`ocean${id}`,sea=`sea${id}`,shine=`shine${id}`,sky=`sky${id}`,panels=`panels${id}`,moon=`moon${id}`;
 const cx=240,cy=206,R=110,segs=45,[ax,ay]=antalya;
 return <svg className={className} viewBox="0 0 480 480" role="img" aria-label="Maviden kırmızıya ısınma şeritleriyle çevrili dünya küresi; Türkiye kırmızıyla, Antalya işaretli. Önde güneş, Toros dağları, rüzgâr türbinleri, bir eve elektrik veren güneş panelleri, şarj olan elektrikli araç, damla sulamalı sera, Antalya'nın Yivli Minaresi, palmiyeler ve Akdeniz'de bir yelkenli. Sahne gündüzden geceye döner.">
 <defs>
  <clipPath id={card}><rect width="480" height="480" rx="28"/></clipPath>
  <clipPath id={globe}><circle cx={cx} cy={cy} r={R}/></clipPath>
  <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fdf8f3"/><stop offset="1" stopColor="#fbeee4"/></linearGradient>
  <radialGradient id={ocean} cx=".38" cy=".32" r=".78"><stop offset="0" stopColor="#7fb6dc"/><stop offset=".6" stopColor="#3f86bd"/><stop offset="1" stopColor="#1d4f7d"/></radialGradient>
  <radialGradient id={shine} cx=".3" cy=".25" r=".55"><stop offset="0" stopColor="#fff" stopOpacity=".38"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
  <linearGradient id={sea} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3f86bd"/><stop offset="1" stopColor="#1d4f7d"/></linearGradient>
  <mask id={moon}><circle r="12" fill="#fff"/><circle cx="5" cy="-4" r="10" fill="#000"/></mask>
  <clipPath id={panels}><path d="M6 0 L58 0 L50 -24 L0 -24Z M68 0 L120 0 L112 -24 L62 -24Z"/></clipPath>
 </defs>
 <g clipPath={`url(#${card})`}>
 <rect width="480" height="480" fill={`url(#${sky})`}/>
 <circle cx={cx} cy={cy} r="196" fill="#f6e7da"/>
 {/* Isınma yayı: soldan sağa, maviden kırmızıya */}
 {Array.from({length:segs},(_,i)=>{const s=270/segs,a=225+i*s;return <path key={i} className="ca-arc" style={{animationDelay:`${i*.05}s`}} d={arc(cx,cy,R+11,R+28,a+.5,a+s-.5)} fill={pick(i/(segs-1),warming)}/>;})}
 {/* Dünya: Natural Earth kıyı çizgileri, Türkiye kırmızı */}
 <circle cx={cx} cy={cy} r={R} fill={`url(#${ocean})`}/>
 <g clipPath={`url(#${globe})`}>
  <path d={graticule} fill="none" stroke="#ffffff" strokeOpacity=".22" strokeWidth=".8"/>
  <path d={land} fill="#efe1cc" stroke="#d9c4a6" strokeWidth=".6" strokeLinejoin="round"/>
  <path d={turkey} fill="#c4161c" stroke="#8f1015" strokeWidth=".6" strokeLinejoin="round"/>
  <circle cx={cx} cy={cy} r={R} fill={`url(#${shine})`}/>
 </g>
 <circle cx={cx} cy={cy} r={R} fill="none" stroke="#1d4f7d" strokeOpacity=".35"/>
 {/* Antalya işareti ve etiketi */}
 <circle cx={ax} cy={ay} r="2.2" fill="#ffffff"/><circle cx={ax} cy={ay} r="3" fill="none" stroke="#ffffff" strokeWidth="1.2"><animate attributeName="r" values="3;12" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".95;0" dur="2.2s" repeatCount="indefinite"/></circle>
 <g transform={`translate(${ax} ${ay+30})`}><path d="M-5 -12 L0 -18 L5 -12Z" fill="#3a0709"/><rect x="-38" y="-12" width="76" height="24" rx="12" fill="#3a0709"/><text y="4" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="10" letterSpacing="1.6" fill="#ffffff">ANTALYA</text></g>
 {/* Termometre rozeti */}
 <g transform="translate(26 30)"><rect width="104" height="34" rx="17" fill="#fff" stroke="#ecd9cb"/><g transform="translate(20 17)"><rect x="-3" y="-11" width="6" height="16" rx="3" fill="none" stroke="#c4161c" strokeWidth="1.6"/><circle cy="7" r="4.6" fill="#c4161c"/><rect className="ca-mercury" x="-1.2" y="-4" width="2.4" height="10" fill="#c4161c"/></g><text x="64" y="22" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontWeight="800" fontSize="15" fill="#c4161c">+1,5°C</text></g>
 {/* Güneş */}
 <g transform="translate(436 52)"><g className="ca-sun"><circle className="ca-glow" r="22" fill="#f9c23c" opacity=".35"/>
 <g className="ca-rays" stroke="#f5a623" strokeWidth="2.6" strokeLinecap="round">{[0,45,90,135,180,225,270,315].map(r=><line key={r} y1="-18" y2="-25" transform={`rotate(${r})`}/>)}</g><circle r="13" fill="#f9c23c"/></g></g>
 {/* Kuşlar */}
 <g fill="none" stroke="#5b4a42" strokeWidth="1.6" strokeLinecap="round">{[[96,104,1],[118,92,.8],[372,112,.9]].map(([x,y,s],i)=><g key={i} className="ca-bird" style={{animationDelay:`${-i*2.7}s`}}><path className="ca-wing" style={{animationDelay:`${-i*.25}s`}} d={`M${x-7*s} ${y} q${3.5*s} ${-4*s} ${7*s} 0 q${3.5*s} ${-4*s} ${7*s} 0`}/></g>)}</g>
 {/* Toroslar ve türbinler */}
 <path d="M0 304 L40 276 L74 292 L118 254 L156 286 L196 272 L222 288 L252 300 L300 282 L338 296 L380 270 L420 292 L480 278 V480 H0Z" fill="#c9b6a6"/>
 <path d="M118 254 L132 266 L124 268 L112 262Z M380 270 L394 279 L386 281Z" fill="#ffffff" opacity=".7"/>
 <Turbine x={70} y={292} h={92} speed={9}/>
 <Turbine x={128} y={276} h={70} speed={7}/>
 <path d="M0 344 C70 322 140 324 210 338 C290 354 370 328 480 336 V480 H0Z" fill="#8fae7e"/>
 {/* Yivli Minare: taş kaide, yivli tuğla gövde, firuze çini bandı, şerefe ve kurşun külah */}
 <g><title>Yivli Minare, Antalya</title>
 <rect x="396" y="300" width="44" height="40" rx="2" fill="#b9a48f"/><path d="M412 340 V327 A6 6 0 0 1 424 327 V340Z" fill="#6b4a3a"/>
 <rect x="405" y="230" width="26" height="72" fill="#b4533a"/>
 <g strokeWidth="1.6">{[409.3,413.7,418,422.3,426.7].map(x=><g key={x}><line x1={x} y1="236" x2={x} y2="302" stroke="#8a3a28"/><line x1={x+1.6} y1="236" x2={x+1.6} y2="302" stroke="#d9805f" strokeWidth=".8"/></g>)}</g>
 <rect x="405" y="231" width="26" height="4" fill="#2a9d8f"/>
 <rect x="400" y="222" width="36" height="8" rx="2" fill="#8a3a28"/><rect x="410" y="194" width="16" height="28" fill="#b4533a"/><rect x="410" y="204" width="16" height="3" fill="#2a9d8f"/>
 <path d="M407 195 L418 166 L429 195Z" fill="#7b8794"/><line x1="418" y1="166" x2="418" y2="158" stroke="#7b8794" strokeWidth="1.4"/><circle cx="418" cy="156" r="2.2" fill="#7b8794"/></g>
 <g transform="translate(418 138)"><rect x="-37" y="-9" width="74" height="18" rx="9" fill="#fff" stroke="#ecd9cb"/><text y="3" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="7.5" letterSpacing="1" fill="#8a3a28">YİVLİ MİNARE</text></g>
 <Palm x={452} y={352} h={74}/>
 <Palm x={366} y={360} h={58} flip delay={1.8}/>
 {/* Güneş panelleri: parlayan yüzey, şimşekler ve eve akan elektrik */}
 <g transform="translate(36 362)">{[0,62].map(dx=><g key={dx} transform={`translate(${dx} 0)`}><path d="M9 1 L5 12 M51 1 L55 12" stroke="#7d8a95" strokeWidth="2.4" strokeLinecap="round"/><path d="M9 4 L30 1 L51 4" stroke="#7d8a95" strokeWidth="1.2" fill="none"/>
 {[5,55].map(x=><rect key={x} x={x-3.5} y="11" width="7" height="2.6" rx="1" fill="#b7aea3"/>)}
 <rect x="2" y="0" width="60" height="2.2" rx="1" fill="#9aa6b0"/>
 <path d="M6 0 L58 0 L50 -24 L0 -24Z" fill="#1f3d58" stroke="#d3dbe2" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6 0 L32 0 L25 -24 L0 -24Z" fill="#24476a"/>
 <g stroke="#7fa6c6" strokeWidth=".7">{[13,26,39].map(x=><line key={x} x1={x*.86+6+(x===26?0:0)} y1="0" x2={x*.86} y2="-24"/>)}{[-6,-12,-18].map(y=><line key={y} x1={-y*.25} y1={y} x2={58+y/3} y2={y}/>)}</g>
 <rect x="27" y="1" width="6" height="4" rx=".8" fill="#4b5560"/>
 <g className="ca-solar"><path className="ca-bolt" style={{animationDelay:`${dx/80}s`}} d="M30 -38 L24 -29 L28.5 -29 L26 -21 L33 -31 L28.5 -31Z" fill="#f5b700"/></g></g>)}
 <g className="ca-solar" clipPath={`url(#${panels})`}><path className="ca-glint" d="M0 0 L9 0 L17 -24 L8 -24Z" fill="#ffffff" opacity=".4"/></g></g>
 <path d="M66 367 V372 M128 367 V372 M66 372 H128 C150 372 160 365 173 365" fill="none" stroke="#4b5560" strokeWidth="1.3"/>
 <g className="ca-solar"><path className="ca-current" d="M66 372 H128 C150 372 160 365 173 365" fill="none" stroke="#ffcf33" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="1.5 6.5"/></g>
 {/* Akdeniz evi: beyaz duvar, kiremit çatı, firuze panjur ve kapı, ışığı yanan pencere */}
 <g transform="translate(176 374)"><ellipse cx="20" cy="1" rx="26" ry="2.6" fill="#3a2a20" opacity=".14"/>
 <rect x="29" y="-40" width="5" height="12" fill="#a8432f"/>
 <rect y="-24" width="40" height="24" fill="#fffaf2"/><rect x="32" y="-24" width="8" height="24" fill="#efe4d4"/>
 <path d="M-5 -23 L20 -40 L45 -23Z" fill="#c8553d"/><g stroke="#a8432f" strokeWidth="1" strokeLinecap="round">{[[6,-31,14,-31],[2,-27,38,-27],[22,-35,30,-35]].map(([a,b,c,d],i)=><line key={i} x1={a} y1={b} x2={c} y2={d}/>)}</g><rect x="-5" y="-24" width="50" height="3" rx="1" fill="#a8432f"/>
 <rect x="2.5" y="-18" width="2.5" height="10" fill="#2a9d8f"/><rect x="15" y="-18" width="2.5" height="10" fill="#2a9d8f"/>
 <rect className="ca-window" x="5" y="-18" width="10" height="10" fill="#ffd34d"/><path d="M10 -18 V-8 M5 -13 H15" stroke="#c9a26b" strokeWidth=".8"/>
 <path d="M22 0 V-11 A5 5 0 0 1 32 -11 V0Z" fill="#2a9d8f"/><circle cx="30" cy="-6" r=".9" fill="#fffaf2"/>
 <rect x="-3" y="-11" width="3" height="5" rx=".6" fill="#7b8794"/></g>
 {/* Şarj istasyonu ve elektrikli araç: ekranda dolan pil */}
 <g transform="translate(225 380)"><ellipse cx="29" cy="1" rx="21" ry="2" fill="#3a2a20" opacity=".16"/>
 <rect y="-22" width="7" height="22" rx="2" fill="#2a9d8f"/><rect x="1.5" y="-19" width="4" height="6" rx=".8" fill="#e8f7f4"/><rect className="ca-charge" x="2.2" y="-15" width="2.6" height="1.6" fill="#4caf50"/>
 <path d="M7 -10 C10 -10 11 -8.5 13.5 -8.5" fill="none" stroke="#2d2d2d" strokeWidth="1.3"/>
 <path d="M12 -5.5 Q12 -9.4 15 -10.2 L20.5 -11.2 Q24.5 -17.6 30.5 -17.6 H35 Q39.2 -17.6 42 -12.2 L45.2 -11.3 Q47.4 -10.6 47.4 -8 V-5.6 Q47.4 -4 45.8 -4 H13.4 Q12 -4 12 -5.5Z" fill="#c4161c"/>
 <path d="M22 -11.2 Q25.4 -16.2 30.5 -16.2 H34.6 Q37.8 -16.2 40.2 -11.6Z" fill="#bfdcf0"/><path d="M24.6 -12.4 Q26.6 -15 29.6 -15.2" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".7"/>
 <line x1="31.6" y1="-16.4" x2="31.6" y2="-11.2" stroke="#c4161c" strokeWidth="1.3"/><path d="M31.6 -11 V-5.2 M21 -10.9 V-5.2" stroke="#8f1015" strokeWidth=".6"/><rect x="33.2" y="-9.4" width="2.6" height=".9" rx=".45" fill="#8f1015"/>
 <path d="M24.5 -6.4 C24.6 -8.6 26.4 -9.4 28 -9.2 C27.8 -7.4 26.4 -6.2 24.5 -6.4Z" fill="#7bd389"/>
 <rect x="45.4" y="-9.6" width="2" height="1.8" rx=".6" fill="#fff3b8"/><rect x="12" y="-9.4" width="1.6" height="2" rx=".5" fill="#ff8a7a"/>
 <path d="M12.6 -5.4 H46.8" stroke="#8f1015" strokeWidth="1.1"/>
 {[19,40].map(x=><g key={x}><path d={`M${x-4.7} -4 A4.7 4.7 0 0 1 ${x+4.7} -4Z`} fill="#6b0c10"/><circle cx={x} cy="-3.6" r="3.6" fill="#2d2d2d"/><circle cx={x} cy="-3.6" r="2" fill="#c9ced3"/><circle cx={x} cy="-3.6" r=".7" fill="#2d2d2d"/></g>)}
 <path className="ca-bolt" d="M33 -26 L30 -21.5 L32.3 -21.5 L31 -17.5 L34.5 -22.5 L32.2 -22.5Z" fill="#f5b700"/></g>
 {/* Damla sulamalı sera: yağmur gibi düşen damlalar, domates fideleri */}
 <g transform="translate(284 386)"><title>Damla sulamalı sera</title>
 <ellipse cx="29" cy="1" rx="32" ry="2.2" fill="#3a2a20" opacity=".14"/>
 <rect x="1" y="-3" width="56" height="3" fill="#7a5640" opacity=".55"/>{[7,17,41,51].map(x=><g key={x}><line x1={x} y1="0" x2={x} y2="-12" stroke="#8a6446" strokeWidth=".8"/><circle cx={x} cy="-4.5" r="4.4" fill="#4f8a5b"/><circle cx={x+.6} cy="-8.6" r="3.2" fill="#5f9d63"/><circle cx={x-1.6} cy="-5" r="1.2" fill="#d9302a"/><circle cx={x+1.8} cy="-3.2" r="1.1" fill="#d9302a"/><circle cx={x+.8} cy="-8.4" r="1" fill="#e8892a"/></g>)}
 <path d="M0 0 V-15 L29 -30 L58 -15 V0Z" fill="#d8eff3" opacity=".22"/>
 <path d="M29 -30 L58 -15 V0 H29Z" fill="#bfe1e8" opacity=".18"/>
 <line x1="3" y1="-14" x2="55" y2="-14" stroke="#3f86bd" strokeWidth=".8"/>
 {[7,17,41,51].map((x,i)=><circle key={x} className="ca-drip" style={{animationDelay:`${i*.4}s`}} cx={x} cy="-13" r="1.1" fill="#3f86bd"/>)}
 <rect x="24" y="-13" width="10" height="13" fill="#e7f5f7" opacity=".5" stroke="#ffffff" strokeWidth="1.1"/><line x1="29" y1="-13" x2="29" y2="0" stroke="#ffffff" strokeWidth=".8"/>
 <path d="M0 0 V-15 L29 -30 L58 -15 V0Z M0 -15 H58 M10 0 V-20.2 M19.5 0 V-25 M38.5 0 V-25 M48 0 V-20.2 M29 -30 V-13" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinejoin="round"/>
 <path d="M0 0 V-15 L29 -30 L58 -15 V0Z" fill="none" stroke="#8fb7c0" strokeWidth=".7" strokeLinejoin="round"/>
 <path d="M33 -21 L37 -26 M44 -14 L49 -20" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity=".6"/>
 <rect x="-1" y="-1.4" width="60" height="2" rx="1" fill="#b7aea3"/></g>
 <path d="M0 382 C100 366 180 372 260 388 C340 402 410 386 480 394 V480 H0Z" fill="#e2cfae"/>
 {/* Genç portakal ağacı */}
 <g transform="translate(384 408)"><ellipse cy="1" rx="12" ry="2.4" fill="#3a2a20" opacity=".16"/>
 <path d="M-1.6 0 C-1 -8 -1.2 -13 -.6 -18 L.8 -18 C1.4 -13 1.4 -8 1.8 0Z M0 -12 L-6 -20 M.4 -14 L6 -21" fill="#7a5640" stroke="#7a5640" strokeWidth="1.6" strokeLinecap="round"/>
 <g className="ca-sprout" style={{transformOrigin:'0 -12px'}}>
 {[[-9,-22,8,'#3f7550'],[9,-23,8,'#3f7550'],[0,-30,10,'#4f8a5b'],[-6,-25,8,'#4f8a5b'],[6,-26,8,'#4f8a5b'],[-2,-33,6,'#6fa86f'],[4,-31,4.5,'#6fa86f']].map(([cx,cy,r,c],i)=><circle key={i} cx={cx} cy={cy} r={r} fill={c as string}/>)}
 <g fill="#f39c12">{[[-10,-20],[-3,-26],[5,-20],[9,-27],[1,-35],[-7,-31]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="1.9"/>)}</g></g></g>
 {/* Akdeniz ve yelkenli */}
 <rect y="412" width="480" height="68" fill={`url(#${sea})`}/>
 <g stroke="#bfdcf0" strokeWidth="1.6" strokeLinecap="round" opacity=".75">{[[40,428,90],[150,440,210],[300,452,380],[90,462,140],[400,432,450]].map(([a,y,b],i)=><line key={i} className="ca-wave" style={{animationDelay:`${-i*1.3}s`}} x1={a} x2={b} y1={y} y2={y}/>)}</g>
 <g transform="translate(330 440)"><g className="ca-drift"><ellipse cy="11" rx="30" ry="2.4" fill="#0f3558" opacity=".35"/><path className="ca-wake" d="M-34 9 H-46 M-32 13 H-52" stroke="#e8f4fb" strokeWidth="1.4" strokeLinecap="round"/>
 <g className="ca-bob">
  <line x1="0" y1="-1" x2="0" y2="-52" stroke="#5b4a42" strokeWidth="1.7" strokeLinecap="round"/>
  <path className="ca-flag" d="M0 -52 L9 -49.5 L0 -47Z" fill="#c4161c"/>
  <g className="ca-sail"><path d="M2 -49 Q16 -27 24 -5 L2 -5Z" fill="#ffffff" stroke="#d6dde2" strokeWidth=".8" strokeLinejoin="round"/><path d="M2 -20 L18.6 -20 M2 -33 L11.6 -33" stroke="#e1e6ea" strokeWidth=".8"/><path d="M2 -14 L21 -14 L22.6 -10 L2 -10Z" fill="#c4161c"/></g>
  <line x1="0" y1="-5" x2="25" y2="-5" stroke="#5b4a42" strokeWidth="1.3" strokeLinecap="round"/>
  <path className="ca-jib" d="M-2 -45 Q-13 -25 -21 -4 L-2 -4Z" fill="#c4161c"/>
  <rect x="-9" y="-6" width="13" height="5" rx="2" fill="#f3e6d6"/><circle cx="-5" cy="-3.5" r="1" fill="#3f86bd"/><circle cx="0" cy="-3.5" r="1" fill="#3f86bd"/>
  <path d="M-28 -1 H28 Q24 9 13 10 H-15 Q-24 8 -28 -1Z" fill="#ffffff"/>
  <path d="M-21 6.5 H20 Q17 9.6 13 10 H-15 Q-19 9 -21 6.5Z" fill="#1d4f7d"/><line x1="-25.5" y1="2.6" x2="25.5" y2="2.6" stroke="#c4161c" strokeWidth="1.5"/>
 </g></g></g>
 {/* Gece: gökyüzü kararır, güneş batar, ay ve yıldızlar çıkar, ışıklar yanar; türbinler dönmeyi sürdürür */}
 <rect className="ca-night" width="480" height="480" fill="#0a1840" opacity="0"/>
 <g className="ca-lights" opacity="0">
  <g fill="#fffbe6">{[[40,140],[160,40],[300,26],[200,20],[372,86],[462,128],[64,84],[22,236],[460,214]].map(([x,y],i)=><circle key={i} className="ca-star" style={{animationDelay:`${-i*.7}s`}} cx={x} cy={y} r={i%3?1.2:1.8}/>)}</g>
  <g transform="translate(436 52)"><circle r="20" fill="#f4f1de" opacity=".15"/><circle r="12" fill="#f4f1de" mask={`url(#${moon})`}/></g>
  <circle cx="186" cy="361" r="14" fill="#ffd34d" opacity=".3"/><rect x="181" y="356" width="10" height="10" fill="#ffe27a"/>
  <path d="M272 371.5 L282 368 L282 376Z" fill="#fff3b8" opacity=".5"/>
  <path d="M284 386 V371 L313 356 L342 371 V386Z" fill="#d68bff" opacity=".35"/>
  <circle cx="418" cy="226" r="18" fill="#ffd34d" opacity=".22"/><rect x="400" y="222" width="36" height="2" fill="#ffd34d"/>
 </g>
 <text x="28" y="463" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="11" letterSpacing="2.4" fill="#ffffff">COP31 · ANTALYA · 2026</text>
 </g>
 </svg>;
}
