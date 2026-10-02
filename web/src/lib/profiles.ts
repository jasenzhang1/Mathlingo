import { useContext } from "react";
import { ProfileContext } from "./profileContextValue";
import { supabase } from "./supabase";

/**
 * Public profile pages (see supabase/migrations/0005_profiles_public.sql):
 * a username to route on, an optional bio, and two opt-ins that gate what a
 * visitor other than the owner gets to see. 0010 adds a profile picture and
 * the first-run "choose a username" step.
 */
export interface Profile {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  showProficiency: boolean;
  showAchievements: boolean;
  /** Email domain (e.g. "ucla.edu"), set only by the signup trigger — never client-editable. */
  school: string | null;
  isStudent: boolean;
  /** Profile picture: the Google photo by default, or an upload. Null shows initials. */
  avatarUrl: string | null;
  /** False until a new account has picked its own username (the trigger only sets a placeholder). */
  usernameChosen: boolean;
}

interface ProfileRow {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  show_proficiency: boolean;
  show_achievements: boolean;
  school: string | null;
  is_student: boolean;
  avatar_url?: string | null;
  username_chosen?: boolean;
}

/**
 * The 0010 columns are read in a second attempt only if the first fails, so a
 * database that hasn't run 0010 yet keeps working (with no avatars, and no
 * onboarding step) instead of every profile load failing.
 */
const BASE_COLUMNS = "id, username, display_name, bio, show_proficiency, show_achievements, school, is_student";
const COLUMNS = `${BASE_COLUMNS}, avatar_url, username_chosen`;

function rowToProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    bio: row.bio,
    showProficiency: row.show_proficiency,
    showAchievements: row.show_achievements,
    school: row.school,
    isStudent: row.is_student,
    avatarUrl: row.avatar_url ?? null,
    // Without the column (0010 not run), treat everyone as done.
    usernameChosen: row.username_chosen ?? true,
  };
}

/**
 * Distinguishes "no such profile" from "the profiles table isn't shaped
 * right yet" — the latter is what every load here silently looked like
 * before this existed, because a missing `username` column comes back as a
 * normal Postgrest error, not a thrown exception, and an unmatched `.select`
 * on a `maybeSingle()` query resolves `data: null` either way. Without this,
 * a signed-in user whose Supabase project hasn't had
 * `0005_profiles_public.sql` run against it sees their own profile reported
 * as not existing, with nothing pointing at why.
 */
function explainProfileError(message: string | undefined): string | null {
  if (!message) return null;
  if (/schema cache|column .* does not exist|does not exist/i.test(message)) {
    return "Profiles aren't fully set up on this database yet — run supabase/migrations/0005_profiles_public.sql (after 0001_discussion.sql) in the Supabase SQL Editor.";
  }
  return message;
}

const isMissingColumn = (message: string | undefined) => Boolean(message && /column .* does not exist|schema cache/i.test(message));

export interface ProfileResult {
  profile: Profile | null;
  /** Set only when the lookup itself failed — never for a genuine no-match. */
  error: string | null;
}

async function loadProfileWhere(column: "username" | "id", value: string): Promise<ProfileResult> {
  try {
    let { data, error } = await supabase.from("profiles").select(COLUMNS).eq(column, value).maybeSingle();
    if (error && isMissingColumn(error.message)) {
      ({ data, error } = await supabase.from("profiles").select(BASE_COLUMNS).eq(column, value).maybeSingle());
    }
    if (error) return { profile: null, error: explainProfileError(error.message) };
    return { profile: data ? rowToProfile(data as ProfileRow) : null, error: null };
  } catch {
    // A network failure throws rather than resolving with `{ data: null }`;
    // without this a caller's loading state would hang forever.
    return { profile: null, error: "Couldn't reach the server. Try again." };
  }
}

export function loadProfileByUsername(username: string): Promise<ProfileResult> {
  return loadProfileWhere("username", username);
}

export function loadProfileById(id: string): Promise<ProfileResult> {
  return loadProfileWhere("id", id);
}

/** Usernames: 3–30 characters, lowercase letters, numbers and hyphens, starting with a letter or number. */
export const USERNAME_PATTERN = /^[a-z0-9][a-z0-9-]{2,29}$/;
export const USERNAME_RULE = "Usernames need 3–30 characters: lowercase letters, numbers, and hyphens.";

/** A clean username suggestion from a display name ("Jane Doe" → "jane-doe"). */
export function suggestUsername(displayName: string): string {
  const base = displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
  return base.length >= 3 ? base : "";
}

