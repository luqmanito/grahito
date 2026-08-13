-- Perangkat hanya dapat dicabut setelah aktif selama tujuh hari penuh.
-- activated_at direset setiap kali instalasi yang sama diotorisasi ulang.

alter table public.product_devices
add column activated_at timestamptz;

update public.product_devices
set activated_at = created_at
where activated_at is null;

alter table public.product_devices
alter column activated_at set default timezone('utc', now()),
alter column activated_at set not null;

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
    user_id,
    product_id,
    installation_id,
    device_name,
    platform,
    token_hash,
    active,
    activated_at,
    revoked_at
  ) values (
    activation.user_id,
    activation.product_id,
    p_installation_id,
    trim(p_device_name),
    nullif(trim(p_platform), ''),
    p_token_hash,
    true,
    timezone('utc', now()),
    null
  )
  on conflict (user_id, product_id, installation_id)
  do update set
    device_name = excluded.device_name,
    platform = excluded.platform,
    token_hash = excluded.token_hash,
    active = true,
    activated_at = timezone('utc', now()),
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
declare
  device_activated_at timestamptz;
begin
  select activated_at
  into device_activated_at
  from public.product_devices
  where id = p_device_id
    and user_id = (select auth.uid())
    and active = true
  for update;

  if device_activated_at is null then
    raise exception using errcode = 'P0001', message = 'DEVICE_NOT_FOUND';
  end if;

  if device_activated_at + interval '7 days' > timezone('utc', now()) then
    raise exception using
      errcode = 'P0001',
      message = 'DEVICE_REVOCATION_COOLDOWN';
  end if;

  update public.product_devices
  set active = false,
      revoked_at = timezone('utc', now())
  where id = p_device_id;
end;
$$;

revoke all on function public.revoke_own_product_device(uuid) from public, anon;
grant execute on function public.revoke_own_product_device(uuid) to authenticated;
