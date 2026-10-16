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

    var FOREST = c("1b4332"), EMERALD = c("2d6a4f"), LEAF = c("40916c"), LIGHT_GREEN = c("e8f5e9");
    var DARK = c("1a202c"), GRAY = c("4a5568"), LGRAY = c("718096");
    var BG = c("f7f9f7"), WHITE = c("ffffff"), ACCENT = c("52b788"), BORDER = c("e2e8f0");
    var GOLD = c("d97706"), BLUE = c("0284c7");

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
    // 1. ZEMİN & VİTRİN (DERİN DOĞA YEŞİLİ)
    // ==========================================
    rect(0, 0, W, H, WHITE);
    var heroH = 595;
    rect(0, 0, W, heroH, FOREST);

    // Ekolojik organik halkalar
    var d1 = doc.pathItems.ellipse(T0 + 130, L0 + 510, 480, 480);
    d1.stroked = true; d1.filled = false; d1.strokeColor = ACCENT; d1.strokeWidth = 1.2; d1.opacity = 20;
    var d2 = doc.pathItems.ellipse(T0 + 50, L0 + 590, 320, 320);
    d2.stroked = true; d2.filled = false; d2.strokeColor = ACCENT; d2.strokeWidth = 1.2; d2.opacity = 15;
    var d3 = doc.pathItems.ellipse(T0 - 30, L0 + 670, 160, 160);
    d3.stroked = true; d3.filled = false; d3.strokeColor = ACCENT; d3.strokeWidth = 1; d3.opacity = 12;

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
    var sub = txt("Doğa & Biyoçeşitlilik • Sıfır Atık Hareketi", M + 80, 80, F_MED, 11, ACCENT);
    sub.opacity = 90;

    // Sağ üst rozet
    var bW = 240, bH = 38, bX = W - M - bW, bY = 46;
    rect(bX, bY, bW, bH, WHITE, 19);
    var dot = doc.pathItems.ellipse(T0 - bY - 13, L0 + bX + 14, 12, 12);
    dot.filled = true; dot.fillColor = LEAF; dot.stroked = false;
    txt("SIFIR ATIK & BİYOÇEŞİTLİLİK", bX + 34, bY + 14, F_BOLD, 9.2, FOREST, {track: 30});
    txt("DÖNGÜSEL EKONOMİ • DOĞAL DİRENÇ", bX + 34, bY + 26, F_BOLD, 7.5, GRAY, {track: 20});

    // ==========================================
    // 3. VİTRİN ANA MANŞET & METİNLER
    // ==========================================
    txt("Doğayı koru,\rdöngüsel geleceği\rbirlikte başlat.", M, 148, F_TITLE, 46, WHITE, {w: 460, h: 190, lead: 52});

    var ldText = "Ormanlardan denizlere, atık önlemeden döngüsel üretime ekosistemin temel kavramları. GençTek öğrencileriyle doğanın dilini öğren, sıfır atık adımlarıyla geleceğe nefes ol.";
    txt(ldText, M, 360, F_REG, 13.5, WHITE, {w: 440, h: 75, lead: 21});

    function stat(n, label, x){
        txt(n, x, 468, F_TITLE, 46, WHITE);
        var t = txt(label, x, 526, F_BOLD, 9.5, ACCENT, {track: 160});
        t.opacity = 90;
    }
    stat("202", "DOĞA TERİMİ", M);
    stat("%100", "DÖNGÜSEL HEDEF", M + 145);

    rect(M + 295, 478, 150, 34, EMERALD, 17);
    txt("#sıfıratıkhareketi", M + 295, 486, F_BOLD, 12.5, WHITE, {w: 150, h: 20, align: Justification.CENTER});

    // ==========================================
    // 4. SAĞ VİTRİN: ÖNE ÇIKAN DÖNGÜSEL KART
    // ==========================================
    var CX = 530, CY = 145, CW = 264, CH = 420;
    var sh = rect(CX + 8, CY + 10, CW, CH, c("000000"), 16);
    sh.opacity = 22;
    rect(CX, CY, CW, CH, WHITE, 16);

    // Kart Üst Görseli: forest.png (Antalya Toroslar, palmiyeler, Yivli Minare, Akdeniz)
    var imgH = 175;
    place(ART + "forest.png", CX + 12, CY + 12, CW - 24, imgH, 10);

    rect(CX + 20, CY + imgH + 24, 160, 20, LIGHT_GREEN, 10);
    txt("DÖNGÜSEL EKONOMİ • SIFIR ATIK", CX + 20, CY + imgH + 29, F_BOLD, 7.5, FOREST, {w: 160, h: 14, track: 60, align: Justification.CENTER});

    txt("Döngüsel ekonomi", CX + 20, CY + imgH + 54, F_TITLE, 21, DARK);
    txt("Circular economy", CX + 20, CY + imgH + 82, F_SEMI, 12, LEAF);

    var defText = "Atıkların kaynağında önlendiği, hammaddelerin sürekli döngüde tutularak yeniden kullanıldığı üretim ve tüketim modeli.";
    txt(defText, CX + 20, CY + imgH + 104, F_REG, 10, DARK, {w: CW - 40, h: 48, lead: 14.5});

    rect(CX + 20, CY + imgH + 152, CW - 40, 1, BORDER);

    var exText = "“Okul kantininde tek kullanımlık plastikleri kaldırarak döngüsel ekonomi modeline geçtik.”";
    txt(exText, CX + 20, CY + imgH + 162, F_MED, 9.5, GRAY, {w: CW - 40, h: 40, lead: 13.5});

    // ==========================================
    // 5. ON ODAK ÇALIŞMA ALANI
    // ==========================================
    var gy = heroH + 34;
    txt("Doğayla uyumlu 10 odak alanı", M, gy, F_TITLE, 23, DARK);
    txt("Biyoçeşitlilikten sıfır atığa, su güvenliğinden afet dayanıklılığına ekolojik kavramlar.", M, gy + 30, F_REG, 11.5, LGRAY);

    var groups = [
        ["01", "Biyoçeşitlilik", "Ormanlar, sulak alanlar, türler", LEAF],
        ["02", "Sıfır Atık", "Döngüsel ekonomi, geri dönüşüm", FOREST],
        ["03", "Su ve Gıda", "Kuraklık yönetimi, eko-tarım", BLUE],
        ["04", "İklim Bilimi", "Sera gazları, karbon döngüsü", c("c4161c")],
        ["05", "Enerji Dönüşümü", "Güneş, rüzgâr, temiz güç", GOLD],
        ["06", "Uyum ve Direnç", "Afet hazırlığı, erken uyarı", c("ea580c")],
        ["07", "İklim Dostu Şehir", "Yeşil koridorlar, temiz ulaşım", c("0d9488")],
        ["08", "İklim Finansmanı", "Yeşil fonlar, doğa yatırımları", c("7c3aed")],
        ["09", "COP Diplomasi", "Küresel anlaşmalar, biyo-zirve", c("2171b5")],
        ["10", "Gençlik Eylemi", "Kıyı temizliği, ağaçlandırma", FOREST]
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
        ["01", "Doğa Sözlüğü", "Biyoçeşitlilik, sıfır atık ve ekosistem terimleri; örnek cümleler ve eşleştirmeler."],
        ["02", "Eko Test", "20 saniyelik 10 soruluk doğa ve iklim turu; jokerler ve okul rekorları."],
        ["03", "Canlı Yarışma", "Sınıfça tahtaya bağlan; 'Doğa ve Sıfır Atık' soru setiyle eğlenceli yarış."],
        ["04", "Yeşil Kart Yap", "Terimi kendi doğa cümlende kullan, özel kartını tasarla ve panoda paylaş."]
    ];

    var fCols = 4;
    var fGap = 12;
    var fW = (W - 2 * M - (fCols - 1) * fGap) / fCols;
    var fH = 112;

    for (var fi = 0; fi < features.length; fi++) {
        var fx = M + fi * (fW + fGap);
        rect(fx, fy, fW, fH, BG, 12);
        rect(fx + 16, fy + 16, 26, 3, LEAF);
        txt(features[fi][0], fx + 16, fy + 26, F_TITLE, 11, LEAF);
        txt(features[fi][1], fx + 16, fy + 42, F_TITLE, 14.5, DARK);
        txt(features[fi][2], fx + 16, fy + 65, F_REG, 9.2, DARK, {w: fW - 32, h: 46, lead: 12.8});
    }

    // ==========================================
    // 7. AYDINLIK YEŞİL ALT BÖLÜM
    // ==========================================
    var by = fy + fH + 18;
    
    // Doğa Yeşil Gradyan Şeridi
    var ecoStripes = [
        "1b4332","21503c","275e47","2d6a4f","35795b","3d8866","40916c","499b74","52b788",
        "61c094","74c69d","88cca7","95d5b2","a7deb5","b7e4c7","caebd4","d8f3dc","e6faea",
        "d8f3dc","b7e4c7","95d5b2","74c69d","52b788","40916c","2d6a4f","1b4332"
    ];
    var sH = 7;
    var sW = W / ecoStripes.length;
    for(var si = 0; si < ecoStripes.length; si++){
        rect(si * sW, by, sW + 0.5, sH, c(ecoStripes[si]));
    }

    var footBgH = H - by - sH;
    rect(0, by + sH, W, footBgH, c("f2f8f5"));

    var contentY = by + sH + 24;

    rect(M, contentY, 230, 22, c("dcfce7"), 11);
    txt("🌿 SIFIR ATIK • AKRAN ÖĞRENME HAREKETİ", M + 14, contentY + 5, F_BOLD, 7.8, c("15803d"), {track: 30});

    txt("Gezegeni koru, döngüye katıl!", M, contentY + 36, F_TITLE, 26, DARK);

    var descText = "GençTek ile doğanın dengesini koruyan döngüsel çözümleri keşfet; sınıfınla canlı yarışmalara katıl, sıfır atık adımlarınla okuluna ve çevrene ilham ver.";
    txt(descText, M, contentY + 70, F_REG, 11.5, GRAY, {w: 485, h: 44, lead: 16.5});

    var pillY = contentY + 120;
    
    rect(M, pillY, 148, 30, WHITE, 15);
    var pBorder1 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M, 148, 30, 15, 15);
    pBorder1.filled = false; pBorder1.stroked = true; pBorder1.strokeColor = c("bbf7d0"); pBorder1.strokeWidth = 1.2;
    txt("🌱 Sıfır Atık Testi (10 Soru)", M + 12, pillY + 8, F_BOLD, 8.8, c("15803d"));

    rect(M + 160, pillY, 168, 30, WHITE, 15);
    var pBorder2 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 160, 168, 30, 15, 15);
    pBorder2.filled = false; pBorder2.stroked = true; pBorder2.strokeColor = c("bfdbfe"); pBorder2.strokeWidth = 1.2;
    txt("🏆 Canlı Yarışma (Sınıf PIN'i)", M + 172, pillY + 8, F_BOLD, 8.8, c("1d4ed8"));

    rect(M + 340, pillY, 154, 30, WHITE, 15);
    var pBorder3 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 340, 154, 30, 15, 15);
    pBorder3.filled = false; pBorder3.stroked = true; pBorder3.strokeColor = c("fed7aa"); pBorder3.strokeWidth = 1.2;
    txt("🎨 Doğa Kartını Tasarla", M + 352, pillY + 8, F_BOLD, 8.8, c("c2410c"));

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
    txt("Doğa sözlüğünü hemen aç", qCardX, qCardY + 29, F_MED, 7.5, LGRAY, {w: qCardW, align: Justification.CENTER});

    var qBoxSize = 78;
    var qBoxX = qCardX + (qCardW - qBoxSize) / 2;
    var qBoxY = qCardY + 44;
    rect(qBoxX, qBoxY, qBoxSize, qBoxSize, c("f0fdf4"), 10);
    var qBoxBorder = doc.pathItems.roundedRectangle(T0 - qBoxY, L0 + qBoxX, qBoxSize, qBoxSize, 10, 10);
    qBoxBorder.filled = false; qBoxBorder.stroked = true; qBoxBorder.strokeColor = c("86efac"); qBoxBorder.strokeWidth = 1.2;
    
    rect(qBoxX + 6, qBoxY + 6, 18, 18, FOREST, 4);
    rect(qBoxX + 9, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + 11, 8, 8, FOREST, 2);

    rect(qBoxX + qBoxSize - 24, qBoxY + 6, 18, 18, FOREST, 4);
    rect(qBoxX + qBoxSize - 21, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + qBoxSize - 19, qBoxY + 11, 8, 8, FOREST, 2);

    rect(qBoxX + 6, qBoxY + qBoxSize - 24, 18, 18, FOREST, 4);
    rect(qBoxX + 9, qBoxY + qBoxSize - 21, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + qBoxSize - 19, 8, 8, FOREST, 2);

    txt("KOD", qBoxX, qBoxY + 42, F_BOLD, 9.5, FOREST, {w: qBoxSize, align: Justification.CENTER, track: 80});

    rect(qCardX + 14, qCardY + 130, qCardW - 28, 18, c("dcfce7"), 9);
    txt("iklim.genctek.org", qCardX + 14, qCardY + 134, F_BOLD, 8, c("15803d"), {w: qCardW - 28, align: Justification.CENTER, track: 30});

    // ==========================================
    // 8. KAYDET VE DIŞA AKTAR
    // ==========================================
    app.redraw();
    doc.artboards.setActiveArtboardIndex(0);
    app.executeMenuCommand('fitin');

    var aiOptions = new IllustratorSaveOptions();
    aiOptions.pdfCompatible = true;
    doc.saveAs(new File(OUT + "Genctek-Iklim-Afis-Yesil.ai"), aiOptions);

    var pdfOptions = new PDFSaveOptions();
    pdfOptions.preserveEditability = true;
    doc.saveAs(new File(OUT + "Genctek-Iklim-Afis-Yesil.pdf"), pdfOptions);

    var pngOptions = new ExportOptionsPNG24();
    pngOptions.artBoardClipping = true;
    pngOptions.horizontalScale = 150;
    pngOptions.verticalScale = 150;
    pngOptions.transparency = false;
    doc.exportFile(new File(OUT + "Genctek-Iklim-Afis-Yesil.png"), ExportType.PNG24, pngOptions);

    doc.exportFile(new File(PUB + "Genctek-Iklim-Afis-Yesil.png"), ExportType.PNG24, pngOptions);
    doc.saveAs(new File(PUB + "Genctek-Iklim-Afis-Yesil.pdf"), pdfOptions);

    doc.saveAs(new File(OUT + "Genctek-Iklim-Afis-Yesil.ai"), aiOptions);

    return "Tamamlandı: Genctek-Iklim-Afis-Yesil oluşturuldu!";
})();
