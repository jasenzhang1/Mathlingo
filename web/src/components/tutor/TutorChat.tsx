import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../lib/auth/useAuth";
import { useSubscription } from "../../lib/billing/useSubscription";
import { askTutor, type TutorMessage } from "../../lib/tutor/api";
import { UpgradePrompt } from "../billing/UpgradePrompt";

/**
 * The discussion section (CLAUDE.md §1.3). The tutor opens by asking which mode
 * the learner wants — their questions, or its questions — because those are
 * genuinely different sessions and guessing wrong wastes the first few turns.
 *
 * Saved notes are the other half of §1.3 ("the user may choose to highlight and
 * keep certain output"). They live in localStorage per concept: they're the
 * learner's own scratch notes, not shared state, and keeping them client-side
 * means the feature works before anyone signs in.
 */

const OPENER = `Hi — I'm your tutor for this concept.

Two ways we can run this:

**You ask.** Bring anything that isn't landing — a step in a derivation, a definition that feels arbitrary, a result you can state but not justify. I'll work through it with you.

**I ask.** I'll throw questions at you, sparring-partner style, and push back when something looks off. Good for finding the gaps you don't know you have.

Which would you like? Or just start talking and I'll follow.`;

function notesKey(conceptId: string) {
  return `mathlingo:tutor-notes:${conceptId}`;
}

export function TutorChat({
  conceptId,
  conceptTitle,
}: {
  conceptId: string;
  conceptTitle: string;
}) {
  const [messages, setMessages] = useState<TutorMessage[]>([
    { role: "assistant", content: OPENER },
  ]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { can, loading: subLoading } = useSubscription();

  // Read once at mount rather than in an effect. The parent keys this component
  // by concept id, so switching concepts remounts and re-reads.
  const [notes, setNotes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(notesKey(conceptId));
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      // Private browsing or blocked site data.
      return [];
    }
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, pending]);

  function saveNote(content: string) {
    const next = notes.includes(content) ? notes : [...notes, content];
    setNotes(next);
    try {
      localStorage.setItem(notesKey(conceptId), JSON.stringify(next));
    } catch {
      // Private browsing or blocked site data — the note stays in this session only.
    }
  }

  function removeNote(content: string) {
    const next = notes.filter((n) => n !== content);
    setNotes(next);
    try {
      localStorage.setItem(notesKey(conceptId), JSON.stringify(next));
    } catch {
      // Same as above: the in-memory list is still correct.
    }
  }

  async function send() {
    const trimmed = draft.trim();
    if (!trimmed || pending) return;

    const next: TutorMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setDraft("");
    setPending(true);
    setError(null);

    const result = await askTutor({ conceptId, conceptTitle, messages: next });
    setPending(false);

    if (!result.ok) {
      setError(
        result.reason === "unavailable"
          ? "The tutor isn't deployed yet — the Edge Function that holds the API key needs to be pushed to Supabase first."
          : `The tutor failed: ${result.message}`,
      );
      return;
    }
    setMessages([...next, { role: "assistant", content: result.reply }]);
  }

  if (subLoading) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
        <div className="h-3 w-1/3 rounded bg-[var(--line)]" />
      </div>
    );
  }

  if (!can("ai-tutor")) {
    return <UpgradePrompt entitlement="ai-tutor" signedIn={Boolean(user)} />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
      <div className="flex min-h-[28rem] flex-col rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-sm">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <Bubble
              key={index}
              message={message}
              onSave={
                message.role === "assistant" && index > 0
                  ? () => saveNote(message.content)
                  : undefined
              }
              saved={notes.includes(message.content)}
            />
          ))}
          {pending && (
            <p className="font-body text-sm text-[var(--ink-soft)]">Thinking…</p>
          )}
          {error && (
            <p className="font-body rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-[var(--line)] p-4">
          <div className="flex gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              rows={2}
              placeholder={`Ask about ${conceptTitle}, or say "quiz me"…`}
              className="font-body flex-1 resize-none rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={pending || draft.trim().length === 0}
              className="font-body self-end rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <aside className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
        <h3 className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
          Saved notes
        </h3>
        {notes.length === 0 ? (
          <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">
            Keep an explanation that clicked — hit “Save” on any reply and it stays
            here for when you come back.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {notes.map((note) => (
              <li
                key={note}
                className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3"
              >
                <p className="font-body line-clamp-6 text-xs text-[var(--ink)]">{note}</p>
                <button
                  type="button"
                  onClick={() => removeNote(note)}
                  className="font-body mt-2 text-xs font-medium text-[var(--ink-soft)] hover:text-[var(--accent)]"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}

function Bubble({
  message,
  onSave,
  saved,
}: {
  message: TutorMessage;
  onSave?: () => void;
  saved: boolean;
}) {
  const isUser = message.role === "user";
  return (
    <div className={isUser ? "flex justify-end" : ""}>
      <div className={isUser ? "max-w-[85%]" : "max-w-[92%]"}>
        <div
          className={`font-body whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
            isUser
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--paper)] text-[var(--ink)]"
          }`}
        >
          {message.content}
        </div>
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            className="font-body mt-1.5 text-xs font-medium text-[var(--ink-soft)] hover:text-[var(--accent)]"
          >
            {saved ? "Saved ✓" : "Save to notes"}
          </button>
        )}
      </div>
    </div>
  );
}
