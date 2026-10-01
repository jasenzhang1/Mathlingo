import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useAuth } from "../lib/auth/useAuth";
import { useIsDeveloper } from "../lib/dev/devAuth";
import { publishBundles } from "../lib/dev/publishOverrides";
import { difficultyOf, families, familyById, isLive, questionById, questions, repoBundles, sectionLabel, techniquesOf } from "../lib/interview/bank";
import { clearBundleDraft, loadBundleDraft, saveBundleDraft } from "../lib/interview/bundleDraft";
import type { Bundle } from "../lib/interview/types";

/**
 * `/dev/bundles`: see and reshape the mock-interview chains.
 *
 * Edits live in this browser (and are what this browser's mock interviews
 * serve, so a chain can be played before it ships) until "Publish" opens a PR
 * replacing `web/src/data/interview/bundles.json`.
 */

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "bundle";
}

function warningsFor(b: Bundle): string[] {
  const out: string[] = [];
  const qs = b.questions.map((id) => questionById.get(id));
  qs.forEach((q, i) => {
    if (!q) out.push(`Step ${i + 1}: question ${b.questions[i]} no longer exists`);
    else if (!isLive(q)) out.push(`Step ${i + 1}: ${q.id} is a draft and will be skipped`);
  });
  for (let i = 1; i < qs.length; i++) {
    const a = qs[i - 1];
    const c = qs[i];
    if (a && c && difficultyOf(c) < difficultyOf(a)) out.push(`Step ${i + 1} is easier than step ${i} (${difficultyOf(c)} after ${difficultyOf(a)})`);
  }
  if (b.questions.length < 2) out.push("Fewer than two questions");
  return out;
}

const btn = "font-body rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-40";
const primary = "font-body rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-40";

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
          <BundleEditor />
        )}
      </main>
      <Footer />
    </div>
  );
}

type ListFilter = "all" | "curated" | "auto" | "warnings";

