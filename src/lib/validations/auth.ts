import { z } from "zod";
import type { Locale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function createAuthSchemas(locale: Locale) {
  const copy = dictionaries[locale].auth;
  const email = z.string().trim().email(copy.invalidEmail);
  const password = z.string().min(8, copy.passwordMin);
  return {
    login: z.object({ email, password: z.string().min(1, copy.passwordRequired) }),
    register: z.object({ displayName: z.string().trim().min(2, copy.nameMin).max(80, copy.nameMax), email, password, confirmPassword: z.string(), consent: z.literal(true, { error: copy.consentRequired }) }).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: copy.passwordMismatch }),
    forgot: z.object({ email }),
    reset: z.object({ password, confirmPassword: z.string() }).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: copy.passwordMismatch }),
  };
}

type AuthSchemas = ReturnType<typeof createAuthSchemas>;

export type LoginValues = z.infer<AuthSchemas["login"]>;
export type RegisterValues = z.infer<AuthSchemas["register"]>;
export type ForgotValues = z.infer<AuthSchemas["forgot"]>;
export type ResetValues = z.infer<AuthSchemas["reset"]>;
