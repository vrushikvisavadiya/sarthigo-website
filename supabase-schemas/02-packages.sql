-- ── Packages ────────────────────────────────────────────────
create table if not exists public.packages (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  slug        text not null unique,
  city        text not null,
  trip_type   text not null default 'day-trip',  -- day-trip | 2day | 3day | custom
  cars        text[] not null default '{}',       -- sedan | suv | innova | tempo
  duration    text not null,
  days        int not null default 1,
  nights      int not null default 0,
  price       int not null,
  price_display text not null,
  price_note  text,
  group_size  text,
  icon        text default '🛕',
  badge       text,
  popular     boolean not null default false,
  active      boolean not null default true,
  image_url   text,
  highlights  text[] not null default '{}',
  inclusions  text[] not null default '{}',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Row-Level Security
alter table public.packages enable row level security;
create policy "packages_public_read" on public.packages for select using (active = true);
create policy "packages_admin_all" on public.packages for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
