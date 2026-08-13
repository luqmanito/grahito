import { NextResponse } from "next/server";
import { z } from "zod";
import { createOpaqueToken, hashOpaqueToken } from "@/lib/extension-auth";
import { createClient } from "@/lib/supabase/server";

const querySchema = z.object({
  redirect_uri: z.string().url(),
  state: z.string().min(32).max(128),
});

function extensionCallbackUrl() {
  const extensionId = process.env.CHROME_EXTENSION_ID?.trim();
  if (!extensionId || !/^[a-p]{32}$/.test(extensionId)) return null;
  return `https://${extensionId}.chromiumapp.org/grahito-auth`;
}

function redirectWithResult(
  redirectUri: string,
  state: string,
  result: { activationCode?: string; error?: string; errorDescription?: string },
) {
  const callback = new URL(redirectUri);
  callback.searchParams.set("state", state);

  if (result.activationCode) callback.searchParams.set("activation_code", result.activationCode);
  if (result.error) callback.searchParams.set("error", result.error);
  if (result.errorDescription) callback.searchParams.set("error_description", result.errorDescription);

  return NextResponse.redirect(callback, { headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(requestUrl.searchParams));
  const allowedCallback = extensionCallbackUrl();

  if (!parsed.success || !allowedCallback || parsed.data.redirect_uri !== allowedCallback) {
    return NextResponse.json(
      { error: "Permintaan otorisasi ekstensi tidak valid." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const { redirect_uri: redirectUri, state } = parsed.data;
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    const returnPath = `${requestUrl.pathname}${requestUrl.search}`;
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("next", returnPath);
    return NextResponse.redirect(loginUrl);
  }

  const { data: product } = await supabase
    .from("products")
    .select("id")
    .eq("slug", "kalkulator-komisi-shopee")
    .eq("status", "active")
    .maybeSingle();

  if (!product) {
    return redirectWithResult(redirectUri, state, {
      error: "product_unavailable",
      errorDescription: "Produk belum tersedia.",
    });
  }

  const { data: connection } = await supabase
    .from("user_products")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .eq("status", "active")
    .maybeSingle();

  if (!connection) {
    return redirectWithResult(redirectUri, state, {
      error: "product_not_connected",
      errorDescription: "Kalkulator Komisi Shopee belum terhubung ke akun ini.",
    });
  }

  const activationCode = createOpaqueToken(24);
  const { error: codeError } = await supabase.from("product_device_activation_codes").insert({
    user_id: user.id,
    product_id: product.id,
    code_hash: hashOpaqueToken(activationCode),
    expires_at: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
  });

  if (codeError) {
    console.error("Automatic extension authorization failed", {
      userId: user.id,
      code: codeError.code,
      message: codeError.message,
    });
    return redirectWithResult(redirectUri, state, {
      error: "authorization_failed",
      errorDescription: "Otorisasi ekstensi belum dapat diselesaikan.",
    });
  }

  return redirectWithResult(redirectUri, state, { activationCode });
}
