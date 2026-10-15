# GençTek İklim Sözlüğü

COP31 Antalya 2026 (9–20 Kasım) yolunda, terimlerini öğrencilerin önerip görevlinin onayladığı, oyunlaştırılmış bir iklim sözlüğü. GençTek Bilişim Sözlüğü’nden (`../terimlersozlugu`) türetilmiştir; veri modeli, oyunlar, canlı yarışma, kart yapma ve görevli paneli aynıdır. Ana sayfa vitrini ve COP31 bölümü https://cop.sifiratikvakfi.org/ portalındaki içerik mantığını izler: zirve nerede ve ne zaman (geri sayım), herkes için COP rehberi, Türkiye’nin odak alanları ve sayılarla iklim.

## Çalışma grupları ve terimler

**Terimleri öğrenciler ekler.** Sözlükte, gruplarda ve oyunlarda yalnızca öğrencilerin “+ Terim ekle” ile önerip görevlinin onayladığı terimler görünür. Odak alanı kartları, grubunda henüz terim yoksa “İlk terimi sen ekle” der ve öneri formunu o grup seçili açar.

`lib/terimler/` altında her grup için ayrıca 20–22 hazır terim vardır (toplam 202). Bunlar ilk açılışta **arşive (gizli)** yüklenir; görevli panelinde “Gizli” süzgecinde durur ve istenirse “Göster” ile tek tek açılabilir. Gruplar COP31 gündemine göre seçildi:

| Grup | Odak |
|---|---|
| 🌡️ İklim Bilimi | Sera etkisi, küresel ısınma, iklim sistemi |
| 🌍 COP ve İklim Diplomasisi | COP31, UNFCCC, Paris Anlaşması, müzakereler |
| ⚡ Enerji Dönüşümü | Yenilenebilir enerji, verimlilik, fosil yakıtlardan çıkış |
| ♻️ Döngüsel Ekonomi ve Sıfır Atık | Atık önleme, geri kazanım, döngüsel ekonomi |
| 💧 Su ve Gıda Güvenliği | Kuraklık, su yönetimi, tarım, beslenme |
| 🌳 Doğa ve Biyoçeşitlilik | Ormanlar, denizler, sulak alanlar, türler |
| 💰 İklim Finansmanı ve Karbon Piyasaları | Yeşil yatırım, karbon fiyatı, iklim fonları |
| 🏙️ İklim Dostu Şehirler ve Ulaşım | Isı adası, yeşil bina, temiz ulaşım |
| 🛡️ Uyum ve Afet Direnci | Isı dalgası, sel, erken uyarı, dirençlilik |
| ✊ Gençlik ve İklim Eylemi | Karbon ayak izi, iklim okuryazarlığı, gönüllülük |

Kategoriler: Temel kavram · Bilim · Enerji · Doğa · Politika · Ekonomi · Toplum. `tests/words.test.mjs` hazır terimleri denetler (örnek cümlede terim geçmeli, kısa tanım cevabı ele vermemeli, kategori geçerli olmalı, grup başına en az 20 terim).

Canlı yarışmada (Kahoot tarzı) hazır **“COP31 ve İklim”** soru seti vardır (25 soru: 10 Doğru/Yanlış, 15 dört şıklı; `lib/kahoot.ts`).

## Tasarım

Kurumsal kırmızı (`#c4161c`) korunur; köz ve toprak tonlarıyla “ısınma şeritleri” görsel dili kullanılır (`app/climate-theme.css`, `globals.css`’ten sonra yüklenir). Tema görseli `app/climate-art.tsx`: maviden kırmızıya ısınma yayıyla çevrili, Türkiye merkezli dünya küresi (Natural Earth kıyıları, `app/globe-paths.ts` — world-atlas verisinden d3-geo ile üretildi), Toroslar, rüzgâr türbinleri, güneş panelleri, Yivli Minare, palmiyeler ve Akdeniz. Dosya gerektirmeyen saf SVG’dir. `public/art/*.png` (kart yaparken kullanılan dört hazır görsel) bu görselden kırpılarak üretildi.

