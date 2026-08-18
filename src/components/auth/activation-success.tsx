"use client";

import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button";
import { useDictionary } from "@/components/locale-provider";

export function ActivationSuccess() {
  const router = useRouter();
  const dictionary = useDictionary();

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
        {dictionary.auth.activatedBody}
      </p>
      <ButtonLink href="/login?verified=true" className="mt-6 w-full">
        {dictionary.auth.loginToAccount}
      </ButtonLink>
      <p className="mt-4 text-xs text-muted">{dictionary.auth.autoRedirect}</p>
    </div>
  );
}
