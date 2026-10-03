-- Leaderboards, follows, chat, and leaderboard achievements.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001 (profiles, posts, post_votes), 0002 (concept_states,
-- assessment_responses), 0005 (usernames), 0007 (analogies). Safe to re-run.
--
-- Leaderboards read other learners' progress, which RLS keeps private, so
-- every board is computed by one security-definer function that returns only
-- public profile fields and a single number per person — never the
-- underlying rows. Learners can opt out with profiles.show_on_leaderboards.

-- ---------------------------------------------------------------------------
-- Opt-out, and the per-answer mastery change the "improvement" board sums
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists show_on_leaderboards boolean not null default true;

-- 0010 restricts profile updates to a column allowlist; add the new toggle.
grant update (show_on_leaderboards) on public.profiles to authenticated;

-- Bar height (0–100, un-decayed mastery) before and after each graded answer,
-- logged by the client with the response. Null for older rows.
alter table public.assessment_responses
  add column if not exists mastery_before double precision,
  add column if not exists mastery_after double precision;

-- ---------------------------------------------------------------------------
-- Follows
-- ---------------------------------------------------------------------------
create table if not exists public.follows (
  follower_id uuid not null references public.profiles (id) on delete cascade,
  followee_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followee_id),
  check (follower_id <> followee_id)
);

create index if not exists follows_followee_idx on public.follows (followee_id);

alter table public.follows enable row level security;

drop policy if exists "follows are publicly readable" on public.follows;
create policy "follows are publicly readable"
  on public.follows for select using (true);

drop policy if exists "users follow as themselves" on public.follows;
create policy "users follow as themselves"
  on public.follows for insert to authenticated
  with check (auth.uid() = follower_id);

drop policy if exists "users unfollow as themselves" on public.follows;
create policy "users unfollow as themselves"
  on public.follows for delete to authenticated
  using (auth.uid() = follower_id);

-- ---------------------------------------------------------------------------
-- Chat: a request must be accepted before either side can message
-- ---------------------------------------------------------------------------
create table if not exists public.chat_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  message text not null default '' check (char_length(message) <= 500),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  check (requester_id <> recipient_id),
  unique (requester_id, recipient_id)
);

alter table public.chat_requests enable row level security;

drop policy if exists "participants read chat requests" on public.chat_requests;
create policy "participants read chat requests"
  on public.chat_requests for select to authenticated
  using (auth.uid() in (requester_id, recipient_id));

drop policy if exists "users send chat requests as themselves" on public.chat_requests;
create policy "users send chat requests as themselves"
  on public.chat_requests for insert to authenticated
  with check (auth.uid() = requester_id and status = 'pending');

-- Only the recipient answers a request.
drop policy if exists "recipients answer chat requests" on public.chat_requests;
create policy "recipients answer chat requests"
  on public.chat_requests for update to authenticated
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

-- Either side can withdraw or clear a request.
drop policy if exists "participants delete chat requests" on public.chat_requests;
create policy "participants delete chat requests"
  on public.chat_requests for delete to authenticated
  using (auth.uid() in (requester_id, recipient_id));

create or replace function public.can_chat(a uuid, b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.chat_requests r
     where r.status = 'accepted'
       and ((r.requester_id = a and r.recipient_id = b) or (r.requester_id = b and r.recipient_id = a))
  );
$$;

grant execute on function public.can_chat(uuid, uuid) to authenticated;

create table if not exists public.direct_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists direct_messages_pair_idx
  on public.direct_messages (least(sender_id, recipient_id), greatest(sender_id, recipient_id), created_at);

alter table public.direct_messages enable row level security;

drop policy if exists "participants read messages" on public.direct_messages;
create policy "participants read messages"
  on public.direct_messages for select to authenticated
  using (auth.uid() in (sender_id, recipient_id));

drop policy if exists "accepted chats can message" on public.direct_messages;
create policy "accepted chats can message"
  on public.direct_messages for insert to authenticated
  with check (auth.uid() = sender_id and public.can_chat(sender_id, recipient_id));

-- The recipient marks messages read; nothing else about a message changes.
drop policy if exists "recipients mark messages read" on public.direct_messages;
create policy "recipients mark messages read"
  on public.direct_messages for update to authenticated
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

