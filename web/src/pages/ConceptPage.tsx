import { lazy, Suspense } from "react";
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
import { conceptById, domainMeta } from "../data/concepts";
import { prereqsOf, unlocksOf } from "../lib/prerequisiteGraph";

const TABS = [
  { id: "slides", label: "Slides" },
  { id: "wiki", label: "Wiki" },
  { id: "tutor", label: "Tutor" },
  { id: "assessment", label: "Assessment" },
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

  function selectTab(tab: TabId) {
    setSearchParams(tab === "slides" ? {} : { tab }, { replace: true });
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

  const meta = domainMeta[concept.domain];

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/map"
            className="font-body text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back to the concept map
          </Link>

          <span
            className="font-body mt-5 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)]"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: meta.color }}
              aria-hidden="true"
            />
            {meta.label}
          </span>

          <h1 className="font-display mt-3 text-3xl text-[var(--ink)] md:text-4xl">
            {concept.title}
          </h1>
          <p className="font-body mt-2 max-w-2xl text-[var(--ink-soft)]">
            {concept.blurb}
          </p>

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

            {activeTab === "assessment" && (
              <AssessmentPanel
                key={concept.id}
                conceptId={concept.id}
                conceptTitle={concept.title}
              />
            )}

            {activeTab === "forum" && <DiscussionFeed conceptId={concept.id} />}
            </Suspense>
          </div>

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
