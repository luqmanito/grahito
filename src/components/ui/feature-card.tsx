import type { LucideIcon } from "lucide-react";

export function FeatureCard({ icon: Icon, title, description, accent = false }: { icon: LucideIcon; title: string; description: string; accent?: boolean }) {
  return (
    <article className="group rounded-[1.75rem] border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_60px_rgba(23,24,20,.08)] motion-reduce:transform-none">
      <div className={`mb-8 flex size-11 items-center justify-center rounded-xl ${accent ? "bg-orange-soft text-orange-dark" : "bg-lime-soft text-lime-dark"}`}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
