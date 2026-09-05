import { lazy, Suspense, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { getSchoolNameForDomain } from "../data/eduDomains";
import { useAuth } from "../lib/auth/useAuth";
import { useOwnProfile } from "../lib/profiles";

// Lazy so this feed's chunk stays shared with ConceptPage's own lazy import of
// it rather than duplicating it into a static chunk of its own.
const DiscussionFeed = lazy(() =>
  import("../components/discussion/DiscussionFeed").then((m) => ({
    default: m.DiscussionFeed,
  })),
);

/**
 * A forum scoped to one school, gated to students verified at signup.
 *
 * Reuses the concept-board discussion machinery (DiscussionFeed/PostCard/
 * PostPage) with the synthetic id `school:<domain>` — posts land in the same
 * `posts` table as every concept's forum, just under a different id, and
 * write access is restricted to matching students by a Postgres policy (see
 * supabase/migrations/0006_student_verification.sql), not by anything here.
 */
export function SchoolBoardPage() {
  const { user, loading: authLoading } = useAuth();
  const profile = useOwnProfile();

  if (!authLoading && !user) {
    return (
      <Gate title="Sign in for your school forum">
        <Link to="/login" className="font-body text-sm font-medium text-[var(--accent)] hover:underline">
          Go to login →
        </Link>
      </Gate>
    );
  }

  if (!authLoading && user && !profile?.school) {
    return (
      <Gate title="Your school forum">
        <p className="font-body text-[var(--ink-soft)]">
          This board is for students who signed up with a school (.edu) email
          address — sign up with yours to unlock it.
        </p>
        <Link
          to="/signup"
          className="font-body mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Sign up with a student email →
        </Link>
      </Gate>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-2xl text-[var(--ink)]">
          {profile?.school ? getSchoolNameForDomain(profile.school) : "Your school"}
        </h1>
        <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
          Only verified students of this school can post here.
        </p>
        <div className="mt-8">
          {profile?.school && (
            <Suspense
              fallback={
                <p className="font-body py-8 text-center text-sm text-[var(--ink-soft)]">
                  Loading…
                </p>
              }
            >
              <DiscussionFeed conceptId={`school:${profile.school}`} />
            </Suspense>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Gate({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-[var(--ink)]">{title}</h1>
        <div className="mt-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
