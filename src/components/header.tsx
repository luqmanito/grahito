import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { MobileMenu } from "@/components/mobile-menu";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#fbfbf7]/90 backdrop-blur-xl">
      <Container className="relative flex h-[72px] items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-white hover:text-ink" href="/products">Produk</Link>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-white hover:text-ink" href="/#tentang">Tentang</Link>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-white hover:text-ink" href="/support">Bantuan</Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex"><ButtonLink href="/login" variant="ghost" size="sm">Masuk</ButtonLink><ButtonLink href="/register" size="sm">Buat Akun</ButtonLink></div>
        <MobileMenu />
      </Container>
    </header>
  );
}
