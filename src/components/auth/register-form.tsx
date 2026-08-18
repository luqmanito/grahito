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
import { createAuthSchemas, type RegisterValues } from "@/lib/validations/auth";
import { useDictionary, useLocale } from "@/components/locale-provider";

export function RegisterForm() {
  const router = useRouter(); const [error, setError] = useState("");
  const locale = useLocale(); const dictionary = useDictionary();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({ resolver: zodResolver(createAuthSchemas(locale).register), defaultValues: { displayName: "", email: "", password: "", confirmPassword: "", consent: false as true } });
  async function onSubmit(values: RegisterValues) { setError(""); try { const { error } = await createClient().auth.signUp({ email: values.email, password: values.password, options: { data: { display_name: values.displayName }, emailRedirectTo: absoluteUrl("/auth/callback?next=/verify-email") } }); if (error) return setError(authErrorMessage(error.message, locale)); router.push(`/verify-email?email=${encodeURIComponent(values.email)}`); } catch { setError(dictionary.auth.genericError); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{error && <Alert>{error}</Alert>}<Field label={dictionary.auth.name} id="displayName" type="text" autoComplete="name" placeholder={dictionary.auth.namePlaceholder} error={errors.displayName?.message} {...register("displayName")} /><Field label={dictionary.auth.email} id="email" type="email" autoComplete="email" placeholder={dictionary.auth.emailPlaceholder} error={errors.email?.message} {...register("email")} /><Field label={dictionary.auth.password} id="password" type="password" autoComplete="new-password" placeholder={dictionary.auth.newPasswordPlaceholder} error={errors.password?.message} {...register("password")} /><Field label={dictionary.auth.confirmPassword} id="confirmPassword" type="password" autoComplete="new-password" placeholder={dictionary.auth.confirmPlaceholder} error={errors.confirmPassword?.message} {...register("confirmPassword")} /><label className="flex items-start gap-3 text-xs leading-5 text-muted"><input type="checkbox" className="mt-1 size-4 rounded border-line accent-black" {...register("consent")} /><span>{dictionary.auth.consentPrefix} <Link href="/terms" className="font-semibold text-ink underline">{dictionary.auth.terms}</Link> {dictionary.auth.and} <Link href="/privacy" className="font-semibold text-ink underline">{dictionary.auth.privacy}</Link>.</span></label>{errors.consent && <p className="text-xs text-red-700">{errors.consent.message}</p>}<Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? dictionary.auth.creating : dictionary.auth.registerMeta}</Button></form>;
}
