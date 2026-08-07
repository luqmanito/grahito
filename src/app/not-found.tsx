import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() { return <section className="py-28 text-center"><Container><p className="text-sm font-bold text-lime-dark">404</p><h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Halaman tidak ditemukan</h1><p className="mt-4 text-muted">Tautan mungkin sudah berubah atau halaman belum tersedia.</p><ButtonLink href="/" className="mt-8">Kembali ke Beranda</ButtonLink></Container></section>; }
