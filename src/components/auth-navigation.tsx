"use client";

import { CircleUserRound } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { ButtonLink } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useDictionary } from "@/components/locale-provider";

export function AuthNavigation() {
  const { user, loading } = useAuthUser();
  const dictionary = useDictionary();

  return (
    <>
      <div className="hidden min-w-[168px] items-center justify-end gap-2 md:flex">
        {loading ? (
          <div className="h-10 w-28 animate-pulse rounded-full bg-ink/5" aria-label={dictionary.nav.checking} />
        ) : user ? (
          <ButtonLink href="/account" variant="secondary" size="sm">
            <CircleUserRound className="size-4" />
            {dictionary.nav.account}
          </ButtonLink>
        ) : (
          <>
            <ButtonLink href="/login" variant="ghost" size="sm">{dictionary.nav.login}</ButtonLink>
            <ButtonLink href="/register" size="sm">{dictionary.nav.register}</ButtonLink>
          </>
        )}
      </div>
      <MobileMenu authenticated={Boolean(user)} loading={loading} />
    </>
  );
}
