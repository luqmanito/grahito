"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/auth/field";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authErrorMessage } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";
import { createAuthSchemas, type ResetValues } from "@/lib/validations/auth";
import { useDictionary, useLocale } from "@/components/locale-provider";

export function ResetForm() {
  const router = useRouter(); const [error, setError] = useState("");
  const locale = useLocale(); const dictionary = useDictionary();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetValues>({ resolver: zodResolver(createAuthSchemas(locale).reset), defaultValues: { password: "", confirmPassword: "" } });
  async function onSubmit(values: ResetValues) { setError(""); try { const { error } = await createClient().auth.updateUser({ password: values.password }); if (error) return setError(authErrorMessage(error.message, locale)); router.push("/account?password=updated"); router.refresh(); } catch { setError(dictionary.auth.genericError); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{error && <Alert>{error}</Alert>}<Field label={dictionary.auth.newPassword} id="password" type="password" autoComplete="new-password" placeholder={dictionary.auth.newPasswordPlaceholder} error={errors.password?.message} {...register("password")} /><Field label={dictionary.auth.confirmPassword} id="confirmPassword" type="password" autoComplete="new-password" placeholder={dictionary.auth.confirmPlaceholder} error={errors.confirmPassword?.message} {...register("confirmPassword")} /><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? dictionary.auth.saving : dictionary.auth.savePassword}</Button></form>;
}
