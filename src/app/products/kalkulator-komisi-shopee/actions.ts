"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ConnectProductState } from "@/components/products/types";

const productSlug = "kalkulator-komisi-shopee";

export async function connectKalkulatorProduct(
  previousState: ConnectProductState,
): Promise<ConnectProductState> {
  if (previousState.connected) return previousState;

  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { connected: false, tone: "error", message: "Sesi berakhir. Silakan masuk kembali." };
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id")
    .eq("slug", productSlug)
    .in("status", ["active", "beta"])
    .maybeSingle();

  if (productError || !product) {
    return { connected: false, tone: "error", message: "Produk belum tersedia untuk dihubungkan." };
  }

  const { error } = await supabase.from("user_products").insert({
    user_id: user.id,
    product_id: product.id,
    plan: "free",
    status: "active",
  });

  if (error && error.code !== "23505") {
    return { connected: false, tone: "error", message: "Produk belum dapat dihubungkan. Silakan coba lagi." };
  }

  revalidatePath("/account");
  revalidatePath("/products");
  revalidatePath(`/products/${productSlug}`);

  return {
    connected: true,
    tone: "success",
    message: error?.code === "23505" ? "Produk ini sudah terhubung ke akunmu." : "Produk berhasil dihubungkan ke akunmu.",
  };
}
