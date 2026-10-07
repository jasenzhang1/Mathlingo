import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useAuth } from "../lib/auth/useAuth";
import { useIsDeveloper } from "../lib/dev/devAuth";
import {
  loadSiteFeedback,
  screenshotUrl,
  setSiteFeedbackStatus,
  type SiteFeedbackRow,
} from "../lib/feedback/siteFeedback";

/** What students sent from the feedback bubble, each with the page and screen it was about. */
export function DevFeedbackPage() {
  const { user, loading } = useAuth();
  const isDeveloper = useIsDeveloper();
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-10">
        {loading ? null : !user || !isDeveloper ? (
          <p className="font-body text-[var(--ink-soft)]">This page is for Mathlingo developers.</p>
        ) : (
          <Inbox />
        )}
      </main>
      <Footer />
    </div>
  );
}

function Inbox() {
  const [status, setStatus] = useState<"open" | "resolved">("open");
  const [rows, setRows] = useState<SiteFeedbackRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let cancelled = false;
    void loadSiteFeedback(status).then((r) => {
      if (cancelled) return;
      setRows(r.rows);
      setError(r.error);
    });
    return () => {
      cancelled = true;
    };
  }, [status]);

  async function toggle(row: SiteFeedbackRow) {
    const result = await setSiteFeedbackStatus(row.id, row.status === "open" ? "resolved" : "open");
    if (result.error) setError(result.error);
    else setRows((cur) => cur?.filter((r) => r.id !== row.id) ?? null);
  }

  const needle = filter.trim().toLowerCase();
  const shown = rows?.filter((r) => !needle || `${r.message} ${r.path} ${r.profiles?.username ?? ""}`.toLowerCase().includes(needle));

  return (
    <div className="font-body">
      <h1 className="font-display text-3xl text-[var(--ink)]">Student feedback</h1>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Sent from the bubble in the corner of every page, with what the student saw when they opened it.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
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
            {status === s && rows ? ` · ${rows.length}` : ""}
          </button>
        ))}
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by message, page, or username"
          className="ml-auto w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--ink)] sm:w-72"
        />
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <div className="mt-4 space-y-4">
        {!shown ? (
          <div className="h-24 animate-pulse rounded-2xl bg-[var(--panel)]" />
        ) : shown.length === 0 ? (
          <p className="text-sm text-[var(--ink-soft)]">Nothing {status}.</p>
        ) : (
          shown.map((row) => <FeedbackCard key={row.id} row={row} onToggle={() => void toggle(row)} />)
        )}
      </div>
    </div>
  );
}

function FeedbackCard({ row, onToggle }: { row: SiteFeedbackRow; onToggle: () => void }) {
  const [shot, setShot] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);
  const c = row.context ?? {};
  const who = row.profiles?.username ? `@${row.profiles.username}` : (row.profiles?.display_name ?? row.user_id.slice(0, 8));

  useEffect(() => {
    if (!row.screenshot_path) return;
    let cancelled = false;
    void screenshotUrl(row.screenshot_path).then((u) => !cancelled && setShot(u));
    return () => {
      cancelled = true;
    };
  }, [row.screenshot_path]);

  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-[var(--ink-soft)]">
        <span>
          {row.profiles?.username ? (
            <Link to={`/u/${row.profiles.username}`} className="font-medium text-[var(--ink)] hover:underline">
              {who}
            </Link>
          ) : (
            <span className="font-medium text-[var(--ink)]">{who}</span>
          )}{" "}
          · {new Date(row.created_at).toLocaleString()}
        </span>
        <button type="button" onClick={onToggle} className="rounded-full border border-[var(--line)] px-3 py-1 text-[var(--ink)] hover:border-[var(--accent)]">
          {row.status === "open" ? "Resolve" : "Reopen"}
        </button>
      </div>

      <p className="mt-2 whitespace-pre-wrap text-[var(--ink)]">{row.message}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_16rem]">
        <dl className="space-y-1.5 text-sm">
          <Fact label="Page">
            <Link to={row.path} className="break-all font-mono text-xs text-[var(--accent)] hover:underline">
              {row.path}
            </Link>
            {row.page_title && <span className="text-[var(--ink-soft)]"> · {row.page_title}</span>}
          </Fact>
          {c.mainHeading && <Fact label="Heading">{c.mainHeading}</Fact>}
          {c.headings && c.headings.length > 0 && <Fact label="On screen">{c.headings.join(" · ")}</Fact>}
          {c.dialogs && c.dialogs.length > 0 && <Fact label="Open dialog">{c.dialogs.join(" | ")}</Fact>}
          {c.fields && c.fields.length > 0 && (
            <Fact label="Their inputs">
              {c.fields.map((f, i) => (
                <span key={i} className="block">
                  <span className="text-[var(--ink-soft)]">{f.label}:</span> <span className="whitespace-pre-wrap">{f.value}</span>
                </span>
              ))}
            </Fact>
          )}
          {c.selection && <Fact label="Selected">“{c.selection}”</Fact>}
          {c.errors && c.errors.length > 0 && (
            <Fact label="Errors">
              {c.errors.map((e, i) => (
                <span key={i} className="block font-mono text-xs text-red-600">
                  {e.message}
                </span>
              ))}
            </Fact>
          )}
          {c.trail && c.trail.length > 0 && <Fact label="Came from">{c.trail.join(" → ")}</Fact>}
          {c.viewport && (
            <Fact label="Screen">
              {c.viewport.width}×{c.viewport.height}
              {c.scroll ? `, scrolled ${c.scroll.y}px of ${c.scroll.pageHeight}px` : ""}
              {c.colorScheme ? `, ${c.colorScheme} mode` : ""}
            </Fact>
          )}
          {c.userAgent && <Fact label="Device">{c.userAgent}</Fact>}
        </dl>

        <div>
          {row.screenshot_path ? (
            shot ? (
              <button type="button" onClick={() => setZoom(true)} className="block w-full overflow-hidden rounded-lg border border-[var(--line)]" title="Enlarge">
                <img src={shot} alt="What the student saw" className="w-full" />
              </button>
            ) : (
              <div className="h-36 animate-pulse rounded-lg bg-[var(--paper)]" />
            )
          ) : (
            <p className="rounded-lg border border-dashed border-[var(--line)] p-4 text-center text-xs text-[var(--ink-soft)]">No screenshot</p>
          )}
        </div>
      </div>

      {row.visible_text && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-[var(--accent)]">Text on their screen</summary>
          <pre className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-[var(--paper)] p-3 text-xs leading-relaxed text-[var(--ink)]">
            {row.visible_text}
          </pre>
        </details>
      )}

      {zoom && shot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={() => setZoom(false)}>
          <img src={shot} alt="What the student saw" className="max-h-full max-w-full rounded-lg shadow-2xl" />
        </div>
      )}
    </article>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2">
      <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">{label}</dt>
      <dd className="text-[var(--ink)]">{children}</dd>
    </div>
  );
}
