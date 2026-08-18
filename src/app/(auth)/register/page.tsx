import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { RegisterForm } from "@/components/auth/register-form";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const dictionary = await getDictionary(); return { title: dictionary.auth.registerMeta, description: dictionary.auth.registerMetaDescription, robots: { index: false, follow: false } }; }
export default async function RegisterPage() { const dictionary = await getDictionary(); return <AuthForm title={dictionary.auth.registerTitle} description={dictionary.auth.registerDescription} footer={<>{dictionary.auth.haveAccount} <Link href="/login" className="font-semibold text-ink hover:underline">{dictionary.auth.login}</Link></>}><RegisterForm /></AuthForm>; }
