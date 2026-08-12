import { NextResponse } from "next/server";
import { z } from "zod";
import { hashOpaqueToken } from "@/lib/extension-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const requestSchema = z.object({ installationId: z.string().uuid() });

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!token) return NextResponse.json({ valid: false, error: "Token perangkat diperlukan." }, { status: 401 });

  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ valid: false, error: "Installation ID tidak valid." }, { status: 400 });

    const admin = createAdminClient();
    const { data: device } = await admin
      .from("product_devices")
      .select("id, user_id, product_id, active, products!inner(slug, status)")
      .eq("token_hash", hashOpaqueToken(token))
      .eq("installation_id", parsed.data.installationId)
      .eq("active", true)
      .maybeSingle();

    if (!device) return NextResponse.json({ valid: false }, { status: 401 });

    const { data: connection } = await admin
      .from("user_products")
      .select("id, plan, status")
      .eq("user_id", device.user_id)
      .eq("product_id", device.product_id)
      .eq("status", "active")
      .maybeSingle();

    if (!connection) return NextResponse.json({ valid: false }, { status: 403 });

    await admin.from("product_devices").update({ last_seen_at: new Date().toISOString() }).eq("id", device.id);
    const product = Array.isArray(device.products) ? device.products[0] : device.products;

    return NextResponse.json(
      { valid: true, product: product?.slug, plan: connection.plan },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ valid: false, error: "Layanan validasi perangkat belum tersedia." }, { status: 503 });
  }
}
