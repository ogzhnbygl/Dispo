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
- **Veri Yönetimi:**
    - **Dışa Aktarma (Export):** Verileri JSON formatında yedekleme.
    - **İçe Aktarma (Import):** Yedeklenen verileri sisteme geri yükleme.
- **Güvenlik ve Yetkilendirme:**
    - **Ortak Oturum:** Ana uygulama (Apex) ile entegre, paylaşılan güvenli oturum yönetimi.
    - **Rol Tabanlı Erişim:** Sadece yetkili kullanıcıların ve yöneticilerin erişebildiği güvenli yapı.
- **Modern Arayüz:**
    - Responsive tasarım ile mobil ve masaüstü uyumluluğu.
    - Kullanıcı deneyimini artıran modern UI bileşenleri.

## 🛠️ Teknolojiler

Bu proje, performans ve geliştirici deneyimi için modern web teknolojileri kullanılarak inşa edilmiştir:

- **Frontend:**
    - [React](https://react.dev/) - Kullanıcı arayüzü kütüphanesi
    - [Vite](https://vitejs.dev/) - Hızlı build aracı
    - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
    - [Recharts](https://recharts.org/) - Veri görselleştirme
    - [Lucide React](https://lucide.dev/) - İkon seti
- **Backend:**
    - [Vercel Serverless Functions](https://vercel.com/docs/functions) - API endpoint'leri
- **Veritabanı:**
    - [MongoDB](https://www.mongodb.com/) - NoSQL veritabanı

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Ön Gereksinimler

- Node.js (v18 veya üzeri)
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
   MONGODB_URI=mongodb+srv://kullanici:sifre@cluster.mongodb.net/Dispo_db
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

Daha detaylı teknik bilgi için [TECHNICAL.md](./technical.md) dosyasına göz atın.

## 📜 Lisans

Bu proje özel kullanım için geliştirilmiştir. Tüm hakları saklıdır.
