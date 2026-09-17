import { useState, type FormEvent } from "react";
import { createAnalogy } from "../../lib/analogy/api";

/** Composer for a new analogy or worked example explaining the concept. */
export function AnalogyComposer({
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
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim()) {
      setError("Share an analogy or example before posting.");
      return;
    }
    setError(null);
    setSaving(true);
    const { error } = await createAnalogy({ conceptId, authorId, body });
    setSaving(false);
    if (error) {
      setError(error);
      return;
    }
    setBody("");
    onPosted();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5"
    >
      {error && (
        <p role="alert" className="font-body mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        maxLength={4000}
        placeholder="How would you explain this with an everyday analogy or example? e.g. “Conditional expectation is like the average cover charge at a bar — it changes once you condition on being a woman.”"
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
          {saving ? "Posting…" : "Post analogy"}
        </button>
      </div>
    </form>
  );
}
