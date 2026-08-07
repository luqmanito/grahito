import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Buat Akun", description: "Daftar akun Grahito Labs.", robots: { index: false, follow: false } };
export default function RegisterPage() { return <AuthForm title="Buat akun" description="Satu akun untuk mengakses produk Grahito Labs sekarang dan nanti." footer={<>Sudah punya akun? <Link href="/login" className="font-semibold text-ink hover:underline">Masuk</Link></>}><RegisterForm /></AuthForm>; }
