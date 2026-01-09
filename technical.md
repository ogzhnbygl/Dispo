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

Projenin temel dizin yapısı ve açıklamaları:

```
/
├── api/                # Backend API fonksiyonları
│   ├── animals.js      # CRUD işlemleri için ana endpoint
│   └── dashboard-stats.js # İstatistiksel veri endpoint'i
├── src/                # Frontend kaynak kodları
│   ├── components/     # Yeniden kullanılabilir UI bileşenleri
│   ├── lib/            # Yardımcı fonksiyonlar ve konfigürasyonlar
│   ├── App.jsx         # Ana uygulama bileşeni ve routing
│   └── main.jsx        # Uygulama giriş noktası
├── public/             # Statik dosyalar
└── ...config files     # Yapılandırma dosyaları (vite, tailwind, package.json vb.)
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
| `created_at` | Date | Kaydın oluşturulma zamanı. |

## 🔐 Kimlik Doğrulama Mimarisi

Dispo, bağımsız bir kimlik doğrulama sistemi yerine ana uygulama olan **Apex (wildtype.app)** ile paylaşılan bir oturum yapısı kullanır.

### Akış Şeması
1.  **Giriş:** Kullanıcı `wildtype.app` üzerinden giriş yapar ve `interapp_session` (HttpOnly, Secure) çerezi tarayıcıya set edilir.
2.  **Proxy:** Dispo frontend'i, kullanıcının durumunu kontrol etmek için kendi backendine (`/api/auth/session`) istek atar.
3.  **Doğrulama (Identity):** Dispo API, gelen isteğin çerezini `wildtype.app` API'sine yönlendirerek kimliği doğrular.
4.  **Yetkilendirme (Authorization):** Kimlik doğrulandıktan sonra, Dispo API doğrudan **`Apex_db`** veritabanına bağlanır ve `users` koleksiyonunu sorgular.
    *   Kullanıcının `apps` listesinde `"Dispo"` var mı?
    *   Kullanıcının `role` değeri `"admin"` mi?
5.  **Sonuç:** Yetkili ise oturum açılır, değilse kullanıcı ana sayfaya yönlendirilir.
## 🔌 API Referansı

Tüm API istekleri `/api` öneki ile başlar.

### 1. Kayıtları Getir

- **Endpoint:** `GET /api/animals`
- **Açıklama:** Tüm hayvan kayıtlarını, `removalDate`'e göre yeniden eskiye sıralı olarak getirir.
- **Yanıt:** JSON dizisi.

### 2. Yeni Kayıt Ekle

- **Endpoint:** `POST /api/animals`
- **Body:**
  ```json
  {
    "removalDate": "2023-10-27",
    "reason": "EXP-01",
    "count": 5,
    "species": "Mouse",
    "strain": "C57BL/6",
    "gender": "Male",
    "project": "PRJ-123",
    "notes": "Deney tamamlandı"
  }
  ```
- **Yanıt:** Oluşturulan kayıt objesi (ID dahil).

### 3. Kayıt Sil

- **Endpoint:** `DELETE /api/animals?id={id}`
- **Query Param:** `id` (Silinecek kaydın ID'si)
- **Yanıt:** `{ "success": true }`

### 4. Dashboard İstatistikleri

- **Endpoint:** `GET /api/dashboard-stats`
- **Açıklama:** Dashboard grafikleri ve kartları için özet verileri hesaplar ve döner.
- **Yanıt:**
  ```json
  {
    "year": 150, // Yıllık toplam
    "month": 25, // Aylık toplam
    "projectTermination": 10, // Proje sonlandırma sayısı
    "monthlyData": [ ... ] // Grafik verileri
  }
  ```

## 💻 Frontend Bileşenleri

### `EntryForm`
Kullanıcıdan veri girişi alan form bileşeni. Form validasyonu ve API'ye POST isteği atma işlemlerini yönetir.

### `RecordList`
Kayıtların listelendiği, arama ve filtreleme işlemlerinin yapıldığı bileşen. Verileri tablo formatında gösterir.

### `Dashboard`
`recharts` kütüphanesini kullanarak verileri görselleştirir. Aylık trendleri ve kullanım nedenlerini grafiklerle sunar.

### `DataTransfer`
Verilerin JSON formatında dışa aktarılmasını (backup) ve içe aktarılmasını (restore) sağlar.
