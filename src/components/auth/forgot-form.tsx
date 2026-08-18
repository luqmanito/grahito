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
import { createAuthSchemas, type ForgotValues } from "@/lib/validations/auth";
import { useDictionary, useLocale } from "@/components/locale-provider";

export function ForgotForm() {
  const locale = useLocale(); const dictionary = useDictionary();
  const [status, setStatus] = useState<{ tone: "error" | "success"; message: string } | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotValues>({ resolver: zodResolver(createAuthSchemas(locale).forgot), defaultValues: { email: "" } });
  async function onSubmit(values: ForgotValues) { setStatus(null); try { const { error } = await createClient().auth.resetPasswordForEmail(values.email, { redirectTo: absoluteUrl("/auth/callback?next=/reset-password") }); if (error) return setStatus({ tone: "error", message: authErrorMessage(error.message, locale) }); setStatus({ tone: "success", message: dictionary.auth.resetSent }); } catch { setStatus({ tone: "error", message: dictionary.auth.genericError }); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{status && <Alert tone={status.tone}>{status.message}</Alert>}<Field label={dictionary.auth.email} id="email" type="email" autoComplete="email" placeholder={dictionary.auth.emailPlaceholder} error={errors.email?.message} {...register("email")} /><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? dictionary.auth.sending : dictionary.auth.sendReset}</Button></form>;
}
