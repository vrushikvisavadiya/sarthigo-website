-- ── Cities ───────────────────────────────────────────────────
create table if not exists public.cities (
  id             uuid primary key default uuid_generate_v4(),
  slug           text not null unique,
  name           text not null,
  icon           text not null,
  tagline        text,
  description    text,
  hero_image_url text,
  active         boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

-- Row-Level Security
alter table public.cities enable row level security;
create policy "cities_public_read" on public.cities for select using (active = true);
create policy "cities_admin_all" on public.cities for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
