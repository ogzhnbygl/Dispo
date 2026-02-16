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

## 🗄️ Veritabanı Şeması

Uygulama tek bir ana koleksiyon kullanır: `animals`.

### `animals` Koleksiyonu

Her bir doküman aşağıdaki alanlara sahiptir:

| Alan Adı | Tip | Açıklama |
|---|---|---|
| `_id` | ObjectId | MongoDB tarafından atanan benzersiz kimlik. |
| `removalDate` | String | Hayvanın çıkarıldığı tarih (YYYY-MM-DD). |
| `reason` | String | Çıkarılma nedeni kodu (örn: "EXP-01"). |
| `count` | Number | Çıkarılan hayvan sayısı. |
| `species` | String | Hayvan türü (örn: "Mouse", "Rat"). |
| `strain` | String | Hayvan suşu (örn: "C57BL/6"). |
| `gender` | String | Cinsiyet ("Male", "Female", "Unknown"). |
| `project` | String | Proje kodu veya adı. |
| `notes` | String | (Opsiyonel) Ek açıklamalar. |
| `created_at` | Date | Kaydın oluşturulma zamanı. |

## 🔌 API Referansı

Tüm API istekleri `/api` öneki ile başlar.

### 1. Kayıtları Getir
- **Endpoint:** `GET /api/animals`
- **Açıklama:** Tüm hayvan kayıtlarını, `removalDate`'e göre yeniden eskiye sıralı olarak getirir.

### 2. Yeni Kayıt Ekle
- **Endpoint:** `POST /api/animals`
- **Body:** JSON formatında kayıt bilgileri.

### 3. Kayıt Sil
- **Endpoint:** `DELETE /api/animals?id={id}`
- **Query Param:** `id` (Silinecek kaydın ID'si)

### 4. Dashboard İstatistikleri
- **Endpoint:** `GET /api/dashboard-stats`
- **Açıklama:** Dashboard grafikleri ve kartları için özet verileri hesaplar ve döner.

## 🔐 Kimlik Doğrulama Mimarisi

Dispo, bağımsız bir kimlik doğrulama sistemi yerine ana uygulama olan **Apex (wildtype.app)** ile paylaşılan bir oturum yapısı kullanır.

1.  **Giriş:** Kullanıcı `wildtype.app` üzerinden giriş yapar.
2.  **Kontrol:** Dispo API, her istekte `interapp_session` çerezini doğrular.
3.  **Yetkilendirme:** Sadece `apps` listesinde "Dispo" yetkisi olan kullanıcılar erişebilir.
