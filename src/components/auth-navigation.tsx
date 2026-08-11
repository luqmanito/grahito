"use client";

import { CircleUserRound } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { ButtonLink } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/use-auth-user";

export function AuthNavigation() {
  const { user, loading } = useAuthUser();

  return (
    <>
      <div className="hidden min-w-[168px] items-center justify-end gap-2 md:flex">
        {loading ? (
          <div className="h-10 w-28 animate-pulse rounded-full bg-ink/5" aria-label="Memeriksa sesi akun" />
        ) : user ? (
          <ButtonLink href="/account" variant="secondary" size="sm">
            <CircleUserRound className="size-4" />
            Akun Saya
          </ButtonLink>
        ) : (
          <>
            <ButtonLink href="/login" variant="ghost" size="sm">Masuk</ButtonLink>
            <ButtonLink href="/register" size="sm">Buat Akun</ButtonLink>
          </>
        )}
      </div>
      <MobileMenu authenticated={Boolean(user)} loading={loading} />
    </>
  );
}
