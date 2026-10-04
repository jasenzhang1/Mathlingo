import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "../supabase";
import { AuthContext } from "./authContextValue";

/**
 * One place holding the current auth session, so every component reads the
 * same state instead of each querying Supabase independently. Supabase keeps
 * the session in localStorage and refreshes it automatically; this context
 * just mirrors that into React state and re-renders on change.
 */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  // Supabase refreshes the session whenever the tab regains focus, handing us
  // a new User object even though nothing about the user changed. Everything
  // keyed on `user` (the assessment in progress, the tutor chat, loaded
  // proficiency) would reload and lose its place, so the previous object is
  // kept unless the user is actually different — another account, or an
  // edited email/profile.
  const [user, setUser] = useState<User | null>(null);
  const adopt = (next: Session | null) => {
    setSession(next);
    const nextUser = next?.user ?? null;
    setUser((prev) => (prev && nextUser && !userChanged(prev, nextUser) ? prev : nextUser));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      adopt(data.session);
      setLoading(false);
    });

    // Fires on sign-in, sign-out, token refresh, and password recovery —
    // keeps every component's view of the session current automatically.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      adopt(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string, fullName: string) {
    // `full_name` becomes the default display name (see handle_new_user in
    // migration 0010), the same field Google sign-ins provide.
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName.trim() } } });
    return { error: error?.message ?? null };
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function requestPasswordReset(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message ?? null };
  }

  async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error: error?.message ?? null };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        requestPasswordReset,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function userChanged(a: User, b: User): boolean {
  return (
    a.id !== b.id ||
    a.email !== b.email ||
    JSON.stringify(a.user_metadata) !== JSON.stringify(b.user_metadata) ||
    JSON.stringify(a.app_metadata) !== JSON.stringify(b.app_metadata)
  );
}
