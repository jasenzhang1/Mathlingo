import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./auth/useAuth";
import { ProfileContext } from "./profileContextValue";
import { loadProfileById, type Profile } from "./profiles";

/**
 * Holds the signed-in user's own profile once for the whole app, so the nav
 * avatar, the onboarding gate and the profile page all see the same copy —
 * and a change made on one (a new username or picture) shows everywhere
 * after `refresh()`, without a reload.
 */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) return;
    const { profile: loaded } = await loadProfileById(user.id);
    setProfile(loaded);
    setLoadedFor(user.id);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void loadProfileById(user.id).then(({ profile: loaded }) => {
      if (cancelled) return;
      setProfile(loaded);
      setLoadedFor(user.id);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Derived rather than stored, so signing out never shows a stale profile.
  const current = user && loadedFor === user.id ? profile : null;
  const loading = authLoading || (Boolean(user) && loadedFor !== user?.id);

  return <ProfileContext.Provider value={{ profile: current, loading, refresh }}>{children}</ProfileContext.Provider>;
}
