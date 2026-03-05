-- Run this in the Supabase SQL Editor to delete the corrupted admin account
delete from auth.identities where email = 'admin@sarthigo.com';
delete from public.profiles where email = 'admin@sarthigo.com';
delete from auth.users where email = 'admin@sarthigo.com';
