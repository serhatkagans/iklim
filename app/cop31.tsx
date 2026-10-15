// Ana sayfadaki COP31 bölümü: zirve nerede ve ne zaman, geri sayım, kısa rehber, Türkiye'nin odak alanları ve sayılarla iklim.
// Odak kartları ilgili çalışma grubunu açar. Geri sayım yalnızca tarayıcıda hesaplanır (sunucu çiziminde gösterilmez).
import {useState} from 'react';
import type {Word,Work} from '../lib/words';
import {emojiOf} from '../lib/words';

// Antalya saatiyle (UTC+3) zirvenin açılışı ve kapanışı.
const opening=Date.UTC(2026,10,8,21),closing=Date.UTC(2026,10,20,21);
const day=86400000;
function countdown(now:number){
 if(now<opening){const d=Math.ceil((opening-now)/day);return {big:String(d),label:d===1?'gün kaldı: yarın başlıyor':'gün kaldı',state:'Zirveye geri sayım'};}
 if(now<closing){const d=Math.floor((now-opening)/day)+1;return {big:`${d}.`,label:'gün: zirve sürüyor',state:'Antalya’da şu an'};}
 return {big:'✓',label:'zirve tamamlandı',state:'COP31 Antalya'};
}

const focus=[
 ['sifir-atik','Döngüsel ekonomi ve atık yönetimi','Sıfır atık vizyonu, geri kazanım ve kaynakları döngüde tutmak.'],
 ['su-gida','Su ve gıda güvenliği','Kuraklığa karşı su yönetimi, dirençli tarım ve israfsız sofralar.'],
 ['iklim-finansmani','İklim finansmanına erişim','Yeşil yatırımlar, karbon fiyatı ve gelişmekte olan ülkelere destek.'],
 ['genclik','Gençlerin ve şehirlerin rolü','Okulda, mahallede ve kentte iklim için harekete geçen gençler.'],
] as const;

const facts=[
 ['1,5°C','Paris Anlaşması’nın ısınma sınırı','cop-diplomasisi'],
 ['2053','Türkiye’nin net sıfır hedef yılı','cop-diplomasisi'],
 ['420+','ppm: havadaki karbondioksit','iklim-bilimi'],
 ['198','BM iklim sözleşmesine taraf','cop-diplomasisi'],
] as const;

// onGroup grubu açar; grupta henüz onaylı terim yoksa onAdd ile o grup seçili terim ekleme formuna gidilir.
export default function Cop31({works,words,mounted,onGroup,onAdd}:{works:Work[];words:Word[];mounted:boolean;onGroup:(id:string)=>void;onAdd:(id:string)=>void}){
 const has=(id:string)=>works.some(k=>k.id===id),count=(id:string)=>words.filter(w=>w.work===id).length;
 const [now]=useState(()=>Date.now()),c=countdown(now),open=(id:string)=>count(id)?onGroup(id):onAdd(id);
 return <section className="cop31" aria-labelledby="cop31-title">
 <div className="cop31-head"><div><div className="eyebrow">COP31 NEREDE VE NE ZAMAN?</div><h2 id="cop31-title">Dünyanın iklim zirvesi <em>Türkiye’de.</em></h2><p>COP31, Birleşmiş Milletler İklim Değişikliği Konferanslarının 31’incisi. Dünya liderleri, bilim insanları, sivil toplum ve gençler iklim krizine ortak çözümler için Antalya’da buluşuyor.</p></div>
 <div className="countdown" role="status" aria-live="off"><small>{mounted?c.state:'Zirveye geri sayım'}</small><b>{mounted?c.big:'—'}</b><span>{mounted?c.label:''}</span></div></div>
 <ul className="cop31-facts" aria-label="Zirve bilgileri"><li><span aria-hidden="true">📍</span><b>Antalya, Türkiye</b><small>Akdeniz kıyısında, iklim etkilerinin yoğun hissedildiği bir bölgede</small></li><li><span aria-hidden="true">🗓️</span><b>9–20 Kasım 2026</b><small>Liderler zirvesi, müzakereler ve yan etkinlikler</small></li><li><span aria-hidden="true">⏱️</span><b>Yaklaşık 11 gün</b><small>Mavi Bölge’de müzakereler, Yeşil Bölge’de halk etkinlikleri</small></li></ul>
 <div className="cop31-guide"><div><div className="eyebrow">HERKES İÇİN REHBER</div><h3>COP nedir?</h3><p><b>COP</b>, “Taraflar Konferansı” demektir: BM İklim Değişikliği Çerçeve Sözleşmesi’ne (UNFCCC) taraf ülkelerin en üst karar organı. 1995’ten beri her yıl toplanır; ülkeler salım azaltımı, uyum ve finansman konularında oy birliğiyle karar alır.</p>{has('cop-diplomasisi')&&<button className="secondary" onClick={()=>open('cop-diplomasisi')}>{count('cop-diplomasisi')?`🌍 Zirvenin terimlerini keşfet (${count('cop-diplomasisi')}) ↗`:'✎ Zirvenin terimlerini sen ekle ↗'}</button>}</div>
 <ol className="cop31-steps" aria-label="Bir COP nasıl işler?">{[['Bilim','IPCC raporları sorunun boyutunu ortaya koyar.'],['Planlar','Ülkeler Ulusal Katkı Beyanlarını sunar.'],['Müzakere','Heyetler metinler üzerinde uzlaşır.'],['Karar','Kararlar oy birliğiyle kabul edilir.']].map(([t,d],i)=><li key={t}><span>{i+1}</span><b>{t}</b><small>{d}</small></li>)}</ol></div>
 <div className="section-heading compact"><div><div className="eyebrow">TÜRKİYE’NİN EV SAHİPLİĞİ</div><h2>Zirvenin <em>odak alanları</em></h2><p>Her alanın terimleri bir çalışma grubunda ve o terimleri sizler ekliyorsunuz. Karta dokun: terim varsa bilmece gibi aç, yoksa ilk terimi sen öner.</p></div></div>
 <div className="focus-grid">{focus.filter(([id])=>has(id)).map(([id,t,d])=><button key={id} className="focus-card" onClick={()=>open(id)}><span className="focus-emoji" aria-hidden="true">{emojiOf(id)}</span><b>{t}</b><small>{d}</small><em>{count(id)?`${count(id)} terim ↗`:'İlk terimi sen ekle ✎'}</em></button>)}</div>
 <div className="climate-facts"><div className="eyebrow">SAYILARLA İKLİM</div><ul>{facts.map(([n,t,id])=><li key={n}><button onClick={()=>has(id)&&open(id)}><b>{n}</b><small>{t}</small></button></li>)}</ul></div>
 </section>;
}
