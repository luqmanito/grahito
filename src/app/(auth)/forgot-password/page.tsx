import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { ForgotForm } from "@/components/auth/forgot-form";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const dictionary = await getDictionary(); return { title: dictionary.auth.forgotMeta, robots: { index: false, follow: false } }; }
export default async function ForgotPasswordPage() { const dictionary = await getDictionary(); return <AuthForm title={dictionary.auth.forgotTitle} description={dictionary.auth.forgotDescription} footer={<Link href="/login" className="font-semibold text-ink hover:underline">{dictionary.auth.backToLogin}</Link>}><ForgotForm /></AuthForm>; }
