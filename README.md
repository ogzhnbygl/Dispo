# Dispo - Laboratuvar Hayvanları Raporlama Sistemi

Laboratuvar hayvanlarının kayıtlarını tutmak, izlemek ve raporlamak için geliştirilmiş modern, kullanıcı dostu bir web uygulamasıdır. Araştırmacıların ve laboratuvar yöneticilerinin hayvan kullanım verilerini kolayca yönetmelerini ve görselleştirmelerini sağlar.

## 🚀 Özellikler

- **Kayıt Yönetimi:**
    - Hayvan türü, suş, cinsiyet, proje kodu ve diğer detaylarla eksiksiz kayıt oluşturma.
    - Her kayıt için otomatik tarih ve saat damgası.
- **Dashboard ve Görselleştirme:**
    - **Anlık İstatistikler:** Toplam çıkarılan hayvan sayısı, aylık kullanım ve proje sonlandırma sayıları.
    - **Grafikler:** Aylık kullanım trendlerini ve nedenlere göre dağılımı gösteren interaktif grafikler.
- **Arama ve Filtreleme:**
    - Tarih aralığına, türe, suşa veya proje koduna göre gelişmiş filtreleme.
    - Hızlı metin arama özelliği.
- **Güvenlik ve Yetkilendirme (Faz 1 & Faz 2):**
    - **SSO Ortak Oturum:** Apex (wildtype.app) üzerinden paylaşılan güvenli `interapp_session` JWT çerezi ile tek noktadan oturum kontrolü.
    - **React Router Yönlendirmesi:** `react-router-dom` entegrasyonu ile URL tabanlı yönlendirme (`/`, `/dashboard`).
    - **Zod Giriş Validasyonu:** Backend tarafında tüm hayvan kayıt işlemleri Zod şemaları ile doğrulanarak veri bütünlüğü garanti altına alınmıştır.
- **Cinsiyet Standardizasyonu:**
    - Veritabanı seviyesinde `Male` ve `Female` İngilizce kodlama standartları korunurken, arayüzde Türkçe `Erkek` ve `Dişi` olarak eşlenip gösterilir.
- **Modern Arayüz:**
    - Responsive tasarım ile mobil ve masaüstü uyumluluğu.
    - Kullanıcı deneyimini artıran Recharts grafik görselleştirmeleri.
    - JSON formatında veri yedekleme (Import/Export).

## 🛠️ Teknolojiler

Bu proje, performans ve geliştirici deneyimi için modern web teknolojileri kullanılarak inşa edilmiştir:

### Frontend
- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visualization:** [Recharts](https://recharts.org/)

### Backend
- **Runtime:** [Vercel Serverless Functions](https://vercel.com/docs/functions)
- **Database:** [MongoDB](https://www.mongodb.com/)

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Ön Gereksinimler
- Node.js (v18+)
- MongoDB veritabanı bağlantısı (URI)

### Adımlar

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/ogzhnbygl/Dispo.git
   cd Dispo
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Çevresel Değişkenleri Ayarlayın:**
   Kök dizinde `.env` dosyası oluşturun ve MongoDB bağlantı adresinizi ekleyin:
   ```env
   MONGODB_URI=mongodb+srv://...
   ```

4. **Uygulamayı başlatın:**
   ```bash
   npm run dev
   ```
   Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 📂 Proje Yapısı

- `/src`: React bileşenleri ve frontend mantığı.
- `/api`: Backend serverless fonksiyonları.
- `/lib`: Yardımcı kütüphaneler ve veritabanı bağlantısı.

Daha detaylı teknik bilgi için [TECHNICAL.md](./TECHNICAL.md) dosyasına göz atın.

## 📜 Lisans

Bu proje özel kullanım için geliştirilmiştir. Tüm hakları saklıdır.
