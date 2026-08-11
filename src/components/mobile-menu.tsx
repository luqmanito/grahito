"use client";

import { CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";

export function MobileMenu({ authenticated, loading }: { authenticated: boolean; loading: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border border-line bg-white" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Tutup navigasi" : "Buka navigasi"}>
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open && (
        <div id="mobile-navigation" className="absolute inset-x-4 top-20 rounded-3xl border border-line bg-white p-4 shadow-2xl">
          <nav className="flex flex-col" aria-label="Navigasi seluler">
            {[{href:"/products",label:"Produk"},{href:"/#tentang",label:"Tentang"},{href:"/support",label:"Bantuan"}].map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-paper">{item.label}</Link>)}
            {loading ? (
              <div className="mt-2 h-12 animate-pulse rounded-full bg-paper" aria-label="Memeriksa sesi akun" />
            ) : authenticated ? (
              <Link href="/account" onClick={() => setOpen(false)} className={buttonClass({ variant: "secondary", className: "mt-2" })}><CircleUserRound className="size-4" />Akun Saya</Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-paper">Masuk</Link>
                <Link href="/register" onClick={() => setOpen(false)} className={buttonClass({ className: "mt-2" })}>Buat Akun</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
