import type { MetadataRoute } from "next";
import { getDictionary, getLocale } from "@/lib/i18n/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const [locale, dictionary] = await Promise.all([getLocale(), getDictionary()]);
  return { name: "Grahito Labs", short_name: "Grahito", description: dictionary.home.title, start_url: "/", display: "standalone", background_color: "#fbfbf7", theme_color: "#191914", lang: locale, icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
