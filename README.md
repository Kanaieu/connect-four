# Game Connect Four

🎮 **[PLAY ONLINE - https://connect-four-virid.vercel.app/](https://connect-four-virid.vercel.app/)**

📂 **[GITHUB REPOSITORY - https://github.com/Kanaieu/connect-four](https://github.com/Kanaieu/connect-four)**

## 🎮 Deskripsi Proyek

Game Connect Four yang modern dan interaktif dibangun dengan HTML, CSS, dan JavaScript murni. Implementasi berbasis web ini menampilkan desain glass morphism yang elegan, lawan Bot dengan berbagai tingkat kesulitan, dan efek visual yang menarik. Game ini mencakup fitur lengkap seperti pelacakan skor, manajemen status game, dan antarmuka pengguna yang intuitif.

## 🚀 Teknologi yang Digunakan

- **HTML5** - Markup semantik dan struktur game
- **CSS3** - Styling modern dengan:
  - CSS Grid untuk layout papan
  - Efek glass morphism
  - Background gradient
  - Animasi keyframe
  - Desain responsif
- **Vanilla JavaScript** - Logika game dan interaksi:
  - Arsitektur event-driven
  - Manipulasi DOM
  - Manajemen state
  - Implementasi algoritma AI

## ✨ Fitur

### Gameplay Inti

- **Aturan Connect Four Klasik** - Jatuhkan token untuk mendapat 4 berturut-turut
- **Lawan AI** - Pemain komputer dengan gerakan strategis
- **Dua Tingkat Kesulitan** - Mode Easy dan Medium
- **Pelacakan Skor** - Skor persisten antar game
- **Manajemen Status Game** - Penanganan giliran dan deteksi game over yang tepat

### Antarmuka Pengguna

- **Desain Glass Morphism Modern** - Efek tembus pandang yang elegan
- **Layout Responsif** - Dioptimalkan untuk tampilan satu layar
- **Elemen Interaktif**:
  - Efek hover dan animasi
  - Indikator panah untuk pemilihan kolom
  - Bayangan preview token
  - Animasi jatuh koin yang halus
- **Indikator Giliran** - Umpan balik visual yang jelas untuk pemain saat ini
- **Modal Kustom** - Dialog game over dan konfirmasi yang profesional

### Efek Visual

- **Animasi Jatuh Token** - Fisika koin jatuh yang realistis
- **Indikator Panah Bouncing** - Panduan gerakan pemain
- **Background Gradient** - Skema warna yang indah
- **Status Hover** - Umpan balik interaktif
- **Efek Bayangan** - Kedalaman dan dimensi

## 🛠️ Instruksi Setup

### Prasyarat

- Browser web modern (Chrome, Firefox, Safari, Edge)
- Tidak memerlukan dependensi tambahan

### Instalasi

#### Metode 1: Clone dari GitHub

```bash
# Clone repository
git clone https://github.com/Kanaieu/connect-four.git

# Masuk ke direktori project
cd connect-four

# Buka index.html di browser
```

#### Metode 2: Download Manual

1. **Download ZIP** dari GitHub repository
2. **Extract** file ZIP
3. **Pastikan semua file berada dalam direktori yang sama**:
   ```
   connectfour/
   ├── index.html
   ├── styles.css
   ├── script.js
   └── README.md
   ```
4. **Buka `index.html`** di browser web Anda
5. **Mulai bermain!** - Tidak perlu setup server

### Struktur File

- `index.html` - Antarmuka dan struktur game utama
- `styles.css` - Semua styling dan efek visual
- `script.js` - Logika game, AI, dan interaksi
- `README.md` - Dokumentasi proyek

## 🌐 Live Demo

**🎮 Game sudah LIVE dan bisa dimainkan di:**
**[https://connect-four-virid.vercel.app/](https://connect-four-virid.vercel.app/)**

Silakan klik link di atas untuk langsung bermain Connect Four online!

## 🤖 Dukungan Pengembangan AI

Proyek ini dikembangkan dengan bantuan alat AI untuk mempercepat pengembangan dan memastikan kualitas kode:

### Pengembangan Awal

- **Model**: IBM Granite 3.3-8B Instruct
- **Peran**: Generasi kode awal dan implementasi dasar Connect Four
- **Kontribusi**: Menghasilkan struktur game dasar dan logika inti

### Debugging & Penyempurnaan

- **Model**: GitHub Copilot (Claude-3.5-Sonnet)
- **Peran**: Debugging komprehensif, peningkatan fitur, dan penyempurnaan kode
- **Kontribusi**:
  - Memperbaiki bug logika game dan deteksi kemenangan
  - Mengimplementasikan desain UI/UX modern
  - Menambahkan fitur interaktif dan animasi
  - Mengoptimalkan layout responsif
  - Meningkatkan struktur dan organisasi kode
  - Mengimplementasikan strategi lawan AI
  - Menambahkan penanganan error yang komprehensif

### Proses Pengembangan

1. **Generasi Awal** - Menggunakan IBM Granite untuk struktur dasar Connect Four
2. **Penyempurnaan Iteratif** - Menerapkan Claude Copilot untuk:
   - Perbaikan bug dan peningkatan logika
   - Peningkatan UI/UX
   - Penambahan fitur
   - Optimisasi kode
   - Dokumentasi

Pendekatan AI hybrid ini menggabungkan prototyping cepat dengan penyempurnaan canggih untuk menciptakan pengalaman game yang polished dan profesional.

## � Deployment ke Vercel

### Cara Deploy Otomatis (Recommended)

1. **Persiapan GitHub Repository**

   ```bash
   # Inisialisasi git repository
   git init
   git add .
   git commit -m "Initial commit: Connect Four game"

   # Push ke GitHub (buat repository baru di GitHub dulu)
   git remote add origin https://github.com/username/connect-four-game.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan akun GitHub
   - Klik **"New Project"**
   - Import repository GitHub Anda
   - Vercel akan otomatis detect sebagai static site
   - Klik **"Deploy"**
   - Game akan live dalam beberapa menit!

### Cara Deploy Manual (Drag & Drop)

1. **Siapkan File**
   - Pastikan semua file (`index.html`, `styles.css`, `script.js`) dalam satu folder
2. **Upload ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login ke akun Vercel
   - Drag & drop folder project ke Vercel dashboard
   - Tunggu proses deployment selesai

### Konfigurasi Vercel (Optional)

Buat file `vercel.json` untuk konfigurasi tambahan:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Custom Domain (Optional)

1. Di Vercel dashboard, pilih project Anda
2. Klik **"Domains"**
3. Tambahkan custom domain
4. Follow instruksi DNS configuration

### Tips Deployment

- **Automatic Deployment**: Setiap push ke GitHub akan otomatis deploy
- **Preview Deployments**: Setiap pull request akan mendapat preview URL
- **Environment Variables**: Tidak diperlukan untuk static site ini
- **Analytics**: Aktifkan Vercel Analytics untuk tracking visitors

## �🎯 Kontrol Game

- **Klik Mouse** - Jatuhkan token di kolom yang dipilih
- **Hover** - Preview penempatan token dan indikator kolom
- **Play Again** - Lanjutkan dengan skor saat ini
- **New Game** - Reset skor dan mulai fresh
- **Reset Score** - Hapus papan skor dengan konfirmasi
- **Difficulty** - Beralih antara AI Easy dan Medium

## 👨‍💻 Pembuat

**Muhammad Tsaqiif**

---

Selamat bermain Connect Four! 🔴🟡
