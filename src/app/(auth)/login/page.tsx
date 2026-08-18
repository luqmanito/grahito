import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { LoginForm } from "@/components/auth/login-form";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const dictionary = await getDictionary(); return { title: dictionary.auth.loginMeta, description: dictionary.auth.loginMetaDescription, robots: { index: false, follow: false } }; }
export default async function LoginPage() { const dictionary = await getDictionary(); return <AuthForm title={dictionary.auth.loginTitle} description={dictionary.auth.loginDescription} footer={<>{dictionary.auth.noAccount} <Link href="/register" className="font-semibold text-ink hover:underline">{dictionary.auth.createAccount}</Link></>}><Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-paper" />}><LoginForm /></Suspense></AuthForm>; }
