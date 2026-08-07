import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-lime-dark">{eyebrow}</p>}
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
