"use client";

import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button";

export function ActivationSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace("/login?verified=true");
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div className="text-center">
      <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-lime-soft text-lime-dark">
        <CircleCheckBig className="size-7" />
      </div>
      <p className="mt-5 text-sm leading-6 text-muted">
        Email berhasil diverifikasi. Silakan masuk menggunakan email dan password yang sudah didaftarkan.
      </p>
      <ButtonLink href="/login?verified=true" className="mt-6 w-full">
        Masuk ke Akun
      </ButtonLink>
      <p className="mt-4 text-xs text-muted">Kamu akan diarahkan ke halaman masuk dalam beberapa detik.</p>
    </div>
  );
}
