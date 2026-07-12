# Potato Cheese Pangalengan

Website promosi dan pemesanan untuk `Potato Cheese Pangalengan`, jajanan kentang krispi dengan saus keju creamy dan custom topping di area Terminal Pangalengan, Kabupaten Bandung.

## Ringkasan Web

Web ini dirancang sebagai landing page kuliner yang fokus pada konversi pemesanan. Pengunjung dapat melihat menu unggulan, memilih topping tambahan, membaca ulasan, mengecek lokasi outlet, lalu meneruskan pesanan ke WhatsApp.

Fitur utama:

- Hero section dan CTA pemesanan langsung
- Katalog menu favorit dan best seller
- Custom builder untuk racik topping
- Informasi pengiriman area Pangalengan
- Peta lokasi outlet dan kontak WhatsApp
- FAQ, ulasan pelanggan, dan loyalty/member mockup berbasis `localStorage`

## Teknologi

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React

## Menjalankan Secara Lokal

Prasyarat:

- Node.js 20 atau lebih baru

Langkah:

1. Install dependency:
   `npm install`
2. Jalankan mode development:
   `npm run dev`
3. Build production:
   `npm run build`
4. Validasi TypeScript:
   `npm run lint`

## Struktur Singkat

- `src/App.tsx`: perakitan halaman utama dan navigasi tab
- `src/components/`: komponen tampilan tiap section
- `src/data.ts`: data menu, topping, FAQ, galeri, dan testimoni
- `src/lib/storage.ts`: simulasi member, poin, riwayat, dan ulasan di `localStorage`
- `assets/`: aset visual proyek

## Alur Pemesanan

1. Pengunjung membuka halaman beranda.
2. Pengunjung memilih menu atau langsung membuka custom builder.
3. Pengunjung menentukan ukuran dan topping.
4. Web mengarahkan ke WhatsApp dengan format pesanan otomatis.

## Catatan

Repo ini adalah website frontend statis. Tidak ada dependensi ke AI Studio untuk menjalankan atau deploy aplikasi.
