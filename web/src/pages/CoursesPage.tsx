import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { domainMeta, type Domain } from "../data/concepts";
import { COURSES } from "../lib/courses";
import { loadEnrollmentCounts, useEnrollments } from "../lib/enrollment";
import { useCourseAccess } from "../lib/lessonAccess";

/**
 * `/courses`: pick the courses you want, Duolingo-style — tick the ones you
 * care about, save, and start on the Lesson Map. Signed-out visitors can pick
 * too; their choice is kept in the browser until they sign up.
 *
 * The free plan includes exactly one course (see lessonAccess). Free learners
 * pick a single course, are told before saving that it's their only free one,
 * and once it's saved it is locked in: the rest need Graded or higher.
 */
export function CoursesPage() {
  const navigate = useNavigate();
  const { courses: enrolled, loading: enrollLoading, save, signedIn } = useEnrollments();
  const access = useCourseAccess();
  const loading = enrollLoading || !access.ready;
  /** Free plan (or signed out, who become free accounts): one course only. */
  const single = !access.allCourses;
  /** A free account that has already chosen: its course can't be changed. */
  const lockedIn = signedIn && single ? access.freeCourse : undefined;
  // null until the learner touches a card: until then, mirror what's saved.
  const [draft, setDraft] = useState<Domain[] | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** The "this is your one free course" confirmation, before a free pick is saved. */
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    void loadEnrollmentCounts().then(setCounts);
  }, []);

  const saved = single ? enrolled.slice(0, 1) : enrolled;
  const selected = draft ?? saved;
  const dirty = draft !== null && (draft.length !== saved.length || draft.some((c) => !saved.includes(c)));

  // Courses whose chapter-and-lesson outline is expanded, so learners can skim
  // what's inside before enrolling.
  const [preview, setPreview] = useState<Set<Domain>>(new Set());

  function togglePreview(id: Domain) {
    setPreview((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }

  function toggle(id: Domain) {
    if (lockedIn) return;
    if (single) {
      setDraft(selected.includes(id) ? [] : [id]);
      return;
    }
    setDraft(selected.includes(id) ? selected.filter((c) => c !== id) : [...selected, id]);
  }

  async function saveAndStart() {
    // A free account's first pick is permanent, so say so before saving it.
    if (single && signedIn && !lockedIn && dirty && !confirming) {
      setConfirming(true);
      return;
    }
    setConfirming(false);
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
            {loading
              ? "Pick the courses you want to learn."
              : !single
                ? "Pick the courses you want to learn. Your Lesson Map will open on them, and you can change this any time."
                : lockedIn
                  ? `${domainMeta[lockedIn].label} is your free course. Upgrade to the Graded plan or higher to unlock every other course.`
                  : "The free plan includes one course, so choose carefully: once you lock it in, it can't be switched. The Graded plan or higher unlocks every course."}
          </p>
          {single && !lockedIn && !loading && (
            <p className="font-body mt-2 text-sm">
              <Link to="/pricing" className="font-medium text-[var(--accent)] hover:underline">
                Compare plans
              </Link>
            </p>
          )}
          {!signedIn && !loading && (
            <p className="font-body mt-3 text-sm text-[var(--ink-soft)]">
              Your pick is saved in this browser and becomes your free course when you{" "}
              <Link to="/signup" className="font-medium text-[var(--accent)] hover:underline">
                sign up
              </Link>
              .
            </p>
          )}
        </div>

        <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => {
            const on = selected.includes(course.id);
            const count = counts[course.id] ?? 0;
            const previewing = preview.has(course.id);
            // Free and already locked in: every other course is behind Graded.
            const needsUpgrade = !!lockedIn && course.id !== lockedIn;
            return (
              <div
                key={course.id}
                className={`flex flex-col rounded-2xl border-2 bg-[var(--panel)] shadow-sm transition-all ${needsUpgrade ? "border-[var(--line)] opacity-70" : `hover:-translate-y-0.5 ${on ? "" : "border-[var(--line)] hover:border-[var(--ink-soft)]"}`}`}
                style={on ? { borderColor: course.color } : undefined}
              >
              <button
                type="button"
                onClick={() => toggle(course.id)}
                aria-pressed={on}
                disabled={!!lockedIn}
                className={`group relative flex flex-col p-5 pb-3 text-left ${lockedIn ? "cursor-default" : ""}`}
              >
                {needsUpgrade && (
                  <span className="font-body absolute right-4 top-4 rounded-full border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 text-[11px] font-medium text-[var(--ink-soft)]">
                    🔒 Graded plan
                  </span>
                )}
                {!needsUpgrade && (
                  <span
                    className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold text-white transition-colors ${on ? "" : "border-[var(--line)] bg-[var(--paper)]"}`}
                    style={on ? { background: course.color, borderColor: course.color } : undefined}
                    aria-hidden="true"
                  >
                    {on ? "✓" : ""}
                  </span>
                )}
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
              <div className="px-5 pb-4">
                <button
                  type="button"
                  onClick={() => togglePreview(course.id)}
                  aria-expanded={previewing}
                  className="font-body text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  {previewing ? "Hide chapters ▴" : "Preview chapters and lessons ▾"}
                </button>
                {previewing && (
                  <ol className="mt-3 max-h-80 space-y-1 overflow-y-auto border-t border-[var(--line)] pt-3">
                    {course.chapters.map((chapter, i) => (
                      <li key={chapter.id}>
                        <details className="group/ch">
                          <summary className="font-body flex cursor-pointer list-none items-baseline gap-2 rounded-lg px-2 py-1 text-sm text-[var(--ink)] hover:bg-[var(--paper)]">
                            <span className="text-[var(--ink-soft)] transition-transform group-open/ch:rotate-90" aria-hidden="true">
                              ›
                            </span>
                            <span className="flex-1">
                              <span className="font-semibold">Ch. {i + 1}</span> · {chapter.name}
                            </span>
                            <span className="shrink-0 text-xs text-[var(--ink-soft)]">
                              {chapter.lessons.length} lesson{chapter.lessons.length === 1 ? "" : "s"}
                            </span>
                          </summary>
                          <ol className="font-body mb-2 ml-7 mt-1 list-decimal space-y-0.5 pl-4 text-xs text-[var(--ink-soft)]">
                            {chapter.lessons.map((lesson, j) => (
                              <li key={j}>{lesson}</li>
                            ))}
                          </ol>
                        </details>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              </div>
            );
          })}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <p className="font-body text-sm text-[var(--ink)]">
            {lockedIn ? (
              <>
                Your free course: <span className="font-semibold">{domainMeta[lockedIn].label}</span>
                <span className="text-[var(--ink-soft)]"> · locked in</span>
              </>
            ) : selected.length === 0 ? (
              single ? "Pick your free course to get started." : "Pick at least one course to get started."
            ) : single ? (
              <>
                Free course: <span className="font-semibold">{domainMeta[selected[0]!].label}</span>
              </>
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
            disabled={saving || loading || selected.length === 0}
            className="font-body rounded-full px-6 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ background: "var(--accent)" }}
          >
            {saving
              ? "Saving…"
              : dirty
                ? single && signedIn
                  ? "Lock in my free course"
                  : "Save and start"
                : "Go to my Lesson Map"}
          </button>
        </div>
      </div>

      {confirming && selected[0] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-free-course"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
        >
          <div className="font-body w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-xl">
            <h2 id="confirm-free-course" className="font-display text-xl text-[var(--ink)]">
              Lock in {domainMeta[selected[0]].label}?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              This will be the only free course you get, and it can’t be switched later. To unlock the other courses,
              you’ll need the Graded plan or higher.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 text-sm">
              <Link to="/pricing" className="mr-auto font-medium text-[var(--accent)] hover:underline">
                See plans
              </Link>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-full border border-[var(--line)] px-4 py-2 font-medium text-[var(--ink)] hover:border-[var(--ink-soft)]"
              >
                Go back
              </button>
              <button
                type="button"
                onClick={() => void saveAndStart()}
                className="rounded-full px-4 py-2 font-semibold text-[var(--accent-ink)] hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Lock it in
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
