-- Public profile pages: a username to route on, a bio, and per-user opt-ins
-- for what a visitor gets to see.
--
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001_discussion.sql to have run first (it creates public.profiles).

alter table public.profiles
  add column if not exists username text,
  add column if not exists bio text check (char_length(bio) <= 500),
  add column if not exists show_proficiency boolean not null default false,
  add column if not exists show_achievements boolean not null default false;

-- Backfilled from display_name, deterministically de-duplicated with a slice
-- of the row's own id — which is already unique, so this can never collide.
-- `handle_new_user` below does the same for everyone who signs up after.
update public.profiles
set username = lower(
  regexp_replace(coalesce(nullif(display_name, ''), 'user'), '[^a-zA-Z0-9]+', '-', 'g')
) || '-' || substr(id::text, 1, 8)
where username is null;

alter table public.profiles
  alter column username set not null;

-- Split from the statement above and drop-guarded so this file is re-runnable:
-- Postgres has no `add constraint if not exists`, so a second run of an
-- unguarded `add constraint` fails with 42710 the way an unguarded
-- `create policy` does.
alter table public.profiles
  drop constraint if exists profiles_username_format;

alter table public.profiles
  add constraint profiles_username_format
    check (username ~ '^[a-z0-9][a-z0-9-]{2,29}$');

create unique index if not exists profiles_username_key on public.profiles (username);

-- handle_new_user (from 0001) only set display_name; replace it so new
-- signups get a username the same way the backfill above does.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  chosen_name text;
begin
  chosen_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(new.email, '@', 1),
    'Anonymous'
  );

  insert into public.profiles (id, display_name, username)
  values (
    new.id,
    chosen_name,
    lower(regexp_replace(chosen_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(new.id::text, 1, 8)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- concept_states: readable by anyone when the owner has opted in
-- ---------------------------------------------------------------------------
-- This is an additional *permissive* policy alongside the owner-only one in
-- 0002_proficiency.sql — Postgres RLS ORs permissive policies together, so a
-- row is visible if either grants it. `to public` (the default) rather than
-- `to authenticated`, since a profile page has to work for signed-out
-- visitors too.

drop policy if exists "concept states are readable when the owner opts in" on public.concept_states;
create policy "concept states are readable when the owner opts in"
  on public.concept_states for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = concept_states.user_id and p.show_proficiency
    )
  );

notify pgrst, 'reload schema';
