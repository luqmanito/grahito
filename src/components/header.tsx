import Link from "next/link";
import { AuthNavigation } from "@/components/auth-navigation";
import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/server";

export async function Header() {
  const dictionary = await getDictionary();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#fbfbf7]/90 backdrop-blur-xl">
      <Container className="relative flex h-[72px] items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-1 md:flex" aria-label={dictionary.nav.main}>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-white hover:text-ink" href="/products">{dictionary.nav.products}</Link>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-white hover:text-ink" href="/#about">{dictionary.nav.about}</Link>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-white hover:text-ink" href="/support">{dictionary.nav.support}</Link>
        </nav>
        <div className="flex items-center gap-2"><LanguageSwitcher /><AuthNavigation /></div>
      </Container>
    </header>
  );
}
