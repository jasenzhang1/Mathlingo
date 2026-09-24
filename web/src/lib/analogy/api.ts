import { supabase } from "../supabase";
import type { Analogy, AnalogyComment, SortMode } from "./types";

/**
 * Every function here returns `{ data, error }` rather than throwing, matching
 * the Supabase client's own convention so callers handle both paths explicitly
 * instead of relying on try/catch around render logic.
 */

export async function fetchAnalogies(
  conceptId: string,
  sort: SortMode,
): Promise<{ data: Analogy[]; error: string | null }> {
  let query = supabase
    .from("analogies_with_stats")
    .select("*")
    .eq("concept_id", conceptId);

  query =
    sort === "top"
      ? query.order("score", { ascending: false }).order("created_at", { ascending: false })
      : query.order("created_at", { ascending: false });

  const { data, error } = await query.limit(100);
  return { data: (data as Analogy[]) ?? [], error: error?.message ?? null };
}

export async function createAnalogy(input: {
  conceptId: string;
  authorId: string;
  body: string;
}): Promise<{ data: { id: string } | null; error: string | null }> {
  const { data, error } = await supabase
    .from("analogies")
    .insert({
      concept_id: input.conceptId,
      author_id: input.authorId,
      body: input.body.trim(),
    })
    .select("id")
    .single();
  return { data: (data as { id: string }) ?? null, error: error?.message ?? null };
}

export async function deleteAnalogy(analogyId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("analogies").delete().eq("id", analogyId);
  return { error: error?.message ?? null };
}

export async function fetchComments(
  analogyId: string,
): Promise<{ data: AnalogyComment[]; error: string | null }> {
  // profiles is joined by relationship name so a comment can show its author's
  // display name without a second round trip.
  const { data, error } = await supabase
    .from("analogy_comments")
    .select("id, analogy_id, author_id, parent_id, body, created_at, profiles(display_name)")
    .eq("analogy_id", analogyId)
    .order("created_at", { ascending: true });

  // PostgREST returns an embedded to-one relation as an object, but its
  // generated types widen it to an array — accept either shape rather than
  // asserting one and risking a runtime mismatch.
  type ProfileEmbed = { display_name: string } | { display_name: string }[] | null;
  type Row = Omit<AnalogyComment, "author_name"> & { profiles: ProfileEmbed };

  function displayName(profiles: ProfileEmbed): string {
    if (!profiles) return "Anonymous";
    const profile = Array.isArray(profiles) ? profiles[0] : profiles;
    return profile?.display_name ?? "Anonymous";
  }

  const comments = ((data as unknown as Row[]) ?? []).map((row) => ({
    id: row.id,
    analogy_id: row.analogy_id,
    author_id: row.author_id,
    parent_id: row.parent_id,
    body: row.body,
    created_at: row.created_at,
    author_name: displayName(row.profiles),
  }));

  return { data: comments, error: error?.message ?? null };
}

export async function createComment(input: {
  analogyId: string;
  authorId: string;
  body: string;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from("analogy_comments").insert({
    analogy_id: input.analogyId,
    author_id: input.authorId,
    body: input.body.trim(),
  });
  return { error: error?.message ?? null };
}

export async function deleteComment(commentId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("analogy_comments").delete().eq("id", commentId);
  return { error: error?.message ?? null };
}

/** The current user's votes on a set of analogies, as an analogyId -> (+1|-1) map. */
export async function fetchMyVotes(
  analogyIds: string[],
  userId: string,
): Promise<Record<string, number>> {
  if (analogyIds.length === 0) return {};
  const { data } = await supabase
    .from("analogy_votes")
    .select("analogy_id, value")
    .eq("user_id", userId)
    .in("analogy_id", analogyIds);

  const map: Record<string, number> = {};
  for (const row of (data as { analogy_id: string; value: number }[]) ?? []) {
    map[row.analogy_id] = row.value;
  }
  return map;
}

/**
 * Casts, changes, or retracts a vote. Clicking the same arrow twice removes the
 * vote (matching how Reddit's arrows toggle) rather than stacking a duplicate.
 */
export async function castVote(input: {
  analogyId: string;
  userId: string;
  value: 1 | -1;
  currentValue: number | undefined;
}): Promise<{ error: string | null }> {
  if (input.currentValue === input.value) {
    const { error } = await supabase
      .from("analogy_votes")
      .delete()
      .eq("analogy_id", input.analogyId)
      .eq("user_id", input.userId);
    return { error: error?.message ?? null };
  }

  const { error } = await supabase
    .from("analogy_votes")
    .upsert(
      { analogy_id: input.analogyId, user_id: input.userId, value: input.value },
      { onConflict: "analogy_id,user_id" },
    );
  return { error: error?.message ?? null };
}
