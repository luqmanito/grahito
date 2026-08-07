export type Product = {
  slug: string;
  name: string;
  type: string;
  status: "Beta" | "Segera tersedia";
  description: string;
  href: string;
};

export const products: Product[] = [
  {
    slug: "kalkulator-komisi-shopee",
    name: "Kalkulator Komisi Shopee",
    type: "Chrome Extension",
    status: "Segera tersedia",
    description:
      "Lihat dan hitung laporan komisi Shopee Affiliate langsung dari browser tanpa menyalin data secara manual.",
    href: "/products/kalkulator-komisi-shopee",
  },
];
