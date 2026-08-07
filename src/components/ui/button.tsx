import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-ink text-white shadow-[0_1px_0_rgba(255,255,255,.12)_inset] hover:bg-black",
  secondary: "border border-line bg-white text-ink hover:border-ink/30 hover:bg-paper",
  ghost: "text-muted hover:bg-ink/5 hover:text-ink",
  orange: "bg-orange text-white hover:bg-orange-dark",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function buttonClass({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({ variant, size, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button className={buttonClass({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & { href: string }) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return <a href={href} className={buttonClass({ variant, size, className })} {...props} />;
  }
  return <Link href={href} className={buttonClass({ variant, size, className })} {...props} />;
}
