import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Alert({ children, tone = "error" }: { children: React.ReactNode; tone?: "error" | "success" | "info" }) {
  return (
    <div role="alert" className={cn("flex gap-3 rounded-2xl border p-4 text-sm leading-6", tone === "error" && "border-red-200 bg-red-50 text-red-800", tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800", tone === "info" && "border-blue-200 bg-blue-50 text-blue-800")}>
      {tone === "success" ? <CircleCheck className="mt-0.5 size-4 shrink-0" /> : <CircleAlert className="mt-0.5 size-4 shrink-0" />}
      <div>{children}</div>
    </div>
  );
}
