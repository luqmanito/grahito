import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Grahito Labs — Tools digital yang praktis", template: "%s | Grahito Labs" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "id_ID", url: "/", siteName: "Grahito Labs", title: "Grahito Labs — Tools digital yang praktis", description: siteConfig.description },
  twitter: { card: "summary_large_image", title: "Grahito Labs — Tools digital yang praktis", description: siteConfig.description },
  icons: { icon: "/icon.svg" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { themeColor: "#fbfbf7", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = { "@context": "https://schema.org", "@type": "Organization", name: "Grahito Labs", url: absoluteUrl(), description: siteConfig.description };
  return (
    <html lang="id">
      <body className="min-h-screen font-sans antialiased">
        <a href="#konten-utama" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white focus:translate-y-0">Lewati ke konten utama</a>
        <Header />
        <main id="konten-utama">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
