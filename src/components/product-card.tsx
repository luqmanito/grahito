import { AppWindow, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { getDictionary } from "@/lib/i18n/server";

export async function ProductCard({ product, featured = false, action }: { product: Product; featured?: boolean; action?: ReactNode }) {
  const dictionary = await getDictionary();
  const status = dictionary.common[product.status];
  return (
    <article className={`overflow-hidden rounded-[2rem] border border-line bg-white ${featured ? "grid lg:grid-cols-[1.05fr_.95fr]" : ""}`}>
      <div className="p-7 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
          <span className="inline-flex items-center gap-2 text-muted"><AppWindow className="size-4" />{product.type}</span>
          <span className={`rounded-full px-3 py-1.5 ${product.status === "available" ? "bg-lime-soft text-lime-dark" : "bg-orange-soft text-orange-dark"}`}>{status}</span>
        </div>
        <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">{product.name}</h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">{product.description}</p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {action}
          <ButtonLink href={product.href} variant="secondary">{dictionary.product.learnMore} <ArrowUpRight className="size-4" /></ButtonLink>
        </div>
      </div>
      {featured && <ProductPreview />}
    </article>
  );
}

async function ProductPreview() {
  const dictionary = await getDictionary();
  return (
    <div className="relative min-h-80 overflow-hidden bg-[#191914] p-6 sm:p-10" aria-label={dictionary.product.previewLabel}>
      <div className="absolute -right-16 -top-16 size-56 rounded-full bg-orange/25 blur-3xl" />
      <div className="absolute -bottom-24 left-0 size-64 rounded-full bg-lime/20 blur-3xl" />
      <div className="relative mx-auto max-w-sm rounded-[1.6rem] border border-white/10 bg-[#26261f] p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div><p className="text-xs text-white/50">{dictionary.product.commissionSummary}</p><p className="mt-1 text-sm font-semibold text-white">{dictionary.product.previewDate}</p></div>
          <div className="flex size-9 items-center justify-center rounded-xl bg-orange text-sm font-bold text-white">K</div>
        </div>
        <div className="mt-5 rounded-2xl bg-white p-5">
          <p className="text-xs font-medium text-muted">{dictionary.product.estimatedCommission}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">Rp —</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-paper"><div className="h-full w-2/3 rounded-full bg-orange" /></div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[dictionary.product.orders, dictionary.product.checkout].map((label) => <div key={label} className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/50">{label}</p><p className="mt-2 text-xl font-semibold text-white">—</p></div>)}
        </div>
      </div>
    </div>
  );
}
