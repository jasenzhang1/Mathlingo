import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  AuthError,
  AuthInput,
  AuthLayout,
  AuthNotice,
  AuthSubmitButton,
} from "../components/auth/AuthLayout";
import { useAuth } from "../lib/auth/useAuth";

export function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await requestPasswordReset(email);
    setLoading(false);
    // Show the same "check your email" message whether or not the address
    // has an account — confirming which emails are registered is itself a
    // small information leak, and Supabase's response doesn't distinguish
    // the two cases either.
    if (error) {
      setError(error);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email">
        <AuthNotice message={`If an account exists for ${email}, a password reset link is on its way.`} />
        <Link to="/login" className="font-body text-sm font-medium text-[var(--accent)] hover:underline">
          Back to login
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
          Back to login
        </Link>
      }
    >
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
        <AuthSubmitButton disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
