-- Kode aktivasi hanya boleh diterbitkan oleh web authorization flow pada
-- backend tepercaya. Hapus kemampuan pengguna membuat kode secara langsung.

drop policy if exists "Pengguna membuat kode aktivasi untuk produk terhubung"
on public.product_device_activation_codes;
