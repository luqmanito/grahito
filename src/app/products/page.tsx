import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { ProductConnectionAction } from "@/components/products/product-connection-action";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { getProducts } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary();
  return { title: dictionary.products.metaTitle, description: dictionary.products.metaDescription, alternates: { canonical: "/products" } };
}

export default async function ProductsPage() {
  const [locale, dictionary] = await Promise.all([getLocale(), getDictionary()]);
  const products = getProducts(locale);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: databaseProducts } = await supabase.from("products").select("id, slug").in("status", ["active", "beta"]);
  const productIds = databaseProducts?.map((product) => product.id) ?? [];
  const { data: connections } = user && productIds.length > 0
    ? await supabase.from("user_products").select("product_id").eq("user_id", user.id).in("product_id", productIds)
    : { data: [] };
  const availableProducts = new Map(databaseProducts?.map((product) => [product.slug, product.id]));
  const connectedProductIds = new Set(connections?.map((connection) => connection.product_id));

  return <section className="py-20 sm:py-28"><Container><SectionHeading eyebrow={dictionary.products.eyebrow} title={dictionary.products.title} description={dictionary.products.description} /><div className="mt-12 grid gap-6">{products.map((product) => { const databaseId = availableProducts.get(product.slug); return <ProductCard key={product.slug} product={product} featured action={<ProductConnectionAction authenticated={Boolean(user)} available={Boolean(databaseId)} connected={Boolean(databaseId && connectedProductIds.has(databaseId))} />} />; })}</div></Container></section>;
}
