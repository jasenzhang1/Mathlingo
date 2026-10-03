import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Nav } from "../components/Nav";
import { useAuth } from "../lib/auth/useAuth";
import {
  answerRequest,
  conversations,
  incomingRequests,
  personByUsername,
  sendMessage,
  thread,
  type ChatRequest,
  type Conversation,
  type Message,
  type PersonSummary,
} from "../lib/social/social";

/** How often an open conversation checks for new messages. */
const POLL_MS = 8000;

/**
 * `/messages` and `/messages/:username`: chat requests waiting on you, your
 * conversations, and the open thread. A chat opens once the recipient accepts
 * the request sent from their profile.
 */
export function MessagesPage() {
  const { user, loading } = useAuth();
  const { username } = useParams<{ username?: string }>();
  const navigate = useNavigate();

  const [requests, setRequests] = useState<ChatRequest[]>([]);
  const [chats, setChats] = useState<Conversation[] | null>(null);
  const [other, setOther] = useState<PersonSummary | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const bottom = useRef<HTMLDivElement>(null);

  const refreshLists = useCallback(async () => {
    if (!user) return;
    const [reqs, convs] = await Promise.all([incomingRequests(user.id), conversations(user.id)]);
    setRequests(reqs);
    setChats(convs);
  }, [user]);

  useEffect(() => {
    void refreshLists();
  }, [refreshLists]);

  useEffect(() => {
    let cancelled = false;
    setOther(null);
    setMessages([]);
    if (!username) return;
    void personByUsername(username).then((p) => {
      if (!cancelled) setOther(p);
    });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const loadThread = useCallback(async () => {
    if (!user || !other) return;
    setMessages(await thread(user.id, other.id));
  }, [user, other]);

  useEffect(() => {
    void loadThread();
    if (!other) return;
    const timer = setInterval(() => void loadThread(), POLL_MS);
    return () => clearInterval(timer);
  }, [loadThread, other]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  async function respond(request: ChatRequest, accept: boolean) {
    const result = await answerRequest(request.id, accept);
    if (result.error) return setError(result.error);
    await refreshLists();
    if (accept) navigate(`/messages/${request.from.username}`);
  }

  async function send() {
    if (!user || !other || !draft.trim()) return;
    const body = draft.trim();
    setDraft("");
    const result = await sendMessage(user.id, other.id, body);
    if (result.error) {
      setError(result.error.includes("row-level security") ? "You can message someone once they've accepted your chat request." : result.error);
      setDraft(body);
      return;
    }
    setError(null);
    await loadThread();
    void refreshLists();
  }

  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-[var(--ink)]">Messages</h1>
          <p className="font-body mt-2 text-[var(--ink-soft)]">
            <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">Log in</Link> to see your messages.
          </p>
        </main>
      </div>
    );
  }

  const inChat = Boolean(chats?.some((c) => c.with.id === other?.id));

  return (
    <div className="flex h-[100dvh] flex-col bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto grid min-h-0 w-full max-w-5xl flex-1 grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[280px_1fr]">
        <aside className={`min-h-0 overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3 ${username ? "hidden md:block" : ""}`}>
          {requests.length > 0 && (
            <div className="mb-4">
              <p className="font-body px-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Chat requests</p>
              <ul className="mt-2 space-y-2">
                {requests.map((r) => (
                  <li key={r.id} className="rounded-xl bg-[var(--paper)] p-3">
                    <Link to={`/u/${r.from.username}`} className="flex items-center gap-2 hover:underline">
                      <Avatar url={r.from.avatarUrl} name={r.from.displayName} size={28} />
                      <span className="font-body truncate text-sm text-[var(--ink)]">{r.from.displayName}</span>
                    </Link>
                    {r.message && <p className="font-body mt-2 text-xs text-[var(--ink-soft)]">“{r.message}”</p>}
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => void respond(r, true)} className="font-body rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                        Accept
                      </button>
                      <button type="button" onClick={() => void respond(r, false)} className="font-body rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)]">
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="font-body px-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Conversations</p>
          {chats === null ? (
            <div className="mt-2 h-10 animate-pulse rounded-xl bg-[var(--paper)]" />
          ) : chats.length === 0 ? (
            <p className="font-body mt-2 px-2 text-sm text-[var(--ink-soft)]">
              No conversations yet. Send a chat request from someone's profile — the{" "}
              <Link to="/leaderboard" className="text-[var(--accent)] hover:underline">leaderboard</Link> is a good place to find people.
            </p>
          ) : (
            <ul className="mt-2 space-y-1">
              {chats.map((c) => (
                <li key={c.with.id}>
                  <Link
                    to={`/messages/${c.with.username}`}
                    className={`flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-[var(--paper)] ${c.with.id === other?.id ? "bg-[var(--paper)]" : ""}`}
                  >
                    <Avatar url={c.with.avatarUrl} name={c.with.displayName} size={32} />
                    <span className="min-w-0 flex-1">
                      <span className="font-body block truncate text-sm text-[var(--ink)]">{c.with.displayName}</span>
                      <span className="font-body block truncate text-xs text-[var(--ink-soft)]">{c.lastMessage ?? "Say hello"}</span>
                    </span>
                    {c.unread > 0 && (
                      <span className="font-body rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">{c.unread}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className={`flex min-h-0 flex-col rounded-2xl border border-[var(--line)] bg-[var(--panel)] ${username ? "" : "hidden md:flex"}`}>
          {!other ? (
            <p className="font-body m-auto p-6 text-sm text-[var(--ink-soft)]">
              {username ? `Nobody at @${username}.` : "Pick a conversation."}
            </p>
          ) : (
            <>
              <header className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
                <Link to="/messages" className="font-body text-sm text-[var(--ink-soft)] md:hidden">←</Link>
                <Link to={`/u/${other.username}`} className="flex items-center gap-2 hover:underline">
                  <Avatar url={other.avatarUrl} name={other.displayName} size={32} />
                  <span className="font-body text-sm font-medium text-[var(--ink)]">{other.displayName}</span>
                </Link>
              </header>
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <p className="font-body text-center text-sm text-[var(--ink-soft)]">
                    {inChat ? "No messages yet." : "You can message once your chat request is accepted."}
                  </p>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                    <p
                      title={new Date(m.createdAt).toLocaleString()}
                      className={`font-body max-w-[75%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm ${
                        m.mine ? "bg-[var(--accent)] text-white" : "bg-[var(--paper)] text-[var(--ink)]"
                      }`}
                    >
                      {m.body}
                    </p>
                  </div>
                ))}
                <div ref={bottom} />
              </div>
              {error && <p className="font-body px-4 pb-1 text-xs text-red-700">{error}</p>}
              <form
                className="flex gap-2 border-t border-[var(--line)] p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  disabled={!inChat}
                  maxLength={4000}
                  placeholder={inChat ? "Write a message" : "Waiting for them to accept"}
                  className="font-body min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-60"
                />
                <button type="submit" disabled={!inChat || !draft.trim()} className="font-body rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
