import { Link } from "react-router-dom";
import { relativeTime } from "../../lib/discussion/format";
import type { Post } from "../../lib/discussion/types";
import { VoteButtons } from "./VoteButtons";

export function KindBadge({ kind }: { kind: Post["kind"] }) {
  const isProblem = kind === "problem";
  return (
    <span
      className="font-body inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
      style={{
        background: isProblem ? "rgba(15,154,142,0.12)" : "var(--accent-soft)",
        color: isProblem ? "var(--teal)" : "var(--accent)",
      }}
    >
      {isProblem ? "Problem" : "Question"}
    </span>
  );
}

export function PostCard({
  post,
  myVote,
  canVote,
  conceptId,
  onVote,
}: {
  post: Post;
  myVote: number | undefined;
  canVote: boolean;
  conceptId: string;
  onVote: (value: 1 | -1) => void;
}) {
  return (
    <article className="flex gap-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4">
      <VoteButtons score={post.score} myVote={myVote} disabled={!canVote} onVote={onVote} />

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <KindBadge kind={post.kind} />
          <span className="font-body text-xs text-[var(--ink-soft)]">
            {post.author_name} · {relativeTime(post.created_at)}
          </span>
        </div>

        <h3 className="font-display text-lg leading-snug text-[var(--ink)]">
          <Link
            to={`/concepts/${conceptId}/discussion/${post.id}`}
            className="hover:text-[var(--accent)]"
          >
            {post.title}
          </Link>
        </h3>

        {post.body && (
          <p className="font-body mt-1 line-clamp-2 text-sm text-[var(--ink-soft)]">
            {post.body}
          </p>
        )}

        <Link
          to={`/concepts/${conceptId}/discussion/${post.id}`}
          className="font-body mt-2 inline-block text-xs font-medium text-[var(--ink-soft)] hover:text-[var(--accent)]"
        >
          {post.comment_count} {post.comment_count === 1 ? "reply" : "replies"}
        </Link>
      </div>
    </article>
  );
}
