import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/server";

export default async function NotFound() { const dictionary = await getDictionary(); return <section className="py-28 text-center"><Container><p className="text-sm font-bold text-lime-dark">404</p><h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{dictionary.notFound.title}</h1><p className="mt-4 text-muted">{dictionary.notFound.description}</p><ButtonLink href="/" className="mt-8">{dictionary.notFound.home}</ButtonLink></Container></section>; }
