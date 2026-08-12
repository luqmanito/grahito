-- Publikasikan Kalkulator Komisi Shopee sebagai beta dan izinkan pengguna
-- menghubungkannya ke akun mereka sendiri.

insert into public.products (slug, name, description, status)
values (
  'kalkulator-komisi-shopee',
  'Kalkulator Komisi Shopee',
  'Chrome Extension untuk membantu pengguna Shopee Affiliate menghitung dan melihat ringkasan komisi langsung dari browser.',
  'beta'
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status;

create policy "Pengguna menghubungkan produk aktif ke akun sendiri"
on public.user_products for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and plan = 'free'
  and status = 'active'
  and exists (
    select 1
    from public.products
    where products.id = user_products.product_id
      and products.status in ('active', 'beta')
  )
);
