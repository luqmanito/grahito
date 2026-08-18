import type { Metadata } from "next";
import { CircleHelp, Mail, ShieldQuestion } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, supportHref } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const dictionary = await getDictionary(); return { title: dictionary.support.metaTitle, description: dictionary.support.metaDescription, alternates: { canonical: "/support" } }; }

export default async function SupportPage() {
  const dictionary = await getDictionary();
  return <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow={dictionary.support.eyebrow} title={dictionary.support.title} description={dictionary.support.description} /><div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]"><aside className="rounded-[2rem] bg-ink p-7 text-white sm:p-9"><div className="grid size-12 place-items-center rounded-2xl bg-lime text-ink"><Mail className="size-5" /></div><h2 className="mt-8 text-2xl font-semibold tracking-tight">{dictionary.support.contact}</h2><p className="mt-3 text-sm leading-6 text-white/65">{dictionary.support.contactDescription}</p><ButtonLink href={supportHref(dictionary.support.subject)} variant="secondary" className="mt-7 w-full">{dictionary.support.email}</ButtonLink><p className="mt-4 text-xs text-white/45">{siteConfig.supportEmail}</p></aside><div className="space-y-3">{dictionary.support.faqs.map((faq, index) => <details key={faq.q} className="group rounded-2xl border border-line bg-white p-5 open:shadow-sm"><summary className="flex cursor-pointer list-none items-center gap-3 font-semibold text-ink"><span className="grid size-8 place-items-center rounded-full bg-paper text-xs text-muted">{index + 1}</span><span className="flex-1">{faq.q}</span><CircleHelp className="size-4 text-muted group-open:hidden" /><ShieldQuestion className="hidden size-4 text-lime-dark group-open:block" /></summary><p className="ml-11 mt-3 text-sm leading-6 text-muted">{faq.a}</p></details>)}</div></div></Container></section>;
}
