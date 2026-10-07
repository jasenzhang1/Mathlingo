import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { repoBundles, repoQuestions } from "../../lib/interview/bank";
import { loadBundleDraft } from "../../lib/interview/bundleDraft";
import { applyQuestionDraft, loadDeletedQuestions, loadQuestionDraft, saveQuestionEdit } from "../../lib/interview/questionDraft";
import type { InterviewQuestion } from "../../lib/interview/types";
import { InterviewQuestionForm } from "../dev/InterviewQuestionForm";

const devButton =
  "font-body rounded-full border border-dashed border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)] hover:border-[var(--accent)] hover:text-[var(--accent)]";

/**
 * Developers can edit an interview question mid-interview, as on the lesson
 * side. Edits go to the same local draft as `/dev/bundles` (publish them from
 * there), and `onChange` hands the edited question back so the card shows it
 * straight away.
 */
export function DevQuestionTools({ question, onChange }: { question: InterviewQuestion; onChange: (q: InterviewQuestion) => void }) {
  const [open, setOpen] = useState(false);
  // Bumped on revert so the form drops its half-typed local state.
  const [revision, setRevision] = useState(0);
  const [draft, setDraft] = useState(() => loadQuestionDraft());
  const original = useMemo(() => repoQuestions.find((x) => x.id === question.id), [question.id]);
  const bundles = useMemo(() => loadBundleDraft() ?? repoBundles, []);
  const freeViaBundle = useMemo(() => new Set(bundles.filter((b) => b.free).flatMap((b) => b.questions)), [bundles]);
  const allQuestions = useMemo(() => applyQuestionDraft(repoQuestions, draft, loadDeletedQuestions()), [draft]);

  function save(q: InterviewQuestion) {
    setDraft(saveQuestionEdit(q, original));
    onChange(q);
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setOpen(true)} className={devButton}>
          Edit question (dev)
        </button>
        <Link to={`/dev/bundles?view=questions&q=${encodeURIComponent(question.id)}`} className={devButton}>
          Question bank (dev)
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
          <div className="my-8 w-full max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-display text-lg text-[var(--ink)]">Edit {question.id}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label="Close">
                ✕
              </button>
            </div>
            <p className="font-body mb-4 text-xs text-[var(--ink-soft)]">
              Saved in this browser as you type.{" "}
              <Link to="/dev/bundles?view=questions" className="font-medium text-[var(--accent)] hover:underline">
                Publish from the question bank
              </Link>{" "}
              to open a pull request.
            </p>
            <InterviewQuestionForm
              key={revision}
              question={question}
              isNew={!original}
              edited={Boolean(draft[question.id])}
              bundles={bundles}
              freeViaBundle={freeViaBundle}
              allQuestions={allQuestions}
              onSave={save}
              onRevert={() => {
                if (!original) return;
                setDraft(saveQuestionEdit(original, original));
                setRevision((n) => n + 1);
                onChange(original);
              }}
            />
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-body rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
