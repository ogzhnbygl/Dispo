# Dispo - Teknik Dokümantasyon

Bu doküman, Dispo projesinin teknik mimarisini, veritabanı yapısını ve API referanslarını detaylandırır.

## 🏗️ Mimari Genel Bakış

Dispo, modern bir **Single Page Application (SPA)** olarak tasarlanmıştır.

- **Frontend:** React ve Vite ile oluşturulmuş, kullanıcı tarayıcısında çalışan istemci tarafı uygulaması.
- **Backend:** Vercel Serverless Functions üzerinde çalışan, durumsuz (stateless) API fonksiyonları.
- **Veritabanı:** MongoDB Atlas üzerinde barındırılan bulut tabanlı NoSQL veritabanı.

Veri akışı şu şekildedir:
`Client (React)` <-> `API (Vercel Functions)` <-> `Database (MongoDB)`

## 📂 Dizin Yapısı

```
Dispo/
├── api/                # Backend API fonksiyonları
│   ├── animals.js      # CRUD işlemleri için ana endpoint
│   └── dashboard-stats.js # İstatistiksel veri endpoint'i
├── src/                # Frontend kaynak kodları
│   ├── components/     # Yeniden kullanılabilir UI bileşenleri
│   ├── lib/            # Yardımcı fonksiyonlar ve konfigürasyonlar
│   ├── App.jsx         # Ana uygulama bileşeni ve routing
│   └── main.jsx        # Uygulama giriş noktası
├── public/             # Statik dosyalar
└── package.json        # Konfigürasyon dosyaları
```

## 🗄️ Veritabanı Şeması & Veri Yapısı

Uygulama tek bir ana koleksiyon kullanır: `animals` (MongoDB).

### `animals` Koleksiyonu
Her bir doküman aşağıdaki alanlara sahiptir:

| Alan Adı | Tip | Açıklama |
|---|---|---|
| `_id` | ObjectId | MongoDB benzersiz kayıt kimliği |
| `removalDate` | String | Hayvanın çıkarıldığı tarih (YYYY-MM-DD) |
| `reason` | String | Çıkarılma nedeni kodu (örn: "EXP-01" vb.) |
| `count` | Number | Çıkarılan hayvan sayısı |
| `species` | String | Hayvan türü (örn: "Mouse", "Rat") |
| `strain` | String | Hayvan suşu (örn: "C57BL/6") |
| `sex` | String | Cinsiyet kodu (`Male`, `Female`) |
| `dob` | String | Doğum Tarihi (YYYY-MM-DD) |
| `project` | String | Proje kodu veya adı |
| `transferInstitution` | String | Transfer yapılan kurum (Transfer nedenli çıkışlarda) |
| `notes` | String | (Opsiyonel) Ek açıklamalar |
| `created_at` | Date | Kaydın oluşturulma zamanı |

### ⚧ Cinsiyet ve İsim Standartları
- **DB Standardı:** Veritabanında cinsiyet alanı `sex` ismiyle ve `Male` / `Female` değerleriyle saklanır. Zod şeması bu değerleri doğrular.
- **UI Eşlemesi:** Arayüzde veri giriş formlarında ve listelerde bu değerler kullanıcıya Türkçe olarak `Erkek` ve `Dişi` şeklinde sunulur.

---

## 🔌 API Referansı & Rotalar

### Ön Yüz Yönlendirmeleri (`react-router-dom`)
- `/` - Dashboard / Grafik Analiz Ekranı
- `/dashboard` - Hayvan Listesi, Arama ve Yeni Kayıt Ekleme Formu

### Sunucu API Endpoint'leri (Zod Validasyonlu)

Tüm API gövdeleri sunucu tarafında **Zod** şemaları aracılığıyla parse edilir. Safe parse işleminin alanları kırpmaması (parameter stripping) için formdaki tüm opsiyonel/zorunlu parametreler (`species`, `strain`, `sex`, `count`, `dob`, `removalDate`, `reason`, `project`, `transferInstitution`) Zod şemasına birebir dahil edilmiştir.

#### 1. Hayvan Kayıtları API (`/api/animals`)
- **GET `/api/animals`**: Tüm hayvan kayıtlarını `removalDate`'e göre yeniden eskiye sıralı olarak getirir.
- **POST `/api/animals`**: Yeni bir hayvan çıkışı kaydeder. Gönderilen veriler Zod ile doğrulanır (örn. `count` pozitif tam sayı olmalıdır).
- **DELETE `/api/animals?id={id}`**: Belirtilen ID'ye sahip hayvan kaydını siler.

#### 2. İstatistik API (`/api/dashboard-stats`)
- **GET `/api/dashboard-stats`**: Dashboard grafiklerinin beslenmesi için aylık kullanım trendleri ve çıkış nedenleri dağılımını gruplayarak döner.

> [!IMPORTANT]
> **Toplu İçe Aktarma (Bulk Insert):** Faz 2 kapsamında planlanan `/api/animals/bulk` toplu veri aktarım ucu, kullanıcı kararı doğrultusunda geliştirilmemiş olup kapsam dışı tutulmuştur.

---

## 🔐 Kimlik Doğrulama ve Güvenlik

Dispo, bağımsız bir kimlik doğrulama sistemi yerine ana uygulama olan **Apex (wildtype.app)** ile paylaşılan bir oturum yapısı kullanır.

1.  **Oturum Kontrolü:** Dispo API'sine gelen her istekte `interapp_session` adlı signed JWT çerezi doğrulanır. Çerez geçersiz veya eksikse sunucu istekleri `401 Unauthorized` ile reddeder.
2.  **Uygulama Yetkisi:** JWT içindeki `apps` dizisi kontrol edilir. Sadece "dispo" yetkisi verilmiş olan kullanıcılar sisteme erişebilir.
3.  **Ön Yüz Koruma:** `App.jsx` üzerinde tanımlı React Router rotaları, Apex auth kütüphaneleri ile sarmalanarak yetkisiz kullanıcıların arayüze erişmesi engellenmiştir.

