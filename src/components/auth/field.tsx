"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { useDictionary } from "@/components/locale-provider";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

export const Field = forwardRef<HTMLInputElement, Props>(function Field({ label, error, id, type, ...props }, ref) {
  const [visible, setVisible] = useState(false);
  const dictionary = useDictionary();
  const isPassword = type === "password";
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <span className="relative block"><input ref={ref} id={id} type={isPassword && visible ? "text" : type} className="field" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{isPassword && <button type="button" onClick={() => setVisible(!visible)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink" aria-label={visible ? dictionary.auth.hidePassword : dictionary.auth.showPassword}>{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>}</span>
      {error && <span id={`${id}-error`} className="mt-1.5 block text-xs text-red-700">{error}</span>}
    </label>
  );
});
