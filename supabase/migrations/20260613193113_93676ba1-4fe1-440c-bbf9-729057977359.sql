
-- ROLES
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(auth.uid(), 'admin')
$$;

create policy "Admins can view roles"
  on public.user_roles for select
  to authenticated
  using (public.is_admin());

-- PRODUCTS
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('games', 'streaming')),
  name text not null,
  short_description text not null default '',
  description text not null default '',
  rules text not null default '',
  warranty text not null default '',
  price numeric(10,2) not null default 0,
  image text not null default '',
  banner_image text not null default '',
  stock integer not null default 0,
  is_active boolean not null default true,
  is_sold_out boolean not null default false,
  delivery_type text not null default 'auto',
  variations jsonb not null default '[]'::jsonb,
  data jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.products to anon, authenticated;
grant all on public.products to authenticated;
grant all on public.products to service_role;

alter table public.products enable row level security;

-- Public can read only active products
create policy "Public can view active products"
  on public.products for select
  to anon, authenticated
  using (is_active = true);

-- Admins can view everything
create policy "Admins can view all products"
  on public.products for select
  to authenticated
  using (public.is_admin());

create policy "Admins can insert products"
  on public.products for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update products"
  on public.products for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete products"
  on public.products for delete
  to authenticated
  using (public.is_admin());

create index products_category_idx on public.products (category, sort_order);
create index products_active_idx on public.products (is_active);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();
