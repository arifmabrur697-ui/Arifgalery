🌐 Website Galeri Pribadi Menggunakan Supabase dan Netlify
📘 Deskripsi Proyek

Website Galeri Pribadi ini merupakan aplikasi berbasis web yang memungkinkan pengguna untuk menyimpan, menampilkan, dan mengelola koleksi foto pribadi secara online.
Proyek ini menggunakan layanan Supabase sebagai backend untuk autentikasi pengguna (login/register) serta penyimpanan gambar (storage), dan dihosting menggunakan Netlify agar mudah diakses secara publik.

Tujuan utama proyek ini adalah membangun sistem cloud-based gallery yang aman, efisien, dan mudah digunakan tanpa harus membuat server sendiri.

⚙️ Fitur Utama
🔐 1. Autentikasi Pengguna

Login dan Register menggunakan Supabase Auth

Dukungan login sosial melalui Google dan GitHub

Reset password melalui email

🖼️ 2. Manajemen Galeri

Upload foto langsung ke Supabase Storage

Menampilkan galeri gambar pengguna

Setiap pengguna hanya bisa melihat gambar miliknya sendiri (dengan RLS Policy)

💾 3. Penyimpanan Cloud

File gambar disimpan secara aman di Supabase Storage

Setiap file memiliki URL publik untuk ditampilkan di web

🌍 4. Hosting Modern

Website di-deploy di Netlify untuk performa tinggi dan uptime stabil

Integrasi otomatis dari repository GitHub (CI/CD)

🧩 Arsitektur Sistem
[Client Side (HTML, CSS, JS)]
         │
         ▼
[Supabase Auth] <----> [Supabase Database]
         │
         ▼
[Supabase Storage] ----> [Netlify Hosting]


Frontend: HTML, CSS, JavaScript

Backend: Supabase (Auth + Storage)

Hosting: Netlify

🛠️ Teknologi yang Digunakan
Komponen	Teknologi	Fungsi
Frontend	HTML, CSS, JavaScript	Antarmuka pengguna
Backend	Supabase	Otentikasi dan penyimpanan data
Storage	Supabase Storage	Menyimpan file gambar
Hosting	Netlify	Men-deploy website ke publik
Versi JS	Supabase JS v2.39.3	SDK untuk komunikasi Supabase
🧰 Persiapan & Instalasi
1. Buat Proyek di Supabase

Buka https://app.supabase.com

Buat project baru

Catat:

SUPABASE_URL

SUPABASE_ANON_KEY

Aktifkan Authentication → Email/Password

Aktifkan login sosial (opsional):

Google

GitHub

Buat bucket storage bernama gallery

Tambahkan RLS Policy agar setiap user hanya dapat melihat file miliknya sendiri:

-- Izinkan pengguna hanya mengakses file milik sendiri
CREATE POLICY "Allow individual access"
ON storage.objects
FOR SELECT USING (auth.uid() = owner);

CREATE POLICY "Allow individual upload"
ON storage.objects
FOR INSERT WITH CHECK (auth.uid() = owner);

2. Struktur Folder Project
📂 my-gallery
├── index.html        → Halaman login & register
├── gallery.html      → Halaman utama galeri
├── style.css         → File gaya tampilan
├── auth.js           → Script autentikasi Supabase
└── /assets           → Folder gambar tambahan

3. Isi Konfigurasi Supabase

Di dalam auth.js, sesuaikan bagian berikut:

const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

4. Deploy ke Netlify

Buka https://app.netlify.com

Buat situs baru dari GitHub atau upload manual folder project

Tunggu hingga proses deployment selesai

Dapatkan URL situs publik seperti:

https://my-gallery-app.netlify.app

🖥️ Cara Penggunaan

Buka halaman utama (index.html)

Pilih tab Register → Buat akun baru

Login menggunakan akun yang sudah dibuat

Setelah login, pengguna akan diarahkan ke halaman gallery.html

Unggah gambar ke galeri pribadi

Keluar menggunakan tombol Logout

🎨 Desain Tampilan

Tampilan dirancang dengan konsep minimalis dan modern, menggunakan palet warna netral serta komponen responsif agar nyaman diakses di berbagai perangkat (desktop & mobile).

🚀 Keunggulan Proyek

Tidak memerlukan backend server tradisional

Keamanan tinggi berkat sistem autentikasi Supabase

Skalabilitas otomatis dengan layanan cloud

Gratis untuk tahap pengembangan

Dapat dikembangkan menjadi portofolio pribadi online

📄 Lisensi

Proyek ini bersifat open-source dan dapat digunakan untuk tujuan pembelajaran, penelitian, maupun pengembangan pribadi.

👨‍💻 Pengembang

Nama: Muhammad Arif Mabrur
Project: Website Galeri Pribadi Menggunakan Supabase dan Netlify
Tahun: 2025
