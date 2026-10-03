import { useEffect, useState } from "react";
import { CodeText } from "../assessment/CodeText";
import { loadFeedback, reasonLabel, setFeedbackStatus, type FeedbackRow } from "../../lib/assessment/itemFeedback";
import type { Item } from "../../lib/assessment/types";
import { AGREEMENT_LEVELS, reviseItem, type Revision } from "../../lib/dev/reviseItem";

/**
 * Feedback on questions from learners and developers (the "Feedback on this
 * question" link in assessments). Open items first; editing jumps straight to
 * the question, and resolving files the report away.
 */
export function FeedbackInbox({
  findItem,
  onEdit,
  onApply,
}: {
  findItem: (id: string) => Item | undefined;
  onEdit: (item: Item) => void;
  /** Saves a revised question as a local edit (publish it like any other). */
  onApply: (item: Item) => void;
}) {
  const [status, setStatus] = useState<"open" | "resolved">("open");
  const [rows, setRows] = useState<FeedbackRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadFeedback(status).then((result) => {
      if (cancelled) return;
      setRows(result.rows);
      setError(result.error);
    });
    return () => {
      cancelled = true;
    };
  }, [status]);

  async function toggle(row: FeedbackRow) {
    const next = row.status === "open" ? "resolved" : "open";
    const result = await setFeedbackStatus(row.id, next);
    if (result.error) setError(result.error);
    else setRows((cur) => cur?.filter((r) => r.id !== row.id) ?? null);
  }

  return (
    <details className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--panel)]" open={status === "open" && (rows?.length ?? 0) > 0}>
      <summary className="font-body cursor-pointer select-none px-4 py-3 text-sm font-medium text-[var(--ink)]">
        Feedback on questions
        {status === "open" && rows && (
          <span className="ml-2 rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">{rows.length} open</span>
        )}
      </summary>
      <div className="border-t border-[var(--line)] p-4">
        <div className="mb-3 flex gap-2 text-xs">
          {(["open", "resolved"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setRows(null);
                setStatus(s);
              }}
              aria-pressed={status === s}
              className={`rounded-full border px-3 py-1 ${status === s ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--line)] text-[var(--ink-soft)]"}`}
            >
              {s === "open" ? "Open" : "Resolved"}
            </button>
          ))}
        </div>
        {error && <p className="font-body mb-3 text-xs text-red-600">{error}</p>}
        {!rows ? (
          <div className="h-16 animate-pulse rounded-lg bg-[var(--paper)]" />
        ) : rows.length === 0 ? (
          <p className="font-body text-sm text-[var(--ink-soft)]">Nothing {status}.</p>
        ) : (
          <ul className="max-h-[60vh] space-y-3 overflow-y-auto">
            {rows.map((row) => {
              const item = findItem(row.item_id);
              return (
                <li key={row.id} className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3">
                  <div className="font-body flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-[var(--line)] px-2 py-0.5 font-medium text-[var(--ink)]">
                      {reasonLabel(row.reason)}
                    </span>
                    <span className="font-mono text-[var(--ink-soft)]">{row.item_id}</span>
                    {row.from_developer && <span className="text-[var(--accent)]">dev note</span>}
                    {row.score !== null && <span className="text-[var(--ink-soft)]">scored {Math.round(row.score * 100)}</span>}
                    <span className="ml-auto text-[var(--ink-soft)]">{new Date(row.created_at).toLocaleString()}</span>
                  </div>
                  {row.message && <p className="font-body mt-2 whitespace-pre-wrap text-sm text-[var(--ink)]">{row.message}</p>}
                  {row.stem_shown && (
                    <p className="font-body mt-2 text-xs text-[var(--ink-soft)]">
                      <span className="font-semibold">Question: </span>
                      <CodeText text={row.stem_shown} />
                    </p>
                  )}
                  {row.answer && (
                    <p className="font-body mt-1 whitespace-pre-wrap text-xs text-[var(--ink-soft)]">
                      <span className="font-semibold">Answer: </span>
                      {row.answer}
                    </p>
                  )}
                  {item && row.status === "open" && (
                    <AiRevision
                      item={item}
                      // Every open report on this question goes to the model, not just this one.
                      feedback={rows.filter((r) => r.item_id === row.item_id)}
                      onReview={onEdit}
                      onApply={async (revised) => {
                        onApply(revised);
                        for (const r of rows.filter((x) => x.item_id === row.item_id)) await toggle(r);
                      }}
                    />
                  )}
                  <div className="mt-2 flex gap-3 text-xs">
                    {item ? (
                      <button type="button" onClick={() => onEdit(item)} className="font-medium text-[var(--accent)] hover:underline">
                        Edit question
                      </button>
                    ) : (
                      <span className="text-[var(--ink-soft)]">Question no longer in the bank</span>
                    )}
                    <button type="button" onClick={() => void toggle(row)} className="text-[var(--ink-soft)] hover:text-[var(--ink)] hover:underline">
                      {row.status === "open" ? "Mark resolved" : "Reopen"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </details>
  );
}

/**
 * “How much do you agree?” → the model revises the question that far. The
 * proposal is shown for review; nothing changes until it is applied (which
 * saves a local edit and resolves the question’s open reports) or opened in
 * the editor for hand-tuning.
 */
function AiRevision({
  item,
  feedback,
  onReview,
  onApply,
}: {
  item: Item;
  feedback: FeedbackRow[];
  onReview: (item: Item) => void;
  onApply: (item: Item) => void | Promise<void>;
}) {
  const [agreement, setAgreement] = useState<number>(75);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Revision | null>(null);

  async function run() {
    setBusy(true);
    setResult(null);
    setResult(await reviseItem({ item, feedback, agreement, note }));
    setBusy(false);
  }

  return (
    <div className="font-body mt-3 rounded-lg border border-dashed border-[var(--line)] p-3 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[var(--ink-soft)]">I agree with this feedback:</span>
        {AGREEMENT_LEVELS.map((level) => (
          <button
            key={level.value}
            type="button"
            aria-pressed={agreement === level.value}
            onClick={() => setAgreement(level.value)}
            className={`rounded-full border px-2.5 py-0.5 ${
              agreement === level.value
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--accent)]"
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note to the AI, e.g. “keep the numbers, just accept the alternative method”"
          className="min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2 py-1 text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="shrink-0 rounded-full bg-[var(--accent)] px-3 py-1 font-medium text-white disabled:opacity-60"
        >
          {busy ? "Revising…" : "Revise with AI"}
        </button>
      </div>

      {result && !result.ok && <p className="mt-2 text-red-600">{result.message}</p>}
      {result && result.ok && (
        <div className="mt-3 rounded-lg bg-[var(--panel)] p-3">
          <p className="text-[var(--ink)]">{result.summary || (result.changed ? "Revised." : "No changes suggested.")}</p>
          {result.changes.length > 0 && (
            <ul className="mt-1 list-disc pl-5 text-[var(--ink-soft)]">
              {result.changes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          )}
          {result.changed && (
            <>
              {result.item.stem !== item.stem && (
                <div className="mt-2">
                  <p className="font-semibold text-[var(--ink-soft)]">New question</p>
                  <p className="mt-0.5 text-sm text-[var(--ink)]">
                    <CodeText text={result.item.stem} />
                  </p>
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void onApply(result.item)}
                  className="rounded-full bg-[var(--teal)] px-3 py-1 font-medium text-white"
                >
                  Apply &amp; resolve
                </button>
                <button
                  type="button"
                  onClick={() => onReview(result.item)}
                  className="font-medium text-[var(--accent)] hover:underline"
                >
                  Review in editor
                </button>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="text-[var(--ink-soft)] hover:underline"
                >
                  Discard
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
