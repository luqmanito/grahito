-- Grahito Labs: skema akun dan katalog produk awal.
-- Jalankan melalui Supabase CLI (`supabase db push`) atau SQL Editor.

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug = lower(slug)),
  name text not null,
  description text not null,
  status text not null default 'draft' check (status in ('draft', 'coming_soon', 'beta', 'active', 'archived')),
  created_at timestamptz not null default timezone('utc', now())
);

create table public.user_products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free')),
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, product_id)
);

create index user_products_user_id_idx on public.user_products(user_id);
create index user_products_product_id_idx on public.user_products(product_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger user_products_set_updated_at
before update on public.user_products
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.user_products enable row level security;

create policy "Pengguna membaca profil sendiri"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy "Pengguna memperbarui profil sendiri"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Produk aktif dapat dibaca publik"
on public.products for select
to anon, authenticated
using (status in ('active', 'beta'));

create policy "Pengguna membaca hubungan produk sendiri"
on public.user_products for select
to authenticated
using ((select auth.uid()) = user_id);

-- Jangan beri kebijakan INSERT/UPDATE/DELETE untuk products atau user_products.
-- Perubahan global dilakukan dari proses backend tepercaya, bukan browser pengguna.

insert into public.products (slug, name, description, status)
values (
  'kalkulator-komisi-shopee',
  'Kalkulator Komisi Shopee',
  'Chrome Extension untuk membantu pengguna Shopee Affiliate menghitung dan melihat ringkasan komisi langsung dari browser.',
  'coming_soon'
)
on conflict (slug) do nothing;
