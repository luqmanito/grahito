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
import { resetSchema, type ResetValues } from "@/lib/validations/auth";

export function ResetForm() {
  const router = useRouter(); const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetValues>({ resolver: zodResolver(resetSchema), defaultValues: { password: "", confirmPassword: "" } });
  async function onSubmit(values: ResetValues) { setError(""); try { const { error } = await createClient().auth.updateUser({ password: values.password }); if (error) return setError(authErrorMessage(error.message)); router.push("/account?password=updated"); router.refresh(); } catch (caught) { setError(caught instanceof Error ? caught.message : "Terjadi kendala. Silakan coba lagi."); } }
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>{error && <Alert>{error}</Alert>}<Field label="Password baru" id="password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" error={errors.password?.message} {...register("password")} /><Field label="Konfirmasi password" id="confirmPassword" type="password" autoComplete="new-password" placeholder="Ulangi password" error={errors.confirmPassword?.message} {...register("confirmPassword")} /><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Menyimpan…" : "Simpan Password Baru"}</Button></form>;
}
