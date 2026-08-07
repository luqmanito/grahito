import type { Metadata } from "next";
import { CircleHelp, Mail, ShieldQuestion } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, supportHref } from "@/lib/site";

export const metadata: Metadata = { title: "Bantuan", description: "Bantuan akun dan produk Grahito Labs.", alternates: { canonical: "/support" } };
const faqs = [
  { q: "Kapan Kalkulator Komisi Shopee tersedia?", a: "Ekstensi masih disiapkan. Tautan Chrome Web Store akan ditampilkan di halaman produk setelah publikasi resmi." },
  { q: "Apakah Kalkulator Komisi Shopee produk resmi Shopee?", a: "Tidak. Produk ini independen dan tidak berafiliasi, disponsori, disetujui, atau dikelola oleh Shopee." },
  { q: "Apakah cookie Shopee disimpan?", a: "Tidak. Nilai cookie autentikasi Shopee tidak disimpan oleh ekstensi dan tidak dikirim ke server Grahito Labs." },
  { q: "Bagaimana cara menghapus akun?", a: "Untuk saat ini, kirim permintaan melalui email dukungan dari alamat email akunmu. Proses final penghapusan akun akan dilengkapi sebelum produksi." },
];

export default function SupportPage() {
  return <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow="Pusat bantuan" title="Ada yang bisa kami bantu?" description="Temukan jawaban singkat atau hubungi kami untuk masalah akun dan produk." /><div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]"><aside className="rounded-[2rem] bg-ink p-7 text-white sm:p-9"><div className="grid size-12 place-items-center rounded-2xl bg-lime text-ink"><Mail className="size-5" /></div><h2 className="mt-8 text-2xl font-semibold tracking-tight">Hubungi dukungan</h2><p className="mt-3 text-sm leading-6 text-white/65">Sertakan email akun dan penjelasan singkat masalah. Jangan mengirim password atau nilai cookie.</p><ButtonLink href={supportHref("Bantuan Grahito Labs")} variant="secondary" className="mt-7 w-full">Kirim Email</ButtonLink><p className="mt-4 text-xs text-white/45">{siteConfig.supportEmail}</p></aside><div className="space-y-3">{faqs.map((faq, index) => <details key={faq.q} className="group rounded-2xl border border-line bg-white p-5 open:shadow-sm"><summary className="flex cursor-pointer list-none items-center gap-3 font-semibold text-ink"><span className="grid size-8 place-items-center rounded-full bg-paper text-xs text-muted">{index + 1}</span><span className="flex-1">{faq.q}</span><CircleHelp className="size-4 text-muted group-open:hidden" /><ShieldQuestion className="hidden size-4 text-lime-dark group-open:block" /></summary><p className="ml-11 mt-3 text-sm leading-6 text-muted">{faq.a}</p></details>)}</div></div></Container></section>;
}
