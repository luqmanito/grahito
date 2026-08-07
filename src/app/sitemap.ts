import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/products/kalkulator-komisi-shopee", "/privacy", "/products/kalkulator-komisi-shopee/privacy", "/terms", "/support"];
  return routes.map((route) => ({ url: absoluteUrl(route || "/"), lastModified: new Date(), changeFrequency: route.includes("privacy") || route === "/terms" ? "yearly" : "monthly", priority: route === "" ? 1 : route === "/products/kalkulator-komisi-shopee" ? 0.9 : 0.7 }));
}
