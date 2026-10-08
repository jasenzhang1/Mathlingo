-- Interview prep: one definition of a question's acceptance rate.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0008_interview.sql. Safe to re-run.
--
-- Two migrations were both numbered 0017 and both defined
-- interview_question_stats(), one returning (students, solved) and the other
-- (attempts, solved). Postgres can't change a function's return columns with
-- "create or replace", so whichever ran second failed, and one of the two
-- problem lists read nothing. This drops it and settles on one definition.
--
-- Per question: how many students have answered it, and how many of them got
-- it right on their first answer. Each student is one vote: once they have
-- seen the key, answering again says nothing about how hard the question is.
-- "Right" is fully correct; "Partly" and "I don't know" are not.
--
-- interview_attempts is readable only by its owner, so the aggregate is
-- served through this function. It exposes counts, never who answered.

drop function if exists public.interview_question_stats();

create function public.interview_question_stats()
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
