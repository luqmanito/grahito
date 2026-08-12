"use client";

import { CheckCircle2, Link2, UserPlus } from "lucide-react";
import { useActionState } from "react";
import { connectKalkulatorProduct } from "@/app/products/kalkulator-komisi-shopee/actions";
import { Button, ButtonLink } from "@/components/ui/button";
import type { ConnectProductState } from "@/components/products/types";

export function ProductConnectionAction({ authenticated, available, connected }: { authenticated: boolean; available: boolean; connected: boolean }) {
  const initialState: ConnectProductState = { connected };
  const [state, action, pending] = useActionState(connectKalkulatorProduct, initialState);

  if (!available) {
    return <span className="inline-flex h-12 items-center rounded-full bg-paper px-5 text-sm font-semibold text-muted">Belum tersedia</span>;
  }

  if (state.connected) {
    return <ButtonLink href="/account"><CheckCircle2 className="size-4" />Sudah Terhubung</ButtonLink>;
  }

  if (!authenticated) {
    return <ButtonLink href="/register"><UserPlus className="size-4" />Daftar untuk Menghubungkan</ButtonLink>;
  }

  return (
    <form action={action}>
      <Button type="submit" disabled={pending}>
        <Link2 className="size-4" />
        {pending ? "Menghubungkan…" : "Sambungkan Produk"}
      </Button>
      {state.tone === "error" && state.message && <p role="alert" className="mt-2 max-w-xs text-xs leading-5 text-red-700">{state.message}</p>}
    </form>
  );
}
