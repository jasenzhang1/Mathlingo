import { useMemo, useState } from "react";
import { isLive, sectionById, sectionLabel } from "../../lib/interview/bank";
import type { Bundle, InterviewQuestion } from "../../lib/interview/types";
import { btn, field, fieldLabel, freeBadge, lockedBadge, sortedFamilies, sortedSections } from "./interviewEditorStyles";

/**
 * The interview question editor: used by the Questions view of `/dev/bundles`
 * and by the "Edit question (dev)" dialog on an interview question. Every
 * change is passed to `onSave` as it is typed.
 */
export function InterviewQuestionForm({
  question: q,
  isNew,
  edited,
  bundles,
  freeViaBundle,
  allQuestions,
  onSave,
  onRevert,
  onDelete,
  openBundle,
}: {
  question: InterviewQuestion;
  isNew: boolean;
  edited: boolean;
  bundles: Bundle[];
  freeViaBundle: Set<string>;
  allQuestions: InterviewQuestion[];
  onSave: (q: InterviewQuestion) => void;
  onRevert: () => void;
  /** Omitted where deleting isn't offered (the in-interview editor). */
  onDelete?: () => void;
  /** Omitted where there is no bundle view to jump to; bundle names then show as plain text. */
  openBundle?: (id: string) => void;
}) {
  const [tagText, setTagText] = useState("");
  // Kept as text so a half-typed number ("0.", "-") isn't thrown away.
  const [numericText, setNumericText] = useState(q.numericAnswer === undefined ? "" : String(q.numericAnswer));
  const set = (patch: Partial<InterviewQuestion>) => onSave({ ...q, ...patch });

  const inBundles = bundles.filter((b) => b.questions.includes(q.id));
  const freeBundles = inBundles.filter((b) => b.free);
  const effectiveFree = Boolean(q.free) || freeViaBundle.has(q.id);
  const allTags = useMemo(() => [...new Set(allQuestions.flatMap((x) => x.tags))].sort((a, b) => a.localeCompare(b)), [allQuestions]);

  function addTags(raw: string) {
    const fresh = raw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !q.tags.includes(t));
    if (fresh.length) set({ tags: [...q.tags, ...fresh] });
    setTagText("");
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-xl text-[var(--ink)]">{q.id}</h2>
          <span className={effectiveFree ? freeBadge : lockedBadge}>{effectiveFree ? "free" : "locked"}</span>
          {!isLive(q) && <span className={lockedBadge}>draft</span>}
          {(isNew || edited) && <span className="font-body text-xs text-amber-600">{isNew ? "new — not yet published" : "edited — not yet published"}</span>}
          <span className="flex-1" />
          {edited && !isNew && (
            <button
              type="button"
              className={btn}
              onClick={() => {
                if (confirm(`Revert ${q.id} to the published version?`)) onRevert();
              }}
            >
              Revert
            </button>
          )}
          {onDelete && (
            <button type="button" className={`${btn} hover:border-red-400`} onClick={onDelete}>
              Delete
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="font-body rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm">
            <p className={fieldLabel}>Access</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => set({ free: true })}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${q.free ? "bg-[var(--accent)] text-white" : "border border-[var(--line)] text-[var(--ink)]"}`}
              >
                Free
              </button>
              <button
                type="button"
                onClick={() => set({ free: undefined })}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${!q.free ? "bg-[var(--ink)] text-[var(--paper)]" : "border border-[var(--line)] text-[var(--ink)]"}`}
              >
                Locked
              </button>
            </div>
            {freeBundles.length > 0 && (
              <p className="mt-2 text-xs text-[var(--ink-soft)]">
                Always free while it's in {freeBundles.length === 1 ? "the free bundle" : "the free bundles"}{" "}
                {freeBundles.map((b) => `“${b.title}”`).join(", ")}, whatever this says.
              </p>
            )}
          </div>
          <div className="font-body rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm">
            <p className={fieldLabel}>Status</p>
            <label className="mt-2 flex items-center gap-2 text-[var(--ink)]">
              <input type="checkbox" checked={!isLive(q)} onChange={(e) => set({ status: e.target.checked ? "draft" : undefined })} />
              Draft (never served)
            </label>
            <p className="mt-2 text-xs text-[var(--ink-soft)]">
              In bundles:{" "}
              {inBundles.length === 0
                ? "none"
                : inBundles.map((b, i) => (
                    <span key={b.id}>
                      {i > 0 && ", "}
                      {openBundle ? (
                        <button type="button" className="text-[var(--accent)] hover:underline" onClick={() => openBundle(b.id)}>
                          {b.title}
                        </button>
                      ) : (
                        b.title
                      )}
                    </span>
                  ))}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <label className={`${fieldLabel} block`}>
            Title
            <input
              value={q.title ?? ""}
              onChange={(e) => set({ title: e.target.value })}
              placeholder="Short name for question lists"
              className={field}
            />
          </label>
          <label className={`${fieldLabel} block`}>
            Question
            <textarea value={q.question} onChange={(e) => set({ question: e.target.value })} rows={4} className={field} />
          </label>
          <div className="grid gap-4 md:grid-cols-[1fr_200px]">
            <label className={`${fieldLabel} block`}>
              Answer
              <textarea value={q.answer} onChange={(e) => set({ answer: e.target.value })} rows={2} className={field} />
            </label>
            <label className={`${fieldLabel} block`}>
              Numeric answer
              <input
                value={numericText}
                inputMode="decimal"
                placeholder="(self-graded)"
                onChange={(e) => {
                  setNumericText(e.target.value);
                  const v = e.target.value.trim();
                  const n = Number(v);
                  set({ numericAnswer: v === "" || !Number.isFinite(n) ? undefined : n });
                }}
                className={field}
              />
            </label>
          </div>
          <label className={`${fieldLabel} block`}>
            Solution
            <textarea value={q.notes} onChange={(e) => set({ notes: e.target.value })} rows={6} className={field} />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className={`${fieldLabel} block`}>
              Main technique
              <select value={q.section ?? ""} onChange={(e) => set({ section: e.target.value || null })} className={field}>
                <option value="">(unsorted)</option>
                {sortedSections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.number} · {s.topic} › {s.subtopic}
                  </option>
                ))}
              </select>
            </label>
            <label className={`${fieldLabel} block`}>
              Scenario
              <select value={q.family ?? ""} onChange={(e) => set({ family: e.target.value || null })} className={field}>
                <option value="">(none)</option>
                {sortedFamilies.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={`${fieldLabel} block`}>
              Difficulty (0–12)
              <input
                type="number"
                min={0}
                max={12}
                value={q.difficulty ?? ""}
                placeholder="unrated"
                onChange={(e) => set({ difficulty: e.target.value === "" ? null : Math.max(0, Math.min(12, Number(e.target.value))) })}
                className={field}
              />
            </label>
          </div>

          <div>
            <p className={fieldLabel}>Also solvable by</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {(q.otherSections ?? []).map((id) => (
                <span key={id} className="font-body flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-0.5 text-xs text-[var(--ink)]">
                  {sectionLabel(id)}
                  <button type="button" aria-label={`Remove ${sectionLabel(id)}`} onClick={() => set({ otherSections: (q.otherSections ?? []).filter((x) => x !== id) })}>
                    ✕
                  </button>
                </span>
              ))}
              <select
                value=""
                onChange={(e) => e.target.value && set({ otherSections: [...(q.otherSections ?? []), e.target.value] })}
                className="font-body rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-xs text-[var(--ink)]"
              >
                <option value="">+ add technique</option>
                {sortedSections
                  .filter((s) => s.id !== q.section && !(q.otherSections ?? []).includes(s.id))
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.number} · {s.topic} › {s.subtopic}
                    </option>
                  ))}
              </select>
            </div>
            {q.section && sectionById.get(q.section) === undefined && <p className="font-body mt-1 text-xs text-amber-700">Main technique id {q.section} isn't in sections.json.</p>}
          </div>

          <div>
            <p className={fieldLabel}>Tags</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {q.tags.map((t) => (
                <span key={t} className="font-body flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs text-[var(--ink)]">
                  {t}
                  <button type="button" aria-label={`Remove tag ${t}`} onClick={() => set({ tags: q.tags.filter((x) => x !== t) })}>
                    ✕
                  </button>
                </span>
              ))}
              <input
                value={tagText}
                list="interview-tags"
                placeholder="Add tag, then Enter"
                onChange={(e) => setTagText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTags(tagText);
                  }
                }}
                onBlur={() => tagText.trim() && addTags(tagText)}
                className="font-body min-w-40 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-xs text-[var(--ink)]"
              />
              <datalist id="interview-tags">
                {allTags.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={`${fieldLabel} block`}>
              Source
              <input value={q.source} onChange={(e) => set({ source: e.target.value })} className={field} />
            </label>
            <label className={`${fieldLabel} block`}>
              Review note (internal)
              <input value={q.reviewNote ?? ""} onChange={(e) => set({ reviewNote: e.target.value || undefined })} className={field} />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
