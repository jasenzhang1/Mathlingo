import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  AuthDivider,
  AuthError,
  AuthInput,
  AuthLayout,
  AuthNotice,
  AuthSubmitButton,
  GoogleButton,
} from "../components/auth/AuthLayout";
import { useAuth } from "../lib/auth/useAuth";
import { getSchoolName, isEduEmail } from "../data/eduDomains";

export function SignUpPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    // By default, a Supabase project requires email confirmation before a
    // new account can log in — so there's no session to redirect into yet.
    setSubmitted(true);
  }

  async function handleGoogle() {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error);
  }

  if (submitted) {
    const schoolName = getSchoolName(email);
    return (
      <AuthLayout title="Check your email">
        <AuthNotice message={`We sent a confirmation link to ${email}. Click it to activate your account.`} />
        {isEduEmail(email) && (
          <p className="font-body -mt-2 text-sm text-[var(--ink-soft)]">
            {schoolName ? <>You're in as a {schoolName} student</> : <>You're in with a verified student email</>}{" "}
            — your student discount and school forum will be waiting once you confirm.
          </p>
        )}
        <Link to="/login" className="font-body text-sm font-medium text-[var(--accent)] hover:underline">
          Back to login
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building a spaced-repetition habit today."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
            Log in
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
        <AuthInput
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthSubmitButton disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
