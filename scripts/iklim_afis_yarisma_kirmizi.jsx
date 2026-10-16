// =============================================================================
// GENÇTEK İKLİM SÖZLÜĞÜ - AFİŞ 2 (KIRMIZI TON - CANLI YARIŞMA & OYUNLAŞTIRMA)
// Boyut: A3 Dikey (841.89 x 1190.55 pt) - Illustrator ExtendScript (JSX)
// =============================================================================

#target illustrator

(function () {
    var SCRIPT_FILE = new File($.fileName);
    var BASE = SCRIPT_FILE.parent.parent.fsName;
    if (BASE.slice(-1) !== "\\" && BASE.slice(-1) !== "/") BASE += "\\";

    var PUB = BASE + "public\\";
    var ART = PUB + "art\\";
    var OUT = BASE + "..\\afisler\\";

    var doc = app.documents.add(DocumentColorSpace.RGB, 841.89, 1190.55);
    var artboard = doc.artboards[0];
    var rectAB = artboard.artboardRect;
    var L0 = rectAB[0];
    var T0 = rectAB[1];
    var W = 841.89;
    var H = 1190.55;
    var M = 48;

    function c(hex) {
        var col = new RGBColor();
        col.red = parseInt(hex.substring(0, 2), 16);
        col.green = parseInt(hex.substring(2, 4), 16);
        col.blue = parseInt(hex.substring(4, 6), 16);
        return col;
    }

    // KIRMIZI TON PALETİ
    var RED = c("c4161c");
    var DRED = c("991b1b");
    var CRIMSON = c("b91c1c");
    var LIGHT_RED = c("fee2e2");
    var SOFT_PINK = c("fff5f5");
    var GOLD = c("f59e0b");
    var DARK = c("1e252b");
    var GRAY = c("4a5568");
    var LGRAY = c("64748b");
    var BG = c("f8fafc");
    var WHITE = c("ffffff");
    var BORDER = c("e2e8f0");

    function getFont(pref, fallback) {
        try { return app.textFonts.getByName(pref); }
        catch (e) {
            try { return app.textFonts.getByName(fallback); }
            catch (e2) { return app.textFonts.getByName("ArialMT"); }
        }
    }

    var F_TITLE = getFont("Montserrat-ExtraBold", "Arial-BoldMT");
    var F_BOLD = getFont("Inter-Bold", "Arial-BoldMT");
    var F_SEMI = getFont("Inter-SemiBold", "Arial-BoldMT");
    var F_MED = getFont("Inter-Medium", "ArialMT");
    var F_REG = getFont("Inter-Regular", "ArialMT");

    function rect(x, y, w, h, col, r) {
        var p = r ? doc.pathItems.roundedRectangle(T0 - y, L0 + x, w, h, r, r) : doc.pathItems.rectangle(T0 - y, L0 + x, w, h);
        p.stroked = false;
        if (col) { p.filled = true; p.fillColor = col; }
        else { p.filled = false; }
        return p;
    }

    function txt(s, x, y, fontObj, size, col, opt) {
        opt = opt || {};
        var t;
        if (opt.w) {
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
        if (col) a.fillColor = col;
        if (opt.lead) a.leading = opt.lead;
        if (opt.track) a.tracking = opt.track;
        if (opt.align) t.textRange.paragraphAttributes.justification = opt.align;
        if (!opt.w) {
            t.left = L0 + x;
            t.top = T0 - y;
        }
        return t;
    }

    function place(path, x, y, w, h, r) {
        var f = new File(path);
        if (!f.exists) return null;
        var pi = doc.placedItems.add();
        pi.file = f;
        var scX = w / pi.width;
        var scY = h / pi.height;
        var sc = (scX > scY) ? scX : scY;
        pi.width *= sc;
        pi.height *= sc;
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

    // Dinamik Yarışma Daireleri
    var d1 = doc.pathItems.ellipse(T0 + 120, L0 + 520, 460, 460);
    d1.stroked = true; d1.filled = false; d1.strokeColor = WHITE; d1.strokeWidth = 1.2; d1.opacity = 20;
    var d2 = doc.pathItems.ellipse(T0 + 40, L0 + 600, 300, 300);
    d2.stroked = true; d2.filled = false; d2.strokeColor = GOLD; d2.strokeWidth = 1.5; d2.opacity = 30;
    var d3 = doc.pathItems.ellipse(T0 - 30, L0 + 670, 160, 160);
    d3.stroked = true; d3.filled = false; d3.strokeColor = WHITE; d3.strokeWidth = 1; d3.opacity = 15;

    // ==========================================
    // 2. LOGO VE BAŞLIK BANTI
    // ==========================================
    rect(M, 46, 62, 62, WHITE, 14);
    var logoFile = new File(PUB + "genc.png");
    if (logoFile.exists) {
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
    var sub = txt("Canlı Yarışma & Oyunlaştırma • Akıllı Tahta Modu", M + 80, 80, F_MED, 11, WHITE);
    sub.opacity = 90;

    // Sağ üst rozet
    var bW = 246, bH = 38, bX = W - M - bW, bY = 46;
    rect(bX, bY, bW, bH, WHITE, 19);
    var dot = doc.pathItems.ellipse(T0 - bY - 13, L0 + bX + 14, 12, 12);
    dot.filled = true; dot.fillColor = GOLD; dot.stroked = false;
    txt("CANLI İKLİM YARIŞMASI", bX + 34, bY + 14, F_BOLD, 9.5, RED, {track: 30});
    txt("AKILLI TAHTA • SINIF PIN MODU", bX + 34, bY + 26, F_BOLD, 7.5, DARK, {track: 20});

    // ==========================================
    // 3. VİTRİN ANA MANŞET & METİNLER
    // ==========================================
    txt("Yarış, öğren,\riklim lideri\rsen ol!", M, 148, F_TITLE, 52, WHITE, {w: 460, h: 190, lead: 58});

    var ldText = "Sınıfınla akıllı tahtaya bağlan, 20 saniyelik iklim yarışmalarında terimleri bil, puanları topla! Okul liginde zirveye çık, kendi özgün iklim kartını üreterek arkadaşlarına ilham ver.";
    txt(ldText, M, 350, F_REG, 13.5, WHITE, {w: 440, h: 75, lead: 21});

    // İstatistikler
    function stat(n, label, x) {
        txt(n, x, 455, F_TITLE, 44, WHITE);
        var t = txt(label, x, 510, F_BOLD, 9.5, GOLD, {track: 140});
        t.opacity = 95;
    }
    stat("10", "SORULUK TUR", M);
    stat("20 Sn", "SORU SÜRESİ", M + 145);

    rect(M + 295, 465, 145, 34, DRED, 17);
    var stBorder = doc.pathItems.roundedRectangle(T0 - 465, L0 + M + 295, 145, 34, 17, 17);
    stBorder.filled = false; stBorder.stroked = true; stBorder.strokeColor = GOLD; stBorder.strokeWidth = 1.2;
    txt("#iklimligii", M + 295, 473, F_BOLD, 12.5, WHITE, {w: 145, h: 20, align: Justification.CENTER});

    // ==========================================
    // 4. SAĞ VİTRİN: ÖNE ÇIKAN YARIŞMA KARTI
    // ==========================================
    var CX = 530, CY = 145, CW = 264, CH = 420;
    var sh = rect(CX + 8, CY + 10, CW, CH, c("000000"), 16);
    sh.opacity = 20;
    rect(CX, CY, CW, CH, WHITE, 16);

    // Kart Üst Görseli: forest.png (Antalya Toroslar & Biyoçeşitlilik)
    var imgH = 175;
    place(ART + "forest.png", CX + 12, CY + 12, CW - 24, imgH, 10);

    // Kategori Rozeti (Kırmızı/Altın)
    rect(CX + 20, CY + imgH + 24, 165, 20, LIGHT_RED, 10);
    txt("HAFTANIN YARIŞMA KARTI • 500 P", CX + 20, CY + imgH + 29, F_BOLD, 7.5, RED, {w: 165, h: 14, track: 40, align: Justification.CENTER});

    // Terim Başlığı & İngilizcesi
    txt("Biyoçeşitlilik", CX + 20, CY + imgH + 54, F_TITLE, 21, DARK);
    txt("Biodiversity", CX + 20, CY + imgH + 82, F_SEMI, 12, RED);

    // Tanım Metni
    var defText = "Belirli bir bölgedeki genlerin, türlerin ve ekosistemlerin oluşturduğu yaşam zenginliği ve doğal denge bütünü.";
    txt(defText, CX + 20, CY + imgH + 104, F_REG, 10, DARK, {w: CW - 40, h: 48, lead: 14.5});

    rect(CX + 20, CY + imgH + 152, CW - 40, 1, BORDER);

    // Yarışma İpucu / Alıntı
    var exText = "“Canlı yarışmada bu soruyu doğru bilerek sınıfımıza 500 eko-puan kazandırdık ve liderliğe yükseldik!”";
    txt(exText, CX + 20, CY + imgH + 162, F_MED, 9.5, GRAY, {w: CW - 40, h: 40, lead: 13.5});

    // ==========================================
    // 5. YARIŞMA VE OYUN MODLARI BÖLÜMÜ
    // ==========================================
    var gy = heroH + 34;
    txt("Sınıfta ve okulda 4 eğlenceli adım", M, gy, F_TITLE, 23, DARK);
    txt("Akıllı tahtadan bireysel telefona kesintisiz yarışma ve akran öğrenme deneyimi.", M, gy + 30, F_REG, 11.5, LGRAY);

    var steps = [
        ["01", "PIN ile Bağlan", "Akıllı tahtada açılan 6 haneli sınıf PIN kodunu gir, adını yaz ve lobide yerini al.", RED],
        ["02", "20 Sn'de Yanıtla", "Her soru için 20 saniyen var. Hızlı ve doğru yanıtlayarak kombo puanları topla.", GOLD],
        ["03", "Jokerleri Kullan", "Takıldığında 50:50, Ek Zaman veya Akran İpucu jokerlerinden birini devreye sok.", c("2171b5")],
        ["04", "Kartını Tasarla", "Yarışma sonunda kazandığın terimi kendi cümlenle dijital karta dönüştür.", c("15803d")]
    ];

    var sCols = 4;
    var sGap = 12;
    var sW = (W - 2 * M - (sCols - 1) * sGap) / sCols;
    var sH = 108;

    for (var si = 0; si < steps.length; si++) {
        var sx = M + si * (sW + sGap);
        rect(sx, gy + 56, sW, sH, BG, 12);
        rect(sx + 16, gy + 72, 26, 3, steps[si][3]);
        txt(steps[si][0], sx + 16, gy + 82, F_TITLE, 11, steps[si][3]);
        txt(steps[si][1], sx + 16, gy + 98, F_TITLE, 14.5, DARK);
        txt(steps[si][2], sx + 16, gy + 120, F_REG, 9.2, DARK, {w: sW - 32, h: 44, lead: 12.8});
    }

    // ==========================================
    // 6. POPÜLER YARIŞMA KATEGORİLERİ (10 ÇALIŞMA GRUBU)
    // ==========================================
    var ky = gy + 56 + sH + 20;
    txt("Yarışabileceğin 10 tematik çalışma grubu", M, ky, F_TITLE, 16, DARK);

    var groups = [
        ["01", "İklim Bilimi", RED],
        ["02", "COP & Diplomasi", c("2171b5")],
        ["03", "Enerji Dönüşümü", c("d97706")],
        ["04", "Sıfır Atık", c("15803d")],
        ["05", "Su ve Gıda", c("0284c7")],
        ["06", "Biyoçeşitlilik", c("15803d")],
        ["07", "İklim Finansmanı", c("7c3aed")],
        ["08", "İklim Dostu Şehir", c("0d9488")],
        ["09", "Uyum ve Direnç", c("ea580c")],
        ["10", "Gençlik Eylemi", RED]
    ];

    var gCols = 5;
    var gGapX = 10;
    var gGapY = 8;
    var gW = (W - 2 * M - (gCols - 1) * gGapX) / gCols;
    var gH = 34;

    for (var gi = 0; gi < groups.length; gi++) {
        var cIdx = gi % gCols;
        var rIdx = Math.floor(gi / gCols);
        var gx = M + cIdx * (gW + gGapX);
        var gyCard = ky + 26 + rIdx * (gH + gGapY);

        rect(gx, gyCard, gW, gH, BG, 8);
        rect(gx + 8, gyCard + 9, 3, 16, groups[gi][2], 1.5);
        txt(groups[gi][0], gx + 16, gyCard + 12, F_BOLD, 7.5, groups[gi][2]);
        txt(groups[gi][1], gx + 34, gyCard + 12, F_BOLD, 9.2, DARK, {w: gW - 40, h: 14});
    }

    // ==========================================
    // 7. ENERJİK KIRMIZI TONLU AYDINLIK ALT BÖLÜM
    // ==========================================
    var by = ky + 26 + 2 * (gH + gGapY) + 16;
    
    // Isınma Şeritleri Ribonu
    var stripes = [
        "08306b","08519c","125a9f","1b64a2","2171b5","2d7ebd","3a8bc5","4798cd","59a4d3",
        "6baed6","7fb8dc","94c4e2","9ecae1","afd2e7","c6dbef","d4e3f4","e5edf8","f6f2f0",
        "fee8dc","fddbc8","fccfb5","fcbba1","fca58e","fc9272","fc7e5c","fb6a4a","f6563e",
        "ef3b2c","e32b26","d71c20","cb181d","bf141b","b21118","a50f15","950c14","850a12",
        "67000d"
    ];
    var sRibH = 7;
    var sRibW = W / stripes.length;
    for (var rbi = 0; rbi < stripes.length; rbi++) {
        rect(rbi * sRibW, by, sRibW + 0.5, sRibH, c(stripes[rbi]));
    }

    var footBgH = H - by - sRibH;
    rect(0, by + sRibH, W, footBgH, SOFT_PINK);

    var contentY = by + sRibH + 24;

    rect(M, contentY, 240, 22, LIGHT_RED, 11);
    txt("🏆 GENÇTEK İKLİM LİGİ • OKULLAR YARIŞIYOR", M + 14, contentY + 5, F_BOLD, 7.8, RED, {track: 30});

    txt("Sınıfınla yarışmaya hemen başla!", M, contentY + 36, F_TITLE, 26, DARK);

    var descText = "Öğretmeninle akıllı tahtayı açın, iklim sözlüğünün yarışma modunu başlatın ve sınıf PIN koduyla anında bağlanın. Türkiye geneli okul sıralamasında yerinizi alın!";
    txt(descText, M, contentY + 70, F_REG, 11.5, GRAY, {w: 485, h: 44, lead: 16.5});

    var pillY = contentY + 120;
    
    rect(M, pillY, 156, 30, WHITE, 15);
    var pBorder1 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M, 156, 30, 15, 15);
    pBorder1.filled = false; pBorder1.stroked = true; pBorder1.strokeColor = c("fca5a5"); pBorder1.strokeWidth = 1.2;
    txt("🎯 Bireysel Hızlı Tur (10 Soru)", M + 12, pillY + 8, F_BOLD, 8.8, RED);

    rect(M + 168, pillY, 168, 30, WHITE, 15);
    var pBorder2 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 168, 168, 30, 15, 15);
    pBorder2.filled = false; pBorder2.stroked = true; pBorder2.strokeColor = c("fde68a"); pBorder2.strokeWidth = 1.2;
    txt("👥 Canlı Sınıf Modu (PIN)", M + 180, pillY + 8, F_BOLD, 8.8, c("b45309"));

    rect(M + 348, pillY, 154, 30, WHITE, 15);
    var pBorder3 = doc.pathItems.roundedRectangle(T0 - pillY, L0 + M + 348, 154, 30, 15, 15);
    pBorder3.filled = false; pBorder3.stroked = true; pBorder3.strokeColor = c("cbd5e1"); pBorder3.strokeWidth = 1.2;
    txt("🎨 Kendi Kartını Tasarla", M + 360, pillY + 8, F_BOLD, 8.8, DARK);

    // Sağ Taraf: Kare Kod Kartı
    var qCardW = 152, qCardH = 158;
    var qCardX = W - M - qCardW;
    var qCardY = contentY - 4;

    var qSh = rect(qCardX + 4, qCardY + 6, qCardW, qCardH, c("000000"), 16);
    qSh.opacity = 8;

    rect(qCardX, qCardY, qCardW, qCardH, WHITE, 16);
    var qCardBorder = doc.pathItems.roundedRectangle(T0 - qCardY, L0 + qCardX, qCardW, qCardH, 16, 16);
    qCardBorder.filled = false; qCardBorder.stroked = true; qCardBorder.strokeColor = c("fecaca"); qCardBorder.strokeWidth = 1;

    txt("KARE KODU OKUT", qCardX, qCardY + 16, F_BOLD, 9, DARK, {w: qCardW, align: Justification.CENTER, track: 60});
    txt("Canlı yarışmaya hemen katıl", qCardX, qCardY + 29, F_MED, 7.5, LGRAY, {w: qCardW, align: Justification.CENTER});

    var qBoxSize = 78;
    var qBoxX = qCardX + (qCardW - qBoxSize) / 2;
    var qBoxY = qCardY + 44;
    rect(qBoxX, qBoxY, qBoxSize, qBoxSize, c("fff1f2"), 10);
    var qBoxBorder = doc.pathItems.roundedRectangle(T0 - qBoxY, L0 + qBoxX, qBoxSize, qBoxSize, 10, 10);
    qBoxBorder.filled = false; qBoxBorder.stroked = true; qBoxBorder.strokeColor = c("f87171"); qBoxBorder.strokeWidth = 1.2;
    
    rect(qBoxX + 6, qBoxY + 6, 18, 18, RED, 4);
    rect(qBoxX + 9, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + 11, 8, 8, RED, 2);

    rect(qBoxX + qBoxSize - 24, qBoxY + 6, 18, 18, RED, 4);
    rect(qBoxX + qBoxSize - 21, qBoxY + 9, 12, 12, WHITE, 2);
    rect(qBoxX + qBoxSize - 19, qBoxY + 11, 8, 8, RED, 2);

    rect(qBoxX + 6, qBoxY + qBoxSize - 24, 18, 18, RED, 4);
    rect(qBoxX + 9, qBoxY + qBoxSize - 21, 12, 12, WHITE, 2);
    rect(qBoxX + 11, qBoxY + qBoxSize - 19, 8, 8, RED, 2);

    txt("PIN", qBoxX, qBoxY + 42, F_BOLD, 10.5, RED, {w: qBoxSize, align: Justification.CENTER, track: 80});

    rect(qCardX + 14, qCardY + 130, qCardW - 28, 18, LIGHT_RED, 9);
    txt("iklim.genctek.org", qCardX + 14, qCardY + 134, F_BOLD, 8, RED, {w: qCardW - 28, align: Justification.CENTER, track: 30});

    // ==========================================
    // 8. KAYDET VE DIŞA AKTAR
    // ==========================================
    app.redraw();
    doc.artboards.setActiveArtboardIndex(0);
    app.executeMenuCommand('fitin');

    var outBase = "Genctek-Iklim-Afis-Yarisma-Kirmizi";

    var aiOptions = new IllustratorSaveOptions();
    aiOptions.pdfCompatible = true;
    doc.saveAs(new File(OUT + outBase + ".ai"), aiOptions);

    var pdfOptions = new PDFSaveOptions();
    pdfOptions.preserveEditability = true;
    doc.saveAs(new File(OUT + outBase + ".pdf"), pdfOptions);

    var pngOptions = new ExportOptionsPNG24();
    pngOptions.artBoardClipping = true;
    pngOptions.horizontalScale = 150;
    pngOptions.verticalScale = 150;
    pngOptions.transparency = false;
    doc.exportFile(new File(OUT + outBase + ".png"), ExportType.PNG24, pngOptions);

    doc.exportFile(new File(PUB + outBase + ".png"), ExportType.PNG24, pngOptions);
    doc.saveAs(new File(PUB + outBase + ".pdf"), pdfOptions);
    doc.saveAs(new File(OUT + outBase + ".ai"), aiOptions);

    return "Tamamlandı: " + outBase + " oluşturuldu!";
})();
