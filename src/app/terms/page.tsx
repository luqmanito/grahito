import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { siteConfig } from "@/lib/site";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const en = (await getLocale()) === "en"; return { title: en ? "Terms & Conditions" : "Syarat & Ketentuan", description: en ? "Terms for using the Grahito Labs website and products." : "Syarat penggunaan website dan produk Grahito Labs.", alternates: { canonical: "/terms" } }; }

export default async function TermsPage() {
  const en = (await getLocale()) === "en";
  if (en) return <LegalPageLayout title="Terms & Conditions" description="Basic terms for using the Grahito Labs website, accounts, and products.">
    <h2>1. Acceptance of terms</h2><p>By using Grahito Labs services, you agree to these terms and the Privacy Policy. Do not use the services if you do not agree.</p>
    <h2>2. User accounts</h2><p>You are responsible for keeping your account credentials confidential and providing accurate information. Notify us if you suspect unauthorized access.</p>
    <h2>3. Acceptable use</h2><p>The services may only be used in accordance with the law and their intended functions. You may not disrupt the services, attempt unauthorized access, misuse another party&apos;s data, or use a product for harmful activity.</p>
    <h2>4. Service availability</h2><p>Products may change, be temporarily suspended, or be permanently discontinued. Beta or coming-soon features may change before release and do not guarantee a specific launch date.</p>
    <h2>5. Third-party services</h2><p>Some functions depend on browsers, platforms, or third-party services. Their use is also subject to their owners&apos; terms. Grahito Labs does not control the availability of or changes to third-party services.</p>
    <h2>6. Intellectual property</h2><p>The Grahito Labs name, interface, code, and materials are protected under applicable rights. Third-party trademarks remain the property of their respective owners.</p>
    <h2>7. Information limitations</h2><p>Product summaries or estimates are not official records from third-party platforms. Users should still check official sources before making decisions.</p>
    <h2>8. Termination and account deletion</h2><p>We may restrict access when there is a violation of these terms or a risk to the service. Users may request account deletion. <strong>TODO: FINALIZE THE ACCOUNT DELETION FLOW AND TERMS.</strong></p>
    <h2>9. Governing law and operator identity</h2><p>Legal identity: <strong>TODO: FULL NAME/LEGAL DEVELOPER NAME</strong>. Applicable law or jurisdiction: <strong>TODO: JURISDICTION</strong>. This section must be reviewed before production.</p>
    <h2>10. Contact</h2><p>Questions can be sent to <strong>{siteConfig.supportEmail}</strong>. <strong>TODO: REPLACE WITH THE FINAL SUPPORT EMAIL.</strong></p>
  </LegalPageLayout>;

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
