import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4" aria-label="Grahito Labs — Beranda">
      <span className="grid size-9 place-items-center rounded-xl bg-ink text-sm font-bold text-lime transition-transform group-hover:-rotate-3">G</span>
      {!compact && <span className="text-sm font-bold tracking-[-0.02em] text-ink">Grahito Labs</span>}
    </Link>
  );
}
