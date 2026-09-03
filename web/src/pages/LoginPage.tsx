import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthDivider,
  AuthError,
  AuthInput,
  AuthLayout,
  AuthSubmitButton,
  GoogleButton,
} from "../components/auth/AuthLayout";
import { useAuth } from "../lib/auth/useAuth";

export function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    navigate("/");
  }

  async function handleGoogle() {
    setError(null);
    const { error } = await signInWithGoogle();
    // On success the browser is redirected to Google, so there's nothing
    // further to do here — only failures (e.g. Google not configured) return.
    if (error) setError(error);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to keep drilling where you left off."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-[var(--accent)] hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <GoogleButton onClick={handleGoogle} disabled={loading} />
      <AuthDivider />

      {error && <AuthError message={error} />}

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="font-body block text-sm font-medium text-[var(--ink)]">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="font-body text-xs font-medium text-[var(--accent)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-body mb-4 w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
        />
        <AuthSubmitButton disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
