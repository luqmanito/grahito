import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Privasi Kalkulator Komisi Shopee", description: "Kebijakan privasi khusus Chrome Extension Kalkulator Komisi Shopee.", alternates: { canonical: "/products/kalkulator-komisi-shopee/privacy" } };

export default function ExtensionPrivacyPage() {
  return <LegalPageLayout eyebrow="Kalkulator Komisi Shopee" title="Kebijakan Privasi Ekstensi" description="Cara Kalkulator Komisi Shopee menggunakan sesi dan laporan untuk menjalankan fungsi utamanya.">
    <h2>1. Ruang lingkup</h2><p>Kebijakan ini berlaku khusus untuk Chrome Extension Kalkulator Komisi Shopee. Kebijakan akun Grahito Labs dijelaskan terpisah dalam Kebijakan Privasi umum.</p>
    <h2>2. Sesi autentikasi Shopee</h2><p>Data sesi autentikasi Shopee bersifat sensitif. Ekstensi mendeteksi sesi autentikasi yang sudah tersedia di browser agar dapat meminta laporan yang dipilih pengguna.</p><ul><li>Nilai cookie autentikasi Shopee tidak disimpan oleh ekstensi.</li><li>Cookie Shopee tidak dikirim ke server Grahito Labs.</li><li>Cookie Shopee tidak dijual atau dibagikan kepada pihak ketiga.</li></ul>
    <h2>3. Pemrosesan laporan</h2><p>Permintaan laporan dikirim langsung dari browser pengguna ke <code>affiliate.shopee.co.id</code>. Perhitungan komisi dilakukan di dalam ekstensi. Grahito Labs tidak menerima nilai cookie autentikasi melalui proses ini.</p><p>Apabila sinkronisasi akun ditambahkan di masa depan, hanya ringkasan hasil komisi yang boleh dikirim setelah pengguna memberikan persetujuan. Kebijakan ini akan diperbarui sebelum fitur tersebut dirilis.</p>
    <h2>4. Permission Chrome</h2><p>Ekstensi dapat memerlukan permission berikut sesuai manifest versi yang diterbitkan:</p><ul><li><strong>cookies</strong> — mendeteksi keberadaan sesi Shopee yang dibutuhkan oleh fungsi produk tanpa menyimpan nilai cookie.</li><li><strong>host permissions untuk domain Shopee terkait</strong> — mengirim permintaan laporan langsung ke domain Shopee dari browser pengguna.</li><li><strong>storage</strong> — menyimpan preferensi lokal ekstensi, seperti pilihan tampilan atau rentang terakhir, bukan nilai cookie autentikasi Shopee.</li></ul><p><strong>TODO: COCOKKAN DAFTAR INI DENGAN MANIFEST FINAL SEBELUM PUBLIKASI.</strong></p>
    <h2>5. Praktik data</h2><ul><li>Tidak ada penjualan data.</li><li>Tidak ada iklan berbasis perilaku.</li><li>Tidak ada pelacakan riwayat browsing di luar fungsi produk.</li><li>Tidak ada klaim sertifikasi atau jaminan keamanan yang tidak dapat dibuktikan.</li></ul>
    <h2>6. Mencabut akses</h2><p>Kamu dapat mencabut akses ekstensi dengan menghapus Kalkulator Komisi Shopee dari Chrome. Setelah dihapus, ekstensi tidak lagi dapat menjalankan fungsi atau meminta laporan dari browser tersebut.</p>
    <h2>7. Penghapusan data akun Grahito Labs</h2><p>Untuk meminta penghapusan data akun Grahito Labs, hubungi <strong>{siteConfig.supportEmail}</strong>. <strong>TODO: FINALISASI EMAIL DAN PROSES PENGHAPUSAN AKUN.</strong></p>
    <h2>8. Produk independen</h2><p>Kalkulator Komisi Shopee adalah produk independen dan tidak berafiliasi, disponsori, disetujui, atau dikelola oleh Shopee. Shopee dan seluruh merek terkait merupakan milik pemegang hak masing-masing.</p>
    <h2>9. Kontak</h2><p>Pertanyaan mengenai privasi ekstensi dapat dikirim ke <strong>{siteConfig.supportEmail}</strong>. <strong>TODO: GANTI DENGAN EMAIL DUKUNGAN FINAL.</strong></p>
  </LegalPageLayout>;
}
