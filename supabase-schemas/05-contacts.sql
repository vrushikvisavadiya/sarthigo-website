-- ── Contacts ─────────────────────────────────────────────────
create table if not exists public.contacts (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  phone       text not null,
  email       text,
  subject     text not null,
  message     text not null,
  status      text not null default 'new' check (status in ('new', 'read', 'replied')),
  notes       text,                -- admin internal notes
  created_at  timestamptz not null default now()
);

-- Row-Level Security
alter table public.contacts enable row level security;
create policy "contacts_public_insert" on public.contacts for insert with check (true);
create policy "contacts_admin_all" on public.contacts for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
