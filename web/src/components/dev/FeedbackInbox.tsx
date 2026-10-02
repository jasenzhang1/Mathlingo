import { useEffect, useState } from "react";
import { CodeText } from "../assessment/CodeText";
import { loadFeedback, reasonLabel, setFeedbackStatus, type FeedbackRow } from "../../lib/assessment/itemFeedback";
import type { Item } from "../../lib/assessment/types";

/**
 * Feedback on questions from learners and developers (the "Feedback on this
 * question" link in assessments). Open items first; editing jumps straight to
 * the question, and resolving files the report away.
 */
export function FeedbackInbox({
  findItem,
  onEdit,
}: {
  findItem: (id: string) => Item | undefined;
  onEdit: (item: Item) => void;
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
