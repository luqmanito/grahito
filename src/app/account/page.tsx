import type { Metadata } from "next";
import { BadgeCheck, CalendarDays, KeyRound, Mail, Package, ShieldCheck, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { DeviceManagement, type AccountDevice } from "@/components/account/device-management";
import { UserMenu } from "@/components/user-menu";
import { Alert } from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils";
import { supportHref } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Akun", robots: { index: false, follow: false } };

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ password?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const [{ data: profile }, { data: userProducts }, { data: productDevices }] = await Promise.all([
    supabase.from("profiles").select("display_name, avatar_url").eq("id", user.id).maybeSingle(),
    supabase.from("user_products").select("id, plan, status, products(name, slug)").eq("user_id", user.id),
    supabase.from("product_devices").select("id, device_name, platform, last_seen_at, created_at, activated_at, products!inner(slug)").eq("user_id", user.id).eq("active", true).order("activated_at", { ascending: true }),
  ]);
  const params = await searchParams;
  const displayName = (profile as { display_name?: string } | null)?.display_name || user.user_metadata.display_name || "Pengguna Grahito";
  const products = userProducts || [];
  const kalkulatorConnected = products.some((entry) => {
    const linkedProduct = Array.isArray(entry.products) ? entry.products[0] : entry.products;
    return linkedProduct?.slug === "kalkulator-komisi-shopee" && entry.status === "active";
  });
  const devices = (productDevices || []).filter((device) => {
    const product = Array.isArray(device.products) ? device.products[0] : device.products;
    return product?.slug === "kalkulator-komisi-shopee";
  }) as AccountDevice[];
  return (
    <section className="bg-paper py-12 sm:py-16"><Container className="max-w-5xl">
      <UserMenu name={displayName} email={user.email || "—"} />
      {params.password === "updated" && <div className="mt-5"><Alert tone="success">Password berhasil diperbarui.</Alert></div>}
      <div className="mt-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-dark">Dashboard akun</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-ink">Halo, {displayName.split(" ")[0]}.</h1><p className="mt-3 text-muted">Kelola profil dan produk yang terhubung dengan akunmu.</p></div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8"><h2 className="text-lg font-semibold text-ink">Informasi akun</h2><dl className="mt-6 divide-y divide-line">{[
          { icon: Mail, label: "Email", value: user.email || "—" },
          { icon: BadgeCheck, label: "Status email", value: user.email_confirmed_at ? "Terverifikasi" : "Belum terverifikasi" },
          { icon: CalendarDays, label: "Akun dibuat", value: formatDate(user.created_at) },
          { icon: ShieldCheck, label: "Paket", value: "Gratis" },
        ].map((item) => <div key={item.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><div className="grid size-10 place-items-center rounded-xl bg-paper text-muted"><item.icon className="size-4" /></div><dt className="flex-1 text-sm text-muted">{item.label}</dt><dd className="text-right text-sm font-semibold text-ink">{item.value}</dd></div>)}</dl></div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8"><h2 className="text-lg font-semibold text-ink">Keamanan akun</h2><p className="mt-2 text-sm leading-6 text-muted">Perbarui password atau ajukan penghapusan akun.</p><div className="mt-6 space-y-3"><ButtonLink href="/reset-password" variant="secondary" className="w-full"><KeyRound className="size-4" />Ubah Password</ButtonLink><ButtonLink href={supportHref("Permintaan penghapusan akun Grahito Labs")} variant="danger" className="w-full"><Trash2 className="size-4" />Hapus Akun</ButtonLink></div><p className="mt-4 text-xs leading-5 text-muted">TODO: finalkan alur penghapusan akun otomatis setelah kebijakan operasional ditetapkan.</p></div>
      </div>
      <div className="mt-5 rounded-3xl border border-line bg-white p-6 sm:p-8"><div className="mb-6 flex items-center gap-3"><Package className="size-5 text-muted" /><h2 className="text-lg font-semibold text-ink">Produk terhubung</h2></div>{products.length === 0 ? <EmptyState title="Belum ada produk terhubung" description="Belum ada produk yang terhubung ke akun ini." /> : <div className="space-y-3">{products.map((entry) => { const linkedProduct = Array.isArray(entry.products) ? entry.products[0] : entry.products; return <div key={entry.id} className="flex flex-col gap-4 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-ink">{linkedProduct?.name || "Produk Grahito Labs"}</p><p className="mt-1 text-xs text-muted">Paket {entry.plan === "free" ? "Gratis" : entry.plan}</p></div><div className="flex items-center gap-2"><span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-lime-dark">{entry.status === "active" ? "Aktif" : "Tidak aktif"}</span>{linkedProduct?.slug && <ButtonLink href={`/products/${linkedProduct.slug}`} variant="secondary" size="sm">Buka Produk</ButtonLink>}</div></div>; })}</div>}</div>
      <DeviceManagement connected={kalkulatorConnected} devices={devices} currentTime={new Date().toISOString()} />
    </Container></section>
  );
}
