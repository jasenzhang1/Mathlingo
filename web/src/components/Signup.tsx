import { useState, type FormEvent } from "react";

export function Signup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="signup" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl text-[var(--ink)] md:text-4xl">
          Be first in when we open the doors
        </h2>
        <p className="font-body mt-3 text-[var(--ink-soft)]">
          We're building the first tracks now. Leave your email and we'll
          let you know the moment Mathlingo is ready to drill.
        </p>

        {submitted ? (
          <p className="font-body mt-8 rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-6 py-3 text-sm font-medium text-[var(--ink)]">
            You're on the list — we'll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="font-body mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-[var(--line)] bg-[var(--panel)] px-5 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Join the waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
