# Dispo - Vizyon ve Blueprint

## 🌟 Vizyon

**Dispo**, laboratuvar ortamlarında hayvan kullanımının takibini **zahmetsiz, hatasız ve şeffaf** hale getirmeyi hedefler.

Uygulamanın ismi, "Final Disposition" (Çalışma Sonrası Akıbet) kavramından gelir. Amacımız, araştırmacıların bürokratik yükünü azaltarak bilimsel çalışmalara odaklanmalarını sağlamaktır.

### Temel Değerler
1.  **Verimlilik:** En az tıklama ile en hızlı veri girişi.
2.  **Doğruluk:** Kullanıcı hatalarını önleyen validasyonlar ve otomatik hesaplamalar.
3.  **Şeffaflık:** Anlık raporlar ve net veri görselleştirme.

## 🏗️ Mimari

Dispo, ölçeklenebilirlik için modern, sunucusuz (serverless) bir mimari üzerine inşa edilmiştir.

### Katmanlar
1.  **İstemci (React + Vite):** Akıcı kullanıcı arayüzü.
2.  **API (Vercel Functions):** Durumsuz, hızlı ve güvenli backend.
3.  **Veri (MongoDB):** Esnek ve güçlü veri saklama.

## 🎨 Tasarım Prensipleri

-   **Minimalizm:** Arayüz, sadece gerekli olanı sunar. Karmaşık menülerden arındırılmıştır.
-   **Odaklanma:** Temiz düzen, kullanıcının o anki görevine odaklanmasını sağlar.
-   **Geri Bildirim:** Her işlemden sonra net görsel bildirimler.

## 🗺️ Yol Haritası (Roadmap)

### Faz 1: Temel Özellikler (Tamamlandı ✅)
- [x] Kayıt ekleme/silme/listeleme.
- [x] Temel dashboard istatistikleri (aylık trendler ve nedenler).
- [x] Veri import/export (JSON yedekleme).

### Faz 2: Standardizasyon, Doğrulama ve Yönlendirme (Tamamlandı ✅)
- [x] **Kimlik Doğrulama:** Apex ile HttpOnly JWT tabanlı oturum doğrulaması (`verifyUser` entegrasyonu).
- [x] **Yönlendirme:** `react-router-dom` entegrasyonu ile URL tabanlı `/` ve `/dashboard` rotaları.
- [x] **Girdi Doğrulamaları:** Sunucu tarafında Zod şemaları ile veri bütünlüğü koruması.
- [x] **Cinsiyet Standardizasyonu:** DB `sex` standardı ile arayüzdeki Türkçe gösterimin eşleşmesi.

> [!NOTE]
> Faz 2 kapsamındaki Adım 5 geliştirmesi olan **Toplu Hayvan Girişi (Bulk Import API ve UI)** kullanıcı isteği üzerine geliştirilmemiş, kapsam dışı bırakılmıştır.

### Faz 3: Gelişmiş Özellikler ve Entegrasyonlar (Planlanıyor)
- [ ] Toplu Hayvan Girişi (Excel ve JSON formatından otomatik import).
- [ ] PDF formatında resmi laboratuvar etik kurul hayvan kullanım raporu çıktı alabilme.
- [ ] Locus (Kafes Konum) modülü ile canlı hayvan entegrasyonu.
- [ ] Sistem üzerindeki veri değişikliklerinin audit log ile kayıt altına alınması.
