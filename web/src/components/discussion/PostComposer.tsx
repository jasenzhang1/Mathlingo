import { useState, type FormEvent } from "react";
import { createPost } from "../../lib/discussion/api";
import type { PostKind } from "../../lib/discussion/types";

/**
 * Composer for a new thread. The kind toggle is deliberately prominent because
 * "I need help with this" and "here's a problem for you to try" are different
 * enough acts that mixing them in one undifferentiated feed makes the board
 * harder to skim.
 */
export function PostComposer({
  conceptId,
  authorId,
  onPosted,
  onCancel,
}: {
  conceptId: string;
  authorId: string;
  onPosted: () => void;
  onCancel: () => void;
}) {
  const [kind, setKind] = useState<PostKind>("question");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Give your post a title.");
      return;
    }
    setError(null);
    setSaving(true);
    const { error } = await createPost({ conceptId, authorId, kind, title, body });
    setSaving(false);
    if (error) {
      setError(error);
      return;
    }
    setTitle("");
    setBody("");
    onPosted();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5"
    >
      <div className="mb-4 flex gap-2" role="group" aria-label="Post type">
        <KindTab
          label="Ask a question"
          active={kind === "question"}
          onClick={() => setKind("question")}
        />
        <KindTab
          label="Post a problem"
          active={kind === "problem"}
          onClick={() => setKind("problem")}
        />
      </div>

      {error && (
        <p role="alert" className="font-body mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={300}
        placeholder={
          kind === "question"
            ? "What are you stuck on?"
            : "Give your problem a title"
        }
        className="font-body mb-3 w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        placeholder={
          kind === "question"
            ? "Add any detail — what you've tried, where it breaks down."
            : "State the problem. Others will try to solve it in the replies."
        }
        className="font-body mb-3 w-full resize-y rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      />

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="font-body rounded-lg px-4 py-2 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="font-body rounded-lg px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--accent)" }}
        >
          {saving ? "Posting…" : "Post"}
        </button>
      </div>
    </form>
  );
}

function KindTab({
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
      className={`font-body rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-transparent bg-[var(--accent-soft)] text-[var(--accent)]"
          : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
      }`}
    >
      {label}
    </button>
  );
}
