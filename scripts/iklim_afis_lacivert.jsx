#target illustrator
(function(){
    var W = 842, H = 1191, M = 48;
    var doc = app.documents.add(DocumentColorSpace.RGB, W, H);
    var ab = doc.artboards[0].artboardRect, L0 = ab[0], T0 = ab[1];
    
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

    var NAVY = c("0b1e36"), MID_NAVY = c("132f54"), SKY = c("0284c7"), CYAN = c("38bdf8");
    var DARK = c("0f172a"), GRAY = c("334155"), LGRAY = c("64748b");
    var BG = c("f8fafc"), WHITE = c("ffffff"), SUN = c("f59e0b"), LIGHT_BLUE = c("e0f2fe");
    var BORDER = c("e2e8f0"), GREEN = c("10b981");

    function getFont(pref, fallback){
        try { return app.textFonts.getByName(pref); }
        catch(e) {
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
    // 1. ZEMİN & VİTRİN (DERİN AKDENİZ LACİVERTİ)
    // ==========================================
    rect(0, 0, W, H, WHITE);
    var heroH = 595;
    rect(0, 0, W, heroH, NAVY);

    // Enerji & İklim yörünge eğrileri
    var d1 = doc.pathItems.ellipse(T0 + 130, L0 + 510, 480, 480);
    d1.stroked = true; d1.filled = false; d1.strokeColor = CYAN; d1.strokeWidth = 1.2; d1.opacity = 22;
    var d2 = doc.pathItems.ellipse(T0 + 50, L0 + 590, 320, 320);
    d2.stroked = true; d2.filled = false; d2.strokeColor = CYAN; d2.strokeWidth = 1.2; d2.opacity = 16;
    var d3 = doc.pathItems.ellipse(T0 - 30, L0 + 670, 160, 160);
    d3.stroked = true; d3.filled = false; d3.strokeColor = SUN; d3.strokeWidth = 1; d3.opacity = 14;

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
    var sub = txt("Temiz Enerji • COP31 İklim Diplomasisi & 1.5°C", M + 80, 80, F_MED, 11, CYAN);
    sub.opacity = 90;

    // Sağ üst rozet
    var bW = 240, bH = 38, bX = W - M - bW, bY = 46;
    rect(bX, bY, bW, bH, WHITE, 19);
    var dot = doc.pathItems.ellipse(T0 - bY - 13, L0 + bX + 14, 12, 12);
    dot.filled = true; dot.fillColor = SUN; dot.stroked = false;
    txt("TEMİZ ENERJİ & COP31", bX + 34, bY + 14, F_BOLD, 9.5, NAVY, {track: 30});
    txt("YENİLENEBİLİR GÜÇ • 1.5°C HEDEFİ", bX + 34, bY + 26, F_BOLD, 7.2, GRAY, {track: 20});

    // ==========================================
    // 3. VİTRİN ANA MANŞET & METİNLER
    // ==========================================
    txt("Temiz enerjiyle\rgeleceği aydınlat,\riklimi dönüştür.", M, 148, F_TITLE, 46, WHITE, {w: 460, h: 190, lead: 52});

    var ldText = "Güneşten rüzgâra, enerji depolamadan uluslararası iklim zirvelerine yeşil dönüşümün ortak dili. GençTek ile yenilenebilir enerjiyi öğren, 2053 net sıfır hedefine güç kat.";
    txt(ldText, M, 360, F_REG, 13.5, WHITE, {w: 440, h: 75, lead: 21});

    function stat(n, label, x){
        txt(n, x, 468, F_TITLE, 46, WHITE);
        var t = txt(label, x, 526, F_BOLD, 9.5, CYAN, {track: 160});
        t.opacity = 90;
    }
    stat("1.5°C", "KRİTİK HEDEF", M);
    stat("2053", "NET SIFIR VİZYONU", M + 155);

    rect(M + 310, 478, 140, 34, MID_NAVY, 17);
    var stBorder = doc.pathItems.roundedRectangle(T0 - 478, L0 + M + 310, 140, 34, 17, 17);
    stBorder.filled = false; stBorder.stroked = true; stBorder.strokeColor = CYAN; stBorder.strokeWidth = 1.2;
    txt("#enerjidönüşümü", M + 310, 486, F_BOLD, 12, CYAN, {w: 140, h: 20, align: Justification.CENTER});

    // ==========================================
    // 4. SAĞ VİTRİN: ÖNE ÇIKAN TEMİZ ENERJİ KARTI
    // ==========================================
    var CX = 530, CY = 145, CW = 264, CH = 420;
    var sh = rect(CX + 8, CY + 10, CW, CH, c("000000"), 16);
    sh.opacity = 25;
    rect(CX, CY, CW, CH, WHITE, 16);

    // Kart Üst Görseli: stars.png (Rüzgâr türbinleri, dağlar, güneş panelleri, ısınma şeritleri)
    var imgH = 175;
    place(ART + "stars.png", CX + 12, CY + 12, CW - 24, imgH, 10);

    rect(CX + 20, CY + imgH + 24, 160, 20, LIGHT_BLUE, 10);
    txt("TEMİZ ENERJİ • DÖNÜŞÜM", CX + 20, CY + imgH + 29, F_BOLD, 7.5, SKY, {w: 160, h: 14, track: 60, align: Justification.CENTER});

    txt("Yenilenebilir enerji", CX + 20, CY + imgH + 54, F_TITLE, 20, DARK);
    txt("Renewable energy", CX + 20, CY + imgH + 82, F_SEMI, 12, SKY);

    var defText = "Güneş, rüzgâr, jeotermal gibi doğal süreçlerle kendini sürekli yenileyen ve tükenmeyen temiz enerji kaynakları.";
    txt(defText, CX + 20, CY + imgH + 104, F_REG, 10, DARK, {w: CW - 40, h: 48, lead: 14.5});

    rect(CX + 20, CY + imgH + 152, CW - 40, 1, BORDER);

    var exText = "“Okul çatımıza kurulan güneş panelleriyle elektriğimizin yarısını yenilenebilir enerjiden karşılıyoruz.”";
    txt(exText, CX + 20, CY + imgH + 162, F_MED, 9.5, GRAY, {w: CW - 40, h: 40, lead: 13.5});

    // ==========================================
    // 5. ON ODAK ÇALIŞMA ALANI
    // ==========================================
    var gy = heroH + 34;
    txt("Geleceği kuran 10 odak alanı", M, gy, F_TITLE, 23, DARK);
    txt("Temiz enerjiden iklim diplomasisine, yeşil finanstan akıllı şehirlere yenilikçi başlıklar.", M, gy + 30, F_REG, 11.5, LGRAY);

    var groups = [
        ["01", "Enerji Dönüşümü", "Güneş, rüzgâr, hidrojen gücü", SUN],
        ["02", "COP & Diplomasi", "COP31 Antalya, Paris hedefleri", SKY],
        ["03", "İklim Bilimi", "Sera gazı salımları, 1.5°C", c("c4161c")],
        ["04", "İklim Finansmanı", "Karbon fiyatı, yeşil tahviller", c("7c3aed")],
        ["05", "Akıllı Şehirler", "Elektrikli ulaşım, yeşil bina", c("0d9488")],
        ["06", "Sıfır Atık", "Döngüsel malzeme, eko-tasarım", GREEN],
        ["07", "Su ve Gıda", "Temiz su enerjisi, akıllı tarım", c("0284c7")],
        ["08", "Uyum ve Direnç", "Şebeke dayanıklılığı, erken uyarı", c("ea580c")],
        ["09", "Biyoçeşitlilik", "Ekosistem koruma, yeşil alan", GREEN],
        ["10", "Gençlik Eylemi", "Enerji tasarrufu, akran eğitimi", SKY]
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
        ["01", "Enerji Sözlüğü", "Yenilenebilir enerji, depolama ve iklim politikaları terimleri; eşleştirmeli alıştırmalar."],
        ["02", "1.5°C Görevi", "20 saniyelik 10 soruluk enerji testi; doğru cevap serisi, jokerler ve sınıf skoru."],
        ["03", "Canlı Yarışma", "Sınıfça tahtaya bağlan; 'Enerji ve COP31' özel soru setiyle kıyasıya canlı yarış."],
        ["04", "Güç Kartı Tasarla", "Terimi kendi cümlende kullan, temiz enerji kartını oluştur ve ortak panoda sergile."]
    ];

    var fCols = 4;
    var fGap = 12;
    var fW = (W - 2 * M - (fCols - 1) * fGap) / fCols;
    var fH = 112;

    for (var fi = 0; fi < features.length; fi++) {
        var fx = M + fi * (fW + fGap);
        rect(fx, fy, fW, fH, BG, 12);
        rect(fx + 16, fy + 16, 26, 3, SKY);
        txt(features[fi][0], fx + 16, fy + 26, F_TITLE, 11, SKY);
        txt(features[fi][1], fx + 16, fy + 42, F_TITLE, 14.5, DARK);
        txt(features[fi][2], fx + 16, fy + 65, F_REG, 9.2, DARK, {w: fW - 32, h: 46, lead: 12.8});
    }

    // ==========================================
    // 7. AYDINLIK VE DİNAMİK LACİVERT/BUZ MAVİSİ ALT BÖLÜM
    // ==========================================
    var by = fy + fH + 18;
    
    // Enerji & Sıcaklık Geçiş Şeridi (Maviden Güneş Sarısına)
    var energyStripes = [
        "0b1e36","0e2a4a","12365e","164372","1a4f86","1e5c9a","0284c7","38bdf8","7dd3fc",
        "bae6fd","e0f2fe","fef3c7","fde68a","fcd34d","fbbf24","f59e0b","d97706","b45309"
    ];
    var sH = 7;
    var sW = W / energyStripes.length;
    for(var si = 0; si < energyStripes.length; si++){
        rect(si * sW, by, sW + 0.5, sH, c(energyStripes[si]));
    }

    var footBgH = H - by - sH;
    rect(0, by + sH, W, footBgH, c("f0f6fc"));

    var contentY = by + sH + 24;

    rect(M, contentY, 230, 22, c("e0f2fe"), 11);
    txt("⚡ TEMİZ ENERJİ • GENÇLİK EYLEMİ", M + 14, contentY + 5, F_BOLD, 7.8, SKY, {track: 30});

    txt("Enerjini geleceğe ver, dünyayı aydınlat!", M, contentY + 36, F_TITLE, 25, DARK);

    var descText = "COP31 Antalya yolunda temiz enerji dönüşümünün öncüsü ol; terimleri eğlenerek öğren, sınıfınla canlı yarışmaya katıl ve kendi enerji kartını tasarla.";
    txt(descText, M, contentY + 70, F_REG, 11.5, GRAY, {w: 485, h: 44, lead: 16.5});

    var pillY = contentY + 120;
    
    rect(M, pillY, 154, 30, WHITE, 15);
    var pBorder1 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M, 154, 30, 15, 15);
    pBorder1.filled = false; pBorder1.stroked = true; pBorder1.strokeColor = c("bae6fd"); pBorder1.strokeWidth = 1.2;
    txt("💡 Enerji Tasarruf Testi", M + 12, pillY + 8, F_BOLD, 8.8, SKY);

    rect(M + 166, pillY, 168, 30, WHITE, 15);
    var pBorder2 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 166, 168, 30, 15, 15);
    pBorder2.filled = false; pBorder2.stroked = true; pBorder2.strokeColor = c("bbf7d0"); pBorder2.strokeWidth = 1.2;
    txt("🏆 Canlı Sınıf Modu (PIN ile)", M + 178, pillY + 8, F_BOLD, 8.8, c("15803d"));

    rect(M + 346, pillY, 154, 30, WHITE, 15);
    var pBorder3 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 346, 154, 30, 15, 15);
    pBorder3.filled = false; pBorder3.stroked = true; pBorder3.strokeColor = c("fde68a"); pBorder3.strokeWidth = 1.2;
    txt("🔋 Temiz Enerji Kartı Yap", M + 358, pillY + 8, F_BOLD, 8.8, c("b45309"));

    // Sağ Taraf: Kare Kod Kartı
    var qCardW = 152, qCardH = 158;
    var qCardX = W - M - qCardW;
    var qCardY = contentY - 4;

    var qSh = rect(qCardX + 4, qCardY + 6, qCardW, qCardH, c("000000"), 16);
    qSh.opacity = 8;

    rect(qCardX, qCardY, qCardW, qCardH, WHITE, 16);
    var qCardBorder = doc.pathItems.roundedRectangle(T0 - qCardY, L0 + qCardX, qCardW, qCardH, 16, 16);
    qCardBorder.filled = false; qCardBorder.stroked = true; qCardBorder.strokeColor = c("cbd5e1"); qCardBorder.strokeWidth = 1;

    txt("KARE KODU OKUT", qCardX, qCardY + 16, F_BOLD, 9, DARK, {w: qCardW, align: Justification.CENTER, track: 60});
    txt("Enerji sözlüğünü hemen aç", qCardX, qCardY + 29, F_MED, 7.5, LGRAY, {w: qCardW, align: Justification.CENTER});

    var qBoxSize = 78;
    var qBoxX = qCardX + (qCardW - qBoxSize) / 2;
    var qBoxY = qCardY + 44;
    rect(qBoxX, qBoxY, qBoxSize, qBoxSize, c("f0f9ff"), 10);
    var qBoxBorder = doc.pathItems.roundedRectangle(T0 - qBoxY, L0 + qBoxX, qBoxSize, qBoxSize, 10, 10);
    qBoxBorder.filled = false; qBoxBorder.stroked = true; qBoxBorder.strokeColor = c("7dd3fc"); qBoxBorder.strokeWidth = 1.2;
    
    rect(qBoxX + 6, qBoxY + 6, 18, 18, NAVY, 4);
    rect(qBoxX + 9, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + 11, 8, 8, NAVY, 2);

    rect(qBoxX + qBoxSize - 24, qBoxY + 6, 18, 18, NAVY, 4);
    rect(qBoxX + qBoxSize - 21, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + qBoxSize - 19, qBoxY + 11, 8, 8, NAVY, 2);

    rect(qBoxX + 6, qBoxY + qBoxSize - 24, 18, 18, NAVY, 4);
    rect(qBoxX + 9, qBoxY + qBoxSize - 21, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + qBoxSize - 19, 8, 8, NAVY, 2);

    txt("KOD", qBoxX, qBoxY + 42, F_BOLD, 9.5, NAVY, {w: qBoxSize, align: Justification.CENTER, track: 80});

    rect(qCardX + 14, qCardY + 130, qCardW - 28, 18, LIGHT_BLUE, 9);
    txt("iklim.genctek.org", qCardX + 14, qCardY + 134, F_BOLD, 8, SKY, {w: qCardW - 28, align: Justification.CENTER, track: 30});

    // ==========================================
    // 8. KAYDET VE DIŞA AKTAR
    // ==========================================
    app.redraw();
    doc.artboards.setActiveArtboardIndex(0);
    app.executeMenuCommand('fitin');

    var aiOptions = new IllustratorSaveOptions();
    aiOptions.pdfCompatible = true;
    doc.saveAs(new File(OUT + "Genctek-Iklim-Afis-Lacivert.ai"), aiOptions);

    var pdfOptions = new PDFSaveOptions();
    pdfOptions.preserveEditability = true;
    doc.saveAs(new File(OUT + "Genctek-Iklim-Afis-Lacivert.pdf"), pdfOptions);

    var pngOptions = new ExportOptionsPNG24();
    pngOptions.artBoardClipping = true;
    pngOptions.horizontalScale = 150;
    pngOptions.verticalScale = 150;
    pngOptions.transparency = false;
    doc.exportFile(new File(OUT + "Genctek-Iklim-Afis-Lacivert.png"), ExportType.PNG24, pngOptions);

    doc.exportFile(new File(PUB + "Genctek-Iklim-Afis-Lacivert.png"), ExportType.PNG24, pngOptions);
    doc.saveAs(new File(PUB + "Genctek-Iklim-Afis-Lacivert.pdf"), pdfOptions);

    doc.saveAs(new File(OUT + "Genctek-Iklim-Afis-Lacivert.ai"), aiOptions);

    return "Tamamlandı: Genctek-Iklim-Afis-Lacivert oluşturuldu!";
})();
