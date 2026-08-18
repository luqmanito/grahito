"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/app/locale-actions";
import { useDictionary, useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    startTransition(async () => {
      await setLocale(nextLocale);
      router.refresh();
    });
  }

  return (
    <div className="flex h-10 items-center rounded-full border border-line bg-white p-1" aria-label={dictionary.common.language}>
      <Languages className="ml-2 hidden size-4 text-muted sm:block" aria-hidden="true" />
      {(["id", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => changeLocale(item)}
          disabled={pending}
          aria-pressed={locale === item}
          aria-label={item === "id" ? dictionary.common.indonesian : dictionary.common.english}
          className={`ml-1 rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${locale === item ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
