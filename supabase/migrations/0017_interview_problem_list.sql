-- Interview problem list: every question in one LeetCode-style list, with a
-- difficulty that is simply the share of students who get it right.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0008_interview.sql. Safe to re-run.
--
-- Answers given from the list are logged like any other, under their own mode.

alter table public.interview_attempts drop constraint if exists interview_attempts_mode_check;
alter table public.interview_attempts
  add constraint interview_attempts_mode_check check (mode in ('mock', 'train', 'problems'));

-- Per question: how many students have answered it, and how many of them got
-- it right. Only each student's first answer counts: once they have seen the
-- key, answering again says nothing about how hard the question is. "Right"
-- is fully correct; "Partly" and "I don't know" are not.
--
-- interview_attempts is readable only by its owner, so the aggregate is
-- served through this function. It exposes counts, never who answered.
create or replace function public.interview_question_stats()
returns table (question_id text, students bigint, solved bigint)
language sql
stable
security definer
set search_path = public
as $$
  select f.question_id, count(*), count(*) filter (where f.correctness >= 1)
    from (
      select distinct on (a.user_id, a.question_id) a.question_id, a.correctness
        from public.interview_attempts a
       order by a.user_id, a.question_id, a.created_at, a.id
    ) f
   group by f.question_id;
$$;

grant execute on function public.interview_question_stats() to anon, authenticated;

notify pgrst, 'reload schema';
