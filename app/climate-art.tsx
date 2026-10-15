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

function Palm({x,y,h,flip=false}:{x:number;y:number;h:number;flip?:boolean}){
 const d=flip?-1:1,tx=x+d*10,ty=y-h;
 return <g><path d={`M${x} ${y} C${x+d*2} ${y-h*.4} ${x+d*8} ${y-h*.75} ${tx} ${ty}`} stroke="#7a5640" strokeWidth="5" fill="none" strokeLinecap="round"/>
 {[-150,-115,-75,-40,-5].map((a,i)=>{const t=a*Math.PI/180,ex=tx+Math.cos(t)*30,ey=ty+Math.sin(t)*22+12;return <path key={i} d={`M${tx} ${ty} Q${(tx+ex)/2} ${Math.min(ty,ey)-12} ${ex} ${ey}`} stroke={i%2?'#4f8a5b':'#3f7550'} strokeWidth="5" fill="none" strokeLinecap="round"/>;})}</g>;
}

export default function ClimateArt({className='climate-art'}:{className?:string}){
 const id=useId().replace(/:/g,''),card=`card${id}`,globe=`globe${id}`,ocean=`ocean${id}`,sea=`sea${id}`,shine=`shine${id}`,sky=`sky${id}`;
 const cx=240,cy=206,R=110,segs=45,[ax,ay]=antalya;
 return <svg className={className} viewBox="0 0 480 480" role="img" aria-label="Maviden kırmızıya ısınma şeritleriyle çevrili dünya küresi; Türkiye kırmızıyla, Antalya işaretli. Önde Toros dağları, rüzgâr türbinleri, güneş panelleri, Yivli Minare, palmiyeler ve Akdeniz.">
 <defs>
  <clipPath id={card}><rect width="480" height="480" rx="28"/></clipPath>
  <clipPath id={globe}><circle cx={cx} cy={cy} r={R}/></clipPath>
  <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fdf8f3"/><stop offset="1" stopColor="#fbeee4"/></linearGradient>
  <radialGradient id={ocean} cx=".38" cy=".32" r=".78"><stop offset="0" stopColor="#7fb6dc"/><stop offset=".6" stopColor="#3f86bd"/><stop offset="1" stopColor="#1d4f7d"/></radialGradient>
  <radialGradient id={shine} cx=".3" cy=".25" r=".55"><stop offset="0" stopColor="#fff" stopOpacity=".38"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
  <linearGradient id={sea} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3f86bd"/><stop offset="1" stopColor="#1d4f7d"/></linearGradient>
 </defs>
 <g clipPath={`url(#${card})`}>
 <rect width="480" height="480" fill={`url(#${sky})`}/>
 <circle cx={cx} cy={cy} r="196" fill="#f6e7da"/>
 {/* Isınma yayı: soldan sağa, maviden kırmızıya */}
 {Array.from({length:segs},(_,i)=>{const s=270/segs,a=225+i*s;return <path key={i} d={arc(cx,cy,R+11,R+28,a+.5,a+s-.5)} fill={pick(i/(segs-1),warming)}/>;})}
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
 <g transform="translate(26 30)"><rect width="104" height="34" rx="17" fill="#fff" stroke="#ecd9cb"/><g transform="translate(20 17)"><rect x="-3" y="-11" width="6" height="16" rx="3" fill="none" stroke="#c4161c" strokeWidth="1.6"/><circle cy="7" r="4.6" fill="#c4161c"/><rect x="-1.2" y="-4" width="2.4" height="10" fill="#c4161c"/></g><text x="64" y="22" textAnchor="middle" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontWeight="800" fontSize="15" fill="#c4161c">+1,5°C</text></g>
 {/* Kuşlar */}
 <g fill="none" stroke="#5b4a42" strokeWidth="1.6" strokeLinecap="round">{[[96,104,1],[118,92,.8],[404,150,.9]].map(([x,y,s],i)=><path key={i} d={`M${x-7*s} ${y} q${3.5*s} ${-4*s} ${7*s} 0 q${3.5*s} ${-4*s} ${7*s} 0`}/>)}</g>
 {/* Toroslar ve türbinler */}
 <path d="M0 304 L40 276 L74 292 L118 254 L156 286 L196 272 L222 288 L252 300 L300 282 L338 296 L380 270 L420 292 L480 278 V480 H0Z" fill="#c9b6a6"/>
 <path d="M118 254 L132 266 L124 268 L112 262Z M380 270 L394 279 L386 281Z" fill="#ffffff" opacity=".7"/>
 <Turbine x={70} y={292} h={92} speed={9}/>
 <Turbine x={128} y={276} h={70} speed={7}/>
 <path d="M0 344 C70 322 140 324 210 338 C290 354 370 328 480 336 V480 H0Z" fill="#8fae7e"/>
 {/* Yivli Minare (tuğla kırmızısı) */}
 <g><rect x="398" y="300" width="40" height="40" rx="2" fill="#8c5a44"/><rect x="408" y="214" width="20" height="90" fill="#b4533a"/>
 <g stroke="#8a3a28" strokeWidth="1.4">{[412,416,420,424].map(x=><line key={x} x1={x} y1="232" x2={x} y2="300"/>)}</g>
 <rect x="403" y="224" width="30" height="7" rx="2" fill="#8a3a28"/><rect x="411" y="198" width="14" height="26" fill="#b4533a"/><path d="M410 199 L418 174 L426 199Z" fill="#6f6a66"/><circle cx="418" cy="170" r="2.4" fill="#6f6a66"/></g>
 <Palm x={452} y={352} h={74}/>
 <Palm x={366} y={360} h={58} flip/>
 {/* Güneş panelleri */}
 <g transform="translate(36 362)">{[0,62].map(dx=><g key={dx} transform={`translate(${dx} 0)`}><path d="M6 0 L58 0 L50 -24 L0 -24Z" fill="#24435f"/><g stroke="#8fb3d1" strokeWidth=".9">{[13,26,39].map(x=><line key={x} x1={x*.86+6} y1="0" x2={x*.86} y2="-24"/>)}<line x1="3" y1="-12" x2="54" y2="-12"/></g><line x1="30" y1="0" x2="30" y2="12" stroke="#5b6670" strokeWidth="3"/></g>)}</g>
 <path d="M0 382 C100 366 180 372 260 388 C340 402 410 386 480 394 V480 H0Z" fill="#e2cfae"/>
 {/* Fidan */}
 <g transform="translate(258 390)"><path d="M0 0 C0 -12 0 -22 0 -30" stroke="#3f7550" strokeWidth="2.6" fill="none" strokeLinecap="round"/><path d="M0 -18 C-14 -20 -20 -32 -18 -40 C-6 -38 0 -28 0 -18Z" fill="#4f8a5b"/><path d="M0 -26 C12 -28 18 -38 16 -46 C6 -44 0 -36 0 -26Z" fill="#6fa86f"/></g>
 {/* Akdeniz ve yelkenli */}
 <rect y="412" width="480" height="68" fill={`url(#${sea})`}/>
 <g stroke="#bfdcf0" strokeWidth="1.6" strokeLinecap="round" opacity=".75">{[[40,428,90],[150,440,210],[300,452,380],[90,462,140],[400,432,450]].map(([a,y,b],i)=><line key={i} x1={a} x2={b} y1={y} y2={y}/>)}</g>
 <g transform="translate(330 430)"><path d="M-22 0 L22 0 L15 9 L-15 9Z" fill="#ffffff"/><path d="M0 -2 L0 -40 L20 -6Z" fill="#ffffff"/><path d="M-3 -4 L-3 -32 L-18 -6Z" fill="#c4161c"/></g>
 <text x="28" y="463" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="11" letterSpacing="2.4" fill="#ffffff">COP31 · ANTALYA · 2026</text>
 </g>
 </svg>;
}
