"use client";

import { Laptop, Link2, ShieldCheck, Smartphone, X } from "lucide-react";
import { revokeProductDevice } from "@/app/account/actions";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";

export type AccountDevice = {
  id: string;
  device_name: string;
  platform: string | null;
  last_seen_at: string | null;
  created_at: string;
};

export function DeviceManagement({ connected, devices }: { connected: boolean; devices: AccountDevice[] }) {
  return (
    <section className="mt-5 rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-lime-dark" /><h2 className="text-lg font-semibold text-ink">Perangkat ekstensi</h2></div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Maksimal dua instalasi aktif. Identitas perangkat menggunakan ID instalasi acak, bukan MAC address.</p>
        </div>
        {connected ? (
          <span className="inline-flex h-10 items-center gap-2 rounded-full bg-lime-soft px-4 text-xs font-semibold text-lime-dark"><Link2 className="size-4" />Otorisasi otomatis aktif</span>
        ) : (
          <ButtonLink href="/products/kalkulator-komisi-shopee" size="sm">Hubungkan Produk</ButtonLink>
        )}
      </div>

      {devices.length >= 2 && <div className="mt-5"><Alert tone="info">Dua perangkat sudah aktif. Cabut salah satu perangkat sebelum mengaktifkan instalasi baru.</Alert></div>}
      {connected && devices.length < 2 && <div className="mt-5"><Alert tone="info">Buka ekstensi lalu pilih “Hubungkan Akun”. Website akan menyelesaikan otorisasi secara otomatis.</Alert></div>}

      <div className="mt-6 space-y-3">
        {devices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-paper/50 px-5 py-8 text-center text-sm text-muted">Belum ada perangkat ekstensi yang aktif.</div>
        ) : devices.map((device) => (
          <div key={device.id} className="flex flex-col gap-4 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4"><div className="grid size-10 place-items-center rounded-xl bg-paper text-muted">{device.platform?.toLowerCase().includes("mobile") ? <Smartphone className="size-4" /> : <Laptop className="size-4" />}</div><div><p className="text-sm font-semibold text-ink">{device.device_name}</p><p className="mt-1 text-xs text-muted">{device.platform || "Platform tidak diketahui"} · {device.last_seen_at ? `Aktif ${new Date(device.last_seen_at).toLocaleDateString("id-ID")}` : "Belum pernah divalidasi"}</p></div></div>
            <form action={revokeProductDevice.bind(null, device.id)}><Button type="submit" variant="danger" size="sm"><X className="size-4" />Cabut</Button></form>
          </div>
        ))}
      </div>
    </section>
  );
}
