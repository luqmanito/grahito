import { BrandMark } from "@/components/brand-mark";

export function AuthForm({ title, description, children, footer }: { title: string; description: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <section className="px-5 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex justify-center"><BrandMark /></div>
        <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_24px_70px_rgba(25,25,20,.07)] sm:p-8">
          <div className="text-center"><h1 className="text-3xl font-semibold tracking-[-0.04em] text-ink">{title}</h1><p className="mt-3 text-sm leading-6 text-muted">{description}</p></div>
          <div className="mt-8">{children}</div>
        </div>
        {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
      </div>
    </section>
  );
}
