-- ── FAQ ──────────────────────────────────────────────────────
create table if not exists public.faq (
  id          uuid primary key default uuid_generate_v4(),
  category    text not null,       -- booking | payment | drivers | trips | cancellation | drivers-join
  question    text not null,
  answer      text not null,
  sort_order  int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Row-Level Security
alter table public.faq enable row level security;
create policy "faq_public_read" on public.faq for select using (active = true);
create policy "faq_admin_all" on public.faq for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
