import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { createOpaqueToken, hashOpaqueToken } from "@/lib/extension-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const requestSchema = z.object({
  activationCode: z.string().trim().min(32).max(128),
  installationId: z.string().uuid(),
  deviceName: z.string().trim().min(1).max(80),
  platform: z.string().trim().max(40).default(""),
});

export async function POST(request: Request) {
  const requestId = randomUUID();

  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Permintaan aktivasi perangkat tidak valid.", code: "INVALID_REQUEST", requestId },
        { status: 400 },
      );
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
      console.error("Extension device exchange failed", {
        requestId,
        code: error.code,
        message: error.message,
        details: error.details,
      });

      if (error.message.includes("DEVICE_LIMIT_REACHED")) {
        return NextResponse.json(
          { error: "Batas dua perangkat aktif sudah tercapai. Cabut salah satu perangkat melalui dashboard akun.", code: "DEVICE_LIMIT_REACHED", requestId },
          { status: 409 },
        );
      }

      if (error.message.includes("PRODUCT_NOT_CONNECTED")) {
        return NextResponse.json(
          { error: "Produk belum terhubung ke akun.", code: "PRODUCT_NOT_CONNECTED", requestId },
          { status: 403 },
        );
      }

      if (error.message.includes("INVALID_OR_EXPIRED_CODE")) {
        return NextResponse.json(
          { error: "Kode aktivasi tidak valid atau sudah kedaluwarsa.", code: "INVALID_OR_EXPIRED_CODE", requestId },
          { status: 410 },
        );
      }

      if (error.code === "PGRST202" || error.message.toLowerCase().includes("schema cache")) {
        return NextResponse.json(
          { error: "Schema aktivasi perangkat belum siap. Hubungi dukungan.", code: "SCHEMA_NOT_READY", requestId },
          { status: 503 },
        );
      }

      if (error.message.toLowerCase().includes("api key") || error.message.toLowerCase().includes("permission denied")) {
        return NextResponse.json(
          { error: "Konfigurasi layanan aktivasi belum benar. Hubungi dukungan.", code: "SERVER_CONFIGURATION_ERROR", requestId },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { error: "Aktivasi gagal karena kesalahan internal.", code: "ACTIVATION_INTERNAL_ERROR", requestId },
        { status: 500 },
      );
    }

    const device = Array.isArray(data) ? data[0] : data;
    return NextResponse.json(
      { deviceToken, deviceId: device?.device_id, tokenType: "Bearer" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Extension device exchange unavailable", { requestId, error });
    return NextResponse.json(
      { error: "Layanan aktivasi perangkat belum tersedia.", code: "SERVICE_UNAVAILABLE", requestId },
      { status: 503 },
    );
  }
}