## Bölümler

| Bölüm | Ne yapar |
|---|---|
| **Ana sayfa** | Kırmızı vitrinde tema görseli ve etkinlik seçimi; altında COP31 bölümü (geri sayım, rehber, odak alanları, sayılarla iklim); altta kart yapmak için terim listesi (kategori, çalışma grubu ve metin araması). |
| **Sözlük** | Onaylı terimler çalışma grubu sırasıyla, 4–6 maddelik sayfalara dizilir; her grup bir bölümdür. Sayfa sonunda terim–tanım eşleştirmesi. |
| **Çalışma Grupları** | Grup kartları (kapak ya da grup simgesi, tanıtım, terim sayısı). Gruba girilince terimler maskeli gelir; kısa tanımdan tahmin edilen kart açılır. Adı grup adında geçen terimler (Robotik → robot) baştan açıktır. |
| **Oyun** | 10 soruluk, soru başına 20 saniyelik tur. **Terimi Bul** (tanımdan terime) ve **Tanımını Bul** (terimden tanıma); kolayda 4 şık, zorda terim yazılır ya da 6 tanımdan seçilir. Puan = 100 + kalan saniye × 5 + seri bonusu; jokerler: yarı yarıya, harf aç, karşılık. Tur sonunda özet, yanlışları tekrar oynama ve bu tarayıcıda saklanan rekor. Cevabı ele veren ipuçları gizlenir: şıklı soruda harf deseni gösterilmez, tanımda ve şıklarda terimin sözcükleri ve kısaltma açılımları ••• olur, çeldiriciler aynı grup ve kategoriden seçilir. **Sınıf modu:** üyelik yoktur; öğretmen seçtiği tür, zorluk ve grupla sınıf açar, 6 haneli kodu, bağlantıyı (`?bolum=oyun&sinif=482913`) ya da kare kodu paylaşır. Sınıfı açan tarayıcı öğretmen ekranıdır: yalnızca kod, kare kod ve 5 saniyede bir yenilenen sınıf tablosu görünür, oyun oynanmaz. Öğrenci rumuzunu yazıp başlar; koda giren herkes aynı 10 soruyu aynı sırayla çözer. **Tek hak:** “Oyunu başlat”a basınca rumuz ve cihaz (tarayıcıda saklanan rastgele anahtar) sunucuya yazılır; aynı cihaz ya da rumuz ikinci kez puanlı tura giremez, sonraki turlar rastgele sorularla alıştırmadır. Skor tur bitince (ya da “Turu bitir”de) kendiliğinden o sınıfın tablosuna yazılır; genel tabloya karışmaz. **Canlı yarışma (Kahoot tarzı):** öğretmen “Kahoot tarzı canlı oyna” ile oyun açar (tür, grup, 5–20 soru, 10–30 saniye) ve ekranını tahtaya yansıtır; öğrenciler 6 haneli PIN’i (sınıf kodu kutusuna), bağlantıyı (`?bolum=oyun&canli=482913`) ya da kare kodu kullanıp adını yazarak bağlanır, adlar bekleme salonunda görünür (öğretmen bir ada dokunarak çıkarabilir). Öğrenci adıyla birlikte avatar seçer. Sorular öğretmenin düğmesiyle ilerler; her soru önce 4 saniye tek başına görünür, sonra şıklar açılır ve süre başlar. Terimin görseli “Tanımını Bul”da soruyla, “Terimi Bul”da cevap açılınca gösterilir. Sesler (salon müziği, geri sayım, doğru/yanlış, podyum) ses dosyası olmadan üretilir ve “Ses açık / Ses kapalı” düğmesiyle kapatılır; ⛶ düğmesi sahneyi tam ekran yapar. Akış: soru → doğru cevap ve şık dağılımı → ara skor tablosu (en çok yükselen, en hızlı doğru, seridekiler) → … → podyum. Puan: doğru cevap hıza göre 500–1000, ardışık her doğru için +100 seri bonusu (en çok +500). Oyunlar sunucu belleğinde tutulur (`lib/live.ts`, `/api/live`); sunucu yeniden başlarsa süren oyun kapanır. |
| **Kart yap** | Terimi kendi cümlende kullanıp görselli terim kartı oluşturma; kartlar “Kartlarım”da birikir, kitapçık olarak yazdırılır. |
| **+ Terim ekle** | Grup, terim, karşılık, kısa tanım, açıklama, örnek cümle. Öneri **onay bekler**; onaylanana kadar hiçbir bölümde görünmez. |

