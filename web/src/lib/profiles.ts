import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";
import { supabase } from "./supabase";

/**
 * Public profile pages (see supabase/migrations/0005_profiles_public.sql):
 * a username to route on, an optional bio, and two opt-ins that gate what a
 * visitor other than the owner gets to see.
 */
export interface Profile {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  showProficiency: boolean;
  showAchievements: boolean;
}

interface ProfileRow {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  show_proficiency: boolean;
  show_achievements: boolean;
}

const COLUMNS =
  "id, username, display_name, bio, show_proficiency, show_achievements";

function rowToProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    bio: row.bio,
    showProficiency: row.show_proficiency,
    showAchievements: row.show_achievements,
  };
}

/**
 * A network failure (offline, Supabase unreachable) throws rather than
 * resolving with `{ data: null }` — without the try/catch here, a caller
 * `await`-ing this would hang its loading state forever instead of settling
 * on "no such profile", which is the wrong failure mode for a page whose
 * whole job is to render *something* for whatever's in the URL.
 */
export async function loadProfileByUsername(
  username: string,
): Promise<Profile | null> {
  try {
    const { data } = await supabase
      .from("profiles")
      .select(COLUMNS)
      .eq("username", username)
      .maybeSingle();
    return data ? rowToProfile(data as ProfileRow) : null;
  } catch {
    return null;
  }
}

export async function loadProfileById(id: string): Promise<Profile | null> {
  try {
    const { data } = await supabase
      .from("profiles")
      .select(COLUMNS)
      .eq("id", id)
      .maybeSingle();
    return data ? rowToProfile(data as ProfileRow) : null;
  } catch {
    return null;
  }
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
    if (/duplicate key.*username|profiles_username_key/i.test(error.message)) {
      return { error: "That username is already taken." };
    }
    if (/profiles_username_format/i.test(error.message)) {
      return {
        error:
          "Usernames need 3-30 characters: lowercase letters, numbers, and hyphens.",
      };
    }
    return { error: error.message };
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

/** The signed-in user's own profile — for linking to "My profile" in the nav. */
export function useOwnProfile(): Profile | null {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setProfile(null);
      return;
    }
    void loadProfileById(user.id).then((p) => {
      if (!cancelled) setProfile(p);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return profile;
}
