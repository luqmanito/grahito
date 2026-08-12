"use client";

import { Check, Copy, Laptop, Plus, ShieldCheck, Smartphone, X } from "lucide-react";
import { useActionState, useState } from "react";
import { createDeviceActivationCode, revokeProductDevice, type ActivationCodeState } from "@/app/account/actions";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";

export type AccountDevice = {
  id: string;
  device_name: string;
  platform: string | null;
  last_seen_at: string | null;
  created_at: string;
};

const initialState: ActivationCodeState = {};

export function DeviceManagement({ connected, devices }: { connected: boolean; devices: AccountDevice[] }) {
  const [state, action, pending] = useActionState(createDeviceActivationCode, initialState);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!state.code) return;
    await navigator.clipboard.writeText(state.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="mt-5 rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-lime-dark" /><h2 className="text-lg font-semibold text-ink">Perangkat ekstensi</h2></div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Maksimal dua instalasi aktif. Identitas perangkat menggunakan ID instalasi acak, bukan MAC address.</p>
        </div>
        {connected ? (
          <form action={action}><Button type="submit" variant="secondary" size="sm" disabled={pending || devices.length >= 2}><Plus className="size-4" />{pending ? "Membuat…" : "Buat Kode Aktivasi"}</Button></form>
        ) : (
          <ButtonLink href="/products/kalkulator-komisi-shopee" size="sm">Hubungkan Produk</ButtonLink>
        )}
      </div>

      {devices.length >= 2 && <div className="mt-5"><Alert tone="info">Dua perangkat sudah aktif. Cabut salah satu perangkat sebelum mengaktifkan instalasi baru.</Alert></div>}
      {state.message && <div className="mt-5"><Alert tone={state.tone}>{state.message}</Alert></div>}
      {state.code && (
        <div className="mt-5 rounded-2xl border border-lime-dark/20 bg-lime-soft p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-lime-dark">Kode aktivasi satu kali</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row"><code className="min-w-0 flex-1 break-all rounded-xl bg-white px-4 py-3 text-sm text-ink">{state.code}</code><Button type="button" variant="secondary" onClick={copyCode}>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? "Tersalin" : "Salin"}</Button></div>
          <p className="mt-3 text-xs leading-5 text-muted">Masukkan kode ini di ekstensi pada perangkat yang ingin diaktifkan. Jangan membagikannya kepada orang lain.</p>
        </div>
      )}

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
