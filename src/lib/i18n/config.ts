export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";
export const localeCookieName = "grahito_locale";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function languageTag(locale: Locale) {
  return locale === "en" ? "en-US" : "id-ID";
}
