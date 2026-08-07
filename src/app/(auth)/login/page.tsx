import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Masuk", description: "Masuk ke akun Grahito Labs.", robots: { index: false, follow: false } };
export default function LoginPage() { return <AuthForm title="Selamat datang kembali" description="Masuk untuk mengelola akun dan produk Grahito Labs." footer={<>Belum punya akun? <Link href="/register" className="font-semibold text-ink hover:underline">Buat akun</Link></>}><Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-paper" />}><LoginForm /></Suspense></AuthForm>; }
