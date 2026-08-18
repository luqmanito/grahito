import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/server";

export async function Footer() {
  const dictionary = await getDictionary();
  const year = new Date().getFullYear();
  const footerLinks = [
    { title: dictionary.footer.products, links: [{ label: dictionary.footer.allProducts, href: "/products" }, { label: "Kalkulator Komisi Shopee", href: "/products/kalkulator-komisi-shopee" }] },
    { title: dictionary.footer.support, links: [{ label: dictionary.footer.helpCenter, href: "/support" }, { label: dictionary.nav.login, href: "/login" }, { label: dictionary.nav.register, href: "/register" }] },
    { title: dictionary.footer.legal, links: [{ label: dictionary.footer.privacy, href: "/privacy" }, { label: dictionary.footer.terms, href: "/terms" }, { label: dictionary.footer.extensionPrivacy, href: "/products/kalkulator-komisi-shopee/privacy" }] },
  ];
  return (
    <footer className="border-t border-line bg-white py-14 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          <div><BrandMark /><p className="mt-5 max-w-sm text-sm leading-6 text-muted">{dictionary.footer.description}</p><p className="mt-5 text-sm text-muted">{dictionary.footer.contact}: {siteConfig.supportEmail}</p></div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{footerLinks.map((group) => <div key={group.title}><h2 className="text-sm font-semibold text-ink">{group.title}</h2><ul className="mt-4 space-y-3">{group.links.map((link) => <li key={link.href}><Link className="text-sm text-muted hover:text-ink" href={link.href}>{link.label}</Link></li>)}</ul></div>)}</div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Grahito Labs. {dictionary.footer.copyright}</p>
          <p className="max-w-xl sm:text-right">{dictionary.footer.independence}</p>
        </div>
      </Container>
    </footer>
  );
}
