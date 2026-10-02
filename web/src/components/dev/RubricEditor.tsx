import type { Rubric, RubricElement } from "../../lib/assessment/types";

/**
 * Structured editing for an item's rubric: the criteria the model grader
 * scores, how much each one counts, which are required, the forbidden moves,
 * and free-text notes to the grader. Weights are relative — the score is the
 * weighted mean of each criterion's credit — so each row shows its share.
 */

const inputClass =
  "w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none";

function uniqueId(base: string, taken: Set<string>): string {
  const slug =
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 30) || "criterion";
  let id = slug;
  for (let n = 2; taken.has(id); n++) id = `${slug}-${n}`;
  return id;
}

export function RubricEditor({
  rubric,
  onChange,
}: {
  rubric: Rubric;
  onChange: (next: Rubric) => void;
}) {
  const elements = rubric.elements;
  const moves = rubric.forbiddenMoves ?? [];
  const totalWeight = elements.reduce((sum, e) => sum + (e.weight > 0 ? e.weight : 0), 0);
  const taken = new Set([...elements, ...moves].map((e) => e.id));

  const setElements = (next: RubricElement[]) => onChange({ ...rubric, elements: next });
  const setMoves = (next: RubricElement[]) =>
    onChange({ ...rubric, forbiddenMoves: next.length ? next : undefined });
  const patch = (list: RubricElement[], i: number, change: Partial<RubricElement>) =>
    list.map((e, j) => (j === i ? { ...e, ...change } : e));

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="font-body text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
            Criteria
          </p>
          <p className="font-body text-xs text-[var(--ink-soft)]">
            Weights are relative; the share is what each is worth.
          </p>
        </div>
        {elements.length === 0 && (
          <p className="font-body mb-2 text-xs text-[var(--ink-soft)]">
            No criteria. Open-response formats can't be graded without at least one; choice and
            numeric formats derive theirs from the answer key.
          </p>
        )}
        <ul className="space-y-2">
          {elements.map((element, i) => {
            const share = totalWeight > 0 && element.weight > 0 ? element.weight / totalWeight : 0;
            return (
              <li key={element.id} className="rounded-lg border border-[var(--line)] p-3">
                <textarea
                  className={`${inputClass} min-h-[52px]`}
                  value={element.description}
                  onChange={(e) => setElements(patch(elements, i, { description: e.target.value }))}
                  placeholder="What the answer must show — an idea, not a keyword"
                />
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--ink)]">
                  <label className="flex items-center gap-2">
                    <span className="text-xs text-[var(--ink-soft)]">Weight</span>
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      className={`${inputClass} w-20 py-1`}
                      value={element.weight}
                      onChange={(e) =>
                        setElements(patch(elements, i, { weight: Math.max(0, Number(e.target.value) || 0) }))
                      }
                    />
                    <span className="w-10 text-xs tabular-nums text-[var(--ink-soft)]">
                      {Math.round(share * 100)}%
                    </span>
                  </label>
                  <label className="flex items-center gap-1.5" title="Missing it caps the score at 50, however good the rest is">
                    <input
                      type="checkbox"
                      checked={Boolean(element.required)}
                      onChange={(e) =>
                        setElements(patch(elements, i, { required: e.target.checked || undefined }))
                      }
                    />
                    <span className="text-xs">Required</span>
                  </label>
                  <span className="font-mono text-[10px] text-[var(--ink-soft)]">{element.id}</span>
                  {element.misconception && (
                    <span
                      className="text-[10px] text-[var(--ink-soft)]"
                      title={element.misconception.description}
                    >
                      blames {element.misconception.blameConceptId}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setElements(elements.filter((_, j) => j !== i))}
                    className="ml-auto text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={() =>
            setElements([...elements, { id: uniqueId(`criterion-${elements.length + 1}`, taken), description: "", weight: 1 }])
          }
          className="font-body mt-2 text-xs font-medium text-[var(--accent)] hover:underline"
        >
          + Add criterion
        </button>
      </div>

      <div>
        <p className="font-body mb-2 text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
          Forbidden moves
        </p>
        <p className="font-body mb-2 text-xs text-[var(--ink-soft)]">
          Committing one caps the score at 30 — e.g. assuming independence from zero correlation.
        </p>
        <ul className="space-y-2">
          {moves.map((move, i) => (
            <li key={move.id} className="flex items-start gap-2">
              <textarea
                className={`${inputClass} min-h-[40px]`}
                value={move.description}
                onChange={(e) => setMoves(patch(moves, i, { description: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setMoves(moves.filter((_, j) => j !== i))}
                className="mt-2 text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() =>
            setMoves([...moves, { id: uniqueId(`forbidden-${moves.length + 1}`, taken), description: "", weight: 0 }])
          }
          className="font-body mt-2 text-xs font-medium text-[var(--accent)] hover:underline"
        >
          + Add forbidden move
        </button>
      </div>

      <div>
        <p className="font-body mb-1 text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
          Notes to the grader
        </p>
        <textarea
          className={`${inputClass} min-h-[60px]`}
          value={rubric.graderNotes ?? ""}
          onChange={(e) => onChange({ ...rubric, graderNotes: e.target.value || undefined })}
          placeholder="e.g. A verbal description of the formula counts as the formula. Don't require the word “bilinear”."
        />
      </div>
    </div>
  );
}