-- ---------------------------------------------------------------------------
-- Stored achievements (leaderboard placements; written by the server only)
-- ---------------------------------------------------------------------------
create table if not exists public.user_achievements (
  user_id uuid not null references public.profiles (id) on delete cascade,
  achievement_id text not null,
  label text not null,
  detail text,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

alter table public.user_achievements enable row level security;

-- Readable when the owner shows achievements on their profile (or it's you).
drop policy if exists "achievements follow the profile opt-in" on public.user_achievements;
create policy "achievements follow the profile opt-in"
  on public.user_achievements for select
  using (
    auth.uid() = user_id
    or exists (select 1 from public.profiles p where p.id = user_id and p.show_achievements)
  );

-- ---------------------------------------------------------------------------
-- The boards
-- ---------------------------------------------------------------------------
-- p_board:    'mastery' | 'answered' | 'improvement' | 'karma' | 'posts' | 'analogies'
-- p_period:   'day' | 'week' | 'month' | 'year' | 'all' (rolling windows; ignored by 'mastery')
-- p_concepts: for 'mastery', the course's concept ids (the curriculum lives in
--             the app, not the database); the score is the course average,
--             unattempted concepts counting 0.
-- p_label:    human name of the board, used in achievement labels.
--
-- Reading a board also records placements: the top 20 earn "Top 20", the top
-- 3 "Top 3" and the leader "#1" for that board and period — once each, kept
-- even after they drop off.
create or replace function public.leaderboard(
  p_board text,
  p_period text default 'all',
  p_concepts text[] default null,
  p_label text default null
)
returns table (
  rank integer,
  user_id uuid,
  username text,
  display_name text,
  avatar_url text,
  value double precision
)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_since timestamptz := case p_period
    when 'day' then now() - interval '1 day'
    when 'week' then now() - interval '7 days'
    when 'month' then now() - interval '30 days'
    when 'year' then now() - interval '365 days'
    else '-infinity'::timestamptz
  end;
  v_period_label text := case p_period
    when 'day' then 'today'
    when 'week' then 'this week'
    when 'month' then 'this month'
    when 'year' then 'this year'
    else 'all time'
  end;
  v_scope text := coalesce(p_label, p_board);
begin
  if p_board not in ('mastery', 'answered', 'improvement', 'karma', 'posts', 'analogies') then
    raise exception 'unknown leaderboard %', p_board;
  end if;

  create temporary table if not exists _lb (user_id uuid, value double precision) on commit drop;
  truncate _lb;

  if p_board = 'mastery' then
    insert into _lb
      select s.user_id,
             sum(100.0 / (1 + exp(-1.2 * s.ability_mean))) / greatest(coalesce(array_length(p_concepts, 1), 0), 1)
        from public.concept_states s
       where s.observations > 0
         and s.concept_id = any (coalesce(p_concepts, array[]::text[]))
       group by s.user_id;
  elsif p_board = 'answered' then
    insert into _lb
      select r.user_id, count(*)::double precision
        from public.assessment_responses r
       where r.created_at >= v_since
       group by r.user_id;
  elsif p_board = 'improvement' then
    insert into _lb
      select r.user_id, sum(r.mastery_after - r.mastery_before)
        from public.assessment_responses r
       where r.created_at >= v_since
         and r.mastery_before is not null and r.mastery_after is not null
       group by r.user_id;
  elsif p_board = 'karma' then
    insert into _lb
      select author_id, sum(value)::double precision from (
        select p.author_id, v.value from public.post_votes v
          join public.posts p on p.id = v.post_id
         where v.created_at >= v_since and v.user_id <> p.author_id
        union all
        select a.author_id, v.value from public.analogy_votes v
          join public.analogies a on a.id = v.analogy_id
         where v.created_at >= v_since and v.user_id <> a.author_id
      ) votes
      group by author_id;
  elsif p_board = 'posts' then
    insert into _lb
      select p.author_id, count(*)::double precision
        from public.posts p
       where p.created_at >= v_since
       group by p.author_id;
  else
    insert into _lb
      select a.author_id, count(*)::double precision
        from public.analogies a
       where a.created_at >= v_since
       group by a.author_id;
  end if;

  create temporary table if not exists _ranked (
    rank integer, user_id uuid, username text, display_name text, avatar_url text, value double precision
  ) on commit drop;
  truncate _ranked;

  insert into _ranked
    select (row_number() over (order by l.value desc, p.created_at))::integer,
           l.user_id, p.username, p.display_name, p.avatar_url, l.value
      from _lb l
      join public.profiles p on p.id = l.user_id
     where l.value > 0
       and coalesce(p.show_on_leaderboards, true)
     order by l.value desc, p.created_at
     limit 20;

  -- Placements earned by looking: idempotent per (user, achievement).
  insert into public.user_achievements (user_id, achievement_id, label, detail)
    select r.user_id,
           'lb:' || p_board || ':' || coalesce(p_label, '') || ':' || p_period || ':' || t.tier,
           t.prefix || ' — ' || v_scope || ', ' || v_period_label,
           'Ranked #' || r.rank || ' on ' || to_char(now(), 'YYYY-MM-DD')
      from _ranked r
      cross join (values ('top20', 'Top 20', 20), ('top3', 'Top 3', 3), ('first', '#1', 1)) as t(tier, prefix, cutoff)
     where r.rank <= t.cutoff
  on conflict (user_id, achievement_id) do nothing;

  return query select * from _ranked order by 1;
end;
$$;

grant execute on function public.leaderboard(text, text, text[], text) to anon, authenticated;
