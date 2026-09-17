import { useState, type FormEvent } from "react";
import { createComment, fetchComments } from "../../lib/analogy/api";
import { relativeTime } from "../../lib/discussion/format";
import type { Analogy, AnalogyComment } from "../../lib/analogy/types";
import { VoteButtons } from "../discussion/VoteButtons";

export function AnalogyCard({
  analogy,
  myVote,
  canVote,
  canReply,
  authorId,
  onVote,
}: {
  analogy: Analogy;
  myVote: number | undefined;
  canVote: boolean;
  canReply: boolean;
  authorId: string | undefined;
  onVote: (value: 1 | -1) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState<AnalogyComment[] | null>(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentCount, setCommentCount] = useState(analogy.comment_count);

  async function toggleExpanded() {
    const next = !expanded;
    setExpanded(next);
    if (next && comments === null) {
      setLoadingComments(true);
      const { data } = await fetchComments(analogy.id);
      setComments(data);
      setLoadingComments(false);
    }
  }

  async function handleReply(body: string) {
    if (!authorId) return { error: "You must be logged in to reply." };
    const { error } = await createComment({ analogyId: analogy.id, authorId, body });
    if (!error) {
      const { data } = await fetchComments(analogy.id);
      setComments(data);
      setCommentCount(data.length);
    }
    return { error };
  }

  return (
    <article className="flex gap-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4">
      <VoteButtons score={analogy.score} myVote={myVote} disabled={!canVote} onVote={onVote} />

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="font-body text-xs text-[var(--ink-soft)]">
            {analogy.author_name} · {relativeTime(analogy.created_at)}
          </span>
        </div>

        <p className="font-body whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink)]">
          {analogy.body}
        </p>

        <button
          type="button"
          onClick={() => void toggleExpanded()}
          className="font-body mt-2 inline-block text-xs font-medium text-[var(--ink-soft)] hover:text-[var(--accent)]"
        >
          {commentCount === 0
            ? "Reply"
            : `${commentCount} ${commentCount === 1 ? "reply" : "replies"}`}
          {expanded ? " ▴" : " ▾"}
        </button>

        {expanded && (
          <div className="mt-3 border-t border-[var(--line)] pt-3">
            {loadingComments ? (
              <p className="font-body text-xs text-[var(--ink-soft)]">Loading…</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {(comments ?? []).map((comment) => (
                  <div key={comment.id} className="font-body text-sm">
                    <span className="font-medium text-[var(--ink)]">{comment.author_name}</span>{" "}
                    <span className="text-xs text-[var(--ink-soft)]">
                      · {relativeTime(comment.created_at)}
                    </span>
                    <p className="mt-0.5 whitespace-pre-wrap text-[var(--ink-soft)]">
                      {comment.body}
                    </p>
                  </div>
                ))}
                {(comments ?? []).length === 0 && (
                  <p className="font-body text-xs text-[var(--ink-soft)]">
                    No replies yet — say if this clicked for you or how you'd tweak it.
                  </p>
                )}
              </div>
            )}

            {canReply ? (
              <ReplyForm onSubmit={handleReply} />
            ) : (
              <p className="font-body mt-2 text-xs text-[var(--ink-soft)]">
                Log in to reply.
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ReplyForm({
  onSubmit,
}: {
  onSubmit: (body: string) => Promise<{ error: string | null }>;
}) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    setError(null);
    const { error } = await onSubmit(body);
    setSaving(false);
    if (error) {
      setError(error);
      return;
    }
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex items-start gap-2">
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={4000}
        placeholder="Add a reply…"
        className="font-body flex-1 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      />
      <button
        type="submit"
        disabled={saving}
        className="font-body rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--accent)" }}
      >
        {saving ? "…" : "Reply"}
      </button>
      {error && <p className="font-body text-xs text-red-700">{error}</p>}
    </form>
  );
}
