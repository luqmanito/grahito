# Grahito Labs

Website production-ready untuk Grahito Labs: landing page, katalog dan detail produk, autentikasi Supabase, dashboard akun, halaman legal, serta fondasi produk berikutnya.

## Stack

- Next.js 16.2 (App Router, Server Components secara default)
- TypeScript
- Tailwind CSS 4
- Supabase Auth, Postgres, RLS, dan SSR cookies
- React Hook Form + Zod
- Deployable ke Vercel

## Menjalankan secara lokal

Persyaratan: Node.js 22 atau lebih baru dan npm. Next.js 16 masih mendukung Node.js 20.9+, tetapi dependensi Supabase terbaru mensyaratkan Node.js 22.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

## Environment variables

| Nama | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Ya di production | Origin website tanpa trailing slash. |
| `NEXT_PUBLIC_SUPABASE_URL` | Ya | Project URL dari Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya | Publishable/anon key. Aman diekspos dengan RLS yang benar. |
| `NEXT_PUBLIC_CHROME_WEB_STORE_URL` | Tidak | Biarkan kosong sampai listing ekstensi resmi tersedia. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Ya di production | Email dukungan publik. |

Jangan menambahkan service role key ke environment client atau variabel berawalan `NEXT_PUBLIC_`.

## Menyiapkan Supabase

1. Buat proyek Supabase.
2. Jalankan migration [initial schema](./supabase/migrations/202608070001_initial_schema.sql) lewat Supabase CLI atau SQL Editor.
3. Di **Authentication → URL Configuration**, isi Site URL dan redirect URL:
   - `http://localhost:3000/auth/callback`
   - URL preview Vercel yang dipercaya (jika digunakan)
   - `https://DOMAIN_FINAL/auth/callback`
4. Aktifkan email confirmation untuk alur verifikasi email.
5. Konfigurasikan template dan penyedia email production.
6. Salin Project URL dan publishable/anon key ke `.env.local`.

Migration membuat `profiles`, `products`, dan `user_products`; mengaktifkan RLS; membatasi pengguna pada datanya sendiri; dan membuat profile otomatis setelah pendaftaran.

## Arsitektur autentikasi

- Browser client menangani submit login, registrasi, forgot password, dan update password.
- `proxy.ts` menyegarkan cookie sesi Supabase dan melindungi `/account`.
- Server Component `/account` memvalidasi user dengan `auth.getUser()` sebelum membaca data ber-RLS.
- `/auth/callback` menukar PKCE code dengan sesi dan hanya menerima redirect path internal.
- Logout menggunakan Server Action.
- Penghapusan akun sengaja diarahkan ke dukungan sampai proses backend yang aman dan kebijakan retensinya final. Menghapus `auth.users` tidak dilakukan dari browser dan tidak menggunakan service role key di client.

Untuk login ekstensi di masa depan, gunakan authorization flow berbasis web dengan kode satu kali, redirect URI ekstensi yang tervalidasi, durasi singkat, dan pertukaran token pada backend. Flow tersebut belum diimplementasikan karena extension ID dan konfigurasi final belum tersedia.

## Route

| Route | Fungsi |
| --- | --- |
| `/` | Landing page Grahito Labs |
| `/products` | Katalog produk |
| `/products/kalkulator-komisi-shopee` | Detail ekstensi |
| `/login` | Masuk |
| `/register` | Registrasi |
| `/forgot-password` | Permintaan reset |
| `/reset-password` | Password baru |
| `/verify-email` | Informasi verifikasi |
| `/account` | Dashboard terlindungi |
| `/privacy` | Kebijakan privasi umum |
| `/products/kalkulator-komisi-shopee/privacy` | Privasi ekstensi |
| `/terms` | Syarat & ketentuan |
| `/support` | Bantuan dan kontak |

Selain itu tersedia `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, favicon SVG, metadata per halaman, Organization JSON-LD, dan SoftwareApplication JSON-LD.

## Pemeriksaan kualitas

```bash
npm run lint
npm run type-check
npm run build
```

## Deploy ke Vercel

1. Import repository ke Vercel.
2. Tambahkan semua environment variables untuk Production dan Preview.
3. Pastikan redirect URL Supabase mencakup domain deployment.
4. Deploy dan uji register → verifikasi email → login → reset password → logout.

## Keputusan desain

Identitas Grahito Labs menggunakan palet netral hitam hangat, putih, dan lime untuk memberi rasa studio yang fleksibel. Oranye hanya muncul sebagai aksen pada Kalkulator Komisi Shopee. Ilustrasi dibuat dengan CSS dan komponen UI agar ringan, responsif, serta tidak bergantung pada stock photo. Animasi dibatasi dan mengikuti `prefers-reduced-motion`.

Lihat [TODO.md](./TODO.md) untuk daftar hal yang tidak boleh ditebak dan wajib diselesaikan sebelum publikasi.
