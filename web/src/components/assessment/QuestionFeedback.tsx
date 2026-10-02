import { useState } from "react";
import { FEEDBACK_REASONS, sendFeedback, type FeedbackReason } from "../../lib/assessment/itemFeedback";
import type { Item } from "../../lib/assessment/types";

/**
 * "Feedback on this question": a small link under every assessment question
 * that opens a reason picker and a comment box. Learners use it to flag a
 * problem; developers use it to leave themselves notes. Either way it lands
 * in the inbox at /dev/questions.
 */
export function QuestionFeedback({
  item,
  answer,
  score,
  isDeveloper,
}: {
  item: Item;
  /** What the learner wrote, if they've answered yet. */
  answer?: string;
  score?: number;
  isDeveloper: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<FeedbackReason | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <p className="font-body mt-4 text-xs text-[var(--ink-soft)]">
        Thanks — {isDeveloper ? "noted in the feedback inbox." : "we'll take a look at this question."}
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-body mt-4 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] hover:underline"
      >
        {isDeveloper ? "Leave feedback on this question (dev)" : "Feedback on this question"}
      </button>
    );
  }

  async function send() {
    if (!reason) {
      setError("Pick what's wrong.");
      return;
    }
    if (reason === "other" && !message.trim()) {
      setError("Say a little about what's wrong.");
      return;
    }
    setSending(true);
    setError(null);
    const result = await sendFeedback({
      itemId: item.id,
      conceptId: item.conceptId,
      reason,
      message: message.trim(),
      stemShown: item.stem,
      answer: answer || undefined,
      score,
      fromDeveloper: isDeveloper,
    });
    setSending(false);
    if (result.error) setError(result.error);
    else setSent(true);
  }

  return (
    <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
      <div className="flex items-center justify-between">
        <p className="font-body text-sm font-semibold text-[var(--ink)]">What's wrong with this question?</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {FEEDBACK_REASONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setReason(r.id)}
            aria-pressed={reason === r.id}
            className={`font-body rounded-full border px-3 py-1 text-xs transition-colors ${
              reason === r.id
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="font-body mt-3 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
        placeholder={
          reason === "too-strict"
            ? "What did you write that should have counted?"
            : "Anything that would help us fix it (optional)"
        }
      />
      {error && <p className="font-body mt-2 text-xs text-red-600">{error}</p>}
      <button
        type="button"
        onClick={() => void send()}
        disabled={sending}
        className="font-body mt-3 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send feedback"}
      </button>
    </div>
  );
}