function explainUsernameError(message: string): string {
  if (/duplicate key.*username|profiles_username_key/i.test(message)) return "That username is already taken.";
  if (/profiles_username_format/i.test(message)) return USERNAME_RULE;
  return explainProfileError(message) ?? message;
}

export interface ProfileUpdate {
  username: string;
  displayName: string;
  bio: string;
  showProficiency: boolean;
  showAchievements: boolean;
}

/** Only ever called with the signed-in user's own id — RLS enforces that too. */
export async function updateOwnProfile(
  userId: string,
  update: ProfileUpdate,
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        username: update.username,
        display_name: update.displayName,
        bio: update.bio || null,
        show_proficiency: update.showProficiency,
        show_achievements: update.showAchievements,
      })
      .eq("id", userId);

    if (!error) return { error: null };
    return { error: explainUsernameError(error.message) };
  } catch {
    return { error: "Couldn't reach the server. Try again." };
  }
}

/** Whether a username is free (or already the caller's own). */
export async function isUsernameAvailable(username: string, ownId: string): Promise<boolean> {
  const { data } = await supabase.from("profiles").select("id").eq("username", username).maybeSingle();
  return !data || (data as { id: string }).id === ownId;
}

/** The first-run step: set the username and mark it chosen. */
export async function chooseUsername(userId: string, username: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.from("profiles").update({ username, username_chosen: true }).eq("id", userId);
    return { error: error ? explainUsernameError(error.message) : null };
  } catch {
    return { error: "Couldn't reach the server. Try again." };
  }
}

const AVATAR_BUCKET = "avatars";
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
const AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

/**
 * Uploads a profile picture to `avatars/<user-id>/avatar` (replacing any
 * earlier one) and points the profile at it. The URL carries a version
 * query so browsers don't keep showing the old cached picture.
 */
export async function uploadAvatar(userId: string, file: File): Promise<{ url: string | null; error: string | null }> {
  if (!AVATAR_TYPES.includes(file.type)) return { url: null, error: "Use a PNG, JPEG, WebP or GIF image." };
  if (file.size > AVATAR_MAX_BYTES) return { url: null, error: "That image is over 2 MB. Try a smaller one." };
  try {
    const path = `${userId}/avatar`;
    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type, cacheControl: "3600" });
    if (uploadError) {
      return {
        url: null,
        error: /bucket not found/i.test(uploadError.message)
          ? "Profile pictures aren't set up on this database yet — run supabase/migrations/0010_onboarding_avatars.sql."
          : uploadError.message,
      };
    }
    const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
    const url = `${data.publicUrl}?v=${Date.now()}`;
    const { error } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", userId);
    return error ? { url: null, error: explainProfileError(error.message) ?? error.message } : { url, error: null };
  } catch {
    return { url: null, error: "Couldn't reach the server. Try again." };
  }
}

/** Removes the profile picture (the profile falls back to initials). */
export async function removeAvatar(userId: string): Promise<{ error: string | null }> {
  try {
    // Best effort: there may be no uploaded file (e.g. a Google photo URL).
    await supabase.storage.from(AVATAR_BUCKET).remove([`${userId}/avatar`]);
    const { error } = await supabase.from("profiles").update({ avatar_url: null }).eq("id", userId);
    return { error: error ? (explainProfileError(error.message) ?? error.message) : null };
  } catch {
    return { error: "Couldn't reach the server. Try again." };
  }
}

export interface ProfileSearchResult {
  username: string;
  displayName: string;
}

/** Profiles whose username or display name contains `query`, for the nav search. */
export async function searchProfiles(
  query: string,
  limit = 5,
): Promise<ProfileSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  // Escape ILIKE wildcards so a search for "50%" doesn't become a pattern.
  const escaped = trimmed.replace(/[%_]/g, (c) => `\\${c}`);
  try {
    const { data } = await supabase
      .from("profiles")
      .select("username, display_name")
      .or(`username.ilike.%${escaped}%,display_name.ilike.%${escaped}%`)
      .limit(limit);
    return ((data as { username: string; display_name: string }[]) ?? []).map(
      (r) => ({ username: r.username, displayName: r.display_name }),
    );
  } catch {
    return [];
  }
}

/** The signed-in user's own profile — shared app-wide by `ProfileProvider`. */
export function useOwnProfile(): Profile | null {
  return useContext(ProfileContext).profile;
}

/** The signed-in user's own profile, whether it's still loading, and a way to re-read it after a change. */
export function useOwnProfileState() {
  return useContext(ProfileContext);
}
