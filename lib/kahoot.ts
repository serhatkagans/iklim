// Hazır Kahoot soru setleri: terim havuzundan üretilmeyen, öğretmenin hazırladığı sabit sorular. Canlı yarışmada (live-game.tsx) "Tür" olarak seçilir.
// Bir soru iki şıklı (Doğru/Yanlış) ya da dört şıklı olabilir. Her satır: [soru, şıklar, doğru şık].
// Dört şıklı sorularda şıklar oyun açılırken karıştırılır; iki şıklılarda "Doğru, Yanlış" sırası korunur. Sorular yazıldığı sırayla gelir.
import {shuffle} from './game.ts';
import type {LiveQ} from './live.ts';
type Row=[string,string[],string];
const DY=['Doğru','Yanlış'];
export const KAHOOTS:Record<string,{title:string;emoji:string;rows:Row[]}>={
cop31:{title:'COP31 ve İklim',emoji:'🌍',rows:[
['COP31, Kasım 2026’da Antalya’da düzenlenecek.',DY,'Doğru'],
['Hava durumu ile iklim aynı anlama gelir.',DY,'Yanlış'],
['Sera etkisi olmasaydı Dünya bugünkünden çok daha soğuk olurdu.',DY,'Doğru'],
['Metan, karbondioksitten daha zayıf bir ısı tutucu gazdır.',DY,'Yanlış'],
['Paris Anlaşması ısınmayı 1,5 °C ile sınırlamaya çalışmayı hedefler.',DY,'Doğru'],
['Geri dönüşüm, atık hiyerarşisinde atığı önlemekten önce gelir.',DY,'Yanlış'],
['Ormanlar ve okyanuslar birer karbon yutağıdır.',DY,'Doğru'],
['Yeşil aklama, şirketin kendini olduğundan daha çevreci göstermesidir.',DY,'Doğru'],
['Kentsel ısı adası etkisi kenti çevresinden daha serin yapar.',DY,'Yanlış'],
['Dijital etkinliklerin de bir karbon ayak izi vardır.',DY,'Doğru'],
['COP’ta “COP” kısaltması neyi ifade eder?',['Taraflar Konferansı','Karbon Ofisi Programı','İklim Polisi','Okyanus Paneli'],'Taraflar Konferansı'],
['COP31 hangi tarihler arasında yapılacak?',['9–20 Kasım 2026','1–12 Haziran 2026','15–26 Mart 2027','3–14 Ekim 2025'],'9–20 Kasım 2026'],
['Türkiye net sıfır hedefini hangi yıl için açıkladı?',['2053','2030','2040','2100'],'2053'],
['Hangisi bir sera gazı değildir?',['Azot (N₂)','Karbondioksit','Metan','Diazot monoksit'],'Azot (N₂)'],
['Ülkelerin beş yılda bir yenilediği iklim planının adı nedir?',['Ulusal Katkı Beyanı','Yeşil Bölge','Kyoto Protokolü','Madde 6'],'Ulusal Katkı Beyanı'],
['Zirvede resmî müzakerelerin yapıldığı alan hangisidir?',['Mavi Bölge','Yeşil Bölge','Kırmızı Bölge','Sarı Bölge'],'Mavi Bölge'],
['Hangisi yenilenebilir bir enerji kaynağıdır?',['Jeotermal','Kömür','Doğal gaz','Petrol'],'Jeotermal'],
['Atık hiyerarşisinin en üstünde hangisi yer alır?',['Önleme','Geri dönüşüm','Yakma','Düzenli depolama'],'Önleme'],
['Kar ve buzun güneş ışığını yansıtma gücüne ne ad verilir?',['Albedo','Fenoloji','Erozyon','Permafrost'],'Albedo'],
['Hangisi bir iklime uyum önlemidir?',['Erken uyarı sistemi kurmak','Daha çok kömür yakmak','Sulak alanları kurutmak','Dere yatağına ev yapmak'],'Erken uyarı sistemi kurmak'],
['Konya Ovası’nda yeraltı suyunun aşırı çekilmesiyle artan çukurlara ne denir?',['Obruk','Delta','Havza','Kanyon'],'Obruk'],
['AB’nin ithal ürünlerin karbon içeriğine göre bedel aldığı sistemin kısaltması nedir?',['CBAM','NDC','IPCC','ESG'],'CBAM'],
['İklim bilimini değerlendiren BM bilim kurulu hangisidir?',['IPCC','UNESCO','NATO','OPEC'],'IPCC'],
['Hangisi gıda israfını azaltır?',['Tabağa yiyebileceğin kadar almak','Fazla alıp atmak','Son kullanma tarihini hiç okumamak','Artanları her zaman çöpe atmak'],'Tabağa yiyebileceğin kadar almak'],
['Atık bir malzemeden daha değerli bir ürün yapmaya ne denir?',['İleri dönüşüm','Planlı eskitme','Düzenli depolama','Doğrusal ekonomi'],'İleri dönüşüm'],
]},
};
export function kahootQuestions(id:string,rnd=Math.random):LiveQ[]{const k=KAHOOTS[id];if(!k)return [];
return k.rows.map(([prompt,opts,answer])=>{const options=opts.length>2?shuffle(opts,rnd):opts;return {prompt,tag:`${k.emoji} ${k.title}`,options,correct:options.indexOf(answer),answer};});}
