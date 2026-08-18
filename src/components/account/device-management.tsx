"use client";

import { Laptop, Link2, ShieldCheck, Smartphone, X } from "lucide-react";
import { revokeProductDevice } from "@/app/account/actions";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";
import { useDictionary, useLocale } from "@/components/locale-provider";
import { languageTag } from "@/lib/i18n/config";

export type AccountDevice = {
  id: string;
  device_name: string;
  platform: string | null;
  last_seen_at: string | null;
  created_at: string;
  activated_at: string;
};

const revocationCooldownMs = 7 * 24 * 60 * 60 * 1000;

function revocationAvailableAt(activatedAt: string) {
  return new Date(new Date(activatedAt).getTime() + revocationCooldownMs);
}

export function DeviceManagement({ connected, devices, currentTime }: { connected: boolean; devices: AccountDevice[]; currentTime: string }) {
  const currentTimeMs = new Date(currentTime).getTime();
  const locale = useLocale();
  const dictionary = useDictionary();
  const dateLocale = languageTag(locale);

  return (
    <section className="mt-5 rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-lime-dark" /><h2 className="text-lg font-semibold text-ink">{dictionary.devices.title}</h2></div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{dictionary.devices.description}</p>
        </div>
        {connected ? (
          <span className="inline-flex h-10 items-center gap-2 rounded-full bg-lime-soft px-4 text-xs font-semibold text-lime-dark"><Link2 className="size-4" />{dictionary.devices.automatic}</span>
        ) : (
          <ButtonLink href="/products/kalkulator-komisi-shopee" size="sm">{dictionary.devices.connectProduct}</ButtonLink>
        )}
      </div>

      {devices.length >= 2 && <div className="mt-5"><Alert tone="info">{dictionary.devices.limit}</Alert></div>}
      {connected && devices.length < 2 && <div className="mt-5"><Alert tone="info">{dictionary.devices.connectHint}</Alert></div>}

      <div className="mt-6 space-y-3">
        {devices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-paper/50 px-5 py-8 text-center text-sm text-muted">{dictionary.devices.empty}</div>
        ) : devices.map((device) => {
          const availableAt = revocationAvailableAt(device.activated_at);
          const canRevoke = availableAt.getTime() <= currentTimeMs;

          return (
            <div key={device.id} className="flex flex-col gap-4 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4"><div className="grid size-10 place-items-center rounded-xl bg-paper text-muted">{device.platform?.toLowerCase().includes("mobile") ? <Smartphone className="size-4" /> : <Laptop className="size-4" />}</div><div><p className="text-sm font-semibold text-ink">{device.device_name}</p><p className="mt-1 text-xs text-muted">{device.platform || dictionary.devices.unknownPlatform} · {device.last_seen_at ? `${dictionary.devices.lastActive} ${new Date(device.last_seen_at).toLocaleDateString(dateLocale)}` : dictionary.devices.neverValidated}</p>{!canRevoke && <p className="mt-1 text-xs font-medium text-orange-dark">{dictionary.devices.availableAt} {availableAt.toLocaleString(dateLocale, { dateStyle: "long", timeStyle: "short" })}</p>}</div></div>
              <form action={revokeProductDevice.bind(null, device.id)}><Button type="submit" variant="danger" size="sm" disabled={!canRevoke} title={canRevoke ? dictionary.devices.revokeTitle : `${dictionary.devices.availableAt} ${availableAt.toLocaleString(dateLocale)}`}><X className="size-4" />{canRevoke ? dictionary.devices.revoke : dictionary.devices.cannotRevoke}</Button></form>
            </div>
          );
        })}
      </div>
    </section>
  );
}
