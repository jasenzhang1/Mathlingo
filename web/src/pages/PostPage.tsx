import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { KindBadge } from "../components/discussion/PostCard";
import { relativeTime } from "../lib/discussion/format";
import { VoteButtons } from "../components/discussion/VoteButtons";
import { useAuth } from "../lib/auth/useAuth";
import {
  castVote,
  createComment,
  deleteComment,
  deletePost,
  fetchComments,
  fetchMyVotes,
  fetchPost,
} from "../lib/discussion/api";
import type { Comment, Post } from "../lib/discussion/types";
import { conceptById } from "../data/concepts";

export function PostPage() {
  const { id: conceptId, postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [myVote, setMyVote] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [posting, setPosting] = useState(false);

  const concept = conceptId ? conceptById.get(conceptId) : undefined;
  // The school forum reuses this same route with a synthetic `school:<domain>`
  // id (see SchoolBoardPage) — it isn't in the concept catalog, so it needs
  // its own back link rather than the concept map's.
  const isSchoolBoard = conceptId?.startsWith("school:") ?? false;
  const backHref = isSchoolBoard ? "/school" : `/concepts/${conceptId}?tab=discussion`;
  const backLabel = isSchoolBoard
    ? "Back to your school forum"
    : concept
      ? `Back to ${concept.title}`
      : "Back to the discussion";

  const load = useCallback(async () => {
    if (!postId) return;
    setLoading(true);
    const [{ data: postData, error: postError }, { data: commentData }] = await Promise.all([
      fetchPost(postId),
      fetchComments(postId),
    ]);
    setPost(postData);
    setComments(commentData);
    setError(postError);
    if (user && postData) {
      const votes = await fetchMyVotes([postData.id], user.id);
      setMyVote(votes[postData.id]);
    }
    setLoading(false);
  }, [postId, user]);

  // Async load on mount; see DiscussionFeed for why oxlint flags this.
  useEffect(() => {
    void load();
  }, [load]);

  async function handleVote(value: 1 | -1) {
    if (!user || !post) return;
    const previous = myVote;
    const delta = previous === value ? -value : value - (previous ?? 0);
    setMyVote(previous === value ? undefined : value);
    setPost({ ...post, score: post.score + delta });

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

  async function handleReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !postId || !reply.trim()) return;
    setPosting(true);
    const { error } = await createComment({ postId, authorId: user.id, body: reply });
    setPosting(false);
    if (error) {
      setError(error);
      return;
    }
    setReply("");
    void load();
  }

  async function handleDeletePost() {
    if (!post || !conceptId) return;
    const { error } = await deletePost(post.id);
    if (error) {
      setError(error);
      return;
    }
    navigate(backHref);
  }

  if (loading) {
    return (
      <Shell>
        <p className="font-body py-16 text-center text-[var(--ink-soft)]">Loading…</p>
      </Shell>
    );
  }

  if (!post) {
    return (
      <Shell>
        <div className="py-16 text-center">
          <h1 className="font-display text-2xl text-[var(--ink)]">Post not found</h1>
          {conceptId && (
            <Link
              to={backHref}
              className="font-body mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
            >
              ← {backLabel}
            </Link>
          )}
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <Link
        to={backHref}
        className="font-body text-sm font-medium text-[var(--accent)] hover:underline"
      >
        ← {backLabel}
      </Link>

      {error && (
        <p role="alert" className="font-body mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <article className="mt-5 flex gap-4 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <VoteButtons
          score={post.score}
          myVote={myVote}
          disabled={!user}
          onVote={handleVote}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <KindBadge kind={post.kind} />
            <span className="font-body text-xs text-[var(--ink-soft)]">
              {post.author_name} · {relativeTime(post.created_at)}
            </span>
          </div>
          <h1 className="font-display text-2xl leading-snug text-[var(--ink)]">{post.title}</h1>
          {post.body && (
            <p className="font-body mt-3 whitespace-pre-wrap text-[var(--ink)]">{post.body}</p>
          )}
          {user?.id === post.author_id && (
            <button
              type="button"
              onClick={handleDeletePost}
              className="font-body mt-4 text-xs font-medium text-[var(--ink-soft)] hover:text-red-600"
            >
              Delete post
            </button>
          )}
        </div>
      </article>

      <section className="mt-8">
        <h2 className="font-display text-lg text-[var(--ink)]">
          {comments.length} {comments.length === 1 ? "reply" : "replies"}
        </h2>

        {user ? (
          <form onSubmit={handleReply} className="mt-3">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder={
                post.kind === "problem"
                  ? "Post your solution or approach…"
                  : "Share what you know…"
              }
              className="font-body w-full resize-y rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={posting || !reply.trim()}
                className="font-body rounded-lg px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--accent)" }}
              >
                {posting ? "Posting…" : "Reply"}
              </button>
            </div>
          </form>
        ) : (
          <p className="font-body mt-3 text-sm text-[var(--ink-soft)]">
            <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
              Log in
            </Link>{" "}
            to reply.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-l-2 border-[var(--line)] pl-4"
            >
              <p className="font-body text-xs text-[var(--ink-soft)]">
                {comment.author_name} · {relativeTime(comment.created_at)}
              </p>
              <p className="font-body mt-1 whitespace-pre-wrap text-sm text-[var(--ink)]">
                {comment.body}
              </p>
              {user?.id === comment.author_id && (
                <button
                  type="button"
                  onClick={async () => {
                    const { error } = await deleteComment(comment.id);
                    if (error) setError(error);
                    else void load();
                  }}
                  className="font-body mt-1.5 text-xs text-[var(--ink-soft)] hover:text-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
      <Footer />
    </div>
  );
}
