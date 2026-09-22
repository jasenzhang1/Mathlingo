-- Analogy board: one per concept/lesson, where students submit an analogy or
-- example that helps explain the idea, upvote the best ones, and reply.
--
-- Run this in your Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Design notes:
--  * Mirrors supabase/migrations/0001_discussion.sql closely (same RLS shape,
--    same "public read, author-only write" policy, same idempotent-vote
--    primary key) so the two boards behave identically to a student.
--  * `concept_id` is a plain text column, not a foreign key — concepts live in
--    the app's concepts.ts, not the database, so there is no table to point at.
--  * Unlike posts, an analogy has no title — it's a single submission (the
--    analogy or example itself), so `analogies` plays the role `posts` does
--    but without a `kind`/`title` column.
--  * `parent_id` on comments exists now so threaded replies can be added later
--    without a schema migration, even though the first UI renders them flat.
--  * Re-runnable: every statement is guarded, so applying this to a database
--    that already has it is a no-op rather than an error.

-- ---------------------------------------------------------------------------
-- analogies: one submitted analogy/example on a concept's board
-- ---------------------------------------------------------------------------

create table if not exists public.analogies (
  id uuid primary key default gen_random_uuid(),
  concept_id text not null,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists analogies_concept_created_idx
  on public.analogies (concept_id, created_at desc);

alter table public.analogies enable row level security;

drop policy if exists "analogies are publicly readable" on public.analogies;
create policy "analogies are publicly readable"
  on public.analogies for select
  using (true);

drop policy if exists "authenticated users can create their own analogies" on public.analogies;
create policy "authenticated users can create their own analogies"
  on public.analogies for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "authors can update their own analogies" on public.analogies;
create policy "authors can update their own analogies"
  on public.analogies for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "authors can delete their own analogies" on public.analogies;
create policy "authors can delete their own analogies"
  on public.analogies for delete
  to authenticated
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- analogy_comments: replies on an analogy
-- ---------------------------------------------------------------------------

create table if not exists public.analogy_comments (
  id uuid primary key default gen_random_uuid(),
  analogy_id uuid not null references public.analogies (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  -- Reserved for threaded replies; the current UI renders comments flat.
  parent_id uuid references public.analogy_comments (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists analogy_comments_analogy_created_idx
  on public.analogy_comments (analogy_id, created_at);

alter table public.analogy_comments enable row level security;

drop policy if exists "analogy comments are publicly readable" on public.analogy_comments;
create policy "analogy comments are publicly readable"
  on public.analogy_comments for select
  using (true);

drop policy if exists "authenticated users can create their own analogy comments" on public.analogy_comments;
create policy "authenticated users can create their own analogy comments"
  on public.analogy_comments for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "authors can update their own analogy comments" on public.analogy_comments;
create policy "authors can update their own analogy comments"
  on public.analogy_comments for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "authors can delete their own analogy comments" on public.analogy_comments;
create policy "authors can delete their own analogy comments"
  on public.analogy_comments for delete
  to authenticated
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- analogy_votes: one row per (user, analogy), value +1 or -1
-- ---------------------------------------------------------------------------
-- The primary key on (analogy_id, user_id) is what makes a vote idempotent: a
-- second vote by the same user upserts over the first rather than stacking.

create table if not exists public.analogy_votes (
  analogy_id uuid not null references public.analogies (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  primary key (analogy_id, user_id)
);

alter table public.analogy_votes enable row level security;

drop policy if exists "analogy votes are publicly readable" on public.analogy_votes;
create policy "analogy votes are publicly readable"
  on public.analogy_votes for select
  using (true);

drop policy if exists "authenticated users can cast their own analogy votes" on public.analogy_votes;
create policy "authenticated users can cast their own analogy votes"
  on public.analogy_votes for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users can change their own analogy votes" on public.analogy_votes;
create policy "users can change their own analogy votes"
  on public.analogy_votes for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "users can retract their own analogy votes" on public.analogy_votes;
create policy "users can retract their own analogy votes"
  on public.analogy_votes for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- analogies_with_stats: analogies joined to author name and vote tallies
-- ---------------------------------------------------------------------------
-- Aggregating in the database avoids the client fetching every vote row just
-- to display a score. The view inherits RLS from its underlying tables.

create or replace view public.analogies_with_stats as
select
  a.id,
  a.concept_id,
  a.author_id,
  a.body,
  a.created_at,
  a.updated_at,
  coalesce(pr.display_name, 'Anonymous') as author_name,
  coalesce((select sum(v.value) from public.analogy_votes v where v.analogy_id = a.id), 0) as score,
  (select count(*) from public.analogy_comments c where c.analogy_id = a.id) as comment_count
from public.analogies a
left join public.profiles pr on pr.id = a.author_id;
