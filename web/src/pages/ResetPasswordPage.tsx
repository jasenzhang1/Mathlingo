import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthError,
  AuthInput,
  AuthLayout,
  AuthNotice,
  AuthSubmitButton,
} from "../components/auth/AuthLayout";
import { useAuth } from "../lib/auth/useAuth";

/**
 * Landing page for the link in a password-reset email. Supabase parses the
 * recovery token out of the URL itself and briefly signs the visitor in, so
 * by the time this component reads `session` there's already enough auth to
 * call updatePassword — no token handling needed here.
 */
export function ResetPasswordPage() {
  const { session, loading: sessionLoading, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // While sessionLoading is true, Supabase is still parsing the recovery
  // token out of the URL — only treat the link as invalid once that settles.
  const checkedSession = !sessionLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setDone(true);
    setTimeout(() => navigate("/login"), 2000);
  }

  if (done) {
    return (
      <AuthLayout title="Password updated">
        <AuthNotice message="Your password has been changed. Redirecting you to login…" />
      </AuthLayout>
    );
  }

  if (checkedSession && !session) {
    return (
      <AuthLayout title="Link expired or invalid">
        <AuthError message="This password reset link is no longer valid. Request a new one from the login page." />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Choose a new password">
      {error && <AuthError message={error} />}
      <form onSubmit={handleSubmit}>
        <AuthInput
          label="New password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput
          label="Confirm new password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <AuthSubmitButton disabled={loading}>
          {loading ? "Updating…" : "Update password"}
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
