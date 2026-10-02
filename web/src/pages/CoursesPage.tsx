import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import type { Domain } from "../data/concepts";
import { COURSES } from "../lib/courses";
import { loadEnrollmentCounts, useEnrollments } from "../lib/enrollment";

/**
 * `/courses`: pick the courses you want, Duolingo-style — tick the ones you
 * care about, save, and start on the Lesson Map. Signed-out visitors can pick
 * too; their choice is kept in the browser until they sign up.
 */
export function CoursesPage() {
  const navigate = useNavigate();
  const { courses: enrolled, loading, save, signedIn } = useEnrollments();
  // null until the learner touches a card: until then, mirror what's saved.
  const [draft, setDraft] = useState<Domain[] | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadEnrollmentCounts().then(setCounts);
  }, []);

  const selected = draft ?? enrolled;
  const dirty = draft !== null && (draft.length !== enrolled.length || draft.some((c) => !enrolled.includes(c)));

  function toggle(id: Domain) {
    setDraft(selected.includes(id) ? selected.filter((c) => c !== id) : [...selected, id]);
  }

  async function saveAndStart() {
    setSaving(true);
    setError(null);
    const saveError = await save(selected);
    setSaving(false);
    if (saveError) {
      setError(saveError);
      return;
    }
    // Head counts include you now.
    void loadEnrollmentCounts().then(setCounts);
    setDraft(null);
    navigate(selected.length ? `/map?course=${encodeURIComponent(selected[0])}` : "/map");
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] pb-20">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-12 pt-12">
        <div className="text-center">
          <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">Courses</h1>
          <p className="font-body mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
            Pick the courses you want to learn. Your Lesson Map will open on them — and you can change this any time.
          </p>
          {!signedIn && !loading && (
            <p className="font-body mt-3 text-sm text-[var(--ink-soft)]">
              Your picks are saved in this browser.{" "}
              <Link to="/signup" className="font-medium text-[var(--accent)] hover:underline">
                Sign up
              </Link>{" "}
              to keep them on your account.
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => {
            const on = selected.includes(course.id);
            const count = counts[course.id] ?? 0;
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => toggle(course.id)}
                aria-pressed={on}
                className={`group relative flex flex-col rounded-2xl border-2 bg-[var(--panel)] p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 ${on ? "" : "border-[var(--line)] hover:border-[var(--ink-soft)]"}`}
                style={on ? { borderColor: course.color } : undefined}
              >
                <span
                  className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold text-white transition-colors ${on ? "" : "border-[var(--line)] bg-[var(--paper)]"}`}
                  style={on ? { background: course.color, borderColor: course.color } : undefined}
                  aria-hidden="true"
                >
                  {on ? "✓" : ""}
                </span>
                <span className="mb-3 h-1.5 w-12 rounded-full" style={{ background: course.color }} aria-hidden="true" />
                <h2 className="font-display pr-8 text-xl text-[var(--ink)]">{course.label}</h2>
                <p className="font-body mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{course.summary}</p>
                <p className="font-body mt-4 text-xs text-[var(--ink-soft)]">
                  <span className="font-semibold text-[var(--ink)]">{course.chapterCount}</span> chapters ·{" "}
                  <span className="font-semibold text-[var(--ink)]">{course.lessonCount}</span> lessons ·{" "}
                  {count > 0 ? (
                    <>
                      <span className="font-semibold text-[var(--ink)]">{count.toLocaleString()}</span> enrolled
                    </>
                  ) : (
                    "be the first to enrol"
                  )}
                </p>
                <p className="font-body mt-2 line-clamp-2 text-xs text-[var(--ink-soft)]">
                  {course.chapterNames.slice(0, 4).join(" · ")}
                  {course.chapterNames.length > 4 && " · …"}
                </p>
              </button>
            );
          })}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <p className="font-body text-sm text-[var(--ink)]">
            {selected.length === 0 ? (
              "Pick at least one course to get started."
            ) : (
              <>
                <span className="font-semibold">{selected.length}</span> course{selected.length === 1 ? "" : "s"} selected
                {!dirty && !loading && enrolled.length > 0 && <span className="text-[var(--ink-soft)]"> · saved</span>}
              </>
            )}
            {error && <span className="ml-3 text-red-600">{error}</span>}
          </p>
          <button
            type="button"
            onClick={() => void saveAndStart()}
            disabled={saving || selected.length === 0}
            className="font-body rounded-full px-6 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ background: "var(--accent)" }}
          >
            {saving ? "Saving…" : dirty ? "Save and start" : "Go to my Lesson Map"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
