-- Lifetime purchases: a one-time payment for permanent access to a tier
-- (Graded, Tutored) or to interview prep.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0004_billing.sql and 0008_interview.sql. Safe to re-run.
--
-- Kept in its own table, not in `subscriptions`, because the subscription
-- webhook rewrites that row on every subscription event — a cancelled monthly
-- plan would otherwise wipe out a lifetime purchase made on the same account.
-- Effective access is the best of the two: an active subscription and any
-- lifetime purchase.

create table if not exists public.lifetime_purchases (
  -- One Checkout session, one purchase: makes webhook retries idempotent.
  stripe_checkout_session_id text primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  -- 'graded' | 'tutored' | 'interview'. Mirrors web/src/lib/billing/tiers.ts.
  product text not null check (product in ('graded', 'tutored', 'interview')),
  amount_total integer,
  currency text,
  purchased_at timestamptz not null default now()
);

create index if not exists lifetime_purchases_user_idx on public.lifetime_purchases (user_id);

alter table public.lifetime_purchases enable row level security;

-- Read your own purchases; no write policy. As with subscriptions, the Stripe
-- webhook (service role) is the only writer — entitlement is money.
drop policy if exists "users read their own lifetime purchases" on public.lifetime_purchases;
create policy "users read their own lifetime purchases"
  on public.lifetime_purchases for select
  to authenticated
  using (auth.uid() = user_id);

-- The best of an active subscription and any lifetime tier purchase.
create or replace function public.effective_tier(p_user_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case greatest(
      coalesce(
        (select public.tier_rank(s.tier)
           from public.subscriptions s
          where s.user_id = p_user_id
            and s.status in ('active', 'trialing', 'past_due')
            and (s.current_period_end is null or s.current_period_end > now() - interval '3 days')),
        0),
      coalesce(
        (select max(public.tier_rank(l.product))
           from public.lifetime_purchases l
          where l.user_id = p_user_id
            and l.product in ('graded', 'tutored')),
        0))
    when 2 then 'tutored'
    when 1 then 'graded'
    else 'free'
  end;
$$;

-- Interview access: an active interview subscription, or a lifetime purchase.
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
  ) or exists (
    select 1
      from public.lifetime_purchases l
     where l.user_id = p_user_id
       and l.product = 'interview'
  );
$$;

grant execute on function public.effective_tier(uuid) to authenticated, service_role;
grant execute on function public.has_interview_access(uuid) to authenticated, service_role;

notify pgrst, 'reload schema';
