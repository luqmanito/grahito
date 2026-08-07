"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/auth/field";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authErrorMessage } from "@/lib/auth-errors";
import { absoluteUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";

export function RegisterForm() {
  const router = useRouter(); const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema), defaultValues: { displayName: "", email: "", password: "", confirmPassword: "", consent: false as true } });
  async function onSubmit(values: RegisterValues) { setError(""); try { const { error } = await createClient().auth.signUp({ email: values.email, password: values.password, options: { data: { display_name: values.displayName }, emailRedirectTo: absoluteUrl("/auth/callback?next=/verify-email") } }); if (error) return setError(authErrorMessage(error.message)); router.push(`/verify-email?email=${encodeURIComponent(values.email)}`); } catch (caught) { setError(caught instanceof Error ? caught.message : "Terjadi kendala. Silakan coba lagi."); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{error && <Alert>{error}</Alert>}<Field label="Nama" id="displayName" type="text" autoComplete="name" placeholder="Nama kamu" error={errors.displayName?.message} {...register("displayName")} /><Field label="Email" id="email" type="email" autoComplete="email" placeholder="nama@email.com" error={errors.email?.message} {...register("email")} /><Field label="Password" id="password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" error={errors.password?.message} {...register("password")} /><Field label="Konfirmasi password" id="confirmPassword" type="password" autoComplete="new-password" placeholder="Ulangi password" error={errors.confirmPassword?.message} {...register("confirmPassword")} /><label className="flex items-start gap-3 text-xs leading-5 text-muted"><input type="checkbox" className="mt-1 size-4 rounded border-line accent-black" {...register("consent")} /><span>Saya menyetujui <Link href="/terms" className="font-semibold text-ink underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="font-semibold text-ink underline">Kebijakan Privasi</Link>.</span></label>{errors.consent && <p className="text-xs text-red-700">{errors.consent.message}</p>}<Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Membuat akun…" : "Buat Akun"}</Button></form>;
}
