import type { Metadata } from "next";
import Link from "next/link";
import { CircleAlert, MailCheck } from "lucide-react";
import { ActivationSuccess } from "@/components/auth/activation-success";
import { AuthForm } from "@/components/auth/auth-form";
import { ButtonLink } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const dictionary = await getDictionary(); return { title: dictionary.auth.verifyMeta, robots: { index: false, follow: false } }; }

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const dictionary = await getDictionary();

  if (status === "activated") {
    return (
      <AuthForm title={dictionary.auth.activatedTitle} description={dictionary.auth.activatedDescription}>
        <ActivationSuccess />
      </AuthForm>
    );
  }

  if (status === "error") {
    return (
      <AuthForm title={dictionary.auth.invalidLinkTitle} description={dictionary.auth.invalidLinkDescription}>
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-orange-soft text-orange-dark"><CircleAlert className="size-7" /></div>
          <p className="mt-5 text-sm leading-6 text-muted">{dictionary.auth.invalidLinkBody}</p>
          <ButtonLink href="/login" className="mt-6 w-full">{dictionary.auth.backToLoginPage}</ButtonLink>
          <ButtonLink href="/register" variant="ghost" className="mt-2 w-full">{dictionary.auth.registerAgain}</ButtonLink>
        </div>
      </AuthForm>
    );
  }

  return (
    <AuthForm title={dictionary.auth.checkEmailTitle} description={dictionary.auth.checkEmailDescription}>
      <div className="text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-lime-soft text-lime-dark"><MailCheck className="size-7" /></div>
        <p className="mt-5 text-sm leading-6 text-muted">{dictionary.auth.checkEmailBody}</p>
        <ButtonLink href="/login" className="mt-6 w-full">{dictionary.auth.continueToLogin}</ButtonLink>
        <p className="mt-4 text-xs text-muted">{dictionary.auth.wrongEmail} <Link href="/register" className="font-semibold text-ink underline">{dictionary.auth.registerAgain}</Link>.</p>
      </div>
    </AuthForm>
  );
}
