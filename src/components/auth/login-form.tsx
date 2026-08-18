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
import { createAuthSchemas, type LoginValues } from "@/lib/validations/auth";
import { useDictionary, useLocale } from "@/components/locale-provider";

export function LoginForm() {
  const router = useRouter(); const params = useSearchParams(); const [error, setError] = useState("");
  const locale = useLocale(); const dictionary = useDictionary();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(createAuthSchemas(locale).login), defaultValues: { email: "", password: "" } });
  async function onSubmit(values: LoginValues) { setError(""); try { const { error } = await createClient().auth.signInWithPassword(values); if (error) return setError(authErrorMessage(error.message, locale)); const requestedNext = params.get("next"); const safeNext = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/account"; router.push(safeNext); router.refresh(); } catch { setError(dictionary.auth.genericError); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{params.get("verified") === "true" && <Alert tone="success">{dictionary.auth.verified}</Alert>}{error && <Alert>{error}</Alert>}<Field label={dictionary.auth.email} id="email" type="email" autoComplete="email" placeholder={dictionary.auth.emailPlaceholder} error={errors.email?.message} {...register("email")} /><div><Field label={dictionary.auth.password} id="password" type="password" autoComplete="current-password" placeholder={dictionary.auth.passwordPlaceholder} error={errors.password?.message} {...register("password")} /><div className="mt-2 text-right"><Link href="/forgot-password" className="text-xs font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">{dictionary.auth.forgotPassword}</Link></div></div><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? dictionary.auth.loggingIn : dictionary.auth.login}</Button></form>;
}
