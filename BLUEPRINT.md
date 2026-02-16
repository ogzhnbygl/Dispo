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
- [x] Temel dashboard istatistikleri.
- [x] Veri import/export.

### Faz 2: Güvenlik ve Çoklu Kullanıcı
- [x] **Kimlik Doğrulama:** Apex ile ortak oturum entegrasyonu.
- [x] **Rol Yönetimi:** Erişim kontrolü.
- [ ] **Audit Logs:** Değişikliklerin takibi.

### Faz 3: Gelişmiş Raporlama
- [ ] **PDF Raporlar:** Resmi formatta aylık döküm alma.
- [ ] **Excel Export:** Özelleştirilebilir çıktılar.
- [ ] **Bildirimler:** Aylık limit aşımlarında uyarı.

### Faz 4: Mobil Deneyim
- [ ] **PWA Desteği:** Mobil uyumlu kurulum.
- [ ] **Offline Mod:** İnternetsiz çalışma desteği.
