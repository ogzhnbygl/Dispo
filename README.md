# Dispo - Laboratuvar Hayvanları Koloni Dispozisyon Yönetim Sistemi

[![Antigravity Ekosistemi](https://img.shields.io/badge/Ekosistem-Antigravity%20Apex-6366f1.svg)](https://wildtype.app)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-v7.16.0-ca4245.svg)](https://reactrouter.com/)
[![Zod](https://img.shields.io/badge/Zod-v4.4.3-3068b7.svg)](https://zod.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3.4.1-22c55e.svg)](https://recharts.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0.0-47a248.svg)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-646cff.svg)](https://vitejs.dev/)

**Dispo (Laboratory Colony Disposition Manager)**, Antigravity ekosisteminin (Apex Hub & Spoke mimarisi) laboratuvar deney hayvanı çıkış, sakrifikasyon, itlaf ve transfer süreçlerini uçtan uca takip eden kurumsal dispozisyon yönetim uygulamasıdır.

Araştırma merkezleri, hayvan deneyleri etik kurulları (HADYEK) ve deney hayvanları laboratuvarlarının yasal yükümlülüklerini eksiksiz yerine getirmesini, hayvan kullanım kotalarının projeler bazında denetlenmesini ve koloni dispozisyon verilerinin anlık olarak görselleştirilmesini sağlar.

---

## 🌟 Ekosistemdeki Rolü ve Vizyon

Dispo, Antigravity ekosisteminde **Spoke (Uydu)** uygulama olarak konumlandırılmıştır:

- **Apex SSO Entegrasyonu:** Kullanıcı kimlik doğrulama ve yetkilendirme işlemleri merkezi `Apex` (wildtype.app) üzerinden yürütülür. `interapp_session` HttpOnly JWT çerezi ile şeffaf, güvenli ve tek noktadan oturum kontrolü sağlanır.
- **LabProject Çapraz Veri Entegrasyonu:** Deney ve transfer nedeniyle sürüden çıkarılan hayvanlar, `LabProject` veritabanındaki aktif etik onaylı projelerle gerçek zamanlı doğrulanır. Araştırmacılar proje kodunu seçtiğinde yürütücü (PI), protokol numarası ve proje durumu otomatik olarak ekrana yansıtılır.
- **Etik Kota Takibi & Şeffaflık:** 17 farklı dispozisyon kodu üzerinden hangi hayvanın hangi protokolle ve hangi gerekçeyle çıkarıldığı kayıt altına alınarak etik kurul denetimlerine hazır veri tabanı oluşturulur.

---

## 🚀 Öne Çıkan Özellikler

### 1. Kapsamlı Kayıt ve Dispozisyon Yönetimi
- **Tür ve Suş (Strain) Kütüphanesi:** Fare (`BALB/c`, `C57BL/6`, `CD-1 (ICR)`, `Athymic Nude`), Sıçan (`Wistar`, `Sprague Dawley`) ve Tavşan (`New Zealand White`) tür/suş hiyerarşisi.
- **5 Ana Kategori ve 17 Dispozisyon Kodu:**
  1. *Deneysel Nedenler (EXP):* EXP-01 (Proje Sonu Sakrifikasyon), EXP-02 (Doku/Organ Temini), EXP-03 (İnsani Sonlandırma Noktası), EXP-04 (Pilot Çalışma).
  2. *Üretim ve Koloni Yönetimi (COL):* COL-01 (Damızlık Dışı), COL-02 (Genotip Uyumsuzluğu), COL-03 (Cinsiyet Fazlası), COL-04 (Sütten Kesim Fazlası), COL-05 (Yaşlılık/Stok Yönetimi).
  3. *Klinik ve Sağlık Nedenleri (CLIN):* CLIN-01 (Klinik Hastalık), CLIN-02 (Yaralanma/Travma), CLIN-03 (Doğum Komplikasyonları), CLIN-04 (Sağlık Taraması/Sentinel), CLIN-05 (Enfeksiyon Kontrolü).
  4. *Spontan Ölümler (MORT):* MORT-01 (Doğal Ölüm/Eksitus), MORT-02 (Anestezi/Cerrahi Kaybı), MORT-03 (Kanibalizm).
  5. *İdari ve Lojistik (ADM):* ADM-01 (Kurum İçi Transfer), ADM-02 (Kurum Dışı Transfer), ADM-03 (Kayıp/Firar).
- **Akıllı Koşullu Form Mantığı:** Proje gerektiren kodlar seçildiğinde proje arama alanı dinamik olarak zorunlu hale gelir; kurum dışı transferde (ADM-02) hedef kurum adı istenir.
- **Cinsiyet Standardizasyonu:** Veritabanında uluslararası `Male`/`Female` saklanırken, arayüzde Türkçe `Erkek` ♂ / `Dişi` ♀ etiketleri ve renkli simgelerle sunulur.

### 2. LabProject Otomatik Tamamlama & Proje Kartı
- **Debounced Canlı Arama:** Proje kodu veya başlığı yazılırken 500ms gecikmeli dinamik otomatik tamamlama önerileri.
- **Proje Detay Popover Penceresi:** Tablodaki proje koduna tıklandığında `LabProject` veritabanından proje adı, yürütücüsü (PI), etik protokol numarası ve güncel durumu (`Aktif`, `Devam Ediyor`, `Tamamlandı`) anında yüklenir.

### 3. Gelişmiş Tablo ve Veri Filtreleme
- **Sütun Bazlı Popover Filtreler:** Çıkış tarihi (Datepicker), Tür ve Suş (kademeli filtre), Cinsiyet ve Neden Kodu bazında çok kriterli filtreleme.
- **Hızlı Global Arama:** Tür, ırk, proje veya neden kodunda anlık istemci araması.
- **Esnek Sayfalama (Pagination):** Sayfa başına 50, 100 veya 500 kayıt görüntüleme seçeneği.

### 4. İstatistik ve Recharts Veri Görselleştirme
- **Anlık Özet Kartları:** Toplam Çıkarılan Hayvan, Bu Ayki Çıkışlar, Proje Kapsamındaki Kullanımlar.
- **Aylık Çıkarılma Analizi Grafiği:** 12 aylık periyotta yığılmış (stacked) bar grafik.
- **Kategori ve Kod Filtreli Grafik:** Tek bir kategori (`CAT:EXP`, `CAT:COL` vb.) veya bağımsız neden kodları seçildiğinde Recharts grafiğinde ilgili dilim renkli vurgulanır, toplam içindeki yüzdesi anlık hesaplanır.

### 5. Veri Transferi (Toplu İçe / Dışa Aktarma)
- **Toplu JSON İçe Aktarma:** Dosya yükleme veya JSON metin yapıştırma.
- **Veri Temizleme & 500'lük Parçalama (Chunking):** `\t` ve geçersiz kontrol karakterlerini temizler, verileri 500'erlik paketler halinde backend'e aktararak bellek ve zaman aşımı limitlerini korur.
- **Zod Güvencesi:** Backend `POST /api/animals` toplu aktarımda her kaydı tek tek doğrular; başarılı ve hatalı kayıt sayılarını döner.
- **JSON Dışa Aktarma (Export):** Güncel sistem kayıtlarını tarih damgalı `.json` dosyası olarak tek tıkla indirme.

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji / Kütüphane | Sürüm | Kullanım Amacı |
|---|---|---|---|
| **Core UI** | [React](https://react.dev/) | `^18.2.0` | Deklaratif bileşen mimarisi ve reaktif durum yönetimi |
| **Yönlendirme** | [React Router DOM](https://reactrouter.com/) | `^7.16.0` | İstemci tarafı SPA yönlendirmesi (`/` ve `/dashboard`) |
| **Görselleştirme**| [Recharts](https://recharts.org/) | `^3.4.1` | Aylık kullanım ve kategori trendi çubuk grafikleri |
| **Validasyon** | [Zod](https://zod.dev/) | `^4.4.3` | Backend API istek gövdesi doğrulama ve tip güvenliği |
| **Veritabanı** | [MongoDB Node Driver](https://www.mongodb.com/) | `^7.0.0` | Atlas NoSQL veritabanı sürücüsü ve `$facet` agregasyonları |
| **İkonlar** | [Lucide React](https://lucide.dev/) | `^0.344.0` | Modern SVG arayüz ikonları |
| **Stil / Tasarım**| [Tailwind CSS](https://tailwindcss.com/) | `^3.4.1` | Utility-first duyarlı ve modern CSS tasarımı |
| **Derleme / Dev**| [Vite](https://vitejs.dev/) | `^5.1.6` | Hızlı HMR derleme aracı ve yerel serverless middleware |
| **Backend** | [Vercel Serverless Functions](https://vercel.com/docs/functions) | Node.js | Durumsuz (stateless) mikro-servis mimarisi |

---

## 📦 Kurulum ve Yerel Çalıştırma

### Ön Gereksinimler
- **Node.js:** v18.0.0 veya üzeri
- **MongoDB Atlas Hesabı / URI:** `Dispo_db`, `Apex_db` ve `LabProject_db` erişimi olan bağlantı adresi
- **Apex Hub:** SSO çerezi için Apex yerel oturumu veya yerel bypass

### Adım Adım Kurulum

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/ogzhnbygl/Dispo.git
   cd Dispo
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Ortam Değişkenlerini Tanımlayın:**
   Kök dizinde bir `.env` dosyası oluşturun:
   ```env
   # MongoDB Atlas Bağlantı Adresi
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority

   # Apex SSO JWT Doğrulama Anahtarı (Apex ile birebir aynı olmalı)
   JWT_SECRET=your-shared-jwt-secret-key-min-32-chars

   # İsteğe bağlı: Üretim ortamı veritabanını testte zorlamak için
   # FORCE_PROD_DB=false
   ```

4. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   > [!TIP]
   > Dispo'nun `vite.config.js` yapılandırmasında özel geliştirilmiş `vercelServerless()` ara katmanı (middleware) bulunur. Bu sayede `npm run dev` komutu, Vercel CLI gerektirmeden `/api/*` endpoint'lerini dinamik olarak yerel sunucuda çalıştırır ve sıcak kod yenilemeyi (HMR) destekler.

5. **Tarayıcıda Açın:**
   `http://localhost:5173` adresine gidin. Yerel geliştirme modunda (`DEV MODE`) `AuthContext` otomatik olarak test oturumu sağlar.

6. **Derleme ve Önizleme:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📂 Proje Dizin Yapısı

```
Dispo/
├── api/                           # Vercel Serverless API Fonksiyonları
│   ├── auth/
│   │   └── session.js             # Oturum kontrolü ve çıkış (Apex SSO)
│   ├── animals.js                 # Hayvan CRUD ve toplu içe aktarma endpoint'i
│   ├── dashboard-stats.js         # Yıllık, aylık ve EXP-01 agregasyon istatistikleri
│   ├── projects-search.js         # LabProject canlı proje kodu arama servisi
│   └── project-details.js         # LabProject proje detay sorgu servisi
├── lib/                           # Paylaşılan Backend Yardımcı Modülleri
│   ├── auth.js                    # JWT doğrulama, çerez yönetimi ve yetki kontrolü
│   └── mongodb.js                 # MongoDB istemci havuzu ve veritabanı ayrıştırma
├── src/                           # Frontend Kaynak Kodları (React + Vite)
│   ├── components/                # Yeniden kullanılabilir React UI bileşenleri
│   │   ├── Dashboard.jsx          # Analiz paneli ana bileşeni
│   │   ├── DashboardChart.jsx     # Recharts aylık trend ve filtreli bar grafik
│   │   ├── DataTransfer.jsx       # JSON içe/dışa aktarma ve chunking modalı
│   │   ├── EntryForm.jsx          # Hayvan çıkış kayıt formu ve otomatik tamamlama
│   │   ├── Layout.jsx             # Navigasyon, Apex ana menü linki ve kullanıcı barı
│   │   ├── RecordList.jsx         # Sütun filtreli tablo, sayfalama ve proje kartı
│   │   └── StatsCard.jsx          # Özet metrik gösterge kartı
│   ├── context/
│   │   └── AuthContext.jsx        # Apex SSO oturum takibi ve yetki doğrulayıcı
│   ├── lib/
│   │   ├── constants.js           # Türler, suşlar ve 17 dispozisyon nedeni tanımı
│   │   └── db.js                  # Frontend API veri istemcisi (animals fetcher)
│   ├── App.jsx                    # Rota tanımları (`/`, `/dashboard`) ve ana görünüm
│   ├── main.jsx                   # React DOM kök montaj noktası
│   └── index.css                  # Tailwind CSS ve global font tanımları
├── package.json                   # Bağımlılıklar ve npm scriptleri
├── tailwind.config.js             # Tailwind CSS yapılandırması
├── vercel.json                    # SPA URL yönlendirme kuralları (rewrites)
├── vite.config.js                 # Vite + Yerel Serverless middleware yapılandırması
├── TECHNICAL.md                   # Kapsamlı sistem mimarisi ve API referansı
└── BLUEPRINT.md                   # Ürün vizyonu, domain kuralları ve faz yol haritası
```

---

## 🔐 Güvenlik ve Yetkilendirme Modeli

- **Merkezi Oturum:** Bağımsız veritabanı şifresi veya kullanıcı kayıt formu içermez. Tüm kullanıcılar Apex üzerinden giriş yapar.
- **JWT Çerezi (`interapp_session`):** Çerez `HttpOnly`, `SameSite=Lax` ve üretimde `Secure` bayraklarıyla korunur; tarayıcı JavaScript betiklerinin erişimine kapalıdır.
- **Constant-Time İmza Doğrulaması:** `crypto.timingSafeEqual` ile zamanlama saldırılarına karşı güvenli imza doğrulaması yapılır.
- **Uygulama Yetki Denetimi:** Kullanıcının `apps` yetki listesinde `'dispo'` bulunmalı veya rolü `'admin'` olmalıdır. Aksi halde `403 Forbidden` ile erişim engellenir.
- **Girdi Doğrulama ve Sanitizasyon:** Tüm form verileri sunucu katmanında Zod ile parse edilir; proje arama girdileri Regex Injection (ReDoS) önleme süzgecinden geçirilir.

---

## 📖 Dokümantasyon Bağlantıları

- [TECHNICAL.md](./TECHNICAL.md): Sistem mimarisi, MongoDB şemaları, tam API referansı ve Frontend akışları.
- [BLUEPRINT.md](./BLUEPRINT.md): Ürün felsefesi, etik dispozisyon domain kuralları ve tamamlanan/planlanan fazlar.

---

## 📜 Lisans ve Telif Hakkı

Bu proje özel mülkiyetli olup Antigravity laboratuvar araştırma ekosistemi için geliştirilmiştir. Tüm hakları saklıdır.
