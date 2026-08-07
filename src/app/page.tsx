import { ArrowRight, Boxes, EyeOff, Lightbulb, MousePointer2, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/lib/products";
import { supportHref } from "@/lib/site";

const values = [
  { icon: Sparkles, title: "Praktis", description: "Fokus pada hal yang benar-benar membantu menyelesaikan pekerjaan." },
  { icon: EyeOff, title: "Privasi diutamakan", description: "Data diproses seperlunya dan dijelaskan dengan bahasa yang mudah dipahami." },
  { icon: MousePointer2, title: "Mudah digunakan", description: "Antarmuka dibuat ringkas agar bisa digunakan tanpa kurva belajar yang rumit." },
  { icon: Lightbulb, title: "Berangkat dari kebutuhan", description: "Setiap produk dimulai dari masalah nyata, bukan sekadar menambah fitur." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line py-20 sm:py-28 lg:py-36">
        <div className="hero-grid absolute inset-0 -z-10" />
        <div className="absolute left-[8%] top-28 -z-10 size-60 rounded-full bg-lime/25 blur-3xl" />
        <Container className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-muted shadow-sm"><span className="size-2 rounded-full bg-lime-dark" />Studio produk digital independen</div>
            <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">Tools digital sederhana untuk pekerjaan yang lebih mudah.</h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted">Grahito Labs membangun aplikasi, ekstensi, dan tools praktis yang berawal dari masalah sehari-hari.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/products" size="lg">Lihat Produk <ArrowRight className="size-4" /></ButtonLink><ButtonLink href="#tentang" variant="secondary" size="lg">Tentang Grahito Labs</ButtonLink></div>
          </div>
          <HeroVisual />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Produk unggulan" title="Satu masalah, satu tool yang lebih ringkas." description="Produk pertama kami membantu kreator dan affiliate memahami laporan komisinya langsung dari browser." />
          <div className="mt-12"><ProductCard product={products[0]} featured /></div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Cara kami bekerja" title="Sederhana di permukaan, dipikirkan sampai detail." align="center" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map((value) => <FeatureCard key={value.title} {...value} />)}</div>
        </Container>
      </section>

      <section id="tentang" className="scroll-mt-24 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-ink text-lime"><Boxes className="size-7" /></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-dark">Tentang Grahito Labs</p><h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Mengubah ide sederhana menjadi tools yang benar-benar berguna.</h2><p className="mt-7 max-w-3xl text-lg leading-8 text-muted">Grahito Labs adalah studio produk digital independen. Kami membuat browser extension, aplikasi web, dan mobile app dengan fokus pada fungsi yang jelas, pengalaman yang ringan, serta keputusan produk yang bertanggung jawab.</p></div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="absolute -left-20 -top-20 size-64 rounded-full bg-lime/15 blur-3xl" /><div className="absolute -bottom-24 right-0 size-72 rounded-full bg-orange/15 blur-3xl" />
            <div className="relative"><p className="text-xs font-bold uppercase tracking-[0.18em] text-lime">Tetap terhubung</p><h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">Ikuti perkembangan produk kami</h2><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/65">Buat akun untuk menyiapkan akses ke produk Grahito Labs dan menerima informasi penting terkait akunmu.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><ButtonLink href="/register" variant="secondary" size="lg">Buat Akun</ButtonLink><ButtonLink href={supportHref("Halo Grahito Labs")} variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white">Hubungi Kami</ButtonLink></div></div>
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-label="Ilustrasi abstrak rangkaian produk digital">
      <div className="aspect-square rounded-[2.5rem] border border-line bg-white p-5 shadow-[0_40px_100px_rgba(25,25,20,.12)] sm:p-8">
        <div className="flex h-full flex-col rounded-[1.75rem] bg-ink p-5 sm:p-7">
          <div className="flex items-center justify-between"><div className="flex gap-1.5">{[0,1,2].map((item) => <span key={item} className="size-2 rounded-full bg-white/20" />)}</div><span className="rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">Labs</span></div>
          <div className="my-auto grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl bg-white p-5"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-muted">Produk digital</p><span className="size-2 rounded-full bg-lime-dark" /></div><div className="mt-8 h-3 w-3/4 rounded-full bg-paper" /><div className="mt-3 h-3 w-1/2 rounded-full bg-paper" /></div>
            <div className="rounded-2xl bg-lime p-4"><p className="text-xs font-semibold">Browser<br />extension</p><ArrowRight className="mt-8 size-5" /></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white"><p className="text-xs font-semibold">Mobile<br />app</p><div className="mt-8 flex gap-1"><span className="h-5 w-1 rounded-full bg-orange"/><span className="h-8 w-1 rounded-full bg-white/40"/><span className="h-3 w-1 rounded-full bg-white/20"/></div></div>
          </div>
          <p className="text-xs text-white/40">Dibuat dari kebutuhan sehari-hari.</p>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-white p-4 shadow-xl motion-safe:animate-[bounce_4s_ease-in-out_infinite]"><Sparkles className="size-6 text-orange" /></div>
    </div>
  );
}
