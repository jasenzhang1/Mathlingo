-- Subscriptions and entitlements.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001_discussion.sql (for public.profiles). Safe to re-run.
--
-- No card data is stored here, ever. Stripe Checkout collects payment details on
-- Stripe's own domain and this table holds only identifiers and the resulting
-- entitlement, which is what keeps the app out of PCI-DSS scope.

create table if not exists public.subscriptions (
  user_id uuid primary key references public.profiles (id) on delete cascade,

  stripe_customer_id text unique,
  stripe_subscription_id text unique,

  -- 'free' | 'graded' | 'tutored'. Mirrors web/src/lib/billing/tiers.ts.
  tier text not null default 'free' check (tier in ('free', 'graded', 'tutored')),

  -- Stripe's own status vocabulary, stored verbatim so it can be reasoned about
  -- without a translation layer that would need updating alongside Stripe.
  status text not null default 'inactive',

  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,

  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_customer_idx
  on public.subscriptions (stripe_customer_id);

alter table public.subscriptions enable row level security;

-- A user may READ their own subscription and nothing else.
--
-- There is deliberately NO insert or update policy for authenticated users.
-- Entitlement is money, so the only writer is the Stripe webhook, which runs
-- with the service role and bypasses RLS. If users could write this table they
-- could grant themselves a paid tier with a single PostgREST call.
drop policy if exists "users read their own subscription" on public.subscriptions;
create policy "users read their own subscription"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Entitlement helper
-- ---------------------------------------------------------------------------
-- Tiers are ordered, so a check is "rank >= required rank" rather than a set
-- membership test that has to be edited every time a tier is added.

create or replace function public.tier_rank(tier text)
returns integer
language sql
immutable
as $$
  select case tier
    when 'tutored' then 2
    when 'graded'  then 1
    else 0
  end;
$$;

-- A subscription only entitles while it is actually paying. 'trialing' counts;
-- 'past_due' deliberately does too, for a short grace period — cutting a
-- paying customer off the instant a card renewal blips is a good way to lose
-- them over a bank's temporary decline.
create or replace function public.effective_tier(p_user_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select s.tier
       from public.subscriptions s
      where s.user_id = p_user_id
        and s.status in ('active', 'trialing', 'past_due')
        and (s.current_period_end is null or s.current_period_end > now() - interval '3 days')),
    'free'
  );
$$;

grant execute on function public.effective_tier(uuid) to authenticated, service_role;
grant execute on function public.tier_rank(text) to authenticated, service_role;

notify pgrst, 'reload schema';
