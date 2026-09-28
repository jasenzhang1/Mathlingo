-- Interview prep: its own subscription, its own skill bars.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001_discussion.sql (public.profiles) and 0004_billing.sql. Safe to re-run.
--
-- Interview prep is a separate monthly product, bought alongside (or instead
-- of) a learning plan. It is not a rung on the free < graded < tutored ladder,
-- so it cannot be a value of subscriptions.tier: a customer can hold both at
-- once, as two Stripe subscriptions on one Stripe customer. The customer id
-- stays on public.subscriptions; this table holds only the second
-- subscription's state.

create table if not exists public.interview_subscriptions (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  stripe_subscription_id text unique,
  -- Stripe's status vocabulary, verbatim, as in public.subscriptions.
  status text not null default 'inactive',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.interview_subscriptions enable row level security;

-- Read your own row. No write policy: the Stripe webhook (service role) is the
-- only writer, exactly as for public.subscriptions.
drop policy if exists "users read their own interview subscription" on public.interview_subscriptions;
create policy "users read their own interview subscription"
  on public.interview_subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

-- Same entitlement rule as effective_tier: paying statuses only, with a short
-- grace period past the period end.
create or replace function public.has_interview_access(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.interview_subscriptions s
     where s.user_id = p_user_id
       and s.status in ('active', 'trialing', 'past_due')
       and (s.current_period_end is null or s.current_period_end > now() - interval '3 days')
  );
$$;

grant execute on function public.has_interview_access(uuid) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Skill bars
-- ---------------------------------------------------------------------------
-- One ability belief per (user, interview section). Separate from
-- public.concept_states on purpose: interview practice never moves lesson
-- proficiency, and lesson assessment never moves these.

create table if not exists public.interview_skills (
  user_id uuid not null references public.profiles (id) on delete cascade,
  -- web/src/data/interview/sections.json id, e.g. '234-reflection-principle'
  section_id text not null,
  ability_mean double precision not null,
  ability_variance double precision not null,
  observations integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, section_id)
);

alter table public.interview_skills enable row level security;

drop policy if exists "users read their own interview skills" on public.interview_skills;
create policy "users read their own interview skills"
  on public.interview_skills for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users insert their own interview skills" on public.interview_skills;
create policy "users insert their own interview skills"
  on public.interview_skills for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users update their own interview skills" on public.interview_skills;
create policy "users update their own interview skills"
  on public.interview_skills for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Every answer, for recalibrating question difficulty from real response data.
create table if not exists public.interview_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  question_id text not null,
  section_id text,
  correctness real not null,
  seconds integer not null,
  score real not null,
  mode text not null check (mode in ('mock', 'train')),
  created_at timestamptz not null default now()
);

create index if not exists interview_attempts_question_idx on public.interview_attempts (question_id);

alter table public.interview_attempts enable row level security;

drop policy if exists "users read their own interview attempts" on public.interview_attempts;
create policy "users read their own interview attempts"
  on public.interview_attempts for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users insert their own interview attempts" on public.interview_attempts;
create policy "users insert their own interview attempts"
  on public.interview_attempts for insert to authenticated
  with check (auth.uid() = user_id);

notify pgrst, 'reload schema';
