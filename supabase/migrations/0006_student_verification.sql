-- Student verification via .edu email: a discount flag, a school field for
-- the profile, and a school-scoped forum board.
--
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001_discussion.sql and 0005_profiles_public.sql to have run first.
--
-- Design notes:
--  * `school` stores the raw email domain (e.g. "ucla.edu"), not a display
--    name — the friendly name-per-domain mapping lives in the client
--    (web/src/data/eduDomains.ts) so adding a school there needs no migration.
--  * Both columns are derived server-side from auth.users.email at signup
--    time, never settable by the user directly — a profile update from the
--    client only ever touches display_name/username/bio/show_* (see
--    updateOwnProfile in web/src/lib/profiles.ts), so there is no path for a
--    user to grant themselves student status by editing their own row.
--  * The school forum reuses the existing generic `posts` table (concept_id
--    is plain text, not an FK — see 0001) with the synthetic id
--    `school:<domain>`. No new table is needed; only the insert policy gains
--    an extra check so only students of that school can post there.

alter table public.profiles
  add column if not exists school text,
  add column if not exists is_student boolean not null default false;

-- handle_new_user (from 0001, replaced by 0005) only set display_name and
-- username; replace it again so new signups also get is_student/school.
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
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(new.email, '@', 1),
    'Anonymous'
  );

  email_domain := lower(split_part(new.email, '@', 2));
  is_edu := new.email ~* '@[^@]+\.edu$';

  insert into public.profiles (id, display_name, username, school, is_student)
  values (
    new.id,
    chosen_name,
    lower(regexp_replace(chosen_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(new.id::text, 1, 8),
    case when is_edu then email_domain else null end,
    is_edu
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Backfill anyone who signed up before this migration ran.
update public.profiles p
set
  school = case when u.email ~* '@[^@]+\.edu$' then lower(split_part(u.email, '@', 2)) else null end,
  is_student = (u.email ~* '@[^@]+\.edu$')
from auth.users u
where u.id = p.id
  and p.school is null
  and not p.is_student;

-- ---------------------------------------------------------------------------
-- School board: only a student of that school may post in it
-- ---------------------------------------------------------------------------
-- Reads stay public (the existing "posts are publicly readable" select
-- policy already covers this, unchanged). This replaces 0001's insert policy
-- with the same author check, plus a school match for `school:` boards.

drop policy if exists "authenticated users can create their own posts" on public.posts;
create policy "authenticated users can create their own posts"
  on public.posts for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and (
      not (concept_id like 'school:%')
      or exists (
        select 1 from public.profiles p
        where p.id = auth.uid() and p.school = substr(concept_id, 8)
      )
    )
  );

notify pgrst, 'reload schema';
