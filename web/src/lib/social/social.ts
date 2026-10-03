import { supabase } from "../supabase";

/**
 * Follows and chat (migration 0015). A chat starts as a request with an
 * optional note; once the recipient accepts, either side can message.
 */

export interface PersonSummary {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

const PERSON = "id, username, display_name, avatar_url";
type PersonRow = { id: string; username: string; display_name: string; avatar_url: string | null };
const toPerson = (r: PersonRow): PersonSummary => ({
  id: r.id,
  username: r.username,
  displayName: r.display_name,
  avatarUrl: r.avatar_url,
});

function explain(message: string | undefined): string | null {
  if (!message) return null;
  return /schema cache|does not exist/i.test(message)
    ? "This isn't set up yet — run supabase/migrations/0015_social_leaderboards.sql."
    : message;
}

// --- Follows -------------------------------------------------------------------

export async function followCounts(userId: string): Promise<{ followers: number; following: number }> {
  const [followers, following] = await Promise.all([
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("followee_id", userId),
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", userId),
  ]);
  return { followers: followers.count ?? 0, following: following.count ?? 0 };
}

export async function isFollowing(me: string, them: string): Promise<boolean> {
  const { count } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", me)
    .eq("followee_id", them);
  return (count ?? 0) > 0;
}

export async function setFollowing(me: string, them: string, follow: boolean): Promise<{ error: string | null }> {
  const { error } = follow
    ? await supabase.from("follows").insert({ follower_id: me, followee_id: them })
    : await supabase.from("follows").delete().eq("follower_id", me).eq("followee_id", them);
  return { error: explain(error?.message) };
}

// --- Chat requests -----------------------------------------------------------------

export type ChatStatus = "none" | "sent" | "received" | "accepted" | "declined";

export interface ChatRequest {
  id: string;
  from: PersonSummary;
  message: string;
  createdAt: string;
}

/** Where `me` stands with `them`: no request, one pending either way, or an open chat. */
export async function chatStatus(me: string, them: string): Promise<ChatStatus> {
  const { data } = await supabase
    .from("chat_requests")
    .select("requester_id, status")
    .or(`and(requester_id.eq.${me},recipient_id.eq.${them}),and(requester_id.eq.${them},recipient_id.eq.${me})`);
  const rows = (data as { requester_id: string; status: string }[]) ?? [];
  if (rows.some((r) => r.status === "accepted")) return "accepted";
  const mine = rows.find((r) => r.requester_id === me);
  const theirs = rows.find((r) => r.requester_id === them);
  if (theirs?.status === "pending") return "received";
  if (mine?.status === "pending") return "sent";
  if (mine?.status === "declined") return "declined";
  return "none";
}

export async function requestChat(me: string, them: string, message: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("chat_requests")
    .insert({ requester_id: me, recipient_id: them, message: message.slice(0, 500) });
  return { error: explain(error?.message) };
}

/** Pending requests sent to me. */
export async function incomingRequests(me: string): Promise<ChatRequest[]> {
  const { data } = await supabase
    .from("chat_requests")
    .select(`id, message, created_at, requester:profiles!chat_requests_requester_id_fkey(${PERSON})`)
    .eq("recipient_id", me)
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  return ((data as unknown as { id: string; message: string; created_at: string; requester: PersonRow }[]) ?? []).map(
    (r) => ({ id: r.id, from: toPerson(r.requester), message: r.message, createdAt: r.created_at }),
  );
}

export async function answerRequest(id: string, accept: boolean): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("chat_requests")
    .update({ status: accept ? "accepted" : "declined", responded_at: new Date().toISOString() })
    .eq("id", id);
  return { error: explain(error?.message) };
}

// --- Conversations ---------------------------------------------------------------

export interface Conversation {
  with: PersonSummary;
  lastMessage: string | null;
  lastAt: string | null;
  unread: number;
}

