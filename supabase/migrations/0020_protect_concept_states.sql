-- Protect lesson progress from bad writes, and keep every earlier version of it.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0002_proficiency.sql and 0016_stored_proficiency.sql. Safe to re-run.
--
-- Until now an answer on a lesson could overwrite its prerequisites' rows with
-- states rebuilt from blank, and a failed read could let the next answer save a
-- fresh row over the real one. The client is fixed, but progress shouldn't
-- depend on every future client change being right, so the database enforces it.

-- 1. History: the previous version of a row, every time it changes or is deleted.
create table if not exists public.concept_states_history (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  concept_id text not null,
  ability_mean double precision not null,
  ability_variance double precision not null,
  observations integer not null,
  stability double precision,
  difficulty double precision,
  last_reviewed_at timestamptz,
  reps integer not null,
  lapses integer not null,
  proficiency double precision,
  updated_at timestamptz not null,
  replaced_at timestamptz not null default now(),
  operation text not null check (operation in ('UPDATE', 'DELETE'))
);

create index if not exists concept_states_history_user_concept
  on public.concept_states_history (user_id, concept_id, replaced_at desc);

alter table public.concept_states_history enable row level security;

drop policy if exists "users read their own concept state history" on public.concept_states_history;
create policy "users read their own concept state history"
  on public.concept_states_history for select
  to authenticated
  using (auth.uid() = user_id);
-- No insert/update/delete policies: only the trigger below writes here.

create or replace function public.archive_concept_state()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.concept_states_history (
    user_id, concept_id, ability_mean, ability_variance, observations, stability, difficulty,
    last_reviewed_at, reps, lapses, proficiency, updated_at, operation
  ) values (
    old.user_id, old.concept_id, old.ability_mean, old.ability_variance, old.observations, old.stability,
    old.difficulty, old.last_reviewed_at, old.reps, old.lapses, old.proficiency, old.updated_at, tg_op
  );
  return null;
end;
$$;

drop trigger if exists archive_concept_state on public.concept_states;
create trigger archive_concept_state
  after update or delete on public.concept_states
  for each row execute function public.archive_concept_state();

-- 2. Guard: an update may never lower a lesson's answer count. Every real answer
-- adds one and nothing legitimately removes one, so a lower count means the
-- write was built from a blank or stale state. Such a write is dropped and the
-- saved row kept. A null proficiency never replaces a stored one either.
create or replace function public.guard_concept_state()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.observations < old.observations then
    return null;
  end if;
  if new.proficiency is null then
    new.proficiency := old.proficiency;
  end if;
  return new;
end;
$$;

drop trigger if exists guard_concept_state on public.concept_states;
create trigger guard_concept_state
  before update on public.concept_states
  for each row execute function public.guard_concept_state();

notify pgrst, 'reload schema';
