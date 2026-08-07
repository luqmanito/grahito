import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { title: "Produk", links: [{ label: "Semua produk", href: "/products" }, { label: "Kalkulator Komisi Shopee", href: "/products/kalkulator-komisi-shopee" }] },
  { title: "Dukungan", links: [{ label: "Pusat bantuan", href: "/support" }, { label: "Masuk", href: "/login" }, { label: "Buat akun", href: "/register" }] },
  { title: "Legal", links: [{ label: "Kebijakan privasi", href: "/privacy" }, { label: "Syarat & ketentuan", href: "/terms" }, { label: "Privasi ekstensi", href: "/products/kalkulator-komisi-shopee/privacy" }] },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white py-14 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          <div><BrandMark /><p className="mt-5 max-w-sm text-sm leading-6 text-muted">Tools digital sederhana yang membantu menyelesaikan pekerjaan sehari-hari dengan lebih mudah.</p><p className="mt-5 text-sm text-muted">Kontak: {siteConfig.supportEmail}</p></div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{footerLinks.map((group) => <div key={group.title}><h2 className="text-sm font-semibold text-ink">{group.title}</h2><ul className="mt-4 space-y-3">{group.links.map((link) => <li key={link.href}><Link className="text-sm text-muted hover:text-ink" href={link.href}>{link.label}</Link></li>)}</ul></div>)}</div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Grahito Labs. Hak cipta dilindungi.</p>
          <p className="max-w-xl sm:text-right">Grahito Labs adalah studio independen. Nama dan merek pihak ketiga merupakan milik pemegang hak masing-masing.</p>
        </div>
      </Container>
    </footer>
  );
}
