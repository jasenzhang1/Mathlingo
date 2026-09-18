import { useAuth } from "../auth/useAuth";

/**
 * Emails allowed into the developer views (`/dev/*`). There is no `role`
 * column anywhere in the schema yet, so this is a plain allowlist rather
 * than a database-backed permission — good enough for a small team of
 * content authors, not a substitute for real RLS-backed roles if this ever
 * needs to scale past that.
 */
const DEV_EMAILS = new Set(["jasenzhang@g.ucla.edu", "jasen.zhang.2008@gmail.com"]);

export function useIsDeveloper(): boolean {
  const { user } = useAuth();
  return !!user?.email && DEV_EMAILS.has(user.email);
}
