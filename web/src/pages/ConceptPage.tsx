import { lazy, Suspense, useEffect, useState } from "react";
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
import { conceptById } from "../data/concepts";
import { prereqsOf, unlocksOf } from "../lib/prerequisiteGraph";
import { formatProficiency } from "../lib/assessment/formatProficiency";
import { UNLOCK_THRESHOLD } from "../lib/assessment/exp";
import { useAuth } from "../lib/auth/useAuth";
import { useIsDeveloper } from "../lib/dev/devAuth";
import { unmetPrerequisites, type UnmetPrerequisite } from "../lib/lessonLock";
import { useProficiency } from "../lib/useProficiency";

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
  useEffect(() => {
    if (activeTab === "assessment" && concept) setAssessmentOpenedFor(concept.id);
  }, [activeTab, concept]);

  // Lessons open only once every prerequisite is at 65+. Developers bypass the
  // gate; signed-out visitors can still browse (there is no progress to gate on).
  const { user } = useAuth();
  const isDeveloper = useIsDeveloper();
  const { ceiling, loading: proficiencyLoading } = useProficiency();
  const unmet = concept && user && !isDeveloper ? unmetPrerequisites(concept.id, ceiling) : [];
  const locked = !proficiencyLoading && unmet.length > 0;
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

          {locked ? (
            <LockedLesson unmet={unmet} />
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
                label={tab.label}
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
            {(activeTab === "assessment" || assessmentOpenedFor === concept.id) && (
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

/** Shown in place of the lesson until every prerequisite reaches the unlock threshold. */
function LockedLesson({ unmet }: { unmet: UnmetPrerequisite[] }) {
  return (
    <div className="font-body mt-8 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <p className="text-lg font-semibold text-[var(--ink)]">🔒 This lesson is locked</p>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Reach {UNLOCK_THRESHOLD} proficiency in {unmet.length === 1 ? "this prerequisite" : "each of these prerequisites"} to open it.
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
