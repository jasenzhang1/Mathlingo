-- Feedback on questions, from learners and developers (assessment.md §4.3).
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001 (profiles). Safe to re-run.
--
-- A "Feedback on this question" control sits on every assessment question.
-- Learners report problems (ambiguous wording, a wrong key, grading that was
-- too strict); developers leave notes for themselves while working through
-- questions. Developers read and resolve everything from /dev/questions.

-- The developer allowlist, mirroring DEV_EMAILS in web/src/lib/dev/devAuth.ts.
-- There is no role column yet; change both lists together.
create or replace function public.is_developer()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') in ('jasenzhang@g.ucla.edu', 'jasen.zhang.2008@gmail.com');
$$;

grant execute on function public.is_developer() to anon, authenticated;

create table if not exists public.item_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  bank text not null default 'lesson' check (bank in ('lesson', 'interview')),
  item_id text not null check (char_length(item_id) between 1 and 200),
  concept_id text,
  reason text not null check (reason in (
    'too-strict', 'wrong-key', 'ambiguous', 'typo', 'off-topic', 'too-easy', 'too-hard', 'other'
  )),
  message text not null default '' check (char_length(message) <= 4000),
  -- What the learner saw and wrote: templated questions draw fresh numbers
  -- each time, so the stem is kept as shown.
  stem_shown text check (char_length(stem_shown) <= 10000),
  answer text check (char_length(answer) <= 10000),
  score double precision,
  from_developer boolean not null default false,
  status text not null default 'open' check (status in ('open', 'resolved')),
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists item_feedback_open_idx
  on public.item_feedback (status, created_at desc);

alter table public.item_feedback enable row level security;

drop policy if exists "users send feedback" on public.item_feedback;
create policy "users send feedback"
  on public.item_feedback for insert to authenticated
  with check (
    auth.uid() = user_id
    and status = 'open'
    -- Only developers may mark feedback as theirs.
    and (not from_developer or public.is_developer())
  );

drop policy if exists "users read their own feedback; developers read all" on public.item_feedback;
create policy "users read their own feedback; developers read all"
  on public.item_feedback for select to authenticated
  using (auth.uid() = user_id or public.is_developer());

drop policy if exists "developers resolve feedback" on public.item_feedback;
create policy "developers resolve feedback"
  on public.item_feedback for update to authenticated
  using (public.is_developer())
  with check (public.is_developer());
