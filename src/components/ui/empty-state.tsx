import { PackageOpen } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-paper/60 px-6 py-12 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-muted shadow-sm"><PackageOpen className="size-5" /></div>
      <h3 className="mt-5 font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
