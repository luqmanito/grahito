import "server-only";

import { cookies } from "next/headers";
import { headers } from "next/headers";
import { defaultLocale, isLocale, localeCookieName } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

export async function getLocale() {
  const value = (await cookies()).get(localeCookieName)?.value;
  if (isLocale(value)) return value;
  const acceptedLanguages = (await headers()).get("accept-language")?.toLowerCase() || "";
  return acceptedLanguages.startsWith("en") ? "en" : defaultLocale;
}

export async function getDictionary() {
  return dictionaries[await getLocale()];
}
