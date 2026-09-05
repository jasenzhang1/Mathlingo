-- Discussion boards, one per concept/lesson.
--
-- Run this in your Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Design notes:
--  * `concept_id` is a plain text column, not a foreign key — concepts live in
--    the app's concepts.ts, not the database, so there is no table to point at.
--  * Row Level Security is on for every table. Reads are public (anyone can
--    browse a lesson's discussion), but writes are restricted to the row's own
--    author. Without RLS enabled, the anon key would let anyone edit anything.
--  * `parent_id` on comments exists now so threaded replies can be added later
--    without a schema migration, even though the first UI renders them flat.
--  * Re-runnable: every statement is guarded, so applying this to a database
--    that already has it is a no-op rather than an error. Policies need an
--    explicit `drop policy if exists` because Postgres has no
--    `create policy if not exists` — without it a second run aborts at the
--    first policy with 42710 and nothing after it is applied.

-- ---------------------------------------------------------------------------
-- profiles: public display info, mirroring auth.users
-- ---------------------------------------------------------------------------
-- auth.users is not readable from client code (it holds emails and tokens), so
-- a public profile row is created for each signup to supply display names.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are publicly readable" on public.profiles;
create policy "profiles are publicly readable"
  on public.profiles for select
  using (true);

drop policy if exists "users can update their own profile" on public.profiles;
create policy "users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile whenever someone signs up. Falls back through the
-- Google-provided name, then the email's local part, so there is always
-- something human-readable to show next to a post.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'Anonymous'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- posts: a thread on one concept's board
-- ---------------------------------------------------------------------------

-- author_id points at public.profiles rather than auth.users so PostgREST can
-- embed the author's display name in a single query (it can only join across
-- declared foreign keys). profiles.id is itself an FK to auth.users with
-- cascade delete, so deleting an account still removes their posts.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  concept_id text not null,
  author_id uuid not null references public.profiles (id) on delete cascade,
  -- 'question' = asking for help; 'problem' = a challenge posed for others
  kind text not null check (kind in ('question', 'problem')),
  title text not null check (char_length(title) between 1 and 300),
  body text not null default '' check (char_length(body) <= 20000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_concept_created_idx
  on public.posts (concept_id, created_at desc);

alter table public.posts enable row level security;

drop policy if exists "posts are publicly readable" on public.posts;
create policy "posts are publicly readable"
  on public.posts for select
  using (true);

drop policy if exists "authenticated users can create their own posts" on public.posts;
create policy "authenticated users can create their own posts"
  on public.posts for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "authors can update their own posts" on public.posts;
create policy "authors can update their own posts"
  on public.posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "authors can delete their own posts" on public.posts;
create policy "authors can delete their own posts"
  on public.posts for delete
  to authenticated
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- comments: replies on a post
-- ---------------------------------------------------------------------------

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  -- Reserved for threaded replies; the current UI renders comments flat.
  parent_id uuid references public.comments (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 20000),
  created_at timestamptz not null default now()
);

create index if not exists comments_post_created_idx
  on public.comments (post_id, created_at);

alter table public.comments enable row level security;

drop policy if exists "comments are publicly readable" on public.comments;
create policy "comments are publicly readable"
  on public.comments for select
  using (true);

drop policy if exists "authenticated users can create their own comments" on public.comments;
create policy "authenticated users can create their own comments"
  on public.comments for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "authors can update their own comments" on public.comments;
create policy "authors can update their own comments"
  on public.comments for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "authors can delete their own comments" on public.comments;
create policy "authors can delete their own comments"
  on public.comments for delete
  to authenticated
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- votes: one row per (user, post), value +1 or -1
-- ---------------------------------------------------------------------------
-- The primary key on (post_id, user_id) is what makes a vote idempotent: a
-- second vote by the same user upserts over the first rather than stacking.

create table if not exists public.post_votes (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.post_votes enable row level security;

drop policy if exists "votes are publicly readable" on public.post_votes;
create policy "votes are publicly readable"
  on public.post_votes for select
  using (true);

drop policy if exists "authenticated users can cast their own votes" on public.post_votes;
create policy "authenticated users can cast their own votes"
  on public.post_votes for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users can change their own votes" on public.post_votes;
create policy "users can change their own votes"
  on public.post_votes for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "users can retract their own votes" on public.post_votes;
create policy "users can retract their own votes"
  on public.post_votes for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- posts_with_stats: posts joined to author name and vote tallies
-- ---------------------------------------------------------------------------
-- Aggregating in the database avoids the client fetching every vote row just
-- to display a score. The view inherits RLS from its underlying tables.

create or replace view public.posts_with_stats as
select
  p.id,
  p.concept_id,
  p.author_id,
  p.kind,
  p.title,
  p.body,
  p.created_at,
  p.updated_at,
  coalesce(pr.display_name, 'Anonymous') as author_name,
  coalesce((select sum(v.value) from public.post_votes v where v.post_id = p.id), 0) as score,
  (select count(*) from public.comments c where c.post_id = p.id) as comment_count
from public.posts p
left join public.profiles pr on pr.id = p.author_id;

-- Backfill profiles for any users who signed up before this migration ran.
insert into public.profiles (id, display_name)
select
  u.id,
  coalesce(
    u.raw_user_meta_data ->> 'full_name',
    u.raw_user_meta_data ->> 'name',
    split_part(u.email, '@', 1),
    'Anonymous'
  )
from auth.users u
on conflict (id) do nothing;
