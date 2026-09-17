import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AnalogyComposer } from "../components/analogy/AnalogyComposer";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { conceptById } from "../data/concepts";
import { useAuth } from "../lib/auth/useAuth";
import { chapters } from "../lib/learningOrder";

export function SubmitAnalogyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("concept");
  const [conceptId, setConceptId] = useState(
    requested && conceptById.has(requested) ? requested : "",
  );
  const [posted, setPosted] = useState(false);

  const concept = conceptId ? conceptById.get(conceptId) : undefined;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-3xl text-[var(--ink)]">
          Submit an analogy
        </h1>
        <p className="font-body mt-2 text-[var(--ink-soft)]">
          Pick a concept and share the everyday analogy or example that made it
          click for you.
        </p>

        {loading ? (
          <div className="mt-10 h-40 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]" />
        ) : !user ? (
          <div className="mt-10 rounded-2xl border border-dashed border-[var(--line)] p-10 text-center">
            <p className="font-body text-[var(--ink-soft)]">
              <Link
                to="/login"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                Log in
              </Link>{" "}
              to submit an analogy.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <label
              htmlFor="submit-analogy-concept"
              className="font-body block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]"
            >
              Concept
            </label>
            <select
              id="submit-analogy-concept"
              value={conceptId}
              onChange={(e) => {
                setConceptId(e.target.value);
                setPosted(false);
              }}
              className="font-body mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            >
              <option value="">Choose a concept…</option>
              {chapters.map((chapter) => (
                <optgroup key={chapter.domain} label={chapter.label}>
                  {chapter.concepts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {concept && !posted && (
              <div className="mt-5">
                <AnalogyComposer
                  key={concept.id}
                  conceptId={concept.id}
                  authorId={user.id}
                  onPosted={() => setPosted(true)}
                  onCancel={() => setConceptId("")}
                />
              </div>
            )}

            {concept && posted && (
              <p
                role="status"
                className="font-body mt-5 rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--ink)]"
              >
                Analogy posted.{" "}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/concepts/${concept.id}?tab=analogy`)
                  }
                  className="font-medium text-[var(--accent)] hover:underline"
                >
                  View it on the concept page →
                </button>
              </p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
