import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { concepts, conceptById, domainMeta } from "../data/concepts";

export function ConceptPage() {
  const { id } = useParams();
  const concept = id ? conceptById.get(id) : undefined;

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
            to="/#map"
            className="font-body mt-6 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back to the concept map
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const prerequisites = concept.prerequisites
    .map((prereqId) => conceptById.get(prereqId))
    .filter((c) => c !== undefined);

  const unlocks = concepts.filter((c) => c.prerequisites.includes(concept.id));

  const meta = domainMeta[concept.domain];

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/#map"
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

          <div className="mt-8">
            {concept.embedUrl ? (
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
                <p className="font-body text-[var(--ink-soft)]">
                  Lesson coming soon.
                </p>
              </div>
            )}
          </div>

          {unlocks.length > 0 && (
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
