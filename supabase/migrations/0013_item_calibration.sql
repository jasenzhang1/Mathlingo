-- Living question difficulty: every answer pushes and pulls the question.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001 (profiles). Safe to re-run.
--
-- A question's authored difficulty is only a starting guess. Each graded
-- answer moves it, the way an Elo match moves both players: clear it more
-- often than your ability predicted and it gets easier; miss it and it gets
-- harder. How hard one learner pulls depends on their ability on the topic
-- (the hidden Elo) and on how sure we are of it, so a newcomer or a learner
-- whose proficiency has decayed moves it less than an established one.
--
-- The math mirrors updateItemBelief in web/src/lib/assessment/mastery.ts —
-- change both together. It runs here, not in the browser, so that two
-- learners answering at once serialise on the row instead of overwriting each
-- other.

create table if not exists public.item_calibration (
  -- 'lesson' for the assessment bank (web/src/data/items*), 'interview' for
  -- web/src/data/interview/questions.json. Ids are only unique within a bank.
  bank text not null check (bank in ('lesson', 'interview')),
  item_id text not null check (char_length(item_id) between 1 and 200),
  -- Logits, the same scale as learner ability.
  difficulty double precision not null,
  variance double precision not null,
  exposures integer not null default 0,
  -- What the author set, kept so the drift is visible in the developer views.
  authored_difficulty double precision not null,
  updated_at timestamptz not null default now(),
  primary key (bank, item_id)
);

alter table public.item_calibration enable row level security;

-- Difficulty is public: everyone is served the same calibrated questions,
-- signed in or not. Nobody writes the table directly; calibrate_item does.
drop policy if exists "anyone reads item calibration" on public.item_calibration;
create policy "anyone reads item calibration"
  on public.item_calibration for select to anon, authenticated
  using (true);

-- One pull per learner per question per day. Without it a learner could
-- answer the same question over and over to drag its difficulty around.
create table if not exists public.item_calibration_pulls (
  user_id uuid not null references public.profiles (id) on delete cascade,
  bank text not null,
  item_id text not null,
  pulled_at timestamptz not null default now(),
  primary key (user_id, bank, item_id)
);

alter table public.item_calibration_pulls enable row level security;
-- No policies: only calibrate_item (security definer) touches it.

create or replace function public.calibrate_item(
  p_bank text,
  p_item_id text,
  p_authored_difficulty double precision,
  p_discrimination double precision,
  p_score double precision,
  p_ability_mean double precision,
  p_ability_variance double precision
)
returns table (difficulty double precision, variance double precision, exposures integer)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_user uuid := auth.uid();
  -- Clamp everything the browser sends: a forged call can at most cast one
  -- ordinary, step-capped vote.
  v_score double precision := least(greatest(coalesce(p_score, 0), 0), 1);
  v_disc double precision := least(greatest(coalesce(p_discrimination, 1.2), 0.2), 3);
  v_mean double precision := least(greatest(coalesce(p_ability_mean, 0), -4), 4);
  v_var double precision := least(greatest(coalesce(p_ability_variance, 2.25), 0.04), 2.25);
  v_authored double precision := least(greatest(coalesce(p_authored_difficulty, 0), -4.5), 4.5);
  v_row public.item_calibration%rowtype;
  v_a double precision;
  v_p double precision;
  v_post double precision;
  v_step double precision;
begin
  if v_user is null then
    raise exception 'sign in to calibrate questions';
  end if;
  if p_bank not in ('lesson', 'interview') then
    raise exception 'unknown bank %', p_bank;
  end if;

  insert into public.item_calibration as c (bank, item_id, difficulty, variance, exposures, authored_difficulty)
  values (p_bank, p_item_id, v_authored, 0.5, 0, v_authored)
  on conflict (bank, item_id) do nothing;

  -- Lock the row: concurrent answers apply one after another.
  select * into v_row
    from public.item_calibration c
   where c.bank = p_bank and c.item_id = p_item_id
   for update;

  -- Already pulled on this question today: report it unchanged.
  if exists (
    select 1 from public.item_calibration_pulls u
     where u.user_id = v_user and u.bank = p_bank and u.item_id = p_item_id
       and u.pulled_at > now() - interval '20 hours'
  ) then
    return query select v_row.difficulty, v_row.variance, v_row.exposures;
    return;
  end if;

  -- The learner's uncertainty attenuates their pull (probit approximation).
  v_a := v_disc / sqrt(1 + pi() * v_disc * v_disc * v_var / 8);
  v_p := 1 / (1 + exp(-v_a * (v_mean - v_row.difficulty)));
  v_post := 1 / (1 / v_row.variance + v_a * v_a * v_p * (1 - v_p));
  v_step := least(greatest(v_post * v_a * (v_score - v_p), -0.3), 0.3);

  update public.item_calibration c
     set difficulty = least(greatest(v_row.difficulty - v_step, -4.5), 4.5),
         variance = greatest(v_post, 0.02),
         exposures = v_row.exposures + 1,
         updated_at = now()
   where c.bank = p_bank and c.item_id = p_item_id
  returning c.difficulty, c.variance, c.exposures
    into v_row.difficulty, v_row.variance, v_row.exposures;

  insert into public.item_calibration_pulls (user_id, bank, item_id, pulled_at)
  values (v_user, p_bank, p_item_id, now())
  on conflict (user_id, bank, item_id) do update set pulled_at = excluded.pulled_at;

  return query select v_row.difficulty, v_row.variance, v_row.exposures;
end;
$$;

revoke all on function public.calibrate_item(text, text, double precision, double precision, double precision, double precision, double precision) from public;
grant execute on function public.calibrate_item(text, text, double precision, double precision, double precision, double precision, double precision) to authenticated;
