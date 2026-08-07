import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { ForgotForm } from "@/components/auth/forgot-form";

export const metadata: Metadata = { title: "Lupa Password", robots: { index: false, follow: false } };
export default function ForgotPasswordPage() { return <AuthForm title="Reset password" description="Masukkan email akunmu. Kami akan mengirim tautan untuk membuat password baru." footer={<Link href="/login" className="font-semibold text-ink hover:underline">Kembali ke halaman masuk</Link>}><ForgotForm /></AuthForm>; }
