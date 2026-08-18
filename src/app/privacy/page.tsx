import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { siteConfig } from "@/lib/site";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const en = (await getLocale()) === "en"; return { title: en ? "Privacy Policy" : "Kebijakan Privasi", description: en ? "General privacy policy for the Grahito Labs website and accounts." : "Kebijakan privasi umum untuk website dan akun Grahito Labs.", alternates: { canonical: "/privacy" } }; }

export default async function PrivacyPage() {
  const en = (await getLocale()) === "en";
  if (en) return <LegalPageLayout title="Privacy Policy" description="How data is processed when you use the Grahito Labs website and account.">
    <h2>1. About the service operator</h2><p>This website is operated by Grahito Labs, an independent digital product studio. Legal identity of the operator: <strong>TODO: FULL NAME/LEGAL DEVELOPER NAME</strong>. Jurisdiction or address, if required: <strong>TODO: ADDRESS OR JURISDICTION</strong>.</p>
    <h2>2. Data we collect</h2><p>When you create an account, we process your display name, email address, user identifier, account creation time, verification status, and information about connected products and plans. We may also receive information you voluntarily provide when contacting support.</p>
    <h2>3. How we use data</h2><ul><li>Create, verify, and secure account sessions.</li><li>Provide access to connected products.</li><li>Respond to support requests and important service notices.</li><li>Maintain functionality and address service abuse.</li></ul><p>We do not use analytics or behavioral tracking in the initial version of the website.</p>
    <h2>4. Storage and service providers</h2><p>Authentication and account data are stored using Supabase. The website may be hosted through Vercel. These providers may process technical data as necessary under their policies and service agreements. We do not claim security guarantees or certifications beyond those actually implemented and verifiable.</p>
    <h2>5. Retention and deletion</h2><p>Account data is retained while the account is in use or as needed to provide the service and meet applicable obligations. You can request account deletion through the <Link href="/support">Support</Link> page. <strong>TODO: FINALIZE THE PROCESS, HANDLING TIME, AND RETENTION EXCEPTIONS.</strong></p>
    <h2>6. User rights</h2><p>Subject to applicable law, you may request access to, correction of, or deletion of personal data, and ask questions about data processing. We may need to verify your identity before fulfilling a request.</p>
    <h2>7. Cookies</h2><p>Cookies are used to maintain authenticated account sessions and remember your language preference. The initial website does not place analytics or advertising cookies.</p>
    <h2>8. Policy changes</h2><p>This policy may be updated when products or data-processing practices change. The effective date above will be updated when the final version is published.</p>
    <h2>9. Contact</h2><p>Privacy questions can be sent to <strong>{siteConfig.supportEmail}</strong>. <strong>TODO: REPLACE WITH THE FINAL SUPPORT EMAIL.</strong></p>
  </LegalPageLayout>;

  return <LegalPageLayout title="Kebijakan Privasi" description="Penjelasan tentang data yang diproses saat kamu menggunakan website dan akun Grahito Labs.">
    <h2>1. Tentang pengelola layanan</h2><p>Website ini dikelola oleh Grahito Labs, sebuah studio produk digital independen. Identitas legal pengelola: <strong>TODO: NAMA LENGKAP/LEGAL DEVELOPER</strong>. Yurisdiksi atau alamat, apabila diperlukan: <strong>TODO: ALAMAT ATAU YURISDIKSI</strong>.</p>
    <h2>2. Data yang kami kumpulkan</h2><p>Saat kamu membuat akun, kami memproses nama tampilan, alamat email, pengenal pengguna, waktu pembuatan akun, status verifikasi, serta informasi produk dan paket yang terhubung. Kami juga dapat menerima informasi yang kamu berikan secara sukarela saat menghubungi dukungan.</p>
    <h2>3. Tujuan penggunaan data</h2><ul><li>Membuat, memverifikasi, dan mengamankan sesi akun.</li><li>Menyediakan akses ke produk yang terhubung.</li><li>Menanggapi permintaan bantuan dan pemberitahuan penting terkait layanan.</li><li>Menjaga fungsi dan menangani penyalahgunaan layanan.</li></ul><p>Kami tidak menggunakan analytics atau pelacakan perilaku pada versi awal website.</p>
    <h2>4. Penyimpanan dan penyedia layanan</h2><p>Autentikasi dan data akun disimpan menggunakan Supabase. Website dapat dihosting melalui Vercel. Penyedia tersebut dapat memproses data teknis seperlunya sesuai kebijakan dan perjanjian layanan mereka. Kami tidak menyatakan jaminan keamanan atau sertifikasi di luar yang benar-benar diterapkan dan dapat dibuktikan.</p>
    <h2>5. Retensi dan penghapusan</h2><p>Data akun disimpan selama akun masih digunakan atau selama diperlukan untuk menyediakan layanan dan memenuhi kewajiban yang berlaku. Kamu dapat mengajukan penghapusan akun melalui halaman <Link href="/support">Bantuan</Link>. <strong>TODO: FINALISASI PROSES, WAKTU PENANGANAN, DAN PENGECUALIAN RETENSI.</strong></p>
    <h2>6. Hak pengguna</h2><p>Sesuai hukum yang berlaku, kamu dapat meminta akses, koreksi, atau penghapusan data pribadi, serta mengajukan pertanyaan mengenai pemrosesan data. Kami mungkin perlu memverifikasi identitas sebelum memenuhi permintaan.</p>
    <h2>7. Cookie</h2><p>Cookie digunakan untuk mempertahankan sesi autentikasi akun dan mengingat pilihan bahasa. Website ini tidak menempatkan cookie analytics atau iklan pada versi awal.</p>
    <h2>8. Perubahan kebijakan</h2><p>Kebijakan ini dapat diperbarui ketika produk atau cara pemrosesan data berubah. Tanggal efektif di bagian atas akan diperbarui ketika versi final diterbitkan.</p>
    <h2>9. Kontak</h2><p>Pertanyaan privasi dapat dikirim ke <strong>{siteConfig.supportEmail}</strong>. <strong>TODO: GANTI DENGAN EMAIL DUKUNGAN FINAL.</strong></p>
  </LegalPageLayout>;
}
