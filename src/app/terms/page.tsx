import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Syarat & Ketentuan", description: "Syarat penggunaan website dan produk Grahito Labs.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <LegalPageLayout title="Syarat & Ketentuan" description="Ketentuan dasar untuk penggunaan website, akun, dan produk Grahito Labs.">
    <h2>1. Penerimaan syarat</h2><p>Dengan menggunakan layanan Grahito Labs, kamu menyetujui syarat ini dan Kebijakan Privasi. Jika tidak menyetujuinya, jangan menggunakan layanan.</p>
    <h2>2. Akun pengguna</h2><p>Kamu bertanggung jawab menjaga kerahasiaan kredensial akun dan memberikan informasi yang akurat. Beri tahu kami jika kamu menduga ada akses tanpa izin.</p>
    <h2>3. Penggunaan yang diperbolehkan</h2><p>Layanan hanya boleh digunakan sesuai hukum dan fungsi produk. Kamu tidak boleh mengganggu layanan, mencoba mengakses sistem tanpa izin, menyalahgunakan data pihak lain, atau menggunakan produk untuk tindakan yang merugikan.</p>
    <h2>4. Ketersediaan layanan</h2><p>Produk dapat berubah, dihentikan sementara, atau dihentikan secara permanen. Fitur berstatus beta atau segera tersedia dapat berubah sebelum rilis dan tidak menjamin tanggal peluncuran tertentu.</p>
    <h2>5. Layanan pihak ketiga</h2><p>Beberapa fungsi bergantung pada browser, platform, atau layanan pihak ketiga. Penggunaan layanan tersebut juga tunduk pada ketentuan pemiliknya. Grahito Labs tidak mengendalikan ketersediaan atau perubahan pada layanan pihak ketiga.</p>
    <h2>6. Kekayaan intelektual</h2><p>Nama, tampilan, kode, dan materi Grahito Labs dilindungi sesuai hak yang berlaku. Merek pihak ketiga tetap menjadi milik pemegang hak masing-masing.</p>
    <h2>7. Batasan informasi</h2><p>Ringkasan atau estimasi yang ditampilkan produk bukan catatan resmi dari platform pihak ketiga. Pengguna tetap perlu memeriksa sumber resmi sebelum mengambil keputusan.</p>
    <h2>8. Pengakhiran dan penghapusan akun</h2><p>Kami dapat membatasi akses apabila terdapat pelanggaran syarat atau risiko terhadap layanan. Pengguna dapat mengajukan penghapusan akun. <strong>TODO: FINALISASI ALUR DAN KETENTUAN PENGHAPUSAN AKUN.</strong></p>
    <h2>9. Hukum dan identitas pengelola</h2><p>Identitas legal: <strong>TODO: NAMA LENGKAP/LEGAL DEVELOPER</strong>. Hukum atau yurisdiksi yang berlaku: <strong>TODO: YURISDIKSI</strong>. Bagian ini perlu ditinjau sebelum produksi.</p>
    <h2>10. Kontak</h2><p>Pertanyaan dapat dikirim ke <strong>{siteConfig.supportEmail}</strong>. <strong>TODO: GANTI DENGAN EMAIL DUKUNGAN FINAL.</strong></p>
  </LegalPageLayout>;
}
