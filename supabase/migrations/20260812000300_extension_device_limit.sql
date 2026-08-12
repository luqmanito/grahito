-- Otorisasi instalasi ekstensi tanpa menggunakan MAC address.
-- Chrome Extension membuat installation_id acak per instalasi; database
-- membatasi maksimal dua instalasi aktif per pengguna dan produk.

create table public.product_device_activation_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  code_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.product_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  installation_id uuid not null,
  device_name text not null check (char_length(device_name) between 1 and 80),
  platform text check (platform is null or char_length(platform) <= 40),
  token_hash text not null unique,
  active boolean not null default true,
  last_seen_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  revoked_at timestamptz,
  unique (user_id, product_id, installation_id)
);

create index product_device_codes_lookup_idx
on public.product_device_activation_codes(code_hash)
where used_at is null;

create index product_devices_user_product_idx
on public.product_devices(user_id, product_id)
where active = true;

create trigger product_devices_set_updated_at
before update on public.product_devices
for each row execute function public.set_updated_at();

create or replace function public.enforce_two_active_product_devices()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  active_count integer;
begin
  if not new.active then
    return new;
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(new.user_id::text || ':' || new.product_id::text, 0)
  );

  select count(*)
  into active_count
  from public.product_devices
  where user_id = new.user_id
    and product_id = new.product_id
    and active = true
    and id <> new.id;

  if active_count >= 2 then
    raise exception using
      errcode = 'P0001',
      message = 'DEVICE_LIMIT_REACHED';
  end if;

  return new;
end;
$$;

create trigger enforce_product_device_limit
before insert or update of active on public.product_devices
for each row execute function public.enforce_two_active_product_devices();

alter table public.product_device_activation_codes enable row level security;
alter table public.product_devices enable row level security;

create policy "Pengguna membuat kode aktivasi untuk produk terhubung"
on public.product_device_activation_codes for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and used_at is null
  and expires_at <= timezone('utc', now()) + interval '15 minutes'
  and exists (
    select 1
    from public.user_products
    where user_products.user_id = (select auth.uid())
      and user_products.product_id = product_device_activation_codes.product_id
      and user_products.status = 'active'
  )
);

create policy "Pengguna membaca perangkat sendiri"
on public.product_devices for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.exchange_product_device_code(
  p_code_hash text,
  p_installation_id uuid,
  p_device_name text,
  p_platform text,
  p_token_hash text
)
returns table (device_id uuid, owner_id uuid, linked_product_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
declare
  activation public.product_device_activation_codes%rowtype;
  linked_device_id uuid;
begin
  select *
  into activation
  from public.product_device_activation_codes
  where code_hash = p_code_hash
    and used_at is null
    and expires_at > timezone('utc', now())
  for update;

  if activation.id is null then
    raise exception using errcode = 'P0001', message = 'INVALID_OR_EXPIRED_CODE';
  end if;

  if not exists (
    select 1 from public.user_products
    where user_id = activation.user_id
      and product_id = activation.product_id
      and status = 'active'
  ) then
    raise exception using errcode = 'P0001', message = 'PRODUCT_NOT_CONNECTED';
  end if;

  insert into public.product_devices (
    user_id, product_id, installation_id, device_name, platform, token_hash, active, revoked_at
  ) values (
    activation.user_id,
    activation.product_id,
    p_installation_id,
    trim(p_device_name),
    nullif(trim(p_platform), ''),
    p_token_hash,
    true,
    null
  )
  on conflict (user_id, product_id, installation_id)
  do update set
    device_name = excluded.device_name,
    platform = excluded.platform,
    token_hash = excluded.token_hash,
    active = true,
    revoked_at = null
  returning id into linked_device_id;

  update public.product_device_activation_codes
  set used_at = timezone('utc', now())
  where id = activation.id;

  return query select linked_device_id, activation.user_id, activation.product_id;
end;
$$;

revoke all on function public.exchange_product_device_code(text, uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.exchange_product_device_code(text, uuid, text, text, text) to service_role;

create or replace function public.revoke_own_product_device(p_device_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.product_devices
  set active = false,
      revoked_at = timezone('utc', now())
  where id = p_device_id
    and user_id = (select auth.uid());

  if not found then
    raise exception using errcode = 'P0001', message = 'DEVICE_NOT_FOUND';
  end if;
end;
$$;

revoke all on function public.revoke_own_product_device(uuid) from public, anon;
grant execute on function public.revoke_own_product_device(uuid) to authenticated;
