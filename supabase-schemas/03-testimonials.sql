-- ── Testimonials ─────────────────────────────────────────────
create table if not exists public.testimonials (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  location    text not null,
  avatar      text not null,        -- initials e.g. "RP"
  rating      int not null default 5 check (rating between 1 and 5),
  trip        text not null,
  review      text not null,
  verified    boolean not null default false,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Row-Level Security
alter table public.testimonials enable row level security;
create policy "testimonials_public_read" on public.testimonials for select using (active = true);
create policy "testimonials_admin_all" on public.testimonials for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
