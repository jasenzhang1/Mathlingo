import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { castVote, fetchAnalogies, fetchMyVotes } from "../../lib/analogy/api";
import type { Analogy, SortMode } from "../../lib/analogy/types";
import { useAuth } from "../../lib/auth/useAuth";
import { AnalogyCard } from "./AnalogyCard";
import { AnalogyComposer } from "./AnalogyComposer";

/**
 * A mini-forum of student-submitted analogies and examples for one concept:
 * anyone can browse and vote, signed-in students can add their own and reply.
 */
export function AnalogyFeed({ conceptId }: { conceptId: string }) {
  const { user } = useAuth();
  const [analogies, setAnalogies] = useState<Analogy[]>([]);
  const [myVotes, setMyVotes] = useState<Record<string, number>>({});
  const [sort, setSort] = useState<SortMode>("top");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchAnalogies(conceptId, sort);
    setAnalogies(data);
    setError(error);
    if (user && data.length > 0) {
      setMyVotes(await fetchMyVotes(data.map((a) => a.id), user.id));
    }
    setLoading(false);
  }, [conceptId, sort, user]);

  // Loads analogies on mount and whenever the concept or sort changes. This
  // sets state from an effect, which oxlint flags — that rule targets
  // synchronous derived state, not async data fetching, so the warning is
  // expected here.
  useEffect(() => {
    void load();
  }, [load]);

  async function handleVote(analogy: Analogy, value: 1 | -1) {
    if (!user) return;
    const previous = myVotes[analogy.id];

    // Optimistic update — the score moves immediately, then reconciles with
    // the server. Reverting on error keeps the UI honest if the write fails.
    const delta = previous === value ? -value : value - (previous ?? 0);
    setMyVotes((v) => {
      const next = { ...v };
      if (previous === value) delete next[analogy.id];
      else next[analogy.id] = value;
      return next;
    });
    setAnalogies((as) =>
      as.map((a) => (a.id === analogy.id ? { ...a, score: a.score + delta } : a)),
    );

    const { error } = await castVote({
      analogyId: analogy.id,
      userId: user.id,
      value,
      currentValue: previous,
    });
    if (error) {
      setError(error);
      void load();
    }
  }

  return (
    <div>
      <p className="font-body mb-4 text-sm text-[var(--ink-soft)]">
        Come up with your own analogy or example for this concept, or browse what
        other students came up with.
      </p>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5" role="group" aria-label="Sort analogies">
          <SortTab label="Top" active={sort === "top"} onClick={() => setSort("top")} />
          <SortTab label="New" active={sort === "new"} onClick={() => setSort("new")} />
        </div>

        {user ? (
          !composing && (
            <button
              type="button"
              onClick={() => setComposing(true)}
              className="font-body rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Add analogy
            </button>
          )
        ) : (
          <p className="font-body text-sm text-[var(--ink-soft)]">
            <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
              Log in
            </Link>{" "}
            to post or vote.
          </p>
        )}
      </div>

      {composing && user && (
        <div className="mb-5">
          <AnalogyComposer
            conceptId={conceptId}
            authorId={user.id}
            onPosted={() => {
              setComposing(false);
              void load();
            }}
            onCancel={() => setComposing(false)}
          />
        </div>
      )}

      {error && (
        <p role="alert" className="font-body mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="font-body py-8 text-center text-sm text-[var(--ink-soft)]">Loading…</p>
      ) : analogies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--line)] px-6 py-12 text-center">
          <p className="font-body text-[var(--ink-soft)]">
            No analogies yet — be the first to explain this concept your own way.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {analogies.map((analogy) => (
            <AnalogyCard
              key={analogy.id}
              analogy={analogy}
              myVote={myVotes[analogy.id]}
              canVote={Boolean(user)}
              canReply={Boolean(user)}
              authorId={user?.id}
              onVote={(value) => handleVote(analogy, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SortTab({
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
      onClick={onClick}
      aria-pressed={active}
      className={`font-body rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
          : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
      }`}
    >
      {label}
    </button>
  );
}
