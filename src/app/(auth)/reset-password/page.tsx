import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { ResetForm } from "@/components/auth/reset-form";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const dictionary = await getDictionary(); return { title: dictionary.auth.resetMeta, robots: { index: false, follow: false } }; }
export default async function ResetPasswordPage() { const dictionary = await getDictionary(); return <AuthForm title={dictionary.auth.resetTitle} description={dictionary.auth.resetDescription}><ResetForm /></AuthForm>; }
