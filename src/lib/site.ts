export const siteConfig = {
  name: "Grahito Labs",
  description:
    "Studio produk digital independen yang membangun aplikasi, ekstensi, dan tools praktis dari masalah sehari-hari.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "TODO_EMAIL_DUKUNGAN",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function supportHref(subject?: string) {
  if (siteConfig.supportEmail === "TODO_EMAIL_DUKUNGAN") return "/support";
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.supportEmail}${query}`;
}
