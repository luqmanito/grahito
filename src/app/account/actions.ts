"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function revokeProductDevice(deviceId: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("revoke_own_product_device", { p_device_id: deviceId });
  if (!error) revalidatePath("/account");
}
