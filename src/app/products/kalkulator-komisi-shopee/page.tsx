import type { Metadata } from "next";
import { AlertTriangle, AppWindow, ArrowRight, CalendarRange, Check, CircleDollarSign, CloudOff, FileChartColumn, LockKeyhole, MousePointerClick, RefreshCw, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { absoluteUrl, supportHref } from "@/lib/site";

export const metadata: Metadata = { title: "Kalkulator Komisi Shopee", description: "Chrome Extension untuk membantu pengguna Shopee Affiliate menghitung dan melihat ringkasan komisi langsung dari browser.", alternates: { canonical: "/products/kalkulator-komisi-shopee" } };

const features = [
  { icon: CalendarRange, title: "Tanggal fleksibel", description: "Pilih satu tanggal atau rentang tanggal laporan yang ingin dihitung." },
  { icon: CircleDollarSign, title: "Ringkasan komisi", description: "Lihat estimasi total, total komisi, komisi kotor, dan komisi XTRA." },
  { icon: ShoppingBag, title: "Statistik pesanan", description: "Tinjau jumlah pesanan, produk, checkout, dan rincian status checkout." },
  { icon: RefreshCw, title: "Ganti sesi akun", description: "Hubungkan kembali sesi saat ingin menggunakan akun Shopee yang berbeda." },
  { icon: LockKeyhole, title: "Diproses di browser", description: "Kalkulasi berlangsung di dalam ekstensi, langsung pada browser pengguna." },
  { icon: CloudOff, title: "Tanpa instalasi tambahan", description: "Tidak membutuhkan Python, localhost, atau aplikasi desktop tambahan." },
];

const steps = ["Pasang ekstensi dari Chrome Web Store.", "Masuk ke akun Shopee Affiliate.", "Hubungkan sesi Shopee melalui tombol di ekstensi.", "Pilih tanggal laporan yang ingin dihitung.", "Ekstensi meminta laporan langsung dari Shopee dan menghitungnya di browser.", "Lihat hasil ringkasannya langsung di popup ekstensi."];

export default function ProductPage() {
  const storeUrl = process.env.NEXT_PUBLIC_CHROME_WEB_STORE_URL;
  const jsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Kalkulator Komisi Shopee", applicationCategory: "BrowserApplication", operatingSystem: "Chrome", description: metadata.description, url: absoluteUrl("/products/kalkulator-komisi-shopee"), offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" } };
  return (
    <>
      <section className="overflow-hidden border-b border-line bg-ink py-20 text-white sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70"><AppWindow className="size-4" />Chrome Extension <span className="text-orange">• Segera tersedia</span></div><h1 className="mt-7 text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Kalkulator Komisi Shopee</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Chrome Extension untuk membantu pengguna Shopee Affiliate menghitung dan melihat ringkasan komisi langsung dari browser.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row">{storeUrl ? <ButtonLink href={storeUrl} variant="orange" size="lg" target="_blank" rel="noopener noreferrer">Tersedia di Chrome Web Store <ArrowRight className="size-4" /></ButtonLink> : <span className="inline-flex h-14 items-center justify-center rounded-full bg-orange px-6 font-semibold text-white" aria-disabled="true">Segera Hadir</span>}<ButtonLink href="/products/kalkulator-komisi-shopee/privacy" variant="ghost" size="lg" className="border border-white/15 text-white hover:bg-white/10 hover:text-white">Lihat Kebijakan Privasi</ButtonLink></div></div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6"><div className="rounded-[1.4rem] bg-white p-6 text-ink"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-muted">Estimasi total komisi</p><p className="mt-2 text-3xl font-semibold">Rp —</p></div><div className="grid size-12 place-items-center rounded-2xl bg-orange-soft text-orange-dark"><FileChartColumn className="size-6" /></div></div><div className="mt-8 grid grid-cols-3 gap-3">{["Pesanan", "Produk", "Checkout"].map((item) => <div key={item} className="rounded-xl bg-paper p-3"><p className="text-[10px] text-muted">{item}</p><p className="mt-2 font-semibold">—</p></div>)}</div><div className="mt-5 flex items-center gap-2 rounded-xl border border-line p-3 text-xs text-muted"><span className="size-2 rounded-full bg-lime-dark" />Kalkulasi berjalan di browser</div></div></div>
        </Container>
      </section>

      <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow="Fitur" title="Informasi penting, tanpa proses manual yang berulang." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <FeatureCard key={feature.title} {...feature} accent />)}</div></Container></section>

      <section className="border-y border-line bg-paper py-20 sm:py-28"><Container className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><SectionHeading eyebrow="Cara kerja" title="Dari laporan ke ringkasan dalam enam langkah." description="Ekstensi bekerja pada browser yang sudah memiliki sesi Shopee Affiliate aktif." /><ol className="space-y-3">{steps.map((step, index) => <li key={step} className="flex gap-4 rounded-2xl border border-line bg-white p-5"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-lime">{index + 1}</span><p className="pt-1 text-sm leading-6 text-muted">{step}</p></li>)}</ol></Container></section>

      <section className="py-20 sm:py-28"><Container className="grid gap-10 lg:grid-cols-2"><div><SectionHeading eyebrow="Privasi produk" title="Sesi tetap berada di browsermu." description="Ekstensi mendeteksi sesi autentikasi Shopee yang sudah tersedia tanpa menyimpan nilai cookie atau mengirimkannya ke Grahito Labs." /><ul className="mt-8 space-y-4">{["Permintaan laporan dikirim langsung dari browser ke affiliate.shopee.co.id.", "Cookie Shopee tidak dijual atau dibagikan kepada pihak ketiga.", "Perhitungan komisi dilakukan di dalam ekstensi.", "Sinkronisasi ringkasan di masa depan hanya dilakukan setelah persetujuan pengguna."].map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted"><Check className="mt-0.5 size-5 shrink-0 text-lime-dark" />{item}</li>)}</ul></div><div className="space-y-4"><div className="rounded-3xl border border-orange/20 bg-orange-soft p-6"><div className="flex gap-3"><AlertTriangle className="mt-1 size-5 shrink-0 text-orange-dark" /><div><h3 className="font-semibold text-ink">Tentang estimasi</h3><p className="mt-2 text-sm leading-6 text-muted">Nilai yang ditampilkan merupakan estimasi berdasarkan data laporan yang tersedia dan dapat berubah setelah validasi, pembatalan pesanan, pajak, biaya layanan, atau penyesuaian lain oleh Shopee.</p></div></div></div><div className="rounded-3xl border border-line bg-white p-6"><h3 className="font-semibold text-ink">Produk independen</h3><p className="mt-2 text-sm leading-6 text-muted">Kalkulator Komisi Shopee adalah produk independen dan tidak berafiliasi, disponsori, disetujui, atau dikelola oleh Shopee. Shopee dan seluruh merek terkait merupakan milik pemegang hak masing-masing.</p></div><ButtonLink href={supportHref("Bantuan Kalkulator Komisi Shopee")} variant="secondary" className="w-full">Dapatkan Bantuan <MousePointerClick className="size-4" /></ButtonLink></div></Container></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
