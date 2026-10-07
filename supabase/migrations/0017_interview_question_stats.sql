-- Interview prep: per-question acceptance rate for the problem list.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0008_interview.sql. Safe to re-run.
--
-- public.interview_attempts is readable only row by row by its owner, so the
-- list cannot count other people's answers itself. This returns the totals
-- only (no user ids), the way LeetCode shows an acceptance rate.

create or replace function public.interview_question_stats()
returns table (question_id text, attempts bigint, solved bigint)
language sql
stable
security definer
set search_path = public
as $$
  select a.question_id,
         count(*) as attempts,
         count(*) filter (where a.correctness >= 1) as solved
    from public.interview_attempts a
   group by a.question_id;
$$;

grant execute on function public.interview_question_stats() to authenticated;

notify pgrst, 'reload schema';