/** Everyone I have an accepted chat with, most recently active first. */
export async function conversations(me: string): Promise<Conversation[]> {
  const { data } = await supabase
    .from("chat_requests")
    .select(
      `requester_id, recipient_id, created_at,
       requester:profiles!chat_requests_requester_id_fkey(${PERSON}),
       recipient:profiles!chat_requests_recipient_id_fkey(${PERSON})`,
    )
    .eq("status", "accepted")
    .or(`requester_id.eq.${me},recipient_id.eq.${me}`);
  const chats = ((data as unknown as { requester_id: string; requester: PersonRow; recipient: PersonRow }[]) ?? []).map(
    (r) => toPerson(r.requester_id === me ? r.recipient : r.requester),
  );
  if (chats.length === 0) return [];

  const { data: messages } = await supabase
    .from("direct_messages")
    .select("sender_id, recipient_id, body, created_at, read_at")
    .or(`sender_id.eq.${me},recipient_id.eq.${me}`)
    .order("created_at", { ascending: false })
    .limit(500);
  const list = (messages as { sender_id: string; recipient_id: string; body: string; created_at: string; read_at: string | null }[]) ?? [];

  return chats
    .map((person) => {
      const thread = list.filter((m) => m.sender_id === person.id || m.recipient_id === person.id);
      return {
        with: person,
        lastMessage: thread[0]?.body ?? null,
        lastAt: thread[0]?.created_at ?? null,
        unread: thread.filter((m) => m.sender_id === person.id && !m.read_at).length,
      };
    })
    .sort((a, b) => (b.lastAt ?? "").localeCompare(a.lastAt ?? ""));
}

export interface Message {
  id: string;
  mine: boolean;
  body: string;
  createdAt: string;
}

export async function thread(me: string, them: string): Promise<Message[]> {
  const { data } = await supabase
    .from("direct_messages")
    .select("id, sender_id, body, created_at")
    .or(`and(sender_id.eq.${me},recipient_id.eq.${them}),and(sender_id.eq.${them},recipient_id.eq.${me})`)
    .order("created_at", { ascending: true })
    .limit(500);
  // Mark what they sent me as read.
  void supabase
    .from("direct_messages")
    .update({ read_at: new Date().toISOString() })
    .eq("sender_id", them)
    .eq("recipient_id", me)
    .is("read_at", null);
  return ((data as { id: string; sender_id: string; body: string; created_at: string }[]) ?? []).map((m) => ({
    id: m.id,
    mine: m.sender_id === me,
    body: m.body,
    createdAt: m.created_at,
  }));
}

export async function sendMessage(me: string, them: string, body: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("direct_messages")
    .insert({ sender_id: me, recipient_id: them, body: body.slice(0, 4000) });
  return { error: explain(error?.message) };
}

/** Pending requests plus unread messages, for the nav badge. */
export async function inboxCount(me: string): Promise<number> {
  const [requests, unread] = await Promise.all([
    supabase.from("chat_requests").select("*", { count: "exact", head: true }).eq("recipient_id", me).eq("status", "pending"),
    supabase.from("direct_messages").select("*", { count: "exact", head: true }).eq("recipient_id", me).is("read_at", null),
  ]);
  return (requests.count ?? 0) + (unread.count ?? 0);
}

export async function personByUsername(username: string): Promise<PersonSummary | null> {
  const { data } = await supabase.from("profiles").select(PERSON).eq("username", username).maybeSingle();
  return data ? toPerson(data as PersonRow) : null;
}

// --- Leaderboard opt-out -----------------------------------------------------------

/** Null when the column doesn't exist yet (migration 0015 not run). */
export async function getShowOnLeaderboards(userId: string): Promise<boolean | null> {
  const { data, error } = await supabase.from("profiles").select("show_on_leaderboards").eq("id", userId).maybeSingle();
  if (error || !data) return null;
  return (data as { show_on_leaderboards: boolean }).show_on_leaderboards;
}

export async function setShowOnLeaderboards(userId: string, show: boolean): Promise<{ error: string | null }> {
  const { error } = await supabase.from("profiles").update({ show_on_leaderboards: show }).eq("id", userId);
  return { error: explain(error?.message) };
}
