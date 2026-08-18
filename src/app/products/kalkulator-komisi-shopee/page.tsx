import type { Metadata } from "next";
import { AlertTriangle, AppWindow, ArrowRight, CalendarRange, Check, CircleDollarSign, CloudOff, FileChartColumn, LockKeyhole, MousePointerClick, RefreshCw, ShoppingBag } from "lucide-react";
import { ConnectProductCard } from "@/components/products/connect-product-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { absoluteUrl, supportHref } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary();
  return { title: "Kalkulator Komisi Shopee", description: dictionary.productDetail.metaDescription, alternates: { canonical: "/products/kalkulator-komisi-shopee" } };
}

export default async function ProductPage() {
  const dictionary = await getDictionary();
  const featureIcons = [CalendarRange, CircleDollarSign, ShoppingBag, RefreshCw, LockKeyhole, CloudOff];
  const features = dictionary.productDetail.features.map((feature, index) => ({ ...feature, icon: featureIcons[index] }));
  const storeUrl = process.env.NEXT_PUBLIC_CHROME_WEB_STORE_URL;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: product } = await supabase.from("products").select("id").eq("slug", "kalkulator-komisi-shopee").in("status", ["active", "beta"]).maybeSingle();
  const { data: linkedProduct } = user && product
    ? await supabase.from("user_products").select("id").eq("user_id", user.id).eq("product_id", product.id).maybeSingle()
    : { data: null };
  const jsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Kalkulator Komisi Shopee", applicationCategory: "BrowserApplication", operatingSystem: "Chrome", description: dictionary.productDetail.metaDescription, url: absoluteUrl("/products/kalkulator-komisi-shopee"), offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" } };
  return (
    <>
      <section className="overflow-hidden border-b border-line bg-ink py-20 text-white sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70"><AppWindow className="size-4" />Chrome Extension <span className="text-lime">• {dictionary.common.available}</span></div><h1 className="mt-7 text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Kalkulator Komisi Shopee</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{dictionary.productDetail.metaDescription}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row">{storeUrl ? <ButtonLink href={storeUrl} variant="orange" size="lg" target="_blank" rel="noopener noreferrer">{dictionary.productDetail.storeAvailable} <ArrowRight className="size-4" /></ButtonLink> : <span className="inline-flex h-14 items-center justify-center rounded-full bg-orange px-6 font-semibold text-white" aria-disabled="true">{dictionary.productDetail.storeUnavailable}</span>}<ButtonLink href="/products/kalkulator-komisi-shopee/privacy" variant="ghost" size="lg" className="border border-white/15 text-white hover:bg-white/10 hover:text-white">{dictionary.productDetail.viewPrivacy}</ButtonLink></div></div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6"><div className="rounded-[1.4rem] bg-white p-6 text-ink"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-muted">{dictionary.productDetail.estimatedTotal}</p><p className="mt-2 text-3xl font-semibold">Rp —</p></div><div className="grid size-12 place-items-center rounded-2xl bg-orange-soft text-orange-dark"><FileChartColumn className="size-6" /></div></div><div className="mt-8 grid grid-cols-3 gap-3">{dictionary.productDetail.stats.map((item) => <div key={item} className="rounded-xl bg-paper p-3"><p className="text-[10px] text-muted">{item}</p><p className="mt-2 font-semibold">—</p></div>)}</div><div className="mt-5 flex items-center gap-2 rounded-xl border border-line p-3 text-xs text-muted"><span className="size-2 rounded-full bg-lime-dark" />{dictionary.productDetail.browserCalculation}</div></div></div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-8">
        <Container>
          <ConnectProductCard authenticated={Boolean(user)} available={Boolean(product)} connected={Boolean(linkedProduct)} />
        </Container>
      </section>

      <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow={dictionary.productDetail.featuresEyebrow} title={dictionary.productDetail.featuresTitle} /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <FeatureCard key={feature.title} {...feature} accent />)}</div></Container></section>

      <section className="border-y border-line bg-paper py-20 sm:py-28"><Container className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><SectionHeading eyebrow={dictionary.productDetail.howEyebrow} title={dictionary.productDetail.howTitle} description={dictionary.productDetail.howDescription} /><ol className="space-y-3">{dictionary.productDetail.steps.map((step, index) => <li key={step} className="flex gap-4 rounded-2xl border border-line bg-white p-5"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-lime">{index + 1}</span><p className="pt-1 text-sm leading-6 text-muted">{step}</p></li>)}</ol></Container></section>

      <section className="py-20 sm:py-28"><Container className="grid gap-10 lg:grid-cols-2"><div><SectionHeading eyebrow={dictionary.productDetail.privacyEyebrow} title={dictionary.productDetail.privacyTitle} description={dictionary.productDetail.privacyDescription} /><ul className="mt-8 space-y-4">{dictionary.productDetail.privacyPoints.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted"><Check className="mt-0.5 size-5 shrink-0 text-lime-dark" />{item}</li>)}</ul></div><div className="space-y-4"><div className="rounded-3xl border border-orange/20 bg-orange-soft p-6"><div className="flex gap-3"><AlertTriangle className="mt-1 size-5 shrink-0 text-orange-dark" /><div><h3 className="font-semibold text-ink">{dictionary.productDetail.estimationTitle}</h3><p className="mt-2 text-sm leading-6 text-muted">{dictionary.productDetail.estimationDescription}</p></div></div></div><div className="rounded-3xl border border-line bg-white p-6"><h3 className="font-semibold text-ink">{dictionary.productDetail.independentTitle}</h3><p className="mt-2 text-sm leading-6 text-muted">{dictionary.productDetail.independentDescription}</p></div><ButtonLink href={supportHref(dictionary.productDetail.helpSubject)} variant="secondary" className="w-full">{dictionary.productDetail.getHelp} <MousePointerClick className="size-4" /></ButtonLink></div></Container></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
