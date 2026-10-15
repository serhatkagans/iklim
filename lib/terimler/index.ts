// Çalışma grupları ve başlangıç terimleri. Gruplar COP31 Antalya 2026 gündemindeki odak alanlarına göre düzenlendi.
// Her satır: [terim, karşılığı, kısa tanım, açıklama, örnek cümle, kategori]
// - karşılığı: Türkçe terimde İngilizcesi, İngilizce terimde Türkçesi; yoksa boş.
// - kısa tanım oyunlarda ipucu ve eşleştirmede şık olarak kullanılır; terimin kendisini içermemeli.
// - örnek cümle terimi aynen (aynı büyük/küçük harfle) içermeli; öğrenci önerilerindeki kuralla aynı.
// - kategori: Temel kavram · Bilim · Enerji · Doğa · Politika · Ekonomi · Toplum
export type TermRow=[term:string,equivalent:string,short:string,meaning:string,example:string,category:string];
export type Group={id:string;title:string;about:string;emoji:string;terms:TermRow[]};
import bilim from './iklim-bilimi.ts';
import cop from './cop-diplomasisi.ts';
import enerji from './enerji-donusumu.ts';
import sifirAtik from './sifir-atik.ts';
import suGida from './su-gida.ts';
import doga from './biyocesitlilik.ts';
import finans from './iklim-finansmani.ts';
import sehirler from './sehirler.ts';
import uyum from './uyum.ts';
import genclik from './genclik.ts';
export const groups:Group[]=[bilim,cop,enerji,sifirAtik,suGida,doga,finans,sehirler,uyum,genclik];
