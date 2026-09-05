-- Rubric detail on the review log.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0002_proficiency.sql. Safe to re-run.
--
-- Under the grading.md pipeline every grader — exact, math engine, and LLM —
-- emits rubric scores, and the final mark is a pure function of those. Storing
-- the per-element credit therefore makes the log replayable: if a rubric's
-- weights change, or a required flag is added, past responses can be re-scored
-- offline instead of being re-sent to the model. Storing only the final score
-- would throw that away.

alter table public.assessment_responses
  add column if not exists breakdown jsonb,
  -- What we believed the learner wrote or said, for handwritten and spoken
  -- answers. The transcript is what was actually graded, so an appeal about a
  -- misread symbol is unanswerable without it.
  add column if not exists transcript text,
  add column if not exists transcript_confidence double precision,
  -- Grader confidence. Low values mark responses for human re-grading, which is
  -- what the judge/human agreement statistic in assessment.md §4 is computed on.
  add column if not exists confidence double precision not null default 1;

-- Finding the responses that need a human look is the common query against
-- this table, and it is a small fraction of rows — so a partial index.
create index if not exists responses_low_confidence_idx
  on public.assessment_responses (created_at desc)
  where confidence < 0.6;

notify pgrst, 'reload schema';
