import { z } from "zod";

const email = z.string().trim().email("Masukkan alamat email yang valid.");
const password = z.string().min(8, "Password minimal 8 karakter.");

export const loginSchema = z.object({ email, password: z.string().min(1, "Password wajib diisi.") });
export const registerSchema = z.object({ displayName: z.string().trim().min(2, "Nama minimal 2 karakter.").max(80, "Nama maksimal 80 karakter."), email, password, confirmPassword: z.string(), consent: z.literal(true, { error: "Kamu perlu menyetujui syarat dan kebijakan privasi." }) }).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Konfirmasi password tidak cocok." });
export const forgotSchema = z.object({ email });
export const resetSchema = z.object({ password, confirmPassword: z.string() }).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Konfirmasi password tidak cocok." });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotValues = z.infer<typeof forgotSchema>;
export type ResetValues = z.infer<typeof resetSchema>;
