import { Navigate, useLocation } from "react-router-dom";
import { useOwnProfile } from "../lib/profiles";

/** Pages a new account can still reach before choosing a username. */
const EXEMPT = ["/welcome", "/reset-password", "/login", "/signup", "/contact"];

/**
 * Sends a signed-in account that hasn't chosen its username yet to
 * `/welcome`, from wherever it lands — after email confirmation, after the
 * Google redirect, or on any later visit until the choice is made. Renders
 * nothing otherwise.
 */
export function OnboardingGate() {
  const profile = useOwnProfile();
  const location = useLocation();
  if (!profile || profile.usernameChosen) return null;
  if (EXEMPT.some((p) => location.pathname === p || location.pathname.startsWith(`${p}/`))) return null;
  const next = `${location.pathname}${location.search}`;
  return <Navigate to={`/welcome?next=${encodeURIComponent(next)}`} replace />;
}
