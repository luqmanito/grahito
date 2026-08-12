-- Tandai produk sebagai tersedia secara publik. Mekanisme hubungan akun tetap
-- menggunakan kebijakan RLS dari migration sebelumnya.

update public.products
set status = 'active'
where slug = 'kalkulator-komisi-shopee';