Bölüm, çalışma grubu, sözlük sayfası ve açık terim adreste tutulur; geri tuşu, yenileme ve bağlantı paylaşma çalışır: `?bolum=sozluk&sayfa=12`, `?bolum=gruplar&grup=robotik`, `?terim=ping` (her bölümün üstüne terim penceresi açar). Bölüm adları: `sozluk`, `gruplar`, `oyun`, `ekle` (`&grup=` ile grup seçili gelir), `ortak`, `kartlarim`, `nasil`, `ekleyenler`, `ogrenci-terimleri` (öğrencilerin önerip onay alan terimleri).

Başlıktaki arama her bölümden terime ulaştırır; ana sayfadaki arama ızgarayı süzer. İkisi de büyük/küçük harf, şapka ve Türkçe harf farkını yok sayar (“yapay zeka” = “Yapay zekâ”) ve sonuçları önce terime, sonra karşılığına, en son tanımına göre sıralar. Ana sayfa ızgarası 24'er terimle açılır.

Açılan kartlar, tamamlanan sayfalar ve oyun skoru yalnızca o tarayıcı sekmesinin oturumunda tutulur.

Terim denetimi (örnek cümle) Türkçenin ek yapısına göre çalışır: terim cümledeki bir sözcüğün başında aranır (“Shader'ı”, “duvarının”), ünsüz yumuşaması tanınır (ağaç → ağacı); çok sözcüklü ve işaretli terimler (“A/B testi”, “Node.js”) sözcük sözcük aranır. Serbest metin tahmininde büyük/küçük harf, boşluk, işaret ve Türkçe harf farkı yok sayılır (“ab testi” = “A/B testi”).

## Renkler

GençTek Bilgi Sistemi'nin kurumsal paleti (Tema D) kullanılır: kırmızı `#c4161c` (düğme, bağlantı, vitrin, vurgu), nötr siyah `#414042` (metin), soğuk gri `#939598` (çizgi), zemin `#f6f7f9`. Yazı tipleri: başlıkta Plus Jakarta Sans, gövdede Inter.

## Çalıştırma

Node 22.13+ gerekir. Uygulama **3002** portunda açılır (Kelimeden Hayale 3000’de, Bilişim Sözlüğü 3001’de; hepsi aynı anda çalışabilir). Windows'ta `baslat.bat` paketleri kurar, derler ve sunucuyu açar; port doluysa uyarır.

```bash
npm install
cp .env.example .env.local   # ADMIN_USER ve ADMIN_PASSWORD'ü doldurun
npm run dev                   # http://localhost:3002
```

Yayın için `npm run build` ve `npm start`. Uygulama tek bir Node süreci ve SQLite dosyasıyla çalışır; bir ters vekil arkasında VPS'e kurulabilir. Alt adreste yayın için `.env.local` içine `BASE_PATH=/altadres` yazıp yeniden derleyin (hem derlemede hem başlatmada okunur); ters vekil yolu önek silmeden uygulamaya iletmelidir.

Denetimler:

```bash
npx tsc --noEmit
npm run lint
node --test tests/words.test.mjs tests/game.test.mjs          # birim testleri
TEST_BASE_URL=http://localhost:3002 node --test tests/workflow.test.mjs   # sunucu çalışırken
```

## Veri

Bütün veriler `DATA_DIR` (varsayılan `./data`) altındadır ve kaynak kontrolüne girmez:

- `iklim-sozlugu.db`: SQLite. `works` (çalışma grupları: ad, kısa tanıtım), `words` (terimler; `syllables` = karşılığı, `oldMeaning` = kısa tanım, `meaning` = açıklama; durum `pending/approved/rejected`, görünürlük), `cards` (terim kartları). İç tablo ve sütun adları ilk sürümden korunmuştur.
- `art/kelimeler/<terim-kimliği>.png|jpg|webp`: yüklenen terim görselleri.
- `art/kapaklar/<grup-kimliği>.png|jpg|webp`: grup kapakları.
- `art/<kart-kimliği>.png`: yapay zekâ ile üretilen kart görselleri.

Başlangıç verisi sürümlüdür (`lib/server.ts` → `seedVersion`); yeni sürüm yalnızca eksik grupları ve terimleri ekler, görevlinin düzenlemeleri korunur.

## Görevli paneli

**`/admin`** adresinden açılır; `ADMIN_USER` / `ADMIN_PASSWORD` ile girilir (kullanıcı adında büyük/küçük harf önemsenmez).

- **Özet**: onaylı terim, bekleyen öneri, eksik görsel, bekleyen kart sayıları; grup başına tablo; en çok katkı verenler.
- **Öneriler / Terimler**: arama ve grup, durum, görsel, görünürlük filtreleri; tek tek ya da toplu onayla, reddet, gizle, sil; düzenle (karşılık ve kategori dahil).
- **Görseller**: tek tek ya da toplu yükleme; dosya adı terimle ya da kimliğiyle eşleşir (`shader.png`, `guvenlik-duvari.jpg`).
- **Çalışma grupları**: yeni grup ekleme, ad ve tanıtım düzenleme, kapak yükleme.
- **Terim kartları**: kartları ortak galeride yayımla / yayımlama.
- **Excel**: bütün terimler **.xlsx** olarak iner. “Tüm terimler” sayfasında her sütunda Excel filtresi vardır (çalışma grubu, kategori, durum, görsel, ekleyen…); “Özet” sayfasında grup başına sayılar; her çalışma grubu ayrıca kendi filtreli sayfasındadır. İçe aktarma: Excel'den (dışa aktarılan dosya dahil) başlıkla birlikte kopyala-yapıştır ya da CSV; en fazla 500 satır. Sütunlar: *Terim · Çalışma grubu · Karşılığı · Kısa tanım · Açıklama · Örnek cümle · Kategori · Ekleyen*.

## Görseller

Terim ve grup görselleri henüz hazırlanmadı. Görseli olmayan terim sözlükte “Görsel bekleniyor”, kapağı olmayan grup kendi simgesiyle görünür. Kart yaparken `public/art/` altındaki dört genel görselden biri kullanılır. Paylaşım görseli (`og.png`) de görseller hazırlanınca eklenecek.

## Yapay zekâ (isteğe bağlı)

`GEMINI_API_KEY` tanımlıysa kart yaparken cümle geri bildirimi, içerik denetimi ve görsel üretimi açılır; panelde “YZ ile üret” düğmesi görünür. Alternatif olarak `IMAGE_SERVICE_URL` + `IMAGE_SERVICE_TOKEN` ile kendi görsel servisiniz bağlanabilir. `AI_DAILY_IMAGE_LIMIT` günlük üretimi sınırlar.

## Gizlilik

Katılımcıdan gerçek ad yerine takma ad ya da “ad, sınıf” istenir; soyadı, okul ve iletişim bilgisi istenmez. Kart bağlantısını bilenler kartı görüntüleyebilir; ortak galeri ve sözlük yalnızca onaylı içeriği listeler.
