import { useSearchParams } from "react-router-dom";
import { ConceptList } from "../components/ConceptList";
import { ConceptMap } from "../components/ConceptMap";
import { Nav } from "../components/Nav";

/**
 * The map gets the whole viewport: nav, one line of framing, then the graph
 * fills whatever height is left. No footer and no page scroll — panning the
 * graph and scrolling the page would fight each other.
 *
 * The list view keeps that shell and scrolls inside the panel, for the same
 * reason: the chapter headers stick to the top of their own scroll region
 * rather than fighting the sticky nav.
 */

const VIEWS = [
  { id: "map", label: "Map" },
  { id: "list", label: "List" },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

const blurb: Record<ViewId, string> = {
  map: "Every concept we teach, connected by what you need to know first. Drag to pan, use the buttons to zoom, and click a node to open its lesson.",
  list: "Every concept we teach, chapter by chapter, in the order you'd learn them. Your proficiency is on the right of each line.",
};

export function ConceptMapPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // The view lives in the URL so either one is linkable and survives a reload.
  // Replacing rather than pushing, like the concept page does with its tab: a
  // two-way toggle would otherwise stack a history entry per click and leave
  // Back walking through them instead of leaving the page.
  const view: ViewId = searchParams.get("view") === "list" ? "list" : "map";

  function selectView(next: ViewId) {
    setSearchParams(next === "map" ? {} : { view: next }, { replace: true });
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[var(--paper)]">
      <Nav />
      <main className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-3 flex shrink-0 items-start justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-display text-xl text-[var(--ink)] sm:text-2xl">
              Concept map
            </h1>
            <p className="font-body hidden text-sm text-[var(--ink-soft)] sm:block">
              {blurb[view]}
            </p>
          </div>

          <div
            role="group"
            aria-label="View"
            className="flex shrink-0 gap-1 rounded-full border border-[var(--line)] bg-[var(--panel)] p-1"
          >
            {VIEWS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectView(option.id)}
                aria-pressed={view === option.id}
                className={`font-body rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  view === option.id
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {view === "list" ? <ConceptList /> : <ConceptMap />}
      </main>
    </div>
  );
}
