"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOpaqueToken, hashOpaqueToken } from "@/lib/extension-auth";
import { createClient } from "@/lib/supabase/server";

export type ActivationCodeState = {
  tone?: "success" | "error";
  message?: string;
  code?: string;
  expiresAt?: string;
};

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createDeviceActivationCode(): Promise<ActivationCodeState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { tone: "error", message: "Sesi berakhir. Silakan masuk kembali." };

  const { data: product } = await supabase
    .from("products")
    .select("id")
    .eq("slug", "kalkulator-komisi-shopee")
    .eq("status", "active")
    .maybeSingle();
  if (!product) return { tone: "error", message: "Produk belum tersedia." };

  const { data: connection } = await supabase
    .from("user_products")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .eq("status", "active")
    .maybeSingle();
  if (!connection) return { tone: "error", message: "Hubungkan produk ke akun terlebih dahulu." };

  const code = createOpaqueToken(24);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const { error } = await supabase.from("product_device_activation_codes").insert({
    user_id: user.id,
    product_id: product.id,
    code_hash: hashOpaqueToken(code),
    expires_at: expiresAt,
  });

  if (error) return { tone: "error", message: "Kode aktivasi belum dapat dibuat. Coba lagi." };
  return { tone: "success", message: "Kode berlaku selama 10 menit dan hanya dapat digunakan satu kali.", code, expiresAt };
}

export async function revokeProductDevice(deviceId: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("revoke_own_product_device", { p_device_id: deviceId });
  if (!error) revalidatePath("/account");
}
