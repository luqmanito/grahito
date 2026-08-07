import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Produk", description: "Jelajahi aplikasi, browser extension, dan tools praktis dari Grahito Labs.", alternates: { canonical: "/products" } };

export default function ProductsPage() {
  return <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow="Katalog produk" title="Tools kecil dengan tujuan yang jelas." description="Kami membangun setiap produk untuk menyederhanakan pekerjaan tertentu. Lebih banyak produk sedang disiapkan." /><div className="mt-12 grid gap-6">{products.map((product) => <ProductCard key={product.slug} product={product} featured />)}</div></Container></section>;
}
