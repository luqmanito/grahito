import { LogOut } from "lucide-react";
import { logout } from "@/app/account/actions";
import { Button } from "@/components/ui/button";

export function UserMenu({ name, email }: { name: string; email: string }) {
  return <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><div className="grid size-11 place-items-center rounded-full bg-lime-soft font-bold text-lime-dark">{name.slice(0, 1).toUpperCase()}</div><div><p className="text-sm font-semibold text-ink">{name}</p><p className="text-xs text-muted">{email}</p></div></div><form action={logout}><Button type="submit" variant="secondary" size="sm"><LogOut className="size-4" />Keluar</Button></form></div>;
}
