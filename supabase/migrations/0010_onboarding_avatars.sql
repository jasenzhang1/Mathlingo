-- First-run username choice, profile pictures, and a fix to what a user may
-- edit on their own profile.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001, 0005 and 0006. Safe to re-run.

-- ---------------------------------------------------------------------------
-- 1. New columns
-- ---------------------------------------------------------------------------
-- `username_chosen`: the signup trigger can only generate a placeholder
-- username ("jane-doe-1a2b3c4d"); the app sends a new account to a "choose a
-- username" screen until this is true. `avatar_url`: a picture URL — the
-- Google photo by default, or an upload in the `avatars` bucket.

alter table public.profiles
  add column if not exists avatar_url text,
  add column if not exists username_chosen boolean not null default false;

-- Everyone who signed up before this migration already has a username they
-- have been using; don't stop them at the door. Only accounts created after
-- this point start with username_chosen = false. (Guarded by a marker so a
-- re-run doesn't mark newer accounts as done.)
do $$
begin
  if not exists (
    select 1 from pg_catalog.pg_description d
      join pg_catalog.pg_class c on c.oid = d.objoid
     where c.relname = 'profiles' and d.description like '%onboarding-backfilled%'
  ) then
    update public.profiles set username_chosen = true;
    comment on table public.profiles is 'User profiles. onboarding-backfilled';
  end if;
end;
$$;

-- Existing Google users: take their Google picture as the default avatar.
update public.profiles p
set avatar_url = coalesce(u.raw_user_meta_data ->> 'avatar_url', u.raw_user_meta_data ->> 'picture')
from auth.users u
where u.id = p.id
  and p.avatar_url is null
  and coalesce(u.raw_user_meta_data ->> 'avatar_url', u.raw_user_meta_data ->> 'picture') is not null;

-- ---------------------------------------------------------------------------
-- 2. Signup trigger: also copy the Google picture; username is a placeholder
-- ---------------------------------------------------------------------------
-- Display name: the full name from Google, or from the email signup form
-- (sent as `full_name` metadata), falling back to the email's local part.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  chosen_name text;
  email_domain text;
  is_edu boolean;
begin
  chosen_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
    split_part(new.email, '@', 1),
    'Anonymous'
  );

  email_domain := lower(split_part(new.email, '@', 2));
  is_edu := new.email ~* '@[^@]+\.edu$';

  insert into public.profiles (id, display_name, username, school, is_student, avatar_url, username_chosen)
  values (
    new.id,
    chosen_name,
    -- Placeholder until the user picks one; the suffix keeps it unique. A
    -- name with no a–z/0–9 characters (e.g. written in another script) falls
    -- back to "user", or the username format check would reject the signup.
    coalesce(
      nullif(trim(both '-' from left(lower(regexp_replace(chosen_name, '[^a-zA-Z0-9]+', '-', 'g')), 20)), ''),
      'user'
    ) || '-' || substr(new.id::text, 1, 8),
    case when is_edu then email_domain else null end,
    is_edu,
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture'),
    false
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- 3. What a user may edit on their own row
-- ---------------------------------------------------------------------------
-- The update policy from 0001 lets a user update their own row — every
-- column of it, including `is_student`, which stripe-checkout trusts for the
-- student discount, and `school`, which gates the school forum. Column
-- privileges close that: only the fields the profile editor actually writes
-- are updatable. The signup trigger (security definer) and the service role
-- are unaffected.

revoke update on public.profiles from anon, authenticated;
grant update (display_name, username, bio, show_proficiency, show_achievements, avatar_url, username_chosen)
  on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- 4. Avatar storage
-- ---------------------------------------------------------------------------
-- A public bucket (pictures are shown to everyone), 2 MB per image, images
-- only. Each user may write only inside a folder named after their own id:
-- avatars/<user-id>/avatar.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "avatars: users read their own folder" on storage.objects;
create policy "avatars: users read their own folder"
  on storage.objects for select to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars: users upload to their own folder" on storage.objects;
create policy "avatars: users upload to their own folder"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars: users replace their own" on storage.objects;
create policy "avatars: users replace their own"
  on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars: users delete their own" on storage.objects;
create policy "avatars: users delete their own"
  on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

notify pgrst, 'reload schema';
