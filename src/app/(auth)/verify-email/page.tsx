import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Verifikasi Email", robots: { index: false, follow: false } };
export default function VerifyEmailPage() { return <AuthForm title="Periksa emailmu" description="Kami mengirim tautan verifikasi jika alamat email dapat didaftarkan."><div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-lime-soft text-lime-dark"><MailCheck className="size-7" /></div><p className="mt-5 text-sm leading-6 text-muted">Buka tautan di email untuk mengaktifkan akun. Periksa folder spam jika email belum terlihat.</p><ButtonLink href="/login" className="mt-6 w-full">Lanjut ke Halaman Masuk</ButtonLink><p className="mt-4 text-xs text-muted">Salah memasukkan email? <Link href="/register" className="font-semibold text-ink underline">Daftar kembali</Link>.</p></div></AuthForm>; }
