export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(value: string | undefined, locale: Locale = "id") {
  if (!value) return "—";
  return new Intl.DateTimeFormat(languageTag(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
import type { Locale } from "@/lib/i18n/config";
import { languageTag } from "@/lib/i18n/config";
