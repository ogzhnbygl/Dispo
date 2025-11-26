# Laboratuvar Hayvanları Raporlama Sistemi

Laboratuvar hayvanlarının kayıtlarını tutmak, izlemek ve raporlamak için geliştirilmiş modern bir web uygulamasıdır.

## 🚀 Özellikler

- **Kayıt Yönetimi:** Hayvan türü, suş, proje ve diğer detaylarla kayıt oluşturma.
- **Dashboard:** Toplam çıkarılan, aylık kullanım ve proje bazlı istatistiklerin anlık takibi.
- **Arama ve Filtreleme:** Kayıtlar arasında detaylı arama ve filtreleme imkanı.
- **Veri Yönetimi:** Verileri içe ve dışa aktarma (Import/Export) özelliği.
- **Modern Arayüz:** Kullanıcı dostu ve responsive tasarım.

## 🛠️ Teknolojiler

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **Veritabanı:** MongoDB
- **İkonlar:** Lucide React

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

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
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Uygulamayı başlatın:**
   ```bash
   npm run dev
   ```

## 📜 Lisans

Bu proje özel kullanım için geliştirilmiştir.
