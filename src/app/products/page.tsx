import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { ProductConnectionAction } from "@/components/products/product-connection-action";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Produk", description: "Jelajahi aplikasi, browser extension, dan tools praktis dari Grahito Labs.", alternates: { canonical: "/products" } };

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: databaseProducts } = await supabase.from("products").select("id, slug").in("status", ["active", "beta"]);
  const productIds = databaseProducts?.map((product) => product.id) ?? [];
  const { data: connections } = user && productIds.length > 0
    ? await supabase.from("user_products").select("product_id").eq("user_id", user.id).in("product_id", productIds)
    : { data: [] };
  const availableProducts = new Map(databaseProducts?.map((product) => [product.slug, product.id]));
  const connectedProductIds = new Set(connections?.map((connection) => connection.product_id));

  return <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow="Katalog produk" title="Tools kecil dengan tujuan yang jelas." description="Kami membangun setiap produk untuk menyederhanakan pekerjaan tertentu. Lebih banyak produk sedang disiapkan." /><div className="mt-12 grid gap-6">{products.map((product) => { const databaseId = availableProducts.get(product.slug); return <ProductCard key={product.slug} product={product} featured action={<ProductConnectionAction authenticated={Boolean(user)} available={Boolean(databaseId)} connected={Boolean(databaseId && connectedProductIds.has(databaseId))} />} />; })}</div></Container></section>;
}
