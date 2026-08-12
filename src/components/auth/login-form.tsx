"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/auth/field";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authErrorMessage } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter(); const params = useSearchParams(); const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  async function onSubmit(values: LoginValues) { setError(""); try { const { error } = await createClient().auth.signInWithPassword(values); if (error) return setError(authErrorMessage(error.message)); router.push(params.get("next") || "/account"); router.refresh(); } catch (caught) { setError(caught instanceof Error ? caught.message : "Terjadi kendala. Silakan coba lagi."); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{params.get("verified") === "true" && <Alert tone="success">Akun berhasil diaktifkan. Silakan masuk.</Alert>}{error && <Alert>{error}</Alert>}<Field label="Email" id="email" type="email" autoComplete="email" placeholder="nama@email.com" error={errors.email?.message} {...register("email")} /><div><Field label="Password" id="password" type="password" autoComplete="current-password" placeholder="Masukkan password" error={errors.password?.message} {...register("password")} /><div className="mt-2 text-right"><Link href="/forgot-password" className="text-xs font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">Lupa password?</Link></div></div><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sedang masuk…" : "Masuk"}</Button></form>;
}