function BundleEditor() {
  const [bundles, setBundlesState] = useState<Bundle[]>(() => loadBundleDraft() ?? repoBundles);
  const [selectedId, setSelectedId] = useState<string | null>(bundles[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ListFilter>("all");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [publishing, setPublishing] = useState(false);

  const dirty = useMemo(() => JSON.stringify(bundles) !== JSON.stringify(repoBundles), [bundles]);

  function setBundles(next: Bundle[]) {
    setBundlesState(next);
    saveBundleDraft(next);
  }
  function update(id: string, patch: Partial<Bundle>) {
    setBundles(bundles.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  const listed = bundles.filter((b) => {
    const fam = b.family ? familyById.get(b.family)?.name ?? b.family : "";
    const text = `${b.title} ${b.id} ${fam}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (filter === "curated") return b.curated;
    if (filter === "auto") return !b.curated;
    if (filter === "warnings") return warningsFor(b).length > 0;
    return true;
  });
  const selected = bundles.find((b) => b.id === selectedId) ?? null;

  function newBundle() {
    const family = selected?.family ?? null;
    let id = slugify(`${family ?? "new"}-custom`);
    for (let n = 2; bundles.some((b) => b.id === id); n++) id = slugify(`${family ?? "new"}-custom-${n}`);
    const b: Bundle = { id, title: "New bundle", family, questions: [], curated: true };
    setBundles([b, ...bundles]);
    setSelectedId(id);
  }

  async function publish() {
    setPublishing(true);
    setStatus(null);
    const result = await publishBundles(bundles);
    setPublishing(false);
    setStatus(result.ok ? { kind: "ok", text: `Opened PR #${result.prNumber}: ${result.prUrl}` } : { kind: "error", text: result.message });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(bundles, null, 1) + "\n"], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bundles.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-[var(--ink)]">Interview bundles</h1>
          <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
            {bundles.length} bundles · {bundles.filter((b) => b.curated).length} curated ·{" "}
            {dirty ? "unpublished changes in this browser" : "matches the repo"}.{" "}
            <Link to="/interview" className="text-[var(--accent)] hover:underline">
              Try them in Interview Prep
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={btn} onClick={newBundle}>
            New bundle
          </button>
          <button type="button" className={btn} onClick={exportJson}>
            Export JSON
          </button>
          <button
            type="button"
            className={btn}
            disabled={!dirty}
            onClick={() => {
              if (!confirm("Discard every unpublished bundle edit in this browser?")) return;
              clearBundleDraft();
              setBundlesState(repoBundles);
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bundles or scenarios"
            className="font-body w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)]"
          />
          <div className="mt-2 flex flex-wrap gap-1">
            {(["all", "curated", "auto", "warnings"] as ListFilter[]).map((f) => (
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
              const w = warningsFor(b).length;
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
                    <span className="shrink-0 text-xs text-[var(--ink-soft)]">
                      {w > 0 && <span className="mr-1 text-amber-600" title={`${w} warning(s)`}>⚠</span>}
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
            onChange={(patch) => update(selected.id, patch)}
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
    </div>
  );
}

function BundleDetail({ bundle, onChange, onDelete }: { bundle: Bundle; onChange: (patch: Partial<Bundle>) => void; onDelete: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const warnings = warningsFor(bundle);

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
          <label className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            Title
            <input
              value={bundle.title}
              onChange={(e) => onChange({ title: e.target.value })}
              className="font-body mt-1 block w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm font-normal normal-case tracking-normal text-[var(--ink)]"
            />
          </label>
          <label className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            Scenario
            <select
              value={bundle.family ?? ""}
              onChange={(e) => onChange({ family: e.target.value || null })}
              className="font-body mt-1 block w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm font-normal normal-case tracking-normal text-[var(--ink)]"
            >
              <option value="">(none)</option>
              {[...families].sort((a, b) => a.name.localeCompare(b.name)).map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="font-body flex items-center gap-2 text-sm text-[var(--ink)]">
            <input type="checkbox" checked={bundle.curated} onChange={(e) => onChange({ curated: e.target.checked })} />
            Curated (checked by a person; served 3× as often)
          </label>
          <span className="font-body text-xs text-[var(--ink-soft)]">id: {bundle.id}</span>
          <span className="flex-1" />
          <button
            type="button"
            className={btn}
            onClick={() => {
              // Stable sort: equal difficulties keep their authored order. Missing questions sink.
              const d = (id: string) => {
                const q = questionById.get(id);
                return q ? difficultyOf(q) : Infinity;
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
          const q = questionById.get(id);
          return (
            <li key={`${id}-${i}`} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3">
              <div className="flex items-start gap-3">
                <span className="font-body mt-0.5 w-6 shrink-0 text-sm font-semibold text-[var(--ink-soft)]">{i + 1}</span>
                <button type="button" onClick={() => setOpen(open === id ? null : id)} className="min-w-0 flex-1 text-left">
                  <p className={`font-body text-sm text-[var(--ink)] ${open === id ? "whitespace-pre-wrap" : "line-clamp-2"}`}>
                    {q ? q.question : `Missing question ${id}`}
                  </p>
                  {q && (
                    <p className="font-body mt-1 text-xs text-[var(--ink-soft)]">
                      {q.id} · difficulty {q.difficulty ?? "unrated"} · {sectionLabel(q.section)}
                      {q.family !== bundle.family && q.family && ` · from ${familyById.get(q.family)?.name ?? q.family}`}
                      {!isLive(q) && " · DRAFT"}
                    </p>
                  )}
                </button>
                <span className="flex shrink-0 gap-1">
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

      <QuestionPicker bundle={bundle} onAdd={(id) => onChange({ questions: [...bundle.questions, id] })} />
    </section>
  );
}

function QuestionPicker({ bundle, onAdd }: { bundle: Bundle; onAdd: (id: string) => void }) {
  const [text, setText] = useState("");
  const [sameFamily, setSameFamily] = useState(Boolean(bundle.family));
  const results = useMemo(() => {
    const t = text.trim().toLowerCase();
    const inBundle = new Set(bundle.questions);
    return questions
      .filter((q) => !inBundle.has(q.id))
      .filter((q) => !sameFamily || q.family === bundle.family)
      .filter((q) => !t || q.id.includes(t) || q.question.toLowerCase().includes(t) || q.tags.some((tag) => tag.toLowerCase().includes(t)) || techniquesOf(q).some((s) => sectionLabel(s).toLowerCase().includes(t)))
      .sort((a, b) => difficultyOf(a) - difficultyOf(b))
      .slice(0, 60);
  }, [text, sameFamily, bundle.questions, bundle.family]);

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
              <span className="font-body line-clamp-2 text-sm text-[var(--ink)]">{q.question}</span>
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
