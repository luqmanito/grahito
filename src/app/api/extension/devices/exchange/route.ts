import { NextResponse } from "next/server";
import { z } from "zod";
import { createOpaqueToken, hashOpaqueToken } from "@/lib/extension-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const requestSchema = z.object({
  activationCode: z.string().min(32).max(128),
  installationId: z.string().uuid(),
  deviceName: z.string().trim().min(1).max(80),
  platform: z.string().trim().max(40).default(""),
});

export async function POST(request: Request) {
  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Permintaan aktivasi perangkat tidak valid." }, { status: 400 });
    }

    const deviceToken = createOpaqueToken();
    const admin = createAdminClient();
    const { data, error } = await admin.rpc("exchange_product_device_code", {
      p_code_hash: hashOpaqueToken(parsed.data.activationCode),
      p_installation_id: parsed.data.installationId,
      p_device_name: parsed.data.deviceName,
      p_platform: parsed.data.platform,
      p_token_hash: hashOpaqueToken(deviceToken),
    });

    if (error) {
      const message = error.message.includes("DEVICE_LIMIT_REACHED")
        ? "Batas dua perangkat aktif sudah tercapai. Cabut salah satu perangkat melalui dashboard akun."
        : error.message.includes("PRODUCT_NOT_CONNECTED")
          ? "Produk belum terhubung ke akun."
          : "Kode aktivasi tidak valid atau sudah kedaluwarsa.";
      return NextResponse.json({ error: message }, { status: 403 });
    }

    const device = Array.isArray(data) ? data[0] : data;
    return NextResponse.json(
      { deviceToken, deviceId: device?.device_id, tokenType: "Bearer" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "Layanan aktivasi perangkat belum tersedia." }, { status: 503 });
  }
}
