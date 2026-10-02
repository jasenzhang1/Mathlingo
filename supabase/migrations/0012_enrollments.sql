-- Course enrolment: the courses a learner has chosen on the Courses tab.
--
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- Requires 0001 (profiles). Safe to re-run.

create table if not exists public.course_enrollments (
  user_id uuid not null references public.profiles (id) on delete cascade,
  -- A curriculum course id (a Domain in web/src/data/concepts.ts).
  course text not null check (course ~ '^[a-z0-9-]{1,60}$'),
  enrolled_at timestamptz not null default now(),
  primary key (user_id, course)
);

alter table public.course_enrollments enable row level security;

-- Your own enrolments only: who is enrolled in what is nobody else's business.
drop policy if exists "users read their own enrollments" on public.course_enrollments;
create policy "users read their own enrollments"
  on public.course_enrollments for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users enroll themselves" on public.course_enrollments;
create policy "users enroll themselves"
  on public.course_enrollments for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users unenroll themselves" on public.course_enrollments;
create policy "users unenroll themselves"
  on public.course_enrollments for delete to authenticated
  using (auth.uid() = user_id);

-- Public head counts per course for the Courses tab — totals only, never who.
create or replace function public.course_enrollment_counts()
returns table (course text, enrolled bigint)
language sql
stable
security definer
set search_path = public
as $$
  select e.course, count(*) from public.course_enrollments e group by e.course;
$$;

grant execute on function public.course_enrollment_counts() to anon, authenticated;

notify pgrst, 'reload schema';
