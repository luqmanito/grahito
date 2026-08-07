import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { ResetForm } from "@/components/auth/reset-form";

export const metadata: Metadata = { title: "Atur Password Baru", robots: { index: false, follow: false } };
export default function ResetPasswordPage() { return <AuthForm title="Buat password baru" description="Gunakan minimal 8 karakter dan pilih password yang tidak digunakan di tempat lain."><ResetForm /></AuthForm>; }
