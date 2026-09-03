import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { castVote, fetchMyVotes, fetchPosts } from "../../lib/discussion/api";
import type { Post, SortMode } from "../../lib/discussion/types";
import { useAuth } from "../../lib/auth/useAuth";
import { PostCard } from "./PostCard";
import { PostComposer } from "./PostComposer";

export function DiscussionFeed({ conceptId }: { conceptId: string }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [myVotes, setMyVotes] = useState<Record<string, number>>({});
  const [sort, setSort] = useState<SortMode>("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchPosts(conceptId, sort);
    setPosts(data);
    setError(error);
    if (user && data.length > 0) {
      setMyVotes(await fetchMyVotes(data.map((p) => p.id), user.id));
    }
    setLoading(false);
  }, [conceptId, sort, user]);

  // Loads posts on mount and whenever the concept or sort changes. This sets
  // state from an effect, which oxlint flags — that rule targets synchronous
  // derived state, not async data fetching, so the warning is expected here.
  useEffect(() => {
    void load();
  }, [load]);

  async function handleVote(post: Post, value: 1 | -1) {
    if (!user) return;
    const previous = myVotes[post.id];

    // Optimistic update — the score moves immediately, then reconciles with
    // the server. Reverting on error keeps the UI honest if the write fails.
    const delta = previous === value ? -value : value - (previous ?? 0);
    setMyVotes((v) => {
      const next = { ...v };
      if (previous === value) delete next[post.id];
      else next[post.id] = value;
      return next;
    });
    setPosts((ps) =>
      ps.map((p) => (p.id === post.id ? { ...p, score: p.score + delta } : p)),
    );

    const { error } = await castVote({
      postId: post.id,
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
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5" role="group" aria-label="Sort posts">
          <SortTab label="New" active={sort === "new"} onClick={() => setSort("new")} />
          <SortTab label="Top" active={sort === "top"} onClick={() => setSort("top")} />
        </div>

        {user ? (
          !composing && (
            <button
              type="button"
              onClick={() => setComposing(true)}
              className="font-body rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              New post
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
          <PostComposer
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
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--line)] px-6 py-12 text-center">
          <p className="font-body text-[var(--ink-soft)]">
            Nothing here yet — be the first to ask a question or post a problem.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              conceptId={conceptId}
              myVote={myVotes[post.id]}
              canVote={Boolean(user)}
              onVote={(value) => handleVote(post, value)}
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
