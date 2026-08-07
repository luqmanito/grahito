import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/account", "/auth", "/login", "/register", "/forgot-password", "/reset-password", "/verify-email"] }, sitemap: absoluteUrl("/sitemap.xml") };
}
