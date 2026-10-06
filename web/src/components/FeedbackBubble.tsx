import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth/useAuth";
import { useIsDeveloper } from "../lib/dev/devAuth";
import {
  captureScreenshot,
  captureSnapshot,
  sendSiteFeedback,
  WIDGET_ATTR,
  type Snapshot,
} from "../lib/feedback/siteFeedback";

/**
 * The feedback bubble, bottom-right on every page for signed-in students.
 *
 * Opening it photographs the moment first: the route, the text on screen,
 * what they had typed, and a screenshot. So "this is wrong" arrives with the
 * page it was about. The student sees exactly what will be sent and can leave
 * the screenshot out.
 *
 * Developers don't see it (they have the dev views), unless "Student view" is on.
 */
export function FeedbackBubble() {
  const { user } = useAuth();
  const isDeveloper = useIsDeveloper();
  const location = useLocation();
  const trail = useRef<string[]>([]);
  const [open, setOpen] = useState(false);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [shot, setShot] = useState<{ blob: Blob; url: string } | null>(null);
  const [shooting, setShooting] = useState(false);
  const [includeShot, setIncludeShot] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [lift, setLift] = useState(0);

  // Where they've been, so a report says how they got here.
  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    if (trail.current[trail.current.length - 1] !== path) trail.current = [...trail.current, path].slice(-6);
  }, [location.pathname, location.search]);

  // Sit above a page's fixed bottom bar (the course picker has one) instead of covering its buttons.
  useEffect(() => {
    const measure = () => {
      const bar = document.querySelector("[data-bottom-bar]");
      setLift(bar ? bar.getBoundingClientRect().height : 0);
    };
    const t = setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!shot) return;
    return () => URL.revokeObjectURL(shot.url);
  }, [shot]);

  if (!user || isDeveloper) return null;

  function openPanel() {
    // Capture before the panel renders, so the snapshot is the page as they saw it.
    setSnapshot(captureSnapshot(trail.current));
    setShot(null);
    setShooting(true);
    setSent(false);
    setError(null);
    setShowDetails(false);
    setOpen(true);
    void captureScreenshot().then((blob) => {
      setShooting(false);
      if (blob) setShot({ blob, url: URL.createObjectURL(blob) });
    });
  }

  async function send() {
    if (!user || !snapshot || !message.trim() || sending) return;
    setSending(true);
    setError(null);
    const result = await sendSiteFeedback({
      userId: user.id,
      message: message.trim(),
      snapshot,
      screenshot: includeShot ? (shot?.blob ?? null) : null,
    });
    setSending(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage("");
    setSent(true);
    setTimeout(() => setOpen(false), 1800);
  }

  return (
    <div {...{ [WIDGET_ATTR]: "" }} className="font-body fixed right-4 z-[60] sm:right-6" style={{ bottom: `${16 + lift}px` }}>
      {open && (
        <div
          role="dialog"
          aria-label="Send feedback"
          className="absolute bottom-16 right-0 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-xl"
        >
          {sent ? (
            <p className="py-6 text-center text-sm text-[var(--ink)]">
              <span className="block text-2xl text-[var(--teal)]" aria-hidden="true">
                ✓
              </span>
              Thanks, it's sent. We read every one.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[var(--ink)]">Feedback</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-2 text-lg leading-none text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={4}
                autoFocus
                maxLength={4000}
                placeholder="Something confusing, broken, or great? Tell us."
                className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
              />

              <p className="mt-2 text-xs text-[var(--ink-soft)]">
                We'll attach this page (<span className="font-mono">{snapshot?.path}</span>) and what's on your screen.
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--paper)]">
                  {shot ? (
                    <img src={shot.url} alt="Screenshot of your screen" className={`h-full w-full object-cover object-top ${includeShot ? "" : "opacity-30"}`} />
                  ) : shooting ? (
                    <div className="h-full w-full animate-pulse" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-[10px] text-[var(--ink-soft)]">No picture</span>
                  )}
                </div>
                <div className="min-w-0 text-xs">
                  {shot ? (
                    <label className="flex items-center gap-1.5 text-[var(--ink)]">
                      <input type="checkbox" checked={includeShot} onChange={(e) => setIncludeShot(e.target.checked)} />
                      Include screenshot
                    </label>
                  ) : (
                    <span className="text-[var(--ink-soft)]">{shooting ? "Taking a screenshot…" : "Couldn't take a screenshot. The page text is still attached."}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowDetails((v) => !v)}
                    className="mt-1 block text-[var(--accent)] hover:underline"
                  >
                    {showDetails ? "Hide" : "See"} what's attached
                  </button>
                </div>
              </div>

              {showDetails && snapshot && (
                <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-[var(--paper)] p-2 text-[11px] leading-snug text-[var(--ink-soft)]">
                  {[
                    `Page: ${snapshot.path}`,
                    snapshot.context.fields.length ? `Your inputs: ${snapshot.context.fields.map((f) => `${f.label}: ${f.value}`).join("; ")}` : "",
                    snapshot.context.selection ? `Selected: ${snapshot.context.selection}` : "",
                    "",
                    snapshot.visibleText,
                  ]
                    .filter((l, i) => l || i === 3)
                    .join("\n")}
                </pre>
              )}

              {error && <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={!message.trim() || sending}
                className="mt-3 w-full rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40"
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </form>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-expanded={open}
        aria-label={open ? "Close feedback" : "Send feedback"}
        title="Send feedback"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition hover:scale-105 hover:opacity-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-soft)]"
      >
        {open ? (
          <span className="text-2xl leading-none" aria-hidden="true">
            ×
          </span>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
            <path d="M8.5 10.5h7M8.5 13.5h4.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
