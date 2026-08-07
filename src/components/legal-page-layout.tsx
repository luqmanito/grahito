import { Container } from "@/components/ui/container";

export function LegalPageLayout({ eyebrow = "Informasi legal", title, description, effectiveDate = "TODO: TANGGAL EFEKTIF", children }: { eyebrow?: string; title: string; description: string; effectiveDate?: string; children: React.ReactNode }) {
  return (
    <section className="py-16 sm:py-24"><Container className="max-w-4xl"><header className="border-b border-line pb-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-dark">{eyebrow}</p><h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted">{description}</p><p className="mt-5 text-xs font-semibold text-muted">Berlaku efektif: {effectiveDate}</p></header><article className="legal-content">{children}</article></Container></section>
  );
}
