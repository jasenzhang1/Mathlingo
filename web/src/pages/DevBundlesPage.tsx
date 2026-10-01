import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useAuth } from "../lib/auth/useAuth";
import { useIsDeveloper } from "../lib/dev/devAuth";
import { publishInterview } from "../lib/dev/publishOverrides";
import { DEFAULT_DIFFICULTY, families, familyById, isLive, repoBundles, repoQuestions, sectionById, sectionLabel, sections, techniquesOf } from "../lib/interview/bank";
import { clearBundleDraft, loadBundleDraft, saveBundleDraft } from "../lib/interview/bundleDraft";
import { applyQuestionDraft, clearQuestionDraft, loadQuestionDraft, saveQuestionDraft, type QuestionDraft } from "../lib/interview/questionDraft";
import type { Bundle, InterviewQuestion } from "../lib/interview/types";

/**
 * `/dev/bundles`: the interview databank's editor, in two views.
 *
 * - **Bundles** — see and reshape the mock-interview chains, and mark a bundle
 *   free (which makes every question in it free).
 * - **Questions** — every question individually: edit its text, answer,
 *   solution, techniques, scenario and tags, add new ones, and set free or
 *   locked and draft or live.
 *
 * Edits live in this browser (and are what this browser's interview pages
 * serve after a reload, so a change can be tried before it ships) until
 * "Publish as PR" opens one PR: the bundle list replaces `bundles.json`, and
 * edited questions are merged by id into `questions.json`.
 */

type View = "bundles" | "questions";

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "bundle";
}

const difficulty = (q: InterviewQuestion) => q.difficulty ?? DEFAULT_DIFFICULTY;

function warningsFor(b: Bundle, qById: Map<string, InterviewQuestion>): string[] {
  const out: string[] = [];
  const qs = b.questions.map((id) => qById.get(id));
  qs.forEach((q, i) => {
    if (!q) out.push(`Step ${i + 1}: question ${b.questions[i]} no longer exists`);
    else if (!isLive(q)) out.push(`Step ${i + 1}: ${q.id} is a draft and will be skipped`);
  });
  for (let i = 1; i < qs.length; i++) {
    const a = qs[i - 1];
    const c = qs[i];
    if (a && c && difficulty(c) < difficulty(a)) out.push(`Step ${i + 1} is easier than step ${i} (${difficulty(c)} after ${difficulty(a)})`);
  }
  if (b.questions.length < 2) out.push("Fewer than two questions");
  return out;
}

/**
 * Drops optional fields that are empty or at their default, and keeps the
 * repo version's key order, so an untouched field never shows up in the PR.
 */
function normalizeQuestion(q: InterviewQuestion, original?: InterviewQuestion): InterviewQuestion {
  const c: Record<string, unknown> = { ...q };
  if (!q.otherSections?.length) delete c.otherSections;
  if (q.numericAnswer === undefined || !Number.isFinite(q.numericAnswer)) delete c.numericAnswer;
  if (q.status !== "draft") delete c.status;
  if (!q.free) delete c.free;
  if (!q.reviewNote) delete c.reviewNote;
  if (!q.instructional) delete c.instructional;
  const canonical = ["id", "section", "otherSections", "family", "difficulty", "question", "answer", "notes", "tags", "source", "instructional", "numericAnswer", "status", "free", "reviewNote"];
  const order = [...Object.keys(original ?? {}), ...canonical, ...Object.keys(c)];
  const out: Record<string, unknown> = {};
  for (const k of order) if (k in c && !(k in out)) out[k] = c[k];
  return out as unknown as InterviewQuestion;
}

const btn = "font-body rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-40";
const primary = "font-body rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-40";
const field = "font-body mt-1 block w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm font-normal normal-case tracking-normal text-[var(--ink)]";
const fieldLabel = "font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]";
const freeBadge = "rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]";
const lockedBadge = "rounded-full bg-[var(--paper)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--ink-soft)]";

