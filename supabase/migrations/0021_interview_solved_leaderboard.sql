-- Leaderboard: interview questions solved.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0008_interview.sql, 0015_social_leaderboards.sql and 0016_stored_proficiency.sql. Safe to re-run.
--
-- Adds the 'solved' board: distinct interview questions a candidate has answered
-- fully correct (correctness 1), the same rule the problem list uses for its
-- checkmarks. Over a period, a question counts when it was first solved in it,
-- so solving it again later adds nothing. Otherwise identical to 0016.

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
  if p_board not in ('mastery', 'answered', 'improvement', 'karma', 'posts', 'analogies', 'solved') then
    raise exception 'unknown leaderboard %', p_board;
  end if;

  create temporary table if not exists _lb (user_id uuid, value double precision) on commit drop;
  truncate _lb;

  if p_board = 'mastery' then
    insert into _lb
      select s.user_id,
             -- The stored proficiency (what the learner sees); the formula is only
             -- a fallback for rows not yet carrying one.
             sum(coalesce(s.proficiency, 100.0 / (1 + exp(-1.2 * s.ability_mean)))) / greatest(coalesce(array_length(p_concepts, 1), 0), 1)
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
  elsif p_board = 'solved' then
    insert into _lb
      select f.user_id, count(*)::double precision
        from (
          select a.user_id, a.question_id, min(a.created_at) as first_solved
            from public.interview_attempts a
           where a.correctness >= 1
           group by a.user_id, a.question_id
        ) f
       where f.first_solved >= v_since
       group by f.user_id;
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

notify pgrst, 'reload schema';
