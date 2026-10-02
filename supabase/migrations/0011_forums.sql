-- The Forums tab: one feed over every discussion board, with the interview
-- boards locked to Interview Prep members.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001, 0006 and 0008 (and 0009 for lifetime interview access).
-- Safe to re-run.
--
-- Boards are still the free-text `posts.concept_id` (see 0001), now with a few
-- more shapes:
--   <lesson-id>                    a lesson's thread (as before)
--   chapter:<course>:<section-id>  a chapter-wide thread
--   course:<course>                a course-wide thread
--   interview / interview:<topic>  interview prep — Interview Prep members only
--   school:<email-domain>          a school forum (0006)

-- ---------------------------------------------------------------------------
-- Interview boards: read, post, comment and vote only with interview access
-- ---------------------------------------------------------------------------
-- `has_interview_access` (0008, extended by 0009) is the same check the
-- interview tab uses: a paying subscription or a lifetime purchase.

drop policy if exists "posts are publicly readable" on public.posts;
create policy "posts are publicly readable"
  on public.posts for select
  using (
    not (concept_id = 'interview' or concept_id like 'interview:%')
    or public.has_interview_access(auth.uid())
  );

-- Replaces 0006's insert policy, keeping its school rule.
drop policy if exists "authenticated users can create their own posts" on public.posts;
create policy "authenticated users can create their own posts"
  on public.posts for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and (
      not (concept_id like 'school:%')
      or exists (
        select 1 from public.profiles p
        where p.id = auth.uid() and p.school = substr(concept_id, 8)
      )
    )
    and (
      not (concept_id = 'interview' or concept_id like 'interview:%')
      or public.has_interview_access(auth.uid())
    )
  );

-- Comments and votes follow their post: the `exists` subquery runs under the
-- caller's own RLS on `posts`, so a post the caller can't see can't be read
-- into, commented on, or voted on.
drop policy if exists "comments are publicly readable" on public.comments;
create policy "comments are publicly readable"
  on public.comments for select
  using (exists (select 1 from public.posts p where p.id = comments.post_id));

drop policy if exists "authenticated users can create their own comments" on public.comments;
create policy "authenticated users can create their own comments"
  on public.comments for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and exists (select 1 from public.posts p where p.id = comments.post_id)
  );

drop policy if exists "authenticated users can cast their own votes" on public.post_votes;
create policy "authenticated users can cast their own votes"
  on public.post_votes for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (select 1 from public.posts p where p.id = post_votes.post_id)
  );

-- ---------------------------------------------------------------------------
-- The feed view must respect those policies
-- ---------------------------------------------------------------------------
-- A plain view runs with its owner's rights and would skip RLS on `posts` —
-- handing interview threads to anyone who reads the view. security_invoker
-- makes it read as the caller.

alter view public.posts_with_stats set (security_invoker = true);

-- Prefix filters (`concept_id like 'course:…'`) for the feed.
create index if not exists posts_concept_prefix_idx
  on public.posts (concept_id text_pattern_ops, created_at desc);

notify pgrst, 'reload schema';
