import type { Locale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function authErrorMessage(message: string, locale: Locale = "id") {
  const dictionary = dictionaries[locale].auth;
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return dictionary.invalidCredentials;
  if (normalized.includes("email not confirmed")) return dictionary.emailNotConfirmed;
  if (normalized.includes("user already registered")) return dictionary.alreadyRegistered;
  if (normalized.includes("password should be")) return dictionary.weakPassword;
  if (normalized.includes("rate limit")) return dictionary.rateLimit;
  return dictionary.genericError;
}
