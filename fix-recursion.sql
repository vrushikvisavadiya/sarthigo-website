-- 1. Create a security definer function to avoid infinite recursion
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 2. Drop recursive policies
drop policy if exists "profiles_admin_all" on public.profiles;
drop policy if exists "contacts_admin_all" on public.contacts;
drop policy if exists "packages_admin_all" on public.packages;
drop policy if exists "testimonials_admin_all" on public.testimonials;
drop policy if exists "drivers_admin_all" on public.drivers;
drop policy if exists "cities_admin_all" on public.cities;
drop policy if exists "faq_admin_all" on public.faq;

-- 3. Replace with the optimized, safe function
create policy "profiles_admin_all" on public.profiles for all using (public.is_admin());
create policy "contacts_admin_all" on public.contacts for all using (public.is_admin());
create policy "packages_admin_all" on public.packages for all using (public.is_admin());
create policy "testimonials_admin_all" on public.testimonials for all using (public.is_admin());
create policy "drivers_admin_all" on public.drivers for all using (public.is_admin());
create policy "cities_admin_all" on public.cities for all using (public.is_admin());
create policy "faq_admin_all" on public.faq for all using (public.is_admin());
