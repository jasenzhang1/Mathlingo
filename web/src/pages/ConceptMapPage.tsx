import { ConceptMap } from "../components/ConceptMap";
import { Nav } from "../components/Nav";

/**
 * The map gets the whole viewport: nav, one line of framing, then the graph
 * fills whatever height is left. No footer and no page scroll — panning the
 * graph and scrolling the page would fight each other.
 */
export function ConceptMapPage() {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[var(--paper)]">
      <Nav />
      <main className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-3 flex shrink-0 flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="font-display text-xl text-[var(--ink)] sm:text-2xl">
            Concept map
          </h1>
          <p className="font-body hidden text-sm text-[var(--ink-soft)] sm:block">
            Every concept we teach, connected by what you need to know first.
            Drag to pan, use the buttons to zoom, and click a node to open its
            lesson.
          </p>
        </div>
        <ConceptMap />
      </main>
    </div>
  );
}