const sortedSections = [...sections].sort((a, b) => a.number - b.number || a.subtopic.localeCompare(b.subtopic));
const sortedFamilies = [...families].sort((a, b) => a.name.localeCompare(b.name));

export function DevBundlesPage() {
  const { user, loading } = useAuth();
  const isDeveloper = useIsDeveloper();

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-10">
        {loading ? null : !user || !isDeveloper ? (
          <p className="font-body text-[var(--ink-soft)]">This page is for Mathlingo developers.</p>
        ) : (
          <InterviewEditor />
        )}
      </main>
      <Footer />
    </div>
  );
}

function InterviewEditor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view: View = searchParams.get("view") === "questions" ? "questions" : "bundles";
  const setView = (v: View) => setSearchParams(v === "questions" ? { view: v } : {}, { replace: true });

  const [bundles, setBundlesState] = useState<Bundle[]>(() => loadBundleDraft() ?? repoBundles);
  const [qDraft, setQDraftState] = useState<QuestionDraft>(() => loadQuestionDraft());
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(bundles[0]?.id ?? null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [publishing, setPublishing] = useState(false);

  const repoById = useMemo(() => new Map(repoQuestions.map((q) => [q.id, q])), []);
  const allQuestions = useMemo(() => applyQuestionDraft(repoQuestions, qDraft), [qDraft]);
  const qById = useMemo(() => new Map(allQuestions.map((q) => [q.id, q])), [allQuestions]);
  const freeViaBundle = useMemo(() => new Set(bundles.filter((b) => b.free).flatMap((b) => b.questions)), [bundles]);

  const bundlesDirty = useMemo(() => JSON.stringify(bundles) !== JSON.stringify(repoBundles), [bundles]);
  const editedCount = Object.keys(qDraft).length;
  const dirty = bundlesDirty || editedCount > 0;

  function setBundles(next: Bundle[]) {
    setBundlesState(next);
    saveBundleDraft(next);
  }
  function setQDraft(next: QuestionDraft) {
    setQDraftState(next);
    saveQuestionDraft(next);
  }

  /** Stores a question edit, or drops it from the draft once it matches the repo again. */
  function saveQuestion(q: InterviewQuestion) {
    const original = repoById.get(q.id);
    const normalized = normalizeQuestion(q, original);
    const next = { ...qDraft };
    if (original && JSON.stringify(normalized) === JSON.stringify(original)) delete next[q.id];
    else next[q.id] = normalized;
    setQDraft(next);
  }

  function revertQuestion(id: string) {
    const next = { ...qDraft };
    delete next[id];
    setQDraft(next);
    if (!repoById.has(id)) setSelectedQuestionId(null);
  }

  function newQuestion() {
    const max = Math.max(0, ...allQuestions.map((q) => Number(q.id.replace(/^iq-/, "")) || 0));
    const id = `iq-${String(max + 1).padStart(4, "0")}`;
    const current = selectedQuestionId ? qById.get(selectedQuestionId) : undefined;
    // New questions start as drafts, so nothing half-written is ever served.
    saveQuestion({
      id,
      section: current?.section ?? null,
      family: current?.family ?? null,
      difficulty: null,
      question: "",
      answer: "",
      notes: "",
      tags: [],
      source: "Mathlingo",
      status: "draft",
    });
    setSelectedQuestionId(id);
    setView("questions");
  }

  function newBundle() {
    const selected = bundles.find((b) => b.id === selectedBundleId);
    const family = selected?.family ?? null;
    let id = slugify(`${family ?? "new"}-custom`);
    for (let n = 2; bundles.some((b) => b.id === id); n++) id = slugify(`${family ?? "new"}-custom-${n}`);
    setBundles([{ id, title: "New bundle", family, questions: [], curated: true }, ...bundles]);
    setSelectedBundleId(id);
  }

  async function publish() {
    setPublishing(true);
    setStatus(null);
    const result = await publishInterview({
      bundles: bundlesDirty ? bundles : undefined,
      questions: editedCount > 0 ? Object.values(qDraft) : undefined,
    });
    setPublishing(false);
    setStatus(result.ok ? { kind: "ok", text: `Opened PR #${result.prNumber}: ${result.prUrl}` } : { kind: "error", text: result.message });
  }

  function exportJson() {
    const [data, name] = view === "bundles" ? [bundles, "bundles.json"] : [allQuestions, "questions.json"];
    const blob = new Blob([JSON.stringify(data, null, 1) + "\n"], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const changes = [bundlesDirty && "bundles", editedCount > 0 && `${editedCount} question${editedCount === 1 ? "" : "s"}`].filter(Boolean).join(" and ");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-[var(--ink)]">Interview databank</h1>
          <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
            {bundles.length} bundles ({bundles.filter((b) => b.free).length} free) · {allQuestions.length} questions ·{" "}
            {dirty ? `unpublished changes to ${changes} in this browser` : "matches the repo"}.{" "}
            <Link to="/interview" className="text-[var(--accent)] hover:underline">
              Try them in Interview Prep
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={btn} onClick={view === "bundles" ? newBundle : newQuestion}>
            {view === "bundles" ? "New bundle" : "New question"}
          </button>
          <button type="button" className={btn} onClick={exportJson}>
            Export JSON
          </button>
          <button
            type="button"
            className={btn}
            disabled={!dirty}
            onClick={() => {
              if (!confirm("Discard every unpublished bundle and question edit in this browser?")) return;
              clearBundleDraft();
              clearQuestionDraft();
              setBundlesState(repoBundles);
              setQDraftState({});
              if (selectedQuestionId && !repoById.has(selectedQuestionId)) setSelectedQuestionId(null);
            }}
          >
            Discard changes
          </button>
          <button type="button" className={primary} disabled={!dirty || publishing} onClick={() => void publish()}>
            {publishing ? "Publishing…" : "Publish as PR"}
          </button>
        </div>
      </div>
      {status && (
        <p className={`font-body mt-3 rounded-xl px-4 py-2 text-sm ${status.kind === "ok" ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-red-50 text-red-700"}`}>
          {status.text}
        </p>
      )}

      <div className="mt-5 inline-flex rounded-full border border-[var(--line)] bg-[var(--panel)] p-1">
        {(["bundles", "questions"] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`font-body rounded-full px-4 py-1.5 text-sm font-medium ${view === v ? "bg-[var(--accent)] text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}
          >
            {v === "bundles" ? "Bundles" : "Questions"}
          </button>
        ))}
      </div>

      {view === "bundles" ? (
        <BundleWorkspace
          bundles={bundles}
          setBundles={setBundles}
          selectedId={selectedBundleId}
          setSelectedId={setSelectedBundleId}
          qById={qById}
          allQuestions={allQuestions}
          freeViaBundle={freeViaBundle}
          openQuestion={(id) => {
            setSelectedQuestionId(id);
            setView("questions");
          }}
        />
      ) : (
        <QuestionWorkspace
          allQuestions={allQuestions}
          qDraft={qDraft}
          repoById={repoById}
          bundles={bundles}
          freeViaBundle={freeViaBundle}
          selectedId={selectedQuestionId}
          setSelectedId={setSelectedQuestionId}
          onSave={saveQuestion}
          onRevert={revertQuestion}
          openBundle={(id) => {
            setSelectedBundleId(id);
            setView("bundles");
          }}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bundles view
// ---------------------------------------------------------------------------

type ListFilter = "all" | "curated" | "auto" | "free" | "warnings";

function BundleWorkspace({
  bundles,
  setBundles,
  selectedId,
  setSelectedId,
  qById,
  allQuestions,
  freeViaBundle,
  openQuestion,
}: {
  bundles: Bundle[];
  setBundles: (next: Bundle[]) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  qById: Map<string, InterviewQuestion>;
  allQuestions: InterviewQuestion[];
  freeViaBundle: Set<string>;
  openQuestion: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ListFilter>("all");

  const listed = bundles.filter((b) => {
    const fam = b.family ? familyById.get(b.family)?.name ?? b.family : "";
    const text = `${b.title} ${b.id} ${fam}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (filter === "curated") return b.curated;
    if (filter === "auto") return !b.curated;
    if (filter === "free") return Boolean(b.free);
    if (filter === "warnings") return warningsFor(b, qById).length > 0;
    return true;
  });
  const selected = bundles.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bundles or scenarios"
          className="font-body w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)]"
        />
        <div className="mt-2 flex flex-wrap gap-1">
          {(["all", "curated", "auto", "free", "warnings"] as ListFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`font-body rounded-full px-2.5 py-0.5 text-xs ${filter === f ? "bg-[var(--accent)] text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}
            >
              {f === "auto" ? "not curated" : f}
            </button>
          ))}
        </div>
        <ul className="mt-2 max-h-[70vh] space-y-0.5 overflow-y-auto">
          {listed.map((b) => {
            const w = warningsFor(b, qById).length;
            return (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(b.id)}
                  className={`font-body flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm ${b.id === selectedId ? "bg-[var(--accent-soft)] text-[var(--ink)]" : "text-[var(--ink)] hover:bg-[var(--paper)]"}`}
                >
                  <span className="min-w-0 truncate">
                    {b.curated && <span className="mr-1 text-[var(--teal)]" title="Curated">●</span>}
                    {b.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-[var(--ink-soft)]">
                    {b.free && <span className={freeBadge}>free</span>}
                    {w > 0 && <span className="text-amber-600" title={`${w} warning(s)`}>⚠</span>}
                    {b.questions.length}
                  </span>
                </button>
              </li>
            );
          })}
          {listed.length === 0 && <li className="font-body px-2.5 py-2 text-sm text-[var(--ink-soft)]">No bundles match.</li>}
        </ul>
      </aside>

      {selected ? (
        <BundleDetail
          key={selected.id}
          bundle={selected}
          qById={qById}
          allQuestions={allQuestions}
          freeViaBundle={freeViaBundle}
          openQuestion={openQuestion}
          onChange={(patch) => setBundles(bundles.map((b) => (b.id === selected.id ? { ...b, ...patch } : b)))}
          onDelete={() => {
            if (!confirm(`Delete "${selected.title}"?`)) return;
            const next = bundles.filter((b) => b.id !== selected.id);
            setBundles(next);
            setSelectedId(next[0]?.id ?? null);
          }}
        />
      ) : (
        <p className="font-body text-[var(--ink-soft)]">Select a bundle.</p>
      )}
    </div>
  );
}

function BundleDetail({
  bundle,
  qById,
  allQuestions,
  freeViaBundle,
  openQuestion,
  onChange,
  onDelete,
}: {
  bundle: Bundle;
  qById: Map<string, InterviewQuestion>;
  allQuestions: InterviewQuestion[];
  freeViaBundle: Set<string>;
  openQuestion: (id: string) => void;
  onChange: (patch: Partial<Bundle>) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const warnings = warningsFor(bundle, qById);

  function move(i: number, by: number) {
    const qs = [...bundle.questions];
    const [id] = qs.splice(i, 1);
    qs.splice(i + by, 0, id);
    onChange({ questions: qs });
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_260px]">
          <label className={fieldLabel}>
            Title
            <input value={bundle.title} onChange={(e) => onChange({ title: e.target.value })} className={field} />
          </label>
          <label className={fieldLabel}>
            Scenario
            <select value={bundle.family ?? ""} onChange={(e) => onChange({ family: e.target.value || null })} className={field}>
              <option value="">(none)</option>
              {sortedFamilies.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <label className="font-body flex items-center gap-2 text-sm text-[var(--ink)]">
            <input type="checkbox" checked={bundle.curated} onChange={(e) => onChange({ curated: e.target.checked })} />
            Curated (checked by a person; served 3× as often)
          </label>
          <label className="font-body flex items-center gap-2 text-sm text-[var(--ink)]">
            <input type="checkbox" checked={Boolean(bundle.free)} onChange={(e) => onChange({ free: e.target.checked || undefined })} />
            Free (playable without a subscription; makes all its questions free)
          </label>
          <span className="font-body text-xs text-[var(--ink-soft)]">id: {bundle.id}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className={btn}
            onClick={() => {
              // Stable sort: equal difficulties keep their authored order. Missing questions sink.
              const d = (id: string) => {
                const q = qById.get(id);
                return q ? difficulty(q) : Infinity;
              };
              onChange({ questions: [...bundle.questions].sort((a, b) => d(a) - d(b)) });
            }}
          >
            Sort by difficulty
          </button>
          <Link to={`/interview/mock?bundle=${encodeURIComponent(bundle.id)}`} className={btn}>
            Play it
          </Link>
          <button type="button" className={`${btn} hover:border-red-400`} onClick={onDelete}>
            Delete
          </button>
        </div>
        {warnings.length > 0 && (
          <ul className="font-body mt-3 space-y-0.5 text-xs text-amber-700">
            {warnings.map((w) => (
              <li key={w}>⚠ {w}</li>
            ))}
          </ul>
        )}
      </div>

      <ol className="space-y-2">
        {bundle.questions.map((id, i) => {
          const q = qById.get(id);
          const free = q ? Boolean(q.free) || freeViaBundle.has(q.id) : false;
          return (
            <li key={`${id}-${i}`} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3">
              <div className="flex items-start gap-3">
                <span className="font-body mt-0.5 w-6 shrink-0 text-sm font-semibold text-[var(--ink-soft)]">{i + 1}</span>
                <button type="button" onClick={() => setOpen(open === id ? null : id)} className="min-w-0 flex-1 text-left">
                  <p className={`font-body text-sm text-[var(--ink)] ${open === id ? "whitespace-pre-wrap" : "line-clamp-2"}`}>
                    {q ? q.question || "(no question text yet)" : `Missing question ${id}`}
                  </p>
                  {q && (
                    <p className="font-body mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-[var(--ink-soft)]">
                      <span className={free ? freeBadge : lockedBadge}>{free ? "free" : "locked"}</span>
                      {q.id} · difficulty {q.difficulty ?? "unrated"} · {sectionLabel(q.section)}
                      {q.family !== bundle.family && q.family && ` · from ${familyById.get(q.family)?.name ?? q.family}`}
                      {!isLive(q) && " · DRAFT"}
                    </p>
                  )}
                </button>
                <span className="flex shrink-0 gap-1">
                  {q && (
                    <button type="button" className={btn} onClick={() => openQuestion(q.id)}>
                      Edit
                    </button>
                  )}
                  <button type="button" className={btn} disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">
                    ↑
                  </button>
                  <button type="button" className={btn} disabled={i === bundle.questions.length - 1} onClick={() => move(i, 1)} aria-label="Move down">
                    ↓
                  </button>
                  <button
                    type="button"
                    className={`${btn} hover:border-red-400`}
                    onClick={() => onChange({ questions: bundle.questions.filter((_, j) => j !== i) })}
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </span>
              </div>
              {open === id && q && (
                <div className="font-body mt-3 space-y-2 border-t border-[var(--line)] pt-3 pl-9 text-sm">
                  <p className="whitespace-pre-wrap text-[var(--ink)]">
                    <span className="font-semibold">Answer: </span>
                    {q.answer}
                  </p>
                  {q.notes && <p className="whitespace-pre-wrap text-[var(--ink-soft)]">{q.notes}</p>}
                  {q.reviewNote && <p className="text-amber-700">Review note: {q.reviewNote}</p>}
                </div>
              )}
            </li>
          );
        })}
        {bundle.questions.length === 0 && <li className="font-body text-sm text-[var(--ink-soft)]">No questions yet. Add some below.</li>}
      </ol>

      <QuestionPicker bundle={bundle} allQuestions={allQuestions} onAdd={(id) => onChange({ questions: [...bundle.questions, id] })} />
    </section>
  );
}

/** True when every word of the search text appears in the question's text, answer, id, tags or techniques. */
function matchesSearch(q: InterviewQuestion, text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return true;
  const hay = [q.id, q.question, q.answer, ...q.tags, ...techniquesOf(q).map(sectionLabel)].join(" ").toLowerCase();
  return t.split(/\s+/).every((w) => hay.includes(w));
}

function QuestionPicker({ bundle, allQuestions, onAdd }: { bundle: Bundle; allQuestions: InterviewQuestion[]; onAdd: (id: string) => void }) {
  const [text, setText] = useState("");
  const [sameFamily, setSameFamily] = useState(Boolean(bundle.family));
  const results = useMemo(() => {
    const inBundle = new Set(bundle.questions);
    return allQuestions
      .filter((q) => !inBundle.has(q.id))
      .filter((q) => !sameFamily || q.family === bundle.family)
      .filter((q) => matchesSearch(q, text))
      .sort((a, b) => difficulty(a) - difficulty(b))
      .slice(0, 60);
  }, [text, sameFamily, bundle.questions, bundle.family, allQuestions]);

  return (
    <div className="rounded-2xl border border-dashed border-[var(--line)] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-body text-sm font-semibold text-[var(--ink)]">Add a question</h3>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search text, tag, technique or id"
          className="font-body min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)]"
        />
        <label className="font-body flex items-center gap-2 text-xs text-[var(--ink-soft)]">
          <input type="checkbox" checked={sameFamily} disabled={!bundle.family} onChange={(e) => setSameFamily(e.target.checked)} />
          Only this scenario
        </label>
      </div>
      <ul className="mt-3 max-h-96 space-y-1 overflow-y-auto">
        {results.map((q) => (
          <li key={q.id} className="flex items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-[var(--panel)]">
            <button type="button" className={btn} onClick={() => onAdd(q.id)}>
              Add
            </button>
            <span className="min-w-0 flex-1">
              <span className="font-body line-clamp-2 text-sm text-[var(--ink)]">{q.question || "(no question text yet)"}</span>
              <span className="font-body text-xs text-[var(--ink-soft)]">
                {q.id} · difficulty {q.difficulty ?? "unrated"} · {sectionLabel(q.section)}
                {!isLive(q) && " · DRAFT"}
              </span>
            </span>
          </li>
        ))}
        {results.length === 0 && <li className="font-body text-sm text-[var(--ink-soft)]">No matches.</li>}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Questions view
// ---------------------------------------------------------------------------

type AccessFilter = "all" | "free" | "locked" | "draft" | "edited";
const LIST_LIMIT = 200;

function QuestionWorkspace({
  allQuestions,
  qDraft,
  repoById,
  bundles,
  freeViaBundle,
  selectedId,
  setSelectedId,
  onSave,
  onRevert,
  openBundle,
}: {
  allQuestions: InterviewQuestion[];
  qDraft: QuestionDraft;
  repoById: Map<string, InterviewQuestion>;
  bundles: Bundle[];
  freeViaBundle: Set<string>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onSave: (q: InterviewQuestion) => void;
  onRevert: (id: string) => void;
  openBundle: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [access, setAccess] = useState<AccessFilter>("all");
  const [technique, setTechnique] = useState("");
  const [family, setFamily] = useState("");

  const isFree = (q: InterviewQuestion) => Boolean(q.free) || freeViaBundle.has(q.id);
  const matched = useMemo(
    () =>
      allQuestions.filter((q) => {
        const free = Boolean(q.free) || freeViaBundle.has(q.id);
        if (access === "free" && !free) return false;
        if (access === "locked" && free) return false;
        if (access === "draft" && isLive(q)) return false;
        if (access === "edited" && !qDraft[q.id]) return false;
        if (technique && !techniquesOf(q).includes(technique)) return false;
        if (family && q.family !== family) return false;
        return matchesSearch(q, search);
      }),
    [allQuestions, access, technique, family, search, qDraft, freeViaBundle],
  );
  const selected = selectedId ? allQuestions.find((q) => q.id === selectedId) ?? null : null;
  const freeCount = allQuestions.filter(isFree).length;

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search text, answer, tag, technique or id"
          className="font-body w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)]"
        />
        <div className="mt-2 flex flex-wrap gap-1">
          {(["all", "free", "locked", "draft", "edited"] as AccessFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setAccess(f)}
              className={`font-body rounded-full px-2.5 py-0.5 text-xs ${access === f ? "bg-[var(--accent)] text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <select value={technique} onChange={(e) => setTechnique(e.target.value)} className={`${field} mt-2 text-xs`}>
          <option value="">All techniques</option>
          {sortedSections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.number} · {s.topic} › {s.subtopic}
            </option>
          ))}
        </select>
        <select value={family} onChange={(e) => setFamily(e.target.value)} className={`${field} mt-2 text-xs`}>
          <option value="">All scenarios</option>
          {sortedFamilies.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <p className="font-body mt-2 px-1 text-xs text-[var(--ink-soft)]">
          {matched.length} match{matched.length === 1 ? "" : "es"}
          {matched.length > LIST_LIMIT && ` (showing ${LIST_LIMIT})`} · {freeCount} free overall
        </p>
        <ul className="mt-1 max-h-[62vh] space-y-0.5 overflow-y-auto">
          {matched.slice(0, LIST_LIMIT).map((q) => (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => setSelectedId(q.id)}
                className={`font-body block w-full rounded-lg px-2.5 py-1.5 text-left ${q.id === selectedId ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--paper)]"}`}
              >
                <span className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
                  <span className={isFree(q) ? freeBadge : lockedBadge}>{isFree(q) ? "free" : "locked"}</span>
                  {q.id}
                  {!isLive(q) && " · draft"}
                  {qDraft[q.id] && <span className="text-amber-600">· {repoById.has(q.id) ? "edited" : "new"}</span>}
                </span>
                <span className="mt-0.5 line-clamp-2 text-sm text-[var(--ink)]">{q.question || "(no question text yet)"}</span>
              </button>
            </li>
          ))}
          {matched.length === 0 && <li className="font-body px-2.5 py-2 text-sm text-[var(--ink-soft)]">No questions match.</li>}
        </ul>
      </aside>

      {selected ? (
        <QuestionForm
          key={selected.id}
          question={selected}
          isNew={!repoById.has(selected.id)}
          edited={Boolean(qDraft[selected.id])}
          bundles={bundles}
          freeViaBundle={freeViaBundle}
          allQuestions={allQuestions}
          onSave={onSave}
          onRevert={() => onRevert(selected.id)}
          openBundle={openBundle}
        />
      ) : (
        <p className="font-body text-[var(--ink-soft)]">Select a question, or add a new one.</p>
      )}
    </div>
  );
}

function QuestionForm({
  question: q,
  isNew,
  edited,
  bundles,
  freeViaBundle,
  allQuestions,
  onSave,
  onRevert,
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
  openBundle: (id: string) => void;
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
          {(isNew || edited) && (
            <button
              type="button"
              className={`${btn} hover:border-red-400`}
              onClick={() => {
                if (confirm(isNew ? `Delete the unpublished question ${q.id}?` : `Revert ${q.id} to the published version?`)) onRevert();
              }}
            >
              {isNew ? "Delete new question" : "Revert"}
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
                      <button type="button" className="text-[var(--accent)] hover:underline" onClick={() => openBundle(b.id)}>
                        {b.title}
                      </button>
                    </span>
                  ))}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
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
