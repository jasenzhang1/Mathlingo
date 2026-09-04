-- Per-user proficiency state for the assessment engine.
--
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001_discussion.sql to have run first (it creates public.profiles).
--
-- The columns mirror the engine's types in web/src/lib/assessment/types.ts:
--   ability_mean / ability_variance / observations  -> Ability   (IRT belief)
--   stability / difficulty / last_reviewed_at / reps / lapses -> MemoryState (FSRS)
-- Storing the raw state rather than a computed score keeps the server dumb:
-- proficiency is always recomputed by the same client-side engine, so the
-- formula can change without a data migration.

create table if not exists public.concept_states (
  user_id uuid not null references public.profiles (id) on delete cascade,
  concept_id text not null,

  -- IRT ability belief (logit scale)
  ability_mean double precision not null default 0,
  ability_variance double precision not null default 2.25,
  observations integer not null default 0,

  -- FSRS memory state; null until the first graded review
  stability double precision,
  difficulty double precision,
  last_reviewed_at timestamptz,
  reps integer not null default 0,
  lapses integer not null default 0,

  updated_at timestamptz not null default now(),
  primary key (user_id, concept_id)
);

alter table public.concept_states enable row level security;

-- Proficiency is private: unlike the forum, a user may only ever read or write
-- their own rows.
--
-- Postgres has no "create policy if not exists", so each policy is dropped
-- first. That makes the whole file safe to re-run — which matters, because the
-- usual reason to re-run it is that a previous attempt failed partway through.
drop policy if exists "users read their own concept state" on public.concept_states;
create policy "users read their own concept state"
  on public.concept_states for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users insert their own concept state" on public.concept_states;
create policy "users insert their own concept state"
  on public.concept_states for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users update their own concept state" on public.concept_states;
create policy "users update their own concept state"
  on public.concept_states for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- responses: the full review log
-- ---------------------------------------------------------------------------
-- Kept append-only because the engine's batch re-fit (assessment.md §3.6) and
-- item calibration (§4.1) both replay this log. Deleting rows would silently
-- corrupt those, so there is deliberately no delete policy.

create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  concept_id text not null,
  item_id text not null,

  answer text not null default '',
  score double precision not null check (score between 0 and 1),
  latency_seconds double precision not null default 0,
  channel text not null default 'typed' check (channel in ('typed', 'handwritten', 'spoken')),
  adjudicator text not null default 'tolerance',
  /** Item difficulty at grading time, so a later re-calibration can be replayed. */
  item_difficulty double precision not null default 0,
  item_discrimination double precision not null default 1.2,
  feedback text,

  created_at timestamptz not null default now()
);

create index if not exists responses_user_concept_idx
  on public.assessment_responses (user_id, concept_id, created_at desc);

alter table public.assessment_responses enable row level security;

drop policy if exists "users read their own responses" on public.assessment_responses;
create policy "users read their own responses"
  on public.assessment_responses for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users insert their own responses" on public.assessment_responses;
create policy "users insert their own responses"
  on public.assessment_responses for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- PostgREST caches the schema, and serves "Could not find the table
-- 'public.concept_states' in the schema cache" until it reloads. Supabase
-- normally reloads on its own within a few seconds; this makes it immediate.
notify pgrst, 'reload schema';
