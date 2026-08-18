"use client";

import { CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { useDictionary } from "@/components/locale-provider";

export function MobileMenu({ authenticated, loading }: { authenticated: boolean; loading: boolean }) {
  const [open, setOpen] = useState(false);
  const dictionary = useDictionary();
  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border border-line bg-white" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? dictionary.nav.close : dictionary.nav.open}>
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open && (
        <div id="mobile-navigation" className="absolute inset-x-4 top-20 rounded-3xl border border-line bg-white p-4 shadow-2xl">
          <nav className="flex flex-col" aria-label={dictionary.nav.mobile}>
            {[{href:"/products",label:dictionary.nav.products},{href:"/#about",label:dictionary.nav.about},{href:"/support",label:dictionary.nav.support}].map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-paper">{item.label}</Link>)}
            {loading ? (
              <div className="mt-2 h-12 animate-pulse rounded-full bg-paper" aria-label={dictionary.nav.checking} />
            ) : authenticated ? (
              <Link href="/account" onClick={() => setOpen(false)} className={buttonClass({ variant: "secondary", className: "mt-2" })}><CircleUserRound className="size-4" />{dictionary.nav.account}</Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-paper">{dictionary.nav.login}</Link>
                <Link href="/register" onClick={() => setOpen(false)} className={buttonClass({ className: "mt-2" })}>{dictionary.nav.register}</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
