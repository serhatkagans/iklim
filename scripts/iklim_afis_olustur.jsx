#target illustrator
(function(){
    var W = 842, H = 1191, M = 48;
    var doc = app.documents.add(DocumentColorSpace.RGB, W, H);
    var ab = doc.artboards[0].artboardRect, L0 = ab[0], T0 = ab[1];
    
    // Yollar
    var ROOT = "C:/Users/HP/Desktop/genctek yeni/";
    var ART = ROOT + "iklim/public/art/";
    var PUB = ROOT + "iklim/public/";
    var OUT = ROOT + "afisler/";

    function c(h){
        var k = new RGBColor();
        k.red = parseInt(h.substr(0,2),16);
        k.green = parseInt(h.substr(2,2),16);
        k.blue = parseInt(h.substr(4,2),16);
        return k;
    }

    var RED = c("c4161c"), DARK = c("1e252b"), GRAY = c("4a5568"), LGRAY = c("718096");
    var BG = c("f6f7f9"), WHITE = c("ffffff"), DRED = c("9e1015"), GREEN = c("2e7d32");
    var HEAT_BLUE = c("2171b5"), BORDER = c("e2e8f0"), LIGHT_RED = c("fbe8e8");

    function getFont(pref, fallback){
        try {
            return app.textFonts.getByName(pref);
        } catch(e) {
            try { return app.textFonts.getByName(fallback); }
            catch(e2) { return app.textFonts.getByName("ArialMT"); }
        }
    }

    var F_TITLE = getFont("Montserrat-ExtraBold", "Arial-BoldMT");
    var F_BOLD = getFont("Inter-Bold", "Arial-BoldMT");
    var F_SEMI = getFont("Inter-SemiBold", "Arial-BoldMT");
    var F_MED = getFont("Inter-Medium", "ArialMT");
    var F_REG = getFont("Inter-Regular", "ArialMT");

    function rect(x, y, w, h, col, r){
        var p = r ? doc.pathItems.roundedRectangle(T0 - y, L0 + x, w, h, r, r) : doc.pathItems.rectangle(T0 - y, L0 + x, w, h);
        p.stroked = false;
        if(col){ p.filled = true; p.fillColor = col; }
        else { p.filled = false; }
        return p;
    }

    function txt(s, x, y, fontObj, size, col, opt){
        opt = opt || {};
        var t;
        if(opt.w){
            var box = doc.pathItems.rectangle(T0 - y, L0 + x, opt.w, opt.h || 400);
            t = doc.textFrames.areaText(box);
            t.contents = s;
        } else {
            t = doc.textFrames.add();
            t.contents = s;
        }
        var a = t.textRange.characterAttributes;
        a.textFont = fontObj;
        a.size = size;
        a.fillColor = col;
        if(opt.track) a.tracking = opt.track;
        if(opt.lead){ a.autoLeading = false; a.leading = opt.lead; }
        if(opt.align) t.textRange.paragraphAttributes.justification = opt.align;
        if(!opt.w){ t.left = L0 + x; t.top = T0 - y; }
        return t;
    }

    function place(path, x, y, w, h, r){
        var f = new File(path);
        if(!f.exists) return null;
        var pi = doc.placedItems.add();
        pi.file = f;
        var s = Math.max(w / pi.width, h / pi.height);
        pi.width *= s;
        pi.height *= s;
        pi.left = L0 + x + (w - pi.width) / 2;
        pi.top = T0 - y - (h - pi.height) / 2;
        pi.embed();
        
        var img = doc.pageItems[0];
        var g = doc.groupItems.add();
        var m = rect(x, y, w, h, null, r);
        img.move(g, ElementPlacement.PLACEATEND);
        m.move(g, ElementPlacement.PLACEATBEGINNING);
        g.clipped = true;
        return g;
    }

    // ==========================================
    // 1. ZEMİN & VİTRİN
    // ==========================================
    rect(0, 0, W, H, WHITE);
    var heroH = 595;
    rect(0, 0, W, heroH, RED);

    // Dekoratif sıcaklık dalgaları / daireleri
    var d1 = doc.pathItems.ellipse(T0 + 130, L0 + 510, 480, 480);
    d1.stroked = true; d1.filled = false; d1.strokeColor = WHITE; d1.strokeWidth = 1.2; d1.opacity = 18;
    var d2 = doc.pathItems.ellipse(T0 + 50, L0 + 590, 320, 320);
    d2.stroked = true; d2.filled = false; d2.strokeColor = WHITE; d2.strokeWidth = 1.2; d2.opacity = 14;
    var d3 = doc.pathItems.ellipse(T0 - 30, L0 + 670, 160, 160);
    d3.stroked = true; d3.filled = false; d3.strokeColor = WHITE; d3.strokeWidth = 1; d3.opacity = 10;

    // ==========================================
    // 2. LOGO VE BAŞLIK BANTI
    // ==========================================
    rect(M, 46, 62, 62, WHITE, 14);
    var logoFile = new File(PUB + "genc.png");
    if(logoFile.exists){
        var lg = doc.placedItems.add();
        lg.file = logoFile;
        var ls = 46 / lg.height;
        lg.width *= ls;
        lg.height *= ls;
        lg.left = L0 + M + 31 - lg.width / 2;
        lg.top = T0 - 46 - 8;
        lg.embed();
    }

    txt("GENÇTEK İKLİM SÖZLÜĞÜ", M + 80, 58, F_BOLD, 12, WHITE, {track: 180});
    var sub = txt("GençTek Akran Öğrenme Modeli • COP31 Antalya 2026", M + 80, 80, F_MED, 11, WHITE);
    sub.opacity = 85;

    // Sağ üst rozet: COP31 Antalya 2026
    var bW = 232, bH = 38, bX = W - M - bW, bY = 46;
    rect(bX, bY, bW, bH, WHITE, 19);
    var dot = doc.pathItems.ellipse(T0 - bY - 13, L0 + bX + 14, 12, 12);
    dot.filled = true; dot.fillColor = GREEN; dot.stroked = false;
    txt("COP31 ANTALYA 2026", bX + 34, bY + 14, F_BOLD, 9.5, RED, {track: 40});
    txt("9–20 KASIM 2026 • İKLİM ZİRVESİ", bX + 34, bY + 26, F_BOLD, 7.5, DARK, {track: 20});

    // ==========================================
    // 3. VİTRİN ANA MANŞET & METİNLER
    // ==========================================
    txt("Gezegenin\rgeleceği için\rortak dilimiz.", M, 148, F_TITLE, 64, WHITE, {w: 480, h: 250, lead: 68});

    var ldText = "GençTek öğrencileri bu sözlüğü COP31 Antalya 2026 zirvesi yolunda akranları için hazırladı: karşılıklar, bilimsel tanımlar, örnek cümleler, oyunlar ve interaktif terim kartları tek yerde.";
    txt(ldText, M, 375, F_REG, 14.5, WHITE, {w: 440, h: 85, lead: 22});

    // İstatistikler
    function stat(n, label, x){
        txt(n, x, 468, F_TITLE, 46, WHITE);
        var t = txt(label, x, 526, F_BOLD, 9.5, WHITE, {track: 160});
        t.opacity = 85;
    }
    stat("10", "ÇALIŞMA GRUBU", M);
    stat("202", "HAZIR TERİM", M + 145);

    // #iklimiçineylem etiketi
    rect(M + 285, 478, 155, 34, DRED, 17);
    txt("#iklimiçineylem", M + 285, 486, F_BOLD, 13, WHITE, {w: 155, h: 20, align: Justification.CENTER});

    // ==========================================
    // 4. SAĞ VİTRİN: ÖNE ÇIKAN TERİM KARTI
    // ==========================================
    var CX = 530, CY = 145, CW = 264, CH = 420;
    var sh = rect(CX + 8, CY + 10, CW, CH, c("000000"), 16);
    sh.opacity = 20;
    rect(CX, CY, CW, CH, WHITE, 16);

    // Kart Üst Görseli (sunrise.png: COP31 Antalya dünya & ısınma şeritleri)
    var imgH = 175;
    place(ART + "sunrise.png", CX + 12, CY + 12, CW - 24, imgH, 10);

    // Kategori Rozeti
    rect(CX + 20, CY + imgH + 24, 150, 20, LIGHT_RED, 10);
    txt("TEMEL KAVRAM • İKLİM BİLİMİ", CX + 20, CY + imgH + 29, F_BOLD, 7.5, RED, {w: 150, h: 14, track: 60, align: Justification.CENTER});

    // Terim Başlığı & İngilizcesi
    txt("Karbon ayak izi", CX + 20, CY + imgH + 54, F_TITLE, 21, DARK);
    txt("Carbon footprint", CX + 20, CY + imgH + 82, F_SEMI, 12, RED);

    // Tanım Metni
    var defText = "Bir kişinin, ürünün ya da kurumun neden olduğu doğrudan veya dolaylı toplam sera gazı salımı.";
    txt(defText, CX + 20, CY + imgH + 104, F_REG, 10, DARK, {w: CW - 40, h: 48, lead: 14.5});

    rect(CX + 20, CY + imgH + 152, CW - 40, 1, BORDER);

    // Örnek Cümle Alıntısı
    var exText = "“Okulumuzun karbon ayak izi ilk kez hesaplandı; sıfır atık adımlarıyla hızla azaltıyoruz.”";
    txt(exText, CX + 20, CY + imgH + 162, F_MED, 9.5, GRAY, {w: CW - 40, h: 40, lead: 13.5});

    // ==========================================
    // 5. ON ÇALIŞMA GRUBU BÖLÜMÜ
    // ==========================================
    var gy = heroH + 34;
    txt("10 çalışma grubu, tek ortak gelecek", M, gy, F_TITLE, 23, DARK);
    txt("İklim biliminden diplomasiye, enerjiden biyoçeşitliliğe COP31 odak alanları.", M, gy + 30, F_REG, 11.5, LGRAY);

    var groups = [
        ["01", "İklim Bilimi", "Sera etkisi, küresel ısınma", RED],
        ["02", "COP & Diplomasi", "COP31, UNFCCC, Paris Anlaşması", HEAT_BLUE],
        ["03", "Enerji Dönüşümü", "Yenilenebilir enerji, verimlilik", c("d97706")],
        ["04", "Sıfır Atık", "Döngüsel ekonomi, geri kazanım", GREEN],
        ["05", "Su ve Gıda", "Kuraklık direnci, tarım", c("0284c7")],
        ["06", "Biyoçeşitlilik", "Ormanlar, denizler, sulak alanlar", GREEN],
        ["07", "İklim Finansmanı", "Yeşil yatırımlar, karbon fiyatı", c("7c3aed")],
        ["08", "İklim Dostu Şehir", "Temiz ulaşım, yeşil binalar", c("0d9488")],
        ["09", "Uyum ve Direnç", "Erken uyarı, afet dirençliliği", c("ea580c")],
        ["10", "Gençlik Eylemi", "Ayak izi, iklim okuryazarlığı", RED]
    ];

    var gCols = 5;
    var gRows = 2;
    var gGapX = 10;
    var gGapY = 10;
    var gW = (W - 2 * M - (gCols - 1) * gGapX) / gCols;
    var gH = 58;

    for (var gi = 0; gi < groups.length; gi++) {
        var cIdx = gi % gCols;
        var rIdx = Math.floor(gi / gCols);
        var gx = M + cIdx * (gW + gGapX);
        var gyCard = gy + 56 + rIdx * (gH + gGapY);

        rect(gx, gyCard, gW, gH, BG, 10);
        rect(gx + 10, gyCard + 12, 3, 34, groups[gi][3], 1.5);
        txt(groups[gi][0], gx + 18, gyCard + 14, F_BOLD, 7.5, groups[gi][3]);
        txt(groups[gi][1], gx + 18, gyCard + 27, F_BOLD, 9.8, DARK, {w: gW - 26, h: 14});
        txt(groups[gi][2], gx + 18, gyCard + 43, F_REG, 7.5, LGRAY, {w: gW - 26, h: 12});
    }

    // ==========================================
    // 6. ÖZELLİKLER BÖLÜMÜ (4 KART)
    // ==========================================
    var fy = gy + 56 + gRows * (gH + gGapY) + 16;
    var features = [
        ["01", "Sözlük", "Çalışma grubu sırasıyla onaylı terimler, karşılıklar ve örnek cümleler; sayfa sonu eşleştirmeleri."],
        ["02", "Terimi Bul", "20 saniyelik 10 soruluk tur; kolay ve zor modlar, jokerler, okul ve sınıf yarışması."],
        ["03", "Canlı Yarışma", "Kahoot tarzı PIN ile tahtaya bağlan; 'COP31 ve İklim' soru setiyle sınıfça canlı yarış."],
        ["04", "Kart Yap", "Terimi kendi cümlende kullan, özgün iklim kartını tasarla ve ortak panoda sergile."]
    ];

    var fCols = 4;
    var fGap = 12;
    var fW = (W - 2 * M - (fCols - 1) * fGap) / fCols;
    var fH = 112;

    for (var fi = 0; fi < features.length; fi++) {
        var fx = M + fi * (fW + fGap);
        rect(fx, fy, fW, fH, BG, 12);
        rect(fx + 16, fy + 16, 26, 3, RED);
        txt(features[fi][0], fx + 16, fy + 26, F_TITLE, 11, RED);
        txt(features[fi][1], fx + 16, fy + 42, F_TITLE, 14.5, DARK);
        txt(features[fi][2], fx + 16, fy + 65, F_REG, 9.2, DARK, {w: fW - 32, h: 46, lead: 12.8});
    }

    // ==========================================
    // 7. YENİ AÇIK, ENERJİK VE ÇEKİCİ ALT BÖLÜM (WARMING STRIPES & INTERACTIVE CTA)
    // ==========================================
    var by = fy + fH + 18;
    
    // (A) ISINMA ŞERİTLERİ ŞERİDİ (Warming Stripes Ribbon)
    var stripes = [
        "08306b","08519c","125a9f","1b64a2","2171b5","2d7ebd","3a8bc5","4798cd","59a4d3",
        "6baed6","7fb8dc","94c4e2","9ecae1","afd2e7","c6dbef","d4e3f4","e5edf8","f6f2f0",
        "fee8dc","fddbc8","fccfb5","fcbba1","fca58e","fc9272","fc7e5c","fb6a4a","f6563e",
        "ef3b2c","e32b26","d71c20","cb181d","bf141b","b21118","a50f15","950c14","850a12",
        "760810","67000d"
    ];
    var sH = 7;
    var sW = W / stripes.length;
    for(var si = 0; si < stripes.length; si++){
        var sp = rect(si * sW, by, sW + 0.5, sH, c(stripes[si]));
    }

    // (B) AYDINLIK, FERAH ALT ZEMİN
    var footBgH = H - by - sH;
    rect(0, by + sH, W, footBgH, c("f0f5fa"));

    // Sol Taraf: Etkileşimli Başlık, Açıklama ve Canlı Aksiyon Çipleri
    var contentY = by + sH + 24;

    // Küçük Üst Kategori Rozeti
    rect(M, contentY, 230, 22, c("e0f2fe"), 11);
    txt("🌍 COP31 ANTALYA • GENÇLİK EYLEMİ", M + 14, contentY + 5, F_BOLD, 8, c("0369a1"), {track: 40});

    // Ana Çağrı Başlığı
    txt("İklimi anla, geleceği dönüştür!", M, contentY + 36, F_TITLE, 26, DARK);

    // Açıklama Metni
    var descText = "GençTek İklim Sözlüğü ile COP31 Antalya yolunda akranlarınla buluş; bilimsel kavramları oyunlarla öğren, sınıfça canlı yarışmaya katıl ve kendi özgün iklim kartını üret.";
    txt(descText, M, contentY + 70, F_REG, 11.5, GRAY, {w: 485, h: 44, lead: 16.5});

    // 3 Renkli ve Çekici Aksiyon Çipi (Pills)
    var pillY = contentY + 120;
    
    // Çip 1: Oyun
    rect(M, pillY, 142, 30, WHITE, 15);
    var pBorder1 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M, 142, 30, 15, 15);
    pBorder1.filled = false; pBorder1.stroked = true; pBorder1.strokeColor = c("bfdbfe"); pBorder1.strokeWidth = 1.2;
    txt("🎮 Terimi Bul (10 Soru)", M + 12, pillY + 8, F_BOLD, 8.8, c("1d4ed8"));

    // Çip 2: Canlı Yarışma
    rect(M + 154, pillY, 168, 30, WHITE, 15);
    var pBorder2 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 154, 168, 30, 15, 15);
    pBorder2.filled = false; pBorder2.stroked = true; pBorder2.strokeColor = c("bbf7d0"); pBorder2.strokeWidth = 1.2;
    txt("🏆 Sınıf Modu (Kahoot Tarzı)", M + 166, pillY + 8, F_BOLD, 8.8, c("15803d"));

    // Çip 3: Kart Yap
    rect(M + 334, pillY, 154, 30, WHITE, 15);
    var pBorder3 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 334, 154, 30, 15, 15);
    pBorder3.filled = false; pBorder3.stroked = true; pBorder3.strokeColor = c("fecdd3"); pBorder3.strokeWidth = 1.2;
    txt("✨ Kendi Kartını Tasarla", M + 346, pillY + 8, F_BOLD, 8.8, c("be123c"));

    // Sağ Taraf: Şık ve Beyaz Kare Kod Kartı
    var qCardW = 152, qCardH = 158;
    var qCardX = W - M - qCardW;
    var qCardY = contentY - 4;

    // Kare Kod Kart Gölgesi
    var qSh = rect(qCardX + 4, qCardY + 6, qCardW, qCardH, c("000000"), 16);
    qSh.opacity = 8;

    // Beyaz Kart
    rect(qCardX, qCardY, qCardW, qCardH, WHITE, 16);
    var qCardBorder = doc.pathItems.roundedRectangle(T0 - qCardY, L0 + qCardX, qCardW, qCardH, 16, 16);
    qCardBorder.filled = false; qCardBorder.stroked = true; qCardBorder.strokeColor = c("cbd5e1"); qCardBorder.strokeWidth = 1;

    // Kart İçi Başlık
    txt("KARE KODU OKUT", qCardX, qCardY + 16, F_BOLD, 9, DARK, {w: qCardW, align: Justification.CENTER, track: 60});
    txt("Sözlüğe katıl & hemen oyna", qCardX, qCardY + 29, F_MED, 7.5, LGRAY, {w: qCardW, align: Justification.CENTER});

    // Kare Kod Çerçevesi
    var qBoxSize = 78;
    var qBoxX = qCardX + (qCardW - qBoxSize) / 2;
    var qBoxY = qCardY + 44;
    rect(qBoxX, qBoxY, qBoxSize, qBoxSize, c("f8fafc"), 10);
    var qBoxBorder = doc.pathItems.roundedRectangle(T0 - qBoxY, L0 + qBoxX, qBoxSize, qBoxSize, 10, 10);
    qBoxBorder.filled = false; qBoxBorder.stroked = true; qBoxBorder.strokeColor = c("94a3b8"); qBoxBorder.strokeWidth = 1.2;
    
    // Köşe simülasyon kareleri
    rect(qBoxX + 6, qBoxY + 6, 18, 18, DARK, 4);
    rect(qBoxX + 9, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + 11, 8, 8, DARK, 2);

    rect(qBoxX + qBoxSize - 24, qBoxY + 6, 18, 18, DARK, 4);
    rect(qBoxX + qBoxSize - 21, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + qBoxSize - 19, qBoxY + 11, 8, 8, DARK, 2);

    rect(qBoxX + 6, qBoxY + qBoxSize - 24, 18, 18, DARK, 4);
    rect(qBoxX + 9, qBoxY + qBoxSize - 21, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + qBoxSize - 19, 8, 8, DARK, 2);

    txt("KOD", qBoxX, qBoxY + 42, F_BOLD, 9.5, RED, {w: qBoxSize, align: Justification.CENTER, track: 80});

    // Alt Web Adresi Buton/Pill
    rect(qCardX + 14, qCardY + 130, qCardW - 28, 18, LIGHT_RED, 9);
    txt("iklim.genctek.org", qCardX + 14, qCardY + 134, F_BOLD, 8, RED, {w: qCardW - 28, align: Justification.CENTER, track: 30});

    // ==========================================
    // 8. KAYDET VE DIŞA AKTAR
    // ==========================================
    app.redraw();
    doc.artboards.setActiveArtboardIndex(0);
    app.executeMenuCommand('fitin');

    var aiOptions = new IllustratorSaveOptions();
    aiOptions.pdfCompatible = true;
    doc.saveAs(new File(OUT + "Genctek-Iklim-Sozlugu-afis.ai"), aiOptions);

    var pdfOptions = new PDFSaveOptions();
    pdfOptions.preserveEditability = true;
    doc.saveAs(new File(OUT + "Genctek-Iklim-Sozlugu-afis.pdf"), pdfOptions);

    var pngOptions = new ExportOptionsPNG24();
    pngOptions.artBoardClipping = true;
    pngOptions.horizontalScale = 150;
    pngOptions.verticalScale = 150;
    pngOptions.transparency = false;
    doc.exportFile(new File(OUT + "Genctek-Iklim-Sozlugu-afis.png"), ExportType.PNG24, pngOptions);

    doc.exportFile(new File(PUB + "Genctek-Iklim-Sozlugu-afis.png"), ExportType.PNG24, pngOptions);
    doc.saveAs(new File(PUB + "Genctek-Iklim-Sozlugu-afis.pdf"), pdfOptions);

    doc.saveAs(new File(OUT + "Genctek-Iklim-Sozlugu-afis.ai"), aiOptions);

    return "Tamamlandı: Yenilenen ferah ve çekici afiş oluşturuldu!";
})();
