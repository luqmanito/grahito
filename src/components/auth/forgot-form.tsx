"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/auth/field";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authErrorMessage } from "@/lib/auth-errors";
import { absoluteUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import { forgotSchema, type ForgotValues } from "@/lib/validations/auth";

export function ForgotForm() {
  const [status, setStatus] = useState<{ tone: "error" | "success"; message: string } | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema), defaultValues: { email: "" } });
  async function onSubmit(values: ForgotValues) { setStatus(null); try { const { error } = await createClient().auth.resetPasswordForEmail(values.email, { redirectTo: absoluteUrl("/auth/callback?next=/reset-password") }); if (error) return setStatus({ tone: "error", message: authErrorMessage(error.message) }); setStatus({ tone: "success", message: "Jika email terdaftar, tautan reset password akan segera dikirim." }); } catch (caught) { setStatus({ tone: "error", message: caught instanceof Error ? caught.message : "Terjadi kendala. Silakan coba lagi." }); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{status && <Alert tone={status.tone}>{status.message}</Alert>}<Field label="Email" id="email" type="email" autoComplete="email" placeholder="nama@email.com" error={errors.email?.message} {...register("email")} /><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Mengirim…" : "Kirim Tautan Reset"}</Button></form>;
}
