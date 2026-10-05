import { lazy, Suspense, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

/**
 * Each tab is its own chunk, loaded when first opened.
 *
 * Only one tab is ever visible, and they carry heavy dependencies that most
 * visitors never touch: the wiki pulls in KaTeX and its fonts (~300 kB), the
 * assessment tab pulls in the item bank. Importing them statically put all of
 * that in front of someone who came to read the slides.
 */
const WikiView = lazy(() =>
  import("../components/wiki/WikiView").then((m) => ({ default: m.WikiView })),
);
const TutorChat = lazy(() =>
  import("../components/tutor/TutorChat").then((m) => ({ default: m.TutorChat })),
);
const AssessmentPanel = lazy(() =>
  import("../components/assessment/AssessmentPanel").then((m) => ({
    default: m.AssessmentPanel,
  })),
);
const DiscussionFeed = lazy(() =>
  import("../components/discussion/DiscussionFeed").then((m) => ({
    default: m.DiscussionFeed,
  })),
);
const AnalogyFeed = lazy(() =>
  import("../components/analogy/AnalogyFeed").then((m) => ({
    default: m.AnalogyFeed,
  })),
);
import { conceptById, domainMeta, type Domain } from "../data/concepts";
import { prereqsOf, unlocksOf } from "../lib/prerequisiteGraph";
import { useLessonAccess } from "../lib/lessonAccess";
import type { UnmetPrerequisite } from "../lib/lessonLock";
import { formatProficiency } from "../lib/assessment/formatProficiency";
import { UNLOCK_THRESHOLD } from "../lib/assessment/exp";

const TABS = [
  { id: "slides", label: "Slides" },
  { id: "wiki", label: "Wiki" },
  { id: "tutor", label: "Tutor" },
  { id: "assessment", label: "Assessment" },
  { id: "analogy", label: "Analogy" },
  { id: "forum", label: "Forum" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ConceptPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const concept = id ? conceptById.get(id) : undefined;

  // The active tab lives in the URL so any tab is linkable and the browser back
  // button works between them. "discussion" is accepted as an alias for "forum"
  // so links created before the tab was renamed still land in the right place.
  const rawTab = searchParams.get("tab");
  const requested = rawTab === "discussion" ? "forum" : rawTab;
  const activeTab: TabId =
    TABS.some((t) => t.id === requested) ? (requested as TabId) : "slides";

  // Where "Back" returns to: the concept map or its list view, whichever the
  // student opened this lesson from (see ConceptMap/ConceptList, which set
  // this), falling back to the map for a direct link or a click from
  // somewhere else in the app (e.g. a prerequisite chip).
  const from = searchParams.get("from");

  // The lesson whose assessment has been opened this visit. Kept so switching
  // tabs mid-question hides the panel rather than discarding its state.
  const [assessmentOpenedFor, setAssessmentOpenedFor] = useState<string | null>(null);
  if (activeTab === "assessment" && concept && assessmentOpenedFor !== concept.id) {
    setAssessmentOpenedFor(concept.id);
  }

  // Every lesson can be read; only its assessment is gated, opening once every
  // prerequisite is at 65+ (see lessonAccess). Signed-out visitors see only the
  // public course(s), under the same assessment rule with nothing saved.
  const access = useLessonAccess();
  const viewable = !!concept && access.canView(concept.id);
  const unmet = concept ? access.unmet(concept.id) : [];
  // Once an assessment has opened during this visit it stays open. Proficiency
  // reloads when Supabase refreshes the login (window refocus, an expired
  // token), and for that moment every prerequisite reads 0 — re-locking then
  // would unmount the assessment and throw away the question in progress.
  const [openedFor, setOpenedFor] = useState<string | null>(null);
  const gateSettled = !!concept && access.ready;
  const gateOpen = gateSettled && unmet.length === 0;
  if (gateOpen && concept && openedFor !== concept.id) setOpenedFor(concept.id);
  const assessmentLocked = gateSettled && unmet.length > 0 && openedFor !== concept?.id;
  // Until proficiency has loaded the gate can't be judged, so the assessment
  // tab shows a placeholder rather than mounting a panel it may have to pull.
  const checkingGate = !gateSettled && openedFor !== concept?.id;
  const backHref = from === "list" ? "/map?view=list" : "/map";

  function selectTab(tab: TabId) {
    const next = new URLSearchParams(searchParams);
    if (tab === "slides") next.delete("tab");
    else next.set("tab", tab);
    setSearchParams(next, { replace: true });
  }

  if (!concept) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-[var(--ink)]">
            Concept not found
          </h1>
          <p className="font-body mt-3 text-[var(--ink-soft)]">
            We couldn't find that concept.
          </p>
          <Link
            to="/map"
            className="font-body mt-6 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back to the concept map
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const prerequisites = (prereqsOf.get(concept.id) ?? [])
    .map((prereqId) => conceptById.get(prereqId))
    .filter((c) => c !== undefined);

  const unlocks = (unlocksOf.get(concept.id) ?? [])
    .map((unlockId) => conceptById.get(unlockId))
    .filter((c) => c !== undefined);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            to={backHref}
            className="font-body text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back
          </Link>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">
              {concept.title}
            </h1>
            <Link
              to={`/submit/questions?domain=${concept.domain}`}
              className="font-body shrink-0 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Submit question
            </Link>
          </div>
          {viewable && gateSettled && (
            <ProgressStatus open={!assessmentLocked} signedIn={access.courses.signedIn} />
          )}
          {prerequisites.length > 0 && (
            <div className="font-body mt-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
                Prerequisites
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {prerequisites.map((p) => (
                  <Link
                    key={p.id}
                    to={`/concepts/${p.id}`}
                    className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1 text-sm text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!viewable ? (
            access.ready ? (
              <CourseWall signedIn={access.courses.signedIn} freeCourse={access.courses.freeCourse} />
            ) : (
              <div className="mt-8">
                <TabSkeleton />
              </div>
            )
          ) : (
          <>
          <div
            className="mt-8 flex flex-wrap gap-1 border-b border-[var(--line)]"
            role="tablist"
            aria-label="Lesson sections"
          >
            {TABS.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.id === "assessment" && assessmentLocked ? `🔒 ${tab.label}` : tab.label}
                active={activeTab === tab.id}
                onClick={() => selectTab(tab.id)}
              />
            ))}
          </div>

          <div className="mt-6">
            <Suspense fallback={<TabSkeleton />}>
            {activeTab === "slides" &&
              (concept.embedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-md">
                  <iframe
                    src={concept.embedUrl}
                    title={concept.title}
                    loading="lazy"
                    allow="fullscreen"
                    allowFullScreen
                    className="aspect-video w-full"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--panel)] px-6 py-16 text-center">
                  <p className="font-body text-[var(--ink-soft)]">Slides coming soon.</p>
                </div>
              ))}

            {activeTab === "wiki" && <WikiView conceptId={concept.id} />}

            {/* Keyed by concept so navigating between lessons starts a fresh
                conversation and a fresh assessment session rather than carrying
                the previous concept's state across. */}
            {activeTab === "tutor" && (
              <TutorChat
                key={concept.id}
                conceptId={concept.id}
                conceptTitle={concept.title}
              />
            )}

            {/* Once opened, the assessment stays mounted (just hidden) while
                another tab is showing, so the learner comes back to the same
                question instead of a fresh one. */}
            {activeTab === "assessment" && checkingGate && <TabSkeleton />}
            {activeTab === "assessment" && assessmentLocked && <LockedAssessment unmet={unmet} />}
            {!checkingGate && !assessmentLocked &&
              (activeTab === "assessment" || assessmentOpenedFor === concept.id) && (
              <div hidden={activeTab !== "assessment"}>
                <AssessmentPanel
                  key={concept.id}
                  conceptId={concept.id}
                  conceptTitle={concept.title}
                  active={activeTab === "assessment"}
                />
              </div>
            )}

            {activeTab === "analogy" && <AnalogyFeed conceptId={concept.id} />}

            {activeTab === "forum" && <DiscussionFeed conceptId={concept.id} />}
            </Suspense>
          </div>
          </>
          )}

          {activeTab === "slides" && unlocks.length > 0 && (
            <div className="font-body mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
                Unlocks next
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {unlocks.map((c) => (
                  <Link
                    key={c.id}
                    to={`/concepts/${c.id}`}
                    className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1 text-sm text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

/** Placeholder while a tab’s chunk is fetched. */
function TabSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <div className="h-3 w-1/3 rounded bg-[var(--line)]" />
      <div className="mt-3 h-3 w-2/3 rounded bg-[var(--line)]" />
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`font-body -mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Under the title: can the learner make progress here, or only read? The same
 * two states the map and list mark with their 🔒.
 */
function ProgressStatus({ open, signedIn }: { open: boolean; signedIn: boolean }) {
  return (
    <p
      className={`font-body mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        open
          ? "bg-[var(--accent-soft)] text-[var(--ink)]"
          : "border border-dashed border-[var(--line)] text-[var(--ink-soft)]"
      }`}
    >
      {open
        ? signedIn
          ? "✓ Unlocked: the assessment counts toward your progress"
          : "✓ Assessment open (sign in to save your progress)"
        : "🔒 View only: read the slides and wiki; the assessment unlocks once the prerequisites reach 65"}
    </p>
  );
}

/**
 * A lesson in a course the visitor can't see: signed out (only the public
 * course), or on the free plan outside their one chosen course.
 */
function CourseWall({ signedIn, freeCourse }: { signedIn: boolean; freeCourse: Domain | undefined }) {
  const primary =
    "rounded-full bg-[var(--accent)] px-4 py-2 font-medium text-[var(--accent-ink)] hover:opacity-90";
  const secondary = "px-2 py-2 font-medium text-[var(--accent)] hover:underline";

  if (!signedIn) {
    return (
      <div className="font-body mt-8 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
        <p className="text-lg font-semibold text-[var(--ink)]">Sign up to see this course</p>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Without an account you can explore the Linear Algebra course. Create a free account to choose a course
          of your own and keep your progress.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link to="/signup" className={primary}>Sign up</Link>
          <Link to="/login" className={secondary}>Log in</Link>
          <Link to="/map?course=linear-algebra" className={secondary}>Browse Linear Algebra</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body mt-8 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <p className="text-lg font-semibold text-[var(--ink)]">This course needs the Graded plan</p>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        {freeCourse
          ? `The free plan includes one course, and yours is ${domainMeta[freeCourse].label}. Upgrade to Graded or higher to open every course.`
          : "The free plan includes one course of your choice. Choose it on the Courses page, or upgrade to Graded or higher to open every course."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link to="/pricing" className={primary}>See plans</Link>
        {freeCourse ? (
          <Link to={`/map?course=${freeCourse}`} className={secondary}>Go to {domainMeta[freeCourse].label}</Link>
        ) : (
          <Link to="/courses" className={secondary}>Choose your free course</Link>
        )}
      </div>
    </div>
  );
}

/** The assessment tab of a lesson whose prerequisites aren't at the unlock threshold yet. */
function LockedAssessment({ unmet }: { unmet: UnmetPrerequisite[] }) {
  return (
    <div className="font-body rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <p className="text-lg font-semibold text-[var(--ink)]">🔒 This assessment is locked</p>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        You can read this lesson's slides and wiki now. To make progress on it, reach {UNLOCK_THRESHOLD} proficiency
        in {unmet.length === 1 ? "this prerequisite" : "each of these prerequisites"}:
      </p>
      <ul className="mt-4 space-y-2">
        {unmet.map(({ concept, ceiling }) => (
          <li key={concept.id} className="flex items-center justify-between gap-3">
            <Link
              to={`/concepts/${concept.id}?tab=assessment`}
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              {concept.title}
            </Link>
            <span className="text-sm tabular-nums text-[var(--ink-soft)]">
              {formatProficiency(ceiling)} / {UNLOCK_THRESHOLD}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
