-- Feedback from anywhere on the site: the bubble in the bottom-right corner.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0014 (is_developer). Safe to re-run.
--
-- Students can send feedback from any page. Each report records where they
-- were and what was on their screen when they opened the bubble: the route,
-- the visible text, the state of the page (open dialogs, what they had typed,
-- what they had selected), recent errors, and a screenshot of the viewport.
-- Developers read and resolve everything at /dev/feedback.

create table if not exists public.site_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  message text not null check (char_length(message) between 1 and 4000),
  -- pathname + search + hash, e.g. '/interview/problems?concept=topic%3AProbability'
  path text not null check (char_length(path) <= 2000),
  page_title text check (char_length(page_title) <= 500),
  -- The text the student could see, top to bottom, as rendered in the viewport.
  visible_text text check (char_length(visible_text) <= 20000),
  -- Everything else about the moment: viewport, scroll, headings, dialogs,
  -- fields, selection, errors, device. Shape: SiteFeedbackContext in
  -- web/src/lib/feedback/siteFeedback.ts.
  context jsonb not null default '{}'::jsonb,
  -- In the feedback-screenshots bucket: <user-id>/<uuid>.jpg
  screenshot_path text check (char_length(screenshot_path) <= 300),
  status text not null default 'open' check (status in ('open', 'resolved')),
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists site_feedback_open_idx
  on public.site_feedback (status, created_at desc);

alter table public.site_feedback enable row level security;

drop policy if exists "users send site feedback" on public.site_feedback;
create policy "users send site feedback"
  on public.site_feedback for insert to authenticated
  with check (auth.uid() = user_id and status = 'open' and resolved_at is null);

drop policy if exists "users read their own site feedback; developers read all" on public.site_feedback;
create policy "users read their own site feedback; developers read all"
  on public.site_feedback for select to authenticated
  using (auth.uid() = user_id or public.is_developer());

drop policy if exists "developers resolve site feedback" on public.site_feedback;
create policy "developers resolve site feedback"
  on public.site_feedback for update to authenticated
  using (public.is_developer())
  with check (public.is_developer());

-- ---------------------------------------------------------------------------
-- Screenshots
-- ---------------------------------------------------------------------------
-- Private: a screenshot can show anything on the student's screen. Students
-- write only inside a folder named after their own id; developers read all.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('feedback-screenshots', 'feedback-screenshots', false, 3145728, array['image/jpeg', 'image/png'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "feedback-screenshots: users upload to their own folder" on storage.objects;
create policy "feedback-screenshots: users upload to their own folder"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'feedback-screenshots' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "feedback-screenshots: users read their own; developers read all" on storage.objects;
create policy "feedback-screenshots: users read their own; developers read all"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'feedback-screenshots'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_developer())
  );

notify pgrst, 'reload schema';
