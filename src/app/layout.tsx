import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocaleProvider } from "@/components/locale-provider";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dictionary] = await Promise.all([getLocale(), getDictionary()]);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dictionary.site.title, template: "%s | Grahito Labs" },
    description: dictionary.site.description,
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: locale === "en" ? "en_US" : "id_ID", url: "/", siteName: "Grahito Labs", title: dictionary.site.title, description: dictionary.site.description },
    twitter: { card: "summary_large_image", title: dictionary.site.title, description: dictionary.site.description },
    icons: { icon: "/icon.svg" },
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = { themeColor: "#fbfbf7", colorScheme: "light" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, dictionary] = await Promise.all([getLocale(), getDictionary()]);
  const organizationJsonLd = { "@context": "https://schema.org", "@type": "Organization", name: "Grahito Labs", url: absoluteUrl(), description: dictionary.site.description };
  return (
    <html lang={locale}>
      <body className="min-h-screen font-sans antialiased">
        <LocaleProvider locale={locale}>
          <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white focus:translate-y-0">{dictionary.site.skip}</a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        </LocaleProvider>
      </body>
    </html>
  );
}
