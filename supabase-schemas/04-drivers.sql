-- ── Drivers ──────────────────────────────────────────────────
create table if not exists public.drivers (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.profiles(id) on delete set null,
  name            text not null,
  phone           text not null unique,
  email           text not null unique,
  city            text not null,
  vehicle_type    text not null,   -- sedan | suv | innova | tempo
  vehicle_number  text,
  license_url     text,
  rc_url          text,
  insurance_url   text,
  photo_url       text,
  plan            text not null default 'free', -- free | starter | pro
  status          text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_note  text,
  bio             text,
  languages       text[] default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Row-Level Security
alter table public.drivers enable row level security;
create policy "drivers_public_insert" on public.drivers for insert with check (true);
create policy "drivers_read_own" on public.drivers for select using (user_id = auth.uid());
create policy "drivers_admin_all" on public.drivers for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
