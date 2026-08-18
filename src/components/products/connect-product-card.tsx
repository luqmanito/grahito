"use client";

import { CheckCircle2, Link2, LogIn } from "lucide-react";
import { useActionState } from "react";
import { connectKalkulatorProduct } from "@/app/products/kalkulator-komisi-shopee/actions";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";
import type { ConnectProductState } from "@/components/products/types";
import { useDictionary } from "@/components/locale-provider";

export function ConnectProductCard({ authenticated, available, connected }: { authenticated: boolean; available: boolean; connected: boolean }) {
  const dictionary = useDictionary();
  const initialState: ConnectProductState = { connected };
  const [state, action, pending] = useActionState(connectKalkulatorProduct, initialState);

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_18px_55px_rgba(25,25,20,.06)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-orange-soft text-orange-dark">
            {state.connected ? <CheckCircle2 className="size-5" /> : <Link2 className="size-5" />}
          </div>
          <div>
            <h2 className="font-semibold text-ink">{dictionary.connectCard.title}</h2>
            <p className="mt-1 text-sm text-muted">{dictionary.connectCard.subtitle}</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
          {dictionary.connectCard.description}
        </p>
        {state.message && <div className="mt-4"><Alert tone={state.tone}>{state.message}</Alert></div>}
      </div>
      <div className="mt-6 shrink-0 sm:mt-0">
        {!available ? (
          <span className="inline-flex h-12 items-center rounded-full bg-paper px-5 text-sm font-semibold text-muted">{dictionary.connectCard.unavailable}</span>
        ) : state.connected ? (
          <ButtonLink href="/account" variant="secondary"><CheckCircle2 className="size-4" />{dictionary.connectCard.dashboard}</ButtonLink>
        ) : authenticated ? (
          <form action={action}>
            <Button type="submit" disabled={pending}><Link2 className="size-4" />{pending ? dictionary.connectCard.connecting : dictionary.connectCard.connect}</Button>
          </form>
        ) : (
          <ButtonLink href="/login?next=/products/kalkulator-komisi-shopee"><LogIn className="size-4" />{dictionary.connectCard.login}</ButtonLink>
        )}
      </div>
    </div>
  );
}
