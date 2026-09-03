import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/** Shared centered-card frame for login, sign-up, and password-reset pages. */
export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Small link/prompt below the card, e.g. "Don't have an account? Sign up". */
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--paper)]">
      <header className="px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-body">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-[var(--accent-ink)]"
            style={{ background: "var(--accent)" }}
            aria-hidden="true"
          >
            M
          </span>
          <span className="font-display text-lg tracking-tight text-[var(--ink)]">
            Mathlingo
          </span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-8 shadow-sm">
            <h1 className="font-display text-2xl text-[var(--ink)]">{title}</h1>
            {subtitle && (
              <p className="font-body mt-1.5 text-sm text-[var(--ink-soft)]">{subtitle}</p>
            )}
            <div className="mt-6">{children}</div>
          </div>
          {footer && (
            <p className="font-body mt-5 text-center text-sm text-[var(--ink-soft)]">
              {footer}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export function AuthError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="font-body mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
    >
      {message}
    </p>
  );
}

export function AuthNotice({ message }: { message: string }) {
  return (
    <p
      role="status"
      className="font-body mb-4 rounded-lg border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--ink)]"
    >
      {message}
    </p>
  );
}

export function AuthInput({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? props.name;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="font-body mb-1.5 block text-sm font-medium text-[var(--ink)]">
        {label}
      </label>
      <input
        id={id}
        className="font-body w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
        {...props}
      />
    </div>
  );
}

export function AuthSubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="font-body w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      style={{ background: "var(--accent)" }}
    >
      {children}
    </button>
  );
}

export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="font-body flex w-full items-center justify-center gap-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--paper)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.68-3.87 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}

export function AuthDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-[var(--line)]" />
      <span className="font-body text-xs text-[var(--ink-soft)]">or</span>
      <div className="h-px flex-1 bg-[var(--line)]" />
    </div>
  );
}
