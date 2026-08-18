import type { Locale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

export type Product = {
  slug: string;
  name: string;
  type: string;
  status: "available" | "beta" | "comingSoon";
  description: string;
  href: string;
};

export function getProducts(locale: Locale): Product[] {
  const dictionary = dictionaries[locale];
  return [{
    slug: "kalkulator-komisi-shopee",
    name: "Kalkulator Komisi Shopee",
    type: "Chrome Extension",
    status: "available",
    description: dictionary.product.description,
    href: "/products/kalkulator-komisi-shopee",
  }];
}
